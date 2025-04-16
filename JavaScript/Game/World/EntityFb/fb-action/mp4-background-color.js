"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Mp4BackgroundColor = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Mp4BackgroundColor {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, t) {
    return (this.bb_pos = r), (this.bb = t), this;
  }
  static getRootAsMp4BackgroundColor(r, t) {
    return (t || new Mp4BackgroundColor()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsMp4BackgroundColor(r, t) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new Mp4BackgroundColor()).__init(
        r.readInt32(r.position()) + r.position(),
        r,
      )
    );
  }
  fadeIn(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, r) : void 0;
  }
  fadeOut(r) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, r) : void 0;
  }
  static startMp4BackgroundColor(r) {
    r.startObject(2);
  }
  static addFadeIn(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addFadeOut(r, t) {
    r.addFieldOffset(1, t, 0);
  }
  static endMp4BackgroundColor(r) {
    return r.endObject();
  }
  static createMp4BackgroundColor(r, t, o) {
    return (
      Mp4BackgroundColor.startMp4BackgroundColor(r),
      Mp4BackgroundColor.addFadeIn(r, t),
      Mp4BackgroundColor.addFadeOut(r, o),
      Mp4BackgroundColor.endMp4BackgroundColor(r)
    );
  }
}
exports.Mp4BackgroundColor = Mp4BackgroundColor;
//# sourceMappingURL=mp4-background-color.js.map
