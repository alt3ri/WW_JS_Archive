"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldEntityHelper = exports.USE_ENTITY_POOL = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  MonsterBattleConfById_1 = require("../../../Core/Define/ConfigQuery/MonsterBattleConfById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  IEntity_1 = require("../../../UniverseEditor/Interface/IEntity"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BaseTagComponent_1 = require("../Common/Component/BaseTagComponent"),
  BaseUnifiedStateComponent_1 = require("../Common/Component/BaseUnifiedStateComponent"),
  ClientConditionListenerComponent_1 = require("../Common/Component/ClientConditionListenerComponent"),
  CommonConnectComponent_1 = require("../Common/Component/CommonConnectComponent"),
  CustomAudioControlComponent_1 = require("../Common/Component/CustomAudioControlComponent"),
  DurablityComponent_1 = require("../Common/Component/DurablityComponent"),
  InteractItemComponent_1 = require("../Common/Component/InteractItemComponent"),
  LevelQteComponent_1 = require("../Common/Component/LevelQteComponent"),
  LevelTagComponent_1 = require("../Common/Component/LevelTagComponent"),
  PerformanceComponent_1 = require("../Common/Component/PerformanceComponent"),
  PostProcessBridgeComponent_1 = require("../Common/Component/PostProcessBridgeComponent"),
  SceneItemInhalationComponent_1 = require("../Common/Component/SceneItemInhalationComponent"),
  SubActorPerformanceComponent_1 = require("../Common/Component/SubActorPerformanceComponent"),
  SubMeshComponent_1 = require("../Common/Component/SubMeshComponent"),
  UeActorTickManageComponent_1 = require("../Common/Component/UeActorTickManageComponent"),
  UeComponentTickManageComponent_1 = require("../Common/Component/UeComponentTickManageComponent"),
  UeMovementTickManageComponent_1 = require("../Common/Component/UeMovementTickManageComponent"),
  UeSkeletalTickManageComponent_1 = require("../Common/Component/UeSkeletalTickManageComponent"),
  PawnAdsorbComponent_1 = require("../Pawn/Component/PawnAdsorbComponent"),
  PawnInfoManageComponent_1 = require("../Pawn/Component/PawnInfoManageComponent"),
  PawnInteractNewComponent_1 = require("../Pawn/Component/PawnInteractNewComponent"),
  PawnPerceptionComponent_1 = require("../Pawn/Component/PawnPerceptionComponent"),
  PawnSensoryComponent_1 = require("../Pawn/Component/PawnSensoryComponent"),
  PawnSensoryInfoComponent_1 = require("../Pawn/Component/PawnSensoryInfoComponent"),
  PlayerAttributeComponent_1 = require("../Player/Component/PlayerAttributeComponent"),
  PlayerBuffComponent_1 = require("../Player/Component/PlayerBuffComponent"),
  PlayerFollowerComponent_1 = require("../Player/Component/PlayerFollowerComponent"),
  PlayerGameplayCueComponent_1 = require("../Player/Component/PlayerGameplayCueComponent"),
  PlayerLifeCycleComponent_1 = require("../Player/Component/PlayerLifeCycleComponent"),
  PlayerTagComponent_1 = require("../Player/Component/PlayerTagComponent"),
  AiGearStrategyComponent_1 = require("../SceneItem/AiInteraction/AiGearStrategyComponent"),
  AiWeaponMovementComponent_1 = require("../SceneItem/AiInteraction/AiWeaponMovementComponent"),
  CollectComponent_1 = require("../SceneItem/CollectComponent"),
  BatchBulletCasterComponent_1 = require("../SceneItem/Common/Component/BatchBulletCasterComponent"),
  EffectAreaComponent_1 = require("../SceneItem/Common/Component/EffectAreaComponent"),
  RenderMaskComponent_1 = require("../SceneItem/Common/Component/RenderMaskComponent"),
  SceneItemAiRacingMoveComponent_1 = require("../SceneItem/Common/Component/SceneItemAiRacingMoveComponent"),
  SceneItemAttachTargetComponent_1 = require("../SceneItem/Common/Component/SceneItemAttachTargetComponent"),
  SceneItemDebugComponent_1 = require("../SceneItem/Common/Component/SceneItemDebugComponent"),
  SceneItemDynamicAttachTargetComponent_1 = require("../SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent"),
  SceneItemInteractAudioComponent_1 = require("../SceneItem/Common/Component/SceneItemInteractAudioComponent"),
  SceneItemMoveComponent_1 = require("../SceneItem/Common/Component/SceneItemMoveComponent"),
  SceneItemNoRenderPortalComponent_1 = require("../SceneItem/Common/Component/SceneItemNoRenderPortalComponent"),
  SceneItemPhysicalAttachComponent_1 = require("../SceneItem/Common/Component/SceneItemPhysicalAttachComponent"),
  SceneItemPortalComponent_1 = require("../SceneItem/Common/Component/SceneItemPortalComponent"),
  SceneItemProgressControlComponent_1 = require("../SceneItem/Common/Component/SceneItemProgressControlComponent"),
  SceneItemPropertyComponent_1 = require("../SceneItem/Common/Component/SceneItemPropertyComponent"),
  SceneItemStateAudioComponent_1 = require("../SceneItem/Common/Component/SceneItemStateAudioComponent"),
  SceneItemStateComponent_1 = require("../SceneItem/Common/Component/SceneItemStateComponent"),
  SceneItemTimeTrackControlComponent_1 = require("../SceneItem/Common/Component/SceneItemTimeTrackControlComponent"),
  SceneItemTurntableControllerComponent_1 = require("../SceneItem/Common/Component/SceneItemTurntableControllerComponent"),
  SmartObjectComponent_1 = require("../SceneItem/Common/Component/SmartObjectComponent"),
  WindDirectionalSourceComponent_1 = require("../SceneItem/Common/Component/WindDirectionalSourceComponent"),
  DynamicPortalCreatorComponent_1 = require("../SceneItem/DynamicPortalCreatorComponent"),
  GamePlayElevatorComponent_1 = require("../SceneItem/GamePlayElevatorComponent"),
  GamePlayHitGearComponent_1 = require("../SceneItem/GamePlayHitGearComponent"),
  GamePlayTreasureBoxComponent_1 = require("../SceneItem/GamePlayTreasureBoxComponent"),
  GamePlayWalkingPatternComponent_1 = require("../SceneItem/GamePlayWalkingPatternComponent"),
  SceneItemJigsawBaseComponent_1 = require("../SceneItem/Jigsaw/SceneItemJigsawBaseComponent"),
  SceneItemJigsawItemComponent_1 = require("../SceneItem/Jigsaw/SceneItemJigsawItemComponent"),
  LevelSequenceFrameEventComponent_1 = require("../SceneItem/LevelSequenceFrameEventComponent"),
  SceneBulletComponent_1 = require("../SceneItem/SceneBulletComponent"),
  SceneItemActorComponent_1 = require("../SceneItem/SceneItemActorComponent"),
  SceneItemAdviceComponent_1 = require("../SceneItem/SceneItemAdviceComponent"),
  SceneItemAiInteractionComponent_1 = require("../SceneItem/SceneItemAiInteractionComponent"),
  SceneItemBeamCastComponent_1 = require("../SceneItem/SceneItemBeamCastComponent"),
  SceneItemBeamReceiveComponent_1 = require("../SceneItem/SceneItemBeamReceiveComponent"),
  SceneItemBuffConsumerComponent_1 = require("../SceneItem/SceneItemBuffConsumerComponent"),
  SceneItemBuffProducerComponent_1 = require("../SceneItem/SceneItemBuffProducerComponent"),
  SceneItemCameraAlertComponent_1 = require("../SceneItem/SceneItemCameraAlertComponent"),
  SceneItemCaptureComponent_1 = require("../SceneItem/SceneItemCaptureComponent"),
  SceneItemChessmanComponent_1 = require("../SceneItem/SceneItemChessmanComponent"),
  SceneItemConveyorBeltComponent_1 = require("../SceneItem/SceneItemConveyorBeltComponent"),
  SceneItemDamageComponent_1 = require("../SceneItem/SceneItemDamageComponent"),
  SceneItemDropItemComponent_1 = require("../SceneItem/SceneItemDropItemComponent"),
  SceneItemExploreInteractComponent_1 = require("../SceneItem/SceneItemExploreInteractComponent"),
  SceneItemFanComponent_1 = require("../SceneItem/SceneItemFanComponent"),
  SceneItemFishingPointComponent_1 = require("../SceneItem/SceneItemFishingPointComponent"),
  SceneItemGravityComponent_1 = require("../SceneItem/SceneItemGravityComponent"),
  SceneItemGravityFlipComponent_1 = require("../SceneItem/SceneItemGravityFlipComponent"),
  SceneItemGroupAiComponent_1 = require("../SceneItem/SceneItemGroupAiComponent"),
  SceneItemGuidePathComponent_1 = require("../SceneItem/SceneItemGuidePathComponent"),
  SceneItemHitComponent_1 = require("../SceneItem/SceneItemHitComponent"),
  SceneItemInhaledItemComponent_1 = require("../SceneItem/SceneItemInhaledItemComponent"),
  SceneItemLevitateMagnetComponent_1 = require("../SceneItem/SceneItemLevitateMagnetComponent"),
  SceneItemManipulatableComponent_1 = require("../SceneItem/SceneItemManipulatableComponent"),
  SceneItemMonsterGachaItemComponent_1 = require("../SceneItem/SceneItemMonsterGachaItemComponent"),
  SceneItemMovementSyncComponent_1 = require("../SceneItem/SceneItemMovementSyncComponent"),
  SceneItemMultiInteractionActorComponent_1 = require("../SceneItem/SceneItemMultiInteractionActorComponent"),
  SceneItemNearbyTrackingComponent_1 = require("../SceneItem/SceneItemNearbyTrackingComponent"),
  SceneItemOutletComponent_1 = require("../SceneItem/SceneItemOutletComponent"),
  SceneItemPickInteractComponent_1 = require("../SceneItem/SceneItemPickInteractComponent"),
  SceneItemReboundComponent_1 = require("../SceneItem/SceneItemReboundComponent"),
  SceneItemReferenceComponent_1 = require("../SceneItem/SceneItemReferenceComponent"),
  SceneItemResetPositionComponent_1 = require("../SceneItem/SceneItemResetPositionComponent"),
  SceneItemResetSelfPositionComponent_1 = require("../SceneItem/SceneItemResetSelfPositionComponent"),
  SceneItemRotatorComponent_1 = require("../SceneItem/SceneItemRotatorComponent"),
  SceneItemTimeScaleComponent_1 = require("../SceneItem/SceneItemTimeScaleComponent"),
  SceneItemTimeStopMachineComponent_1 = require("../SceneItem/SceneItemTimeStopMachineComponent"),
  SceneItemTrackGuideComponent_1 = require("../SceneItem/SceneItemTrackGuideComponent"),
  SceneItemVehicleComponent_1 = require("../SceneItem/SceneItemVehicleComponent"),
  SceneItemWindPipelineComponent_1 = require("../SceneItem/SceneItemWindPipelineComponent"),
  SceneItemGenericOutletComponent_1 = require("../SceneItemGenericOutletComponent"),
  UeVehicleMovementTickManageComponent_1 = require("../Vehicle/Common/UeVehicleMovementTickManageComponent"),
  VehicleAbilityComponent_1 = require("../Vehicle/Common/VehicleAbilityComponent"),
  VehicleActorComponent_1 = require("../Vehicle/Common/VehicleActorComponent"),
  VehicleAnimationComponent_1 = require("../Vehicle/Common/VehicleAnimationComponent"),
  VehicleAudioComponent_1 = require("../Vehicle/Common/VehicleAudioComponent"),
  VehicleHitComponent_1 = require("../Vehicle/Common/VehicleHitComponent"),
  VehicleInputComponent_1 = require("../Vehicle/Common/VehicleInputComponent"),
  VehicleMontageComponent_1 = require("../Vehicle/Common/VehicleMontageComponent"),
  VehicleMoveComponent_1 = require("../Vehicle/Common/VehicleMoveComponent"),
  VehicleMovementSyncComponent_1 = require("../Vehicle/Common/VehicleMovementSyncComponent"),
  VehiclePerformComponent_1 = require("../Vehicle/Common/VehiclePerformComponent"),
  VehicleSceneItemPerformComponent_1 = require("../Vehicle/Common/VehicleSceneItemPerformComponent"),
  VehicleSkillComponent_1 = require("../Vehicle/Common/VehicleSkillComponent"),
  VehicleSplineMoveComponent_1 = require("../Vehicle/Common/VehicleSplineMoveComponent"),
  VehicleTagComponent_1 = require("../Vehicle/Common/VehicleTagComponent"),
  FishingBoatDeathComponent_1 = require("../Vehicle/FishingBoat/FishingBoatDeathComponent"),
  FishingBoatInputComponent_1 = require("../Vehicle/FishingBoat/FishingBoatInputComponent"),
  FishingBoatPerformComponent_1 = require("../Vehicle/FishingBoat/FishingBoatPerformComponent"),
  GongduolaAudioComponent_1 = require("../Vehicle/Gongduola/GongduolaAudioComponent"),
  GongduolaInputComponent_1 = require("../Vehicle/Gongduola/GongduolaInputComponent"),
  GongduolaPerformComponent_1 = require("../Vehicle/Gongduola/GongduolaPerformComponent"),
  GongduolaSplineMoveComponent_1 = require("../Vehicle/Gongduola/GongduolaSplineMoveComponent"),
  AnimalDeathSyncComponent_1 = require("./Animal/Component/AnimalDeathSyncComponent"),
  AnimalPerformComponent_1 = require("./Animal/Component/AnimalPerformComponent"),
  AnimalStateMachineComponent_1 = require("./Animal/Component/AnimalStateMachineComponent"),
  CharacterComponentPriorityDefine_1 = require("./Common/CharacterComponentPriorityDefine"),
  BaseDamageComponent_1 = require("./Common/Component/Abilities/BaseDamageComponent"),
  CharacterAbilityComponent_1 = require("./Common/Component/Abilities/CharacterAbilityComponent"),
  CharacterAttributeComponent_1 = require("./Common/Component/Abilities/CharacterAttributeComponent"),
  CharacterBuffComponent_1 = require("./Common/Component/Abilities/CharacterBuffComponent"),
  CharacterDamageComponent_1 = require("./Common/Component/Abilities/CharacterDamageComponent"),
  CharacterGameplayCueComponent_1 = require("./Common/Component/Abilities/CharacterGameplayCueComponent"),
  CharacterGasDebugComponent_1 = require("./Common/Component/Abilities/CharacterGasDebugComponent"),
  CharacterMontageComponent_1 = require("./Common/Component/Abilities/CharacterMontageComponent"),
  CharacterPassiveSkillComponent_1 = require("./Common/Component/Abilities/CharacterPassiveSkillComponent"),
  CharacterStatisticsComponent_1 = require("./Common/Component/Abilities/CharacterStatisticsComponent"),
  CharacterTriggerComponent_1 = require("./Common/Component/Abilities/CharacterTriggerComponent"),
  CharacterUnifiedStateComponent_1 = require("./Common/Component/Abilities/CharacterUnifiedStateComponent"),
  VisionBuffComponent_1 = require("./Common/Component/Abilities/VisionBuffComponent"),
  CharacterActionComponent_1 = require("./Common/Component/Action/CharacterActionComponent"),
  CharacterActorComponent_1 = require("./Common/Component/CharacterActorComponent"),
  CharacterAiComponent_1 = require("./Common/Component/CharacterAiComponent"),
  CharacterAnimationComponent_1 = require("./Common/Component/CharacterAnimationComponent"),
  CharacterAnimationSyncComponent_1 = require("./Common/Component/CharacterAnimationSyncComponent"),
  CharacterAttachComponent_1 = require("./Common/Component/CharacterAttachComponent"),
  CharacterAudioComponent_1 = require("./Common/Component/CharacterAudioComponent"),
  CharacterBirthTagComponent_1 = require("./Common/Component/CharacterBirthTagComponent"),
  CharacterCaughtNewComponent_1 = require("./Common/Component/CharacterCaughtNewComponent"),
  CharacterCombatMessageComponent_1 = require("./Common/Component/CharacterCombatMessageComponent"),
  CharacterCustomValueComponent_1 = require("./Common/Component/CharacterCustomValueComponent"),
  CharacterExploreComponent_1 = require("./Common/Component/CharacterExploreComponent"),
  CharacterFightStateComponent_1 = require("./Common/Component/CharacterFightStateComponent"),
  CharacterFollowComponent_1 = require("./Common/Component/CharacterFollowComponent"),
  CharacterFootEffectComponent_1 = require("./Common/Component/CharacterFootEffectComponent"),
  CharacterGaitComponent_1 = require("./Common/Component/CharacterGaitComponent"),
  CharacterGlideComponent_1 = require("./Common/Component/CharacterGlideComponent"),
  CharacterHitComponent_1 = require("./Common/Component/CharacterHitComponent"),
  CharacterInputComponent_1 = require("./Common/Component/CharacterInputComponent"),
  CharacterLevelShootComponent_1 = require("./Common/Component/CharacterLevelShootComponent"),
  CharacterLogicStateSyncComponent_1 = require("./Common/Component/CharacterLogicStateSyncComponent"),
  CharacterManipulateComponent_1 = require("./Common/Component/CharacterManipulateComponent"),
  CharacterManipulateInteractComponent_1 = require("./Common/Component/CharacterManipulateInteractComponent"),
  CharacterMoveComponent_1 = require("./Common/Component/CharacterMoveComponent"),
  CharacterMovementSyncComponent_1 = require("./Common/Component/CharacterMovementSyncComponent"),
  CharacterPartComponent_1 = require("./Common/Component/CharacterPartComponent"),
  CharacterPartScanComponent_1 = require("./Common/Component/CharacterPartScanComponent"),
  CharacterPendulumComponent_1 = require("./Common/Component/CharacterPendulumComponent"),
  CharacterPhysicsAssetComponent_1 = require("./Common/Component/CharacterPhysicsAssetComponent"),
  CharacterPlanComponent_1 = require("./Common/Component/CharacterPlanComponent"),
  CharacterRoleTransitionComponent_1 = require("./Common/Component/CharacterRoleTransitionComponent"),
  CharacterShieldComponent_1 = require("./Common/Component/CharacterShieldComponent"),
  CharacterSkinDamageComponent_1 = require("./Common/Component/CharacterSkinDamageComponent"),
  CharacterSplineMoveComponent_1 = require("./Common/Component/CharacterSplineMoveComponent"),
  CharacterStateMachineNewComponent_1 = require("./Common/Component/CharacterStateMachineNewComponent"),
  CharacterSwimComponent_1 = require("./Common/Component/CharacterSwimComponent"),
  CharacterThrowComponent_1 = require("./Common/Component/CharacterThrowComponent"),
  CharacterTimeScaleComponent_1 = require("./Common/Component/CharacterTimeScaleComponent"),
  CharacterWalkOnWaterComponent_1 = require("./Common/Component/CharacterWalkOnWaterComponent"),
  CharacterWeaponComponent_1 = require("./Common/Component/CharacterWeaponComponent"),
  CreatureDataComponent_1 = require("./Common/Component/CreatureDataComponent"),
  DangoPerformComponent_1 = require("./Common/Component/DangoPerformComponent"),
  ActorDebugMovementComponent_1 = require("./Common/Component/Debug/ActorDebugMovementComponent"),
  CharacterFlowComponent_1 = require("./Common/Component/Flow/CharacterFlowComponent"),
  CharacterLockOnComponent_1 = require("./Common/Component/LockOn/CharacterLockOnComponent"),
  CharacterMorphComponent_1 = require("./Common/Component/Morph/CharacterMorphComponent"),
  CharacterCatapultComponent_1 = require("./Common/Component/Move/CharacterCatapultComponent"),
  CharacterClimbComponent_1 = require("./Common/Component/Move/CharacterClimbComponent"),
  CharacterKiteComponent_1 = require("./Common/Component/Move/CharacterKiteComponent"),
  CharacterPatrolComponent_1 = require("./Common/Component/Move/CharacterPatrolComponent"),
  CharacterRollComponent_1 = require("./Common/Component/Move/CharacterRollComponent"),
  CharacterSlideComponent_1 = require("./Common/Component/Move/CharacterSlideComponent"),
  NpcMoveComponent_1 = require("./Common/Component/NpcMoveComponent"),
  PawnHeadInfoComponent_1 = require("./Common/Component/PawnHeadInfoComponent"),
  RolePreloadComponent_1 = require("./Common/Component/RolePreloadComponent"),
  ScanComponent_1 = require("./Common/Component/ScanComponent"),
  BaseSkillCdComponent_1 = require("./Common/Component/Skill/BaseSkillCdComponent"),
  CharacterSkillCdComponent_1 = require("./Common/Component/Skill/CharacterSkillCdComponent"),
  CharacterSkillComponent_1 = require("./Common/Component/Skill/CharacterSkillComponent"),
  CharacterSkillTriggerComponent_1 = require("./Common/Component/Skill/CharacterSkillTriggerComponent"),
  CharacterSpecialSkillComponent_1 = require("./Common/Component/Skill/CharacterSpecialSkillComponent"),
  VisionSkillComponent_1 = require("./Common/Component/Skill/VisionSkillComponent"),
  CharacterVisionComponent_1 = require("./Common/Component/Vision/CharacterVisionComponent"),
  CreateEntityData_1 = require("./CreateEntityData"),
  ClientTriggerComponent_1 = require("./Custom/Components/ClientTriggerComponent"),
  DungeonEntranceComponent_1 = require("./Custom/Components/DungeonEntranceComponent"),
  GrapplingHookPointComponent_1 = require("./Custom/Components/GrapplingHookPointComponent"),
  RangeComponent_1 = require("./Custom/Components/RangeComponent"),
  SafetyLocationComponent_1 = require("./Custom/Components/SafetyLocationComponent"),
  TriggerComponent_1 = require("./Custom/Components/TriggerComponent"),
  FollowShooterComponent_1 = require("./Monster/Component/FollowShooterComponent"),
  HackManagementComponent_1 = require("./Monster/Component/HackManagementComponent"),
  MonsterFlowComponent_1 = require("./Monster/Component/MonsterFlowComponent"),
  ExecutionComponent_1 = require("./Monster/Entity/Component/ExecutionComponent"),
  MonsterBehaviorComponent_1 = require("./Monster/Entity/Component/MonsterBehaviorComponent"),
  MonsterDeathComponent_1 = require("./Monster/Entity/Component/MonsterDeathComponent"),
  MonsterFrozenComponent_1 = require("./Monster/Entity/Component/MonsterFrozenComponent"),
  CommonNpcPerformComponent_1 = require("./Npc/Component/CommonNpcPerformComponent"),
  NpcDriveVehicleComponent_1 = require("./Npc/Component/NpcDriveVehicleComponent"),
  NpcFlowComponent_1 = require("./Npc/Component/NpcFlowComponent"),
  NpcPasserbyComponent_1 = require("./Npc/Component/NpcPasserbyComponent"),
  NpcPerformComponent_1 = require("./Npc/Component/NpcPerformComponent"),
  NpcVehiclePerformComponent_1 = require("./Npc/Component/NpcVehiclePerformComponent"),
  PasserbyGeneratorComponent_1 = require("./Npc/Component/PasserbyGeneratorComponent"),
  RoleAttributeComponent_1 = require("./Role/Component/RoleAttributeComponent"),
  RoleAudioComponent_1 = require("./Role/Component/RoleAudioComponent"),
  RoleBuffComponent_1 = require("./Role/Component/RoleBuffComponent"),
  RoleDeathComponent_1 = require("./Role/Component/RoleDeathComponent"),
  RoleDriveVehicleComponent_1 = require("./Role/Component/RoleDriveVehicleComponent"),
  RoleElementComponent_1 = require("./Role/Component/RoleElementComponent"),
  RoleEnergyComponent_1 = require("./Role/Component/RoleEnergyComponent"),
  RoleFrozenComponent_1 = require("./Role/Component/RoleFrozenComponent"),
  RoleGaitComponent_1 = require("./Role/Component/RoleGaitComponent"),
  RoleGrowComponent_1 = require("./Role/Component/RoleGrowComponent"),
  RoleInhalationComponent_1 = require("./Role/Component/RoleInhalationComponent"),
  RoleInheritComponent_1 = require("./Role/Component/RoleInheritComponent"),
  RoleLocationSafetyComponent_1 = require("./Role/Component/RoleLocationSafetyComponent"),
  RolePartyComponent_1 = require("./Role/Component/RolePartyComponent"),
  RoleQteComponent_1 = require("./Role/Component/RoleQteComponent"),
  RoleSceneInteractComponent_1 = require("./Role/Component/RoleSceneInteractComponent"),
  RoleStrengthComponent_1 = require("./Role/Component/RoleStrengthComponent"),
  RoleTagComponent_1 = require("./Role/Component/RoleTagComponent"),
  RoleTeamComponent_1 = require("./Role/Component/RoleTeamComponent"),
  SimpleNpcActorComponent_1 = require("./SimpleNpc/Component/SimpleNpcActorComponent"),
  SimpleNpcAnimationComponent_1 = require("./SimpleNpc/Component/SimpleNpcAnimationComponent"),
  ROLE_PRIORITY = 7,
  GLOBAL_PRIORITY = 7,
  VISION_PRIORITY = 11,
  MONSTER_PRIORITY = 10,
  NPC_PRIORITY = 9,
  VEHICLE_PRIORITY = 11,
  OTHER_PRIORITY = 8;
exports.USE_ENTITY_POOL = !0;
class WorldEntityHelper {
  static Initialize() {
    return (
      this.Nor(), this.Oor(), this.UMc(), this.kor(), this.s_1(), this.yna(), !0
    );
  }
  static Clear() {
    return (
      this.ComponentPriority.clear(),
      this.For.clear(),
      this.DMc.clear(),
      this.a_1.clear(),
      !0
    );
  }
  static CreateWorldEntity(e) {
    var n = e.EntityData;
    let o = -1n,
      t = void 0;
    switch (n.zHn) {
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        if (
          ((e.Priority = MONSTER_PRIORITY), this.GetMonsterComponentRecord(e))
        )
          break;
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
        if (
          ((e.Priority = ROLE_PRIORITY),
          e.ComponentDataMap.get("oI_")?.oI_?.fI_)
        ) {
          if (this.GetAutoRoleComponentRecord(e)) break;
          return;
        }
        if (this.GetRoleComponentRecord(e)) break;
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        if (((e.Priority = VISION_PRIORITY), this.GetVisionComponentRecord(e)))
          break;
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_Animal:
        if (((e.Priority = OTHER_PRIORITY), this.GetAnimalComponentRecord(e)))
          break;
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_Custom:
        if (((e.Priority = OTHER_PRIORITY), this.GetCustomComponentRecord(e)))
          break;
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity:
        if (((e.Priority = GLOBAL_PRIORITY), this.GetPlayerComponentRecord(e)))
          break;
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_SceneEntity:
        if (
          ((e.Priority = GLOBAL_PRIORITY),
          this.GetSceneEntityComponentRecord(e))
        )
          break;
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        switch (((e.Priority = NPC_PRIORITY), n.oys || 0)) {
          case 1:
            this.Hor &&
              ((t =
                ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(
                  this.Hor,
                )),
              (o = this.Hor));
            break;
          case 2:
            this.jor &&
              ((t =
                ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(
                  this.jor,
                )),
              (o = this.jor));
            break;
          case 3:
            this.w4l &&
              ((t =
                ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(
                  this.w4l,
                )),
              (o = this.w4l));
            break;
          case 4:
            this.Eo1 &&
              ((t =
                ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(
                  this.Eo1,
                )),
              (o = this.Eo1));
            break;
          default:
            this.Wor &&
              ((t =
                ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(
                  this.Wor,
                )),
              (o = this.Wor));
        }
        if (t) (e.ComponentsKey = o), this.Kor(e);
        else {
          if (!this.GetNpcComponentRecord(e)) return;
          o = e.ComponentsKey;
        }
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
        if (
          ((e.Priority = OTHER_PRIORITY), this.GetSceneItemComponentRecord(e))
        )
          break;
        return;
      case Protocol_1.Aki.Protocol.kks.HI_:
        if (
          ((e.Priority = VEHICLE_PRIORITY), this.GetVehicleComponentRecord(e))
        )
          break;
        return;
    }
    if (
      ((o = e.ComponentsKey),
      (t =
        t ||
        ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(o)))
    ) {
      if (
        !ControllerHolder_1.ControllerHolder.CharacterController.Respawn(
          t,
          t.Entity,
          e.Priority,
          e,
        )
      )
        return;
    } else
      t = ControllerHolder_1.ControllerHolder.CharacterController.CreateEntity(
        o,
        e,
      );
    return t;
  }
  static Destroy(e) {
    if (exports.USE_ENTITY_POOL) {
      var n = e.Entity.GetComponent(0);
      if (n.IsNpc())
        switch (n.GetSubEntityType()) {
          case 1:
            this.Hor = n.GetComponentKey();
            break;
          case 2:
            this.jor = n.GetComponentKey();
            break;
          case 3:
            this.w4l = n.GetComponentKey();
            break;
          case 4:
            this.Eo1 = n.GetComponentKey();
            break;
          default:
            this.Wor = n.GetComponentKey();
        }
      return ControllerHolder_1.ControllerHolder.CharacterController.DestroyToLru(
        e,
      )
        ? !0
        : !1;
    }
    return !!ControllerHolder_1.ControllerHolder.CharacterController.Destroy(e);
  }
  static GetMonsterComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterLogicStateSyncComponent_1.CharacterLogicStateSyncComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(CharacterBirthTagComponent_1.CharacterBirthTagComponent)
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent,
      )
    )
      return !1;
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent))
      return !1;
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent))
      return !1;
    if (
      !e.AddComponent(CharacterAttributeComponent_1.CharacterAttributeComponent)
    )
      return !1;
    if (
      CreateEntityData_1.CreateEntityData.IsFollowShooter(e) &&
      !e.AddComponent(CharacterSkillCdComponent_1.CharacterSkillCdComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterBuffComponent_1.CharacterBuffComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterGameplayCueComponent_1.CharacterGameplayCueComponent,
      )
    )
      return !1;
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      if (
        !e.AddComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent)
      )
        return !1;
      if (
        !e.AddComponent(
          CharacterStatisticsComponent_1.CharacterStatisticsComponent,
        )
      )
        return !1;
      if (
        !e.AddComponent(
          ActorDebugMovementComponent_1.ActorDebugMovementComponent,
        )
      )
        return !1;
    }
    if (
      !e.AddComponent(
        CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterFightStateComponent_1.CharacterFightStateComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent))
      return !1;
    if (!e.AddComponent(CharacterMontageComponent_1.CharacterMontageComponent))
      return !1;
    if (!e.AddComponent(CharacterDamageComponent_1.CharacterDamageComponent))
      return !1;
    if (!e.AddComponent(MonsterFrozenComponent_1.MonsterFrozenComponent))
      return !1;
    if (!e.AddComponent(CharacterShieldComponent_1.CharacterShieldComponent))
      return !1;
    if (!e.AddComponent(LevelTagComponent_1.LevelTagComponent)) return !1;
    if (!e.AddComponent(MonsterDeathComponent_1.MonsterDeathComponent))
      return !1;
    if (
      !e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterMovementSyncComponent_1.CharacterMovementSyncComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterRoleTransitionComponent_1.CharacterRoleTransitionComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterSkillComponent_1.CharacterSkillComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterCustomValueComponent_1.CharacterCustomValueComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterSkillTriggerComponent_1.CharacterSkillTriggerComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterSpecialSkillComponent_1.CharacterSpecialSkillComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent)) return !1;
    if (!e.AddComponent(CharacterFollowComponent_1.CharacterFollowComponent))
      return !1;
    if (!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent))
      return !1;
    if (
      !e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent)
    )
      return !1;
    if (!e.AddComponent(PawnPerceptionComponent_1.PawnPerceptionComponent))
      return !1;
    if (!e.AddComponent(MonsterBehaviorComponent_1.MonsterBehaviorComponent))
      return !1;
    if (!e.AddComponent(CharacterWeaponComponent_1.CharacterWeaponComponent))
      return !1;
    if (
      !e.AddComponent(
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(CharacterCaughtNewComponent_1.CharacterCaughtNewComponent)
    )
      return !1;
    if (
      !e.AddComponent(
        UeMovementTickManageComponent_1.UeMovementTickManageComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent)
    )
      return !1;
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (
        !e.AddComponent(
          UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        )
      )
        return !1;
      e.SetParam(
        UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        UE.TsCharacterDebugComponent_C.StaticClass(),
      );
    }
    if (!e.AddComponent(CharacterPartComponent_1.CharacterPartComponent))
      return !1;
    if (
      !e.AddComponent(CharacterPartScanComponent_1.CharacterPartScanComponent)
    )
      return !1;
    if (
      CreateEntityData_1.CreateEntityData.HasScanInfo(e) &&
      !e.AddComponent(ScanComponent_1.ScanComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterAudioComponent_1.CharacterAudioComponent))
      return !1;
    if (!e.AddComponent(CharacterSwimComponent_1.CharacterSwimComponent))
      return !1;
    var n = CreateEntityData_1.CreateEntityData.GetAnimalComponentConfig(e);
    if (n) {
      if (
        !e.AddComponent(
          AnimalStateMachineComponent_1.AnimalStateMachineComponent,
        )
      )
        return !1;
      if (!e.AddComponent(AnimalPerformComponent_1.AnimalPerformComponent))
        return !1;
      e.SetParam(AnimalPerformComponent_1.AnimalPerformComponent, n);
    }
    if (!e.AddComponent(PawnInteractNewComponent_1.PawnInteractNewComponent))
      return !1;
    do {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) break;
      var o =
        CreateEntityData_1.CreateEntityData.GetMonsterComponent(
          e,
        )?.FightConfigId;
      if (!o) break;
      o = MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(o);
      if (!o || 0 === o.ExecutionId.length) break;
      if (!e.AddComponent(ExecutionComponent_1.ExecutionComponent)) return !1;
    } while (0);
    if (
      CreateEntityData_1.CreateEntityData.IsRobot(e) &&
      !e.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent)
    )
      return !1;
    if (
      CreateEntityData_1.CreateEntityData.IsFollowShooter(e) &&
      !e.AddComponent(FollowShooterComponent_1.FollowShooterComponent)
    )
      return !1;
    if (!e.AddComponent(PawnInfoManageComponent_1.PawnInfoManageComponent))
      return !1;
    if (!e.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent))
      return !1;
    if (!e.AddComponent(MonsterFlowComponent_1.MonsterFlowComponent)) return !1;
    if (!e.AddComponent(CharacterPatrolComponent_1.CharacterPatrolComponent))
      return !1;
    if (!e.AddComponent(CharacterAttachComponent_1.CharacterAttachComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterCombatMessageComponent_1.CharacterCombatMessageComponent,
      )
    )
      return !1;
    if (
      4 ===
      CreateEntityData_1.CreateEntityData.GetBaseInfo(e)?.Category
        .MonsterMatchType
    ) {
      if (!e.AddComponent(CharacterGaitComponent_1.CharacterGaitComponent))
        return !1;
      if (!e.AddComponent(SubMeshComponent_1.SubMeshComponent)) return !1;
    }
    return (
      this.BMc(e, this.Ina),
      !!e.AddComponent(RolePreloadComponent_1.RolePreloadComponent)
    );
  }
  static GetRoleComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterLogicStateSyncComponent_1.CharacterLogicStateSyncComponent,
      )
    )
      return !1;
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent))
      return !1;
    if (!e.AddComponent(RoleDriveVehicleComponent_1.RoleDriveVehicleComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent))
      return !1;
    if (!e.AddComponent(RoleGrowComponent_1.RoleGrowComponent)) return !1;
    if (!e.AddComponent(RoleAttributeComponent_1.RoleAttributeComponent))
      return !1;
    if (!e.AddComponent(CharacterSkillCdComponent_1.CharacterSkillCdComponent))
      return !1;
    if (!e.AddComponent(RoleBuffComponent_1.RoleBuffComponent)) return !1;
    if (
      !e.AddComponent(
        CharacterGameplayCueComponent_1.CharacterGameplayCueComponent,
      )
    )
      return !1;
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      if (
        !e.AddComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent)
      )
        return !1;
      if (
        !e.AddComponent(
          CharacterStatisticsComponent_1.CharacterStatisticsComponent,
        )
      )
        return !1;
      if (
        !e.AddComponent(
          ActorDebugMovementComponent_1.ActorDebugMovementComponent,
        )
      )
        return !1;
    }
    if (
      !e.AddComponent(
        CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent))
      return !1;
    if (!e.AddComponent(CharacterMontageComponent_1.CharacterMontageComponent))
      return !1;
    if (!e.AddComponent(CharacterDamageComponent_1.CharacterDamageComponent))
      return !1;
    if (!e.AddComponent(RoleFrozenComponent_1.RoleFrozenComponent)) return !1;
    if (!e.AddComponent(CharacterShieldComponent_1.CharacterShieldComponent))
      return !1;
    if (!e.AddComponent(RoleTagComponent_1.RoleTagComponent)) return !1;
    if (!e.AddComponent(RoleElementComponent_1.RoleElementComponent)) return !1;
    if (!e.AddComponent(RoleInheritComponent_1.RoleInheritComponent)) return !1;
    if (!e.AddComponent(RoleTeamComponent_1.RoleTeamComponent)) return !1;
    if (!e.AddComponent(RoleStrengthComponent_1.RoleStrengthComponent))
      return !1;
    if (!e.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent))
      return !1;
    if (!e.AddComponent(CharacterSkillComponent_1.CharacterSkillComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterCustomValueComponent_1.CharacterCustomValueComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterSkillTriggerComponent_1.CharacterSkillTriggerComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterSpecialSkillComponent_1.CharacterSpecialSkillComponent,
      )
    )
      return !1;
    if (!e.AddComponent(RoleDeathComponent_1.RoleDeathComponent)) return !1;
    if (!e.AddComponent(RoleEnergyComponent_1.RoleEnergyComponent)) return !1;
    if (
      !e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent))
      return !1;
    if (
      !e.AddComponent(CharacterPendulumComponent_1.CharacterPendulumComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterThrowComponent_1.CharacterThrowComponent))
      return !1;
    if (
      !e.AddComponent(CharacterCaughtNewComponent_1.CharacterCaughtNewComponent)
    )
      return !1;
    if (!e.AddComponent(RoleGaitComponent_1.RoleGaitComponent)) return !1;
    if (!e.AddComponent(CharacterInputComponent_1.CharacterInputComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterSplineMoveComponent_1.CharacterSplineMoveComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterMovementSyncComponent_1.CharacterMovementSyncComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterWeaponComponent_1.CharacterWeaponComponent))
      return !1;
    if (
      !e.AddComponent(RoleSceneInteractComponent_1.RoleSceneInteractComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterLockOnComponent_1.CharacterLockOnComponent))
      return !1;
    if (!e.AddComponent(CharacterFollowComponent_1.CharacterFollowComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterManipulateComponent_1.CharacterManipulateComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterManipulateInteractComponent_1.CharacterManipulateInteractComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterLevelShootComponent_1.CharacterLevelShootComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterExploreComponent_1.CharacterExploreComponent))
      return !1;
    if (!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent))
      return !1;
    if (!e.AddComponent(RoleQteComponent_1.RoleQteComponent)) return !1;
    if (
      !e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterSwimComponent_1.CharacterSwimComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterWalkOnWaterComponent_1.CharacterWalkOnWaterComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterClimbComponent_1.CharacterClimbComponent))
      return !1;
    if (!e.AddComponent(CharacterGlideComponent_1.CharacterGlideComponent))
      return !1;
    if (!e.AddComponent(CharacterSlideComponent_1.CharacterSlideComponent))
      return !1;
    if (
      !e.AddComponent(CharacterCatapultComponent_1.CharacterCatapultComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterRollComponent_1.CharacterRollComponent))
      return !1;
    if (!e.AddComponent(CharacterKiteComponent_1.CharacterKiteComponent))
      return !1;
    if (!e.AddComponent(CharacterActionComponent_1.CharacterActionComponent))
      return !1;
    if (
      !e.AddComponent(
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        UeMovementTickManageComponent_1.UeMovementTickManageComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent)
    )
      return !1;
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (
        !e.AddComponent(
          UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        )
      )
        return !1;
      e.SetParam(
        UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        UE.TsCharacterDebugComponent_C.StaticClass(),
      );
    }
    if (!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent)) return !1;
    if (!e.AddComponent(RoleAudioComponent_1.RoleAudioComponent)) return !1;
    if (
      !e.AddComponent(RoleLocationSafetyComponent_1.RoleLocationSafetyComponent)
    )
      return !1;
    if (e.AddComponent(CharacterVisionComponent_1.CharacterVisionComponent))
      return (
        !!e.AddComponent(
          CharacterPhysicsAssetComponent_1.CharacterPhysicsAssetComponent,
        ) &&
        !!e.AddComponent(
          CharacterFootEffectComponent_1.CharacterFootEffectComponent,
        ) &&
        !!(
          e.AddComponent(
            CharacterSkinDamageComponent_1.CharacterSkinDamageComponent,
          ) &&
          e.AddComponent(RolePartyComponent_1.RolePartyComponent) &&
          e.AddComponent(CharacterMorphComponent_1.CharacterMorphComponent) &&
          e.AddComponent(
            CharacterCombatMessageComponent_1.CharacterCombatMessageComponent,
          ) &&
          e.AddComponent(RolePreloadComponent_1.RolePreloadComponent) &&
          e.AddComponent(SubMeshComponent_1.SubMeshComponent) &&
          e.AddComponent(RoleInhalationComponent_1.RoleInhalationComponent)
        ) &&
        (e.RegisterToGameBudgetController = !0)
      );
    return !1;
  }
  static GetAutoRoleComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterLogicStateSyncComponent_1.CharacterLogicStateSyncComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent))
      return !1;
    if (!e.AddComponent(RoleGrowComponent_1.RoleGrowComponent)) return !1;
    if (!e.AddComponent(RoleAttributeComponent_1.RoleAttributeComponent))
      return !1;
    if (!e.AddComponent(RoleBuffComponent_1.RoleBuffComponent)) return !1;
    if (
      !e.AddComponent(
        CharacterGameplayCueComponent_1.CharacterGameplayCueComponent,
      )
    )
      return !1;
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      if (
        !e.AddComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent)
      )
        return !1;
      if (
        !e.AddComponent(
          CharacterStatisticsComponent_1.CharacterStatisticsComponent,
        )
      )
        return !1;
      if (
        !e.AddComponent(
          ActorDebugMovementComponent_1.ActorDebugMovementComponent,
        )
      )
        return !1;
    }
    if (
      !e.AddComponent(
        CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterFightStateComponent_1.CharacterFightStateComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent))
      return !1;
    if (!e.AddComponent(CharacterMontageComponent_1.CharacterMontageComponent))
      return !1;
    if (!e.AddComponent(CharacterDamageComponent_1.CharacterDamageComponent))
      return !1;
    if (!e.AddComponent(MonsterFrozenComponent_1.MonsterFrozenComponent))
      return !1;
    if (!e.AddComponent(CharacterShieldComponent_1.CharacterShieldComponent))
      return !1;
    if (!e.AddComponent(RoleTagComponent_1.RoleTagComponent)) return !1;
    if (!e.AddComponent(RoleDeathComponent_1.RoleDeathComponent)) return !1;
    if (!e.AddComponent(CharacterSkillComponent_1.CharacterSkillComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterCustomValueComponent_1.CharacterCustomValueComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent,
      )
    )
      return !1;
    if (!e.AddComponent(BaseSkillCdComponent_1.BaseSkillCdComponent)) return !1;
    if (
      !e.AddComponent(
        CharacterSkillTriggerComponent_1.CharacterSkillTriggerComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterSpecialSkillComponent_1.CharacterSpecialSkillComponent,
      )
    )
      return !1;
    if (!e.AddComponent(RoleEnergyComponent_1.RoleEnergyComponent)) return !1;
    if (
      !e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent))
      return !1;
    if (
      !e.AddComponent(CharacterCaughtNewComponent_1.CharacterCaughtNewComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterGaitComponent_1.CharacterGaitComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterMovementSyncComponent_1.CharacterMovementSyncComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterWeaponComponent_1.CharacterWeaponComponent))
      return !1;
    if (!e.AddComponent(CharacterFollowComponent_1.CharacterFollowComponent))
      return !1;
    if (!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent))
      return !1;
    if (
      !e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterSwimComponent_1.CharacterSwimComponent))
      return !1;
    if (
      !e.AddComponent(
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        UeMovementTickManageComponent_1.UeMovementTickManageComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent)
    )
      return !1;
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (
        !e.AddComponent(
          UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        )
      )
        return !1;
      e.SetParam(
        UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        UE.TsCharacterDebugComponent_C.StaticClass(),
      );
    }
    return (
      !!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent) &&
      !!e.AddComponent(CharacterAudioComponent_1.CharacterAudioComponent) &&
      !!(
        e.AddComponent(CharacterVisionComponent_1.CharacterVisionComponent) &&
        e.AddComponent(
          CharacterCombatMessageComponent_1.CharacterCombatMessageComponent,
        ) &&
        e.AddComponent(RolePreloadComponent_1.RolePreloadComponent) &&
        e.AddComponent(SubMeshComponent_1.SubMeshComponent)
      ) &&
      (e.RegisterToGameBudgetController = !0)
    );
  }
  static GetSceneEntityComponentRecord(e) {
    return !!(
      e.AddComponent(CreatureDataComponent_1.CreatureDataComponent) &&
      e.AddComponent(CharacterActorComponent_1.CharacterActorComponent) &&
      e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent) &&
      e.AddComponent(
        CharacterAttributeComponent_1.CharacterAttributeComponent,
      ) &&
      e.AddComponent(CharacterBuffComponent_1.CharacterBuffComponent) &&
      e.AddDebugComponent(
        CharacterGasDebugComponent_1.CharacterGasDebugComponent,
      ) &&
      e.AddDebugComponent(
        CharacterStatisticsComponent_1.CharacterStatisticsComponent,
      ) &&
      e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent) &&
      e.AddComponent(CharacterDamageComponent_1.CharacterDamageComponent) &&
      e.AddComponent(LevelTagComponent_1.LevelTagComponent) &&
      e.AddComponent(
        CharacterRoleTransitionComponent_1.CharacterRoleTransitionComponent,
      ) &&
      e.AddComponent(
        CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent,
      ) &&
      e.AddComponent(CharacterFollowComponent_1.CharacterFollowComponent) &&
      e.AddComponent(CharacterHitComponent_1.CharacterHitComponent) &&
      e.AddComponent(
        CharacterTimeScaleComponent_1.CharacterTimeScaleComponent,
      ) &&
      e.AddComponent(MonsterFlowComponent_1.MonsterFlowComponent) &&
      e.AddComponent(
        CharacterCombatMessageComponent_1.CharacterCombatMessageComponent,
      ) &&
      e.AddComponent(RolePreloadComponent_1.RolePreloadComponent)
    );
  }
  static GetPlayerComponentRecord(e) {
    return !!(
      e.AddComponent(CreatureDataComponent_1.CreatureDataComponent) &&
      e.AddComponent(PlayerLifeCycleComponent_1.PlayerLifeCycleComponent) &&
      e.AddComponent(PlayerAttributeComponent_1.PlayerAttributeComponent) &&
      e.AddComponent(PlayerTagComponent_1.PlayerTagComponent) &&
      e.AddComponent(PlayerBuffComponent_1.PlayerBuffComponent) &&
      e.AddComponent(PlayerFollowerComponent_1.PlayerFollowerComponent) &&
      e.AddComponent(BaseSkillCdComponent_1.BaseSkillCdComponent) &&
      e.AddComponent(PlayerGameplayCueComponent_1.PlayerGameplayCueComponent) &&
      e.AddDebugComponent(
        CharacterGasDebugComponent_1.CharacterGasDebugComponent,
      )
    );
  }
  static GetVisionComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterLogicStateSyncComponent_1.CharacterLogicStateSyncComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(CharacterBirthTagComponent_1.CharacterBirthTagComponent)
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent,
      )
    )
      return !1;
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent))
      return !1;
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent))
      return !1;
    if (
      !e.AddComponent(CharacterAttributeComponent_1.CharacterAttributeComponent)
    )
      return !1;
    if (!e.AddComponent(VisionBuffComponent_1.VisionBuffComponent)) return !1;
    if (
      !e.AddComponent(
        CharacterGameplayCueComponent_1.CharacterGameplayCueComponent,
      )
    )
      return !1;
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      if (
        !e.AddComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent)
      )
        return !1;
      if (
        !e.AddComponent(
          ActorDebugMovementComponent_1.ActorDebugMovementComponent,
        )
      )
        return !1;
    }
    if (
      !e.AddComponent(
        CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent))
      return !1;
    if (!e.AddComponent(CharacterMontageComponent_1.CharacterMontageComponent))
      return !1;
    if (!e.AddComponent(CharacterDamageComponent_1.CharacterDamageComponent))
      return !1;
    if (!e.AddComponent(MonsterFrozenComponent_1.MonsterFrozenComponent))
      return !1;
    if (!e.AddComponent(CharacterShieldComponent_1.CharacterShieldComponent))
      return !1;
    if (!e.AddComponent(BaseTagComponent_1.BaseTagComponent)) return !1;
    if (!e.AddComponent(MonsterDeathComponent_1.MonsterDeathComponent))
      return !1;
    if (
      !e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent))
      return !1;
    if (!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent)) return !1;
    if (!e.AddComponent(CharacterPatrolComponent_1.CharacterPatrolComponent))
      return !1;
    if (
      !e.AddComponent(
        CharacterMovementSyncComponent_1.CharacterMovementSyncComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterRoleTransitionComponent_1.CharacterRoleTransitionComponent,
      )
    )
      return !1;
    if (!e.AddComponent(VisionSkillComponent_1.VisionSkillComponent)) return !1;
    if (
      !e.AddComponent(
        CharacterSkillTriggerComponent_1.CharacterSkillTriggerComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterLockOnComponent_1.CharacterLockOnComponent))
      return !1;
    if (!e.AddComponent(CharacterFollowComponent_1.CharacterFollowComponent))
      return !1;
    if (!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent))
      return !1;
    if (
      !e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent)
    )
      return !1;
    if (
      !e.AddComponent(
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        UeMovementTickManageComponent_1.UeMovementTickManageComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent)
    )
      return !1;
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (
        !e.AddComponent(
          UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        )
      )
        return !1;
      e.SetParam(
        UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        UE.TsCharacterDebugComponent_C.StaticClass(),
      );
    }
    return (
      !!(
        e.AddComponent(CharacterPartComponent_1.CharacterPartComponent) &&
        e.AddComponent(CharacterAudioComponent_1.CharacterAudioComponent) &&
        e.AddComponent(
          CharacterCombatMessageComponent_1.CharacterCombatMessageComponent,
        ) &&
        e.AddComponent(RolePreloadComponent_1.RolePreloadComponent)
      ) && (e.RegisterToGameBudgetController = !0)
    );
  }
  static GetAnimalComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent))
      return !1;
    if (
      Info_1.Info.IsBuildDevelopmentOrDebug &&
      !e.AddComponent(ActorDebugMovementComponent_1.ActorDebugMovementComponent)
    )
      return !1;
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent))
      return !1;
    if (!e.AddComponent(CharacterMontageComponent_1.CharacterMontageComponent))
      return !1;
    if (!e.AddComponent(BaseTagComponent_1.BaseTagComponent)) return !1;
    if (!e.AddComponent(BaseUnifiedStateComponent_1.BaseUnifiedStateComponent))
      return !1;
    if (
      !e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)
    )
      return !1;
    if (
      !e.AddComponent(AnimalStateMachineComponent_1.AnimalStateMachineComponent)
    )
      return !1;
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent))
      return !1;
    if (!e.AddComponent(CharacterAudioComponent_1.CharacterAudioComponent))
      return !1;
    if (!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent)) return !1;
    if (!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent))
      return !1;
    if (!e.AddComponent(AnimalDeathSyncComponent_1.AnimalDeathSyncComponent))
      return !1;
    if (!e.AddComponent(PawnPerceptionComponent_1.PawnPerceptionComponent))
      return !1;
    var n = e.PbEntityInitData;
    if (
      n &&
      !e.AddComponent(PawnInteractNewComponent_1.PawnInteractNewComponent)
    )
      return !1;
    if (!e.AddComponent(PawnInfoManageComponent_1.PawnInfoManageComponent))
      return !1;
    if (!e.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent))
      return !1;
    if (n) {
      n = (0, IComponent_1.getComponent)(n.ComponentsData, "AnimalComponent");
      if (n) {
        if (!e.AddComponent(AnimalPerformComponent_1.AnimalPerformComponent))
          return !1;
        e.SetParam(AnimalPerformComponent_1.AnimalPerformComponent, n);
      }
    }
    if (!e.AddComponent(CharacterPlanComponent_1.CharacterPlanComponent))
      return !1;
    if (
      !e.AddComponent(
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(
        UeMovementTickManageComponent_1.UeMovementTickManageComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent)
    )
      return !1;
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (
        !e.AddComponent(
          UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        )
      )
        return !1;
      e.SetParam(
        UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        UE.TsCharacterDebugComponent_C.StaticClass(),
      );
    }
    return !(
      CreateEntityData_1.CreateEntityData.HasScanInfo(e) &&
      !e.AddComponent(ScanComponent_1.ScanComponent)
    );
  }
  static GetCustomComponentRecord(e) {
    var n = e.PbEntityInitData?.ComponentsData;
    if (!n) return !1;
    var o = e.GetPbModelConfig(),
      o = IEntity_1.componentsByEntityAki[o.EntityType];
    if (!o) return !1;
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent))
      return !1;
    if (!e.AddComponent(LevelTagComponent_1.LevelTagComponent)) return !1;
    for (const C of o)
      switch (C) {
        case "RangeComponent":
          var t = (0, IComponent_1.getComponent)(n, "RangeComponent");
          if (!t) return !1;
          if (!e.AddComponent(RangeComponent_1.RangeComponent)) return !1;
          e.SetParam(RangeComponent_1.RangeComponent, t);
          break;
        case "TriggerComponent":
          t = (0, IComponent_1.getComponent)(n, "TriggerComponent");
          if (!t) return !1;
          if (!e.AddComponent(TriggerComponent_1.TriggerComponent)) return !1;
          if (
            t.ClientPrePerformance &&
            !e.AddComponent(ClientTriggerComponent_1.ClientTriggerComponent)
          )
            return !1;
          e.SetParam(TriggerComponent_1.TriggerComponent, t);
          break;
        case "LocationSafetyComponent":
          var r = (0, IComponent_1.getComponent)(n, "LocationSafetyComponent");
          if (!r) return !1;
          if (
            !e.AddComponent(SafetyLocationComponent_1.SafetyLocationComponent)
          )
            return !1;
          e.SetParam(SafetyLocationComponent_1.SafetyLocationComponent, r);
          break;
        case "ClientTriggerComponent":
          r = (0, IComponent_1.getComponent)(n, "ClientTriggerComponent");
          if (!r) return !1;
          if (!e.AddComponent(ClientTriggerComponent_1.ClientTriggerComponent))
            return !1;
          e.SetParam(ClientTriggerComponent_1.ClientTriggerComponent, r);
          break;
        case "LevelQteComponent":
          var m = (0, IComponent_1.getComponent)(n, "LevelQteComponent");
          if (!m) return !1;
          if (!e.AddComponent(LevelQteComponent_1.LevelQteComponent)) return !1;
          e.SetParam(LevelQteComponent_1.LevelQteComponent, m);
          break;
        case "EntityCustomAudioComponent":
          m = (0, IComponent_1.getComponent)(n, "EntityCustomAudioComponent");
          if (!m) return !1;
          if (
            !e.AddComponent(
              CustomAudioControlComponent_1.CustomAudioControlComponent,
            )
          )
            return !1;
          e.SetParam(
            CustomAudioControlComponent_1.CustomAudioControlComponent,
            m,
          );
      }
    return (e.RegisterToGameBudgetController = !0);
  }
  static GetNpcComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    var n = e.GetPbModelConfig();
    if (n) {
      n = n.EntityType;
      if (IEntity_1.componentsByEntityAki[n]) {
        n = e.PbEntityInitData;
        if (n)
          if (n.ComponentsData) {
            var n = e.EntityData,
              n = n.oys || 0,
              o = this.For.get(n);
            if (!o)
              return (
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    3,
                    "初始化NpcEntity类型" + n + "失败，没有对应的组件预设配置",
                    ["CreatureDataId", e.CreatureDataId],
                    ["PbDataId", e.PbDataId],
                  ),
                !1
              );
            for (const t of o)
              if (!e.HasComponent(t) && !e.AddComponent(t)) return !1;
            if (GlobalData_1.GlobalData.IsPlayInEditor) {
              if (
                !e.AddComponent(
                  UeComponentTickManageComponent_1.UeComponentTickManageComponent,
                )
              )
                return !1;
              e.SetParam(
                UeComponentTickManageComponent_1.UeComponentTickManageComponent,
                UE.TsCharacterDebugComponent_C.StaticClass(),
              );
            }
          }
      }
    }
    return !0;
  }
  static GetSceneItemComponentRecord(n) {
    var o = n.PbEntityInitData;
    if (
      ((n.EnableMovement = !1),
      !n.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
    )
      return !1;
    if (!n.AddComponent(SceneItemActorComponent_1.SceneItemActorComponent))
      return !1;
    if (!n.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent))
      return !1;
    if (!n.AddComponent(PawnInfoManageComponent_1.PawnInfoManageComponent))
      return !1;
    if (!n.AddComponent(LevelTagComponent_1.LevelTagComponent)) return !1;
    if (!n.AddComponent(SceneItemStateComponent_1.SceneItemStateComponent))
      return !1;
    if (
      !n.AddComponent(SceneItemPropertyComponent_1.SceneItemPropertyComponent)
    )
      return !1;
    if (!n.AddComponent(PerformanceComponent_1.PerformanceComponent)) return !1;
    if (
      !n.AddComponent(SceneItemTimeScaleComponent_1.SceneItemTimeScaleComponent)
    )
      return !1;
    if (
      GlobalData_1.GlobalData.IsPlayInEditor &&
      !n.AddComponent(SceneItemDebugComponent_1.SceneItemDebugComponent)
    )
      return !1;
    if (!this.BMc(n, this.DMc, this.a_1)) return !1;
    if (o?.ComponentsData) {
      var t = (0, IComponent_1.getComponent)(
        o.ComponentsData,
        "InteractComponent",
      );
      if (
        t &&
        !n.AddComponent(PawnInteractNewComponent_1.PawnInteractNewComponent)
      )
        return !1;
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Interaction",
          36,
          "SceneItemEntity.AddInteractComponents 旧版交互已经废除",
        );
    if (!n.AddComponent(PawnPerceptionComponent_1.PawnPerceptionComponent))
      return !1;
    if (!n.AddComponent(InteractItemComponent_1.InteractItemComponent))
      return !1;
    t = CreateEntityData_1.CreateEntityData.GetBaseInfo(n);
    if (
      t?.IsShowNameOnHead &&
      !n.HasComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent) &&
      !n.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent)
    )
      return !1;
    t = t?.Category?.FishingMechanismType;
    if (
      ("FishingPoint" === t || "DynamicFishingPoint" === t) &&
      !n.AddComponent(
        SceneItemFishingPointComponent_1.SceneItemFishingPointComponent,
      )
    )
      return !1;
    if (
      CreateEntityData_1.CreateEntityData.HasScanInfo(n) &&
      !n.AddComponent(ScanComponent_1.ScanComponent)
    )
      return !1;
    if (o) {
      let e = !1;
      t = (0, IComponent_1.getComponent)(o.ComponentsData, "WeaponComponent");
      if (
        t?.WeaponId &&
        ((e = !0),
        !n.AddComponent(AiWeaponMovementComponent_1.AiWeaponMovementComponent))
      )
        return !1;
      if (e) {
        if (
          !n.AddComponent(
            SceneItemAiInteractionComponent_1.SceneItemAiInteractionComponent,
          )
        )
          return !1;
        n.EnableMovement = !0;
      }
    }
    if (o) {
      t = (0, IComponent_1.getComponent)(
        o.ComponentsData,
        "AiGearStrategyComponent",
      );
      if (
        t?.StrategyType.Type === IComponent_1.EAiGearStrategy.RaceStrategy &&
        !n.AddComponent(
          SceneItemAiRacingMoveComponent_1.SceneItemAiRacingMoveComponent,
        )
      )
        return !1;
    }
    return !(
      (n.ComponentDataMap.get("Mys") &&
        !n.AddComponent(
          SceneItemDropItemComponent_1.SceneItemDropItemComponent,
        )) ||
      (n.EnableMovement &&
        !n.AddComponent(
          SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
        ))
    );
  }
  static GetVehicleComponentRecord(e) {
    var n = e.PbEntityInitData;
    if (!n) return !1;
    n = (0, IComponent_1.getComponent)(n.ComponentsData, "BaseInfoComponent");
    if (!n) return !1;
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    if (!e.AddComponent(VehicleActorComponent_1.VehicleActorComponent))
      return !1;
    if (!e.AddComponent(VehicleAnimationComponent_1.VehicleAnimationComponent))
      return !1;
    if (!e.AddComponent(VehicleAbilityComponent_1.VehicleAbilityComponent))
      return !1;
    switch (n.Category.VehicleType) {
      case "Gongduola":
      case "AutoMoveGongduola":
        if (
          e.AddComponent(
            GongduolaSplineMoveComponent_1.GongduolaSplineMoveComponent,
          ) &&
          e.AddComponent(GongduolaInputComponent_1.GongduolaInputComponent) &&
          e.AddComponent(
            GongduolaPerformComponent_1.GongduolaPerformComponent,
          ) &&
          e.AddComponent(GongduolaAudioComponent_1.GongduolaAudioComponent)
        )
          break;
        return !1;
      case "FishingBoat":
        if (
          e.AddComponent(
            GongduolaSplineMoveComponent_1.GongduolaSplineMoveComponent,
          ) &&
          e.AddComponent(
            FishingBoatPerformComponent_1.FishingBoatPerformComponent,
          ) &&
          e.AddComponent(
            FishingBoatInputComponent_1.FishingBoatInputComponent,
          ) &&
          e.AddComponent(GongduolaAudioComponent_1.GongduolaAudioComponent) &&
          e.AddComponent(
            CharacterAttributeComponent_1.CharacterAttributeComponent,
          ) &&
          e.AddComponent(
            CharacterSkillCdComponent_1.CharacterSkillCdComponent,
          ) &&
          e.AddComponent(CharacterBuffComponent_1.CharacterBuffComponent) &&
          e.AddComponent(
            CharacterGameplayCueComponent_1.CharacterGameplayCueComponent,
          ) &&
          e.AddComponent(VehicleSkillComponent_1.VehicleSkillComponent) &&
          e.AddComponent(
            CharacterTriggerComponent_1.CharacterTriggerComponent,
          ) &&
          e.AddComponent(
            CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent,
          ) &&
          e.AddComponent(
            CharacterSkillTriggerComponent_1.CharacterSkillTriggerComponent,
          ) &&
          e.AddComponent(
            CharacterTimeScaleComponent_1.CharacterTimeScaleComponent,
          ) &&
          e.AddComponent(VehicleHitComponent_1.VehicleHitComponent) &&
          e.AddComponent(BaseDamageComponent_1.BaseDamageComponent) &&
          e.AddComponent(VehicleMontageComponent_1.VehicleMontageComponent) &&
          e.AddComponent(
            FishingBoatDeathComponent_1.FishingBoatDeathComponent,
          ) &&
          (!Info_1.Info.IsBuildDevelopmentOrDebug ||
            e.AddComponent(
              CharacterGasDebugComponent_1.CharacterGasDebugComponent,
            )) &&
          e.AddComponent(RolePreloadComponent_1.RolePreloadComponent)
        )
          break;
        return !1;
      case "NpcVehicle":
        return !1;
      default:
        if (
          !e.AddComponent(
            VehicleSplineMoveComponent_1.VehicleSplineMoveComponent,
          )
        )
          return !1;
        if (!e.AddComponent(VehicleInputComponent_1.VehicleInputComponent))
          return !1;
        if (!e.AddComponent(VehiclePerformComponent_1.VehiclePerformComponent))
          return !1;
        if (!e.AddComponent(VehicleAudioComponent_1.VehicleAudioComponent))
          return !1;
    }
    if (e.AddComponent(VehicleMoveComponent_1.VehicleMoveComponent))
      return (
        !!e.AddComponent(
          VehicleMovementSyncComponent_1.VehicleMovementSyncComponent,
        ) &&
        !!e.AddComponent(
          CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent,
        ) &&
        !(
          (Info_1.Info.IsBuildDevelopmentOrDebug &&
            !e.AddComponent(
              ActorDebugMovementComponent_1.ActorDebugMovementComponent,
            )) ||
          !e.AddComponent(
            PawnInteractNewComponent_1.PawnInteractNewComponent,
          ) ||
          !e.AddComponent(PawnPerceptionComponent_1.PawnPerceptionComponent) ||
          !e.AddComponent(
            PawnSensoryInfoComponent_1.PawnSensoryInfoComponent,
          ) ||
          !e.AddComponent(VehicleTagComponent_1.VehicleTagComponent) ||
          !e.AddComponent(
            UeActorTickManageComponent_1.UeActorTickManageComponent,
          ) ||
          !e.AddComponent(
            UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
          ) ||
          !e.AddComponent(
            UeVehicleMovementTickManageComponent_1.UeVehicleMovementTickManageComponent,
          ) ||
          (this.BMc(e, this.kMc), 0)
        )
      );
    return !1;
  }
  static BMc(n, e, o) {
    var t = n.PbEntityInitData,
      r = t?.ComponentsData;
    if (t && r) {
      t = n.GetPbModelConfig();
      if (t) {
        (t = t.EntityType), (t = IEntity_1.componentsByEntityAki[t]);
        if (t)
          for (const c of t) {
            var m = r[c];
            if (!m)
              return (
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    31,
                    "初始化MonsterEntity找不到对应的prefab配置",
                    ["creatureDataId", n.CreatureDataId],
                    ["pbDataId", n.PbDataId],
                    ["componentType", c],
                  ),
                !1
              );
            if (!m.Disabled) {
              var C = e.get(c);
              if (C) {
                var a = o?.get(c);
                if (a && a.length !== C.length)
                  return (
                    Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Entity",
                        79,
                        "组件和条件配置数量不一致",
                        ["ctorArrayLength", C.length],
                        ["conditionFuncArrayLength", a.length],
                        ["componentType", c],
                      ),
                    !1
                  );
                for (let e = 0; e < C.length; e++) {
                  var i = C[e];
                  if (!n.HasComponent(i)) {
                    if (void 0 !== a) {
                      var p = a[e];
                      if (void 0 !== p && !p(n)) continue;
                    }
                    if (!n.AddComponent(i)) return !1;
                    n.SetParam(i, m);
                  }
                }
              }
            }
          }
      }
    }
    return !0;
  }
  static Kor(e) {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      e.SetParam(
        UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        UE.TsCharacterDebugComponent_C.StaticClass(),
      );
  }
  static Nor() {
    this.ComponentPriority.set(
      CharacterActorComponent_1.CharacterActorComponent,
      CharacterComponentPriorityDefine_1.ACTOR_TICK_PRIORITY,
    ),
      this.ComponentPriority.set(
        SimpleNpcActorComponent_1.SimpleNpcActorComponent,
        CharacterComponentPriorityDefine_1.ACTOR_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        NpcMoveComponent_1.NpcMoveComponent,
        CharacterComponentPriorityDefine_1.MOVE_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        CharacterMovementSyncComponent_1.CharacterMovementSyncComponent,
        CharacterComponentPriorityDefine_1.MOVEMENT_SYNC_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        UeActorTickManageComponent_1.UeActorTickManageComponent,
        CharacterComponentPriorityDefine_1.UE_ACTOR_TICK_PRIOTITY,
      ),
      this.ComponentPriority.set(
        UeMovementTickManageComponent_1.UeMovementTickManageComponent,
        CharacterComponentPriorityDefine_1.UE_MOVE_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
        CharacterComponentPriorityDefine_1.UE_SKELETAL_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        CharacterMoveComponent_1.CharacterMoveComponent,
        CharacterComponentPriorityDefine_1.MOVE_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        RoleGaitComponent_1.RoleGaitComponent,
        CharacterComponentPriorityDefine_1.GAIT_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        CharacterInputComponent_1.CharacterInputComponent,
        CharacterComponentPriorityDefine_1.INPUT_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        CharacterSplineMoveComponent_1.CharacterSplineMoveComponent,
        CharacterComponentPriorityDefine_1.SPLINE_MOVE_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        CharacterClimbComponent_1.CharacterClimbComponent,
        CharacterComponentPriorityDefine_1.CLIMB_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        CharacterSlideComponent_1.CharacterSlideComponent,
        CharacterComponentPriorityDefine_1.SLIDE_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        CharacterComponentPriorityDefine_1.UE_OTHER_COMPONENT_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        UeVehicleMovementTickManageComponent_1.UeVehicleMovementTickManageComponent,
        CharacterComponentPriorityDefine_1.UE_MOVE_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        VehicleActorComponent_1.VehicleActorComponent,
        CharacterComponentPriorityDefine_1.ACTOR_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        VehicleSplineMoveComponent_1.VehicleSplineMoveComponent,
        CharacterComponentPriorityDefine_1.SPLINE_MOVE_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        VehicleInputComponent_1.VehicleInputComponent,
        CharacterComponentPriorityDefine_1.VEHICLE_INPUT_PRIORITY,
      ),
      this.ComponentPriority.set(
        VehicleMoveComponent_1.VehicleMoveComponent,
        CharacterComponentPriorityDefine_1.MOVE_TICK_PRIORITY,
      ),
      this.ComponentPriority.set(
        GongduolaSplineMoveComponent_1.GongduolaSplineMoveComponent,
        CharacterComponentPriorityDefine_1.SPLINE_MOVE_TICK_PRIORITY,
      );
  }
  static Oor() {
    this.For.set(3, [
      CharacterActorComponent_1.CharacterActorComponent,
      PawnSensoryInfoComponent_1.PawnSensoryInfoComponent,
      BaseUnifiedStateComponent_1.BaseUnifiedStateComponent,
      NpcMoveComponent_1.NpcMoveComponent,
      CharacterPatrolComponent_1.CharacterPatrolComponent,
      CharacterAnimationComponent_1.CharacterAnimationComponent,
      CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent,
      VehicleTagComponent_1.VehicleTagComponent,
      PawnSensoryComponent_1.PawnSensoryComponent,
      VehicleInputComponent_1.VehicleInputComponent,
      CommonNpcPerformComponent_1.CommonNpcPerformComponent,
      NpcVehiclePerformComponent_1.NpcVehiclePerformComponent,
      PawnInteractNewComponent_1.PawnInteractNewComponent,
      PawnPerceptionComponent_1.PawnPerceptionComponent,
      PawnInfoManageComponent_1.PawnInfoManageComponent,
      PawnHeadInfoComponent_1.PawnHeadInfoComponent,
      CharacterAiComponent_1.CharacterAiComponent,
      CharacterPlanComponent_1.CharacterPlanComponent,
      NpcFlowComponent_1.NpcFlowComponent,
      UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
      UeMovementTickManageComponent_1.UeMovementTickManageComponent,
      UeActorTickManageComponent_1.UeActorTickManageComponent,
      CharacterAudioComponent_1.CharacterAudioComponent,
      ScanComponent_1.ScanComponent,
    ]),
      this.For.set(0, [
        CharacterActorComponent_1.CharacterActorComponent,
        PawnSensoryInfoComponent_1.PawnSensoryInfoComponent,
        BaseUnifiedStateComponent_1.BaseUnifiedStateComponent,
        NpcMoveComponent_1.NpcMoveComponent,
        CharacterPatrolComponent_1.CharacterPatrolComponent,
        CharacterAnimationComponent_1.CharacterAnimationComponent,
        CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent,
        LevelTagComponent_1.LevelTagComponent,
        PawnSensoryComponent_1.PawnSensoryComponent,
        CommonNpcPerformComponent_1.CommonNpcPerformComponent,
        PawnInteractNewComponent_1.PawnInteractNewComponent,
        PawnPerceptionComponent_1.PawnPerceptionComponent,
        PawnInfoManageComponent_1.PawnInfoManageComponent,
        PawnHeadInfoComponent_1.PawnHeadInfoComponent,
        CharacterAiComponent_1.CharacterAiComponent,
        CharacterPlanComponent_1.CharacterPlanComponent,
        NpcFlowComponent_1.NpcFlowComponent,
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
        UeMovementTickManageComponent_1.UeMovementTickManageComponent,
        UeActorTickManageComponent_1.UeActorTickManageComponent,
        CharacterAudioComponent_1.CharacterAudioComponent,
        ScanComponent_1.ScanComponent,
        NpcDriveVehicleComponent_1.NpcDriveVehicleComponent,
      ]),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        this.For.get(0)?.push(
          ActorDebugMovementComponent_1.ActorDebugMovementComponent,
        ),
      this.For.set(1, [
        SimpleNpcActorComponent_1.SimpleNpcActorComponent,
        SimpleNpcAnimationComponent_1.SimpleNpcAnimationComponent,
        PawnSensoryInfoComponent_1.PawnSensoryInfoComponent,
        CommonNpcPerformComponent_1.CommonNpcPerformComponent,
        PawnPerceptionComponent_1.PawnPerceptionComponent,
        PawnInfoManageComponent_1.PawnInfoManageComponent,
        PawnHeadInfoComponent_1.PawnHeadInfoComponent,
        NpcFlowComponent_1.NpcFlowComponent,
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
        UeActorTickManageComponent_1.UeActorTickManageComponent,
        ScanComponent_1.ScanComponent,
      ]),
      this.For.set(2, [
        CharacterActorComponent_1.CharacterActorComponent,
        BaseUnifiedStateComponent_1.BaseUnifiedStateComponent,
        NpcMoveComponent_1.NpcMoveComponent,
        NpcPerformComponent_1.NpcPerformComponent,
        CharacterAnimationComponent_1.CharacterAnimationComponent,
        NpcPasserbyComponent_1.NpcPasserbyComponent,
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
        UeMovementTickManageComponent_1.UeMovementTickManageComponent,
        UeActorTickManageComponent_1.UeActorTickManageComponent,
      ]),
      this.For.set(4, [
        CharacterActorComponent_1.CharacterActorComponent,
        CharacterAnimationComponent_1.CharacterAnimationComponent,
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
        UeActorTickManageComponent_1.UeActorTickManageComponent,
        DangoPerformComponent_1.DangoPerformComponent,
      ]);
  }
  static UMc() {
    this.kMc.set("NearbyTrackingComponent", [
      SceneItemNearbyTrackingComponent_1.SceneItemNearbyTrackingComponent,
    ]);
  }
  static s_1() {
    this.a_1.set("TriggerComponent", [
      void 0,
      (e) => {
        var n = e.PbEntityInitData?.ComponentsData;
        return (
          !!n &&
          !(
            !(n = (0, IComponent_1.getComponent)(n, "TriggerComponent")) ||
            (!n.ClientPrePerformance &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Entity",
                  79,
                  "TriggerComponent配置ClientPrePerformance为false时不添加ClientTriggerComponent",
                  ["creatureDataId", e.CreatureDataId],
                  ["pbDataId", e.PbDataId],
                ),
              1))
          )
        );
      },
    ]);
  }
  static kor() {
    this.DMc.set("TreasureBoxComponent", [
      GamePlayTreasureBoxComponent_1.SceneItemTreasureBoxComponent,
    ]),
      this.DMc.set("TeleControl2", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemManipulatableComponent_1.SceneItemManipulatableComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
        SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent,
      ]),
      this.DMc.set("ItemFoundation2", [
        SceneItemOutletComponent_1.SceneItemOutletComponent,
      ]),
      this.DMc.set("DestructibleItem", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        DurablityComponent_1.DurabilityComponent,
        SceneItemDamageComponent_1.SceneItemDamageComponent,
      ]),
      this.DMc.set("AdsorbComponent", [
        PawnAdsorbComponent_1.PawnAdsorbComponent,
      ]),
      this.DMc.set("RangeComponent", [RangeComponent_1.RangeComponent]),
      this.DMc.set("TriggerComponent", [
        TriggerComponent_1.TriggerComponent,
        ClientTriggerComponent_1.ClientTriggerComponent,
      ]),
      this.DMc.set("TrampleComponent", [
        SceneItemGravityComponent_1.SceneItemGravityComponent,
      ]),
      this.DMc.set("TargetGearComponent", [
        SceneItemMoveComponent_1.SceneItemMoveComponent,
        SceneItemHitComponent_1.SceneItemHitComponent,
        GamePlayHitGearComponent_1.GamePlayHitGearComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
      ]),
      this.DMc.set("LiftComponent", [
        GamePlayElevatorComponent_1.GamePlayElevatorComponent,
      ]),
      this.DMc.set("ConveyorBeltComponent", [
        SceneItemConveyorBeltComponent_1.SceneItemConveyorBeltComponent,
      ]),
      this.DMc.set("FollowTrackComponent", [
        SceneItemMoveComponent_1.SceneItemMoveComponent,
        SceneItemTrackGuideComponent_1.SceneItemTrackGuideComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
      ]),
      this.DMc.set("NearbyTrackingComponent", [
        SceneItemNearbyTrackingComponent_1.SceneItemNearbyTrackingComponent,
      ]),
      this.DMc.set("SkyboxComponent", [
        PostProcessBridgeComponent_1.PostProcessBridgeComponent,
      ]),
      this.DMc.set("DungeonEntryComponent", [
        DungeonEntranceComponent_1.DungeonEntranceComponent,
      ]),
      this.DMc.set("BuffProducerComponent", [
        SceneItemBuffProducerComponent_1.SceneItemBuffProducerComponent,
      ]),
      this.DMc.set("BuffConsumerComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemBuffConsumerComponent_1.SceneItemBuffConsumerComponent,
      ]),
      this.DMc.set("ResetEntitiesPosComponent", [
        SceneItemResetPositionComponent_1.SceneItemResetPositionComponent,
      ]),
      this.DMc.set("RotatorComponent2", [
        SceneItemRotatorComponent_1.SceneItemRotatorComponent,
      ]),
      this.DMc.set("VisionItemComponent", [
        SceneItemCaptureComponent_1.SceneItemCaptureComponent,
      ]),
      this.DMc.set("GuideLineCreatorComponent", [
        SceneItemGuidePathComponent_1.SceneItemGuidePathComponent,
      ]),
      this.DMc.set("SceneItemMovementComponent", [
        SceneItemMoveComponent_1.SceneItemMoveComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
      ]),
      this.DMc.set("AdviseItemComponent", [
        SceneItemAdviceComponent_1.SceneItemAdviceComponent,
      ]),
      this.DMc.set("EntityStateAudioComponent", [
        SceneItemStateAudioComponent_1.SceneItemStateAudioComponent,
      ]),
      this.DMc.set("InteractAudioComponent", [
        SceneItemInteractAudioComponent_1.SceneItemInteractAudioComponent,
      ]),
      this.DMc.set("EntityCustomAudioComponent", [
        CustomAudioControlComponent_1.CustomAudioControlComponent,
      ]),
      this.DMc.set("TimelineTrackControlComponent", [
        SceneItemTimeTrackControlComponent_1.SceneItemTimeTrackControlComponent,
      ]),
      this.DMc.set("SceneActorRefComponent", [
        SceneItemReferenceComponent_1.SceneItemReferenceComponent,
      ]),
      this.DMc.set("LevelSequenceFrameEventComponent", [
        LevelSequenceFrameEventComponent_1.LevelSequenceFrameEventComponent,
      ]),
      this.DMc.set("AttachTargetComponent", [
        SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent,
        SceneItemAttachTargetComponent_1.SceneItemAttachTargetComponent,
      ]),
      this.DMc.set("ReboundComponent", [
        SceneItemReboundComponent_1.SceneItemReboundComponent,
      ]),
      this.DMc.set("TurntableControlComponent", [
        SceneItemTurntableControllerComponent_1.SceneItemTurntableControllerComponent,
      ]),
      this.DMc.set("JigsawFoundation", [
        SceneItemJigsawBaseComponent_1.SceneItemJigsawBaseComponent,
        SceneItemMultiInteractionActorComponent_1.SceneItemMultiInteractionActorComponent,
      ]),
      this.DMc.set("JigsawItem", [
        SceneItemJigsawItemComponent_1.SceneItemJigsawItemComponent,
        SceneItemMultiInteractionActorComponent_1.SceneItemMultiInteractionActorComponent,
      ]),
      this.DMc.set("SceneBulletComponent", [
        SceneBulletComponent_1.SceneBulletComponent,
      ]),
      this.DMc.set("LevitateMagnetComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemMoveComponent_1.SceneItemMoveComponent,
        SceneItemLevitateMagnetComponent_1.SceneItemLevitateMagnetComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
      ]),
      this.DMc.set("AiAlertNotifyComponent", [
        SmartObjectComponent_1.SmartObjectComponent,
      ]),
      this.DMc.set("MonsterGachaItemComponent", [
        SceneItemMonsterGachaItemComponent_1.SceneItemMonsterGachaItemComponent,
      ]),
      this.DMc.set("ProgressBarControlComponent", [
        SceneItemProgressControlComponent_1.SceneItemProgressControlComponent,
      ]),
      this.DMc.set("ExploreSkillInteractComponent", [
        SceneItemExploreInteractComponent_1.SceneItemExploreInteractComponent,
      ]),
      this.DMc.set("HookLockPoint", [
        GrapplingHookPointComponent_1.GrapplingHookPointComponent,
        SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent,
      ]),
      this.DMc.set("FanComponent", [
        SceneItemFanComponent_1.SceneItemFanComponent,
        SceneItemHitComponent_1.SceneItemHitComponent,
        PawnInteractNewComponent_1.PawnInteractNewComponent,
        RangeComponent_1.RangeComponent,
      ]),
      this.DMc.set("PickInteractComponent", [
        SceneItemPickInteractComponent_1.SceneItemPickInteractComponent,
      ]),
      this.DMc.set("AiGearStrategyComponent", [
        AiGearStrategyComponent_1.AiGearStrategyComponent,
      ]),
      this.DMc.set("ChessmanComponent", [
        SceneItemChessmanComponent_1.SceneItemChessmanComponent,
      ]),
      this.DMc.set("ResetSelfPosComponent", [
        SceneItemResetSelfPositionComponent_1.SceneItemResetSelfPositionComponent,
      ]),
      this.DMc.set("TimeStopComponent", [
        SceneItemTimeStopMachineComponent_1.SceneItemTimeStopMachineComponent,
      ]),
      this.DMc.set("BeamCastComponent", [
        SceneItemBeamCastComponent_1.SceneItemBeamCastComponent,
        RangeComponent_1.RangeComponent,
      ]),
      this.DMc.set("BeamReceiveComponent", [
        SceneItemBeamReceiveComponent_1.SceneItemBeamReceiveComponent,
      ]),
      this.DMc.set("PortalComponent", [
        SceneItemPortalComponent_1.SceneItemPortalComponent,
      ]),
      this.DMc.set("NoRenderPortalComponent", [
        SceneItemNoRenderPortalComponent_1.SceneItemNoRenderPortalComponent,
      ]),
      this.DMc.set("BubbleComponent", [
        CharacterFlowComponent_1.CharacterFlowComponent,
        PawnHeadInfoComponent_1.PawnHeadInfoComponent,
      ]),
      this.DMc.set("PasserbyNpcSpawnComponent", [
        PasserbyGeneratorComponent_1.PasserbyGeneratorComponent,
      ]),
      this.DMc.set("EffectAreaComponent", [
        EffectAreaComponent_1.EffectAreaComponent,
      ]),
      this.DMc.set("PhysicsConstraintComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemPhysicalAttachComponent_1.SceneItemPhysicalAttachComponent,
      ]),
      this.DMc.set("ConnectorComponent", [
        CommonConnectComponent_1.CommonConnectComponent,
      ]),
      this.DMc.set("HitComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
      ]),
      this.DMc.set("ClientTriggerComponent", [
        ClientTriggerComponent_1.ClientTriggerComponent,
      ]),
      this.DMc.set("DynamicPortalCreatorComponent", [
        DynamicPortalCreatorComponent_1.DynamicPortalCreatorComponent,
      ]),
      this.DMc.set("LocationSafetyComponent", [
        SafetyLocationComponent_1.SafetyLocationComponent,
      ]),
      this.DMc.set("CollectComponent", [CollectComponent_1.CollectComponent]),
      this.DMc.set("RenderSpecifiedRangeComponent", [
        RenderMaskComponent_1.RenderMaskComponent,
      ]),
      this.DMc.set("MonitorComponent", [
        SceneItemCameraAlertComponent_1.SceneItemCameraAlertComponent,
        RangeComponent_1.RangeComponent,
      ]),
      this.DMc.set("GroupAiComponent", [
        SceneItemGroupAiComponent_1.SceneItemGroupAiComponent,
      ]),
      this.DMc.set("BatchBulletCasterComponent", [
        BatchBulletCasterComponent_1.BatchBulletCasterComponent,
      ]),
      this.DMc.set("ClientConditionListenerComponent", [
        ClientConditionListenerComponent_1.ClientConditionListenerComponent,
      ]),
      this.DMc.set("AirPassageComponent", [
        SceneItemWindPipelineComponent_1.SceneItemWindPipelineComponent,
      ]),
      this.DMc.set("InhalationAbilityComponent", [
        SceneItemInhalationComponent_1.SceneItemInhalationComponent,
      ]),
      this.DMc.set("InhaledItemComponent", [
        SceneItemInhaledItemComponent_1.SceneItemInhaledItemComponent,
      ]),
      this.DMc.set("PullingObjectFoundation", [
        SceneItemGenericOutletComponent_1.SceneItemGenericOutletComponent,
      ]),
      this.DMc.set("LevelPrefabPerformComponent", [
        SubActorPerformanceComponent_1.SubActorPerformanceComponent,
      ]),
      this.DMc.set("SceneItemAiComponent", [
        SmartObjectComponent_1.SmartObjectComponent,
      ]),
      this.DMc.set("LevelQteComponent", [
        LevelQteComponent_1.LevelQteComponent,
      ]),
      this.DMc.set("WalkingPatternComponent", [
        GamePlayWalkingPatternComponent_1.GamePlayWalkingPatternComponent,
      ]),
      this.DMc.set("VehicleComponent", [
        VehicleSceneItemPerformComponent_1.VehicleSceneItemPerformComponent,
        SceneItemVehicleComponent_1.SceneItemVehicleComponent,
      ]),
      this.DMc.set("GravityFlipComponent", [
        SceneItemGravityFlipComponent_1.SceneItemGravityFlipComponent,
      ]),
      this.DMc.set("WindSourceComponent", [
        WindDirectionalSourceComponent_1.WindDirectionalSourceComponent,
      ]);
  }
  static yna() {
    this.Ina.set("CharacterConnectorComponent", [
      PawnSensoryComponent_1.PawnSensoryComponent,
      CommonConnectComponent_1.CommonConnectComponent,
    ]),
      this.Ina.set("HackManagementComponent", [
        HackManagementComponent_1.HackManagementComponent,
      ]);
  }
}
((exports.WorldEntityHelper = WorldEntityHelper).Hor = 0n),
  (WorldEntityHelper.Wor = 0n),
  (WorldEntityHelper.jor = 0n),
  (WorldEntityHelper.w4l = 0n),
  (WorldEntityHelper.Eo1 = 0n),
  (WorldEntityHelper.For = new Map()),
  (WorldEntityHelper.ComponentPriority = new Map()),
  (WorldEntityHelper.kMc = new Map()),
  (WorldEntityHelper.DMc = new Map()),
  (WorldEntityHelper.a_1 = new Map()),
  (WorldEntityHelper.Ina = new Map()),
  (Global_1.Global.WorldEntityHelper = WorldEntityHelper);
//# sourceMappingURL=WorldEntityHelper.js.map
