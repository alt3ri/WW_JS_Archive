"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCenter = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  LevelGeneralDefine_1 = require("../LevelGeneralDefine"),
  LevelCodeConditionCheckGroup_1 = require("./LevelCodeConditionCheckGroup"),
  LevelCondictionCheckExploreLevel_1 = require("./LevelCondictionCheckExploreLevel"),
  LevelConditionAccountSettingOpen_1 = require("./LevelConditionAccountSettingOpen"),
  LevelConditionAlwaysFalse_1 = require("./LevelConditionAlwaysFalse"),
  LevelConditionAnyPhantomCouldUpdate_1 = require("./LevelConditionAnyPhantomCouldUpdate"),
  LevelConditionAnyRoleFullPhantom_1 = require("./LevelConditionAnyRoleFullPhantom"),
  LevelConditionCheckActivityOpen_1 = require("./LevelConditionCheckActivityOpen"),
  LevelConditionCheckAiState_1 = require("./LevelConditionCheckAiState"),
  LevelConditionCheckAnimalParts_1 = require("./LevelConditionCheckAnimalParts"),
  LevelConditionCheckBattleRole_1 = require("./LevelConditionCheckBattleRole"),
  LevelConditionCheckBattleRoleIsNot_1 = require("./LevelConditionCheckBattleRoleIsNot"),
  LevelConditionCheckBattleRoleWeaponType_1 = require("./LevelConditionCheckBattleRoleWeaponType"),
  LevelConditionCheckBuff_1 = require("./LevelConditionCheckBuff"),
  LevelConditionCheckCalabashLevel_1 = require("./LevelConditionCheckCalabashLevel"),
  LevelConditionCheckCharacterTag_1 = require("./LevelConditionCheckCharacterTag"),
  LevelConditionCheckCharacterTagByEvent_1 = require("./LevelConditionCheckCharacterTagByEvent"),
  LevelConditionCheckClientEvent_1 = require("./LevelConditionCheckClientEvent"),
  LevelConditionCheckClientQuestNode_1 = require("./LevelConditionCheckClientQuestNode"),
  LevelConditionCheckClientUseSkill_1 = require("./LevelConditionCheckClientUseSkill"),
  LevelConditionCheckClientUseVisionSkill_1 = require("./LevelConditionCheckClientUseVisionSkill"),
  LevelConditionCheckComboTeachingState_1 = require("./LevelConditionCheckComboTeachingState"),
  LevelConditionCheckCurrentCharacter_1 = require("./LevelConditionCheckCurrentCharacter"),
  LevelConditionCheckCurWorldLevel_1 = require("./LevelConditionCheckCurWorldLevel"),
  LevelConditionCheckCurWorldLevelOp_1 = require("./LevelConditionCheckCurWorldLevelOp"),
  LevelConditionCheckDirection_1 = require("./LevelConditionCheckDirection"),
  LevelConditionCheckDis_1 = require("./LevelConditionCheckDis"),
  LevelConditionCheckDockyardWareHouseHasItem_1 = require("./LevelConditionCheckDockyardWareHouseHasItem"),
  LevelConditionCheckDungeon_1 = require("./LevelConditionCheckDungeon"),
  LevelConditionCheckDungeonFinished_1 = require("./LevelConditionCheckDungeonFinished"),
  LevelConditionCheckDungeonHasSaveConfig_1 = require("./LevelConditionCheckDungeonHasSaveConfig"),
  LevelConditionCheckDungeonId_1 = require("./LevelConditionCheckDungeonId"),
  LevelConditionCheckEnemyBuff_1 = require("./LevelConditionCheckEnemyBuff"),
  LevelConditionCheckEnemyTag_1 = require("./LevelConditionCheckEnemyTag"),
  LevelConditionCheckEntitiesExist_1 = require("./LevelConditionCheckEntitiesExist"),
  LevelConditionCheckEntityCommonTag_1 = require("./LevelConditionCheckEntityCommonTag"),
  LevelConditionCheckEntityCommonTagByself_1 = require("./LevelConditionCheckEntityCommonTagByself"),
  LevelConditionCheckEntityConfigId_1 = require("./LevelConditionCheckEntityConfigId"),
  LevelConditionCheckEntityGravityDirection_1 = require("./LevelConditionCheckEntityGravityDirection"),
  LevelConditionCheckEntityHasSceneItemAttributeTag_1 = require("./LevelConditionCheckEntityHasSceneItemAttributeTag"),
  LevelConditionCheckEntityLocked_1 = require("./LevelConditionCheckEntityLocked"),
  LevelConditionCheckEquippedPhantom_1 = require("./LevelConditionCheckEquippedPhantom"),
  LevelConditionCheckExploreSkill_1 = require("./LevelConditionCheckExploreSkill"),
  LevelConditionCheckFanIsNotRotating_1 = require("./LevelConditionCheckFanIsNotRotating"),
  LevelConditionCheckFightEnergyBall_1 = require("./LevelConditionCheckFightEnergyBall"),
  LevelConditionCheckFightEnergyBar_1 = require("./LevelConditionCheckFightEnergyBar"),
  LevelConditionCheckFishingDockyardItemTipsShown_1 = require("./LevelConditionCheckFishingDockyardItemTipsShown"),
  LevelConditionCheckFishingEntrustAvailablePeriod_1 = require("./LevelConditionCheckFishingEntrustAvailablePeriod"),
  LevelConditionCheckFishingEntrustState_1 = require("./LevelConditionCheckFishingEntrustState"),
  LevelConditionCheckFishingQteBtnHitValidArea_1 = require("./LevelConditionCheckFishingQteBtnHitValidArea"),
  LevelConditionCheckFishingRoleTechViewOpen_1 = require("./LevelConditionCheckFishingRoleTechViewOpen"),
  LevelConditionCheckFishingTechUnlock_1 = require("./LevelConditionCheckFishingTechUnlock"),
  LevelConditionCheckFishingWareHouseItemListLength_1 = require("./LevelConditionCheckFishingWareHouseItemListLength"),
  LevelConditionCheckFormationAnyRoleDead_1 = require("./LevelConditionCheckFormationAnyRoleDead"),
  LevelConditionCheckGravityFlipEntityDirectionSameAsPlayer_1 = require("./LevelConditionCheckGravityFlipEntityDirectionSameAsPlayer"),
  LevelConditionCheckGuideStatus_1 = require("./LevelConditionCheckGuideStatus"),
  LevelConditionCheckHasFirstPhantomAtPosition_1 = require("./LevelConditionCheckHasFirstPhantomAtPosition"),
  LevelConditionCheckHasSkinInRoleSkinSubView_1 = require("./LevelConditionCheckHasSkinInRoleSkinSubView"),
  LevelConditionCheckHasUnlockAffixInBossRush_1 = require("./LevelConditionCheckHasUnlockAffixInBossRush"),
  LevelConditionCheckInCombat_1 = require("./LevelConditionCheckInCombat"),
  LevelConditionCheckInputAction_1 = require("./LevelConditionCheckInputAction"),
  LevelConditionCheckInstanceEntranceUnlockStatus_1 = require("./LevelConditionCheckInstanceEntranceUnlockStatus"),
  LevelConditionCheckInstanceMatchAble_1 = require("./LevelConditionCheckInstanceMatchAble"),
  LevelConditionCheckInstanceState_1 = require("./LevelConditionCheckInstanceState"),
  LevelConditionCheckInTodTimeSpan_1 = require("./LevelConditionCheckInTodTimeSpan"),
  LevelConditionCheckIsMulti_1 = require("./LevelConditionCheckIsMulti"),
  LevelConditionCheckIsShowProgressBarInMapExploreDetailView_1 = require("./LevelConditionCheckIsShowProgressBarInMapExploreDetailView"),
  LevelConditionCheckIsUsingVehicle_1 = require("./LevelConditionCheckIsUsingVehicle"),
  LevelConditionCheckItemWithOperator_1 = require("./LevelConditionCheckItemWithOperator"),
  LevelConditionCheckLevel_1 = require("./LevelConditionCheckLevel"),
  LevelConditionCheckLevelOp_1 = require("./LevelConditionCheckLevelOp"),
  LevelConditionCheckLevelPlayRewardState_1 = require("./LevelConditionCheckLevelPlayRewardState"),
  LevelConditionCheckLevelPlayState_1 = require("./LevelConditionCheckLevelPlayState"),
  LevelConditionCheckLockEnemyMode_1 = require("./LevelConditionCheckLockEnemyMode"),
  LevelConditionCheckMapFocusByQuestId_1 = require("./LevelConditionCheckMapFocusByQuestId"),
  LevelConditionCheckOnSelectSettingMainType_1 = require("./LevelConditionCheckOnSelectSettingMainType"),
  LevelConditionCheckOnTrap_1 = require("./LevelConditionCheckOnTrap"),
  LevelConditionCheckOriginWorldLevel_1 = require("./LevelConditionCheckOriginWorldLevel"),
  LevelConditionCheckPhantom_1 = require("./LevelConditionCheckPhantom"),
  LevelConditionCheckPlayerMotionState_1 = require("./LevelConditionCheckPlayerMotionState"),
  LevelConditionCheckPlayerMotionStateNew_1 = require("./LevelConditionCheckPlayerMotionStateNew"),
  LevelConditionCheckPlayerStateRestriction_1 = require("./LevelConditionCheckPlayerStateRestriction"),
  LevelConditionCheckPositionRolePhantomSkillEquip_1 = require("./LevelConditionCheckPositionRolePhantomSkillEquip"),
  LevelConditionCheckPureModeWhenBattleViewActive_1 = require("./LevelConditionCheckPureModeWhenBattleViewActive"),
  LevelConditionCheckRangeByPbDataId_1 = require("./LevelConditionCheckRangeByPbDataId"),
  LevelConditionCheckRangeSphere_1 = require("./LevelConditionCheckRangeSphere"),
  LevelConditionCheckRogueAbilitySelect_1 = require("./LevelConditionCheckRogueAbilitySelect"),
  LevelConditionCheckRogueCanUnlockSkill_1 = require("./LevelConditionCheckRogueCanUnlockSkill"),
  LevelConditionCheckRogueTerm_1 = require("./LevelConditionCheckRogueTerm"),
  LevelConditionCheckRoleLevel_1 = require("./LevelConditionCheckRoleLevel"),
  LevelConditionCheckRoleSkillTargetLevel_1 = require("./LevelConditionCheckRoleSkillTargetLevel"),
  LevelConditionCheckRoleTargetLevel_1 = require("./LevelConditionCheckRoleTargetLevel"),
  LevelConditionCheckShipTowerTeamOpen_1 = require("./LevelConditionCheckShipTowerTeamOpen"),
  LevelConditionCheckSkillPoint_1 = require("./LevelConditionCheckSkillPoint"),
  LevelConditionCheckSystemFunction_1 = require("./LevelConditionCheckSystemFunction"),
  LevelConditionCheckSystemState_1 = require("./LevelConditionCheckSystemState"),
  LevelConditionCheckTargetAttribute_1 = require("./LevelConditionCheckTargetAttribute"),
  LevelConditionCheckTeamRoleCouldLevelUp_1 = require("./LevelConditionCheckTeamRoleCouldLevelUp"),
  LevelConditionCheckTeamWeaponCouldLevelUp_1 = require("./LevelConditionCheckTeamWeaponCouldLevelUp"),
  LevelConditionCheckTeleControlState_1 = require("./LevelConditionCheckTeleControlState"),
  LevelConditionCheckTeleportStatus_1 = require("./LevelConditionCheckTeleportStatus"),
  LevelConditionCheckTeleportTypeUnlock_1 = require("./LevelConditionCheckTeleportTypeUnlock"),
  LevelConditionCheckTodTimePeriod_1 = require("./LevelConditionCheckTodTimePeriod"),
  LevelConditionCheckTypeItemPickUp_1 = require("./LevelConditionCheckTypeItemPickUp"),
  LevelConditionCheckUIOpen_1 = require("./LevelConditionCheckUIOpen"),
  LevelConditionCheckUIOpenDone_1 = require("./LevelConditionCheckUIOpenDone"),
  LevelConditionCheckUIState_1 = require("./LevelConditionCheckUIState"),
  LevelConditionCheckWeaponCount_1 = require("./LevelConditionCheckWeaponCount"),
  LevelConditionCheckWeather_1 = require("./LevelConditionCheckWeather"),
  LevelConditionCheckWorldMapSecondaryUiOpened_1 = require("./LevelConditionCheckWorldMapSecondaryUiOpened"),
  LevelConditionCiacconaAvgGuide_1 = require("./LevelConditionCiacconaAvgGuide"),
  LevelConditionCompareEntityGroupState_1 = require("./LevelConditionCompareEntityGroupState"),
  LevelConditionCompareFishingBoatState_1 = require("./LevelConditionCompareFishingBoatState"),
  LevelConditionCompareNpcPerformState_1 = require("./LevelConditionCompareNpcPerformState"),
  LevelConditionCompareTeammateDie_1 = require("./LevelConditionCompareTeammateDie"),
  LevelConditionCompareVar_1 = require("./LevelConditionCompareVar"),
  LevelConditionDangoAbyssGuide_1 = require("./LevelConditionDangoAbyssGuide"),
  LevelConditionDangoMatchGuide_1 = require("./LevelConditionDangoMatchGuide"),
  LevelConditionDangoMonopolyGuide_1 = require("./LevelConditionDangoMonopolyGuide"),
  LevelConditionDistanceLess_1 = require("./LevelConditionDistanceLess"),
  LevelConditionDragonPoolState_1 = require("./LevelConditionDragonPoolState"),
  LevelConditionEntityState_1 = require("./LevelConditionEntityState"),
  LevelConditionFinishGuideStepByEvent_1 = require("./LevelConditionFinishGuideStepByEvent"),
  LevelConditionForMoonChasing_1 = require("./LevelConditionForMoonChasing"),
  LevelConditionHasBuff_1 = require("./LevelConditionHasBuff"),
  LevelConditionHasNotInvitedRoleInSpring25_1 = require("./LevelConditionHasNotInvitedRoleInSpring25"),
  LevelConditionHideSettingInCloudGame_1 = require("./LevelConditionHideSettingInCloudGame"),
  LevelConditionInTowerDefenceBattle_1 = require("./LevelConditionInTowerDefenceBattle"),
  LevelConditionInvokeCheckedByEvent_1 = require("./LevelConditionInvokeCheckedByEvent"),
  LevelConditionIsPlayer_1 = require("./LevelConditionIsPlayer"),
  LevelConditionItemCheck_1 = require("./LevelConditionItemCheck"),
  LevelConditionItemCountByType_1 = require("./LevelConditionItemCountByType"),
  LevelConditionLiftLocation_1 = require("./LevelConditionLiftLocation"),
  LevelConditionMoveStateCheck_1 = require("./LevelConditionMoveStateCheck"),
  LevelConditionMovieRogueGuide_1 = require("./LevelConditionMovieRogueGuide"),
  LevelConditionOnActivitySubViewDone_1 = require("./LevelConditionOnActivitySubViewDone"),
  LevelConditionOnChangeBossRushBuff_1 = require("./LevelConditionOnChangeBossRushBuff"),
  LevelConditionOnCostInsufficient_1 = require("./LevelConditionOnCostInsufficient"),
  LevelConditionOnFishingBackpackBtnStateChange_1 = require("./LevelConditionOnFishingBackpackBtnStateChange"),
  LevelConditionOnFishingBackpackQuickSellToggleShow_1 = require("./LevelConditionOnFishingBackpackQuickSellToggleShow"),
  LevelConditionOnFishingQteScoreReachedMaximum_1 = require("./LevelConditionOnFishingQteScoreReachedMaximum"),
  LevelConditionOnPlayerRevive_1 = require("./LevelConditionOnPlayerRevive"),
  LevelConditionOnPlayerTitleUnlock_1 = require("./LevelConditionOnPlayerTitleUnlock"),
  LevelConditionOnPlayerUseSkill_1 = require("./LevelConditionOnPlayerUseSkill"),
  LevelConditionOnShowPhantomInFormation_1 = require("./LevelConditionOnShowPhantomInFormation"),
  LevelConditionOnSkillButtonDataRefresh_1 = require("./LevelConditionOnSkillButtonDataRefresh"),
  LevelConditionOnTakingPhoto_1 = require("./LevelConditionOnTakingPhoto"),
  LevelConditionOnTreasureBoxOpen_1 = require("./LevelConditionOnTreasureBoxOpen"),
  LevelConditionOnTreasureCompassUnitShow_1 = require("./LevelConditionOnTreasureCompassUnitShow"),
  LevelConditionOnUiTabViewShow_1 = require("./LevelConditionOnUiTabViewShow"),
  LevelConditionOnViewClose_1 = require("./LevelConditionOnViewClose"),
  LevelConditionQuestState_1 = require("./LevelConditionQuestState"),
  LevelConditionQuestStepState_1 = require("./LevelConditionQuestStepState"),
  LevelConditionRoguelikeHasSelectEntryAndShow_1 = require("./LevelConditionRoguelikeHasSelectEntryAndShow"),
  LevelConditionRoleBreach_1 = require("./LevelConditionRoleBreach"),
  LevelConditionRoleLevel_1 = require("./LevelConditionRoleLevel"),
  LevelConditionRolePhantomNum_1 = require("./LevelConditionRolePhantomNum"),
  LevelConditionRouletteEquipItemId_1 = require("./LevelConditionRouletteEquipItemId"),
  LevelConditionsCheckJigsawInfo_1 = require("./LevelConditionsCheckJigsawInfo"),
  LevelConditionSelfGameplayTagCheck_1 = require("./LevelConditionSelfGameplayTagCheck"),
  LevelConditionSelfState_1 = require("./LevelConditionSelfState"),
  LevelConditionSelfTagCheck_1 = require("./LevelConditionSelfTagCheck"),
  LevelConditionStartShootTarget_1 = require("./LevelConditionStartShootTarget"),
  LevelConditionTargetTagCheck_1 = require("./LevelConditionTargetTagCheck"),
  LevelConditionTeamCouldEquipPhantom_1 = require("./LevelConditionTeamCouldEquipPhantom"),
  LevelConditionTeamRoleLevel_1 = require("./LevelConditionTeamRoleLevel"),
  LevelConditionTeamWeaponLevel_1 = require("./LevelConditionTeamWeaponLevel"),
  LevelConditionVisionIntensifyTabOpen_1 = require("./LevelConditionVisionIntensifyTabOpen"),
  E_LGC = LevelGeneralDefine_1.ELevelGeneralCondition;
class LevelConditionCenter {
  static RegistConditions() {
    this.$Te(
      E_LGC.DistanceLess,
      LevelConditionDistanceLess_1.LevelConditionDistanceLess,
    ),
      this.$Te(
        E_LGC.SelfTagCheck,
        LevelConditionSelfTagCheck_1.LevelConditionSelfTagCheck,
      ),
      this.$Te(
        E_LGC.ItemCheck,
        LevelConditionItemCheck_1.LevelConditionItemCheck,
      ),
      this.$Te(
        E_LGC.CheckItemWithOperator,
        LevelConditionCheckItemWithOperator_1.LevelConditionCheckItemWithOperator,
      ),
      this.$Te(E_LGC.CheckDis, LevelConditionCheckDis_1.LevelConditionCheckDis),
      this.$Te(
        E_LGC.TargetTagCheck,
        LevelConditionTargetTagCheck_1.LevelConditionTargetTagCheck,
      ),
      this.$Te(
        E_LGC.CheckOnTrap,
        LevelConditionCheckOnTrap_1.LevelConditionCheckOnTrap,
      ),
      this.$Te(
        E_LGC.CheckDirection,
        LevelConditionCheckDirection_1.LevelConditionCheckDirection,
      ),
      this.$Te(
        E_LGC.QuestState,
        LevelConditionQuestState_1.LevelConditionQuestState,
      ),
      this.$Te(
        E_LGC.CheckLevel,
        LevelConditionCheckLevel_1.LevelConditionCheckLevel,
        [EventDefine_1.EEventName.OnPlayerLevelChanged],
      ),
      this.$Te(
        E_LGC.CheckLevelOp,
        LevelConditionCheckLevelOp_1.LevelConditionCheckLevelOp,
        [EventDefine_1.EEventName.OnPlayerLevelChanged],
      ),
      this.$Te(
        E_LGC.CheckGuideStatus,
        LevelConditionCheckGuideStatus_1.LevelConditionCheckGuideStatus,
      ),
      this.$Te(
        E_LGC.CheckCharacterTagNotByEvent,
        LevelConditionCheckCharacterTag_1.LevelConditionCheckCharacterTag,
      ),
      this.$Te(
        E_LGC.CheckCharacterTag,
        LevelConditionCheckCharacterTag_1.LevelConditionCheckCharacterTag,
        [EventDefine_1.EEventName.OnSkillTagChanged],
      ),
      this.$Te(
        E_LGC.CheckCharacterTagByEvent,
        LevelConditionCheckCharacterTagByEvent_1.LevelConditionCheckCharacterTagByEvent,
        [EventDefine_1.EEventName.OnGlobalGameplayTagChanged],
      ),
      this.$Te(
        E_LGC.DragonPoolState,
        LevelConditionDragonPoolState_1.LevelConditionDragonPoolState,
      ),
      this.$Te(
        E_LGC.CheckTeleportStatus,
        LevelConditionCheckTeleportStatus_1.LevelConditionCheckTeleportStatus,
      ),
      this.$Te(
        E_LGC.RoleLevel,
        LevelConditionRoleLevel_1.LevelConditionRoleLevel,
        [EventDefine_1.EEventName.RoleLevelUp],
      ),
      this.$Te(
        E_LGC.CheckRoleLevel,
        LevelConditionCheckRoleLevel_1.LevelConditionCheckRoleLevel,
        [EventDefine_1.EEventName.RoleLevelUp],
      ),
      this.$Te(
        E_LGC.RoleBreach,
        LevelConditionRoleBreach_1.LevelConditionRoleBreach,
      ),
      this.$Te(
        E_LGC.SelfGameplayTagCheck,
        LevelConditionSelfGameplayTagCheck_1.LevelConditionSelfGameplayTagCheck,
      ),
      this.$Te(
        E_LGC.CheckInTodTimeSpan,
        LevelConditionCheckInTodTimeSpan_1.LevelConditionCheckInTodTimeSpan,
      ),
      this.$Te(
        E_LGC.CheckSceneItemTag,
        LevelConditionCheckEntityCommonTag_1.LevelConditionCheckEntityCommonTag,
      ),
      this.$Te(E_LGC.IsPlayer, LevelConditionIsPlayer_1.LevelConditionIsPlayer),
      this.$Te(
        E_LGC.CheckEntityConfigId,
        LevelConditionCheckEntityConfigId_1.LevelConditionCheckEntityConfigId,
      ),
      this.$Te(
        E_LGC.CheckOriginWorldLevel,
        LevelConditionCheckOriginWorldLevel_1.LevelConditionCheckOriginWorldLevel,
      ),
      this.$Te(
        E_LGC.StartShootTarget,
        LevelConditionStartShootTarget_1.LevelConditionStartShootTarget,
      ),
      this.$Te(
        E_LGC.CheckCurWorldLevel,
        LevelConditionCheckCurWorldLevel_1.LevelConditionCheckCurWorldLevel,
      ),
      this.$Te(
        E_LGC.CheckCurWorldLevelOp,
        LevelConditionCheckCurWorldLevelOp_1.LevelConditionCheckCurWorldLevelOp,
      ),
      this.$Te(
        E_LGC.CheckInstanceState,
        LevelConditionCheckInstanceState_1.LevelConditionCheckInstanceState,
      ),
      this.$Te(
        E_LGC.CheckInstanceMatchAble,
        LevelConditionCheckInstanceMatchAble_1.LevelConditionCheckInstanceMatchAble,
        [EventDefine_1.EEventName.OnSelectInstance],
      ),
      this.$Te(
        E_LGC.CheckOnSelectMenuMainType,
        LevelConditionCheckOnSelectSettingMainType_1.LevelConditionCheckOnSelectSettingMainType,
        [EventDefine_1.EEventName.OnSelectMenuMainType],
      ),
      this.$Te(
        E_LGC.OnShowPhantomInFormation,
        LevelConditionOnShowPhantomInFormation_1.LevelConditionOnShowPhantomInFormation,
        [EventDefine_1.EEventName.TowerDefenseOnShowPhantomInFormation],
      ),
      this.$Te(
        E_LGC.ForMoonChasingCheckTargetBuiltCount,
        LevelConditionForMoonChasing_1.LevelConditionForMoonChasingCheckTargetBuiltCount,
      ),
      this.$Te(
        E_LGC.ForMoonChasingCheckHasCanLevelUpBuilding,
        LevelConditionForMoonChasing_1.LevelConditionForMoonChasingCheckHasCanLevelUpBuilding,
      ),
      this.$Te(
        E_LGC.ForMoonChasingCheckNeedBranch,
        LevelConditionForMoonChasing_1.LevelConditionForMoonChasingCheckNeedBranch,
      ),
      this.$Te(
        E_LGC.ForMoonChasingCheckHasNotFinishedTask,
        LevelConditionForMoonChasing_1.LevelConditionForMoonChasingCheckHasNotFinishedTask,
      ),
      this.$Te(
        E_LGC.ForMoonChasingCheckTaskState,
        LevelConditionForMoonChasing_1.LevelConditionForMoonChasingCheckTaskState,
      ),
      this.$Te(
        E_LGC.ForMoonChasingCheckMainlineTaskDone,
        LevelConditionForMoonChasing_1.LevelConditionForMoonChasingCheckMainlineTaskDone,
      ),
      this.$Te(
        E_LGC.ForMoonChasingOpenInteractive,
        LevelConditionForMoonChasing_1.LevelConditionForMoonChasingOpenInteractive,
        [EventDefine_1.EEventName.MoonChasingOnOpenInteractive],
      ),
      this.$Te(
        E_LGC.OnActivitySubViewDone,
        LevelConditionOnActivitySubViewDone_1.LevelConditionOnActivitySubViewDone,
        [EventDefine_1.EEventName.OnSelectActivityAndSubViewReady],
      ),
      this.$Te(
        E_LGC.CheckPureModeWhenBattleViewActive,
        LevelConditionCheckPureModeWhenBattleViewActive_1.LevelConditionCheckPureModeWhenBattleViewActive,
        [EventDefine_1.EEventName.ActiveBattleView],
      ),
      this.$Te(
        E_LGC.CheckLockEnemyMode,
        LevelConditionCheckLockEnemyMode_1.LevelConditionCheckLockEnemyMode,
      ),
      this.$Te(
        E_LGC.CheckIsShowProgressBarInMapExploreDetailView,
        LevelConditionCheckIsShowProgressBarInMapExploreDetailView_1.LevelConditionCheckIsShowProgressBarInMapExploreDetailView,
        [EventDefine_1.EEventName.OnUpdateExploreProgressBar],
      ),
      this.$Te(
        E_LGC.MoveStateCheck,
        LevelConditionMoveStateCheck_1.LevelConditionMoveStateCheck,
      ),
      this.$Te(
        E_LGC.CheckBuff,
        LevelConditionCheckBuff_1.LevelConditionCheckBuff,
      ),
      this.$Te(
        E_LGC.CheckEquippedPhantom,
        LevelConditionCheckEquippedPhantom_1.LevelConditionCheckEquippedPhantom,
        [EventDefine_1.EEventName.PhantomEquip],
      ),
      this.$Te(
        E_LGC.CheckEnemyBuff,
        LevelConditionCheckEnemyBuff_1.LevelConditionCheckEnemyBuff,
        [EventDefine_1.EEventName.OnAggroAdd],
      ),
      this.$Te(
        E_LGC.CheckEnemyTag,
        LevelConditionCheckEnemyTag_1.LevelConditionCheckEnemyTag,
        [EventDefine_1.EEventName.OnAggroAdd],
      ),
      this.$Te(
        E_LGC.CheckSkillPoint,
        LevelConditionCheckSkillPoint_1.LevelConditionCheckSkillPoint,
        [EventDefine_1.EEventName.RefreshSkillTreeLeftSkillPoint],
      ),
      this.$Te(
        E_LGC.CheckExploreSkill,
        LevelConditionCheckExploreSkill_1.LevelConditionCheckExploreSkill,
        [EventDefine_1.EEventName.OnChangeSelectedExploreId],
      ),
      this.$Te(
        E_LGC.CheckFightEnergyBar,
        LevelConditionCheckFightEnergyBar_1.LevelConditionCheckFightEnergyBar,
        [EventDefine_1.EEventName.CharOnEnergyChanged],
      ),
      this.$Te(
        E_LGC.CheckFightEnergyBall,
        LevelConditionCheckFightEnergyBall_1.LevelConditionCheckFightEnergyBall,
        [EventDefine_1.EEventName.CharOnElementEnergyChanged],
      ),
      this.$Te(
        E_LGC.CheckClientQuest,
        LevelConditionQuestStepState_1.LevelConditionQuestStepState,
        [
          EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
          EventDefine_1.EEventName.OnQuestStateChange,
        ],
      ),
      this.$Te(
        E_LGC.CheckClientQuestNode,
        LevelConditionCheckClientQuestNode_1.LevelConditionCheckClientQuestNode,
        [EventDefine_1.EEventName.OnLogicTreeNodeStatusChange],
      ),
      this.$Te(
        E_LGC.HideSettingInCloudGame,
        LevelConditionHideSettingInCloudGame_1.LevelConditionHideSettingInCloudGame,
      ),
      this.$Te(
        E_LGC.AlwaysFalse,
        LevelConditionAlwaysFalse_1.LevelConditionAlwaysFalse,
      ),
      this.$Te(
        E_LGC.CheckClientUseSkill,
        LevelConditionCheckClientUseSkill_1.LevelConditionCheckClientUseSkill,
      ),
      this.$Te(
        E_LGC.CheckUIState,
        LevelConditionCheckUIState_1.LevelConditionCheckUIState,
      ),
      this.$Te(
        E_LGC.CheckUIOpen,
        LevelConditionCheckUIOpen_1.LevelConditionCheckUIOpen,
        [EventDefine_1.EEventName.OpenView],
      ),
      this.$Te(
        E_LGC.CheckUIOpenDone,
        LevelConditionCheckUIOpenDone_1.LevelConditionCheckUIOpenDone,
        [EventDefine_1.EEventName.OnViewDone],
      ),
      this.$Te(
        E_LGC.CheckInputAction,
        LevelConditionCheckInputAction_1.LevelConditionCheckInputAction,
        [EventDefine_1.EEventName.OnInputChangeForCond],
      ),
      this.$Te(
        E_LGC.CheckBattleRole,
        LevelConditionCheckBattleRole_1.LevelConditionCheckBattleRole,
      ),
      this.$Te(
        E_LGC.CheckClientUseVisionSkill,
        LevelConditionCheckClientUseVisionSkill_1.LevelConditionCheckClientUseVisionSkill,
      ),
      this.$Te(
        E_LGC.CheckInstanceEntranceUnlockStatus,
        LevelConditionCheckInstanceEntranceUnlockStatus_1.LevelConditionCheckInstanceEntranceUnlockStatus,
      ),
      this.$Te(
        E_LGC.CheckSelfEntityCommonTag,
        LevelConditionCheckEntityCommonTagByself_1.LevelConditionCheckEntityCommonTagBySelf,
      ),
      this.$Te(
        E_LGC.FunctionUnlock,
        LevelConditionInvokeCheckedByEvent_1.LevelConditionFunctionUnlock,
        [EventDefine_1.EEventName.OnFunctionOpenUpdate],
      ),
      this.$Te(
        E_LGC.GetNewItem,
        LevelConditionInvokeCheckedByEvent_1.LevelConditionGetNewItem,
        [EventDefine_1.EEventName.OnGetNewItem],
      ),
      this.$Te(
        E_LGC.HarmonyQte,
        LevelConditionInvokeCheckedByEvent_1.LevelConditionHarmonyQte,
        [EventDefine_1.EEventName.OnElementFusion],
      ),
      this.$Te(
        E_LGC.GetWhichRole,
        LevelConditionInvokeCheckedByEvent_1.LevelConditionGetWhichRole,
        [EventDefine_1.EEventName.ActiveRole],
      ),
      this.$Te(
        E_LGC.HpLowerThan,
        LevelConditionInvokeCheckedByEvent_1.LevelConditionHpLowerThan,
        [
          EventDefine_1.EEventName.OnServerAttributeChange,
          EventDefine_1.EEventName.CharOnHealthChanged,
        ],
      ),
      this.$Te(
        E_LGC.SlotOfCurrentRole,
        LevelConditionInvokeCheckedByEvent_1.LevelConditionSlotOfCurrentRole,
      ),
      this.$Te(
        E_LGC.FightWithMonster,
        LevelConditionInvokeCheckedByEvent_1.LevelConditionFightWithMonster,
        [EventDefine_1.EEventName.OnAggroAdd],
      ),
      this.$Te(
        E_LGC.PawnInRange,
        LevelConditionInvokeCheckedByEvent_1.LevelConditionPawnInRange,
        [EventDefine_1.EEventName.OnGuideRangeEnter],
      ),
      this.$Te(
        E_LGC.PhantomTargetLevel,
        LevelConditionCheckPhantom_1.LevelConditionCheckPhantomLevel,
        [EventDefine_1.EEventName.PhantomLevelUp],
      ),
      this.$Te(
        E_LGC.PhantomMaxLevel,
        LevelConditionCheckPhantom_1.LevelConditionCheckPhantomMaxLevel,
        [EventDefine_1.EEventName.PhantomLevelUp],
      ),
      this.$Te(
        E_LGC.RoleTargetLevel,
        LevelConditionCheckRoleTargetLevel_1.LevelConditionCheckRoleTargetLevel,
        [EventDefine_1.EEventName.PhantomLevelUp],
      ),
      this.$Te(
        E_LGC.RoleSkillTargetLevel,
        LevelConditionCheckRoleSkillTargetLevel_1.LevelConditionCheckRoleSkillTargetLevel,
        [EventDefine_1.EEventName.PhantomLevelUp],
      ),
      this.$Te(
        E_LGC.BattleRoleIsNot,
        LevelConditionCheckBattleRoleIsNot_1.LevelConditionCheckBattleRoleIsNot,
        [EventDefine_1.EEventName.OnChangeRole],
      ),
      this.$Te(
        E_LGC.BattleRoleWeaponType,
        LevelConditionCheckBattleRoleWeaponType_1.LevelConditionCheckBattleRoleWeaponType,
        [EventDefine_1.EEventName.OnChangeRole],
      ),
      this.$Te(
        E_LGC.FormationAnyRoleDead,
        LevelConditionCheckFormationAnyRoleDead_1.LevelConditionCheckFormationAnyRoleDead,
        [EventDefine_1.EEventName.CharOnRoleDead],
      ),
      this.$Te(
        E_LGC.ComboTeachingState,
        LevelConditionCheckComboTeachingState_1.LevelConditionCheckComboTeachingState,
        [EventDefine_1.EEventName.ComboTeachingCloseGuide],
      ),
      this.$Te(
        E_LGC.OnViewClose,
        LevelConditionOnViewClose_1.LevelConditionOnViewClose,
        [EventDefine_1.EEventName.CloseView],
      ),
      this.$Te(
        E_LGC.OnPlayerUseSkill,
        LevelConditionOnPlayerUseSkill_1.LevelConditionOnPlayerUseSkill,
        [EventDefine_1.EEventName.CharUseSkill],
      ),
      this.$Te(
        E_LGC.OnSkillButtonDataRefresh,
        LevelConditionOnSkillButtonDataRefresh_1.LevelConditionOnSkillButtonDataRefresh,
      ),
      this.$Te(
        E_LGC.FinishGuideStepByEvent,
        LevelConditionFinishGuideStepByEvent_1.LevelConditionOnViewReadyForGuide,
        [EventDefine_1.EEventName.FinishGuideStepByEvent],
      ),
      this.$Te(
        E_LGC.PlayerRevive,
        LevelConditionOnPlayerRevive_1.LevelConditionOnPlayerRevive,
        [EventDefine_1.EEventName.OnTeamLivingStateChange],
      ),
      this.$Te(
        E_LGC.CheckTeamRoleCouldLevelUp,
        LevelConditionCheckTeamRoleCouldLevelUp_1.LevelConditionCheckTeamRoleCouldLevelUp,
      ),
      this.$Te(
        E_LGC.CheckTeamWeaponCouldLevelUp,
        LevelConditionCheckTeamWeaponCouldLevelUp_1.LevelConditionCheckTeamWeaponCouldLevelUp,
      ),
      this.$Te(
        E_LGC.ClientCalabashLevel,
        LevelConditionCheckCalabashLevel_1.LevelConditionCheckCalabashLevel,
        [EventDefine_1.EEventName.CalabashLevelUpdate],
      ),
      this.$Te(
        E_LGC.TeamRoleLevel,
        LevelConditionTeamRoleLevel_1.LevelConditionTeamRoleLevel,
        [
          EventDefine_1.EEventName.RoleLevelUp,
          EventDefine_1.EEventName.OnUpdateSceneTeam,
        ],
      ),
      this.$Te(
        E_LGC.TeamWeaponLevel,
        LevelConditionTeamWeaponLevel_1.LevelConditionTeamWeaponLevel,
        [
          EventDefine_1.EEventName.WeaponLevelUp,
          EventDefine_1.EEventName.OnUpdateSceneTeam,
        ],
      ),
      this.$Te(
        E_LGC.TeamCouldEquipPhantom,
        LevelConditionTeamCouldEquipPhantom_1.LevelConditionTeamCouldEquipPhantom,
        [
          EventDefine_1.EEventName.PhantomEquip,
          EventDefine_1.EEventName.OnUpdateSceneTeam,
        ],
      ),
      this.$Te(
        E_LGC.CheckAnyPhantomCouldUpdate,
        LevelConditionAnyPhantomCouldUpdate_1.LevelConditionAnyPhantomCouldUpdate,
        [
          EventDefine_1.EEventName.OnPhantomItemUpdate,
          EventDefine_1.EEventName.OnGetNewItem,
        ],
      ),
      this.$Te(
        E_LGC.CheckAnyRoleFullPhantom,
        LevelConditionAnyRoleFullPhantom_1.LevelConditionAnyRoleFullPhantom,
        [
          EventDefine_1.EEventName.PhantomEquip,
          EventDefine_1.EEventName.OnUpdateSceneTeam,
        ],
      ),
      this.$Te(
        E_LGC.CheckRolePhantomNum,
        LevelConditionRolePhantomNum_1.LevelConditionRolePhantomNum,
        [EventDefine_1.EEventName.PhantomEquip],
      ),
      this.$Te(
        E_LGC.CheckItemCountByType,
        LevelConditionItemCountByType_1.LevelConditionItemCountByType,
        [
          EventDefine_1.EEventName.OnResponseWeaponAll,
          EventDefine_1.EEventName.OnAddWeaponItemList,
          EventDefine_1.EEventName.OnRemoveWeaponItem,
          EventDefine_1.EEventName.OnEquipPhantomItem,
          EventDefine_1.EEventName.OnAddPhantomItemList,
          EventDefine_1.EEventName.OnRemovePhantomItem,
        ],
      ),
      this.$Te(
        E_LGC.CheckRouletteEquipItemId,
        LevelConditionRouletteEquipItemId_1.LevelConditionRouletteEquipItemId,
        [EventDefine_1.EEventName.OnRouletteSaveDataChange],
      ),
      this.$Te(
        E_LGC.CheckVisionIntensifyTabOpen,
        LevelConditionVisionIntensifyTabOpen_1.LevelConditionVisionIntensifyTabOpen,
        [EventDefine_1.EEventName.VisionIntensifyTabOpen],
      ),
      this.$Te(
        E_LGC.CheckAccountSettingOpen,
        LevelConditionAccountSettingOpen_1.LevelConditionAccountSettingOpen,
        [EventDefine_1.EEventName.ChannelReset],
      ),
      this.$Te(
        E_LGC.CheckOnTreasureBoxOpen,
        LevelConditionOnTreasureBoxOpen_1.LevelConditionOnTreasureBoxOpen,
        [EventDefine_1.EEventName.OpenTreasureBox],
      ),
      this.$Te(
        E_LGC.CheckWeaponCount,
        LevelConditionCheckWeaponCount_1.LevelConditionCheckWeaponCount,
        [
          EventDefine_1.EEventName.OnResponseWeaponAll,
          EventDefine_1.EEventName.OnAddWeaponItemList,
          EventDefine_1.EEventName.OnRemoveWeaponItem,
        ],
      ),
      this.$Te(
        E_LGC.CheckOnCostInsufficient,
        LevelConditionOnCostInsufficient_1.LevelConditionOnCostInsufficient,
        [EventDefine_1.EEventName.PhantomCostInsufficient],
      ),
      this.$Te(
        E_LGC.CheckRangeByPbDataId,
        LevelConditionCheckRangeByPbDataId_1.LevelConditionCheckRangeByPbDataId,
        [EventDefine_1.EEventName.OnGuideRangeEnter],
      ),
      this.$Te(
        E_LGC.CheckDungeonId,
        LevelConditionCheckDungeon_1.LevelConditionCheckDungeon,
        [EventDefine_1.EEventName.WorldDone],
      ),
      this.$Te(
        E_LGC.CheckRogueTerm,
        LevelConditionCheckRogueTerm_1.LevelConditionCheckRogueTerm,
        [EventDefine_1.EEventName.RogueTermUnlock],
      ),
      this.$Te(
        E_LGC.CheckTeleportTypeUnlock,
        LevelConditionCheckTeleportTypeUnlock_1.LevelConditionCheckTeleportTypeUnlock,
        [EventDefine_1.EEventName.UnlockTeleport],
      ),
      this.$Te(
        E_LGC.CheckDungeonFinished,
        LevelConditionCheckDungeonFinished_1.LevelConditionCheckDungeonFinished,
        [EventDefine_1.EEventName.WorldDone],
      ),
      this.$Te(
        E_LGC.CheckTypeItemPickUp,
        LevelConditionCheckTypeItemPickUp_1.LevelConditionCheckTypeItemPickUp,
        [EventDefine_1.EEventName.OnDropItemSuccess],
      ),
      this.$Te(
        E_LGC.CheckRogueCanUnlockSkill,
        LevelConditionCheckRogueCanUnlockSkill_1.LevelConditionCheckRogueCanUnlockSkill,
        [
          EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
          EventDefine_1.EEventName.RoguelikeDataUpdate,
        ],
      ),
      this.$Te(
        E_LGC.CheckPositionRolePhantomSkillEquip,
        LevelConditionCheckPositionRolePhantomSkillEquip_1.LevelConditionCheckPositionRolePhantomSkillEquip,
        [
          EventDefine_1.EEventName.PhantomEquip,
          EventDefine_1.EEventName.OnUpdateSceneTeam,
        ],
      ),
      this.$Te(
        E_LGC.CheckHasFirstPhantomAtPosition,
        LevelConditionCheckHasFirstPhantomAtPosition_1.LevelConditionCheckHasFirstPhantomAtPosition,
      ),
      this.$Te(
        E_LGC.CheckWorldMapSecondaryUiOpened,
        LevelConditionCheckWorldMapSecondaryUiOpened_1.LevelConditionCheckWorldMapSecondaryUiOpened,
        [EventDefine_1.EEventName.WorldMapSecondaryUiOpened],
      ),
      this.$Te(
        E_LGC.CheckHasUnlockAffixInBossRush,
        LevelConditionCheckHasUnlockAffixInBossRush_1.LevelConditionCheckHasUnlockAffixInBossRush,
        [EventDefine_1.EEventName.RequestChangeBossRushView],
      ),
      this.$Te(
        E_LGC.OnChangeBossRushBuff,
        LevelConditionOnChangeBossRushBuff_1.LevelConditionOnChangeBossRushBuff,
        [EventDefine_1.EEventName.BossRushSubViewChanged],
      ),
      this.$Te(
        E_LGC.RoguelikeHasSelectEntryAndShow,
        LevelConditionRoguelikeHasSelectEntryAndShow_1.LevelConditionRoguelikeHasSelectEntryAndShow,
        [EventDefine_1.EEventName.RoguelikeHasSelectEntryAndShow],
      ),
      this.$Te(
        E_LGC.CheckActivityOpen,
        LevelConditionCheckActivityOpen_1.LevelConditionCheckActivityOpen,
      ),
      this.$Te(
        E_LGC.CheckIsMulti,
        LevelConditionCheckIsMulti_1.LevelConditionCheckIsMulti,
        [EventDefine_1.EEventName.OnFinishLoadingState],
      ),
      this.$Te(
        E_LGC.PickupInTowerDefenceBattle,
        LevelConditionInTowerDefenceBattle_1.LevelConditionPickupInTowerDefenceBattle,
        [EventDefine_1.EEventName.TowerDefenseOnPhantomInfoUpdateNotify],
      ),
      this.$Te(
        E_LGC.CheckHasSkinInRoleSkinSubView,
        LevelConditionCheckHasSkinInRoleSkinSubView_1.LevelConditionCheckHasSkinInRoleSkinSubView,
        [EventDefine_1.EEventName.OnRoleSkinSubViewShow],
      ),
      this.$Te(
        E_LGC.HasNotInvitedRoleInSpring25,
        LevelConditionHasNotInvitedRoleInSpring25_1.LevelConditionHasNotInvitedRoleInSpring25,
      ),
      this.$Te(
        E_LGC.CheckMapFocusByQuestId,
        LevelConditionCheckMapFocusByQuestId_1.LevelConditionCheckMapFocusByQuestId,
        [EventDefine_1.EEventName.WorldMapOpenedForQuestMapFocus],
      ),
      this.$Te(
        E_LGC.OnTakingPhoto,
        LevelConditionOnTakingPhoto_1.LevelConditionOnTakingPhoto,
        [EventDefine_1.EEventName.OnScreenShotDone],
      ),
      this.$Te(
        E_LGC.CheckFishingRoleTechViewOpen,
        LevelConditionCheckFishingRoleTechViewOpen_1.LevelConditionCheckFishingRoleTechViewOpen,
        [EventDefine_1.EEventName.FishingRoleTechViewOpened],
      ),
      this.$Te(
        E_LGC.CheckFishingDockyardItemTipsShown,
        LevelConditionCheckFishingDockyardItemTipsShown_1.LevelConditionCheckFishingDockyardItemTipsShown,
        [EventDefine_1.EEventName.FishingDockyardItemTipsShown],
      ),
      this.$Te(
        E_LGC.CheckShipTowerTeamOpen,
        LevelConditionCheckShipTowerTeamOpen_1.LevelConditionCheckShipTowerTeamOpen,
        [EventDefine_1.EEventName.ShipTowerTeamPanelShown],
      ),
      this.$Te(
        E_LGC.CheckDockyardWareHouseHasItem,
        LevelConditionCheckDockyardWareHouseHasItem_1.LevelConditionCheckDockyardWareHouseHasItem,
      ),
      this.$Te(
        E_LGC.CheckFishingQteBtnHitValidArea,
        LevelConditionCheckFishingQteBtnHitValidArea_1.LevelConditionCheckFishingQteBtnHitValidArea,
        [EventDefine_1.EEventName.FishingQteBtnHitValidArea],
      ),
      this.$Te(
        E_LGC.OnFishingQteScoreReachedMaximum,
        LevelConditionOnFishingQteScoreReachedMaximum_1.LevelConditionOnFishingQteScoreReachedMaximum,
        [EventDefine_1.EEventName.OnFishingQteScoreReachedMaximum],
      ),
      this.$Te(
        E_LGC.CheckFishingTechUnlock,
        LevelConditionCheckFishingTechUnlock_1.LevelConditionCheckFishingTechUnlock,
      ),
      this.$Te(
        E_LGC.OnFishingBackpackBtnStateChange,
        LevelConditionOnFishingBackpackBtnStateChange_1.LevelConditionOnFishingBackpackBtnStateChange,
        [EventDefine_1.EEventName.FishingBackpackBtnStateChange],
      ),
      this.$Te(
        E_LGC.CheckFishingEntrustState,
        LevelConditionCheckFishingEntrustState_1.LevelConditionCheckFishingEntrustState,
      ),
      this.$Te(
        E_LGC.CheckFishingWareHouseItemListLength,
        LevelConditionCheckFishingWareHouseItemListLength_1.LevelConditionCheckFishingWareHouseItemListLength,
      ),
      this.$Te(
        E_LGC.CheckCurFishingEntrustAvailablePeriod,
        LevelConditionCheckFishingEntrustAvailablePeriod_1.LevelConditionCheckCurFishingEntrustAvailablePeriod,
      ),
      this.$Te(
        E_LGC.OnTreasureCompassUnitShow,
        LevelConditionOnTreasureCompassUnitShow_1.LevelConditionOnTreasureCompassUnitShow,
        [EventDefine_1.EEventName.OnTreasureCompassUnitVisibleChange],
      ),
      this.$Te(
        E_LGC.OnFishingBackpackQuickSellToggleShow,
        LevelConditionOnFishingBackpackQuickSellToggleShow_1.LevelConditionOnFishingBackpackQuickSellToggleShow,
        [EventDefine_1.EEventName.OnFishingBackpackQuickSellToggleStateChange],
      ),
      this.$Te(
        E_LGC.OnPlayerTitleUnlock,
        LevelConditionOnPlayerTitleUnlock_1.LevelConditionOnPlayerTitleUnlock,
        [EventDefine_1.EEventName.OnPlayerTitleUnlock],
      ),
      this.$Te(
        E_LGC.CheckDangoMonopolyHasFinishedRound,
        LevelConditionDangoMonopolyGuide_1.LevelConditionCheckDangoMonopolyHasFinishedRound,
      ),
      this.$Te(
        E_LGC.OnDangoMonopolyMoveStop,
        LevelConditionDangoMonopolyGuide_1.LevelConditionOnDangoMonopolyMoveStop,
        [EventDefine_1.EEventName.DangoMonopolyMoveStepStartOrEnd],
      ),
      this.$Te(
        E_LGC.OnDangoAbyssPluginRoleSelect,
        LevelConditionDangoAbyssGuide_1.LevelConditionOnDangoAbyssPluginRoleSelect,
        [EventDefine_1.EEventName.OnAbyssPluginDangoSelect],
      ),
      this.$Te(
        E_LGC.CheckDangoMatchState,
        LevelConditionDangoMatchGuide_1.LevelConditionCheckDangoMatchState,
      ),
      this.$Te(
        E_LGC.OnEnterDangoMatchView,
        LevelConditionDangoMatchGuide_1.LevelConditionOnEnterDangoMatchView,
        [EventDefine_1.EEventName.OnRacingBetsViewAfterShow],
      ),
      this.$Te(
        E_LGC.OnDangoMonopolyViewStart,
        LevelConditionDangoMonopolyGuide_1.LevelConditionOnDangoMonopolyViewStart,
        [EventDefine_1.EEventName.DangoMonopolyViewStart],
      ),
      this.$Te(
        E_LGC.OnCiacconaAvgInspirationChoiceShow,
        LevelConditionCiacconaAvgGuide_1.LevelConditionOnCiacconaAvgInspirationChoiceShow,
        [EventDefine_1.EEventName.OnCiacconaAvgInspirationChoiceShow],
      ),
      this.$Te(
        E_LGC.OnMovieRogueInfoRefreshWithMultipleEnds,
        LevelConditionMovieRogueGuide_1.LevelConditionOnMovieRogueInfoRefreshWithMultipleEnds,
        [EventDefine_1.EEventName.RogueViewInfoRefresh],
      ),
      this.$Te(
        E_LGC.CheckMovieRogueFinishedEndingCount,
        LevelConditionMovieRogueGuide_1.LevelConditionCheckMovieRogueFinishedEndingCount,
      ),
      this.$Te(
        E_LGC.OnDangoAbyssEnterWithTeamExploreBtn,
        LevelConditionDangoAbyssGuide_1.LevelConditionOnDangoAbyssEnterWithTeamExploreBtn,
        [EventDefine_1.EEventName.OnAbyssTeamBtnVisibleRefresh],
      ),
      this.$Te(
        E_LGC.OnDangoMonopolyViewShowProcessEnd,
        LevelConditionDangoMonopolyGuide_1.LevelConditionOnDangoMonopolyViewShowProcessEnd,
        [EventDefine_1.EEventName.DangoMonopolyViewShowProcessStartOrEnd],
      ),
      this.$Te(
        E_LGC.OnDangoAbyssEquipPluginWithValidChange,
        LevelConditionDangoAbyssGuide_1.LevelConditionOnDangoAbyssEquipPluginWithValidChange,
        [EventDefine_1.EEventName.OnAbyssPluginEquipAttrRefresh],
      ),
      this.$Te(
        E_LGC.OnDangoAbyssEquipPluginWithInvalid,
        LevelConditionDangoAbyssGuide_1.LevelConditionOnDangoAbyssEquipPluginWithInvalid,
        [EventDefine_1.EEventName.OnAbyssPluginEquipAttrRefresh],
      ),
      this.$Te(
        E_LGC.OnCiacconaChapterFirstStart,
        LevelConditionCiacconaAvgGuide_1.LevelConditionOnCiacconaChapterFirstStart,
        [EventDefine_1.EEventName.OnCiacconaChapterFirstStart],
      ),
      this.$Te(
        E_LGC.OnCiacconaChapterRestart,
        LevelConditionCiacconaAvgGuide_1.LevelConditionOnCiacconaChapterRestart,
        [EventDefine_1.EEventName.OnCiacconaChapterRestart],
      ),
      this.$Te(
        E_LGC.CheckDangoMatchPlayerNumType,
        LevelConditionDangoMatchGuide_1.LevelConditionCheckDangoMatchPlayerNumType,
      ),
      this.$Te(
        E_LGC.OnMovieRogueLinkRefresh,
        LevelConditionMovieRogueGuide_1.LevelConditionOnMovieRogueLinkRefresh,
        [EventDefine_1.EEventName.RogueTeamEditViewLinkBtnRefresh],
      ),
      this.$Te(
        E_LGC.OnMovieRogueMapMoveEnd,
        LevelConditionMovieRogueGuide_1.LevelConditionOnMovieRogueMapMoveEnd,
        [EventDefine_1.EEventName.RogueMapMoveTweenStarOrEnd],
      ),
      this.$Te(
        E_LGC.OnDangoMonopolyCameraFocusOnMainDango,
        LevelConditionDangoMonopolyGuide_1.LevelConditionOnDangoMonopolyCameraFocusOnMainDango,
        [EventDefine_1.EEventName.DangoMonopolyCameraFocusOnMainDango],
      ),
      this.$Te(
        E_LGC.CheckDangoAbyssProgress,
        LevelConditionDangoAbyssGuide_1.LevelConditionCheckDangoAbyssProgress,
      ),
      this.$Te(
        E_LGC.CheckDangoMatchFinalEnd,
        LevelConditionDangoMatchGuide_1.LevelConditionCheckDangoMatchFinalEnd,
      ),
      this.$Te(
        E_LGC.OnUiTabViewShow,
        LevelConditionOnUiTabViewShow_1.LevelConditionOnUiTabViewShow,
        [EventDefine_1.EEventName.OpenTabView],
      ),
      this.$Te(
        E_LGC.OnMapRogueEventDetailShow,
        LevelConditionMovieRogueGuide_1.LevelConditionOnMapRogueEventDetailShow,
        [EventDefine_1.EEventName.RogueMapEventDetailOpenOrClose],
      ),
      this.$Te(
        E_LGC.CheckDangoAbyssHasItemByType,
        LevelConditionDangoAbyssGuide_1.LevelConditionCheckDangoAbyssHasItemByType,
      ),
      this.$Te(
        E_LGC.CheckMapRogueEventDetailShow,
        LevelConditionMovieRogueGuide_1.LevelConditionCheckMapRogueEventDetailShow,
        [EventDefine_1.EEventName.RogueMapEventDetailOpenOrClose],
      ),
      this.$Te(
        E_LGC.CheckGridHasExplored,
        LevelConditionMovieRogueGuide_1.LevelConditionCheckGridHasExplored,
      ),
      this.$Te(
        "CheckChildQuestFinished",
        LevelConditionQuestStepState_1.LevelConditionQuestStepState,
      ),
      this.$Te(
        "CompareQuestState",
        LevelConditionQuestState_1.LevelConditionQuestState,
      ),
      this.$Te(
        "CompareEntityState",
        LevelConditionEntityState_1.LevelConditionEntityState,
      ),
      this.$Te(
        "CompareEntitySelfState",
        LevelConditionSelfState_1.LevelConditionSelfState,
      ),
      this.$Te(
        "CompareExploreLevel",
        LevelCondictionCheckExploreLevel_1.LevelConditionCheckExploreLevel,
      ),
      this.$Te(
        "HourToHour",
        LevelConditionCheckInTodTimeSpan_1.LevelConditionCheckInTodTimeSpan,
      ),
      this.$Te(
        "RangeSphere",
        LevelConditionCheckRangeSphere_1.LevelConditionRangeSphere,
      ),
      this.$Te(
        "CompareLevelPlayRewardState",
        LevelConditionCheckLevelPlayRewardState_1.LevelConditionCheckLevelPlayRewardState,
      ),
      this.$Te("CheckItems", LevelConditionItemCheck_1.LevelConditionItemCheck),
      this.$Te("HasBuff", LevelConditionHasBuff_1.LevelConditionHasBuff),
      this.$Te(
        "CheckSystemFunction",
        LevelConditionCheckSystemFunction_1.LevelConditionCheckSystemFunction,
      ),
      this.$Te(
        "CompareLift",
        LevelConditionLiftLocation_1.LevelConditionLiftLocation,
      ),
      this.$Te(
        "CompareDungeonId",
        LevelConditionCheckDungeonId_1.LevelConditionCheckDungeonId,
      ),
      this.$Te(
        "CheckAiState",
        LevelConditionCheckAiState_1.LevelConditionCheckAiState,
      ),
      this.$Te(
        "CheckLevelPlayState",
        LevelConditionCheckLevelPlayState_1.LevelConditionCheckLevelPlayState,
      ),
      this.$Te(
        "CompareTimePeriod",
        LevelConditionCheckTodTimePeriod_1.LevelConditionCheckTodTimePeriod,
      ),
      this.$Te(
        "CompareWeather",
        LevelConditionCheckWeather_1.LevelConditionCheckWeather,
      ),
      this.$Te(
        "CheckCurrentRole",
        LevelConditionCheckCurrentCharacter_1.LevelConditionCheckCurrentCharacter,
      ),
      this.$Te(
        "ComparePlayerMotionState",
        LevelConditionCheckPlayerMotionState_1.LevelConditionCheckPlayerMotionState,
      ),
      this.$Te(
        "ComparePlayerMotionState2",
        LevelConditionCheckPlayerMotionStateNew_1.LevelConditionCheckPlayerMotionStateNew,
      ),
      this.$Te(
        "CompareEntityGroupState",
        LevelConditionCompareEntityGroupState_1.LevelConditionCompareEntityGroupState,
      ),
      this.$Te(
        "CheckPlayerStateRestriction",
        LevelConditionCheckPlayerStateRestriction_1.LevelConditionCheckPlayerStateRestriction,
      ),
      this.$Te(
        "CheckInCombat",
        LevelConditionCheckInCombat_1.LevelConditionCheckInCombat,
      ),
      this.$Te(
        "CheckJigsawInfo",
        LevelConditionsCheckJigsawInfo_1.LevelConditionCheckJigsawInfo,
      ),
      this.$Te(
        "CheckTargetAttribute",
        LevelConditionCheckTargetAttribute_1.LevelConditionCheckTargetAttribute,
      ),
      this.$Te(
        "CheckRogueAbilitySelect",
        LevelConditionCheckRogueAbilitySelect_1.LevelConditionCheckRogueAbilitySelect,
      ),
      this.$Te(
        "CompareTeammateDie",
        LevelConditionCompareTeammateDie_1.LevelConditionCompareTeammateDie,
      ),
      this.$Te(
        "CheckSystemState",
        LevelConditionCheckSystemState_1.LevelConditionCheckSystemState,
      ),
      this.$Te(
        "CompareVar",
        LevelConditionCompareVar_1.LevelConditionCompareVar,
      ),
      this.$Te(
        "CheckEntityLocked",
        LevelConditionCheckEntityLocked_1.LevelConditionCheckEntityLocked,
      ),
      this.$Te(
        "CompareNpcPerformState",
        LevelConditionCompareNpcPerformState_1.LevelConditionCompareNpcPerformState,
      ),
      this.$Te(
        "CheckTeleControlState",
        LevelConditionCheckTeleControlState_1.LevelConditionCheckTeleControlState,
      ),
      this.$Te(
        "CheckEntityHasSceneItemAttributeTag",
        LevelConditionCheckEntityHasSceneItemAttributeTag_1.LevelConditionCheckEntityHasSceneItemAttributeTag,
      ),
      this.$Te(
        "CheckVehicleCondition",
        LevelConditionCheckIsUsingVehicle_1.LevelConditionCheckIsUsingVehicle,
      ),
      this.$Te(
        "CheckCollectAnimalParts",
        LevelConditionCheckAnimalParts_1.LevelConditionCheckAnimalParts,
      ),
      this.$Te(
        "CompareFishingBoatState",
        LevelConditionCompareFishingBoatState_1.LevelConditionCompareFishingBoatState,
      ),
      this.$Te(
        "CheckEntityGravityDirection",
        LevelConditionCheckEntityGravityDirection_1.LevelConditionCheckEntityGravityDirection,
      ),
      this.$Te(
        "CheckDungeonHasSaveConfig",
        LevelConditionCheckDungeonHasSaveConfig_1.LevelConditionCheckDungeonHasSaveConfig,
      ),
      this.$Te(
        "CheckEntitesExist",
        LevelConditionCheckEntitiesExist_1.LevelConditionCheckEntitiesExist,
      ),
      this.YTe(
        0,
        LevelConditionCheckCharacterTag_1.LevelConditionCheckCharacterTag,
      ),
      this.YTe(
        1,
        LevelConditionCheckEntityCommonTag_1.LevelConditionCheckEntityCommonTag,
      ),
      this.YTe(
        2,
        LevelConditionCheckFanIsNotRotating_1.LevelConditionCheckFanIsNotRotating,
      ),
      this.YTe(3, LevelCodeConditionCheckGroup_1.LevelCodeConditionCheckGroup),
      this.YTe(
        4,
        LevelConditionCheckGravityFlipEntityDirectionSameAsPlayer_1.LevelConditionCheckGravityFlipEntityDirectionSameAsPlayer,
      ),
      this.Z_c(
        "CheckClientEvent",
        LevelConditionCheckClientEvent_1.LevelConditionCheckClientEvent,
        new Map([[EventDefine_1.EEventName.CheckClientEvent, [0, 1]]]),
      );
  }
  static $Te(e, i, n) {
    this.JTe.set(e, { LevelCondition: new i(), EventNames: n || [] });
  }
  static Z_c(e, i, n) {
    this.$Te(e, i), this.ecc.has(e) || this.ecc.set(e, new Map());
    for (var [t, o] of n) {
      this.tcc.has(t) || this.tcc.set(t, new Set()),
        this.tcc.get(t).add(e),
        this.ecc.get(e).has(t) || this.ecc.get(e).set(t, new Set());
      for (const C of o) this.ecc.get(e).get(t).add(C);
    }
  }
  static YTe(e, i) {
    this.zTe.set(e, new i());
  }
  static GetCondition(e) {
    if (this.JTe.has(e)) return this.JTe.get(e).LevelCondition;
  }
  static GetConditionsByEvent(e) {
    return this.tcc.get(e);
  }
  static GetCodeCondition(e) {
    return this.zTe.get(e);
  }
  static GetConditionEventNames(e) {
    return this.JTe.has(e) ? this.JTe.get(e).EventNames : [];
  }
  static GetConditionListenerEventInfo(e) {
    return this.ecc.get(e);
  }
  static GetConditionExParams(e) {
    return this.ZTe.get(e);
  }
  static SetConditionExParams(e, i) {
    this.ZTe.set(e, i);
  }
  static GmDebugMonitor(e) {
    this.eLe = e ? new Map() : void 0;
  }
  static GmDebugCheckCondition(e) {
    return !!this.eLe && !!this.eLe.has(e) && (this.eLe.get(e) ?? !1);
  }
  static GmDebugConditionResultCache(e, i) {
    this.eLe && this.eLe.set(e, i);
  }
}
((exports.LevelConditionCenter = LevelConditionCenter).JTe = new Map()),
  (LevelConditionCenter.zTe = new Map()),
  (LevelConditionCenter.eLe = void 0),
  (LevelConditionCenter.ZTe = new Map()),
  (LevelConditionCenter.tcc = new Map()),
  (LevelConditionCenter.ecc = new Map());
//# sourceMappingURL=LevelConditionCenter.js.map
