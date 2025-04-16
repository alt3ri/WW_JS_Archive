"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayBubble = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  bubble_index_js_1 = require("../fb-action/bubble-index.js");
class PlayBubble {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPlayBubble(t, e) {
    return (e || new PlayBubble()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayBubble(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PlayBubble()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  flow(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new bubble_index_js_1.BubbleIndex()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startPlayBubble(t) {
    t.startObject(2);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addFlow(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endPlayBubble(t) {
    return t.endObject();
  }
}
exports.PlayBubble = PlayBubble;
//# sourceMappingURL=play-bubble.js.map
