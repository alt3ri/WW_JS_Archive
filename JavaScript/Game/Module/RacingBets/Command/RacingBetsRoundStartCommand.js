"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsRoundStartCommand = void 0);
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsRoundStartCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), (this.CommandType = 8);
  }
  LogInfo() {
    return "RacingBetsRoundStartCommand";
  }
}
exports.RacingBetsRoundStartCommand = RacingBetsRoundStartCommand;
//# sourceMappingURL=RacingBetsRoundStartCommand.js.map
