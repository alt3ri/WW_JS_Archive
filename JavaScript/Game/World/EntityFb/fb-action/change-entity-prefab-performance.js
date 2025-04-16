"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeEntityPrefabPerformance = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeEntityPrefabPerformance {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsChangeEntityPrefabPerformance(e, t) {
    return (t || new ChangeEntityPrefabPerformance()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsChangeEntityPrefabPerformance(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ChangeEntityPrefabPerformance()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startChangeEntityPrefabPerformance(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endChangeEntityPrefabPerformance(e) {
    return e.endObject();
  }
  static createChangeEntityPrefabPerformance(e, t) {
    return (
      ChangeEntityPrefabPerformance.startChangeEntityPrefabPerformance(e),
      ChangeEntityPrefabPerformance.addType(e, t),
      ChangeEntityPrefabPerformance.endChangeEntityPrefabPerformance(e)
    );
  }
}
exports.ChangeEntityPrefabPerformance = ChangeEntityPrefabPerformance;
//# sourceMappingURL=change-entity-prefab-performance.js.map
