"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Info_1 = require("../../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../../Core/Common/Log"),
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
  LockOnDebug_1 = require("../../Component/LockOn/LockOnDebug"),
  SkillBehaviorAction_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorAction"),
  SkillBehaviorCondition_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorCondition");
class TsGameplayBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static ContainsTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 190);
    return !(!t?.Valid || !e) && t.HasTag(e.TagId);
  }
  static AddTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 190);
    t?.Valid && e && t.AddTag(e.TagId);
  }
  static AddTagWithDuration(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    !t?.Valid || !i || e <= 0 || t.AddTagWithReturnHandle([i.TagId], e);
  }
  static AddTagByName(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 190);
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 190);
    t?.Valid && e && t.RemoveTag(e.TagId);
  }
  static RemoveTagByName(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 190);
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
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 19);
    n?.Valid &&
      ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t || e)),
      n.CreateGameplayCue(i, { Instigator: t }));
  }
  static RemoveCue(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 19);
    t?.Valid && t.DestroyGameplayCue(e);
  }
  static IsLogicAutonomousProxy(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 3)?.IsAutonomousProxy ?? !1
    );
  }
  static RemoveActiveGameplayEffect(t, e, i = -1) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    return !!t?.Valid && 0 < t.RemoveBuffByHandle(e.Handle, i);
  }
  static RemoveBuffByTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 160);
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
    var n,
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
    t &&
      ((n = EntitySystem_1.EntitySystem.GetComponent(e, 160))
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
      ?.Entity?.GetComponent(34)
      ?.GetLoadingSkill(e);
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
  static AddBuffFromGA(i, n, r, a, s) {
    a = TsGameplayBlueprintFunctionLibrary.GetSpecialBuffToSkillId(r, a);
    if (
      "" === a &&
      -1 === CharacterBuffIds_1.specialIgnoreGaBuff.findIndex((t) => t === r)
    )
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 36, "AddBuffFromGA的SkillId为空", [
          "buffId",
          r,
        ]);
    else {
      var o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(i);
      if (o) {
        var y = EntitySystem_1.EntitySystem.GetComponent(
          i,
          34,
        )?.GetLoadingSkill(Number(a));
        let t = y?.CombatMessageId,
          e = y?.AbilityClass?.GetName();
        t ||
          ((y = EntitySystem_1.EntitySystem.GetComponent(i, 0).GetSummonerId()),
          (e = (
            0 < y
              ? ((y =
                  ModelManager_1.ModelManager.CreatureModel.GetEntity(
                    y,
                  )?.Entity?.GetComponent(34)),
                (t = y?.GetLoadingSkill(Number(a))?.CombatMessageId),
                y?.GetLoadingSkill(Number(a)))
              : ((y =
                  TsGameplayBlueprintFunctionLibrary.TryGetSummonedEntitySkill(
                    i,
                    Number(a),
                  )),
                (t = y?.CombatMessageId),
                y)
          )?.AbilityClass?.GetName())),
          n instanceof TsBaseCharacter_1.default &&
            ((i = n.CharacterActorComponent.Entity.CheckGetComponent(160))
              ? i.AddBuff(r, {
                  InstigatorId: o,
                  Reason: `技能${a}GA${e}的buff添加`,
                  PreMessageId: t,
                  OuterStackCount: s,
                })
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Battle",
                  20,
                  "添加buff对象没有BuffComponent",
                  ["Target", n.GetName()],
                  ["BuffId", r],
                ));
      }
    }
  }
  static RemoveBuffById(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    t?.Valid && t.RemoveBuff(e, i, "从蓝图移除Buff");
  }
  static GetBuffCountById(t, e, i) {
    t = EntitySystem_1.EntitySystem.Get(t).GetComponent(194);
    return t?.Valid ? t.GetBuffTotalStackById(e, i) : 0;
  }
  static AddGameplayCueLocal(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 194);
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
      EntitySystem_1.EntitySystem.GetComponent(t, 67)?.GetShieldValue(e) ?? 0
    );
  }
  static GetBuffDebugStringsNoBlueprint(t, e = "") {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 160),
      t = EntitySystem_1.EntitySystem.GetComponent(t, 20);
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
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 20),
      n =
        (n && n?.DebugResetBaseValue(e, i),
        ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t)),
      t = StringUtils_1.StringUtils.Format(
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
    var t,
      i = e.GetListItems(),
      n = new Set();
    for (let t = i.Num() - 1; 0 <= t; t--) {
      var r = i.Get(t),
        a = Number(r.GetName().split(",")[0]);
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
    var t,
      i = e.GetOptionCount(),
      n = new Set();
    for (let t = i - 1; 0 <= t; t--) {
      var r = e.GetOptionAtIndex(t),
        a = Number(/_(?<entityId>\d+)$/.exec(r)?.groups.entityId ?? 0);
      0 === a || n.has(a) || !EntitySystem_1.EntitySystem.Get(a)
        ? e.RemoveOption(r)
        : n.add(a);
    }
    for (const s of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      n.has(s?.Id) ||
        ((t = s?.Entity?.GetComponent(3)?.Actor?.GetName()) &&
          e.AddOption(t + "_" + s.Id));
  }
  static SetEntityComboBox(t, e) {
    var i = EntitySystem_1.EntitySystem.Get(e),
      n = i?.GetComponent(3)?.Actor?.GetName(),
      r = t.GetSelectedOption();
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
    var n = [...i.matchAll(/[0-9]+/g)].map((t) => t[0] ?? ""),
      r = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(194);
    if (r) {
      var a,
        s,
        o = e.GetListItems(),
        y = new Set();
      for (let t = o.Num() - 1; 0 <= t; t--) {
        var l = o.Get(t);
        const c = r.GetBuffByHandle(Number(l.GetName().split(",")[1]));
        void 0 === c ||
        y.has(c.Handle) ||
        (0 < n.length && !n.some((t) => String(c.Id).startsWith(t)))
          ? e.RemoveItem(l)
          : y.add(c.Handle);
      }
      for (const u of r.GetAllBuffs())
        y.has(u.Handle) ||
          (0 < n.length && !n.some((t) => String(u.Id).startsWith(t))) ||
          ((a = new UE.Layer(e, t + "," + u.Handle)), e.AddItem(a));
      if (
        (0, RegisterComponent_1.isComponentInstance)(r, 175) &&
        r.GetFormationBuffComp()
      )
        for (const S of r.GetFormationBuffComp().GetAllBuffs())
          y.has(S.Handle) ||
            (0 < n.length && !n.some((t) => String(S.Id).startsWith(t))) ||
            ((s = new UE.Layer(e, t + "," + S.Handle)), e.AddItem(s));
    } else e.ClearListItems();
  }
  static GetDebugBuff(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(194),
      i = t?.GetBuffByHandle(e);
    return (
      i ||
      (!i && (0, RegisterComponent_1.isComponentInstance)(t, 175)
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
      184,
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
    let r = "";
    const a = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    var i = a?.GetOwnerBuffComponent();
    if (!a || !i) return r;
    a.Config.GrantedTags?.forEach((t) => {
      r += `附加标签 ${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)}
`;
    });
    for (const n of i.BuffEffectManager?.GetEffectsByHandle(a.Handle) ?? [])
      r += `激活效果 undefined(cd:${(i.GetBuffEffectCd(n.BuffId, n.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)
`;
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
          n = void 0;
        switch (t.CalculationPolicy[0]) {
          case 0:
            r += `属性${n}增加${t.Value1}
`;
            break;
          case 1:
            r += `属性${n}增加${(e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * 100).toFixed(1)}%
`;
            break;
          case 2:
          case 4:
            (r +=
              `属性${n}${2 === t.CalculationPolicy[0] ? "增加" : "覆盖为"}${1 === t.CalculationPolicy[2] ? "施加者" : "持有者"}${Protocol_1.Aki.Protocol.Vks[t.CalculationPolicy[1]]}${["基础值", "当前值", "附加值"][t.CalculationPolicy[3]]}的${(0.01 * e).toFixed(1)}%+` +
              i +
              (t.CalculationPolicy[4] ? "(快照)" : "")),
              t.CalculationPolicy[5] &&
                (r += "，下限" + t.CalculationPolicy[5]),
              t.CalculationPolicy[6] &&
                (r += "，比例" + t.CalculationPolicy[6]),
              t.CalculationPolicy[7] &&
                (r += "，上限" + t.CalculationPolicy[7]),
              (r += "\n");
            break;
          case 3:
            r += `属性${n}覆盖为${t.Value1}
`;
            break;
          default:
            r += "修改属性" + n;
        }
      }),
      r.trimEnd()
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
    return EntitySystem_1.EntitySystem.GetComponent(t, 159)?.GetCurrentValue(e);
  }
  static GetAttributeBaseValue(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 159)?.GetBaseValue(e);
  }
  static SetRageModeId(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 53)?.SetRageModeId(e);
  }
  static SetHardnessModeId(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 53)?.SetHardnessModeId(e);
  }
  static OnHit(t, e) {
    (t = EntitySystem_1.EntitySystem.GetComponent(t, 53)),
      (e = BulletTypes_1.HitInformation.FromUeHitInformation(e));
    t?.OnHit(e, !0, void 0, !1, !1, void 0, void 0, void 0);
  }
  static SetBeHitIgnoreRotate(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 53)?.SetBeHitIgnoreRotate(e);
  }
  static CheckHasPart(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.IsMultiPart ?? !1;
  }
  static GetPartRemainedLife(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 61);
    return t?.IsMultiPart ? t.GetPartByTag(e).RemainedLife() : -1;
  }
  static ResetPartLife(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 61);
    t?.IsMultiPart && t.GetPartByTag(e).ResetLife();
  }
  static ActiveStiff(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 53)?.ActiveStiff(1);
  }
  static DeActiveStiff(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 53)?.DeActiveStiff(
      "蓝图退出硬直",
    );
  }
  static GetAcceptedNewBeHitAndReset(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(
        t,
        53,
      )?.GetAcceptedNewBeHitAndReset() ?? !1
    );
  }
  static GetEnterFkAndReset(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 53)?.GetEnterFkAndReset() ??
      !1
    );
  }
  static IsStiff(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 53)?.IsStiff() ?? !1;
  }
  static GetRageModeId(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 53)?.RageModeId;
  }
  static GetHardnessModeId(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 53)?.HardnessModeId;
  }
  static GetBeHitBone(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 53);
    return t?.BeHitBones && 0 < t?.BeHitBones?.length
      ? t.BeHitBones[0]
      : FNameUtil_1.FNameUtil.EMPTY;
  }
  static GetToughDecreaseValue(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 53)?.ToughDecreaseValue;
  }
  static GetCounterAttackInfoInternal(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 53)
      ?.CounterAttackInfoInternal;
  }
  static GetVisionCounterAttackInfoInternal(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 53)
      ?.VisionCounterAttackInfoInternal;
  }
  static GetBeHitTime(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 53)?.BeHitTime;
  }
  static GetBeHitAnim(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 53);
    return t ? t.BeHitAnim : 0;
  }
  static GetEnterFk(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 53)?.EnterFk ?? !1;
  }
  static GetBeHitDirect(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      53,
    )?.BeHitDirect.ToUeVector();
  }
  static GetBeHitLocation(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      53,
    )?.BeHitLocation.ToUeVector();
  }
  static AddCheckBuffList(t, e) {}
  static ClearCheckBuffList(t) {}
  static CounterAttackEnd(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 53)?.CounterAttackEnd();
  }
  static VisionCounterAttackEnd(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 53)?.VisionCounterAttackEnd();
  }
  static SetCounterAttackEndTime(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 53)?.SetCounterAttackEndTime(e);
  }
  static IsTriggerCounterAttack(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(t, 53)?.IsTriggerCounterAttack ??
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
    return EntitySystem_1.EntitySystem.GetComponent(t, 57)?.Valid ?? !1;
  }
  static ManipulateGetDrawTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    if (t?.Valid) return t.GetDrawTarget();
  }
  static ManipulateGetCastTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    if (t?.Valid) return t.GetCastTarget();
  }
  static ManipulateGetDrawTargetChantTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    return t?.Valid ? t.GetDrawTargetChantTime() : 0;
  }
  static ManipulateChant(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    return !!t?.Valid && t.Chant(e);
  }
  static ManipulateDraw(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    return !!t?.Valid && t.Draw();
  }
  static ManipulateCast(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    return !!t?.Valid && t.Precast(e);
  }
  static ManipulateReset(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    t?.Valid && t.Reset();
  }
  static ManipulateChangeToProjectileState(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    return !!t?.Valid && t.ChangeToProjectileState();
  }
  static ManipulateChangeToNormalState(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    return !!t?.Valid && t.ChangeToNormalState();
  }
  static GetHoldingActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    if (t?.Valid) return t.GetHoldingActor();
  }
  static SetDebugDraw(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    t?.Valid && (t.DebugDrawSphereAndArrow = e);
  }
  static ExtraAction(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    t?.Valid && t.ExtraAction();
  }
  static SetQtePosition(t, e, i, n, r, a, s, o = 0) {
    EntitySystem_1.EntitySystem.GetComponent(t, 89)?.SetQtePosition({
      Rotate: e,
      Length: i,
      Height: n,
      ReferenceTarget: r,
      QteType: o,
    });
  }
  static GetDtSkillInfo(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    if (t?.Valid) return t.DtSkillInfo;
  }
  static GetLastActivateSkillTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.LastActivateSkillTime : 0;
  }
  static SetLastActivateSkillTime(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.SetLastActivateSkillTime(e);
  }
  static GetSkillElevationAngle(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.SkillElevationAngle : 0;
  }
  static SetSkillElevationAngle(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.SetSkillElevationAngle(e);
  }
  static CurrentSkillId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.CurrentSkill?.SkillId.toString() : "";
  }
  static CurrentPriority(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.CurrentPriority : 0;
  }
  static SetCurrentPriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.SetCurrentPriority(e);
  }
  static HasAbility(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return !!t?.Valid && t.HasAbility(Number(e));
  }
  static GetSkillInfo(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    if (t?.Valid) return t.GetSkillInfo(Number(e));
  }
  static SetSkillPriority(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.SetSkillPriority(Number(e), i);
  }
  static EndSkill(t, e, i, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid &&
      t.EndSkill(Number(e), "TsGameplayBlueprintFunctionLibrary.EndSkill");
  }
  static BeginSkill(t, e, i, n, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return (
      !!t?.Valid &&
      t.BeginSkill(Number(e.toString()), {
        Target: n,
        SocketName: r.toString(),
        Context: "TsGameplayBlueprintFunctionLibrary.BeginSkill",
      })
    );
  }
  static SkillBehaviorBegin(t, e, i) {
    var t = EntitySystem_1.EntitySystem.Get(t),
      n = t?.GetComponent(34),
      e = n?.GetSkill(e.SkillId);
    t &&
      n?.Valid &&
      e &&
      ((t = { Entity: t, SkillComponent: n, Skill: e }),
      SkillBehaviorAction_1.SkillBehaviorAction.Begin(i, t));
  }
  static SkillBehaviorSatisfy(t, e, i) {
    var t = EntitySystem_1.EntitySystem.Get(t),
      n = t?.GetComponent(34),
      e = n?.GetSkill(e.SkillId);
    return (
      !!(t && n?.Valid && e) &&
      ((t = { Entity: t, SkillComponent: n, Skill: e }),
      SkillBehaviorCondition_1.SkillBehaviorCondition.Satisfy(i, t))
    );
  }
  static GetSkillTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid && t.SkillTarget
      ? t.SkillTarget?.Entity?.GetComponent(1)?.Owner
      : void 0;
  }
  static SetSkillTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid &&
      ((t.SkillTarget = void 0), e) &&
      (e = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity) &&
      (t.SkillTarget = new EntityHandle_1.EntityHandle(e));
  }
  static IsHasInputDir(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return !!t?.Valid && t.IsHasInputDir();
  }
  static GetSkillIdWithGroupId(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.GetSkillIdWithGroupId(e)?.toString() : "";
  }
  static GetSkillAcceptInput(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return !!t?.Valid && t.SkillAcceptInput;
  }
  static SetSkillAcceptInput(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.SetSkillAcceptInput(e);
  }
  static SetCommonSkillCanBeInterrupt(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && (t.IsMainSkillReadyEnd = e);
  }
  static GetCommonSkillCanBeInterrupt(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return !!t?.Valid && t.IsMainSkillReadyEnd;
  }
  static OnActivateAbility(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.OnActivateAbility(e, i) : -1;
  }
  static OnEndAbility(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.OnEndAbility(e, i);
  }
  static GetPriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.GetPriority(Number(e)) : -1;
  }
  static GetActivePriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.GetActivePriority(Number(e)) : -1;
  }
  static GetSkillMontageInstance(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    if (t?.Valid) return t.GetSkillMontageInstance(Number(e), i);
  }
  static SetSkillRotateLocation(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && ((e = Vector_1.Vector.Create(e)), t.SetRotateTarget(e, 1));
  }
  static SetSkillRotateDirect(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && ((e = Vector_1.Vector.Create(e)), t.SetRotateTarget(e, 2));
  }
  static CallAnimBreakPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.CallAnimBreakPoint();
  }
  static RollingGround(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.RollingGrounded();
  }
  static ActivateAbilityVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 36);
    return !!t?.Valid && t.ActivateAbilityVision(e);
  }
  static EndAbilityVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 36);
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 36);
    return t?.Valid ? t.GetVisionIdList() : UE.NewArray(UE.BuiltinInt);
  }
  static ExitMultiSkillStateOfMorphVision(t) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(
      t,
      Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
    )
      ?.Entity.GetComponent(35)
      ?.ExitMultiSkillState();
  }
  static SetKeepMultiSkillState(t, e, i) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(
      t,
      Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
    )
      ?.Entity.GetComponent(35)
      ?.SetKeepMultiSkillState(e, i);
  }
  static SetEnableAttackInputActionOfMorphVision(t, e) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(
      t,
      Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
    )
      ?.Entity.GetComponent(35)
      ?.SetEnableAttackInputAction(e);
  }
  static GetVisionLevelList(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 36);
    return t?.Valid ? t.GetVisionLevelList() : UE.NewArray(UE.BuiltinInt);
  }
  static GetVisionSkillId(t, e, i) {
    return PhantomUtil_1.PhantomUtil.GetEntityVisionSkillId(t, e);
  }
  static InterruptSkill(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid &&
      t.EndSkill(
        Number(e),
        "TsGameplayBlueprintFunctionLibrary.InterruptSkill",
      );
  }
  static DeleteSkills(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid &&
      t.StopAllSkills("TsGameplayBlueprintFunctionLibrary.DeleteSkills");
  }
  static GetCurrentMontageCorrespondingSkillId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid
      ? t.GetCurrentMontageCorrespondingSkillId()?.toString()
      : "";
  }
  static SetSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && (t.SkillTargetSocket = e);
  }
  static GetSocketName(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.SkillTargetSocket : "";
  }
  static GetPointTransform(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    if (t?.Valid)
      return t.GetPointTransform(FNameUtil_1.FNameUtil.GetDynamicFName(e));
  }
  static PlaySkillMontage2Server(t, e, i, n, r, a) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.PlaySkillMontage2Server(Number(e), i, n, r, a);
  }
  static EndSkillMontage(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.EndSkillMontage(Number(e), i);
  }
  static CanActivateFixHook(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    return !!t?.Valid && t.CanActivateFixHook();
  }
  static FixHookTargetLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    if (t?.Valid) return t.GetCurrentTargetLocation();
  }
  static FixHookTargetPathways(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    if (t?.Valid) {
      t = t.GetCurrentPathways();
      if (t) {
        var e = UE.NewArray(UE.Vector);
        for (const i of t) e.Add(i[0].ToUeVector()), e.Add(i[1].ToUeVector());
        return e;
      }
    }
  }
  static FixHookTargetEnterPortalCapture(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    if (t?.Valid) return t.GetCurrentTargetEnterPortalCapture();
  }
  static FixHookTargetActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    if (t?.Valid) return t.GetCurrentTargetActor();
  }
  static FixHookTargetIsSuiGuangType(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    return !!t?.Valid && t.GetTargetIsSuiGuangType();
  }
  static FixHookTargetForward(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    if (t?.Valid) return t.GetCurrentTargetForward();
  }
  static NextFixHookTargetLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    if (t?.Valid) return t.GetNextTargetLocation();
  }
  static FixHookTargetInheritSpeed(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    return !!t?.Valid && t.GetInheritSpeed();
  }
  static FixHookTargetIsClimb(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    return !!t?.Valid && t.GetIsClimb();
  }
  static SetIgnoreSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.SetIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
  }
  static DeleteIgnoreSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid &&
      t.DeleteIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
  }
  static GetToTargetSocketDistance(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    return t?.Valid ? t.GetTargetDistance() : -1;
  }
  static SetPredictProjectileInfo(t, e, i, n, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    t?.Valid && t.SetPredictProjectileInfo(e, i, n, r);
  }
  static SetVisible(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    t?.Valid && t.SetVisible(e);
  }
  static GetCharUnifiedMoveState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 92)?.MoveState;
  }
  static GetCharUnifiedPositionState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 92)?.PositionState;
  }
  static ExitHitState(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 161)?.ExitHitState();
  }
  static SetDirectionState(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 92)?.SetDirectionState(e);
  }
  static GetDirectionState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 92)?.DirectionState;
  }
  static GetIsInGame(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 92)?.IsInGame ?? !1;
  }
  static SprintPress(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 161)?.SprintPress();
  }
  static SprintRelease(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 161)?.SprintRelease();
  }
  static StandPress(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 92);
    e &&
      e.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
      EntitySystem_1.EntitySystem.GetComponent(t, 3)?.CreatureData.IsRole() &&
      e.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
  }
  static SwingPress(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 161)?.SwingPress();
  }
  static SwingRelease(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 161)?.SwingRelease();
  }
  static CustomSetWalkOrRun(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 161)?.CustomSetWalkOrRun(e);
  }
  static EnterAimStatus(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 161)?.EnterAimStatus(e);
  }
  static ExitAimStatus(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 161)?.ExitAimStatus();
  }
  static EnableEntity(t, e) {}
  static UpdateAnimInfoHit(t, e) {
    var i,
      n,
      r = EntitySystem_1.EntitySystem.GetComponent(t, 163);
    r?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 53)) &&
      ((e = e),
      (r = r.AnimLogicParamsSetter),
      (i = t.GetAcceptedNewBeHitAndReset()),
      r.AcceptedNewBeHit !== i &&
        ((r.AcceptedNewBeHit = i), (e.AcceptedNewBeHitRef = i)),
      (n = t.BeHitAnim),
      r.BeHitAnim !== n && ((r.BeHitAnim = n), (e.BeHitAnimRef = n)),
      (i = t.GetEnterFkAndReset()),
      r.EnterFk !== i && ((r.EnterFk = i), (e.EnterFkRef = i)),
      (i = t.GetDoubleHitInAir()),
      r.DoubleHitInAir !== i) &&
      ((r.DoubleHitInAir = i), (e.DoubleHitInAirRef = i));
  }
  static UpdateAnimInfoFk(e, i) {
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 163);
    if (n?.Valid) {
      e = EntitySystem_1.EntitySystem.GetComponent(e, 53);
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
    var i,
      n = EntitySystem_1.EntitySystem.GetComponent(t, 163);
    n?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 92)) &&
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
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 163);
    i?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 92)) &&
      ((e = e),
      (i = i.AnimLogicParamsSetter),
      (t = t.MoveState),
      i.CharMoveState !== t) &&
      ((i.CharMoveState = t), (e.CharMoveStateRef = t));
  }
  static GetIsCharRotateWithCameraWhenManipulate(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    return !!t?.Valid && t.GetIsCharRotateWithCameraWhenManipulate();
  }
  static GetIsUseCatapultUpAnim(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 26);
    return !!t?.Valid && t.IsUseCatapultUpAnim;
  }
  static GetNextMultiSkillId(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 192);
    return t?.Valid ? t.GetNextMultiSkillId(e) : 0;
  }
  static StartManipulateInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 58);
    return !!t && t.StartInteract();
  }
  static EndManipulateInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 58);
    t && t.EndInteract();
  }
  static GetManipulateInteractLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 58);
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 192);
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
  static DynamicAttachEntityToActor(e, i, n) {
    var r = EntitySystem_1.EntitySystem.Get(e),
      e = EntitySystem_1.EntitySystem.GetComponent(e, 113);
    if (r && e) {
      let t = new UE.Transform();
      var a,
        i = EntitySystem_1.EntitySystem.Get(i),
        s = i?.GetComponent(1)?.Owner;
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
        (((n =
          new SceneItemDynamicAttachTargetComponent_1.AttachParam()).PosAttachType =
          1),
        (n.RotAttachType = 1),
        e.RegEntityTargetByCreatureDataId(
          a,
          void 0,
          n,
          "DynamicAttachEntityToActor",
        ));
    }
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
  static SetSkillTargetDirection(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    t?.Valid && t.SetSkillTargetDirection(e);
  }
  static ChangeAiControllerDebugDraw(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 40);
    i?.Valid
      ? i.SetDebugDraw(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("AI", 43, "实体不含AiComp", ["entityId", t]);
  }
  static GetBeHitAnimType(t) {
    return t;
  }
  static ChangeBlueprintVariablesRef(e, t) {
    const r = (t, e) => {
      var i = t.SubGraphs;
      for (let t = 0; t < i.Num(); t++) {
        var n = i.Get(t);
        e.push(n), r(n, e);
      }
    };
    var i = new Map();
    if (e instanceof UE.AnimBlueprint) {
      if (!UE.EditorOperations.GetDefaultObject(e.ParentClass)) return e;
      var n = [];
      for (let t = 0; t < e.FunctionGraphs.Num(); t++) {
        var a = e.FunctionGraphs.Get(t);
        n.push(a), r(a, n);
      }
      for (let t = 0; t < e.EventGraphs.Num(); t++) {
        var s = e.EventGraphs.Get(t);
        n.push(s), r(s, n);
      }
      for (const c of n) {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("AI", 43, "FunctionGraphs", ["Name", c.GetName()]);
        var o = c?.Nodes;
        for (let t = 0; t < o.Num(); t++) {
          var y,
            l = o.Get(t);
          l instanceof UE.K2Node_Variable &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "AI",
                43,
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
        Log_1.Log.Error("AI", 43, "添加监听输入的PbDataId转number异常", [
          "pbDataId",
          t,
        ])
      );
    }
    if (0 !== e) {
      var t = new Array();
      if (
        (ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithPbDataId(
          e,
          t,
        ),
        0 !== t.length)
      )
        return (
          (t = t[0]?.Entity?.GetComponent(3)?.DebugMovementComp)?.SetDebug(!0),
          t?.UeDebugComp
        );
    }
  }
}
exports.default = TsGameplayBlueprintFunctionLibrary;
//# sourceMappingURL=TsGameplayBlueprintFunctionLibrary.js.map
