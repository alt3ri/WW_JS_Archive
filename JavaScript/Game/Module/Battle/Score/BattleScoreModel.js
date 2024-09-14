"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleScoreModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  StateRef_1 = require("../../../../Core/Utils/Audio/StateRef"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class BattleScoreModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.vIn = new Map()),
      (this.MIn = new Map()),
      (this.EIn = 0),
      (this.RougeScoreMusicState = new StateRef_1.StateRef(
        "game_rogue_combat_combo_rank",
        "none",
      ));
  }
  OnInit() {
    return !0;
  }
  OnLeaveLevel() {
    return (
      this.vIn.clear(),
      (this.EIn = 0),
      (this.RougeScoreMusicState.State = "none"),
      !0
    );
  }
  HandleBattleScoreNotify(e) {
    this.UpdateScore(e.NAs, e.FAs);
  }
  UpdateScore(e, t) {
    var r;
    this.vIn.set(e, t),
      this.EIn !== e &&
        ((this.EIn = e),
        this.MIn.has(e) ||
          ((r =
            ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreConfig(
              e,
            )) &&
            this.MIn.set(e, r))),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleScoreChanged,
        e,
        t,
      );
  }
  GetScoreConfig(e) {
    return this.MIn.get(e);
  }
  GetScore(e) {
    return this.vIn.get(e) ?? 0;
  }
  GetScoreMap() {
    return this.vIn;
  }
  GetCurScoreId() {
    return this.EIn;
  }
}
exports.BattleScoreModel = BattleScoreModel;
//# sourceMappingURL=BattleScoreModel.js.map
