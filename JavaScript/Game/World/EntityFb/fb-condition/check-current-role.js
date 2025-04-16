"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckCurrentRole = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class CheckCurrentRole {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckCurrentRole(t, e) {
    return (e || new CheckCurrentRole()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckCurrentRole(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckCurrentRole()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  roleId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
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
  static startCheckCurrentRole(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addRoleId(t, e) {
    t.addFieldInt32(1, e, 0);
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
  static endCheckCurrentRole(t) {
    return t.endObject();
  }
  static createCheckCurrentRole(t, e, r, i, n, o) {
    return (
      CheckCurrentRole.startCheckCurrentRole(t),
      CheckCurrentRole.addType(t, e),
      CheckCurrentRole.addRoleId(t, r),
      CheckCurrentRole.addCompare(t, i),
      CheckCurrentRole.addOnlinePlayerConditionTargetOptionType(t, n),
      CheckCurrentRole.addOnlinePlayerConditionTargetOption(t, o),
      CheckCurrentRole.endCheckCurrentRole(t)
    );
  }
}
exports.CheckCurrentRole = CheckCurrentRole;
//# sourceMappingURL=check-current-role.js.map
