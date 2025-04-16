"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleAudioConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleAudioConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, e) {
    return (this.bb_pos = i), (this.bb = e), this;
  }
  static getRootAsVehicleAudioConfig(i, e) {
    return (e || new VehicleAudioConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsVehicleAudioConfig(i, e) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new VehicleAudioConfig()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  minVehicleSpeed() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.readFloat32(this.bb_pos + i) : 0;
  }
  maxVehicleSpeed() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readFloat32(this.bb_pos + i) : 0;
  }
  audioEvent(i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, i) : void 0;
  }
  static startVehicleAudioConfig(i) {
    i.startObject(3);
  }
  static addMinVehicleSpeed(i, e) {
    i.addFieldFloat32(0, e, 0);
  }
  static addMaxVehicleSpeed(i, e) {
    i.addFieldFloat32(1, e, 0);
  }
  static addAudioEvent(i, e) {
    i.addFieldOffset(2, e, 0);
  }
  static endVehicleAudioConfig(i) {
    return i.endObject();
  }
  static createVehicleAudioConfig(i, e, t, o) {
    return (
      VehicleAudioConfig.startVehicleAudioConfig(i),
      VehicleAudioConfig.addMinVehicleSpeed(i, e),
      VehicleAudioConfig.addMaxVehicleSpeed(i, t),
      VehicleAudioConfig.addAudioEvent(i, o),
      VehicleAudioConfig.endVehicleAudioConfig(i)
    );
  }
}
exports.VehicleAudioConfig = VehicleAudioConfig;
//# sourceMappingURL=vehicle-audio-config.js.map
