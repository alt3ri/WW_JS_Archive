"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetTime = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class SetTime {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetTime(t, e) {
    return (e || new SetTime()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetTime(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetTime()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
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
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startSetTime(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTime(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addVarForTimeType(t, e) {
    t.addFieldInt8(2, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarForTime(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endSetTime(t) {
    return t.endObject();
  }
  static createSetTime(t, e, i, r, s) {
    return (
      SetTime.startSetTime(t),
      SetTime.addType(t, e),
      SetTime.addTime(t, i),
      SetTime.addVarForTimeType(t, r),
      SetTime.addVarForTime(t, s),
      SetTime.endSetTime(t)
    );
  }
}
exports.SetTime = SetTime;
//# sourceMappingURL=set-time.js.map
