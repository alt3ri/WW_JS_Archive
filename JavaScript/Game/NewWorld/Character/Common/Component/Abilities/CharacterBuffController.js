"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  BuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BuffById"),
  ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase"),
  Macro_1 = require("../../../../../../Core/Preprocessor/Macro"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
  BuffTypes_1 = require("./Buff/BuffTypes"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes"),
  ExtraEffectLibrary_1 = require("./ExtraEffect/ExtraEffectLibrary"),
  ExtraEffectManager_1 = require("./ExtraEffect/ExtraEffectManager");
class BuffController extends ControllerBase_1.ControllerBase {
  static SetHandlePrefix(e, a) {
    var t = (1 << ActiveBuffConfigs_1.BUFF_HANDLE_PREFIX_BYTE) - 1,
      t =
        ((e < 0 || t < e) &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              20,
              "Invalid Buff Handle prefix.",
              ["prefix", e],
              ["handleStart", a],
            ),
          (e &= t)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            20,
            "Set GameplayEffect Handle prefix.",
            ["prefix", e],
            ["handleStart", a],
          ),
        ModelManager_1.ModelManager.BuffModel);
    (t.HandlePrefix = Math.floor(e) << ActiveBuffConfigs_1.BUFF_HANDLE_ID_BYTE),
      (t.LastHandle = Math.max(a, t.LastHandle));
  }
  static GenerateHandle() {
    var e = ModelManager_1.ModelManager.BuffModel;
    return (
      (++e.LastHandle & ActiveBuffConfigs_1.HANDLE_MASK) +
      (e.HandlePrefix & ~ActiveBuffConfigs_1.HANDLE_MASK)
    );
  }
  static GetBuffDefinition(e) {
    var a = ModelManager_1.ModelManager.BuffModel.Get(e);
    return (
      a ||
      ((a = BuffById_1.configBuffById.GetConfig(e))
        ? BuffController.AddBuffRef(a)
        : void CombatLog_1.CombatLog.Error(
            "Buff",
            void 0,
            "无法查找到对应编号的Buff。",
            ["BuffId", e],
          ))
    );
  }
  static ParseExtraEffect(e) {
    var a, t, f;
    if (e && e.ExtraEffectID)
      return (
        ((a =
          new ExtraEffectBaseTypes_1.ExtraEffectParameters()).ExtraEffectId =
          e.ExtraEffectID),
        (a.ExtraEffectParameters = e.ExtraEffectParameters),
        (a.ExtraEffectGrowParameters1 = e.ExtraEffectParametersGrow1),
        (a.ExtraEffectGrowParameters2 = e.ExtraEffectParametersGrow2),
        (a.ExtraEffectRequirement = e.ExtraEffectRequirements),
        (a.ExtraEffectRequirementPara = e.ExtraEffectReqPara),
        (a.ExtraEffectRequirementSetting = e.ExtraEffectReqSetting),
        (a.ExtraEffectCd = e.ExtraEffectCD),
        (a.ExtraEffectRemoveStackNum = e.ExtraEffectRemoveStackNum),
        (a.ExtraEffectProbability = e.ExtraEffectProbability),
        (t =
          ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(
            e.Id,
            a,
            1,
          )),
        (f = require("./ExtraEffect/ExtraEffectDefine")?.getBuffExecutionClass(
          e.ExtraEffectID,
        )) && ((f = f.Create(e.Id, t, a)), (a.ExecutionEffect = f)),
        a
      );
  }
  static vQo(e) {
    var a = [e];
    for (const f of e.RelatedExtraEffectBuffId) {
      var t = BuffById_1.configBuffById.GetConfig(f);
      t && a.push(t);
    }
    return a;
  }
  static AddBuffRef(e) {
    var a = new BuffTypes_1.BuffDefinition(),
      t =
        ((a.Id = e.Id),
        (a.Desc = ""),
        (a.StackLimitCount = e.StackLimitCount),
        (a.FormationPolicy = e.FormationPolicy),
        (a.StackingType = e.StackingType),
        (a.DefaultStackCount = e.DefaultStackCount),
        (a.StackAppendCount = e.StackAppendCount),
        (a.Probability = e.Probability),
        (a.DurationMagnitude = e.DurationMagnitude),
        (a.DurationPolicy = e.DurationPolicy),
        (a.DurationMagnitude2 = e.DurationMagnitude2),
        (a.DurationCalculationPolicy = e.DurationCalculationPolicy),
        (a.DurationAffectedByBulletTime = e.bDurationAffectedByBulletTime),
        (a.Period = e.Period),
        (a.PeriodicInhibitionPolicy = e.PeriodicInhibitionPolicy),
        (a.ExecutePeriodicOnAdd = e.bExecutePeriodicEffectOnApplication),
        (a.StackDurationRefreshPolicy = e.StackDurationRefreshPolicy),
        (a.StackPeriodResetPolicy = e.StackPeriodResetPolicy),
        (a.StackExpirationRemoveNumber = e.StackExpirationRemoveNumber),
        (a.DenyOverflowAdd = e.bDenyOverflowApplication),
        (a.ClearStackOnOverflow = e.bClearStackOnOverflow),
        0 < e.GameAttributeID &&
          a.Modifiers.push({
            AttributeId: e.GameAttributeID,
            Value1: e.ModifierMagnitude,
            Value2: e.ModifierMagnitude2,
            CalculationPolicy: e.CalculationPolicy,
          }),
        (a.PrematureExpirationEffects = e.PrematureExpirationEffects),
        (a.RoutineExpirationEffects = e.RoutineExpirationEffects),
        (a.OverflowEffects = e.OverflowEffects),
        (a.GameplayCueIds = e.GameplayCueIds),
        0 < e.RemoveBuffWithTags.length &&
          (a.RemoveBuffWithTags = e.RemoveBuffWithTags.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.GrantedTags.length &&
          (a.GrantedTags = e.GrantedTags.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.ApplicationSourceTagRequirements.length &&
          (a.AddInstigatorTagRequirements =
            e.ApplicationSourceTagRequirements.map((e) =>
              GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
            ).filter((e) => void 0 !== e)),
        0 < e.ApplicationSourceTagIgnores.length &&
          (a.AddInstigatorTagIgnores = e.ApplicationSourceTagIgnores.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.ApplicationTagRequirements.length &&
          (a.AddTagRequirements = e.ApplicationTagRequirements.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.ApplicationTagIgnores.length &&
          (a.AddTagIgnores = e.ApplicationTagIgnores.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.OngoingTagRequirements.length &&
          (a.ActivateTagRequirements = e.OngoingTagRequirements.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.OngoingTagIgnores.length &&
          (a.ActivateTagIgnores = e.OngoingTagIgnores.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.RemovalTagRequirements.length &&
          (a.RemoveTagExistAll = e.RemovalTagRequirements.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.RemovalTagIgnores.length &&
          (a.RemoveTagIgnores = e.RemovalTagIgnores.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.GrantedApplicationImmunityTags.length &&
          (a.ImmuneTags = e.GrantedApplicationImmunityTags.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.GrantedApplicationImmunityTagIgnores.length &&
          (a.ImmuneTagIgnores = e.GrantedApplicationImmunityTagIgnores.map(
            (e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        this.vQo(e));
    for (const o of t)
      if (o && this.EQo(o))
        if (43 === o.ExtraEffectID) {
          a.RemoveTagExistAny = a.RemoveTagExistAny ?? [];
          for (const s of o.ExtraEffectParameters[0]
            .split("#")
            .map((e) =>
              GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e?.trim()),
            )
            .filter((e) => void 0 !== e))
            a.RemoveTagExistAny.push(s);
        } else {
          var f = this.ParseExtraEffect(o);
          f && a.EffectInfos.push(f);
        }
    if (e.BuffAction) {
      a.BuffAction = [];
      for (const u of e.BuffAction ?? []) {
        var r = u.split("#").map((e) => e.trim());
        const c = [
          ["BuffId", e.Id],
          ["Action", u],
        ];
        if (r.length < 2)
          CombatLog_1.CombatLog.Error(
            "Buff",
            void 0,
            "BuffAction参数过少",
            ...c,
          );
        else {
          var i = Number(r[0]);
          switch (i) {
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
              try {
                a.BuffAction.push({
                  Type: i,
                  Buffs: r.slice(1).map((e) => BigInt(e)),
                });
              } catch (e) {
                CombatLog_1.CombatLog.Error(
                  "Buff",
                  void 0,
                  "BuffAction参数解析失败",
                  ...c,
                );
              }
              continue;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
              a.BuffAction.push({
                Type: i,
                Tags: r
                  .slice(1)
                  .map((e) => {
                    e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
                    return (
                      void 0 === e &&
                        CombatLog_1.CombatLog.Error(
                          "Buff",
                          void 0,
                          "BuffAction找不到对应的Tag",
                          ...c,
                        ),
                      e
                    );
                  })
                  .filter((e) => void 0 !== e),
              });
              continue;
            default:
              CombatLog_1.CombatLog.Error(
                "Buff",
                void 0,
                "BuffAction参数不合法",
                ...c,
              );
              continue;
          }
        }
      }
    }
    return (
      (a.HasBuffEffect = this.HasBuffEffects(a.EffectInfos)),
      (a.HasBuffPeriodExecution = this.HasBuffPeriodExecutions(a.EffectInfos)),
      ModelManager_1.ModelManager.BuffModel.Add(e.Id, a),
      a
    );
  }
  static CreateDynamicBuffRef() {
    var e = new BuffTypes_1.BuffDefinition();
    return (
      (e.Id = ActiveBuffConfigs_1.DYNAMIC_BUFF_ID), (e.DurationPolicy = 1), e
    );
  }
  static EQo(e) {
    switch (e.ExtraEffectID) {
      case 14:
        if (2 <= e.ExtraEffectParameters.length) {
          var a = Number(e.ExtraEffectParameters[0]);
          if (CharacterAttributeTypes_1.stateAttributeIds.has(a)) break;
          CombatLog_1.CombatLog.Error(
            "Buff",
            void 0,
            "带有锁定属性额外效果14的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)",
            ["BuffId", e.Id],
            ["AttributeId", a],
          );
        } else
          CombatLog_1.CombatLog.Error(
            "Buff",
            void 0,
            "带有锁定属性额外效果14的Buff配置的效果参数过少 < 2，此效果无效",
            ["BuffId", e.Id],
          );
        return !1;
      case 15:
      case 16:
        if (1 <= e.ExtraEffectParameters.length) {
          a = Number(e.ExtraEffectParameters[0]);
          if (CharacterAttributeTypes_1.stateAttributeIds.has(a)) break;
          CombatLog_1.CombatLog.Error(
            "Buff",
            void 0,
            "带有锁定属性上下限额外效果的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)",
            ["BuffId", e.Id],
            ["AttributeId", a],
          );
        } else
          CombatLog_1.CombatLog.Error(
            "Buff",
            void 0,
            "带有锁定上下限属性额外效果15或16的Buff配置的效果参数过少 < 1，此效果无效",
            ["BuffId", e.Id],
          );
        return !1;
    }
    return !0;
  }
  static HasBuffEffects(e) {
    for (const a of e)
      if (
        !ExtraEffectManager_1.ExtraEffectManager.IsInitExecution(
          a.ExtraEffectId,
        ) &&
        !ExtraEffectManager_1.ExtraEffectManager.IsPeriodExecution(
          a.ExtraEffectId,
        )
      )
        return !0;
    return !1;
  }
  static HasBuffPeriodExecutions(e) {
    for (const a of e)
      if (
        ExtraEffectManager_1.ExtraEffectManager.IsPeriodExecution(
          a.ExtraEffectId,
        )
      )
        return !0;
    return !1;
  }
}
(BuffController.MQo = void 0), (exports.default = BuffController);
//# sourceMappingURL=CharacterBuffController.js.map
