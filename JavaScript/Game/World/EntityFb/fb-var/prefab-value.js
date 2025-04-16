"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PrefabValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PrefabValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsPrefabValue(e, t) {
    return (t || new PrefabValue()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPrefabValue(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new PrefabValue()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  v() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startPrefabValue(e) {
    e.startObject(1);
  }
  static addV(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static endPrefabValue(e) {
    return e.endObject();
  }
  static createPrefabValue(e, t) {
    return (
      PrefabValue.startPrefabValue(e),
      PrefabValue.addV(e, t),
      PrefabValue.endPrefabValue(e)
    );
  }
}
exports.PrefabValue = PrefabValue;
//# sourceMappingURL=prefab-value.js.map
