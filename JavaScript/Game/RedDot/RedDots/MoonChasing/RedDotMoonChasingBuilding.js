"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotMoonChasingBuilding = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActivityMoonChasingController_1 = require("../../../Module/Activity/ActivityContent/MoonChasing/Activity/ActivityMoonChasingController"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotMoonChasingBuilding extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.TrackMoonHandbookUpdate,
      EventDefine_1.EEventName.MoonChasingRefreshBuildingRedDot,
    ];
  }
  OnCheck() {
    return (
      ActivityMoonChasingController_1.ActivityMoonChasingController.RefreshActivityRedDot(),
      ModelManager_1.ModelManager.MoonChasingBuildingModel.CheckAllBuildingRedDotState()
    );
  }
}
exports.RedDotMoonChasingBuilding = RedDotMoonChasingBuilding;
//# sourceMappingURL=RedDotMoonChasingBuilding.js.map
