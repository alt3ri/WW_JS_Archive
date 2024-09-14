"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configNewbieCourseById =
    exports.configNewbieCourseAll =
    exports.configMultiTextLang =
    exports.configMultiMapById =
    exports.configMultiMapByGroupId =
    exports.configMultiMapAreaConfigByBlock =
    exports.configMultiMapAreaConfigAll =
    exports.configMultiMapAll =
    exports.configMotionByRoleIdAndType =
    exports.configMotionByRoleId =
    exports.configMotionById =
    exports.configMonthCardContentById =
    exports.configMontageDataById =
    exports.configMonsterSizeIdById =
    exports.configMonsterRarityById =
    exports.configMonsterPropertyGrowthById =
    exports.configMonsterPerchById =
    exports.configMonsterInfoById =
    exports.configMonsterIconTagById =
    exports.configMonsterHandBookTypeAll =
    exports.configMonsterHandBookByType =
    exports.configMonsterHandBookById =
    exports.configMonsterHandBookAll =
    exports.configMonsterDisplayLang =
    exports.configMonsterDisplayById =
    exports.configMonsterDetectionFilterAll =
    exports.configMonsterDetectionById =
    exports.configMonsterDetectionAll =
    exports.configMonsterBodyTypeConfigById =
    exports.configMonsterBattleConfById =
    exports.configModelConfigPreloadById =
    exports.configMobileBattleUiSetByPanelIndex =
    exports.configMobileBattleUiSetAll =
    exports.configMenuConfigByFunctionId =
    exports.configMenuConfigAll =
    exports.configMarkEffectByMarkId =
    exports.configMappingBySheetNameFieldNameAndValue =
    exports.configMappingBySheetNameAndFieldName =
    exports.configMapNoteById =
    exports.configMapMarkRelativeSubTypeById =
    exports.configMapMarkRelativeSubTypeByFunctionId =
    exports.configMapMarkRelativeSubTypeAll =
    exports.configMapMarkPhantomGroupByMarkId =
    exports.configMapMarkHasEntityConfigId =
    exports.configMapMarkByRelativeMainSubType =
    exports.configMapMarkByMarkId =
    exports.configMapMarkByMapId =
    exports.configMapMarkByEntityConfigId =
    exports.configMapBorderByBorderId =
    exports.configMapBorderAll =
      void 0),
  (exports.configPhantomMainPropertyById =
    exports.configPhantomLevelByGroupIdAndLevel =
    exports.configPhantomLevelByGroupId =
    exports.configPhantomItemByMonsterId =
    exports.configPhantomItemByItemId =
    exports.configPhantomItemAll =
    exports.configPhantomHandBookPageAll =
    exports.configPhantomHandBookById =
    exports.configPhantomHandBookAll =
    exports.configPhantomGrowthByGrowthIdAndLevel =
    exports.configPhantomFetterHandBookAll =
    exports.configPhantomFetterGroupById =
    exports.configPhantomFetterGroupAll =
    exports.configPhantomFetterById =
    exports.configPhantomFetterAll =
    exports.configPhantomExpItemByItemId =
    exports.configPhantomExpItemAll =
    exports.configPhantomCustomizeItemByItemId =
    exports.configPhantomCollectTaskDescById =
    exports.configPhantomCollectActivityById =
    exports.configPersonalTipsById =
    exports.configPersonalTipsByFunctionId =
    exports.configPcKeyByKeyName =
    exports.configPcKeyById =
    exports.configPayShopTabByShopIdAndTabId =
    exports.configPayShopTabByShopId =
    exports.configPayShopGoodsByItemId =
    exports.configPayShopGoodsById =
    exports.configPayShopDirectGoodsByGoodsId =
    exports.configPayShopConditionById =
    exports.configPayShopById =
    exports.configPayShopAll =
    exports.configPayItemById =
    exports.configPayItemAll =
    exports.configPayByRegion =
    exports.configPayByPayIdAndRegion =
    exports.configPayById =
    exports.configPassiveSkillById =
    exports.configParkourChallengeByMarkId =
    exports.configParkourChallengeById =
    exports.configPackageCapacityByPackageId =
    exports.configPackageCapacityAll =
    exports.configOverlayAbpMontageDataById =
    exports.configOccupationConfigLang =
    exports.configOccupationConfigById =
    exports.configNpcSystemBackgroundByViewName =
    exports.configNpcSystemBackgroundById =
    exports.configNpcHeadInfoById =
    exports.configNewOccupationConfigById =
    exports.configNewOccupationConfigAll =
      void 0),
  (exports.configQuestTypeAll =
    exports.configQuestNodeDataByKey =
    exports.configQuestMainTypeById =
    exports.configQuestDataById =
    exports.configQuestChapterById =
    exports.configQuestById =
    exports.configQualityInfoById =
    exports.configQualityInfoAll =
    exports.configQualityIconTagById =
    exports.configPropRewardConfById =
    exports.configPropertyIndexById =
    exports.configPropertyIndexAll =
    exports.configPreviewItemById =
    exports.configPreviewItemAll =
    exports.configPrefabTextItemByPrefabPathHash =
    exports.configPrefabTextItemByItemId =
    exports.configPrefabTextItemAll =
    exports.configPrefabConfigById =
    exports.configPlotTypeById =
    exports.configPlotTypeAll =
    exports.configPlotHandBookConfigByQuestId =
    exports.configPlotHandBookConfigAll =
    exports.configPlotAudioById =
    exports.configPlayerStateRestrictionById =
    exports.configPlayerExpByPlayerLevelArea =
    exports.configPlayerExpByPlayerLevel =
    exports.configPlatformIconById =
    exports.configPhysicsAssetConfigByIdWithDefaultId =
    exports.configPhysicsAssetConfigById =
    exports.configPhotoSetupByValueType =
    exports.configPhotoSetupAll =
    exports.configPhotoMontageByRoleId =
    exports.configPhotoMontageById =
    exports.configPhotoMemoryTopicById =
    exports.configPhotoMemoryTopicAll =
    exports.configPhotoMemoryCollectByTopicID =
    exports.configPhotoMemoryCollectById =
    exports.configPhotoMemoryActivityById =
    exports.configPhotographHandBookByType =
    exports.configPhotographHandBookById =
    exports.configPhotographHandBookAll =
    exports.configPhantomWildItemByItemId =
    exports.configPhantomWildItemAll =
    exports.configPhantomSubPropertyByPropId =
    exports.configPhantomSubPropertyById =
    exports.configPhantomSkillByPhantomSkillId =
    exports.configPhantomSkillById =
    exports.configPhantomRarityByRare =
    exports.configPhantomQualityByQuality =
    exports.configPhantomMainPropItemById =
      void 0),
  (exports.configRoleInfluenceById =
    exports.configRoleInfluenceAll =
    exports.configRoleIconTagById =
    exports.configRoleGuideActivityById =
    exports.configRoleExpItemById =
    exports.configRoleExpItemAll =
    exports.configRoleDescriptionById =
    exports.configRoleBreachByBreachGroupIdAndBreachLevel =
    exports.configRoleBreachByBreachGroupId =
    exports.configRoleBattleViewInfoById =
    exports.configRoleBattleViewInfoAll =
    exports.configRoleAudioById =
    exports.configRoleAnimAudioByRoleId =
    exports.configRogueTokenBySeasonId =
    exports.configRogueTalentTreeDescById =
    exports.configRogueTalentTreeById =
    exports.configRogueTalentTreeAll =
    exports.configRogueSeasonRewardBySeasonId =
    exports.configRogueSeasonById =
    exports.configRogueSeasonAll =
    exports.configRogueRoomTypeById =
    exports.configRogueQualityConfigById =
    exports.configRoguePopularEntrieArgBySeasonIdAndInstId =
    exports.configRoguePopularEntrieArgById =
    exports.configRoguePopularEntrieArgAll =
    exports.configRoguePokemonById =
    exports.configRogueParamById =
    exports.configRogueEventById =
    exports.configRogueEffectById =
    exports.configRogueCurrencyById =
    exports.configRogueCharacterById =
    exports.configRogueCharacterBuffById =
    exports.configRogueBuffPoolById =
    exports.configRogueAffixById =
    exports.configRogueActivityById =
    exports.configRewardViewFromSourceBySourceId =
    exports.configRewardViewFromSourceAll =
    exports.configReviveById =
    exports.configResonantChainById =
    exports.configResonantChainByGroupIdAndNodeType =
    exports.configResonantChainByGroupIdAndGroupIndex =
    exports.configResonantChainByGroupId =
    exports.configReportPlayerInfoAll =
    exports.configRedDotByRelativeName =
    exports.configRecordConfigById =
    exports.configQuickChatAll =
    exports.configQuestTypeByMainId =
    exports.configQuestTypeById =
      void 0);
var MapBorderAll_1 = require("../../Core/Define/ConfigQuery/MapBorderAll"),
  MapBorderByBorderId_1 =
    (Object.defineProperty(exports, "configMapBorderAll", {
      enumerable: !0,
      get: function () {
        return MapBorderAll_1.configMapBorderAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/MapBorderByBorderId")),
  MapMarkByEntityConfigId_1 =
    (Object.defineProperty(exports, "configMapBorderByBorderId", {
      enumerable: !0,
      get: function () {
        return MapBorderByBorderId_1.configMapBorderByBorderId;
      },
    }),
    require("../../Core/Define/ConfigQuery/MapMarkByEntityConfigId")),
  MapMarkByMapId_1 =
    (Object.defineProperty(exports, "configMapMarkByEntityConfigId", {
      enumerable: !0,
      get: function () {
        return MapMarkByEntityConfigId_1.configMapMarkByEntityConfigId;
      },
    }),
    require("../../Core/Define/ConfigQuery/MapMarkByMapId")),
  MapMarkByMarkId_1 =
    (Object.defineProperty(exports, "configMapMarkByMapId", {
      enumerable: !0,
      get: function () {
        return MapMarkByMapId_1.configMapMarkByMapId;
      },
    }),
    require("../../Core/Define/ConfigQuery/MapMarkByMarkId")),
  MapMarkByRelativeMainSubType_1 =
    (Object.defineProperty(exports, "configMapMarkByMarkId", {
      enumerable: !0,
      get: function () {
        return MapMarkByMarkId_1.configMapMarkByMarkId;
      },
    }),
    require("../../Core/Define/ConfigQuery/MapMarkByRelativeMainSubType")),
  MapMarkHasEntityConfigId_1 =
    (Object.defineProperty(exports, "configMapMarkByRelativeMainSubType", {
      enumerable: !0,
      get: function () {
        return MapMarkByRelativeMainSubType_1.configMapMarkByRelativeMainSubType;
      },
    }),
    require("../../Core/Define/ConfigQuery/MapMarkHasEntityConfigId")),
  MapMarkPhantomGroupByMarkId_1 =
    (Object.defineProperty(exports, "configMapMarkHasEntityConfigId", {
      enumerable: !0,
      get: function () {
        return MapMarkHasEntityConfigId_1.configMapMarkHasEntityConfigId;
      },
    }),
    require("../../Core/Define/ConfigQuery/MapMarkPhantomGroupByMarkId")),
  MapMarkRelativeSubTypeAll_1 =
    (Object.defineProperty(exports, "configMapMarkPhantomGroupByMarkId", {
      enumerable: !0,
      get: function () {
        return MapMarkPhantomGroupByMarkId_1.configMapMarkPhantomGroupByMarkId;
      },
    }),
    require("../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeAll")),
  MapMarkRelativeSubTypeByFunctionId_1 =
    (Object.defineProperty(exports, "configMapMarkRelativeSubTypeAll", {
      enumerable: !0,
      get: function () {
        return MapMarkRelativeSubTypeAll_1.configMapMarkRelativeSubTypeAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeByFunctionId")),
  MapMarkRelativeSubTypeById_1 =
    (Object.defineProperty(
      exports,
      "configMapMarkRelativeSubTypeByFunctionId",
      {
        enumerable: !0,
        get: function () {
          return MapMarkRelativeSubTypeByFunctionId_1.configMapMarkRelativeSubTypeByFunctionId;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/MapMarkRelativeSubTypeById")),
  MapNoteById_1 =
    (Object.defineProperty(exports, "configMapMarkRelativeSubTypeById", {
      enumerable: !0,
      get: function () {
        return MapMarkRelativeSubTypeById_1.configMapMarkRelativeSubTypeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MapNoteById")),
  MappingBySheetNameAndFieldName_1 =
    (Object.defineProperty(exports, "configMapNoteById", {
      enumerable: !0,
      get: function () {
        return MapNoteById_1.configMapNoteById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MappingBySheetNameAndFieldName")),
  MappingBySheetNameFieldNameAndValue_1 =
    (Object.defineProperty(exports, "configMappingBySheetNameAndFieldName", {
      enumerable: !0,
      get: function () {
        return MappingBySheetNameAndFieldName_1.configMappingBySheetNameAndFieldName;
      },
    }),
    require("../../Core/Define/ConfigQuery/MappingBySheetNameFieldNameAndValue")),
  MarkEffectByMarkId_1 =
    (Object.defineProperty(
      exports,
      "configMappingBySheetNameFieldNameAndValue",
      {
        enumerable: !0,
        get: function () {
          return MappingBySheetNameFieldNameAndValue_1.configMappingBySheetNameFieldNameAndValue;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/MarkEffectByMarkId")),
  MenuConfigAll_1 =
    (Object.defineProperty(exports, "configMarkEffectByMarkId", {
      enumerable: !0,
      get: function () {
        return MarkEffectByMarkId_1.configMarkEffectByMarkId;
      },
    }),
    require("../../Core/Define/ConfigQuery/MenuConfigAll")),
  MenuConfigByFunctionId_1 =
    (Object.defineProperty(exports, "configMenuConfigAll", {
      enumerable: !0,
      get: function () {
        return MenuConfigAll_1.configMenuConfigAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/MenuConfigByFunctionId")),
  MobileBattleUiSetAll_1 =
    (Object.defineProperty(exports, "configMenuConfigByFunctionId", {
      enumerable: !0,
      get: function () {
        return MenuConfigByFunctionId_1.configMenuConfigByFunctionId;
      },
    }),
    require("../../Core/Define/ConfigQuery/MobileBattleUiSetAll")),
  MobileBattleUiSetByPanelIndex_1 =
    (Object.defineProperty(exports, "configMobileBattleUiSetAll", {
      enumerable: !0,
      get: function () {
        return MobileBattleUiSetAll_1.configMobileBattleUiSetAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/MobileBattleUiSetByPanelIndex")),
  ModelConfigPreloadById_1 =
    (Object.defineProperty(exports, "configMobileBattleUiSetByPanelIndex", {
      enumerable: !0,
      get: function () {
        return MobileBattleUiSetByPanelIndex_1.configMobileBattleUiSetByPanelIndex;
      },
    }),
    require("../../Core/Define/ConfigQuery/ModelConfigPreloadById")),
  MonsterBattleConfById_1 =
    (Object.defineProperty(exports, "configModelConfigPreloadById", {
      enumerable: !0,
      get: function () {
        return ModelConfigPreloadById_1.configModelConfigPreloadById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterBattleConfById")),
  MonsterBodyTypeConfigById_1 =
    (Object.defineProperty(exports, "configMonsterBattleConfById", {
      enumerable: !0,
      get: function () {
        return MonsterBattleConfById_1.configMonsterBattleConfById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterBodyTypeConfigById")),
  MonsterDetectionAll_1 =
    (Object.defineProperty(exports, "configMonsterBodyTypeConfigById", {
      enumerable: !0,
      get: function () {
        return MonsterBodyTypeConfigById_1.configMonsterBodyTypeConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterDetectionAll")),
  MonsterDetectionById_1 =
    (Object.defineProperty(exports, "configMonsterDetectionAll", {
      enumerable: !0,
      get: function () {
        return MonsterDetectionAll_1.configMonsterDetectionAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterDetectionById")),
  MonsterDetectionFilterAll_1 =
    (Object.defineProperty(exports, "configMonsterDetectionById", {
      enumerable: !0,
      get: function () {
        return MonsterDetectionById_1.configMonsterDetectionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterDetectionFilterAll")),
  MonsterDisplayById_1 =
    (Object.defineProperty(exports, "configMonsterDetectionFilterAll", {
      enumerable: !0,
      get: function () {
        return MonsterDetectionFilterAll_1.configMonsterDetectionFilterAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterDisplayById")),
  MonsterDisplayLang_1 =
    (Object.defineProperty(exports, "configMonsterDisplayById", {
      enumerable: !0,
      get: function () {
        return MonsterDisplayById_1.configMonsterDisplayById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterDisplayLang")),
  MonsterHandBookAll_1 =
    (Object.defineProperty(exports, "configMonsterDisplayLang", {
      enumerable: !0,
      get: function () {
        return MonsterDisplayLang_1.configMonsterDisplayLang;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterHandBookAll")),
  MonsterHandBookById_1 =
    (Object.defineProperty(exports, "configMonsterHandBookAll", {
      enumerable: !0,
      get: function () {
        return MonsterHandBookAll_1.configMonsterHandBookAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterHandBookById")),
  MonsterHandBookByType_1 =
    (Object.defineProperty(exports, "configMonsterHandBookById", {
      enumerable: !0,
      get: function () {
        return MonsterHandBookById_1.configMonsterHandBookById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterHandBookByType")),
  MonsterHandBookTypeAll_1 =
    (Object.defineProperty(exports, "configMonsterHandBookByType", {
      enumerable: !0,
      get: function () {
        return MonsterHandBookByType_1.configMonsterHandBookByType;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterHandBookTypeAll")),
  MonsterIconTagById_1 =
    (Object.defineProperty(exports, "configMonsterHandBookTypeAll", {
      enumerable: !0,
      get: function () {
        return MonsterHandBookTypeAll_1.configMonsterHandBookTypeAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterIconTagById")),
  MonsterInfoById_1 =
    (Object.defineProperty(exports, "configMonsterIconTagById", {
      enumerable: !0,
      get: function () {
        return MonsterIconTagById_1.configMonsterIconTagById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterInfoById")),
  MonsterPerchById_1 =
    (Object.defineProperty(exports, "configMonsterInfoById", {
      enumerable: !0,
      get: function () {
        return MonsterInfoById_1.configMonsterInfoById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterPerchById")),
  MonsterPropertyGrowthById_1 =
    (Object.defineProperty(exports, "configMonsterPerchById", {
      enumerable: !0,
      get: function () {
        return MonsterPerchById_1.configMonsterPerchById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterPropertyGrowthById")),
  MonsterRarityById_1 =
    (Object.defineProperty(exports, "configMonsterPropertyGrowthById", {
      enumerable: !0,
      get: function () {
        return MonsterPropertyGrowthById_1.configMonsterPropertyGrowthById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterRarityById")),
  MonsterSizeIdById_1 =
    (Object.defineProperty(exports, "configMonsterRarityById", {
      enumerable: !0,
      get: function () {
        return MonsterRarityById_1.configMonsterRarityById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonsterSizeIdById")),
  MontageDataById_1 =
    (Object.defineProperty(exports, "configMonsterSizeIdById", {
      enumerable: !0,
      get: function () {
        return MonsterSizeIdById_1.configMonsterSizeIdById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MontageDataById")),
  MonthCardContentById_1 =
    (Object.defineProperty(exports, "configMontageDataById", {
      enumerable: !0,
      get: function () {
        return MontageDataById_1.configMontageDataById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MonthCardContentById")),
  MotionById_1 =
    (Object.defineProperty(exports, "configMonthCardContentById", {
      enumerable: !0,
      get: function () {
        return MonthCardContentById_1.configMonthCardContentById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MotionById")),
  MotionByRoleId_1 =
    (Object.defineProperty(exports, "configMotionById", {
      enumerable: !0,
      get: function () {
        return MotionById_1.configMotionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MotionByRoleId")),
  MotionByRoleIdAndType_1 =
    (Object.defineProperty(exports, "configMotionByRoleId", {
      enumerable: !0,
      get: function () {
        return MotionByRoleId_1.configMotionByRoleId;
      },
    }),
    require("../../Core/Define/ConfigQuery/MotionByRoleIdAndType")),
  MultiMapAll_1 =
    (Object.defineProperty(exports, "configMotionByRoleIdAndType", {
      enumerable: !0,
      get: function () {
        return MotionByRoleIdAndType_1.configMotionByRoleIdAndType;
      },
    }),
    require("../../Core/Define/ConfigQuery/MultiMapAll")),
  MultiMapAreaConfigAll_1 =
    (Object.defineProperty(exports, "configMultiMapAll", {
      enumerable: !0,
      get: function () {
        return MultiMapAll_1.configMultiMapAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/MultiMapAreaConfigAll")),
  MultiMapAreaConfigByBlock_1 =
    (Object.defineProperty(exports, "configMultiMapAreaConfigAll", {
      enumerable: !0,
      get: function () {
        return MultiMapAreaConfigAll_1.configMultiMapAreaConfigAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/MultiMapAreaConfigByBlock")),
  MultiMapByGroupId_1 =
    (Object.defineProperty(exports, "configMultiMapAreaConfigByBlock", {
      enumerable: !0,
      get: function () {
        return MultiMapAreaConfigByBlock_1.configMultiMapAreaConfigByBlock;
      },
    }),
    require("../../Core/Define/ConfigQuery/MultiMapByGroupId")),
  MultiMapById_1 =
    (Object.defineProperty(exports, "configMultiMapByGroupId", {
      enumerable: !0,
      get: function () {
        return MultiMapByGroupId_1.configMultiMapByGroupId;
      },
    }),
    require("../../Core/Define/ConfigQuery/MultiMapById")),
  MultiTextLang_1 =
    (Object.defineProperty(exports, "configMultiMapById", {
      enumerable: !0,
      get: function () {
        return MultiMapById_1.configMultiMapById;
      },
    }),
    require("../../Core/Define/ConfigQuery/MultiTextLang")),
  NewbieCourseAll_1 =
    (Object.defineProperty(exports, "configMultiTextLang", {
      enumerable: !0,
      get: function () {
        return MultiTextLang_1.configMultiTextLang;
      },
    }),
    require("../../Core/Define/ConfigQuery/NewbieCourseAll")),
  NewbieCourseById_1 =
    (Object.defineProperty(exports, "configNewbieCourseAll", {
      enumerable: !0,
      get: function () {
        return NewbieCourseAll_1.configNewbieCourseAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/NewbieCourseById")),
  NewOccupationConfigAll_1 =
    (Object.defineProperty(exports, "configNewbieCourseById", {
      enumerable: !0,
      get: function () {
        return NewbieCourseById_1.configNewbieCourseById;
      },
    }),
    require("../../Core/Define/ConfigQuery/NewOccupationConfigAll")),
  NewOccupationConfigById_1 =
    (Object.defineProperty(exports, "configNewOccupationConfigAll", {
      enumerable: !0,
      get: function () {
        return NewOccupationConfigAll_1.configNewOccupationConfigAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/NewOccupationConfigById")),
  NpcHeadInfoById_1 =
    (Object.defineProperty(exports, "configNewOccupationConfigById", {
      enumerable: !0,
      get: function () {
        return NewOccupationConfigById_1.configNewOccupationConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/NpcHeadInfoById")),
  NpcSystemBackgroundById_1 =
    (Object.defineProperty(exports, "configNpcHeadInfoById", {
      enumerable: !0,
      get: function () {
        return NpcHeadInfoById_1.configNpcHeadInfoById;
      },
    }),
    require("../../Core/Define/ConfigQuery/NpcSystemBackgroundById")),
  NpcSystemBackgroundByViewName_1 =
    (Object.defineProperty(exports, "configNpcSystemBackgroundById", {
      enumerable: !0,
      get: function () {
        return NpcSystemBackgroundById_1.configNpcSystemBackgroundById;
      },
    }),
    require("../../Core/Define/ConfigQuery/NpcSystemBackgroundByViewName")),
  OccupationConfigById_1 =
    (Object.defineProperty(exports, "configNpcSystemBackgroundByViewName", {
      enumerable: !0,
      get: function () {
        return NpcSystemBackgroundByViewName_1.configNpcSystemBackgroundByViewName;
      },
    }),
    require("../../Core/Define/ConfigQuery/OccupationConfigById")),
  OccupationConfigLang_1 =
    (Object.defineProperty(exports, "configOccupationConfigById", {
      enumerable: !0,
      get: function () {
        return OccupationConfigById_1.configOccupationConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/OccupationConfigLang")),
  OverlayAbpMontageDataById_1 =
    (Object.defineProperty(exports, "configOccupationConfigLang", {
      enumerable: !0,
      get: function () {
        return OccupationConfigLang_1.configOccupationConfigLang;
      },
    }),
    require("../../Core/Define/ConfigQuery/OverlayAbpMontageDataById")),
  PackageCapacityAll_1 =
    (Object.defineProperty(exports, "configOverlayAbpMontageDataById", {
      enumerable: !0,
      get: function () {
        return OverlayAbpMontageDataById_1.configOverlayAbpMontageDataById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PackageCapacityAll")),
  PackageCapacityByPackageId_1 =
    (Object.defineProperty(exports, "configPackageCapacityAll", {
      enumerable: !0,
      get: function () {
        return PackageCapacityAll_1.configPackageCapacityAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PackageCapacityByPackageId")),
  ParkourChallengeById_1 =
    (Object.defineProperty(exports, "configPackageCapacityByPackageId", {
      enumerable: !0,
      get: function () {
        return PackageCapacityByPackageId_1.configPackageCapacityByPackageId;
      },
    }),
    require("../../Core/Define/ConfigQuery/ParkourChallengeById")),
  ParkourChallengeByMarkId_1 =
    (Object.defineProperty(exports, "configParkourChallengeById", {
      enumerable: !0,
      get: function () {
        return ParkourChallengeById_1.configParkourChallengeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ParkourChallengeByMarkId")),
  PassiveSkillById_1 =
    (Object.defineProperty(exports, "configParkourChallengeByMarkId", {
      enumerable: !0,
      get: function () {
        return ParkourChallengeByMarkId_1.configParkourChallengeByMarkId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PassiveSkillById")),
  PayById_1 =
    (Object.defineProperty(exports, "configPassiveSkillById", {
      enumerable: !0,
      get: function () {
        return PassiveSkillById_1.configPassiveSkillById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayById")),
  PayByPayIdAndRegion_1 =
    (Object.defineProperty(exports, "configPayById", {
      enumerable: !0,
      get: function () {
        return PayById_1.configPayById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayByPayIdAndRegion")),
  PayByRegion_1 =
    (Object.defineProperty(exports, "configPayByPayIdAndRegion", {
      enumerable: !0,
      get: function () {
        return PayByPayIdAndRegion_1.configPayByPayIdAndRegion;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayByRegion")),
  PayItemAll_1 =
    (Object.defineProperty(exports, "configPayByRegion", {
      enumerable: !0,
      get: function () {
        return PayByRegion_1.configPayByRegion;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayItemAll")),
  PayItemById_1 =
    (Object.defineProperty(exports, "configPayItemAll", {
      enumerable: !0,
      get: function () {
        return PayItemAll_1.configPayItemAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayItemById")),
  PayShopAll_1 =
    (Object.defineProperty(exports, "configPayItemById", {
      enumerable: !0,
      get: function () {
        return PayItemById_1.configPayItemById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayShopAll")),
  PayShopById_1 =
    (Object.defineProperty(exports, "configPayShopAll", {
      enumerable: !0,
      get: function () {
        return PayShopAll_1.configPayShopAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayShopById")),
  PayShopConditionById_1 =
    (Object.defineProperty(exports, "configPayShopById", {
      enumerable: !0,
      get: function () {
        return PayShopById_1.configPayShopById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayShopConditionById")),
  PayShopDirectGoodsByGoodsId_1 =
    (Object.defineProperty(exports, "configPayShopConditionById", {
      enumerable: !0,
      get: function () {
        return PayShopConditionById_1.configPayShopConditionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayShopDirectGoodsByGoodsId")),
  PayShopGoodsById_1 =
    (Object.defineProperty(exports, "configPayShopDirectGoodsByGoodsId", {
      enumerable: !0,
      get: function () {
        return PayShopDirectGoodsByGoodsId_1.configPayShopDirectGoodsByGoodsId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayShopGoodsById")),
  PayShopGoodsByItemId_1 =
    (Object.defineProperty(exports, "configPayShopGoodsById", {
      enumerable: !0,
      get: function () {
        return PayShopGoodsById_1.configPayShopGoodsById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayShopGoodsByItemId")),
  PayShopTabByShopId_1 =
    (Object.defineProperty(exports, "configPayShopGoodsByItemId", {
      enumerable: !0,
      get: function () {
        return PayShopGoodsByItemId_1.configPayShopGoodsByItemId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayShopTabByShopId")),
  PayShopTabByShopIdAndTabId_1 =
    (Object.defineProperty(exports, "configPayShopTabByShopId", {
      enumerable: !0,
      get: function () {
        return PayShopTabByShopId_1.configPayShopTabByShopId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PayShopTabByShopIdAndTabId")),
  PcKeyById_1 =
    (Object.defineProperty(exports, "configPayShopTabByShopIdAndTabId", {
      enumerable: !0,
      get: function () {
        return PayShopTabByShopIdAndTabId_1.configPayShopTabByShopIdAndTabId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PcKeyById")),
  PcKeyByKeyName_1 =
    (Object.defineProperty(exports, "configPcKeyById", {
      enumerable: !0,
      get: function () {
        return PcKeyById_1.configPcKeyById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PcKeyByKeyName")),
  PersonalTipsByFunctionId_1 =
    (Object.defineProperty(exports, "configPcKeyByKeyName", {
      enumerable: !0,
      get: function () {
        return PcKeyByKeyName_1.configPcKeyByKeyName;
      },
    }),
    require("../../Core/Define/ConfigQuery/PersonalTipsByFunctionId")),
  PersonalTipsById_1 =
    (Object.defineProperty(exports, "configPersonalTipsByFunctionId", {
      enumerable: !0,
      get: function () {
        return PersonalTipsByFunctionId_1.configPersonalTipsByFunctionId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PersonalTipsById")),
  PhantomCollectActivityById_1 =
    (Object.defineProperty(exports, "configPersonalTipsById", {
      enumerable: !0,
      get: function () {
        return PersonalTipsById_1.configPersonalTipsById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomCollectActivityById")),
  PhantomCollectTaskDescById_1 =
    (Object.defineProperty(exports, "configPhantomCollectActivityById", {
      enumerable: !0,
      get: function () {
        return PhantomCollectActivityById_1.configPhantomCollectActivityById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomCollectTaskDescById")),
  PhantomCustomizeItemByItemId_1 =
    (Object.defineProperty(exports, "configPhantomCollectTaskDescById", {
      enumerable: !0,
      get: function () {
        return PhantomCollectTaskDescById_1.configPhantomCollectTaskDescById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomCustomizeItemByItemId")),
  PhantomExpItemAll_1 =
    (Object.defineProperty(exports, "configPhantomCustomizeItemByItemId", {
      enumerable: !0,
      get: function () {
        return PhantomCustomizeItemByItemId_1.configPhantomCustomizeItemByItemId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomExpItemAll")),
  PhantomExpItemByItemId_1 =
    (Object.defineProperty(exports, "configPhantomExpItemAll", {
      enumerable: !0,
      get: function () {
        return PhantomExpItemAll_1.configPhantomExpItemAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomExpItemByItemId")),
  PhantomFetterAll_1 =
    (Object.defineProperty(exports, "configPhantomExpItemByItemId", {
      enumerable: !0,
      get: function () {
        return PhantomExpItemByItemId_1.configPhantomExpItemByItemId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomFetterAll")),
  PhantomFetterById_1 =
    (Object.defineProperty(exports, "configPhantomFetterAll", {
      enumerable: !0,
      get: function () {
        return PhantomFetterAll_1.configPhantomFetterAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomFetterById")),
  PhantomFetterGroupAll_1 =
    (Object.defineProperty(exports, "configPhantomFetterById", {
      enumerable: !0,
      get: function () {
        return PhantomFetterById_1.configPhantomFetterById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomFetterGroupAll")),
  PhantomFetterGroupById_1 =
    (Object.defineProperty(exports, "configPhantomFetterGroupAll", {
      enumerable: !0,
      get: function () {
        return PhantomFetterGroupAll_1.configPhantomFetterGroupAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomFetterGroupById")),
  PhantomFetterHandBookAll_1 =
    (Object.defineProperty(exports, "configPhantomFetterGroupById", {
      enumerable: !0,
      get: function () {
        return PhantomFetterGroupById_1.configPhantomFetterGroupById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomFetterHandBookAll")),
  PhantomGrowthByGrowthIdAndLevel_1 =
    (Object.defineProperty(exports, "configPhantomFetterHandBookAll", {
      enumerable: !0,
      get: function () {
        return PhantomFetterHandBookAll_1.configPhantomFetterHandBookAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomGrowthByGrowthIdAndLevel")),
  PhantomHandBookAll_1 =
    (Object.defineProperty(exports, "configPhantomGrowthByGrowthIdAndLevel", {
      enumerable: !0,
      get: function () {
        return PhantomGrowthByGrowthIdAndLevel_1.configPhantomGrowthByGrowthIdAndLevel;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomHandBookAll")),
  PhantomHandBookById_1 =
    (Object.defineProperty(exports, "configPhantomHandBookAll", {
      enumerable: !0,
      get: function () {
        return PhantomHandBookAll_1.configPhantomHandBookAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomHandBookById")),
  PhantomHandBookPageAll_1 =
    (Object.defineProperty(exports, "configPhantomHandBookById", {
      enumerable: !0,
      get: function () {
        return PhantomHandBookById_1.configPhantomHandBookById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomHandBookPageAll")),
  PhantomItemAll_1 =
    (Object.defineProperty(exports, "configPhantomHandBookPageAll", {
      enumerable: !0,
      get: function () {
        return PhantomHandBookPageAll_1.configPhantomHandBookPageAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomItemAll")),
  PhantomItemByItemId_1 =
    (Object.defineProperty(exports, "configPhantomItemAll", {
      enumerable: !0,
      get: function () {
        return PhantomItemAll_1.configPhantomItemAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomItemByItemId")),
  PhantomItemByMonsterId_1 =
    (Object.defineProperty(exports, "configPhantomItemByItemId", {
      enumerable: !0,
      get: function () {
        return PhantomItemByItemId_1.configPhantomItemByItemId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomItemByMonsterId")),
  PhantomLevelByGroupId_1 =
    (Object.defineProperty(exports, "configPhantomItemByMonsterId", {
      enumerable: !0,
      get: function () {
        return PhantomItemByMonsterId_1.configPhantomItemByMonsterId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomLevelByGroupId")),
  PhantomLevelByGroupIdAndLevel_1 =
    (Object.defineProperty(exports, "configPhantomLevelByGroupId", {
      enumerable: !0,
      get: function () {
        return PhantomLevelByGroupId_1.configPhantomLevelByGroupId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomLevelByGroupIdAndLevel")),
  PhantomMainPropertyById_1 =
    (Object.defineProperty(exports, "configPhantomLevelByGroupIdAndLevel", {
      enumerable: !0,
      get: function () {
        return PhantomLevelByGroupIdAndLevel_1.configPhantomLevelByGroupIdAndLevel;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomMainPropertyById")),
  PhantomMainPropItemById_1 =
    (Object.defineProperty(exports, "configPhantomMainPropertyById", {
      enumerable: !0,
      get: function () {
        return PhantomMainPropertyById_1.configPhantomMainPropertyById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomMainPropItemById")),
  PhantomQualityByQuality_1 =
    (Object.defineProperty(exports, "configPhantomMainPropItemById", {
      enumerable: !0,
      get: function () {
        return PhantomMainPropItemById_1.configPhantomMainPropItemById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomQualityByQuality")),
  PhantomRarityByRare_1 =
    (Object.defineProperty(exports, "configPhantomQualityByQuality", {
      enumerable: !0,
      get: function () {
        return PhantomQualityByQuality_1.configPhantomQualityByQuality;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomRarityByRare")),
  PhantomSkillById_1 =
    (Object.defineProperty(exports, "configPhantomRarityByRare", {
      enumerable: !0,
      get: function () {
        return PhantomRarityByRare_1.configPhantomRarityByRare;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomSkillById")),
  PhantomSkillByPhantomSkillId_1 =
    (Object.defineProperty(exports, "configPhantomSkillById", {
      enumerable: !0,
      get: function () {
        return PhantomSkillById_1.configPhantomSkillById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomSkillByPhantomSkillId")),
  PhantomSubPropertyById_1 =
    (Object.defineProperty(exports, "configPhantomSkillByPhantomSkillId", {
      enumerable: !0,
      get: function () {
        return PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomSubPropertyById")),
  PhantomSubPropertyByPropId_1 =
    (Object.defineProperty(exports, "configPhantomSubPropertyById", {
      enumerable: !0,
      get: function () {
        return PhantomSubPropertyById_1.configPhantomSubPropertyById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomSubPropertyByPropId")),
  PhantomWildItemAll_1 =
    (Object.defineProperty(exports, "configPhantomSubPropertyByPropId", {
      enumerable: !0,
      get: function () {
        return PhantomSubPropertyByPropId_1.configPhantomSubPropertyByPropId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomWildItemAll")),
  PhantomWildItemByItemId_1 =
    (Object.defineProperty(exports, "configPhantomWildItemAll", {
      enumerable: !0,
      get: function () {
        return PhantomWildItemAll_1.configPhantomWildItemAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhantomWildItemByItemId")),
  PhotographHandBookAll_1 =
    (Object.defineProperty(exports, "configPhantomWildItemByItemId", {
      enumerable: !0,
      get: function () {
        return PhantomWildItemByItemId_1.configPhantomWildItemByItemId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotographHandBookAll")),
  PhotographHandBookById_1 =
    (Object.defineProperty(exports, "configPhotographHandBookAll", {
      enumerable: !0,
      get: function () {
        return PhotographHandBookAll_1.configPhotographHandBookAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotographHandBookById")),
  PhotographHandBookByType_1 =
    (Object.defineProperty(exports, "configPhotographHandBookById", {
      enumerable: !0,
      get: function () {
        return PhotographHandBookById_1.configPhotographHandBookById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotographHandBookByType")),
  PhotoMemoryActivityById_1 =
    (Object.defineProperty(exports, "configPhotographHandBookByType", {
      enumerable: !0,
      get: function () {
        return PhotographHandBookByType_1.configPhotographHandBookByType;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotoMemoryActivityById")),
  PhotoMemoryCollectById_1 =
    (Object.defineProperty(exports, "configPhotoMemoryActivityById", {
      enumerable: !0,
      get: function () {
        return PhotoMemoryActivityById_1.configPhotoMemoryActivityById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotoMemoryCollectById")),
  PhotoMemoryCollectByTopicID_1 =
    (Object.defineProperty(exports, "configPhotoMemoryCollectById", {
      enumerable: !0,
      get: function () {
        return PhotoMemoryCollectById_1.configPhotoMemoryCollectById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotoMemoryCollectByTopicID")),
  PhotoMemoryTopicAll_1 =
    (Object.defineProperty(exports, "configPhotoMemoryCollectByTopicID", {
      enumerable: !0,
      get: function () {
        return PhotoMemoryCollectByTopicID_1.configPhotoMemoryCollectByTopicID;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotoMemoryTopicAll")),
  PhotoMemoryTopicById_1 =
    (Object.defineProperty(exports, "configPhotoMemoryTopicAll", {
      enumerable: !0,
      get: function () {
        return PhotoMemoryTopicAll_1.configPhotoMemoryTopicAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotoMemoryTopicById")),
  PhotoMontageById_1 =
    (Object.defineProperty(exports, "configPhotoMemoryTopicById", {
      enumerable: !0,
      get: function () {
        return PhotoMemoryTopicById_1.configPhotoMemoryTopicById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotoMontageById")),
  PhotoMontageByRoleId_1 =
    (Object.defineProperty(exports, "configPhotoMontageById", {
      enumerable: !0,
      get: function () {
        return PhotoMontageById_1.configPhotoMontageById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotoMontageByRoleId")),
  PhotoSetupAll_1 =
    (Object.defineProperty(exports, "configPhotoMontageByRoleId", {
      enumerable: !0,
      get: function () {
        return PhotoMontageByRoleId_1.configPhotoMontageByRoleId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotoSetupAll")),
  PhotoSetupByValueType_1 =
    (Object.defineProperty(exports, "configPhotoSetupAll", {
      enumerable: !0,
      get: function () {
        return PhotoSetupAll_1.configPhotoSetupAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhotoSetupByValueType")),
  PhysicsAssetConfigById_1 =
    (Object.defineProperty(exports, "configPhotoSetupByValueType", {
      enumerable: !0,
      get: function () {
        return PhotoSetupByValueType_1.configPhotoSetupByValueType;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhysicsAssetConfigById")),
  PhysicsAssetConfigByIdWithDefaultId_1 =
    (Object.defineProperty(exports, "configPhysicsAssetConfigById", {
      enumerable: !0,
      get: function () {
        return PhysicsAssetConfigById_1.configPhysicsAssetConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PhysicsAssetConfigByIdWithDefaultId")),
  PlatformIconById_1 =
    (Object.defineProperty(
      exports,
      "configPhysicsAssetConfigByIdWithDefaultId",
      {
        enumerable: !0,
        get: function () {
          return PhysicsAssetConfigByIdWithDefaultId_1.configPhysicsAssetConfigByIdWithDefaultId;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/PlatformIconById")),
  PlayerExpByPlayerLevel_1 =
    (Object.defineProperty(exports, "configPlatformIconById", {
      enumerable: !0,
      get: function () {
        return PlatformIconById_1.configPlatformIconById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PlayerExpByPlayerLevel")),
  PlayerExpByPlayerLevelArea_1 =
    (Object.defineProperty(exports, "configPlayerExpByPlayerLevel", {
      enumerable: !0,
      get: function () {
        return PlayerExpByPlayerLevel_1.configPlayerExpByPlayerLevel;
      },
    }),
    require("../../Core/Define/ConfigQuery/PlayerExpByPlayerLevelArea")),
  PlayerStateRestrictionById_1 =
    (Object.defineProperty(exports, "configPlayerExpByPlayerLevelArea", {
      enumerable: !0,
      get: function () {
        return PlayerExpByPlayerLevelArea_1.configPlayerExpByPlayerLevelArea;
      },
    }),
    require("../../Core/Define/ConfigQuery/PlayerStateRestrictionById")),
  PlotAudioById_1 =
    (Object.defineProperty(exports, "configPlayerStateRestrictionById", {
      enumerable: !0,
      get: function () {
        return PlayerStateRestrictionById_1.configPlayerStateRestrictionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PlotAudioById")),
  PlotHandBookConfigAll_1 =
    (Object.defineProperty(exports, "configPlotAudioById", {
      enumerable: !0,
      get: function () {
        return PlotAudioById_1.configPlotAudioById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PlotHandBookConfigAll")),
  PlotHandBookConfigByQuestId_1 =
    (Object.defineProperty(exports, "configPlotHandBookConfigAll", {
      enumerable: !0,
      get: function () {
        return PlotHandBookConfigAll_1.configPlotHandBookConfigAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PlotHandBookConfigByQuestId")),
  PlotTypeAll_1 =
    (Object.defineProperty(exports, "configPlotHandBookConfigByQuestId", {
      enumerable: !0,
      get: function () {
        return PlotHandBookConfigByQuestId_1.configPlotHandBookConfigByQuestId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PlotTypeAll")),
  PlotTypeById_1 =
    (Object.defineProperty(exports, "configPlotTypeAll", {
      enumerable: !0,
      get: function () {
        return PlotTypeAll_1.configPlotTypeAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PlotTypeById")),
  PrefabConfigById_1 =
    (Object.defineProperty(exports, "configPlotTypeById", {
      enumerable: !0,
      get: function () {
        return PlotTypeById_1.configPlotTypeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PrefabConfigById")),
  PrefabTextItemAll_1 =
    (Object.defineProperty(exports, "configPrefabConfigById", {
      enumerable: !0,
      get: function () {
        return PrefabConfigById_1.configPrefabConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PrefabTextItemAll")),
  PrefabTextItemByItemId_1 =
    (Object.defineProperty(exports, "configPrefabTextItemAll", {
      enumerable: !0,
      get: function () {
        return PrefabTextItemAll_1.configPrefabTextItemAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PrefabTextItemByItemId")),
  PrefabTextItemByPrefabPathHash_1 =
    (Object.defineProperty(exports, "configPrefabTextItemByItemId", {
      enumerable: !0,
      get: function () {
        return PrefabTextItemByItemId_1.configPrefabTextItemByItemId;
      },
    }),
    require("../../Core/Define/ConfigQuery/PrefabTextItemByPrefabPathHash")),
  PreviewItemAll_1 =
    (Object.defineProperty(exports, "configPrefabTextItemByPrefabPathHash", {
      enumerable: !0,
      get: function () {
        return PrefabTextItemByPrefabPathHash_1.configPrefabTextItemByPrefabPathHash;
      },
    }),
    require("../../Core/Define/ConfigQuery/PreviewItemAll")),
  PreviewItemById_1 =
    (Object.defineProperty(exports, "configPreviewItemAll", {
      enumerable: !0,
      get: function () {
        return PreviewItemAll_1.configPreviewItemAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PreviewItemById")),
  PropertyIndexAll_1 =
    (Object.defineProperty(exports, "configPreviewItemById", {
      enumerable: !0,
      get: function () {
        return PreviewItemById_1.configPreviewItemById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PropertyIndexAll")),
  PropertyIndexById_1 =
    (Object.defineProperty(exports, "configPropertyIndexAll", {
      enumerable: !0,
      get: function () {
        return PropertyIndexAll_1.configPropertyIndexAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/PropertyIndexById")),
  PropRewardConfById_1 =
    (Object.defineProperty(exports, "configPropertyIndexById", {
      enumerable: !0,
      get: function () {
        return PropertyIndexById_1.configPropertyIndexById;
      },
    }),
    require("../../Core/Define/ConfigQuery/PropRewardConfById")),
  QualityIconTagById_1 =
    (Object.defineProperty(exports, "configPropRewardConfById", {
      enumerable: !0,
      get: function () {
        return PropRewardConfById_1.configPropRewardConfById;
      },
    }),
    require("../../Core/Define/ConfigQuery/QualityIconTagById")),
  QualityInfoAll_1 =
    (Object.defineProperty(exports, "configQualityIconTagById", {
      enumerable: !0,
      get: function () {
        return QualityIconTagById_1.configQualityIconTagById;
      },
    }),
    require("../../Core/Define/ConfigQuery/QualityInfoAll")),
  QualityInfoById_1 =
    (Object.defineProperty(exports, "configQualityInfoAll", {
      enumerable: !0,
      get: function () {
        return QualityInfoAll_1.configQualityInfoAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/QualityInfoById")),
  QuestById_1 =
    (Object.defineProperty(exports, "configQualityInfoById", {
      enumerable: !0,
      get: function () {
        return QualityInfoById_1.configQualityInfoById;
      },
    }),
    require("../../Core/Define/ConfigQuery/QuestById")),
  QuestChapterById_1 =
    (Object.defineProperty(exports, "configQuestById", {
      enumerable: !0,
      get: function () {
        return QuestById_1.configQuestById;
      },
    }),
    require("../../Core/Define/ConfigQuery/QuestChapterById")),
  QuestDataById_1 =
    (Object.defineProperty(exports, "configQuestChapterById", {
      enumerable: !0,
      get: function () {
        return QuestChapterById_1.configQuestChapterById;
      },
    }),
    require("../../Core/Define/ConfigQuery/QuestDataById")),
  QuestMainTypeById_1 =
    (Object.defineProperty(exports, "configQuestDataById", {
      enumerable: !0,
      get: function () {
        return QuestDataById_1.configQuestDataById;
      },
    }),
    require("../../Core/Define/ConfigQuery/QuestMainTypeById")),
  QuestNodeDataByKey_1 =
    (Object.defineProperty(exports, "configQuestMainTypeById", {
      enumerable: !0,
      get: function () {
        return QuestMainTypeById_1.configQuestMainTypeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/QuestNodeDataByKey")),
  QuestTypeAll_1 =
    (Object.defineProperty(exports, "configQuestNodeDataByKey", {
      enumerable: !0,
      get: function () {
        return QuestNodeDataByKey_1.configQuestNodeDataByKey;
      },
    }),
    require("../../Core/Define/ConfigQuery/QuestTypeAll")),
  QuestTypeById_1 =
    (Object.defineProperty(exports, "configQuestTypeAll", {
      enumerable: !0,
      get: function () {
        return QuestTypeAll_1.configQuestTypeAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/QuestTypeById")),
  QuestTypeByMainId_1 =
    (Object.defineProperty(exports, "configQuestTypeById", {
      enumerable: !0,
      get: function () {
        return QuestTypeById_1.configQuestTypeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/QuestTypeByMainId")),
  QuickChatAll_1 =
    (Object.defineProperty(exports, "configQuestTypeByMainId", {
      enumerable: !0,
      get: function () {
        return QuestTypeByMainId_1.configQuestTypeByMainId;
      },
    }),
    require("../../Core/Define/ConfigQuery/QuickChatAll")),
  RecordConfigById_1 =
    (Object.defineProperty(exports, "configQuickChatAll", {
      enumerable: !0,
      get: function () {
        return QuickChatAll_1.configQuickChatAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/RecordConfigById")),
  RedDotByRelativeName_1 =
    (Object.defineProperty(exports, "configRecordConfigById", {
      enumerable: !0,
      get: function () {
        return RecordConfigById_1.configRecordConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RedDotByRelativeName")),
  ReportPlayerInfoAll_1 =
    (Object.defineProperty(exports, "configRedDotByRelativeName", {
      enumerable: !0,
      get: function () {
        return RedDotByRelativeName_1.configRedDotByRelativeName;
      },
    }),
    require("../../Core/Define/ConfigQuery/ReportPlayerInfoAll")),
  ResonantChainByGroupId_1 =
    (Object.defineProperty(exports, "configReportPlayerInfoAll", {
      enumerable: !0,
      get: function () {
        return ReportPlayerInfoAll_1.configReportPlayerInfoAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/ResonantChainByGroupId")),
  ResonantChainByGroupIdAndGroupIndex_1 =
    (Object.defineProperty(exports, "configResonantChainByGroupId", {
      enumerable: !0,
      get: function () {
        return ResonantChainByGroupId_1.configResonantChainByGroupId;
      },
    }),
    require("../../Core/Define/ConfigQuery/ResonantChainByGroupIdAndGroupIndex")),
  ResonantChainByGroupIdAndNodeType_1 =
    (Object.defineProperty(
      exports,
      "configResonantChainByGroupIdAndGroupIndex",
      {
        enumerable: !0,
        get: function () {
          return ResonantChainByGroupIdAndGroupIndex_1.configResonantChainByGroupIdAndGroupIndex;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/ResonantChainByGroupIdAndNodeType")),
  ResonantChainById_1 =
    (Object.defineProperty(exports, "configResonantChainByGroupIdAndNodeType", {
      enumerable: !0,
      get: function () {
        return ResonantChainByGroupIdAndNodeType_1.configResonantChainByGroupIdAndNodeType;
      },
    }),
    require("../../Core/Define/ConfigQuery/ResonantChainById")),
  ReviveById_1 =
    (Object.defineProperty(exports, "configResonantChainById", {
      enumerable: !0,
      get: function () {
        return ResonantChainById_1.configResonantChainById;
      },
    }),
    require("../../Core/Define/ConfigQuery/ReviveById")),
  RewardViewFromSourceAll_1 =
    (Object.defineProperty(exports, "configReviveById", {
      enumerable: !0,
      get: function () {
        return ReviveById_1.configReviveById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RewardViewFromSourceAll")),
  RewardViewFromSourceBySourceId_1 =
    (Object.defineProperty(exports, "configRewardViewFromSourceAll", {
      enumerable: !0,
      get: function () {
        return RewardViewFromSourceAll_1.configRewardViewFromSourceAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/RewardViewFromSourceBySourceId")),
  RogueActivityById_1 =
    (Object.defineProperty(exports, "configRewardViewFromSourceBySourceId", {
      enumerable: !0,
      get: function () {
        return RewardViewFromSourceBySourceId_1.configRewardViewFromSourceBySourceId;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueActivityById")),
  RogueAffixById_1 =
    (Object.defineProperty(exports, "configRogueActivityById", {
      enumerable: !0,
      get: function () {
        return RogueActivityById_1.configRogueActivityById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueAffixById")),
  RogueBuffPoolById_1 =
    (Object.defineProperty(exports, "configRogueAffixById", {
      enumerable: !0,
      get: function () {
        return RogueAffixById_1.configRogueAffixById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueBuffPoolById")),
  RogueCharacterBuffById_1 =
    (Object.defineProperty(exports, "configRogueBuffPoolById", {
      enumerable: !0,
      get: function () {
        return RogueBuffPoolById_1.configRogueBuffPoolById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueCharacterBuffById")),
  RogueCharacterById_1 =
    (Object.defineProperty(exports, "configRogueCharacterBuffById", {
      enumerable: !0,
      get: function () {
        return RogueCharacterBuffById_1.configRogueCharacterBuffById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueCharacterById")),
  RogueCurrencyById_1 =
    (Object.defineProperty(exports, "configRogueCharacterById", {
      enumerable: !0,
      get: function () {
        return RogueCharacterById_1.configRogueCharacterById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueCurrencyById")),
  RogueEffectById_1 =
    (Object.defineProperty(exports, "configRogueCurrencyById", {
      enumerable: !0,
      get: function () {
        return RogueCurrencyById_1.configRogueCurrencyById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueEffectById")),
  RogueEventById_1 =
    (Object.defineProperty(exports, "configRogueEffectById", {
      enumerable: !0,
      get: function () {
        return RogueEffectById_1.configRogueEffectById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueEventById")),
  RogueParamById_1 =
    (Object.defineProperty(exports, "configRogueEventById", {
      enumerable: !0,
      get: function () {
        return RogueEventById_1.configRogueEventById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueParamById")),
  RoguePokemonById_1 =
    (Object.defineProperty(exports, "configRogueParamById", {
      enumerable: !0,
      get: function () {
        return RogueParamById_1.configRogueParamById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoguePokemonById")),
  RoguePopularEntrieArgAll_1 =
    (Object.defineProperty(exports, "configRoguePokemonById", {
      enumerable: !0,
      get: function () {
        return RoguePokemonById_1.configRoguePokemonById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoguePopularEntrieArgAll")),
  RoguePopularEntrieArgById_1 =
    (Object.defineProperty(exports, "configRoguePopularEntrieArgAll", {
      enumerable: !0,
      get: function () {
        return RoguePopularEntrieArgAll_1.configRoguePopularEntrieArgAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoguePopularEntrieArgById")),
  RoguePopularEntrieArgBySeasonIdAndInstId_1 =
    (Object.defineProperty(exports, "configRoguePopularEntrieArgById", {
      enumerable: !0,
      get: function () {
        return RoguePopularEntrieArgById_1.configRoguePopularEntrieArgById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoguePopularEntrieArgBySeasonIdAndInstId")),
  RogueQualityConfigById_1 =
    (Object.defineProperty(
      exports,
      "configRoguePopularEntrieArgBySeasonIdAndInstId",
      {
        enumerable: !0,
        get: function () {
          return RoguePopularEntrieArgBySeasonIdAndInstId_1.configRoguePopularEntrieArgBySeasonIdAndInstId;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/RogueQualityConfigById")),
  RogueRoomTypeById_1 =
    (Object.defineProperty(exports, "configRogueQualityConfigById", {
      enumerable: !0,
      get: function () {
        return RogueQualityConfigById_1.configRogueQualityConfigById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueRoomTypeById")),
  RogueSeasonAll_1 =
    (Object.defineProperty(exports, "configRogueRoomTypeById", {
      enumerable: !0,
      get: function () {
        return RogueRoomTypeById_1.configRogueRoomTypeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueSeasonAll")),
  RogueSeasonById_1 =
    (Object.defineProperty(exports, "configRogueSeasonAll", {
      enumerable: !0,
      get: function () {
        return RogueSeasonAll_1.configRogueSeasonAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueSeasonById")),
  RogueSeasonRewardBySeasonId_1 =
    (Object.defineProperty(exports, "configRogueSeasonById", {
      enumerable: !0,
      get: function () {
        return RogueSeasonById_1.configRogueSeasonById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueSeasonRewardBySeasonId")),
  RogueTalentTreeAll_1 =
    (Object.defineProperty(exports, "configRogueSeasonRewardBySeasonId", {
      enumerable: !0,
      get: function () {
        return RogueSeasonRewardBySeasonId_1.configRogueSeasonRewardBySeasonId;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueTalentTreeAll")),
  RogueTalentTreeById_1 =
    (Object.defineProperty(exports, "configRogueTalentTreeAll", {
      enumerable: !0,
      get: function () {
        return RogueTalentTreeAll_1.configRogueTalentTreeAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueTalentTreeById")),
  RogueTalentTreeDescById_1 =
    (Object.defineProperty(exports, "configRogueTalentTreeById", {
      enumerable: !0,
      get: function () {
        return RogueTalentTreeById_1.configRogueTalentTreeById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueTalentTreeDescById")),
  RogueTokenBySeasonId_1 =
    (Object.defineProperty(exports, "configRogueTalentTreeDescById", {
      enumerable: !0,
      get: function () {
        return RogueTalentTreeDescById_1.configRogueTalentTreeDescById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RogueTokenBySeasonId")),
  RoleAnimAudioByRoleId_1 =
    (Object.defineProperty(exports, "configRogueTokenBySeasonId", {
      enumerable: !0,
      get: function () {
        return RogueTokenBySeasonId_1.configRogueTokenBySeasonId;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleAnimAudioByRoleId")),
  RoleAudioById_1 =
    (Object.defineProperty(exports, "configRoleAnimAudioByRoleId", {
      enumerable: !0,
      get: function () {
        return RoleAnimAudioByRoleId_1.configRoleAnimAudioByRoleId;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleAudioById")),
  RoleBattleViewInfoAll_1 =
    (Object.defineProperty(exports, "configRoleAudioById", {
      enumerable: !0,
      get: function () {
        return RoleAudioById_1.configRoleAudioById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleBattleViewInfoAll")),
  RoleBattleViewInfoById_1 =
    (Object.defineProperty(exports, "configRoleBattleViewInfoAll", {
      enumerable: !0,
      get: function () {
        return RoleBattleViewInfoAll_1.configRoleBattleViewInfoAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleBattleViewInfoById")),
  RoleBreachByBreachGroupId_1 =
    (Object.defineProperty(exports, "configRoleBattleViewInfoById", {
      enumerable: !0,
      get: function () {
        return RoleBattleViewInfoById_1.configRoleBattleViewInfoById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleBreachByBreachGroupId")),
  RoleBreachByBreachGroupIdAndBreachLevel_1 =
    (Object.defineProperty(exports, "configRoleBreachByBreachGroupId", {
      enumerable: !0,
      get: function () {
        return RoleBreachByBreachGroupId_1.configRoleBreachByBreachGroupId;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleBreachByBreachGroupIdAndBreachLevel")),
  RoleDescriptionById_1 =
    (Object.defineProperty(
      exports,
      "configRoleBreachByBreachGroupIdAndBreachLevel",
      {
        enumerable: !0,
        get: function () {
          return RoleBreachByBreachGroupIdAndBreachLevel_1.configRoleBreachByBreachGroupIdAndBreachLevel;
        },
      },
    ),
    require("../../Core/Define/ConfigQuery/RoleDescriptionById")),
  RoleExpItemAll_1 =
    (Object.defineProperty(exports, "configRoleDescriptionById", {
      enumerable: !0,
      get: function () {
        return RoleDescriptionById_1.configRoleDescriptionById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleExpItemAll")),
  RoleExpItemById_1 =
    (Object.defineProperty(exports, "configRoleExpItemAll", {
      enumerable: !0,
      get: function () {
        return RoleExpItemAll_1.configRoleExpItemAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleExpItemById")),
  RoleGuideActivityById_1 =
    (Object.defineProperty(exports, "configRoleExpItemById", {
      enumerable: !0,
      get: function () {
        return RoleExpItemById_1.configRoleExpItemById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleGuideActivityById")),
  RoleIconTagById_1 =
    (Object.defineProperty(exports, "configRoleGuideActivityById", {
      enumerable: !0,
      get: function () {
        return RoleGuideActivityById_1.configRoleGuideActivityById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleIconTagById")),
  RoleInfluenceAll_1 =
    (Object.defineProperty(exports, "configRoleIconTagById", {
      enumerable: !0,
      get: function () {
        return RoleIconTagById_1.configRoleIconTagById;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleInfluenceAll")),
  RoleInfluenceById_1 =
    (Object.defineProperty(exports, "configRoleInfluenceAll", {
      enumerable: !0,
      get: function () {
        return RoleInfluenceAll_1.configRoleInfluenceAll;
      },
    }),
    require("../../Core/Define/ConfigQuery/RoleInfluenceById"));
Object.defineProperty(exports, "configRoleInfluenceById", {
  enumerable: !0,
  get: function () {
    return RoleInfluenceById_1.configRoleInfluenceById;
  },
});
//# sourceMappingURL=PreloadConfigStatementPart4.js.map
