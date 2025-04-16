"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddPlayBubble = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  bubble_index_js_1 = require("../fb-action/bubble-index.js");
class AddPlayBubble {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsAddPlayBubble(t, s) {
    return (s || new AddPlayBubble()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAddPlayBubble(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new AddPlayBubble()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityIds(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + 4 * t) : 0;
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  enterRadius() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  leaveRadius() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  flow(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (t || new bubble_index_js_1.BubbleIndex()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  waitTime() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  redDot() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startAddPlayBubble(t) {
    t.startObject(6);
  }
  static addEntityIds(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static createEntityIdsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addInt32(i[t]);
    return s.endVector();
  }
  static startEntityIdsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addEnterRadius(t, s) {
    t.addFieldFloat32(1, s, 0);
  }
  static addLeaveRadius(t, s) {
    t.addFieldFloat32(2, s, 0);
  }
  static addFlow(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static addWaitTime(t, s) {
    t.addFieldInt32(4, s, 0);
  }
  static addRedDot(t, s) {
    t.addFieldInt8(5, +s, 0);
  }
  static endAddPlayBubble(t) {
    return t.endObject();
  }
}
exports.AddPlayBubble = AddPlayBubble;
//# sourceMappingURL=add-play-bubble.js.map
