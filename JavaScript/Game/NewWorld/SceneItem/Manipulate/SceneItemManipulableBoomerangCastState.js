"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableBoomerangCastState = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableBoomerangCastState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(t, i) {
    super(t, i),
      (this.Anr = -0),
      (this.XWe = void 0),
      (this.Pnr = 180),
      (this.xnr = Vector_1.Vector.Create()),
      (this.wnr = void 0),
      (this.sKo = void 0),
      (this.$We = void 0),
      (this.Bnr = 0),
      (this.bnr = 0),
      (this.qnr = 0.033),
      (this.Gnr = Vector_1.Vector.Create()),
      (this.Nnr = Vector_1.Vector.Create()),
      (this.Onr = 0),
      (this.StateType = "BeCastingFree"),
      (this.wnr = this.SceneItem.Config.ThrowCfg.MotionConfig),
      (this.Anr = this.wnr.Velocity),
      (this.Pnr = this.wnr.AngularVelocity),
      StringUtils_1.StringUtils.IsEmpty(this.wnr.AngularVelocityCurve) ||
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.wnr.AngularVelocityCurve,
          UE.CurveFloat,
          (t) => {
            this.sKo = t;
          },
        ),
      StringUtils_1.StringUtils.IsEmpty(this.wnr.VelocityCurve) ||
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.wnr.VelocityCurve,
          UE.CurveFloat,
          (t) => {
            this.$We = t;
          },
        ),
      (this.XWe = Vector_1.Vector.Create());
    t =
      this.SceneItem.Config.ThrowCfg.MotionConfig.RenderTrajectoryConfig?.Time;
    this.bnr = t ?? 0;
  }
  OnEnter() {
    super.OnEnter(),
      (this.Bnr = 0),
      this.Gnr.DeepCopy(this.Nnr),
      this.HitCallback &&
        this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.HitCallback),
      (this.SceneItem.ForceMoving = !0);
  }
  SetVelocityDirection(t) {
    this.XWe.DeepCopy(t);
  }
  OnTick(t) {
    for (this.Onr += t; this.Onr > this.qnr; )
      this.UpdateLocation(this.qnr), (this.Onr -= this.qnr);
    return this.UpdateRotationAccordingToVelocity(), !0;
  }
  UpdateLocation(t) {
    this.Bnr += t;
    t = this.knr(this.Gnr, this.XWe, this.xnr, t);
    this.SceneItem.ActorComp.SetActorLocation(
      t.ToUeVector(),
      "[ManipulableCastState.UpdateSlalomLocation]",
    ),
      (this.Gnr = t);
  }
  knr(t, i, s, e) {
    let h = this.Pnr * e;
    this.sKo?.IsValid() && (h *= this.sKo.GetFloatValue(this.Bnr)),
      (h *= this.wnr.Direction === IComponent_1.EDirection.Right ? 1 : -1),
      (h = Math.floor(100 * h) / 100),
      i.RotateAngleAxis(h, s, i);
    s = Vector_1.Vector.Create();
    return (
      i.Multiply(this.Anr * e, s),
      this.$We?.IsValid() && s.MultiplyEqual(this.$We.GetFloatValue(this.Bnr)),
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
    var s = [];
    this.XWe.DeepCopy(i),
      (this.Nnr = Vector_1.Vector.Create(
        this.SceneItem.ActorComp.ActorLocationProxy,
      ));
    let e = Vector_1.Vector.Create(this.Nnr);
    var h = Vector_1.Vector.Create(Vector_1.Vector.UpVectorProxy),
      r =
        (h.CrossProduct(this.XWe, h),
        h.Normalize(),
        this.xnr.DeepCopy(h),
        this.XWe.CrossProduct(this.xnr, this.xnr),
        this.xnr.Normalize(),
        (this.Bnr = 0),
        s.push(e),
        t ?? this.bnr);
    for (let t = 0; t < r; t += this.qnr) {
      this.Bnr += this.qnr;
      var o = this.knr(e, i, this.xnr, this.qnr);
      (e = o), s.push(o);
    }
    return s;
  }
}
exports.SceneItemManipulableBoomerangCastState =
  SceneItemManipulableBoomerangCastState;
//# sourceMappingURL=SceneItemManipulableBoomerangCastState.js.map
