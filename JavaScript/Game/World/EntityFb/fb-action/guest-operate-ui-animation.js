"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuestOperateUiAnimation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_guest_operate_ui_animation_js_1 = require("../fb-action/union-guest-operate-ui-animation.js");
class GuestOperateUiAnimation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsGuestOperateUiAnimation(t, i) {
    return (i || new GuestOperateUiAnimation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGuestOperateUiAnimation(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new GuestOperateUiAnimation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  uiAnimationConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_guest_operate_ui_animation_js_1.UnionGuestOperateUiAnimation.NONE;
  }
  uiAnimationConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startGuestOperateUiAnimation(t) {
    t.startObject(2);
  }
  static addUiAnimationConfigType(t, i) {
    t.addFieldInt8(
      0,
      i,
      union_guest_operate_ui_animation_js_1.UnionGuestOperateUiAnimation.NONE,
    );
  }
  static addUiAnimationConfig(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endGuestOperateUiAnimation(t) {
    return t.endObject();
  }
  static createGuestOperateUiAnimation(t, i, e) {
    return (
      GuestOperateUiAnimation.startGuestOperateUiAnimation(t),
      GuestOperateUiAnimation.addUiAnimationConfigType(t, i),
      GuestOperateUiAnimation.addUiAnimationConfig(t, e),
      GuestOperateUiAnimation.endGuestOperateUiAnimation(t)
    );
  }
}
exports.GuestOperateUiAnimation = GuestOperateUiAnimation;
//# sourceMappingURL=guest-operate-ui-animation.js.map
