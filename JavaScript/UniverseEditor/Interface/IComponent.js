"use strict";
function getComponent(o, e) {
  o = o[e];
  if (o && !o.Disabled) return o;
}
function getOriginalComponent(o, e) {
  return o[e];
}
var EInteractPlayerDiractionType,
  EInteractTurnAround,
  EAiWanderType,
  EWorldLevelBonus,
  EAudioRangeType,
  EAkEventType,
  EAudioType,
  EEntityGroupFailureCondition,
  EBulletCreateCondition,
  EScanMode,
  EAimPointType,
  ETeleControlDestroyCondition,
  EThrowMotion,
  EDirection,
  EItemFoundation,
  ESpawnMonsterStartCondition,
  ESpawnMonsterCompleteCondition,
  ESpawnMonsterPreCondition,
  ESpawnMonsterConstraint,
  EHitLogicType,
  EHitBulletType,
  ETargetGearGroupSuccessCondition,
  ETargetGearGroupFailureCondition,
  EGearHitAffectType,
  EGroupFinishConfig,
  ENpcStandbyShowMode,
  ENpcStandbyShowFinitelyPlayMode,
  ENpcUiInteractType,
  EConveyorBeltFieldType,
  EConveyorBeltMoveType,
  ETriggerMode,
  EColorChangeStrategyOfSplineEffect,
  ESplineLine,
  ESplineType,
  EPointGroupGenerateType,
  EEffectSplineCreateMode,
  EPatrolMoveState,
  EPatrolCycleMode,
  ELevelAiCycleMode,
  EControllerType,
  EReboundOptionType,
  EFillType,
  EJigsawCompleteCondition,
  EExploreSkillInteractType,
  EFanInteractType,
  EFanGearType,
  EAiGearStrategy,
  EPickInteraction,
  EDetectionFrequency,
  EGroupAiMode,
  EInhalationPerformanceType;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.patrolMoveStateNameByValue =
    exports.EPatrolMoveState =
    exports.EEffectSplineCreateMode =
    exports.EPointGroupGenerateType =
    exports.ESplineType =
    exports.ESplineLine =
    exports.EColorChangeStrategyOfSplineEffect =
    exports.ETriggerMode =
    exports.EConveyorBeltMoveType =
    exports.EConveyorBeltFieldType =
    exports.ENpcUiInteractType =
    exports.ENpcStandbyShowFinitelyPlayMode =
    exports.ENpcStandbyShowMode =
    exports.EGroupFinishConfig =
    exports.EGearHitAffectType =
    exports.ETargetGearGroupFailureCondition =
    exports.ETargetGearGroupSuccessCondition =
    exports.EHitBulletType =
    exports.EHitLogicType =
    exports.ESpawnMonsterConstraint =
    exports.ESpawnMonsterPreCondition =
    exports.ESpawnMonsterCompleteCondition =
    exports.ESpawnMonsterStartCondition =
    exports.EItemFoundation =
    exports.EDirection =
    exports.EThrowMotion =
    exports.ETeleControlDestroyCondition =
    exports.EAimPointType =
    exports.EScanMode =
    exports.EBulletCreateCondition =
    exports.EEntityGroupFailureCondition =
    exports.EAudioType =
    exports.EAkEventType =
    exports.EAudioRangeType =
    exports.rewardTypeCollectConfig =
    exports.rewardTypeCommonConfig =
    exports.rewardTypeCnMap =
    exports.aoizLayerValues =
    exports.aoiXyLayerValues =
    exports.entityCategoryConfig =
    exports.EWorldLevelBonus =
    exports.EAiWanderType =
    exports.EInteractTurnAround =
    exports.EInteractPlayerDiractionType =
    exports.DEFAULT_INIT_SPEED =
    exports.getOriginalComponent =
    exports.getComponent =
    exports.componentList =
    exports.componentInterfaceMap =
    exports.componentMap =
      void 0),
  (exports.EInhalationPerformanceType =
    exports.EGroupAiMode =
    exports.EDetectionFrequency =
    exports.EPickInteraction =
    exports.EAiGearStrategy =
    exports.levelPrefabBpPathConfig =
    exports.EFanGearType =
    exports.EFanInteractType =
    exports.EExploreSkillInteractType =
    exports.EJigsawCompleteCondition =
    exports.EFillType =
    exports.EReboundOptionType =
    exports.EControllerType =
    exports.ELevelAiCycleMode =
    exports.EPatrolCycleMode =
      void 0),
  (exports.componentMap = {
    AirWallSpawnerComponent: void 0,
    ActorStateComponent: void 0,
    AiComponent: void 0,
    LevelAiComponent: void 0,
    AttributeComponent: void 0,
    BaseInfoComponent: void 0,
    BehaviorFlowComponent: void 0,
    CalculateComponent: void 0,
    EntitySpawnerComponent: void 0,
    EntityStateComponent: void 0,
    EventComponent: void 0,
    FlowComponent: void 0,
    GrabComponent: void 0,
    InteractComponent: void 0,
    InteractiveComponent: void 0,
    LampComponent: void 0,
    MoveComponent: void 0,
    NpcComponent: void 0,
    RefreshComponent: void 0,
    RefreshGroupComponent: void 0,
    RefreshEntityComponent: void 0,
    RefreshSingleComponent: void 0,
    RewardComponent: void 0,
    RotatorComponent: void 0,
    RotatorComponent2: void 0,
    SimpleComponent: void 0,
    SphereComponent: void 0,
    SphereFactoryComponent: void 0,
    SpringBoardComponent: void 0,
    SpringComponent: void 0,
    SpawnMonsterComponent: void 0,
    StateComponent: void 0,
    SwitcherComponent: void 0,
    TalkComponent: void 0,
    TrampleUe5Component: void 0,
    TreasureBoxComponent: void 0,
    TriggerUe5Component: void 0,
    UndergroundComponent: void 0,
    VarComponent: void 0,
    TriggerComponent: void 0,
    HookLockPoint: void 0,
    TargetGearComponent: void 0,
    TargetGearGroupComponent: void 0,
    ItemFoundation: void 0,
    ItemFoundation2: void 0,
    JigsawItem: void 0,
    JigsawFoundation: void 0,
    CollectComponent: void 0,
    TeleControl2: void 0,
    DestructibleItem: void 0,
    LevelPlayComponent: void 0,
    VisionComponent: void 0,
    VisionCaptureComponent: void 0,
    ResetEntitiesPosComponent: void 0,
    EntityGroupComponent: void 0,
    AdsorbComponent: void 0,
    TeleportComponent: void 0,
    TrampleComponent: void 0,
    NpcPerformComponent: void 0,
    InteractGearComponent: void 0,
    LiftComponent: void 0,
    FollowTrackComponent: void 0,
    SceneItemLifeCycleComponent: void 0,
    BubbleComponent: void 0,
    FightInteractComponent: void 0,
    NearbyTrackingComponent: void 0,
    EntityPackageComponent: void 0,
    SkyboxComponent: void 0,
    StateHintComponent: void 0,
    EntityVisibleComponent: void 0,
    CombinedVisibleGroupComponent: void 0,
    WeaponComponent: void 0,
    DungeonEntryComponent: void 0,
    ResurrectionComponent: void 0,
    BuffProducerComponent: void 0,
    BuffConsumerComponent: void 0,
    GuideLineCreatorComponent: void 0,
    InteractAudioComponent: void 0,
    DropComponent: void 0,
    AdviseItemComponent: void 0,
    VisionItemComponent: void 0,
    MonsterComponent: void 0,
    CombatComponent: void 0,
    EntityListComponent: void 0,
    AnimalComponent: void 0,
    EntityAudioComponent: void 0,
    EntityStateAudioComponent: void 0,
    SceneItemMovementComponent: void 0,
    RangeComponent: void 0,
    TimelineTrackControlComponent: void 0,
    SplineComponent: void 0,
    SceneActorRefComponent: void 0,
    EditCustomAoiComponent: void 0,
    SceneBulletComponent: void 0,
    TurntableControlComponent: void 0,
    ConditionListenerComponent: void 0,
    AttachTargetComponent: void 0,
    ReboundComponent: void 0,
    LevitateMagnetComponent: void 0,
    PhotoTargetComponent: void 0,
    AiAlertNotifyComponent: void 0,
    MonsterGachaItemComponent: void 0,
    MonsterGachaBaseComponent: void 0,
    ProgressBarControlComponent: void 0,
    ConveyorBeltComponent: void 0,
    DynamicTeleportComponent: void 0,
    ExploreSkillInteractComponent: void 0,
    FanComponent: void 0,
    ResetSelfPosComponent: void 0,
    PasserbyNpcSpawnComponent: void 0,
    ModelComponent: void 0,
    BeamCastComponent: void 0,
    BeamReceiveComponent: void 0,
    TimeStopComponent: void 0,
    PortalComponent: void 0,
    EffectAreaComponent: void 0,
    PhysicsConstraintComponent: void 0,
    FollowShooterComponent: void 0,
    ConnectorComponent: void 0,
    CharacterConnectorComponent: void 0,
    HitComponent: void 0,
    DynamicPortalCreatorComponent: void 0,
    AiGearStrategyComponent: void 0,
    PickInteractComponent: void 0,
    ClientTriggerComponent: void 0,
    LocationSafetyComponent: void 0,
    BatchBulletCasterComponent: void 0,
    VehicleComponent: void 0,
    EnrichmentAreaComponent: void 0,
    ChessmanComponent: void 0,
    MonitorComponent: void 0,
    GroupAiComponent: void 0,
    InhalationAbilityComponent: void 0,
    InhaledItemComponent: void 0,
  }),
  (exports.componentInterfaceMap = exports.componentMap),
  (exports.componentList = Object.keys(exports.componentInterfaceMap).sort()),
  (exports.getComponent = getComponent),
  (exports.getOriginalComponent = getOriginalComponent),
  (exports.DEFAULT_INIT_SPEED = 150),
  (function (o) {
    (o.Npc = "Npc"), (o.LeisureInteraction = "LeisureInteraction");
  })(
    (EInteractPlayerDiractionType =
      exports.EInteractPlayerDiractionType ||
      (exports.EInteractPlayerDiractionType = {})),
  ),
  (function (o) {
    (o.FaceEachOther = "FaceEachOther"),
      (o.FaceEachOtherWithRecoveryImmediately =
        "FaceEachOtherWithRecoveryImmediately"),
      (o.PlayerTurnToInteractor = "PlayerTurnToInteractor");
  })(
    (EInteractTurnAround =
      exports.EInteractTurnAround || (exports.EInteractTurnAround = {})),
  ),
  (function (o) {
    (o[(o.SmallRange = 300)] = "SmallRange"),
      (o[(o.MiddleRange = 600)] = "MiddleRange"),
      (o[(o.BigRange = 1e3)] = "BigRange"),
      (o[(o.SmallRangeLargeBody = 301)] = "SmallRangeLargeBody"),
      (o[(o.MiddleRangeLargeBody = 601)] = "MiddleRangeLargeBody"),
      (o[(o.BigRangeLargeBody = 1001)] = "BigRangeLargeBody");
  })((EAiWanderType = exports.EAiWanderType || (exports.EAiWanderType = {}))),
  (function (o) {
    (o[(o.WorldLevelTable = 0)] = "WorldLevelTable"),
      (o[(o.AreaBouns = 1)] = "AreaBouns");
  })(
    (EWorldLevelBonus =
      exports.EWorldLevelBonus || (exports.EWorldLevelBonus = {})),
  ),
  (exports.entityCategoryConfig = {
    MonsterMatchType: "怪物类型",
    ControlMatchType: "控物类型",
    ItemFoundation: "底座类型",
    DestructibleType: "可破坏物",
  }),
  (exports.aoiXyLayerValues = {
    [0]: 6e3,
    1: 24e3,
    2: 99e3,
    3: 11e3,
    6: 3e3,
    7: 9e3,
    8: 15e3,
  }),
  (exports.aoizLayerValues = { [0]: -1, 1: 24e3, 2: 6e3, 3: 3e3 }),
  (exports.rewardTypeCnMap = {
    [0]: "附近掉落",
    1: "房主掉落",
    2: "采集物掉落",
  }),
  (exports.rewardTypeCommonConfig = [0, 1]),
  (exports.rewardTypeCollectConfig = [0, 1, 2]),
  (function (o) {
    (o.SceneActorRefComp = "SceneActorRefComp"),
      (o.RangeComp = "RangeComp"),
      (o.AOI = "AOI");
  })(
    (EAudioRangeType =
      exports.EAudioRangeType || (exports.EAudioRangeType = {})),
  ),
  (function (o) {
    (o.Point = "Point"), (o.Box = "Box"), (o.Default = "Default");
  })((EAkEventType = exports.EAkEventType || (exports.EAkEventType = {}))),
  (function (o) {
    (o.AudioAMB = "AudioAMB"), (o.AudioBGM = "AudioBGM");
  })((EAudioType = exports.EAudioType || (exports.EAudioType = {}))),
  (function (o) {
    (o.SequentialState = "SequentialState"),
      (o.ArbitraryState = "ArbitraryState");
  })(
    (EEntityGroupFailureCondition =
      exports.EEntityGroupFailureCondition ||
      (exports.EEntityGroupFailureCondition = {})),
  ),
  (function (o) {
    (o.OnHit = "OnHit"),
      (o.OnMatching = "OnMatching"),
      (o.OnCollision = "OnCollision"),
      (o.OnThrowTriggerTime = "OnThrowDelayTime");
  })(
    (EBulletCreateCondition =
      exports.EBulletCreateCondition || (exports.EBulletCreateCondition = {})),
  ),
  (function (o) {
    (o[(o.Camera = 0)] = "Camera"), (o[(o.Surround = 1)] = "Surround");
  })((EScanMode = exports.EScanMode || (exports.EScanMode = {}))),
  (function (o) {
    (o[(o.Normal = 0)] = "Normal"), (o[(o.Weakness = 1)] = "Weakness");
  })((EAimPointType = exports.EAimPointType || (exports.EAimPointType = {}))),
  (function (o) {
    (o.LetGo = "LetGo"), (o.CreateBullet = "CreateBullet"), (o.Throw = "Throw");
  })(
    (ETeleControlDestroyCondition =
      exports.ETeleControlDestroyCondition ||
      (exports.ETeleControlDestroyCondition = {})),
  ),
  (function (o) {
    (o.Projectile = "Projectile"),
      (o.Circumnutation = "Circumnutation"),
      (o.TrackTarget = "TrackTarget"),
      (o.Levitate = "Levitate");
  })((EThrowMotion = exports.EThrowMotion || (exports.EThrowMotion = {}))),
  (function (o) {
    (o.Right = "Right"), (o.Left = "Left");
  })((EDirection = exports.EDirection || (exports.EDirection = {}))),
  (function (o) {
    (o.CategoryMatching = "CategoryMatching"),
      (o.BuildingBlock = "BuildingBlock"),
      (o.PulseDevice = "PulseDevice"),
      (o.RangeAdsorption = "RangeAdsorption"),
      (o.PullStatue = "PullStatue");
  })(
    (EItemFoundation =
      exports.EItemFoundation || (exports.EItemFoundation = {})),
  ),
  (function (o) {
    (o[(o.Immediate = 0)] = "Immediate"),
      (o[(o.TriggerRange = 1)] = "TriggerRange");
  })(
    (ESpawnMonsterStartCondition =
      exports.ESpawnMonsterStartCondition ||
      (exports.ESpawnMonsterStartCondition = {})),
  ),
  (function (o) {
    (o[(o.AllKill = 0)] = "AllKill"),
      (o[(o.Duration = 1)] = "Duration"),
      (o[(o.QuantityRefill = 2)] = "QuantityRefill");
  })(
    (ESpawnMonsterCompleteCondition =
      exports.ESpawnMonsterCompleteCondition ||
      (exports.ESpawnMonsterCompleteCondition = {})),
  ),
  ((ESpawnMonsterPreCondition =
    exports.ESpawnMonsterPreCondition ||
    (exports.ESpawnMonsterPreCondition = {})).DependOnPreceding =
    "DependOnPreceding"),
  ((ESpawnMonsterConstraint =
    exports.ESpawnMonsterConstraint ||
    (exports.ESpawnMonsterConstraint = {})).CharacterForwardAnnularSector =
    "CharacterForwardAnnularSector"),
  (function (o) {
    (o.ChangeNextState = "ChangeNextState"),
      (o.ChangeCountDownState = "ChangeCountDownState"),
      (o.ChangeLockState = "ChangeLockState"),
      (o.ChangeNextAndLockTargetState = "ChangeNextAndLockTargetState");
  })((EHitLogicType = exports.EHitLogicType || (exports.EHitLogicType = {}))),
  (function (o) {
    (o.OnlyDropAttack = "OnlyDropAttack"),
      (o.CrystalBulletAttack = "CrystalAttack"),
      (o.PlayerAttack = "PlayerAttack"),
      (o.FixedBulletId = "FixedBulletId");
  })(
    (EHitBulletType = exports.EHitBulletType || (exports.EHitBulletType = {})),
  ),
  (function (o) {
    (o.SameSpecificState = "SameSpecificState"),
      (o.SameArbitraryState = "SameArbitraryState"),
      (o.CountDownState = "CountDownState"),
      (o.SpecificTargetState = "SpecificTargetState");
  })(
    (ETargetGearGroupSuccessCondition =
      exports.ETargetGearGroupSuccessCondition ||
      (exports.ETargetGearGroupSuccessCondition = {})),
  ),
  (function (o) {
    (o.ArbitraryState = "ArbitraryState"),
      (o.SequentialState = "SequentialState"),
      (o.HitTargetEntity = "HitTargetEntity");
  })(
    (ETargetGearGroupFailureCondition =
      exports.ETargetGearGroupFailureCondition ||
      (exports.ETargetGearGroupFailureCondition = {})),
  ),
  ((EGearHitAffectType =
    exports.EGearHitAffectType ||
    (exports.EGearHitAffectType = {})).ChangeNextState = "ChangeNextState"),
  (function (o) {
    (o.Silence = "Silence"), (o.Destroy = "Destroy");
  })(
    (EGroupFinishConfig =
      exports.EGroupFinishConfig || (exports.EGroupFinishConfig = {})),
  ),
  (function (o) {
    (o.Finite = "Finite"), (o.Loop = "Loop"), (o.Sit = "Sit");
  })(
    (ENpcStandbyShowMode =
      exports.ENpcStandbyShowMode || (exports.ENpcStandbyShowMode = {})),
  ),
  (function (o) {
    (o.Randomly = "Randomly"), (o.Orderly = "Orderly");
  })(
    (ENpcStandbyShowFinitelyPlayMode =
      exports.ENpcStandbyShowFinitelyPlayMode ||
      (exports.ENpcStandbyShowFinitelyPlayMode = {})),
  ),
  (function (o) {
    (o.HandInItem = "HandInItem"),
      (o.Shop = "Shop"),
      (o.AntiqueShop = "AntiqueShop"),
      (o.ChengXiaoShanShop = "ChengXiaoShanShop"),
      (o.Gramophone = "Gramophone");
  })(
    (ENpcUiInteractType =
      exports.ENpcUiInteractType || (exports.ENpcUiInteractType = {})),
  ),
  (function (o) {
    (o.DirectionalField = "DirectionalField"), (o.PointField = "PointField");
  })(
    (EConveyorBeltFieldType =
      exports.EConveyorBeltFieldType || (exports.EConveyorBeltFieldType = {})),
  ),
  ((EConveyorBeltMoveType =
    exports.EConveyorBeltMoveType ||
    (exports.EConveyorBeltMoveType = {})).FixSpeed = "FixSpeed"),
  (function (o) {
    (o[(o.Distance = 0)] = "Distance"), (o[(o.Global = 1)] = "Global");
  })((ETriggerMode = exports.ETriggerMode || (exports.ETriggerMode = {}))),
  ((EColorChangeStrategyOfSplineEffect =
    exports.EColorChangeStrategyOfSplineEffect ||
    (exports.EColorChangeStrategyOfSplineEffect = {})).RGB = "RGB"),
  (function (o) {
    (o.Linear = "Linear"),
      (o.Curve = "Curve"),
      (o.Constant = "Constant"),
      (o.CurveCustomTangent = "CurveCustomTangent");
  })((ESplineLine = exports.ESplineLine || (exports.ESplineLine = {}))),
  (function (o) {
    (o.Common = "Common"),
      (o.Parkour = "Parkour"),
      (o.Butterfly = "Butterfly"),
      (o.Effect = "Effect"),
      (o.Patrol = "Patrol"),
      (o.LevelAI = "LevelAI"),
      (o.AirPassage = "AirPassage"),
      (o.ContinuesVariableSpeedMovement = "ContinuesVariableSpeedMovement");
  })((ESplineType = exports.ESplineType || (exports.ESplineType = {}))),
  ((EPointGroupGenerateType =
    exports.EPointGroupGenerateType ||
    (exports.EPointGroupGenerateType = {})).Layer = "Layer"),
  (function (o) {
    (o.WholeLine = "WholeLine"), (o.EquidistantPoint = "EquidistantPoint");
  })(
    (EEffectSplineCreateMode =
      exports.EEffectSplineCreateMode ||
      (exports.EEffectSplineCreateMode = {})),
  ),
  (function (o) {
    (o[(o.Walk = 1)] = "Walk"),
      (o[(o.Run = 2)] = "Run"),
      (o[(o.Sprint = 3)] = "Sprint");
  })(
    (EPatrolMoveState =
      exports.EPatrolMoveState || (exports.EPatrolMoveState = {})),
  ),
  (exports.patrolMoveStateNameByValue = {
    [EPatrolMoveState.Walk]: "走",
    [EPatrolMoveState.Run]: "跑",
    [EPatrolMoveState.Sprint]: "冲刺",
  }),
  (function (o) {
    (o.Loop = "Loop"), (o.Once = "Once");
  })(
    (EPatrolCycleMode =
      exports.EPatrolCycleMode || (exports.EPatrolCycleMode = {})),
  ),
  ((ELevelAiCycleMode =
    exports.ELevelAiCycleMode || (exports.ELevelAiCycleMode = {})).Loop =
    "Loop"),
  (function (o) {
    (o.FreeAngle = "FreeAngle"), (o.FixedAngle = "FixedAngle");
  })(
    (EControllerType =
      exports.EControllerType || (exports.EControllerType = {})),
  ),
  ((EReboundOptionType =
    exports.EReboundOptionType ||
    (exports.EReboundOptionType = {})).ForwardFront = "ForwardFront"),
  (function (o) {
    (o.Fixed = "Fixed"), (o.Direction = "Direction");
  })((EFillType = exports.EFillType || (exports.EFillType = {}))),
  (function (o) {
    (o.ActivateAllCorrectPiece = "ActivateAllCorrectPiece"),
      (o.ActivateSpecifiedPiece = "ActivateSpecifiedPiece"),
      (o.PutInTheSpecifiedPiece = "PutInTheSpecifiedPiece"),
      (o.ActivateRenjuPiece = "ActivateRenjuPiece");
  })(
    (EJigsawCompleteCondition =
      exports.EJigsawCompleteCondition ||
      (exports.EJigsawCompleteCondition = {})),
  ),
  (function (o) {
    (o.PullGiant = "PullGiant"),
      (o.StatueInteractPoint = "StatueInteractPoint"),
      (o.PullStatue = "PullStatue");
  })(
    (EExploreSkillInteractType =
      exports.EExploreSkillInteractType ||
      (exports.EExploreSkillInteractType = {})),
  ),
  (function (o) {
    (o.Hit = "Hit"), (o.FKey = "FKey");
  })(
    (EFanInteractType =
      exports.EFanInteractType || (exports.EFanInteractType = {})),
  ),
  (function (o) {
    (o.ReboundPlateGear = "ReboundPlateGear"),
      (o.LightDeliver = "LightDeliver ");
  })((EFanGearType = exports.EFanGearType || (exports.EFanGearType = {}))),
  (exports.levelPrefabBpPathConfig = {
    Item: "/Game/Aki/Character/Item/BP_BaseItem.BP_BaseItem_C",
    InteractedBox:
      "/Game/Aki/GamePlay/InteractiveObject/BP_InteractedBox.BP_InteractedBox_C",
    PhysicsItem:
      "/Game/Aki/GamePlay/InteractiveObject/BP_PhysicsItem.BP_PhysicsItem_C",
  }),
  ((EAiGearStrategy =
    exports.EAiGearStrategy || (exports.EAiGearStrategy = {})).RenjuStrategy =
    "RenjuStrategy"),
  ((EPickInteraction =
    exports.EPickInteraction ||
    (exports.EPickInteraction = {})).ChessmanInteract = "ChessmanInteract"),
  (function (o) {
    (o.Low = "Low"),
      (o.Medium = "Medium"),
      (o.High = "High"),
      (o.SuperHigh = "SuperHigh");
  })(
    (EDetectionFrequency =
      exports.EDetectionFrequency || (exports.EDetectionFrequency = {})),
  ),
  ((EGroupAiMode = exports.EGroupAiMode || (exports.EGroupAiMode = {})).Patrol =
    "Patrol"),
  (function (o) {
    (o.Role = "Role"), (o.SceneItem = "SceneItem");
  })(
    (EInhalationPerformanceType =
      exports.EInhalationPerformanceType ||
      (exports.EInhalationPerformanceType = {})),
  );
//# sourceMappingURL=IComponent.js.map
