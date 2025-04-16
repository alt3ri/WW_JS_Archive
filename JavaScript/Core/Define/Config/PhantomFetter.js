"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomFetter = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  ConfigPropValue_1 = require("./SubType/ConfigPropValue");
class PhantomFetter {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get BuffIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffidsLength(),
      this.buffids,
      this,
    );
  }
  get AddProp() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.addpropLength(),
      this.addprop,
      this,
    );
  }
  get EffectDescription() {
    return this.effectdescription();
  }
  get FetterIcon() {
    return this.fettericon();
  }
  get SimplyEffectDesc() {
    return this.simplyeffectdesc();
  }
  get EffectDescriptionParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.effectdescriptionparamLength(),
      this.effectdescriptionparam,
      this,
    );
  }
  get EffectDefineDescription() {
    return this.effectdefinedescription();
  }
  get Priority() {
    return this.priority();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsPhantomFetter(t, i) {
    return (i || new PhantomFetter()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetBuffidsAt(t) {
    return this.buffids(t);
  }
  buffids(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readFloat64(this.J7.__vector(this.z7 + i) + 8 * t) : 0;
  }
  buffidsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  buffidsArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetAddpropAt(t, i) {
    return this.addprop(t);
  }
  addprop(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    return s
      ? (i || new ConfigPropValue_1.ConfigPropValue()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  addpropLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  effectdescription(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  fettericon(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  simplyeffectdesc(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetEffectdescriptionparamAt(t) {
    return this.effectdescriptionparam(t);
  }
  effectdescriptionparam(t, i) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  effectdescriptionparamLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  effectdefinedescription(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  priority() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.PhantomFetter = PhantomFetter;
//# sourceMappingURL=PhantomFetter.js.map
