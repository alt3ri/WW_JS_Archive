"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseInstanceRedDot = exports.TowerDefenseRewardRedDot =
    void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  TowerDefenceController_1 = require("../../../Module/TowerDefence/TowerDefenceController"),
  RedDotBase_1 = require("../../RedDotBase");
class TowerDefenseRewardRedDot extends RedDotBase_1.RedDotBase {
  constructor() {
    super(...arguments),
      (this.QJs = [
        EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
      ]);
  }
  OnGetEvents() {
    return this.QJs;
  }
  OnCheck(e) {
    return TowerDefenceController_1.TowerDefenseController.CheckHasReward();
  }
}
exports.TowerDefenseRewardRedDot = TowerDefenseRewardRedDot;
class TowerDefenseInstanceRedDot extends RedDotBase_1.RedDotBase {
  constructor() {
    super(...arguments),
      (this.QJs = [
        EventDefine_1.EEventName.TowerDefenseOnInstanceInfoUpdateNotify,
      ]);
  }
  OnGetEvents() {
    return this.QJs;
  }
  OnCheck(e) {
    return TowerDefenceController_1.TowerDefenseController.CheckHasNewStage();
  }
}
exports.TowerDefenseInstanceRedDot = TowerDefenseInstanceRedDot;
//# sourceMappingURL=TowerDefenceRewardRedDot.js.map
