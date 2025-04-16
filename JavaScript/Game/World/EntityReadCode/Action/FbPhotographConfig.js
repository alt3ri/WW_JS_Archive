"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPhotographConfig = void 0);
class FbPhotographConfig {
  constructor(t) {
    (this.FbDataInternal = t), (this.Idh = !1), (this.Tdh = void 0);
  }
  static Create(t) {
    if (t) return new FbPhotographConfig(t);
  }
  get PhotoTargets() {
    if (!this.Idh) {
      (this.Idh = !0), (this.Tdh = new Array());
      var s = this.FbDataInternal.photoTargetsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.Tdh.push(this.FbDataInternal.photoTargets(t));
    }
    return this.Tdh;
  }
}
exports.FbPhotographConfig = FbPhotographConfig;
//# sourceMappingURL=FbPhotographConfig.js.map
