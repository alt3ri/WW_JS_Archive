"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnFishingBackpackQuickSellToggleShow = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnFishingBackpackQuickSellToggleShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l, ...o) {
    return 1 === o.length && "boolean" == typeof o[0] && (([o] = o), o);
  }
}
exports.LevelConditionOnFishingBackpackQuickSellToggleShow =
  LevelConditionOnFishingBackpackQuickSellToggleShow;
//# sourceMappingURL=LevelConditionOnFishingBackpackQuickSellToggleShow.js.map
