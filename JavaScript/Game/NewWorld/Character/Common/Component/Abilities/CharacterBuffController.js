"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const BuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BuffById");
const ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs");
const BuffTypes_1 = require("./Buff/BuffTypes");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes");
const ExtraEffectLibrary_1 = require("./ExtraEffect/ExtraEffectLibrary");
const ExtraEffectManager_1 = require("./ExtraEffect/ExtraEffectManager");
class BuffController extends ControllerBase_1.ControllerBase {
  static SetHandlePrefix(e, t) {
    var a = (1 << ActiveBuffConfigs_1.BUFF_HANDLE_PREFIX_BYTE) - 1;
    var a =
      ((e < 0 || a < e) &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            20,
            "Invalid Buff Handle prefix.",
            ["prefix", e],
            ["handleStart", t],
          ),
        (e &= a)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Character",
          20,
          "Set GameplayEffect Handle prefix.",
          ["prefix", e],
          ["handleStart", t],
        ),
      ModelManager_1.ModelManager.BuffModel);
    (a.HandlePrefix = Math.floor(e) << ActiveBuffConfigs_1.BUFF_HANDLE_ID_BYTE),
      (a.LastHandle = Math.max(t, a.LastHandle));
  }
  static GenerateHandle() {
    const e = ModelManager_1.ModelManager.BuffModel;
    return (
      (++e.LastHandle & ActiveBuffConfigs_1.HANDLE_MASK) +
      (e.HandlePrefix & ~ActiveBuffConfigs_1.HANDLE_MASK)
    );
  }
  static GetBuffDefinition(e) {
    let t = ModelManager_1.ModelManager.BuffModel.Get(e);
    return (
      t ||
      ((t = BuffById_1.configBuffById.GetConfig(e))
        ? BuffController.AddBuffRef(t)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 20, "无法查找到对应编号的Buff。", [
              "BuffId",
              e,
            ])
          ))
    );
  }
  static ParseExtraEffect(e) {
    let t, a, r;
    if (e && e.ExtraEffectID)
      return (
        ((t =
          new ExtraEffectBaseTypes_1.ExtraEffectParameters()).ExtraEffectId =
          e.ExtraEffectID),
        (t.ExtraEffectParameters = e.ExtraEffectParameters),
        (t.ExtraEffectGrowParameters1 = e.ExtraEffectParametersGrow1),
        (t.ExtraEffectGrowParameters2 = e.ExtraEffectParametersGrow2),
        (t.ExtraEffectRequirement = e.ExtraEffectRequirements),
        (t.ExtraEffectRequirementPara = e.ExtraEffectReqPara),
        (t.ExtraEffectRequirementSetting = e.ExtraEffectReqSetting),
        (t.ExtraEffectCd = e.ExtraEffectCD),
        (t.ExtraEffectRemoveStackNum = e.ExtraEffectRemoveStackNum),
        (t.ExtraEffectProbability = e.ExtraEffectProbability),
        (a =
          ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(
            e.Id,
            t,
            1,
          )),
        (r = require("./ExtraEffect/ExtraEffectDefine")?.getBuffExecutionClass(
          e.ExtraEffectID,
        )) && ((r = r.Create(e.Id, a, t)), (t.ExecutionEffect = r)),
        t
      );
  }
  static EKo(e) {
    const t = [e];
    for (const r of e.RelatedExtraEffectBuffId) {
      const a = BuffById_1.configBuffById.GetConfig(r);
      a && t.push(a);
    }
    return t;
  }
  static AddBuffRef(e) {
    const t = new BuffTypes_1.BuffDefinition();
    const a =
      ((t.Id = e.Id),
      (t.Desc = e.GeDesc),
      (t.StackLimitCount = e.StackLimitCount),
      (t.FormationPolicy = e.FormationPolicy),
      (t.StackingType = e.StackingType),
      (t.DefaultStackCount = e.DefaultStackCount),
      (t.StackAppendCount = e.StackAppendCount),
      (t.Probability = e.Probability),
      (t.DurationMagnitude = e.DurationMagnitude),
      (t.DurationPolicy = e.DurationPolicy),
      (t.DurationMagnitude2 = e.DurationMagnitude2),
      (t.DurationCalculationPolicy = e.DurationCalculationPolicy),
      (t.DurationAffectedByBulletTime = e.bDurationAffectedByBulletTime),
      (t.Period = e.Period),
      (t.PeriodicInhibitionPolicy = e.PeriodicInhibitionPolicy),
      (t.ExecutePeriodicOnAdd = e.bExecutePeriodicEffectOnApplication),
      (t.StackDurationRefreshPolicy = e.StackDurationRefreshPolicy),
      (t.StackPeriodResetPolicy = e.StackPeriodResetPolicy),
      (t.StackExpirationRemoveNumber = e.StackExpirationRemoveNumber),
      (t.DenyOverflowAdd = e.bDenyOverflowApplication),
      (t.ClearStackOnOverflow = e.bClearStackOnOverflow),
      e.GameAttributeID > 0 &&
        t.Modifiers.push({
          AttributeId: e.GameAttributeID,
          Value1: e.ModifierMagnitude,
          Value2: e.ModifierMagnitude2,
          CalculationPolicy: e.CalculationPolicy,
        }),
      (t.PrematureExpirationEffects = e.PrematureExpirationEffects),
      (t.RoutineExpirationEffects = e.RoutineExpirationEffects),
      (t.OverflowEffects = e.OverflowEffects),
      (t.GameplayCueIds = e.GameplayCueIds),
      e.RemoveBuffWithTags.length > 0 &&
        (t.RemoveBuffWithTags = e.RemoveBuffWithTags.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      e.GrantedTags.length > 0 &&
        (t.GrantedTags = e.GrantedTags.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      e.ApplicationSourceTagRequirements.length > 0 &&
        (t.AddInstigatorTagRequirements =
          e.ApplicationSourceTagRequirements.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
      e.ApplicationSourceTagIgnores.length > 0 &&
        (t.AddInstigatorTagIgnores = e.ApplicationSourceTagIgnores.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      e.ApplicationTagRequirements.length > 0 &&
        (t.AddTagRequirements = e.ApplicationTagRequirements.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      e.ApplicationTagIgnores.length > 0 &&
        (t.AddTagIgnores = e.ApplicationTagIgnores.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      e.OngoingTagRequirements.length > 0 &&
        (t.ActivateTagRequirements = e.OngoingTagRequirements.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      e.OngoingTagIgnores.length > 0 &&
        (t.ActivateTagIgnores = e.OngoingTagIgnores.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      e.RemovalTagRequirements.length > 0 &&
        (t.RemoveTagExistAll = e.RemovalTagRequirements.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      e.RemovalTagIgnores.length > 0 &&
        (t.RemoveTagIgnores = e.RemovalTagIgnores.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      e.GrantedApplicationImmunityTags.length > 0 &&
        (t.ImmuneTags = e.GrantedApplicationImmunityTags.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      e.GrantedApplicationImmunityTagIgnores.length > 0 &&
        (t.ImmuneTagIgnores = e.GrantedApplicationImmunityTagIgnores.map((e) =>
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        ).filter((e) => void 0 !== e)),
      this.EKo(e));
    for (const f of a)
      if (f && this.IKo(f))
        if (f.ExtraEffectID === 43) {
          t.RemoveTagExistAny = t.RemoveTagExistAny ?? [];
          for (const i of f.ExtraEffectParameters[0]
            .split("#")
            .map((e) =>
              GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e?.trim()),
            )
            .filter((e) => void 0 !== e))
            t.RemoveTagExistAny.push(i);
        } else {
          const r = this.ParseExtraEffect(f);
          r && t.EffectInfos.push(r);
        }
    return (
      (t.HasBuffEffect = this.HasBuffEffects(t.EffectInfos)),
      (t.HasBuffPeriodExecution = this.HasBuffPeriodExecutions(t.EffectInfos)),
      ModelManager_1.ModelManager.BuffModel.Add(e.Id, t),
      t
    );
  }
  static CreateDynamicBuffRef() {
    const e = new BuffTypes_1.BuffDefinition();
    return (
      (e.Id = ActiveBuffConfigs_1.DYNAMIC_BUFF_ID), (e.DurationPolicy = 1), e
    );
  }
  static IKo(e) {
    switch (e.ExtraEffectID) {
      case 14:
        if (e.ExtraEffectParameters.length >= 2) {
          var t = Number(e.ExtraEffectParameters[0]);
          if (CharacterAttributeTypes_1.stateAttributeIds.has(t)) break;
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "带有锁定属性额外效果14的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)",
              ["BuffId", e.Id],
              ["AttributeId", t],
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "带有锁定属性额外效果14的Buff配置的效果参数过少 < 2，此效果无效",
              ["BuffId", e.Id],
            );
        return !1;
      case 15:
      case 16:
        if (e.ExtraEffectParameters.length >= 1) {
          t = Number(e.ExtraEffectParameters[0]);
          if (CharacterAttributeTypes_1.stateAttributeIds.has(t)) break;
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "带有锁定属性上下限额外效果的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)",
              ["BuffId", e.Id],
              ["AttributeId", t],
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "带有锁定上下限属性额外效果15或16的Buff配置的效果参数过少 < 1，此效果无效",
              ["BuffId", e.Id],
            );
        return !1;
    }
    return !0;
  }
  static GetBuffExtraEffectParameters(e) {
    const t = ModelManager_1.ModelManager.BuffModel.Get(e);
    if (t) return t.EffectInfos;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Character", 29, "无法查询到buff信息", ["buffId", e]);
  }
  static HasBuffEffects(e) {
    for (const t of e)
      if (
        !ExtraEffectManager_1.ExtraEffectManager.IsInitExecution(
          t.ExtraEffectId,
        ) &&
        !ExtraEffectManager_1.ExtraEffectManager.IsPeriodExecution(
          t.ExtraEffectId,
        )
      )
        return !0;
    return !1;
  }
  static HasBuffPeriodExecutions(e) {
    for (const t of e)
      if (
        ExtraEffectManager_1.ExtraEffectManager.IsPeriodExecution(
          t.ExtraEffectId,
        )
      )
        return !0;
    return !1;
  }
}
(BuffController.yKo = void 0), (exports.default = BuffController);
// # sourceMappingURL=CharacterBuffController.js.map
