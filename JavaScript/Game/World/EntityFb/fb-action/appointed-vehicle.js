"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AppointedVehicle = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AppointedVehicle {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsAppointedVehicle(e, t) {
    return (t || new AppointedVehicle()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsAppointedVehicle(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new AppointedVehicle()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  vehicleId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startAppointedVehicle(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addVehicleId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endAppointedVehicle(e) {
    return e.endObject();
  }
  static createAppointedVehicle(e, t, i) {
    return (
      AppointedVehicle.startAppointedVehicle(e),
      AppointedVehicle.addType(e, t),
      AppointedVehicle.addVehicleId(e, i),
      AppointedVehicle.endAppointedVehicle(e)
    );
  }
}
exports.AppointedVehicle = AppointedVehicle;
//# sourceMappingURL=appointed-vehicle.js.map
