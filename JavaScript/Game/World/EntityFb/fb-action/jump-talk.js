"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JumpTalk = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class JumpTalk {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsJumpTalk(t, s) {
    return (s || new JumpTalk()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsJumpTalk(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new JumpTalk()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  talkId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startJumpTalk(t) {
    t.startObject(1);
  }
  static addTalkId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static endJumpTalk(t) {
    return t.endObject();
  }
  static createJumpTalk(t, s) {
    return (
      JumpTalk.startJumpTalk(t),
      JumpTalk.addTalkId(t, s),
      JumpTalk.endJumpTalk(t)
    );
  }
}
exports.JumpTalk = JumpTalk;
//# sourceMappingURL=jump-talk.js.map
