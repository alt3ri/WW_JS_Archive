"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CircleRange = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class CircleRange {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCircleRange(t, e) {
    return (e || new CircleRange()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCircleRange(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CircleRange()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  pos(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  radius() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCircleRange(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addPos(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addRadius(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endCircleRange(t) {
    return t.endObject();
  }
}
exports.CircleRange = CircleRange;
//# sourceMappingURL=circle-range.js.map
