"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfigStatement = void 0);
const CommonParamById_1 = require("../ConfigCommon/CommonParamById");
const CommonParamLang_1 = require("../ConfigCommon/CommonParamLang");
const AbnormalDamageConfigByLevel_1 = require("./AbnormalDamageConfigByLevel");
const AbpMontageDataById_1 = require("./AbpMontageDataById");
const AccessPathById_1 = require("./AccessPathById");
const AchievementByGroupId_1 = require("./AchievementByGroupId");
const AchievementById_1 = require("./AchievementById");
const AchievementCategoryAll_1 = require("./AchievementCategoryAll");
const AchievementCategoryById_1 = require("./AchievementCategoryById");
const AchievementGroupByCategory_1 = require("./AchievementGroupByCategory");
const AchievementGroupById_1 = require("./AchievementGroupById");
const AchievementStarLevelByLevel_1 = require("./AchievementStarLevelByLevel");
const ActionMappingAll_1 = require("./ActionMappingAll");
const ActionMappingByActionName_1 = require("./ActionMappingByActionName");
const ActionMappingByActionType_1 = require("./ActionMappingByActionType");
const ActionTypeByType_1 = require("./ActionTypeByType");
const ActivityById_1 = require("./ActivityById");
const ActivitySignById_1 = require("./ActivitySignById");
const AdventureTaskAll_1 = require("./AdventureTaskAll");
const AdventureTaskById_1 = require("./AdventureTaskById");
const AdventureTaskChapterAll_1 = require("./AdventureTaskChapterAll");
const AdventureTaskChapterById_1 = require("./AdventureTaskChapterById");
const AdviceConjunctionAll_1 = require("./AdviceConjunctionAll");
const AdviceConjunctionById_1 = require("./AdviceConjunctionById");
const AdviceParamsById_1 = require("./AdviceParamsById");
const AdviceSentenceAll_1 = require("./AdviceSentenceAll");
const AdviceSentenceById_1 = require("./AdviceSentenceById");
const AdviceWordAll_1 = require("./AdviceWordAll");
const AdviceWordById_1 = require("./AdviceWordById");
const AdviceWordByType_1 = require("./AdviceWordByType");
const AdviceWordTypeAll_1 = require("./AdviceWordTypeAll");
const AdviceWordTypeById_1 = require("./AdviceWordTypeById");
const AiAlertById_1 = require("./AiAlertById");
const AiBaseById_1 = require("./AiBaseById");
const AiBaseSkillById_1 = require("./AiBaseSkillById");
const AiBattleWanderById_1 = require("./AiBattleWanderById");
const AiBattleWanderGroupById_1 = require("./AiBattleWanderGroupById");
const AiFleeById_1 = require("./AiFleeById");
const AiHateById_1 = require("./AiHateById");
const AiPatrolById_1 = require("./AiPatrolById");
const AiSenseById_1 = require("./AiSenseById");
const AiSenseGroupById_1 = require("./AiSenseGroupById");
const AiSkillInfosById_1 = require("./AiSkillInfosById");
const AiSkillPreconditionById_1 = require("./AiSkillPreconditionById");
const AiStateMachineConfigById_1 = require("./AiStateMachineConfigById");
const AiTeamAreaNewById_1 = require("./AiTeamAreaNewById");
const AiTeamAttackById_1 = require("./AiTeamAttackById");
const AiTeamLevelNewById_1 = require("./AiTeamLevelNewById");
const AiWanderById_1 = require("./AiWanderById");
const AiWanderRadiusConfigById_1 = require("./AiWanderRadiusConfigById");
const AkiMapByMapId_1 = require("./AkiMapByMapId");
const AkiMapSourceByMapId_1 = require("./AkiMapSourceByMapId");
const AnimalHandBookAll_1 = require("./AnimalHandBookAll");
const AnimalHandBookById_1 = require("./AnimalHandBookById");
const AnimalHandBookByMeshId_1 = require("./AnimalHandBookByMeshId");
const AreaByAreaId_1 = require("./AreaByAreaId");
const AreaByCountryAndLevel_1 = require("./AreaByCountryAndLevel");
const AreaByDeliveryMarkId_1 = require("./AreaByDeliveryMarkId");
const AreaAtmosphereInfoById_1 = require("./AreaAtmosphereInfoById");
const AreaMpcById_1 = require("./AreaMpcById");
const AreaTaskExploreByAreaId_1 = require("./AreaTaskExploreByAreaId");
const AreaTaskExploreById_1 = require("./AreaTaskExploreById");
const AudioById_1 = require("./AudioById");
const AxisMappingAll_1 = require("./AxisMappingAll");
const AxisMappingByAxisName_1 = require("./AxisMappingByAxisName");
const AxisMappingByAxisType_1 = require("./AxisMappingByAxisType");
const AxisRevertAll_1 = require("./AxisRevertAll");
const AxisRevertByRevertType_1 = require("./AxisRevertByRevertType");
const BackgroundCardAll_1 = require("./BackgroundCardAll");
const BackgroundCardById_1 = require("./BackgroundCardById");
const BanInfoById_1 = require("./BanInfoById");
const BanInfoByTypeAndReason_1 = require("./BanInfoByTypeAndReason");
const BasePropertyById_1 = require("./BasePropertyById");
const BattlePassById_1 = require("./BattlePassById");
const BattlePassRewardByBattlePassId_1 = require("./BattlePassRewardByBattlePassId");
const BattlePassTaskByTaskId_1 = require("./BattlePassTaskByTaskId");
const BattlePassUnlockPopByBattlePassTypeId_1 = require("./BattlePassUnlockPopByBattlePassTypeId");
const BattleScoreConfById_1 = require("./BattleScoreConfById");
const BattleScoreLevelConfByGroupId_1 = require("./BattleScoreLevelConfByGroupId");
const BattleScoreLevelConfById_1 = require("./BattleScoreLevelConfById");
const BeginnerGuideById_1 = require("./BeginnerGuideById");
const BlackboardWhiteListAll_1 = require("./BlackboardWhiteListAll");
const BlockSwitchById_1 = require("./BlockSwitchById");
const BlueprintConfigAll_1 = require("./BlueprintConfigAll");
const BlueprintConfigByBlueprintType_1 = require("./BlueprintConfigByBlueprintType");
const BossRushActivityAll_1 = require("./BossRushActivityAll");
const BossRushActivityByActivityIdAndInstanceId_1 = require("./BossRushActivityByActivityIdAndInstanceId");
const BossRushActivityById_1 = require("./BossRushActivityById");
const BossRushBuffAll_1 = require("./BossRushBuffAll");
const BossRushBuffById_1 = require("./BossRushBuffById");
const BossRushMapMarkByActivityId_1 = require("./BossRushMapMarkByActivityId");
const BossRushScoreAll_1 = require("./BossRushScoreAll");
const BossRushScoreById_1 = require("./BossRushScoreById");
const BoxStateById_1 = require("./BoxStateById");
const BoxTypeById_1 = require("./BoxTypeById");
const BroadcastImageById_1 = require("./BroadcastImageById");
const BubbleDataByActionGuid_1 = require("./BubbleDataByActionGuid");
const BuffById_1 = require("./BuffById");
const BuffItemById_1 = require("./BuffItemById");
const BuffItemByPublicCdGroup_1 = require("./BuffItemByPublicCdGroup");
const BuffItemCdGroupById_1 = require("./BuffItemCdGroupById");
const BulletPreloadByActorBlueprintAndBulletId_1 = require("./BulletPreloadByActorBlueprintAndBulletId");
const BulletPreloadById_1 = require("./BulletPreloadById");
const CalabashDevelopConditionById_1 = require("./CalabashDevelopConditionById");
const CalabashDevelopRewardAll_1 = require("./CalabashDevelopRewardAll");
const CalabashDevelopRewardByMonsterId_1 = require("./CalabashDevelopRewardByMonsterId");
const CalabashLevelAll_1 = require("./CalabashLevelAll");
const CalabashLevelByLevel_1 = require("./CalabashLevelByLevel");
const CalabashTransformById_1 = require("./CalabashTransformById");
const CatchSignalDifficultyById_1 = require("./CatchSignalDifficultyById");
const CatchSignalGameplayById_1 = require("./CatchSignalGameplayById");
const CharacterAudioConfigById_1 = require("./CharacterAudioConfigById");
const CharacterAudioConfigByIdWithDefaultId_1 = require("./CharacterAudioConfigByIdWithDefaultId");
const ChatById_1 = require("./ChatById");
const ChatExpressionAll_1 = require("./ChatExpressionAll");
const ChatExpressionByGroupId_1 = require("./ChatExpressionByGroupId");
const ChatExpressionById_1 = require("./ChatExpressionById");
const ChatExpressionGroupAll_1 = require("./ChatExpressionGroupAll");
const ChatExpressionGroupById_1 = require("./ChatExpressionGroupById");
const ChildUiCameraMappingAll_1 = require("./ChildUiCameraMappingAll");
const ChildUiCameraMappingById_1 = require("./ChildUiCameraMappingById");
const ChildUiCameraMappingByViewName_1 = require("./ChildUiCameraMappingByViewName");
const ChipHandBookAll_1 = require("./ChipHandBookAll");
const ChipHandBookById_1 = require("./ChipHandBookById");
const ChipHandBookByType_1 = require("./ChipHandBookByType");
const ChipTypeAll_1 = require("./ChipTypeAll");
const ChipTypeById_1 = require("./ChipTypeById");
const CipherGameplayById_1 = require("./CipherGameplayById");
const ClimbById_1 = require("./ClimbById");
const ClueContentByGroupId_1 = require("./ClueContentByGroupId");
const ClueContentById_1 = require("./ClueContentById");
const ClueEntranceById_1 = require("./ClueEntranceById");
const CombinationActionAll_1 = require("./CombinationActionAll");
const CombinationActionByActionName_1 = require("./CombinationActionByActionName");
const CombinationActionByActionType_1 = require("./CombinationActionByActionType");
const CombinationActionById_1 = require("./CombinationActionById");
const CombinationAxisAll_1 = require("./CombinationAxisAll");
const CombinationAxisByAxisName_1 = require("./CombinationAxisByAxisName");
const CombinationAxisByAxisType_1 = require("./CombinationAxisByAxisType");
const CombinationAxisById_1 = require("./CombinationAxisById");
const ComboTeachingById_1 = require("./ComboTeachingById");
const ComboTeachingConditionById_1 = require("./ComboTeachingConditionById");
const CommonRewardViewDisplayById_1 = require("./CommonRewardViewDisplayById");
const CommonSkillPreloadAll_1 = require("./CommonSkillPreloadAll");
const CommonSkillPreloadById_1 = require("./CommonSkillPreloadById");
const CommunicateById_1 = require("./CommunicateById");
const CommunityAll_1 = require("./CommunityAll");
const CommunityById_1 = require("./CommunityById");
const CompositeRewardDisplayById_1 = require("./CompositeRewardDisplayById");
const ConditionById_1 = require("./ConditionById");
const ConditionGroupById_1 = require("./ConditionGroupById");
const ConfirmBoxById_1 = require("./ConfirmBoxById");
const CookFixToolById_1 = require("./CookFixToolById");
const CookFormulaAll_1 = require("./CookFormulaAll");
const CookFormulaByFormulaItemId_1 = require("./CookFormulaByFormulaItemId");
const CookFormulaById_1 = require("./CookFormulaById");
const CookLevelAll_1 = require("./CookLevelAll");
const CookLevelById_1 = require("./CookLevelById");
const CookProcessMsgById_1 = require("./CookProcessMsgById");
const CookProcessedAll_1 = require("./CookProcessedAll");
const CookProcessedById_1 = require("./CookProcessedById");
const CountryAll_1 = require("./CountryAll");
const CountryById_1 = require("./CountryById");
const CustomMarkAll_1 = require("./CustomMarkAll");
const CustomMarkByMarkId_1 = require("./CustomMarkByMarkId");
const CustomSequenceById_1 = require("./CustomSequenceById");
const CustomSequenceLang_1 = require("./CustomSequenceLang");
const CustomerServiceAll_1 = require("./CustomerServiceAll");
const CustomerServiceById_1 = require("./CustomerServiceById");
const DailyAdventureActivityByActivityId_1 = require("./DailyAdventureActivityByActivityId");
const DailyAdventurePointById_1 = require("./DailyAdventurePointById");
const DailyAdventureTaskByTaskId_1 = require("./DailyAdventureTaskByTaskId");
const DailyTaskById_1 = require("./DailyTaskById");
const DailyTaskGroupById_1 = require("./DailyTaskGroupById");
const DamageById_1 = require("./DamageById");
const DamagePayloadById_1 = require("./DamagePayloadById");
const DamageTextAll_1 = require("./DamageTextAll");
const DataLayerById_1 = require("./DataLayerById");
const DaySelectPresetAll_1 = require("./DaySelectPresetAll");
const DaySelectPresetById_1 = require("./DaySelectPresetById");
const DebugCommandConfigById_1 = require("./DebugCommandConfigById");
const DebugEntranceConfigAll_1 = require("./DebugEntranceConfigAll");
const DebugEntranceConfigById_1 = require("./DebugEntranceConfigById");
const DebugEntranceTypeConfigAll_1 = require("./DebugEntranceTypeConfigAll");
const DebugEntranceTypeConfigById_1 = require("./DebugEntranceTypeConfigById");
const DetectionTextById_1 = require("./DetectionTextById");
const DevicePlatformById_1 = require("./DevicePlatformById");
const DevicePlatformByPidAndVid_1 = require("./DevicePlatformByPidAndVid");
const DeviceRenderFeatureByDeviceId_1 = require("./DeviceRenderFeatureByDeviceId");
const DoubleRewardActivityById_1 = require("./DoubleRewardActivityById");
const DragonPoolAll_1 = require("./DragonPoolAll");
const DragonPoolById_1 = require("./DragonPoolById");
const DropPackageById_1 = require("./DropPackageById");
const DropShowPlanById_1 = require("./DropShowPlanById");
const DungeonDetectionAll_1 = require("./DungeonDetectionAll");
const DungeonDetectionByDungeonId_1 = require("./DungeonDetectionByDungeonId");
const DungeonDetectionById_1 = require("./DungeonDetectionById");
const DynamicMapMarkByMapId_1 = require("./DynamicMapMarkByMapId");
const DynamicMapMarkByMarkId_1 = require("./DynamicMapMarkByMarkId");
const EffectConfigById_1 = require("./EffectConfigById");
const EffectSpecDataByPath_1 = require("./EffectSpecDataByPath");
const ElementIconTagById_1 = require("./ElementIconTagById");
const ElementInfoById_1 = require("./ElementInfoById");
const ElementInfoById2_1 = require("./ElementInfoById2");
const ElementLevelByLevel_1 = require("./ElementLevelByLevel");
const ElementReactionMatrixAll_1 = require("./ElementReactionMatrixAll");
const ElementalReactionAll_1 = require("./ElementalReactionAll");
const ElementalReactionByReactionId_1 = require("./ElementalReactionByReactionId");
const EntityAudioConfigById_1 = require("./EntityAudioConfigById");
const EntityAudioConfigByIdWithZero_1 = require("./EntityAudioConfigByIdWithZero");
const EntityOwnerDataByGuid_1 = require("./EntityOwnerDataByGuid");
const EntitySkillPreloadByActorBlueprintAndSkillId_1 = require("./EntitySkillPreloadByActorBlueprintAndSkillId");
const EntitySkillPreloadById_1 = require("./EntitySkillPreloadById");
const EntityVoxelInfoByMapIdAndEntityId_1 = require("./EntityVoxelInfoByMapIdAndEntityId");
const EntranceIconTagById_1 = require("./EntranceIconTagById");
const ErrorCodeById_1 = require("./ErrorCodeById");
const ExchangeRewardById_1 = require("./ExchangeRewardById");
const ExchangeSharedById_1 = require("./ExchangeSharedById");
const ExecutionConfById_1 = require("./ExecutionConfById");
const ExploreProgressAll_1 = require("./ExploreProgressAll");
const ExploreProgressByArea_1 = require("./ExploreProgressByArea");
const ExploreProgressById_1 = require("./ExploreProgressById");
const ExploreRewardByCountry_1 = require("./ExploreRewardByCountry");
const ExploreRewardById_1 = require("./ExploreRewardById");
const ExploreRewardDisplayById_1 = require("./ExploreRewardDisplayById");
const ExploreScoreAll_1 = require("./ExploreScoreAll");
const ExploreScoreByArea_1 = require("./ExploreScoreByArea");
const ExploreToolsAll_1 = require("./ExploreToolsAll");
const ExploreToolsByPhantomSkillId_1 = require("./ExploreToolsByPhantomSkillId");
const ExternalSourceSettingById_1 = require("./ExternalSourceSettingById");
const FaceExpressionDataById_1 = require("./FaceExpressionDataById");
const FavorGoodsByRoleId_1 = require("./FavorGoodsByRoleId");
const FavorLevelByLevel_1 = require("./FavorLevelByLevel");
const FavorRoleInfoByRoleId_1 = require("./FavorRoleInfoByRoleId");
const FavorStoryByRoleId_1 = require("./FavorStoryByRoleId");
const FavorTabCameraById_1 = require("./FavorTabCameraById");
const FavorWordByRoleIdAndType_1 = require("./FavorWordByRoleIdAndType");
const FeedingAnimalById_1 = require("./FeedingAnimalById");
const FightFormationById_1 = require("./FightFormationById");
const FilterById_1 = require("./FilterById");
const FilterRuleById_1 = require("./FilterRuleById");
const FilterSortGroupById_1 = require("./FilterSortGroupById");
const FlowById_1 = require("./FlowById");
const FlowStateByStateKey_1 = require("./FlowStateByStateKey");
const FlowTemplateDataById_1 = require("./FlowTemplateDataById");
const FlowTextByIdAndFlowListId_1 = require("./FlowTextByIdAndFlowListId");
const FlowTextLang_1 = require("./FlowTextLang");
const FogBlockAll_1 = require("./FogBlockAll");
const FogBlockByBlock_1 = require("./FogBlockByBlock");
const FogTextureConfigAll_1 = require("./FogTextureConfigAll");
const FogTextureConfigByBlock_1 = require("./FogTextureConfigByBlock");
const FoleySynthBoneConfigById_1 = require("./FoleySynthBoneConfigById");
const FoleySynthConfigById_1 = require("./FoleySynthConfigById");
const FoleySynthConfigByIdWithDefaultId_1 = require("./FoleySynthConfigByIdWithDefaultId");
const ForgeFormulaAll_1 = require("./ForgeFormulaAll");
const ForgeFormulaByFormulaItemId_1 = require("./ForgeFormulaByFormulaItemId");
const ForgeFormulaById_1 = require("./ForgeFormulaById");
const ForgeFormulaByTypeId_1 = require("./ForgeFormulaByTypeId");
const FormationPropertyAll_1 = require("./FormationPropertyAll");
const FormationPropertyById_1 = require("./FormationPropertyById");
const FriendFilterAll_1 = require("./FriendFilterAll");
const FuncMenuWheelAll_1 = require("./FuncMenuWheelAll");
const FuncMenuWheelByFuncId_1 = require("./FuncMenuWheelByFuncId");
const FunctionConditionByFunctionId_1 = require("./FunctionConditionByFunctionId");
const FunctionMenuAll_1 = require("./FunctionMenuAll");
const FunctionMenuByFunctionId_1 = require("./FunctionMenuByFunctionId");
const FunctionOpenViewLimitAll_1 = require("./FunctionOpenViewLimitAll");
const GaChaShareById_1 = require("./GaChaShareById");
const GachaAll_1 = require("./GachaAll");
const GachaById_1 = require("./GachaById");
const GachaEffectConfigByTimesAndQuality_1 = require("./GachaEffectConfigByTimesAndQuality");
const GachaPoolById_1 = require("./GachaPoolById");
const GachaSequenceConfigById_1 = require("./GachaSequenceConfigById");
const GachaTextureInfoById_1 = require("./GachaTextureInfoById");
const GachaViewInfoById_1 = require("./GachaViewInfoById");
const GachaViewTypeInfoByType_1 = require("./GachaViewTypeInfoByType");
const GachaWeaponTransformById_1 = require("./GachaWeaponTransformById");
const GamePlayInformationGroupById_1 = require("./GamePlayInformationGroupById");
const GamePlayInformationInfoById_1 = require("./GamePlayInformationInfoById");
const GamePlayScanByUid_1 = require("./GamePlayScanByUid");
const GamePlayScanCompositeByUid_1 = require("./GamePlayScanCompositeByUid");
const GamepadKeyById_1 = require("./GamepadKeyById");
const GamepadKeyByKeyName_1 = require("./GamepadKeyByKeyName");
const GameplayCueById_1 = require("./GameplayCueById");
const GatherActivityAll_1 = require("./GatherActivityAll");
const GatherActivityById_1 = require("./GatherActivityById");
const GenderTextByMaleText_1 = require("./GenderTextByMaleText");
const GeneralActionById_1 = require("./GeneralActionById");
const GeneralActionGroupById_1 = require("./GeneralActionGroupById");
const GenericPromptByTipsId_1 = require("./GenericPromptByTipsId");
const GenericPromptTypesByTypeId_1 = require("./GenericPromptTypesByTypeId");
const GeographyHandBookAll_1 = require("./GeographyHandBookAll");
const GeographyHandBookById_1 = require("./GeographyHandBookById");
const GeographyHandBookByType_1 = require("./GeographyHandBookByType");
const GeographyTypeAll_1 = require("./GeographyTypeAll");
const GeographyTypeById_1 = require("./GeographyTypeById");
const GiftPackageById_1 = require("./GiftPackageById");
const GlobalConfigFromCsvByName_1 = require("./GlobalConfigFromCsvByName");
const GmAccountAll_1 = require("./GmAccountAll");
const GmAccountById_1 = require("./GmAccountById");
const GmOrderConfigAll_1 = require("./GmOrderConfigAll");
const GmOrderListAll_1 = require("./GmOrderListAll");
const GmOrderListById_1 = require("./GmOrderListById");
const GuideDataById_1 = require("./GuideDataById");
const GuideFocusNewByGuideId_1 = require("./GuideFocusNewByGuideId");
const GuideGroupAll_1 = require("./GuideGroupAll");
const GuideGroupById_1 = require("./GuideGroupById");
const GuideStepAll_1 = require("./GuideStepAll");
const GuideStepById_1 = require("./GuideStepById");
const GuideTipsByGuideId_1 = require("./GuideTipsByGuideId");
const GuideTutorialAll_1 = require("./GuideTutorialAll");
const GuideTutorialById_1 = require("./GuideTutorialById");
const GuideTutorialPageById_1 = require("./GuideTutorialPageById");
const HandBookEntranceAll_1 = require("./HandBookEntranceAll");
const HandBookEntranceById_1 = require("./HandBookEntranceById");
const HandBookQuestTabAll_1 = require("./HandBookQuestTabAll");
const HandBookQuestTabById_1 = require("./HandBookQuestTabById");
const HardnessModeById_1 = require("./HardnessModeById");
const HeadIconById_1 = require("./HeadIconById");
const HelpTextByGroupId_1 = require("./HelpTextByGroupId");
const HelpTextById_1 = require("./HelpTextById");
const HotKeyIconByKeyName_1 = require("./HotKeyIconByKeyName");
const HotKeyMapById_1 = require("./HotKeyMapById");
const HotKeyTextByTextId_1 = require("./HotKeyTextByTextId");
const HotKeyTypeById_1 = require("./HotKeyTypeById");
const HotKeyViewById_1 = require("./HotKeyViewById");
const HotPatchTextLang_1 = require("./HotPatchTextLang");
const InfluenceAll_1 = require("./InfluenceAll");
const InfluenceById_1 = require("./InfluenceById");
const InfoDisplayById_1 = require("./InfoDisplayById");
const InstanceDungeonAll_1 = require("./InstanceDungeonAll");
const InstanceDungeonById_1 = require("./InstanceDungeonById");
const InstanceDungeonEntranceAll_1 = require("./InstanceDungeonEntranceAll");
const InstanceDungeonEntranceById_1 = require("./InstanceDungeonEntranceById");
const InstanceDungeonEntranceByMarkId_1 = require("./InstanceDungeonEntranceByMarkId");
const InstanceDungeonTitleById_1 = require("./InstanceDungeonTitleById");
const InstanceEnterControlById_1 = require("./InstanceEnterControlById");
const InstanceTrialRoleConfigById_1 = require("./InstanceTrialRoleConfigById");
const InteractAudioMaterialByCollisionMaterial_1 = require("./InteractAudioMaterialByCollisionMaterial");
const InteractBackGroundById_1 = require("./InteractBackGroundById");
const InteractBackGroundByViewName_1 = require("./InteractBackGroundByViewName");
const InteractDataByGuid_1 = require("./InteractDataByGuid");
const InterjectionByTimberIdAndUniversalToneId_1 = require("./InterjectionByTimberIdAndUniversalToneId");
const ItemExchangeContentAll_1 = require("./ItemExchangeContentAll");
const ItemExchangeContentByItemId_1 = require("./ItemExchangeContentByItemId");
const ItemExchangeLimitByItemId_1 = require("./ItemExchangeLimitByItemId");
const ItemHandBookAll_1 = require("./ItemHandBookAll");
const ItemHandBookById_1 = require("./ItemHandBookById");
const ItemHandBookByType_1 = require("./ItemHandBookByType");
const ItemHandBookTypeAll_1 = require("./ItemHandBookTypeAll");
const ItemHandBookTypeById_1 = require("./ItemHandBookTypeById");
const ItemIconTagById_1 = require("./ItemIconTagById");
const ItemInfoAll_1 = require("./ItemInfoAll");
const ItemInfoById_1 = require("./ItemInfoById");
const ItemInfoByItemType_1 = require("./ItemInfoByItemType");
const ItemMainTypeAll_1 = require("./ItemMainTypeAll");
const ItemMainTypeById_1 = require("./ItemMainTypeById");
const ItemShowTypeById_1 = require("./ItemShowTypeById");
const KeySettingAll_1 = require("./KeySettingAll");
const KeySettingById_1 = require("./KeySettingById");
const KeySettingByTypeId_1 = require("./KeySettingByTypeId");
const KeySettingByTypeIdAndInputControllerType_1 = require("./KeySettingByTypeIdAndInputControllerType");
const KeyTypeAll_1 = require("./KeyTypeAll");
const KeyTypeByTypeId_1 = require("./KeyTypeByTypeId");
const KillMonstersScoresByInstanceID_1 = require("./KillMonstersScoresByInstanceID");
const LangOfLogoByName_1 = require("./LangOfLogoByName");
const LanguageDefineByLanguageCode_1 = require("./LanguageDefineByLanguageCode");
const LanguageDefineByLanguageType_1 = require("./LanguageDefineByLanguageType");
const LevelEntityConfigByBlueprintType_1 = require("./LevelEntityConfigByBlueprintType");
const LevelEntityConfigByMapIdAndEntityId_1 = require("./LevelEntityConfigByMapIdAndEntityId");
const LevelPlayDataById_1 = require("./LevelPlayDataById");
const LevelPlayNodeDataByKey_1 = require("./LevelPlayNodeDataByKey");
const LivenessAll_1 = require("./LivenessAll");
const LivenessById_1 = require("./LivenessById");
const LivenessTaskByTaskId_1 = require("./LivenessTaskByTaskId");
const LoadingLevelAreaAll_1 = require("./LoadingLevelAreaAll");
const LoadingTipsTextAll_1 = require("./LoadingTipsTextAll");
const LoadingTipsTextById_1 = require("./LoadingTipsTextById");
const LoadingTipsTextByLevelAreaId_1 = require("./LoadingTipsTextByLevelAreaId");
const LockOnConfigById_1 = require("./LockOnConfigById");
const LongPressConfigById_1 = require("./LongPressConfigById");
const LongShanStageAll_1 = require("./LongShanStageAll");
const LongShanStageById_1 = require("./LongShanStageById");
const LongShanTaskById_1 = require("./LongShanTaskById");
const LordGymAll_1 = require("./LordGymAll");
const LordGymByDifficulty_1 = require("./LordGymByDifficulty");
const LordGymById_1 = require("./LordGymById");
const LordGymEntranceAll_1 = require("./LordGymEntranceAll");
const LordGymEntranceById_1 = require("./LordGymEntranceById");
const LordGymEntranceByMarkId_1 = require("./LordGymEntranceByMarkId");
const LordGymFilterTypeAll_1 = require("./LordGymFilterTypeAll");
const LordGymFilterTypeById_1 = require("./LordGymFilterTypeById");
const MailFilterAll_1 = require("./MailFilterAll");
const MailFilterById_1 = require("./MailFilterById");
const MainRoleConfigAll_1 = require("./MainRoleConfigAll");
const MainRoleConfigByGender_1 = require("./MainRoleConfigByGender");
const MainRoleConfigById_1 = require("./MainRoleConfigById");
const MainTypeAll_1 = require("./MainTypeAll");
const MainTypeById_1 = require("./MainTypeById");
const MapAudioById_1 = require("./MapAudioById");
const MapBorderAll_1 = require("./MapBorderAll");
const MapBorderByBorderId_1 = require("./MapBorderByBorderId");
const MapMarkByEntityConfigId_1 = require("./MapMarkByEntityConfigId");
const MapMarkByMapId_1 = require("./MapMarkByMapId");
const MapMarkByMarkId_1 = require("./MapMarkByMarkId");
const MapMarkByRelativeMainSubType_1 = require("./MapMarkByRelativeMainSubType");
const MapMarkHasEntityConfigId_1 = require("./MapMarkHasEntityConfigId");
const MapMarkPhantomGroupByMarkId_1 = require("./MapMarkPhantomGroupByMarkId");
const MapMarkRelativeSubTypeAll_1 = require("./MapMarkRelativeSubTypeAll");
const MapMarkRelativeSubTypeByFunctionId_1 = require("./MapMarkRelativeSubTypeByFunctionId");
const MapMarkRelativeSubTypeById_1 = require("./MapMarkRelativeSubTypeById");
const MapNoteById_1 = require("./MapNoteById");
const MappingBySheetNameAndFieldName_1 = require("./MappingBySheetNameAndFieldName");
const MappingBySheetNameFieldNameAndValue_1 = require("./MappingBySheetNameFieldNameAndValue");
const MarkEffectByMarkId_1 = require("./MarkEffectByMarkId");
const MenuConfigAll_1 = require("./MenuConfigAll");
const MenuConfigByFunctionId_1 = require("./MenuConfigByFunctionId");
const MobileBattleUiSetAll_1 = require("./MobileBattleUiSetAll");
const MobileBattleUiSetByPanelIndex_1 = require("./MobileBattleUiSetByPanelIndex");
const ModelConfigPreloadById_1 = require("./ModelConfigPreloadById");
const MonitorActionById_1 = require("./MonitorActionById");
const MonsterBattleConfById_1 = require("./MonsterBattleConfById");
const MonsterBodyTypeConfigById_1 = require("./MonsterBodyTypeConfigById");
const MonsterDetectionAll_1 = require("./MonsterDetectionAll");
const MonsterDetectionById_1 = require("./MonsterDetectionById");
const MonsterDetectionFilterAll_1 = require("./MonsterDetectionFilterAll");
const MonsterDisplayById_1 = require("./MonsterDisplayById");
const MonsterDisplayLang_1 = require("./MonsterDisplayLang");
const MonsterHandBookAll_1 = require("./MonsterHandBookAll");
const MonsterHandBookById_1 = require("./MonsterHandBookById");
const MonsterHandBookByType_1 = require("./MonsterHandBookByType");
const MonsterHandBookTypeAll_1 = require("./MonsterHandBookTypeAll");
const MonsterIconTagById_1 = require("./MonsterIconTagById");
const MonsterInfoById_1 = require("./MonsterInfoById");
const MonsterPerchById_1 = require("./MonsterPerchById");
const MonsterPropertyGrowthById_1 = require("./MonsterPropertyGrowthById");
const MonsterRarityById_1 = require("./MonsterRarityById");
const MonsterSizeIdById_1 = require("./MonsterSizeIdById");
const MontageDataById_1 = require("./MontageDataById");
const MonthCardContentById_1 = require("./MonthCardContentById");
const MotionById_1 = require("./MotionById");
const MotionByRoleId_1 = require("./MotionByRoleId");
const MotionByRoleIdAndType_1 = require("./MotionByRoleIdAndType");
const MultiMapAll_1 = require("./MultiMapAll");
const MultiMapByGroupId_1 = require("./MultiMapByGroupId");
const MultiMapById_1 = require("./MultiMapById");
const MultiMapAreaConfigAll_1 = require("./MultiMapAreaConfigAll");
const MultiMapAreaConfigByBlock_1 = require("./MultiMapAreaConfigByBlock");
const MultiTextLang_1 = require("./MultiTextLang");
const NewOccupationConfigAll_1 = require("./NewOccupationConfigAll");
const NewOccupationConfigById_1 = require("./NewOccupationConfigById");
const NewbieCourseAll_1 = require("./NewbieCourseAll");
const NewbieCourseById_1 = require("./NewbieCourseById");
const NpcHeadInfoById_1 = require("./NpcHeadInfoById");
const NpcSystemBackgroundById_1 = require("./NpcSystemBackgroundById");
const NpcSystemBackgroundByViewName_1 = require("./NpcSystemBackgroundByViewName");
const OccupationConfigById_1 = require("./OccupationConfigById");
const OccupationConfigLang_1 = require("./OccupationConfigLang");
const OverlayAbpMontageDataById_1 = require("./OverlayAbpMontageDataById");
const PackageCapacityAll_1 = require("./PackageCapacityAll");
const PackageCapacityByPackageId_1 = require("./PackageCapacityByPackageId");
const ParkourChallengeById_1 = require("./ParkourChallengeById");
const ParkourChallengeByMarkId_1 = require("./ParkourChallengeByMarkId");
const PassiveSkillById_1 = require("./PassiveSkillById");
const PayById_1 = require("./PayById");
const PayByPayIdAndRegion_1 = require("./PayByPayIdAndRegion");
const PayByRegion_1 = require("./PayByRegion");
const PayItemAll_1 = require("./PayItemAll");
const PayItemById_1 = require("./PayItemById");
const PayShopAll_1 = require("./PayShopAll");
const PayShopById_1 = require("./PayShopById");
const PayShopConditionById_1 = require("./PayShopConditionById");
const PayShopDirectGoodsByGoodsId_1 = require("./PayShopDirectGoodsByGoodsId");
const PayShopGoodsById_1 = require("./PayShopGoodsById");
const PayShopGoodsByItemId_1 = require("./PayShopGoodsByItemId");
const PayShopTabByShopId_1 = require("./PayShopTabByShopId");
const PayShopTabByShopIdAndTabId_1 = require("./PayShopTabByShopIdAndTabId");
const PcKeyById_1 = require("./PcKeyById");
const PcKeyByKeyName_1 = require("./PcKeyByKeyName");
const PersonalTipsByFunctionId_1 = require("./PersonalTipsByFunctionId");
const PersonalTipsById_1 = require("./PersonalTipsById");
const PhantomCollectActivityById_1 = require("./PhantomCollectActivityById");
const PhantomCollectTaskDescById_1 = require("./PhantomCollectTaskDescById");
const PhantomCustomizeItemByItemId_1 = require("./PhantomCustomizeItemByItemId");
const PhantomExpItemAll_1 = require("./PhantomExpItemAll");
const PhantomExpItemByItemId_1 = require("./PhantomExpItemByItemId");
const PhantomFetterAll_1 = require("./PhantomFetterAll");
const PhantomFetterById_1 = require("./PhantomFetterById");
const PhantomFetterGroupAll_1 = require("./PhantomFetterGroupAll");
const PhantomFetterGroupById_1 = require("./PhantomFetterGroupById");
const PhantomFetterHandBookAll_1 = require("./PhantomFetterHandBookAll");
const PhantomGrowthByGrowthIdAndLevel_1 = require("./PhantomGrowthByGrowthIdAndLevel");
const PhantomHandBookAll_1 = require("./PhantomHandBookAll");
const PhantomHandBookById_1 = require("./PhantomHandBookById");
const PhantomHandBookPageAll_1 = require("./PhantomHandBookPageAll");
const PhantomItemAll_1 = require("./PhantomItemAll");
const PhantomItemByItemId_1 = require("./PhantomItemByItemId");
const PhantomItemByMonsterId_1 = require("./PhantomItemByMonsterId");
const PhantomLevelByGroupId_1 = require("./PhantomLevelByGroupId");
const PhantomLevelByGroupIdAndLevel_1 = require("./PhantomLevelByGroupIdAndLevel");
const PhantomMainPropItemById_1 = require("./PhantomMainPropItemById");
const PhantomMainPropertyById_1 = require("./PhantomMainPropertyById");
const PhantomQualityByQuality_1 = require("./PhantomQualityByQuality");
const PhantomRarityByRare_1 = require("./PhantomRarityByRare");
const PhantomSkillById_1 = require("./PhantomSkillById");
const PhantomSkillByPhantomSkillId_1 = require("./PhantomSkillByPhantomSkillId");
const PhantomSubPropertyById_1 = require("./PhantomSubPropertyById");
const PhantomSubPropertyByPropId_1 = require("./PhantomSubPropertyByPropId");
const PhantomWildItemAll_1 = require("./PhantomWildItemAll");
const PhantomWildItemByItemId_1 = require("./PhantomWildItemByItemId");
const PhotoMemoryActivityById_1 = require("./PhotoMemoryActivityById");
const PhotoMemoryCollectById_1 = require("./PhotoMemoryCollectById");
const PhotoMemoryCollectByTopicID_1 = require("./PhotoMemoryCollectByTopicID");
const PhotoMemoryTopicAll_1 = require("./PhotoMemoryTopicAll");
const PhotoMemoryTopicById_1 = require("./PhotoMemoryTopicById");
const PhotoMontageById_1 = require("./PhotoMontageById");
const PhotoMontageByRoleId_1 = require("./PhotoMontageByRoleId");
const PhotoSetupAll_1 = require("./PhotoSetupAll");
const PhotoSetupByValueType_1 = require("./PhotoSetupByValueType");
const PhotographHandBookAll_1 = require("./PhotographHandBookAll");
const PhotographHandBookById_1 = require("./PhotographHandBookById");
const PhotographHandBookByType_1 = require("./PhotographHandBookByType");
const PhysicsAssetConfigById_1 = require("./PhysicsAssetConfigById");
const PhysicsAssetConfigByIdWithDefaultId_1 = require("./PhysicsAssetConfigByIdWithDefaultId");
const PlatformIconById_1 = require("./PlatformIconById");
const PlayerExpByPlayerLevel_1 = require("./PlayerExpByPlayerLevel");
const PlayerExpByPlayerLevelArea_1 = require("./PlayerExpByPlayerLevelArea");
const PlayerStateRestrictionById_1 = require("./PlayerStateRestrictionById");
const PlotAudioById_1 = require("./PlotAudioById");
const PlotHandBookConfigAll_1 = require("./PlotHandBookConfigAll");
const PlotHandBookConfigByQuestId_1 = require("./PlotHandBookConfigByQuestId");
const PlotTypeAll_1 = require("./PlotTypeAll");
const PlotTypeById_1 = require("./PlotTypeById");
const PrefabConfigById_1 = require("./PrefabConfigById");
const PrefabTextItemAll_1 = require("./PrefabTextItemAll");
const PrefabTextItemByItemId_1 = require("./PrefabTextItemByItemId");
const PrefabTextItemByPrefabPathHash_1 = require("./PrefabTextItemByPrefabPathHash");
const PreviewItemAll_1 = require("./PreviewItemAll");
const PreviewItemById_1 = require("./PreviewItemById");
const PropRewardConfById_1 = require("./PropRewardConfById");
const PropertyIndexAll_1 = require("./PropertyIndexAll");
const PropertyIndexById_1 = require("./PropertyIndexById");
const ProtocolMonitoringByAll_1 = require("./ProtocolMonitoringByAll");
const QualityIconTagById_1 = require("./QualityIconTagById");
const QualityInfoAll_1 = require("./QualityInfoAll");
const QualityInfoById_1 = require("./QualityInfoById");
const QuestById_1 = require("./QuestById");
const QuestChapterById_1 = require("./QuestChapterById");
const QuestDataById_1 = require("./QuestDataById");
const QuestMainTypeById_1 = require("./QuestMainTypeById");
const QuestNodeDataByKey_1 = require("./QuestNodeDataByKey");
const QuestTypeAll_1 = require("./QuestTypeAll");
const QuestTypeById_1 = require("./QuestTypeById");
const QuestTypeByMainId_1 = require("./QuestTypeByMainId");
const QuickChatAll_1 = require("./QuickChatAll");
const RecordConfigById_1 = require("./RecordConfigById");
const RedDotByRelativeName_1 = require("./RedDotByRelativeName");
const ReportPlayerInfoAll_1 = require("./ReportPlayerInfoAll");
const ResonantChainByGroupId_1 = require("./ResonantChainByGroupId");
const ResonantChainByGroupIdAndGroupIndex_1 = require("./ResonantChainByGroupIdAndGroupIndex");
const ResonantChainByGroupIdAndNodeType_1 = require("./ResonantChainByGroupIdAndNodeType");
const ResonantChainById_1 = require("./ResonantChainById");
const ReviveById_1 = require("./ReviveById");
const RewardViewFromSourceAll_1 = require("./RewardViewFromSourceAll");
const RewardViewFromSourceBySourceId_1 = require("./RewardViewFromSourceBySourceId");
const RogueActivityById_1 = require("./RogueActivityById");
const RogueAffixById_1 = require("./RogueAffixById");
const RogueBuffPoolById_1 = require("./RogueBuffPoolById");
const RogueCharacterById_1 = require("./RogueCharacterById");
const RogueCharacterBuffById_1 = require("./RogueCharacterBuffById");
const RogueCurrencyById_1 = require("./RogueCurrencyById");
const RogueEffectById_1 = require("./RogueEffectById");
const RogueEventById_1 = require("./RogueEventById");
const RogueParamById_1 = require("./RogueParamById");
const RoguePokemonById_1 = require("./RoguePokemonById");
const RoguePopularEntrieArgAll_1 = require("./RoguePopularEntrieArgAll");
const RoguePopularEntrieArgById_1 = require("./RoguePopularEntrieArgById");
const RoguePopularEntrieArgBySeasonIdAndInstId_1 = require("./RoguePopularEntrieArgBySeasonIdAndInstId");
const RogueQualityConfigById_1 = require("./RogueQualityConfigById");
const RogueRoomTypeById_1 = require("./RogueRoomTypeById");
const RogueSeasonAll_1 = require("./RogueSeasonAll");
const RogueSeasonById_1 = require("./RogueSeasonById");
const RogueSeasonRewardBySeasonId_1 = require("./RogueSeasonRewardBySeasonId");
const RogueTalentTreeAll_1 = require("./RogueTalentTreeAll");
const RogueTalentTreeById_1 = require("./RogueTalentTreeById");
const RogueTalentTreeDescById_1 = require("./RogueTalentTreeDescById");
const RogueTokenBySeasonId_1 = require("./RogueTokenBySeasonId");
const RoleAnimAudioByRoleId_1 = require("./RoleAnimAudioByRoleId");
const RoleAudioById_1 = require("./RoleAudioById");
const RoleBattleViewInfoAll_1 = require("./RoleBattleViewInfoAll");
const RoleBattleViewInfoById_1 = require("./RoleBattleViewInfoById");
const RoleBreachByBreachGroupId_1 = require("./RoleBreachByBreachGroupId");
const RoleBreachByBreachGroupIdAndBreachLevel_1 = require("./RoleBreachByBreachGroupIdAndBreachLevel");
const RoleDescriptionById_1 = require("./RoleDescriptionById");
const RoleExpItemAll_1 = require("./RoleExpItemAll");
const RoleExpItemById_1 = require("./RoleExpItemById");
const RoleGuideActivityById_1 = require("./RoleGuideActivityById");
const RoleIconTagById_1 = require("./RoleIconTagById");
const RoleInfluenceAll_1 = require("./RoleInfluenceAll");
const RoleInfluenceById_1 = require("./RoleInfluenceById");
const RoleInfoAll_1 = require("./RoleInfoAll");
const RoleInfoById_1 = require("./RoleInfoById");
const RoleInfoByRoleType_1 = require("./RoleInfoByRoleType");
const RoleLevelConsumeByConsumeGroupIdAndLevel_1 = require("./RoleLevelConsumeByConsumeGroupIdAndLevel");
const RolePropertyGrowthByLevelAndBreachLevel_1 = require("./RolePropertyGrowthByLevelAndBreachLevel");
const RoleQualityInfoById_1 = require("./RoleQualityInfoById");
const RoleQuestById_1 = require("./RoleQuestById");
const RoleQuestByRoleId_1 = require("./RoleQuestByRoleId");
const RoleQuestByRoleIdAll_1 = require("./RoleQuestByRoleIdAll");
const RoleSkillInputById_1 = require("./RoleSkillInputById");
const RoleTagAll_1 = require("./RoleTagAll");
const RoleTagById_1 = require("./RoleTagById");
const RoleTrainingDegreeByDifficultyLevel_1 = require("./RoleTrainingDegreeByDifficultyLevel");
const RoleTrialActivityById_1 = require("./RoleTrialActivityById");
const RoleTrialInfoById_1 = require("./RoleTrialInfoById");
const RougeMiraclecreationById_1 = require("./RougeMiraclecreationById");
const RougePopularEntrieAll_1 = require("./RougePopularEntrieAll");
const RougePopularEntrieById_1 = require("./RougePopularEntrieById");
const ScoreRewardById_1 = require("./ScoreRewardById");
const SecondaryGuideDataById_1 = require("./SecondaryGuideDataById");
const SetAccountAll_1 = require("./SetAccountAll");
const SetAccountById_1 = require("./SetAccountById");
const SharePlatformAll_1 = require("./SharePlatformAll");
const SharePlatformById_1 = require("./SharePlatformById");
const ShareRewardById_1 = require("./ShareRewardById");
const ShieldById_1 = require("./ShieldById");
const ShopFixedByShopId_1 = require("./ShopFixedByShopId");
const ShopFixedByShopIdAndId_1 = require("./ShopFixedByShopIdAndId");
const ShopInfoById_1 = require("./ShopInfoById");
const SignalDecodeGamePlayById_1 = require("./SignalDecodeGamePlayById");
const SignalDecodeTabColorById_1 = require("./SignalDecodeTabColorById");
const SignalDecodeWaveformById_1 = require("./SignalDecodeWaveformById");
const SilentAreaDetectionAll_1 = require("./SilentAreaDetectionAll");
const SilentAreaDetectionById_1 = require("./SilentAreaDetectionById");
const SkillById_1 = require("./SkillById");
const SkillBySkillGroupId_1 = require("./SkillBySkillGroupId");
const SkillButtonByRoleId_1 = require("./SkillButtonByRoleId");
const SkillButtonEffectById_1 = require("./SkillButtonEffectById");
const SkillButtonIndexById_1 = require("./SkillButtonIndexById");
const SkillButtonTextAll_1 = require("./SkillButtonTextAll");
const SkillButtonTextById_1 = require("./SkillButtonTextById");
const SkillCommonButtonAll_1 = require("./SkillCommonButtonAll");
const SkillConditionById_1 = require("./SkillConditionById");
const SkillDescriptionById_1 = require("./SkillDescriptionById");
const SkillDescriptionBySkillLevelGroupId_1 = require("./SkillDescriptionBySkillLevelGroupId");
const SkillIconByTag_1 = require("./SkillIconByTag");
const SkillInputById_1 = require("./SkillInputById");
const SkillLevelBySkillLevelGroupId_1 = require("./SkillLevelBySkillLevelGroupId");
const SkillLevelBySkillLevelGroupIdAndSkillId_1 = require("./SkillLevelBySkillLevelGroupIdAndSkillId");
const SkillTagById_1 = require("./SkillTagById");
const SkillTreeById_1 = require("./SkillTreeById");
const SkillTreeByNodeGroup_1 = require("./SkillTreeByNodeGroup");
const SkillTreeByNodeGroupAndNodeIndex_1 = require("./SkillTreeByNodeGroupAndNodeIndex");
const SkillTreeByNodeIndex_1 = require("./SkillTreeByNodeIndex");
const SkillTypeById_1 = require("./SkillTypeById");
const SkyboxById_1 = require("./SkyboxById");
const SlideById_1 = require("./SlideById");
const SortById_1 = require("./SortById");
const SortRuleByIdAndDataId_1 = require("./SortRuleByIdAndDataId");
const SoundAreaPlayInfoAll_1 = require("./SoundAreaPlayInfoAll");
const SoundAreaPlayInfoById_1 = require("./SoundAreaPlayInfoById");
const SoundBoxMarkByMarkId_1 = require("./SoundBoxMarkByMarkId");
const SpeakerById_1 = require("./SpeakerById");
const SpeakerLang_1 = require("./SpeakerLang");
const SpecialHateAndSenseById_1 = require("./SpecialHateAndSenseById");
const SpecialItemById_1 = require("./SpecialItemById");
const StateMachinePreloadByFsmKey_1 = require("./StateMachinePreloadByFsmKey");
const StateMachinePreloadById_1 = require("./StateMachinePreloadById");
const SubtitleTextByRowNameAndDatatableName_1 = require("./SubtitleTextByRowNameAndDatatableName");
const SubtitleTextLang_1 = require("./SubtitleTextLang");
const SummonCfgById_1 = require("./SummonCfgById");
const SwimById_1 = require("./SwimById");
const SwimBuffById_1 = require("./SwimBuffById");
const SynthesisFormulaByFormulaItemId_1 = require("./SynthesisFormulaByFormulaItemId");
const SynthesisFormulaByFormulaType_1 = require("./SynthesisFormulaByFormulaType");
const SynthesisFormulaById_1 = require("./SynthesisFormulaById");
const SynthesisLevelAll_1 = require("./SynthesisLevelAll");
const TakeWeedsDifficultyById_1 = require("./TakeWeedsDifficultyById");
const TalkOptionIconById_1 = require("./TalkOptionIconById");
const TaskMarkByMarkId_1 = require("./TaskMarkByMarkId");
const TeamConfigById_1 = require("./TeamConfigById");
const TeleporterById_1 = require("./TeleporterById");
const TemplateConfigAll_1 = require("./TemplateConfigAll");
const TemplateConfigByBlueprintType_1 = require("./TemplateConfigByBlueprintType");
const TemplateConfigById_1 = require("./TemplateConfigById");
const TemporaryTeleportMarkByMarkId_1 = require("./TemporaryTeleportMarkByMarkId");
const TextById_1 = require("./TextById");
const TidTextByTextKey_1 = require("./TidTextByTextKey");
const TidTextLang_1 = require("./TidTextLang");
const TimeOfDayById_1 = require("./TimeOfDayById");
const TimePointRewardActivityByActivityId_1 = require("./TimePointRewardActivityByActivityId");
const TimePointRewardActivityById_1 = require("./TimePointRewardActivityById");
const TimePointRewardConfigByActivityId_1 = require("./TimePointRewardConfigByActivityId");
const ToughCalcRatioById_1 = require("./ToughCalcRatioById");
const TowerBuffById_1 = require("./TowerBuffById");
const TowerConfigAll_1 = require("./TowerConfigAll");
const TowerConfigById_1 = require("./TowerConfigById");
const TowerConfigBySeason_1 = require("./TowerConfigBySeason");
const TowerDifficultyByDifficulty_1 = require("./TowerDifficultyByDifficulty");
const TowerGuideById_1 = require("./TowerGuideById");
const TowerTargetById_1 = require("./TowerTargetById");
const TrailPhantomPropById_1 = require("./TrailPhantomPropById");
const TreasureBoxDetectorMarkByMarkId_1 = require("./TreasureBoxDetectorMarkByMarkId");
const TreasureBoxMarkByMarkId_1 = require("./TreasureBoxMarkByMarkId");
const TrialPhantomPropItemById_1 = require("./TrialPhantomPropItemById");
const TrialRoleInfoAll_1 = require("./TrialRoleInfoAll");
const TrialRoleInfoByGroupId_1 = require("./TrialRoleInfoByGroupId");
const TrialRoleInfoById_1 = require("./TrialRoleInfoById");
const TrialWeaponInfoById_1 = require("./TrialWeaponInfoById");
const TurntableActivityByActivityId_1 = require("./TurntableActivityByActivityId");
const TurntableAwardsByActivityId_1 = require("./TurntableAwardsByActivityId");
const TurntableAwardsById_1 = require("./TurntableAwardsById");
const TurntableInfoById_1 = require("./TurntableInfoById");
const TypeInfoById_1 = require("./TypeInfoById");
const UiCameraMappingAll_1 = require("./UiCameraMappingAll");
const UiCameraMappingById_1 = require("./UiCameraMappingById");
const UiCameraMappingByViewName_1 = require("./UiCameraMappingByViewName");
const UiDynamicTabByChildViewName_1 = require("./UiDynamicTabByChildViewName");
const UiDynamicTabById_1 = require("./UiDynamicTabById");
const UiDynamicTabByParentViewName_1 = require("./UiDynamicTabByParentViewName");
const UiFloatConfigByViewName_1 = require("./UiFloatConfigByViewName");
const UiFloatConfigByViewNameIfNull_1 = require("./UiFloatConfigByViewNameIfNull");
const UiNormalConfigByViewName_1 = require("./UiNormalConfigByViewName");
const UiNormalConfigByViewNameIfNull_1 = require("./UiNormalConfigByViewNameIfNull");
const UiPlayItemById_1 = require("./UiPlayItemById");
const UiResourceById_1 = require("./UiResourceById");
const UiShowByViewName_1 = require("./UiShowByViewName");
const UiWeaponVisibleConfigById_1 = require("./UiWeaponVisibleConfigById");
const UniversalActivityById_1 = require("./UniversalActivityById");
const VideoCaptionByCgName_1 = require("./VideoCaptionByCgName");
const VideoDataByCgNameAndGirlOrBoy_1 = require("./VideoDataByCgNameAndGirlOrBoy");
const VideoSoundByCgNameAndGirlOrBoy_1 = require("./VideoSoundByCgNameAndGirlOrBoy");
const WeaponBreachByBreachId_1 = require("./WeaponBreachByBreachId");
const WeaponBreachByBreachIdAndLevel_1 = require("./WeaponBreachByBreachIdAndLevel");
const WeaponConfByItemId_1 = require("./WeaponConfByItemId");
const WeaponExpItemById_1 = require("./WeaponExpItemById");
const WeaponHandBookAll_1 = require("./WeaponHandBookAll");
const WeaponHandBookById_1 = require("./WeaponHandBookById");
const WeaponHideConfigById_1 = require("./WeaponHideConfigById");
const WeaponHideConfigByIdWithZero_1 = require("./WeaponHideConfigByIdWithZero");
const WeaponLevelByLevelId_1 = require("./WeaponLevelByLevelId");
const WeaponLevelByLevelIdAndLevel_1 = require("./WeaponLevelByLevelIdAndLevel");
const WeaponModelTransformById_1 = require("./WeaponModelTransformById");
const WeaponPropertyGrowthByCurveIdLevelAndBreachLevel_1 = require("./WeaponPropertyGrowthByCurveIdLevelAndBreachLevel");
const WeaponQualityInfoById_1 = require("./WeaponQualityInfoById");
const WeaponResonByResonIdAndLevel_1 = require("./WeaponResonByResonIdAndLevel");
const WeaponVisibleConfigById_1 = require("./WeaponVisibleConfigById");
const WeaponVisibleConfigByIdWithZero_1 = require("./WeaponVisibleConfigByIdWithZero");
const WeatherById_1 = require("./WeatherById");
const WorldLevelById_1 = require("./WorldLevelById");
const WorldNewJourneyAll_1 = require("./WorldNewJourneyAll");
const WorldNewJourneyById_1 = require("./WorldNewJourneyById");
class ConfigStatement {
  static Init() {
    CommonParamById_1.configCommonParamById.Init(),
      CommonParamLang_1.configCommonParamLang.Init(),
      AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.Init(),
      AbpMontageDataById_1.configAbpMontageDataById.Init(),
      AccessPathById_1.configAccessPathById.Init(),
      AchievementByGroupId_1.configAchievementByGroupId.Init(),
      AchievementById_1.configAchievementById.Init(),
      AchievementCategoryAll_1.configAchievementCategoryAll.Init(),
      AchievementCategoryById_1.configAchievementCategoryById.Init(),
      AchievementGroupByCategory_1.configAchievementGroupByCategory.Init(),
      AchievementGroupById_1.configAchievementGroupById.Init(),
      AchievementStarLevelByLevel_1.configAchievementStarLevelByLevel.Init(),
      ActionMappingAll_1.configActionMappingAll.Init(),
      ActionMappingByActionName_1.configActionMappingByActionName.Init(),
      ActionMappingByActionType_1.configActionMappingByActionType.Init(),
      ActionTypeByType_1.configActionTypeByType.Init(),
      ActivityById_1.configActivityById.Init(),
      ActivitySignById_1.configActivitySignById.Init(),
      AdventureTaskAll_1.configAdventureTaskAll.Init(),
      AdventureTaskById_1.configAdventureTaskById.Init(),
      AdventureTaskChapterAll_1.configAdventureTaskChapterAll.Init(),
      AdventureTaskChapterById_1.configAdventureTaskChapterById.Init(),
      AdviceConjunctionAll_1.configAdviceConjunctionAll.Init(),
      AdviceConjunctionById_1.configAdviceConjunctionById.Init(),
      AdviceParamsById_1.configAdviceParamsById.Init(),
      AdviceSentenceAll_1.configAdviceSentenceAll.Init(),
      AdviceSentenceById_1.configAdviceSentenceById.Init(),
      AdviceWordAll_1.configAdviceWordAll.Init(),
      AdviceWordById_1.configAdviceWordById.Init(),
      AdviceWordByType_1.configAdviceWordByType.Init(),
      AdviceWordTypeAll_1.configAdviceWordTypeAll.Init(),
      AdviceWordTypeById_1.configAdviceWordTypeById.Init(),
      AiAlertById_1.configAiAlertById.Init(),
      AiBaseById_1.configAiBaseById.Init(),
      AiBaseSkillById_1.configAiBaseSkillById.Init(),
      AiBattleWanderById_1.configAiBattleWanderById.Init(),
      AiBattleWanderGroupById_1.configAiBattleWanderGroupById.Init(),
      AiFleeById_1.configAiFleeById.Init(),
      AiHateById_1.configAiHateById.Init(),
      AiPatrolById_1.configAiPatrolById.Init(),
      AiSenseById_1.configAiSenseById.Init(),
      AiSenseGroupById_1.configAiSenseGroupById.Init(),
      AiSkillInfosById_1.configAiSkillInfosById.Init(),
      AiSkillPreconditionById_1.configAiSkillPreconditionById.Init(),
      AiStateMachineConfigById_1.configAiStateMachineConfigById.Init(),
      AiTeamAreaNewById_1.configAiTeamAreaNewById.Init(),
      AiTeamAttackById_1.configAiTeamAttackById.Init(),
      AiTeamLevelNewById_1.configAiTeamLevelNewById.Init(),
      AiWanderById_1.configAiWanderById.Init(),
      AiWanderRadiusConfigById_1.configAiWanderRadiusConfigById.Init(),
      AkiMapByMapId_1.configAkiMapByMapId.Init(),
      AkiMapSourceByMapId_1.configAkiMapSourceByMapId.Init(),
      AnimalHandBookAll_1.configAnimalHandBookAll.Init(),
      AnimalHandBookById_1.configAnimalHandBookById.Init(),
      AnimalHandBookByMeshId_1.configAnimalHandBookByMeshId.Init(),
      AreaByAreaId_1.configAreaByAreaId.Init(),
      AreaByCountryAndLevel_1.configAreaByCountryAndLevel.Init(),
      AreaByDeliveryMarkId_1.configAreaByDeliveryMarkId.Init(),
      AreaAtmosphereInfoById_1.configAreaAtmosphereInfoById.Init(),
      AreaMpcById_1.configAreaMpcById.Init(),
      AreaTaskExploreByAreaId_1.configAreaTaskExploreByAreaId.Init(),
      AreaTaskExploreById_1.configAreaTaskExploreById.Init(),
      AudioById_1.configAudioById.Init(),
      AxisMappingAll_1.configAxisMappingAll.Init(),
      AxisMappingByAxisName_1.configAxisMappingByAxisName.Init(),
      AxisMappingByAxisType_1.configAxisMappingByAxisType.Init(),
      AxisRevertAll_1.configAxisRevertAll.Init(),
      AxisRevertByRevertType_1.configAxisRevertByRevertType.Init(),
      BackgroundCardAll_1.configBackgroundCardAll.Init(),
      BackgroundCardById_1.configBackgroundCardById.Init(),
      BanInfoById_1.configBanInfoById.Init(),
      BanInfoByTypeAndReason_1.configBanInfoByTypeAndReason.Init(),
      BasePropertyById_1.configBasePropertyById.Init(),
      BattlePassById_1.configBattlePassById.Init(),
      BattlePassRewardByBattlePassId_1.configBattlePassRewardByBattlePassId.Init(),
      BattlePassTaskByTaskId_1.configBattlePassTaskByTaskId.Init(),
      BattlePassUnlockPopByBattlePassTypeId_1.configBattlePassUnlockPopByBattlePassTypeId.Init(),
      BattleScoreConfById_1.configBattleScoreConfById.Init(),
      BattleScoreLevelConfByGroupId_1.configBattleScoreLevelConfByGroupId.Init(),
      BattleScoreLevelConfById_1.configBattleScoreLevelConfById.Init(),
      BeginnerGuideById_1.configBeginnerGuideById.Init(),
      BlackboardWhiteListAll_1.configBlackboardWhiteListAll.Init(),
      BlockSwitchById_1.configBlockSwitchById.Init(),
      BlueprintConfigAll_1.configBlueprintConfigAll.Init(),
      BlueprintConfigByBlueprintType_1.configBlueprintConfigByBlueprintType.Init(),
      BossRushActivityAll_1.configBossRushActivityAll.Init(),
      BossRushActivityByActivityIdAndInstanceId_1.configBossRushActivityByActivityIdAndInstanceId.Init(),
      BossRushActivityById_1.configBossRushActivityById.Init(),
      BossRushBuffAll_1.configBossRushBuffAll.Init(),
      BossRushBuffById_1.configBossRushBuffById.Init(),
      BossRushMapMarkByActivityId_1.configBossRushMapMarkByActivityId.Init(),
      BossRushScoreAll_1.configBossRushScoreAll.Init(),
      BossRushScoreById_1.configBossRushScoreById.Init(),
      BoxStateById_1.configBoxStateById.Init(),
      BoxTypeById_1.configBoxTypeById.Init(),
      BroadcastImageById_1.configBroadcastImageById.Init(),
      BubbleDataByActionGuid_1.configBubbleDataByActionGuid.Init(),
      BuffById_1.configBuffById.Init(),
      BuffItemById_1.configBuffItemById.Init(),
      BuffItemByPublicCdGroup_1.configBuffItemByPublicCdGroup.Init(),
      BuffItemCdGroupById_1.configBuffItemCdGroupById.Init(),
      BulletPreloadByActorBlueprintAndBulletId_1.configBulletPreloadByActorBlueprintAndBulletId.Init(),
      BulletPreloadById_1.configBulletPreloadById.Init(),
      CalabashDevelopConditionById_1.configCalabashDevelopConditionById.Init(),
      CalabashDevelopRewardAll_1.configCalabashDevelopRewardAll.Init(),
      CalabashDevelopRewardByMonsterId_1.configCalabashDevelopRewardByMonsterId.Init(),
      CalabashLevelAll_1.configCalabashLevelAll.Init(),
      CalabashLevelByLevel_1.configCalabashLevelByLevel.Init(),
      CalabashTransformById_1.configCalabashTransformById.Init(),
      CatchSignalDifficultyById_1.configCatchSignalDifficultyById.Init(),
      CatchSignalGameplayById_1.configCatchSignalGameplayById.Init(),
      CharacterAudioConfigById_1.configCharacterAudioConfigById.Init(),
      CharacterAudioConfigByIdWithDefaultId_1.configCharacterAudioConfigByIdWithDefaultId.Init(),
      ChatById_1.configChatById.Init(),
      ChatExpressionAll_1.configChatExpressionAll.Init(),
      ChatExpressionByGroupId_1.configChatExpressionByGroupId.Init(),
      ChatExpressionById_1.configChatExpressionById.Init(),
      ChatExpressionGroupAll_1.configChatExpressionGroupAll.Init(),
      ChatExpressionGroupById_1.configChatExpressionGroupById.Init(),
      ChildUiCameraMappingAll_1.configChildUiCameraMappingAll.Init(),
      ChildUiCameraMappingById_1.configChildUiCameraMappingById.Init(),
      ChildUiCameraMappingByViewName_1.configChildUiCameraMappingByViewName.Init(),
      ChipHandBookAll_1.configChipHandBookAll.Init(),
      ChipHandBookById_1.configChipHandBookById.Init(),
      ChipHandBookByType_1.configChipHandBookByType.Init(),
      ChipTypeAll_1.configChipTypeAll.Init(),
      ChipTypeById_1.configChipTypeById.Init(),
      CipherGameplayById_1.configCipherGameplayById.Init(),
      ClimbById_1.configClimbById.Init(),
      ClueContentByGroupId_1.configClueContentByGroupId.Init(),
      ClueContentById_1.configClueContentById.Init(),
      ClueEntranceById_1.configClueEntranceById.Init(),
      CombinationActionAll_1.configCombinationActionAll.Init(),
      CombinationActionByActionName_1.configCombinationActionByActionName.Init(),
      CombinationActionByActionType_1.configCombinationActionByActionType.Init(),
      CombinationActionById_1.configCombinationActionById.Init(),
      CombinationAxisAll_1.configCombinationAxisAll.Init(),
      CombinationAxisByAxisName_1.configCombinationAxisByAxisName.Init(),
      CombinationAxisByAxisType_1.configCombinationAxisByAxisType.Init(),
      CombinationAxisById_1.configCombinationAxisById.Init(),
      ComboTeachingById_1.configComboTeachingById.Init(),
      ComboTeachingConditionById_1.configComboTeachingConditionById.Init(),
      CommonRewardViewDisplayById_1.configCommonRewardViewDisplayById.Init(),
      CommonSkillPreloadAll_1.configCommonSkillPreloadAll.Init(),
      CommonSkillPreloadById_1.configCommonSkillPreloadById.Init(),
      CommunicateById_1.configCommunicateById.Init(),
      CommunityAll_1.configCommunityAll.Init(),
      CommunityById_1.configCommunityById.Init(),
      CompositeRewardDisplayById_1.configCompositeRewardDisplayById.Init(),
      ConditionById_1.configConditionById.Init(),
      ConditionGroupById_1.configConditionGroupById.Init(),
      ConfirmBoxById_1.configConfirmBoxById.Init(),
      CookFixToolById_1.configCookFixToolById.Init(),
      CookFormulaAll_1.configCookFormulaAll.Init(),
      CookFormulaByFormulaItemId_1.configCookFormulaByFormulaItemId.Init(),
      CookFormulaById_1.configCookFormulaById.Init(),
      CookLevelAll_1.configCookLevelAll.Init(),
      CookLevelById_1.configCookLevelById.Init(),
      CookProcessMsgById_1.configCookProcessMsgById.Init(),
      CookProcessedAll_1.configCookProcessedAll.Init(),
      CookProcessedById_1.configCookProcessedById.Init(),
      CountryAll_1.configCountryAll.Init(),
      CountryById_1.configCountryById.Init(),
      CustomMarkAll_1.configCustomMarkAll.Init(),
      CustomMarkByMarkId_1.configCustomMarkByMarkId.Init(),
      CustomSequenceById_1.configCustomSequenceById.Init(),
      CustomSequenceLang_1.configCustomSequenceLang.Init(),
      CustomerServiceAll_1.configCustomerServiceAll.Init(),
      CustomerServiceById_1.configCustomerServiceById.Init(),
      DailyAdventureActivityByActivityId_1.configDailyAdventureActivityByActivityId.Init(),
      DailyAdventurePointById_1.configDailyAdventurePointById.Init(),
      DailyAdventureTaskByTaskId_1.configDailyAdventureTaskByTaskId.Init(),
      DailyTaskById_1.configDailyTaskById.Init(),
      DailyTaskGroupById_1.configDailyTaskGroupById.Init(),
      DamageById_1.configDamageById.Init(),
      DamagePayloadById_1.configDamagePayloadById.Init(),
      DamageTextAll_1.configDamageTextAll.Init(),
      DataLayerById_1.configDataLayerById.Init(),
      DaySelectPresetAll_1.configDaySelectPresetAll.Init(),
      DaySelectPresetById_1.configDaySelectPresetById.Init(),
      DebugCommandConfigById_1.configDebugCommandConfigById.Init(),
      DebugEntranceConfigAll_1.configDebugEntranceConfigAll.Init(),
      DebugEntranceConfigById_1.configDebugEntranceConfigById.Init(),
      DebugEntranceTypeConfigAll_1.configDebugEntranceTypeConfigAll.Init(),
      DebugEntranceTypeConfigById_1.configDebugEntranceTypeConfigById.Init(),
      DetectionTextById_1.configDetectionTextById.Init(),
      DevicePlatformById_1.configDevicePlatformById.Init(),
      DevicePlatformByPidAndVid_1.configDevicePlatformByPidAndVid.Init(),
      DeviceRenderFeatureByDeviceId_1.configDeviceRenderFeatureByDeviceId.Init(),
      DoubleRewardActivityById_1.configDoubleRewardActivityById.Init(),
      DragonPoolAll_1.configDragonPoolAll.Init(),
      DragonPoolById_1.configDragonPoolById.Init(),
      DropPackageById_1.configDropPackageById.Init(),
      DropShowPlanById_1.configDropShowPlanById.Init(),
      DungeonDetectionAll_1.configDungeonDetectionAll.Init(),
      DungeonDetectionByDungeonId_1.configDungeonDetectionByDungeonId.Init(),
      DungeonDetectionById_1.configDungeonDetectionById.Init(),
      DynamicMapMarkByMapId_1.configDynamicMapMarkByMapId.Init(),
      DynamicMapMarkByMarkId_1.configDynamicMapMarkByMarkId.Init(),
      EffectConfigById_1.configEffectConfigById.Init(),
      EffectSpecDataByPath_1.configEffectSpecDataByPath.Init(),
      ElementIconTagById_1.configElementIconTagById.Init(),
      ElementInfoById_1.configElementInfoById.Init(),
      ElementInfoById2_1.configElementInfoById2.Init(),
      ElementLevelByLevel_1.configElementLevelByLevel.Init(),
      ElementReactionMatrixAll_1.configElementReactionMatrixAll.Init(),
      ElementalReactionAll_1.configElementalReactionAll.Init(),
      ElementalReactionByReactionId_1.configElementalReactionByReactionId.Init(),
      EntityAudioConfigById_1.configEntityAudioConfigById.Init(),
      EntityAudioConfigByIdWithZero_1.configEntityAudioConfigByIdWithZero.Init(),
      EntityOwnerDataByGuid_1.configEntityOwnerDataByGuid.Init(),
      EntitySkillPreloadByActorBlueprintAndSkillId_1.configEntitySkillPreloadByActorBlueprintAndSkillId.Init(),
      EntitySkillPreloadById_1.configEntitySkillPreloadById.Init(),
      EntityVoxelInfoByMapIdAndEntityId_1.configEntityVoxelInfoByMapIdAndEntityId.Init(),
      EntranceIconTagById_1.configEntranceIconTagById.Init(),
      ErrorCodeById_1.configErrorCodeById.Init(),
      ExchangeRewardById_1.configExchangeRewardById.Init(),
      ExchangeSharedById_1.configExchangeSharedById.Init(),
      ExecutionConfById_1.configExecutionConfById.Init(),
      ExploreProgressAll_1.configExploreProgressAll.Init(),
      ExploreProgressByArea_1.configExploreProgressByArea.Init(),
      ExploreProgressById_1.configExploreProgressById.Init(),
      ExploreRewardByCountry_1.configExploreRewardByCountry.Init(),
      ExploreRewardById_1.configExploreRewardById.Init(),
      ExploreRewardDisplayById_1.configExploreRewardDisplayById.Init(),
      ExploreScoreAll_1.configExploreScoreAll.Init(),
      ExploreScoreByArea_1.configExploreScoreByArea.Init(),
      ExploreToolsAll_1.configExploreToolsAll.Init(),
      ExploreToolsByPhantomSkillId_1.configExploreToolsByPhantomSkillId.Init(),
      ExternalSourceSettingById_1.configExternalSourceSettingById.Init(),
      FaceExpressionDataById_1.configFaceExpressionDataById.Init(),
      FavorGoodsByRoleId_1.configFavorGoodsByRoleId.Init(),
      FavorLevelByLevel_1.configFavorLevelByLevel.Init(),
      FavorRoleInfoByRoleId_1.configFavorRoleInfoByRoleId.Init(),
      FavorStoryByRoleId_1.configFavorStoryByRoleId.Init(),
      FavorTabCameraById_1.configFavorTabCameraById.Init(),
      FavorWordByRoleIdAndType_1.configFavorWordByRoleIdAndType.Init(),
      FeedingAnimalById_1.configFeedingAnimalById.Init(),
      FightFormationById_1.configFightFormationById.Init(),
      FilterById_1.configFilterById.Init(),
      FilterRuleById_1.configFilterRuleById.Init(),
      FilterSortGroupById_1.configFilterSortGroupById.Init(),
      FlowById_1.configFlowById.Init(),
      FlowStateByStateKey_1.configFlowStateByStateKey.Init(),
      FlowTemplateDataById_1.configFlowTemplateDataById.Init(),
      FlowTextByIdAndFlowListId_1.configFlowTextByIdAndFlowListId.Init(),
      FlowTextLang_1.configFlowTextLang.Init(),
      FogBlockAll_1.configFogBlockAll.Init(),
      FogBlockByBlock_1.configFogBlockByBlock.Init(),
      FogTextureConfigAll_1.configFogTextureConfigAll.Init(),
      FogTextureConfigByBlock_1.configFogTextureConfigByBlock.Init(),
      FoleySynthBoneConfigById_1.configFoleySynthBoneConfigById.Init(),
      FoleySynthConfigById_1.configFoleySynthConfigById.Init(),
      FoleySynthConfigByIdWithDefaultId_1.configFoleySynthConfigByIdWithDefaultId.Init(),
      ForgeFormulaAll_1.configForgeFormulaAll.Init(),
      ForgeFormulaByFormulaItemId_1.configForgeFormulaByFormulaItemId.Init(),
      ForgeFormulaById_1.configForgeFormulaById.Init(),
      ForgeFormulaByTypeId_1.configForgeFormulaByTypeId.Init(),
      FormationPropertyAll_1.configFormationPropertyAll.Init(),
      FormationPropertyById_1.configFormationPropertyById.Init(),
      FriendFilterAll_1.configFriendFilterAll.Init(),
      FuncMenuWheelAll_1.configFuncMenuWheelAll.Init(),
      FuncMenuWheelByFuncId_1.configFuncMenuWheelByFuncId.Init(),
      FunctionConditionByFunctionId_1.configFunctionConditionByFunctionId.Init(),
      FunctionMenuAll_1.configFunctionMenuAll.Init(),
      FunctionMenuByFunctionId_1.configFunctionMenuByFunctionId.Init(),
      FunctionOpenViewLimitAll_1.configFunctionOpenViewLimitAll.Init(),
      GaChaShareById_1.configGaChaShareById.Init(),
      GachaAll_1.configGachaAll.Init(),
      GachaById_1.configGachaById.Init(),
      GachaEffectConfigByTimesAndQuality_1.configGachaEffectConfigByTimesAndQuality.Init(),
      GachaPoolById_1.configGachaPoolById.Init(),
      GachaSequenceConfigById_1.configGachaSequenceConfigById.Init(),
      GachaTextureInfoById_1.configGachaTextureInfoById.Init(),
      GachaViewInfoById_1.configGachaViewInfoById.Init(),
      GachaViewTypeInfoByType_1.configGachaViewTypeInfoByType.Init(),
      GachaWeaponTransformById_1.configGachaWeaponTransformById.Init(),
      GamePlayInformationGroupById_1.configGamePlayInformationGroupById.Init(),
      GamePlayInformationInfoById_1.configGamePlayInformationInfoById.Init(),
      GamePlayScanByUid_1.configGamePlayScanByUid.Init(),
      GamePlayScanCompositeByUid_1.configGamePlayScanCompositeByUid.Init(),
      GamepadKeyById_1.configGamepadKeyById.Init(),
      GamepadKeyByKeyName_1.configGamepadKeyByKeyName.Init(),
      GameplayCueById_1.configGameplayCueById.Init(),
      GatherActivityAll_1.configGatherActivityAll.Init(),
      GatherActivityById_1.configGatherActivityById.Init(),
      GenderTextByMaleText_1.configGenderTextByMaleText.Init(),
      GeneralActionById_1.configGeneralActionById.Init(),
      GeneralActionGroupById_1.configGeneralActionGroupById.Init(),
      GenericPromptByTipsId_1.configGenericPromptByTipsId.Init(),
      GenericPromptTypesByTypeId_1.configGenericPromptTypesByTypeId.Init(),
      GeographyHandBookAll_1.configGeographyHandBookAll.Init(),
      GeographyHandBookById_1.configGeographyHandBookById.Init(),
      GeographyHandBookByType_1.configGeographyHandBookByType.Init(),
      GeographyTypeAll_1.configGeographyTypeAll.Init(),
      GeographyTypeById_1.configGeographyTypeById.Init(),
      GiftPackageById_1.configGiftPackageById.Init(),
      GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.Init(),
      GmAccountAll_1.configGmAccountAll.Init(),
      GmAccountById_1.configGmAccountById.Init(),
      GmOrderConfigAll_1.configGmOrderConfigAll.Init(),
      GmOrderListAll_1.configGmOrderListAll.Init(),
      GmOrderListById_1.configGmOrderListById.Init(),
      GuideDataById_1.configGuideDataById.Init(),
      GuideFocusNewByGuideId_1.configGuideFocusNewByGuideId.Init(),
      GuideGroupAll_1.configGuideGroupAll.Init(),
      GuideGroupById_1.configGuideGroupById.Init(),
      GuideStepAll_1.configGuideStepAll.Init(),
      GuideStepById_1.configGuideStepById.Init(),
      GuideTipsByGuideId_1.configGuideTipsByGuideId.Init(),
      GuideTutorialAll_1.configGuideTutorialAll.Init(),
      GuideTutorialById_1.configGuideTutorialById.Init(),
      GuideTutorialPageById_1.configGuideTutorialPageById.Init(),
      HandBookEntranceAll_1.configHandBookEntranceAll.Init(),
      HandBookEntranceById_1.configHandBookEntranceById.Init(),
      HandBookQuestTabAll_1.configHandBookQuestTabAll.Init(),
      HandBookQuestTabById_1.configHandBookQuestTabById.Init(),
      HardnessModeById_1.configHardnessModeById.Init(),
      HeadIconById_1.configHeadIconById.Init(),
      HelpTextByGroupId_1.configHelpTextByGroupId.Init(),
      HelpTextById_1.configHelpTextById.Init(),
      HotKeyIconByKeyName_1.configHotKeyIconByKeyName.Init(),
      HotKeyMapById_1.configHotKeyMapById.Init(),
      HotKeyTextByTextId_1.configHotKeyTextByTextId.Init(),
      HotKeyTypeById_1.configHotKeyTypeById.Init(),
      HotKeyViewById_1.configHotKeyViewById.Init(),
      HotPatchTextLang_1.configHotPatchTextLang.Init(),
      InfluenceAll_1.configInfluenceAll.Init(),
      InfluenceById_1.configInfluenceById.Init(),
      InfoDisplayById_1.configInfoDisplayById.Init(),
      InstanceDungeonAll_1.configInstanceDungeonAll.Init(),
      InstanceDungeonById_1.configInstanceDungeonById.Init(),
      InstanceDungeonEntranceAll_1.configInstanceDungeonEntranceAll.Init(),
      InstanceDungeonEntranceById_1.configInstanceDungeonEntranceById.Init(),
      InstanceDungeonEntranceByMarkId_1.configInstanceDungeonEntranceByMarkId.Init(),
      InstanceDungeonTitleById_1.configInstanceDungeonTitleById.Init(),
      InstanceEnterControlById_1.configInstanceEnterControlById.Init(),
      InstanceTrialRoleConfigById_1.configInstanceTrialRoleConfigById.Init(),
      InteractAudioMaterialByCollisionMaterial_1.configInteractAudioMaterialByCollisionMaterial.Init(),
      InteractBackGroundById_1.configInteractBackGroundById.Init(),
      InteractBackGroundByViewName_1.configInteractBackGroundByViewName.Init(),
      InteractDataByGuid_1.configInteractDataByGuid.Init(),
      InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.Init(),
      ItemExchangeContentAll_1.configItemExchangeContentAll.Init(),
      ItemExchangeContentByItemId_1.configItemExchangeContentByItemId.Init(),
      ItemExchangeLimitByItemId_1.configItemExchangeLimitByItemId.Init(),
      ItemHandBookAll_1.configItemHandBookAll.Init(),
      ItemHandBookById_1.configItemHandBookById.Init(),
      ItemHandBookByType_1.configItemHandBookByType.Init(),
      ItemHandBookTypeAll_1.configItemHandBookTypeAll.Init(),
      ItemHandBookTypeById_1.configItemHandBookTypeById.Init(),
      ItemIconTagById_1.configItemIconTagById.Init(),
      ItemInfoAll_1.configItemInfoAll.Init(),
      ItemInfoById_1.configItemInfoById.Init(),
      ItemInfoByItemType_1.configItemInfoByItemType.Init(),
      ItemMainTypeAll_1.configItemMainTypeAll.Init(),
      ItemMainTypeById_1.configItemMainTypeById.Init(),
      ItemShowTypeById_1.configItemShowTypeById.Init(),
      KeySettingAll_1.configKeySettingAll.Init(),
      KeySettingById_1.configKeySettingById.Init(),
      KeySettingByTypeId_1.configKeySettingByTypeId.Init(),
      KeySettingByTypeIdAndInputControllerType_1.configKeySettingByTypeIdAndInputControllerType.Init(),
      KeyTypeAll_1.configKeyTypeAll.Init(),
      KeyTypeByTypeId_1.configKeyTypeByTypeId.Init(),
      KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.Init(),
      LangOfLogoByName_1.configLangOfLogoByName.Init(),
      LanguageDefineByLanguageCode_1.configLanguageDefineByLanguageCode.Init(),
      LanguageDefineByLanguageType_1.configLanguageDefineByLanguageType.Init(),
      LevelEntityConfigByBlueprintType_1.configLevelEntityConfigByBlueprintType.Init(),
      LevelEntityConfigByMapIdAndEntityId_1.configLevelEntityConfigByMapIdAndEntityId.Init(),
      LevelPlayDataById_1.configLevelPlayDataById.Init(),
      LevelPlayNodeDataByKey_1.configLevelPlayNodeDataByKey.Init(),
      LivenessAll_1.configLivenessAll.Init(),
      LivenessById_1.configLivenessById.Init(),
      LivenessTaskByTaskId_1.configLivenessTaskByTaskId.Init(),
      LoadingLevelAreaAll_1.configLoadingLevelAreaAll.Init(),
      LoadingTipsTextAll_1.configLoadingTipsTextAll.Init(),
      LoadingTipsTextById_1.configLoadingTipsTextById.Init(),
      LoadingTipsTextByLevelAreaId_1.configLoadingTipsTextByLevelAreaId.Init(),
      LockOnConfigById_1.configLockOnConfigById.Init(),
      LongPressConfigById_1.configLongPressConfigById.Init(),
      LongShanStageAll_1.configLongShanStageAll.Init(),
      LongShanStageById_1.configLongShanStageById.Init(),
      LongShanTaskById_1.configLongShanTaskById.Init(),
      LordGymAll_1.configLordGymAll.Init(),
      LordGymByDifficulty_1.configLordGymByDifficulty.Init(),
      LordGymById_1.configLordGymById.Init(),
      LordGymEntranceAll_1.configLordGymEntranceAll.Init(),
      LordGymEntranceById_1.configLordGymEntranceById.Init(),
      LordGymEntranceByMarkId_1.configLordGymEntranceByMarkId.Init(),
      LordGymFilterTypeAll_1.configLordGymFilterTypeAll.Init(),
      LordGymFilterTypeById_1.configLordGymFilterTypeById.Init(),
      MailFilterAll_1.configMailFilterAll.Init(),
      MailFilterById_1.configMailFilterById.Init(),
      MainRoleConfigAll_1.configMainRoleConfigAll.Init(),
      MainRoleConfigByGender_1.configMainRoleConfigByGender.Init(),
      MainRoleConfigById_1.configMainRoleConfigById.Init(),
      MainTypeAll_1.configMainTypeAll.Init(),
      MainTypeById_1.configMainTypeById.Init(),
      MapAudioById_1.configMapAudioById.Init(),
      MapBorderAll_1.configMapBorderAll.Init(),
      MapBorderByBorderId_1.configMapBorderByBorderId.Init(),
      MapMarkByEntityConfigId_1.configMapMarkByEntityConfigId.Init(),
      MapMarkByMapId_1.configMapMarkByMapId.Init(),
      MapMarkByMarkId_1.configMapMarkByMarkId.Init(),
      MapMarkByRelativeMainSubType_1.configMapMarkByRelativeMainSubType.Init(),
      MapMarkHasEntityConfigId_1.configMapMarkHasEntityConfigId.Init(),
      MapMarkPhantomGroupByMarkId_1.configMapMarkPhantomGroupByMarkId.Init(),
      MapMarkRelativeSubTypeAll_1.configMapMarkRelativeSubTypeAll.Init(),
      MapMarkRelativeSubTypeByFunctionId_1.configMapMarkRelativeSubTypeByFunctionId.Init(),
      MapMarkRelativeSubTypeById_1.configMapMarkRelativeSubTypeById.Init(),
      MapNoteById_1.configMapNoteById.Init(),
      MappingBySheetNameAndFieldName_1.configMappingBySheetNameAndFieldName.Init(),
      MappingBySheetNameFieldNameAndValue_1.configMappingBySheetNameFieldNameAndValue.Init(),
      MarkEffectByMarkId_1.configMarkEffectByMarkId.Init(),
      MenuConfigAll_1.configMenuConfigAll.Init(),
      MenuConfigByFunctionId_1.configMenuConfigByFunctionId.Init(),
      MobileBattleUiSetAll_1.configMobileBattleUiSetAll.Init(),
      MobileBattleUiSetByPanelIndex_1.configMobileBattleUiSetByPanelIndex.Init(),
      ModelConfigPreloadById_1.configModelConfigPreloadById.Init(),
      MonitorActionById_1.configMonitorActionById.Init(),
      MonsterBattleConfById_1.configMonsterBattleConfById.Init(),
      MonsterBodyTypeConfigById_1.configMonsterBodyTypeConfigById.Init(),
      MonsterDetectionAll_1.configMonsterDetectionAll.Init(),
      MonsterDetectionById_1.configMonsterDetectionById.Init(),
      MonsterDetectionFilterAll_1.configMonsterDetectionFilterAll.Init(),
      MonsterDisplayById_1.configMonsterDisplayById.Init(),
      MonsterDisplayLang_1.configMonsterDisplayLang.Init(),
      MonsterHandBookAll_1.configMonsterHandBookAll.Init(),
      MonsterHandBookById_1.configMonsterHandBookById.Init(),
      MonsterHandBookByType_1.configMonsterHandBookByType.Init(),
      MonsterHandBookTypeAll_1.configMonsterHandBookTypeAll.Init(),
      MonsterIconTagById_1.configMonsterIconTagById.Init(),
      MonsterInfoById_1.configMonsterInfoById.Init(),
      MonsterPerchById_1.configMonsterPerchById.Init(),
      MonsterPropertyGrowthById_1.configMonsterPropertyGrowthById.Init(),
      MonsterRarityById_1.configMonsterRarityById.Init(),
      MonsterSizeIdById_1.configMonsterSizeIdById.Init(),
      MontageDataById_1.configMontageDataById.Init(),
      MonthCardContentById_1.configMonthCardContentById.Init(),
      MotionById_1.configMotionById.Init(),
      MotionByRoleId_1.configMotionByRoleId.Init(),
      MotionByRoleIdAndType_1.configMotionByRoleIdAndType.Init(),
      MultiMapAll_1.configMultiMapAll.Init(),
      MultiMapByGroupId_1.configMultiMapByGroupId.Init(),
      MultiMapById_1.configMultiMapById.Init(),
      MultiMapAreaConfigAll_1.configMultiMapAreaConfigAll.Init(),
      MultiMapAreaConfigByBlock_1.configMultiMapAreaConfigByBlock.Init(),
      MultiTextLang_1.configMultiTextLang.Init(),
      NewOccupationConfigAll_1.configNewOccupationConfigAll.Init(),
      NewOccupationConfigById_1.configNewOccupationConfigById.Init(),
      NewbieCourseAll_1.configNewbieCourseAll.Init(),
      NewbieCourseById_1.configNewbieCourseById.Init(),
      NpcHeadInfoById_1.configNpcHeadInfoById.Init(),
      NpcSystemBackgroundById_1.configNpcSystemBackgroundById.Init(),
      NpcSystemBackgroundByViewName_1.configNpcSystemBackgroundByViewName.Init(),
      OccupationConfigById_1.configOccupationConfigById.Init(),
      OccupationConfigLang_1.configOccupationConfigLang.Init(),
      OverlayAbpMontageDataById_1.configOverlayAbpMontageDataById.Init(),
      PackageCapacityAll_1.configPackageCapacityAll.Init(),
      PackageCapacityByPackageId_1.configPackageCapacityByPackageId.Init(),
      ParkourChallengeById_1.configParkourChallengeById.Init(),
      ParkourChallengeByMarkId_1.configParkourChallengeByMarkId.Init(),
      PassiveSkillById_1.configPassiveSkillById.Init(),
      PayById_1.configPayById.Init(),
      PayByPayIdAndRegion_1.configPayByPayIdAndRegion.Init(),
      PayByRegion_1.configPayByRegion.Init(),
      PayItemAll_1.configPayItemAll.Init(),
      PayItemById_1.configPayItemById.Init(),
      PayShopAll_1.configPayShopAll.Init(),
      PayShopById_1.configPayShopById.Init(),
      PayShopConditionById_1.configPayShopConditionById.Init(),
      PayShopDirectGoodsByGoodsId_1.configPayShopDirectGoodsByGoodsId.Init(),
      PayShopGoodsById_1.configPayShopGoodsById.Init(),
      PayShopGoodsByItemId_1.configPayShopGoodsByItemId.Init(),
      PayShopTabByShopId_1.configPayShopTabByShopId.Init(),
      PayShopTabByShopIdAndTabId_1.configPayShopTabByShopIdAndTabId.Init(),
      PcKeyById_1.configPcKeyById.Init(),
      PcKeyByKeyName_1.configPcKeyByKeyName.Init(),
      PersonalTipsByFunctionId_1.configPersonalTipsByFunctionId.Init(),
      PersonalTipsById_1.configPersonalTipsById.Init(),
      PhantomCollectActivityById_1.configPhantomCollectActivityById.Init(),
      PhantomCollectTaskDescById_1.configPhantomCollectTaskDescById.Init(),
      PhantomCustomizeItemByItemId_1.configPhantomCustomizeItemByItemId.Init(),
      PhantomExpItemAll_1.configPhantomExpItemAll.Init(),
      PhantomExpItemByItemId_1.configPhantomExpItemByItemId.Init(),
      PhantomFetterAll_1.configPhantomFetterAll.Init(),
      PhantomFetterById_1.configPhantomFetterById.Init(),
      PhantomFetterGroupAll_1.configPhantomFetterGroupAll.Init(),
      PhantomFetterGroupById_1.configPhantomFetterGroupById.Init(),
      PhantomFetterHandBookAll_1.configPhantomFetterHandBookAll.Init(),
      PhantomGrowthByGrowthIdAndLevel_1.configPhantomGrowthByGrowthIdAndLevel.Init(),
      PhantomHandBookAll_1.configPhantomHandBookAll.Init(),
      PhantomHandBookById_1.configPhantomHandBookById.Init(),
      PhantomHandBookPageAll_1.configPhantomHandBookPageAll.Init(),
      PhantomItemAll_1.configPhantomItemAll.Init(),
      PhantomItemByItemId_1.configPhantomItemByItemId.Init(),
      PhantomItemByMonsterId_1.configPhantomItemByMonsterId.Init(),
      PhantomLevelByGroupId_1.configPhantomLevelByGroupId.Init(),
      PhantomLevelByGroupIdAndLevel_1.configPhantomLevelByGroupIdAndLevel.Init(),
      PhantomMainPropItemById_1.configPhantomMainPropItemById.Init(),
      PhantomMainPropertyById_1.configPhantomMainPropertyById.Init(),
      PhantomQualityByQuality_1.configPhantomQualityByQuality.Init(),
      PhantomRarityByRare_1.configPhantomRarityByRare.Init(),
      PhantomSkillById_1.configPhantomSkillById.Init(),
      PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId.Init(),
      PhantomSubPropertyById_1.configPhantomSubPropertyById.Init(),
      PhantomSubPropertyByPropId_1.configPhantomSubPropertyByPropId.Init(),
      PhantomWildItemAll_1.configPhantomWildItemAll.Init(),
      PhantomWildItemByItemId_1.configPhantomWildItemByItemId.Init(),
      PhotoMemoryActivityById_1.configPhotoMemoryActivityById.Init(),
      PhotoMemoryCollectById_1.configPhotoMemoryCollectById.Init(),
      PhotoMemoryCollectByTopicID_1.configPhotoMemoryCollectByTopicID.Init(),
      PhotoMemoryTopicAll_1.configPhotoMemoryTopicAll.Init(),
      PhotoMemoryTopicById_1.configPhotoMemoryTopicById.Init(),
      PhotoMontageById_1.configPhotoMontageById.Init(),
      PhotoMontageByRoleId_1.configPhotoMontageByRoleId.Init(),
      PhotoSetupAll_1.configPhotoSetupAll.Init(),
      PhotoSetupByValueType_1.configPhotoSetupByValueType.Init(),
      PhotographHandBookAll_1.configPhotographHandBookAll.Init(),
      PhotographHandBookById_1.configPhotographHandBookById.Init(),
      PhotographHandBookByType_1.configPhotographHandBookByType.Init(),
      PhysicsAssetConfigById_1.configPhysicsAssetConfigById.Init(),
      PhysicsAssetConfigByIdWithDefaultId_1.configPhysicsAssetConfigByIdWithDefaultId.Init(),
      PlatformIconById_1.configPlatformIconById.Init(),
      PlayerExpByPlayerLevel_1.configPlayerExpByPlayerLevel.Init(),
      PlayerExpByPlayerLevelArea_1.configPlayerExpByPlayerLevelArea.Init(),
      PlayerStateRestrictionById_1.configPlayerStateRestrictionById.Init(),
      PlotAudioById_1.configPlotAudioById.Init(),
      PlotHandBookConfigAll_1.configPlotHandBookConfigAll.Init(),
      PlotHandBookConfigByQuestId_1.configPlotHandBookConfigByQuestId.Init(),
      PlotTypeAll_1.configPlotTypeAll.Init(),
      PlotTypeById_1.configPlotTypeById.Init(),
      PrefabConfigById_1.configPrefabConfigById.Init(),
      PrefabTextItemAll_1.configPrefabTextItemAll.Init(),
      PrefabTextItemByItemId_1.configPrefabTextItemByItemId.Init(),
      PrefabTextItemByPrefabPathHash_1.configPrefabTextItemByPrefabPathHash.Init(),
      PreviewItemAll_1.configPreviewItemAll.Init(),
      PreviewItemById_1.configPreviewItemById.Init(),
      PropRewardConfById_1.configPropRewardConfById.Init(),
      PropertyIndexAll_1.configPropertyIndexAll.Init(),
      PropertyIndexById_1.configPropertyIndexById.Init(),
      ProtocolMonitoringByAll_1.configProtocolMonitoringByAll.Init(),
      QualityIconTagById_1.configQualityIconTagById.Init(),
      QualityInfoAll_1.configQualityInfoAll.Init(),
      QualityInfoById_1.configQualityInfoById.Init(),
      QuestById_1.configQuestById.Init(),
      QuestChapterById_1.configQuestChapterById.Init(),
      QuestDataById_1.configQuestDataById.Init(),
      QuestMainTypeById_1.configQuestMainTypeById.Init(),
      QuestNodeDataByKey_1.configQuestNodeDataByKey.Init(),
      QuestTypeAll_1.configQuestTypeAll.Init(),
      QuestTypeById_1.configQuestTypeById.Init(),
      QuestTypeByMainId_1.configQuestTypeByMainId.Init(),
      QuickChatAll_1.configQuickChatAll.Init(),
      RecordConfigById_1.configRecordConfigById.Init(),
      RedDotByRelativeName_1.configRedDotByRelativeName.Init(),
      ReportPlayerInfoAll_1.configReportPlayerInfoAll.Init(),
      ResonantChainByGroupId_1.configResonantChainByGroupId.Init(),
      ResonantChainByGroupIdAndGroupIndex_1.configResonantChainByGroupIdAndGroupIndex.Init(),
      ResonantChainByGroupIdAndNodeType_1.configResonantChainByGroupIdAndNodeType.Init(),
      ResonantChainById_1.configResonantChainById.Init(),
      ReviveById_1.configReviveById.Init(),
      RewardViewFromSourceAll_1.configRewardViewFromSourceAll.Init(),
      RewardViewFromSourceBySourceId_1.configRewardViewFromSourceBySourceId.Init(),
      RogueActivityById_1.configRogueActivityById.Init(),
      RogueAffixById_1.configRogueAffixById.Init(),
      RogueBuffPoolById_1.configRogueBuffPoolById.Init(),
      RogueCharacterById_1.configRogueCharacterById.Init(),
      RogueCharacterBuffById_1.configRogueCharacterBuffById.Init(),
      RogueCurrencyById_1.configRogueCurrencyById.Init(),
      RogueEffectById_1.configRogueEffectById.Init(),
      RogueEventById_1.configRogueEventById.Init(),
      RogueParamById_1.configRogueParamById.Init(),
      RoguePokemonById_1.configRoguePokemonById.Init(),
      RoguePopularEntrieArgAll_1.configRoguePopularEntrieArgAll.Init(),
      RoguePopularEntrieArgById_1.configRoguePopularEntrieArgById.Init(),
      RoguePopularEntrieArgBySeasonIdAndInstId_1.configRoguePopularEntrieArgBySeasonIdAndInstId.Init(),
      RogueQualityConfigById_1.configRogueQualityConfigById.Init(),
      RogueRoomTypeById_1.configRogueRoomTypeById.Init(),
      RogueSeasonAll_1.configRogueSeasonAll.Init(),
      RogueSeasonById_1.configRogueSeasonById.Init(),
      RogueSeasonRewardBySeasonId_1.configRogueSeasonRewardBySeasonId.Init(),
      RogueTalentTreeAll_1.configRogueTalentTreeAll.Init(),
      RogueTalentTreeById_1.configRogueTalentTreeById.Init(),
      RogueTalentTreeDescById_1.configRogueTalentTreeDescById.Init(),
      RogueTokenBySeasonId_1.configRogueTokenBySeasonId.Init(),
      RoleAnimAudioByRoleId_1.configRoleAnimAudioByRoleId.Init(),
      RoleAudioById_1.configRoleAudioById.Init(),
      RoleBattleViewInfoAll_1.configRoleBattleViewInfoAll.Init(),
      RoleBattleViewInfoById_1.configRoleBattleViewInfoById.Init(),
      RoleBreachByBreachGroupId_1.configRoleBreachByBreachGroupId.Init(),
      RoleBreachByBreachGroupIdAndBreachLevel_1.configRoleBreachByBreachGroupIdAndBreachLevel.Init(),
      RoleDescriptionById_1.configRoleDescriptionById.Init(),
      RoleExpItemAll_1.configRoleExpItemAll.Init(),
      RoleExpItemById_1.configRoleExpItemById.Init(),
      RoleGuideActivityById_1.configRoleGuideActivityById.Init(),
      RoleIconTagById_1.configRoleIconTagById.Init(),
      RoleInfluenceAll_1.configRoleInfluenceAll.Init(),
      RoleInfluenceById_1.configRoleInfluenceById.Init(),
      RoleInfoAll_1.configRoleInfoAll.Init(),
      RoleInfoById_1.configRoleInfoById.Init(),
      RoleInfoByRoleType_1.configRoleInfoByRoleType.Init(),
      RoleLevelConsumeByConsumeGroupIdAndLevel_1.configRoleLevelConsumeByConsumeGroupIdAndLevel.Init(),
      RolePropertyGrowthByLevelAndBreachLevel_1.configRolePropertyGrowthByLevelAndBreachLevel.Init(),
      RoleQualityInfoById_1.configRoleQualityInfoById.Init(),
      RoleQuestById_1.configRoleQuestById.Init(),
      RoleQuestByRoleId_1.configRoleQuestByRoleId.Init(),
      RoleQuestByRoleIdAll_1.configRoleQuestByRoleIdAll.Init(),
      RoleSkillInputById_1.configRoleSkillInputById.Init(),
      RoleTagAll_1.configRoleTagAll.Init(),
      RoleTagById_1.configRoleTagById.Init(),
      RoleTrainingDegreeByDifficultyLevel_1.configRoleTrainingDegreeByDifficultyLevel.Init(),
      RoleTrialActivityById_1.configRoleTrialActivityById.Init(),
      RoleTrialInfoById_1.configRoleTrialInfoById.Init(),
      RougeMiraclecreationById_1.configRougeMiraclecreationById.Init(),
      RougePopularEntrieAll_1.configRougePopularEntrieAll.Init(),
      RougePopularEntrieById_1.configRougePopularEntrieById.Init(),
      ScoreRewardById_1.configScoreRewardById.Init(),
      SecondaryGuideDataById_1.configSecondaryGuideDataById.Init(),
      SetAccountAll_1.configSetAccountAll.Init(),
      SetAccountById_1.configSetAccountById.Init(),
      SharePlatformAll_1.configSharePlatformAll.Init(),
      SharePlatformById_1.configSharePlatformById.Init(),
      ShareRewardById_1.configShareRewardById.Init(),
      ShieldById_1.configShieldById.Init(),
      ShopFixedByShopId_1.configShopFixedByShopId.Init(),
      ShopFixedByShopIdAndId_1.configShopFixedByShopIdAndId.Init(),
      ShopInfoById_1.configShopInfoById.Init(),
      SignalDecodeGamePlayById_1.configSignalDecodeGamePlayById.Init(),
      SignalDecodeTabColorById_1.configSignalDecodeTabColorById.Init(),
      SignalDecodeWaveformById_1.configSignalDecodeWaveformById.Init(),
      SilentAreaDetectionAll_1.configSilentAreaDetectionAll.Init(),
      SilentAreaDetectionById_1.configSilentAreaDetectionById.Init(),
      SkillById_1.configSkillById.Init(),
      SkillBySkillGroupId_1.configSkillBySkillGroupId.Init(),
      SkillButtonByRoleId_1.configSkillButtonByRoleId.Init(),
      SkillButtonEffectById_1.configSkillButtonEffectById.Init(),
      SkillButtonIndexById_1.configSkillButtonIndexById.Init(),
      SkillButtonTextAll_1.configSkillButtonTextAll.Init(),
      SkillButtonTextById_1.configSkillButtonTextById.Init(),
      SkillCommonButtonAll_1.configSkillCommonButtonAll.Init(),
      SkillConditionById_1.configSkillConditionById.Init(),
      SkillDescriptionById_1.configSkillDescriptionById.Init(),
      SkillDescriptionBySkillLevelGroupId_1.configSkillDescriptionBySkillLevelGroupId.Init(),
      SkillIconByTag_1.configSkillIconByTag.Init(),
      SkillInputById_1.configSkillInputById.Init(),
      SkillLevelBySkillLevelGroupId_1.configSkillLevelBySkillLevelGroupId.Init(),
      SkillLevelBySkillLevelGroupIdAndSkillId_1.configSkillLevelBySkillLevelGroupIdAndSkillId.Init(),
      SkillTagById_1.configSkillTagById.Init(),
      SkillTreeById_1.configSkillTreeById.Init(),
      SkillTreeByNodeGroup_1.configSkillTreeByNodeGroup.Init(),
      SkillTreeByNodeGroupAndNodeIndex_1.configSkillTreeByNodeGroupAndNodeIndex.Init(),
      SkillTreeByNodeIndex_1.configSkillTreeByNodeIndex.Init(),
      SkillTypeById_1.configSkillTypeById.Init(),
      SkyboxById_1.configSkyboxById.Init(),
      SlideById_1.configSlideById.Init(),
      SortById_1.configSortById.Init(),
      SortRuleByIdAndDataId_1.configSortRuleByIdAndDataId.Init(),
      SoundAreaPlayInfoAll_1.configSoundAreaPlayInfoAll.Init(),
      SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.Init(),
      SoundBoxMarkByMarkId_1.configSoundBoxMarkByMarkId.Init(),
      SpeakerById_1.configSpeakerById.Init(),
      SpeakerLang_1.configSpeakerLang.Init(),
      SpecialHateAndSenseById_1.configSpecialHateAndSenseById.Init(),
      SpecialItemById_1.configSpecialItemById.Init(),
      StateMachinePreloadByFsmKey_1.configStateMachinePreloadByFsmKey.Init(),
      StateMachinePreloadById_1.configStateMachinePreloadById.Init(),
      SubtitleTextByRowNameAndDatatableName_1.configSubtitleTextByRowNameAndDatatableName.Init(),
      SubtitleTextLang_1.configSubtitleTextLang.Init(),
      SummonCfgById_1.configSummonCfgById.Init(),
      SwimById_1.configSwimById.Init(),
      SwimBuffById_1.configSwimBuffById.Init(),
      SynthesisFormulaByFormulaItemId_1.configSynthesisFormulaByFormulaItemId.Init(),
      SynthesisFormulaByFormulaType_1.configSynthesisFormulaByFormulaType.Init(),
      SynthesisFormulaById_1.configSynthesisFormulaById.Init(),
      SynthesisLevelAll_1.configSynthesisLevelAll.Init(),
      TakeWeedsDifficultyById_1.configTakeWeedsDifficultyById.Init(),
      TalkOptionIconById_1.configTalkOptionIconById.Init(),
      TaskMarkByMarkId_1.configTaskMarkByMarkId.Init(),
      TeamConfigById_1.configTeamConfigById.Init(),
      TeleporterById_1.configTeleporterById.Init(),
      TemplateConfigAll_1.configTemplateConfigAll.Init(),
      TemplateConfigByBlueprintType_1.configTemplateConfigByBlueprintType.Init(),
      TemplateConfigById_1.configTemplateConfigById.Init(),
      TemporaryTeleportMarkByMarkId_1.configTemporaryTeleportMarkByMarkId.Init(),
      TextById_1.configTextById.Init(),
      TidTextByTextKey_1.configTidTextByTextKey.Init(),
      TidTextLang_1.configTidTextLang.Init(),
      TimeOfDayById_1.configTimeOfDayById.Init(),
      TimePointRewardActivityByActivityId_1.configTimePointRewardActivityByActivityId.Init(),
      TimePointRewardActivityById_1.configTimePointRewardActivityById.Init(),
      TimePointRewardConfigByActivityId_1.configTimePointRewardConfigByActivityId.Init(),
      ToughCalcRatioById_1.configToughCalcRatioById.Init(),
      TowerBuffById_1.configTowerBuffById.Init(),
      TowerConfigAll_1.configTowerConfigAll.Init(),
      TowerConfigById_1.configTowerConfigById.Init(),
      TowerConfigBySeason_1.configTowerConfigBySeason.Init(),
      TowerDifficultyByDifficulty_1.configTowerDifficultyByDifficulty.Init(),
      TowerGuideById_1.configTowerGuideById.Init(),
      TowerTargetById_1.configTowerTargetById.Init(),
      TrailPhantomPropById_1.configTrailPhantomPropById.Init(),
      TreasureBoxDetectorMarkByMarkId_1.configTreasureBoxDetectorMarkByMarkId.Init(),
      TreasureBoxMarkByMarkId_1.configTreasureBoxMarkByMarkId.Init(),
      TrialPhantomPropItemById_1.configTrialPhantomPropItemById.Init(),
      TrialRoleInfoAll_1.configTrialRoleInfoAll.Init(),
      TrialRoleInfoByGroupId_1.configTrialRoleInfoByGroupId.Init(),
      TrialRoleInfoById_1.configTrialRoleInfoById.Init(),
      TrialWeaponInfoById_1.configTrialWeaponInfoById.Init(),
      TurntableActivityByActivityId_1.configTurntableActivityByActivityId.Init(),
      TurntableAwardsByActivityId_1.configTurntableAwardsByActivityId.Init(),
      TurntableAwardsById_1.configTurntableAwardsById.Init(),
      TurntableInfoById_1.configTurntableInfoById.Init(),
      TypeInfoById_1.configTypeInfoById.Init(),
      UiCameraMappingAll_1.configUiCameraMappingAll.Init(),
      UiCameraMappingById_1.configUiCameraMappingById.Init(),
      UiCameraMappingByViewName_1.configUiCameraMappingByViewName.Init(),
      UiDynamicTabByChildViewName_1.configUiDynamicTabByChildViewName.Init(),
      UiDynamicTabById_1.configUiDynamicTabById.Init(),
      UiDynamicTabByParentViewName_1.configUiDynamicTabByParentViewName.Init(),
      UiFloatConfigByViewName_1.configUiFloatConfigByViewName.Init(),
      UiFloatConfigByViewNameIfNull_1.configUiFloatConfigByViewNameIfNull.Init(),
      UiNormalConfigByViewName_1.configUiNormalConfigByViewName.Init(),
      UiNormalConfigByViewNameIfNull_1.configUiNormalConfigByViewNameIfNull.Init(),
      UiPlayItemById_1.configUiPlayItemById.Init(),
      UiResourceById_1.configUiResourceById.Init(),
      UiShowByViewName_1.configUiShowByViewName.Init(),
      UiWeaponVisibleConfigById_1.configUiWeaponVisibleConfigById.Init(),
      UniversalActivityById_1.configUniversalActivityById.Init(),
      VideoCaptionByCgName_1.configVideoCaptionByCgName.Init(),
      VideoDataByCgNameAndGirlOrBoy_1.configVideoDataByCgNameAndGirlOrBoy.Init(),
      VideoSoundByCgNameAndGirlOrBoy_1.configVideoSoundByCgNameAndGirlOrBoy.Init(),
      WeaponBreachByBreachId_1.configWeaponBreachByBreachId.Init(),
      WeaponBreachByBreachIdAndLevel_1.configWeaponBreachByBreachIdAndLevel.Init(),
      WeaponConfByItemId_1.configWeaponConfByItemId.Init(),
      WeaponExpItemById_1.configWeaponExpItemById.Init(),
      WeaponHandBookAll_1.configWeaponHandBookAll.Init(),
      WeaponHandBookById_1.configWeaponHandBookById.Init(),
      WeaponHideConfigById_1.configWeaponHideConfigById.Init(),
      WeaponHideConfigByIdWithZero_1.configWeaponHideConfigByIdWithZero.Init(),
      WeaponLevelByLevelId_1.configWeaponLevelByLevelId.Init(),
      WeaponLevelByLevelIdAndLevel_1.configWeaponLevelByLevelIdAndLevel.Init(),
      WeaponModelTransformById_1.configWeaponModelTransformById.Init(),
      WeaponPropertyGrowthByCurveIdLevelAndBreachLevel_1.configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel.Init(),
      WeaponQualityInfoById_1.configWeaponQualityInfoById.Init(),
      WeaponResonByResonIdAndLevel_1.configWeaponResonByResonIdAndLevel.Init(),
      WeaponVisibleConfigById_1.configWeaponVisibleConfigById.Init(),
      WeaponVisibleConfigByIdWithZero_1.configWeaponVisibleConfigByIdWithZero.Init(),
      WeatherById_1.configWeatherById.Init(),
      WorldLevelById_1.configWorldLevelById.Init(),
      WorldNewJourneyAll_1.configWorldNewJourneyAll.Init(),
      WorldNewJourneyById_1.configWorldNewJourneyById.Init();
  }
}
exports.ConfigStatement = ConfigStatement;
// # sourceMappingURL=ConfigStatement.js.map
