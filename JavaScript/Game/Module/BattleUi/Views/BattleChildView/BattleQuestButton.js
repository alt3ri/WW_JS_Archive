"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleQuestButton = void 0);
const ue_1 = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattleEntranceButton_1 = require("./BattleEntranceButton"),
  MISSION_UPGRADE_IN = "MissionUpgradeIn",
  MISSION_UPGRADE_OUT = "MissionUpgradeOut";
class BattleQuestButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments),
      (this.SequencePlayer = void 0),
      (this.owt = (e) => {
        switch (e) {
          case MISSION_UPGRADE_IN:
            this.GetItem(2)?.SetUIActive(
              ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible,
            );
            break;
          case MISSION_UPGRADE_OUT:
        }
      }),
      (this.yct = (e) => {
        switch (e) {
          case MISSION_UPGRADE_IN:
            this.SequencePlayer.PlayLevelSequenceByName(MISSION_UPGRADE_OUT),
              "Disabled" !==
                ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() &&
                this.SequencePlayer.StopCurrentSequence(!0, !0);
            break;
          case MISSION_UPGRADE_OUT:
        }
      }),
      (this.rxn = (e) => {
        var t = this.GetText(3),
          e =
            (e
              ? LguiUtil_1.LguiUtil.SetLocalText(t, "QuestUpdateNewQuestTips")
              : LguiUtil_1.LguiUtil.SetLocalText(t, "QuestUpdateNewGoalTips"),
            this.SequencePlayer.StopCurrentSequence(!0, !0),
            this.SequencePlayer.PlayLevelSequenceByName(MISSION_UPGRADE_IN),
            "Disabled" !==
              ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode());
        e && this.SequencePlayer.StopCurrentSequence(!0, !0);
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, ue_1.UIItem]),
      this.ComponentRegisterInfos.push([3, ue_1.UIText]);
  }
  Initialize(e) {
    super.Initialize(e),
      (this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.SequencePlayer.BindSequenceStartEvent(this.owt),
      this.SequencePlayer.BindSequenceCloseEvent(this.yct),
      this.AddEvents();
  }
  Reset() {
    this.RemoveEvents(), super.Reset();
  }
  OnShowBattleChildView() {
    super.OnShowBattleChildView(),
      this.SequencePlayer.GetCurrentSequence() &&
        this.SequencePlayer.ResumeSequence();
  }
  OnHideBattleChildView() {
    super.OnHideBattleChildView(),
      this.SequencePlayer.GetCurrentSequence() &&
        this.SequencePlayer.PauseSequence();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MissionUpdate,
      this.rxn,
    );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MissionUpdate,
      this.rxn,
    );
  }
}
exports.BattleQuestButton = BattleQuestButton;
//# sourceMappingURL=BattleQuestButton.js.map
