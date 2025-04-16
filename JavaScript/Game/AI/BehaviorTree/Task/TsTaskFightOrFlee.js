"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskFightOrFlee extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.FightOrFlee = ""),
      (this.IsInitTsVariables = !1),
      (this.TsFightOrFlee = ""),
      (this.FightProbability = 0);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsFightOrFlee = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0), (this.TsFightOrFlee = this.FightOrFlee));
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var r = e.AiController;
    if (r) {
      var r = r.CharActorComp,
        s = r.Entity.Id;
      if (!this.FightProbability) {
        var r = r.CreatureData,
          i = r.GetPbEntityInitData().ComponentsData,
          i = (0, IComponent_1.getComponent)(i, "AnimalComponent");
        if (!i || void 0 === i.AnimalAttackRange)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("BehaviorTree", 29, "缺少战斗概率配置", [
                "EntityConfigId",
                r.GetPbDataId(),
              ]),
            void this.FinishExecute(!1)
          );
        this.FightProbability = i.AnimalAttackRange;
      }
      r = MathUtils_1.MathUtils.GetRandomRange(0, 100) < this.FightProbability;
      ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(
        s,
        this.TsFightOrFlee,
        r,
      ),
        this.FinishExecute(!0);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
}
exports.default = TsTaskFightOrFlee;
//# sourceMappingURL=TsTaskFightOrFlee.js.map
