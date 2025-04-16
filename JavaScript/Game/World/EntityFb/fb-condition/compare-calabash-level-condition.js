"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareCalabashLevelCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareCalabashLevelCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, e) {
    return (this.bb_pos = a), (this.bb = e), this;
  }
  static getRootAsCompareCalabashLevelCondition(a, e) {
    return (e || new CompareCalabashLevelCondition()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsCompareCalabashLevelCondition(a, e) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CompareCalabashLevelCondition()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  type(a) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, a) : void 0;
  }
  compare(a) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, a) : void 0;
  }
  calabashLevel() {
    var a = this.bb.__offset(this.bb_pos, 8);
    return a ? this.bb.readInt32(this.bb_pos + a) : 0;
  }
  static startCompareCalabashLevelCondition(a) {
    a.startObject(3);
  }
  static addType(a, e) {
    a.addFieldOffset(0, e, 0);
  }
  static addCompare(a, e) {
    a.addFieldOffset(1, e, 0);
  }
  static addCalabashLevel(a, e) {
    a.addFieldInt32(2, e, 0);
  }
  static endCompareCalabashLevelCondition(a) {
    return a.endObject();
  }
  static createCompareCalabashLevelCondition(a, e, t, i) {
    return (
      CompareCalabashLevelCondition.startCompareCalabashLevelCondition(a),
      CompareCalabashLevelCondition.addType(a, e),
      CompareCalabashLevelCondition.addCompare(a, t),
      CompareCalabashLevelCondition.addCalabashLevel(a, i),
      CompareCalabashLevelCondition.endCompareCalabashLevelCondition(a)
    );
  }
}
exports.CompareCalabashLevelCondition = CompareCalabashLevelCondition;
//# sourceMappingURL=compare-calabash-level-condition.js.map
