"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingPointAdditionalInfo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FishingPointAdditionalInfo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsFishingPointAdditionalInfo(i, t) {
    return (t || new FishingPointAdditionalInfo()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsFishingPointAdditionalInfo(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FishingPointAdditionalInfo()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startFishingPointAdditionalInfo(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endFishingPointAdditionalInfo(i) {
    return i.endObject();
  }
  static createFishingPointAdditionalInfo(i, t) {
    return (
      FishingPointAdditionalInfo.startFishingPointAdditionalInfo(i),
      FishingPointAdditionalInfo.addType(i, t),
      FishingPointAdditionalInfo.endFishingPointAdditionalInfo(i)
    );
  }
}
exports.FishingPointAdditionalInfo = FishingPointAdditionalInfo;
//# sourceMappingURL=fishing-point-additional-info.js.map
