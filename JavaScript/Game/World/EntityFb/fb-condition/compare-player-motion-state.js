"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComparePlayerMotionState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class ComparePlayerMotionState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsComparePlayerMotionState(t, e) {
    return (e || new ComparePlayerMotionState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsComparePlayerMotionState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ComparePlayerMotionState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  motionState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  onlinePlayerConditionTargetOptionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_online_player_condition_target_js_1
          .UnionOnlinePlayerConditionTarget.NONE;
  }
  onlinePlayerConditionTargetOption(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startComparePlayerMotionState(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMotionState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(t, e) {
    t.addFieldInt8(
      3,
      e,
      union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget
        .NONE,
    );
  }
  static addOnlinePlayerConditionTargetOption(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endComparePlayerMotionState(t) {
    return t.endObject();
  }
  static createComparePlayerMotionState(t, e, o, i, a, r) {
    return (
      ComparePlayerMotionState.startComparePlayerMotionState(t),
      ComparePlayerMotionState.addType(t, e),
      ComparePlayerMotionState.addMotionState(t, o),
      ComparePlayerMotionState.addCompare(t, i),
      ComparePlayerMotionState.addOnlinePlayerConditionTargetOptionType(t, a),
      ComparePlayerMotionState.addOnlinePlayerConditionTargetOption(t, r),
      ComparePlayerMotionState.endComparePlayerMotionState(t)
    );
  }
}
exports.ComparePlayerMotionState = ComparePlayerMotionState;
//# sourceMappingURL=compare-player-motion-state.js.map
