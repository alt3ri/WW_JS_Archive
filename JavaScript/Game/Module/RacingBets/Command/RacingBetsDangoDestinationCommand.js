"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoDestinationCommand = void 0);
const ChessController_1 = require("../../Activity/ActivityContent/ChessGameplay/ChessController"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDangoDestinationCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), (this.gfc = 0), (this.CommandType = 12);
  }
  Init(e) {
    this.gfc = e;
  }
  async OnExecute() {
    await ChessController_1.ChessController.ChessItemPerformAsync(this.gfc, 3);
  }
}
exports.RacingBetsDangoDestinationCommand = RacingBetsDangoDestinationCommand;
//# sourceMappingURL=RacingBetsDangoDestinationCommand.js.map
