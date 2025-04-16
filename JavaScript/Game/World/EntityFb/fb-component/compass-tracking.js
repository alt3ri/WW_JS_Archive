"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompassTracking = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  icon_near_by_tracking_config_js_1 = require("../fb-component/icon-near-by-tracking-config.js");
class CompassTracking {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsCompassTracking(t, s) {
    return (s || new CompassTracking()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCompassTracking(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new CompassTracking()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  showRange() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  hideRange() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  iconTrackingConfig(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (
          t || new icon_near_by_tracking_config_js_1.IconNearByTrackingConfig()
        ).__init(this.bb.__indirect(this.bb_pos + s), this.bb)
      : void 0;
  }
  vehicleTypes(t, s) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? this.bb.__string(this.bb.__vector(this.bb_pos + i) + 4 * t, s)
      : void 0;
  }
  vehicleTypesLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startCompassTracking(t) {
    t.startObject(5);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addShowRange(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addHideRange(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static addIconTrackingConfig(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static addVehicleTypes(t, s) {
    t.addFieldOffset(4, s, 0);
  }
  static createVehicleTypesVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addOffset(i[t]);
    return s.endVector();
  }
  static startVehicleTypesVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endCompassTracking(t) {
    return t.endObject();
  }
}
exports.CompassTracking = CompassTracking;
//# sourceMappingURL=compass-tracking.js.map
