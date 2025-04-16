"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareVar = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class CompareVar {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, t) {
    return (this.bb_pos = r), (this.bb = t), this;
  }
  static getRootAsCompareVar(r, t) {
    return (t || new CompareVar()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsCompareVar(r, t) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CompareVar()).__init(
        r.readInt32(r.position()) + r.position(),
        r,
      )
    );
  }
  type(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, r) : void 0;
  }
  compare(r) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, r) : void 0;
  }
  var1Type() {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r
      ? this.bb.readUint8(this.bb_pos + r)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  var1(r) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__union(r, this.bb_pos + t) : void 0;
  }
  var2Type() {
    var r = this.bb.__offset(this.bb_pos, 12);
    return r
      ? this.bb.readUint8(this.bb_pos + r)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  var2(r) {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__union(r, this.bb_pos + t) : void 0;
  }
  static startCompareVar(r) {
    r.startObject(6);
  }
  static addType(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addCompare(r, t) {
    r.addFieldOffset(1, t, 0);
  }
  static addVar1Type(r, t) {
    r.addFieldInt8(2, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVar1(r, t) {
    r.addFieldOffset(3, t, 0);
  }
  static addVar2Type(r, t) {
    r.addFieldInt8(4, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVar2(r, t) {
    r.addFieldOffset(5, t, 0);
  }
  static endCompareVar(r) {
    return r.endObject();
  }
  static createCompareVar(r, t, a, e, s, i, o) {
    return (
      CompareVar.startCompareVar(r),
      CompareVar.addType(r, t),
      CompareVar.addCompare(r, a),
      CompareVar.addVar1Type(r, e),
      CompareVar.addVar1(r, s),
      CompareVar.addVar2Type(r, i),
      CompareVar.addVar2(r, o),
      CompareVar.endCompareVar(r)
    );
  }
}
exports.CompareVar = CompareVar;
//# sourceMappingURL=compare-var.js.map
