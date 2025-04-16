"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareEntitySelfStateCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareEntitySelfStateCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCompareEntitySelfStateCondition(t, e) {
    return (e || new CompareEntitySelfStateCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCompareEntitySelfStateCondition(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CompareEntitySelfStateCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCompareEntitySelfStateCondition(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endCompareEntitySelfStateCondition(t) {
    return t.endObject();
  }
  static createCompareEntitySelfStateCondition(t, e, i, o) {
    return (
      CompareEntitySelfStateCondition.startCompareEntitySelfStateCondition(t),
      CompareEntitySelfStateCondition.addType(t, e),
      CompareEntitySelfStateCondition.addState(t, i),
      CompareEntitySelfStateCondition.addCompare(t, o),
      CompareEntitySelfStateCondition.endCompareEntitySelfStateCondition(t)
    );
  }
}
exports.CompareEntitySelfStateCondition = CompareEntitySelfStateCondition;
//# sourceMappingURL=compare-entity-self-state-condition.js.map
