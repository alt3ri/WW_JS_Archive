"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldEntityHelper = exports.USE_ENTITY_POOL = void 0);
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const MonsterBattleConfById_1 = require("../../../Core/Define/ConfigQuery/MonsterBattleConfById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../UniverseEditor/Interface/IEntity");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const BaseTagComponent_1 = require("../Common/Component/BaseTagComponent");
const BaseUnifiedStateComponent_1 = require("../Common/Component/BaseUnifiedStateComponent");
const DurablityComponent_1 = require("../Common/Component/DurablityComponent");
const InteractItemComponent_1 = require("../Common/Component/InteractItemComponent");
const LevelTagComponent_1 = require("../Common/Component/LevelTagComponent");
const PerformanceComponent_1 = require("../Common/Component/PerformanceComponent");
const PostProcessBridgeComponent_1 = require("../Common/Component/PostProcessBridgeComponent");
const SplineMoveComponent_1 = require("../Common/Component/SplineMoveComponent");
const UeActorTickManageComponent_1 = require("../Common/Component/UeActorTickManageComponent");
const UeComponentTickManageComponent_1 = require("../Common/Component/UeComponentTickManageComponent");
const UeMovementTickManageComponent_1 = require("../Common/Component/UeMovementTickManageComponent");
const UeSkeletalTickManageComponent_1 = require("../Common/Component/UeSkeletalTickManageComponent");
const PawnAdsorbComponent_1 = require("../Pawn/Component/PawnAdsorbComponent");
const PawnInfoManageComponent_1 = require("../Pawn/Component/PawnInfoManageComponent");
const PawnInteractNewComponent_1 = require("../Pawn/Component/PawnInteractNewComponent");
const PawnPerceptionComponent_1 = require("../Pawn/Component/PawnPerceptionComponent");
const PawnSensoryComponent_1 = require("../Pawn/Component/PawnSensoryComponent");
const PawnSensoryInfoComponent_1 = require("../Pawn/Component/PawnSensoryInfoComponent");
const AiWeaponMovementComponent_1 = require("../SceneItem/AiInteraction/AiWeaponMovementComponent");
const EffectAreaComponent_1 = require("../SceneItem/Common/Component/EffectAreaComponent");
const SceneItemAttachTargetComponent_1 = require("../SceneItem/Common/Component/SceneItemAttachTargetComponent");
const SceneItemDebugComponent_1 = require("../SceneItem/Common/Component/SceneItemDebugComponent");
const SceneItemDynamicAttachTargetComponent_1 = require("../SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent");
const SceneItemInteractAudioComponent_1 = require("../SceneItem/Common/Component/SceneItemInteractAudioComponent");
const SceneItemMoveComponent_1 = require("../SceneItem/Common/Component/SceneItemMoveComponent");
const SceneItemPhysicalAttachComponent_1 = require("../SceneItem/Common/Component/SceneItemPhysicalAttachComponent");
const SceneItemPortalComponent_1 = require("../SceneItem/Common/Component/SceneItemPortalComponent");
const SceneItemProgressControlComponent_1 = require("../SceneItem/Common/Component/SceneItemProgressControlComponent");
const SceneItemPropertyComponent_1 = require("../SceneItem/Common/Component/SceneItemPropertyComponent");
const SceneItemStateAudioComponent_1 = require("../SceneItem/Common/Component/SceneItemStateAudioComponent");
const SceneItemStateComponent_1 = require("../SceneItem/Common/Component/SceneItemStateComponent");
const SceneItemTimeTrackControlComponent_1 = require("../SceneItem/Common/Component/SceneItemTimeTrackControlComponent");
const SceneItemTurntableControllerComponent_1 = require("../SceneItem/Common/Component/SceneItemTurntableControllerComponent");
const SmartObjectComponent_1 = require("../SceneItem/Common/Component/SmartObjectComponent");
const GamePlayElevatorComponent_1 = require("../SceneItem/GamePlayElevatorComponent");
const GamePlayHitGearComponent_1 = require("../SceneItem/GamePlayHitGearComponent");
const GamePlayTreasureBoxComponent_1 = require("../SceneItem/GamePlayTreasureBoxComponent");
const SceneItemJigsawBaseComponent_1 = require("../SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const SceneItemJigsawItemComponent_1 = require("../SceneItem/Jigsaw/SceneItemJigsawItemComponent");
const SceneBulletComponent_1 = require("../SceneItem/SceneBulletComponent");
const SceneItemActorComponent_1 = require("../SceneItem/SceneItemActorComponent");
const SceneItemAdviceComponent_1 = require("../SceneItem/SceneItemAdviceComponent");
const SceneItemAiInteractionComponent_1 = require("../SceneItem/SceneItemAiInteractionComponent");
const SceneItemBeamCastComponent_1 = require("../SceneItem/SceneItemBeamCastComponent");
const SceneItemBeamReceiveComponent_1 = require("../SceneItem/SceneItemBeamReceiveComponent");
const SceneItemBuffConsumerComponent_1 = require("../SceneItem/SceneItemBuffConsumerComponent");
const SceneItemBuffProducerComponent_1 = require("../SceneItem/SceneItemBuffProducerComponent");
const SceneItemCaptureComponent_1 = require("../SceneItem/SceneItemCaptureComponent");
const SceneItemConveyorBeltComponent_1 = require("../SceneItem/SceneItemConveyorBeltComponent");
const SceneItemDamageComponent_1 = require("../SceneItem/SceneItemDamageComponent");
const SceneItemDropItemComponent_1 = require("../SceneItem/SceneItemDropItemComponent");
const SceneItemExploreInteractComponent_1 = require("../SceneItem/SceneItemExploreInteractComponent");
const SceneItemFanComponent_1 = require("../SceneItem/SceneItemFanComponent");
const SceneItemGravityComponent_1 = require("../SceneItem/SceneItemGravityComponent");
const SceneItemGuidePathComponent_1 = require("../SceneItem/SceneItemGuidePathComponent");
const SceneItemHitComponent_1 = require("../SceneItem/SceneItemHitComponent");
const SceneItemLevitateMagnetComponent_1 = require("../SceneItem/SceneItemLevitateMagnetComponent");
const SceneItemManipulatableComponent_1 = require("../SceneItem/SceneItemManipulatableComponent");
const SceneItemMonsterGachaItemComponent_1 = require("../SceneItem/SceneItemMonsterGachaItemComponent");
const SceneItemMovementSyncComponent_1 = require("../SceneItem/SceneItemMovementSyncComponent");
const SceneItemMultiInteractionActorComponent_1 = require("../SceneItem/SceneItemMultiInteractionActorComponent");
const SceneItemNearbyTrackingComponent_1 = require("../SceneItem/SceneItemNearbyTrackingComponent");
const SceneItemOutletComponent_1 = require("../SceneItem/SceneItemOutletComponent");
const SceneItemReboundComponent_1 = require("../SceneItem/SceneItemReboundComponent");
const SceneItemReferenceComponent_1 = require("../SceneItem/SceneItemReferenceComponent");
const SceneItemResetPositionComponent_1 = require("../SceneItem/SceneItemResetPositionComponent");
const SceneItemResetSelfPositionComponent_1 = require("../SceneItem/SceneItemResetSelfPositionComponent");
const SceneItemRotatorComponent_1 = require("../SceneItem/SceneItemRotatorComponent");
const SceneItemTimeScaleComponent_1 = require("../SceneItem/SceneItemTimeScaleComponent");
const SceneItemTimeStopMachineComponent_1 = require("../SceneItem/SceneItemTimeStopMachineComponent");
const SceneItemTrackGuideComponent_1 = require("../SceneItem/SceneItemTrackGuideComponent");
const AnimalDeathSyncComponent_1 = require("./Animal/Component/AnimalDeathSyncComponent");
const AnimalPerformComponent_1 = require("./Animal/Component/AnimalPerformComponent");
const AnimalStateMachineComponent_1 = require("./Animal/Component/AnimalStateMachineComponent");
const CharacterController_1 = require("./CharacterController");
const CharacterComponentPriorityDefine_1 = require("./Common/CharacterComponentPriorityDefine");
const CharacterAbilityComponent_1 = require("./Common/Component/Abilities/CharacterAbilityComponent");
const CharacterAttributeComponent_1 = require("./Common/Component/Abilities/CharacterAttributeComponent");
const CharacterBuffComponent_1 = require("./Common/Component/Abilities/CharacterBuffComponent");
const CharacterDamageComponent_1 = require("./Common/Component/Abilities/CharacterDamageComponent");
const CharacterGameplayCueComponent_1 = require("./Common/Component/Abilities/CharacterGameplayCueComponent");
const CharacterGasDebugComponent_1 = require("./Common/Component/Abilities/CharacterGasDebugComponent");
const CharacterMontageComponent_1 = require("./Common/Component/Abilities/CharacterMontageComponent");
const CharacterPassiveSkillComponent_1 = require("./Common/Component/Abilities/CharacterPassiveSkillComponent");
const CharacterStatisticsComponent_1 = require("./Common/Component/Abilities/CharacterStatisticsComponent");
const CharacterTriggerComponent_1 = require("./Common/Component/Abilities/CharacterTriggerComponent");
const CharacterUnifiedStateComponent_1 = require("./Common/Component/Abilities/CharacterUnifiedStateComponent");
const VisionBuffComponent_1 = require("./Common/Component/Abilities/VisionBuffComponent");
const CharacterActionComponent_1 = require("./Common/Component/Action/CharacterActionComponent");
const CharacterActorComponent_1 = require("./Common/Component/CharacterActorComponent");
const CharacterAiComponent_1 = require("./Common/Component/CharacterAiComponent");
const CharacterAnimationComponent_1 = require("./Common/Component/CharacterAnimationComponent");
const CharacterAnimationSyncComponent_1 = require("./Common/Component/CharacterAnimationSyncComponent");
const CharacterAudioComponent_1 = require("./Common/Component/CharacterAudioComponent");
const CharacterCaughtNewComponent_1 = require("./Common/Component/CharacterCaughtNewComponent");
const CharacterCombatMessageComponent_1 = require("./Common/Component/CharacterCombatMessageComponent");
const CharacterExploreComponent_1 = require("./Common/Component/CharacterExploreComponent");
const CharacterFightStateComponent_1 = require("./Common/Component/CharacterFightStateComponent");
const CharacterFollowComponent_1 = require("./Common/Component/CharacterFollowComponent");
const CharacterFootEffectComponent_1 = require("./Common/Component/CharacterFootEffectComponent");
const CharacterGaitComponent_1 = require("./Common/Component/CharacterGaitComponent");
const CharacterGlideComponent_1 = require("./Common/Component/CharacterGlideComponent");
const CharacterHitComponent_1 = require("./Common/Component/CharacterHitComponent");
const CharacterInputComponent_1 = require("./Common/Component/CharacterInputComponent");
const CharacterLevelShootComponent_1 = require("./Common/Component/CharacterLevelShootComponent");
const CharacterLogicStateSyncComponent_1 = require("./Common/Component/CharacterLogicStateSyncComponent");
const CharacterManipulateComponent_1 = require("./Common/Component/CharacterManipulateComponent");
const CharacterManipulateInteractComponent_1 = require("./Common/Component/CharacterManipulateInteractComponent");
const CharacterMoveComponent_1 = require("./Common/Component/CharacterMoveComponent");
const CharacterMovementSyncComponent_1 = require("./Common/Component/CharacterMovementSyncComponent");
const CharacterPartComponent_1 = require("./Common/Component/CharacterPartComponent");
const CharacterPartScanComponent_1 = require("./Common/Component/CharacterPartScanComponent");
const CharacterPendulumComponent_1 = require("./Common/Component/CharacterPendulumComponent");
const CharacterPhysicsAssetComponent_1 = require("./Common/Component/CharacterPhysicsAssetComponent");
const CharacterPlanComponent_1 = require("./Common/Component/CharacterPlanComponent");
const CharacterRoleTransitionComponent_1 = require("./Common/Component/CharacterRoleTransitionComponent");
const CharacterShieldComponent_1 = require("./Common/Component/CharacterShieldComponent");
const CharacterSkinDamageComponent_1 = require("./Common/Component/CharacterSkinDamageComponent");
const CharacterStateMachineNewComponent_1 = require("./Common/Component/CharacterStateMachineNewComponent");
const CharacterSwimComponent_1 = require("./Common/Component/CharacterSwimComponent");
const CharacterThrowComponent_1 = require("./Common/Component/CharacterThrowComponent");
const CharacterTimeScaleComponent_1 = require("./Common/Component/CharacterTimeScaleComponent");
const CharacterWalkOnWaterComponent_1 = require("./Common/Component/CharacterWalkOnWaterComponent");
const CharacterWeaponComponent_1 = require("./Common/Component/CharacterWeaponComponent");
const CreatureDataComponent_1 = require("./Common/Component/CreatureDataComponent");
const ActorDebugMovementComponent_1 = require("./Common/Component/Debug/ActorDebugMovementComponent");
const CharacterFlowComponent_1 = require("./Common/Component/Flow/CharacterFlowComponent");
const CharacterLockOnComponent_1 = require("./Common/Component/LockOn/CharacterLockOnComponent");
const CharacterCatapultComponent_1 = require("./Common/Component/Move/CharacterCatapultComponent");
const CharacterClimbComponent_1 = require("./Common/Component/Move/CharacterClimbComponent");
const CharacterPatrolComponent_1 = require("./Common/Component/Move/CharacterPatrolComponent");
const CharacterSlideComponent_1 = require("./Common/Component/Move/CharacterSlideComponent");
const NpcMoveComponent_1 = require("./Common/Component/NpcMoveComponent");
const PawnHeadInfoComponent_1 = require("./Common/Component/PawnHeadInfoComponent");
const RolePreloadComponent_1 = require("./Common/Component/RolePreloadComponent");
const ScanComponent_1 = require("./Common/Component/ScanComponent");
const CharacterSkillCdComponent_1 = require("./Common/Component/Skill/CharacterSkillCdComponent");
const CharacterSkillComponent_1 = require("./Common/Component/Skill/CharacterSkillComponent");
const CharacterVisionComponent_1 = require("./Common/Component/Vision/CharacterVisionComponent");
const CreateEntityData_1 = require("./CreateEntityData");
const DungeonEntranceComponent_1 = require("./Custom/Components/DungeonEntranceComponent");
const GrapplingHookPointComponent_1 = require("./Custom/Components/GrapplingHookPointComponent");
const RangeComponent_1 = require("./Custom/Components/RangeComponent");
const TriggerComponent_1 = require("./Custom/Components/TriggerComponent");
const MonsterFlowComponent_1 = require("./Monster/Component/MonsterFlowComponent");
const ExecutionComponent_1 = require("./Monster/Entity/Component/ExecutionComponent");
const MonsterBehaviorComponent_1 = require("./Monster/Entity/Component/MonsterBehaviorComponent");
const MonsterDeathComponent_1 = require("./Monster/Entity/Component/MonsterDeathComponent");
const MonsterFrozenComponent_1 = require("./Monster/Entity/Component/MonsterFrozenComponent");
const NpcFlowComponent_1 = require("./Npc/Component/NpcFlowComponent");
const NpcPasserbyComponent_1 = require("./Npc/Component/NpcPasserbyComponent");
const NpcPerformComponent_1 = require("./Npc/Component/NpcPerformComponent");
const PasserbyGeneratorComponent_1 = require("./Npc/Component/PasserbyGeneratorComponent");
const RoleAttributeComponent_1 = require("./Role/Component/RoleAttributeComponent");
const RoleAudioComponent_1 = require("./Role/Component/RoleAudioComponent");
const RoleBuffComponent_1 = require("./Role/Component/RoleBuffComponent");
const RoleDeathComponent_1 = require("./Role/Component/RoleDeathComponent");
const RoleElementComponent_1 = require("./Role/Component/RoleElementComponent");
const RoleEnergyComponent_1 = require("./Role/Component/RoleEnergyComponent");
const RoleFrozenComponent_1 = require("./Role/Component/RoleFrozenComponent");
const RoleGaitComponent_1 = require("./Role/Component/RoleGaitComponent");
const RoleGrowComponent_1 = require("./Role/Component/RoleGrowComponent");
const RoleInheritComponent_1 = require("./Role/Component/RoleInheritComponent");
const RoleLocationSafetyComponent_1 = require("./Role/Component/RoleLocationSafetyComponent");
const RoleQteComponent_1 = require("./Role/Component/RoleQteComponent");
const RoleSceneInteractComponent_1 = require("./Role/Component/RoleSceneInteractComponent");
const RoleStrengthComponent_1 = require("./Role/Component/RoleStrengthComponent");
const RoleTagComponent_1 = require("./Role/Component/RoleTagComponent");
const RoleTeamComponent_1 = require("./Role/Component/RoleTeamComponent");
const SimpleNpcActorComponent_1 = require("./SimpleNpc/Component/SimpleNpcActorComponent");
const SimpleNpcAnimationComponent_1 = require("./SimpleNpc/Component/SimpleNpcAnimationComponent");
const ROLE_PRIORITY = 7;
const VISION_PRIORITY = 11;
const MONSTER_PRIORITY = 10;
const NPC_PRIORITY = 9;
const OTHER_PRIORITY = 8;
exports.USE_ENTITY_POOL = !0;
class WorldEntityHelper {
  static Initialize() {
    return this.Oir(), this.kir(), this.Fir(), !0;
  }
  static Clear() {
    return (
      this.ComponentPriority.clear(), this.Vir.clear(), this.Hir.clear(), !0
    );
  }
  static CreateWorldEntity(e) {
    const n = e.EntityData;
    let o = -1n;
    let t = void 0;
    switch (n.cVn) {
      case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
        if (
          ((e.Priority = MONSTER_PRIORITY), this.GetMonsterComponentRecord(e))
        )
          break;
        return;
      case Protocol_1.Aki.Protocol.HBs.Proto_Player:
        if (((e.Priority = ROLE_PRIORITY), this.GetRoleComponentRecord(e)))
          break;
        return;
      case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
        if (((e.Priority = VISION_PRIORITY), this.GetVisionComponentRecord(e)))
          break;
        return;
      case Protocol_1.Aki.Protocol.HBs.Proto_Animal:
        if (((e.Priority = OTHER_PRIORITY), this.GetAnimalComponentRecord(e)))
          break;
        return;
      case Protocol_1.Aki.Protocol.HBs.Proto_Custom:
        if (((e.Priority = OTHER_PRIORITY), this.GetCustomComponentRecord(e)))
          break;
        return;
      case Protocol_1.Aki.Protocol.HBs.Proto_Npc:
        switch (((e.Priority = NPC_PRIORITY), n.bvs || 0)) {
          case 1:
            this.jir &&
              ((t = CharacterController_1.CharacterController.SpawnEntity(
                this.jir,
              )),
              (o = this.jir));
            break;
          case 2:
            this.Wir &&
              ((t = CharacterController_1.CharacterController.SpawnEntity(
                this.Wir,
              )),
              (o = this.Wir));
            break;
          default:
            this.Kir &&
              ((t = CharacterController_1.CharacterController.SpawnEntity(
                this.Kir,
              )),
              (o = this.Kir));
        }
        if (t) (e.ComponentsKey = o), this.Qir(e);
        else {
          if (!this.GetNpcComponentRecord(e)) return;
          o = e.ComponentsKey;
        }
        break;
      case Protocol_1.Aki.Protocol.HBs.Proto_SceneItem:
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
      const n = e.Entity.GetComponent(0);
      if (n.IsNpc())
        switch (n.GetSubEntityType()) {
          case 1:
            this.jir = n.GetComponentKey();
            break;
          case 2:
            this.Wir = n.GetComponentKey();
            break;
          default:
            this.Kir = n.GetComponentKey();
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
    const n = CreateEntityData_1.CreateEntityData.GetAnimalComponentConfig(e);
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
      let o =
        CreateEntityData_1.CreateEntityData.GetMonsterComponent(
          e,
        )?.FightConfigId;
      if (!o) break;
      o = MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(o);
      if (!o || o.ExecutionId.length === 0) break;
      if (!e.AddComponent(ExecutionComponent_1.ExecutionComponent)) return !1;
    } while (0);
    return !(
      (CreateEntityData_1.CreateEntityData.IsRobot(e) &&
        !e.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent)) ||
      !e.AddComponent(PawnInfoManageComponent_1.PawnInfoManageComponent) ||
      !e.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent) ||
      !e.AddComponent(MonsterFlowComponent_1.MonsterFlowComponent) ||
      !e.AddComponent(CharacterPatrolComponent_1.CharacterPatrolComponent) ||
      !e.AddComponent(
        CharacterCombatMessageComponent_1.CharacterCombatMessageComponent,
      ) ||
      (CreateEntityData_1.CreateEntityData.GetBaseInfo(e)?.Category
        .MonsterMatchType === 4 &&
        !e.AddComponent(CharacterGaitComponent_1.CharacterGaitComponent)) ||
      !e.AddComponent(RolePreloadComponent_1.RolePreloadComponent)
    );
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
    return (
      !!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent) &&
      !!e.AddComponent(RoleAudioComponent_1.RoleAudioComponent) &&
      !!(
        e.AddComponent(
          RoleLocationSafetyComponent_1.RoleLocationSafetyComponent,
        ) &&
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
        e.AddComponent(RolePreloadComponent_1.RolePreloadComponent)
      ) &&
      (e.RegisterToGameBudgetController = !0)
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
    if (!e.AddComponent(CharacterSkillComponent_1.CharacterSkillComponent))
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
    let n = e.PbEntityInitData;
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
    const n = e.PbEntityInitData?.ComponentsData;
    if (!n) return !1;
    var o = e.GetPbModelConfig();
    var o = IEntity_1.componentsByEntityAki[o.EntityType];
    if (!o) return !1;
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent))
      return !1;
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent))
      return !1;
    if (!e.AddComponent(LevelTagComponent_1.LevelTagComponent)) return !1;
    for (const r of o)
      switch (r) {
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
            var n = e.EntityData;
            var n = n.bvs || 0;
            const o = this.Vir.get(n);
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
    const o = n.PbEntityInitData;
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
      const e = o?.ComponentsData;
      if (!o) break;
      if (!e) break;
      let t = n.GetPbModelConfig();
      if (!t) break;
      (t = t.EntityType), (t = IEntity_1.componentsByEntityAki[t]);
      if (!t) break;
      for (const C of t) {
        const r = e[C];
        if (!r)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                23,
                "初始化SceneItemEntity找不到对应的prefab配置",
                ["CreatureDataId", n.CreatureDataId],
                ["PbDataId", n.PbDataId],
                ["componentType", C],
              ),
            !1
          );
        if (!r.Disabled) {
          const m = this.Hir.get(C);
          if (m) {
            for (const i of m)
              if (!n.HasComponent(i)) {
                if (!n.AddComponent(i)) return !1;
                n.SetParam(i, r);
              }
            switch (C) {
              case "AdsorbComponent":
              case "FollowTrackComponent":
                n.EnableMovement = !0;
            }
          }
        }
      }
    } while (0);
    if (o?.ComponentsData) {
      var a = (0, IComponent_1.getComponent)(
        o.ComponentsData,
        "InteractComponent",
      );
      if (
        a &&
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
    a = CreateEntityData_1.CreateEntityData.GetBaseInfo(n);
    if (
      a?.IsShowNameOnHead &&
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
      a = (0, IComponent_1.getComponent)(o.ComponentsData, "WeaponComponent");
      if (
        a?.WeaponId &&
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
      (n.ComponentDataMap.get("Yvs") &&
        !n.AddComponent(
          SceneItemDropItemComponent_1.SceneItemDropItemComponent,
        )) ||
      (n.EnableMovement &&
        !n.AddComponent(
          SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
        ))
    );
  }
  static Qir(e) {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      e.SetParam(
        UeComponentTickManageComponent_1.UeComponentTickManageComponent,
        UE.TsCharacterDebugComponent_C.StaticClass(),
      );
  }
  static Oir() {
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
  static kir() {
    this.Vir.set(0, [
      CharacterActorComponent_1.CharacterActorComponent,
      ActorDebugMovementComponent_1.ActorDebugMovementComponent,
      PawnSensoryInfoComponent_1.PawnSensoryInfoComponent,
      BaseUnifiedStateComponent_1.BaseUnifiedStateComponent,
      NpcMoveComponent_1.NpcMoveComponent,
      CharacterAnimationComponent_1.CharacterAnimationComponent,
      CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent,
      LevelTagComponent_1.LevelTagComponent,
      PawnSensoryComponent_1.PawnSensoryComponent,
      NpcPerformComponent_1.NpcPerformComponent,
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
      this.Vir.set(1, [
        SimpleNpcActorComponent_1.SimpleNpcActorComponent,
        SimpleNpcAnimationComponent_1.SimpleNpcAnimationComponent,
        PawnSensoryInfoComponent_1.PawnSensoryInfoComponent,
        NpcPerformComponent_1.NpcPerformComponent,
        PawnPerceptionComponent_1.PawnPerceptionComponent,
        PawnInfoManageComponent_1.PawnInfoManageComponent,
        PawnHeadInfoComponent_1.PawnHeadInfoComponent,
        NpcFlowComponent_1.NpcFlowComponent,
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
        UeActorTickManageComponent_1.UeActorTickManageComponent,
        ScanComponent_1.ScanComponent,
      ]),
      this.Vir.set(2, [
        CharacterActorComponent_1.CharacterActorComponent,
        BaseUnifiedStateComponent_1.BaseUnifiedStateComponent,
        NpcMoveComponent_1.NpcMoveComponent,
        CharacterAnimationComponent_1.CharacterAnimationComponent,
        NpcPasserbyComponent_1.NpcPasserbyComponent,
        UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent,
        UeMovementTickManageComponent_1.UeMovementTickManageComponent,
        UeActorTickManageComponent_1.UeActorTickManageComponent,
      ]);
  }
  static Fir() {
    this.Hir.set("TreasureBoxComponent", [
      GamePlayTreasureBoxComponent_1.SceneItemTreasureBoxComponent,
    ]),
      this.Hir.set("TeleControl2", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemManipulatableComponent_1.SceneItemManipulatableComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
        SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent,
      ]),
      this.Hir.set("ItemFoundation2", [
        SceneItemOutletComponent_1.SceneItemOutletComponent,
      ]),
      this.Hir.set("DestructibleItem", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        DurablityComponent_1.DurabilityComponent,
        SceneItemDamageComponent_1.SceneItemDamageComponent,
      ]),
      this.Hir.set("AdsorbComponent", [
        PawnAdsorbComponent_1.PawnAdsorbComponent,
      ]),
      this.Hir.set("RangeComponent", [RangeComponent_1.RangeComponent]),
      this.Hir.set("TriggerComponent", [TriggerComponent_1.TriggerComponent]),
      this.Hir.set("TrampleComponent", [
        SceneItemGravityComponent_1.SceneItemGravityComponent,
      ]),
      this.Hir.set("TargetGearComponent", [
        SceneItemMoveComponent_1.SceneItemMoveComponent,
        SceneItemHitComponent_1.SceneItemHitComponent,
        GamePlayHitGearComponent_1.GamePlayHitGearComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
      ]),
      this.Hir.set("LiftComponent", [
        GamePlayElevatorComponent_1.GamePlayElevatorComponent,
      ]),
      this.Hir.set("ConveyorBeltComponent", [
        SceneItemConveyorBeltComponent_1.SceneItemConveyorBeltComponent,
      ]),
      this.Hir.set("FollowTrackComponent", [
        SceneItemTrackGuideComponent_1.SceneItemTrackGuideComponent,
      ]),
      this.Hir.set("NearbyTrackingComponent", [
        SceneItemNearbyTrackingComponent_1.SceneItemNearbyTrackingComponent,
      ]),
      this.Hir.set("SkyboxComponent", [
        PostProcessBridgeComponent_1.PostProcessBridgeComponent,
      ]),
      this.Hir.set("DungeonEntryComponent", [
        DungeonEntranceComponent_1.DungeonEntranceComponent,
      ]),
      this.Hir.set("BuffProducerComponent", [
        SceneItemBuffProducerComponent_1.SceneItemBuffProducerComponent,
      ]),
      this.Hir.set("BuffConsumerComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemBuffConsumerComponent_1.SceneItemBuffConsumerComponent,
      ]),
      this.Hir.set("ResetEntitiesPosComponent", [
        SceneItemResetPositionComponent_1.SceneItemResetPositionComponent,
      ]),
      this.Hir.set("RotatorComponent2", [
        SceneItemRotatorComponent_1.SceneItemRotatorComponent,
      ]),
      this.Hir.set("VisionItemComponent", [
        SceneItemCaptureComponent_1.SceneItemCaptureComponent,
      ]),
      this.Hir.set("GuideLineCreatorComponent", [
        SceneItemGuidePathComponent_1.SceneItemGuidePathComponent,
      ]),
      this.Hir.set("SceneItemMovementComponent", [
        SceneItemMoveComponent_1.SceneItemMoveComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
      ]),
      this.Hir.set("AdviseItemComponent", [
        SceneItemAdviceComponent_1.SceneItemAdviceComponent,
      ]),
      this.Hir.set("EntityStateAudioComponent", [
        SceneItemStateAudioComponent_1.SceneItemStateAudioComponent,
      ]),
      this.Hir.set("InteractAudioComponent", [
        SceneItemInteractAudioComponent_1.SceneItemInteractAudioComponent,
      ]),
      this.Hir.set("TimelineTrackControlComponent", [
        SceneItemTimeTrackControlComponent_1.SceneItemTimeTrackControlComponent,
      ]),
      this.Hir.set("SceneActorRefComponent", [
        SceneItemReferenceComponent_1.SceneItemReferenceComponent,
      ]),
      this.Hir.set("AttachTargetComponent", [
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
        SceneItemAttachTargetComponent_1.SceneItemAttachTargetComponent,
      ]),
      this.Hir.set("ReboundComponent", [
        SceneItemReboundComponent_1.SceneItemReboundComponent,
      ]),
      this.Hir.set("TurntableControlComponent", [
        SceneItemTurntableControllerComponent_1.SceneItemTurntableControllerComponent,
      ]),
      this.Hir.set("JigsawFoundation", [
        SceneItemJigsawBaseComponent_1.SceneItemJigsawBaseComponent,
        SceneItemMultiInteractionActorComponent_1.SceneItemMultiInteractionActorComponent,
      ]),
      this.Hir.set("JigsawItem", [
        SceneItemJigsawItemComponent_1.SceneItemJigsawItemComponent,
        SceneItemMultiInteractionActorComponent_1.SceneItemMultiInteractionActorComponent,
      ]),
      this.Hir.set("SceneBulletComponent", [
        SceneBulletComponent_1.SceneBulletComponent,
      ]),
      this.Hir.set("LevitateMagnetComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemMoveComponent_1.SceneItemMoveComponent,
        SceneItemLevitateMagnetComponent_1.SceneItemLevitateMagnetComponent,
        SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent,
      ]),
      this.Hir.set("AiAlertNotifyComponent", [
        SmartObjectComponent_1.SmartObjectComponent,
      ]),
      this.Hir.set("MonsterGachaItemComponent", [
        SceneItemMonsterGachaItemComponent_1.SceneItemMonsterGachaItemComponent,
      ]),
      this.Hir.set("ProgressBarControlComponent", [
        SceneItemProgressControlComponent_1.SceneItemProgressControlComponent,
      ]),
      this.Hir.set("ExploreSkillInteractComponent", [
        SceneItemExploreInteractComponent_1.SceneItemExploreInteractComponent,
      ]),
      this.Hir.set("HookLockPoint", [
        GrapplingHookPointComponent_1.GrapplingHookPointComponent,
        SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent,
      ]),
      this.Hir.set("FanComponent", [
        SceneItemFanComponent_1.SceneItemFanComponent,
        SceneItemHitComponent_1.SceneItemHitComponent,
        PawnInteractNewComponent_1.PawnInteractNewComponent,
        RangeComponent_1.RangeComponent,
      ]),
      this.Hir.set("ResetSelfPosComponent", [
        SceneItemResetSelfPositionComponent_1.SceneItemResetSelfPositionComponent,
      ]),
      this.Hir.set("TimeStopComponent", [
        SceneItemTimeStopMachineComponent_1.SceneItemTimeStopMachineComponent,
      ]),
      this.Hir.set("BeamCastComponent", [
        SceneItemBeamCastComponent_1.SceneItemBeamCastComponent,
        RangeComponent_1.RangeComponent,
      ]),
      this.Hir.set("BeamReceiveComponent", [
        SceneItemBeamReceiveComponent_1.SceneItemBeamReceiveComponent,
      ]),
      this.Hir.set("PortalComponent", [
        SceneItemPortalComponent_1.SceneItemPortalComponent,
      ]),
      this.Hir.set("BubbleComponent", [
        CharacterFlowComponent_1.CharacterFlowComponent,
        PawnHeadInfoComponent_1.PawnHeadInfoComponent,
      ]),
      this.Hir.set("PasserbyNpcSpawnComponent", [
        PasserbyGeneratorComponent_1.PasserbyGeneratorComponent,
      ]),
      this.Hir.set("EffectAreaComponent", [
        EffectAreaComponent_1.EffectAreaComponent,
      ]),
      this.Hir.set("PhysicsConstraintComponent", [
        SceneItemHitComponent_1.SceneItemHitComponent,
        SceneItemPhysicalAttachComponent_1.SceneItemPhysicalAttachComponent,
      ]);
  }
}
((exports.WorldEntityHelper = WorldEntityHelper).jir = 0n),
  (WorldEntityHelper.Kir = 0n),
  (WorldEntityHelper.Wir = 0n),
  (WorldEntityHelper.Vir = new Map()),
  (WorldEntityHelper.ComponentPriority = new Map()),
  (WorldEntityHelper.Hir = new Map()),
  (Global_1.Global.WorldEntityHelper = WorldEntityHelper);
// # sourceMappingURL=WorldEntityHelper.js.map
