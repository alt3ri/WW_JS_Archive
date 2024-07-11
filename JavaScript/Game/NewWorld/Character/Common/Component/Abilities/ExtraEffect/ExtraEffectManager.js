"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, f, a) {
    var r,
      s = arguments.length,
      i =
        s < 3
          ? t
          : null === a
            ? (a = Object.getOwnPropertyDescriptor(t, f))
            : a;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(e, t, f, a);
    else
      for (var c = e.length - 1; 0 <= c; c--)
        (r = e[c]) && (i = (s < 3 ? r(i) : 3 < s ? r(t, f, i) : r(t, f)) || i);
    return 3 < s && i && Object.defineProperty(t, f, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerExtraEffectManager =
    exports.ExtraEffectManager =
    exports.BaseExtraEffectManager =
      void 0);
const Stats_1 = require("../../../../../../../Core/Common/Stats"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  ExtraEffectLibrary_1 = require("./ExtraEffectLibrary");
class BaseExtraEffectManager {
  constructor(e) {
    (this.BuffComponent = e),
      (this.EffectHolder = new Map()),
      (this.ActivatedHandles = new Set());
  }
  static IsInitExecution(e) {
    switch (e) {
      case 24:
      case 52:
        return !0;
      default:
        return !1;
    }
  }
  static IsPeriodExecution(e) {
    switch (e) {
      case 28:
      case 29:
      case 102:
      case 34:
      case 26:
      case 4:
      case 5:
      case 30:
      case 48:
      case 13:
      case 101:
        return !0;
      default:
        return !1;
    }
  }
  OnBuffAdded(e) {
    var t;
    this.SXo(e) &&
      ((t = e?.Config)
        ? t.HasBuffEffect && e.IsActive() && this.CreateBuffEffects(e)
        : CombatLog_1.CombatLog.Error(
            "Buff",
            this.BuffComponent?.Entity,
            "正在添加的buff额外效果未加载对应的buffRef",
            ["buffId", e?.Id],
            ["handle", e?.Handle],
            ["持有者", e?.GetOwnerDebugName()],
          ));
  }
  OnBuffRemoved(e, t) {
    var f = e.Handle;
    this.SXo(e) && e.IsActive() && this.RemoveBuffEffects(f, t);
  }
  OnStackIncreased(e, t, f, a) {
    if (this.SXo(e))
      for (const r of this.GetEffectsByHandle(e.Handle))
        r.OnStackIncreased(t, f, a);
  }
  OnStackDecreased(e, t, f, a) {
    if (this.SXo(e))
      for (const r of this.GetEffectsByHandle(e.Handle))
        r.OnStackDecreased(t, f, a);
  }
  OnBuffInhibitedChanged(e, t) {
    var f = e.Handle;
    this.SXo(e) &&
      (t ? this.RemoveBuffEffects(f, !0) : this.CreateBuffEffects(e));
  }
  SXo(e) {
    var t = e?.Config;
    return t
      ? !!t.HasBuffEffect
      : (CombatLog_1.CombatLog.Error(
          "Buff",
          this.BuffComponent?.Entity,
          "处理buff额外效果逻辑时找不到对应的buffRef",
          ["buffId", e?.Id],
          ["handleId", e?.Handle],
          ["持有者", e?.GetOwnerDebugName()],
        ),
        !1);
  }
  CreateBuffEffects(t) {
    var f = t.Handle;
    const a = t.Id;
    if (this.ActivatedHandles.has(f))
      CombatLog_1.CombatLog.Error(
        "Buff",
        this.BuffComponent?.Entity,
        "重复创建Buff额外效果",
        ["buffId", a],
        ["handle", f],
      );
    else {
      var r = t.GetInstigatorBuffComponent(),
        s =
          (this.ActivatedHandles.add(f),
          t.Config.EffectInfos?.map((e) => [
            e,
            ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(
              a,
              e,
              t.Level,
            ),
          ])),
        e = this.BuffComponent;
      if (s && e?.Valid)
        for (let e = 0; e < s.length; e++) {
          var i = s[e][0],
            c = s[e][1],
            o = i.ExtraEffectId;
          ExtraEffectManager.IsInitExecution(o) ||
            ExtraEffectManager.IsPeriodExecution(o) ||
            ((o = require("./ExtraEffectDefine")?.getBuffEffectClass(o)) &&
              ((o = o.Create(f, e, c, this.BuffComponent, r, i)),
              this.qp(o),
              o.OnCreated()));
        }
    }
  }
  RemoveBuffEffects(e, t) {
    this.ActivatedHandles.has(e) ||
      CombatLog_1.CombatLog.Warn(
        "Buff",
        this.BuffComponent?.Entity,
        "尝试移除不存在的buff额外效果实例",
        ["handleId", e],
        ["entity", this.BuffComponent?.Entity?.Id],
      ),
      this.ActivatedHandles.delete(e);
    for (const f of this.GetEffectsByHandle(e)) f.OnRemoved(t);
    this.EffectHolder.delete(e);
  }
  ApplyPeriodBuffExecution(e) {
    for (const t of e.Config.EffectInfos)
      ExtraEffectManager.IsPeriodExecution(t.ExtraEffectId) &&
        t.ExecutionEffect?.TryExecute(e);
  }
  ApplyInitBuffExecution(e, t) {
    for (const f of e.Config.EffectInfos)
      ExtraEffectManager.IsInitExecution(f.ExtraEffectId) &&
        f.ExecutionEffect?.TryExecute(e, t);
  }
  qp(t) {
    var e,
      f = t.ActiveHandleId;
    f < 0
      ? CombatLog_1.CombatLog.Warn(
          "Buff",
          this.BuffComponent?.Entity,
          "invalid handleId when trying to add effect in holder.",
          ["handle", f],
        )
      : (this.EffectHolder.has(f) || this.EffectHolder.set(f, []),
        (e = this.EffectHolder.get(f)).some((e) => e === t)
          ? CombatLog_1.CombatLog.Warn(
              "Buff",
              this.BuffComponent?.Entity,
              "duplicated handle when trying to add ExtraEffect.",
              ["handle", f],
            )
          : e.push(t));
  }
  Clear() {
    this.EffectHolder.clear(), this.ActivatedHandles.clear();
  }
  *FilterById(e, t) {
    var f = [];
    if (e instanceof Array)
      for (const r of e) {
        var a = require("./ExtraEffectDefine")?.getBuffEffectClass(r);
        a && f.push(a);
      }
    else {
      e = require("./ExtraEffectDefine")?.getBuffEffectClass(e);
      e && f.push(e);
    }
    if (0 <= f.length)
      for (const s of this.EffectHolder.values())
        if (s)
          for (const i of s)
            for (const c of f)
              if (i instanceof c && (!t || t(i))) {
                yield i;
                break;
              }
  }
  *GetAllEffects() {
    for (const e of this.EffectHolder.values())
      if (e) for (const t of e) yield t;
  }
  GetEffectsByHandle(e) {
    return this.EffectHolder.get(e)?.values() ?? [];
  }
}
__decorate(
  [(0, Stats_1.statDecorator)("BuffEffect.CreateBuffEffects")],
  BaseExtraEffectManager.prototype,
  "CreateBuffEffects",
  null,
),
  __decorate(
    [(0, Stats_1.statDecorator)("BuffEffect.RemoveBuffEffects")],
    BaseExtraEffectManager.prototype,
    "RemoveBuffEffects",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("BuffEffect.ApplyPeriodBuffExecution")],
    BaseExtraEffectManager.prototype,
    "ApplyPeriodBuffExecution",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("BuffEffect.ApplyInitBuffExecution")],
    BaseExtraEffectManager.prototype,
    "ApplyInitBuffExecution",
    null,
  );
class ExtraEffectManager extends (exports.BaseExtraEffectManager =
  BaseExtraEffectManager) {}
exports.ExtraEffectManager = ExtraEffectManager;
class PlayerExtraEffectManager extends BaseExtraEffectManager {}
exports.PlayerExtraEffectManager = PlayerExtraEffectManager;
//# sourceMappingURL=ExtraEffectManager.js.map
