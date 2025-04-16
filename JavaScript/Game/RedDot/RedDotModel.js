"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotModel = void 0);
const Log_1 = require("../../Core/Common/Log"),
  Tree_1 = require("../../Core/Container/Tree"),
  ModelBase_1 = require("../../Core/Framework/ModelBase"),
  StringBuilder_1 = require("../../Core/Utils/StringBuilder"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  RedDotBase_1 = require("../../Game/RedDot/RedDotBase"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  RedDotAchievement_1 = require("../Module/Achievement/RedDotAchievement"),
  RedDotAchievementCategory_1 = require("../Module/Achievement/RedDotAchievementCategory"),
  RedDotActivityCorniceMeeting_1 = require("../Module/Activity/ActivityContent/CorniceMeeting/RedDotActivityCorniceMeeting"),
  RedDotActivityRun_1 = require("../Module/Activity/ActivityContent/Run/RedDotActivityRun"),
  RedDotActivityEntrance_1 = require("../Module/Activity/RedDotActivityEntrance"),
  RedDotCommonActivityPage_1 = require("../Module/Activity/RedDotCommonActivityPage"),
  RedDotItemHandBook_1 = require("../Module/HandBook/RedDotItemHandBook"),
  RedDotPhantomHandBook_1 = require("../Module/HandBook/RedDotPhantomHandBook"),
  RedDotDirectTrain_1 = require("./RedDots/Activity/DirectTrain/RedDotDirectTrain"),
  RedDotActivityRecallSignEntryButton_1 = require("./RedDots/Activity/Recall/RedDotActivityRecallSignEntryButton"),
  RedDotActivityRecallTaskEntryButton_1 = require("./RedDots/Activity/Recall/RedDotActivityRecallTaskEntryButton"),
  RedDotActivityRegressConstantTask_1 = require("./RedDots/Activity/Recall/RedDotActivityRegressConstantTask"),
  RedDotActivityRegressCultivate_1 = require("./RedDots/Activity/Recall/RedDotActivityRegressCultivate"),
  RedDotActivityRegressDoubleDrop_1 = require("./RedDots/Activity/Recall/RedDotActivityRegressDoubleDrop"),
  RedDotActivityRegressQuestionnaire_1 = require("./RedDots/Activity/Recall/RedDotActivityRegressQuestionnaire"),
  RedDotActivityRegressShopDiscount_1 = require("./RedDots/Activity/Recall/RedDotActivityRegressShopDiscount"),
  RedDotAdventureBattleButton_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureBattleButton"),
  RedDotAdventureChallengeTab_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureChallengeTab"),
  RedDotAdventureDailyActivityTab_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureDailyActivityTab"),
  RedDotAdventureFirstAward_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureFirstAward"),
  RedDotAdventureFirstAwardCategory_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureFirstAwardCategory"),
  RedDotAdventureFirstAwardResult_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureFirstAwardResult"),
  RedDotAdventureManual_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureManual"),
  RedDotAdventureNewSoundAreaTab_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureNewSoundAreaTab"),
  BabelTowerDifficultyRedDot_1 = require("./RedDots/BabelTower/BabelTowerDifficultyRedDot"),
  BabelTowerLevelRedDot_1 = require("./RedDots/BabelTower/BabelTowerLevelRedDot"),
  BabelTowerQuestRedDot_1 = require("./RedDots/BabelTower/BabelTowerQuestRedDot"),
  RedDotBattlePass_1 = require("./RedDots/BattlePass/RedDotBattlePass"),
  RedDotBattlePassAlwaysTaskTab_1 = require("./RedDots/BattlePass/RedDotBattlePassAlwaysTaskTab"),
  RedDotBattlePassDayTaskTab_1 = require("./RedDots/BattlePass/RedDotBattlePassDayTaskTab"),
  RedDotBattlePassPayButton_1 = require("./RedDots/BattlePass/RedDotBattlePassPayButton"),
  RedDotBattlePassReward_1 = require("./RedDots/BattlePass/RedDotBattlePassReward"),
  RedDotBattlePassTask_1 = require("./RedDots/BattlePass/RedDotBattlePassTask"),
  RedDotBattlePassWeekTaskTab_1 = require("./RedDots/BattlePass/RedDotBattlePassWeekTaskTab"),
  RedDotBattleViewGachaButton_1 = require("./RedDots/BattleUiSystem/RedDotBattleViewGachaButton"),
  RedDotBattleViewResonanceButton_1 = require("./RedDots/BattleUiSystem/RedDotBattleViewResonanceButton"),
  RedDotBattleViewShopButton_1 = require("./RedDots/BattleUiSystem/RedDotBattleViewShopButton"),
  BossRushRewardRedDot_1 = require("./RedDots/BossRush/BossRushRewardRedDot"),
  RedDotCalabash_1 = require("./RedDots/CalabashSystem/RedDotCalabash"),
  RedDotCalabashTab_1 = require("./RedDots/CalabashSystem/RedDotCalabashTab"),
  RedDotVisionRecovery_1 = require("./RedDots/CalabashSystem/RedDotVisionRecovery"),
  RedDotVisionRefine_1 = require("./RedDots/CalabashSystem/RedDotVisionRefine"),
  RedDotChatRoom_1 = require("./RedDots/Chat/RedDotChatRoom"),
  RedDotChatView_1 = require("./RedDots/Chat/RedDotChatView"),
  RedDotCiacconaActivity_1 = require("./RedDots/CiacconaActivity/RedDotCiacconaActivity"),
  RedDotComposeLevel_1 = require("./RedDots/ComposeSystem/RedDotComposeLevel"),
  RedDotCookerLevel_1 = require("./RedDots/CookSystem/RedDotCookerLevel"),
  CumulativeShopTaskTabRedDot_1 = require("./RedDots/CumulativeShop/CumulativeShopTaskTabRedDot"),
  RedDotDangoCommonReward_1 = require("./RedDots/DangoAbyss/RedDotDangoCommonReward"),
  RedDotDangoDevelop_1 = require("./RedDots/DangoAbyss/RedDotDangoDevelop"),
  RedDotDangoFormation_1 = require("./RedDots/DangoAbyss/RedDotDangoFormation"),
  RedDotDangoFormationRole_1 = require("./RedDots/DangoAbyss/RedDotDangoFormationRole"),
  RedDotDangoLimitReward_1 = require("./RedDots/DangoAbyss/RedDotDangoLimitReward"),
  RedDotDangoPayShop_1 = require("./RedDots/DangoAbyss/RedDotDangoPayShop"),
  RedDotDangoRole_1 = require("./RedDots/DangoAbyss/RedDotDangoRole"),
  RedDotDangoMonopoly_1 = require("./RedDots/DangoMonopoly/RedDotDangoMonopoly"),
  RedDotDangoMonopolyDiceNum_1 = require("./RedDots/DangoMonopoly/RedDotDangoMonopolyDiceNum"),
  RedDotDangoMonopolyDiceRound_1 = require("./RedDots/DangoMonopoly/RedDotDangoMonopolyDiceRound"),
  RedDotDangoMonopolyTask_1 = require("./RedDots/DangoMonopoly/RedDotDangoMonopolyTask"),
  FarmGoldRewardRedDot_1 = require("./RedDots/FarmGold/FarmGoldRewardRedDot"),
  FishingNormalTechNodeRedDot_1 = require("./RedDots/Fishing/FishingNormalTechNodeRedDot"),
  FishingRoleTechNodeRedDot_1 = require("./RedDots/Fishing/FishingRoleTechNodeRedDot"),
  FishingRoleToggleTechRedDot_1 = require("./RedDots/Fishing/FishingRoleToggleTechRedDot"),
  FishingTechNormalRedDot_1 = require("./RedDots/Fishing/FishingTechNormalRedDot"),
  FishingTechRedDot_1 = require("./RedDots/Fishing/FishingTechRedDot"),
  FishingTechRoleRedDot_1 = require("./RedDots/Fishing/FishingTechRoleRedDot"),
  FragmentMemoryCollectRewardRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryCollectRewardRedDot"),
  FragmentMemoryEntranceRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryEntranceRedDot"),
  FragmentMemoryTopicCollectRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryTopicCollectRedDot"),
  FragmentMemoryTopicRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryTopicRedDot"),
  RedDotFriendNewApplication_1 = require("./RedDots/FriendSystem/RedDotFriendNewApplication"),
  RedDotFunctionAdventureGuide_1 = require("./RedDots/FunctionMenu/RedDotFunctionAdventureGuide"),
  RedDotFunctionFriend_1 = require("./RedDots/FunctionMenu/RedDotFunctionFriend"),
  RedDotFunctionInventory_1 = require("./RedDots/FunctionMenu/RedDotFunctionInventory"),
  RedDotFunctionKuroStreet_1 = require("./RedDots/FunctionMenu/RedDotFunctionKuroStreet"),
  RedDotFunctionMail_1 = require("./RedDots/FunctionMenu/RedDotFunctionMail"),
  RedDotFunctionMailBind_1 = require("./RedDots/FunctionMenu/RedDotFunctionMailBind"),
  RedDotFunctionMap_1 = require("./RedDots/FunctionMenu/RedDotFunctionMap"),
  RedDotFunctionNotice_1 = require("./RedDots/FunctionMenu/RedDotFunctionNotice"),
  RedDotFunctionPayShop_1 = require("./RedDots/FunctionMenu/RedDotFunctionPayShop"),
  RedDotFunctionPhantom_1 = require("./RedDots/FunctionMenu/RedDotFunctionPhantom"),
  RedDotFunctionPhantomExploreSet_1 = require("./RedDots/FunctionMenu/RedDotFunctionPhantomExploreSet"),
  RedDotFunctionPhotograph_1 = require("./RedDots/FunctionMenu/RedDotFunctionPhotograph"),
  RedDotFunctionRole_1 = require("./RedDots/FunctionMenu/RedDotFunctionRole"),
  RedDotFunctionTutorial_1 = require("./RedDots/FunctionMenu/RedDotFunctionTutorial"),
  RedDotInfluenceReputation_1 = require("./RedDots/Influence/RedDotInfluenceReputation"),
  RedDotInfluenceReward_1 = require("./RedDots/Influence/RedDotInfluenceReward"),
  RedDotInventoryCard_1 = require("./RedDots/Inventory/RedDotInventoryCard"),
  RedDotInventoryCollection_1 = require("./RedDots/Inventory/RedDotInventoryCollection"),
  RedDotInventoryCommon_1 = require("./RedDots/Inventory/RedDotInventoryCommon"),
  RedDotInventoryMaterial_1 = require("./RedDots/Inventory/RedDotInventoryMaterial"),
  RedDotInventoryMissionItem_1 = require("./RedDots/Inventory/RedDotInventoryMissionItem"),
  RedDotInventoryPhantom_1 = require("./RedDots/Inventory/RedDotInventoryPhantom"),
  RedDotInventorySpecialItem_1 = require("./RedDots/Inventory/RedDotInventorySpecialItem"),
  RedDotInventoryVirtual_1 = require("./RedDots/Inventory/RedDotInventoryVirtual"),
  RedDotInventoryWeapon_1 = require("./RedDots/Inventory/RedDotInventoryWeapon"),
  RedDotInviteNewbie_1 = require("./RedDots/InviteNewbie/RedDotInviteNewbie"),
  RedDotMailBoxFilter_1 = require("./RedDots/Mail/RedDotMailBoxFilter"),
  RedDotMailBoxImportantFilter_1 = require("./RedDots/Mail/RedDotMailBoxImportantFilter"),
  RedDotMailBoxUnScannedFilter_1 = require("./RedDots/Mail/RedDotMailBoxUnScannedFilter"),
  RedDotMapAreaBoxReward_1 = require("./RedDots/Map/RedDotMapAreaBoxReward"),
  RedDotMapAreaExplore_1 = require("./RedDots/Map/RedDotMapAreaExplore"),
  RedDotMoonChasingAllQuest_1 = require("./RedDots/MoonChasing/RedDotMoonChasingAllQuest"),
  RedDotMoonChasingBranchTab_1 = require("./RedDots/MoonChasing/RedDotMoonChasingBranchTab"),
  RedDotMoonChasingBuilding_1 = require("./RedDots/MoonChasing/RedDotMoonChasingBuilding"),
  RedDotMoonChasingDelegation_1 = require("./RedDots/MoonChasing/RedDotMoonChasingDelegation"),
  RedDotMoonChasingHandbook_1 = require("./RedDots/MoonChasing/RedDotMoonChasingHandbook"),
  RedDotMoonChasingMainlineTab_1 = require("./RedDots/MoonChasing/RedDotMoonChasingMainlineTab"),
  RedDotMoonChasingReward_1 = require("./RedDots/MoonChasing/RedDotMoonChasingReward"),
  RedDotMoonChasingRewardAndShop_1 = require("./RedDots/MoonChasing/RedDotMoonChasingRewardAndShop"),
  RedDotMoonChasingRole_1 = require("./RedDots/MoonChasing/RedDotMoonChasingRole"),
  RedDotMoonChasingShop_1 = require("./RedDots/MoonChasing/RedDotMoonChasingShop"),
  MowingRiskRedDot_1 = require("./RedDots/MowingRisk/MowingRiskRedDot"),
  MowingTowerRewardRedDot_1 = require("./RedDots/MowingTower/MowingTowerRewardRedDot"),
  PersonalBirthdayRedDot_1 = require("./RedDots/Personal/PersonalBirthdayRedDot"),
  PersonalCardRedDot_1 = require("./RedDots/Personal/PersonalCardRedDot"),
  PersonalizeInfoRedDot_1 = require("./RedDots/Personal/PersonalizeInfoRedDot"),
  PersonalTitleRedDot_1 = require("./RedDots/Personal/PersonalTitleRedDot"),
  PreDownloadRedDot_1 = require("./RedDots/PreDownload/PreDownloadRedDot"),
  RedDotBattleViewQuestBtn_1 = require("./RedDots/Quest/RedDotBattleViewQuestBtn"),
  RedDotFunctionViewQuestBtn_1 = require("./RedDots/Quest/RedDotFunctionViewQuestBtn"),
  RedDotQuestViewItem_1 = require("./RedDots/Quest/RedDotQuestViewItem"),
  RedDotQuestViewTab_1 = require("./RedDots/Quest/RedDotQuestViewTab"),
  RedDotRacingBetsActivityInternalReward_1 = require("./RedDots/RacingBets/RedDotRacingBetsActivityInternalReward"),
  RedDotRacingBetsActivityReward_1 = require("./RedDots/RacingBets/RedDotRacingBetsActivityReward"),
  RedDotBattleViewMenu_1 = require("./RedDots/RedDotBattleViewMenu"),
  RedDotTest_1 = require("./RedDots/RedDotTest"),
  RedDotRoguelikeAchievement_1 = require("./RedDots/Roguelike/RedDotRoguelikeAchievement"),
  RedDotRoguelikeAchievementGroup_1 = require("./RedDots/Roguelike/RedDotRoguelikeAchievementGroup"),
  RedDotRoguelikeShop_1 = require("./RedDots/Roguelike/RedDotRoguelikeShop"),
  RedDotRoguelikeSkillCanUnlock_1 = require("./RedDots/Roguelike/RedDotRoguelikeSkillCanUnlock"),
  RedDotRogueResEnding_1 = require("./RedDots/RogueRes/RedDotRogueResEnding"),
  RedDotRogueResIllustrated_1 = require("./RedDots/RogueRes/RedDotRogueResIllustrated"),
  RedDotRogueResIllustratedMap_1 = require("./RedDots/RogueRes/RedDotRogueResIllustratedMap"),
  RedDotRogueResIllustratedNormal_1 = require("./RedDots/RogueRes/RedDotRogueResIllustratedNormal"),
  RedDotRogueResIllustratedTokenTab_1 = require("./RedDots/RogueRes/RedDotRogueResIllustratedTokenTab"),
  RedDotRogueResInst_1 = require("./RedDots/RogueRes/RedDotRogueResInst"),
  RedDotRogueResShop_1 = require("./RedDots/RogueRes/RedDotRogueResShop"),
  RedDotRogueResSkillTree_1 = require("./RedDots/RogueRes/RedDotRogueResSkillTree"),
  RedDotRogueResTask_1 = require("./RedDots/RogueRes/RedDotRogueResTask"),
  RedDotRoleHandBook_1 = require("./RedDots/RoleHandBook/RedDotRoleHandBook"),
  RedDotRoleSelectionList_1 = require("./RedDots/RoleSystem/RedDotRoleSelectionList"),
  RedDotRoleSystemRoleList_1 = require("./RedDots/RoleSystem/RedDotRoleSystemRoleList"),
  RedDotAttributeTab_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotAttributeTab"),
  RedDotRoleBreakUp_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotRoleBreakUp"),
  RedDotRoleLevelUp_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotRoleLevelUp"),
  RedDotRoleSkin_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotRoleSkin"),
  RedDotResonanceTab_1 = require("./RedDots/RoleSystem/RoleResonance/RedDotResonanceTab"),
  RedDotRoleWeaponBreakUp_1 = require("./RedDots/RoleSystem/RoleWeapon/RedDotRoleWeaponBreakUp"),
  RedDotFlySkinChildTab_1 = require("./RedDots/RoleSystem/Skin/RedDotFlySkinChildTab"),
  RedDotFlySkinTab_1 = require("./RedDots/RoleSystem/Skin/RedDotFlySkinTab"),
  CustomerServerRedDot_1 = require("./RedDots/Sdk/CustomerServerRedDot"),
  RedDotShipTower_1 = require("./RedDots/ShipTower/RedDotShipTower"),
  RedDotShipTowerReward_1 = require("./RedDots/ShipTower/RedDotShipTowerReward"),
  PayShopInstanceRedDot_1 = require("./RedDots/Shop/PayShopInstanceRedDot"),
  PayShopTabRedDot_1 = require("./RedDots/Shop/PayShopTabRedDot"),
  RedDotSpring25_1 = require("./RedDots/Spring25/RedDotSpring25"),
  TowerDefenceRewardRedDot_1 = require("./RedDots/TowerDefence/TowerDefenceRewardRedDot"),
  RedDotTowerReward_1 = require("./RedDots/TowerRewrad/RedDotTowerReward"),
  RedDotTowerRewardByDifficulties_1 = require("./RedDots/TowerRewrad/RedDotTowerRewardByDifficulties"),
  RedDotTutorialType_1 = require("./RedDots/Tutorial/RedDotTutorialType"),
  VisionGridRedDot_1 = require("./RedDots/Vision/VisionGridRedDot"),
  VisionIdentifyRedDot_1 = require("./RedDots/Vision/VisionIdentifyRedDot"),
  VisionLevelUpSettingRedDot_1 = require("./RedDots/Vision/VisionLevelUpSettingRedDot"),
  VisionOneKeyEquipRedDot_1 = require("./RedDots/Vision/VisionOneKeyEquipRedDot"),
  VisionTabRedDot_1 = require("./RedDots/Vision/VisionTabRedDot"),
  RedDotWeeklyRogueScoreReward_1 = require("./RedDots/WeeklyRogue/RedDotWeeklyRogueScoreReward");
class RedDotModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.jar = new Map());
  }
  OnInit() {
    return (
      this.qp("Test", new RedDotTest_1.RedDotTest()),
      this.qp(
        "BattleViewMenu",
        new RedDotBattleViewMenu_1.RedDotBattleViewMenu(),
      ),
      this.qp(
        "BattleViewResonanceButton",
        new RedDotBattleViewResonanceButton_1.RedDotBattleViewResonanceButton(),
      ),
      this.qp(
        "BattleViewShopButton",
        new RedDotBattleViewShopButton_1.RedDotBattleViewShopButton(),
      ),
      this.qp(
        "BattleViewGachaButton",
        new RedDotBattleViewGachaButton_1.RedDotBattleViewGachaButton(),
      ),
      this.qp("MailFilterAll", new RedDotMailBoxFilter_1.RedDotMailBoxFilter()),
      this.qp(
        "FilterImportant",
        new RedDotMailBoxImportantFilter_1.RedDotMailBoxImportantFilter(),
      ),
      this.qp(
        "FilterUnScanned",
        new RedDotMailBoxUnScannedFilter_1.RedDotMailBoxUnScannedFilter(),
      ),
      this.qp(
        "RoleSystemRoleList",
        new RedDotRoleSystemRoleList_1.RedDotRoleSystemRoleList(),
      ),
      this.qp(
        "RoleAttributeTab",
        new RedDotAttributeTab_1.RedDotAttributeTab(),
      ),
      this.qp(
        "RoleAttributeTabLevelUp",
        new RedDotRoleLevelUp_1.RedDotRoleLevelUp(),
      ),
      this.qp("RoleSkin", new RedDotRoleSkin_1.RedDotRoleSkin()),
      this.qp("FlySkinTab", new RedDotFlySkinTab_1.RedDotFlySkinTab()),
      this.qp(
        "FlySkinChildTab",
        new RedDotFlySkinChildTab_1.RedDotFlySkinChildTab(),
      ),
      this.qp(
        "RoleAttributeTabBreakUp",
        new RedDotRoleBreakUp_1.RedDotRoleBreakUp(),
      ),
      this.qp(
        "RoleWeaponTabBreakUp",
        new RedDotRoleWeaponBreakUp_1.RedDotRoleWeaponBreakUp(),
      ),
      this.qp(
        "RoleResonanceTab",
        new RedDotResonanceTab_1.RedDotResonanceTab(),
      ),
      this.qp("FunctionRole", new RedDotFunctionRole_1.RedDotFunctionRole()),
      this.qp(
        "FunctionPhantom",
        new RedDotFunctionPhantom_1.RedDotFunctionPhantom(),
      ),
      this.qp(
        "FunctionGacha",
        new RedDotBattleViewGachaButton_1.RedDotBattleViewGachaButton(),
      ),
      this.qp(
        "FunctionTutorial",
        new RedDotFunctionTutorial_1.RedDotFunctionTutorial(),
      ),
      this.qp(
        "FunctionAdventure",
        new RedDotFunctionAdventureGuide_1.RedDotFunctionAdventureGuide(),
      ),
      this.qp(
        "FunctionInventory",
        new RedDotFunctionInventory_1.RedDotFunctionInventory(),
      ),
      this.qp("FunctionMail", new RedDotFunctionMail_1.RedDotFunctionMail()),
      this.qp(
        "FunctionNotice",
        new RedDotFunctionNotice_1.RedDotFunctionNotice(),
      ),
      this.qp(
        "FunctionPayShop",
        new RedDotFunctionPayShop_1.RedDotFunctionPayShop(),
      ),
      this.qp(
        "FunctionPhantomExploreSet",
        new RedDotFunctionPhantomExploreSet_1.RedDotFunctionPhantomExploreSet(),
      ),
      this.qp(
        "FunctionPhotograph",
        new RedDotFunctionPhotograph_1.RedDotFunctionPhotograph(),
      ),
      this.qp(
        "AdventureManual",
        new RedDotAdventureManual_1.RedDotAdventureManual(),
      ),
      this.qp(
        "AdventureBattleButton",
        new RedDotAdventureBattleButton_1.RedDotAdventureBattleButtonItem(),
      ),
      this.qp(
        "AdventureFirstAward",
        new RedDotAdventureFirstAward_1.RedDotAdventureFirstAward(),
      ),
      this.qp(
        "AdventureFirstAwardCategory",
        new RedDotAdventureFirstAwardCategory_1.RedDotAdventureFirstAwardCategory(),
      ),
      this.qp(
        "AdventureFirstAwardResult",
        new RedDotAdventureFirstAwardResult_1.RedDotAdventureFirstAwardResult(),
      ),
      this.qp(
        "AdventureDailyActivityTab",
        new RedDotAdventureDailyActivityTab_1.RedDotAdventureDailyActivityTab(),
      ),
      this.qp(
        "AdventureNewSoundAreaTab",
        new RedDotAdventureNewSoundAreaTab_1.RedDotAdventureNewSoundAreaTab(),
      ),
      this.qp(
        "AdventureChallengeTab",
        new RedDotAdventureChallengeTab_1.RedDotAdventureChallengeTab(),
      ),
      this.qp("FunctionCalabash", new RedDotCalabash_1.RedDotCalabashUpdate()),
      this.qp("CalabashTab", new RedDotCalabashTab_1.RedDotCalabashTab()),
      this.qp(
        "VisionRecovery",
        new RedDotVisionRecovery_1.RedDotVisionRecovery(),
      ),
      this.qp("VisionRefine", new RedDotVisionRefine_1.RedDotVisionRefine()),
      this.qp(
        "FunctionFriend",
        new RedDotFunctionFriend_1.RedDotFunctionFriend(),
      ),
      this.qp(
        "FriendNewApplication",
        new RedDotFriendNewApplication_1.RedDotFriendNewApplication(),
      ),
      this.qp("ChatView", new RedDotChatView_1.RedDotChatView()),
      this.qp("ChatRoom", new RedDotChatRoom_1.RedDotChatRoom()),
      this.qp("TutorialTypeNew", new RedDotTutorialType_1.RedDotTutorialType()),
      this.qp(
        "RoleSelectionList",
        new RedDotRoleSelectionList_1.RedDotRoleSelectionList(),
      ),
      this.qp(
        "InfluenceReputation",
        new RedDotInfluenceReputation_1.RedDotInfluenceReputation(),
      ),
      this.qp(
        "InfluenceReward",
        new RedDotInfluenceReward_1.RedDotInfluenceReward(),
      ),
      this.qp("CookerLevel", new RedDotCookerLevel_1.RedDotCookerLevel()),
      this.qp("CookerLevelMain", new RedDotCookerLevel_1.RedDotCookerLevel()),
      this.qp("BattlePass", new RedDotBattlePass_1.RedDotBattlePass()),
      this.qp(
        "BattlePassTask",
        new RedDotBattlePassTask_1.RedDotBattlePassTask(),
      ),
      this.qp(
        "BattlePassReward",
        new RedDotBattlePassReward_1.RedDotBattlePassReward(),
      ),
      this.qp(
        "BattlePassDayTaskTab",
        new RedDotBattlePassDayTaskTab_1.RedDotBattlePassDayTaskTab(),
      ),
      this.qp(
        "BattlePassWeekTaskTab",
        new RedDotBattlePassWeekTaskTab_1.RedDotBattlePassWeekTaskTab(),
      ),
      this.qp(
        "BattlePassAlwaysTaskTab",
        new RedDotBattlePassAlwaysTaskTab_1.RedDotBattlePassAlwaysTaskTab(),
      ),
      this.qp("RoleHandBook", new RedDotRoleHandBook_1.RedDotRoleHandBook()),
      this.qp(
        "ComposeReagentProduction",
        new RedDotComposeLevel_1.RedDotComposeLevel(),
      ),
      this.qp("ItemHandBook", new RedDotItemHandBook_1.RedDotItemHandBook()),
      this.qp(
        "PhantomHandBook",
        new RedDotPhantomHandBook_1.RedDotPhantomHandBook(),
      ),
      this.qp("Achievement", new RedDotAchievement_1.RedDotAchievement()),
      this.qp(
        "AchievementCategory",
        new RedDotAchievementCategory_1.RedDotAchievementCategory(),
      ),
      this.qp(
        "ActivityEntrance",
        new RedDotActivityEntrance_1.RedDotActivityEntrance(),
      ),
      this.qp(
        "CommonActivityPage",
        new RedDotCommonActivityPage_1.RedDotCommonActivityPage(),
      ),
      this.qp("ActivityRun", new RedDotActivityRun_1.RedDotActivityRun()),
      this.qp(
        "BattleViewQuestButton",
        new RedDotBattleViewQuestBtn_1.RedDotBattleViewQuestBtn(),
      ),
      this.qp("QuestViewItem", new RedDotQuestViewItem_1.RedDotQuestViewItem()),
      this.qp("QuestTab", new RedDotQuestViewTab_1.RedDotQuestViewTab()),
      this.qp(
        "FunctionViewQuestBtn",
        new RedDotFunctionViewQuestBtn_1.RedDotFunctionViewQuestBtn(),
      ),
      this.qp(
        "InventoryVirtual",
        new RedDotInventoryVirtual_1.RedDotInventoryVirtual(),
      ),
      this.qp(
        "InventoryCommon",
        new RedDotInventoryCommon_1.RedDotInventoryCommon(),
      ),
      this.qp(
        "InventoryWeapon",
        new RedDotInventoryWeapon_1.RedDotInventoryWeapon(),
      ),
      this.qp(
        "InventoryPhantom",
        new RedDotInventoryPhantom_1.RedDotInventoryPhantom(),
      ),
      this.qp(
        "InventoryCollection",
        new RedDotInventoryCollection_1.RedDotInventoryCollection(),
      ),
      this.qp(
        "InventoryMaterial",
        new RedDotInventoryMaterial_1.RedDotInventoryMaterial(),
      ),
      this.qp(
        "InventoryMission",
        new RedDotInventoryMissionItem_1.RedDotInventoryMissionItem(),
      ),
      this.qp(
        "InventorySpecial",
        new RedDotInventorySpecialItem_1.RedDotInventorySpecialItem(),
      ),
      this.qp("InventoryCard", new RedDotInventoryCard_1.RedDotInventoryCard()),
      this.qp("TowerReward", new RedDotTowerReward_1.RedDotTowerReward()),
      this.qp(
        "TowerRewardByDifficulties",
        new RedDotTowerRewardByDifficulties_1.RedDotTowerRewardByDifficulties(),
      ),
      this.qp("IdentifyTab", new VisionIdentifyRedDot_1.VisionIdentifyRedDot()),
      this.qp(
        "VisionOneKeyEquip",
        new VisionOneKeyEquipRedDot_1.VisionOneKeyEquipRedDot(),
      ),
      this.qp("VisionTabRedDot", new VisionTabRedDot_1.VisionTabRedDot()),
      this.qp("VisionGridRedDot", new VisionGridRedDot_1.VisionGridRedDot()),
      this.qp(
        "PayShopInstance",
        new PayShopInstanceRedDot_1.PayShopInstanceRedDot(),
      ),
      this.qp("PayShopTab", new PayShopTabRedDot_1.PayShopTabRedDot()),
      this.qp(
        "RogueSkillUnlock",
        new RedDotRoguelikeSkillCanUnlock_1.RedDotRoguelikeSkillCanUnlock(),
      ),
      this.qp(
        "RoguelikeAchievement",
        new RedDotRoguelikeAchievement_1.RedDotRoguelikeAchievement(),
      ),
      this.qp("RoguelikeShop", new RedDotRoguelikeShop_1.RedDotRoguelikeShop()),
      this.qp(
        "RoguelikeAchievementGroup",
        new RedDotRoguelikeAchievementGroup_1.RedDotRoguelikeAchievementGroup(),
      ),
      this.qp(
        "BossRushReward",
        new BossRushRewardRedDot_1.BossRushRewardRedDot(),
      ),
      this.qp(
        "MowingTowerReward",
        new MowingTowerRewardRedDot_1.MowingTowerRewardRedDot(),
      ),
      this.qp(
        "TowerDefenseReward",
        new TowerDefenceRewardRedDot_1.TowerDefenseRewardRedDot(),
      ),
      this.qp(
        "TowerDefenseInstance",
        new TowerDefenceRewardRedDot_1.TowerDefenseInstanceRedDot(),
      ),
      this.qp(
        "RedDotMowingRiskReward",
        new MowingRiskRedDot_1.RedDotMowingRiskReward(),
      ),
      this.qp(
        "RedDotMowingRiskBuffAll",
        new MowingRiskRedDot_1.RedDotMowingRiskBuffAll(),
      ),
      this.qp(
        "CustomerService",
        new CustomerServerRedDot_1.CustomerServerRedDot(),
      ),
      this.qp(
        "FragmentMemoryReward",
        new FragmentMemoryCollectRewardRedDot_1.FragmentMemoryCollectRewardRedDot(),
      ),
      this.qp(
        "FragmentMemoryEntrance",
        new FragmentMemoryEntranceRedDot_1.FragmentMemoryEntranceRedDot(),
      ),
      this.qp(
        "FragmentMemoryTopic",
        new FragmentMemoryTopicRedDot_1.FragmentMemoryTopicRedDot(),
      ),
      this.qp(
        "FragmentMemoryTopicCollectRedDot",
        new FragmentMemoryTopicCollectRedDot_1.FragmentMemoryTopicCollectRedDot(),
      ),
      this.qp(
        "BattlePassPayButton",
        new RedDotBattlePassPayButton_1.RedDotBattlePassPayButton(),
      ),
      this.qp(
        "PersonalInfo",
        new PersonalizeInfoRedDot_1.PersonalizeInfoRedDot(),
      ),
      this.qp("PersonalCard", new PersonalCardRedDot_1.PersonalCardRedDot()),
      this.qp("PersonalTitle", new PersonalTitleRedDot_1.PersonalTitleRedDot()),
      this.qp(
        "PersonalBirthday",
        new PersonalBirthdayRedDot_1.PersonalBirthdayRedDot(),
      ),
      this.qp(
        "ActivityRecallSignEntry",
        new RedDotActivityRecallSignEntryButton_1.RedDotActivityRecallSignEntryButton(),
      ),
      this.qp(
        "ActivityRecallTask",
        new RedDotActivityRecallTaskEntryButton_1.RedDotActivityRecallTaskEntryButton(),
      ),
      this.qp(
        "ActivityRegressQuestionnaire",
        new RedDotActivityRegressQuestionnaire_1.RedDotActivityRegressQuestionnaire(),
      ),
      this.qp(
        "ActivityRegressShopDiscount",
        new RedDotActivityRegressShopDiscount_1.RedDotActivityRegressShopDiscount(),
      ),
      this.qp(
        "ActivityRegressDoubleDrop",
        new RedDotActivityRegressDoubleDrop_1.RedDotActivityRegressDoubleDrop(),
      ),
      this.qp(
        "ActivityRegressCultivate",
        new RedDotActivityRegressCultivate_1.RedDotActivityRegressCultivate(),
      ),
      this.qp(
        "ActivityRegressConstantTask",
        new RedDotActivityRegressConstantTask_1.RedDotActivityRegressConstantTask(),
      ),
      this.qp(
        "VisionLevelUpSetting",
        new VisionLevelUpSettingRedDot_1.VisionLevelUpSettingRedDot(),
      ),
      this.qp(
        "MoonChasingAllQuest",
        new RedDotMoonChasingAllQuest_1.RedDotMoonChasingAllQuest(),
      ),
      this.qp(
        "MoonChasingBranchTab",
        new RedDotMoonChasingBranchTab_1.RedDotMoonChasingBranchTab(),
      ),
      this.qp(
        "MoonChasingMainlineTab",
        new RedDotMoonChasingMainlineTab_1.RedDotMoonChasingMainlineTab(),
      ),
      this.qp(
        "MoonChasingHandbook",
        new RedDotMoonChasingHandbook_1.RedDotMoonChasingHandbook(),
      ),
      this.qp(
        "MoonChasingReward",
        new RedDotMoonChasingReward_1.RedDotMoonChasingReward(),
      ),
      this.qp(
        "MoonChasingShop",
        new RedDotMoonChasingShop_1.RedDotMoonChasingShop(),
      ),
      this.qp(
        "MoonChasingRewardAndShop",
        new RedDotMoonChasingRewardAndShop_1.RedDotMoonChasingRewardAndShop(),
      ),
      this.qp(
        "MoonChasingDelegation",
        new RedDotMoonChasingDelegation_1.RedDotMoonChasingDelegation(),
      ),
      this.qp(
        "MoonChasingRole",
        new RedDotMoonChasingRole_1.RedDotMoonChasingRole(),
      ),
      this.qp(
        "MoonChasingBuilding",
        new RedDotMoonChasingBuilding_1.RedDotMoonChasingBuilding(),
      ),
      this.qp(
        "Spring25AllLetter",
        new RedDotSpring25_1.RedDotSpring25AllLetter(),
      ),
      this.qp("Spring25Reward", new RedDotSpring25_1.RedDotSpring25Reward()),
      this.qp("Spring25Invite", new RedDotSpring25_1.RedDotSpring25Invite()),
      this.qp("Spring25Enter", new RedDotSpring25_1.RedDotSpring25Enter()),
      this.qp(
        "ActivityCorniceMeeting",
        new RedDotActivityCorniceMeeting_1.RedDotActivityCorniceMeeting(),
      ),
      this.qp(
        "FunctionMailBind",
        new RedDotFunctionMailBind_1.RedDotFunctionMailBind(),
      ),
      this.qp(
        "FunctionKuroStreet",
        new RedDotFunctionKuroStreet_1.RedDotFunctionKuroStreet(),
      ),
      this.qp(
        "ActivityDirectTrain",
        new RedDotDirectTrain_1.RedDotDirectTrain(),
      ),
      this.qp("FunctionMap", new RedDotFunctionMap_1.RedDotFunctionMap()),
      this.qp(
        "MapAreaExplore",
        new RedDotMapAreaExplore_1.RedDotMapAreaExplore(),
      ),
      this.qp(
        "MapAreaBoxReward",
        new RedDotMapAreaBoxReward_1.RedDotMapAreaBoxReward(),
      ),
      this.qp(
        "WeeklyRogueScoreReward",
        new RedDotWeeklyRogueScoreReward_1.RedDotWeeklyRogueScoreReward(),
      ),
      this.qp(
        "FarmGoldReward",
        new FarmGoldRewardRedDot_1.FarmGoldRewardRedDot(),
      ),
      this.qp("FishingTech", new FishingTechRedDot_1.FishingTechRedDot()),
      this.qp(
        "FishingNormalTechNode",
        new FishingNormalTechNodeRedDot_1.FishingNormalTechNodeRedDot(),
      ),
      this.qp(
        "FishingRoleTechNode",
        new FishingRoleTechNodeRedDot_1.FishingRoleTechNodeRedDot(),
      ),
      this.qp(
        "FishingRoleToggleTech",
        new FishingRoleToggleTechRedDot_1.FishingRoleToggleTechRedDot(),
      ),
      this.qp(
        "FishingRoleTech",
        new FishingTechRoleRedDot_1.FishingTechRoleRedDot(),
      ),
      this.qp(
        "FishingNormalTech",
        new FishingTechNormalRedDot_1.FishingTechNormalRedDot(),
      ),
      this.qp("ShipTower", new RedDotShipTower_1.RedDotShipTower()),
      this.qp(
        "ShipTowerReward",
        new RedDotShipTowerReward_1.RedDotShipTowerReward(),
      ),
      this.qp("PreDownload", new PreDownloadRedDot_1.RedDotPreDownload()),
      this.qp(
        "PreDownloadComplete",
        new PreDownloadRedDot_1.RedDotPreDownloadComplete(),
      ),
      this.qp("InviteNewbie", new RedDotInviteNewbie_1.RedDotInviteNewbie()),
      this.qp(
        "BabelTowerQuestRedDot",
        new BabelTowerQuestRedDot_1.BabelTowerQuestRedDot(),
      ),
      this.qp(
        "BabelTowerNewLevelDifficulty",
        new BabelTowerDifficultyRedDot_1.BabelTowerDifficultyRedDot(),
      ),
      this.qp(
        "BabelTowerNewLevel",
        new BabelTowerLevelRedDot_1.BabelTowerLevelRedDot(),
      ),
      this.qp(
        "CiacconaProgressReward",
        new RedDotCiacconaActivity_1.RedDotCiacconaProgressReward(),
      ),
      this.qp(
        "CiacconaEndingReward",
        new RedDotCiacconaActivity_1.RedDotCiacconaEndingReward(),
      ),
      this.qp(
        "CiacconaSubEndingReward",
        new RedDotCiacconaActivity_1.RedDotCiacconaSubEndingReward(),
      ),
      this.qp(
        "RogueResIllustratedTokenTab",
        new RedDotRogueResIllustratedTokenTab_1.RedDotRogueResIllustratedTokenTab(),
      ),
      this.qp(
        "RogueResIllustratedNormalTab",
        new RedDotRogueResIllustratedNormal_1.RedDotRogueResIllustratedNormal(),
      ),
      this.qp(
        "RogueResIllustratedMapTab",
        new RedDotRogueResIllustratedMap_1.RedDotRogueResIllustratedMap(),
      ),
      this.qp(
        "RogueResIllustrated",
        new RedDotRogueResIllustrated_1.RedDotRogueResIllustrated(),
      ),
      this.qp("RogueResTask", new RedDotRogueResTask_1.RedDotRogueResTask()),
      this.qp("RogueResShop", new RedDotRogueResShop_1.RedDotRogueResShop()),
      this.qp("RogueResInst", new RedDotRogueResInst_1.RedDotRogueResInst()),
      this.qp(
        "RogueResSkillTree",
        new RedDotRogueResSkillTree_1.RedDotRogueResSkillTree(),
      ),
      this.qp(
        "RogueResEnding",
        new RedDotRogueResEnding_1.RedDotRogueResEnding(),
      ),
      this.qp("DangoMonopoly", new RedDotDangoMonopoly_1.RedDotDangoMonopoly()),
      this.qp(
        "DangoMonopolyTask",
        new RedDotDangoMonopolyTask_1.RedDotDangoMonopolyTask(),
      ),
      this.qp(
        "DangoMonopolyDiceNum",
        new RedDotDangoMonopolyDiceNum_1.RedDotDangoMonopolyDiceNum(),
      ),
      this.qp(
        "DangoMonopolyRound",
        new RedDotDangoMonopolyDiceRound_1.RedDotDangoMonopolyRound(),
      ),
      this.qp(
        "RedDotDangoCommonReward",
        new RedDotDangoCommonReward_1.RedDotDangoCommonReward(),
      ),
      this.qp(
        "RedDotDangoLimitReward",
        new RedDotDangoLimitReward_1.RedDotDangoLimitReward(),
      ),
      this.qp(
        "RedDotDangoPayShop",
        new RedDotDangoPayShop_1.RedDotDangoPayShop(),
      ),
      this.qp(
        "RedDotDangoDevelop",
        new RedDotDangoDevelop_1.RedDotDangoDevelop(),
      ),
      this.qp("RedDotDangoRole", new RedDotDangoRole_1.RedDotDangoRole()),
      this.qp(
        "RedDotDangoFormation",
        new RedDotDangoFormation_1.RedDotDangoFormation(),
      ),
      this.qp(
        "RedDotDangoFormationRole",
        new RedDotDangoFormationRole_1.RedDotDangoFormationRole(),
      ),
      this.qp(
        "RedDotRacingBetsActivityReward",
        new RedDotRacingBetsActivityReward_1.RedDotRacingBetsActivityReward(),
      ),
      this.qp(
        "RedDotRacingBetsActivityInternalReward",
        new RedDotRacingBetsActivityInternalReward_1.RedDotRacingBetsActivityInternalReward(),
      ),
      this.qp(
        "CumulativeShopTaskTabRedDot",
        new CumulativeShopTaskTabRedDot_1.CumulativeShopTaskTabRedDot(),
      ),
      this.War(),
      !0
    );
  }
  qp(e, t) {
    t.Init(e), this.Kar(e, t);
  }
  War() {
    var e,
      t,
      o = ConfigManager_1.ConfigManager.RedDotConfig.GetRelativeNameMap();
    for ([e, t] of this.jar) {
      var i = t.Element.GetParentName() ?? o.get(e);
      void 0 === i ||
        StringUtils_1.StringUtils.IsEmpty(i) ||
        ((i = this.jar.get(i)) && i.AddChild(t));
    }
  }
  Kar(e, t) {
    let o = this.jar.get(e);
    return o || ((o = new Tree_1.Tree(t)), this.jar.set(e, o)), o;
  }
  GetRedDotTree(e) {
    var t = this.jar.get(e);
    if (t) return t;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RedDot", 16, "获取红点树失败，当前红点未注册！", [
        "红点名称",
        e,
      ]);
  }
  GetRedDot(e) {
    var t = this.jar.get(e)?.Element;
    if (t) return t;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RedDot", 16, "获取红点失败，当前红点未注册！", [
        "红点名称",
        e,
      ]);
  }
  Qar(e, t) {
    var o;
    t.add(e);
    for ([o] of this.GetRedDotTree(e.Name).ChildMap) this.Qar(o, t);
  }
  LogAllRedDotTree(e) {
    e = this.GetRedDot(e);
    if (e) {
      var t = new Set(),
        o = (this.Qar(e, t), new StringBuilder_1.StringBuilder());
      for (const i of t) o.Append(i.ToRedDotString());
      Log_1.Log.CheckInfo() && Log_1.Log.Info("RedDot", 10, o.ToString());
    }
  }
  LogAllRedDotState(e) {
    var t = this.GetRedDot(e);
    if (t) {
      var o = new Set();
      this.Qar(t, o),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RedDot",
            69,
            "===========开始打印红点状态===========",
            ["Name", e],
          );
      for (const i of o) i.PrintStateDebugString();
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("RedDot", 69, "===========结束打印红点状态===========", [
          "Name",
          e,
        ]);
    }
  }
  SwitchAllRedDot(e) {
    RedDotBase_1.RedDotData.StateByGm = e;
    var t = new Set();
    for (const i of this.jar.values()) {
      var o = i.Element;
      t.add(o);
    }
    for (const n of t) n.SetRedDotActiveByGm(e);
  }
}
exports.RedDotModel = RedDotModel;
//# sourceMappingURL=RedDotModel.js.map
