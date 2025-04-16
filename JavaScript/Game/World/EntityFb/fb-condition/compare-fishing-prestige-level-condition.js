"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareFishingPrestigeLevelCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareFishingPrestigeLevelCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsCompareFishingPrestigeLevelCondition(e, i) {
    return (i || new CompareFishingPrestigeLevelCondition()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCompareFishingPrestigeLevelCondition(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CompareFishingPrestigeLevelCondition()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  compare(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  prestigeLevel() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCompareFishingPrestigeLevelCondition(e) {
    e.startObject(3);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addCompare(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static addPrestigeLevel(e, i) {
    e.addFieldInt32(2, i, 0);
  }
  static endCompareFishingPrestigeLevelCondition(e) {
    return e.endObject();
  }
  static createCompareFishingPrestigeLevelCondition(e, i, t, s) {
    return (
      CompareFishingPrestigeLevelCondition.startCompareFishingPrestigeLevelCondition(
        e,
      ),
      CompareFishingPrestigeLevelCondition.addType(e, i),
      CompareFishingPrestigeLevelCondition.addCompare(e, t),
      CompareFishingPrestigeLevelCondition.addPrestigeLevel(e, s),
      CompareFishingPrestigeLevelCondition.endCompareFishingPrestigeLevelCondition(
        e,
      )
    );
  }
}
exports.CompareFishingPrestigeLevelCondition =
  CompareFishingPrestigeLevelCondition;
//# sourceMappingURL=compare-fishing-prestige-level-condition.js.map
