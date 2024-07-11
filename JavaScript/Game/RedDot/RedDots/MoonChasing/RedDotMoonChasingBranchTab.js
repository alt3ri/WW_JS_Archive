"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotMoonChasingBranchTab = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActivityMoonChasingController_1 = require("../../../Module/Activity/ActivityContent/MoonChasing/Activity/ActivityMoonChasingController"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotMoonChasingBranchTab extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "MoonChasingAllQuest";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MoonChasingRefreshQuestRedDot];
  }
  OnCheck() {
    return (
      ActivityMoonChasingController_1.ActivityMoonChasingController.RefreshActivityRedDot(),
      ModelManager_1.ModelManager.MoonChasingModel.CheckBranchRedDot()
    );
  }
}
exports.RedDotMoonChasingBranchTab = RedDotMoonChasingBranchTab;
//# sourceMappingURL=RedDotMoonChasingBranchTab.js.map
