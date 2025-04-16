"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Skill = exports.MONTAGE_DEFAULT_INDEX = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds"),
  ExtraEffectAddBattleFlag_1 = require("../Abilities/ExtraEffect/ExtraEffectAddBattleFlag"),
  BaseSkillComponent_1 = require("./BaseSkillComponent"),
  EndSkillInfo_1 = require("./EndSkillInfo");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
exports.MONTAGE_DEFAULT_INDEX = -1;
const MONTAGE_BLEND_TIME = 0.2;
class Skill {
  constructor() {
    (this.Dzo = Stats_1.Stat.Create("Add Spec Tag")),
      (this.Rzo = Stats_1.Stat.Create("Add InSkill Tag")),
      (this.Uzo = Stats_1.Stat.Create("Add Spec Buff")),
      (this.Azo = Stats_1.Stat.Create("Remove Spec Buff&Tag")),
      (this.Pzo = Stats_1.Stat.Create("Remove InSkill Tag")),
      (this.xzo = Stats_1.Stat.Create("Add Spec EndBuff")),
      (this.ActiveAbility = void 0),
      (this.wzo = void 0),
      (this.Bzo = void 0),
      (this.MontageContextId = void 0),
      (this.PreContextId = void 0),
      (this.BFc = void 0),
      (this.BattleFlags = []),
      (this.SkillBehaviorAnimNotifyMessageId = void 0),
      (this.FightStateHandle = 0),
      (this.bzo = 0),
      (this.qzo = !1),
      (this.Gzo = !1),
      (this.Nzo = void 0),
      (this.GroupSkillCdInfo = void 0),
      (this.kzo = []),
      (this.Fzo = !1),
      (this.Vzo = void 0),
      (this.Hzo = void 0),
      (this.jzo = void 0),
      (this.CurrentMontageIndex = exports.MONTAGE_DEFAULT_INDEX),
      (this.Wzo = []),
      (this.Kzo = new Map()),
      (this.oGl = 0),
      (this.Xzo = 0),
      (this.EndSkillInfo = void 0),
      (this.cBe = void 0),
      (this.$zo = void 0),
      (this.Lie = void 0);
  }
  get LFc() {
    return this.BFc;
  }
  set LFc(t) {
    (this.BFc = t),
      ExtraEffectAddBattleFlag_1.AddBattleFlag.ApplyEffects(
        this.cBe.Entity,
        this,
      );
  }
  get SkillId() {
    return this.bzo;
  }
  get Active() {
    return this.qzo;
  }
  get IsSimulated() {
    return this.Gzo;
  }
  get SkillInfo() {
    return this.Nzo;
  }
  get SkillName() {
    return this.Nzo.SkillName.toString();
  }
  get SkillTagIds() {
    return this.kzo;
  }
  HasAnimTag() {
    return this.Fzo;
  }
  get AbilityClass() {
    return this.Vzo;
  }
  get HasMontages() {
    return !!this.jzo && 0 < this.jzo.length;
  }
  GetMontageByIndex(t) {
    if (this.jzo && !(t < 0 || t >= this.jzo.length)) return this.jzo[t];
  }
  get InterruptLevel() {
    return this.oGl;
  }
  set InterruptLevel(t) {
    this.oGl = t;
  }
  Initialize(t, i, s) {
    (this.cBe = s),
      (this.$zo = s.Entity.GetComponent(172)),
      (this.Lie = s.Entity.GetComponent(203)),
      (this.bzo = t),
      (this.Nzo = i),
      (this.qzo = !1),
      (this.EndSkillInfo = new EndSkillInfo_1.EndSkillInfo()),
      (this.oGl = i.InterruptLevel);
    for (let t = i.SkillTag.Num() - 1; 0 <= t; t--) {
      var e = i.SkillTag.Get(t),
        e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e?.TagName);
      -897737980 === e && (this.Fzo = !0), this.kzo.push(e);
    }
    1 === i.SkillMode && this.Yzo(), this.Jzo();
  }
  Clear() {
    return (
      this.Active && this.EndSkill(),
      this.Hzo &&
        (this.cBe.Entity.GetComponent(18).ClearAbility(this.Hzo),
        (this.Hzo = void 0)),
      (this.cBe = void 0),
      (this.$zo = void 0),
      (this.Lie = void 0),
      (this.Nzo = void 0),
      (this.ActiveAbility = void 0),
      (this.wzo = void 0),
      (this.qzo = !1),
      (this.GroupSkillCdInfo = void 0),
      (this.jzo = void 0),
      !(this.Vzo = void 0)
    );
  }
  Yzo() {
    var t,
      i = this.SkillInfo.SkillGA.AssetPathName.toString();
    i && 0 < i.length && "None" !== i
      ? ((this.Vzo = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          i,
          UE.Class,
        )),
        this.Vzo
          ? ((t = UE.KuroStaticLibrary.GetDefaultObject(this.Vzo)),
            this.Vzo.IsChildOf(UE.Ga_Passive_C.StaticClass())
              ? (this.cBe.SetGaPassiveClassToSkillMap(this.Vzo, this.SkillId),
                (this.LFc = this.$La()))
              : t.AbilityTriggers &&
                0 < t.AbilityTriggers.Num() &&
                CombatLog_1.CombatLog.Error(
                  "Skill",
                  this.cBe.Entity,
                  "被动技能未继承自Ga_Passive",
                  ["技能Id", this.SkillId],
                  ["技能名", this.SkillName],
                  ["GA", this.SkillInfo.SkillGA],
                  ["GA Path", i],
                ),
            this.zI1(),
            t.StartOnGiven && this.cBe.StartOnGivenList.push(this.SkillId))
          : CombatLog_1.CombatLog.Error(
              "Skill",
              this.cBe.Entity,
              "加载技能GA失败，GA未加载",
              ["技能Id", this.SkillId],
              ["技能名", this.SkillName],
              ["GA", this.SkillInfo.SkillGA],
              ["GA Path", i],
            ))
      : CombatLog_1.CombatLog.Error(
          "Skill",
          this.cBe.Entity,
          "加载技能GA失败，GA路径为空",
          ["技能Id", this.SkillId],
          ["技能名", this.SkillName],
          ["GA", this.SkillInfo.SkillGA],
          ["GA Path", i],
        );
  }
  zI1() {
    var t;
    this.Vzo &&
      ((t = this.cBe.Entity.GetComponent(18)),
      (this.Hzo = t.GetAbility(this.Vzo)));
  }
  Jzo() {
    if (0 < this.SkillInfo.Animations.Num()) {
      this.jzo = new Array(this.SkillInfo.Animations.Num());
      var s = this.cBe?.Entity.GetComponent(3);
      for (let i = 0; i < this.SkillInfo.Animations.Num(); ++i) {
        const l = this.SkillInfo.Animations.Get(i);
        if (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(l)) {
          var e = UE.KismetSystemLibrary.Conv_SoftObjPathToSoftObjRef(l);
          const f = i;
          let t = e.ToAssetPathName();
          s && (t = s.GetReplaceMontage(t) ?? t);
          var h = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            t,
            UE.AnimMontage,
          );
          h?.IsValid()
            ? (this.jzo[f] = h)
            : ResourceSystem_1.ResourceSystem.LoadAsync(
                e.ToAssetPathName(),
                UE.AnimMontage,
                (t) => {
                  t?.IsValid()
                    ? (this.jzo[f] = t)
                    : CombatLog_1.CombatLog.Warn(
                        "Skill",
                        this.cBe.Entity,
                        "蒙太奇加载失败，请检查Animations蒙太奇软路径对象",
                        ["技能Id", this.SkillId],
                        ["技能名", this.SkillName],
                        ["索引", f],
                        ["AssetNamePath", l.AssetPathName],
                      );
                },
              );
        } else
          CombatLog_1.CombatLog.Warn(
            "Skill",
            this.cBe.Entity,
            "蒙太奇软路径对象无效，请设置Animations蒙太奇软路径对象",
            ["技能Id", this.SkillId],
            ["技能名", this.SkillName],
            ["索引", i],
          );
      }
    } else {
      var r = this.SkillInfo.MontagePaths;
      if (0 < r.Num()) {
        var a = this.cBe.Entity.GetComponent(25);
        let i = !1;
        this.jzo = new Array(this.SkillInfo.MontagePaths.Num());
        for (let t = 0; t < r.Num(); ++t) {
          var o = r.Get(t);
          if (
            ((o && 0 !== o.length) ||
              ((i = !0),
              CombatLog_1.CombatLog.Warn(
                "Skill",
                this.cBe.Entity,
                "蒙太奇路径为空，请设置MontagePaths蒙太奇路径",
                ["技能Id", this.SkillId],
                ["技能名", this.SkillName],
                ["索引", t],
              )),
            i)
          )
            return;
          o = a?.GetMontageByName(r.Get(t));
          o && (this.jzo[t] = o);
        }
      }
    }
  }
  AttachEffect(t, i, s, e) {
    let h = this.Kzo.get(i);
    s = { BoneName: s, EffectHandle: t, WhenSkillEndEnableTime: e };
    h ? h.push(s) : ((h = []).push(s), this.Kzo.set(i, h));
  }
  zzo(t, i, s) {
    if (
      EffectSystem_1.EffectSystem.IsValid(i) &&
      (EffectSystem_1.EffectSystem.SetTimeScale(i, 1),
      !(0 < s && EffectSystem_1.EffectSystem.GetTotalPassTime(i) > s))
    ) {
      var e = EffectSystem_1.EffectSystem.GetSureEffectActor(i);
      switch (t) {
        case 2:
          e && e.K2_DetachFromActor(1, 1, 1),
            EffectSystem_1.EffectSystem.StopEffectById(
              i,
              "[Skill.EffectsProcess] Detach",
              !1,
            );
          break;
        case 4:
          e &&
            (e.K2_DetachFromActor(1, 1, 1),
            EffectSystem_1.EffectSystem.StopEffectById(
              i,
              "[Skill.EffectsProcess] DetachDestroy",
              !0,
            ));
          break;
        case 3:
          e &&
            (e.K2_DetachFromActor(1, 1, 1),
            EffectSystem_1.EffectSystem.StopEffectById(
              i,
              "[Skill.EffectsProcess] DetachEnd",
              !1,
            ));
          break;
        case 6:
          EffectSystem_1.EffectSystem.StopEffectById(
            i,
            "[Skill.EffectsProcess] UnDetachDestroy",
            !0,
          );
          break;
        case 5:
          EffectSystem_1.EffectSystem.StopEffectById(
            i,
            "[Skill.EffectsProcess] UnDetachEnd",
            !1,
          );
      }
    }
  }
  Zzo() {
    if (this.Kzo) {
      for (var [i, s] of this.Kzo)
        for (let t = s.length - 1; 0 <= t; t--) {
          var e = s.pop(),
            h = e.EffectHandle;
          this.zzo(i, h, e.WhenSkillEndEnableTime);
        }
      this.Kzo.clear();
    }
  }
  BeginSkill() {
    return (
      !this.Active &&
      ((this.CurrentMontageIndex = exports.MONTAGE_DEFAULT_INDEX),
      (this.qzo = !0),
      (this.Gzo = !1),
      (this.LFc =
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      (this.MontageContextId = void 0),
      this.EndSkillInfo?.Reset(),
      !0)
    );
  }
  BeginSkillBuffAndTag(i) {
    if (
      ((this.Xzo = i),
      this.Dzo.Start(),
      this.$zo &&
        ((t = this.$zo.AddTagWithReturnHandle(this.SkillTagIds)),
        this.Wzo.push(t)),
      this.Dzo.Stop(),
      this.Lie &&
        this.SkillInfo.GroupId === BaseSkillComponent_1.SKILL_GROUP_MAIN &&
        (this.Rzo.Start(),
        this.SkillInfo.IsFullBodySkill
          ? this.Lie.AddTag(1996624497)
          : this.Lie.AddTag(704115290),
        this.Rzo.Stop()),
      this.$zo && !this.IsSimulated)
    ) {
      this.Uzo.Start(),
        0 < Math.abs(this.SkillInfo.StrengthCost) &&
          ((t = this.$zo.AddBuffLocal(
            CharacterBuffIds_1.buffId.SkillStrengthForbidden,
            {
              InstigatorId: this.$zo.CreatureDataId,
              Reason: `技能${this.SkillId}存在体力消耗`,
              PreMessageId: this.LFc,
            },
          )),
          this.Wzo.push(t));
      var t = this.$zo.AddAttributeRateModifierLocal(
        EAttributeId.Proto_SkillToughRatio,
        this.SkillInfo.ToughRatio - 1,
        `技能${this.SkillId}技能状态韧性系数`,
      );
      this.Wzo.push(t),
        0 < this.SkillInfo.ImmuneFallDamageTime &&
          ((t = this.$zo.AddBuffLocal(CharacterBuffIds_1.buffId.FallImmune, {
            InstigatorId: this.$zo.CreatureDataId,
            Duration: this.SkillInfo.ImmuneFallDamageTime,
            Reason: `技能${this.SkillId}跌落伤害保护`,
            PreMessageId: this.LFc,
          })),
          this.Wzo.push(t));
      for (let t = 0; t < this.SkillInfo.SkillBuff.Num(); ++t) {
        var s = this.$zo.AddBuffLocal(Number(this.SkillInfo.SkillBuff.Get(t)), {
          InstigatorId: this.$zo.CreatureDataId,
          Level: i,
          Reason: `技能${this.SkillId}通过技能期间生效的GE添加`,
          PreMessageId: this.LFc,
        });
        this.Wzo.push(s);
      }
      for (let t = 0; t < this.SkillInfo.SkillStartBuff.Num(); ++t)
        this.$zo.AddBuff(Number(this.SkillInfo.SkillStartBuff.Get(t)), {
          InstigatorId: this.$zo.CreatureDataId,
          Level: i,
          Reason: `技能${this.SkillId}开始时添加`,
          PreMessageId: this.LFc,
        });
      this.Uzo.Stop();
    }
  }
  EndSkill() {
    if (!this.Active) return !1;
    if (
      ((this.InterruptLevel = this.SkillInfo.InterruptLevel),
      (this.qzo = !1),
      (this.ActiveAbility = void 0),
      this.cBe.FightStateComp?.ExitState(this.FightStateHandle),
      this.eZo(),
      this.Zzo(),
      this.Azo.Start(),
      this.Wzo.forEach((t) => {
        this.$zo?.RemoveBuffByHandle(t, -1, "技能结束移除");
      }),
      (this.Wzo.length = 0),
      this.Azo.Stop(),
      this.Lie &&
        this.SkillInfo.GroupId === BaseSkillComponent_1.SKILL_GROUP_MAIN &&
        (this.Pzo.Start(),
        this.SkillInfo.IsFullBodySkill
          ? this.Lie.RemoveTag(1996624497)
          : this.Lie.RemoveTag(704115290),
        this.Pzo.Stop()),
      this.$zo && !this.IsSimulated)
    ) {
      this.xzo.Start();
      for (let t = 0; t < this.SkillInfo.SkillEndBuff.Num(); ++t)
        this.$zo.AddBuff(Number(this.SkillInfo.SkillEndBuff.Get(t)), {
          InstigatorId: this.$zo.CreatureDataId,
          Level: this.Xzo,
          Reason: `技能${this.SkillId}结束时添加`,
          PreMessageId: this.LFc,
        });
      this.xzo.Stop();
    }
    return !0;
  }
  SimulatedBeginSkill(t) {
    return (
      !this.Active &&
      ((this.qzo = !0),
      (this.Gzo = !0),
      (this.LFc = t),
      this.BeginSkillBuffAndTag(0),
      !0)
    );
  }
  SetTimeDilation(t, i) {
    for (const s of this.Kzo.values())
      if (s)
        for (const e of s)
          EffectSystem_1.EffectSystem.IsValid(e.EffectHandle) &&
            EffectSystem_1.EffectSystem.SetTimeScale(e.EffectHandle, t * i, !0);
  }
  PlayMontage(t, i, s, e, h, r) {
    if (!this.jzo || t >= this.jzo.length)
      return (
        CombatLog_1.CombatLog.Error(
          "Skill",
          this.cBe.Entity,
          "播放的蒙太奇索引不存在",
          ["技能id:", this.SkillId],
          ["技能名:", this.SkillName],
          ["index", t],
        ),
        !1
      );
    var a = this.jzo[t];
    if (!a?.IsValid()) return !1;
    this.CurrentMontageIndex = t;
    s = s
      ? FNameUtil_1.FNameUtil.GetDynamicFName(s)
      : FNameUtil_1.FNameUtil.EMPTY;
    return (
      (this.wzo = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
        this.cBe.GetMainAnimInstance(),
        a,
        i,
        e,
        s,
      )),
      this.wzo.EndCallback.Add((t) => {
        h?.(t);
      }),
      (this.Bzo = h),
      (this.MontageContextId =
        r ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      this.cBe.MontageComp?.PushMontageInfo(
        {
          MontageNames: [],
          SkillId: this.SkillId,
          MontageIndex: t,
          MontageTaskMessageId: this.MontageContextId,
        },
        a,
      ),
      !0
    );
  }
  eZo() {
    var t;
    this.wzo &&
      ((t = this.wzo.MontageToPlay),
      this.wzo.EndTask(),
      (this.wzo = void 0),
      this.cBe.GetMainAnimInstance().Montage_Stop(MONTAGE_BLEND_TIME, t)),
      (this.Bzo = void 0);
  }
  RequestStopMontage(t) {
    var i;
    this.Bzo && ((i = this.Bzo), (this.Bzo = void 0), i?.(t));
  }
  SetEffectHidden(t) {
    for (const i of this.Kzo.values())
      for (const s of i)
        EffectSystem_1.EffectSystem.IsValid(s.EffectHandle) &&
          EffectSystem_1.EffectSystem.SetEffectHidden(
            s.EffectHandle,
            t,
            "Skill",
          );
  }
  $La() {
    var t = this.cBe.Entity.GetComponent(0).ComponentDataMap.get("Vys")?.Vys;
    if (t && t.pI_)
      for (const i of t.pI_)
        if (this.SkillId === i.r5n)
          return MathUtils_1.MathUtils.LongToBigInt(i._Vn);
    CombatLog_1.CombatLog.Error(
      "Skill",
      this.cBe.Entity,
      "未找到服务器对应被动ga技能的上下文，检查该技能是否有导出给服务器",
      ["技能Id", this.SkillId],
    );
  }
}
exports.Skill = Skill;
//# sourceMappingURL=Skill.js.map
