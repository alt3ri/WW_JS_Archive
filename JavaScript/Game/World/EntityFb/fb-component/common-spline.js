"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  common_spline_point_js_1 = require("../fb-component/common-spline-point.js");
class CommonSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCommonSpline(t, i) {
    return (i || new CommonSpline()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCommonSpline(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CommonSpline()).__init(
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
      ? (i || new common_spline_point_js_1.CommonSplinePoint()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startCommonSpline(t) {
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
  static endCommonSpline(t) {
    return t.endObject();
  }
  static createCommonSpline(t, i, e) {
    return (
      CommonSpline.startCommonSpline(t),
      CommonSpline.addType(t, i),
      CommonSpline.addPoints(t, e),
      CommonSpline.endCommonSpline(t)
    );
  }
}
exports.CommonSpline = CommonSpline;
//# sourceMappingURL=common-spline.js.map
