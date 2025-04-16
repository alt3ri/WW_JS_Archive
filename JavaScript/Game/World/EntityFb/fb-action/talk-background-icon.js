"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkBackgroundIcon = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkBackgroundIcon {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsTalkBackgroundIcon(t, a) {
    return (a || new TalkBackgroundIcon()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTalkBackgroundIcon(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new TalkBackgroundIcon()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  imageAsset(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startTalkBackgroundIcon(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addImageAsset(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static endTalkBackgroundIcon(t) {
    return t.endObject();
  }
  static createTalkBackgroundIcon(t, a, r) {
    return (
      TalkBackgroundIcon.startTalkBackgroundIcon(t),
      TalkBackgroundIcon.addType(t, a),
      TalkBackgroundIcon.addImageAsset(t, r),
      TalkBackgroundIcon.endTalkBackgroundIcon(t)
    );
  }
}
exports.TalkBackgroundIcon = TalkBackgroundIcon;
//# sourceMappingURL=talk-background-icon.js.map
