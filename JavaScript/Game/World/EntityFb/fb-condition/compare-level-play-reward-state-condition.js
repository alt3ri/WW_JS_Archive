"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareLevelPlayRewardStateCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareLevelPlayRewardStateCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCompareLevelPlayRewardStateCondition(e, t) {
    return (t || new CompareLevelPlayRewardStateCondition()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCompareLevelPlayRewardStateCondition(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CompareLevelPlayRewardStateCondition()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startCompareLevelPlayRewardStateCondition(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endCompareLevelPlayRewardStateCondition(e) {
    return e.endObject();
  }
  static createCompareLevelPlayRewardStateCondition(e, t, a) {
    return (
      CompareLevelPlayRewardStateCondition.startCompareLevelPlayRewardStateCondition(
        e,
      ),
      CompareLevelPlayRewardStateCondition.addType(e, t),
      CompareLevelPlayRewardStateCondition.addCompare(e, a),
      CompareLevelPlayRewardStateCondition.endCompareLevelPlayRewardStateCondition(
        e,
      )
    );
  }
}
exports.CompareLevelPlayRewardStateCondition =
  CompareLevelPlayRewardStateCondition;
//# sourceMappingURL=compare-level-play-reward-state-condition.js.map
