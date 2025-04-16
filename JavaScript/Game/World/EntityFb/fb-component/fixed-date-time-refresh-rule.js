"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixedDateTimeRefreshRule = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class FixedDateTimeRefreshRule {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFixedDateTimeRefreshRule(t, e) {
    return (e || new FixedDateTimeRefreshRule()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFixedDateTimeRefreshRule(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FixedDateTimeRefreshRule()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  hours() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  minutes() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  seconds() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  refreshRate() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  condition(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startFixedDateTimeRefreshRule(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addHours(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addMinutes(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addSeconds(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addRefreshRate(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addCondition(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static endFixedDateTimeRefreshRule(t) {
    return t.endObject();
  }
}
exports.FixedDateTimeRefreshRule = FixedDateTimeRefreshRule;
//# sourceMappingURL=fixed-date-time-refresh-rule.js.map
