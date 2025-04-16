"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChessmanPickInteraction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class ChessmanPickInteraction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsChessmanPickInteraction(t, s) {
    return (s || new ChessmanPickInteraction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChessmanPickInteraction(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new ChessmanPickInteraction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  checkedActions(t, s) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (s || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  checkedActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  uncheckedActions(t, s) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (s || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  uncheckedActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  targetChessboard() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  availablePosEffect(t) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  static startChessmanPickInteraction(t) {
    t.startObject(5);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addCheckedActions(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createCheckedActionsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addOffset(i[t]);
    return s.endVector();
  }
  static startCheckedActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addUncheckedActions(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static createUncheckedActionsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addOffset(i[t]);
    return s.endVector();
  }
  static startUncheckedActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addTargetChessboard(t, s) {
    t.addFieldInt32(3, s, 0);
  }
  static addAvailablePosEffect(t, s) {
    t.addFieldOffset(4, s, 0);
  }
  static endChessmanPickInteraction(t) {
    return t.endObject();
  }
  static createChessmanPickInteraction(t, s, i, e, n, c) {
    return (
      ChessmanPickInteraction.startChessmanPickInteraction(t),
      ChessmanPickInteraction.addType(t, s),
      ChessmanPickInteraction.addCheckedActions(t, i),
      ChessmanPickInteraction.addUncheckedActions(t, e),
      ChessmanPickInteraction.addTargetChessboard(t, n),
      ChessmanPickInteraction.addAvailablePosEffect(t, c),
      ChessmanPickInteraction.endChessmanPickInteraction(t)
    );
  }
}
exports.ChessmanPickInteraction = ChessmanPickInteraction;
//# sourceMappingURL=chessman-pick-interaction.js.map
