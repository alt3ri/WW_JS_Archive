"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckGameplayTagCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-condition/union-target-entity.js");
class CheckGameplayTagCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsCheckGameplayTagCondition(t, a) {
    return (a || new CheckGameplayTagCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckGameplayTagCondition(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new CheckGameplayTagCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  target(t) {
    var a = this.bb.__offset(this.bb_pos, 8);
    return a ? this.bb.__union(t, this.bb_pos + a) : void 0;
  }
  gameplayTag(t) {
    var a = this.bb.__offset(this.bb_pos, 10);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  compare(t) {
    var a = this.bb.__offset(this.bb_pos, 12);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startCheckGameplayTagCondition(t) {
    t.startObject(5);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addTargetType(t, a) {
    t.addFieldInt8(1, a, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static addGameplayTag(t, a) {
    t.addFieldOffset(3, a, 0);
  }
  static addCompare(t, a) {
    t.addFieldOffset(4, a, 0);
  }
  static endCheckGameplayTagCondition(t) {
    return t.endObject();
  }
  static createCheckGameplayTagCondition(t, a, i, e, n, o) {
    return (
      CheckGameplayTagCondition.startCheckGameplayTagCondition(t),
      CheckGameplayTagCondition.addType(t, a),
      CheckGameplayTagCondition.addTargetType(t, i),
      CheckGameplayTagCondition.addTarget(t, e),
      CheckGameplayTagCondition.addGameplayTag(t, n),
      CheckGameplayTagCondition.addCompare(t, o),
      CheckGameplayTagCondition.endCheckGameplayTagCondition(t)
    );
  }
}
exports.CheckGameplayTagCondition = CheckGameplayTagCondition;
//# sourceMappingURL=check-gameplay-tag-condition.js.map
