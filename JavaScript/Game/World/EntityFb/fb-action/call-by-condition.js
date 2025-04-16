"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CallByCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  conditions_js_1 = require("../fb-action/conditions.js");
class CallByCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCallByCondition(t, i) {
    return (i || new CallByCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCallByCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CallByCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  conditions(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new conditions_js_1.Conditions()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  trueActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  trueActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  falseActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  falseActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startCallByCondition(t) {
    t.startObject(3);
  }
  static addConditions(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTrueActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createTrueActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startTrueActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFalseActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createFalseActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startFalseActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCallByCondition(t) {
    return t.endObject();
  }
  static createCallByCondition(t, i, s, n) {
    return (
      CallByCondition.startCallByCondition(t),
      CallByCondition.addConditions(t, i),
      CallByCondition.addTrueActions(t, s),
      CallByCondition.addFalseActions(t, n),
      CallByCondition.endCallByCondition(t)
    );
  }
}
exports.CallByCondition = CallByCondition;
//# sourceMappingURL=call-by-condition.js.map
