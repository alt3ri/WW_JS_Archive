"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnterLeaveRadius = void 0);
class FbEnterLeaveRadius {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Cmh = !1),
      (this.gmh = 0),
      (this.fmh = !1),
      (this.pmh = 0);
  }
  static Create(t) {
    if (t) return new FbEnterLeaveRadius(t);
  }
  get EnterRadius() {
    return (
      this.Cmh ||
        ((this.Cmh = !0), (this.gmh = this.FbDataInternal.enterRadius())),
      this.gmh
    );
  }
  get LeaveRadius() {
    return (
      this.fmh ||
        ((this.fmh = !0), (this.pmh = this.FbDataInternal.leaveRadius())),
      this.pmh
    );
  }
}
exports.FbEnterLeaveRadius = FbEnterLeaveRadius;
//# sourceMappingURL=FbEnterLeaveRadius.js.map
