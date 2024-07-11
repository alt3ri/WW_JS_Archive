"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectConfig = void 0);
class EffectConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Path() {
    return this.path();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsEffectConfig(t, s) {
    return (s || new EffectConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    const s = this.J7.__offset(this.z7, 4);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  path(t) {
    const s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
}
exports.EffectConfig = EffectConfig;
// # sourceMappingURL=EffectConfig.js.map
