"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceInstance = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class InfluenceInstance {
  constructor(e, t, r) {
    (this.Kri = 0), (this.Id = e), (this.Qri = t), (this.Kri = r);
  }
  get Relation() {
    return this.Kri;
  }
  SetRelation(e) {
    this.Kri = e;
  }
  get RewardIndex() {
    return this.Qri;
  }
  SetReceiveReward(e) {
    this.Qri = e;
  }
  GetCanReceiveReward() {
    const e = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
      this.Id,
    );
    return e.ReputationReward.length === this.RewardIndex + 1
      ? { IsReceived: !0, Reward: e.ReputationReward[this.RewardIndex] }
      : { IsReceived: !1, Reward: e.ReputationReward[this.RewardIndex + 1] };
  }
  GetReward() {
    return ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
      this.Id,
    ).ReputationReward;
  }
}
exports.InfluenceInstance = InfluenceInstance;
// # sourceMappingURL=InfluenceInstance.js.map
