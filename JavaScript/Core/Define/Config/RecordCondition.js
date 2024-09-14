"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecordCondition = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicStringString_1 = require("./SubType/DicStringString");
class RecordCondition {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get TypeId() {
    return this.typeid();
  }
  get Type() {
    return this.type();
  }
  get Nullenable() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.nullenableLength(),
      this.nullenable,
      this,
    );
  }
  get Param1() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param1Length(),
      this.param1Key,
      this.param1Value,
      this,
    );
  }
  param1Key(t) {
    return this.param1(t)?.key();
  }
  param1Value(t) {
    return this.param1(t)?.value();
  }
  get Param2() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param2Length(),
      this.param2Key,
      this.param2Value,
      this,
    );
  }
  param2Key(t) {
    return this.param2(t)?.key();
  }
  param2Value(t) {
    return this.param2(t)?.value();
  }
  get Param3() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param3Length(),
      this.param3Key,
      this.param3Value,
      this,
    );
  }
  param3Key(t) {
    return this.param3(t)?.key();
  }
  param3Value(t) {
    return this.param3(t)?.value();
  }
  get Param4() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param4Length(),
      this.param4Key,
      this.param4Value,
      this,
    );
  }
  param4Key(t) {
    return this.param4(t)?.key();
  }
  param4Value(t) {
    return this.param4(t)?.value();
  }
  get Param5() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param5Length(),
      this.param5Key,
      this.param5Value,
      this,
    );
  }
  param5Key(t) {
    return this.param5(t)?.key();
  }
  param5Value(t) {
    return this.param5(t)?.value();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRecordCondition(t, i) {
    return (i || new RecordCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetNullenableAt(t) {
    return this.nullenable(t);
  }
  nullenable(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  nullenableLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  nullenableArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetParam1At(t, i) {
    return this.param1(t);
  }
  param1(t, i) {
    var r = this.J7.__offset(this.z7, 10);
    return r
      ? (i || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  param1Length() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetParam2At(t, i) {
    return this.param2(t);
  }
  param2(t, i) {
    var r = this.J7.__offset(this.z7, 12);
    return r
      ? (i || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  param2Length() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetParam3At(t, i) {
    return this.param3(t);
  }
  param3(t, i) {
    var r = this.J7.__offset(this.z7, 14);
    return r
      ? (i || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  param3Length() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetParam4At(t, i) {
    return this.param4(t);
  }
  param4(t, i) {
    var r = this.J7.__offset(this.z7, 16);
    return r
      ? (i || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  param4Length() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetParam5At(t, i) {
    return this.param5(t);
  }
  param5(t, i) {
    var r = this.J7.__offset(this.z7, 18);
    return r
      ? (i || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  param5Length() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RecordCondition = RecordCondition;
//# sourceMappingURL=RecordCondition.js.map
