"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBackgroundCardAll =
    exports.configAxisRevertByRevertType =
    exports.configAxisRevertAll =
    exports.configAxisMappingByAxisType =
    exports.configAxisMappingByAxisName =
    exports.configAxisMappingAll =
    exports.configAudioById =
    exports.configAreaTaskExploreById =
    exports.configAreaTaskExploreByAreaId =
    exports.configAreaMpcById =
    exports.configAreaByDeliveryMarkId =
    exports.configAreaByCountryAndLevel =
    exports.configAreaByAreaId =
    exports.configAreaAtmosphereInfoById =
    exports.configAnimalHandBookByMeshId =
    exports.configAnimalHandBookById =
    exports.configAnimalHandBookAll =
    exports.configAkiMapSourceByMapId =
    exports.configAkiMapByMapId =
    exports.configAiWanderRadiusConfigById =
    exports.configAiWanderById =
    exports.configAiTeamLevelNewById =
    exports.configAiTeamAttackById =
    exports.configAiTeamAreaNewById =
    exports.configAiStateMachineConfigById =
    exports.configAiSkillPreconditionById =
    exports.configAiSkillInfosById =
    exports.configAiSenseGroupById =
    exports.configAiSenseById =
    exports.configAiPatrolById =
    exports.configAiHateById =
    exports.configAiFleeById =
    exports.configAiBattleWanderGroupById =
    exports.configAiBattleWanderById =
    exports.configAiBaseSkillById =
    exports.configAiBaseById =
    exports.configAiAlertById =
    exports.configAdviceWordTypeById =
    exports.configAdviceWordTypeAll =
    exports.configAdviceWordByType =
    exports.configAdviceWordById =
    exports.configAdviceWordAll =
    exports.configAdviceSentenceById =
    exports.configAdviceSentenceAll =
    exports.configAdviceParamsById =
    exports.configAdviceConjunctionById =
    exports.configAdviceConjunctionAll =
    exports.configAdventureTaskChapterById =
    exports.configAdventureTaskChapterAll =
    exports.configAdventureTaskById =
      void 0),
  (exports.configChatExpressionGroupById =
    exports.configChatExpressionGroupAll =
    exports.configChatExpressionById =
    exports.configChatExpressionByGroupId =
    exports.configChatExpressionAll =
    exports.configChatById =
    exports.configCharacterAudioConfigByIdWithDefaultId =
    exports.configCharacterAudioConfigById =
    exports.configCatchSignalGameplayById =
    exports.configCatchSignalDifficultyById =
    exports.configCalabashTransformById =
    exports.configCalabashLevelByLevel =
    exports.configCalabashLevelAll =
    exports.configCalabashDevelopRewardByMonsterId =
    exports.configCalabashDevelopRewardAll =
    exports.configCalabashDevelopConditionById =
    exports.configBulletPreloadById =
    exports.configBulletPreloadByActorBlueprintAndBulletId =
    exports.configBuffItemCdGroupById =
    exports.configBuffItemByPublicCdGroup =
    exports.configBuffItemById =
    exports.configBuffById =
    exports.configBubbleDataByActionGuid =
    exports.configBroadcastImageById =
    exports.configBoxTypeById =
    exports.configBoxStateById =
    exports.configBossRushScoreById =
    exports.configBossRushScoreAll =
    exports.configBossRushMapMarkByActivityId =
    exports.configBossRushBuffById =
    exports.configBossRushBuffAll =
    exports.configBossRushActivityById =
    exports.configBossRushActivityByActivityIdAndInstanceId =
    exports.configBossRushActivityAll =
    exports.configBlueprintConfigByBlueprintType =
    exports.configBlueprintConfigAll =
    exports.configBlockSwitchById =
    exports.configBlackboardWhiteListAll =
    exports.configBeginnerGuideById =
    exports.configBattleScoreLevelConfById =
    exports.configBattleScoreLevelConfByGroupId =
    exports.configBattleScoreConfById =
    exports.configBattlePassUnlockPopByBattlePassTypeId =
    exports.configBattlePassTaskByTaskId =
    exports.configBattlePassRewardByBattlePassId =
    exports.configBattlePassById =
    exports.configBasePropertyById =
    exports.configBanInfoByTypeAndReason =
    exports.configBanInfoById =
    exports.configBackgroundCardById =
      void 0),
  (exports.configCustomSequenceLang =
    exports.configCustomSequenceById =
    exports.configCustomMarkByMarkId =
    exports.configCustomMarkAll =
    exports.configCustomerServiceById =
    exports.configCustomerServiceAll =
    exports.configCountryById =
    exports.configCountryAll =
    exports.configCookProcessMsgById =
    exports.configCookProcessedById =
    exports.configCookProcessedAll =
    exports.configCookLevelById =
    exports.configCookLevelAll =
    exports.configCookFormulaById =
    exports.configCookFormulaByFormulaItemId =
    exports.configCookFormulaAll =
    exports.configCookFixToolById =
    exports.configConfirmBoxById =
    exports.configConditionGroupById =
    exports.configConditionById =
    exports.configCompositeRewardDisplayById =
    exports.configCommunityById =
    exports.configCommunityAll =
    exports.configCommunicateById =
    exports.configCommonSkillPreloadById =
    exports.configCommonSkillPreloadAll =
    exports.configCommonRewardViewDisplayById =
    exports.configComboTeachingConditionById =
    exports.configComboTeachingById =
    exports.configCombinationAxisById =
    exports.configCombinationAxisByAxisType =
    exports.configCombinationAxisByAxisName =
    exports.configCombinationAxisAll =
    exports.configCombinationActionById =
    exports.configCombinationActionByActionType =
    exports.configCombinationActionByActionName =
    exports.configCombinationActionAll =
    exports.configClueEntranceById =
    exports.configClueContentById =
    exports.configClueContentByGroupId =
    exports.configClimbById =
    exports.configCipherGameplayById =
    exports.configChipTypeById =
    exports.configChipTypeAll =
    exports.configChipHandBookByType =
    exports.configChipHandBookById =
    exports.configChipHandBookAll =
    exports.configChildUiCameraMappingByViewName =
    exports.configChildUiCameraMappingById =
    exports.configChildUiCameraMappingAll =
      void 0),
  (exports.configEffectConfigById =
    exports.configDynamicMapMarkByMarkId =
    exports.configDynamicMapMarkByMapId =
    exports.configDungeonDetectionById =
    exports.configDungeonDetectionByDungeonId =
    exports.configDungeonDetectionAll =
    exports.configDropShowPlanById =
    exports.configDropPackageById =
    exports.configDragonPoolById =
    exports.configDragonPoolAll =
    exports.configDoubleRewardActivityById =
    exports.configDeviceRenderFeatureByDeviceId =
    exports.configDevicePlatformByPidAndVid =
    exports.configDevicePlatformById =
    exports.configDetectionTextById =
    exports.configDebugEntranceTypeConfigById =
    exports.configDebugEntranceTypeConfigAll =
    exports.configDebugEntranceConfigById =
    exports.configDebugEntranceConfigAll =
    exports.configDebugCommandConfigById =
    exports.configDaySelectPresetById =
    exports.configDaySelectPresetAll =
    exports.configDataLayerById =
    exports.configDamageTextAll =
    exports.configDamagePayloadById =
    exports.configDamageById =
    exports.configDailyTaskGroupById =
    exports.configDailyTaskById =
    exports.configDailyAdventureTaskByTaskId =
    exports.configDailyAdventurePointById =
    exports.configDailyAdventureActivityByActivityId =
      void 0);
var AdventureTaskById_1 = require("../../Core/Define/ConfigQuery/AdventureTaskById"),
  AdventureTaskChapterAll_1 =
    (Object.defineProperty(exports, "configAdventureTaskById", {
      enumerable: !0,
      get: function () {
        return AdventureTaskById_1.configAdventureTaskById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdventureTaskChapterAll")),
  AdventureTaskChapterById_1 =
    (Object.defineProperty(exports, "configAdventureTaskChapterAll", {
      enumerable: !0,
      get: function () {
        return AdventureTaskChapterAll_1.configAdventureTaskChapterAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdventureTaskChapterById")),
  AdviceConjunctionAll_1 =
    (Object.defineProperty(exports, "configAdventureTaskChapterById", {
      enumerable: !0,
      get: function () {
        return AdventureTaskChapterById_1.configAdventureTaskChapterById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdviceConjunctionAll")),
  AdviceConjunctionById_1 =
    (Object.defineProperty(exports, "configAdviceConjunctionAll", {
      enumerable: !0,
      get: function () {
        return AdviceConjunctionAll_1.configAdviceConjunctionAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdviceConjunctionById")),
  AdviceParamsById_1 =
    (Object.defineProperty(exports, "configAdviceConjunctionById", {
      enumerable: !0,
      get: function () {
        return AdviceConjunctionById_1.configAdviceConjunctionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdviceParamsById")),
  AdviceSentenceAll_1 =
    (Object.defineProperty(exports, "configAdviceParamsById", {
      enumerable: !0,
      get: function () {
        return AdviceParamsById_1.configAdviceParamsById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdviceSentenceAll")),
  AdviceSentenceById_1 =
    (Object.defineProperty(exports, "configAdviceSentenceAll", {
      enumerable: !0,
      get: function () {
        return AdviceSentenceAll_1.configAdviceSentenceAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdviceSentenceById")),
  AdviceWordAll_1 =
    (Object.defineProperty(exports, "configAdviceSentenceById", {
      enumerable: !0,
      get: function () {
        return AdviceSentenceById_1.configAdviceSentenceById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdviceWordAll")),
  AdviceWordById_1 =
    (Object.defineProperty(exports, "configAdviceWordAll", {
      enumerable: !0,
      get: function () {
        return AdviceWordAll_1.configAdviceWordAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdviceWordById")),
  AdviceWordByType_1 =
    (Object.defineProperty(exports, "configAdviceWordById", {
      enumerable: !0,
      get: function () {
        return AdviceWordById_1.configAdviceWordById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdviceWordByType")),
  AdviceWordTypeAll_1 =
    (Object.defineProperty(exports, "configAdviceWordByType", {
      enumerable: !0,
      get: function () {
        return AdviceWordByType_1.configAdviceWordByType;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdviceWordTypeAll")),
  AdviceWordTypeById_1 =
    (Object.defineProperty(exports, "configAdviceWordTypeAll", {
      enumerable: !0,
      get: function () {
        return AdviceWordTypeAll_1.configAdviceWordTypeAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/AdviceWordTypeById")),
  AiAlertById_1 =
    (Object.defineProperty(exports, "configAdviceWordTypeById", {
      enumerable: !0,
      get: function () {
        return AdviceWordTypeById_1.configAdviceWordTypeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiAlertById")),
  AiBaseById_1 =
    (Object.defineProperty(exports, "configAiAlertById", {
      enumerable: !0,
      get: function () {
        return AiAlertById_1.configAiAlertById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiBaseById")),
  AiBaseSkillById_1 =
    (Object.defineProperty(exports, "configAiBaseById", {
      enumerable: !0,
      get: function () {
        return AiBaseById_1.configAiBaseById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiBaseSkillById")),
  AiBattleWanderById_1 =
    (Object.defineProperty(exports, "configAiBaseSkillById", {
      enumerable: !0,
      get: function () {
        return AiBaseSkillById_1.configAiBaseSkillById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiBattleWanderById")),
  AiBattleWanderGroupById_1 =
    (Object.defineProperty(exports, "configAiBattleWanderById", {
      enumerable: !0,
      get: function () {
        return AiBattleWanderById_1.configAiBattleWanderById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiBattleWanderGroupById")),
  AiFleeById_1 =
    (Object.defineProperty(exports, "configAiBattleWanderGroupById", {
      enumerable: !0,
      get: function () {
        return AiBattleWanderGroupById_1.configAiBattleWanderGroupById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiFleeById")),
  AiHateById_1 =
    (Object.defineProperty(exports, "configAiFleeById", {
      enumerable: !0,
      get: function () {
        return AiFleeById_1.configAiFleeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiHateById")),
  AiPatrolById_1 =
    (Object.defineProperty(exports, "configAiHateById", {
      enumerable: !0,
      get: function () {
        return AiHateById_1.configAiHateById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiPatrolById")),
  AiSenseById_1 =
    (Object.defineProperty(exports, "configAiPatrolById", {
      enumerable: !0,
      get: function () {
        return AiPatrolById_1.configAiPatrolById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiSenseById")),
  AiSenseGroupById_1 =
    (Object.defineProperty(exports, "configAiSenseById", {
      enumerable: !0,
      get: function () {
        return AiSenseById_1.configAiSenseById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiSenseGroupById")),
  AiSkillInfosById_1 =
    (Object.defineProperty(exports, "configAiSenseGroupById", {
      enumerable: !0,
      get: function () {
        return AiSenseGroupById_1.configAiSenseGroupById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiSkillInfosById")),
  AiSkillPreconditionById_1 =
    (Object.defineProperty(exports, "configAiSkillInfosById", {
      enumerable: !0,
      get: function () {
        return AiSkillInfosById_1.configAiSkillInfosById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiSkillPreconditionById")),
  AiStateMachineConfigById_1 =
    (Object.defineProperty(exports, "configAiSkillPreconditionById", {
      enumerable: !0,
      get: function () {
        return AiSkillPreconditionById_1.configAiSkillPreconditionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiStateMachineConfigById")),
  AiTeamAreaNewById_1 =
    (Object.defineProperty(exports, "configAiStateMachineConfigById", {
      enumerable: !0,
      get: function () {
        return AiStateMachineConfigById_1.configAiStateMachineConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiTeamAreaNewById")),
  AiTeamAttackById_1 =
    (Object.defineProperty(exports, "configAiTeamAreaNewById", {
      enumerable: !0,
      get: function () {
        return AiTeamAreaNewById_1.configAiTeamAreaNewById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiTeamAttackById")),
  AiTeamLevelNewById_1 =
    (Object.defineProperty(exports, "configAiTeamAttackById", {
      enumerable: !0,
      get: function () {
        return AiTeamAttackById_1.configAiTeamAttackById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiTeamLevelNewById")),
  AiWanderById_1 =
    (Object.defineProperty(exports, "configAiTeamLevelNewById", {
      enumerable: !0,
      get: function () {
        return AiTeamLevelNewById_1.configAiTeamLevelNewById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiWanderById")),
  AiWanderRadiusConfigById_1 =
    (Object.defineProperty(exports, "configAiWanderById", {
      enumerable: !0,
      get: function () {
        return AiWanderById_1.configAiWanderById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AiWanderRadiusConfigById")),
  AkiMapByMapId_1 =
    (Object.defineProperty(exports, "configAiWanderRadiusConfigById", {
      enumerable: !0,
      get: function () {
        return AiWanderRadiusConfigById_1.configAiWanderRadiusConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AkiMapByMapId")),
  AkiMapSourceByMapId_1 =
    (Object.defineProperty(exports, "configAkiMapByMapId", {
      enumerable: !0,
      get: function () {
        return AkiMapByMapId_1.configAkiMapByMapId;
      },
    }),
    require("../../Core/Define/ConfigQuery/AkiMapSourceByMapId")),
  AnimalHandBookAll_1 =
    (Object.defineProperty(exports, "configAkiMapSourceByMapId", {
      enumerable: !0,
      get: function () {
        return AkiMapSourceByMapId_1.configAkiMapSourceByMapId;
      },
    }),
    require("../../Core/Define/ConfigQuery/AnimalHandBookAll")),
  AnimalHandBookById_1 =
    (Object.defineProperty(exports, "configAnimalHandBookAll", {
      enumerable: !0,
      get: function () {
        return AnimalHandBookAll_1.configAnimalHandBookAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/AnimalHandBookById")),
  AnimalHandBookByMeshId_1 =
    (Object.defineProperty(exports, "configAnimalHandBookById", {
      enumerable: !0,
      get: function () {
        return AnimalHandBookById_1.configAnimalHandBookById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AnimalHandBookByMeshId")),
  AreaAtmosphereInfoById_1 =
    (Object.defineProperty(exports, "configAnimalHandBookByMeshId", {
      enumerable: !0,
      get: function () {
        return AnimalHandBookByMeshId_1.configAnimalHandBookByMeshId;
      },
    }),
    require("../../Core/Define/ConfigQuery/AreaAtmosphereInfoById")),
  AreaByAreaId_1 =
    (Object.defineProperty(exports, "configAreaAtmosphereInfoById", {
      enumerable: !0,
      get: function () {
        return AreaAtmosphereInfoById_1.configAreaAtmosphereInfoById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AreaByAreaId")),
  AreaByCountryAndLevel_1 =
    (Object.defineProperty(exports, "configAreaByAreaId", {
      enumerable: !0,
      get: function () {
        return AreaByAreaId_1.configAreaByAreaId;
      },
    }),
    require("../../Core/Define/ConfigQuery/AreaByCountryAndLevel")),
  AreaByDeliveryMarkId_1 =
    (Object.defineProperty(exports, "configAreaByCountryAndLevel", {
      enumerable: !0,
      get: function () {
        return AreaByCountryAndLevel_1.configAreaByCountryAndLevel;
      },
    }),
    require("../../Core/Define/ConfigQuery/AreaByDeliveryMarkId")),
  AreaMpcById_1 =
    (Object.defineProperty(exports, "configAreaByDeliveryMarkId", {
      enumerable: !0,
      get: function () {
        return AreaByDeliveryMarkId_1.configAreaByDeliveryMarkId;
      },
    }),
    require("../../Core/Define/ConfigQuery/AreaMpcById")),
  AreaTaskExploreByAreaId_1 =
    (Object.defineProperty(exports, "configAreaMpcById", {
      enumerable: !0,
      get: function () {
        return AreaMpcById_1.configAreaMpcById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AreaTaskExploreByAreaId")),
  AreaTaskExploreById_1 =
    (Object.defineProperty(exports, "configAreaTaskExploreByAreaId", {
      enumerable: !0,
      get: function () {
        return AreaTaskExploreByAreaId_1.configAreaTaskExploreByAreaId;
      },
    }),
    require("../../Core/Define/ConfigQuery/AreaTaskExploreById")),
  AudioById_1 =
    (Object.defineProperty(exports, "configAreaTaskExploreById", {
      enumerable: !0,
      get: function () {
        return AreaTaskExploreById_1.configAreaTaskExploreById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AudioById")),
  AxisMappingAll_1 =
    (Object.defineProperty(exports, "configAudioById", {
      enumerable: !0,
      get: function () {
        return AudioById_1.configAudioById;
      },
    }),
    require("../../Core/Define/ConfigQuery/AxisMappingAll")),
  AxisMappingByAxisName_1 =
    (Object.defineProperty(exports, "configAxisMappingAll", {
      enumerable: !0,
      get: function () {
        return AxisMappingAll_1.configAxisMappingAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/AxisMappingByAxisName")),
  AxisMappingByAxisType_1 =
    (Object.defineProperty(exports, "configAxisMappingByAxisName", {
      enumerable: !0,
      get: function () {
        return AxisMappingByAxisName_1.configAxisMappingByAxisName;
      },
    }),
    require("../../Core/Define/ConfigQuery/AxisMappingByAxisType")),
  AxisRevertAll_1 =
    (Object.defineProperty(exports, "configAxisMappingByAxisType", {
      enumerable: !0,
      get: function () {
        return AxisMappingByAxisType_1.configAxisMappingByAxisType;
      },
    }),
    require("../../Core/Define/ConfigQuery/AxisRevertAll")),
  AxisRevertByRevertType_1 =
    (Object.defineProperty(exports, "configAxisRevertAll", {
      enumerable: !0,
      get: function () {
        return AxisRevertAll_1.configAxisRevertAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/AxisRevertByRevertType")),
  BackgroundCardAll_1 =
    (Object.defineProperty(exports, "configAxisRevertByRevertType", {
      enumerable: !0,
      get: function () {
        return AxisRevertByRevertType_1.configAxisRevertByRevertType;
      },
    }),
    require("../../Core/Define/ConfigQuery/BackgroundCardAll")),
  BackgroundCardById_1 =
    (Object.defineProperty(exports, "configBackgroundCardAll", {
      enumerable: !0,
      get: function () {
        return BackgroundCardAll_1.configBackgroundCardAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/BackgroundCardById")),
  BanInfoById_1 =
    (Object.defineProperty(exports, "configBackgroundCardById", {
      enumerable: !0,
      get: function () {
        return BackgroundCardById_1.configBackgroundCardById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BanInfoById")),
  BanInfoByTypeAndReason_1 =
    (Object.defineProperty(exports, "configBanInfoById", {
      enumerable: !0,
      get: function () {
        return BanInfoById_1.configBanInfoById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BanInfoByTypeAndReason")),
  BasePropertyById_1 =
    (Object.defineProperty(exports, "configBanInfoByTypeAndReason", {
      enumerable: !0,
      get: function () {
        return BanInfoByTypeAndReason_1.configBanInfoByTypeAndReason;
      },
    }),
    require("../../Core/Define/ConfigQuery/BasePropertyById")),
  BattlePassById_1 =
    (Object.defineProperty(exports, "configBasePropertyById", {
      enumerable: !0,
      get: function () {
        return BasePropertyById_1.configBasePropertyById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BattlePassById")),
  BattlePassRewardByBattlePassId_1 =
    (Object.defineProperty(exports, "configBattlePassById", {
      enumerable: !0,
      get: function () {
        return BattlePassById_1.configBattlePassById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BattlePassRewardByBattlePassId")),
  BattlePassTaskByTaskId_1 =
    (Object.defineProperty(exports, "configBattlePassRewardByBattlePassId", {
      enumerable: !0,
      get: function () {
        return BattlePassRewardByBattlePassId_1.configBattlePassRewardByBattlePassId;
      },
    }),
    require("../../Core/Define/ConfigQuery/BattlePassTaskByTaskId")),
  BattlePassUnlockPopByBattlePassTypeId_1 =
    (Object.defineProperty(exports, "configBattlePassTaskByTaskId", {
      enumerable: !0,
      get: function () {
        return BattlePassTaskByTaskId_1.configBattlePassTaskByTaskId;
      },
    }),
    require("../../Core/Define/ConfigQuery/BattlePassUnlockPopByBattlePassTypeId")),
  BattleScoreConfById_1 =
    (Object.defineProperty(
      exports,
      "configBattlePassUnlockPopByBattlePassTypeId",
      {
        enumerable: !0,
        get: function () {
          return BattlePassUnlockPopByBattlePassTypeId_1.configBattlePassUnlockPopByBattlePassTypeId;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/BattleScoreConfById")),
  BattleScoreLevelConfByGroupId_1 =
    (Object.defineProperty(exports, "configBattleScoreConfById", {
      enumerable: !0,
      get: function () {
        return BattleScoreConfById_1.configBattleScoreConfById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BattleScoreLevelConfByGroupId")),
  BattleScoreLevelConfById_1 =
    (Object.defineProperty(exports, "configBattleScoreLevelConfByGroupId", {
      enumerable: !0,
      get: function () {
        return BattleScoreLevelConfByGroupId_1.configBattleScoreLevelConfByGroupId;
      },
    }),
    require("../../Core/Define/ConfigQuery/BattleScoreLevelConfById")),
  BeginnerGuideById_1 =
    (Object.defineProperty(exports, "configBattleScoreLevelConfById", {
      enumerable: !0,
      get: function () {
        return BattleScoreLevelConfById_1.configBattleScoreLevelConfById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BeginnerGuideById")),
  BlackboardWhiteListAll_1 =
    (Object.defineProperty(exports, "configBeginnerGuideById", {
      enumerable: !0,
      get: function () {
        return BeginnerGuideById_1.configBeginnerGuideById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BlackboardWhiteListAll")),
  BlockSwitchById_1 =
    (Object.defineProperty(exports, "configBlackboardWhiteListAll", {
      enumerable: !0,
      get: function () {
        return BlackboardWhiteListAll_1.configBlackboardWhiteListAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/BlockSwitchById")),
  BlueprintConfigAll_1 =
    (Object.defineProperty(exports, "configBlockSwitchById", {
      enumerable: !0,
      get: function () {
        return BlockSwitchById_1.configBlockSwitchById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BlueprintConfigAll")),
  BlueprintConfigByBlueprintType_1 =
    (Object.defineProperty(exports, "configBlueprintConfigAll", {
      enumerable: !0,
      get: function () {
        return BlueprintConfigAll_1.configBlueprintConfigAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/BlueprintConfigByBlueprintType")),
  BossRushActivityAll_1 =
    (Object.defineProperty(exports, "configBlueprintConfigByBlueprintType", {
      enumerable: !0,
      get: function () {
        return BlueprintConfigByBlueprintType_1.configBlueprintConfigByBlueprintType;
      },
    }),
    require("../../Core/Define/ConfigQuery/BossRushActivityAll")),
  BossRushActivityByActivityIdAndInstanceId_1 =
    (Object.defineProperty(exports, "configBossRushActivityAll", {
      enumerable: !0,
      get: function () {
        return BossRushActivityAll_1.configBossRushActivityAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/BossRushActivityByActivityIdAndInstanceId")),
  BossRushActivityById_1 =
    (Object.defineProperty(
      exports,
      "configBossRushActivityByActivityIdAndInstanceId",
      {
        enumerable: !0,
        get: function () {
          return BossRushActivityByActivityIdAndInstanceId_1.configBossRushActivityByActivityIdAndInstanceId;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/BossRushActivityById")),
  BossRushBuffAll_1 =
    (Object.defineProperty(exports, "configBossRushActivityById", {
      enumerable: !0,
      get: function () {
        return BossRushActivityById_1.configBossRushActivityById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BossRushBuffAll")),
  BossRushBuffById_1 =
    (Object.defineProperty(exports, "configBossRushBuffAll", {
      enumerable: !0,
      get: function () {
        return BossRushBuffAll_1.configBossRushBuffAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/BossRushBuffById")),
  BossRushMapMarkByActivityId_1 =
    (Object.defineProperty(exports, "configBossRushBuffById", {
      enumerable: !0,
      get: function () {
        return BossRushBuffById_1.configBossRushBuffById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BossRushMapMarkByActivityId")),
  BossRushScoreAll_1 =
    (Object.defineProperty(exports, "configBossRushMapMarkByActivityId", {
      enumerable: !0,
      get: function () {
        return BossRushMapMarkByActivityId_1.configBossRushMapMarkByActivityId;
      },
    }),
    require("../../Core/Define/ConfigQuery/BossRushScoreAll")),
  BossRushScoreById_1 =
    (Object.defineProperty(exports, "configBossRushScoreAll", {
      enumerable: !0,
      get: function () {
        return BossRushScoreAll_1.configBossRushScoreAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/BossRushScoreById")),
  BoxStateById_1 =
    (Object.defineProperty(exports, "configBossRushScoreById", {
      enumerable: !0,
      get: function () {
        return BossRushScoreById_1.configBossRushScoreById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BoxStateById")),
  BoxTypeById_1 =
    (Object.defineProperty(exports, "configBoxStateById", {
      enumerable: !0,
      get: function () {
        return BoxStateById_1.configBoxStateById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BoxTypeById")),
  BroadcastImageById_1 =
    (Object.defineProperty(exports, "configBoxTypeById", {
      enumerable: !0,
      get: function () {
        return BoxTypeById_1.configBoxTypeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BroadcastImageById")),
  BubbleDataByActionGuid_1 =
    (Object.defineProperty(exports, "configBroadcastImageById", {
      enumerable: !0,
      get: function () {
        return BroadcastImageById_1.configBroadcastImageById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BubbleDataByActionGuid")),
  BuffById_1 =
    (Object.defineProperty(exports, "configBubbleDataByActionGuid", {
      enumerable: !0,
      get: function () {
        return BubbleDataByActionGuid_1.configBubbleDataByActionGuid;
      },
    }),
    require("../../Core/Define/ConfigQuery/BuffById")),
  BuffItemById_1 =
    (Object.defineProperty(exports, "configBuffById", {
      enumerable: !0,
      get: function () {
        return BuffById_1.configBuffById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BuffItemById")),
  BuffItemByPublicCdGroup_1 =
    (Object.defineProperty(exports, "configBuffItemById", {
      enumerable: !0,
      get: function () {
        return BuffItemById_1.configBuffItemById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BuffItemByPublicCdGroup")),
  BuffItemCdGroupById_1 =
    (Object.defineProperty(exports, "configBuffItemByPublicCdGroup", {
      enumerable: !0,
      get: function () {
        return BuffItemByPublicCdGroup_1.configBuffItemByPublicCdGroup;
      },
    }),
    require("../../Core/Define/ConfigQuery/BuffItemCdGroupById")),
  BulletPreloadByActorBlueprintAndBulletId_1 =
    (Object.defineProperty(exports, "configBuffItemCdGroupById", {
      enumerable: !0,
      get: function () {
        return BuffItemCdGroupById_1.configBuffItemCdGroupById;
      },
    }),
    require("../../Core/Define/ConfigQuery/BulletPreloadByActorBlueprintAndBulletId")),
  BulletPreloadById_1 =
    (Object.defineProperty(
      exports,
      "configBulletPreloadByActorBlueprintAndBulletId",
      {
        enumerable: !0,
        get: function () {
          return BulletPreloadByActorBlueprintAndBulletId_1.configBulletPreloadByActorBlueprintAndBulletId;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/BulletPreloadById")),
  CalabashDevelopConditionById_1 =
    (Object.defineProperty(exports, "configBulletPreloadById", {
      enumerable: !0,
      get: function () {
        return BulletPreloadById_1.configBulletPreloadById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CalabashDevelopConditionById")),
  CalabashDevelopRewardAll_1 =
    (Object.defineProperty(exports, "configCalabashDevelopConditionById", {
      enumerable: !0,
      get: function () {
        return CalabashDevelopConditionById_1.configCalabashDevelopConditionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CalabashDevelopRewardAll")),
  CalabashDevelopRewardByMonsterId_1 =
    (Object.defineProperty(exports, "configCalabashDevelopRewardAll", {
      enumerable: !0,
      get: function () {
        return CalabashDevelopRewardAll_1.configCalabashDevelopRewardAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CalabashDevelopRewardByMonsterId")),
  CalabashLevelAll_1 =
    (Object.defineProperty(exports, "configCalabashDevelopRewardByMonsterId", {
      enumerable: !0,
      get: function () {
        return CalabashDevelopRewardByMonsterId_1.configCalabashDevelopRewardByMonsterId;
      },
    }),
    require("../../Core/Define/ConfigQuery/CalabashLevelAll")),
  CalabashLevelByLevel_1 =
    (Object.defineProperty(exports, "configCalabashLevelAll", {
      enumerable: !0,
      get: function () {
        return CalabashLevelAll_1.configCalabashLevelAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CalabashLevelByLevel")),
  CalabashTransformById_1 =
    (Object.defineProperty(exports, "configCalabashLevelByLevel", {
      enumerable: !0,
      get: function () {
        return CalabashLevelByLevel_1.configCalabashLevelByLevel;
      },
    }),
    require("../../Core/Define/ConfigQuery/CalabashTransformById")),
  CatchSignalDifficultyById_1 =
    (Object.defineProperty(exports, "configCalabashTransformById", {
      enumerable: !0,
      get: function () {
        return CalabashTransformById_1.configCalabashTransformById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CatchSignalDifficultyById")),
  CatchSignalGameplayById_1 =
    (Object.defineProperty(exports, "configCatchSignalDifficultyById", {
      enumerable: !0,
      get: function () {
        return CatchSignalDifficultyById_1.configCatchSignalDifficultyById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CatchSignalGameplayById")),
  CharacterAudioConfigById_1 =
    (Object.defineProperty(exports, "configCatchSignalGameplayById", {
      enumerable: !0,
      get: function () {
        return CatchSignalGameplayById_1.configCatchSignalGameplayById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CharacterAudioConfigById")),
  CharacterAudioConfigByIdWithDefaultId_1 =
    (Object.defineProperty(exports, "configCharacterAudioConfigById", {
      enumerable: !0,
      get: function () {
        return CharacterAudioConfigById_1.configCharacterAudioConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CharacterAudioConfigByIdWithDefaultId")),
  ChatById_1 =
    (Object.defineProperty(
      exports,
      "configCharacterAudioConfigByIdWithDefaultId",
      {
        enumerable: !0,
        get: function () {
          return CharacterAudioConfigByIdWithDefaultId_1.configCharacterAudioConfigByIdWithDefaultId;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/ChatById")),
  ChatExpressionAll_1 =
    (Object.defineProperty(exports, "configChatById", {
      enumerable: !0,
      get: function () {
        return ChatById_1.configChatById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChatExpressionAll")),
  ChatExpressionByGroupId_1 =
    (Object.defineProperty(exports, "configChatExpressionAll", {
      enumerable: !0,
      get: function () {
        return ChatExpressionAll_1.configChatExpressionAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChatExpressionByGroupId")),
  ChatExpressionById_1 =
    (Object.defineProperty(exports, "configChatExpressionByGroupId", {
      enumerable: !0,
      get: function () {
        return ChatExpressionByGroupId_1.configChatExpressionByGroupId;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChatExpressionById")),
  ChatExpressionGroupAll_1 =
    (Object.defineProperty(exports, "configChatExpressionById", {
      enumerable: !0,
      get: function () {
        return ChatExpressionById_1.configChatExpressionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChatExpressionGroupAll")),
  ChatExpressionGroupById_1 =
    (Object.defineProperty(exports, "configChatExpressionGroupAll", {
      enumerable: !0,
      get: function () {
        return ChatExpressionGroupAll_1.configChatExpressionGroupAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChatExpressionGroupById")),
  ChildUiCameraMappingAll_1 =
    (Object.defineProperty(exports, "configChatExpressionGroupById", {
      enumerable: !0,
      get: function () {
        return ChatExpressionGroupById_1.configChatExpressionGroupById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChildUiCameraMappingAll")),
  ChildUiCameraMappingById_1 =
    (Object.defineProperty(exports, "configChildUiCameraMappingAll", {
      enumerable: !0,
      get: function () {
        return ChildUiCameraMappingAll_1.configChildUiCameraMappingAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChildUiCameraMappingById")),
  ChildUiCameraMappingByViewName_1 =
    (Object.defineProperty(exports, "configChildUiCameraMappingById", {
      enumerable: !0,
      get: function () {
        return ChildUiCameraMappingById_1.configChildUiCameraMappingById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChildUiCameraMappingByViewName")),
  ChipHandBookAll_1 =
    (Object.defineProperty(exports, "configChildUiCameraMappingByViewName", {
      enumerable: !0,
      get: function () {
        return ChildUiCameraMappingByViewName_1.configChildUiCameraMappingByViewName;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChipHandBookAll")),
  ChipHandBookById_1 =
    (Object.defineProperty(exports, "configChipHandBookAll", {
      enumerable: !0,
      get: function () {
        return ChipHandBookAll_1.configChipHandBookAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChipHandBookById")),
  ChipHandBookByType_1 =
    (Object.defineProperty(exports, "configChipHandBookById", {
      enumerable: !0,
      get: function () {
        return ChipHandBookById_1.configChipHandBookById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChipHandBookByType")),
  ChipTypeAll_1 =
    (Object.defineProperty(exports, "configChipHandBookByType", {
      enumerable: !0,
      get: function () {
        return ChipHandBookByType_1.configChipHandBookByType;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChipTypeAll")),
  ChipTypeById_1 =
    (Object.defineProperty(exports, "configChipTypeAll", {
      enumerable: !0,
      get: function () {
        return ChipTypeAll_1.configChipTypeAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/ChipTypeById")),
  CipherGameplayById_1 =
    (Object.defineProperty(exports, "configChipTypeById", {
      enumerable: !0,
      get: function () {
        return ChipTypeById_1.configChipTypeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CipherGameplayById")),
  ClimbById_1 =
    (Object.defineProperty(exports, "configCipherGameplayById", {
      enumerable: !0,
      get: function () {
        return CipherGameplayById_1.configCipherGameplayById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ClimbById")),
  ClueContentByGroupId_1 =
    (Object.defineProperty(exports, "configClimbById", {
      enumerable: !0,
      get: function () {
        return ClimbById_1.configClimbById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ClueContentByGroupId")),
  ClueContentById_1 =
    (Object.defineProperty(exports, "configClueContentByGroupId", {
      enumerable: !0,
      get: function () {
        return ClueContentByGroupId_1.configClueContentByGroupId;
      },
    }),
    require("../../Core/Define/ConfigQuery/ClueContentById")),
  ClueEntranceById_1 =
    (Object.defineProperty(exports, "configClueContentById", {
      enumerable: !0,
      get: function () {
        return ClueContentById_1.configClueContentById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ClueEntranceById")),
  CombinationActionAll_1 =
    (Object.defineProperty(exports, "configClueEntranceById", {
      enumerable: !0,
      get: function () {
        return ClueEntranceById_1.configClueEntranceById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CombinationActionAll")),
  CombinationActionByActionName_1 =
    (Object.defineProperty(exports, "configCombinationActionAll", {
      enumerable: !0,
      get: function () {
        return CombinationActionAll_1.configCombinationActionAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CombinationActionByActionName")),
  CombinationActionByActionType_1 =
    (Object.defineProperty(exports, "configCombinationActionByActionName", {
      enumerable: !0,
      get: function () {
        return CombinationActionByActionName_1.configCombinationActionByActionName;
      },
    }),
    require("../../Core/Define/ConfigQuery/CombinationActionByActionType")),
  CombinationActionById_1 =
    (Object.defineProperty(exports, "configCombinationActionByActionType", {
      enumerable: !0,
      get: function () {
        return CombinationActionByActionType_1.configCombinationActionByActionType;
      },
    }),
    require("../../Core/Define/ConfigQuery/CombinationActionById")),
  CombinationAxisAll_1 =
    (Object.defineProperty(exports, "configCombinationActionById", {
      enumerable: !0,
      get: function () {
        return CombinationActionById_1.configCombinationActionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CombinationAxisAll")),
  CombinationAxisByAxisName_1 =
    (Object.defineProperty(exports, "configCombinationAxisAll", {
      enumerable: !0,
      get: function () {
        return CombinationAxisAll_1.configCombinationAxisAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CombinationAxisByAxisName")),
  CombinationAxisByAxisType_1 =
    (Object.defineProperty(exports, "configCombinationAxisByAxisName", {
      enumerable: !0,
      get: function () {
        return CombinationAxisByAxisName_1.configCombinationAxisByAxisName;
      },
    }),
    require("../../Core/Define/ConfigQuery/CombinationAxisByAxisType")),
  CombinationAxisById_1 =
    (Object.defineProperty(exports, "configCombinationAxisByAxisType", {
      enumerable: !0,
      get: function () {
        return CombinationAxisByAxisType_1.configCombinationAxisByAxisType;
      },
    }),
    require("../../Core/Define/ConfigQuery/CombinationAxisById")),
  ComboTeachingById_1 =
    (Object.defineProperty(exports, "configCombinationAxisById", {
      enumerable: !0,
      get: function () {
        return CombinationAxisById_1.configCombinationAxisById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ComboTeachingById")),
  ComboTeachingConditionById_1 =
    (Object.defineProperty(exports, "configComboTeachingById", {
      enumerable: !0,
      get: function () {
        return ComboTeachingById_1.configComboTeachingById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ComboTeachingConditionById")),
  CommonRewardViewDisplayById_1 =
    (Object.defineProperty(exports, "configComboTeachingConditionById", {
      enumerable: !0,
      get: function () {
        return ComboTeachingConditionById_1.configComboTeachingConditionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CommonRewardViewDisplayById")),
  CommonSkillPreloadAll_1 =
    (Object.defineProperty(exports, "configCommonRewardViewDisplayById", {
      enumerable: !0,
      get: function () {
        return CommonRewardViewDisplayById_1.configCommonRewardViewDisplayById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CommonSkillPreloadAll")),
  CommonSkillPreloadById_1 =
    (Object.defineProperty(exports, "configCommonSkillPreloadAll", {
      enumerable: !0,
      get: function () {
        return CommonSkillPreloadAll_1.configCommonSkillPreloadAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CommonSkillPreloadById")),
  CommunicateById_1 =
    (Object.defineProperty(exports, "configCommonSkillPreloadById", {
      enumerable: !0,
      get: function () {
        return CommonSkillPreloadById_1.configCommonSkillPreloadById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CommunicateById")),
  CommunityAll_1 =
    (Object.defineProperty(exports, "configCommunicateById", {
      enumerable: !0,
      get: function () {
        return CommunicateById_1.configCommunicateById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CommunityAll")),
  CommunityById_1 =
    (Object.defineProperty(exports, "configCommunityAll", {
      enumerable: !0,
      get: function () {
        return CommunityAll_1.configCommunityAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CommunityById")),
  CompositeRewardDisplayById_1 =
    (Object.defineProperty(exports, "configCommunityById", {
      enumerable: !0,
      get: function () {
        return CommunityById_1.configCommunityById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CompositeRewardDisplayById")),
  ConditionById_1 =
    (Object.defineProperty(exports, "configCompositeRewardDisplayById", {
      enumerable: !0,
      get: function () {
        return CompositeRewardDisplayById_1.configCompositeRewardDisplayById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ConditionById")),
  ConditionGroupById_1 =
    (Object.defineProperty(exports, "configConditionById", {
      enumerable: !0,
      get: function () {
        return ConditionById_1.configConditionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ConditionGroupById")),
  ConfirmBoxById_1 =
    (Object.defineProperty(exports, "configConditionGroupById", {
      enumerable: !0,
      get: function () {
        return ConditionGroupById_1.configConditionGroupById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ConfirmBoxById")),
  CookFixToolById_1 =
    (Object.defineProperty(exports, "configConfirmBoxById", {
      enumerable: !0,
      get: function () {
        return ConfirmBoxById_1.configConfirmBoxById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CookFixToolById")),
  CookFormulaAll_1 =
    (Object.defineProperty(exports, "configCookFixToolById", {
      enumerable: !0,
      get: function () {
        return CookFixToolById_1.configCookFixToolById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CookFormulaAll")),
  CookFormulaByFormulaItemId_1 =
    (Object.defineProperty(exports, "configCookFormulaAll", {
      enumerable: !0,
      get: function () {
        return CookFormulaAll_1.configCookFormulaAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CookFormulaByFormulaItemId")),
  CookFormulaById_1 =
    (Object.defineProperty(exports, "configCookFormulaByFormulaItemId", {
      enumerable: !0,
      get: function () {
        return CookFormulaByFormulaItemId_1.configCookFormulaByFormulaItemId;
      },
    }),
    require("../../Core/Define/ConfigQuery/CookFormulaById")),
  CookLevelAll_1 =
    (Object.defineProperty(exports, "configCookFormulaById", {
      enumerable: !0,
      get: function () {
        return CookFormulaById_1.configCookFormulaById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CookLevelAll")),
  CookLevelById_1 =
    (Object.defineProperty(exports, "configCookLevelAll", {
      enumerable: !0,
      get: function () {
        return CookLevelAll_1.configCookLevelAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CookLevelById")),
  CookProcessedAll_1 =
    (Object.defineProperty(exports, "configCookLevelById", {
      enumerable: !0,
      get: function () {
        return CookLevelById_1.configCookLevelById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CookProcessedAll")),
  CookProcessedById_1 =
    (Object.defineProperty(exports, "configCookProcessedAll", {
      enumerable: !0,
      get: function () {
        return CookProcessedAll_1.configCookProcessedAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CookProcessedById")),
  CookProcessMsgById_1 =
    (Object.defineProperty(exports, "configCookProcessedById", {
      enumerable: !0,
      get: function () {
        return CookProcessedById_1.configCookProcessedById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CookProcessMsgById")),
  CountryAll_1 =
    (Object.defineProperty(exports, "configCookProcessMsgById", {
      enumerable: !0,
      get: function () {
        return CookProcessMsgById_1.configCookProcessMsgById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CountryAll")),
  CountryById_1 =
    (Object.defineProperty(exports, "configCountryAll", {
      enumerable: !0,
      get: function () {
        return CountryAll_1.configCountryAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CountryById")),
  CustomerServiceAll_1 =
    (Object.defineProperty(exports, "configCountryById", {
      enumerable: !0,
      get: function () {
        return CountryById_1.configCountryById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CustomerServiceAll")),
  CustomerServiceById_1 =
    (Object.defineProperty(exports, "configCustomerServiceAll", {
      enumerable: !0,
      get: function () {
        return CustomerServiceAll_1.configCustomerServiceAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CustomerServiceById")),
  CustomMarkAll_1 =
    (Object.defineProperty(exports, "configCustomerServiceById", {
      enumerable: !0,
      get: function () {
        return CustomerServiceById_1.configCustomerServiceById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CustomMarkAll")),
  CustomMarkByMarkId_1 =
    (Object.defineProperty(exports, "configCustomMarkAll", {
      enumerable: !0,
      get: function () {
        return CustomMarkAll_1.configCustomMarkAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/CustomMarkByMarkId")),
  CustomSequenceById_1 =
    (Object.defineProperty(exports, "configCustomMarkByMarkId", {
      enumerable: !0,
      get: function () {
        return CustomMarkByMarkId_1.configCustomMarkByMarkId;
      },
    }),
    require("../../Core/Define/ConfigQuery/CustomSequenceById")),
  CustomSequenceLang_1 =
    (Object.defineProperty(exports, "configCustomSequenceById", {
      enumerable: !0,
      get: function () {
        return CustomSequenceById_1.configCustomSequenceById;
      },
    }),
    require("../../Core/Define/ConfigQuery/CustomSequenceLang")),
  DailyAdventureActivityByActivityId_1 =
    (Object.defineProperty(exports, "configCustomSequenceLang", {
      enumerable: !0,
      get: function () {
        return CustomSequenceLang_1.configCustomSequenceLang;
      },
    }),
    require("../../Core/Define/ConfigQuery/DailyAdventureActivityByActivityId")),
  DailyAdventurePointById_1 =
    (Object.defineProperty(
      exports,
      "configDailyAdventureActivityByActivityId",
      {
        enumerable: !0,
        get: function () {
          return DailyAdventureActivityByActivityId_1.configDailyAdventureActivityByActivityId;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/DailyAdventurePointById")),
  DailyAdventureTaskByTaskId_1 =
    (Object.defineProperty(exports, "configDailyAdventurePointById", {
      enumerable: !0,
      get: function () {
        return DailyAdventurePointById_1.configDailyAdventurePointById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DailyAdventureTaskByTaskId")),
  DailyTaskById_1 =
    (Object.defineProperty(exports, "configDailyAdventureTaskByTaskId", {
      enumerable: !0,
      get: function () {
        return DailyAdventureTaskByTaskId_1.configDailyAdventureTaskByTaskId;
      },
    }),
    require("../../Core/Define/ConfigQuery/DailyTaskById")),
  DailyTaskGroupById_1 =
    (Object.defineProperty(exports, "configDailyTaskById", {
      enumerable: !0,
      get: function () {
        return DailyTaskById_1.configDailyTaskById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DailyTaskGroupById")),
  DamageById_1 =
    (Object.defineProperty(exports, "configDailyTaskGroupById", {
      enumerable: !0,
      get: function () {
        return DailyTaskGroupById_1.configDailyTaskGroupById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DamageById")),
  DamagePayloadById_1 =
    (Object.defineProperty(exports, "configDamageById", {
      enumerable: !0,
      get: function () {
        return DamageById_1.configDamageById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DamagePayloadById")),
  DamageTextAll_1 =
    (Object.defineProperty(exports, "configDamagePayloadById", {
      enumerable: !0,
      get: function () {
        return DamagePayloadById_1.configDamagePayloadById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DamageTextAll")),
  DataLayerById_1 =
    (Object.defineProperty(exports, "configDamageTextAll", {
      enumerable: !0,
      get: function () {
        return DamageTextAll_1.configDamageTextAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/DataLayerById")),
  DaySelectPresetAll_1 =
    (Object.defineProperty(exports, "configDataLayerById", {
      enumerable: !0,
      get: function () {
        return DataLayerById_1.configDataLayerById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DaySelectPresetAll")),
  DaySelectPresetById_1 =
    (Object.defineProperty(exports, "configDaySelectPresetAll", {
      enumerable: !0,
      get: function () {
        return DaySelectPresetAll_1.configDaySelectPresetAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/DaySelectPresetById")),
  DebugCommandConfigById_1 =
    (Object.defineProperty(exports, "configDaySelectPresetById", {
      enumerable: !0,
      get: function () {
        return DaySelectPresetById_1.configDaySelectPresetById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DebugCommandConfigById")),
  DebugEntranceConfigAll_1 =
    (Object.defineProperty(exports, "configDebugCommandConfigById", {
      enumerable: !0,
      get: function () {
        return DebugCommandConfigById_1.configDebugCommandConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DebugEntranceConfigAll")),
  DebugEntranceConfigById_1 =
    (Object.defineProperty(exports, "configDebugEntranceConfigAll", {
      enumerable: !0,
      get: function () {
        return DebugEntranceConfigAll_1.configDebugEntranceConfigAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/DebugEntranceConfigById")),
  DebugEntranceTypeConfigAll_1 =
    (Object.defineProperty(exports, "configDebugEntranceConfigById", {
      enumerable: !0,
      get: function () {
        return DebugEntranceConfigById_1.configDebugEntranceConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DebugEntranceTypeConfigAll")),
  DebugEntranceTypeConfigById_1 =
    (Object.defineProperty(exports, "configDebugEntranceTypeConfigAll", {
      enumerable: !0,
      get: function () {
        return DebugEntranceTypeConfigAll_1.configDebugEntranceTypeConfigAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/DebugEntranceTypeConfigById")),
  DetectionTextById_1 =
    (Object.defineProperty(exports, "configDebugEntranceTypeConfigById", {
      enumerable: !0,
      get: function () {
        return DebugEntranceTypeConfigById_1.configDebugEntranceTypeConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DetectionTextById")),
  DevicePlatformById_1 =
    (Object.defineProperty(exports, "configDetectionTextById", {
      enumerable: !0,
      get: function () {
        return DetectionTextById_1.configDetectionTextById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DevicePlatformById")),
  DevicePlatformByPidAndVid_1 =
    (Object.defineProperty(exports, "configDevicePlatformById", {
      enumerable: !0,
      get: function () {
        return DevicePlatformById_1.configDevicePlatformById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DevicePlatformByPidAndVid")),
  DeviceRenderFeatureByDeviceId_1 =
    (Object.defineProperty(exports, "configDevicePlatformByPidAndVid", {
      enumerable: !0,
      get: function () {
        return DevicePlatformByPidAndVid_1.configDevicePlatformByPidAndVid;
      },
    }),
    require("../../Core/Define/ConfigQuery/DeviceRenderFeatureByDeviceId")),
  DoubleRewardActivityById_1 =
    (Object.defineProperty(exports, "configDeviceRenderFeatureByDeviceId", {
      enumerable: !0,
      get: function () {
        return DeviceRenderFeatureByDeviceId_1.configDeviceRenderFeatureByDeviceId;
      },
    }),
    require("../../Core/Define/ConfigQuery/DoubleRewardActivityById")),
  DragonPoolAll_1 =
    (Object.defineProperty(exports, "configDoubleRewardActivityById", {
      enumerable: !0,
      get: function () {
        return DoubleRewardActivityById_1.configDoubleRewardActivityById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DragonPoolAll")),
  DragonPoolById_1 =
    (Object.defineProperty(exports, "configDragonPoolAll", {
      enumerable: !0,
      get: function () {
        return DragonPoolAll_1.configDragonPoolAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/DragonPoolById")),
  DropPackageById_1 =
    (Object.defineProperty(exports, "configDragonPoolById", {
      enumerable: !0,
      get: function () {
        return DragonPoolById_1.configDragonPoolById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DropPackageById")),
  DropShowPlanById_1 =
    (Object.defineProperty(exports, "configDropPackageById", {
      enumerable: !0,
      get: function () {
        return DropPackageById_1.configDropPackageById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DropShowPlanById")),
  DungeonDetectionAll_1 =
    (Object.defineProperty(exports, "configDropShowPlanById", {
      enumerable: !0,
      get: function () {
        return DropShowPlanById_1.configDropShowPlanById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DungeonDetectionAll")),
  DungeonDetectionByDungeonId_1 =
    (Object.defineProperty(exports, "configDungeonDetectionAll", {
      enumerable: !0,
      get: function () {
        return DungeonDetectionAll_1.configDungeonDetectionAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/DungeonDetectionByDungeonId")),
  DungeonDetectionById_1 =
    (Object.defineProperty(exports, "configDungeonDetectionByDungeonId", {
      enumerable: !0,
      get: function () {
        return DungeonDetectionByDungeonId_1.configDungeonDetectionByDungeonId;
      },
    }),
    require("../../Core/Define/ConfigQuery/DungeonDetectionById")),
  DynamicMapMarkByMapId_1 =
    (Object.defineProperty(exports, "configDungeonDetectionById", {
      enumerable: !0,
      get: function () {
        return DungeonDetectionById_1.configDungeonDetectionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/DynamicMapMarkByMapId")),
  DynamicMapMarkByMarkId_1 =
    (Object.defineProperty(exports, "configDynamicMapMarkByMapId", {
      enumerable: !0,
      get: function () {
        return DynamicMapMarkByMapId_1.configDynamicMapMarkByMapId;
      },
    }),
    require("../../Core/Define/ConfigQuery/DynamicMapMarkByMarkId")),
  EffectConfigById_1 =
    (Object.defineProperty(exports, "configDynamicMapMarkByMarkId", {
      enumerable: !0,
      get: function () {
        return DynamicMapMarkByMarkId_1.configDynamicMapMarkByMarkId;
      },
    }),
    require("../../Core/Define/ConfigQuery/EffectConfigById"));
Object.defineProperty(exports, "configEffectConfigById", {
  enumerable: !0,
  get: function () {
    return EffectConfigById_1.configEffectConfigById;
  },
});
//# sourceMappingURL=PreloadConfigStatementPart2.js.map
