"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCalculateVar = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbCalculateVar {
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
    if (t) return new FbCalculateVar(t);
  }
  get Var1() {
    var t, e;
    return (
      !this.H1h &&
        ((this.H1h = !0),
        (t = this.FbDataInternal.var1Type()),
        (e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.W1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.var1(e),
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
    var t, e;
    return (
      !this.$1h &&
        ((this.$1h = !0),
        (t = this.FbDataInternal.var2Type()),
        (e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.X1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.var2(e),
        )),
      this.X1h
    );
  }
  get Result() {
    var t, e;
    return (
      !this.Y1h &&
        ((this.Y1h = !0),
        (t = this.FbDataInternal.resultType()),
        (e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.z1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.result(e),
        )),
      this.z1h
    );
  }
}
exports.FbCalculateVar = FbCalculateVar;
//# sourceMappingURL=FbCalculateVar.js.map
