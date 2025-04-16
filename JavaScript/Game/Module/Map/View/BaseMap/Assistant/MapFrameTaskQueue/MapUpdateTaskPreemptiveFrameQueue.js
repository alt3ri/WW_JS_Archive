"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapUpdateTaskPreemptiveFrameQueue = void 0);
const SimplePreemptiveFrameQueue_1 = require("../../../../Misc/PreemptiveFrameQueue/SimplePreemptiveFrameQueue");
class MapUpdateTaskPreemptiveFrameQueue extends SimplePreemptiveFrameQueue_1.SimplePreemptiveFrameQueue {
  constructor() {
    super(...arguments), (this.glh = new Map());
  }
  AddTask(e) {
    var r = this.glh.get(e.MarkId);
    r
      ? ((r.Priority = Math.min(e.Priority, r.Priority - 1)),
        super.CancelTask(r),
        super.AddTask(r))
      : (this.glh.set(e.MarkId, e), super.AddTask(e));
  }
  OnTaskComplete(e) {
    this.glh.delete(e.MarkId);
  }
}
exports.MapUpdateTaskPreemptiveFrameQueue = MapUpdateTaskPreemptiveFrameQueue;
//# sourceMappingURL=MapUpdateTaskPreemptiveFrameQueue.js.map
