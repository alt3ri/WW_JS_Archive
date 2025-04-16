"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiAsyncTask = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log");
class UiAsyncTask {
  constructor(s, i, t) {
    (this.Name = s),
      (this.jEr = i),
      (this.Lk_ = t),
      (this.h0i = 0),
      (this.wk_ = !1),
      (this.WEr = new CustomPromise_1.CustomPromise());
  }
  get Promise() {
    return this.WEr.Promise;
  }
  get Status() {
    return this.h0i;
  }
  async Run() {
    if (0 !== this.h0i)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiAsyncTask",
          43,
          "[UiAsyncTask] 任务被重复执行",
          ["TaskName", this.Name],
          ["Status", this.Status],
        );
    else
      try {
        (this.h0i = 1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务开始执行", [
              "TaskName",
              this.Name,
            ]),
          await this.jEr(),
          this.wk_
            ? ((this.h0i = 3),
              this.WEr.SetResult(!1),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "UiAsyncTask",
                  43,
                  "[UiAsyncTask] 任务在执行过程中被取消",
                  ["TaskName", this.Name],
                ))
            : ((this.h0i = 2),
              this.WEr.SetResult(!0),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务完成", [
                  "TaskName",
                  this.Name,
                ]));
      } catch (s) {
        (this.h0i = 4),
          this.WEr.SetResult(!1),
          s instanceof Error
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "UiAsyncTask",
                43,
                "[UiAsyncTask] 任务执行异常",
                ["TaskName", this.Name],
                ["error", s.message],
              )
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "UiAsyncTask",
                43,
                "[UiAsyncTask] 任务执行异常",
                ["TaskName", this.Name],
                ["error", String(s)],
              );
      }
  }
  Cancel() {
    (0 !== this.h0i && 1 !== this.h0i) ||
      ((this.wk_ = !0),
      this.Lk_?.(),
      0 === this.h0i &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiAsyncTask",
          43,
          "[UiAsyncTask] 任务在执行之前被取消",
          ["TaskName", this.Name],
        ));
  }
}
exports.UiAsyncTask = UiAsyncTask;
//# sourceMappingURL=UiAsyncTask.js.map
