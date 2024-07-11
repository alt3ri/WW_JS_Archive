"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiDecoratorEntityState = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorEntityState extends LevelAiDecorator_1.LevelAiDecorator {
  constructor() {
    super(...arguments),
      (this.gIe = () => {
        const e = this.CheckCondition(1);
        this.NotifyEventBasedCondition(e);
      });
  }
  OnExecutionStart() {
    let e = this.Params;
    e &&
      (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        e.EntityId,
      ))?.Valid &&
      EventSystem_1.EventSystem.AddWithTarget(
        e.Entity,
        EventDefine_1.EEventName.OnGameplayTagChanged,
        this.gIe,
      );
  }
  OnExecutionFinish() {
    let e = this.Params;
    e &&
      (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        e.EntityId,
      ))?.Valid &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e.Entity,
        EventDefine_1.EEventName.OnGameplayTagChanged,
        this.gIe,
      );
  }
  CheckCondition(e) {
    let t;
    const r = this.Params;
    return (
      !!r &&
      !!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        r.EntityId,
      ))?.Valid &&
      !!(t = t.Entity.GetComponent(177)) &&
      ((t = t.ContainsTagByName(r.State)), r.Compare === "Eq" ? t : !t)
    );
  }
}
exports.LevelAiDecoratorEntityState = LevelAiDecoratorEntityState;
// # sourceMappingURL=LevelAiDecoratorEntityState.js.map
