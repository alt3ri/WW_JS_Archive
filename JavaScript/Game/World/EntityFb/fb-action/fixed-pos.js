"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixedPos = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  pos_a_js_1 = require("../fb-action/pos-a.js");
class FixedPos {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsFixedPos(t, s) {
    return (s || new FixedPos()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFixedPos(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new FixedPos()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  targetPos(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new pos_a_js_1.PosA()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startFixedPos(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldInt8(0, s, 0);
  }
  static addTargetPos(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endFixedPos(t) {
    return t.endObject();
  }
}
exports.FixedPos = FixedPos;
//# sourceMappingURL=fixed-pos.js.map
