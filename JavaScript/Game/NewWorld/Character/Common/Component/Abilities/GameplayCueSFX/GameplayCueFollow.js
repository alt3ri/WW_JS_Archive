"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueFollow = void 0);
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../../../Camera/CameraController"),
  EffectSystem_1 = require("../../../../../../Effect/EffectSystem"),
  GameplayCueEffect_1 = require("./GameplayCueEffect"),
  MAGIC_NUMBER = 0.1;
class GameplayCueFollow extends GameplayCueEffect_1.GameplayCueEffect {
  constructor() {
    super(...arguments),
      (this.L$o = Vector_1.Vector.Create()),
      (this.fgt = Vector_1.Vector.Create()),
      (this.D$o = Vector_1.Vector.Create()),
      (this.R$o = Rotator_1.Rotator.Create()),
      (this.I1e = Vector_1.Vector.Create()),
      (this.oAo = Rotator_1.Rotator.Create()),
      (this.Due = Vector_1.Vector.Create()),
      (this.U$o = Rotator_1.Rotator.Create()),
      (this.A$o = !1),
      (this.P$o = !1),
      (this.JHa = !1),
      (this.x$o = Rotator_1.Rotator.Create()),
      (this.ZHa = Rotator_1.Rotator.Create()),
      (this.w$o = 0),
      (this.B$o = void 0),
      (this.b$o = 0),
      (this.q$o = -0),
      (this._Ke = !1);
  }
  OnInit() {
    super.OnInit(),
      (this.A$o = this.CueConfig.bLockRevolution),
      (this.w$o = this.CueConfig.InterpSpeed),
      (this.B$o = Vector_1.Vector.Create(
        Math.abs(this.CueConfig.FaultTolerance.X),
        Math.abs(this.CueConfig.FaultTolerance.Y),
        Math.abs(this.CueConfig.FaultTolerance.Z),
      )),
      (this.b$o = this.CueConfig.FarthestDistance);
    var t = Vector_1.Vector.Create(
      this.CueConfig.LockRotation.X,
      this.CueConfig.LockRotation.Y,
      this.CueConfig.LockRotation.Z,
    );
    (this.P$o = !t.IsZero()),
      t.Rotation(this.x$o),
      (this.JHa = this.CueConfig.LockCamera);
  }
  OnTick(t) {
    super.OnTick(t), this.eja(t);
  }
  AttachEffect() {
    this.eja();
  }
  SetTargetMeshAndSocket() {
    super.SetTargetMeshAndSocket(),
      this.SocketTransform.FromUeTransform(
        this.TargetMesh.D_GetSocketTransform(this.TargetSocket),
      ),
      this.RelativeTransform.ComposeTransforms(
        this.SocketTransform,
        this.TargetTransform,
      ),
      this.L$o.FromUeVector(this.ActorInternal.D_K2_GetActorLocation()),
      (this.q$o = Vector_1.Vector.Dist2D(
        this.TargetTransform.GetLocation(),
        this.L$o,
      ));
  }
  eja(t) {
    if (EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle)) {
      var s = EffectSystem_1.EffectSystem.GetEffectActor(this.EffectViewHandle);
      if (
        (this.I1e.FromUeVector(s.D_K2_GetActorLocation()),
        this.oAo.FromUeRotator(s.K2_GetActorRotation()),
        this.A$o
          ? (this.Due.FromUeVector(
              this.TargetMesh.D_GetSocketLocation(this.TargetSocket),
            ),
            this.Due.AdditionEqual(this.RelativeTransform.GetLocation()),
            this.U$o.FromUeRotator(
              this.TargetMesh.GetSocketRotation(this.TargetSocket),
            ))
          : (this.SocketTransform.FromUeTransform(
              this.TargetMesh.D_GetSocketTransform(this.TargetSocket),
            ),
            this.JHa &&
              ((this.ZHa.Yaw =
                CameraController_1.CameraController.CameraRotator.Yaw),
              this.SocketTransform.SetRotation(this.ZHa.Quaternion())),
            this.RelativeTransform.ComposeTransforms(
              this.SocketTransform,
              this.TargetTransform,
            ),
            (this.Due = this.TargetTransform.GetLocation()),
            (this.U$o = this.TargetTransform.GetRotation().Rotator())),
        t)
      ) {
        var i = Vector_1.Vector.Distance(this.I1e, this.Due);
        if (i < MAGIC_NUMBER) return void (this._Ke = !1);
        this.N$o(this.I1e, this.Due),
          this.O$o(this.I1e, this.Due, this.oAo, this.U$o, i),
          MathUtils_1.MathUtils.VectorInterpTo(
            this.I1e,
            this.Due,
            t,
            this.w$o,
            this.Due,
          ),
          MathUtils_1.MathUtils.RotatorInterpTo(
            this.oAo,
            this.U$o,
            t,
            this.w$o,
            this.U$o,
          );
      }
      this.L$o.FromUeVector(this.ActorInternal.D_K2_GetActorLocation()),
        !this.oAo.Equals(this.U$o, MAGIC_NUMBER) &&
          Vector_1.Vector.Dist2D(this.Due, this.L$o) < this.q$o &&
          ((this.L$o.Z = this.Due.Z),
          this.Due.Subtraction(this.L$o, this.fgt),
          this.fgt.Normalize(),
          this.fgt.MultiplyEqual(this.q$o),
          this.L$o.Addition(this.fgt, this.Due)),
        s.D_K2_SetActorLocationAndRotation(
          this.Due.ToUeVector(),
          (this.P$o ? this.x$o : this.U$o).ToUeRotator(),
          !1,
          void 0,
          !0,
        );
    }
  }
  N$o(t, s) {
    var i, h;
    !this._Ke &&
      ((s.X = MathUtils_1.MathUtils.Clamp(
        t.X,
        s.X - this.B$o.X,
        s.X + this.B$o.X,
      )),
      (i = s.X !== t.X),
      (s.Y = MathUtils_1.MathUtils.Clamp(
        t.Y,
        s.Y - this.B$o.Y,
        s.Y + this.B$o.Y,
      )),
      (h = s.Y !== t.Y),
      (s.Z = MathUtils_1.MathUtils.Clamp(
        t.Z,
        s.Z - this.B$o.Z,
        s.Z + this.B$o.Z,
      )),
      (s = s.Z !== t.Z),
      i || h || s) &&
      (this._Ke = !0);
  }
  O$o(t, s, i, h, e) {
    e = this.b$o / Math.max(e, MAGIC_NUMBER);
    e < 1 &&
      (Vector_1.Vector.Lerp(s, t, e, this.D$o),
      Rotator_1.Rotator.Lerp(h, i, e, this.R$o),
      t.DeepCopy(this.D$o),
      i.DeepCopy(this.R$o));
  }
}
exports.GameplayCueFollow = GameplayCueFollow;
//# sourceMappingURL=GameplayCueFollow.js.map
