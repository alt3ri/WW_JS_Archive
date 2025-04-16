"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CurrentVehicle = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CurrentVehicle {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCurrentVehicle(e, t) {
    return (t || new CurrentVehicle()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCurrentVehicle(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CurrentVehicle()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startCurrentVehicle(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endCurrentVehicle(e) {
    return e.endObject();
  }
  static createCurrentVehicle(e, t) {
    return (
      CurrentVehicle.startCurrentVehicle(e),
      CurrentVehicle.addType(e, t),
      CurrentVehicle.endCurrentVehicle(e)
    );
  }
}
exports.CurrentVehicle = CurrentVehicle;
//# sourceMappingURL=current-vehicle.js.map
