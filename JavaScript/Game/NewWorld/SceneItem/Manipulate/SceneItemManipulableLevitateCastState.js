"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableLevitateCastState = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Net_1 = require("../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  CameraController_1 = require("../../../Camera/CameraController"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState"),
  SPHERE_TRACE_RADIUS = 50,
  PROFILE_KEY = "[SceneItemManipulableLevitateCastState.GetTraceResult]";
class SceneItemManipulableLevitateCastState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(t, e) {
    super(t, e),
      (this.xVs = void 0),
      (this.Anr = -0),
      (this.XWe = void 0),
      (this.$We = void 0),
      (this.bnr = 0),
      (this.qnr = 0.033),
      (this.Bnr = 0),
      (this.Gnr = Vector_1.Vector.Create()),
      (this.PVs = 0),
      (this.wsr = 0),
      (this.Asr = Vector_1.Vector.Create()),
      (this.Psr = Vector_1.Vector.Create()),
      (this.xsr = Vector_1.Vector.Create()),
      (this.BVs = (t, e) => {
        this.SceneItem.CurrentState = this.SceneItem.ResetState;
      }),
      (this.StateType = "BeCastingFree"),
      (this.xVs = this.SceneItem.Config.ThrowCfg.MotionConfig),
      (this.Anr = this.xVs.Velocity),
      (this.XWe = Vector_1.Vector.Create());
    t = this.xVs.RenderTrajectoryConfig?.Time;
    (this.bnr = t ? Math.min(t, this.xVs.MoveTime) : this.xVs.MoveTime),
      (this.wsr = this.Anr * this.bnr),
      (this.PVs = this.wsr),
      StringUtils_1.StringUtils.IsEmpty(this.xVs.VelocityCurve) ||
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.xVs.VelocityCurve,
          UE.CurveFloat,
          (t) => {
            this.$We = t;
            t = this.GetCastPath(!0);
            this.PVs = Vector_1.Vector.Dist(t[0], t[t.length - 1]);
          },
        );
  }
  OnEnter() {
    super.OnEnter(),
      (this.Bnr = 0),
      this.Gnr.DeepCopy(this.Asr),
      this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.BVs),
      (this.SceneItem.ActorComp.PhysicsMode = 0),
      (this.SceneItem.ForceMoving = !0);
  }
  OnExit() {
    this.SceneItem.ActorComp.Owner.OnActorHit.Remove(this.BVs),
      (this.SceneItem.ForceMoving = !1),
      this._Qs();
  }
  _Qs() {
    var t = Protocol_1.Aki.Protocol._$s.create();
    (t.F4n = MathUtils_1.MathUtils.NumberToLong(
      this.SceneItem.ActorComp.CreatureData.GetCreatureDataId(),
    )),
      Net_1.Net.Call(27482, t, (t) => {
        t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Q4n,
            19547,
          );
      });
  }
  SetVelocityDirection(t) {
    this.XWe.DeepCopy(t);
  }
  OnTick(t) {
    return this.UpdateLocation(t), this.UpdateRotationAccordingToVelocity(), !0;
  }
  UpdateLocation(t) {
    (this.Bnr += t), (this.Bnr = Math.min(this.Bnr, this.bnr));
    t = this.wVs(this.Gnr, t);
    this.SceneItem.CurrentState === this &&
      (this.SceneItem.ActorComp.SetActorLocation(
        t.ToUeVector(),
        "[SceneItemManipulableLevitateCastState.UpdateLocation]",
      ),
      (this.Gnr = t).Equals(this.Psr) &&
        this.SceneItem.CurrentState === this &&
        (this.SceneItem.CurrentState = this.SceneItem.ResetState),
      this.Bnr >= this.bnr) &&
      this.SceneItem.CurrentState === this &&
      (this.SceneItem.CurrentState = this.SceneItem.ResetState);
  }
  wVs(t, e) {
    let i = Vector_1.Vector.Create();
    this.xsr.Multiply(this.Anr * e, i),
      this.$We?.IsValid() && i.MultiplyEqual(this.$We.GetFloatValue(this.Bnr)),
      i.Set(
        Math.floor(100 * i.X) / 100,
        Math.floor(100 * i.Y) / 100,
        Math.floor(100 * i.Z) / 100,
      ),
      t.Addition(i, i);
    e = Vector_1.Vector.Distance(i, this.Asr);
    return (i = e > this.wsr ? this.Psr : i);
  }
  GetCastPath(t = !1) {
    t
      ? (CameraController_1.CameraController.CameraRotator.Vector(this.xsr),
        (this.Asr = Vector_1.Vector.Create(
          this.SceneItem.ActorComp.ActorLocation,
        )))
      : this.bVs();
    var e = [];
    let i = Vector_1.Vector.Create(this.Asr);
    e.push(i);
    var s = this.bnr;
    for (let t = (this.Bnr = 0); t < s; t += this.qnr) {
      this.Bnr += this.qnr;
      var a = this.wVs(i, this.qnr);
      if (((i = a), e.push(a), a.Equals(this.Psr))) break;
    }
    return e;
  }
  koe() {
    (SceneItemManipulableLevitateCastState.bsr = UE.NewObject(
      UE.TraceSphereElement.StaticClass(),
    )),
      (SceneItemManipulableLevitateCastState.bsr.WorldContextObject =
        this.SceneItem.ActorComp.Owner),
      (SceneItemManipulableLevitateCastState.bsr.bIsSingle = !0),
      (SceneItemManipulableLevitateCastState.bsr.bIgnoreSelf = !0);
    var t = UE.NewArray(UE.BuiltinByte),
      t =
        (t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
        t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
        t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
        t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible),
        (0, puerts_1.$ref)(t)),
      t =
        (SceneItemManipulableLevitateCastState.bsr.SetObjectTypesQuery(t),
        this.SceneItem?.Config?.ThrowCfg.MotionConfig);
    (SceneItemManipulableLevitateCastState.bsr.Radius =
      t?.RayRadius ?? SPHERE_TRACE_RADIUS),
      (SceneItemManipulableLevitateCastState.bsr.DrawTime = 5);
  }
  bVs() {
    this.Asr = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocation);
    var t = Vector_1.Vector.Create(0, 0, 0),
      e =
        (CameraController_1.CameraController.CameraRotator.Vector(t),
        void 0 === SceneItemManipulableLevitateCastState.bsr && this.koe(),
        Vector_1.Vector.Create(
          CameraController_1.CameraController.CameraLocation,
        )),
      i = Vector_1.Vector.Create(e),
      t =
        (i.AdditionEqual(t.MultiplyEqual(this.PVs)),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          SceneItemManipulableLevitateCastState.bsr,
          e,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          SceneItemManipulableLevitateCastState.bsr,
          i,
        ),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          SceneItemManipulableLevitateCastState.bsr,
          PROFILE_KEY,
        ));
    (this.Psr = Vector_1.Vector.Create(i)),
      t &&
        SceneItemManipulableLevitateCastState.bsr.HitResult.bBlockingHit &&
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          SceneItemManipulableLevitateCastState.bsr.HitResult,
          0,
          this.Psr,
        ),
      (this.wsr = Vector_1.Vector.Dist(this.Asr, this.Psr)),
      (this.xsr = Vector_1.Vector.Create(this.Psr)),
      this.xsr.SubtractionEqual(this.Asr),
      this.xsr.Normalize();
  }
}
(exports.SceneItemManipulableLevitateCastState =
  SceneItemManipulableLevitateCastState).bsr = void 0;
//# sourceMappingURL=SceneItemManipulableLevitateCastState.js.map
