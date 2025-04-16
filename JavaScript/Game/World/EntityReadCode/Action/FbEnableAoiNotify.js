"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableAoiNotify = void 0);
class FbEnableAoiNotify {
  constructor(t) {
    (this.FbDataInternal = t), (this.Bch = !1), (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbEnableAoiNotify(t);
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbEnableAoiNotify = FbEnableAoiNotify;
//# sourceMappingURL=FbEnableAoiNotify.js.map
