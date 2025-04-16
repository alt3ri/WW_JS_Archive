"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BoxRange = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class BoxRange {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsBoxRange(t, s) {
    return (s || new BoxRange()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBoxRange(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new BoxRange()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  size(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  rotator(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startBoxRange(t) {
    t.startObject(4);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addPos(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addSize(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static addRotator(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static endBoxRange(t) {
    return t.endObject();
  }
}
exports.BoxRange = BoxRange;
//# sourceMappingURL=box-range.js.map
