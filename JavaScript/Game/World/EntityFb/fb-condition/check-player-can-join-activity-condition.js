"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckPlayerCanJoinActivityCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_check_player_can_join_activity_js_1 = require("../fb-condition/union-check-player-can-join-activity.js");
class CheckPlayerCanJoinActivityCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsCheckPlayerCanJoinActivityCondition(i, t) {
    return (t || new CheckPlayerCanJoinActivityCondition()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsCheckPlayerCanJoinActivityCondition(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckPlayerCanJoinActivityCondition()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  configType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? this.bb.readUint8(this.bb_pos + i)
      : union_check_player_can_join_activity_js_1
          .UnionCheckPlayerCanJoinActivity.NONE;
  }
  config(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(i, this.bb_pos + t) : void 0;
  }
  static startCheckPlayerCanJoinActivityCondition(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addConfigType(i, t) {
    i.addFieldInt8(
      1,
      t,
      union_check_player_can_join_activity_js_1.UnionCheckPlayerCanJoinActivity
        .NONE,
    );
  }
  static addConfig(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endCheckPlayerCanJoinActivityCondition(i) {
    return i.endObject();
  }
  static createCheckPlayerCanJoinActivityCondition(i, t, n, e) {
    return (
      CheckPlayerCanJoinActivityCondition.startCheckPlayerCanJoinActivityCondition(
        i,
      ),
      CheckPlayerCanJoinActivityCondition.addType(i, t),
      CheckPlayerCanJoinActivityCondition.addConfigType(i, n),
      CheckPlayerCanJoinActivityCondition.addConfig(i, e),
      CheckPlayerCanJoinActivityCondition.endCheckPlayerCanJoinActivityCondition(
        i,
      )
    );
  }
}
exports.CheckPlayerCanJoinActivityCondition =
  CheckPlayerCanJoinActivityCondition;
//# sourceMappingURL=check-player-can-join-activity-condition.js.map
