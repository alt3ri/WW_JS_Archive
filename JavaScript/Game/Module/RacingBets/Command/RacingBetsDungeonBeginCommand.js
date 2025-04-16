"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDungeonBeginCommand = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDungeonBeginCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), (this.CommandType = 7);
  }
  async OnExecute() {
    var e = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenView("RacingBetsDungeonBeginTip", e),
      await e.Promise;
  }
  LogInfo() {
    return "RacingBetsDungeonBeginCommand";
  }
}
exports.RacingBetsDungeonBeginCommand = RacingBetsDungeonBeginCommand;
//# sourceMappingURL=RacingBetsDungeonBeginCommand.js.map
