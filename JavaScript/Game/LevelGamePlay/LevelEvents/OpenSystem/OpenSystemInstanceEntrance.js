"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemInstanceEntrance = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InstanceDungeonEntranceController_1 = require("../../../Module/InstanceDungeon/InstanceDungeonEntranceController"),
  TowerData_1 = require("../../../Module/TowerDetailUi/TowerData"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemInstanceEntrance extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, n) {
    if (!e.BoardId) return !1;
    if (!ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed)
      return !1;
    let r = void 0;
    switch (n.Type) {
      case 5:
        r = n.TriggerEntityId;
        break;
      case 1:
        r = n.EntityId;
    }
    return InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterEntrance(
      e.BoardId,
      r,
    );
  }
  GetViewName(e) {
    e =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
        e.BoardId,
      );
    return 3 === e
      ? "SingleTimeTowerView"
      : 4 === e
        ? "CycleTowerView"
        : 7 === e
          ? "BossRushMainView"
          : 5 === e
            ? ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty() !==
              TowerData_1.VARIATION_RISK_DIFFICULTY
              ? "TowerNormalView"
              : "TowerVariationView"
            : "InstanceDungeonEntranceView";
  }
}
exports.OpenSystemInstanceEntrance = OpenSystemInstanceEntrance;
//# sourceMappingURL=OpenSystemInstanceEntrance.js.map
