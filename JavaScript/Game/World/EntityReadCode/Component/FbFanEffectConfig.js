"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFanEffectConfig = void 0);
class FbFanEffectConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.xEh = !1),
      (this.REh = void 0),
      (this.mQh = !1),
      (this.CQh = 0),
      (this.gQh = !1),
      (this.fQh = void 0);
  }
  static Create(t) {
    if (t) return new FbFanEffectConfig(t);
  }
  get EffectPath() {
    return (
      this.xEh ||
        ((this.xEh = !0), (this.REh = this.FbDataInternal.effectPath())),
      this.REh
    );
  }
  get DefaultEffectLength() {
    return (
      this.mQh ||
        ((this.mQh = !0),
        (this.CQh = this.FbDataInternal.defaultEffectLength())),
      this.CQh
    );
  }
  get HitEffectPath() {
    return (
      this.gQh ||
        ((this.gQh = !0), (this.fQh = this.FbDataInternal.hitEffectPath())),
      this.fQh
    );
  }
}
exports.FbFanEffectConfig = FbFanEffectConfig;
//# sourceMappingURL=FbFanEffectConfig.js.map
