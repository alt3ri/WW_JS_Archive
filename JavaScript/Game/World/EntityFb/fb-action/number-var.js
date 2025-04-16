"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NumberVar = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NumberVar {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, t) {
    return (this.bb_pos = r), (this.bb = t), this;
  }
  static getRootAsNumberVar(r, t) {
    return (t || new NumberVar()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsNumberVar(r, t) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new NumberVar()).__init(r.readInt32(r.position()) + r.position(), r)
    );
  }
  name(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, r) : void 0;
  }
  value() {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.readFloat32(this.bb_pos + r) : 0;
  }
  static startNumberVar(r) {
    r.startObject(2);
  }
  static addName(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addValue(r, t) {
    r.addFieldFloat32(1, t, 0);
  }
  static endNumberVar(r) {
    return r.endObject();
  }
  static createNumberVar(r, t, e) {
    return (
      NumberVar.startNumberVar(r),
      NumberVar.addName(r, t),
      NumberVar.addValue(r, e),
      NumberVar.endNumberVar(r)
    );
  }
}
exports.NumberVar = NumberVar;
//# sourceMappingURL=number-var.js.map
