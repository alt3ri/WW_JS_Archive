"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReduceTime = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class ReduceTime {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsReduceTime(e, t) {
    return (t || new ReduceTime()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsReduceTime(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ReduceTime()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  time() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  varForTimeType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  varForTime(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startReduceTime(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTime(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addVarForTimeType(e, t) {
    e.addFieldInt8(2, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarForTime(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static endReduceTime(e) {
    return e.endObject();
  }
  static createReduceTime(e, t, i, r, s) {
    return (
      ReduceTime.startReduceTime(e),
      ReduceTime.addType(e, t),
      ReduceTime.addTime(e, i),
      ReduceTime.addVarForTimeType(e, r),
      ReduceTime.addVarForTime(e, s),
      ReduceTime.endReduceTime(e)
    );
  }
}
exports.ReduceTime = ReduceTime;
//# sourceMappingURL=reduce-time.js.map
