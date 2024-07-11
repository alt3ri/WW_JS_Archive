"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskTurnToTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.BlackboardKeyActor = ""),
      (this.TurnSpeed = 0),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyActor = ""),
      (this.TsTurnSpeed = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKeyActor = this.BlackboardKeyActor),
      (this.TsTurnSpeed = this.TurnSpeed));
  }
  ReceiveTickAI(e, s, t) {
    this.InitTsVariables();
    const r = e.AiController;
    if (r) {
      const i = r.CharActorComp;
      let e = r.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(3);
      (e = this.TsBlackboardKeyActor
        ? r.CharAiDesignComp.Entity.GetComponent(3)
        : e)
        ? (AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
            i,
            e.ActorLocationProxy,
            this.TsTurnSpeed,
          ),
          this.FinishExecute(!0))
        : this.FinishExecute(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
}
exports.default = TsTaskTurnToTarget;
// # sourceMappingURL=TsTaskTurnToTarget.js.map
