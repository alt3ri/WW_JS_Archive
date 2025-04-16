"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggeredConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class TriggeredConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsTriggeredConfig(i, t) {
    return (t || new TriggeredConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsTriggeredConfig(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new TriggeredConfig()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  condition(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? (i || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  maxTriggerTimes() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  actions(i, t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r
      ? (t || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * i),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
  }
  onlineDisableTip() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startTriggeredConfig(i) {
    i.startObject(4);
  }
  static addCondition(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addMaxTriggerTimes(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addActions(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static createActionsVector(t, r) {
    t.startVector(4, r.length, 4);
    for (let i = r.length - 1; 0 <= i; i--) t.addOffset(r[i]);
    return t.endVector();
  }
  static startActionsVector(i, t) {
    i.startVector(4, t, 4);
  }
  static addOnlineDisableTip(i, t) {
    i.addFieldInt8(3, +t, 0);
  }
  static endTriggeredConfig(i) {
    return i.endObject();
  }
  static createTriggeredConfig(i, t, r, e, s) {
    return (
      TriggeredConfig.startTriggeredConfig(i),
      TriggeredConfig.addCondition(i, t),
      TriggeredConfig.addMaxTriggerTimes(i, r),
      TriggeredConfig.addActions(i, e),
      TriggeredConfig.addOnlineDisableTip(i, s),
      TriggeredConfig.endTriggeredConfig(i)
    );
  }
}
exports.TriggeredConfig = TriggeredConfig;
//# sourceMappingURL=triggered-config.js.map
