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
        (this.Jun = void 0),
        (this.zun = void 0),
        (this.md = void 0),
        (this.Zun = void 0),
        (this.zie = void 0),
        (this.ecn = void 0),
        (this.tcn = void 0),
        (this.icn = void 0),
        (this.ocn = void 0),
        (this.rcn = void 0),
        (this.ncn = void 0),
        (this.scn = void 0),
        (this.acn = Vector_1.Vector.Create()),
        (this.Lo = void 0),
        (this.hcn = () => {
          this.Entity.GetComponent(116).RemoveStopMoveCallback(this.hcn),
            this.ocn ||
              (EventSystem_1.EventSystem.AddWithTarget(
                this,
                EventDefine_1.EEventName.OnSceneItemHitByHitData,
                this.Zln,
              ),
              (this.ocn = !0)),
            this.BDe();
        }),
        (this.Zln = (e) => {
          this.lcn(e) &&
            e.ReBulletData.Base.DamageId !== BigInt(0) &&
            !this.Entity.GetComponent(120).IsInState(3) &&
            (e = TimeUtil_1.TimeUtil.GetServerTimeStamp()) - this.ncn >
              this.rcn * THOUSAND &&
            (LevelGamePlayController_1.LevelGamePlayController.ShootTargetHitGearStateChangeRequest(
              this.Entity.Id,
              (e) => {
                if (e)
                  if (
                    e.Q4n ===
                    Protocol_1.Aki.Protocol.Q4n.Proto_ErrTargetGearFinished
                  )
                    Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn("World", 32, "靶机关已完成");
                  else {
                    if (
                      e.Q4n !==
                      Protocol_1.Aki.Protocol.Q4n
                        .Proto_ErrTargetGearEntityNotExist
                    )
                      return e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
                        ? e.Q4n ===
                          Protocol_1.Aki.Protocol.Q4n
                            .Proto_ErrOnlineInteractNoPermission
                          ? void 0
                          : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                              e.Q4n,
                              19766,
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
            (this.ncn = e));
        }),
        (this.lcn = (e) => {
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
        ((this.Lo = t),
        (this.icn = !!t.Patrol),
        this.icn
          ? ((this.zun = t.Patrol?.SplineEntityId),
            (this.ecn = t.Patrol?.IsCircle),
            (this.tcn = t.Patrol?.IsLookDir))
          : ((this.zun = void 0), (this.ecn = void 0), (this.tcn = void 0)),
        (this.ocn = !1),
        (this.rcn = t.HitCd || MIN_HIT_CD),
        (this.ncn = 0),
        t.HitBullet)
      ) {
        var o;
        switch (t.HitBullet.Type) {
          case IComponent_1.EHitBulletType.OnlyDropAttack:
            this.scn = 1994027462;
            break;
          case IComponent_1.EHitBulletType.CrystalBulletAttack:
            (this.scn = -1590436469),
              (o = t.HitBullet.TrackOffset),
              (this.acn = Vector_1.Vector.Create(o.X, o.Y, o.Z));
            break;
          case IComponent_1.EHitBulletType.PlayerAttack:
          case IComponent_1.EHitBulletType.FixedBulletId:
        }
      }
      return (
        this.Entity.GetComponent(109).SetLogicRange(
          ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange,
        ),
        !0
      );
    }
    OnStart() {
      if (((this.Hte = this.Entity.GetComponent(187)), !this.Hte))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              30,
              "[SceneItemPatrolComponent.OnInit] SceneItemPatrolComponent初始化失败 Actor Component Undefined",
            ),
          !1
        );
      (this.Jun = this.Entity.GetComponent(141)),
        this.Jun.RegisterComponent(this, this.Lo);
      var e = this.Entity.GetComponent(145);
      if (
        (e &&
          e.SetEnableMovementSync(
            !1,
            "GamePlayHitGearComponent OnStart默认关闭",
          ),
        this.icn && this.zun)
      ) {
        var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
          this.zun,
        );
        if (!t)
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                32,
                "[GamePlayHitGearComponent.OnStart] 无法找到Spline Entity",
                ["SplineEntityId", this.zun],
              ),
            !1
          );
        var o = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "SplineComponent",
        );
        if (!o)
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                32,
                "[GamePlayHitGearComponent.OnStart] 无法找到SplineComponent配置",
                ["SplineEntityId", this.zun],
              ),
            !1
          );
        if (o.Option.Type !== IComponent_1.ESplineType.Patrol)
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                32,
                "[GamePlayHitGearComponent.OnStart] SplineComponent配置类型不是Patrol",
                ["SplineEntityId", this.zun],
              ),
            !1
          );
        this.zie =
          ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
            this.zun,
            this.Entity.GetComponent(0).GetPbDataId(),
          );
        var o = Vector_1.Vector.Create(
            t.Transform?.Pos.X ?? 0,
            t.Transform?.Pos.Y ?? 0,
            t.Transform?.Pos.Z ?? 0,
          ),
          t =
            ((this.md =
              ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
                this.zun,
              )),
            (this.Zun = this.md.SplineData),
            this.md.K2_SetActorLocation(o.ToUeVector(), !1, void 0, !1),
            this.Entity.GetComponent(116)),
          o = Vector_1.Vector.Create(
            this.zie.GetWorldLocationAtDistanceAlongSpline(0),
          ),
          i =
            Vector_1.Vector.Dist(o, this.Hte.ActorLocationProxy) /
            SPEED_TO_PATROL;
        t.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(o, i)),
          t.AddStopMoveCallback(this.hcn),
          e && e.SetEnableMovementSync(!0, "GamePlayHitGearComponent");
      }
      return (
        this.icn ||
          (EventSystem_1.EventSystem.AddWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.Zln,
          ),
          (this.ocn = !0)),
        !0
      );
    }
    BDe() {
      var e = UE.NewArray(UE.BuiltinFloat),
        t = UE.NewArray(UE.BuiltinFloat);
      for (const o of this.Zun.Points)
        e.Add(o.MoveSpeed), t.Add(o.StayTime ?? -1);
      this.Entity.GetComponent(116).StartPatrol(
        this.zie,
        e,
        t,
        !0,
        this.ecn,
        this.tcn,
      );
    }
    OnEnd() {
      return (
        this.icn &&
          this.zun &&
          ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
            this.zun,
            this.Entity.GetComponent(0).GetPbDataId(),
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          this.Zln,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.Zln,
          ),
        (this.Jun = void 0),
        Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
        !0
      );
    }
    IsCanBeManipulateLock() {
      var e = this.Entity.GetComponent(181);
      return -1590436469 === this.scn && e.HasTag(-3775711);
    }
    GetHitPoint() {
      var e = Vector_1.Vector.Create(this.acn),
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
    [(0, RegisterComponent_1.RegisterComponent)(127)],
    GamePlayHitGearComponent,
  )),
  (exports.GamePlayHitGearComponent = GamePlayHitGearComponent);
//# sourceMappingURL=GamePlayHitGearComponent.js.map
