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
        (this.Xln = void 0),
        (this.Ffn = void 0),
        (this.Lie = void 0),
        (this.Vfn = void 0),
        (this.sxr = -1),
        (this.xEr = void 0),
        (this.Hfn = void 0),
        (this.Hme = (0, puerts_1.$ref)(void 0)),
        (this.jfn = 0),
        (this.Wfn = void 0),
        (this.Nnr = Vector_1.Vector.Create()),
        (this.GTn = (e) => {
          e.Attacker.Id ===
            Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.Id &&
            LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
              this.Hfn,
            );
        }),
        (this.Zln = (e) => {
          if (!this.Gce.IsMoving && this.Hte?.IsAutonomousProxy) {
            if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
              switch (this.Hfn) {
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
              this.Ffn?.Valid &&
                (([s, i, n] = this.Ffn.GetNextMoveTargetOnHit(o)), s) &&
                ((s =
                  Vector_1.Vector.Dist2D(i, this.Hte.ActorLocationProxy) /
                  this.Config.MoveSpeed),
                this.Gce.AddMoveTarget(
                  new SceneItemMoveComponent_1.MoveTarget(i, s),
                ),
                (this.Vfn = n),
                this.Enable(this.sxr, "SceneItemLevitateMagnetComponent.OnHit"),
                this.Ffn.RemoveMagnetTipsTag(),
                this.Lie.RemoveTag(-1063846162),
                this.Kfn(o));
          }
        }),
        (this.gIe = (e, t) => {
          -1 < e.indexOf(-709838471) &&
            (EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHitByHitData,
              this.Zln,
            ),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
              this.GTn,
            ));
        }),
        (this.Qfn = () => {
          (this.xEr = UE.NewObject(UE.TraceBoxElement.StaticClass())),
            (this.xEr.WorldContextObject = this.Hte.Owner),
            (this.xEr.bIsSingle = !0),
            (this.xEr.bIgnoreSelf = !0),
            this.xEr.AddObjectTypeQuery(
              QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
            ),
            this.xEr.AddObjectTypeQuery(
              QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic,
            ),
            this.xEr.AddObjectTypeQuery(
              QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
            ),
            this.xEr.AddObjectTypeQuery(
              QueryTypeDefine_1.KuroObjectTypeQuery.Destructible,
            ),
            (this.xEr.DrawTime = 0.5),
            (this.Wfn =
              SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
                this.Hte.GetSceneInteractionLevelHandleId(),
              ));
          var t =
            SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
              this.Hte.GetSceneInteractionLevelHandleId(),
            );
          for (let e = 0; e < t.Num(); e++)
            this.xEr.ActorsToIgnore.Add(t.Get(e));
          this.jfn =
            this.Wfn.K2_GetActorLocation().Z - this.Hte.ActorLocationProxy.Z;
          var e = Vector_1.Vector.Create(),
            e =
              (this.Hte?.ActorUpProxy.Multiply(this.jfn, e),
              (this.Nnr = Vector_1.Vector.Create(this.Hte?.ActorLocationProxy)),
              this.Nnr.AdditionEqual(e),
              this.Hte.ActorRotation);
          this.Hte.SetActorRotation(Rotator_1.Rotator.ZeroRotator),
            this.Wfn.GetActorBounds(!1, void 0, this.Hme),
            TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(
              this.xEr,
              (0, puerts_1.$unref)(this.Hme),
            ),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              this.xEr,
              this.Nnr,
            ),
            TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
              this.xEr,
              e,
            ),
            this.Hte.SetActorRotation(e);
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemLevitateMagnetComponent_1)[0];
      this.Config = e;
      e = this.Entity.GetComponent(0).GetBaseInfo();
      return (this.Hfn = e?.OnlineInteractType), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(185)),
        (this.Gce = this.Entity.GetComponent(115)),
        (this.Xln = this.Entity.GetComponent(140)),
        this.Xln.RegisterComponent(this),
        (this.Ffn = this.Entity.GetComponent(124)),
        (this.Lie = this.Entity.GetComponent(180)),
        this.Lie.AddTag(-1063846162),
        this.Lie.ContainsTag(
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-709838471),
        ) ||
          (EventSystem_1.EventSystem.AddWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.Zln,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
            this.GTn,
          )),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Qfn,
        ),
        (this.sxr = this.Disable("[SceneItemHitMoveComp]初始化关闭Tick")),
        !0
      );
    }
    OnEnd() {
      return (
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
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
          this.GTn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
            this.GTn,
          ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Qfn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Qfn,
          ),
        !0
      );
    }
    OnTick(e) {
      this.Gce.IsMoving ||
        ((this.sxr = this.Disable("[SceneItemHitMoveComp]运动结束关闭Tick")),
        this.Ffn?.Valid && this.Ffn.OnMove(this.Vfn),
        this.Xfn(),
        this.Lie.AddTag(-1063846162));
    }
    Kfn(e) {
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
    Xfn() {
      this.Lie.RemoveTag(503743627),
        this.Lie.RemoveTag(1594082526),
        this.Lie.RemoveTag(1996023206),
        this.Lie.RemoveTag(-1945582411);
    }
    UpdateBoxTrace(e, t) {
      var i;
      this.xEr &&
        ((i =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
            this.Hte.GetSceneInteractionLevelHandleId(),
          )),
        (e = Vector_1.Vector.Create(e.GetBlockLocationByIndex(t))),
        (t = Vector_1.Vector.Create()),
        this.Hte?.ActorUpProxy.Multiply(this.jfn, t),
        e?.AdditionEqual(t),
        (t = Rotator_1.Rotator.Create(this.Hte.ActorRotation)),
        this.Hte.SetActorRotation(Rotator_1.Rotator.ZeroRotator),
        i.GetActorBounds(!1, void 0, this.Hme),
        TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(
          this.xEr,
          (0, puerts_1.$unref)(this.Hme),
        ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.xEr, e),
        TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(this.xEr, t),
        this.Hte.SetActorRotation(t.ToUeRotator()),
        (this.Nnr = Vector_1.Vector.Create(this.Wfn.K2_GetActorLocation())));
    }
    StartBoxTrace(e) {
      if (!this.xEr) return !1;
      SceneItemLevitateMagnetComponent_1.TraceDebug &&
        this.xEr.SetDrawDebugTrace(2);
      var t = Vector_1.Vector.Create(this.Nnr),
        e = Vector_1.Vector.Create(e),
        e = (e.SubtractionEqual(t), Vector_1.Vector.Create(e)),
        i = Vector_1.Vector.Create(this.Hte.ActorUpProxy),
        n = (i.Normalize(), Vector_1.Vector.Create()),
        s = e.DotProduct(i),
        i =
          (i.Multiply(s, n), e.SubtractionEqual(n), Vector_1.Vector.Create(t));
      return (
        i.AdditionEqual(e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.xEr, i),
        TraceElementCommon_1.TraceElementCommon.BoxTrace(
          this.xEr,
          "[SceneItemLevitateMagnetComponent.StartBoxTrace]",
        )
      );
    }
  });
(SceneItemLevitateMagnetComponent.TraceDebug = !1),
  (SceneItemLevitateMagnetComponent = SceneItemLevitateMagnetComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(141)],
      SceneItemLevitateMagnetComponent,
    )),
  (exports.SceneItemLevitateMagnetComponent = SceneItemLevitateMagnetComponent);
//# sourceMappingURL=SceneItemLevitateMagnetComponent.js.map
