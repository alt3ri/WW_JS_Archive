"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EventSystem = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Event_1 = require("../../../Core/Event/Event"),
  EventDefine_1 = require("./EventDefine");
class EventSystem {
  static Has(e, t) {
    return EventSystem.Me.Has(e, t);
  }
  static HasWithTarget(e, t, r) {
    e = EventSystem.hde(e);
    return !!e && e.Has(t, r);
  }
  static Add(e, t) {
    return EventSystem.Me.Add(e, t);
  }
  static AddWithTargetUseHoldKey(e, t, r, n) {
    var s = EventSystem.lde(t);
    if (!s.Add(r, n)) return !1;
    let v = EventSystem.OJa.get(e);
    return (
      v || ((v = new Array()), EventSystem.OJa.set(e, v)),
      s.AddHoldKeyHandle(r, e, n),
      v.push({ Key: e, Handle: n, Target: t, EventName: r }),
      !0
    );
  }
  static AddWithTarget(e, t, r) {
    return EventSystem.lde(e).Add(t, r);
  }
  static Once(e, t) {
    return EventSystem.Me.Once(e, t);
  }
  static OnceWithTarget(e, t, r) {
    return EventSystem.lde(e).Once(t, r);
  }
  static Remove(e, t) {
    return EventSystem.Me.Remove(e, t);
  }
  static RemoveWithTarget(e, t, r) {
    var n = EventSystem.hde(e);
    if (n) {
      if (Info_1.Info.IsBuildDevelopmentOrDebug) {
        var s = n.GetHoldKeyByHandle(t, r);
        if (s)
          return (
            EventSystem.GJa(s, e, t, r),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Event",
                67,
                "事件系统调用错误,请使用[RemoveWithTargetUseKey]",
                ["target", e],
              ),
            !0
          );
      }
      return n.Remove(t, r);
    }
    return !1;
  }
  static GJa(t, r, n, s) {
    EventSystem.kJa.Start();
    var v = EventSystem.OJa.get(t);
    if (v) {
      var a = v.length;
      for (let e = 0; e < a; ++e) {
        var i = v[e];
        if (i.Handle === s && i.EventName === n && i.Target === r)
          return (
            v.splice(e, 1),
            (i = EventSystem.hde(r)) &&
              (i.Remove(n, s), i.RemoveHoldKeyHandle(n, s)),
            0 === v.length && EventSystem.OJa.delete(t),
            EventSystem.kJa.Stop(),
            !0
          );
      }
    }
    return EventSystem.kJa.Stop(), !1;
  }
  static RemoveWithTargetUseKey(e, t, r, n) {
    return EventSystem.GJa(e, t, r, n);
  }
  static RemoveAllTargetUseKey(e) {
    var t = EventSystem.OJa.get(e);
    if (!t) return !1;
    var r = t.length;
    for (let e = 0; e < r; ++e) {
      var n = t[e],
        s = EventSystem.hde(n.Target);
      s &&
        (s.Remove(n.EventName, n.Handle),
        s.RemoveHoldKeyHandle(n.EventName, n.Handle));
    }
    return EventSystem.OJa.delete(e), !0;
  }
  static Emit(e, ...t) {
    return EventSystem.Me.Emit(e, ...t);
  }
  static EmitWithTarget(e, t, ...r) {
    return EventSystem.hde(e)?.Emit(t, ...r) ?? !1;
  }
  static EmitWithTargets(e, t, ...r) {
    if (e && !(e.length <= 0))
      for (const n of e) EventSystem.hde(n)?.Emit(t, ...r);
  }
  static hde(e) {
    if (e) return EventSystem._de.get(e);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Event", 1, "事件系统目标不存在，请检查目标", [
        "target",
        e,
      ]);
  }
  static lde(e) {
    let t = EventSystem.hde(e);
    return (
      t ||
        ((t = new Event_1.Event(EventDefine_1.EEventName)),
        EventSystem._de.set(e, t)),
      t
    );
  }
}
((exports.EventSystem = EventSystem).Me = new Event_1.Event(
  EventDefine_1.EEventName,
)),
  (EventSystem._de = new WeakMap()),
  (EventSystem.OJa = new WeakMap()),
  (EventSystem.kJa = Stats_1.Stat.Create("EventSystem.RemoveWithTargetUseKey"));
//# sourceMappingURL=EventSystem.js.map
