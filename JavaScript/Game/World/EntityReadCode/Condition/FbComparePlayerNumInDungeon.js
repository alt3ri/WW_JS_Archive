"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbComparePlayerNumInDungeon = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbComparePlayerNumInDungeon {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.OJh = !1),
      (this.FJh = void 0),
      (this.KJh = !1),
      (this.$Jh = void 0);
  }
  static Create(e) {
    if (e) return new FbComparePlayerNumInDungeon(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CompareType() {
    return (
      this.OJh ||
        ((this.OJh = !0), (this.FJh = this.FbDataInternal.compareType())),
      this.FJh
    );
  }
  get CompareValue() {
    var e, t;
    return (
      !this.KJh &&
        ((this.KJh = !0),
        (e = this.FbDataInternal.compareValueType()),
        (t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) &&
        (this.$Jh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          e,
          this.FbDataInternal.compareValue(t),
        )),
      this.$Jh
    );
  }
}
exports.FbComparePlayerNumInDungeon = FbComparePlayerNumInDungeon;
//# sourceMappingURL=FbComparePlayerNumInDungeon.js.map
