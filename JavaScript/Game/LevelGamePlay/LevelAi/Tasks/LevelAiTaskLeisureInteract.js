"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskLeisureInteract = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  LevelAiTask_1 = require("../LevelAiTask"),
  LevelAiTaskSitDown_1 = require("./LevelAiTaskSitDown");
class LevelAiTaskLeisureInteract extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments),
      (this.CanRecordPlanProgress = !1),
      (this.Cost = 0),
      (this.gU = !1);
  }
  MakePlanExpansions(e, i) {
    this.PrintDescription(
      "Leisure Interact Task Make Plan Expansions",
      ["LevelIndex", e.CurrentLevelIndex],
      ["StepIndex", e.CurrentStepIndex],
    ),
      this.gU || this.Init(),
      this.CreatePlanSteps(e, i.MakeCopy());
  }
  Init() {
    if (!this.gU) {
      var i = this.Params;
      if (i) {
        let e = void 0;
        if (
          (i.Option.Type === IAction_1.ENpcLeisureInteract.SitDown
            ? (e = new LevelAiTaskSitDown_1.LevelAiTaskSitDown()).Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                this.Description + " SitDownTask",
                i,
              )
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "LevelAi",
                51,
                "[LevelAiTaskLeisureInteract] 未配置正确的行为类型",
                ["PbDataId", this.CreatureDataComponent.GetPbDataId()],
              ),
          e)
        ) {
          if (this.NextNodes.length) {
            for (const s of this.NextNodes) e.NextNodes.push(s);
            this.NextNodes.length = 0;
          }
          this.NextNodes.push(e);
        }
        this.gU = !0;
      }
    }
  }
}
exports.LevelAiTaskLeisureInteract = LevelAiTaskLeisureInteract;
//# sourceMappingURL=LevelAiTaskLeisureInteract.js.map
