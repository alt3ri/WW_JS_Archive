"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerExtraEffectManager =
    exports.ExtraEffectManager =
    exports.BaseExtraEffectManager =
      void 0);
const Stats_1 = require("../../../../../../../Core/Common/Stats"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  ExtraEffectDefine_1 = require("./ExtraEffectDefine"),
  ExtraEffectLibrary_1 = require("./ExtraEffectLibrary");
class BaseExtraEffectManager {
  constructor(t) {
    (this.BuffComponent = t),
      (this.EffectHolder = new Map()),
      (this.ActivatedHandles = new Set());
  }
  OnBuffAdded(t) {
    this.SXo(t) &&
      (t?.Config
        ? t.IsActive() && this.CreateBuffEffects(t)
        : CombatLog_1.CombatLog.Error(
            "Buff",
            this.BuffComponent?.Entity,
            "正在添加的buff额外效果未加载对应的buffRef",
            ["buffId", t?.Id],
            ["handle", t?.Handle],
            ["持有者", t?.GetOwnerDebugName()],
          ));
  }
  OnBuffRemoved(t, e) {
    var f = t.Handle;
    this.SXo(t) && t.IsActive() && this.RemoveBuffEffects(f, e);
  }
  OnStackIncreased(t, e, f, a) {
    if (this.SXo(t))
      for (const r of this.GetEffectsByHandle(t.Handle))
        r.OnStackIncreased(e, f, a);
  }
  OnStackDecreased(t, e, f, a) {
    if (this.SXo(t))
      for (const r of this.GetEffectsByHandle(t.Handle))
        r.OnStackDecreased(e, f, a);
  }
  OnBuffInhibitedChanged(t, e) {
    var f = t.Handle;
    this.SXo(t) &&
      (e ? this.RemoveBuffEffects(f, !0) : this.CreateBuffEffects(t));
  }
  SXo(t) {
    var e = t?.Config;
    return e
      ? !!e.HasBuffEffect
      : (CombatLog_1.CombatLog.Error(
          "Buff",
          this.BuffComponent?.Entity,
          "处理buff额外效果逻辑时找不到对应的buffRef",
          ["buffId", t?.Id],
          ["handleId", t?.Handle],
          ["持有者", t?.GetOwnerDebugName()],
        ),
        !1);
  }
  CreateBuffEffects(e) {
    var f = e.Handle;
    const a = e.Id;
    if (this.ActivatedHandles.has(f))
      CombatLog_1.CombatLog.Error(
        "Buff",
        this.BuffComponent?.Entity,
        "重复创建Buff额外效果",
        ["buffId", a],
        ["handle", f],
      );
    else {
      var r = e.GetInstigatorBuffComponent(),
        s =
          (this.ActivatedHandles.add(f),
          e.Config.EffectInfos?.map((t) => [
            t,
            ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(
              a,
              t,
              e.Level,
            ),
          ])),
        t = this.BuffComponent;
      if (s && t?.Valid)
        for (let t = 0; t < s.length; t++) {
          var i = s[t][0],
            o = s[t][1],
            n = i.ExtraEffectId,
            n = (0, ExtraEffectDefine_1.getBuffEffectClass)(n);
          n &&
            ((n = n.Create(f, t, o, this.BuffComponent, r, i)),
            this.qp(n),
            n.OnCreated());
        }
    }
  }
  RemoveBuffEffects(t, e) {
    this.ActivatedHandles.has(t) ||
      CombatLog_1.CombatLog.Warn(
        "Buff",
        this.BuffComponent?.Entity,
        "尝试移除不存在的buff额外效果实例",
        ["handleId", t],
        ["entity", this.BuffComponent?.Entity?.Id],
      ),
      this.ActivatedHandles.delete(t);
    for (const f of this.GetEffectsByHandle(t)) f.OnRemoved(e);
    this.EffectHolder.delete(t);
  }
  qp(e) {
    var t,
      f = e.ActiveHandleId;
    f < 0
      ? CombatLog_1.CombatLog.Warn(
          "Buff",
          this.BuffComponent?.Entity,
          "invalid handleId when trying to add effect in holder.",
          ["handle", f],
        )
      : (this.EffectHolder.has(f) || this.EffectHolder.set(f, []),
        (t = this.EffectHolder.get(f)).some((t) => t === e)
          ? CombatLog_1.CombatLog.Warn(
              "Buff",
              this.BuffComponent?.Entity,
              "duplicated handle when trying to add ExtraEffect.",
              ["handle", f],
            )
          : t.push(e));
  }
  Clear() {
    this.EffectHolder.clear(), this.ActivatedHandles.clear();
  }
  *FilterById(t, e) {
    var f = [];
    if (t instanceof Array)
      for (const r of t) {
        var a = (0, ExtraEffectDefine_1.getBuffEffectClass)(r);
        a && f.push(a);
      }
    else {
      t = (0, ExtraEffectDefine_1.getBuffEffectClass)(t);
      t && f.push(t);
    }
    if (0 <= f.length)
      for (const s of this.EffectHolder.values())
        if (s)
          for (const i of s)
            for (const o of f)
              if (i instanceof o && (!e || e(i))) {
                yield i;
                break;
              }
  }
  *GetAllEffects() {
    for (const t of this.EffectHolder.values())
      if (t) for (const e of t) yield e;
  }
  GetEffectsByHandle(t) {
    return this.EffectHolder.get(t)?.values() ?? [];
  }
}
class ExtraEffectManager extends (exports.BaseExtraEffectManager =
  BaseExtraEffectManager) {}
exports.ExtraEffectManager = ExtraEffectManager;
class PlayerExtraEffectManager extends BaseExtraEffectManager {}
exports.PlayerExtraEffectManager = PlayerExtraEffectManager;
//# sourceMappingURL=ExtraEffectManager.js.map
