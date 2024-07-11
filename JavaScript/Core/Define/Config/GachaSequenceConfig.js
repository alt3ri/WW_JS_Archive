"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaSequenceConfig = void 0);
class GachaSequenceConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SequencePath() {
    return this.sequencepath();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsGachaSequenceConfig(t, e) {
    return (e || new GachaSequenceConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sequencepath(t) {
    const e = this.J7.__offset(this.z7, 6);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
}
exports.GachaSequenceConfig = GachaSequenceConfig;
// # sourceMappingURL=GachaSequenceConfig.js.map
