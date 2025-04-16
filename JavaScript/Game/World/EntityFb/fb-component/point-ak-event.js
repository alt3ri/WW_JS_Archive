"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PointAkEvent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PointAkEvent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsPointAkEvent(t, i) {
    return (i || new PointAkEvent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPointAkEvent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new PointAkEvent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  pointIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  pointIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  pointIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  useListenerCone() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  enableOcclusion() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startPointAkEvent(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPointIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createPointIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt32(s[t]);
    return i.endVector();
  }
  static startPointIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addUseListenerCone(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addEnableOcclusion(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static endPointAkEvent(t) {
    return t.endObject();
  }
  static createPointAkEvent(t, i, s, e, n) {
    return (
      PointAkEvent.startPointAkEvent(t),
      PointAkEvent.addType(t, i),
      PointAkEvent.addPointIds(t, s),
      PointAkEvent.addUseListenerCone(t, e),
      PointAkEvent.addEnableOcclusion(t, n),
      PointAkEvent.endPointAkEvent(t)
    );
  }
}
exports.PointAkEvent = PointAkEvent;
//# sourceMappingURL=point-ak-event.js.map
