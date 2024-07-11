"use strict";
var SceneItemTimeTrackControlComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, o) {
      var r,
        n = arguments.length,
        s =
          n < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, i, o);
      else
        for (var m = e.length - 1; 0 <= m; m--)
          (r = e[m]) &&
            (s = (n < 3 ? r(s) : 3 < n ? r(t, i, s) : r(t, i)) || s);
      return 3 < n && s && Object.defineProperty(t, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemTimeTrackControlComponent = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelGameplayActionsDefine_1 = require("../../../../LevelGamePlay/LevelGameplayActionsDefine"),
  performSeqTagId = -1438951185;
let SceneItemTimeTrackControlComponent =
  (SceneItemTimeTrackControlComponent_1 = class SceneItemTimeTrackControlComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.mBe = void 0),
        (this.m_n = void 0),
        (this.d_n = void 0),
        (this.C_n = 0),
        (this.g_n = () => {
          var e =
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
              performSeqTagId,
            );
          this.Hte &&
            this.Lie &&
            e &&
            (2 === this.mBe.State
              ? this.Lie.HasTag(performSeqTagId) ||
                (this.Lie.AddTag(performSeqTagId),
                this.Hte.SetActiveTagSequencePlaybackProgress(e, this.C_n),
                this.Hte.PauseActiveTagSequence(e))
              : this.Lie.HasTag(performSeqTagId) &&
                ((this.C_n =
                  this.Hte.GetActiveTagSequencePlaybackProgress(e) ?? 0),
                this.Hte.PauseActiveTagSequence(e)));
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemTimeTrackControlComponent_1)[0];
      return (this.m_n = e.ControlGroups), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(185)),
        (this.Lie = this.Entity.GetComponent(188)),
        (this.mBe = this.Entity.GetComponent(119)),
        !0
      );
    }
    OnActivate() {
      var e = this.Entity.GetComponent(181);
      if (e) {
        var t = e.GetInteractController();
        if (t) {
          let e = 0;
          for (const i of this.m_n) this.f_n(t, e, i), e++;
          EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.g_n,
          ) ||
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              this.g_n,
            ),
            0 !== this.mBe.State && this.g_n();
        }
      }
      return !0;
    }
    OnEnd() {
      return (
        this.d_n?.Valid() &&
          (TimerSystem_1.TimerSystem.Remove(this.d_n), (this.d_n = void 0)),
        this.Lie?.HasTag(performSeqTagId) &&
          this.Lie.RemoveTag(performSeqTagId),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.g_n,
          ),
        !0
      );
    }
    GetTimeTrackControlConfig(e) {
      if (!(this.m_n.length < e)) return this.m_n[e];
    }
    f_n(e, t, i) {
      var o = new LevelGameplayActionsDefine_1.ActionTimeTrackControl(),
        r =
          ((o.ConfigIndex = t),
          (o.EntityId = this.Entity.GetComponent(0).GetCreatureDataId()),
          e.GetInteractiveOption());
      e.AddClientInteractOption(
        o,
        i.Condition,
        r ? r.DoIntactType : "Direct",
        void 0,
        this.m_n[t].TidContent,
      );
    }
    GetTargetActions(i) {
      if (i) {
        let t = void 0;
        for (const e of this.m_n[i.Jvs].ControlPointEvents)
          if (e.Index === i.zvs) {
            t = e;
            break;
          }
        if (t) {
          let e = void 0;
          switch (i.Zvs) {
            case Protocol_1.Aki.Protocol.iks.Proto_LeftIn:
              e = t.LeftInEventActions;
              break;
            case Protocol_1.Aki.Protocol.iks.Proto_LeftOut:
              e = t.LeftOutEventActions;
              break;
            case Protocol_1.Aki.Protocol.iks.Proto_RightIn:
              e = t.RightInEventActions;
              break;
            case Protocol_1.Aki.Protocol.iks.Proto_RightOut:
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
          this.Hte.SetActiveTagSequencePlaybackProgress(i, this.C_n),
          this.Hte.PauseActiveTagSequence(i)),
        this.d_n?.Valid() &&
          (TimerSystem_1.TimerSystem.Remove(this.d_n), (this.d_n = void 0)),
        0 !== t) &&
        (this.Hte.ResumeActiveTagSequence(i, e), 0 < t) &&
        (this.d_n = TimerSystem_1.TimerSystem.Delay(() => {
          this.Hte?.PauseActiveTagSequence(i), (this.d_n = void 0);
        }, t * CommonDefine_1.MILLIONSECOND_PER_SECOND));
    }
  });
(SceneItemTimeTrackControlComponent = SceneItemTimeTrackControlComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(120)],
    SceneItemTimeTrackControlComponent,
  )),
  (exports.SceneItemTimeTrackControlComponent =
    SceneItemTimeTrackControlComponent);
//# sourceMappingURL=SceneItemTimeTrackControlComponent.js.map
