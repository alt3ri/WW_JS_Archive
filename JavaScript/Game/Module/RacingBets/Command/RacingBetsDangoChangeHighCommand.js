"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoChangeHighCommand = void 0);
const ChessController_1 = require("../../Activity/ActivityContent/ChessGameplay/ChessController"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDangoChangeHighCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), (this.CommandType = 6), (this.CBc = void 0);
  }
  Init(e) {
    this.CBc = e;
  }
  async OnExecute() {
    let e = this.CBc.R5n[0].Kz_,
      s = this.CBc.R5n[0].vJ_;
    for (const t of this.CBc.R5n) s < t.vJ_ && ((e = t.Kz_), (s = t.vJ_));
    ChessController_1.ChessController.ChangeItemToMaxPriorityInPoint(e),
      await ChessController_1.ChessController.ChessItemPerformAsync(e, 1);
  }
  LogInfo() {
    return "RacingBetsDangoChangeHighCommand";
  }
}
exports.RacingBetsDangoChangeHighCommand = RacingBetsDangoChangeHighCommand;
//# sourceMappingURL=RacingBetsDangoChangeHighCommand.js.map
