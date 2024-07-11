"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiFloatTipsData = exports.BattleUiFloatTip = void 0);
const Time_1 = require("../../../Core/Common/Time");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UiManager_1 = require("../../Ui/UiManager");
const MIN_VALID_TIME = 0.1;
class BattleUiFloatTip {
  constructor() {
    (this.Type = 0),
      (this.TextKey = void 0),
      (this.EndTime = 0),
      (this.CountdownEndTime = 0);
  }
}
exports.BattleUiFloatTip = BattleUiFloatTip;
class BattleUiFloatTipsData {
  constructor() {
    (this.QKe = new Array()), (this.CurTip = void 0);
  }
  Init() {}
  OnLeaveLevel() {
    (this.CurTip = void 0), (this.QKe.length = 0);
  }
  Clear() {}
  GetNextFloatTip() {
    for (; this.QKe.length > 0; ) {
      const t = this.QKe.pop();
      if (!this.CheckIsExpired(t)) return t;
    }
  }
  PlayNormalFloatTip(t, e) {
    const i = new BattleUiFloatTip();
    (i.Type = 0),
      (i.TextKey = t),
      (i.EndTime = Time_1.Time.WorldTimeSeconds + e),
      this.AddNewFloatTip(i);
  }
  PlayCountdownFloatTip(t, e, i) {
    const a = new BattleUiFloatTip();
    (a.Type = 1),
      (a.TextKey = t),
      (a.EndTime = Time_1.Time.WorldTimeSeconds + e),
      (a.CountdownEndTime = Time_1.Time.WorldTimeSeconds + i),
      this.AddNewFloatTip(a);
  }
  AddNewFloatTip(t) {
    this.CurTip && this.QKe.push(this.CurTip),
      (this.CurTip = t),
      UiManager_1.UiManager.IsViewOpen("BattleFloatTipsView")
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BattleUiFloatTipUpdate,
          )
        : UiManager_1.UiManager.OpenView("BattleFloatTipsView");
  }
  CheckIsExpired(t) {
    return t.EndTime - Time_1.Time.WorldTimeSeconds < MIN_VALID_TIME;
  }
}
exports.BattleUiFloatTipsData = BattleUiFloatTipsData;
// # sourceMappingURL=BattleUiFloatTipsData.js.map
