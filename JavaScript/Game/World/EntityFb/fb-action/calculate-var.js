"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalculateVar = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class CalculateVar {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsCalculateVar(t, a) {
    return (a || new CalculateVar()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCalculateVar(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new CalculateVar()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  var1Type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  var1(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.__union(t, this.bb_pos + a) : void 0;
  }
  op(t) {
    var a = this.bb.__offset(this.bb_pos, 8);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  var2Type() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  var2(t) {
    var a = this.bb.__offset(this.bb_pos, 12);
    return a ? this.bb.__union(t, this.bb_pos + a) : void 0;
  }
  resultType() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  result(t) {
    var a = this.bb.__offset(this.bb_pos, 16);
    return a ? this.bb.__union(t, this.bb_pos + a) : void 0;
  }
  static startCalculateVar(t) {
    t.startObject(7);
  }
  static addVar1Type(t, a) {
    t.addFieldInt8(0, a, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVar1(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static addOp(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static addVar2Type(t, a) {
    t.addFieldInt8(3, a, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVar2(t, a) {
    t.addFieldOffset(4, a, 0);
  }
  static addResultType(t, a) {
    t.addFieldInt8(5, a, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addResult(t, a) {
    t.addFieldOffset(6, a, 0);
  }
  static endCalculateVar(t) {
    return t.endObject();
  }
  static createCalculateVar(t, a, r, e, s, i, u, l) {
    return (
      CalculateVar.startCalculateVar(t),
      CalculateVar.addVar1Type(t, a),
      CalculateVar.addVar1(t, r),
      CalculateVar.addOp(t, e),
      CalculateVar.addVar2Type(t, s),
      CalculateVar.addVar2(t, i),
      CalculateVar.addResultType(t, u),
      CalculateVar.addResult(t, l),
      CalculateVar.endCalculateVar(t)
    );
  }
}
exports.CalculateVar = CalculateVar;
//# sourceMappingURL=calculate-var.js.map
