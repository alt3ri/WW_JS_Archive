"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemMowingTower = void 0);
const MowingTowerController_1 = require("../../../Module/Activity/ActivityContent/MowingTower/MowingTowerController"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemMowingTower extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    return (
      !!e.BoardId &&
      MowingTowerController_1.MowingTowerController.OpenMowingTowerView(
        e.BoardId,
      )
    );
  }
  GetViewName(e) {
    return "MowingTowerMainView";
  }
}
exports.OpenSystemMowingTower = OpenSystemMowingTower;
//# sourceMappingURL=OpenSystemMowingTower.js.map
