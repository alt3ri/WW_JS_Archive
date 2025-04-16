"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AwakeWithTransformVar = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class AwakeWithTransformVar {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, t) {
    return (this.bb_pos = r), (this.bb = t), this;
  }
  static getRootAsAwakeWithTransformVar(r, t) {
    return (t || new AwakeWithTransformVar()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsAwakeWithTransformVar(r, t) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new AwakeWithTransformVar()).__init(
        r.readInt32(r.position()) + r.position(),
        r,
      )
    );
  }
  type(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, r) : void 0;
  }
  transformVarType() {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r
      ? this.bb.readUint8(this.bb_pos + r)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  transformVar(r) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(r, this.bb_pos + t) : void 0;
  }
  static startAwakeWithTransformVar(r) {
    r.startObject(3);
  }
  static addType(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addTransformVarType(r, t) {
    r.addFieldInt8(1, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addTransformVar(r, t) {
    r.addFieldOffset(2, t, 0);
  }
  static endAwakeWithTransformVar(r) {
    return r.endObject();
  }
  static createAwakeWithTransformVar(r, t, a, s) {
    return (
      AwakeWithTransformVar.startAwakeWithTransformVar(r),
      AwakeWithTransformVar.addType(r, t),
      AwakeWithTransformVar.addTransformVarType(r, a),
      AwakeWithTransformVar.addTransformVar(r, s),
      AwakeWithTransformVar.endAwakeWithTransformVar(r)
    );
  }
}
exports.AwakeWithTransformVar = AwakeWithTransformVar;
//# sourceMappingURL=awake-with-transform-var.js.map
