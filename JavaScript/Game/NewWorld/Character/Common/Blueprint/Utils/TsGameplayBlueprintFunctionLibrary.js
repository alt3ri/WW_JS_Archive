"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController");
const LogReportController_1 = require("../../../../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine");
const PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil");
const PhotographController_1 = require("../../../../../Module/Photograph/PhotographController");
const ActorUtils_1 = require("../../../../../Utils/ActorUtils");
const CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
const BulletTypes_1 = require("../../../../Bullet/BulletTypes");
const SceneItemDynamicAttachTargetComponent_1 = require("../../../../SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent");
const EntityHandle_1 = require("../../../EntityHandle");
const AbilityUtils_1 = require("../../Component/Abilities/AbilityUtils");
const CharacterBuffIds_1 = require("../../Component/Abilities/CharacterBuffIds");
const CharacterGasDebugComponent_1 = require("../../Component/Abilities/CharacterGasDebugComponent");
const CharacterUnifiedStateTypes_1 = require("../../Component/Abilities/CharacterUnifiedStateTypes");
const LockOnDebug_1 = require("../../Component/LockOn/LockOnDebug");
class TsGameplayBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static ContainsTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 185);
    return !(!t?.Valid || !e) && t.HasTag(e.TagId);
  }
  static AddTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 185);
    t?.Valid && e && t.AddTag(e.TagId);
  }
  static AddTagWithDuration(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 157);
    !t?.Valid || !i || e <= 0 || t.AddTagWithReturnHandle([i.TagId], e);
  }
  static AddTagByName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 185);
    t?.Valid &&
      void 0 !== (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)) &&
      t.AddTag(e);
  }
  static RemoveTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 185);
    t?.Valid && e && t.RemoveTag(e.TagId);
  }
  static RemoveTagByName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 185);
    t?.Valid &&
      void 0 !== (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)) &&
      t.RemoveTag(e);
  }
  static IsLogicAutonomousProxy(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 3)?.IsAutonomousProxy ?? !1
    );
  }
  static RemoveActiveGameplayEffect(t, e, i = -1) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 157);
    return !!t?.Valid && t.RemoveBuffByHandle(e.Handle, i) > 0;
  }
  static RemoveBuffByTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 157);
    t?.Valid && e && t.RemoveBuffByTag(e.TagId, "蓝图通过Tag移除Buff");
  }
  static AddPassiveSkill(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 23);
    t?.Valid && t.LearnPassiveSkill(e);
  }
  static RemovePassiveSkill(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 23);
    t?.Valid && t.ForgetPassiveSkill(e);
  }
  static SetPassiveGaSkillId(t, e) {}
  static AddBuffForDebug(t, e, i) {
    let n;
    var t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
    t &&
      ((n = EntitySystem_1.EntitySystem.GetComponent(e, 157))
        ? n.AddBuffForDebug(i, { InstigatorId: t, Reason: "AddBuffForDebug" })
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Battle",
            20,
            "添加buff对象没有BuffComponent",
            ["TargetEntityId", e],
            ["BuffId", i],
          ));
  }
  static GetSpecialBuffToSkillId(t, e) {
    return e !== ""
      ? e
      : (e = CharacterBuffIds_1.specialBuffToSkillIdMap.get(t))
        ? e.toString()
        : "";
  }
  static AddBuffFromGA(e, i, n, r, a) {
    r = TsGameplayBlueprintFunctionLibrary.GetSpecialBuffToSkillId(n, r);
    if (
      r === "" &&
      CharacterBuffIds_1.specialIgnoreGaBuff.findIndex((t) => t === n) === -1
    )
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 36, "AddBuffFromGA的SkillId为空", [
          "buffId",
          n,
        ]);
    else {
      let s;
      const y = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
      if (y) {
        let t = EntitySystem_1.EntitySystem.GetComponent(e, 33)?.GetSkill(
          Number(r),
        )?.CombatMessageId;
        t ||
          ((s = EntitySystem_1.EntitySystem.GetComponent(e, 0).GetSummonerId()),
          (t = (
            s > 0
              ? ModelManager_1.ModelManager.CreatureModel.GetEntity(
                  s,
                )?.Entity?.GetComponent(33)
              : PhantomUtil_1.PhantomUtil.GetSummonedEntity(
                  EntitySystem_1.EntitySystem.Get(e),
                  Protocol_1.Aki.Protocol.Oqs
                    .Proto_ESummonTypeConcomitantCustom,
                )?.Entity?.GetComponent(33)
          )?.GetSkill(Number(r))?.CombatMessageId)),
          i instanceof TsBaseCharacter_1.default &&
            ((s = i.CharacterActorComponent.Entity.CheckGetComponent(157))
              ? s.AddBuff(n, {
                  InstigatorId: y,
                  Reason: "AddBuffFromGA",
                  PreMessageId: t,
                  OuterStackCount: a,
                })
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Battle",
                  20,
                  "添加buff对象没有BuffComponent",
                  ["Target", i.GetName()],
                  ["BuffId", n],
                ));
      }
    }
  }
  static RemoveBuffById(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 157);
    t?.Valid && t.RemoveBuff(e, i, "从蓝图移除Buff");
  }
  static GetBuffCountById(t, e, i) {
    t = EntitySystem_1.EntitySystem.Get(t).GetComponent(187);
    return t?.Valid ? t.GetBuffTotalStackById(e, i) : 0;
  }
  static AddGameplayCueLocal(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 187);
    t?.Valid && t.AddGameplayCue([i], e, "蓝图AddGameplayCueLocal");
  }
  static GetGeDebugString(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 20)?.GetGeDebugStrings() ?? ""
    );
  }
  static GetTagDebugStrings(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 20)?.GetTagDebugStrings() ??
      ""
    );
  }
  static GetBuffDebugStrings(t, e) {
    return TsGameplayBlueprintFunctionLibrary.GetBuffDebugStringsNoBlueprint(
      t,
      e,
    );
  }
  static GetShieldDebugString(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 20)
        ?.GetShieldDebugString()
        .trim() ?? ""
    );
  }
  static GetPassiveSkillDebugString(t) {
    return "";
  }
  static GetShieldValue(t, e) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 64)?.GetShieldValue(e) ?? 0
    );
  }
  static GetBuffDebugStringsNoBlueprint(t, e = "") {
    const i = EntitySystem_1.EntitySystem.GetComponent(t, 157);
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    return (
      (i?.GetDebugBuffString(e) ?? "未找到buff组件") +
      "\n" +
      t?.GetShieldDebugString()
    );
  }
  static GetAttributeDebugString(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(
        t,
        20,
      )?.GetAttributeDebugStrings() ?? ""
    );
  }
  static GetAllAttributeDebugStrings(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(
        t,
        20,
      )?.GetAllAttributeDebugStrings() ?? ""
    );
  }
  static GetServerBuffString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      20,
    )?.GetServerBuffString();
  }
  static GetServerTagString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      20,
    )?.GetServerTagString();
  }
  static GetServerAttributeString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      20,
    )?.GetServerAttributeString();
  }
  static GetServerPartString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      20,
    )?.GetServerPartString();
  }
  static GetServerHateString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      20,
    )?.GetServerHateString();
  }
  static GetServerShieldString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      20,
    )?.GetServerShieldString();
  }
  static ServerDebugInfoRequest(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 20)?.ServerDebugInfoRequest();
  }
  static GetServerDebugInfoDirty(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 20)?.ServerDebugInfoDirty ??
      !1
    );
  }
  static SetServerDebugInfoDirty(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    t && (t.ServerDebugInfoDirty = e);
  }
  static DebugResetBaseVal(t, e, i) {
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    var n =
      (n && n?.DebugResetBaseValue(e, i),
      ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t));
    var t = StringUtils_1.StringUtils.Format(
      "GmSetAttribute {0} {1} {2}",
      n.toString(),
      e.toString(),
      i.toString(),
    );
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t);
  }
  static DebugResetFormationValue(t, e) {
    FormationAttributeController_1.FormationAttributeController.SetValue(t, e);
  }
  static Record(t, e) {
    return Info_1.Info.IsBuildDevelopmentOrDebug
      ? e
        ? (CharacterGasDebugComponent_1.CharacterGasDebugComponent.BeginRecord(),
          "")
        : CharacterGasDebugComponent_1.CharacterGasDebugComponent.EndRecord()
      : "";
  }
  static RefreshEntityListView(e) {
    let t;
    const i = e.GetListItems();
    const n = new Set();
    for (let t = i.Num() - 1; t >= 0; t--) {
      const r = i.Get(t);
      const a = Number(r.GetName().split(",")[0]);
      !Number.isNaN(a) || n.has(a) ? e.RemoveItem(r) : n.add(a);
    }
    for (const s of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      n.has(s.Id) ||
        ((t = (t = s?.Entity?.GetComponent(3)?.Actor?.GetName())
          ? `${s.constructor.name}_${s.Id}[${t}]`
          : s.constructor.name + "_" + s.Id),
        (t = new UE.Layer(e, s.Id + "," + t)),
        e.AddItem(t));
  }
  static RefreshEntityComboBox(e) {
    let t;
    const i = e.GetOptionCount();
    const n = new Set();
    for (let t = i - 1; t >= 0; t--) {
      const r = e.GetOptionAtIndex(t);
      const a = Number(/_(?<entityId>\d+)$/.exec(r)?.groups.entityId ?? -1);
      a < 0 || n.has(a) || !EntitySystem_1.EntitySystem.Get(a)
        ? e.RemoveOption(r)
        : n.add(a);
    }
    for (const s of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      n.has(s?.Id) ||
        ((t = s?.Entity?.GetComponent(3)?.Actor?.GetName()) &&
          e.AddOption(t + "_" + s.Id));
  }
  static SetEntityComboBox(t, e) {
    let i = EntitySystem_1.EntitySystem.Get(e);
    const n = i?.GetComponent(3)?.Actor?.GetName();
    const r = t.GetSelectedOption();
    i && n
      ? Number(/_(?<entityId>\d+)$/.exec(r)?.groups.entityId ?? -1) !== e &&
        (t.FindOptionIndex((i = n + "_" + e)) < 0 && t.AddOption(i),
        t.SetSelectedOption(i))
      : r && t.ClearSelection();
  }
  static SetDebugEntityId(t) {
    CombatDebugController_1.CombatDebugController.DebugEntityId =
      CombatDebugController_1.CombatDebugController.DebugEntityId === t ? 0 : t;
  }
  static GetDebugEntityId() {
    return CombatDebugController_1.CombatDebugController.DebugEntityId ?? 0;
  }
  static RefreshBuffListView(t, e, i = "") {
    const n = [...i.matchAll(/[0-9]+/g)].map((t) => t[0] ?? "");
    const r = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(187);
    if (r) {
      let a;
      let s;
      const y = e.GetListItems();
      const o = new Set();
      for (let t = y.Num() - 1; t >= 0; t--) {
        const c = y.Get(t);
        const l = r.GetBuffByHandle(Number(c.GetName().split(",")[1]));
        void 0 === l ||
        o.has(l.Handle) ||
        (n.length > 0 && !n.some((t) => String(l.Id).startsWith(t)))
          ? e.RemoveItem(c)
          : o.add(l.Handle);
      }
      for (const u of r.GetAllBuffs())
        o.has(u.Handle) ||
          (n.length > 0 && !n.some((t) => String(u.Id).startsWith(t))) ||
          ((a = new UE.Layer(e, t + "," + u.Handle)), e.AddItem(a));
      if (
        (0, RegisterComponent_1.isComponentInstance)(r, 171) &&
        r.GetFormationBuffComp()
      )
        for (const S of r.GetFormationBuffComp().GetAllBuffs())
          o.has(S.Handle) ||
            (n.length > 0 && !n.some((t) => String(S.Id).startsWith(t))) ||
            ((s = new UE.Layer(e, t + "," + S.Handle)), e.AddItem(s));
    } else e.ClearListItems();
  }
  static GetDebugBuff(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(187);
    const i = t?.GetBuffByHandle(e);
    return (
      i ||
      (!i && (0, RegisterComponent_1.isComponentInstance)(t, 171)
        ? t.GetFormationBuffComp().GetBuffByHandle(e)
        : void 0)
    );
  }
  static GetBuffIdByHandle(t, e) {
    return TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.Id ?? -1n;
  }
  static GetBuffServerIdByHandle(t, e) {
    return (
      TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.ServerId ?? -1
    );
  }
  static GetBuffDescByHandle(t, e) {
    (t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)),
      (e = t?.Config?.Desc ?? "Invalid");
    return (0, RegisterComponent_1.isComponentInstance)(
      t?.GetOwnerBuffComponent(),
      180,
    )
      ? `【编队buff】
` + e
      : e;
  }

  static GetBuffActivateByHandle(t, e) {
    return (
      TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.IsActive() ?? !1
    );
  }
  static GetBuffInstigatorStringByHandle(t, e) {
    return (
      TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)
        ?.GetInstigatorActorComponent()
        ?.Actor.GetName() ?? "Invalid"
    );
  }
  static GetBuffPeriodStringByHandle(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    return void 0 !== t && t.Period > 0
      ? t.GetRemainPeriod().toFixed(1) + "/" + t.Period.toFixed(1)
      : "无";
  }
  static GetBuffDurationStringByHandle(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    return void 0 !== t && t.Duration > 0
      ? t.GetRemainDuration().toFixed(1) + "/" + t.Duration.toFixed(1)
      : "无限";
  }
  static GetBuffDurationProgress(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    return void 0 !== t && t.Duration > 0
      ? t.GetRemainDuration() / t.Duration
      : 1;
  }
  static GetBuffLivingStatusStringByHandle(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    return t?.IsValid() ? (t.IsActive() ? "激活" : "失效") : "销毁";
  }
  static GetBuffLevelStringByHandle(t, e) {
    return (
      "" +
      (TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.Level ??
        "Invalid")
    );
  }
  static GetBuffStackStringByHandle(t, e) {
    return (
      "" +
      (TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.StackCount ??
        "Invalid")
    );
  }
  static GetBuffDebugStringByHandle(t, e) {
    let n = "";
    const r = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    const i = r?.GetOwnerBuffComponent();
    if (!r || !i) return n;
    r.Config.GrantedTags?.forEach((t) => {
      n += `附加标签 ${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)}
`;
    });
    for (const a of i.BuffEffectManager?.GetEffectsByHandle(r.Handle) ?? []) {
      n += `激活效果 ${a.GetDebugString()}(cd:${(i.GetBuffEffectCd(a.BuffId, a.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)
`;
    }
    return (
      r.Config.Modifiers?.forEach((t) => {
        const e = AbilityUtils_1.AbilityUtils.GetLevelValue(
          t.Value1 ?? [],
          r.Level,
          0,
        );
        const i = AbilityUtils_1.AbilityUtils.GetLevelValue(
          t.Value2 ?? [],
          r.Level,
          0,
        );
        switch (t.CalculationPolicy[0]) {
          case 0:
            n += `属性${Protocol_1.Aki.Protocol.KBs[t.AttributeId]}增加${t.Value1}
`;
            break;
          case 1:
            n += `属性${Protocol_1.Aki.Protocol.KBs[t.AttributeId]}增加${(0.01 * e).toFixed(1)}%
`;
            break;
          case 2:
          case 4:
            (n +=
              `属性${Protocol_1.Aki.Protocol.KBs[t.AttributeId]}${t.CalculationPolicy[0] === 2 ? "增加" : "覆盖为"}${t.CalculationPolicy[2] === 1 ? "施加者" : "持有者"}${Protocol_1.Aki.Protocol.KBs[t.CalculationPolicy[1]]}${["基础值", "当前值", "附加值"][t.CalculationPolicy[3]]}的${(0.01 * e).toFixed(1)}%+` +
              i +
              (t.CalculationPolicy[4] ? "(快照)" : "")),
              t.CalculationPolicy[5] &&
                (n += "，下限" + t.CalculationPolicy[5]),
              t.CalculationPolicy[6] &&
                (n += "，比例" + t.CalculationPolicy[6]),
              t.CalculationPolicy[7] &&
                (n += "，上限" + t.CalculationPolicy[7]),
              (n += "\n");
            break;
          case 3:
            n += `属性${Protocol_1.Aki.Protocol.KBs[t.AttributeId]}覆盖为${t.Value1}
`;
            break;
          default:
            n += "修改属性" + Protocol_1.Aki.Protocol.KBs[t.AttributeId];
        }
      }),
      n.trimEnd()
    );
  }

  static SetDistance(t, e) {
    CharacterGasDebugComponent_1.CharacterGasDebugComponent.SetDistanceMax(e);
  }
  static GetAllMovementHistory(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      20,
    )?.GetAllMovementHistory();
  }
  static ResetBaseValueLocal(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(t, 20)?.DebugResetBaseValue(e, i);
  }
  static GetAttributeCurrentValue(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 156)?.GetCurrentValue(e);
  }
  static GetAttributeBaseValue(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 156)?.GetBaseValue(e);
  }
  static SetRageModeId(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 51)?.SetRageModeId(e);
  }
  static SetHardnessModeId(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 51)?.SetHardnessModeId(e);
  }
  static OnHit(t, e) {
    (t = EntitySystem_1.EntitySystem.GetComponent(t, 51)),
      (e = BulletTypes_1.HitInformation.FromUeHitInformation(e));
    t?.OnHit(e, !0, void 0, !1, !1, void 0, void 0, void 0);
  }
  static SetBeHitIgnoreRotate(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 51)?.SetBeHitIgnoreRotate(e);
  }
  static CheckHasPart(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 58)?.IsMultiPart ?? !1;
  }
  static GetPartRemainedLife(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 58);
    return t?.IsMultiPart ? t.GetPartByTag(e).RemainedLife() : -1;
  }
  static ResetPartLife(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 58);
    t?.IsMultiPart && t.GetPartByTag(e).ResetLife();
  }
  static ActiveStiff(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 51)?.ActiveStiff(1);
  }
  static DeActiveStiff(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 51)?.DeActiveStiff(
      "蓝图退出硬直",
    );
  }
  static GetAcceptedNewBeHitAndReset(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(
        t,
        51,
      )?.GetAcceptedNewBeHitAndReset() ?? !1
    );
  }
  static GetEnterFkAndReset(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 51)?.GetEnterFkAndReset() ??
      !1
    );
  }
  static IsStiff(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.IsStiff() ?? !1;
  }
  static GetRageModeId(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.RageModeId;
  }
  static GetHardnessModeId(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.HardnessModeId;
  }
  static GetBeHitBone(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 51);
    return t?.BeHitBones && t?.BeHitBones?.length > 0
      ? t.BeHitBones[0]
      : FNameUtil_1.FNameUtil.EMPTY;
  }
  static GetToughDecreaseValue(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.ToughDecreaseValue;
  }
  static GetCounterAttackInfoInternal(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 51)
      ?.CounterAttackInfoInternal;
  }
  static GetVisionCounterAttackInfoInternal(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 51)
      ?.VisionCounterAttackInfoInternal;
  }
  static GetBeHitTime(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.BeHitTime;
  }
  static GetBeHitAnim(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 51);
    return t ? t.BeHitAnim : 0;
  }
  static GetEnterFk(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 51)?.EnterFk ?? !1;
  }
  static GetBeHitDirect(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      51,
    )?.BeHitDirect.ToUeVector();
  }
  static GetBeHitLocation(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      51,
    )?.BeHitLocation.ToUeVector();
  }
  static AddCheckBuffList(t, e) {}
  static ClearCheckBuffList(t) {}
  static CounterAttackEnd(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 51)?.CounterAttackEnd();
  }
  static VisionCounterAttackEnd(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 51)?.VisionCounterAttackEnd();
  }
  static SetCounterAttackEndTime(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 51)?.SetCounterAttackEndTime(e);
  }
  static IsTriggerCounterAttack(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 51)?.IsTriggerCounterAttack ??
      !1
    );
  }
  static ResetTarget(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 29)?.ResetTarget();
  }
  static SetShowTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 29);
    t?.Valid &&
      (e
        ? ((e = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity),
          t.SetShowTarget(new EntityHandle_1.EntityHandle(e)))
        : t.SetShowTarget(void 0));
  }
  static ExitLockDirection(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 29);
    t?.Valid && t.ExitLockDirection();
  }
  static EnterLockDirection(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 29);
    t?.Valid && t.EnterLockDirection();
  }
  static GetCurrentTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 29);
    if (t?.Valid) return t.GetCurrentTarget()?.Entity?.GetComponent(1)?.Owner;
  }
  static SetLockOnDebugLine(t, e) {
    LockOnDebug_1.LockOnDebug.IsShowDebugLine = e;
  }
  static ManipulateValid(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 55)?.Valid ?? !1;
  }
  static ManipulateGetDrawTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    if (t?.Valid) return t.GetDrawTarget();
  }
  static ManipulateGetCastTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    if (t?.Valid) return t.GetCastTarget();
  }
  static ManipulateGetDrawTargetChantTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    return t?.Valid ? t.GetDrawTargetChantTime() : 0;
  }
  static ManipulateChant(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    return !!t?.Valid && t.Chant(e);
  }
  static ManipulateDraw(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    return !!t?.Valid && t.Draw();
  }
  static ManipulateCast(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    return !!t?.Valid && t.Precast(e);
  }
  static ManipulateReset(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    t?.Valid && t.Reset();
  }
  static ManipulateChangeToProjectileState(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    return !!t?.Valid && t.ChangeToProjectileState();
  }
  static ManipulateChangeToNormalState(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    return !!t?.Valid && t.ChangeToNormalState();
  }
  static GetHoldingActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    if (t?.Valid) return t.GetHoldingActor();
  }
  static SetDebugDraw(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    t?.Valid && (t.DebugDrawSphereAndArrow = e);
  }
  static ExtraAction(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    t?.Valid && t.ExtraAction();
  }
  static SetQtePosition(t, e, i, n, r, a, s, y = 0) {
    EntitySystem_1.EntitySystem.GetComponent(t, 86)?.SetQtePosition({
      Rotate: e,
      Length: i,
      Height: n,
      ReferenceTarget: r,
      QteType: y,
    });
  }
  static GetDtSkillInfo(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    if (t?.Valid) return t.DtSkillInfo;
  }
  static GetLastActivateSkillTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid ? t.LastActivateSkillTime : 0;
  }
  static SetLastActivateSkillTime(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.SetLastActivateSkillTime(e);
  }
  static GetSkillElevationAngle(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid ? t.SkillElevationAngle : 0;
  }
  static SetSkillElevationAngle(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.SetSkillElevationAngle(e);
  }
  static CurrentSkillId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid ? t.CurrentSkill?.SkillId.toString() : "";
  }
  static CurrentPriority(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid ? t.CurrentPriority : 0;
  }
  static SetCurrentPriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.SetCurrentPriority(e);
  }
  static HasAbility(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return !!t?.Valid && t.HasAbility(Number(e));
  }
  static GetSkillInfo(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    if (t?.Valid) return t.GetSkillInfo(Number(e));
  }
  static SetSkillPriority(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.SetSkillPriority(Number(e), i);
  }
  static EndSkill(t, e, i, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid &&
      t.EndSkill(Number(e), "TsGameplayBlueprintFunctionLibrary.EndSkill");
  }
  static BeginSkill(t, e, i, n, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return (
      !!t?.Valid &&
      t.BeginSkill(Number(e.toString()), {
        Target: n,
        SocketName: r.toString(),
        Context: "TsGameplayBlueprintFunctionLibrary.BeginSkill",
      })
    );
  }
  static GetSkillTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid && t.SkillTarget
      ? t.SkillTarget?.Entity?.GetComponent(1)?.Owner
      : void 0;
  }
  static SetSkillTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid &&
      ((t.SkillTarget = void 0), e) &&
      (e = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity) &&
      (t.SkillTarget = new EntityHandle_1.EntityHandle(e));
  }
  static IsHasInputDir(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return !!t?.Valid && t.IsHasInputDir();
  }
  static GetSkillIdWithGroupId(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid ? t.GetSkillIdWithGroupId(e)?.toString() : "";
  }
  static GetSkillAcceptInput(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return !!t?.Valid && t.SkillAcceptInput;
  }
  static SetSkillAcceptInput(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.SetSkillAcceptInput(e);
  }
  static SetCommonSkillCanBeInterrupt(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && (t.IsMainSkillReadyEnd = e);
  }
  static GetCommonSkillCanBeInterrupt(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return !!t?.Valid && t.IsMainSkillReadyEnd;
  }
  static OnActivateAbility(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid ? t.OnActivateAbility(e, i) : -1;
  }
  static OnEndAbility(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.OnEndAbility(e, i);
  }
  static GetPriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid ? t.GetPriority(Number(e)) : -1;
  }
  static GetActivePriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid ? t.GetActivePriority(Number(e)) : -1;
  }
  static GetSkillMontageInstance(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    if (t?.Valid) return t.GetSkillMontageInstance(Number(e), i);
  }
  static SetSkillRotateLocation(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && ((e = Vector_1.Vector.Create(e)), t.SetRotateTarget(e, 1));
  }
  static SetSkillRotateDirect(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && ((e = Vector_1.Vector.Create(e)), t.SetRotateTarget(e, 2));
  }
  static CallAnimBreakPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.CallAnimBreakPoint();
  }
  static RollingGround(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.RollingGrounded();
  }
  static ActivateAbilityVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return !!t?.Valid && t.ActivateAbilityVision(e);
  }
  static EndAbilityVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return !!t?.Valid && t.EndAbilityVision(e);
  }
  static GetVisionIdList(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.GetVisionIdList() : UE.NewArray(UE.BuiltinInt);
  }
  static ExitMultiSkillStateOfMorphVision(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.ExitMultiSkillStateOfMorphVision();
  }
  static SetKeepMultiSkillState(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.SetKeepMultiSkillState(e, i);
  }
  static SetEnableAttackInputActionOfMorphVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.SetEnableAttackInputActionOfMorphVision(e);
  }
  static GetVisionLevelList(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.GetVisionLevelList() : UE.NewArray(UE.BuiltinInt);
  }
  static GetVisionSkillId(t, e, i) {
    return PhantomUtil_1.PhantomUtil.GetEntityVisionSkillId(t, e);
  }
  static InterruptSkill(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid &&
      t.EndSkill(
        Number(e),
        "TsGameplayBlueprintFunctionLibrary.InterruptSkill",
      );
  }
  static DeleteSkills(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid &&
      t.StopAllSkills("TsGameplayBlueprintFunctionLibrary.DeleteSkills");
  }
  static GetCurrentMontageCorrespondingSkillId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid
      ? t.GetCurrentMontageCorrespondingSkillId()?.toString()
      : "";
  }
  static SetSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && (t.SkillTargetSocket = e);
  }
  static GetSocketName(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid ? t.SkillTargetSocket : "";
  }
  static GetPointTransform(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    if (t?.Valid)
      return t.GetPointTransform(FNameUtil_1.FNameUtil.GetDynamicFName(e));
  }
  static PlaySkillMontage2Server(t, e, i, n, r, a) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.PlaySkillMontage2Server(Number(e), i, n, r, a);
  }
  static EndSkillMontage(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.EndSkillMontage(Number(e), i);
  }
  static CanActivateFixHook(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 87);
    return !!t?.Valid && t.CanActivateFixHook();
  }
  static FixHookTargetLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 87);
    if (t?.Valid) return t.GetCurrentTargetLocation();
  }
  static FixHookTargetActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 87);
    if (t?.Valid) return t.GetCurrentTargetActor();
  }
  static FixHookTargetIsSuiGuangType(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 87);
    return !!t?.Valid && t.GetTargetIsSuiGuangType();
  }
  static FixHookTargetForward(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 87);
    if (t?.Valid) return t.GetCurrentTargetForward();
  }
  static NextFixHookTargetLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 87);
    if (t?.Valid) return t.GetNextTargetLocation();
  }
  static FixHookTargetInheritSpeed(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 87);
    return !!t?.Valid && t.GetInheritSpeed();
  }
  static FixHookTargetIsClimb(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 87);
    return !!t?.Valid && t.GetIsClimb();
  }
  static SetIgnoreSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid && t.SetIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
  }
  static DeleteIgnoreSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    t?.Valid &&
      t.DeleteIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
  }
  static GetToTargetSocketDistance(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 33);
    return t?.Valid ? t.GetTargetDistance() : -1;
  }
  static SetPredictProjectileInfo(t, e, i, n, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 67);
    t?.Valid && t.SetPredictProjectileInfo(e, i, n, r);
  }
  static SetVisible(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 67);
    t?.Valid && t.SetVisible(e);
  }
  static GetCharUnifiedMoveState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 89)?.MoveState;
  }
  static GetCharUnifiedPositionState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 89)?.PositionState;
  }
  static ExitHitState(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 158)?.ExitHitState();
  }
  static SetDirectionState(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 89)?.SetDirectionState(e);
  }
  static GetDirectionState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 89)?.DirectionState;
  }
  static GetIsInGame(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 89)?.IsInGame ?? !1;
  }
  static SprintPress(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 158)?.SprintPress();
  }
  static SprintRelease(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 158)?.SprintRelease();
  }
  static StandPress(t) {
    const e = EntitySystem_1.EntitySystem.GetComponent(t, 89);
    e &&
      e.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
      EntitySystem_1.EntitySystem.GetComponent(t, 3)?.CreatureData.IsRole() &&
      e.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
  }
  static SwingPress(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 158)?.SwingPress();
  }
  static SwingRelease(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 158)?.SwingRelease();
  }
  static CustomSetWalkOrRun(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 158)?.CustomSetWalkOrRun(e);
  }
  static EnterAimStatus(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 158)?.EnterAimStatus(e);
  }
  static ExitAimStatus(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 158)?.ExitAimStatus();
  }
  static EnableEntity(t, e) {}
  static UpdateAnimInfoHit(t, e) {
    let i;
    let n;
    let r = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    r?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 51)) &&
      ((e = e),
      (r = r.AnimLogicParamsSetter),
      (i = t.GetAcceptedNewBeHitAndReset()),
      r.AcceptedNewBeHit !== i &&
        ((r.AcceptedNewBeHit = i),
        (e.AcceptedNewBeHitRef = i),
        (n = t.BeHitAnim),
        r.BeHitAnim !== n) &&
        ((r.BeHitAnim = n), (e.BeHitAnimRef = n)),
      (i = t.GetEnterFkAndReset()),
      r.EnterFk !== i && ((r.EnterFk = i), (e.EnterFkRef = i)),
      (i = t.GetDoubleHitInAir()),
      r.DoubleHitInAir !== i) &&
      ((r.DoubleHitInAir = i), (e.DoubleHitInAirRef = i));
  }
  static UpdateAnimInfoFk(e, i) {
    let n = EntitySystem_1.EntitySystem.GetComponent(e, 160);
    if (n?.Valid) {
      e = EntitySystem_1.EntitySystem.GetComponent(e, 51);
      if (e) {
        n = n.AnimLogicParamsSetter;
        let t = e.BeHitDirect;
        n.BeHitDirect.Equals(t) ||
          (n.BeHitDirect.DeepCopy(t), (i.BeHitDirectRef = t.ToUeVector())),
          (t = e.BeHitLocation),
          n.BeHitLocation.Equals(t) ||
            (n.BeHitLocation.DeepCopy(t),
            (i.BeHitLocationRef = t.ToUeVector()));
      }
    }
  }
  static UpdateAnimInfoUnifiedState(t, e) {
    let i;
    let n = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    n?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 89)) &&
      ((e = e),
      (n = n.AnimLogicParamsSetter),
      (i = t.MoveState),
      n.CharMoveState !== i &&
        ((n.CharMoveState = i), (e.CharMoveStateRef = i)),
      (i = t.PositionState),
      n.CharPositionState !== i &&
        ((n.CharPositionState = i), (e.CharPositionStateRef = i)),
      (i = t.DirectionState),
      n.CharCameraState !== i) &&
      ((n.CharCameraState = i), (e.CharCameraStateRef = i));
  }
  static UpdateAnimInfoUnifiedStateRoleNpc(t, e) {
    let i = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    i?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 89)) &&
      ((e = e),
      (i = i.AnimLogicParamsSetter),
      (t = t.MoveState),
      i.CharMoveState !== t) &&
      ((i.CharMoveState = t), (e.CharMoveStateRef = t));
  }
  static ChangeCameraToEntityCamera() {
    PhotographController_1.PhotographController.CameraCaptureType = 1;
  }
  static GetIsCharRotateWithCameraWhenManipulate(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 55);
    return !!t?.Valid && t.GetIsCharRotateWithCameraWhenManipulate();
  }
  static GetIsUseCatapultUpAnim(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 26);
    return !!t?.Valid && t.IsUseCatapultUpAnim;
  }
  static GetNextMultiSkillId(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    return t?.Valid ? t.GetNextMultiSkillId(e) : 0;
  }
  static StartManipulateInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 56);
    return !!t && t.StartInteract();
  }
  static EndManipulateInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 56);
    t && t.EndInteract();
  }
  static GetManipulateInteractLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 56);
    if (t) return t.GetTargetLocation().ToUeVector();
  }
  static EnvironmentInfoDetect(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    t &&
      ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
        e,
        t.IsRoleAndCtrlByMe,
      );
  }
  static LockOnSpecifyTarget(t, e) {
    (t = EntitySystem_1.EntitySystem.GetComponent(t, 29)),
      (e = EntitySystem_1.EntitySystem.Get(e));
    t?.Valid &&
      e?.Valid &&
      t.LockOnSpecifyTarget(new EntityHandle_1.EntityHandle(e));
  }
  static IsSkillInCd(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    return !!t?.Valid && t.IsSkillInCd(e);
  }
  static SendHookSkillUseLogData(t, e) {
    const i = new LogReportDefine_1.HookSkillUseLogData();
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
    (i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
      (i.i_father_area_id =
        ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
      (i.f_pos_x = t.X),
      (i.f_pos_y = t.Y),
      (i.f_pos_z = t.Z),
      (i.i_has_target = e ? 1 : 0),
      LogReportController_1.LogReportController.LogReport(i);
  }
  static SendManipulateSkillUseLogData(t, e) {
    const i = new LogReportDefine_1.ManipulateSkillUseLogData();
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
    (i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
      (i.i_father_area_id =
        ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
      (i.f_pos_x = t.X),
      (i.f_pos_y = t.Y),
      (i.f_pos_z = t.Z),
      (i.i_has_target = e ? 1 : 0),
      LogReportController_1.LogReportController.LogReport(i);
  }
  static SendScanSkillUseLogData(t, e) {
    const i = new LogReportDefine_1.ScanSkillUseLogData();
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
    (i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
      (i.i_father_area_id =
        ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
      (i.f_pos_x = t.X),
      (i.f_pos_y = t.Y),
      (i.f_pos_z = t.Z),
      (i.i_has_target = e ? 1 : 0),
      LogReportController_1.LogReportController.LogReport(i);
  }
  static DynamicAttachEntityToActor(e, i, n) {
    const r = EntitySystem_1.EntitySystem.Get(e);
    var e = EntitySystem_1.EntitySystem.GetComponent(e, 110);
    if (r && e) {
      let t = new UE.Transform();
      let a;
      var i = EntitySystem_1.EntitySystem.Get(i);
      let s = i?.GetComponent(1)?.Owner;
      s &&
        (s.IsA(UE.Character.StaticClass())
          ? (a = s).Mesh.DoesSocketExist(n) &&
            (t = a.Mesh.GetSocketTransform(n, 0))
          : (t = s.GetTransform()),
        r
          .GetComponent(1)
          ?.SetActorLocationAndRotation(
            t.GetLocation(),
            t.GetRotation().Rotator(),
          ),
        void 0 !== (a = i?.GetComponent(0)?.GetCreatureDataId())) &&
        (((s =
          new SceneItemDynamicAttachTargetComponent_1.AttachParam()).PosAttachType =
          1),
        (s.RotAttachType = 1),
        (s.AttachSocketName = n),
        e.RegEntityTargetByCreatureDataId(
          a,
          void 0,
          s,
          "DynamicAttachEntityToActor",
        ));
    }
  }
  static DynamicDetachEntityFromActor(t) {
    const e = EntitySystem_1.EntitySystem.Get(t);
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 110);
    e &&
      t &&
      t.UnRegTarget(
        "TsGameplayBlueprintFunctionLibrary.DynamicDetachEntityFromActor",
      );
  }
  static SetEntityEnable(t, e, i, n) {
    i?.IsValid()
      ? ((i = `[蓝图:${i.GetName()}] ` + n),
        (n = EntitySystem_1.EntitySystem.Get(t))?.Valid &&
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            n,
            e,
            i,
            !0,
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          29,
          "调用SetEntityEnable失败，因为callObject为空",
        );
  }
}
exports.default = TsGameplayBlueprintFunctionLibrary;
// # sourceMappingURL=TsGameplayBlueprintFunctionLibrary.js.map
