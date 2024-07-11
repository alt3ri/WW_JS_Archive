"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Skill = void 0);
const UE = require("ue");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils");
const EffectSystem_1 = require("../../../../../Effect/EffectSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
const CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
const SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController");
const MONTAGE_BLEND_TIME = 0.2;
class Skill {
  constructor() {
    (this.AJo = void 0),
      (this.PJo = void 0),
      (this.xJo = void 0),
      (this.wJo = void 0),
      (this.BJo = void 0),
      (this.bJo = void 0),
      (this.ActiveAbility = void 0),
      (this.qJo = void 0),
      (this.GJo = void 0),
      (this.MontageContextId = void 0),
      (this.PreContextId = void 0),
      (this.CombatMessageId = void 0),
      (this.FightStateHandle = 0),
      (this.NJo = 0),
      (this.OJo = !1),
      (this.kJo = !1),
      (this.FJo = void 0),
      (this.GroupSkillCdInfo = void 0),
      (this.HJo = []),
      (this.jJo = !1),
      (this.WJo = void 0),
      (this.KJo = void 0),
      (this.QJo = void 0),
      (this.XJo = []),
      (this.$Jo = new Map()),
      (this.YJo = 0),
      (this.JJo = 0),
      (this.cBe = void 0),
      (this.zJo = void 0),
      (this.Lie = void 0),
      (this.oRe = void 0);
  }
  get SkillId() {
    return this.NJo;
  }
  get Active() {
    return this.OJo;
  }
  get IsSimulated() {
    return this.kJo;
  }
  get SkillInfo() {
    return this.FJo;
  }
  get SkillName() {
    return this.FJo.SkillName.toString();
  }
  get SkillTagIds() {
    return this.HJo;
  }
  HasAnimTag() {
    return this.jJo;
  }
  get AbilityClass() {
    return this.WJo;
  }
  get HasMontages() {
    return !!this.QJo && this.QJo.length > 0;
  }
  GetMontageByIndex(t) {
    if (this.QJo && !(t < 0 || t >= this.QJo.length)) return this.QJo[t];
  }
  Initialize(t, i, s) {
    (this.cBe = s),
      (this.zJo = s.Entity.GetComponent(157)),
      (this.Lie = s.Entity.GetComponent(185)),
      (this.oRe = s.Entity.GetComponent(160)),
      (this.NJo = t),
      (this.FJo = i),
      (this.OJo = !1),
      (this.YJo = i.InterruptLevel);
    for (let t = i.SkillTag.Num() - 1; t >= 0; t--) {
      var e = i.SkillTag.Get(t);
      var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e?.TagName);
      e === -897737980 && (this.jJo = !0), this.HJo.push(e);
    }
    i.SkillMode === 1 && this.ZJo(), this.ezo();
  }
  Clear() {
    return (
      this.Active && this.EndSkill(),
      this.KJo &&
        (this.cBe.Entity.GetComponent(17).ClearAbility(this.KJo),
        (this.KJo = void 0)),
      (this.cBe = void 0),
      (this.zJo = void 0),
      (this.Lie = void 0),
      (this.oRe = void 0),
      (this.FJo = void 0),
      (this.ActiveAbility = void 0),
      (this.qJo = void 0),
      (this.OJo = !1),
      (this.GroupSkillCdInfo = void 0),
      (this.QJo = void 0),
      !(this.WJo = void 0)
    );
  }
  ZJo() {
    let t;
    const i = this.SkillInfo.SkillGA.AssetPathName.toString();
    i && i.length > 0 && i !== "None"
      ? ((this.WJo = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          i,
          UE.Class,
        )),
        this.WJo
          ? (this.WJo.IsChildOf(UE.Ga_Passive_C.StaticClass()) &&
              (this.cBe.SetGaPassiveClassToSkillMap(this.WJo, this.SkillId),
              (this.CombatMessageId =
                ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
              SkillMessageController_1.SkillMessageController.UseSkillRequest(
                this.cBe.Entity,
                this,
                0,
              )),
            (t = this.cBe.Entity.GetComponent(17)),
            (this.KJo = t.GetAbility(this.WJo)))
          : CombatDebugController_1.CombatDebugController.CombatError(
              "Skill",
              this.cBe.Entity,
              "加载技能GA失败，GA未加载",
              ["技能Id", this.SkillId],
              ["技能名", this.SkillName],
              ["GA", this.SkillInfo.SkillGA],
              ["GA Path", i],
            ))
      : CombatDebugController_1.CombatDebugController.CombatError(
          "Skill",
          this.cBe.Entity,
          "加载技能GA失败，GA路径为空",
          ["技能Id", this.SkillId],
          ["技能名", this.SkillName],
          ["GA", this.SkillInfo.SkillGA],
          ["GA Path", i],
        );
  }
  ezo() {
    if (this.SkillInfo.Animations.Num() > 0) {
      this.QJo = new Array(this.SkillInfo.Animations.Num());
      for (let t = 0; t < this.SkillInfo.Animations.Num(); ++t) {
        const o = this.SkillInfo.Animations.Get(t);
        if (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(o)) {
          const i = UE.KismetSystemLibrary.Conv_SoftObjPathToSoftObjRef(o);
          const a = t;
          const s = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            i.ToAssetPathName(),
            UE.AnimMontage,
          );
          s?.IsValid()
            ? (this.QJo[a] = s)
            : ResourceSystem_1.ResourceSystem.LoadAsync(
                i.ToAssetPathName(),
                UE.AnimMontage,
                (t) => {
                  t?.IsValid()
                    ? (this.QJo[a] = t)
                    : CombatDebugController_1.CombatDebugController.CombatWarn(
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
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Skill",
            this.cBe.Entity,
            "蒙太奇软路径对象无效，请设置Animations蒙太奇软路径对象",
            ["技能Id", this.SkillId],
            ["技能名", this.SkillName],
            ["索引", t],
          );
      }
    } else if (this.SkillInfo.MontagePaths.Num() > 0) {
      let i = !1;
      for (let t = 0; t < this.SkillInfo.MontagePaths.Num(); ++t) {
        const e = this.SkillInfo.MontagePaths.Get(t);
        (e && e.length !== 0) ||
          ((i = !0),
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Skill",
            this.cBe.Entity,
            "蒙太奇路径为空，请设置MontagePaths蒙太奇路径",
            ["技能Id", this.SkillId],
            ["技能名", this.SkillName],
            ["索引", t],
          ));
      }
      if (!i) {
        this.QJo = new Array(this.SkillInfo.MontagePaths.Num());
        var t = this.cBe.Entity.GetComponent(3).Actor;
        var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
          t.GetClass(),
        );
        const h = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t);
        for (let t = 0; t < this.SkillInfo.MontagePaths.Num(); ++t) {
          let r = this.SkillInfo.MontagePaths.Get(t);
          const l = ConfigManager_1.ConfigManager.WorldConfig.GetSkillMontage(
            h,
            r,
          );
          if (
            l &&
            l.ToAssetPathName().length !== 0 &&
            l.ToAssetPathName() !== "None"
          ) {
            const n = t;
            r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              l.ToAssetPathName(),
              UE.AnimMontage,
            );
            r?.IsValid()
              ? (this.QJo[n] = r)
              : ResourceSystem_1.ResourceSystem.LoadAsync(
                  l.ToAssetPathName(),
                  UE.AnimMontage,
                  (t) => {
                    t?.IsValid()
                      ? (this.QJo[n] = t)
                      : CombatDebugController_1.CombatDebugController.CombatWarn(
                          "Skill",
                          this.cBe.Entity,
                          "蒙太奇加载失败，请检查MontagePaths蒙太奇路径",
                          ["技能Id", this.SkillId],
                          ["技能名", this.SkillName],
                          ["索引", n],
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
    let h = this.$Jo.get(i);
    s = { BoneName: s, EffectHandle: t, WhenSkillEndEnableTime: e };
    h ? h.push(s) : ((h = []).push(s), this.$Jo.set(i, h));
  }
  tzo(t, i, s) {
    if (
      EffectSystem_1.EffectSystem.IsValid(i) &&
      (EffectSystem_1.EffectSystem.SetTimeScale(i, 1),
      !(s > 0 && EffectSystem_1.EffectSystem.GetTotalPassTime(i) > s))
    ) {
      const e = EffectSystem_1.EffectSystem.GetSureEffectActor(i);
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
  izo() {
    if (this.$Jo) {
      for (const [i, s] of this.$Jo)
        for (let t = s.length - 1; t >= 0; t--) {
          const e = s.pop();
          const h = e.EffectHandle;
          this.tzo(i, h, e.WhenSkillEndEnableTime);
        }
      this.$Jo.clear();
    }
  }
  BeginSkill() {
    return !(
      this.Active ||
      ((this.OJo = !0),
      (this.kJo = !1),
      (this.CombatMessageId =
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      (this.MontageContextId = void 0))
    );
  }
  BeginSkillBuffAndTag(i) {
    this.JJo = i;
    var t = this.zJo.AddTagWithReturnHandle(this.SkillTagIds);
    if (
      (this.XJo.push(t),
      this.SkillInfo.GroupId === 1 &&
        (this.SkillInfo.IsFullBodySkill
          ? this.Lie.AddTag(1996624497)
          : this.Lie.AddTag(704115290)),
      !this.IsSimulated)
    ) {
      Math.abs(this.SkillInfo.StrengthCost) > 0 &&
        ((t = this.zJo.AddBuffLocal(
          CharacterBuffIds_1.buffId.SkillStrengthForbidden,
          {
            InstigatorId: this.zJo.CreatureDataId,
            Reason: `技能${this.SkillId}存在体力消耗`,
            PreMessageId: this.CombatMessageId,
          },
        )),
        this.XJo.push(t));
      var t = this.zJo.AddAttributeRateModifierLocal(
        EAttributeId.Proto_SkillToughRatio,
        this.SkillInfo.ToughRatio - 1,
        `技能${this.SkillId}技能状态韧性系数`,
      );
      this.XJo.push(t),
        this.SkillInfo.ImmuneFallDamageTime > 0 &&
          ((t = this.zJo.AddBuffLocal(CharacterBuffIds_1.buffId.FallImmune, {
            InstigatorId: this.zJo.CreatureDataId,
            Duration: this.SkillInfo.ImmuneFallDamageTime,
            Reason: `技能${this.SkillId}跌落伤害保护`,
            PreMessageId: this.CombatMessageId,
          })),
          this.XJo.push(t));
      for (let t = 0; t < this.SkillInfo.SkillBuff.Num(); ++t) {
        const s = this.zJo.AddBuffLocal(this.SkillInfo.SkillBuff.Get(t), {
          InstigatorId: this.zJo.CreatureDataId,
          Level: i,
          Reason: `技能${this.SkillId}通过技能期间生效的GE添加`,
          PreMessageId: this.CombatMessageId,
        });
        this.XJo.push(s);
      }
      for (let t = 0; t < this.SkillInfo.SkillStartBuff.Num(); ++t)
        this.zJo.AddBuff(this.SkillInfo.SkillStartBuff.Get(t), {
          InstigatorId: this.zJo.CreatureDataId,
          Level: i,
          Reason: `技能${this.SkillId}开始时添加`,
          PreMessageId: this.CombatMessageId,
        });
    }
  }
  EndSkill() {
    if (!this.Active) return !1;
    if (
      ((this.SkillInfo.InterruptLevel = this.YJo),
      (this.OJo = !1),
      (this.ActiveAbility = void 0),
      this.cBe.FightStateComp?.ExitState(this.FightStateHandle),
      ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
        this.MontageContextId,
      ),
      this.ozo(),
      this.izo(),
      this.XJo.forEach((t) => {
        this.zJo.RemoveBuffByHandle(t, -1, "技能结束移除");
      }),
      (this.XJo.length = 0),
      this.SkillInfo.GroupId === 1 &&
        (this.SkillInfo.IsFullBodySkill
          ? this.Lie.RemoveTag(1996624497)
          : this.Lie.RemoveTag(704115290)),
      !this.IsSimulated)
    )
      for (let t = 0; t < this.SkillInfo.SkillEndBuff.Num(); ++t)
        this.zJo.AddBuff(this.SkillInfo.SkillEndBuff.Get(t), {
          InstigatorId: this.zJo.CreatureDataId,
          Level: this.JJo,
          Reason: `技能${this.SkillId}结束时添加`,
          PreMessageId: this.CombatMessageId,
        });
    return !0;
  }
  SimulatedBeginSkill(t) {
    return (
      !this.Active &&
      ((this.OJo = !0),
      (this.kJo = !0),
      (this.CombatMessageId =
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      this.BeginSkillBuffAndTag(0),
      !0)
    );
  }
  SetTimeDilation(t, i) {
    for (const s of this.$Jo.values())
      if (s)
        for (const e of s)
          EffectSystem_1.EffectSystem.IsValid(e.EffectHandle) &&
            EffectSystem_1.EffectSystem.SetTimeScale(e.EffectHandle, t * i);
  }
  SetSkillPriority(t) {
    this.SkillInfo && (this.SkillInfo.InterruptLevel = t);
  }
  PlayMontage(t, i, s, e, h) {
    if (!this.QJo || t >= this.QJo.length)
      return (
        CombatDebugController_1.CombatDebugController.CombatError(
          "Skill",
          this.cBe.Entity,
          "播放的蒙太奇索引不存在",
          ["技能id:", this.SkillId],
          ["技能名:", this.SkillName],
          ["index:", t],
        ),
        !1
      );
    const r = this.QJo[t];
    return (
      !!r?.IsValid() &&
      ((s = s
        ? FNameUtil_1.FNameUtil.GetDynamicFName(s)
        : FNameUtil_1.FNameUtil.EMPTY),
      (this.qJo = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
        this.oRe.MainAnimInstance,
        r,
        i,
        e,
        s,
      )),
      this.qJo.EndCallback.Add((t) => {
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "Skill",
          this.cBe.Entity,
          "OnMontageTaskEnd",
          ["技能Id", this.SkillId],
          ["蒙太奇", r ? r.GetName() : ""],
          ["是否被打断", t],
        ),
          h?.(t);
      }),
      (this.GJo = h),
      ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
        this.MontageContextId,
      ),
      (this.MontageContextId =
        ModelManager_1.ModelManager.CombatMessageModel.CreateMontageContext(
          this.SkillId,
          t,
        )),
      !0)
    );
  }
  ozo() {
    let t;
    this.qJo &&
      ((t = this.qJo.MontageToPlay),
      this.qJo.EndTask(),
      (this.qJo = void 0),
      this.oRe.MainAnimInstance.Montage_Stop(MONTAGE_BLEND_TIME, t));
  }
  RequestStopMontage() {
    CombatDebugController_1.CombatDebugController.CombatDebug(
      "Skill",
      this.cBe.Entity,
      "RequestStopMontage",
      ["技能Id", this.SkillId],
    ),
      this.GJo?.(!0),
      (this.GJo = void 0);
  }
  SetEffectHidden(t) {
    for (const i of this.$Jo.values())
      for (const s of i)
        EffectSystem_1.EffectSystem.IsValid(s.EffectHandle) &&
          EffectSystem_1.EffectSystem.GetEffectActor(
            s.EffectHandle,
          ).SetActorHiddenInGame(t);
  }
}
exports.Skill = Skill;
// # sourceMappingURL=Skill.js.map
