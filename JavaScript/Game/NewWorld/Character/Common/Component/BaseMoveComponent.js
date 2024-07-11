"use strict";
let BaseMoveComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    let h;
    const o = arguments.length;
    let r =
      o < 3 ? i : s === null ? (s = Object.getOwnPropertyDescriptor(i, e)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, i, e, s);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (h = t[a]) && (r = (o < 3 ? h(r) : o > 3 ? h(i, e, r) : h(i, e)) || r);
    return o > 3 && r && Object.defineProperty(i, e, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseMoveComponent = exports.GravityScale = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const CurveUtils_1 = require("../../../../../Core/Utils/Curve/CurveUtils");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const GlobalData_1 = require("../../../../GlobalData");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const TsBaseItem_1 = require("../../../SceneItem/BaseItem/TsBaseItem");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const CharacterAttributeTypes_1 = require("./Abilities/CharacterAttributeTypes");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const BaseMoveCharacter_1 = require("./Move/BaseMoveCharacter");
const MoveToLocationLogic_1 = require("./Move/MoveToLocationLogic");
const PROFILE_KEY = "CharacterMoveComponent_GetHeightAboveGround";
const ROTATION_AIM = 1500;
const NEAR_ZERO = 1e-6;
const HEIGHT_DETECT = 500;
const ROTATABLE_THREADHOLD = 0.5;
const BASE_MOVEMENT_VELOCITY_RATE = 0.2;
const SPEED_LOCK_FRAME = 5;
const INVALID_FORCE_SPEED = -1e8;
const OPEN_DEBUG = !1;
const DEFAULT_MAX_FALLING_VELOCITY_2D = 700;
const DEFAULT_AIR_CONTROL = 0.05;
class VelocityAddition {
  constructor(t, i, e, s, h, o, r) {
    (this.ElapsedTime = -0),
      (this.Duration = -0),
      (this.Velocity = void 0),
      (this.CurveFloat = void 0),
      (this.MovementMode = -0),
      (this.VelocityCurveType = 0),
      (this.VelocityCurveMin = -0),
      (this.VelocityCurveMax = -0),
      (this.ElapsedTime = 0),
      (this.Duration = t),
      (this.Velocity = i),
      (this.CurveFloat = e),
      (this.MovementMode = s),
      (this.VelocityCurveType = h),
      (this.VelocityCurveMin = o),
      (this.VelocityCurveMax = r);
  }
  VelocityCurveFunc(t) {
    let i = t;
    switch (this.VelocityCurveType) {
      case 1:
        i = MathUtils_1.MathUtils.BlendEaseIn(
          this.VelocityCurveMax,
          this.VelocityCurveMin,
          t,
          2,
        );
        break;
      case 3:
        i = MathUtils_1.MathUtils.BlendEaseIn(
          this.VelocityCurveMin,
          this.VelocityCurveMax,
          t - 1,
          2,
        );
        break;
      case 2:
        i =
          this.VelocityCurveMax +
          (this.VelocityCurveMin - this.VelocityCurveMax) * t;
    }
    return MathUtils_1.MathUtils.Clamp(i, 0, 1);
  }
}
class GravityScale {
  constructor(t = 0, i = 0, e = 0, s = 0, h = 0, o = 0) {
    (this.ScaleUp = t),
      (this.ScaleDown = i),
      (this.ScaleTop = e),
      (this.VelocityTop = s),
      (this.Duration = h),
      (this.ElapsedTime = o);
  }
}
exports.GravityScale = GravityScale;
class RotationSetting {
  constructor() {
    (this.MinSpeed = 360),
      (this.MaxSpeed = 600),
      (this.MinOffset = 0),
      (this.MaxOffset = 180),
      (this.Curve = CurveUtils_1.CurveUtils.DefaultLinear);
  }
  ClearObject() {
    return (
      (this.MinSpeed = 360),
      (this.MaxSpeed = 600),
      (this.MinOffset = 0),
      (this.MaxOffset = 180),
      (this.Curve = CurveUtils_1.CurveUtils.DefaultLinear),
      !0
    );
  }
  UpdateSettings(t) {
    (this.MinSpeed = t.最小旋转速度),
      (this.MaxSpeed = t.最大旋转速度),
      (this.MinOffset = t.最小角度差),
      (this.MaxOffset = t.最大角度差),
      (this.Curve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.渐变曲线));
  }
  GetSpeed(t) {
    t = (t - this.MinOffset) / (this.MaxOffset - this.MinOffset);
    return (
      this.MinSpeed +
      this.Curve.GetCurrentValue(t) * (this.MaxSpeed - this.MinSpeed)
    );
  }
}
let BaseMoveComponent = (BaseMoveComponent_1 = class BaseMoveComponent extends (
  EntityComponent_1.EntityComponent
) {
  constructor() {
    super(...arguments),
      (this.IsInputDrivenCharacter = !1),
      (this.ActorComp = void 0),
      (this.CharacterMovement = void 0),
      (this.AnimComp = void 0),
      (this.MoveToLocationLogicInternal = void 0),
      (this.MoveControllerInternal = void 0),
      (this.HasMoveInput = !1),
      (this.ForceExitStateStop = !1),
      (this.IsMoving = !1),
      (this.Speed = 0),
      (this.IsSpecialMove = !1),
      (this.CanMoveWithDistanceInternal = !0),
      (this.CanMoveFromInputInternal = !0),
      (this.DeltaTimeSeconds = 0),
      (this.JumpUpRate = 1),
      (this.ConfigChainLengthSquared = -1),
      (this.CurrentChainLengthSquared = 0),
      (this.ChainCenter = Vector_1.Vector.Create()),
      (this.ForceSpeed = Vector_1.Vector.Create(
        INVALID_FORCE_SPEED,
        INVALID_FORCE_SPEED,
        INVALID_FORCE_SPEED,
      )),
      (this.Acceleration = Vector_1.Vector.Create()),
      (this.PreviousVelocity = Vector_1.Vector.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.PreviousAimYaw = 0),
      (this.AimYawRate = 0),
      (this.IsFallingIntoWater = !1),
      (this.JumpFrameCount = 0),
      (this.CharHeightAboveGround = -1),
      (this.CreatureProperty = void 0),
      (this.MovementData = void 0),
      (this.rFr = void 0),
      (this.nFr = new RotationSetting()),
      (this.UnifiedStateComponent = void 0),
      (this.HasBaseMovement = !1),
      (this.OldMovementMode = void 0),
      (this.IsHidden = !1),
      (this.HasDeltaBaseMovementData = !1),
      (this.DeltaBaseMovementOffset = void 0),
      (this.DeltaBaseMovementQuat = void 0),
      (this.DeltaBaseMovementSpeed = void 0),
      (this.DeltaConveyBeltSpeed = void 0),
      (this.DeltaBaseMovementYaw = 0),
      (this.BasePrimitiveComponent = void 0),
      (this.IsDeltaBaseSpeedNeedZ = !1),
      (this.IsLockedRotation = !1),
      (this.SpeedLockFrame = 0),
      (this.VelocityVector = Vector_1.Vector.Create()),
      (this.IsStopInternal = !1),
      (this.DebugMovementSetting = void 0),
      (this.UseDebugMovementSetting = !1),
      (this.WalkOffCount = 0),
      (this.CannotResponseInputCount = 0),
      (this.CapsuleOffset = void 0),
      (this.SphereTrace = void 0),
      (this.AccelerationChangeMoveState = void 0),
      (this.AccelerationLerpCurve = void 0),
      (this.FallingHorizontalMaxSpeed = DEFAULT_MAX_FALLING_VELOCITY_2D),
      (this.DesireMaxAccelerationLerpTime = -0),
      (this.MaxAccelerationLerpTime = -0),
      (this.TurnRate = 1),
      (this.OnDirectionStateChange = (t, i) => {
        this.ResetMovementSetting(i);
        i = this.UnifiedStateComponent?.MoveState;
        this.ResetMaxSpeed(i), this.ResetCharacterMovementInfo(i);
      }),
      (this.OnMoveStateChange = (t, i) => {
        const e = this.UnifiedStateComponent?.DirectionState;
        this.ResetMovementSetting(e),
          this.ResetMaxSpeed(i),
          this.ResetCharacterMovementInfo(i);
      }),
      (this.OnPositionStateChange = () => {
        var t = this.UnifiedStateComponent?.DirectionState;
        var t =
          (this.ResetMovementSetting(t), this.UnifiedStateComponent?.MoveState);
        this.ResetMaxSpeed(t), this.ResetCharacterMovementInfo(t);
      }),
      (this.JumpDelayTimer = void 0),
      (this.GroundedTimeUe = 0),
      (this.VelocityAdditionIncId = 1),
      (this.VelocityAdditionMap = new Map()),
      (this.VelocityAdditionMapByMesh = new Map()),
      (this.AddMoveOffset = void 0),
      (this.AddMoveRotation = Rotator_1.Rotator.Create()),
      (this.StartLocation = Vector_1.Vector.Create()),
      (this.TempRotator = Rotator_1.Rotator.Create(0, 0, 0)),
      (this.CurrentGravityScale = void 0);
  }
  SetForceSpeed(t) {
    t.ContainsNaN() &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Movement", 6, "SetForceSpeed Contains NaN", [
        "speed",
        t,
      ]),
      this.ForceSpeed.DeepCopy(t),
      this.CharacterMovement &&
        (this.CharacterMovement.Velocity = this.ForceSpeed.ToUeVector()),
      this.ActorComp && this.ActorComp.ResetCachedVelocityTime();
  }
  get IsJump() {
    return this.JumpFrameCount > 0;
  }
  get CurrentMovementSettings() {
    return this.rFr;
  }
  set CurrentMovementSettings(t) {
    (this.rFr = t), this.nFr.UpdateSettings(t.ControllerRotationSpeedSetting);
  }
  set AccelerationLerpTime(t) {
    (this.DesireMaxAccelerationLerpTime = t),
      (this.MaxAccelerationLerpTime = t);
  }
  get AccelerationLerpTime() {
    return this.DesireMaxAccelerationLerpTime;
  }
  SetFallingHorizontalMaxSpeed(t) {
    this.FallingHorizontalMaxSpeed = t;
  }
  ClearFallingHorizontalMaxSpeed() {
    this.FallingHorizontalMaxSpeed = DEFAULT_MAX_FALLING_VELOCITY_2D;
  }
  get BasePlatform() {
    let t;
    if (this.BasePrimitiveComponent?.IsValid())
      return (t = this.BasePrimitiveComponent?.GetOwner()) instanceof
        UE.BP_BasePlatform_C
        ? t
        : (t = ActorUtils_1.ActorUtils.GetEntityByActor(
              this.BasePrimitiveComponent.GetOwner()?.GetAttachRootParentActor(),
              !1,
            )?.Entity?.GetComponent(182))
          ? t?.GetInteractionMainActor()?.BasePlatform
          : void 0;
    this.BasePrimitiveComponent = void 0;
  }
  SetUseDebugMovementSetting(t) {
    this.UseDebugMovementSetting = t;
  }
  SetDebugMovementSetting(t) {
    this.DebugMovementSetting = t;
  }
  ApplyDebugMovementSetting() {
    this.CurrentMovementSettings = this.DebugMovementSetting;
  }
  ResetMovementSettingByDirectionState(t) {
    switch (t) {
      case CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection:
        this.CurrentMovementSettings = this.MovementData.FaceDirection.Standing;
        break;
      case CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection:
        this.CurrentMovementSettings = this.MovementData.LockDirection.Standing;
        break;
      case CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection:
        this.CurrentMovementSettings = this.MovementData.AimDirection.Standing;
    }
  }
  ResetMovementSetting(t) {
    this.MovementData
      ? this.UseDebugMovementSetting
        ? this.ApplyDebugMovementSetting()
        : this.ResetMovementSettingByDirectionState(t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          58,
          "以下BP_{Character}没有在蓝图中配置Dt_BaseMovementSetting找对应的蓝图负责人处理",
          ["Character", this.ActorComp.Actor.GetName()],
        );
  }
  ResetMaxSpeed(t) {
    if (!(this.SpeedLockFrame > 0)) {
      const i = this.ActorComp.Actor.TsCharacterDebugComponent.MaxFixSpeed;
      switch (t) {
        case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
          this.SetMaxSpeed(i + (this.CurrentMovementSettings?.WalkSpeed ?? 0));
          break;
        case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
          this.SetMaxSpeed(i + (this.CurrentMovementSettings?.RunSpeed ?? 0));
          break;
        case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
          this.SetMaxSpeed(
            i + (this.CurrentMovementSettings?.SprintSpeed ?? 0),
          );
          break;
        case CharacterUnifiedStateTypes_1.ECharMoveState.Swing:
          this.SetMaxSpeed(i + (this.CurrentMovementSettings?.SwingSpeed ?? 0));
          break;
        default:
          this.SetMaxSpeed(i + (this.CurrentMovementSettings?.RunSpeed ?? 0));
      }
    }
  }
  SetMaxSpeed(t) {
    let i = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    var t = t * (i /= CharacterAttributeTypes_1.PER_TEN_THOUSAND);
    this.CharacterMovement.MovementMode === 5
      ? (this.CharacterMovement.MaxFlySpeed = t)
      : (this.CharacterMovement.MaxWalkSpeed = t);
  }
  ResetCharacterMovementInfo(t) {
    (this.CharacterMovement.MaxWalkSpeedCrouched =
      this.CharacterMovement.MaxWalkSpeed),
      t === CharacterUnifiedStateTypes_1.ECharMoveState.Swing
        ? (this.CharacterMovement.MaxAcceleration =
            this.CurrentMovementSettings?.SwingAcceleration ?? 0)
        : (this.CharacterMovement.MaxAcceleration =
            this.CurrentMovementSettings?.Acceleration ?? 0),
      (this.CharacterMovement.GroundFriction =
        this.CurrentMovementSettings?.GroundFriction ?? 0);
  }
  SetAddMoveOffset(t) {
    (this.AddMoveOffset = t),
      this.ActorComp.IsRoleAndCtrlByMe &&
        t &&
        t.SizeSquared() > 1e6 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Movement",
          6,
          "AddMove超过了10米",
          ["Actor", this.ActorComp.Actor.GetName()],
          ["Offset", t],
        );
  }
  SetAddMoveRotation(t) {
    this.AddMoveRotation.DeepCopy(t);
  }
  StopMove(t) {
    t &&
      (this.CharacterMovement &&
        (this.CharacterMovement.Velocity = Vector_1.Vector.ZeroVector),
      this.ActorComp?.ResetCachedVelocityTime(),
      this.MoveController?.StopMove()),
      (this.IsStopInternal = t);
  }
  SetHiddenMovementMode(t) {
    t !== this.IsHidden &&
      (t
        ? ((this.OldMovementMode = this.CharacterMovement?.MovementMode),
          this.CharacterMovement?.SetMovementMode(0))
        : this.CharacterMovement?.SetMovementMode(this.OldMovementMode),
      (this.IsHidden = t));
  }
  OnInitData() {
    return (
      (this.CurrentGravityScale = new GravityScale()),
      this.ForceSpeed.Set(
        INVALID_FORCE_SPEED,
        INVALID_FORCE_SPEED,
        INVALID_FORCE_SPEED,
      ),
      !0
    );
  }
  InitTraceInfo() {
    (this.SphereTrace = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.SphereTrace.WorldContextObject = this.ActorComp.Owner),
      (this.SphereTrace.bIsSingle = !0),
      (this.SphereTrace.bIgnoreSelf = !0),
      this.SphereTrace.SetTraceTypeQuery(
        QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
      );
  }
  InitBaseState() {
    switch (this.ActorComp.CreatureData.GetEntityType()) {
      case Protocol_1.Aki.Protocol.HBs.Proto_Player:
        (this.CharacterMovement.bKuroAutoActiveNav = !1),
          (this.CharacterMovement.bKuroStillBlockInNav = !0),
          (this.CharacterMovement.bProjectNavMeshWalking = !1),
          (this.IsInputDrivenCharacter = !0);
        break;
      case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
      case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
        (this.CharacterMovement.bKuroAutoActiveNav = !1),
          (this.CharacterMovement.bKuroStillBlockInNav = !0),
          (this.CharacterMovement.bProjectNavMeshWalking = !1),
          (this.IsInputDrivenCharacter = !1);
        break;
      case Protocol_1.Aki.Protocol.HBs.Proto_Npc:
        (this.CharacterMovement.bKuroAutoActiveNav = !1),
          (this.CharacterMovement.bKuroStillBlockInNav = !1),
          (this.CharacterMovement.bProjectNavMeshWalking = !1),
          (this.IsInputDrivenCharacter = !0);
        break;
      default:
        (this.CharacterMovement.bKuroAutoActiveNav = !1),
          (this.CharacterMovement.bKuroStillBlockInNav = !1),
          (this.CharacterMovement.bProjectNavMeshWalking = !0),
          (this.IsInputDrivenCharacter = !0);
    }
    (this.CharacterMovement.bImpartBaseVelocityZ = !1),
      (this.CharacterMovement.bImpartBaseVelocityX = !1),
      (this.CharacterMovement.bImpartBaseVelocityY = !1);
  }
  OnActivate() {
    this.OnMoveStateChange(
      CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
      CharacterUnifiedStateTypes_1.ECharMoveState.Run,
    ),
      this.CharacterMovement.MovementMode === 2 &&
        this.CharacterMovement.SetMovementMode(1);
  }
  PrintAnimInstanceMovementInfo() {
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("Test", 58, "TickInfo:", [
        "HasMoveInput",
        this.HasMoveInput,
      ]);
  }
  InitCreatureProperty() {
    const t = this.Entity.GetComponent(0);
    (this.CreatureProperty = t.GetEntityPropertyConfig()),
      (this.CharacterMovement.Mass = this.CreatureProperty.重量),
      (this.CharacterMovement.HitPriority = this.CreatureProperty.碰撞优先级),
      (this.CharacterMovement.GoThroughPriority =
        this.CreatureProperty.穿透优先级);
  }
  ResetHitPriorityAndGoThrough() {
    this.CreatureProperty &&
      ((this.CharacterMovement.HitPriority = this.CreatureProperty.碰撞优先级),
      (this.CharacterMovement.GoThroughPriority =
        this.CreatureProperty.穿透优先级));
  }
  CanResponseInput() {
    return this.CannotResponseInputCount === 0;
  }
  SetInfoVar() {
    this.DeltaTimeSeconds > NEAR_ZERO &&
      (this.Acceleration.DeepCopy(this.ActorComp.ActorVelocityProxy),
      this.Acceleration.SubtractionEqual(this.PreviousVelocity),
      this.Acceleration.DivisionEqual(this.DeltaTimeSeconds),
      (this.AimYawRate =
        Math.abs(this.ActorComp.ActorRotationProxy.Yaw - this.PreviousAimYaw) /
        this.DeltaTimeSeconds)),
      (this.HasMoveInput =
        (Math.abs(this.ActorComp.InputDirectProxy.X) > NEAR_ZERO ||
          Math.abs(this.ActorComp.InputDirectProxy.Y) > NEAR_ZERO) &&
        this.CharacterMovement.MaxAcceleration > NEAR_ZERO);
  }
  CacheVar() {
    this.PreviousVelocity.DeepCopy(this.ActorComp.ActorVelocityProxy),
      (this.PreviousAimYaw = this.ActorComp.ActorRotation.Yaw);
  }
  CanUpdateMovingRotation() {
    return (
      this.UnifiedStateComponent.DirectionState ===
        CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection ||
      !this.AnimComp?.Valid ||
      !this.AnimComp.HasKuroRootMotion ||
      this.AnimComp.MainAnimInstance.GetMainAnimsCurveValueWithDelta(
        CharacterNameDefines_1.CharacterNameDefines.ROOT_ROTATABLE,
        0,
      ) >= ROTATABLE_THREADHOLD
    );
  }
  SetLockedRotation(t) {
    this.IsLockedRotation = t;
  }
  get LockedRotation() {
    return this.IsLockedRotation;
  }
  SmoothCharacterRotation(
    t,
    i,
    e,
    s = !1,
    h = "Movement.SmoothCharacterRotation",
    o = !0,
  ) {
    let r;
    this.IsLockedRotation ||
      (r = this.ActorComp.ActorRotationProxy).Equals2(t) ||
      (this.TempRotator.DeepCopy(t),
      MathUtils_1.MathUtils.RotatorInterpConstantTo(
        r,
        this.TempRotator,
        e,
        (o ? this.SpeedScaled(i) : i) * this.TurnRate,
        this.TempRotator,
      ),
      this.Entity.GetTickInterval() > 1 &&
      this.AnimComp?.Valid &&
      this.ActorComp.Owner.WasRecentlyRenderedOnScreen()
        ? ((t = this.AnimComp.GetMeshTransform()),
          this.ActorComp.SetActorRotationWithPriority(
            this.TempRotator.ToUeRotator(),
            h,
            0,
            s,
          ),
          this.AnimComp.SetModelBuffer(
            t,
            e * MathUtils_1.MathUtils.SecondToMillisecond,
          ))
        : this.ActorComp.SetActorRotationWithPriority(
            this.TempRotator.ToUeRotator(),
            h,
            0,
            s,
          ));
  }
  ApplyForceSpeedAndRecordSpeed() {
    this.ForceSpeed.X !== INVALID_FORCE_SPEED &&
      (this.ForceSpeed.ContainsNaN()
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Movement", 6, "ForceSpeed Nan.", [
            "V",
            this.ForceSpeed,
          ])
        : (this.CharacterMovement.Velocity = this.ForceSpeed.ToUeVector()),
      this.ActorComp.ResetCachedVelocityTime(),
      (this.ForceSpeed.X = INVALID_FORCE_SPEED));
  }
  ConsumeForceFallingSpeed() {
    return !0;
  }
  SetAddMoveWorldSpeedWithMesh(t, i) {
    let e;
    t
      ? ((e = this.VelocityAdditionMapByMesh.get(t) ?? 0),
        (e = this.SetAddMoveWorld(i, -1, void 0, e)) &&
          this.VelocityAdditionMapByMesh.set(t, e))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Game",
          15,
          "[CharacterMoveComponent.SetAddMoveWorldSpeedWithMesh] 叠加位移失败，mesh为空",
        );
  }
  SetAddMoveWithMesh(t, i, e, s) {
    let h;
    t
      ? ((h = this.VelocityAdditionMapByMesh.get(t) ?? 0),
        (i = this.ActorComp.ActorRotation.RotateVector(i)),
        (h = this.SetAddMoveWorld(i, e, s, h)) &&
          this.VelocityAdditionMapByMesh.set(t, h))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Game",
          15,
          "[CharacterMoveComponent.SetAddMoveWithMesh] 叠加位移失败，mesh为空",
        );
  }
  SetAddMoveWorld(t, i, e, s, h, o = 0, r = 0, a = 1) {
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Game",
            15,
            "[CharacterMoveComponent.SetAddMoveWorldNew] 叠加位移失败，速度为空",
          ),
        0
      );
    if (
      GlobalData_1.GlobalData.IsPlayInEditor &&
      (a <= r ||
        MathUtils_1.MathUtils.Clamp(r, 0, 1) !== r ||
        MathUtils_1.MathUtils.Clamp(a, 0, 1) !== a)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Game",
            21,
            "速度曲线配置错误",
            ["Min", r],
            ["Max", a],
          ),
        0
      );
    let n = void 0;
    if (s && (n = this.VelocityAdditionMap.get(s)))
      return (
        t.ContainsNaN() &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Movement", 6, "SetAddMoveWorld Contains NaN", [
            "speed",
            t,
          ]),
        (n.ElapsedTime = 0),
        (n.Velocity = t),
        (n.Duration = i),
        (n.CurveFloat = e),
        (n.MovementMode = h),
        s
      );
    n = new VelocityAddition(i, t, e, h ?? 0, o, r, a);
    s = ++this.VelocityAdditionIncId;
    return this.VelocityAdditionMap.set(s, n), s;
  }
  SetAddMoveWorldWithMesh(t, i, e, s) {
    let h;
    t
      ? ((h = this.VelocityAdditionMapByMesh.get(t) ?? 0),
        (h = this.SetAddMoveWorld(i, e, s, h)) &&
          this.VelocityAdditionMapByMesh.set(t, h))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Game",
          15,
          "[CharacterMoveComponent.SetAddMoveWorldWithMesh] 叠加位移失败，mesh为空",
        );
  }
  StopAddMove(t) {
    return this.VelocityAdditionMap.delete(t);
  }
  StopAddMoveWithMesh(t) {
    t = this.VelocityAdditionMapByMesh.get(t);
    return this.VelocityAdditionMap.delete(t);
  }
  StopAllAddMove() {
    this.VelocityAdditionMap.clear();
  }
  OnTick(t) {
    this.CanMoveWithDistanceInternal = this.Entity.DistanceWithCamera <= 7e3;
  }
  OnTickGravityScale() {
    this.CurrentGravityScale.Duration < 0 ||
      (this.CurrentGravityScale.ElapsedTime >=
        this.CurrentGravityScale.Duration ||
      this.UnifiedStateComponent?.PositionState !==
        CharacterUnifiedStateTypes_1.ECharPositionState.Air
        ? (OPEN_DEBUG &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Character", 21, "OnTickGravityScale结束", [
              "Entity.Id",
              this.Entity.Id,
            ]),
          (this.CharacterMovement.GravityScale = 2),
          (this.CurrentGravityScale.Duration = -1))
        : ((this.CurrentGravityScale.ElapsedTime += this.DeltaTimeSeconds),
          OPEN_DEBUG &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Character", 21, "OnTickGravityScale", [
              "Entity.Id",
              this.Entity.Id,
            ]),
          this.CurrentGravityScale.VelocityTop <
          Math.abs(this.CharacterMovement.Velocity.Z)
            ? (this.CharacterMovement.GravityScale =
                2 *
                (this.CharacterMovement.Velocity.Z > 0
                  ? this.CurrentGravityScale.ScaleUp
                  : this.CurrentGravityScale.ScaleDown))
            : (this.CharacterMovement.GravityScale =
                2 * this.CurrentGravityScale.ScaleTop),
          OPEN_DEBUG &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Character",
              21,
              "受击重力",
              ["EntityId", this.Entity.Id],
              ["Velocity", this.CharacterMovement.Velocity.Z],
              ["GravityScale", this.CharacterMovement.GravityScale],
            )));
  }
  UpdateAddMoveOffset() {
    return (
      this.AddMoveOffset &&
        (this.UnifiedStateComponent?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground
          ? (this.VelocityVector.FromUeVector(this.AddMoveOffset),
            this.VelocityVector.DivisionEqual(this.DeltaTimeSeconds),
            this.ActorComp.KuroMoveAlongFloor(
              this.VelocityVector.ToUeVector(),
              this.DeltaTimeSeconds,
              "UpdateAddMoveOffset",
            ))
          : (this.VelocityVector.FromUeVector(this.AddMoveOffset),
            this.MoveCharacter(
              this.VelocityVector,
              this.DeltaTimeSeconds,
              "移动.更新速度叠加",
            )),
        (this.AddMoveOffset = void 0)),
      !this.AddMoveRotation.IsNearlyZero() &&
        (this.ActorComp.AddActorLocalRotation(
          this.AddMoveRotation.ToUeRotator(),
          "移动.更新旋转叠加 ",
          !1,
        ),
        this.AddMoveRotation.Reset(),
        !0)
    );
  }
  UpdateAddMoveSpeed(t = 1) {
    if (this.VelocityAdditionMap.size === 0) return !1;
    BaseMoveComponent_1.VelocityAdditionTotal.Reset();
    let i;
    let e;
    let s;
    const h = this.DeltaTimeSeconds * t;
    for ([i, e] of this.VelocityAdditionMap)
      if (e.Duration >= 0 && e.ElapsedTime >= e.Duration)
        this.VelocityAdditionMap.delete(i);
      else if (
        e.MovementMode &&
        this.CharacterMovement.CustomMovementMode !== e.MovementMode
      )
        this.VelocityAdditionMap.delete(i);
      else if (
        ((e.ElapsedTime += h),
        this.VelocityVector.FromUeVector(e.Velocity),
        e.VelocityCurveType !== 0
          ? ((s = e.VelocityCurveFunc(
              e.Duration > 0 ? e.ElapsedTime / e.Duration : 1,
            )),
            this.VelocityVector.FromUeVector(e.Velocity),
            this.VelocityVector.MultiplyEqual(s))
          : e.CurveFloat?.IsValid() &&
            this.VelocityVector.MultiplyEqual(
              e.CurveFloat.GetFloatValue(
                e.Duration > 0 ? e.ElapsedTime / e.Duration : 1,
              ),
            ),
        e.Duration > 0 &&
          e.ElapsedTime > e.Duration &&
          ((s = e.ElapsedTime - e.Duration),
          this.VelocityVector.MultiplyEqual((h - s) / h)),
        BaseMoveComponent_1.VelocityAdditionTotal.AdditionEqual(
          this.VelocityVector,
        ),
        this.VelocityVector.ContainsNaN())
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "VelocityVector NaN",
              ["key", i],
              ["VelocityVector", this.VelocityVector],
              ["velocityAddition.Velocity", e.Velocity],
              ["deltaTimeSeconds", h],
            ),
          this.VelocityAdditionMap.delete(i),
          !1
        );
    return (
      this.VelocityAdditionMap.size !== 0 &&
      (this.ActorComp.IsRoleAndCtrlByMe &&
        Math.abs(BaseMoveComponent_1.VelocityAdditionTotal.X) <
          MathUtils_1.MathUtils.SmallNumber &&
        Math.abs(BaseMoveComponent_1.VelocityAdditionTotal.Y) <
          MathUtils_1.MathUtils.SmallNumber &&
        Math.abs(BaseMoveComponent_1.VelocityAdditionTotal.Z - 50) <
          MathUtils_1.MathUtils.SmallNumber &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Movement", 6, "叠加向上移动50厘米", [
          "Actor",
          this.ActorComp.Actor.GetName(),
        ]),
      this.UnifiedStateComponent.PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Ground
        ? this.ActorComp.KuroMoveAlongFloor(
            BaseMoveComponent_1.VelocityAdditionTotal.ToUeVector(),
            h,
            "UpdateAddMoveSpeed",
          )
        : (BaseMoveComponent_1.VelocityAdditionDestination.DeepCopy(
            BaseMoveComponent_1.VelocityAdditionTotal,
          ),
          BaseMoveComponent_1.VelocityAdditionDestination.MultiplyEqual(h),
          BaseMoveComponent_1.VelocityAdditionDestination.ContainsNaN()
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Movement",
                6,
                "VelocityAdditionDestination NaN",
                [
                  "VelocityAdditionDestination",
                  BaseMoveComponent_1.VelocityAdditionDestination,
                ],
                [
                  "VelocityAdditionTotal",
                  BaseMoveComponent_1.VelocityAdditionTotal,
                ],
                ["deltaTimeSeconds", h],
              )
            : this.ActorComp.AddActorWorldOffset(
                BaseMoveComponent_1.VelocityAdditionDestination.ToUeVector(),
                "UpdateAddMoveSpeed",
                !0,
              )),
      !0)
    );
  }
  GetHeightAboveGround(t = HEIGHT_DETECT) {
    let i, e;
    return (
      this.CharHeightAboveGround >= t ||
        (MathUtils_1.MathUtils.TransformPosition(
          this.ActorComp.ActorLocationProxy,
          this.ActorComp.ActorRotationProxy,
          this.ActorComp.ActorScaleProxy,
          this.CapsuleOffset,
          this.StartLocation,
        ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.SphereTrace,
          this.StartLocation,
        ),
        this.SphereTrace.SetEndLocation(
          this.StartLocation.X,
          this.StartLocation.Y,
          this.StartLocation.Z - t,
        ),
        (this.SphereTrace.Radius = this.ActorComp.ScaledRadius),
        (e = TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.SphereTrace,
          PROFILE_KEY,
        )),
        (i = this.SphereTrace.HitResult),
        e && i.bBlockingHit
          ? ((e = i.LocationZ_Array.Get(0)),
            (this.CharHeightAboveGround = this.StartLocation.Z - e))
          : (this.CharHeightAboveGround = t)),
      this.CharHeightAboveGround
    );
  }
  IsInAir() {
    return (
      this.UnifiedStateComponent?.PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Air
    );
  }
  SetSpeedLock() {
    this.SpeedLockFrame = SPEED_LOCK_FRAME;
  }
  get FallingIntoWater() {
    return this.IsFallingIntoWater;
  }
  set FallingIntoWater(t) {
    this.IsFallingIntoWater = t;
  }
  MoveCharacter(t, i, e = "") {
    this.UnifiedStateComponent?.PositionState ===
    CharacterUnifiedStateTypes_1.ECharPositionState.Ground
      ? (t.DivisionEqual(i),
        this.ActorComp.KuroMoveAlongFloor(
          t.ToUeVector(),
          i,
          e || "MoveCharacter",
        ))
      : this.ActorComp.AddActorWorldOffset(
          t.ToUeVector(),
          e || "MoveCharacter",
          !0,
        ),
      this.ActorComp.ResetAllCachedTime();
  }
  SetWalkOffLedgeRecord(t) {
    t
      ? (--this.WalkOffCount,
        this.WalkOffCount === 0 && this.SetWalkOffLedge(!0))
      : (++this.WalkOffCount,
        this.WalkOffCount === 1 && this.SetWalkOffLedge(!1));
  }
  SetWalkOffLedge(t) {
    t
      ? ((this.CharacterMovement.bCanWalkOffLedges = !0),
        (this.CharacterMovement.PerchRadiusThreshold = 0),
        (this.CharacterMovement.PerchAdditionalHeight = 40))
      : ((this.CharacterMovement.bCanWalkOffLedges = !1),
        (this.CharacterMovement.PerchRadiusThreshold =
          this.ActorComp.ScaledRadius),
        (this.CharacterMovement.PerchAdditionalHeight =
          2 * this.ActorComp.ScaledRadius));
  }
  LerpMaxAcceleration() {
    let t, i;
    this.DesireMaxAccelerationLerpTime <= 0 ||
      (this.UnifiedStateComponent?.MoveState !==
      this.AccelerationChangeMoveState
        ? (this.DesireMaxAccelerationLerpTime = 0)
        : ((i = this.CurrentMovementSettings?.Acceleration),
          (this.DesireMaxAccelerationLerpTime -= this.DeltaTimeSeconds),
          (t =
            (this.MaxAccelerationLerpTime -
              this.DesireMaxAccelerationLerpTime) /
            this.MaxAccelerationLerpTime),
          (t = this.AccelerationLerpCurve.GetFloatValue(t)),
          (this.CharacterMovement.MaxAcceleration = t * i),
          (i = 0.8 * (MathUtils_1.MathUtils.Clamp(t, 1, 2) - 1) + 1),
          this.SetMaxSpeed(this.CurrentMovementSettings.SprintSpeed * i)));
  }
  UpdateGroundedRotation() {
    let t = 0;
    let i = "";
    (i = this.ActorComp.UseControllerRotation.IsNearlyZero()
      ? ((t = this.nFr.GetSpeed(
          Math.abs(
            this.ActorComp.InputRotator.Yaw -
              this.ActorComp.ActorRotationProxy.Yaw,
          ),
        )),
        "Movement.UpdateGroundedRotation.ROTATION_MEDIUM")
      : ((t = ROTATION_AIM), "Movement.UpdateGroundedRotation.ROTATION_AIM")),
      this.SmoothCharacterRotation(
        this.ActorComp.InputRotator,
        t,
        this.DeltaTimeSeconds,
        !1,
        i,
      );
  }
  UpdateBaseMovement() {
    let t;
    const i = this.ActorComp.Actor.BasedMovement;
    if (
      ((this.HasBaseMovement === i.bRelativeRotation &&
        this.BasePrimitiveComponent === i.MovementBase) ||
        ((this.HasBaseMovement = i.bRelativeRotation),
        (this.BasePrimitiveComponent = i.MovementBase),
        this.BasePrimitiveComponent &&
          this.HasBaseMovement &&
          (t =
            this.BasePrimitiveComponent.GetOwner()?.RootComponent
              ?.AttachParent) &&
          ((t = t.AttachParent?.GetOwner()) instanceof TsBaseCharacter_1.default
            ? ((this.IsDeltaBaseSpeedNeedZ = !1),
              (e = t.GetEntityNoBlueprint()) &&
                e.GetComponent(99)?.SetTakeOverTick(!0))
            : t instanceof TsBaseItem_1.default &&
              (this.IsDeltaBaseSpeedNeedZ = !0))),
      this.HasBaseMovement && i?.MovementBase?.Mobility === 2)
    ) {
      var e = this.CharacterMovement.BaseDeltaQuat.Rotator();
      (e.Roll = 0),
        (e.Pitch = 0),
        (this.DeltaBaseMovementQuat = e.Quaternion()),
        (this.DeltaBaseMovementYaw = e.Yaw),
        (this.DeltaBaseMovementOffset =
          this.CharacterMovement.BaseDeltaPosition);
      let t = void 0;
      (t = MathUtils_1.MathUtils.IsNearlyZero(this.DeltaTimeSeconds)
        ? new UE.Vector(0, 0, 0)
        : this.DeltaBaseMovementOffset.op_Division(this.DeltaTimeSeconds)),
        this.IsDeltaBaseSpeedNeedZ || (t.Z = 0),
        this.DeltaBaseMovementSpeed
          ? MathUtils_1.MathUtils.LerpVector(
              this.DeltaBaseMovementSpeed,
              t,
              BASE_MOVEMENT_VELOCITY_RATE,
              this.DeltaBaseMovementSpeed,
            )
          : (this.DeltaBaseMovementSpeed = t),
        (Math.abs(this.DeltaBaseMovementSpeed.X) > 3e3 ||
          Math.abs(this.DeltaBaseMovementSpeed.Y) > 3e3 ||
          Math.abs(this.DeltaBaseMovementSpeed.Z) > 3e3) &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Movement",
            6,
            "异常惯性速度",
            ["Speed", this.DeltaBaseMovementSpeed],
            ["BasedMovement", i.MovementBase.GetOwner()?.GetName()],
          ),
        (this.HasDeltaBaseMovementData = !0);
    } else
      (this.DeltaBaseMovementOffset = void 0),
        (this.DeltaBaseMovementQuat = void 0),
        (this.DeltaBaseMovementYaw = 0),
        (this.DeltaBaseMovementSpeed = void 0),
        (this.HasDeltaBaseMovementData = !1);
  }
  SpeedScaled(t) {
    return t;
  }
  get CanMoveFromInput() {
    return this.CanMoveFromInputInternal;
  }
  set CanMoveFromInput(t) {
    this.CanMoveFromInputInternal = t;
  }
  CanMove() {
    return (
      this.CanMoveFromInputInternal &&
      (this.CanMoveWithDistanceInternal ||
        this.UnifiedStateComponent.IsInFighting)
    );
  }
  CanJumpPress() {
    return !1;
  }
  CanWalkPress() {
    return !1;
  }
  IsMovingToLocation() {
    return this.MoveController.IsMoving();
  }
  MoveToLocationEnd(t) {
    this.MoveController.MoveEnd(t);
  }
  StopMoveToLocation() {
    this.MoveController.StopMove();
  }
  MoveAlongPath(t) {
    this.MoveController.IsMoving() &&
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Movement",
          51,
          "[BaseMoveComponent.MoveAlongPath]正在移动中，停止当前移动",
          ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
          ["Actor", this.ActorComp?.Owner?.GetName()],
          ["IsRunning", this.MoveToLocationLogic.IsRunning],
        ),
      this.MoveController.StopMove()),
      (this.IsStopInternal = !1),
      this.MoveToLocationLogic.MoveAlongPath(t);
  }
  get MoveController() {
    return (
      this.MoveControllerInternal ||
        (this.MoveControllerInternal =
          new MoveToLocationLogic_1.MoveToLocationController(
            this.Entity,
            this.MoveToLocationLogic,
          )),
      this.MoveControllerInternal
    );
  }
  get MoveToLocationLogic() {
    return (
      this.MoveToLocationLogicInternal ||
        ((this.MoveToLocationLogicInternal =
          new BaseMoveCharacter_1.BaseMoveCharacter()),
        this.MoveToLocationLogicInternal.Init(this.Entity)),
      this.MoveToLocationLogicInternal
    );
  }
  SetTurnRate(t) {
    this.TurnRate = t;
  }
  ResetTurnRate() {
    this.TurnRate = 1;
  }
  SetAirControl(t) {
    this.CharacterMovement.AirControl = t;
  }
  ResetAirControl() {
    this.CharacterMovement.AirControl = DEFAULT_AIR_CONTROL;
  }
});
(BaseMoveComponent.BaseMoveInheritCurveInternal = void 0),
  (BaseMoveComponent.VelocityAdditionTotal = Vector_1.Vector.Create()),
  (BaseMoveComponent.VelocityAdditionDestination = Vector_1.Vector.Create()),
  (BaseMoveComponent = BaseMoveComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(36)],
      BaseMoveComponent,
    )),
  (exports.BaseMoveComponent = BaseMoveComponent);
// # sourceMappingURL=BaseMoveComponent.js.map
