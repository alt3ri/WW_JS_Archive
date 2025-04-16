"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StopNewMoveWithSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_new_spline_move_target_js_1 = require("../fb-action/union-new-spline-move-target.js"),
  union_stop_new_move_with_spline_type_js_1 = require("../fb-action/union-stop-new-move-with-spline-type.js");
class StopNewMoveWithSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsStopNewMoveWithSpline(t, e) {
    return (e || new StopNewMoveWithSpline()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStopNewMoveWithSpline(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new StopNewMoveWithSpline()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  stopTargetType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_new_spline_move_target_js_1.UnionNewSplineMoveTarget.NONE;
  }
  stopTarget(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  stopTypeType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_stop_new_move_with_spline_type_js_1.UnionStopNewMoveWithSplineType
          .NONE;
  }
  stopType(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startStopNewMoveWithSpline(t) {
    t.startObject(4);
  }
  static addStopTargetType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_new_spline_move_target_js_1.UnionNewSplineMoveTarget.NONE,
    );
  }
  static addStopTarget(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addStopTypeType(t, e) {
    t.addFieldInt8(
      2,
      e,
      union_stop_new_move_with_spline_type_js_1.UnionStopNewMoveWithSplineType
        .NONE,
    );
  }
  static addStopType(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endStopNewMoveWithSpline(t) {
    return t.endObject();
  }
  static createStopNewMoveWithSpline(t, e, i, o, s) {
    return (
      StopNewMoveWithSpline.startStopNewMoveWithSpline(t),
      StopNewMoveWithSpline.addStopTargetType(t, e),
      StopNewMoveWithSpline.addStopTarget(t, i),
      StopNewMoveWithSpline.addStopTypeType(t, o),
      StopNewMoveWithSpline.addStopType(t, s),
      StopNewMoveWithSpline.endStopNewMoveWithSpline(t)
    );
  }
}
exports.StopNewMoveWithSpline = StopNewMoveWithSpline;
//# sourceMappingURL=stop-new-move-with-spline.js.map
