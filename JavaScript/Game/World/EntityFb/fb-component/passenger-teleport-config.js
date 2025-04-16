"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PassengerTeleportConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  pos_a_js_1 = require("../fb-action/pos-a.js");
class PassengerTeleportConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, s) {
    return (this.bb_pos = e), (this.bb = s), this;
  }
  static getRootAsPassengerTeleportConfig(e, s) {
    return (s || new PassengerTeleportConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPassengerTeleportConfig(e, s) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PassengerTeleportConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  posA(e) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s
      ? (e || new pos_a_js_1.PosA()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startPassengerTeleportConfig(e) {
    e.startObject(1);
  }
  static addPosA(e, s) {
    e.addFieldOffset(0, s, 0);
  }
  static endPassengerTeleportConfig(e) {
    return e.endObject();
  }
  static createPassengerTeleportConfig(e, s) {
    return (
      PassengerTeleportConfig.startPassengerTeleportConfig(e),
      PassengerTeleportConfig.addPosA(e, s),
      PassengerTeleportConfig.endPassengerTeleportConfig(e)
    );
  }
}
exports.PassengerTeleportConfig = PassengerTeleportConfig;
//# sourceMappingURL=passenger-teleport-config.js.map
