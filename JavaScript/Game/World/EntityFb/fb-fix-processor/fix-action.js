"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixAction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class FixAction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFixAction(t, i) {
    return (i || new FixAction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFixAction(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FixAction()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  timing(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  thenActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  thenActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  period() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startFixAction(t) {
    t.startObject(4);
  }
  static addTiming(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addThenActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createThenActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startThenActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addPeriod(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static endFixAction(t) {
    return t.endObject();
  }
}
exports.FixAction = FixAction;
//# sourceMappingURL=fix-action.js.map
