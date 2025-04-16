"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityStateComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  lock_config_js_1 = require("../fb-component/lock-config.js"),
  state_change_behavior_js_1 = require("../fb-component/state-change-behavior.js"),
  state_config_js_1 = require("../fb-component/state-config.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class EntityStateComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEntityStateComponent(t, e) {
    return (e || new EntityStateComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityStateComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EntityStateComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  stateChangeCondition(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  stateChangeBehaviors(t, e) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (e || new state_change_behavior_js_1.StateChangeBehavior()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  stateChangeBehaviorsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  instantActionsOnStateChange() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  lockConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e
      ? (t || new lock_config_js_1.LockConfig()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  stateConfigs(t, e) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i
      ? (e || new state_config_js_1.StateConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  stateConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  cycleStates(t, e) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i
      ? this.bb.__string(this.bb.__vector(this.bb_pos + i) + 4 * t, e)
      : void 0;
  }
  cycleStatesLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  prefabPerformanceType(t) {
    var e = this.bb.__offset(this.bb_pos, 22);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startEntityStateComponent(t) {
    t.startObject(10);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addStateChangeCondition(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addStateChangeBehaviors(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createStateChangeBehaviorsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startStateChangeBehaviorsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addInstantActionsOnStateChange(t, e) {
    t.addFieldInt8(5, +e, 0);
  }
  static addLockConfig(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static addStateConfigs(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static createStateConfigsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startStateConfigsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addCycleStates(t, e) {
    t.addFieldOffset(8, e, 0);
  }
  static createCycleStatesVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startCycleStatesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addPrefabPerformanceType(t, e) {
    t.addFieldOffset(9, e, 0);
  }
  static endEntityStateComponent(t) {
    return t.endObject();
  }
}
exports.EntityStateComponent = EntityStateComponent;
//# sourceMappingURL=entity-state-component.js.map
