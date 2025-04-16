"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelSequenceSectionInfo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class LevelSequenceSectionInfo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsLevelSequenceSectionInfo(e, t) {
    return (t || new LevelSequenceSectionInfo()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsLevelSequenceSectionInfo(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new LevelSequenceSectionInfo()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  key(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  frameId() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  state(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  actionList(e, t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  actionListLength() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startLevelSequenceSectionInfo(e) {
    e.startObject(5);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addKey(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addFrameId(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static addState(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addActionList(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static createActionListVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; 0 <= e; e--) t.addOffset(i[e]);
    return t.endVector();
  }
  static startActionListVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endLevelSequenceSectionInfo(e) {
    return e.endObject();
  }
  static createLevelSequenceSectionInfo(e, t, i, n, s, o) {
    return (
      LevelSequenceSectionInfo.startLevelSequenceSectionInfo(e),
      LevelSequenceSectionInfo.addType(e, t),
      LevelSequenceSectionInfo.addKey(e, i),
      LevelSequenceSectionInfo.addFrameId(e, n),
      LevelSequenceSectionInfo.addState(e, s),
      LevelSequenceSectionInfo.addActionList(e, o),
      LevelSequenceSectionInfo.endLevelSequenceSectionInfo(e)
    );
  }
}
exports.LevelSequenceSectionInfo = LevelSequenceSectionInfo;
//# sourceMappingURL=level-sequence-section-info.js.map
