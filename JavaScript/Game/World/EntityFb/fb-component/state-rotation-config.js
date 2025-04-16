"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StateRotationConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  key_rotator_config_js_1 = require("../fb-component/key-rotator-config.js"),
  rotation_config_js_1 = require("../fb-component/rotation-config.js");
class StateRotationConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsStateRotationConfig(t, o) {
    return (o || new StateRotationConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStateRotationConfig(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new StateRotationConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  state(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  isLoop() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  rotatePoint(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  rotationConfig(t, o) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (o || new rotation_config_js_1.RotationConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  rotationConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  keyRotatorConfig(t, o) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (o || new key_rotator_config_js_1.KeyRotatorConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  keyRotatorConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  keepLastRotation() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startStateRotationConfig(t) {
    t.startObject(6);
  }
  static addState(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addIsLoop(t, o) {
    t.addFieldInt8(1, +o, 0);
  }
  static addRotatePoint(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static addRotationConfig(t, o) {
    t.addFieldOffset(3, o, 0);
  }
  static createRotationConfigVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) o.addOffset(i[t]);
    return o.endVector();
  }
  static startRotationConfigVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addKeyRotatorConfig(t, o) {
    t.addFieldOffset(4, o, 0);
  }
  static createKeyRotatorConfigVector(o, i) {
    o.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) o.addOffset(i[t]);
    return o.endVector();
  }
  static startKeyRotatorConfigVector(t, o) {
    t.startVector(4, o, 4);
  }
  static addKeepLastRotation(t, o) {
    t.addFieldInt8(5, +o, 0);
  }
  static endStateRotationConfig(t) {
    return t.endObject();
  }
  static createStateRotationConfig(t, o, i, a, e, n, s) {
    return (
      StateRotationConfig.startStateRotationConfig(t),
      StateRotationConfig.addState(t, o),
      StateRotationConfig.addIsLoop(t, i),
      StateRotationConfig.addRotatePoint(t, a),
      StateRotationConfig.addRotationConfig(t, e),
      StateRotationConfig.addKeyRotatorConfig(t, n),
      StateRotationConfig.addKeepLastRotation(t, s),
      StateRotationConfig.endStateRotationConfig(t)
    );
  }
}
exports.StateRotationConfig = StateRotationConfig;
//# sourceMappingURL=state-rotation-config.js.map
