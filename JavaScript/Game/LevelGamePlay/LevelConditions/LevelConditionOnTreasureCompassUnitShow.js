"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnTreasureCompassUnitShow = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnTreasureCompassUnitShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, s, ...o) {
    return 1 === o.length && "boolean" == typeof o[0] && (([o] = o), o);
  }
}
exports.LevelConditionOnTreasureCompassUnitShow =
  LevelConditionOnTreasureCompassUnitShow;
//# sourceMappingURL=LevelConditionOnTreasureCompassUnitShow.js.map
