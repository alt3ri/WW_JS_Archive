"use strict";
var VehicleActorComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, o) {
      var r,
        s = arguments.length,
        h =
          s < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, o);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (r = t[n]) &&
            (h = (s < 3 ? r(h) : 3 < s ? r(e, i, h) : r(e, i)) || h);
      return 3 < s && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleActorComponent = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  GameBudgetInterfaceController_1 = require("../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  JsModelManager_1 = require("../../../../Core/Model/JsModelManager"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  CombatLog_1 = require("../../../Utils/CombatLog"),
  FunctionRequestProxy_1 = require("../../Character/Common/Component/Actor/FunctionRequestProxy"),
  BaseActorComponent_1 = require("../../Common/Component/BaseActorComponent"),
  VehiclePathMoveController_1 = require("../Controller/VehiclePathMoveController"),
  TsBaseVehicle_1 = require("../TsBaseVehicle");
let VehicleActorComponent =
  (VehicleActorComponent_1 = class VehicleActorComponent extends (
    BaseActorComponent_1.BaseActorComponent
  ) {
    constructor() {
      super(...arguments),
        (this.InputComp = void 0),
        (this.VehicleMoveComp = void 0),
        (this.ShowDebug = !1),
        (this.SetRotationRequestProxy = void 0),
        (this.DefaultControllerInternal = void 0),
        (this.LastActorRotation = Rotator_1.Rotator.Create()),
        (this.SimulatedVelocity = Vector_1.Vector.Create()),
        (this.SimulatedRotYawSpeed = 0),
        (this.sFr = void 0),
        (this.StartHideDistance = 0),
        (this.CompleteHideDistance = 0),
        (this.StartDitherValue = 0),
        (this.V2r = Vector_1.Vector.Create(0, 0, 0)),
        (this.H2r = Rotator_1.Rotator.Create(0, 0, 0)),
        (this.j2r = Vector_1.Vector.Create(1, 0, 0)),
        (this.NewestInputFacingType = 0),
        (this.OverrideTurnSpeed = 0),
        (this.W2r = Vector_1.Vector.Create(0, 0, 0)),
        (this.OnActorDestroy = () => {
          this.CreatureDataInternal.GetRemoveState() ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外",
                ["CreatureData", this.CreatureDataInternal.GetCreatureDataId()],
                ["ConfigType", this.CreatureDataInternal.GetEntityConfigType()],
                ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
              ));
        });
    }
    get DefaultController() {
      return this.DefaultControllerInternal;
    }
    get Actor() {
      return this.ActorInternal;
    }
    get SkeletalMesh() {
      return this.Actor.Mesh;
    }
    GetPrimitiveComponent() {
      return this.SkeletalMesh;
    }
    get InputDirectProxy() {
      return this.V2r;
    }
    get InputDirect() {
      return this.V2r.ToUeVectorOld();
    }
    get ActorVelocityProxy() {
      return (
        this.CachedVelocityTime < Time_1.Time.Frame &&
          ((this.CachedVelocityTime = Time_1.Time.Frame),
          this.W2r.DeepCopy(this.Actor.D_GetVelocity())),
        this.W2r
      );
    }
    get ActorVelocity() {
      return this.ActorVelocityProxy.ToUeVectorOld();
    }
    get InputRotatorProxy() {
      return (
        2 === this.NewestInputFacingType &&
          (!this.VehicleMoveComp || this.VehicleMoveComp.IsStandardGravity
            ? this.H2r.Set(
                Math.asin(this.j2r.Z) * MathUtils_1.MathUtils.RadToDeg,
                MathUtils_1.MathUtils.GetAngleByVector2D(this.j2r),
                0,
              )
            : (this.VehicleMoveComp.GravityDirect.Multiply(
                -1,
                VehicleActorComponent_1.TmpVector,
              ),
              MathUtils_1.MathUtils.LookRotationForwardFirst(
                this.j2r,
                VehicleActorComponent_1.TmpVector,
                VehicleActorComponent_1.TmpQuat,
              ),
              VehicleActorComponent_1.TmpQuat.Rotator(this.H2r)),
          (this.NewestInputFacingType = 0)),
        this.H2r
      );
    }
    get InputFacingProxy() {
      var t, e;
      return (
        1 === this.NewestInputFacingType &&
          (!this.VehicleMoveComp || this.VehicleMoveComp.IsStandardGravity
            ? ((t = this.H2r.Pitch * MathUtils_1.MathUtils.DegToRad),
              (this.j2r.Z = Math.sin(t)),
              (t = Math.cos(t)),
              (e = this.H2r.Yaw * MathUtils_1.MathUtils.DegToRad),
              (this.j2r.X = Math.cos(e) * t),
              (this.j2r.Y = Math.sin(e) * t))
            : (this.H2r.Quaternion(VehicleActorComponent_1.TmpQuat),
              VehicleActorComponent_1.TmpQuat.RotateVector(
                Vector_1.Vector.ForwardVectorProxy,
                this.j2r,
              )),
          (this.NewestInputFacingType = 0)),
        this.j2r
      );
    }
    get ActorGravityDirectProxy() {
      var t;
      return (
        this.CachedGravityDirectTime < Time_1.Time.Frame &&
          ((this.CachedGravityDirectTime = Time_1.Time.Frame),
          this.VehicleMoveComp
            ? this.CachedActorGravityDirect.DeepCopy(
                this.VehicleMoveComp.GravityDirect,
              )
            : (t = this.CreatureData.GetInitGravityDirection()) &&
              this.CachedActorGravityDirect.FromConfigVector(t)),
        this.CachedActorGravityDirect
      );
    }
    OnInitData(t) {
      return (
        super.OnInitData(),
        (this.SetRotationRequestProxy =
          new FunctionRequestProxy_1.FunctionRequestProxy()),
        !!this.InitCreatureData()
      );
    }
    OnInit(t) {
      super.OnInit();
      var e = this.CreatureDataInternal.GetPbModelConfig()?.ModelId;
      if (!e)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              3,
              "[SceneItemActorComponent.OnInit] 加载actor失败，无法找到modelId",
              ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
              ["PbDataId", this.CreatureData.GetPbDataId()],
            ),
          !1
        );
      if (
        ((this.ActorInternal = this.LoadSkeletalMeshAndAnimBlueprint(e)),
        !this.ActorInternal || !this.ActorInternal.IsValid())
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              3,
              "[VehicleActorComponent.OnInit] 加载actor失败。",
              ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
              ["PbDataId", this.CreatureData.GetPbDataId()],
            ),
          !1
        );
      if (!this.ActorInternal.IsA(UE.TsBaseVehicle_C.StaticClass()))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              6,
              "[VehicleActorComponent.OnInit] Actor不是TsBaseVehicle",
              ["Name", this.ActorInternal.GetName()],
              ["Class", this.ActorInternal.GetClass().GetName()],
              ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
              ["ModelId", e],
              ["PbDataId", this.CreatureData.GetPbDataId()],
            ),
          !1
        );
      this.ActorInternal &&
        this.ActorInternal.OnDestroyed.Add(this.OnActorDestroy);
      e = this.ActorInternal;
      return (
        (e.VehicleActorComponent = this),
        e.SetEntityId(this.Entity.Id),
        this.InitDefaultController(this.ActorInternal),
        this.SetInputFacing(this.ActorForwardProxy),
        this.SetActorVisible(!1, "[VehicleActorComponent.OnInit] 默认隐藏"),
        this.SetCollisionEnable(
          !1,
          "[VehicleActorComponent.OnInit] 默认关闭碰撞",
        ),
        this.SetTickEnable(!1, "[VehicleActorComponent.OnInit] 默认关闭Tick"),
        this.cFr(),
        e.CharRenderingComponent.Init(e.RenderType),
        this.ActorInternal.SetPrimitiveBlueprintTypeName(
          new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId),
        ),
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
          (void 0 !== this.Entity.GameBudgetManagedToken
            ? cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(
                this.Entity.GameBudgetConfig.GroupName,
                this.Entity.GameBudgetManagedToken,
                this.ActorInternal,
              )
            : this.Entity.RegisterToGameBudgetController(this.ActorInternal)),
        JsModelManager_1.JsModelManager.UpdateEntityActor(
          this.Entity.Id,
          this.ActorInternal,
        ),
        !0
      );
    }
    OnStart() {
      return (
        !!super.OnStart() &&
        ((this.InputComp = this.Entity.GetComponent(237)),
        (this.VehicleMoveComp = this.Entity.GetComponent(233)),
        (this.DebugMovementComp = this.Entity.GetComponent(30)),
        !0)
      );
    }
    OnActivate() {
      super.OnActivate(),
        this.LastActorRotation.DeepCopy(this.ActorRotationProxy),
        this.SetActorVisible(!0, "[VehicleActorComponent.OnActivate] Visible"),
        this.SetCollisionEnable(
          !0,
          "[VehicleActorComponent.OnActivate] Visible",
        ),
        this.SetTickEnable(!0, "[VehicleActorComponent.OnActivate] Visible"),
        this.Actor.VehicleMovementComponent.InitVehicleShapes(),
        ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(
          this.CreatureDataInternal,
          this.ActorInternal,
        );
      var t =
        VehiclePathMoveController_1.VehiclePathMoveController.GetEntitySplineMoveInfo(
          this.Entity,
        );
      this.SetAutonomous(
        !ModelManager_1.ModelManager.GameModeModel.IsMulti || !!t,
      );
    }
    OnEnd() {
      return (
        this.ActorInternal?.IsValid() &&
          (this.ActorInternal.OnDestroyed.Remove(this.OnActorDestroy),
          this.ActorInternal instanceof TsBaseVehicle_1.default &&
            (this.ActorInternal.DitherEffectController?.Clear(),
            (this.ActorInternal.DitherEffectController = void 0)),
          this.Actor.PlatformActor?.IsValid()) &&
          this.Actor.PlatformActor.K2_DetachFromActor(),
        super.OnEnd()
      );
    }
    OnClear() {
      return super.OnClear();
    }
    OnDisable(t) {
      this.OnSetActorActive(!1, t);
    }
    OnEnable() {
      this.OnSetActorActive(!0), this.ResetAllCachedTime();
    }
    OnChangeTimeDilation(t) {
      var e = this.Entity.GetComponent(120)?.CurrentTimeScale ?? 1;
      this.ActorInternal.CustomTimeDilation = t * e;
    }
    SetMoveAutonomous(t, e = "") {
      CombatLog_1.CombatLog.Info("Control", this.Entity, "设置移动主控", [
        e,
        t,
      ]),
        super.SetMoveAutonomous(t);
      e = this.Entity.GetComponent(232);
      e &&
        (e.MainAnimInstance?.SetStateMachineNetMode(!t),
        e.SpecialAnimInstance?.SetStateMachineNetMode(!t));
    }
    LoadSkeletalMeshAndAnimBlueprint(t) {
      var e = void 0,
        i =
          (this.CreatureDataInternal.SetModelConfig(t),
          this.CreatureDataInternal),
        o = i.D_GetTransform(),
        r = this.CreatureDataInternal.GetModelConfig();
      if (r) {
        if (
          (e = ActorUtils_1.ActorUtils.LoadActorByModelConfig(r, o))?.IsValid()
        )
          return (
            ActorUtils_1.ActorUtils.LoadAndChangeMeshAnim(
              e.Mesh,
              r.网格体,
              r.动画蓝图,
            ),
            GlobalData_1.GlobalData.IsPlayInEditor &&
              (o = this.CreatureDataInternal.GetPbDataId()) &&
              e.Tags.Add(new UE.FName("PbDataId:" + o)),
            e
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            7,
            "[VehicleActorComponent.OnInit] 缺少ModelConfig配置",
            ["CreatureDataId", i.GetCreatureDataId()],
            ["ModelId", t],
          );
    }
    cFr() {
      var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
          this.Actor.GetClass(),
        ),
        t = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t),
        t =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
            t,
          )?.PartHitEffect.ToAssetPathName();
      let e = void 0 !== t && 0 < t.length && "None" !== t;
      e &&
        ResourceSystem_1.ResourceSystem.LoadAsync(
          t,
          UE.BP_PartHitEffect_C,
          (t) => {
            this.Actor?.IsValid() &&
              ((this.sFr = t), (e = this.sFr?.IsValid() ?? !1)) &&
              this.Actor &&
              ((this.StartHideDistance = this.sFr.StartHideDistance),
              (this.CompleteHideDistance = this.sFr.CompleteHideDistance),
              (this.StartDitherValue = this.sFr.StartDitherValue));
          },
        );
    }
    SetInputRotator(t) {
      this.SetInputRotatorByNumber(t.Pitch, t.Yaw, t.Roll);
    }
    SetInputRotatorByNumber(t, e, i) {
      (this.H2r.Pitch = t),
        (this.H2r.Yaw = e),
        (this.H2r.Roll = i),
        (this.NewestInputFacingType = 1);
    }
    SetInputDirect(t, e = !1) {
      MathUtils_1.MathUtils.IsValidVector(t)
        ? e
          ? !this.VehicleMoveComp || this.VehicleMoveComp.IsStandardGravity
            ? (this.V2r.DeepCopy(t), (this.V2r.Z = 0))
            : (VehicleActorComponent_1.TmpVector.DeepCopy(t),
              Vector_1.Vector.VectorPlaneProject(
                VehicleActorComponent_1.TmpVector,
                this.VehicleMoveComp.GravityDirect,
                this.V2r,
              ))
          : this.V2r.DeepCopy(t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            6,
            "SetInputDirect has NaN",
            ["x", t.X],
            ["y", t.Y],
            ["z", t.Z],
          );
    }
    SetInputDirectByNumber(t, e, i) {
      MathUtils_1.MathUtils.IsValidNumbers(t, e, i)
        ? ((this.V2r.X = t), (this.V2r.Y = e), (this.V2r.Z = i))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            6,
            "SetInputDirect has NaN",
            ["x", t],
            ["y", e],
            ["z", i],
          );
    }
    SetInputFacing(t, e = !1) {
      this.j2r.DeepCopy(t),
        e &&
          (!this.VehicleMoveComp || this.VehicleMoveComp.IsStandardGravity
            ? (this.j2r.Z = 0)
            : (Vector_1.Vector.VectorPlaneProject(
                this.j2r,
                this.VehicleMoveComp.GravityDirect,
                VehicleActorComponent_1.TmpVector,
              ),
              this.j2r.DeepCopy(VehicleActorComponent_1.TmpVector))),
        this.j2r.Normalize() || this.j2r.DeepCopy(this.ActorForwardProxy),
        (this.NewestInputFacingType = 2);
    }
    SetOverrideTurnSpeed(t) {
      this.OverrideTurnSpeed = t;
    }
    ClearInput() {
      this.SetInputDirect(Vector_1.Vector.ZeroVector),
        this.SetInputFacing(this.ActorForwardProxy),
        this.SetOverrideTurnSpeed(0);
    }
    InitDefaultController(t) {
      (this.DefaultControllerInternal = t.GetController()),
        this.DefaultController
          ? (this.DefaultController instanceof UE.AIController ||
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Character",
                  57,
                  "Character初始化的默认Controller基类为非AiController",
                  [
                    "CreatureData",
                    this.CreatureDataInternal.GetCreatureDataId(),
                  ],
                  [
                    "ConfigType",
                    this.CreatureDataInternal.GetEntityConfigType(),
                  ],
                  ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
                  ["DefaultController", this.DefaultController],
                )),
            this.DefaultController instanceof UE.PlayerController &&
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Character",
                  57,
                  "Character初始化的默认Controller基类为PlayerController,下场的人将会导致Movement不执行",
                  [
                    "CreatureData",
                    this.CreatureDataInternal.GetCreatureDataId(),
                  ],
                  [
                    "ConfigType",
                    this.CreatureDataInternal.GetEntityConfigType(),
                  ],
                  ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
                ),
              this.DefaultController.Pawn === t &&
                this.DefaultController.Pawn.DetachFromControllerPendingDestroy(),
              (this.DefaultControllerInternal = void 0),
              this.CreateDefaultController(t)))
          : this.CreateDefaultController(t);
    }
    CreateDefaultController(t) {
      (t.AIControllerClass = UE.KuroAIController.StaticClass()),
        t.SpawnDefaultController(),
        (this.DefaultControllerInternal = t.GetController());
    }
    RestoreDefaultController() {
      this.DefaultController ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Vehicle",
            57,
            "[VehicleActorComponent.RestoreDefaultController] 没有DefaultController,将导致这个实体部分功能失效比如移动,查看OnStart 有无正常初始化DefaultController",
            ["Id", this.Entity.Id],
          )),
        this.DefaultController.Possess(this.Actor);
    }
    OnTeleport() {
      this.LastActorLocation.DeepCopy(this.ActorLocationProxy),
        this.LastActorRotation.DeepCopy(this.ActorRotationProxy);
    }
    SetActorLocationNoTeleport(t, e = "unknown", i = !0) {
      if (!MathUtils_1.MathUtils.IsValidVector(t))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "SetActorLocation的value无效",
              ["value", t],
              ["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
            ),
          !1
        );
      let o = !1;
      return (
        this.ActorInternal?.IsValid() &&
          (this.CachedDesiredActorLocation.FromUeVector(t),
          (this.IsChangingLocation = !0),
          (o = this.ActorInternal.D_K2_SetActorLocation(t, i, void 0, !0)),
          (this.IsChangingLocation = !1),
          this.CheckIsForbidSettingLocAndRot(!0),
          this.DebugMovementComp) &&
          this.DebugMovementComp.MarkDebugRecord(e + ".SetActorLocation", 1),
        this.ResetLocationCachedTime(),
        this.ActorInternal?.IsValid() &&
          ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Test",
            57,
            "[SetActorLocation]",
            ["location:", t],
            ["owner", this?.Owner.GetName()],
          ),
        o
      );
    }
    SetActorRotation(t, e, i = !1) {
      return MathUtils_1.MathUtils.IsValidRotator(t)
        ? ((e = super.SetActorRotation(t, e, i)),
          this.CachedActorRotation.DeepCopy(t),
          (this.CachedRotationTime = Time_1.Time.Frame),
          this.CachedActorRotation.Quaternion(this.CachedActorQuat),
          e)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 30, "SetActorRotation NaN"),
          !1);
    }
    SetActorRotationWithPriority(t, e, i, o = !1, r = !1) {
      var s = new FunctionRequestProxy_1.FunctionRequestWithPriority();
      return (
        (s.ModuleName = e),
        (s.Priority = i),
        !!this.SetRotationRequestProxy.DecideCall(s) &&
          (this.ShowDebug &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              57,
              "[CharacterActorComponent.SetActorRotationWithPriority] 修改Rotation",
              ["EntityId", this.Entity.Id],
              ["module", e],
              ["rotation", t],
              ["oldRotation", this.ActorRotationProxy],
            ),
          o &&
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.RequestClearMeshRotationBuffer,
            ),
          this.SetActorRotation(t, e, r),
          !0)
      );
    }
    SetActorLocationAndRotation(t, e, i, o = !1, r = void 0) {
      let s = !1;
      var h;
      return MathUtils_1.MathUtils.IsValidVector(t) &&
        MathUtils_1.MathUtils.IsValidRotator(e)
        ? ((s =
            !r ||
            (((h =
              new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName =
              i),
            (h.Priority = r),
            this.SetRotationRequestProxy.DecideCall(h))
              ? super.SetActorLocationAndRotation(t, e, i, o)
              : super.SetActorLocation(t, i, o)),
          this.CachedActorRotation.DeepCopy(e),
          (this.CachedRotationTime = Time_1.Time.Frame),
          this.CachedActorRotation.Quaternion(this.CachedActorQuat),
          this.OnTeleport(),
          s)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 30, "SetActorLocationAndRotation NaN"),
          !1);
    }
    SetActorTransform(t, e, i = !0, o = void 0) {
      var r;
      return (
        o &&
          (((r =
            new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName =
            e),
          (r.Priority = o),
          this.SetRotationRequestProxy.DecideCall(r) ||
            t.SetRotation(this.ActorRotation.Quaternion())),
        super.SetActorTransform(t, e, i)
      );
    }
    SetActorTransformExceptMesh(t, e, i = !0, o) {
      return (
        this.CachedDesiredActorLocation.FromUeVector(t.GetLocation()),
        (this.IsChangingLocation = !0),
        (t = this.Actor.SetActorTransformExceptSkelMesh(t, i, void 0, !0, !0)),
        (this.IsChangingLocation = !1),
        this.CheckIsForbidSettingLocAndRot(!0, !0),
        this.DebugMovementComp &&
          this.DebugMovementComp.MarkDebugRecord(
            e + ".SetActorTransformExceptMesh",
            1,
          ),
        this.ResetTransformCachedTime(),
        this.OnTeleport(),
        t
      );
    }
    SetActorLocationAndRotationExceptMesh(t, e, i, o = !0, r) {
      return (
        this.CachedDesiredActorLocation.FromUeVector(t),
        (this.IsChangingLocation = !0),
        (t = this.Actor.SetActorLocationAndRotationExceptSkelMesh(
          t,
          e,
          o,
          void 0,
          !0,
          !0,
        )),
        (this.IsChangingLocation = !1),
        this.CheckIsForbidSettingLocAndRot(!0, !0),
        this.DebugMovementComp &&
          this.DebugMovementComp.MarkDebugRecord(
            i + ".SetActorLocationAndRotationExceptMesh",
            1,
          ),
        this.ResetTransformCachedTime(),
        t
      );
    }
    SetActorVelocity(t) {
      var e;
      this.Actor.RootComponent &&
        (MathUtils_1.MathUtils.IsValidVector(t)
          ? ((e = t.ToUeVectorOld()),
            (this.Actor.RootComponent.ComponentVelocity = e),
            this.Actor.VehicleMovementComponent &&
              (this.Actor.VehicleMovementComponent.Velocity = e),
            this.W2r.DeepCopy(t))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "Set Invalid Velocity", ["v", t]));
    }
  });
(VehicleActorComponent.TmpVector = Vector_1.Vector.Create(0, 0, 0)),
  (VehicleActorComponent.TmpQuat = Quat_1.Quat.Create()),
  (VehicleActorComponent = VehicleActorComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(231)],
      VehicleActorComponent,
    )),
  (exports.VehicleActorComponent = VehicleActorComponent);
//# sourceMappingURL=VehicleActorComponent.js.map
