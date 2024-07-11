"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.decompressEntityData =
    exports.EDevelopmentStatus =
    exports.getRewardTypeConfig =
    exports.entityTypesAki =
    exports.entityTypesUe5 =
    exports.componentsByEntityAki =
    exports.componentsByEntityUe5 =
      void 0);
const IComponent_1 = require("./IComponent"),
  IUtil_1 = require("./IUtil"),
  collectRewardEntityTypes =
    ((exports.componentsByEntityUe5 = {
      Player: [],
      AiNpc: [
        "BaseInfoComponent",
        "StateComponent",
        "FlowComponent",
        "BehaviorFlowComponent",
        "TalkComponent",
        "MoveComponent",
        "NpcComponent",
        "InteractiveComponent",
        "NpcPerformComponent",
      ],
      CharacterEntity: [],
      Entity: ["BaseInfoComponent"],
      Lamp: [
        "LampComponent",
        "EventComponent",
        "StateComponent",
        "BaseInfoComponent",
      ],
      Npc: [
        "BaseInfoComponent",
        "StateComponent",
        "FlowComponent",
        "BehaviorFlowComponent",
        "TalkComponent",
        "NpcComponent",
        "EntitySpawnerComponent",
      ],
      RefreshSingle: [
        "RefreshSingleComponent",
        "StateComponent",
        "EntitySpawnerComponent",
        "BaseInfoComponent",
      ],
      RefreshEntity: [
        "BaseInfoComponent",
        "RefreshEntityComponent",
        "StateComponent",
      ],
      Rotator: [
        "BaseInfoComponent",
        "RotatorComponent",
        "StateComponent",
        "EventComponent",
      ],
      SphereActor: ["BaseInfoComponent", "SphereComponent", "GrabComponent"],
      SphereFactory: [
        "BaseInfoComponent",
        "SphereFactoryComponent",
        "EntitySpawnerComponent",
        "EventComponent",
        "StateComponent",
      ],
      Spring: ["SpringComponent", "BaseInfoComponent"],
      SpringBoard: [
        "BaseInfoComponent",
        "SpringBoardComponent",
        "StateComponent",
        "SimpleComponent",
      ],
      StateEntity: [
        "BaseInfoComponent",
        "EntityStateComponent",
        "StateComponent",
        "ActorStateComponent",
        "CalculateComponent",
        "VarComponent",
        "EntitySpawnerComponent",
      ],
      Switcher: [
        "BaseInfoComponent",
        "StateComponent",
        "EntityStateComponent",
        "ActorStateComponent",
        "CalculateComponent",
        "SwitcherComponent",
        "EntitySpawnerComponent",
      ],
      Trample: [
        "BaseInfoComponent",
        "TrampleUe5Component",
        "SimpleComponent",
        "StateComponent",
      ],
      TriggerUe5: [
        "BaseInfoComponent",
        "StateComponent",
        "TriggerUe5Component",
        "EntitySpawnerComponent",
      ],
      Trigger: ["BaseInfoComponent", "TriggerComponent", "RangeComponent"],
      Underground: [
        "BaseInfoComponent",
        "UndergroundComponent",
        "StateComponent",
        "EventComponent",
      ],
      RefreshComponent: [
        "BaseInfoComponent",
        "InteractiveComponent",
        "RefreshComponent",
        "RewardComponent",
      ],
      EntityPackage: ["BaseInfoComponent", "EntityPackageComponent"],
    }),
    (exports.componentsByEntityAki = {
      Position: ["BaseInfoComponent"],
      Range: ["BaseInfoComponent", "RangeComponent"],
      Item: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "AdsorbComponent",
        "RewardComponent",
      ],
      Drop: [
        "BaseInfoComponent",
        "ModelComponent",
        "DropComponent",
        "InteractComponent",
      ],
      VisionItem: [
        "BaseInfoComponent",
        "ModelComponent",
        "VisionItemComponent",
        "InteractComponent",
      ],
      AdviseItem: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "AdviseItemComponent",
        "InteractComponent",
      ],
      Weapon: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "CollectComponent",
        "RewardComponent",
        "WeaponComponent",
        "RefreshComponent",
        "InteractAudioComponent",
      ],
      Gear: ["BaseInfoComponent", "ModelComponent", "AiComponent"],
      FollowTrack: [
        "BaseInfoComponent",
        "ModelComponent",
        "FollowTrackComponent",
        "SceneItemLifeCycleComponent",
        "EntityStateComponent",
      ],
      FollowTrackFoundation: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "RewardComponent",
      ],
      Animal: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "CollectComponent",
        "AiComponent",
        "LevelAiComponent",
        "RefreshComponent",
        "RewardComponent",
        "AnimalComponent",
        "VarComponent",
        "InteractAudioComponent",
      ],
      CombatAnimal: [
        "BaseInfoComponent",
        "ModelComponent",
        "AiComponent",
        "AttributeComponent",
        "RefreshComponent",
        "RewardComponent",
        "CombatComponent",
        "AnimalComponent",
      ],
      Npc: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "AiComponent",
        "LevelAiComponent",
        "NpcPerformComponent",
        "EntityVisibleComponent",
        "BubbleComponent",
        "VarComponent",
      ],
      SimpleNPc: [
        "BaseInfoComponent",
        "ModelComponent",
        "NpcPerformComponent",
        "EntityVisibleComponent",
        "BubbleComponent",
      ],
      PasserbyNpc: ["BaseInfoComponent", "ModelComponent"],
      Monster: [
        "BaseInfoComponent",
        "ModelComponent",
        "AiComponent",
        "AttributeComponent",
        "RewardComponent",
        "VisionCaptureComponent",
        "MonsterComponent",
        "CombatComponent",
        "RefreshComponent",
        "EntityVisibleComponent",
        "BubbleComponent",
      ],
      NpcMonster: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "BubbleComponent",
        "AiComponent",
        "AttributeComponent",
        "RewardComponent",
        "VisionCaptureComponent",
        "MonsterComponent",
        "CombatComponent",
        "RefreshComponent",
        "EntityVisibleComponent",
      ],
      Vision: [
        "BaseInfoComponent",
        "ModelComponent",
        "AiComponent",
        "AttributeComponent",
        "VisionComponent",
        "CombatComponent",
      ],
      RefreshGroup: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "RefreshGroupComponent",
        "VarComponent",
      ],
      SimpleInteract: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "BubbleComponent",
        "EntityVisibleComponent",
      ],
      Collect: [
        "BaseInfoComponent",
        "ModelComponent",
        "CollectComponent",
        "InteractComponent",
        "AdsorbComponent",
        "RefreshComponent",
        "RewardComponent",
        "SceneItemLifeCycleComponent",
        "AttachTargetComponent",
        "InteractAudioComponent",
      ],
      TreasureBox: [
        "BaseInfoComponent",
        "ModelComponent",
        "RewardComponent",
        "TreasureBoxComponent",
        "InteractComponent",
        "EntityStateComponent",
        "NearbyTrackingComponent",
        "SceneItemLifeCycleComponent",
        "AttachTargetComponent",
      ],
      VisionTreasureBox: [
        "BaseInfoComponent",
        "ModelComponent",
        "RewardComponent",
        "TreasureBoxComponent",
        "InteractComponent",
        "RangeComponent",
        "TriggerComponent",
        "EntityStateComponent",
        "NearbyTrackingComponent",
        "SceneItemLifeCycleComponent",
        "AttachTargetComponent",
      ],
      Trigger: [
        "BaseInfoComponent",
        "ModelComponent",
        "TriggerComponent",
        "RangeComponent",
        "VarComponent",
      ],
      VisibleTrigger: [
        "BaseInfoComponent",
        "ModelComponent",
        "TriggerComponent",
        "RangeComponent",
        "AttachTargetComponent",
      ],
      HookLockPoint: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "HookLockPoint",
      ],
      SuiGuangHook: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "HookLockPoint",
        "SceneItemLifeCycleComponent",
        "AttachTargetComponent",
      ],
      ItemFoundation: [
        "BaseInfoComponent",
        "ModelComponent",
        "ItemFoundation2",
        "EntityStateComponent",
      ],
      InteractFoundation: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "ItemFoundation2",
        "EntityStateComponent",
      ],
      MatchGear: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "EntityStateComponent",
      ],
      MatchGroup: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityGroupComponent",
        "RewardComponent",
        "VarComponent",
      ],
      InteractGearGroup: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "EntityGroupComponent",
        "InteractComponent",
        "ResetEntitiesPosComponent",
        "SceneItemLifeCycleComponent",
        "VarComponent",
      ],
      TeleControl: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TeleControl2",
        "InteractAudioComponent",
        "FightInteractComponent",
        "SceneItemLifeCycleComponent",
        "ResetSelfPosComponent",
        "NearbyTrackingComponent",
      ],
      TeleControlGroup: [
        "BaseInfoComponent",
        "ModelComponent",
        "ResetEntitiesPosComponent",
        "EntityGroupComponent",
        "EntityStateComponent",
        "SceneItemLifeCycleComponent",
        "VarComponent",
      ],
      DestructibleControl: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "DestructibleItem",
        "SceneItemLifeCycleComponent",
        "RewardComponent",
        "TeleControl2",
        "FightInteractComponent",
        "InteractAudioComponent",
      ],
      DestructibleTrigger: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "DestructibleItem",
        "RangeComponent",
        "TriggerComponent",
        "RefreshComponent",
        "FightInteractComponent",
        "AttachTargetComponent",
        "SceneItemLifeCycleComponent",
      ],
      DestructibleSceneBullet: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "DestructibleItem",
        "RangeComponent",
        "SceneBulletComponent",
        "RefreshComponent",
        "FightInteractComponent",
        "AttachTargetComponent",
        "SceneItemLifeCycleComponent",
      ],
      RollingFireball: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TargetGearComponent",
        "TriggerComponent",
        "RangeComponent",
        "SceneItemMovementComponent",
        "SceneItemLifeCycleComponent",
        "FightInteractComponent",
      ],
      WaterSpout: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TargetGearComponent",
        "TriggerComponent",
        "RangeComponent",
        "SceneBulletComponent",
        "SceneItemMovementComponent",
        "SceneItemLifeCycleComponent",
        "FightInteractComponent",
      ],
      Destructible: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "DestructibleItem",
        "SceneItemLifeCycleComponent",
        "RefreshComponent",
        "RewardComponent",
        "FightInteractComponent",
        "AttachTargetComponent",
      ],
      LevelPlay: ["BaseInfoComponent", "LevelPlayComponent"],
      LevelPlayReward: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "SceneItemLifeCycleComponent",
        "NearbyTrackingComponent",
      ],
      Teleporter: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "EntityStateComponent",
        "TeleportComponent",
        "NearbyTrackingComponent",
      ],
      DungeonEntry: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "EntityStateComponent",
        "ItemFoundation2",
        "TeleportComponent",
        "NearbyTrackingComponent",
        "DungeonEntryComponent",
        "EntityVisibleComponent",
        "SceneActorRefComponent",
      ],
      Resurrection: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "TriggerComponent",
        "RangeComponent",
        "EntityStateComponent",
        "ResurrectionComponent",
      ],
      Trample: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "RangeComponent",
        "TrampleComponent",
      ],
      Trample2: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "RangeComponent",
        "TrampleComponent",
        "TriggerComponent",
      ],
      InteractGear: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "SceneItemLifeCycleComponent",
        "InteractGearComponent",
        "SceneItemMovementComponent",
        "AttachTargetComponent",
        "VarComponent",
      ],
      Lift: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "LiftComponent",
        "TriggerComponent",
        "RangeComponent",
      ],
      SpawnMonster: [
        "BaseInfoComponent",
        "ModelComponent",
        "SpawnMonsterComponent",
      ],
      TargetGear: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TargetGearComponent",
        "FightInteractComponent",
        "SceneItemLifeCycleComponent",
        "SceneItemMovementComponent",
        "AttachTargetComponent",
      ],
      TargetGearPro: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TargetGearComponent",
        "FightInteractComponent",
        "SceneItemLifeCycleComponent",
        "SceneItemMovementComponent",
        "AttachTargetComponent",
        "SceneActorRefComponent",
      ],
      TargetGearGroup: [
        "BaseInfoComponent",
        "ModelComponent",
        "InteractComponent",
        "EntityStateComponent",
        "TargetGearGroupComponent",
        "VarComponent",
      ],
      BondageTrap: [
        "BaseInfoComponent",
        "ModelComponent",
        "TriggerComponent",
        "RangeComponent",
        "TargetGearComponent",
        "EntityStateComponent",
        "SceneItemLifeCycleComponent",
      ],
      BurstCrystalFoundation: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "ItemFoundation2",
        "RefreshGroupComponent",
        "SceneItemLifeCycleComponent",
      ],
      GuardTarget: [
        "BaseInfoComponent",
        "ModelComponent",
        "AiComponent",
        "AttributeComponent",
      ],
      ChallengeInteract: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "AttachTargetComponent",
      ],
      SceneItemStateHint: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "StateHintComponent",
      ],
      EntityPackage: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityPackageComponent",
      ],
      SkyboxTrigger: [
        "BaseInfoComponent",
        "ModelComponent",
        "TriggerComponent",
        "RangeComponent",
        "SkyboxComponent",
      ],
      SceneAura: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "SceneActorRefComponent",
        "VarComponent",
      ],
      CookTool: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
      ],
      BuffProducer: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TriggerComponent",
        "RangeComponent",
        "BuffProducerComponent",
        "InteractComponent",
      ],
      BuffConsumer: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TriggerComponent",
        "RangeComponent",
        "BuffConsumerComponent",
      ],
      StateTrigger: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TriggerComponent",
        "RangeComponent",
        "AttachTargetComponent",
        "VarComponent",
      ],
      GuideLineCreator: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "GuideLineCreatorComponent",
      ],
      StateSceneItem: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "SceneItemLifeCycleComponent",
        "AttachTargetComponent",
      ],
      SoundBox: [
        "BaseInfoComponent",
        "ModelComponent",
        "CollectComponent",
        "InteractComponent",
        "EntityStateComponent",
        "AdsorbComponent",
        "RefreshComponent",
        "RewardComponent",
        "SceneItemLifeCycleComponent",
        "InteractAudioComponent",
      ],
      AnnunciatorCenter: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "TargetGearComponent",
        "ConditionListenerComponent",
        "FightInteractComponent",
        "SceneItemLifeCycleComponent",
      ],
      Chair: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
      ],
      Chair2: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "AttachTargetComponent",
      ],
      Rotator: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "RotatorComponent2",
        "SceneItemLifeCycleComponent",
        "AttachTargetComponent",
      ],
      AnnunciatorWire: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "GuideLineCreatorComponent",
      ],
      EntityList: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityListComponent",
      ],
      Audio: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateAudioComponent",
        "EntityStateComponent",
        "EntityGroupComponent",
        "RangeComponent",
        "NearbyTrackingComponent",
      ],
      AudioBox: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateAudioComponent",
        "EntityStateComponent",
        "SceneActorRefComponent",
        "RangeComponent",
      ],
      AreaOccupation: ["BaseInfoComponent", "ModelComponent"],
      TimelineTrackController: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "RangeComponent",
        "TriggerComponent",
        "AttachTargetComponent",
        "TimelineTrackControlComponent",
      ],
      Spline: ["BaseInfoComponent", "SplineComponent"],
      MoveableTrigger: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "RangeComponent",
        "TriggerComponent",
        "RangeComponent",
        "SceneItemMovementComponent",
        "AttachTargetComponent",
        "VarComponent",
      ],
      CustomAoiEditor: [
        "BaseInfoComponent",
        "ModelComponent",
        "EditCustomAoiComponent",
      ],
      CombinedVisibleGroup: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "CombinedVisibleGroupComponent",
      ],
      SceneBullet: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "SceneBulletComponent",
        "RangeComponent",
      ],
      TurntableController: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "TurntableControlComponent",
        "AttachTargetComponent",
      ],
      InteractiveConditionListener: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "ConditionListenerComponent",
        "VarComponent",
      ],
      ReboundPlateGear: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TargetGearComponent",
        "FightInteractComponent",
        "SceneItemLifeCycleComponent",
        "SceneItemMovementComponent",
        "ReboundComponent",
        "FanComponent",
      ],
      JigsawItem: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TeleControl2",
        "JigsawItem",
        "ResetSelfPosComponent",
        "InteractAudioComponent",
        "SceneItemLifeCycleComponent",
      ],
      JigsawFoundation: [
        "BaseInfoComponent",
        "ModelComponent",
        "ItemFoundation2",
        "JigsawFoundation",
        "EntityStateComponent",
        "SceneItemLifeCycleComponent",
      ],
      LevitateMagnet: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "JigsawItem",
        "LevitateMagnetComponent",
        "FightInteractComponent",
      ],
      SoundTransmitter: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "TeleControl2",
        "InteractAudioComponent",
        "FightInteractComponent",
        "TargetGearComponent",
        "SceneItemLifeCycleComponent",
      ],
      PhotoTarget: [
        "BaseInfoComponent",
        "ModelComponent",
        "PhotoTargetComponent",
      ],
      AiAlertNotifier: [
        "BaseInfoComponent",
        "ModelComponent",
        "TriggerComponent",
        "RangeComponent",
        "AiAlertNotifyComponent",
      ],
      MonsterGachaItem: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TeleControl2",
        "MonsterGachaItemComponent",
        "SceneItemLifeCycleComponent",
      ],
      MonsterGachaBase: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "ItemFoundation2",
        "MonsterGachaBaseComponent",
        "RefreshComponent",
        "RefreshGroupComponent",
        "ResetEntitiesPosComponent",
      ],
      ProgressBarController: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "RangeComponent",
        "ProgressBarControlComponent",
      ],
      ConveyorBelt: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "ConveyorBeltComponent",
        "RangeComponent",
      ],
      TemporaryTeleporter: [
        "BaseInfoComponent",
        "ModelComponent",
        "DynamicTeleportComponent",
      ],
      ExploreSkillInteractor: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "RangeComponent",
        "ExploreSkillInteractComponent",
        "AttachTargetComponent",
      ],
      SpawnPasserbyNpc: [
        "BaseInfoComponent",
        "ModelComponent",
        "PasserbyNpcSpawnComponent",
      ],
      LightDeliver: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "FanComponent",
        "ItemFoundation2",
      ],
      BeamCaster: [
        "BaseInfoComponent",
        "ModelComponent",
        "SceneItemMovementComponent",
        "EntityStateComponent",
        "BeamCastComponent",
        "AttachTargetComponent",
        "InteractComponent",
      ],
      BeamReceiver: [
        "BaseInfoComponent",
        "ModelComponent",
        "SceneItemMovementComponent",
        "EntityStateComponent",
        "BeamReceiveComponent",
        "AttachTargetComponent",
        "InteractComponent",
      ],
      BeamDeliver: [
        "BaseInfoComponent",
        "ModelComponent",
        "SceneItemMovementComponent",
        "EntityStateComponent",
        "InteractComponent",
        "BeamCastComponent",
        "BeamReceiveComponent",
        "AttachTargetComponent",
      ],
      BeamCrystal: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "InteractComponent",
        "TeleControl2",
        "InteractAudioComponent",
        "ResetSelfPosComponent",
        "NearbyTrackingComponent",
        "BeamCastComponent",
        "BeamReceiveComponent",
      ],
      TimeStop: [
        "BaseInfoComponent",
        "EntityStateComponent",
        "RangeComponent",
        "ModelComponent",
        "TimeStopComponent",
        "TargetGearComponent",
        "FightInteractComponent",
        "AttachTargetComponent",
      ],
      Portal: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "RangeComponent",
        "PortalComponent",
        "AttachTargetComponent",
      ],
      EffectArea: [
        "BaseInfoComponent",
        "EffectAreaComponent",
        "RangeComponent",
        "SceneActorRefComponent",
        "EntityStateComponent",
        "ModelComponent",
      ],
      PhysicsSwing: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "TargetGearComponent",
        "DestructibleItem",
        "RewardComponent",
        "PhysicsConstraintComponent",
        "FightInteractComponent",
        "SceneItemLifeCycleComponent",
        "AttachTargetComponent",
      ],
      VarManager: [
        "BaseInfoComponent",
        "ModelComponent",
        "EntityStateComponent",
        "VarComponent",
      ],
    }),
    (exports.entityTypesUe5 = Object.keys(
      exports.componentsByEntityUe5,
    ).sort()),
    (exports.entityTypesAki = Object.keys(
      exports.componentsByEntityAki,
    ).sort()),
    ["Collect", "Animal", "CombatAnimal"]);
function getRewardTypeConfig(n) {
  return collectRewardEntityTypes.includes(n)
    ? IComponent_1.rewardTypeCollectConfig
    : IComponent_1.rewardTypeCommonConfig;
}
var EDevelopmentStatus;
function decompressEntityData(n, o) {
  return void 0 === o
    ? n
    : {
        ObjType: n.ObjType,
        EdPlannedBranch: n.EdPlannedBranch,
        BlueprintType: n.BlueprintType,
        Name: n.Name,
        Id: n.Id,
        Transform: n.Transform,
        InSleep: n.InSleep,
        IsHidden: n.IsHidden,
        IsAlwaysLoad: n.IsAlwaysLoad,
        ComponentsData: (0, IUtil_1.applyDiff)(
          n.ComponentsData,
          o.ComponentsData,
          IUtil_1.entityDataIgnoreFunc,
        ),
        EdEntityTip: n.EdEntityTip,
        Children: n.Children,
        Reference: n.Reference,
        AreaId: n.AreaId,
      };
}
(exports.getRewardTypeConfig = getRewardTypeConfig),
  (function (n) {
    (n[(n.Developing = 0)] = "Developing"),
      (n[(n.Released = 1)] = "Released"),
      (n[(n.Discarded = 2)] = "Discarded");
  })(
    (EDevelopmentStatus =
      exports.EDevelopmentStatus || (exports.EDevelopmentStatus = {})),
  ),
  (exports.decompressEntityData = decompressEntityData);
//# sourceMappingURL=IEntity.js.map
