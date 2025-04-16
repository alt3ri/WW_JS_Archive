"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FanStateEffect = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  fan_effect_config_js_1 = require("../fb-component/fan-effect-config.js");
class FanStateEffect {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFanStateEffect(t, e) {
    return (e || new FanStateEffect()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFanStateEffect(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FanStateEffect()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  effectConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new fan_effect_config_js_1.FanEffectConfig()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startFanStateEffect(t) {
    t.startObject(2);
  }
  static addEntityState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEffectConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endFanStateEffect(t) {
    return t.endObject();
  }
}
exports.FanStateEffect = FanStateEffect;
//# sourceMappingURL=fan-state-effect.js.map
