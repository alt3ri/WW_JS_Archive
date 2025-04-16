"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StopNewMoveWithSplineAtStartPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopNewMoveWithSplineAtStartPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsStopNewMoveWithSplineAtStartPoint(t, e) {
    return (e || new StopNewMoveWithSplineAtStartPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStopNewMoveWithSplineAtStartPoint(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new StopNewMoveWithSplineAtStartPoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startStopNewMoveWithSplineAtStartPoint(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endStopNewMoveWithSplineAtStartPoint(t) {
    return t.endObject();
  }
  static createStopNewMoveWithSplineAtStartPoint(t, e) {
    return (
      StopNewMoveWithSplineAtStartPoint.startStopNewMoveWithSplineAtStartPoint(
        t,
      ),
      StopNewMoveWithSplineAtStartPoint.addType(t, e),
      StopNewMoveWithSplineAtStartPoint.endStopNewMoveWithSplineAtStartPoint(t)
    );
  }
}
exports.StopNewMoveWithSplineAtStartPoint = StopNewMoveWithSplineAtStartPoint;
//# sourceMappingURL=stop-new-move-with-spline-at-start-point.js.map
