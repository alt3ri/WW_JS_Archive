"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnSelectActivityAndSubViewReady = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnSelectActivityAndSubViewReady extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t, ...i) {
    return (
      !!e.LimitParams &&
      !!(e = Number(e.LimitParams.get("ActivityId"))) &&
      i[0] === e
    );
  }
}
exports.LevelConditionOnSelectActivityAndSubViewReady =
  LevelConditionOnSelectActivityAndSubViewReady;
//# sourceMappingURL=LevelConditionOnSelectActivityAndSubViewReady.js.map
