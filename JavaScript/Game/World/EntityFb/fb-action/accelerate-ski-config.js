"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AccelerateSkiConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class AccelerateSkiConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAccelerateSkiConfig(t, e) {
    return (e || new AccelerateSkiConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAccelerateSkiConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AccelerateSkiConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  target(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  limitSpeed() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  acceleration() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  instantSpeed() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startAccelerateSkiConfig(t) {
    t.startObject(7);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetType(t, e) {
    t.addFieldInt8(1, e, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addDuration(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addLimitSpeed(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addAcceleration(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static addInstantSpeed(t, e) {
    t.addFieldInt32(6, e, 0);
  }
  static endAccelerateSkiConfig(t) {
    return t.endObject();
  }
  static createAccelerateSkiConfig(t, e, i, r, s, a, c, n) {
    return (
      AccelerateSkiConfig.startAccelerateSkiConfig(t),
      AccelerateSkiConfig.addType(t, e),
      AccelerateSkiConfig.addTargetType(t, i),
      AccelerateSkiConfig.addTarget(t, r),
      AccelerateSkiConfig.addDuration(t, s),
      AccelerateSkiConfig.addLimitSpeed(t, a),
      AccelerateSkiConfig.addAcceleration(t, c),
      AccelerateSkiConfig.addInstantSpeed(t, n),
      AccelerateSkiConfig.endAccelerateSkiConfig(t)
    );
  }
}
exports.AccelerateSkiConfig = AccelerateSkiConfig;
//# sourceMappingURL=accelerate-ski-config.js.map
