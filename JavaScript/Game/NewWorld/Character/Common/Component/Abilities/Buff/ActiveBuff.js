"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    let r;
    const h = arguments.length;
    let a =
      h < 3 ? i : s === null ? (s = Object.getOwnPropertyDescriptor(i, e)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(t, i, e, s);
    else
      for (let f = t.length - 1; f >= 0; f--)
        (r = t[f]) && (a = (h < 3 ? r(a) : h > 3 ? r(i, e, a) : r(i, e)) || a);
    return h > 3 && a && Object.defineProperty(i, e, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActiveBuffInternal = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ActiveBuffConfigs_1 = require("./ActiveBuffConfigs");
const MAX_POOL_COUNT = 100;
class ActiveBuffInternal {
  constructor(t) {
    (this.TAe = t),
      (this.rKo = ActiveBuffConfigs_1.INVALID_BUFF_HANDLE),
      (this.PreMessageId = void 0),
      (this.MessageId = -1n),
      (this.nKo = ""),
      (this.sKo = void 0),
      (this.InstigatorIdInternal = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID),
      (this.aKo = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID),
      (this.DurationTimer = void 0),
      (this.LVo = 1),
      (this.hKo = void 0),
      (this.CB = 0),
      (this.lKo = 0),
      (this._Ko = 1),
      (this.uKo = !1),
      (this.cKo = 0),
      (this.mKo = 0),
      (this.PeriodInternal = 0),
      (this.dKo = void 0),
      (this.CKo = void 0),
      (this.gKo = !1),
      (this.StackCountInternal = 0),
      (this.jqi = 0),
      (this.fKo = []),
      (this.StateModifiers = []);
  }
  static AllocBuff(...t) {
    let i = this.BuffPool.pop();
    return (i = i || new ActiveBuffInternal(t[0])).AU(...t), i;
  }
  static ReleaseBuff(t) {
    t?.IsValid() && t.Destroy(),
      t && this.BuffPool.length < MAX_POOL_COUNT && this.BuffPool.push(t);
  }
  AU(t, i, e, s, r, h, a, f, o, n) {
    (this.TAe = t),
      (this.rKo = i),
      (this.InstigatorIdInternal = e ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID),
      (this.sKo = s),
      (this.nKo = s?.GetDebugName() ?? "unknown"),
      (this.aKo = r),
      (this.MessageId =
        a ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      (this.PreMessageId = h),
      (this.jqi = f),
      (this.StackCountInternal = o),
      (this.gKo = !1),
      (this.uKo = !1),
      this.SetDuration(n),
      this.SetPeriod(t.Period);
    for (const _ of this.Config.Modifiers) {
      const u = _.AttributeId;
      CharacterAttributeTypes_1.stateAttributeIds.has(u)
        ? this.SetStateModifier(_)
        : this.SetNonStateModifier(_);
    }
    return this;
  }
  Destroy() {
    if (this.IsActive()) {
      const i = this.GetOwnerBuffComponent()
        ?.GetExactEntity()
        ?.CheckGetComponent(185);
      i?.Valid &&
        this.Config.GrantedTags?.forEach((t) => {
          i.TagContainer.UpdateExactTag(2, t, -this.StackCount);
        });
    }
    (this.uKo = !0),
      this.pKo(),
      this.vKo(),
      this.ClearModifiers(),
      (this.StackCountInternal = 0);
  }
  IsValid() {
    return (
      !this.uKo && (this.GetOwnerBuffComponent()?.GetExactEntity()?.Valid ?? !1)
    );
  }
  get Config() {
    return this.TAe;
  }
  get Handle() {
    return this.rKo;
  }
  GetOwner() {
    return this.sKo?.Entity;
  }
  GetOwnerDebugName() {
    return this.nKo;
  }
  GetOwnerBuffComponent() {
    return this.sKo;
  }
  get InstigatorId() {
    return this.InstigatorIdInternal;
  }
  GetInstigator() {
    return this.InstigatorId
      ? ModelManager_1.ModelManager.CreatureModel.GetEntity(this.InstigatorId)
          ?.Entity
      : void 0;
  }
  GetInstigatorBuffComponent() {
    if (this.InstigatorId)
      return ModelManager_1.ModelManager.CreatureModel.GetEntity(
        this.InstigatorId,
      )?.Entity?.GetComponent(157);
  }
  GetInstigatorActorComponent() {
    if (this.InstigatorId)
      return ModelManager_1.ModelManager.CreatureModel.GetEntity(
        this.InstigatorId,
      )?.Entity?.GetComponent(3);
  }
  GetInstigatorAttributeSet() {
    if (this.InstigatorId)
      return ModelManager_1.ModelManager.CreatureModel.GetEntity(
        this.InstigatorId,
      )?.Entity?.GetComponent(156);
  }
  GetOwnerAttributeSet() {
    return this.sKo?.GetEntity()?.GetComponent(156);
  }
  get Id() {
    return this.Config.Id;
  }
  get ServerId() {
    return this.aKo;
  }
  IsInstantBuff() {
    return this.Config.DurationPolicy === 0;
  }
  get Duration() {
    return this.LVo;
  }
  pKo() {
    void 0 !== this.DurationTimer &&
      (TimerSystem_1.TimerSystem.Has(this.DurationTimer) &&
        TimerSystem_1.TimerSystem.Remove(this.DurationTimer),
      (this.DurationTimer = void 0));
  }
  MKo(t) {
    this.pKo(),
      this.LVo <= 0 ||
        ((this.lKo = t),
        (this.CB = this.GetCurrentTime()),
        this._Ko >= 0 &&
          ((t =
            (this.lKo / this._Ko) * CommonDefine_1.MILLIONSECOND_PER_SECOND),
          (this.DurationTimer =
            t >= TimerSystem_1.MIN_TIME
              ? TimerSystem_1.TimerSystem.Delay(
                  this.DurationCallback.bind(this),
                  t,
                  this.hKo,
                )
              : TimerSystem_1.TimerSystem.Next(
                  this.DurationCallback.bind(this),
                  this.hKo,
                ))));
  }
  GetCurrentTime() {
    return Time_1.Time.WorldTime;
  }
  SetDuration(t = void 0) {
    let i;
    let e;
    let s;
    let r = this.Config;
    let h = ActiveBuffConfigs_1.MIN_BUFF_PERIOD;
    (h =
      r.DurationPolicy === 1
        ? -1
        : void 0 !== t
          ? t
          : r.DurationMagnitude.length === 0 ||
              r.DurationCalculationPolicy.length === 0
            ? (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Character",
                  20,
                  "Buff 配置为hasDuration 但未配置DurationMagnitude或DurationCalculationPolicy, 强制将时间设为" +
                    ActiveBuffConfigs_1.MIN_BUFF_PERIOD,
                  ["BuffId", this.Id],
                ),
              ActiveBuffConfigs_1.MIN_BUFF_PERIOD)
            : ((t = AbilityUtils_1.AbilityUtils.GetLevelValue(
                this.Config.DurationMagnitude,
                this.Level,
                0,
              )),
              (i = r.DurationCalculationPolicy)[0] === 1
                ? i.length < 4
                  ? (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Character",
                        20,
                        "Buff 配置为hasDuration 但未配置DurationMagnitude或DurationCalculationPolicy, 将被重设为" +
                          ActiveBuffConfigs_1.MIN_BUFF_PERIOD,
                        ["BuffId", this.Id],
                        ["handle", this.Handle],
                        ["持有者", this.sKo?.GetDebugName()],
                        ["释放者", this.InstigatorId],
                      ),
                    ActiveBuffConfigs_1.MIN_BUFF_PERIOD)
                  : ((r = AbilityUtils_1.AbilityUtils.GetLevelValue(
                      r.DurationMagnitude2,
                      this.Level,
                      0,
                    )),
                    ([, i, s, e] = i),
                    (s =
                      s === 1
                        ? this.GetInstigatorAttributeSet()
                        : this.GetOwnerAttributeSet())
                      ? ((s = AbilityUtils_1.AbilityUtils.GetAttrValue(
                          s,
                          i,
                          e,
                        )),
                        Math.max(
                          s *
                            t *
                            CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
                            r,
                          ActiveBuffConfigs_1.MIN_BUFF_PERIOD,
                        ))
                      : (Log_1.Log.CheckError() &&
                          Log_1.Log.Error(
                            "Character",
                            20,
                            "Buff 找不到周期计算属性来源, 周期将被重设为" +
                              ActiveBuffConfigs_1.MIN_BUFF_PERIOD,
                            ["BuffId", this.Id],
                            ["handle", this.Handle],
                            ["持有者", this.sKo?.GetDebugName()],
                            ["释放者", this.InstigatorId],
                          ),
                        ActiveBuffConfigs_1.MIN_BUFF_PERIOD))
                : t)),
      (this.LVo = h),
      this.MKo(h);
  }
  SetRemainDuration(t) {
    this.Config.DurationPolicy === 2 &&
      this.MKo(t > 0 ? t : ActiveBuffConfigs_1.MIN_BUFF_PERIOD);
  }
  GetRemainDuration() {
    if (!this.IsValid()) return 0;
    switch (this.Config?.DurationPolicy) {
      case 1:
        return ActiveBuffConfigs_1.INFINITY_DURATION;
      case 0:
        return 0;
      default:
        var t =
          ((this.GetCurrentTime() - this.CB) * this._Ko) /
          CommonDefine_1.MILLIONSECOND_PER_SECOND;
        return this.LVo < 0
          ? ActiveBuffConfigs_1.INFINITY_DURATION
          : Math.max(this.lKo - t, 0);
    }
  }
  SetPeriod(t = void 0) {
    return (
      (this.PeriodInternal = void 0 !== t ? t : this.Config.Period),
      this.PeriodInternal > 0 &&
        (this.Config.HasBuffPeriodExecution
          ? this.PeriodInternal <
              ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD &&
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                20,
                `目前限制带周期型额外效果的Buff周期最短为${ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD}，配置周期${this.PeriodInternal}，已强制修改周期`,
                ["BuffId", this.Id],
              ),
            (this.PeriodInternal =
              ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD))
          : this.PeriodInternal < ActiveBuffConfigs_1.MIN_BUFF_PERIOD &&
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                20,
                `目前限制Buff周期最短为${ActiveBuffConfigs_1.MIN_BUFF_PERIOD}，配置周期${this.PeriodInternal}，已强制修改周期`,
                ["BuffId", this.Id],
              ),
            (this.PeriodInternal = ActiveBuffConfigs_1.MIN_BUFF_PERIOD))),
      this.ResetPeriodTimer(this.PeriodInternal),
      !0
    );
  }
  get Period() {
    return this.PeriodInternal;
  }
  OnTimeScaleChanged(t, i) {
    let e;
    i
      ? (t = 0)
      : this.Config.DurationAffectedByBulletTime
        ? this.Config.EffectInfos.some(
            (t) =>
              t.ExtraEffectId === 4 ||
              t.ExtraEffectId === 5 ||
              t.ExtraEffectId === 17,
          ) &&
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Battle",
              20,
              "带额外效果4、5、17的buff不应受子弹顿帧影响",
              ["buffId", this.Id],
            ),
          (t = this.GetOwner()?.TimeDilation ?? 1))
        : (t = this.GetOwner()?.TimeDilation ?? 1),
      t !== this._Ko &&
        ((i = this.GetCurrentTime()),
        (e = this._Ko),
        (this._Ko = t),
        this.LVo > 0 &&
          ((t = ((i - this.CB) * e) / CommonDefine_1.MILLIONSECOND_PER_SECOND),
          (t = this.lKo - t),
          this.MKo(t)),
        this.PeriodInternal > 0) &&
        ((t = ((i - this.cKo) * e) / CommonDefine_1.MILLIONSECOND_PER_SECOND),
        (i = this.mKo - t),
        this.ResetPeriodTimer(i));
  }
  DurationCallback() {
    let t;
    this.IsValid() &&
      (t = this.GetOwnerBuffComponent()) &&
      t.RemoveBuffWhenTimeout(this);
  }
  vKo() {
    void 0 !== this.dKo &&
      (TimerSystem_1.TimerSystem.Has(this.dKo) &&
        TimerSystem_1.TimerSystem.Remove(this.dKo),
      (this.dKo = void 0));
  }
  ResetPeriodTimer(t) {
    this.vKo(),
      this.PeriodInternal <= 0 ||
        ((this.mKo = t),
        (this.cKo = this.GetCurrentTime()),
        this._Ko > 0 &&
          ((t =
            (this.mKo / this._Ko) * CommonDefine_1.MILLIONSECOND_PER_SECOND),
          (this.dKo =
            t >= TimerSystem_1.MIN_TIME
              ? TimerSystem_1.TimerSystem.Delay(
                  this.SKo.bind(this),
                  t,
                  this.CKo,
                )
              : TimerSystem_1.TimerSystem.Next(
                  this.SKo.bind(this),
                  this.CKo,
                ))));
  }
  SKo() {
    if (this.IsValid()) {
      const t = this.PeriodInternal;
      var i = this.GetRemainPeriod();
      const e = Math.floor(1 - i / t);
      var i = ((i % t) + t) % t;
      if (this.IsActive()) {
        this.ResetPeriodTimer(i);
        const s = this.GetOwnerBuffComponent();
        for (let t = 0; t < e; t++) s?.ApplyPeriodExecution(this);
      } else this.ResetPeriodTimer(i);
    }
  }
  GetRemainPeriod() {
    const t = (this.GetCurrentTime() - this.cKo) * this._Ko;
    if (!(this.PeriodInternal < 0))
      return this.mKo - t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
  }
  IsActive() {
    return this.gKo;
  }
  SetActivate(t) {
    if (this.gKo === t) return !1;
    this.gKo = t;
    const i = this.GetOwnerBuffComponent()
      ?.GetExactEntity()
      ?.CheckGetComponent(185);
    if (!i)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "buff更改激活状态时无法获取到持有者",
            ["handle", this.Handle],
            ["buffId", this.Id],
            ["持有者", this.sKo?.GetDebugName()],
          ),
        !1
      );
    if (t) {
      if (
        (this.ResetModifiers(),
        this.Config.GrantedTags?.forEach((t) => {
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t) &&
            i.TagContainer.UpdateExactTag(2, t, this.StackCount);
        }),
        this.PeriodInternal > 0)
      )
        switch (this.Config.PeriodicInhibitionPolicy) {
          case 1:
            this.ResetPeriodTimer(
              TimerSystem_1.MIN_TIME / CommonDefine_1.MILLIONSECOND_PER_SECOND,
            );
            break;
          case 2:
            this.ResetPeriodTimer(this.PeriodInternal);
        }
    } else
      this.ClearModifiers(),
        this.Config.GrantedTags?.forEach((t) => {
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t) &&
            i.TagContainer.UpdateExactTag(2, t, -this.StackCount);
        });
    return !0;
  }
  get StackCount() {
    return this.StackCountInternal;
  }
  SetStackCount(i) {
    const t = this.Config;
    const e = this.StackCountInternal;
    const s =
      ((this.StackCountInternal = i),
      this.GetOwnerBuffComponent()?.GetExactEntity()?.CheckGetComponent(185));
    s
      ? (t.StackPeriodResetPolicy === 0 && this.SetPeriod(),
        this.ResetModifiers(),
        t.GrantedTags?.forEach((t) => {
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t) &&
            s.TagContainer.UpdateExactTag(2, t, i - e);
        }))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          20,
          "buff更改层数时无法获取到持有者",
          ["handle", this.Handle],
          ["buffId", this.Id],
          ["持有者", this.sKo?.GetDebugName()],
        );
  }
  get Level() {
    return this.jqi;
  }
  ClearModifiers() {
    this.StateModifiers.length = 0;
    const t = this.GetOwner()?.GetComponent(155);
    if (this.fKo.length > 0 && t) {
      for (const i of this.fKo) t.RemoveModifier(i[0], i[1]);
      this.fKo.length = 0;
    }
  }
  ResetModifiers() {
    if ((this.ClearModifiers(), this.gKo))
      for (const i of this.Config.Modifiers) {
        const t = i.AttributeId;
        CharacterAttributeTypes_1.stateAttributeIds.has(t)
          ? this.SetStateModifier(i)
          : this.SetNonStateModifier(i);
      }
  }
  SetStateModifier(t) {
    switch (t.CalculationPolicy[0]) {
      case 4:
      case 2:
        var [, i, e, s, r] = t.CalculationPolicy;
        var e =
          e === 1
            ? this.GetInstigatorAttributeSet()
            : this.GetOwnerAttributeSet();
        var r =
          (r &&
            !e &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Battle",
              20,
              "buff找不到属性来源，快照将被取值为0",
              ["buffId", this.Id],
              ["handle", this.Handle],
              ["持有者", this.sKo?.GetDebugName()],
              ["施加者", this.InstigatorId],
            ),
          r
            ? e
              ? AbilityUtils_1.AbilityUtils.GetAttrValue(e, i, s)
              : 0
            : void 0);
        this.StateModifiers.push([t, r]);
        break;
      default:
        this.StateModifiers.push([t, void 0]);
    }
  }
  SetNonStateModifier(t) {
    const i = this.StackCountInternal ?? 1;
    const e = this.GetOwner().GetComponent(155);
    let s = 0;
    const r = t.AttributeId;
    const h = AbilityUtils_1.AbilityUtils.GetLevelValue(t.Value1, this.jqi, 0);
    const a = AbilityUtils_1.AbilityUtils.GetLevelValue(t.Value2, this.jqi, 0);
    switch (t.CalculationPolicy[0]) {
      case 0:
      case 1:
      case 3:
        s = e.AddModifier(r, { Type: t.CalculationPolicy[0], Value1: h * i });
        break;
      case 2:
      case 4:
        var [, f, o, n, u, _, l, c] = t.CalculationPolicy;
        var v =
          o === 1
            ? this.GetInstigatorAttributeSet()
            : this.GetOwnerAttributeSet();
        var o = o === 1 ? this.InstigatorId : 0;
        if (!v || void 0 === o)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "持续型buff设置属性modifier时缺少来源",
              ["buffId", this.Id],
              ["handle", this.Handle],
              ["持有者", this.sKo?.GetDebugName()],
              ["施加者", this.InstigatorId],
              ["attrId", r],
            )
          );
        s = e.AddModifier(r, {
          Type: t.CalculationPolicy[0],
          Value1: h * i,
          Value2: a * i,
          SourceEntity: o,
          SourceAttributeId: f,
          SourceCalculationType: n,
          SnapshotSource: u
            ? AbilityUtils_1.AbilityUtils.GetAttrValue(v, f, n)
            : void 0,
          Min: _,
          Ratio: l,
          Max: c,
        });
        break;
      case 5:
      case 6:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "不能直接对非状态属性使用时间膨胀类属性修改",
            ["buffId", this.Id],
          );
    }
    this.fKo.push([r, s]);
  }
  static ModifyStateAttribute(e, s, r, t, i, h) {
    const a = r.AttributeId;
    if (CharacterAttributeTypes_1.stateAttributeIds.has(a)) {
      const f = AbilityUtils_1.AbilityUtils.GetLevelValue(r.Value1, t, 0);
      const o = AbilityUtils_1.AbilityUtils.GetLevelValue(r.Value2, t, 0);
      switch (r.CalculationPolicy[0]) {
        case 0:
          return void s.AddBaseValue(a, f);
        case 1:
          var n = s.GetBaseValue(a);
          var u = f * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1;
          return void s.SetBaseValue(a, n * u);
        case 2:
        case 4: {
          var [, n, u, _, , l, c, v] = r.CalculationPolicy;
          var u = u === 1 ? e : s;
          if (!u)
            return void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Battle", 20, "瞬间/周期buff属性修改时缺少来源", [
                "attrId",
                a,
              ])
            );
          let t = h ?? AbilityUtils_1.AbilityUtils.GetAttrValue(u, n, _);
          if (l && (t -= l) <= 0) return;
          c && (t /= c);
          let i = f * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * t + o;
          return (
            v && i > v && (i = v),
            void (r.CalculationPolicy[0] === 2
              ? s.AddBaseValue(a, i)
              : s.SetBaseValue(a, i))
          );
        }
        case 3:
          return void s.SetBaseValue(a, f);
        case 5:
          return void s.AddBaseValue(a, f * i);
        case 6:
          var [, u] = r.CalculationPolicy;
          var n = h ?? AbilityUtils_1.AbilityUtils.GetAttrValue(s, u, 0);
          s.AddBaseValue(
            a,
            (f * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * n + o) * i,
          );
      }
    }
  }
}
(ActiveBuffInternal.BuffPool = []),
  __decorate(
    [(0, Stats_1.statDecorator)("Buff_SetDuration")],
    ActiveBuffInternal.prototype,
    "SetDuration",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("Buff_SetPeriod")],
    ActiveBuffInternal.prototype,
    "SetPeriod",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("Buff_SetStateModifier")],
    ActiveBuffInternal.prototype,
    "SetStateModifier",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("Buff_SetNonStateModifier")],
    ActiveBuffInternal.prototype,
    "SetNonStateModifier",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("Buff_AllocBuff")],
    ActiveBuffInternal,
    "AllocBuff",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("Buff_ReleaseBuff")],
    ActiveBuffInternal,
    "ReleaseBuff",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("Buff_ModifyStateAttr")],
    ActiveBuffInternal,
    "ModifyStateAttribute",
    null,
  ),
  (exports.ActiveBuffInternal = ActiveBuffInternal);
// # sourceMappingURL=ActiveBuff.js.map
