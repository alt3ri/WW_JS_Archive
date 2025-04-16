"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SafePos = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SafePos {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSafePos(t, e) {
    return (e || new SafePos()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSafePos(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SafePos()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startSafePos(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endSafePos(t) {
    return t.endObject();
  }
  static createSafePos(t, e) {
    return (
      SafePos.startSafePos(t), SafePos.addType(t, e), SafePos.endSafePos(t)
    );
  }
}
exports.SafePos = SafePos;
//# sourceMappingURL=safe-pos.js.map
