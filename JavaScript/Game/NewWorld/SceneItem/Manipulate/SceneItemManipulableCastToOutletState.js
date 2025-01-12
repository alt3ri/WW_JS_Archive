"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableCastToOutletState = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableCastToOutletState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(t, i) {
    super(t, i), (this.NHo = void 0), (this.StateType = "BeCastingToOutlet");
  }
  SetTarget(t) {
    this.NHo = t;
  }
  SetEnterCallback(t) {
    this.EnterCallback = t;
  }
  OnEnter() {
    this.NHo?.Valid
      ? (super.OnEnter(),
        (this.SceneItem.IsCanBeHeld = !1),
        (this.SceneItem.TargetActorComponent = this.NHo.GetComponent(1)),
        (this.SceneItem.TargetOutletComponent = this.NHo.GetComponent(147)),
        this.StartCast(),
        this.CalcDirection())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneItem",
          32,
          "被控物进入CastToTarget时,没有设置目标",
        );
  }
  OnTick(t) {
    this.Timer += t;
    let i = MathUtils_1.MathUtils.Clamp(this.Timer / this.CastDuration, 0, 1);
    return (
      this.SceneItem.CastCurve &&
        (i = this.SceneItem.CastCurve.GetFloatValue(i)),
      this.UpdateLocation(i),
      this.T_e(i),
      this.kxe(),
      !0
    );
  }
  OnExit() {
    super.OnExit(), (this.NHo = void 0), this.SceneItem.StopSequence();
  }
  T_e(t) {
    var t = UE.KismetMathLibrary.Ease(0, 1, t, 7),
      i = this.SceneItem.TargetOutletComponent.GetSocketRotator(
        this.SceneItem.Entity,
      ),
      s = Rotator_1.Rotator.Create();
    Rotator_1.Rotator.Lerp(this.StartRot, i, t, s),
      this.SceneItem.ActorComp.SetActorRotation(
        s.ToUeRotator(),
        "[ManipulableCastToOutletState.UpdateRotation]",
        !1,
      );
  }
  kxe() {
    (this.Timer < this.CastDuration && 0 < this.CastDuration) ||
      this.SceneItem.PlayingMatchSequence ||
      (this.SceneItem.MatchSequence
        ? ((this.SceneItem.PlayingMatchSequence = !0),
          this.SceneItem.PlayMatchSequence(() => {
            this.Jnr(), (this.SceneItem.PlayingMatchSequence = !1);
          }, !1))
        : this.Jnr(),
      this.FinishCallback && this.FinishCallback());
  }
  Jnr() {
    (this.SceneItem.ActivatedOutlet = this.SceneItem.TargetOutletComponent),
      (this.SceneItem.ActivatedOutlet.EntityInSocket = this.SceneItem);
    var t = this.SceneItem.TargetOutletComponent.Entity;
    this.SceneItem.ShouldPlayMismatchSequence(t)
      ? ((this.SceneItem.CastFreeState.NeedResetPhysicsMode = !1),
        (this.SceneItem.CurrentState = this.SceneItem.CastFreeState),
        this.SceneItem?.TryPlayMismatchSequence(t))
      : ((this.SceneItem.CurrentState = this.SceneItem.MatchOutletState),
        this.SceneItem.RequestAttachToOutlet());
  }
}
exports.SceneItemManipulableCastToOutletState =
  SceneItemManipulableCastToOutletState;
//# sourceMappingURL=SceneItemManipulableCastToOutletState.js.map
