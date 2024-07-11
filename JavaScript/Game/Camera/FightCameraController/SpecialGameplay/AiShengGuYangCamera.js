"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiShengGuYangCamera = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Time_1 = require("../../../../Core/Common/Time"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  GameSplineUtils_1 = require("../../../LevelGamePlay/Common/GameSplineUtils"),
  TsGameSplineActor_1 = require("../../../LevelGamePlay/Common/TsGameSplineActor"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MOVE_SPLINE_PB_DATA_ID = 118003752;
class AiShengGuYangCamera {
  constructor() {
    (this.Ic = void 0),
      (this.qce = void 0),
      (this.Lie = void 0),
      (this.Gce = void 0),
      (this.Nce = void 0),
      (this.Oce = void 0),
      (this.kce = void 0),
      (this.Fce = void 0),
      (this.Vce = void 0),
      (this.Hce = 0),
      (this.jce = Vector_1.Vector.Create()),
      (this.Wce = Vector_1.Vector.Create()),
      (this.Kce = Vector_1.Vector.Create()),
      (this.Qce = 1),
      (this.Xce = !1),
      (this.$ce = 0),
      (this.Yce = 0),
      (this.Jce = 0),
      (this.zce = Vector_1.Vector.Create()),
      (this.Zce = Vector_1.Vector.Create()),
      (this.eme = Vector_1.Vector.Create()),
      (this.tme = Vector_1.Vector.Create()),
      (this.ime = Vector_1.Vector.Create()),
      (this.ome = 0),
      (this.rme = Vector_1.Vector.Create()),
      (this.nme = 0),
      (this.sme = Vector_1.Vector.Create()),
      (this.ame = 0),
      (this.hme = 0),
      (this.lme = !0),
      (this._me = 0),
      (this.ume = 0),
      (this.cme = 0),
      (this.mme = 0),
      (this.dme = 0),
      (this.Cme = !0),
      (this.gme = Vector_1.Vector.Create()),
      (this.fz = Vector_1.Vector.Create()),
      (this.pz = Vector_1.Vector.Create()),
      (this.fme = Rotator_1.Rotator.Create()),
      (this.pme = Rotator_1.Rotator.Create()),
      (this.vme = Rotator_1.Rotator.Create()),
      (this.Mme = Transform_1.Transform.Create(
        Quat_1.Quat.Create(),
        Vector_1.Vector.ZeroVectorProxy,
        Vector_1.Vector.OneVectorProxy,
      ));
  }
  get Hh() {
    return this.Ic?.IsValid() ? this.Ic.CameraComponent : void 0;
  }
  OnInit(t) {
    (this.Ic = t), this.Eme();
  }
  Update(t) {
    if (
      (this.qce?.IsValid() || this.Eme(),
      this.qce?.IsValid() &&
        this.Lie?.Valid &&
        this.Gce?.Valid &&
        this.Nce?.Valid &&
        this.kce?.IsValid() &&
        this.Oce?.IsValid() &&
        this.Fce?.IsValid() &&
        this.Vce?.IsValid() &&
        this.Ic?.IsValid() &&
        this.Hh?.IsValid())
    ) {
      (this.Xce = !!this.Lie.HasTag(1100468875)),
        this.Nce.GetMoveVector(this.jce),
        this.Kce.Set(1200, 1200, 0),
        this.Xce
          ? (this.Hh.SetFieldOfView(120),
            (this.$ce = 4500),
            (this.Jce = 2300 <= this.Yce ? 1.05 * this.$ce : 0.3 * this.$ce))
          : ((this.$ce = 2500),
            (this.Jce = 2300 <= this.Yce ? 1.05 * this.$ce : 0.3 * this.$ce),
            this.Hh.SetFieldOfView(105)),
        Math.abs(this.Wce.X) === this.Kce.X
          ? ((0 < this.Wce.X && this.jce.X <= -0.5) ||
              (this.Wce.X < 0 && 0.5 <= this.jce.X)) &&
            ((i = 0 < this.Wce.X ? this.Wce.X - 70 : this.Wce.X + 70),
            Math.abs(i) < this.Kce.X) &&
            (this.Wce.X = MathUtils_1.MathUtils.InterpTo(this.Wce.X, i, t, 10))
          : Math.abs(this.Wce.X) < this.Kce.X
            ? ((i = 0.5 <= this.jce.X ? this.Wce.X + 70 : this.Wce.X - 70),
              (0.5 <= this.jce.X || this.jce.X <= -0.5) &&
                Math.abs(i) < this.Kce.X &&
                (this.Wce.X = MathUtils_1.MathUtils.InterpTo(
                  this.Wce.X,
                  i,
                  t,
                  10,
                )))
            : (this.Wce.X = 0 < this.Wce.X ? this.Kce.X : -this.Kce.X),
        Math.abs(this.Wce.Y) === this.Kce.Y
          ? ((0 < this.Wce.Y && this.jce.Y <= -0.5) ||
              (this.Wce.Y < 0 && 0.5 <= this.jce.Y)) &&
            ((i = 0 < this.Wce.Y ? this.Wce.Y - 70 : this.Wce.Y + 70),
            Math.abs(i) < this.Kce.Y) &&
            (this.Wce.Y = MathUtils_1.MathUtils.InterpTo(this.Wce.Y, i, t, 10))
          : Math.abs(this.Wce.Y) < this.Kce.Y
            ? ((i = 0.5 <= this.jce.Y ? this.Wce.Y + 70 : this.Wce.Y - 70),
              (0.5 <= this.jce.Y || this.jce.Y <= -0.5) &&
                Math.abs(i) < this.Kce.Y &&
                (this.Wce.Y = MathUtils_1.MathUtils.InterpTo(
                  this.Wce.Y,
                  i,
                  t,
                  10,
                )))
            : (this.Wce.Y = 0 < this.Wce.Y ? this.Kce.Y : -this.Kce.Y),
        this.Cme &&
          (this.zce.FromUeVector(
            this.kce.GetLocationAtDistanceAlongSpline(this.ome, 1),
          ),
          this.tme.FromUeVector(
            this.kce.GetDirectionAtDistanceAlongSpline(this.ome, 0),
          ),
          this.tme.Multiply(200, this.ime),
          this.ime.AdditionEqual(this.zce),
          (this.Cme = !1),
          this.gme.FromUeVector(this.qce.K2_GetActorLocation()),
          this.fz.FromUeVector(this.qce.GetActorForwardVector()),
          this.fz.MultiplyEqual(-1300),
          this.gme.AdditionEqual(this.fz),
          this.fz.FromUeVector(this.qce.GetActorUpVector()),
          this.fz.MultiplyEqual(250),
          this.gme.AdditionEqual(this.fz),
          this.Ic.K2_SetActorLocationAndRotation(
            this.gme.ToUeVector(),
            this.qce.K2_GetActorRotation(),
            !1,
            void 0,
            !1,
          ),
          this.gme.FromUeVector(this.qce.K2_GetActorLocation()),
          this.fz.FromUeVector(this.qce.GetActorForwardVector()),
          this.fz.MultiplyEqual(-1100),
          this.gme.AdditionEqual(this.fz),
          this.fz.FromUeVector(this.qce.GetActorUpVector()),
          this.fz.MultiplyEqual(150),
          this.gme.AdditionEqual(this.fz),
          this.Fce.K2_SetActorLocationAndRotation(
            this.gme.ToUeVector(),
            this.qce.K2_GetActorRotation(),
            !1,
            void 0,
            !1,
          )),
        (this.ome = this.Hce + this.$ce * t),
        this.zce.FromUeVector(
          this.kce.GetLocationAtDistanceAlongSpline(this.ome, 1),
        ),
        this.Zce.FromUeVector(
          this.kce.GetUpVectorAtDistanceAlongSpline(this.ome, 0),
        ),
        this.eme.FromUeVector(
          this.kce.GetRightVectorAtDistanceAlongSpline(this.ome, 0),
        ),
        this.tme.FromUeVector(
          this.kce.GetDirectionAtDistanceAlongSpline(this.ome, 0),
        ),
        this.tme.Multiply(200, this.ime),
        this.ime.AdditionEqual(this.zce),
        this.Zce.Multiply(this.Wce.X, this.gme),
        this.eme.Multiply(this.Wce.Y, this.fz),
        this.gme.Addition(this.fz, this.rme),
        this.gme.FromUeVector(this.qce.K2_GetActorLocation()),
        this.fz.FromUeVector(this.Ic.K2_GetActorLocation()),
        (this.Yce = Vector_1.Vector.Dist(this.gme, this.fz)),
        this.ime.Addition(this.rme, this.fz),
        (this.nme = Vector_1.Vector.Dist(this.gme, this.fz)),
        this.Zce.Multiply(
          MathUtils_1.MathUtils.RangeClamp(this.Wce.X, -1200, 1200, -600, 600),
          this.gme,
        ),
        this.eme.Multiply(
          MathUtils_1.MathUtils.RangeClamp(this.Wce.Y, -1200, 1200, -600, 600),
          this.fz,
        ),
        this.gme.AdditionEqual(this.fz),
        this.fz.FromUeVector(
          this.kce.GetLocationAtDistanceAlongSpline(this.ome + 2e3, 1),
        ),
        this.gme.Addition(this.fz, this.sme),
        this.ome >= this.mme &&
          (this.Qce++,
          (this.mme = this.kce.GetDistanceAlongSplineAtSplinePoint(this.Qce)));
      if (!this.Xce) {
        var i = 1 === this.ame ? 100 : 200,
          s = 3 === this.ame ? 300 : 400;
        switch (
          (this.nme < i
            ? (this.ame = 1)
            : this.nme < s
              ? (this.ame = 2)
              : (this.ame = 3),
          this.hme)
        ) {
          case 0:
            this.Yce <= 1e3
              ? ((this.hme = 1), (this.Jce = 0.85 * this.$ce))
              : this.Yce < 1500
                ? ((this.hme = 2), (this.Jce = this.$ce - 10))
                : ((this.hme = 3), (this.Jce = 1.1 * this.$ce));
            break;
          case 1:
            1100 <= this.Yce && ((this.hme = 2), (this.Jce = this.$ce - 100));
            break;
          case 2:
            this.Yce <= 900
              ? ((this.hme = 1), (this.Jce = 0.85 * this.$ce))
              : 1500 <= this.Yce &&
                ((this.hme = 3), (this.Jce = 1.2 * this.$ce));
            break;
          case 3:
            this.Yce <= 1300 && ((this.hme = 2), (this.Jce = this.$ce - 1));
        }
      }
      MathUtils_1.MathUtils.IsNearlyZero(this.jce.Y)
        ? this.lme && 1e3 < Time_1.Time.Now - this._me
          ? (this.lme = !1)
          : (this.gme.FromUeVector(this.qce.GetActorForwardVector()),
            (this.gme.Z = 0),
            this.gme.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
            this.fz.FromUeVector(
              this.kce.GetDirectionAtDistanceAlongSpline(this.ome + 1e3, 0),
            ),
            (this.fz.Z = 0),
            this.fz.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
            (i =
              Math.acos(
                MathUtils_1.MathUtils.Clamp(
                  this.gme.DotProduct(this.fz),
                  -1,
                  1,
                ),
              ) * MathUtils_1.MathUtils.RadToDeg),
            (i = MathUtils_1.MathUtils.Clamp(i, -25, 25)),
            (this.ume = this.Sme(
              Vector_1.Vector.ZeroVectorProxy,
              this.fz,
              this.gme,
            )
              ? -i
              : i),
            (s = MathUtils_1.MathUtils.RangeClamp(this.ume, -25, 25, 0, 790)),
            (this.cme = MathUtils_1.MathUtils.InterpTo(this.cme, s, t, 5)))
        : (this.gme.FromUeVector(this.Ic.K2_GetActorLocation()),
          this.fz.FromUeVector(this.qce.K2_GetActorLocation()),
          this.fz.SubtractionEqual(this.gme),
          this.fz.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
          (this.fz.Z = 0),
          this.fz.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
          this.sme.Subtraction(this.gme, this.pz),
          this.pz.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
          (this.pz.Z = 0),
          this.pz.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
          (i =
            Math.acos(
              MathUtils_1.MathUtils.Clamp(this.fz.DotProduct(this.pz), -1, 1),
            ) * MathUtils_1.MathUtils.RadToDeg),
          (i = MathUtils_1.MathUtils.Clamp(i, -25, 25)),
          (this.ume = this.Sme(
            Vector_1.Vector.ZeroVectorProxy,
            this.fz,
            this.pz,
          )
            ? -i
            : i),
          (this.lme = !0),
          (this._me = Time_1.Time.Now),
          (s = MathUtils_1.MathUtils.RangeClamp(this.ume, -25, 25, 0, 790)),
          (this.cme = MathUtils_1.MathUtils.InterpTo(this.cme, s, t, 3))),
        this.gme.FromUeVector(this.qce.K2_GetActorLocation()),
        this.fz.FromUeVector(this.qce.GetActorForwardVector()),
        this.fz.MultiplyEqual(-1100),
        this.gme.AdditionEqual(this.fz),
        this.fz.FromUeVector(this.qce.GetActorUpVector()),
        this.fz.MultiplyEqual(250),
        this.gme.AdditionEqual(this.fz),
        this.fz.FromUeVector(this.Fce.K2_GetActorLocation()),
        MathUtils_1.MathUtils.VectorInterpTo(
          this.fz,
          this.gme,
          t,
          this.Jce,
          this.pz,
        ),
        this.fme.FromUeRotator(this.Fce.K2_GetActorRotation()),
        this.pme.FromUeRotator(
          UE.KismetMathLibrary.FindLookAtRotation(
            this.Fce.K2_GetActorLocation(),
            this.sme.ToUeVector(),
          ),
        ),
        MathUtils_1.MathUtils.RotatorInterpConstantTo(
          this.fme,
          this.pme,
          t,
          60,
          this.vme,
        ),
        this.Fce.K2_SetActorLocationAndRotation(
          this.pz.ToUeVector(),
          this.vme.ToUeRotator(),
          !1,
          void 0,
          !1,
        ),
        this.fme.FromUeRotator(this.Ic.K2_GetActorRotation()),
        MathUtils_1.MathUtils.RotatorInterpConstantTo(
          this.fme,
          this.pme,
          t,
          60,
          this.vme,
        ),
        (this.dme = MathUtils_1.MathUtils.InterpTo(this.dme, this.cme, t, 6)),
        this.Ic.K2_SetActorLocationAndRotation(
          this.Vce.GetLocationAtDistanceAlongSpline(this.dme, 1),
          this.vme.ToUeRotator(),
          !1,
          void 0,
          !1,
        ),
        this.fme.Set(
          0,
          0,
          0.9 * this.kce.GetRollAtDistanceAlongSpline(this.ome, 0),
        ),
        this.Hh.K2_SetRelativeRotation(this.fme.ToUeRotator(), !1, void 0, !1),
        (this.Hce = this.ome);
    }
  }
  OnDestroy() {
    this.Oce &&
      (ActorSystem_1.ActorSystem.Put(this.Oce),
      (this.kce = void 0),
      (this.Oce = void 0)),
      this.Fce &&
        (ActorSystem_1.ActorSystem.Put(this.Fce),
        (this.Vce = void 0),
        (this.Fce = void 0)),
      (this.Ic = void 0),
      (this.qce = void 0),
      (this.Lie = void 0),
      (this.Gce = void 0),
      (this.Nce = void 0);
  }
  Eme() {
    var t,
      i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    i?.Valid &&
      (t = i.Entity?.GetComponent(3)?.Actor) instanceof
        TsBaseCharacter_1.default &&
      ((this.qce = t),
      this.qce.CharacterMovement?.SetMovementMode(5, 0),
      (this.Gce = i.Entity?.GetComponent(37)),
      this.Gce?.Valid && (this.Gce.CanMoveFromInput = !1),
      (this.Lie = i.Entity?.GetComponent(188)),
      this.Lie?.Valid) &&
      ((this.Nce = i.Entity?.GetComponent(53)), this.Nce?.Valid) &&
      (this.Mme.Set(
        Vector_1.Vector.ZeroVectorProxy,
        Quat_1.Quat.Create(),
        Vector_1.Vector.OneVectorProxy,
      ),
      this.Fce?.IsValid() ||
        ((this.Fce = ActorSystem_1.ActorSystem.Get(
          UE.CommonEffectMoveSpline2_C.StaticClass(),
          this.Mme.ToUeTransform(),
          void 0,
        )),
        (this.Vce = this.Fce.KuroMoveSpline)),
      this.Oce?.IsValid() ||
        (this.Oce = ActorSystem_1.ActorSystem.Get(
          TsGameSplineActor_1.default.StaticClass(),
          this.Mme.ToUeTransform(),
          void 0,
        )),
      !this.kce?.IsValid()) &&
      this.Oce.IsValid() &&
      (this.kce =
        GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(
          MOVE_SPLINE_PB_DATA_ID,
          this.Oce,
        ));
  }
  Sme(t, i, s) {
    var s = UE.KismetMathLibrary.FindLookAtRotation(
        t.ToUeVector(),
        s.ToUeVector(),
      ),
      s = Vector_1.Vector.Create(UE.KismetMathLibrary.GetRightVector(s)),
      h = Vector_1.Vector.Create();
    return (
      i.Subtraction(t, h),
      h.Normalize(),
      90 <
        Math.acos(MathUtils_1.MathUtils.Clamp(s.DotProduct(h), -1, 1)) *
          MathUtils_1.MathUtils.RadToDeg
    );
  }
}
exports.AiShengGuYangCamera = AiShengGuYangCamera;
//# sourceMappingURL=AiShengGuYangCamera.js.map
