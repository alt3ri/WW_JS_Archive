"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAIState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_level_aibehaviour_js_1 = require("../fb-component/union-level-aibehaviour.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class LevelAIState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsLevelAIState(t, e) {
    return (e || new LevelAIState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLevelAIState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new LevelAIState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  stateId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  stateName(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  condition(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  behaviourType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_level_aibehaviour_js_1.UnionLevelAIBehaviour.NONE;
  }
  behaviour(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startLevelAIState(t) {
    t.startObject(5);
  }
  static addStateId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addStateName(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addCondition(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addBehaviourType(t, e) {
    t.addFieldInt8(
      3,
      e,
      union_level_aibehaviour_js_1.UnionLevelAIBehaviour.NONE,
    );
  }
  static addBehaviour(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endLevelAIState(t) {
    return t.endObject();
  }
}
exports.LevelAIState = LevelAIState;
//# sourceMappingURL=level-aistate.js.map
