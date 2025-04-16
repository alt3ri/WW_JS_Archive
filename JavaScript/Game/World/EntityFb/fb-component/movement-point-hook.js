"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MovementPointHook = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class MovementPointHook {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsMovementPointHook(t, o) {
    return (o || new MovementPointHook()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMovementPointHook(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new MovementPointHook()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  hookActions(t, o) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (o || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  hookActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  exitHookActions(t, o) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (o || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  exitHookActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  finishActions(t, o) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (o || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  finishActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startMovementPointHook(t) {
    t.startObject(4);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addHookActions(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createHookActionsVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) o.addOffset(i[t]);
    return o.endVector();
  }
  static startHookActionsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addExitHookActions(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static createExitHookActionsVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) o.addOffset(i[t]);
    return o.endVector();
  }
  static startExitHookActionsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addFinishActions(t, o) {
    t.addFieldOffset(3, o, 0);
  }
  static createFinishActionsVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) o.addOffset(i[t]);
    return o.endVector();
  }
  static startFinishActionsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endMovementPointHook(t) {
    return t.endObject();
  }
  static createMovementPointHook(t, o, i, s, e) {
    return (
      MovementPointHook.startMovementPointHook(t),
      MovementPointHook.addType(t, o),
      MovementPointHook.addHookActions(t, i),
      MovementPointHook.addExitHookActions(t, s),
      MovementPointHook.addFinishActions(t, e),
      MovementPointHook.endMovementPointHook(t)
    );
  }
}
exports.MovementPointHook = MovementPointHook;
//# sourceMappingURL=movement-point-hook.js.map
