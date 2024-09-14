"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActiveBuffInternal = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ActiveBuffConfigs_1 = require("./ActiveBuffConfigs"),
  MAX_POOL_COUNT = 100;
class ActiveBuffInternal {
  constructor(t) {
    (this.TAe = t),
      (this.tQo = ActiveBuffConfigs_1.INVALID_BUFF_HANDLE),
      (this.PreMessageId = void 0),
      (this.MessageId = -1n),
      (this.iQo = ""),
      (this.oQo = void 0),
      (this.InstigatorIdInternal = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID),
      (this.rQo = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID),
      (this.DurationTimer = void 0),
      (this.y6o = 1),
      (this.nQo = Stats_1.Stat.Create("ActiveBuff.ResetDurationTimer")),
      (this.CB = 0),
      (this.sQo = 0),
      (this.aQo = 1),
      (this.hQo = !1),
      (this.lQo = 0),
      (this._Qo = 0),
      (this.PeriodInternal = 0),
      (this.uQo = void 0),
      (this.cQo = Stats_1.Stat.Create("ActiveBuff.ResetPeriodTimer")),
      (this.mQo = !1),
      (this.StackCountInternal = 0),
      (this.jGi = 0),
      (this.dQo = []),
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
  AU(t, i, s, e, h, r, a, o, f, n) {
    if (
      ((this.TAe = t),
      (this.tQo = i),
      (this.InstigatorIdInternal = s ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID),
      (this.oQo = e),
      (this.iQo = e?.GetDebugName() ?? "unknown"),
      (this.rQo = h),
      (this.MessageId =
        a ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      (this.PreMessageId = r),
      (this.jGi = o),
      (this.StackCountInternal = f),
      (this.mQo = !1),
      (this.hQo = !1),
      this.SetDuration(n),
      this.SetPeriod(t.Period),
      this.IsInstantBuff())
    )
      for (const _ of this.Config.Modifiers) {
        var u = _.AttributeId;
        CharacterAttributeTypes_1.stateAttributeIds.has(u)
          ? this.SetStateModifier(_)
          : this.SetNonStateModifier(_);
      }
    else this.ResetModifiers();
    return this;
  }
  Destroy() {
    if (this.IsActive()) {
      const i = this.GetOwnerBuffComponent()
        ?.GetExactEntity()
        ?.CheckGetComponent(190);
      i?.Valid &&
        this.Config.GrantedTags?.forEach((t) => {
          i.TagContainer.UpdateExactTag(2, t, -this.StackCount);
        });
    }
    (this.hQo = !0),
      this.CQo(),
      this.gQo(),
      this.ClearModifiers(),
      (this.StackCountInternal = 0);
  }
  IsValid() {
    return (
      !this.hQo && (this.GetOwnerBuffComponent()?.GetExactEntity()?.Valid ?? !1)
    );
  }
  get Config() {
    return this.TAe;
  }
  get Handle() {
    return this.tQo;
  }
  GetOwner() {
    return this.oQo?.Entity;
  }
  GetOwnerDebugName() {
    return this.iQo;
  }
  GetOwnerBuffComponent() {
    return this.oQo;
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
      )?.Entity?.GetComponent(160);
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
      )?.Entity?.GetComponent(159);
  }
  GetOwnerAttributeSet() {
    return this.oQo?.GetEntity()?.GetComponent(159);
  }
  get Id() {
    return this.Config.Id;
  }
  get ServerId() {
    return this.rQo;
  }
  IsInstantBuff() {
    return 0 === this.Config.DurationPolicy;
  }
  get Duration() {
    return this.y6o;
  }
  CQo() {
    void 0 !== this.DurationTimer &&
      (TimerSystem_1.TimerSystem.Has(this.DurationTimer) &&
        TimerSystem_1.TimerSystem.Remove(this.DurationTimer),
      (this.DurationTimer = void 0));
  }
  fQo(t) {
    var i;
    this.CQo(),
      this.y6o <= 0 ||
        ((this.sQo = t),
        (this.CB = this.GetCurrentTime()),
        0 <= this.aQo &&
          ((t =
            (this.sQo / this.aQo) * CommonDefine_1.MILLIONSECOND_PER_SECOND),
          (i = this.nQo),
          (this.DurationTimer =
            t >= TimerSystem_1.MIN_TIME
              ? TimerSystem_1.TimerSystem.Delay(
                  this.DurationCallback.bind(this),
                  t,
                  i,
                  void 0,
                  !1,
                )
              : TimerSystem_1.TimerSystem.Next(
                  this.DurationCallback.bind(this),
                  i,
                ))));
  }
  GetCurrentTime() {
    return Time_1.Time.WorldTime;
  }
  SetDuration(t = void 0) {
    var i,
      s,
      e,
      h = this.Config;
    let r = ActiveBuffConfigs_1.MIN_BUFF_PERIOD;
    (r =
      1 === h.DurationPolicy
        ? -1
        : void 0 !== t
          ? t
          : 0 === h.DurationMagnitude.length ||
              0 === h.DurationCalculationPolicy.length
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
              1 === (i = h.DurationCalculationPolicy)[0]
                ? i.length < 4
                  ? (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Character",
                        20,
                        "Buff 配置为hasDuration 但未配置DurationMagnitude或DurationCalculationPolicy, 将被重设为" +
                          ActiveBuffConfigs_1.MIN_BUFF_PERIOD,
                        ["BuffId", this.Id],
                        ["handle", this.Handle],
                        ["持有者", this.oQo?.GetDebugName()],
                        ["释放者", this.InstigatorId],
                      ),
                    ActiveBuffConfigs_1.MIN_BUFF_PERIOD)
                  : ((h = AbilityUtils_1.AbilityUtils.GetLevelValue(
                      h.DurationMagnitude2,
                      this.Level,
                      0,
                    )),
                    ([, i, e, s] = i),
                    (e =
                      1 === e
                        ? this.GetInstigatorAttributeSet()
                        : this.GetOwnerAttributeSet())
                      ? ((e = AbilityUtils_1.AbilityUtils.GetAttrValue(
                          e,
                          i,
                          s,
                        )),
                        Math.max(
                          e *
                            t *
                            CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
                            h,
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
                            ["持有者", this.oQo?.GetDebugName()],
                            ["释放者", this.InstigatorId],
                          ),
                        ActiveBuffConfigs_1.MIN_BUFF_PERIOD))
                : t)),
      (this.y6o = r),
      this.fQo(r);
  }
  SetRemainDuration(t) {
    2 === this.Config.DurationPolicy &&
      this.fQo(0 < t ? t : ActiveBuffConfigs_1.MIN_BUFF_PERIOD);
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
          ((this.GetCurrentTime() - this.CB) * this.aQo) /
          CommonDefine_1.MILLIONSECOND_PER_SECOND;
        return this.y6o < 0
          ? ActiveBuffConfigs_1.INFINITY_DURATION
          : Math.max(this.sQo - t, 0);
    }
  }
  SetPeriod(t = void 0) {
    return (
      (this.PeriodInternal = void 0 !== t ? t : this.Config.Period),
      0 < this.PeriodInternal &&
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
    var s;
    i
      ? (t = 0)
      : this.Config.DurationAffectedByBulletTime
        ? this.Config.EffectInfos.some(
            (t) =>
              4 === t.ExtraEffectId ||
              5 === t.ExtraEffectId ||
              17 === t.ExtraEffectId,
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
      t !== this.aQo &&
        ((i = this.GetCurrentTime()),
        (s = this.aQo),
        (this.aQo = t),
        0 < this.y6o &&
          ((t = ((i - this.CB) * s) / CommonDefine_1.MILLIONSECOND_PER_SECOND),
          (t = this.sQo - t),
          this.fQo(t)),
        0 < this.PeriodInternal) &&
        ((t = ((i - this.lQo) * s) / CommonDefine_1.MILLIONSECOND_PER_SECOND),
        (i = this._Qo - t),
        this.ResetPeriodTimer(i));
  }
  DurationCallback() {
    var t;
    this.IsValid() &&
      (t = this.GetOwnerBuffComponent()) &&
      t.RemoveBuffWhenTimeout(this);
  }
  gQo() {
    void 0 !== this.uQo &&
      (TimerSystem_1.TimerSystem.Has(this.uQo) &&
        TimerSystem_1.TimerSystem.Remove(this.uQo),
      (this.uQo = void 0));
  }
  ResetPeriodTimer(t) {
    var i;
    this.gQo(),
      this.PeriodInternal <= 0 ||
        ((this._Qo = t),
        (this.lQo = this.GetCurrentTime()),
        0 < this.aQo &&
          ((t =
            (this._Qo / this.aQo) * CommonDefine_1.MILLIONSECOND_PER_SECOND),
          (i = this.cQo),
          (this.uQo =
            t >= TimerSystem_1.MIN_TIME
              ? TimerSystem_1.TimerSystem.Delay(
                  this.pQo.bind(this),
                  t,
                  i,
                  void 0,
                  !1,
                )
              : TimerSystem_1.TimerSystem.Next(this.pQo.bind(this), i))));
  }
  pQo() {
    if (this.IsValid()) {
      var t = this.PeriodInternal,
        i = this.GetRemainPeriod(),
        s = Math.floor(1 - i / t),
        i = ((i % t) + t) % t;
      if (this.IsActive()) {
        this.ResetPeriodTimer(i);
        var e = this.GetOwnerBuffComponent();
        for (let t = 0; t < s; t++) e?.ApplyPeriodExecution(this);
      } else this.ResetPeriodTimer(i);
    }
  }
  GetRemainPeriod() {
    var t = (this.GetCurrentTime() - this.lQo) * this.aQo;
    if (!(this.PeriodInternal < 0))
      return this._Qo - t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
  }
  IsActive() {
    return this.mQo;
  }
  SetActivate(t) {
    if (this.mQo === t) return !1;
    this.mQo = t;
    const i = this.GetOwnerBuffComponent()
      ?.GetExactEntity()
      ?.CheckGetComponent(190);
    if (!i)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "buff更改激活状态时无法获取到持有者",
            ["handle", this.Handle],
            ["buffId", this.Id],
            ["持有者", this.oQo?.GetDebugName()],
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
        0 < this.PeriodInternal)
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
    var t = this.Config;
    const s = this.StackCountInternal,
      e =
        ((this.StackCountInternal = i),
        this.GetOwnerBuffComponent()?.GetExactEntity()?.CheckGetComponent(190));
    e
      ? (0 === t.StackPeriodResetPolicy && this.SetPeriod(),
        this.ResetModifiers(),
        t.GrantedTags?.forEach((t) => {
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t) &&
            e.TagContainer.UpdateExactTag(2, t, i - s);
        }))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          20,
          "buff更改层数时无法获取到持有者",
          ["handle", this.Handle],
          ["buffId", this.Id],
          ["持有者", this.oQo?.GetDebugName()],
        );
  }
  get Level() {
    return this.jGi;
  }
  ClearModifiers() {
    this.StateModifiers.length = 0;
    var t = this.GetOwner()?.GetComponent(158);
    if (0 < this.dQo.length && t) {
      for (const i of this.dQo) t.RemoveModifier(i[0], i[1]);
      this.dQo.length = 0;
    }
  }
  ResetModifiers() {
    if ((this.ClearModifiers(), this.mQo))
      for (const i of this.Config.Modifiers) {
        var t = i.AttributeId;
        CharacterAttributeTypes_1.stateAttributeIds.has(t)
          ? this.SetStateModifier(i)
          : this.SetNonStateModifier(i);
      }
  }
  SetStateModifier(t) {
    switch (t.CalculationPolicy[0]) {
      case 4:
      case 2:
        var [, i, s, e, h] = t.CalculationPolicy,
          s =
            1 === s
              ? this.GetInstigatorAttributeSet()
              : this.GetOwnerAttributeSet(),
          h =
            (h &&
              !s &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Battle",
                20,
                "buff找不到属性来源，快照将被取值为0",
                ["buffId", this.Id],
                ["handle", this.Handle],
                ["持有者", this.oQo?.GetDebugName()],
                ["施加者", this.InstigatorId],
              ),
            h
              ? s
                ? AbilityUtils_1.AbilityUtils.GetAttrValue(s, i, e)
                : 0
              : void 0);
        this.StateModifiers.push([t, h]);
        break;
      default:
        this.StateModifiers.push([t, void 0]);
    }
  }
  SetNonStateModifier(t) {
    var i = this.StackCountInternal ?? 1,
      s = this.GetOwner().GetComponent(158);
    let e = 0;
    var h = t.AttributeId,
      r = AbilityUtils_1.AbilityUtils.GetLevelValue(t.Value1, this.jGi, 0),
      a = AbilityUtils_1.AbilityUtils.GetLevelValue(t.Value2, this.jGi, 0);
    switch (t.CalculationPolicy[0]) {
      case 0:
      case 1:
      case 3:
        e = s.AddModifier(h, { Type: t.CalculationPolicy[0], Value1: r * i });
        break;
      case 2:
      case 4:
        var [, o, f, n, u, _, c, l] = t.CalculationPolicy,
          v =
            1 === f
              ? this.GetInstigatorAttributeSet()
              : this.GetOwnerAttributeSet(),
          f = 1 === f ? this.InstigatorId : 0;
        if (!v || void 0 === f)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "持续型buff设置属性modifier时缺少来源",
              ["buffId", this.Id],
              ["handle", this.Handle],
              ["持有者", this.oQo?.GetDebugName()],
              ["施加者", this.InstigatorId],
              ["attrId", h],
            )
          );
        e = s.AddModifier(h, {
          Type: t.CalculationPolicy[0],
          Value1: r * i,
          Value2: a * i,
          SourceEntity: f,
          SourceAttributeId: o,
          SourceCalculationType: n,
          SnapshotSource: u
            ? AbilityUtils_1.AbilityUtils.GetAttrValue(v, o, n)
            : void 0,
          Min: _,
          Ratio: c,
          Max: l,
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
    this.dQo.push([h, e]);
  }
  static ModifyStateAttribute(s, e, h, t, i, r) {
    var a = h.AttributeId;
    if (CharacterAttributeTypes_1.stateAttributeIds.has(a)) {
      var o = AbilityUtils_1.AbilityUtils.GetLevelValue(h.Value1, t, 0),
        f = AbilityUtils_1.AbilityUtils.GetLevelValue(h.Value2, t, 0);
      switch (h.CalculationPolicy[0]) {
        case 0:
          return void e.AddBaseValue(a, o);
        case 1:
          var n = e.GetBaseValue(a),
            u = o * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1;
          return void e.SetBaseValue(a, n * u);
        case 2:
        case 4: {
          var [, n, u, _, , c, l, v] = h.CalculationPolicy,
            u = 1 === u ? s : e;
          if (!u)
            return void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Battle", 20, "瞬间/周期buff属性修改时缺少来源", [
                "attrId",
                a,
              ])
            );
          let t = r ?? AbilityUtils_1.AbilityUtils.GetAttrValue(u, n, _);
          if (c && (t -= c) <= 0) return;
          l && (t /= l);
          let i = o * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * t + f;
          return (
            v && i > v && (i = v),
            void (2 === h.CalculationPolicy[0]
              ? e.AddBaseValue(a, i)
              : e.SetBaseValue(a, i))
          );
        }
        case 3:
          return void e.SetBaseValue(a, o);
        case 5:
          return void e.AddBaseValue(a, o * i);
        case 6:
          var [, u] = h.CalculationPolicy,
            n = r ?? AbilityUtils_1.AbilityUtils.GetAttrValue(e, u, 0);
          e.AddBaseValue(
            a,
            (o * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * n + f) * i,
          );
      }
    }
  }
}
(exports.ActiveBuffInternal = ActiveBuffInternal).BuffPool = [];
//# sourceMappingURL=ActiveBuff.js.map
