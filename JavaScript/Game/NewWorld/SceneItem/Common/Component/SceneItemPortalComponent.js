"use strict";
var SceneItemPortalComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, r) {
      var a,
        s = arguments.length,
        o =
          s < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, i, r);
      else
        for (var _ = t.length - 1; 0 <= _; _--)
          (a = t[_]) &&
            (o = (s < 3 ? a(o) : 3 < s ? a(e, i, o) : a(e, i)) || o);
      return 3 < s && o && Object.defineProperty(e, i, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemPortalComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  Platform_1 = require("../../../../../Launcher/Platform/Platform"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  CameraUtility_1 = require("../../../../Camera/CameraUtility"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectParameterNiagara_1 = require("../../../../Effect/EffectParameter/EffectParameterNiagara"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../../Module/ScrollingTips/ScrollingTipsController"),
  EffectModelGroup_1 = require("../../../../Render/Effect/Data/EffectModelGroup"),
  EffectModelNiagara_1 = require("../../../../Render/Effect/Data/EffectModelNiagara"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils"),
  PortalUtils_1 = require("../../../../Utils/PortalUtils"),
  VoxelUtils_1 = require("../../../../Utils/VoxelUtils"),
  WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask"),
  WorldDefine_1 = require("../../../../World/Define/WorldDefine"),
  PortalController_1 = require("../../Controller/PortalController"),
  SceneItemManipulableCastProjectileState_1 = require("../../Manipulate/SceneItemManipulableCastProjectileState"),
  SceneItemManipulableCastState_1 = require("../../Manipulate/SceneItemManipulableCastState"),
  INVALID_ENTITY = 0,
  TELEPORT_TRIGGER_REF = "TeleportTrigger",
  PORTAL_EFFECT_REF = "PortalEffectActor",
  PORTAL_EFFECT_PLANE_Y_KEY = "Plane_Y",
  PORTAL_EFFECT_PLANE_Z_KEY = "Plane_Z",
  PORTAL_EFFECT_RT_ENABLE_KEY = "RTEnable",
  PORTAL_EFFECT_RIPPLE_ENABLE_KEY = "Ripple Enable",
  PORTAL_EFFECT_RIPPLE_POS_KEY = "RipplePos",
  DEFAULT_ROLE_TELEPORT_PERFORM_TIME = 0,
  DEFAULT_ROLE_TELEPORT_PERFORM_PRIORITY = 0,
  ROLE_TELEPORT_SCREEN_EFFECT_PATH =
    "/Game/Aki/Effect/DataAsset/ScreenDA/SD_Fight/Bigworld/DA_Fx_Screen_Potal.DA_Fx_Screen_Potal",
  ROLE_TELEPORT_SCREEN_POST_PROCESS_EFFECT_PATH =
    "/Game/Aki/Effect/EffectGroup/BigWorld/QingchuWuran/DA_Fx_Group_Post_Potal.DA_Fx_Group_Post_Potal",
  ROLE_TELEPORT_SCREEN_EFFECT_INTERVAL = 1e3,
  PORTAL_DEBUG_KEY = "Portal",
  PORTAL_TELEPORT_OFFSET = 200,
  showFlagTypeToName = new Map([
    ["Fog", "Fog"],
    ["Atmosphere", "Atmosphere"],
    ["InstancedFoliage", "InstancedFoliage"],
    ["InstancedGrass", "InstancedGrass"],
  ]);
class PortalTeleportParam {
  constructor(t, e, i, r) {
    (this.OtherActor = t),
      (this.IsRole = e),
      (this.InPortalComp = i),
      (this.OutPortalComp = r),
      (this.BeforeTeleportVelocityTransform = void 0),
      (this.BeforeTeleportCameraSettings = void 0),
      (this.AfterTeleportCameraSettings = void 0),
      (this.AfterTeleportInputDirection = void 0),
      (this.AfterTeleportInputRotator = void 0),
      (this.AfterTeleportTransform = void 0),
      (this.OriginEnableMovementSync = !1);
  }
}
let SceneItemPortalComponent =
  (SceneItemPortalComponent_1 = class SceneItemPortalComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.s1n = "A"),
        (this.Aga = INVALID_ENTITY),
        (this.qSa = INVALID_ENTITY),
        (this.ActorComp = void 0),
        (this.vtn = void 0),
        (this.IsPlayerInRange = !1),
        (this.PortalCapture = void 0),
        (this.yel = void 0),
        (this.Eel = void 0),
        (this.Iel = void 0),
        (this.Tel = void 0),
        (this.wDe = 0),
        (this.Wpo = 0),
        (this.rQs = !1),
        (this.oQs = void 0),
        (this.kla = !1),
        (this.Ihh = 0),
        (this.Lel = new Set()),
        (this.jul = new Map()),
        (this.PortalBounds = Vector_1.Vector.Create()),
        (this.IsPortalPrepared = !1),
        (this.IsPortalRegistered = !1),
        (this.R0n = void 0),
        (this.Thh = void 0),
        (this.Uel = ResourceSystem_1.ResourceSystem.InvalidId),
        (this.vrl = void 0),
        (this.y6a = (t) => {
          (this.IsPlayerInRange = t),
            0 < SceneItemPortalComponent_1.P6a.size ||
              (t
                ? (this.xka(), this.I6a())
                : this.CanRegisterPortal() || this.T6a());
        }),
        (this.Rnn = () => {
          this.xka(), this.I6a();
        }),
        (this.L6a = (t) => {
          t?.Valid &&
            (t = t.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.Aga === t &&
            (this.xka(), this.I6a());
        }),
        (this.A6a = (t) => {
          t?.Valid &&
            (t = t.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.Aga === t &&
            this.PortalCapture?.IsValid() &&
            this.T6a();
        }),
        (this.l1n = (t, e) => {
          var i;
          e?.Valid &&
            (i = e.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.Aga === i &&
            this.PortalCapture?.IsValid() &&
            (EventSystem_1.EventSystem.HasWithTarget(
              e,
              EventDefine_1.EEventName.RemoveEntity,
              this.l1n,
            ) &&
              EventSystem_1.EventSystem.RemoveWithTargetUseKey(
                this,
                e,
                EventDefine_1.EEventName.RemoveEntity,
                this.l1n,
              ),
            this.T6a());
        }),
        (this.J8a = () => {
          this.IsPortalRegistered && this.Ael();
        }),
        (this.Rel = (t) => {
          this.IsPortalRegistered &&
            (t = t?.toString()) &&
            this.Lel.has(t) &&
            this.Ael();
        }),
        (this.iWa = void 0),
        (this.Lll = void 0);
    }
    GetPbDataId() {
      return this.wDe;
    }
    GetCreatureDataId() {
      return this.Wpo;
    }
    GetPortalModel() {
      return this.s1n;
    }
    GetPairCreatureDataId() {
      return this.qSa;
    }
    SetPairCreatureDataId(t) {
      this.qSa = t;
    }
    GetDynamicPortalCreatorCreatureDataId() {
      return this.kla ? (this.Entity.GetComponent(0)?.GetOwnerIncId() ?? 0) : 0;
    }
    OnInitData(t) {
      var e = t.GetParam(SceneItemPortalComponent_1)[0];
      switch ((this.R0n = e).Config.Type) {
        case "Dynamic":
          this.kla = !0;
          break;
        case "Static":
          (this.Aga = e.Config.LinkPortalEntityId),
            (this.rQs = e.Config.IsStreamSource || !1);
      }
      return (
        (this.s1n = e.Config.PortalModel),
        t.EntityData && (this.wDe = t.EntityData?.v9n),
        (this.Wpo = this.Entity.GetComponent(0).GetCreatureDataId()),
        !0
      );
    }
    OnStart() {
      return (
        (this.ActorComp = this.Entity.GetComponent(200)),
        (this.vtn = this.Entity.GetComponent(84)),
        this.vtn &&
          !EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.y6a,
          ) &&
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.y6a,
          ),
        !0
      );
    }
    OnActivate() {
      return (
        this.ActorComp?.Valid &&
          ("A" === this.s1n &&
            (EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnPortalRegister,
              this.L6a,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.OnPortalRegister,
                this.L6a,
              ),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnPortalUnRegister,
              this.A6a,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.OnPortalUnRegister,
                this.A6a,
              )),
          EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Rnn,
          ) ||
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
              this.Rnn,
            ),
          this.ActorComp?.GetIsSceneInteractionLoadCompleted() && this.Rnn(),
          this.Lhh()),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.OnPortalRegister,
          this.L6a,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnPortalRegister,
            this.L6a,
          ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.OnPortalUnRegister,
          this.A6a,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnPortalUnRegister,
            this.A6a,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.y6a,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.y6a,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Rnn,
          ),
        SceneItemPortalComponent_1.nKa(),
        this.GetPortalEffectActor()?.IsValid && this.D6a(),
        this.PortalCapture?.IsValid() && this.T6a(),
        this.R6a(),
        (this.yel = void 0),
        (this.Eel = void 0),
        (this.Iel = void 0),
        !(this.Tel = void 0)
      );
    }
    OnDisable(t) {
      this.Entity.IsInit && (this.T6a(), this.R6a());
    }
    Lhh() {
      const i = this.GetDynamicPortalCreatorCreatureDataId();
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(i);
      if (!(t?.IsInit ?? this.Thh) && 0 !== i) {
        let e = !1;
        t = WaitEntityTask_1.WaitEntityTask.Create(
          "SceneItemPortalComponent.WaitDynamicPortalCreatorInit",
          i,
          (t) => {
            (this.Thh = void 0),
              (e = !0),
              t
                ? (this.xka(), this.I6a())
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    39,
                    "传送门: 等待PortalCreator出错",
                    ["CreatureDataId", this.Wpo],
                    ["PbDataId", this.wDe],
                    ["DynamicPortalCreatorCreatureDataId", i],
                  );
          },
        );
        e || (this.Thh = t);
      }
    }
    U6a() {
      var t;
      return (
        !!(4 & this.Entity.Flag) &&
        !!(
          this.ActorComp &&
          this.ActorComp?.GetIsSceneInteractionLoadCompleted() &&
          this.GetPortalEffectActor()?.IsValid() &&
          ((t = this.ActorComp.CreatureData.GetEntityOnlineInteractType()),
          LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            t,
            !1,
          ))
        )
      );
    }
    xka() {
      if (this.U6a() && !this.IsPortalPrepared) {
        var t = this.GetPortalEffectActor();
        if (t?.IsValid()) {
          if (this.kla) {
            var e = this.GetDynamicPortalCreatorCreatureDataId(),
              i = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
            if (0 !== e && !i?.IsInit) return void this.Lhh();
          }
          e = this.Pel();
          e?.IsValid()
            ? (this.PortalCapture?.IsValid() ||
                (this.PortalCapture = ActorSystem_1.ActorSystem.Spawn(
                  UE.BP_KuroPortalCapture_C.StaticClass(),
                  this.ActorComp.ActorTransform,
                  this.ActorComp.Owner,
                )),
              this.PortalCapture?.IsValid() &&
                (this.PortalCapture.SetPbDataId(this.wDe),
                this.PortalCapture.D_K2_SetActorTransform(
                  this.ActorComp.ActorTransform,
                  !1,
                  void 0,
                  !1,
                ),
                this.PortalCapture.K2_AttachToActor(
                  this.ActorComp.Owner,
                  void 0,
                  1,
                  1,
                  1,
                  !1,
                ),
                this.nQs(),
                this.Mrl()
                  ? (this.Srl(),
                    this.x6a(),
                    EffectSystem_1.EffectSystem.IsPlaying(t.EffectComponent) ||
                      EffectSystem_1.EffectSystem.DynamicRegisterSpawnCallback(
                        t.EffectComponent,
                        this.J8a,
                      ),
                    this.kla ? this.Rhh() : this.Dhh(),
                    this.PortalCapture.Plane.D_K2_SetWorldTransform(
                      t.RootComponent?.D_K2_GetComponentToWorld() ??
                        this.ActorComp.ActorTransform,
                      !1,
                      void 0,
                      !1,
                    ),
                    (i = this.wel(e, PORTAL_EFFECT_PLANE_Y_KEY) ?? 1),
                    (t = this.wel(e, PORTAL_EFFECT_PLANE_Z_KEY) ?? 1),
                    (this.PortalBounds.X = 0),
                    (this.PortalBounds.Y = i / 2),
                    (this.PortalBounds.Z = t / 2),
                    this.kla &&
                      PortalController_1.PortalController.AfterGenerateDynamicPortal(
                        this,
                      ),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "SceneItem",
                        39,
                        "传送门: PreparePortal Success",
                        ["CreatureDataId", this.Wpo],
                        ["PbDataId", this.wDe],
                        ["IsDynamicPortal", this.kla],
                        ["PortalBounds", this.PortalBounds],
                        [
                          "PlaneTransform",
                          this.PortalCapture.Plane?.D_K2_GetComponentToWorld().ToString(),
                        ],
                      ),
                    (this.IsPortalPrepared = !0))
                  : this.yrl()))
            : this.xel();
        }
      }
    }
    R6a() {
      this.IsPortalPrepared &&
        (this.PortalCapture?.IsValid() &&
          (this.PortalCapture.K2_DetachFromActor(),
          ActorSystem_1.ActorSystem.Put(
            "SceneItemPortalComponent.UnPreparePortal",
            this.PortalCapture,
          ),
          (this.PortalCapture = void 0)),
        this.Srl(),
        this.rQs && this.oQs?.IsValid() && this.yEr(),
        this.Uel !== ResourceSystem_1.ResourceSystem.InvalidId &&
          (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Uel),
          (this.Uel = ResourceSystem_1.ResourceSystem.InvalidId)),
        this.GetKuroActorSubsystem()?.OnAddToSubsystem.Remove(this.Rel),
        this.kla &&
          (this.Thh?.Cancel(),
          (this.Thh = void 0),
          PortalController_1.PortalController.AfterDeleteDynamicPortal(this)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            39,
            "传送门: UnPreparePortal Success",
            ["CreatureDataId", this.Wpo],
            ["PbDataId", this.wDe],
            ["IsDynamicPortal", this.kla],
            ["PortalBounds", this.PortalBounds],
          ),
        (this.IsPortalPrepared = !1));
    }
    CanRegisterPortal() {
      var t;
      return !(
        !(4 & this.Entity.Flag) ||
        !this.ActorComp?.GetIsSceneInteractionLoadCompleted() ||
        !this.PortalCapture?.IsValid() ||
        !this.GetPortalEffectActor()?.IsValid() ||
        ((t = this.ActorComp.CreatureData.GetEntityOnlineInteractType()),
        !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          t,
          !1,
        )) ||
        ((t = this.kla
          ? PortalController_1.PortalController.GetPairDynamicPortal(this)
          : ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
              this.Aga,
            )?.Entity?.GetComponent(213)),
        !this.IsPortalPrepared) ||
        !t?.IsPortalPrepared ||
        (this.vtn && t.vtn && !this.IsPlayerInRange && !t?.IsPlayerInRange)
      );
    }
    I6a() {
      var t, e;
      this.CanRegisterPortal() &&
        !this.IsPortalRegistered &&
        (this.kla
          ? PortalController_1.PortalController.RegisterDynamicPortals()
          : ((e = (t =
              ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
                this.Aga,
              ))?.Entity?.GetComponent(213)),
            t?.IsInit &&
              e?.IsPortalPrepared &&
              ("A" === this.s1n
                ? (this.SetPairCreatureDataId(e.GetCreatureDataId()),
                  e.SetPairCreatureDataId(this.GetCreatureDataId()),
                  (e = new PortalController_1.PortalPairParams(
                    this.PortalCapture.Plane.D_K2_GetComponentToWorld(),
                    e.PortalCapture.Plane.D_K2_GetComponentToWorld(),
                    this.ActorComp.Owner,
                    e.ActorComp.Owner,
                    this.PortalBounds,
                    e.PortalBounds,
                  )),
                  PortalController_1.PortalController.RegisterPair(
                    this.Wpo,
                    e,
                    !1,
                    !0,
                  ))
                : EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.OnPortalRegister,
                    ModelManager_1.ModelManager.CreatureModel.GetEntity(
                      this.Wpo,
                    ),
                  ),
              EventSystem_1.EventSystem.HasWithTarget(
                t,
                EventDefine_1.EEventName.RemoveEntity,
                this.l1n,
              ) ||
                EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
                  this,
                  t,
                  EventDefine_1.EEventName.RemoveEntity,
                  this.l1n,
                ))));
    }
    T6a() {
      this.IsPortalRegistered &&
        (this.kla
          ? PortalController_1.PortalController.UnRegisterDynamicPortals(!0)
          : (this.PortalCapture?.IsValid() &&
              this.PortalCapture.SetPair(void 0),
            "A" === this.s1n
              ? PortalController_1.PortalController.UnRegisterPair(
                  this.Wpo,
                  !1,
                  !0,
                  !0,
                )
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnPortalUnRegister,
                  ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Wpo),
                )));
    }
    AfterRegisterPair() {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneItem",
          39,
          "传送门: AfterRegisterPair",
          ["CreatureDataId", this.Wpo],
          ["PbDataId", this.wDe],
        ),
        (this.IsPortalRegistered = !0),
        this.Nla(),
        this.EnablePortalRenderingTarget();
    }
    AfterUnRegisterPair() {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneItem",
          39,
          "传送门: AfterUnRegisterPair",
          ["CreatureDataId", this.Wpo],
          ["PbDataId", this.wDe],
        ),
        (this.IsPortalRegistered = !1),
        this.tTa(),
        this.DisablePortalRenderingTarget();
    }
    Dhh() {
      var t = this.R0n?.Config.RenderConfig;
      this.Ahh(t);
    }
    Rhh() {
      var t = this.GetDynamicPortalCreatorCreatureDataId(),
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
      let e = this.R0n?.Config.RenderConfig;
      t?.IsInit &&
        ((t = t.Entity.GetComponent(225)),
        (e = t?.GetPortalRenderConfig() ?? e)),
        this.Ahh(e);
    }
    Ahh(t) {
      switch (t?.ViewDistance.Type) {
        case "Custom":
          (this.Ihh = t.ViewDistance.Distance),
            Info_1.Info.IsBuildShipping ||
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "SceneItem",
                  39,
                  "传送门画面可视距离使用了自定义配置，可能造成性能问题，请检查是否为正式配置",
                  ["CreatureDataId", this.Wpo],
                  ["PbDataId", this.wDe],
                  ["CaptureMaxViewDistance", this.Ihh],
                ));
          break;
        case "High":
          this.Ihh = 1e4;
          break;
        case "Mid":
          this.Ihh = 6e3;
          break;
        default:
          this.Ihh = 3e3;
      }
      if (t?.ForceRenderActors?.length) {
        for (const r of t.ForceRenderActors) {
          var e;
          (r.Platform &&
            !Platform_1.Platform.CheckAssetPlatformInclude(
              r.Platform.toString(),
            )) ||
            ((e = r.PathName.split(".")).length < 3
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  39,
                  "[PortalComp:InitRenderConfig] actor路径解析错误",
                  ["PathName", r.PathName],
                  ["CreatureDataId", this.Wpo],
                  ["PbDataId", this.wDe],
                )
              : this.Lel.add(e[1] + "." + e[2]));
        }
        this.GetKuroActorSubsystem()?.OnAddToSubsystem.Remove(this.Rel),
          this.Lel.size &&
            this.GetKuroActorSubsystem()?.OnAddToSubsystem.Add(this.Rel);
      }
      if (t?.SetRenderFlags?.length)
        for (const a of t.SetRenderFlags) {
          var i = showFlagTypeToName.get(a.Type);
          i && this.jul.set(i, a.Enable);
        }
    }
    Ael() {
      var t, e;
      this.IsPortalRegistered &&
        ((e = (t = "A" === this.s1n)
          ? this.GetCreatureDataId()
          : this.GetPairCreatureDataId()),
        ModelManager_1.ModelManager.PortalModel?.GetPortal(
          e,
        )?.SetCaptureShowingActors(
          !t,
          (0, puerts_1.$ref)(this.GetPairCaptureIgnoredActors()),
          (0, puerts_1.$ref)(this.GetPairCaptureForceShowActors()),
        ));
    }
    GetPairCaptureIgnoredActors() {
      var t, e;
      if (this.IsPortalPrepared)
        return (
          (t =
            this.ActorComp.GetAllActorsInSceneInteractionLevel() ??
            UE.NewArray(UE.Actor)),
          (e = this.GetPortalEffectActor())?.IsValid() &&
            ((e = e.EffectComponent),
            (e =
              EffectSystem_1.EffectSystem.GetSureEffectActor(e))?.IsValid()) &&
            t.Add(e),
          t
        );
    }
    GetPairCaptureForceShowActors() {
      if (this.IsPortalPrepared) {
        var t = UE.NewArray(UE.Actor),
          e = UE.KuroGISystem.GetKuroGISystem(
            GlobalData_1.GlobalData.World.GetWorld(),
          )?.GetKuroGlobalGIActor();
        if (
          (e && (t.Add(e), e.DynamicCloudsActor) && t.Add(e.DynamicCloudsActor),
          this.Lel.size)
        ) {
          var i = this.GetKuroActorSubsystem();
          for (const a of this.Lel) {
            var r = i?.GetActor(FNameUtil_1.FNameUtil.GetDynamicFName(a));
            r?.IsValid() && t.Add(r);
          }
        }
        return t;
      }
    }
    GetPairCaptureMaxViewDistance() {
      return this.Ihh;
    }
    GetPairCaptureShowFlags() {
      if (this.IsPortalPrepared) {
        var t,
          e,
          i = UE.NewMap(UE.BuiltinString, UE.BuiltinBool);
        for ([t, e] of this.jul) i.Add(t, e);
        return i;
      }
    }
    xel() {
      var t = this.GetPortalEffectActor();
      if (t && this.Uel === ResourceSystem_1.ResourceSystem.InvalidId) {
        let i = !1;
        t = ResourceSystem_1.ResourceSystem.LoadAsync(
          t.EffectData.AssetPathName.toString(),
          UE.EffectModelBase,
          (t, e) => {
            (i = !0),
              this.Uel !== ResourceSystem_1.ResourceSystem.InvalidId &&
                ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Uel),
              (this.Uel = ResourceSystem_1.ResourceSystem.InvalidId),
              t?.IsValid() &&
                (t instanceof EffectModelGroup_1.default ||
                  t instanceof EffectModelNiagara_1.default) &&
                (this.xka(), this.I6a());
          },
        );
        i || (this.Uel = t);
      }
    }
    GetPortalEffectActor() {
      if (this.yel) return this.yel;
      var t = this.ActorComp?.GetInteractionMainActor();
      if (t) {
        t = t.GetActorByKey(PORTAL_EFFECT_REF);
        if (t?.RootComponent && t.IsA(UE.BP_EffectActor_C.StaticClass()))
          return (this.yel = t);
      }
    }
    Pel() {
      if (this.Iel?.IsValid()) return this.Iel;
      var t = this.GetPortalEffectActor();
      if (t?.IsValid()) {
        t = t.EffectData.AssetPathName.toString();
        if (!(t.length <= 0)) {
          t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            t,
            UE.EffectModelBase,
          );
          if (
            t?.IsValid() &&
            (t instanceof EffectModelGroup_1.default ||
              t instanceof EffectModelNiagara_1.default)
          )
            return (this.Iel = t);
        }
      }
    }
    wel(e, i) {
      if (e instanceof EffectModelGroup_1.default) {
        var r = e.EffectData ? e.EffectData.Num() : 0;
        for (let t = 0; t < r; t++) {
          var a = e.EffectData?.GetKey(t);
          if (a?.IsValid() && a instanceof EffectModelNiagara_1.default) {
            a = a.FloatParameters.Get(FNameUtil_1.FNameUtil.GetDynamicFName(i));
            if (!a?.bUseCurve) return a?.Constant;
          }
        }
      } else if (e instanceof EffectModelNiagara_1.default) {
        var t = e.FloatParameters.Get(FNameUtil_1.FNameUtil.GetDynamicFName(i));
        if (!t?.bUseCurve) return t?.Constant;
      }
    }
    x6a() {
      var t = this.GetPortalEffectActor();
      t &&
        !t.EffectComponent &&
        t.Play("SceneItemPortalComponent.PlayPortalEffect");
    }
    D6a(t = !1) {
      var e = this.GetPortalEffectActor();
      e &&
        e.EffectComponent &&
        e.Stop("SceneItemPortalComponent.StopPortalEffect", t);
    }
    EnablePortalRenderingTarget() {
      var t,
        e = this.GetPortalEffectActor();
      e?.IsValid() &&
        ((e = e.EffectComponent),
        ((t =
          new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat =
          []),
        t.UserParameterFloat.push([
          FNameUtil_1.FNameUtil.GetDynamicFName(PORTAL_EFFECT_RT_ENABLE_KEY),
          1,
        ]),
        EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, t));
    }
    DisablePortalRenderingTarget() {
      var t,
        e = this.GetPortalEffectActor();
      e?.IsValid() &&
        ((e = e.EffectComponent),
        ((t =
          new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat =
          []),
        t.UserParameterFloat.push([
          FNameUtil_1.FNameUtil.GetDynamicFName(PORTAL_EFFECT_RT_ENABLE_KEY),
          0,
        ]),
        EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, t));
    }
    EnablePortalRipple(t) {
      var e,
        i = this.GetPortalEffectActor();
      i?.IsValid() &&
        ((i = i.EffectComponent),
        ((e =
          new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat =
          []),
        e.UserParameterFloat.push([
          FNameUtil_1.FNameUtil.GetDynamicFName(
            PORTAL_EFFECT_RIPPLE_ENABLE_KEY,
          ),
          1,
        ]),
        (e.UserParameterColor = []),
        e.UserParameterColor.push([
          FNameUtil_1.FNameUtil.GetDynamicFName(PORTAL_EFFECT_RIPPLE_POS_KEY),
          new UE.LinearColor(t.X, t.Y, t.Z, 1),
        ]),
        EffectSystem_1.EffectSystem.SetEffectParameterNiagara(i, e));
    }
    DisablePortalRipple() {
      var t,
        e = this.GetPortalEffectActor();
      e?.IsValid() &&
        ((e = e.EffectComponent),
        ((t =
          new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat =
          []),
        t.UserParameterFloat.push([
          FNameUtil_1.FNameUtil.GetDynamicFName(
            PORTAL_EFFECT_RIPPLE_ENABLE_KEY,
          ),
          0,
        ]),
        EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, t));
    }
    GetKuroActorSubsystem() {
      return (
        this.Tel?.IsValid() ||
          (this.Tel = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
            GlobalData_1.GlobalData.World,
            UE.KuroActorSubsystem.StaticClass(),
          )),
        this.Tel
      );
    }
    nQs() {
      var t, e, i;
      this.rQs &&
        ModelManager_1.ModelManager.GameModeModel?.UseWorldPartition &&
        (this.oQs?.IsValid() ||
          ((t = this.ActorComp.ActorLocation),
          (i = this.ActorComp.ActorRotation),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Level",
              7,
              "传送门: CreateStreamingSource",
              ["CreatureDataId", this.Wpo],
              ["PbDataId", this.wDe],
              ["Location", t],
              ["Rotation", i],
            ),
          (e = new UE.TransformDouble()).SetLocation(t),
          e.SetRotation(new UE.Quat(i)),
          e.SetScale3D(new UE.VectorDouble(1, 1, 1)),
          (i = ActorSystem_1.ActorSystem.Get(
            UE.Actor.StaticClass(),
            e,
          )).AddComponentByClass(
            UE.SceneComponent.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          ),
          i.D_K2_SetActorLocation(t, !1, void 0, !1),
          i
            .AddComponentByClass(
              UE.WorldPartitionStreamingSourceComponent.StaticClass(),
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            )
            .EnableStreamingSource(),
          (this.oQs = i)));
    }
    yEr() {
      this.oQs?.IsValid() &&
        ActorSystem_1.ActorSystem.Put(
          "SceneItemPortalComponent.DestroyStreamingSource",
          this.oQs,
        ),
        (this.oQs = void 0);
    }
    yrl() {
      if (
        this.rQs &&
        ModelManager_1.ModelManager.GameModeModel.UseWorldPartition &&
        this.oQs?.IsValid()
      ) {
        const e = this.oQs.GetComponentByClass(
          UE.WorldPartitionStreamingSourceComponent.StaticClass(),
        );
        if (e?.IsStreamingSourceEnabled() && !this.vrl?.Valid()) {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Level",
              39,
              "传送门: 等待独立流送源Streaming",
              ["CreatureDataId", this.Wpo],
              ["PbDataId", this.wDe],
            );
          var t = this.oQs.D_K2_GetActorLocation();
          const i = this.Erl(t);
          this.vrl = TimerSystem_1.TimerSystem.Forever((t) => {
            e.IsStreamingCompletedForLayers(
              i,
              !1,
              ResourceSystem_1.STREAMING_SOURCE_RADIUS,
              !1,
              void 0,
              !0,
            ) &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Level",
                  39,
                  "传送门: 独立流送源Streaming完成",
                  ["CreatureDataId", this.Wpo],
                  ["PbDataId", this.wDe],
                ),
              this.Srl(),
              this.xka(),
              this.I6a());
          }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
        }
      }
    }
    Srl() {
      this.vrl?.Valid() && TimerSystem_1.TimerSystem.Remove(this.vrl),
        (this.vrl = void 0);
    }
    Erl(t) {
      var e = UE.NewArray(UE.BuiltinName);
      let i =
        ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo.DataLayerType;
      if (ModelManager_1.ModelManager.WorldModel.IsEnableEnvironmentDetecting) {
        switch (
          VoxelUtils_1.VoxelUtils.GetVoxelInfo(GlobalData_1.GlobalData.World, t)
            .EnvType
        ) {
          case 0:
          case 2:
            i = "DataLayerRuntime_EncloseSpace";
            break;
          case 1:
            i = "DataLayerRuntime_EncloseSpaceRoom";
            break;
          default:
            i = "";
        }
        i !==
          ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo
            .DataLayerType &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            39,
            "传送门: 独立流送源位置的封闭信息与当前环境的封闭信息不同，可能永远无法等待到流送成功",
            ["CreatureDataId", this.Wpo],
            ["PbDataId", this.wDe],
            [
              "CurrentDataLayerType",
              ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo
                .DataLayerType,
            ],
            ["StreamingPosDataLayerType", i],
          );
      }
      t = "" === i ? void 0 : FNameUtil_1.FNameUtil.GetDynamicFName(i);
      if (FNameUtil_1.FNameUtil.IsEmpty(t))
        for (const o of WorldDefine_1.dataLayerRuntimeHLOD) {
          var r = (0, puerts_1.$ref)(void 0),
            a = FNameUtil_1.FNameUtil.GetDynamicFName(o);
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(
            GlobalData_1.GlobalData.World,
            a,
            r,
          ),
            e.Add((0, puerts_1.$unref)(r));
        }
      else {
        var s = (0, puerts_1.$ref)(void 0);
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(
          GlobalData_1.GlobalData.World,
          t,
          s,
        ),
          e.Add((0, puerts_1.$unref)(s));
      }
      return e;
    }
    Mrl() {
      var t, e;
      return (
        !this.rQs ||
        !ModelManager_1.ModelManager.GameModeModel.UseWorldPartition ||
        (!!this.oQs?.IsValid() &&
          ((t = this.oQs.GetComponentByClass(
            UE.WorldPartitionStreamingSourceComponent.StaticClass(),
          )),
          (e = this.oQs.D_K2_GetActorLocation()),
          (e = this.Erl(e)),
          t.IsStreamingCompletedForLayers(
            e,
            !1,
            ResourceSystem_1.STREAMING_SOURCE_RADIUS,
            !1,
            void 0,
            !0,
          )))
      );
    }
    GetTriggerActor() {
      if (this.Eel) return this.Eel;
      var t = this.ActorComp?.GetInteractionMainActor();
      if (t) {
        t = t.GetActorByKey(TELEPORT_TRIGGER_REF);
        if (t) return (this.Eel = t);
      }
    }
    GetTriggerComp() {
      var t = this.GetTriggerActor();
      if (t) return t.GetComponentByClass(UE.ShapeComponent.StaticClass());
    }
    Nla() {
      var t = this.GetTriggerActor(),
        e = this.GetTriggerComp();
      t &&
        e &&
        (e.SetUseCCD(!0),
        t.OnActorBeginOverlap.Add((t, e) => {
          this.Fla(e);
        }));
    }
    tTa() {
      var t = this.GetTriggerActor(),
        e = this.GetTriggerComp();
      t?.OnActorBeginOverlap.Clear(), e?.SetUseCCD(!1);
    }
    Fla(t) {
      var e = Global_1.Global.BaseCharacter;
      if (e && (t === e || t instanceof UE.BP_BaseItem_C))
        if (SceneItemPortalComponent_1.P6a.has(t))
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              39,
              "传送门: actor正在传送中，不允许重复触发",
              ["CreatureDataId", this.Wpo],
              ["PbDataId", this.wDe],
            );
        else {
          var i = e.CharacterActorComponent?.Entity.GetComponent(64);
          if (!i?.GetHoldingEntity() || t !== i?.GetHoldingActor()) {
            var i = ActorUtils_1.ActorUtils.GetEntityByActor(t),
              r = i?.Entity?.GetComponent(1),
              r = (r?.ResetAllCachedTime(), r ? this.Ull(r) : this.dIa(t));
            if (r)
              if (this.Dll(t, t === e)) {
                if (i?.Valid) {
                  r = i.Entity.GetComponent(154);
                  if (
                    r &&
                    r.CurrentState instanceof
                      SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState
                  )
                    return;
                }
                t !== this.ActorComp?.Owner && this.g4a(t, t === e);
              } else
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneItem",
                    39,
                    "传送门: 无法安全通过传送门，忽略",
                    ["CreatureDataId", this.Wpo],
                    ["PbDataId", this.wDe],
                  );
            else
              (r = i?.Entity?.GetComponent(154)) &&
                r.CurrentState instanceof
                  SceneItemManipulableCastState_1.SceneItemManipulableCastState &&
                (e = r.CurrentState).HasHitCallback() &&
                e.CallHitCallback(t, this.ActorComp?.Owner),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneItem",
                    39,
                    "传送门: 不是从正面进入传送门，忽略",
                    ["CreatureDataId", this.Wpo],
                    ["PbDataId", this.wDe],
                  );
          }
        }
    }
    g4a(i, r) {
      if (!SceneItemPortalComponent_1.P6a.has(i)) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            39,
            "传送门: BeforeTeleport",
            ["CreatureDataId", this.Wpo],
            ["PbDataId", this.wDe],
            [
              "ActorPos",
              Vector_1.Vector.Create(i?.D_GetTransform().GetLocation()),
            ],
            [
              "ActorRot",
              Rotator_1.Rotator.Create(i?.D_GetTransform().Rotator()),
            ],
          );
        let t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
          this.qSa,
        )?.Entity;
        var a = (t =
            t || EntitySystem_1.EntitySystem.Get(this.qSa))?.GetComponent(213),
          s = a?.PortalCapture,
          o = "A" === this.s1n,
          _ = o ? this.GetCreatureDataId() : this.GetPairCreatureDataId(),
          n = ModelManager_1.ModelManager.PortalModel?.GetPortal(_);
        if (s && n) {
          const c = new PortalTeleportParam(i, r, this, a);
          (s = i.D_GetTransform()), (a = i.D_GetTransform());
          let t = Vector_1.Vector.ZeroVector;
          if (r) {
            var h = i.GetComponentByClass(
              UE.CharacterMovementComponent.StaticClass(),
            );
            if (!h) return;
            t = h.Velocity;
          } else t = i.StaticMesh.GetComponentVelocity();
          h = t.ToOrientationRotator();
          if (
            ((h.Roll = a.Rotator().Roll),
            a.SetRotation(h.Quaternion()),
            (c.BeforeTeleportVelocityTransform = a),
            r)
          ) {
            h = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
            if (h?.Valid) {
              this.EnablePortalRipple(s.GetLocation()),
                SceneItemPortalComponent_1.P6a.add(i);
              (a = h.Entity?.GetComponent(66)),
                (r =
                  (a &&
                    ((r = a.GetEnableMovementSync()),
                    (c.OriginEnableMovementSync = r)) &&
                    a.SetEnableMovementSync(!1, "传送门: 传送开始"),
                  h.Entity.GetComponent(203)));
              if (r.HasTag(-1371021686)) {
                if (r.HasTag(-1009010563))
                  return (
                    h.Entity.GetComponent(
                      97,
                    )?.OnRoleBeforeTeleportThroughPortal(),
                    void this.p4a(c)
                  );
                r.HasTag(400631093) ||
                  h.Entity.GetComponent(39).StopGroup1Skill(
                    "Portal Stop skill",
                  );
              }
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRolePassPortalBeforeTeleport,
                h,
                c.InPortalComp,
                c.OutPortalComp,
              );
              var a =
                  PortalUtils_1.PortalUtils.GetMappingOffsetTransformToOtherPortal(
                    s,
                    _,
                    o,
                    s.GetRotation().GetForwardVectorDouble(),
                    PORTAL_TELEPORT_OFFSET,
                  ),
                r = ((c.AfterTeleportTransform = a), h.Entity.GetComponent(3)),
                _ =
                  (r.InputDirectProxy.IsZero()
                    ? (c.AfterTeleportInputDirection =
                        Vector_1.Vector.ZeroVectorProxy)
                    : (r.InputDirectProxy.ToOrientationQuat(
                        MathUtils_1.MathUtils.CommonTempQuat,
                      ),
                      (_ = s.InverseTransformRotation(
                        MathUtils_1.MathUtils.CommonTempQuat.ToUeQuat(),
                      )),
                      (c.AfterTeleportInputDirection = Vector_1.Vector.Create(
                        a.TransformRotation(_).GetForwardVector(),
                      ))),
                  r.InputRotatorProxy.Quaternion(
                    MathUtils_1.MathUtils.CommonTempQuat,
                  ),
                  s.InverseTransformRotation(
                    MathUtils_1.MathUtils.CommonTempQuat.ToUeQuat(),
                  )),
                r =
                  ((c.AfterTeleportInputRotator = Rotator_1.Rotator.Create(
                    a.TransformRotation(_).Rotator(),
                  )),
                  CameraController_1.CameraController.FightCamera
                    ?.LogicComponent),
                _ = r?.CameraModifyController,
                l = r?.CameraConfigController?.GetCameraConfigByTag(1827994262);
              let t = !1,
                e = l
                  ? l.FadeInTime * CommonDefine_1.MILLIONSECOND_PER_SECOND
                  : DEFAULT_ROLE_TELEPORT_PERFORM_TIME;
              e < TimerSystem_1.MIN_TIME && (e = 0);
              var E = l?.Priority ?? DEFAULT_ROLE_TELEPORT_PERFORM_PRIORITY,
                m = o ? n.PortalWorldTransform1 : n.PortalWorldTransform2,
                o = o ? n.PortalWorldTransform2 : n.PortalWorldTransform1,
                n = Vector_1.Vector.Create(),
                m =
                  (MathUtils_1.MathUtils.CommonTempRotator.FromUeRotator(
                    m.Rotator(),
                  ),
                  MathUtils_1.MathUtils.CommonTempRotator.Quaternion(
                    MathUtils_1.MathUtils.CommonTempQuat,
                  ).GetUpVector(n),
                  Vector_1.Vector.Create()),
                o =
                  (MathUtils_1.MathUtils.CommonTempRotator.FromUeRotator(
                    o.Rotator(),
                  ),
                  MathUtils_1.MathUtils.CommonTempRotator.Quaternion(
                    MathUtils_1.MathUtils.CommonTempQuat,
                  ).GetUpVector(m),
                  n.Equals(m));
              r &&
                _ &&
                ((n =
                  ModelManager_1.ModelManager.CameraModel.CameraTransform.GetRelativeTransform(
                    s,
                  ).op_Multiply(a)),
                r.Tick(0),
                (m = r.PlayerLocation),
                (m = s.InverseTransformPosition(m.ToUeVector())),
                (a = a.TransformPosition(m)),
                (m = Vector_1.Vector.Create(a)),
                (a = Vector_1.Vector.Create(n.GetLocation())),
                (n = Vector_1.Vector.Create()),
                o &&
                  this.rWa(m, a, n) &&
                  !n.Equals(a) &&
                  ((t = !0),
                  (o = Vector_1.Vector.Dist(m, n)),
                  (c.BeforeTeleportCameraSettings =
                    new UE.SCameraModifier_Settings()),
                  (c.BeforeTeleportCameraSettings.Priority = E),
                  (c.BeforeTeleportCameraSettings.IsModifiedArmLength = !0),
                  (c.BeforeTeleportCameraSettings.ArmLength = o),
                  (c.BeforeTeleportCameraSettings.IsLockInput = !0),
                  _.ApplyCameraModify(
                    void 0,
                    0,
                    e * CommonDefine_1.SECOND_PER_MILLIONSECOND,
                    0,
                    0,
                    c.BeforeTeleportCameraSettings,
                    void 0,
                    l?.FadeInCurve,
                    l?.FadeOutCurve,
                    void 0,
                    "",
                    void 0,
                  ),
                  _.Update(0)),
                CameraUtility_1.CameraUtility.GetCameraCharacterRotation(
                  MathUtils_1.MathUtils.CommonTempRotator,
                ),
                (c.AfterTeleportCameraSettings =
                  new UE.SCameraModifier_Settings()),
                c.BeforeTeleportCameraSettings?.IsModifiedArmLength &&
                  ((c.AfterTeleportCameraSettings.IsModifiedArmLength = !0),
                  (c.AfterTeleportCameraSettings.ArmLength =
                    c.BeforeTeleportCameraSettings.ArmLength)),
                (c.AfterTeleportCameraSettings.Priority = E),
                (c.AfterTeleportCameraSettings.IsModifiedArmRotation = !0),
                (c.AfterTeleportCameraSettings.IsModifiedArmRotationPitch = !0),
                (c.AfterTeleportCameraSettings.IsModifiedArmRotationYaw = !0),
                (c.AfterTeleportCameraSettings.IsModifiedArmRotationRoll = !0),
                (c.AfterTeleportCameraSettings.ArmRotation = new UE.Rotator(
                  r.CameraRotation.Pitch -
                    MathUtils_1.MathUtils.CommonTempRotator.Pitch,
                  r.CameraRotation.Yaw -
                    MathUtils_1.MathUtils.CommonTempRotator.Yaw,
                  r.CameraRotation.Roll -
                    MathUtils_1.MathUtils.CommonTempRotator.Roll,
                )),
                (c.AfterTeleportCameraSettings.ResetFinalArmRotation = !0),
                (c.AfterTeleportCameraSettings.IsResetFinalArmRotationToSpecificPitch =
                  !0),
                (c.AfterTeleportCameraSettings.ResetFinalArmRotationToSpecificPitch =
                  r.CameraRotation.Pitch),
                (c.AfterTeleportCameraSettings.IsResetFinalArmRotationToSpecificYaw =
                  !0),
                (c.AfterTeleportCameraSettings.ResetFinalArmRotationToSpecificYaw =
                  r.CameraRotation.Yaw -
                  MathUtils_1.MathUtils.CommonTempRotator.Yaw),
                (c.AfterTeleportCameraSettings.IsLockInput = !0)),
                SceneItemPortalComponent_1.sKa(
                  Math.max(ROLE_TELEPORT_SCREEN_EFFECT_INTERVAL, e),
                ),
                !t || e < TimerSystem_1.MIN_TIME
                  ? this.p4a(c)
                  : (h.Entity.GetComponent(177).SetTimeScale(
                      1 / 0,
                      0,
                      void 0,
                      e * CommonDefine_1.SECOND_PER_MILLIONSECOND,
                      11,
                    ),
                    TimerSystem_1.TimerSystem.Delay(() => {
                      this.p4a(c);
                    }, e));
            } else
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "SceneItem",
                  7,
                  "传送门: 失败,找不到当前玩家角色",
                );
          } else
            this.EnablePortalRipple(s.GetLocation()),
              SceneItemPortalComponent_1.P6a.add(i),
              this.p4a(c);
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              39,
              "传送门: 失败,找不到PortalCapture/PortalPair",
            );
      }
    }
    p4a(t) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneItem",
          39,
          "传送门: ExecTeleport",
          ["CreatureDataId", this.Wpo],
          ["PbDataId", this.wDe],
          [
            "ActorPos",
            Vector_1.Vector.Create(
              t.OtherActor?.D_GetTransform().GetLocation(),
            ),
          ],
          [
            "ActorRot",
            Rotator_1.Rotator.Create(t.OtherActor?.D_GetTransform().Rotator()),
          ],
        ),
        t.IsRole && this.v4a(t),
        this.PortalCapture?.Teleport(
          t.BeforeTeleportVelocityTransform,
          t.OtherActor,
          t.IsRole,
        ),
        this.f4a(t);
    }
    f4a(t) {
      var e, i, r, a, s;
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneItem",
          39,
          "传送门: AfterTeleport",
          ["CreatureDataId", this.Wpo],
          ["PbDataId", this.wDe],
          [
            "ActorPos",
            Vector_1.Vector.Create(
              t.OtherActor?.D_GetTransform().GetLocation(),
            ),
          ],
          [
            "ActorRot",
            Rotator_1.Rotator.Create(t.OtherActor?.D_GetTransform().Rotator()),
          ],
        ),
        this.DisablePortalRipple(),
        t.IsRole &&
          (UE.NiagaraFunctionLibrary.MarkNiagaraScalabilityNeedUpdate(
            GlobalData_1.GlobalData.World,
          ),
          (e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
            ?.Valid
            ? ((i = e.Entity.GetComponent(3)).ResetAllCachedTime(),
              (r = e.Entity.GetComponent(203)),
              (a = e.Entity.GetComponent(61)),
              (s =
                CameraController_1.CameraController.FightCamera?.LogicComponent
                  ?.CameraModifyController),
              t.AfterTeleportCameraSettings &&
                s?.ApplyCameraModify(
                  void 0,
                  0.1,
                  0,
                  0,
                  0,
                  t.AfterTeleportCameraSettings,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  "",
                  void 0,
                ),
              t.AfterTeleportInputDirection && t.AfterTeleportInputRotator
                ? (i.SetInputDirect(t.AfterTeleportInputDirection),
                  i.SetInputRotator(t.AfterTeleportInputRotator))
                : i.ClearInput(),
              a.ClearMoveVectorCache(),
              r.HasTag(-1371021686) &&
                r.HasTag(-1009010563) &&
                e.Entity.GetComponent(97)?.OnRoleTeleportThroughPortal(),
              r.HasTag(1491611589) &&
                e.Entity.GetComponent(64)?.OnRoleTeleport(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRolePassPortalAfterTeleport,
                e,
                t.InPortalComp,
                t.OutPortalComp,
              ),
              t.OriginEnableMovementSync &&
                e?.Entity?.GetComponent(66)?.SetEnableMovementSync(
                  !0,
                  "传送门: 传送完成",
                ))
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Teleport", 7, "传送门:失败,找不到当前玩家角色")),
        TimerSystem_1.TimerSystem.Next(() => {
          SceneItemPortalComponent_1.P6a.delete(t.OtherActor);
        });
    }
    v4a(t) {
      var e,
        t = t.AfterTeleportTransform?.GetLocation();
      t
        ? (((e = Protocol_1.Aki.Protocol.Km_.create()).F4n = this.Wpo),
          (e.P5n = Vector_1.Vector.Create(t)),
          Net_1.Net.Call(17343, e, (t) => {
            (t && t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("SceneItem", 39, "PassPortalRequest返回错误", [
                  "PortalEntityId",
                  this.Wpo,
                ]));
          }))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("SceneItem", 39, "PassPortalRequest获取新位置出错", [
            "PortalEntityId",
            this.Wpo,
          ]);
    }
    dIa(t) {
      var e = Vector_1.Vector.Create(this.ActorComp.ActorLocationProxy),
        t = Vector_1.Vector.Create(t.D_K2_GetActorLocation()),
        i = Vector_1.Vector.Create(this.ActorComp.ActorForwardProxy),
        r = Vector_1.Vector.Create(),
        t = (t.Subtraction(e, r), (r.Z = 0), r.Normalize(), i.DotProduct(r));
      return t > -MathUtils_1.MathUtils.SmallNumber;
    }
    Ull(t) {
      var e = Vector_1.Vector.Create(this.ActorComp.ActorLocationProxy),
        i = Vector_1.Vector.Create(t.ActorLocationProxy),
        t = Vector_1.Vector.Create(t.LastActorLocation),
        r = Vector_1.Vector.Create(this.ActorComp.ActorForwardProxy),
        a = Vector_1.Vector.Create(),
        e =
          (t.Subtraction(e, a),
          (a.Z = 0),
          a.Normalize(),
          r.DotProduct(a) > -MathUtils_1.MathUtils.SmallNumber),
        t =
          (t.Subtraction(i, a),
          (a.Z = 0),
          a.Normalize(),
          r.DotProduct(a) > -MathUtils_1.MathUtils.SmallNumber);
      return e && t;
    }
    Dll(t, e) {
      var i = "A" === this.s1n,
        r = i ? this.GetCreatureDataId() : this.GetPairCreatureDataId(),
        a = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
      if (!a) return !1;
      if (
        !ModelManager_1.ModelManager.CreatureModel?.GetEntity(
          this.qSa,
        )?.Entity?.GetComponent(213)
      )
        return !1;
      (a = i ? a.PortalWorldTransform1 : a.PortalWorldTransform2),
        (a = t.D_GetTransform().GetRelativeTransform(a).GetLocation());
      if (
        Math.abs(a.Y) > Math.abs(this.PortalBounds.Y) ||
        Math.abs(a.Z) > Math.abs(this.PortalBounds.Z)
      )
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              39,
              "传送门: 检查到进门时中心不在门框范围内",
              ["CreatureDataId", this.Wpo],
              ["PbDataId", this.wDe],
            ),
          ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(
            PORTAL_DEBUG_KEY,
          ) &&
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              "传送门: 检查到进门时中心不在门框范围内",
            ),
          !1
        );
      if (e) {
        if (
          !(t instanceof TsBaseCharacter_1.default && t.CharacterActorComponent)
        )
          return !1;
        a = PortalUtils_1.PortalUtils.GetMappingOffsetTransformToOtherPortal(
          t.D_GetTransform(),
          r,
          i,
          t.D_GetActorForwardVector(),
          PORTAL_TELEPORT_OFFSET,
        );
        if (!a) return !1;
        this.Rll(
          a.GetLocation(),
          a.GetLocation(),
          void 0,
          t.CharacterActorComponent,
        ) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              39,
              "传送门: 检查到玩家出门位置有碰撞，有穿地风险",
              ["CreatureDataId", this.Wpo],
              ["PbDataId", this.wDe],
            ),
          ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(
            PORTAL_DEBUG_KEY,
          )) &&
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
            "传送门: 检查到玩家出门位置有碰撞，有穿地风险",
          );
      }
      return !0;
    }
    static sKa(t = ROLE_TELEPORT_SCREEN_EFFECT_INTERVAL) {
      this.nKa(),
        (this.aKa =
          ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(
            ROLE_TELEPORT_SCREEN_EFFECT_PATH,
          )),
        (this.hKa = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          Global_1.Global.BaseCharacter?.D_GetTransform(),
          ROLE_TELEPORT_SCREEN_POST_PROCESS_EFFECT_PATH,
          "[SceneItemPortalComponent.PlayPortalScreenEffect]",
          new EffectContext_1.EffectContext(
            Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint(),
          ),
        )),
        EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
          this.hKa,
          !0,
        ),
        this.lKa?.Valid() && TimerSystem_1.TimerSystem.Remove(this.lKa),
        (this.lKa = TimerSystem_1.TimerSystem.Delay(() => {
          this.nKa();
        }, t));
    }
    static nKa() {
      this.aKa &&
        ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(
          this.aKa,
        ),
        (this.aKa = void 0),
        this.hKa &&
          EffectSystem_1.EffectSystem.IsValid(this.hKa) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            this.hKa,
            "[SceneItemPortalComponent.EndPortalScreenEffects]",
            !1,
          ),
        (this.hKa = void 0),
        this.lKa?.Valid() && TimerSystem_1.TimerSystem.Remove(this.lKa),
        (this.lKa = void 0);
    }
    rWa(t, e, i) {
      var r;
      return (
        !!CameraController_1.CameraController.FightCamera?.LogicComponent &&
        !(
          !(r =
            CameraController_1.CameraController.FightCamera.LogicComponent
              .Character) ||
          (this.iWa ||
            ((this.iWa = UE.NewObject(UE.TraceSphereElement.StaticClass())),
            (this.iWa.bIsSingle = !0),
            (this.iWa.bIgnoreSelf = !0),
            (this.iWa.bTraceComplex = !1),
            (this.iWa.WorldContextObject = GlobalData_1.GlobalData.World),
            this.iWa.SetTraceTypeQuery(
              QueryTypeDefine_1.KuroTraceTypeQuery.Camera,
            )),
          (this.iWa.Radius =
            CameraController_1.CameraController.FightCamera.LogicComponent.CollisionProbeSize),
          this.iWa.ActorsToIgnore.Empty(),
          this.iWa.ActorsToIgnore.Add(r),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.iWa, t),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.iWa, e),
          ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(
            PORTAL_DEBUG_KEY,
          )
            ? (UE.KismetSystemLibrary.DrawDebugLine(
                GlobalData_1.GlobalData.World,
                new UE.Vector(t.X, t.Y, t.Z),
                new UE.Vector(e.X, e.Y, e.Z),
                new UE.LinearColor(0, 0, 1, 1),
                5,
                5,
              ),
              this.iWa.SetDrawDebugTrace(2),
              (this.iWa.DrawTime = 5),
              this.iWa.SetTraceColor(0, 1, 0, 1),
              this.iWa.SetTraceHitColor(1, 0, 0, 1))
            : this.iWa.SetDrawDebugTrace(0),
          !TraceElementCommon_1.TraceElementCommon.SphereTrace(
            this.iWa,
            "SceneItemPortalComponent.CameraTraceBlock",
          )) ||
          !this.iWa.HitResult?.bBlockingHit ||
          (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            this.iWa.HitResult,
            0,
            i,
          ),
          0)
        )
      );
    }
    Rll(t, e, i, r) {
      return (
        this.Lll ||
          ((this.Lll = UE.NewObject(UE.TraceCapsuleElement.StaticClass())),
          (this.Lll.bIsSingle = !0),
          (this.Lll.bIgnoreSelf = !0),
          (this.Lll.bTraceComplex = !1),
          (this.Lll.WorldContextObject = GlobalData_1.GlobalData.World),
          this.Lll.SetTraceTypeQuery(
            QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
          )),
        (this.Lll.Radius = r.ScaledRadius),
        (this.Lll.HalfHeight = r.ScaledHalfHeight),
        this.Lll.ActorsToIgnore.Empty(),
        this.Lll.ActorsToIgnore.Add(r.Actor),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Lll, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Lll, e),
        ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(
          PORTAL_DEBUG_KEY,
        )
          ? (UE.KismetSystemLibrary.DrawDebugLine(
              GlobalData_1.GlobalData.World,
              new UE.Vector(t.X, t.Y, t.Z),
              new UE.Vector(e.X, e.Y, e.Z),
              new UE.LinearColor(0, 0, 1, 1),
              5,
              5,
            ),
            this.Lll.SetDrawDebugTrace(2),
            (this.Lll.DrawTime = 5),
            this.Lll.SetTraceColor(0, 1, 0, 1),
            this.Lll.SetTraceHitColor(1, 0, 0, 1))
          : this.Lll.SetDrawDebugTrace(0),
        !(
          !TraceElementCommon_1.TraceElementCommon.CapsuleTrace(
            this.Lll,
            "SceneItemPortalComponent.RoleTeleportTraceBlock",
          ) ||
          !this.Lll.HitResult?.bBlockingHit ||
          (i &&
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(
              this.Lll.HitResult,
              0,
              i,
            ),
          0)
        )
      );
    }
  });
(SceneItemPortalComponent.aKa = void 0),
  (SceneItemPortalComponent.hKa = void 0),
  (SceneItemPortalComponent.lKa = void 0),
  (SceneItemPortalComponent.P6a = new Set()),
  (SceneItemPortalComponent = SceneItemPortalComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(213)],
      SceneItemPortalComponent,
    )),
  (exports.SceneItemPortalComponent = SceneItemPortalComponent);
//# sourceMappingURL=SceneItemPortalComponent.js.map
