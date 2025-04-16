"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingPoint = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class FishingPoint {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get EntityConfigId() {
    return this.entityconfigid();
  }
  get ShowItem() {
    return this.showitem();
  }
  get GamePlayId() {
    return this.gameplayid();
  }
  get UnlockTech() {
    return this.unlocktech();
  }
  get GroupId() {
    return this.groupid();
  }
  get SceneConfigId() {
    return this.sceneconfigid();
  }
  get RewardItem() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.rewarditemLength(),
      this.rewarditemKey,
      this.rewarditemValue,
      this,
    );
  }
  rewarditemKey(t) {
    return this.rewarditem(t)?.key();
  }
  rewarditemValue(t) {
    return this.rewarditem(t)?.value();
  }
  get OutGrowth() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.outgrowthLength(),
      this.outgrowthKey,
      this.outgrowthValue,
      this,
    );
  }
  outgrowthKey(t) {
    return this.outgrowth(t)?.key();
  }
  outgrowthValue(t) {
    return this.outgrowth(t)?.value();
  }
  get DoubleRate() {
    return this.doublerate();
  }
  get Count() {
    return this.count();
  }
  get RefreshTime() {
    return this.refreshtime();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingPoint(t, i) {
    return (i || new FishingPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  entityconfigid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showitem() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gameplayid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlocktech() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sceneconfigid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 8;
  }
  GetRewarditemAt(t, i) {
    return this.rewarditem(t);
  }
  rewarditem(t, i) {
    var r = this.J7.__offset(this.z7, 18);
    return r
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  rewarditemLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetOutgrowthAt(t, i) {
    return this.outgrowth(t);
  }
  outgrowth(t, i) {
    var r = this.J7.__offset(this.z7, 20);
    return r
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  outgrowthLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  doublerate() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  count() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  refreshtime() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingPoint = FishingPoint;
//# sourceMappingURL=FishingPoint.js.map
