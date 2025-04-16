"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpeedEffectConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SpeedEffectConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSpeedEffectConfig(e, t) {
    return (t || new SpeedEffectConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSpeedEffectConfig(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SpeedEffectConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  minVehicleSpeed() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  maxVehicleSpeed() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  gameplayCueIds(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readInt64(this.bb.__vector(this.bb_pos + t) + 8 * e)
      : BigInt(0);
  }
  gameplayCueIdsLength() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startSpeedEffectConfig(e) {
    e.startObject(3);
  }
  static addMinVehicleSpeed(e, t) {
    e.addFieldFloat32(0, t, 0);
  }
  static addMaxVehicleSpeed(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static addGameplayCueIds(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static createGameplayCueIdsVector(t, i) {
    t.startVector(8, i.length, 8);
    for (let e = i.length - 1; 0 <= e; e--) t.addInt64(i[e]);
    return t.endVector();
  }
  static startGameplayCueIdsVector(e, t) {
    e.startVector(8, t, 8);
  }
  static endSpeedEffectConfig(e) {
    return e.endObject();
  }
  static createSpeedEffectConfig(e, t, i, s) {
    return (
      SpeedEffectConfig.startSpeedEffectConfig(e),
      SpeedEffectConfig.addMinVehicleSpeed(e, t),
      SpeedEffectConfig.addMaxVehicleSpeed(e, i),
      SpeedEffectConfig.addGameplayCueIds(e, s),
      SpeedEffectConfig.endSpeedEffectConfig(e)
    );
  }
}
exports.SpeedEffectConfig = SpeedEffectConfig;
//# sourceMappingURL=speed-effect-config.js.map
