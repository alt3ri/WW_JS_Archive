"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleEnteringPlayerTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleEnteringPlayerTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsVehicleEnteringPlayerTarget(e, t) {
    return (t || new VehicleEnteringPlayerTarget()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsVehicleEnteringPlayerTarget(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new VehicleEnteringPlayerTarget()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  targetVehicle() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startVehicleEnteringPlayerTarget(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTargetVehicle(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endVehicleEnteringPlayerTarget(e) {
    return e.endObject();
  }
  static createVehicleEnteringPlayerTarget(e, t, r) {
    return (
      VehicleEnteringPlayerTarget.startVehicleEnteringPlayerTarget(e),
      VehicleEnteringPlayerTarget.addType(e, t),
      VehicleEnteringPlayerTarget.addTargetVehicle(e, r),
      VehicleEnteringPlayerTarget.endVehicleEnteringPlayerTarget(e)
    );
  }
}
exports.VehicleEnteringPlayerTarget = VehicleEnteringPlayerTarget;
//# sourceMappingURL=vehicle-entering-player-target.js.map
