"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapMarkPreemptiveFrameQueue = void 0);
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  SimplePreemptiveFrameQueue_1 = require("../../../../Misc/PreemptiveFrameQueue/SimplePreemptiveFrameQueue");
class MapMarkPreemptiveFrameQueue extends SimplePreemptiveFrameQueue_1.SimplePreemptiveFrameQueue {
  constructor() {
    super(...arguments), (this.glh = new Map());
  }
  AddTask(e) {
    super.AddTask(e);
    let t = this.glh.get(e.MarkType);
    t || ((t = new Map()), this.glh.set(e.MarkType, t)), t.set(e.MarkId, e);
  }
  ForceExecuteTask(e, t) {
    var s = this.plh(e, t);
    s && (s.Execute(), this.CancelMapTask(e, t));
  }
  Flush() {
    (this.EnableFlush = !0), this.Process(), (this.EnableFlush = !1);
  }
  CancelMapTask(e, t) {
    e = this.plh(e, t);
    e && (this.CancelTask(e), this.flh(e));
  }
  flh(e) {
    var t = this.glh.get(e.MarkType);
    t && t.delete(e.MarkId);
  }
  HasTask(e, t) {
    return void 0 !== this.plh(e, t);
  }
  plh(e, t) {
    if (0 === e) {
      let e = void 0;
      for (const [, s] of this.glh) if ((e = s.get(t))) break;
      return e;
    }
    const s = this.glh.get(e);
    if (s) return s.get(t);
  }
  CancelMapTaskByType(e) {
    e = this.glh.get(e);
    if (e) for (var [, t] of e) this.CancelTask(t), this.flh(t);
  }
  OnTaskComplete(e) {
    super.OnTaskComplete(e);
    this.flh(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMapMarkTaskComplete,
        e.MarkType,
        e.MarkId,
      );
  }
}
exports.MapMarkPreemptiveFrameQueue = MapMarkPreemptiveFrameQueue;
//# sourceMappingURL=MapMarkPreemptiveFrameQueue.js.map
