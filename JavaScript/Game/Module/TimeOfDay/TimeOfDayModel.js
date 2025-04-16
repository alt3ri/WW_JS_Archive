"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeOfDayModel = exports.TodDayTime = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  TimeOfDayDefine_1 = require("./TimeOfDayDefine"),
  TimeOfDaySecondItem_1 = require("./Views/TimeOfDaySecondItem");
class TodDayTime {
  constructor() {
    this.LTo = 0;
  }
  static get dBi() {
    return (
      this.DTo ||
        (this.DTo = ConfigManager_1.ConfigManager.TimeOfDayConfig.GetRate()),
      this.DTo
    );
  }
  get Second() {
    return this.LTo;
  }
  set Second(e) {
    this.LTo = TodDayTime.ConvertToOneDaySecond(e);
  }
  get DayState() {
    return ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayStateByGameTimeMinute(
      this.Minute,
    );
  }
  get Hour() {
    return this.Minute / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR;
  }
  get Minute() {
    return this.Second / TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
  }
  get HourMinuteString() {
    return TodDayTime.ConvertToHourMinuteString(this.Second);
  }
  static ConvertFromRealTimeSecond(e) {
    return TodDayTime.dBi
      ? (e * TodDayTime.dBi) / TimeOfDayDefine_1.TOD_RATE_RATIO
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("TimeOfDay", 16, "获取时间流速比错误"),
        0);
  }
  static ConvertToDayState(e) {
    return ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayStateByGameTimeMinute(
      TodDayTime.ConvertToMinute(e),
    );
  }
  static ConvertToOneDaySecond(e) {
    return e < 0 ? 0 : e % TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
  }
  static ConvertToHourMinuteString(e) {
    var t = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR),
      e = Math.floor(
        (e - t * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
          TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
      );
    return ("0" + t).slice(-2) + ":" + ("0" + e).slice(-2);
  }
  static ConvertToDay(e) {
    return e / TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
  }
  static ConvertToHour(e) {
    return e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR;
  }
  static ConvertToMinute(e) {
    return e / TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
  }
  static ConvertFromMinute(e) {
    return e * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
  }
  static ConvertFromHourMinute(e, t) {
    return (
      e * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR +
      t * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE
    );
  }
  static CheckInMinuteSpan(e, t) {
    if (!(e < 0 || e > TimeOfDayDefine_1.TOD_MINUTE_PER_DAY)) {
      var i = t[0],
        t = t[1];
      if (i < t) {
        if (i <= e && e < t) return !0;
      } else if (i <= e || e < t) return !0;
    }
    return !1;
  }
}
(exports.TodDayTime = TodDayTime).DTo = 0;
class TimeOfDayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.RTo = new TodDayTime()),
      (this.UTo = 0),
      (this.ATo = 1),
      (this.PTo = 1),
      (this.FreezeTimeScale = !1),
      (this.PlayerAccount = void 0),
      (this.CurrentSelectTimeItemSt = void 0),
      (this.xTo = 0),
      (this.wTo = 0),
      (this.BTo = 0),
      (this.nL1 = !1),
      (this.TimeRunLockStateClient = !1),
      (this.TimeRunLockStateServer = !1),
      (this.TimeSyncLockStateClient = !1),
      (this.TimeSyncLockStateServer = !1);
  }
  get GameTime() {
    return this.RTo;
  }
  get TimeRunLockState() {
    return this.nL1 ? this.TimeRunLockStateClient : this.TimeRunLockStateServer;
  }
  get TimeSynLockState() {
    return this.nL1
      ? this.TimeSyncLockStateClient
      : this.TimeSyncLockStateServer;
  }
  GetPassSceneTime() {
    return this.BTo;
  }
  SetPassSceneTime(e) {
    this.BTo = e;
  }
  get OldTimeScale() {
    return this.PTo;
  }
  get TimeScale() {
    return this.ATo;
  }
  set TimeScale(e) {
    this.FreezeTimeScale || e < 0 || ((this.PTo = this.ATo), (this.ATo = e));
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  CacheTimeRecords() {
    (this.xTo = this.GameTime.Second), (this.UTo = Time_1.Time.Now);
  }
  CheckCanCacheRecord() {
    return (
      0 === this.UTo ||
      !(
        Time_1.Time.Now - this.UTo <
        TimeOfDayDefine_1.TOD_SAVE_CD_MINUTE *
          TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE *
          TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND
      )
    );
  }
  IsCurrentTimePassedNormally() {
    return 0 === this.xTo
      ? this.GameTime.Second >=
          TimeOfDayDefine_1.TOD_SECOND_PER_DAY -
            TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS
      : this.GameTime.Second < TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS
        ? this.xTo >=
            TimeOfDayDefine_1.TOD_SECOND_PER_DAY -
              TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS +
              this.GameTime.Second || this.xTo <= this.GameTime.Second
        : 0 < this.GameTime.Second - this.xTo &&
          this.GameTime.Second - this.xTo <
            TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS;
  }
  GetTimeOfDayShowData() {
    var t = new Array(),
      i = ConfigManager_1.ConfigManager.TimeOfDayConfig.GetTimePresets();
    let r = 0;
    var n,
      a = this.GameTime.Second,
      s =
        ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayTimeChangePresets();
    for (let e = 0; e < s.length; e++)
      for (var [o] of i)
        (0 === s[e].ChangeDayNum && a > o) ||
          (((n = new TimeOfDaySecondItem_1.TimeOfDaySecondItemSt()).Id = r),
          (n.ChangeDayIndex = e),
          (n.SetTime = o),
          (n.ShowName = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            s[e].Title,
          )),
          t.push(n),
          r++);
    return t;
  }
  SetCurrentDay(e) {
    this.wTo !== e &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TimeOfDay", 27, "日期调整"),
      (this.wTo = e);
  }
  GetCurrentDay() {
    return this.wTo;
  }
  SetUseClientLockState(e) {
    (this.nL1 = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("TimeOfDay", 26, "使用客户端时间锁定状态", [
          "enable",
          e,
        ]);
  }
}
exports.TimeOfDayModel = TimeOfDayModel;
//# sourceMappingURL=TimeOfDayModel.js.map
