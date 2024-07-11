"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExecuteAddBulletByStackCount =
    exports.ExecuteAddBuffByStackCount =
    exports.ExecuteBulletOrBuff =
    exports.PhantomAssistExecution =
    exports.AddBuffToAdjacentRoleExecution =
    exports.InitExecution =
    exports.ExtendBuffDurationExecution =
    exports.CdReduceExecution =
    exports.DamageExecution =
    exports.AddEnergyExecution =
    exports.AddFormationAttributeExecution =
    exports.ReviveExecution =
    exports.PeriodExecution =
    exports.BuffExecution =
      void 0);
const Log_1 = require("../../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent");
const TimeUtil_1 = require("../../../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../../Module/Abilities/FormationAttributeController");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const BulletController_1 = require("../../../../../Bullet/BulletController");
const AbilityUtils_1 = require("../AbilityUtils");
const ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const CharacterDamageCalculations_1 = require("../CharacterDamageCalculations");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class BuffExecution extends ExtraEffectBase_1.BuffEffectBase {
  constructor() {
    super(...arguments), (this.Buff = void 0), (this.TargetType = 0);
  }
  static Create(t, e, i) {
    e = new this(e);
    return (e.BuffId = t), i && e.InitParameters(i), e;
  }
  CheckExecutable() {
    return !!this.OwnerBuffComponent?.HasBuffAuthority();
  }
  Check(t) {
    return (
      !!this.CheckExecutable() &&
      ((this.OpponentEntityId = this.OwnerBuffComponent.GetEntity()?.Id ?? 0),
      !!this.CheckLoop()) &&
      !!this.CheckRequirements(t)
    );
  }
  TryExecute(t, ...e) {
    this.Level = t.Level;
    let i;
    const s = (this.Buff = t).GetOwnerBuffComponent();
    return !(
      !s ||
      ((i = t.GetInstigatorBuffComponent()),
      (this.OwnerBuffComponent = s),
      i && (this.InstigatorEntityId = t.GetInstigator().Id),
      !this.Check({})) ||
      ((this.IsInLoop = !0),
      this.OnExecute(...e),
      (this.IsInLoop = !1),
      (this.OwnerBuffComponent = void 0),
      (this.Buff = void 0))
    );
  }
  GetEffectTarget() {
    switch (this.TargetType) {
      case 0:
        return this.OwnerBuffComponent;
      case 1:
        return this.InstigatorBuffComponent;
      default:
    }
  }
}
class PeriodExecution extends (exports.BuffExecution = BuffExecution) {}
class ReviveExecution extends (exports.PeriodExecution = PeriodExecution) {
  constructor() {
    super(...arguments), (this.HealRate = -0), (this.HealValue = 0);
  }
  InitParameters(t) {
    (this.HealRate =
      Number(t.ExtraEffectParameters[0] ?? 0) *
      CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
      (this.HealValue = Number(t.ExtraEffectParameters[1] ?? 0));
  }
  OnExecute() {
    this.OwnerBuffComponent?.GetEntity()
      ?.CheckGetComponent(172)
      ?.ExecuteReviveLocal();
  }
}
exports.ReviveExecution = ReviveExecution;
class AddFormationAttributeExecution extends PeriodExecution {
  constructor() {
    super(...arguments),
      (this.AttributeId = 0),
      (this.AddRate = -0),
      (this.AddValue = 0);
  }
  InitParameters(t) {
    (this.AttributeId = Number(t.ExtraEffectParameters[0])),
      (this.AddRate =
        AbilityUtils_1.AbilityUtils.GetLevelValue(
          t.ExtraEffectGrowParameters1,
          this.Level,
          0,
        ) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
      (this.AddValue = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t.ExtraEffectGrowParameters2,
        this.Level,
        0,
      ));
  }
  OnExecute() {
    const t =
      FormationAttributeController_1.FormationAttributeController.GetMax(
        this.AttributeId,
      );
    FormationAttributeController_1.FormationAttributeController.AddValue(
      this.AttributeId,
      t * this.AddRate + this.AddValue,
    );
  }
}
exports.AddFormationAttributeExecution = AddFormationAttributeExecution;
class AddEnergyExecution extends PeriodExecution {
  constructor() {
    super(...arguments), (this.AddValue = 0);
  }
  InitParameters(t) {
    this.AddValue = AbilityUtils_1.AbilityUtils.GetLevelValue(
      t.ExtraEffectGrowParameters1,
      this.Level,
      0,
    );
  }
  OnExecute() {
    const t = this.OwnerBuffComponent?.GetAttributeComponent();
    if (t) {
      const h =
        t.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_EnergyEfficiency,
        ) / CharacterAttributeTypes_1.PER_TEN_THOUSAND;
      const e = CharacterAttributeTypes_1.EAttributeId.Proto_Energy;
      const i = this.AddValue;
      const u = i * h;
      if ((t.AddBaseValue(e, u), t.Entity?.CheckGetComponent(158)?.IsInGame)) {
        const s =
          CharacterDamageCalculations_1.ENERGY_SHARE_RATE /
          CharacterAttributeTypes_1.PER_TEN_THOUSAND;
        for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
          !0,
        )) {
          const r = a?.Entity?.CheckGetComponent(158);
          const o = a?.Entity?.CheckGetComponent(156);
          if (r && !r.IsInGame && o) {
            const h =
              o.GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.Proto_EnergyEfficiency,
              ) / CharacterAttributeTypes_1.PER_TEN_THOUSAND;
            const u = i * h;
            o.AddBaseValue(e, u * s);
          }
        }
      }
    }
  }
}
exports.AddEnergyExecution = AddEnergyExecution;
class DamageExecution extends PeriodExecution {
  constructor() {
    super(...arguments), (this.DamageIdList = void 0);
  }
  InitParameters(e) {
    this.DamageIdList = new Array(e.ExtraEffectParameters.length);
    for (let t = 0; t < e.ExtraEffectParameters.length; t++)
      this.DamageIdList[t] = e.ExtraEffectParameters[t]
        .split("#")
        .map((t) => BigInt(t));
  }
  OnExecute() {
    var t = this.Buff.StackCount;
    var t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.DamageIdList, t, []);
    if (this.OwnerBuffComponent) {
      const e = this.OwnerBuffComponent.GetEntity()?.CheckGetComponent(18);
      const i = this.OwnerBuffComponent.GetActorComponent()?.ActorLocation;
      const s = this.InstigatorEntity?.Valid
        ? this.InstigatorEntity.Entity
        : this.OwnerEntity;
      if (e && i && s)
        for (const r of t)
          e.ExecuteBuffDamage(
            {
              DamageDataId: r,
              SkillLevel: this.Level,
              Attacker: s,
              HitPosition: i,
              BuffId: this.BuffId,
            },
            {},
            this.Buff.MessageId,
          );
    }
  }
}
exports.DamageExecution = DamageExecution;
class CdReduceExecution extends PeriodExecution {
  constructor() {
    super(...arguments),
      (this.$Qo = void 0),
      (this.YQo = 0),
      (this.JQo = void 0),
      (this.zQo = void 0);
  }
  InitParameters(t) {
    const e = t.ExtraEffectParameters;
    (this.$Qo = e[0]?.split("#") ?? []),
      (this.YQo = Number(e[1] ?? 0)),
      (this.JQo = t.ExtraEffectGrowParameters1),
      (this.zQo = t.ExtraEffectGrowParameters2);
  }
  OnExecute() {
    const t = this.OwnerBuffComponent?.GetEntity()?.GetComponent(186);
    if (t) {
      const e =
        AbilityUtils_1.AbilityUtils.GetLevelValue(this.JQo, this.Level, 0) *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      const i = AbilityUtils_1.AbilityUtils.GetLevelValue(
        this.zQo,
        this.Level,
        0,
      );
      switch (this.YQo) {
        case 0:
          t.ModifyCdTime(this.$Qo, -i, -e);
          break;
        case 1:
          t.ModifyCdTimeBySkillGenres(this.$Qo, -i, -e);
      }
    }
  }
}
exports.CdReduceExecution = CdReduceExecution;
class ExtendBuffDurationExecution extends PeriodExecution {
  constructor() {
    super(...arguments),
      (this.QKo = void 0),
      (this.ZQo = void 0),
      (this.eXo = void 0),
      (this.tXo = void 0);
  }
  InitParameters(t) {
    const e = t.ExtraEffectParameters;
    (this.TargetType = Number(e[0])),
      (this.QKo = e[1].split("#").map((t) => BigInt(t))),
      (this.tXo = e[2]?.split("#").map((t) => Number(t))),
      (this.ZQo = t.ExtraEffectGrowParameters1),
      (this.eXo = t.ExtraEffectGrowParameters2);
  }
  OnExecute() {
    const t = this.GetEffectTarget();
    if (t?.HasBuffAuthority()) {
      const e =
        AbilityUtils_1.AbilityUtils.GetLevelValue(this.ZQo, this.Level, 0) *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      const i =
        AbilityUtils_1.AbilityUtils.GetLevelValue(this.eXo, this.Level, 0) *
        TimeUtil_1.TimeUtil.Millisecond;
      for (const o of this.QKo) {
        const s = t.GetBuffById(o);
        if (s) {
          const r = s.GetRemainDuration();
          if (r > 0) {
            let t = Math.max(
              r * (1 + e) + i,
              ActiveBuffConfigs_1.MIN_BUFF_REMAIN_DURATION,
            );
            this.tXo?.[0] &&
              (t = Math.max(t, this.tXo[0] * TimeUtil_1.TimeUtil.Millisecond)),
              this.tXo?.[1] &&
                (t = Math.min(
                  t,
                  this.tXo[1] * TimeUtil_1.TimeUtil.Millisecond,
                )),
              s.SetDuration(t);
          }
        }
      }
    }
  }
}
exports.ExtendBuffDurationExecution = ExtendBuffDurationExecution;
class InitExecution extends BuffExecution {}
class AddBuffToAdjacentRoleExecution extends (exports.InitExecution =
  InitExecution) {
  constructor() {
    super(...arguments),
      (this.ApplyBuffId = void 0),
      (this.Distance = 0),
      (this.ApplyRoleFormationType = void 0);
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
  }
  InitParameters(t) {
    (this.Distance = Number(t.ExtraEffectParameters[0])),
      (this.ApplyRoleFormationType =
        t.ExtraEffectParameters.length > 1
          ? t.ExtraEffectParameters[1].split("#").map((t) => Number(t))
          : [0, 1, 2]),
      (this.ApplyBuffId =
        t.ExtraEffectParameters.length > 2
          ? t.ExtraEffectParameters[2].split("#").map((t) => BigInt(t))
          : [this.BuffId]);
  }
  OnExecute(t) {
    if (t) {
      const e = this.OwnerBuffComponent?.GetEntity();
      const i = e?.GetComponent(0).GetPlayerId() ?? 0;
      var t =
        ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
          i,
        )?.GetLocation();
      if (e && t)
        for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsInRange(
          t,
          this.Distance,
        ))
          if (r.GetPlayerId() !== i) {
            const s = r.EntityHandle;
            if (s && s.Entity.GetComponent(0).IsRole() && s.Id !== e.Id)
              for (const o of this.ApplyBuffId)
                s.Entity.GetComponent(157).AddIterativeBuff(
                  o,
                  this.Buff,
                  void 0,
                  !1,
                  `Buff${this.BuffId}的额外效果导致的共享添加`,
                );
          }
    }
  }
}
exports.AddBuffToAdjacentRoleExecution = AddBuffToAdjacentRoleExecution;
class PhantomAssistExecution extends InitExecution {
  constructor() {
    super(...arguments),
      (this.iXo = Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeDefault),
      (this.oXo = 0),
      (this.Gco = 0),
      (this.rXo = 2);
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.iXo = Number(t[0])),
      (this.oXo = Number(t[1])),
      (this.Gco = Number(t[2])),
      (this.rXo = Number(t[3]));
  }
  OnExecute(t) {
    var e = this.OwnerBuffComponent.GetEntity();
    var e = e
      ? PhantomUtil_1.PhantomUtil.GetSummonedEntity(e, this.iXo, this.oXo)
      : void 0;
    e &&
      e.Entity.GetComponent(33).BeginSkill(this.Gco, {
        Target: this.nXo()?.Entity,
        Context: "PhantomAssistExecution.OnExecute",
      });
  }
  nXo() {
    let t = void 0;
    switch (this.rXo) {
      case 0:
        var e = this.OwnerBuffComponent?.GetSkillComponent();
        t = e?.SkillTarget;
        break;
      case 1:
        t = this.OwnerBuffComponent?.GetEntity()
          ?.GetComponent(29)
          ?.GetCurrentTarget();
        break;
      case 2:
        t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
          this.OwnerBuffComponent?.GetEntity(),
        );
    }
    return t;
  }
}
exports.PhantomAssistExecution = PhantomAssistExecution;
const DEFAULT_PASSIVE_BULLET_TIMES = 1;
const DEFAULT_PASSIVE_BUFF_ADD_TIMES = 0;
const DEFAULT_PASSIVE_BUFF_REMOVE_TIMES = -1;
class ExecuteBulletOrBuff extends PeriodExecution {
  constructor() {
    super(...arguments),
      (this.GoalType = 0),
      (this.Ids = void 0),
      (this.Times = void 0),
      (this.BulletPosType = 0),
      (this.ProcessBulletId = (e, i, t) => {
        const s = this.GetBulletTarget().GetActorComponent().ActorTransform;
        const r = this.InstigatorEntity?.Entity?.GetComponent(3)?.Actor;
        if (r) {
          const o = this.Buff.MessageId;
          for (let t = 0; t < i; t++)
            BulletController_1.BulletController.CreateBulletCustomTarget(
              r,
              String(e),
              s,
              { SyncType: 1 },
              o,
            );
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Battle",
              20,
              "尝试执行添加子弹的额外效果时找不到对应的buff施加者",
              ["buffId", this.BuffId],
              ["持有者", this.OwnerBuffComponent?.GetDebugName()],
            );
      }),
      (this.sXo = (t, e, i) => {
        i.AddIterativeBuff(
          t,
          this.Buff,
          e,
          !0,
          `因为其它瞬间型buff额外效果迭代添加（前置buff Id=${this.BuffId}）`,
        );
      }),
      (this.aXo = (t, e, i) => {
        i.RemoveBuff(
          t,
          e,
          `因为其它buff额外效果移除（前置buff Id=${this.BuffId}）`,
        );
      });
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.TargetType = 0),
      (this.GoalType = Number(t[0])),
      (this.Ids = t[1].split("#").map((t) => BigInt(t))),
      (this.Times = t[2]?.split("#").map((t) => Number(t)) ?? []),
      (this.BulletPosType = Number(t[3] ?? 0));
  }
  OnExecute() {
    switch (this.GoalType) {
      case 0:
        this.ExecutePerId(this.sXo);
        break;
      case 1:
        this.ExecutePerId(this.ProcessBulletId);
        break;
      case 2:
        this.ExecutePerId(this.aXo);
    }
  }
  GetBulletTarget() {
    switch (this.BulletPosType) {
      case 0:
        return this.OwnerBuffComponent;
      case 1:
        return this.OpponentBuffComponent;
      case 2:
        return this.InstigatorBuffComponent;
      case 3:
        return this.GetBuffHolderSkillTarget();
      default:
    }
  }
  GetBuffHolderSkillTarget() {
    const t =
      this.OwnerBuffComponent?.GetEntity()?.CheckGetComponent(33)?.SkillTarget;
    return t ? t.Entity.CheckGetComponent(187) : this.OwnerBuffComponent;
  }
  CheckExecutable() {
    return this.GoalType === 1
      ? BulletController_1.BulletController.HasAuthority(
          this.InstigatorEntity?.Entity,
        )
      : !!this.OwnerBuffComponent?.HasBuffAuthority();
  }
  ExecutePerId(i) {
    for (let e = 0; e < this.Ids.length; e++) {
      let t = this.GetEffectTarget();
      (t = (0, RegisterComponent_1.isComponentInstance)(t, 180)
        ? t.GetCurrentBuffComponent()
        : t) && i(this.Ids[e], this.hXo(e), t);
    }
  }
  hXo(t) {
    const e = this.Times;
    switch (this.GoalType) {
      case 0:
        return AbilityUtils_1.AbilityUtils.GetArrayValue(
          e,
          t,
          DEFAULT_PASSIVE_BUFF_ADD_TIMES,
        );
      case 1:
        return AbilityUtils_1.AbilityUtils.GetArrayValue(
          e,
          t,
          DEFAULT_PASSIVE_BULLET_TIMES,
        );
      case 2:
        return AbilityUtils_1.AbilityUtils.GetArrayValue(
          e,
          t,
          DEFAULT_PASSIVE_BUFF_REMOVE_TIMES,
        );
    }
    return 0;
  }
}
exports.ExecuteBulletOrBuff = ExecuteBulletOrBuff;
class ExecuteAddBuffByStackCount extends PeriodExecution {
  constructor() {
    super(...arguments), (this.Ids = void 0);
  }
  InitParameters(t) {
    this.TargetType = 0;
    const e = t.ExtraEffectParameters;
    this.Ids = new Array(e.length);
    for (let t = 0; t < e.length; t++)
      this.Ids[t] = e[t].split("#").map((t) => BigInt(t));
  }
  OnExecute() {
    var t = this.Buff.StackCount;
    var t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.Ids, t, []);
    const e = this.OwnerBuffComponent;
    if (e)
      for (const i of t)
        e.AddIterativeBuff(
          i,
          this.Buff,
          1,
          !0,
          `因为其它瞬间型buff额外效果迭代添加（前置buff Id=${this.BuffId}）`,
        );
    else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Battle",
          20,
          "尝试执行添加buff的额外效果时找不到对应的buff接收者",
          ["buffId", this.BuffId],
          ["持有者", this.Buff?.GetOwnerDebugName()],
          ["施加者", this.Buff.InstigatorId],
        );
  }
}
exports.ExecuteAddBuffByStackCount = ExecuteAddBuffByStackCount;
class ExecuteAddBulletByStackCount extends PeriodExecution {
  constructor() {
    super(...arguments), (this.Ids = void 0), (this.BulletPosType = 0);
  }
  InitParameters(t) {
    this.TargetType = 0;
    const e = t.ExtraEffectParameters;
    (this.BulletPosType = Number(e[0])), (this.Ids = new Array(e.length - 1));
    for (let t = 1; t < e.length; t++)
      this.Ids[t - 1] = e[t].split("#").map((t) => t.trim());
  }
  CheckExecutable() {
    return BulletController_1.BulletController.HasAuthority(
      this.InstigatorEntity?.Entity,
    );
  }
  OnExecute() {
    var t = this.Buff.StackCount;
    var t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.Ids, t, []);
    const e = this.GetBulletTarget()?.GetActorComponent()?.ActorTransform;
    const i = this.InstigatorBuffComponent?.GetActorComponent()?.Actor;
    if (i && e) {
      const s = this.Buff.MessageId;
      for (const r of t)
        BulletController_1.BulletController.CreateBulletCustomTarget(
          i,
          r,
          e,
          { SyncType: 1 },
          s,
        );
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Battle",
          20,
          "尝试执行添加子弹的额外效果时找不到对应的buff施加者或接收者",
          ["buffId", this.BuffId],
          ["持有者", this.Buff?.GetOwnerDebugName()],
          ["施加者", this.Buff.InstigatorId],
        );
  }
  GetBulletTarget() {
    switch (this.BulletPosType) {
      case 0:
        return this.OwnerBuffComponent;
      case 1:
        return this.OpponentBuffComponent;
      case 2:
        return this.InstigatorBuffComponent;
      case 3:
        return this.GetBuffHolderSkillTarget();
      default:
    }
  }
  GetBuffHolderSkillTarget() {
    const t =
      this.OwnerBuffComponent?.GetEntity()?.CheckGetComponent(33)?.SkillTarget;
    return t ? t.Entity.CheckGetComponent(187) : this.OwnerBuffComponent;
  }
}
exports.ExecuteAddBulletByStackCount = ExecuteAddBulletByStackCount;
// # sourceMappingURL=ExtraExecutionEffect.js.map
