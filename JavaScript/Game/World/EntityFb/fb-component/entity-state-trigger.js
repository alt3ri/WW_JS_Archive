"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityStateTrigger = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js"),
  entity_group_condition_js_1 = require("../fb-condition/entity-group-condition.js");
class EntityStateTrigger {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityStateTrigger(t, i) {
    return (i || new EntityStateTrigger()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityStateTrigger(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityStateTrigger()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  groupCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new entity_group_condition_js_1.EntityGroupCondition()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  successActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  successActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  failActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  failActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startEntityStateTrigger(t) {
    t.startObject(4);
  }
  static addGroupCondition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addSuccessActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createSuccessActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startSuccessActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFailActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createFailActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startFailActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addCondition(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endEntityStateTrigger(t) {
    return t.endObject();
  }
}
exports.EntityStateTrigger = EntityStateTrigger;
//# sourceMappingURL=entity-state-trigger.js.map
