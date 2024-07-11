"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TagChangeNextTickTask = void 0);
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
class TagChangeNextTickTask {
  constructor() {
    (this.pyo = new Map()),
      (this.vyo = void 0),
      (this.Myo = []),
      (this.Syo = () => {
        if (((this.vyo = void 0), this.Myo.length > 0))
          for (const t of this.Myo) t(this.pyo);
        (this.Myo.length = 0), this.pyo.clear();
      });
  }
  TagChangeWaitNextTick(t, i, s) {
    this.pyo.set(t, i),
      this.Myo.push(s),
      this.vyo || (this.vyo = TimerSystem_1.TimerSystem.Next(this.Syo));
  }
  Clear() {
    this.vyo &&
      TimerSystem_1.TimerSystem.Has(this.vyo) &&
      TimerSystem_1.TimerSystem.Remove(this.vyo),
      (this.vyo = void 0),
      (this.Myo.length = 0),
      this.pyo.clear(),
      (this.Myo = void 0);
  }
}
exports.TagChangeNextTickTask = TagChangeNextTickTask;
// # sourceMappingURL=TagChangeNextTickTask.js.map
