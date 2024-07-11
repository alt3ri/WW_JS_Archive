"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherLog = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const levelTrace = { 0: !0, 1: !1, 2: !1, 3: !1 };
const levelName = { 0: "E", 1: "W", 2: "I", 3: "D" };
const logProxy = {
  0: puerts_1.logger.error,
  1: puerts_1.logger.warn,
  2: puerts_1.logger.info,
  3: puerts_1.logger.log,
};
const DEFAULT_SKIP_INDEX = 3;
class LauncherLog {
  static SetJsDebugId(r) {
    r && r.length > 0 && (LauncherLog.U8 = `(${r})`);
  }
  static SetLevel(r) {
    LauncherLog.B8 = r;
  }
  static CheckError() {
    return LauncherLog.B8 >= 0;
  }
  static CheckWarn() {
    return LauncherLog.B8 >= 1;
  }
  static CheckInfo() {
    return LauncherLog.B8 >= 2;
  }
  static CheckDebug() {
    return LauncherLog.B8 >= 3;
  }
  static Error(r, ...e) {
    LauncherLog.b8(0, r, e, levelTrace[0]);
  }
  static ErrorWithStack(r, e, ...t) {
    LauncherLog.b8(0, r, t, levelTrace[0], e);
  }
  static Warn(r, ...e) {
    LauncherLog.b8(1, r, e, levelTrace[1]);
  }
  static Info(r, ...e) {
    LauncherLog.b8(2, r, e, levelTrace[2]);
  }
  static Debug(r, ...e) {
    LauncherLog.b8(3, r, e, levelTrace[3]);
  }
  static b8(t, n, a, o, c) {
    if (((LauncherLog.o6 += 1), !(t > LauncherLog.B8))) {
      let r =
        `[${LauncherLog.o6}][${levelName[t]}][Launcher][${LauncherLog.ke()}] ` +
        n;
      if (a.length > 0) {
        r += " ";
        for (const u of a) r += `[${u[0]}: ${LauncherLog.G8(u[1])}]`;
      }
      let e = void 0;
      (e = o ? LauncherLog.N8(c, c ? 0 : DEFAULT_SKIP_INDEX) : e) &&
        (r = (r += "\n") + e),
        logProxy[t](r);
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
          for (const n of e)
            r.length === 0 ? (r += "Set(") : (r += ","),
              (r += JSON.stringify(n));
          return (r += ")");
        }
        if (e instanceof Map) {
          let r = "";
          for (const a of e)
            r.length === 0 ? (r += "Map(") : (r += ","),
              (r += `[${JSON.stringify(a[0])}, ${JSON.stringify(a[1])}]`);
          return (r += ")");
        }
        return e;
      });
    } catch (r) {
      r instanceof Error
        ? LauncherLog.ErrorWithStack("Log 序列化异常", r, ["error", r.message])
        : LauncherLog.Error("Log 序列化异常", ["error", r]);
    }
  }
  static G8(r) {
    return void 0 === r
      ? "undefined"
      : r === null
        ? "null"
        : typeof r === "string"
          ? r
          : LauncherLog.k8 && typeof r === "object"
            ? LauncherLog.O8(r) ?? ""
            : r.toString();
  }
  static N8(n, a) {
    const r = Error.prepareStackTrace;
    Error.prepareStackTrace = LauncherLog.F8;
    let o = void 0;
    if (
      (n
        ? (o = n.stack)
        : (Error.captureStackTrace(LauncherLog.V8, LauncherLog.N8),
          (o = LauncherLog.V8.stack),
          (LauncherLog.V8.stack = void 0)),
      (Error.prepareStackTrace = r),
      o && Array.isArray(o))
    ) {
      let e = "";
      let t = "";
      for (let r = a; r < o.length; ++r) {
        var c;
        var u;
        var L;
        var i;
        let g = o[r];
        g &&
          ((c =
            ((c = g.getTypeName()) ? c + "." : "") +
            (g.getFunctionName() ?? "")),
          (i = g.getFileName() ?? void 0),
          (u = g.getLineNumber() ?? -1),
          (g = g.getColumnNumber() ?? -1),
          (L = LauncherLog.H8(i, "JavaScript", 1)),
          (e += `	${c} (${L}:${u}:${g})
`),
          puerts_1.convertSourceMap) &&
          i &&
          i.length !== 0 &&
          ((L = (0, puerts_1.convertSourceMap)(i + ".map", u, g))
            ? ((i = LauncherLog.H8(L.source, "Src", 1)),
              (t += `	${c} (${i}:${L.line}:${L.column})
`))
            : (t += "\tconvert source map fail\n"));
      }
      let r = `JS 堆栈 ${LauncherLog.U8}:
`;
      return (
        (r += e),
        t.length > 0 && (r = (r += "TS 堆栈:a\n") + t),
        (r =
          UE.KuroStaticLibrary.GetBlueprintCallstack &&
          (n = UE.KuroStaticLibrary.GetBlueprintCallstack()) &&
          n.length > 0
            ? r + "BP 堆栈:\n" + n
            : r)
      );
    }
  }

  static H8(r, e, t) {
    let n;
    return r && r.length !== 0
      ? (n = r.indexOf(e)) > 0
        ? r.substring(n + e.length + t)
        : r
      : "unknown";
  }
}
((exports.LauncherLog = LauncherLog).B8 = 3),
  (LauncherLog.k8 = !0),
  (LauncherLog.o6 = 0),
  (LauncherLog.U8 = ""),
  (LauncherLog.F8 = (r, e) => e),
  (LauncherLog.V8 = { stack: void 0 });
// # sourceMappingURL=LauncherLog.js.map
