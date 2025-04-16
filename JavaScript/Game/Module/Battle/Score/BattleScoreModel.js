"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleScoreModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  StateRef_1 = require("../../../../Core/Utils/Audio/StateRef"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class BattleScoreModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.vIn = new Map()),
      (this.Hul = new Map()),
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
      this.Hul.clear(),
      (this.EIn = 0),
      (this.RougeScoreMusicState.State = "none"),
      !0
    );
  }
  HandleBattleScoreNotify(e) {
    this.UpdateScore(e.NAs, e.FAs);
  }
  HandleBattleScoreEnableNotify(e) {
    this.UpdateScoreEnable(e.NAs, e.tWn);
  }
  CacheScoreConfig(e) {
    var t;
    this.MIn.has(e) ||
      ((t =
        ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreConfig(
          e,
        )) &&
        this.MIn.set(e, t));
  }
  UpdateScore(e, t) {
    this.vIn.set(e, t),
      this.EIn !== e && ((this.EIn = e), this.CacheScoreConfig(e)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleScoreChanged,
        e,
        t,
      );
  }
  UpdateScoreEnable(e, t) {
    this.Hul.set(e, t),
      this.CacheScoreConfig(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleScoreEnableChanged,
        e,
        t,
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          67,
          "战斗评分开关改变",
          ["scoreId", e],
          ["enable", t],
        );
  }
  GetScoreConfig(e, t = !1) {
    let r = this.MIn.get(e);
    return !r && t && (this.CacheScoreConfig(e), (r = this.MIn.get(e))), r;
  }
  GetScore(e) {
    return this.vIn.get(e) ?? 0;
  }
  GetScoreMap() {
    return this.vIn;
  }
  GetScoreEnableMap() {
    return this.Hul;
  }
  GetCurScoreId() {
    return this.EIn;
  }
  GetCurScore() {
    return this.GetScore(this.EIn);
  }
}
exports.BattleScoreModel = BattleScoreModel;
//# sourceMappingURL=BattleScoreModel.js.map
