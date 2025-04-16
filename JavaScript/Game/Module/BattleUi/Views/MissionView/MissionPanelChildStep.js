"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MissionPanelChildStep = void 0);
const ue_1 = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  StepWithStatusItem_1 = require("./TreeStep/StepWithStatusItem"),
  UNLOCK_ANIM = "Unlock";
class MissionPanelChildStep extends StepWithStatusItem_1.StepWithStatusItem {
  constructor(t, i) {
    super(t, i),
      (this.ViewId = t),
      (this.StepId = i),
      (this.Oct = void 0),
      (this.kct = void 0),
      (this.Fct = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.KF_ = void 0),
      (this.XF_ = void 0),
      (this.kj_ = void 0),
      (this.qj_ = void 0),
      (this.Vct = void 0),
      (this.Hct = void 0),
      (this.jct = IQuest_1.EQuestScheduleType.None),
      (this.Gr_ = !0),
      (this.Oj_ = !1),
      (this.Th_ = !1),
      (this.g1_ = 0),
      (this.yct = (t) => {
        switch (t) {
          case "Success":
            this.DescribeTextComp?.SetColor(this.Vct);
            break;
          case "Fail":
            this.DescribeTextComp?.SetColor(this.Hct);
            break;
          case "Start":
            this.KF_?.IsPending() && this.KF_.SetResult(!0);
            break;
          case "Close":
            this.XF_?.IsPending() && this.XF_.SetResult(!0);
            break;
          case UNLOCK_ANIM:
            this.kj_?.IsPending() && this.kj_.SetResult(!0);
        }
      }),
      (this.nJa = (t) => {
        t === UNLOCK_ANIM &&
          (this.g1_ === MissionPanelChildStep.p1_ &&
            this.qj_?.IsPending() &&
            this.qj_.SetResult(!0),
          MissionPanelChildStep.p1_++);
      }),
      (this.Oct = ue_1.Color.FromHex("ECE5D8FF")),
      (this.kct = ue_1.Color.FromHex("ADADADFF")),
      (this.Fct = ue_1.Color.FromHex("C9F797FF"));
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([5, ue_1.UIItem]),
      this.ComponentRegisterInfos.push([6, ue_1.UISprite]);
  }
  OnStart() {
    super.OnStart(),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct),
      this.RootActor.OnSequencePlayEvent.Bind(this.nJa),
      this.GetItem(5)?.SetUIActive(!1),
      this.GetSprite(6)?.SetUIActive(!1),
      (this.RootActor.GetComponentByClass(
        ue_1.UISizeControlByOther.StaticClass(),
      ).bSizeZeroWhenNotActive = !0),
      this.YQ_();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.nJa,
    );
  }
  OnAfterShow() {
    this.LevelSequencePlayer?.ResumeSequence(), this.YQ_();
  }
  OnAfterHide() {
    this.LevelSequencePlayer?.PauseSequence();
  }
  async StartShow(t) {
    await this.ShowAsync(),
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Start");
    var i = this.CheckVisible();
    (this.KF_ = new CustomPromise_1.CustomPromise()),
      (!t && i) || this.LevelSequencePlayer.EndSequenceLastFrame("Start"),
      await this.KF_.Promise;
  }
  async EndShow(t) {
    this.LevelSequencePlayer?.PlayLevelSequenceByName("Close");
    var i = this.CheckVisible();
    (this.XF_ = new CustomPromise_1.CustomPromise()),
      (!t && i) || this.LevelSequencePlayer.EndSequenceLastFrame("Close"),
      await this.XF_.Promise,
      await this.Refresh(void 0, void 0),
      await this.HideAsync();
  }
  CheckVisible() {
    var t = super.CheckVisible();
    return this.YQ_(), t;
  }
  async OnReset() {
    this.LevelSequencePlayer?.StopCurrentSequence(!0, !0),
      await this.HideAsync(),
      this.GetItem(5)?.SetUIActive(!1),
      await super.OnReset();
  }
  UpdateStepInfo() {
    this.Wct(), this.bh_(), super.UpdateStepInfo(), this.YQ_();
  }
  YQ_() {
    this.GetItem(5)?.SetUIActive(this.IsDescribeTextVisible);
  }
  bh_() {
    var t;
    this.Oj_ ||
      ((t = this.CheckMeetPreCondition()),
      this.Gr_ !== t &&
        (t
          ? this.PlayUnlockAnim()
          : ((this.Gr_ = !1),
            this.DescribeTextComp.SetColor(this.kct),
            this.GetSprite(6)?.SetAlpha(1),
            this.GetSprite(6)?.SetUIActive(!0),
            0 === this.Config?.ShowSource &&
              (this.Config.UsePreStateText = !0))));
  }
  async PlayUnlockAnim() {
    this.LevelSequencePlayer &&
      ((this.Oj_ = !0),
      (this.g1_ = MissionPanelChildStep.p1_),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.nJa,
      ),
      this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
      this.LevelSequencePlayer.PlayLevelSequenceByName(UNLOCK_ANIM),
      (this.qj_ = new CustomPromise_1.CustomPromise()),
      await this.qj_.Promise,
      (this.Th_ = !0),
      this.DescribeTextComp?.SetColor(this.Oct),
      0 === this.Config?.ShowSource && (this.Config.UsePreStateText = !1),
      (this.kj_ = new CustomPromise_1.CustomPromise()),
      await this.kj_.Promise,
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.nJa,
      ),
      (this.Th_ = !1),
      (this.Oj_ = !1),
      (this.Gr_ = !0),
      this.GetSprite(6)?.SetUIActive(!1));
  }
  CheckCanShowStatusRoot() {
    return this.Gr_ ? super.CheckCanShowStatusRoot() : this.Th_;
  }
  CheckCanUpdateStatusNode() {
    return this.Gr_;
  }
  CheckMeetPreCondition() {
    if (0 === this.Config?.ShowSource) {
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
        this.ShowData?.Id,
      );
      if (t && t.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        var i = this.Config.QuestScheduleType;
        if (i.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted) {
          i = i?.TitlePreState;
          if (i)
            return (
              (t = LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
                t.BtType,
                t.TreeIncId,
                t.TreeConfigId,
                void 0,
                void 0,
              )),
              ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
                i.SwitchConditions,
                void 0,
                t,
              )
            );
        }
      }
    }
    return !0;
  }
  Wct() {
    if (this.Config) {
      let i = IQuest_1.EQuestScheduleType.None;
      if (
        (1 === this.Config.ShowSource
          ? (i = this.Config.QuestScheduleType)
          : 0 === this.Config.ShowSource &&
            this.Config.QuestScheduleType &&
            (i = this.Config.QuestScheduleType.Type),
        this.jct !== i)
      )
        switch ((this.jct = i)) {
          case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          case "FishingEntrust":
            (this.Vct = this.Fct), (this.Hct = this.kct);
            var e =
                ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  "SP_MissionState",
                ),
              s =
                ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  "SP_MissionComplete",
                ),
              h =
                ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  "SP_MissionLose",
                );
            this.SetSpriteByPath(e, this.StepStatusNode, !0),
              this.SetSpriteByPath(s, this.StepSuccess, !0),
              this.SetSpriteByPath(h, this.StepLose, !0);
            break;
          case IQuest_1.EQuestScheduleType.Condition:
          case IQuest_1.EQuestScheduleType.TimeLeft: {
            let t = void 0;
            (t =
              (i,
              IQuest_1.EQuestScheduleType.Condition,
              this.Config.QuestScheduleType)),
              (this.Vct = this.Oct),
              (this.Hct = this.kct);
            (e =
              1 === t.IconType ? "SP_DailyTowerStarBg" : "SP_ComStateOffline"),
              (s =
                ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  e,
                )),
              (h =
                (this.SetSpriteByPath(s, this.StepStatusNode, !0),
                1 === t.IconType ? "SP_DailyTowerStar" : "SP_ComStateOnline")),
              (e =
                ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  h,
                ));
            this.SetSpriteByPath(e, this.StepSuccess, !0),
              this.SetSpriteByPath(s, this.StepLose, !0);
            break;
          }
        }
    }
  }
  OnStatusChanged(t, i) {
    let e = void 0;
    switch (t) {
      case 0:
        this.DescribeTextComp.SetColor(this.Oct);
        break;
      case 1:
        e = "Success";
        break;
      case 2:
        e = "Fail";
    }
    e &&
      (this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
      this.LevelSequencePlayer.PlayLevelSequenceByName(e),
      3 !== i) &&
      this.LevelSequencePlayer.EndSequenceLastFrame(e);
  }
  async OnConfigRefresh(t, i) {
    await super.OnConfigRefresh(t, i),
      (this.Gr_ = !0),
      (this.Th_ = !1),
      this.LevelSequencePlayer?.StopCurrentSequence(!0, !0);
  }
}
(exports.MissionPanelChildStep = MissionPanelChildStep).p1_ = 0;
//# sourceMappingURL=MissionPanelChildStep.js.map
