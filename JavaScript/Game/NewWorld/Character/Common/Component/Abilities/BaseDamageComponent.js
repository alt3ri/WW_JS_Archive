"use strict";
var BaseDamageComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, a, o) {
      var r,
        i = arguments.length,
        s =
          i < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, a))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, a, o);
      else
        for (var n = e.length - 1; 0 <= n; n--)
          (r = e[n]) &&
            (s = (i < 3 ? r(s) : 3 < i ? r(t, a, s) : r(t, a)) || s);
      return 3 < i && s && Object.defineProperty(t, a, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseDamageComponent =
    exports.BaseAttributeSet =
    exports.DamageCompPayload =
    exports.SnapshotPayload =
      void 0);
const Stats_1 = require("../../../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  RandomSystem_1 = require("../../../../../../Core/Random/RandomSystem"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  GameplayAbilityVisionControl_1 = require("../Vision/GA/GameplayAbilityVisionControl"),
  AbilityUtils_1 = require("./AbilityUtils"),
  BaseAbilityComponent_1 = require("./BaseAbilityComponent"),
  ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  CharacterBuffIds_1 = require("./CharacterBuffIds"),
  CharacterDamageCalculations_1 = require("./CharacterDamageCalculations"),
  ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes"),
  ExtraEffectDamageAccumulation_1 = require("./ExtraEffect/ExtraEffectDamageAccumulation"),
  ExtraEffectDamageAugment_1 = require("./ExtraEffect/ExtraEffectDamageAugment"),
  ExtraEffectDamageImmune_1 = require("./ExtraEffect/ExtraEffectDamageImmune"),
  ExtraEffectDamageModifier_1 = require("./ExtraEffect/ExtraEffectDamageModifier"),
  ExtraEffectDamageShare_1 = require("./ExtraEffect/ExtraEffectDamageShare"),
  ExtraEffectSnapModifier_1 = require("./ExtraEffect/ExtraEffectSnapModifier");
class SnapshotPayload {
  constructor() {
    (this.Target = void 0),
      (this.Attacker = void 0),
      (this.TargetSnapshot = void 0),
      (this.AttackerSnapshot = void 0);
  }
}
exports.SnapshotPayload = SnapshotPayload;
class DamageCompPayload {
  constructor() {
    (this.Target = void 0), (this.Attacker = void 0);
  }
}
exports.DamageCompPayload = DamageCompPayload;
class BaseAttributeSet {}
exports.BaseAttributeSet = BaseAttributeSet;
let BaseDamageComponent =
  (BaseDamageComponent_1 = class BaseDamageComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.AttributeComponent = void 0),
        (this.TagComponent = void 0),
        (this.BuffComponent = void 0),
        (this.Ybr = void 0),
        (this.Jbr = void 0),
        (this.tRr = void 0),
        (this.ActorComponent = void 0),
        (this.CreatureDataComponent = void 0),
        (this.zbr = void 0),
        (this.Zbr = void 0),
        (this.iqr = new Map());
    }
    get OwnerBuffComponent() {
      return this.BuffComponent;
    }
    OnStart() {
      return (
        (this.AttributeComponent = this.Entity.CheckGetComponent(170)),
        (this.TagComponent = this.Entity.CheckGetComponent(203)),
        (this.BuffComponent = this.Entity.CheckGetComponent(172)),
        (this.Ybr = this.Entity.GetComponent(55)),
        (this.Jbr = this.Entity.GetComponent(93)),
        (this.tRr = this.Entity.GetComponent(38)),
        (this.ActorComponent = this.Entity.CheckGetComponent(1)),
        (this.CreatureDataComponent = this.Entity.CheckGetComponent(0)),
        !0
      );
    }
    OnClear() {
      return this.rqr(), !0;
    }
    ExecuteBulletDamage(e, t, a) {
      var e = EntitySystem_1.EntitySystem.Get(e),
        o = e.GetBulletInfo(),
        r = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(
          t.DamageDataId,
        );
      if (!r) return { DamageResult: 0, ToughResult: 0 };
      if (0 === r.CalculateType && this.TagComponent.HasAnyTag([1940180710]))
        return { DamageResult: 0, ToughResult: 0 };
      BaseDamageComponent_1.nqr.Start();
      var i = new ExtraEffectBaseTypes_1.RequirementPayload(),
        s =
          ((i.BulletId = BigInt(o.BulletRowName)),
          (i.BulletMessageId = a),
          (i.SkillId = Number(o.BulletInitParams.SkillId)),
          (i.SkillDamageCount =
            ModelManager_1.ModelManager.CombatMessageModel?.AddSkillDamageCount(
              o.BulletInitParams.SkillContextId,
            )),
          (i.BulletDamageCount =
            ModelManager_1.ModelManager.CombatMessageModel?.AddBulletDamageCount(
              o.ContextId,
            )),
          (i.BulletTags = o.Tags ?? []),
          (i.BattleFlags = o.BulletInitParams.BattleFlags ?? []),
          (i.PartId = t.PartId),
          0 <= i.PartId &&
            (i.PartTag = this.Entity.GetComponent(68).GetPartByIndex(
              i.PartId,
            ).PartTag?.TagId),
          t.Attacker.CheckGetComponent(19)),
        n = t.Attacker.CheckGetComponent(207);
      return s
        ? ((s = {
            ...t,
            DamageData: r,
            Attacker: s,
            SourceType: Protocol_1.Aki.Protocol.XAs.Proto_FromBullet,
            Accumulation:
              ExtraEffectDamageAccumulation_1.DamageAccumulation.GetAccumulation(
                e.Id,
              ),
            Element:
              ExtraEffectSnapModifier_1.ModifyDamageElement.ApplyEffects(
                n,
                r.Id,
              ) ?? r.Element,
            PartId: t.PartId,
            RandomSeed:
              ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
            ContextId: a,
            SkillContextId: o.BulletInitParams.SkillContextId,
          }),
          BaseDamageComponent_1.nqr.Stop(),
          BaseDamageComponent_1.sqr.Start(),
          this.aqr(s),
          BaseDamageComponent_1.sqr.Stop(),
          BaseDamageComponent_1.hqr.Start(),
          (e = this.ProcessDamage(i, s)),
          BaseDamageComponent_1.hqr.Stop(),
          e)
        : (CombatLog_1.CombatLog.Error(
            "Damage",
            this.Entity,
            "伤害结算无合法施加者",
            ["damageId", r.Id],
            ["attacker id", t.Attacker?.Id],
          ),
          BaseDamageComponent_1.nqr.Stop(),
          { DamageResult: 0, ToughResult: 0 });
    }
    ExecuteBuffDamage(e, t, a) {
      e.Attacker =
        e.Attacker?.GetComponent(55)?.GetAttributeHolder() ?? e.Attacker;
      var o,
        r,
        i,
        s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(
          Number(e.DamageDataId),
        );
      s &&
        ((o = new ExtraEffectBaseTypes_1.RequirementPayload()).PartialAssign(t),
        (i = e.Attacker.CheckGetComponent(19)),
        (r = e.Attacker.CheckGetComponent(207)),
        i
          ? ((i = {
              ...e,
              DamageData: s,
              Attacker: i,
              SourceType: Protocol_1.Aki.Protocol.XAs.Proto_FromEffect,
              IsAddEnergy: !1,
              IsCounterAttack: !1,
              ForceCritical: !1,
              IsBlocked: !1,
              PartId: -1,
              ExtraRate: 1,
              Accumulation: 0,
              Element:
                ExtraEffectSnapModifier_1.ModifyDamageElement.ApplyEffects(
                  r,
                  s.Id,
                ) ?? s.Element,
              RandomSeed:
                ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
              ContextId: a,
              SkillContextId: void 0,
            }),
            this.aqr(i),
            this?.ProcessDamage(o, i),
            ExtraEffectDamageShare_1.DamageShare.ApplyBuffShare(
              this.Entity,
              s,
              e,
              t,
              a,
            ))
          : CombatLog_1.CombatLog.Error(
              "Damage",
              this.Entity,
              "伤害结算无合法施加者",
              ["damageId", s.Id],
              ["attacker id", e.Attacker?.Id],
            ));
    }
    ExecuteBuffShareDamage(e, t, a, o) {
      var r,
        i,
        s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(
          Number(e.DamageDataId),
        );
      s &&
        ((r = new ExtraEffectBaseTypes_1.RequirementPayload()).PartialAssign(t),
        (t = e.Attacker.CheckGetComponent(19)),
        (i = e.Attacker.CheckGetComponent(207)),
        t
          ? ((t = {
              ...e,
              DamageData: s,
              Attacker: t,
              SourceType: Protocol_1.Aki.Protocol.XAs.Proto_FromEffect,
              IsAddEnergy: !1,
              IsCounterAttack: !1,
              ForceCritical: !1,
              IsBlocked: !1,
              PartId: -1,
              ExtraRate: a,
              Accumulation: 0,
              Element:
                ExtraEffectSnapModifier_1.ModifyDamageElement.ApplyEffects(
                  i,
                  s.Id,
                ) ?? s.Element,
              RandomSeed:
                ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
              ContextId: o,
              SkillContextId: void 0,
            }),
            this.aqr(t),
            this.ProcessDamage(r, t))
          : CombatLog_1.CombatLog.Error(
              "Damage",
              this.Entity,
              "伤害结算无合法施加者",
              ["damageId", s.Id],
              ["attacker id", e.Attacker?.Id],
            ));
    }
    ProcessDamage(t, a) {
      if (this.TagComponent.HasTag(1918148596) && 0 === a.DamageData.ImmuneType)
        return { DamageResult: 0, ToughResult: 0 };
      var e = a.Attacker;
      0 < t.SkillId &&
        ((r = e.tRr?.GetSkill(t.SkillId)),
        (t.SkillGenre = r?.SkillInfo?.SkillGenre ?? -1)),
        (t.DamageType = a.DamageData.Type),
        (t.DamageSubTypes = a.DamageData.SubType),
        (t.CalculateType = a.DamageData.CalculateType),
        BaseDamageComponent_1.lqr.Start();
      const o = this._qr(e);
      var r = this.wFc(t, a, o);
      let i = void 0;
      0 <= a.PartId &&
        (i = this.Entity.GetComponent(68)?.GetPartByIndex(a.PartId));
      (e =
        (5 === t.SkillGenre
          ? this.GetExtraToughRate("ToughRateOnCounter")
          : this.GetExtraToughRate("ToughRate")) /
        CharacterAttributeTypes_1.PER_TEN_THOUSAND),
        this.RFc(
          a,
          t,
          (e) => {
            this.Entity?.Valid &&
              a.Attacker?.Entity?.Valid &&
              (this.uqr(e, a, t),
              this.cqr(e, a, t, o),
              i?.OnDamage(e.Damage, a.ForceCritical, a.Attacker.Entity, !1));
          },
          a.ContextId,
        ),
        (e = this.mqr(a, o, e));
      return (
        BaseDamageComponent_1.lqr.Stop(),
        { DamageResult: r.Damage, ToughResult: e }
      );
    }
    static OnDamageExecuteNotify(e, t) {
      ModelManager_1.ModelManager.CreatureModel.GetEntity(
        MathUtils_1.MathUtils.LongToNumber(t.TVn),
      )
        ?.Entity?.GetComponent(19)
        ?.ProcessRemoteDamage(t);
    }
    ProcessRemoteDamage(e) {
      var t,
        a = e.Njn ?? {},
        o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          MathUtils_1.MathUtils.LongToNumber(e.kjn),
        ),
        r = MathUtils_1.MathUtils.LongToNumber(e.Fjn),
        i = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(r),
        s = o?.Entity?.GetComponent(19);
      i && o && s
        ? ((o = {
            ...e,
            ShieldCoverDamage: e.hAs,
            DamageData: i,
            Damage: -e.nAs,
            ChangeLife: e.jQ_,
            IsCounterAttack: !1,
            IsCritical: e.sAs,
            IsTargetKilled: e.aAs,
            IsBlocked: !1,
            SourceType: a.Vjn ?? Protocol_1.Aki.Protocol.XAs.Proto_FromEffect,
            IsImmune:
              e.lAs ===
              Protocol_1.Aki.Protocol.G4s.Proto_EDamageImmune_BuffEffectElement,
            Element: e.wHn,
          }),
          ((t = new ExtraEffectBaseTypes_1.RequirementPayload()).BulletId =
            MathUtils_1.MathUtils.LongToBigInt(a.Mjn ?? -1)),
          (t.SkillId = a.r5n),
          (t.BulletTags = [...(a.Hjn ?? [])]),
          (t.PartId = e.jjn),
          (t.DamageType = i.Type),
          (t.DamageSubTypes = i.SubType),
          (t.CalculateType = i.CalculateType),
          (t.IsTargetKilled = o.IsTargetKilled),
          0 < t.SkillId &&
            ((a = s.tRr?.GetSkill(t.SkillId)),
            (t.SkillGenre = a?.SkillInfo?.SkillGenre ?? -1)),
          0 <= t.PartId &&
            ((i = this.Entity.GetComponent(68)),
            (t.PartTag = i?.GetPartByIndex(t.PartId).PartTag?.TagId)),
          (t.IsCritical = o.IsCritical),
          (t.IsImmune = o.IsImmune),
          (a = this.ActorComponent.ActorLocation),
          this.uqr(o, { Attacker: s, HitPosition: a }, t),
          this.dqr(o, s, t))
        : CombatLog_1.CombatLog.Error(
            "Damage",
            this.Entity,
            "收到服务端伤害广播时找不到合法的攻击者或有效伤害配置",
            ["攻击方", e.kjn],
            ["受击方", e.TVn],
            ["结算id", r],
          );
    }
    _qr(e) {
      var t = (e.Ybr?.GetAttributeHolder() ?? e.Entity)
          .CheckGetComponent(171)
          .TakeSnapshot(),
        a =
          (this.Ybr?.GetAttributeHolderExceptVisionSummon() ?? this.Entity)
            .CheckGetComponent(171)
            .TakeSnapshot() ?? this.AttributeComponent.TakeSnapshot();
      return {
        Attacker: this.Cqr(e),
        AttackerSnapshot: t,
        Target: this,
        TargetSnapshot: a,
      };
    }
    Cqr(e) {
      return GameplayAbilityVisionControl_1.GameplayAbilityVisionControl
        .VisionControlHandle &&
        e.CreatureDataComponent.SummonType ===
          Protocol_1.Aki.Protocol.Summon.x3s
            .Proto_ESummonTypeConcomitantPhantomRole
        ? ModelManager_1.ModelManager.CreatureModel.GetEntity(
            e.CreatureDataComponent.GetSummonerId(),
          ).Entity?.GetComponent(19)
        : e;
    }
    gqr(e, t, a, o, r) {
      let i = 1;
      var s = this.Entity.GetComponent(0);
      return (
        !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
          s.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Monster ||
          (s = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize()) <=
            1 ||
          (i =
            s <= 2
              ? CommonParamById_1.configCommonParamById.GetFloatConfig(
                  "MutiWorldDamageRatio2",
                )
              : CommonParamById_1.configCommonParamById.GetFloatConfig(
                  "MutiWorldDamageRatio3",
                )),
        CharacterDamageCalculations_1.Calculation.CalculateFormula(
          e,
          t,
          a,
          o,
          r,
          i,
        )
      );
    }
    yQo(e, t) {
      let a = 1;
      var o = this.Entity.GetComponent(0);
      return (
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          o.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster &&
          (a =
            ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 2
              ? CommonParamById_1.configCommonParamById.GetFloatConfig(
                  "MutiWorldDamageRatio2",
                )
              : CommonParamById_1.configCommonParamById.GetFloatConfig(
                  "MutiWorldDamageRatio3",
                )),
        CharacterDamageCalculations_1.Calculation.CalculateFormula(
          e,
          t,
          !1,
          0,
          0,
          a,
        )
      );
    }
    fqr(e, t, a) {
      BaseDamageComponent_1.pqr.Start();
      var o = t.DamageData,
        r =
          a.Attacker.Jbr?.GetWeaponType() ??
          ExtraEffectBaseTypes_1.DEFAULT_WEAPON_TYPE_NOT_PASS,
        o =
          (e.PartialAssign({
            SmashType: o.SmashType,
            ElementType: t.Element,
            WeaponType: r,
          }),
          this.vqr(e, t, a),
          ExtraEffectSnapModifier_1.SnapModifier.PreCriticalModify(e, a),
          this.JudgeCritical(t, a.AttackerSnapshot));
      return (
        ExtraEffectSnapModifier_1.SnapModifier.PostCriticalModify(e, a),
        BaseDamageComponent_1.pqr.Stop(),
        o
      );
    }
    JudgeCritical(e, t) {
      switch (e.DamageData.CalculateType) {
        case 1:
        case 2:
          return !1;
      }
      return (
        !!e.ForceCritical ||
        ((e.RandomSeed = RandomSystem_1.default.GetNextRandomSeed(
          e.RandomSeed,
          2,
        )),
        Math.abs(e.RandomSeed % CharacterAttributeTypes_1.PER_TEN_THOUSAND) <=
          t.CurrentValues.Proto_Crit)
      );
    }
    vqr(e, t, a) {
      t.IsCounterAttack &&
        (a.Attacker.BuffComponent.TriggerEvents(11, a.Target.BuffComponent, e),
        this.BuffComponent.TriggerEvents(12, a.Attacker.BuffComponent, e));
    }
    wFc(e, t, a) {
      let o = void 0;
      return (o =
        1 === t.DamageData.CalculateType
          ? this.AFc(e, t, a)
          : this.PFc(e, t, a));
    }
    PFc(e, t, a) {
      var o = this.fqr(e, t, a),
        r = ExtraEffectDamageAugment_1.DamageAugment.ApplyEffects(e, a),
        i =
          ExtraEffectSnapModifier_1.DamageAmplifyOnHit.ApplyEffects(e, a) +
          ExtraEffectSnapModifier_1.DamageAmplifyOnBeHit.ApplyEffects(e, a);
      let s = this.gqr(t, a, o, r, i);
      r = ExtraEffectDamageModifier_1.DamageModifier.ApplyEffects(e, a);
      s = r.IsSuccessful ? r.Result : s;
      let n = !1;
      return (
        ExtraEffectDamageImmune_1.DamageImmune.ApplyEffects(e, t, a) &&
          ((n = !0), (s = 0)),
        {
          ...t,
          Damage: s,
          ChangeLife: s,
          ShieldCoverDamage: 0,
          IsCritical: o,
          IsTargetKilled: !1,
          IsImmune: n,
        }
      );
    }
    AFc(e, t, a) {
      this.fqr(e, t, a);
      e = this.yQo(t, a);
      return {
        ...t,
        Damage: e,
        ChangeLife: e,
        ShieldCoverDamage: 0,
        IsCritical: !1,
        IsTargetKilled: !1,
        IsImmune: !1,
      };
    }
    RFc(a, o, r, e) {
      var t = a.Attacker,
        i = a.DamageData,
        i = Protocol_1.Aki.Protocol.U3n.create({
          Fjn: MathUtils_1.MathUtils.NumberToLong(i.Id),
          Wjn: a.SkillLevel,
          kjn: MathUtils_1.MathUtils.NumberToLong(
            t.Entity.GetComponent(0).GetCreatureDataId(),
          ),
          TVn: MathUtils_1.MathUtils.NumberToLong(
            this.Entity.GetComponent(0).GetCreatureDataId(),
          ),
          Kjn: a.IsAddEnergy,
          Qjn: a.IsCounterAttack,
          Xjn: a.ForceCritical,
          $jn: a.IsBlocked,
          jjn: a.PartId,
          Yjn: a.CounterSkillMessageId
            ? MathUtils_1.MathUtils.BigIntToLong(a.CounterSkillMessageId)
            : 0,
          Njn: {
            Vjn: a.SourceType,
            Mjn: MathUtils_1.MathUtils.BigIntToLong(o.BulletId ?? BigInt(-1)),
            Hjn: o.BulletTags.filter((e) => void 0 !== e),
            r5n: o.SkillId,
            ptc: a.SkillContextId
              ? MathUtils_1.MathUtils.BigIntToLong(a.SkillContextId)
              : void 0,
          },
          lHn: ModelManager_1.ModelManager.PlayerInfoModel.AdvanceRandomSeed(0),
        });
      CombatMessage_1.CombatNet.Call(
        29427,
        this.Entity,
        i,
        (e) => {
          var t;
          e &&
            e.lAs !==
              Protocol_1.Aki.Protocol.G4s.Proto_EDamageImmune_Invincible &&
            ((t = {
              ...a,
              Damage: -e.nAs,
              ChangeLife: e.jQ_,
              ShieldCoverDamage: e.hAs,
              IsCritical: e.sAs,
              IsTargetKilled: e.aAs,
              IsImmune:
                e.lAs ===
                Protocol_1.Aki.Protocol.G4s
                  .Proto_EDamageImmune_BuffEffectElement,
              Element: e.wHn,
            }),
            (o.IsCritical = t.IsCritical),
            (o.IsImmune = t.IsImmune),
            (o.IsTargetKilled = t.IsTargetKilled),
            0 === e.Q4n) &&
            r(t);
        },
        e,
        void 0,
      );
    }
    cqr(e, t, a, o) {
      this.Mqr(t, o), this.dqr(e, t.Attacker, a);
    }
    uqr(e, t, a) {
      var o = t.Attacker.Entity,
        r = this.Entity,
        a = (BaseDamageComponent_1.Eqr.Start(), [o, r, a, e, t.HitPosition]);
      1 === e.DamageData.CalculateType &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.FormationPanelUIShowRoleHeal,
          r,
        ),
        SceneTeamController_1.SceneTeamController.EmitEvent(
          r,
          EventDefine_1.EEventName.CharBeDamage,
          ...a,
        ),
        SceneTeamController_1.SceneTeamController.EmitEvent(
          o,
          EventDefine_1.EEventName.CharDamage,
          ...a,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.GlobalCharDamage,
          ...a,
        ),
        BaseDamageComponent_1.Eqr.Stop();
    }
    dqr(e, t, a) {
      var o = t.BuffComponent;
      o &&
        this.BuffComponent &&
        (e.SourceType !== Protocol_1.Aki.Protocol.XAs.Proto_FromEffect &&
          (BaseDamageComponent_1.Sqr.Start(),
          o.TriggerEvents(0, this.BuffComponent, a),
          this.BuffComponent.TriggerEvents(1, o, a),
          BaseDamageComponent_1.Sqr.Stop()),
        e.IsTargetKilled &&
          (BaseDamageComponent_1.yqr.Start(),
          o.TriggerEvents(6, o, a),
          BaseDamageComponent_1.yqr.Stop()),
        BaseDamageComponent_1.Iqr.Start(),
        ExtraEffectDamageAccumulation_1.DamageAccumulation.ApplyEffects(
          e,
          a,
          t,
          this,
        ),
        BaseDamageComponent_1.Iqr.Stop());
    }
    Mqr(e, t) {
      var a = e.Attacker?.AttributeComponent;
      if (a && e.IsAddEnergy) {
        var o,
          r,
          i = e.SkillLevel,
          e = e.DamageData;
        for ([o, r] of [
          e.SpecialEnergy1,
          e.SpecialEnergy2,
          e.SpecialEnergy3,
          e.SpecialEnergy4,
          e.SpecialEnergy5,
        ].entries()) {
          var s = CharacterAttributeTypes_1.specialEnergyIds[o],
            n = AbilityUtils_1.AbilityUtils.GetLevelValue(r, i, 0);
          a.AddBaseValue(s, n);
        }
      }
    }
    mqr(t, e, a = 1) {
      var o = t.Attacker,
        r = e.AttackerSnapshot,
        e = e.TargetSnapshot,
        t =
          (BaseDamageComponent_1.Tqr.Start(),
          AbilityUtils_1.AbilityUtils.GetLevelValue(
            t.DamageData.ToughLv,
            t.SkillLevel,
            0,
          )),
        r =
          (BaseDamageComponent_1.Tqr.Stop(),
          BaseDamageComponent_1.Lqr.Start(),
          CharacterDamageCalculations_1.Calculation.ToughCalculation(
            r,
            e,
            t * a,
          ));
      if ((BaseDamageComponent_1.Lqr.Stop(), 0 !== r)) {
        BaseDamageComponent_1.Dqr.Start();
        let e = 1;
        t = this.Entity.GetComponent(0);
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          t.IsMonster() &&
          ((a = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize()) <=
            1 ||
            (e =
              a <= 2
                ? CommonParamById_1.configCommonParamById.GetFloatConfig(
                    "MutiWorldToughRatio2",
                  )
                : CommonParamById_1.configCommonParamById.GetFloatConfig(
                    "MutiWorldToughRatio3",
                  ))),
          this.AttributeComponent.AddBaseValue(
            CharacterAttributeTypes_1.EAttributeId.Proto_Tough,
            -r * e,
          ),
          BaseDamageComponent_1.Dqr.Stop();
      }
      return (
        BaseDamageComponent_1.Rqr.Start(),
        0 <
        this.AttributeComponent.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_Tough,
        )
          ? 0 < e.CurrentValues.Proto_ToughRecoverDelayTime &&
            0 !== r &&
            this.BuffComponent.AddBuff(
              CharacterBuffIds_1.buffId.ToughRecoverDelay,
              {
                InstigatorId:
                  o.CreatureDataComponent?.GetCreatureDataId() ??
                  ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
                ApplyType:
                  BaseAbilityComponent_1.EBuffApplyType.Proto_UseExtraTime,
                Reason: "韧性扣减后触发",
              },
            )
          : !this.TagComponent.HasTag(-1112841587) &&
            0 < e.CurrentValues.Proto_WeakTime &&
            (this.Uqr(!0),
            (t = this.AttributeComponent.GetCurrentValue(
              CharacterAttributeTypes_1.EAttributeId.Proto_WeakTime,
            )),
            (this.Zbr = TimerSystem_1.TimerSystem.Delay(() => {
              this.TagComponent &&
                (this.TagComponent.HasTag(31862857)
                  ? this.Aqr()
                  : this.Uqr(!1)),
                (this.Zbr = void 0);
            }, t)),
            this.AttributeComponent.SetBaseValue(
              CharacterAttributeTypes_1.EAttributeId.Proto_ToughRecover,
              0,
            )),
        BaseDamageComponent_1.Rqr.Stop(),
        r
      );
    }
    Uqr(e) {
      e
        ? this.TagComponent.AddTag(-1112841587)
        : (this.TagComponent.RemoveTag(-1112841587), this.zbr?.EndTask());
      var t = Protocol_1.Aki.Protocol.T4n.create();
      (t.F4n = this.Entity.GetComponent(0).GetCreatureDataId()),
        (t.o5n = e),
        CombatMessage_1.CombatNet.Call(25391, this.Entity, t, (e) => {
          e &&
            e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            (this.Zbr &&
              (TimerSystem_1.TimerSystem.Remove(this.Zbr), (this.Zbr = void 0)),
            this.TagComponent.RemoveTag(-1112841587));
        });
    }
    Aqr() {
      this.zbr = this.TagComponent.ListenForTagAddOrRemove(31862857, (e, t) => {
        t || this.Uqr(!1);
      });
    }
    TryExitWeakTime() {
      this.TagComponent.HasTag(-1112841587) &&
        (this.Zbr &&
          (TimerSystem_1.TimerSystem.Remove(this.Zbr), (this.Zbr = void 0)),
        this.Uqr(!1));
    }
    rqr() {
      this.zbr && (this.zbr.EndTask(), (this.zbr = void 0));
    }
    aqr(e) {
      var t = e.DamageData.Id,
        a = e.Attacker.Jbr?.GetSkillLevelByDamageId(t),
        t = e.Attacker.Entity.GetComponent(42)?.GetVisionLevelByDamageId(t);
      a && 0 < a ? (e.SkillLevel = a) : t && 0 < t && (e.SkillLevel = t);
    }
    AddToughModifier(e, t) {
      this.iqr.has(e) || this.iqr.set(e, new Map());
      e = this.iqr.get(e);
      e.set(t, 1 + (e.get(t) ?? 0));
    }
    RemoveToughModifier(e, t) {
      var a,
        e = this.iqr.get(e);
      e && (1 <= (a = e.get(t)) ? e.set(t, a - 1) : e.delete(t));
    }
    GetExtraToughRate(e) {
      var t,
        a,
        e = this.iqr.get(e);
      if (!e) return CharacterAttributeTypes_1.PER_TEN_THOUSAND;
      let o = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
      for ([t, a] of e.entries())
        0 < a &&
          (o *= Math.pow(t / CharacterAttributeTypes_1.PER_TEN_THOUSAND, a));
      return o;
    }
  });
(BaseDamageComponent.nqr = Stats_1.Stat.Create("ExecuteBulletDamage1")),
  (BaseDamageComponent.sqr = Stats_1.Stat.Create("ExecuteBulletDamage2")),
  (BaseDamageComponent.hqr = Stats_1.Stat.Create("ExecuteBulletDamage3")),
  (BaseDamageComponent.lqr = Stats_1.Stat.Create("ProcessDamage")),
  (BaseDamageComponent.pqr = Stats_1.Stat.Create("PreDamageCalculation")),
  (BaseDamageComponent.Eqr = Stats_1.Stat.Create("EventCharDamage")),
  (BaseDamageComponent.Sqr = Stats_1.Stat.Create("PostExecDamageResult1")),
  (BaseDamageComponent.yqr = Stats_1.Stat.Create("PostExecDamageResult2")),
  (BaseDamageComponent.Iqr = Stats_1.Stat.Create("PostExecDamageResult3")),
  (BaseDamageComponent.Tqr = Stats_1.Stat.Create("ExecToughReduce1")),
  (BaseDamageComponent.Lqr = Stats_1.Stat.Create("ExecToughReduce2")),
  (BaseDamageComponent.Dqr = Stats_1.Stat.Create("ExecToughReduce3")),
  (BaseDamageComponent.Rqr = Stats_1.Stat.Create("ExecToughReduce4")),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("EFn", !1)],
    BaseDamageComponent,
    "OnDamageExecuteNotify",
    null,
  ),
  (BaseDamageComponent = BaseDamageComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(19)],
      BaseDamageComponent,
    )),
  (exports.BaseDamageComponent = BaseDamageComponent);
//# sourceMappingURL=BaseDamageComponent.js.map
