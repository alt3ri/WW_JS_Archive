"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestUpdateTipsController = void 0);
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  MissionPanelControllerBase_1 = require("./MissionPanelControllerBase");
class QuestUpdateTipsController extends MissionPanelControllerBase_1.MissionPanelControllerBase {
  constructor(s, t, e, i) {
    super(),
      (this.$pt = s),
      (this.jZe = t),
      (this.DU_ = e),
      (this.JU_ = i),
      (this.ControllerType = 1),
      (this.oxn = 0),
      (this.rct = void 0),
      (this.QG_ = void 0),
      (this.KG_ = void 0),
      (this.XG_ = void 0),
      (this.YG_ = void 0),
      (this.zG_ = void 0),
      (this.JG_ = !1),
      (this.yct = (s) => {
        switch (s) {
          case "MissionIn":
            1 === this.oxn
              ? this.KG_?.IsPending() && this.KG_.SetResult(!0)
              : 3 === this.oxn &&
                this.zG_?.IsPending() &&
                this.zG_.SetResult(!0);
            break;
          case "MissionOut":
            1 === this.oxn
              ? this.QG_?.IsPending() && this.QG_.SetResult(!0)
              : 3 === this.oxn &&
                this.YG_?.IsPending() &&
                this.YG_.SetResult(!0);
        }
      }),
      (this.fqn = () => {
        switch (
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Log", 18, "MissionPanel:Press Track"),
          this.oxn)
        ) {
          case 1:
            this.$pt.StopCurrentSequence(!0, !0);
            break;
          case 2:
            TimerSystem_1.TimerSystem.Has(this.rct) &&
              TimerSystem_1.TimerSystem.Remove(this.rct),
              this.XG_?.SetResult(!0);
        }
        this.JG_ = !0;
      }),
      this.$pt.BindSequenceCloseEvent(this.yct);
  }
  OnDestroy() {
    this.$pt.Clear(), this.jZe.Destroy(), this.rct?.Remove();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.QuestUpdateTipsClickTrack,
      this.fqn,
    );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.QuestUpdateTipsClickTrack,
      this.fqn,
    );
  }
  OnPanelShow() {
    this.$pt.ResumeSequence(),
      TimerSystem_1.TimerSystem.Has(this.rct) &&
        TimerSystem_1.TimerSystem.IsPause(this.rct) &&
        TimerSystem_1.TimerSystem.Resume(this.rct);
  }
  OnPanelHide() {
    this.$pt.PauseSequence(),
      TimerSystem_1.TimerSystem.Has(this.rct) &&
        TimerSystem_1.TimerSystem.Pause(this.rct);
  }
  async ShowQuestUpdateTipsHandle(s) {
    var t,
      e = s.Info;
    return (
      e &&
        (t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.QuestId)) &&
        ((t.IsNewQuest = !1),
        (t = e.QuestId),
        e.IsSkipAnim
          ? (QuestController_1.QuestNewController.RequestTrackQuest(t, !0, 0),
            this.axn(s))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Log",
                18,
                "MissionPanel: 开始执行任务更新提示流程",
                ["questId", t],
              ),
            (this.oxn = 1),
            this.DU_() ||
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Log",
                  18,
                  "MissionPanel:QuestUpdateStart - MissionOut开始播放",
                  ["questId", t],
                ),
              this.ZG_(!1),
              (this.QG_ = new CustomPromise_1.CustomPromise()),
              this.$pt.PlayLevelSequenceByName("MissionOut"),
              await this.QG_.Promise),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Log",
                18,
                "MissionPanel:QuestUpdateStart - MISSION_IN开始播放",
                ["questId", t],
              ),
            this.jZe.OnBeforePlayShowSequence(e),
            this.ZG_(!0),
            (this.KG_ = new CustomPromise_1.CustomPromise()),
            this.$pt.PlayLevelSequenceByName("MissionIn"),
            await this.KG_.Promise,
            this.JG_ ||
              ((this.oxn = 2),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Log", 18, "MissionPanel:QuestUpdateStay", [
                  "questId",
                  t,
                ]),
              (e = this.e2_(e.QuestId)),
              (this.XG_ = new CustomPromise_1.CustomPromise()),
              (this.rct = TimerSystem_1.TimerSystem.Delay(() => {
                this.XG_?.SetResult(!0);
              }, e)),
              await this.XG_.Promise),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Log",
                18,
                "MissionPanel:QuestUpdateEnd - MISSION_OUT开始播放",
                ["questId", t],
              ),
            (this.oxn = 3),
            this.ZG_(!0),
            this.jZe.OnBeforePlayHideSequence(),
            (this.YG_ = new CustomPromise_1.CustomPromise()),
            this.$pt.PlayLevelSequenceByName("MissionOut"),
            await this.YG_.Promise,
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Log",
                18,
                "MissionPanel:QuestUpdateEnd - MISSION_IN开始播放",
                ["questId", t],
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.QuestUpdateTipsEndSequenceStart,
            ),
            this.ZG_(!1),
            (e = this.DU_()),
            this.$pt.PlayLevelSequenceByName("MissionIn"),
            e
              ? this.$pt.EndSequenceLastFrame("MissionIn")
              : ((this.zG_ = new CustomPromise_1.CustomPromise()),
                await this.zG_.Promise),
            this.axn(s),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Log",
                18,
                "MissionPanel: 任务更新提示流程执行结束",
                ["questId", t],
              ))),
      !0
    );
  }
  ZG_(s) {
    this.jZe.SetUiActive(s), this.JU_.SetUIActive(!s);
  }
  e2_(s) {
    var s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(s);
    return (s =
      s &&
      ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestUpdateShowTime(
        s.Type,
      ))
      ? 1e3 * s
      : TimerSystem_1.MIN_TIME;
  }
  axn(s) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Log", 18, "MissionPanel:QuestUpdateTipsEnd - AllOver", [
        "processId",
        s.Info.QuestId,
      ]),
      this.jZe.OnAfterPlayHideSequence(),
      (this.oxn = 0),
      (this.JG_ = !1);
  }
}
exports.QuestUpdateTipsController = QuestUpdateTipsController;
//# sourceMappingURL=QuestUpdateTipsController.js.map
