"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetSpineAnimation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_set_spine_animation_js_1 = require("../fb-action/union-set-spine-animation.js");
class SetSpineAnimation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsSetSpineAnimation(i, t) {
    return (t || new SetSpineAnimation()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsSetSpineAnimation(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SetSpineAnimation()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  configType() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? this.bb.readUint8(this.bb_pos + i)
      : union_set_spine_animation_js_1.UnionSetSpineAnimation.NONE;
  }
  config(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__union(i, this.bb_pos + t) : void 0;
  }
  static startSetSpineAnimation(i) {
    i.startObject(2);
  }
  static addConfigType(i, t) {
    i.addFieldInt8(
      0,
      t,
      union_set_spine_animation_js_1.UnionSetSpineAnimation.NONE,
    );
  }
  static addConfig(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static endSetSpineAnimation(i) {
    return i.endObject();
  }
  static createSetSpineAnimation(i, t, n) {
    return (
      SetSpineAnimation.startSetSpineAnimation(i),
      SetSpineAnimation.addConfigType(i, t),
      SetSpineAnimation.addConfig(i, n),
      SetSpineAnimation.endSetSpineAnimation(i)
    );
  }
}
exports.SetSpineAnimation = SetSpineAnimation;
//# sourceMappingURL=set-spine-animation.js.map
