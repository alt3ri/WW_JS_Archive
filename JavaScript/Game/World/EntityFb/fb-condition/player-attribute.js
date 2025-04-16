"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerAttribute = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayerAttribute {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPlayerAttribute(t, e) {
    return (e || new PlayerAttribute()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayerAttribute(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PlayerAttribute()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  option(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  attributeTypesType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readUint8(this.bb.__vector(this.bb_pos + e) + t) : 0;
  }
  attributeTypesTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  attributeTypesTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  attributeTypes(t, e) {
    var r = this.bb.__offset(this.bb_pos, 10);
    return r
      ? this.bb.__union(e, this.bb.__vector(this.bb_pos + r) + 4 * t)
      : void 0;
  }
  attributeTypesLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startPlayerAttribute(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addAttributeTypesType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createAttributeTypesTypeVector(e, r) {
    e.startVector(1, r.length, 1);
    for (let t = r.length - 1; 0 <= t; t--) e.addInt8(r[t]);
    return e.endVector();
  }
  static startAttributeTypesTypeVector(t, e) {
    t.startVector(1, e, 1);
  }
  static addAttributeTypes(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createAttributeTypesVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addOffset(r[t]);
    return e.endVector();
  }
  static startAttributeTypesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endPlayerAttribute(t) {
    return t.endObject();
  }
  static createPlayerAttribute(t, e, r, i, s) {
    return (
      PlayerAttribute.startPlayerAttribute(t),
      PlayerAttribute.addType(t, e),
      PlayerAttribute.addOption(t, r),
      PlayerAttribute.addAttributeTypesType(t, i),
      PlayerAttribute.addAttributeTypes(t, s),
      PlayerAttribute.endPlayerAttribute(t)
    );
  }
}
exports.PlayerAttribute = PlayerAttribute;
//# sourceMappingURL=player-attribute.js.map
