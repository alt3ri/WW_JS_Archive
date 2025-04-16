"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueWhiteCat = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  DicIntString_1 = require("./SubType/DicIntString");
class RogueWhiteCat {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ScoreId() {
    return this.scoreid();
  }
  get EnergyId() {
    return this.energyid();
  }
  get MaxEnergy() {
    return this.maxenergy();
  }
  get Insts() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.instsLength(),
      this.insts,
      this,
    );
  }
  get BossRewards() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bossrewardsLength(),
      this.bossrewards,
      this,
    );
  }
  get LimitedTimeId() {
    return this.limitedtimeid();
  }
  get Rewards() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.rewardsLength(),
      this.rewards,
      this,
    );
  }
  get FirstWhiteCatDungeonId() {
    return this.firstwhitecatdungeonid();
  }
  get RepeatWhiteCatDungeonId() {
    return this.repeatwhitecatdungeonid();
  }
  get WhiteCatFirstOpenCondition() {
    return this.whitecatfirstopencondition();
  }
  get FirstWhiteCatQuestId() {
    return this.firstwhitecatquestid();
  }
  get WhiteCatRepeatOpenCondition() {
    return this.whitecatrepeatopencondition();
  }
  get OpenCondition() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.openconditionLength(),
      this.openconditionKey,
      this.openconditionValue,
      this,
    );
  }
  openconditionKey(t) {
    return this.opencondition(t)?.key();
  }
  openconditionValue(t) {
    return this.opencondition(t)?.value();
  }
  get DreamLinkTeleportMarkId() {
    return this.dreamlinkteleportmarkid();
  }
  get TabText() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.tabtextLength(),
      this.tabtextKey,
      this.tabtextValue,
      this,
    );
  }
  tabtextKey(t) {
    return this.tabtext(t)?.key();
  }
  tabtextValue(t) {
    return this.tabtext(t)?.value();
  }
  get TabIcon() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.tabiconLength(),
      this.tabiconKey,
      this.tabiconValue,
      this,
    );
  }
  tabiconKey(t) {
    return this.tabicon(t)?.key();
  }
  tabiconValue(t) {
    return this.tabicon(t)?.value();
  }
  get BossTabText() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.bosstabtextLength(),
      this.bosstabtextKey,
      this.bosstabtextValue,
      this,
    );
  }
  bosstabtextKey(t) {
    return this.bosstabtext(t)?.key();
  }
  bosstabtextValue(t) {
    return this.bosstabtext(t)?.value();
  }
  get PlotRoleLinkAudio() {
    return this.plotrolelinkaudio();
  }
  get BossInstanceList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bossinstancelistLength(),
      this.bossinstancelist,
      this,
    );
  }
  get WeaponPreviewId() {
    return this.weaponpreviewid();
  }
  get DungeonBaseProgress() {
    return this.dungeonbaseprogress();
  }
  get DungeonMaxProgress() {
    return this.dungeonmaxprogress();
  }
  get PreloadRoleIds() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.preloadroleidsLength(),
      this.preloadroleidsKey,
      this.preloadroleidsValue,
      this,
    );
  }
  preloadroleidsKey(t) {
    return this.preloadroleids(t)?.key();
  }
  preloadroleidsValue(t) {
    return this.preloadroleids(t)?.value();
  }
  get PlotRoleLinkTeam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.plotrolelinkteamLength(),
      this.plotrolelinkteam,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRogueWhiteCat(t, i) {
    return (i || new RogueWhiteCat()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  scoreid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  energyid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxenergy() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetInstsAt(t) {
    return this.insts(t);
  }
  insts(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  instsLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  instsArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetBossrewardsAt(t) {
    return this.bossrewards(t);
  }
  bossrewards(t) {
    var i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  bossrewardsLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  bossrewardsArray() {
    var t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  limitedtimeid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRewardsAt(t) {
    return this.rewards(t);
  }
  rewards(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  rewardsLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  rewardsArray() {
    var t = this.J7.__offset(this.z7, 18);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  firstwhitecatdungeonid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  repeatwhitecatdungeonid() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  whitecatfirstopencondition() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  firstwhitecatquestid() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  whitecatrepeatopencondition() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetOpenconditionAt(t, i) {
    return this.opencondition(t);
  }
  opencondition(t, i) {
    var s = this.J7.__offset(this.z7, 30);
    return s
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  openconditionLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  dreamlinkteleportmarkid() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetTabtextAt(t, i) {
    return this.tabtext(t);
  }
  tabtext(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    return s
      ? (i || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  tabtextLength() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetTabiconAt(t, i) {
    return this.tabicon(t);
  }
  tabicon(t, i) {
    var s = this.J7.__offset(this.z7, 36);
    return s
      ? (i || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  tabiconLength() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetBosstabtextAt(t, i) {
    return this.bosstabtext(t);
  }
  bosstabtext(t, i) {
    var s = this.J7.__offset(this.z7, 38);
    return s
      ? (i || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  bosstabtextLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  plotrolelinkaudio(t) {
    var i = this.J7.__offset(this.z7, 40),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetBossinstancelistAt(t) {
    return this.bossinstancelist(t);
  }
  bossinstancelist(t) {
    var i = this.J7.__offset(this.z7, 42);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  bossinstancelistLength() {
    var t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  bossinstancelistArray() {
    var t = this.J7.__offset(this.z7, 42);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  weaponpreviewid() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dungeonbaseprogress() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dungeonmaxprogress() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetPreloadroleidsAt(t, i) {
    return this.preloadroleids(t);
  }
  preloadroleids(t, i) {
    var s = this.J7.__offset(this.z7, 50);
    return s
      ? (i || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  preloadroleidsLength() {
    var t = this.J7.__offset(this.z7, 50);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetPlotrolelinkteamAt(t) {
    return this.plotrolelinkteam(t);
  }
  plotrolelinkteam(t) {
    var i = this.J7.__offset(this.z7, 52);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  plotrolelinkteamLength() {
    var t = this.J7.__offset(this.z7, 52);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  plotrolelinkteamArray() {
    var t = this.J7.__offset(this.z7, 52);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.RogueWhiteCat = RogueWhiteCat;
//# sourceMappingURL=RogueWhiteCat.js.map
