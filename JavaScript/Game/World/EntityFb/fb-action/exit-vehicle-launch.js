"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExitVehicleLaunch = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExitVehicleLaunch {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsExitVehicleLaunch(t, e) {
    return (e || new ExitVehicleLaunch()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExitVehicleLaunch(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ExitVehicleLaunch()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startExitVehicleLaunch(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endExitVehicleLaunch(t) {
    return t.endObject();
  }
  static createExitVehicleLaunch(t, e) {
    return (
      ExitVehicleLaunch.startExitVehicleLaunch(t),
      ExitVehicleLaunch.addType(t, e),
      ExitVehicleLaunch.endExitVehicleLaunch(t)
    );
  }
}
exports.ExitVehicleLaunch = ExitVehicleLaunch;
//# sourceMappingURL=exit-vehicle-launch.js.map
