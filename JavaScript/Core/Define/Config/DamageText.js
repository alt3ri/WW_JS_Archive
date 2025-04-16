"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageText = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DamageText {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get CommonIcon() {
    return this.commonicon();
  }
  get CritIcon() {
    return this.criticon();
  }
  get CritNiagaraPath() {
    return this.critniagarapath();
  }
  get TextColor() {
    return this.textcolor();
  }
  get StrokeColor() {
    return this.strokecolor();
  }
  get CritTextColor() {
    return this.crittextcolor();
  }
  get CritStrokeColor() {
    return this.critstrokecolor();
  }
  get MinDeviationX() {
    return this.mindeviationx();
  }
  get MinDeviationY() {
    return this.mindeviationy();
  }
  get MaxDeviationX() {
    return this.maxdeviationx();
  }
  get MaxDeviationY() {
    return this.maxdeviationy();
  }
  get OwnDamageSequence() {
    return this.owndamagesequence();
  }
  get OwnCriticalDamageSequence() {
    return this.owncriticaldamagesequence();
  }
  get MonsterDamageSequence() {
    return this.monsterdamagesequence();
  }
  get MonsterCriticalDamageSequence() {
    return this.monstercriticaldamagesequence();
  }
  get DamageTextSequence() {
    return this.damagetextsequence();
  }
  get IsPreload() {
    return this.ispreload();
  }
  get OwnCommonDamageCurvePath() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.owncommondamagecurvepathLength(),
      this.owncommondamagecurvepath,
      this,
    );
  }
  get OwnCriticalDamageCurvePath() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.owncriticaldamagecurvepathLength(),
      this.owncriticaldamagecurvepath,
      this,
    );
  }
  get MonsterCommonDamageCurvePath() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.monstercommondamagecurvepathLength(),
      this.monstercommondamagecurvepath,
      this,
    );
  }
  get MonsterCriticalDamageCurvePath() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.monstercriticaldamagecurvepathLength(),
      this.monstercriticaldamagecurvepath,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDamageText(t, i) {
    return (i || new DamageText()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  commonicon(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  criticon(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  critniagarapath(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  textcolor(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  strokecolor(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  crittextcolor(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  critstrokecolor(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  mindeviationx() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mindeviationy() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxdeviationx() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxdeviationy() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  owndamagesequence(t) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  owncriticaldamagesequence(t) {
    var i = this.J7.__offset(this.z7, 30),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  monsterdamagesequence(t) {
    var i = this.J7.__offset(this.z7, 32),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  monstercriticaldamagesequence(t) {
    var i = this.J7.__offset(this.z7, 34),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  damagetextsequence(t) {
    var i = this.J7.__offset(this.z7, 36),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  ispreload() {
    var t = this.J7.__offset(this.z7, 38);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetOwncommondamagecurvepathAt(t) {
    return this.owncommondamagecurvepath(t);
  }
  owncommondamagecurvepath(t, i) {
    var e = this.J7.__offset(this.z7, 40),
      e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, i) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  owncommondamagecurvepathLength() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetOwncriticaldamagecurvepathAt(t) {
    return this.owncriticaldamagecurvepath(t);
  }
  owncriticaldamagecurvepath(t, i) {
    var e = this.J7.__offset(this.z7, 42),
      e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, i) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  owncriticaldamagecurvepathLength() {
    var t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetMonstercommondamagecurvepathAt(t) {
    return this.monstercommondamagecurvepath(t);
  }
  monstercommondamagecurvepath(t, i) {
    var e = this.J7.__offset(this.z7, 44),
      e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, i) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  monstercommondamagecurvepathLength() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetMonstercriticaldamagecurvepathAt(t) {
    return this.monstercriticaldamagecurvepath(t);
  }
  monstercriticaldamagecurvepath(t, i) {
    var e = this.J7.__offset(this.z7, 46),
      e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, i) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  monstercriticaldamagecurvepathLength() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.DamageText = DamageText;
//# sourceMappingURL=DamageText.js.map
