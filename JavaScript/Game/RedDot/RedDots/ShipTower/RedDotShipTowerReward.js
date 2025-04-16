"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotShipTowerReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotShipTowerReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "ShipTower";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateShipTowerReward];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.ShipTowerModel.IsCanReceiveAward();
  }
}
exports.RedDotShipTowerReward = RedDotShipTowerReward;
//# sourceMappingURL=RedDotShipTowerReward.js.map
