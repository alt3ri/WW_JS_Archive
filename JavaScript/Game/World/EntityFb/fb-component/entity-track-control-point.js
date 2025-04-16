"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityTrackControlPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class EntityTrackControlPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityTrackControlPoint(t, i) {
    return (i || new EntityTrackControlPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityTrackControlPoint(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityTrackControlPoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  leftCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  rightCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startEntityTrackControlPoint(t) {
    t.startObject(3);
  }
  static addState(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addLeftCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addRightCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endEntityTrackControlPoint(t) {
    return t.endObject();
  }
}
exports.EntityTrackControlPoint = EntityTrackControlPoint;
//# sourceMappingURL=entity-track-control-point.js.map
