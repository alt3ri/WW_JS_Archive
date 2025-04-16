"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideTargetRange = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_hide_range_config_js_1 = require("../fb-action/union-hide-range-config.js");
class HideTargetRange {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsHideTargetRange(e, t) {
    return (t || new HideTargetRange()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsHideTargetRange(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new HideTargetRange()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  rangeEntity() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  hideConfigType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_hide_range_config_js_1.UnionHideRangeConfig.NONE;
  }
  hideConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  isHideSimpleNpc() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  isHidePasserByNpc() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startHideTargetRange(e) {
    e.startObject(5);
  }
  static addRangeEntity(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addHideConfigType(e, t) {
    e.addFieldInt8(
      1,
      t,
      union_hide_range_config_js_1.UnionHideRangeConfig.NONE,
    );
  }
  static addHideConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addIsHideSimpleNpc(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static addIsHidePasserByNpc(e, t) {
    e.addFieldInt8(4, +t, 0);
  }
  static endHideTargetRange(e) {
    return e.endObject();
  }
  static createHideTargetRange(e, t, i, a, r, s) {
    return (
      HideTargetRange.startHideTargetRange(e),
      HideTargetRange.addRangeEntity(e, t),
      HideTargetRange.addHideConfigType(e, i),
      HideTargetRange.addHideConfig(e, a),
      HideTargetRange.addIsHideSimpleNpc(e, r),
      HideTargetRange.addIsHidePasserByNpc(e, s),
      HideTargetRange.endHideTargetRange(e)
    );
  }
}
exports.HideTargetRange = HideTargetRange;
//# sourceMappingURL=hide-target-range.js.map
