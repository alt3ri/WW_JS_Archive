"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Skill = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const CombatLog_1 = require("../../../../../Utils/CombatLog"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  MONTAGE_BLEND_TIME = 0.2;
class Skill {
  constructor() {
    (this.Dzo = void 0),
      (this.Rzo = void 0),
      (this.Uzo = void 0),
      (this.Azo = void 0),
      (this.Pzo = void 0),
      (this.xzo = void 0),
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
      (this.$zo = s.Entity.GetComponent(159)),
      (this.Lie = s.Entity.GetComponent(188)),
      (this.oRe = s.Entity.GetComponent(162)),
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
                (this.CombatMessageId = this.pya()))
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
            (t = this.cBe.Entity.GetComponent(17)),
            (this.Hzo = t.GetAbility(this.Vzo)))
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
  Jzo() {
    if (0 < this.SkillInfo.Animations.Num()) {
      this.jzo = new Array(this.SkillInfo.Animations.Num());
      for (let t = 0; t < this.SkillInfo.Animations.Num(); ++t) {
        const o = this.SkillInfo.Animations.Get(t);
        if (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(o)) {
          var i = UE.KismetSystemLibrary.Conv_SoftObjPathToSoftObjRef(o);
          const a = t;
          var s = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            i.ToAssetPathName(),
            UE.AnimMontage,
          );
          s?.IsValid()
            ? (this.jzo[a] = s)
            : ResourceSystem_1.ResourceSystem.LoadAsync(
                i.ToAssetPathName(),
                UE.AnimMontage,
                (t) => {
                  t?.IsValid()
                    ? (this.jzo[a] = t)
                    : CombatLog_1.CombatLog.Warn(
                        "Skill",
                        this.cBe.Entity,
                        "蒙太奇加载失败，请检查Animations蒙太奇软路径对象",
                        ["技能Id", this.SkillId],
                        ["技能名", this.SkillName],
                        ["索引", a],
                        ["AssetNamePath", o.AssetPathName],
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
    } else if (0 < this.SkillInfo.MontagePaths.Num()) {
      let i = !1;
      for (let t = 0; t < this.SkillInfo.MontagePaths.Num(); ++t) {
        var e = this.SkillInfo.MontagePaths.Get(t);
        (e && 0 !== e.length) ||
          ((i = !0),
          CombatLog_1.CombatLog.Warn(
            "Skill",
            this.cBe.Entity,
            "蒙太奇路径为空，请设置MontagePaths蒙太奇路径",
            ["技能Id", this.SkillId],
            ["技能名", this.SkillName],
            ["索引", t],
          ));
      }
      if (!i) {
        this.jzo = new Array(this.SkillInfo.MontagePaths.Num());
        var t = this.cBe.Entity.GetComponent(3).Actor,
          t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
            t.GetClass(),
          ),
          h = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t);
        for (let t = 0; t < this.SkillInfo.MontagePaths.Num(); ++t) {
          var r = this.SkillInfo.MontagePaths.Get(t);
          const l = ConfigManager_1.ConfigManager.WorldConfig.GetSkillMontage(
            h,
            r,
          );
          if (
            l &&
            0 !== l.ToAssetPathName().length &&
            "None" !== l.ToAssetPathName()
          ) {
            const f = t;
            r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              l.ToAssetPathName(),
              UE.AnimMontage,
            );
            r?.IsValid()
              ? (this.jzo[f] = r)
              : ResourceSystem_1.ResourceSystem.LoadAsync(
                  l.ToAssetPathName(),
                  UE.AnimMontage,
                  (t) => {
                    t?.IsValid()
                      ? (this.jzo[f] = t)
                      : CombatLog_1.CombatLog.Warn(
                          "Skill",
                          this.cBe.Entity,
                          "蒙太奇加载失败，请检查MontagePaths蒙太奇路径",
                          ["技能Id", this.SkillId],
                          ["技能名", this.SkillName],
                          ["索引", f],
                          ["AssetNamePath", l.ToAssetPathName()],
                        );
                  },
                );
          }
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
    this.Xzo = i;
    var t = this.$zo.AddTagWithReturnHandle(this.SkillTagIds);
    if (
      (this.Wzo.push(t),
      1 === this.SkillInfo.GroupId &&
        (this.SkillInfo.IsFullBodySkill
          ? this.Lie.AddTag(1996624497)
          : this.Lie.AddTag(704115290)),
      !this.IsSimulated)
    ) {
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
    }
  }
  EndSkill() {
    if (!this.Active) return !1;
    if (
      ((this.SkillInfo.InterruptLevel = this.Qzo),
      (this.qzo = !1),
      (this.ActiveAbility = void 0),
      this.cBe.FightStateComp?.ExitState(this.FightStateHandle),
      ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
        this.MontageContextId,
      ),
      this.eZo(),
      this.Zzo(),
      this.Wzo.forEach((t) => {
        this.$zo.RemoveBuffByHandle(t, -1, "技能结束移除");
      }),
      (this.Wzo.length = 0),
      1 === this.SkillInfo.GroupId &&
        (this.SkillInfo.IsFullBodySkill
          ? this.Lie.RemoveTag(1996624497)
          : this.Lie.RemoveTag(704115290)),
      !this.IsSimulated)
    )
      for (let t = 0; t < this.SkillInfo.SkillEndBuff.Num(); ++t)
        this.$zo.AddBuff(this.SkillInfo.SkillEndBuff.Get(t), {
          InstigatorId: this.$zo.CreatureDataId,
          Level: this.Xzo,
          Reason: `技能${this.SkillId}结束时添加`,
          PreMessageId: this.CombatMessageId,
        });
    return !0;
  }
  SimulatedBeginSkill(t) {
    return (
      !this.Active &&
      ((this.qzo = !0),
      (this.Gzo = !0),
      (this.CombatMessageId =
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
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
  PlayMontage(t, i, s, e, h) {
    var r;
    return !this.jzo || t >= this.jzo.length
      ? (CombatLog_1.CombatLog.Error(
          "Skill",
          this.cBe.Entity,
          "播放的蒙太奇索引不存在",
          ["技能id:", this.SkillId],
          ["技能名:", this.SkillName],
          ["index:", t],
        ),
        !1)
      : !!(r = this.jzo[t])?.IsValid() &&
          ((s = s
            ? FNameUtil_1.FNameUtil.GetDynamicFName(s)
            : FNameUtil_1.FNameUtil.EMPTY),
          (this.wzo = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
            this.oRe.MainAnimInstance,
            r,
            i,
            e,
            s,
          )),
          this.wzo.EndCallback.Add((t) => {
            h?.(t);
          }),
          (this.Bzo = h),
          ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
            this.MontageContextId,
          ),
          (this.MontageContextId =
            ModelManager_1.ModelManager.CombatMessageModel.CreateMontageContext(
              this.SkillId,
              t,
            )),
          !0);
  }
  eZo() {
    var t;
    this.wzo &&
      ((t = this.wzo.MontageToPlay),
      this.wzo.EndTask(),
      (this.wzo = void 0),
      this.oRe.MainAnimInstance.Montage_Stop(MONTAGE_BLEND_TIME, t));
  }
  RequestStopMontage() {
    this.Bzo?.(!0), (this.Bzo = void 0);
  }
  SetEffectHidden(t) {
    for (const i of this.Kzo.values())
      for (const s of i)
        EffectSystem_1.EffectSystem.IsValid(s.EffectHandle) &&
          EffectSystem_1.EffectSystem.GetEffectActor(
            s.EffectHandle,
          ).SetActorHiddenInGame(t);
  }
  pya() {
    var t = this.cBe.Entity.GetComponent(0).ComponentDataMap.get("Bys")?.Bys;
    if (t && t.BLa)
      for (const i of t.BLa)
        if (this.SkillId === i.X4n)
          return MathUtils_1.MathUtils.LongToBigInt(i.tVn);
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
