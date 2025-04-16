"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLowViewDistance = void 0);
class FbLowViewDistance {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbLowViewDistance(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbLowViewDistance = FbLowViewDistance;
//# sourceMappingURL=FbLowViewDistance.js.map
