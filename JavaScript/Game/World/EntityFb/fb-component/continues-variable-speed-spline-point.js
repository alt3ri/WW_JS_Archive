"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ContinuesVariableSpeedSplinePoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_action_js_1 = require("../fb-component/condition-action.js"),
  time_path_config_js_1 = require("../fb-component/time-path-config.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class ContinuesVariableSpeedSplinePoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsContinuesVariableSpeedSplinePoint(t, i) {
    return (i || new ContinuesVariableSpeedSplinePoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsContinuesVariableSpeedSplinePoint(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ContinuesVariableSpeedSplinePoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  position(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  arriveTangent(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  leaveTangent(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  lineType(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  rotation(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  intervalTimePathConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (t || new time_path_config_js_1.TimePathConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  conditionActions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e
      ? (i || new condition_action_js_1.ConditionAction()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  conditionActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  keepSpeed() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startContinuesVariableSpeedSplinePoint(t) {
    t.startObject(8);
  }
  static addPosition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addArriveTangent(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addLeaveTangent(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addLineType(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addRotation(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addIntervalTimePathConfig(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addConditionActions(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static createConditionActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startConditionActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addKeepSpeed(t, i) {
    t.addFieldFloat32(7, i, 0);
  }
  static endContinuesVariableSpeedSplinePoint(t) {
    return t.endObject();
  }
}
exports.ContinuesVariableSpeedSplinePoint = ContinuesVariableSpeedSplinePoint;
//# sourceMappingURL=continues-variable-speed-spline-point.js.map
