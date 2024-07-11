"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogAnalyzer = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  LogDefine_1 = require("../Define/LogDefine"),
  TimerSystem_1 = require("../Timer/TimerSystem"),
  Json_1 = require("./Json"),
  Log_1 = require("./Log"),
  Stats_1 = require("./Stats"),
  SHIPPING = cpp_1.FKuroUtilityForPuerts.IsBuildShipping() ? 1 : 0,
  IS_WITH_EDITOR = cpp_1.FKuroUtilityForPuerts.IsWithEditor() ? 1 : void 0,
  STATISTICS_INTERVAL = 6e5,
  STATISTICS_MESSAGE_ERRO_THRESHOLD = 0.01,
  STATISTICS_THRESHOLD = 10,
  STATISTICS_MODULE_TOP_NUM = 10,
  STATISTICS_ENGINE_CATEGORY_TOP_NUM = 10,
  STATISTICS_AUTHOR_TOP_NUM = 10,
  STATISTICS_MESSAGE_TOP_NUM = 10,
  REPORT_INTERVAL = 6e4,
  REPORT_LEVEL = 0,
  REPORT_NUM = 10,
  SIMPLIFY_REPORT_NUM = 100,
  SIMPLIFY_REPORT_MESSAGE_MAX_LENGTH = 100,
  REPLACE_BRANCH_WORD = "branch_";
class LogRecord extends Json_1.JsonObjBase {
  constructor(e, o, r, a, n, L, g, t, A, l, _) {
    if (
      (super(),
      (this.P4V = e),
      (this.Br = o),
      (this.PlayerId = r),
      (this.Id = a),
      (this.Level = n),
      (this.Module = L),
      (this.Category = g),
      (this.Author = t),
      (this.Msg = A),
      (this.Stack = _),
      (this.Sp = SHIPPING),
      (this.Ed = IS_WITH_EDITOR),
      (this.Context = {}),
      l)
    ) {
      let e = 0;
      for (const i in l) this.Context[e++] = { Key: i, Value: l[i] };
    }
  }
}
class CrashSightLogRecord extends Json_1.JsonObjBase {
  constructor(e, o, r, a, n, L, g, t) {
    if (
      (super(),
      (this.P4V = e),
      (this.PlayerId = o),
      (this.Level = r),
      (this.Module = a),
      (this.Category = n),
      (this.Author = L),
      (this.Msg = g),
      (this.Sp = SHIPPING),
      (this.Ed = IS_WITH_EDITOR),
      (this.Context = {}),
      t)
    ) {
      let e = 0;
      for (const A in t) this.Context[e++] = { Key: A, Value: t[A] };
    }
  }
}
class LogReportRecord extends Json_1.JsonObjBase {
  constructor(e, o, r, a, n) {
    super(),
      (this.PlayerId = e),
      (this.Num = o),
      (this.Detail = r),
      (this.P4V = a),
      (this.Br = n),
      (this.Sp = SHIPPING),
      (this.Ed = IS_WITH_EDITOR);
  }
}
class LogAnalyzer {
  static SetPlayerId(e) {
    LogAnalyzer.j8 = e;
  }
  static SetP4Version(e) {
    (LogAnalyzer.W8 = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Log", 3, "P4Version信息", [
          "P4Version",
          LogAnalyzer.W8,
        ]);
  }
  static GetP4Version(e) {
    return LogAnalyzer.W8;
  }
  static SetBranch(e) {
    let o = e;
    o?.startsWith(REPLACE_BRANCH_WORD) &&
      (o = o.substring(REPLACE_BRANCH_WORD.length)),
      (LogAnalyzer.$i = o),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Log", 3, "Branch信息", ["Branch", LogAnalyzer.$i]);
  }
  static GetBranch() {
    return LogAnalyzer.$i;
  }
  static Initialize(e, o) {
    LogAnalyzer.SetBranch(o),
      e &&
        (LogAnalyzer.K8(),
        LogAnalyzer.Q8(),
        (o = UE.KuroLogAnalyzerLibrary.Initialize(
          (2).valueOf(),
          (0, puerts_1.toManualReleaseDelegate)(LogAnalyzer.X8),
        )),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Log",
          3,
          "LogAnalyzer.Initialize",
          ["结果", o],
          ["Branch", LogAnalyzer.$i],
        );
  }
  static Clear() {
    var e = UE.KuroLogAnalyzerLibrary.Clear();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Log", 3, "LogAnalyzer.Clear", ["结果", e]);
  }
  static K8() {
    Log_1.Log.Delegate = LogAnalyzer.t6;
    var o = Object.keys(Log_1.levelName).length;
    for (let e = (LogAnalyzer.Y8.length = 0); e < o; ++e)
      LogAnalyzer.Y8.push(0);
    var r = Object.keys(LogDefine_1.logAuthorInfo).length;
    for (let e = (LogAnalyzer.J8.length = 0); e < r; ++e)
      LogAnalyzer.J8.push(0);
    LogAnalyzer.z8 && (LogAnalyzer.z8.Remove(), (LogAnalyzer.z8 = void 0));
    let h = 0;
    LogAnalyzer.z8 = TimerSystem_1.TimerSystem.Forever(
      (e) => {
        (h += 1),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Log",
              1,
              "日志级别统计",
              ["num", h],
              ["detail", LogAnalyzer.Y8],
            );
        var o = {};
        for (let e = 0; e < LogAnalyzer.Y8.length; ++e)
          (o[e] = LogAnalyzer.Y8[e]), (LogAnalyzer.Y8[e] = 0);
        LogAnalyzer.e9(
          "log_level_report",
          new LogReportRecord(LogAnalyzer.j8, h, o),
        );
        var r = new Array();
        for (const T of LogAnalyzer.t9)
          T[1] > STATISTICS_THRESHOLD && r.push(T);
        if ((LogAnalyzer.t9.clear(), 0 < r.length)) {
          r.sort((e, o) => o[1] - e[1]),
            (r.length = Math.min(r.length, STATISTICS_MODULE_TOP_NUM)),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Log",
                1,
                "模块输出统计",
                ["num", h],
                ["detail", r],
              );
          var a = {};
          for (const S of r) a[S[0]] = S[1];
          LogAnalyzer.e9(
            "log_module_report",
            new LogReportRecord(LogAnalyzer.j8, h, a),
          );
        }
        var n = new Array();
        for (const I of LogAnalyzer.i9)
          I[1] > STATISTICS_THRESHOLD && n.push(I);
        if ((LogAnalyzer.i9.clear(), 0 < n.length)) {
          n.sort((e, o) => o[1] - e[1]),
            (n.length = Math.min(n.length, STATISTICS_ENGINE_CATEGORY_TOP_NUM)),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Log",
                1,
                "Category输出统计",
                ["num", h],
                ["detail", n],
              );
          var L = {};
          for (const R of n) L[R[0].toString()] = R[1];
          LogAnalyzer.e9(
            "log_engine_category_report",
            new LogReportRecord(LogAnalyzer.j8, h, L),
          );
        }
        var g = new Array();
        for (let e = 0; e < LogAnalyzer.J8.length; ++e) {
          var t = LogAnalyzer.J8[e];
          t > STATISTICS_THRESHOLD &&
            g.push([LogDefine_1.logAuthorInfo[e][0], t]);
        }
        for (let e = 0; e < LogAnalyzer.J8.length; ++e) LogAnalyzer.J8[e] = 0;
        if (0 < g.length) {
          g.sort((e, o) => o[1] - e[1]),
            (g.length = Math.min(g.length, STATISTICS_AUTHOR_TOP_NUM)),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Log",
                1,
                "作者输出统计",
                ["num", h],
                ["detail", g],
              );
          var A = {};
          for (const E of g) A[E[0]] = E[1];
          LogAnalyzer.e9(
            "log_author_report",
            new LogReportRecord(LogAnalyzer.j8, h, A),
          );
        }
        var l = e * STATISTICS_MESSAGE_ERRO_THRESHOLD,
          _ = new Array(),
          i = new Array();
        for (const c of LogAnalyzer.o9) {
          var y = c[1];
          l < y ? _.push(c) : y > STATISTICS_THRESHOLD && i.push(c);
        }
        if (
          (LogAnalyzer.o9.clear(),
          0 < _.length &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Log",
              1,
              "日志输出过多",
              ["num", h],
              ["detail", _],
            ),
          0 < i.length)
        ) {
          i.sort((e, o) => o[1] - e[1]),
            (i.length = Math.min(i.length, STATISTICS_MESSAGE_TOP_NUM)),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Log",
                1,
                "日志输出统计",
                ["num", h],
                ["detail", i],
              );
          var s = {};
          for (let e = 0; e < i.length; ++e) {
            var z = i[e];
            s[e] = { Msg: z[0], Count: z[1] };
          }
          LogAnalyzer.e9(
            "log_message_report",
            new LogReportRecord(LogAnalyzer.j8, h, s),
          );
        }
      },
      STATISTICS_INTERVAL,
      1,
      void 0,
      "LogAnalyzer.StatisticsTimer",
      !1,
    );
  }
  static Q8() {
    LogAnalyzer.r9 && (LogAnalyzer.r9.Remove(), (LogAnalyzer.r9 = void 0));
    let a = 0;
    LogAnalyzer.r9 = TimerSystem_1.TimerSystem.Forever((e) => {
      if (((a += 1), (LogAnalyzer.Zm = 0) !== LogAnalyzer.s9.size)) {
        var o = {};
        let e = 0;
        for (const r of LogAnalyzer.s9) o[e++] = { Msg: r[0], Count: r[1] };
        LogAnalyzer.s9.clear(),
          LogAnalyzer.e9(
            "log_report",
            new LogReportRecord(
              LogAnalyzer.j8,
              a,
              o,
              LogAnalyzer.W8,
              LogAnalyzer.$i,
            ),
          );
      }
    }, REPORT_INTERVAL);
  }
  static A5(r, a, n, L, g, t, A, l, _, i) {
    LogAnalyzer.Y8[n] += 1;
    var o = LogAnalyzer.t9.get(L) ?? 0;
    if (
      (LogAnalyzer.t9.set(L, o + 1),
      (LogAnalyzer.J8[g] += 1),
      r
        ? ((o = LogAnalyzer.o9.get(A) ?? 0), LogAnalyzer.o9.set(A, o + 1))
        : ((o = LogAnalyzer.o9.get(t) ?? 0),
          LogAnalyzer.o9.set(t, o + 1),
          (o = LogAnalyzer.i9.get(i) ?? 0),
          LogAnalyzer.i9.set(i, o + 1)),
      !(n > REPORT_LEVEL))
    )
      if (LogAnalyzer.Zm < REPORT_NUM) {
        LogAnalyzer.Zm += 1;
        let e = A,
          o = l;
        r || A === t || ((e = t), ((o = {})[0] = A)),
          LogAnalyzer.e9(
            "log",
            new LogRecord(
              LogAnalyzer.W8,
              LogAnalyzer.$i,
              LogAnalyzer.j8,
              a,
              n,
              L,
              i?.toString(),
              LogDefine_1.logAuthorInfo[g][0],
              e,
              o,
              _,
            ),
          ),
          void LogAnalyzer.Kla(
            new CrashSightLogRecord(
              LogAnalyzer.W8,
              LogAnalyzer.j8,
              n,
              L,
              i?.toString(),
              LogDefine_1.logAuthorInfo[g][0],
              e,
              o,
            ),
            _,
          );
      } else if (LogAnalyzer.s9.size < SIMPLIFY_REPORT_NUM) {
        let e = void 0;
        e = r
          ? A.length > SIMPLIFY_REPORT_MESSAGE_MAX_LENGTH
            ? A.substring(0, SIMPLIFY_REPORT_MESSAGE_MAX_LENGTH)
            : A
          : t;
        o = LogAnalyzer.s9.get(e) ?? 0;
        LogAnalyzer.s9.set(e, o + 1);
      }
  }
  static e9(e, o) {
    o = Json_1.Json.Stringify(o);
    return !!o && (cpp_1.FThinkingAnalyticsForPuerts.Track(e, o), !0);
  }
  static Kla(e, o) {
    e = Json_1.Json.Stringify(e);
    return (
      !!e &&
      (cpp_1.FCrashSightProxy.ReportException(
        5,
        "Error",
        e,
        o ?? "",
        "",
        !0,
        !1,
        0,
      ),
      !0)
    );
  }
}
(exports.LogAnalyzer = LogAnalyzer),
  ((_a = LogAnalyzer).Y8 = new Array()),
  (LogAnalyzer.t9 = new Map()),
  (LogAnalyzer.i9 = new Map()),
  (LogAnalyzer.J8 = new Array()),
  (LogAnalyzer.o9 = new Map()),
  (LogAnalyzer.z8 = void 0),
  (LogAnalyzer.r9 = void 0),
  (LogAnalyzer.Zm = 0),
  (LogAnalyzer.s9 = new Map()),
  (LogAnalyzer.j8 = 0),
  (LogAnalyzer.W8 = void 0),
  (LogAnalyzer.$i = void 0),
  (LogAnalyzer.Z8 = void 0),
  (LogAnalyzer.n9 = void 0),
  (LogAnalyzer.a9 = void 0),
  (LogAnalyzer.h9 = void 0),
  (LogAnalyzer.Xla = void 0),
  (LogAnalyzer.t6 = (e, o, r, a, n, L, g) => {
    _a.A5(!0, e, o, r, a, void 0, n, L, g);
  }),
  (LogAnalyzer.X8 = (e, o, r, a) => {
    let n = 2;
    switch (o) {
      case 1:
      case 2:
        n = 0;
        break;
      case 3:
        n = 1;
        break;
      default:
        return;
    }
    LogAnalyzer.A5(
      !1,
      Log_1.Log.GenLogId(),
      n,
      "Engine",
      0,
      r,
      a,
      void 0,
      void 0,
      e,
    );
  });
//# sourceMappingURL=LogAnalyzer.js.map
