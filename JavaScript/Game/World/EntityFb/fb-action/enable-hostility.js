"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableHostility = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableHostility {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEnableHostility(t, i) {
    return (i || new EnableHostility()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnableHostility(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EnableHostility()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isEnable() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
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
  static startEnableHostility(t) {
    t.startObject(2);
  }
  static addIsEnable(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createEntityIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt32(s[t]);
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endEnableHostility(t) {
    return t.endObject();
  }
  static createEnableHostility(t, i, s) {
    return (
      EnableHostility.startEnableHostility(t),
      EnableHostility.addIsEnable(t, i),
      EnableHostility.addEntityIds(t, s),
      EnableHostility.endEnableHostility(t)
    );
  }
}
exports.EnableHostility = EnableHostility;
//# sourceMappingURL=enable-hostility.js.map
