"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotMapAreaBoxReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotMapAreaBoxReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "MapAreaExplore";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateMapAreaBoxReward];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.ExploreProgressModel
      .GetIsRedDotAreaRewardBox;
  }
}
exports.RedDotMapAreaBoxReward = RedDotMapAreaBoxReward;
//# sourceMappingURL=RedDotMapAreaBoxReward.js.map
