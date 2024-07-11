"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeInteractionState extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.InteractionState = !0),
      (this.IsInitTsVariables = !1),
      (this.TsInteractionState = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsInteractionState = this.InteractionState));
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var a,
      s = e.AiController;
    s
      ? ((a = s.CharActorComp.Entity.GetComponent(181))
          ? a.SetInteractionState(
              this.TsInteractionState,
              "TsTaskChangeInteractionState ReceiveExecuteAI",
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              30,
              "实体交互组件无效",
              [
                "CreatureDataId",
                s.CharActorComp.CreatureData.GetCreatureDataId(),
              ],
              ["PbDataId", s.CharActorComp.CreatureData.GetPbDataId()],
            ),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
}
exports.default = TsTaskChangeInteractionState;
//# sourceMappingURL=TsTaskChangeInteractionState.js.map
