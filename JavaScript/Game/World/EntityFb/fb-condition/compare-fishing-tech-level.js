"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareFishingTechLevel = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareFishingTechLevel {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsCompareFishingTechLevel(e, i) {
    return (i || new CompareFishingTechLevel()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCompareFishingTechLevel(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CompareFishingTechLevel()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  techId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  compare(e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  techLevel() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCompareFishingTechLevel(e) {
    e.startObject(4);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addTechId(e, i) {
    e.addFieldInt32(1, i, 0);
  }
  static addCompare(e, i) {
    e.addFieldOffset(2, i, 0);
  }
  static addTechLevel(e, i) {
    e.addFieldInt32(3, i, 0);
  }
  static endCompareFishingTechLevel(e) {
    return e.endObject();
  }
  static createCompareFishingTechLevel(e, i, t, s, h) {
    return (
      CompareFishingTechLevel.startCompareFishingTechLevel(e),
      CompareFishingTechLevel.addType(e, i),
      CompareFishingTechLevel.addTechId(e, t),
      CompareFishingTechLevel.addCompare(e, s),
      CompareFishingTechLevel.addTechLevel(e, h),
      CompareFishingTechLevel.endCompareFishingTechLevel(e)
    );
  }
}
exports.CompareFishingTechLevel = CompareFishingTechLevel;
//# sourceMappingURL=compare-fishing-tech-level.js.map
