"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbParkourPointLayerConfig = void 0);
class FbParkourPointLayerConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.V9h = !1),
      (this.j9h = 0),
      (this.H9h = !1),
      (this.W9h = 0);
  }
  static Create(t) {
    if (t) return new FbParkourPointLayerConfig(t);
  }
  get Width() {
    return (
      this.V9h || ((this.V9h = !0), (this.j9h = this.FbDataInternal.width())),
      this.j9h
    );
  }
  get Length() {
    return (
      this.H9h || ((this.H9h = !0), (this.W9h = this.FbDataInternal.length())),
      this.W9h
    );
  }
}
exports.FbParkourPointLayerConfig = FbParkourPointLayerConfig;
//# sourceMappingURL=FbParkourPointLayerConfig.js.map
