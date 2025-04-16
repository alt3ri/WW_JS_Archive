"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResetFocusConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  base_curve_js_1 = require("../fb-action/base-curve.js");
class ResetFocusConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsResetFocusConfig(e, t) {
    return (t || new ResetFocusConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsResetFocusConfig(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ResetFocusConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  fadeInTime() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  fadeInCurve(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? (e || new base_curve_js_1.BaseCurve()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  static startResetFocusConfig(e) {
    e.startObject(2);
  }
  static addFadeInTime(e, t) {
    e.addFieldFloat32(0, t, 0);
  }
  static addFadeInCurve(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endResetFocusConfig(e) {
    return e.endObject();
  }
}
exports.ResetFocusConfig = ResetFocusConfig;
//# sourceMappingURL=reset-focus-config.js.map
