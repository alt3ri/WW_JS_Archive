"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixSpeed = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixSpeed {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsFixSpeed(e, t) {
    return (t || new FixSpeed()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsFixSpeed(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FixSpeed()).__init(e.readInt32(e.position()) + e.position(), e)
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  speed() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startFixSpeed(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSpeed(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endFixSpeed(e) {
    return e.endObject();
  }
  static createFixSpeed(e, t, i) {
    return (
      FixSpeed.startFixSpeed(e),
      FixSpeed.addType(e, t),
      FixSpeed.addSpeed(e, i),
      FixSpeed.endFixSpeed(e)
    );
  }
}
exports.FixSpeed = FixSpeed;
//# sourceMappingURL=fix-speed.js.map
