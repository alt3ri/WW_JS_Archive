"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RestorePlayerCameraAdjustment = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  reset_focus_config_js_1 = require("../fb-action/reset-focus-config.js");
class RestorePlayerCameraAdjustment {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRestorePlayerCameraAdjustment(e, t) {
    return (t || new RestorePlayerCameraAdjustment()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRestorePlayerCameraAdjustment(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RestorePlayerCameraAdjustment()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  resetFocus(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? (e || new reset_focus_config_js_1.ResetFocusConfig()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  static startRestorePlayerCameraAdjustment(e) {
    e.startObject(1);
  }
  static addResetFocus(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endRestorePlayerCameraAdjustment(e) {
    return e.endObject();
  }
  static createRestorePlayerCameraAdjustment(e, t) {
    return (
      RestorePlayerCameraAdjustment.startRestorePlayerCameraAdjustment(e),
      RestorePlayerCameraAdjustment.addResetFocus(e, t),
      RestorePlayerCameraAdjustment.endRestorePlayerCameraAdjustment(e)
    );
  }
}
exports.RestorePlayerCameraAdjustment = RestorePlayerCameraAdjustment;
//# sourceMappingURL=restore-player-camera-adjustment.js.map
