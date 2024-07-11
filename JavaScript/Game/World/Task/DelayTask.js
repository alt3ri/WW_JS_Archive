"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DelayTask = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  TaskBase_1 = require("./TaskBase"),
  DEFAULT_DELAY_TIME = 1e3;
class DelayTask extends TaskBase_1.TaskBase {
  constructor(e, s, t, r = DEFAULT_DELAY_TIME, i) {
    super(e, t, i),
      (this.kMt = new CustomPromise_1.CustomPromise()),
      (this.jEr = s),
      (this.rbt = Math.max(r, TimerSystem_1.MIN_TIME));
  }
  async OnRun() {
    return !(
      (this.jEr && this.jEr()) ||
      (TimerSystem_1.TimerSystem.Delay(() => {
        this.kMt.SetResult(!0);
      }, this.rbt),
      await this.kMt.Promise,
      0)
    );
  }
}
exports.DelayTask = DelayTask;
//# sourceMappingURL=DelayTask.js.map
