"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoarChallenge = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SoarChallenge {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get LevelPlayId() {
    return this.levelplayid();
  }
  get Name() {
    return this.name();
  }
  get NeedScore() {
    return this.needscore();
  }
  get Reward() {
    return this.reward();
  }
  get ScoreText() {
    return this.scoretext();
  }
  get JumpId() {
    return this.jumpid();
  }
  get UnlockTravelLevel() {
    return this.unlocktravellevel();
  }
  get UnlockQuestId() {
    return this.unlockquestid();
  }
  get LockTips() {
    return this.locktips();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsSoarChallenge(t, e) {
    return (e || new SoarChallenge()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  levelplayid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
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
  needscore() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  reward() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  scoretext(t) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlocktravellevel() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  unlockquestid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  locktips(t) {
    var e = this.J7.__offset(this.z7, 22),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.SoarChallenge = SoarChallenge;
//# sourceMappingURL=SoarChallenge.js.map
