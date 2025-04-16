"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableAlertArea = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_disable_alert_condition_js_1 = require("../fb-action/union-disable-alert-condition.js");
class EnableAlertArea {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEnableAlertArea(t, e) {
    return (e || new EnableAlertArea()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnableAlertArea(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EnableAlertArea()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  areaId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isEnable() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  autoDisableConditionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_disable_alert_condition_js_1.UnionDisableAlertCondition.NONE;
  }
  autoDisableCondition(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startEnableAlertArea(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addAreaId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addIsEnable(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addAutoDisableConditionType(t, e) {
    t.addFieldInt8(
      3,
      e,
      union_disable_alert_condition_js_1.UnionDisableAlertCondition.NONE,
    );
  }
  static addAutoDisableCondition(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endEnableAlertArea(t) {
    return t.endObject();
  }
  static createEnableAlertArea(t, e, a, r, i, s) {
    return (
      EnableAlertArea.startEnableAlertArea(t),
      EnableAlertArea.addType(t, e),
      EnableAlertArea.addAreaId(t, a),
      EnableAlertArea.addIsEnable(t, r),
      EnableAlertArea.addAutoDisableConditionType(t, i),
      EnableAlertArea.addAutoDisableCondition(t, s),
      EnableAlertArea.endEnableAlertArea(t)
    );
  }
}
exports.EnableAlertArea = EnableAlertArea;
//# sourceMappingURL=enable-alert-area.js.map
