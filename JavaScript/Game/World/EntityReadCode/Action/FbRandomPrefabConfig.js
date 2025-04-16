"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRandomPrefabConfig = void 0);
class FbRandomPrefabConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hAh = !1),
      (this.lAh = 0);
  }
  static Create(t) {
    if (t) return new FbRandomPrefabConfig(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get RandomPrefabId() {
    return (
      this.hAh ||
        ((this.hAh = !0), (this.lAh = this.FbDataInternal.randomPrefabId())),
      this.lAh
    );
  }
}
exports.FbRandomPrefabConfig = FbRandomPrefabConfig;
//# sourceMappingURL=FbRandomPrefabConfig.js.map
