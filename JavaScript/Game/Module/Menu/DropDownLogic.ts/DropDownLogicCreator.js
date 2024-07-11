"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DropDownLogicCreator = void 0);
const LanguageLogic_1 = require("./LanguageLogic"),
  SkillLockEnemyLogic_1 = require("./SkillLockEnemyLogic");
class DropDownLogicCreator {
  static GetDropDownLogic(o) {
    return this.lPi.get(o);
  }
}
(exports.DropDownLogicCreator = DropDownLogicCreator).lPi = new Map([
  [51, new LanguageLogic_1.LanguageLogic()],
  [133, new SkillLockEnemyLogic_1.SkillLockEnemyLogic()],
]);
//# sourceMappingURL=DropDownLogicCreator.js.map
