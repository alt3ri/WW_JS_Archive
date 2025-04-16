"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleExitNpc = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_exit_vehicle_type_js_1 = require("../fb-action/union-exit-vehicle-type.js");
class VehicleExitNpc {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsVehicleExitNpc(t, e) {
    return (e || new VehicleExitNpc()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVehicleExitNpc(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new VehicleExitNpc()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  targetNpc() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  destroyVehicle() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  exitTypeType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_exit_vehicle_type_js_1.UnionExitVehicleType.NONE;
  }
  exitType(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startVehicleExitNpc(t) {
    t.startObject(4);
  }
  static addTargetNpc(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addDestroyVehicle(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addExitTypeType(t, e) {
    t.addFieldInt8(
      2,
      e,
      union_exit_vehicle_type_js_1.UnionExitVehicleType.NONE,
    );
  }
  static addExitType(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endVehicleExitNpc(t) {
    return t.endObject();
  }
  static createVehicleExitNpc(t, e, i, c, s) {
    return (
      VehicleExitNpc.startVehicleExitNpc(t),
      VehicleExitNpc.addTargetNpc(t, e),
      VehicleExitNpc.addDestroyVehicle(t, i),
      VehicleExitNpc.addExitTypeType(t, c),
      VehicleExitNpc.addExitType(t, s),
      VehicleExitNpc.endVehicleExitNpc(t)
    );
  }
}
exports.VehicleExitNpc = VehicleExitNpc;
//# sourceMappingURL=vehicle-exit-npc.js.map
