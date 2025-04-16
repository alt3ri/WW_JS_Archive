"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TraceSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TraceSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTraceSpline(t, e) {
    return (e || new TraceSpline()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTraceSpline(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TraceSpline()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  effectPath(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startTraceSpline(t) {
    t.startObject(3);
  }
  static addEffectPath(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addDuration(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addSplineEntityId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endTraceSpline(t) {
    return t.endObject();
  }
  static createTraceSpline(t, e, i, r) {
    return (
      TraceSpline.startTraceSpline(t),
      TraceSpline.addEffectPath(t, e),
      TraceSpline.addDuration(t, i),
      TraceSpline.addSplineEntityId(t, r),
      TraceSpline.endTraceSpline(t)
    );
  }
}
exports.TraceSpline = TraceSpline;
//# sourceMappingURL=trace-spline.js.map
