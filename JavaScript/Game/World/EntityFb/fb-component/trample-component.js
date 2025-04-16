"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrampleComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  enter_leave_radius_js_1 = require("../fb-common/enter-leave-radius.js"),
  entity_match_js_1 = require("../fb-component/entity-match.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class TrampleComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTrampleComponent(t, i) {
    return (i || new TrampleComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTrampleComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TrampleComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
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
  match(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new entity_match_js_1.EntityMatch()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  matchRoleOption(t, i) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + s) + 4 * t)
      : void 0;
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  downTime() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  stayTime() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  isResetGear() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  showLandTipRadius(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i
      ? (t || new enter_leave_radius_js_1.EnterLeaveRadius()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  stopTeleControlMove() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  enterActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 24);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  enterActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  exitActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 26);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  exitActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startTrampleComponent(t) {
    t.startObject(12);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addMatch(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createMatchRoleOptionTypeVector(i, s) {
    i.startVector(1, s.length, 1);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt8(s[t]);
    return i.endVector();
  }
  static startMatchRoleOptionTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addMatchRoleOption(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createMatchRoleOptionVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addDownTime(t, i) {
    t.addFieldFloat32(5, i, 0);
  }
  static addStayTime(t, i) {
    t.addFieldFloat32(6, i, 0);
  }
  static addIsResetGear(t, i) {
    t.addFieldInt8(7, +i, 0);
  }
  static addShowLandTipRadius(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addStopTeleControlMove(t, i) {
    t.addFieldInt8(9, +i, 0);
  }
  static addEnterActions(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static createEnterActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startEnterActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addExitActions(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static createExitActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startExitActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endTrampleComponent(t) {
    return t.endObject();
  }
}
exports.TrampleComponent = TrampleComponent;
//# sourceMappingURL=trample-component.js.map
