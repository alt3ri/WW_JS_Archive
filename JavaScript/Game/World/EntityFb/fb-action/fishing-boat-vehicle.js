"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingBoatVehicle = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FishingBoatVehicle {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsFishingBoatVehicle(i, t) {
    return (t || new FishingBoatVehicle()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsFishingBoatVehicle(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FishingBoatVehicle()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startFishingBoatVehicle(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endFishingBoatVehicle(i) {
    return i.endObject();
  }
  static createFishingBoatVehicle(i, t) {
    return (
      FishingBoatVehicle.startFishingBoatVehicle(i),
      FishingBoatVehicle.addType(i, t),
      FishingBoatVehicle.endFishingBoatVehicle(i)
    );
  }
}
exports.FishingBoatVehicle = FishingBoatVehicle;
//# sourceMappingURL=fishing-boat-vehicle.js.map
