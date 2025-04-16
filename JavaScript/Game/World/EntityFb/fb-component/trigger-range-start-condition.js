"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggerRangeStartCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TriggerRangeStartCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsTriggerRangeStartCondition(t, r) {
    return (r || new TriggerRangeStartCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTriggerRangeStartCondition(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new TriggerRangeStartCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  range() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startTriggerRangeStartCondition(t) {
    t.startObject(2);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static addRange(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endTriggerRangeStartCondition(t) {
    return t.endObject();
  }
  static createTriggerRangeStartCondition(t, r, i) {
    return (
      TriggerRangeStartCondition.startTriggerRangeStartCondition(t),
      TriggerRangeStartCondition.addType(t, r),
      TriggerRangeStartCondition.addRange(t, i),
      TriggerRangeStartCondition.endTriggerRangeStartCondition(t)
    );
  }
}
exports.TriggerRangeStartCondition = TriggerRangeStartCondition;
//# sourceMappingURL=trigger-range-start-condition.js.map
