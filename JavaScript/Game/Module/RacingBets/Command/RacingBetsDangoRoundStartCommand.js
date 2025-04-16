"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoRoundStartCommand = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDangoRoundStartCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), (this.CommandType = 1), (this.gfc = 0);
  }
  Init(e) {
    this.gfc = e;
  }
  OnActive() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRacingBetsDangoRoundStart,
      this.gfc,
    );
  }
  LogInfo() {
    return "RacingBetsDangoRoundStartCommand";
  }
}
exports.RacingBetsDangoRoundStartCommand = RacingBetsDangoRoundStartCommand;
//# sourceMappingURL=RacingBetsDangoRoundStartCommand.js.map
