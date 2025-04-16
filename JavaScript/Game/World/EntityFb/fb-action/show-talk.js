"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowTalk = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  record_talk_sequence_transition_js_1 = require("../fb-action/record-talk-sequence-transition.js"),
  show_talk_frame_event_js_1 = require("../fb-action/show-talk-frame-event.js"),
  show_talk_outline_js_1 = require("../fb-action/show-talk-outline.js"),
  talk_item_js_1 = require("../fb-action/talk-item.js"),
  int_array_js_1 = require("../fb-var/int-array.js");
class ShowTalk {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsShowTalk(t, e) {
    return (e || new ShowTalk()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsShowTalk(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ShowTalk()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  resetCamera() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  talkItems(t, e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (e || new talk_item_js_1.TalkItem()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  talkItemsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  talkOutline(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new show_talk_outline_js_1.ShowTalkOutline()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  sequenceDataAsset(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  talkFrameEvents(t, e) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? (e || new show_talk_frame_event_js_1.ShowTalkFrameEvent()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  talkFrameEventsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  talkSequence(t, e) {
    var s = this.bb.__offset(this.bb_pos, 14);
    return s
      ? (e || new int_array_js_1.IntArray()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  talkSequenceLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  sequenceNames(t, e) {
    var s = this.bb.__offset(this.bb_pos, 16);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, e)
      : void 0;
  }
  sequenceNamesLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  sequenceTransitions(t, e) {
    var s = this.bb.__offset(this.bb_pos, 18);
    return s
      ? (
          e ||
          new record_talk_sequence_transition_js_1.RecordTalkSequenceTransition()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  sequenceTransitionsLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  saveFinalPos() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startShowTalk(t) {
    t.startObject(9);
  }
  static addResetCamera(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addTalkItems(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createTalkItemsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startTalkItemsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTalkOutline(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addSequenceDataAsset(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addTalkFrameEvents(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createTalkFrameEventsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startTalkFrameEventsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTalkSequence(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createTalkSequenceVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startTalkSequenceVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSequenceNames(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static createSequenceNamesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startSequenceNamesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSequenceTransitions(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static createSequenceTransitionsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startSequenceTransitionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSaveFinalPos(t, e) {
    t.addFieldInt8(8, +e, 0);
  }
  static endShowTalk(t) {
    return t.endObject();
  }
}
exports.ShowTalk = ShowTalk;
//# sourceMappingURL=show-talk.js.map
