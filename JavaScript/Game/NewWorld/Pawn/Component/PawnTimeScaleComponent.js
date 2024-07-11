"use strict";
var PawnTimeScaleComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var r,
        h = arguments.length,
        o =
          h < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, i, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (r = t[n]) &&
            (o = (h < 3 ? r(o) : 3 < h ? r(e, i, o) : r(e, i)) || o);
      return 3 < h && o && Object.defineProperty(e, i, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnTimeScaleComponent = exports.TimeScale = void 0);
const puerts_1 = require("puerts"),
  Time_1 = require("../../../../Core/Common/Time"),
  PriorityQueue_1 = require("../../../../Core/Container/PriorityQueue"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  LIMIT_SCALE = 0;
class TimeScale {
  constructor(t, e, i, s, r, h, o, n) {
    (this.StartTime = t),
      (this.EndTime = e),
      (this.Priority = i),
      (this.TimeDilation = s),
      (this.TimeCurveFloat = r),
      (this.Duration = h),
      (this.Id = o),
      (this.SourceType = n),
      (this.MarkDelete = !1),
      (this.rrr = void 0),
      (this.nrr = void 0),
      (this.srr = void 0),
      (this.arr = void 0);
  }
  hrr() {
    var t = (0, puerts_1.$ref)(0),
      e = (0, puerts_1.$ref)(0);
    this.TimeCurveFloat.GetTimeRange(t, e),
      (this.rrr = (0, puerts_1.$unref)(t)),
      (this.nrr = (0, puerts_1.$unref)(e));
  }
  get CurveTimeRangeMin() {
    return void 0 === this.rrr && this.hrr(), this.rrr ?? -1 / 0;
  }
  get CurveTimeRangeMax() {
    return void 0 === this.nrr && this.hrr(), this.nrr ?? 1 / 0;
  }
  lrr() {
    var t = (0, puerts_1.$ref)(0),
      e = (0, puerts_1.$ref)(0);
    this.TimeCurveFloat.GetValueRange(t, e),
      (this.srr = (0, puerts_1.$unref)(t)),
      (this.arr = (0, puerts_1.$unref)(e));
  }
  get _rr() {
    return void 0 === this.srr && this.lrr(), this.srr ?? -1 / 0;
  }
  get urr() {
    return void 0 === this.arr && this.lrr(), this.arr ?? 1 / 0;
  }
  CalculateTimeScale() {
    var t, e, i;
    return this.TimeCurveFloat
      ? ((i = this.CurveTimeRangeMin),
        (t = this.CurveTimeRangeMax),
        (e = (Time_1.Time.WorldTimeSeconds - this.StartTime) / this.Duration),
        (e = MathUtils_1.MathUtils.RangeClamp(e, 0, 1, i, t)),
        (i = this.TimeCurveFloat.GetFloatValue(e)),
        1 -
          MathUtils_1.MathUtils.RangeClamp(i, this._rr, this.urr, 0, 1) *
            (1 - this.TimeDilation))
      : this.TimeDilation;
  }
}
exports.TimeScale = TimeScale;
let PawnTimeScaleComponent =
  (PawnTimeScaleComponent_1 = class PawnTimeScaleComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.ActorComp = void 0),
        (this.Xln = void 0),
        (this.TimeScaleInternal = 1),
        (this.Vhn = 1),
        (this.TimeScaleList = new PriorityQueue_1.PriorityQueue(
          PawnTimeScaleComponent_1.CompareScalePriority,
        )),
        (this.TimeScaleMap = new Map()),
        (this.Hhn = 1),
        (this.PauseLocks = new Map()),
        (this.DelayLocks = new Map());
    }
    static CompareScalePriority(t, e) {
      return t.Priority !== e.Priority
        ? e.Priority - t.Priority
        : t.TimeDilation !== e.TimeDilation
          ? t.TimeDilation - e.TimeDilation
          : e.EndTime - t.EndTime;
    }
    OnInit() {
      return (
        this.TimeScaleList.Clear(),
        this.TimeScaleMap.clear(),
        (this.Hhn = 1),
        !0
      );
    }
    OnStart() {
      (this.ActorComp = this.Entity.GetComponent(1)),
        (this.Xln = this.Entity.GetComponent(52));
      var t = this.ActorComp.CreatureData.GetEntityPropertyConfig();
      return (this.Vhn = t.子弹受击顿帧时长比例 / 100), !0;
    }
    IsTimescaleValid(t, e) {
      return t.EndTime > e && !t.MarkDelete;
    }
    OnTick(t) {}
    SetTimeScale(t, e, i, s, r) {
      var h, o;
      return (
        2 === r && (s *= this.Vhn),
        s <= 0
          ? -1
          : ((h = (o = Time_1.Time.WorldTimeSeconds) + s),
            (o = new TimeScale(
              o,
              h,
              t,
              Math.max(e, LIMIT_SCALE),
              i,
              s,
              this.Hhn++,
              r,
            )),
            this.TimeScaleList.Push(o),
            this.TimeScaleMap.set(o.Id, o),
            o.Id)
      );
    }
    RemoveTimeScale(t) {
      t = this.TimeScaleMap.get(t);
      t && (t.MarkDelete = !0);
    }
    get CurrentTimeScale() {
      return this.TimeScaleInternal;
    }
    ResetTimeScale() {
      this.Entity.IsInit &&
        (this.TimeScaleList.Clear(),
        this.TimeScaleMap.clear(),
        (this.TimeScaleInternal = 1),
        this.Entity.SetTimeDilation(1));
    }
    AddPauseLock(t) {
      this.PauseLocks.has(t) && this.RemovePauseLock(t);
      let e = -1;
      this.Xln.IsImmuneTimeScaleEffect() ||
        (e = this.SetTimeScale(1 / 0, 0, void 0, 1 / 0, 8)),
        this.PauseLocks.set(t, e);
    }
    RemovePauseLock(t) {
      var e = this.PauseLocks.get(t);
      void 0 !== e && this.RemoveTimeScale(e), this.PauseLocks.delete(t);
    }
    ImmunePauseLock() {
      this.PauseLocks.forEach((t) => {
        this.RemoveTimeScale(t);
      });
    }
    ResumePauseLock() {
      this.PauseLocks.forEach((t, e) => {
        var i = this.SetTimeScale(1 / 0, 0, void 0, 1 / 0, 8);
        this.PauseLocks.set(e, i);
      });
    }
    AddDelayLock(t) {
      this.DelayLocks.has(t) && this.RemoveDelayLock(t);
      var e = this.SetTimeScale(1 / 0, 1, void 0, 1 / 0, 9);
      this.DelayLocks.set(t, e);
    }
    RemoveDelayLock(t) {
      var e = this.DelayLocks.get(t);
      void 0 !== e && this.RemoveTimeScale(e), this.DelayLocks.delete(t);
    }
  });
(PawnTimeScaleComponent = PawnTimeScaleComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(109)],
    PawnTimeScaleComponent,
  )),
  (exports.PawnTimeScaleComponent = PawnTimeScaleComponent);
//# sourceMappingURL=PawnTimeScaleComponent.js.map
