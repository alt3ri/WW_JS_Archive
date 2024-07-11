"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventCenter = void 0);
const Log_1 = require("../../../Core/Common/Log");
const GlobalData_1 = require("../../GlobalData");
const LevelEventChangePhantomFormation_1 = require("../LevelEventChangePhantomFormation");
const LevelEventRestorePhantomFormation_1 = require("../LevelEventRestorePhantomFormation");
const LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
const LevelEventAddBuffToCreature_1 = require("./LevelEventAddBuffToCreature");
const LevelEventAddBuffToEntity_1 = require("./LevelEventAddBuffToEntity");
const LevelEventAddBuffToTriggeredEntity_1 = require("./LevelEventAddBuffToTriggeredEntity");
const LevelEventAddCreatureTag_1 = require("./LevelEventAddCreatureTag");
const LevelEventAddInputTag_1 = require("./LevelEventAddInputTag");
const LevelEventAddTag_1 = require("./LevelEventAddTag");
const LevelEventAddTrialCharacter_1 = require("./LevelEventAddTrialCharacter");
const LevelEventAdjustPlayerCamera_1 = require("./LevelEventAdjustPlayerCamera");
const LevelEventAdjustTodTime_1 = require("./LevelEventAdjustTodTime");
const LevelEventAudioEvent_1 = require("./LevelEventAudioEvent");
const LevelEventCameraLookAtPosition_1 = require("./LevelEventCameraLookAtPosition");
const LevelEventCameraShake_1 = require("./LevelEventCameraShake");
const LevelEventCaptureRequest_1 = require("./LevelEventCaptureRequest");
const LevelEventChangeAI_1 = require("./LevelEventChangeAI");
const LevelEventChangeEntityPerformanceState_1 = require("./LevelEventChangeEntityPerformanceState");
const LevelEventChangeFightIntensity_1 = require("./LevelEventChangeFightIntensity");
const LevelEventChangePatrol_1 = require("./LevelEventChangePatrol");
const LevelEventChangeToVision_1 = require("./LevelEventChangeToVision");
const LevelEventCharacterMove_1 = require("./LevelEventCharacterMove");
const LevelEventCheckBattleState_1 = require("./LevelEventCheckBattleState");
const LevelEventCheckFlyState_1 = require("./LevelEventCheckFlyState");
const LevelEventClaimDungeonReward_1 = require("./LevelEventClaimDungeonReward");
const LevelEventClaimLevelPlayReward_1 = require("./LevelEventClaimLevelPlayReward");
const LevelEventCollect_1 = require("./LevelEventCollect");
const LevelEventCompleteGuide_1 = require("./LevelEventCompleteGuide");
const LevelEventControlTodTime_1 = require("./LevelEventControlTodTime");
const LevelEventDeliverQuestBehavior_1 = require("./LevelEventDeliverQuestBehavior");
const LevelEventEnableAi_1 = require("./LevelEventEnableAi");
const LevelEventEnableHostility_1 = require("./LevelEventEnableHostility");
const LevelEventEnableMapView_1 = require("./LevelEventEnableMapView");
const LevelEventEnableSplineMoveModel_1 = require("./LevelEventEnableSplineMoveModel");
const LevelEventEnterOrbitalCamera_1 = require("./LevelEventEnterOrbitalCamera");
const LevelEventEnterSequenceCamera_1 = require("./LevelEventEnterSequenceCamera");
const LevelEventEntityLookAt_1 = require("./LevelEventEntityLookAt");
const LevelEventExecution_1 = require("./LevelEventExecution");
const LevelEventExitCameraLookAtPosition_1 = require("./LevelEventExitCameraLookAtPosition");
const LevelEventExitDungeon_1 = require("./LevelEventExitDungeon");
const LevelEventExitOrbitalCamera_1 = require("./LevelEventExitOrbitalCamera");
const LevelEventFadeInScreen_1 = require("./LevelEventFadeInScreen");
const LevelEventFadeOutScreen_1 = require("./LevelEventFadeOutScreen");
const LevelEventFocusOnInformationBoard_1 = require("./LevelEventFocusOnInformationBoard");
const LevelEventForceLockOnSpecialTagTarget_1 = require("./LevelEventForceLockOnSpecialTagTarget");
const LevelEventGuideFinish_1 = require("./LevelEventGuideFinish");
const LevelEventGuideTrigger_1 = require("./LevelEventGuideTrigger");
const LevelEventHideTargetRange_1 = require("./LevelEventHideTargetRange");
const LevelEventHighlightExploreUi_1 = require("./LevelEventHighlightExploreUi");
const LevelEventInteractFan_1 = require("./LevelEventInteractFan");
const LevelEventInterludeActions_1 = require("./LevelEventInterludeActions");
const LevelEventLeisureInteract_1 = require("./LevelEventLeisureInteract");
const LevelEventLog_1 = require("./LevelEventLog");
const LevelEventModifyActorMaterial_1 = require("./LevelEventModifyActorMaterial");
const LevelEventMoveJigsawItem_1 = require("./LevelEventMoveJigsawItem");
const LevelEventMoveWithSpline_1 = require("./LevelEventMoveWithSpline");
const LevelEventOpenChapterUi_1 = require("./LevelEventOpenChapterUi");
const LevelEventOpenDragonPool_1 = require("./LevelEventOpenDragonPool");
const LevelEventOpenHelp_1 = require("./LevelEventOpenHelp");
const LevelEventOpenInfoDisplayView_1 = require("./LevelEventOpenInfoDisplayView");
const LevelEventOpenInstance_1 = require("./LevelEventOpenInstance");
const LevelEventOpenInstanceEntrance_1 = require("./LevelEventOpenInstanceEntrance");
const LevelEventOpenShop_1 = require("./LevelEventOpenShop");
const LevelEventOpenSimpleGameplay_1 = require("./LevelEventOpenSimpleGameplay");
const LevelEventOpenSystem_1 = require("./LevelEventOpenSystem");
const LevelEventOpenUI_1 = require("./LevelEventOpenUI");
const LevelEventPickupDropItem_1 = require("./LevelEventPickupDropItem");
const LevelEventPlayBubble_1 = require("./LevelEventPlayBubble");
const LevelEventPlayDynamicSettlement_1 = require("./LevelEventPlayDynamicSettlement");
const LevelEventPlayerLoockAt_1 = require("./LevelEventPlayerLoockAt");
const LevelEventPlayLevelSequence_1 = require("./LevelEventPlayLevelSequence");
const LevelEventPlayMontage_1 = require("./LevelEventPlayMontage");
const LevelEventPlayMovie_1 = require("./LevelEventPlayMovie");
const LevelEventPlayRegisteredMontage_1 = require("./LevelEventPlayRegisteredMontage");
const LevelEventPlayWuYinAreaSequence_1 = require("./LevelEventPlayWuYinAreaSequence");
const LevelEventPlotInterludeAction_1 = require("./LevelEventPlotInterludeAction");
const LevelEventPostAkEvent_1 = require("./LevelEventPostAkEvent");
const LevelEventPrompt_1 = require("./LevelEventPrompt");
const LevelEventRefreshInputTag_1 = require("./LevelEventRefreshInputTag");
const LevelEventRemoveBuffFromCreature_1 = require("./LevelEventRemoveBuffFromCreature");
const LevelEventRemoveCreatureTag_1 = require("./LevelEventRemoveCreatureTag");
const LevelEventRemoveTag_1 = require("./LevelEventRemoveTag");
const LevelEventRestoreFromVision_1 = require("./LevelEventRestoreFromVision");
const LevelEventRestorePlayerCameraAdjustment_1 = require("./LevelEventRestorePlayerCameraAdjustment");
const LevelEventRunAction_1 = require("./LevelEventRunAction");
const LevelEventSceneItemMove_1 = require("./LevelEventSceneItemMove");
const LevelEventSendAiEvent_1 = require("./LevelEventSendAiEvent");
const LevelEventSendGameplayEventToPlayer_1 = require("./LevelEventSendGameplayEventToPlayer");
const LevelEventSetActorVisible_1 = require("./LevelEventSetActorVisible");
const LevelEventSetBattleState_1 = require("./LevelEventSetBattleState");
const LevelEventSetBlackBoardValue_1 = require("./LevelEventSetBlackBoardValue");
const LevelEventSetExploreState_1 = require("./LevelEventSetExploreState");
const LevelEventSetInteractionLockState_1 = require("./LevelEventSetInteractionLockState");
const LevelEventSetNpcPosition_1 = require("./LevelEventSetNpcPosition");
const LevelEventSetOffset_1 = require("./LevelEventSetOffset");
const LevelEventSetPlayerCameraLockState_1 = require("./LevelEventSetPlayerCameraLockState");
const LevelEventSetPlayerMoveControl_1 = require("./LevelEventSetPlayerMoveControl");
const LevelEventSetPlayerOperation_1 = require("./LevelEventSetPlayerOperation");
const LevelEventSetPos_1 = require("./LevelEventSetPos");
const LevelEventSetRegionConfig_1 = require("./LevelEventSetRegionConfig");
const LevelEventSetRotation_1 = require("./LevelEventSetRotation");
const LevelEventSetTargetPos_1 = require("./LevelEventSetTargetPos");
const LevelEventSetTimeSlowDown_1 = require("./LevelEventSetTimeSlowDown");
const LevelEventSettlementDungeon_1 = require("./LevelEventSettlementDungeon");
const LevelEventSetupSeqCamera_1 = require("./LevelEventSetupSeqCamera");
const LevelEventSetWuYinQuState_1 = require("./LevelEventSetWuYinQuState");
const LevelEventShowDialog_1 = require("./LevelEventShowDialog");
const LevelEventShowPlotPhoto_1 = require("./LevelEventShowPlotPhoto");
const LevelEventShowTargetRange_1 = require("./LevelEventShowTargetRange");
const LevelEventSpawnEffect_1 = require("./LevelEventSpawnEffect");
const LevelEventSpawnTraceEffect_1 = require("./LevelEventSpawnTraceEffect");
const LevelEventSportsState_1 = require("./LevelEventSportsState");
const LevelEventsToggleScanSplineEffect_1 = require("./LevelEventsToggleScanSplineEffect");
const LevelEventStopSceneItemMove_1 = require("./LevelEventStopSceneItemMove");
const LevelEventSubmitQuestBehavior_1 = require("./LevelEventSubmitQuestBehavior");
const LevelEventSwitchSubLevels_1 = require("./LevelEventSwitchSubLevels");
const LevelEventTeleportDungeon_1 = require("./LevelEventTeleportDungeon");
const LevelEventTeleportToResetPoint_1 = require("./LevelEventTeleportToResetPoint");
const LevelEventTimeTrackControl_1 = require("./LevelEventTimeTrackControl");
const LevelEventToggleAirWall_1 = require("./LevelEventToggleAirWall");
const LevelEventToggleMapMarkState_1 = require("./LevelEventToggleMapMarkState");
const LevelEventTreasurBoxIdleFlow_1 = require("./LevelEventTreasurBoxIdleFlow");
const LevelEventTriggerCameraShake_1 = require("./LevelEventTriggerCameraShake");
const LevelEventTriggerExit_1 = require("./LevelEventTriggerExit");
const LevelEventUnlockDungeonEntry_1 = require("./LevelEventUnlockDungeonEntry");
const LevelEventUnlockInstanceEntrance_1 = require("./LevelEventUnlockInstanceEntrance");
const LevelEventUnlockSystemItem_1 = require("./LevelEventUnlockSystemItem");
const LevelEventUpdateInstanceEntranceUnlockStatus_1 = require("./LevelEventUpdateInstanceEntranceUnlockStatus");
const LevelEventUsePhantomSkill_1 = require("./LevelEventUsePhantomSkill");
const LevelEventWaitFlyControl_1 = require("./LevelEventWaitFlyControl");
const LevelEventWaitTime_1 = require("./LevelEventWaitTime");
const DEFAULT = 1;
const LEVEL_1 = 4;
const LEVEL_2 = 8;
const LEVEL_MAX = 1024;
class LevelEventCenter {
  static AU() {
    (this.FLe = new Map()),
      (this.VLe = new Array()),
      (this.HLe = new Map()),
      (this.jLe = new Set()),
      (this.WLe = new Map()),
      (this.KLe = new Map());
  }
  static RegistEvents() {
    this.AU();
    const e = LevelGeneralDefine_1.ELevelGeneralEvent;
    const t = LevelEventCenter.QLe;
    t(
      e.ChangeFightIntensity,
      LevelEventChangeFightIntensity_1.LevelEventChangeFightIntensity,
    ),
      t(
        e.FocusOnInformationBoard,
        LevelEventFocusOnInformationBoard_1.LevelEventFocusOnInformationBoard,
      ),
      t(
        e.CameraLookAtPosition,
        LevelEventCameraLookAtPosition_1.LevelEventCameraLookAtPosition,
      ),
      t(
        e.SendGameplayEventToPlayer,
        LevelEventSendGameplayEventToPlayer_1.LevelEventSendGameplayEventToPlayer,
      ),
      t(
        e.ExitCameraLookAtPosition,
        LevelEventExitCameraLookAtPosition_1.LevelEventExitCameraLookAtPosition,
      ),
      t(
        e.SetPlayerMoveControl,
        LevelEventSetPlayerMoveControl_1.LevelEventSetPlayerMoveControl,
      ),
      t(
        e.SetPlayerCameraLockState,
        LevelEventSetPlayerCameraLockState_1.LevelEventSetPlayerCameraLockState,
      ),
      t(e.AddTag, LevelEventAddTag_1.LevelEventAddTag),
      t(e.RemoveTag, LevelEventRemoveTag_1.LevelEventRemoveTag),
      t(e.SetPos, LevelEventSetPos_1.LevelEventSetPos),
      t(e.SetOffset, LevelEventSetOffset_1.LevelEventSetOffset),
      t(e.SetRotation, LevelEventSetRotation_1.LevelEventSetRotation),
      t(e.AddCreatureTag, LevelEventAddCreatureTag_1.LevelEventAddCreatureTag),
      t(
        e.RemoveCreatureTag,
        LevelEventRemoveCreatureTag_1.LevelEventRemoveCreatureTag,
      ),
      t(e.OpenShop, LevelEventOpenShop_1.LevelEventOpenShop),
      t(
        e.OpenInfoDisplay,
        LevelEventOpenInfoDisplayView_1.LevelEventOpenInfoDisplayView,
      ),
      t(e.ChangeAI, LevelEventChangeAI_1.LevelEventChangeAI),
      t(e.PlayMontage, LevelEventPlayMontage_1.LevelEventPlayMontage, LEVEL_1),
      t(e.SetTargetPos, LevelEventSetTargetPos_1.LevelEventSetTargetPos),
      t(e.GuideFinish, LevelEventGuideFinish_1.LevelEventGuideFinish),
      t(e.OpenDragonPool, LevelEventOpenDragonPool_1.LevelEventOpenDragonPool),
      t(e.OpenInstance, LevelEventOpenInstance_1.LevelEventOpenInstance),
      t(
        e.UnlockInstanceEntrance,
        LevelEventUnlockInstanceEntrance_1.LevelEventUnlockInstanceEntrance,
      ),
      t(
        e.UpdateInstacneEntranceStatus,
        LevelEventUpdateInstanceEntranceUnlockStatus_1.LevelEventUpdateInstanceEntranceUnlockStatus,
      ),
      t(
        e.OpenInstanceEntrance,
        LevelEventOpenInstanceEntrance_1.LevelEventOpenInstanceEntrance,
      ),
      t(e.AudioEvent, LevelEventAudioEvent_1.LevelEventAudioEvent),
      t(
        e.SetTimeSlowDown,
        LevelEventSetTimeSlowDown_1.LevelEventSetTimeSlowDown,
      ),
      t(e.WaitTime, LevelEventWaitTime_1.LevelEventWaitTime, LEVEL_2),
      t(
        e.WaitFlyControl,
        LevelEventWaitFlyControl_1.LevelEventWaitFlyControl,
        LEVEL_1,
      ),
      t(e.TriggerExit, LevelEventTriggerExit_1.LevelEventTriggerExit, LEVEL_1),
      t(e.CheckFlyState, LevelEventCheckFlyState_1.LevelEventCheckFlyState),
      t(
        e.AddBuffToCreature,
        LevelEventAddBuffToCreature_1.LevelEventAddBuffToCreature,
      ),
      t(
        e.RemoveBuffFromCreature,
        LevelEventRemoveBuffFromCreature_1.LevelEventRemoveBuffFromCreature,
      ),
      t(
        e.AdjustTodTime,
        LevelEventAdjustTodTime_1.LevelEventAdjustTodTime,
        LEVEL_1,
      ),
      t(e.OpenUI, LevelEventOpenUI_1.LevelEventOpenUi),
      t(
        e.CaptureRequest,
        LevelEventCaptureRequest_1.LevelEventCaptureRequest,
        LEVEL_2,
      ),
      t(e.Execution, LevelEventExecution_1.LevelEventExecution, LEVEL_2),
      t(e.CameraShake, LevelEventCameraShake_1.LevelEventCameraShake, LEVEL_1),
      t(e.ShowDialog, LevelEventShowDialog_1.LevelEventShowDialog),
      t(e.ChangePatrol, LevelEventChangePatrol_1.LevelEventChangePatrol),
      t(
        e.PlayWuYinSequence,
        LevelEventPlayWuYinAreaSequence_1.LevelEventPlayWuYinAreaSequence,
      ),
      t(
        e.TreasurBoxIdleFlow,
        LevelEventTreasurBoxIdleFlow_1.LevelEventTreasurBoxIdleFlow,
      ),
      t(e.OpenHelp, LevelEventOpenHelp_1.LevelEventOpenHelp),
      t(e.PlayerLoockAt, LevelEventPlayerLoockAt_1.LevelEventPlayerLoockAt),
      t(
        e.SetBlackBoardValue,
        LevelEventSetBlackBoardValue_1.LevelEventSetBlackBoardValue,
      ),
      t(e.ControlTodTime, LevelEventControlTodTime_1.LevelEventControlTodTime),
      t(e.PlayMovie, LevelEventPlayMovie_1.LevelEventPlayMovie),
      t(
        e.ForceLockOnSpecialTagTarget,
        LevelEventForceLockOnSpecialTagTarget_1.LevelEventForceLockOnSpecialTagTarget,
      ),
      t(e.DisableMapView, LevelEventEnableMapView_1.LevelEventDisableMapView),
      t("PlayerLookAt", LevelEventPlayerLoockAt_1.LevelEventPlayerLoockAt),
      t(
        "CameraLookAt",
        LevelEventCameraLookAtPosition_1.LevelEventCameraLookAtPosition,
        LEVEL_1,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionCaptureRequest.name,
        LevelEventCaptureRequest_1.LevelEventCaptureRequest,
        LEVEL_2,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionExecution.name,
        LevelEventExecution_1.LevelEventExecution,
        LEVEL_2,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionSendGameplayEvent.name,
        LevelEventSendGameplayEventToPlayer_1.LevelEventSendGameplayEventToPlayer,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionSubmitQuestBehavior.name,
        LevelEventSubmitQuestBehavior_1.LevelEventSubmitQuestBehavior,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionDeliverQuestBehavior.name,
        LevelEventDeliverQuestBehavior_1.LevelEventDeliverQuestBehavior,
      ),
      t("Log", LevelEventLog_1.LevelEventLog),
      t("Wait", LevelEventWaitTime_1.LevelEventWaitTime, LEVEL_2, !0),
      t(
        "LeisureInteract",
        LevelEventLeisureInteract_1.LevelEventLeisureInteract,
        LEVEL_1,
      ),
      t("Prompt", LevelEventPrompt_1.LevelEventPrompt),
      t(
        "GuideTrigger",
        LevelEventGuideTrigger_1.LevelEventGuideTrigger,
        LEVEL_2,
        !0,
      ),
      t(
        "CompleteGuide",
        LevelEventCompleteGuide_1.LevelEventCompleteGuide,
        LEVEL_1,
      ),
      t(
        "OpenSystemBoard",
        LevelEventOpenSystem_1.LevelEventOpenSystem,
        LEVEL_1,
      ),
      t(
        "AddBuffToEntity",
        LevelEventAddBuffToEntity_1.LevelEventAddBuffToEntity,
        LEVEL_1,
      ),
      t(
        "RemoveBuffFromEntity",
        LevelEventRemoveBuffFromCreature_1.LevelEventRemoveBuffFromCreature,
        LEVEL_1,
      ),
      t(
        "SetForceLock",
        LevelEventForceLockOnSpecialTagTarget_1.LevelEventForceLockOnSpecialTagTarget,
      ),
      t(
        "SetWuYinQuState",
        LevelEventSetWuYinQuState_1.LevelEventSetWuYinQuState,
      ),
      t(
        "SetPlayerMoveControl",
        LevelEventSetPlayerMoveControl_1.LevelEventSetPlayerMoveControl,
      ),
      t("PlayEffect", LevelEventSpawnEffect_1.LevelEventSpawnEffect),
      t(
        "ClaimLevelPlayReward",
        LevelEventClaimLevelPlayReward_1.LevelEventClaimLevelPlayReward,
      ),
      t(
        "PromptQuestChapterUI",
        LevelEventOpenChapterUi_1.LevelEventOpenChapterUi,
      ),
      t(
        "InterludeActions",
        LevelEventInterludeActions_1.LevelEventInterludeActions,
        LEVEL_1,
      ),
      t(
        "AddBuffToTriggeredEntity",
        LevelEventAddBuffToTriggeredEntity_1.LevelEventAddBuffToTriggeredEntity,
      ),
      t("SetTime", LevelEventAdjustTodTime_1.LevelEventAdjustTodTime, LEVEL_1),
      t(
        "SetBattleState",
        LevelEventSetBattleState_1.LevelEventSetBattleState,
        LEVEL_1,
      ),
      t(
        "WaitBattleCondition",
        LevelEventCheckBattleState_1.LevelEventCheckBattleState,
        LEVEL_2,
      ),
      t(
        "EnableHostility",
        LevelEventEnableHostility_1.LevelEventEnableHostility,
        LEVEL_2,
      ),
      t("RunActions", LevelEventRunAction_1.LevelEventRunAction, LEVEL_1),
      t(
        "EntityLookAt",
        LevelEventEntityLookAt_1.LevelEventEntityLookAt,
        LEVEL_1,
      ),
      t("CommonTip", LevelEventPrompt_1.LevelEventPrompt),
      t(
        "ClaimDungeonReward",
        LevelEventClaimDungeonReward_1.LevelEventClaimDungeonReward,
      ),
      t("TraceSpline", LevelEventSpawnTraceEffect_1.LevelEventSpawnTraceEffect),
      t(
        "ToggleScanSplineEffect",
        LevelEventsToggleScanSplineEffect_1.LevelEventToggleScanSplineEffect,
      ),
      t("PostAkEvent", LevelEventPostAkEvent_1.LevelEventPostAkEvent),
      t(
        "MoveSceneItem",
        LevelEventSceneItemMove_1.LevelEventSceneItemMove,
        LEVEL_1,
      ),
      t(
        "StopSceneItemMove",
        LevelEventStopSceneItemMove_1.LevelEventStopSceneItemMove,
      ),
      t("SendAiEvent", LevelEventSendAiEvent_1.LevelEventSendAiEvent),
      t(
        "UnlockDungeonEntry",
        LevelEventUnlockDungeonEntry_1.LevelEventUnlockDungeonEntry,
      ),
      t(
        "UnlockSystemItem",
        LevelEventUnlockSystemItem_1.LevelEventUnlockSystemItem,
      ),
      t(
        "TeleportDungeon",
        LevelEventTeleportDungeon_1.LevelEventTeleportDungeon,
        DEFAULT,
      ),
      t("LimitPlayerOperation", LevelEventAddInputTag_1.LevelEventAddInputTag),
      t(
        "UnLimitPlayerOperation",
        LevelEventRefreshInputTag_1.LevelEventRefreshInputTag,
      ),
      t(
        "FadeInScreen",
        LevelEventFadeInScreen_1.LevelEventFadeInScreen,
        LEVEL_1,
      ),
      t(
        "FadeOutScreen",
        LevelEventFadeOutScreen_1.LevelEventFadeOutScreen,
        LEVEL_1,
      ),
      t("ChangePhantom", LevelEventChangeToVision_1.LevelEventChangeToVision),
      t(
        "RestorePhantom",
        LevelEventRestoreFromVision_1.LevelEventRestoreFromVision,
      ),
      t(
        "TakePlotPhoto",
        LevelEventShowPlotPhoto_1.LevelEventShowPlotPhoto,
        DEFAULT,
      ),
      t(
        "OpenSimpleGameplay",
        LevelEventOpenSimpleGameplay_1.LevelEventOpenSimpleGameplay,
      ),
      t(
        "SwitchSubLevels",
        LevelEventSwitchSubLevels_1.LevelEventSwitchLevels,
        LEVEL_1,
      ),
      t(
        "AdjustPlayerCamera",
        LevelEventAdjustPlayerCamera_1.LevelEventAdjustPlayerCamera,
      ),
      t(
        "RestorePlayerCameraAdjustment",
        LevelEventRestorePlayerCameraAdjustment_1.LevelEventRestorePlayerCameraAdjustment,
      ),
      t(
        "UsePhantomSkill",
        LevelEventUsePhantomSkill_1.LevelEventUsePhantomSkill,
      ),
      t(
        "TeleportToLatestResetPoint",
        LevelEventTeleportToResetPoint_1.LevelEventTeleportToResetPoint,
        LEVEL_1,
      ),
      t(
        "EnterOrbitalCamera",
        LevelEventEnterOrbitalCamera_1.LevelEventEnterOrbitalCamera,
      ),
      t(
        "ExitOrbitalCamera",
        LevelEventExitOrbitalCamera_1.LevelEventExitOrbitalCamera,
      ),
      t(
        "EnableSplineMoveModel",
        LevelEventEnableSplineMoveModel_1.LevelEventEnableSplineMoveModel,
      ),
      t("SetSportsState", LevelEventSportsState_1.LevelEventSportsState),
      t("EnableActor", LevelEventSetActorVisible_1.LevelEventSetActorVisible),
      t(
        "PlayLevelSequence",
        LevelEventPlayLevelSequence_1.LevelEventPlayLevelSequence,
      ),
      t(
        "ModifyActorMaterial",
        LevelEventModifyActorMaterial_1.LevelEventModifyActorMaterial,
      ),
      t("EnableAI", LevelEventEnableAi_1.LevelEventEnableAi),
      t(
        "SetExploreState",
        LevelEventSetExploreState_1.LevelEventSetExploreState,
      ),
      t("ToggleAirWall", LevelEventToggleAirWall_1.LevelEventToggleAirWall),
      t(
        "TriggerCameraShake",
        LevelEventTriggerCameraShake_1.LevelEventTriggerCameraShake,
      ),
      t(
        "HideTargetRange",
        LevelEventHideTargetRange_1.LevelEventHideTargetRange,
        LEVEL_1,
      ),
      t(
        "ShowTargetRange",
        LevelEventShowTargetRange_1.LevelEventShowTargetRange,
        LEVEL_1,
      ),
      t("ExitDungeon", LevelEventExitDungeon_1.LevelEventExitDungeon, LEVEL_1),
      t(
        "ToggleMapMarkState",
        LevelEventToggleMapMarkState_1.LevelEventToggleMapMarkState,
        LEVEL_1,
      ),
      t(
        "SettlementDungeon",
        LevelEventSettlementDungeon_1.LevelEventSettlementDungeon,
        LEVEL_1,
      ),
      t(
        "AddTrialCharacter",
        LevelEventAddTrialCharacter_1.LevelEventAddTrialCharacter,
        LEVEL_1,
      ),
      t(
        "SetPlayerOperationRestriction",
        LevelEventSetPlayerOperation_1.LevelEventSetPlayerOperation,
      ),
      t(
        "ChangePhantomFormation",
        LevelEventChangePhantomFormation_1.LevelEventChangePhantomFormation,
        LEVEL_1,
      ),
      t(
        "RestorePhantomFormation",
        LevelEventRestorePhantomFormation_1.LevelEventRestorePhantomFormation,
        LEVEL_1,
      ),
      t(
        "ChangeEntityPrefabPerformance",
        LevelEventChangeEntityPerformanceState_1.LevelEventChangeEntityPerformanceState,
      ),
      t("SetJigsawItem", LevelEventMoveJigsawItem_1.LevelEventMoveJigsawItem),
      t(
        "PlayRegisteredMontage",
        LevelEventPlayRegisteredMontage_1.LevelEventPlayRegisteredMontage,
        LEVEL_2,
        !0,
      ),
      t(
        "ToggleHighlightExploreUi",
        LevelEventHighlightExploreUi_1.LevelEventHighlightExploreUi,
      ),
      t(
        "SetRegionConfig",
        LevelEventSetRegionConfig_1.LevelEventSetRegionConfig,
        LEVEL_1,
        !0,
      ),
      t("Collect", LevelEventCollect_1.LevelEventCollect),
      t(
        "PlayDynamicSettlement",
        LevelEventPlayDynamicSettlement_1.LevelEventPlayDynamicSettlement,
        LEVEL_1,
      ),
      t(
        "SetInteractionLockState",
        LevelEventSetInteractionLockState_1.LevelEventSetInteractionLockState,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionSetNpcPosition.name,
        LevelEventSetNpcPosition_1.LevelEventSetNpcPosition,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionPlotInterludeAction.name,
        LevelEventPlotInterludeAction_1.LevelEventPlotInterludeAction,
        LEVEL_1,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionSetSeqCameraTransform.name,
        LevelEventSetupSeqCamera_1.LevelEventSetupSeqCamera,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionEnterSequenceCamera.name,
        LevelEventEnterSequenceCamera_1.LevelEventEnterSequenceCamera,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionPickupDropItem.name,
        LevelEventPickupDropItem_1.LevelEventPickupDropItem,
        LEVEL_1,
        !0,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionTimeTrackControl.name,
        LevelEventTimeTrackControl_1.LevelEventTimeTrackControl,
        LEVEL_1,
      ),
      t(
        LevelGameplayActionsDefine_1.ActionInteractFan.name,
        LevelEventInteractFan_1.LevelEventInteractFan,
      ),
      t("PlayMontage", LevelEventPlayMontage_1.LevelEventPlayMontage, LEVEL_1),
      t("PlayBubble", LevelEventPlayBubble_1.LevelEventPlayBubble, LEVEL_2),
      t(
        "MoveWithSpline",
        LevelEventMoveWithSpline_1.LevelEventMoveWithSpline,
        LEVEL_1,
      ),
      t(
        "CharacterMoveToPoint",
        LevelEventCharacterMove_1.LevelEventCharacterMove,
        LEVEL_1,
      );
  }
  static GetEvent(t) {
    const n = this.HLe.get(t);
    if (n) {
      if (n.length > 0)
        return this.jLe.has(t) ? ((e = n.pop()).Reset(), e) : n[0];
      if (this.WLe.has(t)) {
        var e;
        const v = this.WLe.get(t);
        for (let e = 0; e < LEVEL_1; e++) {
          const l = new v(e);
          (l.Type = t), n.push(l);
        }
        return (
          GlobalData_1.GlobalData.IsPlayInEditor &&
            ((e = this.KLe.get(t) + LEVEL_1),
            this.KLe.set(t, e),
            e > LEVEL_MAX) &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              7,
              "动态扩容超上限，请检查",
              ["Type", t],
              ["Capacity", e],
            ),
          n.pop()
        );
      }
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Level", 7, "事件组容量不足，建议扩容，请检查！！！", [
          "Type",
          t,
        ]);
    }
  }
  static XLe(e) {
    let t;
    this.jLe.has(e.Type) &&
      (t = this.HLe.get(e.Type)) &&
      !t.includes(e) &&
      t.push(e);
  }
  static AddToTickList(e, t) {
    const n = t.GroupId;
    if (e) {
      let e = this.FLe.get(n);
      e || ((e = new Array()), this.FLe.set(n, e)), e.includes(t) || e.push(t);
    } else this.VLe.includes(t) || this.VLe.push(t);
  }
  static RemoveEventGroup(e) {
    e = this.FLe.get(e);
    if (e) for (const t of e) t.Release();
  }
  static Tick(t) {
    if (void 0 !== this.VLe && void 0 !== this.FLe) {
      for (; this.VLe.length > 0; ) {
        var e;
        const n = this.VLe.pop();
        const v = this.FLe.get(n.GroupId);
        v &&
          ((e = v.indexOf(n)) !== -1 && v.splice(e, 1), v.length === 0) &&
          this.FLe.delete(n.GroupId),
          n.Reset(),
          this.XLe(n);
      }
      for (const E of this.FLe.values()) {
        const l = E.length;
        for (let e = 0; e < l; e++) {
          const r = E[e];
          r.Tick(t) && r.Finish();
        }
      }
    }
  }
  static IsNeedTick(e) {
    return this.jLe.has(e);
  }
  static HasAction(e) {
    return this.HLe.has(e);
  }
}
(exports.LevelEventCenter = LevelEventCenter).QLe = (
  n,
  v,
  l = DEFAULT,
  e = !1,
) => {
  if (!LevelEventCenter.HLe.has(n)) {
    let t = void 0;
    if (e) {
      t = new Array();
      for (let e = 0; e < l; e++) {
        const r = new v(e);
        (r.Type = n), t.push(r);
      }
    } else {
      t = new Array(l);
      for (let e = 0; e < l; e++) {
        const E = new v(e);
        (E.Type = n), (t[e] = E);
      }
    }
    LevelEventCenter.HLe.set(n, t),
      l > 1 &&
        (LevelEventCenter.jLe.add(n), LevelEventCenter.KLe.set(n, l), e) &&
        LevelEventCenter.WLe.set(n, v);
  }
};
// # sourceMappingURL=LevelEventCenter.js.map
