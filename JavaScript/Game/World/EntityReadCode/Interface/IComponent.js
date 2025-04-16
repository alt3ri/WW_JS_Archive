"use strict";
function getComponent(e, o) {
  e = e[o];
  if (e && !e.Disabled) return e;
}
function getOriginalComponent(e, o) {
  return e[o];
}
var EInteractPlayerDiractionType,
  EInteractTurnAround,
  EAiWanderType,
  EWorldLevelBonus,
  EFightMusicsSwitchType,
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
  EPullingFoundation,
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
  ESpecialNpcType,
  EConveyorBeltFieldType,
  EConveyorBeltMoveType,
  ETriggerMode,
  EReviveType,
  EColorChangeStrategyOfSplineEffect,
  EMonsterShowOnDeathType,
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
  EExploreSkillSearchTargetCfg,
  EFanInteractType,
  EFanGearType,
  EAiGearStrategy,
  EPickInteraction,
  EDetectionFrequency,
  EBatchBulletMovementType,
  EGroupAiMode,
  EInhalationPerformanceType,
  EInhaledPerResultType,
  ERenderSpecifiedRangeType,
  EWindSourceType;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EMonsterShowOnDeathType =
    exports.EColorChangeStrategyOfSplineEffect =
    exports.EReviveType =
    exports.ETriggerMode =
    exports.EConveyorBeltMoveType =
    exports.EConveyorBeltFieldType =
    exports.ESpecialNpcType =
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
    exports.EPullingFoundation =
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
    exports.AOI_EXITRANGE_INCREMENT =
    exports.entityCategoryConfig =
    exports.EFightMusicsSwitchType =
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
  (exports.EWindSourceType =
    exports.ERenderSpecifiedRangeType =
    exports.EInhaledPerResultType =
    exports.EInhalationPerformanceType =
    exports.EGroupAiMode =
    exports.EBatchBulletMovementType =
    exports.EDetectionFrequency =
    exports.EPickInteraction =
    exports.EAiGearStrategy =
    exports.levelPrefabBpPathConfig =
    exports.EFanGearType =
    exports.EFanInteractType =
    exports.EExploreSkillSearchTargetCfg =
    exports.EExploreSkillInteractType =
    exports.EJigsawCompleteCondition =
    exports.EFillType =
    exports.EReboundOptionType =
    exports.EControllerType =
    exports.ELevelAiCycleMode =
    exports.EPatrolCycleMode =
    exports.patrolMoveStateNameByValue =
    exports.EPatrolMoveState =
    exports.EEffectSplineCreateMode =
    exports.EPointGroupGenerateType =
    exports.ESplineType =
    exports.ESplineLine =
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
    SceneItemAttributeComponent: void 0,
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
    PullingObjectFoundation: void 0,
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
    EntityCustomAudioComponent: void 0,
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
    EntityBundleComponent: void 0,
    BeamCastComponent: void 0,
    BeamReceiveComponent: void 0,
    TimeStopComponent: void 0,
    PortalComponent: void 0,
    NoRenderPortalComponent: void 0,
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
    AirPassageComponent: void 0,
    RenderSpecifiedRangeComponent: void 0,
    LevelPrefabPerformComponent: void 0,
    SceneItemAiComponent: void 0,
    GravityFlipComponent: void 0,
    LevelSequenceFrameEventComponent: void 0,
    LevelQteComponent: void 0,
    WalkingPatternComponent: void 0,
    LifePointCenterComponent: void 0,
    HackManagementComponent: void 0,
    ClientConditionListenerComponent: void 0,
    TemplateEntitySpawnerComponent: void 0,
    WindSourceComponent: void 0,
    SlideRailComponent: void 0,
    CurveControlComponent: void 0,
    EntityBatchRefreshComponent: void 0,
  }),
  (exports.componentInterfaceMap = exports.componentMap),
  (exports.componentList = Object.keys(exports.componentInterfaceMap).sort()),
  (exports.getComponent = getComponent),
  (exports.getOriginalComponent = getOriginalComponent),
  (exports.DEFAULT_INIT_SPEED = 150),
  (function (e) {
    (e.Npc = "Npc"), (e.LeisureInteraction = "LeisureInteraction");
  })(
    (EInteractPlayerDiractionType =
      exports.EInteractPlayerDiractionType ||
      (exports.EInteractPlayerDiractionType = {})),
  ),
  (function (e) {
    (e.FaceEachOther = "FaceEachOther"),
      (e.FaceEachOtherWithRecoveryImmediately =
        "FaceEachOtherWithRecoveryImmediately"),
      (e.PlayerTurnToInteractor = "PlayerTurnToInteractor");
  })(
    (EInteractTurnAround =
      exports.EInteractTurnAround || (exports.EInteractTurnAround = {})),
  ),
  (function (e) {
    (e[(e.SmallRange = 300)] = "SmallRange"),
      (e[(e.MiddleRange = 600)] = "MiddleRange"),
      (e[(e.BigRange = 1e3)] = "BigRange"),
      (e[(e.SmallRangeLargeBody = 301)] = "SmallRangeLargeBody"),
      (e[(e.MiddleRangeLargeBody = 601)] = "MiddleRangeLargeBody"),
      (e[(e.BigRangeLargeBody = 1001)] = "BigRangeLargeBody");
  })((EAiWanderType = exports.EAiWanderType || (exports.EAiWanderType = {}))),
  (function (e) {
    (e[(e.WorldLevelTable = 0)] = "WorldLevelTable"),
      (e[(e.AreaBouns = 1)] = "AreaBouns");
  })(
    (EWorldLevelBonus =
      exports.EWorldLevelBonus || (exports.EWorldLevelBonus = {})),
  ),
  ((EFightMusicsSwitchType =
    exports.EFightMusicsSwitchType ||
    (exports.EFightMusicsSwitchType = {})).SwitchByTag = "SwitchByTag"),
  (exports.entityCategoryConfig = {
    MonsterMatchType: "怪物类型",
    ControlMatchType: "控物类型",
    ItemFoundation: "底座类型",
    DestructibleType: "可破坏物",
  }),
  (exports.AOI_EXITRANGE_INCREMENT = 1e3),
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
    3: "主机交互",
  }),
  (exports.rewardTypeCommonConfig = [0, 1, 3]),
  (exports.rewardTypeCollectConfig = [0, 1, 2]),
  (function (e) {
    (e.SceneActorRefComp = "SceneActorRefComp"),
      (e.RangeComp = "RangeComp"),
      (e.AOI = "AOI");
  })(
    (EAudioRangeType =
      exports.EAudioRangeType || (exports.EAudioRangeType = {})),
  ),
  (function (e) {
    (e.Point = "Point"), (e.Box = "Box"), (e.Default = "Default");
  })((EAkEventType = exports.EAkEventType || (exports.EAkEventType = {}))),
  (function (e) {
    (e.AudioAMB = "AudioAMB"), (e.AudioBGM = "AudioBGM");
  })((EAudioType = exports.EAudioType || (exports.EAudioType = {}))),
  (function (e) {
    (e.SequentialState = "SequentialState"),
      (e.ArbitraryState = "ArbitraryState");
  })(
    (EEntityGroupFailureCondition =
      exports.EEntityGroupFailureCondition ||
      (exports.EEntityGroupFailureCondition = {})),
  ),
  (function (e) {
    (e.OnHit = "OnHit"),
      (e.OnMatching = "OnMatching"),
      (e.OnCollision = "OnCollision"),
      (e.OnThrowTriggerTime = "OnThrowDelayTime"),
      (e.OpenGravityCollision = "OpenGravityCollision");
  })(
    (EBulletCreateCondition =
      exports.EBulletCreateCondition || (exports.EBulletCreateCondition = {})),
  ),
  (function (e) {
    (e[(e.Camera = 0)] = "Camera"), (e[(e.Surround = 1)] = "Surround");
  })((EScanMode = exports.EScanMode || (exports.EScanMode = {}))),
  (function (e) {
    (e[(e.Normal = 0)] = "Normal"), (e[(e.Weakness = 1)] = "Weakness");
  })((EAimPointType = exports.EAimPointType || (exports.EAimPointType = {}))),
  (function (e) {
    (e.LetGo = "LetGo"), (e.CreateBullet = "CreateBullet"), (e.Throw = "Throw");
  })(
    (ETeleControlDestroyCondition =
      exports.ETeleControlDestroyCondition ||
      (exports.ETeleControlDestroyCondition = {})),
  ),
  (function (e) {
    (e.Projectile = "Projectile"),
      (e.Circumnutation = "Circumnutation"),
      (e.TrackTarget = "TrackTarget"),
      (e.Levitate = "Levitate");
  })((EThrowMotion = exports.EThrowMotion || (exports.EThrowMotion = {}))),
  (function (e) {
    (e.Right = "Right"), (e.Left = "Left");
  })((EDirection = exports.EDirection || (exports.EDirection = {}))),
  (function (e) {
    (e.CategoryMatching = "CategoryMatching"),
      (e.BuildingBlock = "BuildingBlock"),
      (e.PulseDevice = "PulseDevice"),
      (e.RangeAdsorption = "RangeAdsorption");
  })(
    (EItemFoundation =
      exports.EItemFoundation || (exports.EItemFoundation = {})),
  ),
  ((EPullingFoundation =
    exports.EPullingFoundation ||
    (exports.EPullingFoundation = {})).CategoryMatching = "CategoryMatching"),
  (function (e) {
    (e[(e.Immediate = 0)] = "Immediate"),
      (e[(e.TriggerRange = 1)] = "TriggerRange");
  })(
    (ESpawnMonsterStartCondition =
      exports.ESpawnMonsterStartCondition ||
      (exports.ESpawnMonsterStartCondition = {})),
  ),
  (function (e) {
    (e[(e.AllKill = 0)] = "AllKill"),
      (e[(e.Duration = 1)] = "Duration"),
      (e[(e.QuantityRefill = 2)] = "QuantityRefill");
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
  (function (e) {
    (e.ChangeNextState = "ChangeNextState"),
      (e.ChangeCountDownState = "ChangeCountDownState"),
      (e.ChangeLockState = "ChangeLockState"),
      (e.ChangeNextAndLockTargetState = "ChangeNextAndLockTargetState"),
      (e.ChangeTargetState = "ChangeTargetState");
  })((EHitLogicType = exports.EHitLogicType || (exports.EHitLogicType = {}))),
  (function (e) {
    (e.OnlyDropAttack = "OnlyDropAttack"),
      (e.CrystalAttack = "CrystalAttack"),
      (e.PlayerAttack = "PlayerAttack"),
      (e.FixedBulletId = "FixedBulletId"),
      (e.AllCharacterAttack = "AllCharacterAttack");
  })(
    (EHitBulletType = exports.EHitBulletType || (exports.EHitBulletType = {})),
  ),
  (function (e) {
    (e.SameSpecificState = "SameSpecificState"),
      (e.SameArbitraryState = "SameArbitraryState"),
      (e.CountDownState = "CountDownState"),
      (e.SpecificTargetState = "SpecificTargetState");
  })(
    (ETargetGearGroupSuccessCondition =
      exports.ETargetGearGroupSuccessCondition ||
      (exports.ETargetGearGroupSuccessCondition = {})),
  ),
  (function (e) {
    (e.ArbitraryState = "ArbitraryState"),
      (e.SequentialState = "SequentialState"),
      (e.HitTargetEntity = "HitTargetEntity");
  })(
    (ETargetGearGroupFailureCondition =
      exports.ETargetGearGroupFailureCondition ||
      (exports.ETargetGearGroupFailureCondition = {})),
  ),
  ((EGearHitAffectType =
    exports.EGearHitAffectType ||
    (exports.EGearHitAffectType = {})).ChangeNextState = "ChangeNextState"),
  (function (e) {
    (e.Silence = "Silence"), (e.Destroy = "Destroy");
  })(
    (EGroupFinishConfig =
      exports.EGroupFinishConfig || (exports.EGroupFinishConfig = {})),
  ),
  (function (e) {
    (e.Finite = "Finite"), (e.Loop = "Loop"), (e.Sit = "Sit");
  })(
    (ENpcStandbyShowMode =
      exports.ENpcStandbyShowMode || (exports.ENpcStandbyShowMode = {})),
  ),
  (function (e) {
    (e.Randomly = "Randomly"), (e.Orderly = "Orderly");
  })(
    (ENpcStandbyShowFinitelyPlayMode =
      exports.ENpcStandbyShowFinitelyPlayMode ||
      (exports.ENpcStandbyShowFinitelyPlayMode = {})),
  ),
  (function (e) {
    (e.HandInItem = "HandInItem"),
      (e.Shop = "Shop"),
      (e.AntiqueShop = "AntiqueShop"),
      (e.ChengXiaoShanShop = "ChengXiaoShanShop"),
      (e.Gramophone = "Gramophone");
  })(
    (ENpcUiInteractType =
      exports.ENpcUiInteractType || (exports.ENpcUiInteractType = {})),
  ),
  ((ESpecialNpcType =
    exports.ESpecialNpcType || (exports.ESpecialNpcType = {})).BaseRoleNpc =
    "BaseRoleNpc"),
  (function (e) {
    (e.DirectionalField = "DirectionalField"), (e.PointField = "PointField");
  })(
    (EConveyorBeltFieldType =
      exports.EConveyorBeltFieldType || (exports.EConveyorBeltFieldType = {})),
  ),
  ((EConveyorBeltMoveType =
    exports.EConveyorBeltMoveType ||
    (exports.EConveyorBeltMoveType = {})).FixSpeed = "FixSpeed"),
  (function (e) {
    (e[(e.Distance = 0)] = "Distance"), (e[(e.Global = 1)] = "Global");
  })((ETriggerMode = exports.ETriggerMode || (exports.ETriggerMode = {}))),
  (function (e) {
    (e[(e.BigWorldDisableResurrectionItem = 12)] =
      "BigWorldDisableResurrectionItem"),
      (e[(e.BigWorldEnableResurrectionItem = 13)] =
        "BigWorldEnableResurrectionItem");
  })((EReviveType = exports.EReviveType || (exports.EReviveType = {}))),
  ((EColorChangeStrategyOfSplineEffect =
    exports.EColorChangeStrategyOfSplineEffect ||
    (exports.EColorChangeStrategyOfSplineEffect = {})).RGB = "RGB"),
  (function (e) {
    e[(e.Effect = 0)] = "Effect";
  })(
    (EMonsterShowOnDeathType =
      exports.EMonsterShowOnDeathType ||
      (exports.EMonsterShowOnDeathType = {})),
  ),
  (function (e) {
    (e.Linear = "Linear"),
      (e.Curve = "Curve"),
      (e.Constant = "Constant"),
      (e.CurveCustomTangent = "CurveCustomTangent");
  })((ESplineLine = exports.ESplineLine || (exports.ESplineLine = {}))),
  (function (e) {
    (e.Common = "Common"),
      (e.Parkour = "Parkour"),
      (e.Butterfly = "Butterfly"),
      (e.Effect = "Effect"),
      (e.Patrol = "Patrol"),
      (e.LevelAI = "LevelAI"),
      (e.AirPassage = "AirPassage"),
      (e.ContinuesVariableSpeedMovement = "ContinuesVariableSpeedMovement"),
      (e.TimePatrol = "TimePatrol");
  })((ESplineType = exports.ESplineType || (exports.ESplineType = {}))),
  ((EPointGroupGenerateType =
    exports.EPointGroupGenerateType ||
    (exports.EPointGroupGenerateType = {})).Layer = "Layer"),
  (function (e) {
    (e.WholeLine = "WholeLine"), (e.EquidistantPoint = "EquidistantPoint");
  })(
    (EEffectSplineCreateMode =
      exports.EEffectSplineCreateMode ||
      (exports.EEffectSplineCreateMode = {})),
  ),
  (function (e) {
    (e[(e.Walk = 1)] = "Walk"),
      (e[(e.Run = 2)] = "Run"),
      (e[(e.Sprint = 3)] = "Sprint");
  })(
    (EPatrolMoveState =
      exports.EPatrolMoveState || (exports.EPatrolMoveState = {})),
  ),
  (exports.patrolMoveStateNameByValue = {
    [EPatrolMoveState.Walk]: "走",
    [EPatrolMoveState.Run]: "跑",
    [EPatrolMoveState.Sprint]: "冲刺",
  }),
  (function (e) {
    (e.Loop = "Loop"), (e.Once = "Once");
  })(
    (EPatrolCycleMode =
      exports.EPatrolCycleMode || (exports.EPatrolCycleMode = {})),
  ),
  ((ELevelAiCycleMode =
    exports.ELevelAiCycleMode || (exports.ELevelAiCycleMode = {})).Loop =
    "Loop"),
  (function (e) {
    (e.FreeAngle = "FreeAngle"), (e.FixedAngle = "FixedAngle");
  })(
    (EControllerType =
      exports.EControllerType || (exports.EControllerType = {})),
  ),
  ((EReboundOptionType =
    exports.EReboundOptionType ||
    (exports.EReboundOptionType = {})).ForwardFront = "ForwardFront"),
  (function (e) {
    (e.Fixed = "Fixed"), (e.Direction = "Direction");
  })((EFillType = exports.EFillType || (exports.EFillType = {}))),
  (function (e) {
    (e.ActivateAllCorrectPiece = "ActivateAllCorrectPiece"),
      (e.ActivateSpecifiedPiece = "ActivateSpecifiedPiece"),
      (e.PutInTheSpecifiedPiece = "PutInTheSpecifiedPiece"),
      (e.ActivateRenjuPiece = "ActivateRenjuPiece");
  })(
    (EJigsawCompleteCondition =
      exports.EJigsawCompleteCondition ||
      (exports.EJigsawCompleteCondition = {})),
  ),
  (function (e) {
    (e.PullGiant = "PullGiant"),
      (e.StatueInteractPoint = "StatueInteractPoint"),
      (e.PullStatue = "PullStatue"),
      (e.RagDollCrushingRock = "RagDollCrushingRock"),
      (e.RagDollDestroySolidRock = "RagDollDestroySolidRock"),
      (e.LonelyDollPollutant = "LonelyDollPollutant"),
      (e.Custom = "Custom");
  })(
    (EExploreSkillInteractType =
      exports.EExploreSkillInteractType ||
      (exports.EExploreSkillInteractType = {})),
  ),
  (function (e) {
    (e.AngleWeight = "AngleWeight"),
      (e.EnterScreenWeight = "EnterScreenWeight");
  })(
    (EExploreSkillSearchTargetCfg =
      exports.EExploreSkillSearchTargetCfg ||
      (exports.EExploreSkillSearchTargetCfg = {})),
  ),
  (function (e) {
    (e.Hit = "Hit"), (e.FKey = "FKey");
  })(
    (EFanInteractType =
      exports.EFanInteractType || (exports.EFanInteractType = {})),
  ),
  (function (e) {
    (e.ReboundPlateGear = "ReboundPlateGear"),
      (e.LightDeliver = "LightDeliver ");
  })((EFanGearType = exports.EFanGearType || (exports.EFanGearType = {}))),
  (exports.levelPrefabBpPathConfig = {
    Item: "/Game/Aki/Character/Item/BP_BaseItem.BP_BaseItem_C",
    InteractedBox:
      "/Game/Aki/GamePlay/InteractiveObject/BP_InteractedBox.BP_InteractedBox_C",
    PhysicsItem:
      "/Game/Aki/GamePlay/InteractiveObject/BP_PhysicsItem.BP_PhysicsItem_C",
  }),
  (function (e) {
    (e.RenjuStrategy = "RenjuStrategy"), (e.RaceStrategy = "RaceStrategy");
  })(
    (EAiGearStrategy =
      exports.EAiGearStrategy || (exports.EAiGearStrategy = {})),
  ),
  ((EPickInteraction =
    exports.EPickInteraction ||
    (exports.EPickInteraction = {})).ChessmanInteract = "ChessmanInteract"),
  (function (e) {
    (e.Low = "Low"),
      (e.Medium = "Medium"),
      (e.High = "High"),
      (e.SuperHigh = "SuperHigh");
  })(
    (EDetectionFrequency =
      exports.EDetectionFrequency || (exports.EDetectionFrequency = {})),
  ),
  (function (e) {
    (e[(e.Sprint = 0)] = "Sprint"), (e[(e.Stationary = 1)] = "Stationary");
  })(
    (EBatchBulletMovementType =
      exports.EBatchBulletMovementType ||
      (exports.EBatchBulletMovementType = {})),
  ),
  ((EGroupAiMode = exports.EGroupAiMode || (exports.EGroupAiMode = {})).Patrol =
    "Patrol"),
  (function (e) {
    (e.Role = "Role"), (e.SceneItem = "SceneItem");
  })(
    (EInhalationPerformanceType =
      exports.EInhalationPerformanceType ||
      (exports.EInhalationPerformanceType = {})),
  ),
  (function (e) {
    (e.DestroySelf = "DestroySelf"), (e.ChangeSelfState = "ChangeSelfState");
  })(
    (EInhaledPerResultType =
      exports.EInhaledPerResultType || (exports.EInhaledPerResultType = {})),
  ),
  (function (e) {
    (e.FlowerBridge = "FlowerBridge"),
      (e.BookPage = "BookPage"),
      (e.FogBarrier = "FogBarrier");
  })(
    (ERenderSpecifiedRangeType =
      exports.ERenderSpecifiedRangeType ||
      (exports.ERenderSpecifiedRangeType = {})),
  ),
  (function (e) {
    e[(e.Directional = 0)] = "Directional";
  })(
    (EWindSourceType =
      exports.EWindSourceType || (exports.EWindSourceType = {})),
  );
//# sourceMappingURL=IComponent.js.map
