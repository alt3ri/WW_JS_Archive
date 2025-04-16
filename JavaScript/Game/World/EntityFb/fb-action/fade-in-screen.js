"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FadeInScreen = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  ease_data_js_1 = require("../fb-action/ease-data.js");
class FadeInScreen {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsFadeInScreen(e, t) {
    return (t || new FadeInScreen()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsFadeInScreen(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FadeInScreen()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  typeOverride() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  ease(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? (e || new ease_data_js_1.EaseData()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  screenType(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  keepFadeAfterTreeEnd() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startFadeInScreen(e) {
    e.startObject(4);
  }
  static addTypeOverride(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addEase(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addScreenType(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addKeepFadeAfterTreeEnd(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static endFadeInScreen(e) {
    return e.endObject();
  }
}
exports.FadeInScreen = FadeInScreen;
//# sourceMappingURL=fade-in-screen.js.map
