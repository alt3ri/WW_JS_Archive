"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CumulativeShopTaskTabRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  CumulativeShopController_1 = require("../../../Module/Activity/ActivityContent/CumulativeShop/CumulativeShopController"),
  RedDotBase_1 = require("../../RedDotBase");
class CumulativeShopTaskTabRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.CumulativeShopTaskRefresh];
  }
  OnCheck(e) {
    var t =
      CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData();
    return !!t && t.GetTaskTabRedDot(e);
  }
}
exports.CumulativeShopTaskTabRedDot = CumulativeShopTaskTabRedDot;
//# sourceMappingURL=CumulativeShopTaskTabRedDot.js.map
