"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DropDownLogicCreator = void 0);
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  LanguageLogic_1 = require("./LanguageLogic"),
  SkillLockEnemyLogic_1 = require("./SkillLockEnemyLogic");
class DropDownLogicCreator {
  static GetDropDownLogic(e) {
    return this.lPi.get(e);
  }
}
(exports.DropDownLogicCreator = DropDownLogicCreator).lPi = new Map([
  [
    GameSettingsDefine_1.EFunction.TEXTLANGUAGE,
    new LanguageLogic_1.LanguageLogic(),
  ],
  [
    GameSettingsDefine_1.EFunction.SkillLockEnemyMode,
    new SkillLockEnemyLogic_1.SkillLockEnemyLogic(),
  ],
]);
//# sourceMappingURL=DropDownLogicCreator.js.map
