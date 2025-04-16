"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkBackgroundImageByMcGender = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkBackgroundImageByMcGender {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, a) {
    return (this.bb_pos = e), (this.bb = a), this;
  }
  static getRootAsTalkBackgroundImageByMcGender(e, a) {
    return (a || new TalkBackgroundImageByMcGender()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsTalkBackgroundImageByMcGender(e, a) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new TalkBackgroundImageByMcGender()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, e) : void 0;
  }
  imageAssetMale(e) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.__string(this.bb_pos + a, e) : void 0;
  }
  imageAssetFemale(e) {
    var a = this.bb.__offset(this.bb_pos, 8);
    return a ? this.bb.__string(this.bb_pos + a, e) : void 0;
  }
  static startTalkBackgroundImageByMcGender(e) {
    e.startObject(3);
  }
  static addType(e, a) {
    e.addFieldOffset(0, a, 0);
  }
  static addImageAssetMale(e, a) {
    e.addFieldOffset(1, a, 0);
  }
  static addImageAssetFemale(e, a) {
    e.addFieldOffset(2, a, 0);
  }
  static endTalkBackgroundImageByMcGender(e) {
    return e.endObject();
  }
  static createTalkBackgroundImageByMcGender(e, a, t, r) {
    return (
      TalkBackgroundImageByMcGender.startTalkBackgroundImageByMcGender(e),
      TalkBackgroundImageByMcGender.addType(e, a),
      TalkBackgroundImageByMcGender.addImageAssetMale(e, t),
      TalkBackgroundImageByMcGender.addImageAssetFemale(e, r),
      TalkBackgroundImageByMcGender.endTalkBackgroundImageByMcGender(e)
    );
  }
}
exports.TalkBackgroundImageByMcGender = TalkBackgroundImageByMcGender;
//# sourceMappingURL=talk-background-image-by-mc-gender.js.map
