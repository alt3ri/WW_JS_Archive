"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleWaterfallClimbGravityConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleWaterfallClimbGravityConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsVehicleWaterfallClimbGravityConfig(i, t) {
    return (t || new VehicleWaterfallClimbGravityConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsVehicleWaterfallClimbGravityConfig(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new VehicleWaterfallClimbGravityConfig()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  safePositionEntityId() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  gravityDirection(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startVehicleWaterfallClimbGravityConfig(i) {
    i.startObject(2);
  }
  static addSafePositionEntityId(i, t) {
    i.addFieldInt32(0, t, 0);
  }
  static addGravityDirection(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static endVehicleWaterfallClimbGravityConfig(i) {
    return i.endObject();
  }
  static createVehicleWaterfallClimbGravityConfig(i, t, e) {
    return (
      VehicleWaterfallClimbGravityConfig.startVehicleWaterfallClimbGravityConfig(
        i,
      ),
      VehicleWaterfallClimbGravityConfig.addSafePositionEntityId(i, t),
      VehicleWaterfallClimbGravityConfig.addGravityDirection(i, e),
      VehicleWaterfallClimbGravityConfig.endVehicleWaterfallClimbGravityConfig(
        i,
      )
    );
  }
}
exports.VehicleWaterfallClimbGravityConfig = VehicleWaterfallClimbGravityConfig;
//# sourceMappingURL=vehicle-waterfall-climb-gravity-config.js.map
