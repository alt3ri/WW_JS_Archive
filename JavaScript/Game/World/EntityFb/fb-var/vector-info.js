"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VectorInfo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VectorInfo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsVectorInfo(t, r) {
    return (r || new VectorInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVectorInfo(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new VectorInfo()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  x() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  y() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  z() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startVectorInfo(t) {
    t.startObject(3);
  }
  static addX(t, r) {
    t.addFieldFloat32(0, r, 0);
  }
  static addY(t, r) {
    t.addFieldFloat32(1, r, 0);
  }
  static addZ(t, r) {
    t.addFieldFloat32(2, r, 0);
  }
  static endVectorInfo(t) {
    return t.endObject();
  }
  static createVectorInfo(t, r, e, s) {
    return (
      VectorInfo.startVectorInfo(t),
      VectorInfo.addX(t, r),
      VectorInfo.addY(t, e),
      VectorInfo.addZ(t, s),
      VectorInfo.endVectorInfo(t)
    );
  }
}
exports.VectorInfo = VectorInfo;
//# sourceMappingURL=vector-info.js.map
