"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableTrackTargetCastToTargetState = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableTrackTargetCastToTargetState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(t, e) {
    super(t, e),
      (this.jAo = void 0),
      (this.Xii = void 0),
      (this.$ii = void 0),
      (this.unt = void 0),
      (this.Onr = void 0),
      (this.knr = void 0),
      (this.Fnr = void 0),
      (this.$rr = void 0),
      (this.StateType = "BeCastingToTarget");
  }
  SetTargetActorWithPart(t, e) {
    (this.jAo = t),
      void 0 !== e &&
        ((this.Xii = t?.Actor.Mesh), (this.$ii = e.PartSocketName));
  }
  OnEnter() {
    let t, e;
    super.OnEnter(),
      this.jAo &&
        ((t = this.SceneItem.Config.ThrowCfg.MotionConfig),
        (this.unt = t.Velocity),
        StringUtils_1.StringUtils.IsEmpty(t.VelocityCurve) ||
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t.VelocityCurve,
            UE.CurveFloat,
            (t) => {
              this.Onr = t;
            },
          ),
        (this.knr = t.AngularVelocity),
        StringUtils_1.StringUtils.IsEmpty(t.AngularVelocityCurve) ||
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t.AngularVelocityCurve,
            UE.CurveFloat,
            (t) => {
              this.Fnr = t;
            },
          ),
        (this.$rr = Vector_1.Vector.Create()),
        (void 0 !== t.VelocityOffset
          ? ((t = Rotator_1.Rotator.Create(
              t.VelocityOffset.Y ?? 0,
              t.VelocityOffset.Z ?? 0,
              t.VelocityOffset.X ?? 0,
            )),
            (e = Rotator_1.Rotator.Create(
              CameraController_1.CameraController.CameraRotator,
            )),
            MathUtils_1.MathUtils.ComposeRotator(e, t, e),
            e)
          : CameraController_1.CameraController.CameraRotator
        ).Vector(this.$rr),
        this.$rr.Normalize());
  }
  OnTick(t) {
    super.OnTick(t), (this.Timer += t);
    let e = this.knr;
    let i =
      (this.Fnr?.IsValid && (e *= this.Fnr.GetFloatValue(this.Timer)),
      this.unt);
    this.Onr?.IsValid && (i *= this.Onr.GetFloatValue(this.Timer)),
      this.$rr.Normalize();
    var s = Vector_1.Vector.Create();
    const r =
      (void 0 !== this.$ii
        ? s.DeepCopy(this.Xii.GetSocketLocation(this.$ii))
        : s.DeepCopy(this.jAo.ActorLocationProxy),
      Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocationProxy));
    var s = Vector_1.Vector.Create(s);
    var o =
      (s.SubtractionEqual(r),
      s.Normalize(),
      Vector_1.Vector.DotProduct(this.$rr, s));
    var o = Math.acos(o) * MathCommon_1.MathCommon.RadToDeg;
    var o = MathUtils_1.MathUtils.Clamp(o, -e * t, e * t);
    let a = Vector_1.Vector.Create();
    var s =
      (Vector_1.Vector.CrossProduct(this.$rr, s, a),
      this.$rr.RotateAngleAxis(o, a, this.$rr),
      Vector_1.Vector.Create(r));
    var o = Vector_1.Vector.Create(this.$rr);
    return (
      o.MultiplyEqual(i * t),
      s.AdditionEqual(o),
      this.SceneItem.ActorComp.SetActorLocation(s.ToUeVector()),
      this.SceneItem.ManipulateBaseConfig.随速度调整朝向 &&
        !this.AfterHit &&
        ((a = UE.KismetMathLibrary.FindLookAtRotation(
          this.SceneItem.ActorComp.ActorLocation,
          this.SceneItem.ActorComp.ActorLocation.op_Addition(
            this.$rr.ToUeVector(),
          ),
        )),
        this.SceneItem.ActorComp.SetActorRotation(
          a,
          "[ManipulableCastState.UpdateRotationAccordingToVelocity]",
          !1,
        )),
      !0
    );
  }
}
exports.SceneItemManipulableTrackTargetCastToTargetState =
  SceneItemManipulableTrackTargetCastToTargetState;
// # sourceMappingURL=SceneItemManipulableTrackTargetCastToTargetState.js.map
