"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckEntityDistanceCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-condition/union-target-entity.js");
class CheckEntityDistanceCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCheckEntityDistanceCondition(t, i) {
    return (i || new CheckEntityDistanceCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckEntityDistanceCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CheckEntityDistanceCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  targetAType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  targetA(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  targetBType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  targetB(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  compare(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  distance() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCheckEntityDistanceCondition(t) {
    t.startObject(7);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetAType(t, i) {
    t.addFieldInt8(1, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTargetA(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addTargetBType(t, i) {
    t.addFieldInt8(3, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTargetB(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addCompare(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addDistance(t, i) {
    t.addFieldInt32(6, i, 0);
  }
  static endCheckEntityDistanceCondition(t) {
    return t.endObject();
  }
  static createCheckEntityDistanceCondition(t, i, n, e, s, a, r, o) {
    return (
      CheckEntityDistanceCondition.startCheckEntityDistanceCondition(t),
      CheckEntityDistanceCondition.addType(t, i),
      CheckEntityDistanceCondition.addTargetAType(t, n),
      CheckEntityDistanceCondition.addTargetA(t, e),
      CheckEntityDistanceCondition.addTargetBType(t, s),
      CheckEntityDistanceCondition.addTargetB(t, a),
      CheckEntityDistanceCondition.addCompare(t, r),
      CheckEntityDistanceCondition.addDistance(t, o),
      CheckEntityDistanceCondition.endCheckEntityDistanceCondition(t)
    );
  }
}
exports.CheckEntityDistanceCondition = CheckEntityDistanceCondition;
//# sourceMappingURL=check-entity-distance-condition.js.map
