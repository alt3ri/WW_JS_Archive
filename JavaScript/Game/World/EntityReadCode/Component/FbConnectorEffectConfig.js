"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConnectorEffectConfig = void 0);
class FbConnectorEffectConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.xEh = !1),
      (this.REh = void 0),
      (this.p$h = !1),
      (this.v$h = void 0),
      (this.y$h = !1),
      (this.S$h = void 0);
  }
  static Create(t) {
    if (t) return new FbConnectorEffectConfig(t);
  }
  get EffectPath() {
    return (
      this.xEh ||
        ((this.xEh = !0), (this.REh = this.FbDataInternal.effectPath())),
      this.REh
    );
  }
  get StartPoint() {
    return (
      this.p$h ||
        ((this.p$h = !0), (this.v$h = this.FbDataInternal.startPoint())),
      this.v$h
    );
  }
  get EndPoint() {
    return (
      this.y$h ||
        ((this.y$h = !0), (this.S$h = this.FbDataInternal.endPoint())),
      this.S$h
    );
  }
}
exports.FbConnectorEffectConfig = FbConnectorEffectConfig;
//# sourceMappingURL=FbConnectorEffectConfig.js.map
