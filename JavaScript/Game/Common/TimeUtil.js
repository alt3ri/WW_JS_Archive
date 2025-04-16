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
  static Init(t) {
    this.Ode = t;
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
  static SetServerTimeStamp(t) {
    Time_1.Time.SetServerTimeStamp(
      Number(MathUtils_1.MathUtils.LongToBigInt(t)),
    ),
      this.InitNextDayTimeStamp();
  }
  static Tick(t) {
    this.kde &&
      Time_1.Time.ServerTimeStamp >= this.kde &&
      this.InitNextDayTimeStamp();
  }
  static InitNextDayTimeStamp() {
    var t = new Date(Time_1.Time.ServerTimeStamp);
    t.getHours() >= TimeUtil.CrossDayHour && t.setDate(t.getDate() + 1),
      t.setHours(TimeUtil.CrossDayHour, 0, 0, 0),
      (this.kde = t.getTime() + Math.random());
  }
  static GetNextDayTimeStamp() {
    return this.kde;
  }
  static SetTimeMillisecond(t) {
    return t * this.InverseMillisecond;
  }
  static SetTimeSecond(t) {
    return t / this.InverseMillisecond;
  }
  static DateFormat(t) {
    return (
      `${t.getFullYear()}.${t.getMonth() + 1}.${t.getDate()}-${t.getHours()}.${t.getMinutes()}.${t.getSeconds()}:` +
      t.getMilliseconds()
    );
  }
  static DateFormat2(t) {
    return (
      `${t.getFullYear()}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")} ${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}:` +
      t.getSeconds().toString().padStart(2, "0")
    );
  }
  static DateFormat3(t) {
    return (
      `${t.getFullYear()}/${(t.getMonth() + 1).toString().padStart(2, "0")}/${t.getDate().toString().padStart(2, "0")} ${t.getHours().toString().padStart(2, "0")}:` +
      t.getMinutes().toString().padStart(2, "0")
    );
  }
  static DateFormat4(t) {
    return (
      `${t.getFullYear()}/${(t.getMonth() + 1).toString().padStart(2, "0")}/` +
      t.getDate().toString().padStart(2, "0")
    );
  }
  static DateFormat4String(t) {
    t = new Date(t * this.InverseMillisecond);
    return this.DateFormat4(t);
  }
  static DateFormat5(t) {
    return (
      `${t.getFullYear()}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")} ${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}:${t.getSeconds().toString().padStart(2, "0")}.` +
      t.getMilliseconds()
    );
  }
  static DateFormat6String(t) {
    t = new Date(t);
    return (
      (t.getMonth() + 1).toString().padStart(2, "0") +
      "." +
      t.getDate().toString().padStart(2, "0")
    );
  }
  static DateFormat7String(t) {
    t = new Date(t);
    return (
      t.getHours().toString().padStart(2, "0") +
      ":" +
      t.getMinutes().toString().padStart(2, "0")
    );
  }
  static GetServerUnixTime() {
    var t = new Date(Time_1.Time.ServerTimeStamp),
      t = new Date(
        t.getUTCFullYear(),
        t.getUTCMonth(),
        t.getUTCDate(),
        t.getUTCHours(),
        t.getUTCMinutes(),
        t.getUTCSeconds(),
      );
    return Math.round(t.getTime() * this.Millisecond);
  }
  static DateFormatString(t) {
    t = new Date(t * this.InverseMillisecond);
    return (
      t.getFullYear() +
      `/${t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1).toString()}/${t.getDate() < 10 ? "0" + t.getDate() : t.getDate().toString()} ${t.getHours() < 10 ? "0" + t.getHours() : t.getHours().toString()}:${t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes().toString()}:` +
      (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds().toString())
    );
  }
  static DateFormatString2(t) {
    t = new Date(t * this.InverseMillisecond);
    return (
      "" +
      t.getFullYear() +
      (t.getMonth() + 1 < 10
        ? "0" + (t.getMonth() + 1)
        : (t.getMonth() + 1).toString()) +
      (t.getDate() < 10 ? "0" + t.getDate() : t.getDate().toString()) +
      (t.getHours() < 10 ? "0" + t.getHours() : t.getHours().toString()) +
      (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes().toString()) +
      (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds().toString())
    );
  }
  static GetTimeString(t) {
    var e;
    return t < 0
      ? ""
      : ((e = (e = t % this.Minute) < 10 ? "0" + e : e.toString()),
        ((t = Math.floor(t / this.Minute)) < 10 ? "0" + t : t.toString()) +
          ":" +
          e);
  }
  static GetDataFromTimeStamp(t) {
    t = new Date(t * this.InverseMillisecond);
    return {
      Year: t.getFullYear().toString(),
      Month:
        t.getMonth() + 1 < 10
          ? "0" + (t.getMonth() + 1)
          : (t.getMonth() + 1).toString(),
      Day: t.getDate() < 10 ? "0" + t.getDate() : t.getDate().toString(),
      Hour: t.getHours() < 10 ? "0" + t.getHours() : t.getHours().toString(),
      Minute:
        t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes().toString(),
      Second:
        t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds().toString(),
    };
  }
  static CalculateDayGapBetweenNow(t, e) {
    var i = Time_1.Time.ServerTimeStamp / TimeUtil.InverseMillisecond,
      r = new Date(),
      a = new Date(t * TimeUtil.InverseMillisecond),
      i = e ? t - i : i - t,
      t =
        (i < 0 &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Mail", 27, "时间非法"),
        i / 86400);
    let n = t;
    return (
      t < 2 &&
        (n = e
          ? r.getMonth() < a.getMonth()
            ? 1
            : a.getDate() - r.getDate()
          : r.getMonth() > a.getMonth()
            ? 1
            : r.getDate() - a.getDate()),
      parseInt(n.toFixed(0))
    );
  }
  static CalculateDayTimeStampGapBetweenNow(t, e) {
    var i = Time_1.Time.ServerTimeStamp / TimeUtil.InverseMillisecond,
      e = e ? t - i : i - t;
    e < 0 && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Mail", 27, "时间非法");
    return Math.floor(e / 86400);
  }
  static CalculateHourGapBetweenNow(t, e) {
    var i = TimeUtil.GetServerTimeStamp() / TimeUtil.InverseMillisecond,
      e = e ? t - i : i - t;
    e < 0 && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Mail", 27, "时间非法");
    return e / 3600;
  }
  static CalculateMinuteGapBetweenNow(t, e) {
    var i = Time_1.Time.ServerTimeStamp / TimeUtil.InverseMillisecond,
      e = e ? t - i : i - t;
    e < 0 && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Mail", 27, "时间非法");
    return e / 60;
  }
  static GetCoolDown(t) {
    let e = "";
    t = Math.floor(t);
    return t < 10 ? (e = e + "0" + t) : (e += "" + t), e;
  }
  static GetHoursFloat() {
    var t = new Date(Time_1.Time.ServerTimeStamp),
      e = t.getHours(),
      i = t.getMinutes(),
      t = t.getSeconds();
    return e + i / this.Minute + t / this.Hour;
  }
  static IsExceededServerTime(t) {
    return t >= TimeUtil.GetServerTime();
  }
  static CalculateRemainingTime(e, i = 1) {
    if (!(e <= 0)) {
      let t = 3;
      for (
        var r = {
          TimeValue: 0,
          RemainingTime: e + TimeUtil.TimeDeviation,
          TextId: CommonDefine_1.remainTimeTextId[i],
        };
        t >= i;

      ) {
        var a = TimeUtil.Fde[t](e);
        if (a)
          return (
            (r.TimeValue = a[0]),
            (r.TextId = CommonDefine_1.remainTimeTextId[t]),
            (r.RemainingTime = a[1] + TimeUtil.TimeDeviation),
            r
          );
        --t;
      }
      return r;
    }
  }
  static Vde(t, e, i, r) {
    if (t <= 0)
      return { CountDownText: void 0, RemainingTime: TimeUtil.TimeDeviation };
    var a = new StringBuilder_1.StringBuilder();
    let n = t,
      m = void 0;
    var o;
    (m = i ?? 3), (o = r ?? 1);
    let s = void 0;
    switch (e) {
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
  static GetCountDownData(t, e, i) {
    return TimeUtil.Vde(t, 0, e, i);
  }
  static GetCountDownDataFormat2(t, e, i) {
    return TimeUtil.Vde(t, 1, e, i);
  }
  static GetRemainTimeDataFormat(t) {
    var e = this.GetTimeTypeData(t);
    return 0 === e[0]
      ? {
          CountDownText:
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "NotEnoughOneHour",
            ),
          RemainingTime: t,
        }
      : this.GetCountDownDataFormat2(t, e[0], e[1]);
  }
  static GetTimeTypeData(t) {
    return t > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : t > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 2]
        : [0, 0];
  }
  static GetRemainTimeDataFormat3(t) {
    let e = [0, 0];
    return (
      t > CommonDefine_1.SECOND_PER_DAY
        ? (e = [3, 2])
        : t > CommonDefine_1.SECOND_PER_HOUR
          ? (e = [2, 1])
          : t > CommonDefine_1.SECOND_PER_MINUTE && (e = [1, 0]),
      TimeUtil.Vde(t, 1, e[0], e[1])
    );
  }
  static GetRemainTimeDataFormat4(t) {
    var e = [1, 1];
    return t < CommonDefine_1.SECOND_PER_MINUTE
      ? TimeUtil.Vde(CommonDefine_1.SECOND_PER_MINUTE, 1, e[0], e[1])
      : TimeUtil.Vde(t, 1, e[0], e[1]);
  }
  static IsInTimeSpan(t, e) {
    var i = TimeUtil.GetServerTime();
    return t <= i && i <= e;
  }
  static GetCurrentCrossDayStamp() {
    var t = new Date(Time_1.Time.ServerTimeStamp);
    return (
      t.getHours() < TimeUtil.CrossDayHour && t.setDate(t.getDate() - 1),
      t.setHours(TimeUtil.CrossDayHour, 0, 0, 0),
      t.getTime()
    );
  }
  static GetTimeDataFormat(t) {
    var e = new StringBuilder_1.StringBuilder(),
      i = Math.floor(t / 60),
      i = (e.Append(i.toString().padStart(2, "0")), e.Append(":"), t % 60);
    return e.Append(i.toString().padStart(2, "0")), e.ToString();
  }
}
((exports.TimeUtil = TimeUtil).OneDayHourCount = 24),
  (TimeUtil.Hour = 3600),
  (TimeUtil.Minute = 60),
  (TimeUtil.OneDaySeconds = 86400),
  (TimeUtil.Millisecond = 0.001),
  (TimeUtil.InverseMillisecond = 1e3),
  (TimeUtil.CrossDayHour = 4),
  (TimeUtil.kde = 0),
  (TimeUtil.TimeDeviation = 0.1),
  (TimeUtil.Fde = {
    [0]: (t) => {
      if (0 < t) return [(t = Math.floor(t)), t];
    },
    1: (t) => {
      if (t >= CommonDefine_1.SECOND_PER_MINUTE)
        return [
          (t - (t = t % CommonDefine_1.SECOND_PER_MINUTE)) /
            CommonDefine_1.SECOND_PER_MINUTE,
          t,
        ];
    },
    2: (t) => {
      if (t >= CommonDefine_1.SECOND_PER_HOUR)
        return [
          (t - (t = t % CommonDefine_1.SECOND_PER_HOUR)) /
            CommonDefine_1.SECOND_PER_HOUR,
          t,
        ];
    },
    3: (t) => {
      if (t >= CommonDefine_1.SECOND_PER_DAY)
        return [
          (t - (t = t % CommonDefine_1.SECOND_PER_DAY)) /
            CommonDefine_1.SECOND_PER_DAY,
          t,
        ];
    },
  });
//# sourceMappingURL=TimeUtil.js.map
