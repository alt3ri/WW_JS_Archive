"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareTeammateDieCondition = void 0);
class FbCompareTeammateDieCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.EJh = !1),
      (this.IJh = 0);
  }
  static Create(t) {
    if (t) return new FbCompareTeammateDieCondition(t);
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
  get DieCount() {
    return (
      this.EJh ||
        ((this.EJh = !0), (this.IJh = this.FbDataInternal.dieCount())),
      this.IJh
    );
  }
}
exports.FbCompareTeammateDieCondition = FbCompareTeammateDieCondition;
//# sourceMappingURL=FbCompareTeammateDieCondition.js.map
