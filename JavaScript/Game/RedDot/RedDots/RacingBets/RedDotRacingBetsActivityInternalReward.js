"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotRacingBetsActivityInternalReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotRacingBetsActivityInternalReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnRacingBetsRewardRefresh];
  }
  OnCheck(e) {
    var t =
      ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    return !!t && t.GetGroupRewardData(2).CanReceiveRewards();
  }
}
exports.RedDotRacingBetsActivityInternalReward =
  RedDotRacingBetsActivityInternalReward;
//# sourceMappingURL=RedDotRacingBetsActivityInternalReward.js.map
