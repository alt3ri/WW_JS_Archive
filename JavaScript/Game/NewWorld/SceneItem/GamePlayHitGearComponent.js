"use strict";
var GamePlayHitGearComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, o, i) {
      var n,
        r = arguments.length,
        s =
          r < 3
            ? t
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(t, o))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, o, i);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (n = e[a]) &&
            (s = (r < 3 ? n(s) : 3 < r ? n(t, o, s) : n(t, o)) || s);
      return 3 < r && s && Object.defineProperty(t, o, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamePlayHitGearComponent = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent"),
  SPEED_TO_PATROL = 500,
  THOUSAND = 1e3,
  MIN_HIT_CD = 0.05;
let GamePlayHitGearComponent =
  (GamePlayHitGearComponent_1 = class GamePlayHitGearComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.pcn = void 0),
        (this.vcn = void 0),
        (this.md = void 0),
        (this.Mcn = void 0),
        (this.zie = void 0),
        (this.Scn = void 0),
        (this.Ecn = void 0),
        (this.ycn = void 0),
        (this.Icn = void 0),
        (this.Tcn = void 0),
        (this.Lcn = void 0),
        (this.Dcn = void 0),
        (this.Rcn = Vector_1.Vector.Create()),
        (this.Acn = () => {
          this.Entity.GetComponent(113).RemoveStopMoveCallback(this.Acn),
            this.Icn ||
              (EventSystem_1.EventSystem.AddWithTarget(
                this,
                EventDefine_1.EEventName.OnSceneItemHitByHitData,
                this.M1n,
              ),
              (this.Icn = !0)),
            this.BDe();
        }),
        (this.gIe = () => {}),
        (this.M1n = (e) => {
          this.Ucn(e) &&
            e.ReBulletData.Base.DamageId !== BigInt(0) &&
            !this.Entity.GetComponent(117).IsInState(3) &&
            (e = TimeUtil_1.TimeUtil.GetServerTimeStamp()) - this.Lcn >
              this.Tcn * THOUSAND &&
            (LevelGamePlayController_1.LevelGamePlayController.ShootTargetHitGearStateChangeRequest(
              this.Entity.Id,
              (e) => {
                if (e)
                  if (
                    e.lkn ===
                    Protocol_1.Aki.Protocol.lkn.Proto_ErrTargetGearFinished
                  )
                    Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn("World", 32, "靶机关已完成");
                  else {
                    if (
                      e.lkn !==
                      Protocol_1.Aki.Protocol.lkn
                        .Proto_ErrTargetGearEntityNotExist
                    )
                      return e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
                        ? e.lkn ===
                          Protocol_1.Aki.Protocol.lkn
                            .Proto_ErrOnlineInteractNoPermission
                          ? void 0
                          : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                              e.lkn,
                              26180,
                            )
                        : void (
                            this.Entity?.Valid &&
                            EventSystem_1.EventSystem.EmitWithTarget(
                              this.Entity,
                              EventDefine_1.EEventName.UpdateSceneItemState,
                            )
                          );
                    Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn("World", 32, "靶机关不存在");
                  }
              },
            ),
            (this.Lcn = e));
        }),
        (this.Ucn = (e) => {
          return (
            !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
            (!!e.Attacker?.Valid &&
              e.Attacker.GetComponent(1).IsAutonomousProxy)
          );
        });
    }
    OnInitData(e) {
      var t = e.GetParam(GamePlayHitGearComponent_1)[0];
      if (
        ((this.ycn = !!t.Patrol),
        this.ycn
          ? ((this.vcn = t.Patrol?.SplineEntityId),
            (this.Scn = t.Patrol?.IsCircle),
            (this.Ecn = t.Patrol?.IsLookDir))
          : ((this.vcn = void 0), (this.Scn = void 0), (this.Ecn = void 0)),
        (this.Icn = !1),
        (this.Tcn = t.HitCd || MIN_HIT_CD),
        (this.Lcn = 0),
        (this.pcn = this.Entity.GetComponent(138)),
        this.pcn.RegisterComponent(this, t),
        t.HitBullet)
      ) {
        var o;
        switch (t.HitBullet.Type) {
          case IComponent_1.EHitBulletType.OnlyDropAttack:
            this.Dcn = 1994027462;
            break;
          case IComponent_1.EHitBulletType.CrystalBulletAttack:
            (this.Dcn = -1590436469),
              (o = t.HitBullet.TrackOffset),
              (this.Rcn = Vector_1.Vector.Create(o.X, o.Y, o.Z));
            break;
          case IComponent_1.EHitBulletType.PlayerAttack:
          case IComponent_1.EHitBulletType.FixedBulletId:
        }
      }
      return (
        this.Entity.GetComponent(106).SetLogicRange(
          ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange,
        ),
        !0
      );
    }
    OnStart() {
      if (((this.Hte = this.Entity.GetComponent(182)), !this.Hte))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[SceneItemPatrolComponent.OnInit] SceneItemPatrolComponent初始化失败 Actor Component Undefined",
            ),
          !1
        );
      if (this.ycn && this.vcn) {
        var e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
          this.vcn,
        );
        if (!e)
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                32,
                "[GamePlayHitGearComponent.OnStart] 无法找到Spline Entity",
                ["SplineEntityId", this.vcn],
              ),
            !1
          );
        var t = (0, IComponent_1.getComponent)(
          e.ComponentsData,
          "SplineComponent",
        );
        if (!t)
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                32,
                "[GamePlayHitGearComponent.OnStart] 无法找到SplineComponent配置",
                ["SplineEntityId", this.vcn],
              ),
            !1
          );
        if (t.Option.Type !== IComponent_1.ESplineType.Patrol)
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                32,
                "[GamePlayHitGearComponent.OnStart] SplineComponent配置类型不是Patrol",
                ["SplineEntityId", this.vcn],
              ),
            !1
          );
        this.zie =
          ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
            this.vcn,
            this.Entity.GetComponent(0).GetPbDataId(),
          );
        var t = Vector_1.Vector.Create(
            e.Transform?.Pos.X ?? 0,
            e.Transform?.Pos.Y ?? 0,
            e.Transform?.Pos.Z ?? 0,
          ),
          e =
            ((this.md =
              ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
                this.vcn,
              )),
            (this.Mcn = this.md.SplineData),
            this.md.K2_SetActorLocation(t.ToUeVector(), !1, void 0, !1),
            this.Entity.GetComponent(113)),
          t = Vector_1.Vector.Create(
            this.zie.GetWorldLocationAtDistanceAlongSpline(0),
          ),
          o =
            Vector_1.Vector.Dist(t, this.Hte.ActorLocationProxy) /
            SPEED_TO_PATROL;
        e.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(t, o)),
          e.AddStopMoveCallback(this.Acn);
      }
      return (
        this.ycn ||
          (EventSystem_1.EventSystem.AddWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.M1n,
          ),
          (this.Icn = !0)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          this.gIe,
        ),
        !0
      );
    }
    BDe() {
      var e = UE.NewArray(UE.BuiltinFloat);
      for (const t of this.Mcn.Points) e.Add(t.MoveSpeed);
      this.Entity.GetComponent(113).StartPatrol(
        this.zie,
        e,
        !0,
        this.Scn,
        this.Ecn,
      );
    }
    OnEnd() {
      return (
        this.ycn &&
          this.vcn &&
          ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
            this.vcn,
            this.Entity.GetComponent(0).GetPbDataId(),
          ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          this.M1n,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          this.gIe,
        ),
        (this.pcn = void 0),
        Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
        !0
      );
    }
    IsCanBeManipulateLock() {
      var e = this.Entity.GetComponent(177);
      return -1590436469 === this.Dcn && e.HasTag(-3775711);
    }
    GetHitPoint() {
      var e = Vector_1.Vector.Create(this.Rcn),
        t = Vector_1.Vector.Create(),
        o = Vector_1.Vector.Create();
      return (
        this.Hte.ActorForwardProxy.Multiply(e.X, o),
        t.AdditionEqual(o),
        this.Hte.ActorRightProxy.Multiply(e.Y, o),
        t.AdditionEqual(o),
        this.Hte.ActorUpProxy.Multiply(e.Z, o),
        t.AdditionEqual(o),
        this.Hte.ActorLocationProxy.Addition(t, t),
        t
      );
    }
  });
(GamePlayHitGearComponent = GamePlayHitGearComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(124)],
    GamePlayHitGearComponent,
  )),
  (exports.GamePlayHitGearComponent = GamePlayHitGearComponent);
//# sourceMappingURL=GamePlayHitGearComponent.js.map
