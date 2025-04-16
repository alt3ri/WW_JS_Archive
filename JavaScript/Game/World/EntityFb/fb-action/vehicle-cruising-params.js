"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleCruisingParams = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleCruisingParams {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, r) {
    return (this.bb_pos = i), (this.bb = r), this;
  }
  static getRootAsVehicleCruisingParams(i, r) {
    return (r || new VehicleCruisingParams()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsVehicleCruisingParams(i, r) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new VehicleCruisingParams()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  forwardSpeed() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.readFloat32(this.bb_pos + i) : 0;
  }
  forwardAcceleration() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readFloat32(this.bb_pos + i) : 0;
  }
  disableSprint() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startVehicleCruisingParams(i) {
    i.startObject(3);
  }
  static addForwardSpeed(i, r) {
    i.addFieldFloat32(0, r, 0);
  }
  static addForwardAcceleration(i, r) {
    i.addFieldFloat32(1, r, 0);
  }
  static addDisableSprint(i, r) {
    i.addFieldInt8(2, +r, 0);
  }
  static endVehicleCruisingParams(i) {
    return i.endObject();
  }
  static createVehicleCruisingParams(i, r, s, e) {
    return (
      VehicleCruisingParams.startVehicleCruisingParams(i),
      VehicleCruisingParams.addForwardSpeed(i, r),
      VehicleCruisingParams.addForwardAcceleration(i, s),
      VehicleCruisingParams.addDisableSprint(i, e),
      VehicleCruisingParams.endVehicleCruisingParams(i)
    );
  }
}
exports.VehicleCruisingParams = VehicleCruisingParams;
//# sourceMappingURL=vehicle-cruising-params.js.map
