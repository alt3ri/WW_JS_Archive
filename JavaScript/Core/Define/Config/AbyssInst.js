"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssInst = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  DicIntString_1 = require("./SubType/DicIntString");
class AbyssInst {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get InstId() {
    return this.instid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get InstEntranceId() {
    return this.instentranceid();
  }
  get RouteId() {
    return this.routeid();
  }
  get Difficulty() {
    return this.difficulty();
  }
  get OpenDay() {
    return this.openday();
  }
  get IsEndless() {
    return this.isendless();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get ConsumeItem() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.consumeitemLength(),
      this.consumeitemKey,
      this.consumeitemValue,
      this,
    );
  }
  consumeitemKey(t) {
    return this.consumeitem(t)?.key();
  }
  consumeitemValue(t) {
    return this.consumeitem(t)?.value();
  }
  get BuffIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffidsLength(),
      this.buffids,
      this,
    );
  }
  get ReviveTimes() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.revivetimesLength(),
      this.revivetimes,
      this,
    );
  }
  get SingleReviveDelay() {
    return this.singlerevivedelay();
  }
  get MultiReviveDelay() {
    return this.multirevivedelay();
  }
  get UnlockLittleRole() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.unlocklittleroleLength(),
      this.unlocklittlerole,
      this,
    );
  }
  get RankOpen() {
    return this.rankopen();
  }
  get TotalTime() {
    return this.totaltime();
  }
  get BtPropName() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.btpropnameLength(),
      this.btpropnameKey,
      this.btpropnameValue,
      this,
    );
  }
  btpropnameKey(t) {
    return this.btpropname(t)?.key();
  }
  btpropnameValue(t) {
    return this.btpropname(t)?.value();
  }
  get TotalScore() {
    return this.totalscore();
  }
  get MonsterTypeScore() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.monstertypescoreLength(),
      this.monstertypescoreKey,
      this.monstertypescoreValue,
      this,
    );
  }
  monstertypescoreKey(t) {
    return this.monstertypescore(t)?.key();
  }
  monstertypescoreValue(t) {
    return this.monstertypescore(t)?.value();
  }
  get RewardTime() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.rewardtimeLength(),
      this.rewardtimeKey,
      this.rewardtimeValue,
      this,
    );
  }
  rewardtimeKey(t) {
    return this.rewardtime(t)?.key();
  }
  rewardtimeValue(t) {
    return this.rewardtime(t)?.value();
  }
  get DropPreviewId() {
    return this.droppreviewid();
  }
  get Title() {
    return this.title();
  }
  get SubTitle() {
    return this.subtitle();
  }
  get Desc() {
    return this.desc();
  }
  get Goat() {
    return this.goat();
  }
  get UnLockDesc() {
    return this.unlockdesc();
  }
  get AbyssColor() {
    return this.abysscolor();
  }
  get SmallWorldShowSceneItem() {
    return this.smallworldshowsceneitem();
  }
  get AbyssShowCake() {
    return this.abyssshowcake();
  }
  get RecommendLittleRole() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.recommendlittleroleLength(),
      this.recommendlittlerole,
      this,
    );
  }
  get AbyssDevelopEntr() {
    return this.abyssdevelopentr();
  }
  get AbyssStoreEntr() {
    return this.abyssstoreentr();
  }
  get AbyssSynthesisEntr() {
    return this.abysssynthesisentr();
  }
  get AbyssRank() {
    return this.abyssrank();
  }
  get IfStoryChallenge() {
    return this.ifstorychallenge();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsAbyssInst(t, s) {
    return (s || new AbyssInst()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instentranceid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  routeid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  difficulty() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  openday() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  isendless() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetConsumeitemAt(t, s) {
    return this.consumeitem(t);
  }
  consumeitem(t, s) {
    var i = this.J7.__offset(this.z7, 22);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  consumeitemLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetBuffidsAt(t) {
    return this.buffids(t);
  }
  buffids(t) {
    var s = this.J7.__offset(this.z7, 24);
    return s ? this.J7.readFloat64(this.J7.__vector(this.z7 + s) + 8 * t) : 0;
  }
  buffidsLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  buffidsArray() {
    var t = this.J7.__offset(this.z7, 24);
    return t
      ? new Float64Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetRevivetimesAt(t) {
    return this.revivetimes(t);
  }
  revivetimes(t) {
    var s = this.J7.__offset(this.z7, 26);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  revivetimesLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  revivetimesArray() {
    var t = this.J7.__offset(this.z7, 26);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  singlerevivedelay() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  multirevivedelay() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetUnlocklittleroleAt(t) {
    return this.unlocklittlerole(t);
  }
  unlocklittlerole(t) {
    var s = this.J7.__offset(this.z7, 32);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  unlocklittleroleLength() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  unlocklittleroleArray() {
    var t = this.J7.__offset(this.z7, 32);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  rankopen() {
    var t = this.J7.__offset(this.z7, 34);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  totaltime() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBtpropnameAt(t, s) {
    return this.btpropname(t);
  }
  btpropname(t, s) {
    var i = this.J7.__offset(this.z7, 38);
    return i
      ? (s || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  btpropnameLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  totalscore() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetMonstertypescoreAt(t, s) {
    return this.monstertypescore(t);
  }
  monstertypescore(t, s) {
    var i = this.J7.__offset(this.z7, 42);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  monstertypescoreLength() {
    var t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetRewardtimeAt(t, s) {
    return this.rewardtime(t);
  }
  rewardtime(t, s) {
    var i = this.J7.__offset(this.z7, 44);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  rewardtimeLength() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  droppreviewid() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  title(t) {
    var s = this.J7.__offset(this.z7, 48),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  subtitle(t) {
    var s = this.J7.__offset(this.z7, 50),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 52),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  goat(t) {
    var s = this.J7.__offset(this.z7, 54),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  unlockdesc(t) {
    var s = this.J7.__offset(this.z7, 56),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  abysscolor(t) {
    var s = this.J7.__offset(this.z7, 58),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  smallworldshowsceneitem(t) {
    var s = this.J7.__offset(this.z7, 60),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  abyssshowcake(t) {
    var s = this.J7.__offset(this.z7, 62),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetRecommendlittleroleAt(t) {
    return this.recommendlittlerole(t);
  }
  recommendlittlerole(t) {
    var s = this.J7.__offset(this.z7, 64);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  recommendlittleroleLength() {
    var t = this.J7.__offset(this.z7, 64);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  recommendlittleroleArray() {
    var t = this.J7.__offset(this.z7, 64);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  abyssdevelopentr() {
    var t = this.J7.__offset(this.z7, 66);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  abyssstoreentr() {
    var t = this.J7.__offset(this.z7, 68);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  abysssynthesisentr() {
    var t = this.J7.__offset(this.z7, 70);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  abyssrank() {
    var t = this.J7.__offset(this.z7, 72);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  ifstorychallenge() {
    var t = this.J7.__offset(this.z7, 74);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.AbyssInst = AbyssInst;
//# sourceMappingURL=AbyssInst.js.map
