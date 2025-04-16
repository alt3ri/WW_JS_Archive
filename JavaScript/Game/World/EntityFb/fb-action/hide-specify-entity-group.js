"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideSpecifyEntityGroup = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideSpecifyEntityGroup {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsHideSpecifyEntityGroup(t, i) {
    return (i || new HideSpecifyEntityGroup()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHideSpecifyEntityGroup(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new HideSpecifyEntityGroup()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  forceClean() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startHideSpecifyEntityGroup(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createEntityIdsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addInt32(e[t]);
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addForceClean(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endHideSpecifyEntityGroup(t) {
    return t.endObject();
  }
  static createHideSpecifyEntityGroup(t, i, e, r) {
    return (
      HideSpecifyEntityGroup.startHideSpecifyEntityGroup(t),
      HideSpecifyEntityGroup.addType(t, i),
      HideSpecifyEntityGroup.addEntityIds(t, e),
      HideSpecifyEntityGroup.addForceClean(t, r),
      HideSpecifyEntityGroup.endHideSpecifyEntityGroup(t)
    );
  }
}
exports.HideSpecifyEntityGroup = HideSpecifyEntityGroup;
//# sourceMappingURL=hide-specify-entity-group.js.map
