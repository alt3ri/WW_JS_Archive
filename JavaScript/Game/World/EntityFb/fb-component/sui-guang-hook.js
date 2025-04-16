"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SuiGuangHook = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class SuiGuangHook {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSuiGuangHook(t, i) {
    return (i || new SuiGuangHook()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSuiGuangHook(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SuiGuangHook()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  hookActions(t, i) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  hookActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  exitHookActions(t, i) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  exitHookActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  finishActions(t, i) {
    var o = this.bb.__offset(this.bb_pos, 10);
    return o
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  finishActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSuiGuangHook(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addHookActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createHookActionsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; 0 <= t; t--) i.addOffset(o[t]);
    return i.endVector();
  }
  static startHookActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addExitHookActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createExitHookActionsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; 0 <= t; t--) i.addOffset(o[t]);
    return i.endVector();
  }
  static startExitHookActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFinishActions(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createFinishActionsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; 0 <= t; t--) i.addOffset(o[t]);
    return i.endVector();
  }
  static startFinishActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endSuiGuangHook(t) {
    return t.endObject();
  }
  static createSuiGuangHook(t, i, o, s, n) {
    return (
      SuiGuangHook.startSuiGuangHook(t),
      SuiGuangHook.addType(t, i),
      SuiGuangHook.addHookActions(t, o),
      SuiGuangHook.addExitHookActions(t, s),
      SuiGuangHook.addFinishActions(t, n),
      SuiGuangHook.endSuiGuangHook(t)
    );
  }
}
exports.SuiGuangHook = SuiGuangHook;
//# sourceMappingURL=sui-guang-hook.js.map
