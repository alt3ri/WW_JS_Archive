"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimePatrolSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  time_patrol_spline_point_js_1 = require("../fb-component/time-patrol-spline-point.js");
class TimePatrolSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTimePatrolSpline(t, i) {
    return (i || new TimePatrolSpline()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTimePatrolSpline(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TimePatrolSpline()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  points(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (i || new time_patrol_spline_point_js_1.TimePatrolSplinePoint()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startTimePatrolSpline(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPoints(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createPointsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startPointsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endTimePatrolSpline(t) {
    return t.endObject();
  }
  static createTimePatrolSpline(t, i, e) {
    return (
      TimePatrolSpline.startTimePatrolSpline(t),
      TimePatrolSpline.addType(t, i),
      TimePatrolSpline.addPoints(t, e),
      TimePatrolSpline.endTimePatrolSpline(t)
    );
  }
}
exports.TimePatrolSpline = TimePatrolSpline;
//# sourceMappingURL=time-patrol-spline.js.map
