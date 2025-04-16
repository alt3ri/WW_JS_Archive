"use strict";
var GamePlayHitGearComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, o) {
      var n,
        r = arguments.length,
        s =
          r < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, i, o);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (n = t[a]) &&
            (s = (r < 3 ? n(s) : 3 < r ? n(e, i, s) : n(e, i)) || s);
      return 3 < r && s && Object.defineProperty(e, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamePlayHitGearComponent = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralController_1 = require("../../LevelGamePlay/LevelGeneralController"),
  SplineMoveTaskUtils_1 = require("../../LevelGamePlay/SplineMoveTask/SplineMoveTaskUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent"),
  SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils"),
  SPEED_TO_PATROL = 500,
  THOUSAND = 1e3,
  MIN_HIT_CD = 0.05,
  hitBulletTypeToIntEnum = new Map(
    Object.entries(IComponent_1.EHitBulletType).map(([, t], e) => [t, e]),
  );
class EntityCondition {
  constructor(t) {
    (this.PbDataId = t), (this.TagListeners = new Map());
  }
}
let GamePlayHitGearComponent =
  (GamePlayHitGearComponent_1 = class GamePlayHitGearComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.Jun = void 0),
        (this._pn = void 0),
        (this.Gce = void 0),
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
        (this.hPl = !1),
        (this._Pl = void 0),
        (this.uPl = void 0),
        (this.cPl = void 0),
        (this.cEn = 0),
        (this.mPl = !0),
        (this.Lo = void 0),
        (this.dPl = () => {
          this.Gce?.RemoveStopMoveCallback(this.dPl),
            this._pn?.SetEnableMovementSync(
              !1,
              "GamePlayHitGearComponent OnInitialSimpleMoveStopCallback",
            ),
            this.ocn ||
              (EventSystem_1.EventSystem.AddWithTarget(
                this,
                EventDefine_1.EEventName.OnSceneItemHitByHitData,
                this.Zln,
              ),
              (this.ocn = !0)),
            (this.hPl = !0),
            this.CPl();
        }),
        (this.gPl = (t, e) => {
          this.pPl(), this.fPl();
        }),
        (this.CPl = () => {
          var t;
          this.hPl &&
            ((t = this.vPl()) && !this.Gce?.IsSplineMoving()
              ? this.BDe()
              : !t && this.Gce?.IsSplineMoving() && this.qDe());
        }),
        (this.Zln = (t) => {
          if (this.lcn(t) && 0 !== t.DamageId) {
            var e = this.Entity.GetComponent(131);
            if (!e.IsInState(3)) {
              e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
              if (e - this.ncn > this.rcn * THOUSAND) {
                this._pn?.CollectSampleAndSend(!0);
                var i,
                  o = new Array();
                if (
                  this.Lo.HitLogicType.Type ===
                  IComponent_1.EHitLogicType.ChangeTargetState
                )
                  for (const n of this.Lo.HitLogicType.TargetBulletHitConfigs)
                    SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchBulletType(
                      n.HitBullets,
                      t,
                      this.Entity,
                    ) &&
                      LevelGeneralController_1.LevelGeneralController.CheckConditionNew(
                        n.Conditions,
                        this.Entity.GetComponent(1)?.Owner,
                        LevelGeneralContextDefine_1.EntityContext.Create(
                          this.Entity.Id,
                        ),
                      ) &&
                      (i = hitBulletTypeToIntEnum.get(n.HitBullets.Type)) &&
                      o.push(i);
                LevelGamePlayController_1.LevelGamePlayController.ShootTargetHitGearStateChangeRequest(
                  this.Entity.Id,
                  o,
                  t.BulletId,
                  (t) => {
                    if (t)
                      if (
                        t.Q4n ===
                        Protocol_1.Aki.Protocol.Q4n.Proto_ErrTargetGearFinished
                      )
                        Log_1.Log.CheckWarn() &&
                          Log_1.Log.Warn("World", 31, "靶机关已完成");
                      else {
                        if (
                          t.Q4n !==
                          Protocol_1.Aki.Protocol.Q4n
                            .Proto_ErrTargetGearEntityNotExist
                        )
                          return t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
                            ? t.Q4n ===
                              Protocol_1.Aki.Protocol.Q4n
                                .Proto_ErrOnlineInteractNoPermission
                              ? void 0
                              : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                                  t.Q4n,
                                  17103,
                                )
                            : void (
                                this.Entity?.Valid &&
                                EventSystem_1.EventSystem.EmitWithTarget(
                                  this.Entity,
                                  EventDefine_1.EEventName.UpdateSceneItemState,
                                )
                              );
                        Log_1.Log.CheckWarn() &&
                          Log_1.Log.Warn("World", 31, "靶机关不存在");
                      }
                  },
                ),
                  (this.ncn = e);
              }
            }
          }
        }),
        (this.lcn = (t) => {
          return (
            !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
            (!!t.Attacker?.Valid &&
              t.Attacker.GetComponent(3).IsAutonomousProxy)
          );
        });
    }
    OnInitData(t) {
      var e = t.GetParam(GamePlayHitGearComponent_1)[0];
      if (
        ((this.Lo = e),
        (this.icn = !!e.Patrol),
        this.icn
          ? ((this.zun = e.Patrol?.SplineEntityId),
            (this.ecn = e.Patrol?.IsCircle),
            (this.tcn = e.Patrol?.IsLookDir))
          : ((this.zun = void 0), (this.ecn = void 0), (this.tcn = void 0)),
        (this.ocn = !1),
        (this.rcn = e.HitCd || MIN_HIT_CD),
        (this.ncn = 0),
        e.HitBullet)
      ) {
        var i;
        switch (e.HitBullet.Type) {
          case IComponent_1.EHitBulletType.OnlyDropAttack:
            this.scn = 1994027462;
            break;
          case IComponent_1.EHitBulletType.CrystalAttack:
            (this.scn = -1590436469),
              (i = e.HitBullet.TrackOffset),
              (this.acn = Vector_1.Vector.Create(i.X, i.Y, i.Z));
            break;
          case IComponent_1.EHitBulletType.PlayerAttack:
          case IComponent_1.EHitBulletType.FixedBulletId:
        }
      }
      this.Entity.GetComponent(119).SetLogicRange(
        ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange,
      );
      t = this.Lo?.Patrol?.StateConditions;
      if (t && 0 < t.length) {
        this._Pl = new Map();
        for (const n of t) {
          let t = this._Pl.get(n.EntityId);
          t ||
            ((t = new EntityCondition(n.EntityId)),
            this._Pl.set(n.EntityId, t));
          var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(n.State);
          if (void 0 === o)
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  39,
                  "[GamePlayHitGearComponent.OnInitData] 初始化失败, 移动条件配置了错误的TagName",
                ),
              !1
            );
          t.TagListeners.set(o, void 0);
        }
      }
      return !0;
    }
    OnStart() {
      if (((this.Hte = this.Entity.GetComponent(200)), !this.Hte))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneGameplay",
              29,
              "[SceneItemPatrolComponent.OnInit] SceneItemPatrolComponent初始化失败 Actor Component Undefined",
            ),
          !1
        );
      if (
        ((this.Jun = this.Entity.GetComponent(152)),
        this.Jun.RegisterComponent(this, this.Lo),
        (this._pn = this.Entity.GetComponent(66)),
        (this.Gce = this.Entity.GetComponent(126)),
        this._pn?.SetEnableMovementSync(
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
                31,
                "[GamePlayHitGearComponent.OnStart] 无法找到Spline Entity",
                ["SplineEntityId", this.zun],
              ),
            !1
          );
        var e = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "SplineComponent",
        );
        if (!e)
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                31,
                "[GamePlayHitGearComponent.OnStart] 无法找到SplineComponent配置",
                ["SplineEntityId", this.zun],
              ),
            !1
          );
        if (e.Option.Type !== IComponent_1.ESplineType.Patrol)
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                31,
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
        (e = Vector_1.Vector.Create(
          t.Transform?.Pos.X ?? 0,
          t.Transform?.Pos.Y ?? 0,
          t.Transform?.Pos.Z ?? 0,
        )),
          (t =
            ((this.md =
              ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
                this.zun,
              )),
            (this.Zun = this.md.SplineData),
            this.md.D_K2_SetActorLocation(e.ToUeVector(), !1, void 0, !1),
            Vector_1.Vector.Create(
              this.zie.D_GetLocationAtDistanceAlongSpline(0, 1),
            ))),
          (e =
            Vector_1.Vector.Dist(t, this.Hte.ActorLocationProxy) /
            SPEED_TO_PATROL);
        this._pn?.SetEnableMovementSync(
          !0,
          "GamePlayHitGearComponent InitialSimpleMove",
        ),
          this.Gce.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(t, e)),
          this.Gce.AddStopMoveCallback(this.dPl),
          this.fPl();
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
    fPl() {
      if (this._Pl && !(this._Pl.size <= 0)) {
        let t = !1;
        for (var [e] of this._Pl)
          if (
            !ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)
              ?.IsInit
          ) {
            t = !0;
            break;
          }
        if (t)
          this.uPl ||
            (this.uPl = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
              "GamePlayHitGearComponent.TryRegisterMoveCondition",
              Array.from(this._Pl.keys()),
              (t) => {
                t
                  ? ((this.uPl = void 0), this.fPl())
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "SceneItem",
                      39,
                      "[GamePlayHitGearComponent.RegisterMoveCondition] WaitEntity失败",
                    );
              },
              -1,
              !1,
              !1,
            ));
        else {
          for (var [i, o] of this._Pl) {
            var i =
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  i,
                ),
              n = i.Entity?.GetComponent(203);
            if (n) {
              for (var [r, s] of o.TagListeners)
                s ||
                  ((s = n.ListenForTagAddOrRemove(r, this.CPl)) &&
                    o.TagListeners.set(r, s));
              EventSystem_1.EventSystem.HasWithTarget(
                i,
                EventDefine_1.EEventName.RemoveEntity,
                this.gPl,
              ) ||
                EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
                  this,
                  i,
                  EventDefine_1.EEventName.RemoveEntity,
                  this.gPl,
                );
            } else
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  39,
                  "[GamePlayHitGearComponent.TryRegisterMoveCondition] 监听的实体缺少tagComp",
                  ["EntityId", this.Entity.Id],
                  ["ConditionEntityPbDataId", i.PbDataId],
                );
          }
          this.CPl();
        }
      }
    }
    pPl() {
      if (this._Pl && !(this._Pl.size <= 0))
        for (var [t, e] of this._Pl) {
          for (var [i, o] of e.TagListeners)
            o && o.EndTask(), e.TagListeners.set(i, void 0);
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
          t &&
            !EventSystem_1.EventSystem.HasWithTarget(
              t,
              EventDefine_1.EEventName.RemoveEntity,
              this.gPl,
            ) &&
            EventSystem_1.EventSystem.RemoveWithTargetUseKey(
              this,
              t,
              EventDefine_1.EEventName.RemoveEntity,
              this.gPl,
            );
        }
    }
    BDe() {
      if (!this.cPl) {
        var t = [],
          e = [];
        for (const i of this.Zun.Points)
          t.push(i.MoveSpeed), e.push(i.StayTime ?? 0);
        this.cPl =
          SplineMoveTaskUtils_1.SplineMoveTaskUtils.ParseOldSceneItemPatrolParamToSplineMoveWithConstantTimeParam(
            this.zie,
            t,
            e,
            !0,
            this.ecn,
            this.tcn,
            e[0],
          );
      }
      this.mPl
        ? ((this.cPl.StartTimeOffset = this.Zun.Points[0]?.StayTime ?? 0),
          (this.cPl.StartDis = -1),
          (this.cPl.EndDis = -1),
          (this.mPl = !1))
        : ((this.cPl.StartTimeOffset = 0), (this.cPl.StartDis = this.cEn)),
        this.Gce.StartSplineMoveAtConstantTimeImplement(this.cPl) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              39,
              "[GamePlayHitGearComponent.StartPatrol] 样条移动开始失败",
              ["EntityId", this.Entity.Id],
              ["SplineMoveParam", this.cPl],
            ),
          this._pn?.SetEnableMovementSync(
            !1,
            "GamePlayHitGearComponent StartPatrol Failed",
          ));
    }
    qDe() {
      this.Gce?.IsSplineMoving() &&
        ((this.cEn = this.Gce.GetDistanceAloneSpline()),
        this.Gce.StopMove(),
        this._pn?.SetEnableMovementSync(
          !1,
          "GamePlayHitGearComponent StopPatrol",
        ));
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
        this.pPl(),
        (this.Jun = void 0),
        Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
        !0
      );
    }
    IsCanBeManipulateLock() {
      var t = this.Entity.GetComponent(194);
      return -1590436469 === this.scn && t.HasTag(-3775711);
    }
    GetHitPoint() {
      var t = Vector_1.Vector.Create(this.acn),
        e = Vector_1.Vector.Create(),
        i = Vector_1.Vector.Create();
      return (
        this.Hte.ActorForwardProxy.Multiply(t.X, i),
        e.AdditionEqual(i),
        this.Hte.ActorRightProxy.Multiply(t.Y, i),
        e.AdditionEqual(i),
        this.Hte.ActorUpProxy.Multiply(t.Z, i),
        e.AdditionEqual(i),
        this.Hte.ActorLocationProxy.Addition(e, e),
        e
      );
    }
    vPl() {
      if (this._Pl && !(this._Pl.size <= 0))
        for (var [t, e] of this._Pl) {
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
          if (!t?.Valid) return !1;
          t = t.Entity?.GetComponent(203);
          if (!t) return !1;
          if (!t.HasAnyTag(e.TagListeners.keys())) return !1;
        }
      return !0;
    }
  });
(GamePlayHitGearComponent = GamePlayHitGearComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(138)],
    GamePlayHitGearComponent,
  )),
  (exports.GamePlayHitGearComponent = GamePlayHitGearComponent);
//# sourceMappingURL=GamePlayHitGearComponent.js.map
