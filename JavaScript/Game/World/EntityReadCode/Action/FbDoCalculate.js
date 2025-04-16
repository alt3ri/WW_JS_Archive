"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDoCalculate = void 0);
const UnionVarHelper_1 = require("./UnionVarHelper");
class FbDoCalculate {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.H1h = !1),
      (this.W1h = void 0),
      (this.Q1h = !1),
      (this.K1h = void 0),
      (this.$1h = !1),
      (this.X1h = void 0),
      (this.Y1h = !1),
      (this.z1h = void 0);
  }
  static Create(t) {
    if (t) return new FbDoCalculate(t);
  }
  get Var1() {
    var t, i;
    return (
      !this.H1h &&
        ((this.H1h = !0),
        (t = this.FbDataInternal.var1Type()),
        (i = UnionVarHelper_1.UnionVarHelper.GetUnionVarObject(t))) &&
        (this.W1h = UnionVarHelper_1.UnionVarHelper.ReadUnionVar(
          t,
          this.FbDataInternal.var1(i),
        )),
      this.W1h
    );
  }
  get Op() {
    return (
      this.Q1h || ((this.Q1h = !0), (this.K1h = this.FbDataInternal.op())),
      this.K1h
    );
  }
  get Var2() {
    var t, i;
    return (
      !this.$1h &&
        ((this.$1h = !0),
        (t = this.FbDataInternal.var2Type()),
        (i = UnionVarHelper_1.UnionVarHelper.GetUnionVarObject(t))) &&
        (this.X1h = UnionVarHelper_1.UnionVarHelper.ReadUnionVar(
          t,
          this.FbDataInternal.var2(i),
        )),
      this.X1h
    );
  }
  get Result() {
    return (
      this.Y1h || ((this.Y1h = !0), (this.z1h = this.FbDataInternal.result())),
      this.z1h
    );
  }
}
exports.FbDoCalculate = FbDoCalculate;
//# sourceMappingURL=FbDoCalculate.js.map
