"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeTargetEntityPrefabPerformance = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeTargetEntityPrefabPerformance {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsChangeTargetEntityPrefabPerformance(e, t) {
    return (t || new ChangeTargetEntityPrefabPerformance()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsChangeTargetEntityPrefabPerformance(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ChangeTargetEntityPrefabPerformance()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  entityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  performanceTag(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startChangeTargetEntityPrefabPerformance(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addEntityId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addPerformanceTag(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endChangeTargetEntityPrefabPerformance(e) {
    return e.endObject();
  }
  static createChangeTargetEntityPrefabPerformance(e, t, r, a) {
    return (
      ChangeTargetEntityPrefabPerformance.startChangeTargetEntityPrefabPerformance(
        e,
      ),
      ChangeTargetEntityPrefabPerformance.addType(e, t),
      ChangeTargetEntityPrefabPerformance.addEntityId(e, r),
      ChangeTargetEntityPrefabPerformance.addPerformanceTag(e, a),
      ChangeTargetEntityPrefabPerformance.endChangeTargetEntityPrefabPerformance(
        e,
      )
    );
  }
}
exports.ChangeTargetEntityPrefabPerformance =
  ChangeTargetEntityPrefabPerformance;
//# sourceMappingURL=change-target-entity-prefab-performance.js.map
