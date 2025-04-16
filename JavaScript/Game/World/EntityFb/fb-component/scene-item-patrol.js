"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemPatrol = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_scene_item_ai_patrol_type_js_1 = require("../fb-component/union-scene-item-ai-patrol-type.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class SceneItemPatrol {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSceneItemPatrol(t, e) {
    return (e || new SceneItemPatrol()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSceneItemPatrol(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SceneItemPatrol()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  enableCondition(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  disableCondition(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  hideWhenDisable() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  patrolTypeType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_scene_item_ai_patrol_type_js_1.UnionSceneItemAiPatrolType.NONE;
  }
  patrolType(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startSceneItemPatrol(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEnableCondition(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addDisableCondition(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addHideWhenDisable(t, e) {
    t.addFieldInt8(3, +e, 0);
  }
  static addPatrolTypeType(t, e) {
    t.addFieldInt8(
      4,
      e,
      union_scene_item_ai_patrol_type_js_1.UnionSceneItemAiPatrolType.NONE,
    );
  }
  static addPatrolType(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static endSceneItemPatrol(t) {
    return t.endObject();
  }
}
exports.SceneItemPatrol = SceneItemPatrol;
//# sourceMappingURL=scene-item-patrol.js.map
