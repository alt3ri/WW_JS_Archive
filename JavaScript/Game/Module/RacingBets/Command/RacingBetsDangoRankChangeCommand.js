"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoRankChangeCommand = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDangoRankChangeCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), (this.CommandType = 13), (this.Iv1 = []);
  }
  Init(e) {
    this.Iv1 = e;
  }
  async OnExecute() {
    var e;
    ModelManager_1.ModelManager.RacingBetsModel.RefreshBetsDangoRankInfo(
      this.Iv1,
    ) &&
      ((e = new CustomPromise_1.CustomPromise()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRacingBetsDungeonDangoRankChange,
        e,
      ),
      await e.Promise);
  }
  LogInfo() {
    return "RacingBetsDangoRankChangeCommand";
  }
}
exports.RacingBetsDangoRankChangeCommand = RacingBetsDangoRankChangeCommand;
//# sourceMappingURL=RacingBetsDangoRankChangeCommand.js.map
