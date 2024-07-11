"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    var s,
      r = arguments.length,
      o =
        r < 3
          ? e
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(e, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(t, e, i, n);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (s = t[a]) && (o = (r < 3 ? s(o) : 3 < r ? s(e, i, o) : s(e, i)) || o);
    return 3 < r && o && Object.defineProperty(e, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemActorComponent = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  TsEffectActor_1 = require("../../Effect/TsEffectActor"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RenderConfig_1 = require("../../Render/Config/RenderConfig"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  ActorUtils_1 = require("../../Utils/ActorUtils"),
  CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines"),
  BaseActorComponent_1 = require("../Common/Component/BaseActorComponent"),
  PROFILE_KEY = "SceneItemActorFixBornLocation",
  FIX_SPAWN_TRACE_UP = 20,
  FIX_SPAWN_TRACE_DOWN = -1e3;
let SceneItemActorComponent = class SceneItemActorComponent extends BaseActorComponent_1.BaseActorComponent {
  constructor() {
    super(...arguments),
      (this.emn = void 0),
      (this.StaticMeshComponent = void 0),
      (this.tmn = 1),
      (this.u9e = -1),
      (this.imn = void 0),
      (this.omn = !1),
      (this.rmn = !1),
      (this.nmn = void 0),
      (this.mri = void 0),
      (this.smn = void 0),
      (this.amn = 4),
      (this.hmn = void 0),
      (this.a1a = !0),
      (this.lmn = 0),
      (this._mn = void 0),
      (this.v9e = () => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            18,
            "Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外",
            ["造物点ID", this.CreatureDataInternal.GetOwnerId()],
            ["model表Id", this.CreatureDataInternal.GetModelConfig().ID],
          ),
          this.umn(),
          this.Entity.ChangeTickInterval(0);
      }),
      (this.cmn = (t) => {
        this.RefreshShowActor();
      }),
      (this.mmn = void 0);
  }
  get CurLevelPrefabShowActor() {
    return this.hmn;
  }
  get Extent() {
    return (0, puerts_1.$unref)(this.smn);
  }
  get Origin() {
    return (0, puerts_1.$unref)(this.mri);
  }
  get SkeletalMesh() {
    return this.emn;
  }
  get StaticMesh() {
    return this.StaticMeshComponent;
  }
  GetStaticMeshComponent() {
    return this.StaticMeshComponent;
  }
  GetPrimitiveComponent() {
    return this.emn ?? this.StaticMeshComponent;
  }
  GetInteractionMainActor() {
    if (-1 !== this.u9e)
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(
        this.u9e,
      );
  }
  GetMainCollisionActor() {
    if (-1 !== this.u9e)
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
        this.u9e,
      );
  }
  HasMesh() {
    return !!this.emn?.SkeletalMesh || !!this.StaticMeshComponent?.StaticMesh;
  }
  dmn() {
    var t;
    this.hmn === this.ActorInternal
      ? (this.lmn = 0)
      : (this._mn || (this._mn = (0, puerts_1.$ref)(void 0)),
        this.hmn &&
          (this.hmn.GetActorBounds(!1, void 0, this._mn),
          (t = (0, puerts_1.$unref)(this._mn)),
          (this.lmn = t.Size() / 2)));
  }
  get PrefabRadius() {
    return this.lmn;
  }
  GetRadius() {
    if (!this.HasMesh()) return 0;
    let t = void 0;
    return (
      this.emn
        ? (t = this.emn.CachedWorldSpaceBounds)
        : this.StaticMeshComponent && (t = this.StaticMeshComponent.Bounds),
      t && t.BoxExtent ? t.BoxExtent.Y : 0
    );
  }
  GetSceneInteractionLevelHandleId() {
    return this.u9e;
  }
  get PhysicsMode() {
    return this.tmn;
  }
  set PhysicsMode(t) {
    if (this.tmn !== t) {
      this.tmn = t;
      var e = this.GetPrimitiveComponent();
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
      (this.mri = (0, puerts_1.$ref)(void 0)),
      (this.smn = (0, puerts_1.$ref)(void 0)),
      !!this.InitCreatureData()
    );
  }
  OnInit() {
    super.OnInit();
    let t = 0;
    var e = this.CreatureDataInternal.GetPbModelConfig(),
      i = this.CreatureDataInternal.GetPbEntityInitData(),
      n = (0, IComponent_1.getComponent)(
        i.ComponentsData,
        "VisionItemComponent",
      ),
      n =
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
          : (0 < t && this.CreatureDataInternal.SetModelConfig(t),
            (this.ActorInternal =
              ActorUtils_1.ActorUtils.LoadActorByModelConfig(
                this.CreatureDataInternal.GetModelConfig(),
                this.CreatureDataInternal.GetTransform(),
              ))),
        this.ActorInternal && this.ActorInternal.OnDestroyed.Add(this.v9e),
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
                    Protocol_1.Aki.Protocol.wks.Proto_SceneItem,
                  ),
                ),
                this.ActorInternal.SetPrimitiveBlueprintTypeName(
                  new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId),
                ),
                this.Cmn(),
                this.xnn(),
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
                  (this.hmn = this.ActorInternal),
                  this.dmn()),
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
    var t;
    return (
      (void 0 !== this.Entity.GetComponent(142) ||
        void 0 !== this.Entity.GetComponent(201)) &&
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
      void 0 !== this.nmn &&
        (TimerSystem_1.TimerSystem.Remove(this.nmn), (this.nmn = void 0)),
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
    this.SetActorVisible(!0, "[SceneItemActorComponent.OnActivate] Visible"),
      this.SetCollisionEnable(
        !0,
        "[SceneItemActorComponent.OnActivate] Visible",
      ),
      this.SetTickEnable(!0, "[SceneItemActorComponent.OnActivate] Visible"),
      super.OnActivate(),
      ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(
        this.CreatureDataInternal,
        this.ActorInternal,
      );
  }
  OnClear() {
    return (
      this.ActorInternal && this.ActorInternal.OnDestroyed.Remove(this.v9e),
      this.hmn instanceof TsEffectActor_1.default &&
        EffectSystem_1.EffectSystem.RemoveFinishCallback(
          this.hmn.GetHandle(),
          this.cmn,
        ),
      super.OnClear(),
      this.umn(),
      !0
    );
  }
  umn() {
    var t =
      SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(
        this.u9e,
      );
    t?.IsValid() &&
      void 0 !== t.GetAttachParentActor() &&
      ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
        t,
        !1,
        "SceneInteractionLevel.AttachToActor",
        1,
        1,
        1,
      ),
      -1 !== this.u9e &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Entity", 18, "销毁场景交互物", [
            "HandleId",
            this.u9e,
          ]),
        SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(
          this.u9e,
        ),
        (this.u9e = -1)),
      (this.omn = !1),
      (this.imn = void 0);
  }
  InitSkeletalMeshComponent() {
    this.emn ||
      (this.emn = this.ActorInternal.AddComponentByClass(
        UE.SkeletalMeshComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      ));
  }
  Cmn() {
    var t = this.ActorInternal,
      e = this.CreatureDataInternal.GetModelConfig();
    e &&
      (UE.KismetSystemLibrary.IsValidSoftObjectReference(e.网格体)
        ? (this.InitSkeletalMeshComponent(),
          ActorUtils_1.ActorUtils.LoadAndChangeMeshAnim(
            this.emn,
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
    var e = this.CreatureDataInternal.GetModelConfig();
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
    this.omn = t;
  }
  GetIsSceneInteractionLoadCompleted() {
    return this.omn;
  }
  xnn() {
    (this.u9e = -1), (this.omn = !1), (this.rmn = !1);
  }
  LoadSceneInteractionLevel(t, e = !1) {
    this.umn();
    var i,
      n = this.CreatureDataInternal.GetModelConfig();
    n &&
    (i = n.场景交互物) &&
    ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(i)
      ? (this.ResetAllCachedTime(),
        (this.imn = t),
        (this.u9e =
          SceneInteractionManager_1.SceneInteractionManager.Get().CreateSceneInteractionLevel(
            i.AssetPathName?.toString(),
            this.imn,
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
            ["HandleId", this.u9e],
            ["ModelId", n.ID],
          ))
      : this.SetIsSceneInteractionLoadCompleted();
  }
  Txe() {
    if (-1 !== this.u9e) {
      (this.omn = !0),
        SceneInteractionManager_1.SceneInteractionManager.Get().AttachToActor(
          this.u9e,
          this.ActorInternal,
        ),
        SceneInteractionManager_1.SceneInteractionManager.Get().SetCollisionActorsOwner(
          this.u9e,
          this.ActorInternal,
        ),
        SceneInteractionManager_1.SceneInteractionManager.Get().AttachChildActor(
          this.u9e,
        );
      var i =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
          this.u9e,
        );
      if (i)
        for (let t = 0, e = i.Num(); t < e; t++) {
          var n = i.Get(t);
          n instanceof UE.StaticMeshActor &&
            (n.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE),
            n.StaticMeshComponent?.SetReceivesDecals(!1));
        }
      var s =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetReceivingDecalsActors(
          this.u9e,
        );
      if (s)
        for (let t = 0, e = s.Num(); t < e; t++)
          s.Get(t)
            .GetComponentByClass(UE.PrimitiveComponent.StaticClass())
            ?.SetReceivesDecals(!0);
      this.rmn ? this.gmn() : this.hla(),
        this.fmn(),
        this.RefreshShowActor(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
        ),
        this.a1a || (this.ToggleSceneInteractionVisible(!1), (this.a1a = !0));
    }
  }
  RefreshShowActor() {
    var t;
    this.Entity?.Valid &&
      void 0 !== this.Entity?.GameBudgetManagedToken &&
      ((t = UE.KuroStaticLibrary.GetLevelPrefabShowActor(this.ActorInternal))
        ? (cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
            this.Entity.GameBudgetConfig.GroupName,
            this.Entity.GameBudgetManagedToken,
            t,
          ),
          this.hmn !== t &&
            ((this.hmn = t),
            this.dmn(),
            t instanceof TsEffectActor_1.default) &&
            EffectSystem_1.EffectSystem.AddFinishCallback(
              t.GetHandle(),
              this.cmn,
            ))
        : ((this.hmn = this.ActorInternal),
          this.dmn(),
          cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
            this.Entity.GameBudgetConfig.GroupName,
            this.Entity.GameBudgetManagedToken,
            this.hmn,
          )));
  }
  ToggleSceneInteractionVisible(t, e = void 0) {
    (!this.omn && ((this.a1a = t), -1 === this.u9e)) ||
      SceneInteractionManager_1.SceneInteractionManager.Get().ToggleSceneInteractionVisible(
        this.u9e,
        t,
        this.CreatureData.GetRemoveState(),
        e,
      );
  }
  SwitchToState(t, e, i) {
    -1 !== this.u9e &&
      this.imn !== t &&
      (this.pmn(t, this.imn),
      (this.imn = t),
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(
        this.u9e,
        this.imn,
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
          ["HandleId", this.u9e],
          ["ModelId", this.CreatureDataInternal.GetModelConfig().ID],
          ["needTransition", e],
          ["jumpToEnd", i],
        ),
      this.RefreshShowActor());
  }
  fmn() {
    var t;
    20 === this.imn &&
      (t = this.GetInteractionMainActor()) &&
      !t.States.Get(this.imn) &&
      this.pmn(this.imn);
  }
  pmn(t, e = 22) {
    20 === t && this.SetSceneItemActorHide(!0),
      20 === e && this.SetSceneItemActorHide(!1);
  }
  PlaySceneInteractionEffect(t) {
    -1 !== this.u9e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          18,
          "场景交互物播放特效",
          ["effectKey", t],
          ["HandleId", this.u9e],
          ["ModelId", this.CreatureDataInternal.GetModelConfig().ID],
        ),
      SceneInteractionManager_1.SceneInteractionManager.Get().PlaySceneInteractionEffect(
        this.u9e,
        t,
      ));
  }
  EndSceneInteractionEffect(t) {
    -1 !== this.u9e &&
      SceneInteractionManager_1.SceneInteractionManager.Get().EndSceneInteractionEffect(
        this.u9e,
        t,
      );
  }
  PlayExtraEffect(t, e = !0) {
    -1 !== this.u9e &&
      SceneInteractionManager_1.SceneInteractionManager.Get().PlayExtraEffectByTag(
        this.u9e,
        t,
        e,
      );
  }
  StopExtraEffect(t) {
    -1 !== this.u9e &&
      SceneInteractionManager_1.SceneInteractionManager.Get().StopExtraEffectByTag(
        this.u9e,
        t,
      );
  }
  UpdateHitInfo(t, e) {
    -1 !== this.u9e &&
      SceneInteractionManager_1.SceneInteractionManager.Get().UpdateHitInfo(
        this.u9e,
        t,
        e,
      );
  }
  PlaySceneInteractionEndEffect(t) {
    -1 !== this.u9e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          7,
          "场景交互物播放结束特效",
          ["effectKey", t],
          ["HandleId", this.u9e],
          ["ModelId", this.CreatureDataInternal.GetModelConfig().ID],
        ),
      SceneInteractionManager_1.SceneInteractionManager.Get().PlaySceneInteractionEndEffect(
        this.u9e,
        t,
      ));
  }
  GetActorInSceneInteraction(t) {
    if (-1 !== this.u9e)
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(
        this.u9e,
        t,
      );
  }
  GetActorInSceneInteractionOriginalRelTransform(t) {
    if (-1 !== this.u9e)
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetActorOriginalRelTransform(
        this.u9e,
        t,
      );
  }
  OverrideStaticMeshFromSceneInteraction() {
    (this.rmn = !0), this.omn && this.gmn();
  }
  gmn() {
    var t, e, i, n;
    -1 !== this.u9e &&
      (i =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
          this.u9e,
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
      3 === e.GetCollisionEnabled() && e.SetCollisionEnabled(0),
      e.SetCollisionEnabled(3),
      e.SetHiddenInGame(!0),
      t.SetStaticMesh(i));
  }
  hla() {
    var e =
      SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
        this.u9e,
      );
    if (e) {
      let t = e.GetComponentByClass(UE.ShapeComponent.StaticClass());
      (t = t || e.GetComponentByClass(UE.StaticMeshComponent.StaticClass())) &&
        (3 === t.GetCollisionEnabled() && t.SetCollisionEnabled(0),
        t.SetCollisionEnabled(3));
    }
  }
  ChangeSceneInteractionPlayDirection(t) {
    -1 !== this.u9e &&
      SceneInteractionManager_1.SceneInteractionManager.Get().ChangeSceneInteractionPlayDirection(
        this.u9e,
        t,
      );
  }
  GetActiveTagSequencePlaybackProgress(t) {
    if (-1 !== this.u9e)
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetActiveTagSequencePlaybackProgress(
        this.u9e,
        t,
      );
  }
  SetActiveTagSequencePlaybackProgress(t, e) {
    -1 !== this.u9e &&
      SceneInteractionManager_1.SceneInteractionManager.Get().SetActiveTagSequencePlaybackProgress(
        this.u9e,
        t,
        e,
      );
  }
  SetActiveTagSequenceDurationTime(t, e) {
    -1 !== this.u9e &&
      SceneInteractionManager_1.SceneInteractionManager.Get().SetActiveTagSequenceDurationTime(
        this.u9e,
        t,
        e,
      );
  }
  PauseActiveTagSequence(t) {
    -1 !== this.u9e &&
      SceneInteractionManager_1.SceneInteractionManager.Get().PauseActiveTagSequence(
        this.u9e,
        t,
      );
  }
  ResumeActiveTagSequence(t, e = !1) {
    -1 !== this.u9e &&
      SceneInteractionManager_1.SceneInteractionManager.Get().ResumeActiveTagSequence(
        this.u9e,
        t,
        e,
      );
  }
  FixBornLocation(t, e) {
    var [i, n] = this.CheckGround();
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
    var t = this.ActorLocationProxy,
      e = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation,
      i =
        (e.Set(t.X, t.Y, t.Z + FIX_SPAWN_TRACE_UP),
        ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation),
      t =
        (i.Set(t.X, t.Y, t.Z + FIX_SPAWN_TRACE_DOWN),
        ModelManager_1.ModelManager.TraceElementModel.GetLineTrace()),
      e =
        ((t.WorldContextObject = this.ActorInternal),
        t.ActorsToIgnore.Empty(),
        t.ActorsToIgnore.Add(Global_1.Global.BaseCharacter),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, i),
        TraceElementCommon_1.TraceElementCommon.LineTrace(t, PROFILE_KEY)),
      i = t.HitResult;
    return t.ClearCacheData(), [e, i];
  }
  CheckGoundWithBox() {
    var t,
      e,
      i,
      n,
      s =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
          this.u9e,
        );
    return void 0 === s
      ? [!1, void 0]
      : ((t = s.K2_GetActorRotation()),
        s.K2_SetActorRotation(new UE.Rotator(0, 0, 0), !1),
        s.GetActorBounds(!1, this.mri, this.smn),
        s.K2_SetActorRotation(t, !1),
        (s = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
          (0, puerts_1.$unref)(this.mri),
        ),
        (n =
          ModelManager_1.ModelManager.TraceElementModel
            .CommonStartLocation).Set(s.X, s.Y, s.Z + FIX_SPAWN_TRACE_UP),
        (e =
          ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation).Set(
          s.X,
          s.Y,
          s.Z + FIX_SPAWN_TRACE_DOWN,
        ),
        ((s =
          ModelManager_1.ModelManager.TraceElementModel.GetBoxTrace()).WorldContextObject =
          this.ActorInternal),
        (i = (0, puerts_1.$unref)(this.smn)),
        (s.HalfSizeX = i.X - 2),
        (s.HalfSizeY = i.Y - 2),
        (s.HalfSizeZ = i.Z - 2),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, n),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, e),
        TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(s, t),
        (i = TraceElementCommon_1.TraceElementCommon.BoxTrace(s, PROFILE_KEY)),
        (n = s.HitResult),
        s.ClearCacheData(),
        [i, n]);
  }
  SetSceneItemActorHide(t) {
    this.ActorInternal?.IsValid() && this.vmn(this.ActorInternal, t);
  }
  vmn(t, e) {
    if (t?.IsValid()) {
      var i = (0, puerts_1.$ref)(void 0),
        n = (t.GetAttachedActors(i, !0), (0, puerts_1.$unref)(i));
      if (n && 0 < n.Num())
        for (let t = 0; t < n.Num(); t++) {
          var s = n.Get(t);
          s && this.vmn(s, e);
        }
      t !== this.ActorInternal
        ? (t.SetActorHiddenInGame(e), t.SetActorEnableCollision(!e))
        : (i = this.GetPrimitiveComponent())?.IsValid() &&
          (e && 4 === this.amn && (this.amn = i.GetCollisionEnabled()),
          i.SetCollisionEnabled(e ? 0 : this.amn));
    }
  }
  OnChangeTimeDilation(t) {
    var t = t * (this.Entity.GetComponent(109)?.CurrentTimeScale ?? 1),
      e =
        ((this.ActorInternal.CustomTimeDilation = t),
        this.GetInteractionMainActor());
    e?.IsValid() && e.SetTimeDilation(t);
  }
  GetSocketLocation(t) {
    if (this.omn && !FNameUtil_1.FNameUtil.IsNothing(t)) {
      t =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(
          this.u9e,
          t.toString(),
        );
      if (t?.IsValid()) return t.K2_GetActorLocation();
    }
    return this.ActorLocation;
  }
  GetSocketTransform(t) {
    if (this.omn && !FNameUtil_1.FNameUtil.IsNothing(t)) {
      t =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(
          this.u9e,
          t.toString(),
        );
      if (t?.IsValid()) return t.GetTransform();
    }
    return this.ActorTransform;
  }
  UpdateInteractionMaterialColorParam(t, e, i, n, s = 1) {
    var r = this.GetInteractionMainActor();
    r &&
      r.InteractionMaterialController &&
      (this.mmn || (this.mmn = new UE.LinearColor()),
      (this.mmn.R = e),
      (this.mmn.G = i),
      (this.mmn.B = n),
      (this.mmn.A = s),
      r.InteractionMaterialController.ChangeVectorParameter(this.mmn, t));
  }
};
(SceneItemActorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(185)],
  SceneItemActorComponent,
)),
  (exports.SceneItemActorComponent = SceneItemActorComponent);
//# sourceMappingURL=SceneItemActorComponent.js.map
