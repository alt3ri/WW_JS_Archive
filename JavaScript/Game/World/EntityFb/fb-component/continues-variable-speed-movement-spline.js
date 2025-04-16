"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ContinuesVariableSpeedMovementSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  continues_variable_speed_spline_point_js_1 = require("../fb-component/continues-variable-speed-spline-point.js"),
  time_path_config_js_1 = require("../fb-component/time-path-config.js");
class ContinuesVariableSpeedMovementSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsContinuesVariableSpeedMovementSpline(e, t) {
    return (t || new ContinuesVariableSpeedMovementSpline()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsContinuesVariableSpeedMovementSpline(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ContinuesVariableSpeedMovementSpline()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  transitionSpeed() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  entireTimePathConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? (e || new time_path_config_js_1.TimePathConfig()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  circleMode() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  points(e, t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (
          t ||
          new continues_variable_speed_spline_point_js_1.ContinuesVariableSpeedSplinePoint()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  pointsLength() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startContinuesVariableSpeedMovementSpline(e) {
    e.startObject(5);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTransitionSpeed(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addEntireTimePathConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addCircleMode(e, t) {
    e.addFieldInt8(3, t, 0);
  }
  static addPoints(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static createPointsVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; 0 <= e; e--) t.addOffset(i[e]);
    return t.endVector();
  }
  static startPointsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endContinuesVariableSpeedMovementSpline(e) {
    return e.endObject();
  }
}
exports.ContinuesVariableSpeedMovementSpline =
  ContinuesVariableSpeedMovementSpline;
//# sourceMappingURL=continues-variable-speed-movement-spline.js.map
