"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetPlayerPos = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_teammate_teleport_config_js_1 = require("../fb-action/union-teammate-teleport-config.js"),
  union_teleport_config_js_1 = require("../fb-action/union-teleport-config.js"),
  union_teleport_transition_option_js_1 = require("../fb-action/union-teleport-transition-option.js");
class SetPlayerPos {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetPlayerPos(t, e) {
    return (e || new SetPlayerPos()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetPlayerPos(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetPlayerPos()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  telePortConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_teleport_config_js_1.UnionTeleportConfig.NONE;
  }
  telePortConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  teammateTeleportConfigType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_teammate_teleport_config_js_1.UnionTeammateTeleportConfig.NONE;
  }
  teammateTeleportConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  transitionOptionType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_teleport_transition_option_js_1.UnionTeleportTransitionOption
          .NONE;
  }
  transitionOption(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  disableAutoFadeInScreen() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetPlayerPos(t) {
    t.startObject(7);
  }
  static addTelePortConfigType(t, e) {
    t.addFieldInt8(0, e, union_teleport_config_js_1.UnionTeleportConfig.NONE);
  }
  static addTelePortConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addTeammateTeleportConfigType(t, e) {
    t.addFieldInt8(
      2,
      e,
      union_teammate_teleport_config_js_1.UnionTeammateTeleportConfig.NONE,
    );
  }
  static addTeammateTeleportConfig(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addTransitionOptionType(t, e) {
    t.addFieldInt8(
      4,
      e,
      union_teleport_transition_option_js_1.UnionTeleportTransitionOption.NONE,
    );
  }
  static addTransitionOption(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addDisableAutoFadeInScreen(t, e) {
    t.addFieldInt8(6, +e, 0);
  }
  static endSetPlayerPos(t) {
    return t.endObject();
  }
  static createSetPlayerPos(t, e, i, o, s, r, n, a) {
    return (
      SetPlayerPos.startSetPlayerPos(t),
      SetPlayerPos.addTelePortConfigType(t, e),
      SetPlayerPos.addTelePortConfig(t, i),
      SetPlayerPos.addTeammateTeleportConfigType(t, o),
      SetPlayerPos.addTeammateTeleportConfig(t, s),
      SetPlayerPos.addTransitionOptionType(t, r),
      SetPlayerPos.addTransitionOption(t, n),
      SetPlayerPos.addDisableAutoFadeInScreen(t, a),
      SetPlayerPos.endSetPlayerPos(t)
    );
  }
}
exports.SetPlayerPos = SetPlayerPos;
//# sourceMappingURL=set-player-pos.js.map
