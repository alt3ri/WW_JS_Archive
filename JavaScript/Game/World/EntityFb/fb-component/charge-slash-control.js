"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChargeSlashControl = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  charge_slash_air_floating_config_js_1 = require("../fb-component/charge-slash-air-floating-config.js"),
  union_deflection_config_js_1 = require("../fb-component/union-deflection-config.js");
class ChargeSlashControl {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsChargeSlashControl(t, i) {
    return (i || new ChargeSlashControl()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChargeSlashControl(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ChargeSlashControl()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  upHeight() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  upCurvePath(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  deflectionConfigType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_deflection_config_js_1.UnionDeflectionConfig.NONE;
  }
  deflectionConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  airFloatingConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (
          t ||
          new charge_slash_air_floating_config_js_1.ChargeSlashAirFloatingConfig()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  static startChargeSlashControl(t) {
    t.startObject(6);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addUpHeight(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addUpCurvePath(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addDeflectionConfigType(t, i) {
    t.addFieldInt8(
      3,
      i,
      union_deflection_config_js_1.UnionDeflectionConfig.NONE,
    );
  }
  static addDeflectionConfig(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addAirFloatingConfig(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static endChargeSlashControl(t) {
    return t.endObject();
  }
}
exports.ChargeSlashControl = ChargeSlashControl;
//# sourceMappingURL=charge-slash-control.js.map
