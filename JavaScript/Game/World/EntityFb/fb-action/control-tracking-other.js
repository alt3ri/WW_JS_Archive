"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ControlTrackingOther = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ControlTrackingOther {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsControlTrackingOther(t, r) {
    return (r || new ControlTrackingOther()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsControlTrackingOther(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ControlTrackingOther()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  entities(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.readInt32(this.bb.__vector(this.bb_pos + r) + 4 * t) : 0;
  }
  entitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startControlTrackingOther(t) {
    t.startObject(2);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addEntities(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static createEntitiesVector(r, i) {
    r.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) r.addInt32(i[t]);
    return r.endVector();
  }
  static startEntitiesVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endControlTrackingOther(t) {
    return t.endObject();
  }
  static createControlTrackingOther(t, r, i) {
    return (
      ControlTrackingOther.startControlTrackingOther(t),
      ControlTrackingOther.addType(t, r),
      ControlTrackingOther.addEntities(t, i),
      ControlTrackingOther.endControlTrackingOther(t)
    );
  }
}
exports.ControlTrackingOther = ControlTrackingOther;
//# sourceMappingURL=control-tracking-other.js.map
