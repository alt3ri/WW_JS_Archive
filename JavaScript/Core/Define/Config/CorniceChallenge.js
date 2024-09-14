"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CorniceChallenge = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  IntPair_1 = require("./SubType/IntPair");
class CorniceChallenge {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MarkId() {
    return this.markid();
  }
  get SortId() {
    return this.sortid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get RewardList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.rewardlistLength(),
      this.rewardlist,
      this,
    );
  }
  get MaxScore() {
    return this.maxscore();
  }
  get BackgroundTexture() {
    return this.backgroundtexture();
  }
  get Title() {
    return this.title();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsCorniceChallenge(t, i) {
    return (i || new CorniceChallenge()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRewardlistAt(t, i) {
    return this.rewardlist(t);
  }
  rewardlist(t, i) {
    var r = this.J7.__offset(this.z7, 12);
    return r
      ? (i || new IntPair_1.IntPair()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  rewardlistLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  maxscore() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  backgroundtexture(t) {
    var i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
}
exports.CorniceChallenge = CorniceChallenge;
//# sourceMappingURL=CorniceChallenge.js.map
