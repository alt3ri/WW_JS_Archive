"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHeadStateViewConfig = void 0);
class FbHeadStateViewConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.uUh = !1),
      (this.dUh = void 0),
      (this.mUh = !1),
      (this.CUh = 0),
      (this.gUh = !1),
      (this.fUh = 0),
      (this.pUh = !1),
      (this.vUh = void 0);
  }
  static Create(t) {
    if (t) return new FbHeadStateViewConfig(t);
  }
  get HeadStateViewType() {
    return (
      this.uUh ||
        ((this.uUh = !0), (this.dUh = this.FbDataInternal.headStateViewType())),
      this.dUh
    );
  }
  get ZOffset() {
    return (
      this.mUh || ((this.mUh = !0), (this.CUh = this.FbDataInternal.zOffset())),
      this.CUh
    );
  }
  get ForwardOffset() {
    return (
      this.gUh ||
        ((this.gUh = !0), (this.fUh = this.FbDataInternal.forwardOffset())),
      this.fUh
    );
  }
  get HeadStateSocketName() {
    return (
      this.pUh ||
        ((this.pUh = !0),
        (this.vUh = this.FbDataInternal.headStateSocketName())),
      this.vUh
    );
  }
}
exports.FbHeadStateViewConfig = FbHeadStateViewConfig;
//# sourceMappingURL=FbHeadStateViewConfig.js.map
