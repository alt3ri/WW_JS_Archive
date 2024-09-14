"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var n,
      h = arguments.length,
      o =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(t, e, i, s);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (n = t[r]) && (o = (h < 3 ? n(o) : 3 < h ? n(e, i, o) : n(e, i)) || o);
    return 3 < h && o && Object.defineProperty(e, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemStateComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../../../UniverseEditor/Interface/IAction"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  Global_1 = require("../../../../Global"),
  LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BulletController_1 = require("../../../Bullet/BulletController"),
  MIN_DELAY_THRESHOLD = 0.1,
  RESET_LIMIT = 2,
  SERVER_DATA = "bys";
let SceneItemStateComponent = class SceneItemStateComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this._ii = 1),
      (this.W1n = void 0),
      (this.JUn = void 0),
      (this.BehaviorMap = void 0),
      (this.Hte = void 0),
      (this.r_n = void 0),
      (this.StateConfig = void 0),
      (this.s_n = !1),
      (this.Wpo = void 0),
      (this.Xte = void 0),
      (this.nXr = void 0),
      (this.JQr = void 0),
      (this.a_n = void 0),
      (this.h_n = void 0),
      (this.l_n = void 0),
      (this.__n = void 0),
      (this.i3a = void 0),
      (this.Rnn = () => {
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        );
        var t = this.r_n?.CreateStageConfig.PerformDuration;
        t >= MIN_DELAY_THRESHOLD
          ? (this.i3a = TimerSystem_1.TimerSystem.Delay(() => {
              this.r3a(!1);
            }, t * TimeUtil_1.TimeUtil.InverseMillisecond))
          : (LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
              this.Wpo,
            ),
            (this.s_n = !0));
      }),
      (this.u_n = (t) => {
        TimerSystem_1.TimerSystem.Delay(() => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Entity,
          );
        }, RESET_LIMIT * TimeUtil_1.TimeUtil.InverseMillisecond);
      });
  }
  get IsInteractState() {
    return this.s_n && this.l_n;
  }
  get State() {
    return this._ii;
  }
  get StateTagId() {
    return this.W1n || 0;
  }
  OnInitData() {
    var t = this.Entity?.GetComponent(0);
    if (((this.Hte = this.Entity?.GetComponent(1)), t)) {
      (this.JQr = t.GetSummonerId()),
        (this.nXr = this.Hte?.CreatureData.GetModelConfig()),
        (this.s_n = !0),
        (this.l_n = !0);
      var e = t.GetPbEntityInitData();
      if (e) {
        (this.Xte = this.Entity?.GetComponent(181)),
          (this.Wpo = t.GetCreatureDataId()),
          (this.r_n = (0, IComponent_1.getComponent)(
            e.ComponentsData,
            "SceneItemLifeCycleComponent",
          )),
          (this.StateConfig = (0, IComponent_1.getComponent)(
            e.ComponentsData,
            "EntityStateComponent",
          ));
        var e = (0, IComponent_1.getComponent)(
            e.ComponentsData,
            "EntityStateComponent",
          ),
          i = ((this.BehaviorMap = new Map()), e),
          s = e?.StateChangeBehaviors;
        if (i && s) {
          let t = 0;
          for (const n of e.StateChangeBehaviors)
            this.BehaviorMap.set(t, n.Action), t++;
        }
        (i = t.ComponentDataMap.get(SERVER_DATA)?.bys),
          (s = ((this.W1n = i.X5n), t.ComponentDataMap.get("Wys")));
        s && (this.JUn = MathUtils_1.MathUtils.LongToBigInt(s.Wys?._Vn));
      }
    }
    return !0;
  }
  OnStart() {
    return this.c_n(this.W1n), !0;
  }
  OnEnd() {
    return (
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
      void 0 !== this.a_n && TimerSystem_1.TimerSystem.Remove(this.a_n),
      !0
    );
  }
  IsInState(t) {
    return this._ii === t;
  }
  HandleDestroyState() {
    var t, e;
    if (
      ((this.s_n = !1),
      this.Xte?.HasTag(-991879492) &&
        (this.Xte?.RemoveTag(-991879492), this.UpdateState(-1278190765, !0)),
      3 !== this._ii || !this.r_n)
    )
      return (e = this.Entity.GetComponent(150))
        ? ((t = (t = this.StateConfig?.State)
            ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t)
            : void 0),
          void (this.W1n !== t
            ? e.ResetToInitState(this.StateConfig.State, this.u_n)
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.DelayRemoveEntityFinished,
                this.Entity,
              )))
        : void 0;
    void 0 === this.__n &&
      ((t = this.r_n.DestroyStageConfig?.BulletId) &&
        void 0 !== this.JQr &&
        ((e = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.JQr)),
        BulletController_1.BulletController.CreateBulletCustomTarget(
          e ? e.Entity : Global_1.Global.BaseCharacter,
          t.toString(),
          this.Hte.ActorTransform,
          {},
          this.JUn,
        )),
      (e = this.r_n.DestroyStageConfig?.PerformDuration)
        ? (this.__n = TimerSystem_1.TimerSystem.Delay(() => {
            this.Entity?.Valid &&
              (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.DelayRemoveEntityFinished,
                this.Entity,
              ),
              (this.__n = void 0));
          }, e * TimeUtil_1.TimeUtil.InverseMillisecond))
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Entity,
          ));
  }
  c_n(t) {
    const e = this.r_n?.CreateStageConfig?.BulletConfig?.BulletId;
    if (
      e &&
      void 0 !== this.JQr &&
      ModelManager_1.ModelManager.CreatureModel.GetEntity(this.JQr)
    ) {
      var i = this.r_n?.CreateStageConfig?.BulletConfig?.Delay;
      const s = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.JQr);
      i >= MIN_DELAY_THRESHOLD
        ? (this.a_n = TimerSystem_1.TimerSystem.Delay(() => {
            BulletController_1.BulletController.CreateBulletCustomTarget(
              s ? s.Entity : Global_1.Global.BaseCharacter,
              e.toString(),
              this.Hte.ActorTransform,
              {},
              this.JUn,
            ),
              (this.a_n = void 0);
          }, i * TimeUtil_1.TimeUtil.InverseMillisecond))
        : BulletController_1.BulletController.CreateBulletCustomTarget(
            s ? s.Entity : Global_1.Global.BaseCharacter,
            e.toString(),
            this.Hte.ActorTransform,
            {},
            this.JUn,
          );
    }
    i = 0;
    (this.s_n = !1),
      2096634051 !== t
        ? this.UpdateState(t, !0, !0)
        : ((this.W1n = t),
          (this._ii = 0),
          (i = this.r_n?.CreateStageConfig.PerformDuration),
          (t =
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-991879492)),
          void 0 !== this.nXr?.场景交互物状态列表.Get(t) &&
          (this.Xte.AddTag(-991879492),
          !this.Entity.GetComponent(187).GetIsSceneInteractionLoadCompleted())
            ? EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
                this.Rnn,
              )
            : i >= MIN_DELAY_THRESHOLD
              ? (this.i3a = TimerSystem_1.TimerSystem.Delay(() => {
                  this.r3a(!1);
                }, i * TimeUtil_1.TimeUtil.InverseMillisecond))
              : (LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
                  this.Wpo,
                ),
                (this.s_n = !0)));
  }
  UpdateState(t, e, i = !1) {
    switch (
      (0 === this._ii && this.r3a(!0), (this.s_n = e), (this.W1n = t), this.W1n)
    ) {
      case -1152559349:
        this._ii = 1;
        break;
      case -3775711:
        this._ii = 2;
        break;
      case 1298716444:
        this._ii = 4;
        break;
      case -1278190765:
        return void (this._ii = 3);
      default:
        this._ii = 5;
    }
    i ||
      (e
        ? EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            t,
            !0,
          )
        : EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStatePreChange,
            t,
          ));
  }
  ChangePerformanceState(t, e = !1, i = !0) {
    (t === this.h_n && !e) ||
      ((e = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)),
      !(0, IAction_1.isPerformanceTypeContainTag)(
        this.StateConfig.PrefabPerformanceType,
        e,
      ) && i
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            7,
            "[ChangePerformanceTag] 传入的Tag与Entity设定的状态类型不匹配",
            ["configComp", this.StateConfig.PrefabPerformanceType],
            ["TagName", e],
            ["CreatureDataId", this.Wpo],
          )
        : (this.h_n
            ? ((i = this.h_n),
              (this.h_n = t),
              this.Xte?.ChangeLocalLevelTag(this.h_n, i))
            : ((this.h_n = t), this.Xte?.AddTag(t)),
          (this.l_n = -687845e3 !== t)));
  }
  GetLifeCycleStageActions(t) {
    return (t ? this.r_n?.CreateStageConfig : this.r_n?.DestroyStageConfig)
      .Actions;
  }
  r3a(t) {
    this.Xte?.RemoveTag(-991879492),
      t
        ? TimerSystem_1.TimerSystem.Has(this.i3a) &&
          this.i3a &&
          TimerSystem_1.TimerSystem.Remove(this.i3a)
        : ((this.s_n = !0),
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
            this.Wpo,
          )),
      (this.i3a = void 0);
  }
};
(SceneItemStateComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(120)],
  SceneItemStateComponent,
)),
  (exports.SceneItemStateComponent = SceneItemStateComponent);
//# sourceMappingURL=SceneItemStateComponent.js.map
