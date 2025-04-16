"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeSelfEntityPrefabPerformance = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeSelfEntityPrefabPerformance {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsChangeSelfEntityPrefabPerformance(e, t) {
    return (t || new ChangeSelfEntityPrefabPerformance()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsChangeSelfEntityPrefabPerformance(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ChangeSelfEntityPrefabPerformance()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  performanceTag(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startChangeSelfEntityPrefabPerformance(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addPerformanceTag(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endChangeSelfEntityPrefabPerformance(e) {
    return e.endObject();
  }
  static createChangeSelfEntityPrefabPerformance(e, t, r) {
    return (
      ChangeSelfEntityPrefabPerformance.startChangeSelfEntityPrefabPerformance(
        e,
      ),
      ChangeSelfEntityPrefabPerformance.addType(e, t),
      ChangeSelfEntityPrefabPerformance.addPerformanceTag(e, r),
      ChangeSelfEntityPrefabPerformance.endChangeSelfEntityPrefabPerformance(e)
    );
  }
}
exports.ChangeSelfEntityPrefabPerformance = ChangeSelfEntityPrefabPerformance;
//# sourceMappingURL=change-self-entity-prefab-performance.js.map
