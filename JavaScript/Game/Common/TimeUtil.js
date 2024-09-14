"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeUtil = void 0);
const Log_1 = require("../../Core/Common/Log"),
  Time_1 = require("../../Core/Common/Time"),
  CommonDefine_1 = require("../../Core/Define/CommonDefine"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  StringBuilder_1 = require("../../Core/Utils/StringBuilder"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../Manager/ConfigManager");
class TimeUtil {
  static Init(e) {
    this.Ode = e;
  }
  static GetServerTimeStamp() {
    return Time_1.Time.ServerTimeStamp;
  }
  static GetServerStopTimeStamp() {
    return Time_1.Time.ServerFlowTimeStamp;
  }
  static GetServerTime() {
    return Time_1.Time.ServerTimeStamp * this.Millisecond;
  }
  static SetServerTimeStamp(e) {
    Time_1.Time.SetServerTimeStamp(
      Number(MathUtils_1.MathUtils.LongToBigInt(e)),
    ),
      void 0 === this.kde && this.InitNextDayTimeStamp();
  }
  static Tick(e) {
    this.kde &&
      Time_1.Time.ServerTimeStamp >= this.kde &&
      this.InitNextDayTimeStamp();
  }
  static InitNextDayTimeStamp() {
    var e = new Date(Time_1.Time.ServerTimeStamp),
      e =
        (e.getHours() - this.CrossDayHour) * this.Hour +
        e.getMinutes() * this.Minute +
        e.getSeconds();
    this.kde =
      (this.OneDaySeconds - e) * this.InverseMillisecond +
      Time_1.Time.ServerTimeStamp +
      Math.random();
  }
  static GetNextDayTimeStamp() {
    return this.kde;
  }
  static SetTimeMillisecond(e) {
    return e * this.InverseMillisecond;
  }
  static SetTimeSecond(e) {
    return e / this.InverseMillisecond;
  }
  static DateFormat(e) {
    return (
      `${e.getFullYear()}.${e.getMonth() + 1}.${e.getDate()}-${e.getHours()}.${e.getMinutes()}.${e.getSeconds()}:` +
      e.getMilliseconds()
    );
  }
  static DateFormat2(e) {
    return (
      `${e.getFullYear()}-${(e.getMonth() + 1).toString().padStart(2, "0")}-${e.getDate().toString().padStart(2, "0")} ${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}:` +
      e.getSeconds().toString().padStart(2, "0")
    );
  }
  static DateFormat3(e) {
    return (
      `${e.getFullYear()}/${(e.getMonth() + 1).toString().padStart(2, "0")}/${e.getDate().toString().padStart(2, "0")} ${e.getHours().toString().padStart(2, "0")}:` +
      e.getMinutes().toString().padStart(2, "0")
    );
  }
  static DateFormat4(e) {
    return (
      `${e.getFullYear()}/${(e.getMonth() + 1).toString().padStart(2, "0")}/` +
      e.getDate().toString().padStart(2, "0")
    );
  }
  static DateFormat5(e) {
    return (
      `${e.getFullYear()}-${(e.getMonth() + 1).toString().padStart(2, "0")}-${e.getDate().toString().padStart(2, "0")} ${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}:${e.getSeconds().toString().padStart(2, "0")}.` +
      e.getMilliseconds()
    );
  }
  static GetServerUnixTime() {
    var e = new Date(Time_1.Time.ServerTimeStamp),
      e = new Date(
        e.getUTCFullYear(),
        e.getUTCMonth(),
        e.getUTCDate(),
        e.getUTCHours(),
        e.getUTCMinutes(),
        e.getUTCSeconds(),
      );
    return Math.round(e.getTime() * this.Millisecond);
  }
  static DateFormatString(e) {
    e = new Date(e * this.InverseMillisecond);
    return (
      e.getFullYear() +
      `/${e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : (e.getMonth() + 1).toString()}/${e.getDate() < 10 ? "0" + e.getDate() : e.getDate().toString()} ${e.getHours() < 10 ? "0" + e.getHours() : e.getHours().toString()}:${e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes().toString()}:` +
      (e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds().toString())
    );
  }
  static DateFormatString2(e) {
    e = new Date(e * this.InverseMillisecond);
    return (
      "" +
      e.getFullYear() +
      (e.getMonth() + 1 < 10
        ? "0" + (e.getMonth() + 1)
        : (e.getMonth() + 1).toString()) +
      (e.getDate() < 10 ? "0" + e.getDate() : e.getDate().toString()) +
      (e.getHours() < 10 ? "0" + e.getHours() : e.getHours().toString()) +
      (e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes().toString()) +
      (e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds().toString())
    );
  }
  static GetTimeString(e) {
    var t;
    return e < 0
      ? ""
      : ((t = (t = e % this.Minute) < 10 ? "0" + t : t.toString()),
        ((e = Math.floor(e / this.Minute)) < 10 ? "0" + e : e.toString()) +
          ":" +
          t);
  }
  static GetDataFromTimeStamp(e) {
    e = new Date(e * this.InverseMillisecond);
    return {
      Year: e.getFullYear().toString(),
      Month:
        e.getMonth() + 1 < 10
          ? "0" + (e.getMonth() + 1)
          : (e.getMonth() + 1).toString(),
      Day: e.getDate() < 10 ? "0" + e.getDate() : e.getDate().toString(),
      Hour: e.getHours() < 10 ? "0" + e.getHours() : e.getHours().toString(),
      Minute:
        e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes().toString(),
      Second:
        e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds().toString(),
    };
  }
  static CalculateDayGapBetweenNow(e, t) {
    var i = Time_1.Time.ServerTimeStamp / TimeUtil.InverseMillisecond,
      r = new Date(),
      a = new Date(e * TimeUtil.InverseMillisecond),
      i = t ? e - i : i - e,
      e =
        (i < 0 &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Mail", 28, "时间非法"),
        i / 86400);
    let n = e;
    return (
      e < 2 &&
        (n = t
          ? r.getMonth() < a.getMonth()
            ? 1
            : a.getDate() - r.getDate()
          : r.getMonth() > a.getMonth()
            ? 1
            : r.getDate() - a.getDate()),
      parseInt(n.toFixed(0))
    );
  }
  static CalculateDayTimeStampGapBetweenNow(e, t) {
    var i = Time_1.Time.ServerTimeStamp / TimeUtil.InverseMillisecond,
      t = t ? e - i : i - e;
    t < 0 && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Mail", 28, "时间非法");
    return Math.ceil(t / 86400);
  }
  static CalculateHourGapBetweenNow(e, t) {
    var i = TimeUtil.GetServerTimeStamp() / TimeUtil.InverseMillisecond,
      t = t ? e - i : i - e;
    t < 0 && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Mail", 28, "时间非法");
    return t / 3600;
  }
  static CalculateMinuteGapBetweenNow(e, t) {
    var i = Time_1.Time.ServerTimeStamp / TimeUtil.InverseMillisecond,
      t = t ? e - i : i - e;
    t < 0 && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Mail", 28, "时间非法");
    return t / 60;
  }
  static GetCoolDown(e) {
    let t = "";
    e = Math.floor(e);
    return e < 10 ? (t = t + "0" + e) : (t += "" + e), t;
  }
  static IsExceededServerTime(e) {
    return e >= TimeUtil.GetServerTime();
  }
  static CalculateRemainingTime(t, i = 1) {
    if (!(t <= 0)) {
      let e = 3;
      for (
        var r = {
          TimeValue: 0,
          RemainingTime: t + TimeUtil.TimeDeviation,
          TextId: CommonDefine_1.remainTimeTextId[i],
        };
        e >= i;

      ) {
        var a = TimeUtil.Fde[e](t);
        if (a)
          return (
            (r.TimeValue = a[0]),
            (r.TextId = CommonDefine_1.remainTimeTextId[e]),
            (r.RemainingTime = a[1] + TimeUtil.TimeDeviation),
            r
          );
        --e;
      }
      return r;
    }
  }
  static Vde(e, t, i, r) {
    if (e <= 0)
      return { CountDownText: void 0, RemainingTime: TimeUtil.TimeDeviation };
    var a = new StringBuilder_1.StringBuilder();
    let n = e,
      m = void 0;
    var o;
    (m = i ?? 3), (o = r ?? 1);
    let s = void 0;
    switch (t) {
      case 0:
        s = CommonDefine_1.remainTimeTextId;
        break;
      case 1:
        s = CommonDefine_1.remainTimeTextIdFormat2;
        break;
      default:
        s = CommonDefine_1.remainTimeTextId;
    }
    for (; m >= o; ) {
      var T = TimeUtil.Fde[m](n),
        u = this.Ode.GetTextById(s[m]),
        l = T ? T[0] : 0,
        u = StringUtils_1.StringUtils.Format(u, l.toString());
      (n = T ? T[1] : n), a.Append(u), --m;
    }
    return {
      CountDownText: a.ToString(),
      RemainingTime: n + TimeUtil.TimeDeviation,
    };
  }
  static GetCountDownData(e, t, i) {
    return TimeUtil.Vde(e, 0, t, i);
  }
  static GetCountDownDataFormat2(e, t, i) {
    return TimeUtil.Vde(e, 1, t, i);
  }
  static GetRemainTimeDataFormat(e) {
    var t = this.GetTimeTypeData(e);
    return 0 === t[0]
      ? {
          CountDownText:
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "NotEnoughOneHour",
            ),
          RemainingTime: e,
        }
      : this.GetCountDownDataFormat2(e, t[0], t[1]);
  }
  static GetTimeTypeData(e) {
    return e > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : e > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 2]
        : [0, 0];
  }
  static GetRemainTimeDataFormat3(e) {
    let t = [0, 0];
    return (
      e > CommonDefine_1.SECOND_PER_DAY
        ? (t = [3, 2])
        : e > CommonDefine_1.SECOND_PER_HOUR
          ? (t = [2, 1])
          : e > CommonDefine_1.SECOND_PER_MINUTE && (t = [1, 0]),
      TimeUtil.Vde(e, 1, t[0], t[1])
    );
  }
  static IsInTimeSpan(e, t) {
    var i = TimeUtil.GetServerTime();
    return e <= i && i <= t;
  }
  static GetCurrentCrossDayStamp() {
    var e = new Date();
    return (
      e.getHours() < TimeUtil.CrossDayHour && e.setDate(e.getDate() - 1),
      e.setHours(TimeUtil.CrossDayHour, 0, 0, 0),
      e.getTime()
    );
  }
}
((exports.TimeUtil = TimeUtil).OneDayHourCount = 24),
  (TimeUtil.Hour = 3600),
  (TimeUtil.Minute = 60),
  (TimeUtil.OneDaySeconds = 86400),
  (TimeUtil.Millisecond = 0.001),
  (TimeUtil.InverseMillisecond = 1e3),
  (TimeUtil.CrossDayHour = 4),
  (TimeUtil.TimeDeviation = 0.1),
  (TimeUtil.Fde = {
    [0]: (e) => {
      if (0 < e) return [(e = Math.floor(e)), e];
    },
    1: (e) => {
      if (e >= CommonDefine_1.SECOND_PER_MINUTE)
        return [
          (e - (e = e % CommonDefine_1.SECOND_PER_MINUTE)) /
            CommonDefine_1.SECOND_PER_MINUTE,
          e,
        ];
    },
    2: (e) => {
      if (e >= CommonDefine_1.SECOND_PER_HOUR)
        return [
          (e - (e = e % CommonDefine_1.SECOND_PER_HOUR)) /
            CommonDefine_1.SECOND_PER_HOUR,
          e,
        ];
    },
    3: (e) => {
      if (e >= CommonDefine_1.SECOND_PER_DAY)
        return [
          (e - (e = e % CommonDefine_1.SECOND_PER_DAY)) /
            CommonDefine_1.SECOND_PER_DAY,
          e,
        ];
    },
  });
//# sourceMappingURL=TimeUtil.js.map
