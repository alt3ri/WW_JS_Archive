"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Condition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_var_js_1 = require("../fb-action/union-var.js");
class Condition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCondition(t, i) {
    return (i || new Condition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new Condition()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  var1Type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_js_1.UnionVar.NONE;
  }
  var1(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  var2Type() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_var_js_1.UnionVar.NONE;
  }
  var2(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  compare(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startCondition(t) {
    t.startObject(5);
  }
  static addVar1Type(t, i) {
    t.addFieldInt8(0, i, union_var_js_1.UnionVar.NONE);
  }
  static addVar1(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addVar2Type(t, i) {
    t.addFieldInt8(2, i, union_var_js_1.UnionVar.NONE);
  }
  static addVar2(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addCompare(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endCondition(t) {
    return t.endObject();
  }
  static createCondition(t, i, n, s, r, o) {
    return (
      Condition.startCondition(t),
      Condition.addVar1Type(t, i),
      Condition.addVar1(t, n),
      Condition.addVar2Type(t, s),
      Condition.addVar2(t, r),
      Condition.addCompare(t, o),
      Condition.endCondition(t)
    );
  }
}
exports.Condition = Condition;
//# sourceMappingURL=condition.js.map
