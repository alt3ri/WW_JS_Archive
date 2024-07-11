"use strict";
let PerformanceComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let h;
    const n = arguments.length;
    let o =
      n < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(t, e, i, s);
    else
      for (let r = t.length - 1; r >= 0; r--)
        (h = t[r]) && (o = (n < 3 ? h(o) : n > 3 ? h(e, i, o) : h(e, i)) || o);
    return n > 3 && o && Object.defineProperty(e, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformanceComponent = void 0);
const UE = require("ue");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const TsEffectActor_1 = require("../../../Effect/TsEffectActor");
const GlobalData_1 = require("../../../GlobalData");
const CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines");
let PerformanceComponent =
  (PerformanceComponent_1 = class PerformanceComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Snn = void 0),
        (this.nXt = void 0),
        (this.ynn = void 0),
        (this.Inn = 0),
        (this.Tnn = 0),
        (this.Lnn = 0),
        (this.UZt = 0),
        (this.Dnn = void 0),
        (this.Rnn = void 0),
        (this.Ann = 0),
        (this.Unn = void 0),
        (this.Pnn = void 0),
        (this.xnn = void 0),
        (this.TXr = void 0),
        (this.wnn = !1),
        (this.Bnn = (t, e) => {
          this.nXt.SkeletalMesh || this.LoadAndChangeStaticMesh(),
            this.bnn() && this.qnn(),
            this.Gnn(t, e),
            this.Nnn(),
            this.Onn(t, e),
            this.knn(t, e),
            (0, RegisterComponent_1.isComponentInstance)(this.nXt, 182) &&
              (!(t = this.nXt.CurLevelPrefabShowActor)?.IsValid() ||
              UE.KuroStaticLibrary.IsObjectClassByName(
                t,
                CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM,
              )
                ? this.nXt.RefreshShowActor()
                : t instanceof TsEffectActor_1.default &&
                  ((e = t.GetHandle()),
                  EffectSystem_1.EffectSystem.IsValid(e) ||
                    this.nXt.RefreshShowActor()));
        }),
        (this.Fnn = (t) => {
          let e;
          return (
            !this.ynn.has(t) &&
            ((e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t)),
            void 0 !== (e = this.TXr.场景交互物特效列表.Get(e))) &&
            !!(0, RegisterComponent_1.isComponentInstance)(this.nXt, 182) &&
            (this.nXt.PlaySceneInteractionEffect(e), this.ynn.set(t, e), !0)
          );
        }),
        (this.Vnn = (t) => {
          let e;
          this.Rnn.has(t) ||
            ((e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t)),
            (e = this.TXr.常驻特效列表.Get(e)) &&
              (e = this.Hnn(
                e.AssetPathName?.toString(),
                "[PerformanceComponent.CheckAndAddOwnEffectByTag]",
                void 0,
              )) &&
              (this.Rnn.set(t, e),
              (t = this.nXt.CreatureData.GetVisible()),
              this.jnn(e, t)));
        }),
        (this.Wnn = void 0),
        (this.Knn = void 0),
        (this.Qnn = () => {
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Qnn,
          ),
            this.Xnn(),
            this.$nn();
        }),
        (this.Ynn = (t, e) => {
          t === 5 &&
            this?.Entity?.Valid &&
            EffectSystem_1.EffectSystem.IsValid(e) &&
            ((this.Dnn = EffectSystem_1.EffectSystem.GetNiagaraComponent(e)),
            this.Dnn) &&
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnAddCommonEffect,
            );
        });
    }
    SetIsSceneInteractionJumpToEnd(t) {
      this.wnn = t;
    }
    OnStart() {
      return (
        (this.xnn = void 0),
        (this.Snn = this.Entity.CheckGetComponent(177)),
        (this.nXt = this.Entity.GetComponent(1)),
        (this.TXr = this.nXt.CreatureData.GetModelConfig()),
        !(this.wnn = !1)
      );
    }
    OnActivate() {
      this.nXt.SkeletalMesh || this.LoadAndChangeStaticMesh(),
        this.Jnn(),
        (this.ynn = new Map()),
        (0, RegisterComponent_1.isComponentInstance)(this.nXt, 182) &&
          !this.nXt.GetIsSceneInteractionLoadCompleted() &&
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Qnn,
          ),
        this.eve(),
        this.bnn() && this.znn(),
        (this.Rnn = new Map()),
        this.Znn(),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.Bnn,
        );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.Bnn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnLevelTagChanged,
            this.Bnn,
          ),
        (0, RegisterComponent_1.isComponentInstance)(this.nXt, 182) &&
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
        !0
      );
    }
    OnClear() {
      if (
        (this.ynn && (this.ynn.clear(), (this.ynn = void 0)),
        this.esn(),
        (this.Pnn = void 0),
        this.Rnn)
      ) {
        for (const t of this.Rnn.values())
          EffectSystem_1.EffectSystem.StopEffectById(
            t,
            "[PerformanceComponent.OnClear 1]",
            !0,
          );
        this.Rnn.clear(), (this.Rnn = void 0);
      }
      return (
        this.UZt &&
          ((this.Dnn = void 0),
          EffectSystem_1.EffectSystem.StopEffectById(
            this.UZt,
            "[PerformanceComponent.OnClear 2]",
            !1,
          ),
          (this.UZt = 0)),
        this.Ann &&
          (EffectSystem_1.EffectSystem.RemoveFinishCallback(this.Ann, this.Unn),
          EffectSystem_1.EffectSystem.StopEffectById(
            this.Ann,
            "[PerformanceComponent.OnClear 3]",
            !0,
          ),
          (this.Ann = 0)),
        !(this.Unn = void 0)
      );
    }
    OnEnable() {
      this.Entity?.IsInit &&
        this.SetPerformanceVisible(this.nXt.CreatureData.GetVisible());
    }
    OnDisable() {
      this.SetPerformanceVisible(!1);
    }
    Jnn() {
      this.tsn(!0);
    }
    Nnn() {
      this.tsn(!1);
    }
    tsn(t) {
      var e = this.isn(this.TXr.场景交互物状态列表);
      if (void 0 !== e) {
        if (e === this.Inn)
          return void (
            (0, RegisterComponent_1.isComponentInstance)(this.nXt, 182) &&
            this.nXt.SetIsSceneInteractionLoadCompleted()
          );
        this.Inn = e;
      } else {
        var e = -821437887;
        var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e);
        if (e === this.Inn || void 0 === this.TXr.场景交互物状态列表.Get(i))
          return void (
            (0, RegisterComponent_1.isComponentInstance)(this.nXt, 182) &&
            this.nXt.SetIsSceneInteractionLoadCompleted()
          );
        this.Inn = e;
      }
      if ((0, RegisterComponent_1.isComponentInstance)(this.nXt, 182)) {
        let e = void 0;
        if (
          ((e =
            this.Inn === 1227933697
              ? 20
              : ((i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                  this.Inn,
                )),
                this.TXr.场景交互物状态列表.Get(i))),
          t)
        ) {
          let t = !1;
          this.Inn === -991879492 && (t = !0),
            this.nXt.LoadSceneInteractionLevel(e, t);
        } else this.nXt.SwitchToState(e, !this.wnn, this.wnn);
      }
    }
    Xnn() {
      if (this.Snn)
        for (const t of this.Snn.GetTagIds()) if (this.Fnn(t)) break;
    }
    $nn() {
      if (this.Snn)
        for (const e of this.Snn.GetTagIds()) {
          const t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e);
          (0, RegisterComponent_1.isComponentInstance)(this.nXt, 182) &&
            void 0 !== t &&
            this.nXt.PlayExtraEffect(t);
        }
    }
    Onn(t, e) {
      for (const s of e) {
        var i;
        this.ynn.has(s) &&
          ((i = this.ynn.get(s)),
          this.ynn.delete(s),
          (0, RegisterComponent_1.isComponentInstance)(this.nXt, 182)) &&
          void 0 !== i &&
          (this.nXt.EndSceneInteractionEffect(i),
          this.nXt.PlaySceneInteractionEndEffect(i));
      }
      for (const h of t) this.Fnn(h);
    }
    knn(t, e) {
      for (const h of e) {
        const i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(h);
        (0, RegisterComponent_1.isComponentInstance)(this.nXt, 182) &&
          void 0 !== i &&
          this.nXt.StopExtraEffect(i);
      }
      for (const n of t) {
        const s = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n);
        (0, RegisterComponent_1.isComponentInstance)(this.nXt, 182) &&
          void 0 !== s &&
          this.nXt.PlayExtraEffect(s, !1);
      }
    }
    LoadAndChangeStaticMesh() {
      if (!this.nXt.SkeletalMesh) {
        var t = this.isn(this.TXr.静态网格体列表);
        if (void 0 !== t) {
          if (t === this.Tnn) return;
          this.Tnn = t;
        } else {
          var t = -821437887;
          var e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t);
          if (t === this.Tnn || void 0 === this.TXr.静态网格体列表.Get(e))
            return;
          this.Tnn = t;
        }
        (0, RegisterComponent_1.isComponentInstance)(this.nXt, 182) &&
          ((e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
            this.Tnn,
          )),
          this.nXt.LoadAndChangeStaticMesh(e));
      }
    }
    eve() {
      var t =
        GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-1133639932);
      var t = this.TXr.常驻特效列表.Get(t);
      t &&
        ((this.UZt = this.Hnn(
          t.AssetPathName?.toString(),
          "[PerformanceComponent.InitCommonEffect]",
          this.Ynn,
        )),
        EffectSystem_1.EffectSystem.IsValid(this.UZt)) &&
        (EffectSystem_1.EffectSystem.GetEffectActor(this.UZt)?.K2_AttachToActor(
          this.nXt.Owner,
          void 0,
          2,
          1,
          1,
          !1,
        ),
        (t = this.nXt.CreatureData.GetVisible()),
        this.jnn(this.UZt, t));
    }
    bnn() {
      let t;
      return (
        !!this.UZt &&
        (t = this.isn(this.TXr.通用特效常驻参数)) !== this.Lnn &&
        ((this.Lnn = t), !!this.Lnn)
      );
    }
    znn() {
      let t;
      this.UZt &&
        ((t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(this.Lnn)),
        (t = this.TXr.通用特效常驻参数.Get(t))) &&
        this.osn(t);
    }
    qnn() {
      var t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(this.Lnn);
      var t = this.TXr.通用特效变化参数.Get(t);
      t
        ? (t.ManualLifeTime > 0 &&
            (this.Pnn ||
              (this.Pnn = (t) => {
                this.znn();
              }),
            this.esn(),
            (this.xnn = TimerSystem_1.TimerSystem.Loop(
              this.Pnn,
              TimeUtil_1.TimeUtil.SetTimeMillisecond(t.ManualLifeTime),
              1,
              0,
            ))),
          this.osn(t))
        : this.znn();
    }
    Znn() {
      if (this.Snn) for (const t of this.Snn.GetTagIds()) this.Vnn(t);
    }
    Gnn(t, e) {
      for (const n of e) {
        var i;
        this.Rnn.has(n) &&
          ((i = this.Rnn.get(n)),
          this.Rnn.delete(n),
          EffectSystem_1.EffectSystem.StopEffectById(
            i,
            "[PerformanceComponent.ChangeOwnEffects]",
            !0,
          ));
      }
      let s = void 0;
      for (const o of t) {
        var h = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(o);
        var h = this.TXr.变化特效列表.Get(h);
        h
          ? (s = this.Hnn(
              h.AssetPathName?.toString(),
              "[PerformanceComponent.ChangeOwnEffects]",
              void 0,
            ))
          : this.Vnn(o);
      }
      s &&
        (this.Unn ||
          (this.Unn = (t) => {
            (this.Ann = 0), this.Znn();
          }),
        EffectSystem_1.EffectSystem.AddFinishCallback(this.Ann, this.Unn),
        (this.Ann = s));
    }
    isn(t) {
      if (this.Snn.HasTag(PerformanceComponent_1.rsn))
        return PerformanceComponent_1.rsn;
      if (((this.Wnn = void 0), (this.Knn = t), this.Snn))
        for (const i of this.Snn.GetTagIds())
          if (i !== PerformanceComponent_1.rsn) {
            const e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i);
            if (void 0 !== this.Knn.Get(e)) {
              this.Wnn = i;
              break;
            }
          }
      return (this.Knn = void 0), this.Wnn;
    }
    Hnn(t, e, i) {
      return t && !(t.length <= 0) && this.nXt
        ? EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            this.nXt.ActorTransform,
            t,
            e,
            new EffectContext_1.EffectContext(this.Entity.Id),
            3,
            void 0,
            i,
          )
        : 0;
    }
    osn(t) {
      EffectSystem_1.EffectSystem.SetEffectDataByNiagaraParam(this.UZt, t, !0);
    }
    ApplyNiagaraParameters(t, e) {
      return !(
        !this.UZt ||
        !this.Dnn ||
        (e instanceof UE.Vector
          ? this.Dnn.SetNiagaraVariableVec3(t, e)
          : this.Dnn.SetNiagaraVariableFloat(t, e),
        0)
      );
    }
    esn() {
      TimerSystem_1.TimerSystem.Has(this.xnn) &&
        TimerSystem_1.TimerSystem.Remove(this.xnn);
    }
    SetPerformanceVisible(t) {
      this.jnn(this.UZt, t);
      for (const [, e] of this.Rnn ?? []) this.jnn(e, t);
    }
    jnn(t, e) {
      EffectSystem_1.EffectSystem.IsValid(t) &&
        (EffectSystem_1.EffectSystem.GetEffectActor(t)?.SetActorHiddenInGame(
          !e,
        ),
        EffectSystem_1.EffectSystem.SetTimeScale(t, e ? this.TimeDilation : 0));
    }
  });
(PerformanceComponent.rsn = 1227933697),
  (PerformanceComponent = PerformanceComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(93)],
      PerformanceComponent,
    )),
  (exports.PerformanceComponent = PerformanceComponent);
// # sourceMappingURL=PerformanceComponent.js.map
