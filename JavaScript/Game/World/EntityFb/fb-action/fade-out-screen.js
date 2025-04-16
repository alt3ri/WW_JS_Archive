"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FadeOutScreen = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  ease_data_js_1 = require("../fb-action/ease-data.js");
class FadeOutScreen {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsFadeOutScreen(e, t) {
    return (t || new FadeOutScreen()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsFadeOutScreen(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FadeOutScreen()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  ease(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? (e || new ease_data_js_1.EaseData()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  static startFadeOutScreen(e) {
    e.startObject(1);
  }
  static addEase(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endFadeOutScreen(e) {
    return e.endObject();
  }
  static createFadeOutScreen(e, t) {
    return (
      FadeOutScreen.startFadeOutScreen(e),
      FadeOutScreen.addEase(e, t),
      FadeOutScreen.endFadeOutScreen(e)
    );
  }
}
exports.FadeOutScreen = FadeOutScreen;
//# sourceMappingURL=fade-out-screen.js.map
