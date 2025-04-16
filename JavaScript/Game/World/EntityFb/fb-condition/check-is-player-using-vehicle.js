"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckIsPlayerUsingVehicle = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_online_player_condition_target_js_1 = require("../fb-condition/union-online-player-condition-target.js");
class CheckIsPlayerUsingVehicle {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsCheckIsPlayerUsingVehicle(e, i) {
    return (i || new CheckIsPlayerUsingVehicle()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckIsPlayerUsingVehicle(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CheckIsPlayerUsingVehicle()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  vehicleType(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  checkType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  onlinePlayerConditionTargetOptionType() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_online_player_condition_target_js_1
          .UnionOnlinePlayerConditionTarget.NONE;
  }
  onlinePlayerConditionTargetOption(e) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__union(e, this.bb_pos + i) : void 0;
  }
  static startCheckIsPlayerUsingVehicle(e) {
    e.startObject(5);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addVehicleType(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static addCheckType(e, i) {
    e.addFieldInt8(2, +i, 0);
  }
  static addOnlinePlayerConditionTargetOptionType(e, i) {
    e.addFieldInt8(
      3,
      i,
      union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget
        .NONE,
    );
  }
  static addOnlinePlayerConditionTargetOption(e, i) {
    e.addFieldOffset(4, i, 0);
  }
  static endCheckIsPlayerUsingVehicle(e) {
    return e.endObject();
  }
  static createCheckIsPlayerUsingVehicle(e, i, t, s, n, r) {
    return (
      CheckIsPlayerUsingVehicle.startCheckIsPlayerUsingVehicle(e),
      CheckIsPlayerUsingVehicle.addType(e, i),
      CheckIsPlayerUsingVehicle.addVehicleType(e, t),
      CheckIsPlayerUsingVehicle.addCheckType(e, s),
      CheckIsPlayerUsingVehicle.addOnlinePlayerConditionTargetOptionType(e, n),
      CheckIsPlayerUsingVehicle.addOnlinePlayerConditionTargetOption(e, r),
      CheckIsPlayerUsingVehicle.endCheckIsPlayerUsingVehicle(e)
    );
  }
}
exports.CheckIsPlayerUsingVehicle = CheckIsPlayerUsingVehicle;
//# sourceMappingURL=check-is-player-using-vehicle.js.map
