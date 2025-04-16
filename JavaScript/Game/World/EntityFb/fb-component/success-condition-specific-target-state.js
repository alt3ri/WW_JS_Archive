"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SuccessConditionSpecificTargetState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_state_condition_js_1 = require("../fb-condition/entity-state-condition.js");
class SuccessConditionSpecificTargetState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSuccessConditionSpecificTargetState(t, i) {
    return (i || new SuccessConditionSpecificTargetState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSuccessConditionSpecificTargetState(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SuccessConditionSpecificTargetState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  conditions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (i || new entity_state_condition_js_1.EntityStateCondition()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  conditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSuccessConditionSpecificTargetState(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addConditions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createConditionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endSuccessConditionSpecificTargetState(t) {
    return t.endObject();
  }
  static createSuccessConditionSpecificTargetState(t, i, e) {
    return (
      SuccessConditionSpecificTargetState.startSuccessConditionSpecificTargetState(
        t,
      ),
      SuccessConditionSpecificTargetState.addType(t, i),
      SuccessConditionSpecificTargetState.addConditions(t, e),
      SuccessConditionSpecificTargetState.endSuccessConditionSpecificTargetState(
        t,
      )
    );
  }
}
exports.SuccessConditionSpecificTargetState =
  SuccessConditionSpecificTargetState;
//# sourceMappingURL=success-condition-specific-target-state.js.map
