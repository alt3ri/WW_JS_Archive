"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAddTime = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbAddTime {
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
    if (t) return new FbAddTime(t);
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
    var t, i;
    return (
      !this.Ct_ &&
        ((this.Ct_ = !0),
        (t = this.FbDataInternal.varForTimeType()),
        (i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.gt_ = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.varForTime(i),
        )),
      this.gt_
    );
  }
}
exports.FbAddTime = FbAddTime;
//# sourceMappingURL=FbAddTime.js.map
