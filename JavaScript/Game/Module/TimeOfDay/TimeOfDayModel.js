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
          Log_1.Log.Error("TimeOfDay", 17, "获取时间流速比错误"),
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
    var i = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR),
      e = Math.floor(
        (e - i * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
          TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
      );
    return ("0" + i).slice(-2) + ":" + ("0" + e).slice(-2);
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
  static ConvertFromHourMinute(e, i) {
    return (
      e * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR +
      i * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE
    );
  }
  static CheckInMinuteSpan(e, i) {
    if (!(e < 0 || e > TimeOfDayDefine_1.TOD_MINUTE_PER_DAY)) {
      var t = i[0],
        i = i[1];
      if (t < i) {
        if (t <= e && e < i) return !0;
      } else if (t <= e || e < i) return !0;
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
      (this.TimeRunLockState = !1),
      (this.TimeSynLockState = !1);
  }
  get GameTime() {
    return this.RTo;
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
    var i = new Array(),
      t = ConfigManager_1.ConfigManager.TimeOfDayConfig.GetTimePresets();
    let r = 0;
    var n,
      a = this.GameTime.Second,
      s =
        ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayTimeChangePresets();
    for (let e = 0; e < s.length; e++)
      for (var [o] of t)
        (0 === s[e].ChangeDayNum && a > o) ||
          (((n = new TimeOfDaySecondItem_1.TimeOfDaySecondItemSt()).Id = r),
          (n.ChangeDayIndex = e),
          (n.SetTime = o),
          (n.ShowName = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            s[e].Title,
          )),
          i.push(n),
          r++);
    return i;
  }
  SetCurrentDay(e) {
    this.wTo !== e &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TimeOfDay", 28, "日期调整"),
      (this.wTo = e);
  }
  GetCurrentDay() {
    return this.wTo;
  }
}
exports.TimeOfDayModel = TimeOfDayModel;
//# sourceMappingURL=TimeOfDayModel.js.map
