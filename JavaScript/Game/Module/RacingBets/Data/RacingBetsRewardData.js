"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsRewardData = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class RacingBetsRewardData {
  constructor(t) {
    (this.Id = void 0),
      (this.RewardConfig = void 0),
      (this.nvc = void 0),
      (this.svc = 0),
      (this.avc = 0),
      (this.Id = t),
      (this.RewardConfig =
        ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsReward(t));
  }
  Refresh(t) {
    (this.nvc = t.H6n), (this.svc = t.cqs), (this.avc = t.j6n);
  }
  GetRewardType() {
    return this.RewardConfig.RewardType;
  }
  GetRewardList() {
    var t,
      e,
      r = [];
    for ([t, e] of this.RewardConfig.TargetReward)
      r.push([{ ItemId: t, IncId: 0 }, e]);
    return r;
  }
  GetRewardName() {
    return this.RewardConfig.RewardName;
  }
  GetProgressText() {
    return this.nvc === Protocol_1.Aki.Protocol.$J_.Proto_Undone
      ? this.svc + "/" + this.avc
      : this.avc + "/" + this.avc;
  }
  GetTaskStatus() {
    return this.nvc;
  }
  CanReceiveReward() {
    return this.nvc === Protocol_1.Aki.Protocol.$J_.Proto_TaskFinish;
  }
  IsTaskReceived() {
    return this.nvc === Protocol_1.Aki.Protocol.$J_.Proto_Received;
  }
}
exports.RacingBetsRewardData = RacingBetsRewardData;
//# sourceMappingURL=RacingBetsRewardData.js.map
