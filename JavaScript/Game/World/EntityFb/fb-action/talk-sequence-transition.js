"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkSequenceTransition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkSequenceTransition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsTalkSequenceTransition(e, t) {
    return (t || new TalkSequenceTransition()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsTalkSequenceTransition(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new TalkSequenceTransition()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  optionText(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  optionTextKey(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  nextSequenceIndex() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startTalkSequenceTransition(e) {
    e.startObject(3);
  }
  static addOptionText(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addOptionTextKey(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addNextSequenceIndex(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endTalkSequenceTransition(e) {
    return e.endObject();
  }
  static createTalkSequenceTransition(e, t, i, n) {
    return (
      TalkSequenceTransition.startTalkSequenceTransition(e),
      TalkSequenceTransition.addOptionText(e, t),
      TalkSequenceTransition.addOptionTextKey(e, i),
      TalkSequenceTransition.addNextSequenceIndex(e, n),
      TalkSequenceTransition.endTalkSequenceTransition(e)
    );
  }
}
exports.TalkSequenceTransition = TalkSequenceTransition;
//# sourceMappingURL=talk-sequence-transition.js.map
