"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherLog = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  levelTrace = { [0]: !0, 1: !1, 2: !1, 3: !1 },
  levelName = { [0]: "E", 1: "W", 2: "I", 3: "D" },
  logProxy = {
    [0]: puerts_1.logger.error,
    1: puerts_1.logger.warn,
    2: puerts_1.logger.info,
    3: puerts_1.logger.log,
  },
  DEFAULT_SKIP_INDEX = 3;
class LauncherLog {
  static SetJsDebugId(r) {
    r && 0 < r.length && (LauncherLog.U8 = `(${r})`);
  }
  static SetLevel(r) {
    LauncherLog.B8 = r;
  }
  static CheckError() {
    return 0 <= LauncherLog.B8;
  }
  static CheckWarn() {
    return 1 <= LauncherLog.B8;
  }
  static CheckInfo() {
    return 2 <= LauncherLog.B8;
  }
  static CheckDebug() {
    return 3 <= LauncherLog.B8;
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
  static b8(t, a, n, o, c) {
    if (((LauncherLog.o6 += 1), !(t > LauncherLog.B8))) {
      let r =
        `[${LauncherLog.o6}][${levelName[t]}][Launcher][${LauncherLog.ke()}] ` +
        a;
      if (0 < n.length) {
        r += " ";
        for (const u of n) r += `[${u[0]}: ${LauncherLog.G8(u[1])}]`;
      }
      let e = void 0;
      (e = o ? LauncherLog.N8(c, c ? 0 : DEFAULT_SKIP_INDEX) : e) &&
        (r = (r += "\n") + e),
        logProxy[t](r);
    }
  }
  static ke() {
    var r = new Date();
    return (
      `${r.getHours()}.${r.getMinutes()}.${r.getSeconds()}:` +
      r.getMilliseconds()
    );
  }
  static BVa(r) {
    return JSON.stringify(r, this.bVa).replace(/"/g, "");
  }
  static O8(r) {
    try {
      return this.BVa(r);
    } catch (r) {
      r instanceof Error
        ? LauncherLog.ErrorWithStack("Log 序列化异常", r, ["error", r.message])
        : LauncherLog.Error("Log 序列化异常", ["error", r]);
    }
  }
  static G8(r) {
    return void 0 === r
      ? "undefined"
      : null === r
        ? "null"
        : "string" == typeof r
          ? r
          : LauncherLog.k8 && "object" == typeof r
            ? (LauncherLog.O8(r) ?? "")
            : r.toString();
  }
  static N8(a, n) {
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = LauncherLog.F8;
    let o = void 0;
    if (
      (a
        ? (o = a.stack)
        : (Error.captureStackTrace(LauncherLog.V8, LauncherLog.N8),
          (o = LauncherLog.V8.stack),
          (LauncherLog.V8.stack = void 0)),
      (Error.prepareStackTrace = r),
      o && Array.isArray(o))
    ) {
      let e = "",
        t = "";
      for (let r = n; r < o.length; ++r) {
        var c,
          u,
          L,
          i,
          g = o[r];
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
          0 !== i.length &&
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
        0 < t.length && (r = (r += "TS 堆栈:a\n") + t),
        (r =
          UE.KuroStaticLibrary.GetBlueprintCallstack &&
          (a = UE.KuroStaticLibrary.GetBlueprintCallstack()) &&
          0 < a.length
            ? r + "BP 堆栈:\n" + a
            : r)
      );
    }
  }
  static H8(r, e, t) {
    var a;
    return r && 0 !== r.length
      ? 0 < (a = r.indexOf(e))
        ? r.substring(a + e.length + t)
        : r
      : "unknown";
  }
}
(exports.LauncherLog = LauncherLog),
  ((_a = LauncherLog).B8 = 3),
  (LauncherLog.k8 = !0),
  (LauncherLog.o6 = 0),
  (LauncherLog.U8 = ""),
  (LauncherLog.bVa = (r, t) => {
    if (void 0 === t) return "undefined";
    if (null === t) return "null";
    var e = typeof t;
    if ("bigint" == e) return t.toString() + "n";
    if ("function" == e) return t.toString();
    if ("function" == typeof t.ToString) return t.ToString();
    if (t instanceof Set) {
      let r = "";
      for (const n of t)
        0 === r.length ? (r += "Set(") : (r += ","), (r += _a.BVa(n));
      return (r += ")");
    }
    if (t instanceof Map) {
      let r = "";
      for (const o of t)
        0 === r.length ? (r += "Map(") : (r += ","),
          (r += `[${_a.BVa(o[0])}, ${_a.BVa(o[1])}]`);
      return (r += ")");
    }
    if (t instanceof UE.TMap) {
      let e = "";
      for (let r = 0; r < t.Num(); r++) {
        0 === e.length ? (e += "TMap(") : (e += ",");
        var a = t.GetKey(r);
        e += `[${_a.BVa(a)}, ${_a.BVa(t.Get(a))}]`;
      }
      return (e += ")");
    }
    if (t instanceof UE.TArray) {
      let e = "";
      for (let r = 0; r < t.Num(); r++)
        0 === e.length ? (e += "TArray(") : (e += ","),
          (e += `[${_a.BVa(t.Get(r))}]`);
      return (e += ")");
    }
    if (t instanceof UE.TSet) {
      let e = "";
      for (let r = 0; r < t.Num(); r++)
        0 === e.length ? (e += "TSet(") : (e += ","),
          (e += `[${_a.BVa(t.Get(r))}]`);
      return (e += ")");
    }
    return t;
  }),
  (LauncherLog.F8 = (r, e) => e),
  (LauncherLog.V8 = { stack: void 0 });
//# sourceMappingURL=LauncherLog.js.map
