"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VariableMotion = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VariableMotion {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsVariableMotion(t, i) {
    return (i || new VariableMotion()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVariableMotion(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new VariableMotion()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  acceleration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  maxSpeed() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startVariableMotion(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAcceleration(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addMaxSpeed(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static endVariableMotion(t) {
    return t.endObject();
  }
  static createVariableMotion(t, i, e, a) {
    return (
      VariableMotion.startVariableMotion(t),
      VariableMotion.addType(t, i),
      VariableMotion.addAcceleration(t, e),
      VariableMotion.addMaxSpeed(t, a),
      VariableMotion.endVariableMotion(t)
    );
  }
}
exports.VariableMotion = VariableMotion;
//# sourceMappingURL=variable-motion.js.map
