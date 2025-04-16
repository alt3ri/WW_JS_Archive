"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeflectionRandom = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DeflectionRandom {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDeflectionRandom(t, e) {
    return (e || new DeflectionRandom()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDeflectionRandom(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DeflectionRandom()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  maxAngleSpeed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  isReverse() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startDeflectionRandom(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaxAngleSpeed(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addIsReverse(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endDeflectionRandom(t) {
    return t.endObject();
  }
  static createDeflectionRandom(t, e, i, s) {
    return (
      DeflectionRandom.startDeflectionRandom(t),
      DeflectionRandom.addType(t, e),
      DeflectionRandom.addMaxAngleSpeed(t, i),
      DeflectionRandom.addIsReverse(t, s),
      DeflectionRandom.endDeflectionRandom(t)
    );
  }
}
exports.DeflectionRandom = DeflectionRandom;
//# sourceMappingURL=deflection-random.js.map
