"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableTrackTargetCastToTargetState = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  CameraController_1 = require("../../../Camera/CameraController"),
  LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
  SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableTrackTargetCastToTargetState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor() {
    super(...arguments),
      (this.FPo = void 0),
      (this.$oi = void 0),
      (this.Yoi = void 0),
      (this.Ist = void 0),
      (this.qsr = void 0),
      (this.Gsr = void 0),
      (this.Nsr = void 0),
      (this.Knr = void 0);
  }
  SetTargetActorWithPart(t, e) {
    (this.FPo = t),
      void 0 !== e &&
        ((this.$oi = t?.Actor.Mesh), (this.Yoi = e.PartSocketName));
  }
  OnEnter() {
    var t, e;
    super.OnEnter(),
      this.FPo &&
        ((t = this.SceneItem.Config.ThrowCfg.MotionConfig),
        (this.Ist = t.Velocity),
        StringUtils_1.StringUtils.IsEmpty(t.VelocityCurve) ||
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t.VelocityCurve,
            UE.CurveFloat,
            (t) => {
              this.qsr = t;
            },
          ),
        (this.Gsr = t.AngularVelocity),
        StringUtils_1.StringUtils.IsEmpty(t.AngularVelocityCurve) ||
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t.AngularVelocityCurve,
            UE.CurveFloat,
            (t) => {
              this.Nsr = t;
            },
          ),
        (this.Knr = Vector_1.Vector.Create()),
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
        ).Vector(this.Knr),
        this.Knr.Normalize(),
        this.NeedNotifyServer) &&
        LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(
          this.SceneItem.Entity.Id,
          Protocol_1.Aki.Protocol.Zw_.Proto_EControlStateLockEntityThrowing,
        );
  }
  OnTick(t) {
    super.OnTick(t), (this.Timer += t);
    let e = this.Gsr,
      i =
        (this.Nsr?.IsValid && (e *= this.Nsr.GetFloatValue(this.Timer)),
        this.Ist);
    this.qsr?.IsValid && (i *= this.qsr.GetFloatValue(this.Timer)),
      this.Knr.Normalize();
    var r = Vector_1.Vector.Create(),
      s =
        (void 0 !== this.Yoi
          ? r.DeepCopy(this.$oi.D_GetSocketLocation(this.Yoi))
          : r.DeepCopy(this.FPo.ActorLocationProxy),
        Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocationProxy)),
      r = Vector_1.Vector.Create(r),
      o =
        (r.SubtractionEqual(s),
        r.Normalize(),
        Vector_1.Vector.DotProduct(this.Knr, r)),
      o = Math.acos(o) * MathCommon_1.MathCommon.RadToDeg,
      o = MathUtils_1.MathUtils.Clamp(o, -e * t, e * t),
      a = Vector_1.Vector.Create(),
      r =
        (Vector_1.Vector.CrossProduct(this.Knr, r, a),
        this.Knr.RotateAngleAxis(o, a, this.Knr),
        Vector_1.Vector.Create(s)),
      o = Vector_1.Vector.Create(this.Knr);
    return (
      o.MultiplyEqual(i * t),
      r.AdditionEqual(o),
      this.SceneItem.ActorComp.SetActorLocation(r.ToUeVector()),
      this.SceneItem.ManipulateBaseConfig.随速度调整朝向 &&
        !this.AfterHit &&
        ((a = UE.KismetMathLibrary.D_FindLookAtRotation(
          this.SceneItem.ActorComp.ActorLocation,
          this.SceneItem.ActorComp.ActorLocation.op_Addition(
            this.Knr.ToUeVector(),
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
//# sourceMappingURL=SceneItemManipulableTrackTargetCastToTargetState.js.map
