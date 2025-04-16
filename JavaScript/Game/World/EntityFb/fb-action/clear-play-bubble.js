"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClearPlayBubble = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ClearPlayBubble {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsClearPlayBubble(t, e) {
    return (e || new ClearPlayBubble()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsClearPlayBubble(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ClearPlayBubble()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
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
  onlyClearRedDot() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startClearPlayBubble(t) {
    t.startObject(2);
  }
  static addEntityIds(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createEntityIdsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addInt32(r[t]);
    return e.endVector();
  }
  static startEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addOnlyClearRedDot(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endClearPlayBubble(t) {
    return t.endObject();
  }
  static createClearPlayBubble(t, e, r) {
    return (
      ClearPlayBubble.startClearPlayBubble(t),
      ClearPlayBubble.addEntityIds(t, e),
      ClearPlayBubble.addOnlyClearRedDot(t, r),
      ClearPlayBubble.endClearPlayBubble(t)
    );
  }
}
exports.ClearPlayBubble = ClearPlayBubble;
//# sourceMappingURL=clear-play-bubble.js.map
