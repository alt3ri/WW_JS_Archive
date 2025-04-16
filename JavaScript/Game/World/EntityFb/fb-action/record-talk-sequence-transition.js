"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecordTalkSequenceTransition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  talk_sequence_transition_js_1 = require("../fb-action/talk-sequence-transition.js");
class RecordTalkSequenceTransition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRecordTalkSequenceTransition(e, t) {
    return (t || new RecordTalkSequenceTransition()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRecordTalkSequenceTransition(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RecordTalkSequenceTransition()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  key() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  value(e, t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (
          t || new talk_sequence_transition_js_1.TalkSequenceTransition()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  valueLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startRecordTalkSequenceTransition(e) {
    e.startObject(2);
  }
  static addKey(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addValue(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createValueVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; 0 <= e; e--) t.addOffset(i[e]);
    return t.endVector();
  }
  static startValueVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endRecordTalkSequenceTransition(e) {
    return e.endObject();
  }
  static createRecordTalkSequenceTransition(e, t, i) {
    return (
      RecordTalkSequenceTransition.startRecordTalkSequenceTransition(e),
      RecordTalkSequenceTransition.addKey(e, t),
      RecordTalkSequenceTransition.addValue(e, i),
      RecordTalkSequenceTransition.endRecordTalkSequenceTransition(e)
    );
  }
}
exports.RecordTalkSequenceTransition = RecordTalkSequenceTransition;
//# sourceMappingURL=record-talk-sequence-transition.js.map
