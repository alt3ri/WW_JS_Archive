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
const IUtil_1 = require("../../Interface/IUtil");
const SouceMap_1 = require("../Misc/SouceMap");
const TestOp_1 = require("./TestOp");
class Expect {
  constructor(e) {
    this.Xe = e;
  }
  get Je() {
    return (0, SouceMap_1.getCallerLocation)(2);
  }
  notToBe(e) {
    if (this.Xe === e) {
      throw new Error(
        `Expect: ${JSON.stringify(e)}
Value : ${JSON.stringify(this.Xe)}
File  : ` + this.Je,
      );
    }
  }

  toBe(e) {
    if (this.Xe !== e) {
      throw new Error(
        `Expect: ${JSON.stringify(e)}
Value : ${JSON.stringify(this.Xe)}
File  : ` + this.Je,
      );
    }
  }

  toEqual(e) {
    if (!(0, IUtil_1.deepEquals)(this.Xe, e)) {
      throw new Error(
        `Expect: ${JSON.stringify(e)}
Value : ${JSON.stringify(this.Xe)}
File  : ` + this.Je,
      );
    }
  }

  notToEqual(e) {
    if ((0, IUtil_1.deepEquals)(this.Xe, e)) {
      throw new Error(
        `Expect: ${JSON.stringify(e)}
Value : ${JSON.stringify(this.Xe)}
File  : ` + this.Je,
      );
    }
  }

  toBeLessThan(e) {
    if (typeof this.Xe !== "bigint" && typeof this.Xe !== "number") {
      throw new Error(
        `Reason: Value is not a number
File  : ` + this.Je,
      );
    }
    if (this.Xe >= e) {
      throw new Error(
        `Expect: Value < ${e}
Value : ${this.Xe}
File  : ` + this.Je,
      );
    }
  }

  toBeLessThanOrEqual(e) {
    if (typeof this.Xe !== "bigint" && typeof this.Xe !== "number") {
      throw new Error(
        `Reason: Value is not a number
File  : ` + this.Je,
      );
    }
    if (this.Xe > e) {
      throw new Error(
        `Expect: Value <= ${e}
Value : ${this.Xe}
File  : ` + this.Je,
      );
    }
  }

  toBeGreaterThan(e) {
    if (typeof this.Xe !== "bigint" && typeof this.Xe !== "number") {
      throw new Error(
        `Reason: Value is not a number
File  : ` + this.Je,
      );
    }
    if (this.Xe <= e) {
      throw new Error(
        `Expect: Value > ${e}
Value : ${this.Xe}
File  : ` + this.Je,
      );
    }
  }

  toBeGreaterThanOrEqual(e) {
    if (typeof this.Xe !== "bigint" && typeof this.Xe !== "number") {
      throw new Error(
        `Reason: Value is not a number
File  : ` + this.Je,
      );
    }
    if (this.Xe < e) {
      throw new Error(
        `Expect: Value >= ${e}
Value : ${this.Xe}
File  : ` + this.Je,
      );
    }
  }

  toBeCloseTo(e, t) {
    if (typeof this.Xe !== "number") {
      throw new Error(
        `Reason: Value is not a number
File  : ` + this.Je,
      );
    }
    if (Math.abs(this.Xe - e) > t) {
      throw new Error(
        `Expect: Value is close to ${e} +/- ${t}
Value : ${this.Xe}
File  : ` + this.Je,
      );
    }
  }

  toBeTruthy() {
    if (!this.Xe) {
      throw new Error(
        `Reason: Value is not true
File  : ` + this.Je,
      );
    }
  }

  toBeFalsy() {
    if (this.Xe) {
      throw new Error(
        `Reason: Value is not false
File  : ` + this.Je,
      );
    }
  }

  toBeUndefined() {
    if (void 0 !== this.Xe) {
      throw new Error(
        `Reason: Value is not undefined
File  : ` + this.Je,
      );
    }
  }

  toBeDefined() {
    if (void 0 === this.Xe) {
      throw new Error(
        `Reason: Value is undefined
File  : ` + this.Je,
      );
    }
  }

  toBeNull() {
    if (this.Xe !== null) {
      throw new Error(
        `Reason: Value is not null
File  : ` + this.Je,
      );
    }
  }

  Ye(e) {
    if (typeof this.Xe !== "function") {
      throw new Error(
        `Reason: Value is not a function
File  : ` + this.Je,
      );
    }
    let t = !1;
    const r = this.Xe;
    try {
      r();
    } catch (e) {
      t = !0;
    }
    if (t !== e) {
      throw new Error(
        `Reason: ${e ? "not" : ""}throw error
File  : ` + this.Je,
      );
    }
  }

  toThrowError() {
    this.Ye(!0);
  }
  toNotThrowError() {
    this.Ye(!1);
  }
  async Ke(e) {
    if (typeof this.Xe !== "function") {
      throw new Error(
        `Reason: Value is not a function
File  : ` + this.Je,
      );
    }
    let t = !1;
    const r = this.Xe;
    try {
      await r();
    } catch (e) {
      t = !0;
    }
    if (t !== e) {
      throw new Error(
        `Reason: ${e ? "not" : ""}throw error
File  : ` + this.Je,
      );
    }
  }

  async toThrowErrorA() {
    return this.Ke(!0);
  }
  async toNotThrowErrorA() {
    return this.Ke(!1);
  }
}
function beforeEach(e) {
  TestOp_1.TestContext.Current.CurrentSuite.BeforeEach = e;
}
function afterEach(e) {
  TestOp_1.TestContext.Current.CurrentSuite.AfterEach = e;
}
function beforeAll(e) {
  TestOp_1.TestContext.Current.CurrentSuite.BeforeAll = e;
}
function afterAll(e) {
  TestOp_1.TestContext.Current.CurrentSuite.AfterAll = e;
}
function describe(e, t) {
  e = {
    Type: "suite",
    Name: e,
    Id: TestOp_1.TestContext.Current.GenerateNodeId(),
    FileLocation: (0, SouceMap_1.getCallerLocation)(1),
    Cases: [],
    Run: t,
    RunTime: 0,
  };
  TestOp_1.TestContext.Current.PushSuite(e),
    t(),
    TestOp_1.TestContext.Current.PopSuite();
}
function it(e, t, r) {
  e = {
    Type: "case",
    Name: e,
    Id: TestOp_1.TestContext.Current.GenerateNodeId(),
    Run: t,
    FileLocation: (0, SouceMap_1.getCallerLocation)(1),
    TimeOut: r,
  };
  TestOp_1.TestContext.Current.CurrentSuite.Cases.push(e);
}
function expect(e) {
  return new Expect(e);
}
(exports.beforeEach = beforeEach),
  (exports.afterEach = afterEach),
  (exports.beforeAll = beforeAll),
  (exports.afterAll = afterAll),
  (exports.describe = describe),
  (exports.it = it),
  (exports.expect = expect);
// # sourceMappingURL=Test.js.map
