"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeflectionCustom = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class DeflectionCustom {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDeflectionCustom(t, e) {
    return (e || new DeflectionCustom()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDeflectionCustom(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DeflectionCustom()).__init(
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
  axis(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startDeflectionCustom(t) {
    t.startObject(4);
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
  static addAxis(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endDeflectionCustom(t) {
    return t.endObject();
  }
}
exports.DeflectionCustom = DeflectionCustom;
//# sourceMappingURL=deflection-custom.js.map
