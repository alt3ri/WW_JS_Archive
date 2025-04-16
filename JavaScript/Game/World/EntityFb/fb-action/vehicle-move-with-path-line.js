"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleMoveWithPathLine = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_vehicle_js_1 = require("../fb-action/union-target-vehicle.js"),
  union_vehicle_control_type_js_1 = require("../fb-action/union-vehicle-control-type.js");
class VehicleMoveWithPathLine {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsVehicleMoveWithPathLine(e, t) {
    return (t || new VehicleMoveWithPathLine()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsVehicleMoveWithPathLine(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new VehicleMoveWithPathLine()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  targetVehicleType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_target_vehicle_js_1.UnionTargetVehicle.NONE;
  }
  targetVehicle(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  splineEntityId() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  controlTypeType() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_vehicle_control_type_js_1.UnionVehicleControlType.NONE;
  }
  controlType(e) {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startVehicleMoveWithPathLine(e) {
    e.startObject(5);
  }
  static addTargetVehicleType(e, t) {
    e.addFieldInt8(0, t, union_target_vehicle_js_1.UnionTargetVehicle.NONE);
  }
  static addTargetVehicle(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addSplineEntityId(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static addControlTypeType(e, t) {
    e.addFieldInt8(
      3,
      t,
      union_vehicle_control_type_js_1.UnionVehicleControlType.NONE,
    );
  }
  static addControlType(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static endVehicleMoveWithPathLine(e) {
    return e.endObject();
  }
  static createVehicleMoveWithPathLine(e, t, i, h, n, s) {
    return (
      VehicleMoveWithPathLine.startVehicleMoveWithPathLine(e),
      VehicleMoveWithPathLine.addTargetVehicleType(e, t),
      VehicleMoveWithPathLine.addTargetVehicle(e, i),
      VehicleMoveWithPathLine.addSplineEntityId(e, h),
      VehicleMoveWithPathLine.addControlTypeType(e, n),
      VehicleMoveWithPathLine.addControlType(e, s),
      VehicleMoveWithPathLine.endVehicleMoveWithPathLine(e)
    );
  }
}
exports.VehicleMoveWithPathLine = VehicleMoveWithPathLine;
//# sourceMappingURL=vehicle-move-with-path-line.js.map
