"use strict";
let SceneItemBeamReceiveComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    let o;
    const r = arguments.length;
    let n =
      r < 3 ? t : s === null ? (s = Object.getOwnPropertyDescriptor(t, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(e, t, i, s);
    else
      for (let a = e.length - 1; a >= 0; a--)
        (o = e[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, i, n) : o(t, i)) || n);
    return r > 3 && n && Object.defineProperty(t, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemBeamReceiveComponent = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const BattleUiDefine_1 = require("../../Module/BattleUi/BattleUiDefine");
const castingPerformTag = -308662637;
const stopCastingPerformTag = -1101371633;
let SceneItemBeamReceiveComponent =
  (SceneItemBeamReceiveComponent_1 = class SceneItemBeamReceiveComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.SIe = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.fdn = 0),
        (this.pdn = 0),
        (this.vdn = void 0),
        (this.Mdn = (e) => {
          const t = this.SIe.GetEntityOnlineInteractType();
          LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            t,
          ) &&
            this.fdn !== 1 &&
            ((this.fdn = 1),
            this.Sdn(1),
            this.Edn(Protocol_1.Aki.Protocol.CBs.Proto_BeginAction),
            this.pdn === 0
              ? this.ydn(e)
              : (this.vdn && TimerSystem_1.TimerSystem.Has(this.vdn)) ||
                (this.vdn = TimerSystem_1.TimerSystem.Delay(() => {
                  this.ydn(e);
                }, this.pdn)));
        }),
        (this.Idn = (e) => {
          const t = this.SIe.GetEntityOnlineInteractType();
          LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            t,
          ) &&
            this.fdn !== 0 &&
            ((this.fdn = 0),
            this.Sdn(0),
            this.vdn &&
              TimerSystem_1.TimerSystem.Has(this.vdn) &&
              TimerSystem_1.TimerSystem.Remove(this.vdn),
            (this.vdn = void 0),
            this.Edn(Protocol_1.Aki.Protocol.CBs.Proto_StopAction));
        }),
        (this.ydn = (e) => {
          const t = this.SIe.GetEntityOnlineInteractType();
          LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            t,
          ) &&
            this.fdn !== 2 &&
            ((this.fdn = 2),
            this.Sdn(2),
            this.vdn &&
              TimerSystem_1.TimerSystem.Has(this.vdn) &&
              TimerSystem_1.TimerSystem.Remove(this.vdn),
            (this.vdn = void 0),
            this.Edn(Protocol_1.Aki.Protocol.CBs.Proto_CompleteAction));
        });
    }
    OnInitData(e) {
      this.SIe = this.Entity.GetComponent(0);
      e = e.GetParam(SceneItemBeamReceiveComponent_1)[0];
      return e
        ? ((this.Lo = e),
          (this.pdn =
            this.Lo.Duration * BattleUiDefine_1.SECOND_TO_MILLISECOND),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("SceneItem", 40, "[BeamReceiveComp] 组件配置缺失", [
              "PbDataId",
              this.SIe?.GetPbDataId(),
            ]),
          !1);
    }
    OnActivate() {
      (this.Hte = this.Entity.GetComponent(182)),
        (this.Lie = this.Entity.GetComponent(177)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BeamCastStart,
          this.Mdn,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BeamCastStop,
          this.Idn,
        );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BeamCastStart,
          this.Mdn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.BeamCastStart,
            this.Mdn,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BeamCastStop,
          this.Idn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.BeamCastStop,
            this.Idn,
          ),
        !0
      );
    }
    Sdn(e) {
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
    Edn(t) {
      const e = Protocol_1.Aki.Protocol.dds.create();
      (e.rkn = this.SIe.GetCreatureDataId()),
        (e.AFn = t),
        Net_1.Net.Call(1508, e, (e) => {
          e?.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              40,
              "[BeamReceiveComp] 请求执行光线接收行为出错",
              ["PbDataId", this.SIe?.GetPbDataId()],
              ["CreatureDataId", this.SIe?.GetCreatureDataId()],
              ["EntityBeamReceiveType", t],
              ["Response", e],
            );
        });
    }
    GetBeamReceiveActions(e) {
      switch (e) {
        case Protocol_1.Aki.Protocol.CBs.Proto_BeginAction:
          return this.Lo?.BeginActions;
        case Protocol_1.Aki.Protocol.CBs.Proto_CompleteAction:
          return this.Lo?.CompleteActions;
        case Protocol_1.Aki.Protocol.CBs.Proto_StopAction:
          return this.Lo?.StopActions;
        default:
      }
    }
  });
(SceneItemBeamReceiveComponent = SceneItemBeamReceiveComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(190)],
    SceneItemBeamReceiveComponent,
  )),
  (exports.SceneItemBeamReceiveComponent = SceneItemBeamReceiveComponent);
// # sourceMappingURL=SceneItemBeamReceiveComponent.js.map
