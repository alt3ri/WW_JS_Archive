"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiAsyncTaskManager = void 0);
const UiAsyncTaskQueue_1 = require("./UiAsyncTaskQueue");
class UiAsyncTaskManager {
  constructor() {
    this.Rk_ = void 0;
  }
  async RunTask(s) {
    this.Rk_ || (this.Rk_ = new Map());
    var e = s.Name;
    let t = this.Rk_.get(e);
    return (
      t ||
        ((t = new UiAsyncTaskQueue_1.UiAsyncTaskQueue()), this.Rk_.set(e, t)),
      t.EnQueue(s),
      t.ProcessQueue(),
      await s.Promise
    );
  }
  CancelAllTask() {
    if (this.Rk_ && 0 !== this.Rk_.size) {
      for (const s of this.Rk_.values()) s.Cancel();
      this.Rk_.clear();
    }
  }
}
exports.UiAsyncTaskManager = UiAsyncTaskManager;
//# sourceMappingURL=UiAsyncTaskManager.js.map
