"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnUiTabViewShow = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnUiTabViewShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, s, ...a) {
    return a[0] === e?.LimitParams?.get("TabViewName");
  }
}
exports.LevelConditionOnUiTabViewShow = LevelConditionOnUiTabViewShow;
//# sourceMappingURL=LevelConditionOnUiTabViewShow.js.map
