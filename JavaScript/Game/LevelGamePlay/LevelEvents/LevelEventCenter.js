"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventCenter = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  GlobalData_1 = require("../../GlobalData"),
  LevelEventChangePhantomFormation_1 = require("../LevelEventChangePhantomFormation"),
  LevelEventRestorePhantomFormation_1 = require("../LevelEventRestorePhantomFormation"),
  LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine"),
  LevelEventAddBuffToEntity_1 = require("./LevelEventAddBuffToEntity"),
  LevelEventAddBuffToTriggeredEntity_1 = require("./LevelEventAddBuffToTriggeredEntity"),
  LevelEventAddInputTag_1 = require("./LevelEventAddInputTag"),
  LevelEventAddTrialCharacter_1 = require("./LevelEventAddTrialCharacter"),
  LevelEventAdjustPlayerCamera_1 = require("./LevelEventAdjustPlayerCamera"),
  LevelEventAdjustTodTime_1 = require("./LevelEventAdjustTodTime"),
  LevelEventCameraLookAtPosition_1 = require("./LevelEventCameraLookAtPosition"),
  LevelEventCaptureRequest_1 = require("./LevelEventCaptureRequest"),
  LevelEventChangeEntityPerformanceState_1 = require("./LevelEventChangeEntityPerformanceState"),
  LevelEventChangeToVision_1 = require("./LevelEventChangeToVision"),
  LevelEventCharacterMove_1 = require("./LevelEventCharacterMove"),
  LevelEventCheckBattleState_1 = require("./LevelEventCheckBattleState"),
  LevelEventClaimDungeonReward_1 = require("./LevelEventClaimDungeonReward"),
  LevelEventClaimLevelPlayReward_1 = require("./LevelEventClaimLevelPlayReward"),
  LevelEventCollect_1 = require("./LevelEventCollect"),
  LevelEventCompleteGuide_1 = require("./LevelEventCompleteGuide"),
  LevelEventDeliverQuestBehavior_1 = require("./LevelEventDeliverQuestBehavior"),
  LevelEventEnableAi_1 = require("./LevelEventEnableAi"),
  LevelEventEnableHostility_1 = require("./LevelEventEnableHostility"),
  LevelEventEnableSplineMoveModel_1 = require("./LevelEventEnableSplineMoveModel"),
  LevelEventEnterOrbitalCamera_1 = require("./LevelEventEnterOrbitalCamera"),
  LevelEventEnterSequenceCamera_1 = require("./LevelEventEnterSequenceCamera"),
  LevelEventEntityLookAt_1 = require("./LevelEventEntityLookAt"),
  LevelEventExecution_1 = require("./LevelEventExecution"),
  LevelEventExitDungeon_1 = require("./LevelEventExitDungeon"),
  LevelEventExitOrbitalCamera_1 = require("./LevelEventExitOrbitalCamera"),
  LevelEventFadeInScreen_1 = require("./LevelEventFadeInScreen"),
  LevelEventFadeOutScreen_1 = require("./LevelEventFadeOutScreen"),
  LevelEventForceLockOnSpecialTagTarget_1 = require("./LevelEventForceLockOnSpecialTagTarget"),
  LevelEventGuideTrigger_1 = require("./LevelEventGuideTrigger"),
  LevelEventHideTargetRange_1 = require("./LevelEventHideTargetRange"),
  LevelEventHighlightExploreUi_1 = require("./LevelEventHighlightExploreUi"),
  LevelEventInteractFan_1 = require("./LevelEventInteractFan"),
  LevelEventInterludeActions_1 = require("./LevelEventInterludeActions"),
  LevelEventLeisureInteract_1 = require("./LevelEventLeisureInteract"),
  LevelEventLog_1 = require("./LevelEventLog"),
  LevelEventModifyActorMaterial_1 = require("./LevelEventModifyActorMaterial"),
  LevelEventMoveJigsawItem_1 = require("./LevelEventMoveJigsawItem"),
  LevelEventMoveWithSpline_1 = require("./LevelEventMoveWithSpline"),
  LevelEventOpenChapterUi_1 = require("./LevelEventOpenChapterUi"),
  LevelEventOpenQte_1 = require("./LevelEventOpenQte"),
  LevelEventOpenSimpleGameplay_1 = require("./LevelEventOpenSimpleGameplay"),
  LevelEventOpenSystem_1 = require("./LevelEventOpenSystem"),
  LevelEventPickupDropItem_1 = require("./LevelEventPickupDropItem"),
  LevelEventPlayBubble_1 = require("./LevelEventPlayBubble"),
  LevelEventPlayDynamicSettlement_1 = require("./LevelEventPlayDynamicSettlement"),
  LevelEventPlayerLoockAt_1 = require("./LevelEventPlayerLoockAt"),
  LevelEventPlayLevelSequence_1 = require("./LevelEventPlayLevelSequence"),
  LevelEventPlayMontage_1 = require("./LevelEventPlayMontage"),
  LevelEventPlayRegisteredMontage_1 = require("./LevelEventPlayRegisteredMontage"),
  LevelEventPlotInterludeAction_1 = require("./LevelEventPlotInterludeAction"),
  LevelEventPostAkEvent_1 = require("./LevelEventPostAkEvent"),
  LevelEventPrompt_1 = require("./LevelEventPrompt"),
  LevelEventRefreshInputTag_1 = require("./LevelEventRefreshInputTag"),
  LevelEventRemoveBuffFromCreature_1 = require("./LevelEventRemoveBuffFromCreature"),
  LevelEventRestoreFromVision_1 = require("./LevelEventRestoreFromVision"),
  LevelEventRestorePlayerCameraAdjustment_1 = require("./LevelEventRestorePlayerCameraAdjustment"),
  LevelEventRunAction_1 = require("./LevelEventRunAction"),
  LevelEventSceneItemMove_1 = require("./LevelEventSceneItemMove"),
  LevelEventSendAiEvent_1 = require("./LevelEventSendAiEvent"),
  LevelEventSendGameplayEventToPlayer_1 = require("./LevelEventSendGameplayEventToPlayer"),
  LevelEventSetActorVisible_1 = require("./LevelEventSetActorVisible"),
  LevelEventSetBattleState_1 = require("./LevelEventSetBattleState"),
  LevelEventSetClientEntityVisible_1 = require("./LevelEventSetClientEntityVisible"),
  LevelEventSetExploreState_1 = require("./LevelEventSetExploreState"),
  LevelEventSetInteractionLockState_1 = require("./LevelEventSetInteractionLockState"),
  LevelEventSetNpcPosition_1 = require("./LevelEventSetNpcPosition"),
  LevelEventSetPlayerMoveControl_1 = require("./LevelEventSetPlayerMoveControl"),
  LevelEventSetPlayerOperation_1 = require("./LevelEventSetPlayerOperation"),
  LevelEventSetRegionConfig_1 = require("./LevelEventSetRegionConfig"),
  LevelEventSetTeleControl_1 = require("./LevelEventSetTeleControl"),
  LevelEventSettlementDungeon_1 = require("./LevelEventSettlementDungeon"),
  LevelEventSetupSeqCamera_1 = require("./LevelEventSetupSeqCamera"),
  LevelEventSetWuYinQuState_1 = require("./LevelEventSetWuYinQuState"),
  LevelEventShowPlotPhoto_1 = require("./LevelEventShowPlotPhoto"),
  LevelEventShowTargetRange_1 = require("./LevelEventShowTargetRange"),
  LevelEventSpawnEffect_1 = require("./LevelEventSpawnEffect"),
  LevelEventSpawnTraceEffect_1 = require("./LevelEventSpawnTraceEffect"),
  LevelEventSportsState_1 = require("./LevelEventSportsState"),
  LevelEventsToggleScanSplineEffect_1 = require("./LevelEventsToggleScanSplineEffect"),
  LevelEventStopSceneItemMove_1 = require("./LevelEventStopSceneItemMove"),
  LevelEventSubmitQuestBehavior_1 = require("./LevelEventSubmitQuestBehavior"),
  LevelEventSwitchSubLevels_1 = require("./LevelEventSwitchSubLevels"),
  LevelEventTeleportDungeon_1 = require("./LevelEventTeleportDungeon"),
  LevelEventTeleportToResetPoint_1 = require("./LevelEventTeleportToResetPoint"),
  LevelEventTimeTrackControl_1 = require("./LevelEventTimeTrackControl"),
  LevelEventToggleAirWall_1 = require("./LevelEventToggleAirWall"),
  LevelEventToggleMapMarkState_1 = require("./LevelEventToggleMapMarkState"),
  LevelEventTriggerCameraShake_1 = require("./LevelEventTriggerCameraShake"),
  LevelEventUnlockDungeonEntry_1 = require("./LevelEventUnlockDungeonEntry"),
  LevelEventUnlockSystemItem_1 = require("./LevelEventUnlockSystemItem"),
  LevelEventUsePhantomSkill_1 = require("./LevelEventUsePhantomSkill"),
  LevelEventWaitTime_1 = require("./LevelEventWaitTime"),
  DEFAULT = 1,
  LEVEL_1 = 4,
  LEVEL_2 = 8,
  LEVEL_MAX = 1024;
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
    var e = LevelEventCenter.QLe;
    e("PlayerLookAt", LevelEventPlayerLoockAt_1.LevelEventPlayerLoockAt),
      e(
        "CameraLookAt",
        LevelEventCameraLookAtPosition_1.LevelEventCameraLookAtPosition,
        LEVEL_1,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionCaptureRequest.name,
        LevelEventCaptureRequest_1.LevelEventCaptureRequest,
        LEVEL_2,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionExecution.name,
        LevelEventExecution_1.LevelEventExecution,
        LEVEL_2,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionSendGameplayEvent.name,
        LevelEventSendGameplayEventToPlayer_1.LevelEventSendGameplayEventToPlayer,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionSubmitQuestBehavior.name,
        LevelEventSubmitQuestBehavior_1.LevelEventSubmitQuestBehavior,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionDeliverQuestBehavior.name,
        LevelEventDeliverQuestBehavior_1.LevelEventDeliverQuestBehavior,
      ),
      e("Log", LevelEventLog_1.LevelEventLog),
      e("Wait", LevelEventWaitTime_1.LevelEventWaitTime, LEVEL_2, !0),
      e(
        "LeisureInteract",
        LevelEventLeisureInteract_1.LevelEventLeisureInteract,
        LEVEL_1,
      ),
      e("Prompt", LevelEventPrompt_1.LevelEventPrompt),
      e(
        "GuideTrigger",
        LevelEventGuideTrigger_1.LevelEventGuideTrigger,
        LEVEL_2,
        !0,
      ),
      e(
        "CompleteGuide",
        LevelEventCompleteGuide_1.LevelEventCompleteGuide,
        LEVEL_1,
      ),
      e(
        "OpenSystemBoard",
        LevelEventOpenSystem_1.LevelEventOpenSystem,
        LEVEL_1,
      ),
      e(
        "AddBuffToEntity",
        LevelEventAddBuffToEntity_1.LevelEventAddBuffToEntity,
        LEVEL_1,
      ),
      e(
        "RemoveBuffFromEntity",
        LevelEventRemoveBuffFromCreature_1.LevelEventRemoveBuffFromCreature,
        LEVEL_1,
      ),
      e(
        "SetForceLock",
        LevelEventForceLockOnSpecialTagTarget_1.LevelEventForceLockOnSpecialTagTarget,
      ),
      e(
        "SetWuYinQuState",
        LevelEventSetWuYinQuState_1.LevelEventSetWuYinQuState,
      ),
      e(
        "SetPlayerMoveControl",
        LevelEventSetPlayerMoveControl_1.LevelEventSetPlayerMoveControl,
      ),
      e("PlayEffect", LevelEventSpawnEffect_1.LevelEventSpawnEffect),
      e(
        "ClaimLevelPlayReward",
        LevelEventClaimLevelPlayReward_1.LevelEventClaimLevelPlayReward,
      ),
      e(
        "PromptQuestChapterUI",
        LevelEventOpenChapterUi_1.LevelEventOpenChapterUi,
      ),
      e(
        "InterludeActions",
        LevelEventInterludeActions_1.LevelEventInterludeActions,
        LEVEL_1,
      ),
      e(
        "AddBuffToTriggeredEntity",
        LevelEventAddBuffToTriggeredEntity_1.LevelEventAddBuffToTriggeredEntity,
      ),
      e("SetTime", LevelEventAdjustTodTime_1.LevelEventAdjustTodTime, LEVEL_1),
      e(
        "SetBattleState",
        LevelEventSetBattleState_1.LevelEventSetBattleState,
        LEVEL_1,
      ),
      e(
        "WaitBattleCondition",
        LevelEventCheckBattleState_1.LevelEventCheckBattleState,
        LEVEL_2,
      ),
      e(
        "EnableHostility",
        LevelEventEnableHostility_1.LevelEventEnableHostility,
        LEVEL_2,
      ),
      e("RunActions", LevelEventRunAction_1.LevelEventRunAction, LEVEL_1),
      e(
        "EntityLookAt",
        LevelEventEntityLookAt_1.LevelEventEntityLookAt,
        LEVEL_1,
      ),
      e("CommonTip", LevelEventPrompt_1.LevelEventPrompt),
      e(
        "ClaimDungeonReward",
        LevelEventClaimDungeonReward_1.LevelEventClaimDungeonReward,
      ),
      e("TraceSpline", LevelEventSpawnTraceEffect_1.LevelEventSpawnTraceEffect),
      e(
        "ToggleScanSplineEffect",
        LevelEventsToggleScanSplineEffect_1.LevelEventToggleScanSplineEffect,
      ),
      e("PostAkEvent", LevelEventPostAkEvent_1.LevelEventPostAkEvent),
      e(
        "MoveSceneItem",
        LevelEventSceneItemMove_1.LevelEventSceneItemMove,
        LEVEL_1,
        !0,
      ),
      e(
        "StopSceneItemMove",
        LevelEventStopSceneItemMove_1.LevelEventStopSceneItemMove,
      ),
      e("SendAiEvent", LevelEventSendAiEvent_1.LevelEventSendAiEvent),
      e(
        "UnlockDungeonEntry",
        LevelEventUnlockDungeonEntry_1.LevelEventUnlockDungeonEntry,
      ),
      e(
        "UnlockSystemItem",
        LevelEventUnlockSystemItem_1.LevelEventUnlockSystemItem,
      ),
      e(
        "TeleportDungeon",
        LevelEventTeleportDungeon_1.LevelEventTeleportDungeon,
        DEFAULT,
      ),
      e("LimitPlayerOperation", LevelEventAddInputTag_1.LevelEventAddInputTag),
      e(
        "UnLimitPlayerOperation",
        LevelEventRefreshInputTag_1.LevelEventRefreshInputTag,
      ),
      e(
        "FadeInScreen",
        LevelEventFadeInScreen_1.LevelEventFadeInScreen,
        LEVEL_1,
      ),
      e(
        "FadeOutScreen",
        LevelEventFadeOutScreen_1.LevelEventFadeOutScreen,
        LEVEL_1,
      ),
      e("ChangePhantom", LevelEventChangeToVision_1.LevelEventChangeToVision),
      e(
        "RestorePhantom",
        LevelEventRestoreFromVision_1.LevelEventRestoreFromVision,
      ),
      e(
        "TakePlotPhoto",
        LevelEventShowPlotPhoto_1.LevelEventShowPlotPhoto,
        DEFAULT,
      ),
      e(
        "OpenSimpleGameplay",
        LevelEventOpenSimpleGameplay_1.LevelEventOpenSimpleGameplay,
      ),
      e(
        "SwitchSubLevels",
        LevelEventSwitchSubLevels_1.LevelEventSwitchLevels,
        LEVEL_1,
      ),
      e(
        "AdjustPlayerCamera",
        LevelEventAdjustPlayerCamera_1.LevelEventAdjustPlayerCamera,
      ),
      e(
        "RestorePlayerCameraAdjustment",
        LevelEventRestorePlayerCameraAdjustment_1.LevelEventRestorePlayerCameraAdjustment,
      ),
      e(
        "UsePhantomSkill",
        LevelEventUsePhantomSkill_1.LevelEventUsePhantomSkill,
      ),
      e(
        "TeleportToLatestResetPoint",
        LevelEventTeleportToResetPoint_1.LevelEventTeleportToResetPoint,
        LEVEL_1,
      ),
      e(
        "EnterOrbitalCamera",
        LevelEventEnterOrbitalCamera_1.LevelEventEnterOrbitalCamera,
      ),
      e(
        "ExitOrbitalCamera",
        LevelEventExitOrbitalCamera_1.LevelEventExitOrbitalCamera,
      ),
      e(
        "EnableSplineMoveModel",
        LevelEventEnableSplineMoveModel_1.LevelEventEnableSplineMoveModel,
      ),
      e("SetSportsState", LevelEventSportsState_1.LevelEventSportsState),
      e("EnableActor", LevelEventSetActorVisible_1.LevelEventSetActorVisible),
      e(
        "PlayLevelSequence",
        LevelEventPlayLevelSequence_1.LevelEventPlayLevelSequence,
      ),
      e(
        "ModifyActorMaterial",
        LevelEventModifyActorMaterial_1.LevelEventModifyActorMaterial,
      ),
      e("EnableAI", LevelEventEnableAi_1.LevelEventEnableAi),
      e(
        "SetExploreState",
        LevelEventSetExploreState_1.LevelEventSetExploreState,
      ),
      e("ToggleAirWall", LevelEventToggleAirWall_1.LevelEventToggleAirWall),
      e(
        "TriggerCameraShake",
        LevelEventTriggerCameraShake_1.LevelEventTriggerCameraShake,
      ),
      e(
        "HideTargetRange",
        LevelEventHideTargetRange_1.LevelEventHideTargetRange,
        LEVEL_1,
      ),
      e(
        "ShowTargetRange",
        LevelEventShowTargetRange_1.LevelEventShowTargetRange,
        LEVEL_1,
      ),
      e("ExitDungeon", LevelEventExitDungeon_1.LevelEventExitDungeon, LEVEL_1),
      e(
        "ToggleMapMarkState",
        LevelEventToggleMapMarkState_1.LevelEventToggleMapMarkState,
        LEVEL_1,
      ),
      e(
        "SettlementDungeon",
        LevelEventSettlementDungeon_1.LevelEventSettlementDungeon,
        LEVEL_1,
      ),
      e(
        "AddTrialCharacter",
        LevelEventAddTrialCharacter_1.LevelEventAddTrialCharacter,
        LEVEL_1,
      ),
      e(
        "SetPlayerOperationRestriction",
        LevelEventSetPlayerOperation_1.LevelEventSetPlayerOperation,
      ),
      e(
        "ChangePhantomFormation",
        LevelEventChangePhantomFormation_1.LevelEventChangePhantomFormation,
        LEVEL_1,
      ),
      e(
        "RestorePhantomFormation",
        LevelEventRestorePhantomFormation_1.LevelEventRestorePhantomFormation,
        LEVEL_1,
      ),
      e(
        "ChangeEntityPrefabPerformance",
        LevelEventChangeEntityPerformanceState_1.LevelEventChangeEntityPerformanceState,
      ),
      e("SetJigsawItem", LevelEventMoveJigsawItem_1.LevelEventMoveJigsawItem),
      e(
        "PlayRegisteredMontage",
        LevelEventPlayRegisteredMontage_1.LevelEventPlayRegisteredMontage,
        LEVEL_2,
        !0,
      ),
      e(
        "ToggleHighlightExploreUi",
        LevelEventHighlightExploreUi_1.LevelEventHighlightExploreUi,
      ),
      e(
        "SetRegionConfig",
        LevelEventSetRegionConfig_1.LevelEventSetRegionConfig,
        LEVEL_1,
        !0,
      ),
      e("Collect", LevelEventCollect_1.LevelEventCollect),
      e(
        "PlayDynamicSettlement",
        LevelEventPlayDynamicSettlement_1.LevelEventPlayDynamicSettlement,
        LEVEL_1,
      ),
      e(
        "SetInteractionLockState",
        LevelEventSetInteractionLockState_1.LevelEventSetInteractionLockState,
      ),
      e("SetTeleControl", LevelEventSetTeleControl_1.LevelEventSetTeleControl),
      e("OpenQte", LevelEventOpenQte_1.LevelEventOpenQte),
      e(
        "SetEntityClientVisible",
        LevelEventSetClientEntityVisible_1.LevelEventSetClientEntityVisible,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionSetNpcPosition.name,
        LevelEventSetNpcPosition_1.LevelEventSetNpcPosition,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionPlotInterludeAction.name,
        LevelEventPlotInterludeAction_1.LevelEventPlotInterludeAction,
        LEVEL_1,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionSetSeqCameraTransform.name,
        LevelEventSetupSeqCamera_1.LevelEventSetupSeqCamera,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionEnterSequenceCamera.name,
        LevelEventEnterSequenceCamera_1.LevelEventEnterSequenceCamera,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionPickupDropItem.name,
        LevelEventPickupDropItem_1.LevelEventPickupDropItem,
        LEVEL_1,
        !0,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionTimeTrackControl.name,
        LevelEventTimeTrackControl_1.LevelEventTimeTrackControl,
        LEVEL_1,
      ),
      e(
        LevelGameplayActionsDefine_1.ActionInteractFan.name,
        LevelEventInteractFan_1.LevelEventInteractFan,
      ),
      e("PlayMontage", LevelEventPlayMontage_1.LevelEventPlayMontage, LEVEL_1),
      e("PlayBubble", LevelEventPlayBubble_1.LevelEventPlayBubble, LEVEL_2),
      e(
        "MoveWithSpline",
        LevelEventMoveWithSpline_1.LevelEventMoveWithSpline,
        LEVEL_1,
      ),
      e(
        "CharacterMoveToPoint",
        LevelEventCharacterMove_1.LevelEventCharacterMove,
        LEVEL_1,
      );
  }
  static GetEvent(t) {
    var n = this.HLe.get(t);
    if (n) {
      if (0 < n.length)
        return this.jLe.has(t) ? ((e = n.pop()).Reset(), e) : n[0];
      if (this.WLe.has(t)) {
        var e,
          v = this.WLe.get(t);
        for (let e = 0; e < LEVEL_1; e++) {
          var l = new v(e);
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
    var t;
    this.jLe.has(e.Type) &&
      (t = this.HLe.get(e.Type)) &&
      !t.includes(e) &&
      t.push(e);
  }
  static AddToTickList(e, t) {
    var n = t.GroupId;
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
      for (; 0 < this.VLe.length; ) {
        var e,
          n = this.VLe.pop(),
          v = this.FLe.get(n.GroupId);
        v &&
          (-1 !== (e = v.indexOf(n)) && v.splice(e, 1), 0 === v.length) &&
          this.FLe.delete(n.GroupId),
          n.Reset(),
          this.XLe(n);
      }
      for (const i of this.FLe.values()) {
        var l = i.length;
        for (let e = 0; e < l; e++) {
          var r = i[e];
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
((exports.LevelEventCenter = LevelEventCenter).HLe = void 0),
  (LevelEventCenter.FLe = void 0),
  (LevelEventCenter.VLe = void 0),
  (LevelEventCenter.jLe = void 0),
  (LevelEventCenter.WLe = void 0),
  (LevelEventCenter.KLe = void 0),
  (LevelEventCenter.QLe = (n, v, l = DEFAULT, e = !1) => {
    if (!LevelEventCenter.HLe.has(n)) {
      let t = void 0;
      if (e) {
        t = new Array();
        for (let e = 0; e < l; e++) {
          var r = new v(e);
          (r.Type = n), t.push(r);
        }
      } else {
        t = new Array(l);
        for (let e = 0; e < l; e++) {
          var i = new v(e);
          (i.Type = n), (t[e] = i);
        }
      }
      LevelEventCenter.HLe.set(n, t),
        1 < l &&
          (LevelEventCenter.jLe.add(n), LevelEventCenter.KLe.set(n, l), e) &&
          LevelEventCenter.WLe.set(n, v);
    }
  });
//# sourceMappingURL=LevelEventCenter.js.map
