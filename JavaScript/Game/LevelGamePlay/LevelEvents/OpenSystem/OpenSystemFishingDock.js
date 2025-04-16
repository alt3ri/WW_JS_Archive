"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemFishingDock = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFishingDock extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, a) {
    return (
      e &&
        ((e = e.BoardId),
        ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(e)) &&
        ((ModelManager_1.ModelManager.FishingModel.DockId = e),
        await UiManager_1.UiManager.OpenViewAsync("FishingLoadingView", !0)),
      !0
    );
  }
  GetViewName(e, a) {
    return "FishingDockView";
  }
}
exports.OpenSystemFishingDock = OpenSystemFishingDock;
//# sourceMappingURL=OpenSystemFishingDock.js.map
