"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayPrepareTimer = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GeneralLogicTreeController_1 = require("../GeneralLogicTreeController"),
  LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
class LevelPlayPrepareTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor() {
    super(...arguments),
      (this.MYt = -0),
      (this.GP_ = -0),
      (this.yYt = !1),
      (this.$Ge = (e) => {
        "PrepareCountdownFloatTips" === e && this.TYt();
      });
  }
  StartShowTimer(e, r) {
    (this.MYt = e),
      (this.GP_ = r),
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
      );
    var e = UiManager_1.UiManager.GetViewByName("PrepareCountdownFloatTips");
    e &&
      !e.IsDestroyOrDestroying &&
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
    var e = (this.MYt - TimeUtil_1.TimeUtil.GetServerStopTimeStamp()) / 1e3,
      r = 0 !== this.GP_ ? (this.MYt - this.GP_) / 1e3 : -1;
    return Math.max(e, r, 0);
  }
}
exports.LevelPlayPrepareTimer = LevelPlayPrepareTimer;
//# sourceMappingURL=LevelPlayPrepareTimer.js.map
