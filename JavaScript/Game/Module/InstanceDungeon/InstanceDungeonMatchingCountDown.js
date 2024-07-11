"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonMatchingCountDown = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonMatchingCountDown extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.SPe = void 0),
      (this.y1i = void 0),
      (this.I1i = void 0),
      (this.T1i = void 0),
      (this.n_i = () => {
        var e;
        "Close" === this.T1i
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "InstanceDungeon",
              28,
              "当前正在播放Close动画，不响应点击事件",
            )
          : 3 !==
              (e =
                ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()) &&
            2 !== e &&
            (this.PlayAnimation("Close"), this.y1i) &&
            this.y1i();
      }),
      (this.yct = (e) => {
        ("Close" !== e && "Finish" !== e) || this.SetUiActive(!1),
          this.I1i?.(e);
      }),
      (this.D1i = () => {
        (UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") ||
          UiManager_1.UiManager.IsViewShow("OnlineWorldHallView") ||
          UiManager_1.UiManager.IsViewShow("EditBattleTeamView")) &&
          this.GetText(5)?.SetText(
            TimeUtil_1.TimeUtil.GetTimeString(
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                .MatchingTime,
            ),
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [2, UE.UIButtonComponent],
      [7, UE.UIText],
      [5, UE.UIText],
      [8, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[8, this.n_i]]);
  }
  OnStart() {
    this.GetButton(2)?.RootUIComp.SetUIActive(!1),
      this.GetItem(10)?.SetUIActive(!1),
      this.GetItem(11)?.SetUIActive(!1),
      this.GetItem(12)?.SetUIActive(!0),
      this.GetItem(13)?.SetUIActive(!1),
      this.GetItem(14)?.SetUIActive(!0),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent(this.yct),
      this.RefreshButtonActivity();
  }
  RefreshButtonActivity() {
    ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? this.GetButton(8).RootUIComp.SetUIActive(
          ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam(),
        )
      : this.GetButton(8).RootUIComp.SetUIActive(!0);
  }
  PlayAnimation(e) {
    this.T1i !== e &&
      (this.SetUiActive(!0),
      this.SPe.StopCurrentSequence(),
      this.SPe.PlayLevelSequenceByName(e),
      (this.T1i = e));
  }
  OnBeforeDestroy() {
    (this.y1i = void 0), this.SPe?.Clear(), (this.SPe = void 0);
  }
  StartTimer() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel,
      i = this.GetText(5);
    i.SetText(TimeUtil_1.TimeUtil.GetTimeString(e.MatchingTime)),
      i.SetUIActive(!0),
      this.GetText(7).ShowTextNew(
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          e.GetMatchingId(),
        ).MapName,
      ),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchTimer(
        this.D1i,
      ),
      "AutoLoop" === this.SPe.GetCurrentSequence()
        ? this.SPe.ReplaySequenceByKey("AutoLoop")
        : this.SPe.PlayLevelSequenceByName("AutoLoop"),
      this.RefreshButtonActivity();
  }
  BindOnStopTimer(e) {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.OnStopTimer = e;
  }
  BindOnClickBtnCancelMatching(e) {
    this.y1i = e;
  }
  BindOnAfterCloseAnimation(e) {
    this.I1i = e;
  }
  BindOnStopHandle(e) {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.OnStopHandle = e;
  }
  SetMatchingTime(e) {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.MatchingTime = e;
  }
}
exports.InstanceDungeonMatchingCountDown = InstanceDungeonMatchingCountDown;
//# sourceMappingURL=InstanceDungeonMatchingCountDown.js.map
