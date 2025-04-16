"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformOnMonsterCloseby = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  bubble_index_js_1 = require("../fb-action/bubble-index.js"),
  montage_id_js_1 = require("../fb-action/montage-id.js");
class NpcPerformOnMonsterCloseby {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsNpcPerformOnMonsterCloseby(t, e) {
    return (e || new NpcPerformOnMonsterCloseby()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcPerformOnMonsterCloseby(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new NpcPerformOnMonsterCloseby()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  range() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  montage(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new montage_id_js_1.MontageId()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  bubble(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new bubble_index_js_1.BubbleIndex()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  bubbleRate() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startNpcPerformOnMonsterCloseby(t) {
    t.startObject(4);
  }
  static addRange(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addMontage(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addBubble(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addBubbleRate(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endNpcPerformOnMonsterCloseby(t) {
    return t.endObject();
  }
}
exports.NpcPerformOnMonsterCloseby = NpcPerformOnMonsterCloseby;
//# sourceMappingURL=npc-perform-on-monster-closeby.js.map
