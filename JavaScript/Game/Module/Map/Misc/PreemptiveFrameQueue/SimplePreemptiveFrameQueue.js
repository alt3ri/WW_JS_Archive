"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimplePreemptiveFrameQueue = void 0);
class SimplePreemptiveFrameQueue {
  constructor(s, t = 0) {
    (this.PerFrameTaskLimit = s),
      (this.ExecuteFrameInterval = t),
      (this.Tasks = []),
      (this.dlh = void 0),
      (this.Clh = 0),
      (this.EnableFlush = !1),
      (this.m8_ = 0),
      (this.m8_ = this.ExecuteFrameInterval);
  }
  AddTask(s) {
    let t = 0;
    for (; t < this.Tasks.length && this.Tasks[t].Priority < s.Priority; ) t++;
    this.Tasks.splice(t, 0, s),
      this.IsTaskComplete() &&
        !this.OnExecutionInterval &&
        (this.m8_ = this.ExecuteFrameInterval);
  }
  CancelTask(t) {
    var s = this.Tasks.findIndex((s) => s === t);
    -1 < s && (t.Cancel?.(), this.Tasks.splice(s, 1));
  }
  Process() {
    if (this.OnExecutionInterval) ++this.m8_;
    else if (
      (this.m8_ >= this.ExecuteFrameInterval && (this.m8_ = 0),
      this.IsTaskComplete())
    ) {
      for (
        this.Clh = 0;
        0 < this.Tasks.length && this.Clh < this.PerFrameTaskLimit;

      )
        if (((this.dlh = this.ShiftNextTask()), this.dlh)) {
          if (
            (this.dlh.Execute(),
            this.EnableFlush || this.Clh++,
            !this.IsTaskComplete())
          )
            break;
          this.OnTaskComplete(this.dlh);
        }
      this.Tasks.length || (this.dlh = void 0),
        this.Clh && this.OnLateExecuteTasksFrame();
    } else this.dlh.FrameExecute?.();
  }
  ShiftNextTask() {
    if (0 < this.Tasks.length) return this.Tasks.shift();
  }
  OnTaskComplete(s) {}
  OnLateExecuteTasksFrame() {}
  IsTaskComplete() {
    return !this.dlh || (this.dlh.IsComplete?.() ?? !0);
  }
  get OnExecutionInterval() {
    return this.m8_ < this.ExecuteFrameInterval;
  }
  Dispose() {
    this.dlh?.Cancel?.(), (this.dlh = void 0), (this.Tasks.length = 0);
  }
}
exports.SimplePreemptiveFrameQueue = SimplePreemptiveFrameQueue;
//# sourceMappingURL=SimplePreemptiveFrameQueue.js.map
