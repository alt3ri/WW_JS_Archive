"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionHideSettingInCloudGame = void 0);
const CloudGameManager_1 = require("../../Manager/CloudGameManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionHideSettingInCloudGame extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    return !CloudGameManager_1.CloudGameManager.IsCloudGame;
  }
}
exports.LevelConditionHideSettingInCloudGame =
  LevelConditionHideSettingInCloudGame;
//# sourceMappingURL=LevelConditionHideSettingInCloudGame.js.map
