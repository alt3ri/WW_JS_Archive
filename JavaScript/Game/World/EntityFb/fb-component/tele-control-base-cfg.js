"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleControlBaseCfg = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleControlBaseCfg {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleControlBaseCfg(t, e) {
    return (e || new TeleControlBaseCfg()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleControlBaseCfg(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleControlBaseCfg()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  commonConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  canRotate() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  initialGravity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startTeleControlBaseCfg(t) {
    t.startObject(3);
  }
  static addCommonConfig(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCanRotate(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addInitialGravity(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endTeleControlBaseCfg(t) {
    return t.endObject();
  }
  static createTeleControlBaseCfg(t, e, s, o) {
    return (
      TeleControlBaseCfg.startTeleControlBaseCfg(t),
      TeleControlBaseCfg.addCommonConfig(t, e),
      TeleControlBaseCfg.addCanRotate(t, s),
      TeleControlBaseCfg.addInitialGravity(t, o),
      TeleControlBaseCfg.endTeleControlBaseCfg(t)
    );
  }
}
exports.TeleControlBaseCfg = TeleControlBaseCfg;
//# sourceMappingURL=tele-control-base-cfg.js.map
