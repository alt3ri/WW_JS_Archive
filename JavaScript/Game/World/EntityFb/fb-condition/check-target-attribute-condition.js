"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckTargetAttributeCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js"),
  union_target_attribute_js_1 = require("../fb-condition/union-target-attribute.js");
class CheckTargetAttributeCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCheckTargetAttributeCondition(t, i) {
    return (i || new CheckTargetAttributeCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckTargetAttributeCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CheckTargetAttributeCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_attribute_js_1.UnionTargetAttribute.NONE;
  }
  option(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  onlinePlayerConditionTargetOptionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_online_player_condition_target_js_1
          .UnionOnlinePlayerConditionTarget.NONE;
  }
  onlinePlayerConditionTargetOption(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startCheckTargetAttributeCondition(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addOptionType(t, i) {
    t.addFieldInt8(1, i, union_target_attribute_js_1.UnionTargetAttribute.NONE);
  }
  static addOption(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(t, i) {
    t.addFieldInt8(
      3,
      i,
      union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget
        .NONE,
    );
  }
  static addOnlinePlayerConditionTargetOption(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endCheckTargetAttributeCondition(t) {
    return t.endObject();
  }
  static createCheckTargetAttributeCondition(t, i, e, n, r, o) {
    return (
      CheckTargetAttributeCondition.startCheckTargetAttributeCondition(t),
      CheckTargetAttributeCondition.addType(t, i),
      CheckTargetAttributeCondition.addOptionType(t, e),
      CheckTargetAttributeCondition.addOption(t, n),
      CheckTargetAttributeCondition.addOnlinePlayerConditionTargetOptionType(
        t,
        r,
      ),
      CheckTargetAttributeCondition.addOnlinePlayerConditionTargetOption(t, o),
      CheckTargetAttributeCondition.endCheckTargetAttributeCondition(t)
    );
  }
}
exports.CheckTargetAttributeCondition = CheckTargetAttributeCondition;
//# sourceMappingURL=check-target-attribute-condition.js.map
