"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkBackgroundImage = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkBackgroundImage {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, t) {
    return (this.bb_pos = a), (this.bb = t), this;
  }
  static getRootAsTalkBackgroundImage(a, t) {
    return (t || new TalkBackgroundImage()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsTalkBackgroundImage(a, t) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new TalkBackgroundImage()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0;
  }
  imageAsset(a) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0;
  }
  static startTalkBackgroundImage(a) {
    a.startObject(2);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static addImageAsset(a, t) {
    a.addFieldOffset(1, t, 0);
  }
  static endTalkBackgroundImage(a) {
    return a.endObject();
  }
  static createTalkBackgroundImage(a, t, e) {
    return (
      TalkBackgroundImage.startTalkBackgroundImage(a),
      TalkBackgroundImage.addType(a, t),
      TalkBackgroundImage.addImageAsset(a, e),
      TalkBackgroundImage.endTalkBackgroundImage(a)
    );
  }
}
exports.TalkBackgroundImage = TalkBackgroundImage;
//# sourceMappingURL=talk-background-image.js.map
