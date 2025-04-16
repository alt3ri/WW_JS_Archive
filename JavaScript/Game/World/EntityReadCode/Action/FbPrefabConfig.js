"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPrefabConfig = void 0);
class FbPrefabConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.sAh = !1),
      (this.aAh = 0);
  }
  static Create(t) {
    if (t) return new FbPrefabConfig(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PrefabId() {
    return (
      this.sAh ||
        ((this.sAh = !0), (this.aAh = this.FbDataInternal.prefabId())),
      this.aAh
    );
  }
}
exports.FbPrefabConfig = FbPrefabConfig;
//# sourceMappingURL=FbPrefabConfig.js.map
