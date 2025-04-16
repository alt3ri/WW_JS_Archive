"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingTechEffect = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class FishingTechEffect {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get Consume() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.consumeLength(),
      this.consumeKey,
      this.consumeValue,
      this,
    );
  }
  consumeKey(t) {
    return this.consume(t)?.key();
  }
  consumeValue(t) {
    return this.consume(t)?.value();
  }
  get Desc() {
    return this.desc();
  }
  get Params() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.paramsLength(),
      this.params,
      this,
    );
  }
  get ParamDic() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.paramdicLength(),
      this.paramdicKey,
      this.paramdicValue,
      this,
    );
  }
  paramdicKey(t) {
    return this.paramdic(t)?.key();
  }
  paramdicValue(t) {
    return this.paramdic(t)?.value();
  }
  get ShowParams() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.showparamsLength(),
      this.showparams,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsFishingTechEffect(t, s) {
    return (s || new FishingTechEffect()).__init(
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
  GetConsumeAt(t, s) {
    return this.consume(t);
  }
  consume(t, s) {
    var i = this.J7.__offset(this.z7, 8);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  consumeLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetParamsAt(t) {
    return this.params(t);
  }
  params(t) {
    var s = this.J7.__offset(this.z7, 12);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  paramsLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  paramsArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetParamdicAt(t, s) {
    return this.paramdic(t);
  }
  paramdic(t, s) {
    var i = this.J7.__offset(this.z7, 14);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  paramdicLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetShowparamsAt(t) {
    return this.showparams(t);
  }
  showparams(t, s) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  showparamsLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.FishingTechEffect = FishingTechEffect;
//# sourceMappingURL=FishingTechEffect.js.map
