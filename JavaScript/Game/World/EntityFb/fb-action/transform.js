"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Transform = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class Transform {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsTransform(t, s) {
    return (s || new Transform()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTransform(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new Transform()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  rot(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  scale(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  folded() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startTransform(t) {
    t.startObject(4);
  }
  static addPos(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addRot(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addScale(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static addFolded(t, s) {
    t.addFieldInt8(3, +s, 0);
  }
  static endTransform(t) {
    return t.endObject();
  }
}
exports.Transform = Transform;
//# sourceMappingURL=transform.js.map
