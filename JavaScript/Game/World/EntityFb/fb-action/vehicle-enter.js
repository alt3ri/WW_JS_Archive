"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleEnter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_vehicle_entering_target_js_1 = require("../fb-action/union-vehicle-entering-target.js");
class VehicleEnter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsVehicleEnter(e, t) {
    return (t || new VehicleEnter()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsVehicleEnter(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new VehicleEnter()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  enteringTargetType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_vehicle_entering_target_js_1.UnionVehicleEnteringTarget.NONE;
  }
  enteringTarget(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  seat() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startVehicleEnter(e) {
    e.startObject(3);
  }
  static addEnteringTargetType(e, t) {
    e.addFieldInt8(
      0,
      t,
      union_vehicle_entering_target_js_1.UnionVehicleEnteringTarget.NONE,
    );
  }
  static addEnteringTarget(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addSeat(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endVehicleEnter(e) {
    return e.endObject();
  }
  static createVehicleEnter(e, t, i, r) {
    return (
      VehicleEnter.startVehicleEnter(e),
      VehicleEnter.addEnteringTargetType(e, t),
      VehicleEnter.addEnteringTarget(e, i),
      VehicleEnter.addSeat(e, r),
      VehicleEnter.endVehicleEnter(e)
    );
  }
}
exports.VehicleEnter = VehicleEnter;
//# sourceMappingURL=vehicle-enter.js.map
