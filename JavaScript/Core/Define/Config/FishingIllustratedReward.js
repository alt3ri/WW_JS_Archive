"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingIllustratedReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FishingIllustratedReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Desc() {
    return this.desc();
  }
  get Type() {
    return this.type();
  }
  get ConditionGroup() {
    return this.conditiongroup();
  }
  get DropId() {
    return this.dropid();
  }
  get AccessPath() {
    return this.accesspath();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsFishingIllustratedReward(t, s) {
    return (s || new FishingIllustratedReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  type() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  conditiongroup() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  accesspath() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingIllustratedReward = FishingIllustratedReward;
//# sourceMappingURL=FishingIllustratedReward.js.map
