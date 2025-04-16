"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChessmanComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class ChessmanComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsChessmanComponent(t, s) {
    return (s || new ChessmanComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChessmanComponent(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new ChessmanComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  startMovingActions(t, s) {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n
      ? (s || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  startMovingActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  endMovingActions(t, s) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n
      ? (s || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  endMovingActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startChessmanComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static addStartMovingActions(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createStartMovingActionsVector(s, n) {
    s.startVector(4, n.length, 4);
    for (let t = n.length - 1; 0 <= t; t--) s.addOffset(n[t]);
    return s.endVector();
  }
  static startStartMovingActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addEndMovingActions(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static createEndMovingActionsVector(s, n) {
    s.startVector(4, n.length, 4);
    for (let t = n.length - 1; 0 <= t; t--) s.addOffset(n[t]);
    return s.endVector();
  }
  static startEndMovingActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endChessmanComponent(t) {
    return t.endObject();
  }
  static createChessmanComponent(t, s, n, e) {
    return (
      ChessmanComponent.startChessmanComponent(t),
      ChessmanComponent.addDisabled(t, s),
      ChessmanComponent.addStartMovingActions(t, n),
      ChessmanComponent.addEndMovingActions(t, e),
      ChessmanComponent.endChessmanComponent(t)
    );
  }
}
exports.ChessmanComponent = ChessmanComponent;
//# sourceMappingURL=chessman-component.js.map
