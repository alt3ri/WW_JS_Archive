"use strict";
let SceneItemTimeTrackControlComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    let r;
    const n = arguments.length;
    let s =
      n < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, i, o);
    else
      for (let m = e.length - 1; m >= 0; m--)
        (r = e[m]) && (s = (n < 3 ? r(s) : n > 3 ? r(t, i, s) : r(t, i)) || s);
    return n > 3 && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemTimeTrackControlComponent = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGameplayActionsDefine_1 = require("../../../../LevelGamePlay/LevelGameplayActionsDefine");
const performSeqTagId = -687845e3;
let SceneItemTimeTrackControlComponent =
  (SceneItemTimeTrackControlComponent_1 = class SceneItemTimeTrackControlComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.mBe = void 0),
        (this.B_n = void 0),
        (this.b_n = void 0),
        (this.q_n = 0),
        (this.G_n = () => {
          const e =
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
              performSeqTagId,
            );
          this.Hte &&
            this.Lie &&
            e &&
            (this.mBe.State === 2
              ? this.Lie.HasTag(performSeqTagId) ||
                (this.Lie.AddTag(performSeqTagId),
                this.Hte.SetActiveTagSequencePlaybackProgress(e, this.q_n),
                this.Hte.PauseActiveTagSequence(e))
              : this.Lie.HasTag(performSeqTagId) &&
                ((this.q_n =
                  this.Hte.GetActiveTagSequencePlaybackProgress(e) ?? 0),
                this.Lie.RemoveTag(performSeqTagId)));
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemTimeTrackControlComponent_1)[0];
      return (this.B_n = e.ControlGroups), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(182)),
        (this.Lie = this.Entity.GetComponent(185)),
        (this.mBe = this.Entity.GetComponent(117)),
        !0
      );
    }
    OnActivate() {
      const e = this.Entity.GetComponent(178);
      if (e) {
        const t = e.GetInteractController();
        if (t) {
          let e = 0;
          for (const i of this.B_n) this.N_n(t, e, i), e++;
          EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.G_n,
          ) ||
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              this.G_n,
            ),
            this.mBe.State !== 0 && this.G_n();
        }
      }
      return !0;
    }
    OnEnd() {
      return (
        this.b_n?.Valid() &&
          (TimerSystem_1.TimerSystem.Remove(this.b_n), (this.b_n = void 0)),
        this.Lie?.HasTag(performSeqTagId) &&
          this.Lie.RemoveTag(performSeqTagId),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.G_n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.G_n,
          ),
        !0
      );
    }
    GetTimeTrackControlConfig(e) {
      if (!(this.B_n.length < e)) return this.B_n[e];
    }
    N_n(e, t, i) {
      const o = new LevelGameplayActionsDefine_1.ActionTimeTrackControl();
      const r =
        ((o.ConfigIndex = t),
        (o.EntityId = this.Entity.GetComponent(0).GetCreatureDataId()),
        e.GetInteractiveOption());
      e.AddClientInteractOption(
        o,
        i.Condition,
        r ? r.DoIntactType : "Direct",
        void 0,
        this.B_n[t].TidContent,
      );
    }
    GetTargetActions(i) {
      if (i) {
        let t = void 0;
        for (const e of this.B_n[i.qCs].ControlPointEvents)
          if (e.Index === i.GCs) {
            t = e;
            break;
          }
        if (t) {
          let e = void 0;
          switch (i.OCs) {
            case Protocol_1.Aki.Protocol.mBs.Proto_LeftIn:
              e = t.LeftInEventActions;
              break;
            case Protocol_1.Aki.Protocol.mBs.Proto_LeftOut:
              e = t.LeftOutEventActions;
              break;
            case Protocol_1.Aki.Protocol.mBs.Proto_RightIn:
              e = t.RightInEventActions;
              break;
            case Protocol_1.Aki.Protocol.mBs.Proto_RightOut:
              e = t.RightOutEventActions;
          }
          return e;
        }
      }
    }
    PlayActiveSeqForDuration(e, t) {
      const i =
        GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(performSeqTagId);
      this.Hte &&
        this.Lie &&
        i &&
        (void 0 === this.Hte.GetActiveTagSequencePlaybackProgress(i) &&
          (this.Lie.HasTag(performSeqTagId) &&
            this.Lie.RemoveTag(performSeqTagId),
          this.Lie.AddTag(performSeqTagId),
          this.Hte.SetActiveTagSequencePlaybackProgress(i, this.q_n),
          this.Hte.PauseActiveTagSequence(i)),
        this.b_n?.Valid() &&
          (TimerSystem_1.TimerSystem.Remove(this.b_n), (this.b_n = void 0)),
        t !== 0) &&
        (this.Hte.ResumeActiveTagSequence(i, e), t > 0) &&
        (this.b_n = TimerSystem_1.TimerSystem.Delay(() => {
          this.Hte?.PauseActiveTagSequence(i), (this.b_n = void 0);
        }, t * CommonDefine_1.MILLIONSECOND_PER_SECOND));
    }
  });
(SceneItemTimeTrackControlComponent = SceneItemTimeTrackControlComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(118)],
    SceneItemTimeTrackControlComponent,
  )),
  (exports.SceneItemTimeTrackControlComponent =
    SceneItemTimeTrackControlComponent);
// # sourceMappingURL=SceneItemTimeTrackControlComponent.js.map
