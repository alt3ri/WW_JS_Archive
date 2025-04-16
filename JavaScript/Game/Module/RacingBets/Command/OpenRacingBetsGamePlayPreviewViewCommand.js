"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenRacingBetsGamePlayPreviewViewCommand = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  UiSceneDangoActorManager_1 = require("../../UiComponent/UiSceneDangoActorManager"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class OpenRacingBetsGamePlayPreviewViewCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), (this.CommandType = 52);
  }
  async OnExecute() {
    await UiManager_1.UiManager.OpenViewAsync("RacingBetsGamePlayPreviewView"),
      UiSceneDangoActorManager_1.UiSceneDangoActorManager.SetAllActorVisible(
        !1,
      );
  }
  LogInfo() {
    return "RacingBetsGamePlayPreviewView";
  }
}
exports.OpenRacingBetsGamePlayPreviewViewCommand =
  OpenRacingBetsGamePlayPreviewViewCommand;
//# sourceMappingURL=OpenRacingBetsGamePlayPreviewViewCommand.js.map
