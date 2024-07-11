"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TagChangeNextTickTask = void 0);
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
class TagChangeNextTickTask {
  constructor() {
    (this.CIo = new Map()),
      (this.gIo = void 0),
      (this.fIo = []),
      (this.pIo = () => {
        if (((this.gIo = void 0), 0 < this.fIo.length))
          for (const t of this.fIo) t(this.CIo);
        (this.fIo.length = 0), this.CIo.clear();
      });
  }
  TagChangeWaitNextTick(t, i, s) {
    this.CIo.set(t, i),
      this.fIo.push(s),
      this.gIo || (this.gIo = TimerSystem_1.TimerSystem.Next(this.pIo));
  }
  Clear() {
    this.gIo &&
      TimerSystem_1.TimerSystem.Has(this.gIo) &&
      TimerSystem_1.TimerSystem.Remove(this.gIo),
      (this.gIo = void 0),
      (this.fIo.length = 0),
      this.CIo.clear(),
      (this.fIo = void 0);
  }
}
exports.TagChangeNextTickTask = TagChangeNextTickTask;
//# sourceMappingURL=TagChangeNextTickTask.js.map
