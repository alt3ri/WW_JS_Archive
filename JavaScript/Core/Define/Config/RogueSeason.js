"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueSeason = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RogueSeason {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get SeasonName() {
    return this.seasonname();
  }
  get PointItem() {
    return this.pointitem();
  }
  get InstanceDungeonEntrance() {
    return this.instancedungeonentrance();
  }
  get TabIcon() {
    return this.tabicon();
  }
  get FirstPassRewardMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.firstpassrewardmapLength(),
      (t) => this.firstpassrewardmap(t)?.key(),
      (t) => this.firstpassrewardmap(t)?.value(),
    );
  }
  get ShopId() {
    return this.shopid();
  }
  get Achievement() {
    return this.achievement();
  }
  get ParamId() {
    return this.paramid();
  }
  get RogueThemeType() {
    return this.roguethemetype();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueSeason(t, s) {
    return (s || new RogueSeason()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  seasonname(t) {
    const s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  pointitem() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instancedungeonentrance() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tabicon(t) {
    const s = this.J7.__offset(this.z7, 14);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  GetFirstpassrewardmapAt(t, s) {
    return this.firstpassrewardmap(t);
  }
  firstpassrewardmap(t, s) {
    const i = this.J7.__offset(this.z7, 16);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  firstpassrewardmapLength() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  shopid() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  achievement() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  paramid() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roguethemetype(t) {
    const s = this.J7.__offset(this.z7, 24);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
}
exports.RogueSeason = RogueSeason;
// # sourceMappingURL=RogueSeason.js.map
