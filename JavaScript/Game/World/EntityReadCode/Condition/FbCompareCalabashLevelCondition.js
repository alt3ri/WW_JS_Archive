"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareCalabashLevelCondition = void 0);
class FbCompareCalabashLevelCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.nzh = !1),
      (this.szh = 0);
  }
  static Create(t) {
    if (t) return new FbCompareCalabashLevelCondition(t);
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
  get CalabashLevel() {
    return (
      this.nzh ||
        ((this.nzh = !0), (this.szh = this.FbDataInternal.calabashLevel())),
      this.szh
    );
  }
}
exports.FbCompareCalabashLevelCondition = FbCompareCalabashLevelCondition;
//# sourceMappingURL=FbCompareCalabashLevelCondition.js.map
