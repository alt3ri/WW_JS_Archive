"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.typeDefined = void 0);
const Log_1 = require("../Common/Log"),
  classDefined = {
    DataTableUtil_C: [
      "/Game/Aki/UI/Framework/DataTableUtil.DataTableUtil_C",
      0,
    ],
    BP_SequenceData_C: [
      "/Game/Aki/Sequence/Manager/BP_SequenceData.BP_SequenceData_C",
      0,
    ],
    BP_EventManager_C: [
      "/Game/Aki/UI/Manager/BP_EventManager.BP_EventManager_C",
      0,
    ],
    BP_FightManager_C: [
      "/Game/Aki/Core/Fight/Manager/BP_FightManager.BP_FightManager_C",
      0,
    ],
    BP_CharacterController_C: [
      "/Game/Aki/Character/BaseCharacter/BP_CharacterController.BP_CharacterController_C",
      0,
    ],
    BP_BaseNPC_C: ["/Game/Aki/Character/NPC/Common/BP_BaseNPC.BP_BaseNPC_C", 0],
    BPI_NpcEcological_C: [
      "/Game/Aki/Character/NPC/Common/BPI_NpcEcological.BPI_NpcEcological_C",
      0,
    ],
    TsBaseCharacter_C: [
      "/Game/Aki/TypeScript/Game/Character/TsBaseCharacter.TsBaseCharacter_C",
      0,
    ],
    PD_CharacterControllerData_C: [
      "/Game/Aki/Render/RuntimeBP/Character/MaterialController/PD_CharacterControllerData.PD_CharacterControllerData_C",
      0,
    ],
    BP_BasePathLine_C: [
      "/Game/Aki/Data/PathLine/BP_BasePathLine.BP_BasePathLine_C",
      0,
    ],
    BP_MovePathLine_C: [
      "/Game/Aki/Data/PathLine/BP_MovePathLine.BP_MovePathLine_C",
      0,
    ],
    BP_BasePathLine_Edgewall_C: [
      "/Game/Aki/Data/PathLine/Pathline_EdgeWall/BP_BasePathLine_Edgewall.BP_BasePathLine_Edgewall_C",
      0,
    ],
    BP_CineCamera_C: [
      "/Game/Aki/Character/BaseCharacter/Camera/BP_CineCamera.BP_CineCamera_C",
      0,
    ],
    BP_StreamingSourceActor_C: [
      "/Game/Aki/GamePlay/StreamingSource/BP_StreamingSourceActor.BP_StreamingSourceActor_C",
      0,
    ],
    BPL_CameraUtility_C: [
      "/Game/Aki/Character/BaseCharacter/Camera/BPL_CameraUtility.BPL_CameraUtility_C",
      0,
    ],
    BP_CameraDrivenAutoFlightData_C: [
      "/Game/Aki/Character/Input/Blueprints/BP_CameraDrivenAutoFlightData.BP_CameraDrivenAutoFlightData_C",
      0,
    ],
    BP_FightCameraConfig_C: [
      "/Game/Aki/Data/Camera/BP_FightCameraConfig.BP_FightCameraConfig_C",
      0,
    ],
    BP_SoarConfig_C: [
      "/Game/Aki/Data/Fight/Movement/BP_SoarConfig.BP_SoarConfig_C",
      0,
    ],
    BP_ScreenEffectSystem_C: [
      "/Game/Aki/Render/RuntimeBP/ScreenEffect/BP_ScreenEffectSystem.BP_ScreenEffectSystem_C",
      0,
    ],
    EffectScreenPlayData_C: [
      "/Game/Aki/Render/RuntimeBP/ScreenEffect/Data/EffectScreenPlayData.EffectScreenPlayData_C",
      0,
    ],
    BPI_CreatureInterface_C: [
      "/Game/Aki/CreatureTools/BPI_CreatureInterface.BPI_CreatureInterface_C",
      0,
    ],
    TsParkourCheckPoint_C: [
      "/Game/Aki/TypeScript/Game/LevelGamePlay/Parkour/TsParkourCheckPoint.TsParkourCheckPoint_C",
      0,
    ],
    BP_GlobalGI_C: [
      "/Game/Aki/Render/RuntimeBP/GI/BP_GlobalGI.BP_GlobalGI_C",
      0,
    ],
    BP_Cinematics_Tick_C: [
      "/Game/Aki/Render/RuntimeBP/Character/MaterialController/BP_Cinematics_Tick.BP_Cinematics_Tick_C",
      0,
    ],
    BP_Fx_WayFinding_C: [
      "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_WayFinding.BP_Fx_WayFinding_C",
      0,
    ],
    TsSkeletalObserver_C: [
      "/Game/Aki/TypeScript/Game/Module/SkeletalObserver/TsSkeletalObserver.TsSkeletalObserver_C",
      0,
    ],
    PD_WeaponLevelMaterialDatas_C: [
      "/Game/Aki/Render/RuntimeBP/Character/WeaponLevelMaterial/PD_WeaponLevelMaterialDatas.PD_WeaponLevelMaterialDatas_C",
      0,
    ],
    CharRenderingComponent_C: [
      "/Game/Aki/TypeScript/Game/Render/Character/Manager/CharRenderingComponent.CharRenderingComponent_C",
      0,
    ],
    BP_UiCameraAnimation_C: [
      "/Game/Aki/UI/NewModule/UiCameraAnimation/BP_UiCameraAnimation.BP_UiCameraAnimation_C",
      0,
    ],
    TsUiSceneRoleActor_C: [
      "/Game/Aki/TypeScript/Game/Module/UiComponent/TsUiSceneRoleActor.TsUiSceneRoleActor_C",
      0,
    ],
    TsUiSceneDangoActor_C: [
      "/Game/Aki/TypeScript/Game/Module/UiComponent/TsUiSceneDangoActor.TsUiSceneDangoActor_C",
      0,
    ],
    BulletCommonDataAsset_C: [
      "/Game/Aki/Core/Fight/Bullet/BulletCommonDataAsset.BulletCommonDataAsset_C",
      0,
    ],
    BP_BasePathLineBullet_C: [
      "/Game/Aki/Data/PathLine/PathLine_Bullet/BP_BasePathLineBullet.BP_BasePathLineBullet_C",
      0,
    ],
    BPL_Fight_C: ["/Game/Aki/Core/Fight/BPL_Fight.BPL_Fight_C", 0],
    BulletLogicType_C: [
      "/Game/Aki/Core/Fight/BulletLogicType.BulletLogicType_C",
      0,
    ],
    PD_NpcSetupData_C: [
      "/Game/Aki/Render/RuntimeBP/Character/Npc/PD_NpcSetupData.PD_NpcSetupData_C",
      0,
    ],
    TsAiController_C: [
      "/Game/Aki/TypeScript/Game/AI/Controller/TsAiController.TsAiController_C",
      0,
    ],
    BPI_Animation_C: [
      "/Game/Aki/Character/BaseCharacter/BPI_Animation.BPI_Animation_C",
      0,
    ],
    BP_KuroProjectilePathTracer_C: [
      "/Game/Aki/Render/RuntimeBP/Scene/KuroProjectilePathTracer/BP_KuroProjectilePathTracer.BP_KuroProjectilePathTracer_C",
      0,
    ],
    GA_Base_C: [
      "/Game/Aki/Character/BaseCharacter/Abilities/GA/GA_Base.GA_Base_C",
      0,
    ],
    Ga_Passive_C: [
      "/Game/Aki/Character/BaseCharacter/Abilities/GA/GA_Passive.GA_Passive_C",
      0,
    ],
    TsCharacterDebugComponent_C: [
      "/Game/Aki/TypeScript/Game/NewWorld/Character/Common/Blueprint/Component/TsCharacterDebugComponent.TsCharacterDebugComponent_C",
      0,
    ],
    SimpleNpcFlowComponent_C: [
      "/Game/Aki/Data/NPC/SimpleNpcFlow/SimpleNpcFlowComponent.SimpleNpcFlowComponent_C",
      0,
    ],
    TsSimpleNpc_C: [
      "/Game/Aki/TypeScript/Game/NewWorld/Character/SimpleNpc/Blueprint/TsSimpleNpc.TsSimpleNpc_C",
      0,
    ],
    PD_CharacterControllerDataGroup_C: [
      "/Game/Aki/Render/RuntimeBP/Character/MaterialController/PD_CharacterControllerDataGroup.PD_CharacterControllerDataGroup_C",
      0,
    ],
    BP_MaterialControllerRenderActor_C: [
      "/Game/Aki/Render/RuntimeBP/Character/MaterialController/BP_MaterialControllerRenderActor.BP_MaterialControllerRenderActor_C",
      0,
    ],
    PD_MaterialDebug_C: [
      "/Game/Aki/Render/RuntimeBP/Character/Components/PD_MaterialDebug.PD_MaterialDebug_C",
      0,
    ],
    PDA_GlobalRenderDataReference_C: [
      "/Game/Aki/Render/RuntimeBP/RenderData/PDA_GlobalRenderDataReference.PDA_GlobalRenderDataReference_C",
      0,
    ],
    BP_EffectActor_C: [
      "/Game/Aki/Render/RuntimeBP/Effect/BP_EffectActor.BP_EffectActor_C",
      0,
    ],
    BP_EffectPreview_C: [
      "/Game/Aki/Render/RuntimeBP/Effect/BP_EffectPreview.BP_EffectPreview_C",
      0,
    ],
    AnimNotifyEffect_C: [
      "/Game/Aki/TypeScript/Game/Render/Effect/AnimNotify/AnimNotifyEffect.AnimNotifyEffect_C",
      0,
    ],
    EffectModelGroup_C: [
      "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelGroup.EffectModelGroup_C",
      0,
    ],
    AnimNotifyAddMaterialControllerData_C: [
      "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddMaterialControllerData.AnimNotifyAddMaterialControllerData_C",
      0,
    ],
    AnimNotifyAddMaterialControllerDataGroup_C: [
      "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddMaterialControllerDataGroup.AnimNotifyAddMaterialControllerDataGroup_C",
      0,
    ],
    AnimNotifyAddMeshMaterialControllerData_C: [
      "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddMeshMaterialControllerData.AnimNotifyAddMeshMaterialControllerData_C",
      0,
    ],
    AnimNotifyAddMeshMaterialControllerDataGroup_C: [
      "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddMeshMaterialControllerDataGroup.AnimNotifyAddMeshMaterialControllerDataGroup_C",
      0,
    ],
    AnimNotifyAddMotionVertexOffset_C: [
      "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddMotionVertexOffset.AnimNotifyAddMotionVertexOffset_C",
      0,
    ],
    AnimNotifyAddTransferEffect_C: [
      "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddTransferEffect.AnimNotifyAddTransferEffect_C",
      0,
    ],
    AnimNotifyStateAddMaterialControllerData_C: [
      "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyStateAddMaterialControllerData.AnimNotifyStateAddMaterialControllerData_C",
      0,
    ],
    AnimNotifyStateAddMaterialControllerDataGroup_C: [
      "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyStateAddMaterialControllerDataGroup.AnimNotifyStateAddMaterialControllerDataGroup_C",
      0,
    ],
    EffectModelSkeletalMesh_C: [
      "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelSkeletalMesh.EffectModelSkeletalMesh_C",
      0,
    ],
    AnimNotifyStateEffect_C: [
      "/Game/Aki/TypeScript/Game/Render/Effect/AnimNotify/AnimNotifyStateEffect.AnimNotifyStateEffect_C",
      0,
    ],
    AnimNotifyStateGhost_C: [
      "/Game/Aki/TypeScript/Game/Render/Effect/AnimNotify/AnimNotifyStateGhost.AnimNotifyStateGhost_C",
      0,
    ],
    TsRecordEffect_C: [
      "/Game/Aki/TypeScript/Game/Recorder/TsRecordEffect.TsRecordEffect_C",
      0,
    ],
    TsRecordGameplayCue_C: [
      "/Game/Aki/TypeScript/Game/Recorder/TsRecordGameplayCue.TsRecordGameplayCue_C",
      0,
    ],
    TsAnimNotifyStateAddCharRendering_C: [
      "/Game/Aki/TypeScript/Game/Recorder/TsAnimNotifyStateAddCharRendering.TsAnimNotifyStateAddCharRendering_C",
      0,
    ],
    TsAnimNotifyStateAddMaterialController_C: [
      "/Game/Aki/TypeScript/Game/Recorder/TsAnimNotifyStateAddMaterialController.TsAnimNotifyStateAddMaterialController_C",
      0,
    ],
    BP_Weather_C: ["/Game/Aki/Render/Data/Weather/BP_Weather.BP_Weather_C", 0],
    BP_Wwise_AudioSpectrum_C: [
      "/Game/Aki/Audio/BP_Wwise_AudioSpectrum.BP_Wwise_AudioSpectrum_C",
      0,
    ],
    BP_PartHitEffect_C: [
      "/Game/Aki/Character/BaseCharacter/BP_PartHitEffect.BP_PartHitEffect_C",
      0,
    ],
    ItemMaterialDataMap_C: [
      "/Game/Aki/TypeScript/Game/Render/Scene/Item/MaterialController/ItemMaterialDataMap.ItemMaterialDataMap_C",
      0,
    ],
    ItemMaterialControllerActorData_C: [
      "/Game/Aki/TypeScript/Game/Render/Scene/Item/MaterialController/ItemMaterialControllerActorData.ItemMaterialControllerActorData_C",
      0,
    ],
    BulletCampType_C: [
      "/Game/Aki/Core/Fight/BulletCampType.BulletCampType_C",
      0,
    ],
    PDA_AudioVisualizationGlobalConfigs_C: [
      "/Game/Aki/Render/RuntimeBP/AudioVisualization/PDA_AudioVisualizationGlobalConfigs.PDA_AudioVisualizationGlobalConfigs_C",
      0,
    ],
    PDA_FoliageClusteredEffectConfig_C: [
      "/Game/Aki/Render/RuntimeBP/Effect/ClusteredStuff/PDA_FoliageClusteredEffectConfig.PDA_FoliageClusteredEffectConfig_C",
      0,
    ],
    TsEntityDebugInfoManager_C: [
      "/Game/Aki/TypeScript/Game/World/Debug/TsEntityDebugInfoManager.TsEntityDebugInfoManager_C",
      0,
    ],
    TsPhotographer_C: [
      "/Game/Aki/TypeScript/Game/Module/Photograph/TsPhotographer.TsPhotographer_C",
      0,
    ],
    BPI_AnimalEcological_C: [
      "/Game/Aki/Character/NPC/Animal/BPI_AnimalEcological.BPI_AnimalEcological_C",
      0,
    ],
    SceneEffectStatePostVolume_C: [
      "/Game/Aki/Render/RuntimeBP/Effect/Scene/SceneEffectStatePostVolume.SceneEffectStatePostVolume_C",
      0,
    ],
    BP_StartupPlayerController_C: [
      "/Game/Aki/Core/BP_StartupPlayerController.BP_StartupPlayerController_C",
      0,
    ],
    BP_KuroMasterSeqEvent_C: [
      "/Game/Aki/Sequence/Manager/BP_KuroMasterSeqEvent.BP_KuroMasterSeqEvent_C",
      0,
    ],
    BP_SM_ConditionTimer_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionTimer.BP_SM_ConditionTimer_C",
      0,
    ],
    TsEffectActor_C: [
      "/Game/Aki/TypeScript/Game/Effect/TsEffectActor.TsEffectActor_C",
      0,
    ],
    BPI_EffectInterface_C: [
      "/Game/Aki/Render/RuntimeBP/Effect/BPI_EffectInterface.BPI_EffectInterface_C",
      0,
    ],
    BP_SM_ActionAddBuff_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionAddBuff.BP_SM_ActionAddBuff_C",
      0,
    ],
    BP_SM_ActionRemoveBuff_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionRemoveBuff.BP_SM_ActionRemoveBuff_C",
      0,
    ],
    BP_SM_ActionResetStatus_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionResetStatus.BP_SM_ActionResetStatus_C",
      0,
    ],
    BP_SM_ActionEnterFight_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionEnterFight.BP_SM_ActionEnterFight_C",
      0,
    ],
    BP_SM_ActionChangeInstState_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionChangeInstState.BP_SM_ActionChangeInstState_C",
      0,
    ],
    BP_SM_ActionCue_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionCue.BP_SM_ActionCue_C",
      0,
    ],
    BP_SM_ActionActivatePart_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionActivatePart.BP_SM_ActionActivatePart_C",
      0,
    ],
    BP_SM_ActionActivateSkillGroup_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionActivateSkillGroup.BP_SM_ActionActivateSkillGroup_C",
      0,
    ],
    BP_SM_ActionDispatchEvent_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionDispatchEvent.BP_SM_ActionDispatchEvent_C",
      0,
    ],
    BP_SM_ActionResetPart_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionResetPart.BP_SM_ActionResetPart_C",
      0,
    ],
    BP_SM_ActionStopMontage_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionStopMontage.BP_SM_ActionStopMontage_C",
      0,
    ],
    BP_SM_ActionExitHit_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionExitHit.BP_SM_ActionExitHit_C",
      0,
    ],
    BP_SM_TaskSkill_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskSkill.BP_SM_TaskSkill_C",
      0,
    ],
    BP_SM_TaskSkillByName_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskSkillByName.BP_SM_TaskSkillByName_C",
      0,
    ],
    BP_SM_TaskLeaveFight_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskLeaveFight.BP_SM_TaskLeaveFight_C",
      0,
    ],
    BP_SM_TaskMontage_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskMontage.BP_SM_TaskMontage_C",
      0,
    ],
    BP_SM_TaskRandomMontage_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskRandomMontage.BP_SM_TaskRandomMontage_C",
      0,
    ],
    BP_SM_TaskMoveToTarget_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskMoveToTarget.BP_SM_TaskMoveToTarget_C",
      0,
    ],
    BP_SM_TaskPatrol_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskPatrol.BP_SM_TaskPatrol_C",
      0,
    ],
    BP_SM_TaskBeHitMontage_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskBeHitMontage.BP_SM_TaskBeHitMontage_C",
      0,
    ],
    BP_SM_TaskGroupPatrol_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskGroupPatrol.BP_SM_TaskGroupPatrol_C",
      0,
    ],
    BP_SM_BindStateBuff_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateBuff.BP_SM_BindStateBuff_C",
      0,
    ],
    BP_SM_BindStateTag_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateTag.BP_SM_BindStateTag_C",
      0,
    ],
    BP_SM_BindStateAiHateConfig_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateAiHateConfig.BP_SM_BindStateAiHateConfig_C",
      0,
    ],
    BP_SM_BindStateAiSenseEnable_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateAiSenseEnable.BP_SM_BindStateAiSenseEnable_C",
      0,
    ],
    BP_SM_BindStateCue_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateCue.BP_SM_BindStateCue_C",
      0,
    ],
    BP_SM_BindStateDeathMontage_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateDeathMontage.BP_SM_BindStateDeathMontage_C",
      0,
    ],
    BP_SM_BindStateDisableActor_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateDisableActor.BP_SM_BindStateDisableActor_C",
      0,
    ],
    BP_SM_BindStateBoneCollision_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateBoneCollision.BP_SM_BindStateBoneCollision_C",
      0,
    ],
    BP_SM_BindStateBoneVisible_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateBoneVisible.BP_SM_BindStateBoneVisible_C",
      0,
    ],
    BP_SM_BindStateMeshVisible_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateMeshVisible.BP_SM_BindStateMeshVisible_C",
      0,
    ],
    BP_SM_BindStatePartPanelVisible_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStatePartPanelVisible.BP_SM_BindStatePartPanelVisible_C",
      0,
    ],
    BP_SM_BindStateSkillCounter_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateSkillCounter.BP_SM_BindStateSkillCounter_C",
      0,
    ],
    BP_SM_BindStateDelaySuicide_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateDelaySuicide.BP_SM_BindStateDelaySuicide_C",
      0,
    ],
    BP_SM_BindStateCollisionChannel_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateCollisionChannel.BP_SM_BindStateCollisionChannel_C",
      0,
    ],
    BP_SM_BindStateDisableCollision_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateDisableCollision.BP_SM_BindStateDisableCollision_C",
      0,
    ],
    BP_SM_ConditionTrue_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionTrue.BP_SM_ConditionTrue_C",
      0,
    ],
    BP_SM_ConditionAttribute_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionAttribute.BP_SM_ConditionAttribute_C",
      0,
    ],
    BP_SM_ConditionAttributeRate_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionAttributeRate.BP_SM_ConditionAttributeRate_C",
      0,
    ],
    BP_SM_ConditionCheckState_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionCheckState.BP_SM_ConditionCheckState_C",
      0,
    ],
    BP_SM_ConditionCheckLastState_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionCheckLastState.BP_SM_ConditionCheckLastState_C",
      0,
    ],
    BP_SM_ConditionHate_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionHate.BP_SM_ConditionHate_C",
      0,
    ],
    BP_SM_ConditionTag_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionTag.BP_SM_ConditionTag_C",
      0,
    ],
    BP_SM_ConditionCheckInstState_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionCheckInstState.BP_SM_ConditionCheckInstState_C",
      0,
    ],
    BP_SM_ConditionTaskFinish_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionTaskFinish.BP_SM_ConditionTaskFinish_C",
      0,
    ],
    BP_SM_ConditionBuffStack_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionBuffStack.BP_SM_ConditionBuffStack_C",
      0,
    ],
    BP_SM_ConditionMontageTimeRemaining_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionMontageTimeRemaining.BP_SM_ConditionMontageTimeRemaining_C",
      0,
    ],
    BP_SM_ConditionMontageTimeElapsing_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionMontageTimeElapsing.BP_SM_ConditionMontageTimeElapsing_C",
      0,
    ],
    BP_SM_ConditionCheckPartActivated_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionCheckPartActivated.BP_SM_ConditionCheckPartActivated_C",
      0,
    ],
    BP_SM_ConditionListenEvent_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionListenEvent.BP_SM_ConditionListenEvent_C",
      0,
    ],
    BP_SM_ConditionPartLife_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionPartLife.BP_SM_ConditionPartLife_C",
      0,
    ],
    BP_SM_ConditionListenBeHit_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionListenBeHit.BP_SM_ConditionListenBeHit_C",
      0,
    ],
    BP_SM_ConditionHasMoveInput_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionHasMoveInput.BP_SM_ConditionHasMoveInput_C",
      0,
    ],
    BP_SM_ConditionCheckGroupPatrol_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionCheckGroupPatrol.BP_SM_ConditionCheckGroupPatrol_C",
      0,
    ],
    BP_SM_BindStatePalsy_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStatePalsy.BP_SM_BindStatePalsy_C",
      0,
    ],
    BP_SM_ConditionCheckPositionState_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionCheckPositionState.BP_SM_ConditionCheckPositionState_C",
      0,
    ],
    BP_SM_ConditionCheckDissolveCombine_C: [
      "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionCheckDissolveCombine.BP_SM_ConditionCheckDissolveCombine_C",
      0,
    ],
    TsUiNavigationPanelConfig_C: [
      "/Game/Aki/TypeScript/Game/Module/UiNavigation/New/TsUiNavigationPanelConfig.TsUiNavigationPanelConfig_C",
      0,
    ],
    TsUiNavigationBehaviorListener_C: [
      "/Game/Aki/TypeScript/Game/Module/UiNavigation/New/TsUiNavigationBehaviorListener.TsUiNavigationBehaviorListener_C",
      0,
    ],
    TsUiHotKeyActorComponent_C: [
      "/Game/Aki/TypeScript/Game/Module/UiNavigation/TsUiHotKeyActorComponent.TsUiHotKeyActorComponent_C",
      0,
    ],
    TsUiHotKeyLinkListener_C: [
      "/Game/Aki/TypeScript/Game/Module/UiNavigation/TsUiHotKeyLinkListener.TsUiHotKeyLinkListener_C",
      0,
    ],
    PDA_EffectPaths_C: [
      "/Game/Aki/Render/RuntimeBP/Effect/Debug/PDA_EffectPaths.PDA_EffectPaths_C",
      0,
    ],
    TsUiNavigationTextChangeListener_C: [
      "/Game/Aki/TypeScript/Game/Module/UiNavigation/New/TsUiNavigationTextChangeListener.TsUiNavigationTextChangeListener_C",
      0,
    ],
    ItemMaterialControllerMPCData_C: [
      "/Game/Aki/Render/RuntimeBP/RenderData/ItemMaterialControllerMPCData.ItemMaterialControllerMPCData_C",
      0,
    ],
    BP_CharacterRenderingFunctionLibrary_C: [
      "/Game/Aki/Render/RuntimeBP/Character/Manager/BP_CharacterRenderingFunctionLibrary.BP_CharacterRenderingFunctionLibrary_C",
      0,
    ],
    BP_TeleControlConfig_C: [
      "/Game/Aki/Data/TeleControl/BP_TeleControlConfig.BP_TeleControlConfig_C",
      0,
    ],
    BP_Miaozhunxian_C: [
      "/Game/Aki/Data/PathLine/BP_Miaozhunxian.BP_Miaozhunxian_C",
      0,
    ],
    BP_Miaozhunxian_Bullet_C: [
      "/Game/Aki/Data/PathLine/BP_Miaozhunxian_Bullet.BP_Miaozhunxian_Bullet_C",
      0,
    ],
    TsHotFixActionHandle_C: [
      "/Game/Aki/HotPatch/TsHotFixActionHandle.TsHotFixActionHandle_C",
      0,
    ],
    TsUiBlur_C: [
      "/Game/Aki/TypeScript/Game/Module/UiComponent/Effect/TsUiBlur.TsUiBlur_C",
      0,
    ],
    TsAnimNotifyStateAddBuff_C: [
      "/Game/Aki/TypeScript/Game/AnimNotifyState/TsAnimNotifyStateAddBuff.TsAnimNotifyStateAddBuff_C",
      0,
    ],
    TsAnimNotifyAddBuff_C: [
      "/Game/Aki/TypeScript/Game/AnimNotify/TsAnimNotifyAddBuff.TsAnimNotifyAddBuff_C",
      0,
    ],
    BP_BasePlatform_C: [
      "/Game/Aki/Character/BaseCharacter/BP_BasePlatform.BP_BasePlatform_C",
      0,
    ],
    AIC_AICommon_C: [
      "/Game/Aki/AI/AIFunctionCommon/AIC_AICommon.AIC_AICommon_C",
      0,
    ],
    BPL_BulletPreview_C: [
      "/Game/Aki/Character/BaseCharacter/Tools/BPL_BulletPreview.BPL_BulletPreview_C",
      0,
    ],
    CounterAttackCameraData_C: [
      "/Game/Aki/TypeScript/Game/Define/CounterAttackCameraData.CounterAttackCameraData_C",
      0,
    ],
    CounterAttackEffectData_C: [
      "/Game/Aki/TypeScript/Game/Define/CounterAttackEffectData.CounterAttackEffectData_C",
      0,
    ],
    BP_LightsGroup_C: [
      "/Game/Aki/Render/RuntimeBP/Scene/Light/BP_LightsGroup.BP_LightsGroup_C",
      0,
    ],
    BP_KuroISMGroup_C: [
      "/Game/Aki/Render/RuntimeBP/Scene/BlueprintLevel/BP_KuroISMGroup.BP_KuroISMGroup_C",
      0,
    ],
    TsBaseItem_C: [
      "/Game/Aki/TypeScript/Game/NewWorld/SceneItem/BaseItem/TsBaseItem.TsBaseItem_C",
      0,
    ],
    BP_BaseRole_Seq_V2_C: [
      "/Game/Aki/Character/BaseSeqCharacter/BP_BaseRole_Seq_V2.BP_BaseRole_Seq_V2_C",
      0,
    ],
    BP_KuroDestructibleActor_C: [
      "/Game/Aki/Render/RuntimeBP/Scene/Destructible/BP_KuroDestructibleActor.BP_KuroDestructibleActor_C",
      0,
    ],
    CommonEffectMoveSpline2_C: [
      "/Game/Aki/AI/AIMoveSplineCount/CommonEffectMoveSpline2.CommonEffectMoveSpline2_C",
      0,
    ],
    PDA_InteractionPlayerConfig_C: [
      "/Game/Aki/Render/RuntimeBP/Interaction/PDA_InteractionPlayerConfig.PDA_InteractionPlayerConfig_C",
      0,
    ],
    BP_CameraShakeAndForceFeedback_C: [
      "/Game/Aki/Data/Camera/BP_CameraShakeAndForceFeedback.BP_CameraShakeAndForceFeedback_C",
      0,
    ],
    BP_KuroPortalCapture_C: [
      "/Game/Aki/GamePlay/Portal/BP_KuroPortalCapture.BP_KuroPortalCapture_C",
      0,
    ],
    BP_Portal_C: [
      "/Game/Aki/Render/RuntimeBP/Effect/Portal/BP_Portal.BP_Portal_C",
      0,
    ],
    BP_BaseItem_C: ["/Game/Aki/Character/Item/BP_BaseItem.BP_BaseItem_C", 0],
    BP_SplitScreen_C: [
      "/Game/Aki/Sequence/Common_Seq/Video/SplitScreen/BP_SplitScreen.BP_SplitScreen_C",
      0,
    ],
    BP_SplitScreen_New_C: [
      "/Game/Aki/Sequence/Common_Seq/Video/SplitScreen/BP_SplitScreen_New.BP_SplitScreen_New_C",
      0,
    ],
    BP_SplitScreenCharacterData_C: [
      "/Game/Aki/Sequence/Common_Seq/Video/SplitScreen/SplitScreenData/BP_SplitScreenCharacterData.BP_SplitScreenCharacterData_C",
      0,
    ],
    LogicDataSpeedReduce_C: [
      "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataSpeedReduce.LogicDataSpeedReduce_C",
      0,
    ],
    BP_CloudFuBen_C: [
      "/Game/Aki/Render/RuntimeBP/GI/NewCloud/BP/BP_CloudFuBen.BP_CloudFuBen_C",
      0,
    ],
    BP_PhysicsAttachedBase_C: [
      "/Game/Aki/GamePlay/InteractiveObject/BP_PhysicsAttachedBase.BP_PhysicsAttachedBase_C",
      0,
    ],
    BP_SkiConfig_C: ["/Game/Aki/Data/Level/Ski/BP_SkiConfig.BP_SkiConfig_C", 0],
    PD_HolographicEffect_C: [
      "/Game/Aki/TypeScript/Game/NewWorld/Character/SimpleNpc/Blueprint/PD_HolographicEffect.PD_HolographicEffect_C",
      0,
    ],
    BP_NPCMaterialController_C: [
      "/Game/Aki/TypeScript/Game/NewWorld/Character/SimpleNpc/Blueprint/BP_NPCMaterialController.BP_NPCMaterialController_C",
      0,
    ],
    BP_FollowShooterConfig_C: [
      "/Game/Aki/Data/Fight/FollowShooter/BP_FollowShooterConfig.BP_FollowShooterConfig_C",
      0,
    ],
    WBP_UILoading_C: [
      "/Game/Aki/UI/Module/Loading/View/WBP_UILoading.WBP_UILoading_C",
      0,
    ],
    TsBaseVehicle_C: [
      "/Game/Aki/TypeScript/Game/NewWorld/Vehicle/TsBaseVehicle.TsBaseVehicle_C",
      0,
    ],
    BP_VehicleConfig_C: [
      "/Game/Aki/Data/Level/Vehicle/BP_VehicleConfig.BP_VehicleConfig_C",
      0,
    ],
    BP_ReplaceHitEffect_C: [
      "/Game/Aki/Character/BaseCharacter/BP_ReplaceHitEffect.BP_ReplaceHitEffect_C",
      0,
    ],
    BP_BaseVision_C: [
      "/Game/Aki/Character/Vision/BP_BaseVision.BP_BaseVision_C",
      0,
    ],
    DAC_BatchCreateBullet_C: [
      "/Game/Aki/Character/BaseCharacter/DAC_BatchCreateBullet.DAC_BatchCreateBullet_C",
      0,
    ],
    BP_SummonGongduolaConfig_C: [
      "/Game/Aki/Data/Level/SummonGongduola/BP_SummonGongduolaConfig.BP_SummonGongduolaConfig_C",
      0,
    ],
    BP_AIGearStrategy_C: [
      "/Game/Aki/Data/AIGearStrategy/BP_AiGearStrategy.BP_AIGearStrategy_C",
      0,
    ],
    BP_AIRaceStrategy_C: [
      "/Game/Aki/Data/AIGearStrategy/AIRaceStrategy/BP_AIRaceStrategy.BP_AIRaceStrategy_C",
      0,
    ],
    BP_Test_200_4_1_C: [
      "/Game/Aki/Character/NPC/Test/Test_200_4_01/BP_Test_200_4_1.BP_Test_200_4_1_C",
      0,
    ],
    BP_Test_200_6_C: [
      "/Game/Aki/Character/NPC/Test/Test_200_6/BP_Test_200_6.BP_Test_200_6_C",
      0,
    ],
    BP_Test_200_8_C: [
      "/Game/Aki/Character/NPC/Test/Test_200_8/BP_Test_200_8.BP_Test_200_8_C",
      0,
    ],
    BP_Test_500_4_C: [
      "/Game/Aki/Character/NPC/Test/Test_500_4/BP_Test_500_4.BP_Test_500_4_C",
      0,
    ],
    BP_Test_500_6_C: [
      "/Game/Aki/Character/NPC/Test/Test_500_6/BP_Test_500_6.BP_Test_500_6_C",
      0,
    ],
    BP_Test_500_8_C: [
      "/Game/Aki/Character/NPC/Test/Test_500_8/BP_Test_500_8.BP_Test_500_8_C",
      0,
    ],
    BP_Test_Younuo_370_C: [
      "/Game/Aki/Character/NPC/Test/Test_Younuo_370/BP_Test_Younuo_370.BP_Test_Younuo_370_C",
      0,
    ],
    BP_Test_Zanni_Normal_C: [
      "/Game/Aki/Character/NPC/Test/Test_Zanni/BP_Test_Zanni_Normal.BP_Test_Zanni_Normal_C",
      0,
    ],
    BP_Test_Zanni_Burst_C: [
      "/Game/Aki/Character/NPC/Test/Test_Zanni/BP_Test_Zanni_Burst.BP_Test_Zanni_Burst_C",
      0,
    ],
    BP_SceneBattleInteract_C: [
      "/Game/Aki/Core/Fight/BP_SceneBattleInteract.BP_SceneBattleInteract_C",
      0,
    ],
    BP_EffectAudio_C: ["/Game/Aki/Audio/BP_EffectAudio.BP_EffectAudio_C", 0],
    BP_DangoGlobalConfig_C: [
      "/Game/Aki/Character/NPC/Tuanzi/CommonConfig/BP_DangoGlobalConfig.BP_DangoGlobalConfig_C",
      0,
    ],
    BP_KuroSkeletalMeshDestructibleActor_C: [
      "/Game/Aki/Render/RuntimeBP/Scene/Destructible/BP_KuroSkeletalMeshDestructibleActor.BP_KuroSkeletalMeshDestructibleActor_C",
      0,
    ],
  },
  structDefined = {
    SModelConfig: ["/Game/Aki/Data/Entity/Struct/SModelConfig.SModelConfig", 0],
    SCameraModifier: [
      "/Game/Aki/Character/BaseCharacter/Camera/SCameraModifier.SCameraModifier",
      0,
    ],
    SCameraModifier_Settings: [
      "/Game/Aki/Character/BaseCharacter/Camera/SCameraModifier_Settings.SCameraModifier_Settings",
      0,
    ],
    SCamera_Setting: [
      "/Game/Aki/Character/BaseCharacter/Camera/SCamera_Setting.SCamera_Setting",
      0,
    ],
    SBaseCurve: [
      "/Game/Aki/Character/BaseCharacter/Camera/SBaseCurve.SBaseCurve",
      0,
    ],
    SFloatCurve: [
      "/Game/Aki/Character/BaseCharacter/Camera/SFloatCurve.SFloatCurve",
      0,
    ],
    SCameraConfig: [
      "/Game/Aki/Character/BaseCharacter/Camera/SCameraConfig.SCameraConfig",
      0,
    ],
    SHitInformation: [
      "/Game/Aki/Character/BaseCharacter/SHitInformation.SHitInformation",
      0,
    ],
    SInputCommand: [
      "/Game/Aki/Character/Input/Structures/sInputCommand.SInputCommand",
      0,
    ],
    SClimbState: [
      "/Game/Aki/Character/BaseCharacter/SClimbState.SClimbState",
      0,
    ],
    SClimbInfo: ["/Game/Aki/Character/BaseCharacter/SClimbInfo.SClimbInfo", 0],
    SCounterAttack: [
      "/Game/Aki/Character/BaseCharacter/SCounterAttack.SCounterAttack",
      0,
    ],
    SCharacterLocationsAndRadius: [
      "/Game/Aki/Data/Common/Struct/SCharacterLocationsAndRadius.SCharacterLocationsAndRadius",
      0,
    ],
    SSimpleInteractResult: [
      "/Game/Aki/Core/World/SSimpleInteractResult.SSimpleInteractResult",
      0,
    ],
    SSequencesKeyFrames: [
      "/Game/Aki/Sequence/Manager/SSequencesKeyFrames.SSequencesKeyFrames",
      0,
    ],
    SCameraDebugTool_CameraModeInfo: [
      "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_CameraModeInfo.SCameraDebugTool_CameraModeInfo",
      0,
    ],
    SCameraDebugTool_CameraFrameInfo: [
      "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_CameraFrameInfo.SCameraDebugTool_CameraFrameInfo",
      0,
    ],
    SCameraDebugTool_CameraFrameInfoRegion: [
      "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_CameraFrameInfoRegion.SCameraDebugTool_CameraFrameInfoRegion",
      0,
    ],
    SCameraDebugTool_CameraProperty: [
      "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_CameraProperty.SCameraDebugTool_CameraProperty",
      0,
    ],
    SCameraDebugTool_SubCameraModification: [
      "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_SubCameraModification.SCameraDebugTool_SubCameraModification",
      0,
    ],
    SCameraDebugTool_ControllerModification: [
      "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_ControllerModification.SCameraDebugTool_ControllerModification",
      0,
    ],
    SLockOnPart: ["/Game/Aki/Data/Fight/Struct/SLockOnPart.SLockOnPart", 0],
    SVarRefContext: [
      "/Game/Aki/Data/NPC/LevelAiBtTree/SVarRefContext.SVarRefContext",
      0,
    ],
    SpineThingsInfo: [
      "/Game/Aki/Data/Sequence/Struct/SpineThingsInfo.SpineThingsInfo",
      0,
    ],
  },
  enumDefined = {};
function add(e, a, t, i) {
  exports.typeDefined[e] &&
    Log_1.Log.CheckError() &&
    Log_1.Log.Error(
      "Resource",
      1,
      "类型定义重复",
      ["名字", e],
      ["类型", a],
      ["原路径", exports.typeDefined[e][1]],
      ["新路径", t],
    ),
    (exports.typeDefined[e] = [a, t, i]);
}
exports.typeDefined = {};
for (const e in classDefined) {
  const f = classDefined[e];
  add(e, 0, f[0], f[1]);
}
for (const g in structDefined) {
  const h = structDefined[g];
  add(g, 1, h[0], h[1]);
}
for (const i in enumDefined) {
  const j = enumDefined[i];
  add(i, 2, j[0], j[1]);
}
//# sourceMappingURL=ClassDefine.js.map
