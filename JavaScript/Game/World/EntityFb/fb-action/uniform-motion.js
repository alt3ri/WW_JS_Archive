"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UniformMotion = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UniformMotion {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsUniformMotion(t, i) {
    return (i || new UniformMotion()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUniformMotion(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new UniformMotion()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startUniformMotion(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static endUniformMotion(t) {
    return t.endObject();
  }
  static createUniformMotion(t, i, o) {
    return (
      UniformMotion.startUniformMotion(t),
      UniformMotion.addType(t, i),
      UniformMotion.addTime(t, o),
      UniformMotion.endUniformMotion(t)
    );
  }
}
exports.UniformMotion = UniformMotion;
//# sourceMappingURL=uniform-motion.js.map
