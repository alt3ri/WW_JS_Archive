"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BubbleIndex = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BubbleIndex {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBubbleIndex(t, e) {
    return (e || new BubbleIndex()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBubbleIndex(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BubbleIndex()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  flowListName(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  flowId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  stateId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startBubbleIndex(t) {
    t.startObject(3);
  }
  static addFlowListName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addFlowId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addStateId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endBubbleIndex(t) {
    return t.endObject();
  }
  static createBubbleIndex(t, e, s, i) {
    return (
      BubbleIndex.startBubbleIndex(t),
      BubbleIndex.addFlowListName(t, e),
      BubbleIndex.addFlowId(t, s),
      BubbleIndex.addStateId(t, i),
      BubbleIndex.endBubbleIndex(t)
    );
  }
}
exports.BubbleIndex = BubbleIndex;
//# sourceMappingURL=bubble-index.js.map
