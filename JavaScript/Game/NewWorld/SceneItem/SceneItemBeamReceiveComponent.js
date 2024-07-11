"use strict";
var SceneItemBeamReceiveComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, s) {
      var o,
        r = arguments.length,
        n =
          r < 3
            ? t
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(t, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(e, t, i, s);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (o = e[a]) &&
            (n = (r < 3 ? o(n) : 3 < r ? o(t, i, n) : o(t, i)) || n);
      return 3 < r && n && Object.defineProperty(t, i, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemBeamReceiveComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  BattleUiDefine_1 = require("../../Module/BattleUi/BattleUiDefine"),
  castingPerformTag = -308662637,
  stopCastingPerformTag = -1101371633;
let SceneItemBeamReceiveComponent =
  (SceneItemBeamReceiveComponent_1 = class SceneItemBeamReceiveComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.EIe = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.$mn = 0),
        (this.Ymn = 0),
        (this.Jmn = void 0),
        (this.zmn = (e) => {
          var t = this.EIe.GetEntityOnlineInteractType();
          LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            t,
          ) &&
            1 !== this.$mn &&
            ((this.$mn = 1),
            this.Zmn(1),
            this.edn(Protocol_1.Aki.Protocol.rks.Proto_BeginAction),
            0 === this.Ymn
              ? this.tdn(e)
              : (this.Jmn && TimerSystem_1.TimerSystem.Has(this.Jmn)) ||
                (this.Jmn = TimerSystem_1.TimerSystem.Delay(() => {
                  this.tdn(e);
                }, this.Ymn)));
        }),
        (this.idn = (e) => {
          var t = this.EIe.GetEntityOnlineInteractType();
          LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            t,
          ) &&
            0 !== this.$mn &&
            ((this.$mn = 0),
            this.Zmn(0),
            this.Jmn &&
              TimerSystem_1.TimerSystem.Has(this.Jmn) &&
              TimerSystem_1.TimerSystem.Remove(this.Jmn),
            (this.Jmn = void 0),
            this.edn(Protocol_1.Aki.Protocol.rks.Proto_StopAction));
        }),
        (this.tdn = (e) => {
          var t = this.EIe.GetEntityOnlineInteractType();
          LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            t,
          ) &&
            2 !== this.$mn &&
            ((this.$mn = 2),
            this.Zmn(2),
            this.Jmn &&
              TimerSystem_1.TimerSystem.Has(this.Jmn) &&
              TimerSystem_1.TimerSystem.Remove(this.Jmn),
            (this.Jmn = void 0),
            this.edn(Protocol_1.Aki.Protocol.rks.Proto_CompleteAction));
        });
    }
    OnInitData(e) {
      this.EIe = this.Entity.GetComponent(0);
      e = e.GetParam(SceneItemBeamReceiveComponent_1)[0];
      return e
        ? ((this.Lo = e),
          (this.Ymn =
            this.Lo.Duration * BattleUiDefine_1.SECOND_TO_MILLISECOND),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("SceneItem", 40, "[BeamReceiveComp] 组件配置缺失", [
              "PbDataId",
              this.EIe?.GetPbDataId(),
            ]),
          !1);
    }
    OnActivate() {
      (this.Hte = this.Entity.GetComponent(185)),
        (this.Lie = this.Entity.GetComponent(180)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BeamCastStart,
          this.zmn,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BeamCastStop,
          this.idn,
        );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BeamCastStart,
          this.zmn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.BeamCastStart,
            this.zmn,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BeamCastStop,
          this.idn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.BeamCastStop,
            this.idn,
          ),
        !0
      );
    }
    Zmn(e) {
      switch (e) {
        case 0:
          this.Lie?.HasTag(castingPerformTag) &&
            this.Lie?.RemoveTag(castingPerformTag),
            this.Lie?.HasTag(stopCastingPerformTag) ||
              this.Lie?.AddTag(stopCastingPerformTag),
            this.Hte?.SetActiveTagSequencePlaybackProgress(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                castingPerformTag,
              ),
              1,
            );
          break;
        case 1:
          this.Lie?.HasTag(stopCastingPerformTag) &&
            this.Lie?.RemoveTag(stopCastingPerformTag),
            this.Lie?.HasTag(castingPerformTag) ||
              this.Lie?.AddTag(castingPerformTag),
            this.Hte?.SetActiveTagSequenceDurationTime(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                castingPerformTag,
              ),
              this.Lo.Duration,
            ),
            this.Hte?.SetActiveTagSequencePlaybackProgress(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                castingPerformTag,
              ),
              0,
            );
          break;
        case 2:
          this.Hte?.SetActiveTagSequencePlaybackProgress(
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
              castingPerformTag,
            ),
            1,
          ),
            this.Lie?.HasTag(castingPerformTag) &&
              this.Lie?.RemoveTag(castingPerformTag),
            this.Lie?.HasTag(stopCastingPerformTag) &&
              this.Lie?.RemoveTag(stopCastingPerformTag);
      }
    }
    edn(t) {
      var e = Protocol_1.Aki.Protocol.hgs.create();
      (e.P4n = this.EIe.GetCreatureDataId()),
        (e.r6n = t),
        Net_1.Net.Call(2381, e, (e) => {
          e?.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              40,
              "[BeamReceiveComp] 请求执行光线接收行为出错",
              ["PbDataId", this.EIe?.GetPbDataId()],
              ["CreatureDataId", this.EIe?.GetCreatureDataId()],
              ["EntityBeamReceiveType", t],
              ["Response", e],
            );
        });
    }
    GetBeamReceiveActions(e) {
      switch (e) {
        case Protocol_1.Aki.Protocol.rks.Proto_BeginAction:
          return this.Lo?.BeginActions;
        case Protocol_1.Aki.Protocol.rks.Proto_CompleteAction:
          return this.Lo?.CompleteActions;
        case Protocol_1.Aki.Protocol.rks.Proto_StopAction:
          return this.Lo?.StopActions;
        default:
          return;
      }
    }
  });
(SceneItemBeamReceiveComponent = SceneItemBeamReceiveComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(195)],
    SceneItemBeamReceiveComponent,
  )),
  (exports.SceneItemBeamReceiveComponent = SceneItemBeamReceiveComponent);
//# sourceMappingURL=SceneItemBeamReceiveComponent.js.map
