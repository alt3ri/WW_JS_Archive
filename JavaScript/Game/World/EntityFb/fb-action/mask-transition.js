"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MaskTransition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  ease_data_js_1 = require("../fb-action/ease-data.js");
class MaskTransition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsMaskTransition(t, s) {
    return (s || new MaskTransition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMaskTransition(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new MaskTransition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  mask() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  fadeIn(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (t || new ease_data_js_1.EaseData()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  fadeOut(t) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? (t || new ease_data_js_1.EaseData()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startMaskTransition(t) {
    t.startObject(5);
  }
  static addType(t, s) {
    t.addFieldInt8(0, s, 0);
  }
  static addDuration(t, s) {
    t.addFieldFloat32(1, s, 0);
  }
  static addMask(t, s) {
    t.addFieldInt8(2, s, 0);
  }
  static addFadeIn(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static addFadeOut(t, s) {
    t.addFieldOffset(4, s, 0);
  }
  static endMaskTransition(t) {
    return t.endObject();
  }
}
exports.MaskTransition = MaskTransition;
//# sourceMappingURL=mask-transition.js.map
