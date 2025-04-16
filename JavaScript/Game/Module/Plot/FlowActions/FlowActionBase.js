"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionBase = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class FlowActionBase {
  constructor() {
    (this.Type = ""),
      (this.ActionInfo = void 0),
      (this.Callback = void 0),
      (this.Runner = void 0),
      (this.Owner = void 0),
      (this.Context = void 0);
  }
  Execute(t, i, o) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Plot",
        26,
        "===>剧情行为开始",
        ["", t.Name],
        ["actionId", t.ActionId],
        ["background", i.IsBackground],
      ),
      (this.Context = i),
      (this.ActionInfo = t),
      i.IsBackground ? this.OnBackgroundExecute() : this.OnExecute(),
      o && this.FinishExecute(!0);
  }
  OnExecute() {}
  OnBackgroundExecute() {
    this.FinishExecute(!0);
  }
  InterruptExecute() {
    this.OnInterruptExecute();
  }
  OnInterruptExecute() {}
  RecordAction(t) {
    this.Context &&
      (t
        ? this.Context.RollbackRecord.push(t)
        : this.Context.RollbackRecord.push({ ActionInfo: this.ActionInfo }));
  }
  Rollback(t, i) {
    var o = t.ActionInfo;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Plot",
        26,
        "剧情行为回退",
        ["name", o.Name],
        ["actionId", o.ActionId],
      ),
      this.OnRollback(t, i);
  }
  OnRollback(t, i) {}
  FinishExecute(t, i = !0) {
    var o;
    this.ActionInfo &&
      this.Runner &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Plot",
          26,
          "<===剧情行为结束",
          ["", this.ActionInfo?.Name],
          ["actionId", this.ActionInfo?.ActionId],
          ["isSuccess", t],
          ["isContinue", i],
        ),
      (this.ActionInfo = void 0),
      (this.Runner = void 0),
      (this.Context = void 0),
      this.Callback) &&
      ((o = this.Callback), (this.Callback = void 0), o(t, i));
  }
  Recycle() {
    this.Owner?.RecycleAction(this);
  }
}
exports.FlowActionBase = FlowActionBase;
//# sourceMappingURL=FlowActionBase.js.map
