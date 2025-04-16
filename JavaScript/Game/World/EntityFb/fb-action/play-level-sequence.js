"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayLevelSequence = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  ease_data_js_1 = require("../fb-action/ease-data.js"),
  union_level_sequence_transition_js_1 = require("../fb-action/union-level-sequence-transition.js");
class PlayLevelSequence {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsPlayLevelSequence(e, t) {
    return (t || new PlayLevelSequence()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPlayLevelSequence(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new PlayLevelSequence()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  levelSequencePath(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  keepUi() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  mark(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  playMode(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  introType() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_level_sequence_transition_js_1.UnionLevelSequenceTransition.NONE;
  }
  intro(e) {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  outroType() {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_level_sequence_transition_js_1.UnionLevelSequenceTransition.NONE;
  }
  outro(e) {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  rate() {
    var e = this.bb.__offset(this.bb_pos, 20);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  rateEase(e) {
    var t = this.bb.__offset(this.bb_pos, 22);
    return t
      ? (e || new ease_data_js_1.EaseData()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  static startPlayLevelSequence(e) {
    e.startObject(10);
  }
  static addLevelSequencePath(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addKeepUi(e, t) {
    e.addFieldInt8(1, +t, 0);
  }
  static addMark(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addPlayMode(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addIntroType(e, t) {
    e.addFieldInt8(
      4,
      t,
      union_level_sequence_transition_js_1.UnionLevelSequenceTransition.NONE,
    );
  }
  static addIntro(e, t) {
    e.addFieldOffset(5, t, 0);
  }
  static addOutroType(e, t) {
    e.addFieldInt8(
      6,
      t,
      union_level_sequence_transition_js_1.UnionLevelSequenceTransition.NONE,
    );
  }
  static addOutro(e, t) {
    e.addFieldOffset(7, t, 0);
  }
  static addRate(e, t) {
    e.addFieldFloat32(8, t, 0);
  }
  static addRateEase(e, t) {
    e.addFieldOffset(9, t, 0);
  }
  static endPlayLevelSequence(e) {
    return e.endObject();
  }
}
exports.PlayLevelSequence = PlayLevelSequence;
//# sourceMappingURL=play-level-sequence.js.map
