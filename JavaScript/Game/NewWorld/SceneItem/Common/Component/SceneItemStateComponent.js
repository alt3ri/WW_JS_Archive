"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let n;
    const o = arguments.length;
    let h =
      o < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(t, e, i, s);
    else
      for (let r = t.length - 1; r >= 0; r--)
        (n = t[r]) && (h = (o < 3 ? n(h) : o > 3 ? n(e, i, h) : n(e, i)) || h);
    return o > 3 && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemStateComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../../UniverseEditor/Interface/IAction");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const Global_1 = require("../../../../Global");
const LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BulletController_1 = require("../../../Bullet/BulletController");
const MIN_DELAY_THRESHOLD = 0.1;
const RESET_LIMIT = 2;
const SERVER_DATA = "_ps";
let SceneItemStateComponent = class SceneItemStateComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this._ti = 1),
      (this.c_n = void 0),
      (this.jDn = void 0),
      (this.BehaviorMap = void 0),
      (this.Hte = void 0),
      (this.T_n = void 0),
      (this.StateConfig = void 0),
      (this.D_n = !1),
      (this.Xfo = void 0),
      (this.Xte = void 0),
      (this.TXr = void 0),
      (this.fXr = void 0),
      (this.R_n = void 0),
      (this.A_n = void 0),
      (this.U_n = void 0),
      (this.P_n = void 0),
      (this.Qnn = () => {
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Qnn,
        );
        const t = this.T_n?.CreateStageConfig.PerformDuration;
        t >= MIN_DELAY_THRESHOLD
          ? TimerSystem_1.TimerSystem.Delay(() => {
              this.Xte?.RemoveTag(-991879492),
                (this.D_n = !0),
                LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
                  this.Xfo,
                );
            }, t * TimeUtil_1.TimeUtil.InverseMillisecond)
          : (LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
              this.Xfo,
            ),
            (this.D_n = !0));
      }),
      (this.x_n = (t) => {
        TimerSystem_1.TimerSystem.Delay(() => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Entity,
          );
        }, RESET_LIMIT * TimeUtil_1.TimeUtil.InverseMillisecond);
      });
  }
  get IsInteractState() {
    return this.D_n && this.U_n;
  }
  get State() {
    return this._ti;
  }
  get StateTagId() {
    return this.c_n || 0;
  }
  OnInitData() {
    const t = this.Entity?.GetComponent(0);
    if (((this.Hte = this.Entity?.GetComponent(1)), t)) {
      (this.fXr = t.GetSummonerId()),
        (this.TXr = this.Hte?.CreatureData.GetModelConfig()),
        (this.D_n = !0),
        (this.U_n = !0);
      var e = t.GetPbEntityInitData();
      if (e) {
        (this.Xte = this.Entity?.GetComponent(177)),
          (this.Xfo = t.GetCreatureDataId()),
          (this.T_n = (0, IComponent_1.getComponent)(
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
        );
        let i = ((this.BehaviorMap = new Map()), e);
        let s = e?.StateChangeBehaviors;
        if (i && s) {
          let t = 0;
          for (const n of e.StateChangeBehaviors)
            this.BehaviorMap.set(t, n.Action), t++;
        }
        (i = t.ComponentDataMap.get(SERVER_DATA)?._ps),
          (s = ((this.c_n = i._Fn), t.ComponentDataMap.get("Eps")));
        s && (this.jDn = MathUtils_1.MathUtils.LongToBigInt(s.Eps?.S4n));
      }
    }
    return !0;
  }
  OnStart() {
    return this.w_n(this.c_n), !0;
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
        this.Qnn,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Qnn,
        ),
      void 0 !== this.R_n && TimerSystem_1.TimerSystem.Remove(this.R_n),
      !0
    );
  }
  IsInState(t) {
    return this._ti === t;
  }
  HandleDestroyState() {
    let t, e;
    if (
      ((this.D_n = !1),
      this.Xte?.HasTag(-991879492) &&
        (this.Xte?.RemoveTag(-991879492), this.UpdateState(-1278190765, !0)),
      this._ti !== 3 || !this.T_n)
    )
      return (e = this.Entity.GetComponent(147))
        ? ((t = (t = this.StateConfig?.State)
            ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t)
            : void 0),
          void (this.c_n !== t
            ? e.ResetToInitState(this.StateConfig.State, this.x_n)
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.DelayRemoveEntityFinished,
                this.Entity,
              )))
        : void 0;
    void 0 === this.P_n &&
      ((t = this.T_n.DestroyStageConfig?.BulletId) &&
        void 0 !== this.fXr &&
        ((e = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.fXr)),
        BulletController_1.BulletController.CreateBulletCustomTarget(
          e ? e.Entity : Global_1.Global.BaseCharacter,
          t.toString(),
          this.Hte.ActorTransform,
          {},
          this.jDn,
        )),
      (e = this.T_n.DestroyStageConfig?.PerformDuration)
        ? (this.P_n = TimerSystem_1.TimerSystem.Delay(() => {
            this.Entity?.Valid &&
              (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.DelayRemoveEntityFinished,
                this.Entity,
              ),
              (this.P_n = void 0));
          }, e * TimeUtil_1.TimeUtil.InverseMillisecond))
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Entity,
          ));
  }
  w_n(t) {
    const e = this.T_n?.CreateStageConfig?.BulletConfig?.BulletId;
    if (
      e &&
      void 0 !== this.fXr &&
      ModelManager_1.ModelManager.CreatureModel.GetEntity(this.fXr)
    ) {
      var i = this.T_n?.CreateStageConfig?.BulletConfig?.Delay;
      const s = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.fXr);
      i >= MIN_DELAY_THRESHOLD
        ? (this.R_n = TimerSystem_1.TimerSystem.Delay(() => {
            BulletController_1.BulletController.CreateBulletCustomTarget(
              s ? s.Entity : Global_1.Global.BaseCharacter,
              e.toString(),
              this.Hte.ActorTransform,
              {},
              this.jDn,
            ),
              (this.R_n = void 0);
          }, i * TimeUtil_1.TimeUtil.InverseMillisecond))
        : BulletController_1.BulletController.CreateBulletCustomTarget(
            s ? s.Entity : Global_1.Global.BaseCharacter,
            e.toString(),
            this.Hte.ActorTransform,
            {},
            this.jDn,
          );
    }
    if (((this.D_n = !1), t !== 2096634051)) this.UpdateState(t, !0, !0);
    else {
      (this.c_n = t), (this._ti = 0);
      (i = this.T_n?.CreateStageConfig.PerformDuration),
        (t =
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-991879492));
      const n = void 0 !== this.TXr?.场景交互物状态列表.Get(t);
      n &&
      (this.Xte.AddTag(-991879492),
      !this.Entity.GetComponent(182).GetIsSceneInteractionLoadCompleted())
        ? EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Qnn,
          )
        : i >= MIN_DELAY_THRESHOLD
          ? TimerSystem_1.TimerSystem.Delay(() => {
              n && this.Xte?.RemoveTag(-991879492),
                (this.D_n = !0),
                LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
                  this.Xfo,
                );
            }, i * TimeUtil_1.TimeUtil.InverseMillisecond)
          : (LevelGeneralNetworks_1.LevelGeneralNetworks.RequestSetInitTagRequest(
              this.Xfo,
            ),
            (this.D_n = !0));
    }
  }
  UpdateState(t, e, i = !1) {
    switch (((this.D_n = e), (this.c_n = t), this.c_n)) {
      case -1152559349:
        this._ti = 1;
        break;
      case -3775711:
        this._ti = 2;
        break;
      case 1298716444:
        this._ti = 4;
        break;
      case -1278190765:
        return void (this._ti = 3);
      default:
        this._ti = 5;
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
    (t === this.A_n && !e) ||
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
            ["CreatureDataId", this.Xfo],
          )
        : (this.A_n
            ? ((i = this.A_n),
              (this.A_n = t),
              this.Xte?.ChangeLocalLevelTag(this.A_n, i))
            : ((this.A_n = t), this.Xte?.AddTag(t)),
          (this.U_n = t !== -687845e3)));
  }
  GetLifeCycleStageActions(t) {
    return (t ? this.T_n?.CreateStageConfig : this.T_n?.DestroyStageConfig)
      .Actions;
  }
};
(SceneItemStateComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(117)],
  SceneItemStateComponent,
)),
  (exports.SceneItemStateComponent = SceneItemStateComponent);
// # sourceMappingURL=SceneItemStateComponent.js.map
