"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableLevelPlayConfig = void 0);
class FbEnableLevelPlayConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Ryh = !1),
      (this.wyh = 0),
      (this.Jch = !1),
      (this.l7 = !1);
  }
  static Create(t) {
    if (t) return new FbEnableLevelPlayConfig(t);
  }
  get LevelPlayId() {
    return (
      this.Ryh ||
        ((this.Ryh = !0), (this.wyh = this.FbDataInternal.levelPlayId())),
      this.wyh
    );
  }
  get Enable() {
    return (
      this.Jch || ((this.Jch = !0), (this.l7 = this.FbDataInternal.enable())),
      this.l7
    );
  }
}
exports.FbEnableLevelPlayConfig = FbEnableLevelPlayConfig;
//# sourceMappingURL=FbEnableLevelPlayConfig.js.map
