"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotActivityRegressShopDiscount = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRegressShopDiscount extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RecallActivityInfoUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.CheckShopRedDot();
  }
}
exports.RedDotActivityRegressShopDiscount = RedDotActivityRegressShopDiscount;
//# sourceMappingURL=RedDotActivityRegressShopDiscount.js.map
