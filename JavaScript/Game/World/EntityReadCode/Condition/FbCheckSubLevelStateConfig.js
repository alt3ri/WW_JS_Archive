"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckSubLevelStateConfig = void 0);
class FbCheckSubLevelStateConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.N8_ = !1),
      (this.V8_ = void 0),
      (this.j8_ = !1),
      (this.H8_ = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckSubLevelStateConfig(t);
  }
  get SubLevelName() {
    return (
      this.N8_ ||
        ((this.N8_ = !0), (this.V8_ = this.FbDataInternal.subLevelName())),
      this.V8_
    );
  }
  get SubLevelState() {
    return (
      this.j8_ ||
        ((this.j8_ = !0), (this.H8_ = this.FbDataInternal.subLevelState())),
      this.H8_
    );
  }
}
exports.FbCheckSubLevelStateConfig = FbCheckSubLevelStateConfig;
//# sourceMappingURL=FbCheckSubLevelStateConfig.js.map
