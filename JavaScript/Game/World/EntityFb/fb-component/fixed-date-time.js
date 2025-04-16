"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixedDateTime = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixedDateTime {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsFixedDateTime(e, t) {
    return (t || new FixedDateTime()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsFixedDateTime(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FixedDateTime()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  hours() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  minutes() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  seconds() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startFixedDateTime(e) {
    e.startObject(3);
  }
  static addHours(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addMinutes(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addSeconds(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endFixedDateTime(e) {
    return e.endObject();
  }
  static createFixedDateTime(e, t, i, s) {
    return (
      FixedDateTime.startFixedDateTime(e),
      FixedDateTime.addHours(e, t),
      FixedDateTime.addMinutes(e, i),
      FixedDateTime.addSeconds(e, s),
      FixedDateTime.endFixedDateTime(e)
    );
  }
}
exports.FixedDateTime = FixedDateTime;
//# sourceMappingURL=fixed-date-time.js.map
