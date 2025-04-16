"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaBouns = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AreaBouns {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAreaBouns(t, e) {
    return (e || new AreaBouns()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAreaBouns(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AreaBouns()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startAreaBouns(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endAreaBouns(t) {
    return t.endObject();
  }
  static createAreaBouns(t, e) {
    return (
      AreaBouns.startAreaBouns(t),
      AreaBouns.addType(t, e),
      AreaBouns.endAreaBouns(t)
    );
  }
}
exports.AreaBouns = AreaBouns;
//# sourceMappingURL=area-bouns.js.map
