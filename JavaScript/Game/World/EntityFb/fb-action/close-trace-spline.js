"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CloseTraceSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CloseTraceSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCloseTraceSpline(e, t) {
    return (t || new CloseTraceSpline()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCloseTraceSpline(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CloseTraceSpline()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  splineEntityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCloseTraceSpline(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSplineEntityId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endCloseTraceSpline(e) {
    return e.endObject();
  }
  static createCloseTraceSpline(e, t, s) {
    return (
      CloseTraceSpline.startCloseTraceSpline(e),
      CloseTraceSpline.addType(e, t),
      CloseTraceSpline.addSplineEntityId(e, s),
      CloseTraceSpline.endCloseTraceSpline(e)
    );
  }
}
exports.CloseTraceSpline = CloseTraceSpline;
//# sourceMappingURL=close-trace-spline.js.map
