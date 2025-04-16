"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DecalParams = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DecalParams {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, t) {
    return (this.bb_pos = a), (this.bb = t), this;
  }
  static getRootAsDecalParams(a, t) {
    return (t || new DecalParams()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsDecalParams(a, t) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DecalParams()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0;
  }
  spreadRadius() {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.readFloat32(this.bb_pos + a) : 0;
  }
  spreadTime() {
    var a = this.bb.__offset(this.bb_pos, 8);
    return a ? this.bb.readFloat32(this.bb_pos + a) : 0;
  }
  static startDecalParams(a) {
    a.startObject(3);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static addSpreadRadius(a, t) {
    a.addFieldFloat32(1, t, 0);
  }
  static addSpreadTime(a, t) {
    a.addFieldFloat32(2, t, 0);
  }
  static endDecalParams(a) {
    return a.endObject();
  }
  static createDecalParams(a, t, s, e) {
    return (
      DecalParams.startDecalParams(a),
      DecalParams.addType(a, t),
      DecalParams.addSpreadRadius(a, s),
      DecalParams.addSpreadTime(a, e),
      DecalParams.endDecalParams(a)
    );
  }
}
exports.DecalParams = DecalParams;
//# sourceMappingURL=decal-params.js.map
