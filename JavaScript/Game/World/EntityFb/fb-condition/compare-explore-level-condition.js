"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareExploreLevelCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareExploreLevelCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCompareExploreLevelCondition(e, t) {
    return (t || new CompareExploreLevelCondition()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCompareExploreLevelCondition(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CompareExploreLevelCondition()).__init(
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
  level() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCompareExploreLevelCondition(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addLevel(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endCompareExploreLevelCondition(e) {
    return e.endObject();
  }
  static createCompareExploreLevelCondition(e, t, o, i) {
    return (
      CompareExploreLevelCondition.startCompareExploreLevelCondition(e),
      CompareExploreLevelCondition.addType(e, t),
      CompareExploreLevelCondition.addCompare(e, o),
      CompareExploreLevelCondition.addLevel(e, i),
      CompareExploreLevelCondition.endCompareExploreLevelCondition(e)
    );
  }
}
exports.CompareExploreLevelCondition = CompareExploreLevelCondition;
//# sourceMappingURL=compare-explore-level-condition.js.map
