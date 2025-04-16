"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseScoreItem = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleChildView_1 = require("../BattleChildView/BattleChildView");
class BaseScoreItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.IsScoreEnable = !1),
      (this.Cul = (e, t) => {
        this.IsValidScore(e)
          ? this.IsScoreEnable !== t &&
            ((this.IsScoreEnable = t) ? this.ShowScore() : this.HideScore())
          : t && this.IsScoreEnable && this.HideScore();
      });
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreEnableMap();
    if (e)
      for (var [t, i] of e.entries())
        if (i && this.IsValidScore(t)) {
          this.IsScoreEnable = !0;
          break;
        }
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleScoreEnableChanged,
      this.Cul,
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleScoreEnableChanged,
      this.Cul,
    );
  }
  OnShowFirstTime() {
    this.IsScoreEnable && this.ShowScore();
  }
  OnTick(e) {}
  IsValidScore(e) {
    return !1;
  }
  ShowScore() {
    this.IsScoreEnable = !0;
  }
  HideScore() {
    this.IsScoreEnable = !1;
  }
}
exports.BaseScoreItem = BaseScoreItem;
//# sourceMappingURL=BaseScoreItem.js.map
