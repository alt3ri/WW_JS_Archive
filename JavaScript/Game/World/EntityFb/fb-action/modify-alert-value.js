"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModifyAlertValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_alert_value_change_speed_js_1 = require("../fb-action/union-alert-value-change-speed.js"),
  union_set_alert_value_type_js_1 = require("../fb-action/union-set-alert-value-type.js");
class ModifyAlertValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsModifyAlertValue(e, t) {
    return (t || new ModifyAlertValue()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsModifyAlertValue(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ModifyAlertValue()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  areaId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  setTypeType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_set_alert_value_type_js_1.UnionSetAlertValueType.NONE;
  }
  setType(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  changeSpeedType() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_alert_value_change_speed_js_1.UnionAlertValueChangeSpeed.NONE;
  }
  changeSpeed(e) {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startModifyAlertValue(e) {
    e.startObject(6);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addAreaId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addSetTypeType(e, t) {
    e.addFieldInt8(
      2,
      t,
      union_set_alert_value_type_js_1.UnionSetAlertValueType.NONE,
    );
  }
  static addSetType(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addChangeSpeedType(e, t) {
    e.addFieldInt8(
      4,
      t,
      union_alert_value_change_speed_js_1.UnionAlertValueChangeSpeed.NONE,
    );
  }
  static addChangeSpeed(e, t) {
    e.addFieldOffset(5, t, 0);
  }
  static endModifyAlertValue(e) {
    return e.endObject();
  }
  static createModifyAlertValue(e, t, i, a, s, r, l) {
    return (
      ModifyAlertValue.startModifyAlertValue(e),
      ModifyAlertValue.addType(e, t),
      ModifyAlertValue.addAreaId(e, i),
      ModifyAlertValue.addSetTypeType(e, a),
      ModifyAlertValue.addSetType(e, s),
      ModifyAlertValue.addChangeSpeedType(e, r),
      ModifyAlertValue.addChangeSpeed(e, l),
      ModifyAlertValue.endModifyAlertValue(e)
    );
  }
}
exports.ModifyAlertValue = ModifyAlertValue;
//# sourceMappingURL=modify-alert-value.js.map
