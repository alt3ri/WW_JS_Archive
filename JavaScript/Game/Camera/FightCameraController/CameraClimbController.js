"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraClimbController = void 0);
const UE = require("ue"),
  Time_1 = require("../../../Core/Common/Time"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StateBase_1 = require("../../../Core/Utils/StateMachine/StateBase"),
  StateMachine_1 = require("../../../Core/Utils/StateMachine/StateMachine"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  GlobalData_1 = require("../../GlobalData"),
  CameraUtility_1 = require("../CameraUtility"),
  CameraControllerBase_1 = require("./CameraControllerBase"),
  IS_DEBUG = !1;
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
      (this.gle = 0),
      (this.Gue = Rotator_1.Rotator.Create());
  }
  CanReEnter() {
    return !0;
  }
  OnReEnter() {
    this.OnEnter();
  }
  OnEnter() {
    this.Owner.Camera.IsInNormalGravityMode()
      ? (this.fle.DeepCopy(this.Owner.Camera.CurrentCamera.ArmRotation),
        this.ple.DeepCopy(this.Owner.Camera.PlayerRotator))
      : (CameraUtility_1.CameraUtility.GetRotatorInGravity(
          this.Owner.Camera.CurrentCamera.ArmRotation,
          this.fle,
        ),
        this.ple.DeepCopy(this.Owner.Camera.PlayerRotatorInGravity)),
      (this.gle = 0);
  }
  OnUpdate(t) {
    var i;
    this.Owner.Camera.IsModifiedArmRotationPitch ||
    this.Owner.Camera.IsModifiedArmRotationYaw
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
        Rotator_1.Rotator.Lerp(this.fle, this.ple, i, this.Gue),
        this.Owner.Camera.IsInNormalGravityMode()
          ? this.Owner.Camera.DesiredCamera.ArmRotation.DeepCopy(this.Gue)
          : CameraUtility_1.CameraUtility.SetRotatorInGravity(
              this.Owner.Camera.DesiredCamera.ArmRotation,
              this.Gue,
            ),
        (this.Owner.Camera.IsModifiedArmRotationPitch = !0),
        (this.Owner.Camera.IsModifiedArmRotationYaw = !0),
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
    this.Owner.Camera.IsModifiedArmRotationPitch ||
    this.Owner.Camera.IsModifiedArmRotationYaw
      ? this.StateMachine.Switch(0)
      : this.Owner.IsMoving
        ? ((this.gle += t * this.Owner.ElapseTimeScale),
          this.gle > this.Owner.MoveDelayTime && this.StateMachine.Switch(3))
        : (this.gle = 0);
  }
}
class AdjustState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.vle = !1),
      (this.Gwc = Vector_1.Vector.Create()),
      (this.Dce = Vector_1.Vector.Create());
  }
  OnEnter() {
    this.vle = !1;
  }
  OnUpdate(t) {
    var i, s, h;
    this.Owner.Camera.IsModifiedArmRotationPitch ||
    this.Owner.Camera.IsModifiedArmRotationYaw
      ? this.StateMachine.Switch(0)
      : this.Owner.IsMoving
        ? (this.Owner.Camera.PlayerRotator.Vector(this.Gwc),
          this.Owner.UpdateInterp(
            t,
            this.Owner.DefaultInterpSpeed,
            this.Owner.MoveDirection,
          ),
          this.Owner.Camera.DesiredCamera.ArmRotation.Vector(this.Dce),
          this.Owner.Camera.IsInNormalGravityMode() ||
            (CameraUtility_1.CameraUtility.GetVectorInGravity(
              this.Gwc,
              this.Gwc,
            ),
            CameraUtility_1.CameraUtility.GetVectorInGravity(
              this.Dce,
              this.Dce,
            )),
          !(i =
            Math.abs(
              Math.acos(Vector_1.Vector.DotProduct(this.Gwc, this.Dce)) *
                MathUtils_1.MathUtils.RadToDeg,
            ) <= this.Owner.ApplicableAngleWithCharacter) && this.vle
            ? ((s = Vector_1.Vector.Create()),
              this.Gwc.CrossProduct(this.Dce, s),
              (h = Vector_1.Vector.Create()),
              s.Normalize()
                ? this.Gwc.RotateAngleAxis(
                    this.Owner.ApplicableAngleWithCharacter,
                    s,
                    h,
                  )
                : h.DeepCopy(this.Gwc),
              h.Rotation(this.Owner.Camera.DesiredCamera.ArmRotation),
              (this.Owner.Camera.IsModifiedArmRotationPitch = !0),
              (this.Owner.Camera.IsModifiedArmRotationYaw = !0),
              (this.vle = !0))
            : (this.vle = i),
          MathUtils_1.MathUtils.IsNearlyEqual(
            this.Owner.Camera.CurrentCamera.ArmLength,
            this.Owner.DefaultArmLength,
          ) ||
            ((s =
              this.Owner.DefaultArmLength -
              this.Owner.Camera.CurrentCamera.ArmLength),
            (h = this.Owner.ArmLengthSpeed * t),
            Math.abs(h) > Math.abs(s)
              ? (this.Owner.Camera.DesiredCamera.ArmLength =
                  this.Owner.DefaultArmLength)
              : (this.Owner.Camera.DesiredCamera.ArmLength =
                  this.Owner.Camera.CurrentCamera.ArmLength +
                  (h = 0 < s ? h : -h)),
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
    var i;
    this.Owner.Camera.IsModifiedArmRotationPitch ||
    this.Owner.Camera.IsModifiedArmRotationYaw
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
      (this.Ele = Rotator_1.Rotator.Create());
  }
  OnEnter() {
    this.Ele.DeepCopy(this.Owner.Camera.PlayerRotator),
      (this.Ele.Pitch = this.Owner.ReachThePeakPitch),
      this.Ele.Vector(this.Mle);
  }
  OnUpdate(t) {
    this.Owner.Camera.IsModifiedArmRotationPitch ||
    this.Owner.Camera.IsModifiedArmRotationYaw
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
      (this.Sle = Vector_1.Vector.Create()),
      (this.yle = 0),
      (this.Ile = 0),
      (this.MoveDirection = Vector_1.Vector.Create()),
      (this.Fwc = Vector_1.Vector.Create()),
      (this.Nwc = Vector_1.Vector.Create()),
      (this.Lz = Vector_1.Vector.Create()),
      (this.Tz = Vector_1.Vector.Create()),
      (this.Gue = Rotator_1.Rotator.Create()),
      (this.OnCharClimbStartExit = (t, i) => {
        this.Camera.CharacterEntityHandle.Id === t &&
          this.Tle(i) &&
          (3 === this.Lle.CurrentState
            ? this.Lle.Switch(5)
            : 1 === this.Lle.CurrentState && this.Lle.Switch(0));
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
    var t =
      this.Camera.CharacterEntityHandle.Entity.GetComponent(
        34,
      ).GetExitClimbType();
    this.Tle(t) ? this.Lle.Switch(0) : this.Lle.Switch(1),
      this.Camera.CameraAdjustController.Lock(this),
      this.Camera.CameraAutoController.Lock(this),
      this.Camera.CameraSidestepController.Lock(this),
      this.Sle.Reset(),
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
    var i;
    this.Camera.CharacterEntityHandle.Entity.GetComponent(61).GetMoveVector(
      this.Lz,
    ),
      this.Dle(this.Lz)
        ? Time_1.Time.Now > this.yle
          ? (this.Sle.DeepCopy(this.Lz),
            this.Lz.Set(0, this.Sle.Y, this.Sle.X),
            this.Camera.Character.CharacterActorComponent.ActorQuatProxy.RotateVector(
              this.Lz,
              this.MoveDirection,
            ),
            (this.IsMoving = !0),
            (i =
              this.Camera.CharacterEntityHandle.Entity.GetComponent(176).Speed),
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
            this.Camera.CharacterEntityHandle.Entity.GetComponent(176).Speed),
          (this.ElapseTimeScale =
            i > this.ReferToMoveSpeed ? i / this.ReferToMoveSpeed : 1)),
      this.Lle.Update(t);
  }
  Dle(t) {
    var i = t.X || t.Y;
    if (this.IsMoving)
      if (i) {
        if (
          ((this.Ile =
            Time_1.Time.Now +
            this.StopInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond),
          this.Sle.X * t.X + this.Sle.Y * t.Y >
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
              this.Camera.CharacterEntityHandle.Entity.GetComponent(176).Speed),
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
    var h = this.Camera.Character.CharacterActorComponent.ActorForwardProxy,
      h =
        (CameraUtility_1.CameraUtility.GetVectorInGravity(h, this.Fwc),
        CameraUtility_1.CameraUtility.GetVectorInGravity(s, this.Nwc),
        this.Lz.DeepCopy(this.Fwc),
        this.Tz.DeepCopy(this.Nwc),
        Math.abs(
          Math.acos(this.Lz.DotProduct(this.Tz)) *
            MathUtils_1.MathUtils.RadToDeg,
        )),
      s =
        (h > this.DesiredAngle
          ? (this.Lz.CrossProduct(this.Tz, this.Tz),
            this.Tz.CrossProduct(this.Lz, this.Tz),
            (h = this.DesiredAngle * MathUtils_1.MathUtils.DegToRad),
            this.Lz.MultiplyEqual(Math.cos(h)),
            this.Tz.MultiplyEqual(Math.sin(h)),
            this.Lz.AdditionEqual(this.Tz))
          : this.Lz.DeepCopy(this.Nwc),
        IS_DEBUG &&
          ((h = Vector_1.Vector.Create()),
          this.Camera.Character.CharacterActorComponent.ActorForwardProxy.CrossProduct(
            s,
            h,
          ),
          (e = Vector_1.Vector.Create()),
          s.RotateAngleAxis(-this.DesiredAngle, h, e),
          (s = Vector_1.Vector.Create(
            this.Camera.PlayerLocation,
          )).AdditionEqual(h.Multiply(100, Vector_1.Vector.Create())),
          UE.KismetSystemLibrary.D_DrawDebugLine(
            GlobalData_1.GlobalData.World,
            this.Camera.PlayerLocation.ToUeVector(),
            s.ToUeVector(),
            new UE.LinearColor(1, 0, 0, 1),
            0,
            5,
          ),
          (h = Vector_1.Vector.Create(
            this.Camera.PlayerLocation,
          )).AdditionEqual(e.Multiply(100, Vector_1.Vector.Create())),
          UE.KismetSystemLibrary.D_DrawDebugLine(
            GlobalData_1.GlobalData.World,
            this.Camera.PlayerLocation.ToUeVector(),
            h.ToUeVector(),
            new UE.LinearColor(0, 1, 0, 1),
            0,
            5,
          )),
        (this.Camera.IsInNormalGravityMode()
          ? this.Camera.CurrentCamera.ArmRotation
          : (CameraUtility_1.CameraUtility.GetRotatorInGravity(
              this.Camera.CurrentCamera.ArmRotation,
              this.Gue,
            ),
            this.Gue)
        ).Vector(this.Tz),
        this.Tz.X * this.Fwc.Y - this.Tz.Y * this.Fwc.X),
      e = this.Tz.X * this.Lz.Y - this.Tz.Y * this.Lz.X,
      h = this.Lz.X * this.Fwc.Y - this.Lz.Y * this.Fwc.X,
      e = s * e < 0 && s * h < 0;
    MathUtils_1.MathUtils.LerpDirect2dByMaxAngle(
      this.Tz,
      this.Lz,
      this.Lz.Z < 0 ? this.PitchDownRate : this.PitchUpRate,
      t * i * this.ElapseTimeScale,
      e,
      this.Lz,
    ),
      this.Camera.IsInNormalGravityMode()
        ? ((s = this.Camera.DesiredCamera.ArmRotation),
          MathUtils_1.MathUtils.LookRotationForwardFirst(
            this.Lz,
            Vector_1.Vector.UpVectorProxy,
            s,
          ))
        : (this.Lz.Rotation(this.Gue),
          CameraUtility_1.CameraUtility.SetRotatorInGravity(
            this.Camera.DesiredCamera.ArmRotation,
            this.Gue,
          )),
      (this.Camera.IsModifiedArmRotationPitch = !0),
      (this.Camera.IsModifiedArmRotationYaw = !0);
  }
  Tle(t) {
    return 2 === t || 7 === t || 8 === t || 9 === t;
  }
}
exports.CameraClimbController = CameraClimbController;
//# sourceMappingURL=CameraClimbController.js.map
