"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChargeSlashAirFloatingConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChargeSlashAirFloatingConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsChargeSlashAirFloatingConfig(i, t) {
    return (t || new ChargeSlashAirFloatingConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsChargeSlashAirFloatingConfig(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ChargeSlashAirFloatingConfig()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  airFloatingCurvePath(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  floatingAmplitude() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  static startChargeSlashAirFloatingConfig(i) {
    i.startObject(2);
  }
  static addAirFloatingCurvePath(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addFloatingAmplitude(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static endChargeSlashAirFloatingConfig(i) {
    return i.endObject();
  }
  static createChargeSlashAirFloatingConfig(i, t, a) {
    return (
      ChargeSlashAirFloatingConfig.startChargeSlashAirFloatingConfig(i),
      ChargeSlashAirFloatingConfig.addAirFloatingCurvePath(i, t),
      ChargeSlashAirFloatingConfig.addFloatingAmplitude(i, a),
      ChargeSlashAirFloatingConfig.endChargeSlashAirFloatingConfig(i)
    );
  }
}
exports.ChargeSlashAirFloatingConfig = ChargeSlashAirFloatingConfig;
//# sourceMappingURL=charge-slash-air-floating-config.js.map
