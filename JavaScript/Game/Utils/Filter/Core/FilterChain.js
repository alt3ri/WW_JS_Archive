"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterChain = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  Filter_1 = require("./Filter");
class FilterChain {
  constructor() {
    (this.AllTypeFilters = new Map()),
      (this.ykc = new Map()),
      (this.Skc = new Map()),
      (this.Mkc = new Set()),
      (this.Ekc = Stats_1.Stat.Create("FilterChain.AddTarget")),
      (this.Ikc = Stats_1.Stat.Create("FilterChain.AddFilter")),
      (this.Tkc = (t) => {
        var e = t,
          t =
            (e ||
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "FilterWithState",
                  72,
                  "[FilterChain] FilterCriteriaChanged",
                  ["AllTypeFilters", this.AllTypeFilters],
                )),
            this.Skc.get(e));
        this.Skc.set(e, new Set());
        for (const i of t) this.ykc.delete(i), this.AddTarget(i, e.FilterType);
      });
  }
  Init() {
    for (const t of Filter_1.filterTypePriority)
      this.AllTypeFilters.set(t, new Set());
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FilterCriteriaChanged,
      this.Tkc,
    ),
      (0, Filter_1.tryCatchWrapper)(
        this.OnInit.bind(this),
        "[FilterChain] OnInit执行出错",
        this.constructor.name,
      );
  }
  OnInit() {}
  Cleanup() {
    for (const t of this.AllTypeFilters.values()) {
      for (const e of t) e.Cleanup();
      t.clear();
    }
    this.AllTypeFilters.clear(),
      this.ykc.clear(),
      this.Skc.clear(),
      this.Mkc.clear(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FilterCriteriaChanged,
        this.Tkc,
      ),
      (0, Filter_1.tryCatchWrapper)(
        this.OnCleanup.bind(this),
        "[FilterChain] OnCleanup执行出错",
        this.constructor.name,
      );
  }
  OnCleanup() {}
  AddFilter(e) {
    if (this.Skc.has(e))
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "FilterWithState",
          72,
          "FilterChain中已经有了这个Filter，不需要重复添加",
          ["Filter", e],
        );
    else {
      this.AllTypeFilters.get(e.FilterType).add(e),
        this.Skc.set(e, new Set()),
        this.Ikc.Start();
      let t = e.FilterType + 1;
      for (; t < Filter_1.filterTypePriority.length; t++)
        for (const s of this.AllTypeFilters.get(
          Filter_1.filterTypePriority[t],
        )) {
          var i = this.Skc.get(s);
          for (const h of i) {
            var r = e.ExecuteCriteria(h);
            r === Filter_1.filterResult[e.FilterType] &&
              (i.delete(h),
              this.ykc.set(h, e),
              this.Skc.get(e).add(h),
              r ? this.bkc(h, !0) : this.bkc(h, !1));
          }
        }
      this.Ikc.Stop();
    }
  }
  RemoveFilter(t) {
    if (this.AllTypeFilters.get(t.FilterType)?.delete(t)) {
      var e = this.Skc.get(t);
      this.Skc.delete(t);
      for (const i of e)
        Filter_1.filterResult[t.FilterType] && this.bkc(i, !1),
          this.ykc.delete(i),
          this.AddTarget(i, t.FilterType);
      return !0;
    }
    return (
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "FilterWithState",
          72,
          "RemoveFilter失败",
          ["Filter", t],
          ["FilterType", t.FilterType],
          ["AllTypeFilters", this.AllTypeFilters],
          ["FilterChain", this],
        ),
      !1
    );
  }
  AddTarget(t, e = 0) {
    let i = !0,
      r = e;
    for (this.Ekc.Start(); r < Filter_1.filterTypePriority.length; r++) {
      for (const s of this.AllTypeFilters.get(r))
        (i = s.ExecuteCriteria(t)) === Filter_1.filterResult[s.FilterType] &&
          (this.ykc.set(t, s), this.Skc.get(s).add(t));
      if (this.ykc.has(t)) break;
    }
    return (
      this.Ekc.Stop(),
      i
        ? (this.bkc(t, !0), !0)
        : (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "FilterWithState",
              72,
              "FilterChain中的某个Normal Filter没有通过target筛选",
              ["Filter", this.ykc.get(t)],
              ["Target", t],
            ),
          !1)
    );
  }
  GetAllFilters() {
    var t = [];
    for (const e of this.AllTypeFilters.values()) t.push(...e);
    return t;
  }
  RemoveTarget(t) {
    let e = !1;
    var i;
    return (
      this.ykc.has(t) &&
        ((i = this.ykc.get(t)),
        this.Skc.get(i)?.delete(t) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "FilterWithState",
              72,
              "[FilterChain] RemoveTarget，FilterHoldTargets和TargetsWithFilter不匹配",
              ["Filter", i],
              ["Target", t],
              ["TargetsPassed", this.Mkc],
              ["TargetsWithFilter", this.ykc],
            )),
        (e = e || this.ykc.delete(t))),
      !!(e = e || this.bkc(t, !1)) ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "FilterWithState",
            72,
            "[FilterChain] RemoveTarget失败，没有这个Target",
            ["Target", t],
            ["TargetsPassed", this.Mkc],
            ["TargetsWithFilter", this.ykc],
          ),
        !1)
    );
  }
  OnPassedTargetModified(t, e) {}
  bkc(t, e) {
    if (e) {
      if (!this.Mkc.has(t))
        return this.Mkc.add(t), this.OnPassedTargetModified(t, !0), !0;
    } else if (this.Mkc.delete(t))
      return this.OnPassedTargetModified(t, !1), !0;
    return !1;
  }
}
exports.FilterChain = FilterChain;
//# sourceMappingURL=FilterChain.js.map
