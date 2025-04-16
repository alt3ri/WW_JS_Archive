"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HourToHourCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  hour_js_1 = require("../fb-condition/hour.js");
class HourToHourCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsHourToHourCondition(t, o) {
    return (o || new HourToHourCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHourToHourCondition(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new HourToHourCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  start(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o
      ? (t || new hour_js_1.Hour()).__init(
          this.bb.__indirect(this.bb_pos + o),
          this.bb,
        )
      : void 0;
  }
  end(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o
      ? (t || new hour_js_1.Hour()).__init(
          this.bb.__indirect(this.bb_pos + o),
          this.bb,
        )
      : void 0;
  }
  compare(t) {
    var o = this.bb.__offset(this.bb_pos, 10);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  static startHourToHourCondition(t) {
    t.startObject(4);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addStart(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static addEnd(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static addCompare(t, o) {
    t.addFieldOffset(3, o, 0);
  }
  static endHourToHourCondition(t) {
    return t.endObject();
  }
}
exports.HourToHourCondition = HourToHourCondition;
//# sourceMappingURL=hour-to-hour-condition.js.map
