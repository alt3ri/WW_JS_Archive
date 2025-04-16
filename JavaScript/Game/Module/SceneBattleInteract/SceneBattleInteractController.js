"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneBattleInteractController = void 0);
const Time_1 = require("../../../Core/Common/Time"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  ModelManager_1 = require("../../Manager/ModelManager");
class SceneBattleInteractController extends ControllerBase_1.ControllerBase {
  static OnTick(e) {
    if (ModelManager_1.ModelManager.SceneBattleInteractModel.Open)
      for (const r of ModelManager_1.ModelManager.SceneBattleInteractModel.EffectMap.values())
        r.OnTick(e * Time_1.Time.TimeDilation);
  }
}
exports.SceneBattleInteractController = SceneBattleInteractController;
//# sourceMappingURL=SceneBattleInteractController.js.map
