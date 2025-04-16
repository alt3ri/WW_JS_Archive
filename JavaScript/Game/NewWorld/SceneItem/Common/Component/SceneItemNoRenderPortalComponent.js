"use strict";
var SceneItemNoRenderPortalComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, r, o) {
      var i,
        a = arguments.length,
        s =
          a < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, r))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, r, o);
      else
        for (var n = e.length - 1; 0 <= n; n--)
          (i = e[n]) &&
            (s = (a < 3 ? i(s) : 3 < a ? i(t, r, s) : i(t, r)) || s);
      return 3 < a && s && Object.defineProperty(t, r, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemNoRenderPortalComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController"),
  LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../../Module/ScrollingTips/ScrollingTipsController"),
  SeamlessTravelDefine_1 = require("../../../../Module/SeamlessTravel/SeamlessTravelDefine"),
  TeleportController_1 = require("../../../../Module/Teleport/TeleportController"),
  TeleportDefine_1 = require("../../../../Module/Teleport/TeleportDefine"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  PortalUtils_1 = require("../../../../Utils/PortalUtils"),
  SceneItemManipulableCastProjectileState_1 = require("../../Manipulate/SceneItemManipulableCastProjectileState"),
  SceneItemManipulableCastState_1 = require("../../Manipulate/SceneItemManipulableCastState"),
  INVALID_ENTITY = 0,
  TELEPORT_TRIGGER_REF = "TeleportTrigger",
  PORTAL_DEBUG_KEY = "Portal",
  PORTAL_TELEPORT_OFFSET = 200,
  NO_LOADING_SCREEN_EFFECT_MAX_INTERVAL = 1e3;
class NoRenderPortalTeleportParam {
  constructor(e, t, r, o) {
    (this.OtherActor = e),
      (this.IsRole = t),
      (this.InPortalComp = r),
      (this.AfterTeleportTransform = o),
      (this.OriginEnableMovementSync = !1),
      (this.AfterTeleportGravityDirect = void 0);
  }
}
let SceneItemNoRenderPortalComponent =
  (SceneItemNoRenderPortalComponent_1 = class SceneItemNoRenderPortalComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.IIl = "A"),
        (this.wDe = 0),
        (this.Wpo = 0),
        (this.TIl = INVALID_ENTITY),
        (this.Tln = INVALID_ENTITY),
        (this.ActorComp = void 0),
        (this.Eel = void 0),
        (this.Rd_ = void 0),
        (this.IsPortalPrepared = !1),
        (this.IsPortalConnected = !1),
        (this.R0n = void 0),
        (this.Rnn = () => {
          this.xka(), this.LIl();
        }),
        (this._ln = (e, t) => {
          var r;
          t?.Valid &&
            (r = t.Entity.GetComponent(0)?.GetPbDataId()) &&
            this.TIl === r &&
            (EventSystem_1.EventSystem.HasWithTarget(
              t,
              EventDefine_1.EEventName.RemoveEntity,
              this._ln,
            ) &&
              EventSystem_1.EventSystem.RemoveWithTargetUseKey(
                this,
                t,
                EventDefine_1.EEventName.RemoveEntity,
                this._ln,
              ),
            this.RIl());
        }),
        (this.Lll = void 0);
    }
    GetPbDataId() {
      return this.wDe;
    }
    GetCreatureDataId() {
      return this.Wpo;
    }
    GetPortalModel() {
      return this.IIl;
    }
    GetTargetCreatureDataId() {
      return this.Tln;
    }
    SetTargetCreatureDataId(e) {
      this.Tln = e;
    }
    OnInitData(e) {
      var t = e.GetParam(SceneItemNoRenderPortalComponent_1)[0];
      return (
        (this.R0n = t),
        "Static" === this.R0n.Config.Type &&
          (this.TIl = this.R0n.Config.LinkPortalEntityId),
        (this.IIl = this.R0n.Config.PortalModel),
        e.EntityData && (this.wDe = e.EntityData?.v9n),
        (this.Wpo = this.Entity.GetComponent(0).GetCreatureDataId()),
        !0
      );
    }
    OnStart() {
      return (this.ActorComp = this.Entity.GetComponent(200)), !0;
    }
    OnActivate() {
      return (
        this.ActorComp?.Valid &&
          (EventSystem_1.EventSystem.HasWithTarget(
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
        this.RIl(),
        this.R6a(),
        !(this.Eel = void 0)
      );
    }
    OnDisable(e) {
      this.Entity.IsInit && (this.RIl(), this.R6a());
    }
    U6a() {
      var e;
      return !!(
        4 & this.Entity.Flag &&
        this.ActorComp &&
        this.ActorComp?.GetIsSceneInteractionLoadCompleted() &&
        ((e = this.ActorComp.CreatureData.GetEntityOnlineInteractType()),
        LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          e,
          !1,
        ))
      );
    }
    xka() {
      !this.U6a() ||
        this.IsPortalPrepared ||
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            39,
            "无画面传送门: PreparePortal Success",
            ["CreatureDataId", this.Wpo],
            ["PbDataId", this.wDe],
            ["PlaneTransform", this.ActorComp?.ActorTransform],
          ),
        (this.IsPortalPrepared = !0));
    }
    R6a() {
      this.IsPortalPrepared &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            39,
            "无画面传送门: UnPreparePortal Success",
            ["CreatureDataId", this.Wpo],
            ["PbDataId", this.wDe],
          ),
        (this.IsPortalPrepared = !1));
    }
    CanConnectPortal() {
      var e;
      return (
        !!(4 & this.Entity.Flag) &&
        !(
          !this.ActorComp?.GetIsSceneInteractionLoadCompleted() ||
          ((e = this.ActorComp.CreatureData.GetEntityOnlineInteractType()),
          !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            e,
            !1,
          )) ||
          !this.IsPortalPrepared ||
          !(e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
            this.TIl,
          )?.Entity)?.GetComponent(1) ||
          ((e = e.GetComponent(214)) && !e.IsPortalPrepared)
        )
      );
    }
    LIl() {
      var e, t, r;
      this.CanConnectPortal() &&
        !this.IsPortalConnected &&
        (e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.TIl,
        ))?.Valid &&
        ((t = e.Entity.GetComponent(0).GetCreatureDataId()),
        (r = e.Entity.GetComponent(214)),
        this.SetTargetCreatureDataId(t),
        r?.SetTargetCreatureDataId(this.GetCreatureDataId()),
        this.AfterConnectPair(),
        r?.AfterConnectPair(),
        EventSystem_1.EventSystem.HasWithTarget(
          e,
          EventDefine_1.EEventName.RemoveEntity,
          this._ln,
        ) ||
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
            this,
            e,
            EventDefine_1.EEventName.RemoveEntity,
            this._ln,
          ));
    }
    RIl() {
      var e;
      this.IsPortalConnected &&
        ((e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.TIl,
        )?.Entity?.GetComponent(214)),
        this.SetTargetCreatureDataId(0),
        e?.SetTargetCreatureDataId(0),
        this.AfterDisconnectPair(),
        e?.AfterDisconnectPair());
    }
    AfterConnectPair() {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneItem",
          39,
          "无画面传送门: AfterConnectPair",
          ["CreatureDataId", this.Wpo],
          ["PbDataId", this.wDe],
        ),
        (this.IsPortalConnected = !0),
        this.Nla();
    }
    AfterDisconnectPair() {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneItem",
          39,
          "无画面传送门: AfterDisconnectPair",
          ["CreatureDataId", this.Wpo],
          ["PbDataId", this.wDe],
        ),
        (this.IsPortalConnected = !1),
        this.tTa();
    }
    GetTriggerActor() {
      if (this.Eel) return this.Eel;
      var e = this.ActorComp?.GetInteractionMainActor();
      if (e) {
        e = e.GetActorByKey(TELEPORT_TRIGGER_REF);
        if (e) return (this.Eel = e);
      }
    }
    GetTriggerComp() {
      var e = this.GetTriggerActor();
      if (e) return e.GetComponentByClass(UE.ShapeComponent.StaticClass());
    }
    GetTeleportToSelfTransformProxy() {
      var e = this.GetTriggerActor();
      if (e) {
        var t = this.R0n?.Config.TeleportToSelfPos;
        if (t)
          return (
            this.Rd_ || (this.Rd_ = Transform_1.Transform.Create()),
            this.Rd_.SetScale3D(Vector_1.Vector.OneVectorProxy),
            this.Rd_.GetLocation().FromConfigVector(t),
            this.Rd_.SetRotation(e.K2_GetActorRotation().Quaternion()),
            this.Rd_
          );
      }
    }
    Nla() {
      var e = this.GetTriggerActor(),
        t = this.GetTriggerComp();
      e &&
        t &&
        (t.SetUseCCD(!0),
        e.OnActorBeginOverlap.Add((e, t) => {
          this.Fla(t);
        }));
    }
    tTa() {
      var e = this.GetTriggerActor(),
        t = this.GetTriggerComp();
      e?.OnActorBeginOverlap.Clear(), t?.SetUseCCD(!1);
    }
    Fla(e) {
      var t = Global_1.Global.BaseCharacter;
      if (t && (e === t || e instanceof UE.BP_BaseItem_C))
        if (SceneItemNoRenderPortalComponent_1.P6a.has(e))
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              39,
              "无画面传送门: actor正在传送中，不允许重复触发",
              ["CreatureDataId", this.Wpo],
              ["PbDataId", this.wDe],
            );
        else {
          var r = t.CharacterActorComponent?.Entity.GetComponent(64);
          if (!r?.GetHoldingEntity() || e !== r?.GetHoldingActor()) {
            var r = ActorUtils_1.ActorUtils.GetEntityByActor(e),
              o = r?.Entity?.GetComponent(1),
              o = (o?.ResetAllCachedTime(), o ? this.Ull(o) : this.dIa(e));
            if (o) {
              o = this.lFl(e);
              if (o)
                if (this.Dll(e, e === t)) {
                  if (r?.Valid) {
                    o = r.Entity.GetComponent(154);
                    if (
                      o &&
                      o.CurrentState instanceof
                        SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState
                    )
                      return;
                  }
                  e !== this.ActorComp?.Owner && this.g4a(e, e === t);
                } else
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "SceneItem",
                      39,
                      "无画面传送门: 无法安全通过传送门，忽略",
                      ["CreatureDataId", this.Wpo],
                      ["PbDataId", this.wDe],
                    );
              else
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneItem",
                    39,
                    "无画面传送门: 不满足过门条件组，忽略",
                    ["CreatureDataId", this.Wpo],
                    ["PbDataId", this.wDe],
                  );
            } else
              (o = r?.Entity?.GetComponent(154)) &&
                o.CurrentState instanceof
                  SceneItemManipulableCastState_1.SceneItemManipulableCastState &&
                (t = o.CurrentState).HasHitCallback() &&
                t.CallHitCallback(e, this.ActorComp?.Owner),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneItem",
                    39,
                    "无画面传送门: 不是从正面进入传送门，忽略",
                    ["CreatureDataId", this.Wpo],
                    ["PbDataId", this.wDe],
                  );
          }
        }
    }
    g4a(r, o) {
      if (!SceneItemNoRenderPortalComponent_1.P6a.has(r)) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            39,
            "无画面传送门: BeforeTeleport",
            ["CreatureDataId", this.Wpo],
            ["PbDataId", this.wDe],
            [
              "ActorPos",
              Vector_1.Vector.Create(r?.D_GetTransform().GetLocation()),
            ],
            [
              "ActorRot",
              Rotator_1.Rotator.Create(r?.D_GetTransform().Rotator()),
            ],
          );
        let e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
          this.Tln,
        )?.Entity;
        var i = (e =
            e || EntitySystem_1.EntitySystem.Get(this.Tln))?.GetComponent(214),
          a = this.GetTriggerActor()?.D_GetTransform(),
          s = i?.GetTriggerActor()?.D_GetTransform();
        if (a && s) {
          var n = r.D_GetTransform();
          if (o) {
            var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
            if (l?.Valid) {
              var _ = i?.R0n?.Config.GravityConfig?.GravityDirection,
                _ =
                  GravityUtils_1.GravityUtils.GetGravityDirectionByConfigAndActor(
                    _,
                    i?.ActorComp,
                  );
              let t = i?.GetTeleportToSelfTransformProxy()?.ToUeTransform();
              if (!t) {
                var h = r.GetComponentByClass(
                  UE.CharacterMovementComponent.StaticClass(),
                );
                if (!h) return;
                var c = Vector_1.Vector.Create(h.Velocity),
                  h = Vector_1.Vector.Create(h.Kuro_GetGravityDirect()),
                  m = -Vector_1.Vector.DotProduct(c, h),
                  h =
                    (h.Multiply(m, MathUtils_1.MathUtils.CommonTempVector),
                    c.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector),
                    r.D_GetActorForwardVector()),
                  m = this.GetTriggerActor()
                    .D_GetActorForwardVector()
                    .op_Multiply(-1);
                let e = m;
                0 < MathUtils_1.MathUtils.DotProduct(m, c)
                  ? (e = c)
                  : 0 < MathUtils_1.MathUtils.DotProduct(m, h) && (e = h),
                  (t =
                    PortalUtils_1.PortalUtils.GetMappingOffsetTransformByPortalTransform(
                      n,
                      a,
                      s,
                      _,
                      e,
                      PORTAL_TELEPORT_OFFSET,
                    ));
              }
              const v = new NoRenderPortalTeleportParam(r, o, this, t);
              v.AfterTeleportGravityDirect = _;
              c = l.Entity?.GetComponent(66);
              c &&
                ((m = c.GetEnableMovementSync()),
                (v.OriginEnableMovementSync = m)) &&
                c.SetEnableMovementSync(!1, "无画面传送门: 传送开始"),
                SceneItemNoRenderPortalComponent_1.P6a.add(r),
                this.p4a(v);
            } else
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "SceneItem",
                  7,
                  "无画面传送门: 失败,找不到当前玩家角色",
                );
          } else {
            SceneItemNoRenderPortalComponent_1.P6a.add(r);
            h =
              i?.GetTeleportToSelfTransformProxy()?.ToUeTransform() ??
              PortalUtils_1.PortalUtils.GetMappingTransformByPortalTransform(
                n,
                a,
                s,
              );
            const v = new NoRenderPortalTeleportParam(r, o, this, h);
            void this.p4a(v);
          }
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              39,
              "无画面传送门: 失败,传送门Transform不合法",
            );
      }
    }
    p4a(e) {
      var t = e.AfterTeleportTransform.GetLocation(),
        r = e.AfterTeleportTransform.Rotator(),
        o = e.AfterTeleportGravityDirect;
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            39,
            "无画面传送门: ExecTeleport",
            ["CreatureDataId", this.Wpo],
            ["PbDataId", this.wDe],
            ["ActorPos", e.OtherActor?.D_GetTransform().GetLocation()],
            ["ActorRot", e.OtherActor?.D_GetTransform().Rotator()],
            ["TargetPos", t],
            ["TargetRot", r],
            ["TargetGravityDirect", o],
          ),
        e.IsRole)
      )
        if (
          (this.v4a(e),
          TeleportController_1.TeleportController.QueryCanTeleportNoLoading(
            t,
            !0,
          ))
        )
          SceneItemNoRenderPortalComponent_1.PlayNoLoadingPassPortalEffects(
            this.R0n?.Config.TeleportSceneEffect?.ScreenEffectPath,
            this.R0n?.Config.TeleportSceneEffect?.WorldEffectPath,
            NO_LOADING_SCREEN_EFFECT_MAX_INTERVAL,
          ),
            (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 4),
            TeleportController_1.TeleportController.TeleportToPositionWithGravityNoLoading(
              t,
              r,
              o,
              "无画面传送门传送",
              !0,
              !0,
            )
              .finally()
              .finally(() => {
                this.f4a(e);
              });
        else {
          var i =
            TeleportController_1.TeleportController.ParseTeleportTransitionOptionToPb(
              this.R0n?.Config.TeleportLoadingEffect,
            );
          switch (i.p5n) {
            case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
              ModelManager_1.ModelManager.TeleportModel.TeleportMode = 0;
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
              (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 4),
                ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle &&
                  (TimerSystem_1.TimerSystem.Remove(
                    ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle,
                  ),
                  (ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle =
                    void 0)),
                (ModelManager_1.ModelManager.TeleportModel.SeamlessConfig =
                  new SeamlessTravelDefine_1.SeamlessTravelContext()),
                ModelManager_1.ModelManager.TeleportModel.SeamlessConfig.ParseConfig(
                  i.R$s,
                );
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
              ModelManager_1.ModelManager.TeleportModel.TeleportMode = 3;
              break;
            default:
              ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
          }
          var a = new TeleportDefine_1.TeleportContext(
            Protocol_1.Aki.Protocol.v4s.Xvs,
            void 0,
            void 0,
            void 0,
            i,
          );
          TeleportController_1.TeleportController.TeleportToPositionNoSync(
            t,
            r,
            o,
            "ClientSetPlayerPos",
            a,
          ).finally(() => {
            this.f4a(e);
          }),
            (ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId =
              void 0);
        }
      else e.OtherActor.D_K2_KuroTeleportTo(t, r), this.f4a(e);
    }
    f4a(e) {
      var t;
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneItem",
          39,
          "无画面传送门: AfterTeleport",
          ["CreatureDataId", this.Wpo],
          ["PbDataId", this.wDe],
          [
            "ActorPos",
            Vector_1.Vector.Create(
              e.OtherActor?.D_GetTransform().GetLocation(),
            ),
          ],
          [
            "ActorRot",
            Rotator_1.Rotator.Create(e.OtherActor?.D_GetTransform().Rotator()),
          ],
        ),
        e.IsRole &&
          ((t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
            ?.Valid
            ? e.OriginEnableMovementSync &&
              t?.Entity?.GetComponent(66)?.SetEnableMovementSync(
                !0,
                "无画面传送门: 传送完成",
              )
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Teleport",
                7,
                "无画面传送门:失败,找不到当前玩家角色",
              )),
        TimerSystem_1.TimerSystem.Next(() => {
          SceneItemNoRenderPortalComponent_1.P6a.delete(e.OtherActor);
        });
    }
    v4a(e) {
      if (e.AfterTeleportTransform) {
        const t = this.wDe,
          r = e.AfterTeleportTransform.GetLocation(),
          o = e.AfterTeleportTransform.Rotator();
        LevelGeneralNetworks_1.LevelGeneralNetworks.RequestClientTeleportByNoRenderPortal(
          t,
          r,
          o,
          (e) => {
            (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  39,
                  "无画面传送门: RequestRolePassPortal请求失败",
                  ["ConfigId", t],
                  ["Location", r],
                  ["Rotation", o],
                  ["Code", e?.Q4n],
                ));
          },
        );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            39,
            "无画面传送门: RequestRolePassPortal获取Transform出错",
            ["ConfigId", this.wDe],
          );
    }
    dIa(e) {
      var t,
        r,
        o = this.GetTriggerActor();
      return (
        !!o &&
        ((t = Vector_1.Vector.Create(o.D_K2_GetActorLocation())),
        (e = Vector_1.Vector.Create(e.D_K2_GetActorLocation())),
        (o = Vector_1.Vector.Create(o.D_GetActorForwardVector())),
        (r = Vector_1.Vector.Create()),
        e.Subtraction(t, r),
        (r.Z = 0),
        r.Normalize(),
        o.DotProduct(r) > -MathUtils_1.MathUtils.SmallNumber)
      );
    }
    Ull(e) {
      var t,
        r,
        o,
        i = this.GetTriggerActor();
      return (
        !!i &&
        ((o = Vector_1.Vector.Create(i.D_K2_GetActorLocation())),
        (t = Vector_1.Vector.Create(e.ActorLocationProxy)),
        (e = Vector_1.Vector.Create(e.LastActorLocation)),
        (i = Vector_1.Vector.Create(i.D_GetActorForwardVector())),
        (r = Vector_1.Vector.Create()),
        e.Subtraction(o, r),
        r.Normalize(),
        (o = i.DotProduct(r) > -MathUtils_1.MathUtils.SmallNumber),
        e.Subtraction(t, r),
        r.Normalize(),
        (e = i.DotProduct(r) > -MathUtils_1.MathUtils.SmallNumber),
        o) &&
        e
      );
    }
    Dll(t, r) {
      var o = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
        this.Tln,
      )?.Entity?.GetComponent(214);
      if (!o) return !1;
      if (r) {
        if (
          !(t instanceof TsBaseCharacter_1.default && t.CharacterActorComponent)
        )
          return !1;
        r = t.GetComponentByClass(UE.CharacterMovementComponent.StaticClass());
        if (!r) return !1;
        var i = o?.R0n?.Config.GravityConfig?.GravityDirection,
          i = GravityUtils_1.GravityUtils.GetGravityDirectionByConfigAndActor(
            i,
            o?.ActorComp,
          );
        let e = o.GetTeleportToSelfTransformProxy();
        if (!e) {
          var a = this.GetTriggerActor()?.D_GetTransform(),
            o = o.GetTriggerActor()?.D_GetTransform();
          if (!a || !o) return !1;
          e =
            PortalUtils_1.PortalUtils.GetMappingOffsetTransformByPortalTransform(
              t.D_GetTransform(),
              a,
              o,
              i,
              r.Velocity,
              PORTAL_TELEPORT_OFFSET,
            );
        }
        if (!e) return !1;
        this.Rll(
          e.GetLocation(),
          e.GetLocation(),
          void 0,
          t.CharacterActorComponent,
        ) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              39,
              "无画面传送门: 检查到玩家出门位置有碰撞，有穿地风险",
              ["CreatureDataId", this.Wpo],
              ["PbDataId", this.wDe],
            ),
          ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(
            PORTAL_DEBUG_KEY,
          )) &&
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
            "无画面传送门: 检查到玩家出门位置有碰撞，有穿地风险",
          );
      }
      return !0;
    }
    lFl(e) {
      var t,
        r = this.R0n?.Config.Condition;
      return (
        !r ||
        ((t = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id)),
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
          r,
          e,
          t,
        ))
      );
    }
    static PlayNoLoadingPassPortalEffects(e, t, r) {
      this.UIl(),
        e &&
          (this.DIl =
            ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(e)),
        t &&
          ((this.AIl = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            Global_1.Global.BaseCharacter?.D_GetTransform(),
            t,
            "[SceneItemNoRenderPortalComponent.PlayPortalScreenEffect]",
            new EffectContext_1.EffectContext(
              Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint(),
            ),
          )),
          EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
            this.AIl,
            !0,
          )),
        this.xIl?.Valid() && TimerSystem_1.TimerSystem.Remove(this.xIl),
        (this.xIl = TimerSystem_1.TimerSystem.Delay(() => {
          this.UIl();
        }, r));
    }
    static UIl() {
      this.DIl &&
        ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(
          this.DIl,
        ),
        (this.DIl = void 0),
        this.AIl &&
          EffectSystem_1.EffectSystem.IsValid(this.AIl) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            this.AIl,
            "[SceneItemNoRenderPortalComponent.EndPortalScreenEffects]",
            !1,
          ),
        (this.AIl = void 0),
        this.xIl?.Valid() && TimerSystem_1.TimerSystem.Remove(this.xIl),
        (this.xIl = void 0);
    }
    Rll(e, t, r, o) {
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
        (this.Lll.Radius = o.ScaledRadius),
        (this.Lll.HalfHeight = o.ScaledHalfHeight),
        this.Lll.ActorsToIgnore.Empty(),
        this.Lll.ActorsToIgnore.Add(o.Actor),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Lll, e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Lll, t),
        ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(
          PORTAL_DEBUG_KEY,
        )
          ? (UE.KismetSystemLibrary.DrawDebugLine(
              GlobalData_1.GlobalData.World,
              new UE.Vector(e.X, e.Y, e.Z),
              new UE.Vector(t.X, t.Y, t.Z),
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
            "SceneItemNoRenderPortalComponent.RoleTeleportTraceBlock",
          ) ||
          !this.Lll.HitResult?.bBlockingHit ||
          (r &&
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(
              this.Lll.HitResult,
              0,
              r,
            ),
          0)
        )
      );
    }
  });
(SceneItemNoRenderPortalComponent.DIl = void 0),
  (SceneItemNoRenderPortalComponent.AIl = void 0),
  (SceneItemNoRenderPortalComponent.xIl = void 0),
  (SceneItemNoRenderPortalComponent.P6a = new Set()),
  (SceneItemNoRenderPortalComponent = SceneItemNoRenderPortalComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(214)],
      SceneItemNoRenderPortalComponent,
    )),
  (exports.SceneItemNoRenderPortalComponent = SceneItemNoRenderPortalComponent);
//# sourceMappingURL=SceneItemNoRenderPortalComponent.js.map
