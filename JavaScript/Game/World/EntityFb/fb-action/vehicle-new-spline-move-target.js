"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleNewSplineMoveTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_vehicle_js_1 = require("../fb-action/union-target-vehicle.js");
class VehicleNewSplineMoveTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsVehicleNewSplineMoveTarget(e, t) {
    return (t || new VehicleNewSplineMoveTarget()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsVehicleNewSplineMoveTarget(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new VehicleNewSplineMoveTarget()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  targetVehicleType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_target_vehicle_js_1.UnionTargetVehicle.NONE;
  }
  targetVehicle(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  isLookDir() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startVehicleNewSplineMoveTarget(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTargetVehicleType(e, t) {
    e.addFieldInt8(1, t, union_target_vehicle_js_1.UnionTargetVehicle.NONE);
  }
  static addTargetVehicle(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addIsLookDir(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static endVehicleNewSplineMoveTarget(e) {
    return e.endObject();
  }
  static createVehicleNewSplineMoveTarget(e, t, i, r, s) {
    return (
      VehicleNewSplineMoveTarget.startVehicleNewSplineMoveTarget(e),
      VehicleNewSplineMoveTarget.addType(e, t),
      VehicleNewSplineMoveTarget.addTargetVehicleType(e, i),
      VehicleNewSplineMoveTarget.addTargetVehicle(e, r),
      VehicleNewSplineMoveTarget.addIsLookDir(e, s),
      VehicleNewSplineMoveTarget.endVehicleNewSplineMoveTarget(e)
    );
  }
}
exports.VehicleNewSplineMoveTarget = VehicleNewSplineMoveTarget;
//# sourceMappingURL=vehicle-new-spline-move-target.js.map
