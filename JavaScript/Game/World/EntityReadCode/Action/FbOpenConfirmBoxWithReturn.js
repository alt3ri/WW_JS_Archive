"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenConfirmBoxWithReturn = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbOpenConfirmBoxWithReturn {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.mxh = !1),
      (this.Cxh = void 0);
  }
  static Create(t) {
    if (t) return new FbOpenConfirmBoxWithReturn(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get ReturnVar() {
    var t, e;
    return (
      !this.mxh &&
        ((this.mxh = !0),
        (t = this.FbDataInternal.returnVarType()),
        (e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.Cxh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.returnVar(e),
        )),
      this.Cxh
    );
  }
}
exports.FbOpenConfirmBoxWithReturn = FbOpenConfirmBoxWithReturn;
//# sourceMappingURL=FbOpenConfirmBoxWithReturn.js.map
