"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerFloorInfo =
    exports.TOWER_TEAM_MAX_NUMBER =
    exports.TowerReward =
    exports.HIGH_COST =
    exports.noneColor =
    exports.lowColor =
    exports.highColor =
    exports.NONE_COLOR =
    exports.LOW_COLOR =
    exports.HIGH_COLOR =
    exports.VARIATION_RISK_DIFFICULTY =
    exports.HIGH_RISK_DIFFICULTY =
    exports.LOW_RISK_DIFFICULTY =
      void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
(exports.LOW_RISK_DIFFICULTY = 1),
  (exports.HIGH_RISK_DIFFICULTY = 2),
  (exports.VARIATION_RISK_DIFFICULTY = 3),
  (exports.HIGH_COLOR = "FFE361"),
  (exports.LOW_COLOR = "FFBD77"),
  (exports.NONE_COLOR = "B11515"),
  (exports.highColor = UE.Color.FromHex(exports.HIGH_COLOR)),
  (exports.lowColor = UE.Color.FromHex(exports.LOW_COLOR)),
  (exports.noneColor = UE.Color.FromHex(exports.NONE_COLOR)),
  (exports.HIGH_COST = 4);
class TowerReward {
  constructor(s, t, r) {
    (this.Target = s),
      (this.RewardId = t),
      (this.Index = r),
      (this.IsReceived = !1);
  }
}
(exports.TowerReward = TowerReward), (exports.TOWER_TEAM_MAX_NUMBER = 3);
class TowerFloorInfo {
  constructor(s, t, r, e) {
    (this.TowerId = s),
      (this.Star = t),
      (this.Formation = r),
      (this.StarIndex = e),
      (this.Difficulties = -1),
      (this.Area = -1),
      (this.FloorNumber = -1),
      (this.Cost = -1);
    s = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
      this.TowerId,
    );
    (this.Difficulties = s.Difficulty),
      (this.Area = s.AreaNum),
      (this.FloorNumber = s.Floor),
      (this.Cost = s.Cost);
  }
}
exports.TowerFloorInfo = TowerFloorInfo;
//# sourceMappingURL=TowerData.js.map
