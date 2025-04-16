"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  TOLERANCE_ANGLE = 5;
class TsTaskTurnToTargetContinuously extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.BlackboardKeyActor = ""),
      (this.TurnSpeed = 0),
      (this.EndAfterTurnToTarget = !1),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyActor = ""),
      (this.TsTurnSpeed = 0),
      (this.TsEndAfterTurnToTarget = !1);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyActor = ""),
      (this.TsTurnSpeed = 0),
      (this.TsEndAfterTurnToTarget = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKeyActor = this.BlackboardKeyActor),
      (this.TsTurnSpeed = this.TurnSpeed),
      (this.TsEndAfterTurnToTarget = this.EndAfterTurnToTarget));
  }
  ReceiveTickAI(t, s, e) {
    this.InitTsVariables();
    var i = t.AiController;
    if (i) {
      var r = i.CharActorComp;
      let t = i.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(3);
      (t =
        this.TsBlackboardKeyActor &&
        (i =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
            i.CharAiDesignComp.Entity.Id,
            this.TsBlackboardKeyActor,
          ))
          ? EntitySystem_1.EntitySystem.GetComponent(i, 3)
          : t)
        ? (AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
            r,
            t.ActorLocationProxy,
            this.TsTurnSpeed,
          ),
          this.TsEndAfterTurnToTarget &&
            GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(r) <
              TOLERANCE_ANGLE &&
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
exports.default = TsTaskTurnToTargetContinuously;
//# sourceMappingURL=TsTaskTurnToTargetContinuously.js.map
