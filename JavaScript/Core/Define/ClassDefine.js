"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.typeDefined = void 0);
const Log_1 = require("../Common/Log");
const classDefined = {
  BP_AudioVisualizer_C:
    "/Game/Aki/Audio/BP_AudioVisualizer.BP_AudioVisualizer_C",
  LGUIEventSystemActor_C:
    "/Game/Aki/UI/Framework/LGUIEventSystemActor.LGUIEventSystemActor_C",
  DataTableUtil_C: "/Game/Aki/UI/Framework/DataTableUtil.DataTableUtil_C",
  BP_SequenceData_C:
    "/Game/Aki/Sequence/Manager/BP_SequenceData.BP_SequenceData_C",
  BP_MainGameInstance_C:
    "/Game/Aki/Core/BP_MainGameInstance.BP_MainGameInstance_C",
  BP_EventManager_C: "/Game/Aki/UI/Manager/BP_EventManager.BP_EventManager_C",
  BP_FightManager_C:
    "/Game/Aki/Core/Fight/Manager/BP_FightManager.BP_FightManager_C",
  BP_CharacterController_C:
    "/Game/Aki/Character/BaseCharacter/BP_CharacterController.BP_CharacterController_C",
  BP_BaseNPC_C: "/Game/Aki/Character/NPC/Common/BP_BaseNPC.BP_BaseNPC_C",
  BPI_NpcEcological_C:
    "/Game/Aki/Character/NPC/Common/BPI_NpcEcological.BPI_NpcEcological_C",
  TsBaseCharacter_C:
    "/Game/Aki/TypeScript/Game/Character/TsBaseCharacter.TsBaseCharacter_C",
  PD_CharacterControllerData_C:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/PD_CharacterControllerData.PD_CharacterControllerData_C",
  BP_BasePathLine_C:
    "/Game/Aki/Data/PathLine/BP_BasePathLine.BP_BasePathLine_C",
  BP_MovePathLine_C:
    "/Game/Aki/Data/PathLine/BP_MovePathLine.BP_MovePathLine_C",
  BP_BasePathLine_Edgewall_C:
    "/Game/Aki/Data/PathLine/Pathline_EdgeWall/BP_BasePathLine_Edgewall.BP_BasePathLine_Edgewall_C",
  BP_CineCamera_C:
    "/Game/Aki/Character/BaseCharacter/Camera/BP_CineCamera.BP_CineCamera_C",
  BP_StreamingSourceActor_C:
    "/Game/Aki/GamePlay/StreamingSource/BP_StreamingSourceActor.BP_StreamingSourceActor_C",
  BPL_CameraUtility_C:
    "/Game/Aki/Character/BaseCharacter/Camera/BPL_CameraUtility.BPL_CameraUtility_C",
  BP_CameraConfig_C: "/Game/Aki/Data/Camera/BP_CameraConfig.BP_CameraConfig_C",
  BP_FightCameraConfig_C:
    "/Game/Aki/Data/Camera/BP_FightCameraConfig.BP_FightCameraConfig_C",
  BP_InputComponent_C:
    "/Game/Aki/Character/Input/Blueprints/BP_InputComponent.BP_InputComponent_C",
  BP_ScreenEffectSystem_C:
    "/Game/Aki/Render/RuntimeBP/ScreenEffect/BP_ScreenEffectSystem.BP_ScreenEffectSystem_C",
  EffectScreenPlayData_C:
    "/Game/Aki/Render/RuntimeBP/ScreenEffect/Data/EffectScreenPlayData.EffectScreenPlayData_C",
  BPI_CreatureInterface_C:
    "/Game/Aki/CreatureTools/BPI_CreatureInterface.BPI_CreatureInterface_C",
  BPI_PhysicInteraction_C:
    "/Game/Aki/GamePlay/InteractiveObject/BPI_PhysicInteraction.BPI_PhysicInteraction_C",
  BPI_NPC_C: "/Game/Aki/Character/NPC/BPI_NPC.BPI_NPC_C",
  TsParkourCheckPoint_C:
    "/Game/Aki/TypeScript/Game/LevelGamePlay/Parkour/TsParkourCheckPoint.TsParkourCheckPoint_C",
  BPL_WorldUtility_C:
    "/Game/Aki/Core/World/BPL_WorldUtility.BPL_WorldUtility_C",
  BPL_CharacterUtility_C:
    "/Game/Aki/Character/BaseCharacter/BPL_CharacterUtility.BPL_CharacterUtility_C",
  WorldFunctionLibrary_C:
    "/Game/Aki/TypeScript/Game/World/Bridge/WorldFunctionLibrary.WorldFunctionLibrary_C",
  BP_GlobalGI_C: "/Game/Aki/Render/RuntimeBP/GI/BP_GlobalGI.BP_GlobalGI_C",
  BP_Cinematics_Tick_C:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/BP_Cinematics_Tick.BP_Cinematics_Tick_C",
  BP_Fx_WayFinding_C:
    "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_WayFinding.BP_Fx_WayFinding_C",
  TsSkeletalObserver_C:
    "/Game/Aki/TypeScript/Game/Module/SkeletalObserver/TsSkeletalObserver.TsSkeletalObserver_C",
  PD_WeaponLevelMaterialDatas_C:
    "/Game/Aki/Render/RuntimeBP/Character/WeaponLevelMaterial/PD_WeaponLevelMaterialDatas.PD_WeaponLevelMaterialDatas_C",
  CharRenderingComponent_C:
    "/Game/Aki/TypeScript/Game/Render/Character/Manager/CharRenderingComponent.CharRenderingComponent_C",
  BP_UiCameraAnimation_C:
    "/Game/Aki/UI/NewModule/UiCameraAnimation/BP_UiCameraAnimation.BP_UiCameraAnimation_C",
  BP_UiActorCallBack_C:
    "/Game/Aki/Core/BP_UiActorCallBack.BP_UiActorCallBack_C",
  BP_UIShowRoom_C:
    "/Game/Aki/Map/UISceneLevel/UI_Scene/UI_BP/BP_UIShowRoom.BP_UIShowRoom_C",
  TsUiSceneRoleActor_C:
    "/Game/Aki/TypeScript/Game/Module/UiComponent/TsUiSceneRoleActor.TsUiSceneRoleActor_C",
  OnlyData_C: "/Game/Aki/Core/Fight/OnlyData.OnlyData_C",
  BulletCommonDataAsset_C:
    "/Game/Aki/Core/Fight/Bullet/BulletCommonDataAsset.BulletCommonDataAsset_C",
  BP_BasePathLineBullet_C:
    "/Game/Aki/Data/PathLine/PathLine_Bullet/BP_BasePathLineBullet.BP_BasePathLineBullet_C",
  BPL_Fight_C: "/Game/Aki/Core/Fight/BPL_Fight.BPL_Fight_C",
  BulletLogicType_C: "/Game/Aki/Core/Fight/BulletLogicType.BulletLogicType_C",
  DefaultBulletSceneInteraction_C:
    "/Game/Aki/Core/Fight/DefaultBulletSceneInteraction.DefaultBulletSceneInteraction_C",
  BulletSceneInteraction_C:
    "/Game/Aki/Core/Fight/BulletSceneInteraction.BulletSceneInteraction_C",
  PD_NpcSetupData_C:
    "/Game/Aki/Render/RuntimeBP/Character/Npc/PD_NpcSetupData.PD_NpcSetupData_C",
  BP_NpcCombinedMesh_C:
    "/Game/Aki/Render/RuntimeBP/Character/Npc/BP_NpcCombinedMesh.BP_NpcCombinedMesh_C",
  TsAiController_C:
    "/Game/Aki/TypeScript/Game/AI/Controller/TsAiController.TsAiController_C",
  BPI_Animation_C:
    "/Game/Aki/Character/BaseCharacter/BPI_Animation.BPI_Animation_C",
  BP_KuroProjectilePathTracer_C:
    "/Game/Aki/Render/RuntimeBP/Scene/KuroProjectilePathTracer/BP_KuroProjectilePathTracer.BP_KuroProjectilePathTracer_C",
  GA_Base_C: "/Game/Aki/Character/BaseCharacter/Abilities/GA/GA_Base.GA_Base_C",
  Ga_Passive_C:
    "/Game/Aki/Character/BaseCharacter/Abilities/GA/GA_Passive.GA_Passive_C",
  TsCharacterDebugComponent_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Character/Common/Blueprint/Component/TsCharacterDebugComponent.TsCharacterDebugComponent_C",
  SimpleNpcFlowComponent_C:
    "/Game/Aki/Data/NPC/SimpleNpcFlow/SimpleNpcFlowComponent.SimpleNpcFlowComponent_C",
  TsSimpleNpc_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Character/SimpleNpc/Blueprint/TsSimpleNpc.TsSimpleNpc_C",
  PDA_WuYinQuBattleData_C:
    "/Game/Aki/Render/RuntimeBP/Battle/PDA_WuYinQuBattleData.PDA_WuYinQuBattleData_C",
  PDA_WuYinQuBattleFightingData_C:
    "/Game/Aki/Render/RuntimeBP/Battle/PDA_WuYinQuBattleFightingData.PDA_WuYinQuBattleFightingData_C",
  PD_CharacterControllerDataGroup_C:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/PD_CharacterControllerDataGroup.PD_CharacterControllerDataGroup_C",
  BP_MaterialControllerRenderActor_C:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/BP_MaterialControllerRenderActor.BP_MaterialControllerRenderActor_C",
  PDA_ComplexBrokenData_C:
    "/Game/Aki/Render/RuntimeBP/Character/ComplexBroken/PDA_ComplexBrokenData.PDA_ComplexBrokenData_C",
  PDA_BadSignalParameters_C:
    "/Game/Aki/Render/RuntimeBP/Character/BadSignalEffect/PDA_BadSignalParameters.PDA_BadSignalParameters_C",
  PD_CurveFloatData_C:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/PD_CurveFloatData.PD_CurveFloatData_C",
  PD_CurveLinearColorData_C:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/PD_CurveLinearColorData.PD_CurveLinearColorData_C",
  PD_CharacterMaterialContainerData_C:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialContainer/PD_CharacterMaterialContainerData.PD_CharacterMaterialContainerData_C",
  PD_MaterialDebug_C:
    "/Game/Aki/Render/RuntimeBP/Character/Components/PD_MaterialDebug.PD_MaterialDebug_C",
  PDA_GlobalRenderDataReference_C:
    "/Game/Aki/Render/RuntimeBP/RenderData/PDA_GlobalRenderDataReference.PDA_GlobalRenderDataReference_C",
  BPF_ActorComponentHelper_C:
    "/Game/Aki/Render/RuntimeBP/Library/BPF_ActorComponentHelper.BPF_ActorComponentHelper_C",
  BPF_CameraHelper_C:
    "/Game/Aki/Render/RuntimeBP/Library/BPF_CameraHelper.BPF_CameraHelper_C",
  BP_EffectActor_C:
    "/Game/Aki/Render/RuntimeBP/Effect/BP_EffectActor.BP_EffectActor_C",
  BP_EffectPreview_C:
    "/Game/Aki/Render/RuntimeBP/Effect/BP_EffectPreview.BP_EffectPreview_C",
  EffectViewComponent_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/EffectViewComponent.EffectViewComponent_C",
  PDA_TrailingConfigData_C:
    "/Game/Aki/Render/RuntimeBP/Effect/Trailing/PDA_TrailingConfigData.PDA_TrailingConfigData_C",
  NiagaraScalabilitySetting_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/Data/NiagaraScalabilitySetting.NiagaraScalabilitySetting_C",
  BP_Item_C: "/Game/Aki/Character/BaseCharacter/BP_Item.BP_Item_C",
  AnimNotifyEffect_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/AnimNotify/AnimNotifyEffect.AnimNotifyEffect_C",
  EffectModelGroup_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelGroup.EffectModelGroup_C",
  EffectModelAudio_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelAudio.EffectModelAudio_C",
  AnimNotifyAddMaterialControllerData_C:
    "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddMaterialControllerData.AnimNotifyAddMaterialControllerData_C",
  AnimNotifyAddMaterialControllerDataGroup_C:
    "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddMaterialControllerDataGroup.AnimNotifyAddMaterialControllerDataGroup_C",
  AnimNotifyAddMeshMaterialControllerData_C:
    "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddMeshMaterialControllerData.AnimNotifyAddMeshMaterialControllerData_C",
  AnimNotifyAddMeshMaterialControllerDataGroup_C:
    "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddMeshMaterialControllerDataGroup.AnimNotifyAddMeshMaterialControllerDataGroup_C",
  AnimNotifyAddMotionVertexOffset_C:
    "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddMotionVertexOffset.AnimNotifyAddMotionVertexOffset_C",
  AnimNotifyAddTransferEffect_C:
    "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyAddTransferEffect.AnimNotifyAddTransferEffect_C",
  AnimNotifyStateAddMaterialControllerData_C:
    "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyStateAddMaterialControllerData.AnimNotifyStateAddMaterialControllerData_C",
  AnimNotifyStateAddMaterialControllerDataGroup_C:
    "/Game/Aki/TypeScript/Game/Render/Character/AnimNotify/AnimNotifyStateAddMaterialControllerDataGroup.AnimNotifyStateAddMaterialControllerDataGroup_C",
  EffectModelSkeletalMesh_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelSkeletalMesh.EffectModelSkeletalMesh_C",
  EffectModelStaticMesh_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelStaticMesh.EffectModelStaticMesh_C",
  EffectModelGpuParticle_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelGpuParticle.EffectModelGpuParticle_C",
  EffectModelPostProcess_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelPostProcess.EffectModelPostProcess_C",
  EffectModelNiagara_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelNiagara.EffectModelNiagara_C",
  EffectModelGhost_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelGhost.EffectModelGhost_C",
  EffectModelDecal_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/Data/EffectModelDecal.EffectModelDecal_C",
  UEffectStatisticsEntryData_C:
    "/Game/Aki/Render/RuntimeBP/Effect/Statistics/UEffectStatisticsEntryData.UEffectStatisticsEntryData_C",
  AnimNotifyStateEffect_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/AnimNotify/AnimNotifyStateEffect.AnimNotifyStateEffect_C",
  AnimNotifyStateGhost_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/AnimNotify/AnimNotifyStateGhost.AnimNotifyStateGhost_C",
  TsRecordEffect_C:
    "/Game/Aki/TypeScript/Game/Recorder/TsRecordEffect.TsRecordEffect_C",
  TsRecordGameplayCue_C:
    "/Game/Aki/TypeScript/Game/Recorder/TsRecordGameplayCue.TsRecordGameplayCue_C",
  TsAnimNotifyAddCharRendering_C:
    "/Game/Aki/TypeScript/Game/Recorder/TsAnimNotifyAddCharRendering.TsAnimNotifyAddCharRendering_C",
  TsAnimNotifyStateAddCharRendering_C:
    "/Game/Aki/TypeScript/Game/Recorder/TsAnimNotifyStateAddCharRendering.TsAnimNotifyStateAddCharRendering_C",
  TsAnimNotifyStateAddMaterialController_C:
    "/Game/Aki/TypeScript/Game/Recorder/TsAnimNotifyStateAddMaterialController.TsAnimNotifyStateAddMaterialController_C",
  BP_Weather_C: "/Game/Aki/Render/Data/Weather/BP_Weather.BP_Weather_C",
  BP_Wwise_AudioSpectrum_C:
    "/Game/Aki/Audio/BP_Wwise_AudioSpectrum.BP_Wwise_AudioSpectrum_C",
  EffectClusteredStuffDefaultSettings_C:
    "/Game/Aki/TypeScript/Game/Render/Effect/ClusteredStuff/EffectClusteredStuffDefaultSettings.EffectClusteredStuffDefaultSettings_C",
  TsSceneDecorativeUiActor_C:
    "/Game/Aki/TypeScript/Game/Module/Scene3DUI/TsSceneDecorativeUiActor.TsSceneDecorativeUiActor_C",
  TsSceneUiTag_C:
    "/Game/Aki/TypeScript/Game/Module/Scene3DUI/TsSceneUiTag.TsSceneUiTag_C",
  BP_PartHitEffect_C:
    "/Game/Aki/Character/BaseCharacter/BP_PartHitEffect.BP_PartHitEffect_C",
  PDA_WaterEffectConfigs_C:
    "/Game/Aki/Render/RuntimeBP/Effect/WaterInteraction/PDA_WaterEffectConfigs.PDA_WaterEffectConfigs_C",
  ItemMaterialDataMap_C:
    "/Game/Aki/TypeScript/Game/Render/Scene/Item/MaterialController/ItemMaterialDataMap.ItemMaterialDataMap_C",
  ItemMaterialControllerActorData_C:
    "/Game/Aki/TypeScript/Game/Render/Scene/Item/MaterialController/ItemMaterialControllerActorData.ItemMaterialControllerActorData_C",
  BP_GlobalGameplayPostProcess_C:
    "/Game/Aki/GamePlay/StaticSceneInteraction/BP_GlobalGameplayPostProcess.BP_GlobalGameplayPostProcess_C",
  BulletCampType_C: "/Game/Aki/Core/Fight/BulletCampType.BulletCampType_C",
  PDA_AudioVisualizationGlobalConfigs_C:
    "/Game/Aki/Render/RuntimeBP/AudioVisualization/PDA_AudioVisualizationGlobalConfigs.PDA_AudioVisualizationGlobalConfigs_C",
  PDA_FoliageClusteredEffectConfig_C:
    "/Game/Aki/Render/RuntimeBP/Effect/ClusteredStuff/PDA_FoliageClusteredEffectConfig.PDA_FoliageClusteredEffectConfig_C",
  TsEntityDebugInfoManager_C:
    "/Game/Aki/TypeScript/Game/World/Debug/TsEntityDebugInfoManager.TsEntityDebugInfoManager_C",
  TsPhotographer_C:
    "/Game/Aki/TypeScript/Game/Module/Photograph/TsPhotographer.TsPhotographer_C",
  TsPhotographerSource_C:
    "/Game/Aki/TypeScript/Game/Module/Photograph/TsPhotographerSource.TsPhotographerSource_C",
  BPI_AnimalEcological_C:
    "/Game/Aki/Character/NPC/Animal/BPI_AnimalEcological.BPI_AnimalEcological_C",
  SceneEffectStatePostVolume_C:
    "/Game/Aki/Render/RuntimeBP/Effect/Scene/SceneEffectStatePostVolume.SceneEffectStatePostVolume_C",
  BP_SimpleHolographic_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Character/SimpleNpc/Blueprint/BP_Simpleholographic.BP_SimpleHolographic_C",
  BP_StartupPlayerController_C:
    "/Game/Aki/Core/BP_StartupPlayerController.BP_StartupPlayerController_C",
  BP_Fx_Control_Obj_C:
    "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Control_Obj.BP_Fx_Control_Obj_C",
  BP_KuroMasterSeqEvent_C:
    "/Game/Aki/Sequence/Manager/BP_KuroMasterSeqEvent.BP_KuroMasterSeqEvent_C",
  BP_FSM_ConditionAttribute_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_FSM_ConditionAttribute.BP_FSM_ConditionAttribute_C",
  BP_FSM_ConditionAttributeRate_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_FSM_ConditionAttributeRate.BP_FSM_ConditionAttributeRate_C",
  BP_FSM_ConditionHate_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_FSM_ConditionHate.BP_FSM_ConditionHate_C",
  BP_FSM_ConditionSkillEnd_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_FSM_ConditionSkillEnd.BP_FSM_ConditionSkillEnd_C",
  BP_FSM_ConditionCheckState_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_FSM_ConditionCheckState.BP_FSM_ConditionCheckState_C",
  BP_FSM_ConditionTag_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_FSM_ConditionTag.BP_FSM_ConditionTag_C",
  BP_SM_ConditionLeaveFight_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionLeaveFight.BP_SM_ConditionLeaveFight_C",
  BP_SM_ConditionTimer_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionTimer.BP_SM_ConditionTimer_C",
  TsEffectActor_C:
    "/Game/Aki/TypeScript/Game/Effect/TsEffectActor.TsEffectActor_C",
  BPI_EffectInterface_C:
    "/Game/Aki/Render/RuntimeBP/Effect/BPI_EffectInterface.BPI_EffectInterface_C",
  BP_FSM_Node_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_FSM_Node.BP_FSM_Node_C",
  BP_SM_ActionAddBuff_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionAddBuff.BP_SM_ActionAddBuff_C",
  BP_SM_ActionRemoveBuff_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionRemoveBuff.BP_SM_ActionRemoveBuff_C",
  BP_SM_ActionResetStatus_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionResetStatus.BP_SM_ActionResetStatus_C",
  BP_SM_ActionEnterFight_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionEnterFight.BP_SM_ActionEnterFight_C",
  BP_SM_ActionChangeInstState_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionChangeInstState.BP_SM_ActionChangeInstState_C",
  BP_SM_ActionCue_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionCue.BP_SM_ActionCue_C",
  BP_SM_ActionActivatePart_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionActivatePart.BP_SM_ActionActivatePart_C",
  BP_SM_ActionActivateSkillGroup_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionActivateSkillGroup.BP_SM_ActionActivateSkillGroup_C",
  BP_SM_ActionDispatchEvent_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionDispatchEvent.BP_SM_ActionDispatchEvent_C",
  BP_SM_ActionResetPart_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionResetPart.BP_SM_ActionResetPart_C",
  BP_SM_ActionStopMontage_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ActionStopMontage.BP_SM_ActionStopMontage_C",
  BP_SM_TaskSkill_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskSkill.BP_SM_TaskSkill_C",
  BP_SM_TaskSkillByName_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskSkillByName.BP_SM_TaskSkillByName_C",
  BP_SM_TaskLeaveFight_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskLeaveFight.BP_SM_TaskLeaveFight_C",
  BP_SM_TaskMontage_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskMontage.BP_SM_TaskMontage_C",
  BP_SM_TaskRandomMontage_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskRandomMontage.BP_SM_TaskRandomMontage_C",
  BP_SM_TaskMoveToTarget_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskMoveToTarget.BP_SM_TaskMoveToTarget_C",
  BP_SM_TaskPatrol_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_TaskPatrol.BP_SM_TaskPatrol_C",
  BP_SM_BindStateBuff_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateBuff.BP_SM_BindStateBuff_C",
  BP_SM_BindStateTag_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateTag.BP_SM_BindStateTag_C",
  BP_SM_BindStateAiHateConfig_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateAiHateConfig.BP_SM_BindStateAiHateConfig_C",
  BP_SM_BindStateAiSenseEnable_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateAiSenseEnable.BP_SM_BindStateAiSenseEnable_C",
  BP_SM_BindStateCue_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateCue.BP_SM_BindStateCue_C",
  BP_SM_BindStateDeathMontage_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateDeathMontage.BP_SM_BindStateDeathMontage_C",
  BP_SM_BindStateDisableActor_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateDisableActor.BP_SM_BindStateDisableActor_C",
  BP_SM_BindStateBoneCollision_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateBoneCollision.BP_SM_BindStateBoneCollision_C",
  BP_SM_BindStateBoneVisible_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateBoneVisible.BP_SM_BindStateBoneVisible_C",
  BP_SM_BindStateMeshVisible_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateMeshVisible.BP_SM_BindStateMeshVisible_C",
  BP_SM_BindStatePartPanelVisible_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStatePartPanelVisible.BP_SM_BindStatePartPanelVisible_C",
  BP_SM_BindStateSkillCounter_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateSkillCounter.BP_SM_BindStateSkillCounter_C",
  BP_SM_BindStateCollisionChannel_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateCollisionChannel.BP_SM_BindStateCollisionChannel_C",
  BP_SM_BindStateDisableCollision_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStateDisableCollision.BP_SM_BindStateDisableCollision_C",
  BP_SM_ConditionTrue_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionTrue.BP_SM_ConditionTrue_C",
  BP_SM_ConditionAttribute_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionAttribute.BP_SM_ConditionAttribute_C",
  BP_SM_ConditionAttributeRate_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionAttributeRate.BP_SM_ConditionAttributeRate_C",
  BP_SM_ConditionCheckState_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionCheckState.BP_SM_ConditionCheckState_C",
  BP_SM_ConditionHate_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionHate.BP_SM_ConditionHate_C",
  BP_SM_ConditionTag_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionTag.BP_SM_ConditionTag_C",
  BP_SM_ConditionCheckInstState_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionCheckInstState.BP_SM_ConditionCheckInstState_C",
  BP_SM_ConditionTaskFinish_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionTaskFinish.BP_SM_ConditionTaskFinish_C",
  BP_SM_ConditionBuffStack_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionBuffStack.BP_SM_ConditionBuffStack_C",
  BP_SM_ConditionMontageTimeRemaining_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionMontageTimeRemaining.BP_SM_ConditionMontageTimeRemaining_C",
  BP_SM_ConditionCheckPartActivated_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionCheckPartActivated.BP_SM_ConditionCheckPartActivated_C",
  BP_SM_ConditionListenEvent_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionListenEvent.BP_SM_ConditionListenEvent_C",
  BP_SM_ConditionPartLife_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionPartLife.BP_SM_ConditionPartLife_C",
  BP_SM_ConditionListenBeHit_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_ConditionListenBeHit.BP_SM_ConditionListenBeHit_C",
  BP_SM_BindStatePalsy_C:
    "/Game/Aki/Character/BaseCharacter/StateMachine/BP_SM_BindStatePalsy.BP_SM_BindStatePalsy_C",
  TsUiNavigationPanelConfig_C:
    "/Game/Aki/TypeScript/Game/Module/UiNavigation/New/TsUiNavigationPanelConfig.TsUiNavigationPanelConfig_C",
  TsUiNavigationBehaviorListener_C:
    "/Game/Aki/TypeScript/Game/Module/UiNavigation/New/TsUiNavigationBehaviorListener.TsUiNavigationBehaviorListener_C",
  TsUiNavigationPlatformChangeListener_C:
    "/Game/Aki/TypeScript/Game/Module/UiNavigation/New/TsUiNavigationPlatformChangeListener.TsUiNavigationPlatformChangeListener_C",
  TsUiHotKeyActorComponent_C:
    "/Game/Aki/TypeScript/Game/Module/UiNavigation/TsUiHotKeyActorComponent.TsUiHotKeyActorComponent_C",
  PDA_EffectPaths_C:
    "/Game/Aki/Render/RuntimeBP/Effect/Debug/PDA_EffectPaths.PDA_EffectPaths_C",
  TsUiNavigationTextChangeListener_C:
    "/Game/Aki/TypeScript/Game/Module/UiNavigation/New/TsUiNavigationTextChangeListener.TsUiNavigationTextChangeListener_C",
  ItemMaterialControllerMPCData_C:
    "/Game/Aki/Render/RuntimeBP/RenderData/ItemMaterialControllerMPCData.ItemMaterialControllerMPCData_C",
  BP_CharacterRenderingFunctionLibrary_C:
    "/Game/Aki/Render/RuntimeBP/Character/Manager/BP_CharacterRenderingFunctionLibrary.BP_CharacterRenderingFunctionLibrary_C",
  BP_TeleControlConfig_C:
    "/Game/Aki/Data/TeleControl/BP_TeleControlConfig.BP_TeleControlConfig_C",
  BP_Miaozhunxian_C:
    "/Game/Aki/Data/PathLine/BP_Miaozhunxian.BP_Miaozhunxian_C",
  BP_Miaozhunxian_Bullet_C:
    "/Game/Aki/Data/PathLine/BP_Miaozhunxian_Bullet.BP_Miaozhunxian_Bullet_C",
  TsHotFixActionHandle_C:
    "/Game/Aki/HotPatch/TsHotFixActionHandle.TsHotFixActionHandle_C",
  TsUiBlur_C:
    "/Game/Aki/TypeScript/Game/Module/UiComponent/Effect/TsUiBlur.TsUiBlur_C",
  TsAnimNotifyStateAddBuff_C:
    "/Game/Aki/TypeScript/Game/AnimNotifyState/TsAnimNotifyStateAddBuff.TsAnimNotifyStateAddBuff_C",
  TsAnimNotifyAddBuff_C:
    "/Game/Aki/TypeScript/Game/AnimNotify/TsAnimNotifyAddBuff.TsAnimNotifyAddBuff_C",
  BP_ABPLogicParams_C:
    "/Game/Aki/Character/BaseCharacter/BP_ABPLogicParams.BP_ABPLogicParams_C",
  BP_BasePlatform_C:
    "/Game/Aki/Character/BaseCharacter/BP_BasePlatform.BP_BasePlatform_C",
  BP_CharacterData_C:
    "/Game/Aki/Character/BaseCharacter/BP_CharacterData.BP_CharacterData_C",
  AIC_AICommon_C: "/Game/Aki/AI/AIFunctionCommon/AIC_AICommon.AIC_AICommon_C",
  BPL_BulletPreview_C:
    "/Game/Aki/Character/BaseCharacter/Tools/BPL_BulletPreview.BPL_BulletPreview_C",
  CounterAttackCameraData_C:
    "/Game/Aki/TypeScript/Game/Define/CounterAttackCameraData.CounterAttackCameraData_C",
  CounterAttackEffectData_C:
    "/Game/Aki/TypeScript/Game/Define/CounterAttackEffectData.CounterAttackEffectData_C",
  BP_LightsGroup_C:
    "/Game/Aki/Render/RuntimeBP/Scene/Light/BP_LightsGroup.BP_LightsGroup_C",
  BP_KuroISMGroup_C:
    "/Game/Aki/Render/RuntimeBP/Scene/BlueprintLevel/BP_KuroISMGroup.BP_KuroISMGroup_C",
  TsBaseItem_C:
    "/Game/Aki/TypeScript/Game/NewWorld/SceneItem/BaseItem/TsBaseItem.TsBaseItem_C",
  BP_SplineMoveConfig_C:
    "/Game/Aki/Data/Fight/AssestStruct/BP_SplineMoveConfig.BP_SplineMoveConfig_C",
  BP_BaseRole_Seq_V2_C:
    "/Game/Aki/Character/BaseSeqCharacter/BP_BaseRole_Seq_V2.BP_BaseRole_Seq_V2_C",
  BP_KuroDestructibleActor_C:
    "/Game/Aki/Render/RuntimeBP/Scene/Destructible/BP_KuroDestructibleActor.BP_KuroDestructibleActor_C",
  CommonEffectMoveSpline2_C:
    "/Game/Aki/AI/AIMoveSplineCount/CommonEffectMoveSpline2.CommonEffectMoveSpline2_C",
  Audio_Multi_Base_C:
    "/Game/Aki/Audio/AkTools/WorldPointSound/Audio_Multi_Base.Audio_Multi_Base_C",
  PDA_InteractionActorConfig_C:
    "/Game/Aki/Render/RuntimeBP/Interaction/PDA_InteractionActorConfig.PDA_InteractionActorConfig_C",
  PDA_InteractionGlobalConfig_C:
    "/Game/Aki/Render/RuntimeBP/Interaction/PDA_InteractionGlobalConfig.PDA_InteractionGlobalConfig_C",
  PDA_InteractionGlobalConfigParameters_C:
    "/Game/Aki/Render/RuntimeBP/Interaction/PDA_InteractionGlobalConfigParameters.PDA_InteractionGlobalConfigParameters_C",
  PDA_InteractionPlayerConfig_C:
    "/Game/Aki/Render/RuntimeBP/Interaction/PDA_InteractionPlayerConfig.PDA_InteractionPlayerConfig_C",
  BP_CameraShakeAndForceFeedback_C:
    "/Game/Aki/Data/Camera/BP_CameraShakeAndForceFeedback.BP_CameraShakeAndForceFeedback_C",
  BP_KposeBase_C:
    "/Game/Aki/Character/Kpose/Blueprint/BP_KposeBase.BP_KposeBase_C",
  BP_KuroPortalCapture_C:
    "/Game/Aki/GamePlay/Portal/BP_KuroPortalCapture.BP_KuroPortalCapture_C",
  BP_Portal_C: "/Game/Aki/Render/RuntimeBP/Effect/Portal/BP_Portal.BP_Portal_C",
  BP_BaseItem_C: "/Game/Aki/Character/Item/BP_BaseItem.BP_BaseItem_C",
  LogicDataCreateBullet_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataCreateBullet.LogicDataCreateBullet_C",
  LogicDataDestroyBullet_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataDestroyBullet.LogicDataDestroyBullet_C",
  LogicDataForce_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataForce.LogicDataForce_C",
  LogicDataSpeedReduce_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataSpeedReduce.LogicDataSpeedReduce_C",
  LogicDataAdditiveAccelerate_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataAdditiveAccelerate.LogicDataAdditiveAccelerate_C",
  LogicDataFreeze_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataFreeze.LogicDataFreeze_C",
  LogicDataRebound_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataRebound.LogicDataRebound_C",
  LogicDataSupport_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataSupport.LogicDataSupport_C",
  LogicDataSplineMovement_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataSplineMovement.LogicDataSplineMovement_C",
  LogicDataShakeScreen_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataShakeScreen.LogicDataShakeScreen_C",
  LogicDataShowMesh_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataShowMesh.LogicDataShowMesh_C",
  LogicDataSuiGuang_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataSuiGuang.LogicDataSuiGuang_C",
  LogicDataSpawnObstacles_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataSpawnObstacles.LogicDataSpawnObstacles_C",
  LogicDataManipulatableCreateBullet_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataManipulatableCreateBullet.LogicDataManipulatableCreateBullet_C",
  LogicDataManipulatableTagsChange_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataManipulatableTagsChange.LogicDataManipulatableTagsChange_C",
  LogicDataWhirlpool_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataWhirlpool.LogicDataWhirlpool_C",
  LogicDataDestroyOtherBullet_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataDestroyOtherBullet.LogicDataDestroyOtherBullet_C",
  LogicDataBase_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/LogicDataBase.LogicDataBase_C",
  BP_CloudFuBen_C:
    "/Game/Aki/Render/RuntimeBP/GI/NewCloud/BP/BP_CloudFuBen.BP_CloudFuBen_C",
  BP_PhysicsAttachedBase_C:
    "/Game/Aki/GamePlay/InteractiveObject/BP_PhysicsAttachedBase.BP_PhysicsAttachedBase_C",
  BP_SkiConfig_C: "/Game/Aki/Data/Level/Ski/BP_SkiConfig.BP_SkiConfig_C",
  PD_HolographicEffect_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Character/SimpleNpc/Blueprint/PD_HolographicEffect.PD_HolographicEffect_C",
  BP_NPCMaterialController_C:
    "/Game/Aki/TypeScript/Game/NewWorld/Character/SimpleNpc/Blueprint/BP_NPCMaterialController.BP_NPCMaterialController_C",
};
const structDefined = {
  SBulletDataMain:
    "/Game/Aki/Character/BaseCharacter/SBulletDataMain.SBulletDataMain",
  SModelConfig: "/Game/Aki/Data/Entity/Struct/SModelConfig.SModelConfig",
  SAiConditions:
    "/Game/Aki/Character/Monster/Common/SAiConditions.SAiConditions",
  SSettlementCamera:
    "/Game/Aki/Character/BaseCharacter/Camera/SSettlementCamera.SSettlementCamera",
  SCameraModifier:
    "/Game/Aki/Character/BaseCharacter/Camera/SCameraModifier.SCameraModifier",
  SCameraModifier_Lens:
    "/Game/Aki/Character/BaseCharacter/Camera/SCameraModifier_Lens.SCameraModifier_Lens",
  SCameraModifier_Settings:
    "/Game/Aki/Character/BaseCharacter/Camera/SCameraModifier_Settings.SCameraModifier_Settings",
  SSequenceCamera_Settings:
    "/Game/Aki/Character/BaseCharacter/Camera/SSequenceCamera_Settings.SSequenceCamera_Settings",
  SCamera_NewConfig:
    "/Game/Aki/Character/BaseCharacter/Camera/SCamera_NewConfig.SCamera_NewConfig",
  SCamera_Setting:
    "/Game/Aki/Character/BaseCharacter/Camera/SCamera_Setting.SCamera_Setting",
  SBaseCurve: "/Game/Aki/Character/BaseCharacter/Camera/SBaseCurve.SBaseCurve",
  SFloatCurve:
    "/Game/Aki/Character/BaseCharacter/Camera/SFloatCurve.SFloatCurve",
  SCameraConfig:
    "/Game/Aki/Character/BaseCharacter/Camera/SCameraConfig.SCameraConfig",
  SParkourConfig: "/Game/Aki/Data/Parkour/SParkourConfig.SParkourConfig",
  SInteractionConfig:
    "/Game/Aki/Data/Interaction/Struct/SInteractionConfig.SInteractionConfig",
  SInteractionOption:
    "/Game/Aki/Data/Interaction/Struct/SInteractionOption.SInteractionOption",
  SCipherGameplay: "/Game/Aki/GamePlay/Cipher/SCipherGameplay.SCipherGameplay",
  SStrikeInfo:
    "/Game/Aki/Data/LevelGamePlay/StrikeResponse/Stuct/SStrikeInfo.SStrikeInfo",
  SParkourPointInfo:
    "/Game/Aki/Data/Parkour/SParkourPointInfo.SParkourPointInfo",
  SWeaponSocketItem:
    "/Game/Aki/Character/BaseCharacter/SWeaponSocketItem.SWeaponSocketItem",
  SEntityConfig: "/Game/Aki/Data/Entity/Struct/SEntityConfig.SEntityConfig",
  SInputShowList:
    "/Game/Aki/Character/Input/Structures/SInputShowList.SInputShowList",
  SSkillInfo: "/Game/Aki/Character/BaseCharacter/SSkillInfo.SSkillInfo",
  SSkillTarget: "/Game/Aki/Character/BaseCharacter/SSkillTarget.SSkillTarget",
  SInputShow: "/Game/Aki/Character/Input/Structures/SInputShow.SInputShow",
  SVisionData: "/Game/Aki/Character/Vision/SVisionData.SVisionData",
  SHitEffect: "/Game/Aki/Character/BaseCharacter/SHitEffect.SHitEffect",
  SMovementSetting:
    "/Game/Aki/Character/BaseCharacter/SMovementSetting.SMovementSetting",
  SMovementRotationSetting:
    "/Game/Aki/Character/BaseCharacter/SMovementRotationSetting.SMovementRotationSetting",
  SConditionGroup:
    "/Game/Aki/Data/Condition/Struct/SConditionGroup.SConditionGroup",
  SServerInfo: "/Game/Aki/Data/Server/Struct/SServerInfo.SServerInfo",
  SUiAnimNotifyEffect:
    "/Game/Aki/Character/BaseCharacter/SUiAnimNotifyEffect.SUiAnimNotifyEffect",
  SUiAnimNotifyModel:
    "/Game/Aki/Character/BaseCharacter/SUiAnimNotifyModel.SUiAnimNotifyModel",
  SSubtitleSettings:
    "/Game/Aki/Sequence/SeqSubtitle/SSubtitleSettings.SSubtitleSettings",
  SSequencesNetwork:
    "/Game/Aki/Sequence/Manager/SSequencesNetwork.SSequencesNetwork",
  SSequencesNetwrokNode:
    "/Game/Aki/Sequence/Manager/SSequencesNetwrokNode.SSequencesNetwrokNode",
  SUiCameraAnimationBlendSettings:
    "/Game/Aki/Data/UiCameraAnimation/Struct/SUiCameraAnimationBlendSettings.SUiCameraAnimationBlendSettings",
  SUiCameraAnimationSettings:
    "/Game/Aki/Data/UiCameraAnimation/Struct/SUiCameraAnimationSettings.SUiCameraAnimationSettings",
  SReBulletDataMain: "/Game/Aki/Core/Fight/SReBulletDataMain.SReBulletDataMain",
  SHitInformation:
    "/Game/Aki/Character/BaseCharacter/SHitInformation.SHitInformation",
  SReBulletDataChildren:
    "/Game/Aki/Core/Fight/SReBulletDataChildren.SReBulletDataChildren",
  SReBulletDataPerformance:
    "/Game/Aki/Core/Fight/SReBulletDataPerformance.SReBulletDataPerformance",
  SCounterAttackCamera:
    "/Game/Aki/Character/BaseCharacter/SCounterAttackCamera.SCounterAttackCamera",
  SInputCaches:
    "/Game/Aki/Character/Input/Structures/SInputCaches.SInputCaches",
  SInputHoldConfig:
    "/Game/Aki/Character/Input/Structures/SInputHoldConfig.SInputHoldConfig",
  SInputCommand:
    "/Game/Aki/Character/Input/Structures/sInputCommand.SInputCommand",
  SMovementSetting_State:
    "/Game/Aki/Character/BaseCharacter/SMovementSetting_State.SMovementSetting_State",
  SClimbState: "/Game/Aki/Character/BaseCharacter/SClimbState.SClimbState",
  SClimbInfo: "/Game/Aki/Character/BaseCharacter/SClimbInfo.SClimbInfo",
  SCounterAttack:
    "/Game/Aki/Character/BaseCharacter/SCounterAttack.SCounterAttack",
  SVisionCounterAttack:
    "/Game/Aki/Character/BaseCharacter/SVisionCounterAttack.SVisionCounterAttack",
  SCounterAttackBuff:
    "/Game/Aki/Character/BaseCharacter/SCounterAttackBuff.SCounterAttackBuff",
  SHitMapping: "/Game/Aki/Character/BaseCharacter/SHitMapping.SHitMapping",
  SCaughtInfo: "/Game/Aki/Character/BaseCharacter/SCaughtInfo.SCaughtInfo",
  SEntityProperty:
    "/Game/Aki/Character/BaseCharacter/SEntityProperty.SEntityProperty",
  SCharacterPart:
    "/Game/Aki/Character/BaseCharacter/SCharacterPart.SCharacterPart",
  SimpleNpcFlowData:
    "/Game/Aki/Data/NPC/SimpleNpcFlow/SimpleNpcFlowData.SimpleNpcFlowData",
  SNiagaraParam: "/Game/Aki/Data/Common/Struct/SNiagaraParam.SNiagaraParam",
  SSimpleInteractResult:
    "/Game/Aki/Core/World/SSimpleInteractResult.SSimpleInteractResult",
  SCharacterFightInfo:
    "/Game/Aki/Data/Fight/Struct/SCharacterFightInfo.SCharacterFightInfo",
  SMaterialDebugInfo:
    "/Game/Aki/Render/RuntimeBP/Character/Components/SMaterialDebugInfo.SMaterialDebugInfo",
  SSceneInteractionitem:
    "/Game/Aki/Render/RuntimeBP/Scene/Interaction/SSceneInteractionitem.SSceneInteractionitem",
  SSceneInteractionMaterialParameterCollection:
    "/Game/Aki/Render/RuntimeBP/Scene/Interaction/SSceneInteractionMaterialParameterCollection.SSceneInteractionMaterialParameterCollection",
  SMaterialControllerFloatGroup:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/SMaterialControllerFloatGroup.SMaterialControllerFloatGroup",
  SMaterialControllerColorGroup:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/SMaterialControllerColorGroup.SMaterialControllerColorGroup",
  SMaterialControllerFloatParameter:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/SMaterialControllerFloatParameter.SMaterialControllerFloatParameter",
  SMaterialControllerColorParameter:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/SMaterialControllerColorParameter.SMaterialControllerColorParameter",
  SMapConfig: "/Game/Aki/Data/Map/Struct/SMapConfig.SMapConfig",
  STags: "/Game/Aki/Core/World/STags.STags",
  SNpcHookPart:
    "/Game/Aki/Render/RuntimeBP/Character/Npc/SNpcHookPart.SNpcHookPart",
  SNpcSetupPartInfo:
    "/Game/Aki/Render/RuntimeBP/Character/Npc/SNpcSetupPartInfo.SNpcSetupPartInfo",
  SSceneDecorationConfig:
    "/Game/Aki/Data/Scene3DUI/Struct/SSceneDecorationConfig.SSceneDecorationConfig",
  SSceneUITagConfig:
    "/Game/Aki/Data/Scene3DUI/Struct/SSceneUITagConfig.SSceneUITagConfig",
  SAiWeaponSocket:
    "/Game/Aki/Character/BaseCharacter/SAiWeaponSocket.SAiWeaponSocket",
  SWeaponSocket:
    "/Game/Aki/Character/BaseCharacter/SWeaponSocket.SWeaponSocket",
  SWeaponMesh: "/Game/Aki/Character/BaseCharacter/SWeaponMesh.SWeaponMesh",
  SWaterEffectGroup:
    "/Game/Aki/Render/RuntimeBP/Effect/WaterInteraction/SWaterEffectGroup.SWaterEffectGroup",
  SWaterEffectItem:
    "/Game/Aki/Render/RuntimeBP/Effect/WaterInteraction/SWaterEffectItem.SWaterEffectItem",
  SWaterEffectObject:
    "/Game/Aki/Render/RuntimeBP/Effect/WaterInteraction/SWaterEffectObject.SWaterEffectObject",
  SScenePropertyEffect:
    "/Game/Aki/Render/RuntimeBP/Scene/Interaction/SScenePropertyEffect.SScenePropertyEffect",
  SSequencesKeyFrames:
    "/Game/Aki/Sequence/Manager/SSequencesKeyFrames.SSequencesKeyFrames",
  SSequenceMember: "/Game/Aki/Sequence/Manager/SSequenceMember.SSequenceMember",
  SNavigationGroup:
    "/Game/Aki/Data/UiNavigation/Struct/SNavigationGroup.SNavigationGroup",
  SNavigationCursor:
    "/Game/Aki/Data/UiNavigation/Struct/SNavigationCursor.SNavigationCursor",
  SCameraDebugTool_CameraModeInfo:
    "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_CameraModeInfo.SCameraDebugTool_CameraModeInfo",
  SCameraDebugTool_CameraFrameInfo:
    "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_CameraFrameInfo.SCameraDebugTool_CameraFrameInfo",
  SCameraDebugTool_CameraFrameInfoRegion:
    "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_CameraFrameInfoRegion.SCameraDebugTool_CameraFrameInfoRegion",
  SCameraDebugTool_CameraProperty:
    "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_CameraProperty.SCameraDebugTool_CameraProperty",
  SCameraDebugTool_SubCameraModification:
    "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_SubCameraModification.SCameraDebugTool_SubCameraModification",
  SCameraDebugTool_ControllerModification:
    "/Game/Aki/Data/Camera/CameraDebugTool/SCameraDebugTool_ControllerModification.SCameraDebugTool_ControllerModification",
  SSkillBehavior:
    "/Game/Aki/Character/BaseCharacter/SSkillBehavior.SSkillBehavior",
  SSkillBehaviorCondition:
    "/Game/Aki/Character/BaseCharacter/SSkillBehaviorCondition.SSkillBehaviorCondition",
  SSkillBehaviorAction:
    "/Game/Aki/Character/BaseCharacter/SSkillBehaviorAction.SSkillBehaviorAction",
  SLockOnPart: "/Game/Aki/Data/Fight/Struct/SLockOnPart.SLockOnPart",
  SUiRoleCameraSetting:
    "/Game/Aki/Data/UiRoleCamera/Struct/SUiRoleCameraSetting.SUiRoleCameraSetting",
  SUiRoleCameraOffsetSetting:
    "/Game/Aki/Data/UiRoleCamera/Struct/SUiRoleCameraOffsetSetting.SUiRoleCameraOffsetSetting",
  SFootstepAudioEventParam:
    "/Game/Aki/Audio/SFootstepAudioEventParam.SFootstepAudioEventParam",
  SFootprint:
    "/Game/Aki/Character/Role/Common/Data/Structure/SFootprint.SFootprint",
  SFootstepAkAudioEvent:
    "/Game/Aki/Character/Role/Common/Data/Structure/SFootstepAkAudioEvent.SFootstepAkAudioEvent",
  SKuroInteractionLimbsConfig:
    "/Game/Aki/Render/RuntimeBP/Interaction/SKuroInteractionLimbsConfig.SKuroInteractionLimbsConfig",
};
const enumDefined = {
  EExitClimb: "/Game/Aki/Character/BaseCharacter/EExitClimb.EExitClimb",
  ESkillGenre: "/Game/Aki/Character/BaseCharacter/ESkillGenre.ESkillGenre",
  EDayState: "/Game/Aki/Data/Common/Enum/EDayState.EDayState",
  SConditionGroupType:
    "/Game/Aki/Data/Condition/Enum/SConDitionGroupType.SConditionGroupType",
  EQuestStepState: "/Game/Aki/Data/Quest/Enum/EQuestStepState.EQuestStepState",
  EWeatherState: "/Game/Aki/Data/Common/Enum/EWeatherState.EWeatherState",
  ECamp: "/Game/Aki/Character/BaseCharacter/ECamp.ECamp",
  EAttributeType: "/Game/Aki/Protocol/EAttributeType.EAttributeType",
  ERelation: "/Game/Aki/Character/BaseCharacter/ERelation.ERelation",
  EInputAction: "/Game/Aki/Character/Input/Enum/EInputAction.EInputAction",
  EInputState: "/Game/Aki/Character/Input/Enum/EInputState.EInputState",
  ECustomCameraMode:
    "/Game/Aki/Character/BaseCharacter/ECustomCameraMode.ECustomCameraMode",
  ECharacterDitherType:
    "/Game/Aki/Render/RuntimeBP/Character/Manager/ECharacterDitherType.ECharacterDitherType",
  EBaseCurveType:
    "/Game/Aki/Character/BaseCharacter/Camera/EBaseCurveType.EBaseCurveType",
  EFightCameraType:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraType.EFightCameraType",
  ECharacterRenderingType:
    "/Game/Aki/Render/RuntimeBP/Character/Manager/ECharacterRenderingType.ECharacterRenderingType",
  ECommandType: "/Game/Aki/Character/Input/Enum/ECommandType.ECommandType",
  EInteractOptionType:
    "/Game/Aki/Data/Interaction/Enum/EInteractOptionType.EInteractOptionType",
  EQuestHandleType:
    "/Game/Aki/Data/Quest/Enum/EQuestHandleType.EQuestHandleType",
  ECipherGameplayType:
    "/Game/Aki/GamePlay/Cipher/ECipherGameplayType.ECipherGameplayType",
  SrikeElement:
    "/Game/Aki/Data/LevelGamePlay/StrikeResponse/Stuct/SrikeElement.SrikeElement",
  StrikeType:
    "/Game/Aki/Data/LevelGamePlay/StrikeResponse/Stuct/StrikeType.StrikeType",
  EWuYinQuState:
    "/Game/Aki/Render/RuntimeBP/Battle/EWuYinQuState.EWuYinQuState",
  EInputCharacterState:
    "/Game/Aki/Character/Input/Enum/EInputCharacterState.EInputCharacterState",
  EBodyType: "/Game/Aki/Data/Entity/Enum/EBodyType.EBodyType",
  EBossStateViewType:
    "/Game/Aki/Data/Entity/Enum/EBossStateViewType.EBossStateViewType",
  EHeadStateViewType:
    "/Game/Aki/Data/Entity/Enum/EHeadStateViewType.EHeadStateViewType",
  EPerformanceRoleState:
    "/Game/Aki/Character/Role/Common/Data/Enum/EPerformanceRoleState.EPerformanceRoleState",
  EInteractionType:
    "/Game/Aki/Data/Interaction/Enum/EInteractionType.EInteractionType",
  EInteractionIconType:
    "/Game/Aki/Data/Interaction/Enum/EinteractionIconType.EInteractionIconType",
  EClimbState: "/Game/Aki/Character/BaseCharacter/EClimbState.EClimbState",
  SeqCameraMode: "/Game/Aki/Sequence/Manager/Enum/SeqCameraMode.SeqCameraMode",
  ESeqSwtichType: "/Game/Aki/Sequence/Manager/ESeqSwtichType.ESeqSwtichType",
  EUiCameraAnimationLocationType:
    "/Game/Aki/Data/UiCameraAnimation/Enum/EUiCameraAnimationLocationType.EUiCameraAnimationLocationType",
  EUiCameraAnimationRotationType:
    "/Game/Aki/Data/UiCameraAnimation/Enum/EUiCameraAnimationRotationType.EUiCameraAnimationRotationType",
  EUiCameraAnimationTargetType:
    "/Game/Aki/Data/UiCameraAnimation/Enum/EUiCameraAnimationTargetType.EUiCameraAnimationTargetType",
  EBulletObject: "/Game/Aki/Core/Fight/EBulletObject.EBulletObject",
  EBulletSyncType: "/Game/Aki/Core/Fight/EBulletSyncType.EBulletSyncType",
  EBulletChildrenType:
    "/Game/Aki/Core/Fight/EBulletChildrenType.EBulletChildrenType",
  EBulletHitEffect: "/Game/Aki/Core/Fight/EBulletHitEffect.EBulletHitEffect",
  EBulletLogicStage:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/EBulletLogicStage.EBulletLogicStage",
  EBulletLogicObstacles:
    "/Game/Aki/TypeScript/Game/NewWorld/Bullet/LogicDataClass/EBulletLogicObstacles.EBulletLogicObstacles",
  EHitType: "/Game/Aki/Core/Fight/EHitType.EHitType",
  EBulletShape: "/Game/Aki/Character/BaseCharacter/EBulletShape.EBulletShape",
  EBulletFollowType:
    "/Game/Aki/Character/BaseCharacter/EBulletFollowType.EBulletFollowType",
  EBulletRelativeDir:
    "/Game/Aki/Character/BaseCharacter/EBulletRelativeDir.EBulletRelativeDir",
  EPositionStandard: "/Game/Aki/Core/Fight/EPositionStandard.EPositionStandard",
  EBulletTarget: "/Game/Aki/Core/Fight/EBulletTarget.EBulletTarget",
  EBulletHitDirectionType:
    "/Game/Aki/Character/BaseCharacter/EBulletHitDirectionType.EBulletHitDirectionType",
  EBulletType: "/Game/Aki/Character/BaseCharacter/EBulletType.EBulletType",
  EInitialVelocityDirection:
    "/Game/Aki/Core/Fight/EInitialVelocityDirection.EInitialVelocityDirection",
  EMoveTrajectory: "/Game/Aki/Core/Fight/EMoveTrajectory.EMoveTrajectory",
  EAimViewState:
    "/Game/Aki/Character/BaseCharacter/EAimViewState.EAimViewState",
  EEnterClimb: "/Game/Aki/Character/BaseCharacter/EEnterClimb.EEnterClimb",
  ECharState: "/Game/Aki/Character/BaseCharacter/ECharState.ECharState",
  ECharParentMoveState:
    "/Game/Aki/Character/BaseCharacter/ECharParentMoveState.ECharParentMoveState",
  ECharViewDirectionState:
    "/Game/Aki/Character/BaseCharacter/ECharViewDirectionState.ECharViewDirectionState",
  EHitAnim: "/Game/Aki/Character/BaseCharacter/EHitAnim.EHitAnim",
  ECaughtType: "/Game/Aki/Character/BaseCharacter/ECaughtType.ECaughtType",
  ECaughtResultType:
    "/Game/Aki/Character/BaseCharacter/ECaughtResultType.ECaughtResultType",
  ESimpleNpcFlowCheckType:
    "/Game/Aki/Data/NPC/SimpleNpcFlow/ESimpleNpcFlowCheckType.ESimpleNpcFlowCheckType",
  EGameplayFunctionType:
    "/Game/Aki/GamePlay/EGameplayFunctionType.EGameplayFunctionType",
  ETriggerType: "/Game/Aki/GamePlay/TriggerItems/ETriggerType.ETriggerType",
  ECharacterControllerType:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/ECharacterControllerType.ECharacterControllerType",
  ECharacterSlotType:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialContainer/ECharacterSlotType.ECharacterSlotType",
  ECharacterBodySpecifiedType:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialContainer/ECharacterBodySpecifiedType.ECharacterBodySpecifiedType",
  ECharacterSlotSpecifiedType:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialContainer/ECharacterSlotSpecifiedType.ECharacterSlotSpecifiedType",
  ECharacterControllerApplyType:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/ECharacterControllerApplyType.ECharacterControllerApplyType",
  ECharacterControllerChannelSwitch:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/ECharacterControllerChannelSwitch.ECharacterControllerChannelSwitch",
  ECharacterControllerUVSwitch:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/ECharacterControllerUVSwitch.ECharacterControllerUVSwitch",
  E_BillboardMode:
    "/Game/Aki/Render/RuntimeBP/Effect/Billboard/E_BillboardMode.E_BillboardMode",
  EEffectStatisticsSortType:
    "/Game/Aki/Render/RuntimeBP/Effect/Statistics/EEffectStatisticsSortType.EEffectStatisticsSortType",
  EEffectScalabilityType:
    "/Game/Aki/Render/RuntimeBP/Effect/Scalability/EEffectScalabilityType.EEffectScalabilityType",
  ENiagaraScalabilityType:
    "/Game/Aki/Render/RuntimeBP/Effect/Scalability/ENiagaraScalabilityType.ENiagaraScalabilityType",
  ESkillEffectType:
    "/Game/Aki/Character/BaseCharacter/ESkillEffectType.ESkillEffectType",
  ETrailingAttachType:
    "/Game/Aki/Render/RuntimeBP/Effect/Trailing/ETrailingAttachType.ETrailingAttachType",
  ECharacterBodyType:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialContainer/ECharacterBodyType.ECharacterBodyType",
  EEntityType: "/Game/Aki/Data/Entity/Enum/EEntityType.EEntityType",
  EFightCameraAuto:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraAuto.EFightCameraAuto",
  EFightCameraAdjust:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraAdjust.EFightCameraAdjust",
  EFightCameraClimb:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraClimb.EFightCameraClimb",
  EFightCameraDefault:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraDefault.EFightCameraDefault",
  EFightCameraDialogue:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraDialogue.EFightCameraDialogue",
  EFightCameraExplore:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraExplore.EFightCameraExplore",
  EFightCameraFocus:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraFocus.EFightCameraFocus",
  EFightCameraGuide:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraGuide.EFightCameraGuide",
  EFightCameraInput:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraInput.EFightCameraInput",
  EFightCameraModify:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraModify.EFightCameraModify",
  EFightCameraSidestep:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraSidestep.EFightCameraSidestep",
  EFightCameraSpecialGameplay:
    "/Game/Aki/Character/BaseCharacter/Camera/EFightCameraSpecialGameplay.EFightCameraSpecialGameplay",
  ENpcSetupType:
    "/Game/Aki/Render/RuntimeBP/Character/Npc/ENpcSetupType.ENpcSetupType",
  EAnsRotateBlackboardType:
    "/Game/Aki/Character/BaseCharacter/EAnsRotateBlackboardType.EAnsRotateBlackboardType",
  EAnsBlackboardType:
    "/Game/Aki/Character/BaseCharacter/EAnsBlackboardType.EAnsBlackboardType",
  EMovementDirection:
    "/Game/Aki/AI/AIFunctionCommon/EMovementDirection.EMovementDirection",
  ESkillType: "/Game/Aki/Character/BaseCharacter/ESkillType.ESkillType",
  ECaughtDirectionType:
    "/Game/Aki/Character/BaseCharacter/ECaughtDirectionType.ECaughtDirectionType",
  ECharacterState:
    "/Game/Aki/Character/BaseCharacter/ECharacterState.ECharacterState",
  EBulletSpecificEffect:
    "/Game/Aki/Core/Fight/EBulletSpecificEffect.EBulletSpecificEffect",
  EBulletEffectParam:
    "/Game/Aki/Core/Fight/EBulletEffectParam.EBulletEffectParam",
  EBulletBaseSpecificParam:
    "/Game/Aki/Core/Fight/EBulletBaseSpecificParam.EBulletBaseSpecificParam",
  EMultiEffectType:
    "/Game/Aki/Render/RuntimeBP/Effect/MultiEffect/EMultiEffectType.EMultiEffectType",
  EAnimalEcologicalState:
    "/Game/Aki/Character/NPC/Animal/EAnimalEcologicalState.EAnimalEcologicalState",
  ESceneEffectStateType:
    "/Game/Aki/Render/RuntimeBP/Effect/Scene/ESceneEffectStateType.ESceneEffectStateType",
  ECharacterControllerCaseType:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/ECharacterControllerCaseType.ECharacterControllerCaseType",
  ECharacterMeshPart:
    "/Game/Aki/Render/RuntimeBP/Character/MaterialController/ECharacterMeshPart.ECharacterMeshPart",
  EWeaponViewName:
    "/Game/Aki/Character/Role/Common/Data/Enum/EWeaponViewName.EWeaponViewName",
  EPlotSequenceType:
    "/Game/Aki/Sequence/Manager/EPlotSequenceType.EPlotSequenceType",
  ERoleInteractType:
    "/Game/Aki/Data/Role/Enum/ERoleInteractType.ERoleInteractType",
  E_GachaResultNew:
    "/Game/Aki/Scene/NewGacha/BP/E_GachaResultNew.E_GachaResultNew",
  EHotKeyNameStateType:
    "/Game/Aki/Data/UiNavigation/Enum/EHotKeyNameStateType.EHotKeyNameStateType",
  ECursorOffsetType:
    "/Game/Aki/Data/UiNavigation/Enum/ECursorOffsetType.ECursorOffsetType",
  ESkillTargetPriority:
    "/Game/Aki/Character/BaseCharacter/ESkillTargetPriority.ESkillTargetPriority",
  ESkillTargetDirection:
    "/Game/Aki/Character/BaseCharacter/ESkillTargetDirection.ESkillTargetDirection",
  EPawnChannel: "/Game/Aki/Character/BaseCharacter/EPawnChannel.EPawnChannel",
  EEffectPlay: "/Game/Aki/Data/Effect/Struct/EEffectPlay.EEffectPlay",
  EEffectType: "/Game/Aki/Data/Effect/Struct/EEffectType.EEffectType",
  ESkillMode: "/Game/Aki/Character/BaseCharacter/ESkillMode.ESkillMode",
  ESkillBehaviorConditionType:
    "/Game/Aki/Character/BaseCharacter/ESkillBehaviorConditionType.ESkillBehaviorConditionType",
  ESkillBehaviorComparisonLogic:
    "/Game/Aki/Character/BaseCharacter/ESkillBehaviorComparisonLogic.ESkillBehaviorComparisonLogic",
  ESkillBehaviorActionType:
    "/Game/Aki/Character/BaseCharacter/ESkillBehaviorActionType.ESkillBehaviorActionType",
  ESkillBehaviorLocationType:
    "/Game/Aki/Character/BaseCharacter/ESkillBehaviorLocationType.ESkillBehaviorLocationType",
  ESkillBehaviorLocationForwardType:
    "/Game/Aki/Character/BaseCharacter/ESkillBehaviorLocationForwardType.ESkillBehaviorLocationForwardType",
  ESkillBehaviorRotationType:
    "/Game/Aki/Character/BaseCharacter/ESkillBehaviorRotationType.ESkillBehaviorRotationType",
  ESkillBehaviorRestrictType:
    "/Game/Aki/Character/BaseCharacter/ESkillBehaviorRestrictType.ESkillBehaviorRestrictType",
  ESkillLoadType:
    "/Game/Aki/Character/BaseCharacter/ESkillLoadType.ESkillLoadType",
  EAimAssistMode:
    "/Game/Aki/Character/BaseCharacter/Camera/EAimAssistMode.EAimAssistMode",
  ECameraAnsEffectiveClientType:
    "/Game/Aki/Character/BaseCharacter/Camera/ECameraAnsEffectiveClientType.ECameraAnsEffectiveClientType",
  ESequenceCameraAnsEffectiveClientType:
    "/Game/Aki/Character/BaseCharacter/Camera/ESequenceCameraAnsEffectiveClientType.ESequenceCameraAnsEffectiveClientType",
  EFootstepAkAudioEventType:
    "/Game/Aki/Character/Role/Common/Data/Structure/EFootstepAkAudioEventType.EFootstepAkAudioEventType",
  ESceneInteractionEffect:
    "/Game/Aki/Render/RuntimeBP/Effect/Enum/ESceneInteractionEffect.ESceneInteractionEffect",
  EAnimNotifyEffectLocationType:
    "/Game/Aki/Render/RuntimeBP/Effect/Enum/EAnimNotifyEffectLocationType.EAnimNotifyEffectLocationType",
};
function add(e, a, t) {
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
    (exports.typeDefined[e] = [a, t]);
}
exports.typeDefined = {};
for (const d in classDefined) add(d, 0, classDefined[d]);
for (const e in structDefined) add(e, 1, structDefined[e]);
for (const f in enumDefined) add(f, 2, enumDefined[f]);
// # sourceMappingURL=ClassDefine.js.map
