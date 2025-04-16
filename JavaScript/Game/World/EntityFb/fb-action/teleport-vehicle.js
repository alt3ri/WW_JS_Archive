"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportVehicle = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_vehicle_js_1 = require("../fb-action/union-target-vehicle.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class TeleportVehicle {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleportVehicle(t, e) {
    return (e || new TeleportVehicle()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportVehicle(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleportVehicle()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  targetVehicleType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_vehicle_js_1.UnionTargetVehicle.NONE;
  }
  targetVehicle(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  pos(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  rot(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  appointedDock() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isTeleportNoLoading() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startTeleportVehicle(t) {
    t.startObject(6);
  }
  static addTargetVehicleType(t, e) {
    t.addFieldInt8(0, e, union_target_vehicle_js_1.UnionTargetVehicle.NONE);
  }
  static addTargetVehicle(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPos(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addRot(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addAppointedDock(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addIsTeleportNoLoading(t, e) {
    t.addFieldInt8(5, +e, 0);
  }
  static endTeleportVehicle(t) {
    return t.endObject();
  }
}
exports.TeleportVehicle = TeleportVehicle;
//# sourceMappingURL=teleport-vehicle.js.map
