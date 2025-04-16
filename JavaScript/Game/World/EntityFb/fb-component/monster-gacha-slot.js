"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterGachaSlot = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class MonsterGachaSlot {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsMonsterGachaSlot(t, s) {
    return (s || new MonsterGachaSlot()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMonsterGachaSlot(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new MonsterGachaSlot()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
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
  static startMonsterGachaSlot(t) {
    t.startObject(1);
  }
  static addPos(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static endMonsterGachaSlot(t) {
    return t.endObject();
  }
  static createMonsterGachaSlot(t, s) {
    return (
      MonsterGachaSlot.startMonsterGachaSlot(t),
      MonsterGachaSlot.addPos(t, s),
      MonsterGachaSlot.endMonsterGachaSlot(t)
    );
  }
}
exports.MonsterGachaSlot = MonsterGachaSlot;
//# sourceMappingURL=monster-gacha-slot.js.map
