"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FrequencyMonitor = void 0);
const Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Time_1 = require("../../Core/Common/Time"),
  Queue_1 = require("../../Core/Container/Queue"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CombatDebugController_1 = require("./CombatDebugController");
class FrequencyMonitor {
  constructor(e, o, r, ...t) {
    (this.Ql = e),
      (this.t6 = o),
      (this.ECr = r),
      (this.qAt = void 0),
      (this.yCr = new Queue_1.Queue()),
      (this.qAt = t);
  }
  Execute() {
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      for (
        this.yCr.Push(Time_1.Time.NowSeconds);
        !this.yCr.Empty && Time_1.Time.NowSeconds - this.yCr.Front > this.Ql;

      )
        this.yCr.Pop();
      if (this.yCr.Size > this.t6) {
        let e = [
          ["msg", this.ECr],
          ["检查时间", this.Ql],
          ["检查次数", this.t6],
          ["当前次数", this.yCr.Size],
          ["联机", ModelManager_1.ModelManager.GameModeModel.IsMulti],
        ];
        this.qAt && (e = e.concat(this.qAt)),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "FrequencyMonitor",
              15,
              "业务逻辑执行频率过高",
              ...e,
            );
        var o,
          r,
          t = {};
        for ([o, r] of e) t[o] = r;
        var i = JSON.stringify(t);
        CombatDebugController_1.CombatDebugController.DataReport(
          "FREQUENCY_MONITOR",
          i,
        );
      }
    }
  }
}
exports.FrequencyMonitor = FrequencyMonitor;
//# sourceMappingURL=FrequencyMonitor.js.map
