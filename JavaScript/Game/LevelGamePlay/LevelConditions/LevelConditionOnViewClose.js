"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnViewClose = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnViewClose extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, s, ...l) {
    return e.LimitParams.get("UIName") === l[0];
  }
}
exports.LevelConditionOnViewClose = LevelConditionOnViewClose;
// # sourceMappingURL=LevelConditionOnViewClose.js.map
