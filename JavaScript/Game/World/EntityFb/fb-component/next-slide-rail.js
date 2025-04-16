"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NextSlideRail = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NextSlideRail {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsNextSlideRail(t, i) {
    return (i || new NextSlideRail()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNextSlideRail(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new NextSlideRail()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  triggerKey(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  targetRailEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isFallbackRail() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startNextSlideRail(t) {
    t.startObject(3);
  }
  static addTriggerKey(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetRailEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addIsFallbackRail(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endNextSlideRail(t) {
    return t.endObject();
  }
  static createNextSlideRail(t, i, e, a) {
    return (
      NextSlideRail.startNextSlideRail(t),
      NextSlideRail.addTriggerKey(t, i),
      NextSlideRail.addTargetRailEntityId(t, e),
      NextSlideRail.addIsFallbackRail(t, a),
      NextSlideRail.endNextSlideRail(t)
    );
  }
}
exports.NextSlideRail = NextSlideRail;
//# sourceMappingURL=next-slide-rail.js.map
