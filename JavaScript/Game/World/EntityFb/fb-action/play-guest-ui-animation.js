"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayGuestUiAnimation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_play_guest_ui_animation_type_js_1 = require("../fb-action/union-play-guest-ui-animation-type.js");
class PlayGuestUiAnimation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsPlayGuestUiAnimation(t, i) {
    return (i || new PlayGuestUiAnimation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayGuestUiAnimation(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new PlayGuestUiAnimation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  playGuestUiAnimationType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_play_guest_ui_animation_type_js_1.UnionPlayGuestUiAnimationType
          .NONE;
  }
  playGuestUiAnimation(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startPlayGuestUiAnimation(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPlayGuestUiAnimationType(t, i) {
    t.addFieldInt8(
      1,
      i,
      union_play_guest_ui_animation_type_js_1.UnionPlayGuestUiAnimationType
        .NONE,
    );
  }
  static addPlayGuestUiAnimation(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endPlayGuestUiAnimation(t) {
    return t.endObject();
  }
  static createPlayGuestUiAnimation(t, i, a, s) {
    return (
      PlayGuestUiAnimation.startPlayGuestUiAnimation(t),
      PlayGuestUiAnimation.addType(t, i),
      PlayGuestUiAnimation.addPlayGuestUiAnimationType(t, a),
      PlayGuestUiAnimation.addPlayGuestUiAnimation(t, s),
      PlayGuestUiAnimation.endPlayGuestUiAnimation(t)
    );
  }
}
exports.PlayGuestUiAnimation = PlayGuestUiAnimation;
//# sourceMappingURL=play-guest-ui-animation.js.map
