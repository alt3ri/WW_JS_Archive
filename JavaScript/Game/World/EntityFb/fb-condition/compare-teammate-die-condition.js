"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareTeammateDieCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareTeammateDieCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCompareTeammateDieCondition(e, t) {
    return (t || new CompareTeammateDieCondition()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCompareTeammateDieCondition(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CompareTeammateDieCondition()).__init(
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
  dieCount() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCompareTeammateDieCondition(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addDieCount(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endCompareTeammateDieCondition(e) {
    return e.endObject();
  }
  static createCompareTeammateDieCondition(e, t, i, a) {
    return (
      CompareTeammateDieCondition.startCompareTeammateDieCondition(e),
      CompareTeammateDieCondition.addType(e, t),
      CompareTeammateDieCondition.addCompare(e, i),
      CompareTeammateDieCondition.addDieCount(e, a),
      CompareTeammateDieCondition.endCompareTeammateDieCondition(e)
    );
  }
}
exports.CompareTeammateDieCondition = CompareTeammateDieCondition;
//# sourceMappingURL=compare-teammate-die-condition.js.map
