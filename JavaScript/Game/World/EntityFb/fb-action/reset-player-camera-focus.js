"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResetPlayerCameraFocus = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_reset_player_focus_type_js_1 = require("../fb-action/union-reset-player-focus-type.js");
class ResetPlayerCameraFocus {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsResetPlayerCameraFocus(e, t) {
    return (t || new ResetPlayerCameraFocus()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsResetPlayerCameraFocus(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ResetPlayerCameraFocus()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  resetTypeType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_reset_player_focus_type_js_1.UnionResetPlayerFocusType.NONE;
  }
  resetType(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  fadeInTime() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  cannotInterrupt() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  duration() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  static startResetPlayerCameraFocus(e) {
    e.startObject(5);
  }
  static addResetTypeType(e, t) {
    e.addFieldInt8(
      0,
      t,
      union_reset_player_focus_type_js_1.UnionResetPlayerFocusType.NONE,
    );
  }
  static addResetType(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addFadeInTime(e, t) {
    e.addFieldFloat32(2, t, 0);
  }
  static addCannotInterrupt(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static addDuration(e, t) {
    e.addFieldFloat32(4, t, 0);
  }
  static endResetPlayerCameraFocus(e) {
    return e.endObject();
  }
  static createResetPlayerCameraFocus(e, t, s, r, a, i) {
    return (
      ResetPlayerCameraFocus.startResetPlayerCameraFocus(e),
      ResetPlayerCameraFocus.addResetTypeType(e, t),
      ResetPlayerCameraFocus.addResetType(e, s),
      ResetPlayerCameraFocus.addFadeInTime(e, r),
      ResetPlayerCameraFocus.addCannotInterrupt(e, a),
      ResetPlayerCameraFocus.addDuration(e, i),
      ResetPlayerCameraFocus.endResetPlayerCameraFocus(e)
    );
  }
}
exports.ResetPlayerCameraFocus = ResetPlayerCameraFocus;
//# sourceMappingURL=reset-player-camera-focus.js.map
