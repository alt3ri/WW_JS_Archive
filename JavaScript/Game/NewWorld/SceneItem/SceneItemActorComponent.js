"use strict";
var SceneItemActorComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, n) {
      var r,
        s = arguments.length,
        a =
          s < 3
            ? e
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(e, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, n);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (r = t[o]) &&
            (a = (s < 3 ? r(a) : 3 < s ? r(e, i, a) : r(e, i)) || a);
      return 3 < s && a && Object.defineProperty(e, i, a), a;
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
  JsModelManager_1 = require("../../../Core/Model/JsModelManager"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectParameterNiagara_1 = require("../../Effect/EffectParameter/EffectParameterNiagara"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  TsEffectActor_1 = require("../../Effect/TsEffectActor"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RenderConfig_1 = require("../../Render/Config/RenderConfig"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  SceneInteractionActor_1 = require("../../Render/Scene/Item/SceneInteractionActor"),
  ActorUtils_1 = require("../../Utils/ActorUtils"),
  GravityUtils_1 = require("../../Utils/GravityUtils"),
  CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines"),
  BaseActorComponent_1 = require("../Common/Component/BaseActorComponent"),
  PROFILE_KEY = "SceneItemActorFixBornLocation",
  FIX_SPAWN_TRACE_UP = 20,
  FIX_SPAWN_TRACE_DOWN = -1e3,
  FAKE_GRAVITY_VALUE = -980;
let SceneItemActorComponent =
  (SceneItemActorComponent_1 = class SceneItemActorComponent extends (
    BaseActorComponent_1.BaseActorComponent
  ) {
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
        (this.cca = !0),
        (this.YGa = !1),
        (this.qec = !1),
        (this.ESh = void 0),
        (this.lmn = 0),
        (this._mn = void 0),
        (this.gPc = (t) => {
          this.omn &&
            -1 !== this.u9e &&
            t.Actor &&
            SceneInteractionManager_1.SceneInteractionManager.Get().PlayKuroSkeletalMeshDestruction(
              this.u9e,
              t.Actor,
            );
        }),
        (this.v9e = () => {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              17,
              "Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外",
              ["造物点ID", this.CreatureDataInternal.GetOwnerId()],
              ["model表Id", this.CreatureDataInternal.GetModelConfig().ID],
            ),
            this.umn(),
            this.Entity.ChangeTickInterval(0);
        }),
        (this.GMl = (t, e) => {
          var i, n, r;
          5 === t &&
            ((t =
              ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(
                this.CreatureData.GetPbDataId(),
              )),
            (t = (0, IComponent_1.getComponent)(
              t.ComponentsData,
              "LevelPrefabPerformComponent",
            ).PrefabParams),
            ((i = new UE.KuroCurveLinearColor()).bUseCurve = !1),
            (i.Constant = new UE.LinearColor(
              this.ActorLocation.X,
              this.ActorLocation.Y,
              this.ActorLocation.Z,
              0,
            )),
            EffectSystem_1.EffectSystem.CollectMaterialLinearColorCurve(
              e,
              FNameUtil_1.FNameUtil.GetDynamicFName(
                "DissolveSphereCenterPosition",
              ),
              i,
            ),
            (r =
              (i = EffectSystem_1.EffectSystem.GetEffectModel(e)).StartTime +
              i.LoopTime),
            (i = i.StartTime + i.LoopTime + i.EndTime),
            (t = t.Params),
            (n = UE.NewArray(UE.Vector2D)).Add(new UE.Vector2D(0, 0)),
            n.Add(new UE.Vector2D(t.SpreadTime, t.SpreadRadius)),
            n.Add(new UE.Vector2D(r, t.SpreadRadius)),
            n.Add(new UE.Vector2D(i, 0)),
            (r = UE.KuroCurveLibrary.CreateCurveFloat(!0, 0, n)),
            EffectSystem_1.EffectSystem.CollectMaterialFloatCurve(
              e,
              FNameUtil_1.FNameUtil.GetDynamicFName("DissolveSphereRadius"),
              r,
            ));
        }),
        (this.Okl = (t, e) => {
          var i;
          5 === t &&
            ((t =
              ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(
                this.CreatureData.GetPbDataId(),
              )),
            (t = (0, IComponent_1.getComponent)(
              t.ComponentsData,
              "LevelPrefabPerformComponent",
            ).PrefabParams.Params),
            ((i =
              new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat =
              []),
            i.UserParameterFloat.push(
              [FNameUtil_1.FNameUtil.GetDynamicFName("length"), t.Length],
              [FNameUtil_1.FNameUtil.GetDynamicFName("width"), t.Width],
              [FNameUtil_1.FNameUtil.GetDynamicFName("time"), t.Time],
            ),
            EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, i));
        }),
        (this.cmn = (t) => {
          this.RefreshShowActor();
        }),
        (this.mmn = void 0);
    }
    get IsReadyForOverlap() {
      return this.YGa;
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
    get FakeGravityValue() {
      return (
        void 0 === this.ESh &&
          ((this.ESh = Vector_1.Vector.Create(0, 0, FAKE_GRAVITY_VALUE)),
          GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(
            this,
            this.ESh,
          )),
        this.ESh.ToUeVectorOld()
      );
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
            (this.hmn.D_GetActorBounds(!1, void 0, this._mn),
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
          : this.StaticMeshComponent &&
            (t = this.StaticMeshComponent.D_GetComponentBounds()),
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
        if (this.ActorInitNotStandardGravity)
          switch ((e.SetEnableGravity(!1), t)) {
            case 0:
              e.SetSimulatePhysics(!1),
                e.SetPhysicsLinearVelocity(new UE.Vector()),
                e.SetPhysicsAngularVelocity(new UE.Vector()),
                (this.qec = !1);
              break;
            case 1:
              e.SetSimulatePhysics(!0), (this.qec = !0);
              break;
            case 2:
              e.SetSimulatePhysics(!0), (this.qec = !1);
              break;
            case 3:
              e.SetSimulatePhysics(!0), (this.qec = !0);
          }
        else
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
    get EnableFakeGravity() {
      return this.qec;
    }
    SimulatedFakeGravity() {
      this.GetPrimitiveComponent().AddForce(this.FakeGravityValue, void 0, !0);
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
                    this.CreatureDataInternal.D_GetTransform(),
                  ))
              : (this.ActorInternal = ActorUtils_1.ActorUtils.LoadActorByPath(
                  this.CreatureDataInternal.ModelBlueprintPath,
                  this.CreatureDataInternal.D_GetTransform(),
                  this.CreatureDataInternal.GetPbDataId(),
                ))
            : (0 < t && this.CreatureDataInternal.SetModelConfig(t),
              (this.ActorInternal =
                ActorUtils_1.ActorUtils.LoadActorByModelConfig(
                  this.CreatureDataInternal.GetModelConfig(),
                  this.CreatureDataInternal.D_GetTransform(),
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
                      Protocol_1.Aki.Protocol.kks.Proto_SceneItem,
                    ),
                  ),
                  this.ActorInternal.SetPrimitiveBlueprintTypeName(
                    new UE.FName(
                      this.CreatureDataInternal.EntityPbModelConfigId,
                    ),
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
                  JsModelManager_1.JsModelManager.UpdateEntityActor(
                    this.Entity.Id,
                    this.ActorInternal,
                  ),
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
        (void 0 !== this.Entity.GetComponent(154) ||
          void 0 !== this.Entity.GetComponent(218)) &&
          (this.OverrideStaticMeshFromSceneInteraction(),
          (this.PhysicsMode = 0),
          (t = this.GetPrimitiveComponent()).SetCollisionEnabled(3),
          (t = t?.BodyInstance)) &&
          ((t.bLockXRotation = !1),
          (t.bLockYRotation = !1),
          (t.bLockZRotation = !1),
          (t.LinearDamping = 1),
          (t.AngularDamping = 1.5)),
        this.gJl(),
        this.Vr(),
        !0
      );
    }
    gJl() {
      var t = this.CreatureDataInternal.GetPbDataId();
      0 !== t &&
        (SceneItemActorComponent_1.Zsh?.IsValid() ||
          ((SceneItemActorComponent_1.Zsh =
            UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
              GlobalData_1.GlobalData.World,
              UE.KuroActorSubsystem.StaticClass(),
            )),
          SceneItemActorComponent_1.Zsh?.IsValid())) &&
        SceneItemActorComponent_1.Zsh?.RegisterEntity(t);
    }
    Vr() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemEntityHitByHitActorData,
        this.gPc,
      );
    }
    pJl() {
      var t = this.CreatureDataInternal.GetPbDataId();
      0 !== t &&
        SceneItemActorComponent_1.Zsh?.IsValid() &&
        SceneItemActorComponent_1.Zsh?.UnRegisterEntity(t);
    }
    sya() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneItemEntityHitByHitActorData,
        this.gPc,
      );
    }
    OnEnd() {
      return (
        void 0 !== this.nmn &&
          (TimerSystem_1.TimerSystem.Remove(this.nmn), (this.nmn = void 0)),
        this.pJl(),
        this.sya(),
        !0
      );
    }
    OnEnable() {
      this.OnSetActorActive(!0);
      var t = this.CreatureData.GetVisible();
      this.ToggleSceneInteractionVisible(
        t,
        t
          ? () => {
              this.Txe();
            }
          : () => {
              this.b4a();
            },
        "SceneItemActorComponent.OnEnable, visible:" + t,
      );
    }
    OnDisable(t) {
      this.OnSetActorActive(!1, t),
        this.ToggleSceneInteractionVisible(
          !1,
          () => {
            this.b4a();
          },
          "SceneItemActorComponent.OnDisable",
        );
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
      var t;
      return (
        this.ActorInternal && this.ActorInternal.OnDestroyed.Remove(this.v9e),
        this.hmn instanceof TsEffectActor_1.default
          ? EffectSystem_1.EffectSystem.RemoveFinishCallback(
              this.hmn.GetHandle(),
              this.cmn,
            )
          : this.hmn?.IsA(UE.EffectSystemActor.StaticClass()) &&
            ((t = this.hmn.GetHandle()),
            EffectSystem_1.EffectSystem.RemoveFinishCallback(t, this.cmn)),
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
            Log_1.Log.Debug("Entity", 17, "销毁场景交互物", [
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
                    17,
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
              17,
              "生成场景交互物",
              ["initState", t],
              ["HandleId", this.u9e],
              ["ModelId", n.ID],
              ["ActorLocation", this.ActorLocation],
            ))
        : this.SetIsSceneInteractionLoadCompleted();
    }
    Txe() {
      if (-1 !== this.u9e) {
        (this.omn = !0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Entity",
              18,
              "场景交互物加载完成",
              ["HandleId", this.u9e],
              ["ModelId", this.CreatureDataInternal.GetModelConfig().ID],
              ["PbDataId", this.CreatureData.GetPbDataId()],
            ),
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
            n instanceof UE.StaticMeshActor
              ? (n.Tags.Add(
                  CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE,
                ),
                n.Tags.Add(
                  CharacterNameDefines_1.CharacterNameDefines.INVALID_POS,
                ),
                n.StaticMeshComponent?.SetReceivesDecals(!1))
              : n instanceof UE.BP_KuroDestructibleActor_C &&
                n.EnableFakeGravityDirect(
                  this.ActorInitNotStandardGravity,
                  this.FakeGravityValue,
                );
          }
        var r =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetReceivingDecalsActors(
            this.u9e,
          );
        if (r)
          for (let t = 0, e = r.Num(); t < e; t++)
            r.Get(t)
              .GetComponentByClass(UE.PrimitiveComponent.StaticClass())
              ?.SetReceivesDecals(!0);
        this.rmn ? this.gmn() : this.lua(),
          this.fmn(),
          this.RefreshShowActor(),
          this.kMl(),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          ),
          SceneInteractionManager_1.SceneInteractionManager.Get().EnableInteractionLevel(
            this.u9e,
          ),
          this.cca ||
            (this.ToggleSceneInteractionVisible(
              !1,
              () => {
                this.b4a();
              },
              "SetupSceneInteractionWhenLoadCompleted, IsShowInternal is " +
                this.cca,
            ),
            (this.cca = !0));
      }
    }
    b4a() {
      (this.omn = !1),
        (this.YGa = !1),
        SceneInteractionManager_1.SceneInteractionManager.Get().DisableInteractionLevel(
          this.u9e,
        );
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
              t instanceof TsEffectActor_1.default
                ? EffectSystem_1.EffectSystem.AddFinishCallback(
                    t.GetHandle(),
                    this.cmn,
                  )
                : t.IsA(UE.EffectSystemActor.StaticClass()) &&
                  ((t = t),
                  EffectSystem_1.EffectSystem.AddFinishCallback(
                    t.GetHandle(),
                    this.cmn,
                  ))))
          : ((this.hmn = this.ActorInternal),
            this.dmn(),
            cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
              this.Entity.GameBudgetConfig.GroupName,
              this.Entity.GameBudgetManagedToken,
              this.hmn,
            )));
    }
    kMl() {
      if (
        this.CreatureData.GetEntityConfigType() ===
        Protocol_1.Aki.Protocol.rLs.F6n
      ) {
        var t =
          ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(
            this.CreatureData.GetPbDataId(),
          );
        if (t) {
          t = (0, IComponent_1.getComponent)(
            t.ComponentsData,
            "LevelPrefabPerformComponent",
          );
          if (t) {
            const e = t.PrefabParams;
            if (e) {
              t = this.GetInteractionMainActor();
              const i = t.GetActorByKey(e.ReferenceActorKey);
              i &&
                ((t.OverrideEffectActor = i),
                (t.OverrideEffectParmaFunc = () => {
                  switch (e.Params.Type) {
                    case "Decal":
                      var t = i;
                      EffectSystem_1.EffectSystem.IsValid(t.EffectComponent) &&
                        EffectSystem_1.EffectSystem.DynamicRegisterSpawnCallback(
                          t.EffectComponent,
                          this.GMl,
                        );
                      break;
                    case "RushWarningEffect":
                      t = i;
                      EffectSystem_1.EffectSystem.IsValid(t.EffectComponent) &&
                        EffectSystem_1.EffectSystem.DynamicRegisterSpawnCallback(
                          t.EffectComponent,
                          this.Okl,
                        );
                  }
                }));
            }
          }
        }
      }
    }
    ToggleSceneInteractionVisible(t, e = void 0, i = "") {
      (!this.omn && ((this.cca = t), -1 === this.u9e)) ||
        SceneInteractionManager_1.SceneInteractionManager.Get().ToggleSceneInteractionVisible(
          this.u9e,
          t,
          this.CreatureData.GetRemoveState(),
          e,
          i,
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
            17,
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
            17,
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
    GetAllActorsInSceneInteractionLevel() {
      if (-1 !== this.u9e)
        return SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
          this.u9e,
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
        this.zGa(e.GetCollisionEnabled()) && e.SetCollisionEnabled(0),
        (this.YGa = !0),
        e.SetCollisionEnabled(3),
        e.SetHiddenInGame(!0),
        t.SetStaticMesh(i));
    }
    lua() {
      var e =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
          this.u9e,
        );
      if (e) {
        let t = e.GetComponentByClass(UE.ShapeComponent.StaticClass());
        (t =
          t || e.GetComponentByClass(UE.StaticMeshComponent.StaticClass())) &&
          (this.zGa(t.GetCollisionEnabled()) && t.SetCollisionEnabled(0),
          (this.YGa = !0),
          t.SetCollisionEnabled(3));
      }
    }
    zGa(t) {
      return 2 === t || 3 === t;
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
    GetIsActiveTagSequencePlayReverseFromConfig(t) {
      if (-1 !== this.u9e)
        return SceneInteractionManager_1.SceneInteractionManager.Get().GetIsActiveTagSequencePlayReverseFromConfig(
          this.u9e,
          t,
        );
    }
    PlayActiveTagSequenceTo(t, e, i = !1) {
      -1 !== this.u9e &&
        SceneInteractionManager_1.SceneInteractionManager.Get().PlayActiveTagSequenceTo(
          this.u9e,
          t,
          e,
          i,
        );
    }
    FixBornLocation(t, e) {
      var [i, n] = this.CheckGround();
      i &&
        n.bBlockingHit &&
        (t &&
          ((i =
            ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation),
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
        r =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
            this.u9e,
          );
      return void 0 === r
        ? [!1, void 0]
        : ((t = r.K2_GetActorRotation()),
          r.K2_SetActorRotation(new UE.Rotator(0, 0, 0), !1),
          r.D_GetActorBounds(!1, this.mri, this.smn),
          r.K2_SetActorRotation(t, !1),
          (r = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
            (0, puerts_1.$unref)(this.mri),
          ),
          (n =
            ModelManager_1.ModelManager.TraceElementModel
              .CommonStartLocation).Set(r.X, r.Y, r.Z + FIX_SPAWN_TRACE_UP),
          (e =
            ModelManager_1.ModelManager.TraceElementModel
              .CommonEndLocation).Set(r.X, r.Y, r.Z + FIX_SPAWN_TRACE_DOWN),
          ((r =
            ModelManager_1.ModelManager.TraceElementModel.GetBoxTrace()).WorldContextObject =
            this.ActorInternal),
          (i = (0, puerts_1.$unref)(this.smn)),
          (r.HalfSizeX = i.X - 2),
          (r.HalfSizeY = i.Y - 2),
          (r.HalfSizeZ = i.Z - 2),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, n),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, e),
          TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(r, t),
          (i = TraceElementCommon_1.TraceElementCommon.BoxTrace(
            r,
            PROFILE_KEY,
          )),
          (n = r.HitResult),
          r.ClearCacheData(),
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
            var r = n.Get(t);
            r && this.vmn(r, e);
          }
        t !== this.ActorInternal
          ? (t.SetActorHiddenInGame(e), t.SetActorEnableCollision(!e))
          : (i = this.GetPrimitiveComponent())?.IsValid() &&
            (e && 4 === this.amn && (this.amn = i.GetCollisionEnabled()),
            i.SetCollisionEnabled(e ? 0 : this.amn));
      }
    }
    OnChangeTimeDilation(t) {
      var t = t * (this.Entity.GetComponent(120)?.CurrentTimeScale ?? 1),
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
        if (t?.IsValid()) return t.D_K2_GetActorLocation();
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
        if (t?.IsValid()) return t.D_GetTransform();
      }
      return this.ActorTransform;
    }
    UpdateInteractionMaterialColorParam(t, e, i, n, r = 1) {
      var s = this.GetInteractionMainActor();
      s &&
        s.InteractionMaterialController &&
        (this.mmn || (this.mmn = new UE.LinearColor()),
        (this.mmn.R = e),
        (this.mmn.G = i),
        (this.mmn.B = n),
        (this.mmn.A = r),
        s.InteractionMaterialController.ChangeVectorParameter(this.mmn, t));
    }
    GetInteractCollisionActor() {
      return -1 === this.u9e
        ? this.HasMesh()
          ? this.Owner
          : void 0
        : SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
            this.u9e,
          );
    }
    GetReferenceActor(t) {
      var e = this.GetInteractionMainActor();
      return e && e instanceof SceneInteractionActor_1.default
        ? e.GetActorByKey(t)
        : void 0;
    }
  });
(SceneItemActorComponent.Zsh = void 0),
  (SceneItemActorComponent = SceneItemActorComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(200)],
      SceneItemActorComponent,
    )),
  (exports.SceneItemActorComponent = SceneItemActorComponent);
//# sourceMappingURL=SceneItemActorComponent.js.map
