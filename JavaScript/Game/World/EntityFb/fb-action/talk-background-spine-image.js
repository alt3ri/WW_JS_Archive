"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkBackgroundSpineImage = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkBackgroundSpineImage {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, e) {
    return (this.bb_pos = a), (this.bb = e), this;
  }
  static getRootAsTalkBackgroundSpineImage(a, e) {
    return (e || new TalkBackgroundSpineImage()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsTalkBackgroundSpineImage(a, e) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TalkBackgroundSpineImage()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  type(a) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, a) : void 0;
  }
  id() {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.readInt32(this.bb_pos + a) : 0;
  }
  isLoop() {
    var a = this.bb.__offset(this.bb_pos, 8);
    return !!a && !!this.bb.readInt8(this.bb_pos + a);
  }
  static startTalkBackgroundSpineImage(a) {
    a.startObject(3);
  }
  static addType(a, e) {
    a.addFieldOffset(0, e, 0);
  }
  static addId(a, e) {
    a.addFieldInt32(1, e, 0);
  }
  static addIsLoop(a, e) {
    a.addFieldInt8(2, +e, 0);
  }
  static endTalkBackgroundSpineImage(a) {
    return a.endObject();
  }
  static createTalkBackgroundSpineImage(a, e, t, i) {
    return (
      TalkBackgroundSpineImage.startTalkBackgroundSpineImage(a),
      TalkBackgroundSpineImage.addType(a, e),
      TalkBackgroundSpineImage.addId(a, t),
      TalkBackgroundSpineImage.addIsLoop(a, i),
      TalkBackgroundSpineImage.endTalkBackgroundSpineImage(a)
    );
  }
}
exports.TalkBackgroundSpineImage = TalkBackgroundSpineImage;
//# sourceMappingURL=talk-background-spine-image.js.map
