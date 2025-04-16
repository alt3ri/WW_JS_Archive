"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KiteHook = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class KiteHook {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsKiteHook(t, i) {
    return (i || new KiteHook()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsKiteHook(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new KiteHook()).__init(t.readInt32(t.position()) + t.position(), t)
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
  static startKiteHook(t) {
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
  static endKiteHook(t) {
    return t.endObject();
  }
  static createKiteHook(t, i, o, s, e) {
    return (
      KiteHook.startKiteHook(t),
      KiteHook.addType(t, i),
      KiteHook.addHookActions(t, o),
      KiteHook.addExitHookActions(t, s),
      KiteHook.addFinishActions(t, e),
      KiteHook.endKiteHook(t)
    );
  }
}
exports.KiteHook = KiteHook;
//# sourceMappingURL=kite-hook.js.map
