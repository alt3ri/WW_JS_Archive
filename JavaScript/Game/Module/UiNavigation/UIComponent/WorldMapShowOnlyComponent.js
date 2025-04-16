"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapShowOnlyComponent = void 0);
const ActivityMowingRiskController_1 = require("../../Activity/ActivityContent/MowingRisk/Controller/ActivityMowingRiskController"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class WorldMapShowOnlyComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(n) {
    ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.CheckInInstanceDungeon() ||
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CheckInstanceShieldView(
      "WorldMapView",
    )
      ? this.SetVisibleMode(2, !1)
      : this.SetVisibleMode(2, !0);
  }
  OnIsOccupancyFightInput() {
    return !1;
  }
}
exports.WorldMapShowOnlyComponent = WorldMapShowOnlyComponent;
//# sourceMappingURL=WorldMapShowOnlyComponent.js.map
