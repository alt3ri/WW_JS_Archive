"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemInstanceEntrance = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  TowerData_1 = require("../../../Module/TowerDetailUi/TowerData"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemInstanceEntrance extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (!e.BoardId) return !1;
    if (!ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed)
      return !1;
    let n = void 0;
    switch (r.Type) {
      case 5:
        n = r.TriggerEntityId;
        break;
      case 1:
        n = r.EntityId;
    }
    return ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(
      e.BoardId,
      n,
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
            : 9 !== e && 10 === e
              ? "ActivityInstanceEntranceView"
              : "InstanceDungeonEntranceView";
  }
}
exports.OpenSystemInstanceEntrance = OpenSystemInstanceEntrance;
//# sourceMappingURL=OpenSystemInstanceEntrance.js.map
