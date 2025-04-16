"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchCardRoundRe = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ScratchCardRoundRe {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get RoundId() {
    return this.roundid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get PreRoundId() {
    return this.preroundid();
  }
  get Size() {
    return this.size();
  }
  get RewardSortList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.rewardsortlistLength(),
      this.rewardsortlist,
      this,
    );
  }
  get YellowRoundIcon() {
    return this.yellowroundicon();
  }
  get BlackRoundIcon() {
    return this.blackroundicon();
  }
  get TogRoundIcon() {
    return this.togroundicon();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsScratchCardRoundRe(t, i) {
    return (i || new ScratchCardRoundRe()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  roundid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  preroundid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  size() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRewardsortlistAt(t) {
    return this.rewardsortlist(t);
  }
  rewardsortlist(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  rewardsortlistLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  rewardsortlistArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  yellowroundicon(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  blackroundicon(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  togroundicon(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.ScratchCardRoundRe = ScratchCardRoundRe;
//# sourceMappingURL=ScratchCardRoundRe.js.map
