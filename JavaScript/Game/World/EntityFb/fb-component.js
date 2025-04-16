"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ButterflySpline =
    exports.BulletCfg =
    exports.BuildingBlockFoundation =
    exports.BuffProducerComponent =
    exports.BuffConsumerComponent =
    exports.BuffAreaStateConfig =
    exports.BuffArea =
    exports.BubbleComponent =
    exports.BoxAkEvent =
    exports.BossStateViewConfig =
    exports.BehaviorFlowComponent =
    exports.BeamReceiveComponent =
    exports.BeamCastComponent =
    exports.BattleVehicleFeature =
    exports.BatchBulletItem =
    exports.BatchBulletCasterComponent =
    exports.BatchBulletCaster =
    exports.BaseRoleNpcPerform =
    exports.BaseInfoComponent =
    exports.AutoConfig =
    exports.AudioVehicleFeature =
    exports.AudioPointNearbyTracking =
    exports.AudioFade =
    exports.AudioEventConfig =
    exports.AttributeComponent =
    exports.AttachTargetComponent =
    exports.AreaBouns =
    exports.AnimalModel =
    exports.AnimalComponent =
    exports.AngleWeight =
    exports.AllRefreshContent =
    exports.AllKillCondition =
    exports.AirWallSpawnerComponent =
    exports.AirPassageSpline =
    exports.AirPassageComponent =
    exports.AimPart =
    exports.AiGearStrategyComponent =
    exports.AiComponent =
    exports.AiAlertNotifyComponent =
    exports.AdviseItemComponent =
    exports.AdsortTransform =
    exports.AdsorptionMatchingAnimation =
    exports.AdsorbComponent =
    exports.AdsorbAddBuff =
    exports.ActorStateComponent =
    exports.ActorAttachTarget =
    exports.ActiveRenjuPiece =
    exports.ActivateSpecifiedPieceConfig =
    exports.ActivateSpecifiedPiece =
    exports.ActivateAllCorrectPiece =
      void 0),
  (exports.ConveyorBeltComponent =
    exports.ControlPointEventConfig =
    exports.ContinuesVariableSpeedSplinePoint =
    exports.ContinuesVariableSpeedMovementSpline =
    exports.ConnectorRange =
    exports.ConnectorEffectConfig =
    exports.ConnectorComponent =
    exports.CondtionListener =
    exports.ConditionListenerComponent =
    exports.ConditionHitConfigWithBullet =
    exports.ConditionHitConfig =
    exports.ConditionBubbleData =
    exports.ConditionAction =
    exports.ComponentItem =
    exports.ComponentData =
    exports.CompassTracking =
    exports.CommonSplinePoint =
    exports.CommonSpline =
    exports.CombinedVisibleGroupComponent =
    exports.CombatComponent =
    exports.ColorChangeStrategyOfRGB =
    exports.CollectComponent =
    exports.CollectAnimalPartsConfig =
    exports.CollectAnimalConfig =
    exports.ClientTriggerComponent =
    exports.ClientConditionListenerComponent =
    exports.ClientConditionListener =
    exports.Circumnutation =
    exports.ChessmanPickInteraction =
    exports.ChessmanComponent =
    exports.CheckGearHit =
    exports.ChargingDevice =
    exports.ChargeSlashHook =
    exports.ChargeSlashControl =
    exports.ChargeSlashAirFloatingConfig =
    exports.CharacterConnectorRange =
    exports.CharacterConnectorComponent =
    exports.CdRefreshRule =
    exports.CategoryMatchingSucceedBase =
    exports.CategoryMatchingSucceed =
    exports.CategoryMatchingFoundation =
    exports.CategoryMatchingConfigBase =
    exports.CategoryMatchingConfig =
    exports.CategoryMatchingCondition =
    exports.CategoryMatchingAnimationBase =
    exports.CategoryMatchingAnimation =
    exports.CaptureStrategicPoint2 =
    exports.CaptureStrategicPoint =
    exports.CalculateComponent =
    exports.ButterflySplinePoint =
      void 0),
  (exports.EntityGroupComponent =
    exports.EntityGravityConfig =
    exports.EntityCustomAudioComponent =
    exports.EntityCategoryWeight =
    exports.EntityCategory =
    exports.EntityBundleComponent =
    exports.EntityBundleChildInfo =
    exports.EntityBatchRefreshComponent =
    exports.EntityAudioComponent =
    exports.EntityAttachTarget =
    exports.EntityAngleWeight =
    exports.EnterScreenWeight =
    exports.EnrichmentAreaComponent =
    exports.ElementDamage =
    exports.EffectSplineWholeLineMode =
    exports.EffectSplineEquidistantPointMode =
    exports.EffectSpline =
    exports.EffectAreaComponent =
    exports.EditCustomAoiComponent =
    exports.DynamicTeleportComponent =
    exports.DynamicPortalCreatorComponent =
    exports.DynamicPortalConfig =
    exports.DynamicPortalByBullet =
    exports.DynamicPortal =
    exports.DynamicEntityMatch =
    exports.DynamicBulletConfig =
    exports.DynamicAttachTarget =
    exports.DurationCondition =
    exports.DurabilityWorn =
    exports.DurabilityStateConfig =
    exports.DurabilityState =
    exports.DungeonEntryComponent =
    exports.DropComponent =
    exports.DirectionalField =
    exports.DirectionFill =
    exports.DestructibleItem =
    exports.DestroyStageConfig =
    exports.DestroyCfg =
    exports.DelayChangeState =
    exports.DeflectionRandom =
    exports.DeflectionCustom =
    exports.DefaultAkEvent =
    exports.DaNpcModel =
    exports.CustomViewDistance =
    exports.CustomAoizRadius =
    exports.CurveControlComponent =
    exports.CreateStageConfig =
    exports.CreateBulletDestroyCondition =
    exports.CreateBulletConfig =
    exports.ConveyorBeltState =
      void 0),
  (exports.FixedDateTime =
    exports.FixedAngleTurntable =
    exports.FixedAngleItem =
    exports.FixSpeed =
    exports.FishingPointAdditionalInfo =
    exports.FireBulletAddBuff =
    exports.FinishStateTrigger =
    exports.FightMusicsSwitchByTagList =
    exports.FightMusicSwitchByTag =
    exports.FightInteractComponent =
    exports.FanStateEffect =
    exports.FanInteractByHit =
    exports.FanInteractByFKey =
    exports.FanEffectConfig =
    exports.FanComponent =
    exports.FailureStateTrigger =
    exports.FailureConditionSequentialState =
    exports.FailureConditionHitTargetEntity =
    exports.FailureConditionArbitraryState =
    exports.ExtraAiAlert =
    exports.ExploreSkillStatueInteractPoint =
    exports.ExploreSkillRagDollDestroySolidRock =
    exports.ExploreSkillRagDollCrushingRock =
    exports.ExploreSkillPullStatue =
    exports.ExploreSkillPullGiant =
    exports.ExploreSkillLonelyDollPollutant =
    exports.ExploreSkillInteractComponent =
    exports.ExploreSkillCustom =
    exports.ExchangeSlideRailConfig =
    exports.EventRotator =
    exports.EntityVisibleComponent =
    exports.EntityTrackControlPoint =
    exports.EntityTrackControl =
    exports.EntityStateTrigger =
    exports.EntityStateComponent =
    exports.EntityStateAudioConfig =
    exports.EntityStateAudioComponent =
    exports.EntityState =
    exports.EntityScanFunction =
    exports.EntityPackageNode =
    exports.EntityPackageData =
    exports.EntityPackageComponent =
    exports.EntityMatchPlayer =
    exports.EntityMatchDynamic =
    exports.EntityMatchAllCharacter =
    exports.EntityMatch =
    exports.EntityListComponent =
    exports.EntityListBatch =
    exports.EntityGroupFailureSequentialState =
    exports.EntityGroupFailureArbitraryState =
      void 0),
  (exports.IgnoresCollisionCfg =
    exports.IgnoreEntityIdsCollision =
    exports.IconNearbyTracking =
    exports.IconNearByTrackingConfig =
    exports.HookLockPoint =
    exports.HoldingTrackTarget =
    exports.HoldCfg =
    exports.HitTimeScaleRatio =
    exports.HitLogicChangeTargetState =
    exports.HitLogicChangeNextState =
    exports.HitLogicChangeNextAndLockTargetState =
    exports.HitLogicChangeLockState =
    exports.HitLogicChangeCountDownState =
    exports.HitComponent =
    exports.HitBulletTypePlayerAttack =
    exports.HitBulletTypeOnlyDropAttack =
    exports.HitBulletTypeFixedBulletId =
    exports.HitBulletTypeCrystalAttack =
    exports.HitBulletTypeAllCharacterAttack =
    exports.HighViewDistance =
    exports.HeadStateViewConfig =
    exports.HeadInfoChangeData =
    exports.HackManagementComponent =
    exports.GuideLineCreatorScanOption =
    exports.GuideLineCreatorComponent =
    exports.GroupFinishSilence =
    exports.GroupFinishDestroy =
    exports.GroupDestroyListenConfig =
    exports.GroupAiPatrol =
    exports.GroupAiComponent =
    exports.GravityFlipTeleportConfig =
    exports.GravityFlipConfig =
    exports.GravityFlipComponent =
    exports.GramophoneAudioControl =
    exports.GrabComponent =
    exports.GazePerformance =
    exports.GazeNextPointAfterInteract =
    exports.GazeCondition =
    exports.FreeAngleTurntable =
    exports.FreeAngleItem =
    exports.ForwardFrontRebound =
    exports.FollowTrackToStart =
    exports.FollowTrackToSplineDestination =
    exports.FollowTrackToFoundation =
    exports.FollowTrackComponent =
    exports.FollowShooterComponent =
    exports.FlowComponent =
    exports.FixedPointHook =
    exports.FixedFill =
    exports.FixedDateTimeRefreshRule =
      void 0),
  (exports.LiftComponent =
    exports.LifePointCenterComponent =
    exports.LevitateMagnetComponent =
    exports.LevelSequenceSectionInfo =
    exports.LevelSequenceFrameEventComponent =
    exports.LevelQteComponent =
    exports.LevelPrefabPerformComponent =
    exports.LevelPrefabParamsConfig =
    exports.LevelPrefab =
    exports.LevelPlayComponent =
    exports.LevelAiCycleLooply =
    exports.LevelAIState =
    exports.LevelAISplinePoint =
    exports.LevelAISpline =
    exports.LevelAIComponent =
    exports.LevelAIBehaviourSpline =
    exports.LetGoDestroyCondition =
    exports.KiteHook =
    exports.KeyRotatorConfig =
    exports.JigsawPieceMatch =
    exports.JigsawItemMatchedConfig =
    exports.JigsawItem =
    exports.JigsawFoundation =
    exports.JigsawCompletedConfig =
    exports.ItemLockingConfig =
    exports.ItemFoundation2 =
    exports.ItemFoundation =
    exports.ItemChangeAdsorbateState =
    exports.InteractiveComponent =
    exports.InteractSectorRange =
    exports.InteractPlayerDiractionToNpc =
    exports.InteractPlayerDiractionToLeisure =
    exports.InteractGearComponent =
    exports.InteractComponent =
    exports.InteractBehaviourActions =
    exports.InteractAudioComponent =
    exports.InitStateWuYinQu =
    exports.InitStateStandby =
    exports.InitStateDigital =
    exports.InitStateBirth =
    exports.InitStateBarrierLock =
    exports.InhaledPerformance =
    exports.InhaledItemComponent =
    exports.InhaledDestroySelf =
    exports.InhaledChangeSelfState =
    exports.InhalationMatching =
    exports.InhalationConfig =
    exports.InhalationAbilityComponent =
    exports.ImmediateStartCondition =
    exports.ImmediateAddBuff =
      void 0),
  (exports.OperationsAfterEntityGroupFailure =
    exports.OnThrowTriggerTimeCondition =
    exports.OnOpenGravityCollisionCondition =
    exports.OnMatchingCondition =
    exports.OnHitCondition =
    exports.OnCollisionCondition =
    exports.NpcUiInteractOnShop =
    exports.NpcUiInteractOnHandInItem =
    exports.NpcUiInteractOnGramophone =
    exports.NpcUiInteractOnChengXiaoShanShop =
    exports.NpcUiInteractOnAntiqueShop =
    exports.NpcStandbySit =
    exports.NpcStandbyShowLooply =
    exports.NpcStandbyShowFinitelyInfo =
    exports.NpcStandbyShowFinitely =
    exports.NpcRideInGongduolaPerform =
    exports.NpcRideInAutoGongduolaPerform =
    exports.NpcPerformStateConfig =
    exports.NpcPerformState =
    exports.NpcPerformOnMonsterCloseby =
    exports.NpcPerformOnInteract =
    exports.NpcPerformComponent =
    exports.NpcPerformBubble =
    exports.NpcModel =
    exports.NpcHitShow =
    exports.NpcDeathInteract =
    exports.NpcBumpShow =
    exports.NoRenderPortalComponent =
    exports.NextSlideRail =
    exports.NearbyTrackingComponent =
    exports.MovementVehicleFeature =
    exports.MovementPointHook =
    exports.MovementPerformConfig =
    exports.MoveComponent =
    exports.MonsterShowOnDeathEffect =
    exports.MonsterPerformConfig =
    exports.MonsterGachaSlot =
    exports.MonsterGachaItemComponent =
    exports.MonsterGachaBaseComponent =
    exports.MonsterFormation =
    exports.MonsterComponent =
    exports.MonitorComponent =
    exports.ModelId =
    exports.ModelComponent =
    exports.MidViewDistance =
    exports.MeshNpcModel =
    exports.MeshAnimalModel =
    exports.LowViewDistance =
    exports.LockConfig =
    exports.LocationSafetyComponent =
      void 0),
  (exports.RangeComponent =
    exports.RangeAdsorptionFoundation =
    exports.RandomNpcRule =
    exports.RandomInteractOption =
    exports.RandomInteract =
    exports.RandomEntityRefreshContent =
    exports.RandomBatchRefresh =
    exports.RandomBatchPoolRefresh =
    exports.RagDollJumpingPoint =
    exports.RagDollClimbingPoint =
    exports.RaceStrategy =
    exports.QuantityRefillCondition =
    exports.QteCallback =
    exports.PutInTheSpecifiedPiece =
    exports.PulseDeviceFoundation =
    exports.PullingFoundation =
    exports.PullingCategoryMatchingFoundation =
    exports.ProjectileMotion =
    exports.ProgressBarControlComponent =
    exports.ProbabilityRefreshItem =
    exports.ProbabilityRefreshGroup =
    exports.PrefabStateConfig =
    exports.PrefabEffectConfig =
    exports.PortalRenderConfig =
    exports.PortalComponent =
    exports.PointGroupByLayer =
    exports.PointGroup =
    exports.PointField =
    exports.PointAttachTarget =
    exports.PointAkEvent =
    exports.PickInteractComponent =
    exports.PhysicsConstraintComponent =
    exports.PhotoTargetComponent =
    exports.PatrolSplinePoint =
    exports.PatrolSpline =
    exports.PatrolRange =
    exports.PatrolCycleOncely =
    exports.PatrolCycleLooply =
    exports.PatrolAction =
    exports.Patrol =
    exports.PasserbyNpcTemplateSource =
    exports.PasserbyNpcSplineMove =
    exports.PasserbyNpcSpline =
    exports.PasserbyNpcSpawnComponent =
    exports.PasserbyNpcMoveState =
    exports.PasserbyNpcFixIntervalSpawn =
    exports.PassengerTeleportConfig =
    exports.ParkourSplinePoint =
    exports.ParkourSpline =
    exports.ParkourPointLayerConfig =
      void 0),
  (exports.SpawnTemplateEntityConfig =
    exports.SpawnMonsterPreDependOnPreceding =
    exports.SpawnMonsterConstraintAnnularSector =
    exports.SpawnMonsterConfig =
    exports.SpawnMonsterComponent =
    exports.SlideRailComponent =
    exports.SlashHook =
    exports.SkyboxGlobalTrigger =
    exports.SkyboxDistanceTrigger =
    exports.SkyboxComponent =
    exports.SkillDamage =
    exports.SingleBtnQte =
    exports.SettingSpringDir =
    exports.SequenceTrackControlPoint =
    exports.SequenceTrackControl =
    exports.SequenceBatchRefresh =
    exports.SearchTargetCfg =
    exports.SceneItemPatrol =
    exports.SceneItemMovementComponent =
    exports.SceneItemLifeCycleComponent =
    exports.SceneItemInhalation =
    exports.SceneItemAttributeComponent =
    exports.SceneItemAiPatrolByGameTime =
    exports.SceneItemAiComponent =
    exports.SceneBulletGroup =
    exports.SceneBulletComponent =
    exports.SceneActorRefGroup =
    exports.SceneActorRefComponent =
    exports.ScanTraceEffect =
    exports.RotatorComponent2 =
    exports.RotatorComponent =
    exports.RotationConfig =
    exports.RoleInhalation =
    exports.RewardRefreshConfig =
    exports.RewardComponent =
    exports.ResurrectionComponent =
    exports.ResetSelfPosComponent =
    exports.ResetEntitiesPosComponent =
    exports.RenjuStrategy =
    exports.RenjuConfig =
    exports.RenderTrajectoryConfig =
    exports.RenderSpecifiedRangeComponent =
    exports.RenderFogBarrier =
    exports.RenderFlowerBridge =
    exports.RenderFlag =
    exports.RenderBookPage =
    exports.RefreshSingleComponent =
    exports.RefreshGroupComponent =
    exports.RefreshComponent =
    exports.ReboundComponent =
      void 0),
  (exports.TriggerMatchConfig =
    exports.TriggerExitConfig =
    exports.TriggerCountConfig =
    exports.TriggerComponent =
    exports.TreasureBoxComponent =
    exports.TrampleUe5Component =
    exports.TrampleComponent =
    exports.TowardEntityConfig =
    exports.TimelineTrackControlComponent =
    exports.TimelineControlGroup =
    exports.TimedStrikeDevice =
    exports.TimeStopTarget =
    exports.TimeStopComponent =
    exports.TimePatrolSplinePoint =
    exports.TimePatrolSpline =
    exports.TimePathConfig =
    exports.ThrowMotionTrackTarget =
    exports.ThrowMotionLevitate =
    exports.ThrowDestroyCondition =
    exports.ThrowCfg =
    exports.TemplateMatrixRow =
    exports.TemplateMatrix =
    exports.TemplateEntitySpawnerComponent =
    exports.TeleportSceneEffect =
    exports.TeleportComponent =
    exports.TeleControlBaseCfg =
    exports.TeleControl2 =
    exports.TargetGearGroupConfig =
    exports.TargetGearGroupComponent =
    exports.TargetGearComponent =
    exports.SwitcherComponent =
    exports.SuiGuangHook =
    exports.SuccessConditionSpecificTargetState =
    exports.SuccessConditionSameSpecificState =
    exports.SuccessConditionSameArbitraryState =
    exports.SuccessConditionCountDownState =
    exports.StaticPortal =
    exports.StaticNoRenderPortal =
    exports.StaticEntitiyMatch =
    exports.StateRotationConfig =
    exports.StateHintComponent =
    exports.StateConfig =
    exports.StateChangeConfig =
    exports.StateChangeBehavior =
    exports.SpringComponent =
    exports.SplineMove =
    exports.SplineComponent =
    exports.SphereFactoryComponent =
    exports.SpeedEffectConfig =
    exports.SpeedCurveMotion =
      void 0),
  (exports.UnionModelType =
    exports.UnionLevelAiCycleOption =
    exports.UnionLevelAIBehaviour =
    exports.UnionJigsawCompleteCondition =
    exports.UnionItemFoundation =
    exports.UnionInteractPlayerDiractionOption =
    exports.UnionInteractAdditionalInfo =
    exports.UnionInitState =
    exports.UnionInhaledPerResultType =
    exports.UnionInhalationPerformance =
    exports.UnionHookInteractConfig =
    exports.UnionHitLogicType =
    exports.UnionHitBulletType =
    exports.UnionGroupFinishConfig =
    exports.UnionGroupAiOption =
    exports.UnionFollowTrackEndOption =
    exports.UnionFillConfig =
    exports.UnionFightMusicsSwitchType =
    exports.UnionFanInteractOption =
    exports.UnionExploreSkillSearchTargetCfg =
    exports.UnionExploreSkillInteractOption =
    exports.UnionEntityMatch =
    exports.UnionEntityGroupFailureCondition =
    exports.UnionEntityBatchRefresh =
    exports.UnionEntityBatch =
    exports.UnionEffectSplineCreateOption =
    exports.UnionEffectAreaConfig =
    exports.UnionDynamicPortalCreate =
    exports.UnionDeflectionConfig =
    exports.UnionCurveControlConfig =
    exports.UnionConveyorBeltMoveType =
    exports.UnionConveyorBeltFieldType =
    exports.UnionConnectorLogic =
    exports.UnionComponent =
    exports.UnionColorChangeStrategyOfSplineEffect =
    exports.UnionCharacterConnectorLogic =
    exports.UnionBulletCreateCondition =
    exports.UnionAudioControlType =
    exports.UnionAttachTarget =
    exports.UnionAnimalModelType =
    exports.UnionAkEventType =
    exports.UnionAiGearStrategy =
    exports.UnionAddBuffMode =
    exports.UndergroundStateInfo =
    exports.UndergroundComponent =
    exports.UnUseComponent =
    exports.TurntableControlComponent =
    exports.TriggeredConfig =
    exports.TriggerUe5Component =
    exports.TriggerRangeStartCondition =
      void 0),
  (exports.VisibleConditionGroup =
    exports.VehiclePassengerConfig =
    exports.VehicleMontagePlayConfig =
    exports.VehicleComponent =
    exports.VehicleAudioConfig =
    exports.VarComponent =
    exports.UnionWorldLevelBonus =
    exports.UnionWindSource =
    exports.UnionVehicleFeature =
    exports.UnionTurntableController =
    exports.UnionTriggerMode =
    exports.UnionTimelineTrackControlConfig =
    exports.UnionThrowMotion =
    exports.UnionTeleControlDestroyCondition =
    exports.UnionTargetGearGroupSuccessCondition =
    exports.UnionTargetGearGroupFailureCondition =
    exports.UnionSplineOption =
    exports.UnionSpecialNpcPerformType =
    exports.UnionSpecialAnimalConfig =
    exports.UnionSpawnMonsterStartCondition =
    exports.UnionSpawnMonsterPreCondition =
    exports.UnionSpawnMonsterConstraint =
    exports.UnionSpawnMonsterCompleteCondition =
    exports.UnionSpawnConfig =
    exports.UnionSceneItemAiType =
    exports.UnionSceneItemAiPatrolType =
    exports.UnionRenderSpecifiedRangeConfig =
    exports.UnionRefreshRule =
    exports.UnionRefreshContent =
    exports.UnionReboundOption =
    exports.UnionQteType =
    exports.UnionPullingFoundation =
    exports.UnionProgressBarControl =
    exports.UnionPortalViewDistanceConfig =
    exports.UnionPortalConfig =
    exports.UnionPointGroup =
    exports.UnionPickInteraction =
    exports.UnionPhysicsAttachTarget =
    exports.UnionPatrolCycleOption =
    exports.UnionPasserbyNpcSpawn =
    exports.UnionPasserbyNpcSource =
    exports.UnionPasserbyNpcMove =
    exports.UnionNpcUiInteractOption =
    exports.UnionNpcStandbyShowOption =
    exports.UnionNpcRideInVehiclePerformType =
    exports.UnionNpcModelType =
    exports.UnionNoRenderPortalConfig =
    exports.UnionNearbyTracking =
    exports.UnionMovementMode =
    exports.UnionMonsterShowOnDeathConfig =
      void 0),
  (exports.WorldLevelTable =
    exports.WindSourceComponent =
    exports.WindDirectionalStateGrade =
    exports.WindDirectional =
    exports.WeaponDamage =
    exports.WeaponComponent =
    exports.WalkingPatternComponent =
    exports.VisionItemComponent =
    exports.VisionComponent =
    exports.VisionCaptureComponent =
      void 0);
var activate_all_correct_piece_js_1 = require("./fb-component/activate-all-correct-piece.js"),
  activate_specified_piece_js_1 =
    (Object.defineProperty(exports, "ActivateAllCorrectPiece", {
      enumerable: !0,
      get: function () {
        return activate_all_correct_piece_js_1.ActivateAllCorrectPiece;
      },
    }),
    require("./fb-component/activate-specified-piece.js")),
  activate_specified_piece_config_js_1 =
    (Object.defineProperty(exports, "ActivateSpecifiedPiece", {
      enumerable: !0,
      get: function () {
        return activate_specified_piece_js_1.ActivateSpecifiedPiece;
      },
    }),
    require("./fb-component/activate-specified-piece-config.js")),
  active_renju_piece_js_1 =
    (Object.defineProperty(exports, "ActivateSpecifiedPieceConfig", {
      enumerable: !0,
      get: function () {
        return activate_specified_piece_config_js_1.ActivateSpecifiedPieceConfig;
      },
    }),
    require("./fb-component/active-renju-piece.js")),
  actor_attach_target_js_1 =
    (Object.defineProperty(exports, "ActiveRenjuPiece", {
      enumerable: !0,
      get: function () {
        return active_renju_piece_js_1.ActiveRenjuPiece;
      },
    }),
    require("./fb-component/actor-attach-target.js")),
  actor_state_component_js_1 =
    (Object.defineProperty(exports, "ActorAttachTarget", {
      enumerable: !0,
      get: function () {
        return actor_attach_target_js_1.ActorAttachTarget;
      },
    }),
    require("./fb-component/actor-state-component.js")),
  adsorb_add_buff_js_1 =
    (Object.defineProperty(exports, "ActorStateComponent", {
      enumerable: !0,
      get: function () {
        return actor_state_component_js_1.ActorStateComponent;
      },
    }),
    require("./fb-component/adsorb-add-buff.js")),
  adsorb_component_js_1 =
    (Object.defineProperty(exports, "AdsorbAddBuff", {
      enumerable: !0,
      get: function () {
        return adsorb_add_buff_js_1.AdsorbAddBuff;
      },
    }),
    require("./fb-component/adsorb-component.js")),
  adsorption_matching_animation_js_1 =
    (Object.defineProperty(exports, "AdsorbComponent", {
      enumerable: !0,
      get: function () {
        return adsorb_component_js_1.AdsorbComponent;
      },
    }),
    require("./fb-component/adsorption-matching-animation.js")),
  adsort_transform_js_1 =
    (Object.defineProperty(exports, "AdsorptionMatchingAnimation", {
      enumerable: !0,
      get: function () {
        return adsorption_matching_animation_js_1.AdsorptionMatchingAnimation;
      },
    }),
    require("./fb-component/adsort-transform.js")),
  advise_item_component_js_1 =
    (Object.defineProperty(exports, "AdsortTransform", {
      enumerable: !0,
      get: function () {
        return adsort_transform_js_1.AdsortTransform;
      },
    }),
    require("./fb-component/advise-item-component.js")),
  ai_alert_notify_component_js_1 =
    (Object.defineProperty(exports, "AdviseItemComponent", {
      enumerable: !0,
      get: function () {
        return advise_item_component_js_1.AdviseItemComponent;
      },
    }),
    require("./fb-component/ai-alert-notify-component.js")),
  ai_component_js_1 =
    (Object.defineProperty(exports, "AiAlertNotifyComponent", {
      enumerable: !0,
      get: function () {
        return ai_alert_notify_component_js_1.AiAlertNotifyComponent;
      },
    }),
    require("./fb-component/ai-component.js")),
  ai_gear_strategy_component_js_1 =
    (Object.defineProperty(exports, "AiComponent", {
      enumerable: !0,
      get: function () {
        return ai_component_js_1.AiComponent;
      },
    }),
    require("./fb-component/ai-gear-strategy-component.js")),
  aim_part_js_1 =
    (Object.defineProperty(exports, "AiGearStrategyComponent", {
      enumerable: !0,
      get: function () {
        return ai_gear_strategy_component_js_1.AiGearStrategyComponent;
      },
    }),
    require("./fb-component/aim-part.js")),
  air_passage_component_js_1 =
    (Object.defineProperty(exports, "AimPart", {
      enumerable: !0,
      get: function () {
        return aim_part_js_1.AimPart;
      },
    }),
    require("./fb-component/air-passage-component.js")),
  air_passage_spline_js_1 =
    (Object.defineProperty(exports, "AirPassageComponent", {
      enumerable: !0,
      get: function () {
        return air_passage_component_js_1.AirPassageComponent;
      },
    }),
    require("./fb-component/air-passage-spline.js")),
  air_wall_spawner_component_js_1 =
    (Object.defineProperty(exports, "AirPassageSpline", {
      enumerable: !0,
      get: function () {
        return air_passage_spline_js_1.AirPassageSpline;
      },
    }),
    require("./fb-component/air-wall-spawner-component.js")),
  all_kill_condition_js_1 =
    (Object.defineProperty(exports, "AirWallSpawnerComponent", {
      enumerable: !0,
      get: function () {
        return air_wall_spawner_component_js_1.AirWallSpawnerComponent;
      },
    }),
    require("./fb-component/all-kill-condition.js")),
  all_refresh_content_js_1 =
    (Object.defineProperty(exports, "AllKillCondition", {
      enumerable: !0,
      get: function () {
        return all_kill_condition_js_1.AllKillCondition;
      },
    }),
    require("./fb-component/all-refresh-content.js")),
  angle_weight_js_1 =
    (Object.defineProperty(exports, "AllRefreshContent", {
      enumerable: !0,
      get: function () {
        return all_refresh_content_js_1.AllRefreshContent;
      },
    }),
    require("./fb-component/angle-weight.js")),
  animal_component_js_1 =
    (Object.defineProperty(exports, "AngleWeight", {
      enumerable: !0,
      get: function () {
        return angle_weight_js_1.AngleWeight;
      },
    }),
    require("./fb-component/animal-component.js")),
  animal_model_js_1 =
    (Object.defineProperty(exports, "AnimalComponent", {
      enumerable: !0,
      get: function () {
        return animal_component_js_1.AnimalComponent;
      },
    }),
    require("./fb-component/animal-model.js")),
  area_bouns_js_1 =
    (Object.defineProperty(exports, "AnimalModel", {
      enumerable: !0,
      get: function () {
        return animal_model_js_1.AnimalModel;
      },
    }),
    require("./fb-component/area-bouns.js")),
  attach_target_component_js_1 =
    (Object.defineProperty(exports, "AreaBouns", {
      enumerable: !0,
      get: function () {
        return area_bouns_js_1.AreaBouns;
      },
    }),
    require("./fb-component/attach-target-component.js")),
  attribute_component_js_1 =
    (Object.defineProperty(exports, "AttachTargetComponent", {
      enumerable: !0,
      get: function () {
        return attach_target_component_js_1.AttachTargetComponent;
      },
    }),
    require("./fb-component/attribute-component.js")),
  audio_event_config_js_1 =
    (Object.defineProperty(exports, "AttributeComponent", {
      enumerable: !0,
      get: function () {
        return attribute_component_js_1.AttributeComponent;
      },
    }),
    require("./fb-component/audio-event-config.js")),
  audio_fade_js_1 =
    (Object.defineProperty(exports, "AudioEventConfig", {
      enumerable: !0,
      get: function () {
        return audio_event_config_js_1.AudioEventConfig;
      },
    }),
    require("./fb-component/audio-fade.js")),
  audio_point_nearby_tracking_js_1 =
    (Object.defineProperty(exports, "AudioFade", {
      enumerable: !0,
      get: function () {
        return audio_fade_js_1.AudioFade;
      },
    }),
    require("./fb-component/audio-point-nearby-tracking.js")),
  audio_vehicle_feature_js_1 =
    (Object.defineProperty(exports, "AudioPointNearbyTracking", {
      enumerable: !0,
      get: function () {
        return audio_point_nearby_tracking_js_1.AudioPointNearbyTracking;
      },
    }),
    require("./fb-component/audio-vehicle-feature.js")),
  auto_config_js_1 =
    (Object.defineProperty(exports, "AudioVehicleFeature", {
      enumerable: !0,
      get: function () {
        return audio_vehicle_feature_js_1.AudioVehicleFeature;
      },
    }),
    require("./fb-component/auto-config.js")),
  base_info_component_js_1 =
    (Object.defineProperty(exports, "AutoConfig", {
      enumerable: !0,
      get: function () {
        return auto_config_js_1.AutoConfig;
      },
    }),
    require("./fb-component/base-info-component.js")),
  base_role_npc_perform_js_1 =
    (Object.defineProperty(exports, "BaseInfoComponent", {
      enumerable: !0,
      get: function () {
        return base_info_component_js_1.BaseInfoComponent;
      },
    }),
    require("./fb-component/base-role-npc-perform.js")),
  batch_bullet_caster_js_1 =
    (Object.defineProperty(exports, "BaseRoleNpcPerform", {
      enumerable: !0,
      get: function () {
        return base_role_npc_perform_js_1.BaseRoleNpcPerform;
      },
    }),
    require("./fb-component/batch-bullet-caster.js")),
  batch_bullet_caster_component_js_1 =
    (Object.defineProperty(exports, "BatchBulletCaster", {
      enumerable: !0,
      get: function () {
        return batch_bullet_caster_js_1.BatchBulletCaster;
      },
    }),
    require("./fb-component/batch-bullet-caster-component.js")),
  batch_bullet_item_js_1 =
    (Object.defineProperty(exports, "BatchBulletCasterComponent", {
      enumerable: !0,
      get: function () {
        return batch_bullet_caster_component_js_1.BatchBulletCasterComponent;
      },
    }),
    require("./fb-component/batch-bullet-item.js")),
  battle_vehicle_feature_js_1 =
    (Object.defineProperty(exports, "BatchBulletItem", {
      enumerable: !0,
      get: function () {
        return batch_bullet_item_js_1.BatchBulletItem;
      },
    }),
    require("./fb-component/battle-vehicle-feature.js")),
  beam_cast_component_js_1 =
    (Object.defineProperty(exports, "BattleVehicleFeature", {
      enumerable: !0,
      get: function () {
        return battle_vehicle_feature_js_1.BattleVehicleFeature;
      },
    }),
    require("./fb-component/beam-cast-component.js")),
  beam_receive_component_js_1 =
    (Object.defineProperty(exports, "BeamCastComponent", {
      enumerable: !0,
      get: function () {
        return beam_cast_component_js_1.BeamCastComponent;
      },
    }),
    require("./fb-component/beam-receive-component.js")),
  behavior_flow_component_js_1 =
    (Object.defineProperty(exports, "BeamReceiveComponent", {
      enumerable: !0,
      get: function () {
        return beam_receive_component_js_1.BeamReceiveComponent;
      },
    }),
    require("./fb-component/behavior-flow-component.js")),
  boss_state_view_config_js_1 =
    (Object.defineProperty(exports, "BehaviorFlowComponent", {
      enumerable: !0,
      get: function () {
        return behavior_flow_component_js_1.BehaviorFlowComponent;
      },
    }),
    require("./fb-component/boss-state-view-config.js")),
  box_ak_event_js_1 =
    (Object.defineProperty(exports, "BossStateViewConfig", {
      enumerable: !0,
      get: function () {
        return boss_state_view_config_js_1.BossStateViewConfig;
      },
    }),
    require("./fb-component/box-ak-event.js")),
  bubble_component_js_1 =
    (Object.defineProperty(exports, "BoxAkEvent", {
      enumerable: !0,
      get: function () {
        return box_ak_event_js_1.BoxAkEvent;
      },
    }),
    require("./fb-component/bubble-component.js")),
  buff_area_js_1 =
    (Object.defineProperty(exports, "BubbleComponent", {
      enumerable: !0,
      get: function () {
        return bubble_component_js_1.BubbleComponent;
      },
    }),
    require("./fb-component/buff-area.js")),
  buff_area_state_config_js_1 =
    (Object.defineProperty(exports, "BuffArea", {
      enumerable: !0,
      get: function () {
        return buff_area_js_1.BuffArea;
      },
    }),
    require("./fb-component/buff-area-state-config.js")),
  buff_consumer_component_js_1 =
    (Object.defineProperty(exports, "BuffAreaStateConfig", {
      enumerable: !0,
      get: function () {
        return buff_area_state_config_js_1.BuffAreaStateConfig;
      },
    }),
    require("./fb-component/buff-consumer-component.js")),
  buff_producer_component_js_1 =
    (Object.defineProperty(exports, "BuffConsumerComponent", {
      enumerable: !0,
      get: function () {
        return buff_consumer_component_js_1.BuffConsumerComponent;
      },
    }),
    require("./fb-component/buff-producer-component.js")),
  building_block_foundation_js_1 =
    (Object.defineProperty(exports, "BuffProducerComponent", {
      enumerable: !0,
      get: function () {
        return buff_producer_component_js_1.BuffProducerComponent;
      },
    }),
    require("./fb-component/building-block-foundation.js")),
  bullet_cfg_js_1 =
    (Object.defineProperty(exports, "BuildingBlockFoundation", {
      enumerable: !0,
      get: function () {
        return building_block_foundation_js_1.BuildingBlockFoundation;
      },
    }),
    require("./fb-component/bullet-cfg.js")),
  butterfly_spline_js_1 =
    (Object.defineProperty(exports, "BulletCfg", {
      enumerable: !0,
      get: function () {
        return bullet_cfg_js_1.BulletCfg;
      },
    }),
    require("./fb-component/butterfly-spline.js")),
  butterfly_spline_point_js_1 =
    (Object.defineProperty(exports, "ButterflySpline", {
      enumerable: !0,
      get: function () {
        return butterfly_spline_js_1.ButterflySpline;
      },
    }),
    require("./fb-component/butterfly-spline-point.js")),
  calculate_component_js_1 =
    (Object.defineProperty(exports, "ButterflySplinePoint", {
      enumerable: !0,
      get: function () {
        return butterfly_spline_point_js_1.ButterflySplinePoint;
      },
    }),
    require("./fb-component/calculate-component.js")),
  capture_strategic_point_js_1 =
    (Object.defineProperty(exports, "CalculateComponent", {
      enumerable: !0,
      get: function () {
        return calculate_component_js_1.CalculateComponent;
      },
    }),
    require("./fb-component/capture-strategic-point.js")),
  capture_strategic_point2_js_1 =
    (Object.defineProperty(exports, "CaptureStrategicPoint", {
      enumerable: !0,
      get: function () {
        return capture_strategic_point_js_1.CaptureStrategicPoint;
      },
    }),
    require("./fb-component/capture-strategic-point2.js")),
  category_matching_animation_js_1 =
    (Object.defineProperty(exports, "CaptureStrategicPoint2", {
      enumerable: !0,
      get: function () {
        return capture_strategic_point2_js_1.CaptureStrategicPoint2;
      },
    }),
    require("./fb-component/category-matching-animation.js")),
  category_matching_animation_base_js_1 =
    (Object.defineProperty(exports, "CategoryMatchingAnimation", {
      enumerable: !0,
      get: function () {
        return category_matching_animation_js_1.CategoryMatchingAnimation;
      },
    }),
    require("./fb-component/category-matching-animation-base.js")),
  category_matching_condition_js_1 =
    (Object.defineProperty(exports, "CategoryMatchingAnimationBase", {
      enumerable: !0,
      get: function () {
        return category_matching_animation_base_js_1.CategoryMatchingAnimationBase;
      },
    }),
    require("./fb-component/category-matching-condition.js")),
  category_matching_config_js_1 =
    (Object.defineProperty(exports, "CategoryMatchingCondition", {
      enumerable: !0,
      get: function () {
        return category_matching_condition_js_1.CategoryMatchingCondition;
      },
    }),
    require("./fb-component/category-matching-config.js")),
  category_matching_config_base_js_1 =
    (Object.defineProperty(exports, "CategoryMatchingConfig", {
      enumerable: !0,
      get: function () {
        return category_matching_config_js_1.CategoryMatchingConfig;
      },
    }),
    require("./fb-component/category-matching-config-base.js")),
  category_matching_foundation_js_1 =
    (Object.defineProperty(exports, "CategoryMatchingConfigBase", {
      enumerable: !0,
      get: function () {
        return category_matching_config_base_js_1.CategoryMatchingConfigBase;
      },
    }),
    require("./fb-component/category-matching-foundation.js")),
  category_matching_succeed_js_1 =
    (Object.defineProperty(exports, "CategoryMatchingFoundation", {
      enumerable: !0,
      get: function () {
        return category_matching_foundation_js_1.CategoryMatchingFoundation;
      },
    }),
    require("./fb-component/category-matching-succeed.js")),
  category_matching_succeed_base_js_1 =
    (Object.defineProperty(exports, "CategoryMatchingSucceed", {
      enumerable: !0,
      get: function () {
        return category_matching_succeed_js_1.CategoryMatchingSucceed;
      },
    }),
    require("./fb-component/category-matching-succeed-base.js")),
  cd_refresh_rule_js_1 =
    (Object.defineProperty(exports, "CategoryMatchingSucceedBase", {
      enumerable: !0,
      get: function () {
        return category_matching_succeed_base_js_1.CategoryMatchingSucceedBase;
      },
    }),
    require("./fb-component/cd-refresh-rule.js")),
  character_connector_component_js_1 =
    (Object.defineProperty(exports, "CdRefreshRule", {
      enumerable: !0,
      get: function () {
        return cd_refresh_rule_js_1.CdRefreshRule;
      },
    }),
    require("./fb-component/character-connector-component.js")),
  character_connector_range_js_1 =
    (Object.defineProperty(exports, "CharacterConnectorComponent", {
      enumerable: !0,
      get: function () {
        return character_connector_component_js_1.CharacterConnectorComponent;
      },
    }),
    require("./fb-component/character-connector-range.js")),
  charge_slash_air_floating_config_js_1 =
    (Object.defineProperty(exports, "CharacterConnectorRange", {
      enumerable: !0,
      get: function () {
        return character_connector_range_js_1.CharacterConnectorRange;
      },
    }),
    require("./fb-component/charge-slash-air-floating-config.js")),
  charge_slash_control_js_1 =
    (Object.defineProperty(exports, "ChargeSlashAirFloatingConfig", {
      enumerable: !0,
      get: function () {
        return charge_slash_air_floating_config_js_1.ChargeSlashAirFloatingConfig;
      },
    }),
    require("./fb-component/charge-slash-control.js")),
  charge_slash_hook_js_1 =
    (Object.defineProperty(exports, "ChargeSlashControl", {
      enumerable: !0,
      get: function () {
        return charge_slash_control_js_1.ChargeSlashControl;
      },
    }),
    require("./fb-component/charge-slash-hook.js")),
  charging_device_js_1 =
    (Object.defineProperty(exports, "ChargeSlashHook", {
      enumerable: !0,
      get: function () {
        return charge_slash_hook_js_1.ChargeSlashHook;
      },
    }),
    require("./fb-component/charging-device.js")),
  check_gear_hit_js_1 =
    (Object.defineProperty(exports, "ChargingDevice", {
      enumerable: !0,
      get: function () {
        return charging_device_js_1.ChargingDevice;
      },
    }),
    require("./fb-component/check-gear-hit.js")),
  chessman_component_js_1 =
    (Object.defineProperty(exports, "CheckGearHit", {
      enumerable: !0,
      get: function () {
        return check_gear_hit_js_1.CheckGearHit;
      },
    }),
    require("./fb-component/chessman-component.js")),
  chessman_pick_interaction_js_1 =
    (Object.defineProperty(exports, "ChessmanComponent", {
      enumerable: !0,
      get: function () {
        return chessman_component_js_1.ChessmanComponent;
      },
    }),
    require("./fb-component/chessman-pick-interaction.js")),
  circumnutation_js_1 =
    (Object.defineProperty(exports, "ChessmanPickInteraction", {
      enumerable: !0,
      get: function () {
        return chessman_pick_interaction_js_1.ChessmanPickInteraction;
      },
    }),
    require("./fb-component/circumnutation.js")),
  client_condition_listener_js_1 =
    (Object.defineProperty(exports, "Circumnutation", {
      enumerable: !0,
      get: function () {
        return circumnutation_js_1.Circumnutation;
      },
    }),
    require("./fb-component/client-condition-listener.js")),
  client_condition_listener_component_js_1 =
    (Object.defineProperty(exports, "ClientConditionListener", {
      enumerable: !0,
      get: function () {
        return client_condition_listener_js_1.ClientConditionListener;
      },
    }),
    require("./fb-component/client-condition-listener-component.js")),
  client_trigger_component_js_1 =
    (Object.defineProperty(exports, "ClientConditionListenerComponent", {
      enumerable: !0,
      get: function () {
        return client_condition_listener_component_js_1.ClientConditionListenerComponent;
      },
    }),
    require("./fb-component/client-trigger-component.js")),
  collect_animal_config_js_1 =
    (Object.defineProperty(exports, "ClientTriggerComponent", {
      enumerable: !0,
      get: function () {
        return client_trigger_component_js_1.ClientTriggerComponent;
      },
    }),
    require("./fb-component/collect-animal-config.js")),
  collect_animal_parts_config_js_1 =
    (Object.defineProperty(exports, "CollectAnimalConfig", {
      enumerable: !0,
      get: function () {
        return collect_animal_config_js_1.CollectAnimalConfig;
      },
    }),
    require("./fb-component/collect-animal-parts-config.js")),
  collect_component_js_1 =
    (Object.defineProperty(exports, "CollectAnimalPartsConfig", {
      enumerable: !0,
      get: function () {
        return collect_animal_parts_config_js_1.CollectAnimalPartsConfig;
      },
    }),
    require("./fb-component/collect-component.js")),
  color_change_strategy_of_rgb_js_1 =
    (Object.defineProperty(exports, "CollectComponent", {
      enumerable: !0,
      get: function () {
        return collect_component_js_1.CollectComponent;
      },
    }),
    require("./fb-component/color-change-strategy-of-rgb.js")),
  combat_component_js_1 =
    (Object.defineProperty(exports, "ColorChangeStrategyOfRGB", {
      enumerable: !0,
      get: function () {
        return color_change_strategy_of_rgb_js_1.ColorChangeStrategyOfRGB;
      },
    }),
    require("./fb-component/combat-component.js")),
  combined_visible_group_component_js_1 =
    (Object.defineProperty(exports, "CombatComponent", {
      enumerable: !0,
      get: function () {
        return combat_component_js_1.CombatComponent;
      },
    }),
    require("./fb-component/combined-visible-group-component.js")),
  common_spline_js_1 =
    (Object.defineProperty(exports, "CombinedVisibleGroupComponent", {
      enumerable: !0,
      get: function () {
        return combined_visible_group_component_js_1.CombinedVisibleGroupComponent;
      },
    }),
    require("./fb-component/common-spline.js")),
  common_spline_point_js_1 =
    (Object.defineProperty(exports, "CommonSpline", {
      enumerable: !0,
      get: function () {
        return common_spline_js_1.CommonSpline;
      },
    }),
    require("./fb-component/common-spline-point.js")),
  compass_tracking_js_1 =
    (Object.defineProperty(exports, "CommonSplinePoint", {
      enumerable: !0,
      get: function () {
        return common_spline_point_js_1.CommonSplinePoint;
      },
    }),
    require("./fb-component/compass-tracking.js")),
  component_data_js_1 =
    (Object.defineProperty(exports, "CompassTracking", {
      enumerable: !0,
      get: function () {
        return compass_tracking_js_1.CompassTracking;
      },
    }),
    require("./fb-component/component-data.js")),
  component_item_js_1 =
    (Object.defineProperty(exports, "ComponentData", {
      enumerable: !0,
      get: function () {
        return component_data_js_1.ComponentData;
      },
    }),
    require("./fb-component/component-item.js")),
  condition_action_js_1 =
    (Object.defineProperty(exports, "ComponentItem", {
      enumerable: !0,
      get: function () {
        return component_item_js_1.ComponentItem;
      },
    }),
    require("./fb-component/condition-action.js")),
  condition_bubble_data_js_1 =
    (Object.defineProperty(exports, "ConditionAction", {
      enumerable: !0,
      get: function () {
        return condition_action_js_1.ConditionAction;
      },
    }),
    require("./fb-component/condition-bubble-data.js")),
  condition_hit_config_js_1 =
    (Object.defineProperty(exports, "ConditionBubbleData", {
      enumerable: !0,
      get: function () {
        return condition_bubble_data_js_1.ConditionBubbleData;
      },
    }),
    require("./fb-component/condition-hit-config.js")),
  condition_hit_config_with_bullet_js_1 =
    (Object.defineProperty(exports, "ConditionHitConfig", {
      enumerable: !0,
      get: function () {
        return condition_hit_config_js_1.ConditionHitConfig;
      },
    }),
    require("./fb-component/condition-hit-config-with-bullet.js")),
  condition_listener_component_js_1 =
    (Object.defineProperty(exports, "ConditionHitConfigWithBullet", {
      enumerable: !0,
      get: function () {
        return condition_hit_config_with_bullet_js_1.ConditionHitConfigWithBullet;
      },
    }),
    require("./fb-component/condition-listener-component.js")),
  condtion_listener_js_1 =
    (Object.defineProperty(exports, "ConditionListenerComponent", {
      enumerable: !0,
      get: function () {
        return condition_listener_component_js_1.ConditionListenerComponent;
      },
    }),
    require("./fb-component/condtion-listener.js")),
  connector_component_js_1 =
    (Object.defineProperty(exports, "CondtionListener", {
      enumerable: !0,
      get: function () {
        return condtion_listener_js_1.CondtionListener;
      },
    }),
    require("./fb-component/connector-component.js")),
  connector_effect_config_js_1 =
    (Object.defineProperty(exports, "ConnectorComponent", {
      enumerable: !0,
      get: function () {
        return connector_component_js_1.ConnectorComponent;
      },
    }),
    require("./fb-component/connector-effect-config.js")),
  connector_range_js_1 =
    (Object.defineProperty(exports, "ConnectorEffectConfig", {
      enumerable: !0,
      get: function () {
        return connector_effect_config_js_1.ConnectorEffectConfig;
      },
    }),
    require("./fb-component/connector-range.js")),
  continues_variable_speed_movement_spline_js_1 =
    (Object.defineProperty(exports, "ConnectorRange", {
      enumerable: !0,
      get: function () {
        return connector_range_js_1.ConnectorRange;
      },
    }),
    require("./fb-component/continues-variable-speed-movement-spline.js")),
  continues_variable_speed_spline_point_js_1 =
    (Object.defineProperty(exports, "ContinuesVariableSpeedMovementSpline", {
      enumerable: !0,
      get: function () {
        return continues_variable_speed_movement_spline_js_1.ContinuesVariableSpeedMovementSpline;
      },
    }),
    require("./fb-component/continues-variable-speed-spline-point.js")),
  control_point_event_config_js_1 =
    (Object.defineProperty(exports, "ContinuesVariableSpeedSplinePoint", {
      enumerable: !0,
      get: function () {
        return continues_variable_speed_spline_point_js_1.ContinuesVariableSpeedSplinePoint;
      },
    }),
    require("./fb-component/control-point-event-config.js")),
  conveyor_belt_component_js_1 =
    (Object.defineProperty(exports, "ControlPointEventConfig", {
      enumerable: !0,
      get: function () {
        return control_point_event_config_js_1.ControlPointEventConfig;
      },
    }),
    require("./fb-component/conveyor-belt-component.js")),
  conveyor_belt_state_js_1 =
    (Object.defineProperty(exports, "ConveyorBeltComponent", {
      enumerable: !0,
      get: function () {
        return conveyor_belt_component_js_1.ConveyorBeltComponent;
      },
    }),
    require("./fb-component/conveyor-belt-state.js")),
  create_bullet_config_js_1 =
    (Object.defineProperty(exports, "ConveyorBeltState", {
      enumerable: !0,
      get: function () {
        return conveyor_belt_state_js_1.ConveyorBeltState;
      },
    }),
    require("./fb-component/create-bullet-config.js")),
  create_bullet_destroy_condition_js_1 =
    (Object.defineProperty(exports, "CreateBulletConfig", {
      enumerable: !0,
      get: function () {
        return create_bullet_config_js_1.CreateBulletConfig;
      },
    }),
    require("./fb-component/create-bullet-destroy-condition.js")),
  create_stage_config_js_1 =
    (Object.defineProperty(exports, "CreateBulletDestroyCondition", {
      enumerable: !0,
      get: function () {
        return create_bullet_destroy_condition_js_1.CreateBulletDestroyCondition;
      },
    }),
    require("./fb-component/create-stage-config.js")),
  curve_control_component_js_1 =
    (Object.defineProperty(exports, "CreateStageConfig", {
      enumerable: !0,
      get: function () {
        return create_stage_config_js_1.CreateStageConfig;
      },
    }),
    require("./fb-component/curve-control-component.js")),
  custom_aoiz_radius_js_1 =
    (Object.defineProperty(exports, "CurveControlComponent", {
      enumerable: !0,
      get: function () {
        return curve_control_component_js_1.CurveControlComponent;
      },
    }),
    require("./fb-component/custom-aoiz-radius.js")),
  custom_view_distance_js_1 =
    (Object.defineProperty(exports, "CustomAoizRadius", {
      enumerable: !0,
      get: function () {
        return custom_aoiz_radius_js_1.CustomAoizRadius;
      },
    }),
    require("./fb-component/custom-view-distance.js")),
  da_npc_model_js_1 =
    (Object.defineProperty(exports, "CustomViewDistance", {
      enumerable: !0,
      get: function () {
        return custom_view_distance_js_1.CustomViewDistance;
      },
    }),
    require("./fb-component/da-npc-model.js")),
  default_ak_event_js_1 =
    (Object.defineProperty(exports, "DaNpcModel", {
      enumerable: !0,
      get: function () {
        return da_npc_model_js_1.DaNpcModel;
      },
    }),
    require("./fb-component/default-ak-event.js")),
  deflection_custom_js_1 =
    (Object.defineProperty(exports, "DefaultAkEvent", {
      enumerable: !0,
      get: function () {
        return default_ak_event_js_1.DefaultAkEvent;
      },
    }),
    require("./fb-component/deflection-custom.js")),
  deflection_random_js_1 =
    (Object.defineProperty(exports, "DeflectionCustom", {
      enumerable: !0,
      get: function () {
        return deflection_custom_js_1.DeflectionCustom;
      },
    }),
    require("./fb-component/deflection-random.js")),
  delay_change_state_js_1 =
    (Object.defineProperty(exports, "DeflectionRandom", {
      enumerable: !0,
      get: function () {
        return deflection_random_js_1.DeflectionRandom;
      },
    }),
    require("./fb-component/delay-change-state.js")),
  destroy_cfg_js_1 =
    (Object.defineProperty(exports, "DelayChangeState", {
      enumerable: !0,
      get: function () {
        return delay_change_state_js_1.DelayChangeState;
      },
    }),
    require("./fb-component/destroy-cfg.js")),
  destroy_stage_config_js_1 =
    (Object.defineProperty(exports, "DestroyCfg", {
      enumerable: !0,
      get: function () {
        return destroy_cfg_js_1.DestroyCfg;
      },
    }),
    require("./fb-component/destroy-stage-config.js")),
  destructible_item_js_1 =
    (Object.defineProperty(exports, "DestroyStageConfig", {
      enumerable: !0,
      get: function () {
        return destroy_stage_config_js_1.DestroyStageConfig;
      },
    }),
    require("./fb-component/destructible-item.js")),
  direction_fill_js_1 =
    (Object.defineProperty(exports, "DestructibleItem", {
      enumerable: !0,
      get: function () {
        return destructible_item_js_1.DestructibleItem;
      },
    }),
    require("./fb-component/direction-fill.js")),
  directional_field_js_1 =
    (Object.defineProperty(exports, "DirectionFill", {
      enumerable: !0,
      get: function () {
        return direction_fill_js_1.DirectionFill;
      },
    }),
    require("./fb-component/directional-field.js")),
  drop_component_js_1 =
    (Object.defineProperty(exports, "DirectionalField", {
      enumerable: !0,
      get: function () {
        return directional_field_js_1.DirectionalField;
      },
    }),
    require("./fb-component/drop-component.js")),
  dungeon_entry_component_js_1 =
    (Object.defineProperty(exports, "DropComponent", {
      enumerable: !0,
      get: function () {
        return drop_component_js_1.DropComponent;
      },
    }),
    require("./fb-component/dungeon-entry-component.js")),
  durability_state_js_1 =
    (Object.defineProperty(exports, "DungeonEntryComponent", {
      enumerable: !0,
      get: function () {
        return dungeon_entry_component_js_1.DungeonEntryComponent;
      },
    }),
    require("./fb-component/durability-state.js")),
  durability_state_config_js_1 =
    (Object.defineProperty(exports, "DurabilityState", {
      enumerable: !0,
      get: function () {
        return durability_state_js_1.DurabilityState;
      },
    }),
    require("./fb-component/durability-state-config.js")),
  durability_worn_js_1 =
    (Object.defineProperty(exports, "DurabilityStateConfig", {
      enumerable: !0,
      get: function () {
        return durability_state_config_js_1.DurabilityStateConfig;
      },
    }),
    require("./fb-component/durability-worn.js")),
  duration_condition_js_1 =
    (Object.defineProperty(exports, "DurabilityWorn", {
      enumerable: !0,
      get: function () {
        return durability_worn_js_1.DurabilityWorn;
      },
    }),
    require("./fb-component/duration-condition.js")),
  dynamic_attach_target_js_1 =
    (Object.defineProperty(exports, "DurationCondition", {
      enumerable: !0,
      get: function () {
        return duration_condition_js_1.DurationCondition;
      },
    }),
    require("./fb-component/dynamic-attach-target.js")),
  dynamic_bullet_config_js_1 =
    (Object.defineProperty(exports, "DynamicAttachTarget", {
      enumerable: !0,
      get: function () {
        return dynamic_attach_target_js_1.DynamicAttachTarget;
      },
    }),
    require("./fb-component/dynamic-bullet-config.js")),
  dynamic_entity_match_js_1 =
    (Object.defineProperty(exports, "DynamicBulletConfig", {
      enumerable: !0,
      get: function () {
        return dynamic_bullet_config_js_1.DynamicBulletConfig;
      },
    }),
    require("./fb-component/dynamic-entity-match.js")),
  dynamic_portal_js_1 =
    (Object.defineProperty(exports, "DynamicEntityMatch", {
      enumerable: !0,
      get: function () {
        return dynamic_entity_match_js_1.DynamicEntityMatch;
      },
    }),
    require("./fb-component/dynamic-portal.js")),
  dynamic_portal_by_bullet_js_1 =
    (Object.defineProperty(exports, "DynamicPortal", {
      enumerable: !0,
      get: function () {
        return dynamic_portal_js_1.DynamicPortal;
      },
    }),
    require("./fb-component/dynamic-portal-by-bullet.js")),
  dynamic_portal_config_js_1 =
    (Object.defineProperty(exports, "DynamicPortalByBullet", {
      enumerable: !0,
      get: function () {
        return dynamic_portal_by_bullet_js_1.DynamicPortalByBullet;
      },
    }),
    require("./fb-component/dynamic-portal-config.js")),
  dynamic_portal_creator_component_js_1 =
    (Object.defineProperty(exports, "DynamicPortalConfig", {
      enumerable: !0,
      get: function () {
        return dynamic_portal_config_js_1.DynamicPortalConfig;
      },
    }),
    require("./fb-component/dynamic-portal-creator-component.js")),
  dynamic_teleport_component_js_1 =
    (Object.defineProperty(exports, "DynamicPortalCreatorComponent", {
      enumerable: !0,
      get: function () {
        return dynamic_portal_creator_component_js_1.DynamicPortalCreatorComponent;
      },
    }),
    require("./fb-component/dynamic-teleport-component.js")),
  edit_custom_aoi_component_js_1 =
    (Object.defineProperty(exports, "DynamicTeleportComponent", {
      enumerable: !0,
      get: function () {
        return dynamic_teleport_component_js_1.DynamicTeleportComponent;
      },
    }),
    require("./fb-component/edit-custom-aoi-component.js")),
  effect_area_component_js_1 =
    (Object.defineProperty(exports, "EditCustomAoiComponent", {
      enumerable: !0,
      get: function () {
        return edit_custom_aoi_component_js_1.EditCustomAoiComponent;
      },
    }),
    require("./fb-component/effect-area-component.js")),
  effect_spline_js_1 =
    (Object.defineProperty(exports, "EffectAreaComponent", {
      enumerable: !0,
      get: function () {
        return effect_area_component_js_1.EffectAreaComponent;
      },
    }),
    require("./fb-component/effect-spline.js")),
  effect_spline_equidistant_point_mode_js_1 =
    (Object.defineProperty(exports, "EffectSpline", {
      enumerable: !0,
      get: function () {
        return effect_spline_js_1.EffectSpline;
      },
    }),
    require("./fb-component/effect-spline-equidistant-point-mode.js")),
  effect_spline_whole_line_mode_js_1 =
    (Object.defineProperty(exports, "EffectSplineEquidistantPointMode", {
      enumerable: !0,
      get: function () {
        return effect_spline_equidistant_point_mode_js_1.EffectSplineEquidistantPointMode;
      },
    }),
    require("./fb-component/effect-spline-whole-line-mode.js")),
  element_damage_js_1 =
    (Object.defineProperty(exports, "EffectSplineWholeLineMode", {
      enumerable: !0,
      get: function () {
        return effect_spline_whole_line_mode_js_1.EffectSplineWholeLineMode;
      },
    }),
    require("./fb-component/element-damage.js")),
  enrichment_area_component_js_1 =
    (Object.defineProperty(exports, "ElementDamage", {
      enumerable: !0,
      get: function () {
        return element_damage_js_1.ElementDamage;
      },
    }),
    require("./fb-component/enrichment-area-component.js")),
  enter_screen_weight_js_1 =
    (Object.defineProperty(exports, "EnrichmentAreaComponent", {
      enumerable: !0,
      get: function () {
        return enrichment_area_component_js_1.EnrichmentAreaComponent;
      },
    }),
    require("./fb-component/enter-screen-weight.js")),
  entity_angle_weight_js_1 =
    (Object.defineProperty(exports, "EnterScreenWeight", {
      enumerable: !0,
      get: function () {
        return enter_screen_weight_js_1.EnterScreenWeight;
      },
    }),
    require("./fb-component/entity-angle-weight.js")),
  entity_attach_target_js_1 =
    (Object.defineProperty(exports, "EntityAngleWeight", {
      enumerable: !0,
      get: function () {
        return entity_angle_weight_js_1.EntityAngleWeight;
      },
    }),
    require("./fb-component/entity-attach-target.js")),
  entity_audio_component_js_1 =
    (Object.defineProperty(exports, "EntityAttachTarget", {
      enumerable: !0,
      get: function () {
        return entity_attach_target_js_1.EntityAttachTarget;
      },
    }),
    require("./fb-component/entity-audio-component.js")),
  entity_batch_refresh_component_js_1 =
    (Object.defineProperty(exports, "EntityAudioComponent", {
      enumerable: !0,
      get: function () {
        return entity_audio_component_js_1.EntityAudioComponent;
      },
    }),
    require("./fb-component/entity-batch-refresh-component.js")),
  entity_bundle_child_info_js_1 =
    (Object.defineProperty(exports, "EntityBatchRefreshComponent", {
      enumerable: !0,
      get: function () {
        return entity_batch_refresh_component_js_1.EntityBatchRefreshComponent;
      },
    }),
    require("./fb-component/entity-bundle-child-info.js")),
  entity_bundle_component_js_1 =
    (Object.defineProperty(exports, "EntityBundleChildInfo", {
      enumerable: !0,
      get: function () {
        return entity_bundle_child_info_js_1.EntityBundleChildInfo;
      },
    }),
    require("./fb-component/entity-bundle-component.js")),
  entity_category_js_1 =
    (Object.defineProperty(exports, "EntityBundleComponent", {
      enumerable: !0,
      get: function () {
        return entity_bundle_component_js_1.EntityBundleComponent;
      },
    }),
    require("./fb-component/entity-category.js")),
  entity_category_weight_js_1 =
    (Object.defineProperty(exports, "EntityCategory", {
      enumerable: !0,
      get: function () {
        return entity_category_js_1.EntityCategory;
      },
    }),
    require("./fb-component/entity-category-weight.js")),
  entity_custom_audio_component_js_1 =
    (Object.defineProperty(exports, "EntityCategoryWeight", {
      enumerable: !0,
      get: function () {
        return entity_category_weight_js_1.EntityCategoryWeight;
      },
    }),
    require("./fb-component/entity-custom-audio-component.js")),
  entity_gravity_config_js_1 =
    (Object.defineProperty(exports, "EntityCustomAudioComponent", {
      enumerable: !0,
      get: function () {
        return entity_custom_audio_component_js_1.EntityCustomAudioComponent;
      },
    }),
    require("./fb-component/entity-gravity-config.js")),
  entity_group_component_js_1 =
    (Object.defineProperty(exports, "EntityGravityConfig", {
      enumerable: !0,
      get: function () {
        return entity_gravity_config_js_1.EntityGravityConfig;
      },
    }),
    require("./fb-component/entity-group-component.js")),
  entity_group_failure_arbitrary_state_js_1 =
    (Object.defineProperty(exports, "EntityGroupComponent", {
      enumerable: !0,
      get: function () {
        return entity_group_component_js_1.EntityGroupComponent;
      },
    }),
    require("./fb-component/entity-group-failure-arbitrary-state.js")),
  entity_group_failure_sequential_state_js_1 =
    (Object.defineProperty(exports, "EntityGroupFailureArbitraryState", {
      enumerable: !0,
      get: function () {
        return entity_group_failure_arbitrary_state_js_1.EntityGroupFailureArbitraryState;
      },
    }),
    require("./fb-component/entity-group-failure-sequential-state.js")),
  entity_list_batch_js_1 =
    (Object.defineProperty(exports, "EntityGroupFailureSequentialState", {
      enumerable: !0,
      get: function () {
        return entity_group_failure_sequential_state_js_1.EntityGroupFailureSequentialState;
      },
    }),
    require("./fb-component/entity-list-batch.js")),
  entity_list_component_js_1 =
    (Object.defineProperty(exports, "EntityListBatch", {
      enumerable: !0,
      get: function () {
        return entity_list_batch_js_1.EntityListBatch;
      },
    }),
    require("./fb-component/entity-list-component.js")),
  entity_match_js_1 =
    (Object.defineProperty(exports, "EntityListComponent", {
      enumerable: !0,
      get: function () {
        return entity_list_component_js_1.EntityListComponent;
      },
    }),
    require("./fb-component/entity-match.js")),
  entity_match_all_character_js_1 =
    (Object.defineProperty(exports, "EntityMatch", {
      enumerable: !0,
      get: function () {
        return entity_match_js_1.EntityMatch;
      },
    }),
    require("./fb-component/entity-match-all-character.js")),
  entity_match_dynamic_js_1 =
    (Object.defineProperty(exports, "EntityMatchAllCharacter", {
      enumerable: !0,
      get: function () {
        return entity_match_all_character_js_1.EntityMatchAllCharacter;
      },
    }),
    require("./fb-component/entity-match-dynamic.js")),
  entity_match_player_js_1 =
    (Object.defineProperty(exports, "EntityMatchDynamic", {
      enumerable: !0,
      get: function () {
        return entity_match_dynamic_js_1.EntityMatchDynamic;
      },
    }),
    require("./fb-component/entity-match-player.js")),
  entity_package_component_js_1 =
    (Object.defineProperty(exports, "EntityMatchPlayer", {
      enumerable: !0,
      get: function () {
        return entity_match_player_js_1.EntityMatchPlayer;
      },
    }),
    require("./fb-component/entity-package-component.js")),
  entity_package_data_js_1 =
    (Object.defineProperty(exports, "EntityPackageComponent", {
      enumerable: !0,
      get: function () {
        return entity_package_component_js_1.EntityPackageComponent;
      },
    }),
    require("./fb-component/entity-package-data.js")),
  entity_package_node_js_1 =
    (Object.defineProperty(exports, "EntityPackageData", {
      enumerable: !0,
      get: function () {
        return entity_package_data_js_1.EntityPackageData;
      },
    }),
    require("./fb-component/entity-package-node.js")),
  entity_scan_function_js_1 =
    (Object.defineProperty(exports, "EntityPackageNode", {
      enumerable: !0,
      get: function () {
        return entity_package_node_js_1.EntityPackageNode;
      },
    }),
    require("./fb-component/entity-scan-function.js")),
  entity_state_js_1 =
    (Object.defineProperty(exports, "EntityScanFunction", {
      enumerable: !0,
      get: function () {
        return entity_scan_function_js_1.EntityScanFunction;
      },
    }),
    require("./fb-component/entity-state.js")),
  entity_state_audio_component_js_1 =
    (Object.defineProperty(exports, "EntityState", {
      enumerable: !0,
      get: function () {
        return entity_state_js_1.EntityState;
      },
    }),
    require("./fb-component/entity-state-audio-component.js")),
  entity_state_audio_config_js_1 =
    (Object.defineProperty(exports, "EntityStateAudioComponent", {
      enumerable: !0,
      get: function () {
        return entity_state_audio_component_js_1.EntityStateAudioComponent;
      },
    }),
    require("./fb-component/entity-state-audio-config.js")),
  entity_state_component_js_1 =
    (Object.defineProperty(exports, "EntityStateAudioConfig", {
      enumerable: !0,
      get: function () {
        return entity_state_audio_config_js_1.EntityStateAudioConfig;
      },
    }),
    require("./fb-component/entity-state-component.js")),
  entity_state_trigger_js_1 =
    (Object.defineProperty(exports, "EntityStateComponent", {
      enumerable: !0,
      get: function () {
        return entity_state_component_js_1.EntityStateComponent;
      },
    }),
    require("./fb-component/entity-state-trigger.js")),
  entity_track_control_js_1 =
    (Object.defineProperty(exports, "EntityStateTrigger", {
      enumerable: !0,
      get: function () {
        return entity_state_trigger_js_1.EntityStateTrigger;
      },
    }),
    require("./fb-component/entity-track-control.js")),
  entity_track_control_point_js_1 =
    (Object.defineProperty(exports, "EntityTrackControl", {
      enumerable: !0,
      get: function () {
        return entity_track_control_js_1.EntityTrackControl;
      },
    }),
    require("./fb-component/entity-track-control-point.js")),
  entity_visible_component_js_1 =
    (Object.defineProperty(exports, "EntityTrackControlPoint", {
      enumerable: !0,
      get: function () {
        return entity_track_control_point_js_1.EntityTrackControlPoint;
      },
    }),
    require("./fb-component/entity-visible-component.js")),
  event_rotator_js_1 =
    (Object.defineProperty(exports, "EntityVisibleComponent", {
      enumerable: !0,
      get: function () {
        return entity_visible_component_js_1.EntityVisibleComponent;
      },
    }),
    require("./fb-component/event-rotator.js")),
  exchange_slide_rail_config_js_1 =
    (Object.defineProperty(exports, "EventRotator", {
      enumerable: !0,
      get: function () {
        return event_rotator_js_1.EventRotator;
      },
    }),
    require("./fb-component/exchange-slide-rail-config.js")),
  explore_skill_custom_js_1 =
    (Object.defineProperty(exports, "ExchangeSlideRailConfig", {
      enumerable: !0,
      get: function () {
        return exchange_slide_rail_config_js_1.ExchangeSlideRailConfig;
      },
    }),
    require("./fb-component/explore-skill-custom.js")),
  explore_skill_interact_component_js_1 =
    (Object.defineProperty(exports, "ExploreSkillCustom", {
      enumerable: !0,
      get: function () {
        return explore_skill_custom_js_1.ExploreSkillCustom;
      },
    }),
    require("./fb-component/explore-skill-interact-component.js")),
  explore_skill_lonely_doll_pollutant_js_1 =
    (Object.defineProperty(exports, "ExploreSkillInteractComponent", {
      enumerable: !0,
      get: function () {
        return explore_skill_interact_component_js_1.ExploreSkillInteractComponent;
      },
    }),
    require("./fb-component/explore-skill-lonely-doll-pollutant.js")),
  explore_skill_pull_giant_js_1 =
    (Object.defineProperty(exports, "ExploreSkillLonelyDollPollutant", {
      enumerable: !0,
      get: function () {
        return explore_skill_lonely_doll_pollutant_js_1.ExploreSkillLonelyDollPollutant;
      },
    }),
    require("./fb-component/explore-skill-pull-giant.js")),
  explore_skill_pull_statue_js_1 =
    (Object.defineProperty(exports, "ExploreSkillPullGiant", {
      enumerable: !0,
      get: function () {
        return explore_skill_pull_giant_js_1.ExploreSkillPullGiant;
      },
    }),
    require("./fb-component/explore-skill-pull-statue.js")),
  explore_skill_rag_doll_crushing_rock_js_1 =
    (Object.defineProperty(exports, "ExploreSkillPullStatue", {
      enumerable: !0,
      get: function () {
        return explore_skill_pull_statue_js_1.ExploreSkillPullStatue;
      },
    }),
    require("./fb-component/explore-skill-rag-doll-crushing-rock.js")),
  explore_skill_rag_doll_destroy_solid_rock_js_1 =
    (Object.defineProperty(exports, "ExploreSkillRagDollCrushingRock", {
      enumerable: !0,
      get: function () {
        return explore_skill_rag_doll_crushing_rock_js_1.ExploreSkillRagDollCrushingRock;
      },
    }),
    require("./fb-component/explore-skill-rag-doll-destroy-solid-rock.js")),
  explore_skill_statue_interact_point_js_1 =
    (Object.defineProperty(exports, "ExploreSkillRagDollDestroySolidRock", {
      enumerable: !0,
      get: function () {
        return explore_skill_rag_doll_destroy_solid_rock_js_1.ExploreSkillRagDollDestroySolidRock;
      },
    }),
    require("./fb-component/explore-skill-statue-interact-point.js")),
  extra_ai_alert_js_1 =
    (Object.defineProperty(exports, "ExploreSkillStatueInteractPoint", {
      enumerable: !0,
      get: function () {
        return explore_skill_statue_interact_point_js_1.ExploreSkillStatueInteractPoint;
      },
    }),
    require("./fb-component/extra-ai-alert.js")),
  failure_condition_arbitrary_state_js_1 =
    (Object.defineProperty(exports, "ExtraAiAlert", {
      enumerable: !0,
      get: function () {
        return extra_ai_alert_js_1.ExtraAiAlert;
      },
    }),
    require("./fb-component/failure-condition-arbitrary-state.js")),
  failure_condition_hit_target_entity_js_1 =
    (Object.defineProperty(exports, "FailureConditionArbitraryState", {
      enumerable: !0,
      get: function () {
        return failure_condition_arbitrary_state_js_1.FailureConditionArbitraryState;
      },
    }),
    require("./fb-component/failure-condition-hit-target-entity.js")),
  failure_condition_sequential_state_js_1 =
    (Object.defineProperty(exports, "FailureConditionHitTargetEntity", {
      enumerable: !0,
      get: function () {
        return failure_condition_hit_target_entity_js_1.FailureConditionHitTargetEntity;
      },
    }),
    require("./fb-component/failure-condition-sequential-state.js")),
  failure_state_trigger_js_1 =
    (Object.defineProperty(exports, "FailureConditionSequentialState", {
      enumerable: !0,
      get: function () {
        return failure_condition_sequential_state_js_1.FailureConditionSequentialState;
      },
    }),
    require("./fb-component/failure-state-trigger.js")),
  fan_component_js_1 =
    (Object.defineProperty(exports, "FailureStateTrigger", {
      enumerable: !0,
      get: function () {
        return failure_state_trigger_js_1.FailureStateTrigger;
      },
    }),
    require("./fb-component/fan-component.js")),
  fan_effect_config_js_1 =
    (Object.defineProperty(exports, "FanComponent", {
      enumerable: !0,
      get: function () {
        return fan_component_js_1.FanComponent;
      },
    }),
    require("./fb-component/fan-effect-config.js")),
  fan_interact_by_fkey_js_1 =
    (Object.defineProperty(exports, "FanEffectConfig", {
      enumerable: !0,
      get: function () {
        return fan_effect_config_js_1.FanEffectConfig;
      },
    }),
    require("./fb-component/fan-interact-by-fkey.js")),
  fan_interact_by_hit_js_1 =
    (Object.defineProperty(exports, "FanInteractByFKey", {
      enumerable: !0,
      get: function () {
        return fan_interact_by_fkey_js_1.FanInteractByFKey;
      },
    }),
    require("./fb-component/fan-interact-by-hit.js")),
  fan_state_effect_js_1 =
    (Object.defineProperty(exports, "FanInteractByHit", {
      enumerable: !0,
      get: function () {
        return fan_interact_by_hit_js_1.FanInteractByHit;
      },
    }),
    require("./fb-component/fan-state-effect.js")),
  fight_interact_component_js_1 =
    (Object.defineProperty(exports, "FanStateEffect", {
      enumerable: !0,
      get: function () {
        return fan_state_effect_js_1.FanStateEffect;
      },
    }),
    require("./fb-component/fight-interact-component.js")),
  fight_music_switch_by_tag_js_1 =
    (Object.defineProperty(exports, "FightInteractComponent", {
      enumerable: !0,
      get: function () {
        return fight_interact_component_js_1.FightInteractComponent;
      },
    }),
    require("./fb-component/fight-music-switch-by-tag.js")),
  fight_musics_switch_by_tag_list_js_1 =
    (Object.defineProperty(exports, "FightMusicSwitchByTag", {
      enumerable: !0,
      get: function () {
        return fight_music_switch_by_tag_js_1.FightMusicSwitchByTag;
      },
    }),
    require("./fb-component/fight-musics-switch-by-tag-list.js")),
  finish_state_trigger_js_1 =
    (Object.defineProperty(exports, "FightMusicsSwitchByTagList", {
      enumerable: !0,
      get: function () {
        return fight_musics_switch_by_tag_list_js_1.FightMusicsSwitchByTagList;
      },
    }),
    require("./fb-component/finish-state-trigger.js")),
  fire_bullet_add_buff_js_1 =
    (Object.defineProperty(exports, "FinishStateTrigger", {
      enumerable: !0,
      get: function () {
        return finish_state_trigger_js_1.FinishStateTrigger;
      },
    }),
    require("./fb-component/fire-bullet-add-buff.js")),
  fishing_point_additional_info_js_1 =
    (Object.defineProperty(exports, "FireBulletAddBuff", {
      enumerable: !0,
      get: function () {
        return fire_bullet_add_buff_js_1.FireBulletAddBuff;
      },
    }),
    require("./fb-component/fishing-point-additional-info.js")),
  fix_speed_js_1 =
    (Object.defineProperty(exports, "FishingPointAdditionalInfo", {
      enumerable: !0,
      get: function () {
        return fishing_point_additional_info_js_1.FishingPointAdditionalInfo;
      },
    }),
    require("./fb-component/fix-speed.js")),
  fixed_angle_item_js_1 =
    (Object.defineProperty(exports, "FixSpeed", {
      enumerable: !0,
      get: function () {
        return fix_speed_js_1.FixSpeed;
      },
    }),
    require("./fb-component/fixed-angle-item.js")),
  fixed_angle_turntable_js_1 =
    (Object.defineProperty(exports, "FixedAngleItem", {
      enumerable: !0,
      get: function () {
        return fixed_angle_item_js_1.FixedAngleItem;
      },
    }),
    require("./fb-component/fixed-angle-turntable.js")),
  fixed_date_time_js_1 =
    (Object.defineProperty(exports, "FixedAngleTurntable", {
      enumerable: !0,
      get: function () {
        return fixed_angle_turntable_js_1.FixedAngleTurntable;
      },
    }),
    require("./fb-component/fixed-date-time.js")),
  fixed_date_time_refresh_rule_js_1 =
    (Object.defineProperty(exports, "FixedDateTime", {
      enumerable: !0,
      get: function () {
        return fixed_date_time_js_1.FixedDateTime;
      },
    }),
    require("./fb-component/fixed-date-time-refresh-rule.js")),
  fixed_fill_js_1 =
    (Object.defineProperty(exports, "FixedDateTimeRefreshRule", {
      enumerable: !0,
      get: function () {
        return fixed_date_time_refresh_rule_js_1.FixedDateTimeRefreshRule;
      },
    }),
    require("./fb-component/fixed-fill.js")),
  fixed_point_hook_js_1 =
    (Object.defineProperty(exports, "FixedFill", {
      enumerable: !0,
      get: function () {
        return fixed_fill_js_1.FixedFill;
      },
    }),
    require("./fb-component/fixed-point-hook.js")),
  flow_component_js_1 =
    (Object.defineProperty(exports, "FixedPointHook", {
      enumerable: !0,
      get: function () {
        return fixed_point_hook_js_1.FixedPointHook;
      },
    }),
    require("./fb-component/flow-component.js")),
  follow_shooter_component_js_1 =
    (Object.defineProperty(exports, "FlowComponent", {
      enumerable: !0,
      get: function () {
        return flow_component_js_1.FlowComponent;
      },
    }),
    require("./fb-component/follow-shooter-component.js")),
  follow_track_component_js_1 =
    (Object.defineProperty(exports, "FollowShooterComponent", {
      enumerable: !0,
      get: function () {
        return follow_shooter_component_js_1.FollowShooterComponent;
      },
    }),
    require("./fb-component/follow-track-component.js")),
  follow_track_to_foundation_js_1 =
    (Object.defineProperty(exports, "FollowTrackComponent", {
      enumerable: !0,
      get: function () {
        return follow_track_component_js_1.FollowTrackComponent;
      },
    }),
    require("./fb-component/follow-track-to-foundation.js")),
  follow_track_to_spline_destination_js_1 =
    (Object.defineProperty(exports, "FollowTrackToFoundation", {
      enumerable: !0,
      get: function () {
        return follow_track_to_foundation_js_1.FollowTrackToFoundation;
      },
    }),
    require("./fb-component/follow-track-to-spline-destination.js")),
  follow_track_to_start_js_1 =
    (Object.defineProperty(exports, "FollowTrackToSplineDestination", {
      enumerable: !0,
      get: function () {
        return follow_track_to_spline_destination_js_1.FollowTrackToSplineDestination;
      },
    }),
    require("./fb-component/follow-track-to-start.js")),
  forward_front_rebound_js_1 =
    (Object.defineProperty(exports, "FollowTrackToStart", {
      enumerable: !0,
      get: function () {
        return follow_track_to_start_js_1.FollowTrackToStart;
      },
    }),
    require("./fb-component/forward-front-rebound.js")),
  free_angle_item_js_1 =
    (Object.defineProperty(exports, "ForwardFrontRebound", {
      enumerable: !0,
      get: function () {
        return forward_front_rebound_js_1.ForwardFrontRebound;
      },
    }),
    require("./fb-component/free-angle-item.js")),
  free_angle_turntable_js_1 =
    (Object.defineProperty(exports, "FreeAngleItem", {
      enumerable: !0,
      get: function () {
        return free_angle_item_js_1.FreeAngleItem;
      },
    }),
    require("./fb-component/free-angle-turntable.js")),
  gaze_condition_js_1 =
    (Object.defineProperty(exports, "FreeAngleTurntable", {
      enumerable: !0,
      get: function () {
        return free_angle_turntable_js_1.FreeAngleTurntable;
      },
    }),
    require("./fb-component/gaze-condition.js")),
  gaze_next_point_after_interact_js_1 =
    (Object.defineProperty(exports, "GazeCondition", {
      enumerable: !0,
      get: function () {
        return gaze_condition_js_1.GazeCondition;
      },
    }),
    require("./fb-component/gaze-next-point-after-interact.js")),
  gaze_performance_js_1 =
    (Object.defineProperty(exports, "GazeNextPointAfterInteract", {
      enumerable: !0,
      get: function () {
        return gaze_next_point_after_interact_js_1.GazeNextPointAfterInteract;
      },
    }),
    require("./fb-component/gaze-performance.js")),
  grab_component_js_1 =
    (Object.defineProperty(exports, "GazePerformance", {
      enumerable: !0,
      get: function () {
        return gaze_performance_js_1.GazePerformance;
      },
    }),
    require("./fb-component/grab-component.js")),
  gramophone_audio_control_js_1 =
    (Object.defineProperty(exports, "GrabComponent", {
      enumerable: !0,
      get: function () {
        return grab_component_js_1.GrabComponent;
      },
    }),
    require("./fb-component/gramophone-audio-control.js")),
  gravity_flip_component_js_1 =
    (Object.defineProperty(exports, "GramophoneAudioControl", {
      enumerable: !0,
      get: function () {
        return gramophone_audio_control_js_1.GramophoneAudioControl;
      },
    }),
    require("./fb-component/gravity-flip-component.js")),
  gravity_flip_config_js_1 =
    (Object.defineProperty(exports, "GravityFlipComponent", {
      enumerable: !0,
      get: function () {
        return gravity_flip_component_js_1.GravityFlipComponent;
      },
    }),
    require("./fb-component/gravity-flip-config.js")),
  gravity_flip_teleport_config_js_1 =
    (Object.defineProperty(exports, "GravityFlipConfig", {
      enumerable: !0,
      get: function () {
        return gravity_flip_config_js_1.GravityFlipConfig;
      },
    }),
    require("./fb-component/gravity-flip-teleport-config.js")),
  group_ai_component_js_1 =
    (Object.defineProperty(exports, "GravityFlipTeleportConfig", {
      enumerable: !0,
      get: function () {
        return gravity_flip_teleport_config_js_1.GravityFlipTeleportConfig;
      },
    }),
    require("./fb-component/group-ai-component.js")),
  group_ai_patrol_js_1 =
    (Object.defineProperty(exports, "GroupAiComponent", {
      enumerable: !0,
      get: function () {
        return group_ai_component_js_1.GroupAiComponent;
      },
    }),
    require("./fb-component/group-ai-patrol.js")),
  group_destroy_listen_config_js_1 =
    (Object.defineProperty(exports, "GroupAiPatrol", {
      enumerable: !0,
      get: function () {
        return group_ai_patrol_js_1.GroupAiPatrol;
      },
    }),
    require("./fb-component/group-destroy-listen-config.js")),
  group_finish_destroy_js_1 =
    (Object.defineProperty(exports, "GroupDestroyListenConfig", {
      enumerable: !0,
      get: function () {
        return group_destroy_listen_config_js_1.GroupDestroyListenConfig;
      },
    }),
    require("./fb-component/group-finish-destroy.js")),
  group_finish_silence_js_1 =
    (Object.defineProperty(exports, "GroupFinishDestroy", {
      enumerable: !0,
      get: function () {
        return group_finish_destroy_js_1.GroupFinishDestroy;
      },
    }),
    require("./fb-component/group-finish-silence.js")),
  guide_line_creator_component_js_1 =
    (Object.defineProperty(exports, "GroupFinishSilence", {
      enumerable: !0,
      get: function () {
        return group_finish_silence_js_1.GroupFinishSilence;
      },
    }),
    require("./fb-component/guide-line-creator-component.js")),
  guide_line_creator_scan_option_js_1 =
    (Object.defineProperty(exports, "GuideLineCreatorComponent", {
      enumerable: !0,
      get: function () {
        return guide_line_creator_component_js_1.GuideLineCreatorComponent;
      },
    }),
    require("./fb-component/guide-line-creator-scan-option.js")),
  hack_management_component_js_1 =
    (Object.defineProperty(exports, "GuideLineCreatorScanOption", {
      enumerable: !0,
      get: function () {
        return guide_line_creator_scan_option_js_1.GuideLineCreatorScanOption;
      },
    }),
    require("./fb-component/hack-management-component.js")),
  head_info_change_data_js_1 =
    (Object.defineProperty(exports, "HackManagementComponent", {
      enumerable: !0,
      get: function () {
        return hack_management_component_js_1.HackManagementComponent;
      },
    }),
    require("./fb-component/head-info-change-data.js")),
  head_state_view_config_js_1 =
    (Object.defineProperty(exports, "HeadInfoChangeData", {
      enumerable: !0,
      get: function () {
        return head_info_change_data_js_1.HeadInfoChangeData;
      },
    }),
    require("./fb-component/head-state-view-config.js")),
  high_view_distance_js_1 =
    (Object.defineProperty(exports, "HeadStateViewConfig", {
      enumerable: !0,
      get: function () {
        return head_state_view_config_js_1.HeadStateViewConfig;
      },
    }),
    require("./fb-component/high-view-distance.js")),
  hit_bullet_type_all_character_attack_js_1 =
    (Object.defineProperty(exports, "HighViewDistance", {
      enumerable: !0,
      get: function () {
        return high_view_distance_js_1.HighViewDistance;
      },
    }),
    require("./fb-component/hit-bullet-type-all-character-attack.js")),
  hit_bullet_type_crystal_attack_js_1 =
    (Object.defineProperty(exports, "HitBulletTypeAllCharacterAttack", {
      enumerable: !0,
      get: function () {
        return hit_bullet_type_all_character_attack_js_1.HitBulletTypeAllCharacterAttack;
      },
    }),
    require("./fb-component/hit-bullet-type-crystal-attack.js")),
  hit_bullet_type_fixed_bullet_id_js_1 =
    (Object.defineProperty(exports, "HitBulletTypeCrystalAttack", {
      enumerable: !0,
      get: function () {
        return hit_bullet_type_crystal_attack_js_1.HitBulletTypeCrystalAttack;
      },
    }),
    require("./fb-component/hit-bullet-type-fixed-bullet-id.js")),
  hit_bullet_type_only_drop_attack_js_1 =
    (Object.defineProperty(exports, "HitBulletTypeFixedBulletId", {
      enumerable: !0,
      get: function () {
        return hit_bullet_type_fixed_bullet_id_js_1.HitBulletTypeFixedBulletId;
      },
    }),
    require("./fb-component/hit-bullet-type-only-drop-attack.js")),
  hit_bullet_type_player_attack_js_1 =
    (Object.defineProperty(exports, "HitBulletTypeOnlyDropAttack", {
      enumerable: !0,
      get: function () {
        return hit_bullet_type_only_drop_attack_js_1.HitBulletTypeOnlyDropAttack;
      },
    }),
    require("./fb-component/hit-bullet-type-player-attack.js")),
  hit_component_js_1 =
    (Object.defineProperty(exports, "HitBulletTypePlayerAttack", {
      enumerable: !0,
      get: function () {
        return hit_bullet_type_player_attack_js_1.HitBulletTypePlayerAttack;
      },
    }),
    require("./fb-component/hit-component.js")),
  hit_logic_change_count_down_state_js_1 =
    (Object.defineProperty(exports, "HitComponent", {
      enumerable: !0,
      get: function () {
        return hit_component_js_1.HitComponent;
      },
    }),
    require("./fb-component/hit-logic-change-count-down-state.js")),
  hit_logic_change_lock_state_js_1 =
    (Object.defineProperty(exports, "HitLogicChangeCountDownState", {
      enumerable: !0,
      get: function () {
        return hit_logic_change_count_down_state_js_1.HitLogicChangeCountDownState;
      },
    }),
    require("./fb-component/hit-logic-change-lock-state.js")),
  hit_logic_change_next_and_lock_target_state_js_1 =
    (Object.defineProperty(exports, "HitLogicChangeLockState", {
      enumerable: !0,
      get: function () {
        return hit_logic_change_lock_state_js_1.HitLogicChangeLockState;
      },
    }),
    require("./fb-component/hit-logic-change-next-and-lock-target-state.js")),
  hit_logic_change_next_state_js_1 =
    (Object.defineProperty(exports, "HitLogicChangeNextAndLockTargetState", {
      enumerable: !0,
      get: function () {
        return hit_logic_change_next_and_lock_target_state_js_1.HitLogicChangeNextAndLockTargetState;
      },
    }),
    require("./fb-component/hit-logic-change-next-state.js")),
  hit_logic_change_target_state_js_1 =
    (Object.defineProperty(exports, "HitLogicChangeNextState", {
      enumerable: !0,
      get: function () {
        return hit_logic_change_next_state_js_1.HitLogicChangeNextState;
      },
    }),
    require("./fb-component/hit-logic-change-target-state.js")),
  hit_time_scale_ratio_js_1 =
    (Object.defineProperty(exports, "HitLogicChangeTargetState", {
      enumerable: !0,
      get: function () {
        return hit_logic_change_target_state_js_1.HitLogicChangeTargetState;
      },
    }),
    require("./fb-component/hit-time-scale-ratio.js")),
  hold_cfg_js_1 =
    (Object.defineProperty(exports, "HitTimeScaleRatio", {
      enumerable: !0,
      get: function () {
        return hit_time_scale_ratio_js_1.HitTimeScaleRatio;
      },
    }),
    require("./fb-component/hold-cfg.js")),
  holding_track_target_js_1 =
    (Object.defineProperty(exports, "HoldCfg", {
      enumerable: !0,
      get: function () {
        return hold_cfg_js_1.HoldCfg;
      },
    }),
    require("./fb-component/holding-track-target.js")),
  hook_lock_point_js_1 =
    (Object.defineProperty(exports, "HoldingTrackTarget", {
      enumerable: !0,
      get: function () {
        return holding_track_target_js_1.HoldingTrackTarget;
      },
    }),
    require("./fb-component/hook-lock-point.js")),
  icon_near_by_tracking_config_js_1 =
    (Object.defineProperty(exports, "HookLockPoint", {
      enumerable: !0,
      get: function () {
        return hook_lock_point_js_1.HookLockPoint;
      },
    }),
    require("./fb-component/icon-near-by-tracking-config.js")),
  icon_nearby_tracking_js_1 =
    (Object.defineProperty(exports, "IconNearByTrackingConfig", {
      enumerable: !0,
      get: function () {
        return icon_near_by_tracking_config_js_1.IconNearByTrackingConfig;
      },
    }),
    require("./fb-component/icon-nearby-tracking.js")),
  ignore_entity_ids_collision_js_1 =
    (Object.defineProperty(exports, "IconNearbyTracking", {
      enumerable: !0,
      get: function () {
        return icon_nearby_tracking_js_1.IconNearbyTracking;
      },
    }),
    require("./fb-component/ignore-entity-ids-collision.js")),
  ignores_collision_cfg_js_1 =
    (Object.defineProperty(exports, "IgnoreEntityIdsCollision", {
      enumerable: !0,
      get: function () {
        return ignore_entity_ids_collision_js_1.IgnoreEntityIdsCollision;
      },
    }),
    require("./fb-component/ignores-collision-cfg.js")),
  immediate_add_buff_js_1 =
    (Object.defineProperty(exports, "IgnoresCollisionCfg", {
      enumerable: !0,
      get: function () {
        return ignores_collision_cfg_js_1.IgnoresCollisionCfg;
      },
    }),
    require("./fb-component/immediate-add-buff.js")),
  immediate_start_condition_js_1 =
    (Object.defineProperty(exports, "ImmediateAddBuff", {
      enumerable: !0,
      get: function () {
        return immediate_add_buff_js_1.ImmediateAddBuff;
      },
    }),
    require("./fb-component/immediate-start-condition.js")),
  inhalation_ability_component_js_1 =
    (Object.defineProperty(exports, "ImmediateStartCondition", {
      enumerable: !0,
      get: function () {
        return immediate_start_condition_js_1.ImmediateStartCondition;
      },
    }),
    require("./fb-component/inhalation-ability-component.js")),
  inhalation_config_js_1 =
    (Object.defineProperty(exports, "InhalationAbilityComponent", {
      enumerable: !0,
      get: function () {
        return inhalation_ability_component_js_1.InhalationAbilityComponent;
      },
    }),
    require("./fb-component/inhalation-config.js")),
  inhalation_matching_js_1 =
    (Object.defineProperty(exports, "InhalationConfig", {
      enumerable: !0,
      get: function () {
        return inhalation_config_js_1.InhalationConfig;
      },
    }),
    require("./fb-component/inhalation-matching.js")),
  inhaled_change_self_state_js_1 =
    (Object.defineProperty(exports, "InhalationMatching", {
      enumerable: !0,
      get: function () {
        return inhalation_matching_js_1.InhalationMatching;
      },
    }),
    require("./fb-component/inhaled-change-self-state.js")),
  inhaled_destroy_self_js_1 =
    (Object.defineProperty(exports, "InhaledChangeSelfState", {
      enumerable: !0,
      get: function () {
        return inhaled_change_self_state_js_1.InhaledChangeSelfState;
      },
    }),
    require("./fb-component/inhaled-destroy-self.js")),
  inhaled_item_component_js_1 =
    (Object.defineProperty(exports, "InhaledDestroySelf", {
      enumerable: !0,
      get: function () {
        return inhaled_destroy_self_js_1.InhaledDestroySelf;
      },
    }),
    require("./fb-component/inhaled-item-component.js")),
  inhaled_performance_js_1 =
    (Object.defineProperty(exports, "InhaledItemComponent", {
      enumerable: !0,
      get: function () {
        return inhaled_item_component_js_1.InhaledItemComponent;
      },
    }),
    require("./fb-component/inhaled-performance.js")),
  init_state_barrier_lock_js_1 =
    (Object.defineProperty(exports, "InhaledPerformance", {
      enumerable: !0,
      get: function () {
        return inhaled_performance_js_1.InhaledPerformance;
      },
    }),
    require("./fb-component/init-state-barrier-lock.js")),
  init_state_birth_js_1 =
    (Object.defineProperty(exports, "InitStateBarrierLock", {
      enumerable: !0,
      get: function () {
        return init_state_barrier_lock_js_1.InitStateBarrierLock;
      },
    }),
    require("./fb-component/init-state-birth.js")),
  init_state_digital_js_1 =
    (Object.defineProperty(exports, "InitStateBirth", {
      enumerable: !0,
      get: function () {
        return init_state_birth_js_1.InitStateBirth;
      },
    }),
    require("./fb-component/init-state-digital.js")),
  init_state_standby_js_1 =
    (Object.defineProperty(exports, "InitStateDigital", {
      enumerable: !0,
      get: function () {
        return init_state_digital_js_1.InitStateDigital;
      },
    }),
    require("./fb-component/init-state-standby.js")),
  init_state_wu_yin_qu_js_1 =
    (Object.defineProperty(exports, "InitStateStandby", {
      enumerable: !0,
      get: function () {
        return init_state_standby_js_1.InitStateStandby;
      },
    }),
    require("./fb-component/init-state-wu-yin-qu.js")),
  interact_audio_component_js_1 =
    (Object.defineProperty(exports, "InitStateWuYinQu", {
      enumerable: !0,
      get: function () {
        return init_state_wu_yin_qu_js_1.InitStateWuYinQu;
      },
    }),
    require("./fb-component/interact-audio-component.js")),
  interact_behaviour_actions_js_1 =
    (Object.defineProperty(exports, "InteractAudioComponent", {
      enumerable: !0,
      get: function () {
        return interact_audio_component_js_1.InteractAudioComponent;
      },
    }),
    require("./fb-component/interact-behaviour-actions.js")),
  interact_component_js_1 =
    (Object.defineProperty(exports, "InteractBehaviourActions", {
      enumerable: !0,
      get: function () {
        return interact_behaviour_actions_js_1.InteractBehaviourActions;
      },
    }),
    require("./fb-component/interact-component.js")),
  interact_gear_component_js_1 =
    (Object.defineProperty(exports, "InteractComponent", {
      enumerable: !0,
      get: function () {
        return interact_component_js_1.InteractComponent;
      },
    }),
    require("./fb-component/interact-gear-component.js")),
  interact_player_diraction_to_leisure_js_1 =
    (Object.defineProperty(exports, "InteractGearComponent", {
      enumerable: !0,
      get: function () {
        return interact_gear_component_js_1.InteractGearComponent;
      },
    }),
    require("./fb-component/interact-player-diraction-to-leisure.js")),
  interact_player_diraction_to_npc_js_1 =
    (Object.defineProperty(exports, "InteractPlayerDiractionToLeisure", {
      enumerable: !0,
      get: function () {
        return interact_player_diraction_to_leisure_js_1.InteractPlayerDiractionToLeisure;
      },
    }),
    require("./fb-component/interact-player-diraction-to-npc.js")),
  interact_sector_range_js_1 =
    (Object.defineProperty(exports, "InteractPlayerDiractionToNpc", {
      enumerable: !0,
      get: function () {
        return interact_player_diraction_to_npc_js_1.InteractPlayerDiractionToNpc;
      },
    }),
    require("./fb-component/interact-sector-range.js")),
  interactive_component_js_1 =
    (Object.defineProperty(exports, "InteractSectorRange", {
      enumerable: !0,
      get: function () {
        return interact_sector_range_js_1.InteractSectorRange;
      },
    }),
    require("./fb-component/interactive-component.js")),
  item_change_adsorbate_state_js_1 =
    (Object.defineProperty(exports, "InteractiveComponent", {
      enumerable: !0,
      get: function () {
        return interactive_component_js_1.InteractiveComponent;
      },
    }),
    require("./fb-component/item-change-adsorbate-state.js")),
  item_foundation_js_1 =
    (Object.defineProperty(exports, "ItemChangeAdsorbateState", {
      enumerable: !0,
      get: function () {
        return item_change_adsorbate_state_js_1.ItemChangeAdsorbateState;
      },
    }),
    require("./fb-component/item-foundation.js")),
  item_foundation2_js_1 =
    (Object.defineProperty(exports, "ItemFoundation", {
      enumerable: !0,
      get: function () {
        return item_foundation_js_1.ItemFoundation;
      },
    }),
    require("./fb-component/item-foundation2.js")),
  item_locking_config_js_1 =
    (Object.defineProperty(exports, "ItemFoundation2", {
      enumerable: !0,
      get: function () {
        return item_foundation2_js_1.ItemFoundation2;
      },
    }),
    require("./fb-component/item-locking-config.js")),
  jigsaw_completed_config_js_1 =
    (Object.defineProperty(exports, "ItemLockingConfig", {
      enumerable: !0,
      get: function () {
        return item_locking_config_js_1.ItemLockingConfig;
      },
    }),
    require("./fb-component/jigsaw-completed-config.js")),
  jigsaw_foundation_js_1 =
    (Object.defineProperty(exports, "JigsawCompletedConfig", {
      enumerable: !0,
      get: function () {
        return jigsaw_completed_config_js_1.JigsawCompletedConfig;
      },
    }),
    require("./fb-component/jigsaw-foundation.js")),
  jigsaw_item_js_1 =
    (Object.defineProperty(exports, "JigsawFoundation", {
      enumerable: !0,
      get: function () {
        return jigsaw_foundation_js_1.JigsawFoundation;
      },
    }),
    require("./fb-component/jigsaw-item.js")),
  jigsaw_item_matched_config_js_1 =
    (Object.defineProperty(exports, "JigsawItem", {
      enumerable: !0,
      get: function () {
        return jigsaw_item_js_1.JigsawItem;
      },
    }),
    require("./fb-component/jigsaw-item-matched-config.js")),
  jigsaw_piece_match_js_1 =
    (Object.defineProperty(exports, "JigsawItemMatchedConfig", {
      enumerable: !0,
      get: function () {
        return jigsaw_item_matched_config_js_1.JigsawItemMatchedConfig;
      },
    }),
    require("./fb-component/jigsaw-piece-match.js")),
  key_rotator_config_js_1 =
    (Object.defineProperty(exports, "JigsawPieceMatch", {
      enumerable: !0,
      get: function () {
        return jigsaw_piece_match_js_1.JigsawPieceMatch;
      },
    }),
    require("./fb-component/key-rotator-config.js")),
  kite_hook_js_1 =
    (Object.defineProperty(exports, "KeyRotatorConfig", {
      enumerable: !0,
      get: function () {
        return key_rotator_config_js_1.KeyRotatorConfig;
      },
    }),
    require("./fb-component/kite-hook.js")),
  let_go_destroy_condition_js_1 =
    (Object.defineProperty(exports, "KiteHook", {
      enumerable: !0,
      get: function () {
        return kite_hook_js_1.KiteHook;
      },
    }),
    require("./fb-component/let-go-destroy-condition.js")),
  level_aibehaviour_spline_js_1 =
    (Object.defineProperty(exports, "LetGoDestroyCondition", {
      enumerable: !0,
      get: function () {
        return let_go_destroy_condition_js_1.LetGoDestroyCondition;
      },
    }),
    require("./fb-component/level-aibehaviour-spline.js")),
  level_aicomponent_js_1 =
    (Object.defineProperty(exports, "LevelAIBehaviourSpline", {
      enumerable: !0,
      get: function () {
        return level_aibehaviour_spline_js_1.LevelAIBehaviourSpline;
      },
    }),
    require("./fb-component/level-aicomponent.js")),
  level_aispline_js_1 =
    (Object.defineProperty(exports, "LevelAIComponent", {
      enumerable: !0,
      get: function () {
        return level_aicomponent_js_1.LevelAIComponent;
      },
    }),
    require("./fb-component/level-aispline.js")),
  level_aispline_point_js_1 =
    (Object.defineProperty(exports, "LevelAISpline", {
      enumerable: !0,
      get: function () {
        return level_aispline_js_1.LevelAISpline;
      },
    }),
    require("./fb-component/level-aispline-point.js")),
  level_aistate_js_1 =
    (Object.defineProperty(exports, "LevelAISplinePoint", {
      enumerable: !0,
      get: function () {
        return level_aispline_point_js_1.LevelAISplinePoint;
      },
    }),
    require("./fb-component/level-aistate.js")),
  level_ai_cycle_looply_js_1 =
    (Object.defineProperty(exports, "LevelAIState", {
      enumerable: !0,
      get: function () {
        return level_aistate_js_1.LevelAIState;
      },
    }),
    require("./fb-component/level-ai-cycle-looply.js")),
  level_play_component_js_1 =
    (Object.defineProperty(exports, "LevelAiCycleLooply", {
      enumerable: !0,
      get: function () {
        return level_ai_cycle_looply_js_1.LevelAiCycleLooply;
      },
    }),
    require("./fb-component/level-play-component.js")),
  level_prefab_js_1 =
    (Object.defineProperty(exports, "LevelPlayComponent", {
      enumerable: !0,
      get: function () {
        return level_play_component_js_1.LevelPlayComponent;
      },
    }),
    require("./fb-component/level-prefab.js")),
  level_prefab_params_config_js_1 =
    (Object.defineProperty(exports, "LevelPrefab", {
      enumerable: !0,
      get: function () {
        return level_prefab_js_1.LevelPrefab;
      },
    }),
    require("./fb-component/level-prefab-params-config.js")),
  level_prefab_perform_component_js_1 =
    (Object.defineProperty(exports, "LevelPrefabParamsConfig", {
      enumerable: !0,
      get: function () {
        return level_prefab_params_config_js_1.LevelPrefabParamsConfig;
      },
    }),
    require("./fb-component/level-prefab-perform-component.js")),
  level_qte_component_js_1 =
    (Object.defineProperty(exports, "LevelPrefabPerformComponent", {
      enumerable: !0,
      get: function () {
        return level_prefab_perform_component_js_1.LevelPrefabPerformComponent;
      },
    }),
    require("./fb-component/level-qte-component.js")),
  level_sequence_frame_event_component_js_1 =
    (Object.defineProperty(exports, "LevelQteComponent", {
      enumerable: !0,
      get: function () {
        return level_qte_component_js_1.LevelQteComponent;
      },
    }),
    require("./fb-component/level-sequence-frame-event-component.js")),
  level_sequence_section_info_js_1 =
    (Object.defineProperty(exports, "LevelSequenceFrameEventComponent", {
      enumerable: !0,
      get: function () {
        return level_sequence_frame_event_component_js_1.LevelSequenceFrameEventComponent;
      },
    }),
    require("./fb-component/level-sequence-section-info.js")),
  levitate_magnet_component_js_1 =
    (Object.defineProperty(exports, "LevelSequenceSectionInfo", {
      enumerable: !0,
      get: function () {
        return level_sequence_section_info_js_1.LevelSequenceSectionInfo;
      },
    }),
    require("./fb-component/levitate-magnet-component.js")),
  life_point_center_component_js_1 =
    (Object.defineProperty(exports, "LevitateMagnetComponent", {
      enumerable: !0,
      get: function () {
        return levitate_magnet_component_js_1.LevitateMagnetComponent;
      },
    }),
    require("./fb-component/life-point-center-component.js")),
  lift_component_js_1 =
    (Object.defineProperty(exports, "LifePointCenterComponent", {
      enumerable: !0,
      get: function () {
        return life_point_center_component_js_1.LifePointCenterComponent;
      },
    }),
    require("./fb-component/lift-component.js")),
  location_safety_component_js_1 =
    (Object.defineProperty(exports, "LiftComponent", {
      enumerable: !0,
      get: function () {
        return lift_component_js_1.LiftComponent;
      },
    }),
    require("./fb-component/location-safety-component.js")),
  lock_config_js_1 =
    (Object.defineProperty(exports, "LocationSafetyComponent", {
      enumerable: !0,
      get: function () {
        return location_safety_component_js_1.LocationSafetyComponent;
      },
    }),
    require("./fb-component/lock-config.js")),
  low_view_distance_js_1 =
    (Object.defineProperty(exports, "LockConfig", {
      enumerable: !0,
      get: function () {
        return lock_config_js_1.LockConfig;
      },
    }),
    require("./fb-component/low-view-distance.js")),
  mesh_animal_model_js_1 =
    (Object.defineProperty(exports, "LowViewDistance", {
      enumerable: !0,
      get: function () {
        return low_view_distance_js_1.LowViewDistance;
      },
    }),
    require("./fb-component/mesh-animal-model.js")),
  mesh_npc_model_js_1 =
    (Object.defineProperty(exports, "MeshAnimalModel", {
      enumerable: !0,
      get: function () {
        return mesh_animal_model_js_1.MeshAnimalModel;
      },
    }),
    require("./fb-component/mesh-npc-model.js")),
  mid_view_distance_js_1 =
    (Object.defineProperty(exports, "MeshNpcModel", {
      enumerable: !0,
      get: function () {
        return mesh_npc_model_js_1.MeshNpcModel;
      },
    }),
    require("./fb-component/mid-view-distance.js")),
  model_component_js_1 =
    (Object.defineProperty(exports, "MidViewDistance", {
      enumerable: !0,
      get: function () {
        return mid_view_distance_js_1.MidViewDistance;
      },
    }),
    require("./fb-component/model-component.js")),
  model_id_js_1 =
    (Object.defineProperty(exports, "ModelComponent", {
      enumerable: !0,
      get: function () {
        return model_component_js_1.ModelComponent;
      },
    }),
    require("./fb-component/model-id.js")),
  monitor_component_js_1 =
    (Object.defineProperty(exports, "ModelId", {
      enumerable: !0,
      get: function () {
        return model_id_js_1.ModelId;
      },
    }),
    require("./fb-component/monitor-component.js")),
  monster_component_js_1 =
    (Object.defineProperty(exports, "MonitorComponent", {
      enumerable: !0,
      get: function () {
        return monitor_component_js_1.MonitorComponent;
      },
    }),
    require("./fb-component/monster-component.js")),
  monster_formation_js_1 =
    (Object.defineProperty(exports, "MonsterComponent", {
      enumerable: !0,
      get: function () {
        return monster_component_js_1.MonsterComponent;
      },
    }),
    require("./fb-component/monster-formation.js")),
  monster_gacha_base_component_js_1 =
    (Object.defineProperty(exports, "MonsterFormation", {
      enumerable: !0,
      get: function () {
        return monster_formation_js_1.MonsterFormation;
      },
    }),
    require("./fb-component/monster-gacha-base-component.js")),
  monster_gacha_item_component_js_1 =
    (Object.defineProperty(exports, "MonsterGachaBaseComponent", {
      enumerable: !0,
      get: function () {
        return monster_gacha_base_component_js_1.MonsterGachaBaseComponent;
      },
    }),
    require("./fb-component/monster-gacha-item-component.js")),
  monster_gacha_slot_js_1 =
    (Object.defineProperty(exports, "MonsterGachaItemComponent", {
      enumerable: !0,
      get: function () {
        return monster_gacha_item_component_js_1.MonsterGachaItemComponent;
      },
    }),
    require("./fb-component/monster-gacha-slot.js")),
  monster_perform_config_js_1 =
    (Object.defineProperty(exports, "MonsterGachaSlot", {
      enumerable: !0,
      get: function () {
        return monster_gacha_slot_js_1.MonsterGachaSlot;
      },
    }),
    require("./fb-component/monster-perform-config.js")),
  monster_show_on_death_effect_js_1 =
    (Object.defineProperty(exports, "MonsterPerformConfig", {
      enumerable: !0,
      get: function () {
        return monster_perform_config_js_1.MonsterPerformConfig;
      },
    }),
    require("./fb-component/monster-show-on-death-effect.js")),
  move_component_js_1 =
    (Object.defineProperty(exports, "MonsterShowOnDeathEffect", {
      enumerable: !0,
      get: function () {
        return monster_show_on_death_effect_js_1.MonsterShowOnDeathEffect;
      },
    }),
    require("./fb-component/move-component.js")),
  movement_perform_config_js_1 =
    (Object.defineProperty(exports, "MoveComponent", {
      enumerable: !0,
      get: function () {
        return move_component_js_1.MoveComponent;
      },
    }),
    require("./fb-component/movement-perform-config.js")),
  movement_point_hook_js_1 =
    (Object.defineProperty(exports, "MovementPerformConfig", {
      enumerable: !0,
      get: function () {
        return movement_perform_config_js_1.MovementPerformConfig;
      },
    }),
    require("./fb-component/movement-point-hook.js")),
  movement_vehicle_feature_js_1 =
    (Object.defineProperty(exports, "MovementPointHook", {
      enumerable: !0,
      get: function () {
        return movement_point_hook_js_1.MovementPointHook;
      },
    }),
    require("./fb-component/movement-vehicle-feature.js")),
  nearby_tracking_component_js_1 =
    (Object.defineProperty(exports, "MovementVehicleFeature", {
      enumerable: !0,
      get: function () {
        return movement_vehicle_feature_js_1.MovementVehicleFeature;
      },
    }),
    require("./fb-component/nearby-tracking-component.js")),
  next_slide_rail_js_1 =
    (Object.defineProperty(exports, "NearbyTrackingComponent", {
      enumerable: !0,
      get: function () {
        return nearby_tracking_component_js_1.NearbyTrackingComponent;
      },
    }),
    require("./fb-component/next-slide-rail.js")),
  no_render_portal_component_js_1 =
    (Object.defineProperty(exports, "NextSlideRail", {
      enumerable: !0,
      get: function () {
        return next_slide_rail_js_1.NextSlideRail;
      },
    }),
    require("./fb-component/no-render-portal-component.js")),
  npc_bump_show_js_1 =
    (Object.defineProperty(exports, "NoRenderPortalComponent", {
      enumerable: !0,
      get: function () {
        return no_render_portal_component_js_1.NoRenderPortalComponent;
      },
    }),
    require("./fb-component/npc-bump-show.js")),
  npc_death_interact_js_1 =
    (Object.defineProperty(exports, "NpcBumpShow", {
      enumerable: !0,
      get: function () {
        return npc_bump_show_js_1.NpcBumpShow;
      },
    }),
    require("./fb-component/npc-death-interact.js")),
  npc_hit_show_js_1 =
    (Object.defineProperty(exports, "NpcDeathInteract", {
      enumerable: !0,
      get: function () {
        return npc_death_interact_js_1.NpcDeathInteract;
      },
    }),
    require("./fb-component/npc-hit-show.js")),
  npc_model_js_1 =
    (Object.defineProperty(exports, "NpcHitShow", {
      enumerable: !0,
      get: function () {
        return npc_hit_show_js_1.NpcHitShow;
      },
    }),
    require("./fb-component/npc-model.js")),
  npc_perform_bubble_js_1 =
    (Object.defineProperty(exports, "NpcModel", {
      enumerable: !0,
      get: function () {
        return npc_model_js_1.NpcModel;
      },
    }),
    require("./fb-component/npc-perform-bubble.js")),
  npc_perform_component_js_1 =
    (Object.defineProperty(exports, "NpcPerformBubble", {
      enumerable: !0,
      get: function () {
        return npc_perform_bubble_js_1.NpcPerformBubble;
      },
    }),
    require("./fb-component/npc-perform-component.js")),
  npc_perform_on_interact_js_1 =
    (Object.defineProperty(exports, "NpcPerformComponent", {
      enumerable: !0,
      get: function () {
        return npc_perform_component_js_1.NpcPerformComponent;
      },
    }),
    require("./fb-component/npc-perform-on-interact.js")),
  npc_perform_on_monster_closeby_js_1 =
    (Object.defineProperty(exports, "NpcPerformOnInteract", {
      enumerable: !0,
      get: function () {
        return npc_perform_on_interact_js_1.NpcPerformOnInteract;
      },
    }),
    require("./fb-component/npc-perform-on-monster-closeby.js")),
  npc_perform_state_js_1 =
    (Object.defineProperty(exports, "NpcPerformOnMonsterCloseby", {
      enumerable: !0,
      get: function () {
        return npc_perform_on_monster_closeby_js_1.NpcPerformOnMonsterCloseby;
      },
    }),
    require("./fb-component/npc-perform-state.js")),
  npc_perform_state_config_js_1 =
    (Object.defineProperty(exports, "NpcPerformState", {
      enumerable: !0,
      get: function () {
        return npc_perform_state_js_1.NpcPerformState;
      },
    }),
    require("./fb-component/npc-perform-state-config.js")),
  npc_ride_in_auto_gongduola_perform_js_1 =
    (Object.defineProperty(exports, "NpcPerformStateConfig", {
      enumerable: !0,
      get: function () {
        return npc_perform_state_config_js_1.NpcPerformStateConfig;
      },
    }),
    require("./fb-component/npc-ride-in-auto-gongduola-perform.js")),
  npc_ride_in_gongduola_perform_js_1 =
    (Object.defineProperty(exports, "NpcRideInAutoGongduolaPerform", {
      enumerable: !0,
      get: function () {
        return npc_ride_in_auto_gongduola_perform_js_1.NpcRideInAutoGongduolaPerform;
      },
    }),
    require("./fb-component/npc-ride-in-gongduola-perform.js")),
  npc_standby_show_finitely_js_1 =
    (Object.defineProperty(exports, "NpcRideInGongduolaPerform", {
      enumerable: !0,
      get: function () {
        return npc_ride_in_gongduola_perform_js_1.NpcRideInGongduolaPerform;
      },
    }),
    require("./fb-component/npc-standby-show-finitely.js")),
  npc_standby_show_finitely_info_js_1 =
    (Object.defineProperty(exports, "NpcStandbyShowFinitely", {
      enumerable: !0,
      get: function () {
        return npc_standby_show_finitely_js_1.NpcStandbyShowFinitely;
      },
    }),
    require("./fb-component/npc-standby-show-finitely-info.js")),
  npc_standby_show_looply_js_1 =
    (Object.defineProperty(exports, "NpcStandbyShowFinitelyInfo", {
      enumerable: !0,
      get: function () {
        return npc_standby_show_finitely_info_js_1.NpcStandbyShowFinitelyInfo;
      },
    }),
    require("./fb-component/npc-standby-show-looply.js")),
  npc_standby_sit_js_1 =
    (Object.defineProperty(exports, "NpcStandbyShowLooply", {
      enumerable: !0,
      get: function () {
        return npc_standby_show_looply_js_1.NpcStandbyShowLooply;
      },
    }),
    require("./fb-component/npc-standby-sit.js")),
  npc_ui_interact_on_antique_shop_js_1 =
    (Object.defineProperty(exports, "NpcStandbySit", {
      enumerable: !0,
      get: function () {
        return npc_standby_sit_js_1.NpcStandbySit;
      },
    }),
    require("./fb-component/npc-ui-interact-on-antique-shop.js")),
  npc_ui_interact_on_cheng_xiao_shan_shop_js_1 =
    (Object.defineProperty(exports, "NpcUiInteractOnAntiqueShop", {
      enumerable: !0,
      get: function () {
        return npc_ui_interact_on_antique_shop_js_1.NpcUiInteractOnAntiqueShop;
      },
    }),
    require("./fb-component/npc-ui-interact-on-cheng-xiao-shan-shop.js")),
  npc_ui_interact_on_gramophone_js_1 =
    (Object.defineProperty(exports, "NpcUiInteractOnChengXiaoShanShop", {
      enumerable: !0,
      get: function () {
        return npc_ui_interact_on_cheng_xiao_shan_shop_js_1.NpcUiInteractOnChengXiaoShanShop;
      },
    }),
    require("./fb-component/npc-ui-interact-on-gramophone.js")),
  npc_ui_interact_on_hand_in_item_js_1 =
    (Object.defineProperty(exports, "NpcUiInteractOnGramophone", {
      enumerable: !0,
      get: function () {
        return npc_ui_interact_on_gramophone_js_1.NpcUiInteractOnGramophone;
      },
    }),
    require("./fb-component/npc-ui-interact-on-hand-in-item.js")),
  npc_ui_interact_on_shop_js_1 =
    (Object.defineProperty(exports, "NpcUiInteractOnHandInItem", {
      enumerable: !0,
      get: function () {
        return npc_ui_interact_on_hand_in_item_js_1.NpcUiInteractOnHandInItem;
      },
    }),
    require("./fb-component/npc-ui-interact-on-shop.js")),
  on_collision_condition_js_1 =
    (Object.defineProperty(exports, "NpcUiInteractOnShop", {
      enumerable: !0,
      get: function () {
        return npc_ui_interact_on_shop_js_1.NpcUiInteractOnShop;
      },
    }),
    require("./fb-component/on-collision-condition.js")),
  on_hit_condition_js_1 =
    (Object.defineProperty(exports, "OnCollisionCondition", {
      enumerable: !0,
      get: function () {
        return on_collision_condition_js_1.OnCollisionCondition;
      },
    }),
    require("./fb-component/on-hit-condition.js")),
  on_matching_condition_js_1 =
    (Object.defineProperty(exports, "OnHitCondition", {
      enumerable: !0,
      get: function () {
        return on_hit_condition_js_1.OnHitCondition;
      },
    }),
    require("./fb-component/on-matching-condition.js")),
  on_open_gravity_collision_condition_js_1 =
    (Object.defineProperty(exports, "OnMatchingCondition", {
      enumerable: !0,
      get: function () {
        return on_matching_condition_js_1.OnMatchingCondition;
      },
    }),
    require("./fb-component/on-open-gravity-collision-condition.js")),
  on_throw_trigger_time_condition_js_1 =
    (Object.defineProperty(exports, "OnOpenGravityCollisionCondition", {
      enumerable: !0,
      get: function () {
        return on_open_gravity_collision_condition_js_1.OnOpenGravityCollisionCondition;
      },
    }),
    require("./fb-component/on-throw-trigger-time-condition.js")),
  operations_after_entity_group_failure_js_1 =
    (Object.defineProperty(exports, "OnThrowTriggerTimeCondition", {
      enumerable: !0,
      get: function () {
        return on_throw_trigger_time_condition_js_1.OnThrowTriggerTimeCondition;
      },
    }),
    require("./fb-component/operations-after-entity-group-failure.js")),
  parkour_point_layer_config_js_1 =
    (Object.defineProperty(exports, "OperationsAfterEntityGroupFailure", {
      enumerable: !0,
      get: function () {
        return operations_after_entity_group_failure_js_1.OperationsAfterEntityGroupFailure;
      },
    }),
    require("./fb-component/parkour-point-layer-config.js")),
  parkour_spline_js_1 =
    (Object.defineProperty(exports, "ParkourPointLayerConfig", {
      enumerable: !0,
      get: function () {
        return parkour_point_layer_config_js_1.ParkourPointLayerConfig;
      },
    }),
    require("./fb-component/parkour-spline.js")),
  parkour_spline_point_js_1 =
    (Object.defineProperty(exports, "ParkourSpline", {
      enumerable: !0,
      get: function () {
        return parkour_spline_js_1.ParkourSpline;
      },
    }),
    require("./fb-component/parkour-spline-point.js")),
  passenger_teleport_config_js_1 =
    (Object.defineProperty(exports, "ParkourSplinePoint", {
      enumerable: !0,
      get: function () {
        return parkour_spline_point_js_1.ParkourSplinePoint;
      },
    }),
    require("./fb-component/passenger-teleport-config.js")),
  passerby_npc_fix_interval_spawn_js_1 =
    (Object.defineProperty(exports, "PassengerTeleportConfig", {
      enumerable: !0,
      get: function () {
        return passenger_teleport_config_js_1.PassengerTeleportConfig;
      },
    }),
    require("./fb-component/passerby-npc-fix-interval-spawn.js")),
  passerby_npc_move_state_js_1 =
    (Object.defineProperty(exports, "PasserbyNpcFixIntervalSpawn", {
      enumerable: !0,
      get: function () {
        return passerby_npc_fix_interval_spawn_js_1.PasserbyNpcFixIntervalSpawn;
      },
    }),
    require("./fb-component/passerby-npc-move-state.js")),
  passerby_npc_spawn_component_js_1 =
    (Object.defineProperty(exports, "PasserbyNpcMoveState", {
      enumerable: !0,
      get: function () {
        return passerby_npc_move_state_js_1.PasserbyNpcMoveState;
      },
    }),
    require("./fb-component/passerby-npc-spawn-component.js")),
  passerby_npc_spline_js_1 =
    (Object.defineProperty(exports, "PasserbyNpcSpawnComponent", {
      enumerable: !0,
      get: function () {
        return passerby_npc_spawn_component_js_1.PasserbyNpcSpawnComponent;
      },
    }),
    require("./fb-component/passerby-npc-spline.js")),
  passerby_npc_spline_move_js_1 =
    (Object.defineProperty(exports, "PasserbyNpcSpline", {
      enumerable: !0,
      get: function () {
        return passerby_npc_spline_js_1.PasserbyNpcSpline;
      },
    }),
    require("./fb-component/passerby-npc-spline-move.js")),
  passerby_npc_template_source_js_1 =
    (Object.defineProperty(exports, "PasserbyNpcSplineMove", {
      enumerable: !0,
      get: function () {
        return passerby_npc_spline_move_js_1.PasserbyNpcSplineMove;
      },
    }),
    require("./fb-component/passerby-npc-template-source.js")),
  patrol_js_1 =
    (Object.defineProperty(exports, "PasserbyNpcTemplateSource", {
      enumerable: !0,
      get: function () {
        return passerby_npc_template_source_js_1.PasserbyNpcTemplateSource;
      },
    }),
    require("./fb-component/patrol.js")),
  patrol_action_js_1 =
    (Object.defineProperty(exports, "Patrol", {
      enumerable: !0,
      get: function () {
        return patrol_js_1.Patrol;
      },
    }),
    require("./fb-component/patrol-action.js")),
  patrol_cycle_looply_js_1 =
    (Object.defineProperty(exports, "PatrolAction", {
      enumerable: !0,
      get: function () {
        return patrol_action_js_1.PatrolAction;
      },
    }),
    require("./fb-component/patrol-cycle-looply.js")),
  patrol_cycle_oncely_js_1 =
    (Object.defineProperty(exports, "PatrolCycleLooply", {
      enumerable: !0,
      get: function () {
        return patrol_cycle_looply_js_1.PatrolCycleLooply;
      },
    }),
    require("./fb-component/patrol-cycle-oncely.js")),
  patrol_range_js_1 =
    (Object.defineProperty(exports, "PatrolCycleOncely", {
      enumerable: !0,
      get: function () {
        return patrol_cycle_oncely_js_1.PatrolCycleOncely;
      },
    }),
    require("./fb-component/patrol-range.js")),
  patrol_spline_js_1 =
    (Object.defineProperty(exports, "PatrolRange", {
      enumerable: !0,
      get: function () {
        return patrol_range_js_1.PatrolRange;
      },
    }),
    require("./fb-component/patrol-spline.js")),
  patrol_spline_point_js_1 =
    (Object.defineProperty(exports, "PatrolSpline", {
      enumerable: !0,
      get: function () {
        return patrol_spline_js_1.PatrolSpline;
      },
    }),
    require("./fb-component/patrol-spline-point.js")),
  photo_target_component_js_1 =
    (Object.defineProperty(exports, "PatrolSplinePoint", {
      enumerable: !0,
      get: function () {
        return patrol_spline_point_js_1.PatrolSplinePoint;
      },
    }),
    require("./fb-component/photo-target-component.js")),
  physics_constraint_component_js_1 =
    (Object.defineProperty(exports, "PhotoTargetComponent", {
      enumerable: !0,
      get: function () {
        return photo_target_component_js_1.PhotoTargetComponent;
      },
    }),
    require("./fb-component/physics-constraint-component.js")),
  pick_interact_component_js_1 =
    (Object.defineProperty(exports, "PhysicsConstraintComponent", {
      enumerable: !0,
      get: function () {
        return physics_constraint_component_js_1.PhysicsConstraintComponent;
      },
    }),
    require("./fb-component/pick-interact-component.js")),
  point_ak_event_js_1 =
    (Object.defineProperty(exports, "PickInteractComponent", {
      enumerable: !0,
      get: function () {
        return pick_interact_component_js_1.PickInteractComponent;
      },
    }),
    require("./fb-component/point-ak-event.js")),
  point_attach_target_js_1 =
    (Object.defineProperty(exports, "PointAkEvent", {
      enumerable: !0,
      get: function () {
        return point_ak_event_js_1.PointAkEvent;
      },
    }),
    require("./fb-component/point-attach-target.js")),
  point_field_js_1 =
    (Object.defineProperty(exports, "PointAttachTarget", {
      enumerable: !0,
      get: function () {
        return point_attach_target_js_1.PointAttachTarget;
      },
    }),
    require("./fb-component/point-field.js")),
  point_group_js_1 =
    (Object.defineProperty(exports, "PointField", {
      enumerable: !0,
      get: function () {
        return point_field_js_1.PointField;
      },
    }),
    require("./fb-component/point-group.js")),
  point_group_by_layer_js_1 =
    (Object.defineProperty(exports, "PointGroup", {
      enumerable: !0,
      get: function () {
        return point_group_js_1.PointGroup;
      },
    }),
    require("./fb-component/point-group-by-layer.js")),
  portal_component_js_1 =
    (Object.defineProperty(exports, "PointGroupByLayer", {
      enumerable: !0,
      get: function () {
        return point_group_by_layer_js_1.PointGroupByLayer;
      },
    }),
    require("./fb-component/portal-component.js")),
  portal_render_config_js_1 =
    (Object.defineProperty(exports, "PortalComponent", {
      enumerable: !0,
      get: function () {
        return portal_component_js_1.PortalComponent;
      },
    }),
    require("./fb-component/portal-render-config.js")),
  prefab_effect_config_js_1 =
    (Object.defineProperty(exports, "PortalRenderConfig", {
      enumerable: !0,
      get: function () {
        return portal_render_config_js_1.PortalRenderConfig;
      },
    }),
    require("./fb-component/prefab-effect-config.js")),
  prefab_state_config_js_1 =
    (Object.defineProperty(exports, "PrefabEffectConfig", {
      enumerable: !0,
      get: function () {
        return prefab_effect_config_js_1.PrefabEffectConfig;
      },
    }),
    require("./fb-component/prefab-state-config.js")),
  probability_refresh_group_js_1 =
    (Object.defineProperty(exports, "PrefabStateConfig", {
      enumerable: !0,
      get: function () {
        return prefab_state_config_js_1.PrefabStateConfig;
      },
    }),
    require("./fb-component/probability-refresh-group.js")),
  probability_refresh_item_js_1 =
    (Object.defineProperty(exports, "ProbabilityRefreshGroup", {
      enumerable: !0,
      get: function () {
        return probability_refresh_group_js_1.ProbabilityRefreshGroup;
      },
    }),
    require("./fb-component/probability-refresh-item.js")),
  progress_bar_control_component_js_1 =
    (Object.defineProperty(exports, "ProbabilityRefreshItem", {
      enumerable: !0,
      get: function () {
        return probability_refresh_item_js_1.ProbabilityRefreshItem;
      },
    }),
    require("./fb-component/progress-bar-control-component.js")),
  projectile_motion_js_1 =
    (Object.defineProperty(exports, "ProgressBarControlComponent", {
      enumerable: !0,
      get: function () {
        return progress_bar_control_component_js_1.ProgressBarControlComponent;
      },
    }),
    require("./fb-component/projectile-motion.js")),
  pulling_category_matching_foundation_js_1 =
    (Object.defineProperty(exports, "ProjectileMotion", {
      enumerable: !0,
      get: function () {
        return projectile_motion_js_1.ProjectileMotion;
      },
    }),
    require("./fb-component/pulling-category-matching-foundation.js")),
  pulling_foundation_js_1 =
    (Object.defineProperty(exports, "PullingCategoryMatchingFoundation", {
      enumerable: !0,
      get: function () {
        return pulling_category_matching_foundation_js_1.PullingCategoryMatchingFoundation;
      },
    }),
    require("./fb-component/pulling-foundation.js")),
  pulse_device_foundation_js_1 =
    (Object.defineProperty(exports, "PullingFoundation", {
      enumerable: !0,
      get: function () {
        return pulling_foundation_js_1.PullingFoundation;
      },
    }),
    require("./fb-component/pulse-device-foundation.js")),
  put_in_the_specified_piece_js_1 =
    (Object.defineProperty(exports, "PulseDeviceFoundation", {
      enumerable: !0,
      get: function () {
        return pulse_device_foundation_js_1.PulseDeviceFoundation;
      },
    }),
    require("./fb-component/put-in-the-specified-piece.js")),
  qte_callback_js_1 =
    (Object.defineProperty(exports, "PutInTheSpecifiedPiece", {
      enumerable: !0,
      get: function () {
        return put_in_the_specified_piece_js_1.PutInTheSpecifiedPiece;
      },
    }),
    require("./fb-component/qte-callback.js")),
  quantity_refill_condition_js_1 =
    (Object.defineProperty(exports, "QteCallback", {
      enumerable: !0,
      get: function () {
        return qte_callback_js_1.QteCallback;
      },
    }),
    require("./fb-component/quantity-refill-condition.js")),
  race_strategy_js_1 =
    (Object.defineProperty(exports, "QuantityRefillCondition", {
      enumerable: !0,
      get: function () {
        return quantity_refill_condition_js_1.QuantityRefillCondition;
      },
    }),
    require("./fb-component/race-strategy.js")),
  rag_doll_climbing_point_js_1 =
    (Object.defineProperty(exports, "RaceStrategy", {
      enumerable: !0,
      get: function () {
        return race_strategy_js_1.RaceStrategy;
      },
    }),
    require("./fb-component/rag-doll-climbing-point.js")),
  rag_doll_jumping_point_js_1 =
    (Object.defineProperty(exports, "RagDollClimbingPoint", {
      enumerable: !0,
      get: function () {
        return rag_doll_climbing_point_js_1.RagDollClimbingPoint;
      },
    }),
    require("./fb-component/rag-doll-jumping-point.js")),
  random_batch_pool_refresh_js_1 =
    (Object.defineProperty(exports, "RagDollJumpingPoint", {
      enumerable: !0,
      get: function () {
        return rag_doll_jumping_point_js_1.RagDollJumpingPoint;
      },
    }),
    require("./fb-component/random-batch-pool-refresh.js")),
  random_batch_refresh_js_1 =
    (Object.defineProperty(exports, "RandomBatchPoolRefresh", {
      enumerable: !0,
      get: function () {
        return random_batch_pool_refresh_js_1.RandomBatchPoolRefresh;
      },
    }),
    require("./fb-component/random-batch-refresh.js")),
  random_entity_refresh_content_js_1 =
    (Object.defineProperty(exports, "RandomBatchRefresh", {
      enumerable: !0,
      get: function () {
        return random_batch_refresh_js_1.RandomBatchRefresh;
      },
    }),
    require("./fb-component/random-entity-refresh-content.js")),
  random_interact_js_1 =
    (Object.defineProperty(exports, "RandomEntityRefreshContent", {
      enumerable: !0,
      get: function () {
        return random_entity_refresh_content_js_1.RandomEntityRefreshContent;
      },
    }),
    require("./fb-component/random-interact.js")),
  random_interact_option_js_1 =
    (Object.defineProperty(exports, "RandomInteract", {
      enumerable: !0,
      get: function () {
        return random_interact_js_1.RandomInteract;
      },
    }),
    require("./fb-component/random-interact-option.js")),
  random_npc_rule_js_1 =
    (Object.defineProperty(exports, "RandomInteractOption", {
      enumerable: !0,
      get: function () {
        return random_interact_option_js_1.RandomInteractOption;
      },
    }),
    require("./fb-component/random-npc-rule.js")),
  range_adsorption_foundation_js_1 =
    (Object.defineProperty(exports, "RandomNpcRule", {
      enumerable: !0,
      get: function () {
        return random_npc_rule_js_1.RandomNpcRule;
      },
    }),
    require("./fb-component/range-adsorption-foundation.js")),
  range_component_js_1 =
    (Object.defineProperty(exports, "RangeAdsorptionFoundation", {
      enumerable: !0,
      get: function () {
        return range_adsorption_foundation_js_1.RangeAdsorptionFoundation;
      },
    }),
    require("./fb-component/range-component.js")),
  rebound_component_js_1 =
    (Object.defineProperty(exports, "RangeComponent", {
      enumerable: !0,
      get: function () {
        return range_component_js_1.RangeComponent;
      },
    }),
    require("./fb-component/rebound-component.js")),
  refresh_component_js_1 =
    (Object.defineProperty(exports, "ReboundComponent", {
      enumerable: !0,
      get: function () {
        return rebound_component_js_1.ReboundComponent;
      },
    }),
    require("./fb-component/refresh-component.js")),
  refresh_group_component_js_1 =
    (Object.defineProperty(exports, "RefreshComponent", {
      enumerable: !0,
      get: function () {
        return refresh_component_js_1.RefreshComponent;
      },
    }),
    require("./fb-component/refresh-group-component.js")),
  refresh_single_component_js_1 =
    (Object.defineProperty(exports, "RefreshGroupComponent", {
      enumerable: !0,
      get: function () {
        return refresh_group_component_js_1.RefreshGroupComponent;
      },
    }),
    require("./fb-component/refresh-single-component.js")),
  render_book_page_js_1 =
    (Object.defineProperty(exports, "RefreshSingleComponent", {
      enumerable: !0,
      get: function () {
        return refresh_single_component_js_1.RefreshSingleComponent;
      },
    }),
    require("./fb-component/render-book-page.js")),
  render_flag_js_1 =
    (Object.defineProperty(exports, "RenderBookPage", {
      enumerable: !0,
      get: function () {
        return render_book_page_js_1.RenderBookPage;
      },
    }),
    require("./fb-component/render-flag.js")),
  render_flower_bridge_js_1 =
    (Object.defineProperty(exports, "RenderFlag", {
      enumerable: !0,
      get: function () {
        return render_flag_js_1.RenderFlag;
      },
    }),
    require("./fb-component/render-flower-bridge.js")),
  render_fog_barrier_js_1 =
    (Object.defineProperty(exports, "RenderFlowerBridge", {
      enumerable: !0,
      get: function () {
        return render_flower_bridge_js_1.RenderFlowerBridge;
      },
    }),
    require("./fb-component/render-fog-barrier.js")),
  render_specified_range_component_js_1 =
    (Object.defineProperty(exports, "RenderFogBarrier", {
      enumerable: !0,
      get: function () {
        return render_fog_barrier_js_1.RenderFogBarrier;
      },
    }),
    require("./fb-component/render-specified-range-component.js")),
  render_trajectory_config_js_1 =
    (Object.defineProperty(exports, "RenderSpecifiedRangeComponent", {
      enumerable: !0,
      get: function () {
        return render_specified_range_component_js_1.RenderSpecifiedRangeComponent;
      },
    }),
    require("./fb-component/render-trajectory-config.js")),
  renju_config_js_1 =
    (Object.defineProperty(exports, "RenderTrajectoryConfig", {
      enumerable: !0,
      get: function () {
        return render_trajectory_config_js_1.RenderTrajectoryConfig;
      },
    }),
    require("./fb-component/renju-config.js")),
  renju_strategy_js_1 =
    (Object.defineProperty(exports, "RenjuConfig", {
      enumerable: !0,
      get: function () {
        return renju_config_js_1.RenjuConfig;
      },
    }),
    require("./fb-component/renju-strategy.js")),
  reset_entities_pos_component_js_1 =
    (Object.defineProperty(exports, "RenjuStrategy", {
      enumerable: !0,
      get: function () {
        return renju_strategy_js_1.RenjuStrategy;
      },
    }),
    require("./fb-component/reset-entities-pos-component.js")),
  reset_self_pos_component_js_1 =
    (Object.defineProperty(exports, "ResetEntitiesPosComponent", {
      enumerable: !0,
      get: function () {
        return reset_entities_pos_component_js_1.ResetEntitiesPosComponent;
      },
    }),
    require("./fb-component/reset-self-pos-component.js")),
  resurrection_component_js_1 =
    (Object.defineProperty(exports, "ResetSelfPosComponent", {
      enumerable: !0,
      get: function () {
        return reset_self_pos_component_js_1.ResetSelfPosComponent;
      },
    }),
    require("./fb-component/resurrection-component.js")),
  reward_component_js_1 =
    (Object.defineProperty(exports, "ResurrectionComponent", {
      enumerable: !0,
      get: function () {
        return resurrection_component_js_1.ResurrectionComponent;
      },
    }),
    require("./fb-component/reward-component.js")),
  reward_refresh_config_js_1 =
    (Object.defineProperty(exports, "RewardComponent", {
      enumerable: !0,
      get: function () {
        return reward_component_js_1.RewardComponent;
      },
    }),
    require("./fb-component/reward-refresh-config.js")),
  role_inhalation_js_1 =
    (Object.defineProperty(exports, "RewardRefreshConfig", {
      enumerable: !0,
      get: function () {
        return reward_refresh_config_js_1.RewardRefreshConfig;
      },
    }),
    require("./fb-component/role-inhalation.js")),
  rotation_config_js_1 =
    (Object.defineProperty(exports, "RoleInhalation", {
      enumerable: !0,
      get: function () {
        return role_inhalation_js_1.RoleInhalation;
      },
    }),
    require("./fb-component/rotation-config.js")),
  rotator_component_js_1 =
    (Object.defineProperty(exports, "RotationConfig", {
      enumerable: !0,
      get: function () {
        return rotation_config_js_1.RotationConfig;
      },
    }),
    require("./fb-component/rotator-component.js")),
  rotator_component2_js_1 =
    (Object.defineProperty(exports, "RotatorComponent", {
      enumerable: !0,
      get: function () {
        return rotator_component_js_1.RotatorComponent;
      },
    }),
    require("./fb-component/rotator-component2.js")),
  scan_trace_effect_js_1 =
    (Object.defineProperty(exports, "RotatorComponent2", {
      enumerable: !0,
      get: function () {
        return rotator_component2_js_1.RotatorComponent2;
      },
    }),
    require("./fb-component/scan-trace-effect.js")),
  scene_actor_ref_component_js_1 =
    (Object.defineProperty(exports, "ScanTraceEffect", {
      enumerable: !0,
      get: function () {
        return scan_trace_effect_js_1.ScanTraceEffect;
      },
    }),
    require("./fb-component/scene-actor-ref-component.js")),
  scene_actor_ref_group_js_1 =
    (Object.defineProperty(exports, "SceneActorRefComponent", {
      enumerable: !0,
      get: function () {
        return scene_actor_ref_component_js_1.SceneActorRefComponent;
      },
    }),
    require("./fb-component/scene-actor-ref-group.js")),
  scene_bullet_component_js_1 =
    (Object.defineProperty(exports, "SceneActorRefGroup", {
      enumerable: !0,
      get: function () {
        return scene_actor_ref_group_js_1.SceneActorRefGroup;
      },
    }),
    require("./fb-component/scene-bullet-component.js")),
  scene_bullet_group_js_1 =
    (Object.defineProperty(exports, "SceneBulletComponent", {
      enumerable: !0,
      get: function () {
        return scene_bullet_component_js_1.SceneBulletComponent;
      },
    }),
    require("./fb-component/scene-bullet-group.js")),
  scene_item_ai_component_js_1 =
    (Object.defineProperty(exports, "SceneBulletGroup", {
      enumerable: !0,
      get: function () {
        return scene_bullet_group_js_1.SceneBulletGroup;
      },
    }),
    require("./fb-component/scene-item-ai-component.js")),
  scene_item_ai_patrol_by_game_time_js_1 =
    (Object.defineProperty(exports, "SceneItemAiComponent", {
      enumerable: !0,
      get: function () {
        return scene_item_ai_component_js_1.SceneItemAiComponent;
      },
    }),
    require("./fb-component/scene-item-ai-patrol-by-game-time.js")),
  scene_item_attribute_component_js_1 =
    (Object.defineProperty(exports, "SceneItemAiPatrolByGameTime", {
      enumerable: !0,
      get: function () {
        return scene_item_ai_patrol_by_game_time_js_1.SceneItemAiPatrolByGameTime;
      },
    }),
    require("./fb-component/scene-item-attribute-component.js")),
  scene_item_inhalation_js_1 =
    (Object.defineProperty(exports, "SceneItemAttributeComponent", {
      enumerable: !0,
      get: function () {
        return scene_item_attribute_component_js_1.SceneItemAttributeComponent;
      },
    }),
    require("./fb-component/scene-item-inhalation.js")),
  scene_item_life_cycle_component_js_1 =
    (Object.defineProperty(exports, "SceneItemInhalation", {
      enumerable: !0,
      get: function () {
        return scene_item_inhalation_js_1.SceneItemInhalation;
      },
    }),
    require("./fb-component/scene-item-life-cycle-component.js")),
  scene_item_movement_component_js_1 =
    (Object.defineProperty(exports, "SceneItemLifeCycleComponent", {
      enumerable: !0,
      get: function () {
        return scene_item_life_cycle_component_js_1.SceneItemLifeCycleComponent;
      },
    }),
    require("./fb-component/scene-item-movement-component.js")),
  scene_item_patrol_js_1 =
    (Object.defineProperty(exports, "SceneItemMovementComponent", {
      enumerable: !0,
      get: function () {
        return scene_item_movement_component_js_1.SceneItemMovementComponent;
      },
    }),
    require("./fb-component/scene-item-patrol.js")),
  search_target_cfg_js_1 =
    (Object.defineProperty(exports, "SceneItemPatrol", {
      enumerable: !0,
      get: function () {
        return scene_item_patrol_js_1.SceneItemPatrol;
      },
    }),
    require("./fb-component/search-target-cfg.js")),
  sequence_batch_refresh_js_1 =
    (Object.defineProperty(exports, "SearchTargetCfg", {
      enumerable: !0,
      get: function () {
        return search_target_cfg_js_1.SearchTargetCfg;
      },
    }),
    require("./fb-component/sequence-batch-refresh.js")),
  sequence_track_control_js_1 =
    (Object.defineProperty(exports, "SequenceBatchRefresh", {
      enumerable: !0,
      get: function () {
        return sequence_batch_refresh_js_1.SequenceBatchRefresh;
      },
    }),
    require("./fb-component/sequence-track-control.js")),
  sequence_track_control_point_js_1 =
    (Object.defineProperty(exports, "SequenceTrackControl", {
      enumerable: !0,
      get: function () {
        return sequence_track_control_js_1.SequenceTrackControl;
      },
    }),
    require("./fb-component/sequence-track-control-point.js")),
  setting_spring_dir_js_1 =
    (Object.defineProperty(exports, "SequenceTrackControlPoint", {
      enumerable: !0,
      get: function () {
        return sequence_track_control_point_js_1.SequenceTrackControlPoint;
      },
    }),
    require("./fb-component/setting-spring-dir.js")),
  single_btn_qte_js_1 =
    (Object.defineProperty(exports, "SettingSpringDir", {
      enumerable: !0,
      get: function () {
        return setting_spring_dir_js_1.SettingSpringDir;
      },
    }),
    require("./fb-component/single-btn-qte.js")),
  skill_damage_js_1 =
    (Object.defineProperty(exports, "SingleBtnQte", {
      enumerable: !0,
      get: function () {
        return single_btn_qte_js_1.SingleBtnQte;
      },
    }),
    require("./fb-component/skill-damage.js")),
  skybox_component_js_1 =
    (Object.defineProperty(exports, "SkillDamage", {
      enumerable: !0,
      get: function () {
        return skill_damage_js_1.SkillDamage;
      },
    }),
    require("./fb-component/skybox-component.js")),
  skybox_distance_trigger_js_1 =
    (Object.defineProperty(exports, "SkyboxComponent", {
      enumerable: !0,
      get: function () {
        return skybox_component_js_1.SkyboxComponent;
      },
    }),
    require("./fb-component/skybox-distance-trigger.js")),
  skybox_global_trigger_js_1 =
    (Object.defineProperty(exports, "SkyboxDistanceTrigger", {
      enumerable: !0,
      get: function () {
        return skybox_distance_trigger_js_1.SkyboxDistanceTrigger;
      },
    }),
    require("./fb-component/skybox-global-trigger.js")),
  slash_hook_js_1 =
    (Object.defineProperty(exports, "SkyboxGlobalTrigger", {
      enumerable: !0,
      get: function () {
        return skybox_global_trigger_js_1.SkyboxGlobalTrigger;
      },
    }),
    require("./fb-component/slash-hook.js")),
  slide_rail_component_js_1 =
    (Object.defineProperty(exports, "SlashHook", {
      enumerable: !0,
      get: function () {
        return slash_hook_js_1.SlashHook;
      },
    }),
    require("./fb-component/slide-rail-component.js")),
  spawn_monster_component_js_1 =
    (Object.defineProperty(exports, "SlideRailComponent", {
      enumerable: !0,
      get: function () {
        return slide_rail_component_js_1.SlideRailComponent;
      },
    }),
    require("./fb-component/spawn-monster-component.js")),
  spawn_monster_config_js_1 =
    (Object.defineProperty(exports, "SpawnMonsterComponent", {
      enumerable: !0,
      get: function () {
        return spawn_monster_component_js_1.SpawnMonsterComponent;
      },
    }),
    require("./fb-component/spawn-monster-config.js")),
  spawn_monster_constraint_annular_sector_js_1 =
    (Object.defineProperty(exports, "SpawnMonsterConfig", {
      enumerable: !0,
      get: function () {
        return spawn_monster_config_js_1.SpawnMonsterConfig;
      },
    }),
    require("./fb-component/spawn-monster-constraint-annular-sector.js")),
  spawn_monster_pre_depend_on_preceding_js_1 =
    (Object.defineProperty(exports, "SpawnMonsterConstraintAnnularSector", {
      enumerable: !0,
      get: function () {
        return spawn_monster_constraint_annular_sector_js_1.SpawnMonsterConstraintAnnularSector;
      },
    }),
    require("./fb-component/spawn-monster-pre-depend-on-preceding.js")),
  spawn_template_entity_config_js_1 =
    (Object.defineProperty(exports, "SpawnMonsterPreDependOnPreceding", {
      enumerable: !0,
      get: function () {
        return spawn_monster_pre_depend_on_preceding_js_1.SpawnMonsterPreDependOnPreceding;
      },
    }),
    require("./fb-component/spawn-template-entity-config.js")),
  speed_curve_motion_js_1 =
    (Object.defineProperty(exports, "SpawnTemplateEntityConfig", {
      enumerable: !0,
      get: function () {
        return spawn_template_entity_config_js_1.SpawnTemplateEntityConfig;
      },
    }),
    require("./fb-component/speed-curve-motion.js")),
  speed_effect_config_js_1 =
    (Object.defineProperty(exports, "SpeedCurveMotion", {
      enumerable: !0,
      get: function () {
        return speed_curve_motion_js_1.SpeedCurveMotion;
      },
    }),
    require("./fb-component/speed-effect-config.js")),
  sphere_factory_component_js_1 =
    (Object.defineProperty(exports, "SpeedEffectConfig", {
      enumerable: !0,
      get: function () {
        return speed_effect_config_js_1.SpeedEffectConfig;
      },
    }),
    require("./fb-component/sphere-factory-component.js")),
  spline_component_js_1 =
    (Object.defineProperty(exports, "SphereFactoryComponent", {
      enumerable: !0,
      get: function () {
        return sphere_factory_component_js_1.SphereFactoryComponent;
      },
    }),
    require("./fb-component/spline-component.js")),
  spline_move_js_1 =
    (Object.defineProperty(exports, "SplineComponent", {
      enumerable: !0,
      get: function () {
        return spline_component_js_1.SplineComponent;
      },
    }),
    require("./fb-component/spline-move.js")),
  spring_component_js_1 =
    (Object.defineProperty(exports, "SplineMove", {
      enumerable: !0,
      get: function () {
        return spline_move_js_1.SplineMove;
      },
    }),
    require("./fb-component/spring-component.js")),
  state_change_behavior_js_1 =
    (Object.defineProperty(exports, "SpringComponent", {
      enumerable: !0,
      get: function () {
        return spring_component_js_1.SpringComponent;
      },
    }),
    require("./fb-component/state-change-behavior.js")),
  state_change_config_js_1 =
    (Object.defineProperty(exports, "StateChangeBehavior", {
      enumerable: !0,
      get: function () {
        return state_change_behavior_js_1.StateChangeBehavior;
      },
    }),
    require("./fb-component/state-change-config.js")),
  state_config_js_1 =
    (Object.defineProperty(exports, "StateChangeConfig", {
      enumerable: !0,
      get: function () {
        return state_change_config_js_1.StateChangeConfig;
      },
    }),
    require("./fb-component/state-config.js")),
  state_hint_component_js_1 =
    (Object.defineProperty(exports, "StateConfig", {
      enumerable: !0,
      get: function () {
        return state_config_js_1.StateConfig;
      },
    }),
    require("./fb-component/state-hint-component.js")),
  state_rotation_config_js_1 =
    (Object.defineProperty(exports, "StateHintComponent", {
      enumerable: !0,
      get: function () {
        return state_hint_component_js_1.StateHintComponent;
      },
    }),
    require("./fb-component/state-rotation-config.js")),
  static_entitiy_match_js_1 =
    (Object.defineProperty(exports, "StateRotationConfig", {
      enumerable: !0,
      get: function () {
        return state_rotation_config_js_1.StateRotationConfig;
      },
    }),
    require("./fb-component/static-entitiy-match.js")),
  static_no_render_portal_js_1 =
    (Object.defineProperty(exports, "StaticEntitiyMatch", {
      enumerable: !0,
      get: function () {
        return static_entitiy_match_js_1.StaticEntitiyMatch;
      },
    }),
    require("./fb-component/static-no-render-portal.js")),
  static_portal_js_1 =
    (Object.defineProperty(exports, "StaticNoRenderPortal", {
      enumerable: !0,
      get: function () {
        return static_no_render_portal_js_1.StaticNoRenderPortal;
      },
    }),
    require("./fb-component/static-portal.js")),
  success_condition_count_down_state_js_1 =
    (Object.defineProperty(exports, "StaticPortal", {
      enumerable: !0,
      get: function () {
        return static_portal_js_1.StaticPortal;
      },
    }),
    require("./fb-component/success-condition-count-down-state.js")),
  success_condition_same_arbitrary_state_js_1 =
    (Object.defineProperty(exports, "SuccessConditionCountDownState", {
      enumerable: !0,
      get: function () {
        return success_condition_count_down_state_js_1.SuccessConditionCountDownState;
      },
    }),
    require("./fb-component/success-condition-same-arbitrary-state.js")),
  success_condition_same_specific_state_js_1 =
    (Object.defineProperty(exports, "SuccessConditionSameArbitraryState", {
      enumerable: !0,
      get: function () {
        return success_condition_same_arbitrary_state_js_1.SuccessConditionSameArbitraryState;
      },
    }),
    require("./fb-component/success-condition-same-specific-state.js")),
  success_condition_specific_target_state_js_1 =
    (Object.defineProperty(exports, "SuccessConditionSameSpecificState", {
      enumerable: !0,
      get: function () {
        return success_condition_same_specific_state_js_1.SuccessConditionSameSpecificState;
      },
    }),
    require("./fb-component/success-condition-specific-target-state.js")),
  sui_guang_hook_js_1 =
    (Object.defineProperty(exports, "SuccessConditionSpecificTargetState", {
      enumerable: !0,
      get: function () {
        return success_condition_specific_target_state_js_1.SuccessConditionSpecificTargetState;
      },
    }),
    require("./fb-component/sui-guang-hook.js")),
  switcher_component_js_1 =
    (Object.defineProperty(exports, "SuiGuangHook", {
      enumerable: !0,
      get: function () {
        return sui_guang_hook_js_1.SuiGuangHook;
      },
    }),
    require("./fb-component/switcher-component.js")),
  target_gear_component_js_1 =
    (Object.defineProperty(exports, "SwitcherComponent", {
      enumerable: !0,
      get: function () {
        return switcher_component_js_1.SwitcherComponent;
      },
    }),
    require("./fb-component/target-gear-component.js")),
  target_gear_group_component_js_1 =
    (Object.defineProperty(exports, "TargetGearComponent", {
      enumerable: !0,
      get: function () {
        return target_gear_component_js_1.TargetGearComponent;
      },
    }),
    require("./fb-component/target-gear-group-component.js")),
  target_gear_group_config_js_1 =
    (Object.defineProperty(exports, "TargetGearGroupComponent", {
      enumerable: !0,
      get: function () {
        return target_gear_group_component_js_1.TargetGearGroupComponent;
      },
    }),
    require("./fb-component/target-gear-group-config.js")),
  tele_control2_js_1 =
    (Object.defineProperty(exports, "TargetGearGroupConfig", {
      enumerable: !0,
      get: function () {
        return target_gear_group_config_js_1.TargetGearGroupConfig;
      },
    }),
    require("./fb-component/tele-control2.js")),
  tele_control_base_cfg_js_1 =
    (Object.defineProperty(exports, "TeleControl2", {
      enumerable: !0,
      get: function () {
        return tele_control2_js_1.TeleControl2;
      },
    }),
    require("./fb-component/tele-control-base-cfg.js")),
  teleport_component_js_1 =
    (Object.defineProperty(exports, "TeleControlBaseCfg", {
      enumerable: !0,
      get: function () {
        return tele_control_base_cfg_js_1.TeleControlBaseCfg;
      },
    }),
    require("./fb-component/teleport-component.js")),
  teleport_scene_effect_js_1 =
    (Object.defineProperty(exports, "TeleportComponent", {
      enumerable: !0,
      get: function () {
        return teleport_component_js_1.TeleportComponent;
      },
    }),
    require("./fb-component/teleport-scene-effect.js")),
  template_entity_spawner_component_js_1 =
    (Object.defineProperty(exports, "TeleportSceneEffect", {
      enumerable: !0,
      get: function () {
        return teleport_scene_effect_js_1.TeleportSceneEffect;
      },
    }),
    require("./fb-component/template-entity-spawner-component.js")),
  template_matrix_js_1 =
    (Object.defineProperty(exports, "TemplateEntitySpawnerComponent", {
      enumerable: !0,
      get: function () {
        return template_entity_spawner_component_js_1.TemplateEntitySpawnerComponent;
      },
    }),
    require("./fb-component/template-matrix.js")),
  template_matrix_row_js_1 =
    (Object.defineProperty(exports, "TemplateMatrix", {
      enumerable: !0,
      get: function () {
        return template_matrix_js_1.TemplateMatrix;
      },
    }),
    require("./fb-component/template-matrix-row.js")),
  throw_cfg_js_1 =
    (Object.defineProperty(exports, "TemplateMatrixRow", {
      enumerable: !0,
      get: function () {
        return template_matrix_row_js_1.TemplateMatrixRow;
      },
    }),
    require("./fb-component/throw-cfg.js")),
  throw_destroy_condition_js_1 =
    (Object.defineProperty(exports, "ThrowCfg", {
      enumerable: !0,
      get: function () {
        return throw_cfg_js_1.ThrowCfg;
      },
    }),
    require("./fb-component/throw-destroy-condition.js")),
  throw_motion_levitate_js_1 =
    (Object.defineProperty(exports, "ThrowDestroyCondition", {
      enumerable: !0,
      get: function () {
        return throw_destroy_condition_js_1.ThrowDestroyCondition;
      },
    }),
    require("./fb-component/throw-motion-levitate.js")),
  throw_motion_track_target_js_1 =
    (Object.defineProperty(exports, "ThrowMotionLevitate", {
      enumerable: !0,
      get: function () {
        return throw_motion_levitate_js_1.ThrowMotionLevitate;
      },
    }),
    require("./fb-component/throw-motion-track-target.js")),
  time_path_config_js_1 =
    (Object.defineProperty(exports, "ThrowMotionTrackTarget", {
      enumerable: !0,
      get: function () {
        return throw_motion_track_target_js_1.ThrowMotionTrackTarget;
      },
    }),
    require("./fb-component/time-path-config.js")),
  time_patrol_spline_js_1 =
    (Object.defineProperty(exports, "TimePathConfig", {
      enumerable: !0,
      get: function () {
        return time_path_config_js_1.TimePathConfig;
      },
    }),
    require("./fb-component/time-patrol-spline.js")),
  time_patrol_spline_point_js_1 =
    (Object.defineProperty(exports, "TimePatrolSpline", {
      enumerable: !0,
      get: function () {
        return time_patrol_spline_js_1.TimePatrolSpline;
      },
    }),
    require("./fb-component/time-patrol-spline-point.js")),
  time_stop_component_js_1 =
    (Object.defineProperty(exports, "TimePatrolSplinePoint", {
      enumerable: !0,
      get: function () {
        return time_patrol_spline_point_js_1.TimePatrolSplinePoint;
      },
    }),
    require("./fb-component/time-stop-component.js")),
  time_stop_target_js_1 =
    (Object.defineProperty(exports, "TimeStopComponent", {
      enumerable: !0,
      get: function () {
        return time_stop_component_js_1.TimeStopComponent;
      },
    }),
    require("./fb-component/time-stop-target.js")),
  timed_strike_device_js_1 =
    (Object.defineProperty(exports, "TimeStopTarget", {
      enumerable: !0,
      get: function () {
        return time_stop_target_js_1.TimeStopTarget;
      },
    }),
    require("./fb-component/timed-strike-device.js")),
  timeline_control_group_js_1 =
    (Object.defineProperty(exports, "TimedStrikeDevice", {
      enumerable: !0,
      get: function () {
        return timed_strike_device_js_1.TimedStrikeDevice;
      },
    }),
    require("./fb-component/timeline-control-group.js")),
  timeline_track_control_component_js_1 =
    (Object.defineProperty(exports, "TimelineControlGroup", {
      enumerable: !0,
      get: function () {
        return timeline_control_group_js_1.TimelineControlGroup;
      },
    }),
    require("./fb-component/timeline-track-control-component.js")),
  toward_entity_config_js_1 =
    (Object.defineProperty(exports, "TimelineTrackControlComponent", {
      enumerable: !0,
      get: function () {
        return timeline_track_control_component_js_1.TimelineTrackControlComponent;
      },
    }),
    require("./fb-component/toward-entity-config.js")),
  trample_component_js_1 =
    (Object.defineProperty(exports, "TowardEntityConfig", {
      enumerable: !0,
      get: function () {
        return toward_entity_config_js_1.TowardEntityConfig;
      },
    }),
    require("./fb-component/trample-component.js")),
  trample_ue5_component_js_1 =
    (Object.defineProperty(exports, "TrampleComponent", {
      enumerable: !0,
      get: function () {
        return trample_component_js_1.TrampleComponent;
      },
    }),
    require("./fb-component/trample-ue5-component.js")),
  treasure_box_component_js_1 =
    (Object.defineProperty(exports, "TrampleUe5Component", {
      enumerable: !0,
      get: function () {
        return trample_ue5_component_js_1.TrampleUe5Component;
      },
    }),
    require("./fb-component/treasure-box-component.js")),
  trigger_component_js_1 =
    (Object.defineProperty(exports, "TreasureBoxComponent", {
      enumerable: !0,
      get: function () {
        return treasure_box_component_js_1.TreasureBoxComponent;
      },
    }),
    require("./fb-component/trigger-component.js")),
  trigger_count_config_js_1 =
    (Object.defineProperty(exports, "TriggerComponent", {
      enumerable: !0,
      get: function () {
        return trigger_component_js_1.TriggerComponent;
      },
    }),
    require("./fb-component/trigger-count-config.js")),
  trigger_exit_config_js_1 =
    (Object.defineProperty(exports, "TriggerCountConfig", {
      enumerable: !0,
      get: function () {
        return trigger_count_config_js_1.TriggerCountConfig;
      },
    }),
    require("./fb-component/trigger-exit-config.js")),
  trigger_match_config_js_1 =
    (Object.defineProperty(exports, "TriggerExitConfig", {
      enumerable: !0,
      get: function () {
        return trigger_exit_config_js_1.TriggerExitConfig;
      },
    }),
    require("./fb-component/trigger-match-config.js")),
  trigger_range_start_condition_js_1 =
    (Object.defineProperty(exports, "TriggerMatchConfig", {
      enumerable: !0,
      get: function () {
        return trigger_match_config_js_1.TriggerMatchConfig;
      },
    }),
    require("./fb-component/trigger-range-start-condition.js")),
  trigger_ue5_component_js_1 =
    (Object.defineProperty(exports, "TriggerRangeStartCondition", {
      enumerable: !0,
      get: function () {
        return trigger_range_start_condition_js_1.TriggerRangeStartCondition;
      },
    }),
    require("./fb-component/trigger-ue5-component.js")),
  triggered_config_js_1 =
    (Object.defineProperty(exports, "TriggerUe5Component", {
      enumerable: !0,
      get: function () {
        return trigger_ue5_component_js_1.TriggerUe5Component;
      },
    }),
    require("./fb-component/triggered-config.js")),
  turntable_control_component_js_1 =
    (Object.defineProperty(exports, "TriggeredConfig", {
      enumerable: !0,
      get: function () {
        return triggered_config_js_1.TriggeredConfig;
      },
    }),
    require("./fb-component/turntable-control-component.js")),
  un_use_component_js_1 =
    (Object.defineProperty(exports, "TurntableControlComponent", {
      enumerable: !0,
      get: function () {
        return turntable_control_component_js_1.TurntableControlComponent;
      },
    }),
    require("./fb-component/un-use-component.js")),
  underground_component_js_1 =
    (Object.defineProperty(exports, "UnUseComponent", {
      enumerable: !0,
      get: function () {
        return un_use_component_js_1.UnUseComponent;
      },
    }),
    require("./fb-component/underground-component.js")),
  underground_state_info_js_1 =
    (Object.defineProperty(exports, "UndergroundComponent", {
      enumerable: !0,
      get: function () {
        return underground_component_js_1.UndergroundComponent;
      },
    }),
    require("./fb-component/underground-state-info.js")),
  union_add_buff_mode_js_1 =
    (Object.defineProperty(exports, "UndergroundStateInfo", {
      enumerable: !0,
      get: function () {
        return underground_state_info_js_1.UndergroundStateInfo;
      },
    }),
    require("./fb-component/union-add-buff-mode.js")),
  union_ai_gear_strategy_js_1 =
    (Object.defineProperty(exports, "UnionAddBuffMode", {
      enumerable: !0,
      get: function () {
        return union_add_buff_mode_js_1.UnionAddBuffMode;
      },
    }),
    require("./fb-component/union-ai-gear-strategy.js")),
  union_ak_event_type_js_1 =
    (Object.defineProperty(exports, "UnionAiGearStrategy", {
      enumerable: !0,
      get: function () {
        return union_ai_gear_strategy_js_1.UnionAiGearStrategy;
      },
    }),
    require("./fb-component/union-ak-event-type.js")),
  union_animal_model_type_js_1 =
    (Object.defineProperty(exports, "UnionAkEventType", {
      enumerable: !0,
      get: function () {
        return union_ak_event_type_js_1.UnionAkEventType;
      },
    }),
    require("./fb-component/union-animal-model-type.js")),
  union_attach_target_js_1 =
    (Object.defineProperty(exports, "UnionAnimalModelType", {
      enumerable: !0,
      get: function () {
        return union_animal_model_type_js_1.UnionAnimalModelType;
      },
    }),
    require("./fb-component/union-attach-target.js")),
  union_audio_control_type_js_1 =
    (Object.defineProperty(exports, "UnionAttachTarget", {
      enumerable: !0,
      get: function () {
        return union_attach_target_js_1.UnionAttachTarget;
      },
    }),
    require("./fb-component/union-audio-control-type.js")),
  union_bullet_create_condition_js_1 =
    (Object.defineProperty(exports, "UnionAudioControlType", {
      enumerable: !0,
      get: function () {
        return union_audio_control_type_js_1.UnionAudioControlType;
      },
    }),
    require("./fb-component/union-bullet-create-condition.js")),
  union_character_connector_logic_js_1 =
    (Object.defineProperty(exports, "UnionBulletCreateCondition", {
      enumerable: !0,
      get: function () {
        return union_bullet_create_condition_js_1.UnionBulletCreateCondition;
      },
    }),
    require("./fb-component/union-character-connector-logic.js")),
  union_color_change_strategy_of_spline_effect_js_1 =
    (Object.defineProperty(exports, "UnionCharacterConnectorLogic", {
      enumerable: !0,
      get: function () {
        return union_character_connector_logic_js_1.UnionCharacterConnectorLogic;
      },
    }),
    require("./fb-component/union-color-change-strategy-of-spline-effect.js")),
  union_component_js_1 =
    (Object.defineProperty(exports, "UnionColorChangeStrategyOfSplineEffect", {
      enumerable: !0,
      get: function () {
        return union_color_change_strategy_of_spline_effect_js_1.UnionColorChangeStrategyOfSplineEffect;
      },
    }),
    require("./fb-component/union-component.js")),
  union_connector_logic_js_1 =
    (Object.defineProperty(exports, "UnionComponent", {
      enumerable: !0,
      get: function () {
        return union_component_js_1.UnionComponent;
      },
    }),
    require("./fb-component/union-connector-logic.js")),
  union_conveyor_belt_field_type_js_1 =
    (Object.defineProperty(exports, "UnionConnectorLogic", {
      enumerable: !0,
      get: function () {
        return union_connector_logic_js_1.UnionConnectorLogic;
      },
    }),
    require("./fb-component/union-conveyor-belt-field-type.js")),
  union_conveyor_belt_move_type_js_1 =
    (Object.defineProperty(exports, "UnionConveyorBeltFieldType", {
      enumerable: !0,
      get: function () {
        return union_conveyor_belt_field_type_js_1.UnionConveyorBeltFieldType;
      },
    }),
    require("./fb-component/union-conveyor-belt-move-type.js")),
  union_curve_control_config_js_1 =
    (Object.defineProperty(exports, "UnionConveyorBeltMoveType", {
      enumerable: !0,
      get: function () {
        return union_conveyor_belt_move_type_js_1.UnionConveyorBeltMoveType;
      },
    }),
    require("./fb-component/union-curve-control-config.js")),
  union_deflection_config_js_1 =
    (Object.defineProperty(exports, "UnionCurveControlConfig", {
      enumerable: !0,
      get: function () {
        return union_curve_control_config_js_1.UnionCurveControlConfig;
      },
    }),
    require("./fb-component/union-deflection-config.js")),
  union_dynamic_portal_create_js_1 =
    (Object.defineProperty(exports, "UnionDeflectionConfig", {
      enumerable: !0,
      get: function () {
        return union_deflection_config_js_1.UnionDeflectionConfig;
      },
    }),
    require("./fb-component/union-dynamic-portal-create.js")),
  union_effect_area_config_js_1 =
    (Object.defineProperty(exports, "UnionDynamicPortalCreate", {
      enumerable: !0,
      get: function () {
        return union_dynamic_portal_create_js_1.UnionDynamicPortalCreate;
      },
    }),
    require("./fb-component/union-effect-area-config.js")),
  union_effect_spline_create_option_js_1 =
    (Object.defineProperty(exports, "UnionEffectAreaConfig", {
      enumerable: !0,
      get: function () {
        return union_effect_area_config_js_1.UnionEffectAreaConfig;
      },
    }),
    require("./fb-component/union-effect-spline-create-option.js")),
  union_entity_batch_js_1 =
    (Object.defineProperty(exports, "UnionEffectSplineCreateOption", {
      enumerable: !0,
      get: function () {
        return union_effect_spline_create_option_js_1.UnionEffectSplineCreateOption;
      },
    }),
    require("./fb-component/union-entity-batch.js")),
  union_entity_batch_refresh_js_1 =
    (Object.defineProperty(exports, "UnionEntityBatch", {
      enumerable: !0,
      get: function () {
        return union_entity_batch_js_1.UnionEntityBatch;
      },
    }),
    require("./fb-component/union-entity-batch-refresh.js")),
  union_entity_group_failure_condition_js_1 =
    (Object.defineProperty(exports, "UnionEntityBatchRefresh", {
      enumerable: !0,
      get: function () {
        return union_entity_batch_refresh_js_1.UnionEntityBatchRefresh;
      },
    }),
    require("./fb-component/union-entity-group-failure-condition.js")),
  union_entity_match_js_1 =
    (Object.defineProperty(exports, "UnionEntityGroupFailureCondition", {
      enumerable: !0,
      get: function () {
        return union_entity_group_failure_condition_js_1.UnionEntityGroupFailureCondition;
      },
    }),
    require("./fb-component/union-entity-match.js")),
  union_explore_skill_interact_option_js_1 =
    (Object.defineProperty(exports, "UnionEntityMatch", {
      enumerable: !0,
      get: function () {
        return union_entity_match_js_1.UnionEntityMatch;
      },
    }),
    require("./fb-component/union-explore-skill-interact-option.js")),
  union_explore_skill_search_target_cfg_js_1 =
    (Object.defineProperty(exports, "UnionExploreSkillInteractOption", {
      enumerable: !0,
      get: function () {
        return union_explore_skill_interact_option_js_1.UnionExploreSkillInteractOption;
      },
    }),
    require("./fb-component/union-explore-skill-search-target-cfg.js")),
  union_fan_interact_option_js_1 =
    (Object.defineProperty(exports, "UnionExploreSkillSearchTargetCfg", {
      enumerable: !0,
      get: function () {
        return union_explore_skill_search_target_cfg_js_1.UnionExploreSkillSearchTargetCfg;
      },
    }),
    require("./fb-component/union-fan-interact-option.js")),
  union_fight_musics_switch_type_js_1 =
    (Object.defineProperty(exports, "UnionFanInteractOption", {
      enumerable: !0,
      get: function () {
        return union_fan_interact_option_js_1.UnionFanInteractOption;
      },
    }),
    require("./fb-component/union-fight-musics-switch-type.js")),
  union_fill_config_js_1 =
    (Object.defineProperty(exports, "UnionFightMusicsSwitchType", {
      enumerable: !0,
      get: function () {
        return union_fight_musics_switch_type_js_1.UnionFightMusicsSwitchType;
      },
    }),
    require("./fb-component/union-fill-config.js")),
  union_follow_track_end_option_js_1 =
    (Object.defineProperty(exports, "UnionFillConfig", {
      enumerable: !0,
      get: function () {
        return union_fill_config_js_1.UnionFillConfig;
      },
    }),
    require("./fb-component/union-follow-track-end-option.js")),
  union_group_ai_option_js_1 =
    (Object.defineProperty(exports, "UnionFollowTrackEndOption", {
      enumerable: !0,
      get: function () {
        return union_follow_track_end_option_js_1.UnionFollowTrackEndOption;
      },
    }),
    require("./fb-component/union-group-ai-option.js")),
  union_group_finish_config_js_1 =
    (Object.defineProperty(exports, "UnionGroupAiOption", {
      enumerable: !0,
      get: function () {
        return union_group_ai_option_js_1.UnionGroupAiOption;
      },
    }),
    require("./fb-component/union-group-finish-config.js")),
  union_hit_bullet_type_js_1 =
    (Object.defineProperty(exports, "UnionGroupFinishConfig", {
      enumerable: !0,
      get: function () {
        return union_group_finish_config_js_1.UnionGroupFinishConfig;
      },
    }),
    require("./fb-component/union-hit-bullet-type.js")),
  union_hit_logic_type_js_1 =
    (Object.defineProperty(exports, "UnionHitBulletType", {
      enumerable: !0,
      get: function () {
        return union_hit_bullet_type_js_1.UnionHitBulletType;
      },
    }),
    require("./fb-component/union-hit-logic-type.js")),
  union_hook_interact_config_js_1 =
    (Object.defineProperty(exports, "UnionHitLogicType", {
      enumerable: !0,
      get: function () {
        return union_hit_logic_type_js_1.UnionHitLogicType;
      },
    }),
    require("./fb-component/union-hook-interact-config.js")),
  union_inhalation_performance_js_1 =
    (Object.defineProperty(exports, "UnionHookInteractConfig", {
      enumerable: !0,
      get: function () {
        return union_hook_interact_config_js_1.UnionHookInteractConfig;
      },
    }),
    require("./fb-component/union-inhalation-performance.js")),
  union_inhaled_per_result_type_js_1 =
    (Object.defineProperty(exports, "UnionInhalationPerformance", {
      enumerable: !0,
      get: function () {
        return union_inhalation_performance_js_1.UnionInhalationPerformance;
      },
    }),
    require("./fb-component/union-inhaled-per-result-type.js")),
  union_init_state_js_1 =
    (Object.defineProperty(exports, "UnionInhaledPerResultType", {
      enumerable: !0,
      get: function () {
        return union_inhaled_per_result_type_js_1.UnionInhaledPerResultType;
      },
    }),
    require("./fb-component/union-init-state.js")),
  union_interact_additional_info_js_1 =
    (Object.defineProperty(exports, "UnionInitState", {
      enumerable: !0,
      get: function () {
        return union_init_state_js_1.UnionInitState;
      },
    }),
    require("./fb-component/union-interact-additional-info.js")),
  union_interact_player_diraction_option_js_1 =
    (Object.defineProperty(exports, "UnionInteractAdditionalInfo", {
      enumerable: !0,
      get: function () {
        return union_interact_additional_info_js_1.UnionInteractAdditionalInfo;
      },
    }),
    require("./fb-component/union-interact-player-diraction-option.js")),
  union_item_foundation_js_1 =
    (Object.defineProperty(exports, "UnionInteractPlayerDiractionOption", {
      enumerable: !0,
      get: function () {
        return union_interact_player_diraction_option_js_1.UnionInteractPlayerDiractionOption;
      },
    }),
    require("./fb-component/union-item-foundation.js")),
  union_jigsaw_complete_condition_js_1 =
    (Object.defineProperty(exports, "UnionItemFoundation", {
      enumerable: !0,
      get: function () {
        return union_item_foundation_js_1.UnionItemFoundation;
      },
    }),
    require("./fb-component/union-jigsaw-complete-condition.js")),
  union_level_aibehaviour_js_1 =
    (Object.defineProperty(exports, "UnionJigsawCompleteCondition", {
      enumerable: !0,
      get: function () {
        return union_jigsaw_complete_condition_js_1.UnionJigsawCompleteCondition;
      },
    }),
    require("./fb-component/union-level-aibehaviour.js")),
  union_level_ai_cycle_option_js_1 =
    (Object.defineProperty(exports, "UnionLevelAIBehaviour", {
      enumerable: !0,
      get: function () {
        return union_level_aibehaviour_js_1.UnionLevelAIBehaviour;
      },
    }),
    require("./fb-component/union-level-ai-cycle-option.js")),
  union_model_type_js_1 =
    (Object.defineProperty(exports, "UnionLevelAiCycleOption", {
      enumerable: !0,
      get: function () {
        return union_level_ai_cycle_option_js_1.UnionLevelAiCycleOption;
      },
    }),
    require("./fb-component/union-model-type.js")),
  union_monster_show_on_death_config_js_1 =
    (Object.defineProperty(exports, "UnionModelType", {
      enumerable: !0,
      get: function () {
        return union_model_type_js_1.UnionModelType;
      },
    }),
    require("./fb-component/union-monster-show-on-death-config.js")),
  union_movement_mode_js_1 =
    (Object.defineProperty(exports, "UnionMonsterShowOnDeathConfig", {
      enumerable: !0,
      get: function () {
        return union_monster_show_on_death_config_js_1.UnionMonsterShowOnDeathConfig;
      },
    }),
    require("./fb-component/union-movement-mode.js")),
  union_nearby_tracking_js_1 =
    (Object.defineProperty(exports, "UnionMovementMode", {
      enumerable: !0,
      get: function () {
        return union_movement_mode_js_1.UnionMovementMode;
      },
    }),
    require("./fb-component/union-nearby-tracking.js")),
  union_no_render_portal_config_js_1 =
    (Object.defineProperty(exports, "UnionNearbyTracking", {
      enumerable: !0,
      get: function () {
        return union_nearby_tracking_js_1.UnionNearbyTracking;
      },
    }),
    require("./fb-component/union-no-render-portal-config.js")),
  union_npc_model_type_js_1 =
    (Object.defineProperty(exports, "UnionNoRenderPortalConfig", {
      enumerable: !0,
      get: function () {
        return union_no_render_portal_config_js_1.UnionNoRenderPortalConfig;
      },
    }),
    require("./fb-component/union-npc-model-type.js")),
  union_npc_ride_in_vehicle_perform_type_js_1 =
    (Object.defineProperty(exports, "UnionNpcModelType", {
      enumerable: !0,
      get: function () {
        return union_npc_model_type_js_1.UnionNpcModelType;
      },
    }),
    require("./fb-component/union-npc-ride-in-vehicle-perform-type.js")),
  union_npc_standby_show_option_js_1 =
    (Object.defineProperty(exports, "UnionNpcRideInVehiclePerformType", {
      enumerable: !0,
      get: function () {
        return union_npc_ride_in_vehicle_perform_type_js_1.UnionNpcRideInVehiclePerformType;
      },
    }),
    require("./fb-component/union-npc-standby-show-option.js")),
  union_npc_ui_interact_option_js_1 =
    (Object.defineProperty(exports, "UnionNpcStandbyShowOption", {
      enumerable: !0,
      get: function () {
        return union_npc_standby_show_option_js_1.UnionNpcStandbyShowOption;
      },
    }),
    require("./fb-component/union-npc-ui-interact-option.js")),
  union_passerby_npc_move_js_1 =
    (Object.defineProperty(exports, "UnionNpcUiInteractOption", {
      enumerable: !0,
      get: function () {
        return union_npc_ui_interact_option_js_1.UnionNpcUiInteractOption;
      },
    }),
    require("./fb-component/union-passerby-npc-move.js")),
  union_passerby_npc_source_js_1 =
    (Object.defineProperty(exports, "UnionPasserbyNpcMove", {
      enumerable: !0,
      get: function () {
        return union_passerby_npc_move_js_1.UnionPasserbyNpcMove;
      },
    }),
    require("./fb-component/union-passerby-npc-source.js")),
  union_passerby_npc_spawn_js_1 =
    (Object.defineProperty(exports, "UnionPasserbyNpcSource", {
      enumerable: !0,
      get: function () {
        return union_passerby_npc_source_js_1.UnionPasserbyNpcSource;
      },
    }),
    require("./fb-component/union-passerby-npc-spawn.js")),
  union_patrol_cycle_option_js_1 =
    (Object.defineProperty(exports, "UnionPasserbyNpcSpawn", {
      enumerable: !0,
      get: function () {
        return union_passerby_npc_spawn_js_1.UnionPasserbyNpcSpawn;
      },
    }),
    require("./fb-component/union-patrol-cycle-option.js")),
  union_physics_attach_target_js_1 =
    (Object.defineProperty(exports, "UnionPatrolCycleOption", {
      enumerable: !0,
      get: function () {
        return union_patrol_cycle_option_js_1.UnionPatrolCycleOption;
      },
    }),
    require("./fb-component/union-physics-attach-target.js")),
  union_pick_interaction_js_1 =
    (Object.defineProperty(exports, "UnionPhysicsAttachTarget", {
      enumerable: !0,
      get: function () {
        return union_physics_attach_target_js_1.UnionPhysicsAttachTarget;
      },
    }),
    require("./fb-component/union-pick-interaction.js")),
  union_point_group_js_1 =
    (Object.defineProperty(exports, "UnionPickInteraction", {
      enumerable: !0,
      get: function () {
        return union_pick_interaction_js_1.UnionPickInteraction;
      },
    }),
    require("./fb-component/union-point-group.js")),
  union_portal_config_js_1 =
    (Object.defineProperty(exports, "UnionPointGroup", {
      enumerable: !0,
      get: function () {
        return union_point_group_js_1.UnionPointGroup;
      },
    }),
    require("./fb-component/union-portal-config.js")),
  union_portal_view_distance_config_js_1 =
    (Object.defineProperty(exports, "UnionPortalConfig", {
      enumerable: !0,
      get: function () {
        return union_portal_config_js_1.UnionPortalConfig;
      },
    }),
    require("./fb-component/union-portal-view-distance-config.js")),
  union_progress_bar_control_js_1 =
    (Object.defineProperty(exports, "UnionPortalViewDistanceConfig", {
      enumerable: !0,
      get: function () {
        return union_portal_view_distance_config_js_1.UnionPortalViewDistanceConfig;
      },
    }),
    require("./fb-component/union-progress-bar-control.js")),
  union_pulling_foundation_js_1 =
    (Object.defineProperty(exports, "UnionProgressBarControl", {
      enumerable: !0,
      get: function () {
        return union_progress_bar_control_js_1.UnionProgressBarControl;
      },
    }),
    require("./fb-component/union-pulling-foundation.js")),
  union_qte_type_js_1 =
    (Object.defineProperty(exports, "UnionPullingFoundation", {
      enumerable: !0,
      get: function () {
        return union_pulling_foundation_js_1.UnionPullingFoundation;
      },
    }),
    require("./fb-component/union-qte-type.js")),
  union_rebound_option_js_1 =
    (Object.defineProperty(exports, "UnionQteType", {
      enumerable: !0,
      get: function () {
        return union_qte_type_js_1.UnionQteType;
      },
    }),
    require("./fb-component/union-rebound-option.js")),
  union_refresh_content_js_1 =
    (Object.defineProperty(exports, "UnionReboundOption", {
      enumerable: !0,
      get: function () {
        return union_rebound_option_js_1.UnionReboundOption;
      },
    }),
    require("./fb-component/union-refresh-content.js")),
  union_refresh_rule_js_1 =
    (Object.defineProperty(exports, "UnionRefreshContent", {
      enumerable: !0,
      get: function () {
        return union_refresh_content_js_1.UnionRefreshContent;
      },
    }),
    require("./fb-component/union-refresh-rule.js")),
  union_render_specified_range_config_js_1 =
    (Object.defineProperty(exports, "UnionRefreshRule", {
      enumerable: !0,
      get: function () {
        return union_refresh_rule_js_1.UnionRefreshRule;
      },
    }),
    require("./fb-component/union-render-specified-range-config.js")),
  union_scene_item_ai_patrol_type_js_1 =
    (Object.defineProperty(exports, "UnionRenderSpecifiedRangeConfig", {
      enumerable: !0,
      get: function () {
        return union_render_specified_range_config_js_1.UnionRenderSpecifiedRangeConfig;
      },
    }),
    require("./fb-component/union-scene-item-ai-patrol-type.js")),
  union_scene_item_ai_type_js_1 =
    (Object.defineProperty(exports, "UnionSceneItemAiPatrolType", {
      enumerable: !0,
      get: function () {
        return union_scene_item_ai_patrol_type_js_1.UnionSceneItemAiPatrolType;
      },
    }),
    require("./fb-component/union-scene-item-ai-type.js")),
  union_spawn_config_js_1 =
    (Object.defineProperty(exports, "UnionSceneItemAiType", {
      enumerable: !0,
      get: function () {
        return union_scene_item_ai_type_js_1.UnionSceneItemAiType;
      },
    }),
    require("./fb-component/union-spawn-config.js")),
  union_spawn_monster_complete_condition_js_1 =
    (Object.defineProperty(exports, "UnionSpawnConfig", {
      enumerable: !0,
      get: function () {
        return union_spawn_config_js_1.UnionSpawnConfig;
      },
    }),
    require("./fb-component/union-spawn-monster-complete-condition.js")),
  union_spawn_monster_constraint_js_1 =
    (Object.defineProperty(exports, "UnionSpawnMonsterCompleteCondition", {
      enumerable: !0,
      get: function () {
        return union_spawn_monster_complete_condition_js_1.UnionSpawnMonsterCompleteCondition;
      },
    }),
    require("./fb-component/union-spawn-monster-constraint.js")),
  union_spawn_monster_pre_condition_js_1 =
    (Object.defineProperty(exports, "UnionSpawnMonsterConstraint", {
      enumerable: !0,
      get: function () {
        return union_spawn_monster_constraint_js_1.UnionSpawnMonsterConstraint;
      },
    }),
    require("./fb-component/union-spawn-monster-pre-condition.js")),
  union_spawn_monster_start_condition_js_1 =
    (Object.defineProperty(exports, "UnionSpawnMonsterPreCondition", {
      enumerable: !0,
      get: function () {
        return union_spawn_monster_pre_condition_js_1.UnionSpawnMonsterPreCondition;
      },
    }),
    require("./fb-component/union-spawn-monster-start-condition.js")),
  union_special_animal_config_js_1 =
    (Object.defineProperty(exports, "UnionSpawnMonsterStartCondition", {
      enumerable: !0,
      get: function () {
        return union_spawn_monster_start_condition_js_1.UnionSpawnMonsterStartCondition;
      },
    }),
    require("./fb-component/union-special-animal-config.js")),
  union_special_npc_perform_type_js_1 =
    (Object.defineProperty(exports, "UnionSpecialAnimalConfig", {
      enumerable: !0,
      get: function () {
        return union_special_animal_config_js_1.UnionSpecialAnimalConfig;
      },
    }),
    require("./fb-component/union-special-npc-perform-type.js")),
  union_spline_option_js_1 =
    (Object.defineProperty(exports, "UnionSpecialNpcPerformType", {
      enumerable: !0,
      get: function () {
        return union_special_npc_perform_type_js_1.UnionSpecialNpcPerformType;
      },
    }),
    require("./fb-component/union-spline-option.js")),
  union_target_gear_group_failure_condition_js_1 =
    (Object.defineProperty(exports, "UnionSplineOption", {
      enumerable: !0,
      get: function () {
        return union_spline_option_js_1.UnionSplineOption;
      },
    }),
    require("./fb-component/union-target-gear-group-failure-condition.js")),
  union_target_gear_group_success_condition_js_1 =
    (Object.defineProperty(exports, "UnionTargetGearGroupFailureCondition", {
      enumerable: !0,
      get: function () {
        return union_target_gear_group_failure_condition_js_1.UnionTargetGearGroupFailureCondition;
      },
    }),
    require("./fb-component/union-target-gear-group-success-condition.js")),
  union_tele_control_destroy_condition_js_1 =
    (Object.defineProperty(exports, "UnionTargetGearGroupSuccessCondition", {
      enumerable: !0,
      get: function () {
        return union_target_gear_group_success_condition_js_1.UnionTargetGearGroupSuccessCondition;
      },
    }),
    require("./fb-component/union-tele-control-destroy-condition.js")),
  union_throw_motion_js_1 =
    (Object.defineProperty(exports, "UnionTeleControlDestroyCondition", {
      enumerable: !0,
      get: function () {
        return union_tele_control_destroy_condition_js_1.UnionTeleControlDestroyCondition;
      },
    }),
    require("./fb-component/union-throw-motion.js")),
  union_timeline_track_control_config_js_1 =
    (Object.defineProperty(exports, "UnionThrowMotion", {
      enumerable: !0,
      get: function () {
        return union_throw_motion_js_1.UnionThrowMotion;
      },
    }),
    require("./fb-component/union-timeline-track-control-config.js")),
  union_trigger_mode_js_1 =
    (Object.defineProperty(exports, "UnionTimelineTrackControlConfig", {
      enumerable: !0,
      get: function () {
        return union_timeline_track_control_config_js_1.UnionTimelineTrackControlConfig;
      },
    }),
    require("./fb-component/union-trigger-mode.js")),
  union_turntable_controller_js_1 =
    (Object.defineProperty(exports, "UnionTriggerMode", {
      enumerable: !0,
      get: function () {
        return union_trigger_mode_js_1.UnionTriggerMode;
      },
    }),
    require("./fb-component/union-turntable-controller.js")),
  union_vehicle_feature_js_1 =
    (Object.defineProperty(exports, "UnionTurntableController", {
      enumerable: !0,
      get: function () {
        return union_turntable_controller_js_1.UnionTurntableController;
      },
    }),
    require("./fb-component/union-vehicle-feature.js")),
  union_wind_source_js_1 =
    (Object.defineProperty(exports, "UnionVehicleFeature", {
      enumerable: !0,
      get: function () {
        return union_vehicle_feature_js_1.UnionVehicleFeature;
      },
    }),
    require("./fb-component/union-wind-source.js")),
  union_world_level_bonus_js_1 =
    (Object.defineProperty(exports, "UnionWindSource", {
      enumerable: !0,
      get: function () {
        return union_wind_source_js_1.UnionWindSource;
      },
    }),
    require("./fb-component/union-world-level-bonus.js")),
  var_component_js_1 =
    (Object.defineProperty(exports, "UnionWorldLevelBonus", {
      enumerable: !0,
      get: function () {
        return union_world_level_bonus_js_1.UnionWorldLevelBonus;
      },
    }),
    require("./fb-component/var-component.js")),
  vehicle_audio_config_js_1 =
    (Object.defineProperty(exports, "VarComponent", {
      enumerable: !0,
      get: function () {
        return var_component_js_1.VarComponent;
      },
    }),
    require("./fb-component/vehicle-audio-config.js")),
  vehicle_component_js_1 =
    (Object.defineProperty(exports, "VehicleAudioConfig", {
      enumerable: !0,
      get: function () {
        return vehicle_audio_config_js_1.VehicleAudioConfig;
      },
    }),
    require("./fb-component/vehicle-component.js")),
  vehicle_montage_play_config_js_1 =
    (Object.defineProperty(exports, "VehicleComponent", {
      enumerable: !0,
      get: function () {
        return vehicle_component_js_1.VehicleComponent;
      },
    }),
    require("./fb-component/vehicle-montage-play-config.js")),
  vehicle_passenger_config_js_1 =
    (Object.defineProperty(exports, "VehicleMontagePlayConfig", {
      enumerable: !0,
      get: function () {
        return vehicle_montage_play_config_js_1.VehicleMontagePlayConfig;
      },
    }),
    require("./fb-component/vehicle-passenger-config.js")),
  visible_condition_group_js_1 =
    (Object.defineProperty(exports, "VehiclePassengerConfig", {
      enumerable: !0,
      get: function () {
        return vehicle_passenger_config_js_1.VehiclePassengerConfig;
      },
    }),
    require("./fb-component/visible-condition-group.js")),
  vision_capture_component_js_1 =
    (Object.defineProperty(exports, "VisibleConditionGroup", {
      enumerable: !0,
      get: function () {
        return visible_condition_group_js_1.VisibleConditionGroup;
      },
    }),
    require("./fb-component/vision-capture-component.js")),
  vision_component_js_1 =
    (Object.defineProperty(exports, "VisionCaptureComponent", {
      enumerable: !0,
      get: function () {
        return vision_capture_component_js_1.VisionCaptureComponent;
      },
    }),
    require("./fb-component/vision-component.js")),
  vision_item_component_js_1 =
    (Object.defineProperty(exports, "VisionComponent", {
      enumerable: !0,
      get: function () {
        return vision_component_js_1.VisionComponent;
      },
    }),
    require("./fb-component/vision-item-component.js")),
  walking_pattern_component_js_1 =
    (Object.defineProperty(exports, "VisionItemComponent", {
      enumerable: !0,
      get: function () {
        return vision_item_component_js_1.VisionItemComponent;
      },
    }),
    require("./fb-component/walking-pattern-component.js")),
  weapon_component_js_1 =
    (Object.defineProperty(exports, "WalkingPatternComponent", {
      enumerable: !0,
      get: function () {
        return walking_pattern_component_js_1.WalkingPatternComponent;
      },
    }),
    require("./fb-component/weapon-component.js")),
  weapon_damage_js_1 =
    (Object.defineProperty(exports, "WeaponComponent", {
      enumerable: !0,
      get: function () {
        return weapon_component_js_1.WeaponComponent;
      },
    }),
    require("./fb-component/weapon-damage.js")),
  wind_directional_js_1 =
    (Object.defineProperty(exports, "WeaponDamage", {
      enumerable: !0,
      get: function () {
        return weapon_damage_js_1.WeaponDamage;
      },
    }),
    require("./fb-component/wind-directional.js")),
  wind_directional_state_grade_js_1 =
    (Object.defineProperty(exports, "WindDirectional", {
      enumerable: !0,
      get: function () {
        return wind_directional_js_1.WindDirectional;
      },
    }),
    require("./fb-component/wind-directional-state-grade.js")),
  wind_source_component_js_1 =
    (Object.defineProperty(exports, "WindDirectionalStateGrade", {
      enumerable: !0,
      get: function () {
        return wind_directional_state_grade_js_1.WindDirectionalStateGrade;
      },
    }),
    require("./fb-component/wind-source-component.js")),
  world_level_table_js_1 =
    (Object.defineProperty(exports, "WindSourceComponent", {
      enumerable: !0,
      get: function () {
        return wind_source_component_js_1.WindSourceComponent;
      },
    }),
    require("./fb-component/world-level-table.js"));
Object.defineProperty(exports, "WorldLevelTable", {
  enumerable: !0,
  get: function () {
    return world_level_table_js_1.WorldLevelTable;
  },
});
//# sourceMappingURL=fb-component.js.map
