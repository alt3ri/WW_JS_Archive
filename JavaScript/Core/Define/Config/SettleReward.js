"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SettleReward = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SettleReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ActivityId() {
    return this.activityid();
  }
  get PhotoReward() {
    return this.photoreward();
  }
  get PhotoRewardFemale() {
    return this.photorewardfemale();
  }
  get SkinReward() {
    return this.skinreward();
  }
  get MalePhotoPath() {
    return this.malephotopath();
  }
  get FemalePhotoPath() {
    return this.femalephotopath();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsSettleReward(t, e) {
    return (e || new SettleReward()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  photoreward() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  photorewardfemale() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skinreward() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  malephotopath(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  femalephotopath(t) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.SettleReward = SettleReward;
//# sourceMappingURL=SettleReward.js.map
