"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    let r;
    const s = arguments.length;
    let o =
      s < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(t, e, i, n);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (r = t[a]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, i, o) : r(e, i)) || o);
    return s > 3 && o && Object.defineProperty(e, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemActorComponent = void 0);
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const TsEffectActor_1 = require("../../Effect/TsEffectActor");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RenderConfig_1 = require("../../Render/Config/RenderConfig");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines");
const BaseActorComponent_1 = require("../Common/Component/BaseActorComponent");
const PROFILE_KEY = "SceneItemActorFixBornLocation";
const FIX_SPAWN_TRACE_UP = 20;
const FIX_SPAWN_TRACE_DOWN = -1e3;
let SceneItemActorComponent = class SceneItemActorComponent extends BaseActorComponent_1.BaseActorComponent {
  constructor() {
    super(...arguments),
      (this.Smn = void 0),
      (this.StaticMeshComponent = void 0),
      (this.Emn = 1),
      (this.J6e = -1),
      (this.ymn = void 0),
      (this.Imn = !1),
      (this.Tmn = !1),
      (this.Lmn = void 0),
      (this.uoi = void 0),
      (this.Dmn = void 0),
      (this.Rmn = 4),
      (this.Amn = void 0),
      (this.Umn = 0),
      (this.Pmn = void 0),
      (this.n8e = () => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            18,
            "Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外",
            ["造物点ID", this.CreatureDataInternal.GetOwnerId()],
            ["model表Id", this.CreatureDataInternal.GetModelConfig().ID],
          ),
          this.xmn(),
          this.Entity.ChangeTickInterval(0);
      }),
      (this.wmn = (t) => {
        this.RefreshShowActor();
      }),
      (this.Bmn = void 0);
  }
  get CurLevelPrefabShowActor() {
    return this.Amn;
  }
  get Extent() {
    return (0, puerts_1.$unref)(this.Dmn);
  }
  get Origin() {
    return (0, puerts_1.$unref)(this.uoi);
  }
  get SkeletalMesh() {
    return this.Smn;
  }
  get StaticMesh() {
    return this.StaticMeshComponent;
  }
  GetStaticMeshComponent() {
    return this.StaticMeshComponent;
  }
  GetPrimitiveComponent() {
    return this.Smn ?? this.StaticMeshComponent;
  }
  GetInteractionMainActor() {
    if (this.J6e !== -1)
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(
        this.J6e,
      );
  }
  HasMesh() {
    return !!this.Smn?.SkeletalMesh || !!this.StaticMeshComponent?.StaticMesh;
  }
  bmn() {
    let t;
    this.Amn === this.ActorInternal
      ? (this.Umn = 0)
      : (this.Pmn || (this.Pmn = (0, puerts_1.$ref)(void 0)),
        this.Amn &&
          (this.Amn.GetActorBounds(!1, void 0, this.Pmn),
          (t = (0, puerts_1.$unref)(this.Pmn)),
          (this.Umn = t.Size() / 2)));
  }
  get PrefabRadius() {
    return this.Umn;
  }
  GetRadius() {
    if (!this.HasMesh()) return 0;
    let t = void 0;
    return (
      this.Smn
        ? (t = this.Smn.CachedWorldSpaceBounds)
        : this.StaticMeshComponent && (t = this.StaticMeshComponent.Bounds),
      t && t.BoxExtent ? t.BoxExtent.Y : 0
    );
  }
  GetSceneInteractionLevelHandleId() {
    return this.J6e;
  }
  get PhysicsMode() {
    return this.Emn;
  }
  set PhysicsMode(t) {
    if (this.Emn !== t) {
      this.Emn = t;
      const e = this.GetPrimitiveComponent();
      switch (t) {
        case 0:
          e.SetSimulatePhysics(!1),
            e.SetPhysicsLinearVelocity(new UE.Vector()),
            e.SetPhysicsAngularVelocity(new UE.Vector());
          break;
        case 1:
          e.SetSimulatePhysics(!0), e.SetEnableGravity(!0);
          break;
        case 2:
          e.SetSimulatePhysics(!0), e.SetEnableGravity(!1);
          break;
        case 3:
          e.SetSimulatePhysics(!0), e.SetEnableGravity(!0);
      }
    }
  }
  OnInitData() {
    return (
      super.OnInitData(),
      (this.uoi = (0, puerts_1.$ref)(void 0)),
      (this.Dmn = (0, puerts_1.$ref)(void 0)),
      !!this.InitCreatureData()
    );
  }
  OnInit() {
    super.OnInit();
    let t = 0;
    let e = this.CreatureDataInternal.GetPbModelConfig();
    let i = this.CreatureDataInternal.GetPbEntityInitData();
    var n = (0, IComponent_1.getComponent)(
      i.ComponentsData,
      "VisionItemComponent",
    );
    var n =
      ((t = n ? -1 : e.ModelId),
      (0, IComponent_1.getComponent)(i.ComponentsData, "ModelComponent"));
    return e
      ? (n
          ? (i = this.CreatureDataInternal.GetModelConfig()).ID
            ? (this.ActorInternal =
                ActorUtils_1.ActorUtils.LoadActorByModelConfig(
                  i,
                  this.CreatureDataInternal.GetTransform(),
                ))
            : (this.ActorInternal = ActorUtils_1.ActorUtils.LoadActorByPath(
                this.CreatureDataInternal.ModelBlueprintPath,
                this.CreatureDataInternal.GetTransform(),
                this.CreatureDataInternal.GetPbDataId(),
              ))
          : (t > 0 && this.CreatureDataInternal.SetModelConfig(t),
            (this.ActorInternal =
              ActorUtils_1.ActorUtils.LoadActorByModelConfig(
                this.CreatureDataInternal.GetModelConfig(),
                this.CreatureDataInternal.GetTransform(),
              ))),
        this.ActorInternal && this.ActorInternal.OnDestroyed.Add(this.n8e),
        this.ActorInternal && this.ActorInternal.IsValid()
          ? (this.SetActorVisible(
              !1,
              "[SceneItemActorComponent.OnInit] 默认隐藏",
            ),
            this.SetCollisionEnable(
              !1,
              "[SceneItemActorComponent.OnInit] 默认关闭碰撞",
            ),
            this.SetTickEnable(
              !1,
              "[SceneItemActorComponent.OnInit] 默认关闭Tick",
            ),
            UE.KuroStaticLibrary.IsObjectClassByName(
              this.ActorInternal,
              CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM,
            )
              ? (this.ActorInternal.ApplyEntityId(this.Entity.Id),
                this.ActorInternal.SetPrimitiveEntityType(
                  RenderConfig_1.RenderConfig.GetEntityRenderPriority(
                    !1,
                    Protocol_1.Aki.Protocol.HBs.Proto_SceneItem,
                  ),
                ),
                this.ActorInternal.SetPrimitiveBlueprintTypeName(
                  new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId),
                ),
                this.qmn(),
                this.Jnn(),
                GlobalData_1.GlobalData.IsPlayInEditor &&
                  (e = this.CreatureDataInternal.GetPbDataId()) &&
                  this.ActorInternal.Tags.Add(new UE.FName("PbDataId:" + e)),
                GameBudgetInterfaceController_1.GameBudgetInterfaceController
                  .IsOpen &&
                  (void 0 !== this.Entity.GameBudgetManagedToken
                    ? cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(
                        this.Entity.GameBudgetConfig.GroupName,
                        this.Entity.GameBudgetManagedToken,
                        this.ActorInternal,
                      )
                    : this.Entity.RegisterToGameBudgetController(
                        this.ActorInternal,
                      ),
                  (this.Amn = this.ActorInternal),
                  this.bmn()),
                !0)
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    7,
                    "[CharacterActorComponent.OnInit] 该物体蓝图类型不是BaseItem",
                    ["EntityId", this.Entity.Id],
                    [
                      "CreatureDataId",
                      this.CreatureDataInternal.GetCreatureDataId(),
                    ],
                    [
                      "ConfigType",
                      this.CreatureDataInternal.GetEntityConfigType(),
                    ],
                    ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
                    ["ModelId", this.CreatureDataInternal.GetModelId()],
                    ["PlayerId", this.CreatureDataInternal.GetPlayerId()],
                  ),
                !1))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                3,
                "[SceneItemActorComponent.OnInit] 加载actor失败。",
                [
                  "CreatureDataId",
                  this.CreatureDataInternal.GetCreatureDataId(),
                ],
                ["PbDataId", this.CreatureData.GetPbDataId()],
              ),
            !1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            3,
            "[SceneItemActorComponent.OnInit] 加载actor失败，无法找到pbModelConfig",
            ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
            ["PbDataId", this.CreatureData.GetPbDataId()],
          ),
        !1);
  }
  OnStart() {
    let t;
    return (
      (void 0 !== this.Entity.GetComponent(140) ||
        void 0 !== this.Entity.GetComponent(196)) &&
        (this.OverrideStaticMeshFromSceneInteraction(),
        (this.PhysicsMode = 0),
        (t = this.GetPrimitiveComponent()).SetCollisionEnabled(3),
        (t = t?.BodyInstance)) &&
        ((t.bLockXRotation = !1),
        (t.bLockYRotation = !1),
        (t.bLockZRotation = !1),
        (t.LinearDamping = 1),
        (t.AngularDamping = 1.5)),
      !0
    );
  }
  OnEnd() {
    return (
      void 0 !== this.Lmn &&
        (TimerSystem_1.TimerSystem.Remove(this.Lmn), (this.Lmn = void 0)),
      !0
    );
  }
  OnEnable() {
    this.OnSetActorActive(!0),
      this.ToggleSceneInteractionVisible(this.CreatureData.GetVisible(), () => {
        this.Txe();
      });
  }
  OnDisable(t) {
    this.OnSetActorActive(!1, t), this.ToggleSceneInteractionVisible(!1);
  }
  OnActivate() {
    super.OnActivate(),
      this.SetActorVisible(!0, "[SceneItemActorComponent.OnActivate] Visible"),
      this.SetCollisionEnable(
        !0,
        "[SceneItemActorComponent.OnActivate] Visible",
      ),
      this.SetTickEnable(!0, "[SceneItemActorComponent.OnActivate] Visible"),
      ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(
        this.CreatureDataInternal,
        this.ActorInternal,
      );
  }
  OnClear() {
    return (
      this.ActorInternal && this.ActorInternal.OnDestroyed.Remove(this.n8e),
      this.Amn instanceof TsEffectActor_1.default &&
        EffectSystem_1.EffectSystem.RemoveFinishCallback(
          this.Amn.GetHandle(),
          this.wmn,
        ),
      super.OnClear(),
      this.xmn(),
      !0
    );
  }
  xmn() {
    const t =
      SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(
        this.J6e,
      );
    t?.IsValid() &&
      ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
        t,
        !1,
        "SceneInteractionLevel.AttachToActor",
        1,
        1,
        1,
      ),
      this.J6e !== -1 &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Entity", 18, "销毁场景交互物", [
            "HandleId",
            this.J6e,
          ]),
        SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(
          this.J6e,
        ),
        (this.J6e = -1)),
      (this.Imn = !1),
      (this.ymn = void 0);
  }
  InitSkeletalMeshComponent() {
    this.Smn ||
      (this.Smn = this.ActorInternal.AddComponentByClass(
        UE.SkeletalMeshComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      ));
  }
  qmn() {
    const t = this.ActorInternal;
    const e = this.CreatureDataInternal.GetModelConfig();
    e &&
      (UE.KismetSystemLibrary.IsValidSoftObjectReference(e.网格体)
        ? (this.InitSkeletalMeshComponent(),
          ActorUtils_1.ActorUtils.LoadAndChangeMeshAnim(
            this.Smn,
            e.网格体,
            e.动画蓝图,
          ))
        : (this.StaticMeshComponent ||
            (this.StaticMeshComponent = t.GetComponentByClass(
              UE.StaticMeshComponent.StaticClass(),
            )),
          this.StaticMeshComponent ||
            (this.StaticMeshComponent = t.AddComponentByClass(
              UE.StaticMeshComponent.StaticClass(),
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            ))));
  }
  LoadAndChangeStaticMesh(t) {
    const e = this.CreatureDataInternal.GetModelConfig();
    if (e) {
      const i = e.静态网格体列表.Get(t);
      i &&
        ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(i) &&
        ResourceSystem_1.ResourceSystem.LoadAsync(
          i.AssetPathName?.toString(),
          UE.Object,
          (t) => {
            t instanceof UE.StaticMesh
              ? this.StaticMeshComponent?.IsValid() &&
                (this.StaticMeshComponent.SetStaticMesh(t),
                t.BodySetup?.IsValid() &&
                  this.StaticMeshComponent.SetCollisionProfileName(
                    t.BodySetup.DefaultInstance.CollisionProfileName,
                  ),
                this.StaticMeshComponent.SetCollisionEnabled(3))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  18,
                  "该资源不是静态网格体，请检查model表配置",
                  ["path", i.AssetPathName],
                );
          },
        );
    }
  }
  SetIsSceneInteractionLoadCompleted(t = !0) {
    this.Imn = t;
  }
  GetIsSceneInteractionLoadCompleted() {
    return this.Imn;
  }
  Jnn() {
    (this.J6e = -1), (this.Imn = !1), (this.Tmn = !1);
  }
  LoadSceneInteractionLevel(t, e = !1) {
    this.xmn();
    let i;
    const n = this.CreatureDataInternal.GetModelConfig();
    n &&
    (i = n.场景交互物) &&
    ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(i)
      ? (this.ResetAllCachedTime(),
        (this.ymn = t),
        (this.J6e =
          SceneInteractionManager_1.SceneInteractionManager.Get().CreateSceneInteractionLevel(
            i.AssetPathName?.toString(),
            this.ymn,
            this.ActorLocation,
            this.ActorRotation,
            () => {
              this.Txe();
            },
            this.CreatureData.GetVisible(),
            e,
          )),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Entity",
            18,
            "生成场景交互物",
            ["initState", t],
            ["HandleId", this.J6e],
            ["ModelId", n.ID],
          ))
      : this.SetIsSceneInteractionLoadCompleted();
  }
  Txe() {
    if (this.J6e !== -1) {
      (this.Imn = !0),
        SceneInteractionManager_1.SceneInteractionManager.Get().AttachToActor(
          this.J6e,
          this.ActorInternal,
        ),
        SceneInteractionManager_1.SceneInteractionManager.Get().SetCollisionActorsOwner(
          this.J6e,
          this.ActorInternal,
        ),
        SceneInteractionManager_1.SceneInteractionManager.Get().AttachChildActor(
          this.J6e,
        );
      const i =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
          this.J6e,
        );
      if (i)
        for (let t = 0, e = i.Num(); t < e; t++) {
          const n = i.Get(t);
          n instanceof UE.StaticMeshActor &&
            (n.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE),
            n.StaticMeshComponent?.SetReceivesDecals(!1));
        }
      const r =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetReceivingDecalsActors(
          this.J6e,
        );
      if (r)
        for (let t = 0, e = r.Num(); t < e; t++)
          r.Get(t)
            .GetComponentByClass(UE.PrimitiveComponent.StaticClass())
            ?.SetReceivesDecals(!0);
      this.Tmn && this.Gmn(),
        this.Nmn(),
        this.RefreshShowActor(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
        );
    }
  }
  RefreshShowActor() {
    let t;
    this.Entity?.Valid &&
      void 0 !== this.Entity?.GameBudgetManagedToken &&
      ((t = UE.KuroStaticLibrary.GetLevelPrefabShowActor(this.ActorInternal))
        ? (cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
            this.Entity.GameBudgetConfig.GroupName,
            this.Entity.GameBudgetManagedToken,
            t,
          ),
          this.Amn !== t &&
            ((this.Amn = t),
            this.bmn(),
            t instanceof TsEffectActor_1.default) &&
            EffectSystem_1.EffectSystem.AddFinishCallback(
              t.GetHandle(),
              this.wmn,
            ))
        : ((this.Amn = this.ActorInternal),
          this.bmn(),
          cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
            this.Entity.GameBudgetConfig.GroupName,
            this.Entity.GameBudgetManagedToken,
            this.Amn,
          )));
  }
  ToggleSceneInteractionVisible(t, e = void 0) {
    this.J6e !== -1 &&
      SceneInteractionManager_1.SceneInteractionManager.Get().ToggleSceneInteractionVisible(
        this.J6e,
        t,
        e,
      );
  }
  SwitchToState(t, e, i) {
    this.J6e !== -1 &&
      this.ymn !== t &&
      (this.Omn(t, this.ymn),
      (this.ymn = t),
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
        this.J6e,
        this.ymn,
        e,
        !1,
        i,
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          18,
          "场景交互物改变状态",
          ["targetState", t],
          ["HandleId", this.J6e],
          ["ModelId", this.CreatureDataInternal.GetModelConfig().ID],
          ["needTransition", e],
          ["jumpToEnd", i],
        ),
      this.RefreshShowActor());
  }
  Nmn() {
    let t;
    this.ymn === 20 &&
      (t = this.GetInteractionMainActor()) &&
      !t.States.Get(this.ymn) &&
      this.Omn(this.ymn);
  }
  Omn(t, e = 22) {
    t === 20 && this.SetSceneItemActorHide(!0),
      e === 20 && this.SetSceneItemActorHide(!1);
  }
  PlaySceneInteractionEffect(t) {
    this.J6e !== -1 &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          18,
          "场景交互物播放特效",
          ["effectKey", t],
          ["HandleId", this.J6e],
          ["ModelId", this.CreatureDataInternal.GetModelConfig().ID],
        ),
      SceneInteractionManager_1.SceneInteractionManager.Get().PlaySceneInteractionEffect(
        this.J6e,
        t,
      ));
  }
  EndSceneInteractionEffect(t) {
    this.J6e !== -1 &&
      SceneInteractionManager_1.SceneInteractionManager.Get().EndSceneInteractionEffect(
        this.J6e,
        t,
      );
  }
  PlayExtraEffect(t, e = !0) {
    this.J6e !== -1 &&
      SceneInteractionManager_1.SceneInteractionManager.Get().PlayExtraEffectByTag(
        this.J6e,
        t,
        e,
      );
  }
  StopExtraEffect(t) {
    this.J6e !== -1 &&
      SceneInteractionManager_1.SceneInteractionManager.Get().StopExtraEffectByTag(
        this.J6e,
        t,
      );
  }
  UpdateHitInfo(t, e) {
    this.J6e !== -1 &&
      SceneInteractionManager_1.SceneInteractionManager.Get().UpdateHitInfo(
        this.J6e,
        t,
        e,
      );
  }
  PlaySceneInteractionEndEffect(t) {
    this.J6e !== -1 &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          7,
          "场景交互物播放结束特效",
          ["effectKey", t],
          ["HandleId", this.J6e],
          ["ModelId", this.CreatureDataInternal.GetModelConfig().ID],
        ),
      SceneInteractionManager_1.SceneInteractionManager.Get().PlaySceneInteractionEndEffect(
        this.J6e,
        t,
      ));
  }
  GetActorInSceneInteraction(t) {
    if (this.J6e !== -1)
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(
        this.J6e,
        t,
      );
  }
  GetActorInSceneInteractionOriginalRelTransform(t) {
    if (this.J6e !== -1)
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetActorOriginalRelTransform(
        this.J6e,
        t,
      );
  }
  OverrideStaticMeshFromSceneInteraction() {
    (this.Tmn = !0), this.Imn && this.Gmn();
  }
  Gmn() {
    let t, e, i, n;
    this.J6e !== -1 &&
      (i =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
          this.J6e,
        )) &&
      ((t = i.GetComponentByClass(UE.StaticMeshComponent.StaticClass())),
      (e = this.Owner.GetComponentByClass(
        UE.StaticMeshComponent.StaticClass(),
      )),
      t) &&
      e &&
      ((i = t.StaticMesh),
      (n = UE.NewArray(UE.Transform)).Add(t.GetRelativeTransform()),
      UE.KuroStaticMeshLibrary.MergeSimpleCollisions(t, n),
      e.SetStaticMesh(t.StaticMesh),
      e.GetCollisionEnabled() === 3 && e.SetCollisionEnabled(0),
      e.SetCollisionEnabled(3),
      e.SetHiddenInGame(!0),
      t.SetStaticMesh(i));
  }
  ChangeSceneInteractionPlayDirection(t) {
    this.J6e !== -1 &&
      SceneInteractionManager_1.SceneInteractionManager.Get().ChangeSceneInteractionPlayDirection(
        this.J6e,
        t,
      );
  }
  GetActiveTagSequencePlaybackProgress(t) {
    if (this.J6e !== -1)
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetActiveTagSequencePlaybackProgress(
        this.J6e,
        t,
      );
  }
  SetActiveTagSequencePlaybackProgress(t, e) {
    this.J6e !== -1 &&
      SceneInteractionManager_1.SceneInteractionManager.Get().SetActiveTagSequencePlaybackProgress(
        this.J6e,
        t,
        e,
      );
  }
  SetActiveTagSequenceDurationTime(t, e) {
    this.J6e !== -1 &&
      SceneInteractionManager_1.SceneInteractionManager.Get().SetActiveTagSequenceDurationTime(
        this.J6e,
        t,
        e,
      );
  }
  PauseActiveTagSequence(t) {
    this.J6e !== -1 &&
      SceneInteractionManager_1.SceneInteractionManager.Get().PauseActiveTagSequence(
        this.J6e,
        t,
      );
  }
  ResumeActiveTagSequence(t, e = !1) {
    this.J6e !== -1 &&
      SceneInteractionManager_1.SceneInteractionManager.Get().ResumeActiveTagSequence(
        this.J6e,
        t,
        e,
      );
  }
  FixBornLocation(t, e) {
    let [i, n] = this.CheckGround();
    i &&
      n.bBlockingHit &&
      (t &&
        ((i = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation),
        TraceElementCommon_1.TraceElementCommon.GetImpactPoint(n, 0, i),
        this.SetActorLocation(i.ToUeVector(), this.constructor.name, !1)),
      e) &&
      ((t = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation),
      TraceElementCommon_1.TraceElementCommon.GetImpactNormal(n, 0, t),
      (i = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
        this.ActorInternal.GetActorUpVector(),
      ),
      (e = MathUtils_1.MathUtils.CommonTempQuat),
      Quat_1.Quat.FindBetweenVectors(i, t, e),
      (n = MathUtils_1.MathUtils.CommonTempRotator),
      MathUtils_1.MathUtils.ComposeRotator(
        this.ActorRotationProxy,
        e.Rotator(),
        n,
      ),
      this.SetActorRotation(n.ToUeRotator(), this.constructor.name, !1)),
      ModelManager_1.ModelManager.TraceElementModel.ClearLineTrace();
  }
  CheckGround() {
    var t = this.ActorLocationProxy;
    var e = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
    var i =
      (e.Set(t.X, t.Y, t.Z + FIX_SPAWN_TRACE_UP),
      ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation);
    var t =
      (i.Set(t.X, t.Y, t.Z + FIX_SPAWN_TRACE_DOWN),
      ModelManager_1.ModelManager.TraceElementModel.GetLineTrace());
    var e =
      ((t.WorldContextObject = this.ActorInternal),
      t.ActorsToIgnore.Empty(),
      t.ActorsToIgnore.Add(Global_1.Global.BaseCharacter),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, e),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, i),
      TraceElementCommon_1.TraceElementCommon.LineTrace(t, PROFILE_KEY));
    var i = t.HitResult;
    return t.ClearCacheData(), [e, i];
  }
  CheckGoundWithBox() {
    let t;
    let e;
    let i;
    let n;
    let r =
      SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
        this.J6e,
      );
    return void 0 === r
      ? [!1, void 0]
      : ((t = r.K2_GetActorRotation()),
        r.K2_SetActorRotation(new UE.Rotator(0, 0, 0), !1),
        r.GetActorBounds(!1, this.uoi, this.Dmn),
        r.K2_SetActorRotation(t, !1),
        (r = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
          (0, puerts_1.$unref)(this.uoi),
        ),
        (n =
          ModelManager_1.ModelManager.TraceElementModel
            .CommonStartLocation).Set(r.X, r.Y, r.Z + FIX_SPAWN_TRACE_UP),
        (e =
          ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation).Set(
          r.X,
          r.Y,
          r.Z + FIX_SPAWN_TRACE_DOWN,
        ),
        ((r =
          ModelManager_1.ModelManager.TraceElementModel.GetBoxTrace()).WorldContextObject =
          this.ActorInternal),
        (i = (0, puerts_1.$unref)(this.Dmn)),
        (r.HalfSizeX = i.X - 2),
        (r.HalfSizeY = i.Y - 2),
        (r.HalfSizeZ = i.Z - 2),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, n),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, e),
        TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(r, t),
        (i = TraceElementCommon_1.TraceElementCommon.BoxTrace(r, PROFILE_KEY)),
        (n = r.HitResult),
        r.ClearCacheData(),
        [i, n]);
  }
  SetSceneItemActorHide(t) {
    this.ActorInternal?.IsValid() && this.kmn(this.ActorInternal, t);
  }
  kmn(t, e) {
    if (t?.IsValid()) {
      let i = (0, puerts_1.$ref)(void 0);
      const n = (t.GetAttachedActors(i, !0), (0, puerts_1.$unref)(i));
      if (n && n.Num() > 0)
        for (let t = 0; t < n.Num(); t++) {
          const r = n.Get(t);
          r && this.kmn(r, e);
        }
      t !== this.ActorInternal
        ? (t.SetActorHiddenInGame(e), t.SetActorEnableCollision(!e))
        : (i = this.GetPrimitiveComponent())?.IsValid() &&
          (e && this.Rmn === 4 && (this.Rmn = i.GetCollisionEnabled()),
          i.SetCollisionEnabled(e ? 0 : this.Rmn));
    }
  }
  OnChangeTimeDilation(t) {
    var t = t * (this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1);
    const e =
      ((this.ActorInternal.CustomTimeDilation = t),
      this.GetInteractionMainActor());
    e?.IsValid() && e.SetTimeDilation(t);
  }
  GetSocketLocation(t) {
    if (this.Imn && !FNameUtil_1.FNameUtil.IsNothing(t)) {
      t =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(
          this.J6e,
          t.toString(),
        );
      if (t?.IsValid()) return t.K2_GetActorLocation();
    }
    return this.ActorLocation;
  }
  GetSocketTransform(t) {
    if (this.Imn && !FNameUtil_1.FNameUtil.IsNothing(t)) {
      t =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(
          this.J6e,
          t.toString(),
        );
      if (t?.IsValid()) return t.GetTransform();
    }
    return this.ActorTransform;
  }
  UpdateInteractionMaterialColorParam(t, e, i, n, r = 1) {
    const s = this.GetInteractionMainActor();
    s &&
      s.InteractionMaterialController &&
      (this.Bmn || (this.Bmn = new UE.LinearColor()),
      (this.Bmn.R = e),
      (this.Bmn.G = i),
      (this.Bmn.B = n),
      (this.Bmn.A = r),
      s.InteractionMaterialController.ChangeVectorParameter(this.Bmn, t));
  }
};
(SceneItemActorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(182)],
  SceneItemActorComponent,
)),
  (exports.SceneItemActorComponent = SceneItemActorComponent);
// # sourceMappingURL=SceneItemActorComponent.js.map
