"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FaceToPos = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class FaceToPos {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsFaceToPos(t, s) {
    return (s || new FaceToPos()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFaceToPos(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new FaceToPos()).__init(t.readInt32(t.position()) + t.position(), t)
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
  static startFaceToPos(t) {
    t.startObject(1);
  }
  static addPos(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static endFaceToPos(t) {
    return t.endObject();
  }
  static createFaceToPos(t, s) {
    return (
      FaceToPos.startFaceToPos(t),
      FaceToPos.addPos(t, s),
      FaceToPos.endFaceToPos(t)
    );
  }
}
exports.FaceToPos = FaceToPos;
//# sourceMappingURL=face-to-pos.js.map
