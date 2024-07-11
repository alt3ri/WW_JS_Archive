"use strict";
var CharacterActorComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var r,
        o = arguments.length,
        h =
          o < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, i, e, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (r = t[a]) &&
            (h = (o < 3 ? r(h) : 3 < o ? r(i, e, h) : r(i, e)) || h);
      return 3 < o && h && Object.defineProperty(i, e, h), h;
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
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  Net_1 = require("../../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  CollisionUtils_1 = require("../../../../../Core/Utils/CollisionUtils"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
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
  BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
  AimPartUtils_1 = require("../../../Common/AimPartUtils"),
  BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent"),
  FunctionRequestProxy_1 = require("./Actor/FunctionRequestProxy"),
  BaseCharacterComponent_1 = require("./BaseCharacterComponent"),
  CharacterLockOnComponent_1 = require("./LockOn/CharacterLockOnComponent"),
  INIT_LOCATION_KEY = "InitLocation",
  MAX_NO_ROTATER_ANGLE = 10,
  PHYSIC_STREAMING_CHECK_PERIOD = 500,
  PHYSIC_STREAMING_CHECK_RANGE = 1e3,
  oldLockOnPartNames =
    ((exports.FIX_SPAWN_TRACE_HEIGHT = -1e3),
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
        (this.F2r = void 0),
        (this.V2r = Vector_1.Vector.Create(0, 0, 0)),
        (this.H2r = Rotator_1.Rotator.Create(0, 0, 0)),
        (this.j2r = Vector_1.Vector.Create(1, 0, 0)),
        (this.UseControllerRotation = !1),
        (this.NewestInputFacingType = 0),
        (this.OverrideTurnSpeed = 0),
        (this.DisableKey = void 0),
        (this.W2r = Vector_1.Vector.Create(0, 0, 0)),
        (this.K2r = -1),
        (this.IsRoleAndCtrlByMe = !1),
        (this.IsSummonsAndCtrlByMe = !1),
        (this.Q2r = Vector_1.Vector.Create(0, 0, 0)),
        (this.X2r = !0),
        (this.$2r = !1),
        (this.Y2r = !1),
        (this.J2r = 0),
        (this.z2r = !0),
        (this.rDn = 3),
        (this.RNn = void 0),
        (this.hia = void 0),
        (this.xNn = !1),
        (this.Lz = Vector_1.Vector.Create()),
        (this.ShowDebug = !1),
        (this.Z2r = void 0),
        (this.IsPartHitInternal = !1),
        (this.eFr = !1),
        (this.tFr = new Map()),
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
          this.eFr || ((this.eFr = !0), this.oFr());
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
        (this.PNn = (t) => {
          1 === t && this.xNn
            ? (this.Entity.UnregisterFromGameBudgetController(),
              this.BNn(this.ActorLocation))
            : 4 === t &&
              this.RNn &&
              (TimerSystem_1.TimerSystem.Remove(this.RNn),
              (this.RNn = void 0),
              this.xNn ? this.dFr() : this.wNn());
        });
    }
    get EnableVoxelDetection() {
      return this.z2r;
    }
    SetEnableVoxelDetection(t, i) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          4,
          "设置是否检测体素",
          ["", t],
          ["Reason", i],
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
      var t, i;
      return (
        1 === this.NewestInputFacingType &&
          (!this.MoveComp || this.MoveComp.IsStandardGravity
            ? ((t = this.H2r.Pitch * MathUtils_1.MathUtils.DegToRad),
              (this.j2r.Z = Math.sin(t)),
              (t = Math.cos(t)),
              (i = this.H2r.Yaw * MathUtils_1.MathUtils.DegToRad),
              (this.j2r.X = Math.cos(i) * t),
              (this.j2r.Y = Math.sin(i) * t))
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
    SetInputDirect(t, i = !1) {
      MathUtils_1.MathUtils.IsValidVector(t)
        ? i
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
    SetInputDirectByNumber(t, i, e) {
      MathUtils_1.MathUtils.IsValidNumbers(t, i, e)
        ? ((this.V2r.X = t), (this.V2r.Y = i), (this.V2r.Z = e))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            6,
            "SetInputDirect has NaN",
            ["x", t],
            ["y", i],
            ["z", e],
          );
    }
    SetInputRotator(t) {
      this.SetInputRotatorByNumber(t.Pitch, t.Yaw, t.Roll);
    }
    SetInputRotatorByNumber(t, i, e) {
      (this.H2r.Pitch = t),
        (this.H2r.Yaw = i),
        (this.H2r.Roll = e),
        (this.NewestInputFacingType = 1);
    }
    SetInputFacing(t, i = !1) {
      this.j2r.DeepCopy(t),
        i &&
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
    OnInit() {
      super.OnInit(),
        (this.EntityType = this.CreatureData.GetEntityType()),
        (this.SubEntityType = this.CreatureData.GetSubEntityType());
      let t = 0;
      var i = void 0;
      if (this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Player)
        t = this.CreatureDataInternal.GetRoleConfig().MeshId;
      else {
        var e = this.CreatureData.GetPbModelConfig();
        if (!e)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                3,
                "[CharacterActorComponent.OnInit] 加载actor失败，无法找到pbModelConfig",
                [
                  "CreatureDataId",
                  this.CreatureDataInternal.GetCreatureDataId(),
                ],
                ["ModelId", t],
                ["PbDataId", this.CreatureData.GetPbDataId()],
              ),
            !1
          );
        t = e.ModelId;
      }
      if (
        ((i = this.InitActorNew(t)),
        this.lFr(),
        !i || !UE.KismetSystemLibrary.IsValid(i))
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              3,
              "[CharacterActorComponent.OnInit] 加载actor失败。",
              ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
              ["ModelId", t],
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
              ["ModelId", t],
              ["PbDataId", this.CreatureData.GetPbDataId()],
            ),
          !1
        );
      var s = i,
        r =
          (s.SetPrimitiveBlueprintTypeName(
            new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId),
          ),
          this.SetCamp(s),
          (s.CharacterActorComponent = this),
          (s.EntityId = this.Entity.Id),
          this.InitDefaultController(i),
          (this.ActorInternal = i),
          this.ActorInternal.OnDestroyed.Add(this.v9e),
          (this.IsRoleAndCtrlByMe = !1),
          s.Mesh);
      switch (this.EntityType) {
        case Protocol_1.Aki.Protocol.wks.Proto_Player:
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
          this.CreatureDataInternal.GetPlayerId()
            ? ((s.RenderType = 0), (this.IsRoleAndCtrlByMe = !0))
            : (s.RenderType = 1);
          break;
        case Protocol_1.Aki.Protocol.wks.Proto_Npc:
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
        case Protocol_1.Aki.Protocol.wks.Proto_Monster:
          (s.RenderType = 2),
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
              this.CreatureDataInternal.GetPlayerId() &&
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
                    25,
                    "[CharacterActorComponent.OnInit] Monster Actor.Mesh不是SkeletalMeshComponent",
                    ["Name", i.GetName()],
                    [
                      "CreatureDataId",
                      this.CreatureDataInternal.GetCreatureDataId(),
                    ],
                    ["ModelId", t],
                  ))
              : (r.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(!0),
                r.SetSkeletalMeshScreenSizeCullRatio(0.004));
          break;
        case Protocol_1.Aki.Protocol.wks.Proto_Vision:
          (s.RenderType = 4),
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
              this.CreatureDataInternal.GetPlayerId() &&
              (this.IsSummonsAndCtrlByMe = !0);
          break;
        case Protocol_1.Aki.Protocol.wks.Proto_Animal:
          r
            ? (r.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(!0),
              r.SetSkeletalMeshScreenSizeCullRatio(0.005))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                25,
                "[CharacterActorComponent.OnInit] Animal Actor.Mesh不是SkeletalMeshComponent",
                ["Name", i.GetName()],
                [
                  "CreatureDataId",
                  this.CreatureDataInternal.GetCreatureDataId(),
                ],
                ["ModelId", t],
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
        (s.FightManager = GlobalData_1.GlobalData.BpFightManager),
        s.CharRenderingComponent.Init(s.RenderType),
        3 === s.RenderType &&
          s.CharRenderingComponent.UpdateNpcDitherComponent(),
        (s.AutoPossessAI = 3),
        this.SetInputFacing(this.ActorForwardProxy);
      e = this.CreatureDataInternal.GetInitLocation();
      return (
        e ? this.SetInitLocation(e) : this.SetInitLocation(this.ActorLocation),
        this.InitSizeInternal(),
        !0
      );
    }
    lFr() {
      var t = this.CreatureDataInternal?.GetModelConfig();
      if (t) {
        t = t.特效替换表.ToAssetPathName();
        if ("" !== t && "None" !== t) {
          var i = ResourceSystem_1.ResourceSystem.Load(t, UE.DataTable);
          if (i) {
            var t = (0, puerts_1.$ref)(void 0),
              e =
                (UE.DataTableFunctionLibrary.GetDataTableRowNames(i, t),
                (0, puerts_1.$unref)(t));
            if (e)
              for (let t = 0; t < e.Num(); t++) {
                var s = e.Get(t).toString();
                s &&
                  (s = DataTableUtil_1.DataTableUtil.GetDataTableRow(i, s)) &&
                  this.tFr.set(
                    s.OldEffect.ToAssetPathName(),
                    s.NewEffect.ToAssetPathName(),
                  );
              }
          }
        }
      }
    }
    GetReplaceEffect(t) {
      return this.tFr.get(t);
    }
    InitDefaultController(t) {
      (this.F2r = t.GetController()),
        this.EntityType !== Protocol_1.Aki.Protocol.wks.Proto_Player &&
        this.EntityType !== Protocol_1.Aki.Protocol.wks.Proto_Vision &&
        this.EntityType !== Protocol_1.Aki.Protocol.wks.Proto_Npc
          ? this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Animal &&
            this.SetDefaultMovementMode(t)
          : this.F2r
            ? (this.F2r instanceof UE.AIController ||
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Character",
                    58,
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
                    ["DefaultController", this.F2r],
                  )),
              this.F2r instanceof UE.PlayerController &&
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Character",
                    58,
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
                this.F2r.Pawn === t &&
                  this.F2r.Pawn.DetachFromControllerPendingDestroy(),
                (this.F2r = void 0),
                this.CreateDefaultController(t)))
            : this.CreateDefaultController(t);
    }
    SetDefaultMovementMode(t) {
      t.CharacterMovement.SetDefaultMovementMode();
    }
    CreateDefaultController(t) {
      (t.AIControllerClass = UE.KuroAIController.StaticClass()),
        t.SpawnDefaultController(),
        (this.F2r = t.GetController());
    }
    SetActorRotation(t, i, e = !1) {
      return MathUtils_1.MathUtils.IsValidRotator(t)
        ? ((i = super.SetActorRotation(t, i, e)),
          this.CachedActorRotation.DeepCopy(t),
          (this.CachedRotationTime = Time_1.Time.Frame),
          this.CachedActorRotation.Quaternion(this.CachedActorQuat),
          i)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 31, "SetActorRotation NaN"),
          !1);
    }
    SetActorRotationWithPriority(t, i, e, s = !1, r = !1) {
      var o = new FunctionRequestProxy_1.FunctionRequestWithPriority();
      return (
        (o.ModuleName = i),
        (o.Priority = e),
        !!this.Z2r.DecideCall(o) &&
          (this.ShowDebug &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              58,
              "[CharacterActorComponent.SetActorRotationWithPriority] 修改Rotation",
              ["EntityId", this.Entity.Id],
              ["module", i],
              ["rotation", t],
              ["oldRotation", this.ActorRotationProxy],
            ),
          s &&
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.RequestClearMeshRotationBuffer,
            ),
          this.SetActorRotation(t, i, r),
          !0)
      );
    }
    SetActorLocation(t, i, e = !0) {
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
        super.SetActorLocation(t, i, e)
      );
    }
    TeleportTo(t, i, e) {
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
        super.TeleportTo(t, i, e)
      );
    }
    SetActorLocationAndRotation(t, i, e, s = !1, r = void 0) {
      let o = !1;
      var h;
      return MathUtils_1.MathUtils.IsValidVector(t) &&
        MathUtils_1.MathUtils.IsValidRotator(i)
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
              e),
            (h.Priority = r),
            this.Z2r.DecideCall(h))
              ? super.SetActorLocationAndRotation(t, i, e, s)
              : super.SetActorLocation(t, e, s)),
          this.CachedActorRotation.DeepCopy(i),
          (this.CachedRotationTime = Time_1.Time.Frame),
          this.CachedActorRotation.Quaternion(this.CachedActorQuat),
          this.OnTeleport(),
          o)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 31, "SetActorLocationAndRotation NaN"),
          !1);
    }
    SetActorTransform(t, i, e = !0, s = void 0) {
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
            i),
          (r.Priority = s),
          this.Z2r.DecideCall(r) ||
            t.SetRotation(this.ActorRotation.Quaternion())),
        super.SetActorTransform(t, i, e)
      );
    }
    SetActorTransformExceptMesh(t, i, e = !0, s) {
      return (
        this.CachedDesiredActorLocation.FromUeVector(t.GetLocation()),
        (this.IsChangingLocation = !0),
        (t = this.Actor.SetActorTransformExceptSkelMesh(t, e, void 0, !0, !0)),
        (this.IsChangingLocation = !1),
        this.DebugMovementComp &&
          this.DebugMovementComp.MarkDebugRecord(
            i + ".SetActorTransformExceptMesh",
            1,
          ),
        this.ResetTransformCachedTime(),
        this.OnTeleport(),
        t
      );
    }
    SetActorLocationAndRotationExceptMesh(t, i, e, s = !0, r) {
      return (
        this.CachedDesiredActorLocation.FromUeVector(t),
        (this.IsChangingLocation = !0),
        (t = this.Actor.SetActorLocationAndRotationExceptSkelMesh(
          t,
          i,
          s,
          void 0,
          !0,
          !0,
        )),
        (this.IsChangingLocation = !1),
        this.DebugMovementComp &&
          this.DebugMovementComp.MarkDebugRecord(
            e + ".SetActorLocationAndRotationExceptMesh",
            1,
          ),
        this.ResetTransformCachedTime(),
        t
      );
    }
    KuroMoveAlongFloor(t, i, e = "unknown") {
      this.Actor.CharacterMovement.KuroMoveAlongFloor(t, i),
        this.ResetLocationCachedTime(),
        this.DebugMovementComp &&
          this.DebugMovementComp.MarkDebugRecord(e + ".KuroMoveAlongFloor", 1);
    }
    AddActorWorldOffset(t, i = "unknown", e = !0) {
      e
        ? (this.DebugMovementComp &&
            this.DebugMovementComp.MarkDebugRecord(
              i + ".AddActorWorldOffset",
              1,
            ),
          this.Actor.CharacterMovement.MoveAdjust(t))
        : super.AddActorWorldOffset(t, i, e);
    }
    OnStart() {
      super.OnStart();
      var t,
        i = this.Actor;
      return (
        (this.DebugMovementComp = this.Entity.GetComponent(27)),
        i
          ? (GlobalData_1.GlobalData.BpFightManager.添加Debug的对象(this.Actor),
            this.uFr(),
            i.SetPrimitiveEntityType(
              RenderConfig_1.RenderConfig.GetEntityRenderPriority(
                this.IsBoss,
                this.EntityType,
              ),
            ),
            GlobalData_1.GlobalData.IsPlayInEditor &&
              (t = i.TsCharacterDebugComponent) &&
              ((t.DebugCreatureId = this.CreatureDataInternal.GetOwnerId()),
              (t.DebugEntityId = this.Entity.Id)),
            this.cFr(),
            ModelManager_1.ModelManager.SundryModel.RoleMoveDebugLogOn &&
              this.IsRoleAndCtrlByMe &&
              (i.RootComponent.bKuroMoveDebugLog = !0),
            CameraController_1.CameraController.LoadCharacterCameraConfig(
              i.DtCameraConfig,
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
      this.SetActorVisible(!0, "[CharacterActorComponent.OnActivate] Visible"),
        this.SetCollisionEnable(
          !0,
          "[CharacterActorComponent.OnActivate] Visible",
        ),
        this.SetTickEnable(!0, "[CharacterActorComponent.OnActivate] Visible"),
        super.OnActivate(),
        this.mFr(),
        ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(
          this.CreatureDataInternal,
          this.ActorInternal,
        ),
        (this.Entity.IsEncloseSpace =
          ControllerHolder_1.ControllerHolder.WorldController.IsEncloseSpace(
            this.CreatureData.GetPbDataId(),
            this.ActorLocation,
            this.EntityType,
            this.CreatureData.GetEntityConfigType(),
          )),
        this.Entity.IsEncloseSpace
          ? (3 ===
            ModelManager_1.ModelManager.WorldModel?.CurEnvironmentInfo.CaveMode
              ? this.BNn(this.ActorLocation)
              : this.wNn(),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.OnEncloseSpaceTypeChange,
              this.PNn,
            ))
          : this.wNn();
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
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.FixBornLocation,
          this.iFr,
        ),
        this.Entity.IsEncloseSpace &&
          (this.RNn &&
            (TimerSystem_1.TimerSystem.Remove(this.RNn), (this.RNn = void 0)),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnEncloseSpaceTypeChange,
            this.PNn,
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
        !(this.hia = void 0)
      );
    }
    OnEnable() {
      this.OnSetActorActive(!0), this.ResetAllCachedTime();
    }
    OnDisable(t) {
      this.OnSetActorActive(!1, t);
    }
    OnChangeTimeDilation(t) {
      var i = this.Entity.GetComponent(109)?.CurrentTimeScale ?? 1;
      this.ActorInternal.CustomTimeDilation = t * i;
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
              this.Entity.GetComponent(160)?.IsInFighting &&
                cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(
                  this.Entity.GameBudgetConfig.GroupName,
                  this.Entity.GameBudgetManagedToken,
                  !0,
                ))
            : (this.Entity.RegisterToGameBudgetController(this.ActorInternal),
              this.Entity.GetComponent(108)?.RegisterPerceptionEvent()),
          this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Player ||
          this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Vision
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
            25,
            "[CharacterActorComponent.OnActivate] 没有找到Actor",
            ["EntityId", this.Entity.Id],
            ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
            ["PlayerId", this.CreatureDataInternal.GetPlayerId()],
            ["PbDataId", this.CreatureData.GetPbDataId()],
          );
    }
    ResetAllCachedTime() {
      super.ResetAllCachedTime(), (this.K2r = -1);
    }
    ResetCachedVelocityTime() {
      this.K2r = 0;
    }
    OnSetActorActive(i, t) {
      if (
        (super.OnSetActorActive(i, t),
        i && this.MoveComp?.StopMove(!i),
        this.Actor?.IsValid())
      ) {
        var t = this.Actor.GetComponentByClass(
            UE.NavigationInvokerComponent.StaticClass(),
          ),
          t = (t && t.SetActive(i), (0, puerts_1.$ref)(void 0)),
          e = (this.Actor.GetAttachedActors(t, !0), (0, puerts_1.$unref)(t));
        for (let t = 0; t < e.Num(); ++t) e.Get(t).SetActorHiddenInGame(!i);
        t = this.Actor.DitherEffectController;
        t && (i ? t.SetIsDisable(!1, 1) : t.SetIsDisable(!0)),
          this.SetActorXRayState(!1);
      }
    }
    gFr(t) {
      var i = CollisionUtils_1.CollisionUtils.GetCollisionResponseContainer();
      (i.Pawn = i.GameTraceChannel5 = i.GameTraceChannel8 = 1),
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
        this.Actor.Mesh.SetCollisionResponseToChannels(i);
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
      i = !0,
      e = void 0,
      s = !1,
      r = !1,
    ) {
      e = this.FixActorLocation(exports.FIX_SPAWN_TRACE_HEIGHT, i, e, t, r);
      return (
        !!e[0] &&
        (s
          ? this.TeleportTo(
              e[1].ToUeVector(),
              this.ActorRotationProxy.ToUeRotator(),
              t,
            )
          : this.SetActorLocation(e[1].ToUeVector(), t, !1),
        i &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[CharacterActorComponent.FixBornLocation] 实体地面修正:后",
            ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
            ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
            ["K2_GetActorLocation", this.Actor.K2_GetActorLocation()],
            ["Context", t],
          ),
        !0)
      );
    }
    FixSwitchLocation(t = "unknown.FixSwitchLocation", i = !0, e = !1) {
      e = this.FixActorLocation(
        exports.FIX_SPAWN_TRACE_HEIGHT,
        i,
        void 0,
        t,
        !1,
        e,
      );
      return (
        !!e[0] &&
        (this.SetActorLocation(e[1].ToUeVector(), t, !1),
        i &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[CharacterActorComponent.FixSwitchLocation] 实体地面修正:后",
            ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
            ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
            ["K2_GetActorLocation", this.Actor.K2_GetActorLocation()],
            ["Context", t],
          ),
        !0)
      );
    }
    RestoreDefaultController() {
      this.F2r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            58,
            "[CharacterActorComponent.RestoreDefaultController] 没有DefaultController,将导致这个实体部分功能失效比如移动,查看OnStart 有无正常初始化DefaultController",
            ["Id", this.Entity.Id],
          )),
        this.F2r.Possess(this.Actor);
    }
    get ActorVelocityProxy() {
      return (
        this.K2r < Time_1.Time.Frame &&
          ((this.K2r = Time_1.Time.Frame),
          this.W2r.DeepCopy(this.Actor.GetVelocity())),
        this.W2r
      );
    }
    get IsActorMoveInfoCache() {
      return !(
        this.CachedLocationTime < Time_1.Time.Frame ||
        this.CachedRotationTime < Time_1.Time.Frame ||
        this.K2r < Time_1.Time.Frame
      );
    }
    get ActorVelocity() {
      return this.ActorVelocityProxy.ToUeVector();
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
        (this.Q2r.Z -= this.ScaledHalfHeight),
        this.Q2r
      );
    }
    SetRadiusAndHalfHeight(t, i, e = !0) {
      (this.X2r = !1),
        (this.RadiusInternal = t),
        (this.HalfHeightInternal = i),
        this.Actor.CapsuleComponent.SetCapsuleRadius(t, e),
        this.Actor.CapsuleComponent.SetCapsuleHalfHeight(i, e);
    }
    ResetCapsuleRadiusAndHeight() {
      this.SetRadiusAndHalfHeight(
        this.DefaultRadiusInternal,
        this.DefaultHalfHeightInternal,
        !0,
      );
      var t = this.ActorLocationProxy,
        i = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation,
        e =
          (i.Set(
            t.X,
            t.Y,
            t.Z + Math.max(0, this.ScaledHalfHeight - this.ScaledRadius),
          ),
          ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation);
      e.Set(
        t.X,
        t.Y,
        t.Z - Math.max(0, this.ScaledHalfHeight - this.ScaledRadius),
      ),
        this.FixBornLocationInternal(
          t,
          i,
          e,
          !0,
          !0,
          "CharacterActorComponent.ResetCapsuleRadiusAndHeight",
        ),
        (this.X2r = !0);
    }
    ChangeMeshAnim(t, i) {
      TimerSystem_1.TimerSystem.Next(() => {
        ControllerHolder_1.ControllerHolder.CreatureController.ChangeMeshAnim(
          this.Actor.Mesh,
          t,
          i,
        ),
          this.Actor.CharRenderingComponent.Init(this.Actor.RenderType),
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
    ClearInput() {
      this.SetInputDirect(Vector_1.Vector.ZeroVector),
        this.SetInputFacing(this.ActorForwardProxy),
        this.SetOverrideTurnSpeed(0);
    }
    cFr() {
      var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
        this.Actor.GetClass(),
      );
      const i = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t),
        _ =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
            i,
          )?.PartHitEffect.ToAssetPathName();
      let l = void 0 !== _ && 0 < _.length && "None" !== _;
      l
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            _,
            UE.BP_PartHitEffect_C,
            (t) => {
              if (this.Actor?.IsValid()) {
                if (
                  ((this.sFr = t),
                  (l = this.sFr?.IsValid() ?? !1) && this.Actor)
                ) {
                  let i = this.sFr.PartCollision.Num();
                  for (let t = 0; t < i; t++) {
                    var e = this.sFr.PartCollision.Get(t);
                    this.rFr.set(e.BoneName, e);
                  }
                  (l = !1), (i = this.Actor.Mesh.GetNumChildrenComponents());
                  for (let t = 0; t < i; t++) {
                    var s = this.Actor.Mesh.GetChildComponent(t),
                      r = s.GetName(),
                      o = this.rFr.get(r);
                    this.nFr.set(r, s),
                      o
                        ? ((l = !0),
                          (s.bGenerateOverlapEvents = !0),
                          this.SetPartPassiveCollision(s, !1),
                          this.SetPartCollisionSwitch(
                            r,
                            o.IsBlockPawn,
                            o.IsBulletDetect,
                            o.IsBlockCamera,
                          ))
                        : Log_1.Log.CheckDebug() &&
                          Log_1.Log.Debug(
                            "Character",
                            21,
                            "部位缺少配置",
                            ["PartHitEffect路径", _],
                            ["Component Name", r],
                          );
                  }
                  (i = this.sFr.AimParts.Num()), this.AimParts.clear();
                  for (let t = 0; t < i; ++t) {
                    var h = new AimPartUtils_1.AimPart(this);
                    h.Init(this.sFr.AimParts.Get(t)),
                      this.AimParts.set(h.BoneNameString, h);
                  }
                  (i = this.sFr.LockOnParts.Num()), this.LockOnParts.clear();
                  for (let t = 0; t < i; ++t) {
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
                      21,
                      "没配置PartHit",
                      ["BP路径", i],
                      ["Actor是否为空", void 0 === this.Actor],
                    );
                (this.Actor.CapsuleComponent.CanCharacterStepUpOn = 0),
                  this.gFr(l);
              }
            },
          )
        : ((this.Actor.CapsuleComponent.CanCharacterStepUpOn = 0), this.gFr(l));
    }
    GetBoneLocation(t) {
      var i = this.nFr.get(t);
      return (
        i ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              21,
              "GetBoneLocation",
              ["Character", this.Actor.GetName()],
              ["Bone", t],
            )),
        i.K2_GetComponentLocation()
      );
    }
    CFr() {
      var t = this.CreatureDataInternal.GetModelConfig();
      t &&
        t?.IsHiddenWithCamera &&
        this.Actor.CharRenderingComponent.SetCapsuleDither(1);
    }
    SetMoveControlled(t, i = 2, e = "") {
      (this.Y2r = !0),
        (this.J2r = i),
        this.IsMoveAutonomousProxy !== t &&
          (t
            ? (this.SetMoveAutonomous(!0, e),
              (i = this.MoveComp) &&
                (i.StopAllAddMove(),
                i.SetAddMoveOffset(void 0),
                i.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy)),
              this.Entity.GetComponent(59)?.ClearReplaySamples())
            : this.SetMoveAutonomous(!1, e),
          this.Entity.GetComponent(42)?.ClearOrders());
    }
    ResetMoveControlled(t = "") {
      (this.Y2r = !1),
        (this.J2r = 0),
        this.SetMoveAutonomous(this.IsAutonomousProxy, t);
    }
    SetAutonomous(t, i = void 0) {
      CombatLog_1.CombatLog.Info("Control", this.Entity, "设置逻辑主控", [
        "v",
        t,
      ]),
        super.SetAutonomous(t, i);
    }
    SetMoveAutonomous(t, i = "") {
      CombatLog_1.CombatLog.Info("Control", this.Entity, "设置移动主控", [
        i,
        t,
      ]),
        super.SetMoveAutonomous(t);
      i = this.Entity.GetComponent(162);
      i &&
        (i.MainAnimInstance?.SetStateMachineNetMode(!t),
        i.SpecialAnimInstance?.SetStateMachineNetMode(!t));
    }
    GetMapPartCollision() {
      return this.nFr;
    }
    GetPartHitConf(t) {
      return this.rFr.get(t);
    }
    uFr() {
      var t;
      this.EntityType !== Protocol_1.Aki.Protocol.wks.Proto_Monster ||
        !(t =
          this.Entity.GetComponent(0)?.GetBaseInfo()?.Category
            ?.MonsterMatchType) ||
        (3 !== t && 2 !== t) ||
        (this.$2r = !0);
    }
    SetPartPassiveCollision(t, i = !0) {
      (t.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap = !0),
        t.KuroSetPassiveCollision(!0, i);
    }
    IsPartComponentEnable(t) {
      return !this.aFr.has(t) || this.aFr.get(t);
    }
    SetPartCollisionSwitch(t, i, e, s) {
      var r,
        o = this.nFr.get(t);
      o?.IsValid()
        ? (this.fFr(o),
          ((r =
            CollisionUtils_1.CollisionUtils.GetCollisionResponseContainer()).Pawn =
            r.GameTraceChannel5 =
            r.GameTraceChannel8 =
              i ? 2 : 1),
          (r.Camera = s ? 2 : 1),
          (r.GameTraceChannel6 = r.GameTraceChannel16 = e ? 1 : 0),
          this.aFr.set(t, e),
          o.SetCollisionResponseToChannels(r))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            21,
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
      if (Protocol_1.Aki.Protocol.wks.Proto_Monster === t) {
        var i = this.Entity.GetComponent(188);
        if (this.LockOnConfig?.IsOpened) {
          CharacterLockOnComponent_1.CharacterLockOnComponent.EnhancedEntityIds.add(
            this.Entity.Id,
          );
          for (const s of CharacterLockOnComponent_1.lockOnEnhancedTags)
            i?.AddTag(s);
        }
        t = this.Entity.GetComponent(0)?.GetMonsterComponent()?.InitGasTag;
        if (t && 0 < t.length)
          for (const r of t) {
            var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r);
            e && i?.AddTag(e);
          }
      }
    }
    fFr(t) {
      this.EntityType === Protocol_1.Aki.Protocol.wks.Proto_Player ||
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
          ((t = this.Entity.GetComponent(163)?.MovementData),
          (this.rDn = t?.WanderDirection ?? 0)),
        this.rDn
      );
    }
    GetWanderDirection(t, i, e) {
      return (
        this.Lz.DeepCopy(t),
        1 === e && this.Lz.MultiplyEqual(-1),
        2 !== this.WanderDirectionType ||
          ((t = MathUtils_1.MathUtils.WrapAngle(
            MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz) -
              this.ActorRotationProxy.Yaw,
          )),
          Math.abs(Math.abs(t) - 90) < MAX_NO_ROTATER_ANGLE) ||
          (this.Lz.CrossProduct(this.ActorUpProxy, this.Lz),
          0 < i.Y && this.Lz.MultiplyEqual(-1)),
        this.Lz
      );
    }
    GetNearestDirection(t, i) {
      if ((this.Lz.DeepCopy(t), 2 === this.WanderDirectionType)) {
        t = MathUtils_1.MathUtils.WrapAngle(
          MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz) -
            this.ActorRotationProxy.Yaw,
        );
        if (Math.abs(Math.abs(t) - 90) < MAX_NO_ROTATER_ANGLE)
          return this.ActorForwardProxy;
      }
      switch (i) {
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
    InputWanderDirection(t, i) {
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
          if (1 === this.WanderDirectionType) t = 0 < i.X;
          else {
            if (2 !== this.WanderDirectionType) return;
            t = 0 < i.Y;
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
    SetOtherMeshCollisionEnabled(t, i) {
      i = this.DisableMeshCollisionEnabledHandle.Disable(
        i,
        this.constructor.name,
      );
      return (
        this.ActorInternal?.IsValid() && this.Actor.Mesh.SetCollisionEnabled(t),
        i
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
    SetMeshCollisionEnabled(t, i) {
      return 0 !== t
        ? !this.hFr &&
            ((this.hFr = this.SetOtherMeshCollisionEnabled(t, i)), !0)
        : !(
            !this.hFr ||
            (this.ResetMeshEnableCollision(this.hFr), (this.hFr = void 0))
          );
    }
    SetOtherMeshCollisionObjectType(t, i) {
      i = this.DisableMeshCollisionObjectTypeHandle.Disable(
        i,
        this.constructor.name,
      );
      return (
        this.ActorInternal?.IsValid() &&
          this.Actor.Mesh.SetCollisionObjectType(t),
        i
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
    SetMeshCollisionObjectType(t, i) {
      return 2 !== t
        ? !this.MeshHandleForCollisionType &&
            ((this.MeshHandleForCollisionType =
              this.SetOtherMeshCollisionObjectType(t, i)),
            !0)
        : !(
            !this.MeshHandleForCollisionType ||
            (this.ResetMeshCollisionObjectType(this.MeshHandleForCollisionType),
            (this.MeshHandleForCollisionType = void 0))
          );
    }
    GetSocketTransform(t) {
      if (!FNameUtil_1.FNameUtil.IsNothing(t)) {
        var i = this.Actor;
        if (i.Mesh.DoesSocketExist(t)) return i.Mesh.GetSocketTransform(t, 0);
      }
      return this.ActorTransform;
    }
    GetSocketLocation(t) {
      if (!FNameUtil_1.FNameUtil.IsNothing(t)) {
        var i = this.Actor.Mesh;
        if (i.DoesSocketExist(t)) return i.GetSocketLocation(t);
      }
      return this.ActorLocation;
    }
    SetActorXRayState(i) {
      this.IsRoleAndCtrlByMe &&
        (this.Actor.Mesh?.SetRenderInKuroXRayPass(i),
        this.hia?.forEach((t) => {
          t?.SetRenderInKuroXRayPass(i);
        }));
    }
    SetActorXRayColor(i) {
      this.IsRoleAndCtrlByMe &&
        (this.Actor.Mesh?.SetKuroXRayColor(i),
        this.hia?.forEach((t) => {
          t?.SetKuroXRayColor(i);
        }));
    }
    SetSceneTrailState(t) {
      this.SkeletalMesh && this.SkeletalMesh.SetRenderKuroTrail(t);
    }
    AddExtraSkeletalMeshComponent(t) {
      this.hia || (this.hia = []), this.hia.push(t);
    }
    GetExtraSkeletalMeshComponent() {
      return this.hia;
    }
    BNn(t) {
      if (
        GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
          .bEnableWorldPartition
      )
        if (t) {
          const i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
            GlobalData_1.GlobalData.World,
            UE.WorldPartitionSubsystem.StaticClass(),
          );
          t = new UE.WorldPartitionStreamingQuerySource(
            t,
            PHYSIC_STREAMING_CHECK_RANGE,
            !1,
            !1,
            void 0,
            !1,
            !0,
            void 0,
          );
          const e = UE.NewArray(UE.WorldPartitionStreamingQuerySource);
          e.Add(t),
            this.RNn && TimerSystem_1.TimerSystem.Remove(this.RNn),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("World", 7, "等待物理流送(开始)", [
                "PbDataId:",
                this.CreatureData.GetPbDataId(),
              ]),
            (this.RNn = TimerSystem_1.TimerSystem.Forever(() => {
              i.IsStreamingCompletedWithPhysicsReady(1, e) &&
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("World", 7, "等待物理流送(结束)", [
                    "PbDataId:",
                    this.CreatureData?.GetPbDataId(),
                  ]),
                this.Entity?.Valid) &&
                (TimerSystem_1.TimerSystem.Remove(this.RNn),
                (this.RNn = void 0),
                this.xNn ? this.dFr() : this.wNn());
            }, PHYSIC_STREAMING_CHECK_PERIOD));
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              7,
              "[WaitForPhysicStreaming]location参数无效,无法生成实体",
              ["PbDataId", this.CreatureData.GetPbDataId()],
            );
      else this.wNn();
    }
    wNn() {
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
      let t = !1;
      (t =
        ModelManager_1.ModelManager.GameModeModel.InstanceType !==
          Protocol_1.Aki.Protocol.XFs.Proto_BigWorldInstance ||
        ModelManager_1.ModelManager.GameModeModel.RenderAssetDone
          ? !0
          : t) &&
        ((this.eFr = !0), this.oFr(), this.IsRoleAndCtrlByMe) &&
        this.MoveComp?.CharacterMovement?.SetMovementMode(1);
      var i = Protocol_1.Aki.Protocol.cms.create(),
        e = this.Entity.GetComponent(0).GetCreatureDataId(),
        e =
          (i.ySs.push(MathUtils_1.MathUtils.NumberToLong(e)),
          Net_1.Net.Call(7805, i, (t) => {}),
          this.Entity.GetComponent(39));
      e &&
        e.SetLoadCompletePlayer(
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
        ),
        (this.EntityType !== Protocol_1.Aki.Protocol.wks.Proto_Player &&
          this.EntityType !== Protocol_1.Aki.Protocol.wks.Proto_Vision) ||
          this.SetSceneTrailState(!0),
        this.CFr(),
        (this.xNn = !0),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBornFinished,
        );
    }
  });
(CharacterActorComponent.az = Quat_1.Quat.Create()),
  (CharacterActorComponent.pFr = void 0),
  (CharacterActorComponent.Lz = Vector_1.Vector.Create()),
  (CharacterActorComponent = CharacterActorComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(3)],
      CharacterActorComponent,
    )),
  (exports.CharacterActorComponent = CharacterActorComponent);
//# sourceMappingURL=CharacterActorComponent.js.map
