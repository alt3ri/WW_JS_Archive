"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AutoConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsAutoConfig(t, i) {
    return (i || new AutoConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAutoConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new AutoConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isCircle() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  interval() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startAutoConfig(t) {
    t.startObject(2);
  }
  static addIsCircle(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addInterval(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endAutoConfig(t) {
    return t.endObject();
  }
  static createAutoConfig(t, i, s) {
    return (
      AutoConfig.startAutoConfig(t),
      AutoConfig.addIsCircle(t, i),
      AutoConfig.addInterval(t, s),
      AutoConfig.endAutoConfig(t)
    );
  }
}
exports.AutoConfig = AutoConfig;
//# sourceMappingURL=auto-config.js.map
