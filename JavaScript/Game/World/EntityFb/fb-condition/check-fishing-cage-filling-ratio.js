"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckFishingCageFillingRatio = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckFishingCageFillingRatio {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsCheckFishingCageFillingRatio(i, t) {
    return (t || new CheckFishingCageFillingRatio()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsCheckFishingCageFillingRatio(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckFishingCageFillingRatio()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  compare(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  ratio() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  static startCheckFishingCageFillingRatio(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addCompare(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addRatio(i, t) {
    i.addFieldInt32(2, t, 0);
  }
  static endCheckFishingCageFillingRatio(i) {
    return i.endObject();
  }
  static createCheckFishingCageFillingRatio(i, t, e, s) {
    return (
      CheckFishingCageFillingRatio.startCheckFishingCageFillingRatio(i),
      CheckFishingCageFillingRatio.addType(i, t),
      CheckFishingCageFillingRatio.addCompare(i, e),
      CheckFishingCageFillingRatio.addRatio(i, s),
      CheckFishingCageFillingRatio.endCheckFishingCageFillingRatio(i)
    );
  }
}
exports.CheckFishingCageFillingRatio = CheckFishingCageFillingRatio;
//# sourceMappingURL=check-fishing-cage-filling-ratio.js.map
