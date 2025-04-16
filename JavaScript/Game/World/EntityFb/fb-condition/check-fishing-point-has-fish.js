"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckFishingPointHasFish = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckFishingPointHasFish {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, s) {
    return (this.bb_pos = i), (this.bb = s), this;
  }
  static getRootAsCheckFishingPointHasFish(i, s) {
    return (s || new CheckFishingPointHasFish()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsCheckFishingPointHasFish(i, s) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new CheckFishingPointHasFish()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, i) : void 0;
  }
  hasFish() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startCheckFishingPointHasFish(i) {
    i.startObject(2);
  }
  static addType(i, s) {
    i.addFieldOffset(0, s, 0);
  }
  static addHasFish(i, s) {
    i.addFieldInt8(1, +s, 0);
  }
  static endCheckFishingPointHasFish(i) {
    return i.endObject();
  }
  static createCheckFishingPointHasFish(i, s, t) {
    return (
      CheckFishingPointHasFish.startCheckFishingPointHasFish(i),
      CheckFishingPointHasFish.addType(i, s),
      CheckFishingPointHasFish.addHasFish(i, t),
      CheckFishingPointHasFish.endCheckFishingPointHasFish(i)
    );
  }
}
exports.CheckFishingPointHasFish = CheckFishingPointHasFish;
//# sourceMappingURL=check-fishing-point-has-fish.js.map
