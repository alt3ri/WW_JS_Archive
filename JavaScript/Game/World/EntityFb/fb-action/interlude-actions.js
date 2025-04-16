"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InterludeActions = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class InterludeActions {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsInterludeActions(t, s) {
    return (s || new InterludeActions()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInterludeActions(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new InterludeActions()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  interludeActionList(t, s) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (s || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  interludeActionListLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  destroyEntityIds(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + 4 * t) : 0;
  }
  destroyEntityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  destroyEntityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  isFadeIn() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isFadeOut() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startInterludeActions(t) {
    t.startObject(4);
  }
  static addInterludeActionList(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static createInterludeActionListVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addOffset(i[t]);
    return s.endVector();
  }
  static startInterludeActionListVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addDestroyEntityIds(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createDestroyEntityIdsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addInt32(i[t]);
    return s.endVector();
  }
  static startDestroyEntityIdsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addIsFadeIn(t, s) {
    t.addFieldInt8(2, +s, 0);
  }
  static addIsFadeOut(t, s) {
    t.addFieldInt8(3, +s, 0);
  }
  static endInterludeActions(t) {
    return t.endObject();
  }
  static createInterludeActions(t, s, i, e, r) {
    return (
      InterludeActions.startInterludeActions(t),
      InterludeActions.addInterludeActionList(t, s),
      InterludeActions.addDestroyEntityIds(t, i),
      InterludeActions.addIsFadeIn(t, e),
      InterludeActions.addIsFadeOut(t, r),
      InterludeActions.endInterludeActions(t)
    );
  }
}
exports.InterludeActions = InterludeActions;
//# sourceMappingURL=interlude-actions.js.map
