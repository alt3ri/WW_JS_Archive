"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RotatorComponent2 = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  state_rotation_config_js_1 = require("../fb-component/state-rotation-config.js");
class RotatorComponent2 {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsRotatorComponent2(t, o) {
    return (o || new RotatorComponent2()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRotatorComponent2(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new RotatorComponent2()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  config(t, o) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (o || new state_rotation_config_js_1.StateRotationConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  configLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startRotatorComponent2(t) {
    t.startObject(2);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addConfig(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createConfigVector(o, e) {
    o.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) o.addOffset(e[t]);
    return o.endVector();
  }
  static startConfigVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endRotatorComponent2(t) {
    return t.endObject();
  }
  static createRotatorComponent2(t, o, e) {
    return (
      RotatorComponent2.startRotatorComponent2(t),
      RotatorComponent2.addDisabled(t, o),
      RotatorComponent2.addConfig(t, e),
      RotatorComponent2.endRotatorComponent2(t)
    );
  }
}
exports.RotatorComponent2 = RotatorComponent2;
//# sourceMappingURL=rotator-component2.js.map
