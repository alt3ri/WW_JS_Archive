"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StopGuestUiAnimation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_stop_guest_ui_animation_type_js_1 = require("../fb-action/union-stop-guest-ui-animation-type.js");
class StopGuestUiAnimation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsStopGuestUiAnimation(t, i) {
    return (i || new StopGuestUiAnimation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStopGuestUiAnimation(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new StopGuestUiAnimation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  stopGuestUiAnimationType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_stop_guest_ui_animation_type_js_1.UnionStopGuestUiAnimationType
          .NONE;
  }
  stopGuestUiAnimation(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startStopGuestUiAnimation(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addStopGuestUiAnimationType(t, i) {
    t.addFieldInt8(
      1,
      i,
      union_stop_guest_ui_animation_type_js_1.UnionStopGuestUiAnimationType
        .NONE,
    );
  }
  static addStopGuestUiAnimation(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endStopGuestUiAnimation(t) {
    return t.endObject();
  }
  static createStopGuestUiAnimation(t, i, s, n) {
    return (
      StopGuestUiAnimation.startStopGuestUiAnimation(t),
      StopGuestUiAnimation.addType(t, i),
      StopGuestUiAnimation.addStopGuestUiAnimationType(t, s),
      StopGuestUiAnimation.addStopGuestUiAnimation(t, n),
      StopGuestUiAnimation.endStopGuestUiAnimation(t)
    );
  }
}
exports.StopGuestUiAnimation = StopGuestUiAnimation;
//# sourceMappingURL=stop-guest-ui-animation.js.map
