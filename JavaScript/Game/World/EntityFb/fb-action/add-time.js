"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddTime = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class AddTime {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsAddTime(t, i) {
    return (i || new AddTime()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAddTime(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new AddTime()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  varForTimeType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_ref_js_1.UnionVarRef.NONE;
  }
  varForTime(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startAddTime(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTime(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addVarForTimeType(t, i) {
    t.addFieldInt8(2, i, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarForTime(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endAddTime(t) {
    return t.endObject();
  }
  static createAddTime(t, i, e, r, s) {
    return (
      AddTime.startAddTime(t),
      AddTime.addType(t, i),
      AddTime.addTime(t, e),
      AddTime.addVarForTimeType(t, r),
      AddTime.addVarForTime(t, s),
      AddTime.endAddTime(t)
    );
  }
}
exports.AddTime = AddTime;
//# sourceMappingURL=add-time.js.map
