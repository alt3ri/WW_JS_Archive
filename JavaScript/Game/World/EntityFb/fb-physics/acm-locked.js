"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AcmLocked = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AcmLocked {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAcmLocked(t, e) {
    return (e || new AcmLocked()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAcmLocked(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AcmLocked()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startAcmLocked(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endAcmLocked(t) {
    return t.endObject();
  }
  static createAcmLocked(t, e) {
    return (
      AcmLocked.startAcmLocked(t),
      AcmLocked.addType(t, e),
      AcmLocked.endAcmLocked(t)
    );
  }
}
exports.AcmLocked = AcmLocked;
//# sourceMappingURL=acm-locked.js.map
