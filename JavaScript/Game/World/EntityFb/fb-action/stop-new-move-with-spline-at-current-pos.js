"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StopNewMoveWithSplineAtCurrentPos = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopNewMoveWithSplineAtCurrentPos {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsStopNewMoveWithSplineAtCurrentPos(t, e) {
    return (e || new StopNewMoveWithSplineAtCurrentPos()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStopNewMoveWithSplineAtCurrentPos(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new StopNewMoveWithSplineAtCurrentPos()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startStopNewMoveWithSplineAtCurrentPos(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endStopNewMoveWithSplineAtCurrentPos(t) {
    return t.endObject();
  }
  static createStopNewMoveWithSplineAtCurrentPos(t, e) {
    return (
      StopNewMoveWithSplineAtCurrentPos.startStopNewMoveWithSplineAtCurrentPos(
        t,
      ),
      StopNewMoveWithSplineAtCurrentPos.addType(t, e),
      StopNewMoveWithSplineAtCurrentPos.endStopNewMoveWithSplineAtCurrentPos(t)
    );
  }
}
exports.StopNewMoveWithSplineAtCurrentPos = StopNewMoveWithSplineAtCurrentPos;
//# sourceMappingURL=stop-new-move-with-spline-at-current-pos.js.map
