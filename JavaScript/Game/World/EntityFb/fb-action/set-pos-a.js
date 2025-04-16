"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetPosA = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  pos_a_js_1 = require("../fb-action/pos-a.js");
class SetPosA {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsSetPosA(t, s) {
    return (s || new SetPosA()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetPosA(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new SetPosA()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  pos(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s
      ? (t || new pos_a_js_1.PosA()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startSetPosA(t) {
    t.startObject(1);
  }
  static addPos(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static endSetPosA(t) {
    return t.endObject();
  }
  static createSetPosA(t, s) {
    return SetPosA.startSetPosA(t), SetPosA.addPos(t, s), SetPosA.endSetPosA(t);
  }
}
exports.SetPosA = SetPosA;
//# sourceMappingURL=set-pos-a.js.map
