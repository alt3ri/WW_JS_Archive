"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideSpecificEntities = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideSpecificEntities {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsHideSpecificEntities(t, i) {
    return (i || new HideSpecificEntities()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHideSpecificEntities(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new HideSpecificEntities()).__init(
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
  static startHideSpecificEntities(t) {
    t.startObject(1);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createEntityIdsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addInt32(e[t]);
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endHideSpecificEntities(t) {
    return t.endObject();
  }
  static createHideSpecificEntities(t, i) {
    return (
      HideSpecificEntities.startHideSpecificEntities(t),
      HideSpecificEntities.addEntityIds(t, i),
      HideSpecificEntities.endHideSpecificEntities(t)
    );
  }
}
exports.HideSpecificEntities = HideSpecificEntities;
//# sourceMappingURL=hide-specific-entities.js.map
