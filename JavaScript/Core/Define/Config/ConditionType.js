"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConditionType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicStringString_1 = require("./SubType/DicStringString");
class ConditionType {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Type() {
    return this.type();
  }
  get IsClientTrigger() {
    return this.isclienttrigger();
  }
  get SubType() {
    return this.subtype();
  }
  get RegisterPlaces() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.registerplacesLength(),
      this.registerplaces,
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
  get DefaultParam1() {
    return this.defaultparam1();
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
  get DefaultParam2() {
    return this.defaultparam2();
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
  get DefaultParam3() {
    return this.defaultparam3();
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
  get DefaultParam4() {
    return this.defaultparam4();
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
  get DefaultParam5() {
    return this.defaultparam5();
  }
  get Param6() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param6Length(),
      this.param6Key,
      this.param6Value,
      this,
    );
  }
  param6Key(t) {
    return this.param6(t)?.key();
  }
  param6Value(t) {
    return this.param6(t)?.value();
  }
  get DefaultParam6() {
    return this.defaultparam6();
  }
  get Param7() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param7Length(),
      this.param7Key,
      this.param7Value,
      this,
    );
  }
  param7Key(t) {
    return this.param7(t)?.key();
  }
  param7Value(t) {
    return this.param7(t)?.value();
  }
  get DefaultParam7() {
    return this.defaultparam7();
  }
  get Param8() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param8Length(),
      this.param8Key,
      this.param8Value,
      this,
    );
  }
  param8Key(t) {
    return this.param8(t)?.key();
  }
  param8Value(t) {
    return this.param8(t)?.value();
  }
  get DefaultParam8() {
    return this.defaultparam8();
  }
  get Param9() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param9Length(),
      this.param9Key,
      this.param9Value,
      this,
    );
  }
  param9Key(t) {
    return this.param9(t)?.key();
  }
  param9Value(t) {
    return this.param9(t)?.value();
  }
  get DefaultParam9() {
    return this.defaultparam9();
  }
  get Param10() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param10Length(),
      this.param10Key,
      this.param10Value,
      this,
    );
  }
  param10Key(t) {
    return this.param10(t)?.key();
  }
  param10Value(t) {
    return this.param10(t)?.value();
  }
  get DefaultParam10() {
    return this.defaultparam10();
  }
  get Param11() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param11Length(),
      this.param11Key,
      this.param11Value,
      this,
    );
  }
  param11Key(t) {
    return this.param11(t)?.key();
  }
  param11Value(t) {
    return this.param11(t)?.value();
  }
  get DefaultParam11() {
    return this.defaultparam11();
  }
  get Param12() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param12Length(),
      this.param12Key,
      this.param12Value,
      this,
    );
  }
  param12Key(t) {
    return this.param12(t)?.key();
  }
  param12Value(t) {
    return this.param12(t)?.value();
  }
  get DefaultParam12() {
    return this.defaultparam12();
  }
  get Param13() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param13Length(),
      this.param13Key,
      this.param13Value,
      this,
    );
  }
  param13Key(t) {
    return this.param13(t)?.key();
  }
  param13Value(t) {
    return this.param13(t)?.value();
  }
  get DefaultParam13() {
    return this.defaultparam13();
  }
  get Param14() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param14Length(),
      this.param14Key,
      this.param14Value,
      this,
    );
  }
  param14Key(t) {
    return this.param14(t)?.key();
  }
  param14Value(t) {
    return this.param14(t)?.value();
  }
  get DefaultParam14() {
    return this.defaultparam14();
  }
  get Param15() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param15Length(),
      this.param15Key,
      this.param15Value,
      this,
    );
  }
  param15Key(t) {
    return this.param15(t)?.key();
  }
  param15Value(t) {
    return this.param15(t)?.value();
  }
  get DefaultParam15() {
    return this.defaultparam15();
  }
  get Param16() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.param16Length(),
      this.param16Key,
      this.param16Value,
      this,
    );
  }
  param16Key(t) {
    return this.param16(t)?.key();
  }
  param16Value(t) {
    return this.param16(t)?.value();
  }
  get DefaultParam16() {
    return this.defaultparam16();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsConditionType(t, r) {
    return (r || new ConditionType()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  type(t) {
    var r = this.J7.__offset(this.z7, 4);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  isclienttrigger() {
    var t = this.J7.__offset(this.z7, 6);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  subtype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRegisterplacesAt(t) {
    return this.registerplaces(t);
  }
  registerplaces(t) {
    var r = this.J7.__offset(this.z7, 10);
    return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
  }
  registerplacesLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  registerplacesArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetParam1At(t, r) {
    return this.param1(t);
  }
  param1(t, r) {
    var i = this.J7.__offset(this.z7, 12);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param1Length() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam1(t) {
    var r = this.J7.__offset(this.z7, 14);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam2At(t, r) {
    return this.param2(t);
  }
  param2(t, r) {
    var i = this.J7.__offset(this.z7, 16);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param2Length() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam2(t) {
    var r = this.J7.__offset(this.z7, 18);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam3At(t, r) {
    return this.param3(t);
  }
  param3(t, r) {
    var i = this.J7.__offset(this.z7, 20);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param3Length() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam3(t) {
    var r = this.J7.__offset(this.z7, 22);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam4At(t, r) {
    return this.param4(t);
  }
  param4(t, r) {
    var i = this.J7.__offset(this.z7, 24);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param4Length() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam4(t) {
    var r = this.J7.__offset(this.z7, 26);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam5At(t, r) {
    return this.param5(t);
  }
  param5(t, r) {
    var i = this.J7.__offset(this.z7, 28);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param5Length() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam5(t) {
    var r = this.J7.__offset(this.z7, 30);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam6At(t, r) {
    return this.param6(t);
  }
  param6(t, r) {
    var i = this.J7.__offset(this.z7, 32);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param6Length() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam6(t) {
    var r = this.J7.__offset(this.z7, 34);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam7At(t, r) {
    return this.param7(t);
  }
  param7(t, r) {
    var i = this.J7.__offset(this.z7, 36);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param7Length() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam7(t) {
    var r = this.J7.__offset(this.z7, 38);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam8At(t, r) {
    return this.param8(t);
  }
  param8(t, r) {
    var i = this.J7.__offset(this.z7, 40);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param8Length() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam8(t) {
    var r = this.J7.__offset(this.z7, 42);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam9At(t, r) {
    return this.param9(t);
  }
  param9(t, r) {
    var i = this.J7.__offset(this.z7, 44);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param9Length() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam9(t) {
    var r = this.J7.__offset(this.z7, 46);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam10At(t, r) {
    return this.param10(t);
  }
  param10(t, r) {
    var i = this.J7.__offset(this.z7, 48);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param10Length() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam10(t) {
    var r = this.J7.__offset(this.z7, 50);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam11At(t, r) {
    return this.param11(t);
  }
  param11(t, r) {
    var i = this.J7.__offset(this.z7, 52);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param11Length() {
    var t = this.J7.__offset(this.z7, 52);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam11(t) {
    var r = this.J7.__offset(this.z7, 54);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam12At(t, r) {
    return this.param12(t);
  }
  param12(t, r) {
    var i = this.J7.__offset(this.z7, 56);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param12Length() {
    var t = this.J7.__offset(this.z7, 56);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam12(t) {
    var r = this.J7.__offset(this.z7, 58);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam13At(t, r) {
    return this.param13(t);
  }
  param13(t, r) {
    var i = this.J7.__offset(this.z7, 60);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param13Length() {
    var t = this.J7.__offset(this.z7, 60);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam13(t) {
    var r = this.J7.__offset(this.z7, 62);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam14At(t, r) {
    return this.param14(t);
  }
  param14(t, r) {
    var i = this.J7.__offset(this.z7, 64);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param14Length() {
    var t = this.J7.__offset(this.z7, 64);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam14(t) {
    var r = this.J7.__offset(this.z7, 66);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam15At(t, r) {
    return this.param15(t);
  }
  param15(t, r) {
    var i = this.J7.__offset(this.z7, 68);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param15Length() {
    var t = this.J7.__offset(this.z7, 68);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam15(t) {
    var r = this.J7.__offset(this.z7, 70);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  GetParam16At(t, r) {
    return this.param16(t);
  }
  param16(t, r) {
    var i = this.J7.__offset(this.z7, 72);
    return i
      ? (r || new DicStringString_1.DicStringString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  param16Length() {
    var t = this.J7.__offset(this.z7, 72);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  defaultparam16(t) {
    var r = this.J7.__offset(this.z7, 74);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
}
exports.ConditionType = ConditionType;
//# sourceMappingURL=ConditionType.js.map
