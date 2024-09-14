"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
  TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
  GravityUtils_1 = require("../../../../../Utils/GravityUtils"),
  CharacterSwimComponent_1 = require("../../Component/CharacterSwimComponent"),
  MIN_ROTATOR_ANGLE = 10,
  MAX_SIMPLE_SWIM_DELTA = 0.15,
  tmpVector = Vector_1.Vector.Create(),
  tmpVector2 = Vector_1.Vector.Create();
class TsMoveBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static get TmpQuat() {
    return (
      TsMoveBlueprintFunctionLibrary.TmpQuatInternal ||
        (TsMoveBlueprintFunctionLibrary.TmpQuatInternal = Quat_1.Quat.Create()),
      TsMoveBlueprintFunctionLibrary.TmpQuatInternal
    );
  }
  static SetActorRotationWithPriority(t, e, i = !1, n = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return (
      !!t && t.SetActorRotationWithPriority(e, "BlueprintAPI." + n, 0, !0, i)
    );
  }
  static SetActorLocationWithContext(t, e, i = !1, n = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return !!t && t.SetActorLocation(e, "BlueprintAPI." + n, i);
  }
  static SetActorLocationAndRotationWithContext(
    t,
    e,
    i,
    n = !1,
    r = "unknown",
  ) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    t && t.SetActorLocationAndRotation(e, i, "BlueprintAPI." + r, n);
  }
  static SetActorRotationWithContext(t, e, i, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return !!t && t.SetActorRotation(e, "BlueprintAPI." + n, i);
  }
  static AddActorWorldOffsetWithContext(t, e, i = !0, n = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    t && t.AddActorWorldOffset(e, "BlueprintAPI." + n, i);
  }
  static AddActorLocalOffsetWithContext(t, e, i = !0, n = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    t && t.AddActorLocalOffset(e, "BlueprintAPI." + n, i);
  }
  static AddActorWorldRotationWithContext(t, e, i = !1, n = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    t && t.AddActorWorldRotation(e, "BlueprintAPI." + n, i);
  }
  static AddActorLocalRotationWithContext(t, e, i = !1, n = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    t && t.AddActorLocalRotation(e, "BlueprintAPI." + n, i);
  }
  static ActorTeleportToWithContext(t, e, i, n = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    t && t.TeleportTo(e, i, "BlueprintAPI." + n);
  }
  static ActorKuroMoveAlongFloorWithContext(t, e, i, n = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    t && t.KuroMoveAlongFloor(e, i, "BlueprintAPI." + n);
  }
  static GetInputDirect(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 3)?.InputDirect ??
      Vector_1.Vector.ZeroVector
    );
  }
  static SetInputDirect(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 3)?.SetInputDirect(e);
  }
  static GetInputRotator(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(
        t,
        3,
      )?.InputRotatorProxy.ToUeRotator() ?? Rotator_1.Rotator.ZeroRotator
    );
  }
  static SetInputRotator(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 3)?.SetInputRotator(e);
  }
  static SetCharacterHidden(t, e, i, n) {
    i?.IsValid()
      ? ((i = `[蓝图:${i.GetName()}] ` + n),
        (n = EntitySystem_1.EntitySystem.Get(t))?.Valid &&
          ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
            n,
            !e,
            !e,
            !e,
            i,
            !0,
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "调用SetCharacterHidden失败，因为callObject为空",
        );
  }
  static SetHiddenMovementMode(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.SetHiddenMovementMode(e);
  }
  static CanResponseInput(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 38)?.CanResponseInput() ?? !1
    );
  }
  static CanJumpPress(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 38)?.CanJumpPress() ?? !1
    );
  }
  static CanWalkPress(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 38)?.CanWalkPress() ?? !1
    );
  }
  static GetHeightAboveGround(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      38,
    )?.GetHeightAboveGround();
  }
  static GetAcceleration(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      38,
    )?.Acceleration.ToUeVector();
  }
  static GetAimYawRate(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 38)?.AimYawRate;
  }
  static GetMovementData(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 38)?.MovementData;
  }
  static SmoothCharacterRotation(t, e, i, n) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.SmoothCharacterRotation(
      e,
      i,
      Time_1.Time.DeltaTimeSeconds,
      !1,
      n,
    );
  }
  static HasMoveInput(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 38)?.HasMoveInput ?? !1;
  }
  static HasMoveInputOrTickIntervalAndModelBuffer(t) {
    var e;
    return (
      !!EntitySystem_1.EntitySystem.GetComponent(t, 38)?.HasMoveInput ||
      (!(
        !(e = EntitySystem_1.EntitySystem.Get(t)) || e.GetTickInterval() <= 1
      ) &&
        (EntitySystem_1.EntitySystem.GetComponent(
          t,
          163,
        )?.HasLocationModelBuffer() ??
          !1))
    );
  }
  static HasRotatorInput(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return (
      GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(t) >
      MIN_ROTATOR_ANGLE
    );
  }
  static IsMoving(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 38)?.IsMoving ?? !1;
  }
  static IsJump(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 38)?.IsJump ?? !1;
  }
  static GetSpeed(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 38)?.Speed;
  }
  static GetGroundedTime(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 38)?.GroundedTimeUe;
  }
  static IsFallingIntoWater(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 38)?.IsFallingIntoWater ?? !1
    );
  }
  static SetForceSpeed(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.SetForceSpeed(e);
  }
  static SetAddMove(t, e, i, n, r) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.SetAddMoveWithMesh(
      e,
      i,
      n,
      r,
    );
  }
  static StopAddMove(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.StopAddMoveWithMesh(e);
  }
  static FixActorLocation(t, e, i) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 3),
      n = new UE.HitResult();
    if (t?.Valid) {
      var r = MathUtils_1.MathUtils.CommonTempVector,
        e =
          (r.FromUeVector(e),
          t.FixActorLocation(
            i,
            !0,
            r,
            "TsMoveBlueprintFunctionLibrary.FixActorLocation",
          ));
      if (e[0])
        return (
          (n.bBlockingHit = !0),
          (n.Location = new UE.Vector(e[1].X, e[1].Y, e[1].Z)),
          n
        );
    }
    return (n.bBlockingHit = !1), n;
  }
  static StopAllAddMove(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.StopAllAddMove();
  }
  static SetAddMoveWorld(t, e, i, n, r) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.SetAddMoveWorldWithMesh(
      e,
      i,
      n,
      r,
    );
  }
  static SetAddMoveWorldSpeed(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(
      t,
      38,
    )?.SetAddMoveWorldSpeedWithMesh(e, i);
  }
  static SetAddMoveOffset(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.SetAddMoveOffset(e);
  }
  static SetAddMoveRotation(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.SetAddMoveRotation(e);
  }
  static SetEnterWaterState(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 69)?.SetEnterWaterState(e);
  }
  static GetClimbState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 31)?.GetClimbState();
  }
  static GetClimbRadius(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 31)?.GetClimbRadius();
  }
  static GetClimbInfo(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 31)?.GetClimbInfo();
  }
  static KickExitCheck(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 31)?.KickExitCheck();
  }
  static CanClimbPress(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 31)?.CanClimbPress() ?? !1
    );
  }
  static OnEnterClimb(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 31)?.OnEnterClimb();
  }
  static OnExitClimb(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 31)?.OnExitClimb();
  }
  static DealClimbUpStart(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 31)?.DealClimbUpStart();
  }
  static FinishClimbDown(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 31)?.FinishClimbDown();
  }
  static DealClimbUpFinish(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 31)?.DealClimbUpFinish();
  }
  static SetClimbState(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 31)?.SetClimbState(e);
  }
  static SetEnterClimbType(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 31)?.SetEnterClimbType(e);
  }
  static SetExitClimbType(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 31)?.SetExitClimbType(e);
  }
  static GetSwimLocation(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 69)?.GetSwimLocation();
  }
  static GetWaterLocation(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 69)?.GetWaterLocation();
  }
  static GetWaterVolume(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 69)?.GetWaterVolume() ?? !1
    );
  }
  static GetClimbOnWallAngle(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 31)?.GetOnWallAngle();
  }
  static SetUseDebugMovementSetting(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.SetUseDebugMovementSetting(
      e,
    );
  }
  static SetDebugMovementSetting(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.SetDebugMovementSetting(e);
  }
  static SetLockedRotation(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 38)?.SetLockedRotation(e);
  }
  static GetLockedRotation(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 38)?.LockedRotation ?? !1
    );
  }
  static SetFallingHorizontalMaxSpeed(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(
      t,
      38,
    )?.SetFallingHorizontalMaxSpeed(e);
  }
  static ClearFallingHorizontalMaxSpeed(t) {
    EntitySystem_1.EntitySystem.GetComponent(
      t,
      38,
    )?.ClearFallingHorizontalMaxSpeed();
  }
  static DetectClimbWithDirect(t, e, i) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 31)?.DetectClimbWithDirect(
        e,
        i,
      ) ?? !1
    );
  }
  static TurnToTarget(t, e, i) {
    var n,
      r = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    r &&
      e instanceof TsBaseCharacter_1.default &&
      ((n = EntitySystem_1.EntitySystem.GetComponent(t, 163)) &&
        n.StopMontage(),
      (n = r.ActorLocationProxy),
      (r = e.CharacterActorComponent.ActorLocationProxy),
      (e = MathUtils_1.MathUtils.CommonTempVector),
      r.Subtraction(n, e),
      (r = MathUtils_1.MathUtils.CommonTempRotator),
      (n = EntitySystem_1.EntitySystem.GetComponent(t, 38)),
      e.ToOrientationRotator(r),
      n?.SmoothCharacterRotation(r, i, Time_1.Time.DeltaTimeSeconds, !1));
  }
  static GetMonsterMoveDirection(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return !t || t.InputDirectProxy.IsNearlyZero()
      ? 4
      : (t.ActorQuatProxy.Inverse(TsMoveBlueprintFunctionLibrary.TmpQuat),
        TsMoveBlueprintFunctionLibrary.TmpQuat.RotateVector(
          t.InputDirectProxy,
          tmpVector,
        ),
        Math.abs(tmpVector.X) > Math.abs(tmpVector.Y)
          ? 0 < tmpVector.X
            ? 0
            : 1
          : 0 < tmpVector.Y
            ? 3
            : 2);
  }
  static GetRoleBody(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return t &&
      t.CreatureData?.GetEntityType() ===
        Protocol_1.Aki.Protocol.kks.Proto_Player
      ? t.CreatureData.GetRoleConfig().RoleBody
      : "";
  }
  static GetRacingRightSpeed(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 98)?.LastRightSpeed ?? 0;
  }
  static SetPendulumData(t, e, i, n, r, o, s, a, y, m, c, _) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    t?.Valid && t.SetPendulumData(e, i, n, r, o, s, a, y, m, c, _);
  }
  static Reset(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    t?.Valid && t.Reset();
  }
  static SetGrabPoint(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    t?.Valid && (t.GrabPoint = e);
  }
  static GetGrabPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    return t?.Valid ? t.GrabPoint : new UE.Vector();
  }
  static SetHooked(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    t?.Valid && (t.Hooked = e);
  }
  static GetHooked(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    return !!t?.Valid && t.Hooked;
  }
  static SetSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    t?.Valid && (t.SocketName = e);
  }
  static SetRopeForce(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    t?.Valid && (t.RopeForce = e);
  }
  static GetRopeForce(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    return t?.Valid ? t.RopeForce : 0;
  }
  static SetDistanceRopeToActor(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    t?.Valid && (t.DistanceRopeToActor = e);
  }
  static GetDistanceRopeToActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    return t?.Valid ? t.DistanceRopeToActor : 0;
  }
  static SetAirControl(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    t?.Valid && (t.AirControl = e);
  }
  static GetAirControl(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    return t?.Valid ? t.AirControl : 0;
  }
  static SetUpLength(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 63);
    t?.Valid && (t.UpLength = e);
  }
  static SetCanMoveFromInput(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && (t.CanMoveFromInput = e);
  }
  static UpdateAnimInfoMove(t, e) {
    var i,
      n,
      r = EntitySystem_1.EntitySystem.GetComponent(t, 163);
    r?.Valid &&
      ((e = e),
      (r = r.AnimLogicParamsSetter),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid &&
        ((n = i.InputDirectProxy),
        r.InputDirect.Equals(n) ||
          (r.InputDirect.DeepCopy(n), (e.InputDirectRef = n.ToUeVector())),
        (n = i.InputRotatorProxy),
        r.InputRotator.Equals(n) ||
          (r.InputRotator.DeepCopy(n), (e.InputRotatorRef = n.ToUeRotator()))),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 38))?.Valid &&
        ((n = i.Acceleration),
        r.Acceleration.Equals(n) ||
          (r.Acceleration.DeepCopy(n), (e.AccelerationRef = n.ToUeVector())),
        (n = i.IsMoving),
        r.IsMoving !== n && ((r.IsMoving = n), (e.IsMovingRef = n)),
        (n = i.HasMoveInput),
        r.HasMoveInput !== n && ((r.HasMoveInput = n), (e.HasMoveInputRef = n)),
        (n = i.Speed),
        r.Speed !== n && ((r.Speed = n), (e.SpeedRef = n)),
        (n = i.IsJump),
        r.IsJump !== n && ((r.IsJump = n), (e.IsJumpRef = n)),
        (n = i.GroundedTimeUe),
        r.GroundedTime !== n && ((r.GroundedTime = n), (e.GroundedTimeRef = n)),
        (n = i.IsFallingIntoWater),
        r.IsFallingIntoWater !== n &&
          ((r.IsFallingIntoWater = n), (e.IsFallingIntoWaterRef = n)),
        (n = i.JumpUpRate),
        r.JumpUpRate !== n) &&
        ((r.JumpUpRate = n), (e.JumpUpRateRef = n)),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 31))?.Valid &&
        ((n = i.GetTsClimbInfo()),
        r.ClimbInfo.Equals(n) ||
          (r.ClimbInfo.DeepCopy(n), (e.ClimbInfoRef = i.GetClimbInfo())),
        (n = i.GetTsClimbState()),
        r.ClimbState.Equals(n) ||
          (r.ClimbState.DeepCopy(n), (e.ClimbStateRef = i.GetClimbState())),
        (n = i.GetClimbRadius()),
        r.ClimbRadius !== n && ((r.ClimbRadius = n), (e.ClimbRadiusRef = n)),
        (n = i.GetOnWallAngle()),
        r.ClimbOnWallAngle !== n) &&
        ((r.ClimbOnWallAngle = n), (e.ClimbOnWallAngleRef = n)),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 69))?.Valid &&
        ((n = i.SprintSwimOffset),
        r.SprintSwimOffset !== n &&
          ((r.SprintSwimOffset = n), (e.SprintSwimOffsetRef = n)),
        (n = i.SprintSwimOffsetLerpSpeed),
        r.SprintSwimOffsetLerpSpeed !== n) &&
        ((r.SprintSwimOffsetLerpSpeed = n),
        (e.SprintSwimOffsetLerpSpeedRef = n)),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 32))?.Valid) &&
      ((n = i.SlideForward),
      r.SlideForward.Equals(n) ||
        (r.SlideForward.DeepCopy(n), (e.SlideForwardRef = n.ToUeVector())),
      (t = i.SlideSwitchThisFrame),
      r.SlideSwitchThisFrame !== t &&
        ((r.SlideSwitchThisFrame = t), (e.SlideSwitchThisFrameRef = t)),
      (n = i.StandMode),
      r.SlideStandMode !== n) &&
      ((r.SlideStandMode = n), (e.SlideStandModeRef = n));
  }
  static UpdateAnimInfoMoveMonster(t, e) {
    var i,
      n = EntitySystem_1.EntitySystem.GetComponent(t, 163);
    n?.Valid &&
      ((e = e),
      (n = n.AnimLogicParamsSetter),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid &&
        ((i = i.InputDirectProxy),
        n.InputDirect.Equals(i) ||
          (n.InputDirect.DeepCopy(i), (e.InputDirectRef = i.ToUeVector()))),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 38))?.Valid) &&
      ((t = i.IsMoving),
      n.IsMoving !== t && ((n.IsMoving = t), (e.IsMovingRef = t)),
      (t = i.HasMoveInput),
      n.HasMoveInput !== t) &&
      ((n.HasMoveInput = t), (e.HasMoveInputRef = t));
  }
  static UpdateAnimInfoMoveRoleNpc(t, e) {
    var i,
      n = EntitySystem_1.EntitySystem.GetComponent(t, 163);
    n?.Valid &&
      ((e = e),
      (n = n.AnimLogicParamsSetter),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid &&
        ((i = i.InputDirectProxy),
        n.InputDirect.Equals(i) ||
          (n.InputDirect.DeepCopy(i), (e.InputDirectRef = i.ToUeVector()))),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 38))?.Valid) &&
      ((t = i.Acceleration),
      n.Acceleration.Equals(t) ||
        (n.Acceleration.DeepCopy(t), (e.AccelerationRef = t.ToUeVector())),
      (t = i.IsMoving),
      n.IsMoving !== t && ((n.IsMoving = t), (e.IsMovingRef = t)),
      (t = i.HasMoveInput),
      n.HasMoveInput !== t && ((n.HasMoveInput = t), (e.HasMoveInputRef = t)),
      (t = i.Speed),
      n.Speed !== t) &&
      ((n.Speed = t), (e.SpeedRef = t));
  }
  static TurnOnAutomaticFlightMode(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 54);
    t?.Valid && t.TurnOnAutomaticFlightMode(e);
  }
  static TurnOffAutomaticFlightMode(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 54);
    t?.Valid && t.TurnOffAutomaticFlightMode();
  }
  static get WaterTrace() {
    var t;
    return (
      TsMoveBlueprintFunctionLibrary.WaterTraceInternal ||
        (((t = UE.NewObject(UE.TraceLineElement.StaticClass())).bIsSingle = !0),
        (t.bIgnoreSelf = !0),
        t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          t,
          ColorUtils_1.ColorUtils.LinearGreen,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          t,
          ColorUtils_1.ColorUtils.LinearRed,
        ),
        (TsMoveBlueprintFunctionLibrary.WaterTraceInternal = t)),
      TsMoveBlueprintFunctionLibrary.WaterTraceInternal
    );
  }
  static get GroundTrace() {
    var t;
    return (
      TsMoveBlueprintFunctionLibrary.GroundTraceInternal ||
        (((t = UE.NewObject(UE.TraceLineElement.StaticClass())).bIsSingle = !0),
        (t.bIgnoreSelf = !0),
        t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          t,
          ColorUtils_1.ColorUtils.LinearGreen,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          t,
          ColorUtils_1.ColorUtils.LinearRed,
        ),
        (TsMoveBlueprintFunctionLibrary.GroundTraceInternal = t)),
      TsMoveBlueprintFunctionLibrary.GroundTraceInternal
    );
  }
  static SimpleSwim(t, e, i, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (!t?.Valid) return Vector_1.Vector.ZeroVector;
    var e = MathUtils_1.MathUtils.Clamp(e, 0, MAX_SIMPLE_SWIM_DELTA),
      r = TsMoveBlueprintFunctionLibrary.WaterTrace;
    (r.WorldContextObject = t.Actor),
      t.ActorUpProxy.Multiply(i, tmpVector),
      tmpVector.AdditionEqual(t.ActorLocationProxy),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, tmpVector),
      t.ActorUpProxy.Multiply(-t.ScaledHalfHeight, tmpVector),
      tmpVector.AdditionEqual(t.ActorLocationProxy),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, tmpVector);
    let o = 0;
    if (TraceElementCommon_1.TraceElementCommon.LineTrace(r, "SimpleSwim")) {
      i = TsMoveBlueprintFunctionLibrary.GroundTrace;
      (i.WorldContextObject = t.Actor),
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          r.HitResult,
          0,
          tmpVector,
        ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, tmpVector),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          i,
          t.ActorLocationProxy,
        ),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          i,
          "SimpleSwim_Ground",
        ) ||
          (tmpVector.SubtractionEqual(t.ActorLocationProxy),
          (o = MathUtils_1.MathUtils.Clamp(
            (tmpVector.DotProduct(t.ActorUpProxy) / t.ScaledHalfHeight) * 0.5 +
              0.5,
            0,
            1,
          )));
    } else {
      r = TsMoveBlueprintFunctionLibrary.GroundTrace;
      if (
        ((r.WorldContextObject = t.Actor),
        t.ActorUpProxy.Multiply(-t.ScaledHalfHeight - 2, tmpVector),
        tmpVector.AdditionEqual(t.ActorLocationProxy),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          r,
          t.ActorLocationProxy,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, tmpVector),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          r,
          "SimpleSwim_Ground",
        ))
      )
        return Vector_1.Vector.ZeroVector;
    }
    (i = t.Entity.GetComponent(38)),
      tmpVector.FromUeVector(n),
      (r = GravityUtils_1.GravityUtils.GetZnInGravity(t, tmpVector));
    let s = r;
    i?.Valid
      ? (s +=
          i.CharacterMovement.GetGravityZ() *
          e *
          (1 - o * CharacterSwimComponent_1.SWIMMING_BUOYANCY))
      : (s += 1960 * e * (1 - o * CharacterSwimComponent_1.SWIMMING_BUOYANCY));
    (n =
      ((r +
        (s *= Math.pow(CharacterSwimComponent_1.SWIMMING_DECELERATION, e))) /
        2) *
      e),
      (n = MathUtils_1.MathUtils.Clamp(
        n,
        2 * (o - 1) * t.ScaledHalfHeight,
        2 * o * t.ScaledHalfHeight,
      ));
    return (
      tmpVector.Reset(),
      GravityUtils_1.GravityUtils.AddZnInGravity(t, tmpVector, n),
      i?.Valid
        ? i.MoveCharacter(tmpVector, e, "SimpleSwim")
        : t.AddActorWorldOffset(tmpVector.ToUeVector(), "SimpleSwim", !0),
      tmpVector2.Reset(),
      GravityUtils_1.GravityUtils.AddZnInGravity(t, tmpVector2, s),
      tmpVector2.ToUeVector()
    );
  }
  static EnterRoll(t, e, i, n, r, o, s) {
    EntitySystem_1.EntitySystem.GetComponent(t, 33)?.EnterRoll(
      e,
      i,
      n,
      r,
      o,
      s,
    );
  }
  static LeaveRoll(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 33)?.LeaveRoll();
  }
}
(TsMoveBlueprintFunctionLibrary.TmpQuatInternal = Quat_1.Quat.Create()),
  (TsMoveBlueprintFunctionLibrary.WaterTraceInternal = void 0),
  (TsMoveBlueprintFunctionLibrary.GroundTraceInternal = void 0),
  (exports.default = TsMoveBlueprintFunctionLibrary);
//# sourceMappingURL=TsMoveBlueprintFunctionLibrary.js.map
