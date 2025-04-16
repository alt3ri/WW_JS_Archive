"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConstantCameraShake = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ConstantCameraShake {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsConstantCameraShake(t, a) {
    return (a || new ConstantCameraShake()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsConstantCameraShake(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new ConstantCameraShake()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startConstantCameraShake(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endConstantCameraShake(t) {
    return t.endObject();
  }
  static createConstantCameraShake(t, a) {
    return (
      ConstantCameraShake.startConstantCameraShake(t),
      ConstantCameraShake.addType(t, a),
      ConstantCameraShake.endConstantCameraShake(t)
    );
  }
}
exports.ConstantCameraShake = ConstantCameraShake;
//# sourceMappingURL=constant-camera-shake.js.map
