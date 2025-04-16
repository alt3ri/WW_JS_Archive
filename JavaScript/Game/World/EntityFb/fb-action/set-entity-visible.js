"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetEntityVisible = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetEntityVisible {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSetEntityVisible(t, i) {
    return (i || new SetEntityVisible()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetEntityVisible(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SetEntityVisible()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
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
  visible() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetEntityVisible(t) {
    t.startObject(2);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createEntityIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt32(s[t]);
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addVisible(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static endSetEntityVisible(t) {
    return t.endObject();
  }
  static createSetEntityVisible(t, i, s) {
    return (
      SetEntityVisible.startSetEntityVisible(t),
      SetEntityVisible.addEntityIds(t, i),
      SetEntityVisible.addVisible(t, s),
      SetEntityVisible.endSetEntityVisible(t)
    );
  }
}
exports.SetEntityVisible = SetEntityVisible;
//# sourceMappingURL=set-entity-visible.js.map
