"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnChangeBossRushBuff = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnChangeBossRushBuff extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, s, ...n) {
    e = e.LimitParams.get("Tab");
    return void 0 !== e && n[0] === e;
  }
}
exports.LevelConditionOnChangeBossRushBuff = LevelConditionOnChangeBossRushBuff;
//# sourceMappingURL=LevelConditionOnChangeBossRushBuff.js.map
