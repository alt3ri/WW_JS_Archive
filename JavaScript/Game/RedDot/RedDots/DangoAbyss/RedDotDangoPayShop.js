"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotDangoPayShop = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoPayShop extends RedDotBase_1.RedDotBase {
  IsAllEventParamAsUId() {
    return !1;
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.PayShopGoodsBuy,
      EventDefine_1.EEventName.GoodsRefreshDiscountTime,
      EventDefine_1.EEventName.RefreshAllPayShop,
      EventDefine_1.EEventName.RefreshPayShop,
      EventDefine_1.EEventName.RefreshGoods,
      EventDefine_1.EEventName.RefreshGoodsList,
      EventDefine_1.EEventName.UnLockGoods,
      EventDefine_1.EEventName.RefreshPayShopInstanceRedDot,
    ];
  }
  OnCheck(e) {
    return (
      0 !== e &&
      ModelManager_1.ModelManager.DangoAbyssModel.CheckPayShopRedDot()
    );
  }
}
exports.RedDotDangoPayShop = RedDotDangoPayShop;
//# sourceMappingURL=RedDotDangoPayShop.js.map
