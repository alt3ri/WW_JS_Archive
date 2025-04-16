"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckIsUsingVehicle = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckIsUsingVehicle {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, s) {
    return (this.bb_pos = e), (this.bb = s), this;
  }
  static getRootAsCheckIsUsingVehicle(e, s) {
    return (s || new CheckIsUsingVehicle()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckIsUsingVehicle(e, s) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new CheckIsUsingVehicle()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, e) : void 0;
  }
  targetVehicle() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  seat() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  checkIsBeingUsed() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startCheckIsUsingVehicle(e) {
    e.startObject(4);
  }
  static addType(e, s) {
    e.addFieldOffset(0, s, 0);
  }
  static addTargetVehicle(e, s) {
    e.addFieldInt32(1, s, 0);
  }
  static addSeat(e, s) {
    e.addFieldInt32(2, s, 0);
  }
  static addCheckIsBeingUsed(e, s) {
    e.addFieldInt8(3, +s, 0);
  }
  static endCheckIsUsingVehicle(e) {
    return e.endObject();
  }
  static createCheckIsUsingVehicle(e, s, i, t, h) {
    return (
      CheckIsUsingVehicle.startCheckIsUsingVehicle(e),
      CheckIsUsingVehicle.addType(e, s),
      CheckIsUsingVehicle.addTargetVehicle(e, i),
      CheckIsUsingVehicle.addSeat(e, t),
      CheckIsUsingVehicle.addCheckIsBeingUsed(e, h),
      CheckIsUsingVehicle.endCheckIsUsingVehicle(e)
    );
  }
}
exports.CheckIsUsingVehicle = CheckIsUsingVehicle;
//# sourceMappingURL=check-is-using-vehicle.js.map
