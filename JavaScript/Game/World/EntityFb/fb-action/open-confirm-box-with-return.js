"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenConfirmBoxWithReturn = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class OpenConfirmBoxWithReturn {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsOpenConfirmBoxWithReturn(t, r) {
    return (r || new OpenConfirmBoxWithReturn()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOpenConfirmBoxWithReturn(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new OpenConfirmBoxWithReturn()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  returnVarType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  returnVar(t) {
    var r = this.bb.__offset(this.bb_pos, 10);
    return r ? this.bb.__union(t, this.bb_pos + r) : void 0;
  }
  static startOpenConfirmBoxWithReturn(t) {
    t.startObject(4);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addId(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static addReturnVarType(t, r) {
    t.addFieldInt8(2, r, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addReturnVar(t, r) {
    t.addFieldOffset(3, r, 0);
  }
  static endOpenConfirmBoxWithReturn(t) {
    return t.endObject();
  }
  static createOpenConfirmBoxWithReturn(t, r, e, i, n) {
    return (
      OpenConfirmBoxWithReturn.startOpenConfirmBoxWithReturn(t),
      OpenConfirmBoxWithReturn.addType(t, r),
      OpenConfirmBoxWithReturn.addId(t, e),
      OpenConfirmBoxWithReturn.addReturnVarType(t, i),
      OpenConfirmBoxWithReturn.addReturnVar(t, n),
      OpenConfirmBoxWithReturn.endOpenConfirmBoxWithReturn(t)
    );
  }
}
exports.OpenConfirmBoxWithReturn = OpenConfirmBoxWithReturn;
//# sourceMappingURL=open-confirm-box-with-return.js.map
