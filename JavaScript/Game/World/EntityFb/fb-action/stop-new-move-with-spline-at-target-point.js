"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StopNewMoveWithSplineAtTargetPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopNewMoveWithSplineAtTargetPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsStopNewMoveWithSplineAtTargetPoint(t, e) {
    return (e || new StopNewMoveWithSplineAtTargetPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStopNewMoveWithSplineAtTargetPoint(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new StopNewMoveWithSplineAtTargetPoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  pointId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startStopNewMoveWithSplineAtTargetPoint(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addPointId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endStopNewMoveWithSplineAtTargetPoint(t) {
    return t.endObject();
  }
  static createStopNewMoveWithSplineAtTargetPoint(t, e, i) {
    return (
      StopNewMoveWithSplineAtTargetPoint.startStopNewMoveWithSplineAtTargetPoint(
        t,
      ),
      StopNewMoveWithSplineAtTargetPoint.addType(t, e),
      StopNewMoveWithSplineAtTargetPoint.addPointId(t, i),
      StopNewMoveWithSplineAtTargetPoint.endStopNewMoveWithSplineAtTargetPoint(
        t,
      )
    );
  }
}
exports.StopNewMoveWithSplineAtTargetPoint = StopNewMoveWithSplineAtTargetPoint;
//# sourceMappingURL=stop-new-move-with-spline-at-target-point.js.map
