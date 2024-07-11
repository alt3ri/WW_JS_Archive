"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectProfiler = void 0);
const cpp_1 = require("cpp");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
class EffectProfiler {
  static SetEnable(t) {
    this.Vge = t;
  }
  static NoticeCreatedFromLru(t, e) {
    let r;
    this.Vge &&
      ((r = this.Hge.get(t)) ? this.Hge.set(t, r + 1) : this.Hge.set(t, 1),
      (r = this.jge.get(t))
        ? r.push(new WeakRef(e))
        : this.jge.set(t, [new WeakRef(e)]));
  }
  static NoticeUsed(t) {
    let e, r;
    this.Vge &&
      ((e = t.Path),
      (r = this.Wge.get(e)) ? this.Wge.set(e, r + 1) : this.Wge.set(e, 1),
      this.Kge.set(t, void 0),
      this.Qge.set(t, cpp_1.KuroTime.GetMilliseconds64()));
  }
  static NoticeAddedToLru(r) {
    if (this.Vge) {
      const i = r.Path;
      var o = this.Xge.get(i);
      var o =
        (o ? this.Xge.set(i, o + 1) : this.Xge.set(i, 1),
        this.Kge.delete(r),
        cpp_1.KuroTime.GetMilliseconds64() - this.Qge.get(r));
      let e = this.$ge.get(i);
      if (
        (e || ((e = []), this.$ge.set(i, e)),
        e.length > 0 && !i.includes("DA_Fx_Group_WeaponEnd"))
      ) {
        let t = 0;
        for (const s of e) t += s;
        o >= 1.5 * (t /= e.length) &&
          ((r = this.Yge(i)), Log_1.Log.CheckError()) &&
          Log_1.Log.Error(
            "RenderEffect",
            25,
            "[EffectProfiler] 回池间隔时间过长",
            ["Path", r],
            ["CurrentUsedTime", o],
            ["HistoryUsedAverageTiming", t],
          );
      }
      if (e.length === 10) {
        for (let t = 0; t < e.length - 1; t++) e[t] = e[t + 1];
        e[e.length - 1] = o;
      } else e.push(o);
    }
  }
  static NoticeRemovedFromLru(t, e) {
    let r;
    this.Vge &&
      ((r = this.Xge.get(t)),
      this.Xge.set(t, r - 1),
      (r = this.Jge.get(t)) ? r.push(e) : this.Jge.set(t, [e]));
  }
  static LogReasonHistoryAndNum(t, e, r) {
    if (this.Vge) {
      const i = t.Path;
      const o = this.Yge(i);
      const s = this.Hge.get(i);
      const f = this.Wge.get(i);
      const a = this.Xge.get(i);
      if (f && f > 1)
        if (a >= 1) {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              25,
              "[EffectProfiler] Error, LogReasonHistoryAndNum",
              ["Path", o],
              ["HistoryUsedCount", f],
              ["CreatedCount", s],
              ["CurrentCountInLru", a],
              ["LruSize", e],
              ["LruHitRate", r],
              ["ReasonHistory", this.Jge.get(i)?.join(",")],
            );
          for (const c of this.jge.get(i).values()) {
            let n = c.deref();
            n &&
              n !== t &&
              (n = this.Kge.get(n)) &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderEffect",
                25,
                "[EffectProfiler] Error, Show stack",
                ["Stack", n],
              );
          }
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "RenderEffect",
              25,
              "[EffectProfiler] Warn, LogReasonHistoryAndNum",
              ["Path", o],
              ["HistoryUsedCount", f],
              ["CreatedCount", s],
              ["CurrentCountInLru", a],
              ["LruSize", e],
              ["LruHitRate", r],
              ["ReasonHistory", this.Jge.get(i)?.join(",")],
            );
    }
  }
  static Yge(t) {
    let e = t.replace("/Game/Aki/Effect", "");
    t = e.indexOf(".");
    return (e = t >= 0 ? e.substring(0, t) : e);
  }
}
((exports.EffectProfiler = EffectProfiler).Vge = !1),
  (EffectProfiler.Hge = new Map()),
  (EffectProfiler.Wge = new Map()),
  (EffectProfiler.Xge = new Map()),
  (EffectProfiler.Jge = new Map()),
  (EffectProfiler.Qge = new WeakMap()),
  (EffectProfiler.$ge = new Map()),
  (EffectProfiler.jge = new Map()),
  (EffectProfiler.Kge = new WeakMap());
// # sourceMappingURL=EffectProfiler.js.map
