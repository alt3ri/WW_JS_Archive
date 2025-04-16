"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
  BattleLinkController_1 = require("../../../../../Module/Battle/Link/BattleLinkController"),
  LogReportController_1 = require("../../../../../Module/LogReport/LogReportController"),
  LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine"),
  PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil"),
  ActorUtils_1 = require("../../../../../Utils/ActorUtils"),
  CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
  BulletTypes_1 = require("../../../../Bullet/BulletTypes"),
  SceneItemDynamicAttachTargetComponent_1 = require("../../../../SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent"),
  EntityHandle_1 = require("../../../EntityHandle"),
  RoleAudioController_1 = require("../../../Role/RoleAudioController"),
  AbilityUtils_1 = require("../../Component/Abilities/AbilityUtils"),
  CharacterAttributeTypes_1 = require("../../Component/Abilities/CharacterAttributeTypes"),
  CharacterBuffIds_1 = require("../../Component/Abilities/CharacterBuffIds"),
  CharacterGasDebugComponent_1 = require("../../Component/Abilities/CharacterGasDebugComponent"),
  CharacterUnifiedStateTypes_1 = require("../../Component/Abilities/CharacterUnifiedStateTypes"),
  ExtraEffectBaseTypes_1 = require("../../Component/Abilities/ExtraEffect/ExtraEffectBaseTypes"),
  LockOnDebug_1 = require("../../Component/LockOn/LockOnDebug"),
  SkillBehaviorAction_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorAction"),
  SkillBehaviorCondition_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorCondition"),
  SkillBehaviorMisc_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorMisc");
class TsGameplayBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static ContainsTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 203);
    return !(!t?.Valid || !e) && t.HasTag(e.TagId);
  }
  static AddTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 203);
    t?.Valid && e && t.AddTag(e.TagId);
  }
  static AddTagWithDuration(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 172);
    !t?.Valid || !i || e <= 0 || t.AddTagWithReturnHandle([i.TagId], e);
  }
  static AddTagByName(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 203);
    i?.Valid &&
      void 0 !== (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)) &&
      (i.AddTag(e),
      (i = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t)),
      (t = StringUtils_1.StringUtils.Format(
        "GmAddTag {0} {1} 1",
        i.toString(),
        e.toString(),
      )),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t));
  }
  static RemoveTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 203);
    t?.Valid && e && t.RemoveTag(e.TagId);
  }
  static RemoveTagByName(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 203);
    i?.Valid &&
      void 0 !== (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)) &&
      (i.RemoveTag(e),
      (i = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t)),
      (t = StringUtils_1.StringUtils.Format(
        "GmRemoveTag {0} {1}",
        i.toString(),
        e.toString(),
      )),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t));
  }
  static AddCue(t, e, i) {
    var r = EntitySystem_1.EntitySystem.GetComponent(e, 21);
    r?.Valid &&
      ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t || e)),
      r.AddCue(Number(i), { Instigator: t }));
  }
  static RemoveCue(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 21);
    t?.Valid && t.RemoveCue(Number(e));
  }
  static IsLogicAutonomousProxy(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 3)?.IsAutonomousProxy ?? !1
    );
  }
  static RemoveActiveGameplayEffect(t, e, i = -1) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 172);
    return !!t?.Valid && 0 < t.RemoveBuffByHandle(e.Handle, i);
  }
  static RemoveBuffByTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 172);
    t?.Valid && e && t.RemoveBuffByTag(e.TagId, "蓝图通过Tag移除Buff");
  }
  static AddPassiveSkill(t, e) {
    Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 19, "废弃接口已无效");
  }
  static RemovePassiveSkill(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 26);
    t?.Valid && t.ForgetPassiveSkill(Number(e));
  }
  static SetPassiveGaSkillId(t, e) {}
  static AddBuffForDebug(t, e, i) {
    var r,
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
    t &&
      ((r = EntitySystem_1.EntitySystem.GetComponent(e, 172))
        ? r.AddBuffForDebug(Number(i), {
            InstigatorId: t,
            Reason: "AddBuffForDebug",
          })
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Battle",
            19,
            "添加buff对象没有BuffComponent",
            ["TargetEntityId", e],
            ["BuffId", i],
          ));
  }
  static GetSpecialBuffToSkillId(t, e) {
    return "" !== e
      ? e
      : (e = CharacterBuffIds_1.specialBuffToSkillIdMap.get(t))
        ? e.toString()
        : "";
  }
  static TryGetSummonedEntitySkillInner(t, e, i) {
    return PhantomUtil_1.PhantomUtil.GetSummonedEntity(
      EntitySystem_1.EntitySystem.Get(t),
      i,
    )
      ?.Entity?.GetComponent(39)
      ?.GetSkill(e);
  }
  static TryGetSummonedEntitySkill(t, e) {
    let i = this.TryGetSummonedEntitySkillInner(
      t,
      e,
      Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom,
    );
    return (i =
      (i =
        i ||
        this.TryGetSummonedEntitySkillInner(
          t,
          e,
          Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
        )) ||
      this.TryGetSummonedEntitySkillInner(
        t,
        e,
        Protocol_1.Aki.Protocol.Summon.x3s
          .Proto_ESummonTypeConcomitantPhantomRole,
      ));
  }
  static AddBuffFromGA(i, r, n, a, s) {
    a = TsGameplayBlueprintFunctionLibrary.GetSpecialBuffToSkillId(
      Number(n),
      a,
    );
    if (
      "" === a &&
      -1 ===
        CharacterBuffIds_1.specialIgnoreGaBuff.findIndex((t) => t === Number(n))
    )
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 35, "AddBuffFromGA的SkillId为空", [
          "buffId",
          n,
        ]);
    else {
      var o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(i);
      if (o) {
        var y = EntitySystem_1.EntitySystem.GetComponent(i, 38)?.GetSkill(
          Number(a),
        );
        let t = y?.LFc,
          e = y?.AbilityClass?.GetName();
        t ||
          ((y = EntitySystem_1.EntitySystem.GetComponent(i, 0).GetSummonerId()),
          (e = (
            0 < y
              ? ((y =
                  ModelManager_1.ModelManager.CreatureModel.GetEntity(
                    y,
                  )?.Entity?.GetComponent(38)),
                (t = y?.GetSkill(Number(a))?.LFc),
                y?.GetSkill(Number(a)))
              : ((y =
                  TsGameplayBlueprintFunctionLibrary.TryGetSummonedEntitySkill(
                    i,
                    Number(a),
                  )),
                (t = y?.LFc),
                y)
          )?.AbilityClass?.GetName())),
          r instanceof TsBaseCharacter_1.default &&
            ((i = r.CharacterActorComponent.Entity.CheckGetComponent(172))
              ? i.AddBuff(Number(n), {
                  InstigatorId: o,
                  Reason: `技能${a}GA${e}的buff添加`,
                  PreMessageId: t,
                  OuterStackCount: s,
                })
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Battle",
                  19,
                  "添加buff对象没有BuffComponent",
                  ["Target", r.GetName()],
                  ["BuffId", n],
                ));
      }
    }
  }
  static RemoveBuffById(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 172);
    t?.Valid && t.RemoveBuff(Number(e), i, "从蓝图移除Buff");
  }
  static GetBuffCountById(t, e, i) {
    t = EntitySystem_1.EntitySystem.Get(t).GetComponent(207);
    return t?.Valid ? t.GetBuffTotalStackById(Number(e), i) : 0;
  }
  static AddGameplayCueLocal(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 207);
    t?.Valid &&
      ((i = [Number(i)]), t.AddGameplayCue(i, e, "蓝图AddGameplayCueLocal"));
  }
  static GetGeDebugString(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetGeDebugStrings() ?? ""
    );
  }
  static GetTagDebugStrings(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetTagDebugStrings() ??
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
      EntitySystem_1.EntitySystem.GetComponent(t, 22)
        ?.GetShieldDebugString()
        .trim() ?? ""
    );
  }
  static GetPassiveSkillDebugString(t) {
    return "";
  }
  static GetShieldValue(t, e) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 74)?.GetShieldValue(e) ?? 0
    );
  }
  static GetBuffDebugStringsNoBlueprint(t, e = "") {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 172),
      t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
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
        22,
      )?.GetAttributeDebugStrings() ?? ""
    );
  }
  static GetAllAttributeDebugStrings(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(
        t,
        22,
      )?.GetAllAttributeDebugStrings() ?? ""
    );
  }
  static GetServerBuffString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      22,
    )?.GetServerBuffString();
  }
  static GetServerTagString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      22,
    )?.GetServerTagString();
  }
  static GetServerAttributeString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      22,
    )?.GetServerAttributeString();
  }
  static GetServerPartString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      22,
    )?.GetServerPartString();
  }
  static GetServerHateString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      22,
    )?.GetServerHateString();
  }
  static GetServerShieldString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      22,
    )?.GetServerShieldString();
  }
  static ServerDebugInfoRequest(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 22)?.ServerDebugInfoRequest();
  }
  static GetServerDebugInfoDirty(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 22)?.ServerDebugInfoDirty ??
      !1
    );
  }
  static SetServerDebugInfoDirty(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    t && (t.ServerDebugInfoDirty = e);
  }
  static DebugResetBaseVal(t, e, i) {
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 22),
      r =
        (r && r?.DebugResetBaseValue(e, i),
        ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t)),
      t = StringUtils_1.StringUtils.Format(
        "GmSetAttribute {0} {1} {2}",
        r.toString(),
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
    var t,
      i = e.GetListItems(),
      r = new Set();
    for (let t = i.Num() - 1; 0 <= t; t--) {
      var n = i.Get(t),
        a = Number(n.GetName().split(",")[0]);
      !Number.isNaN(a) || r.has(a) ? e.RemoveItem(n) : r.add(a);
    }
    for (const s of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      r.has(s.Id) ||
        ((t = (t = s?.Entity?.GetComponent(3)?.Actor?.GetName())
          ? `${s.constructor.name}_${s.Id}[${t}]`
          : s.constructor.name + "_" + s.Id),
        (t = new UE.Layer(e, s.Id + "," + t)),
        e.AddItem(t));
  }
  static RefreshEntityComboBox(e) {
    var t,
      i,
      r = e.GetOptionCount(),
      n = new Set();
    for (let t = r - 1; 0 <= t; t--) {
      var a = e.GetOptionAtIndex(t),
        s = Number(/_(?<entityId>\d+)$/.exec(a)?.groups.entityId ?? 0);
      0 === s || n.has(s) || !EntitySystem_1.EntitySystem.Get(s)
        ? e.RemoveOption(a)
        : n.add(s);
    }
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      n.has(o?.Id) ||
        ((i = (t = o?.Entity)?.GetComponent(3)?.Actor?.GetName())
          ? e.AddOption(i + "_" + o.Id)
          : (i = t?.GetComponent(230)) &&
            i.VehicleFeatures.has(2) &&
            ((i = t?.GetComponent(1)?.Owner?.GetName()),
            e.AddOption(i + "_" + o.Id)));
  }
  static SetEntityComboBox(t, e) {
    var i = EntitySystem_1.EntitySystem.Get(e),
      r = i?.GetComponent(1)?.Owner?.GetName(),
      n = t.GetSelectedOption();
    i && r
      ? Number(/_(?<entityId>\d+)$/.exec(n)?.groups.entityId ?? -1) !== e &&
        (t.FindOptionIndex((i = r + "_" + e)) < 0 && t.AddOption(i),
        t.SetSelectedOption(i))
      : n && t.ClearSelection();
  }
  static SetDebugEntityId(t) {
    CombatDebugController_1.CombatDebugController.DebugEntityId =
      CombatDebugController_1.CombatDebugController.DebugEntityId === t ? 0 : t;
  }
  static GetDebugEntityId() {
    return CombatDebugController_1.CombatDebugController.DebugEntityId ?? 0;
  }
  static RefreshBuffListView(t, e, i = "") {
    var r = [...i.matchAll(/[0-9]+/g)].map((t) => t[0] ?? ""),
      n = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(207);
    if (n) {
      var a,
        s,
        o = e.GetListItems(),
        y = new Set();
      for (let t = o.Num() - 1; 0 <= t; t--) {
        var l = o.Get(t);
        const c = n.GetBuffByHandle(Number(l.GetName().split(",")[1]));
        void 0 === c ||
        y.has(c.Handle) ||
        (0 < r.length && !r.some((t) => String(c.Id).startsWith(t)))
          ? e.RemoveItem(l)
          : y.add(c.Handle);
      }
      for (const u of n.GetAllBuffs())
        y.has(u.Handle) ||
          (0 < r.length && !r.some((t) => String(u.Id).startsWith(t))) ||
          ((a = new UE.Layer(e, t + "," + u.Handle)), e.AddItem(a));
      if (
        (0, RegisterComponent_1.isComponentInstance)(n, 188) &&
        n.GetFormationBuffComp()
      )
        for (const S of n.GetFormationBuffComp().GetAllBuffs())
          y.has(S.Handle) ||
            (0 < r.length && !r.some((t) => String(S.Id).startsWith(t))) ||
            ((s = new UE.Layer(e, t + "," + S.Handle)), e.AddItem(s));
    } else e.ClearListItems();
  }
  static GetDebugBuff(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(207),
      i = t?.GetBuffByHandle(e);
    return (
      i ||
      (!i && (0, RegisterComponent_1.isComponentInstance)(t, 188)
        ? t.GetFormationBuffComp().GetBuffByHandle(e)
        : void 0)
    );
  }
  static GetBuffIdByHandle(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    return BigInt(t?.Id ?? 0) ?? -1n;
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
      197,
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
    return void 0 !== t && 0 < t.Period
      ? t.GetRemainPeriod().toFixed(1) + "/" + t.Period.toFixed(1)
      : "无";
  }
  static GetBuffDurationStringByHandle(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    return void 0 !== t && 0 < t.Duration
      ? t.GetRemainDuration().toFixed(1) + "/" + t.Duration.toFixed(1)
      : "无限";
  }
  static GetBuffDurationProgress(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    return void 0 !== t && 0 < t.Duration
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
    const a = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    var i = a?.GetOwnerBuffComponent();
    if (!a || !i) return n;
    a.Config.GrantedTags?.forEach((t) => {
      n += `附加标签 ${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)}
`;
    });
    for (const s of i.BuffEffectManager?.GetEffectsByHandle(a.Handle) ?? [])
      n += `持续效果 ${""}(cd:${(i.GetBuffEffectCd(s.BuffId, s.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)
`;
    for (const o of a.Config.EffectInfos) {
      var r = o.ExecutionEffect;
      ExtraEffectBaseTypes_1.periodExecutionIds.has(o.ExtraEffectId) &&
        r &&
        (n += "周期效果 \n");
    }
    return (
      a.Config.Modifiers?.forEach((t) => {
        var e = AbilityUtils_1.AbilityUtils.GetLevelValue(
            t.Value1 ?? [],
            a.Level,
            0,
          ),
          i = AbilityUtils_1.AbilityUtils.GetLevelValue(
            t.Value2 ?? [],
            a.Level,
            0,
          ),
          r = void 0;
        switch (t.CalculationPolicy[0]) {
          case 0:
            n += `属性${r}增加${t.Value1}
`;
            break;
          case 1:
            n += `属性${r}增加${(e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * 100).toFixed(1)}%
`;
            break;
          case 2:
          case 4:
            (n +=
              `属性${r}${2 === t.CalculationPolicy[0] ? "增加" : "覆盖为"}${1 === t.CalculationPolicy[2] ? "施加者" : "持有者"}${Protocol_1.Aki.Protocol.Vks[t.CalculationPolicy[1]]}${["基础值", "当前值", "附加值"][t.CalculationPolicy[3]]}的${(0.01 * e).toFixed(1)}%+` +
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
          case 9:
            n += `属性${r}以${Protocol_1.Aki.Protocol.Vks[t.CalculationPolicy[1]]}${["基础值", "当前值", "附加值"][t.CalculationPolicy[3]]}的${(e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * 100).toFixed(1)}%为万分比增加/减少
`;
            break;
          case 3:
            n += `属性${r}覆盖为${t.Value1}
`;
            break;
          default:
            n += "修改属性" + r;
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
      22,
    )?.GetAllMovementHistory();
  }
  static ResetBaseValueLocal(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(t, 22)?.DebugResetBaseValue(e, i);
  }
  static GetAttributeCurrentValue(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 171)?.GetCurrentValue(e);
  }
  static GetAttributeBaseValue(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 171)?.GetBaseValue(e);
  }
  static SetRageModeId(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 60)?.SetRageModeId(e);
  }
  static SetHardnessModeId(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 60)?.SetHardnessModeId(e);
  }
  static OnHit(t, e) {
    (t = EntitySystem_1.EntitySystem.GetComponent(t, 60)),
      (e = BulletTypes_1.HitInformation.FromUeHitInformation(e));
    t?.OnHit(e, void 0, !1, !1, void 0, void 0);
  }
  static SetBeHitIgnoreRotate(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 60)?.SetBeHitIgnoreRotate(e);
  }
  static CheckHasPart(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 68)?.IsMultiPart ?? !1;
  }
  static GetPartRemainedLife(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 68);
    return t?.IsMultiPart ? t.GetPartByTag(e).RemainedLife() : -1;
  }
  static ResetPartLife(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 68);
    t?.IsMultiPart && t.GetPartByTag(e).ResetLife();
  }
  static ActiveStiff(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 60)?.ActiveStiff(1);
  }
  static DeActiveStiff(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 60)?.DeActiveStiff(
      "蓝图退出硬直",
    );
  }
  static GetAcceptedNewBeHitAndReset(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(
        t,
        60,
      )?.GetAcceptedNewBeHitAndReset() ?? !1
    );
  }
  static GetEnterFkAndReset(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 60)?.GetEnterFkAndReset() ??
      !1
    );
  }
  static IsStiff(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 60)?.IsStiff() ?? !1;
  }
  static GetRageModeId(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 60)?.RageModeId;
  }
  static GetHardnessModeId(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 60)?.HardnessModeId;
  }
  static GetBeHitBone(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 60);
    return t?.BeHitBones && 0 < t?.BeHitBones?.length
      ? t.BeHitBones[0]
      : FNameUtil_1.FNameUtil.EMPTY;
  }
  static GetToughDecreaseValue(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 60)?.ToughDecreaseValue;
  }
  static GetCounterAttackInfoInternal(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 60)
      ?.CounterAttackInfoInternal;
  }
  static GetVisionCounterAttackInfoInternal(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 60)
      ?.VisionCounterAttackInfoInternal;
  }
  static GetBeHitTime(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 60)?.BeHitTime;
  }
  static GetBeHitAnim(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 60);
    return t ? t.BeHitAnim : 0;
  }
  static GetEnterFk(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 60)?.EnterFk ?? !1;
  }
  static GetBeHitDirect(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      60,
    )?.BeHitDirect.ToUeVector();
  }
  static GetBeHitLocation(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      60,
    )?.BeHitLocation.ToUeVector();
  }
  static AddCheckBuffList(t, e) {}
  static ClearCheckBuffList(t) {}
  static CounterAttackEnd(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 60)?.CounterAttackEnd();
  }
  static VisionCounterAttackEnd(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 60)?.VisionCounterAttackEnd();
  }
  static SetCounterAttackEndTime(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 60)?.SetCounterAttackEndTime(e);
  }
  static IsTriggerCounterAttack(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 60)?.IsTriggerCounterAttack ??
      !1
    );
  }
  static ResetTarget(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 32)?.ResetTarget();
  }
  static SetShowTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 32);
    t?.Valid &&
      (e
        ? ((e = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity),
          t.SetShowTarget(new EntityHandle_1.EntityHandle(e)))
        : t.SetShowTarget(void 0));
  }
  static ExitLockDirection(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 32);
    t?.Valid && t.ExitLockDirection();
  }
  static EnterLockDirection(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 32);
    t?.Valid && t.EnterLockDirection();
  }
  static GetCurrentTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 32);
    if (t?.Valid) return t.GetCurrentTarget()?.Entity?.GetComponent(1)?.Owner;
  }
  static SetLockOnDebugLine(t, e) {
    LockOnDebug_1.LockOnDebug.IsShowDebugLine = e;
  }
  static ManipulateValid(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 64)?.Valid ?? !1;
  }
  static ManipulateGetDrawTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    if (t?.Valid) return t.GetDrawTarget();
  }
  static ManipulateGetCastTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    if (t?.Valid) return t.GetCastTarget();
  }
  static ManipulateGetDrawTargetChantTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    return t?.Valid ? t.GetDrawTargetChantTime() : 0;
  }
  static ManipulateChant(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    return !!t?.Valid && t.Chant(e);
  }
  static ManipulateDraw(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    return !!t?.Valid && t.Draw();
  }
  static ManipulateCast(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    return !!t?.Valid && t.Precast(e);
  }
  static ManipulateReset(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    t?.Valid && t.Reset();
  }
  static ManipulateChangeToProjectileState(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    return !!t?.Valid && t.ChangeToProjectileState();
  }
  static ManipulateChangeToNormalState(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    return !!t?.Valid && t.ChangeToNormalState();
  }
  static GetHoldingActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    if (t?.Valid) return t.GetHoldingActor();
  }
  static SetDebugDraw(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    t?.Valid && (t.DebugDrawSphereAndArrow = e);
  }
  static ExtraAction(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    t?.Valid && t.ExtraAction();
  }
  static SetQtePosition(t, e, i, r, n, a, s, o = 0) {
    EntitySystem_1.EntitySystem.GetComponent(t, 96)?.SetQtePosition({
      Rotate: e,
      Length: i,
      Height: r,
      ReferenceTarget: n,
      QteType: o,
    });
  }
  static GetGoBattleActor(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 96)?.GoBattleActor;
  }
  static GetDtSkillInfo(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    if (t?.Valid) return t.DtSkillInfo;
  }
  static GetDtSkillInfoMapForDebug(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    if (t?.Valid) {
      const i = UE.NewMap(UE.BuiltinInt, UE.DataTable);
      return (
        t.DtSkillInfoMapForDebug.forEach((t, e) => {
          i.Add(e, t);
        }),
        i
      );
    }
  }
  static GetLastActivateSkillTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    return t?.Valid ? t.LastActivateSkillTime : 0;
  }
  static SetLastActivateSkillTime(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    t?.Valid && t.SetLastActivateSkillTime(e);
  }
  static GetSkillElevationAngle(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    return t?.Valid ? t.SkillElevationAngle : 0;
  }
  static SetSkillElevationAngle(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    t?.Valid && t.SetSkillElevationAngle(e);
  }
  static CurrentSkillId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return t?.Valid ? t.CurrentSkill?.SkillId.toString() : "";
  }
  static CurrentPriority(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return t?.Valid ? t.CurrentPriority : 0;
  }
  static SetCurrentPriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && t.SetCurrentPriority(e);
  }
  static HasAbility(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return !!t?.Valid && t.HasAbility(Number(e));
  }
  static GetSkillInfo(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    if (t?.Valid) return t.GetSkillInfo(Number(e));
  }
  static SetSkillPriority(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && t.SetSkillPriority(Number(e), i);
  }
  static EndSkill(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid &&
      t.EndSkill(Number(e), "TsGameplayBlueprintFunctionLibrary.EndSkill");
  }
  static BeginSkill(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return (
      !!t?.Valid &&
      t.BeginSkill(Number(e.toString()), {
        Target: r,
        SocketName: n.toString(),
        Reason: "TsGameplayBlueprintFunctionLibrary.BeginSkill",
      })
    );
  }
  static SkillBehaviorBegin(t, e, i) {
    var t = EntitySystem_1.EntitySystem.Get(t),
      r = t?.GetComponent(38),
      e = r?.GetSkill(e.SkillId);
    t &&
      r?.Valid &&
      e &&
      ((t = { Entity: t, SkillComponent: r, Skill: e }),
      SkillBehaviorAction_1.SkillBehaviorAction.Begin(i, t));
  }
  static SkillBehaviorSatisfy(t, e, i) {
    var t = EntitySystem_1.EntitySystem.Get(t),
      r = t?.GetComponent(38),
      e = r?.GetSkill(e.SkillId);
    return (
      !!(t && r?.Valid && e) &&
      ((t = { Entity: t, SkillComponent: r, Skill: e }),
      SkillBehaviorCondition_1.SkillBehaviorCondition.Satisfy(i, t))
    );
  }
  static GetSkillTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return t?.Valid && t.SkillTarget
      ? t.SkillTarget?.Entity?.GetComponent(1)?.Owner
      : void 0;
  }
  static SetSkillTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid &&
      ((t.SkillTarget = void 0), e) &&
      (e = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity) &&
      (t.SkillTarget = new EntityHandle_1.EntityHandle(e));
  }
  static IsHasInputDir(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    return !!t?.Valid && t.IsHasInputDir();
  }
  static GetSkillIdWithGroupId(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return t?.Valid ? t.GetSkillIdWithGroupId(e)?.toString() : "";
  }
  static GetSkillAcceptInput(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return !!t?.Valid && t.SkillAcceptInput;
  }
  static SetSkillAcceptInput(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && t.SetSkillAcceptInput(e);
  }
  static SetCommonSkillCanBeInterrupt(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && (t.IsMainSkillReadyEnd = e);
  }
  static GetCommonSkillCanBeInterrupt(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return !!t?.Valid && t.IsMainSkillReadyEnd;
  }
  static OnActivateAbility(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return t?.Valid ? t.OnActivateAbility(e, i) : -1;
  }
  static OnEndAbility(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && t.OnEndAbility(e, i);
  }
  static GetPriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return t?.Valid ? t.GetPriority(Number(e)) : -1;
  }
  static GetActivePriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return t?.Valid ? t.GetActivePriority(Number(e)) : -1;
  }
  static GetSkillMontageInstance(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    if (t?.Valid) return t.GetSkillMontageInstance(Number(e), i);
  }
  static SetSkillRotateLocation(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && ((e = Vector_1.Vector.Create(e)), t.SetRotateTarget(e, 1));
  }
  static SetSkillRotateDirect(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && ((e = Vector_1.Vector.Create(e)), t.SetRotateTarget(e, 2));
  }
  static CallAnimBreakPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && t.CallAnimBreakPoint();
  }
  static RollingGround(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    t?.Valid && t.RollingGrounded();
  }
  static ActivateAbilityVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    return !!t?.Valid && t.ActivateAbilityVision(e);
  }
  static EndAbilityVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    return !!t?.Valid && t.EndAbilityVision(e);
  }
  static ActivateAbilityVisionPlayAudio(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (i?.Valid)
      switch (e) {
        case 1:
          RoleAudioController_1.RoleAudioController.PlayRoleAudio(
            i.Entity,
            2001,
          );
          break;
        case 0:
          RoleAudioController_1.RoleAudioController.PlayRoleAudio(
            i.Entity,
            2002,
          );
      }
  }
  static GetVisionIdList(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    return t?.Valid ? t.GetVisionIdList() : UE.NewArray(UE.BuiltinInt);
  }
  static ExitMultiSkillStateOfMorphVision(t) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(
      t,
      Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
    )
      ?.Entity.GetComponent(41)
      ?.ExitMultiSkillState();
  }
  static SetKeepMultiSkillState(t, e, i) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(
      t,
      Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
    )
      ?.Entity.GetComponent(41)
      ?.SetKeepMultiSkillState(e, i);
  }
  static SetEnableAttackInputActionOfMorphVision(t, e) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(
      t,
      Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
    )
      ?.Entity.GetComponent(41)
      ?.SetEnableAttackInputAction(e);
  }
  static GetVisionLevelList(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    return t?.Valid ? t.GetVisionLevelList() : UE.NewArray(UE.BuiltinInt);
  }
  static GetVisionSkillId(t, e, i) {
    return PhantomUtil_1.PhantomUtil.GetEntityVisionSkillId(t, e);
  }
  static InterruptSkill(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid &&
      t.EndSkill(
        Number(e),
        "TsGameplayBlueprintFunctionLibrary.InterruptSkill",
      );
  }
  static DeleteSkills(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid &&
      t.StopAllSkills("TsGameplayBlueprintFunctionLibrary.DeleteSkills");
  }
  static GetCurrentMontageCorrespondingSkillId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return t?.Valid
      ? t.GetCurrentMontageCorrespondingSkillId()?.toString()
      : "";
  }
  static SetSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && (t.SkillTargetSocket = e);
  }
  static GetSocketName(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return t?.Valid ? t.SkillTargetSocket : "";
  }
  static GetPointTransform(t, e) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 1);
    if (t?.Valid)
      return (
        (e = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
        (t = t.SkeletalMesh)?.DoesSocketExist(e)
          ? t.D_GetSocketTransform(e, 0)
          : void 0
      );
  }
  static PlaySkillMontage2Server(t, e, i, r, n, a) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && t.PlaySkillMontage2Server(Number(e), i, r, n, a);
  }
  static EndSkillMontage(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && t.EndSkillMontage(Number(e), i);
  }
  static BeginAddMoveByInputDirect(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 249)?.SpecialSkill;
    t && t.BeginAddMoveByInputDirect?.(e, i, r, n);
  }
  static EndAddMoveByInputDirect(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 249)?.SpecialSkill;
    t && t.EndAddMoveByInputDirect?.();
  }
  static CanActivateFixHook(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    return !!t?.Valid && t.CanActivateFixHook();
  }
  static FixHookTargetLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    if (t?.Valid) return t.GetCurrentTargetLocation().ToUeVector();
  }
  static FixHookTargetPathways(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    if (t?.Valid) {
      t = t.GetCurrentPathways();
      if (t) {
        var e = UE.NewArray(UE.VectorDouble);
        for (const i of t) e.Add(i[0].ToUeVector()), e.Add(i[1].ToUeVector());
        return e;
      }
    }
  }
  static FixHookTargetEnterPortalCapture(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    if (t?.Valid) return t.GetCurrentTargetEnterPortalCapture();
  }
  static FixHookTargetActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    if (t?.Valid) return t.GetCurrentTargetActor();
  }
  static FixHookTargetIsSuiGuangType(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    return !!t?.Valid && t.GetTargetIsSuiGuangType();
  }
  static GetHookTargetType(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    return t?.Valid ? t.GetTargetType() : 0;
  }
  static FixHookTargetForward(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    if (t?.Valid) return t.GetCurrentTargetForward();
  }
  static NextFixHookTargetLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    if (t?.Valid) return t.GetNextTargetLocation();
  }
  static FixHookTargetInheritSpeed(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    return !!t?.Valid && t.GetInheritSpeed();
  }
  static FixHookTargetIsClimb(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    return !!t?.Valid && t.GetIsClimb();
  }
  static SetIsHookEndByInterrupt(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    t?.Valid && t.SetIsHookEndByInterrupt(e);
  }
  static FixHookIsSummitPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    return !!t?.Valid && (t.GetCurrentTarget()?.IsSummitPoint ?? !1);
  }
  static FixHookIsNormalPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    return !!t?.Valid && (t.GetCurrentTarget()?.IsNormalHookPoint ?? !1);
  }
  static SetIgnoreSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && t.SetIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
  }
  static DeleteIgnoreSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid &&
      t.DeleteIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
  }
  static GetToTargetSocketDistance(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    return t?.Valid ? t.GetTargetDistance() : -1;
  }
  static SetPredictProjectileInfo(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 77);
    t?.Valid && t.SetPredictProjectileInfo(e, i, r, n);
  }
  static SetVisible(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 77);
    t?.Valid && t.SetVisible(e);
  }
  static GetCharUnifiedMoveState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 99)?.MoveState;
  }
  static GetCharUnifiedPositionState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 99)?.PositionState;
  }
  static ExitHitState(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 173)?.ExitHitState();
  }
  static SetDirectionState(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 99)?.SetDirectionState(e);
  }
  static GetDirectionState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 99)?.DirectionState;
  }
  static GetIsInGame(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 99)?.IsInGame ?? !1;
  }
  static SprintPress(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 173)?.SprintPress();
  }
  static SprintRelease(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 173)?.SprintRelease();
  }
  static StandPress(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    e &&
      e.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
      EntitySystem_1.EntitySystem.GetComponent(t, 3)?.CreatureData.IsRole() &&
      e.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
  }
  static SwingPress(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 173)?.SwingPress();
  }
  static SwingRelease(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 173)?.SwingRelease();
  }
  static CustomSetWalkOrRun(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 173)?.CustomSetWalkOrRun(e);
  }
  static EnterAimStatus(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 173)?.EnterAimStatus(e);
  }
  static ExitAimStatus(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 173)?.ExitAimStatus();
  }
  static EnableEntity(t, e) {}
  static UpdateAnimInfoHit(t, e) {
    var i,
      r,
      n = EntitySystem_1.EntitySystem.GetComponent(t, 175);
    n?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 60)) &&
      ((e = e),
      (n = n.AnimLogicParamsSetter),
      (i = t.GetAcceptedNewBeHitAndReset()),
      n.AcceptedNewBeHit !== i &&
        ((n.AcceptedNewBeHit = i), (e.AcceptedNewBeHitRef = i)),
      (r = t.BeHitAnim),
      n.BeHitAnim !== r && ((n.BeHitAnim = r), (e.BeHitAnimRef = r)),
      (i = t.GetEnterFkAndReset()),
      n.EnterFk !== i && ((n.EnterFk = i), (e.EnterFkRef = i)),
      (i = t.GetDoubleHitInAir()),
      n.DoubleHitInAir !== i) &&
      ((n.DoubleHitInAir = i), (e.DoubleHitInAirRef = i));
  }
  static UpdateAnimInfoFk(e, i) {
    var r = EntitySystem_1.EntitySystem.GetComponent(e, 175);
    if (r?.Valid) {
      e = EntitySystem_1.EntitySystem.GetComponent(e, 60);
      if (e) {
        r = r.AnimLogicParamsSetter;
        let t = e.BeHitDirect;
        r.BeHitDirect.Equals(t) ||
          (r.BeHitDirect.DeepCopy(t), (i.BeHitDirectRef = t.ToUeVectorOld())),
          (t = e.BeHitLocation),
          r.BeHitLocation.Equals(t) ||
            (r.BeHitLocation.DeepCopy(t),
            (i.BeHitLocationRef = t.ToUeVectorOld()));
      }
    }
  }
  static UpdateAnimInfoUnifiedState(t, e) {
    var i,
      r = EntitySystem_1.EntitySystem.GetComponent(t, 175);
    r?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 99)) &&
      ((e = e),
      (r = r.AnimLogicParamsSetter),
      (i = t.MoveState),
      r.CharMoveState !== i &&
        ((r.CharMoveState = i), (e.CharMoveStateRef = i)),
      (i = t.PositionState),
      r.CharPositionState !== i &&
        ((r.CharPositionState = i), (e.CharPositionStateRef = i)),
      (i = t.DirectionState),
      r.CharCameraState !== i) &&
      ((r.CharCameraState = i), (e.CharCameraStateRef = i));
  }
  static UpdateAnimInfoUnifiedStateRoleNpc(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 175);
    i?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 99)) &&
      ((e = e),
      (i = i.AnimLogicParamsSetter),
      (t = t.MoveState),
      i.CharMoveState !== t) &&
      ((i.CharMoveState = t), (e.CharMoveStateRef = t));
  }
  static GetIsCharRotateWithCameraWhenManipulate(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 64);
    return !!t?.Valid && t.GetIsCharRotateWithCameraWhenManipulate();
  }
  static GetIsUseCatapultUpAnim(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 29);
    return !!t?.Valid && t.IsUseCatapultUpAnim;
  }
  static GetNextMultiSkillId(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 205);
    return t?.Valid ? t.GetNextMultiSkillId(e) : 0;
  }
  static GetNextMultiSkillIdNew(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 205);
    return t?.Valid ? t.GetNextMultiSkillId(e) : 0;
  }
  static GetManipulateInteractTargetCanInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    return !t || t.CheckCurrentTargetCanInteract();
  }
  static GetHookInteractTargetCanInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    return !t || t.CheckCurrentTargetCanInteract();
  }
  static GetHookInteractTargetIsIgnorePlayerCollision(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 97);
    return !!t && t.GetCurrentTargetIsIgnorePlayerCollision();
  }
  static StartManipulateInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    return !!t && t.StartPullGiantInteract();
  }
  static EndManipulateInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    t && t.EndPullGiantInteract();
  }
  static StartStatueInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    return !!t && t.StartStatueInteract();
  }
  static EndStatueInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    t && t.EndStatueInteract();
  }
  static StartCustomInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    return !!t && t.StartCustomInteract();
  }
  static EndCustomInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    t && t.EndCustomInteract();
  }
  static GetManipulateInteractLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
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
    (t = EntitySystem_1.EntitySystem.GetComponent(t, 32)),
      (e = EntitySystem_1.EntitySystem.Get(e));
    t?.Valid &&
      e?.Valid &&
      t.LockOnSpecifyTarget(new EntityHandle_1.EntityHandle(e));
  }
  static IsSkillInCd(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 205);
    return !!t?.Valid && t.IsSkillInCd(e);
  }
  static SendHookSkillUseLogData(t, e) {
    var i = new LogReportDefine_1.HookSkillUseLogData(),
      t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
    (i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
      (i.i_father_area_id =
        ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
      (i.f_pos_x = t.X),
      (i.f_pos_y = t.Y),
      (i.f_pos_z = t.Z),
      (i.i_has_target = e ? 1 : 0),
      LogReportController_1.LogReportController.UnitLogReport(i);
  }
  static SendManipulateSkillUseLogData(t, e) {
    var i = new LogReportDefine_1.ManipulateSkillUseLogData(),
      t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
    (i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
      (i.i_father_area_id =
        ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
      (i.f_pos_x = t.X),
      (i.f_pos_y = t.Y),
      (i.f_pos_z = t.Z),
      (i.i_has_target = e ? 1 : 0),
      LogReportController_1.LogReportController.UnitLogReport(i);
  }
  static SendScanSkillUseLogData(t, e) {
    var i = new LogReportDefine_1.ScanSkillUseLogData(),
      t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
    (i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
      (i.i_father_area_id =
        ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
      (i.f_pos_x = t.X),
      (i.f_pos_y = t.Y),
      (i.f_pos_z = t.Z),
      (i.i_has_target = e ? 1 : 0),
      LogReportController_1.LogReportController.UnitLogReport(i);
  }
  static DynamicAttachEntityToActor(e, i, r) {
    var n = EntitySystem_1.EntitySystem.Get(e),
      e = EntitySystem_1.EntitySystem.GetComponent(e, 123);
    if (n && e) {
      let t = new UE.TransformDouble();
      var a,
        i = EntitySystem_1.EntitySystem.Get(i),
        s = i?.GetComponent(1)?.Owner;
      s &&
        (s.IsA(UE.Character.StaticClass())
          ? (a = s).Mesh.DoesSocketExist(r) &&
            (t = a.Mesh.D_GetSocketTransform(r, 0))
          : (t = s.D_GetTransform()),
        n
          .GetComponent(1)
          ?.SetActorLocationAndRotation(
            t.GetLocation(),
            t.GetRotation().Rotator(),
          ),
        void 0 !== (a = i?.GetComponent(0)?.GetCreatureDataId())) &&
        (((r =
          new SceneItemDynamicAttachTargetComponent_1.AttachParam()).PosAttachType =
          1),
        (r.RotAttachType = 1),
        e.RegEntityTargetByCreatureDataId(
          a,
          void 0,
          r,
          "DynamicAttachEntityToActor",
        ));
    }
  }
  static SetEntityEnable(t, e, i, r) {
    i?.IsValid()
      ? ((i = `[蓝图:${i.GetName()}] ` + r),
        (r = EntitySystem_1.EntitySystem.Get(t))?.Valid &&
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            r,
            e,
            i,
            !0,
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          28,
          "调用SetEntityEnable失败，因为callObject为空",
        );
  }
  static SetActorVisible(t, e, i, r, n, a = !1) {
    t = EntitySystem_1.EntitySystem.Get(t);
    t?.Valid &&
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
        t,
        e,
        i,
        r,
        n,
        a,
      );
  }
  static SetSkillTargetDirection(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    t?.Valid && t.SetSkillTargetDirection(e);
  }
  static ChangeAiControllerDebugDraw(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 46);
    i?.Valid
      ? i.SetDebugDraw(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("AI", 42, "实体不含AiComp", ["entityId", t]);
  }
  static GetBeHitAnimType(t) {
    return t;
  }
  static StartInhalation(t, e, i, r, n, a) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 260);
    if (t?.Valid) {
      var s = [],
        o = (0, puerts_1.$unref)(a);
      for (let t = 0; t < o.Num(); t++) s.push(o.Get(t));
      t.StartInhalation(e, i, r, n, s);
    }
  }
  static StopInhalation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 260);
    t?.Valid && t.StopInhalation();
  }
  static ChangeBlueprintVariablesRef(e, t) {
    const n = (t, e) => {
      var i = t.SubGraphs;
      for (let t = 0; t < i.Num(); t++) {
        var r = i.Get(t);
        e.push(r), n(r, e);
      }
    };
    var i = new Map();
    if (e instanceof UE.AnimBlueprint) {
      if (!UE.EditorOperations.GetDefaultObject(e.ParentClass)) return e;
      var r = [];
      for (let t = 0; t < e.FunctionGraphs.Num(); t++) {
        var a = e.FunctionGraphs.Get(t);
        r.push(a), n(a, r);
      }
      for (let t = 0; t < e.EventGraphs.Num(); t++) {
        var s = e.EventGraphs.Get(t);
        r.push(s), n(s, r);
      }
      for (const c of r) {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("AI", 42, "FunctionGraphs", ["Name", c.GetName()]);
        var o = c?.Nodes;
        for (let t = 0; t < o.Num(); t++) {
          var y,
            l = o.Get(t);
          l instanceof UE.K2Node_Variable &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "AI",
                42,
                "Change Graph Node",
                ["Name", l.GetName()],
                ["MemberName", l.VariableReference.MemberName],
                ["MemberGuid", l.VariableReference.MemberGuid],
                ["MemberScope", l.VariableReference.MemberScope],
                ["MemberParent", l.VariableReference.MemberParent?.GetName()],
              ),
            (y = l.VariableReference.MemberName.toString()),
            i.has(y)) &&
            ((l.VariableReference.MemberName =
              FNameUtil_1.FNameUtil.GetDynamicFName(i.get(y))),
            (l.VariableReference.MemberGuid.A = 0),
            (l.VariableReference.MemberGuid.B = 0),
            (l.VariableReference.MemberGuid.C = 0),
            (l.VariableReference.MemberGuid.D = 0));
        }
      }
    }
    return e;
  }
  static TryGetDebugMovementComp(t) {
    let e = 0;
    try {
      e = Number(t);
    } catch {
      return void (
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("AI", 42, "添加监听输入的PbDataId转number异常", [
          "pbDataId",
          t,
        ])
      );
    }
    if (0 !== e) {
      t = new Array();
      if (
        (ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithPbDataId(
          e,
          t,
        ),
        0 !== t.length)
      ) {
        if (t[0]?.Entity?.GetComponent(0)?.IsVehicle()) {
          const i = t[0]?.Entity?.GetComponent(231)?.DebugMovementComp;
          return i?.SetDebug(!0), i?.UeDebugComp;
        }
        const i = t[0]?.Entity?.GetComponent(3)?.DebugMovementComp;
        return i?.SetDebug(!0), i?.UeDebugComp;
      }
    }
  }
  static TryPlayLinkAnim() {
    BattleLinkController_1.BattleLinkController.TryPlaySplitScreen();
  }
  static TraceGround(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(3);
    if (t) {
      (i = UE.VectorDouble.Dist(e, i)),
        (t = (0, SkillBehaviorMisc_1.traceGroundWithGravity)(
          t,
          Vector_1.Vector.Create(e),
          r,
          i,
        ));
      if (t[0]) return (e = t[1]), new UE.VectorDouble(e.X, e.Y, e.Z);
    }
  }
  static ChangePhantomTeam(t, e) {
    var i = [],
      r = (0, puerts_1.$unref)(e);
    for (let t = 0; t < r.Num(); t++) i.push(r.Get(t));
    ControllerHolder_1.ControllerHolder.SceneTeamController.ChangePhantomTeam(
      t,
      i,
    );
  }
  static RevertPhantomTeam() {
    ControllerHolder_1.ControllerHolder.SceneTeamController.RevertPhantomTeam();
  }
  static GetFormationAttribute(t) {
    return (
      ModelManager_1.ModelManager.FormationAttributeModel?.GetValue(t) ?? 0
    );
  }
  static GetEntityDeltaMillisecond(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return t
      ? Time_1.Time.DeltaTime *
          t.TimeDilation *
          (t.GetComponent(120)?.CurrentTimeScale ?? 1)
      : 1;
  }
  static SyncTwoEntityLocationAndRotation(t, e) {
    var t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t),
      e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    t?.Valid &&
      e?.Valid &&
      ((t = t.Entity?.GetComponent(1)), (e = e.Entity?.GetComponent(1)), t) &&
      e &&
      e.SetActorLocationAndRotation(
        t.ActorLocation,
        t.ActorRotation,
        "SyncTwoEntityLocationAndRotation",
        !1,
      );
  }
  static GetFishingBoat() {
    var t =
      ModelManager_1.ModelManager.FishingModel.GetShipData().GetEntityHandle()
        ?.Entity;
    if (t?.IsInit) return t.GetComponent(1)?.Owner;
  }
  static FishingBoatSprint(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 271);
    t?.Valid && t.FishingBoatEnterSprint(e, i, r);
  }
  static FishingBoatSkill(t) {
    ControllerHolder_1.ControllerHolder.FishingController.BeginFishingSkill(t);
  }
  static GetCharacterMorphType(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 276)?.GetMorphType() ?? 0
    );
  }
  static SetCharacterMorphType(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 276)?.SetMorphType(e);
  }
  static SetSpecialEnergyAttrValue(t, e, i) {
    AbilityUtils_1.AbilityUtils.SetSpecialEnergyAttrValue(t, e, i);
  }
  static StartBattleQte(t, e, i) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t),
      t = EntitySystem_1.EntitySystem.GetComponent(t, 39)?.GetSkill(e)?.LFc;
    r &&
      t &&
      ControllerHolder_1.ControllerHolder.BattleQteController.StartBattleQte(
        i,
        t,
        r,
        1,
      );
  }
  static StopGroup1Skill(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    t?.Valid && t.StopGroup1Skill(e);
  }
  static GetCharactersLocationNearBy(t, e, i) {
    return ControllerHolder_1.ControllerHolder.CreatureController.GetCharactersLocationNearBy(
      t,
      e,
      i,
    );
  }
}
exports.default = TsGameplayBlueprintFunctionLibrary;
//# sourceMappingURL=TsGameplayBlueprintFunctionLibrary.js.map
