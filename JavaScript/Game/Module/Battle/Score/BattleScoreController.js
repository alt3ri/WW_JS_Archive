"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleScoreController = void 0);
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../Core/Net/Net"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class BattleScoreController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(16379, this.pIn),
      Net_1.Net.Register(25548, this.cul),
      !0
    );
  }
  static OnClear() {
    return Net_1.Net.UnRegister(16379), Net_1.Net.UnRegister(25548), !0;
  }
}
((exports.BattleScoreController = BattleScoreController).pIn = (e) => {
  ModelManager_1.ModelManager.BattleScoreModel?.HandleBattleScoreNotify(e);
}),
  (BattleScoreController.cul = (e) => {
    ModelManager_1.ModelManager.BattleScoreModel?.HandleBattleScoreEnableNotify(
      e,
    );
  });
//# sourceMappingURL=BattleScoreController.js.map
