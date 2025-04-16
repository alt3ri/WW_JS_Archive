"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckOnlinePlayer = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class CheckOnlinePlayer {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, n) {
    return (this.bb_pos = e), (this.bb = n), this;
  }
  static getRootAsCheckOnlinePlayer(e, n) {
    return (n || new CheckOnlinePlayer()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckOnlinePlayer(e, n) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new CheckOnlinePlayer()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var n = this.bb.__offset(this.bb_pos, 4);
    return n ? this.bb.__string(this.bb_pos + n, e) : void 0;
  }
  onlinePlayerConditionTargetOptionType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_online_player_condition_target_js_1
          .UnionOnlinePlayerConditionTarget.NONE;
  }
  onlinePlayerConditionTargetOption(e) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n ? this.bb.__union(e, this.bb_pos + n) : void 0;
  }
  static startCheckOnlinePlayer(e) {
    e.startObject(3);
  }
  static addType(e, n) {
    e.addFieldOffset(0, n, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(e, n) {
    e.addFieldInt8(
      1,
      n,
      union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget
        .NONE,
    );
  }
  static addOnlinePlayerConditionTargetOption(e, n) {
    e.addFieldOffset(2, n, 0);
  }
  static endCheckOnlinePlayer(e) {
    return e.endObject();
  }
  static createCheckOnlinePlayer(e, n, t, i) {
    return (
      CheckOnlinePlayer.startCheckOnlinePlayer(e),
      CheckOnlinePlayer.addType(e, n),
      CheckOnlinePlayer.addOnlinePlayerConditionTargetOptionType(e, t),
      CheckOnlinePlayer.addOnlinePlayerConditionTargetOption(e, i),
      CheckOnlinePlayer.endCheckOnlinePlayer(e)
    );
  }
}
exports.CheckOnlinePlayer = CheckOnlinePlayer;
//# sourceMappingURL=check-online-player.js.map
