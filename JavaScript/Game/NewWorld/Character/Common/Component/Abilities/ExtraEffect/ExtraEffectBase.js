"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffEffect = exports.BuffEffectBase = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine"),
  EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent"),
  RandomSystem_1 = require("../../../../../../../Core/Random/RandomSystem"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs");
class BuffEffectBase {
  constructor(t) {
    (this.RequireAndLimits = t),
      (this.BuffId = BigInt(-1)),
      (this.IsInLoop = !1),
      (this.Level = 0),
      (this.ServerId = -1),
      (this.InstigatorEntityId = 0),
      (this.OpponentEntityId = 0),
      (this.OwnerBuffComponent = void 0);
  }
  get InstigatorEntity() {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityById(
      this.InstigatorEntityId,
    );
  }
  get InstigatorCreatureId() {
    return (
      this.InstigatorEntity?.Entity?.GetComponent(0)?.GetCreatureDataId() ??
      ActiveBuffConfigs_1.NULL_INSTIGATOR_ID
    );
  }
  get InstigatorBuffComponent() {
    return this.InstigatorEntity?.Entity?.CheckGetComponent(159);
  }
  get OpponentEntity() {
    return EntitySystem_1.EntitySystem.Get(this.OpponentEntityId);
  }
  get OpponentBuffComponent() {
    return this.OpponentEntity?.CheckGetComponent(159);
  }
  get OwnerEntity() {
    return this.OwnerBuffComponent?.GetEntity();
  }
  get ExactOwnerEntity() {
    return this.OwnerBuffComponent?.GetExactEntity();
  }
  get OwnerEffectManager() {
    return this.OwnerBuffComponent.BuffEffectManager;
  }
  InitParameters(t) {}
  CheckExecutable() {
    return !0;
  }
  CheckAuthority() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
  }
  IsPlayerBuff() {
    return (0, RegisterComponent_1.isComponentInstance)(
      this.OwnerBuffComponent,
      183,
    );
  }
  CheckLoop() {
    return !this.IsInLoop;
  }
  CheckRequirements(t) {
    if (0 === this.RequireAndLimits.Requirements.length) return !0;
    switch (this.RequireAndLimits.CheckType) {
      case 0:
        for (const e of this.RequireAndLimits.Requirements)
          if (!this.ZQo(e, t)) return !1;
        return !0;
      case 1:
        for (const r of this.RequireAndLimits.Requirements)
          if (this.ZQo(r, t)) return !0;
        return !1;
      default:
        return !0;
    }
  }
  ZQo(t, e) {
    switch (t.Type) {
      case 1:
        return (
          Number.isInteger(e.SkillId) &&
          t.SkillIds.includes(BigInt(e.SkillId ?? -1))
        );
      case 2:
        return (
          Number.isInteger(e.SkillGenre) &&
          t.SkillGenres.includes(e.SkillGenre ?? -1)
        );
      case 3:
        return t.RequireInterval.CheckActiveness(
          this.eXo(t.RequireTargetType).GetAttributeComponent(),
        );
      case 4:
        return (
          Number.isInteger(e.SmashType) &&
          t.SmashTypes.includes(e.SmashType ?? -1)
        );
      case 5:
        return void 0 !== e.BulletId && t.BulletIds.includes(e.BulletId);
      case 6:
        return t.IsCritical === e.IsCritical;
      case 7:
        return (
          Number.isInteger(e.ElementType) &&
          t.ElementTypes.includes(e.ElementType)
        );
      case 8:
        return (
          Number.isInteger(e.WeaponType) && t.WeaponTypes.includes(e.WeaponType)
        );
      case 9:
        return (
          this.eXo(t.RequireTargetType)
            .GetTagComponent()
            ?.HasAnyTag(t.RequireTagContainer) === t.IsExist
        );
      case 10:
        return GameplayTagUtils_1.GameplayTagUtils.Contains(
          t.RequirePartTags,
          e.PartTag,
        );
      case 11:
        return GameplayTagUtils_1.GameplayTagUtils.HasAny(
          t.RequireBulletTags,
          e.BulletTags,
        );
      case 12:
        return t.DamageGenres.includes(e.DamageGenre ?? -1);
      case 13:
        var r = this.eXo(t.RequireTargetType)
          ?.GetEntity()
          ?.GetComponent(0)
          ?.GetMonsterMatchType();
        return Number.isInteger(r) && t.MonsterGenres.includes(r);
      case 14:
        r = this.eXo(t.RequireTargetType);
        return (
          (r &&
            r.GetBuffTotalStackById(t.BuffId) >= t.MinStack &&
            r.GetBuffTotalStackById(t.BuffId) <= t.MaxStack) ??
          !1
        );
      case 15:
        return (
          PhantomUtil_1.PhantomUtil.GetSummonedEntity(
            this.eXo(t.RequireTargetType).GetEntity(),
            t.SummonType,
            t.SummonIndex,
          )
            ?.Entity?.CheckGetComponent(188)
            ?.HasAnyTag(t.RequireTagContainer) === t.IsExist
        );
      case 16:
        return t.CalculationTypes.includes(e.CalculateType ?? -1);
      default:
        return !0;
    }
    return !0;
  }
  eXo(t) {
    switch (t) {
      case 0:
        return this.OwnerBuffComponent;
      case 1:
        return this.OpponentBuffComponent;
      case 2:
        return this.InstigatorBuffComponent;
      default:
        return;
    }
  }
  GetDebugString() {
    return "" + this.constructor.name;
  }
}
class BuffEffect extends (exports.BuffEffectBase = BuffEffectBase) {
  constructor(t, e, r, s, i) {
    super(r), (this.ActiveHandleId = t), (this.Index = e), (this.Timeout = 0);
    r = (this.OwnerBuffComponent = s).GetBuffByHandle(t);
    r &&
      ((this.Level = r.Level),
      (this.ServerId = r.ServerId),
      (this.BuffId = r.Id),
      i) &&
      (this.InstigatorEntityId = i.Entity.Id);
  }
  get RemainCd() {
    return (
      this.OwnerBuffComponent?.GetBuffEffectCd(this.BuffId, this.Index) ?? 0
    );
  }
  get Buff() {
    return this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
  }
  static Create(t, e, r, s, i, n) {
    t = new this(t, e, r, s, i);
    return n && t.InitParameters(n), t;
  }
  OnCreated() {}
  OnRemoved(t) {}
  OnStackDecreased(t, e, r) {}
  OnStackIncreased(t, e, r) {}
  OnPeriodCallback() {}
  TryExecute(t, e, ...r) {
    return !!this.Check(t, e) && (this.Execute(...r), !0);
  }
  Check(t, e) {
    return this.CheckExecutable()
      ? ((this.OpponentEntityId = e.GetEntity()?.Id ?? 0),
        !!this.CheckLoop() &&
          !!this.CheckRequirements(t) &&
          !!this.CheckLimits())
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            20,
            "持续型buff的效果不在本端执行",
            ["buffId", this.BuffId],
            ["effectType", this.constructor?.name],
            ["handleId", this.ActiveHandleId],
          ),
        !1);
  }
  Execute(...t) {
    this.IsInLoop = !0;
    t = this.OnExecute(...t);
    return this.PostExecuted(), (this.IsInLoop = !1), t;
  }
  PostExecuted() {
    var t;
    this.ActiveHandleId < 0 ||
      !this.OwnerBuffComponent ||
      ((t =
        this.RequireAndLimits.Limits.ExtraEffectCd *
        CommonDefine_1.MILLIONSECOND_PER_SECOND),
      this.CheckAuthority() &&
        this.OwnerBuffComponent.SetBuffEffectCd(this.BuffId, this.Index, t),
      (t = this.RequireAndLimits.Limits.ExtraEffectRemoveStackNum),
      this.CheckAuthority() &&
        0 < t &&
        this.OwnerBuffComponent.RemoveBuffByHandle(
          this.ActiveHandleId,
          t,
          "buff额外效果触发后移除",
        ));
  }
  CheckLimits() {
    return (
      this.ActiveHandleId < 0 ||
      !(
        0 < this.RemainCd ||
        RandomSystem_1.default.GetRandomPercent() >
          this.RequireAndLimits.Limits.ExtraEffectProbability
      )
    );
  }
}
exports.BuffEffect = BuffEffect;
//# sourceMappingURL=ExtraEffectBase.js.map
