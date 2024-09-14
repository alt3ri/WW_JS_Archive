"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Info_1 = require("../../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  BuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BuffById"),
  BuffGetAll_1 = require("../../../../../../Core/Define/ConfigQuery/BuffGetAll"),
  ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase"),
  Macro_1 = require("../../../../../../Core/Preprocessor/Macro"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
  BuffTypes_1 = require("./Buff/BuffTypes"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes"),
  ExtraEffectDefine_1 = require("./ExtraEffect/ExtraEffectDefine"),
  ExtraEffectLibrary_1 = require("./ExtraEffect/ExtraEffectLibrary"),
  ExtraEffectManager_1 = require("./ExtraEffect/ExtraEffectManager"),
  UE = require("ue");
class BuffController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (BuffController.eJa && !UE.KuroStaticLibrary.IsLowMemoryDevice()) {
      var e = BuffGetAll_1.configBuffGetAll.GetConfigList(!1);
      if (e) for (const f of e) BuffController.AddBuffRef(f);
    }
    return super.OnInit();
  }
  static SetHandlePrefix(e, f) {
    var t = (1 << ActiveBuffConfigs_1.BUFF_HANDLE_PREFIX_BYTE) - 1,
      t =
        ((e < 0 || t < e) &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              20,
              "Invalid Buff Handle prefix.",
              ["prefix", e],
              ["handleStart", f],
            ),
          (e &= t)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            20,
            "Set GameplayEffect Handle prefix.",
            ["prefix", e],
            ["handleStart", f],
          ),
        ModelManager_1.ModelManager.BuffModel);
    (t.HandlePrefix = Math.floor(e) << ActiveBuffConfigs_1.BUFF_HANDLE_ID_BYTE),
      (t.LastHandle = Math.max(f, t.LastHandle));
  }
  static GenerateHandle() {
    var e = ModelManager_1.ModelManager.BuffModel;
    return (
      (++e.LastHandle & ActiveBuffConfigs_1.HANDLE_MASK) +
      (e.HandlePrefix & ~ActiveBuffConfigs_1.HANDLE_MASK)
    );
  }
  static GetBuffDefinition(e) {
    var f = ModelManager_1.ModelManager.BuffModel.Get(e);
    return (
      f ||
      ((f = BuffById_1.configBuffById.GetConfig(e))
        ? BuffController.AddBuffRef(f)
        : void CombatLog_1.CombatLog.Error(
            "Buff",
            void 0,
            "无法查找到对应编号的Buff。",
            ["BuffId", e],
          ))
    );
  }
  static ParseExtraEffect(e) {
    var f, t, a;
    if (e && e.ExtraEffectID)
      return (
        ((f =
          new ExtraEffectBaseTypes_1.ExtraEffectParameters()).ExtraEffectId =
          e.ExtraEffectID),
        (f.ExtraEffectParameters = e.ExtraEffectParameters),
        (f.ExtraEffectGrowParameters1 = e.ExtraEffectParametersGrow1),
        (f.ExtraEffectGrowParameters2 = e.ExtraEffectParametersGrow2),
        (f.ExtraEffectRequirement = e.ExtraEffectRequirements),
        (f.ExtraEffectRequirementPara = e.ExtraEffectReqPara),
        (f.ExtraEffectRequirementSetting = e.ExtraEffectReqSetting),
        (f.ExtraEffectCd = e.ExtraEffectCD),
        (f.ExtraEffectRemoveStackNum = e.ExtraEffectRemoveStackNum),
        (f.ExtraEffectProbability = e.ExtraEffectProbability),
        (t =
          ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(
            e.Id,
            f,
            1,
          )),
        (a = (0, ExtraEffectDefine_1.getBuffExecutionClass)(e.ExtraEffectID)) &&
          ((a = a.Create(e.Id, t, f)), (f.ExecutionEffect = a)),
        f
      );
  }
  static vQo(e) {
    var f = [e];
    for (const a of e.RelatedExtraEffectBuffId) {
      var t = BuffById_1.configBuffById.GetConfig(a);
      t && f.push(t);
    }
    return f;
  }
  static AddBuffRef(e) {
    this.MQo.Start();
    var f = new BuffTypes_1.BuffDefinition(),
      t =
        ((f.Id = e.Id),
        Info_1.Info.IsBuildShipping || (f.Desc = ""),
        (f.StackLimitCount = e.StackLimitCount),
        (f.FormationPolicy = e.FormationPolicy),
        (f.StackingType = e.StackingType),
        (f.DefaultStackCount = e.DefaultStackCount),
        (f.StackAppendCount = e.StackAppendCount),
        (f.Probability = e.Probability),
        (f.DurationMagnitude = e.DurationMagnitude),
        (f.DurationPolicy = e.DurationPolicy),
        (f.DurationMagnitude2 = e.DurationMagnitude2),
        (f.DurationCalculationPolicy = e.DurationCalculationPolicy),
        (f.DurationAffectedByBulletTime = e.bDurationAffectedByBulletTime),
        (f.Period = e.Period),
        (f.PeriodicInhibitionPolicy = e.PeriodicInhibitionPolicy),
        (f.ExecutePeriodicOnAdd = e.bExecutePeriodicEffectOnApplication),
        (f.StackDurationRefreshPolicy = e.StackDurationRefreshPolicy),
        (f.StackPeriodResetPolicy = e.StackPeriodResetPolicy),
        (f.StackExpirationRemoveNumber = e.StackExpirationRemoveNumber),
        (f.DenyOverflowAdd = e.bDenyOverflowApplication),
        (f.ClearStackOnOverflow = e.bClearStackOnOverflow),
        0 < e.GameAttributeID &&
          f.Modifiers.push({
            AttributeId: e.GameAttributeID,
            Value1: e.ModifierMagnitude,
            Value2: e.ModifierMagnitude2,
            CalculationPolicy: e.CalculationPolicy,
          }),
        (f.PrematureExpirationEffects = e.PrematureExpirationEffects),
        (f.RoutineExpirationEffects = e.RoutineExpirationEffects),
        (f.OverflowEffects = e.OverflowEffects),
        (f.GameplayCueIds = e.GameplayCueIds),
        0 < e.RemoveBuffWithTags.length &&
          (f.RemoveBuffWithTags = e.RemoveBuffWithTags.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.GrantedTags.length &&
          (f.GrantedTags = e.GrantedTags.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.ApplicationSourceTagRequirements.length &&
          (f.AddInstigatorTagRequirements =
            e.ApplicationSourceTagRequirements.map((e) =>
              GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
            ).filter((e) => void 0 !== e)),
        0 < e.ApplicationSourceTagIgnores.length &&
          (f.AddInstigatorTagIgnores = e.ApplicationSourceTagIgnores.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.ApplicationTagRequirements.length &&
          (f.AddTagRequirements = e.ApplicationTagRequirements.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.ApplicationTagIgnores.length &&
          (f.AddTagIgnores = e.ApplicationTagIgnores.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.OngoingTagRequirements.length &&
          (f.ActivateTagRequirements = e.OngoingTagRequirements.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.OngoingTagIgnores.length &&
          (f.ActivateTagIgnores = e.OngoingTagIgnores.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.RemovalTagRequirements.length &&
          (f.RemoveTagExistAll = e.RemovalTagRequirements.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.RemovalTagIgnores.length &&
          (f.RemoveTagIgnores = e.RemovalTagIgnores.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.GrantedApplicationImmunityTags.length &&
          (f.ImmuneTags = e.GrantedApplicationImmunityTags.map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        0 < e.GrantedApplicationImmunityTagIgnores.length &&
          (f.ImmuneTagIgnores = e.GrantedApplicationImmunityTagIgnores.map(
            (e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ).filter((e) => void 0 !== e)),
        this.vQo(e));
    for (const o of t)
      if (o && this.EQo(o))
        if (43 === o.ExtraEffectID) {
          f.RemoveTagExistAny = f.RemoveTagExistAny ?? [];
          for (const u of o.ExtraEffectParameters[0]
            .split("#")
            .map((e) =>
              GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e?.trim()),
            )
            .filter((e) => void 0 !== e))
            f.RemoveTagExistAny.push(u);
        } else {
          var a = this.ParseExtraEffect(o);
          a && f.EffectInfos.push(a);
        }
    if (e.BuffAction) {
      f.BuffAction = [];
      for (const s of e.BuffAction ?? []) {
        var r = s.split("#").map((e) => e.trim());
        const c = [
          ["BuffId", e.Id],
          ["Action", s],
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
                f.BuffAction.push({
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
              f.BuffAction.push({
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
      (f.HasBuffEffect = this.HasBuffEffects(f.EffectInfos)),
      (f.HasBuffPeriodExecution = this.HasBuffPeriodExecutions(f.EffectInfos)),
      ModelManager_1.ModelManager.BuffModel.Add(e.Id, f),
      this.MQo.Stop(),
      f
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
          var f = Number(e.ExtraEffectParameters[0]);
          if (CharacterAttributeTypes_1.stateAttributeIds.has(f)) break;
          CombatLog_1.CombatLog.Error(
            "Buff",
            void 0,
            "带有锁定属性额外效果14的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)",
            ["BuffId", e.Id],
            ["AttributeId", f],
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
          f = Number(e.ExtraEffectParameters[0]);
          if (CharacterAttributeTypes_1.stateAttributeIds.has(f)) break;
          CombatLog_1.CombatLog.Error(
            "Buff",
            void 0,
            "带有锁定属性上下限额外效果的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)",
            ["BuffId", e.Id],
            ["AttributeId", f],
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
    for (const f of e)
      if (
        !ExtraEffectManager_1.ExtraEffectManager.IsInitExecution(
          f.ExtraEffectId,
        ) &&
        !ExtraEffectManager_1.ExtraEffectManager.IsPeriodExecution(
          f.ExtraEffectId,
        )
      )
        return !0;
    return !1;
  }
  static HasBuffPeriodExecutions(e) {
    for (const f of e)
      if (
        ExtraEffectManager_1.ExtraEffectManager.IsPeriodExecution(
          f.ExtraEffectId,
        )
      )
        return !0;
    return !1;
  }
}
(BuffController.eJa = !0),
  (BuffController.MQo = Stats_1.Stat.Create("BuffController.AddBuffRef")),
  (exports.default = BuffController);
//# sourceMappingURL=CharacterBuffController.js.map
