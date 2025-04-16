"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimePeriod = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TimePeriod {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, e) {
    return (this.bb_pos = i), (this.bb = e), this;
  }
  static getRootAsTimePeriod(i, e) {
    return (e || new TimePeriod()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsTimePeriod(i, e) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TimePeriod()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, i) : void 0;
  }
  compare(i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, i) : void 0;
  }
  timePeriod(i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, i) : void 0;
  }
  static startTimePeriod(i) {
    i.startObject(3);
  }
  static addType(i, e) {
    i.addFieldOffset(0, e, 0);
  }
  static addCompare(i, e) {
    i.addFieldOffset(1, e, 0);
  }
  static addTimePeriod(i, e) {
    i.addFieldOffset(2, e, 0);
  }
  static endTimePeriod(i) {
    return i.endObject();
  }
  static createTimePeriod(i, e, t, r) {
    return (
      TimePeriod.startTimePeriod(i),
      TimePeriod.addType(i, e),
      TimePeriod.addCompare(i, t),
      TimePeriod.addTimePeriod(i, r),
      TimePeriod.endTimePeriod(i)
    );
  }
}
exports.TimePeriod = TimePeriod;
//# sourceMappingURL=time-period.js.map
