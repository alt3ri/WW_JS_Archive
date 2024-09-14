"use strict";
var SceneItemPortalComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, r) {
      var s,
        o = arguments.length,
        a =
          o < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var _ = t.length - 1; 0 <= _; _--)
          (s = t[_]) &&
            (a = (o < 3 ? s(a) : 3 < o ? s(e, i, a) : s(e, i)) || a);
      return 3 < o && a && Object.defineProperty(e, i, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemPortalComponent = void 0);
const UE = require("ue"),
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
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  CameraUtility_1 = require("../../../../Camera/CameraUtility"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectParameterNiagara_1 = require("../../../../Effect/EffectParameter/EffectParameterNiagara"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PreloadControllerClassPart1_1 = require("../../../../Preload/PreloadControllerClassPart1"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils"),
  PortalUtils_1 = require("../../../../Utils/PortalUtils"),
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
  PORTAL_DEBUG_KEY = "Portal";
class PortalTeleportParam {
  constructor(t, e) {
    (this.OtherActor = t),
      (this.IsRole = e),
      (this.BeforeTeleportVelocityTransform = void 0),
      (this.BeforeTeleportCameraSettings = void 0),
      (this.AfterTeleportCameraSettings = void 0),
      (this.AfterTeleportInputDirection = void 0),
      (this.AfterTeleportInputRotator = void 0);
  }
}
let SceneItemPortalComponent =
  (SceneItemPortalComponent_1 = class SceneItemPortalComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.s1n = "A"),
        (this.D0a = INVALID_ENTITY),
        (this.mva = INVALID_ENTITY),
        (this.ActorComp = void 0),
        (this.vtn = void 0),
        (this.IsPlayerInRange = !1),
        (this.PortalCapture = void 0),
        (this.PortalEffectActorCache = void 0),
        (this.PortalTriggerActorCache = void 0),
        (this.wDe = 0),
        (this.Wpo = 0),
        (this.rQs = !1),
        (this.oQs = void 0),
        (this.kla = !1),
        (this.YKa = 0),
        (this.PortalBounds = Vector_1.Vector.Create()),
        (this.IsPortalPrepared = !1),
        (this.IsPortalRegistered = !1),
        (this.j3a = (t) => {
          (this.IsPlayerInRange = t),
            0 < SceneItemPortalComponent_1.Z3a.size ||
              (t
                ? (this.ROa(), this.W3a())
                : this.CanRegisterPortal() || this.K3a());
        }),
        (this.Rnn = () => {
          this.ROa(), this.W3a();
        }),
        (this.d5a = () => {
          this.ROa(), this.W3a();
        }),
        (this.Q3a = (t) => {
          t?.Valid &&
            (t = t.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.D0a === t &&
            (this.ROa(), this.W3a());
        }),
        (this.$3a = (t) => {
          t?.Valid &&
            (t = t.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.D0a === t &&
            this.PortalCapture?.IsValid() &&
            this.K3a();
        }),
        (this.l1n = (t, e) => {
          var i;
          e?.Valid &&
            (i = e.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.D0a === i &&
            this.PortalCapture?.IsValid() &&
            (EventSystem_1.EventSystem.HasWithTarget(
              e,
              EventDefine_1.EEventName.RemoveEntity,
              this.l1n,
            ) ||
              EventSystem_1.EventSystem.RemoveWithTargetUseKey(
                this,
                e,
                EventDefine_1.EEventName.RemoveEntity,
                this.l1n,
              ),
            this.K3a());
        }),
        (this.t7a = void 0);
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
      return this.mva;
    }
    SetPairCreatureDataId(t) {
      this.mva = t;
    }
    OnInitData(t) {
      var e = t.GetParam(SceneItemPortalComponent_1)[0];
      switch (e.Config.Type) {
        case "Dynamic":
          this.kla = !0;
          break;
        case "Static":
          (this.D0a = e.Config.LinkPortalEntityId),
            (this.rQs = e.Config.IsStreamSource || !1);
      }
      switch (
        ((this.s1n = e.Config.PortalModel),
        t.EntityData && (this.wDe = t.EntityData?.v9n),
        (this.Wpo = this.Entity.GetComponent(0).GetCreatureDataId()),
        e.Config.RenderConfig?.ViewDistance.Type)
      ) {
        case "Custom":
          (this.YKa = e.Config.RenderConfig.ViewDistance.Distance),
            Info_1.Info.IsBuildShipping ||
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "SceneItem",
                  40,
                  "传送门画面可视距离使用了自定义配置，可能造成性能问题，请检查是否为正式配置",
                  ["CreatureDataId", this.Wpo],
                  ["PbDataId", this.wDe],
                  ["CaptureMaxViewDistance", this.YKa],
                ));
          break;
        case "High":
          this.YKa = 1e4;
          break;
        case "Mid":
          this.YKa = 6e3;
          break;
        default:
          this.YKa = 3e3;
      }
      return !0;
    }
    OnStart() {
      return (
        (this.ActorComp = this.Entity.GetComponent(187)),
        (this.vtn = this.Entity.GetComponent(77)),
        this.vtn &&
          !EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.j3a,
          ) &&
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.j3a,
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
              this.Q3a,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.OnPortalRegister,
                this.Q3a,
              ),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnPortalUnRegister,
              this.$3a,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.OnPortalUnRegister,
                this.$3a,
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
          this.ActorComp?.GetIsSceneInteractionLoadCompleted()) &&
          this.Rnn(),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.OnPortalRegister,
          this.Q3a,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnPortalRegister,
            this.Q3a,
          ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.OnPortalUnRegister,
          this.$3a,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnPortalUnRegister,
            this.$3a,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.j3a,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.j3a,
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
        SceneItemPortalComponent_1.oja(),
        this.GetPortalEffectActor()?.IsValid && this.X3a(),
        this.PortalCapture?.IsValid() && this.K3a(),
        this.Y3a(),
        (this.PortalEffectActorCache = void 0),
        !(this.PortalTriggerActorCache = void 0)
      );
    }
    OnDisable(t) {
      this.Entity.IsInit && (this.K3a(), this.Y3a());
    }
    z3a() {
      var t;
      return (
        !!(4 & this.Entity.Flag) &&
        !!(
          this.ActorComp &&
          this.ActorComp?.GetIsSceneInteractionLoadCompleted() &&
          this.GetPortalEffectActor()?.IsValid() &&
          ((t = this.ActorComp.CreatureData.GetEntityOnlineInteractType()),
          PreloadControllerClassPart1_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            t,
            !1,
          ))
        )
      );
    }
    ROa() {
      var t, e, i;
      this.z3a() &&
        !this.IsPortalPrepared &&
        (this.PortalCapture?.IsValid() ||
          (this.PortalCapture = ActorSystem_1.ActorSystem.Spawn(
            UE.BP_KuroPortalCapture_C.StaticClass(),
            this.ActorComp.ActorTransform,
            this.ActorComp.Owner,
          )),
        this.PortalCapture?.IsValid() &&
          (this.PortalCapture.SetPbDataId(this.wDe),
          this.PortalCapture.K2_AttachToActor(
            this.ActorComp.Owner,
            void 0,
            1,
            1,
            1,
            !1,
          ),
          this.rQs &&
            !this.oQs?.IsValid() &&
            (this.oQs = this.nQs(
              this.ActorComp.ActorLocation,
              this.ActorComp.ActorRotation,
            )),
          (t = this.GetPortalEffectActor())?.IsValid())) &&
        (this.J3a(),
        EffectSystem_1.EffectSystem.IsPlaying(t.EffectComponent)
          ? (this.PortalCapture.Plane.K2_SetWorldTransform(
              t.RootComponent?.K2_GetComponentToWorld(),
              !1,
              void 0,
              !1,
            ),
            (i = t.EffectComponent),
            (e =
              EffectSystem_1.EffectSystem.GetNiagaraModelFloatParameter(
                i,
                PORTAL_EFFECT_PLANE_Y_KEY,
              ) ?? 1),
            (i =
              EffectSystem_1.EffectSystem.GetNiagaraModelFloatParameter(
                i,
                PORTAL_EFFECT_PLANE_Z_KEY,
              ) ?? 1),
            (this.PortalBounds.X = 0),
            (this.PortalBounds.Y = e / 2),
            (this.PortalBounds.Z = i / 2),
            this.kla &&
              PortalController_1.PortalController.AfterGenerateDynamicPortal(
                this,
              ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SceneItem",
                40,
                "传送门: PreparePortal Success",
                ["CreatureDataId", this.Wpo],
                ["PbDataId", this.wDe],
                ["IsDynamicPortal", this.kla],
                ["PortalBounds", this.PortalBounds],
                [
                  "PlaneTransform",
                  this.PortalCapture.Plane?.K2_GetComponentToWorld().ToString(),
                ],
              ),
            (this.IsPortalPrepared = !0))
          : EffectSystem_1.EffectSystem.DynamicRegisterSpawnCallback(
              t.EffectComponent,
              this.d5a,
            ));
    }
    Y3a() {
      this.IsPortalPrepared &&
        (this.PortalCapture?.IsValid() &&
          (this.PortalCapture.K2_DetachFromActor(),
          ActorSystem_1.ActorSystem.Put(this.PortalCapture),
          (this.PortalCapture = void 0)),
        this.rQs &&
          this.oQs?.IsValid() &&
          (this.yEr(this.oQs), (this.oQs = void 0)),
        this.kla &&
          PortalController_1.PortalController.AfterDeleteDynamicPortal(this),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            40,
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
        !PreloadControllerClassPart1_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          t,
          !1,
        )) ||
        ((t = this.kla
          ? PortalController_1.PortalController.GetPairDynamicPortal(this)
          : ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
              this.D0a,
            )?.Entity?.GetComponent(200)),
        !this.IsPortalPrepared) ||
        !t?.IsPortalPrepared ||
        (this.vtn && t.vtn && !this.IsPlayerInRange && !t?.IsPlayerInRange)
      );
    }
    W3a() {
      var t, e;
      this.CanRegisterPortal() &&
        !this.IsPortalRegistered &&
        (this.kla
          ? PortalController_1.PortalController.RegisterDynamicPortals()
          : ((e = (t =
              ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
                this.D0a,
              ))?.Entity?.GetComponent(200)),
            t?.IsInit &&
              e?.IsPortalPrepared &&
              ("A" === this.s1n
                ? (this.SetPairCreatureDataId(e.GetCreatureDataId()),
                  e.SetPairCreatureDataId(this.GetCreatureDataId()),
                  (e = new PortalController_1.PortalPairParams(
                    this.PortalCapture.Plane.K2_GetComponentToWorld(),
                    e.PortalCapture.Plane.K2_GetComponentToWorld(),
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
    K3a() {
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
          40,
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
          40,
          "传送门: AfterUnRegisterPair",
          ["CreatureDataId", this.Wpo],
          ["PbDataId", this.wDe],
        ),
        (this.IsPortalRegistered = !1),
        this.ZIa(),
        this.DisablePortalRenderingTarget();
    }
    GetPortalEffectActor() {
      if (this.PortalEffectActorCache) return this.PortalEffectActorCache;
      var t = this.ActorComp?.GetInteractionMainActor();
      if (t) {
        t = t.GetActorByKey(PORTAL_EFFECT_REF);
        if (t?.RootComponent && t.IsA(UE.BP_EffectActor_C.StaticClass()))
          return (this.PortalEffectActorCache = t);
      }
    }
    J3a() {
      var t = this.GetPortalEffectActor();
      t &&
        !t.EffectComponent &&
        t.Play("SceneItemPortalComponent.PlayPortalEffect");
    }
    X3a(t = !1) {
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
          new UE.LinearColor(t instanceof Vector_1.Vector ? t.ToUeVector() : t),
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
    GetCaptureIgnoredActors() {
      var t,
        e = this.kla
          ? PortalController_1.PortalController.GetPairDynamicPortal(this)
          : ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
              this.D0a,
            )?.Entity?.GetComponent(200);
      if (this.IsPortalPrepared && e?.IsPortalPrepared)
        return (
          (t =
            e.ActorComp.GetAllActorsInSceneInteractionLevel() ??
            UE.NewArray(UE.Actor)),
          (e = e.GetPortalEffectActor())?.IsValid() &&
            ((e = e.EffectComponent),
            (e = EffectSystem_1.EffectSystem.GetEffectActor(e)) instanceof
              UE.Actor) &&
            t.Add(e),
          t
        );
    }
    GetCaptureForceShowActors() {
      var t,
        e = this.kla
          ? PortalController_1.PortalController.GetPairDynamicPortal(this)
          : ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
              this.D0a,
            )?.Entity?.GetComponent(200);
      if (this.IsPortalPrepared && e?.IsPortalPrepared)
        return (
          (e = UE.NewArray(UE.Actor)),
          (t = UE.KuroGISystem.GetKuroGISystem(
            GlobalData_1.GlobalData.World.GetWorld(),
          )?.GetKuroGlobalGIActor()) &&
            (e.Add(t), t.DynamicCloudsActor) &&
            e.Add(t.DynamicCloudsActor),
          e
        );
    }
    GetCaptureMaxViewDistance() {
      return this.YKa;
    }
    GetTriggerActor() {
      if (this.PortalTriggerActorCache) return this.PortalTriggerActorCache;
      var t = this.ActorComp?.GetInteractionMainActor();
      if (t) {
        t = t.GetActorByKey(TELEPORT_TRIGGER_REF);
        if (t) return (this.PortalTriggerActorCache = t);
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
    ZIa() {
      var t = this.GetTriggerActor(),
        e = this.GetTriggerComp();
      t?.OnActorBeginOverlap.Clear(), e?.SetUseCCD(!1);
    }
    Fla(t) {
      var e = Global_1.Global.BaseCharacter;
      if (
        e &&
        (t === e || t instanceof UE.BP_BaseItem_C) &&
        !SceneItemPortalComponent_1.Z3a.has(t)
      ) {
        var i = e.CharacterActorComponent?.Entity.GetComponent(57);
        if (!i?.GetHoldingEntity() || t !== i?.GetHoldingActor()) {
          i = ActorUtils_1.ActorUtils.GetEntityByActor(t);
          if (this.cIa(t)) {
            if (i?.Valid) {
              var r = i.Entity.GetComponent(143);
              if (
                r &&
                r.CurrentState instanceof
                  SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState
              )
                return;
            }
            t !== this.ActorComp?.Owner && this.eFa(t, t === e);
          } else
            (r = i?.Entity?.GetComponent(143)) &&
              r.CurrentState instanceof
                SceneItemManipulableCastState_1.SceneItemManipulableCastState &&
              (e = r.CurrentState).HasHitCallback() &&
              e.CallHitCallback(t, this.ActorComp?.Owner);
        }
      }
    }
    eFa(e, i) {
      if (!SceneItemPortalComponent_1.Z3a.has(e)) {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            40,
            "传送门: BeforeTeleport",
            ["CreatureDataId", this.Wpo],
            ["PbDataId", this.wDe],
            [
              "ActorPos",
              Vector_1.Vector.Create(e?.GetTransform().GetLocation()),
            ],
            ["ActorRot", Rotator_1.Rotator.Create(e?.GetTransform().Rotator())],
          );
        let t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
          this.mva,
        )?.Entity;
        var r = (t =
          t || EntitySystem_1.EntitySystem.Get(this.mva))?.GetComponent(
          200,
        )?.PortalCapture;
        if (r) {
          const m = new PortalTeleportParam(e, i);
          var s = e.GetTransform(),
            o = e.GetTransform();
          let t = Vector_1.Vector.ZeroVector;
          if (i) {
            var a = e.GetComponentByClass(
              UE.CharacterMovementComponent.StaticClass(),
            );
            if (!a) return;
            t = a.Velocity;
          } else t = e.StaticMesh.GetComponentVelocity();
          a = t.ToOrientationRotator();
          if (
            ((a.Roll = o.Rotator().Roll),
            o.SetRotation(a.Quaternion()),
            (m.BeforeTeleportVelocityTransform = o),
            this.EnablePortalRipple(s.GetLocation()),
            SceneItemPortalComponent_1.Z3a.add(e),
            i)
          ) {
            a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
            if (a?.Valid) {
              o = a.Entity.GetComponent(190);
              if (o.HasTag(-1371021686) && o.HasTag(-1009010563)) this.tFa(m);
              else {
                var i = "A" === this.s1n,
                  o = i
                    ? this.GetCreatureDataId()
                    : this.GetPairCreatureDataId(),
                  o =
                    PortalUtils_1.PortalUtils.GetPlayerTransformAfterPortalTeleport(
                      s,
                      o,
                      i,
                    ),
                  i = a.Entity.GetComponent(3),
                  _ =
                    (i.InputDirectProxy.IsZero()
                      ? (m.AfterTeleportInputDirection =
                          Vector_1.Vector.ZeroVectorProxy)
                      : (i.InputDirectProxy.ToOrientationQuat(
                          MathUtils_1.MathUtils.CommonTempQuat,
                        ),
                        (_ = s.InverseTransformRotation(
                          MathUtils_1.MathUtils.CommonTempQuat.ToUeQuat(),
                        )),
                        (m.AfterTeleportInputDirection = Vector_1.Vector.Create(
                          o.TransformRotation(_).GetForwardVector(),
                        ))),
                    i.InputRotatorProxy.Quaternion(
                      MathUtils_1.MathUtils.CommonTempQuat,
                    ),
                    s.InverseTransformRotation(
                      MathUtils_1.MathUtils.CommonTempQuat.ToUeQuat(),
                    )),
                  i =
                    ((m.AfterTeleportInputRotator = Rotator_1.Rotator.Create(
                      o.TransformRotation(_).Rotator(),
                    )),
                    PreloadControllerClassPart1_1.CameraController.FightCamera
                      ?.LogicComponent),
                  _ = i?.CameraModifyController,
                  n =
                    i?.CameraConfigController?.GetCameraConfigByTag(1827994262);
                let t = !1,
                  e = n
                    ? n.FadeInTime * CommonDefine_1.MILLIONSECOND_PER_SECOND
                    : DEFAULT_ROLE_TELEPORT_PERFORM_TIME;
                e < TimerSystem_1.MIN_TIME && (e = 0);
                var h = n?.Priority ?? DEFAULT_ROLE_TELEPORT_PERFORM_PRIORITY,
                  l = this.PortalCapture.GetTransform(),
                  r = r.GetTransform(),
                  E = Vector_1.Vector.Create(),
                  l =
                    (MathUtils_1.MathUtils.CommonTempRotator.FromUeRotator(
                      l.Rotator(),
                    ),
                    MathUtils_1.MathUtils.CommonTempRotator.Quaternion(
                      MathUtils_1.MathUtils.CommonTempQuat,
                    ).GetUpVector(E),
                    Vector_1.Vector.Create()),
                  r =
                    (MathUtils_1.MathUtils.CommonTempRotator.FromUeRotator(
                      r.Rotator(),
                    ),
                    MathUtils_1.MathUtils.CommonTempRotator.Quaternion(
                      MathUtils_1.MathUtils.CommonTempQuat,
                    ).GetUpVector(l),
                    E.Equals(l));
                i &&
                  _ &&
                  ((E =
                    ModelManager_1.ModelManager.CameraModel.CameraTransform.GetRelativeTransform(
                      s,
                    ).op_Multiply(o)),
                  i.Tick(0),
                  (l = i.PlayerLocation),
                  (s = s.InverseTransformPosition(l.ToUeVector())),
                  (l = o.TransformPosition(s)),
                  (o = Vector_1.Vector.Create(l)),
                  (s = Vector_1.Vector.Create(E.GetLocation())),
                  (l = Vector_1.Vector.Create()),
                  r &&
                    this.i7a(o, s, l) &&
                    !l.Equals(s) &&
                    ((t = !0),
                    (E = Vector_1.Vector.Dist(o, l)),
                    (m.BeforeTeleportCameraSettings =
                      new UE.SCameraModifier_Settings()),
                    (m.BeforeTeleportCameraSettings.Priority = h),
                    (m.BeforeTeleportCameraSettings.IsModifiedArmLength = !0),
                    (m.BeforeTeleportCameraSettings.ArmLength = E),
                    (m.BeforeTeleportCameraSettings.IsLockInput = !0),
                    _.ApplyCameraModify(
                      void 0,
                      0,
                      e * CommonDefine_1.SECOND_PER_MILLIONSECOND,
                      0,
                      0,
                      m.BeforeTeleportCameraSettings,
                      void 0,
                      n?.FadeInCurve,
                      n?.FadeOutCurve,
                      void 0,
                      "",
                      void 0,
                    ),
                    _.Update(0)),
                  CameraUtility_1.CameraUtility.GetCameraCharacterRotation(
                    MathUtils_1.MathUtils.CommonTempRotator,
                  ),
                  (m.AfterTeleportCameraSettings =
                    new UE.SCameraModifier_Settings()),
                  m.BeforeTeleportCameraSettings?.IsModifiedArmLength &&
                    ((m.AfterTeleportCameraSettings.IsModifiedArmLength = !0),
                    (m.AfterTeleportCameraSettings.ArmLength =
                      m.BeforeTeleportCameraSettings.ArmLength)),
                  (m.AfterTeleportCameraSettings.Priority = h),
                  (m.AfterTeleportCameraSettings.IsModifiedArmRotation = !0),
                  (m.AfterTeleportCameraSettings.IsModifiedArmRotationPitch =
                    !0),
                  (m.AfterTeleportCameraSettings.IsModifiedArmRotationYaw = !0),
                  (m.AfterTeleportCameraSettings.IsModifiedArmRotationRoll =
                    !0),
                  (m.AfterTeleportCameraSettings.ArmRotation = new UE.Rotator(
                    i.CameraRotation.Pitch -
                      MathUtils_1.MathUtils.CommonTempRotator.Pitch,
                    i.CameraRotation.Yaw -
                      MathUtils_1.MathUtils.CommonTempRotator.Yaw,
                    i.CameraRotation.Roll -
                      MathUtils_1.MathUtils.CommonTempRotator.Roll,
                  )),
                  (m.AfterTeleportCameraSettings.ResetFinalArmRotation = !0),
                  (m.AfterTeleportCameraSettings.IsResetFinalArmRotationToSpecificPitch =
                    !0),
                  (m.AfterTeleportCameraSettings.ResetFinalArmRotationToSpecificPitch =
                    i.CameraRotation.Pitch),
                  (m.AfterTeleportCameraSettings.IsResetFinalArmRotationToSpecificYaw =
                    !0),
                  (m.AfterTeleportCameraSettings.ResetFinalArmRotationToSpecificYaw =
                    i.CameraRotation.Yaw -
                    MathUtils_1.MathUtils.CommonTempRotator.Yaw),
                  (m.AfterTeleportCameraSettings.IsLockInput = !0)),
                  SceneItemPortalComponent_1.nja(
                    Math.max(ROLE_TELEPORT_SCREEN_EFFECT_INTERVAL, e),
                  ),
                  !t || e < TimerSystem_1.MIN_TIME
                    ? this.tFa(m)
                    : (a.Entity.GetComponent(165).SetTimeScale(
                        1 / 0,
                        0,
                        void 0,
                        e * CommonDefine_1.SECOND_PER_MILLIONSECOND,
                        11,
                      ),
                      TimerSystem_1.TimerSystem.Delay(() => {
                        this.tFa(m);
                      }, e));
              }
            } else
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "SceneItem",
                  7,
                  "传送门:失败,找不到当前玩家角色",
                ),
                SceneItemPortalComponent_1.Z3a.delete(e);
          } else this.tFa(m);
        }
      }
    }
    tFa(t) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneItem",
          40,
          "传送门: ExecTeleport",
          ["CreatureDataId", this.Wpo],
          ["PbDataId", this.wDe],
          [
            "ActorPos",
            Vector_1.Vector.Create(t.OtherActor?.GetTransform().GetLocation()),
          ],
          [
            "ActorRot",
            Rotator_1.Rotator.Create(t.OtherActor?.GetTransform().Rotator()),
          ],
        ),
        this.PortalCapture?.Teleport(
          t.BeforeTeleportVelocityTransform,
          t.OtherActor,
          t.IsRole,
        ),
        this.iFa(t);
    }
    iFa(t) {
      var e, i, r, s, o, a;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneItem",
          40,
          "传送门: AfterTeleport",
          ["CreatureDataId", this.Wpo],
          ["PbDataId", this.wDe],
          [
            "ActorPos",
            Vector_1.Vector.Create(t.OtherActor?.GetTransform().GetLocation()),
          ],
          [
            "ActorRot",
            Rotator_1.Rotator.Create(t.OtherActor?.GetTransform().Rotator()),
          ],
        ),
        this.DisablePortalRipple(),
        t.IsRole &&
          ((e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
            ?.Valid
            ? ((i = e.Entity.GetComponent(190)),
              (r = e.Entity.GetComponent(3)),
              (s = e.Entity.GetComponent(54)),
              (a = (o =
                PreloadControllerClassPart1_1.CameraController.FightCamera
                  ?.LogicComponent)?.CameraModifyController),
              t.AfterTeleportCameraSettings &&
                (r.ResetAllCachedTime(),
                a?.ApplyCameraModify(
                  void 0,
                  0,
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
                o?.Tick(0)),
              t.AfterTeleportInputDirection && t.AfterTeleportInputRotator
                ? (r.SetInputDirect(t.AfterTeleportInputDirection),
                  r.SetInputRotator(t.AfterTeleportInputRotator))
                : r.ClearInput(),
              s.ClearMoveVectorCache(),
              i.HasTag(-1371021686) &&
                (i.HasTag(-1009010563)
                  ? e.Entity.GetComponent(90)?.OnRoleTeleport()
                  : i.HasTag(400631093) ||
                    e.Entity.GetComponent(34).StopGroup1Skill(
                      "Portal Stop skill",
                    )),
              i.HasTag(1491611589) &&
                e.Entity.GetComponent(57)?.OnRoleTeleport(),
              this.rFa())
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Teleport", 7, "传送门:失败,找不到当前玩家角色")),
        TimerSystem_1.TimerSystem.Next(() => {
          SceneItemPortalComponent_1.Z3a.delete(t.OtherActor);
        });
    }
    rFa() {
      var t = Protocol_1.Aki.Protocol.Veh.create();
      (t.F4n = this.Wpo),
        Net_1.Net.Call(18590, t, (t) => {
          (t && t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("SceneItem", 40, "PassPortalRequest返回错误", [
                "PortalEntityId",
                this.Wpo,
              ]));
        });
    }
    cIa(t) {
      var e = Vector_1.Vector.Create(this.ActorComp.ActorLocationProxy),
        t = Vector_1.Vector.Create(t.K2_GetActorLocation()),
        i = Vector_1.Vector.Create(this.ActorComp.ActorForwardProxy),
        r = Vector_1.Vector.Create(),
        t = (t.Subtraction(e, r), (r.Z = 0), r.Normalize(), i.DotProduct(r));
      return t > -MathUtils_1.MathUtils.SmallNumber;
    }
    static nja(t = ROLE_TELEPORT_SCREEN_EFFECT_INTERVAL) {
      this.oja(),
        (this.sja =
          ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(
            ROLE_TELEPORT_SCREEN_EFFECT_PATH,
          )),
        (this.aja = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          Global_1.Global.BaseCharacter?.GetTransform(),
          ROLE_TELEPORT_SCREEN_POST_PROCESS_EFFECT_PATH,
          "[SceneItemPortalComponent.PlayPortalScreenEffect]",
          new EffectContext_1.EffectContext(
            Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint(),
          ),
        )),
        EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
          this.aja,
          !0,
        ),
        this.lja?.Valid() && TimerSystem_1.TimerSystem.Remove(this.lja),
        (this.lja = TimerSystem_1.TimerSystem.Delay(() => {
          this.oja();
        }, t));
    }
    static oja() {
      this.sja &&
        ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(
          this.sja,
        ),
        (this.sja = void 0),
        this.aja &&
          EffectSystem_1.EffectSystem.IsValid(this.aja) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            this.aja,
            "[SceneItemPortalComponent.EndPortalScreenEffects]",
            !1,
          ),
        (this.aja = void 0),
        this.lja?.Valid() && TimerSystem_1.TimerSystem.Remove(this.lja),
        (this.lja = void 0);
    }
    i7a(t, e, i) {
      var r;
      return (
        !!PreloadControllerClassPart1_1.CameraController.FightCamera
          ?.LogicComponent &&
        !(
          !(r =
            PreloadControllerClassPart1_1.CameraController.FightCamera
              .LogicComponent.Character) ||
          (this.t7a ||
            ((this.t7a = UE.NewObject(UE.TraceSphereElement.StaticClass())),
            (this.t7a.bIsSingle = !0),
            (this.t7a.bIgnoreSelf = !0),
            (this.t7a.bTraceComplex = !1),
            (this.t7a.WorldContextObject = GlobalData_1.GlobalData.World),
            this.t7a.SetTraceTypeQuery(
              QueryTypeDefine_1.KuroTraceTypeQuery.Camera,
            )),
          (this.t7a.Radius =
            PreloadControllerClassPart1_1.CameraController.FightCamera.LogicComponent.CollisionProbeSize),
          this.t7a.ActorsToIgnore.Empty(),
          this.t7a.ActorsToIgnore.Add(r),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.t7a, t),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.t7a, e),
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
              this.t7a.SetDrawDebugTrace(2),
              (this.t7a.DrawTime = 5),
              this.t7a.SetTraceColor(0, 1, 0, 1),
              this.t7a.SetTraceHitColor(1, 0, 0, 1))
            : this.t7a.SetDrawDebugTrace(0),
          !TraceElementCommon_1.TraceElementCommon.SphereTrace(
            this.t7a,
            "SceneItemPortalComponent.CameraTraceBlock",
          )) ||
          !this.t7a.HitResult?.bBlockingHit ||
          (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
            this.t7a.HitResult,
            0,
            i,
          ),
          0)
        )
      );
    }
    nQs(t, e) {
      var i = new UE.Transform(),
        i =
          (i.SetLocation(t),
          i.SetRotation(new UE.Quat(e)),
          i.SetScale3D(new UE.Vector(1, 1, 1)),
          ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), i));
      return (
        i.AddComponentByClass(
          UE.SceneComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        ),
        i.K2_SetActorLocation(t, !1, void 0, !1),
        i
          .AddComponentByClass(
            UE.WorldPartitionStreamingSourceComponent.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          )
          .EnableStreamingSource(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Level",
            7,
            "Portal StreamingSource生成信息",
            ["Location", t],
            ["Rotation", e],
            ["PbDataId", this.wDe],
          ),
        i
      );
    }
    yEr(t) {
      ActorSystem_1.ActorSystem.Put(t);
    }
  });
(SceneItemPortalComponent.sja = void 0),
  (SceneItemPortalComponent.aja = void 0),
  (SceneItemPortalComponent.lja = void 0),
  (SceneItemPortalComponent.Z3a = new Set()),
  (SceneItemPortalComponent = SceneItemPortalComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(200)],
      SceneItemPortalComponent,
    )),
  (exports.SceneItemPortalComponent = SceneItemPortalComponent);
//# sourceMappingURL=SceneItemPortalComponent.js.map
