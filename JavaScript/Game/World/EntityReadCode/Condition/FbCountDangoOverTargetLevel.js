"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCountDangoOverTargetLevel = void 0);
class FbCountDangoOverTargetLevel {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.um1 = !1),
      (this.dm1 = 0),
      (this.mm1 = !1),
      (this.fm1 = 0);
  }
  static Create(t) {
    if (t) return new FbCountDangoOverTargetLevel(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetNumber() {
    return (
      this.um1 ||
        ((this.um1 = !0), (this.dm1 = this.FbDataInternal.targetNumber())),
      this.dm1
    );
  }
  get TargetLevel() {
    return (
      this.mm1 ||
        ((this.mm1 = !0), (this.fm1 = this.FbDataInternal.targetLevel())),
      this.fm1
    );
  }
}
exports.FbCountDangoOverTargetLevel = FbCountDangoOverTargetLevel;
//# sourceMappingURL=FbCountDangoOverTargetLevel.js.map
