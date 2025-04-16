"use strict";
var CharacterActorComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var r,
        o = arguments.length,
        h =
          o < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (r = t[a]) &&
            (h = (o < 3 ? r(h) : 3 < o ? r(e, i, h) : r(e, i)) || h);
      return 3 < o && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterActorComponent =
    exports.LockOnConfig =
    exports.LockOnPart =
    exports.FIX_SPAWN_TRACE_HEIGHT =
      void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  JsModelManager_1 = require("../../../../../Core/Model/JsModelManager"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  CollisionUtils_1 = require("../../../../../Core/Utils/CollisionUtils"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RenderConfig_1 = require("../../../../Render/Config/RenderConfig"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  AoiController_1 = require("../../../../World/Controller/AoiController"),
  BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
  AimPartUtils_1 = require("../../../Common/AimPartUtils"),
  BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent"),
  RoleTriggerController_1 = require("../../Role/RoleTriggerController"),
  FunctionRequestProxy_1 = require("./Actor/FunctionRequestProxy"),
  BaseCharacterComponent_1 = require("./BaseCharacterComponent"),
  CharacterLockOnComponent_1 = require("./LockOn/CharacterLockOnComponent"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  INIT_LOCATION_KEY = "InitLocation",
  MAX_NO_ROTATER_ANGLE = 10,
  PHYSIC_STREAMING_CHECK_PERIOD = 500,
  PHYSIC_STREAMING_CHECK_RANGE = 1e3,
  oldLockOnPartNames =
    ((exports.FIX_SPAWN_TRACE_HEIGHT = -60),
    [
      new UE.FName("ViceAimingCase0"),
      new UE.FName("ViceAimingCase1"),
      new UE.FName("ViceAimingCase2"),
      new UE.FName("ViceAimingCase3"),
      new UE.FName("ViceAimingCase4"),
      new UE.FName("ViceAimingCase5"),
      new UE.FName("ViceAimingCase6"),
      new UE.FName("ViceAimingCase7"),
      new UE.FName("ViceAimingCase8"),
      new UE.FName("ViceAimingCase9"),
    ]);
class LockOnPart {
  constructor(t) {
    (this.BoneName = FNameUtil_1.FNameUtil.NONE),
      (this.BoneNameString = ""),
      (this.SoftLockValid = !0),
      (this.HardLockValid = !0),
      (this.AimPartBoneName = ""),
      (this.EnablePartName = ""),
      t instanceof UE.SLockOnPart
        ? ((this.BoneNameString = t.BoneName),
          (this.BoneName = new UE.FName(this.BoneNameString)),
          (this.SoftLockValid = t.SoftLockValid),
          (this.HardLockValid = t.HardLockValid),
          (this.AimPartBoneName = t.AimPartBoneName),
          (this.EnablePartName = t.EnablePartName))
        : ((this.BoneNameString = t.toString()),
          (this.BoneName = t),
          (this.SoftLockValid = !0),
          (this.HardLockValid = !0),
          (this.AimPartBoneName = this.BoneNameString),
          (this.EnablePartName = ""));
  }
}
exports.LockOnPart = LockOnPart;
class LockOnConfig {
  constructor(t) {
    (this.IsOpened = !1),
      (this.Distance = 0),
      (this.UpDistance = 0),
      (this.DownDistance = 0),
      (this.IsOpened = t.IsOpened),
      (this.Distance = t.Distance),
      (this.UpDistance = t.UpDistance),
      (this.DownDistance = t.DownDistance);
  }
}
exports.LockOnConfig = LockOnConfig;
let CharacterActorComponent =
  (CharacterActorComponent_1 = class CharacterActorComponent extends (
    BaseCharacterComponent_1.BaseCharacterComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Oea = void 0),
        (this.V2r = Vector_1.Vector.Create(0, 0, 0)),
        (this.H2r = Rotator_1.Rotator.Create(0, 0, 0)),
        (this.j2r = Vector_1.Vector.Create(1, 0, 0)),
        (this.UseControllerRotation = !1),
        (this.NewestInputFacingType = 0),
        (this.OverrideTurnSpeed = 0),
        (this.DisableKey = void 0),
        (this.W2r = Vector_1.Vector.Create(0, 0, 0)),
        (this.IsRoleAndCtrlByMe = !1),
        (this.IsSummonsAndCtrlByMe = !1),
        (this.Q2r = Vector_1.Vector.Create(0, 0, 0)),
        (this.X2r = !0),
        (this.$2r = !1),
        (this.Y2r = !1),
        (this.J2r = 0),
        (this.z2r = !0),
        (this.rDn = 3),
        (this.NNn = void 0),
        (this.poa = void 0),
        (this.kNn = !1),
        (this.Lz = Vector_1.Vector.Create()),
        (this.ShowDebug = !1),
        (this.Z2r = void 0),
        (this.IsPartHitInternal = !1),
        (this.eFr = !1),
        (this.NeedFixBornLocation = !0),
        (this.ReplaceEffectMap = new Map()),
        (this.ReplaceMontageMap = new Map()),
        (this.v9e = () => {
          !this.CreatureDataInternal ||
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
        }),
        (this.iFr = () => {
          !this.eFr &&
            this.NeedFixBornLocation &&
            ((this.eFr = !0), this.oFr());
        }),
        (this.rFr = new Map()),
        (this.nFr = new Map()),
        (this.sFr = void 0),
        (this.AimParts = new Map()),
        (this.LockOnParts = new Map()),
        (this.LockOnConfig = void 0),
        (this.StartHideDistance = 0),
        (this.CompleteHideDistance = 0),
        (this.StartDitherValue = 0),
        (this.aFr = new Map()),
        (this.nDn = [!1, 0]),
        (this.DisableMeshCollisionEnabledHandle = void 0),
        (this.hFr = void 0),
        (this.DisableMeshCollisionObjectTypeHandle = void 0),
        (this.MeshHandleForCollisionType = void 0),
        (this._L1 = () => {
          this.uL1();
        }),
        (this.FNn = (t) => {
          1 === t && this.kNn
            ? (this.Entity.UnregisterFromGameBudgetController(),
              this.VNn(this.ActorLocation))
            : 4 === t &&
              this.NNn &&
              (TimerSystem_1.TimerSystem.Remove(this.NNn),
              (this.NNn = void 0),
              this.kNn ? this.dFr() : this.HNn());
        });
    }
    get EnableVoxelDetection() {
      return this.z2r;
    }
    SetEnableVoxelDetection(t, e) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          4,
          "设置是否检测体素",
          ["", t],
          ["Reason", e],
        ),
        (this.z2r = t);
    }
    get IsBoss() {
      return this.$2r;
    }
    get InputDirectProxy() {
      return this.V2r;
    }
    get InputDirect() {
      return this.V2r.ToUeVector();
    }
    get InputRotatorProxy() {
      return (
        2 === this.NewestInputFacingType &&
          (!this.MoveComp || this.MoveComp.IsStandardGravity
            ? this.H2r.Set(
                Math.asin(this.j2r.Z) * MathUtils_1.MathUtils.RadToDeg,
                MathUtils_1.MathUtils.GetAngleByVector2D(this.j2r),
                0,
              )
            : (this.MoveComp.GravityDirect.Multiply(
                -1,
                CharacterActorComponent_1.Lz,
              ),
              MathUtils_1.MathUtils.LookRotationForwardFirst(
                this.j2r,
                CharacterActorComponent_1.Lz,
                CharacterActorComponent_1.az,
              ),
              CharacterActorComponent_1.az.Rotator(this.H2r)),
          (this.NewestInputFacingType = 0)),
        this.H2r
      );
    }
    get InputFacingProxy() {
      var t, e;
      return (
        1 === this.NewestInputFacingType &&
          (!this.MoveComp || this.MoveComp.IsStandardGravity
            ? ((t = this.H2r.Pitch * MathUtils_1.MathUtils.DegToRad),
              (this.j2r.Z = Math.sin(t)),
              (t = Math.cos(t)),
              (e = this.H2r.Yaw * MathUtils_1.MathUtils.DegToRad),
              (this.j2r.X = Math.cos(e) * t),
              (this.j2r.Y = Math.sin(e) * t))
            : (this.H2r.Quaternion(CharacterActorComponent_1.az),
              CharacterActorComponent_1.az.RotateVector(
                Vector_1.Vector.ForwardVectorProxy,
                this.j2r,
              )),
          (this.NewestInputFacingType = 0)),
        this.j2r
      );
    }
    HasMesh() {
      return !!this.SkeletalMesh?.SkeletalMesh;
    }
    get IsPartHit() {
      return this.IsPartHitInternal;
    }
    get DefaultController() {
      return this.Oea;
    }
    SetInputDirect(t, e = !1) {
      MathUtils_1.MathUtils.IsValidVector(t)
        ? e
          ? !this.MoveComp || this.MoveComp.IsStandardGravity
            ? (this.V2r.DeepCopy(t), (this.V2r.Z = 0))
            : (CharacterActorComponent_1.Lz.DeepCopy(t),
              Vector_1.Vector.VectorPlaneProject(
                CharacterActorComponent_1.Lz,
                this.MoveComp.GravityDirect,
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
    SetInputRotator(t) {
      this.SetInputRotatorByNumber(t.Pitch, t.Yaw, t.Roll);
    }
    SetInputRotatorByNumber(t, e, i) {
      (this.H2r.Pitch = t),
        (this.H2r.Yaw = e),
        (this.H2r.Roll = i),
        (this.NewestInputFacingType = 1);
    }
    SetInputFacing(t, e = !1) {
      this.j2r.DeepCopy(t),
        e &&
          (!this.MoveComp || this.MoveComp.IsStandardGravity
            ? (this.j2r.Z = 0)
            : (Vector_1.Vector.VectorPlaneProject(
                this.j2r,
                this.MoveComp.GravityDirect,
                CharacterActorComponent_1.Lz,
              ),
              this.j2r.DeepCopy(CharacterActorComponent_1.Lz))),
        this.j2r.Normalize() || this.j2r.DeepCopy(this.ActorForwardProxy),
        (this.NewestInputFacingType = 2);
    }
    SetOverrideTurnSpeed(t) {
      this.OverrideTurnSpeed = t;
    }
    OnInitData() {
      return (
        super.OnInitData(),
        (this.Z2r = new FunctionRequestProxy_1.FunctionRequestProxy()),
        (this.DisableMeshCollisionEnabledHandle =
          new BaseActorComponent_1.DisableEntityHandle(
            "SetMeshCollisionEnabled",
          )),
        (this.DisableMeshCollisionObjectTypeHandle =
          new BaseActorComponent_1.DisableEntityHandle(
            "SetMeshCollisionObjectType",
          )),
        !!this.InitCreatureData()
      );
    }
    static m6(t) {
      this.d6 || (this.d6 = new Map());
      let e = this.d6.get(t);
      return e || ((e = Stats_1.Stat.Create(t)), this.d6.set(t, e)), e;
    }
    OnInit() {
      var t = Stats_1.Stat.Enable
          ? CharacterActorComponent_1.m6("CharacterActorComponent.SuperInit")
          : void 0,
        t =
          (t?.Start(),
          super.OnInit(),
          t?.Stop(),
          (this.EntityType = this.CreatureData.GetEntityType()),
          (this.SubEntityType = this.CreatureData.GetSubEntityType()),
          Stats_1.Stat.Enable
            ? CharacterActorComponent_1.m6(
                "CharacterActorComponent.GetModelConfig",
              )
            : void 0),
        e = (t?.Start(), this.CreatureDataInternal.GetModelId()),
        t =
          (t?.Stop(),
          Stats_1.Stat.Enable
            ? CharacterActorComponent_1.m6(
                "CharacterActorComponent.InitActorNew",
              )
            : void 0),
        i = (t?.Start(), this.InitActorNew(e));
      if ((t?.Stop(), !i || !UE.KismetSystemLibrary.IsValid(i)))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              3,
              "[CharacterActorComponent.OnInit] 加载actor失败。",
              ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
              ["ModelId", e],
              ["PbDataId", this.CreatureData.GetPbDataId()],
            ),
          !1
        );
      if (!i.IsA(UE.TsBaseCharacter_C.StaticClass()))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              6,
              "[CharacterActorComponent.OnInit] Actor不是TsBaseCharacter",
              ["Name", i.GetName()],
              ["Class", i.GetClass().GetName()],
              ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
              ["ModelId", e],
              ["PbDataId", this.CreatureData.GetPbDataId()],
            ),
          !1
        );
      var s = i,
        t =
          (s.SetPrimitiveBlueprintTypeName(
            new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId),
          ),
          this.SetCamp(s),
          (s.CharacterActorComponent = this),
          s.SetEntityId(this.Entity.Id),
          Stats_1.Stat.Enable
            ? CharacterActorComponent_1.m6(
                "CharacterActorComponent.InitDefaultController",
              )
            : void 0),
        t =
          (t?.Start(),
          this.InitDefaultController(i),
          t?.Stop(),
          Stats_1.Stat.Enable
            ? CharacterActorComponent_1.m6("CharacterActorComponent.InitOther")
            : void 0),
        r =
          (t?.Start(),
          (this.ActorInternal = i),
          this.ActorInternal.OnDestroyed.Add(this.v9e),
          (this.IsRoleAndCtrlByMe = !1),
          s.Mesh);
      switch (this.EntityType) {
        case Protocol_1.Aki.Protocol.kks.Proto_Player:
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
          this.CreatureDataInternal.GetPlayerId()
            ? ((s.RenderType = 0), (this.IsRoleAndCtrlByMe = !0))
            : (s.RenderType = 1);
          break;
        case Protocol_1.Aki.Protocol.kks.Proto_Npc:
          s.RenderType = 3;
          var o = this.Actor.K2_GetComponentsByClass(
            UE.SkeletalMeshComponent.StaticClass(),
          );
          for (let t = 0; t < o.Num(); t++) {
            var h = o.Get(t);
            h.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(!0),
              h.SetSkeletalMeshScreenSizeCullRatio(0.001);
          }
          break;
        case Protocol_1.Aki.Protocol.kks.Proto_Monster:
          (s.RenderType = 2),
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
              this.CreatureDataInternal.GetSummonerPlayerId() &&
              (this.IsSummonsAndCtrlByMe = !0),
            !r ||
            (0 !== this.CreatureData.GetBaseInfo()?.Category.MonsterMatchType &&
              611000008 !== this.CreatureData.GetPbDataId() &&
              611000009 !== this.CreatureData.GetPbDataId() &&
              611000010 !== this.CreatureData.GetPbDataId())
              ? r ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Character",
                    24,
                    "[CharacterActorComponent.OnInit] Monster Actor.Mesh不是SkeletalMeshComponent",
                    ["Name", i.GetName()],
                    [
                      "CreatureDataId",
                      this.CreatureDataInternal.GetCreatureDataId(),
                    ],
                    ["ModelId", e],
                  ))
              : (r.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(!0),
                r.SetSkeletalMeshScreenSizeCullRatio(0.004));
          break;
        case Protocol_1.Aki.Protocol.kks.Proto_Vision:
          (s.RenderType = 4),
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
              this.CreatureDataInternal.GetSummonerPlayerId() &&
              (this.IsSummonsAndCtrlByMe = !0);
          break;
        case Protocol_1.Aki.Protocol.kks.Proto_Animal:
          r
            ? (r.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(!0),
              r.SetSkeletalMeshScreenSizeCullRatio(0.005))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                24,
                "[CharacterActorComponent.OnInit] Animal Actor.Mesh不是SkeletalMeshComponent",
                ["Name", i.GetName()],
                [
                  "CreatureDataId",
                  this.CreatureDataInternal.GetCreatureDataId(),
                ],
                ["ModelId", e],
              );
          break;
        default:
          s.RenderType = 7;
      }
      this.SetActorVisible(!1, "[CharacterActorComponent.OnInit] 默认隐藏"),
        this.SetCollisionEnable(
          !1,
          "[CharacterActorComponent.OnInit] 默认关闭碰撞",
        ),
        this.SetTickEnable(!1, "[CharacterActorComponent.OnInit] 默认关闭Tick"),
        this.Actor.CharacterMovement?.SetKuroOnlyTickOutside(!0),
        (s.FightManager = GlobalData_1.GlobalData.BpFightManager),
        s.CharRenderingComponent.Init(s.RenderType),
        3 === s.RenderType &&
          s.CharRenderingComponent.UpdateNpcDitherComponent(),
        (s.AutoPossessAI = 3),
        this.SetInputFacing(this.ActorForwardProxy);
      var a = this.CreatureDataInternal.GetInitLocation();
      return (
        a ? this.SetInitLocation(a) : this.SetInitLocation(this.ActorLocation),
        this.InitSizeInternal(),
        t?.Stop(),
        !0
      );
    }
    GetReplaceEffect(t) {
      return this.ReplaceEffectMap.get(t);
    }
    SetReplaceEffect(t) {
      this.ReplaceEffectMap = t;
    }
    GetReplaceMontage(t) {
      return this.ReplaceMontageMap.get(t);
    }
    SetReplaceMontage(t) {
      this.ReplaceMontageMap = t;
    }
    InitDefaultController(t) {
      (this.Oea = t.GetController()),
        this.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Player &&
        this.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Vision &&
        this.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Npc
          ? this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Animal &&
            this.SetDefaultMovementMode(t)
          : this.DefaultController
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
                (this.Oea = void 0),
                this.CreateDefaultController(t)))
            : this.CreateDefaultController(t);
    }
    SetDefaultMovementMode(t) {
      t.CharacterMovement.SetDefaultMovementMode();
    }
    CreateDefaultController(t) {
      (t.AIControllerClass = UE.KuroAIController.StaticClass()),
        t.SpawnDefaultController(),
        (this.Oea = t.GetController());
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
    SetActorRotationWithPriority(t, e, i, s = !1, r = !1) {
      var o = new FunctionRequestProxy_1.FunctionRequestWithPriority();
      return (
        (o.ModuleName = e),
        (o.Priority = i),
        !!this.Z2r.DecideCall(o) &&
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
          s &&
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.RequestClearMeshRotationBuffer,
            ),
          this.SetActorRotation(t, e, r),
          !0)
      );
    }
    SetActorLocation(t, e, i = !0) {
      return (
        this.IsRoleAndCtrlByMe &&
          (CharacterActorComponent_1.Lz.FromUeVector(t),
          CharacterActorComponent_1.Lz.SubtractionEqual(
            this.ActorLocationProxy,
          ),
          Math.abs(CharacterActorComponent_1.Lz.X) <
            MathUtils_1.MathUtils.SmallNumber) &&
          Math.abs(CharacterActorComponent_1.Lz.Y) <
            MathUtils_1.MathUtils.SmallNumber &&
          Math.abs(CharacterActorComponent_1.Lz.Z - 50) <
            MathUtils_1.MathUtils.SmallNumber &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            6,
            "向上移动了50厘米",
            ["Actor", this.Actor.GetName()],
            ["NewLocation", t],
          ),
        super.SetActorLocation(t, e, i)
      );
    }
    TeleportTo(t, e, i) {
      return (
        this.IsRoleAndCtrlByMe &&
          (CharacterActorComponent_1.Lz.FromUeVector(t),
          CharacterActorComponent_1.Lz.SubtractionEqual(
            this.ActorLocationProxy,
          ),
          Math.abs(CharacterActorComponent_1.Lz.X) <
            MathUtils_1.MathUtils.SmallNumber) &&
          Math.abs(CharacterActorComponent_1.Lz.Y) <
            MathUtils_1.MathUtils.SmallNumber &&
          Math.abs(CharacterActorComponent_1.Lz.Z - 50) <
            MathUtils_1.MathUtils.SmallNumber &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            6,
            "向上移动了50厘米",
            ["Actor", this.Actor.GetName()],
            ["NewLocation", t],
          ),
        super.TeleportTo(t, e, i)
      );
    }
    SetActorLocationAndRotation(t, e, i, s = !1, r = void 0) {
      let o = !1;
      var h;
      return MathUtils_1.MathUtils.IsValidVector(t) &&
        MathUtils_1.MathUtils.IsValidRotator(e)
        ? (this.IsRoleAndCtrlByMe &&
            (CharacterActorComponent_1.Lz.FromUeVector(t),
            CharacterActorComponent_1.Lz.SubtractionEqual(
              this.ActorLocationProxy,
            ),
            Math.abs(CharacterActorComponent_1.Lz.X) <
              MathUtils_1.MathUtils.SmallNumber) &&
            Math.abs(CharacterActorComponent_1.Lz.Y) <
              MathUtils_1.MathUtils.SmallNumber &&
            Math.abs(CharacterActorComponent_1.Lz.Z - 50) <
              MathUtils_1.MathUtils.SmallNumber &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "向上移动了50厘米",
              ["Actor", this.Actor.GetName()],
              ["NewLocation", t],
            ),
          (o =
            !r ||
            (((h =
              new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName =
              i),
            (h.Priority = r),
            this.Z2r.DecideCall(h))
              ? super.SetActorLocationAndRotation(t, e, i, s)
              : super.SetActorLocation(t, i, s)),
          this.CachedActorRotation.DeepCopy(e),
          (this.CachedRotationTime = Time_1.Time.Frame),
          this.CachedActorRotation.Quaternion(this.CachedActorQuat),
          this.OnTeleport(),
          o)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 30, "SetActorLocationAndRotation NaN"),
          !1);
    }
    SetActorTransform(t, e, i = !0, s = void 0) {
      var r;
      return (
        this.IsRoleAndCtrlByMe &&
          (CharacterActorComponent_1.Lz.FromUeVector(t.GetLocation()),
          CharacterActorComponent_1.Lz.SubtractionEqual(
            this.ActorLocationProxy,
          ),
          Math.abs(CharacterActorComponent_1.Lz.X) <
            MathUtils_1.MathUtils.SmallNumber) &&
          Math.abs(CharacterActorComponent_1.Lz.Y) <
            MathUtils_1.MathUtils.SmallNumber &&
          Math.abs(CharacterActorComponent_1.Lz.Z - 50) <
            MathUtils_1.MathUtils.SmallNumber &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            6,
            "向上移动了50厘米",
            ["Actor", this.Actor.GetName()],
            ["NewLocation", t],
          ),
        s &&
          (((r =
            new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName =
            e),
          (r.Priority = s),
          this.Z2r.DecideCall(r) ||
            t.SetRotation(this.ActorRotation.Quaternion())),
        super.SetActorTransform(t, e, i)
      );
    }
    SetActorTransformExceptMesh(t, e, i = !0, s) {
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
    SetActorLocationAndRotationExceptMesh(t, e, i, s = !0, r) {
      return (
        this.CachedDesiredActorLocation.FromUeVector(t),
        (this.IsChangingLocation = !0),
        (t = this.Actor.SetActorLocationAndRotationExceptSkelMesh(
          t,
          e,
          s,
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
    KuroMoveAlongFloor(t, e, i = "unknown") {
      this.Actor.CharacterMovement.KuroMoveAlongFloor(t, e),
        this.ResetLocationCachedTime(),
        this.CheckIsForbidSettingLocAndRot(!0),
        this.DebugMovementComp &&
          this.DebugMovementComp.MarkDebugRecord(i + ".KuroMoveAlongFloor", 1);
    }
    AddActorWorldOffset(t, e = "unknown", i = !0) {
      i
        ? (this.CheckIsForbidSettingLocAndRot(!0),
          this.DebugMovementComp &&
            this.DebugMovementComp.MarkDebugRecord(
              e + ".AddActorWorldOffset",
              1,
            ),
          this.Actor.CharacterMovement.D_MoveAdjust(t))
        : super.AddActorWorldOffset(t, e, i);
    }
    AddActorWorldOffsetWithReset(t, e = "unknown", i = !0) {
      i
        ? (this.CheckIsForbidSettingLocAndRot(!0),
          this.DebugMovementComp &&
            this.DebugMovementComp.MarkDebugRecord(
              e + ".AddActorWorldOffsetWithReset",
              1,
            ),
          this.Actor.CharacterMovement.D_MoveAdjust(t),
          this.ResetLocationCachedTime())
        : super.AddActorWorldOffset(t, e, i);
    }
    OnStart() {
      super.OnStart(),
        AoiController_1.AoiController.AddMonsterSizeTag(this.Entity);
      var t,
        e = this.Actor;
      return (
        (this.DebugMovementComp = this.Entity.GetComponent(30)),
        e
          ? (GlobalData_1.GlobalData.BpFightManager.添加Debug的对象(this.Actor),
            this.uFr(),
            e.SetPrimitiveEntityType(
              RenderConfig_1.RenderConfig.GetEntityRenderPriority(
                this.IsBoss,
                this.EntityType,
              ),
            ),
            GlobalData_1.GlobalData.IsPlayInEditor &&
              (t = e.TsCharacterDebugComponent) &&
              ((t.DebugCreatureId = this.CreatureDataInternal.GetOwnerId()),
              (t.DebugEntityId = this.Entity.Id)),
            this.cFr(),
            ModelManager_1.ModelManager.SundryModel.RoleMoveDebugLogOn &&
              this.IsRoleAndCtrlByMe &&
              (e.RootComponent.bKuroMoveDebugLog = !0),
            CameraController_1.CameraController.LoadCharacterCameraConfig(
              e.DtCameraConfig,
            ),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.FixBornLocation,
              this.iFr,
            ),
            !0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                3,
                "[CharacterActorComponent.OnInit] 加载actor失败。",
                ["EntityId", this.Entity.Id],
                [
                  "CreatureDataId",
                  this.CreatureDataInternal.GetCreatureDataId(),
                ],
                ["PlayerId", this.CreatureDataInternal.GetPlayerId()],
                ["PbDataId", this.CreatureData.GetPbDataId()],
              ),
            !1)
      );
    }
    OnActivate() {
      var t = this.Entity.GetComponent(0).ActorVisible;
      this.SetActorVisible(t, "[CharacterActorComponent.OnActivate] Visible"),
        this.SetCollisionEnable(
          t,
          "[CharacterActorComponent.OnActivate] Visible",
        ),
        this.SetTickEnable(!0, "[CharacterActorComponent.OnActivate] Visible"),
        super.OnActivate(),
        this.mFr(),
        ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(
          this.CreatureDataInternal,
          this.ActorInternal,
        ),
        this.ClearInput(),
        (this.Entity.IsEncloseSpace =
          ControllerHolder_1.ControllerHolder.WorldController.IsEncloseSpace(
            this.CreatureData.GetPbDataId(),
            this.ActorLocation,
            this.EntityType,
            this.CreatureData.GetEntityConfigType(),
            this.IsSummonsAndCtrlByMe,
          )),
        this.Entity.IsEncloseSpace
          ? (3 ===
            ModelManager_1.ModelManager.WorldModel?.CurEnvironmentInfo.jNn
              ? this.VNn(this.ActorLocation)
              : this.HNn(),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.OnEncloseSpaceTypeChange,
              this.FNn,
            ))
          : this.HNn(),
        this.CreatureData.PbHackedByEntities &&
          ControllerHolder_1.ControllerHolder.FollowShooterHackController.AddRelationship(
            this.CreatureData.PbHackedByEntities,
            this.CreatureData.GetCreatureDataId(),
          ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBasePlatformChanged,
          this._L1,
        );
    }
    OnTick(t) {
      super.OnTick(t),
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          (this.Y2r ||
            (this.IsAutonomousProxy && !this.IsMoveAutonomousProxy)) &&
          ((this.J2r -= t * MathUtils_1.MathUtils.MillisecondToSecond),
          this.J2r <= 0) &&
          this.ResetMoveControlled("控制超时"),
        this.Actor.DitherEffectController?.Update(t);
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharOnEndPlay,
          this.Entity,
        ),
        GlobalData_1.GlobalData.BpFightManager.删除Debug的对象(this.Actor),
        this.ActorInternal?.IsValid() &&
          (this.ActorInternal.OnDestroyed.Remove(this.v9e),
          this.ActorInternal instanceof TsBaseCharacter_1.default) &&
          (this.ActorInternal.Controller?.IsValid() &&
            this.ActorInternal.Controller.Pawn === this.ActorInternal &&
            (this.ActorInternal.Controller ===
            Global_1.Global.CharacterController
              ? this.ActorInternal.Controller.UnPossess()
              : this.ActorInternal.DetachFromControllerPendingDestroy()),
          this.ActorInternal.DitherEffectController?.Clear(),
          (this.ActorInternal.DitherEffectController = void 0),
          (this.ActorInternal.CharacterActorComponent = void 0)),
        (this.IsInSequenceBinding = !1),
        CameraController_1.CameraController.UnloadCharacterCameraConfig(
          this.Actor.DtCameraConfig,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBasePlatformChanged,
          this._L1,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.FixBornLocation,
          this.iFr,
        ),
        this.Entity.IsEncloseSpace &&
          (this.NNn &&
            (TimerSystem_1.TimerSystem.Remove(this.NNn), (this.NNn = void 0)),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnEncloseSpaceTypeChange,
            this.FNn,
          )),
        !0
      );
    }
    OnClear() {
      return (
        super.OnClear(),
        TimerSystem_1.TimerSystem.Next(() => {
          this.Actor?.IsValid() &&
            (this.Actor.Mesh?.SetSkeletalMesh(
              this.ClassDefaultObject.Mesh.SkeletalMesh,
            ),
            this.Actor.Mesh?.SetAnimClass(
              this.ClassDefaultObject.Mesh.AnimClass,
            ));
        }),
        this.SetInputDirectByNumber(0, 0, 0),
        this.SetInputFacing(Vector_1.Vector.ForwardVectorProxy),
        this.DisableMeshCollisionEnabledHandle.Clear(),
        this.DisableMeshCollisionObjectTypeHandle.Clear(),
        !(this.poa = void 0)
      );
    }
    OnEnable() {
      this.OnSetActorActive(!0), this.ResetAllCachedTime();
    }
    OnDisable(t) {
      this.OnSetActorActive(!1, t);
    }
    OnChangeTimeDilation(t) {
      var e = this.Entity.GetComponent(120)?.CurrentTimeScale ?? 1;
      this.ActorInternal.CustomTimeDilation = t * e;
    }
    dFr() {
      this.ActorInternal
        ? GameBudgetInterfaceController_1.GameBudgetInterfaceController
            .IsOpen &&
          (void 0 !== this.Entity.GameBudgetManagedToken
            ? (cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(
                this.Entity.GameBudgetConfig.GroupName,
                this.Entity.GameBudgetManagedToken,
                this.ActorInternal,
              ),
              this.uL1())
            : (this.Entity.RegisterToGameBudgetController(this.ActorInternal),
              this.Entity.GetComponent(119)?.RegisterPerceptionEvent()),
          this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player ||
          this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Vision ||
          this.IsSummonsAndCtrlByMe
            ? cpp_1.FKuroGameBudgetAllocatorInterface.SetActorCavernMode(
                this.Entity.GameBudgetConfig.GroupName,
                this.Entity.GameBudgetManagedToken,
                3,
              )
            : cpp_1.FKuroGameBudgetAllocatorInterface.SetActorCavernMode(
                this.Entity.GameBudgetConfig.GroupName,
                this.Entity.GameBudgetManagedToken,
                this.Entity.IsEncloseSpace ? 2 : 1,
              ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            24,
            "[CharacterActorComponent.OnActivate] 没有找到Actor",
            ["EntityId", this.Entity.Id],
            ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
            ["PlayerId", this.CreatureDataInternal.GetPlayerId()],
            ["PbDataId", this.CreatureData.GetPbDataId()],
          ),
        JsModelManager_1.JsModelManager.UpdateEntityActor(
          this.Entity.Id,
          this.ActorInternal,
        );
    }
    OnSetActorActive(e, t) {
      if (
        (super.OnSetActorActive(e, t),
        e && this.MoveComp?.StopMove(!e),
        this.Actor?.IsValid())
      ) {
        var t = this.Actor.GetComponentByClass(
            UE.NavigationInvokerComponent.StaticClass(),
          ),
          t = (t && t.SetActive(e), (0, puerts_1.$ref)(void 0)),
          i = (this.Actor.GetAttachedActors(t, !0), (0, puerts_1.$unref)(t));
        for (let t = 0; t < i.Num(); ++t) i.Get(t).SetActorHiddenInGame(!e);
        t = this.Actor.DitherEffectController;
        t && (e ? t.SetIsDisable(!1, 1) : t.SetIsDisable(!0)),
          this.SetActorXRayState(!1);
      }
    }
    gFr(t) {
      var e = CollisionUtils_1.CollisionUtils.GetCollisionResponseContainer();
      (e.Pawn = e.GameTraceChannel5 = e.GameTraceChannel8 = 1),
        this.Actor.CapsuleComponent.SetCollisionResponseToChannel(
          QueryTypeDefine_1.KuroCollisionChannel.Bullet,
          1,
        ),
        this.Actor.CapsuleComponent.SetCollisionResponseToChannel(
          QueryTypeDefine_1.KuroCollisionChannel.BulletSpecial,
          1,
        ),
        t &&
          (this.Actor.CapsuleComponent.KuroAddPassiveProxyChannel(
            QueryTypeDefine_1.KuroCollisionChannel.Bullet,
          ),
          this.Actor.CapsuleComponent.KuroAddPassiveProxyChannel(
            QueryTypeDefine_1.KuroCollisionChannel.BulletSpecial,
          )),
        (this.IsPartHitInternal = t),
        this.fFr(this.Actor.CapsuleComponent),
        this.Actor.Mesh.SetCollisionObjectType(
          QueryTypeDefine_1.KuroCollisionChannel.PhysicsBody,
        ),
        this.Actor.Mesh.SetCollisionResponseToChannels(e);
    }
    TeleportAndFindStandLocation(t) {
      this.FixBornLocation("传送到目前位置", !0, t, !0) ||
        this.TeleportTo(
          t.ToUeVector(),
          this.ActorRotationProxy.ToUeRotator(),
          "传送到目前位置失败,直接设置位置",
        );
    }
    oFr() {
      switch (this.Actor.CharacterMovement.DefaultLandMovementMode) {
        case 1:
        case 2:
        case 0:
        case 3:
          this.FixBornLocation("实体初始化.地面修正");
      }
    }
    FixBornLocation(
      t = "unknown.FixBornLocation",
      e = !0,
      i = void 0,
      s = !1,
      r = !1,
      o = !0,
    ) {
      let h = !1;
      switch (this.Actor.CharacterMovement.MovementMode) {
        case 1:
        case 2:
        case 0:
        case 3:
          break;
        case 6:
          this.Actor.CharacterMovement.CustomMovementMode !==
            CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE &&
            this.Actor.CharacterMovement.CustomMovementMode !==
              CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI &&
            this.Actor.CharacterMovement.CustomMovementMode !==
              CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL &&
            (h = !0);
          break;
        default:
          h = !0;
      }
      return h
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              3,
              "[CharacterActorComponent.FixBornLocation] 实体地面修正:无需修正",
              ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
              ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
              ["MovementMode", this.Actor.CharacterMovement.MovementMode],
              ["Context", t],
            ),
          !1)
        : !!(i = this.FixActorLocation(
            exports.FIX_SPAWN_TRACE_HEIGHT,
            e,
            i,
            t,
            o,
            r,
          ))[0] &&
            (s
              ? this.TeleportTo(
                  i[1].ToUeVector(),
                  this.ActorRotationProxy.ToUeRotator(),
                  t,
                )
              : this.SetActorLocation(i[1].ToUeVector(), t, !1),
            e &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Entity",
                3,
                "[CharacterActorComponent.FixBornLocation] 实体地面修正:后",
                [
                  "CreatureDataId",
                  this.CreatureDataInternal.GetCreatureDataId(),
                ],
                ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
                ["K2_GetActorLocation", this.Actor.D_K2_GetActorLocation()],
                ["Context", t],
              ),
            !0);
    }
    FixSwitchLocation(t = "unknown.FixSwitchLocation", e = !0, i = !1) {
      i = this.FixActorLocation(
        exports.FIX_SPAWN_TRACE_HEIGHT,
        e,
        void 0,
        t,
        !1,
        i,
      );
      return (
        !!i[0] &&
        (this.SetActorLocation(i[1].ToUeVector(), t, !1),
        e &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[CharacterActorComponent.FixSwitchLocation] 实体地面修正:后",
            ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
            ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
            ["K2_GetActorLocation", this.Actor.D_K2_GetActorLocation()],
            ["Context", t],
          ),
        !0)
      );
    }
    RestoreDefaultController() {
      this.DefaultController ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            57,
            "[CharacterActorComponent.RestoreDefaultController] 没有DefaultController,将导致这个实体部分功能失效比如移动,查看OnStart 有无正常初始化DefaultController",
            ["Id", this.Entity.Id],
          )),
        this.DefaultController.Possess(this.Actor);
    }
    get ActorVelocityProxy() {
      return (
        this.CachedVelocityTime < Time_1.Time.Frame &&
          ((this.CachedVelocityTime = Time_1.Time.Frame),
          this.W2r.DeepCopy(this.Actor.D_GetVelocity())),
        this.W2r
      );
    }
    SetActorVelocity(t) {
      var e;
      this.Actor.RootComponent &&
        (MathUtils_1.MathUtils.IsValidVector(t)
          ? ((e = t.ToUeVectorOld()),
            (this.Actor.RootComponent.ComponentVelocity = e),
            this.Actor.CharacterMovement &&
              (this.Actor.CharacterMovement.Velocity = e),
            this.W2r.DeepCopy(t),
            GravityUtils_1.GravityUtils.GetZnInGravityForActor(this, t) <
              -1e4 &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Character",
                6,
                "1117317 Bug追踪，设置速度",
                ["Name", this.Actor.GetName()],
                ["Velocity", t],
              ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Movement", 6, "Set Invalid Velocity", ["v", t]));
    }
    get IsActorMoveInfoCache() {
      return !(
        this.CachedLocationTime < Time_1.Time.Frame ||
        this.CachedRotationTime < Time_1.Time.Frame ||
        this.CachedVelocityTime < Time_1.Time.Frame
      );
    }
    get ActorVelocity() {
      return this.ActorVelocityProxy.ToUeVectorOld();
    }
    get DefaultRadius() {
      return this.DefaultRadiusInternal;
    }
    get DefaultHalfHeight() {
      return this.DefaultHalfHeightInternal;
    }
    get IsDefaultCapsule() {
      return this.X2r;
    }
    GetRadius() {
      return this.RadiusInternal;
    }
    get FloorLocation() {
      return (
        this.Q2r.FromUeVector(this.ActorLocationProxy),
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(
          this,
          this.Q2r,
          -this.ScaledHalfHeight,
        ),
        this.Q2r
      );
    }
    SetRadiusAndHalfHeight(t, e, i = !0, s = !1) {
      var r = this.HalfHeightInternal,
        o = this.Radius,
        h = this.Actor.CharacterMovement?.MovementMode;
      (this.X2r = !1),
        (this.RadiusInternal = t),
        (this.HalfHeightInternal = e),
        this.Actor.CapsuleComponent.SetCapsuleRadius(t, i),
        this.Actor.CapsuleComponent.SetCapsuleHalfHeight(e, i),
        RoleTriggerController_1.RoleTriggerController.UpdateRoleTriggerHalfHeightAndRadius(
          t,
          e,
          i,
        ),
        !s ||
          (r === e && o === t) ||
          (1 !== h && 2 !== h && 0 !== h) ||
          ((i = Math.min(0, e - r)),
          (s = this.FixActorLocation(i)) &&
            s[0] &&
            (this.SetActorLocation(
              s[1].ToUeVector(),
              "修改胶囊体后地面修正",
              !1,
            ),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "Entity",
              67,
              "[CharacterActorComponent.SetRadiusAndHalfHeight] 地面修正:后",
              ["K2_GetActorLocation", this.Actor.D_K2_GetActorLocation()],
            ));
    }
    ResetCapsuleRadiusAndHeight(e = !1) {
      if (
        (this.SetRadiusAndHalfHeight(
          this.DefaultRadiusInternal,
          this.DefaultHalfHeightInternal,
          !0,
          e,
        ),
        (this.X2r = !0),
        !e)
      ) {
        let t = !1;
        switch (this.Actor.CharacterMovement.MovementMode) {
          case 1:
          case 2:
          case 0:
          case 3:
            break;
          case 6:
            this.Actor.CharacterMovement.CustomMovementMode !==
              CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE &&
              this.Actor.CharacterMovement.CustomMovementMode !==
                CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI &&
              this.Actor.CharacterMovement.CustomMovementMode !==
                CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL &&
              (t = !0);
            break;
          default:
            t = !0;
        }
        var i, s;
        t
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              3,
              "[CharacterActorComponent.FixBornLocation] 实体地面修正:无需修正",
              ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
              ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
              ["MovementMode", this.Actor.CharacterMovement.MovementMode],
            )
          : ((e = this.ActorLocationProxy),
            (i =
              ModelManager_1.ModelManager.TraceElementModel
                .CommonStartLocation).Set(
              e.X,
              e.Y,
              e.Z + Math.max(0, this.ScaledHalfHeight - this.ScaledRadius),
            ),
            (s =
              ModelManager_1.ModelManager.TraceElementModel
                .CommonEndLocation).Set(
              e.X,
              e.Y,
              e.Z - Math.max(0, this.ScaledHalfHeight - this.ScaledRadius),
            ),
            this.FixBornLocationInternal(
              e,
              i,
              s,
              !0,
              !0,
              "CharacterActorComponent.ResetCapsuleRadiusAndHeight",
            ));
      }
    }
    ChangeMeshAnim(t, e) {
      ControllerHolder_1.ControllerHolder.CreatureController.ChangeMeshAnim(
        this.Actor.Mesh,
        t,
        e,
      ),
        this.Actor.CharRenderingComponent.Init(this.Actor.RenderType),
        TimerSystem_1.TimerSystem.Next(() => {
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharChangeMeshAnim,
          );
        });
    }
    IsWorldOwner() {
      return (
        !!this.CreatureDataInternal &&
        ModelManager_1.ModelManager.CreatureModel.GetWorldOwner() ===
          this.CreatureDataInternal.GetPlayerId()
      );
    }
    IsMyRoleAndCtrlByMe() {
      return (
        !!this.CreatureDataInternal &&
        this.IsRoleAndCtrlByMe &&
        !this.CreatureDataInternal.IsAutoRole()
      );
    }
    IsMySummonsAndCtrlByMe() {
      if (this.IsSummonsAndCtrlByMe) {
        var t = this.CreatureDataInternal?.GetSummonerId();
        if (t && 0 !== t) {
          t =
            ModelManager_1.ModelManager.CreatureModel?.GetEntity(
              t,
            )?.Entity?.GetComponent(3);
          if (t) return t.IsMyRoleAndCtrlByMe();
        }
      }
      return !1;
    }
    GetSummonerId() {
      var t = this.CreatureDataInternal?.GetSummonerId();
      if (t && 0 !== t) {
        t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t)?.Entity;
        if (t) return t.Id;
      }
      return 0;
    }
    ClearInput(t = !1) {
      var e;
      this.SetInputDirect(Vector_1.Vector.ZeroVector),
        this.SetInputFacing(this.ActorForwardProxy),
        this.SetOverrideTurnSpeed(0),
        Info_1.Info.AxisInputOptimize &&
          ((e = this.Entity.GetComponent(61)) &&
            (e.ClearInputAxis(!1, t),
            e.InterruptAutoMoving("ActorComp.ClearInput")),
          ModelManager_1.ModelManager.InputModel?.TemporaryClearAxisValues());
    }
    cFr() {
      var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
        this.Actor.GetClass(),
      );
      const e = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t),
        _ =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
            e,
          )?.PartHitEffect.ToAssetPathName();
      let C = void 0 !== _ && 0 < _.length && "None" !== _;
      C
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            _,
            UE.BP_PartHitEffect_C,
            (t) => {
              if (this.Actor?.IsValid()) {
                if (
                  (CharacterActorComponent_1.pFr.Start(),
                  (this.sFr = t),
                  (C = this.sFr?.IsValid() ?? !1) && this.Actor)
                ) {
                  let e = this.sFr.PartCollision.Num();
                  for (let t = 0; t < e; t++) {
                    var i = this.sFr.PartCollision.Get(t);
                    this.rFr.set(i.BoneName, i);
                  }
                  (C = !1), (e = this.Actor.Mesh.GetNumChildrenComponents());
                  for (let t = 0; t < e; t++) {
                    var s,
                      r = this.Actor.Mesh.GetChildComponent(t),
                      o = r.GetName();
                    r.IsA(UE.CapsuleComponent.StaticClass()) ||
                    r.IsA(UE.BoxComponent.StaticClass())
                      ? ((s = this.rFr.get(o)),
                        this.nFr.set(o, r),
                        s
                          ? ((C = !0),
                            (r.bGenerateOverlapEvents = !0),
                            this.SetPartPassiveCollision(r, !1),
                            this.SetPartCollisionSwitch(
                              o,
                              s.IsBlockPawn,
                              s.IsBulletDetect,
                              s.IsBlockCamera,
                            ))
                          : Log_1.Log.CheckDebug() &&
                            Log_1.Log.Debug(
                              "Character",
                              20,
                              "部位缺少配置",
                              ["PartHitEffect路径", _],
                              ["Component Name", o],
                            ))
                      : Log_1.Log.CheckDebug() &&
                        Log_1.Log.Debug(
                          "Character",
                          20,
                          "部位组件不是碰撞体类型",
                          ["Component Name", o],
                        );
                  }
                  (e = this.sFr.AimParts.Num()), this.AimParts.clear();
                  for (let t = 0; t < e; ++t) {
                    var h = new AimPartUtils_1.AimPart(this);
                    h.Init(this.sFr.AimParts.Get(t)),
                      this.AimParts.set(h.BoneNameString, h);
                  }
                  (e = this.sFr.LockOnParts.Num()), this.LockOnParts.clear();
                  for (let t = 0; t < e; ++t) {
                    var a = new LockOnPart(this.sFr.LockOnParts.Get(t));
                    this.LockOnParts.set(a.BoneNameString, a);
                  }
                  for (const c of oldLockOnPartNames) {
                    var n;
                    this.LockOnParts.get(c.toString()) ||
                      (this.Actor.Mesh.DoesSocketExist(c) &&
                        ((n = new LockOnPart(c)),
                        this.LockOnParts.set(n.BoneNameString, n)));
                  }
                  (this.StartHideDistance = this.sFr.StartHideDistance),
                    (this.CompleteHideDistance = this.sFr.CompleteHideDistance),
                    (this.StartDitherValue = this.sFr.StartDitherValue),
                    (this.LockOnConfig = new LockOnConfig(
                      this.sFr.LockOnConfig,
                    ));
                } else
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Character",
                      20,
                      "没配置PartHit",
                      ["BP路径", e],
                      ["Actor是否为空", void 0 === this.Actor],
                    );
                (this.Actor.CapsuleComponent.CanCharacterStepUpOn = 0),
                  this.gFr(C),
                  CharacterActorComponent_1.pFr.Stop();
              }
            },
          )
        : ((this.Actor.CapsuleComponent.CanCharacterStepUpOn = 0), this.gFr(C));
    }
    GetBoneLocation(t) {
      var e = this.nFr.get(t);
      return (
        e ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              20,
              "GetBoneLocation",
              ["Character", this.Actor.GetName()],
              ["Bone", t],
            )),
        e.D_K2_GetComponentLocation()
      );
    }
    CFr() {
      var t = this.CreatureDataInternal.GetModelConfig();
      t &&
        t?.IsHiddenWithCamera &&
        this.Actor.CharRenderingComponent.SetCapsuleDither(1);
    }
    SetMoveControlled(t, e = 2, i = "") {
      (this.Y2r = !0),
        (this.J2r = e),
        this.IsMoveAutonomousProxy !== t &&
          (this.SetMoveAutonomous(t, i),
          this.Entity.GetComponent(49)?.ClearOrders());
    }
    ResetMoveControlled(t = "") {
      (this.Y2r = !1),
        (this.J2r = 0),
        this.SetMoveAutonomous(this.IsAutonomousProxy, t);
    }
    SetAutonomous(t, e = void 0) {
      CombatLog_1.CombatLog.Info("Control", this.Entity, "设置逻辑主控", [
        "v",
        t,
      ]),
        super.SetAutonomous(t, e);
    }
    SetMoveAutonomous(t, e = "") {
      CombatLog_1.CombatLog.Info("Control", this.Entity, "设置移动主控", [
        e,
        t,
      ]);
      var e = this.Y2r,
        i = (super.SetMoveAutonomous(t), this.Entity.GetComponent(175));
      i &&
        (i.MainAnimInstance?.SetStateMachineNetMode(!t),
        i.SpecialAnimInstance?.SetStateMachineNetMode(!t)),
        t !== e &&
          (this.IsAutonomousProxy &&
            ((i = this.MoveComp) &&
              (i.StopAllAddMove(),
              i.SetAddMoveOffset(void 0),
              i.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy)),
            this.Entity.GetComponent(67)?.ClearReplaySamples()),
          this.Entity.GetComponent(49)?.ClearOrders());
    }
    GetMapPartCollision() {
      return this.nFr;
    }
    GetPartHitConf(t) {
      return this.rFr.get(t);
    }
    uFr() {
      var t;
      this.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Monster ||
        !(t =
          this.Entity.GetComponent(0)?.GetBaseInfo()?.Category
            ?.MonsterMatchType) ||
        (3 !== t && 2 !== t) ||
        (this.$2r = !0);
    }
    SetPartPassiveCollision(t, e = !0) {
      (t.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap = !0),
        t.KuroSetPassiveCollision(!0, e);
    }
    IsPartComponentEnable(t) {
      return !this.aFr.has(t) || this.aFr.get(t);
    }
    SetPartCollisionSwitch(t, e, i, s) {
      var r,
        o = this.nFr.get(t);
      o?.IsValid()
        ? (this.fFr(o),
          ((r =
            CollisionUtils_1.CollisionUtils.GetCollisionResponseContainer()).Pawn =
            r.GameTraceChannel5 =
            r.GameTraceChannel8 =
              e ? 2 : 1),
          (r.Camera = s ? 2 : 1),
          (r.GameTraceChannel6 = r.GameTraceChannel16 = i ? 1 : 0),
          this.aFr.set(t, i),
          o.SetCollisionResponseToChannels(r))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            20,
            "碰撞体不存在",
            ["name", t],
            ["character name", this.Actor.GetName()],
          );
    }
    GetPartConf(t) {
      return this.rFr.get(t);
    }
    mFr() {
      var t = this.Entity.GetComponent(0)?.GetEntityType();
      if (Protocol_1.Aki.Protocol.kks.Proto_Monster === t) {
        var e = this.Entity.GetComponent(203);
        if (this.LockOnConfig?.IsOpened) {
          CharacterLockOnComponent_1.CharacterLockOnComponent.EnhancedEntityIds.add(
            this.Entity.Id,
          );
          for (const s of CharacterLockOnComponent_1.lockOnEnhancedTags)
            e?.AddTag(s);
        }
        t = this.Entity.GetComponent(0)?.GetMonsterComponent()?.InitGasTag;
        if (t && 0 < t.length)
          for (const r of t) {
            var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r);
            i && e?.AddTag(i);
          }
      }
    }
    fFr(t) {
      this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player ||
      0 === this.Entity.GetComponent(0)?.GetEntityCamp()
        ? t.SetCollisionObjectType(
            QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
          )
        : 1 === this.Entity.GetComponent(0)?.GetEntityCamp()
          ? t.SetCollisionObjectType(
              QueryTypeDefine_1.KuroCollisionChannel.PawnMonster,
            )
          : t.SetCollisionObjectType(
              QueryTypeDefine_1.KuroCollisionChannel.Pawn,
            );
    }
    SetInitLocation(t) {
      BlackboardController_1.BlackboardController.SetVectorValueByEntity(
        this.Entity.Id,
        INIT_LOCATION_KEY,
        t.X,
        t.Y,
        t.Z,
      );
    }
    GetInitLocation() {
      return BlackboardController_1.BlackboardController.GetVectorValueByEntity(
        this.Entity.Id,
        INIT_LOCATION_KEY,
      );
    }
    get WanderDirectionType() {
      var t;
      return (
        3 === this.rDn &&
          ((t = this.Entity.GetComponent(176)?.MovementData),
          (this.rDn = t?.WanderDirection ?? 0)),
        this.rDn
      );
    }
    GetWanderDirection(t, e, i) {
      return (
        this.Lz.DeepCopy(t),
        1 === i && this.Lz.MultiplyEqual(-1),
        2 !== this.WanderDirectionType ||
          ((t = MathUtils_1.MathUtils.WrapAngle(
            MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz) -
              this.ActorRotationProxy.Yaw,
          )),
          Math.abs(Math.abs(t) - 90) < MAX_NO_ROTATER_ANGLE) ||
          (this.Lz.CrossProduct(this.ActorUpProxy, this.Lz),
          0 < e.Y && this.Lz.MultiplyEqual(-1)),
        this.Lz
      );
    }
    GetNearestDirection(t, e) {
      if ((this.Lz.DeepCopy(t), 2 === this.WanderDirectionType)) {
        t = MathUtils_1.MathUtils.WrapAngle(
          MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz) -
            this.ActorRotationProxy.Yaw,
        );
        if (Math.abs(Math.abs(t) - 90) < MAX_NO_ROTATER_ANGLE)
          return this.ActorForwardProxy;
      }
      switch (e) {
        case 0:
          break;
        case 1:
          this.Lz.UnaryNegation(this.Lz);
          break;
        case 2:
          this.Lz.CrossProduct(this.ActorUpProxy, this.Lz);
          break;
        case 3:
          this.Lz.MultiplyEqual(-1),
            this.Lz.CrossProduct(this.ActorUpProxy, this.Lz);
      }
      return this.Lz;
    }
    InputWanderDirection(t, e) {
      if (t.IsNearlyZero()) this.SetInputDirect(Vector_1.Vector.ZeroVector);
      else if (0 === this.WanderDirectionType) this.SetInputDirect(t);
      else {
        let t = !0;
        if (
          Time_1.Time.Now - this.nDn[1] <
          CommonDefine_1.MILLIONSECOND_PER_SECOND
        )
          t = this.nDn[0];
        else {
          if (1 === this.WanderDirectionType) t = 0 < e.X;
          else {
            if (2 !== this.WanderDirectionType) return;
            t = 0 < e.Y;
          }
          this.nDn[0] !== t &&
            ((this.nDn[0] = t), (this.nDn[1] = Time_1.Time.Now));
        }
        switch (this.WanderDirectionType) {
          case 1:
            t
              ? this.SetInputDirect(this.ActorForwardProxy)
              : (this.Lz.DeepCopy(this.ActorForwardProxy),
                this.Lz.MultiplyEqual(-1),
                this.SetInputDirect(this.Lz));
            break;
          case 2:
            t
              ? this.SetInputDirect(this.ActorRightProxy)
              : (this.Lz.DeepCopy(this.ActorRightProxy),
                this.Lz.MultiplyEqual(-1),
                this.SetInputDirect(this.Lz));
        }
      }
    }
    SetOtherMeshCollisionEnabled(t, e) {
      e = this.DisableMeshCollisionEnabledHandle.Disable(
        e,
        this.constructor.name,
      );
      return (
        this.ActorInternal?.IsValid() && this.Actor.Mesh.SetCollisionEnabled(t),
        e
      );
    }
    ResetMeshEnableCollision(t) {
      t = this.DisableMeshCollisionEnabledHandle.Enable(
        t,
        this.constructor.name,
      );
      return (
        t &&
          this.ActorInternal?.IsValid() &&
          0 !== this.Actor.Mesh.GetCollisionEnabled() &&
          this.Actor.Mesh.SetCollisionEnabled(0),
        t
      );
    }
    SetMeshCollisionEnabled(t, e) {
      return 0 !== t
        ? !this.hFr &&
            ((this.hFr = this.SetOtherMeshCollisionEnabled(t, e)), !0)
        : !(
            !this.hFr ||
            (this.ResetMeshEnableCollision(this.hFr), (this.hFr = void 0))
          );
    }
    SetOtherMeshCollisionObjectType(t, e) {
      e = this.DisableMeshCollisionObjectTypeHandle.Disable(
        e,
        this.constructor.name,
      );
      return (
        this.ActorInternal?.IsValid() &&
          this.Actor.Mesh.SetCollisionObjectType(t),
        e
      );
    }
    ResetMeshCollisionObjectType(t) {
      t = this.DisableMeshCollisionObjectTypeHandle.Enable(
        t,
        this.constructor.name,
      );
      return (
        t &&
          this.ActorInternal?.IsValid() &&
          2 !== this.Actor.Mesh.GetCollisionObjectType() &&
          this.Actor.Mesh.SetCollisionObjectType(2),
        t
      );
    }
    SetMeshCollisionObjectType(t, e) {
      return 2 !== t
        ? !this.MeshHandleForCollisionType &&
            ((this.MeshHandleForCollisionType =
              this.SetOtherMeshCollisionObjectType(t, e)),
            !0)
        : !(
            !this.MeshHandleForCollisionType ||
            (this.ResetMeshCollisionObjectType(this.MeshHandleForCollisionType),
            (this.MeshHandleForCollisionType = void 0))
          );
    }
    uL1() {
      var t, e;
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
        this.Entity.GameBudgetConfig &&
        this.Entity.GameBudgetManagedToken &&
        ((t = this.Entity.GetComponent(173)?.IsInFighting),
        (e = !!this.Entity.GetComponent(176)?.BasePlatform),
        cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(
          this.Entity.GameBudgetConfig.GroupName,
          this.Entity.GameBudgetManagedToken,
          t || e,
        ));
    }
    GetSocketTransform(t) {
      if (!this.Entity.IsInit) return this.CreatureData.D_GetTransform();
      if (!FNameUtil_1.FNameUtil.IsNothing(t)) {
        var e = this.Actor;
        if (e.Mesh.DoesSocketExist(t)) return e.Mesh.D_GetSocketTransform(t, 0);
      }
      return this.ActorTransform;
    }
    GetSocketLocation(t) {
      if (!this.Entity.IsInit) return this.CreatureData.GetLocation();
      if (!FNameUtil_1.FNameUtil.IsNothing(t)) {
        var e = this.Actor.Mesh;
        if (e.DoesSocketExist(t)) return e.D_GetSocketLocation(t);
      }
      return this.ActorLocation;
    }
    SetActorXRayState(e) {
      this.IsRoleAndCtrlByMe &&
        (this.Actor.Mesh?.SetRenderInKuroXRayPass(e),
        this.poa?.forEach((t) => {
          t?.SetRenderInKuroXRayPass(e);
        }));
    }
    SetActorXRayColor(e) {
      this.IsRoleAndCtrlByMe &&
        (this.Actor.Mesh?.SetKuroXRayColor(e),
        this.poa?.forEach((t) => {
          t?.SetKuroXRayColor(e);
        }));
    }
    SetSceneTrailState(t) {
      this.SkeletalMesh && this.SkeletalMesh.SetRenderKuroTrail(t);
    }
    AddExtraSkeletalMeshComponent(t) {
      this.poa || (this.poa = []), this.poa.push(t);
    }
    GetExtraSkeletalMeshComponent() {
      return this.poa;
    }
    VNn(t) {
      if (
        GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
          .bEnableWorldPartition
      )
        if (t) {
          const e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
            GlobalData_1.GlobalData.World,
            UE.WorldPartitionSubsystem.StaticClass(),
          );
          t = new UE.WorldPartitionStreamingQuerySource(
            t.op_ToVector(),
            PHYSIC_STREAMING_CHECK_RANGE,
            !1,
            !1,
            void 0,
            !1,
            !0,
            void 0,
          );
          const i = UE.NewArray(UE.WorldPartitionStreamingQuerySource);
          i.Add(t),
            this.NNn && TimerSystem_1.TimerSystem.Remove(this.NNn),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("World", 7, "等待物理流送(开始)", [
                "PbDataId:",
                this.CreatureData.GetPbDataId(),
              ]),
            (this.NNn = TimerSystem_1.TimerSystem.Forever(() => {
              e.IsStreamingCompletedWithPhysicsReady(1, i) &&
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("World", 7, "等待物理流送(结束)", [
                    "PbDataId:",
                    this.CreatureData?.GetPbDataId(),
                  ]),
                this.Entity?.Valid) &&
                (TimerSystem_1.TimerSystem.Remove(this.NNn),
                (this.NNn = void 0),
                this.kNn ? this.dFr() : this.HNn());
            }, PHYSIC_STREAMING_CHECK_PERIOD));
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              7,
              "[WaitForPhysicStreaming]location参数无效,无法生成实体",
              ["PbDataId", this.CreatureData.GetPbDataId()],
            );
      else this.HNn();
    }
    RefreshCurrentFloor() {
      var t = (0, puerts_1.$ref)(this.Actor.CharacterMovement.CurrentFloor),
        t =
          (this.Actor.CharacterMovement.D_K2_FindFloor(this.ActorLocation, t),
          (0, puerts_1.$unref)(t));
      this.Actor.CharacterMovement.CurrentFloor = t;
    }
    HNn() {
      this.dFr(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharMovementModeChanged,
          this.Entity.Id,
          this.Actor.CharacterMovement.DefaultLandMovementMode,
          this.Actor.CharacterMovement.MovementMode,
          0,
          0,
        );
      let t = this.NeedFixBornLocation;
      (t =
        ModelManager_1.ModelManager.GameModeModel.InstanceType !==
          Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance ||
        ModelManager_1.ModelManager.GameModeModel.RenderAssetDone
          ? t
          : !1) &&
        ((this.eFr = !0), this.oFr(), this.IsRoleAndCtrlByMe) &&
        this.Actor.KuroSetMovementMode({
          Mode: 1,
          Context: "[CharacterActorComponent.CharacterReady]",
        });
      var e = this.Entity.GetComponent(46);
      e &&
        e.SetLoadCompletePlayer(
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
        ),
        (this.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Player &&
          this.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Vision) ||
          this.SetSceneTrailState(!0),
        this.CFr(),
        (this.kNn = !0),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBornFinished,
        );
    }
  });
(CharacterActorComponent.az = Quat_1.Quat.Create()),
  (CharacterActorComponent.pFr = Stats_1.Stat.Create("OnHitEffectLoaded")),
  (CharacterActorComponent.d6 = void 0),
  (CharacterActorComponent.Lz = Vector_1.Vector.Create()),
  (CharacterActorComponent = CharacterActorComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(3)],
      CharacterActorComponent,
    )),
  (exports.CharacterActorComponent = CharacterActorComponent);
//# sourceMappingURL=CharacterActorComponent.js.map
