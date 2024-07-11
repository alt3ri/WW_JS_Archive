"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TestOp =
    exports.TestFilter =
    exports.TestResult =
    exports.TestContext =
    exports.logTestMsg =
    exports.enableTestLog =
    exports.TEST_LOG_TAG =
      void 0);
const ColorDefine_1 = require("../Misc/ColorDefine"),
  Log_1 = require("../Misc/Log"),
  DEFAULT_TIMEOUT = 3e3;
let isEnableTestLog = !(exports.TEST_LOG_TAG = "[UniverseTestCase]");
function enableTestLog(t) {
  isEnableTestLog = t;
}
function logTestMsg(t) {
  isEnableTestLog && (0, Log_1.log)(exports.TEST_LOG_TAG + " " + t);
}
(exports.enableTestLog = enableTestLog), (exports.logTestMsg = logTestMsg);
class TestContext {
  constructor() {
    (this.ze = []),
      (this.Ze = 0),
      (this.RootSuite = {
        Type: "suite",
        Name: "root",
        Id: 0,
        Cases: [],
        FileLocation: "",
        RunTime: 0,
        Run: async () => {},
      }),
      this.ze.push(this.RootSuite);
  }
  static get Current() {
    return TestContext.et;
  }
  static set Current(t) {
    TestContext.et = t;
  }
  get CurrentSuite() {
    return this.ze[this.ze.length - 1];
  }
  get CurrentTest() {
    if (this.tt) return this.tt;
    throw new Error("current test case is undefined");
  }
  set CurrentTest(t) {
    this.tt = t;
  }
  GenerateNodeId() {
    return (this.Ze += 1), this.Ze;
  }
  PushSuite(t) {
    if (0 === this.ze.length) throw new Error("suite stack is empty");
    this.ze[this.ze.length - 1].Cases.push(t), this.ze.push(t);
  }
  PopSuite() {
    if (0 === this.ze.length) throw new Error("suite stack is empty");
    this.ze.pop(), (this.tt = void 0);
  }
  PickSuite(t) {
    var e = this.ot(this.RootSuite, t);
    if (e) return e;
    throw new Error(`suite ${t} not found`);
  }
  PickNode(t, e) {
    e = e ?? this.RootSuite;
    if (e.Name === t) return e;
    if ("case" !== e.Type)
      for (const r of e.Cases) {
        var s = this.PickNode(t, r);
        if (s) return s;
      }
  }
  ot(t, e) {
    if (t.Name === e) return t;
    for (const r of t.Cases)
      if ("suite" === r.Type) {
        var s = this.ot(r, e);
        if (s) return s;
      }
  }
}
function beatifyError(t, e) {
  return (t.message?.split("\n") ?? []).map((t) => "" + e + t).join("\n");
}
exports.TestContext = TestContext;
class TestResult {
  constructor() {
    this.nt = new Map();
  }
  Get(t) {
    return this.nt.get(t);
  }
  Gen(t) {
    var e = { Id: t, Result: !1, RunTime: 0 };
    return this.nt.set(t, e), e;
  }
  ContainsAny(t) {
    return "case" === t.Type
      ? this.nt.has(t.Id)
      : t.Cases.some((t) =>
          "suite" === t.Type ? this.ContainsAny(t) : this.nt.has(t.Id),
        );
  }
}
exports.TestResult = TestResult;
class TestFilter {
  constructor() {
    this.rt = new Map();
  }
  Add(t) {
    this.rt.has(t.Id) || this.rt.set(t.Id, t);
  }
  Contains(t) {
    return "case" === t.Type
      ? this.rt.has(t.Id)
      : t.Cases.some((t) =>
          "suite" === t.Type ? this.Contains(t) : this.rt.has(t.Id),
        );
  }
  GetAllTestNames() {
    return Array.from(this.rt.values()).map((t) => t.Name);
  }
  Clear() {
    this.rt.clear();
  }
}
exports.TestFilter = TestFilter;
class TestOp {
  static GetSummary(t, e) {
    var s = { Total: 0, Passed: 0, Failed: 0, Time: 0 };
    return TestOp.st(t, s, e), s;
  }
  static st(t, e, s) {
    var r;
    "case" === t.Type
      ? (r = s.Get(t.Id)) &&
        ((e.Total += 1),
        r.Result ? (e.Passed += 1) : (e.Failed += 1),
        (e.Time += r.RunTime))
      : t.Cases.forEach((t) => {
          TestOp.st(t, e, s);
        });
  }
  static Output(t, e, s = "") {
    if (e.ContainsAny(t)) {
      var r;
      if ("case" === t.Type)
        return (r = e.Get(t.Id))
          ? ((0, Log_1.log)(
              `${s}[${(0, ColorDefine_1.blue)(t.Name)}] ${r.Result ? (0, ColorDefine_1.green)("OK") : (0, ColorDefine_1.red)("FAIL")} ${r.RunTime}ms ` +
                t.FileLocation,
            ),
            void (
              !r.Result &&
              r.Error &&
              (0, Log_1.log)(beatifyError(r.Error, s + "  "))
            ))
          : void 0;
      (0, Log_1.log)(`${s}# ${(0, ColorDefine_1.cyan)(t.Name)} ${t.RunTime}ms`),
        t.Cases.forEach((t) => {
          TestOp.Output(t, e, s + "  ");
        });
    }
  }
  static GenTestReport(t, e) {
    if (e.ContainsAny(t)) {
      var s;
      if ("case" === t.Type)
        return (s = e.Get(t.Id))
          ? {
              Name: t.Name,
              File: t.FileLocation,
              RunTime: s.RunTime,
              ErrorMsg: s.Error ? beatifyError(s.Error, "") : void 0,
            }
          : void 0;
      const r = { Name: t.Name, File: t.FileLocation, RunTime: t.RunTime };
      return (
        t.Cases.forEach((t) => {
          t = TestOp.GenTestReport(t, e);
          t && (r.SubReports || (r.SubReports = []), r.SubReports.push(t));
        }),
        r
      );
    }
  }
  static async RunSuite(t, e, s) {
    if (e.Contains(t)) {
      var r,
        i = Date.now();
      await t.BeforeAll?.();
      for (const o of t.Cases)
        "suite" === o.Type
          ? await TestOp.RunSuite(o, e, s)
          : e.Contains(o) && ((r = s.Gen(o.Id)), await this.RunCase(t, o, r));
      await t.AfterAll?.(), (t.RunTime = Date.now() - i);
    }
  }
  static async lt(e, t, s) {
    let r = !1,
      i = !1;
    var o = Date.now();
    try {
      await e.BeforeEach?.(),
        (r = !0),
        await t.Run(),
        await e.AfterEach?.(),
        (i = !0),
        (s.Result = !0),
        (s.RunTime = Date.now() - o);
    } catch (t) {
      (s.RunTime = Date.now() - o),
        (s.Result = !1),
        (s.Error = t),
        r && !i && (await e.AfterEach?.());
    }
  }
  static async RunCase(r, i, o) {
    return (
      logTestMsg("开始运行测试用例: " + i.Name),
      new Promise((e) => {
        const t =
            (TestContext.Current.CurrentTest = i).TimeOut ?? DEFAULT_TIMEOUT,
          s = setTimeout(() => {
            (o.Result = !1),
              (o.Error = new Error(
                `Reason: timeout for ${t} ms
File  : ` + i.FileLocation,
              )),
              e();
          }, i.TimeOut ?? DEFAULT_TIMEOUT);
        this.lt(r, i, o)
          .then(() => {
            logTestMsg("测试用例运行结束: " + i.Name), clearTimeout(s), e();
          })
          .catch((t) => {
            clearTimeout(s), (0, Log_1.log)("RunCaseAsync failed: " + t), e();
          });
      })
    );
  }
  static FindNodeById(t, e) {
    if (t.Id === e) return t;
    if ("suite" === t.Type)
      for (const r of t.Cases) {
        var s = TestOp.FindNodeById(r, e);
        if (s) return s;
      }
  }
  static AddTestToFilter(t, e) {
    "case" === t.Type
      ? e.Add(t)
      : t.Cases.forEach((t) => {
          TestOp.AddTestToFilter(t, e);
        });
  }
}
exports.TestOp = TestOp;
//# sourceMappingURL=TestOp.js.map
