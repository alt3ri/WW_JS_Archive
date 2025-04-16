"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnThrowTriggerTimeCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OnThrowTriggerTimeCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsOnThrowTriggerTimeCondition(i, t) {
    return (t || new OnThrowTriggerTimeCondition()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsOnThrowTriggerTimeCondition(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new OnThrowTriggerTimeCondition()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  bulletId() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt64(this.bb_pos + i) : BigInt("0");
  }
  triggerTime() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readFloat32(this.bb_pos + i) : 0;
  }
  static startOnThrowTriggerTimeCondition(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addBulletId(i, t) {
    i.addFieldInt64(1, t, BigInt("0"));
  }
  static addTriggerTime(i, t) {
    i.addFieldFloat32(2, t, 0);
  }
  static endOnThrowTriggerTimeCondition(i) {
    return i.endObject();
  }
  static createOnThrowTriggerTimeCondition(i, t, r, e) {
    return (
      OnThrowTriggerTimeCondition.startOnThrowTriggerTimeCondition(i),
      OnThrowTriggerTimeCondition.addType(i, t),
      OnThrowTriggerTimeCondition.addBulletId(i, r),
      OnThrowTriggerTimeCondition.addTriggerTime(i, e),
      OnThrowTriggerTimeCondition.endOnThrowTriggerTimeCondition(i)
    );
  }
}
exports.OnThrowTriggerTimeCondition = OnThrowTriggerTimeCondition;
//# sourceMappingURL=on-throw-trigger-time-condition.js.map
