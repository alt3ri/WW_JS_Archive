"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FanEffectConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FanEffectConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, f) {
    return (this.bb_pos = t), (this.bb = f), this;
  }
  static getRootAsFanEffectConfig(t, f) {
    return (f || new FanEffectConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFanEffectConfig(t, f) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (f || new FanEffectConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  effectPath(t) {
    var f = this.bb.__offset(this.bb_pos, 4);
    return f ? this.bb.__string(this.bb_pos + f, t) : void 0;
  }
  defaultEffectLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  hitEffectPath(t) {
    var f = this.bb.__offset(this.bb_pos, 8);
    return f ? this.bb.__string(this.bb_pos + f, t) : void 0;
  }
  static startFanEffectConfig(t) {
    t.startObject(3);
  }
  static addEffectPath(t, f) {
    t.addFieldOffset(0, f, 0);
  }
  static addDefaultEffectLength(t, f) {
    t.addFieldFloat32(1, f, 0);
  }
  static addHitEffectPath(t, f) {
    t.addFieldOffset(2, f, 0);
  }
  static endFanEffectConfig(t) {
    return t.endObject();
  }
  static createFanEffectConfig(t, f, e, i) {
    return (
      FanEffectConfig.startFanEffectConfig(t),
      FanEffectConfig.addEffectPath(t, f),
      FanEffectConfig.addDefaultEffectLength(t, e),
      FanEffectConfig.addHitEffectPath(t, i),
      FanEffectConfig.endFanEffectConfig(t)
    );
  }
}
exports.FanEffectConfig = FanEffectConfig;
//# sourceMappingURL=fan-effect-config.js.map
