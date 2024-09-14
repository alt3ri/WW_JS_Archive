"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.expect =
    exports.it =
    exports.describe =
    exports.afterAll =
    exports.beforeAll =
    exports.afterEach =
    exports.beforeEach =
      void 0);
const IUtil_1 = require("../../Interface/IUtil"),
  SouceMap_1 = require("../Misc/SouceMap"),
  TestOp_1 = require("./TestOp");
class Expect {
  constructor(t) {
    this.Xe = t;
  }
  get Je() {
    return (0, SouceMap_1.getCallerLocation)(2);
  }
  notToBe(t) {
    if (this.Xe === t)
      throw new Error(
        `Expect: ${JSON.stringify(t)}
Value : ${JSON.stringify(this.Xe)}
File  : ` + this.Je,
      );
  }
  toBe(t) {
    if (this.Xe !== t)
      throw new Error(
        `Expect: ${JSON.stringify(t)}
Value : ${JSON.stringify(this.Xe)}
File  : ` + this.Je,
      );
  }
  toEqual(t) {
    if (!(0, IUtil_1.deepEquals)(this.Xe, t))
      throw new Error(
        `Expect: ${JSON.stringify(t)}
Value : ${JSON.stringify(this.Xe)}
File  : ` + this.Je,
      );
  }
  notToEqual(t) {
    if ((0, IUtil_1.deepEquals)(this.Xe, t))
      throw new Error(
        `Expect: ${JSON.stringify(t)}
Value : ${JSON.stringify(this.Xe)}
File  : ` + this.Je,
      );
  }
  toBeLessThan(t) {
    if ("bigint" != typeof this.Xe && "number" != typeof this.Xe)
      throw new Error(
        `Reason: Value is not a number
File  : ` + this.Je,
      );
    if (this.Xe >= t)
      throw new Error(
        `Expect: Value < ${t}
Value : ${this.Xe}
File  : ` + this.Je,
      );
  }
  toBeLessThanOrEqual(t) {
    if ("bigint" != typeof this.Xe && "number" != typeof this.Xe)
      throw new Error(
        `Reason: Value is not a number
File  : ` + this.Je,
      );
    if (this.Xe > t)
      throw new Error(
        `Expect: Value <= ${t}
Value : ${this.Xe}
File  : ` + this.Je,
      );
  }
  toBeGreaterThan(t) {
    if ("bigint" != typeof this.Xe && "number" != typeof this.Xe)
      throw new Error(
        `Reason: Value is not a number
File  : ` + this.Je,
      );
    if (this.Xe <= t)
      throw new Error(
        `Expect: Value > ${t}
Value : ${this.Xe}
File  : ` + this.Je,
      );
  }
  toBeGreaterThanOrEqual(t) {
    if ("bigint" != typeof this.Xe && "number" != typeof this.Xe)
      throw new Error(
        `Reason: Value is not a number
File  : ` + this.Je,
      );
    if (this.Xe < t)
      throw new Error(
        `Expect: Value >= ${t}
Value : ${this.Xe}
File  : ` + this.Je,
      );
  }
  toBeCloseTo(t, e) {
    if ("number" != typeof this.Xe)
      throw new Error(
        `Reason: Value is not a number
File  : ` + this.Je,
      );
    if (Math.abs(this.Xe - t) > e)
      throw new Error(
        `Expect: Value is close to ${t} +/- ${e}
Value : ${this.Xe}
File  : ` + this.Je,
      );
  }
  toBeTruthy() {
    if (!this.Xe)
      throw new Error(
        `Reason: Value is not true
File  : ` + this.Je,
      );
  }
  toBeFalsy() {
    if (this.Xe)
      throw new Error(
        `Reason: Value is not false
File  : ` + this.Je,
      );
  }
  toBeUndefined() {
    if (void 0 !== this.Xe)
      throw new Error(
        `Reason: Value is not undefined
File  : ` + this.Je,
      );
  }
  toBeDefined() {
    if (void 0 === this.Xe)
      throw new Error(
        `Reason: Value is undefined
File  : ` + this.Je,
      );
  }
  toBeNull() {
    if (null !== this.Xe)
      throw new Error(
        `Reason: Value is not null
File  : ` + this.Je,
      );
  }
  Ye(t) {
    if ("function" != typeof this.Xe)
      throw new Error(
        `Reason: Value is not a function
File  : ` + this.Je,
      );
    let e = !1;
    var r = this.Xe;
    try {
      r();
    } catch (t) {
      e = !0;
    }
    if (e !== t)
      throw new Error(
        `Reason: ${t ? "not" : ""}throw error
File  : ` + this.Je,
      );
  }
  toThrowError() {
    this.Ye(!0);
  }
  toNotThrowError() {
    this.Ye(!1);
  }
  async Ke(t) {
    if ("function" != typeof this.Xe)
      throw new Error(
        `Reason: Value is not a function
File  : ` + this.Je,
      );
    let e = !1;
    var r = this.Xe;
    try {
      await r();
    } catch (t) {
      e = !0;
    }
    if (e !== t)
      throw new Error(
        `Reason: ${t ? "not" : ""}throw error
File  : ` + this.Je,
      );
  }
  async toThrowErrorA() {
    return this.Ke(!0);
  }
  async toNotThrowErrorA() {
    return this.Ke(!1);
  }
}
function getRunningContext() {
  var t = (0, TestOp_1.getCurrentTestRunningContextName)();
  if (t) return (0, TestOp_1.getTestContext)(t);
  throw new Error("contextName not found.");
}
function beforeEach(t) {
  getRunningContext().CurrentSuite.BeforeEach = t;
}
function afterEach(t) {
  getRunningContext().CurrentSuite.AfterEach = t;
}
function beforeAll(t) {
  getRunningContext().CurrentSuite.BeforeAll = t;
}
function afterAll(t) {
  getRunningContext().CurrentSuite.AfterAll = t;
}
function describe(t, e) {
  t = {
    Type: "suite",
    Name: t,
    Id: getRunningContext().GenerateNodeId(),
    FileLocation: (0, SouceMap_1.getCallerLocation)(1),
    Cases: [],
    Run: e,
    RunTime: 0,
  };
  getRunningContext().PushSuite(t), e(), getRunningContext().PopSuite();
}
function it(t, e, r, o) {
  t = {
    Type: "case",
    Name: t,
    Id: getRunningContext().GenerateNodeId(),
    Run: e,
    FileLocation: (0, SouceMap_1.getCallerLocation)(1),
    TimeOut: r,
    TestCaseInterval: o,
  };
  getRunningContext().CurrentSuite.Cases.push(t);
}
function expect(t) {
  return new Expect(t);
}
(exports.beforeEach = beforeEach),
  (exports.afterEach = afterEach),
  (exports.beforeAll = beforeAll),
  (exports.afterAll = afterAll),
  (exports.describe = describe),
  (exports.it = it),
  (exports.expect = expect);
//# sourceMappingURL=Test.js.map
