"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetPlotMode = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  fade_in_screen_js_1 = require("../fb-action/fade-in-screen.js");
class SetPlotMode {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSetPlotMode(t, i) {
    return (i || new SetPlotMode()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetPlotMode(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SetPlotMode()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  mode(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  isSwitchMainRole() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  useFlowCamera() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  interruptible() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  noSkip() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  disableAutoFadeOut() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  waitForPlayerMotionEnd() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  noUiEnterAnimation() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  fastFadeIn(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i
      ? (t || new fade_in_screen_js_1.FadeInScreen()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  keepMainRolePose() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetPlotMode(t) {
    t.startObject(10);
  }
  static addMode(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addIsSwitchMainRole(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addUseFlowCamera(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addInterruptible(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static addNoSkip(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static addDisableAutoFadeOut(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addWaitForPlayerMotionEnd(t, i) {
    t.addFieldInt8(6, +i, 0);
  }
  static addNoUiEnterAnimation(t, i) {
    t.addFieldInt8(7, +i, 0);
  }
  static addFastFadeIn(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addKeepMainRolePose(t, i) {
    t.addFieldInt8(9, +i, 0);
  }
  static endSetPlotMode(t) {
    return t.endObject();
  }
}
exports.SetPlotMode = SetPlotMode;
//# sourceMappingURL=set-plot-mode.js.map
