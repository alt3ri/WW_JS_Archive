"use strict";
var SceneItemLevitateMagnetComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, n) {
      var s,
        o = arguments.length,
        r =
          o < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(e, t, i, n);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (s = e[h]) &&
            (r = (o < 3 ? s(r) : 3 < o ? s(t, i, r) : s(t, i)) || r);
      return 3 < o && r && Object.defineProperty(t, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemLevitateMagnetComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent"),
  COS_45 = Math.cos((45 * Math.PI) / 180);
let SceneItemLevitateMagnetComponent =
  (SceneItemLevitateMagnetComponent_1 = class SceneItemLevitateMagnetComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Config = void 0),
        (this.Hte = void 0),
        (this.Gce = void 0),
        (this.C1n = void 0),
        (this.hpn = void 0),
        (this.Lie = void 0),
        (this.lpn = void 0),
        (this.Uxr = -1),
        (this.bMr = void 0),
        (this._pn = void 0),
        (this.Hme = (0, puerts_1.$ref)(void 0)),
        (this.upn = 0),
        (this.cpn = void 0),
        (this.Frr = Vector_1.Vector.Create()),
        (this.pIn = (e) => {
          e.Attacker.Id ===
            Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.Id &&
            LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
              this._pn,
            );
        }),
        (this.M1n = (e) => {
          if (!this.Gce.IsMoving && this.Hte?.IsAutonomousProxy) {
            if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
              switch (this._pn) {
                case 2:
                  return;
                case 0:
                  var t =
                    ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
                      e.Attacker.Id,
                      { ParamType: 1 },
                    );
                  if (t && !t.IsMyRole()) return;
                  if (e.Attacker.GetComponent(1).IsAutonomousProxy) break;
                  return;
              }
            var i,
              n,
              s = e.Attacker.GetComponent(1).ActorLocationProxy,
              o = Vector_1.Vector.Create();
            this.Hte.ActorLocationProxy.Subtraction(s, o),
              o.Normalize(),
              this.hpn?.Valid &&
                (([s, i, n] = this.hpn.GetNextMoveTargetOnHit(o)), s) &&
                ((s =
                  Vector_1.Vector.Dist2D(i, this.Hte.ActorLocationProxy) /
                  this.Config.MoveSpeed),
                this.Gce.AddMoveTarget(
                  new SceneItemMoveComponent_1.MoveTarget(i, s),
                ),
                (this.lpn = n),
                this.Enable(this.Uxr, "SceneItemLevitateMagnetComponent.OnHit"),
                this.hpn.RemoveMagnetTipsTag(),
                this.Lie.RemoveTag(-1063846162),
                this.mpn(o));
          }
        }),
        (this.gIe = (e, t) => {
          -1 < e.indexOf(-709838471) &&
            (EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHitByHitData,
              this.M1n,
            ),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
              this.pIn,
            ));
        }),
        (this.dpn = () => {
          (this.bMr = UE.NewObject(UE.TraceBoxElement.StaticClass())),
            (this.bMr.WorldContextObject = this.Hte.Owner),
            (this.bMr.bIsSingle = !0),
            (this.bMr.bIgnoreSelf = !0),
            this.bMr.AddObjectTypeQuery(
              QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
            ),
            this.bMr.AddObjectTypeQuery(
              QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic,
            ),
            this.bMr.AddObjectTypeQuery(
              QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
            ),
            this.bMr.AddObjectTypeQuery(
              QueryTypeDefine_1.KuroObjectTypeQuery.Destructible,
            ),
            (this.bMr.DrawTime = 0.5),
            (this.cpn =
              SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
                this.Hte.GetSceneInteractionLevelHandleId(),
              ));
          var t =
            SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
              this.Hte.GetSceneInteractionLevelHandleId(),
            );
          for (let e = 0; e < t.Num(); e++)
            this.bMr.ActorsToIgnore.Add(t.Get(e));
          this.upn =
            this.cpn.K2_GetActorLocation().Z - this.Hte.ActorLocationProxy.Z;
          var e = Vector_1.Vector.Create(),
            e =
              (this.Hte?.ActorUpProxy.Multiply(this.upn, e),
              (this.Frr = Vector_1.Vector.Create(this.Hte?.ActorLocationProxy)),
              this.Frr.AdditionEqual(e),
              this.Hte.ActorRotation);
          this.Hte.SetActorRotation(Rotator_1.Rotator.ZeroRotator),
            this.cpn.GetActorBounds(!1, void 0, this.Hme),
            TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(
              this.bMr,
              (0, puerts_1.$unref)(this.Hme),
            ),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              this.bMr,
              this.Frr,
            ),
            TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
              this.bMr,
              e,
            ),
            this.Hte.SetActorRotation(e);
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemLevitateMagnetComponent_1)[0];
      this.Config = e;
      e = this.Entity.GetComponent(0).GetBaseInfo();
      return (this._pn = e?.OnlineInteractType), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(182)),
        (this.Gce = this.Entity.GetComponent(113)),
        (this.C1n = this.Entity.GetComponent(138)),
        this.C1n.RegisterComponent(this),
        (this.hpn = this.Entity.GetComponent(122)),
        (this.Lie = this.Entity.GetComponent(177)),
        this.Lie.AddTag(-1063846162),
        this.Lie.ContainsTag(
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-709838471),
        ) ||
          (EventSystem_1.EventSystem.AddWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.M1n,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
            this.pIn,
          )),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.dpn,
        ),
        (this.Uxr = this.Disable("[SceneItemHitMoveComp]初始化关闭Tick")),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          this.M1n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.M1n,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
          this.pIn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
            this.pIn,
          ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.dpn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.dpn,
          ),
        !0
      );
    }
    OnTick(e) {
      this.Gce.IsMoving ||
        ((this.Uxr = this.Disable("[SceneItemHitMoveComp]运动结束关闭Tick")),
        this.hpn?.Valid && this.hpn.OnMove(this.lpn),
        this.Cpn(),
        this.Lie.AddTag(-1063846162));
    }
    mpn(e) {
      var t = Vector_1.Vector.Create(e),
        i = Vector_1.Vector.Create(this.Hte.ActorUpProxy),
        n = (i.Normalize(), Vector_1.Vector.Create());
      const s = e.DotProduct(i);
      i.Multiply(s, n), t.SubtractionEqual(n), t.Normalize();
      (e = Vector_1.Vector.Create(0, 0, 0)),
        this.Hte.ActorQuatProxy.RotateVector(
          Vector_1.Vector.BackwardVectorProxy,
          e,
        ),
        (i = Vector_1.Vector.Create(0, 0, 0)),
        this.Hte.ActorQuatProxy.RotateVector(
          Vector_1.Vector.LeftVectorProxy,
          i,
        ),
        (n = [
          { Direction: this.Hte.ActorForwardProxy, TagId: 503743627 },
          { Direction: this.Hte.ActorRightProxy, TagId: -1945582411 },
          { Direction: e, TagId: 1594082526 },
          { Direction: i, TagId: 1996023206 },
        ]);
      for (const o of n) {
        const s = MathUtils_1.MathUtils.DotProduct(t, o.Direction);
        if (s > COS_45) return void this.Lie.AddTag(o.TagId);
      }
    }
    Cpn() {
      this.Lie.RemoveTag(503743627),
        this.Lie.RemoveTag(1594082526),
        this.Lie.RemoveTag(1996023206),
        this.Lie.RemoveTag(-1945582411);
    }
    UpdateBoxTrace(e, t) {
      var i;
      this.bMr &&
        ((i =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
            this.Hte.GetSceneInteractionLevelHandleId(),
          )),
        (e = Vector_1.Vector.Create(e.GetBlockLocationByIndex(t))),
        (t = Vector_1.Vector.Create()),
        this.Hte?.ActorUpProxy.Multiply(this.upn, t),
        e?.AdditionEqual(t),
        (t = Rotator_1.Rotator.Create(this.Hte.ActorRotation)),
        this.Hte.SetActorRotation(Rotator_1.Rotator.ZeroRotator),
        i.GetActorBounds(!1, void 0, this.Hme),
        TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(
          this.bMr,
          (0, puerts_1.$unref)(this.Hme),
        ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bMr, e),
        TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(this.bMr, t),
        this.Hte.SetActorRotation(t.ToUeRotator()),
        (this.Frr = Vector_1.Vector.Create(this.cpn.K2_GetActorLocation())));
    }
    StartBoxTrace(e) {
      if (!this.bMr) return !1;
      SceneItemLevitateMagnetComponent_1.TraceDebug &&
        this.bMr.SetDrawDebugTrace(2);
      var t = Vector_1.Vector.Create(this.Frr),
        e = Vector_1.Vector.Create(e),
        e = (e.SubtractionEqual(t), Vector_1.Vector.Create(e)),
        i = Vector_1.Vector.Create(this.Hte.ActorUpProxy),
        n = (i.Normalize(), Vector_1.Vector.Create()),
        s = e.DotProduct(i),
        i =
          (i.Multiply(s, n), e.SubtractionEqual(n), Vector_1.Vector.Create(t));
      return (
        i.AdditionEqual(e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bMr, i),
        TraceElementCommon_1.TraceElementCommon.BoxTrace(
          this.bMr,
          "[SceneItemLevitateMagnetComponent.StartBoxTrace]",
        )
      );
    }
  });
(SceneItemLevitateMagnetComponent.TraceDebug = !1),
  (SceneItemLevitateMagnetComponent = SceneItemLevitateMagnetComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(139)],
      SceneItemLevitateMagnetComponent,
    )),
  (exports.SceneItemLevitateMagnetComponent = SceneItemLevitateMagnetComponent);
//# sourceMappingURL=SceneItemLevitateMagnetComponent.js.map
