"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Skill = void 0);
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
  MONTAGE_BLEND_TIME = 0.2;
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
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
      (this.CombatMessageId = void 0),
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
      (this.Wzo = []),
      (this.Kzo = new Map()),
      (this.Qzo = 0),
      (this.Xzo = 0),
      (this.cBe = void 0),
      (this.$zo = void 0),
      (this.Lie = void 0),
      (this.oRe = void 0);
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
  Initialize(t, i, s) {
    (this.cBe = s),
      (this.$zo = s.Entity.GetComponent(160)),
      (this.Lie = s.Entity.GetComponent(190)),
      (this.oRe = s.Entity.GetComponent(163)),
      (this.bzo = t),
      (this.Nzo = i),
      (this.qzo = !1),
      (this.Qzo = i.InterruptLevel);
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
        (this.cBe.Entity.GetComponent(17).ClearAbility(this.Hzo),
        (this.Hzo = void 0)),
      (this.cBe = void 0),
      (this.$zo = void 0),
      (this.Lie = void 0),
      (this.oRe = void 0),
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
          ? (this.Vzo.IsChildOf(UE.Ga_Passive_C.StaticClass())
              ? (this.cBe.SetGaPassiveClassToSkillMap(this.Vzo, this.SkillId),
                (this.CombatMessageId = this.jLa()))
              : (t = UE.KuroStaticLibrary.GetDefaultObject(this.Vzo))
                  .AbilityTriggers &&
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
            this.GiveAbility())
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
  GiveAbility() {
    var t;
    this.Vzo &&
      ((t = this.cBe.Entity.GetComponent(17)),
      (this.Hzo = t.GetAbility(this.Vzo)));
  }
  Jzo() {
    if (0 < this.SkillInfo.Animations.Num()) {
      this.jzo = new Array(this.SkillInfo.Animations.Num());
      for (let t = 0; t < this.SkillInfo.Animations.Num(); ++t) {
        const a = this.SkillInfo.Animations.Get(t);
        if (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(a)) {
          var i = UE.KismetSystemLibrary.Conv_SoftObjPathToSoftObjRef(a);
          const o = t;
          var s = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            i.ToAssetPathName(),
            UE.AnimMontage,
          );
          s?.IsValid()
            ? (this.jzo[o] = s)
            : ResourceSystem_1.ResourceSystem.LoadAsync(
                i.ToAssetPathName(),
                UE.AnimMontage,
                (t) => {
                  t?.IsValid()
                    ? (this.jzo[o] = t)
                    : CombatLog_1.CombatLog.Warn(
                        "Skill",
                        this.cBe.Entity,
                        "蒙太奇加载失败，请检查Animations蒙太奇软路径对象",
                        ["技能Id", this.SkillId],
                        ["技能名", this.SkillName],
                        ["索引", o],
                        ["AssetNamePath", a.AssetPathName],
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
            ["索引", t],
          );
      }
    } else {
      var e = this.SkillInfo.MontagePaths;
      if (0 < e.Num()) {
        var h = this.cBe.Entity.GetComponent(22);
        let i = !1;
        this.jzo = new Array(this.SkillInfo.MontagePaths.Num());
        for (let t = 0; t < e.Num(); ++t) {
          var r = e.Get(t);
          if (
            ((r && 0 !== r.length) ||
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
          r = h?.GetMontageByName(e.Get(t));
          r && (this.jzo[t] = r);
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
    return !(
      this.Active ||
      ((this.qzo = !0),
      (this.Gzo = !1),
      (this.CombatMessageId =
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      (this.MontageContextId = void 0))
    );
  }
  BeginSkillBuffAndTag(i) {
    (this.Xzo = i), this.Dzo.Start();
    var t = this.$zo.AddTagWithReturnHandle(this.SkillTagIds);
    if (
      (this.Wzo.push(t),
      this.Dzo.Stop(),
      1 === this.SkillInfo.GroupId &&
        (this.Rzo.Start(),
        this.SkillInfo.IsFullBodySkill
          ? this.Lie.AddTag(1996624497)
          : this.Lie.AddTag(704115290),
        this.Rzo.Stop()),
      !this.IsSimulated)
    ) {
      this.Uzo.Start(),
        0 < Math.abs(this.SkillInfo.StrengthCost) &&
          ((t = this.$zo.AddBuffLocal(
            CharacterBuffIds_1.buffId.SkillStrengthForbidden,
            {
              InstigatorId: this.$zo.CreatureDataId,
              Reason: `技能${this.SkillId}存在体力消耗`,
              PreMessageId: this.CombatMessageId,
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
            PreMessageId: this.CombatMessageId,
          })),
          this.Wzo.push(t));
      for (let t = 0; t < this.SkillInfo.SkillBuff.Num(); ++t) {
        var s = this.$zo.AddBuffLocal(this.SkillInfo.SkillBuff.Get(t), {
          InstigatorId: this.$zo.CreatureDataId,
          Level: i,
          Reason: `技能${this.SkillId}通过技能期间生效的GE添加`,
          PreMessageId: this.CombatMessageId,
        });
        this.Wzo.push(s);
      }
      for (let t = 0; t < this.SkillInfo.SkillStartBuff.Num(); ++t)
        this.$zo.AddBuff(this.SkillInfo.SkillStartBuff.Get(t), {
          InstigatorId: this.$zo.CreatureDataId,
          Level: i,
          Reason: `技能${this.SkillId}开始时添加`,
          PreMessageId: this.CombatMessageId,
        });
      this.Uzo.Stop();
    }
  }
  EndSkill() {
    if (!this.Active) return !1;
    if (
      ((this.SkillInfo.InterruptLevel = this.Qzo),
      (this.qzo = !1),
      (this.ActiveAbility = void 0),
      this.cBe.FightStateComp?.ExitState(this.FightStateHandle),
      this.eZo(),
      this.Zzo(),
      this.Azo.Start(),
      this.Wzo.forEach((t) => {
        this.$zo.RemoveBuffByHandle(t, -1, "技能结束移除");
      }),
      (this.Wzo.length = 0),
      this.Azo.Stop(),
      1 === this.SkillInfo.GroupId &&
        (this.Pzo.Start(),
        this.SkillInfo.IsFullBodySkill
          ? this.Lie.RemoveTag(1996624497)
          : this.Lie.RemoveTag(704115290),
        this.Pzo.Stop()),
      !this.IsSimulated)
    ) {
      this.xzo.Start();
      for (let t = 0; t < this.SkillInfo.SkillEndBuff.Num(); ++t)
        this.$zo.AddBuff(this.SkillInfo.SkillEndBuff.Get(t), {
          InstigatorId: this.$zo.CreatureDataId,
          Level: this.Xzo,
          Reason: `技能${this.SkillId}结束时添加`,
          PreMessageId: this.CombatMessageId,
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
      (this.CombatMessageId = t),
      this.BeginSkillBuffAndTag(0),
      !0)
    );
  }
  SetTimeDilation(t, i) {
    for (const s of this.Kzo.values())
      if (s)
        for (const e of s)
          EffectSystem_1.EffectSystem.IsValid(e.EffectHandle) &&
            EffectSystem_1.EffectSystem.SetTimeScale(e.EffectHandle, t * i);
  }
  SetSkillPriority(t) {
    this.SkillInfo && (this.SkillInfo.InterruptLevel = t);
  }
  PlayMontage(t, i, s, e, h, r) {
    var a;
    return !this.jzo || t >= this.jzo.length
      ? (CombatLog_1.CombatLog.Error(
          "Skill",
          this.cBe.Entity,
          "播放的蒙太奇索引不存在",
          ["技能id:", this.SkillId],
          ["技能名:", this.SkillName],
          ["index", t],
        ),
        !1)
      : !!(a = this.jzo[t])?.IsValid() &&
          ((s = s
            ? FNameUtil_1.FNameUtil.GetDynamicFName(s)
            : FNameUtil_1.FNameUtil.EMPTY),
          (this.wzo = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
            this.oRe.MainAnimInstance,
            a,
            i,
            e,
            s,
          )),
          (this.Bzo = h),
          this.wzo.EndCallback.Add((t) => {
            this.RequestStopMontage(t);
          }),
          this.cBe.MontageComp?.PushMontageInfo(
            { MontageName: [], SkillId: this.SkillId, MontageIndex: t },
            a,
          ),
          (this.MontageContextId =
            r ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
          !0);
  }
  eZo() {
    var t;
    this.wzo &&
      ((t = this.wzo.MontageToPlay),
      this.wzo.EndTask(),
      (this.wzo = void 0),
      this.oRe.MainAnimInstance.Montage_Stop(MONTAGE_BLEND_TIME, t),
      this.RequestStopMontage(!0));
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
  jLa() {
    var t = this.cBe.Entity.GetComponent(0).ComponentDataMap.get("Vys")?.Vys;
    if (t && t.Vih)
      for (const i of t.Vih)
        if (this.SkillId === i.r5n)
          return MathUtils_1.MathUtils.LongToBigInt(i._Vn);
    CombatLog_1.CombatLog.Error(
      "Skill",
      this.cBe.Entity,
      "GetGaPassiveSkillMessage",
      ["技能Id", this.SkillId],
    );
  }
}
exports.Skill = Skill;
//# sourceMappingURL=Skill.js.map
