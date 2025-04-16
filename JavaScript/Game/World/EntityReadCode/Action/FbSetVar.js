"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetVar = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbSetVar {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.cCh = !1),
      (this.uCh = void 0),
      (this.dCh = !1),
      (this.mCh = void 0);
  }
  static Create(e) {
    if (e) return new FbSetVar(e);
  }
  get VarLeft() {
    var e, t;
    return (
      !this.cCh &&
        ((this.cCh = !0),
        (e = this.FbDataInternal.varLeftType()),
        (t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) &&
        (this.uCh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          e,
          this.FbDataInternal.varLeft(t),
        )),
      this.uCh
    );
  }
  get VarRight() {
    var e, t;
    return (
      !this.dCh &&
        ((this.dCh = !0),
        (e = this.FbDataInternal.varRightType()),
        (t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) &&
        (this.mCh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          e,
          this.FbDataInternal.varRight(t),
        )),
      this.mCh
    );
  }
}
exports.FbSetVar = FbSetVar;
//# sourceMappingURL=FbSetVar.js.map
