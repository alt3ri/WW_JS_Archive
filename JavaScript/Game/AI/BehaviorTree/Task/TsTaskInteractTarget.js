"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterController_1 = require("../../../NewWorld/Character/CharacterController"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
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
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKey = this.BlackboardKey));
  }
  ReceiveExecuteAI(r, t) {
    this.InitTsVariables();
    var e,
      i = r.AiController;
    i
      ? this.TsBlackboardKey &&
        (this.OnMontageEnded ||
          (this.OnMontageEnded = (r, t) => {
            this.EndTime = Time_1.Time.WorldTime;
          }),
        (this.EndTime = Time_1.Time.WorldTime),
        (e = i.CharActorComp.Entity.Id),
        (e = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
          e,
          this.TsBlackboardKey,
        ))) &&
        (e = WorldFunctionLibrary_1.default.GetDynamicEntity(e))
        ? ((this.AnimComp = i.CharActorComp.Entity.GetComponent(163)),
          this.ExecuteInteractTarget(e, i.CharActorComp))
        : this.FinishExecute(!1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            r.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  ExecuteInteractTarget(r, t) {
    var r = ActorUtils_1.ActorUtils.GetEntityByActor(r),
      e = CharacterController_1.CharacterController.GetActorComponent(r);
    let i = e.ActorLocation,
      s = e.ActorRotation;
    e = r.Entity.GetComponent(94);
    e?.IsInit &&
      ((r = e.GetInteractPosition()) && (i = r),
      (r = e.GetInteractRotator()) && (s = r),
      t.SetInputRotator(s),
      t.SetActorLocationAndRotation(
        i,
        s,
        "行为树节点.目标交互.强制切换目前",
        !1,
      ));
  }
  ReceiveTickAI(r, t, e) {
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
