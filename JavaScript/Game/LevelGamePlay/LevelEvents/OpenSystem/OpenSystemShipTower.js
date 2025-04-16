"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemShipTower = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemShipTower extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return (
      e && (await UiManager_1.UiManager.OpenViewAsync("ShipTowerView")), !0
    );
  }
  GetViewName(e, r) {
    return "ShipTowerView";
  }
}
exports.OpenSystemShipTower = OpenSystemShipTower;
//# sourceMappingURL=OpenSystemShipTower.js.map
