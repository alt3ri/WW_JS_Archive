"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskFightOrFlee extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.FightOrFlee = ""),
      (this.IsInitTsVariables = !1),
      (this.TsFightOrFlee = ""),
      (this.FightProbability = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0), (this.TsFightOrFlee = this.FightOrFlee));
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var r = e.AiController;
    if (r) {
      var r = r.CharActorComp;
      const o = r.Entity.Id;
      if (!this.FightProbability) {
        var r = r.CreatureData;
        var s = r.GetPbEntityInitData().ComponentsData;
        var s = (0, IComponent_1.getComponent)(s, "AnimalComponent");
        if (!s || void 0 === s.AnimalAttackRange)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("BehaviorTree", 30, "缺少战斗概率配置", [
                "EntityConfigId",
                r.GetPbDataId(),
              ]),
            void this.FinishExecute(!1)
          );
        this.FightProbability = s.AnimalAttackRange;
      }
      r = MathUtils_1.MathUtils.GetRandomRange(0, 100) < this.FightProbability;
      BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
        o,
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
// # sourceMappingURL=TsTaskFightOrFlee.js.map
