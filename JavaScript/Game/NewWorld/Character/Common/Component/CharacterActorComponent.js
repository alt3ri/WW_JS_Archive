"use strict";
let CharacterActorComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    let r;
    const o = arguments.length;
    let h =
      o < 3 ? i : s === null ? (s = Object.getOwnPropertyDescriptor(i, e)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(t, i, e, s);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (r = t[a]) && (h = (o < 3 ? r(h) : o > 3 ? r(i, e, h) : r(i, e)) || h);
    return o > 3 && h && Object.defineProperty(i, e, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterActorComponent =
    exports.LockOnConfig =
    exports.LockOnPart =
    exports.AimPart =
    exports.FIX_SPAWN_TRACE_HEIGHT =
      void 0);
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const Net_1 = require("../../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const CollisionUtils_1 = require("../../../../../Core/Utils/CollisionUtils");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
const CombatDebugController_1 = require("../../../../Utils/CombatDebugController");
const BlackboardController_1 = require("../../../../World/Controller/BlackboardController");
const BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent");
const FunctionRequestProxy_1 = require("./Actor/FunctionRequestProxy");
const BaseCharacterComponent_1 = require("./BaseCharacterComponent");
const INIT_LOCATION_KEY = "InitLocation";
const MAX_NO_ROTATER_ANGLE = 10;
const PHYSIC_STREAMING_CHECK_PERIOD = 500;
const PHYSIC_STREAMING_CHECK_RANGE = 1e3;
const oldLockOnPartNames =
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
const lockOnEnhancedTags = [-336338240, -164894127];
class AimPart {
  constructor(t, i) {
    (this.Owner = i),
      (this.BoneName = void 0),
      (this.BoneNameString = ""),
      (this.Offset = Vector_1.Vector.Create()),
      (this.RadiusIn = 0),
      (this.RadiusOut = 0),
      (this.RadiusOutOnStart = 0),
      (this.MobileCorrect = 0),
      (this.GamePadCorrect = 0),
      (this.IgnoreCollisionBoneName = ""),
      (this.BoneNameString = t.BoneName),
      (this.BoneName = new UE.FName(this.BoneNameString)),
      this.Offset.DeepCopy(t.Offset),
      (this.RadiusIn = t.RadiusIn),
      (this.RadiusOut = t.RadiusOut),
      (this.RadiusOutOnStart = t.RadiusOutOnStart),
      (this.MobileCorrect = t.MobileCorrect),
      (this.GamePadCorrect = t.GamePadCorrect),
      (this.IgnoreCollisionBoneName = t.忽略的骨骼碰撞);
  }
  GetRadius(t) {
    let i = t ? this.RadiusOutOnStart : this.RadiusOut;
    return (
      ModelManager_1.ModelManager.PlatformModel.IsGamepad()
        ? (i *= this.GamePadCorrect)
        : ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
          (i *= this.MobileCorrect),
      i
    );
  }
}
exports.AimPart = AimPart;
class LockOnPart {
  constructor(t) {
    (this.BoneName = void 0),
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
        (this.uFr = void 0),
        (this.cFr = Vector_1.Vector.Create(0, 0, 0)),
        (this.mFr = Rotator_1.Rotator.Create(0, 0, 0)),
        (this.UseControllerRotation = Rotator_1.Rotator.Create(0, 0, 0)),
        (this.OverrideTurnSpeed = 0),
        (this.DisableKey = void 0),
        (this.dFr = Vector_1.Vector.Create(0, 0, 0)),
        (this.CFr = -1),
        (this.IsRoleAndCtrlByMe = !1),
        (this.IsSummonsAndCtrlByMe = !1),
        (this.gFr = Vector_1.Vector.Create(0, 0, 0)),
        (this.fFr = !0),
        (this.pFr = !1),
        (this.vFr = !1),
        (this.MFr = 0),
        (this.SFr = !0),
        (this.gIn = 3),
        (this.TGn = void 0),
        (this.v9s = void 0),
        (this.LGn = !1),
        (this.Lz = Vector_1.Vector.Create()),
        (this.ShowDebug = !1),
        (this.EFr = void 0),
        (this.IsPartHitInternal = !1),
        (this.yFr = !1),
        (this.n8e = () => {
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
        (this.IFr = () => {
          this.yFr || ((this.yFr = !0), this.TFr());
        }),
        (this.LFr = new Map()),
        (this.DFr = new Map()),
        (this.RFr = void 0),
        (this.AimParts = new Map()),
        (this.LockOnParts = new Map()),
        (this.LockOnConfig = void 0),
        (this.StartHideDistance = 0),
        (this.CompleteHideDistance = 0),
        (this.StartDitherValue = 0),
        (this.AFr = new Map()),
        (this.fIn = [!1, 0]),
        (this.DisableMeshCollisionEnabledHandle = void 0),
        (this.UFr = void 0),
        (this.DisableMeshCollisionObjectTypeHandle = void 0),
        (this.MeshHandleForCollisionType = void 0),
        (this.DGn = (t) => {
          t === 1 && this.LGn
            ? (this.Entity.UnregisterFromGameBudgetController(),
              this.AGn(this.ActorLocation))
            : t === 4 &&
              this.TGn &&
              (TimerSystem_1.TimerSystem.Remove(this.TGn),
              (this.TGn = void 0),
              this.LGn ? this.bFr() : this.UGn());
        });
    }
    get EnableVoxelDetection() {
      return this.SFr;
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
        (this.SFr = t);
    }
    get IsBoss() {
      return this.pFr;
    }
    get InputDirectProxy() {
      return this.cFr;
    }
    get InputDirect() {
      return this.cFr.ToUeVector();
    }
    get InputRotator() {
      return this.mFr.ToUeRotator();
    }
    get InputRotatorProxy() {
      return this.mFr;
    }
    HasMesh() {
      return !!this.SkeletalMesh?.SkeletalMesh;
    }
    get IsPartHit() {
      return this.IsPartHitInternal;
    }
    SetInputDirect(t) {
      MathUtils_1.MathUtils.IsValidVector(t)
        ? ((this.cFr.X = t.X), (this.cFr.Y = t.Y), (this.cFr.Z = t.Z))
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
        ? ((this.cFr.X = t), (this.cFr.Y = i), (this.cFr.Z = e))
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
      (this.mFr.Pitch = t.Pitch),
        (this.mFr.Yaw = t.Yaw),
        (this.mFr.Roll = t.Roll);
    }
    SetInputRotatorByNumber(t, i, e) {
      (this.mFr.Pitch = t), (this.mFr.Yaw = i), (this.mFr.Roll = e);
    }
    SetOverrideTurnSpeed(t) {
      this.OverrideTurnSpeed = t;
    }
    OnInitData() {
      return (
        super.OnInitData(),
        (this.EFr = new FunctionRequestProxy_1.FunctionRequestProxy()),
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
      let i = void 0;
      if (this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Player)
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
      if (!(i = this.InitActorNew(t)) || !UE.KismetSystemLibrary.IsValid(i))
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
      const s = i;
      const r =
        (s.SetPrimitiveBlueprintTypeName(
          new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId),
        ),
        this.SetCamp(s),
        (s.CharacterActorComponent = this),
        (s.EntityId = this.Entity.Id),
        this.InitDefaultController(i),
        (this.ActorInternal = i),
        this.ActorInternal.OnDestroyed.Add(this.n8e),
        (this.IsRoleAndCtrlByMe = !1),
        s.Mesh);
      switch (this.EntityType) {
        case Protocol_1.Aki.Protocol.HBs.Proto_Player:
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
          this.CreatureDataInternal.GetPlayerId()
            ? ((s.RenderType = 0), (this.IsRoleAndCtrlByMe = !0))
            : (s.RenderType = 1);
          break;
        case Protocol_1.Aki.Protocol.HBs.Proto_Npc:
          s.RenderType = 3;
          var o = this.Actor.K2_GetComponentsByClass(
            UE.SkeletalMeshComponent.StaticClass(),
          );
          for (let t = 0; t < o.Num(); t++) {
            const h = o.Get(t);
            h.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(!0),
              h.SetSkeletalMeshScreenSizeCullRatio(0.001);
          }
          break;
        case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
          (s.RenderType = 2),
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
              this.CreatureDataInternal.GetPlayerId() &&
              (this.IsSummonsAndCtrlByMe = !0),
            !r ||
            (this.CreatureData.GetBaseInfo()?.Category.MonsterMatchType !== 0 &&
              this.CreatureData.GetPbDataId() !== 611000008 &&
              this.CreatureData.GetPbDataId() !== 611000009 &&
              this.CreatureData.GetPbDataId() !== 611000010)
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
        case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
          (s.RenderType = 4),
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
              this.CreatureDataInternal.GetPlayerId() &&
              (this.IsSummonsAndCtrlByMe = !0);
          break;
        case Protocol_1.Aki.Protocol.HBs.Proto_Animal:
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
        s.RenderType === 3 &&
          s.CharRenderingComponent.UpdateNpcDitherComponent(),
        (s.AutoPossessAI = 3),
        this.SetInputRotator(this.ActorRotationProxy);
      e = this.CreatureDataInternal.GetInitLocation();
      return (
        e ? this.SetInitLocation(e) : this.SetInitLocation(this.ActorLocation),
        this.InitSizeInternal(),
        !0
      );
    }
    InitDefaultController(t) {
      (this.uFr = t.GetController()),
        this.EntityType !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
        this.EntityType !== Protocol_1.Aki.Protocol.HBs.Proto_Vision &&
        this.EntityType !== Protocol_1.Aki.Protocol.HBs.Proto_Npc
          ? this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Animal &&
            this.SetDefaultMovementMode(t)
          : this.uFr
            ? (this.uFr instanceof UE.AIController ||
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
                    ["DefaultController", this.uFr],
                  )),
              this.uFr instanceof UE.PlayerController &&
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
                this.uFr.Pawn === t &&
                  this.uFr.Pawn.DetachFromControllerPendingDestroy(),
                (this.uFr = void 0),
                this.CreateDefaultController(t)))
            : this.CreateDefaultController(t);
    }
    SetDefaultMovementMode(t) {
      t.CharacterMovement.SetDefaultMovementMode();
    }
    CreateDefaultController(t) {
      (t.AIControllerClass = UE.KuroAIController.StaticClass()),
        t.SpawnDefaultController(),
        (this.uFr = t.GetController());
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
      const o = new FunctionRequestProxy_1.FunctionRequestWithPriority();
      return (
        (o.ModuleName = i),
        (o.Priority = e),
        !!this.EFr.DecideCall(o) &&
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
      let h;
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
            this.EFr.DecideCall(h))
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
      let r;
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
          this.EFr.DecideCall(r) ||
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
          this.DebugMovementComp.MarkDebugRecord(i + ".SetActorTransform", 1),
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
          this.DebugMovementComp.MarkDebugRecord(e + ".SetActorTransform", 1),
        this.ResetTransformCachedTime(),
        t
      );
    }
    KuroMoveAlongFloor(t, i, e = "unknown") {
      this.Actor.CharacterMovement.KuroMoveAlongFloor(t, i),
        this.ResetLocationCachedTime(),
        this.DebugMovementComp && this.DebugMovementComp.MarkDebugRecord(e, 1);
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
      let t;
      const i = this.Actor;
      return (
        (this.DebugMovementComp = this.Entity.GetComponent(27)),
        i
          ? (GlobalData_1.GlobalData.BpFightManager.添加Debug的对象(this.Actor),
            this.xFr(),
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
            this.wFr(),
            ModelManager_1.ModelManager.SundryModel.RoleMoveDebugLogOn &&
              this.IsRoleAndCtrlByMe &&
              (i.RootComponent.bKuroMoveDebugLog = !0),
            CameraController_1.CameraController.LoadCharacterCameraConfig(
              i.DtCameraConfig,
            ),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.FixBornLocation,
              this.IFr,
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
      super.OnActivate(),
        this.BFr(),
        this.SetActorVisible(
          !0,
          "[CharacterActorComponent.OnActivate] Visible",
        ),
        this.SetCollisionEnable(
          !0,
          "[CharacterActorComponent.OnActivate] Visible",
        ),
        this.SetTickEnable(!0, "[CharacterActorComponent.OnActivate] Visible"),
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
          ? (ModelManager_1.ModelManager.WorldModel?.CurEnvironmentInfo
              .CaveMode === 3
              ? this.AGn(this.ActorLocation)
              : this.UGn(),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.OnEncloseSpaceTypeChange,
              this.DGn,
            ))
          : this.UGn();
    }
    OnTick(t) {
      super.OnTick(t),
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          (this.vFr ||
            (this.IsAutonomousProxy && !this.IsMoveAutonomousProxy)) &&
          ((this.MFr -= t * MathUtils_1.MathUtils.MillisecondToSecond),
          this.MFr <= 0) &&
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
          (this.ActorInternal.OnDestroyed.Remove(this.n8e),
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
          this.IFr,
        ),
        this.Entity.IsEncloseSpace &&
          (this.TGn &&
            (TimerSystem_1.TimerSystem.Remove(this.TGn), (this.TGn = void 0)),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnEncloseSpaceTypeChange,
            this.DGn,
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
        this.SetInputRotatorByNumber(0, 0, 0),
        this.DisableMeshCollisionEnabledHandle.Clear(),
        this.DisableMeshCollisionObjectTypeHandle.Clear(),
        this.HolographicEffectActor &&
          ActorSystem_1.ActorSystem.Put(this.HolographicEffectActor),
        !(this.v9s = void 0)
      );
    }
    OnEnable() {
      this.OnSetActorActive(!0), this.ResetAllCachedTime();
    }
    OnDisable(t) {
      this.OnSetActorActive(!1, t);
    }
    OnChangeTimeDilation(t) {
      const i = this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1;
      this.ActorInternal.CustomTimeDilation = t * i;
    }
    bFr() {
      this.ActorInternal
        ? GameBudgetInterfaceController_1.GameBudgetInterfaceController
            .IsOpen &&
          (void 0 !== this.Entity.GameBudgetManagedToken
            ? (cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(
                this.Entity.GameBudgetConfig.GroupName,
                this.Entity.GameBudgetManagedToken,
                this.ActorInternal,
              ),
              this.Entity.GetComponent(158)?.IsInFighting &&
                cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(
                  this.Entity.GameBudgetConfig.GroupName,
                  this.Entity.GameBudgetManagedToken,
                  !0,
                ))
            : this.Entity.RegisterToGameBudgetController(this.ActorInternal),
          this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
          this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Vision
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
      super.ResetAllCachedTime(), (this.CFr = -1);
    }
    ResetCachedVelocityTime() {
      this.CFr = 0;
    }
    OnSetActorActive(i, t) {
      if (
        (super.OnSetActorActive(i, t),
        i && this.Entity.GetComponent(36)?.StopMove(!i),
        this.Actor?.IsValid())
      ) {
        var t = this.Actor.GetComponentByClass(
          UE.NavigationInvokerComponent.StaticClass(),
        );
        var t = (t && t.SetActive(i), (0, puerts_1.$ref)(void 0));
        const e =
          (this.Actor.GetAttachedActors(t, !0), (0, puerts_1.$unref)(t));
        for (let t = 0; t < e.Num(); ++t) e.Get(t).SetActorHiddenInGame(!i);
        t = this.Actor.DitherEffectController;
        t && (i ? t.SetIsDisable(!1, 1) : t.SetIsDisable(!0)),
          this.SetActorXRayState(!1);
      }
    }
    GFr(t) {
      const i = CollisionUtils_1.CollisionUtils.GetCollisionResponseContainer();
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
        this.NFr(this.Actor.CapsuleComponent),
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
    TFr() {
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
      this.uFr ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            58,
            "[CharacterActorComponent.RestoreDefaultController] 没有DefaultController,将导致这个实体部分功能失效比如移动,查看OnStart 有无正常初始化DefaultController",
            ["Id", this.Entity.Id],
          )),
        this.uFr.Possess(this.Actor);
    }
    get ActorVelocityProxy() {
      return (
        this.CFr < Time_1.Time.Frame &&
          ((this.CFr = Time_1.Time.Frame),
          this.dFr.DeepCopy(this.Actor.GetVelocity())),
        this.dFr
      );
    }
    get IsActorMoveInfoCache() {
      return !(
        this.CachedLocationTime < Time_1.Time.Frame ||
        this.CachedRotationTime < Time_1.Time.Frame ||
        this.CFr < Time_1.Time.Frame
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
      return this.fFr;
    }
    GetRadius() {
      return this.RadiusInternal;
    }
    get FloorLocation() {
      return (
        this.gFr.FromUeVector(this.ActorLocationProxy),
        (this.gFr.Z -= this.ScaledHalfHeight),
        this.gFr
      );
    }
    SetRadiusAndHalfHeight(t, i, e = !0) {
      (this.fFr = !1),
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
      const t = this.ActorLocationProxy;
      const i =
        ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
      const e =
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
        (this.fFr = !0);
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
        this.SetInputRotator(this.ActorRotationProxy),
        this.SetOverrideTurnSpeed(0);
    }
    wFr() {
      const t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
        this.Actor.GetClass(),
      );
      const i = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t);
      const l =
        ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
          i,
        )?.PartHitEffect.ToAssetPathName();
      let _ = void 0 !== l && l.length > 0 && l !== "None";
      _
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            l,
            UE.BP_PartHitEffect_C,
            (t) => {
              if (this.Actor?.IsValid()) {
                if (
                  ((this.RFr = t),
                  (_ = this.RFr?.IsValid() ?? !1) && this.Actor)
                ) {
                  let i = this.RFr.PartCollision.Num();
                  for (let t = 0; t < i; t++) {
                    const e = this.RFr.PartCollision.Get(t);
                    this.LFr.set(e.BoneName, e);
                  }
                  (_ = !1), (i = this.Actor.Mesh.GetNumChildrenComponents());
                  for (let t = 0; t < i; t++) {
                    const s = this.Actor.Mesh.GetChildComponent(t);
                    const r = s.GetName();
                    const o = this.LFr.get(r);
                    this.DFr.set(r, s),
                      o
                        ? ((_ = !0),
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
                            ["PartHitEffect路径", l],
                            ["Component Name", r],
                          );
                  }
                  (i = this.RFr.AimParts.Num()), this.AimParts.clear();
                  for (let t = 0; t < i; ++t) {
                    const h = new AimPart(this.RFr.AimParts.Get(t), this);
                    this.AimParts.set(h.BoneNameString, h);
                  }
                  (i = this.RFr.LockOnParts.Num()), this.LockOnParts.clear();
                  for (let t = 0; t < i; ++t) {
                    const a = new LockOnPart(this.RFr.LockOnParts.Get(t));
                    this.LockOnParts.set(a.BoneNameString, a);
                  }
                  for (const c of oldLockOnPartNames) {
                    var n;
                    this.LockOnParts.get(c.toString()) ||
                      (this.Actor.Mesh.DoesSocketExist(c) &&
                        ((n = new LockOnPart(c)),
                        this.LockOnParts.set(n.BoneNameString, n)));
                  }
                  (this.StartHideDistance = this.RFr.StartHideDistance),
                    (this.CompleteHideDistance = this.RFr.CompleteHideDistance),
                    (this.StartDitherValue = this.RFr.StartDitherValue),
                    (this.LockOnConfig = new LockOnConfig(
                      this.RFr.LockOnConfig,
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
                  this.GFr(_);
              }
            },
          )
        : ((this.Actor.CapsuleComponent.CanCharacterStepUpOn = 0), this.GFr(_));
    }
    GetBoneLocation(t) {
      const i = this.DFr.get(t);
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
    qFr() {
      const t = this.CreatureDataInternal.GetModelConfig();
      t &&
        t?.IsHiddenWithCamera &&
        this.Actor.CharRenderingComponent.SetCapsuleDither(1);
    }
    SetMoveControlled(t, i = 2, e = "") {
      (this.vFr = !0),
        (this.MFr = i),
        this.IsMoveAutonomousProxy !== t &&
          (t
            ? (this.SetMoveAutonomous(!0, e),
              (i = this.Entity.GetComponent(36)) &&
                (i.StopAllAddMove(),
                i.SetAddMoveOffset(void 0),
                i.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy)),
              this.Entity.GetComponent(57)?.ClearReplaySamples())
            : this.SetMoveAutonomous(!1, e),
          this.Entity.GetComponent(41)?.ClearOrders());
    }
    ResetMoveControlled(t = "") {
      (this.vFr = !1),
        (this.MFr = 0),
        this.SetMoveAutonomous(this.IsAutonomousProxy, t);
    }
    SetAutonomous(t, i = void 0) {
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Control",
        this.Entity,
        "设置逻辑主控",
        ["v", t],
      ),
        super.SetAutonomous(t, i);
    }
    SetMoveAutonomous(t, i = "") {
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Control",
        this.Entity,
        "设置移动主控",
        [i, t],
      ),
        super.SetMoveAutonomous(t);
      i = this.Entity.GetComponent(160);
      i &&
        (i.MainAnimInstance?.SetStateMachineNetMode(!t),
        i.SpecialAnimInstance?.SetStateMachineNetMode(!t));
    }
    GetPartHitConf(t) {
      return this.LFr.get(t);
    }
    xFr() {
      let t;
      this.EntityType !== Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
        !(t =
          this.Entity.GetComponent(0)?.GetBaseInfo()?.Category
            ?.MonsterMatchType) ||
        (t !== 3 && t !== 2) ||
        (this.pFr = !0);
    }
    SetPartPassiveCollision(t, i = !0) {
      (t.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap = !0),
        t.KuroSetPassiveCollision(!0, i);
    }
    IsPartComponentEnable(t) {
      return !this.AFr.has(t) || this.AFr.get(t);
    }
    SetPartCollisionSwitch(t, i, e, s) {
      let r;
      const o = this.DFr.get(t);
      o?.IsValid()
        ? (this.NFr(o),
          ((r =
            CollisionUtils_1.CollisionUtils.GetCollisionResponseContainer()).Pawn =
            r.GameTraceChannel5 =
            r.GameTraceChannel8 =
              i ? 2 : 1),
          (r.Camera = s ? 2 : 1),
          (r.GameTraceChannel6 = r.GameTraceChannel16 = e ? 1 : 0),
          this.AFr.set(t, e),
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
      return this.LFr.get(t);
    }
    BFr() {
      let t = this.Entity.GetComponent(0)?.GetEntityType();
      if (Protocol_1.Aki.Protocol.HBs.Proto_Monster === t) {
        const i = this.Entity.GetComponent(185);
        if (this.LockOnConfig?.IsOpened)
          for (const s of lockOnEnhancedTags) i?.AddTag(s);
        t = this.Entity.GetComponent(0)?.GetMonsterComponent()?.InitGasTag;
        if (t && t.length > 0)
          for (const r of t) {
            const e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r);
            e && i?.AddTag(e);
          }
      }
    }
    NFr(t) {
      this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
      this.Entity.GetComponent(0)?.GetEntityCamp() === 0
        ? t.SetCollisionObjectType(
            QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
          )
        : this.Entity.GetComponent(0)?.GetEntityCamp() === 1
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
      let t;
      return (
        this.gIn === 3 &&
          ((t = this.Entity.GetComponent(161)?.MovementData),
          (this.gIn = t?.WanderDirection ?? 0)),
        this.gIn
      );
    }
    GetWanderDirection(t, i, e) {
      return (
        this.Lz.DeepCopy(t),
        e === 1 && this.Lz.MultiplyEqual(-1),
        this.WanderDirectionType !== 2 ||
          ((t = MathUtils_1.MathUtils.WrapAngle(
            MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz) -
              this.ActorRotationProxy.Yaw,
          )),
          Math.abs(Math.abs(t) - 90) < MAX_NO_ROTATER_ANGLE) ||
          (this.Lz.CrossProduct(this.ActorUpProxy, this.Lz),
          i.Y > 0 && this.Lz.MultiplyEqual(-1)),
        this.Lz
      );
    }
    GetNearestDirection(t, i) {
      if ((this.Lz.DeepCopy(t), this.WanderDirectionType === 2)) {
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
      else if (this.WanderDirectionType === 0) this.SetInputDirect(t);
      else {
        let t = !0;
        if (
          Time_1.Time.Now - this.fIn[1] <
          CommonDefine_1.MILLIONSECOND_PER_SECOND
        )
          t = this.fIn[0];
        else {
          if (this.WanderDirectionType === 1) t = i.X > 0;
          else {
            if (this.WanderDirectionType !== 2) return;
            t = i.Y > 0;
          }
          this.fIn[0] !== t &&
            ((this.fIn[0] = t), (this.fIn[1] = Time_1.Time.Now));
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
          this.Actor.Mesh.GetCollisionEnabled() !== 0 &&
          this.Actor.Mesh.SetCollisionEnabled(0),
        t
      );
    }
    SetMeshCollisionEnabled(t, i) {
      return t !== 0
        ? !this.UFr &&
            ((this.UFr = this.SetOtherMeshCollisionEnabled(t, i)), !0)
        : !(
            !this.UFr ||
            (this.ResetMeshEnableCollision(this.UFr), (this.UFr = void 0))
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
          this.Actor.Mesh.GetCollisionObjectType() !== 2 &&
          this.Actor.Mesh.SetCollisionObjectType(2),
        t
      );
    }
    SetMeshCollisionObjectType(t, i) {
      return t !== 2
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
        const i = this.Actor;
        if (i.Mesh.DoesSocketExist(t)) return i.Mesh.GetSocketTransform(t, 0);
      }
      return this.ActorTransform;
    }
    GetSocketLocation(t) {
      if (!FNameUtil_1.FNameUtil.IsNothing(t)) {
        const i = this.Actor.Mesh;
        if (i.DoesSocketExist(t)) return i.GetSocketLocation(t);
      }
      return this.ActorLocation;
    }
    SetActorXRayState(i) {
      this.IsRoleAndCtrlByMe &&
        (this.Actor.Mesh?.SetRenderInKuroXRayPass(i),
        this.v9s?.forEach((t) => {
          t?.SetRenderInKuroXRayPass(i);
        }));
    }
    SetActorXRayColor(i) {
      this.IsRoleAndCtrlByMe &&
        (this.Actor.Mesh?.SetKuroXRayColor(i),
        this.v9s?.forEach((t) => {
          t?.SetKuroXRayColor(i);
        }));
    }
    SetSceneTrailState(t) {
      this.SkeletalMesh && this.SkeletalMesh.SetRenderKuroTrail(t);
    }
    AddExtraSkeletalMeshComponent(t) {
      this.v9s || (this.v9s = []), this.v9s.push(t);
    }
    GetExtraSkeletalMeshComponent() {
      return this.v9s;
    }
    AGn(t) {
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
            this.TGn && TimerSystem_1.TimerSystem.Remove(this.TGn),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("World", 7, "等待物理流送(开始)", [
                "PbDataId:",
                this.CreatureData.GetPbDataId(),
              ]),
            (this.TGn = TimerSystem_1.TimerSystem.Forever(() => {
              i.IsStreamingCompletedWithPhysicsReady(1, e) &&
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("World", 7, "等待物理流送(结束)", [
                    "PbDataId:",
                    this.CreatureData?.GetPbDataId(),
                  ]),
                this.Entity?.Valid) &&
                (TimerSystem_1.TimerSystem.Remove(this.TGn),
                (this.TGn = void 0),
                this.LGn ? this.bFr() : this.UGn());
            }, PHYSIC_STREAMING_CHECK_PERIOD));
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              7,
              "[WaitForPhysicStreaming]location参数无效,无法生成实体",
              ["PbDataId", this.CreatureData.GetPbDataId()],
            );
      else this.UGn();
    }
    UGn() {
      this.bFr(),
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
          Protocol_1.Aki.Protocol.sOs.Proto_BigWorldInstance ||
        ModelManager_1.ModelManager.GameModeModel.RenderAssetDone
          ? !0
          : t) && ((this.yFr = !0), this.TFr());
      const i = Protocol_1.Aki.Protocol.f_s.create();
      var e = this.Entity.GetComponent(0).GetCreatureDataId();
      var e =
        (i.sfs.push(MathUtils_1.MathUtils.NumberToLong(e)),
        Net_1.Net.Call(8784, i, (t) => {}),
        this.Entity.GetComponent(38));
      e &&
        e.SetLoadCompletePlayer(
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
        ),
        this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
        this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Vision
          ? this.SetSceneTrailState(!0)
          : this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
            (this.SetNpcBornMaterial(),
            this.SetNpcBornEffect(),
            this.Actor.CharRenderingComponent.UpdateNpcDitherComponent()),
        this.qFr(),
        (this.LGn = !0),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBornFinished,
        );
    }
  });
(CharacterActorComponent.OFr = void 0),
  (CharacterActorComponent.Lz = Vector_1.Vector.Create()),
  (CharacterActorComponent = CharacterActorComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(3)],
      CharacterActorComponent,
    )),
  (exports.CharacterActorComponent = CharacterActorComponent);
// # sourceMappingURL=CharacterActorComponent.js.map
