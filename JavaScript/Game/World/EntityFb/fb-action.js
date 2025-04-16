"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AwakeEntity =
    exports.AudioState =
    exports.AppointedVehicle =
    exports.AirPassageMove =
    exports.AdjustTodTime =
    exports.AdjustPlayerCamera =
    exports.AdjustHorizontalCamera =
    exports.AdjustFixedCamera =
    exports.AdjustFirstPersonCamera =
    exports.AdjustDialogCamera =
    exports.AdjustBasicCamera =
    exports.AdjustAxisLockCamera =
    exports.AddTrialFollowShooter =
    exports.AddTrialCharacter =
    exports.AddTime =
    exports.AddPlayBubble =
    exports.AddOrSubAlertValueChangeSpeed =
    exports.AddOrSubAlertValue =
    exports.AddGuestCharacter =
    exports.AddFlowInteractOption =
    exports.AddBuffToTriggeredEntity =
    exports.AddBuffToPlayer =
    exports.AddBuffToFollowShooter =
    exports.AddBuffToEntity =
    exports.ActorTurnToTalkerData =
    exports.ActorTurnToPositionData =
    exports.ActorTurnToPlayerData =
    exports.ActorTurnToEntityData =
    exports.ActorTurnToEmptyData =
    exports.ActorTurnTo =
    exports.ActorLookAtUnLock =
    exports.ActorLookAtTalkerData =
    exports.ActorLookAtPositionData =
    exports.ActorLookAtPlayerData =
    exports.ActorLookAtOtherActor =
    exports.ActorLookAtEntityData =
    exports.ActorLookAtEmptyData =
    exports.ActorLookAtData =
    exports.ActorLookAt =
    exports.ActorInitialState =
    exports.ActorInitialMontage =
    exports.ActiveRange =
    exports.ActiveAntiGravitySafePoint =
    exports.ActivateResetPoint =
    exports.ActionMontage =
    exports.ActionInfo =
    exports.AcceptFishingEntrust =
    exports.AcceptCurrentQuest =
    exports.AccelerateSkiConfig =
    exports.AbsolutePos2 =
      void 0),
  (exports.ChangeTargetEntityPrefabPerformance =
    exports.ChangeState =
    exports.ChangeSelfEntityState =
    exports.ChangeSelfEntityPrefabPerformance =
    exports.ChangeRandomState =
    exports.ChangePhantomFormation =
    exports.ChangePhantom =
    exports.ChangeOtherState =
    exports.ChangeNpcPerformState =
    exports.ChangeLiftTarget =
    exports.ChangeInteractOptionText =
    exports.ChangeFlowTemplate =
    exports.ChangeFightTeam =
    exports.ChangeEntityStateLoop =
    exports.ChangeEntityStateDirectly =
    exports.ChangeEntityStateBatchDirectly =
    exports.ChangeEntityState =
    exports.ChangeEntityPrefabPerformance =
    exports.ChangeEntityCamp =
    exports.ChangeBehaviorState =
    exports.ChangeActorTalker =
    exports.ChangeActorState =
    exports.ChangeActorMaterialData =
    exports.ChangeActorMPC =
    exports.CatapultParam =
    exports.Catapult =
    exports.CaptionParam =
    exports.CameraTransition =
    exports.CameraSetting =
    exports.CameraPosAndRot =
    exports.CameraLookAt =
    exports.CameraGaze =
    exports.CameraDepthOfField =
    exports.CameraData =
    exports.CallFunction =
    exports.CallByCondition =
    exports.CalculateVar =
    exports.BvbSendSystemEvent =
    exports.BubbleIndex =
    exports.BubbleData =
    exports.BrokenRock =
    exports.Bounce =
    exports.BlendFunction =
    exports.BlackCatWarning =
    exports.BeginFlowTemplate =
    exports.BattleSettlement =
    exports.BaseCurve =
    exports.BadBuKingChallengeTip =
    exports.AxisLockScreenConfig =
    exports.AwakeWithTransformVar =
      void 0),
  (exports.CreatePrefab =
    exports.ControlTrackingSelf =
    exports.ControlTrackingOther =
    exports.ConstantCameraShake =
    exports.Conditions =
    exports.Condition =
    exports.CompleteGuide =
    exports.CompleteChildQuest =
    exports.CommonTipTriggerDelegation =
    exports.CommonTipReachChallenge =
    exports.CommonTipPrepareCountdown =
    exports.CommonTipMissionComplete =
    exports.CommonTipId =
    exports.CommonTipGeneralFloatingTip =
    exports.CommonTipFirstComplete =
    exports.CommonTipEnterInRange =
    exports.CommonTipChallengeSuccess =
    exports.CommonTipChallengeFail =
    exports.CommonTipChallengeCondition =
    exports.CommonTip2PrepareCountdown =
    exports.CommonTip2 =
    exports.CommonTip =
    exports.ColorPiece =
    exports.Collect =
    exports.CloseTraceSpline =
    exports.CloseSplineMove =
    exports.CloseSkiConfig =
    exports.CloseGlobalTimeScale =
    exports.CloseFlowTemplate =
    exports.CloseAirWall =
    exports.ClientTpRelativeEntityPos =
    exports.ClientSetPlayerPos =
    exports.ClientPreEnableSubLevels =
    exports.ClearPlayBubble =
    exports.ClearFishingCabinInSaleItems =
    exports.ClearEntityVisibleTag =
    exports.ClaimLevelPlayReward =
    exports.ClaimDungeonReward =
    exports.CipherGameplay =
    exports.CheckClimb =
    exports.CharacterMoveToPoint =
    exports.CharacterLookAtUnlockData =
    exports.CharacterLookAtPositionData =
    exports.CharacterLookAtPlayerData =
    exports.CharacterLookAtEntityData =
    exports.CharacterLookAtEmptyData =
    exports.CharacterLookAt =
    exports.CharacterGroupNew =
    exports.ChangeTimer =
    exports.ChangeTeamPosition =
      void 0),
  (exports.EnableLevelPlay =
    exports.EnableHostility =
    exports.EnableFunction =
    exports.EnableCameraOperation =
    exports.EnableAoiNotify =
    exports.EnableAllPlayerOperation =
    exports.EnableAlertUi =
    exports.EnableAlertArea =
    exports.EnableActor =
    exports.EnableAI =
    exports.EffectPlayerPos2 =
    exports.EffectEntityPos2 =
    exports.EaseData =
    exports.DurationInteract =
    exports.DreamlessWarning =
    exports.DoCalculate =
    exports.DisableUiOperation =
    exports.DisableSkillOperation =
    exports.DisableSectionalSkillOperation =
    exports.DisableSceneInteractionOperation =
    exports.DisableMoveOperation =
    exports.DisableModulePlayerOperation =
    exports.DisableMapMark =
    exports.DisableExploreSkill =
    exports.DisableCameraOperation =
    exports.DisableAllPlayerOperation =
    exports.DisableAlertAreaQuestCondition =
    exports.DisableAlertAreaDungeonCondition =
    exports.DetectTrigger =
    exports.DetectBattleTag =
    exports.DetectBattleMonsterOnGround =
    exports.DestroySelf =
    exports.DestroyQuestItem =
    exports.DestroyQuest =
    exports.DestroyPrefab =
    exports.DestroyFishingBoat =
    exports.DestroyEntity =
    exports.DestroyAllChild =
    exports.Destroy =
    exports.DelayRemoveAfterSkillFinish =
    exports.DaolingAuthentication =
    exports.DangoAbyssReceiveReward =
    exports.DangoAbyssGotoNextFloor =
    exports.DangoAbyssCreateRewardTreasureBox =
    exports.DangoAbyssActivatePortal =
    exports.CycleMoveToPoints =
    exports.CustomJson =
    exports.CustomAlertValueChangeSpeed =
    exports.CustomAlertValue =
    exports.CurrentVehicle =
      void 0),
  (exports.FixTeleControllerPos =
    exports.FixShowTargetRange =
    exports.FixFoundationRelation =
    exports.FishingRoulette =
    exports.FishingBoatVehicle =
    exports.FireBulletTrackTarget =
    exports.FireBulletTrackPosition =
    exports.FireBulletForwardFront =
    exports.FireBulletEffect =
    exports.FireBullet =
    exports.FinishTalk =
    exports.FinishState =
    exports.FinishDungeon =
    exports.FinishDoInteract =
    exports.FinishCondition =
    exports.FailurePoseInteract =
    exports.FadeOutScreen =
    exports.FadeInScreen =
    exports.FaceToPos =
    exports.ExitVehicleTeleport =
    exports.ExitVehicleStandUp =
    exports.ExitVehicleLaunch =
    exports.ExitOrbitalCamera =
    exports.ExitDungeon =
    exports.ExecRiskHarvestEffect =
    exports.ExecResurrection =
    exports.ExecBattleAction =
    exports.ExecAlertSystemAction =
    exports.EntityVarContext =
    exports.EntityTurnTo =
    exports.EntityTemplateContext =
    exports.EntitySplineMoveTarget =
    exports.EntityPos2 =
    exports.EntityLookAt =
    exports.EnterOrbitalCameraControlByMove =
    exports.EnterOrbitalCamera =
    exports.EnterNpcVehicle =
    exports.EndState =
    exports.EndFlowTemplate =
    exports.EnableUiOperation =
    exports.EnableTemporaryTeleport =
    exports.EnableSystem =
    exports.EnableSubLevelTransitionWithSceneCapture =
    exports.EnableSplineMoveModel =
    exports.EnableSkillOperation =
    exports.EnableSectionalUi =
    exports.EnableSceneInteractionOperation =
    exports.EnableNearbyTracking =
    exports.EnableMoveOperation =
    exports.EnableLevelPlayConfig =
      void 0),
  (exports.JigsawConfig =
    exports.ItemGetUiConfigSpecialQuest =
    exports.ItemFoundationMatch =
    exports.ItemData =
    exports.Invoke =
    exports.InterludeActions =
    exports.InteractOption =
    exports.InteractFlow =
    exports.InteractActions =
    exports.Interact =
    exports.ICenterTextTypeWriter =
    exports.ICenterTextShowAll =
    exports.ICenterTextFadeOut =
    exports.HookLockInteract =
    exports.HideWorldMonsterAndMonsterTreasureGroup =
    exports.HideWorldMonsterAndMonsterTreasure =
    exports.HideWorldEntityAndLevelPlayGroup =
    exports.HideWorldEntityAndLevelPlay =
    exports.HideTargetRange =
    exports.HideSpecifyEntityGroup =
    exports.HideSpecificEntities =
    exports.HideMapMark =
    exports.HideHighlightExploreSkillIcon =
    exports.HideGroup =
    exports.HideByRangeInFlow =
    exports.HeadStyleWeakSignal =
    exports.HeadStyleWarning =
    exports.HeadStyleVoiceOnly =
    exports.HeadStyleNormal =
    exports.HeadStyleMonsterDisplay =
    exports.GuideTrigger =
    exports.GuestOperateUiAnimation =
    exports.GravityFlipFixedPos =
    exports.Glide =
    exports.GetUp =
    exports.GetRewardByInteract =
    exports.GetItem =
    exports.GameplayPose3Interact =
    exports.GameplayPose2Interact =
    exports.GameplayPose1Interact =
    exports.ForceOccupations =
    exports.FocusOnMapMark =
    exports.FlowTemplateMode =
    exports.FlowInfo =
    exports.FlowIndex =
    exports.FlowActorUnit =
    exports.FlowActorIndexData =
    exports.FloorSettings =
    exports.FixedTime =
    exports.FixedPos =
      void 0),
  (exports.NpcFollowConfig =
    exports.NotifyMonsterPlayStandbyTags =
    exports.NotifyMonsterPerception =
    exports.NewMoveWithSpline =
    exports.NearestEntity =
    exports.Mp4BackgroundColor =
    exports.MowingTowerGotoNextFloor =
    exports.MovieBackgroundFadeData =
    exports.MoveWithSpline =
    exports.MoveToRelativePosition =
    exports.MoveToPosA =
    exports.MoveToPoint =
    exports.MoveSceneItem =
    exports.MoveJigsawItem =
    exports.MorseCode =
    exports.MontageRegistered =
    exports.MontageParam =
    exports.MontageId =
    exports.MontageData =
    exports.MontageAsset =
    exports.ModifyTargetSceneItemAttributeTag =
    exports.ModifySelfSceneItemAttributeTag =
    exports.ModifySceneItemAttributeTag =
    exports.ModifyAlertValue =
    exports.ModifyActorMaterial =
    exports.MinAlertValue =
    exports.MaxAlertValue =
    exports.MaskTransition =
    exports.ManualOccupations =
    exports.Manipulate =
    exports.Log =
    exports.LockEntity =
    exports.LinearOverRangeCameraShake =
    exports.LimitPlayerUI =
    exports.LimitPlayerOperation =
    exports.LimitPlayerMoveNew =
    exports.LimitPlayerMove =
    exports.LimitPlayerMouse =
    exports.LimitPlayerCamera =
    exports.LimitPlayerBlockAll =
    exports.LimitPlayerAction =
    exports.LifePointMaxStepRewardRuleItem =
    exports.LifePointColorBoard =
    exports.LifePoint =
    exports.LevelPlayVarContext =
    exports.LeisureInteract =
    exports.KiteHookInteract =
    exports.JumpTalk =
    exports.JigsawPiece =
    exports.JigsawItemEntity =
      void 0),
  (exports.PlayerLookAt =
    exports.PlayerInput =
    exports.PlayerEntity =
    exports.PlayVoicePassengersConfig =
    exports.PlaySpineAnimation =
    exports.PlaySequenceData =
    exports.PlayRegisteredMontage =
    exports.PlayMovie =
    exports.PlayMontage =
    exports.PlayLevelSequence =
    exports.PlayGuestUiAnimation =
    exports.PlayGuestCartethyia =
    exports.PlayFlow =
    exports.PlayEffect =
    exports.PlayDynamicSettlement =
    exports.PlayCustomSequence =
    exports.PlayCommonEffect =
    exports.PlayBubble =
    exports.PieceIndex =
    exports.PhotographConfig =
    exports.PerformerRangeBoundaryActionTrigger =
    exports.PerformerAiSplineMove =
    exports.PerformerAiMoveToPosition =
    exports.PerformerAiMoveToPlayer =
    exports.PerformerAiMoveToEntity =
    exports.PerformerAiMoveTo =
    exports.PerceptionNotifyGatherToPlayer =
    exports.PerceptionNotifyGatherToEntity =
    exports.PathLineMove =
    exports.OptionLockTip =
    exports.OpenTraceSpline =
    exports.OpenSystemFunction =
    exports.OpenSystemBoardWithReturn =
    exports.OpenSystemBoard =
    exports.OpenSplineMove =
    exports.OpenSoaringChallengeResultWithReturn =
    exports.OpenSkiConfig =
    exports.OpenSimpleGameplay =
    exports.OpenQteAction =
    exports.OpenPanelQteQte =
    exports.OpenLevelQte =
    exports.OpenGravity =
    exports.OpenGlobalTimeScale =
    exports.OpenFishingItemDeliveryWithReturn =
    exports.OpenConfirmBoxWithReturn =
    exports.OpenAirWall =
    exports.NumberVar =
    exports.NpcSitDown =
    exports.NpcNewSplineMoveTarget =
    exports.NpcLeisureInteract =
      void 0),
  (exports.RestorePlayerCameraAdjustment =
    exports.RestorePhantomFormation =
    exports.RestorePhantom =
    exports.ResetTeleControlEntity =
    exports.ResetPlayerFocusToFixedDirection =
    exports.ResetPlayerFocusToDefaultDirection =
    exports.ResetPlayerCameraFocus =
    exports.ResetLevelPlay =
    exports.ResetFocusConfig =
    exports.ResetEntityPos =
    exports.ResetEntity =
    exports.RenjuChess =
    exports.RemoveTrialFollowShooter =
    exports.RemoveTrialCharacter =
    exports.RemovePreloadResourceTrialCharacter =
    exports.RemovePreloadResourcePhantomCharacter =
    exports.RemovePreloadResourceAction =
    exports.RemoveGuestCharacter =
    exports.RemoveFlowInteractOption =
    exports.RemoveBuffToTriggeredEntity =
    exports.RemoveBuffFromPlayer =
    exports.RemoveBuffFromEntity =
    exports.RemainStarWarning =
    exports.ReduceTime =
    exports.RecoverDurability =
    exports.RecordTimeStampType =
    exports.RecordTalkSequenceTransition =
    exports.RecordDungeonEvent =
    exports.RandomVar =
    exports.RandomPrefabConfig =
    exports.RacingTrackMove =
    exports.QuestVarContext =
    exports.PunishReport =
    exports.PromptQuestChapterUI =
    exports.Prompt =
    exports.PreloadTrialCharacterForSkill =
    exports.PreloadSubLevels =
    exports.PreloadPhantomCharacterForSkill =
    exports.PreloadFlows =
    exports.PreloadAction =
    exports.PrefabConfig =
    exports.PostAkEventTargeted =
    exports.PostAkEventGlobal =
    exports.PostAkEvent =
    exports.PosRot =
    exports.PosAndRot =
    exports.PosA =
    exports.PlayerSplineMoveTarget =
    exports.PlayerPos2 =
    exports.PlayerNewSplineMoveTarget =
      void 0),
  (exports.SetPlotMode =
    exports.SetPlayerPos =
    exports.SetPlayerOperationRestriction =
    exports.SetPlayerMoveControl =
    exports.SetPieceState =
    exports.SetNumberVar =
    exports.SetMoveSpeed =
    exports.SetMonsterMoveTarget =
    exports.SetJigsawItem =
    exports.SetJigsawFoundation =
    exports.SetInteractionLockState =
    exports.SetHeadIconVisible =
    exports.SetGlobalTimeScale =
    exports.SetForceLock =
    exports.SetFlowTemplate =
    exports.SetExploreState =
    exports.SetEntityVisible =
    exports.SetEntityTag =
    exports.SetEntityPos =
    exports.SetEntityClientVisibleSave =
    exports.SetEntityClientVisible =
    exports.SetCameraMode =
    exports.SetCameraAnim =
    exports.SetBehaviorIsPaused =
    exports.SetBattleTags =
    exports.SetBattleTagConfig =
    exports.SetBattleTag =
    exports.SetBattleState =
    exports.SetAudioState =
    exports.SetAreaTimeUnLock =
    exports.SetAreaTimeState =
    exports.SetAreaTimeLock =
    exports.SetAreaState =
    exports.SetAlertUiVisible =
    exports.ServerSetPlayerPos =
    exports.ServerForceEnableLevelPlay =
    exports.SequenceFrameEvent =
    exports.SendNpcMail =
    exports.SendAiEvent =
    exports.SelfEntity =
    exports.SceneItemNewSplineMoveTarget =
    exports.SafePos =
    exports.RunActions =
    exports.RotatorEntity =
    exports.RogueSelectRoom =
    exports.RogueRoleSelectRoom =
    exports.RogueReceiveReward =
    exports.RoguePrefabConfig =
    exports.RogueGotoNextFloor =
    exports.RogueActivatePortal =
      void 0),
  (exports.StateInfo =
    exports.StartFlowTemplate =
    exports.StandControl2 =
    exports.StandControl =
    exports.SpawnEntity =
    exports.SpawnChild =
    exports.SoaringChallengeSettlement =
    exports.Soar =
    exports.SlideTrackMove =
    exports.SlideRailStart =
    exports.SlideConfig =
    exports.SlashTowerPrefabConfig =
    exports.SlashAndTowerTip =
    exports.SlashAndTowerGotoNextFloor =
    exports.SkillBlackboardVector =
    exports.SkiConfig =
    exports.SitOnGround =
    exports.SitDown =
    exports.SimpleMove =
    exports.SignalDevice2 =
    exports.SignalDevice =
    exports.SignalBreakGameplay =
    exports.ShowTargetRange =
    exports.ShowTalkOutline =
    exports.ShowTalkFrameEventPosition =
    exports.ShowTalkFrameEvent =
    exports.ShowTalk =
    exports.ShowSpecificEntities =
    exports.ShowMessage =
    exports.ShowMapMark =
    exports.ShowHighlightExploreSkillIcon =
    exports.ShowHidedGroup =
    exports.ShowCenterText =
    exports.SetupMoraleSystem =
    exports.SettlementDungeon =
    exports.SetWuYinQuState =
    exports.SetWeatherLockState =
    exports.SetWeather =
    exports.SetVar =
    exports.SetTimeScale =
    exports.SetTimeLockState =
    exports.SetTime =
    exports.SetTeleControl =
    exports.SetSportsState =
    exports.SetSpineAnimation =
    exports.SetReviveRegion =
    exports.SetResetPosition =
    exports.SetRegionMpc =
    exports.SetRegionConfig =
    exports.SetPosA =
      void 0),
  (exports.TeleportTransitionWithFadeInScreen =
    exports.TeleportTransitionWithEffect =
    exports.TeleportTransitionWithCharacterDisplay =
    exports.TeleportTransitionWithCenterText =
    exports.TeleportTransitionInSeamlessType =
    exports.TeleportTransitionInDigitalScreen =
    exports.TeleportToLatestResetPointDirectly =
    exports.TeleportToLatestResetPoint =
    exports.TeleportToAndEnterVehicle =
    exports.TeleportToAndEnterFishingBoat =
    exports.TeleportDungeonPos =
    exports.TeleportDungeonFunction =
    exports.TeleportDungeon =
    exports.TelePortAfterTimeOut =
    exports.TeleControlConfig =
    exports.TargetEntity =
    exports.TalkSequenceTransition =
    exports.TalkOptionRogueRandomEvent =
    exports.TalkOptionQteSucceedDelayExec =
    exports.TalkOptionQteSucceed =
    exports.TalkOptionQteFailedDelayExec =
    exports.TalkOptionQteFailed =
    exports.TalkOptionPreOption =
    exports.TalkOptionCondition =
    exports.TalkOption =
    exports.TalkItem =
    exports.TalkBackgroundSpineImage =
    exports.TalkBackgroundImageByMcGender =
    exports.TalkBackgroundImage =
    exports.TalkBackgroundIcon =
    exports.TalkBackgroundClean =
    exports.TakePlotPhoto =
    exports.SyncVarToActorState =
    exports.SwitchSubLevelsDirectly =
    exports.SwitchSubLevels =
    exports.SwitchPermission =
    exports.SwitchDataLayers =
    exports.SuperCatapult =
    exports.SundialPuzzleGameplay =
    exports.SummonVehicle =
    exports.SummonEntity =
    exports.StopSceneItemMove =
    exports.StopNewMoveWithSplineAtTargetPoint =
    exports.StopNewMoveWithSplineAtStartPoint =
    exports.StopNewMoveWithSplineAtEndPoint =
    exports.StopNewMoveWithSplineAtCurrentPos =
    exports.StopNewMoveWithSpline =
    exports.StopGuestUiAnimation =
    exports.StopGuestCartethyia =
    exports.StopCameraLookAt =
      void 0),
  (exports.UnionExitVehicleType =
    exports.UnionExecBattleOption =
    exports.UnionEnterOrbitalCameraOption =
    exports.UnionEnableSubLevelTransition =
    exports.UnionEffectPos2 =
    exports.UnionDynamicSettlementConfig =
    exports.UnionDungeonEventType =
    exports.UnionDisableAlertCondition =
    exports.UnionDetectBattleTagType =
    exports.UnionDetectBattleConditionType =
    exports.UnionDelayRemoveConfig =
    exports.UnionControlTrackingType =
    exports.UnionCommonTipOption =
    exports.UnionCommonTip2Option =
    exports.UnionClientTeleportConfig =
    exports.UnionCharacterLookAtData =
    exports.UnionChangeTimer =
    exports.UnionChangeEntityState =
    exports.UnionChangeEntityPrefabPerformance =
    exports.UnionCenterTextShowAnim =
    exports.UnionCameraShakeConfig =
    exports.UnionCameraOperation =
    exports.UnionBattleStatePerceptionBehavior =
    exports.UnionAwakePosOption =
    exports.UnionAlertValueChangeSpeed =
    exports.UnionAlertSystemOption =
    exports.UnionAdjustPlayerCameraOption =
    exports.UnionActorTurnToData =
    exports.UnionActorLookAtData =
    exports.UnionActionParams1 =
    exports.UnionActionParams0 =
    exports.UniformMotion =
    exports.UnLockDangoCollectSystemItem =
    exports.UnLockCookSystemItem =
    exports.UnLimitPlayerOperation =
    exports.TypeFunction =
    exports.TriggeredEntity =
    exports.TriggerCameraShake =
    exports.TriggerActions =
    exports.Transform =
    exports.TraceSpline =
    exports.TowerDungeonPrefabConfig =
    exports.ToggleTimerPauseState =
    exports.ToggleScanSplineEffect =
    exports.ToggleMapMarkState =
    exports.ToggleHighlightExploreUi =
    exports.ToggleAirWall =
    exports.TextStyle =
    exports.TeleportVehicle =
    exports.TeleportTransitionWithMp4 =
      void 0),
  (exports.UnionStopGuestUiAnimationType =
    exports.UnionStateOption =
    exports.UnionSportState =
    exports.UnionSplineMoveTarget =
    exports.UnionSplineMovePattern =
    exports.UnionSplineMoveModel =
    exports.UnionSkillOperation =
    exports.UnionSkiConfig =
    exports.UnionSetTimeScale =
    exports.UnionSetTeleControlConfig =
    exports.UnionSetSpineAnimation =
    exports.UnionSetPlayerOperationRestriction =
    exports.UnionSetJigsawItem =
    exports.UnionSetJigsawFoundation =
    exports.UnionSetGlobalTimeScale =
    exports.UnionSetAreaTimeType =
    exports.UnionSetAlertValueType =
    exports.UnionSceneInteractionOperation =
    exports.UnionRogueSelectRoom =
    exports.UnionResetPlayerFocusType =
    exports.UnionResetEntityConfig =
    exports.UnionRemovePreloadResourceConfig =
    exports.UnionPreloadObjectTypeConfig =
    exports.UnionPrefabConfig =
    exports.UnionPostAkEvent =
    exports.UnionPos2 =
    exports.UnionPlayGuestUiAnimationType =
    exports.UnionPerformerAiMoveToConfig =
    exports.UnionOpenSystemBoardWithReturn =
    exports.UnionOpenQteConfig =
    exports.UnionNpcLeisureInteractOp =
    exports.UnionNewSplineMoveTarget =
    exports.UnionMoveToPointType =
    exports.UnionMoveSceneItem =
    exports.UnionMoveOperation =
    exports.UnionMontageConfig =
    exports.UnionModifySceneItemAttributeTag =
    exports.UnionModifyActorMaterialType =
    exports.UnionLimitPlayOperation =
    exports.UnionLevelSequenceTransition =
    exports.UnionLeisureInteractOption =
    exports.UnionItemGetUiConfig =
    exports.UnionInteractOption =
    exports.UnionHighlightExploreSkillIcon =
    exports.UnionHideRangeConfig =
    exports.UnionHideGroupConfig =
    exports.UnionHeadStyle =
    exports.UnionGuestOperateUiAnimation =
    exports.UnionFireBullet =
    exports.UnionExploreState =
      void 0),
  (exports.VehicleNewSplineMoveTarget =
    exports.VehicleMoveWithPathLine =
    exports.VehicleExitPlayer =
    exports.VehicleExitPathMove =
    exports.VehicleExitNpc =
    exports.VehicleEntity =
    exports.VehicleEnteringPlayerTarget =
    exports.VehicleEnteringNpcTarget =
    exports.VehicleEnterPathMove =
    exports.VehicleEnter =
    exports.VehicleCruisingParams =
    exports.VariableMotion =
    exports.UsePhantomSkill =
    exports.UnlockTeleportTrigger =
    exports.UnlockSystemItem =
    exports.UnlockPlotPhotoAtlas =
    exports.UnlockPhotoMemoryCollectSystemItem =
    exports.UnlockNounAtlas =
    exports.UnlockGeographicalAtlas =
    exports.UnlockEntity =
    exports.UnlockDungeonEntry =
    exports.UnlockCookSystemCookBook =
    exports.UnlockAtlasSystemItem =
    exports.UnlockAchievementSystemItem =
    exports.UniversalTone =
    exports.UnionVehicleEnteringTarget =
    exports.UnionVehicleControlType =
    exports.UnionVarContext =
    exports.UnionVar =
    exports.UnionUnlockSystemOption =
    exports.UnionUnlockCookSystemOption =
    exports.UnionUnlockAtlasSystemOption =
    exports.UnionUiOperation =
    exports.UnionUiGame =
    exports.UnionToggleScanSplineEffect =
    exports.UnionToggleMapMarkState =
    exports.UnionToggleAirWall =
    exports.UnionTeleportTransitionOption =
    exports.UnionTeleportToLatestResetPointOption =
    exports.UnionTeleportToAndEnterVehicleType =
    exports.UnionTeleportConfig =
    exports.UnionTeammateTeleportConfig =
    exports.UnionTargetVehicle =
    exports.UnionTargetEntity =
    exports.UnionTalkOptionPreCondition =
    exports.UnionTalkOptionParam =
    exports.UnionTalkBackground =
    exports.UnionSwitchSubLevels =
    exports.UnionSummonEntityType =
    exports.UnionStopNewMoveWithSplineType =
      void 0),
  (exports.WhiteCatWarning =
    exports.WaitBattleCondition =
    exports.Wait =
    exports.VehicleWaterfallClimbing =
    exports.VehicleWaterfallClimbGravityConfig =
    exports.VehicleSprint =
    exports.VehiclePlayPassengerVoice =
      void 0);
var absolute_pos2_js_1 = require("./fb-action/absolute-pos2.js"),
  accelerate_ski_config_js_1 =
    (Object.defineProperty(exports, "AbsolutePos2", {
      enumerable: !0,
      get: function () {
        return absolute_pos2_js_1.AbsolutePos2;
      },
    }),
    require("./fb-action/accelerate-ski-config.js")),
  accept_current_quest_js_1 =
    (Object.defineProperty(exports, "AccelerateSkiConfig", {
      enumerable: !0,
      get: function () {
        return accelerate_ski_config_js_1.AccelerateSkiConfig;
      },
    }),
    require("./fb-action/accept-current-quest.js")),
  accept_fishing_entrust_js_1 =
    (Object.defineProperty(exports, "AcceptCurrentQuest", {
      enumerable: !0,
      get: function () {
        return accept_current_quest_js_1.AcceptCurrentQuest;
      },
    }),
    require("./fb-action/accept-fishing-entrust.js")),
  action_info_js_1 =
    (Object.defineProperty(exports, "AcceptFishingEntrust", {
      enumerable: !0,
      get: function () {
        return accept_fishing_entrust_js_1.AcceptFishingEntrust;
      },
    }),
    require("./fb-action/action-info.js")),
  action_montage_js_1 =
    (Object.defineProperty(exports, "ActionInfo", {
      enumerable: !0,
      get: function () {
        return action_info_js_1.ActionInfo;
      },
    }),
    require("./fb-action/action-montage.js")),
  activate_reset_point_js_1 =
    (Object.defineProperty(exports, "ActionMontage", {
      enumerable: !0,
      get: function () {
        return action_montage_js_1.ActionMontage;
      },
    }),
    require("./fb-action/activate-reset-point.js")),
  active_anti_gravity_safe_point_js_1 =
    (Object.defineProperty(exports, "ActivateResetPoint", {
      enumerable: !0,
      get: function () {
        return activate_reset_point_js_1.ActivateResetPoint;
      },
    }),
    require("./fb-action/active-anti-gravity-safe-point.js")),
  active_range_js_1 =
    (Object.defineProperty(exports, "ActiveAntiGravitySafePoint", {
      enumerable: !0,
      get: function () {
        return active_anti_gravity_safe_point_js_1.ActiveAntiGravitySafePoint;
      },
    }),
    require("./fb-action/active-range.js")),
  actor_initial_montage_js_1 =
    (Object.defineProperty(exports, "ActiveRange", {
      enumerable: !0,
      get: function () {
        return active_range_js_1.ActiveRange;
      },
    }),
    require("./fb-action/actor-initial-montage.js")),
  actor_initial_state_js_1 =
    (Object.defineProperty(exports, "ActorInitialMontage", {
      enumerable: !0,
      get: function () {
        return actor_initial_montage_js_1.ActorInitialMontage;
      },
    }),
    require("./fb-action/actor-initial-state.js")),
  actor_look_at_js_1 =
    (Object.defineProperty(exports, "ActorInitialState", {
      enumerable: !0,
      get: function () {
        return actor_initial_state_js_1.ActorInitialState;
      },
    }),
    require("./fb-action/actor-look-at.js")),
  actor_look_at_data_js_1 =
    (Object.defineProperty(exports, "ActorLookAt", {
      enumerable: !0,
      get: function () {
        return actor_look_at_js_1.ActorLookAt;
      },
    }),
    require("./fb-action/actor-look-at-data.js")),
  actor_look_at_empty_data_js_1 =
    (Object.defineProperty(exports, "ActorLookAtData", {
      enumerable: !0,
      get: function () {
        return actor_look_at_data_js_1.ActorLookAtData;
      },
    }),
    require("./fb-action/actor-look-at-empty-data.js")),
  actor_look_at_entity_data_js_1 =
    (Object.defineProperty(exports, "ActorLookAtEmptyData", {
      enumerable: !0,
      get: function () {
        return actor_look_at_empty_data_js_1.ActorLookAtEmptyData;
      },
    }),
    require("./fb-action/actor-look-at-entity-data.js")),
  actor_look_at_other_actor_js_1 =
    (Object.defineProperty(exports, "ActorLookAtEntityData", {
      enumerable: !0,
      get: function () {
        return actor_look_at_entity_data_js_1.ActorLookAtEntityData;
      },
    }),
    require("./fb-action/actor-look-at-other-actor.js")),
  actor_look_at_player_data_js_1 =
    (Object.defineProperty(exports, "ActorLookAtOtherActor", {
      enumerable: !0,
      get: function () {
        return actor_look_at_other_actor_js_1.ActorLookAtOtherActor;
      },
    }),
    require("./fb-action/actor-look-at-player-data.js")),
  actor_look_at_position_data_js_1 =
    (Object.defineProperty(exports, "ActorLookAtPlayerData", {
      enumerable: !0,
      get: function () {
        return actor_look_at_player_data_js_1.ActorLookAtPlayerData;
      },
    }),
    require("./fb-action/actor-look-at-position-data.js")),
  actor_look_at_talker_data_js_1 =
    (Object.defineProperty(exports, "ActorLookAtPositionData", {
      enumerable: !0,
      get: function () {
        return actor_look_at_position_data_js_1.ActorLookAtPositionData;
      },
    }),
    require("./fb-action/actor-look-at-talker-data.js")),
  actor_look_at_un_lock_js_1 =
    (Object.defineProperty(exports, "ActorLookAtTalkerData", {
      enumerable: !0,
      get: function () {
        return actor_look_at_talker_data_js_1.ActorLookAtTalkerData;
      },
    }),
    require("./fb-action/actor-look-at-un-lock.js")),
  actor_turn_to_js_1 =
    (Object.defineProperty(exports, "ActorLookAtUnLock", {
      enumerable: !0,
      get: function () {
        return actor_look_at_un_lock_js_1.ActorLookAtUnLock;
      },
    }),
    require("./fb-action/actor-turn-to.js")),
  actor_turn_to_empty_data_js_1 =
    (Object.defineProperty(exports, "ActorTurnTo", {
      enumerable: !0,
      get: function () {
        return actor_turn_to_js_1.ActorTurnTo;
      },
    }),
    require("./fb-action/actor-turn-to-empty-data.js")),
  actor_turn_to_entity_data_js_1 =
    (Object.defineProperty(exports, "ActorTurnToEmptyData", {
      enumerable: !0,
      get: function () {
        return actor_turn_to_empty_data_js_1.ActorTurnToEmptyData;
      },
    }),
    require("./fb-action/actor-turn-to-entity-data.js")),
  actor_turn_to_player_data_js_1 =
    (Object.defineProperty(exports, "ActorTurnToEntityData", {
      enumerable: !0,
      get: function () {
        return actor_turn_to_entity_data_js_1.ActorTurnToEntityData;
      },
    }),
    require("./fb-action/actor-turn-to-player-data.js")),
  actor_turn_to_position_data_js_1 =
    (Object.defineProperty(exports, "ActorTurnToPlayerData", {
      enumerable: !0,
      get: function () {
        return actor_turn_to_player_data_js_1.ActorTurnToPlayerData;
      },
    }),
    require("./fb-action/actor-turn-to-position-data.js")),
  actor_turn_to_talker_data_js_1 =
    (Object.defineProperty(exports, "ActorTurnToPositionData", {
      enumerable: !0,
      get: function () {
        return actor_turn_to_position_data_js_1.ActorTurnToPositionData;
      },
    }),
    require("./fb-action/actor-turn-to-talker-data.js")),
  add_buff_to_entity_js_1 =
    (Object.defineProperty(exports, "ActorTurnToTalkerData", {
      enumerable: !0,
      get: function () {
        return actor_turn_to_talker_data_js_1.ActorTurnToTalkerData;
      },
    }),
    require("./fb-action/add-buff-to-entity.js")),
  add_buff_to_follow_shooter_js_1 =
    (Object.defineProperty(exports, "AddBuffToEntity", {
      enumerable: !0,
      get: function () {
        return add_buff_to_entity_js_1.AddBuffToEntity;
      },
    }),
    require("./fb-action/add-buff-to-follow-shooter.js")),
  add_buff_to_player_js_1 =
    (Object.defineProperty(exports, "AddBuffToFollowShooter", {
      enumerable: !0,
      get: function () {
        return add_buff_to_follow_shooter_js_1.AddBuffToFollowShooter;
      },
    }),
    require("./fb-action/add-buff-to-player.js")),
  add_buff_to_triggered_entity_js_1 =
    (Object.defineProperty(exports, "AddBuffToPlayer", {
      enumerable: !0,
      get: function () {
        return add_buff_to_player_js_1.AddBuffToPlayer;
      },
    }),
    require("./fb-action/add-buff-to-triggered-entity.js")),
  add_flow_interact_option_js_1 =
    (Object.defineProperty(exports, "AddBuffToTriggeredEntity", {
      enumerable: !0,
      get: function () {
        return add_buff_to_triggered_entity_js_1.AddBuffToTriggeredEntity;
      },
    }),
    require("./fb-action/add-flow-interact-option.js")),
  add_guest_character_js_1 =
    (Object.defineProperty(exports, "AddFlowInteractOption", {
      enumerable: !0,
      get: function () {
        return add_flow_interact_option_js_1.AddFlowInteractOption;
      },
    }),
    require("./fb-action/add-guest-character.js")),
  add_or_sub_alert_value_js_1 =
    (Object.defineProperty(exports, "AddGuestCharacter", {
      enumerable: !0,
      get: function () {
        return add_guest_character_js_1.AddGuestCharacter;
      },
    }),
    require("./fb-action/add-or-sub-alert-value.js")),
  add_or_sub_alert_value_change_speed_js_1 =
    (Object.defineProperty(exports, "AddOrSubAlertValue", {
      enumerable: !0,
      get: function () {
        return add_or_sub_alert_value_js_1.AddOrSubAlertValue;
      },
    }),
    require("./fb-action/add-or-sub-alert-value-change-speed.js")),
  add_play_bubble_js_1 =
    (Object.defineProperty(exports, "AddOrSubAlertValueChangeSpeed", {
      enumerable: !0,
      get: function () {
        return add_or_sub_alert_value_change_speed_js_1.AddOrSubAlertValueChangeSpeed;
      },
    }),
    require("./fb-action/add-play-bubble.js")),
  add_time_js_1 =
    (Object.defineProperty(exports, "AddPlayBubble", {
      enumerable: !0,
      get: function () {
        return add_play_bubble_js_1.AddPlayBubble;
      },
    }),
    require("./fb-action/add-time.js")),
  add_trial_character_js_1 =
    (Object.defineProperty(exports, "AddTime", {
      enumerable: !0,
      get: function () {
        return add_time_js_1.AddTime;
      },
    }),
    require("./fb-action/add-trial-character.js")),
  add_trial_follow_shooter_js_1 =
    (Object.defineProperty(exports, "AddTrialCharacter", {
      enumerable: !0,
      get: function () {
        return add_trial_character_js_1.AddTrialCharacter;
      },
    }),
    require("./fb-action/add-trial-follow-shooter.js")),
  adjust_axis_lock_camera_js_1 =
    (Object.defineProperty(exports, "AddTrialFollowShooter", {
      enumerable: !0,
      get: function () {
        return add_trial_follow_shooter_js_1.AddTrialFollowShooter;
      },
    }),
    require("./fb-action/adjust-axis-lock-camera.js")),
  adjust_basic_camera_js_1 =
    (Object.defineProperty(exports, "AdjustAxisLockCamera", {
      enumerable: !0,
      get: function () {
        return adjust_axis_lock_camera_js_1.AdjustAxisLockCamera;
      },
    }),
    require("./fb-action/adjust-basic-camera.js")),
  adjust_dialog_camera_js_1 =
    (Object.defineProperty(exports, "AdjustBasicCamera", {
      enumerable: !0,
      get: function () {
        return adjust_basic_camera_js_1.AdjustBasicCamera;
      },
    }),
    require("./fb-action/adjust-dialog-camera.js")),
  adjust_first_person_camera_js_1 =
    (Object.defineProperty(exports, "AdjustDialogCamera", {
      enumerable: !0,
      get: function () {
        return adjust_dialog_camera_js_1.AdjustDialogCamera;
      },
    }),
    require("./fb-action/adjust-first-person-camera.js")),
  adjust_fixed_camera_js_1 =
    (Object.defineProperty(exports, "AdjustFirstPersonCamera", {
      enumerable: !0,
      get: function () {
        return adjust_first_person_camera_js_1.AdjustFirstPersonCamera;
      },
    }),
    require("./fb-action/adjust-fixed-camera.js")),
  adjust_horizontal_camera_js_1 =
    (Object.defineProperty(exports, "AdjustFixedCamera", {
      enumerable: !0,
      get: function () {
        return adjust_fixed_camera_js_1.AdjustFixedCamera;
      },
    }),
    require("./fb-action/adjust-horizontal-camera.js")),
  adjust_player_camera_js_1 =
    (Object.defineProperty(exports, "AdjustHorizontalCamera", {
      enumerable: !0,
      get: function () {
        return adjust_horizontal_camera_js_1.AdjustHorizontalCamera;
      },
    }),
    require("./fb-action/adjust-player-camera.js")),
  adjust_tod_time_js_1 =
    (Object.defineProperty(exports, "AdjustPlayerCamera", {
      enumerable: !0,
      get: function () {
        return adjust_player_camera_js_1.AdjustPlayerCamera;
      },
    }),
    require("./fb-action/adjust-tod-time.js")),
  air_passage_move_js_1 =
    (Object.defineProperty(exports, "AdjustTodTime", {
      enumerable: !0,
      get: function () {
        return adjust_tod_time_js_1.AdjustTodTime;
      },
    }),
    require("./fb-action/air-passage-move.js")),
  appointed_vehicle_js_1 =
    (Object.defineProperty(exports, "AirPassageMove", {
      enumerable: !0,
      get: function () {
        return air_passage_move_js_1.AirPassageMove;
      },
    }),
    require("./fb-action/appointed-vehicle.js")),
  audio_state_js_1 =
    (Object.defineProperty(exports, "AppointedVehicle", {
      enumerable: !0,
      get: function () {
        return appointed_vehicle_js_1.AppointedVehicle;
      },
    }),
    require("./fb-action/audio-state.js")),
  awake_entity_js_1 =
    (Object.defineProperty(exports, "AudioState", {
      enumerable: !0,
      get: function () {
        return audio_state_js_1.AudioState;
      },
    }),
    require("./fb-action/awake-entity.js")),
  awake_with_transform_var_js_1 =
    (Object.defineProperty(exports, "AwakeEntity", {
      enumerable: !0,
      get: function () {
        return awake_entity_js_1.AwakeEntity;
      },
    }),
    require("./fb-action/awake-with-transform-var.js")),
  axis_lock_screen_config_js_1 =
    (Object.defineProperty(exports, "AwakeWithTransformVar", {
      enumerable: !0,
      get: function () {
        return awake_with_transform_var_js_1.AwakeWithTransformVar;
      },
    }),
    require("./fb-action/axis-lock-screen-config.js")),
  bad_bu_king_challenge_tip_js_1 =
    (Object.defineProperty(exports, "AxisLockScreenConfig", {
      enumerable: !0,
      get: function () {
        return axis_lock_screen_config_js_1.AxisLockScreenConfig;
      },
    }),
    require("./fb-action/bad-bu-king-challenge-tip.js")),
  base_curve_js_1 =
    (Object.defineProperty(exports, "BadBuKingChallengeTip", {
      enumerable: !0,
      get: function () {
        return bad_bu_king_challenge_tip_js_1.BadBuKingChallengeTip;
      },
    }),
    require("./fb-action/base-curve.js")),
  battle_settlement_js_1 =
    (Object.defineProperty(exports, "BaseCurve", {
      enumerable: !0,
      get: function () {
        return base_curve_js_1.BaseCurve;
      },
    }),
    require("./fb-action/battle-settlement.js")),
  begin_flow_template_js_1 =
    (Object.defineProperty(exports, "BattleSettlement", {
      enumerable: !0,
      get: function () {
        return battle_settlement_js_1.BattleSettlement;
      },
    }),
    require("./fb-action/begin-flow-template.js")),
  black_cat_warning_js_1 =
    (Object.defineProperty(exports, "BeginFlowTemplate", {
      enumerable: !0,
      get: function () {
        return begin_flow_template_js_1.BeginFlowTemplate;
      },
    }),
    require("./fb-action/black-cat-warning.js")),
  blend_function_js_1 =
    (Object.defineProperty(exports, "BlackCatWarning", {
      enumerable: !0,
      get: function () {
        return black_cat_warning_js_1.BlackCatWarning;
      },
    }),
    require("./fb-action/blend-function.js")),
  bounce_js_1 =
    (Object.defineProperty(exports, "BlendFunction", {
      enumerable: !0,
      get: function () {
        return blend_function_js_1.BlendFunction;
      },
    }),
    require("./fb-action/bounce.js")),
  broken_rock_js_1 =
    (Object.defineProperty(exports, "Bounce", {
      enumerable: !0,
      get: function () {
        return bounce_js_1.Bounce;
      },
    }),
    require("./fb-action/broken-rock.js")),
  bubble_data_js_1 =
    (Object.defineProperty(exports, "BrokenRock", {
      enumerable: !0,
      get: function () {
        return broken_rock_js_1.BrokenRock;
      },
    }),
    require("./fb-action/bubble-data.js")),
  bubble_index_js_1 =
    (Object.defineProperty(exports, "BubbleData", {
      enumerable: !0,
      get: function () {
        return bubble_data_js_1.BubbleData;
      },
    }),
    require("./fb-action/bubble-index.js")),
  bvb_send_system_event_js_1 =
    (Object.defineProperty(exports, "BubbleIndex", {
      enumerable: !0,
      get: function () {
        return bubble_index_js_1.BubbleIndex;
      },
    }),
    require("./fb-action/bvb-send-system-event.js")),
  calculate_var_js_1 =
    (Object.defineProperty(exports, "BvbSendSystemEvent", {
      enumerable: !0,
      get: function () {
        return bvb_send_system_event_js_1.BvbSendSystemEvent;
      },
    }),
    require("./fb-action/calculate-var.js")),
  call_by_condition_js_1 =
    (Object.defineProperty(exports, "CalculateVar", {
      enumerable: !0,
      get: function () {
        return calculate_var_js_1.CalculateVar;
      },
    }),
    require("./fb-action/call-by-condition.js")),
  call_function_js_1 =
    (Object.defineProperty(exports, "CallByCondition", {
      enumerable: !0,
      get: function () {
        return call_by_condition_js_1.CallByCondition;
      },
    }),
    require("./fb-action/call-function.js")),
  camera_data_js_1 =
    (Object.defineProperty(exports, "CallFunction", {
      enumerable: !0,
      get: function () {
        return call_function_js_1.CallFunction;
      },
    }),
    require("./fb-action/camera-data.js")),
  camera_depth_of_field_js_1 =
    (Object.defineProperty(exports, "CameraData", {
      enumerable: !0,
      get: function () {
        return camera_data_js_1.CameraData;
      },
    }),
    require("./fb-action/camera-depth-of-field.js")),
  camera_gaze_js_1 =
    (Object.defineProperty(exports, "CameraDepthOfField", {
      enumerable: !0,
      get: function () {
        return camera_depth_of_field_js_1.CameraDepthOfField;
      },
    }),
    require("./fb-action/camera-gaze.js")),
  camera_look_at_js_1 =
    (Object.defineProperty(exports, "CameraGaze", {
      enumerable: !0,
      get: function () {
        return camera_gaze_js_1.CameraGaze;
      },
    }),
    require("./fb-action/camera-look-at.js")),
  camera_pos_and_rot_js_1 =
    (Object.defineProperty(exports, "CameraLookAt", {
      enumerable: !0,
      get: function () {
        return camera_look_at_js_1.CameraLookAt;
      },
    }),
    require("./fb-action/camera-pos-and-rot.js")),
  camera_setting_js_1 =
    (Object.defineProperty(exports, "CameraPosAndRot", {
      enumerable: !0,
      get: function () {
        return camera_pos_and_rot_js_1.CameraPosAndRot;
      },
    }),
    require("./fb-action/camera-setting.js")),
  camera_transition_js_1 =
    (Object.defineProperty(exports, "CameraSetting", {
      enumerable: !0,
      get: function () {
        return camera_setting_js_1.CameraSetting;
      },
    }),
    require("./fb-action/camera-transition.js")),
  caption_param_js_1 =
    (Object.defineProperty(exports, "CameraTransition", {
      enumerable: !0,
      get: function () {
        return camera_transition_js_1.CameraTransition;
      },
    }),
    require("./fb-action/caption-param.js")),
  catapult_js_1 =
    (Object.defineProperty(exports, "CaptionParam", {
      enumerable: !0,
      get: function () {
        return caption_param_js_1.CaptionParam;
      },
    }),
    require("./fb-action/catapult.js")),
  catapult_param_js_1 =
    (Object.defineProperty(exports, "Catapult", {
      enumerable: !0,
      get: function () {
        return catapult_js_1.Catapult;
      },
    }),
    require("./fb-action/catapult-param.js")),
  change_actor_mpc_js_1 =
    (Object.defineProperty(exports, "CatapultParam", {
      enumerable: !0,
      get: function () {
        return catapult_param_js_1.CatapultParam;
      },
    }),
    require("./fb-action/change-actor-mpc.js")),
  change_actor_material_data_js_1 =
    (Object.defineProperty(exports, "ChangeActorMPC", {
      enumerable: !0,
      get: function () {
        return change_actor_mpc_js_1.ChangeActorMPC;
      },
    }),
    require("./fb-action/change-actor-material-data.js")),
  change_actor_state_js_1 =
    (Object.defineProperty(exports, "ChangeActorMaterialData", {
      enumerable: !0,
      get: function () {
        return change_actor_material_data_js_1.ChangeActorMaterialData;
      },
    }),
    require("./fb-action/change-actor-state.js")),
  change_actor_talker_js_1 =
    (Object.defineProperty(exports, "ChangeActorState", {
      enumerable: !0,
      get: function () {
        return change_actor_state_js_1.ChangeActorState;
      },
    }),
    require("./fb-action/change-actor-talker.js")),
  change_behavior_state_js_1 =
    (Object.defineProperty(exports, "ChangeActorTalker", {
      enumerable: !0,
      get: function () {
        return change_actor_talker_js_1.ChangeActorTalker;
      },
    }),
    require("./fb-action/change-behavior-state.js")),
  change_entity_camp_js_1 =
    (Object.defineProperty(exports, "ChangeBehaviorState", {
      enumerable: !0,
      get: function () {
        return change_behavior_state_js_1.ChangeBehaviorState;
      },
    }),
    require("./fb-action/change-entity-camp.js")),
  change_entity_prefab_performance_js_1 =
    (Object.defineProperty(exports, "ChangeEntityCamp", {
      enumerable: !0,
      get: function () {
        return change_entity_camp_js_1.ChangeEntityCamp;
      },
    }),
    require("./fb-action/change-entity-prefab-performance.js")),
  change_entity_state_js_1 =
    (Object.defineProperty(exports, "ChangeEntityPrefabPerformance", {
      enumerable: !0,
      get: function () {
        return change_entity_prefab_performance_js_1.ChangeEntityPrefabPerformance;
      },
    }),
    require("./fb-action/change-entity-state.js")),
  change_entity_state_batch_directly_js_1 =
    (Object.defineProperty(exports, "ChangeEntityState", {
      enumerable: !0,
      get: function () {
        return change_entity_state_js_1.ChangeEntityState;
      },
    }),
    require("./fb-action/change-entity-state-batch-directly.js")),
  change_entity_state_directly_js_1 =
    (Object.defineProperty(exports, "ChangeEntityStateBatchDirectly", {
      enumerable: !0,
      get: function () {
        return change_entity_state_batch_directly_js_1.ChangeEntityStateBatchDirectly;
      },
    }),
    require("./fb-action/change-entity-state-directly.js")),
  change_entity_state_loop_js_1 =
    (Object.defineProperty(exports, "ChangeEntityStateDirectly", {
      enumerable: !0,
      get: function () {
        return change_entity_state_directly_js_1.ChangeEntityStateDirectly;
      },
    }),
    require("./fb-action/change-entity-state-loop.js")),
  change_fight_team_js_1 =
    (Object.defineProperty(exports, "ChangeEntityStateLoop", {
      enumerable: !0,
      get: function () {
        return change_entity_state_loop_js_1.ChangeEntityStateLoop;
      },
    }),
    require("./fb-action/change-fight-team.js")),
  change_flow_template_js_1 =
    (Object.defineProperty(exports, "ChangeFightTeam", {
      enumerable: !0,
      get: function () {
        return change_fight_team_js_1.ChangeFightTeam;
      },
    }),
    require("./fb-action/change-flow-template.js")),
  change_interact_option_text_js_1 =
    (Object.defineProperty(exports, "ChangeFlowTemplate", {
      enumerable: !0,
      get: function () {
        return change_flow_template_js_1.ChangeFlowTemplate;
      },
    }),
    require("./fb-action/change-interact-option-text.js")),
  change_lift_target_js_1 =
    (Object.defineProperty(exports, "ChangeInteractOptionText", {
      enumerable: !0,
      get: function () {
        return change_interact_option_text_js_1.ChangeInteractOptionText;
      },
    }),
    require("./fb-action/change-lift-target.js")),
  change_npc_perform_state_js_1 =
    (Object.defineProperty(exports, "ChangeLiftTarget", {
      enumerable: !0,
      get: function () {
        return change_lift_target_js_1.ChangeLiftTarget;
      },
    }),
    require("./fb-action/change-npc-perform-state.js")),
  change_other_state_js_1 =
    (Object.defineProperty(exports, "ChangeNpcPerformState", {
      enumerable: !0,
      get: function () {
        return change_npc_perform_state_js_1.ChangeNpcPerformState;
      },
    }),
    require("./fb-action/change-other-state.js")),
  change_phantom_js_1 =
    (Object.defineProperty(exports, "ChangeOtherState", {
      enumerable: !0,
      get: function () {
        return change_other_state_js_1.ChangeOtherState;
      },
    }),
    require("./fb-action/change-phantom.js")),
  change_phantom_formation_js_1 =
    (Object.defineProperty(exports, "ChangePhantom", {
      enumerable: !0,
      get: function () {
        return change_phantom_js_1.ChangePhantom;
      },
    }),
    require("./fb-action/change-phantom-formation.js")),
  change_random_state_js_1 =
    (Object.defineProperty(exports, "ChangePhantomFormation", {
      enumerable: !0,
      get: function () {
        return change_phantom_formation_js_1.ChangePhantomFormation;
      },
    }),
    require("./fb-action/change-random-state.js")),
  change_self_entity_prefab_performance_js_1 =
    (Object.defineProperty(exports, "ChangeRandomState", {
      enumerable: !0,
      get: function () {
        return change_random_state_js_1.ChangeRandomState;
      },
    }),
    require("./fb-action/change-self-entity-prefab-performance.js")),
  change_self_entity_state_js_1 =
    (Object.defineProperty(exports, "ChangeSelfEntityPrefabPerformance", {
      enumerable: !0,
      get: function () {
        return change_self_entity_prefab_performance_js_1.ChangeSelfEntityPrefabPerformance;
      },
    }),
    require("./fb-action/change-self-entity-state.js")),
  change_state_js_1 =
    (Object.defineProperty(exports, "ChangeSelfEntityState", {
      enumerable: !0,
      get: function () {
        return change_self_entity_state_js_1.ChangeSelfEntityState;
      },
    }),
    require("./fb-action/change-state.js")),
  change_target_entity_prefab_performance_js_1 =
    (Object.defineProperty(exports, "ChangeState", {
      enumerable: !0,
      get: function () {
        return change_state_js_1.ChangeState;
      },
    }),
    require("./fb-action/change-target-entity-prefab-performance.js")),
  change_team_position_js_1 =
    (Object.defineProperty(exports, "ChangeTargetEntityPrefabPerformance", {
      enumerable: !0,
      get: function () {
        return change_target_entity_prefab_performance_js_1.ChangeTargetEntityPrefabPerformance;
      },
    }),
    require("./fb-action/change-team-position.js")),
  change_timer_js_1 =
    (Object.defineProperty(exports, "ChangeTeamPosition", {
      enumerable: !0,
      get: function () {
        return change_team_position_js_1.ChangeTeamPosition;
      },
    }),
    require("./fb-action/change-timer.js")),
  character_group_new_js_1 =
    (Object.defineProperty(exports, "ChangeTimer", {
      enumerable: !0,
      get: function () {
        return change_timer_js_1.ChangeTimer;
      },
    }),
    require("./fb-action/character-group-new.js")),
  character_look_at_js_1 =
    (Object.defineProperty(exports, "CharacterGroupNew", {
      enumerable: !0,
      get: function () {
        return character_group_new_js_1.CharacterGroupNew;
      },
    }),
    require("./fb-action/character-look-at.js")),
  character_look_at_empty_data_js_1 =
    (Object.defineProperty(exports, "CharacterLookAt", {
      enumerable: !0,
      get: function () {
        return character_look_at_js_1.CharacterLookAt;
      },
    }),
    require("./fb-action/character-look-at-empty-data.js")),
  character_look_at_entity_data_js_1 =
    (Object.defineProperty(exports, "CharacterLookAtEmptyData", {
      enumerable: !0,
      get: function () {
        return character_look_at_empty_data_js_1.CharacterLookAtEmptyData;
      },
    }),
    require("./fb-action/character-look-at-entity-data.js")),
  character_look_at_player_data_js_1 =
    (Object.defineProperty(exports, "CharacterLookAtEntityData", {
      enumerable: !0,
      get: function () {
        return character_look_at_entity_data_js_1.CharacterLookAtEntityData;
      },
    }),
    require("./fb-action/character-look-at-player-data.js")),
  character_look_at_position_data_js_1 =
    (Object.defineProperty(exports, "CharacterLookAtPlayerData", {
      enumerable: !0,
      get: function () {
        return character_look_at_player_data_js_1.CharacterLookAtPlayerData;
      },
    }),
    require("./fb-action/character-look-at-position-data.js")),
  character_look_at_unlock_data_js_1 =
    (Object.defineProperty(exports, "CharacterLookAtPositionData", {
      enumerable: !0,
      get: function () {
        return character_look_at_position_data_js_1.CharacterLookAtPositionData;
      },
    }),
    require("./fb-action/character-look-at-unlock-data.js")),
  character_move_to_point_js_1 =
    (Object.defineProperty(exports, "CharacterLookAtUnlockData", {
      enumerable: !0,
      get: function () {
        return character_look_at_unlock_data_js_1.CharacterLookAtUnlockData;
      },
    }),
    require("./fb-action/character-move-to-point.js")),
  check_climb_js_1 =
    (Object.defineProperty(exports, "CharacterMoveToPoint", {
      enumerable: !0,
      get: function () {
        return character_move_to_point_js_1.CharacterMoveToPoint;
      },
    }),
    require("./fb-action/check-climb.js")),
  cipher_gameplay_js_1 =
    (Object.defineProperty(exports, "CheckClimb", {
      enumerable: !0,
      get: function () {
        return check_climb_js_1.CheckClimb;
      },
    }),
    require("./fb-action/cipher-gameplay.js")),
  claim_dungeon_reward_js_1 =
    (Object.defineProperty(exports, "CipherGameplay", {
      enumerable: !0,
      get: function () {
        return cipher_gameplay_js_1.CipherGameplay;
      },
    }),
    require("./fb-action/claim-dungeon-reward.js")),
  claim_level_play_reward_js_1 =
    (Object.defineProperty(exports, "ClaimDungeonReward", {
      enumerable: !0,
      get: function () {
        return claim_dungeon_reward_js_1.ClaimDungeonReward;
      },
    }),
    require("./fb-action/claim-level-play-reward.js")),
  clear_entity_visible_tag_js_1 =
    (Object.defineProperty(exports, "ClaimLevelPlayReward", {
      enumerable: !0,
      get: function () {
        return claim_level_play_reward_js_1.ClaimLevelPlayReward;
      },
    }),
    require("./fb-action/clear-entity-visible-tag.js")),
  clear_fishing_cabin_in_sale_items_js_1 =
    (Object.defineProperty(exports, "ClearEntityVisibleTag", {
      enumerable: !0,
      get: function () {
        return clear_entity_visible_tag_js_1.ClearEntityVisibleTag;
      },
    }),
    require("./fb-action/clear-fishing-cabin-in-sale-items.js")),
  clear_play_bubble_js_1 =
    (Object.defineProperty(exports, "ClearFishingCabinInSaleItems", {
      enumerable: !0,
      get: function () {
        return clear_fishing_cabin_in_sale_items_js_1.ClearFishingCabinInSaleItems;
      },
    }),
    require("./fb-action/clear-play-bubble.js")),
  client_pre_enable_sub_levels_js_1 =
    (Object.defineProperty(exports, "ClearPlayBubble", {
      enumerable: !0,
      get: function () {
        return clear_play_bubble_js_1.ClearPlayBubble;
      },
    }),
    require("./fb-action/client-pre-enable-sub-levels.js")),
  client_set_player_pos_js_1 =
    (Object.defineProperty(exports, "ClientPreEnableSubLevels", {
      enumerable: !0,
      get: function () {
        return client_pre_enable_sub_levels_js_1.ClientPreEnableSubLevels;
      },
    }),
    require("./fb-action/client-set-player-pos.js")),
  client_tp_relative_entity_pos_js_1 =
    (Object.defineProperty(exports, "ClientSetPlayerPos", {
      enumerable: !0,
      get: function () {
        return client_set_player_pos_js_1.ClientSetPlayerPos;
      },
    }),
    require("./fb-action/client-tp-relative-entity-pos.js")),
  close_air_wall_js_1 =
    (Object.defineProperty(exports, "ClientTpRelativeEntityPos", {
      enumerable: !0,
      get: function () {
        return client_tp_relative_entity_pos_js_1.ClientTpRelativeEntityPos;
      },
    }),
    require("./fb-action/close-air-wall.js")),
  close_flow_template_js_1 =
    (Object.defineProperty(exports, "CloseAirWall", {
      enumerable: !0,
      get: function () {
        return close_air_wall_js_1.CloseAirWall;
      },
    }),
    require("./fb-action/close-flow-template.js")),
  close_global_time_scale_js_1 =
    (Object.defineProperty(exports, "CloseFlowTemplate", {
      enumerable: !0,
      get: function () {
        return close_flow_template_js_1.CloseFlowTemplate;
      },
    }),
    require("./fb-action/close-global-time-scale.js")),
  close_ski_config_js_1 =
    (Object.defineProperty(exports, "CloseGlobalTimeScale", {
      enumerable: !0,
      get: function () {
        return close_global_time_scale_js_1.CloseGlobalTimeScale;
      },
    }),
    require("./fb-action/close-ski-config.js")),
  close_spline_move_js_1 =
    (Object.defineProperty(exports, "CloseSkiConfig", {
      enumerable: !0,
      get: function () {
        return close_ski_config_js_1.CloseSkiConfig;
      },
    }),
    require("./fb-action/close-spline-move.js")),
  close_trace_spline_js_1 =
    (Object.defineProperty(exports, "CloseSplineMove", {
      enumerable: !0,
      get: function () {
        return close_spline_move_js_1.CloseSplineMove;
      },
    }),
    require("./fb-action/close-trace-spline.js")),
  collect_js_1 =
    (Object.defineProperty(exports, "CloseTraceSpline", {
      enumerable: !0,
      get: function () {
        return close_trace_spline_js_1.CloseTraceSpline;
      },
    }),
    require("./fb-action/collect.js")),
  color_piece_js_1 =
    (Object.defineProperty(exports, "Collect", {
      enumerable: !0,
      get: function () {
        return collect_js_1.Collect;
      },
    }),
    require("./fb-action/color-piece.js")),
  common_tip_js_1 =
    (Object.defineProperty(exports, "ColorPiece", {
      enumerable: !0,
      get: function () {
        return color_piece_js_1.ColorPiece;
      },
    }),
    require("./fb-action/common-tip.js")),
  common_tip2_js_1 =
    (Object.defineProperty(exports, "CommonTip", {
      enumerable: !0,
      get: function () {
        return common_tip_js_1.CommonTip;
      },
    }),
    require("./fb-action/common-tip2.js")),
  common_tip2_prepare_countdown_js_1 =
    (Object.defineProperty(exports, "CommonTip2", {
      enumerable: !0,
      get: function () {
        return common_tip2_js_1.CommonTip2;
      },
    }),
    require("./fb-action/common-tip2-prepare-countdown.js")),
  common_tip_challenge_condition_js_1 =
    (Object.defineProperty(exports, "CommonTip2PrepareCountdown", {
      enumerable: !0,
      get: function () {
        return common_tip2_prepare_countdown_js_1.CommonTip2PrepareCountdown;
      },
    }),
    require("./fb-action/common-tip-challenge-condition.js")),
  common_tip_challenge_fail_js_1 =
    (Object.defineProperty(exports, "CommonTipChallengeCondition", {
      enumerable: !0,
      get: function () {
        return common_tip_challenge_condition_js_1.CommonTipChallengeCondition;
      },
    }),
    require("./fb-action/common-tip-challenge-fail.js")),
  common_tip_challenge_success_js_1 =
    (Object.defineProperty(exports, "CommonTipChallengeFail", {
      enumerable: !0,
      get: function () {
        return common_tip_challenge_fail_js_1.CommonTipChallengeFail;
      },
    }),
    require("./fb-action/common-tip-challenge-success.js")),
  common_tip_enter_in_range_js_1 =
    (Object.defineProperty(exports, "CommonTipChallengeSuccess", {
      enumerable: !0,
      get: function () {
        return common_tip_challenge_success_js_1.CommonTipChallengeSuccess;
      },
    }),
    require("./fb-action/common-tip-enter-in-range.js")),
  common_tip_first_complete_js_1 =
    (Object.defineProperty(exports, "CommonTipEnterInRange", {
      enumerable: !0,
      get: function () {
        return common_tip_enter_in_range_js_1.CommonTipEnterInRange;
      },
    }),
    require("./fb-action/common-tip-first-complete.js")),
  common_tip_general_floating_tip_js_1 =
    (Object.defineProperty(exports, "CommonTipFirstComplete", {
      enumerable: !0,
      get: function () {
        return common_tip_first_complete_js_1.CommonTipFirstComplete;
      },
    }),
    require("./fb-action/common-tip-general-floating-tip.js")),
  common_tip_id_js_1 =
    (Object.defineProperty(exports, "CommonTipGeneralFloatingTip", {
      enumerable: !0,
      get: function () {
        return common_tip_general_floating_tip_js_1.CommonTipGeneralFloatingTip;
      },
    }),
    require("./fb-action/common-tip-id.js")),
  common_tip_mission_complete_js_1 =
    (Object.defineProperty(exports, "CommonTipId", {
      enumerable: !0,
      get: function () {
        return common_tip_id_js_1.CommonTipId;
      },
    }),
    require("./fb-action/common-tip-mission-complete.js")),
  common_tip_prepare_countdown_js_1 =
    (Object.defineProperty(exports, "CommonTipMissionComplete", {
      enumerable: !0,
      get: function () {
        return common_tip_mission_complete_js_1.CommonTipMissionComplete;
      },
    }),
    require("./fb-action/common-tip-prepare-countdown.js")),
  common_tip_reach_challenge_js_1 =
    (Object.defineProperty(exports, "CommonTipPrepareCountdown", {
      enumerable: !0,
      get: function () {
        return common_tip_prepare_countdown_js_1.CommonTipPrepareCountdown;
      },
    }),
    require("./fb-action/common-tip-reach-challenge.js")),
  common_tip_trigger_delegation_js_1 =
    (Object.defineProperty(exports, "CommonTipReachChallenge", {
      enumerable: !0,
      get: function () {
        return common_tip_reach_challenge_js_1.CommonTipReachChallenge;
      },
    }),
    require("./fb-action/common-tip-trigger-delegation.js")),
  complete_child_quest_js_1 =
    (Object.defineProperty(exports, "CommonTipTriggerDelegation", {
      enumerable: !0,
      get: function () {
        return common_tip_trigger_delegation_js_1.CommonTipTriggerDelegation;
      },
    }),
    require("./fb-action/complete-child-quest.js")),
  complete_guide_js_1 =
    (Object.defineProperty(exports, "CompleteChildQuest", {
      enumerable: !0,
      get: function () {
        return complete_child_quest_js_1.CompleteChildQuest;
      },
    }),
    require("./fb-action/complete-guide.js")),
  condition_js_1 =
    (Object.defineProperty(exports, "CompleteGuide", {
      enumerable: !0,
      get: function () {
        return complete_guide_js_1.CompleteGuide;
      },
    }),
    require("./fb-action/condition.js")),
  conditions_js_1 =
    (Object.defineProperty(exports, "Condition", {
      enumerable: !0,
      get: function () {
        return condition_js_1.Condition;
      },
    }),
    require("./fb-action/conditions.js")),
  constant_camera_shake_js_1 =
    (Object.defineProperty(exports, "Conditions", {
      enumerable: !0,
      get: function () {
        return conditions_js_1.Conditions;
      },
    }),
    require("./fb-action/constant-camera-shake.js")),
  control_tracking_other_js_1 =
    (Object.defineProperty(exports, "ConstantCameraShake", {
      enumerable: !0,
      get: function () {
        return constant_camera_shake_js_1.ConstantCameraShake;
      },
    }),
    require("./fb-action/control-tracking-other.js")),
  control_tracking_self_js_1 =
    (Object.defineProperty(exports, "ControlTrackingOther", {
      enumerable: !0,
      get: function () {
        return control_tracking_other_js_1.ControlTrackingOther;
      },
    }),
    require("./fb-action/control-tracking-self.js")),
  create_prefab_js_1 =
    (Object.defineProperty(exports, "ControlTrackingSelf", {
      enumerable: !0,
      get: function () {
        return control_tracking_self_js_1.ControlTrackingSelf;
      },
    }),
    require("./fb-action/create-prefab.js")),
  current_vehicle_js_1 =
    (Object.defineProperty(exports, "CreatePrefab", {
      enumerable: !0,
      get: function () {
        return create_prefab_js_1.CreatePrefab;
      },
    }),
    require("./fb-action/current-vehicle.js")),
  custom_alert_value_js_1 =
    (Object.defineProperty(exports, "CurrentVehicle", {
      enumerable: !0,
      get: function () {
        return current_vehicle_js_1.CurrentVehicle;
      },
    }),
    require("./fb-action/custom-alert-value.js")),
  custom_alert_value_change_speed_js_1 =
    (Object.defineProperty(exports, "CustomAlertValue", {
      enumerable: !0,
      get: function () {
        return custom_alert_value_js_1.CustomAlertValue;
      },
    }),
    require("./fb-action/custom-alert-value-change-speed.js")),
  custom_json_js_1 =
    (Object.defineProperty(exports, "CustomAlertValueChangeSpeed", {
      enumerable: !0,
      get: function () {
        return custom_alert_value_change_speed_js_1.CustomAlertValueChangeSpeed;
      },
    }),
    require("./fb-action/custom-json.js")),
  cycle_move_to_points_js_1 =
    (Object.defineProperty(exports, "CustomJson", {
      enumerable: !0,
      get: function () {
        return custom_json_js_1.CustomJson;
      },
    }),
    require("./fb-action/cycle-move-to-points.js")),
  dango_abyss_activate_portal_js_1 =
    (Object.defineProperty(exports, "CycleMoveToPoints", {
      enumerable: !0,
      get: function () {
        return cycle_move_to_points_js_1.CycleMoveToPoints;
      },
    }),
    require("./fb-action/dango-abyss-activate-portal.js")),
  dango_abyss_create_reward_treasure_box_js_1 =
    (Object.defineProperty(exports, "DangoAbyssActivatePortal", {
      enumerable: !0,
      get: function () {
        return dango_abyss_activate_portal_js_1.DangoAbyssActivatePortal;
      },
    }),
    require("./fb-action/dango-abyss-create-reward-treasure-box.js")),
  dango_abyss_goto_next_floor_js_1 =
    (Object.defineProperty(exports, "DangoAbyssCreateRewardTreasureBox", {
      enumerable: !0,
      get: function () {
        return dango_abyss_create_reward_treasure_box_js_1.DangoAbyssCreateRewardTreasureBox;
      },
    }),
    require("./fb-action/dango-abyss-goto-next-floor.js")),
  dango_abyss_receive_reward_js_1 =
    (Object.defineProperty(exports, "DangoAbyssGotoNextFloor", {
      enumerable: !0,
      get: function () {
        return dango_abyss_goto_next_floor_js_1.DangoAbyssGotoNextFloor;
      },
    }),
    require("./fb-action/dango-abyss-receive-reward.js")),
  daoling_authentication_js_1 =
    (Object.defineProperty(exports, "DangoAbyssReceiveReward", {
      enumerable: !0,
      get: function () {
        return dango_abyss_receive_reward_js_1.DangoAbyssReceiveReward;
      },
    }),
    require("./fb-action/daoling-authentication.js")),
  delay_remove_after_skill_finish_js_1 =
    (Object.defineProperty(exports, "DaolingAuthentication", {
      enumerable: !0,
      get: function () {
        return daoling_authentication_js_1.DaolingAuthentication;
      },
    }),
    require("./fb-action/delay-remove-after-skill-finish.js")),
  destroy_js_1 =
    (Object.defineProperty(exports, "DelayRemoveAfterSkillFinish", {
      enumerable: !0,
      get: function () {
        return delay_remove_after_skill_finish_js_1.DelayRemoveAfterSkillFinish;
      },
    }),
    require("./fb-action/destroy.js")),
  destroy_all_child_js_1 =
    (Object.defineProperty(exports, "Destroy", {
      enumerable: !0,
      get: function () {
        return destroy_js_1.Destroy;
      },
    }),
    require("./fb-action/destroy-all-child.js")),
  destroy_entity_js_1 =
    (Object.defineProperty(exports, "DestroyAllChild", {
      enumerable: !0,
      get: function () {
        return destroy_all_child_js_1.DestroyAllChild;
      },
    }),
    require("./fb-action/destroy-entity.js")),
  destroy_fishing_boat_js_1 =
    (Object.defineProperty(exports, "DestroyEntity", {
      enumerable: !0,
      get: function () {
        return destroy_entity_js_1.DestroyEntity;
      },
    }),
    require("./fb-action/destroy-fishing-boat.js")),
  destroy_prefab_js_1 =
    (Object.defineProperty(exports, "DestroyFishingBoat", {
      enumerable: !0,
      get: function () {
        return destroy_fishing_boat_js_1.DestroyFishingBoat;
      },
    }),
    require("./fb-action/destroy-prefab.js")),
  destroy_quest_js_1 =
    (Object.defineProperty(exports, "DestroyPrefab", {
      enumerable: !0,
      get: function () {
        return destroy_prefab_js_1.DestroyPrefab;
      },
    }),
    require("./fb-action/destroy-quest.js")),
  destroy_quest_item_js_1 =
    (Object.defineProperty(exports, "DestroyQuest", {
      enumerable: !0,
      get: function () {
        return destroy_quest_js_1.DestroyQuest;
      },
    }),
    require("./fb-action/destroy-quest-item.js")),
  destroy_self_js_1 =
    (Object.defineProperty(exports, "DestroyQuestItem", {
      enumerable: !0,
      get: function () {
        return destroy_quest_item_js_1.DestroyQuestItem;
      },
    }),
    require("./fb-action/destroy-self.js")),
  detect_battle_monster_on_ground_js_1 =
    (Object.defineProperty(exports, "DestroySelf", {
      enumerable: !0,
      get: function () {
        return destroy_self_js_1.DestroySelf;
      },
    }),
    require("./fb-action/detect-battle-monster-on-ground.js")),
  detect_battle_tag_js_1 =
    (Object.defineProperty(exports, "DetectBattleMonsterOnGround", {
      enumerable: !0,
      get: function () {
        return detect_battle_monster_on_ground_js_1.DetectBattleMonsterOnGround;
      },
    }),
    require("./fb-action/detect-battle-tag.js")),
  detect_trigger_js_1 =
    (Object.defineProperty(exports, "DetectBattleTag", {
      enumerable: !0,
      get: function () {
        return detect_battle_tag_js_1.DetectBattleTag;
      },
    }),
    require("./fb-action/detect-trigger.js")),
  disable_alert_area_dungeon_condition_js_1 =
    (Object.defineProperty(exports, "DetectTrigger", {
      enumerable: !0,
      get: function () {
        return detect_trigger_js_1.DetectTrigger;
      },
    }),
    require("./fb-action/disable-alert-area-dungeon-condition.js")),
  disable_alert_area_quest_condition_js_1 =
    (Object.defineProperty(exports, "DisableAlertAreaDungeonCondition", {
      enumerable: !0,
      get: function () {
        return disable_alert_area_dungeon_condition_js_1.DisableAlertAreaDungeonCondition;
      },
    }),
    require("./fb-action/disable-alert-area-quest-condition.js")),
  disable_all_player_operation_js_1 =
    (Object.defineProperty(exports, "DisableAlertAreaQuestCondition", {
      enumerable: !0,
      get: function () {
        return disable_alert_area_quest_condition_js_1.DisableAlertAreaQuestCondition;
      },
    }),
    require("./fb-action/disable-all-player-operation.js")),
  disable_camera_operation_js_1 =
    (Object.defineProperty(exports, "DisableAllPlayerOperation", {
      enumerable: !0,
      get: function () {
        return disable_all_player_operation_js_1.DisableAllPlayerOperation;
      },
    }),
    require("./fb-action/disable-camera-operation.js")),
  disable_explore_skill_js_1 =
    (Object.defineProperty(exports, "DisableCameraOperation", {
      enumerable: !0,
      get: function () {
        return disable_camera_operation_js_1.DisableCameraOperation;
      },
    }),
    require("./fb-action/disable-explore-skill.js")),
  disable_map_mark_js_1 =
    (Object.defineProperty(exports, "DisableExploreSkill", {
      enumerable: !0,
      get: function () {
        return disable_explore_skill_js_1.DisableExploreSkill;
      },
    }),
    require("./fb-action/disable-map-mark.js")),
  disable_module_player_operation_js_1 =
    (Object.defineProperty(exports, "DisableMapMark", {
      enumerable: !0,
      get: function () {
        return disable_map_mark_js_1.DisableMapMark;
      },
    }),
    require("./fb-action/disable-module-player-operation.js")),
  disable_move_operation_js_1 =
    (Object.defineProperty(exports, "DisableModulePlayerOperation", {
      enumerable: !0,
      get: function () {
        return disable_module_player_operation_js_1.DisableModulePlayerOperation;
      },
    }),
    require("./fb-action/disable-move-operation.js")),
  disable_scene_interaction_operation_js_1 =
    (Object.defineProperty(exports, "DisableMoveOperation", {
      enumerable: !0,
      get: function () {
        return disable_move_operation_js_1.DisableMoveOperation;
      },
    }),
    require("./fb-action/disable-scene-interaction-operation.js")),
  disable_sectional_skill_operation_js_1 =
    (Object.defineProperty(exports, "DisableSceneInteractionOperation", {
      enumerable: !0,
      get: function () {
        return disable_scene_interaction_operation_js_1.DisableSceneInteractionOperation;
      },
    }),
    require("./fb-action/disable-sectional-skill-operation.js")),
  disable_skill_operation_js_1 =
    (Object.defineProperty(exports, "DisableSectionalSkillOperation", {
      enumerable: !0,
      get: function () {
        return disable_sectional_skill_operation_js_1.DisableSectionalSkillOperation;
      },
    }),
    require("./fb-action/disable-skill-operation.js")),
  disable_ui_operation_js_1 =
    (Object.defineProperty(exports, "DisableSkillOperation", {
      enumerable: !0,
      get: function () {
        return disable_skill_operation_js_1.DisableSkillOperation;
      },
    }),
    require("./fb-action/disable-ui-operation.js")),
  do_calculate_js_1 =
    (Object.defineProperty(exports, "DisableUiOperation", {
      enumerable: !0,
      get: function () {
        return disable_ui_operation_js_1.DisableUiOperation;
      },
    }),
    require("./fb-action/do-calculate.js")),
  dreamless_warning_js_1 =
    (Object.defineProperty(exports, "DoCalculate", {
      enumerable: !0,
      get: function () {
        return do_calculate_js_1.DoCalculate;
      },
    }),
    require("./fb-action/dreamless-warning.js")),
  duration_interact_js_1 =
    (Object.defineProperty(exports, "DreamlessWarning", {
      enumerable: !0,
      get: function () {
        return dreamless_warning_js_1.DreamlessWarning;
      },
    }),
    require("./fb-action/duration-interact.js")),
  ease_data_js_1 =
    (Object.defineProperty(exports, "DurationInteract", {
      enumerable: !0,
      get: function () {
        return duration_interact_js_1.DurationInteract;
      },
    }),
    require("./fb-action/ease-data.js")),
  effect_entity_pos2_js_1 =
    (Object.defineProperty(exports, "EaseData", {
      enumerable: !0,
      get: function () {
        return ease_data_js_1.EaseData;
      },
    }),
    require("./fb-action/effect-entity-pos2.js")),
  effect_player_pos2_js_1 =
    (Object.defineProperty(exports, "EffectEntityPos2", {
      enumerable: !0,
      get: function () {
        return effect_entity_pos2_js_1.EffectEntityPos2;
      },
    }),
    require("./fb-action/effect-player-pos2.js")),
  enable_ai_js_1 =
    (Object.defineProperty(exports, "EffectPlayerPos2", {
      enumerable: !0,
      get: function () {
        return effect_player_pos2_js_1.EffectPlayerPos2;
      },
    }),
    require("./fb-action/enable-ai.js")),
  enable_actor_js_1 =
    (Object.defineProperty(exports, "EnableAI", {
      enumerable: !0,
      get: function () {
        return enable_ai_js_1.EnableAI;
      },
    }),
    require("./fb-action/enable-actor.js")),
  enable_alert_area_js_1 =
    (Object.defineProperty(exports, "EnableActor", {
      enumerable: !0,
      get: function () {
        return enable_actor_js_1.EnableActor;
      },
    }),
    require("./fb-action/enable-alert-area.js")),
  enable_alert_ui_js_1 =
    (Object.defineProperty(exports, "EnableAlertArea", {
      enumerable: !0,
      get: function () {
        return enable_alert_area_js_1.EnableAlertArea;
      },
    }),
    require("./fb-action/enable-alert-ui.js")),
  enable_all_player_operation_js_1 =
    (Object.defineProperty(exports, "EnableAlertUi", {
      enumerable: !0,
      get: function () {
        return enable_alert_ui_js_1.EnableAlertUi;
      },
    }),
    require("./fb-action/enable-all-player-operation.js")),
  enable_aoi_notify_js_1 =
    (Object.defineProperty(exports, "EnableAllPlayerOperation", {
      enumerable: !0,
      get: function () {
        return enable_all_player_operation_js_1.EnableAllPlayerOperation;
      },
    }),
    require("./fb-action/enable-aoi-notify.js")),
  enable_camera_operation_js_1 =
    (Object.defineProperty(exports, "EnableAoiNotify", {
      enumerable: !0,
      get: function () {
        return enable_aoi_notify_js_1.EnableAoiNotify;
      },
    }),
    require("./fb-action/enable-camera-operation.js")),
  enable_function_js_1 =
    (Object.defineProperty(exports, "EnableCameraOperation", {
      enumerable: !0,
      get: function () {
        return enable_camera_operation_js_1.EnableCameraOperation;
      },
    }),
    require("./fb-action/enable-function.js")),
  enable_hostility_js_1 =
    (Object.defineProperty(exports, "EnableFunction", {
      enumerable: !0,
      get: function () {
        return enable_function_js_1.EnableFunction;
      },
    }),
    require("./fb-action/enable-hostility.js")),
  enable_level_play_js_1 =
    (Object.defineProperty(exports, "EnableHostility", {
      enumerable: !0,
      get: function () {
        return enable_hostility_js_1.EnableHostility;
      },
    }),
    require("./fb-action/enable-level-play.js")),
  enable_level_play_config_js_1 =
    (Object.defineProperty(exports, "EnableLevelPlay", {
      enumerable: !0,
      get: function () {
        return enable_level_play_js_1.EnableLevelPlay;
      },
    }),
    require("./fb-action/enable-level-play-config.js")),
  enable_move_operation_js_1 =
    (Object.defineProperty(exports, "EnableLevelPlayConfig", {
      enumerable: !0,
      get: function () {
        return enable_level_play_config_js_1.EnableLevelPlayConfig;
      },
    }),
    require("./fb-action/enable-move-operation.js")),
  enable_nearby_tracking_js_1 =
    (Object.defineProperty(exports, "EnableMoveOperation", {
      enumerable: !0,
      get: function () {
        return enable_move_operation_js_1.EnableMoveOperation;
      },
    }),
    require("./fb-action/enable-nearby-tracking.js")),
  enable_scene_interaction_operation_js_1 =
    (Object.defineProperty(exports, "EnableNearbyTracking", {
      enumerable: !0,
      get: function () {
        return enable_nearby_tracking_js_1.EnableNearbyTracking;
      },
    }),
    require("./fb-action/enable-scene-interaction-operation.js")),
  enable_sectional_ui_js_1 =
    (Object.defineProperty(exports, "EnableSceneInteractionOperation", {
      enumerable: !0,
      get: function () {
        return enable_scene_interaction_operation_js_1.EnableSceneInteractionOperation;
      },
    }),
    require("./fb-action/enable-sectional-ui.js")),
  enable_skill_operation_js_1 =
    (Object.defineProperty(exports, "EnableSectionalUi", {
      enumerable: !0,
      get: function () {
        return enable_sectional_ui_js_1.EnableSectionalUi;
      },
    }),
    require("./fb-action/enable-skill-operation.js")),
  enable_spline_move_model_js_1 =
    (Object.defineProperty(exports, "EnableSkillOperation", {
      enumerable: !0,
      get: function () {
        return enable_skill_operation_js_1.EnableSkillOperation;
      },
    }),
    require("./fb-action/enable-spline-move-model.js")),
  enable_sub_level_transition_with_scene_capture_js_1 =
    (Object.defineProperty(exports, "EnableSplineMoveModel", {
      enumerable: !0,
      get: function () {
        return enable_spline_move_model_js_1.EnableSplineMoveModel;
      },
    }),
    require("./fb-action/enable-sub-level-transition-with-scene-capture.js")),
  enable_system_js_1 =
    (Object.defineProperty(
      exports,
      "EnableSubLevelTransitionWithSceneCapture",
      {
        enumerable: !0,
        get: function () {
          return enable_sub_level_transition_with_scene_capture_js_1.EnableSubLevelTransitionWithSceneCapture;
        },
      },
    ),
    require("./fb-action/enable-system.js")),
  enable_temporary_teleport_js_1 =
    (Object.defineProperty(exports, "EnableSystem", {
      enumerable: !0,
      get: function () {
        return enable_system_js_1.EnableSystem;
      },
    }),
    require("./fb-action/enable-temporary-teleport.js")),
  enable_ui_operation_js_1 =
    (Object.defineProperty(exports, "EnableTemporaryTeleport", {
      enumerable: !0,
      get: function () {
        return enable_temporary_teleport_js_1.EnableTemporaryTeleport;
      },
    }),
    require("./fb-action/enable-ui-operation.js")),
  end_flow_template_js_1 =
    (Object.defineProperty(exports, "EnableUiOperation", {
      enumerable: !0,
      get: function () {
        return enable_ui_operation_js_1.EnableUiOperation;
      },
    }),
    require("./fb-action/end-flow-template.js")),
  end_state_js_1 =
    (Object.defineProperty(exports, "EndFlowTemplate", {
      enumerable: !0,
      get: function () {
        return end_flow_template_js_1.EndFlowTemplate;
      },
    }),
    require("./fb-action/end-state.js")),
  enter_npc_vehicle_js_1 =
    (Object.defineProperty(exports, "EndState", {
      enumerable: !0,
      get: function () {
        return end_state_js_1.EndState;
      },
    }),
    require("./fb-action/enter-npc-vehicle.js")),
  enter_orbital_camera_js_1 =
    (Object.defineProperty(exports, "EnterNpcVehicle", {
      enumerable: !0,
      get: function () {
        return enter_npc_vehicle_js_1.EnterNpcVehicle;
      },
    }),
    require("./fb-action/enter-orbital-camera.js")),
  enter_orbital_camera_control_by_move_js_1 =
    (Object.defineProperty(exports, "EnterOrbitalCamera", {
      enumerable: !0,
      get: function () {
        return enter_orbital_camera_js_1.EnterOrbitalCamera;
      },
    }),
    require("./fb-action/enter-orbital-camera-control-by-move.js")),
  entity_look_at_js_1 =
    (Object.defineProperty(exports, "EnterOrbitalCameraControlByMove", {
      enumerable: !0,
      get: function () {
        return enter_orbital_camera_control_by_move_js_1.EnterOrbitalCameraControlByMove;
      },
    }),
    require("./fb-action/entity-look-at.js")),
  entity_pos2_js_1 =
    (Object.defineProperty(exports, "EntityLookAt", {
      enumerable: !0,
      get: function () {
        return entity_look_at_js_1.EntityLookAt;
      },
    }),
    require("./fb-action/entity-pos2.js")),
  entity_spline_move_target_js_1 =
    (Object.defineProperty(exports, "EntityPos2", {
      enumerable: !0,
      get: function () {
        return entity_pos2_js_1.EntityPos2;
      },
    }),
    require("./fb-action/entity-spline-move-target.js")),
  entity_template_context_js_1 =
    (Object.defineProperty(exports, "EntitySplineMoveTarget", {
      enumerable: !0,
      get: function () {
        return entity_spline_move_target_js_1.EntitySplineMoveTarget;
      },
    }),
    require("./fb-action/entity-template-context.js")),
  entity_turn_to_js_1 =
    (Object.defineProperty(exports, "EntityTemplateContext", {
      enumerable: !0,
      get: function () {
        return entity_template_context_js_1.EntityTemplateContext;
      },
    }),
    require("./fb-action/entity-turn-to.js")),
  entity_var_context_js_1 =
    (Object.defineProperty(exports, "EntityTurnTo", {
      enumerable: !0,
      get: function () {
        return entity_turn_to_js_1.EntityTurnTo;
      },
    }),
    require("./fb-action/entity-var-context.js")),
  exec_alert_system_action_js_1 =
    (Object.defineProperty(exports, "EntityVarContext", {
      enumerable: !0,
      get: function () {
        return entity_var_context_js_1.EntityVarContext;
      },
    }),
    require("./fb-action/exec-alert-system-action.js")),
  exec_battle_action_js_1 =
    (Object.defineProperty(exports, "ExecAlertSystemAction", {
      enumerable: !0,
      get: function () {
        return exec_alert_system_action_js_1.ExecAlertSystemAction;
      },
    }),
    require("./fb-action/exec-battle-action.js")),
  exec_resurrection_js_1 =
    (Object.defineProperty(exports, "ExecBattleAction", {
      enumerable: !0,
      get: function () {
        return exec_battle_action_js_1.ExecBattleAction;
      },
    }),
    require("./fb-action/exec-resurrection.js")),
  exec_risk_harvest_effect_js_1 =
    (Object.defineProperty(exports, "ExecResurrection", {
      enumerable: !0,
      get: function () {
        return exec_resurrection_js_1.ExecResurrection;
      },
    }),
    require("./fb-action/exec-risk-harvest-effect.js")),
  exit_dungeon_js_1 =
    (Object.defineProperty(exports, "ExecRiskHarvestEffect", {
      enumerable: !0,
      get: function () {
        return exec_risk_harvest_effect_js_1.ExecRiskHarvestEffect;
      },
    }),
    require("./fb-action/exit-dungeon.js")),
  exit_orbital_camera_js_1 =
    (Object.defineProperty(exports, "ExitDungeon", {
      enumerable: !0,
      get: function () {
        return exit_dungeon_js_1.ExitDungeon;
      },
    }),
    require("./fb-action/exit-orbital-camera.js")),
  exit_vehicle_launch_js_1 =
    (Object.defineProperty(exports, "ExitOrbitalCamera", {
      enumerable: !0,
      get: function () {
        return exit_orbital_camera_js_1.ExitOrbitalCamera;
      },
    }),
    require("./fb-action/exit-vehicle-launch.js")),
  exit_vehicle_stand_up_js_1 =
    (Object.defineProperty(exports, "ExitVehicleLaunch", {
      enumerable: !0,
      get: function () {
        return exit_vehicle_launch_js_1.ExitVehicleLaunch;
      },
    }),
    require("./fb-action/exit-vehicle-stand-up.js")),
  exit_vehicle_teleport_js_1 =
    (Object.defineProperty(exports, "ExitVehicleStandUp", {
      enumerable: !0,
      get: function () {
        return exit_vehicle_stand_up_js_1.ExitVehicleStandUp;
      },
    }),
    require("./fb-action/exit-vehicle-teleport.js")),
  face_to_pos_js_1 =
    (Object.defineProperty(exports, "ExitVehicleTeleport", {
      enumerable: !0,
      get: function () {
        return exit_vehicle_teleport_js_1.ExitVehicleTeleport;
      },
    }),
    require("./fb-action/face-to-pos.js")),
  fade_in_screen_js_1 =
    (Object.defineProperty(exports, "FaceToPos", {
      enumerable: !0,
      get: function () {
        return face_to_pos_js_1.FaceToPos;
      },
    }),
    require("./fb-action/fade-in-screen.js")),
  fade_out_screen_js_1 =
    (Object.defineProperty(exports, "FadeInScreen", {
      enumerable: !0,
      get: function () {
        return fade_in_screen_js_1.FadeInScreen;
      },
    }),
    require("./fb-action/fade-out-screen.js")),
  failure_pose_interact_js_1 =
    (Object.defineProperty(exports, "FadeOutScreen", {
      enumerable: !0,
      get: function () {
        return fade_out_screen_js_1.FadeOutScreen;
      },
    }),
    require("./fb-action/failure-pose-interact.js")),
  finish_condition_js_1 =
    (Object.defineProperty(exports, "FailurePoseInteract", {
      enumerable: !0,
      get: function () {
        return failure_pose_interact_js_1.FailurePoseInteract;
      },
    }),
    require("./fb-action/finish-condition.js")),
  finish_do_interact_js_1 =
    (Object.defineProperty(exports, "FinishCondition", {
      enumerable: !0,
      get: function () {
        return finish_condition_js_1.FinishCondition;
      },
    }),
    require("./fb-action/finish-do-interact.js")),
  finish_dungeon_js_1 =
    (Object.defineProperty(exports, "FinishDoInteract", {
      enumerable: !0,
      get: function () {
        return finish_do_interact_js_1.FinishDoInteract;
      },
    }),
    require("./fb-action/finish-dungeon.js")),
  finish_state_js_1 =
    (Object.defineProperty(exports, "FinishDungeon", {
      enumerable: !0,
      get: function () {
        return finish_dungeon_js_1.FinishDungeon;
      },
    }),
    require("./fb-action/finish-state.js")),
  finish_talk_js_1 =
    (Object.defineProperty(exports, "FinishState", {
      enumerable: !0,
      get: function () {
        return finish_state_js_1.FinishState;
      },
    }),
    require("./fb-action/finish-talk.js")),
  fire_bullet_js_1 =
    (Object.defineProperty(exports, "FinishTalk", {
      enumerable: !0,
      get: function () {
        return finish_talk_js_1.FinishTalk;
      },
    }),
    require("./fb-action/fire-bullet.js")),
  fire_bullet_effect_js_1 =
    (Object.defineProperty(exports, "FireBullet", {
      enumerable: !0,
      get: function () {
        return fire_bullet_js_1.FireBullet;
      },
    }),
    require("./fb-action/fire-bullet-effect.js")),
  fire_bullet_forward_front_js_1 =
    (Object.defineProperty(exports, "FireBulletEffect", {
      enumerable: !0,
      get: function () {
        return fire_bullet_effect_js_1.FireBulletEffect;
      },
    }),
    require("./fb-action/fire-bullet-forward-front.js")),
  fire_bullet_track_position_js_1 =
    (Object.defineProperty(exports, "FireBulletForwardFront", {
      enumerable: !0,
      get: function () {
        return fire_bullet_forward_front_js_1.FireBulletForwardFront;
      },
    }),
    require("./fb-action/fire-bullet-track-position.js")),
  fire_bullet_track_target_js_1 =
    (Object.defineProperty(exports, "FireBulletTrackPosition", {
      enumerable: !0,
      get: function () {
        return fire_bullet_track_position_js_1.FireBulletTrackPosition;
      },
    }),
    require("./fb-action/fire-bullet-track-target.js")),
  fishing_boat_vehicle_js_1 =
    (Object.defineProperty(exports, "FireBulletTrackTarget", {
      enumerable: !0,
      get: function () {
        return fire_bullet_track_target_js_1.FireBulletTrackTarget;
      },
    }),
    require("./fb-action/fishing-boat-vehicle.js")),
  fishing_roulette_js_1 =
    (Object.defineProperty(exports, "FishingBoatVehicle", {
      enumerable: !0,
      get: function () {
        return fishing_boat_vehicle_js_1.FishingBoatVehicle;
      },
    }),
    require("./fb-action/fishing-roulette.js")),
  fix_foundation_relation_js_1 =
    (Object.defineProperty(exports, "FishingRoulette", {
      enumerable: !0,
      get: function () {
        return fishing_roulette_js_1.FishingRoulette;
      },
    }),
    require("./fb-action/fix-foundation-relation.js")),
  fix_show_target_range_js_1 =
    (Object.defineProperty(exports, "FixFoundationRelation", {
      enumerable: !0,
      get: function () {
        return fix_foundation_relation_js_1.FixFoundationRelation;
      },
    }),
    require("./fb-action/fix-show-target-range.js")),
  fix_tele_controller_pos_js_1 =
    (Object.defineProperty(exports, "FixShowTargetRange", {
      enumerable: !0,
      get: function () {
        return fix_show_target_range_js_1.FixShowTargetRange;
      },
    }),
    require("./fb-action/fix-tele-controller-pos.js")),
  fixed_pos_js_1 =
    (Object.defineProperty(exports, "FixTeleControllerPos", {
      enumerable: !0,
      get: function () {
        return fix_tele_controller_pos_js_1.FixTeleControllerPos;
      },
    }),
    require("./fb-action/fixed-pos.js")),
  fixed_time_js_1 =
    (Object.defineProperty(exports, "FixedPos", {
      enumerable: !0,
      get: function () {
        return fixed_pos_js_1.FixedPos;
      },
    }),
    require("./fb-action/fixed-time.js")),
  floor_settings_js_1 =
    (Object.defineProperty(exports, "FixedTime", {
      enumerable: !0,
      get: function () {
        return fixed_time_js_1.FixedTime;
      },
    }),
    require("./fb-action/floor-settings.js")),
  flow_actor_index_data_js_1 =
    (Object.defineProperty(exports, "FloorSettings", {
      enumerable: !0,
      get: function () {
        return floor_settings_js_1.FloorSettings;
      },
    }),
    require("./fb-action/flow-actor-index-data.js")),
  flow_actor_unit_js_1 =
    (Object.defineProperty(exports, "FlowActorIndexData", {
      enumerable: !0,
      get: function () {
        return flow_actor_index_data_js_1.FlowActorIndexData;
      },
    }),
    require("./fb-action/flow-actor-unit.js")),
  flow_index_js_1 =
    (Object.defineProperty(exports, "FlowActorUnit", {
      enumerable: !0,
      get: function () {
        return flow_actor_unit_js_1.FlowActorUnit;
      },
    }),
    require("./fb-action/flow-index.js")),
  flow_info_js_1 =
    (Object.defineProperty(exports, "FlowIndex", {
      enumerable: !0,
      get: function () {
        return flow_index_js_1.FlowIndex;
      },
    }),
    require("./fb-action/flow-info.js")),
  flow_template_mode_js_1 =
    (Object.defineProperty(exports, "FlowInfo", {
      enumerable: !0,
      get: function () {
        return flow_info_js_1.FlowInfo;
      },
    }),
    require("./fb-action/flow-template-mode.js")),
  focus_on_map_mark_js_1 =
    (Object.defineProperty(exports, "FlowTemplateMode", {
      enumerable: !0,
      get: function () {
        return flow_template_mode_js_1.FlowTemplateMode;
      },
    }),
    require("./fb-action/focus-on-map-mark.js")),
  force_occupations_js_1 =
    (Object.defineProperty(exports, "FocusOnMapMark", {
      enumerable: !0,
      get: function () {
        return focus_on_map_mark_js_1.FocusOnMapMark;
      },
    }),
    require("./fb-action/force-occupations.js")),
  gameplay_pose1_interact_js_1 =
    (Object.defineProperty(exports, "ForceOccupations", {
      enumerable: !0,
      get: function () {
        return force_occupations_js_1.ForceOccupations;
      },
    }),
    require("./fb-action/gameplay-pose1-interact.js")),
  gameplay_pose2_interact_js_1 =
    (Object.defineProperty(exports, "GameplayPose1Interact", {
      enumerable: !0,
      get: function () {
        return gameplay_pose1_interact_js_1.GameplayPose1Interact;
      },
    }),
    require("./fb-action/gameplay-pose2-interact.js")),
  gameplay_pose3_interact_js_1 =
    (Object.defineProperty(exports, "GameplayPose2Interact", {
      enumerable: !0,
      get: function () {
        return gameplay_pose2_interact_js_1.GameplayPose2Interact;
      },
    }),
    require("./fb-action/gameplay-pose3-interact.js")),
  get_item_js_1 =
    (Object.defineProperty(exports, "GameplayPose3Interact", {
      enumerable: !0,
      get: function () {
        return gameplay_pose3_interact_js_1.GameplayPose3Interact;
      },
    }),
    require("./fb-action/get-item.js")),
  get_reward_by_interact_js_1 =
    (Object.defineProperty(exports, "GetItem", {
      enumerable: !0,
      get: function () {
        return get_item_js_1.GetItem;
      },
    }),
    require("./fb-action/get-reward-by-interact.js")),
  get_up_js_1 =
    (Object.defineProperty(exports, "GetRewardByInteract", {
      enumerable: !0,
      get: function () {
        return get_reward_by_interact_js_1.GetRewardByInteract;
      },
    }),
    require("./fb-action/get-up.js")),
  glide_js_1 =
    (Object.defineProperty(exports, "GetUp", {
      enumerable: !0,
      get: function () {
        return get_up_js_1.GetUp;
      },
    }),
    require("./fb-action/glide.js")),
  gravity_flip_fixed_pos_js_1 =
    (Object.defineProperty(exports, "Glide", {
      enumerable: !0,
      get: function () {
        return glide_js_1.Glide;
      },
    }),
    require("./fb-action/gravity-flip-fixed-pos.js")),
  guest_operate_ui_animation_js_1 =
    (Object.defineProperty(exports, "GravityFlipFixedPos", {
      enumerable: !0,
      get: function () {
        return gravity_flip_fixed_pos_js_1.GravityFlipFixedPos;
      },
    }),
    require("./fb-action/guest-operate-ui-animation.js")),
  guide_trigger_js_1 =
    (Object.defineProperty(exports, "GuestOperateUiAnimation", {
      enumerable: !0,
      get: function () {
        return guest_operate_ui_animation_js_1.GuestOperateUiAnimation;
      },
    }),
    require("./fb-action/guide-trigger.js")),
  head_style_monster_display_js_1 =
    (Object.defineProperty(exports, "GuideTrigger", {
      enumerable: !0,
      get: function () {
        return guide_trigger_js_1.GuideTrigger;
      },
    }),
    require("./fb-action/head-style-monster-display.js")),
  head_style_normal_js_1 =
    (Object.defineProperty(exports, "HeadStyleMonsterDisplay", {
      enumerable: !0,
      get: function () {
        return head_style_monster_display_js_1.HeadStyleMonsterDisplay;
      },
    }),
    require("./fb-action/head-style-normal.js")),
  head_style_voice_only_js_1 =
    (Object.defineProperty(exports, "HeadStyleNormal", {
      enumerable: !0,
      get: function () {
        return head_style_normal_js_1.HeadStyleNormal;
      },
    }),
    require("./fb-action/head-style-voice-only.js")),
  head_style_warning_js_1 =
    (Object.defineProperty(exports, "HeadStyleVoiceOnly", {
      enumerable: !0,
      get: function () {
        return head_style_voice_only_js_1.HeadStyleVoiceOnly;
      },
    }),
    require("./fb-action/head-style-warning.js")),
  head_style_weak_signal_js_1 =
    (Object.defineProperty(exports, "HeadStyleWarning", {
      enumerable: !0,
      get: function () {
        return head_style_warning_js_1.HeadStyleWarning;
      },
    }),
    require("./fb-action/head-style-weak-signal.js")),
  hide_by_range_in_flow_js_1 =
    (Object.defineProperty(exports, "HeadStyleWeakSignal", {
      enumerable: !0,
      get: function () {
        return head_style_weak_signal_js_1.HeadStyleWeakSignal;
      },
    }),
    require("./fb-action/hide-by-range-in-flow.js")),
  hide_group_js_1 =
    (Object.defineProperty(exports, "HideByRangeInFlow", {
      enumerable: !0,
      get: function () {
        return hide_by_range_in_flow_js_1.HideByRangeInFlow;
      },
    }),
    require("./fb-action/hide-group.js")),
  hide_highlight_explore_skill_icon_js_1 =
    (Object.defineProperty(exports, "HideGroup", {
      enumerable: !0,
      get: function () {
        return hide_group_js_1.HideGroup;
      },
    }),
    require("./fb-action/hide-highlight-explore-skill-icon.js")),
  hide_map_mark_js_1 =
    (Object.defineProperty(exports, "HideHighlightExploreSkillIcon", {
      enumerable: !0,
      get: function () {
        return hide_highlight_explore_skill_icon_js_1.HideHighlightExploreSkillIcon;
      },
    }),
    require("./fb-action/hide-map-mark.js")),
  hide_specific_entities_js_1 =
    (Object.defineProperty(exports, "HideMapMark", {
      enumerable: !0,
      get: function () {
        return hide_map_mark_js_1.HideMapMark;
      },
    }),
    require("./fb-action/hide-specific-entities.js")),
  hide_specify_entity_group_js_1 =
    (Object.defineProperty(exports, "HideSpecificEntities", {
      enumerable: !0,
      get: function () {
        return hide_specific_entities_js_1.HideSpecificEntities;
      },
    }),
    require("./fb-action/hide-specify-entity-group.js")),
  hide_target_range_js_1 =
    (Object.defineProperty(exports, "HideSpecifyEntityGroup", {
      enumerable: !0,
      get: function () {
        return hide_specify_entity_group_js_1.HideSpecifyEntityGroup;
      },
    }),
    require("./fb-action/hide-target-range.js")),
  hide_world_entity_and_level_play_js_1 =
    (Object.defineProperty(exports, "HideTargetRange", {
      enumerable: !0,
      get: function () {
        return hide_target_range_js_1.HideTargetRange;
      },
    }),
    require("./fb-action/hide-world-entity-and-level-play.js")),
  hide_world_entity_and_level_play_group_js_1 =
    (Object.defineProperty(exports, "HideWorldEntityAndLevelPlay", {
      enumerable: !0,
      get: function () {
        return hide_world_entity_and_level_play_js_1.HideWorldEntityAndLevelPlay;
      },
    }),
    require("./fb-action/hide-world-entity-and-level-play-group.js")),
  hide_world_monster_and_monster_treasure_js_1 =
    (Object.defineProperty(exports, "HideWorldEntityAndLevelPlayGroup", {
      enumerable: !0,
      get: function () {
        return hide_world_entity_and_level_play_group_js_1.HideWorldEntityAndLevelPlayGroup;
      },
    }),
    require("./fb-action/hide-world-monster-and-monster-treasure.js")),
  hide_world_monster_and_monster_treasure_group_js_1 =
    (Object.defineProperty(exports, "HideWorldMonsterAndMonsterTreasure", {
      enumerable: !0,
      get: function () {
        return hide_world_monster_and_monster_treasure_js_1.HideWorldMonsterAndMonsterTreasure;
      },
    }),
    require("./fb-action/hide-world-monster-and-monster-treasure-group.js")),
  hook_lock_interact_js_1 =
    (Object.defineProperty(exports, "HideWorldMonsterAndMonsterTreasureGroup", {
      enumerable: !0,
      get: function () {
        return hide_world_monster_and_monster_treasure_group_js_1.HideWorldMonsterAndMonsterTreasureGroup;
      },
    }),
    require("./fb-action/hook-lock-interact.js")),
  icenter_text_fade_out_js_1 =
    (Object.defineProperty(exports, "HookLockInteract", {
      enumerable: !0,
      get: function () {
        return hook_lock_interact_js_1.HookLockInteract;
      },
    }),
    require("./fb-action/icenter-text-fade-out.js")),
  icenter_text_show_all_js_1 =
    (Object.defineProperty(exports, "ICenterTextFadeOut", {
      enumerable: !0,
      get: function () {
        return icenter_text_fade_out_js_1.ICenterTextFadeOut;
      },
    }),
    require("./fb-action/icenter-text-show-all.js")),
  icenter_text_type_writer_js_1 =
    (Object.defineProperty(exports, "ICenterTextShowAll", {
      enumerable: !0,
      get: function () {
        return icenter_text_show_all_js_1.ICenterTextShowAll;
      },
    }),
    require("./fb-action/icenter-text-type-writer.js")),
  interact_js_1 =
    (Object.defineProperty(exports, "ICenterTextTypeWriter", {
      enumerable: !0,
      get: function () {
        return icenter_text_type_writer_js_1.ICenterTextTypeWriter;
      },
    }),
    require("./fb-action/interact.js")),
  interact_actions_js_1 =
    (Object.defineProperty(exports, "Interact", {
      enumerable: !0,
      get: function () {
        return interact_js_1.Interact;
      },
    }),
    require("./fb-action/interact-actions.js")),
  interact_flow_js_1 =
    (Object.defineProperty(exports, "InteractActions", {
      enumerable: !0,
      get: function () {
        return interact_actions_js_1.InteractActions;
      },
    }),
    require("./fb-action/interact-flow.js")),
  interact_option_js_1 =
    (Object.defineProperty(exports, "InteractFlow", {
      enumerable: !0,
      get: function () {
        return interact_flow_js_1.InteractFlow;
      },
    }),
    require("./fb-action/interact-option.js")),
  interlude_actions_js_1 =
    (Object.defineProperty(exports, "InteractOption", {
      enumerable: !0,
      get: function () {
        return interact_option_js_1.InteractOption;
      },
    }),
    require("./fb-action/interlude-actions.js")),
  invoke_js_1 =
    (Object.defineProperty(exports, "InterludeActions", {
      enumerable: !0,
      get: function () {
        return interlude_actions_js_1.InterludeActions;
      },
    }),
    require("./fb-action/invoke.js")),
  item_data_js_1 =
    (Object.defineProperty(exports, "Invoke", {
      enumerable: !0,
      get: function () {
        return invoke_js_1.Invoke;
      },
    }),
    require("./fb-action/item-data.js")),
  item_foundation_match_js_1 =
    (Object.defineProperty(exports, "ItemData", {
      enumerable: !0,
      get: function () {
        return item_data_js_1.ItemData;
      },
    }),
    require("./fb-action/item-foundation-match.js")),
  item_get_ui_config_special_quest_js_1 =
    (Object.defineProperty(exports, "ItemFoundationMatch", {
      enumerable: !0,
      get: function () {
        return item_foundation_match_js_1.ItemFoundationMatch;
      },
    }),
    require("./fb-action/item-get-ui-config-special-quest.js")),
  jigsaw_config_js_1 =
    (Object.defineProperty(exports, "ItemGetUiConfigSpecialQuest", {
      enumerable: !0,
      get: function () {
        return item_get_ui_config_special_quest_js_1.ItemGetUiConfigSpecialQuest;
      },
    }),
    require("./fb-action/jigsaw-config.js")),
  jigsaw_item_entity_js_1 =
    (Object.defineProperty(exports, "JigsawConfig", {
      enumerable: !0,
      get: function () {
        return jigsaw_config_js_1.JigsawConfig;
      },
    }),
    require("./fb-action/jigsaw-item-entity.js")),
  jigsaw_piece_js_1 =
    (Object.defineProperty(exports, "JigsawItemEntity", {
      enumerable: !0,
      get: function () {
        return jigsaw_item_entity_js_1.JigsawItemEntity;
      },
    }),
    require("./fb-action/jigsaw-piece.js")),
  jump_talk_js_1 =
    (Object.defineProperty(exports, "JigsawPiece", {
      enumerable: !0,
      get: function () {
        return jigsaw_piece_js_1.JigsawPiece;
      },
    }),
    require("./fb-action/jump-talk.js")),
  kite_hook_interact_js_1 =
    (Object.defineProperty(exports, "JumpTalk", {
      enumerable: !0,
      get: function () {
        return jump_talk_js_1.JumpTalk;
      },
    }),
    require("./fb-action/kite-hook-interact.js")),
  leisure_interact_js_1 =
    (Object.defineProperty(exports, "KiteHookInteract", {
      enumerable: !0,
      get: function () {
        return kite_hook_interact_js_1.KiteHookInteract;
      },
    }),
    require("./fb-action/leisure-interact.js")),
  level_play_var_context_js_1 =
    (Object.defineProperty(exports, "LeisureInteract", {
      enumerable: !0,
      get: function () {
        return leisure_interact_js_1.LeisureInteract;
      },
    }),
    require("./fb-action/level-play-var-context.js")),
  life_point_js_1 =
    (Object.defineProperty(exports, "LevelPlayVarContext", {
      enumerable: !0,
      get: function () {
        return level_play_var_context_js_1.LevelPlayVarContext;
      },
    }),
    require("./fb-action/life-point.js")),
  life_point_color_board_js_1 =
    (Object.defineProperty(exports, "LifePoint", {
      enumerable: !0,
      get: function () {
        return life_point_js_1.LifePoint;
      },
    }),
    require("./fb-action/life-point-color-board.js")),
  life_point_max_step_reward_rule_item_js_1 =
    (Object.defineProperty(exports, "LifePointColorBoard", {
      enumerable: !0,
      get: function () {
        return life_point_color_board_js_1.LifePointColorBoard;
      },
    }),
    require("./fb-action/life-point-max-step-reward-rule-item.js")),
  limit_player_action_js_1 =
    (Object.defineProperty(exports, "LifePointMaxStepRewardRuleItem", {
      enumerable: !0,
      get: function () {
        return life_point_max_step_reward_rule_item_js_1.LifePointMaxStepRewardRuleItem;
      },
    }),
    require("./fb-action/limit-player-action.js")),
  limit_player_block_all_js_1 =
    (Object.defineProperty(exports, "LimitPlayerAction", {
      enumerable: !0,
      get: function () {
        return limit_player_action_js_1.LimitPlayerAction;
      },
    }),
    require("./fb-action/limit-player-block-all.js")),
  limit_player_camera_js_1 =
    (Object.defineProperty(exports, "LimitPlayerBlockAll", {
      enumerable: !0,
      get: function () {
        return limit_player_block_all_js_1.LimitPlayerBlockAll;
      },
    }),
    require("./fb-action/limit-player-camera.js")),
  limit_player_mouse_js_1 =
    (Object.defineProperty(exports, "LimitPlayerCamera", {
      enumerable: !0,
      get: function () {
        return limit_player_camera_js_1.LimitPlayerCamera;
      },
    }),
    require("./fb-action/limit-player-mouse.js")),
  limit_player_move_js_1 =
    (Object.defineProperty(exports, "LimitPlayerMouse", {
      enumerable: !0,
      get: function () {
        return limit_player_mouse_js_1.LimitPlayerMouse;
      },
    }),
    require("./fb-action/limit-player-move.js")),
  limit_player_move_new_js_1 =
    (Object.defineProperty(exports, "LimitPlayerMove", {
      enumerable: !0,
      get: function () {
        return limit_player_move_js_1.LimitPlayerMove;
      },
    }),
    require("./fb-action/limit-player-move-new.js")),
  limit_player_operation_js_1 =
    (Object.defineProperty(exports, "LimitPlayerMoveNew", {
      enumerable: !0,
      get: function () {
        return limit_player_move_new_js_1.LimitPlayerMoveNew;
      },
    }),
    require("./fb-action/limit-player-operation.js")),
  limit_player_ui_js_1 =
    (Object.defineProperty(exports, "LimitPlayerOperation", {
      enumerable: !0,
      get: function () {
        return limit_player_operation_js_1.LimitPlayerOperation;
      },
    }),
    require("./fb-action/limit-player-ui.js")),
  linear_over_range_camera_shake_js_1 =
    (Object.defineProperty(exports, "LimitPlayerUI", {
      enumerable: !0,
      get: function () {
        return limit_player_ui_js_1.LimitPlayerUI;
      },
    }),
    require("./fb-action/linear-over-range-camera-shake.js")),
  lock_entity_js_1 =
    (Object.defineProperty(exports, "LinearOverRangeCameraShake", {
      enumerable: !0,
      get: function () {
        return linear_over_range_camera_shake_js_1.LinearOverRangeCameraShake;
      },
    }),
    require("./fb-action/lock-entity.js")),
  log_js_1 =
    (Object.defineProperty(exports, "LockEntity", {
      enumerable: !0,
      get: function () {
        return lock_entity_js_1.LockEntity;
      },
    }),
    require("./fb-action/log.js")),
  manipulate_js_1 =
    (Object.defineProperty(exports, "Log", {
      enumerable: !0,
      get: function () {
        return log_js_1.Log;
      },
    }),
    require("./fb-action/manipulate.js")),
  manual_occupations_js_1 =
    (Object.defineProperty(exports, "Manipulate", {
      enumerable: !0,
      get: function () {
        return manipulate_js_1.Manipulate;
      },
    }),
    require("./fb-action/manual-occupations.js")),
  mask_transition_js_1 =
    (Object.defineProperty(exports, "ManualOccupations", {
      enumerable: !0,
      get: function () {
        return manual_occupations_js_1.ManualOccupations;
      },
    }),
    require("./fb-action/mask-transition.js")),
  max_alert_value_js_1 =
    (Object.defineProperty(exports, "MaskTransition", {
      enumerable: !0,
      get: function () {
        return mask_transition_js_1.MaskTransition;
      },
    }),
    require("./fb-action/max-alert-value.js")),
  min_alert_value_js_1 =
    (Object.defineProperty(exports, "MaxAlertValue", {
      enumerable: !0,
      get: function () {
        return max_alert_value_js_1.MaxAlertValue;
      },
    }),
    require("./fb-action/min-alert-value.js")),
  modify_actor_material_js_1 =
    (Object.defineProperty(exports, "MinAlertValue", {
      enumerable: !0,
      get: function () {
        return min_alert_value_js_1.MinAlertValue;
      },
    }),
    require("./fb-action/modify-actor-material.js")),
  modify_alert_value_js_1 =
    (Object.defineProperty(exports, "ModifyActorMaterial", {
      enumerable: !0,
      get: function () {
        return modify_actor_material_js_1.ModifyActorMaterial;
      },
    }),
    require("./fb-action/modify-alert-value.js")),
  modify_scene_item_attribute_tag_js_1 =
    (Object.defineProperty(exports, "ModifyAlertValue", {
      enumerable: !0,
      get: function () {
        return modify_alert_value_js_1.ModifyAlertValue;
      },
    }),
    require("./fb-action/modify-scene-item-attribute-tag.js")),
  modify_self_scene_item_attribute_tag_js_1 =
    (Object.defineProperty(exports, "ModifySceneItemAttributeTag", {
      enumerable: !0,
      get: function () {
        return modify_scene_item_attribute_tag_js_1.ModifySceneItemAttributeTag;
      },
    }),
    require("./fb-action/modify-self-scene-item-attribute-tag.js")),
  modify_target_scene_item_attribute_tag_js_1 =
    (Object.defineProperty(exports, "ModifySelfSceneItemAttributeTag", {
      enumerable: !0,
      get: function () {
        return modify_self_scene_item_attribute_tag_js_1.ModifySelfSceneItemAttributeTag;
      },
    }),
    require("./fb-action/modify-target-scene-item-attribute-tag.js")),
  montage_asset_js_1 =
    (Object.defineProperty(exports, "ModifyTargetSceneItemAttributeTag", {
      enumerable: !0,
      get: function () {
        return modify_target_scene_item_attribute_tag_js_1.ModifyTargetSceneItemAttributeTag;
      },
    }),
    require("./fb-action/montage-asset.js")),
  montage_data_js_1 =
    (Object.defineProperty(exports, "MontageAsset", {
      enumerable: !0,
      get: function () {
        return montage_asset_js_1.MontageAsset;
      },
    }),
    require("./fb-action/montage-data.js")),
  montage_id_js_1 =
    (Object.defineProperty(exports, "MontageData", {
      enumerable: !0,
      get: function () {
        return montage_data_js_1.MontageData;
      },
    }),
    require("./fb-action/montage-id.js")),
  montage_param_js_1 =
    (Object.defineProperty(exports, "MontageId", {
      enumerable: !0,
      get: function () {
        return montage_id_js_1.MontageId;
      },
    }),
    require("./fb-action/montage-param.js")),
  montage_registered_js_1 =
    (Object.defineProperty(exports, "MontageParam", {
      enumerable: !0,
      get: function () {
        return montage_param_js_1.MontageParam;
      },
    }),
    require("./fb-action/montage-registered.js")),
  morse_code_js_1 =
    (Object.defineProperty(exports, "MontageRegistered", {
      enumerable: !0,
      get: function () {
        return montage_registered_js_1.MontageRegistered;
      },
    }),
    require("./fb-action/morse-code.js")),
  move_jigsaw_item_js_1 =
    (Object.defineProperty(exports, "MorseCode", {
      enumerable: !0,
      get: function () {
        return morse_code_js_1.MorseCode;
      },
    }),
    require("./fb-action/move-jigsaw-item.js")),
  move_scene_item_js_1 =
    (Object.defineProperty(exports, "MoveJigsawItem", {
      enumerable: !0,
      get: function () {
        return move_jigsaw_item_js_1.MoveJigsawItem;
      },
    }),
    require("./fb-action/move-scene-item.js")),
  move_to_point_js_1 =
    (Object.defineProperty(exports, "MoveSceneItem", {
      enumerable: !0,
      get: function () {
        return move_scene_item_js_1.MoveSceneItem;
      },
    }),
    require("./fb-action/move-to-point.js")),
  move_to_pos_a_js_1 =
    (Object.defineProperty(exports, "MoveToPoint", {
      enumerable: !0,
      get: function () {
        return move_to_point_js_1.MoveToPoint;
      },
    }),
    require("./fb-action/move-to-pos-a.js")),
  move_to_relative_position_js_1 =
    (Object.defineProperty(exports, "MoveToPosA", {
      enumerable: !0,
      get: function () {
        return move_to_pos_a_js_1.MoveToPosA;
      },
    }),
    require("./fb-action/move-to-relative-position.js")),
  move_with_spline_js_1 =
    (Object.defineProperty(exports, "MoveToRelativePosition", {
      enumerable: !0,
      get: function () {
        return move_to_relative_position_js_1.MoveToRelativePosition;
      },
    }),
    require("./fb-action/move-with-spline.js")),
  movie_background_fade_data_js_1 =
    (Object.defineProperty(exports, "MoveWithSpline", {
      enumerable: !0,
      get: function () {
        return move_with_spline_js_1.MoveWithSpline;
      },
    }),
    require("./fb-action/movie-background-fade-data.js")),
  mowing_tower_goto_next_floor_js_1 =
    (Object.defineProperty(exports, "MovieBackgroundFadeData", {
      enumerable: !0,
      get: function () {
        return movie_background_fade_data_js_1.MovieBackgroundFadeData;
      },
    }),
    require("./fb-action/mowing-tower-goto-next-floor.js")),
  mp4_background_color_js_1 =
    (Object.defineProperty(exports, "MowingTowerGotoNextFloor", {
      enumerable: !0,
      get: function () {
        return mowing_tower_goto_next_floor_js_1.MowingTowerGotoNextFloor;
      },
    }),
    require("./fb-action/mp4-background-color.js")),
  nearest_entity_js_1 =
    (Object.defineProperty(exports, "Mp4BackgroundColor", {
      enumerable: !0,
      get: function () {
        return mp4_background_color_js_1.Mp4BackgroundColor;
      },
    }),
    require("./fb-action/nearest-entity.js")),
  new_move_with_spline_js_1 =
    (Object.defineProperty(exports, "NearestEntity", {
      enumerable: !0,
      get: function () {
        return nearest_entity_js_1.NearestEntity;
      },
    }),
    require("./fb-action/new-move-with-spline.js")),
  notify_monster_perception_js_1 =
    (Object.defineProperty(exports, "NewMoveWithSpline", {
      enumerable: !0,
      get: function () {
        return new_move_with_spline_js_1.NewMoveWithSpline;
      },
    }),
    require("./fb-action/notify-monster-perception.js")),
  notify_monster_play_standby_tags_js_1 =
    (Object.defineProperty(exports, "NotifyMonsterPerception", {
      enumerable: !0,
      get: function () {
        return notify_monster_perception_js_1.NotifyMonsterPerception;
      },
    }),
    require("./fb-action/notify-monster-play-standby-tags.js")),
  npc_follow_config_js_1 =
    (Object.defineProperty(exports, "NotifyMonsterPlayStandbyTags", {
      enumerable: !0,
      get: function () {
        return notify_monster_play_standby_tags_js_1.NotifyMonsterPlayStandbyTags;
      },
    }),
    require("./fb-action/npc-follow-config.js")),
  npc_leisure_interact_js_1 =
    (Object.defineProperty(exports, "NpcFollowConfig", {
      enumerable: !0,
      get: function () {
        return npc_follow_config_js_1.NpcFollowConfig;
      },
    }),
    require("./fb-action/npc-leisure-interact.js")),
  npc_new_spline_move_target_js_1 =
    (Object.defineProperty(exports, "NpcLeisureInteract", {
      enumerable: !0,
      get: function () {
        return npc_leisure_interact_js_1.NpcLeisureInteract;
      },
    }),
    require("./fb-action/npc-new-spline-move-target.js")),
  npc_sit_down_js_1 =
    (Object.defineProperty(exports, "NpcNewSplineMoveTarget", {
      enumerable: !0,
      get: function () {
        return npc_new_spline_move_target_js_1.NpcNewSplineMoveTarget;
      },
    }),
    require("./fb-action/npc-sit-down.js")),
  number_var_js_1 =
    (Object.defineProperty(exports, "NpcSitDown", {
      enumerable: !0,
      get: function () {
        return npc_sit_down_js_1.NpcSitDown;
      },
    }),
    require("./fb-action/number-var.js")),
  open_air_wall_js_1 =
    (Object.defineProperty(exports, "NumberVar", {
      enumerable: !0,
      get: function () {
        return number_var_js_1.NumberVar;
      },
    }),
    require("./fb-action/open-air-wall.js")),
  open_confirm_box_with_return_js_1 =
    (Object.defineProperty(exports, "OpenAirWall", {
      enumerable: !0,
      get: function () {
        return open_air_wall_js_1.OpenAirWall;
      },
    }),
    require("./fb-action/open-confirm-box-with-return.js")),
  open_fishing_item_delivery_with_return_js_1 =
    (Object.defineProperty(exports, "OpenConfirmBoxWithReturn", {
      enumerable: !0,
      get: function () {
        return open_confirm_box_with_return_js_1.OpenConfirmBoxWithReturn;
      },
    }),
    require("./fb-action/open-fishing-item-delivery-with-return.js")),
  open_global_time_scale_js_1 =
    (Object.defineProperty(exports, "OpenFishingItemDeliveryWithReturn", {
      enumerable: !0,
      get: function () {
        return open_fishing_item_delivery_with_return_js_1.OpenFishingItemDeliveryWithReturn;
      },
    }),
    require("./fb-action/open-global-time-scale.js")),
  open_gravity_js_1 =
    (Object.defineProperty(exports, "OpenGlobalTimeScale", {
      enumerable: !0,
      get: function () {
        return open_global_time_scale_js_1.OpenGlobalTimeScale;
      },
    }),
    require("./fb-action/open-gravity.js")),
  open_level_qte_js_1 =
    (Object.defineProperty(exports, "OpenGravity", {
      enumerable: !0,
      get: function () {
        return open_gravity_js_1.OpenGravity;
      },
    }),
    require("./fb-action/open-level-qte.js")),
  open_panel_qte_qte_js_1 =
    (Object.defineProperty(exports, "OpenLevelQte", {
      enumerable: !0,
      get: function () {
        return open_level_qte_js_1.OpenLevelQte;
      },
    }),
    require("./fb-action/open-panel-qte-qte.js")),
  open_qte_action_js_1 =
    (Object.defineProperty(exports, "OpenPanelQteQte", {
      enumerable: !0,
      get: function () {
        return open_panel_qte_qte_js_1.OpenPanelQteQte;
      },
    }),
    require("./fb-action/open-qte-action.js")),
  open_simple_gameplay_js_1 =
    (Object.defineProperty(exports, "OpenQteAction", {
      enumerable: !0,
      get: function () {
        return open_qte_action_js_1.OpenQteAction;
      },
    }),
    require("./fb-action/open-simple-gameplay.js")),
  open_ski_config_js_1 =
    (Object.defineProperty(exports, "OpenSimpleGameplay", {
      enumerable: !0,
      get: function () {
        return open_simple_gameplay_js_1.OpenSimpleGameplay;
      },
    }),
    require("./fb-action/open-ski-config.js")),
  open_soaring_challenge_result_with_return_js_1 =
    (Object.defineProperty(exports, "OpenSkiConfig", {
      enumerable: !0,
      get: function () {
        return open_ski_config_js_1.OpenSkiConfig;
      },
    }),
    require("./fb-action/open-soaring-challenge-result-with-return.js")),
  open_spline_move_js_1 =
    (Object.defineProperty(exports, "OpenSoaringChallengeResultWithReturn", {
      enumerable: !0,
      get: function () {
        return open_soaring_challenge_result_with_return_js_1.OpenSoaringChallengeResultWithReturn;
      },
    }),
    require("./fb-action/open-spline-move.js")),
  open_system_board_js_1 =
    (Object.defineProperty(exports, "OpenSplineMove", {
      enumerable: !0,
      get: function () {
        return open_spline_move_js_1.OpenSplineMove;
      },
    }),
    require("./fb-action/open-system-board.js")),
  open_system_board_with_return_js_1 =
    (Object.defineProperty(exports, "OpenSystemBoard", {
      enumerable: !0,
      get: function () {
        return open_system_board_js_1.OpenSystemBoard;
      },
    }),
    require("./fb-action/open-system-board-with-return.js")),
  open_system_function_js_1 =
    (Object.defineProperty(exports, "OpenSystemBoardWithReturn", {
      enumerable: !0,
      get: function () {
        return open_system_board_with_return_js_1.OpenSystemBoardWithReturn;
      },
    }),
    require("./fb-action/open-system-function.js")),
  open_trace_spline_js_1 =
    (Object.defineProperty(exports, "OpenSystemFunction", {
      enumerable: !0,
      get: function () {
        return open_system_function_js_1.OpenSystemFunction;
      },
    }),
    require("./fb-action/open-trace-spline.js")),
  option_lock_tip_js_1 =
    (Object.defineProperty(exports, "OpenTraceSpline", {
      enumerable: !0,
      get: function () {
        return open_trace_spline_js_1.OpenTraceSpline;
      },
    }),
    require("./fb-action/option-lock-tip.js")),
  path_line_move_js_1 =
    (Object.defineProperty(exports, "OptionLockTip", {
      enumerable: !0,
      get: function () {
        return option_lock_tip_js_1.OptionLockTip;
      },
    }),
    require("./fb-action/path-line-move.js")),
  perception_notify_gather_to_entity_js_1 =
    (Object.defineProperty(exports, "PathLineMove", {
      enumerable: !0,
      get: function () {
        return path_line_move_js_1.PathLineMove;
      },
    }),
    require("./fb-action/perception-notify-gather-to-entity.js")),
  perception_notify_gather_to_player_js_1 =
    (Object.defineProperty(exports, "PerceptionNotifyGatherToEntity", {
      enumerable: !0,
      get: function () {
        return perception_notify_gather_to_entity_js_1.PerceptionNotifyGatherToEntity;
      },
    }),
    require("./fb-action/perception-notify-gather-to-player.js")),
  performer_ai_move_to_js_1 =
    (Object.defineProperty(exports, "PerceptionNotifyGatherToPlayer", {
      enumerable: !0,
      get: function () {
        return perception_notify_gather_to_player_js_1.PerceptionNotifyGatherToPlayer;
      },
    }),
    require("./fb-action/performer-ai-move-to.js")),
  performer_ai_move_to_entity_js_1 =
    (Object.defineProperty(exports, "PerformerAiMoveTo", {
      enumerable: !0,
      get: function () {
        return performer_ai_move_to_js_1.PerformerAiMoveTo;
      },
    }),
    require("./fb-action/performer-ai-move-to-entity.js")),
  performer_ai_move_to_player_js_1 =
    (Object.defineProperty(exports, "PerformerAiMoveToEntity", {
      enumerable: !0,
      get: function () {
        return performer_ai_move_to_entity_js_1.PerformerAiMoveToEntity;
      },
    }),
    require("./fb-action/performer-ai-move-to-player.js")),
  performer_ai_move_to_position_js_1 =
    (Object.defineProperty(exports, "PerformerAiMoveToPlayer", {
      enumerable: !0,
      get: function () {
        return performer_ai_move_to_player_js_1.PerformerAiMoveToPlayer;
      },
    }),
    require("./fb-action/performer-ai-move-to-position.js")),
  performer_ai_spline_move_js_1 =
    (Object.defineProperty(exports, "PerformerAiMoveToPosition", {
      enumerable: !0,
      get: function () {
        return performer_ai_move_to_position_js_1.PerformerAiMoveToPosition;
      },
    }),
    require("./fb-action/performer-ai-spline-move.js")),
  performer_range_boundary_action_trigger_js_1 =
    (Object.defineProperty(exports, "PerformerAiSplineMove", {
      enumerable: !0,
      get: function () {
        return performer_ai_spline_move_js_1.PerformerAiSplineMove;
      },
    }),
    require("./fb-action/performer-range-boundary-action-trigger.js")),
  photograph_config_js_1 =
    (Object.defineProperty(exports, "PerformerRangeBoundaryActionTrigger", {
      enumerable: !0,
      get: function () {
        return performer_range_boundary_action_trigger_js_1.PerformerRangeBoundaryActionTrigger;
      },
    }),
    require("./fb-action/photograph-config.js")),
  piece_index_js_1 =
    (Object.defineProperty(exports, "PhotographConfig", {
      enumerable: !0,
      get: function () {
        return photograph_config_js_1.PhotographConfig;
      },
    }),
    require("./fb-action/piece-index.js")),
  play_bubble_js_1 =
    (Object.defineProperty(exports, "PieceIndex", {
      enumerable: !0,
      get: function () {
        return piece_index_js_1.PieceIndex;
      },
    }),
    require("./fb-action/play-bubble.js")),
  play_common_effect_js_1 =
    (Object.defineProperty(exports, "PlayBubble", {
      enumerable: !0,
      get: function () {
        return play_bubble_js_1.PlayBubble;
      },
    }),
    require("./fb-action/play-common-effect.js")),
  play_custom_sequence_js_1 =
    (Object.defineProperty(exports, "PlayCommonEffect", {
      enumerable: !0,
      get: function () {
        return play_common_effect_js_1.PlayCommonEffect;
      },
    }),
    require("./fb-action/play-custom-sequence.js")),
  play_dynamic_settlement_js_1 =
    (Object.defineProperty(exports, "PlayCustomSequence", {
      enumerable: !0,
      get: function () {
        return play_custom_sequence_js_1.PlayCustomSequence;
      },
    }),
    require("./fb-action/play-dynamic-settlement.js")),
  play_effect_js_1 =
    (Object.defineProperty(exports, "PlayDynamicSettlement", {
      enumerable: !0,
      get: function () {
        return play_dynamic_settlement_js_1.PlayDynamicSettlement;
      },
    }),
    require("./fb-action/play-effect.js")),
  play_flow_js_1 =
    (Object.defineProperty(exports, "PlayEffect", {
      enumerable: !0,
      get: function () {
        return play_effect_js_1.PlayEffect;
      },
    }),
    require("./fb-action/play-flow.js")),
  play_guest_cartethyia_js_1 =
    (Object.defineProperty(exports, "PlayFlow", {
      enumerable: !0,
      get: function () {
        return play_flow_js_1.PlayFlow;
      },
    }),
    require("./fb-action/play-guest-cartethyia.js")),
  play_guest_ui_animation_js_1 =
    (Object.defineProperty(exports, "PlayGuestCartethyia", {
      enumerable: !0,
      get: function () {
        return play_guest_cartethyia_js_1.PlayGuestCartethyia;
      },
    }),
    require("./fb-action/play-guest-ui-animation.js")),
  play_level_sequence_js_1 =
    (Object.defineProperty(exports, "PlayGuestUiAnimation", {
      enumerable: !0,
      get: function () {
        return play_guest_ui_animation_js_1.PlayGuestUiAnimation;
      },
    }),
    require("./fb-action/play-level-sequence.js")),
  play_montage_js_1 =
    (Object.defineProperty(exports, "PlayLevelSequence", {
      enumerable: !0,
      get: function () {
        return play_level_sequence_js_1.PlayLevelSequence;
      },
    }),
    require("./fb-action/play-montage.js")),
  play_movie_js_1 =
    (Object.defineProperty(exports, "PlayMontage", {
      enumerable: !0,
      get: function () {
        return play_montage_js_1.PlayMontage;
      },
    }),
    require("./fb-action/play-movie.js")),
  play_registered_montage_js_1 =
    (Object.defineProperty(exports, "PlayMovie", {
      enumerable: !0,
      get: function () {
        return play_movie_js_1.PlayMovie;
      },
    }),
    require("./fb-action/play-registered-montage.js")),
  play_sequence_data_js_1 =
    (Object.defineProperty(exports, "PlayRegisteredMontage", {
      enumerable: !0,
      get: function () {
        return play_registered_montage_js_1.PlayRegisteredMontage;
      },
    }),
    require("./fb-action/play-sequence-data.js")),
  play_spine_animation_js_1 =
    (Object.defineProperty(exports, "PlaySequenceData", {
      enumerable: !0,
      get: function () {
        return play_sequence_data_js_1.PlaySequenceData;
      },
    }),
    require("./fb-action/play-spine-animation.js")),
  play_voice_passengers_config_js_1 =
    (Object.defineProperty(exports, "PlaySpineAnimation", {
      enumerable: !0,
      get: function () {
        return play_spine_animation_js_1.PlaySpineAnimation;
      },
    }),
    require("./fb-action/play-voice-passengers-config.js")),
  player_entity_js_1 =
    (Object.defineProperty(exports, "PlayVoicePassengersConfig", {
      enumerable: !0,
      get: function () {
        return play_voice_passengers_config_js_1.PlayVoicePassengersConfig;
      },
    }),
    require("./fb-action/player-entity.js")),
  player_input_js_1 =
    (Object.defineProperty(exports, "PlayerEntity", {
      enumerable: !0,
      get: function () {
        return player_entity_js_1.PlayerEntity;
      },
    }),
    require("./fb-action/player-input.js")),
  player_look_at_js_1 =
    (Object.defineProperty(exports, "PlayerInput", {
      enumerable: !0,
      get: function () {
        return player_input_js_1.PlayerInput;
      },
    }),
    require("./fb-action/player-look-at.js")),
  player_new_spline_move_target_js_1 =
    (Object.defineProperty(exports, "PlayerLookAt", {
      enumerable: !0,
      get: function () {
        return player_look_at_js_1.PlayerLookAt;
      },
    }),
    require("./fb-action/player-new-spline-move-target.js")),
  player_pos2_js_1 =
    (Object.defineProperty(exports, "PlayerNewSplineMoveTarget", {
      enumerable: !0,
      get: function () {
        return player_new_spline_move_target_js_1.PlayerNewSplineMoveTarget;
      },
    }),
    require("./fb-action/player-pos2.js")),
  player_spline_move_target_js_1 =
    (Object.defineProperty(exports, "PlayerPos2", {
      enumerable: !0,
      get: function () {
        return player_pos2_js_1.PlayerPos2;
      },
    }),
    require("./fb-action/player-spline-move-target.js")),
  pos_a_js_1 =
    (Object.defineProperty(exports, "PlayerSplineMoveTarget", {
      enumerable: !0,
      get: function () {
        return player_spline_move_target_js_1.PlayerSplineMoveTarget;
      },
    }),
    require("./fb-action/pos-a.js")),
  pos_and_rot_js_1 =
    (Object.defineProperty(exports, "PosA", {
      enumerable: !0,
      get: function () {
        return pos_a_js_1.PosA;
      },
    }),
    require("./fb-action/pos-and-rot.js")),
  pos_rot_js_1 =
    (Object.defineProperty(exports, "PosAndRot", {
      enumerable: !0,
      get: function () {
        return pos_and_rot_js_1.PosAndRot;
      },
    }),
    require("./fb-action/pos-rot.js")),
  post_ak_event_js_1 =
    (Object.defineProperty(exports, "PosRot", {
      enumerable: !0,
      get: function () {
        return pos_rot_js_1.PosRot;
      },
    }),
    require("./fb-action/post-ak-event.js")),
  post_ak_event_global_js_1 =
    (Object.defineProperty(exports, "PostAkEvent", {
      enumerable: !0,
      get: function () {
        return post_ak_event_js_1.PostAkEvent;
      },
    }),
    require("./fb-action/post-ak-event-global.js")),
  post_ak_event_targeted_js_1 =
    (Object.defineProperty(exports, "PostAkEventGlobal", {
      enumerable: !0,
      get: function () {
        return post_ak_event_global_js_1.PostAkEventGlobal;
      },
    }),
    require("./fb-action/post-ak-event-targeted.js")),
  prefab_config_js_1 =
    (Object.defineProperty(exports, "PostAkEventTargeted", {
      enumerable: !0,
      get: function () {
        return post_ak_event_targeted_js_1.PostAkEventTargeted;
      },
    }),
    require("./fb-action/prefab-config.js")),
  preload_action_js_1 =
    (Object.defineProperty(exports, "PrefabConfig", {
      enumerable: !0,
      get: function () {
        return prefab_config_js_1.PrefabConfig;
      },
    }),
    require("./fb-action/preload-action.js")),
  preload_flows_js_1 =
    (Object.defineProperty(exports, "PreloadAction", {
      enumerable: !0,
      get: function () {
        return preload_action_js_1.PreloadAction;
      },
    }),
    require("./fb-action/preload-flows.js")),
  preload_phantom_character_for_skill_js_1 =
    (Object.defineProperty(exports, "PreloadFlows", {
      enumerable: !0,
      get: function () {
        return preload_flows_js_1.PreloadFlows;
      },
    }),
    require("./fb-action/preload-phantom-character-for-skill.js")),
  preload_sub_levels_js_1 =
    (Object.defineProperty(exports, "PreloadPhantomCharacterForSkill", {
      enumerable: !0,
      get: function () {
        return preload_phantom_character_for_skill_js_1.PreloadPhantomCharacterForSkill;
      },
    }),
    require("./fb-action/preload-sub-levels.js")),
  preload_trial_character_for_skill_js_1 =
    (Object.defineProperty(exports, "PreloadSubLevels", {
      enumerable: !0,
      get: function () {
        return preload_sub_levels_js_1.PreloadSubLevels;
      },
    }),
    require("./fb-action/preload-trial-character-for-skill.js")),
  prompt_js_1 =
    (Object.defineProperty(exports, "PreloadTrialCharacterForSkill", {
      enumerable: !0,
      get: function () {
        return preload_trial_character_for_skill_js_1.PreloadTrialCharacterForSkill;
      },
    }),
    require("./fb-action/prompt.js")),
  prompt_quest_chapter_ui_js_1 =
    (Object.defineProperty(exports, "Prompt", {
      enumerable: !0,
      get: function () {
        return prompt_js_1.Prompt;
      },
    }),
    require("./fb-action/prompt-quest-chapter-ui.js")),
  punish_report_js_1 =
    (Object.defineProperty(exports, "PromptQuestChapterUI", {
      enumerable: !0,
      get: function () {
        return prompt_quest_chapter_ui_js_1.PromptQuestChapterUI;
      },
    }),
    require("./fb-action/punish-report.js")),
  quest_var_context_js_1 =
    (Object.defineProperty(exports, "PunishReport", {
      enumerable: !0,
      get: function () {
        return punish_report_js_1.PunishReport;
      },
    }),
    require("./fb-action/quest-var-context.js")),
  racing_track_move_js_1 =
    (Object.defineProperty(exports, "QuestVarContext", {
      enumerable: !0,
      get: function () {
        return quest_var_context_js_1.QuestVarContext;
      },
    }),
    require("./fb-action/racing-track-move.js")),
  random_prefab_config_js_1 =
    (Object.defineProperty(exports, "RacingTrackMove", {
      enumerable: !0,
      get: function () {
        return racing_track_move_js_1.RacingTrackMove;
      },
    }),
    require("./fb-action/random-prefab-config.js")),
  random_var_js_1 =
    (Object.defineProperty(exports, "RandomPrefabConfig", {
      enumerable: !0,
      get: function () {
        return random_prefab_config_js_1.RandomPrefabConfig;
      },
    }),
    require("./fb-action/random-var.js")),
  record_dungeon_event_js_1 =
    (Object.defineProperty(exports, "RandomVar", {
      enumerable: !0,
      get: function () {
        return random_var_js_1.RandomVar;
      },
    }),
    require("./fb-action/record-dungeon-event.js")),
  record_talk_sequence_transition_js_1 =
    (Object.defineProperty(exports, "RecordDungeonEvent", {
      enumerable: !0,
      get: function () {
        return record_dungeon_event_js_1.RecordDungeonEvent;
      },
    }),
    require("./fb-action/record-talk-sequence-transition.js")),
  record_time_stamp_type_js_1 =
    (Object.defineProperty(exports, "RecordTalkSequenceTransition", {
      enumerable: !0,
      get: function () {
        return record_talk_sequence_transition_js_1.RecordTalkSequenceTransition;
      },
    }),
    require("./fb-action/record-time-stamp-type.js")),
  recover_durability_js_1 =
    (Object.defineProperty(exports, "RecordTimeStampType", {
      enumerable: !0,
      get: function () {
        return record_time_stamp_type_js_1.RecordTimeStampType;
      },
    }),
    require("./fb-action/recover-durability.js")),
  reduce_time_js_1 =
    (Object.defineProperty(exports, "RecoverDurability", {
      enumerable: !0,
      get: function () {
        return recover_durability_js_1.RecoverDurability;
      },
    }),
    require("./fb-action/reduce-time.js")),
  remain_star_warning_js_1 =
    (Object.defineProperty(exports, "ReduceTime", {
      enumerable: !0,
      get: function () {
        return reduce_time_js_1.ReduceTime;
      },
    }),
    require("./fb-action/remain-star-warning.js")),
  remove_buff_from_entity_js_1 =
    (Object.defineProperty(exports, "RemainStarWarning", {
      enumerable: !0,
      get: function () {
        return remain_star_warning_js_1.RemainStarWarning;
      },
    }),
    require("./fb-action/remove-buff-from-entity.js")),
  remove_buff_from_player_js_1 =
    (Object.defineProperty(exports, "RemoveBuffFromEntity", {
      enumerable: !0,
      get: function () {
        return remove_buff_from_entity_js_1.RemoveBuffFromEntity;
      },
    }),
    require("./fb-action/remove-buff-from-player.js")),
  remove_buff_to_triggered_entity_js_1 =
    (Object.defineProperty(exports, "RemoveBuffFromPlayer", {
      enumerable: !0,
      get: function () {
        return remove_buff_from_player_js_1.RemoveBuffFromPlayer;
      },
    }),
    require("./fb-action/remove-buff-to-triggered-entity.js")),
  remove_flow_interact_option_js_1 =
    (Object.defineProperty(exports, "RemoveBuffToTriggeredEntity", {
      enumerable: !0,
      get: function () {
        return remove_buff_to_triggered_entity_js_1.RemoveBuffToTriggeredEntity;
      },
    }),
    require("./fb-action/remove-flow-interact-option.js")),
  remove_guest_character_js_1 =
    (Object.defineProperty(exports, "RemoveFlowInteractOption", {
      enumerable: !0,
      get: function () {
        return remove_flow_interact_option_js_1.RemoveFlowInteractOption;
      },
    }),
    require("./fb-action/remove-guest-character.js")),
  remove_preload_resource_action_js_1 =
    (Object.defineProperty(exports, "RemoveGuestCharacter", {
      enumerable: !0,
      get: function () {
        return remove_guest_character_js_1.RemoveGuestCharacter;
      },
    }),
    require("./fb-action/remove-preload-resource-action.js")),
  remove_preload_resource_phantom_character_js_1 =
    (Object.defineProperty(exports, "RemovePreloadResourceAction", {
      enumerable: !0,
      get: function () {
        return remove_preload_resource_action_js_1.RemovePreloadResourceAction;
      },
    }),
    require("./fb-action/remove-preload-resource-phantom-character.js")),
  remove_preload_resource_trial_character_js_1 =
    (Object.defineProperty(exports, "RemovePreloadResourcePhantomCharacter", {
      enumerable: !0,
      get: function () {
        return remove_preload_resource_phantom_character_js_1.RemovePreloadResourcePhantomCharacter;
      },
    }),
    require("./fb-action/remove-preload-resource-trial-character.js")),
  remove_trial_character_js_1 =
    (Object.defineProperty(exports, "RemovePreloadResourceTrialCharacter", {
      enumerable: !0,
      get: function () {
        return remove_preload_resource_trial_character_js_1.RemovePreloadResourceTrialCharacter;
      },
    }),
    require("./fb-action/remove-trial-character.js")),
  remove_trial_follow_shooter_js_1 =
    (Object.defineProperty(exports, "RemoveTrialCharacter", {
      enumerable: !0,
      get: function () {
        return remove_trial_character_js_1.RemoveTrialCharacter;
      },
    }),
    require("./fb-action/remove-trial-follow-shooter.js")),
  renju_chess_js_1 =
    (Object.defineProperty(exports, "RemoveTrialFollowShooter", {
      enumerable: !0,
      get: function () {
        return remove_trial_follow_shooter_js_1.RemoveTrialFollowShooter;
      },
    }),
    require("./fb-action/renju-chess.js")),
  reset_entity_js_1 =
    (Object.defineProperty(exports, "RenjuChess", {
      enumerable: !0,
      get: function () {
        return renju_chess_js_1.RenjuChess;
      },
    }),
    require("./fb-action/reset-entity.js")),
  reset_entity_pos_js_1 =
    (Object.defineProperty(exports, "ResetEntity", {
      enumerable: !0,
      get: function () {
        return reset_entity_js_1.ResetEntity;
      },
    }),
    require("./fb-action/reset-entity-pos.js")),
  reset_focus_config_js_1 =
    (Object.defineProperty(exports, "ResetEntityPos", {
      enumerable: !0,
      get: function () {
        return reset_entity_pos_js_1.ResetEntityPos;
      },
    }),
    require("./fb-action/reset-focus-config.js")),
  reset_level_play_js_1 =
    (Object.defineProperty(exports, "ResetFocusConfig", {
      enumerable: !0,
      get: function () {
        return reset_focus_config_js_1.ResetFocusConfig;
      },
    }),
    require("./fb-action/reset-level-play.js")),
  reset_player_camera_focus_js_1 =
    (Object.defineProperty(exports, "ResetLevelPlay", {
      enumerable: !0,
      get: function () {
        return reset_level_play_js_1.ResetLevelPlay;
      },
    }),
    require("./fb-action/reset-player-camera-focus.js")),
  reset_player_focus_to_default_direction_js_1 =
    (Object.defineProperty(exports, "ResetPlayerCameraFocus", {
      enumerable: !0,
      get: function () {
        return reset_player_camera_focus_js_1.ResetPlayerCameraFocus;
      },
    }),
    require("./fb-action/reset-player-focus-to-default-direction.js")),
  reset_player_focus_to_fixed_direction_js_1 =
    (Object.defineProperty(exports, "ResetPlayerFocusToDefaultDirection", {
      enumerable: !0,
      get: function () {
        return reset_player_focus_to_default_direction_js_1.ResetPlayerFocusToDefaultDirection;
      },
    }),
    require("./fb-action/reset-player-focus-to-fixed-direction.js")),
  reset_tele_control_entity_js_1 =
    (Object.defineProperty(exports, "ResetPlayerFocusToFixedDirection", {
      enumerable: !0,
      get: function () {
        return reset_player_focus_to_fixed_direction_js_1.ResetPlayerFocusToFixedDirection;
      },
    }),
    require("./fb-action/reset-tele-control-entity.js")),
  restore_phantom_js_1 =
    (Object.defineProperty(exports, "ResetTeleControlEntity", {
      enumerable: !0,
      get: function () {
        return reset_tele_control_entity_js_1.ResetTeleControlEntity;
      },
    }),
    require("./fb-action/restore-phantom.js")),
  restore_phantom_formation_js_1 =
    (Object.defineProperty(exports, "RestorePhantom", {
      enumerable: !0,
      get: function () {
        return restore_phantom_js_1.RestorePhantom;
      },
    }),
    require("./fb-action/restore-phantom-formation.js")),
  restore_player_camera_adjustment_js_1 =
    (Object.defineProperty(exports, "RestorePhantomFormation", {
      enumerable: !0,
      get: function () {
        return restore_phantom_formation_js_1.RestorePhantomFormation;
      },
    }),
    require("./fb-action/restore-player-camera-adjustment.js")),
  rogue_activate_portal_js_1 =
    (Object.defineProperty(exports, "RestorePlayerCameraAdjustment", {
      enumerable: !0,
      get: function () {
        return restore_player_camera_adjustment_js_1.RestorePlayerCameraAdjustment;
      },
    }),
    require("./fb-action/rogue-activate-portal.js")),
  rogue_goto_next_floor_js_1 =
    (Object.defineProperty(exports, "RogueActivatePortal", {
      enumerable: !0,
      get: function () {
        return rogue_activate_portal_js_1.RogueActivatePortal;
      },
    }),
    require("./fb-action/rogue-goto-next-floor.js")),
  rogue_prefab_config_js_1 =
    (Object.defineProperty(exports, "RogueGotoNextFloor", {
      enumerable: !0,
      get: function () {
        return rogue_goto_next_floor_js_1.RogueGotoNextFloor;
      },
    }),
    require("./fb-action/rogue-prefab-config.js")),
  rogue_receive_reward_js_1 =
    (Object.defineProperty(exports, "RoguePrefabConfig", {
      enumerable: !0,
      get: function () {
        return rogue_prefab_config_js_1.RoguePrefabConfig;
      },
    }),
    require("./fb-action/rogue-receive-reward.js")),
  rogue_role_select_room_js_1 =
    (Object.defineProperty(exports, "RogueReceiveReward", {
      enumerable: !0,
      get: function () {
        return rogue_receive_reward_js_1.RogueReceiveReward;
      },
    }),
    require("./fb-action/rogue-role-select-room.js")),
  rogue_select_room_js_1 =
    (Object.defineProperty(exports, "RogueRoleSelectRoom", {
      enumerable: !0,
      get: function () {
        return rogue_role_select_room_js_1.RogueRoleSelectRoom;
      },
    }),
    require("./fb-action/rogue-select-room.js")),
  rotator_entity_js_1 =
    (Object.defineProperty(exports, "RogueSelectRoom", {
      enumerable: !0,
      get: function () {
        return rogue_select_room_js_1.RogueSelectRoom;
      },
    }),
    require("./fb-action/rotator-entity.js")),
  run_actions_js_1 =
    (Object.defineProperty(exports, "RotatorEntity", {
      enumerable: !0,
      get: function () {
        return rotator_entity_js_1.RotatorEntity;
      },
    }),
    require("./fb-action/run-actions.js")),
  safe_pos_js_1 =
    (Object.defineProperty(exports, "RunActions", {
      enumerable: !0,
      get: function () {
        return run_actions_js_1.RunActions;
      },
    }),
    require("./fb-action/safe-pos.js")),
  scene_item_new_spline_move_target_js_1 =
    (Object.defineProperty(exports, "SafePos", {
      enumerable: !0,
      get: function () {
        return safe_pos_js_1.SafePos;
      },
    }),
    require("./fb-action/scene-item-new-spline-move-target.js")),
  self_entity_js_1 =
    (Object.defineProperty(exports, "SceneItemNewSplineMoveTarget", {
      enumerable: !0,
      get: function () {
        return scene_item_new_spline_move_target_js_1.SceneItemNewSplineMoveTarget;
      },
    }),
    require("./fb-action/self-entity.js")),
  send_ai_event_js_1 =
    (Object.defineProperty(exports, "SelfEntity", {
      enumerable: !0,
      get: function () {
        return self_entity_js_1.SelfEntity;
      },
    }),
    require("./fb-action/send-ai-event.js")),
  send_npc_mail_js_1 =
    (Object.defineProperty(exports, "SendAiEvent", {
      enumerable: !0,
      get: function () {
        return send_ai_event_js_1.SendAiEvent;
      },
    }),
    require("./fb-action/send-npc-mail.js")),
  sequence_frame_event_js_1 =
    (Object.defineProperty(exports, "SendNpcMail", {
      enumerable: !0,
      get: function () {
        return send_npc_mail_js_1.SendNpcMail;
      },
    }),
    require("./fb-action/sequence-frame-event.js")),
  server_force_enable_level_play_js_1 =
    (Object.defineProperty(exports, "SequenceFrameEvent", {
      enumerable: !0,
      get: function () {
        return sequence_frame_event_js_1.SequenceFrameEvent;
      },
    }),
    require("./fb-action/server-force-enable-level-play.js")),
  server_set_player_pos_js_1 =
    (Object.defineProperty(exports, "ServerForceEnableLevelPlay", {
      enumerable: !0,
      get: function () {
        return server_force_enable_level_play_js_1.ServerForceEnableLevelPlay;
      },
    }),
    require("./fb-action/server-set-player-pos.js")),
  set_alert_ui_visible_js_1 =
    (Object.defineProperty(exports, "ServerSetPlayerPos", {
      enumerable: !0,
      get: function () {
        return server_set_player_pos_js_1.ServerSetPlayerPos;
      },
    }),
    require("./fb-action/set-alert-ui-visible.js")),
  set_area_state_js_1 =
    (Object.defineProperty(exports, "SetAlertUiVisible", {
      enumerable: !0,
      get: function () {
        return set_alert_ui_visible_js_1.SetAlertUiVisible;
      },
    }),
    require("./fb-action/set-area-state.js")),
  set_area_time_lock_js_1 =
    (Object.defineProperty(exports, "SetAreaState", {
      enumerable: !0,
      get: function () {
        return set_area_state_js_1.SetAreaState;
      },
    }),
    require("./fb-action/set-area-time-lock.js")),
  set_area_time_state_js_1 =
    (Object.defineProperty(exports, "SetAreaTimeLock", {
      enumerable: !0,
      get: function () {
        return set_area_time_lock_js_1.SetAreaTimeLock;
      },
    }),
    require("./fb-action/set-area-time-state.js")),
  set_area_time_un_lock_js_1 =
    (Object.defineProperty(exports, "SetAreaTimeState", {
      enumerable: !0,
      get: function () {
        return set_area_time_state_js_1.SetAreaTimeState;
      },
    }),
    require("./fb-action/set-area-time-un-lock.js")),
  set_audio_state_js_1 =
    (Object.defineProperty(exports, "SetAreaTimeUnLock", {
      enumerable: !0,
      get: function () {
        return set_area_time_un_lock_js_1.SetAreaTimeUnLock;
      },
    }),
    require("./fb-action/set-audio-state.js")),
  set_battle_state_js_1 =
    (Object.defineProperty(exports, "SetAudioState", {
      enumerable: !0,
      get: function () {
        return set_audio_state_js_1.SetAudioState;
      },
    }),
    require("./fb-action/set-battle-state.js")),
  set_battle_tag_js_1 =
    (Object.defineProperty(exports, "SetBattleState", {
      enumerable: !0,
      get: function () {
        return set_battle_state_js_1.SetBattleState;
      },
    }),
    require("./fb-action/set-battle-tag.js")),
  set_battle_tag_config_js_1 =
    (Object.defineProperty(exports, "SetBattleTag", {
      enumerable: !0,
      get: function () {
        return set_battle_tag_js_1.SetBattleTag;
      },
    }),
    require("./fb-action/set-battle-tag-config.js")),
  set_battle_tags_js_1 =
    (Object.defineProperty(exports, "SetBattleTagConfig", {
      enumerable: !0,
      get: function () {
        return set_battle_tag_config_js_1.SetBattleTagConfig;
      },
    }),
    require("./fb-action/set-battle-tags.js")),
  set_behavior_is_paused_js_1 =
    (Object.defineProperty(exports, "SetBattleTags", {
      enumerable: !0,
      get: function () {
        return set_battle_tags_js_1.SetBattleTags;
      },
    }),
    require("./fb-action/set-behavior-is-paused.js")),
  set_camera_anim_js_1 =
    (Object.defineProperty(exports, "SetBehaviorIsPaused", {
      enumerable: !0,
      get: function () {
        return set_behavior_is_paused_js_1.SetBehaviorIsPaused;
      },
    }),
    require("./fb-action/set-camera-anim.js")),
  set_camera_mode_js_1 =
    (Object.defineProperty(exports, "SetCameraAnim", {
      enumerable: !0,
      get: function () {
        return set_camera_anim_js_1.SetCameraAnim;
      },
    }),
    require("./fb-action/set-camera-mode.js")),
  set_entity_client_visible_js_1 =
    (Object.defineProperty(exports, "SetCameraMode", {
      enumerable: !0,
      get: function () {
        return set_camera_mode_js_1.SetCameraMode;
      },
    }),
    require("./fb-action/set-entity-client-visible.js")),
  set_entity_client_visible_save_js_1 =
    (Object.defineProperty(exports, "SetEntityClientVisible", {
      enumerable: !0,
      get: function () {
        return set_entity_client_visible_js_1.SetEntityClientVisible;
      },
    }),
    require("./fb-action/set-entity-client-visible-save.js")),
  set_entity_pos_js_1 =
    (Object.defineProperty(exports, "SetEntityClientVisibleSave", {
      enumerable: !0,
      get: function () {
        return set_entity_client_visible_save_js_1.SetEntityClientVisibleSave;
      },
    }),
    require("./fb-action/set-entity-pos.js")),
  set_entity_tag_js_1 =
    (Object.defineProperty(exports, "SetEntityPos", {
      enumerable: !0,
      get: function () {
        return set_entity_pos_js_1.SetEntityPos;
      },
    }),
    require("./fb-action/set-entity-tag.js")),
  set_entity_visible_js_1 =
    (Object.defineProperty(exports, "SetEntityTag", {
      enumerable: !0,
      get: function () {
        return set_entity_tag_js_1.SetEntityTag;
      },
    }),
    require("./fb-action/set-entity-visible.js")),
  set_explore_state_js_1 =
    (Object.defineProperty(exports, "SetEntityVisible", {
      enumerable: !0,
      get: function () {
        return set_entity_visible_js_1.SetEntityVisible;
      },
    }),
    require("./fb-action/set-explore-state.js")),
  set_flow_template_js_1 =
    (Object.defineProperty(exports, "SetExploreState", {
      enumerable: !0,
      get: function () {
        return set_explore_state_js_1.SetExploreState;
      },
    }),
    require("./fb-action/set-flow-template.js")),
  set_force_lock_js_1 =
    (Object.defineProperty(exports, "SetFlowTemplate", {
      enumerable: !0,
      get: function () {
        return set_flow_template_js_1.SetFlowTemplate;
      },
    }),
    require("./fb-action/set-force-lock.js")),
  set_global_time_scale_js_1 =
    (Object.defineProperty(exports, "SetForceLock", {
      enumerable: !0,
      get: function () {
        return set_force_lock_js_1.SetForceLock;
      },
    }),
    require("./fb-action/set-global-time-scale.js")),
  set_head_icon_visible_js_1 =
    (Object.defineProperty(exports, "SetGlobalTimeScale", {
      enumerable: !0,
      get: function () {
        return set_global_time_scale_js_1.SetGlobalTimeScale;
      },
    }),
    require("./fb-action/set-head-icon-visible.js")),
  set_interaction_lock_state_js_1 =
    (Object.defineProperty(exports, "SetHeadIconVisible", {
      enumerable: !0,
      get: function () {
        return set_head_icon_visible_js_1.SetHeadIconVisible;
      },
    }),
    require("./fb-action/set-interaction-lock-state.js")),
  set_jigsaw_foundation_js_1 =
    (Object.defineProperty(exports, "SetInteractionLockState", {
      enumerable: !0,
      get: function () {
        return set_interaction_lock_state_js_1.SetInteractionLockState;
      },
    }),
    require("./fb-action/set-jigsaw-foundation.js")),
  set_jigsaw_item_js_1 =
    (Object.defineProperty(exports, "SetJigsawFoundation", {
      enumerable: !0,
      get: function () {
        return set_jigsaw_foundation_js_1.SetJigsawFoundation;
      },
    }),
    require("./fb-action/set-jigsaw-item.js")),
  set_monster_move_target_js_1 =
    (Object.defineProperty(exports, "SetJigsawItem", {
      enumerable: !0,
      get: function () {
        return set_jigsaw_item_js_1.SetJigsawItem;
      },
    }),
    require("./fb-action/set-monster-move-target.js")),
  set_move_speed_js_1 =
    (Object.defineProperty(exports, "SetMonsterMoveTarget", {
      enumerable: !0,
      get: function () {
        return set_monster_move_target_js_1.SetMonsterMoveTarget;
      },
    }),
    require("./fb-action/set-move-speed.js")),
  set_number_var_js_1 =
    (Object.defineProperty(exports, "SetMoveSpeed", {
      enumerable: !0,
      get: function () {
        return set_move_speed_js_1.SetMoveSpeed;
      },
    }),
    require("./fb-action/set-number-var.js")),
  set_piece_state_js_1 =
    (Object.defineProperty(exports, "SetNumberVar", {
      enumerable: !0,
      get: function () {
        return set_number_var_js_1.SetNumberVar;
      },
    }),
    require("./fb-action/set-piece-state.js")),
  set_player_move_control_js_1 =
    (Object.defineProperty(exports, "SetPieceState", {
      enumerable: !0,
      get: function () {
        return set_piece_state_js_1.SetPieceState;
      },
    }),
    require("./fb-action/set-player-move-control.js")),
  set_player_operation_restriction_js_1 =
    (Object.defineProperty(exports, "SetPlayerMoveControl", {
      enumerable: !0,
      get: function () {
        return set_player_move_control_js_1.SetPlayerMoveControl;
      },
    }),
    require("./fb-action/set-player-operation-restriction.js")),
  set_player_pos_js_1 =
    (Object.defineProperty(exports, "SetPlayerOperationRestriction", {
      enumerable: !0,
      get: function () {
        return set_player_operation_restriction_js_1.SetPlayerOperationRestriction;
      },
    }),
    require("./fb-action/set-player-pos.js")),
  set_plot_mode_js_1 =
    (Object.defineProperty(exports, "SetPlayerPos", {
      enumerable: !0,
      get: function () {
        return set_player_pos_js_1.SetPlayerPos;
      },
    }),
    require("./fb-action/set-plot-mode.js")),
  set_pos_a_js_1 =
    (Object.defineProperty(exports, "SetPlotMode", {
      enumerable: !0,
      get: function () {
        return set_plot_mode_js_1.SetPlotMode;
      },
    }),
    require("./fb-action/set-pos-a.js")),
  set_region_config_js_1 =
    (Object.defineProperty(exports, "SetPosA", {
      enumerable: !0,
      get: function () {
        return set_pos_a_js_1.SetPosA;
      },
    }),
    require("./fb-action/set-region-config.js")),
  set_region_mpc_js_1 =
    (Object.defineProperty(exports, "SetRegionConfig", {
      enumerable: !0,
      get: function () {
        return set_region_config_js_1.SetRegionConfig;
      },
    }),
    require("./fb-action/set-region-mpc.js")),
  set_reset_position_js_1 =
    (Object.defineProperty(exports, "SetRegionMpc", {
      enumerable: !0,
      get: function () {
        return set_region_mpc_js_1.SetRegionMpc;
      },
    }),
    require("./fb-action/set-reset-position.js")),
  set_revive_region_js_1 =
    (Object.defineProperty(exports, "SetResetPosition", {
      enumerable: !0,
      get: function () {
        return set_reset_position_js_1.SetResetPosition;
      },
    }),
    require("./fb-action/set-revive-region.js")),
  set_spine_animation_js_1 =
    (Object.defineProperty(exports, "SetReviveRegion", {
      enumerable: !0,
      get: function () {
        return set_revive_region_js_1.SetReviveRegion;
      },
    }),
    require("./fb-action/set-spine-animation.js")),
  set_sports_state_js_1 =
    (Object.defineProperty(exports, "SetSpineAnimation", {
      enumerable: !0,
      get: function () {
        return set_spine_animation_js_1.SetSpineAnimation;
      },
    }),
    require("./fb-action/set-sports-state.js")),
  set_tele_control_js_1 =
    (Object.defineProperty(exports, "SetSportsState", {
      enumerable: !0,
      get: function () {
        return set_sports_state_js_1.SetSportsState;
      },
    }),
    require("./fb-action/set-tele-control.js")),
  set_time_js_1 =
    (Object.defineProperty(exports, "SetTeleControl", {
      enumerable: !0,
      get: function () {
        return set_tele_control_js_1.SetTeleControl;
      },
    }),
    require("./fb-action/set-time.js")),
  set_time_lock_state_js_1 =
    (Object.defineProperty(exports, "SetTime", {
      enumerable: !0,
      get: function () {
        return set_time_js_1.SetTime;
      },
    }),
    require("./fb-action/set-time-lock-state.js")),
  set_time_scale_js_1 =
    (Object.defineProperty(exports, "SetTimeLockState", {
      enumerable: !0,
      get: function () {
        return set_time_lock_state_js_1.SetTimeLockState;
      },
    }),
    require("./fb-action/set-time-scale.js")),
  set_var_js_1 =
    (Object.defineProperty(exports, "SetTimeScale", {
      enumerable: !0,
      get: function () {
        return set_time_scale_js_1.SetTimeScale;
      },
    }),
    require("./fb-action/set-var.js")),
  set_weather_js_1 =
    (Object.defineProperty(exports, "SetVar", {
      enumerable: !0,
      get: function () {
        return set_var_js_1.SetVar;
      },
    }),
    require("./fb-action/set-weather.js")),
  set_weather_lock_state_js_1 =
    (Object.defineProperty(exports, "SetWeather", {
      enumerable: !0,
      get: function () {
        return set_weather_js_1.SetWeather;
      },
    }),
    require("./fb-action/set-weather-lock-state.js")),
  set_wu_yin_qu_state_js_1 =
    (Object.defineProperty(exports, "SetWeatherLockState", {
      enumerable: !0,
      get: function () {
        return set_weather_lock_state_js_1.SetWeatherLockState;
      },
    }),
    require("./fb-action/set-wu-yin-qu-state.js")),
  settlement_dungeon_js_1 =
    (Object.defineProperty(exports, "SetWuYinQuState", {
      enumerable: !0,
      get: function () {
        return set_wu_yin_qu_state_js_1.SetWuYinQuState;
      },
    }),
    require("./fb-action/settlement-dungeon.js")),
  setup_morale_system_js_1 =
    (Object.defineProperty(exports, "SettlementDungeon", {
      enumerable: !0,
      get: function () {
        return settlement_dungeon_js_1.SettlementDungeon;
      },
    }),
    require("./fb-action/setup-morale-system.js")),
  show_center_text_js_1 =
    (Object.defineProperty(exports, "SetupMoraleSystem", {
      enumerable: !0,
      get: function () {
        return setup_morale_system_js_1.SetupMoraleSystem;
      },
    }),
    require("./fb-action/show-center-text.js")),
  show_hided_group_js_1 =
    (Object.defineProperty(exports, "ShowCenterText", {
      enumerable: !0,
      get: function () {
        return show_center_text_js_1.ShowCenterText;
      },
    }),
    require("./fb-action/show-hided-group.js")),
  show_highlight_explore_skill_icon_js_1 =
    (Object.defineProperty(exports, "ShowHidedGroup", {
      enumerable: !0,
      get: function () {
        return show_hided_group_js_1.ShowHidedGroup;
      },
    }),
    require("./fb-action/show-highlight-explore-skill-icon.js")),
  show_map_mark_js_1 =
    (Object.defineProperty(exports, "ShowHighlightExploreSkillIcon", {
      enumerable: !0,
      get: function () {
        return show_highlight_explore_skill_icon_js_1.ShowHighlightExploreSkillIcon;
      },
    }),
    require("./fb-action/show-map-mark.js")),
  show_message_js_1 =
    (Object.defineProperty(exports, "ShowMapMark", {
      enumerable: !0,
      get: function () {
        return show_map_mark_js_1.ShowMapMark;
      },
    }),
    require("./fb-action/show-message.js")),
  show_specific_entities_js_1 =
    (Object.defineProperty(exports, "ShowMessage", {
      enumerable: !0,
      get: function () {
        return show_message_js_1.ShowMessage;
      },
    }),
    require("./fb-action/show-specific-entities.js")),
  show_talk_js_1 =
    (Object.defineProperty(exports, "ShowSpecificEntities", {
      enumerable: !0,
      get: function () {
        return show_specific_entities_js_1.ShowSpecificEntities;
      },
    }),
    require("./fb-action/show-talk.js")),
  show_talk_frame_event_js_1 =
    (Object.defineProperty(exports, "ShowTalk", {
      enumerable: !0,
      get: function () {
        return show_talk_js_1.ShowTalk;
      },
    }),
    require("./fb-action/show-talk-frame-event.js")),
  show_talk_frame_event_position_js_1 =
    (Object.defineProperty(exports, "ShowTalkFrameEvent", {
      enumerable: !0,
      get: function () {
        return show_talk_frame_event_js_1.ShowTalkFrameEvent;
      },
    }),
    require("./fb-action/show-talk-frame-event-position.js")),
  show_talk_outline_js_1 =
    (Object.defineProperty(exports, "ShowTalkFrameEventPosition", {
      enumerable: !0,
      get: function () {
        return show_talk_frame_event_position_js_1.ShowTalkFrameEventPosition;
      },
    }),
    require("./fb-action/show-talk-outline.js")),
  show_target_range_js_1 =
    (Object.defineProperty(exports, "ShowTalkOutline", {
      enumerable: !0,
      get: function () {
        return show_talk_outline_js_1.ShowTalkOutline;
      },
    }),
    require("./fb-action/show-target-range.js")),
  signal_break_gameplay_js_1 =
    (Object.defineProperty(exports, "ShowTargetRange", {
      enumerable: !0,
      get: function () {
        return show_target_range_js_1.ShowTargetRange;
      },
    }),
    require("./fb-action/signal-break-gameplay.js")),
  signal_device_js_1 =
    (Object.defineProperty(exports, "SignalBreakGameplay", {
      enumerable: !0,
      get: function () {
        return signal_break_gameplay_js_1.SignalBreakGameplay;
      },
    }),
    require("./fb-action/signal-device.js")),
  signal_device2_js_1 =
    (Object.defineProperty(exports, "SignalDevice", {
      enumerable: !0,
      get: function () {
        return signal_device_js_1.SignalDevice;
      },
    }),
    require("./fb-action/signal-device2.js")),
  simple_move_js_1 =
    (Object.defineProperty(exports, "SignalDevice2", {
      enumerable: !0,
      get: function () {
        return signal_device2_js_1.SignalDevice2;
      },
    }),
    require("./fb-action/simple-move.js")),
  sit_down_js_1 =
    (Object.defineProperty(exports, "SimpleMove", {
      enumerable: !0,
      get: function () {
        return simple_move_js_1.SimpleMove;
      },
    }),
    require("./fb-action/sit-down.js")),
  sit_on_ground_js_1 =
    (Object.defineProperty(exports, "SitDown", {
      enumerable: !0,
      get: function () {
        return sit_down_js_1.SitDown;
      },
    }),
    require("./fb-action/sit-on-ground.js")),
  ski_config_js_1 =
    (Object.defineProperty(exports, "SitOnGround", {
      enumerable: !0,
      get: function () {
        return sit_on_ground_js_1.SitOnGround;
      },
    }),
    require("./fb-action/ski-config.js")),
  skill_blackboard_vector_js_1 =
    (Object.defineProperty(exports, "SkiConfig", {
      enumerable: !0,
      get: function () {
        return ski_config_js_1.SkiConfig;
      },
    }),
    require("./fb-action/skill-blackboard-vector.js")),
  slash_and_tower_goto_next_floor_js_1 =
    (Object.defineProperty(exports, "SkillBlackboardVector", {
      enumerable: !0,
      get: function () {
        return skill_blackboard_vector_js_1.SkillBlackboardVector;
      },
    }),
    require("./fb-action/slash-and-tower-goto-next-floor.js")),
  slash_and_tower_tip_js_1 =
    (Object.defineProperty(exports, "SlashAndTowerGotoNextFloor", {
      enumerable: !0,
      get: function () {
        return slash_and_tower_goto_next_floor_js_1.SlashAndTowerGotoNextFloor;
      },
    }),
    require("./fb-action/slash-and-tower-tip.js")),
  slash_tower_prefab_config_js_1 =
    (Object.defineProperty(exports, "SlashAndTowerTip", {
      enumerable: !0,
      get: function () {
        return slash_and_tower_tip_js_1.SlashAndTowerTip;
      },
    }),
    require("./fb-action/slash-tower-prefab-config.js")),
  slide_config_js_1 =
    (Object.defineProperty(exports, "SlashTowerPrefabConfig", {
      enumerable: !0,
      get: function () {
        return slash_tower_prefab_config_js_1.SlashTowerPrefabConfig;
      },
    }),
    require("./fb-action/slide-config.js")),
  slide_rail_start_js_1 =
    (Object.defineProperty(exports, "SlideConfig", {
      enumerable: !0,
      get: function () {
        return slide_config_js_1.SlideConfig;
      },
    }),
    require("./fb-action/slide-rail-start.js")),
  slide_track_move_js_1 =
    (Object.defineProperty(exports, "SlideRailStart", {
      enumerable: !0,
      get: function () {
        return slide_rail_start_js_1.SlideRailStart;
      },
    }),
    require("./fb-action/slide-track-move.js")),
  soar_js_1 =
    (Object.defineProperty(exports, "SlideTrackMove", {
      enumerable: !0,
      get: function () {
        return slide_track_move_js_1.SlideTrackMove;
      },
    }),
    require("./fb-action/soar.js")),
  soaring_challenge_settlement_js_1 =
    (Object.defineProperty(exports, "Soar", {
      enumerable: !0,
      get: function () {
        return soar_js_1.Soar;
      },
    }),
    require("./fb-action/soaring-challenge-settlement.js")),
  spawn_child_js_1 =
    (Object.defineProperty(exports, "SoaringChallengeSettlement", {
      enumerable: !0,
      get: function () {
        return soaring_challenge_settlement_js_1.SoaringChallengeSettlement;
      },
    }),
    require("./fb-action/spawn-child.js")),
  spawn_entity_js_1 =
    (Object.defineProperty(exports, "SpawnChild", {
      enumerable: !0,
      get: function () {
        return spawn_child_js_1.SpawnChild;
      },
    }),
    require("./fb-action/spawn-entity.js")),
  stand_control_js_1 =
    (Object.defineProperty(exports, "SpawnEntity", {
      enumerable: !0,
      get: function () {
        return spawn_entity_js_1.SpawnEntity;
      },
    }),
    require("./fb-action/stand-control.js")),
  stand_control2_js_1 =
    (Object.defineProperty(exports, "StandControl", {
      enumerable: !0,
      get: function () {
        return stand_control_js_1.StandControl;
      },
    }),
    require("./fb-action/stand-control2.js")),
  start_flow_template_js_1 =
    (Object.defineProperty(exports, "StandControl2", {
      enumerable: !0,
      get: function () {
        return stand_control2_js_1.StandControl2;
      },
    }),
    require("./fb-action/start-flow-template.js")),
  state_info_js_1 =
    (Object.defineProperty(exports, "StartFlowTemplate", {
      enumerable: !0,
      get: function () {
        return start_flow_template_js_1.StartFlowTemplate;
      },
    }),
    require("./fb-action/state-info.js")),
  stop_camera_look_at_js_1 =
    (Object.defineProperty(exports, "StateInfo", {
      enumerable: !0,
      get: function () {
        return state_info_js_1.StateInfo;
      },
    }),
    require("./fb-action/stop-camera-look-at.js")),
  stop_guest_cartethyia_js_1 =
    (Object.defineProperty(exports, "StopCameraLookAt", {
      enumerable: !0,
      get: function () {
        return stop_camera_look_at_js_1.StopCameraLookAt;
      },
    }),
    require("./fb-action/stop-guest-cartethyia.js")),
  stop_guest_ui_animation_js_1 =
    (Object.defineProperty(exports, "StopGuestCartethyia", {
      enumerable: !0,
      get: function () {
        return stop_guest_cartethyia_js_1.StopGuestCartethyia;
      },
    }),
    require("./fb-action/stop-guest-ui-animation.js")),
  stop_new_move_with_spline_js_1 =
    (Object.defineProperty(exports, "StopGuestUiAnimation", {
      enumerable: !0,
      get: function () {
        return stop_guest_ui_animation_js_1.StopGuestUiAnimation;
      },
    }),
    require("./fb-action/stop-new-move-with-spline.js")),
  stop_new_move_with_spline_at_current_pos_js_1 =
    (Object.defineProperty(exports, "StopNewMoveWithSpline", {
      enumerable: !0,
      get: function () {
        return stop_new_move_with_spline_js_1.StopNewMoveWithSpline;
      },
    }),
    require("./fb-action/stop-new-move-with-spline-at-current-pos.js")),
  stop_new_move_with_spline_at_end_point_js_1 =
    (Object.defineProperty(exports, "StopNewMoveWithSplineAtCurrentPos", {
      enumerable: !0,
      get: function () {
        return stop_new_move_with_spline_at_current_pos_js_1.StopNewMoveWithSplineAtCurrentPos;
      },
    }),
    require("./fb-action/stop-new-move-with-spline-at-end-point.js")),
  stop_new_move_with_spline_at_start_point_js_1 =
    (Object.defineProperty(exports, "StopNewMoveWithSplineAtEndPoint", {
      enumerable: !0,
      get: function () {
        return stop_new_move_with_spline_at_end_point_js_1.StopNewMoveWithSplineAtEndPoint;
      },
    }),
    require("./fb-action/stop-new-move-with-spline-at-start-point.js")),
  stop_new_move_with_spline_at_target_point_js_1 =
    (Object.defineProperty(exports, "StopNewMoveWithSplineAtStartPoint", {
      enumerable: !0,
      get: function () {
        return stop_new_move_with_spline_at_start_point_js_1.StopNewMoveWithSplineAtStartPoint;
      },
    }),
    require("./fb-action/stop-new-move-with-spline-at-target-point.js")),
  stop_scene_item_move_js_1 =
    (Object.defineProperty(exports, "StopNewMoveWithSplineAtTargetPoint", {
      enumerable: !0,
      get: function () {
        return stop_new_move_with_spline_at_target_point_js_1.StopNewMoveWithSplineAtTargetPoint;
      },
    }),
    require("./fb-action/stop-scene-item-move.js")),
  summon_entity_js_1 =
    (Object.defineProperty(exports, "StopSceneItemMove", {
      enumerable: !0,
      get: function () {
        return stop_scene_item_move_js_1.StopSceneItemMove;
      },
    }),
    require("./fb-action/summon-entity.js")),
  summon_vehicle_js_1 =
    (Object.defineProperty(exports, "SummonEntity", {
      enumerable: !0,
      get: function () {
        return summon_entity_js_1.SummonEntity;
      },
    }),
    require("./fb-action/summon-vehicle.js")),
  sundial_puzzle_gameplay_js_1 =
    (Object.defineProperty(exports, "SummonVehicle", {
      enumerable: !0,
      get: function () {
        return summon_vehicle_js_1.SummonVehicle;
      },
    }),
    require("./fb-action/sundial-puzzle-gameplay.js")),
  super_catapult_js_1 =
    (Object.defineProperty(exports, "SundialPuzzleGameplay", {
      enumerable: !0,
      get: function () {
        return sundial_puzzle_gameplay_js_1.SundialPuzzleGameplay;
      },
    }),
    require("./fb-action/super-catapult.js")),
  switch_data_layers_js_1 =
    (Object.defineProperty(exports, "SuperCatapult", {
      enumerable: !0,
      get: function () {
        return super_catapult_js_1.SuperCatapult;
      },
    }),
    require("./fb-action/switch-data-layers.js")),
  switch_permission_js_1 =
    (Object.defineProperty(exports, "SwitchDataLayers", {
      enumerable: !0,
      get: function () {
        return switch_data_layers_js_1.SwitchDataLayers;
      },
    }),
    require("./fb-action/switch-permission.js")),
  switch_sub_levels_js_1 =
    (Object.defineProperty(exports, "SwitchPermission", {
      enumerable: !0,
      get: function () {
        return switch_permission_js_1.SwitchPermission;
      },
    }),
    require("./fb-action/switch-sub-levels.js")),
  switch_sub_levels_directly_js_1 =
    (Object.defineProperty(exports, "SwitchSubLevels", {
      enumerable: !0,
      get: function () {
        return switch_sub_levels_js_1.SwitchSubLevels;
      },
    }),
    require("./fb-action/switch-sub-levels-directly.js")),
  sync_var_to_actor_state_js_1 =
    (Object.defineProperty(exports, "SwitchSubLevelsDirectly", {
      enumerable: !0,
      get: function () {
        return switch_sub_levels_directly_js_1.SwitchSubLevelsDirectly;
      },
    }),
    require("./fb-action/sync-var-to-actor-state.js")),
  take_plot_photo_js_1 =
    (Object.defineProperty(exports, "SyncVarToActorState", {
      enumerable: !0,
      get: function () {
        return sync_var_to_actor_state_js_1.SyncVarToActorState;
      },
    }),
    require("./fb-action/take-plot-photo.js")),
  talk_background_clean_js_1 =
    (Object.defineProperty(exports, "TakePlotPhoto", {
      enumerable: !0,
      get: function () {
        return take_plot_photo_js_1.TakePlotPhoto;
      },
    }),
    require("./fb-action/talk-background-clean.js")),
  talk_background_icon_js_1 =
    (Object.defineProperty(exports, "TalkBackgroundClean", {
      enumerable: !0,
      get: function () {
        return talk_background_clean_js_1.TalkBackgroundClean;
      },
    }),
    require("./fb-action/talk-background-icon.js")),
  talk_background_image_js_1 =
    (Object.defineProperty(exports, "TalkBackgroundIcon", {
      enumerable: !0,
      get: function () {
        return talk_background_icon_js_1.TalkBackgroundIcon;
      },
    }),
    require("./fb-action/talk-background-image.js")),
  talk_background_image_by_mc_gender_js_1 =
    (Object.defineProperty(exports, "TalkBackgroundImage", {
      enumerable: !0,
      get: function () {
        return talk_background_image_js_1.TalkBackgroundImage;
      },
    }),
    require("./fb-action/talk-background-image-by-mc-gender.js")),
  talk_background_spine_image_js_1 =
    (Object.defineProperty(exports, "TalkBackgroundImageByMcGender", {
      enumerable: !0,
      get: function () {
        return talk_background_image_by_mc_gender_js_1.TalkBackgroundImageByMcGender;
      },
    }),
    require("./fb-action/talk-background-spine-image.js")),
  talk_item_js_1 =
    (Object.defineProperty(exports, "TalkBackgroundSpineImage", {
      enumerable: !0,
      get: function () {
        return talk_background_spine_image_js_1.TalkBackgroundSpineImage;
      },
    }),
    require("./fb-action/talk-item.js")),
  talk_option_js_1 =
    (Object.defineProperty(exports, "TalkItem", {
      enumerable: !0,
      get: function () {
        return talk_item_js_1.TalkItem;
      },
    }),
    require("./fb-action/talk-option.js")),
  talk_option_condition_js_1 =
    (Object.defineProperty(exports, "TalkOption", {
      enumerable: !0,
      get: function () {
        return talk_option_js_1.TalkOption;
      },
    }),
    require("./fb-action/talk-option-condition.js")),
  talk_option_pre_option_js_1 =
    (Object.defineProperty(exports, "TalkOptionCondition", {
      enumerable: !0,
      get: function () {
        return talk_option_condition_js_1.TalkOptionCondition;
      },
    }),
    require("./fb-action/talk-option-pre-option.js")),
  talk_option_qte_failed_js_1 =
    (Object.defineProperty(exports, "TalkOptionPreOption", {
      enumerable: !0,
      get: function () {
        return talk_option_pre_option_js_1.TalkOptionPreOption;
      },
    }),
    require("./fb-action/talk-option-qte-failed.js")),
  talk_option_qte_failed_delay_exec_js_1 =
    (Object.defineProperty(exports, "TalkOptionQteFailed", {
      enumerable: !0,
      get: function () {
        return talk_option_qte_failed_js_1.TalkOptionQteFailed;
      },
    }),
    require("./fb-action/talk-option-qte-failed-delay-exec.js")),
  talk_option_qte_succeed_js_1 =
    (Object.defineProperty(exports, "TalkOptionQteFailedDelayExec", {
      enumerable: !0,
      get: function () {
        return talk_option_qte_failed_delay_exec_js_1.TalkOptionQteFailedDelayExec;
      },
    }),
    require("./fb-action/talk-option-qte-succeed.js")),
  talk_option_qte_succeed_delay_exec_js_1 =
    (Object.defineProperty(exports, "TalkOptionQteSucceed", {
      enumerable: !0,
      get: function () {
        return talk_option_qte_succeed_js_1.TalkOptionQteSucceed;
      },
    }),
    require("./fb-action/talk-option-qte-succeed-delay-exec.js")),
  talk_option_rogue_random_event_js_1 =
    (Object.defineProperty(exports, "TalkOptionQteSucceedDelayExec", {
      enumerable: !0,
      get: function () {
        return talk_option_qte_succeed_delay_exec_js_1.TalkOptionQteSucceedDelayExec;
      },
    }),
    require("./fb-action/talk-option-rogue-random-event.js")),
  talk_sequence_transition_js_1 =
    (Object.defineProperty(exports, "TalkOptionRogueRandomEvent", {
      enumerable: !0,
      get: function () {
        return talk_option_rogue_random_event_js_1.TalkOptionRogueRandomEvent;
      },
    }),
    require("./fb-action/talk-sequence-transition.js")),
  target_entity_js_1 =
    (Object.defineProperty(exports, "TalkSequenceTransition", {
      enumerable: !0,
      get: function () {
        return talk_sequence_transition_js_1.TalkSequenceTransition;
      },
    }),
    require("./fb-action/target-entity.js")),
  tele_control_config_js_1 =
    (Object.defineProperty(exports, "TargetEntity", {
      enumerable: !0,
      get: function () {
        return target_entity_js_1.TargetEntity;
      },
    }),
    require("./fb-action/tele-control-config.js")),
  tele_port_after_time_out_js_1 =
    (Object.defineProperty(exports, "TeleControlConfig", {
      enumerable: !0,
      get: function () {
        return tele_control_config_js_1.TeleControlConfig;
      },
    }),
    require("./fb-action/tele-port-after-time-out.js")),
  teleport_dungeon_js_1 =
    (Object.defineProperty(exports, "TelePortAfterTimeOut", {
      enumerable: !0,
      get: function () {
        return tele_port_after_time_out_js_1.TelePortAfterTimeOut;
      },
    }),
    require("./fb-action/teleport-dungeon.js")),
  teleport_dungeon_function_js_1 =
    (Object.defineProperty(exports, "TeleportDungeon", {
      enumerable: !0,
      get: function () {
        return teleport_dungeon_js_1.TeleportDungeon;
      },
    }),
    require("./fb-action/teleport-dungeon-function.js")),
  teleport_dungeon_pos_js_1 =
    (Object.defineProperty(exports, "TeleportDungeonFunction", {
      enumerable: !0,
      get: function () {
        return teleport_dungeon_function_js_1.TeleportDungeonFunction;
      },
    }),
    require("./fb-action/teleport-dungeon-pos.js")),
  teleport_to_and_enter_fishing_boat_js_1 =
    (Object.defineProperty(exports, "TeleportDungeonPos", {
      enumerable: !0,
      get: function () {
        return teleport_dungeon_pos_js_1.TeleportDungeonPos;
      },
    }),
    require("./fb-action/teleport-to-and-enter-fishing-boat.js")),
  teleport_to_and_enter_vehicle_js_1 =
    (Object.defineProperty(exports, "TeleportToAndEnterFishingBoat", {
      enumerable: !0,
      get: function () {
        return teleport_to_and_enter_fishing_boat_js_1.TeleportToAndEnterFishingBoat;
      },
    }),
    require("./fb-action/teleport-to-and-enter-vehicle.js")),
  teleport_to_latest_reset_point_js_1 =
    (Object.defineProperty(exports, "TeleportToAndEnterVehicle", {
      enumerable: !0,
      get: function () {
        return teleport_to_and_enter_vehicle_js_1.TeleportToAndEnterVehicle;
      },
    }),
    require("./fb-action/teleport-to-latest-reset-point.js")),
  teleport_to_latest_reset_point_directly_js_1 =
    (Object.defineProperty(exports, "TeleportToLatestResetPoint", {
      enumerable: !0,
      get: function () {
        return teleport_to_latest_reset_point_js_1.TeleportToLatestResetPoint;
      },
    }),
    require("./fb-action/teleport-to-latest-reset-point-directly.js")),
  teleport_transition_in_digital_screen_js_1 =
    (Object.defineProperty(exports, "TeleportToLatestResetPointDirectly", {
      enumerable: !0,
      get: function () {
        return teleport_to_latest_reset_point_directly_js_1.TeleportToLatestResetPointDirectly;
      },
    }),
    require("./fb-action/teleport-transition-in-digital-screen.js")),
  teleport_transition_in_seamless_type_js_1 =
    (Object.defineProperty(exports, "TeleportTransitionInDigitalScreen", {
      enumerable: !0,
      get: function () {
        return teleport_transition_in_digital_screen_js_1.TeleportTransitionInDigitalScreen;
      },
    }),
    require("./fb-action/teleport-transition-in-seamless-type.js")),
  teleport_transition_with_center_text_js_1 =
    (Object.defineProperty(exports, "TeleportTransitionInSeamlessType", {
      enumerable: !0,
      get: function () {
        return teleport_transition_in_seamless_type_js_1.TeleportTransitionInSeamlessType;
      },
    }),
    require("./fb-action/teleport-transition-with-center-text.js")),
  teleport_transition_with_character_display_js_1 =
    (Object.defineProperty(exports, "TeleportTransitionWithCenterText", {
      enumerable: !0,
      get: function () {
        return teleport_transition_with_center_text_js_1.TeleportTransitionWithCenterText;
      },
    }),
    require("./fb-action/teleport-transition-with-character-display.js")),
  teleport_transition_with_effect_js_1 =
    (Object.defineProperty(exports, "TeleportTransitionWithCharacterDisplay", {
      enumerable: !0,
      get: function () {
        return teleport_transition_with_character_display_js_1.TeleportTransitionWithCharacterDisplay;
      },
    }),
    require("./fb-action/teleport-transition-with-effect.js")),
  teleport_transition_with_fade_in_screen_js_1 =
    (Object.defineProperty(exports, "TeleportTransitionWithEffect", {
      enumerable: !0,
      get: function () {
        return teleport_transition_with_effect_js_1.TeleportTransitionWithEffect;
      },
    }),
    require("./fb-action/teleport-transition-with-fade-in-screen.js")),
  teleport_transition_with_mp4_js_1 =
    (Object.defineProperty(exports, "TeleportTransitionWithFadeInScreen", {
      enumerable: !0,
      get: function () {
        return teleport_transition_with_fade_in_screen_js_1.TeleportTransitionWithFadeInScreen;
      },
    }),
    require("./fb-action/teleport-transition-with-mp4.js")),
  teleport_vehicle_js_1 =
    (Object.defineProperty(exports, "TeleportTransitionWithMp4", {
      enumerable: !0,
      get: function () {
        return teleport_transition_with_mp4_js_1.TeleportTransitionWithMp4;
      },
    }),
    require("./fb-action/teleport-vehicle.js")),
  text_style_js_1 =
    (Object.defineProperty(exports, "TeleportVehicle", {
      enumerable: !0,
      get: function () {
        return teleport_vehicle_js_1.TeleportVehicle;
      },
    }),
    require("./fb-action/text-style.js")),
  toggle_air_wall_js_1 =
    (Object.defineProperty(exports, "TextStyle", {
      enumerable: !0,
      get: function () {
        return text_style_js_1.TextStyle;
      },
    }),
    require("./fb-action/toggle-air-wall.js")),
  toggle_highlight_explore_ui_js_1 =
    (Object.defineProperty(exports, "ToggleAirWall", {
      enumerable: !0,
      get: function () {
        return toggle_air_wall_js_1.ToggleAirWall;
      },
    }),
    require("./fb-action/toggle-highlight-explore-ui.js")),
  toggle_map_mark_state_js_1 =
    (Object.defineProperty(exports, "ToggleHighlightExploreUi", {
      enumerable: !0,
      get: function () {
        return toggle_highlight_explore_ui_js_1.ToggleHighlightExploreUi;
      },
    }),
    require("./fb-action/toggle-map-mark-state.js")),
  toggle_scan_spline_effect_js_1 =
    (Object.defineProperty(exports, "ToggleMapMarkState", {
      enumerable: !0,
      get: function () {
        return toggle_map_mark_state_js_1.ToggleMapMarkState;
      },
    }),
    require("./fb-action/toggle-scan-spline-effect.js")),
  toggle_timer_pause_state_js_1 =
    (Object.defineProperty(exports, "ToggleScanSplineEffect", {
      enumerable: !0,
      get: function () {
        return toggle_scan_spline_effect_js_1.ToggleScanSplineEffect;
      },
    }),
    require("./fb-action/toggle-timer-pause-state.js")),
  tower_dungeon_prefab_config_js_1 =
    (Object.defineProperty(exports, "ToggleTimerPauseState", {
      enumerable: !0,
      get: function () {
        return toggle_timer_pause_state_js_1.ToggleTimerPauseState;
      },
    }),
    require("./fb-action/tower-dungeon-prefab-config.js")),
  trace_spline_js_1 =
    (Object.defineProperty(exports, "TowerDungeonPrefabConfig", {
      enumerable: !0,
      get: function () {
        return tower_dungeon_prefab_config_js_1.TowerDungeonPrefabConfig;
      },
    }),
    require("./fb-action/trace-spline.js")),
  transform_js_1 =
    (Object.defineProperty(exports, "TraceSpline", {
      enumerable: !0,
      get: function () {
        return trace_spline_js_1.TraceSpline;
      },
    }),
    require("./fb-action/transform.js")),
  trigger_actions_js_1 =
    (Object.defineProperty(exports, "Transform", {
      enumerable: !0,
      get: function () {
        return transform_js_1.Transform;
      },
    }),
    require("./fb-action/trigger-actions.js")),
  trigger_camera_shake_js_1 =
    (Object.defineProperty(exports, "TriggerActions", {
      enumerable: !0,
      get: function () {
        return trigger_actions_js_1.TriggerActions;
      },
    }),
    require("./fb-action/trigger-camera-shake.js")),
  triggered_entity_js_1 =
    (Object.defineProperty(exports, "TriggerCameraShake", {
      enumerable: !0,
      get: function () {
        return trigger_camera_shake_js_1.TriggerCameraShake;
      },
    }),
    require("./fb-action/triggered-entity.js")),
  type_function_js_1 =
    (Object.defineProperty(exports, "TriggeredEntity", {
      enumerable: !0,
      get: function () {
        return triggered_entity_js_1.TriggeredEntity;
      },
    }),
    require("./fb-action/type-function.js")),
  un_limit_player_operation_js_1 =
    (Object.defineProperty(exports, "TypeFunction", {
      enumerable: !0,
      get: function () {
        return type_function_js_1.TypeFunction;
      },
    }),
    require("./fb-action/un-limit-player-operation.js")),
  un_lock_cook_system_item_js_1 =
    (Object.defineProperty(exports, "UnLimitPlayerOperation", {
      enumerable: !0,
      get: function () {
        return un_limit_player_operation_js_1.UnLimitPlayerOperation;
      },
    }),
    require("./fb-action/un-lock-cook-system-item.js")),
  un_lock_dango_collect_system_item_js_1 =
    (Object.defineProperty(exports, "UnLockCookSystemItem", {
      enumerable: !0,
      get: function () {
        return un_lock_cook_system_item_js_1.UnLockCookSystemItem;
      },
    }),
    require("./fb-action/un-lock-dango-collect-system-item.js")),
  uniform_motion_js_1 =
    (Object.defineProperty(exports, "UnLockDangoCollectSystemItem", {
      enumerable: !0,
      get: function () {
        return un_lock_dango_collect_system_item_js_1.UnLockDangoCollectSystemItem;
      },
    }),
    require("./fb-action/uniform-motion.js")),
  union_action_params0_js_1 =
    (Object.defineProperty(exports, "UniformMotion", {
      enumerable: !0,
      get: function () {
        return uniform_motion_js_1.UniformMotion;
      },
    }),
    require("./fb-action/union-action-params0.js")),
  union_action_params1_js_1 =
    (Object.defineProperty(exports, "UnionActionParams0", {
      enumerable: !0,
      get: function () {
        return union_action_params0_js_1.UnionActionParams0;
      },
    }),
    require("./fb-action/union-action-params1.js")),
  union_actor_look_at_data_js_1 =
    (Object.defineProperty(exports, "UnionActionParams1", {
      enumerable: !0,
      get: function () {
        return union_action_params1_js_1.UnionActionParams1;
      },
    }),
    require("./fb-action/union-actor-look-at-data.js")),
  union_actor_turn_to_data_js_1 =
    (Object.defineProperty(exports, "UnionActorLookAtData", {
      enumerable: !0,
      get: function () {
        return union_actor_look_at_data_js_1.UnionActorLookAtData;
      },
    }),
    require("./fb-action/union-actor-turn-to-data.js")),
  union_adjust_player_camera_option_js_1 =
    (Object.defineProperty(exports, "UnionActorTurnToData", {
      enumerable: !0,
      get: function () {
        return union_actor_turn_to_data_js_1.UnionActorTurnToData;
      },
    }),
    require("./fb-action/union-adjust-player-camera-option.js")),
  union_alert_system_option_js_1 =
    (Object.defineProperty(exports, "UnionAdjustPlayerCameraOption", {
      enumerable: !0,
      get: function () {
        return union_adjust_player_camera_option_js_1.UnionAdjustPlayerCameraOption;
      },
    }),
    require("./fb-action/union-alert-system-option.js")),
  union_alert_value_change_speed_js_1 =
    (Object.defineProperty(exports, "UnionAlertSystemOption", {
      enumerable: !0,
      get: function () {
        return union_alert_system_option_js_1.UnionAlertSystemOption;
      },
    }),
    require("./fb-action/union-alert-value-change-speed.js")),
  union_awake_pos_option_js_1 =
    (Object.defineProperty(exports, "UnionAlertValueChangeSpeed", {
      enumerable: !0,
      get: function () {
        return union_alert_value_change_speed_js_1.UnionAlertValueChangeSpeed;
      },
    }),
    require("./fb-action/union-awake-pos-option.js")),
  union_battle_state_perception_behavior_js_1 =
    (Object.defineProperty(exports, "UnionAwakePosOption", {
      enumerable: !0,
      get: function () {
        return union_awake_pos_option_js_1.UnionAwakePosOption;
      },
    }),
    require("./fb-action/union-battle-state-perception-behavior.js")),
  union_camera_operation_js_1 =
    (Object.defineProperty(exports, "UnionBattleStatePerceptionBehavior", {
      enumerable: !0,
      get: function () {
        return union_battle_state_perception_behavior_js_1.UnionBattleStatePerceptionBehavior;
      },
    }),
    require("./fb-action/union-camera-operation.js")),
  union_camera_shake_config_js_1 =
    (Object.defineProperty(exports, "UnionCameraOperation", {
      enumerable: !0,
      get: function () {
        return union_camera_operation_js_1.UnionCameraOperation;
      },
    }),
    require("./fb-action/union-camera-shake-config.js")),
  union_center_text_show_anim_js_1 =
    (Object.defineProperty(exports, "UnionCameraShakeConfig", {
      enumerable: !0,
      get: function () {
        return union_camera_shake_config_js_1.UnionCameraShakeConfig;
      },
    }),
    require("./fb-action/union-center-text-show-anim.js")),
  union_change_entity_prefab_performance_js_1 =
    (Object.defineProperty(exports, "UnionCenterTextShowAnim", {
      enumerable: !0,
      get: function () {
        return union_center_text_show_anim_js_1.UnionCenterTextShowAnim;
      },
    }),
    require("./fb-action/union-change-entity-prefab-performance.js")),
  union_change_entity_state_js_1 =
    (Object.defineProperty(exports, "UnionChangeEntityPrefabPerformance", {
      enumerable: !0,
      get: function () {
        return union_change_entity_prefab_performance_js_1.UnionChangeEntityPrefabPerformance;
      },
    }),
    require("./fb-action/union-change-entity-state.js")),
  union_change_timer_js_1 =
    (Object.defineProperty(exports, "UnionChangeEntityState", {
      enumerable: !0,
      get: function () {
        return union_change_entity_state_js_1.UnionChangeEntityState;
      },
    }),
    require("./fb-action/union-change-timer.js")),
  union_character_look_at_data_js_1 =
    (Object.defineProperty(exports, "UnionChangeTimer", {
      enumerable: !0,
      get: function () {
        return union_change_timer_js_1.UnionChangeTimer;
      },
    }),
    require("./fb-action/union-character-look-at-data.js")),
  union_client_teleport_config_js_1 =
    (Object.defineProperty(exports, "UnionCharacterLookAtData", {
      enumerable: !0,
      get: function () {
        return union_character_look_at_data_js_1.UnionCharacterLookAtData;
      },
    }),
    require("./fb-action/union-client-teleport-config.js")),
  union_common_tip2_option_js_1 =
    (Object.defineProperty(exports, "UnionClientTeleportConfig", {
      enumerable: !0,
      get: function () {
        return union_client_teleport_config_js_1.UnionClientTeleportConfig;
      },
    }),
    require("./fb-action/union-common-tip2-option.js")),
  union_common_tip_option_js_1 =
    (Object.defineProperty(exports, "UnionCommonTip2Option", {
      enumerable: !0,
      get: function () {
        return union_common_tip2_option_js_1.UnionCommonTip2Option;
      },
    }),
    require("./fb-action/union-common-tip-option.js")),
  union_control_tracking_type_js_1 =
    (Object.defineProperty(exports, "UnionCommonTipOption", {
      enumerable: !0,
      get: function () {
        return union_common_tip_option_js_1.UnionCommonTipOption;
      },
    }),
    require("./fb-action/union-control-tracking-type.js")),
  union_delay_remove_config_js_1 =
    (Object.defineProperty(exports, "UnionControlTrackingType", {
      enumerable: !0,
      get: function () {
        return union_control_tracking_type_js_1.UnionControlTrackingType;
      },
    }),
    require("./fb-action/union-delay-remove-config.js")),
  union_detect_battle_condition_type_js_1 =
    (Object.defineProperty(exports, "UnionDelayRemoveConfig", {
      enumerable: !0,
      get: function () {
        return union_delay_remove_config_js_1.UnionDelayRemoveConfig;
      },
    }),
    require("./fb-action/union-detect-battle-condition-type.js")),
  union_detect_battle_tag_type_js_1 =
    (Object.defineProperty(exports, "UnionDetectBattleConditionType", {
      enumerable: !0,
      get: function () {
        return union_detect_battle_condition_type_js_1.UnionDetectBattleConditionType;
      },
    }),
    require("./fb-action/union-detect-battle-tag-type.js")),
  union_disable_alert_condition_js_1 =
    (Object.defineProperty(exports, "UnionDetectBattleTagType", {
      enumerable: !0,
      get: function () {
        return union_detect_battle_tag_type_js_1.UnionDetectBattleTagType;
      },
    }),
    require("./fb-action/union-disable-alert-condition.js")),
  union_dungeon_event_type_js_1 =
    (Object.defineProperty(exports, "UnionDisableAlertCondition", {
      enumerable: !0,
      get: function () {
        return union_disable_alert_condition_js_1.UnionDisableAlertCondition;
      },
    }),
    require("./fb-action/union-dungeon-event-type.js")),
  union_dynamic_settlement_config_js_1 =
    (Object.defineProperty(exports, "UnionDungeonEventType", {
      enumerable: !0,
      get: function () {
        return union_dungeon_event_type_js_1.UnionDungeonEventType;
      },
    }),
    require("./fb-action/union-dynamic-settlement-config.js")),
  union_effect_pos2_js_1 =
    (Object.defineProperty(exports, "UnionDynamicSettlementConfig", {
      enumerable: !0,
      get: function () {
        return union_dynamic_settlement_config_js_1.UnionDynamicSettlementConfig;
      },
    }),
    require("./fb-action/union-effect-pos2.js")),
  union_enable_sub_level_transition_js_1 =
    (Object.defineProperty(exports, "UnionEffectPos2", {
      enumerable: !0,
      get: function () {
        return union_effect_pos2_js_1.UnionEffectPos2;
      },
    }),
    require("./fb-action/union-enable-sub-level-transition.js")),
  union_enter_orbital_camera_option_js_1 =
    (Object.defineProperty(exports, "UnionEnableSubLevelTransition", {
      enumerable: !0,
      get: function () {
        return union_enable_sub_level_transition_js_1.UnionEnableSubLevelTransition;
      },
    }),
    require("./fb-action/union-enter-orbital-camera-option.js")),
  union_exec_battle_option_js_1 =
    (Object.defineProperty(exports, "UnionEnterOrbitalCameraOption", {
      enumerable: !0,
      get: function () {
        return union_enter_orbital_camera_option_js_1.UnionEnterOrbitalCameraOption;
      },
    }),
    require("./fb-action/union-exec-battle-option.js")),
  union_exit_vehicle_type_js_1 =
    (Object.defineProperty(exports, "UnionExecBattleOption", {
      enumerable: !0,
      get: function () {
        return union_exec_battle_option_js_1.UnionExecBattleOption;
      },
    }),
    require("./fb-action/union-exit-vehicle-type.js")),
  union_explore_state_js_1 =
    (Object.defineProperty(exports, "UnionExitVehicleType", {
      enumerable: !0,
      get: function () {
        return union_exit_vehicle_type_js_1.UnionExitVehicleType;
      },
    }),
    require("./fb-action/union-explore-state.js")),
  union_fire_bullet_js_1 =
    (Object.defineProperty(exports, "UnionExploreState", {
      enumerable: !0,
      get: function () {
        return union_explore_state_js_1.UnionExploreState;
      },
    }),
    require("./fb-action/union-fire-bullet.js")),
  union_guest_operate_ui_animation_js_1 =
    (Object.defineProperty(exports, "UnionFireBullet", {
      enumerable: !0,
      get: function () {
        return union_fire_bullet_js_1.UnionFireBullet;
      },
    }),
    require("./fb-action/union-guest-operate-ui-animation.js")),
  union_head_style_js_1 =
    (Object.defineProperty(exports, "UnionGuestOperateUiAnimation", {
      enumerable: !0,
      get: function () {
        return union_guest_operate_ui_animation_js_1.UnionGuestOperateUiAnimation;
      },
    }),
    require("./fb-action/union-head-style.js")),
  union_hide_group_config_js_1 =
    (Object.defineProperty(exports, "UnionHeadStyle", {
      enumerable: !0,
      get: function () {
        return union_head_style_js_1.UnionHeadStyle;
      },
    }),
    require("./fb-action/union-hide-group-config.js")),
  union_hide_range_config_js_1 =
    (Object.defineProperty(exports, "UnionHideGroupConfig", {
      enumerable: !0,
      get: function () {
        return union_hide_group_config_js_1.UnionHideGroupConfig;
      },
    }),
    require("./fb-action/union-hide-range-config.js")),
  union_highlight_explore_skill_icon_js_1 =
    (Object.defineProperty(exports, "UnionHideRangeConfig", {
      enumerable: !0,
      get: function () {
        return union_hide_range_config_js_1.UnionHideRangeConfig;
      },
    }),
    require("./fb-action/union-highlight-explore-skill-icon.js")),
  union_interact_option_js_1 =
    (Object.defineProperty(exports, "UnionHighlightExploreSkillIcon", {
      enumerable: !0,
      get: function () {
        return union_highlight_explore_skill_icon_js_1.UnionHighlightExploreSkillIcon;
      },
    }),
    require("./fb-action/union-interact-option.js")),
  union_item_get_ui_config_js_1 =
    (Object.defineProperty(exports, "UnionInteractOption", {
      enumerable: !0,
      get: function () {
        return union_interact_option_js_1.UnionInteractOption;
      },
    }),
    require("./fb-action/union-item-get-ui-config.js")),
  union_leisure_interact_option_js_1 =
    (Object.defineProperty(exports, "UnionItemGetUiConfig", {
      enumerable: !0,
      get: function () {
        return union_item_get_ui_config_js_1.UnionItemGetUiConfig;
      },
    }),
    require("./fb-action/union-leisure-interact-option.js")),
  union_level_sequence_transition_js_1 =
    (Object.defineProperty(exports, "UnionLeisureInteractOption", {
      enumerable: !0,
      get: function () {
        return union_leisure_interact_option_js_1.UnionLeisureInteractOption;
      },
    }),
    require("./fb-action/union-level-sequence-transition.js")),
  union_limit_play_operation_js_1 =
    (Object.defineProperty(exports, "UnionLevelSequenceTransition", {
      enumerable: !0,
      get: function () {
        return union_level_sequence_transition_js_1.UnionLevelSequenceTransition;
      },
    }),
    require("./fb-action/union-limit-play-operation.js")),
  union_modify_actor_material_type_js_1 =
    (Object.defineProperty(exports, "UnionLimitPlayOperation", {
      enumerable: !0,
      get: function () {
        return union_limit_play_operation_js_1.UnionLimitPlayOperation;
      },
    }),
    require("./fb-action/union-modify-actor-material-type.js")),
  union_modify_scene_item_attribute_tag_js_1 =
    (Object.defineProperty(exports, "UnionModifyActorMaterialType", {
      enumerable: !0,
      get: function () {
        return union_modify_actor_material_type_js_1.UnionModifyActorMaterialType;
      },
    }),
    require("./fb-action/union-modify-scene-item-attribute-tag.js")),
  union_montage_config_js_1 =
    (Object.defineProperty(exports, "UnionModifySceneItemAttributeTag", {
      enumerable: !0,
      get: function () {
        return union_modify_scene_item_attribute_tag_js_1.UnionModifySceneItemAttributeTag;
      },
    }),
    require("./fb-action/union-montage-config.js")),
  union_move_operation_js_1 =
    (Object.defineProperty(exports, "UnionMontageConfig", {
      enumerable: !0,
      get: function () {
        return union_montage_config_js_1.UnionMontageConfig;
      },
    }),
    require("./fb-action/union-move-operation.js")),
  union_move_scene_item_js_1 =
    (Object.defineProperty(exports, "UnionMoveOperation", {
      enumerable: !0,
      get: function () {
        return union_move_operation_js_1.UnionMoveOperation;
      },
    }),
    require("./fb-action/union-move-scene-item.js")),
  union_move_to_point_type_js_1 =
    (Object.defineProperty(exports, "UnionMoveSceneItem", {
      enumerable: !0,
      get: function () {
        return union_move_scene_item_js_1.UnionMoveSceneItem;
      },
    }),
    require("./fb-action/union-move-to-point-type.js")),
  union_new_spline_move_target_js_1 =
    (Object.defineProperty(exports, "UnionMoveToPointType", {
      enumerable: !0,
      get: function () {
        return union_move_to_point_type_js_1.UnionMoveToPointType;
      },
    }),
    require("./fb-action/union-new-spline-move-target.js")),
  union_npc_leisure_interact_op_js_1 =
    (Object.defineProperty(exports, "UnionNewSplineMoveTarget", {
      enumerable: !0,
      get: function () {
        return union_new_spline_move_target_js_1.UnionNewSplineMoveTarget;
      },
    }),
    require("./fb-action/union-npc-leisure-interact-op.js")),
  union_open_qte_config_js_1 =
    (Object.defineProperty(exports, "UnionNpcLeisureInteractOp", {
      enumerable: !0,
      get: function () {
        return union_npc_leisure_interact_op_js_1.UnionNpcLeisureInteractOp;
      },
    }),
    require("./fb-action/union-open-qte-config.js")),
  union_open_system_board_with_return_js_1 =
    (Object.defineProperty(exports, "UnionOpenQteConfig", {
      enumerable: !0,
      get: function () {
        return union_open_qte_config_js_1.UnionOpenQteConfig;
      },
    }),
    require("./fb-action/union-open-system-board-with-return.js")),
  union_performer_ai_move_to_config_js_1 =
    (Object.defineProperty(exports, "UnionOpenSystemBoardWithReturn", {
      enumerable: !0,
      get: function () {
        return union_open_system_board_with_return_js_1.UnionOpenSystemBoardWithReturn;
      },
    }),
    require("./fb-action/union-performer-ai-move-to-config.js")),
  union_play_guest_ui_animation_type_js_1 =
    (Object.defineProperty(exports, "UnionPerformerAiMoveToConfig", {
      enumerable: !0,
      get: function () {
        return union_performer_ai_move_to_config_js_1.UnionPerformerAiMoveToConfig;
      },
    }),
    require("./fb-action/union-play-guest-ui-animation-type.js")),
  union_pos2_js_1 =
    (Object.defineProperty(exports, "UnionPlayGuestUiAnimationType", {
      enumerable: !0,
      get: function () {
        return union_play_guest_ui_animation_type_js_1.UnionPlayGuestUiAnimationType;
      },
    }),
    require("./fb-action/union-pos2.js")),
  union_post_ak_event_js_1 =
    (Object.defineProperty(exports, "UnionPos2", {
      enumerable: !0,
      get: function () {
        return union_pos2_js_1.UnionPos2;
      },
    }),
    require("./fb-action/union-post-ak-event.js")),
  union_prefab_config_js_1 =
    (Object.defineProperty(exports, "UnionPostAkEvent", {
      enumerable: !0,
      get: function () {
        return union_post_ak_event_js_1.UnionPostAkEvent;
      },
    }),
    require("./fb-action/union-prefab-config.js")),
  union_preload_object_type_config_js_1 =
    (Object.defineProperty(exports, "UnionPrefabConfig", {
      enumerable: !0,
      get: function () {
        return union_prefab_config_js_1.UnionPrefabConfig;
      },
    }),
    require("./fb-action/union-preload-object-type-config.js")),
  union_remove_preload_resource_config_js_1 =
    (Object.defineProperty(exports, "UnionPreloadObjectTypeConfig", {
      enumerable: !0,
      get: function () {
        return union_preload_object_type_config_js_1.UnionPreloadObjectTypeConfig;
      },
    }),
    require("./fb-action/union-remove-preload-resource-config.js")),
  union_reset_entity_config_js_1 =
    (Object.defineProperty(exports, "UnionRemovePreloadResourceConfig", {
      enumerable: !0,
      get: function () {
        return union_remove_preload_resource_config_js_1.UnionRemovePreloadResourceConfig;
      },
    }),
    require("./fb-action/union-reset-entity-config.js")),
  union_reset_player_focus_type_js_1 =
    (Object.defineProperty(exports, "UnionResetEntityConfig", {
      enumerable: !0,
      get: function () {
        return union_reset_entity_config_js_1.UnionResetEntityConfig;
      },
    }),
    require("./fb-action/union-reset-player-focus-type.js")),
  union_rogue_select_room_js_1 =
    (Object.defineProperty(exports, "UnionResetPlayerFocusType", {
      enumerable: !0,
      get: function () {
        return union_reset_player_focus_type_js_1.UnionResetPlayerFocusType;
      },
    }),
    require("./fb-action/union-rogue-select-room.js")),
  union_scene_interaction_operation_js_1 =
    (Object.defineProperty(exports, "UnionRogueSelectRoom", {
      enumerable: !0,
      get: function () {
        return union_rogue_select_room_js_1.UnionRogueSelectRoom;
      },
    }),
    require("./fb-action/union-scene-interaction-operation.js")),
  union_set_alert_value_type_js_1 =
    (Object.defineProperty(exports, "UnionSceneInteractionOperation", {
      enumerable: !0,
      get: function () {
        return union_scene_interaction_operation_js_1.UnionSceneInteractionOperation;
      },
    }),
    require("./fb-action/union-set-alert-value-type.js")),
  union_set_area_time_type_js_1 =
    (Object.defineProperty(exports, "UnionSetAlertValueType", {
      enumerable: !0,
      get: function () {
        return union_set_alert_value_type_js_1.UnionSetAlertValueType;
      },
    }),
    require("./fb-action/union-set-area-time-type.js")),
  union_set_global_time_scale_js_1 =
    (Object.defineProperty(exports, "UnionSetAreaTimeType", {
      enumerable: !0,
      get: function () {
        return union_set_area_time_type_js_1.UnionSetAreaTimeType;
      },
    }),
    require("./fb-action/union-set-global-time-scale.js")),
  union_set_jigsaw_foundation_js_1 =
    (Object.defineProperty(exports, "UnionSetGlobalTimeScale", {
      enumerable: !0,
      get: function () {
        return union_set_global_time_scale_js_1.UnionSetGlobalTimeScale;
      },
    }),
    require("./fb-action/union-set-jigsaw-foundation.js")),
  union_set_jigsaw_item_js_1 =
    (Object.defineProperty(exports, "UnionSetJigsawFoundation", {
      enumerable: !0,
      get: function () {
        return union_set_jigsaw_foundation_js_1.UnionSetJigsawFoundation;
      },
    }),
    require("./fb-action/union-set-jigsaw-item.js")),
  union_set_player_operation_restriction_js_1 =
    (Object.defineProperty(exports, "UnionSetJigsawItem", {
      enumerable: !0,
      get: function () {
        return union_set_jigsaw_item_js_1.UnionSetJigsawItem;
      },
    }),
    require("./fb-action/union-set-player-operation-restriction.js")),
  union_set_spine_animation_js_1 =
    (Object.defineProperty(exports, "UnionSetPlayerOperationRestriction", {
      enumerable: !0,
      get: function () {
        return union_set_player_operation_restriction_js_1.UnionSetPlayerOperationRestriction;
      },
    }),
    require("./fb-action/union-set-spine-animation.js")),
  union_set_tele_control_config_js_1 =
    (Object.defineProperty(exports, "UnionSetSpineAnimation", {
      enumerable: !0,
      get: function () {
        return union_set_spine_animation_js_1.UnionSetSpineAnimation;
      },
    }),
    require("./fb-action/union-set-tele-control-config.js")),
  union_set_time_scale_js_1 =
    (Object.defineProperty(exports, "UnionSetTeleControlConfig", {
      enumerable: !0,
      get: function () {
        return union_set_tele_control_config_js_1.UnionSetTeleControlConfig;
      },
    }),
    require("./fb-action/union-set-time-scale.js")),
  union_ski_config_js_1 =
    (Object.defineProperty(exports, "UnionSetTimeScale", {
      enumerable: !0,
      get: function () {
        return union_set_time_scale_js_1.UnionSetTimeScale;
      },
    }),
    require("./fb-action/union-ski-config.js")),
  union_skill_operation_js_1 =
    (Object.defineProperty(exports, "UnionSkiConfig", {
      enumerable: !0,
      get: function () {
        return union_ski_config_js_1.UnionSkiConfig;
      },
    }),
    require("./fb-action/union-skill-operation.js")),
  union_spline_move_model_js_1 =
    (Object.defineProperty(exports, "UnionSkillOperation", {
      enumerable: !0,
      get: function () {
        return union_skill_operation_js_1.UnionSkillOperation;
      },
    }),
    require("./fb-action/union-spline-move-model.js")),
  union_spline_move_pattern_js_1 =
    (Object.defineProperty(exports, "UnionSplineMoveModel", {
      enumerable: !0,
      get: function () {
        return union_spline_move_model_js_1.UnionSplineMoveModel;
      },
    }),
    require("./fb-action/union-spline-move-pattern.js")),
  union_spline_move_target_js_1 =
    (Object.defineProperty(exports, "UnionSplineMovePattern", {
      enumerable: !0,
      get: function () {
        return union_spline_move_pattern_js_1.UnionSplineMovePattern;
      },
    }),
    require("./fb-action/union-spline-move-target.js")),
  union_sport_state_js_1 =
    (Object.defineProperty(exports, "UnionSplineMoveTarget", {
      enumerable: !0,
      get: function () {
        return union_spline_move_target_js_1.UnionSplineMoveTarget;
      },
    }),
    require("./fb-action/union-sport-state.js")),
  union_state_option_js_1 =
    (Object.defineProperty(exports, "UnionSportState", {
      enumerable: !0,
      get: function () {
        return union_sport_state_js_1.UnionSportState;
      },
    }),
    require("./fb-action/union-state-option.js")),
  union_stop_guest_ui_animation_type_js_1 =
    (Object.defineProperty(exports, "UnionStateOption", {
      enumerable: !0,
      get: function () {
        return union_state_option_js_1.UnionStateOption;
      },
    }),
    require("./fb-action/union-stop-guest-ui-animation-type.js")),
  union_stop_new_move_with_spline_type_js_1 =
    (Object.defineProperty(exports, "UnionStopGuestUiAnimationType", {
      enumerable: !0,
      get: function () {
        return union_stop_guest_ui_animation_type_js_1.UnionStopGuestUiAnimationType;
      },
    }),
    require("./fb-action/union-stop-new-move-with-spline-type.js")),
  union_summon_entity_type_js_1 =
    (Object.defineProperty(exports, "UnionStopNewMoveWithSplineType", {
      enumerable: !0,
      get: function () {
        return union_stop_new_move_with_spline_type_js_1.UnionStopNewMoveWithSplineType;
      },
    }),
    require("./fb-action/union-summon-entity-type.js")),
  union_switch_sub_levels_js_1 =
    (Object.defineProperty(exports, "UnionSummonEntityType", {
      enumerable: !0,
      get: function () {
        return union_summon_entity_type_js_1.UnionSummonEntityType;
      },
    }),
    require("./fb-action/union-switch-sub-levels.js")),
  union_talk_background_js_1 =
    (Object.defineProperty(exports, "UnionSwitchSubLevels", {
      enumerable: !0,
      get: function () {
        return union_switch_sub_levels_js_1.UnionSwitchSubLevels;
      },
    }),
    require("./fb-action/union-talk-background.js")),
  union_talk_option_param_js_1 =
    (Object.defineProperty(exports, "UnionTalkBackground", {
      enumerable: !0,
      get: function () {
        return union_talk_background_js_1.UnionTalkBackground;
      },
    }),
    require("./fb-action/union-talk-option-param.js")),
  union_talk_option_pre_condition_js_1 =
    (Object.defineProperty(exports, "UnionTalkOptionParam", {
      enumerable: !0,
      get: function () {
        return union_talk_option_param_js_1.UnionTalkOptionParam;
      },
    }),
    require("./fb-action/union-talk-option-pre-condition.js")),
  union_target_entity_js_1 =
    (Object.defineProperty(exports, "UnionTalkOptionPreCondition", {
      enumerable: !0,
      get: function () {
        return union_talk_option_pre_condition_js_1.UnionTalkOptionPreCondition;
      },
    }),
    require("./fb-action/union-target-entity.js")),
  union_target_vehicle_js_1 =
    (Object.defineProperty(exports, "UnionTargetEntity", {
      enumerable: !0,
      get: function () {
        return union_target_entity_js_1.UnionTargetEntity;
      },
    }),
    require("./fb-action/union-target-vehicle.js")),
  union_teammate_teleport_config_js_1 =
    (Object.defineProperty(exports, "UnionTargetVehicle", {
      enumerable: !0,
      get: function () {
        return union_target_vehicle_js_1.UnionTargetVehicle;
      },
    }),
    require("./fb-action/union-teammate-teleport-config.js")),
  union_teleport_config_js_1 =
    (Object.defineProperty(exports, "UnionTeammateTeleportConfig", {
      enumerable: !0,
      get: function () {
        return union_teammate_teleport_config_js_1.UnionTeammateTeleportConfig;
      },
    }),
    require("./fb-action/union-teleport-config.js")),
  union_teleport_to_and_enter_vehicle_type_js_1 =
    (Object.defineProperty(exports, "UnionTeleportConfig", {
      enumerable: !0,
      get: function () {
        return union_teleport_config_js_1.UnionTeleportConfig;
      },
    }),
    require("./fb-action/union-teleport-to-and-enter-vehicle-type.js")),
  union_teleport_to_latest_reset_point_option_js_1 =
    (Object.defineProperty(exports, "UnionTeleportToAndEnterVehicleType", {
      enumerable: !0,
      get: function () {
        return union_teleport_to_and_enter_vehicle_type_js_1.UnionTeleportToAndEnterVehicleType;
      },
    }),
    require("./fb-action/union-teleport-to-latest-reset-point-option.js")),
  union_teleport_transition_option_js_1 =
    (Object.defineProperty(exports, "UnionTeleportToLatestResetPointOption", {
      enumerable: !0,
      get: function () {
        return union_teleport_to_latest_reset_point_option_js_1.UnionTeleportToLatestResetPointOption;
      },
    }),
    require("./fb-action/union-teleport-transition-option.js")),
  union_toggle_air_wall_js_1 =
    (Object.defineProperty(exports, "UnionTeleportTransitionOption", {
      enumerable: !0,
      get: function () {
        return union_teleport_transition_option_js_1.UnionTeleportTransitionOption;
      },
    }),
    require("./fb-action/union-toggle-air-wall.js")),
  union_toggle_map_mark_state_js_1 =
    (Object.defineProperty(exports, "UnionToggleAirWall", {
      enumerable: !0,
      get: function () {
        return union_toggle_air_wall_js_1.UnionToggleAirWall;
      },
    }),
    require("./fb-action/union-toggle-map-mark-state.js")),
  union_toggle_scan_spline_effect_js_1 =
    (Object.defineProperty(exports, "UnionToggleMapMarkState", {
      enumerable: !0,
      get: function () {
        return union_toggle_map_mark_state_js_1.UnionToggleMapMarkState;
      },
    }),
    require("./fb-action/union-toggle-scan-spline-effect.js")),
  union_ui_game_js_1 =
    (Object.defineProperty(exports, "UnionToggleScanSplineEffect", {
      enumerable: !0,
      get: function () {
        return union_toggle_scan_spline_effect_js_1.UnionToggleScanSplineEffect;
      },
    }),
    require("./fb-action/union-ui-game.js")),
  union_ui_operation_js_1 =
    (Object.defineProperty(exports, "UnionUiGame", {
      enumerable: !0,
      get: function () {
        return union_ui_game_js_1.UnionUiGame;
      },
    }),
    require("./fb-action/union-ui-operation.js")),
  union_unlock_atlas_system_option_js_1 =
    (Object.defineProperty(exports, "UnionUiOperation", {
      enumerable: !0,
      get: function () {
        return union_ui_operation_js_1.UnionUiOperation;
      },
    }),
    require("./fb-action/union-unlock-atlas-system-option.js")),
  union_unlock_cook_system_option_js_1 =
    (Object.defineProperty(exports, "UnionUnlockAtlasSystemOption", {
      enumerable: !0,
      get: function () {
        return union_unlock_atlas_system_option_js_1.UnionUnlockAtlasSystemOption;
      },
    }),
    require("./fb-action/union-unlock-cook-system-option.js")),
  union_unlock_system_option_js_1 =
    (Object.defineProperty(exports, "UnionUnlockCookSystemOption", {
      enumerable: !0,
      get: function () {
        return union_unlock_cook_system_option_js_1.UnionUnlockCookSystemOption;
      },
    }),
    require("./fb-action/union-unlock-system-option.js")),
  union_var_js_1 =
    (Object.defineProperty(exports, "UnionUnlockSystemOption", {
      enumerable: !0,
      get: function () {
        return union_unlock_system_option_js_1.UnionUnlockSystemOption;
      },
    }),
    require("./fb-action/union-var.js")),
  union_var_context_js_1 =
    (Object.defineProperty(exports, "UnionVar", {
      enumerable: !0,
      get: function () {
        return union_var_js_1.UnionVar;
      },
    }),
    require("./fb-action/union-var-context.js")),
  union_vehicle_control_type_js_1 =
    (Object.defineProperty(exports, "UnionVarContext", {
      enumerable: !0,
      get: function () {
        return union_var_context_js_1.UnionVarContext;
      },
    }),
    require("./fb-action/union-vehicle-control-type.js")),
  union_vehicle_entering_target_js_1 =
    (Object.defineProperty(exports, "UnionVehicleControlType", {
      enumerable: !0,
      get: function () {
        return union_vehicle_control_type_js_1.UnionVehicleControlType;
      },
    }),
    require("./fb-action/union-vehicle-entering-target.js")),
  universal_tone_js_1 =
    (Object.defineProperty(exports, "UnionVehicleEnteringTarget", {
      enumerable: !0,
      get: function () {
        return union_vehicle_entering_target_js_1.UnionVehicleEnteringTarget;
      },
    }),
    require("./fb-action/universal-tone.js")),
  unlock_achievement_system_item_js_1 =
    (Object.defineProperty(exports, "UniversalTone", {
      enumerable: !0,
      get: function () {
        return universal_tone_js_1.UniversalTone;
      },
    }),
    require("./fb-action/unlock-achievement-system-item.js")),
  unlock_atlas_system_item_js_1 =
    (Object.defineProperty(exports, "UnlockAchievementSystemItem", {
      enumerable: !0,
      get: function () {
        return unlock_achievement_system_item_js_1.UnlockAchievementSystemItem;
      },
    }),
    require("./fb-action/unlock-atlas-system-item.js")),
  unlock_cook_system_cook_book_js_1 =
    (Object.defineProperty(exports, "UnlockAtlasSystemItem", {
      enumerable: !0,
      get: function () {
        return unlock_atlas_system_item_js_1.UnlockAtlasSystemItem;
      },
    }),
    require("./fb-action/unlock-cook-system-cook-book.js")),
  unlock_dungeon_entry_js_1 =
    (Object.defineProperty(exports, "UnlockCookSystemCookBook", {
      enumerable: !0,
      get: function () {
        return unlock_cook_system_cook_book_js_1.UnlockCookSystemCookBook;
      },
    }),
    require("./fb-action/unlock-dungeon-entry.js")),
  unlock_entity_js_1 =
    (Object.defineProperty(exports, "UnlockDungeonEntry", {
      enumerable: !0,
      get: function () {
        return unlock_dungeon_entry_js_1.UnlockDungeonEntry;
      },
    }),
    require("./fb-action/unlock-entity.js")),
  unlock_geographical_atlas_js_1 =
    (Object.defineProperty(exports, "UnlockEntity", {
      enumerable: !0,
      get: function () {
        return unlock_entity_js_1.UnlockEntity;
      },
    }),
    require("./fb-action/unlock-geographical-atlas.js")),
  unlock_noun_atlas_js_1 =
    (Object.defineProperty(exports, "UnlockGeographicalAtlas", {
      enumerable: !0,
      get: function () {
        return unlock_geographical_atlas_js_1.UnlockGeographicalAtlas;
      },
    }),
    require("./fb-action/unlock-noun-atlas.js")),
  unlock_photo_memory_collect_system_item_js_1 =
    (Object.defineProperty(exports, "UnlockNounAtlas", {
      enumerable: !0,
      get: function () {
        return unlock_noun_atlas_js_1.UnlockNounAtlas;
      },
    }),
    require("./fb-action/unlock-photo-memory-collect-system-item.js")),
  unlock_plot_photo_atlas_js_1 =
    (Object.defineProperty(exports, "UnlockPhotoMemoryCollectSystemItem", {
      enumerable: !0,
      get: function () {
        return unlock_photo_memory_collect_system_item_js_1.UnlockPhotoMemoryCollectSystemItem;
      },
    }),
    require("./fb-action/unlock-plot-photo-atlas.js")),
  unlock_system_item_js_1 =
    (Object.defineProperty(exports, "UnlockPlotPhotoAtlas", {
      enumerable: !0,
      get: function () {
        return unlock_plot_photo_atlas_js_1.UnlockPlotPhotoAtlas;
      },
    }),
    require("./fb-action/unlock-system-item.js")),
  unlock_teleport_trigger_js_1 =
    (Object.defineProperty(exports, "UnlockSystemItem", {
      enumerable: !0,
      get: function () {
        return unlock_system_item_js_1.UnlockSystemItem;
      },
    }),
    require("./fb-action/unlock-teleport-trigger.js")),
  use_phantom_skill_js_1 =
    (Object.defineProperty(exports, "UnlockTeleportTrigger", {
      enumerable: !0,
      get: function () {
        return unlock_teleport_trigger_js_1.UnlockTeleportTrigger;
      },
    }),
    require("./fb-action/use-phantom-skill.js")),
  variable_motion_js_1 =
    (Object.defineProperty(exports, "UsePhantomSkill", {
      enumerable: !0,
      get: function () {
        return use_phantom_skill_js_1.UsePhantomSkill;
      },
    }),
    require("./fb-action/variable-motion.js")),
  vehicle_cruising_params_js_1 =
    (Object.defineProperty(exports, "VariableMotion", {
      enumerable: !0,
      get: function () {
        return variable_motion_js_1.VariableMotion;
      },
    }),
    require("./fb-action/vehicle-cruising-params.js")),
  vehicle_enter_js_1 =
    (Object.defineProperty(exports, "VehicleCruisingParams", {
      enumerable: !0,
      get: function () {
        return vehicle_cruising_params_js_1.VehicleCruisingParams;
      },
    }),
    require("./fb-action/vehicle-enter.js")),
  vehicle_enter_path_move_js_1 =
    (Object.defineProperty(exports, "VehicleEnter", {
      enumerable: !0,
      get: function () {
        return vehicle_enter_js_1.VehicleEnter;
      },
    }),
    require("./fb-action/vehicle-enter-path-move.js")),
  vehicle_entering_npc_target_js_1 =
    (Object.defineProperty(exports, "VehicleEnterPathMove", {
      enumerable: !0,
      get: function () {
        return vehicle_enter_path_move_js_1.VehicleEnterPathMove;
      },
    }),
    require("./fb-action/vehicle-entering-npc-target.js")),
  vehicle_entering_player_target_js_1 =
    (Object.defineProperty(exports, "VehicleEnteringNpcTarget", {
      enumerable: !0,
      get: function () {
        return vehicle_entering_npc_target_js_1.VehicleEnteringNpcTarget;
      },
    }),
    require("./fb-action/vehicle-entering-player-target.js")),
  vehicle_entity_js_1 =
    (Object.defineProperty(exports, "VehicleEnteringPlayerTarget", {
      enumerable: !0,
      get: function () {
        return vehicle_entering_player_target_js_1.VehicleEnteringPlayerTarget;
      },
    }),
    require("./fb-action/vehicle-entity.js")),
  vehicle_exit_npc_js_1 =
    (Object.defineProperty(exports, "VehicleEntity", {
      enumerable: !0,
      get: function () {
        return vehicle_entity_js_1.VehicleEntity;
      },
    }),
    require("./fb-action/vehicle-exit-npc.js")),
  vehicle_exit_path_move_js_1 =
    (Object.defineProperty(exports, "VehicleExitNpc", {
      enumerable: !0,
      get: function () {
        return vehicle_exit_npc_js_1.VehicleExitNpc;
      },
    }),
    require("./fb-action/vehicle-exit-path-move.js")),
  vehicle_exit_player_js_1 =
    (Object.defineProperty(exports, "VehicleExitPathMove", {
      enumerable: !0,
      get: function () {
        return vehicle_exit_path_move_js_1.VehicleExitPathMove;
      },
    }),
    require("./fb-action/vehicle-exit-player.js")),
  vehicle_move_with_path_line_js_1 =
    (Object.defineProperty(exports, "VehicleExitPlayer", {
      enumerable: !0,
      get: function () {
        return vehicle_exit_player_js_1.VehicleExitPlayer;
      },
    }),
    require("./fb-action/vehicle-move-with-path-line.js")),
  vehicle_new_spline_move_target_js_1 =
    (Object.defineProperty(exports, "VehicleMoveWithPathLine", {
      enumerable: !0,
      get: function () {
        return vehicle_move_with_path_line_js_1.VehicleMoveWithPathLine;
      },
    }),
    require("./fb-action/vehicle-new-spline-move-target.js")),
  vehicle_play_passenger_voice_js_1 =
    (Object.defineProperty(exports, "VehicleNewSplineMoveTarget", {
      enumerable: !0,
      get: function () {
        return vehicle_new_spline_move_target_js_1.VehicleNewSplineMoveTarget;
      },
    }),
    require("./fb-action/vehicle-play-passenger-voice.js")),
  vehicle_sprint_js_1 =
    (Object.defineProperty(exports, "VehiclePlayPassengerVoice", {
      enumerable: !0,
      get: function () {
        return vehicle_play_passenger_voice_js_1.VehiclePlayPassengerVoice;
      },
    }),
    require("./fb-action/vehicle-sprint.js")),
  vehicle_waterfall_climb_gravity_config_js_1 =
    (Object.defineProperty(exports, "VehicleSprint", {
      enumerable: !0,
      get: function () {
        return vehicle_sprint_js_1.VehicleSprint;
      },
    }),
    require("./fb-action/vehicle-waterfall-climb-gravity-config.js")),
  vehicle_waterfall_climbing_js_1 =
    (Object.defineProperty(exports, "VehicleWaterfallClimbGravityConfig", {
      enumerable: !0,
      get: function () {
        return vehicle_waterfall_climb_gravity_config_js_1.VehicleWaterfallClimbGravityConfig;
      },
    }),
    require("./fb-action/vehicle-waterfall-climbing.js")),
  wait_js_1 =
    (Object.defineProperty(exports, "VehicleWaterfallClimbing", {
      enumerable: !0,
      get: function () {
        return vehicle_waterfall_climbing_js_1.VehicleWaterfallClimbing;
      },
    }),
    require("./fb-action/wait.js")),
  wait_battle_condition_js_1 =
    (Object.defineProperty(exports, "Wait", {
      enumerable: !0,
      get: function () {
        return wait_js_1.Wait;
      },
    }),
    require("./fb-action/wait-battle-condition.js")),
  white_cat_warning_js_1 =
    (Object.defineProperty(exports, "WaitBattleCondition", {
      enumerable: !0,
      get: function () {
        return wait_battle_condition_js_1.WaitBattleCondition;
      },
    }),
    require("./fb-action/white-cat-warning.js"));
Object.defineProperty(exports, "WhiteCatWarning", {
  enumerable: !0,
  get: function () {
    return white_cat_warning_js_1.WhiteCatWarning;
  },
});
//# sourceMappingURL=fb-action.js.map
