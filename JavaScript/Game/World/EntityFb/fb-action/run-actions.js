"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RunActions = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class RunActions {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsRunActions(t, i) {
    return (i || new RunActions()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRunActions(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new RunActions()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  actionList(t, i) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionListLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startRunActions(t) {
    t.startObject(1);
  }
  static addActionList(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createActionListVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startActionListVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endRunActions(t) {
    return t.endObject();
  }
  static createRunActions(t, i) {
    return (
      RunActions.startRunActions(t),
      RunActions.addActionList(t, i),
      RunActions.endRunActions(t)
    );
  }
}
exports.RunActions = RunActions;
//# sourceMappingURL=run-actions.js.map
