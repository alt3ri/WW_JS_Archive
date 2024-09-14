"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnPerceptionComponent =
    exports.PawnInteractNewComponent =
    exports.PawnInfoManageComponent =
    exports.PawnAdsorbComponent =
    exports.UeSkeletalTickManageComponent =
    exports.UeMovementTickManageComponent =
    exports.UeComponentTickManageComponent =
    exports.UeActorTickManageComponent =
    exports.SplineMoveComponent =
    exports.PostProcessBridgeComponent =
    exports.PerformanceComponent =
    exports.LevelTagComponent =
    exports.InteractItemComponent =
    exports.DurabilityComponent =
    exports.BaseUnifiedStateComponent =
    exports.BaseTagComponent =
    exports.CharacterManipulateComponent =
    exports.CharacterLogicStateSyncComponent =
    exports.CharacterLevelShootComponent =
    exports.CharacterInputComponent =
    exports.CharacterHitComponent =
    exports.CharacterGlideComponent =
    exports.CharacterGaitComponent =
    exports.CharacterFootEffectComponent =
    exports.CharacterFollowComponent =
    exports.CharacterFightStateComponent =
    exports.CharacterExploreComponent =
    exports.CharacterCombatMessageComponent =
    exports.CharacterCaughtNewComponent =
    exports.CharacterAudioComponent =
    exports.CharacterAnimationSyncComponent =
    exports.CharacterAnimationComponent =
    exports.CharacterAiComponent =
    exports.CharacterActorComponent =
    exports.CharacterActionComponent =
    exports.VisionBuffComponent =
    exports.CharacterUnifiedStateComponent =
    exports.CharacterTriggerComponent =
    exports.CharacterStatisticsComponent =
    exports.CharacterPassiveSkillComponent =
    exports.CharacterMontageComponent =
    exports.CharacterGasDebugComponent =
    exports.CharacterGameplayCueComponent =
    exports.CharacterDamageComponent =
    exports.CharacterBuffComponent =
    exports.CharacterAttributeComponent =
    exports.CharacterAbilityComponent =
    exports.AnimalStateMachineComponent =
    exports.AnimalPerformComponent =
    exports.AnimalDeathSyncComponent =
      void 0),
  (exports.SceneItemResetPositionComponent =
    exports.SceneItemReferenceComponent =
    exports.SceneItemReboundComponent =
    exports.SceneItemOutletComponent =
    exports.SceneItemNearbyTrackingComponent =
    exports.SceneItemMultiInteractionActorComponent =
    exports.SceneItemMovementSyncComponent =
    exports.SceneItemMonsterGachaItemComponent =
    exports.SceneItemManipulatableComponent =
    exports.SceneItemLevitateMagnetComponent =
    exports.SceneItemHitComponent =
    exports.SceneItemGuidePathComponent =
    exports.SceneItemGravityComponent =
    exports.SceneItemFanComponent =
    exports.SceneItemExploreInteractComponent =
    exports.SceneItemDropItemComponent =
    exports.SceneItemDamageComponent =
    exports.SceneItemConveyorBeltComponent =
    exports.SceneItemCaptureComponent =
    exports.SceneItemBuffProducerComponent =
    exports.SceneItemBuffConsumerComponent =
    exports.SceneItemBeamReceiveComponent =
    exports.SceneItemBeamCastComponent =
    exports.SceneItemAiInteractionComponent =
    exports.SceneItemAdviceComponent =
    exports.SceneItemActorComponent =
    exports.SceneBulletComponent =
    exports.SceneItemJigsawItemComponent =
    exports.SceneItemJigsawBaseComponent =
    exports.SceneItemTreasureBoxComponent =
    exports.GamePlayHitGearComponent =
    exports.GamePlayElevatorComponent =
    exports.SmartObjectComponent =
    exports.SceneItemTurntableControllerComponent =
    exports.SceneItemTimeTrackControlComponent =
    exports.SceneItemStateComponent =
    exports.SceneItemStateAudioComponent =
    exports.SceneItemPropertyComponent =
    exports.SceneItemProgressControlComponent =
    exports.SceneItemPortalComponent =
    exports.SceneItemPhysicalAttachComponent =
    exports.SceneItemMoveComponent =
    exports.SceneItemInteractAudioComponent =
    exports.SceneItemDynamicAttachTargetComponent =
    exports.SceneItemDebugComponent =
    exports.SceneItemAttachTargetComponent =
    exports.EffectAreaComponent =
    exports.AiWeaponMovementComponent =
    exports.PawnSensoryInfoComponent =
    exports.PawnSensoryComponent =
      void 0),
  (exports.SceneItemTrackGuideComponent =
    exports.SceneItemTimeStopMachineComponent =
    exports.SceneItemTimeScaleComponent =
    exports.SceneItemRotatorComponent =
    exports.SceneItemResetSelfPositionComponent =
      void 0);
var AnimalDeathSyncComponent_1 = require("../NewWorld/Character/Animal/Component/AnimalDeathSyncComponent"),
  AnimalPerformComponent_1 =
    (Object.defineProperty(exports, "AnimalDeathSyncComponent", {
      enumerable: !0,
      get: function () {
        return AnimalDeathSyncComponent_1.AnimalDeathSyncComponent;
      },
    }),
    require("../NewWorld/Character/Animal/Component/AnimalPerformComponent")),
  AnimalStateMachineComponent_1 =
    (Object.defineProperty(exports, "AnimalPerformComponent", {
      enumerable: !0,
      get: function () {
        return AnimalPerformComponent_1.AnimalPerformComponent;
      },
    }),
    require("../NewWorld/Character/Animal/Component/AnimalStateMachineComponent")),
  CharacterAbilityComponent_1 =
    (Object.defineProperty(exports, "AnimalStateMachineComponent", {
      enumerable: !0,
      get: function () {
        return AnimalStateMachineComponent_1.AnimalStateMachineComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterAbilityComponent")),
  CharacterAttributeComponent_1 =
    (Object.defineProperty(exports, "CharacterAbilityComponent", {
      enumerable: !0,
      get: function () {
        return CharacterAbilityComponent_1.CharacterAbilityComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterAttributeComponent")),
  CharacterBuffComponent_1 =
    (Object.defineProperty(exports, "CharacterAttributeComponent", {
      enumerable: !0,
      get: function () {
        return CharacterAttributeComponent_1.CharacterAttributeComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterBuffComponent")),
  CharacterDamageComponent_1 =
    (Object.defineProperty(exports, "CharacterBuffComponent", {
      enumerable: !0,
      get: function () {
        return CharacterBuffComponent_1.CharacterBuffComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterDamageComponent")),
  CharacterGameplayCueComponent_1 =
    (Object.defineProperty(exports, "CharacterDamageComponent", {
      enumerable: !0,
      get: function () {
        return CharacterDamageComponent_1.CharacterDamageComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterGameplayCueComponent")),
  CharacterGasDebugComponent_1 =
    (Object.defineProperty(exports, "CharacterGameplayCueComponent", {
      enumerable: !0,
      get: function () {
        return CharacterGameplayCueComponent_1.CharacterGameplayCueComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterGasDebugComponent")),
  CharacterMontageComponent_1 =
    (Object.defineProperty(exports, "CharacterGasDebugComponent", {
      enumerable: !0,
      get: function () {
        return CharacterGasDebugComponent_1.CharacterGasDebugComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterMontageComponent")),
  CharacterPassiveSkillComponent_1 =
    (Object.defineProperty(exports, "CharacterMontageComponent", {
      enumerable: !0,
      get: function () {
        return CharacterMontageComponent_1.CharacterMontageComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterPassiveSkillComponent")),
  CharacterStatisticsComponent_1 =
    (Object.defineProperty(exports, "CharacterPassiveSkillComponent", {
      enumerable: !0,
      get: function () {
        return CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterStatisticsComponent")),
  CharacterTriggerComponent_1 =
    (Object.defineProperty(exports, "CharacterStatisticsComponent", {
      enumerable: !0,
      get: function () {
        return CharacterStatisticsComponent_1.CharacterStatisticsComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterTriggerComponent")),
  CharacterUnifiedStateComponent_1 =
    (Object.defineProperty(exports, "CharacterTriggerComponent", {
      enumerable: !0,
      get: function () {
        return CharacterTriggerComponent_1.CharacterTriggerComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateComponent")),
  VisionBuffComponent_1 =
    (Object.defineProperty(exports, "CharacterUnifiedStateComponent", {
      enumerable: !0,
      get: function () {
        return CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Abilities/VisionBuffComponent")),
  CharacterActionComponent_1 =
    (Object.defineProperty(exports, "VisionBuffComponent", {
      enumerable: !0,
      get: function () {
        return VisionBuffComponent_1.VisionBuffComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/Action/CharacterActionComponent")),
  CharacterActorComponent_1 =
    (Object.defineProperty(exports, "CharacterActionComponent", {
      enumerable: !0,
      get: function () {
        return CharacterActionComponent_1.CharacterActionComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterActorComponent")),
  CharacterAiComponent_1 =
    (Object.defineProperty(exports, "CharacterActorComponent", {
      enumerable: !0,
      get: function () {
        return CharacterActorComponent_1.CharacterActorComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterAiComponent")),
  CharacterAnimationComponent_1 =
    (Object.defineProperty(exports, "CharacterAiComponent", {
      enumerable: !0,
      get: function () {
        return CharacterAiComponent_1.CharacterAiComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterAnimationComponent")),
  CharacterAnimationSyncComponent_1 =
    (Object.defineProperty(exports, "CharacterAnimationComponent", {
      enumerable: !0,
      get: function () {
        return CharacterAnimationComponent_1.CharacterAnimationComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterAnimationSyncComponent")),
  CharacterAudioComponent_1 =
    (Object.defineProperty(exports, "CharacterAnimationSyncComponent", {
      enumerable: !0,
      get: function () {
        return CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterAudioComponent")),
  CharacterCaughtNewComponent_1 =
    (Object.defineProperty(exports, "CharacterAudioComponent", {
      enumerable: !0,
      get: function () {
        return CharacterAudioComponent_1.CharacterAudioComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterCaughtNewComponent")),
  CharacterCombatMessageComponent_1 =
    (Object.defineProperty(exports, "CharacterCaughtNewComponent", {
      enumerable: !0,
      get: function () {
        return CharacterCaughtNewComponent_1.CharacterCaughtNewComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterCombatMessageComponent")),
  CharacterExploreComponent_1 =
    (Object.defineProperty(exports, "CharacterCombatMessageComponent", {
      enumerable: !0,
      get: function () {
        return CharacterCombatMessageComponent_1.CharacterCombatMessageComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterExploreComponent")),
  CharacterFightStateComponent_1 =
    (Object.defineProperty(exports, "CharacterExploreComponent", {
      enumerable: !0,
      get: function () {
        return CharacterExploreComponent_1.CharacterExploreComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterFightStateComponent")),
  CharacterFollowComponent_1 =
    (Object.defineProperty(exports, "CharacterFightStateComponent", {
      enumerable: !0,
      get: function () {
        return CharacterFightStateComponent_1.CharacterFightStateComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterFollowComponent")),
  CharacterFootEffectComponent_1 =
    (Object.defineProperty(exports, "CharacterFollowComponent", {
      enumerable: !0,
      get: function () {
        return CharacterFollowComponent_1.CharacterFollowComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterFootEffectComponent")),
  CharacterGaitComponent_1 =
    (Object.defineProperty(exports, "CharacterFootEffectComponent", {
      enumerable: !0,
      get: function () {
        return CharacterFootEffectComponent_1.CharacterFootEffectComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterGaitComponent")),
  CharacterGlideComponent_1 =
    (Object.defineProperty(exports, "CharacterGaitComponent", {
      enumerable: !0,
      get: function () {
        return CharacterGaitComponent_1.CharacterGaitComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterGlideComponent")),
  CharacterHitComponent_1 =
    (Object.defineProperty(exports, "CharacterGlideComponent", {
      enumerable: !0,
      get: function () {
        return CharacterGlideComponent_1.CharacterGlideComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterHitComponent")),
  CharacterInputComponent_1 =
    (Object.defineProperty(exports, "CharacterHitComponent", {
      enumerable: !0,
      get: function () {
        return CharacterHitComponent_1.CharacterHitComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterInputComponent")),
  CharacterLevelShootComponent_1 =
    (Object.defineProperty(exports, "CharacterInputComponent", {
      enumerable: !0,
      get: function () {
        return CharacterInputComponent_1.CharacterInputComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterLevelShootComponent")),
  CharacterLogicStateSyncComponent_1 =
    (Object.defineProperty(exports, "CharacterLevelShootComponent", {
      enumerable: !0,
      get: function () {
        return CharacterLevelShootComponent_1.CharacterLevelShootComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterLogicStateSyncComponent")),
  CharacterManipulateComponent_1 =
    (Object.defineProperty(exports, "CharacterLogicStateSyncComponent", {
      enumerable: !0,
      get: function () {
        return CharacterLogicStateSyncComponent_1.CharacterLogicStateSyncComponent;
      },
    }),
    require("../NewWorld/Character/Common/Component/CharacterManipulateComponent")),
  BaseTagComponent_1 =
    (Object.defineProperty(exports, "CharacterManipulateComponent", {
      enumerable: !0,
      get: function () {
        return CharacterManipulateComponent_1.CharacterManipulateComponent;
      },
    }),
    require("../NewWorld/Common/Component/BaseTagComponent")),
  BaseUnifiedStateComponent_1 =
    (Object.defineProperty(exports, "BaseTagComponent", {
      enumerable: !0,
      get: function () {
        return BaseTagComponent_1.BaseTagComponent;
      },
    }),
    require("../NewWorld/Common/Component/BaseUnifiedStateComponent")),
  DurablityComponent_1 =
    (Object.defineProperty(exports, "BaseUnifiedStateComponent", {
      enumerable: !0,
      get: function () {
        return BaseUnifiedStateComponent_1.BaseUnifiedStateComponent;
      },
    }),
    require("../NewWorld/Common/Component/DurablityComponent")),
  InteractItemComponent_1 =
    (Object.defineProperty(exports, "DurabilityComponent", {
      enumerable: !0,
      get: function () {
        return DurablityComponent_1.DurabilityComponent;
      },
    }),
    require("../NewWorld/Common/Component/InteractItemComponent")),
  LevelTagComponent_1 =
    (Object.defineProperty(exports, "InteractItemComponent", {
      enumerable: !0,
      get: function () {
        return InteractItemComponent_1.InteractItemComponent;
      },
    }),
    require("../NewWorld/Common/Component/LevelTagComponent")),
  PerformanceComponent_1 =
    (Object.defineProperty(exports, "LevelTagComponent", {
      enumerable: !0,
      get: function () {
        return LevelTagComponent_1.LevelTagComponent;
      },
    }),
    require("../NewWorld/Common/Component/PerformanceComponent")),
  PostProcessBridgeComponent_1 =
    (Object.defineProperty(exports, "PerformanceComponent", {
      enumerable: !0,
      get: function () {
        return PerformanceComponent_1.PerformanceComponent;
      },
    }),
    require("../NewWorld/Common/Component/PostProcessBridgeComponent")),
  SplineMoveComponent_1 =
    (Object.defineProperty(exports, "PostProcessBridgeComponent", {
      enumerable: !0,
      get: function () {
        return PostProcessBridgeComponent_1.PostProcessBridgeComponent;
      },
    }),
    require("../NewWorld/Common/Component/SplineMoveComponent")),
  UeActorTickManageComponent_1 =
    (Object.defineProperty(exports, "SplineMoveComponent", {
      enumerable: !0,
      get: function () {
        return SplineMoveComponent_1.SplineMoveComponent;
      },
    }),
    require("../NewWorld/Common/Component/UeActorTickManageComponent")),
  UeComponentTickManageComponent_1 =
    (Object.defineProperty(exports, "UeActorTickManageComponent", {
      enumerable: !0,
      get: function () {
        return UeActorTickManageComponent_1.UeActorTickManageComponent;
      },
    }),
    require("../NewWorld/Common/Component/UeComponentTickManageComponent")),
  UeMovementTickManageComponent_1 =
    (Object.defineProperty(exports, "UeComponentTickManageComponent", {
      enumerable: !0,
      get: function () {
        return UeComponentTickManageComponent_1.UeComponentTickManageComponent;
      },
    }),
    require("../NewWorld/Common/Component/UeMovementTickManageComponent")),
  UeSkeletalTickManageComponent_1 =
    (Object.defineProperty(exports, "UeMovementTickManageComponent", {
      enumerable: !0,
      get: function () {
        return UeMovementTickManageComponent_1.UeMovementTickManageComponent;
      },
    }),
    require("../NewWorld/Common/Component/UeSkeletalTickManageComponent")),
  PawnAdsorbComponent_1 =
    (Object.defineProperty(exports, "UeSkeletalTickManageComponent", {
      enumerable: !0,
      get: function () {
        return UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent;
      },
    }),
    require("../NewWorld/Pawn/Component/PawnAdsorbComponent")),
  PawnInfoManageComponent_1 =
    (Object.defineProperty(exports, "PawnAdsorbComponent", {
      enumerable: !0,
      get: function () {
        return PawnAdsorbComponent_1.PawnAdsorbComponent;
      },
    }),
    require("../NewWorld/Pawn/Component/PawnInfoManageComponent")),
  PawnInteractNewComponent_1 =
    (Object.defineProperty(exports, "PawnInfoManageComponent", {
      enumerable: !0,
      get: function () {
        return PawnInfoManageComponent_1.PawnInfoManageComponent;
      },
    }),
    require("../NewWorld/Pawn/Component/PawnInteractNewComponent")),
  PawnPerceptionComponent_1 =
    (Object.defineProperty(exports, "PawnInteractNewComponent", {
      enumerable: !0,
      get: function () {
        return PawnInteractNewComponent_1.PawnInteractNewComponent;
      },
    }),
    require("../NewWorld/Pawn/Component/PawnPerceptionComponent")),
  PawnSensoryComponent_1 =
    (Object.defineProperty(exports, "PawnPerceptionComponent", {
      enumerable: !0,
      get: function () {
        return PawnPerceptionComponent_1.PawnPerceptionComponent;
      },
    }),
    require("../NewWorld/Pawn/Component/PawnSensoryComponent")),
  PawnSensoryInfoComponent_1 =
    (Object.defineProperty(exports, "PawnSensoryComponent", {
      enumerable: !0,
      get: function () {
        return PawnSensoryComponent_1.PawnSensoryComponent;
      },
    }),
    require("../NewWorld/Pawn/Component/PawnSensoryInfoComponent")),
  AiWeaponMovementComponent_1 =
    (Object.defineProperty(exports, "PawnSensoryInfoComponent", {
      enumerable: !0,
      get: function () {
        return PawnSensoryInfoComponent_1.PawnSensoryInfoComponent;
      },
    }),
    require("../NewWorld/SceneItem/AiInteraction/AiWeaponMovementComponent")),
  EffectAreaComponent_1 =
    (Object.defineProperty(exports, "AiWeaponMovementComponent", {
      enumerable: !0,
      get: function () {
        return AiWeaponMovementComponent_1.AiWeaponMovementComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/EffectAreaComponent")),
  SceneItemAttachTargetComponent_1 =
    (Object.defineProperty(exports, "EffectAreaComponent", {
      enumerable: !0,
      get: function () {
        return EffectAreaComponent_1.EffectAreaComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemAttachTargetComponent")),
  SceneItemDebugComponent_1 =
    (Object.defineProperty(exports, "SceneItemAttachTargetComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemAttachTargetComponent_1.SceneItemAttachTargetComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemDebugComponent")),
  SceneItemDynamicAttachTargetComponent_1 =
    (Object.defineProperty(exports, "SceneItemDebugComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemDebugComponent_1.SceneItemDebugComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent")),
  SceneItemInteractAudioComponent_1 =
    (Object.defineProperty(exports, "SceneItemDynamicAttachTargetComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemInteractAudioComponent")),
  SceneItemMoveComponent_1 =
    (Object.defineProperty(exports, "SceneItemInteractAudioComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemInteractAudioComponent_1.SceneItemInteractAudioComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent")),
  SceneItemPhysicalAttachComponent_1 =
    (Object.defineProperty(exports, "SceneItemMoveComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemMoveComponent_1.SceneItemMoveComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemPhysicalAttachComponent")),
  SceneItemPortalComponent_1 =
    (Object.defineProperty(exports, "SceneItemPhysicalAttachComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemPhysicalAttachComponent_1.SceneItemPhysicalAttachComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemPortalComponent")),
  SceneItemProgressControlComponent_1 =
    (Object.defineProperty(exports, "SceneItemPortalComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemPortalComponent_1.SceneItemPortalComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemProgressControlComponent")),
  SceneItemPropertyComponent_1 =
    (Object.defineProperty(exports, "SceneItemProgressControlComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemProgressControlComponent_1.SceneItemProgressControlComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemPropertyComponent")),
  SceneItemStateAudioComponent_1 =
    (Object.defineProperty(exports, "SceneItemPropertyComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemPropertyComponent_1.SceneItemPropertyComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemStateAudioComponent")),
  SceneItemStateComponent_1 =
    (Object.defineProperty(exports, "SceneItemStateAudioComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemStateAudioComponent_1.SceneItemStateAudioComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemStateComponent")),
  SceneItemTimeTrackControlComponent_1 =
    (Object.defineProperty(exports, "SceneItemStateComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemStateComponent_1.SceneItemStateComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemTimeTrackControlComponent")),
  SceneItemTurntableControllerComponent_1 =
    (Object.defineProperty(exports, "SceneItemTimeTrackControlComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemTimeTrackControlComponent_1.SceneItemTimeTrackControlComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SceneItemTurntableControllerComponent")),
  SmartObjectComponent_1 =
    (Object.defineProperty(exports, "SceneItemTurntableControllerComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemTurntableControllerComponent_1.SceneItemTurntableControllerComponent;
      },
    }),
    require("../NewWorld/SceneItem/Common/Component/SmartObjectComponent")),
  GamePlayElevatorComponent_1 =
    (Object.defineProperty(exports, "SmartObjectComponent", {
      enumerable: !0,
      get: function () {
        return SmartObjectComponent_1.SmartObjectComponent;
      },
    }),
    require("../NewWorld/SceneItem/GamePlayElevatorComponent")),
  GamePlayHitGearComponent_1 =
    (Object.defineProperty(exports, "GamePlayElevatorComponent", {
      enumerable: !0,
      get: function () {
        return GamePlayElevatorComponent_1.GamePlayElevatorComponent;
      },
    }),
    require("../NewWorld/SceneItem/GamePlayHitGearComponent")),
  GamePlayTreasureBoxComponent_1 =
    (Object.defineProperty(exports, "GamePlayHitGearComponent", {
      enumerable: !0,
      get: function () {
        return GamePlayHitGearComponent_1.GamePlayHitGearComponent;
      },
    }),
    require("../NewWorld/SceneItem/GamePlayTreasureBoxComponent")),
  SceneItemJigsawBaseComponent_1 =
    (Object.defineProperty(exports, "SceneItemTreasureBoxComponent", {
      enumerable: !0,
      get: function () {
        return GamePlayTreasureBoxComponent_1.SceneItemTreasureBoxComponent;
      },
    }),
    require("../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent")),
  SceneItemJigsawItemComponent_1 =
    (Object.defineProperty(exports, "SceneItemJigsawBaseComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemJigsawBaseComponent_1.SceneItemJigsawBaseComponent;
      },
    }),
    require("../NewWorld/SceneItem/Jigsaw/SceneItemJigsawItemComponent")),
  SceneBulletComponent_1 =
    (Object.defineProperty(exports, "SceneItemJigsawItemComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemJigsawItemComponent_1.SceneItemJigsawItemComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneBulletComponent")),
  SceneItemActorComponent_1 =
    (Object.defineProperty(exports, "SceneBulletComponent", {
      enumerable: !0,
      get: function () {
        return SceneBulletComponent_1.SceneBulletComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemActorComponent")),
  SceneItemAdviceComponent_1 =
    (Object.defineProperty(exports, "SceneItemActorComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemActorComponent_1.SceneItemActorComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemAdviceComponent")),
  SceneItemAiInteractionComponent_1 =
    (Object.defineProperty(exports, "SceneItemAdviceComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemAdviceComponent_1.SceneItemAdviceComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemAiInteractionComponent")),
  SceneItemBeamCastComponent_1 =
    (Object.defineProperty(exports, "SceneItemAiInteractionComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemAiInteractionComponent_1.SceneItemAiInteractionComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemBeamCastComponent")),
  SceneItemBeamReceiveComponent_1 =
    (Object.defineProperty(exports, "SceneItemBeamCastComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemBeamCastComponent_1.SceneItemBeamCastComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemBeamReceiveComponent")),
  SceneItemBuffConsumerComponent_1 =
    (Object.defineProperty(exports, "SceneItemBeamReceiveComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemBeamReceiveComponent_1.SceneItemBeamReceiveComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemBuffConsumerComponent")),
  SceneItemBuffProducerComponent_1 =
    (Object.defineProperty(exports, "SceneItemBuffConsumerComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemBuffConsumerComponent_1.SceneItemBuffConsumerComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemBuffProducerComponent")),
  SceneItemCaptureComponent_1 =
    (Object.defineProperty(exports, "SceneItemBuffProducerComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemBuffProducerComponent_1.SceneItemBuffProducerComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemCaptureComponent")),
  SceneItemConveyorBeltComponent_1 =
    (Object.defineProperty(exports, "SceneItemCaptureComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemCaptureComponent_1.SceneItemCaptureComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemConveyorBeltComponent")),
  SceneItemDamageComponent_1 =
    (Object.defineProperty(exports, "SceneItemConveyorBeltComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemConveyorBeltComponent_1.SceneItemConveyorBeltComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemDamageComponent")),
  SceneItemDropItemComponent_1 =
    (Object.defineProperty(exports, "SceneItemDamageComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemDamageComponent_1.SceneItemDamageComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemDropItemComponent")),
  SceneItemExploreInteractComponent_1 =
    (Object.defineProperty(exports, "SceneItemDropItemComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemDropItemComponent_1.SceneItemDropItemComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemExploreInteractComponent")),
  SceneItemFanComponent_1 =
    (Object.defineProperty(exports, "SceneItemExploreInteractComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemExploreInteractComponent_1.SceneItemExploreInteractComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemFanComponent")),
  SceneItemGravityComponent_1 =
    (Object.defineProperty(exports, "SceneItemFanComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemFanComponent_1.SceneItemFanComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemGravityComponent")),
  SceneItemGuidePathComponent_1 =
    (Object.defineProperty(exports, "SceneItemGravityComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemGravityComponent_1.SceneItemGravityComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemGuidePathComponent")),
  SceneItemHitComponent_1 =
    (Object.defineProperty(exports, "SceneItemGuidePathComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemGuidePathComponent_1.SceneItemGuidePathComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemHitComponent")),
  SceneItemLevitateMagnetComponent_1 =
    (Object.defineProperty(exports, "SceneItemHitComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemHitComponent_1.SceneItemHitComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemLevitateMagnetComponent")),
  SceneItemManipulatableComponent_1 =
    (Object.defineProperty(exports, "SceneItemLevitateMagnetComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemLevitateMagnetComponent_1.SceneItemLevitateMagnetComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemManipulatableComponent")),
  SceneItemMonsterGachaItemComponent_1 =
    (Object.defineProperty(exports, "SceneItemManipulatableComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemManipulatableComponent_1.SceneItemManipulatableComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemMonsterGachaItemComponent")),
  SceneItemMovementSyncComponent_1 =
    (Object.defineProperty(exports, "SceneItemMonsterGachaItemComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemMonsterGachaItemComponent_1.SceneItemMonsterGachaItemComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemMovementSyncComponent")),
  SceneItemMultiInteractionActorComponent_1 =
    (Object.defineProperty(exports, "SceneItemMovementSyncComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemMultiInteractionActorComponent")),
  SceneItemNearbyTrackingComponent_1 =
    (Object.defineProperty(exports, "SceneItemMultiInteractionActorComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemMultiInteractionActorComponent_1.SceneItemMultiInteractionActorComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemNearbyTrackingComponent")),
  SceneItemOutletComponent_1 =
    (Object.defineProperty(exports, "SceneItemNearbyTrackingComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemNearbyTrackingComponent_1.SceneItemNearbyTrackingComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemOutletComponent")),
  SceneItemReboundComponent_1 =
    (Object.defineProperty(exports, "SceneItemOutletComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemOutletComponent_1.SceneItemOutletComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemReboundComponent")),
  SceneItemReferenceComponent_1 =
    (Object.defineProperty(exports, "SceneItemReboundComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemReboundComponent_1.SceneItemReboundComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemReferenceComponent")),
  SceneItemResetPositionComponent_1 =
    (Object.defineProperty(exports, "SceneItemReferenceComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemReferenceComponent_1.SceneItemReferenceComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemResetPositionComponent")),
  SceneItemResetSelfPositionComponent_1 =
    (Object.defineProperty(exports, "SceneItemResetPositionComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemResetPositionComponent_1.SceneItemResetPositionComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemResetSelfPositionComponent")),
  SceneItemRotatorComponent_1 =
    (Object.defineProperty(exports, "SceneItemResetSelfPositionComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemResetSelfPositionComponent_1.SceneItemResetSelfPositionComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemRotatorComponent")),
  SceneItemTimeScaleComponent_1 =
    (Object.defineProperty(exports, "SceneItemRotatorComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemRotatorComponent_1.SceneItemRotatorComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemTimeScaleComponent")),
  SceneItemTimeStopMachineComponent_1 =
    (Object.defineProperty(exports, "SceneItemTimeScaleComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemTimeScaleComponent_1.SceneItemTimeScaleComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemTimeStopMachineComponent")),
  SceneItemTrackGuideComponent_1 =
    (Object.defineProperty(exports, "SceneItemTimeStopMachineComponent", {
      enumerable: !0,
      get: function () {
        return SceneItemTimeStopMachineComponent_1.SceneItemTimeStopMachineComponent;
      },
    }),
    require("../NewWorld/SceneItem/SceneItemTrackGuideComponent"));
Object.defineProperty(exports, "SceneItemTrackGuideComponent", {
  enumerable: !0,
  get: function () {
    return SceneItemTrackGuideComponent_1.SceneItemTrackGuideComponent;
  },
});
//# sourceMappingURL=PreloadEntityComponentClassPart1.js.map
