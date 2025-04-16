"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckIsGramophonePlayingMusic = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  gramophone_check_condition_js_1 = require("../fb-condition/gramophone-check-condition.js");
class CheckIsGramophonePlayingMusic {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCheckIsGramophonePlayingMusic(t, i) {
    return (i || new CheckIsGramophonePlayingMusic()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckIsGramophonePlayingMusic(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CheckIsGramophonePlayingMusic()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  targetGramophone() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  checkCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (
          t || new gramophone_check_condition_js_1.GramophoneCheckCondition()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  static startCheckIsGramophonePlayingMusic(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetGramophone(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addCheckCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endCheckIsGramophonePlayingMusic(t) {
    return t.endObject();
  }
}
exports.CheckIsGramophonePlayingMusic = CheckIsGramophonePlayingMusic;
//# sourceMappingURL=check-is-gramophone-playing-music.js.map
