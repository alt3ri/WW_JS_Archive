"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StopNewMoveWithSplineAtEndPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopNewMoveWithSplineAtEndPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsStopNewMoveWithSplineAtEndPoint(t, e) {
    return (e || new StopNewMoveWithSplineAtEndPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStopNewMoveWithSplineAtEndPoint(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new StopNewMoveWithSplineAtEndPoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startStopNewMoveWithSplineAtEndPoint(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endStopNewMoveWithSplineAtEndPoint(t) {
    return t.endObject();
  }
  static createStopNewMoveWithSplineAtEndPoint(t, e) {
    return (
      StopNewMoveWithSplineAtEndPoint.startStopNewMoveWithSplineAtEndPoint(t),
      StopNewMoveWithSplineAtEndPoint.addType(t, e),
      StopNewMoveWithSplineAtEndPoint.endStopNewMoveWithSplineAtEndPoint(t)
    );
  }
}
exports.StopNewMoveWithSplineAtEndPoint = StopNewMoveWithSplineAtEndPoint;
//# sourceMappingURL=stop-new-move-with-spline-at-end-point.js.map
