"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DurationCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DurationCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsDurationCondition(t, i) {
    return (i || new DurationCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDurationCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new DurationCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  refill() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startDurationCondition(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addDuration(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addRefill(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endDurationCondition(t) {
    return t.endObject();
  }
  static createDurationCondition(t, i, n, o) {
    return (
      DurationCondition.startDurationCondition(t),
      DurationCondition.addType(t, i),
      DurationCondition.addDuration(t, n),
      DurationCondition.addRefill(t, o),
      DurationCondition.endDurationCondition(t)
    );
  }
}
exports.DurationCondition = DurationCondition;
//# sourceMappingURL=duration-condition.js.map
