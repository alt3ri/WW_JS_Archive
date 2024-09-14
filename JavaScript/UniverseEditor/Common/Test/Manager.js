"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getUseCaseTestManager =
    exports.getUnitTestProxy =
    exports.getUnitTestManager =
    exports.UnitTestProxy =
    exports.RunTestProxy =
    exports.TestManager =
      void 0);
const ColorDefine_1 = require("../Misc/ColorDefine"),
  File_1 = require("../Misc/File"),
  Log_1 = require("../Misc/Log"),
  Util_1 = require("../Misc/Util"),
  TestOp_1 = require("./TestOp"),
  UseCaseTestEvent_1 = require("./UseCaseTestEvent");
function scanFiles(e) {
  return (0, File_1.listFiles)(e, ".test.js", !0);
}
class TestManager {
  constructor(e, t) {
    (this.Name = e), (this.Dir = t);
  }
  get Context() {
    var e = (0, TestOp_1.getTestContext)(this.Name);
    return 0 === e.RootSuite.Cases.length && this.je(), e;
  }
  je() {
    var e = scanFiles(this.Dir),
      t = (0, File_1.getAbsolutePath)(__dirname);
    (0, TestOp_1.pushTestRunningContextName)(this.Name);
    for (const r of e) {
      var s = (0, File_1.getRelativePathToDir)(r, t);
      try {
        require(s), (0, Log_1.log)(`[${this.Name}] import test file: ` + s);
      } catch (e) {
        (0, Log_1.error)(
          `[${this.Name}] import test file ${s} failed: ${e}
` + e.stack,
        );
      }
    }
    (0, TestOp_1.popTestRunningContextName)();
  }
  async RunAllTests() {
    var e = new TestOp_1.TestFilter();
    return (
      TestOp_1.TestOp.AddTestToFilter(this.Context.RootSuite, e),
      this.RunTests(e)
    );
  }
  async RunTests(e) {
    var t = this.Context["RootSuite"],
      s =
        ((0, TestOp_1.pushTestRunningContextName)(this.Name),
        new TestOp_1.TestResult());
    return (
      await TestOp_1.TestOp.RunSuite(this.Context, t, e, s),
      (0, TestOp_1.popTestRunningContextName)(),
      s
    );
  }
  async RunTestSuiteByName(e) {
    e = this.$e(e);
    return this.RunTests(e);
  }
  async RunTestByName(e) {
    var t = new TestOp_1.TestFilter();
    for (const r of e) {
      var s = this.Context.PickNode(r);
      s && TestOp_1.TestOp.AddTestToFilter(s, t);
    }
    return this.RunTests(t);
  }
  $e(e) {
    var t,
      s = this.Context.PickSuite(e);
    if (s)
      return (
        (t = new TestOp_1.TestFilter()),
        TestOp_1.TestOp.AddTestToFilter(s, t),
        t
      );
    throw new Error(`[${this.Name}] cannot find test suite: ` + e);
  }
  OutputTestResults(e) {
    var t = this.Context["RootSuite"],
      t =
        ((0, Log_1.log)(""),
        TestOp_1.TestOp.Output(t, e),
        TestOp_1.TestOp.GetSummary(t, e)),
      e =
        ((0, Log_1.log)(""),
        [
          `${(0, ColorDefine_1.cyan)("汇总")}: 总数: ${t.Total}, 成功: ${(0, ColorDefine_1.green)(t.Passed.toString())}, `,
        ]);
    0 < t.Failed &&
      e.push(`失败: ${(0, ColorDefine_1.red)(t.Failed.toString())}, `),
      e.push(`耗时: ${t.Time}ms`),
      (0, Log_1.log)(e.join("")),
      (0, Log_1.log)("");
  }
  GetTestReport(e) {
    var t = this.Context["RootSuite"];
    return TestOp_1.TestOp.GenTestReport(t, e);
  }
  GetResultSummary(e) {
    var t = this.Context["RootSuite"];
    return TestOp_1.TestOp.GetSummary(t, e);
  }
  OpenTestLine(e) {
    var t = this.Context["RootSuite"],
      t = TestOp_1.TestOp.FindNodeById(t, e);
    return (
      !!t &&
      !!t.FileLocation &&
      ((e = (0, File_1.joinPath)((0, File_1.getTsRoot)(), t.FileLocation)),
      (0, Util_1.exec)("code --goto " + e),
      !0)
    );
  }
}
exports.TestManager = TestManager;
class RunTestProxy {
  constructor(e, t) {
    (this.Type = t), (this.He = !1), (this.Manager = e);
  }
  set IsRunning(e) {
    (this.He = e),
      UseCaseTestEvent_1.useCaseTestEventDispatcher.Dispatch(
        "RunningStateChanged",
        e,
      );
  }
  get IsRunning() {
    return this.He;
  }
  async RunTestByNode(e) {
    e = this.CreateTestFilter(e);
    return this.RunTest(e.GetAllTestNames());
  }
  GetAllTestCasesByNode(e) {
    return this.CreateTestFilter(e).GetAllTestCases();
  }
  Qe(e, t) {
    if ("case" === e.Type) t.Add(e);
    else for (const s of e.Cases) this.Qe(s, t);
  }
  CreateTestFilter(e) {
    var t = new TestOp_1.TestFilter();
    return this.Qe(e, t), t;
  }
  We(e, t) {
    if ((t(e), "suite" === e.Type)) for (const s of e.Cases) this.We(s, t);
  }
  CreateTestFilterByNames(t) {
    const s = new TestOp_1.TestFilter();
    return (
      this.We(this.Manager.Context.RootSuite, (e) => {
        "case" === e.Type && t.includes(e.Name) && s.Add(e);
      }),
      s
    );
  }
  OnRelease() {}
}
class UnitTestProxy extends (exports.RunTestProxy = RunTestProxy) {
  IsUnitTest() {
    return !0;
  }
  async RunTest(e) {
    this.IsRunning = !0;
    var e = await this.Manager.RunTestByName(e),
      t = (this.Manager.OutputTestResults(e), this.Manager.GetTestReport(e)),
      e = this.Manager.GetResultSummary(e);
    return (this.IsRunning = !1), [t, e];
  }
}
exports.UnitTestProxy = UnitTestProxy;
let unitTestManager = void 0;
function getUnitTestManager() {
  return (unitTestManager =
    unitTestManager ||
    new TestManager(
      "UnitTest",
      (0, File_1.joinPath)((0, File_1.getJsRoot)(), "Tests/UnitTests"),
    ));
}
exports.getUnitTestManager = getUnitTestManager;
let unitTestProxy = void 0;
function getUnitTestProxy() {
  return (unitTestProxy =
    unitTestProxy || new UnitTestProxy(getUnitTestManager(), "UnitTest"));
}
exports.getUnitTestProxy = getUnitTestProxy;
let useCaseTestManager = void 0;
function getUseCaseTestManager() {
  return (useCaseTestManager =
    useCaseTestManager ||
    new TestManager(
      "UseCaseTest",
      (0, File_1.joinPath)((0, File_1.getJsRoot)(), "Tests/UsecaseTests"),
    ));
}
exports.getUseCaseTestManager = getUseCaseTestManager;
//# sourceMappingURL=Manager.js.map
