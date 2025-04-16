"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckEntityPosition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_range_js_1 = require("../fb-shape/union-range.js");
class CheckEntityPosition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCheckEntityPosition(t, i) {
    return (i || new CheckEntityPosition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckEntityPosition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CheckEntityPosition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  rangeType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_range_js_1.UnionRange.NONE;
  }
  range(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  isOnRange() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCheckEntityPosition(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addRangeType(t, i) {
    t.addFieldInt8(2, i, union_range_js_1.UnionRange.NONE);
  }
  static addRange(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addIsOnRange(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static endCheckEntityPosition(t) {
    return t.endObject();
  }
  static createCheckEntityPosition(t, i, s, n, e, o) {
    return (
      CheckEntityPosition.startCheckEntityPosition(t),
      CheckEntityPosition.addType(t, i),
      CheckEntityPosition.addEntityId(t, s),
      CheckEntityPosition.addRangeType(t, n),
      CheckEntityPosition.addRange(t, e),
      CheckEntityPosition.addIsOnRange(t, o),
      CheckEntityPosition.endCheckEntityPosition(t)
    );
  }
}
exports.CheckEntityPosition = CheckEntityPosition;
//# sourceMappingURL=check-entity-position.js.map
