"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueFollow = void 0);
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
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
      (this.x$o = Rotator_1.Rotator.Create()),
      (this.w$o = 0),
      (this.B$o = void 0),
      (this.b$o = 0),
      (this.q$o = -0),
      (this._Ke = !1);
  }
  OnInit() {
    super.OnInit(),
      this.SocketTransform.FromUeTransform(
        this.TargetMesh.GetSocketTransform(this.TargetSocket),
      ),
      this.RelativeTransform.ComposeTransforms(
        this.SocketTransform,
        this.TargetTransform,
      ),
      this.L$o.FromUeVector(this.ActorInternal.K2_GetActorLocation()),
      (this.q$o = Vector_1.Vector.Dist2D(
        this.TargetTransform.GetLocation(),
        this.L$o,
      )),
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
    (this.P$o = !t.IsZero()), t.Rotation(this.x$o);
  }
  OnTick(t) {
    super.OnTick(t), this.G$o(t);
  }
  AttachEffect() {
    this.G$o();
  }
  G$o(t) {
    if (EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle)) {
      var i = EffectSystem_1.EffectSystem.GetEffectActor(this.EffectViewHandle);
      if (
        (this.I1e.FromUeVector(i.K2_GetActorLocation()),
        this.oAo.FromUeRotator(i.K2_GetActorRotation()),
        this.A$o
          ? (this.Due.FromUeVector(
              this.TargetMesh.GetSocketLocation(this.TargetSocket),
            ),
            this.Due.AdditionEqual(this.RelativeTransform.GetLocation()),
            this.U$o.FromUeRotator(
              this.TargetMesh.GetSocketRotation(this.TargetSocket),
            ))
          : (this.SocketTransform.FromUeTransform(
              this.TargetMesh.GetSocketTransform(this.TargetSocket),
            ),
            this.RelativeTransform.ComposeTransforms(
              this.SocketTransform,
              this.TargetTransform,
            ),
            (this.Due = this.TargetTransform.GetLocation()),
            (this.U$o = this.TargetTransform.GetRotation().Rotator())),
        t)
      ) {
        var s = Vector_1.Vector.Distance(this.I1e, this.Due);
        if (s < MAGIC_NUMBER) return void (this._Ke = !1);
        this.N$o(this.I1e, this.Due),
          this.O$o(this.I1e, this.Due, this.oAo, this.U$o, s),
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
      this.L$o.FromUeVector(this.ActorInternal.K2_GetActorLocation()),
        !this.oAo.Equals(this.U$o, MAGIC_NUMBER) &&
          Vector_1.Vector.Dist2D(this.Due, this.L$o) < this.q$o &&
          ((this.L$o.Z = this.Due.Z),
          this.Due.Subtraction(this.L$o, this.fgt),
          this.fgt.Normalize(),
          this.fgt.MultiplyEqual(this.q$o),
          this.L$o.Addition(this.fgt, this.Due)),
        i.K2_SetActorLocationAndRotation(
          this.Due.ToUeVector(),
          (this.P$o ? this.x$o : this.U$o).ToUeRotator(),
          !1,
          void 0,
          !0,
        );
    }
  }
  N$o(t, i) {
    var s, h;
    !this._Ke &&
      ((i.X = MathUtils_1.MathUtils.Clamp(
        t.X,
        i.X - this.B$o.X,
        i.X + this.B$o.X,
      )),
      (s = i.X !== t.X),
      (i.Y = MathUtils_1.MathUtils.Clamp(
        t.Y,
        i.Y - this.B$o.Y,
        i.Y + this.B$o.Y,
      )),
      (h = i.Y !== t.Y),
      (i.Z = MathUtils_1.MathUtils.Clamp(
        t.Z,
        i.Z - this.B$o.Z,
        i.Z + this.B$o.Z,
      )),
      (i = i.Z !== t.Z),
      s || h || i) &&
      (this._Ke = !0);
  }
  O$o(t, i, s, h, e) {
    e = this.b$o / Math.max(e, MAGIC_NUMBER);
    e < 1 &&
      (Vector_1.Vector.Lerp(i, t, e, this.D$o),
      Rotator_1.Rotator.Lerp(h, s, e, this.R$o),
      t.DeepCopy(this.D$o),
      s.DeepCopy(this.R$o));
  }
}
exports.GameplayCueFollow = GameplayCueFollow;
//# sourceMappingURL=GameplayCueFollow.js.map
