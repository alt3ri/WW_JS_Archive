"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEaseData = void 0);
class FbEaseData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.I_h = !1),
      (this.y6o = 0);
  }
  static Create(t) {
    if (t) return new FbEaseData(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
}
exports.FbEaseData = FbEaseData;
//# sourceMappingURL=FbEaseData.js.map
