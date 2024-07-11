"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotMoonChasingReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActivityMoonChasingController_1 = require("../../../Module/Activity/ActivityContent/MoonChasing/Activity/ActivityMoonChasingController"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotMoonChasingReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "MoonChasingRewardAndShop";
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.TakenRewardTargetData,
      EventDefine_1.EEventName.RefreshRewardTargetData,
    ];
  }
  IsAllEventParamAsUId() {
    return !1;
  }
  OnCheck() {
    return (
      ActivityMoonChasingController_1.ActivityMoonChasingController.RefreshActivityRedDot(),
      ModelManager_1.ModelManager.MoonChasingRewardModel.GetAllTaskDataRedDotState(
        !0,
      )
    );
  }
}
exports.RedDotMoonChasingReward = RedDotMoonChasingReward;
//# sourceMappingURL=RedDotMoonChasingReward.js.map
