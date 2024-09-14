"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
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
  ReceiveTickAI(t, e, r) {
    this.InitTsVariables();
    var s = t.AiController;
    if (s) {
      var o = s.CharActorComp;
      let t = s.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(3);
      (t =
        this.TsBlackboardKeyActor &&
        (s = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
          s.CharAiDesignComp.Entity.Id,
          this.TsBlackboardKeyActor,
        ))
          ? EntitySystem_1.EntitySystem.GetComponent(s, 3)
          : t)
        ? (AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
            o,
            t.ActorLocationProxy,
            this.TsTurnSpeed,
          ),
          this.FinishExecute(!0))
        : this.FinishExecute(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
}
exports.default = TsTaskTurnToTarget;
//# sourceMappingURL=TsTaskTurnToTarget.js.map
