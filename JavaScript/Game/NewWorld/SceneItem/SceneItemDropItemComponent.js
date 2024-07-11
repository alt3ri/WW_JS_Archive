"use strict";
var SceneItemDropItemComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, o) {
      var s,
        _ = arguments.length,
        a =
          _ < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, o);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (s = t[r]) &&
            (a = (_ < 3 ? s(a) : 3 < _ ? s(e, i, a) : s(e, i)) || a);
      return 3 < _ && a && Object.defineProperty(e, i, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemDropItemComponent = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RewardController_1 = require("../../Module/Reward/RewardController"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  LINEARDAMPING = 0,
  ANGULARDAMPING = 0,
  CHECK_WATER_OFFSET_Z = 10,
  COLLISION_PROFILE_NAME = new UE.FName("DropItem"),
  PICKUP_AUDIO_EVENT_NAME = "play_ui_fb_pickup",
  PHYSICAL_MATERIAL_PATH =
    "/Game/Aki/Scene/PhysMaterial/PM_DropItem.PM_DropItem",
  PARABOLIC_EFFECT =
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_Xingxing_001.DA_Fx_Xingxing_001",
  BORN_EFFECTS = [
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_001.DA_Fx_UI_Sence_Diaoluo_001",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_002.DA_Fx_UI_Sence_Diaoluo_002",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_003.DA_Fx_UI_Sence_Diaoluo_003",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_004.DA_Fx_UI_Sence_Diaoluo_004",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_005.DA_Fx_UI_Sence_Diaoluo_005",
  ],
  TRAIL_EFFECTS = [
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_001.DA_Fx_UI_Sence_Trail_001",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_002.DA_Fx_UI_Sence_Trail_002",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_003.DA_Fx_UI_Sence_Trail_003",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_004.DA_Fx_UI_Sence_Trail_004",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_005.DA_Fx_UI_Sence_Trail_005",
  ],
  DESTROY_EFFECTS = [
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_001.DA_Fx_UI_Sence_Xiaosan_001",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_002.DA_Fx_UI_Sence_Xiaosan_002",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_003.DA_Fx_UI_Sence_Xiaosan_003",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_004.DA_Fx_UI_Sence_Xiaosan_004",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_005.DA_Fx_UI_Sence_Xiaosan_005",
  ];
class DropItemData {
  constructor() {
    (this.ConfigId = 0),
      (this.Config = void 0),
      (this.ItemCount = 0),
      (this.ShowPlanId = 0),
      (this.AdsorptionType = void 0),
      (this.StartSpeed = -0),
      (this.RotationProtectTime = -0),
      (this.AdsorptionTime = 0),
      (this.AdsorptionProtectTime = 0.2),
      (this.QualityIndex = -0),
      (this.DropState = 0),
      (this.MeshIsInited = !1),
      (this.DropFinished = !1);
  }
}
let SceneItemDropItemComponent =
  (SceneItemDropItemComponent_1 = class SceneItemDropItemComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Ovr = void 0),
        (this.Hte = void 0),
        (this.Jdn = !1),
        (this.zdn = !1),
        (this.Zdn = 0),
        (this.fGt = void 0),
        (this.eCn = void 0),
        (this.tCn = void 0),
        (this.iCn = void 0),
        (this.oCn = Vector_1.Vector.Create()),
        (this.KHr = (t) => {
          this.fGt &&
            !this.fGt.DropFinished &&
            this.fGt.MeshIsInited &&
            ((t = t / CommonDefine_1.MILLIONSECOND_PER_SECOND),
            this.CheckDropRotation(t),
            this.rCn(t));
        }),
        (this.nCn = () => {
          0 <= this.Hte.StaticMesh.GetComponentVelocity().Z ||
            ((this.fGt.DropState = 1),
            this.oCn.DeepCopy(this.Hte.ActorLocationProxy),
            this.Hte.StaticMesh.SetNotifyRigidBodyCollision(!1));
        }),
        (this.sCn = () => {
          var t = this.Hte.StaticMesh.GetComponentVelocity(),
            e =
              ConfigManager_1.ConfigManager.RewardConfig.GetFallToGroundSpeed();
          (!this.aCn() &&
            (this.oCn.DeepCopy(this.Hte.ActorLocationProxy),
            t.Size() >= Math.pow(e, 2))) ||
            (this.Hte.StaticMesh.SetSimulatePhysics(!1),
            this.Hte.StaticMesh.SetUseCCD(!1),
            EffectSystem_1.EffectSystem.IsValid(this.Zdn) &&
              EffectSystem_1.EffectSystem.StopEffectById(
                this.Zdn,
                "[SceneItemDropItemComponent.DownProcess]",
                !0,
              ),
            (this.Zdn = EffectSystem_1.EffectSystem.SpawnEffect(
              GlobalData_1.GlobalData.World,
              this.Hte.ActorTransform,
              BORN_EFFECTS[this.fGt.QualityIndex],
              "[SceneItemDropItemComponent.DownProcess]",
              new EffectContext_1.EffectContext(this.Entity.Id),
            )),
            EffectSystem_1.EffectSystem.IsValid(this.Zdn) &&
              EffectSystem_1.EffectSystem.GetEffectActor(
                this.Zdn,
              )?.K2_AttachToComponent(
                this.Hte.StaticMesh,
                FNameUtil_1.FNameUtil.EMPTY,
                2,
                1,
                0,
                !0,
              ),
            (this.fGt.DropState = 2));
        }),
        (this.hCn = (t) => {
          0 === this.fGt.AdsorptionType
            ? (this.fGt.DropState = 4)
            : ((this.fGt.AdsorptionProtectTime -= t),
              0 < this.fGt.AdsorptionProtectTime ||
                (this.lCn(), (this.fGt.DropState = 3)));
        }),
        (this._Cn = (t) => {
          this.fGt.AdsorptionTime += t;
          var e,
            i,
            o = ConfigManager_1.ConfigManager.RewardConfig.GetMaxAdsorption();
          this.fGt.AdsorptionTime > o
            ? this.uCn()
            : (o = Global_1.Global.BaseCharacter) &&
              ((e = SceneItemDropItemComponent_1.cz),
              (i = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
                o.CharacterActorComponent.ActorLocationProxy,
              ),
              i.Subtraction(this.Hte.ActorLocationProxy, e),
              (o = e.SizeSquared()),
              (i =
                ConfigManager_1.ConfigManager.RewardConfig.GetPickUpInBagRange()),
              o < Math.pow(i, 2)
                ? this.uCn()
                : o > Math.pow(this.fGt.StartSpeed * t, 2) &&
                  (e.Normalize(),
                  e.MultiplyEqual(this.fGt.StartSpeed * t),
                  e.AdditionEqual(this.Hte.ActorLocationProxy),
                  this.Hte.StaticMesh.K2_SetWorldLocation(
                    e.ToUeVector(),
                    !1,
                    void 0,
                    !1,
                  ),
                  (i =
                    ConfigManager_1.ConfigManager.RewardConfig.GetDropItemAcceleration()),
                  (this.fGt.StartSpeed = this.fGt.StartSpeed + i)));
        }),
        (this.cCn = () => {
          var t,
            e,
            i = Global_1.Global.BaseCharacter;
          i &&
            ((t = SceneItemDropItemComponent_1.cz),
            (e = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
              i.CharacterActorComponent.ActorLocationProxy,
            ),
            e.Subtraction(this.Hte.ActorLocationProxy, t),
            (i =
              ConfigManager_1.ConfigManager.RewardConfig.GetDropItemPickUpRange()),
            t.SizeSquared() > Math.pow(i, 2)) &&
            this.uCn();
        });
    }
    get DropItemConfig() {
      return this.fGt;
    }
    OnClear() {
      return (
        EffectSystem_1.EffectSystem.IsValid(this.Zdn) &&
          (EffectSystem_1.EffectSystem.StopEffectById(
            this.Zdn,
            "[SceneItemDropItemComponent.OnClear]",
            !0,
          ),
          (this.Zdn = 0)),
        this.iCn &&
          (TimerSystem_1.TimerSystem.Remove(this.iCn), (this.iCn = void 0)),
        this.tCn &&
          (EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.DropItemStarted,
            this.tCn,
          ) &&
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.DropItemStarted,
              this.tCn,
            ),
          (this.tCn = void 0)),
        !0
      );
    }
    OnInitData() {
      this.Ovr = this.Entity.GetComponent(0);
      var t = this.Ovr.ComponentDataMap.get("dys");
      return (
        !!t &&
        (this.pie(t.dys), !!this.fGt) &&
        (this.mCn(t.dys) && (this.Jdn = !0), !0)
      );
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(185)),
        this.InitDropStateFunction(),
        !0
      );
    }
    OnActivate() {
      (this.zdn = !0),
        this.Jdn && (this.dCn(), this.Hte?.Owner?.SetActorHiddenInGame(!1)),
        !Info_1.Info.EnableForceTick &&
          this.Active &&
          ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
            this,
            this.KHr,
          );
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.KHr,
        );
    }
    OnDisable(t) {
      Info_1.Info.EnableForceTick ||
        ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
          this,
        );
    }
    OnEnd() {
      return (
        Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
        !0
      );
    }
    pie(t) {
      var e,
        i = t.f8n,
        o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          i,
          !0,
        );
      o
        ? o.Mesh
          ? ((this.fGt = new DropItemData()),
            (this.fGt.ConfigId = i),
            (this.fGt.Config = o),
            (this.fGt.ItemCount = t.YVn),
            (this.fGt.ShowPlanId = t.q9n),
            (t = (e =
              ConfigManager_1.ConfigManager.RewardConfig).GetDropShowPlan(
              t.q9n,
            )),
            (this.fGt.AdsorptionType = t?.Adsorption),
            (this.fGt.StartSpeed = e.GetSpeed()),
            (this.fGt.RotationProtectTime = e.GetDropRotationProtectTime()),
            (t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
              o.QualityId,
            )),
            (this.fGt.QualityIndex = t.Id - 1))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("World", 11, "掉落配置查询Mesh字段配置为空", [
              "道具id",
              i,
            ])
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 11, "掉落配置查询数据为空", ["道具id", i]);
    }
    mCn(t) {
      if (!t.v5n) return !0;
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.v5n);
      if (!t) return !0;
      if (
        t.Entity.GetComponent(0).GetEntityType() !==
        Protocol_1.Aki.Protocol.wks.Proto_Monster
      )
        return !0;
      var e = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "drop_item_show_time",
      );
      e &&
        (this.iCn = TimerSystem_1.TimerSystem.Delay(() => {
          (this.iCn = void 0), this.CCn();
        }, e * CommonDefine_1.MILLIONSECOND_PER_SECOND));
      const i = t.Id;
      return (
        (this.tCn = (t) => {
          i === t && this.CCn();
        }),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.DropItemStarted,
          this.tCn,
        ),
        !1
      );
    }
    CCn() {
      this.iCn &&
        (TimerSystem_1.TimerSystem.Remove(this.iCn), (this.iCn = void 0)),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.DropItemStarted,
          this.tCn,
        ) &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.DropItemStarted,
            this.tCn,
          ),
          (this.tCn = void 0)),
        this.Jdn ||
          ((this.Jdn = !0),
          this.zdn &&
            (this.dCn(), this.Entity?.IsInit) &&
            this.Hte?.Owner &&
            this.Hte.Owner.SetActorHiddenInGame(!1));
    }
    dCn() {
      this.Khn(), this.gCn(), this.fCn();
    }
    pCn() {
      var t = this.Hte.Owner.GetComponentByClass(
          UE.SphereComponent.StaticClass(),
        ),
        e = this.Hte.ActorLocationProxy,
        i = ConfigManager_1.ConfigManager.RewardConfig.GetDropChestOffsetZ(),
        t = t.GetScaledSphereRadius(),
        o = ModelManager_1.ModelManager.RewardModel.CheckGroundHit(e, t, i),
        s = MathUtils_1.MathUtils.CommonTempVector;
      s.FromUeVector(e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            7,
            "掉落初始位置修正前",
            ["CreatureDataId", this.Ovr.GetCreatureDataId()],
            ["EntityId", this.Entity.Id],
            ["Location", s],
            ["Radius", t],
          ),
        o &&
          ((s.Z += i),
          this.Hte.SetActorLocation(s.ToUeVector(), this.constructor.name, !1),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "World",
            7,
            "掉落初始位置修正后",
            ["CreatureDataId", this.Ovr.GetCreatureDataId()],
            ["EntityId", this.Entity.Id],
            ["Location", s],
            ["zOffset", i],
          );
    }
    Khn() {
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.fGt.Config.Mesh,
        UE.Object,
        (t, e) => {
          var i = this.Hte?.StaticMesh;
          i?.IsValid() &&
            t?.IsValid() &&
            (this.pCn(),
            (this.fGt.MeshIsInited = !0),
            t instanceof UE.StaticMesh &&
              (i.SetStaticMesh(t), i.SetReceivesDecals(!1)),
            i.SetLinearDamping(LINEARDAMPING),
            i.SetAngularDamping(ANGULARDAMPING),
            i.SetEnableGravity(!0),
            (t = MathUtils_1.MathUtils.CommonTempVector).Set(
              2 * Math.random() - 1,
              2 * Math.random() - 1,
              2 * Math.random() - 1,
            ),
            i.SetCenterOfMass(t.ToUeVector(), FNameUtil_1.FNameUtil.EMPTY),
            i.SetCollisionEnabled(2),
            i.SetSimulatePhysics(!0),
            i.SetCollisionProfileName(COLLISION_PROFILE_NAME),
            (t = this.Ovr.GetRotation().Yaw),
            (t = this.GetRandomForce(t)),
            i.AddImpulse(t.ToUeVector(), FNameUtil_1.FNameUtil.EMPTY, !0),
            (i.BodyInstance.bLockXRotation = !0),
            (i.BodyInstance.bLockYRotation = !0),
            i.SetConstraintMode(6),
            i.SetUseCCD(!0));
        },
      ),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          PHYSICAL_MATERIAL_PATH,
          UE.PhysicalMaterial,
          (t, e) => {
            var i = this.Hte?.StaticMesh;
            i?.IsValid() &&
              t?.IsValid() &&
              t instanceof UE.PhysicalMaterial &&
              ((t.Restitution =
                ConfigManager_1.ConfigManager.RewardConfig.GetRestitution()),
              (t.Friction =
                ConfigManager_1.ConfigManager.RewardConfig.GetFriction()),
              i.SetPhysMaterialOverride(t));
          },
        );
    }
    gCn() {
      var t = this.Hte.StaticMesh.GetRelativeTransform();
      (this.Zdn = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
        GlobalData_1.GlobalData.World,
        t,
        PARABOLIC_EFFECT,
        "[SceneItemDropItemComponent.InitEffects]",
      )),
        EffectSystem_1.EffectSystem.IsValid(this.Zdn) &&
          EffectSystem_1.EffectSystem.GetEffectActor(
            this.Zdn,
          )?.K2_AttachToComponent(
            this.Hte.StaticMesh,
            FNameUtil_1.FNameUtil.EMPTY,
            2,
            0,
            0,
            !0,
          );
    }
    fCn() {
      var t,
        e = this.Entity.GetComponent(181);
      e &&
        (e = e.GetInteractController()) &&
        (((t =
          new LevelGameplayActionsDefine_1.ActionPickupDropItem()).EntityId =
          this.Entity.Id),
        e.AddClientInteractOption(t));
    }
    OnForceTick(t) {
      this.KHr(t);
    }
    InitDropStateFunction() {
      (this.eCn = new Map()),
        this.eCn.set(0, this.nCn),
        this.eCn.set(1, this.sCn),
        this.eCn.set(2, this.hCn),
        this.eCn.set(3, this._Cn),
        this.eCn.set(4, this.cCn);
    }
    GetRandomForce(t) {
      var e,
        i,
        o,
        s = this.fGt.ShowPlanId,
        s = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(s);
      return s
        ? (((e = MathUtils_1.MathUtils.CommonTempRotator).Pitch = 0),
          (i = s.Angle[0]),
          (o = s.Angle[1]),
          (e.Roll = MathUtils_1.MathUtils.GetRandomRange(i, o)),
          (i = s.VerticalAngle[0]),
          (o = s.VerticalAngle[1]),
          (e.Yaw = MathUtils_1.MathUtils.GetRandomRange(i, o)),
          (e.Yaw += t),
          (i = Vector_1.Vector.Create(Vector_1.Vector.UpVectorProxy)),
          e.Quaternion().RotateVector(i, i),
          (o = s.Force[0]),
          (t = s.Force[1]),
          i.MultiplyEqual(Math.random() * (t - o) + o))
        : Vector_1.Vector.UpVectorProxy;
    }
    rCn(t) {
      var e;
      this.Hte.SetActorLocation(this.Hte.StaticMesh.K2_GetComponentLocation()),
        this.vCn()
          ? this.uCn()
          : (e = this.eCn.get(this.fGt.DropState)) && e(t);
    }
    lCn() {
      this.Hte.StaticMesh.SetCollisionEnabled(0),
        EffectSystem_1.EffectSystem.IsValid(this.Zdn) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            this.Zdn,
            "[SceneItemDropItemComponent.CreateAutoAttachEffect]",
            !0,
          ),
        (this.Zdn = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          this.Hte.ActorTransform,
          TRAIL_EFFECTS[this.fGt.QualityIndex],
          "[SceneItemDropItemComponent.CreateAutoAttachEffect]",
          new EffectContext_1.EffectContext(this.Entity.Id),
        )),
        EffectSystem_1.EffectSystem.GetEffectActor(
          this.Zdn,
        )?.K2_AttachToComponent(
          this.Hte.StaticMesh,
          FNameUtil_1.FNameUtil.EMPTY,
          2,
          1,
          0,
          !0,
        );
    }
    CheckDropRotation(t) {
      0 < this.fGt.RotationProtectTime &&
        ((this.fGt.RotationProtectTime -= t),
        this.fGt.RotationProtectTime <= 0) &&
        this.Hte.StaticMesh.SetConstraintMode(0);
    }
    vCn() {
      var t,
        e = Global_1.Global.BaseCharacter;
      return !(
        !e ||
        ((e = e.CharacterActorComponent.ActorLocation),
        (t = ConfigManager_1.ConfigManager.RewardConfig.GetHeightProtect()),
        Math.abs(e.Z - this.Hte.ActorLocationProxy.Z) < t) ||
        0 < this.Hte.StaticMesh.GetComponentVelocity().Z
      );
    }
    aCn() {
      var t = this.Hte.ActorLocationProxy,
        e = this.Hte.Owner.GetComponentByClass(
          UE.SphereComponent.StaticClass(),
        ).GetScaledSphereRadius();
      return (
        !!ModelManager_1.ModelManager.RewardModel.CheckWaterHit(
          this.oCn,
          t,
          CHECK_WATER_OFFSET_Z,
          e,
        ) &&
        ((this.fGt.DropFinished = !0),
        (this.fGt.DropState = 5),
        (t = this.Hte.StaticMesh).SetCollisionEnabled(0),
        t.SetConstraintMode(6),
        t.SetEnableGravity(!1),
        t.SetSimulatePhysics(!1),
        t.SetUseCCD(!1),
        !0)
      );
    }
    DestroyWithEffect() {
      this.Hte.StaticMesh.SetCollisionEnabled(0),
        ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(
          !1,
          this.Hte.Entity.Id,
        ),
        EffectSystem_1.EffectSystem.IsValid(this.Zdn) &&
          (EffectSystem_1.EffectSystem.StopEffectById(
            this.Zdn,
            "[SceneItemDropItemComponent.DestroyWithEffect]",
            !0,
          ),
          (this.Zdn = 0));
      var t = EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        this.Hte.ActorTransform,
        DESTROY_EFFECTS[this.fGt.QualityIndex],
        "[SceneItemDropItemComponent.DestroyWithEffect]",
        new EffectContext_1.EffectContext(this.Entity.Id),
      );
      EffectSystem_1.EffectSystem.GetEffectActor(t)?.K2_AttachToComponent(
        this.Hte.StaticMesh,
        FNameUtil_1.FNameUtil.EMPTY,
        2,
        1,
        0,
        !0,
      ),
        AudioSystem_1.AudioSystem.PostEvent(PICKUP_AUDIO_EVENT_NAME),
        this.Entity.Disable(
          "[SceneItemDropItemComponent.DestroyWithEffect] 播放销毁特效",
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DelayRemoveEntityFinished,
          this.Entity,
        );
    }
    uCn() {
      (this.fGt.DropState = 5),
        RewardController_1.RewardController.PickUpFightDrop(
          this.Ovr.GetCreatureDataId(),
          this.Ovr.GetPbDataId(),
        ),
        (this.fGt.DropFinished = !0);
    }
  });
(SceneItemDropItemComponent.cz = Vector_1.Vector.Create()),
  (SceneItemDropItemComponent = SceneItemDropItemComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(135)],
      SceneItemDropItemComponent,
    )),
  (exports.SceneItemDropItemComponent = SceneItemDropItemComponent);
//# sourceMappingURL=SceneItemDropItemComponent.js.map
