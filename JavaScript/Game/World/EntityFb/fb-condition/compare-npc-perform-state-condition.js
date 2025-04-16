"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareNpcPerformStateCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareNpcPerformStateCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCompareNpcPerformStateCondition(t, e) {
    return (e || new CompareNpcPerformStateCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCompareNpcPerformStateCondition(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CompareNpcPerformStateCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCompareNpcPerformStateCondition(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endCompareNpcPerformStateCondition(t) {
    return t.endObject();
  }
  static createCompareNpcPerformStateCondition(t, e, r, o, i) {
    return (
      CompareNpcPerformStateCondition.startCompareNpcPerformStateCondition(t),
      CompareNpcPerformStateCondition.addType(t, e),
      CompareNpcPerformStateCondition.addEntityId(t, r),
      CompareNpcPerformStateCondition.addCompare(t, o),
      CompareNpcPerformStateCondition.addState(t, i),
      CompareNpcPerformStateCondition.endCompareNpcPerformStateCondition(t)
    );
  }
}
exports.CompareNpcPerformStateCondition = CompareNpcPerformStateCondition;
//# sourceMappingURL=compare-npc-perform-state-condition.js.map
