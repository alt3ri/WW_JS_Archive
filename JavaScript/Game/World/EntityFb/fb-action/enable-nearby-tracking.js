"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableNearbyTracking = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_control_tracking_type_js_1 = require("../fb-action/union-control-tracking-type.js");
class EnableNearbyTracking {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsEnableNearbyTracking(t, r) {
    return (r || new EnableNearbyTracking()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnableNearbyTracking(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new EnableNearbyTracking()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isEnable() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  controlTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_control_tracking_type_js_1.UnionControlTrackingType.NONE;
  }
  controlType(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r ? this.bb.__union(t, this.bb_pos + r) : void 0;
  }
  static startEnableNearbyTracking(t) {
    t.startObject(3);
  }
  static addIsEnable(t, r) {
    t.addFieldInt8(0, +r, 0);
  }
  static addControlTypeType(t, r) {
    t.addFieldInt8(
      1,
      r,
      union_control_tracking_type_js_1.UnionControlTrackingType.NONE,
    );
  }
  static addControlType(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endEnableNearbyTracking(t) {
    return t.endObject();
  }
  static createEnableNearbyTracking(t, r, e, a) {
    return (
      EnableNearbyTracking.startEnableNearbyTracking(t),
      EnableNearbyTracking.addIsEnable(t, r),
      EnableNearbyTracking.addControlTypeType(t, e),
      EnableNearbyTracking.addControlType(t, a),
      EnableNearbyTracking.endEnableNearbyTracking(t)
    );
  }
}
exports.EnableNearbyTracking = EnableNearbyTracking;
//# sourceMappingURL=enable-nearby-tracking.js.map
