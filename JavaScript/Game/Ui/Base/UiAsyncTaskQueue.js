"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiAsyncTaskQueue = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Queue_1 = require("../../../Core/Container/Queue");
class UiAsyncTaskQueue {
  constructor() {
    (this.TaskQueue = void 0),
      (this.Ak_ = !1),
      (this.wk_ = !1),
      (this.Pk_ = void 0);
  }
  EnQueue(s) {
    this.TaskQueue || (this.TaskQueue = new Queue_1.Queue()),
      this.TaskQueue.Push(s),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiAsyncTask",
          43,
          "[UiAsyncTask] 添加任务",
          ["TaskName", s.Name],
          ["Status", s.Status],
        );
  }
  async ProcessQueue() {
    if (!this.wk_ && !this.Ak_ && this.TaskQueue && 0 !== this.TaskQueue.Size) {
      for (this.Ak_ = !0; 0 < this.TaskQueue.Size; )
        (this.Pk_ = this.TaskQueue.Pop()),
          this.Pk_ &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "UiAsyncTask",
                43,
                "[UiAsyncTask] 任务开始执行",
                ["TaskName", this.Pk_.Name],
                ["Status", this.Pk_.Status],
              ),
            await this.Pk_.Run(),
            (this.Pk_ = void 0));
      this.Ak_ = !1;
    }
  }
  Cancel() {
    if (((this.wk_ = !0), this.Pk_?.Cancel(), this.TaskQueue)) {
      for (let s = 0; s < this.TaskQueue.Size; s++)
        this.TaskQueue.Get(s)?.Cancel();
      this.TaskQueue.Clear();
    }
  }
}
exports.UiAsyncTaskQueue = UiAsyncTaskQueue;
//# sourceMappingURL=UiAsyncTaskQueue.js.map
