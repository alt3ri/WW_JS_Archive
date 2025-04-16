"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformBubble = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  bubble_index_js_1 = require("../fb-action/bubble-index.js");
class NpcPerformBubble {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsNpcPerformBubble(e, r) {
    return (r || new NpcPerformBubble()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsNpcPerformBubble(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new NpcPerformBubble()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  bubble(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r
      ? (e || new bubble_index_js_1.BubbleIndex()).__init(
          this.bb.__indirect(this.bb_pos + r),
          this.bb,
        )
      : void 0;
  }
  rate() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startNpcPerformBubble(e) {
    e.startObject(2);
  }
  static addBubble(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addRate(e, r) {
    e.addFieldInt32(1, r, 0);
  }
  static endNpcPerformBubble(e) {
    return e.endObject();
  }
  static createNpcPerformBubble(e, r, t) {
    return (
      NpcPerformBubble.startNpcPerformBubble(e),
      NpcPerformBubble.addBubble(e, r),
      NpcPerformBubble.addRate(e, t),
      NpcPerformBubble.endNpcPerformBubble(e)
    );
  }
}
exports.NpcPerformBubble = NpcPerformBubble;
//# sourceMappingURL=npc-perform-bubble.js.map
