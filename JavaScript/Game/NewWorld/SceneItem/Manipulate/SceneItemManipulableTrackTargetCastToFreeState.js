"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableTrackTargetCastToFreeState = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  CameraController_1 = require("../../../Camera/CameraController"),
  SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState"),
  PROFILE_KEY = "[SceneItemManipulableTrackTargetCastToFreeState.OnEnter]",
  MAX_DISTANCE = 5e3,
  SPHERE_TRACE_RADIUS = 1;
class SceneItemManipulableTrackTargetCastToFreeState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(e, t) {
    super(e, t),
      (this.Usr = void 0),
      (this.Asr = void 0),
      (this.Psr = void 0),
      (this.xsr = void 0),
      (this.wsr = void 0),
      (this.Bsr = !1),
      (this.jnr = 0),
      (this.StateType = "BeCastingFree");
  }
  SetStartCameraLocation(e) {
    this.Usr = e;
  }
  OnEnter() {
    var e, t;
    super.OnEnter(),
      void 0 !== this.Usr &&
        ((this.Bsr = !1),
        (this.Asr = Vector_1.Vector.Create(
          this.SceneItem.ActorComp.ActorLocationProxy,
        )),
        (t = this.SceneItem.Config.ThrowCfg.MotionConfig),
        (this.jnr = t.Velocity),
        (this.wsr = MAX_DISTANCE),
        (t = Vector_1.Vector.Create(0, 0, 0)),
        CameraController_1.CameraController.CameraRotator.Vector(t),
        void 0 === SceneItemManipulableTrackTargetCastToFreeState.bsr &&
          this.koe(),
        (e = Vector_1.Vector.Create(this.Usr)).AdditionEqual(
          t.MultiplyEqual(MAX_DISTANCE),
        ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          SceneItemManipulableTrackTargetCastToFreeState.bsr,
          this.Usr,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          SceneItemManipulableTrackTargetCastToFreeState.bsr,
          e,
        ),
        (t = TraceElementCommon_1.TraceElementCommon.SphereTrace(
          SceneItemManipulableTrackTargetCastToFreeState.bsr,
          PROFILE_KEY,
        )),
        (this.Psr = Vector_1.Vector.Create(e)),
        t &&
          SceneItemManipulableTrackTargetCastToFreeState.bsr.HitResult
            .bBlockingHit &&
          (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            SceneItemManipulableTrackTargetCastToFreeState.bsr.HitResult,
            0,
            this.Psr,
          ),
          (this.wsr = Vector_1.Vector.Dist(this.Asr, this.Psr))),
        (this.xsr = Vector_1.Vector.Create(this.Psr)),
        this.xsr.SubtractionEqual(this.Asr),
        this.xsr.Normalize(),
        this.EnterCallback && this.EnterCallback(),
        (this.SceneItem.ActorComp.PhysicsMode = 0));
  }
  koe() {
    (SceneItemManipulableTrackTargetCastToFreeState.bsr = UE.NewObject(
      UE.TraceSphereElement.StaticClass(),
    )),
      (SceneItemManipulableTrackTargetCastToFreeState.bsr.WorldContextObject =
        this.SceneItem.ActorComp.Owner),
      (SceneItemManipulableTrackTargetCastToFreeState.bsr.bIsSingle = !0),
      (SceneItemManipulableTrackTargetCastToFreeState.bsr.bIgnoreSelf = !0);
    var e = UE.NewArray(UE.BuiltinByte),
      e =
        (e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
        e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
        e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
        e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible),
        (0, puerts_1.$ref)(e));
    SceneItemManipulableTrackTargetCastToFreeState.bsr.SetObjectTypesQuery(e),
      (SceneItemManipulableTrackTargetCastToFreeState.bsr.Radius =
        SPHERE_TRACE_RADIUS),
      (SceneItemManipulableTrackTargetCastToFreeState.bsr.DrawTime = 5);
  }
  OnExit() {
    super.OnExit(), (this.Usr = void 0);
  }
  OnTick(e) {
    var t = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocationProxy),
      t = Vector_1.Vector.Create(t);
    let a = Vector_1.Vector.Create(this.xsr);
    if (
      (t.AdditionEqual(a.MultiplyEqual(this.jnr * e)),
      this.Bsr ||
        this.SceneItem.ActorComp.SetActorLocation(
          t.ToUeVector(),
          "[SceneItemManipulableTrackTargetCastToFreeState.UpdateLocation]",
        ),
      (this.wsr -= this.jnr * e),
      !this.Bsr && this.wsr <= 0)
    ) {
      if (this.SceneItem?.CurrentState !== this) return !0;
      (this.Bsr = !0),
        this.SceneItem.TryEnableTick(),
        (this.SceneItem.ActorComp.PhysicsMode = 3),
        (a = Vector_1.Vector.Create(this.xsr)),
        this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
          a.MultiplyEqual(this.jnr).ToUeVector(),
        );
    }
    return (
      this.SceneItem.ManipulateBaseConfig.随速度调整朝向 &&
        !this.AfterHit &&
        ((t = Vector_1.Vector.Create(this.xsr.ToUeVector()).ToUeVector()),
        (e = UE.KismetMathLibrary.FindLookAtRotation(
          this.SceneItem.ActorComp.ActorLocation,
          this.SceneItem.ActorComp.ActorLocation.op_Addition(t),
        )),
        this.SceneItem.ActorComp.SetActorRotation(
          e,
          "[ManipulableCastState.UpdateRotationAccordingToVelocity]",
          !1,
        )),
      !0
    );
  }
}
(exports.SceneItemManipulableTrackTargetCastToFreeState =
  SceneItemManipulableTrackTargetCastToFreeState).bsr = void 0;
//# sourceMappingURL=SceneItemManipulableTrackTargetCastToFreeState.js.map
