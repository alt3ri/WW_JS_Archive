"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckPlayerStateRestrictionCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class CheckPlayerStateRestrictionCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCheckPlayerStateRestrictionCondition(t, i) {
    return (i || new CheckPlayerStateRestrictionCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckPlayerStateRestrictionCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CheckPlayerStateRestrictionCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  restrictionId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  onlinePlayerConditionTargetOptionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_online_player_condition_target_js_1
          .UnionOnlinePlayerConditionTarget.NONE;
  }
  onlinePlayerConditionTargetOption(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startCheckPlayerStateRestrictionCondition(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addRestrictionId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(t, i) {
    t.addFieldInt8(
      2,
      i,
      union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget
        .NONE,
    );
  }
  static addOnlinePlayerConditionTargetOption(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endCheckPlayerStateRestrictionCondition(t) {
    return t.endObject();
  }
  static createCheckPlayerStateRestrictionCondition(t, i, e, n, o) {
    return (
      CheckPlayerStateRestrictionCondition.startCheckPlayerStateRestrictionCondition(
        t,
      ),
      CheckPlayerStateRestrictionCondition.addType(t, i),
      CheckPlayerStateRestrictionCondition.addRestrictionId(t, e),
      CheckPlayerStateRestrictionCondition.addOnlinePlayerConditionTargetOptionType(
        t,
        n,
      ),
      CheckPlayerStateRestrictionCondition.addOnlinePlayerConditionTargetOption(
        t,
        o,
      ),
      CheckPlayerStateRestrictionCondition.endCheckPlayerStateRestrictionCondition(
        t,
      )
    );
  }
}
exports.CheckPlayerStateRestrictionCondition =
  CheckPlayerStateRestrictionCondition;
//# sourceMappingURL=check-player-state-restriction-condition.js.map
