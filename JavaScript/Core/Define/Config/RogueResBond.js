"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResBond = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  DicIntIntArray_1 = require("./SubType/DicIntIntArray"),
  DicIntString_1 = require("./SubType/DicIntString");
class RogueResBond {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Rarity() {
    return this.rarity();
  }
  get StarMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.starmapLength(),
      this.starmapKey,
      this.starmapValue,
      this,
    );
  }
  starmapKey(t) {
    return this.starmap(t)?.key();
  }
  starmapValue(t) {
    return this.starmap(t)?.value();
  }
  get BattleEffect() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.battleeffectLength(),
      this.battleeffectKey,
      this.battleeffectValue,
      this,
    );
  }
  battleeffectKey(t) {
    return this.battleeffect(t)?.key();
  }
  battleeffectValue(t) {
    return this.battleeffect(t)?.value();
  }
  get ExploreEffect() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.exploreeffectLength(),
      this.exploreeffectKey,
      this.exploreeffectValue,
      this,
    );
  }
  exploreeffectKey(t) {
    return this.exploreeffect(t)?.key();
  }
  exploreeffectValue(t) {
    return this.exploreeffect(t)?.value();
  }
  get LinkEffect() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.linkeffectLength(),
      this.linkeffectKey,
      this.linkeffectValue,
      this,
    );
  }
  linkeffectKey(t) {
    return this.linkeffect(t)?.key();
  }
  linkeffectValue(t) {
    return this.linkeffect(t)?.value();
  }
  get Cond() {
    return this.cond();
  }
  get Icon() {
    return this.icon();
  }
  get Name() {
    return this.name();
  }
  get FightEffectDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.fighteffectdescLength(),
      this.fighteffectdesc,
      this,
    );
  }
  get FightEffectDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.fighteffectdescparamLength(),
      this.fighteffectdescparam,
      this,
    );
  }
  get ExploreEffectDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.exploreeffectdescLength(),
      this.exploreeffectdesc,
      this,
    );
  }
  get ExploreEffectDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.exploreeffectdescparamLength(),
      this.exploreeffectdescparam,
      this,
    );
  }
  get LinkEffectDesc() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.linkeffectdescLength(),
      this.linkeffectdescKey,
      this.linkeffectdescValue,
      this,
    );
  }
  linkeffectdescKey(t) {
    return this.linkeffectdesc(t)?.key();
  }
  linkeffectdescValue(t) {
    return this.linkeffectdesc(t)?.value();
  }
  get LinkEffectDescParam() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.linkeffectdescparamLength(),
      this.linkeffectdescparamKey,
      this.linkeffectdescparamValue,
      this,
    );
  }
  linkeffectdescparamKey(t) {
    return this.linkeffectdescparam(t)?.key();
  }
  linkeffectdescparamValue(t) {
    return this.linkeffectdescparam(t)?.value();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRogueResBond(t, e) {
    return (e || new RogueResBond()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rarity() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetStarmapAt(t, e) {
    return this.starmap(t);
  }
  starmap(t, e) {
    var i = this.J7.__offset(this.z7, 8);
    return i
      ? (e || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  starmapLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetBattleeffectAt(t, e) {
    return this.battleeffect(t);
  }
  battleeffect(t, e) {
    var i = this.J7.__offset(this.z7, 10);
    return i
      ? (e || new DicIntIntArray_1.DicIntIntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  battleeffectLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetExploreeffectAt(t, e) {
    return this.exploreeffect(t);
  }
  exploreeffect(t, e) {
    var i = this.J7.__offset(this.z7, 12);
    return i
      ? (e || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  exploreeffectLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetLinkeffectAt(t, e) {
    return this.linkeffect(t);
  }
  linkeffect(t, e) {
    var i = this.J7.__offset(this.z7, 14);
    return i
      ? (e || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  linkeffectLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  cond() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  icon(t) {
    var e = this.J7.__offset(this.z7, 18),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 20),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  GetFighteffectdescAt(t) {
    return this.fighteffectdesc(t);
  }
  fighteffectdesc(t, e) {
    var i = this.J7.__offset(this.z7, 22),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, e) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  fighteffectdescLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetFighteffectdescparamAt(t) {
    return this.fighteffectdescparam(t);
  }
  fighteffectdescparam(t, e) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, e) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  fighteffectdescparamLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetExploreeffectdescAt(t) {
    return this.exploreeffectdesc(t);
  }
  exploreeffectdesc(t, e) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, e) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  exploreeffectdescLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetExploreeffectdescparamAt(t) {
    return this.exploreeffectdescparam(t);
  }
  exploreeffectdescparam(t, e) {
    var i = this.J7.__offset(this.z7, 28),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, e) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  exploreeffectdescparamLength() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetLinkeffectdescAt(t, e) {
    return this.linkeffectdesc(t);
  }
  linkeffectdesc(t, e) {
    var i = this.J7.__offset(this.z7, 30);
    return i
      ? (e || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  linkeffectdescLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetLinkeffectdescparamAt(t, e) {
    return this.linkeffectdescparam(t);
  }
  linkeffectdescparam(t, e) {
    var i = this.J7.__offset(this.z7, 32);
    return i
      ? (e || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  linkeffectdescparamLength() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RogueResBond = RogueResBond;
//# sourceMappingURL=RogueResBond.js.map
