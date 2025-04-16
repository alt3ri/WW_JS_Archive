"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerDifficultyRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  BabelTowerController_1 = require("../../../Module/Activity/ActivityContent/BabelTower/BabelTowerController"),
  RedDotBase_1 = require("../../RedDotBase");
class BabelTowerDifficultyRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.BabelTowerDifficultyLevelClick];
  }
  OnCheck(e) {
    var t = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    return !!t && t.GetDifficultyNewLevelRedDot(e);
  }
}
exports.BabelTowerDifficultyRedDot = BabelTowerDifficultyRedDot;
//# sourceMappingURL=BabelTowerDifficultyRedDot.js.map
