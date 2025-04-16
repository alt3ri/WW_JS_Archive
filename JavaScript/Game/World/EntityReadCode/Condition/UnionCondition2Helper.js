"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCondition2Helper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbCheckAiState_1 = require("./FbCheckAiState"),
  FbCheckAlertAreaEnabled_1 = require("./FbCheckAlertAreaEnabled"),
  FbCheckCalabashDevelopRewardCondition_1 = require("./FbCheckCalabashDevelopRewardCondition"),
  FbCheckCertainFishingItemCount_1 = require("./FbCheckCertainFishingItemCount"),
  FbCheckChessWinner_1 = require("./FbCheckChessWinner"),
  FbCheckChildQuestFinished_1 = require("./FbCheckChildQuestFinished"),
  FbCheckChildQuestStatus_1 = require("./FbCheckChildQuestStatus"),
  FbCheckClientEvent_1 = require("./FbCheckClientEvent"),
  FbCheckCollectAnimalParts_1 = require("./FbCheckCollectAnimalParts"),
  FbCheckCurrentRole_1 = require("./FbCheckCurrentRole"),
  FbCheckDangoCultivationProgress_1 = require("./FbCheckDangoCultivationProgress"),
  FbCheckDataLayerCondition_1 = require("./FbCheckDataLayerCondition"),
  FbCheckDirectionCondition_1 = require("./FbCheckDirectionCondition"),
  FbCheckDungeonFinish_1 = require("./FbCheckDungeonFinish"),
  FbCheckDungeonHasSaveConfig_1 = require("./FbCheckDungeonHasSaveConfig"),
  FbCheckEntitiesExist_1 = require("./FbCheckEntitiesExist"),
  FbCheckEntityDistanceCondition_1 = require("./FbCheckEntityDistanceCondition"),
  FbCheckEntityGravityDirection_1 = require("./FbCheckEntityGravityDirection"),
  FbCheckEntityHasSceneItemAttributeTag_1 = require("./FbCheckEntityHasSceneItemAttributeTag"),
  FbCheckEntityIsVisibility_1 = require("./FbCheckEntityIsVisibility"),
  FbCheckEntityLockedCondition_1 = require("./FbCheckEntityLockedCondition"),
  FbCheckEntityPosition_1 = require("./FbCheckEntityPosition"),
  FbCheckEntityReward_1 = require("./FbCheckEntityReward"),
  FbCheckFinishLoading_1 = require("./FbCheckFinishLoading"),
  FbCheckFishingCageFillingRatio_1 = require("./FbCheckFishingCageFillingRatio"),
  FbCheckFishingPointHasFish_1 = require("./FbCheckFishingPointHasFish"),
  FbCheckFormationRoleInfoCondition_1 = require("./FbCheckFormationRoleInfoCondition"),
  FbCheckGameplayTagCondition_1 = require("./FbCheckGameplayTagCondition"),
  FbCheckGuestCharacter_1 = require("./FbCheckGuestCharacter"),
  FbCheckHookLockPointCondition_1 = require("./FbCheckHookLockPointCondition"),
  FbCheckInCombat_1 = require("./FbCheckInCombat"),
  FbCheckInRangeCondition_1 = require("./FbCheckInRangeCondition"),
  FbCheckIsGramophonePlayingMusic_1 = require("./FbCheckIsGramophonePlayingMusic"),
  FbCheckItems_1 = require("./FbCheckItems"),
  FbCheckJigsawInfoCondition_1 = require("./FbCheckJigsawInfoCondition"),
  FbCheckLevelPlayCompleteNumber_1 = require("./FbCheckLevelPlayCompleteNumber"),
  FbCheckLevelPlayState_1 = require("./FbCheckLevelPlayState"),
  FbCheckLordGymFinishCondition_1 = require("./FbCheckLordGymFinishCondition"),
  FbCheckNodeStatus_1 = require("./FbCheckNodeStatus"),
  FbCheckPlayerCanJoinActivityCondition_1 = require("./FbCheckPlayerCanJoinActivityCondition"),
  FbCheckPlayerGender_1 = require("./FbCheckPlayerGender"),
  FbCheckPlayerPosition_1 = require("./FbCheckPlayerPosition"),
  FbCheckPlayerSkillReadyCondition_1 = require("./FbCheckPlayerSkillReadyCondition"),
  FbCheckPlayerStateRestrictionCondition_1 = require("./FbCheckPlayerStateRestrictionCondition"),
  FbCheckRogueAbilitySelectCondition_1 = require("./FbCheckRogueAbilitySelectCondition"),
  FbCheckSubLevelState_1 = require("./FbCheckSubLevelState"),
  FbCheckSystemEventBvb_1 = require("./FbCheckSystemEventBvb"),
  FbCheckSystemFunction_1 = require("./FbCheckSystemFunction"),
  FbCheckSystemStateCondition_1 = require("./FbCheckSystemStateCondition"),
  FbCheckTargetAttributeCondition_1 = require("./FbCheckTargetAttributeCondition"),
  FbCheckTeleControlState_1 = require("./FbCheckTeleControlState"),
  FbCheckTreasureBeenClaimedCondition_1 = require("./FbCheckTreasureBeenClaimedCondition"),
  FbCheckVehicleCondition_1 = require("./FbCheckVehicleCondition"),
  FbCompareAlertValue_1 = require("./FbCompareAlertValue"),
  FbCompareCalabashLevelCondition_1 = require("./FbCompareCalabashLevelCondition"),
  FbCompareDungeonId_1 = require("./FbCompareDungeonId"),
  FbCompareEntityGroupStateCondition_1 = require("./FbCompareEntityGroupStateCondition"),
  FbCompareEntitySelfStateCondition_1 = require("./FbCompareEntitySelfStateCondition"),
  FbCompareEntityStateCondition_1 = require("./FbCompareEntityStateCondition"),
  FbCompareExploreLevelCondition_1 = require("./FbCompareExploreLevelCondition"),
  FbCompareFishingBoatState_1 = require("./FbCompareFishingBoatState"),
  FbCompareFishingPrestigeLevelCondition_1 = require("./FbCompareFishingPrestigeLevelCondition"),
  FbCompareFishingTechLevel_1 = require("./FbCompareFishingTechLevel"),
  FbCompareLevelPlayRewardStateCondition_1 = require("./FbCompareLevelPlayRewardStateCondition"),
  FbCompareLiftCondition_1 = require("./FbCompareLiftCondition"),
  FbCompareNpcPerformStateCondition_1 = require("./FbCompareNpcPerformStateCondition"),
  FbComparePlayerMotionState_1 = require("./FbComparePlayerMotionState"),
  FbComparePlayerMotionState2_1 = require("./FbComparePlayerMotionState2"),
  FbComparePlayerNumInDungeon_1 = require("./FbComparePlayerNumInDungeon"),
  FbCompareTeammateDieCondition_1 = require("./FbCompareTeammateDieCondition"),
  FbCompareTimePeriod_1 = require("./FbCompareTimePeriod"),
  FbCompareVarCondition_1 = require("./FbCompareVarCondition"),
  FbCompareWeather_1 = require("./FbCompareWeather"),
  FbCompleteCertainFishingEntrust_1 = require("./FbCompleteCertainFishingEntrust"),
  FbCustomJsonCondition_1 = require("./FbCustomJsonCondition"),
  FbHasBuff_1 = require("./FbHasBuff"),
  FbHourToHourCondition_1 = require("./FbHourToHourCondition"),
  FbListenEntitySelfEventCondition_1 = require("./FbListenEntitySelfEventCondition"),
  FbListenEntityThroughPortal_1 = require("./FbListenEntityThroughPortal"),
  FbQuestStateEqualCondition_1 = require("./FbQuestStateEqualCondition"),
  FbRangeSphere_1 = require("./FbRangeSphere");
class UnionCondition2Helper {
  static GetUnionCondition2Object(e) {
    switch (e) {
      case fb_condition_1.UnionCondition2.CompareVarCondition:
        return new fb_condition_1.CompareVarCondition();
      case fb_condition_1.UnionCondition2.QuestStateEqualCondition:
        return new fb_condition_1.QuestStateEqualCondition();
      case fb_condition_1.UnionCondition2.CompareExploreLevelCondition:
        return new fb_condition_1.CompareExploreLevelCondition();
      case fb_condition_1.UnionCondition2.CompareCalabashLevelCondition:
        return new fb_condition_1.CompareCalabashLevelCondition();
      case fb_condition_1.UnionCondition2.CompareLiftCondition:
        return new fb_condition_1.CompareLiftCondition();
      case fb_condition_1.UnionCondition2.CompareEntityStateCondition:
        return new fb_condition_1.CompareEntityStateCondition();
      case fb_condition_1.UnionCondition2.CompareNpcPerformStateCondition:
        return new fb_condition_1.CompareNpcPerformStateCondition();
      case fb_condition_1.UnionCondition2.CheckTreasureBeenClaimedCondition:
        return new fb_condition_1.CheckTreasureBeenClaimedCondition();
      case fb_condition_1.UnionCondition2.CompareEntityGroupStateCondition:
        return new fb_condition_1.CompareEntityGroupStateCondition();
      case fb_condition_1.UnionCondition2.CompareEntitySelfStateCondition:
        return new fb_condition_1.CompareEntitySelfStateCondition();
      case fb_condition_1.UnionCondition2.CompareLevelPlayRewardStateCondition:
        return new fb_condition_1.CompareLevelPlayRewardStateCondition();
      case fb_condition_1.UnionCondition2.HourToHourCondition:
        return new fb_condition_1.HourToHourCondition();
      case fb_condition_1.UnionCondition2.RangeSphere:
        return new fb_condition_1.RangeSphere();
      case fb_condition_1.UnionCondition2.CheckItems:
        return new fb_condition_1.CheckItems();
      case fb_condition_1.UnionCondition2.HasBuff:
        return new fb_condition_1.HasBuff();
      case fb_condition_1.UnionCondition2.CheckSystemFunction:
        return new fb_condition_1.CheckSystemFunction();
      case fb_condition_1.UnionCondition2.CheckAiState:
        return new fb_condition_1.CheckAiState();
      case fb_condition_1.UnionCondition2.CompareDungeonId:
        return new fb_condition_1.CompareDungeonId();
      case fb_condition_1.UnionCondition2.CompareTimePeriod:
        return new fb_condition_1.CompareTimePeriod();
      case fb_condition_1.UnionCondition2.CompareWeather:
        return new fb_condition_1.CompareWeather();
      case fb_condition_1.UnionCondition2.CheckLevelPlayState:
        return new fb_condition_1.CheckLevelPlayState();
      case fb_condition_1.UnionCondition2.CheckLevelPlayCompleteNumber:
        return new fb_condition_1.CheckLevelPlayCompleteNumber();
      case fb_condition_1.UnionCondition2.CheckCurrentRole:
        return new fb_condition_1.CheckCurrentRole();
      case fb_condition_1.UnionCondition2.CheckPlayerGender:
        return new fb_condition_1.CheckPlayerGender();
      case fb_condition_1.UnionCondition2.CheckInCombat:
        return new fb_condition_1.CheckInCombat();
      case fb_condition_1.UnionCondition2.CheckChildQuestFinished:
        return new fb_condition_1.CheckChildQuestFinished();
      case fb_condition_1.UnionCondition2.CheckNodeStatus:
        return new fb_condition_1.CheckNodeStatus();
      case fb_condition_1.UnionCondition2.CheckChildQuestStatus:
        return new fb_condition_1.CheckChildQuestStatus();
      case fb_condition_1.UnionCondition2.CheckEntitiesExist:
        return new fb_condition_1.CheckEntitiesExist();
      case fb_condition_1.UnionCondition2.CheckPlayerPosition:
        return new fb_condition_1.CheckPlayerPosition();
      case fb_condition_1.UnionCondition2.CheckEntityPosition:
        return new fb_condition_1.CheckEntityPosition();
      case fb_condition_1.UnionCondition2.CheckDungeonFinish:
        return new fb_condition_1.CheckDungeonFinish();
      case fb_condition_1.UnionCondition2.CheckEntityIsVisibility:
        return new fb_condition_1.CheckEntityIsVisibility();
      case fb_condition_1.UnionCondition2.ComparePlayerMotionState:
        return new fb_condition_1.ComparePlayerMotionState();
      case fb_condition_1.UnionCondition2.ComparePlayerMotionState2:
        return new fb_condition_1.ComparePlayerMotionState2();
      case fb_condition_1.UnionCondition2.CheckDataLayerCondition:
        return new fb_condition_1.CheckDataLayerCondition();
      case fb_condition_1.UnionCondition2.CheckHookLockPointCondition:
        return new fb_condition_1.CheckHookLockPointCondition();
      case fb_condition_1.UnionCondition2.CheckPlayerSkillReadyCondition:
        return new fb_condition_1.CheckPlayerSkillReadyCondition();
      case fb_condition_1.UnionCondition2.CheckPlayerStateRestrictionCondition:
        return new fb_condition_1.CheckPlayerStateRestrictionCondition();
      case fb_condition_1.UnionCondition2.CheckLordGymFinishCondition:
        return new fb_condition_1.CheckLordGymFinishCondition();
      case fb_condition_1.UnionCondition2.CheckCalabashDevelopRewardCondition:
        return new fb_condition_1.CheckCalabashDevelopRewardCondition();
      case fb_condition_1.UnionCondition2.CompareFishingPrestigeLevelCondition:
        return new fb_condition_1.CompareFishingPrestigeLevelCondition();
      case fb_condition_1.UnionCondition2.CheckCertainFishingItemCount:
        return new fb_condition_1.CheckCertainFishingItemCount();
      case fb_condition_1.UnionCondition2.CompleteCertainFishingEntrust:
        return new fb_condition_1.CompleteCertainFishingEntrust();
      case fb_condition_1.UnionCondition2.CompareFishingBoatState:
        return new fb_condition_1.CompareFishingBoatState();
      case fb_condition_1.UnionCondition2.CheckJigsawInfoCondition:
        return new fb_condition_1.CheckJigsawInfoCondition();
      case fb_condition_1.UnionCondition2.CheckGameplayTagCondition:
        return new fb_condition_1.CheckGameplayTagCondition();
      case fb_condition_1.UnionCondition2.CheckFormationRoleInfoCondition:
        return new fb_condition_1.CheckFormationRoleInfoCondition();
      case fb_condition_1.UnionCondition2.CheckTargetAttributeCondition:
        return new fb_condition_1.CheckTargetAttributeCondition();
      case fb_condition_1.UnionCondition2.CheckRogueAbilitySelectCondition:
        return new fb_condition_1.CheckRogueAbilitySelectCondition();
      case fb_condition_1.UnionCondition2.CheckDirectionCondition:
        return new fb_condition_1.CheckDirectionCondition();
      case fb_condition_1.UnionCondition2.CheckPlayerCanJoinActivityCondition:
        return new fb_condition_1.CheckPlayerCanJoinActivityCondition();
      case fb_condition_1.UnionCondition2.CheckSystemStateCondition:
        return new fb_condition_1.CheckSystemStateCondition();
      case fb_condition_1.UnionCondition2.CheckInRangeCondition:
        return new fb_condition_1.CheckInRangeCondition();
      case fb_condition_1.UnionCondition2.CheckEntityLockedCondition:
        return new fb_condition_1.CheckEntityLockedCondition();
      case fb_condition_1.UnionCondition2.CompareTeammateDieCondition:
        return new fb_condition_1.CompareTeammateDieCondition();
      case fb_condition_1.UnionCondition2.ListenEntitySelfEventCondition:
        return new fb_condition_1.ListenEntitySelfEventCondition();
      case fb_condition_1.UnionCondition2.CheckEntityDistanceCondition:
        return new fb_condition_1.CheckEntityDistanceCondition();
      case fb_condition_1.UnionCondition2.CheckEntityHasSceneItemAttributeTag:
        return new fb_condition_1.CheckEntityHasSceneItemAttributeTag();
      case fb_condition_1.UnionCondition2.ListenEntityThroughPortal:
        return new fb_condition_1.ListenEntityThroughPortal();
      case fb_condition_1.UnionCondition2.CheckTeleControlState:
        return new fb_condition_1.CheckTeleControlState();
      case fb_condition_1.UnionCondition2.CustomJsonCondition:
        return new fb_condition_1.CustomJsonCondition();
      case fb_condition_1.UnionCondition2.CheckChessWinner:
        return new fb_condition_1.CheckChessWinner();
      case fb_condition_1.UnionCondition2.CheckVehicleCondition:
        return new fb_condition_1.CheckVehicleCondition();
      case fb_condition_1.UnionCondition2.CompareAlertValue:
        return new fb_condition_1.CompareAlertValue();
      case fb_condition_1.UnionCondition2.CheckEntityGravityDirection:
        return new fb_condition_1.CheckEntityGravityDirection();
      case fb_condition_1.UnionCondition2.CheckCollectAnimalParts:
        return new fb_condition_1.CheckCollectAnimalParts();
      case fb_condition_1.UnionCondition2.CheckFinishLoading:
        return new fb_condition_1.CheckFinishLoading();
      case fb_condition_1.UnionCondition2.CheckFishingPointHasFish:
        return new fb_condition_1.CheckFishingPointHasFish();
      case fb_condition_1.UnionCondition2.CheckFishingCageFillingRatio:
        return new fb_condition_1.CheckFishingCageFillingRatio();
      case fb_condition_1.UnionCondition2.CompareFishingTechLevel:
        return new fb_condition_1.CompareFishingTechLevel();
      case fb_condition_1.UnionCondition2.CheckGuestCharacter:
        return new fb_condition_1.CheckGuestCharacter();
      case fb_condition_1.UnionCondition2.CheckSubLevelState:
        return new fb_condition_1.CheckSubLevelState();
      case fb_condition_1.UnionCondition2.ComparePlayerNumInDungeon:
        return new fb_condition_1.ComparePlayerNumInDungeon();
      case fb_condition_1.UnionCondition2.CheckAlertAreaEnabled:
        return new fb_condition_1.CheckAlertAreaEnabled();
      case fb_condition_1.UnionCondition2.CheckClientEvent:
        return new fb_condition_1.CheckClientEvent();
      case fb_condition_1.UnionCondition2.CheckIsGramophonePlayingMusic:
        return new fb_condition_1.CheckIsGramophonePlayingMusic();
      case fb_condition_1.UnionCondition2.CheckEntityReward:
        return new fb_condition_1.CheckEntityReward();
      case fb_condition_1.UnionCondition2.CheckDungeonHasSaveConfig:
        return new fb_condition_1.CheckDungeonHasSaveConfig();
      case fb_condition_1.UnionCondition2.CheckSystemEventBvb:
        return new fb_condition_1.CheckSystemEventBvb();
      case fb_condition_1.UnionCondition2.CheckDangoCultivationProgress:
        return new fb_condition_1.CheckDangoCultivationProgress();
      default:
        return;
    }
  }
  static ReadUnionCondition2(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_condition_1.UnionCondition2.CompareVarCondition:
          return FbCompareVarCondition_1.FbCompareVarCondition.Create(n);
        case fb_condition_1.UnionCondition2.QuestStateEqualCondition:
          return FbQuestStateEqualCondition_1.FbQuestStateEqualCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CompareExploreLevelCondition:
          return FbCompareExploreLevelCondition_1.FbCompareExploreLevelCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CompareCalabashLevelCondition:
          return FbCompareCalabashLevelCondition_1.FbCompareCalabashLevelCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CompareLiftCondition:
          return FbCompareLiftCondition_1.FbCompareLiftCondition.Create(n);
        case fb_condition_1.UnionCondition2.CompareEntityStateCondition:
          return FbCompareEntityStateCondition_1.FbCompareEntityStateCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CompareNpcPerformStateCondition:
          return FbCompareNpcPerformStateCondition_1.FbCompareNpcPerformStateCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckTreasureBeenClaimedCondition:
          return FbCheckTreasureBeenClaimedCondition_1.FbCheckTreasureBeenClaimedCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CompareEntityGroupStateCondition:
          return FbCompareEntityGroupStateCondition_1.FbCompareEntityGroupStateCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CompareEntitySelfStateCondition:
          return FbCompareEntitySelfStateCondition_1.FbCompareEntitySelfStateCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2
          .CompareLevelPlayRewardStateCondition:
          return FbCompareLevelPlayRewardStateCondition_1.FbCompareLevelPlayRewardStateCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.HourToHourCondition:
          return FbHourToHourCondition_1.FbHourToHourCondition.Create(n);
        case fb_condition_1.UnionCondition2.RangeSphere:
          return FbRangeSphere_1.FbRangeSphere.Create(n);
        case fb_condition_1.UnionCondition2.CheckItems:
          return FbCheckItems_1.FbCheckItems.Create(n);
        case fb_condition_1.UnionCondition2.HasBuff:
          return FbHasBuff_1.FbHasBuff.Create(n);
        case fb_condition_1.UnionCondition2.CheckSystemFunction:
          return FbCheckSystemFunction_1.FbCheckSystemFunction.Create(n);
        case fb_condition_1.UnionCondition2.CheckAiState:
          return FbCheckAiState_1.FbCheckAiState.Create(n);
        case fb_condition_1.UnionCondition2.CompareDungeonId:
          return FbCompareDungeonId_1.FbCompareDungeonId.Create(n);
        case fb_condition_1.UnionCondition2.CompareTimePeriod:
          return FbCompareTimePeriod_1.FbCompareTimePeriod.Create(n);
        case fb_condition_1.UnionCondition2.CompareWeather:
          return FbCompareWeather_1.FbCompareWeather.Create(n);
        case fb_condition_1.UnionCondition2.CheckLevelPlayState:
          return FbCheckLevelPlayState_1.FbCheckLevelPlayState.Create(n);
        case fb_condition_1.UnionCondition2.CheckLevelPlayCompleteNumber:
          return FbCheckLevelPlayCompleteNumber_1.FbCheckLevelPlayCompleteNumber.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckCurrentRole:
          return FbCheckCurrentRole_1.FbCheckCurrentRole.Create(n);
        case fb_condition_1.UnionCondition2.CheckPlayerGender:
          return FbCheckPlayerGender_1.FbCheckPlayerGender.Create(n);
        case fb_condition_1.UnionCondition2.CheckInCombat:
          return FbCheckInCombat_1.FbCheckInCombat.Create(n);
        case fb_condition_1.UnionCondition2.CheckChildQuestFinished:
          return FbCheckChildQuestFinished_1.FbCheckChildQuestFinished.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckNodeStatus:
          return FbCheckNodeStatus_1.FbCheckNodeStatus.Create(n);
        case fb_condition_1.UnionCondition2.CheckChildQuestStatus:
          return FbCheckChildQuestStatus_1.FbCheckChildQuestStatus.Create(n);
        case fb_condition_1.UnionCondition2.CheckEntitiesExist:
          return FbCheckEntitiesExist_1.FbCheckEntitiesExist.Create(n);
        case fb_condition_1.UnionCondition2.CheckPlayerPosition:
          return FbCheckPlayerPosition_1.FbCheckPlayerPosition.Create(n);
        case fb_condition_1.UnionCondition2.CheckEntityPosition:
          return FbCheckEntityPosition_1.FbCheckEntityPosition.Create(n);
        case fb_condition_1.UnionCondition2.CheckDungeonFinish:
          return FbCheckDungeonFinish_1.FbCheckDungeonFinish.Create(n);
        case fb_condition_1.UnionCondition2.CheckEntityIsVisibility:
          return FbCheckEntityIsVisibility_1.FbCheckEntityIsVisibility.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.ComparePlayerMotionState:
          return FbComparePlayerMotionState_1.FbComparePlayerMotionState.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.ComparePlayerMotionState2:
          return FbComparePlayerMotionState2_1.FbComparePlayerMotionState2.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckDataLayerCondition:
          return FbCheckDataLayerCondition_1.FbCheckDataLayerCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckHookLockPointCondition:
          return FbCheckHookLockPointCondition_1.FbCheckHookLockPointCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckPlayerSkillReadyCondition:
          return FbCheckPlayerSkillReadyCondition_1.FbCheckPlayerSkillReadyCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2
          .CheckPlayerStateRestrictionCondition:
          return FbCheckPlayerStateRestrictionCondition_1.FbCheckPlayerStateRestrictionCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckLordGymFinishCondition:
          return FbCheckLordGymFinishCondition_1.FbCheckLordGymFinishCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckCalabashDevelopRewardCondition:
          return FbCheckCalabashDevelopRewardCondition_1.FbCheckCalabashDevelopRewardCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2
          .CompareFishingPrestigeLevelCondition:
          return FbCompareFishingPrestigeLevelCondition_1.FbCompareFishingPrestigeLevelCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckCertainFishingItemCount:
          return FbCheckCertainFishingItemCount_1.FbCheckCertainFishingItemCount.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CompleteCertainFishingEntrust:
          return FbCompleteCertainFishingEntrust_1.FbCompleteCertainFishingEntrust.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CompareFishingBoatState:
          return FbCompareFishingBoatState_1.FbCompareFishingBoatState.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckJigsawInfoCondition:
          return FbCheckJigsawInfoCondition_1.FbCheckJigsawInfoCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckGameplayTagCondition:
          return FbCheckGameplayTagCondition_1.FbCheckGameplayTagCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckFormationRoleInfoCondition:
          return FbCheckFormationRoleInfoCondition_1.FbCheckFormationRoleInfoCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckTargetAttributeCondition:
          return FbCheckTargetAttributeCondition_1.FbCheckTargetAttributeCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckRogueAbilitySelectCondition:
          return FbCheckRogueAbilitySelectCondition_1.FbCheckRogueAbilitySelectCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckDirectionCondition:
          return FbCheckDirectionCondition_1.FbCheckDirectionCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckPlayerCanJoinActivityCondition:
          return FbCheckPlayerCanJoinActivityCondition_1.FbCheckPlayerCanJoinActivityCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckSystemStateCondition:
          return FbCheckSystemStateCondition_1.FbCheckSystemStateCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckInRangeCondition:
          return FbCheckInRangeCondition_1.FbCheckInRangeCondition.Create(n);
        case fb_condition_1.UnionCondition2.CheckEntityLockedCondition:
          return FbCheckEntityLockedCondition_1.FbCheckEntityLockedCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CompareTeammateDieCondition:
          return FbCompareTeammateDieCondition_1.FbCompareTeammateDieCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.ListenEntitySelfEventCondition:
          return FbListenEntitySelfEventCondition_1.FbListenEntitySelfEventCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckEntityDistanceCondition:
          return FbCheckEntityDistanceCondition_1.FbCheckEntityDistanceCondition.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckEntityHasSceneItemAttributeTag:
          return FbCheckEntityHasSceneItemAttributeTag_1.FbCheckEntityHasSceneItemAttributeTag.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.ListenEntityThroughPortal:
          return FbListenEntityThroughPortal_1.FbListenEntityThroughPortal.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckTeleControlState:
          return FbCheckTeleControlState_1.FbCheckTeleControlState.Create(n);
        case fb_condition_1.UnionCondition2.CustomJsonCondition:
          return FbCustomJsonCondition_1.FbCustomJsonCondition.Create(n);
        case fb_condition_1.UnionCondition2.CheckChessWinner:
          return FbCheckChessWinner_1.FbCheckChessWinner.Create(n);
        case fb_condition_1.UnionCondition2.CheckVehicleCondition:
          return FbCheckVehicleCondition_1.FbCheckVehicleCondition.Create(n);
        case fb_condition_1.UnionCondition2.CompareAlertValue:
          return FbCompareAlertValue_1.FbCompareAlertValue.Create(n);
        case fb_condition_1.UnionCondition2.CheckEntityGravityDirection:
          return FbCheckEntityGravityDirection_1.FbCheckEntityGravityDirection.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckCollectAnimalParts:
          return FbCheckCollectAnimalParts_1.FbCheckCollectAnimalParts.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckFinishLoading:
          return FbCheckFinishLoading_1.FbCheckFinishLoading.Create(n);
        case fb_condition_1.UnionCondition2.CheckFishingPointHasFish:
          return FbCheckFishingPointHasFish_1.FbCheckFishingPointHasFish.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckFishingCageFillingRatio:
          return FbCheckFishingCageFillingRatio_1.FbCheckFishingCageFillingRatio.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CompareFishingTechLevel:
          return FbCompareFishingTechLevel_1.FbCompareFishingTechLevel.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckGuestCharacter:
          return FbCheckGuestCharacter_1.FbCheckGuestCharacter.Create(n);
        case fb_condition_1.UnionCondition2.CheckSubLevelState:
          return FbCheckSubLevelState_1.FbCheckSubLevelState.Create(n);
        case fb_condition_1.UnionCondition2.ComparePlayerNumInDungeon:
          return FbComparePlayerNumInDungeon_1.FbComparePlayerNumInDungeon.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckAlertAreaEnabled:
          return FbCheckAlertAreaEnabled_1.FbCheckAlertAreaEnabled.Create(n);
        case fb_condition_1.UnionCondition2.CheckClientEvent:
          return FbCheckClientEvent_1.FbCheckClientEvent.Create(n);
        case fb_condition_1.UnionCondition2.CheckIsGramophonePlayingMusic:
          return FbCheckIsGramophonePlayingMusic_1.FbCheckIsGramophonePlayingMusic.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckEntityReward:
          return FbCheckEntityReward_1.FbCheckEntityReward.Create(n);
        case fb_condition_1.UnionCondition2.CheckDungeonHasSaveConfig:
          return FbCheckDungeonHasSaveConfig_1.FbCheckDungeonHasSaveConfig.Create(
            n,
          );
        case fb_condition_1.UnionCondition2.CheckSystemEventBvb:
          return FbCheckSystemEventBvb_1.FbCheckSystemEventBvb.Create(n);
        case fb_condition_1.UnionCondition2.CheckDangoCultivationProgress:
          return FbCheckDangoCultivationProgress_1.FbCheckDangoCultivationProgress.Create(
            n,
          );
        default:
          return;
      }
  }
}
exports.UnionCondition2Helper = UnionCondition2Helper;
//# sourceMappingURL=UnionCondition2Helper.js.map
