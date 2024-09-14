"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RiskHarvestBuffGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RiskHarvestBuffGroup {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Buff() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffLength(),
      this.buff,
      this,
    );
  }
  get BuffName() {
    return this.buffname();
  }
  get BuffDesc() {
    return this.buffdesc();
  }
  get BuffFactors() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bufffactorsLength(),
      this.bufffactors,
      this,
    );
  }
  get BuffType() {
    return this.bufftype();
  }
  get BuffProgress() {
    return this.buffprogress();
  }
  get BuffIcon() {
    return this.bufficon();
  }
  get Reward() {
    return this.reward();
  }
  get RewardDesc() {
    return this.rewarddesc();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRiskHarvestBuffGroup(t, s) {
    return (s || new RiskHarvestBuffGroup()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBuffAt(t) {
    return this.buff(t);
  }
  buff(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s
      ? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
      : BigInt(0);
  }
  buffLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  buffname(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  buffdesc(t) {
    var s = this.J7.__offset(this.z7, 12);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  GetBufffactorsAt(t) {
    return this.bufffactors(t);
  }
  bufffactors(t, s) {
    var r = this.J7.__offset(this.z7, 14);
    return r
      ? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, s)
      : null;
  }
  bufffactorsLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  bufftype() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buffprogress() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  bufficon(t) {
    var s = this.J7.__offset(this.z7, 20);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  reward() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rewarddesc(t) {
    var s = this.J7.__offset(this.z7, 24);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
}
exports.RiskHarvestBuffGroup = RiskHarvestBuffGroup;
//# sourceMappingURL=RiskHarvestBuffGroup.js.map
