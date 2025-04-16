"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCustomViewDistance = void 0);
class FbCustomViewDistance {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.rdh = !1),
      (this.odh = 0);
  }
  static Create(t) {
    if (t) return new FbCustomViewDistance(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Distance() {
    return (
      this.rdh ||
        ((this.rdh = !0), (this.odh = this.FbDataInternal.distance())),
      this.odh
    );
  }
}
exports.FbCustomViewDistance = FbCustomViewDistance;
//# sourceMappingURL=FbCustomViewDistance.js.map
