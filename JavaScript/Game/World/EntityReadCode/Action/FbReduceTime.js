"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbReduceTime = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbReduceTime {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Fph = !1),
      (this.Nph = 0),
      (this.Ct_ = !1),
      (this.gt_ = void 0);
  }
  static Create(e) {
    if (e) return new FbReduceTime(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Time() {
    return (
      this.Fph || ((this.Fph = !0), (this.Nph = this.FbDataInternal.time())),
      this.Nph
    );
  }
  get VarForTime() {
    var e, t;
    return (
      !this.Ct_ &&
        ((this.Ct_ = !0),
        (e = this.FbDataInternal.varForTimeType()),
        (t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) &&
        (this.gt_ = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          e,
          this.FbDataInternal.varForTime(t),
        )),
      this.gt_
    );
  }
}
exports.FbReduceTime = FbReduceTime;
//# sourceMappingURL=FbReduceTime.js.map
