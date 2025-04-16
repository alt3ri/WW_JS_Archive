"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HealthAttribute = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HealthAttribute {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHealthAttribute(t, e) {
    return (e || new HealthAttribute()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHealthAttribute(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HealthAttribute()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  value() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startHealthAttribute(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addValue(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static endHealthAttribute(t) {
    return t.endObject();
  }
  static createHealthAttribute(t, e, i, r) {
    return (
      HealthAttribute.startHealthAttribute(t),
      HealthAttribute.addType(t, e),
      HealthAttribute.addCompare(t, i),
      HealthAttribute.addValue(t, r),
      HealthAttribute.endHealthAttribute(t)
    );
  }
}
exports.HealthAttribute = HealthAttribute;
//# sourceMappingURL=health-attribute.js.map
