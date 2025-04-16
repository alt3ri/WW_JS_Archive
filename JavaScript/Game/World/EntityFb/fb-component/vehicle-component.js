"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  passenger_teleport_config_js_1 = require("../fb-component/passenger-teleport-config.js"),
  vehicle_passenger_config_js_1 = require("../fb-component/vehicle-passenger-config.js");
class VehicleComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsVehicleComponent(t, e) {
    return (e || new VehicleComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVehicleComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new VehicleComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  vehicleBornTag(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  vehicleBornTagLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  vehicleBornTagArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  vehicleRiddenTag(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  vehicleRiddenTagLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  vehicleRiddenTagArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  roleRiddingTag(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  roleRiddingTagLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  roleRiddingTagArray() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  teleportPlayersWhenDestroyed(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e
      ? (
          t || new passenger_teleport_config_js_1.PassengerTeleportConfig()
        ).__init(this.bb.__indirect(this.bb_pos + e), this.bb)
      : void 0;
  }
  vehicleFeaturesType(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e ? this.bb.readUint8(this.bb.__vector(this.bb_pos + e) + t) : 0;
  }
  vehicleFeaturesTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  vehicleFeaturesTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  vehicleFeatures(t, e) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i
      ? this.bb.__union(e, this.bb.__vector(this.bb_pos + i) + 4 * t)
      : void 0;
  }
  vehicleFeaturesLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  seatCount() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  driverSeat() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  defaultPassengers(t, e) {
    var i = this.bb.__offset(this.bb_pos, 24);
    return i
      ? (
          e || new vehicle_passenger_config_js_1.VehiclePassengerConfig()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  defaultPassengersLength() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startVehicleComponent(t) {
    t.startObject(11);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addVehicleBornTag(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createVehicleBornTagVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt32(i[t]);
    return e.endVector();
  }
  static startVehicleBornTagVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addVehicleRiddenTag(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createVehicleRiddenTagVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt32(i[t]);
    return e.endVector();
  }
  static startVehicleRiddenTagVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addRoleRiddingTag(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createRoleRiddingTagVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt32(i[t]);
    return e.endVector();
  }
  static startRoleRiddingTagVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTeleportPlayersWhenDestroyed(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addVehicleFeaturesType(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static createVehicleFeaturesTypeVector(e, i) {
    e.startVector(1, i.length, 1);
    for (let t = i.length - 1; 0 <= t; t--) e.addInt8(i[t]);
    return e.endVector();
  }
  static startVehicleFeaturesTypeVector(t, e) {
    t.startVector(1, e, 1);
  }
  static addVehicleFeatures(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static createVehicleFeaturesVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startVehicleFeaturesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSeatCount(t, e) {
    t.addFieldInt8(8, e, 0);
  }
  static addDriverSeat(t, e) {
    t.addFieldInt32(9, e, 0);
  }
  static addDefaultPassengers(t, e) {
    t.addFieldOffset(10, e, 0);
  }
  static createDefaultPassengersVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startDefaultPassengersVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endVehicleComponent(t) {
    return t.endObject();
  }
}
exports.VehicleComponent = VehicleComponent;
//# sourceMappingURL=vehicle-component.js.map
