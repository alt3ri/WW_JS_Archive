"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayPrepareTimer = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiManager_1 = require("../../../Ui/UiManager");
const GeneralLogicTreeController_1 = require("../GeneralLogicTreeController");
const LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class LevelPlayPrepareTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor() {
    super(...arguments),
      (this.M$t = -0),
      (this.y$t = !1),
      (this.$Ge = (e) => {
        e === "PrepareCountdownFloatTips" && this.T$t();
      });
  }
  StartShowTimer(e) {
    (this.M$t = e),
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
  T$t() {
    this.y$t ||
      ((this.y$t = !0),
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
    return (this.M$t - TimeUtil_1.TimeUtil.GetServerTimeStamp()) / 1e3;
  }
}
exports.LevelPlayPrepareTimer = LevelPlayPrepareTimer;
// # sourceMappingURL=LevelPlayPrepareTimer.js.map
