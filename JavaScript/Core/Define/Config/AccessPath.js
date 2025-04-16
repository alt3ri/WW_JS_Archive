"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AccessPath = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntString_1 = require("./SubType/DicIntString");
class AccessPath {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get SkipName() {
    return this.skipname();
  }
  get Val1() {
    return this.val1();
  }
  get Val2() {
    return this.val2();
  }
  get Val3() {
    return this.val3();
  }
  get FunctionOpenCheckMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.functionopencheckmapLength(),
      this.functionopencheckmapKey,
      this.functionopencheckmapValue,
      this,
    );
  }
  functionopencheckmapKey(t) {
    return this.functionopencheckmap(t)?.key();
  }
  functionopencheckmapValue(t) {
    return this.functionopencheckmap(t)?.value();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get Description() {
    return this.description();
  }
  get ClientCondition() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.clientconditionLength(),
      this.clientcondition,
      this,
    );
  }
  get PathValue() {
    return this.pathvalue();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsAccessPath(t, i) {
    return (i || new AccessPath()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skipname() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : -1;
  }
  val1(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  val2(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  val3(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetFunctionopencheckmapAt(t, i) {
    return this.functionopencheckmap(t);
  }
  functionopencheckmap(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    return s
      ? (i || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  functionopencheckmapLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetClientconditionAt(t) {
    return this.clientcondition(t);
  }
  clientcondition(t) {
    var i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  clientconditionLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  clientconditionArray() {
    var t = this.J7.__offset(this.z7, 22);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  pathvalue(t) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.AccessPath = AccessPath;
//# sourceMappingURL=AccessPath.js.map
