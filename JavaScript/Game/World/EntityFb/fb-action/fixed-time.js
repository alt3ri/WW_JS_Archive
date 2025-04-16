"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixedTime = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixedTime {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsFixedTime(e, i) {
    return (i || new FixedTime()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsFixedTime(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FixedTime()).__init(e.readInt32(e.position()) + e.position(), e)
    );
  }
  hour() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  minutes() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startFixedTime(e) {
    e.startObject(2);
  }
  static addHour(e, i) {
    e.addFieldInt32(0, i, 0);
  }
  static addMinutes(e, i) {
    e.addFieldInt32(1, i, 0);
  }
  static endFixedTime(e) {
    return e.endObject();
  }
  static createFixedTime(e, i, t) {
    return (
      FixedTime.startFixedTime(e),
      FixedTime.addHour(e, i),
      FixedTime.addMinutes(e, t),
      FixedTime.endFixedTime(e)
    );
  }
}
exports.FixedTime = FixedTime;
//# sourceMappingURL=fixed-time.js.map
