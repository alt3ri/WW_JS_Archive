"use strict";
var GrapplingHookPointComponent_1,
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
        for (var h = t.length - 1; 0 <= h; h--)
          (n = t[h]) &&
            (s = (r < 3 ? n(s) : 3 < r ? n(e, i, s) : n(e, i)) || s);
      return 3 < r && s && Object.defineProperty(e, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GrapplingHookPointComponent = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  TsEffectActor_1 = require("../../../../Effect/TsEffectActor"),
  LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController"),
  LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
  HOOK_VISION_ID = 1001,
  OVERWRITE_HOOK_LOCATION_KEY = "OverwriteLocation",
  hookPointStateTagMap = new Map([
    [0, 1888174838],
    [1, -1156116864],
    [2, -43463105],
  ]);
let GrapplingHookPointComponent =
  (GrapplingHookPointComponent_1 = class GrapplingHookPointComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.cql = -1),
        (this.mql = void 0),
        (this.dql = !1),
        (this.mjl = !1),
        (this.Lo = void 0),
        (this.Lie = void 0),
        (this.RadiusSquared = 0),
        (this.ac = 3),
        (this.Hte = void 0),
        (this.N1_ = void 0),
        (this.Hfn = void 0),
        (this.fen = !1),
        (this.d6o = void 0),
        (this.Ful = 0),
        (this.ggl = 0),
        (this.pgl = () => {
          ++this.Ful;
        }),
        (this.fgl = () => {
          ++this.ggl, ++this.Ful;
        }),
        (this.Rnn = () => {
          var t = this.Hte?.GetActorInSceneInteraction(
            OVERWRITE_HOOK_LOCATION_KEY,
          )?.D_K2_GetActorLocation();
          this.dql = !!t;
        }),
        (this.pen = (t) => {
          t === HOOK_VISION_ID && (this.Lie.AddTag(1888174838), (this.ac = 0));
        });
    }
    get HookLocation() {
      return (
        this.Cql ??
        this.Hte?.ActorLocationProxy ??
        Vector_1.Vector.ZeroVectorProxy
      );
    }
    get Cql() {
      var t;
      if (this.dql)
        return (
          this.cql < Time_1.Time.Frame &&
            ((this.cql = Time_1.Time.Frame),
            (t = this.Hte?.GetActorInSceneInteraction(
              OVERWRITE_HOOK_LOCATION_KEY,
            )?.D_K2_GetActorLocation())
              ? (this.mql || (this.mql = Vector_1.Vector.Create()),
                this.mql.FromUeVector(t))
              : ((this.mql = void 0), (this.dql = !1))),
          this.mql
        );
    }
    get TriggerLocation() {
      var t = this.Hte.ActorTransform,
        e = Vector_1.Vector.Create(
          this.Lo?.Range.Center.X ?? 0,
          this.Lo?.Range.Center.Y ?? 0,
          this.Lo?.Range.Center.Z ?? 0,
        );
      return Vector_1.Vector.Create(t.TransformPosition(e.ToUeVector()));
    }
    get Radius() {
      return this.Lo?.Range.Radius ?? 0;
    }
    get CameraGaze() {
      return this.Lo?.CameraGaze;
    }
    get InheritSpeed() {
      return this.Lo?.InheritSpeed ?? !1;
    }
    get IsClimb() {
      return this.Lo?.IsClimb ?? !1;
    }
    get IsInCd() {
      return this.fen;
    }
    get WillBeDestroyedAfterHook() {
      return this.Lo?.IsDestroyedSelf ?? !1;
    }
    get WillBeHideAfterHook() {
      return this.Lo?.IsHideSelf ?? !1;
    }
    get UseRangeComponent() {
      return this.Lo?.UseRangeComponent ?? !1;
    }
    get GazeNextPointAfterInteract() {
      return this.Lo?.GazeNextPointAfterInteract;
    }
    get MatchRoleOption() {
      return this.Lo?.MatchRoleOption;
    }
    get IsSummitPoint() {
      return (
        ("RagDollClimbingPoint" === this.Lo?.HookInteractConfig?.Type &&
          this.Lo.HookInteractConfig.IsSummitPoint) ??
        !1
      );
    }
    get IsNormalHookPoint() {
      var t = this.Lo?.HookInteractConfig?.Type;
      return void 0 === t || "FixedPointHook" === t;
    }
    get OnlineTypeCanInteract() {
      return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
        this.Hfn,
      );
    }
    get IsHookDisabled() {
      return this.mjl;
    }
    get IsIgnorePlayerCollision() {
      return this.Lo?.IgnorePlayCollision ?? !1;
    }
    get SplineMoveEndCount() {
      return this.Ful;
    }
    get SplineMoveBrokenCount() {
      return this.ggl;
    }
    OnInitData(t) {
      var t = t.GetParam(GrapplingHookPointComponent_1)[0];
      if (
        ((this.Lo = t || void 0),
        this.Lo.PlayerStateRestritionId &&
          ((t = {
            Type: "CheckPlayerStateRestriction",
            RestrictionId: this.Lo.PlayerStateRestritionId,
          }),
          this.N1_ || (this.N1_ = []),
          this.N1_.push({ Type: 0, Conditions: [t] })),
        this.Lo.HookEnableCondition &&
          (this.N1_ || (this.N1_ = []),
          this.N1_.push(this.Lo.HookEnableCondition)),
        (this.Lie = this.Entity.GetComponent(194)),
        this.Lie?.Valid && this.Lie.AddTag(-254251760),
        this.Lo.HookInteractConfig)
      )
        switch (this.Lo.HookInteractConfig.Type) {
          case "FixedPointHook":
            this.d6o = -833935142;
            break;
          case "SuiGuangHook":
            this.d6o = 561771029;
            break;
          case "KiteHook":
            this.d6o = -1526637662;
            break;
          case "RagDollJumpingPoint":
            this.d6o = -1347421268;
            break;
          case "RagDollClimbingPoint":
            this.d6o = 1978109078;
            break;
          case "MovementPointHook":
            this.d6o = -1771378495;
            break;
          default:
            this.d6o = void 0;
        }
      else this.d6o = -833935142;
      this.RadiusSquared = MathUtils_1.MathUtils.Square(this.Radius);
      t = this.Entity.GetComponent(0);
      return (this.mjl = t.PbHookLockPointDisabled), !0;
    }
    OnStart() {
      this.Hte = this.Entity.GetComponent(200);
      var e = this.Entity.GetComponent(0);
      if (e) {
        e = e.GetBaseInfo();
        (this.Hfn = e?.OnlineInteractType),
          GrapplingHookPointComponent_1.ven ||
            (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
              HOOK_VISION_ID,
            ) &&
              (GrapplingHookPointComponent_1.ven = !0));
        let t = !1;
        if (GrapplingHookPointComponent_1.ven) {
          for (const i of hookPointStateTagMap.keys())
            if (this.Lie.HasTag(i)) {
              t = !0;
              break;
            }
          t || (this.Lie.AddTag(1888174838), (this.ac = 0));
        }
        GrapplingHookPointComponent_1.AllPoints.push(this),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.AddExploreVisionSkill,
            this.pen,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemSplineMoveBroken,
            this.fgl,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemSplineMoveStopped,
            this.pgl,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Rnn,
          );
      }
      return !0;
    }
    OnEnd() {
      var t = GrapplingHookPointComponent_1.AllPoints.indexOf(this);
      return (
        0 <= t && GrapplingHookPointComponent_1.AllPoints.splice(t, 1),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AddExploreVisionSkill,
          this.pen,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemSplineMoveBroken,
          this.fgl,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemSplineMoveStopped,
          this.pgl,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ),
        !0
      );
    }
    UpdateHookPointInfoByNotify(t) {
      this.mjl = t.UI_;
    }
    IsMovable() {
      return (
        !!this.Entity.GetComponent(66) ||
        "SuiGuangHook" === this.GetHookInteractType()
      );
    }
    ChangeHookPointState(t) {
      this.ac !== t &&
        (this.Lie.RemoveTag(hookPointStateTagMap.get(this.ac)),
        1 === this.ac &&
          this.Entity.GetComponent(200).PlaySceneInteractionEndEffect(0),
        (this.ac = t),
        this.Lie.AddTag(hookPointStateTagMap.get(this.ac)));
    }
    CheckCondition() {
      return (
        void 0 === this.N1_ ||
        0 === this.N1_.length ||
        this.N1_.every((t) =>
          ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
            t,
            this.Hte.Owner,
            LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
          ),
        )
      );
    }
    TryStartCd() {
      this.Lo.HookLockCd &&
        ((this.fen = !0),
        TimerSystem_1.TimerSystem.Delay(() => {
          this.fen = !1;
        }, this.Lo.HookLockCd * TimeUtil_1.TimeUtil.InverseMillisecond));
    }
    WasRecentlyRenderOnScreen() {
      let t = this.Hte?.CurLevelPrefabShowActor;
      if (t?.IsValid()) {
        if (t instanceof TsEffectActor_1.default) {
          var e = t.GetHandle();
          if (
            !EffectSystem_1.EffectSystem.IsValid(e) &&
            (this.Hte.RefreshShowActor(),
            !(t = this.Hte?.CurLevelPrefabShowActor)?.IsValid())
          )
            return !1;
        } else if (t.IsA(UE.EffectSystemActor.StaticClass())) {
          e = t.GetHandle();
          if (
            !EffectSystem_1.EffectSystem.IsValid(e) &&
            (this.Hte.RefreshShowActor(),
            !(t = this.Hte?.CurLevelPrefabShowActor)?.IsValid())
          )
            return !1;
        }
        return UE.KuroStaticLibrary.IsObjectClassByName(
          t,
          CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM,
        ) &&
          (this.Hte.RefreshShowActor(),
          !(t = this.Hte?.CurLevelPrefabShowActor)?.IsValid())
          ? !1
          : t.WasRecentlyRenderedOnScreen(0.5);
      }
      return !1;
    }
    GetTagId() {
      return this.d6o;
    }
    GetHookInteractType() {
      return this.Lo.HookInteractConfig?.Type ?? "FixedPointHook";
    }
    GetHookActions() {
      return this.Lo.HookInteractConfig?.HookActions;
    }
    GetInterruptHookActions() {
      return this.Lo.HookInteractConfig?.ExitHookActions;
    }
    GetFinishHookActions() {
      return this.Lo.HookInteractConfig?.FinishActions;
    }
  });
(GrapplingHookPointComponent.AllPoints = []),
  (GrapplingHookPointComponent.ven = !1),
  (GrapplingHookPointComponent = GrapplingHookPointComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(83)],
      GrapplingHookPointComponent,
    )),
  (exports.GrapplingHookPointComponent = GrapplingHookPointComponent);
//# sourceMappingURL=GrapplingHookPointComponent.js.map
