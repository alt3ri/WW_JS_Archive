"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseCurve = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BaseCurve {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsBaseCurve(e, t) {
    return (t || new BaseCurve()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsBaseCurve(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new BaseCurve()).__init(e.readInt32(e.position()) + e.position(), e)
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  n() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  static startBaseCurve(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addN(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static endBaseCurve(e) {
    return e.endObject();
  }
  static createBaseCurve(e, t, s) {
    return (
      BaseCurve.startBaseCurve(e),
      BaseCurve.addType(e, t),
      BaseCurve.addN(e, s),
      BaseCurve.endBaseCurve(e)
    );
  }
}
exports.BaseCurve = BaseCurve;
//# sourceMappingURL=base-curve.js.map
