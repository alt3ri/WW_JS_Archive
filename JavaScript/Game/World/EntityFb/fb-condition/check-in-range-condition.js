"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckInRangeCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class CheckInRangeCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsCheckInRangeCondition(t, n) {
    return (n || new CheckInRangeCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckInRangeCondition(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new CheckInRangeCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var n = this.bb.__offset(this.bb_pos, 4);
    return n ? this.bb.__string(this.bb_pos + n, t) : void 0;
  }
  rangeEntities(t) {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n ? this.bb.readInt32(this.bb.__vector(this.bb_pos + n) + 4 * t) : 0;
  }
  rangeEntitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  rangeEntitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  inRange() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  onlinePlayerConditionTargetOptionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_online_player_condition_target_js_1
          .UnionOnlinePlayerConditionTarget.NONE;
  }
  onlinePlayerConditionTargetOption(t) {
    var n = this.bb.__offset(this.bb_pos, 12);
    return n ? this.bb.__union(t, this.bb_pos + n) : void 0;
  }
  static startCheckInRangeCondition(t) {
    t.startObject(5);
  }
  static addType(t, n) {
    t.addFieldOffset(0, n, 0);
  }
  static addRangeEntities(t, n) {
    t.addFieldOffset(1, n, 0);
  }
  static createRangeEntitiesVector(n, i) {
    n.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) n.addInt32(i[t]);
    return n.endVector();
  }
  static startRangeEntitiesVector(t, n) {
    t.startVector(4, n, 4);
  }
  static addInRange(t, n) {
    t.addFieldInt8(2, +n, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(t, n) {
    t.addFieldInt8(
      3,
      n,
      union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget
        .NONE,
    );
  }
  static addOnlinePlayerConditionTargetOption(t, n) {
    t.addFieldOffset(4, n, 0);
  }
  static endCheckInRangeCondition(t) {
    return t.endObject();
  }
  static createCheckInRangeCondition(t, n, i, e, o, s) {
    return (
      CheckInRangeCondition.startCheckInRangeCondition(t),
      CheckInRangeCondition.addType(t, n),
      CheckInRangeCondition.addRangeEntities(t, i),
      CheckInRangeCondition.addInRange(t, e),
      CheckInRangeCondition.addOnlinePlayerConditionTargetOptionType(t, o),
      CheckInRangeCondition.addOnlinePlayerConditionTargetOption(t, s),
      CheckInRangeCondition.endCheckInRangeCondition(t)
    );
  }
}
exports.CheckInRangeCondition = CheckInRangeCondition;
//# sourceMappingURL=check-in-range-condition.js.map
