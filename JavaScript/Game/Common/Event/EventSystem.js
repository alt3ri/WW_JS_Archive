"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EventSystem = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Event_1 = require("../../../Core/Event/Event");
const EventDefine_1 = require("./EventDefine");
class EventSystem {
  static Has(t, e) {
    return EventSystem.Me.Has(t, e);
  }
  static HasWithTarget(t, e, n) {
    t = EventSystem.hde(t);
    return !!t && t.Has(e, n);
  }
  static Add(t, e) {
    return EventSystem.Me.Add(t, e);
  }
  static AddWithTarget(t, e, n) {
    return EventSystem.lde(t).Add(e, n);
  }
  static Once(t, e) {
    return EventSystem.Me.Once(t, e);
  }
  static OnceWithTarget(t, e, n) {
    return EventSystem.lde(t).Once(e, n);
  }
  static Remove(t, e) {
    return EventSystem.Me.Remove(t, e);
  }
  static RemoveWithTarget(t, e, n) {
    return EventSystem.hde(t)?.Remove(e, n) ?? !1;
  }
  static Emit(t, ...e) {
    return EventSystem.Me.Emit(t, ...e);
  }
  static EmitWithTarget(t, e, ...n) {
    return EventSystem.hde(t)?.Emit(e, ...n) ?? !1;
  }
  static EmitWithTargets(t, e, ...n) {
    if (t && !(t.length <= 0))
      for (const r of t) EventSystem.hde(r)?.Emit(e, ...n);
  }
  static hde(t) {
    if (t) return EventSystem._de.get(t);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Event", 1, "事件系统目标不存在，请检查目标", [
        "target",
        t,
      ]);
  }
  static lde(t) {
    let e = EventSystem.hde(t);
    return (
      e ||
        ((e = new Event_1.Event(EventDefine_1.EEventName)),
        EventSystem._de.set(t, e)),
      e
    );
  }
}
((exports.EventSystem = EventSystem).Me = new Event_1.Event(
  EventDefine_1.EEventName,
)),
  (EventSystem._de = new WeakMap());
// # sourceMappingURL=EventSystem.js.map
