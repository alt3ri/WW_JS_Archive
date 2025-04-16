"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCloseGlobalTimeScale = void 0);
class FbCloseGlobalTimeScale {
  constructor(e) {
    (this.FbDataInternal = e), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(e) {
    if (e) return new FbCloseGlobalTimeScale(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbCloseGlobalTimeScale = FbCloseGlobalTimeScale;
//# sourceMappingURL=FbCloseGlobalTimeScale.js.map
