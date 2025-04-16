"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StartBattleQte =
    exports.InvokePeriod =
    exports.ConvertBuffToAnother =
    exports.PeriodAddBuffToAdjacentEntity =
    exports.QteExecution =
    exports.ExecuteAddBulletByTagStackCount =
    exports.ExecuteAddBulletByStackCount =
    exports.ExecuteAddBuffByStackCount =
    exports.ExecuteBulletOrBuff =
    exports.PhantomAssistExecution =
    exports.AddBuffToAdjacentRoleExecution =
    exports.ExtendBuffDurationExecution =
    exports.CdReduceExecution =
    exports.DamageExecution =
    exports.AddEnergyExecution =
    exports.AddFormationAttributeExecution =
    exports.ReviveExecution =
    exports.InitExecution =
    exports.PeriodExecution =
    exports.BuffExecution =
      void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../../Module/Abilities/FormationAttributeController"),
  CooperationController_1 = require("../../../../../../Module/Battle/Cooperation/CooperationController"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  CampUtils_1 = require("../../../Blueprint/Utils/CampUtils"),
  AbilityUtils_1 = require("../AbilityUtils"),
  ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  CharacterDamageCalculations_1 = require("../CharacterDamageCalculations"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
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
    var i,
      s = (this.Buff = t).GetOwnerBuffComponent();
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
        return;
    }
  }
  OnBuffAddedCallback(t, e) {}
  OnPeriodCallback(t) {}
}
class PeriodExecution extends (exports.BuffExecution = BuffExecution) {
  OnPeriodCallback(t) {
    this.TryExecute(t);
  }
}
exports.PeriodExecution = PeriodExecution;
class InitExecution extends BuffExecution {
  OnBuffAddedCallback(t, e) {
    this.TryExecute(t, e);
  }
}
exports.InitExecution = InitExecution;
class ReviveExecution extends PeriodExecution {
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
    var t = this.OwnerBuffComponent?.GetEntity(),
      e = t?.GetComponent(0).GetPlayerId() ?? 0;
    2 !==
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentGroupLivingState(
        e,
      ) && t?.CheckGetComponent(189)?.ExecuteRevive();
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
    var t = FormationAttributeController_1.FormationAttributeController.GetMax(
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
    var t = this.OwnerBuffComponent?.GetAttributeComponent();
    if (t) {
      const a =
        t.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_EnergyEfficiency,
        ) / CharacterAttributeTypes_1.PER_TEN_THOUSAND;
      var e = CharacterAttributeTypes_1.EAttributeId.Proto_Energy,
        i = this.AddValue;
      const u = i * a;
      if ((t.AddBaseValue(e, u), t.Entity?.CheckGetComponent(173)?.IsInGame)) {
        var s =
          CharacterDamageCalculations_1.ENERGY_SHARE_RATE /
          CharacterAttributeTypes_1.PER_TEN_THOUSAND;
        for (const h of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
          !0,
        )) {
          var r = h?.Entity?.CheckGetComponent(173),
            o = h?.Entity?.CheckGetComponent(171);
          if (r && !r.IsInGame && o) {
            const a =
                o.GetCurrentValue(
                  CharacterAttributeTypes_1.EAttributeId.Proto_EnergyEfficiency,
                ) / CharacterAttributeTypes_1.PER_TEN_THOUSAND,
              u = i * a;
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
    var t = this.Buff.StackCount,
      t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.DamageIdList, t, []);
    if (this.OwnerBuffComponent) {
      var e = this.OwnerBuffComponent.GetEntity()?.CheckGetComponent(19),
        i = this.OwnerBuffComponent.GetActorComponent()?.ActorLocation,
        s = this.InstigatorEntity?.Valid
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
      (this.KXo = void 0),
      (this.QXo = 0),
      (this.XXo = void 0),
      (this.$Xo = void 0);
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    (this.KXo = e[0]?.split("#") ?? []),
      (this.QXo = Number(e[1] ?? 0)),
      (this.XXo = t.ExtraEffectGrowParameters1),
      (this.$Xo = t.ExtraEffectGrowParameters2);
  }
  OnExecute() {
    var t = this.OwnerBuffComponent?.GetEntity()?.GetComponent(205);
    if (t) {
      var e =
          AbilityUtils_1.AbilityUtils.GetLevelValue(this.XXo, this.Level, 0) *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        i = AbilityUtils_1.AbilityUtils.GetLevelValue(this.$Xo, this.Level, 0);
      switch (this.QXo) {
        case 0:
          t.ModifyCdTime(this.KXo, -i, -e);
          break;
        case 1:
          t.ModifyCdTimeBySkillGenres(this.KXo, -i, -e);
      }
    }
  }
}
exports.CdReduceExecution = CdReduceExecution;
class ExtendBuffDurationExecution extends PeriodExecution {
  constructor() {
    super(...arguments),
      (this.jQo = []),
      (this.YXo = void 0),
      (this.JXo = void 0),
      (this.zXo = void 0);
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    (this.TargetType = Number(e[0])),
      (this.jQo = e[1].split("#").map((t) => Number(t))),
      (this.zXo = e[2]?.split("#").map((t) => Number(t))),
      (this.YXo = t.ExtraEffectGrowParameters1),
      (this.JXo = t.ExtraEffectGrowParameters2);
  }
  OnExecute() {
    var t = this.GetEffectTarget();
    if (t?.HasBuffAuthority()) {
      var e =
          AbilityUtils_1.AbilityUtils.GetLevelValue(this.YXo, this.Level, 0) *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        i =
          AbilityUtils_1.AbilityUtils.GetLevelValue(this.JXo, this.Level, 0) *
          TimeUtil_1.TimeUtil.Millisecond;
      for (const o of this.jQo) {
        var s = t.GetBuffById(o);
        if (s) {
          var r = s.GetRemainDuration();
          if (0 < r) {
            let t = Math.max(
              r * (1 + e) + i,
              ActiveBuffConfigs_1.MIN_BUFF_REMAIN_DURATION,
            );
            this.zXo?.[0] &&
              (t = Math.max(t, this.zXo[0] * TimeUtil_1.TimeUtil.Millisecond)),
              this.zXo?.[1] &&
                (t = Math.min(
                  t,
                  this.zXo[1] * TimeUtil_1.TimeUtil.Millisecond,
                )),
              s.SetDuration(t);
          }
        }
      }
    }
  }
}
exports.ExtendBuffDurationExecution = ExtendBuffDurationExecution;
class AddBuffToAdjacentRoleExecution extends InitExecution {
  constructor() {
    super(...arguments),
      (this.ApplyBuffId = []),
      (this.Distance = 0),
      (this.ApplyRoleFormationType = void 0);
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
  }
  InitParameters(t) {
    (this.Distance = Number(t.ExtraEffectParameters[0])),
      (this.ApplyRoleFormationType =
        1 < t.ExtraEffectParameters.length
          ? t.ExtraEffectParameters[1].split("#").map((t) => Number(t))
          : [0, 1, 2]),
      (this.ApplyBuffId =
        2 < t.ExtraEffectParameters.length
          ? t.ExtraEffectParameters[2].split("#").map((t) => Number(t))
          : [this.BuffId]);
  }
  OnExecute(t) {
    if (t) {
      var e = this.OwnerBuffComponent?.GetEntity(),
        i = e?.GetComponent(0).GetPlayerId() ?? 0,
        t =
          ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
            i,
          )?.GetLocation();
      if (e && t)
        for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsInRange(
          t,
          this.Distance,
        ))
          if (r.GetPlayerId() !== i) {
            var s = r.EntityHandle;
            if (s && s.Entity.GetComponent(0).IsRole() && s.Id !== e.Id)
              for (const o of this.ApplyBuffId)
                s.Entity.GetComponent(172).AddIterativeBuff(
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
      (this.ZXo = Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeDefault),
      (this.e$o = 0),
      (this.wmo = 0),
      (this.t$o = 2);
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.ZXo = Number(t[0])),
      (this.e$o = Number(t[1])),
      (this.wmo = Number(t[2])),
      (this.t$o = Number(t[3]));
  }
  OnExecute(t) {
    var e = this.OwnerBuffComponent.GetEntity(),
      e = e
        ? PhantomUtil_1.PhantomUtil.GetSummonedEntity(e, this.ZXo, this.e$o)
        : void 0;
    e &&
      e.Entity.GetComponent(39).BeginSkill(this.wmo, {
        Target: this.i$o()?.Entity,
        Reason: "PhantomAssistExecution.OnExecute",
      });
  }
  i$o() {
    let t = void 0;
    switch (this.t$o) {
      case 0:
        var e = this.OwnerBuffComponent?.GetSkillComponent();
        t = e?.SkillTarget;
        break;
      case 1:
        t = this.OwnerBuffComponent?.GetEntity()
          ?.GetComponent(32)
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
const DEFAULT_PASSIVE_BULLET_TIMES = 1,
  DEFAULT_PASSIVE_BUFF_ADD_TIMES = 0,
  DEFAULT_PASSIVE_BUFF_REMOVE_TIMES = -1;
class ExecuteBulletOrBuff extends PeriodExecution {
  constructor() {
    super(...arguments),
      (this.GoalType = 0),
      (this.Ids = []),
      (this.Times = void 0),
      (this.BulletPosType = 0),
      (this.ProcessBulletId = (e, i, t) => {
        var s = this.GetBulletTarget().GetActorComponent().ActorTransform,
          r = this.InstigatorEntity?.Entity?.GetComponent(3)?.Actor;
        if (r) {
          var o = this.Buff.MessageId;
          for (let t = 0; t < i; t++)
            ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(
              r,
              String(e),
              s,
              { SyncType: 1, CreateOnAuthority: !1 },
              o,
            );
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Battle",
              19,
              "尝试执行添加子弹的额外效果时找不到对应的buff施加者",
              ["buffId", this.BuffId],
              ["持有者", this.OwnerBuffComponent?.GetDebugName()],
            );
      }),
      (this.o$o = (t, e, i) => {
        i.AddIterativeBuff(
          t,
          this.Buff,
          e,
          !0,
          `瞬间型额外效果迭代添加（前置buff Id=${this.BuffId}）`,
        );
      }),
      (this.r$o = (t, e, i) => {
        i.RemoveBuff(t, e, `瞬间型额外效果移除（前置buff Id=${this.BuffId}）`);
      });
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.TargetType = 0),
      (this.GoalType = Number(t[0])),
      (this.Ids = t[1].split("#").map((t) => Number(t))),
      (this.Times = t[2]?.split("#").map((t) => Number(t)) ?? []),
      (this.BulletPosType = Number(t[3] ?? 0));
  }
  OnExecute() {
    switch (this.GoalType) {
      case 0:
        this.ExecutePerId(this.o$o);
        break;
      case 1:
        this.ExecutePerId(this.ProcessBulletId);
        break;
      case 2:
        this.ExecutePerId(this.r$o);
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
        return;
    }
  }
  GetBuffHolderSkillTarget() {
    var t =
      this.OwnerBuffComponent?.GetEntity()?.CheckGetComponent(39)?.SkillTarget;
    return t ? t.Entity.CheckGetComponent(207) : this.OwnerBuffComponent;
  }
  ExecutePerId(i) {
    for (let e = 0; e < this.Ids.length; e++) {
      let t = this.GetEffectTarget();
      (t = (0, RegisterComponent_1.isComponentInstance)(t, 197)
        ? t.GetCurrentBuffComponent()
        : t) && i(this.Ids[e], this.n$o(e), t);
    }
  }
  n$o(t) {
    var e = this.Times;
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
    var e = t.ExtraEffectParameters;
    this.Ids = new Array(e.length);
    for (let t = 0; t < e.length; t++)
      this.Ids[t] = e[t].split("#").map((t) => Number(t));
  }
  OnExecute() {
    var t = this.Buff.StackCount,
      t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.Ids, t, []),
      e = this.OwnerBuffComponent;
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
          19,
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
    var e = t.ExtraEffectParameters;
    (this.BulletPosType = Number(e[0])), (this.Ids = new Array(e.length - 1));
    for (let t = 1; t < e.length; t++)
      this.Ids[t - 1] = e[t].split("#").map((t) => t.trim());
  }
  OnExecute() {
    var t = this.Buff.StackCount,
      t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.Ids, t, []),
      e = this.GetBulletTarget()?.GetActorComponent()?.ActorTransform,
      i = this.InstigatorBuffComponent?.GetActorComponent()?.Entity;
    if (i && e) {
      var s = this.Buff.MessageId;
      for (const r of t)
        ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(
          i,
          r,
          e,
          { SyncType: 1, CreateOnAuthority: !1 },
          s,
        );
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Battle",
          19,
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
        return;
    }
  }
  GetBuffHolderSkillTarget() {
    var t =
      this.OwnerBuffComponent?.GetEntity()?.CheckGetComponent(39)?.SkillTarget;
    return t ? t.Entity.CheckGetComponent(207) : this.OwnerBuffComponent;
  }
}
exports.ExecuteAddBulletByStackCount = ExecuteAddBulletByStackCount;
class ExecuteAddBulletByTagStackCount extends PeriodExecution {
  constructor() {
    super(...arguments),
      (this.BulletCreateInfos = void 0),
      (this.BulletPosType = 0),
      (this.TagIdGetStackCount = 0);
  }
  InitParameters(t) {
    this.TargetType = 0;
    var e = t.ExtraEffectParameters;
    (this.BulletPosType = Number(e[0])),
      (this.TagIdGetStackCount =
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e[1])),
      (this.BulletCreateInfos = new Array(e.length - 2));
    for (let t = 2; t < e.length; t++) {
      var i = e[t].split("#").map((t) => t.trim());
      i.length < 3
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BuffItem",
            20,
            "ExecuteAddBulletByTagStackCount的参数个数错误",
            ["BuffId", this.BuffId],
            ["参数", e],
          )
        : (this.BulletCreateInfos[t - 2] = i);
    }
  }
  OnExecute() {
    var t = this.OwnerEntity?.GetComponent(203)?.GetTagCount(
      this.TagIdGetStackCount,
    );
    if (!t || t < 0)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BuffItem",
          20,
          "ExecuteAddBulletByTagStackCount指定的Tag在持有者身上不存在",
          ["BuffId", this.BuffId],
          ["持有者", this.Buff.GetOwnerDebugName()],
          [
            "Tag",
            GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(
              this.TagIdGetStackCount,
            ),
          ],
          ["StackCount", t],
        );
    else {
      var e = this.GetBulletTarget()?.GetActorComponent()?.ActorTransform;
      if (e && this.BulletCreateInfos) {
        var i = this.Buff.MessageId;
        for (const a of this.BulletCreateInfos) {
          var s = Number(a[0]),
            r = a[1];
          if (this.CompareStackCount(r, t, s))
            for (let t = 2; t < a.length; t++) {
              var o = a[t];
              ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(
                this.OwnerEntity,
                o,
                e,
                { SyncType: 1, CreateOnAuthority: !1 },
                i,
              );
            }
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BuffItem",
            20,
            "ExecuteAddBulletByTagStackCount尝试执行添加子弹的额外效果时找不到对应的buff施加者或接收者",
            ["BuffId", this.BuffId],
            ["持有者", this.Buff?.GetOwnerDebugName()],
            ["BulletCreateInfos", this.BulletCreateInfos],
          );
    }
  }
  CompareStackCount(t, e, i) {
    switch (t) {
      case ">":
        return i < e;
      case ">=":
        return i <= e;
      case "<":
        return e < i;
      case "<=":
        return e <= i;
      case "==":
        return e === i;
      case "!=":
        return e !== i;
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BuffItem",
              20,
              "ExecuteAddBulletByTagStackCount的比较运算符错误",
              ["buffId", this.BuffId],
              ["operator", t],
            ),
          !1
        );
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
        return;
    }
  }
  GetBuffHolderSkillTarget() {
    var t =
      this.OwnerBuffComponent?.GetEntity()?.CheckGetComponent(39)?.SkillTarget;
    return t ? t.Entity.CheckGetComponent(207) : this.OwnerBuffComponent;
  }
}
exports.ExecuteAddBulletByTagStackCount = ExecuteAddBulletByTagStackCount;
class QteExecution extends InitExecution {
  constructor() {
    super(...arguments), (this.$fa = 0), (this.xtc = !1);
  }
  InitParameters(t) {
    (this.$fa = Number(t.ExtraEffectParameters?.[0] ?? 0)),
      t.ExtraEffectParameters &&
        !StringUtils_1.StringUtils.IsEmpty(t.ExtraEffectParameters[1]) &&
        (this.xtc = 0 < Number(t.ExtraEffectParameters[1]));
  }
  OnExecute(t) {
    var e = this.OwnerEntity;
    if (e?.Valid && e?.IsInit) {
      var i = e.Id,
        s = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(i, {
          ParamType: 1,
        });
      if (s?.IsMyRole()) {
        var r =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
        if (r?.Valid && r?.IsInit) {
          if (i !== r.Id) {
            i = e.GetComponent(96)?.GetQteTagData();
            if (i) {
              if (this.xtc || (!i.ChangeRole && !i.ChangeRoleOnQte)) {
                (e = 0 < this.$fa), (i = r.GetComponent(203));
                e || i.TagContainer.UpdateExactTag(2, 2014048239, 1);
                try {
                  CooperationController_1.CooperationController.TryCooperate(
                    s.GetCreatureDataId(),
                  );
                } catch (t) {
                  t instanceof Error
                    ? Log_1.Log.CheckError() &&
                      Log_1.Log.ErrorWithStack(
                        "Battle",
                        48,
                        "执行Qte额外效果出现异常",
                        t,
                        ["CreatureDataId", s.GetCreatureDataId()],
                        ["Error", t.message],
                      )
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Battle",
                        48,
                        "执行Qte额外效果出现异常",
                        ["CreatureDataId", s.GetCreatureDataId()],
                        ["Error", t],
                      );
                }
                e || i.TagContainer.UpdateExactTag(2, 2014048239, -1);
              }
            } else
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Battle",
                  48,
                  "执行Qte额外效果时，Buff持有者无Qte配置",
                  ["buffId", this.BuffId],
                  ["持有者", this.OwnerBuffComponent?.GetDebugName()],
                );
          }
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Battle",
              48,
              "执行Qte额外效果时，编队当前角色不合法",
              ["buffId", this.BuffId],
              ["持有者", this.OwnerBuffComponent?.GetDebugName()],
            );
      }
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Battle",
          48,
          "执行Qte额外效果时，Buff持有者不合法",
          ["buffId", this.BuffId],
          ["持有者", this.OwnerBuffComponent?.GetDebugName()],
        );
  }
}
exports.QteExecution = QteExecution;
class PeriodAddBuffToAdjacentEntity extends PeriodExecution {
  constructor() {
    super(...arguments),
      (this.nJo = 0),
      (this.axl = []),
      (this.jQo = []),
      (this.otc = !1),
      (this.eue = []),
      (this.lxl = ""),
      (this.hxl = !1);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    !t ||
      t.length < 2 ||
      ((this.nJo = Number(t[0])),
      (this.jQo = t[1].split("#").map((t) => Number(t.trim()))),
      (this.axl = t[2] ? t[2].split("#").map((t) => Number(t.trim())) : [0, 2]),
      (this.hxl = this.axl.some((t) => 0 === t || 3 === t || 2 === t)),
      (this.lxl = `Buff${this.BuffId}的光环额外效果导致的共享添加`));
  }
  CheckExecutable() {
    return (
      !ModelManager_1.ModelManager.GameModeModel?.IsMulti ||
      !!this.OwnerBuffComponent?.HasBuffAuthority()
    );
  }
  OnExecute() {
    var e = this.OwnerEntity,
      t = e?.GetComponent(1)?.ActorLocationProxy,
      i = e?.GetComponent(0);
    if (t && i) {
      var s = this.InstigatorEntity?.Entity,
        r = s?.CheckGetComponent(0);
      if (this.hxl && !r)
        this.otc ||
          (CombatLog_1.CombatLog.Warn(
            "Buff",
            e,
            "光环效果指定了施加者阵营判断，但施加者不合法",
            ["handle", this.Buff?.Handle],
            ["buffId", this.BuffId],
          ),
          (this.otc = !0));
      else {
        var o = r?.GetEntityCamp(),
          a =
            (ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
              t,
              this.nJo,
              62,
              this.eue,
            ),
            i.GetEntityCamp());
        for (const l of this.eue) {
          let t = !1;
          var u = l.Entity;
          if (u && u.Valid && u.IsInit) {
            var h = u?.GetComponent(0),
              n = u?.CheckGetComponent(172);
            if (u && h && n) {
              var c =
                h.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player
                  ? 0
                  : h.GetEntityCamp();
              for (const f of this.axl)
                if (this.CheckCamp(f, u.Id, c, s?.Id, o, e.Id, a)) {
                  t = !0;
                  break;
                }
              if (t)
                for (const d of this.jQo)
                  n.AddIterativeBuff(d, this.Buff, void 0, !1, this.lxl);
            }
          }
        }
      }
    }
  }
  CheckCamp(t, e, i, s, r, o, a) {
    switch (t) {
      case 0:
        return e === s;
      case 1:
        return e === o;
      case 2:
        return e !== s && 1 === CampUtils_1.CampUtils.GetCampRelationship(r, i);
      case 3:
        return 2 === CampUtils_1.CampUtils.GetCampRelationship(r, i);
      case 4:
        return e !== o && 1 === CampUtils_1.CampUtils.GetCampRelationship(a, i);
      case 5:
        return 2 === CampUtils_1.CampUtils.GetCampRelationship(a, i);
    }
    return !1;
  }
  GetDebugEffectString() {
    var t = this.axl.map((t) => {
      switch (t) {
        case 0:
          return "施加者";
        case 1:
          return "持有者";
        case 2:
          return "施加者的友方";
        case 3:
          return "施加者的敌方";
        case 4:
          return "持有者的友方";
        case 5:
          return "持有者的敌方";
        default:
          return "Unknown";
      }
    });
    return (
      `为${(this.nJo / 100).toFixed(1)}m内的${t.join("、")}附加Buff` +
      this.jQo.join(",")
    );
  }
}
exports.PeriodAddBuffToAdjacentEntity = PeriodAddBuffToAdjacentEntity;
class ConvertBuffToAnother extends PeriodExecution {
  constructor() {
    super(...arguments), (this.sK_ = []), (this.aK_ = 0);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters ?? [];
    (this.sK_ = t[0]?.split("#").map((t) => Number(t)) ?? []),
      (this.aK_ = Number(t[1] ?? 0));
  }
  OnExecute() {
    var e = this.OwnerBuffComponent;
    if (e) {
      let t = 0;
      for (const i of this.sK_) t += e.GetBuffTotalStackById(i);
      for (const s of this.sK_) e.RemoveBuff(s, -1, "Buff转换效果");
      0 !== t &&
        0 < this.aK_ &&
        e.AddIterativeBuff(this.aK_, this.Buff, t, !0, "Buff转换效果");
    }
  }
}
exports.ConvertBuffToAnother = ConvertBuffToAnother;
class InvokePeriod extends PeriodExecution {
  constructor() {
    super(...arguments), (this.sK_ = []);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters ?? [];
    this.sK_ = t[0]?.split("#").map((t) => Number(t)) ?? [];
  }
  OnExecute() {
    var t = this.OwnerBuffComponent;
    if (t)
      for (const i of this.sK_) {
        var e = t.GetBuffById(i);
        e && e.IsValid() && e.IsActive() && t.ApplyPeriodExecution(e);
      }
  }
}
exports.InvokePeriod = InvokePeriod;
class StartBattleQte extends PeriodExecution {
  constructor() {
    super(...arguments), (this.BattleQteId = void 0);
  }
  InitParameters(t) {
    0 < t.ExtraEffectParameters.length &&
      (this.BattleQteId = Number(t.ExtraEffectParameters[0]));
  }
  OnExecute() {
    var t, e;
    void 0 !== this.BattleQteId &&
      this.Buff?.GetOwner()?.GetComponent(3)?.IsAutonomousProxy &&
      ((t = ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(
        this.Buff?.GetInstigator(),
      )),
      (e = this.Buff?.MessageId),
      t) &&
      void 0 !== e &&
      ControllerHolder_1.ControllerHolder.BattleQteController.StartBattleQte(
        this.BattleQteId,
        e,
        t,
        2,
      );
  }
  GetDebugEffectString() {
    return `buff${this.BuffId} 触发战斗QTE` + this.BattleQteId;
  }
}
exports.StartBattleQte = StartBattleQte;
//# sourceMappingURL=ExtraExecutionEffect.js.map
