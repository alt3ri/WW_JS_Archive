"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getIdleCallbackService = exports.IdleCallbackService = void 0);
const CircularQueue_1 = require("./CircularQueue"),
  DEFAULT_INTERVAL = 50;
class IdleCallbackService {
  constructor(e = DEFAULT_INTERVAL) {
    (this.Interval = e),
      (this.IYt = Date.now()),
      (this.xe = 0),
      (this.YAa = !1),
      (this.mp = new CircularQueue_1.CircularQueue(100)),
      (this.JAa = new Map()),
      (this.LDe = setInterval(() => {
        this.zAa();
      }, 0));
  }
  SetBusy(e) {
    this.YAa = e;
  }
  Dispose() {
    for (
      this.LDe && (clearInterval(this.LDe), (this.LDe = void 0));
      !this.mp.IsEmpty();

    ) {
      var e = this.mp.DeQueue();
      e.Handle && clearTimeout(e.Handle);
    }
  }
  zAa() {
    if (!this.YAa) {
      const t = this.IYt + this.Interval;
      for (; Date.now() < t; ) {
        var e = this.mp.DeQueue();
        if (!e) break;
        e.IsCanceled ||
          e.IsTimeout ||
          (this.jp(e.Id),
          e.Callback({
            DidTimeout: !1,
            TimeRemaining: () => {
              var e = t - Date.now();
              return 0 < e ? e : 0;
            },
          }));
      }
      this.IYt = Date.now();
    }
  }
  qp(e, t) {
    e = { Id: this.xe++, Callback: e };
    return this.mp.EnQueue(e), this.JAa.set(e.Id, e), e;
  }
  jp(e) {
    var t = this.JAa.get(e);
    t &&
      ((t.IsCanceled = !0), this.JAa.delete(e), t.Handle) &&
      clearTimeout(t.Handle);
  }
  Call(e, t) {
    const i = this.qp(e, t);
    return (
      t &&
        0 < t &&
        (i.Handle = setTimeout(() => {
          i.IsTimeout ||
            i.IsCanceled ||
            ((i.IsTimeout = !0),
            (i.Handle = void 0),
            e({ DidTimeout: !0, TimeRemaining: () => 0 }));
        }, t)),
      i.Id
    );
  }
  Cancel(e) {
    this.jp(e);
  }
}
const idleCallbackService = new (exports.IdleCallbackService =
  IdleCallbackService)();
function getIdleCallbackService() {
  return idleCallbackService;
}
exports.getIdleCallbackService = getIdleCallbackService;
//# sourceMappingURL=Task.js.map
