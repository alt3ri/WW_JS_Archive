"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getCurrentTestRunningContextName =
    exports.popTestRunningContextName =
    exports.pushTestRunningContextName =
    exports.getTestContext =
    exports.TestOp =
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
      for (const i of e.Cases) {
        var s = this.PickNode(t, i);
        if (s) return s;
      }
  }
  ot(t, e) {
    if (t.Name === e) return t;
    for (const i of t.Cases)
      if ("suite" === i.Type) {
        var s = this.ot(i, e);
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
    var i;
    "case" === t.Type
      ? (i = s.Get(t.Id)) &&
        ((e.Total += 1),
        i.Result ? (e.Passed += 1) : (e.Failed += 1),
        (e.Time += i.RunTime))
      : t.Cases.forEach((t) => {
          TestOp.st(t, e, s);
        });
  }
  static Output(t, e, s = "") {
    if (e.ContainsAny(t)) {
      var i;
      if ("case" === t.Type)
        return (i = e.Get(t.Id))
          ? ((0, Log_1.log)(
              `${s}[${(0, ColorDefine_1.blue)(t.Name)}] ${i.Result ? (0, ColorDefine_1.green)("OK") : (0, ColorDefine_1.red)("FAIL")} ${i.RunTime}ms ` +
                t.FileLocation,
            ),
            void (
              !i.Result &&
              i.Error &&
              (0, Log_1.log)(beatifyError(i.Error, s + "  "))
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
      const i = { Name: t.Name, File: t.FileLocation, RunTime: t.RunTime };
      return (
        t.Cases.forEach((t) => {
          t = TestOp.GenTestReport(t, e);
          t && (i.SubReports || (i.SubReports = []), i.SubReports.push(t));
        }),
        i
      );
    }
  }
  static async RunSuite(t, e, s, i) {
    if (s.Contains(e)) {
      var r,
        n = Date.now();
      await e.BeforeAll?.();
      for (const o of e.Cases)
        "suite" === o.Type
          ? await TestOp.RunSuite(t, o, s, i)
          : s.Contains(o) &&
            ((r = i.Gen(o.Id)), await this.RunCase(t, e, o, r));
      await e.AfterAll?.(), (e.RunTime = Date.now() - n);
    }
  }
  static async lt(e, t, s) {
    let i = !1,
      r = !1;
    var n = Date.now();
    try {
      await e.BeforeEach?.(),
        (i = !0),
        await t.Run(),
        await e.AfterEach?.(),
        (r = !0),
        (s.Result = !0),
        (s.RunTime = Date.now() - n);
    } catch (t) {
      (s.RunTime = Date.now() - n),
        (s.Result = !1),
        (s.Error = t),
        i && !r && (await e.AfterEach?.());
    }
  }
  static async RunCase(i, r, n, o) {
    return (
      logTestMsg("开始运行测试用例: " + n.Name),
      new Promise((e) => {
        const t = (i.CurrentTest = n).TimeOut ?? DEFAULT_TIMEOUT,
          s = setTimeout(() => {
            (o.Result = !1),
              (o.Error = new Error(
                `Reason: timeout for ${t} ms
File  : ` + n.FileLocation,
              )),
              e();
          }, n.TimeOut ?? DEFAULT_TIMEOUT);
        this.lt(r, n, o)
          .then(() => {
            logTestMsg("测试用例运行结束: " + n.Name), clearTimeout(s), e();
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
      for (const i of t.Cases) {
        var s = TestOp.FindNodeById(i, e);
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
const contextMap = new Map();
function getTestContext(t) {
  let e = contextMap.get(t);
  return e || ((e = new TestContext()), contextMap.set(t, e)), e;
}
exports.getTestContext = getTestContext;
const testRunningContextStack = [];
function pushTestRunningContextName(t) {
  testRunningContextStack.push(t);
}
function popTestRunningContextName() {
  testRunningContextStack.pop();
}
function getCurrentTestRunningContextName() {
  if (0 !== testRunningContextStack.length)
    return testRunningContextStack[testRunningContextStack.length - 1];
}
(exports.pushTestRunningContextName = pushTestRunningContextName),
  (exports.popTestRunningContextName = popTestRunningContextName),
  (exports.getCurrentTestRunningContextName = getCurrentTestRunningContextName);
//# sourceMappingURL=TestOp.js.map
