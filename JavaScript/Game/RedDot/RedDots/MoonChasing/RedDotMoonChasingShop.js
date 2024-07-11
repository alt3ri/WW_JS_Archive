"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotMoonChasingShop = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActivityMoonChasingController_1 = require("../../../Module/Activity/ActivityContent/MoonChasing/Activity/ActivityMoonChasingController"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotMoonChasingShop extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "MoonChasingRewardAndShop";
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.MoonChasingRefreshRewardRedDot,
      EventDefine_1.EEventName.RefreshGoodsList,
      EventDefine_1.EEventName.UnLockGoods,
      EventDefine_1.EEventName.GoodsSoldOut,
    ];
  }
  IsAllEventParamAsUId() {
    return !1;
  }
  OnCheck() {
    return (
      ActivityMoonChasingController_1.ActivityMoonChasingController.RefreshActivityRedDot(),
      ModelManager_1.ModelManager.MoonChasingRewardModel.GetShopRedDotState()
    );
  }
}
exports.RedDotMoonChasingShop = RedDotMoonChasingShop;
//# sourceMappingURL=RedDotMoonChasingShop.js.map
