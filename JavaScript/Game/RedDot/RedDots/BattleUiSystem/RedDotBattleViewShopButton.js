"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotBattleViewShopButton = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotBattleViewShopButton extends RedDotBase_1.RedDotBase {
  OnCheck() {
    return (
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenShop,
        !0,
      ) ?? !1
    );
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnFirstOpenShopChanged];
  }
}
exports.RedDotBattleViewShopButton = RedDotBattleViewShopButton;
// # sourceMappingURL=RedDotBattleViewShopButton.js.map
