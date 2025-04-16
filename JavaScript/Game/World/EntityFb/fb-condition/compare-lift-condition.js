"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareLiftCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareLiftCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCompareLiftCondition(t, i) {
    return (i || new CompareLiftCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCompareLiftCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CompareLiftCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  isSelf() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  compare(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  location() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCompareLiftCondition(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addIsSelf(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addCompare(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addLocation(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endCompareLiftCondition(t) {
    return t.endObject();
  }
  static createCompareLiftCondition(t, i, o, e, r, s) {
    return (
      CompareLiftCondition.startCompareLiftCondition(t),
      CompareLiftCondition.addType(t, i),
      CompareLiftCondition.addIsSelf(t, o),
      CompareLiftCondition.addEntityId(t, e),
      CompareLiftCondition.addCompare(t, r),
      CompareLiftCondition.addLocation(t, s),
      CompareLiftCondition.endCompareLiftCondition(t)
    );
  }
}
exports.CompareLiftCondition = CompareLiftCondition;
//# sourceMappingURL=compare-lift-condition.js.map
