"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotRacingBetsActivityReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotRacingBetsActivityReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnRacingBetsRewardRefresh];
  }
  OnCheck(e) {
    var t,
      n = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    return (
      !!n &&
      ((t = n.GetGroupRewardData(1)),
      (n = n.GetGroupRewardData(3)),
      t.CanReceiveRewards() || n.CanReceiveRewards())
    );
  }
}
exports.RedDotRacingBetsActivityReward = RedDotRacingBetsActivityReward;
//# sourceMappingURL=RedDotRacingBetsActivityReward.js.map
