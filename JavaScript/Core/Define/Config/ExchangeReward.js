"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExchangeReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  DicIntIntIntMap_1 = require("./SubType/DicIntIntIntMap");
class ExchangeReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SharedId() {
    return this.sharedid();
  }
  get MaxCount() {
    return this.maxcount();
  }
  get Cost() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.costLength(),
      this.costKey,
      this.costValue,
      this,
    );
  }
  costKey(t) {
    return this.cost(t)?.key();
  }
  costValue(t) {
    return this.cost(t)?.value();
  }
  get RewardId() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.rewardidLength(),
      this.rewardidKey,
      this.rewardidValue,
      this,
    );
  }
  rewardidKey(t) {
    return this.rewardid(t)?.key();
  }
  rewardidValue(t) {
    return this.rewardid(t)?.value();
  }
  get PreviewReward() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.previewrewardLength(),
      this.previewrewardKey,
      this.previewrewardValue,
      this,
    );
  }
  previewrewardKey(t) {
    return this.previewreward(t)?.key();
  }
  previewrewardValue(t) {
    return this.previewreward(t)?.value();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsExchangeReward(t, r) {
    return (r || new ExchangeReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sharedid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxcount() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetCostAt(t, r) {
    return this.cost(t);
  }
  cost(t, r) {
    var e = this.J7.__offset(this.z7, 10);
    return e
      ? (r || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  costLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetRewardidAt(t, r) {
    return this.rewardid(t);
  }
  rewardid(t, r) {
    var e = this.J7.__offset(this.z7, 12);
    return e
      ? (r || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  rewardidLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetPreviewrewardAt(t, r) {
    return this.previewreward(t);
  }
  previewreward(t, r) {
    var e = this.J7.__offset(this.z7, 14);
    return e
      ? (r || new DicIntIntIntMap_1.DicIntIntIntMap()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  previewrewardLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.ExchangeReward = ExchangeReward;
//# sourceMappingURL=ExchangeReward.js.map
