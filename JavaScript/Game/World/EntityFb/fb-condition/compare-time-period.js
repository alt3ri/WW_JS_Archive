"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareTimePeriod = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareTimePeriod {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsCompareTimePeriod(e, i) {
    return (i || new CompareTimePeriod()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCompareTimePeriod(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CompareTimePeriod()).__init(
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
  timePeriod(e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  static startCompareTimePeriod(e) {
    e.startObject(3);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addCompare(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static addTimePeriod(e, i) {
    e.addFieldOffset(2, i, 0);
  }
  static endCompareTimePeriod(e) {
    return e.endObject();
  }
  static createCompareTimePeriod(e, i, r, t) {
    return (
      CompareTimePeriod.startCompareTimePeriod(e),
      CompareTimePeriod.addType(e, i),
      CompareTimePeriod.addCompare(e, r),
      CompareTimePeriod.addTimePeriod(e, t),
      CompareTimePeriod.endCompareTimePeriod(e)
    );
  }
}
exports.CompareTimePeriod = CompareTimePeriod;
//# sourceMappingURL=compare-time-period.js.map
