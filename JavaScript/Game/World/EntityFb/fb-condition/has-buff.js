"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HasBuff = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class HasBuff {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsHasBuff(t, i) {
    return (i || new HasBuff()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHasBuff(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new HasBuff()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  buffId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  compare(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
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
  static startHasBuff(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBuffId(t, i) {
    t.addFieldInt64(1, i, BigInt("0"));
  }
  static addCompare(t, i) {
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
  static endHasBuff(t) {
    return t.endObject();
  }
  static createHasBuff(t, i, s, e, n, a) {
    return (
      HasBuff.startHasBuff(t),
      HasBuff.addType(t, i),
      HasBuff.addBuffId(t, s),
      HasBuff.addCompare(t, e),
      HasBuff.addOnlinePlayerConditionTargetOptionType(t, n),
      HasBuff.addOnlinePlayerConditionTargetOption(t, a),
      HasBuff.endHasBuff(t)
    );
  }
}
exports.HasBuff = HasBuff;
//# sourceMappingURL=has-buff.js.map
