"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskInteractTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = ""),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = ""),
      (this.EndTime = -0),
      (this.AnimComp = void 0),
      (this.OnMontageEnded = void 0);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = ""),
      (this.EndTime = -0),
      (this.AnimComp = void 0),
      (this.OnMontageEnded = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKey = this.BlackboardKey));
  }
  ReceiveExecuteAI(t, e) {
    this.InitTsVariables();
    var i,
      r = t.AiController;
    r
      ? this.TsBlackboardKey &&
        (this.OnMontageEnded ||
          (this.OnMontageEnded = (t, e) => {
            this.EndTime = Time_1.Time.WorldTime;
          }),
        (this.EndTime = Time_1.Time.WorldTime),
        (i = r.CharActorComp.Entity.Id),
        (i =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
            i,
            this.TsBlackboardKey,
          ))) &&
        (i = WorldFunctionLibrary_1.default.GetDynamicEntity(i))
        ? ((this.AnimComp = r.CharActorComp.Entity.GetComponent(175)),
          this.ExecuteInteractTarget(i, r.CharActorComp))
        : this.FinishExecute(!1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  ExecuteInteractTarget(t, e) {
    var t = ActorUtils_1.ActorUtils.GetEntityByActor(t),
      i =
        ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(
          t,
        );
    let r = i.ActorLocation,
      s = i.ActorRotation;
    i = t.Entity.GetComponent(101);
    i?.IsInit &&
      ((t = i.GetInteractPosition()) && (r = t),
      (t = i.GetInteractRotator()) && (s = t),
      e.SetInputRotator(s),
      e.SetActorLocationAndRotation(
        r,
        s,
        "行为树节点.目标交互.强制切换目前",
        !1,
      ));
  }
  ReceiveTickAI(t, e, i) {
    this.EndTime < Time_1.Time.WorldTime && this.Finish(!0);
  }
  OnClear() {
    (this.EndTime = 0),
      this.AnimComp &&
        (this.AnimComp.MainAnimInstance.OnMontageEnded.Remove(
          this.OnMontageEnded,
        ),
        (this.AnimComp = void 0));
  }
}
exports.default = TsTaskInteractTarget;
//# sourceMappingURL=TsTaskInteractTarget.js.map
