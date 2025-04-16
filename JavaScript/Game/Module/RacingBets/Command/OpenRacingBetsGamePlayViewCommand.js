"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenRacingBetsGamePlayViewCommand = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  UiSceneDangoActorManager_1 = require("../../UiComponent/UiSceneDangoActorManager"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class OpenRacingBetsGamePlayViewCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), (this.CommandType = 51);
  }
  async OnExecute() {
    await UiManager_1.UiManager.OpenViewAsync("RacingBetsGamePlayView"),
      UiSceneDangoActorManager_1.UiSceneDangoActorManager.SetAllActorVisible(
        !1,
      );
  }
  LogInfo() {
    return "OpenRacingBetsGamePlayViewCommand";
  }
}
exports.OpenRacingBetsGamePlayViewCommand = OpenRacingBetsGamePlayViewCommand;
//# sourceMappingURL=OpenRacingBetsGamePlayViewCommand.js.map
