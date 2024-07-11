"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayPrepareTimer = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GeneralLogicTreeController_1 = require("../GeneralLogicTreeController"),
  LogicTreeTimerBase_1 = require("./LogicTreeTimerBase"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class LevelPlayPrepareTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor() {
    super(...arguments),
      (this.MYt = -0),
      (this.yYt = !1),
      (this.$Ge = (e) => {
        "PrepareCountdownFloatTips" === e && this.TYt();
      });
  }
  StartShowTimer(e) {
    (this.MYt = e),
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
        13,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  EndShowTimer() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CloseView,
      this.$Ge,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      UiManager_1.UiManager.CloseView("PrepareCountdownFloatTips");
  }
  TYt() {
    this.yYt ||
      ((this.yYt = !0),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      GeneralLogicTreeController_1.GeneralLogicTreeController.RequestTimerEnd(
        this.TreeId,
        this.TimerType,
      ));
  }
  GetRemainTime() {
    return (this.MYt - TimeUtil_1.TimeUtil.GetServerTimeStamp()) / 1e3;
  }
}
exports.LevelPlayPrepareTimer = LevelPlayPrepareTimer;
//# sourceMappingURL=LevelPlayPrepareTimer.js.map
