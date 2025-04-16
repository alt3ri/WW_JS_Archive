"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConstVarRef = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_config_js_1 = require("../fb-var/union-var-config.js");
class ConstVarRef {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsConstVarRef(t, s) {
    return (s || new ConstVarRef()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsConstVarRef(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new ConstVarRef()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  source(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  valueType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_config_js_1.UnionVarConfig.NONE;
  }
  value(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s ? this.bb.__union(t, this.bb_pos + s) : void 0;
  }
  static startConstVarRef(t) {
    t.startObject(4);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addSource(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addValueType(t, s) {
    t.addFieldInt8(2, s, union_var_config_js_1.UnionVarConfig.NONE);
  }
  static addValue(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static endConstVarRef(t) {
    return t.endObject();
  }
  static createConstVarRef(t, s, e, r, i) {
    return (
      ConstVarRef.startConstVarRef(t),
      ConstVarRef.addType(t, s),
      ConstVarRef.addSource(t, e),
      ConstVarRef.addValueType(t, r),
      ConstVarRef.addValue(t, i),
      ConstVarRef.endConstVarRef(t)
    );
  }
}
exports.ConstVarRef = ConstVarRef;
//# sourceMappingURL=const-var-ref.js.map
