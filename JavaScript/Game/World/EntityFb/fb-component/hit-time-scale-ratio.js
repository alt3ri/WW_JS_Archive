"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitTimeScaleRatio = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitTimeScaleRatio {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsHitTimeScaleRatio(t, i) {
    return (i || new HitTimeScaleRatio()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitTimeScaleRatio(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new HitTimeScaleRatio()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  timeRatio() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  maxExtraTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  valueRatio() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startHitTimeScaleRatio(t) {
    t.startObject(3);
  }
  static addTimeRatio(t, i) {
    t.addFieldFloat32(0, i, 0);
  }
  static addMaxExtraTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addValueRatio(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static endHitTimeScaleRatio(t) {
    return t.endObject();
  }
  static createHitTimeScaleRatio(t, i, e, a) {
    return (
      HitTimeScaleRatio.startHitTimeScaleRatio(t),
      HitTimeScaleRatio.addTimeRatio(t, i),
      HitTimeScaleRatio.addMaxExtraTime(t, e),
      HitTimeScaleRatio.addValueRatio(t, a),
      HitTimeScaleRatio.endHitTimeScaleRatio(t)
    );
  }
}
exports.HitTimeScaleRatio = HitTimeScaleRatio;
//# sourceMappingURL=hit-time-scale-ratio.js.map
