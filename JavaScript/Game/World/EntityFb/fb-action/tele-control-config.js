"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleControlConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleControlConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleControlConfig(t, e) {
    return (e || new TeleControlConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleControlConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleControlConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  teleControlType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startTeleControlConfig(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTeleControlType(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static endTeleControlConfig(t) {
    return t.endObject();
  }
  static createTeleControlConfig(t, e, o) {
    return (
      TeleControlConfig.startTeleControlConfig(t),
      TeleControlConfig.addType(t, e),
      TeleControlConfig.addTeleControlType(t, o),
      TeleControlConfig.endTeleControlConfig(t)
    );
  }
}
exports.TeleControlConfig = TeleControlConfig;
//# sourceMappingURL=tele-control-config.js.map
