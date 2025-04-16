"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableAI = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableAI {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsEnableAI(t, s) {
    return (s || new EnableAI()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnableAI(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new EnableAI()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  entityIds(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + 4 * t) : 0;
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
  isEnable() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEnableAI(t) {
    t.startObject(2);
  }
  static addEntityIds(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static createEntityIdsVector(s, e) {
    s.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) s.addInt32(e[t]);
    return s.endVector();
  }
  static startEntityIdsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addIsEnable(t, s) {
    t.addFieldInt8(1, +s, 0);
  }
  static endEnableAI(t) {
    return t.endObject();
  }
  static createEnableAI(t, s, e) {
    return (
      EnableAI.startEnableAI(t),
      EnableAI.addEntityIds(t, s),
      EnableAI.addIsEnable(t, e),
      EnableAI.endEnableAI(t)
    );
  }
}
exports.EnableAI = EnableAI;
//# sourceMappingURL=enable-ai.js.map
