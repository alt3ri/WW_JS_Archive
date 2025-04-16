"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleSprint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_vehicle_js_1 = require("../fb-action/union-target-vehicle.js");
class VehicleSprint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsVehicleSprint(e, t) {
    return (t || new VehicleSprint()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsVehicleSprint(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new VehicleSprint()).__init(
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
  static startVehicleSprint(e) {
    e.startObject(2);
  }
  static addTargetVehicleType(e, t) {
    e.addFieldInt8(0, t, union_target_vehicle_js_1.UnionTargetVehicle.NONE);
  }
  static addTargetVehicle(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endVehicleSprint(e) {
    return e.endObject();
  }
  static createVehicleSprint(e, t, i) {
    return (
      VehicleSprint.startVehicleSprint(e),
      VehicleSprint.addTargetVehicleType(e, t),
      VehicleSprint.addTargetVehicle(e, i),
      VehicleSprint.endVehicleSprint(e)
    );
  }
}
exports.VehicleSprint = VehicleSprint;
//# sourceMappingURL=vehicle-sprint.js.map
