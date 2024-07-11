"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Log = exports.levelName = void 0);
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const LogDefine_1 = require("../Define/LogDefine");
const Info_1 = require("./Info");
const LogCaptureController_1 = require("./LogCaptureController");
const Time_1 = require("./Time");
const levelTrace =
  (UE.KuroStaticLibrary.IsBuildShipping() &&
    (cpp_1.KuroLoggingLibrary.RegisterTerminateDelegate(),
    cpp_1.KuroLoggingLibrary.PromoteGlobalLogVerbosity(4)),
  { 0: !0, 1: !1, 2: !1, 3: !1 });
const logProxy =
  ((exports.levelName = { 0: "E", 1: "W", 2: "I", 3: "D" }),
  {
    0: puerts_1.logger.error,
    1: puerts_1.logger.warn,
    2: puerts_1.logger.info,
    3: puerts_1.logger.log,
  });
const DEFAULT_SKIP_INDEX = 2;
class Log {
  static SetJsDebugId(r) {
    r && r.length > 0 && (Log.U8 = `(${r})`);
  }
  static Initialize() {}
  static InitStat(r) {
    (this.A8 = void 0),
      (this.P8 = void 0),
      (this.x8 = void 0),
      (this.w8 = void 0);
  }
  static SetLevel(r) {
    Log.B8 = r;
  }
  static CheckError() {
    return Log.B8 >= 0;
  }
  static CheckWarn() {
    return Log.B8 >= 1;
  }
  static CheckInfo() {
    return Log.B8 >= 2;
  }
  static CheckDebug() {
    return Log.B8 >= 3;
  }
  static Error(r, e, t, ...o) {
    Log.b8(0, r, e, t, o, levelTrace[0]);
  }
  static ErrorWithStack(r, e, t, o, ...i) {
    Log.b8(0, r, e, t, i, levelTrace[0], o);
  }
  static Warn(r, e, t, ...o) {
    Log.b8(1, r, e, t, o, levelTrace[1]);
  }
  static Info(r, e, t, ...o) {
    Log.b8(2, r, e, t, o, levelTrace[2]);
  }
  static Debug(r, e, t, ...o) {
    Log.b8(3, r, e, t, o, levelTrace[3]);
  }
  static b8(t, o, i, n, g, a, L) {
    if (((Log.o6 += 1), !(t > Log.B8))) {
      const [c, r] = LogDefine_1.logAuthorInfo[i];
      if (Log.q8 || r) {
        let r =
          `[${Log.o6}][${exports.levelName[t]}][${o}][${c}][${Time_1.Time.Frame}][${Log.ke()}] ` +
          n;
        const s = {};
        if (g.length > 0) {
          r += " ";
          for (const p of g) {
            const u = p[0];
            const l = Log.G8(p[1]);
            (s[u] = l), (r += `[${u}: ${l}]`);
          }
        }
        let e = void 0;
        (e = a ? Log.N8(L, L ? 0 : DEFAULT_SKIP_INDEX) : e) &&
          (r = (r += "\n") + e),
          Log.Delegate?.(Log.o6, t, o, i, n, s, e),
          logProxy[t](r),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            LogCaptureController_1.LogCaptureController.RegisterCapture[t] &&
            LogCaptureController_1.LogCaptureController.LogCapture(
              t,
              o,
              i,
              r,
              e ?? "",
            );
      }
    }
  }
  static ke() {
    const r = new Date();
    return (
      `${r.getHours()}.${r.getMinutes()}.${r.getSeconds()}:` +
      r.getMilliseconds()
    );
  }
  static O8(r) {
    try {
      return JSON.stringify(r, (r, e) => {
        if (void 0 === e) return "undefined";
        if (e === null) return "null";
        const t = typeof e;
        if (t == "bigint") return e.toString() + "n";
        if (t == "function") return e.toString();
        if (typeof e.ToString === "function") return e.ToString();
        if (e instanceof Set) {
          let r = "";
          for (const o of e)
            r.length === 0 ? (r += "Set(") : (r += ","),
              (r += JSON.stringify(o));
          return (r += ")");
        }
        if (e instanceof Map) {
          let r = "";
          for (const i of e)
            r.length === 0 ? (r += "Map(") : (r += ","),
              (r += `[${JSON.stringify(i[0])}, ${JSON.stringify(i[1])}]`);
          return (r += ")");
        }
        return e;
      });
    } catch (r) {
      r instanceof Error
        ? Log.CheckError() &&
          Log.ErrorWithStack("Log", 1, "Log 序列化异常", r, [
            "error",
            r.message,
          ])
        : Log.CheckError() &&
          Log.Error("Log", 1, "Log 序列化异常", ["error", r]);
    }
  }
  static G8(r) {
    return void 0 === r
      ? "undefined"
      : r === null
        ? "null"
        : typeof r === "string"
          ? r
          : Log.k8 && typeof r === "object"
            ? Log.O8(r) ?? ""
            : r.toString();
  }
  static N8(o, i) {
    const r = Error.prepareStackTrace;
    Error.prepareStackTrace = Log.F8;
    let n = void 0;
    if (
      (o
        ? (n = o.stack)
        : (Error.captureStackTrace(Log.V8, Log.N8),
          (n = Log.V8.stack),
          (Log.V8.stack = void 0)),
      (Error.prepareStackTrace = r),
      n && Array.isArray(n))
    ) {
      let e = "";
      let t = "";
      for (let r = i; r < n.length; ++r) {
        var g;
        var a;
        var L;
        var c;
        let s = n[r];
        s &&
          ((g =
            ((g = s.getTypeName()) ? g + "." : "") +
            (s.getFunctionName() ?? "")),
          (c = s.getFileName() ?? void 0),
          (a = s.getLineNumber() ?? -1),
          (s = s.getColumnNumber() ?? -1),
          (L = Log.H8(c, "JavaScript", 1)),
          (e += `	${g} (${L}:${a}:${s})
`),
          puerts_1.convertSourceMap) &&
          c &&
          c.length !== 0 &&
          ((L = (0, puerts_1.convertSourceMap)(c + ".map", a, s))
            ? ((c = Log.H8(L.source, "Src", 1)),
              (t += `	${g} (${c}:${L.line}:${L.column})
`))
            : (t += "\tconvert source map fail\n"));
      }
      let r = `JS 堆栈${Log.U8}:
`;
      return (
        (r += e),
        t.length > 0 && (r = (r += "TS 堆栈:a\n") + t),
        (r =
          UE.KuroStaticLibrary.GetBlueprintCallstack &&
          (o = UE.KuroStaticLibrary.GetBlueprintCallstack()) &&
          o.length > 0
            ? r + "BP 堆栈:\n" + o
            : r)
      );
    }
  }

  static H8(r, e, t) {
    let o;
    return r && r.length !== 0
      ? (o = r.indexOf(e)) > 0
        ? r.substring(o + e.length + t)
        : r
      : "unknown";
  }
  static GenLogId() {
    return ++Log.o6;
  }
}
((exports.Log = Log).B8 = 3),
  (Log.k8 = !0),
  (Log.q8 = !1),
  (Log.o6 = 0),
  (Log.Delegate = void 0),
  (Log.A8 = void 0),
  (Log.P8 = void 0),
  (Log.x8 = void 0),
  (Log.w8 = void 0),
  (Log.U8 = ""),
  (Log.F8 = (r, e) => e),
  (Log.V8 = { stack: void 0 });
// # sourceMappingURL=Log.js.map
