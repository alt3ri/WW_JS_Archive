"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FailRangeTimer = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
class PendingProcess {
  constructor(s) {
    (this.ProcessType = s),
      (this.ProcessId = 0),
      (this.Finished = !1),
      (this.ProcessId = ++PendingProcess.Id);
  }
}
PendingProcess.Id = 0;
class StartShowProcess extends PendingProcess {
  constructor(s) {
    super(0), (this.EndTime = s);
  }
}
class EndShowProcess extends PendingProcess {
  constructor() {
    super(1);
  }
}
class FailRangeTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor(s, e, i) {
    super(s, e, !0, i),
      (this.UYt = []),
      (this.QZe = void 0),
      (this.OnTick = (s) => {
        if (0 !== this.UYt.length && !this.QZe)
          switch (((this.QZe = this.UYt[0]), this.QZe.ProcessType)) {
            case 0:
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
              );
          }
      }),
      (this.HDe = (s) => {
        (this.QZe.Finished = !0), this.UYt.shift(), (this.QZe = void 0);
      }),
      (this.QZe = void 0);
  }
  Destroy() {
    (this.UYt.length = 0),
      UiManager_1.UiManager.CloseView("QuestFailRangeTipsView", this.HDe),
      super.Destroy();
  }
  StartShowTimer(s) {
    this.UYt.push(new StartShowProcess(s));
  }
  EndShowTimer() {
    this.UYt.push(new EndShowProcess());
  }
}
exports.FailRangeTimer = FailRangeTimer;
//# sourceMappingURL=FailRangeTimer.js.map
