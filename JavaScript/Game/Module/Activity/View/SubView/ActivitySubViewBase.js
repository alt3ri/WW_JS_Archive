"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewBase = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class ActivitySubViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.GOe = void 0),
      (this.M4e = ""),
      (this.S4e = ""),
      (this.E4e = ""),
      (this.y4e = ""),
      (this.ActivityBaseData = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.bxn = (e) => {
        this.OnSequenceStart(e);
      }),
      (this.iIn = (e) => {
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
        this.LevelSequencePlayer.BindSequenceStartEvent(this.bxn),
        this.LevelSequencePlayer.BindSequenceCloseEvent(this.iIn)),
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
    var i;
    StringUtils_1.StringUtils.IsEmpty(this.M4e) &&
      (this.M4e =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityForeverTip",
        )),
      StringUtils_1.StringUtils.IsEmpty(this.S4e) &&
        ((i =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ActiveClose",
          )),
        (this.S4e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i))),
      StringUtils_1.StringUtils.IsEmpty(this.E4e) &&
        (this.E4e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityClosePanelTime",
        )),
      StringUtils_1.StringUtils.IsEmpty(this.y4e) &&
        (this.y4e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityRemainingTime",
        )),
      (this.ActivityBaseData = e),
      this.OnSetData();
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
    var e = this.ActivityBaseData.CheckIfInShowTime(),
      i = this.ActivityBaseData.CheckIfInOpenTime();
    if (!i && !e) return [!1, this.S4e];
    var t,
      e = this.ActivityBaseData.EndOpenTime,
      s = this.ActivityBaseData.EndShowTime;
    let n = "",
      r = !0,
      a = 0;
    return (
      0 === e && 0 === s
        ? ((t = this.ActivityBaseData.LocalConfig),
          (r = !!t && 1 === t.TimeIsDisplay),
          (n = this.M4e))
        : ((n =
            0 === this.ActivityBaseData.EndOpenTime
              ? ((a = s), this.E4e)
              : ((a = i ? e : s), i ? this.y4e : this.E4e)),
          (r = !0),
          (n = this.GetRemainTimeText(a, n) ?? "")),
      [r, n]
    );
  }
  GetRemainTimeText(e, i) {
    var t = TimeUtil_1.TimeUtil.GetServerTime(),
      e = Math.max(e - t, 1),
      t = this.FOe(e),
      e =
        TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, t[0], t[1])
          .CountDownText ?? "";
    return StringUtils_1.StringUtils.Format(i, e);
  }
  FOe(e) {
    return e > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : e > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 1]
        : e > CommonDefine_1.SECOND_PER_MINUTE
          ? [1, 0]
          : [0, 0];
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
