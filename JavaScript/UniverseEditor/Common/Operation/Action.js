"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.parsePlayFlow =
    exports.parseFlowInfo =
    exports.posToString =
    exports.alignPosA =
    exports.alignVector =
    exports.defaultPosA =
    exports.createDefaultTransform =
    exports.defaultScale =
    exports.defaultRot =
    exports.toFloat1 =
    exports.toFloat2 =
    exports.toFloat6 =
    exports.eqn =
    exports.defaultVec =
    exports.getActions =
    exports.getActionRestrictedMapContext =
    exports.isBanInDynamicPrefabAction =
    exports.isActionImplementType =
    exports.isTestAction =
    exports.actionConfig =
      void 0);
const ILevel_1 = require("../../Interface/ILevel"),
  Util_1 = require("../Misc/Util");
function isTestAction(e, t) {
  return (
    !!exports.actionConfig[e].IsTest ||
    !!exports.actionConfig[e].ContextForTest?.includes(t)
  );
}
function isActionImplementType(e, t) {
  return exports.actionConfig[e].ImplementType === t;
}
function isBanInDynamicPrefabAction(e) {
  return !!exports.actionConfig[e].IsBanInDynamicPrefab;
}
(exports.actionConfig = {
  Invoke: {
    Context: ["entity", "quest", "flow", "levelPlay"],
    Env: ["ue5"],
    ImplementType: "Client",
  },
  EnableAI: {
    Context: ["quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
    IsTest: !0,
  },
  ShowMessage: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["ue5"],
    ImplementType: "Client",
  },
  Log: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  Wait: {
    Context: ["entity", "flow", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  SetVar: {
    Context: ["entity", "flow", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  CalculateVar: {
    Context: ["entity", "flow", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  PlayerLookAt: {
    Context: ["entity", "flow", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  EntityLookAt: {
    Context: ["quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  CharacterLookAt: {
    Context: ["quest", "entity", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  CameraLookAt: {
    Context: ["entity", "flow", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  StopCameraLookAt: {
    Context: ["entity", "flow", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Client",
  },
  AwakeEntity: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  DestroyEntity: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  DestroySelf: { Context: ["entity"], Env: ["aki"], ImplementType: "Server" },
  PlayFlow: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
    IsBanInDynamicPrefab: !0,
  },
  Activate: { Env: ["ue5"], ImplementType: "Client" },
  AccpetCurrentQuest: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Server",
  },
  AddFlowInteractOption: {
    Context: ["quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  SetTime: {
    Context: ["quest", "levelPlay", "flow"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  CallByCondition: { Env: ["ue5"], ImplementType: "Client" },
  CallFunction: { Env: ["ue5"], ImplementType: "Client" },
  ChangeActorState: { Env: ["ue5"], ImplementType: "Client" },
  ChangeBehaviorState: {
    Env: ["ue5"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  ChangeInteractOptionText: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Server",
  },
  ChangeOtherState: {
    Context: ["quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  ChangeRandomState: {
    Env: ["aki", "ue5"],
    Context: [],
    ImplementType: "Client",
  },
  ChangeState: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Server",
  },
  CompleteChildQuest: { Env: ["aki"], ImplementType: "Client" },
  Destroy: { Env: ["ue5"], Context: ["flow"], ImplementType: "Client" },
  DestroyAllChild: { Env: ["ue5"], ImplementType: "Client" },
  DoCalculate: { Env: ["ue5"], ImplementType: "Client" },
  FaceToPos: { Env: ["ue5"], ImplementType: "Client" },
  FinishDoInteract: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Server",
  },
  FinishState: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Server",
  },
  FinishTalk: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Server",
  },
  JumpTalk: { Env: ["aki", "ue5"], Context: ["flow"], ImplementType: "Server" },
  MoveToPos: { Env: ["ue5"], Context: ["flow"], ImplementType: "Client" },
  MoveWithSpline: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  NewMoveWithSpline: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
    IsTest: !0,
  },
  StopNewMoveWithSpline: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
    IsTest: !0,
  },
  CharacterMoveToPoint: {
    Env: ["aki"],
    Context: ["entity", "levelPlay", "quest"],
    ImplementType: "Client",
  },
  AddPlayBubble: {
    Context: ["quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  ClearPlayBubble: {
    Context: ["quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  PlayBubble: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  PlayCustomSequence: { Env: [], ImplementType: "Client" },
  PlayMovie: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  PlayMontage: {
    Context: ["quest", "levelPlay", "entity"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  PlaySequenceData: {
    Context: ["flow"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  RemoveFlowInteractOption: {
    Context: ["quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  SetBehaviorIsPaused: {
    Env: ["ue5"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  SetCameraMode: { Env: ["aki"], ImplementType: "Client" },
  SetHeadIconVisible: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  SetMoveSpeed: { Env: ["ue5"], ImplementType: "Client" },
  SetNumberVar: { Env: ["ue5"], ImplementType: "Client" },
  SetPlotMode: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  SetPos: { Env: ["ue5"], ImplementType: "Client" },
  SetForceLock: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Client",
    IsTest: !0,
  },
  ShowCenterText: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  ShowTalk: { Env: ["aki", "ue5"], Context: ["flow"], ImplementType: "Client" },
  SimpleMove: { Env: ["ue5"], ImplementType: "Client" },
  SpawnChild: { Env: ["ue5"], ImplementType: "Client" },
  SyncVarToActorState: { Env: ["ue5"], ImplementType: "Client" },
  LockEntity: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  UnlockEntity: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  AddBuffToEntity: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  AddBuffToPlayer: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  AddBuffToFollowShooter: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  GuideTrigger: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  CompleteGuide: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  Prompt: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  SendNpcMail: {
    Context: ["quest"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  Collect: {
    Context: ["entity"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  OpenSystemBoard: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  OpenSystemFunction: {
    Context: ["quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  GetItem: {
    Context: ["quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  SetPlayerMoveControl: { Env: ["aki"], ImplementType: "Client" },
  UnlockTeleportTrigger: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  RemoveBuffFromEntity: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  RemoveBuffFromPlayer: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  SetEntityVisible: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  SetEntityClientVisible: {
    Context: ["entity"],
    Env: ["aki"],
    ImplementType: "Client",
  },
  SetEntityClientVisibleSave: { Env: ["aki"], ImplementType: "Server" },
  PlayEffect: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Client",
  },
  PlayEffect2: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Client",
  },
  ChangeTeamPosition: {
    Context: ["quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  SetWuYinQuState: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Client",
  },
  ClaimLevelPlayReward: {
    Context: ["entity"],
    Env: ["aki"],
    ImplementType: "Client",
  },
  ChangeEntityState: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  ChangeNpcPerformState: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  SetReviveRegion: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  PromptQuestChapterUI: {
    Context: ["quest", "levelPlay", "flow"],
    Env: ["aki"],
    ImplementType: "Client",
  },
  SetAreaState: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
    IsTest: !0,
  },
  FireBullet: { Context: ["entity"], Env: ["aki"], ImplementType: "Client" },
  FireBulletEffect: {
    Env: ["aki", "ue5"],
    Context: ["entity"],
    ImplementType: "Client",
  },
  SetPlayerPos: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  ClientSetPlayerPos: { Env: ["aki"], ImplementType: "Client" },
  ClientPreEnableSubLevels: {
    Env: ["aki"],
    ImplementType: "Client",
    Context: ["entity", "quest", "levelPlay"],
  },
  InterludeActions: {
    Context: ["quest", "levelPlay"],
    Env: [],
    ImplementType: "Client",
  },
  SendAiEvent: { Context: ["entity"], Env: ["aki"], ImplementType: "Client" },
  ClaimDungeonReward: { Env: [], ImplementType: "Client" },
  SettlementDungeon: {
    Context: ["entity", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  ChangeSelfEntityState: {
    Context: ["entity"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  EnableLevelPlay: {
    Context: ["quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  ExitDungeon: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  UnlockDungeonEntry: { Env: [], ImplementType: "Client" },
  SetBattleState: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  WaitBattleCondition: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  EnableHostility: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  UnlockSystemItem: {
    Context: ["entity", "flow", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  RunActions: {
    Context: ["quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  CommonTip: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  CommonTip2: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Client",
  },
  EnableNearbyTracking: {
    Context: ["entity", "levelPlay", "quest"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  TeleportDungeon: {
    Context: ["entity", "levelPlay", "quest"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  ChangeFightTeam: {
    Context: ["entity", "levelPlay", "quest"],
    Env: ["aki"],
    ImplementType: "Server",
    IsTest: !0,
  },
  AddTrialCharacter: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  RemoveTrialCharacter: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  AddGuestCharacter: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  RemoveGuestCharacter: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  AddTrialFollowShooter: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  RemoveTrialFollowShooter: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  LimitPlayerOperation: { Env: ["aki"], ImplementType: "Client" },
  UnLimitPlayerOperation: { Env: ["aki"], ImplementType: "Client" },
  StartFlowTemplate: { Env: [], ImplementType: "Client" },
  BeginFlowTemplate: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  ChangeFlowTemplate: { Env: [], ImplementType: "Client" },
  SetFlowTemplate: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  EndFlowTemplate: { Env: [], ImplementType: "Client" },
  CloseFlowTemplate: {
    Env: ["aki", "ue5"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  FadeInScreen: {
    Env: ["aki", "ue5"],
    Context: ["flow", "quest", "levelPlay", "entity"],
    ImplementType: "Client",
  },
  FadeOutScreen: {
    Env: ["aki", "ue5"],
    Context: ["flow", "quest", "levelPlay", "entity"],
    ImplementType: "Client",
  },
  LeisureInteract: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay", "flow"],
    ImplementType: "Client",
  },
  PostAkEvent: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay", "flow"],
    ImplementType: "Client",
  },
  EnableSystem: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  ChangeLiftTarget: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Server",
  },
  ChangeActorTalker: {
    Env: ["aki"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  MoveSceneItem: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Server",
  },
  StopSceneItemMove: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Server",
  },
  DetectTrigger: { Env: [], Context: ["entity"], ImplementType: "Client" },
  SetWeather: {
    Context: ["quest", "flow", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  SetTimeLockState: {
    Context: ["quest", "flow", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  SetWeatherLockState: {
    Context: ["flow", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  ManualOccupations: {
    Env: ["aki"],
    Context: ["quest"],
    ImplementType: "Server",
  },
  ForceOccupations: { Env: ["aki"], IsTest: !0, ImplementType: "Server" },
  EnableSplineMoveModel: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Client",
  },
  DestroyQuestItem: {
    Context: ["quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  AdjustPlayerCamera: {
    Context: ["entity", "flow", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Client",
  },
  HideByRangeInFlow: {
    Env: ["aki"],
    Context: ["flow"],
    ImplementType: "Server",
  },
  OpenSimpleGameplay: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Client",
  },
  UsePhantomSkill: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Client",
  },
  ChangePhantomFormation: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Server",
  },
  RestorePhantomFormation: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Server",
  },
  SetSportsState: {
    Env: ["aki"],
    Context: ["entity", "levelPlay"],
    ImplementType: "Client",
  },
  FinishDungeon: {
    Env: ["aki"],
    Context: ["entity", "levelPlay"],
    ImplementType: "Server",
  },
  SetExploreState: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Client",
    IsTest: !0,
  },
  EnableActor: { Env: ["aki"], ImplementType: "Client" },
  ModifyActorMaterial: { Env: ["aki"], ImplementType: "Client" },
  PlayLevelSequence: { Env: ["aki"], ImplementType: "Client" },
  ChangePhantom: { Env: [], ImplementType: "Client" },
  RestorePhantom: { Env: [], ImplementType: "Client" },
  TakePlotPhoto: {
    Env: ["aki"],
    Context: ["entity", "quest", "flow"],
    ImplementType: "Client",
    IsTest: !0,
  },
  SwitchSubLevels: {
    Env: ["aki"],
    Context: ["levelPlay"],
    RestrictedMapContext: "DungeonOnly",
    ImplementType: "Server",
  },
  ActivateResetPoint: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  TeleportToLatestResetPoint: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  RestorePlayerCameraAdjustment: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki"],
    ImplementType: "Client",
  },
  ResetPlayerCameraFocus: {
    Context: ["entity", "quest", "levelPlay", "flow"],
    Env: ["aki"],
    ImplementType: "Client",
  },
  EnterOrbitalCamera: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Client",
  },
  ExitOrbitalCamera: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Client",
  },
  ChangeTimer: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  ToggleTimerPauseState: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  SpawnEntity: { Env: [], ImplementType: "Client" },
  AddBuffToTriggeredEntity: { Env: ["aki"], ImplementType: "Server" },
  RemoveBuffToTriggeredEntity: { Env: ["aki"], ImplementType: "Server" },
  ItemFoundationMatch: { Env: ["aki", "ue5"], ImplementType: "Client" },
  DestroyQuest: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  SetCameraAnim: { Env: [], ImplementType: "Client" },
  RotatorEntity: { Env: [], ImplementType: "Client" },
  TraceSpline: {
    Env: ["aki"],
    Context: ["quest"],
    ImplementType: "Client",
    IsTest: !0,
  },
  ToggleScanSplineEffect: {
    Env: ["aki"],
    Context: ["quest"],
    ImplementType: "Client",
  },
  ToggleAirWall: { Env: ["aki"], ImplementType: "Client" },
  RogueGotoNextFloor: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  RogueSelectRoom: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  TriggerCameraShake: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Client",
  },
  EnableAoiNotify: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  RogueActivatePortal: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Server",
  },
  RogueReceiveReward: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  SwitchDataLayers: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    RestrictedMapContext: "WpOnly",
    ImplementType: "Server",
  },
  CreatePrefab: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Server",
  },
  DestroyPrefab: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Server",
  },
  ExecBattleAction: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  ChangeEntityPrefabPerformance: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Client",
  },
  ModifySceneItemAttributeTag: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Server",
  },
  HideTargetRange: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
    IsTest: !0,
  },
  ShowTargetRange: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
    IsTest: !0,
  },
  HideSpecificEntities: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
    IsTest: !0,
  },
  ShowSpecificEntities: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
    IsTest: !0,
  },
  PlayRegisteredMontage: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Client",
  },
  RecoverDurability: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Server",
    IsTest: !0,
  },
  RandomVar: {
    Context: ["entity", "flow", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  SetPlayerOperationRestriction: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Server",
  },
  NpcLeisureInteract: { Env: ["aki"], Context: [], ImplementType: "Client" },
  ToggleMapMarkState: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Server",
  },
  FocusOnMapMark: { Env: ["aki"], Context: ["quest"], ImplementType: "Client" },
  SetJigsawItem: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Client",
  },
  SetJigsawFoundation: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Server",
  },
  SetRegionConfig: {
    Env: ["aki"],
    Context: ["quest", "levelPlay", "entity"],
    ImplementType: "Server",
  },
  ToggleHighlightExploreUi: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Client",
  },
  EnableTemporaryTeleport: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  ResetEntity: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  PlayDynamicSettlement: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Client",
  },
  FinishCondition: { Env: ["aki"], IsTest: !0, ImplementType: "Server" },
  ClearEntityVisibleTag: { Env: ["aki"], IsTest: !0, ImplementType: "Server" },
  SetEntityPos: { Env: ["aki"], IsTest: !0, ImplementType: "Server" },
  ResetEntityPos: { Env: ["aki"], IsTest: !0, ImplementType: "Server" },
  ServerSetPlayerPos: { Env: ["aki"], IsTest: !0, ImplementType: "Server" },
  SetInteractionLockState: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Client",
  },
  FixTeleControllerPos: { Env: ["aki"], IsTest: !0, ImplementType: "Server" },
  FixFoundationRelation: { Env: ["aki"], IsTest: !0, ImplementType: "Server" },
  SetAudioState: {
    Env: ["aki"],
    Context: ["quest", "levelPlay", "flow"],
    ImplementType: "Server",
  },
  ExecRiskHarvestEffect: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Server",
  },
  PerformerAiSplineMove: { Env: ["aki"], Context: [], ImplementType: "Client" },
  PerformerAiMoveTo: {
    Env: ["aki"],
    Context: [],
    ImplementType: "Client",
    IsTest: !0,
  },
  EntityTurnTo: {
    Env: ["aki"],
    Context: ["entity", "levelPlay", "quest"],
    ImplementType: "Client",
  },
  CustomJson: { Env: ["aki"], IsTest: !0, ImplementType: "Server" },
  ExecResurrection: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Server",
  },
  OpenSystemBoardWithReturn: {
    Context: ["entity", "quest", "levelPlay"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  FixShowTargetRange: { Env: ["aki"], IsTest: !0, ImplementType: "Server" },
  SetTeleControl: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Server",
  },
  ActiveAntiGravitySafePoint: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  VehicleEnter: {
    Env: ["aki"],
    Context: ["entity", "levelPlay", "quest"],
    ImplementType: "Server",
    IsBanOnline: !0,
  },
  VehicleEnterNpc: {
    Env: ["aki"],
    Context: ["entity", "levelPlay", "quest"],
    ImplementType: "Client",
    IsBanOnline: !0,
  },
  VehicleExitPlayer: {
    Env: ["aki"],
    Context: ["entity", "levelPlay", "quest"],
    ImplementType: "Server",
  },
  VehicleExitNpc: {
    Env: ["aki"],
    Context: ["entity", "levelPlay", "quest"],
    ImplementType: "Server",
    IsBanOnline: !0,
  },
  VehicleTeleport: {
    Env: ["aki"],
    Context: ["entity", "levelPlay", "quest"],
    ImplementType: "Server",
  },
  VehiclePlayPassengerVoice: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Client",
  },
  VehicleWaterfallClimbing: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  VehicleMoveWithPathLine: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Client",
    IsBanOnline: !0,
  },
  VehicleSprint: { Env: ["aki"], Context: ["entity"], ImplementType: "Client" },
  EnableFunction: { Env: ["aki"], Context: ["quest"], ImplementType: "Server" },
  OpenQte: {
    Env: ["aki"],
    Context: ["entity", "levelPlay", "quest"],
    ImplementType: "Server",
  },
  PlayerInput: { Env: ["aki"], ImplementType: "Client" },
  Preload: {
    Context: ["quest", "levelPlay", "entity"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  RemovePreloadResource: {
    Context: ["quest", "levelPlay", "entity"],
    Env: ["aki", "ue5"],
    ImplementType: "Server",
  },
  ExecAlertSystemAction: {
    Context: ["entity", "levelPlay", "quest"],
    Env: ["aki"],
    ImplementType: "Server",
  },
  HideGroup: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  ShowHidedGroup: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  MowingTowerGotoNextFloor: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  ServerForceEnableLevelPlay: {
    Env: ["aki"],
    ImplementType: "Server",
    IsTest: !0,
  },
  ClearFishingCabinInSaleItems: {
    Env: ["aki"],
    Context: ["entity", "levelPlay"],
    ImplementType: "Server",
  },
  AcceptFishingEntrust: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  DestroyFishingBoat: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Server",
  },
  SetSpineAnimation: {
    Env: ["aki"],
    Context: ["flow"],
    ImplementType: "Client",
  },
  ChangeEntityCamp: {
    Env: ["aki"],
    Context: ["entity", "levelPlay", "quest"],
    ImplementType: "Server",
  },
  SlashAndTowerGotoNextFloor: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  RecordDungeonEvent: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Server",
  },
  TeleportToAndEnterVehicle: {
    Env: ["aki"],
    Context: ["levelPlay", "quest"],
    ImplementType: "Server",
  },
  TeleportDungeonPos: {
    Env: ["aki"],
    Context: ["entity", "levelPlay", "quest"],
    ImplementType: "Server",
  },
  ResetLevelPlay: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  SummonEntity: { Env: ["aki"], Context: ["entity"], ImplementType: "Server" },
  DangoAbyssGotoNextFloor: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  DangoAbyssActivatePortal: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Server",
  },
  DangoAbyssCreateRewardTreasureBox: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Server",
  },
  DangoAbyssReceiveReward: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Server",
  },
  SetAreaTimeState: {
    Env: ["aki"],
    Context: ["quest"],
    ImplementType: "Server",
  },
  GetRewardByInteract: { Env: ["aki"], ImplementType: "Server" },
  GuestOperateUiAnimation: {
    Env: ["aki"],
    Context: ["quest", "levelPlay"],
    ImplementType: "Client",
  },
  SlideRailStart: {
    Env: ["aki"],
    Context: ["entity"],
    ImplementType: "Client",
  },
  SetTimeScale: {
    Env: ["aki"],
    Context: ["entity", "quest", "levelPlay"],
    ImplementType: "Client",
  },
  BvbSendSystemEvent: {
    Env: ["aki"],
    Context: ["levelPlay"],
    ImplementType: "Server",
  },
  SetupMoraleSystem: { Env: ["aki"], Context: [], ImplementType: "Server" },
}),
  (exports.isTestAction = isTestAction),
  (exports.isActionImplementType = isActionImplementType),
  (exports.isBanInDynamicPrefabAction = isBanInDynamicPrefabAction);
const getActionsCache = new Map();
function getActionRestrictedMapContext(e) {
  return exports.actionConfig[e].RestrictedMapContext;
}
function getActions(e, t, n) {
  const l = e + `-${t}-` + !!n;
  let i = getActionsCache.get(l);
  if (!i) {
    i = [];
    for (const l in exports.actionConfig) {
      var a = l,
        o = exports.actionConfig[a];
      !(o.Context?.includes(t) || (n && o.ContextForTest?.includes(t))) ||
        !o.Env?.includes(e) ||
        (!n && o.IsTest) ||
        i.push(a);
    }
    i.sort(), getActionsCache.set(l, i);
  }
  return i;
}
function eqn(e, t) {
  e -= t;
  return (0 < e ? e : -e) < 1e-4;
}
function toFloat6(e) {
  return Math.round(1e6 * e) / 1e6;
}
function toFloat2(e) {
  return Math.round(100 * e) / 100;
}
function toFloat1(e) {
  return Math.round(10 * e) / 10;
}
function createDefaultTransform() {
  return { Pos: exports.defaultVec };
}
function alignVector(e, t = 1) {
  e &&
    (e.X && (e.X = Math.floor(e.X / t) * t),
    e.Y && (e.Y = Math.floor(e.Y / t) * t),
    e.Z) &&
    (e.Z = Math.floor(e.Z / t) * t);
}
function alignPosA(e, t = 1) {
  alignVector(e);
  t = (0, Util_1.alignNumber)(e.A ?? 0, t);
  e.A = isNaN(t) ? 0 : t;
}
function posToString(e) {
  return e ? (e.X || 0) + `, ${e.Y || 0}, ` + (e.Z || 0) : "0, 0, 0";
}
function parseFlowInfo(e) {
  return e
    ? JSON.parse(e)
    : {
        ObjType: "Flow",
        Id: 0,
        Name: "Flow",
        States: [],
        DungeonId: ILevel_1.AKI_WORLD_LEVELID,
      };
}
function parsePlayFlow(e) {
  return e ? JSON.parse(e) : { FlowListName: "", FlowId: 0, StateId: 0 };
}
(exports.getActionRestrictedMapContext = getActionRestrictedMapContext),
  (exports.getActions = getActions),
  (exports.defaultVec = { X: 0, Y: 0, Z: 0 }),
  (exports.eqn = eqn),
  (exports.toFloat6 = toFloat6),
  (exports.toFloat2 = toFloat2),
  (exports.toFloat1 = toFloat1),
  (exports.defaultRot = { X: 0, Y: 0, Z: 0 }),
  (exports.defaultScale = { X: 1, Y: 1, Z: 1 }),
  (exports.createDefaultTransform = createDefaultTransform),
  (exports.defaultPosA = { X: 0, Y: 0, Z: 0, A: 0 }),
  (exports.alignVector = alignVector),
  (exports.alignPosA = alignPosA),
  (exports.posToString = posToString),
  (exports.parseFlowInfo = parseFlowInfo),
  (exports.parsePlayFlow = parsePlayFlow);
//# sourceMappingURL=Action.js.map
