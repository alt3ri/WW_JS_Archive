"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetTime = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbSetTime {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Fph = !1),
      (this.Nph = 0),
      (this.Ct_ = !1),
      (this.gt_ = void 0);
  }
  static Create(t) {
    if (t) return new FbSetTime(t);
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
    var t, e;
    return (
      !this.Ct_ &&
        ((this.Ct_ = !0),
        (t = this.FbDataInternal.varForTimeType()),
        (e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.gt_ = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.varForTime(e),
        )),
      this.gt_
    );
  }
}
exports.FbSetTime = FbSetTime;
//# sourceMappingURL=FbSetTime.js.map
