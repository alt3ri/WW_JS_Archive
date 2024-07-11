"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAddGe extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.GeId = void 0),
      (this.Level = 0),
      (this.IsInitTsVariables = !1),
      (this.TsGeId = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0), (this.TsGeId = this.GeId));
  }
  ReceiveTickAI(s, e, t) {
    this.InitTsVariables();
    let a;
    const i = s.AiController;
    i
      ? ((a = i.CharActorComp.Entity.CheckGetComponent(157)).AddBuffFromAi(
          i.AiCombatMessageId,
          this.TsGeId,
          { InstigatorId: a.CreatureDataId, Reason: "行为树TsTaskAddGe节点" },
        ),
        this.FinishExecute(!0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          s.GetClass().GetName(),
        ]);
  }
}
exports.default = TsTaskAddGe;
// # sourceMappingURL=TsTaskAddGe.js.map
