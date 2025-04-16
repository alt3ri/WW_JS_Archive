"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinearOverRangeCameraShake = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LinearOverRangeCameraShake {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, a) {
    return (this.bb_pos = e), (this.bb = a), this;
  }
  static getRootAsLinearOverRangeCameraShake(e, a) {
    return (a || new LinearOverRangeCameraShake()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsLinearOverRangeCameraShake(e, a) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new LinearOverRangeCameraShake()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, e) : void 0;
  }
  centerEntityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  minRange() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  maxRange() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startLinearOverRangeCameraShake(e) {
    e.startObject(4);
  }
  static addType(e, a) {
    e.addFieldOffset(0, a, 0);
  }
  static addCenterEntityId(e, a) {
    e.addFieldInt32(1, a, 0);
  }
  static addMinRange(e, a) {
    e.addFieldInt32(2, a, 0);
  }
  static addMaxRange(e, a) {
    e.addFieldInt32(3, a, 0);
  }
  static endLinearOverRangeCameraShake(e) {
    return e.endObject();
  }
  static createLinearOverRangeCameraShake(e, a, r, t, i) {
    return (
      LinearOverRangeCameraShake.startLinearOverRangeCameraShake(e),
      LinearOverRangeCameraShake.addType(e, a),
      LinearOverRangeCameraShake.addCenterEntityId(e, r),
      LinearOverRangeCameraShake.addMinRange(e, t),
      LinearOverRangeCameraShake.addMaxRange(e, i),
      LinearOverRangeCameraShake.endLinearOverRangeCameraShake(e)
    );
  }
}
exports.LinearOverRangeCameraShake = LinearOverRangeCameraShake;
//# sourceMappingURL=linear-over-range-camera-shake.js.map
