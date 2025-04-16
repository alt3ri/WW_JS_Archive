"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggerComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  entity_match_js_1 = require("../fb-component/entity-match.js"),
  trigger_exit_config_js_1 = require("../fb-component/trigger-exit-config.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class TriggerComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTriggerComponent(t, i) {
    return (i || new TriggerComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTriggerComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TriggerComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  match(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new entity_match_js_1.EntityMatch()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  maxTriggerTimes() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  matchTypeCount() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  actions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  exitConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new trigger_exit_config_js_1.TriggerExitConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  matchRoleOption(t, i) {
    var e = this.bb.__offset(this.bb_pos, 20);
    return e
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + 4 * t)
      : void 0;
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  changeRoleTrigger() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  clientPrePerformance() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  onlineDisableTip() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  onlineAutoExit() {
    var t = this.bb.__offset(this.bb_pos, 28);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startTriggerComponent(t) {
    t.startObject(13);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addMatch(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addMaxTriggerTimes(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addMatchTypeCount(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addExitConfig(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static createMatchRoleOptionTypeVector(i, e) {
    i.startVector(1, e.length, 1);
    for (let t = e.length - 1; 0 <= t; t--) i.addInt8(e[t]);
    return i.endVector();
  }
  static startMatchRoleOptionTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addMatchRoleOption(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static createMatchRoleOptionVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addChangeRoleTrigger(t, i) {
    t.addFieldInt8(9, +i, 0);
  }
  static addClientPrePerformance(t, i) {
    t.addFieldInt8(10, +i, 0);
  }
  static addOnlineDisableTip(t, i) {
    t.addFieldInt8(11, +i, 0);
  }
  static addOnlineAutoExit(t, i) {
    t.addFieldInt8(12, +i, 0);
  }
  static endTriggerComponent(t) {
    return t.endObject();
  }
}
exports.TriggerComponent = TriggerComponent;
//# sourceMappingURL=trigger-component.js.map
