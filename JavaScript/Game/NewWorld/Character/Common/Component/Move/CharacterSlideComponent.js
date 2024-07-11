"use strict";
var CharacterSlideComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, h) {
      var e,
        r = arguments.length,
        a =
          r < 3
            ? i
            : null === h
              ? (h = Object.getOwnPropertyDescriptor(i, s))
              : h;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, i, s, h);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (e = t[o]) &&
            (a = (r < 3 ? e(a) : 3 < r ? e(i, s, a) : e(i, s)) || a);
      return 3 < r && a && Object.defineProperty(i, s, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSlideComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  SlideById_1 = require("../../../../../../Core/Define/ConfigQuery/SlideById"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  PreloadConstants_1 = require("../../../../../World/Controller/PreloadConstants"),
  CharacterNameDefines_1 = require("../../CharacterNameDefines"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./CustomMovementDefine"),
  LEAVE_SLIDE_TIME = 0.25,
  LEAVE_SLIDE_MIN_HEIGHT = 5,
  PROFILE_KEY = "slide",
  CHANGE_FORWARD_ANGLE_THRESHOLD = 135,
  COMBINE_NORMAL_Z_THRESHOLD = 0.707,
  SLIDE_Z_THRESHOLD = 0.1,
  SKI_BRAKE_ANGLE_THRESHOLD = 135,
  SKI_MAX_INPUT_ANGLE = 135,
  DEFAULT_SKI_MAX_TURN_ANGLE = 50,
  DEFAULT_SKI_MAX_FALLING_SPEED = 5e3;
class SkiParams {
  constructor() {
    (this.InitSpeed = 700),
      (this.BaseAccForSpeedUp = 300),
      (this.BaseAccForSpeedDown = 300),
      (this.BaseTargetSpeed = 1e3),
      (this.SlopExtraTargetSpeed = 200),
      (this.SlopExtraAccel = 150),
      (this.TurnSpeed = 50),
      (this.IgnoreStepHeight = 20),
      (this.JumpTurnRate = 0.4);
  }
}
let CharacterSlideComponent =
  (CharacterSlideComponent_1 = class CharacterSlideComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.Gce = void 0),
        (this.oRe = void 0),
        (this.W5r = void 0),
        (this.cBe = void 0),
        (this.Lie = void 0),
        (this.Nce = void 0),
        (this.Lz = Vector_1.Vector.Create()),
        (this.Tz = Vector_1.Vector.Create()),
        (this.M7o = Vector_1.Vector.Create()),
        (this.S7o = Vector_1.Vector.Create()),
        (this.AJr = Vector_1.Vector.Create()),
        (this.UJr = -0),
        (this.SlideForward = Vector_1.Vector.Create()),
        (this.GroundNormal = Vector_1.Vector.Create()),
        (this.pZo = new Array()),
        (this.PJr = new Set()),
        (this.wJr = 0),
        (this.BJr = 0),
        (this.SlideSwitchThisFrame = !1),
        (this.StandMode = !1),
        (this.LastAngleOffset = 0),
        (this.bJr = void 0),
        (this.qJr = void 0),
        (this.GJr = 0),
        (this.NJr = void 0),
        (this.OJr = !1),
        (this.kJr = void 0),
        (this.$Rn = void 0),
        (this.FJr = Vector_1.Vector.Create()),
        (this.wbn = Vector_1.Vector.Create()),
        (this.bbn = Vector_1.Vector.Create()),
        (this.hUe = (t, i) => {
          i !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
            (this.Gce.CharacterMovement.FallingLateralFriction = 0),
            i === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
              (this.bbn.DeepCopy(this.Hte.ActorForwardProxy),
              this.Gce.ResetTurnRate(),
              this.wbn.Equality(Vector_1.Vector.ZeroVectorProxy) ||
                (this.Lz.DeepCopy(this.wbn),
                this.FJr.Multiply(this.Lz.DotProduct(this.FJr), this.Tz),
                this.Lz.Subtraction(this.Tz, this.Tz),
                (i = this.Tz.Size()),
                this.Lz.DeepCopy(this.Hte.ActorForwardProxy),
                this.FJr.Multiply(this.Lz.DotProduct(this.FJr), this.M7o),
                this.Lz.Subtraction(this.M7o, this.M7o),
                this.M7o.Normalize() ||
                  this.Lz.DeepCopy(this.Hte.ActorForwardProxy),
                this.M7o.MultiplyEqual(i),
                this.Gce.SetForceSpeed(this.M7o),
                this.wbn.Reset()));
        }),
        (this.VJr = !1),
        (this.HJr = (t) => {
          this.OJr &&
            (this.Hte.ActorForwardProxy.Multiply(this.NJr.InitSpeed, this.Lz),
            this.Gce.SetForceSpeed(this.Lz),
            (this.OJr = !1)),
            this.qbn(t, this.bbn),
            this.Gbn(this.Lz),
            UE.KuroMovementBPLibrary.KuroSki(
              t,
              this.Gce.CharacterMovement,
              this.GroundNormal.ToUeVector(),
              this.bbn.ToUeVector(),
              this.Lz.ToUeVector(),
              this.NJr.IgnoreStepHeight,
              void 0,
            ) ||
              (this.jJr()
                ? (this.Gce.CharacterMovement.SetMovementMode(1),
                  this.W5r.SetMoveState(
                    CharacterUnifiedStateTypes_1.ECharMoveState.Run,
                  ))
                : this.Gce.CharacterMovement.SetMovementMode(3));
        }),
        (this.WJr = (s) => {
          var h = CharacterSlideComponent_1.SlideConfig,
            e = (this.M7o.DeepCopy(this.Hte.InputDirectProxy), this.M7o);
          let t = !1;
          if (e.Normalize())
            if (
              ((t = h.Ski),
              this.Lz.DeepCopy(this.SlideForward),
              this.Lz.CrossProduct(Vector_1.Vector.UpVectorProxy, this.Tz),
              this.Tz.CrossProduct(this.Lz, this.AJr),
              this.AJr.Normalize())
            ) {
              let t = !0;
              h.Ski &&
                ((r =
                  this.SlideForward.HeadingAngle() *
                  MathUtils_1.MathUtils.RadToDeg),
                (a = e.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg),
                (t =
                  Math.abs(MathUtils_1.MathUtils.WrapAngle(r - a)) <
                  SKI_BRAKE_ANGLE_THRESHOLD)) &&
                ((r =
                  this.Hte.ActorVelocityProxy.HeadingAngle() *
                  MathUtils_1.MathUtils.RadToDeg),
                (a = MathUtils_1.MathUtils.WrapAngle(a - r)),
                Math.abs(a) > SKI_MAX_INPUT_ANGLE) &&
                ((r =
                  MathUtils_1.MathUtils.WrapAngle(
                    r + Math.sign(a) * SKI_MAX_INPUT_ANGLE,
                  ) * MathUtils_1.MathUtils.DegToRad),
                e.Set(Math.cos(r), Math.sin(r), 0));
              var r,
                a = e.DotProduct(this.AJr);
              let i = 0;
              0 < a
                ? ((i = a * h.SlideAccelUp),
                  (r = this.Hte.ActorVelocityProxy.DotProduct(this.AJr)),
                  h.Ski
                    ? (i *= MathUtils_1.MathUtils.RangeClamp(
                        r,
                        -h.SkiHorizontalInputSpeedThreshold.Max,
                        -h.SkiHorizontalInputSpeedThreshold.Min,
                        1,
                        0,
                      ))
                    : i * h.SlideAccel * s > r && (i = 0))
                : (i = a * h.SlideAccelDown),
                this.AJr.Multiply(i, this.Lz),
                t &&
                  (this.Tz.MultiplyEqual(
                    this.Tz.DotProduct(e) / this.Tz.SizeSquared(),
                  ),
                  this.Lz.AdditionEqual(this.Tz)),
                this.Lz.MultiplyEqual(h.SlideAccel);
            } else e.Multiply(h.SlideAccel, this.Lz);
          else this.Lz.Reset();
          this.Lz.ContainsNaN() &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "Slide speed has NaN", [
              "velocity",
              this.Lz,
            ]);
          let i = 0,
            o = 0,
            _ = 0,
            n = 0;
          (n = this.qJr
            ? ((i = 0), (o = 0), (_ = this.qJr.LimitSpeed))
            : ((i = this.BJr),
              (o = h.SlideFriction),
              t
                ? ((_ = h.SkiMaxSpHor), h.SkiMaxSpVer)
                : ((_ = h.MaxSlideHorizontalSeed), -1))),
            this.Gce.CharacterMovement.KuroSlide(
              s,
              i,
              o,
              this.UJr === LEAVE_SLIDE_TIME
                ? this.Lz.ToUeVector()
                : Vector_1.Vector.ZeroVector,
              _,
              this.GroundNormal.ToUeVector(),
              n,
              CharacterSlideComponent_1.SpeedReduceCurve,
            )
              ? (this.UJr = LEAVE_SLIDE_TIME)
              : this.Gce.CharacterMovement.Kuro_GetBlockActorWhenMove()
                ? (this.Gce.CharacterMovement.SetMovementMode(1),
                  (this.VJr = !0))
                : ((this.UJr -= s),
                  this.UJr < 0 &&
                    this.KJr() &&
                    (this.Gce.CharacterMovement.SetMovementMode(3),
                    (this.VJr = !0)));
        }),
        (this.QJr = (t, i, s) => {
          0 !== i ||
            s ||
            ((i = t.GetComponent(32)),
            this.W5r.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
              this.W5r.MoveState !==
                CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
              i.W5r.MoveState !==
                CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
              i.W5r.MoveState !==
                CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) ||
            ((this.UJr = i.UJr),
            this.SlideForward.DeepCopy(i.SlideForward),
            (this.wJr = i.wJr),
            (this.BJr = i.BJr),
            (this.SlideSwitchThisFrame = i.SlideSwitchThisFrame),
            (this.StandMode = i.StandMode),
            (this.LastAngleOffset = i.LastAngleOffset),
            (this.NJr = i.NJr),
            (this.qJr = i.qJr),
            (this.GJr = i.GJr));
        }),
        (this.YRn = (t, i) => {
          i ||
            (this.bJr && this.Gce.StopAddMove(this.bJr),
            this.Gce.ResetTurnRate(),
            this.Lie.RemoveTagAddOrRemoveListener(378770267, this.YRn));
        });
    }
    static get SlideConfig() {
      return (
        this.SlideConfigInternal || this.SetSlideConfig(0),
        this.SlideConfigInternal
      );
    }
    static SetSlideConfig(t) {
      if (this.SlideConfigInternal?.Id !== t.toString()) {
        this.SlideConfigInternal = SlideById_1.configSlideById.GetConfig(
          t.toString(),
        );
        var i,
          s,
          h = new Array();
        for ([i, s] of this.SlideConfigInternal.FallingLateralFrictions) {
          var e = Math.cos(i * MathUtils_1.MathUtils.DegToRad),
            e = [e * e * e, e * e, e, 1, s];
          h.push(e);
        }
        for (let s = h.length - 1; 0 <= s; --s)
          for (let i = 0; i < s; ++i) {
            var r = h[i][s] / h[s][s];
            for (let t = 0; t < h[s].length; ++t) h[i][t] -= h[s][t] * r;
          }
        for (let s = 0; s < h.length; ++s) {
          for (let i = s + 1; i < h.length; ++i) {
            var a = h[i][s] / h[s][s];
            for (let t = 0; t < h[s].length; ++t) h[i][t] -= h[s][t] * a;
          }
          this.SlideFallingCoefficientArray[s] = h[s][4] / h[s][s];
        }
        this.SlideConfigInternal.SpeedReduceCurve
          ? ResourceSystem_1.ResourceSystem.LoadAsync(
              this.SlideConfigInternal.SpeedReduceCurve,
              UE.CurveFloat,
              (t) => {
                this.SpeedReduceCurve = t;
              },
            )
          : (this.SpeedReduceCurve = void 0);
      }
    }
    static GetSlideFallingFriction(t) {
      this.SlideConfigInternal || this.SetSlideConfig(0);
      let i = 0;
      for (const s of this.SlideFallingCoefficientArray) i = i * t + s;
      return i;
    }
    static get JumpAddMoveCurve() {
      return (
        this.XJr ||
          (this.XJr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            PreloadConstants_1.SLIDE_JUMP_ADD_MOVE_CURVE,
            UE.CurveFloat,
          )),
        this.XJr
      );
    }
    static get Dependencies() {
      return [3, 161, 158];
    }
    Gbn(t) {
      let i = this.NJr.BaseAccForSpeedUp,
        s = this.NJr.BaseTargetSpeed;
      var h =
          (Math.acos(
            Vector_1.Vector.DotProduct(
              this.SlideForward,
              Vector_1.Vector.UpVectorProxy,
            ),
          ) *
            MathUtils_1.MathUtils.RadToDeg) /
          90,
        e = this.NJr.SlopExtraAccel * h,
        h = this.NJr.SlopExtraTargetSpeed * h,
        r = Math.sign(
          Vector_1.Vector.DotProduct(
            this.Hte.ActorForwardProxy,
            this.SlideForward,
          ),
        );
      (i += r * e),
        (s += r * h),
        this.qJr && ((i += this.qJr.Acceleration), (s += this.qJr.LimitSpeed)),
        t.Set(i, this.NJr.BaseAccForSpeedDown, s);
    }
    qbn(t, i) {
      var s = this.Lz,
        h = this.Tz,
        e = this.M7o,
        r = this.S7o,
        a = this.NJr.TurnSpeed;
      let o = -DEFAULT_SKI_MAX_TURN_ANGLE,
        _ = DEFAULT_SKI_MAX_TURN_ANGLE;
      var n = this.Entity.GetComponent(95),
        n =
          (s.DeepCopy(this.Hte.ActorForwardProxy),
          n?.Active &&
            ((o = n.MinTurnAngle),
            (_ = n.MaxTurnAngle),
            s.DeepCopy(n.SplineDirection)),
          this.SlideForward.CrossProduct(s, e),
          e.Normalize() || e.DeepCopy(this.Hte.ActorRightProxy),
          h.DeepCopy(this.Hte.InputDirectProxy),
          h.Normalize() ? e.Multiply(e.DotProduct(h), h) : h.Reset(),
          h.ContainsNaN() &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 51, "滑雪输入中有NaN", ["Input", h]),
          r.DeepCopy(this.Hte.ActorVelocityProxy),
          r.Normalize() || r.DeepCopy(this.Hte.ActorForwardProxy),
          r.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg),
        r = s.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg,
        s = this.Obn(n - r),
        n = h.DotProduct(e) * a * t,
        s = MathUtils_1.MathUtils.Clamp(s + n, o, _);
      (s = this.Obn(s + r)),
        i.FromUeVector(MathUtils_1.MathUtils.GetVector2dByAngle(s));
    }
    Obn(t) {
      let i = t;
      for (; 180 < i; ) i -= 360;
      for (; i < -180; ) i += 360;
      return i;
    }
    OnStart() {
      if (
        ((this.Hte = this.Entity.GetComponent(3)),
        (this.Gce = this.Entity.GetComponent(161)),
        (this.oRe = this.Entity.GetComponent(160)),
        (this.Nce = this.Entity.GetComponent(52)),
        (this.W5r = this.Entity.GetComponent(158)),
        (this.cBe = this.Entity.GetComponent(33)),
        (this.Lie = this.Entity.GetComponent(185)),
        this.Lz.Reset(),
        this.AJr.Reset(),
        this.Lie?.Valid)
      )
        for (const i of CharacterSlideComponent_1.X2r)
          this.pZo.push(
            this.Lie.ListenForTagAnyCountChanged(i, (t) => {
              this.Moi(i, t);
            }),
          ),
            this.Lie.HasTag(i) && this.PJr.add(i);
      return (
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.hUe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSlide,
          this.WJr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSki,
          this.HJr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.QJr,
        ),
        !0
      );
    }
    OnEnd() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.hUe,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSlide,
          this.WJr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSki,
          this.HJr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.QJr,
        );
      for (const t of this.pZo) t.EndTask();
      return !(this.pZo.length = 0);
    }
    OnTick(t) {
      !this.Hte?.IsMoveAutonomousProxy ||
        this.W5r.MoveState ===
          CharacterUnifiedStateTypes_1.ECharMoveState.Glide ||
        this.Gce.IsJump ||
        (this.cBe?.CurrentSkill
          ? this.W5r?.MoveState ===
              CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
            this.Gce.CharacterMovement?.SetMovementMode(3)
          : this.Nce.IsInAutomaticFlightMode() ||
            (this.Lie.HasTag(378770267)
              ? this.TickSkiMode(t)
              : this.TickSlideMode(t)));
    }
    $Jr(t, i) {
      (this.SlideSwitchThisFrame = !1),
        this.NJr
          ? ((this.SlideSwitchThisFrame = !t && !this.StandMode),
            (this.StandMode = !0))
          : t
            ? ((this.SlideSwitchThisFrame = !1),
              (this.StandMode =
                this.SlideForward.Z >
                Math.cos(
                  ((i.SlideModeSwitchRange.Min + i.SlideModeSwitchRange.Max) /
                    2) *
                    MathUtils_1.MathUtils.DegToRad,
                )))
            : this.StandMode
              ? this.SlideForward.Z <
                  Math.cos(
                    i.SlideModeSwitchRange.Max * MathUtils_1.MathUtils.DegToRad,
                  ) && ((this.StandMode = !1), (this.SlideSwitchThisFrame = !0))
              : this.SlideForward.Z >
                  Math.cos(
                    i.SlideModeSwitchRange.Min * MathUtils_1.MathUtils.DegToRad,
                  ) &&
                ((this.StandMode = !0), (this.SlideSwitchThisFrame = !0));
    }
    YJr(t) {
      var i, s;
      this.NJr
        ? (this.Lz.FromUeVector(this.Gce.CharacterMovement.Velocity),
          (i =
            this.Lz.SizeSquared2D() < MathUtils_1.MathUtils.SmallNumber
              ? this.Hte.ActorRotationProxy.Yaw
              : MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz)),
          this.Hte.SetInputRotatorByNumber(0, i, 0),
          this.Hte.SetOverrideTurnSpeed(this.NJr.TurnSpeed))
        : ((i = MathUtils_1.MathUtils.GetAngleByVector2D(this.SlideForward)),
          this.Lie.HasTag(-91611865) || this.StandMode
            ? (this.Hte.SetInputRotatorByNumber(0, i, 0),
              (this.LastAngleOffset = 0))
            : (t || this.Hte.InputDirectProxy.IsNearlyZero()
                ? this.Lz.DeepCopy(this.Hte.ActorForwardProxy)
                : this.Lz.DeepCopy(this.Hte.InputDirectProxy),
              (s = MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz)),
              (s = MathUtils_1.MathUtils.WrapAngle(s - i)),
              (t ||
                Math.abs(
                  MathUtils_1.MathUtils.WrapAngle(this.LastAngleOffset - s),
                ) > CHANGE_FORWARD_ANGLE_THRESHOLD) &&
                (this.LastAngleOffset = 180 * Math.round(s / 180)),
              this.Hte.SetInputRotatorByNumber(0, i + this.LastAngleOffset, 0)),
          this.Hte.SetOverrideTurnSpeed(
            CharacterSlideComponent_1.SlideConfig.TurnSpeed,
          ));
    }
    Moi(t, i) {
      0 === i ? this.PJr.delete(t) : this.PJr.add(t);
    }
    KJr() {
      var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace(),
        t =
          ((t.WorldContextObject = this.Hte.Actor),
          (t.Radius = this.Hte.ScaledRadius),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            t,
            this.Hte.ActorLocationProxy,
          ),
          this.Lz.DeepCopy(this.Hte.ActorLocationProxy),
          (this.Lz.Z -=
            this.Hte.ScaledHalfHeight -
            this.Hte.Radius +
            LEAVE_SLIDE_MIN_HEIGHT),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Lz),
          TraceElementCommon_1.TraceElementCommon.ShapeTrace(
            this.Hte.Actor.CapsuleComponent,
            t,
            PROFILE_KEY,
            PROFILE_KEY,
          ));
      return !t;
    }
    jJr() {
      var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
      (t.WorldContextObject = this.Hte.Actor),
        (t.Radius = this.Hte.ScaledRadius),
        this.Lz.DeepCopy(this.Hte.ActorLocationProxy),
        (this.Lz.Z -= this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Lz),
        this.Tz.DeepCopy(this.Hte.ActorLocationProxy),
        (this.Tz.Z -= this.Hte.ScaledHalfHeight),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Tz),
        t.ActorsToIgnore.Empty();
      for (const i of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
        t.ActorsToIgnore.Add(i);
      return TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        this.Hte.Actor.CapsuleComponent,
        t,
        PROFILE_KEY,
        PROFILE_KEY,
      )
        ? t.HitResult
        : void 0;
    }
    JJr() {
      var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
      (t.WorldContextObject = this.Hte.Actor),
        (t.Radius = this.Hte.ScaledRadius),
        this.Lz.DeepCopy(this.Hte.ActorLocationProxy),
        (this.Lz.Z -= this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Lz),
        Vector_1.Vector.UpVectorProxy.CrossProduct(this.SlideForward, this.M7o),
        this.M7o.CrossProduct(this.SlideForward, this.M7o),
        this.M7o.Normalize(),
        this.M7o.MultiplyEqual(100),
        this.Lz.Addition(this.M7o, this.Tz),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.Tz),
        t.ActorsToIgnore.Empty();
      for (const i of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
        t.ActorsToIgnore.Add(i);
      return (
        !TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          this.Hte.Actor.CapsuleComponent,
          t,
          PROFILE_KEY,
          PROFILE_KEY,
        ) ||
        (TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
          t.HitResult,
          0,
          this.M7o,
        ),
        this.M7o.AdditionEqual(this.SlideForward),
        !!this.M7o.Normalize() && this.M7o.Z < COMBINE_NORMAL_Z_THRESHOLD)
      );
    }
    OnJump() {
      this.Hte &&
        (this.wbn.DeepCopy(this.Hte.ActorVelocityProxy),
        this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
        this.FJr.Multiply(this.Lz.DotProduct(this.FJr), this.Tz),
        this.Lz.Subtraction(this.Tz, this.M7o),
        (this.bJr = this.Gce?.SetAddMoveWorld(
          this.M7o.ToUeVector(),
          2,
          void 0,
          this.bJr,
          void 0,
          2,
        )),
        this.Gce.SetTurnRate(this.NJr.JumpTurnRate),
        this.Lie.AddTagAddOrRemoveListener(378770267, this.YRn));
    }
    SetSkiAccel(t) {
      (this.W5r?.PositionState !==
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
        this.W5r?.MoveState !==
          CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) ||
        ((this.GJr = t.Duration),
        (this.qJr = t),
        this.qJr.InstantSpeed &&
          (this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
          this.Lz.Normalize() || this.Lz.DeepCopy(this.Hte.ActorForwardProxy),
          this.Lz.MultiplyEqual(this.qJr.InstantSpeed),
          this.Lz.AdditionEqual(this.Hte.ActorVelocityProxy),
          this.Gce.SetForceSpeed(this.Lz)),
        this.Lie.AddTag(-1940399338));
    }
    TickSlideMode(t) {
      if (this.VJr) this.VJr = !1;
      else if (
        0 < this.PJr.size ||
        (this.oRe?.Valid && this.oRe.HasKuroRootMotion)
      )
        this.W5r.MoveState ===
          CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
          this.Gce.CharacterMovement.SetMovementMode(3);
      else {
        let t = !1;
        var i = this.Gce.CharacterMovement.Kuro_GetBlockDirectWhenMove(),
          s = this.Gce.CharacterMovement.Kuro_GetBlockActorWhenMove(),
          h = CharacterSlideComponent_1.SlideConfig;
        if (
          (this.GroundNormal.Reset(),
          this.M7o.FromUeVector(this.Gce.CharacterMovement.Velocity),
          i.Z > SLIDE_Z_THRESHOLD &&
            (this.NJr ||
              this.M7o.Z < -MathUtils_1.MathUtils.KindaSmallNumber) &&
            s &&
            !s.ActorHasTag(
              CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE,
            ))
        ) {
          if (
            (this.SlideForward.FromUeVector(i),
            this.GroundNormal.DeepCopy(this.SlideForward),
            this.W5r.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.Slide && !this.JJr())
          )
            return;
          this.W5r.MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
            (this.Gce.CharacterMovement.SetMovementMode(
              6,
              CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE,
            ),
            this.W5r.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.Slide,
            ),
            (t = !0),
            (this.wJr = 0),
            (this.UJr = LEAVE_SLIDE_TIME));
        } else if (
          this.W5r.MoveState !==
          CharacterUnifiedStateTypes_1.ECharMoveState.Slide
        )
          return;
        Math.abs(this.wJr - this.SlideForward.Z) >
          MathUtils_1.MathUtils.KindaSmallNumber &&
          ((this.wJr = this.SlideForward.Z),
          (this.BJr = CharacterSlideComponent_1.GetSlideFallingFriction(
            this.wJr,
          ))),
          this.YJr(t),
          this.$Jr(t, h);
      }
    }
    TickSkiMode(i) {
      if (
        (0 < this.GJr &&
          ((s = this.Hte.Owner.CustomTimeDilation),
          (this.GJr -= i * MathUtils_1.MathUtils.MillisecondToSecond * s),
          this.GJr < 0) &&
          ((this.GJr = 0),
          (this.qJr = void 0),
          this.Lie.RemoveTag(-1940399338)),
        this.VJr)
      )
        this.VJr = !1;
      else if (
        this.W5r.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground ||
        this.W5r.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ski
      )
        if (
          0 < this.PJr.size ||
          (this.oRe?.Valid && this.oRe.HasKuroRootMotion)
        )
          this.W5r.MoveState ===
            CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
            (this.Gce.CharacterMovement.SetMovementMode(1),
            this.W5r.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.Run,
            ));
        else {
          this.GroundNormal.Reset(),
            this.M7o.FromUeVector(this.Gce.CharacterMovement.Velocity);
          let t = !1;
          i = this.jJr();
          if (
            (i
              ? ((this.$Rn = i.Components.Get(0)),
                (this.kJr = this.$Rn?.GetOwner()),
                TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
                  i,
                  0,
                  this.FJr,
                ))
              : ((this.$Rn = void 0), (this.kJr = void 0), this.FJr.Reset()),
            this.Lz.DeepCopy(this.FJr),
            this.Lz.SubtractionEqual(Vector_1.Vector.UpVectorProxy),
            this.JRn())
          ) {
            if (
              (this.SlideForward.DeepCopy(this.FJr),
              this.GroundNormal.DeepCopy(this.SlideForward),
              this.W5r.MoveState !==
                CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
                !this.JJr())
            )
              return;
            this.W5r.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
              (this.Gce.CharacterMovement.SetMovementMode(
                6,
                CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI,
              ),
              this.W5r.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki,
              ),
              (t = !0),
              (this.wJr = 0));
          } else if (
            this.W5r.MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki
          )
            return;
          var s = CharacterSlideComponent_1.SlideConfig;
          this.YJr(t), this.$Jr(t, s);
        }
    }
    EnterSkiMode(t) {
      t = t.SkiConfig;
      if (!this.NJr) {
        var i = ResourceSystem_1.ResourceSystem.SyncLoad(t, UE.BP_SkiConfig_C);
        if (!i?.IsValid())
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              51,
              "获取滑雪参数DA失败",
              ["DaPath", t],
              ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
            )
          );
        (this.NJr = new SkiParams()),
          (this.NJr.InitSpeed = i.初始速度),
          (this.NJr.BaseAccForSpeedUp = i.基础加速度),
          (this.NJr.BaseAccForSpeedDown = i.基础减速度),
          (this.NJr.BaseTargetSpeed = i.基础目标速度),
          (this.NJr.SlopExtraTargetSpeed = i.斜坡额外目标速度),
          (this.NJr.SlopExtraAccel = i.斜坡额外加速度),
          (this.NJr.TurnSpeed = i.转向速度),
          (this.NJr.IgnoreStepHeight = i.忽视阶梯高度),
          (this.NJr.JumpTurnRate = i.跳跃转向速度系数);
      }
      (this.OJr = !0),
        this.wbn.Reset(),
        this.Lie.AddTag(378770267),
        this.Gce.SetFallingHorizontalMaxSpeed(DEFAULT_SKI_MAX_FALLING_SPEED);
    }
    ExitSkiMode() {
      (this.NJr = void 0),
        (this.OJr = !1),
        this.wbn.Reset(),
        this.Gce.ClearFallingHorizontalMaxSpeed(),
        this.Lie.RemoveTag(378770267),
        this.W5r.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ski &&
          (this.Gce.CharacterMovement.SetMovementMode(1),
          this.W5r.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.Run,
          ));
    }
    JRn() {
      return !(
        !this.$Rn ||
        (this.kJr &&
          this.kJr.ActorHasTag(
            CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE,
          ))
      );
    }
  });
(CharacterSlideComponent.SlideConfigInternal = void 0),
  (CharacterSlideComponent.SlideFallingCoefficientArray = [0, 0, 0, 0]),
  (CharacterSlideComponent.SpeedReduceCurve = void 0),
  (CharacterSlideComponent.XJr = void 0),
  (CharacterSlideComponent.X2r = [-1503953470, 1008164187, -752177221]),
  (CharacterSlideComponent = CharacterSlideComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(32)],
      CharacterSlideComponent,
    )),
  (exports.CharacterSlideComponent = CharacterSlideComponent);
//# sourceMappingURL=CharacterSlideComponent.js.map
