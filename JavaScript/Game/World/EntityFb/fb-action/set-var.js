"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetVar = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class SetVar {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsSetVar(t, r) {
    return (r || new SetVar()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetVar(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new SetVar()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  varLeftType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  varLeft(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__union(t, this.bb_pos + r) : void 0;
  }
  varRightType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  varRight(t) {
    var r = this.bb.__offset(this.bb_pos, 10);
    return r ? this.bb.__union(t, this.bb_pos + r) : void 0;
  }
  static startSetVar(t) {
    t.startObject(4);
  }
  static addVarLeftType(t, r) {
    t.addFieldInt8(0, r, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarLeft(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addVarRightType(t, r) {
    t.addFieldInt8(2, r, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarRight(t, r) {
    t.addFieldOffset(3, r, 0);
  }
  static endSetVar(t) {
    return t.endObject();
  }
  static createSetVar(t, r, e, a, s) {
    return (
      SetVar.startSetVar(t),
      SetVar.addVarLeftType(t, r),
      SetVar.addVarLeft(t, e),
      SetVar.addVarRightType(t, a),
      SetVar.addVarRight(t, s),
      SetVar.endSetVar(t)
    );
  }
}
exports.SetVar = SetVar;
//# sourceMappingURL=set-var.js.map
