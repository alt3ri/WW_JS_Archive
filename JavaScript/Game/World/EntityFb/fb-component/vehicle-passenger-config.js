"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehiclePassengerConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehiclePassengerConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, s) {
    return (this.bb_pos = e), (this.bb = s), this;
  }
  static getRootAsVehiclePassengerConfig(e, s) {
    return (s || new VehiclePassengerConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsVehiclePassengerConfig(e, s) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new VehiclePassengerConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  passengerNpc() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  seat() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startVehiclePassengerConfig(e) {
    e.startObject(2);
  }
  static addPassengerNpc(e, s) {
    e.addFieldInt32(0, s, 0);
  }
  static addSeat(e, s) {
    e.addFieldInt32(1, s, 0);
  }
  static endVehiclePassengerConfig(e) {
    return e.endObject();
  }
  static createVehiclePassengerConfig(e, s, t) {
    return (
      VehiclePassengerConfig.startVehiclePassengerConfig(e),
      VehiclePassengerConfig.addPassengerNpc(e, s),
      VehiclePassengerConfig.addSeat(e, t),
      VehiclePassengerConfig.endVehiclePassengerConfig(e)
    );
  }
}
exports.VehiclePassengerConfig = VehiclePassengerConfig;
//# sourceMappingURL=vehicle-passenger-config.js.map
