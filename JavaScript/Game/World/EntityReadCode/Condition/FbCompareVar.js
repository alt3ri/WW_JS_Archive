"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareVar = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbCompareVar {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.H1h = !1),
      (this.W1h = void 0),
      (this.$1h = !1),
      (this.X1h = void 0);
  }
  static Create(t) {
    if (t) return new FbCompareVar(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get Var1() {
    var t, i;
    return (
      !this.H1h &&
        ((this.H1h = !0),
        (t = this.FbDataInternal.var1Type()),
        (i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.W1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
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
        (i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.X1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.var2(i),
        )),
      this.X1h
    );
  }
}
exports.FbCompareVar = FbCompareVar;
//# sourceMappingURL=FbCompareVar.js.map
