"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RealTimeTimerSystem =
    exports.TimerSystem =
    exports.TimerHandle =
    exports.MAX_TIME =
    exports.MIN_TIME =
      void 0);
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const Time_1 = require("../Common/Time");
const PriorityQueue_1 = require("../Container/PriorityQueue");
const MAX_LOOP = ((exports.MIN_TIME = 20), (exports.MAX_TIME = 9e4), 10);
const FOREVER = 0;
class TimerHandle {
  constructor() {
    (this.Id = 0), (this.Id = ++TimerHandle.o6);
  }
  Valid() {
    return TimerSystem.Has(this);
  }
  Remove() {
    return TimerSystem.Remove(this);
  }
  IsPause() {
    return TimerSystem.IsPause(this);
  }
  Pause() {
    return TimerSystem.Pause(this);
  }
  Resume() {
    return TimerSystem.Resume(this);
  }
  ChangeDilation(t) {
    return TimerSystem.ChangeDilation(this, t);
  }
}
(exports.TimerHandle = TimerHandle).o6 = 0;
class Timer {
  constructor(t, i, e, s, r, o, n, h) {
    (this.Id = t),
      (this.IO = i),
      (this.Interval = e),
      (this.kC = s),
      (this.Dilation = r),
      (this.Handle = o),
      (this.MJ = n),
      (this.Reason = h),
      (this.Now = -0),
      (this.Next = -0),
      (this.t6 = 0),
      (this.State = 0),
      (this.Next = this.Now + e / r);
  }
  Do() {
    const t = this.Next;
    const i = t - this.Now;
    this.MJ;
    (this.Now = t),
      (this.Next = t + this.Interval / this.Dilation),
      (this.t6 += 1);
    try {
      (this.Handle = void 0), this.IO(i);
    } catch (t) {
      t instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "Timer",
            1,
            "定时器执行异常",
            t,
            ["id", this.Id],
            ["reason", this.Reason],
            ["error", t.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Timer",
            1,
            "定时器执行异常",
            ["id", this.Id],
            ["reason", this.Reason],
            ["error", t],
          );
    }
    return this.kC === FOREVER || this.t6 < this.kC;
  }
  Copy() {
    this.Handle = void 0;
    const t = new Timer(
      this.Id,
      this.IO,
      this.Interval,
      this.kC,
      this.Dilation,
      void 0,
      this.MJ,
      this.Reason,
    );
    return (
      (t.Now = this.Now),
      (t.Next = this.Next),
      (t.t6 = this.t6),
      (t.State = this.State),
      t
    );
  }
  Clear() {
    (this.IO = void 0), (this.Handle = void 0), (this.MJ = void 0);
  }
}
Timer.Compare = (t, i) => t.Next - i.Next;
class TimerSystemInstance {
  constructor() {
    (this.Now = 0),
      (this.Timers = new Map()),
      (this.Queue = new PriorityQueue_1.PriorityQueue(Timer.Compare)),
      (this.Stat = void 0),
      (this.StatWeakMap = new WeakMap()),
      (this.Registry = new FinalizationRegistry((t) => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Timer", 1, "移除TimerHandle已经被GC的定时器", [
            "timer",
            t,
          ]),
          this.gK(t);
      }));
  }
  Tick(t) {
    for (let i = this.Now + t, e = ((this.Now = i), this.Queue); !e.Empty; ) {
      const s = e.Top;
      if (!s || s.Next > i) break;
      e.Pop(), s.State === 0 && (s.Do() ? e.Push(s) : this.gK(s));
    }
  }
  Has(t) {
    return void 0 !== t && this.Timers.has(t.Id);
  }
  Loop(t, i, e, s = 1, r = void 0, o = void 0) {
    if (
      TimerSystemInstance.j6(i) &&
      TimerSystemInstance.yJ(e) &&
      TimerSystemInstance.IJ(s)
    )
      return this.fK(t, i, e, s, r, o);
  }
  Forever(t, i, e = 1, s = void 0, r = void 0) {
    if (TimerSystemInstance.j6(i) && TimerSystemInstance.IJ(e))
      return this.fK(t, i, FOREVER, e, s, r);
  }
  Delay(t, i, e = void 0, s = void 0) {
    if (TimerSystemInstance.j6(i, s)) return this.fK(t, i, 1, 1, e, s);
  }
  Next(t, i = void 0, e = void 0) {
    return this.fK(t, 1, 1, 1, i, e);
  }
  Remove(t) {
    t = this.TJ(t);
    return t && this.gK(t);
  }
  IsPause(t) {
    t = this.TJ(t);
    return t && t.State === 1;
  }
  Pause(t) {
    let i;
    const e = this.TJ(t);
    return (
      !!e &&
      (e.State !== 0
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Timer",
              1,
              "计时器已废弃或暂停",
              ["id", t.Id],
              ["state", e.State],
            ),
          !1)
        : ((i = e.Copy()),
          (e.State = 2),
          (i.Next = i.Next - this.Now),
          (i.State = 1),
          this.Registry.unregister(e),
          this.Timers.set(t.Id, i),
          this.Registry.register(t, i, i),
          !0))
    );
  }
  Resume(t) {
    const i = this.TJ(t);
    return (
      !!i &&
      (i.State !== 1
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Timer",
              1,
              "计时器已废弃或非暂停",
              ["id", t.Id],
              ["state", i.State],
            ),
          !1)
        : ((i.Next = i.Next + this.Now), (i.State = 0), this.Queue.Push(i), !0))
    );
  }
  ChangeInterval(t, i) {
    if (!TimerSystemInstance.j6(i)) return !1;
    const e = this.TJ(t);
    if (!e) return !1;
    if (
      (e.State === 2 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Timer",
          1,
          "计时器已废弃",
          ["id", t.Id],
          ["interval", i],
        ),
      e.Interval !== i)
    ) {
      const s = this.Now;
      if (e.State === 1) {
        const o = e.Next + i - e.Interval;
        (e.Next = o < 0 ? 0 : o), (e.Interval = i);
      } else {
        const r = e.Copy();
        e.State = 2;
        const o = r.Next + i - r.Interval;
        (r.Next = o < s ? s : o),
          (r.Interval = i),
          this.Registry.unregister(e),
          this.Timers.set(t.Id, r),
          this.Queue.Push(r),
          this.Registry.register(t, r, r);
      }
    }
    return !0;
  }
  ChangeDilation(t, i) {
    let e, s, r;
    return (
      !!TimerSystemInstance.IJ(i) &&
      !!(e = this.TJ(t)) &&
      (e.State === 2 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Timer",
          1,
          "计时器已废弃",
          ["id", t.Id],
          ["dilation", i],
        ),
      e.Dilation !== i &&
        ((s = this.Now),
        e.State === 1
          ? ((e.Next = (e.Next * e.Dilation) / i), (e.Dilation = i))
          : ((r = e.Copy()),
            (e.State = 2),
            (r.Next = s + ((r.Next - s) * r.Dilation) / i),
            (r.Dilation = i),
            this.Registry.unregister(e),
            this.Timers.set(t.Id, r),
            this.Queue.Push(r),
            this.Registry.register(t, r, r))),
      !0)
    );
  }
  async Wait(i, e = void 0) {
    return new Promise((t) => {
      this.Delay(
        () => {
          t();
        },
        i,
        e,
      );
    });
  }
  TJ(t) {
    if (t) return this.LJ(t.Id);
    Log_1.Log.CheckError() && Log_1.Log.Error("Timer", 1, "计时器句柄为空");
  }
  LJ(t) {
    if (t <= 0)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Timer", 1, "计时器句柄非法", ["id", t]);
    else {
      const i = this.Timers.get(t);
      if (i) return i;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Timer", 1, "计时器句柄不存在", ["id", t]);
    }
  }
  fK(i, e, s, r, o, n) {
    if (i) {
      let t = void 0;
      o ||
        (t = this.StatWeakMap.get(i)) ||
        ((t = void 0), this.StatWeakMap.set(i, t));
      const h = this.Now;
      const a = new TimerHandle();
      var s = new Timer(a.Id, i, e, s, r, a, o ?? t, n);
      return (
        (s.Now = h),
        (s.Next = h + e / r),
        this.Timers.set(a.Id, s),
        this.Queue.Push(s),
        this.Registry.register(a, s, s),
        a
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Timer", 1, "定时器处理方法不存在", ["handle", i]);
  }
  gK(t) {
    return (
      this.Registry.unregister(t),
      (t.State = 2),
      t.Clear(),
      this.Timers.delete(t.Id),
      !0
    );
  }
  static j6(t, i = void 0) {
    return t < exports.MIN_TIME
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Timer",
            1,
            "计时器间隔必须在合理范围内，请检查定时器间隔参数",
            ["MIN_TIME", exports.MIN_TIME],
            ["MAX_TIME", exports.MAX_TIME],
            ["interval", t],
          ),
        !1)
      : (t > exports.MAX_TIME &&
          (i
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Timer",
                1,
                "计时器间隔较长，此处显式打印辅助定位问题",
                ["MIN_TIME", exports.MIN_TIME],
                ["MAX_TIME", exports.MAX_TIME],
                ["interval", t],
                ["reason", i],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Timer",
                1,
                "计时器间隔必须在合理范围内，请联系 CC 确认时间是否合理",
                ["MIN_TIME", exports.MIN_TIME],
                ["MAX_TIME", exports.MAX_TIME],
                ["interval", t],
              )),
        !0);
  }
  static yJ(t) {
    return (
      !(t <= 1 || t > MAX_LOOP) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Timer",
          1,
          "计时器次数必须在合理范围内，请检查定时器循环次数参数",
          ["MAX_LOOP", MAX_LOOP],
          ["loop", t],
        ),
      !1)
    );
  }
  static IJ(t) {
    return !(
      t <= 0 &&
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Timer",
          1,
          "计时器时间缩放不能小于等于 0 ，请检查定时器时间缩放参数",
          ["dilation", t],
        ),
      1)
    );
  }
}
class TimerSystemImplement {
  static get Instance() {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Timer", 17, "get Instance not implement");
  }
  static TickImplement(t) {
    this.Instance?.Tick(t);
  }
  static Has(t) {
    return this.Instance?.Has(t) ?? !1;
  }
  static Loop(t, i, e, s = 1, r = void 0, o = void 0) {
    return this.Instance?.Loop(t, i, e, s, r, o);
  }
  static Forever(t, i, e = 1, s = void 0, r = void 0) {
    return this.Instance?.Forever(t, i, e, s, r);
  }
  static Delay(t, i, e = void 0, s = void 0) {
    return this.Instance?.Delay(t, i, e, s);
  }
  static Next(t, i = void 0, e = void 0) {
    return this.Instance?.Next(t, i, e);
  }
  static Remove(t) {
    return this.Instance?.Remove(t) ?? !1;
  }
  static IsPause(t) {
    return this.Instance?.IsPause(t) ?? !1;
  }
  static Pause(t) {
    return this.Instance?.Pause(t) ?? !1;
  }
  static Resume(t) {
    return this.Instance?.Resume(t) ?? !1;
  }
  static ChangeInterval(t, i) {
    return this.Instance?.ChangeInterval(t, i) ?? !1;
  }
  static ChangeDilation(t, i) {
    return this.Instance?.ChangeDilation(t, i) ?? !1;
  }
  static async Wait(t, i = void 0) {
    return this.Instance?.Wait(t, i) ?? Promise.resolve();
  }
}
class TimerSystem extends TimerSystemImplement {
  static get Instance() {
    return this.InstanceInternal;
  }
  static Tick(t) {
    this.TickImplement(t);
  }
}
(exports.TimerSystem = TimerSystem).InstanceInternal =
  new TimerSystemInstance();
class RealTimeTimerSystem extends TimerSystemImplement {
  static get Instance() {
    return this.InstanceInternal;
  }
  static Tick() {
    const t = Time_1.Time.ServerTimeStamp;
    const i = t - this.e8s;
    (this.e8s = t), this.TickImplement(i);
  }
}
((exports.RealTimeTimerSystem = RealTimeTimerSystem).InstanceInternal =
  new TimerSystemInstance()),
  (RealTimeTimerSystem.e8s = 0);
// # sourceMappingURL=TimerSystem.js.map
