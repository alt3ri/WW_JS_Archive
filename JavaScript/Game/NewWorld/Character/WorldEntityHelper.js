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
  ModelManager_1 = require("../../Manager/ModelManager"),
  BaseTagComponent_1 = require("../Common/Component/BaseTagComponent"),
  BaseUnifiedStateComponent_1 = require("../Common/Component/BaseUnifiedStateComponent"),
  CommonConnectComponent_1 = require("../Common/Component/CommonConnectComponent"),
  DurablityComponent_1 = require("../Common/Component/DurablityComponent"),
  InteractItemComponent_1 = require("../Common/Component/InteractItemComponent"),
  LevelTagComponent_1 = require("../Common/Component/LevelTagComponent"),
  PerformanceComponent_1 = require("../Common/Component/PerformanceComponent"),
  PostProcessBridgeComponent_1 = require("../Common/Component/PostProcessBridgeComponent"),
  SplineMoveComponent_1 = require("../Common/Component/SplineMoveComponent"),
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
  AiWeaponMovementComponent_1 = require("../SceneItem/AiInteraction/AiWeaponMovementComponent"),
  CollectComponent_1 = require("../SceneItem/CollectComponent"),
  EffectAreaComponent_1 = require("../SceneItem/Common/Component/EffectAreaComponent"),
  SceneItemAttachTargetComponent_1 = require("../SceneItem/Common/Component/SceneItemAttachTargetComponent"),
  SceneItemDebugComponent_1 = require("../SceneItem/Common/Component/SceneItemDebugComponent"),
  SceneItemDynamicAttachTargetComponent_1 = require("../SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent"),
  SceneItemInteractAudioComponent_1 = require("../SceneItem/Common/Component/SceneItemInteractAudioComponent"),
  SceneItemMoveComponent_1 = require("../SceneItem/Common/Component/SceneItemMoveComponent"),
  SceneItemPhysicalAttachComponent_1 = require("../SceneItem/Common/Component/SceneItemPhysicalAttachComponent"),
  SceneItemPortalComponent_1 = require("../SceneItem/Common/Component/SceneItemPortalComponent"),
  SceneItemProgressControlComponent_1 = require("../SceneItem/Common/Component/SceneItemProgressControlComponent"),
  SceneItemPropertyComponent_1 = require("../SceneItem/Common/Component/SceneItemPropertyComponent"),
  SceneItemStateAudioComponent_1 = require("../SceneItem/Common/Component/SceneItemStateAudioComponent"),
  SceneItemStateComponent_1 = require("../SceneItem/Common/Component/SceneItemStateComponent"),
  SceneItemTimeTrackControlComponent_1 = require("../SceneItem/Common/Component/SceneItemTimeTrackControlComponent"),
  SceneItemTurntableControllerComponent_1 = require("../SceneItem/Common/Component/SceneItemTurntableControllerComponent"),
  SmartObjectComponent_1 = require("../SceneItem/Common/Component/SmartObjectComponent"),
  DynamicPortalCreatorComponent_1 = require("../SceneItem/DynamicPortalCreatorComponent"),
  GamePlayElevatorComponent_1 = require("../SceneItem/GamePlayElevatorComponent"),
  GamePlayHitGearComponent_1 = require("../SceneItem/GamePlayHitGearComponent"),
  GamePlayTreasureBoxComponent_1 = require("../SceneItem/GamePlayTreasureBoxComponent"),
  SceneItemJigsawBaseComponent_1 = require("../SceneItem/Jigsaw/SceneItemJigsawBaseComponent"),
  SceneItemJigsawItemComponent_1 = require("../SceneItem/Jigsaw/SceneItemJigsawItemComponent"),
  SceneBulletComponent_1 = require("../SceneItem/SceneBulletComponent"),
  SceneItemActorComponent_1 = require("../SceneItem/SceneItemActorComponent"),
  SceneItemAdviceComponent_1 = require("../SceneItem/SceneItemAdviceComponent"),
  SceneItemAiInteractionComponent_1 = require("../SceneItem/SceneItemAiInteractionComponent"),
  SceneItemBeamCastComponent_1 = require("../SceneItem/SceneItemBeamCastComponent"),
  SceneItemBeamReceiveComponent_1 = require("../SceneItem/SceneItemBeamReceiveComponent"),
  SceneItemBuffConsumerComponent_1 = require("../SceneItem/SceneItemBuffConsumerComponent"),
  SceneItemBuffProducerComponent_1 = require("../SceneItem/SceneItemBuffProducerComponent"),
  SceneItemCaptureComponent_1 = require("../SceneItem/SceneItemCaptureComponent"),
  SceneItemConveyorBeltComponent_1 = require("../SceneItem/SceneItemConveyorBeltComponent"),
  SceneItemDamageComponent_1 = require("../SceneItem/SceneItemDamageComponent"),
  SceneItemDropItemComponent_1 = require("../SceneItem/SceneItemDropItemComponent"),
  SceneItemExploreInteractComponent_1 = require("../SceneItem/SceneItemExploreInteractComponent"),
  SceneItemFanComponent_1 = require("../SceneItem/SceneItemFanComponent"),
  SceneItemGravityComponent_1 = require("../SceneItem/SceneItemGravityComponent"),
  SceneItemGuidePathComponent_1 = require("../SceneItem/SceneItemGuidePathComponent"),
  SceneItemHitComponent_1 = require("../SceneItem/SceneItemHitComponent"),
  SceneItemLevitateMagnetComponent_1 = require("../SceneItem/SceneItemLevitateMagnetComponent"),
  SceneItemManipulatableComponent_1 = require("../SceneItem/SceneItemManipulatableComponent"),
  SceneItemMonsterGachaItemComponent_1 = require("../SceneItem/SceneItemMonsterGachaItemComponent"),
  SceneItemMovementSyncComponent_1 = require("../SceneItem/SceneItemMovementSyncComponent"),
  SceneItemMultiInteractionActorComponent_1 = require("../SceneItem/SceneItemMultiInteractionActorComponent"),
  SceneItemNearbyTrackingComponent_1 = require("../SceneItem/SceneItemNearbyTrackingComponent"),
  SceneItemOutletComponent_1 = require("../SceneItem/SceneItemOutletComponent"),
  SceneItemReboundComponent_1 = require("../SceneItem/SceneItemReboundComponent"),
  SceneItemReferenceComponent_1 = require("../SceneItem/SceneItemReferenceComponent"),
  SceneItemResetPositionComponent_1 = require("../SceneItem/SceneItemResetPositionComponent"),
  SceneItemResetSelfPositionComponent_1 = require("../SceneItem/SceneItemResetSelfPositionComponent"),
  SceneItemRotatorComponent_1 = require("../SceneItem/SceneItemRotatorComponent"),
  SceneItemTimeScaleComponent_1 = require("../SceneItem/SceneItemTimeScaleComponent"),
  SceneItemTimeStopMachineComponent_1 = require("../SceneItem/SceneItemTimeStopMachineComponent"),
  SceneItemTrackGuideComponent_1 = require("../SceneItem/SceneItemTrackGuideComponent"),
  AnimalDeathSyncComponent_1 = require("./Animal/Component/AnimalDeathSyncComponent"),
  AnimalPerformComponent_1 = require("./Animal/Component/AnimalPerformComponent"),
  AnimalStateMachineComponent_1 = require("./Animal/Component/AnimalStateMachineComponent"),
  CharacterController_1 = require("./CharacterController"),
  CharacterComponentPriorityDefine_1 = require("./Common/CharacterComponentPriorityDefine"),
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
  CharacterAudioComponent_1 = require("./Common/Component/CharacterAudioComponent"),
  CharacterCaughtNewComponent_1 = require("./Common/Component/CharacterCaughtNewComponent"),
  CharacterCombatMessageComponent_1 = require("./Common/Component/CharacterCombatMessageComponent"),
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
  CharacterStateMachineNewComponent_1 = require("./Common/Component/CharacterStateMachineNewComponent"),
  CharacterSwimComponent_1 = require("./Common/Component/CharacterSwimComponent"),
  CharacterThrowComponent_1 = require("./Common/Component/CharacterThrowComponent"),
  CharacterTimeScaleComponent_1 = require("./Common/Component/CharacterTimeScaleComponent"),
  CharacterWalkOnWaterComponent_1 = require("./Common/Component/CharacterWalkOnWaterComponent"),
  CharacterWeaponComponent_1 = require("./Common/Component/CharacterWeaponComponent"),
  CreatureDataComponent_1 = require("./Common/Component/CreatureDataComponent"),
  ActorDebugMovementComponent_1 = require("./Common/Component/Debug/ActorDebugMovementComponent"),
  CharacterFlowComponent_1 = require("./Common/Component/Flow/CharacterFlowComponent"),
  CharacterLockOnComponent_1 = require("./Common/Component/LockOn/CharacterLockOnComponent"),
  CharacterCatapultComponent_1 = require("./Common/Component/Move/CharacterCatapultComponent"),
  CharacterClimbComponent_1 = require("./Common/Component/Move/CharacterClimbComponent"),
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
  MonsterFlowComponent_1 = require("./Monster/Component/MonsterFlowComponent"),
  ExecutionComponent_1 = require("./Monster/Entity/Component/ExecutionComponent"),
  MonsterBehaviorComponent_1 = require("./Monster/Entity/Component/MonsterBehaviorComponent"),
  MonsterDeathComponent_1 = require("./Monster/Entity/Component/MonsterDeathComponent"),
  MonsterFrozenComponent_1 = require("./Monster/Entity/Component/MonsterFrozenComponent"),
  CommonNpcPerformComponent_1 = require("./Npc/Component/CommonNpcPerformComponent"),
  NpcFlowComponent_1 = require("./Npc/Component/NpcFlowComponent"),
  NpcPasserbyComponent_1 = require("./Npc/Component/NpcPasserbyComponent"),
  NpcPerformComponent_1 = require("./Npc/Component/NpcPerformComponent"),
  PasserbyGeneratorComponent_1 = require("./Npc/Component/PasserbyGeneratorComponent"),
  RoleAttributeComponent_1 = require("./Role/Component/RoleAttributeComponent"),
  RoleAudioComponent_1 = require("./Role/Component/RoleAudioComponent"),
  RoleBuffComponent_1 = require("./Role/Component/RoleBuffComponent"),
  RoleDeathComponent_1 = require("./Role/Component/RoleDeathComponent"),
  RoleElementComponent_1 = require("./Role/Component/RoleElementComponent"),
  RoleEnergyComponent_1 = require("./Role/Component/RoleEnergyComponent"),
  RoleFrozenComponent_1 = require("./Role/Component/RoleFrozenComponent"),
  RoleGaitComponent_1 = require("./Role/Component/RoleGaitComponent"),
  RoleGrowComponent_1 = require("./Role/Component/RoleGrowComponent"),
  RoleInheritComponent_1 = require("./Role/Component/RoleInheritComponent"),
  RoleLocationSafetyComponent_1 = require("./Role/Component/RoleLocationSafetyComponent"),
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
  OTHER_PRIORITY = 8;
exports.USE_ENTITY_POOL = !0;
class WorldEntityHelper {
  static Initialize() {
    return this.Nor(), this.Oor(), this.kor(), this.yna(), !0;
  }
  static Clear() {
    return (
      this.ComponentPriority.clear(), this.For.clear(), this.Vor.clear(), !0
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
        if (((e.Priority = ROLE_PRIORITY), this.GetRoleComponentRecord(e)))
          break;
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
              ((t = CharacterController_1.CharacterController.SpawnEntity(
                this.Hor,
              )),
              (o = this.Hor));
            break;
          case 2:
            this.jor &&
              ((t = CharacterController_1.CharacterController.SpawnEntity(
                this.jor,
              )),
              (o = this.jor));
            break;
          default:
            this.Wor &&
              ((t = CharacterController_1.CharacterController.SpawnEntity(
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
    }
    if (
      ((o = e.ComponentsKey),
      (t = t || CharacterController_1.CharacterController.SpawnEntity(o)))
    ) {
      if (
        !CharacterController_1.CharacterController.Respawn(
          t,
          t.Entity,
          e.Priority,
          e,
        )
      )
        return;
    } else t = CharacterController_1.CharacterController.CreateEntity(o, e);
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
          default:
            this.Wor = n.GetComponentKey();
        }
      return CharacterController_1.CharacterController.DestroyToLru(e)
        ? !0
        : !1;
    }
    return !!CharacterController_1.CharacterController.Destroy(e);
  }
  static GetMonsterComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent))
      return !1;
    if (
      !e.AddComponent(ActorDebugMovementComponent_1.ActorDebugMovementComponent)
    )
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
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent))
      return !1;
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent))
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
    if (
      !e.AddComponent(CharacterAttributeComponent_1.CharacterAttributeComponent)
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
    if (
      !e.AddComponent(
        CharacterCombatMessageComponent_1.CharacterCombatMessageComponent,
      )
    )
      return !1;
    n =
      CreateEntityData_1.CreateEntityData.GetBaseInfo(e)?.Category
        .MonsterMatchType;
    if (
      4 === n &&
      !e.AddComponent(CharacterGaitComponent_1.CharacterGaitComponent)
    )
      return !1;
    do {
      var t = e.PbEntityInitData,
        r = t?.ComponentsData;
      if (!t || !r) break;
      t = e.GetPbModelConfig();
      if (!t) break;
      (t = t.EntityType), (t = IEntity_1.componentsByEntityAki[t]);
      if (!t) break;
      for (const a of t) {
        var m = r[a];
        if (!m)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                32,
                "初始化MonsterEntity找不到对应的prefab配置",
                ["creatureDataId", e.CreatureDataId],
                ["pbDataId", e.PbDataId],
                ["componentType", a],
              ),
            !1
          );
        if (!m.Disable) {
          var C = this.Ina.get(a);
          if (C)
            for (const i of C)
              if (!e.HasComponent(i)) {
                if (!e.AddComponent(i)) return !1;
                e.SetParam(i, m);
              }
        }
      }
    } while (0);
    return !!e.AddComponent(RolePreloadComponent_1.RolePreloadComponent);
  }
  static GetRoleComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent))
      return !1;
    if (
      !e.AddComponent(ActorDebugMovementComponent_1.ActorDebugMovementComponent)
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterLogicStateSyncComponent_1.CharacterLogicStateSyncComponent,
      )
    )
      return !1;
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent))
      return !1;
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent))
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
    }
    if (
      !e.AddComponent(
        CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent,
      )
    )
      return !1;
    if (!e.AddComponent(RoleGrowComponent_1.RoleGrowComponent)) return !1;
    if (!e.AddComponent(RoleAttributeComponent_1.RoleAttributeComponent))
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
        CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent,
      )
    )
      return !1;
    if (!e.AddComponent(CharacterSkillCdComponent_1.CharacterSkillCdComponent))
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
    if (!e.AddComponent(SplineMoveComponent_1.SplineMoveComponent)) return !1;
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
    if (e.AddComponent(CharacterAiComponent_1.CharacterAiComponent))
      return (
        !!e.AddComponent(RoleAudioComponent_1.RoleAudioComponent) &&
        !!e.AddComponent(
          RoleLocationSafetyComponent_1.RoleLocationSafetyComponent,
        ) &&
        !!(
          e.AddComponent(CharacterVisionComponent_1.CharacterVisionComponent) &&
          e.AddComponent(
            CharacterPhysicsAssetComponent_1.CharacterPhysicsAssetComponent,
          ) &&
          e.AddComponent(
            CharacterFootEffectComponent_1.CharacterFootEffectComponent,
          ) &&
          e.AddComponent(
            CharacterSkinDamageComponent_1.CharacterSkinDamageComponent,
          ) &&
          e.AddComponent(
            CharacterCombatMessageComponent_1.CharacterCombatMessageComponent,
          ) &&
          e.AddComponent(RolePreloadComponent_1.RolePreloadComponent) &&
          e.AddComponent(SubMeshComponent_1.SubMeshComponent)
        ) &&
        (e.RegisterToGameBudgetController = !0)
      );
    return !1;
  }
  static GetSceneEntityComponentRecord(e) {
    return !!(
      e.AddComponent(CreatureDataComponent_1.CreatureDataComponent) &&
      e.AddComponent(CharacterActorComponent_1.CharacterActorComponent) &&
      e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent) &&
      e.AddComponent(CharacterBuffComponent_1.CharacterBuffComponent) &&
      e.AddDebugComponent(
        CharacterGasDebugComponent_1.CharacterGasDebugComponent,
      ) &&
      e.AddDebugComponent(
        CharacterStatisticsComponent_1.CharacterStatisticsComponent,
      ) &&
      e.AddComponent(
        CharacterAttributeComponent_1.CharacterAttributeComponent,
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
      !e.AddComponent(ActorDebugMovementComponent_1.ActorDebugMovementComponent)
    )
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
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent))
      return !1;
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent))
      return !1;
    if (!e.AddComponent(VisionBuffComponent_1.VisionBuffComponent)) return !1;
    if (
      !e.AddComponent(
        CharacterGameplayCueComponent_1.CharacterGameplayCueComponent,
      )
    )
      return !1;
    if (
      Info_1.Info.IsBuildDevelopmentOrDebug &&
      !e.AddComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent)
    )
      return !1;
    if (
      !e.AddComponent(
        CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent,
      )
    )
      return !1;
    if (
      !e.AddComponent(CharacterAttributeComponent_1.CharacterAttributeComponent)
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
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent))
      return !1;
    if (!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent)) return !1;
    if (
      !e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)
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
    for (const m of o)
      switch (m) {
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
    do {
      var e = o?.ComponentsData;
      if (!o) break;
      if (!e) break;
      var t = n.GetPbModelConfig();
      if (!t) break;
      (t = t.EntityType), (t = IEntity_1.componentsByEntityAki[t]);
      if (!t) break;
      for (const a of t) {
        var r = e[a];
        if (!r)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                23,
                "初始化SceneItemEntity找不到对应的prefab配置",
                ["CreatureDataId", n.CreatureDataId],
                ["PbDataId", n.PbDataId],
                ["componentType", a],
              ),
            !1
          );
        if (!r.Disabled) {
          var m = this.Vor.get(a);
          if (m) {
            for (const i of m)
              if (!n.HasComponent(i)) {
                if (!n.AddComponent(i)) return !1;
                n.SetParam(i, r);
              }
            switch (a) {
              case "AdsorbComponent":
              case "FollowTrackComponent":
                n.EnableMovement = !0;
            }
          }
        }
      }
    } while (0);
    if (o?.ComponentsData) {
      var C = (0, IComponent_1.getComponent)(
        o.ComponentsData,
        "InteractComponent",
      );
      if (
        C &&
        !n.AddComponent(PawnInteractNewComponent_1.PawnInteractNewComponent)
      )
        return !1;
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Interaction",
          37,
          "SceneItemEntity.AddInteractComponents 旧版交互已经废除",
        );
    if (!n.AddComponent(PawnPerceptionComponent_1.PawnPerceptionComponent))
      return !1;
    if (!n.AddComponent(InteractItemComponent_1.InteractItemComponent))
      return !1;
    C = CreateEntityData_1.CreateEntityData.GetBaseInfo(n);
    if (
      C?.IsShowNameOnHead &&
      !n.HasComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent) &&
      !n.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent)
    )
      return !1;
    if (
      CreateEntityData_1.CreateEntityData.HasScanInfo(n) &&
      !n.AddComponent(ScanComponent_1.ScanComponent)
    )
      return !1;
    if (o) {
      let e = !1;
      C = (0, IComponent_1.getComponent)(o.ComponentsData, "WeaponComponent");
      if (
        C?.WeaponId &&
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
        SplineMoveComponent_1.SplineMoveComponent,
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
      );
  }
  static Oor() {
    this.For.set(0, [
      CharacterActorComponent_1.CharacterActorComponent,
      ActorDebugMovementComponent_1.ActorDebugMovementComponent,
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
    ]),
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
      ]);
  }
  static kor() {
    this.Vor.set("TreasureBoxComponent", [
      GamePlayTreasureBoxComponent_1.SceneItemTreasureBoxComponent,
    ]),
      this.Vor.set("TeleControl2", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemManipulatableComponent_1.SceneItemManipulatableComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
        SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent,
      ]),
      this.Vor.set("ItemFoundation2", [
        SceneItemOutletComponent_1.SceneItemOutletComponent,
      ]),
      this.Vor.set("DestructibleItem", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        DurablityComponent_1.DurabilityComponent,
        SceneItemDamageComponent_1.SceneItemDamageComponent,
      ]),
      this.Vor.set("AdsorbComponent", [
        PawnAdsorbComponent_1.PawnAdsorbComponent,
      ]),
      this.Vor.set("RangeComponent", [RangeComponent_1.RangeComponent]),
      this.Vor.set("TriggerComponent", [TriggerComponent_1.TriggerComponent]),
      this.Vor.set("TrampleComponent", [
        SceneItemGravityComponent_1.SceneItemGravityComponent,
      ]),
      this.Vor.set("TargetGearComponent", [
        SceneItemMoveComponent_1.SceneItemMoveComponent,
        SceneItemHitComponent_1.SceneItemHitComponent,
        GamePlayHitGearComponent_1.GamePlayHitGearComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
      ]),
      this.Vor.set("LiftComponent", [
        GamePlayElevatorComponent_1.GamePlayElevatorComponent,
      ]),
      this.Vor.set("ConveyorBeltComponent", [
        SceneItemConveyorBeltComponent_1.SceneItemConveyorBeltComponent,
      ]),
      this.Vor.set("FollowTrackComponent", [
        SceneItemTrackGuideComponent_1.SceneItemTrackGuideComponent,
      ]),
      this.Vor.set("NearbyTrackingComponent", [
        SceneItemNearbyTrackingComponent_1.SceneItemNearbyTrackingComponent,
      ]),
      this.Vor.set("SkyboxComponent", [
        PostProcessBridgeComponent_1.PostProcessBridgeComponent,
      ]),
      this.Vor.set("DungeonEntryComponent", [
        DungeonEntranceComponent_1.DungeonEntranceComponent,
      ]),
      this.Vor.set("BuffProducerComponent", [
        SceneItemBuffProducerComponent_1.SceneItemBuffProducerComponent,
      ]),
      this.Vor.set("BuffConsumerComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemBuffConsumerComponent_1.SceneItemBuffConsumerComponent,
      ]),
      this.Vor.set("ResetEntitiesPosComponent", [
        SceneItemResetPositionComponent_1.SceneItemResetPositionComponent,
      ]),
      this.Vor.set("RotatorComponent2", [
        SceneItemRotatorComponent_1.SceneItemRotatorComponent,
      ]),
      this.Vor.set("VisionItemComponent", [
        SceneItemCaptureComponent_1.SceneItemCaptureComponent,
      ]),
      this.Vor.set("GuideLineCreatorComponent", [
        SceneItemGuidePathComponent_1.SceneItemGuidePathComponent,
      ]),
      this.Vor.set("SceneItemMovementComponent", [
        SceneItemMoveComponent_1.SceneItemMoveComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
      ]),
      this.Vor.set("AdviseItemComponent", [
        SceneItemAdviceComponent_1.SceneItemAdviceComponent,
      ]),
      this.Vor.set("EntityStateAudioComponent", [
        SceneItemStateAudioComponent_1.SceneItemStateAudioComponent,
      ]),
      this.Vor.set("InteractAudioComponent", [
        SceneItemInteractAudioComponent_1.SceneItemInteractAudioComponent,
      ]),
      this.Vor.set("TimelineTrackControlComponent", [
        SceneItemTimeTrackControlComponent_1.SceneItemTimeTrackControlComponent,
      ]),
      this.Vor.set("SceneActorRefComponent", [
        SceneItemReferenceComponent_1.SceneItemReferenceComponent,
      ]),
      this.Vor.set("AttachTargetComponent", [
        SceneItemAttachTargetComponent_1.SceneItemAttachTargetComponent,
      ]),
      this.Vor.set("ReboundComponent", [
        SceneItemReboundComponent_1.SceneItemReboundComponent,
      ]),
      this.Vor.set("TurntableControlComponent", [
        SceneItemTurntableControllerComponent_1.SceneItemTurntableControllerComponent,
      ]),
      this.Vor.set("JigsawFoundation", [
        SceneItemJigsawBaseComponent_1.SceneItemJigsawBaseComponent,
        SceneItemMultiInteractionActorComponent_1.SceneItemMultiInteractionActorComponent,
      ]),
      this.Vor.set("JigsawItem", [
        SceneItemJigsawItemComponent_1.SceneItemJigsawItemComponent,
        SceneItemMultiInteractionActorComponent_1.SceneItemMultiInteractionActorComponent,
      ]),
      this.Vor.set("SceneBulletComponent", [
        SceneBulletComponent_1.SceneBulletComponent,
      ]),
      this.Vor.set("LevitateMagnetComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemMoveComponent_1.SceneItemMoveComponent,
        SceneItemLevitateMagnetComponent_1.SceneItemLevitateMagnetComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
      ]),
      this.Vor.set("AiAlertNotifyComponent", [
        SmartObjectComponent_1.SmartObjectComponent,
      ]),
      this.Vor.set("MonsterGachaItemComponent", [
        SceneItemMonsterGachaItemComponent_1.SceneItemMonsterGachaItemComponent,
      ]),
      this.Vor.set("ProgressBarControlComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemProgressControlComponent_1.SceneItemProgressControlComponent,
      ]),
      this.Vor.set("ExploreSkillInteractComponent", [
        SceneItemExploreInteractComponent_1.SceneItemExploreInteractComponent,
      ]),
      this.Vor.set("HookLockPoint", [
        GrapplingHookPointComponent_1.GrapplingHookPointComponent,
        SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent,
      ]),
      this.Vor.set("FanComponent", [
        SceneItemFanComponent_1.SceneItemFanComponent,
        SceneItemHitComponent_1.SceneItemHitComponent,
        PawnInteractNewComponent_1.PawnInteractNewComponent,
        RangeComponent_1.RangeComponent,
      ]),
      this.Vor.set("ResetSelfPosComponent", [
        SceneItemResetSelfPositionComponent_1.SceneItemResetSelfPositionComponent,
      ]),
      this.Vor.set("TimeStopComponent", [
        SceneItemTimeStopMachineComponent_1.SceneItemTimeStopMachineComponent,
      ]),
      this.Vor.set("BeamCastComponent", [
        SceneItemBeamCastComponent_1.SceneItemBeamCastComponent,
        RangeComponent_1.RangeComponent,
      ]),
      this.Vor.set("BeamReceiveComponent", [
        SceneItemBeamReceiveComponent_1.SceneItemBeamReceiveComponent,
      ]),
      this.Vor.set("PortalComponent", [
        SceneItemPortalComponent_1.SceneItemPortalComponent,
      ]),
      this.Vor.set("BubbleComponent", [
        CharacterFlowComponent_1.CharacterFlowComponent,
        PawnHeadInfoComponent_1.PawnHeadInfoComponent,
      ]),
      this.Vor.set("PasserbyNpcSpawnComponent", [
        PasserbyGeneratorComponent_1.PasserbyGeneratorComponent,
      ]),
      this.Vor.set("EffectAreaComponent", [
        EffectAreaComponent_1.EffectAreaComponent,
      ]),
      this.Vor.set("PhysicsConstraintComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemPhysicalAttachComponent_1.SceneItemPhysicalAttachComponent,
      ]),
      this.Vor.set("ConnectorComponent", [
        CommonConnectComponent_1.CommonConnectComponent,
      ]),
      this.Vor.set("HitComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
      ]),
      this.Vor.set("ClientTriggerComponent", [
        ClientTriggerComponent_1.ClientTriggerComponent,
      ]),
      this.Vor.set("DynamicPortalCreatorComponent", [
        DynamicPortalCreatorComponent_1.DynamicPortalCreatorComponent,
      ]),
      this.Vor.set("LocationSafetyComponent", [
        SafetyLocationComponent_1.SafetyLocationComponent,
      ]),
      this.Vor.set("CollectComponent", [CollectComponent_1.CollectComponent]);
  }
  static yna() {
    this.Ina.set("CharacterConnectorComponent", [
      PawnSensoryComponent_1.PawnSensoryComponent,
      CommonConnectComponent_1.CommonConnectComponent,
    ]);
  }
}
((exports.WorldEntityHelper = WorldEntityHelper).Hor = 0n),
  (WorldEntityHelper.Wor = 0n),
  (WorldEntityHelper.jor = 0n),
  (WorldEntityHelper.For = new Map()),
  (WorldEntityHelper.ComponentPriority = new Map()),
  (WorldEntityHelper.Vor = new Map()),
  (WorldEntityHelper.Ina = new Map()),
  (Global_1.Global.WorldEntityHelper = WorldEntityHelper);
//# sourceMappingURL=WorldEntityHelper.js.map
