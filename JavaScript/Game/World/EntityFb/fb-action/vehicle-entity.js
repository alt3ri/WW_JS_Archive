"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleEntity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_vehicle_js_1 = require("../fb-action/union-target-vehicle.js");
class VehicleEntity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsVehicleEntity(t, e) {
    return (e || new VehicleEntity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVehicleEntity(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new VehicleEntity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  vehicleType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_vehicle_js_1.UnionTargetVehicle.NONE;
  }
  vehicle(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startVehicleEntity(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addVehicleType(t, e) {
    t.addFieldInt8(1, e, union_target_vehicle_js_1.UnionTargetVehicle.NONE);
  }
  static addVehicle(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endVehicleEntity(t) {
    return t.endObject();
  }
  static createVehicleEntity(t, e, i, s) {
    return (
      VehicleEntity.startVehicleEntity(t),
      VehicleEntity.addType(t, e),
      VehicleEntity.addVehicleType(t, i),
      VehicleEntity.addVehicle(t, s),
      VehicleEntity.endVehicleEntity(t)
    );
  }
}
exports.VehicleEntity = VehicleEntity;
//# sourceMappingURL=vehicle-entity.js.map
