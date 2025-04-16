"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveToPosA = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  pos_a_js_1 = require("../fb-action/pos-a.js");
class MoveToPosA {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsMoveToPosA(t, s) {
    return (s || new MoveToPosA()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMoveToPosA(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new MoveToPosA()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  timeout() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new pos_a_js_1.PosA()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startMoveToPosA(t) {
    t.startObject(2);
  }
  static addTimeout(t, s) {
    t.addFieldFloat32(0, s, 0);
  }
  static addPos(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endMoveToPosA(t) {
    return t.endObject();
  }
}
exports.MoveToPosA = MoveToPosA;
//# sourceMappingURL=move-to-pos-a.js.map
