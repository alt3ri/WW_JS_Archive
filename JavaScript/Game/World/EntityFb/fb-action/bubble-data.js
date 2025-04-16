"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BubbleData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  bubble_index_js_1 = require("../fb-action/bubble-index.js");
class BubbleData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBubbleData(t, e) {
    return (e || new BubbleData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBubbleData(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BubbleData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  flowIndex(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new bubble_index_js_1.BubbleIndex()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  waitTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startBubbleData(t) {
    t.startObject(2);
  }
  static addFlowIndex(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addWaitTime(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endBubbleData(t) {
    return t.endObject();
  }
  static createBubbleData(t, e, a) {
    return (
      BubbleData.startBubbleData(t),
      BubbleData.addFlowIndex(t, e),
      BubbleData.addWaitTime(t, a),
      BubbleData.endBubbleData(t)
    );
  }
}
exports.BubbleData = BubbleData;
//# sourceMappingURL=bubble-data.js.map
