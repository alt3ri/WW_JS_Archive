"use strict";
let SplineMoveComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, i, s, h) {
    let e;
    const o = arguments.length;
    let r =
      o < 3 ? i : h === null ? (h = Object.getOwnPropertyDescriptor(i, s)) : h;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, i, s, h);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (e = t[n]) && (r = (o < 3 ? e(r) : o > 3 ? e(i, s, r) : e(i, s)) || r);
    return o > 3 && r && Object.defineProperty(i, s, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplineMoveComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const CurveUtils_1 = require("../../../../Core/Utils/Curve/CurveUtils");
const PowerCurve3_1 = require("../../../../Core/Utils/Curve/PowerCurve3");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines");
const CharacterAttributeTypes_1 = require("../../Character/Common/Component/Abilities/CharacterAttributeTypes");
const CharacterUnifiedStateTypes_1 = require("../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const MAX_INPUT_COS = 0.707;
const FORWARD_BACKWARD_THRESHOLD = 0.5;
const FORECAST_DIST = 500;
const MAX_OFFSET_INCREASE = 1e5;
const DAMPING = 0.96;
const STANDARD_FPS = 60;
class SplineMoveParams {
  constructor(t, i, s) {
    (this.Id = t),
      (this.Spline = s),
      (this.CurrentMaxOffsetSquared = 0),
      (this.CurrentMaxOffset = 0),
      (this.InputLimitCos = 0),
      (this.InputLimitSin = 0),
      (this.Type = "PathLine"),
      (this.MaxOffsetDist = 0),
      (this.OnlyForward = !1),
      (this.InputLimitAngle = 0),
      (this.EdgeLimitCurve = CurveUtils_1.CurveUtils.DefaultLinear),
      (this.Type = i.Pattern.Type),
      (this.MaxOffsetDist = i.Pattern.MaxOffsetDistance ?? 0),
      (this.OnlyForward = i.Pattern.IsOneWay ?? !1),
      i.Pattern.Type === "RacingTrack"
        ? (this.InputLimitAngle = i.Pattern.DirectionAngleLimit)
        : i.Pattern.Type === "SlideTrack" &&
          ((this.InputLimitAngle = i.Pattern.DirectionAngleLimit),
          (this.EdgeLimitCurve = new PowerCurve3_1.PowerCurve3(
            i.Pattern.EdgeLimitCurveFactor,
          ))),
      (this.CurrentMaxOffset = this.MaxOffsetDist + MAX_OFFSET_INCREASE),
      (this.CurrentMaxOffsetSquared =
        this.CurrentMaxOffset * this.CurrentMaxOffset),
      this.Type === "RacingTrack" &&
        ((this.InputLimitCos = Math.cos(
          this.InputLimitAngle * MathUtils_1.MathUtils.DegToRad,
        )),
        (this.InputLimitSin = Math.sin(
          this.InputLimitAngle * MathUtils_1.MathUtils.DegToRad,
        )));
  }
}
let SplineMoveComponent =
  (SplineMoveComponent_1 = class SplineMoveComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.Ssn = void 0),
        (this.Gce = void 0),
        (this.oRe = void 0),
        (this.aYo = void 0),
        (this.Lie = void 0),
        (this.Esn = void 0),
        (this.Uxr = void 0),
        (this.ysn = new Map()),
        (this.Isn = new Array()),
        (this.Tsn = void 0),
        (this.Xrr = Vector_1.Vector.Create()),
        (this.Lsn = 0),
        (this.Dsn = !0),
        (this.LastRightSpeed = 0),
        (this.MinTurnAngle = 0),
        (this.MaxTurnAngle = 0),
        (this.SplineDirection = Vector_1.Vector.Create()),
        (this.Wye = Vector_1.Vector.Create()),
        (this.Asn = Quat_1.Quat.Create()),
        (this.Usn = Vector_1.Vector.Create()),
        (this.Psn = Vector_1.Vector.Create()),
        (this.Due = Vector_1.Vector.Create()),
        (this.Aae = Vector_1.Vector.Create()),
        (this.Lz = Vector_1.Vector.Create()),
        (this.az = Quat_1.Quat.Create());
    }
    static get SplineMoveConfig() {
      return (
        this.xsn ||
          (this.xsn = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            this.DaPath,
            UE.Object,
          )),
        this.xsn
      );
    }
    get CurrentSplineMoveType() {
      return this.Tsn?.Type;
    }
    OnStart() {
      return (
        (this.Uxr = this.Disable("[SplineMoveComponent.OnStart] 默认Disable")),
        (this.Hte = this.Entity.GetComponent(1)),
        (0, RegisterComponent_1.isComponentInstance)(this.Hte, 3) &&
          (this.Ssn = this.Hte),
        (this.Gce = this.Entity.GetComponent(161)),
        (this.oRe = this.Entity.GetComponent(160)),
        (this.aYo = this.Entity.GetComponent(158)),
        (this.Lie = this.Entity.GetComponent(185)),
        (this.Esn = this.Entity.GetComponent(156)),
        !0
      );
    }
    OnEnd() {
      for (const [t] of this.ysn)
        ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
          t,
          this.Entity.Id,
          1,
        );
      return this.ysn.clear(), !(this.Isn.length = 0);
    }
    OnTick(t) {
      let i, s;
      this.Tsn
        ? ((i = (s = this.Tsn.Spline).FindInputKeyClosestToWorldLocation(
            this.Hte.ActorLocationProxy.ToUeVector(),
          )),
          this.Wye.FromUeVector(s.GetLocationAtSplineInputKey(i, 1)),
          this.SplineDirection.DeepCopy(s.GetDirectionAtSplineInputKey(i, 1)),
          (this.SplineDirection.Z = 0),
          this.SplineDirection.Normalize(),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            this.SplineDirection,
            Vector_1.Vector.UpVectorProxy,
            this.Asn,
          ),
          (s = t * MathUtils_1.MathUtils.MillisecondToSecond),
          this.wsn(i, s),
          this.Xrr.DeepCopy(this.Due),
          this.Bsn())
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "Tick in No SplineMove!"),
          (this.Uxr = this.Disable(
            "[SplineMoveComponent.OnTick] this.CurrentSplineMoveParams为false",
          )));
    }
    bsn(s) {
      if (this.Ssn && this.Tsn.Type === "RacingTrack") {
        var h = this.Ssn.InputDirectProxy;
        (this.Lz.X = -this.SplineDirection.Y),
          (this.Lz.Y = this.SplineDirection.X),
          (this.Lz.Z = 0);
        let t = this.Lz.DotProduct(h);
        t < -this.Tsn.InputLimitSin
          ? (t = -this.Tsn.InputLimitSin)
          : t > this.Tsn.InputLimitSin && (t = this.Tsn.InputLimitSin);
        var h = this.Gce.CharacterMovement.MaxWalkSpeed * t;
        var e = this.Gce.CharacterMovement.MaxAcceleration;
        const o = h - this.LastRightSpeed;
        var e = e * s;
        let i = 0;
        Math.abs(o) > e
          ? ((i =
              o * this.LastRightSpeed < 0
                ? this.LastRightSpeed * Math.pow(DAMPING, s * STANDARD_FPS)
                : this.LastRightSpeed),
            (i += Math.sign(o) * e))
          : (i = h),
          this.Lz.MultiplyEqual(((this.LastRightSpeed + i) / 2) * s),
          this.Due.AdditionEqual(this.Lz),
          (this.LastRightSpeed = i);
      }
    }
    wsn(t, i) {
      this.Due.DeepCopy(this.Hte.ActorLocationProxy),
        this.bsn(i),
        this.Hte.ActorLocationProxy.Subtraction(this.Xrr, this.Lz);
      let s;
      var h = this.Lz.DotProduct(this.SplineDirection) > 0;
      var h =
        (this.Tsn.OnlyForward && !h
          ? (this.Xrr.Subtraction(this.Due, this.Aae),
            (h = this.SplineDirection.DotProduct(this.Aae)),
            this.SplineDirection.Multiply(h, this.Lz),
            this.Due.AdditionEqual(this.Lz))
          : ((h = this.Tsn.Spline),
            this.Psn.FromUeVector(h.GetDirectionAtSplineInputKey(this.Lsn, 1)),
            (this.Psn.Z = 0),
            this.Psn.Normalize() &&
              (this.Gce &&
                (this.Lz.FromUeVector(this.Gce.CharacterMovement.Velocity),
                Quat_1.Quat.FindBetween(
                  this.Psn,
                  this.SplineDirection,
                  this.az,
                ),
                this.az.RotateVector(this.Lz, this.Lz),
                (this.Gce.CharacterMovement.Velocity = this.Lz.ToUeVector())),
              this.Tsn.Type === "RacingTrack") &&
              (this.Usn.FromUeVector(
                h.GetLocationAtSplineInputKey(this.Lsn, 1),
              ),
              this.Due.Subtraction(this.Usn, this.Aae),
              (this.Aae.Z = 0),
              this.Psn.Multiply(this.Aae.DotProduct(this.Psn), this.Lz),
              this.Aae.SubtractionEqual(this.Lz),
              this.az.RotateVector(this.Aae, this.Lz),
              (h = this.Due.Z),
              this.Wye.Addition(this.Lz, this.Due),
              (this.Due.Z = h)),
            (this.Lsn = t)),
        this.Wye.Subtraction(this.Due, this.Aae),
        (this.Aae.Z = 0),
        this.SplineDirection.Multiply(
          this.Aae.DotProduct(this.SplineDirection),
          this.Lz,
        ),
        this.Aae.SubtractionEqual(this.Lz),
        this.Aae.SizeSquared());
      var t = this.Tsn.CurrentMaxOffset;
      this.Tsn.CurrentMaxOffsetSquared < h
        ? t > 0
          ? ((s = Math.sqrt(h)),
            this.Aae.Multiply((s - t) / s, this.Lz),
            this.Due.AdditionEqual(this.Lz))
          : ((this.Aae.Z = 0), this.Due.AdditionEqual(this.Aae))
        : this.Tsn.CurrentMaxOffset > this.Tsn.MaxOffsetDist &&
          (h > MathUtils_1.MathUtils.Square(this.Tsn.MaxOffsetDist)
            ? ((this.Tsn.CurrentMaxOffset = Math.sqrt(h)),
              (this.Tsn.CurrentMaxOffsetSquared = h))
            : ((this.Tsn.CurrentMaxOffset = this.Tsn.MaxOffsetDist),
              (this.Tsn.CurrentMaxOffsetSquared = MathUtils_1.MathUtils.Square(
                this.Tsn.MaxOffsetDist,
              )))),
        Vector_1.Vector.DistSquared(this.Hte.ActorLocationProxy, this.Due) >
          MathUtils_1.MathUtils.SmallNumber &&
          (this.Gce
            ? (this.Due.Subtraction(this.Hte.ActorLocationProxy, this.Aae),
              this.Gce.MoveCharacter(this.Aae, i))
            : this.Hte.SetActorLocation(this.Due.ToUeVector(), "样条移动", !1));
    }
    Bsn() {
      let t;
      this.Ssn &&
        ((t = this.Ssn.InputDirectProxy),
        this.aYo?.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
          (ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(
            this.az,
          ),
          this.az.RotateVector(t, this.Lz),
          this.Ssn.SetInputDirect(this.Lz)),
        this.qsn(t),
        this.aYo?.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Climb) &&
        (this.Hte.ActorQuatProxy.Inverse(this.az),
        this.az.RotateVector(t, this.Lz),
        (this.Lz.Z = 0),
        this.Ssn.SetInputDirect(this.Lz));
    }
    qsn(i) {
      const s = this.Tsn;
      if (s.Type === "RacingTrack")
        this.Ssn.SetInputRotatorByNumber(
          0,
          this.SplineDirection.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg,
          0,
        ),
          i.IsNearlyZero() ||
          ((h = this.SplineDirection.DotProduct(i)), s.OnlyForward) ||
          h >
            (this.Dsn
              ? -FORWARD_BACKWARD_THRESHOLD
              : FORWARD_BACKWARD_THRESHOLD)
            ? ((this.Dsn = !0), this.Ssn.SetInputDirect(this.SplineDirection))
            : ((this.Dsn = !1),
              this.SplineDirection.UnaryNegation(this.Lz),
              this.Ssn.SetInputDirect(this.Lz));
      else if (s.Type === "PathLine") {
        var h = i.DotProduct(this.SplineDirection);
        let t = 0;
        if (s.OnlyForward) {
          if (i.DotProduct(this.SplineDirection) < MAX_INPUT_COS)
            return void this.Ssn.ClearInput();
          t = 1;
        } else {
          if (Math.abs(h) < MAX_INPUT_COS) return void this.Ssn.ClearInput();
          t = Math.sign(h);
        }
        this.SplineDirection.Multiply(t * FORECAST_DIST, this.Lz),
          this.Lz.AdditionEqual(this.Wye),
          this.Lz.SubtractionEqual(this.Due),
          (this.Lz.Z = 0),
          this.Lz.Normalize(),
          this.Ssn.SetInputDirect(this.Lz),
          this.Ssn.SetInputRotatorByNumber(
            0,
            this.Lz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg,
            0,
          );
      } else this.Gsn(i);
    }
    Gsn(t) {
      let i = this.Tsn;
      let s =
        (this.Asn.Inverse(this.az),
        this.Hte.ActorLocationProxy.Subtraction(this.Wye, this.Lz),
        this.az.RotateVector(this.Lz, this.Lz),
        i.EdgeLimitCurve.GetCurrentValue(
          Math.abs(this.Lz.Y) / i.MaxOffsetDist,
        ));
      let h = -i.InputLimitAngle;
      let e = i.InputLimitAngle;
      this.Lz.Y < 0 ? (h *= 1 - s) : (e *= 1 - s),
        (this.MinTurnAngle = h),
        (this.MaxTurnAngle = e),
        t.IsNearlyZero()
          ? this.Asn.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Lz)
          : (ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(
              this.az,
            ),
            this.az.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Lz),
            (this.Lz.Z = 0),
            this.Lz.IsNearlyZero() &&
              this.az.RotateVector(Vector_1.Vector.UpVectorProxy, this.Lz),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              this.Lz,
              Vector_1.Vector.UpVectorProxy,
              this.az,
            ),
            this.az.Inverse(this.az),
            this.az.RotateVector(t, this.Lz),
            (i = this.Lz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg),
            (s =
              MathUtils_1.MathUtils.Clamp(i, h, e) *
              MathUtils_1.MathUtils.DegToRad),
            this.Lz.Set(Math.cos(s), Math.sin(s), 0),
            this.Asn.RotateVector(this.Lz, this.Lz)),
        this.Ssn.SetInputDirect(this.Lz),
        this.Ssn.SetInputRotatorByNumber(
          0,
          this.Lz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg,
          0,
        );
    }
    StartSplineMove(t, i) {
      let s;
      (this.Isn.length && this.Isn[this.Isn.length - 1] === t) ||
        ((s =
          ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
            t,
            this.Entity.Id,
            1,
          )),
        this.StartSplineMoveInternal(t, i, s));
    }
    StartSplineMoveInternal(t, i, s) {
      let h;
      this.Uxr &&
        (this.Enable(this.Uxr, "SplineMoveComponent.StartSplineMoveInternal"),
        (this.Uxr = void 0),
        i.Pattern.Type !== "SlideTrack") &&
        (this.Gce?.SetTurnRate(SplineMoveComponent_1.SplineMoveConfig.TurnRate),
        this.Gce?.SetAirControl(
          SplineMoveComponent_1.SplineMoveConfig.AirControl,
        ),
        this.Gce?.SetOverrideMaxFallingSpeed(
          SplineMoveComponent_1.SplineMoveConfig.MaxFlySpeed,
        ),
        this.Lie?.AddTag(-451106150),
        this.Esn?.SetBaseValue(
          Protocol_1.Aki.Protocol.KBs.Proto_Jump,
          CharacterAttributeTypes_1.PER_TEN_THOUSAND *
            SplineMoveComponent_1.SplineMoveConfig.JumpHeightRate,
        ),
        (h = this.oRe?.MainAnimInstance),
        UE.KuroStaticLibrary.IsObjectClassByName(
          h,
          CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
        )) &&
        h.设置跳跃速率(SplineMoveComponent_1.SplineMoveConfig.JumpTimeScale);
      let e = this.ysn.get(t);
      e || ((e = new SplineMoveParams(t, i, s)), this.ysn.set(t, e)),
        this.Isn.push(t),
        (this.Tsn = e).OnlyForward &&
          (this.Xrr.DeepCopy(this.Hte.ActorLocationProxy),
          (this.Lsn = s.FindInputKeyClosestToWorldLocation(
            this.Xrr.ToUeVector(),
          ))),
        (this.LastRightSpeed = 0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Movement",
            6,
            "StartSplineMove",
            ["Spline Id", t],
            ["Actor", this.Hte.Owner.GetName()],
            ["StackCount", this.Isn.length],
          );
    }
    EndSplineMove(t) {
      if (this.ysn.get(t)) {
        for (
          ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
            t,
            this.Entity.Id,
            1,
          ),
            this.ysn.delete(t);
          this.Isn.length && !this.ysn.has(this.Isn[this.Isn.length - 1]);

        )
          this.Isn.length = this.Isn.length - 1;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Movement",
            6,
            "EndSplineMove",
            ["Spline Id", t],
            ["Actor", this.Hte.Owner.GetName()],
            ["StackCount", this.Isn.length],
          ),
          this.Isn.length
            ? (this.Tsn = this.ysn.get(this.Isn[this.Isn.length - 1]))
            : this.Uxr ||
              ((this.Uxr = this.Disable(
                "[SplineMoveComponent.EndSplineMove] 没有下一个SplineMove",
              )),
              this.Gce?.ResetTurnRate(),
              this.Gce?.ResetAirControl(),
              this.Gce?.ResetOverrideMaxFallingSpeed(),
              this.Lie?.RemoveTag(-451106150),
              this.Esn?.SetBaseValue(
                Protocol_1.Aki.Protocol.KBs.Proto_Jump,
                CharacterAttributeTypes_1.PER_TEN_THOUSAND,
              ),
              (t = this.oRe?.MainAnimInstance),
              UE.KuroStaticLibrary.IsObjectClassByName(
                t,
                CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
              ) && t.设置跳跃速率(1));
      }
    }
  });
(SplineMoveComponent.DaPath =
  "/Game/Aki/Data/Fight/DA_SplineMoveConfig.DA_SplineMoveConfig"),
  (SplineMoveComponent.xsn = void 0),
  (SplineMoveComponent = SplineMoveComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(95)],
      SplineMoveComponent,
    )),
  (exports.SplineMoveComponent = SplineMoveComponent);
// # sourceMappingURL=SplineMoveComponent.js.map
