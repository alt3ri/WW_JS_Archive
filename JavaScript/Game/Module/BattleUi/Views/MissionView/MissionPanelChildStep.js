"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MissionPanelChildStep = void 0);
const ue_1 = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  TreeStepWithStatus_1 = require("../../../GeneralLogicTree/View/TreeStep/TreeStepWithStatus");
class MissionPanelChildStep extends TreeStepWithStatus_1.TreeStepWithStatus {
  constructor() {
    super(),
      (this.Oct = void 0),
      (this.kct = void 0),
      (this.Fct = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.Vct = void 0),
      (this.Hct = void 0),
      (this.jct = IQuest_1.EQuestScheduleType.None),
      (this.Zut = 0),
      (this.pxn = void 0),
      (this.owt = (e) => {
        "Start" === e && this.SetActive(!0);
      }),
      (this.yct = (e) => {
        switch (e) {
          case "Success":
            this.DescribeTextComp?.SetColor(this.Vct);
            break;
          case "Fail":
            this.DescribeTextComp?.SetColor(this.Hct);
            break;
          case "Start":
            this.Ict();
            break;
          case "Close":
            this.SetActive(!1), this.pxn ? this.pxn() : this.Ict();
        }
      }),
      (this.Oct = ue_1.Color.FromHex("ECE5D8FF")),
      (this.kct = ue_1.Color.FromHex("ADADADFF")),
      (this.Fct = ue_1.Color.FromHex("C9F797FF"));
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([5, ue_1.UIItem]);
  }
  OnStart() {
    super.OnStart(),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.LevelSequencePlayer.BindSequenceStartEvent(this.owt),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct),
      this.GetItem(5)?.SetUIActive(!1);
  }
  SetUiVisible(e) {
    this.SetUiActive(e), e || this.GetItem(5)?.SetAlpha(0);
  }
  Wct() {
    var t = this.Config.QuestScheduleType;
    if (this.jct !== t.Type)
      switch (((this.jct = t.Type), t.Type)) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          (this.Vct = this.Fct), (this.Hct = this.kct);
          var s =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                "SP_MissionState",
              ),
            i =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                "SP_MissionComplete",
              ),
            h =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                "SP_MissionLose",
              );
          this.SetSpriteByPath(s, this.StepStatusNode, !0),
            this.SetSpriteByPath(i, this.StepSuccess, !0),
            this.SetSpriteByPath(h, this.StepLose, !0);
          break;
        case IQuest_1.EQuestScheduleType.Condition:
        case IQuest_1.EQuestScheduleType.TimeLeft: {
          let e = void 0;
          (e = (t.Type, IQuest_1.EQuestScheduleType.Condition, t)),
            (this.Vct = this.Oct),
            (this.Hct = this.kct);
          (s = 1 === e.IconType ? "SP_DailyTowerStarBg" : "SP_ComStateOffline"),
            (i =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                s,
              )),
            (h =
              (this.SetSpriteByPath(i, this.StepStatusNode, !0),
              1 === e.IconType ? "SP_DailyTowerStar" : "SP_ComStateOnline")),
            (s =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                h,
              ));
          this.SetSpriteByPath(s, this.StepSuccess, !0),
            this.SetSpriteByPath(i, this.StepLose, !0);
          break;
        }
      }
  }
  UpdateStepInfo() {
    this.Wct();
    var e = super.UpdateStepInfo();
    return (
      this.StepSuccess?.IsUIActiveInHierarchy()
        ? this.DescribeTextComp.SetColor(this.Vct)
        : this.StepLose?.IsUIActiveInHierarchy()
          ? this.DescribeTextComp.SetColor(this.Hct)
          : this.DescribeTextComp.SetColor(this.Oct),
      e
    );
  }
  OnSuccessNodeActive(e) {
    if (e)
      switch (this.jct) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          this.LevelSequencePlayer.PlayLevelSequenceByName("Success");
          break;
        case IQuest_1.EQuestScheduleType.TimeLeft:
        case IQuest_1.EQuestScheduleType.Condition:
          this.yct("Success");
      }
  }
  OnLoseNodeActive(e) {
    if (e)
      switch (this.jct) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          this.LevelSequencePlayer.PlayLevelSequenceByName("Fail");
          break;
        case IQuest_1.EQuestScheduleType.TimeLeft:
        case IQuest_1.EQuestScheduleType.Condition:
          this.yct("Fail");
      }
  }
  OnStepDescribeUpdate(e) {
    e = StringUtils_1.StringUtils.IsBlank(e);
    this.GetItem(5)?.SetUIActive(!e);
  }
  PlayStartSequence(e) {
    (this.Zut = e),
      this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Start");
    var e =
        "Disabled" !==
        ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode(),
      t = this.vxn();
    (!e && t) || this.LevelSequencePlayer.StopCurrentSequence(!0, !0);
  }
  PlayCloseSequence(e, t) {
    (this.Zut = e),
      this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Close"),
      (this.pxn = t);
    (e =
      "Disabled" !== ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode()),
      (t = this.vxn());
    return !(
      (!e && t) ||
      (this.LevelSequencePlayer.StopCurrentSequence(!0, !0), 0)
    );
  }
  vxn() {
    return void 0 !== this.Config;
  }
  Ict() {
    this.Zut &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MissionPanelProcessEnd,
        this.Zut,
      ),
      (this.Zut = 0));
  }
}
exports.MissionPanelChildStep = MissionPanelChildStep;
//# sourceMappingURL=MissionPanelChildStep.js.map
