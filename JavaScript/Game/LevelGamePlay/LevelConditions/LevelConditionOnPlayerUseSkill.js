"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnPlayerUseSkill = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnPlayerUseSkill extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l, ...s) {
    return Number(e.LimitParams.get("SkillId")) === s[1];
  }
}
exports.LevelConditionOnPlayerUseSkill = LevelConditionOnPlayerUseSkill;
//# sourceMappingURL=LevelConditionOnPlayerUseSkill.js.map
