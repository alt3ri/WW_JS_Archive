"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewBase = void 0);
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class ActivitySubViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.GOe = void 0),
      (this.ActivityRemainTimeText = ""),
      (this.ActivityBaseData = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.MBn = (e) => {
        this.OnSequenceStart(e);
      }),
      (this.yTn = (e) => {
        this.OnSequenceClose(e);
      }),
      (this.kOe = () => {
        this.OnTimer(TimeUtil_1.TimeUtil.InverseMillisecond);
      });
  }
  OnBeforeShowImplement() {
    (this.GOe = TimerSystem_1.TimerSystem.Forever(
      this.kOe,
      TimeUtil_1.TimeUtil.InverseMillisecond,
    )),
      this.LevelSequencePlayer ||
        ((this.LevelSequencePlayer =
          new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
        this.LevelSequencePlayer.BindSequenceStartEvent(this.MBn),
        this.LevelSequencePlayer.BindSequenceCloseEvent(this.yTn)),
      this.kOe(),
      this.OnAddEventListener();
  }
  OnSequenceStart(e) {}
  OnSequenceClose(e) {}
  OnAfterHideImplement() {
    this.jm(), this.OnRemoveEventListener();
  }
  jm() {
    TimerSystem_1.TimerSystem.Has(this.GOe) &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
  SetData(e) {
    (this.ActivityBaseData = e), this.OnSetData();
  }
  OnSetData() {}
  RefreshView() {
    this.ActivityBaseData &&
      ModelManager_1.ModelManager.ActivityModel.SendActivityTabViewOpenLogData(
        this.ActivityBaseData,
      ),
      this.OnRefreshView();
  }
  async BeforeShowSelfAsync() {
    await this.OnBeforeShowSelfAsync();
  }
  async BeforeHideSelfAsync() {
    await this.OnBeforeHideSelfAsync();
  }
  OnCommonViewStateChange(e) {}
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnRefreshView() {}
  async OnBeforeShowSelfAsync() {}
  async OnBeforeHideSelfAsync() {}
  PlaySubViewSequence(e, i = !1) {
    this.LevelSequencePlayer.GetCurrentSequence() === e
      ? this.LevelSequencePlayer.ReplaySequenceByKey(e)
      : this.LevelSequencePlayer.PlayLevelSequenceByName(e, i);
  }
  GetTimeVisibleAndRemainTime() {
    return ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(
      this.ActivityBaseData,
    );
  }
  GetCurrentLockConditionText() {
    var e;
    return this.ActivityBaseData.IsUnLock()
      ? ""
      : ((e = this.ActivityBaseData.ConditionGroupId),
        LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
          e,
        ) ?? "");
  }
  OnTimer(e) {}
  OnBeforeDestroyImplement() {
    this.jm(), this.LevelSequencePlayer?.Clear();
  }
}
exports.ActivitySubViewBase = ActivitySubViewBase;
//# sourceMappingURL=ActivitySubViewBase.js.map
