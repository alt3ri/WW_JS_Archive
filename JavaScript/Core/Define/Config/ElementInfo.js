"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ElementInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ElementInfo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Describe() {
    return this.describe();
  }
  get Name() {
    return this.name();
  }
  get Icon() {
    return this.icon();
  }
  get Icon2() {
    return this.icon2();
  }
  get Icon3() {
    return this.icon3();
  }
  get Icon4() {
    return this.icon4();
  }
  get Icon4Pure() {
    return this.icon4pure();
  }
  get Icon5() {
    return this.icon5();
  }
  get Icon6() {
    return this.icon6();
  }
  get Icon7() {
    return this.icon7();
  }
  get ElementChangeTexture() {
    return this.elementchangetexture();
  }
  get ElementEffectColor() {
    return this.elementeffectcolor();
  }
  get ElementColor() {
    return this.elementcolor();
  }
  get SkillTreeEffectColor() {
    return this.skilltreeeffectcolor();
  }
  get SkillTreeIconColor() {
    return this.skilltreeiconcolor();
  }
  get SkillTreeLineColor() {
    return this.skilltreelinecolor();
  }
  get Effect() {
    return this.effect();
  }
  get EffectTexturePath() {
    return this.effecttexturepath();
  }
  get GachaElementBgSpritePath() {
    return this.gachaelementbgspritepath();
  }
  get GachaSpritePath() {
    return this.gachaspritepath();
  }
  get UltimateSkillColor() {
    return this.ultimateskillcolor();
  }
  get SkillEffectColor() {
    return this.skilleffectcolor();
  }
  get SkillButtonEffectPath() {
    return this.skillbuttoneffectpath();
  }
  get ElementBallEffectPath() {
    return this.elementballeffectpath();
  }
  get AudioEvent() {
    return this.audioevent();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsElementInfo(t, e) {
    return (e || new ElementInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  describe(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  icon(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  icon2(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  icon3(t) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  icon4(t) {
    var e = this.J7.__offset(this.z7, 16),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  icon4pure(t) {
    var e = this.J7.__offset(this.z7, 18),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  icon5(t) {
    var e = this.J7.__offset(this.z7, 20),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  icon6(t) {
    var e = this.J7.__offset(this.z7, 22),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  icon7(t) {
    var e = this.J7.__offset(this.z7, 24),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  elementchangetexture(t) {
    var e = this.J7.__offset(this.z7, 26),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  elementeffectcolor(t) {
    var e = this.J7.__offset(this.z7, 28),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  elementcolor(t) {
    var e = this.J7.__offset(this.z7, 30),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  skilltreeeffectcolor(t) {
    var e = this.J7.__offset(this.z7, 32),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  skilltreeiconcolor(t) {
    var e = this.J7.__offset(this.z7, 34),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  skilltreelinecolor(t) {
    var e = this.J7.__offset(this.z7, 36),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  effect(t) {
    var e = this.J7.__offset(this.z7, 38),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  effecttexturepath(t) {
    var e = this.J7.__offset(this.z7, 40),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  gachaelementbgspritepath(t) {
    var e = this.J7.__offset(this.z7, 42),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  gachaspritepath(t) {
    var e = this.J7.__offset(this.z7, 44),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  ultimateskillcolor(t) {
    var e = this.J7.__offset(this.z7, 46),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  skilleffectcolor(t) {
    var e = this.J7.__offset(this.z7, 48),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  skillbuttoneffectpath(t) {
    var e = this.J7.__offset(this.z7, 50),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  elementballeffectpath(t) {
    var e = this.J7.__offset(this.z7, 52),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  audioevent(t) {
    var e = this.J7.__offset(this.z7, 54),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.ElementInfo = ElementInfo;
//# sourceMappingURL=ElementInfo.js.map
