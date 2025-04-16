"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAwakeWithTransformVar = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbAwakeWithTransformVar {
  constructor(r) {
    (this.FbDataInternal = r),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.H_1 = !1),
      (this.$_1 = void 0);
  }
  static Create(r) {
    if (r) return new FbAwakeWithTransformVar(r);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TransformVar() {
    var r, t;
    return (
      !this.H_1 &&
        ((this.H_1 = !0),
        (r = this.FbDataInternal.transformVarType()),
        (t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(r))) &&
        (this.$_1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          r,
          this.FbDataInternal.transformVar(t),
        )),
      this.$_1
    );
  }
}
exports.FbAwakeWithTransformVar = FbAwakeWithTransformVar;
//# sourceMappingURL=FbAwakeWithTransformVar.js.map
