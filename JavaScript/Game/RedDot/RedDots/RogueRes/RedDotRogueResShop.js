"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotRogueResShop = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotRogueResShop extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.ActivityPermanentRogueModel.CheckShopRedDot(
      e,
    );
  }
}
exports.RedDotRogueResShop = RedDotRogueResShop;
//# sourceMappingURL=RedDotRogueResShop.js.map
