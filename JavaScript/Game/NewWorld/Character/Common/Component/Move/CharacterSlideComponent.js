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
        for (var _ = t.length - 1; 0 <= _; _--)
          (e = t[_]) &&
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
  GravityUtils_1 = require("../../../../../Utils/GravityUtils"),
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
  DEFAULT_SKI_MAX_FALLING_SPEED = 5e3,
  DEFAULT_SKI_MAX_SPEED = 3500;
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
        (this.I5r = void 0),
        (this.cBe = void 0),
        (this.Lie = void 0),
        (this.Nce = void 0),
        (this.Lz = Vector_1.Vector.Create()),
        (this.Tz = Vector_1.Vector.Create()),
        (this.fHo = Vector_1.Vector.Create()),
        (this.pHo = Vector_1.Vector.Create()),
        (this.lJr = Vector_1.Vector.Create()),
        (this._Jr = -0),
        (this.SlideForward = Vector_1.Vector.Create()),
        (this.GroundNormal = Vector_1.Vector.Create()),
        (this.Cer = new Array()),
        (this.uJr = new Set()),
        (this.mJr = 0),
        (this.dJr = 0),
        (this.SlideSwitchThisFrame = !1),
        (this.StandMode = !1),
        (this.LastAngleOffset = 0),
        (this.CJr = void 0),
        (this.gJr = void 0),
        (this.fJr = 0),
        (this.pJr = void 0),
        (this.vJr = !1),
        (this.MJr = void 0),
        (this.rxn = void 0),
        (this.EJr = Vector_1.Vector.Create()),
        (this.XOn = Vector_1.Vector.Create()),
        (this.$On = Vector_1.Vector.Create()),
        (this.hUe = (t, i) => {
          i !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
            (this.Gce.CharacterMovement.FallingLateralFriction = 0),
            i === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
              (this.$On.DeepCopy(this.Hte.ActorForwardProxy),
              this.Gce.ResetTurnRate(),
              this.XOn.Equality(Vector_1.Vector.ZeroVectorProxy) ||
                (this.Lz.DeepCopy(this.XOn),
                this.EJr.Multiply(this.Lz.DotProduct(this.EJr), this.Tz),
                this.Lz.Subtraction(this.Tz, this.Tz),
                (i = Math.min(this.Tz.Size(), DEFAULT_SKI_MAX_SPEED)),
                this.Lz.DeepCopy(this.Hte.ActorForwardProxy),
                this.EJr.Multiply(this.Lz.DotProduct(this.EJr), this.fHo),
                this.Lz.Subtraction(this.fHo, this.fHo),
                this.fHo.Normalize() ||
                  this.fHo.DeepCopy(this.Hte.ActorForwardProxy),
                this.fHo.MultiplyEqual(i),
                this.Gce.SetForceSpeed(this.fHo),
                this.XOn.Reset()));
        }),
        (this.SJr = !1),
        (this.yJr = (t) => {
          this.vJr &&
            (this.Hte.ActorForwardProxy.Multiply(this.pJr.InitSpeed, this.Lz),
            this.Gce.SetForceSpeed(this.Lz),
            (this.vJr = !1)),
            this.YOn(t, this.$On),
            this.JOn(this.Lz),
            UE.KuroMovementBPLibrary.KuroSki(
              t,
              this.Gce.CharacterMovement,
              this.GroundNormal.ToUeVector(),
              this.$On.ToUeVector(),
              this.Lz.ToUeVector(),
              this.pJr.IgnoreStepHeight,
              void 0,
            ) ||
              (this.IJr()
                ? (this.Gce.CharacterMovement.SetMovementMode(1),
                  this.I5r.SetMoveState(
                    CharacterUnifiedStateTypes_1.ECharMoveState.Run,
                  ))
                : this.Gce.CharacterMovement.SetMovementMode(3));
        }),
        (this.TJr = (s) => {
          var h = CharacterSlideComponent_1.SlideConfig,
            e = (this.fHo.DeepCopy(this.Hte.InputDirectProxy), this.fHo);
          let t = !1;
          if (e.Normalize())
            if (
              ((t = h.Ski),
              this.Lz.DeepCopy(this.SlideForward),
              this.Gce.GravityDirect.CrossProduct(this.Lz, this.Tz),
              this.Tz.CrossProduct(this.Lz, this.lJr),
              this.lJr.Normalize())
            ) {
              let t = !0;
              h.Ski &&
                (this.Lz.DeepCopy(this.SlideForward),
                GravityUtils_1.GravityUtils.ConvertToPlanarVector(
                  this.Hte,
                  this.Lz,
                ),
                this.Lz.Normalize(),
                (a = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityAbs(
                  this.Hte,
                  this.Lz,
                  e,
                )),
                (t = a < SKI_BRAKE_ANGLE_THRESHOLD)) &&
                (this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
                GravityUtils_1.GravityUtils.ConvertToPlanarVector(
                  this.Hte,
                  this.Lz,
                ),
                this.Lz.Normalize() || this.lJr.UnaryNegation(this.Lz),
                (a = GravityUtils_1.GravityUtils.GetAngleOffsetInGravity(
                  this.Hte,
                  this.Lz,
                  this.Hte.InputDirectProxy,
                )),
                Math.abs(a) > SKI_MAX_INPUT_ANGLE) &&
                (this.Gce.GravityDirect.CrossProduct(this.Lz, this.Tz),
                (a =
                  Math.sign(a) *
                  SKI_MAX_INPUT_ANGLE *
                  MathUtils_1.MathUtils.DegToRad),
                this.Lz.MultiplyEqual(Math.cos(a)),
                this.Tz.MultiplyEqual(Math.sin(a)),
                this.Lz.Addition(this.Tz, e));
              var r,
                a = e.DotProduct(this.lJr);
              let i = 0;
              0 < a
                ? ((i = a * h.SlideAccelUp),
                  (r = this.Hte.ActorVelocityProxy.DotProduct(this.lJr)),
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
                this.lJr.Multiply(i, this.Lz),
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
            _ = 0,
            o = 0,
            n = 0;
          (n = this.gJr
            ? ((i = 0), (_ = 0), (o = this.gJr.LimitSpeed))
            : ((i = this.dJr),
              (_ = h.SlideFriction),
              t
                ? ((o = h.SkiMaxSpHor), h.SkiMaxSpVer)
                : ((o = h.MaxSlideHorizontalSeed), -1))),
            this.Gce.CharacterMovement.KuroSlide(
              s,
              i,
              _,
              this._Jr === LEAVE_SLIDE_TIME
                ? this.Lz.ToUeVector()
                : Vector_1.Vector.ZeroVector,
              o,
              this.GroundNormal.ToUeVector(),
              n,
              CharacterSlideComponent_1.SpeedReduceCurve,
            )
              ? (this._Jr = LEAVE_SLIDE_TIME)
              : this.Gce.CharacterMovement.Kuro_GetBlockActorWhenMove()
                ? (this.Gce.CharacterMovement.SetMovementMode(1),
                  (this.SJr = !0))
                : ((this._Jr -= s),
                  this._Jr < 0 &&
                    this.LJr() &&
                    (this.Gce.CharacterMovement.SetMovementMode(3),
                    (this.SJr = !0)));
        }),
        (this.DJr = (t, i) => {
          i ||
            ((i = t.GetComponent(32)),
            this.I5r.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
              this.I5r.MoveState !==
                CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
              i.I5r.MoveState !==
                CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
              i.I5r.MoveState !==
                CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) ||
            ((this._Jr = i._Jr),
            this.SlideForward.DeepCopy(i.SlideForward),
            (this.mJr = i.mJr),
            (this.dJr = i.dJr),
            (this.SlideSwitchThisFrame = i.SlideSwitchThisFrame),
            (this.StandMode = i.StandMode),
            (this.LastAngleOffset = i.LastAngleOffset),
            (this.pJr = i.pJr),
            (this.gJr = i.gJr),
            (this.fJr = i.fJr));
        }),
        (this.oxn = (t, i) => {
          i ||
            (this.CJr && this.Gce.StopAddMove(this.CJr),
            this.Gce.ResetTurnRate(),
            this.Lie.RemoveTagAddOrRemoveListener(378770267, this.oxn));
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
        this.RJr ||
          (this.RJr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            PreloadConstants_1.SLIDE_JUMP_ADD_MOVE_CURVE,
            UE.CurveFloat,
          )),
        this.RJr
      );
    }
    static get Dependencies() {
      return [3, 163, 160];
    }
    JOn(t) {
      let i = this.pJr.BaseAccForSpeedUp,
        s = this.pJr.BaseTargetSpeed;
      var h =
          (Math.acos(
            Vector_1.Vector.DotProduct(
              this.SlideForward,
              Vector_1.Vector.UpVectorProxy,
            ),
          ) *
            MathUtils_1.MathUtils.RadToDeg) /
          90,
        e = this.pJr.SlopExtraAccel * h,
        h = this.pJr.SlopExtraTargetSpeed * h,
        r = Math.sign(
          Vector_1.Vector.DotProduct(
            this.Hte.ActorForwardProxy,
            this.SlideForward,
          ),
        );
      (i += r * e),
        (s += r * h),
        this.gJr && ((i += this.gJr.Acceleration), (s += this.gJr.LimitSpeed)),
        (s = Math.min(s, DEFAULT_SKI_MAX_SPEED)),
        t.Set(i, this.pJr.BaseAccForSpeedDown, s);
    }
    YOn(t, i) {
      var s = this.Lz,
        h = this.Tz,
        e = this.fHo,
        r = this.pHo,
        a = this.pJr.TurnSpeed;
      let _ = -DEFAULT_SKI_MAX_TURN_ANGLE,
        o = DEFAULT_SKI_MAX_TURN_ANGLE;
      var n = this.Entity.GetComponent(97),
        n =
          (s.DeepCopy(this.Hte.ActorForwardProxy),
          n?.Active &&
            ((_ = n.MinTurnAngle),
            (o = n.MaxTurnAngle),
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
        s = this.zOn(n - r),
        n = h.DotProduct(e) * a * t,
        s = MathUtils_1.MathUtils.Clamp(s + n, _, o);
      (s = this.zOn(s + r)),
        i.FromUeVector(MathUtils_1.MathUtils.GetVector2dByAngle(s));
    }
    zOn(t) {
      let i = t;
      for (; 180 < i; ) i -= 360;
      for (; i < -180; ) i += 360;
      return i;
    }
    OnStart() {
      if (
        ((this.Hte = this.Entity.GetComponent(3)),
        (this.Gce = this.Entity.GetComponent(163)),
        (this.oRe = this.Entity.GetComponent(162)),
        (this.Nce = this.Entity.GetComponent(53)),
        (this.I5r = this.Entity.GetComponent(160)),
        (this.cBe = this.Entity.GetComponent(33)),
        (this.Lie = this.Entity.GetComponent(188)),
        this.Lz.Reset(),
        this.lJr.Reset(),
        this.Lie?.Valid)
      )
        for (const i of CharacterSlideComponent_1.I2r)
          this.Cer.push(
            this.Lie.ListenForTagAnyCountChanged(i, (t) => {
              this.Sri(i, t);
            }),
          ),
            this.Lie.HasTag(i) && this.uJr.add(i);
      return (
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.hUe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSlide,
          this.TJr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSki,
          this.yJr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.DJr,
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
          this.TJr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSki,
          this.yJr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.DJr,
        );
      for (const t of this.Cer) t.EndTask();
      return !(this.Cer.length = 0);
    }
    OnTick(t) {
      !this.Hte?.IsMoveAutonomousProxy ||
        this.I5r.MoveState ===
          CharacterUnifiedStateTypes_1.ECharMoveState.Glide ||
        this.Gce.IsJump ||
        (this.cBe?.CurrentSkill
          ? this.I5r?.MoveState ===
              CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
            this.Gce.CharacterMovement?.SetMovementMode(3)
          : this.Nce.IsInAutomaticFlightMode() ||
            (this.Lie.HasTag(378770267)
              ? this.TickSkiMode(t)
              : this.TickSlideMode(t)));
    }
    UJr(t, i) {
      (this.SlideSwitchThisFrame = !1),
        this.pJr
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
    AJr(t) {
      var i, s;
      this.pJr
        ? (this.Lz.FromUeVector(this.Gce.CharacterMovement.Velocity),
          this.Hte.SetInputFacing(this.Lz, !0),
          this.Hte.SetOverrideTurnSpeed(this.pJr.TurnSpeed))
        : (this.Lie.HasTag(-91611865) || this.StandMode
            ? (this.Hte.SetInputFacing(this.SlideForward, !0),
              (this.LastAngleOffset = 0))
            : ((i = MathUtils_1.MathUtils.GetAngleByVector2D(
                this.SlideForward,
              )),
              t || this.Hte.InputDirectProxy.IsNearlyZero()
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
    Sri(t, i) {
      0 === i ? this.uJr.delete(t) : this.uJr.add(t);
    }
    LJr() {
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
    IJr() {
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
    PJr() {
      var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
      (t.WorldContextObject = this.Hte.Actor),
        (t.Radius = this.Hte.ScaledRadius),
        this.Lz.DeepCopy(this.Hte.ActorLocationProxy),
        (this.Lz.Z -= this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.Lz),
        Vector_1.Vector.UpVectorProxy.CrossProduct(this.SlideForward, this.fHo),
        this.fHo.CrossProduct(this.SlideForward, this.fHo),
        this.fHo.Normalize(),
        this.fHo.MultiplyEqual(100),
        this.Lz.Addition(this.fHo, this.Tz),
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
          this.fHo,
        ),
        this.fHo.AdditionEqual(this.SlideForward),
        !!this.fHo.Normalize() && this.fHo.Z < COMBINE_NORMAL_Z_THRESHOLD)
      );
    }
    OnJump() {
      this.Hte &&
        (this.XOn.DeepCopy(this.Hte.ActorVelocityProxy),
        this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
        this.EJr.Multiply(this.Lz.DotProduct(this.EJr), this.Tz),
        this.Lz.Subtraction(this.Tz, this.fHo),
        (this.CJr = this.Gce?.SetAddMoveWorld(
          this.fHo.ToUeVector(),
          2,
          void 0,
          this.CJr,
          void 0,
          2,
        )),
        this.Gce.SetTurnRate(this.pJr.JumpTurnRate),
        this.Lie.AddTagAddOrRemoveListener(378770267, this.oxn));
    }
    SetSkiAccel(t) {
      (this.I5r?.PositionState !==
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
        this.I5r?.MoveState !==
          CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) ||
        ((this.fJr = t.Duration),
        (this.gJr = t),
        this.gJr.InstantSpeed &&
          ((t = this.Hte.ActorVelocityProxy.Size()),
          (t = Math.min(t + this.gJr.InstantSpeed, DEFAULT_SKI_MAX_SPEED)),
          this.Lz.DeepCopy(this.Hte.ActorVelocityProxy),
          this.Lz.Normalize() || this.Lz.DeepCopy(this.Hte.ActorForwardProxy),
          this.Lz.MultiplyEqual(t),
          this.Gce.SetForceSpeed(this.Lz)),
        this.Lie.AddTag(-1940399338));
    }
    TickSlideMode(t) {
      if (this.SJr) this.SJr = !1;
      else if (
        0 < this.uJr.size ||
        (this.oRe?.Valid && this.oRe.HasKuroRootMotion)
      )
        this.I5r.MoveState ===
          CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
          this.Gce.CharacterMovement.SetMovementMode(3);
      else {
        let t = !1;
        var i = this.Gce.CharacterMovement.Kuro_GetBlockDirectWhenMove(),
          s = this.Gce.CharacterMovement.Kuro_GetBlockActorWhenMove(),
          h = CharacterSlideComponent_1.SlideConfig;
        if (
          (this.GroundNormal.Reset(),
          this.fHo.FromUeVector(this.Gce.CharacterMovement.Velocity),
          i.Z > SLIDE_Z_THRESHOLD &&
            (this.pJr ||
              this.fHo.Z < -MathUtils_1.MathUtils.KindaSmallNumber) &&
            s &&
            !s.ActorHasTag(
              CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE,
            ))
        ) {
          if (
            (this.SlideForward.FromUeVector(i),
            this.GroundNormal.DeepCopy(this.SlideForward),
            this.I5r.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.Slide && !this.PJr())
          )
            return;
          this.I5r.MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
            (this.Gce.CharacterMovement.SetMovementMode(
              6,
              CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE,
            ),
            this.I5r.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.Slide,
            ),
            (t = !0),
            (this.mJr = 0),
            (this._Jr = LEAVE_SLIDE_TIME));
        } else if (
          this.I5r.MoveState !==
          CharacterUnifiedStateTypes_1.ECharMoveState.Slide
        )
          return;
        Math.abs(this.mJr - this.SlideForward.Z) >
          MathUtils_1.MathUtils.KindaSmallNumber &&
          ((this.mJr = this.SlideForward.Z),
          (this.dJr = CharacterSlideComponent_1.GetSlideFallingFriction(
            this.mJr,
          ))),
          this.AJr(t),
          this.UJr(t, h);
      }
    }
    TickSkiMode(i) {
      if (
        (0 < this.fJr &&
          ((s = this.Hte.Owner.CustomTimeDilation),
          (this.fJr -= i * MathUtils_1.MathUtils.MillisecondToSecond * s),
          this.fJr < 0) &&
          ((this.fJr = 0),
          (this.gJr = void 0),
          this.Lie.RemoveTag(-1940399338)),
        this.SJr)
      )
        this.SJr = !1;
      else if (
        this.I5r.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground ||
        this.I5r.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ski
      )
        if (
          0 < this.uJr.size ||
          (this.oRe?.Valid && this.oRe.HasKuroRootMotion)
        )
          this.I5r.MoveState ===
            CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
            (this.Gce.CharacterMovement.SetMovementMode(1),
            this.I5r.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.Run,
            ));
        else {
          this.GroundNormal.Reset(),
            this.fHo.FromUeVector(this.Gce.CharacterMovement.Velocity);
          let t = !1;
          i = this.IJr();
          if (
            (i
              ? ((this.rxn = i.Components.Get(0)),
                (this.MJr = this.rxn?.GetOwner()),
                TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
                  i,
                  0,
                  this.EJr,
                ))
              : ((this.rxn = void 0), (this.MJr = void 0), this.EJr.Reset()),
            this.Lz.DeepCopy(this.EJr),
            this.Lz.SubtractionEqual(Vector_1.Vector.UpVectorProxy),
            this.nxn())
          ) {
            if (
              (this.SlideForward.DeepCopy(this.EJr),
              this.GroundNormal.DeepCopy(this.SlideForward),
              this.I5r.MoveState !==
                CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
                !this.PJr())
            )
              return;
            this.I5r.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
              (this.Gce.CharacterMovement.SetMovementMode(
                6,
                CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI,
              ),
              this.I5r.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki,
              ),
              (t = !0),
              (this.mJr = 0));
          } else if (
            this.I5r.MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki
          )
            return;
          var s = CharacterSlideComponent_1.SlideConfig;
          this.AJr(t), this.UJr(t, s);
        }
    }
    EnterSkiMode(t) {
      t = t.SkiConfig;
      if (!this.pJr) {
        var i = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_SkiConfig_C);
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
        (this.pJr = new SkiParams()),
          (this.pJr.InitSpeed = i.初始速度),
          (this.pJr.BaseAccForSpeedUp = i.基础加速度),
          (this.pJr.BaseAccForSpeedDown = i.基础减速度),
          (this.pJr.BaseTargetSpeed = i.基础目标速度),
          (this.pJr.SlopExtraTargetSpeed = i.斜坡额外目标速度),
          (this.pJr.SlopExtraAccel = i.斜坡额外加速度),
          (this.pJr.TurnSpeed = i.转向速度),
          (this.pJr.IgnoreStepHeight = i.忽视阶梯高度),
          (this.pJr.JumpTurnRate = i.跳跃转向速度系数);
      }
      (this.vJr = !0),
        this.XOn.Reset(),
        this.Lie.AddTag(378770267),
        this.Gce.SetFallingHorizontalMaxSpeed(DEFAULT_SKI_MAX_FALLING_SPEED);
    }
    ExitSkiMode() {
      (this.pJr = void 0),
        (this.vJr = !1),
        this.XOn.Reset(),
        this.Gce.ClearFallingHorizontalMaxSpeed(),
        this.Lie.RemoveTag(378770267),
        this.I5r.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ski &&
          (this.Gce.CharacterMovement.SetMovementMode(1),
          this.I5r.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.Run,
          ));
    }
    nxn() {
      return !(
        !this.rxn ||
        (this.MJr &&
          this.MJr.ActorHasTag(
            CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE,
          ))
      );
    }
  });
(CharacterSlideComponent.SlideConfigInternal = void 0),
  (CharacterSlideComponent.SlideFallingCoefficientArray = [0, 0, 0, 0]),
  (CharacterSlideComponent.SpeedReduceCurve = void 0),
  (CharacterSlideComponent.RJr = void 0),
  (CharacterSlideComponent.I2r = [-1503953470, 1008164187, -752177221]),
  (CharacterSlideComponent = CharacterSlideComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(32)],
      CharacterSlideComponent,
    )),
  (exports.CharacterSlideComponent = CharacterSlideComponent);
//# sourceMappingURL=CharacterSlideComponent.js.map
