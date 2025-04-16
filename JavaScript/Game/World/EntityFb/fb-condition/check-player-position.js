"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckPlayerPosition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_range_js_1 = require("../fb-shape/union-range.js");
class CheckPlayerPosition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckPlayerPosition(t, e) {
    return (e || new CheckPlayerPosition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckPlayerPosition(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckPlayerPosition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  rangeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_range_js_1.UnionRange.NONE;
  }
  range(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  isOnRange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCheckPlayerPosition(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addRangeType(t, e) {
    t.addFieldInt8(1, e, union_range_js_1.UnionRange.NONE);
  }
  static addRange(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addIsOnRange(t, e) {
    t.addFieldInt8(3, +e, 0);
  }
  static endCheckPlayerPosition(t) {
    return t.endObject();
  }
  static createCheckPlayerPosition(t, e, i, s, r) {
    return (
      CheckPlayerPosition.startCheckPlayerPosition(t),
      CheckPlayerPosition.addType(t, e),
      CheckPlayerPosition.addRangeType(t, i),
      CheckPlayerPosition.addRange(t, s),
      CheckPlayerPosition.addIsOnRange(t, r),
      CheckPlayerPosition.endCheckPlayerPosition(t)
    );
  }
}
exports.CheckPlayerPosition = CheckPlayerPosition;
//# sourceMappingURL=check-player-position.js.map
