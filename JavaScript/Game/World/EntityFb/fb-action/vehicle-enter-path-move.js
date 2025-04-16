"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleEnterPathMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_spline_move_pattern_js_1 = require("../fb-action/union-spline-move-pattern.js"),
  vehicle_cruising_params_js_1 = require("../fb-action/vehicle-cruising-params.js");
class VehicleEnterPathMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsVehicleEnterPathMove(t, e) {
    return (e || new VehicleEnterPathMove()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVehicleEnterPathMove(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new VehicleEnterPathMove()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  controlParams(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new vehicle_cruising_params_js_1.VehicleCruisingParams()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  patternType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_spline_move_pattern_js_1.UnionSplineMovePattern.NONE;
  }
  pattern(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startVehicleEnterPathMove(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addControlParams(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPatternType(t, e) {
    t.addFieldInt8(
      2,
      e,
      union_spline_move_pattern_js_1.UnionSplineMovePattern.NONE,
    );
  }
  static addPattern(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endVehicleEnterPathMove(t) {
    return t.endObject();
  }
}
exports.VehicleEnterPathMove = VehicleEnterPathMove;
//# sourceMappingURL=vehicle-enter-path-move.js.map
