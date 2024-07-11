"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraClimbController = void 0);
const UE = require("ue");
const Time_1 = require("../../../Core/Common/Time");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StateBase_1 = require("../../../Core/Utils/StateMachine/StateBase");
const StateMachine_1 = require("../../../Core/Utils/StateMachine/StateMachine");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GlobalData_1 = require("../../GlobalData");
const CameraControllerBase_1 = require("./CameraControllerBase");
const IS_DEBUG = !1;
class DefaultState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments), (this.gle = 0);
  }
  OnEnter() {
    this.gle = 0;
  }
  OnUpdate(t) {
    (this.gle += t * this.Owner.ElapseTimeScale),
      this.gle > this.Owner.PrepTime && this.StateMachine.Switch(2);
  }
}
class CenterState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.fle = Rotator_1.Rotator.Create()),
      (this.ple = Rotator_1.Rotator.Create()),
      (this.gle = 0);
  }
  CanReEnter() {
    return !0;
  }
  OnReEnter() {
    this.OnEnter();
  }
  OnEnter() {
    this.fle.DeepCopy(this.Owner.Camera.CurrentCamera.ArmRotation),
      this.ple.DeepCopy(this.Owner.Camera.PlayerRotator),
      (this.gle = 0);
  }
  OnUpdate(t) {
    let i;
    this.Owner.Camera.IsModifiedArmRotation
      ? this.StateMachine.Switch(0)
      : ((i =
          (t / this.Owner.FadeInCenterTime) *
          this.Owner.AdditionalArmLength *
          this.Owner.ElapseTimeScale),
        (this.Owner.Camera.DesiredCamera.ArmLength =
          this.Owner.Camera.CurrentCamera.ArmLength + i),
        (this.Owner.Camera.IsModifiedArmLength = !0),
        (this.gle += t),
        (i = this.gle / this.Owner.FadeInCenterTime),
        (i = MathUtils_1.MathUtils.BlendEaseIn(
          0,
          1,
          i,
          this.Owner.CenterStateBlendInExp,
        )),
        Rotator_1.Rotator.Lerp(
          this.fle,
          this.ple,
          i,
          this.Owner.Camera.DesiredCamera.ArmRotation,
        ),
        (this.Owner.Camera.IsModifiedArmRotation = !0),
        this.gle > this.Owner.FadeInCenterTime && this.StateMachine.Switch(2));
  }
}
class ReadyState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments), (this.gle = 0);
  }
  OnEnter() {
    this.gle = 0;
  }
  OnUpdate(t) {
    this.Owner.Camera.IsModifiedArmRotation
      ? this.StateMachine.Switch(0)
      : this.Owner.IsMoving
        ? ((this.gle += t * this.Owner.ElapseTimeScale),
          this.gle > this.Owner.MoveDelayTime && this.StateMachine.Switch(3))
        : (this.gle = 0);
  }
}
class AdjustState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments), (this.vle = !1);
  }
  OnEnter() {
    this.vle = !1;
  }
  OnUpdate(t) {
    let i, s, h, e;
    this.Owner.Camera.IsModifiedArmRotation
      ? this.StateMachine.Switch(0)
      : this.Owner.IsMoving
        ? ((e = Vector_1.Vector.Create()),
          this.Owner.Camera.PlayerRotator.Vector(e),
          (s = Vector_1.Vector.Create()),
          this.Owner.UpdateInterp(
            t,
            this.Owner.DefaultInterpSpeed,
            this.Owner.MoveDirection,
          ),
          this.Owner.Camera.DesiredCamera.ArmRotation.Vector(s),
          !(i =
            Math.abs(
              Math.acos(Vector_1.Vector.DotProduct(e, s)) *
                MathUtils_1.MathUtils.RadToDeg,
            ) <= this.Owner.ApplicableAngleWithCharacter) && this.vle
            ? ((h = Vector_1.Vector.Create()),
              e.CrossProduct(s, h),
              (s = Vector_1.Vector.Create()),
              h.Normalize()
                ? e.RotateAngleAxis(
                    this.Owner.ApplicableAngleWithCharacter,
                    h,
                    s,
                  )
                : s.DeepCopy(e),
              s.Rotation(this.Owner.Camera.DesiredCamera.ArmRotation),
              (this.Owner.Camera.IsModifiedArmRotation = !0),
              (this.vle = !0))
            : (this.vle = i),
          MathUtils_1.MathUtils.IsNearlyEqual(
            this.Owner.Camera.CurrentCamera.ArmLength,
            this.Owner.DefaultArmLength,
          ) ||
            ((h =
              this.Owner.DefaultArmLength -
              this.Owner.Camera.CurrentCamera.ArmLength),
            (e = this.Owner.ArmLengthSpeed * t),
            Math.abs(e) > Math.abs(h)
              ? (this.Owner.Camera.DesiredCamera.ArmLength =
                  this.Owner.DefaultArmLength)
              : (this.Owner.Camera.DesiredCamera.ArmLength =
                  this.Owner.Camera.CurrentCamera.ArmLength +
                  (e = h > 0 ? e : -e)),
            (this.Owner.Camera.IsModifiedArmLength = !0)))
        : this.StateMachine.Switch(4);
  }
}
class FadeOutState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments), (this.gle = 0);
  }
  OnEnter() {
    this.gle = 0;
  }
  OnUpdate(t) {
    let i;
    this.Owner.Camera.IsModifiedArmRotation
      ? this.StateMachine.Switch(0)
      : this.Owner.IsMoving
        ? this.StateMachine.Switch(3)
        : this.gle >= this.Owner.FadeOutDuration
          ? this.StateMachine.Switch(2)
          : ((this.gle += t),
            (i = MathUtils_1.MathUtils.RangeClamp(
              this.gle,
              0,
              this.Owner.FadeOutDuration,
              this.Owner.DefaultInterpSpeed,
              0,
            )),
            this.Owner.UpdateInterp(t, i, this.Owner.MoveDirection));
  }
}
class ReachThePeakState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.Mle = Vector_1.Vector.Create()),
      (this.Sle = Rotator_1.Rotator.Create());
  }
  OnEnter() {
    this.Sle.DeepCopy(this.Owner.Camera.PlayerRotator),
      (this.Sle.Pitch = this.Owner.ReachThePeakPitch),
      this.Sle.Vector(this.Mle);
  }
  OnUpdate(t) {
    this.Owner.Camera.IsModifiedArmRotation
      ? this.StateMachine.Switch(0)
      : this.Owner.UpdateInterp(t, this.Owner.ReachThePeakSpeed, this.Mle);
  }
}
class CameraClimbController extends CameraControllerBase_1.CameraControllerBase {
  constructor(t) {
    super(t),
      (this.FadeOutDuration = -0),
      (this.PrepTime = -0),
      (this.MoveDelayTime = -0),
      (this.DefaultInterpSpeed = 0),
      (this.ReferToMoveSpeed = 0),
      (this.AdditionalArmLength = 0),
      (this.FadeInCenterTime = -0),
      (this.CenterStateBlendInExp = 0),
      (this.DefaultArmLength = 0),
      (this.ArmLengthSpeed = 0),
      (this.DesiredAngle = 0),
      (this.PitchUpRate = 0),
      (this.PitchDownRate = 0),
      (this.ApplicableAngleWithCharacter = 0),
      (this.StopInputDelay = 0),
      (this.ReachThePeakSpeed = 0),
      (this.ReachThePeakPitch = 0),
      (this.LargeAngleTurnThreshold = 0),
      (this.LargeAngleTurnDelay = 0),
      (this.StartInputDelay = 0),
      (this.ElapseTimeScale = 1),
      (this.IsMoving = !1),
      (this.Ele = Vector_1.Vector.Create()),
      (this.yle = 0),
      (this.Ile = 0),
      (this.MoveDirection = Vector_1.Vector.Create()),
      (this.Lz = Vector_1.Vector.Create()),
      (this.Tz = Vector_1.Vector.Create()),
      (this.OnCharClimbStartExit = (t, i) => {
        this.Camera.CharacterEntityHandle.Id === t &&
          this.Tle(i) &&
          (this.Lle.CurrentState === 3
            ? this.Lle.Switch(5)
            : this.Lle.CurrentState === 1 && this.Lle.Switch(0));
      }),
      (this.Lle = new StateMachine_1.StateMachine(this)),
      this.Lle.AddState(0, DefaultState),
      this.Lle.AddState(1, CenterState),
      this.Lle.AddState(2, ReadyState),
      this.Lle.AddState(3, AdjustState),
      this.Lle.AddState(4, FadeOutState),
      this.Lle.AddState(5, ReachThePeakState),
      this.Lle.Start(0);
  }
  Name() {
    return "ClimbController";
  }
  OnInit() {
    this.SetConfigMap(1, "FadeOutDuration"),
      this.SetConfigMap(2, "PrepTime"),
      this.SetConfigMap(3, "MoveDelayTime"),
      this.SetConfigMap(4, "DefaultInterpSpeed"),
      this.SetConfigMap(5, "ReferToMoveSpeed"),
      this.SetConfigMap(6, "AdditionalArmLength"),
      this.SetConfigMap(7, "FadeInCenterTime"),
      this.SetConfigMap(8, "CenterStateBlendInExp"),
      this.SetConfigMap(9, "DefaultArmLength"),
      this.SetConfigMap(10, "ArmLengthSpeed"),
      this.SetConfigMap(11, "DesiredAngle"),
      this.SetConfigMap(13, "PitchUpRate"),
      this.SetConfigMap(12, "PitchDownRate"),
      this.SetConfigMap(14, "ApplicableAngleWithCharacter"),
      this.SetConfigMap(16, "ReachThePeakSpeed"),
      this.SetConfigMap(17, "ReachThePeakPitch"),
      this.SetConfigMap(18, "LargeAngleTurnThreshold"),
      this.SetConfigMap(19, "LargeAngleTurnDelay"),
      this.SetConfigMap(15, "StopInputDelay"),
      this.SetConfigMap(20, "StartInputDelay");
  }
  OnEnable() {
    const t =
      this.Camera.CharacterEntityHandle.Entity.GetComponent(
        31,
      ).GetExitClimbType();
    this.Tle(t) ? this.Lle.Switch(0) : this.Lle.Switch(1),
      this.Camera.CameraAdjustController.Lock(this),
      this.Camera.CameraAutoController.Lock(this),
      this.Camera.CameraSidestepController.Lock(this),
      this.Ele.Reset(),
      (this.yle =
        Time_1.Time.Now +
        this.StartInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.Ile = 0),
      (this.IsMoving = !1),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharClimbStartExit,
        this.OnCharClimbStartExit,
      );
  }
  OnDisable() {
    this.Camera.CameraAdjustController.Unlock(this),
      this.Camera.CameraAutoController.Unlock(this),
      this.Camera.CameraSidestepController.Unlock(this),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CharClimbStartExit,
        this.OnCharClimbStartExit,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharClimbStartExit,
          this.OnCharClimbStartExit,
        );
  }
  UpdateCustomEnableCondition() {
    return this.Camera.ContainsTag(504239013);
  }
  UpdateInternal(t) {
    let i =
      this.Camera.CharacterEntityHandle.Entity.GetComponent(52).GetMoveVector();
    (this.Lz.X = i.X),
      (this.Lz.Y = i.Y),
      this.Dle(this.Lz)
        ? Time_1.Time.Now > this.yle
          ? (this.Ele.DeepCopy(this.Lz),
            this.Lz.Set(0, this.Ele.Y, this.Ele.X),
            this.Camera.Character.CharacterActorComponent.ActorQuatProxy.RotateVector(
              this.Lz,
              this.MoveDirection,
            ),
            (this.IsMoving = !0),
            (i =
              this.Camera.CharacterEntityHandle.Entity.GetComponent(161).Speed),
            (this.ElapseTimeScale =
              i > this.ReferToMoveSpeed ? i / this.ReferToMoveSpeed : 1),
            (this.yle =
              Time_1.Time.Now +
              this.LargeAngleTurnDelay *
                TimeUtil_1.TimeUtil.InverseMillisecond))
          : this.IsMoving &&
            Time_1.Time.Now > this.Ile &&
            ((this.IsMoving = !1),
            (this.yle =
              Time_1.Time.Now +
              this.StartInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond))
        : this.IsMoving &&
          ((i =
            this.Camera.CharacterEntityHandle.Entity.GetComponent(161).Speed),
          (this.ElapseTimeScale =
            i > this.ReferToMoveSpeed ? i / this.ReferToMoveSpeed : 1)),
      this.Lle.Update(t);
  }
  Dle(t) {
    const i = t.X || t.Y;
    if (this.IsMoving)
      if (i) {
        if (
          ((this.Ile =
            Time_1.Time.Now +
            this.StopInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond),
          this.Ele.X * t.X + this.Ele.Y * t.Y >
            Math.cos(
              this.LargeAngleTurnThreshold * MathUtils_1.MathUtils.DegToRad,
            ))
        )
          return (
            (this.yle =
              Time_1.Time.Now +
              this.LargeAngleTurnDelay *
                TimeUtil_1.TimeUtil.InverseMillisecond),
            (t =
              this.Camera.CharacterEntityHandle.Entity.GetComponent(161).Speed),
            (this.ElapseTimeScale =
              t > this.ReferToMoveSpeed ? t / this.ReferToMoveSpeed : 1),
            !1
          );
      } else
        this.yle =
          Time_1.Time.Now +
          this.LargeAngleTurnDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
    else if (
      ((this.Ile =
        Time_1.Time.Now +
        this.StopInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond),
      !i)
    )
      return (
        (this.yle =
          Time_1.Time.Now +
          this.StartInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond),
        !1
      );
    return !0;
  }
  UpdateInterp(t, i, s) {
    var h = this.Camera.Character.CharacterActorComponent.ActorForwardProxy;
    var e =
      (this.Lz.DeepCopy(h),
      this.Tz.DeepCopy(s),
      Math.abs(
        Math.acos(this.Lz.DotProduct(this.Tz)) * MathUtils_1.MathUtils.RadToDeg,
      ));
    var s =
      (e > this.DesiredAngle
        ? (this.Lz.CrossProduct(this.Tz, this.Tz),
          this.Tz.CrossProduct(this.Lz, this.Tz),
          (e = this.DesiredAngle * MathUtils_1.MathUtils.DegToRad),
          this.Lz.MultiplyEqual(Math.cos(e)),
          this.Tz.MultiplyEqual(Math.sin(e)),
          this.Lz.AdditionEqual(this.Tz))
        : this.Lz.DeepCopy(s),
      IS_DEBUG &&
        ((e = Vector_1.Vector.Create()),
        this.Camera.Character.CharacterActorComponent.ActorForwardProxy.CrossProduct(
          s,
          e,
        ),
        (a = Vector_1.Vector.Create()),
        s.RotateAngleAxis(-this.DesiredAngle, e, a),
        (s = Vector_1.Vector.Create(this.Camera.PlayerLocation)).AdditionEqual(
          e.Multiply(100, Vector_1.Vector.Create()),
        ),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          this.Camera.PlayerLocation.ToUeVector(),
          s.ToUeVector(),
          new UE.LinearColor(1, 0, 0, 1),
          0,
          5,
        ),
        (e = Vector_1.Vector.Create(this.Camera.PlayerLocation)).AdditionEqual(
          a.Multiply(100, Vector_1.Vector.Create()),
        ),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          this.Camera.PlayerLocation.ToUeVector(),
          e.ToUeVector(),
          new UE.LinearColor(0, 1, 0, 1),
          0,
          5,
        )),
      this.Camera.CurrentCamera.ArmRotation.Vector(this.Tz),
      this.Tz.X * h.Y - this.Tz.Y * h.X);
    var a = this.Tz.X * this.Lz.Y - this.Tz.Y * this.Lz.X;
    var e = this.Lz.X * h.Y - this.Lz.Y * h.X;
    var h = s * a < 0 && s * e < 0;
    var a =
      (MathUtils_1.MathUtils.LerpDirect2dByMaxAngle(
        this.Tz,
        this.Lz,
        this.Lz.Z < 0 ? this.PitchDownRate : this.PitchUpRate,
        t * i * this.ElapseTimeScale,
        h,
        this.Lz,
      ),
      this.Camera.DesiredCamera.ArmRotation);
    MathUtils_1.MathUtils.LookRotationForwardFirst(
      this.Lz,
      Vector_1.Vector.UpVectorProxy,
      a,
    ),
      (this.Camera.IsModifiedArmRotation = !0);
  }
  Tle(t) {
    return t === 2 || t === 7 || t === 8 || t === 9;
  }
}
exports.CameraClimbController = CameraClimbController;
// # sourceMappingURL=CameraClimbController.js.map
