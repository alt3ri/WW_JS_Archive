"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowTowerRewardRe = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MowTowerRewardRe {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MowTowerLevelsId() {
    return this.mowtowerlevelsid();
  }
  get Score() {
    return this.score();
  }
  get RewardId() {
    return this.rewardid();
  }
  get LevelRewardDesc() {
    return this.levelrewarddesc();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsMowTowerRewardRe(t, e) {
    return (e || new MowTowerRewardRe()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mowtowerlevelsid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  score() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  levelrewarddesc(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.MowTowerRewardRe = MowTowerRewardRe;
//# sourceMappingURL=MowTowerRewardRe.js.map
