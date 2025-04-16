"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, s, h) {
    var e,
      o = arguments.length,
      r =
        o < 3
          ? i
          : null === h
            ? (h = Object.getOwnPropertyDescriptor(i, s))
            : h;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, i, s, h);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (e = t[n]) && (r = (o < 3 ? e(r) : 3 < o ? e(i, s, r) : e(i, s)) || r);
    return 3 < o && r && Object.defineProperty(i, s, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleMoveComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  VehiclePathMoveController_1 = require("../Controller/VehiclePathMoveController"),
  MIN_MOVE_SPEED = 20,
  INVALID_FORCE_SPEED = -1e8,
  cannotResponseInputTag = [-648310348, -2044964178, 1008164187, 191377386],
  splineDebugColor = new UE.LinearColor(1, 0, 0, 1);
let VehicleMoveComponent = class VehicleMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.AnimComp = void 0),
      (this.TagComponent = void 0),
      (this.AudioComp = void 0),
      (this.UeMovementMgrComp = void 0),
      (this.VehicleMovement = void 0),
      (this.UeMovementDisableHandle = 0),
      (this.AutoUpdateUeMovementTickState = !0),
      (this.IsMoving = !1),
      (this.HasMoveInput = !1),
      (this.IsSpecialMove = !1),
      (this.IsMovePath = !1),
      (this.DeltaTimeSeconds = 0),
      (this.IsStopInternal = !1),
      (this.ForceSpeed = Vector_1.Vector.Create(
        INVALID_FORCE_SPEED,
        INVALID_FORCE_SPEED,
        INVALID_FORCE_SPEED,
      )),
      (this.Speed = 0),
      (this.AimYawRate = 0),
      (this.Acceleration = Vector_1.Vector.Create()),
      (this.PreviousAimYaw = 0),
      (this.PreviousVelocity = Vector_1.Vector.Create()),
      (this.TurnRate = 1),
      (this.CanMoveWithDistanceInternal = !0),
      (this.CanMoveFromInputInternal = !0),
      (this.AdditiveTurnYaw = 0),
      (this.AdditiveTurnYawCache = 0),
      (this.AdditiveTurnDuration = 0),
      (this.AdditiveTurnElapsedTime = 0),
      (this.CannotResponseInputCount = 0),
      (this.CanResponseInputTasks = new Array()),
      (this.GravityDirectInternal = Vector_1.Vector.Create(0, 0, -1)),
      (this.GravityUpInternal = Vector_1.Vector.Create(0, 0, 1)),
      (this.IsStandardGravityInternal = !0),
      (this.DebugCurve = void 0),
      (this.IsSummoningPerform = !1),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpRotator = Rotator_1.Rotator.Create()),
      (this.TmpTrans = Transform_1.Transform.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.TmpQuat2 = Quat_1.Quat.Create()),
      (this.OnResponseInputTagsChanged = (t, i) => {
        i
          ? (0 === this.CannotResponseInputCount && (this.HasMoveInput = !1),
            ++this.CannotResponseInputCount)
          : --this.CannotResponseInputCount;
      }),
      (this.OnEnterVehicle = (t) => {
        t.IsDriver &&
          t.IsRolePassenger() &&
          ((this.AutoUpdateUeMovementTickState = !1),
          this.UeMovementDisableHandle) &&
          (this.UeMovementMgrComp.Enable(
            this.UeMovementDisableHandle,
            "进入载具主动启用移动组件Tick",
          ),
          (this.UeMovementDisableHandle = 0));
      }),
      (this.OnLeaveVehicle = (t) => {
        t.IsDriver &&
          t.IsRolePassenger() &&
          (this.AutoUpdateUeMovementTickState = !0);
      });
  }
  get CanMoveFromInput() {
    return this.CanMoveFromInputInternal;
  }
  set CanMoveFromInput(t) {
    this.CanMoveFromInputInternal = t;
  }
  get GravityDirect() {
    return this.GravityDirectInternal;
  }
  get GravityUp() {
    return this.GravityUpInternal;
  }
  get IsStandardGravity() {
    return this.IsStandardGravityInternal;
  }
  OnInit(t) {
    return (
      (this.IsStandardGravityInternal = !0),
      this.GravityDirectInternal.Set(0, 0, -1),
      this.GravityUpInternal.Set(0, 0, 1),
      !0
    );
  }
  OnStart() {
    if (
      ((this.ActorComp = this.Entity.GetComponent(231)),
      (this.AnimComp = this.Entity.GetComponent(232)),
      (this.TagComponent = this.Entity.GetComponent(203)),
      (this.AudioComp = this.Entity.GetComponent(239)),
      (this.UeMovementMgrComp = this.Entity.GetComponent(241)),
      (this.UeMovementDisableHandle =
        this.UeMovementMgrComp.Disable("载具出生时默认关闭移动组件")),
      (this.VehicleMovement = this.ActorComp.Actor.GetComponentByClass(
        UE.KuroVehicleMovementComponent.StaticClass(),
      )),
      !this.VehicleMovement)
    )
      return !1;
    if (
      (this.GravityDirectInternal.FromUeVector(
        this.VehicleMovement.Kuro_GetGravityDirect(),
      ),
      (this.IsStandardGravityInternal =
        Math.abs(this.GravityDirectInternal.Z + 1) <
        MathUtils_1.MathUtils.SmallNumber),
      this.IsStandardGravityInternal &&
        this.GravityDirectInternal.Set(0, 0, -1),
      this.GravityDirectInternal.UnaryNegation(this.GravityUpInternal),
      (this.VehicleMovement.GravityScale = 2),
      this.InitGravityDirect(),
      (this.CannotResponseInputCount = 0),
      this.TagComponent)
    )
      for (const t of cannotResponseInputTag)
        this.TagComponent.HasTag(t) && ++this.CannotResponseInputCount,
          this.CanResponseInputTasks.push(
            this.TagComponent.ListenForTagAddOrRemove(
              t,
              this.OnResponseInputTagsChanged,
            ),
          );
    return (
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenEntered,
        this.OnEnterVehicle,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenLeaved,
        this.OnLeaveVehicle,
      ),
      !0
    );
  }
  OnActivate() {
    var t = this.ActorComp.CreatureData.ComponentDataMap.get("ERc")?.ERc;
    t &&
      ControllerHolder_1.ControllerHolder.SyncSplineMoveController.SyncVehicleMoveAlongPath(
        this.Entity,
        t.dTs,
      );
  }
  OnTick(i) {
    if (
      (this.DrawDebugCurve(),
      super.OnTick(i),
      (this.CanMoveWithDistanceInternal =
        this.Entity.DistanceWithCamera <= 7e3),
      this.ActorComp &&
        ((this.DeltaTimeSeconds =
          i * MathUtils_1.MathUtils.MillisecondToSecond),
        !this.IsSpecialMove))
    ) {
      this.IsStopInternal
        ? (this.Speed = 0)
        : (this.Speed = this.ActorComp.ActorVelocityProxy.Size2D()),
        (this.IsMoving = this.Speed > MIN_MOVE_SPEED),
        this.IsMovePath ||
          this.AudioComp?.UpdateVehicleMoveSound(
            this.Speed,
            this.ActorComp.Owner,
          ),
        this.UpdateUeMovementDisableState();
      var s =
        1 < this.Entity.GetTickInterval() &&
        this.AnimComp?.Valid &&
        this.ActorComp.Owner.WasRecentlyRenderedOnScreen();
      let t = void 0;
      s && (t = this.AnimComp.GetMeshTransform()),
        this.CanResponseInput()
          ? (this.SetInfoVar(), this.CacheVar())
          : (this.HasMoveInput = !1),
        this.ActorComp.IsMoveAutonomousProxy &&
          (s && this.IsMoving && this.AnimComp.SetModelBuffer(t, i),
          this.ActorComp.Actor.AddMovementInput(
            this.ActorComp.InputDirect,
            1,
            !1,
          ));
    }
  }
  OnEnd() {
    for (const t of this.CanResponseInputTasks) t.EndTask();
    return (
      (this.CanResponseInputTasks.length = 0),
      this.StopMove(),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenEntered,
        this.OnEnterVehicle,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenLeaved,
        this.OnLeaveVehicle,
      ),
      !0
    );
  }
  SetInfoVar() {
    this.DeltaTimeSeconds > MathUtils_1.MathUtils.SmallNumber &&
      (this.Acceleration.DeepCopy(this.ActorComp.ActorVelocityProxy),
      this.Acceleration.SubtractionEqual(this.PreviousVelocity),
      this.Acceleration.DivisionEqual(this.DeltaTimeSeconds),
      (this.AimYawRate =
        Math.abs(this.ActorComp.ActorRotationProxy.Yaw - this.PreviousAimYaw) /
        this.DeltaTimeSeconds)),
      (this.HasMoveInput =
        GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(
          this.ActorComp,
          this.ActorComp.InputDirectProxy,
        ) > MathUtils_1.MathUtils.SmallNumber);
  }
  CacheVar() {
    this.PreviousVelocity.DeepCopy(this.ActorComp.ActorVelocityProxy),
      (this.PreviousAimYaw = this.ActorComp.ActorRotation.Yaw);
  }
  InitGravityDirect() {
    var t = this.Entity.GetComponent(0);
    this.SetGravityDirect(Vector_1.Vector.Create(t.GetInitGravityDirection()));
  }
  SetGravityDirect(t) {
    this.SetGravityDirectByNumber(t.X, t.Y, t.Z);
  }
  SetGravityDirectByNumber(t, i, s, h = 0) {
    (this.TmpVector.X = t),
      (this.TmpVector.Y = i),
      (this.TmpVector.Z = s),
      this.TmpVector.Normalize() &&
        !this.GravityDirectInternal.Equals(this.TmpVector) &&
        ((t =
          (Math.acos(
            Vector_1.Vector.DotProduct(
              this.GravityDirectInternal,
              this.TmpVector,
            ),
          ) /
            Math.PI) *
          500),
        Quat_1.Quat.FindBetween(
          this.GravityDirectInternal,
          this.TmpVector,
          this.TmpQuat,
        ),
        (this.IsStandardGravityInternal = MathUtils_1.MathUtils.IsNearlyEqual(
          this.TmpVector.Z,
          -1,
        )),
        this.IsStandardGravityInternal
          ? this.GravityDirectInternal.Set(0, 0, -1)
          : this.GravityDirectInternal.DeepCopy(this.TmpVector),
        this.GravityDirectInternal.UnaryNegation(this.GravityUpInternal),
        this.VehicleMovement &&
          this.VehicleMovement.Kuro_SetGravityDirect(
            this.GravityDirectInternal.ToUeVectorOld(),
          ),
        this.ActorComp.ActorUpProxy.DotProduct(this.TmpVector) >
          MathUtils_1.MathUtils.KindaSmallNumber - 1 &&
          (this.TmpQuat.RotateVector(
            Vector_1.Vector.UpVectorProxy,
            this.TmpVector,
          ),
          this.TmpQuat.Multiply(this.ActorComp.ActorQuatProxy, this.TmpQuat2),
          this.TmpQuat2.Rotator(this.TmpRotator),
          this.AnimComp
            ? this.AnimComp.SetLocationAndRotatorWithModelBuffer(
                this.ActorComp.ActorLocationProxy.ToUeVector(),
                this.TmpRotator.ToUeRotator(),
                t,
                "SetGravity",
              )
            : this.ActorComp.SetActorRotation(
                this.TmpRotator.ToUeRotator(),
                "SetGravity",
              )),
        this.TmpQuat.RotateVector(
          this.ActorComp.InputDirectProxy,
          this.TmpVector,
        ),
        this.ActorComp.SetInputDirect(this.TmpVector),
        this.TmpQuat.RotateVector(
          this.ActorComp.InputFacingProxy,
          this.TmpVector,
        ),
        this.ActorComp.SetInputFacing(this.TmpVector),
        this.ActorComp.ResetGravityRelatedCachedTime());
  }
  SetGravityDirectWithoutRotate(t) {
    this.SetGravityDirectWithoutRotateByNumber(t.X, t.Y, t.Z);
  }
  SetGravityDirectWithoutRotateByNumber(t, i, s, h = 0) {
    (this.TmpVector.X = t),
      (this.TmpVector.Y = i),
      (this.TmpVector.Z = s),
      this.TmpVector.Normalize() &&
        !this.GravityDirectInternal.Equals(this.TmpVector) &&
        ((this.IsStandardGravityInternal = MathUtils_1.MathUtils.IsNearlyEqual(
          this.TmpVector.Z,
          -1,
        )),
        this.IsStandardGravityInternal
          ? this.GravityDirectInternal.Set(0, 0, -1)
          : this.GravityDirectInternal.DeepCopy(this.TmpVector),
        this.GravityDirectInternal.UnaryNegation(this.GravityUpInternal),
        this.VehicleMovement &&
          this.VehicleMovement.Kuro_SetGravityDirect(
            this.GravityDirectInternal.ToUeVectorOld(),
          ),
        this.ActorComp.ResetGravityRelatedCachedTime());
  }
  CanResponseInput() {
    return 0 === this.CannotResponseInputCount;
  }
  SpeedScaled(t) {
    return t;
  }
  ApplyForceSpeedAndRecordSpeed() {
    this.ForceSpeed.X !== INVALID_FORCE_SPEED &&
      (this.ForceSpeed.ContainsNaN()
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Movement", 6, "ForceSpeed Nan.", [
            "V",
            this.ForceSpeed,
          ])
        : (this.VehicleMovement.Velocity = this.ForceSpeed.ToUeVectorOld()),
      this.ActorComp.ResetCachedVelocityTime(),
      (this.ForceSpeed.X = INVALID_FORCE_SPEED));
  }
  SetForceSpeed(t) {
    t.ContainsNaN() &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Movement", 6, "SetForceSpeed Contains NaN", [
        "speed",
        t,
      ]),
      this.ForceSpeed.DeepCopy(t),
      this.ActorComp &&
        (this.ActorComp.SetActorVelocity(this.ForceSpeed),
        this.ActorComp.ResetCachedVelocityTime());
  }
  EnableUeMovementTick(t) {
    this.AutoUpdateUeMovementTickState &&
      this.UeMovementDisableHandle &&
      (this.UeMovementMgrComp.Enable(this.UeMovementDisableHandle, "reason"),
      (this.UeMovementDisableHandle = 0),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Vehicle",
        50,
        "外部临时开启移动组件Tick",
        ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
        ["Reason", t],
      );
  }
  UpdateUeMovementDisableState() {
    !this.AutoUpdateUeMovementTickState ||
      this.IsSummoningPerform ||
      (this.UeMovementDisableHandle
        ? this.IsMoving &&
          (this.UeMovementMgrComp.Enable(
            this.UeMovementDisableHandle,
            "有速度自动启用移动组件Tick",
          ),
          (this.UeMovementDisableHandle = 0),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug("Vehicle", 50, "有速度自动启用移动组件Tick", [
            "PbDataId",
            this.ActorComp?.CreatureData.GetPbDataId(),
          ])
        : this.IsMoving ||
          (this.SetForceSpeed(Vector_1.Vector.ZeroVector),
          (this.UeMovementDisableHandle =
            this.UeMovementMgrComp.Disable("无速度自动关闭移动组件Tick")),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Vehicle", 50, "无速度自动关闭移动组件Tick", [
              "PbDataId",
              this.ActorComp?.CreatureData.GetPbDataId(),
            ])));
  }
  CanMove() {
    return this.CanMoveFromInputInternal && this.CanMoveWithDistanceInternal;
  }
  GetMovingSplineId() {
    return VehiclePathMoveController_1.VehiclePathMoveController.GetMovingSplineId(
      this.Entity,
    );
  }
  MoveAlongPath(i) {
    const s =
      VehiclePathMoveController_1.VehiclePathMoveController.CreateMoveTaskFromSplineId(
        this.Entity,
        i.SplineId,
      );
    var t;
    s?.IsValid() &&
      ((t = i.StartFromNearest
        ? this.FindNearestNextPoint(s.CurveInfo.SplineCurve)
        : 0),
      s.JumpToPoint(t),
      !i.ForceToFirstPoint &&
      (s.CurveInfo.SplineCurve.GetTransformAtSplineIndex(t, 1, this.TmpTrans),
      (t =
        s.CurveInfo.SplineConfig?.TransitionSpeed ||
        s.CurveInfo.SplineCurve.GetSplineLength() / s.CurveInfo.TotalTime),
      (t =
        VehiclePathMoveController_1.VehiclePathMoveController.CreateMoveToTask(
          this.Entity,
          this.TmpTrans,
          t,
        ))?.IsValid())
        ? ((t.CurveInfo.SplineId = -i.SplineId),
          (t.NeedSync = i.NeedSync ?? !0),
          (t.SimulateRotation &&= i.SimulateRotation ?? !0),
          (t.OnMoveEndHandle = (t) => {
            t
              ? (VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(
                  s,
                ),
                (this.DebugCurve = s.CurveInfo?.SplineCurve),
                i.OnArriveStartPointHandle && i.OnArriveStartPointHandle(t))
              : i.OnMoveEndHandle && i.OnMoveEndHandle(!1);
          }),
          (s.NeedSync = i.NeedSync ?? !0),
          (s.SimulateRotation = i.SimulateRotation ?? !0),
          s.EnableDynamicGravity(!!i.DynamicGravity),
          (s.OnMoveEndHandle = (t) => {
            i.OnMoveEndHandle && i.OnMoveEndHandle(t),
              (this.DebugCurve = void 0);
          }),
          VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(
            t,
          ),
          (this.DebugCurve = t.CurveInfo?.SplineCurve))
        : (VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(
            s,
          ),
          (this.DebugCurve = s.CurveInfo?.SplineCurve)));
  }
  StopMove() {
    VehiclePathMoveController_1.VehiclePathMoveController.RemoveSplineMoveTask(
      this.Entity,
    );
  }
  FindNearestNextPoint(i) {
    let s = 0,
      h = Number.MAX_VALUE;
    var e = this.ActorComp.ActorLocationProxy,
      o = Vector_1.Vector.Create(),
      r = Vector_1.Vector.Create();
    for (let t = 0; t < i.WorldPositionList.length - 1; t++) {
      o.DeepCopy(i.WorldPositionList[t]),
        r.DeepCopy(i.WorldPositionList[t + 1]),
        this.TmpVector.Set(r.X, r.Y, r.Z),
        this.TmpVector.SubtractionEqual(o);
      var n = this.TmpVector.Size();
      this.TmpVector2.Set(e.X, e.Y, e.Z),
        this.TmpVector2.SubtractionEqual(r),
        0 < this.TmpVector.DotProduct(this.TmpVector2) ||
          (this.TmpVector2.Set(e.X, e.Y, e.Z),
          this.TmpVector2.SubtractionEqual(o),
          this.TmpVector.DotProduct(this.TmpVector2) < 0) ||
          this.TmpVector.DotProduct(this.ActorComp.ActorForwardProxy) < 0 ||
          (this.TmpVector.CrossProduct(this.TmpVector2, this.TmpVector),
          (n = this.TmpVector.Size() / n) < h && ((h = n), (s = t + 1)));
    }
    return s;
  }
  DrawDebugCurve() {
    if (
      this.DebugCurve &&
      this.ActorComp?.Actor.CapsuleComponent?.bKuroMoveDebugLog
    ) {
      var i = this.DebugCurve?.GetSplineLength(),
        s = i / 100;
      for (let t = 0; t < i; t += s)
        this.DebugCurve.GetTransformAtDistanceAlongSpline(t, 1, this.TmpTrans),
          UE.KismetSystemLibrary.D_DrawDebugPoint(
            this.ActorComp.Actor,
            this.TmpTrans.GetLocation().ToUeVector(),
            10,
            splineDebugColor,
            0.1,
          );
    }
  }
};
(VehicleMoveComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(233)],
  VehicleMoveComponent,
)),
  (exports.VehicleMoveComponent = VehicleMoveComponent);
//# sourceMappingURL=VehicleMoveComponent.js.map
