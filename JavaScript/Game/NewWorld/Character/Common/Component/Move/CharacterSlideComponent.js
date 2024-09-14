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
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../../Core/Net/Net"),
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
  CharacterAttributeTypes_1 = require("../Abilities/CharacterAttributeTypes"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./CustomMovementDefine"),
  LEAVE_SLIDE_TIME = 0.25,
  LEAVE_SLIDE_MIN_HEIGHT = 5,
  PROFILE_KEY = "slide",
  CHANGE_FORWARD_ANGLE_THRESHOLD = 135,
  COMBINE_NORMAL_Z_THRESHOLD = 0.707,
  SLIDE_Z_THRESHOLD = 0.1,
  LEAVE_SKI_TIME = 3,
  SKI_GROUND_MAX_ANGLE = 75,
  SKI_BRAKE_ANGLE_THRESHOLD = 135,
  SKI_MAX_INPUT_ANGLE = 135,
  DEFAULT_SKI_MAX_TURN_ANGLE = 50,
  DEFAULT_SKI_MAX_SPEED = 3500,
  DEFAULT_SKI_MIN_SPEED = 20;
class SkiParams {
  constructor(t) {
    (this.InitSpeed = 700),
      (this.BaseAccForSpeedUp = 300),
      (this.BaseAccForSpeedDown = 300),
      (this.BaseTargetSpeed = 1e3),
      (this.SlopExtraTargetSpeed = 200),
      (this.SlopExtraAccel = 150),
      (this.TurnSpeed = 50),
      (this.IgnoreStepHeight = 20),
      (this.JumpMaxHorizontalSpeed = DEFAULT_SKI_MAX_SPEED),
      (this.JumpTurnRate = 0.4),
      (this.JumpHeightRate = 1),
      (this.JumpTimeScale = 1),
      (this.TagList = new Array()),
      (this.InitSpeed = t.初始速度),
      (this.BaseAccForSpeedUp = t.基础加速度),
      (this.BaseAccForSpeedDown = t.基础减速度),
      (this.BaseTargetSpeed = t.基础目标速度),
      (this.SlopExtraTargetSpeed = t.斜坡额外目标速度),
      (this.SlopExtraAccel = t.斜坡额外加速度),
      (this.TurnSpeed = t.转向速度),
      (this.IgnoreStepHeight = t.忽视阶梯高度),
      (this.JumpTurnRate = t.跳跃转向速度系数),
      (this.JumpHeightRate = t.跳跃高度缩放系数),
      (this.JumpTimeScale = t.跳跃滞空缩放系数),
      (this.JumpMaxHorizontalSpeed = t.跳跃下落最大平面速度);
    var i = t.期间Tag.GameplayTags,
      s = i.Num();
    for (let t = 0; t < s; t++) this.TagList.push(i.Get(t).TagId);
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
        (this.osn = void 0),
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
        (this.i5a = !1),
        (this.r5a = !1),
        (this.MJr = void 0),
        (this.exn = void 0),
        (this.EJr = Vector_1.Vector.Create()),
        (this.r2n = Vector_1.Vector.Create()),
        (this.o2n = Vector_1.Vector.Create()),
        (this.hUe = (t, i) => {
          i !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
            (this.Gce.CharacterMovement.FallingLateralFriction = 0),
            i === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki &&
              (this.o2n.DeepCopy(this.Hte.ActorForwardProxy),
              this.Gce.ResetTurnRate(),
              this.r2n.Equality(Vector_1.Vector.ZeroVectorProxy) ||
                (this.Lz.DeepCopy(this.r2n),
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
                this.r2n.Reset()));
        }),
        (this.SJr = !1),
        (this.yJr = (t) => {
          this.i5a &&
            (this.Hte.ActorForwardProxy.Multiply(this.pJr.InitSpeed, this.Lz),
            this.Gce.SetForceSpeed(this.Lz),
            (this.i5a = !1)),
            this.n2n(t, this.o2n),
            this.s2n(this.Lz),
            UE.KuroMovementBPLibrary.KuroSki(
              t,
              this.Gce.CharacterMovement,
              this.GroundNormal.ToUeVector(),
              this.o2n.ToUeVector(),
              this.Lz.ToUeVector(),
              this.pJr.IgnoreStepHeight,
              void 0,
            ) ||
              (this.IJr()
                ? (this.Gce.CharacterMovement.SetMovementMode(1),
                  this.I5r.SetMoveState(
                    CharacterUnifiedStateTypes_1.ECharMoveState.Run,
                  ))
                : this.Gce.CharacterMovement.SetMovementMode(3),
              (this.SJr = !0)),
            this.o5a(t) ||
              ((this._Jr -= t),
              this._Jr < 0 &&
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Movement",
                    51,
                    "检测到异常，退出滑雪模式",
                    [
                      "Angle",
                      Math.acos(
                        Vector_1.Vector.DotProduct(
                          this.GroundNormal,
                          this.Hte.MoveComp.GravityUp,
                        ),
                      ),
                    ],
                    [
                      "MoveDelta",
                      Vector_1.Vector.Dist(this.Hte.LastActorLocation, this.Lz),
                    ],
                  ),
                this.ExitSkiMode()));
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
        (this.txn = (t, i) => {
          i ||
            (this.CJr && this.Gce.StopAddMove(this.CJr),
            this.Gce.ResetTurnRate(),
            this.Lie.RemoveTagAddOrRemoveListener(378770267, this.txn));
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
      return [3, 164, 161];
    }
    s2n(t) {
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
    n2n(t, i) {
      var s = this.Lz,
        h = this.Tz,
        e = this.fHo,
        r = this.pHo,
        a = this.pJr.TurnSpeed;
      let _ = -DEFAULT_SKI_MAX_TURN_ANGLE,
        o = DEFAULT_SKI_MAX_TURN_ANGLE;
      var n = this.Entity.GetComponent(98),
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
        s = this.a2n(n - r),
        n = h.DotProduct(e) * a * t,
        s = MathUtils_1.MathUtils.Clamp(s + n, _, o);
      (s = this.a2n(s + r)),
        i.FromUeVector(MathUtils_1.MathUtils.GetVector2dByAngle(s));
    }
    a2n(t) {
      let i = t;
      for (; 180 < i; ) i -= 360;
      for (; i < -180; ) i += 360;
      return i;
    }
    OnStart() {
      if (
        ((this.Hte = this.Entity.GetComponent(3)),
        (this.Gce = this.Entity.GetComponent(164)),
        (this.oRe = this.Entity.GetComponent(163)),
        (this.osn = this.Entity.GetComponent(159)),
        (this.Nce = this.Entity.GetComponent(54)),
        (this.I5r = this.Entity.GetComponent(161)),
        (this.cBe = this.Entity.GetComponent(34)),
        (this.Lie = this.Entity.GetComponent(190)),
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
            (this.r5a ? this.TickSkiMode(t) : this.TickSlideMode(t)));
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
        (this.r2n.DeepCopy(this.Hte.ActorVelocityProxy),
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
        this.Lie.AddTagAddOrRemoveListener(378770267, this.txn));
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
            (this.pJr ??
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
      else {
        i = this.Entity.GetComponent(71);
        if (
          !(
            (i?.IsActive && 2 !== i.WalkOnWaterStage) ||
            (this.I5r.PositionState !==
              CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
              this.I5r.PositionState !==
                CharacterUnifiedStateTypes_1.ECharPositionState.Ski)
          )
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
            var s = this.IJr();
            if (
              (s
                ? ((this.exn = s.Components.Get(0)),
                  (this.MJr = this.exn?.GetOwner()),
                  TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
                    s,
                    0,
                    this.EJr,
                  ))
                : ((this.exn = void 0), (this.MJr = void 0), this.EJr.Reset()),
              this.Lz.DeepCopy(this.EJr),
              this.Lz.SubtractionEqual(Vector_1.Vector.UpVectorProxy),
              this.ixn())
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
            i = CharacterSlideComponent_1.SlideConfig;
            this.AJr(t), this.UJr(t, i);
          }
      }
    }
    EnterSkiMode(t) {
      this.pJr ||
        (this.uja(t) &&
          (this.cja(),
          this.Lie.AddTag(378770267),
          this.Lie.AddTag(-1697149502),
          (this.r5a = !0),
          (this.i5a = !0),
          (this._Jr = LEAVE_SKI_TIME),
          this.r2n.Reset(),
          this.mja()));
    }
    ExitSkiMode(t = !0) {
      this.pJr &&
        (this.dja(),
        this.Lie.RemoveTag(378770267),
        this.Lie.RemoveTag(-1697149502),
        (this.pJr = void 0),
        (this.i5a = !1),
        (this.r5a = !1),
        this.r2n.Reset(),
        this.I5r.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ski &&
          (this.IJr()
            ? (this.Gce.CharacterMovement.SetMovementMode(1),
              this.I5r.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Run,
              ))
            : this.Gce.CharacterMovement.SetMovementMode(3)),
        t) &&
        this.Cja();
    }
    ixn() {
      return (
        !!this.exn &&
        !(
          (this.MJr &&
            this.MJr.ActorHasTag(
              CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE,
            )) ||
          Math.acos(
            Vector_1.Vector.DotProduct(this.EJr, this.Hte.MoveComp.GravityUp),
          ) *
            MathUtils_1.MathUtils.RadToDeg >=
            SKI_GROUND_MAX_ANGLE
        )
      );
    }
    o5a(t) {
      return !(
        Math.acos(
          Vector_1.Vector.DotProduct(
            this.GroundNormal,
            this.Hte.MoveComp.GravityUp,
          ),
        ) *
          MathUtils_1.MathUtils.RadToDeg >=
          SKI_GROUND_MAX_ANGLE ||
        (this.Lz.FromUeVector(this.Hte.Actor.K2_GetActorLocation()),
        Vector_1.Vector.Dist(this.Hte.LastActorLocation, this.Lz) <
          t * DEFAULT_SKI_MIN_SPEED) ||
        ((this._Jr = LEAVE_SKI_TIME), 0)
      );
    }
    mja() {
      var t = Protocol_1.Aki.Protocol.keh.create();
      (t.n5a = Protocol_1.Aki.Protocol.Soh.Proto_None),
        (t.s5a = Protocol_1.Aki.Protocol.Soh.Proto_Ski),
        Net_1.Net.Call(16208, t, (t) => {
          t &&
            t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Movement", 51, "请求切换滑雪模式失败"),
            this.ExitSkiMode(!1));
        });
    }
    Cja() {
      var t = Protocol_1.Aki.Protocol.keh.create();
      (t.n5a = Protocol_1.Aki.Protocol.Soh.Proto_Ski),
        (t.s5a = Protocol_1.Aki.Protocol.Soh.Proto_None),
        Net_1.Net.Call(16208, t, () => {});
    }
    cja() {
      if (this.pJr) {
        this.gja();
        for (const t of this.pJr.TagList) this.Lie?.AddTag(t);
      }
    }
    dja() {
      this.fja();
      for (const t of this.pJr.TagList) this.Lie?.RemoveTag(t);
    }
    gja() {
      this.Lie.AddTag(-451106150),
        this.Gce.SetFallingHorizontalMaxSpeed(this.pJr.JumpMaxHorizontalSpeed);
      var t = this.oRe?.MainAnimInstance;
      UE.KuroStaticLibrary.IsObjectClassByName(
        t,
        CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
      ) && t.设置跳跃速率(this.pJr.JumpTimeScale),
        this.osn.SetBaseValue(
          Protocol_1.Aki.Protocol.Vks.Proto_Jump,
          CharacterAttributeTypes_1.PER_TEN_THOUSAND * this.pJr.JumpHeightRate,
        );
    }
    fja() {
      this.Lie.RemoveTag(-451106150), this.Gce.ClearFallingHorizontalMaxSpeed();
      var t = this.oRe?.MainAnimInstance;
      UE.KuroStaticLibrary.IsObjectClassByName(
        t,
        CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE,
      ) && t.设置跳跃速率(1),
        this.osn.SetBaseValue(
          Protocol_1.Aki.Protocol.Vks.Proto_Jump,
          +CharacterAttributeTypes_1.PER_TEN_THOUSAND,
        );
    }
    uja(t) {
      var t = t.SkiConfig,
        i = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_SkiConfig_C);
      return i?.IsValid()
        ? ((this.pJr = new SkiParams(i)), !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              51,
              "获取滑雪参数DA失败",
              ["DaPath", t],
              ["PbDataId", this.Hte?.CreatureData.GetPbDataId()],
            ),
          !1);
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
