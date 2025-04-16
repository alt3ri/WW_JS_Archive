"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoMoveCommand = void 0);
const ChessController_1 = require("../../Activity/ActivityContent/ChessGameplay/ChessController"),
  RacingBetsDefine_1 = require("../RacingBetsDefine"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDangoMoveCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), (this.CommandType = 3), (this.pBc = void 0);
  }
  Init(e) {
    this.pBc = e;
  }
  async OnExecute() {
    var e = RacingBetsDefine_1.RACING_BETS_MAP_POINT_COUNT,
      e = ((((this.pBc.SJ_ - 1) % e) + e) % e) + 1;
    await ChessController_1.ChessController.MoveItemToPointAsync(
      this.pBc.Kz_,
      e,
    );
  }
  LogInfo() {
    return "RacingBetsDangoMoveCommand";
  }
}
exports.RacingBetsDangoMoveCommand = RacingBetsDangoMoveCommand;
//# sourceMappingURL=RacingBetsDangoMoveCommand.js.map
