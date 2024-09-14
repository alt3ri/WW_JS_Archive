"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FailRangeTimer = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
class PendingProcess {
  constructor(e) {
    (this.ProcessType = e),
      (this.ProcessId = 0),
      (this.Finished = !1),
      (this.ProcessId = ++PendingProcess.Id);
  }
}
PendingProcess.Id = 0;
class StartShowProcess extends PendingProcess {
  constructor(e) {
    super(0), (this.EndTime = e);
  }
}
class EndShowProcess extends PendingProcess {
  constructor() {
    super(1);
  }
}
class FailRangeTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor(e, s, i) {
    super(e, s, !0, i),
      (this.UYt = []),
      (this.QZe = void 0),
      (this.OnTick = (e) => {
        if (0 !== this.UYt.length && !this.QZe)
          switch (((this.QZe = this.UYt[0]), this.QZe.ProcessType)) {
            case 0:
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.FailRangeTimerStartShow,
              ),
                UiManager_1.UiManager.OpenView(
                  "QuestFailRangeTipsView",
                  this.QZe.EndTime,
                  this.HDe,
                );
              break;
            case 1:
              UiManager_1.UiManager.CloseView(
                "QuestFailRangeTipsView",
                this.HDe,
              ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.FailRangeTimerEndShow,
                );
          }
      }),
      (this.HDe = (e) => {
        (this.QZe.Finished = !0), this.UYt.shift(), (this.QZe = void 0);
      }),
      (this.QZe = void 0);
  }
  Destroy() {
    (this.UYt.length = 0),
      UiManager_1.UiManager.CloseView("QuestFailRangeTipsView", this.HDe),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FailRangeTimerEndShow,
      ),
      super.Destroy();
  }
  StartShowTimer(e) {
    this.UYt.push(new StartShowProcess(e));
  }
  EndShowTimer() {
    this.UYt.push(new EndShowProcess());
  }
}
exports.FailRangeTimer = FailRangeTimer;
//# sourceMappingURL=FailRangeTimer.js.map
