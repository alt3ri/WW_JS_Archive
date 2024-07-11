"use strict";
var PerformanceComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        n = arguments.length,
        o =
          n < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, i, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (h = t[r]) &&
            (o = (n < 3 ? h(o) : 3 < n ? h(e, i, o) : h(e, i)) || o);
      return 3 < n && o && Object.defineProperty(e, i, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformanceComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  TsEffectActor_1 = require("../../../Effect/TsEffectActor"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines");
let PerformanceComponent =
  (PerformanceComponent_1 = class PerformanceComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.inn = void 0),
        (this.n$t = void 0),
        (this.rnn = void 0),
        (this.nnn = 0),
        (this.snn = 0),
        (this.ann = 0),
        (this.Uei = 0),
        (this.hnn = void 0),
        (this.lnn = void 0),
        (this._nn = 0),
        (this.unn = void 0),
        (this.cnn = void 0),
        (this.mnn = void 0),
        (this.nXr = void 0),
        (this.dnn = !1),
        (this.Cnn = (t, e) => {
          this.n$t.SkeletalMesh || this.LoadAndChangeStaticMesh(),
            this.gnn() && this.fnn(),
            this.pnn(t, e),
            this.vnn(),
            this.Mnn(t, e),
            this.Enn(t, e),
            (0, RegisterComponent_1.isComponentInstance)(this.n$t, 185) &&
              (!(t = this.n$t.CurLevelPrefabShowActor)?.IsValid() ||
              UE.KuroStaticLibrary.IsObjectClassByName(
                t,
                CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM,
              )
                ? this.n$t.RefreshShowActor()
                : t instanceof TsEffectActor_1.default &&
                  ((e = t.GetHandle()),
                  EffectSystem_1.EffectSystem.IsValid(e) ||
                    this.n$t.RefreshShowActor()));
        }),
        (this.Snn = (t) => {
          var e;
          return (
            !this.rnn.has(t) &&
            ((e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t)),
            void 0 !== (e = this.nXr.场景交互物特效列表.Get(e))) &&
            !!(0, RegisterComponent_1.isComponentInstance)(this.n$t, 185) &&
            (this.n$t.PlaySceneInteractionEffect(e), this.rnn.set(t, e), !0)
          );
        }),
        (this.ynn = (t) => {
          var e;
          this.lnn.has(t) ||
            ((e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t)),
            (e = this.nXr.常驻特效列表.Get(e)) &&
              (e = this.Inn(
                e.AssetPathName?.toString(),
                "[PerformanceComponent.CheckAndAddOwnEffectByTag]",
                void 0,
              )) &&
              (this.lnn.set(t, e),
              (t = this.n$t.CreatureData.GetVisible()),
              this.Tnn(e, t)));
        }),
        (this.Lnn = void 0),
        (this.Dnn = void 0),
        (this.Rnn = () => {
          this.Unn(), this.Ann();
        }),
        (this.Pnn = (t, e) => {
          5 === t &&
            this?.Entity?.Valid &&
            EffectSystem_1.EffectSystem.IsValid(e) &&
            ((this.hnn = EffectSystem_1.EffectSystem.GetNiagaraComponent(e)),
            this.hnn) &&
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnAddCommonEffect,
            );
        });
    }
    SetIsSceneInteractionJumpToEnd(t) {
      this.dnn = t;
    }
    OnStart() {
      return (
        (this.mnn = void 0),
        (this.inn = this.Entity.CheckGetComponent(180)),
        (this.n$t = this.Entity.GetComponent(1)),
        (this.nXr = this.n$t.CreatureData.GetModelConfig()),
        !(this.dnn = !1)
      );
    }
    OnActivate() {
      this.n$t.SkeletalMesh || this.LoadAndChangeStaticMesh(),
        this.xnn(),
        (this.rnn = new Map()),
        (0, RegisterComponent_1.isComponentInstance)(this.n$t, 185) &&
          !this.n$t.GetIsSceneInteractionLoadCompleted() &&
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Rnn,
          ),
        this.eve(),
        this.gnn() && this.wnn(),
        (this.lnn = new Map()),
        this.Bnn(),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.Cnn,
        );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.Cnn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnLevelTagChanged,
            this.Cnn,
          ),
        (0, RegisterComponent_1.isComponentInstance)(this.n$t, 185) &&
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
        !0
      );
    }
    OnClear() {
      if (
        (this.rnn && (this.rnn.clear(), (this.rnn = void 0)),
        this.bnn(),
        (this.cnn = void 0),
        this.lnn)
      ) {
        for (const t of this.lnn.values())
          EffectSystem_1.EffectSystem.StopEffectById(
            t,
            "[PerformanceComponent.OnClear 1]",
            !0,
          );
        this.lnn.clear(), (this.lnn = void 0);
      }
      return (
        this.Uei &&
          ((this.hnn = void 0),
          EffectSystem_1.EffectSystem.StopEffectById(
            this.Uei,
            "[PerformanceComponent.OnClear 2]",
            !1,
          ),
          (this.Uei = 0)),
        this._nn &&
          (EffectSystem_1.EffectSystem.RemoveFinishCallback(this._nn, this.unn),
          EffectSystem_1.EffectSystem.StopEffectById(
            this._nn,
            "[PerformanceComponent.OnClear 3]",
            !0,
          ),
          (this._nn = 0)),
        !(this.unn = void 0)
      );
    }
    OnEnable() {
      this.Entity?.IsInit &&
        this.SetPerformanceVisible(this.n$t.CreatureData.GetVisible());
    }
    OnDisable() {
      this.SetPerformanceVisible(!1);
    }
    xnn() {
      this.qnn(!0);
    }
    vnn() {
      this.qnn(!1);
    }
    qnn(t) {
      var e = this.Gnn(this.nXr.场景交互物状态列表);
      if (void 0 !== e) {
        if (e === this.nnn) return;
        this.nnn = e;
      } else {
        var e = -821437887,
          i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e);
        if (e === this.nnn || void 0 === this.nXr.场景交互物状态列表.Get(i))
          return void (
            (0, RegisterComponent_1.isComponentInstance)(this.n$t, 185) &&
            this.n$t.SetIsSceneInteractionLoadCompleted()
          );
        this.nnn = e;
      }
      if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 185)) {
        let e = void 0;
        if (
          ((e =
            1227933697 === this.nnn
              ? 20
              : ((i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                  this.nnn,
                )),
                this.nXr.场景交互物状态列表.Get(i))),
          t)
        ) {
          let t = !1;
          -991879492 === this.nnn && (t = !0),
            this.n$t.LoadSceneInteractionLevel(e, t);
        } else this.n$t.SwitchToState(e, !this.dnn, this.dnn);
      }
    }
    Unn() {
      if (this.inn) {
        if (
          (0, RegisterComponent_1.isComponentInstance)(this.n$t, 185) &&
          this.rnn &&
          0 < this.rnn.size
        ) {
          for (var [, t] of this.rnn)
            this.n$t?.EndSceneInteractionEffect(t),
              this.n$t?.PlaySceneInteractionEndEffect(t);
          this.rnn?.clear();
        }
        for (const e of this.inn.GetTagIds()) if (this.Snn(e)) break;
      }
    }
    Ann() {
      if (this.inn)
        for (const e of this.inn.GetTagIds()) {
          var t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e);
          (0, RegisterComponent_1.isComponentInstance)(this.n$t, 185) &&
            void 0 !== t &&
            this.n$t.PlayExtraEffect(t);
        }
    }
    Mnn(t, e) {
      for (const s of e) {
        var i;
        this.rnn.has(s) &&
          ((i = this.rnn.get(s)),
          this.rnn.delete(s),
          (0, RegisterComponent_1.isComponentInstance)(this.n$t, 185)) &&
          void 0 !== i &&
          (this.n$t.EndSceneInteractionEffect(i),
          this.n$t.PlaySceneInteractionEndEffect(i));
      }
      for (const h of t) this.Snn(h);
    }
    Enn(t, e) {
      for (const h of e) {
        var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(h);
        (0, RegisterComponent_1.isComponentInstance)(this.n$t, 185) &&
          void 0 !== i &&
          this.n$t.StopExtraEffect(i);
      }
      for (const n of t) {
        var s = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n);
        (0, RegisterComponent_1.isComponentInstance)(this.n$t, 185) &&
          void 0 !== s &&
          this.n$t.PlayExtraEffect(s, !1);
      }
    }
    LoadAndChangeStaticMesh() {
      if (!this.n$t.SkeletalMesh) {
        var t = this.Gnn(this.nXr.静态网格体列表);
        if (void 0 !== t) {
          if (t === this.snn) return;
          this.snn = t;
        } else {
          var t = -821437887,
            e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t);
          if (t === this.snn || void 0 === this.nXr.静态网格体列表.Get(e))
            return;
          this.snn = t;
        }
        (0, RegisterComponent_1.isComponentInstance)(this.n$t, 185) &&
          ((e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
            this.snn,
          )),
          this.n$t.LoadAndChangeStaticMesh(e));
      }
    }
    eve() {
      var t =
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-1133639932),
        t = this.nXr.常驻特效列表.Get(t);
      t &&
        ((this.Uei = this.Inn(
          t.AssetPathName?.toString(),
          "[PerformanceComponent.InitCommonEffect]",
          this.Pnn,
        )),
        EffectSystem_1.EffectSystem.IsValid(this.Uei)) &&
        (EffectSystem_1.EffectSystem.GetEffectActor(this.Uei)?.K2_AttachToActor(
          this.n$t.Owner,
          void 0,
          2,
          1,
          1,
          !1,
        ),
        (t = this.n$t.CreatureData.GetVisible()),
        this.Tnn(this.Uei, t));
    }
    gnn() {
      var t;
      return (
        !!this.Uei &&
        (t = this.Gnn(this.nXr.通用特效常驻参数)) !== this.ann &&
        ((this.ann = t), !!this.ann)
      );
    }
    wnn() {
      var t;
      this.Uei &&
        ((t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(this.ann)),
        (t = this.nXr.通用特效常驻参数.Get(t))) &&
        this.Nnn(t);
    }
    fnn() {
      var t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(this.ann),
        t = this.nXr.通用特效变化参数.Get(t);
      t
        ? (0 < t.ManualLifeTime &&
            (this.cnn ||
              (this.cnn = (t) => {
                this.wnn();
              }),
            this.bnn(),
            (this.mnn = TimerSystem_1.TimerSystem.Loop(
              this.cnn,
              TimeUtil_1.TimeUtil.SetTimeMillisecond(t.ManualLifeTime),
              1,
              0,
            ))),
          this.Nnn(t))
        : this.wnn();
    }
    Bnn() {
      if (this.inn) for (const t of this.inn.GetTagIds()) this.ynn(t);
    }
    pnn(t, e) {
      for (const n of e) {
        var i;
        this.lnn.has(n) &&
          ((i = this.lnn.get(n)),
          this.lnn.delete(n),
          EffectSystem_1.EffectSystem.StopEffectById(
            i,
            "[PerformanceComponent.ChangeOwnEffects]",
            !0,
          ));
      }
      let s = void 0;
      for (const o of t) {
        var h = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(o),
          h = this.nXr.变化特效列表.Get(h);
        h
          ? (s = this.Inn(
              h.AssetPathName?.toString(),
              "[PerformanceComponent.ChangeOwnEffects]",
              void 0,
            ))
          : this.ynn(o);
      }
      s &&
        (this.unn ||
          (this.unn = (t) => {
            (this._nn = 0), this.Bnn();
          }),
        EffectSystem_1.EffectSystem.AddFinishCallback(this._nn, this.unn),
        (this._nn = s));
    }
    Gnn(t) {
      if (this.inn.HasTag(PerformanceComponent_1.Onn))
        return PerformanceComponent_1.Onn;
      if (((this.Lnn = void 0), (this.Dnn = t), this.inn))
        for (const i of this.inn.GetTagIds())
          if (i !== PerformanceComponent_1.Onn) {
            var e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i);
            if (void 0 !== this.Dnn.Get(e)) {
              this.Lnn = i;
              break;
            }
          }
      return (this.Dnn = void 0), this.Lnn;
    }
    Inn(t, e, i) {
      return t && !(t.length <= 0) && this.n$t
        ? EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            this.n$t.ActorTransform,
            t,
            e,
            new EffectContext_1.EffectContext(this.Entity.Id),
            3,
            void 0,
            i,
          )
        : 0;
    }
    Nnn(t) {
      EffectSystem_1.EffectSystem.SetEffectDataByNiagaraParam(this.Uei, t, !0);
    }
    ApplyNiagaraParameters(t, e) {
      return !(
        !this.Uei ||
        !this.hnn ||
        (e instanceof UE.Vector
          ? this.hnn.SetNiagaraVariableVec3(t, e)
          : this.hnn.SetNiagaraVariableFloat(t, e),
        0)
      );
    }
    bnn() {
      TimerSystem_1.TimerSystem.Has(this.mnn) &&
        TimerSystem_1.TimerSystem.Remove(this.mnn);
    }
    SetPerformanceVisible(t) {
      this.Tnn(this.Uei, t);
      for (var [, e] of this.lnn ?? []) this.Tnn(e, t);
    }
    Tnn(t, e) {
      EffectSystem_1.EffectSystem.IsValid(t) &&
        (EffectSystem_1.EffectSystem.GetEffectActor(t)?.SetActorHiddenInGame(
          !e,
        ),
        EffectSystem_1.EffectSystem.SetTimeScale(t, e ? this.TimeDilation : 0));
    }
  });
(PerformanceComponent.Onn = 1227933697),
  (PerformanceComponent = PerformanceComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(95)],
      PerformanceComponent,
    )),
  (exports.PerformanceComponent = PerformanceComponent);
//# sourceMappingURL=PerformanceComponent.js.map
