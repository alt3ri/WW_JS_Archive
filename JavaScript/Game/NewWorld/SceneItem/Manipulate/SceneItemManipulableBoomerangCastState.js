"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableBoomerangCastState = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableBoomerangCastState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(t, i) {
    super(t, i),
      (this.wrr = -0),
      (this.qje = void 0),
      (this.Brr = 180),
      (this.brr = Vector_1.Vector.Create()),
      (this.qrr = void 0),
      (this.lWo = void 0),
      (this.Gje = void 0),
      (this.Grr = 0),
      (this.Nrr = 0),
      (this.Orr = 0.033),
      (this.krr = Vector_1.Vector.Create()),
      (this.Frr = Vector_1.Vector.Create()),
      (this.Vrr = 0),
      (this.StateType = "BeCastingFree"),
      (this.qrr = this.SceneItem.Config.ThrowCfg.MotionConfig),
      (this.wrr = this.qrr.Velocity),
      (this.Brr = this.qrr.AngularVelocity),
      StringUtils_1.StringUtils.IsEmpty(this.qrr.AngularVelocityCurve) ||
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.qrr.AngularVelocityCurve,
          UE.CurveFloat,
          (t) => {
            this.lWo = t;
          },
        ),
      StringUtils_1.StringUtils.IsEmpty(this.qrr.VelocityCurve) ||
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.qrr.VelocityCurve,
          UE.CurveFloat,
          (t) => {
            this.Gje = t;
          },
        ),
      (this.qje = Vector_1.Vector.Create());
    t =
      this.SceneItem.Config.ThrowCfg.MotionConfig.RenderTrajectoryConfig?.Time;
    this.Nrr = t ?? 0;
  }
  OnEnter() {
    super.OnEnter(),
      (this.Grr = 0),
      this.krr.DeepCopy(this.Frr),
      this.HitCallback &&
        this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.HitCallback),
      (this.SceneItem.ForceMoving = !0);
  }
  SetVelocityDirection(t) {
    this.qje.DeepCopy(t);
  }
  OnTick(t) {
    for (this.Vrr += t; this.Vrr > this.Orr; )
      this.UpdateLocation(this.Orr), (this.Vrr -= this.Orr);
    return this.UpdateRotationAccordingToVelocity(), !0;
  }
  UpdateLocation(t) {
    this.Grr += t;
    t = this.Hrr(this.krr, this.qje, this.brr, t);
    this.SceneItem.ActorComp.SetActorLocation(
      t.ToUeVector(),
      "[ManipulableCastState.UpdateSlalomLocation]",
    ),
      (this.krr = t);
  }
  Hrr(t, i, s, e) {
    let h = this.Brr * e;
    this.lWo?.IsValid() && (h *= this.lWo.GetFloatValue(this.Grr)),
      (h *= this.qrr.Direction === IComponent_1.EDirection.Right ? 1 : -1),
      (h = Math.floor(100 * h) / 100),
      i.RotateAngleAxis(h, s, i);
    s = Vector_1.Vector.Create();
    return (
      i.Multiply(this.wrr * e, s),
      this.Gje?.IsValid() && s.MultiplyEqual(this.Gje.GetFloatValue(this.Grr)),
      s.Set(
        Math.floor(100 * s.X) / 100,
        Math.floor(100 * s.Y) / 100,
        Math.floor(100 * s.Z) / 100,
      ),
      t.Addition(s, s),
      s
    );
  }
  GetCastPath(i, t) {
    const s = [];
    this.qje.DeepCopy(i),
      (this.Frr = Vector_1.Vector.Create(
        this.SceneItem.ActorComp.ActorLocationProxy,
      ));
    let e = Vector_1.Vector.Create(this.Frr);
    const h = Vector_1.Vector.Create(Vector_1.Vector.UpVectorProxy);
    const r =
      (h.CrossProduct(this.qje, h),
      h.Normalize(),
      this.brr.DeepCopy(h),
      this.qje.CrossProduct(this.brr, this.brr),
      this.brr.Normalize(),
      (this.Grr = 0),
      s.push(e),
      t ?? this.Nrr);
    for (let t = 0; t < r; t += this.Orr) {
      this.Grr += this.Orr;
      const o = this.Hrr(e, i, this.brr, this.Orr);
      (e = o), s.push(o);
    }
    return s;
  }
}
exports.SceneItemManipulableBoomerangCastState =
  SceneItemManipulableBoomerangCastState;
// # sourceMappingURL=SceneItemManipulableBoomerangCastState.js.map
