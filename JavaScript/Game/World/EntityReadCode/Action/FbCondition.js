"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCondition = void 0);
const UnionVarHelper_1 = require("./UnionVarHelper");
class FbCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.H1h = !1),
      (this.W1h = void 0),
      (this.$1h = !1),
      (this.X1h = void 0),
      (this._ch = !1),
      (this.cch = void 0);
  }
  static Create(t) {
    if (t) return new FbCondition(t);
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
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
}
exports.FbCondition = FbCondition;
//# sourceMappingURL=FbCondition.js.map
