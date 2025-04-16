"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnFishingBackpackBtnStateChange = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnFishingBackpackBtnStateChange extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...t) {
    return 1 === t.length && "boolean" == typeof t[0] && (([t] = t), t);
  }
}
exports.LevelConditionOnFishingBackpackBtnStateChange =
  LevelConditionOnFishingBackpackBtnStateChange;
//# sourceMappingURL=LevelConditionOnFishingBackpackBtnStateChange.js.map
