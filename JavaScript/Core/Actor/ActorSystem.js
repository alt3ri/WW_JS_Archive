"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorSystem = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../Common/Info"),
  Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  PriorityQueue_1 = require("../Container/PriorityQueue"),
  EffectEnvironment_1 = require("../Effect/EffectEnvironment"),
  TickSystem_1 = require("../Tick/TickSystem"),
  ActorPoolGuard_1 = require("./ActorPoolGuard"),
  ActorSystemDebugger_1 = require("./ActorSystemDebugger"),
  DEFAULT_CAPACITY = 300,
  ACCESS_WEIGHT = 1,
  FRESHNESS_WIGHT = 1,
  COST_WIGHT = 10,
  INDEX_WIGHT = 5,
  COST_DECAY_RATE = 0.5;
class Entry {
  constructor(t, e) {
    (this.Class = t),
      (this.Budget = e),
      (this.t6 = 0),
      (this.i6 = 0),
      (this.Score = 0),
      (this.Values = new Map());
  }
  Touch(t = void 0) {
    (this.t6 += 1),
      void 0 !== t &&
        (this.i6 = this.i6 * (1 - COST_DECAY_RATE) + t * COST_DECAY_RATE),
      (Entry.o6 += 1),
      (this.Score =
        this.t6 * ACCESS_WEIGHT +
        Entry.o6 * FRESHNESS_WIGHT +
        this.i6 * COST_WIGHT -
        this.Values.size * INDEX_WIGHT);
  }
}
(Entry.o6 = 0),
  (Entry.Compare = (t, e) => {
    var r = t.Values.size,
      o = e.Values.size,
      r = 0 === t.Budget || r <= t.Budget;
    return r == (0 === e.Budget || o <= e.Budget)
      ? t.Score - e.Score
      : r
        ? 1
        : -1;
  });
class ActorSystem {
  static Initialize() {
    UE.KuroActorManager.InitActorManager(),
      EffectEnvironment_1.EffectEnvironment.OpenCppOptimize
        ? this.SetBudget(UE.EffectSystemActor.StaticClass(), 100)
        : this.SetBudget(UE.TsEffectActor_C.StaticClass(), 100),
      TickSystem_1.TickSystem.Add(ActorSystem.r6, "ActorSystem.Tick", 2, !0);
  }
  static get Size() {
    return ActorSystem.n6;
  }
  static get Capacity() {
    return ActorSystem.s6;
  }
  static set Capacity(t) {
    if (t < 2)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Core", 1, "容量错误", ["capacity", t]);
    else
      for (
        ActorSystem.a6 = 1 - 1 / t,
          ActorSystem.h6 = (ActorSystem.h6 / ActorSystem.s6) * t,
          ActorSystem.l6 = (ActorSystem.l6 / ActorSystem.s6) * t,
          ActorSystem.s6 = t;
        ActorSystem.n6 > t || ActorSystem.mp.Size > t;

      )
        ActorSystem._6();
  }
  static get HitRate() {
    return 0 < ActorSystem.h6
      ? ActorSystem.h6 / (ActorSystem.h6 + ActorSystem.l6)
      : 0;
  }
  static Get(r, o, s, c = !0) {
    if ((ActorSystem.u6.Start(), ActorSystem.c6(r))) {
      var S = ActorSystem.m6(ActorSystem.d6, r, "ActorSystem.Get.");
      if ((S?.Start(), !ActorSystem.Enable || 1 !== ActorSystem.State)) {
        const t = ActorSystem.Spawn(r, o, s);
        return S?.Stop(), ActorSystem.u6.Stop(), t;
      }
      let e = ActorSystem.ve.get(r);
      if (!e) {
        e = new Entry(r, ActorSystem.C6.get(r) ?? 0);
        const i = cpp_1.KuroTime.GetMilliseconds64(),
          t = ActorSystem.g6(r, o, s);
        return (
          e.Touch(cpp_1.KuroTime.GetMilliseconds64() - i),
          ActorSystem.mp.Push(e),
          ActorSystem.ve.set(r, e),
          (ActorSystem.h6 = ActorSystem.h6 * ActorSystem.a6),
          (ActorSystem.l6 = ActorSystem.l6 * ActorSystem.a6 + 1),
          S?.Stop(),
          ActorSystem.u6.Stop(),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ActorSystemDebugger_1.ActorSystemDebugger.RecordGetPut({
              ClassName: r.GetName(),
              GetOrPut: "Get",
              Hit: !1,
              TimeStamp: new Date().getTime(),
              ThisTypeTotal: 0,
              HitRate: ActorSystem.HitRate,
              CurrentTotal: ActorSystem.Size,
              PendingKillNum: ActorSystem.f6.length,
            }),
          t
        );
      }
      var m = e.Values;
      let t = void 0;
      for (; m.size; ) {
        var A = m.keys().next(),
          A = ((t = A.value), m.values().next()),
          A = A.value,
          y = (m.delete(t), --ActorSystem.n6, ActorSystem.pLe.get(A));
        if (t) {
          if (t.IsValid()) {
            t.OnEndPlay.Remove(ActorSystem.hbn);
            var a = t.GetWorld();
            if (a && a.IsValid()) {
              if (c) {
                if (
                  !ActorPoolGuard_1.ActorPoolGuard.PrepareActorBeforeDePool(t)
                ) {
                  Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "ActorSystem",
                      1,
                      "Actor出池重置失败",
                      ["ueClass", r.GetName()],
                      ["Reason", y],
                    ),
                    ActorSystem.f6.push({
                      Actor: t,
                      Klass: t.GetClass().GetName(),
                      ReasonId: A,
                    }),
                    (t = void 0);
                  continue;
                }
                t.OnDestroyed.Remove(ActorSystem._Tn),
                  t.OnDestroyed.Add(ActorSystem._Tn);
              }
              ActorSystem.Kml.delete(t),
                ActorSystem.pLe.delete(A),
                o && t.D_K2_SetActorTransform(o, !1, void 0, !0),
                s && t.SetOwner(s);
              break;
            }
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActorSystem",
                1,
                "Actor所属World无效",
                ["ueClass", r.GetName()],
                ["Reason", y],
              ),
              ActorSystem.f6.push({
                Actor: t,
                Klass: t.GetClass().GetName(),
                ReasonId: A,
              });
          } else
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActorSystem",
                1,
                "对象无效",
                ["Target", t],
                ["ueClass", r.GetName()],
                ["Reason", y],
              );
          t = void 0;
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "ActorSystem",
              1,
              "对象不存在",
              ["Target", t],
              ["ueClass", r.GetName()],
              ["Reason", y],
            );
      }
      if (t)
        e.Touch(),
          ActorSystem.mp.Update(e),
          (ActorSystem.h6 = ActorSystem.h6 * ActorSystem.a6 + 1),
          (ActorSystem.l6 = ActorSystem.l6 * ActorSystem.a6),
          S?.Stop(),
          ActorSystem.u6.Stop(),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ActorSystemDebugger_1.ActorSystemDebugger.RecordGetPut({
              ClassName: r.GetName(),
              GetOrPut: "Get",
              Hit: !0,
              TimeStamp: new Date().getTime(),
              ThisTypeTotal: m.size,
              HitRate: ActorSystem.HitRate,
              CurrentTotal: ActorSystem.Size,
              PendingKillNum: ActorSystem.f6.length,
            });
      else {
        const i = cpp_1.KuroTime.GetMilliseconds64();
        (t = ActorSystem.g6(r, o, s)),
          e.Touch(cpp_1.KuroTime.GetMilliseconds64() - i),
          ActorSystem.mp.Update(e),
          (ActorSystem.h6 = ActorSystem.h6 * ActorSystem.a6),
          (ActorSystem.l6 = ActorSystem.l6 * ActorSystem.a6 + 1),
          S?.Stop(),
          ActorSystem.u6.Stop(),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ActorSystemDebugger_1.ActorSystemDebugger.RecordGetPut({
              ClassName: r.GetName(),
              GetOrPut: "Get",
              Hit: !1,
              TimeStamp: new Date().getTime(),
              ThisTypeTotal: m.size,
              HitRate: ActorSystem.HitRate,
              CurrentTotal: ActorSystem.Size,
              PendingKillNum: ActorSystem.f6.length,
            });
      }
      return t;
    }
    ActorSystem.u6.Stop();
  }
  static Put(e, r, o) {
    if ((ActorSystem.p6.Start(), !r || !r.IsValid()))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActorSystem",
            1,
            "对象不存在",
            ["Target", r],
            ["Reason", e],
          ),
        ActorSystem.p6.Stop(),
        !1
      );
    if (ActorSystem.Enable && 1 === ActorSystem.State) {
      if (!UE.KuroActorManager.IsPooledActor(r))
        return UE.KuroActorManager.DestroyActor(r), ActorSystem.p6.Stop(), !1;
      var s = r.GetClass();
      if (!r.GetWorld() || !r.GetWorld().IsValid())
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "ActorSystem",
              1,
              "World无效或者World发生改变",
              ["ueClass", s.GetName()],
              ["Reason", e],
            ),
          UE.KuroActorManager.DestroyActor(r),
          ActorSystem.p6.Stop(),
          !1
        );
      var c = ActorSystem.m6(ActorSystem.v6, s, "ActorSystem.Put.");
      if (
        (c?.Start(),
        !ActorPoolGuard_1.ActorPoolGuard.CleanActorBeforeEnPool(r, o))
      )
        return (
          UE.KuroActorManager.DestroyActor(r),
          c?.Stop(),
          ActorSystem.p6.Stop(),
          !1
        );
      if (
        (r.OnDestroyed.Add(ActorSystem._Tn),
        r.OnEndPlay.Add(ActorSystem.hbn),
        ActorSystem.Kml.has(r))
      )
        return (
          (o = ActorSystem.Kml.get(r)),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "ActorSystem",
              9,
              "Actor被重复入池！",
              ["ueClass", s.GetName()],
              ["OldReason", o],
              ["Reason", e],
            ),
          c?.Stop(),
          ActorSystem.p6.Stop(),
          !1
        );
      var S,
        o = ++ActorSystem.iao;
      ActorSystem.pLe.set(o, e), ActorSystem.Kml.set(r, o);
      let t = ActorSystem.ve.get(s);
      if (t) {
        if (t.Values.has(r))
          return (
            (S = t.Values.get(r)),
            (S = ActorSystem.pLe.get(S)),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActorSystem",
                9,
                "Actor被重复入池！",
                ["ueClass", s.GetName()],
                ["OldReason", S],
                ["Reason", e],
              ),
            c?.Stop(),
            ActorSystem.p6.Stop(),
            !1
          );
        t.Values.set(r, o), t.Touch(), ActorSystem.mp.Update(t);
      } else
        (t = new Entry(s, ActorSystem.C6.get(s) ?? 0)).Values.set(r, o),
          t.Touch(),
          ActorSystem.mp.Push(t),
          ActorSystem.ve.set(s, t);
      for (
        Info_1.Info.IsBuildDevelopmentOrDebug &&
          ActorSystemDebugger_1.ActorSystemDebugger.RecordGetPut({
            ClassName: s.GetName(),
            GetOrPut: "Put",
            Hit: !1,
            HitRate: ActorSystem.HitRate,
            TimeStamp: new Date().getTime(),
            ThisTypeTotal: t ? t.Values.size : 0,
            CurrentTotal: ActorSystem.Size,
            PendingKillNum: ActorSystem.f6.length,
          }),
          ActorSystem.n6 += 1;
        ActorSystem.n6 > ActorSystem.s6 || ActorSystem.mp.Size > ActorSystem.s6;

      )
        ActorSystem._6();
      c?.Stop();
    } else UE.KuroActorManager.DestroyActor(r);
    return ActorSystem.p6.Stop(), !0;
  }
  static Clear() {
    (ActorSystem.n6 = 0),
      ActorSystem.mp.Clear(),
      ActorSystem.ve.clear(),
      ActorSystem.C6.clear(),
      (ActorSystem.h6 = 0),
      (ActorSystem.l6 = 0);
  }
  static SetBudget(t, e) {
    if ((ActorSystem.M6.Start(), !ActorSystem.c6(t)))
      return ActorSystem.M6.Stop(), !1;
    var r = ActorSystem.m6(ActorSystem.E6, t, "ActorSystem.SetBudget.");
    if ((r?.Start(), e < 0))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("ActorSystem", 1, "预算必须大于等于 0", [
            "ueClass",
            t,
          ]),
        r?.Stop(),
        ActorSystem.M6.Stop(),
        !1
      );
    ActorSystem.C6.set(t, e);
    t = ActorSystem.ve.get(t);
    return (
      t && ((t.Budget = e), ActorSystem.mp.Update(t)),
      r?.Stop(),
      ActorSystem.M6.Stop(),
      !0
    );
  }
  static c6(t) {
    return t
      ? !!t.IsValid() ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("ActorSystem", 1, "类无效"),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("ActorSystem", 1, "类不存在"),
        !1);
  }
  static _6() {
    var t,
      e,
      r,
      o = ActorSystem.mp.Top;
    return o
      ? (0 === (r = o.Values).size
          ? (ActorSystem.mp.Pop(), ActorSystem.ve.delete(o.Class))
          : ((t = r.keys().next().value),
            (e = r.values().next().value),
            r.delete(t),
            --ActorSystem.n6,
            o.Touch(),
            ActorSystem.mp.Update(o),
            t?.IsValid()
              ? (t.OnEndPlay.Remove(ActorSystem.hbn),
                ActorSystem.f6.push({
                  Actor: t,
                  Klass: t.GetClass().GetName(),
                  ReasonId: e,
                }))
              : (ActorSystem.pLe.delete(e), ActorSystem.Kml.delete(t)),
            Info_1.Info.IsBuildShipping ||
              ((r = UE.KismetSystemLibrary.IsValid(t)
                ? t.GetClass().GetName()
                : "InvalidClass"),
              ActorSystemDebugger_1.ActorSystemDebugger.RecordGetPut({
                ClassName: r,
                GetOrPut: "Evict",
                Hit: !1,
                TimeStamp: new Date().getTime(),
                ThisTypeTotal: 0,
                HitRate: ActorSystem.HitRate,
                CurrentTotal: ActorSystem.Size,
                PendingKillNum: ActorSystem.f6.length,
              }))),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("ActorSystem", 1, "队列为空"),
        !1);
  }
  static Spawn(t, e, r) {
    ActorSystem.S6.Start();
    var o = ActorSystem.m6(ActorSystem.y6, t, "ActorSystem.Spawn."),
      e =
        (o?.Start(),
        UE.KuroActorManager.D_SpawnActor(Info_1.Info.World, t, e, 1, r));
    return (
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        ActorSystemDebugger_1.ActorSystemDebugger.RecordGetPut({
          ClassName: t.GetName(),
          GetOrPut: "Spawn",
          Hit: !1,
          TimeStamp: new Date().getTime(),
          ThisTypeTotal: 0,
          HitRate: ActorSystem.HitRate,
          CurrentTotal: ActorSystem.Size,
          PendingKillNum: ActorSystem.f6.length,
        }),
      o?.Stop(),
      ActorSystem.S6.Stop(),
      e
    );
  }
  static g6(t, e, r) {
    ActorSystem.S6.Start();
    var o = ActorSystem.m6(ActorSystem.y6, t, "ActorSystem.SpawnAsPoolActor."),
      t =
        (o?.Start(),
        UE.KuroActorManager.D_SpawnActor(
          Info_1.Info.World,
          t,
          e,
          1,
          r,
          void 0,
          !0,
        ));
    return ActorSystem.uTn(t), o?.Stop(), ActorSystem.S6.Stop(), t;
  }
  static m6(e, r, o) {
    if (Stats_1.Stat.Enable) {
      let t = e.get(r);
      return (
        t ||
          ((t = Stats_1.Stat.CreateNoFlameGraph(o + r.GetName())), e.set(r, t)),
        t
      );
    }
  }
  static uTn(t) {
    var e, r;
    t?.IsValid()
      ? (t.OnDestroyed.Add(ActorSystem._Tn),
        (t = t.GetClass()),
        (r = (e = ActorSystem.cTn).get(t)),
        e.set(t, (r = r ? r + 1 : 1)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "ActorSystem",
            16,
            "增加类型引用计数",
            ["ueClass", t],
            ["newCount", r],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActorSystem",
          16,
          "增加类型引用计数 时错误, Actor非法",
        );
  }
  static mTn(t) {
    var e = ActorSystem.ve.get(t);
    (e && 0 < e.Values.size) ||
      ((e = ActorSystem.cTn.get(t)) && 0 < e) ||
      (UE.KuroActorManager.ResetClassPropertyCache(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ActorSystem", 16, "释放类型缓存", ["ueClass", t]));
  }
}
((exports.ActorSystem = ActorSystem).Enable = !0),
  (ActorSystem.State = 0),
  (ActorSystem.s6 = DEFAULT_CAPACITY),
  (ActorSystem.n6 = 0),
  (ActorSystem.mp = new PriorityQueue_1.PriorityQueue(Entry.Compare)),
  (ActorSystem.ve = new Map()),
  (ActorSystem.cTn = new Map()),
  (ActorSystem.C6 = new Map()),
  (ActorSystem.f6 = new Array()),
  (ActorSystem.pLe = new Map()),
  (ActorSystem.Kml = new Map()),
  (ActorSystem.a6 = 1 - 1 / ActorSystem.s6),
  (ActorSystem.h6 = 0),
  (ActorSystem.l6 = 0),
  (ActorSystem.iao = 0),
  (ActorSystem.u6 = Stats_1.Stat.Create("ActorSystem.Get")),
  (ActorSystem.p6 = Stats_1.Stat.Create("ActorSystem.Put")),
  (ActorSystem.S6 = Stats_1.Stat.Create("ActorSystem.Spawn")),
  (ActorSystem.I6 = Stats_1.Stat.Create("ActorSystem.Destroy")),
  (ActorSystem.M6 = Stats_1.Stat.Create("ActorSystem.SetBudget")),
  (ActorSystem.d6 = new WeakMap()),
  (ActorSystem.v6 = new WeakMap()),
  (ActorSystem.y6 = new WeakMap()),
  (ActorSystem.T6 = new WeakMap()),
  (ActorSystem.E6 = new WeakMap()),
  (ActorSystem.r6 = () => {
    for (ActorSystem.I6.Start(); ActorSystem.f6.length; ) {
      var t = ActorSystem.f6.pop(),
        e = t.Actor,
        r = ActorSystem.pLe.get(t.ReasonId);
      if (
        (ActorSystem.pLe.delete(t.ReasonId),
        ActorSystem.Kml.delete(e),
        e && e.IsValid())
      ) {
        var o = ActorSystem.m6(
          ActorSystem.T6,
          e.GetClass(),
          "ActorSystem.Destroy.",
        );
        o?.Start(),
          UE.KuroActorManager.DestroyActor(e),
          Info_1.Info.IsBuildShipping ||
            ActorSystemDebugger_1.ActorSystemDebugger.RecordGetPut({
              ClassName: t.Klass,
              GetOrPut: "Destroy",
              Hit: !1,
              TimeStamp: new Date().getTime(),
              ThisTypeTotal: 0,
              HitRate: ActorSystem.HitRate,
              CurrentTotal: ActorSystem.Size,
              PendingKillNum: ActorSystem.f6.length,
            }),
          o?.Stop();
        break;
      }
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ActorSystem",
          1,
          "Tick删除对象时对象非法",
          ["className", t.Klass],
          ["Reason", r],
        );
    }
    ActorSystem.I6.Stop();
  }),
  (ActorSystem.hbn = (t, e) => {
    let r = void 0;
    var o;
    switch (
      (t &&
        (o = ActorSystem.Kml.get(t)) &&
        ((r = ActorSystem.pLe.get(o)),
        ActorSystem.pLe.delete(o),
        ActorSystem.Kml.delete(t)),
      e)
    ) {
      case 2:
      case 4:
      case 1:
        return;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "RenderEffect",
        3,
        "ActorSystem的Actor意外删除",
        ["ActorName", t?.GetName()],
        ["EEndPlayReason", e],
        ["Reason", r],
      );
  }),
  (ActorSystem._Tn = (t) => {
    var e, r;
    t?.IsValid()
      ? (t.OnDestroyed.Remove(ActorSystem._Tn),
        (t = t.GetClass()),
        (r = (e = ActorSystem.cTn).get(t)) &&
          ((r = r - 1) <= 0 ? (e.delete(t), ActorSystem.mTn(t)) : e.set(t, r),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "ActorSystem",
            16,
            "减少类型引用计数",
            ["ueClass", t],
            ["newCount", r],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActorSystem",
          16,
          "减少类型引用计数 时错误, Actor非法",
        );
  });
//# sourceMappingURL=ActorSystem.js.map
