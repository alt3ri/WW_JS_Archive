"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnViewReadyForGuide = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnViewReadyForGuide extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r, ...s) {
    return e.LimitParams.get("Tag") === s[0];
  }
}
exports.LevelConditionOnViewReadyForGuide = LevelConditionOnViewReadyForGuide;
// # sourceMappingURL=LevelConditionFinishGuideStepByEvent.js.map
