"use strict";
let EEntityVarMatchType,
  EFlowListAction,
  EShowTalkCameraMotionType,
  EInteractUniqueness,
  EGuideTriggerType,
  EChangeEntityState,
  EWuYinQuState,
  ETeleportTransitionType,
  EFireBulletType,
  ETeleportType,
  ECenterTextShowAnim,
  ETextAlign,
  ETextHorizontal,
  EFontSize,
  ESetBattleStateType,
  ESetBattleTagType,
  EBattleStatePerceptionBehavior,
  ESetEntityTagType,
  EExecBattleActionType,
  EMoveEvent,
  EDetectBattleConditionType,
  EDetectBattleTagType,
  EUnlockSystemItemType,
  EUnlockCookSystemType,
  EUnlockAtlasSystemType,
  ECharacterMoveToPointType,
  ETraceSplineOptionType,
  ECommonTipType,
  EAiEventType,
  EEaseType,
  EFadeInScreenShowType,
  EMovieBackgroundType,
  EFadeUiOverride,
  EHideType,
  ELimitPlayOperation,
  ESystem,
  ELeisureInteract,
  ENpcLeisureInteract,
  EPostAkEvent,
  EMoveSceneItemType,
  EMoveMotion,
  EStopSceneItemMoveType,
  EPieceColorType,
  ESwitchSubLevelsType,
  ETeleportToLatestResetPointType,
  EAdjustPlayerCamera,
  EEnterOrbitalCameraType,
  EAirWallCollisionPreset,
  EToggleAirWall,
  EPlayerOperationType,
  EDisplayModeInPlayerOp,
  EMoveOperationType,
  ESkillOperationType,
  EDisplayModeInSkillOp,
  ECameraOperationType,
  ESceneInteractionOperationType,
  EUiOperationType,
  EChangeEntityPrefabPerformanceType,
  EMapMarkState,
  ERegionConfigType,
  EJigsawPieceState,
  ESetJigsawItemType,
  ESetJigsawFoundationType;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EUnlockAtlasSystemType =
    exports.EUnlockCookSystemType =
    exports.EUnlockSystemItemType =
    exports.EDetectBattleTagType =
    exports.EDetectBattleConditionType =
    exports.EMoveEvent =
    exports.EExecBattleActionType =
    exports.ESetEntityTagType =
    exports.EBattleStatePerceptionBehavior =
    exports.ESetBattleTagType =
    exports.ESetBattleStateType =
    exports.EFontSize =
    exports.ETextHorizontal =
    exports.ETextAlign =
    exports.ECenterTextShowAnim =
    exports.ETeleportType =
    exports.EFireBulletType =
    exports.ETeleportTransitionType =
    exports.EWuYinQuState =
    exports.EChangeEntityState =
    exports.isPerformanceTypeContainTag =
    exports.getEntityPrefabPerformanceTag =
    exports.getEntityPrefabPerformanceKeyByTag =
    exports.getPerformanceListByType =
    exports.entityPrefabPerformanceTypes =
    exports.entityPrefabPerformanceConfig =
    exports.getEntityStateTag =
    exports.isStateTypeContainsState =
    exports.getEntityStateKeyByTag =
    exports.getStateValuesByType =
    exports.getStatesByType =
    exports.getEntityStateTypes =
    exports.entityStateConfig =
    exports.EGuideTriggerType =
    exports.EInteractUniqueness =
    exports.logicOpTypeConfig =
    exports.compareTypeConfig =
    exports.calOpTypeConfig =
    exports.defaultTransform =
    exports.cameraTypeConfig =
    exports.cameraBindModeConfig =
    exports.plotModeConfig =
    exports.cameraModeConfig =
    exports.actorStateConfig =
    exports.EShowTalkCameraMotionType =
    exports.logLevelConfig =
    exports.EFlowListAction =
    exports.EEntityVarMatchType =
    exports.actionInterfaceRecordMap =
    exports.actionInterfaceMap =
      void 0),
  (exports.ESetJigsawFoundationType =
    exports.ESetJigsawItemType =
    exports.EJigsawPieceState =
    exports.ERegionConfigType =
    exports.EMapMarkState =
    exports.EChangeEntityPrefabPerformanceType =
    exports.EUiOperationType =
    exports.ESceneInteractionOperationType =
    exports.ECameraOperationType =
    exports.EDisplayModeInSkillOp =
    exports.ESkillOperationType =
    exports.EMoveOperationType =
    exports.EDisplayModeInPlayerOp =
    exports.EPlayerOperationType =
    exports.EToggleAirWall =
    exports.EAirWallCollisionPreset =
    exports.EEnterOrbitalCameraType =
    exports.EAdjustPlayerCamera =
    exports.ETeleportToLatestResetPointType =
    exports.ESwitchSubLevelsType =
    exports.EPieceColorType =
    exports.EStopSceneItemMoveType =
    exports.EMoveMotion =
    exports.EMoveSceneItemType =
    exports.EPostAkEvent =
    exports.ENpcLeisureInteract =
    exports.ELeisureInteract =
    exports.ESystem =
    exports.ELimitPlayOperation =
    exports.EHideType =
    exports.EFadeUiOverride =
    exports.EMovieBackgroundType =
    exports.EFadeInScreenShowType =
    exports.EEaseType =
    exports.EAiEventType =
    exports.ECommonTipType =
    exports.ETraceSplineOptionType =
    exports.ECharacterMoveToPointType =
      void 0),
  (exports.actionInterfaceMap = {
    Activate: void 0,
    AccpetCurrentQuest: void 0,
    AddFlowInteractOption: void 0,
    SetTime: void 0,
    AwakeEntity: void 0,
    CalculateVar: void 0,
    RandomVar: void 0,
    CallByCondition: void 0,
    CallFunction: void 0,
    CameraLookAt: void 0,
    EnableHostility: void 0,
    ChangeActorState: void 0,
    ChangeBehaviorState: void 0,
    ChangeEntityState: void 0,
    ChangeInteractOptionText: void 0,
    ChangeOtherState: void 0,
    ChangeRandomState: void 0,
    ChangeState: void 0,
    Collect: void 0,
    CompleteChildQuest: void 0,
    Destroy: void 0,
    DestroyAllChild: void 0,
    DestroyEntity: void 0,
    DestroySelf: void 0,
    DoCalculate: void 0,
    FaceToPos: void 0,
    FinishDoInteract: void 0,
    FinishState: void 0,
    FinishTalk: void 0,
    GetItem: void 0,
    DestroyQuestItem: void 0,
    GuideTrigger: void 0,
    CompleteGuide: void 0,
    Invoke: void 0,
    JumpTalk: void 0,
    Log: void 0,
    MoveToPos: void 0,
    MoveWithSpline: void 0,
    CharacterMoveToPoint: void 0,
    OpenSystemBoard: void 0,
    OpenSystemFunction: void 0,
    PlayCustomSequence: void 0,
    PlayerLookAt: void 0,
    EntityLookAt: void 0,
    PlayFlow: void 0,
    PlayMovie: void 0,
    PlayEffect: void 0,
    PlayMontage: void 0,
    PlaySequenceData: void 0,
    Prompt: void 0,
    AddPlayBubble: void 0,
    PlayBubble: void 0,
    ClearPlayBubble: void 0,
    EnableAI: void 0,
    RemoveFlowInteractOption: void 0,
    SendNpcMail: void 0,
    SetBehaviorIsPaused: void 0,
    SetCameraMode: void 0,
    SetEntityVisible: void 0,
    SetHeadIconVisible: void 0,
    SetMoveSpeed: void 0,
    SetNumberVar: void 0,
    SetPlotMode: void 0,
    SetPos: void 0,
    SetVar: void 0,
    ShowCenterText: void 0,
    ShowMessage: void 0,
    ShowTalk: void 0,
    SimpleMove: void 0,
    SpawnChild: void 0,
    SpawnEntity: void 0,
    SyncVarToActorState: void 0,
    Wait: void 0,
    AddBuffToEntity: void 0,
    AddBuffToPlayer: void 0,
    LockEntity: void 0,
    UnlockEntity: void 0,
    SetForceLock: void 0,
    SetAreaState: void 0,
    SetWuYinQuState: void 0,
    RemoveBuffFromEntity: void 0,
    RemoveBuffFromPlayer: void 0,
    SetPlayerMoveControl: void 0,
    UnlockTeleportTrigger: void 0,
    ChangeTeamPosition: void 0,
    ClaimLevelPlayReward: void 0,
    SetReviveRegion: void 0,
    PromptQuestChapterUI: void 0,
    FireBullet: void 0,
    FireBulletEffect: void 0,
    SetPlayerPos: void 0,
    ChangeSelfEntityState: void 0,
    InterludeActions: void 0,
    AddBuffToTriggeredEntity: void 0,
    RemoveBuffToTriggeredEntity: void 0,
    DetectTrigger: void 0,
    ItemFoundationMatch: void 0,
    SetBattleState: void 0,
    ExecBattleAction: void 0,
    WaitBattleCondition: void 0,
    UnlockSystemItem: void 0,
    RunActions: void 0,
    CommonTip: void 0,
    EnableNearbyTracking: void 0,
    EnableLevelPlay: void 0,
    UnLimitPlayerOperation: void 0,
    LimitPlayerOperation: void 0,
    SetPlayerOperationRestriction: void 0,
    LeisureInteract: void 0,
    NpcLeisureInteract: void 0,
    ChangePhantom: void 0,
    RestorePhantom: void 0,
    TakePlotPhoto: void 0,
    TeleportDungeon: void 0,
    SettlementDungeon: void 0,
    ClaimDungeonReward: void 0,
    ExitDungeon: void 0,
    UnlockDungeonEntry: void 0,
    FinishDungeon: void 0,
    StartFlowTemplate: void 0,
    BeginFlowTemplate: void 0,
    ChangeFlowTemplate: void 0,
    SetFlowTemplate: void 0,
    EndFlowTemplate: void 0,
    CloseFlowTemplate: void 0,
    SendAiEvent: void 0,
    FadeInScreen: void 0,
    FadeOutScreen: void 0,
    HideByRange: void 0,
    HideTargetRange: void 0,
    ShowAllRangeHided: void 0,
    ShowTargetRange: void 0,
    ShowSpecificEntities: void 0,
    HideSpecificEntities: void 0,
    ChangeFightTeam: void 0,
    ManualOccupations: void 0,
    AddTrialCharacter: void 0,
    RemoveTrialCharacter: void 0,
    DestroyQuest: void 0,
    SetCameraAnim: void 0,
    RotatorEntity: void 0,
    TraceSpline: void 0,
    ToggleScanSplineEffect: void 0,
    ChangeTimer: void 0,
    EnableSystem: void 0,
    PostAkEvent: void 0,
    MoveSceneItem: void 0,
    StopSceneItemMove: void 0,
    ChangeLiftTarget: void 0,
    HideByRangeInFlow: void 0,
    OpenSimpleGameplay: void 0,
    ChangeActorTalker: void 0,
    SwitchSubLevels: void 0,
    SwitchDataLayers: void 0,
    ActivateResetPoint: void 0,
    TeleportToLatestResetPoint: void 0,
    SetWeather: void 0,
    SetTimeLockState: void 0,
    SetWeatherLockState: void 0,
    AdjustPlayerCamera: void 0,
    RestorePlayerCameraAdjustment: void 0,
    UsePhantomSkill: void 0,
    ChangePhantomFormation: void 0,
    RestorePhantomFormation: void 0,
    EnterOrbitalCamera: void 0,
    ExitOrbitalCamera: void 0,
    EnableSplineMoveModel: void 0,
    SetSportsState: void 0,
    PlayLevelSequence: void 0,
    SetExploreState: void 0,
    RogueGotoNextFloor: void 0,
    RogueActivatePortal: void 0,
    EnableAoiNotify: void 0,
    ChangeEntityPrefabPerformance: void 0,
    ToggleMapMarkState: void 0,
    EnableTemporaryTeleport: void 0,
    EnableActor: void 0,
    ModifyActorMaterial: void 0,
    ToggleAirWall: void 0,
    TriggerCameraShake: void 0,
    CreatePrefab: void 0,
    DestroyPrefab: void 0,
    PlayRegisteredMontage: void 0,
    RecoverDurability: void 0,
    SetRegionConfig: void 0,
    SetJigsawItem: void 0,
    SetJigsawFoundation: void 0,
    ToggleHighlightExploreUi: void 0,
    ResetEntity: void 0,
    PlayDynamicSettlement: void 0,
    SetInteractionLockState: void 0,
    FinishCondition: void 0,
    ClearEntityVisibleTag: void 0,
    SetEntityPos: void 0,
    ResetEntityPos: void 0,
    ServerSetPlayerPos: void 0,
    FixTeleControllerPos: void 0,
    CustomJson: void 0,
    SetAudioState: void 0,
  }),
  (exports.actionInterfaceRecordMap = exports.actionInterfaceMap),
  (function (e) {
    (e.EntityId = "EntityId"), (e.EntityState = "EntityState");
  })(
    (EEntityVarMatchType =
      exports.EEntityVarMatchType || (exports.EEntityVarMatchType = {})),
  ),
  (function (e) {
    (e[(e.GenText = 0)] = "GenText"), (e[(e.ModifyText = 1)] = "ModifyText");
  })(
    (EFlowListAction =
      exports.EFlowListAction || (exports.EFlowListAction = {})),
  ),
  (exports.logLevelConfig = { Info: "提示", Warn: "警告", Error: "错误" }),
  (function (e) {
    (e.Preset = "Preset"), (e.Tween = "Tween");
  })(
    (EShowTalkCameraMotionType =
      exports.EShowTalkCameraMotionType ||
      (exports.EShowTalkCameraMotionType = {})),
  ),
  (exports.actorStateConfig = { Idle: "待机", Open: "打开", Close: "关闭" }),
  (exports.cameraModeConfig = {
    Drama: "剧情相机",
    Follow: "跟随",
    FollowDrama: "跟随相机剧情模式",
  }),
  (exports.plotModeConfig = {
    LevelA: "A级演出",
    LevelB: "B级演出",
    LevelC: "C级演出",
    LevelD: "D级演出",
    Prompt: "头像浮框",
  }),
  (exports.cameraBindModeConfig = {
    One: "1角色",
    Two: "2角色",
    Three: "3角色",
    None: "无",
  }),
  (exports.cameraTypeConfig = {
    CS: "特写",
    MS: "中景",
    WS: "远景",
    None: "无",
  }),
  (exports.defaultTransform = { Pos: { X: 0, Y: 0, Z: 0 } }),
  (exports.calOpTypeConfig = { Add: "+", Sub: "-", Mut: "×", Div: "÷" }),
  (exports.compareTypeConfig = {
    Ge: ">=",
    Gt: ">",
    Le: "<=",
    Lt: "<",
    Eq: "==",
    Ne: "!=",
  }),
  (exports.logicOpTypeConfig = { And: "与", Or: "或" }),
  ((EInteractUniqueness =
    exports.EInteractUniqueness || (exports.EInteractUniqueness = {})).Closest =
    "Closest"),
  (function (e) {
    (e.BeginnerGuide = "BeginnerGuide"), (e.AttackGuide = "AttackGuide");
  })(
    (EGuideTriggerType =
      exports.EGuideTriggerType || (exports.EGuideTriggerType = {})),
  ),
  (exports.entityStateConfig = {
    激活态: { 常态: "关卡.Common.状态.常态", 激活: "关卡.Common.状态.激活" },
    完成态: {
      常态: "关卡.Common.状态.常态",
      激活: "关卡.Common.状态.激活",
      完成: "关卡.Common.状态.完成",
    },
    失败态: {
      常态: "关卡.Common.状态.常态",
      激活: "关卡.Common.状态.激活",
      完成: "关卡.Common.状态.完成",
      失败: "关卡.Common.状态.失败",
    },
    封锁态: {
      封锁: "关卡.Common.状态.封锁",
      解锁: "关卡.Common.状态.解锁",
      常态: "关卡.Common.状态.常态",
      激活: "关卡.Common.状态.激活",
      完成: "关卡.Common.状态.完成",
    },
    状态型打击机关: {
      状态1: "关卡.打击机关.状态1",
      状态5: "关卡.打击机关.状态5",
      完成: "关卡.Common.状态.完成",
      已废弃状态2: "关卡.打击机关.状态2",
      已废弃状态3: "关卡.打击机关.状态3",
      已废弃状态4: "关卡.打击机关.状态4",
      已废弃状态6: "关卡.打击机关.状态6",
      已废弃状态7: "关卡.打击机关.状态7",
      已废弃初始状态: "关卡.打击机关.初始状态",
      已废弃完成状态: "关卡.打击机关.完成状态",
    },
    打击机关组: {
      激活: "关卡.Common.状态.激活",
      完成: "关卡.Common.状态.完成",
    },
    射击靶: {
      数字状态1: "关卡.射击靶.状态1",
      数字状态2: "关卡.射击靶.状态2",
      数字状态3: "关卡.射击靶.状态3",
      数字状态4: "关卡.射击靶.状态4",
      完成状态: "关卡.射击靶.状态5",
      禁止状态: "关卡.射击靶.状态6",
      初始状态: "关卡.射击靶.状态7",
      禁止射击: "关卡.射击靶.禁止射击",
      允许射击: "关卡.射击靶.允许射击",
      完成射击: "关卡.射击靶.完成射击",
    },
    射击靶组: {
      常态: "关卡.Common.状态.常态",
      激活: "关卡.Common.状态.激活",
      完成: "关卡.Common.状态.完成",
    },
    鲸鱼冰面: {
      初始状态: "关卡.鲸鱼冰面.初始状态",
      战斗状态1: "关卡.鲸鱼冰面.战斗状态1",
      战斗状态2: "关卡.鲸鱼冰面.战斗状态2",
      战斗状态3: "关卡.鲸鱼冰面.战斗状态3",
      结束状态: "关卡.鲸鱼冰面.结束状态",
    },
    多层电梯: {
      上升: "关卡.电梯.上升",
      下降: "关卡.电梯.下降",
      停靠: "关卡.电梯.停靠",
    },
    声弦: {
      隐藏: "关卡.声弦.隐藏",
      常驻: "关卡.声弦.常驻",
      收缩: "关卡.声弦.收缩",
      爆炸: "关卡.声弦.爆炸",
      锁定: "关卡.Common.状态.锁定",
    },
    无音区: {
      沉寂: "关卡.无音区.沉寂",
      激活: "关卡.无音区.激活",
      净化: "关卡.无音区.净化",
    },
    副本入口: {
      可解锁: "物体.物体阶段.可解锁",
      常态: "关卡.Common.状态.常态",
      激活: "关卡.Common.状态.激活",
      交互中: "关卡.Common.状态.交互中",
    },
    二态电压: { 高压: "关卡.Common.状态.高压", 低压: "关卡.Common.状态.低压" },
    中枢乐器: {
      常态: "关卡.Common.状态.常态",
      一阶段: "关卡.中枢乐器.状态.一阶段",
      二阶段: "关卡.中枢乐器.状态.二阶段",
      三阶段: "关卡.中枢乐器.状态.三阶段",
      四阶段: "关卡.中枢乐器.状态.四阶段",
      五阶段: "关卡.中枢乐器.状态.五阶段",
    },
    物体阶段: {
      完整: "物体.物体阶段.完整",
      轻微破损: "物体.物体阶段.轻微破损",
      严重破损: "物体.物体阶段.严重破损",
      完全破坏: "物体.物体阶段.完全破坏",
    },
    时间回放: {
      状态1: "关卡.时间回放.状态1",
      状态2: "关卡.时间回放.状态2",
      状态3: "关卡.时间回放.状态3",
      状态4: "关卡.时间回放.状态4",
      状态5: "关卡.时间回放.状态5",
      状态6: "关卡.时间回放.状态6",
      状态7: "关卡.时间回放.状态7",
      状态8: "关卡.时间回放.状态8",
      状态9: "关卡.时间回放.状态9",
      状态10: "关卡.时间回放.状态10",
      占位: "关卡.时间回放.占位",
    },
    场景交互: {
      常态: "关卡.Common.状态.常态",
      交互中: "关卡.Common.状态.场景物件交互中",
    },
    屏障生成机关: {
      闭合: "关卡.屏障生成机关.闭合",
      启动: "关卡.屏障生成机关.启动",
      故障: "关卡.屏障生成机关.故障",
      完成: "关卡.屏障生成机关.完成",
      封锁: "关卡.屏障生成机关.封锁",
    },
    LevelSeq标记: {
      标记A: "关卡.LevelSeq标记.标记A",
      标记B: "关卡.LevelSeq标记.标记B",
      标记C: "关卡.LevelSeq标记.标记C",
      标记D: "关卡.LevelSeq标记.标记D",
      标记E: "关卡.LevelSeq标记.标记E",
      标记F: "关卡.LevelSeq标记.标记F",
      标记G: "关卡.LevelSeq标记.标记G",
      标记H: "关卡.LevelSeq标记.标记H",
      标记I: "关卡.LevelSeq标记.标记I",
      标记J: "关卡.LevelSeq标记.标记J",
    },
    黑海岸时针石柱: {
      常态: "关卡.黑海岸时针石柱.常态",
      可激活: "关卡.黑海岸时针石柱.可激活",
      激活: "关卡.黑海岸时针石柱.激活",
      完成: "关卡.黑海岸时针石柱.完成",
    },
    采集物底座: {
      未采集: "关卡.采集物底座.未采集",
      完全采集: "关卡.采集物底座.完全采集",
    },
    Npc生态事件: {
      事件1: "关卡.Npc生态事件.事件1",
      事件2: "关卡.Npc生态事件.事件2",
      事件3: "关卡.Npc生态事件.事件3",
      事件4: "关卡.Npc生态事件.事件4",
      事件5: "关卡.Npc生态事件.事件5",
      事件6: "关卡.Npc生态事件.事件6",
      事件7: "关卡.Npc生态事件.事件7",
      事件8: "关卡.Npc生态事件.事件8",
    },
    踩踏机关: {
      顶部: "关卡.踩踏机关.顶部",
      下降中: "关卡.踩踏机关.下降中",
      上升中: "关卡.踩踏机关.上升中",
      底部: "关卡.踩踏机关.底部",
    },
    传送门: {
      闲置: "关卡.传送门.闲置",
      激活: "关卡.传送门.激活",
      传送中: "关卡.传送门.传送中",
      传送完成: "关卡.传送门.传送完成",
    },
    黑石囚笼: {
      完整: "关卡.黑石囚笼.完整",
      破损一阶段: "关卡.黑石囚笼.破损.一阶段",
      破损二阶段: "关卡.黑石囚笼.破损.二阶段",
      破损三阶段: "关卡.黑石囚笼.破损.三阶段",
      完全破坏: "关卡.黑石囚笼.完全破坏",
    },
    乘霄山光线传导机关: {
      常态: "关卡.Common.状态.常态",
      激活: "关卡.Common.状态.激活",
      准备中: "关卡.Common.状态.准备中",
      完成: "关卡.Common.状态.完成",
    },
    多层封锁态: {
      常态: "关卡.Common.状态.常态",
      一层: "关卡.多层封锁.一层",
      二层: "关卡.多层封锁.二层",
      三层: "关卡.多层封锁.三层",
      四层: "关卡.多层封锁.四层",
      五层: "关卡.多层封锁.五层",
      完成: "关卡.Common.状态.完成",
    },
  });
const entityStateTypes = Object.keys(exports.entityStateConfig);
function getEntityStateTypes() {
  return entityStateTypes;
}
exports.getEntityStateTypes = getEntityStateTypes;
const statesMap = new Map();
function initStatesMap() {
  statesMap.clear();
  for (const o of Object.entries(exports.entityStateConfig)) {
    const e = new Map();
    const t = (statesMap.set(o[0], e), Object.entries(o[1]));
    for (const i of t) e.set(i[0], i[1]);
  }
}
function getStatesByType(e) {
  statesMap.size <= 0 && initStatesMap();
  e = statesMap.get(e);
  return e ? Array.from(e.keys()) : [];
}
function getStateValuesByType(e) {
  statesMap.size <= 0 && initStatesMap();
  e = statesMap.get(e);
  return e ? Array.from(e.values()) : [];
}
function getEntityStateKeyByTag(e, t) {
  statesMap.size <= 0 && initStatesMap();
  for (const o of statesMap)
    if (o[0] === e) for (const i of o[1]) if (i[1] === t) return i[0];
}
function isStateTypeContainsState(e, t) {
  t = getEntityStateKeyByTag(e, t);
  return !!t && getStatesByType(e)?.includes(t);
}
function getEntityStateTag(e, t) {
  const o = exports.entityStateConfig[e];
  if (o) return o[t];
  throw new Error(`getEntityStateTag: ${e} is not exist`);
}
(exports.getStatesByType = getStatesByType),
  (exports.getStateValuesByType = getStateValuesByType),
  (exports.getEntityStateKeyByTag = getEntityStateKeyByTag),
  (exports.isStateTypeContainsState = isStateTypeContainsState),
  (exports.getEntityStateTag = getEntityStateTag),
  (exports.entityPrefabPerformanceConfig = {
    副本入口: { 交互中: "关卡.Common.表现.交互中" },
    反弹板: {
      隐藏特效: "关卡.Common.表现.隐藏",
      激活特效: "关卡.Common.表现.激活",
    },
    光线传导机关: {
      启动未连接: "关卡.Common.表现.光线传导机关.启动.未连接",
      启动且被其他对象连接: "关卡.Common.表现.光线传导机关.启动.被连接",
      启动且连接到其他对象: "关卡.Common.表现.光线传导机关.启动.连接到对象",
    },
  }),
  (exports.entityPrefabPerformanceTypes = Object.keys(
    exports.entityPrefabPerformanceConfig,
  ));
const myEntityPrefabPerformanceMap = new Map();
function getEntityPrefabPerformanceMap() {
  const e = myEntityPrefabPerformanceMap;
  if (e.size === 0)
    for (const i of Object.entries(exports.entityPrefabPerformanceConfig)) {
      const t = new Map();
      const o = (e.set(i[0], t), Object.entries(i[1]));
      for (const r of o) t.set(r[0], r[1]);
    }
  return e;
}
function getPerformanceListByType(e) {
  e = getEntityPrefabPerformanceMap().get(e);
  return e ? Array.from(e.keys()) : [];
}
function getEntityPrefabPerformanceKeyByTag(e, t) {
  e = getEntityPrefabPerformanceMap().get(e);
  if (e) for (const [o, i] of e) if (i === t) return o;
}
function getEntityPrefabPerformanceTag(e, t) {
  const o = exports.entityPrefabPerformanceConfig[e];
  if (o) return o[t];
  throw new Error(`getEntityPrefabPerformanceTag: ${e} is not exist`);
}
function isPerformanceTypeContainTag(e, t) {
  const o = getPerformanceListByType(e);
  var e = getEntityPrefabPerformanceKeyByTag(e, t);
  return !!e && o?.includes(e);
}
(exports.getPerformanceListByType = getPerformanceListByType),
  (exports.getEntityPrefabPerformanceKeyByTag =
    getEntityPrefabPerformanceKeyByTag),
  (exports.getEntityPrefabPerformanceTag = getEntityPrefabPerformanceTag),
  (exports.isPerformanceTypeContainTag = isPerformanceTypeContainTag),
  (function (e) {
    (e.Directly = "Directly"), (e.Loop = "Loop");
  })(
    (EChangeEntityState =
      exports.EChangeEntityState || (exports.EChangeEntityState = {})),
  ),
  (function (e) {
    (e[(e.End = 0)] = "End"),
      (e[(e.Start = 1)] = "Start"),
      (e[(e.Nothing = 4)] = "Nothing");
  })((EWuYinQuState = exports.EWuYinQuState || (exports.EWuYinQuState = {}))),
  (function (e) {
    (e.PlayMp4 = "PlayMp4"),
      (e.PlayEffect = "PlayEffect"),
      (e.CenterText = "CenterText");
  })(
    (ETeleportTransitionType =
      exports.ETeleportTransitionType ||
      (exports.ETeleportTransitionType = {})),
  ),
  (function (e) {
    (e.TrackTarget = "TrackTarget"),
      (e.ForwardFront = "ForwardFront"),
      (e.TrackPosition = "TrackPosition");
  })(
    (EFireBulletType =
      exports.EFireBulletType || (exports.EFireBulletType = {})),
  ),
  (function (e) {
    (e[(e.FixedPos = 0)] = "FixedPos"),
      (e[(e.NearestEntity = 1)] = "NearestEntity");
  })((ETeleportType = exports.ETeleportType || (exports.ETeleportType = {}))),
  (function (e) {
    (e.ShowAll = "ShowAll"),
      (e.FadeOut = "FadeOut"),
      (e.TypeWriter = "TypeWriter");
  })(
    (ECenterTextShowAnim =
      exports.ECenterTextShowAnim || (exports.ECenterTextShowAnim = {})),
  ),
  (function (e) {
    (e.Top = "Top"), (e.Middle = "Middle"), (e.Bottom = "Bottom");
  })((ETextAlign = exports.ETextAlign || (exports.ETextAlign = {}))),
  (function (e) {
    (e.Left = "Left"), (e.Center = "Center"), (e.Right = "Right");
  })(
    (ETextHorizontal =
      exports.ETextHorizontal || (exports.ETextHorizontal = {})),
  ),
  (function (e) {
    (e.Small = "Small"), (e.Middle = "Middle"), (e.Big = "Big");
  })((EFontSize = exports.EFontSize || (exports.EFontSize = {}))),
  (function (e) {
    (e.SetBattleTag = "SetBattleTag"),
      (e.NotifyMonsterPerception = "NotifyMonsterPerception"),
      (e.NotifyMonsterPlayStandbyTags = "NotifyMonsterPlayStandbyTags");
  })(
    (ESetBattleStateType =
      exports.ESetBattleStateType || (exports.ESetBattleStateType = {})),
  ),
  (function (e) {
    (e.BattleMonsterLanding = "怪物.common.关卡.通信专用.幻象落地开启"),
      (e.BattleFinalMonsterLanding = "怪物.common.关卡.通信专用.唤醒者"),
      (e.BattleMonsterSleep = "怪物.common.关卡.睡觉");
  })(
    (ESetBattleTagType =
      exports.ESetBattleTagType || (exports.ESetBattleTagType = {})),
  ),
  (function (e) {
    (e.NotifyGatherToPlayer = "NotifyGatherToPlayer"),
      (e.NotifyGatherToEntity = "NotifyGatherToEntity");
  })(
    (EBattleStatePerceptionBehavior =
      exports.EBattleStatePerceptionBehavior ||
      (exports.EBattleStatePerceptionBehavior = {})),
  ),
  (function (e) {
    (e.Add = "Add"), (e.Remove = "Remove");
  })(
    (ESetEntityTagType =
      exports.ESetEntityTagType || (exports.ESetEntityTagType = {})),
  ),
  (function (e) {
    (e.SetBattleTags = "SetBattleTags"),
      (e.SetMonsterMoveTarget = "SetMonsterMoveTarget");
  })(
    (EExecBattleActionType =
      exports.EExecBattleActionType || (exports.EExecBattleActionType = {})),
  ),
  (function (e) {
    (e.Walk = "怪物.common.关卡.朝目标点移动.走"),
      (e.Run = "怪物.common.关卡.朝目标点移动.跑");
  })((EMoveEvent = exports.EMoveEvent || (exports.EMoveEvent = {}))),
  ((EDetectBattleConditionType =
    exports.EDetectBattleConditionType ||
    (exports.EDetectBattleConditionType = {})).DetectBattleTag =
    "DetectBattleTag"),
  ((EDetectBattleTagType =
    exports.EDetectBattleTagType ||
    (exports.EDetectBattleTagType = {})).MonsterOnTheGround =
    "怪物.common.关卡.通信专用.进入战斗"),
  (function (e) {
    (e.CookSystem = "CookSystem"),
      (e.AtlasSystem = "AtlasSystem"),
      (e.AchievementSystem = "AchievementSystem"),
      (e.PhotoMemoryCollect = "MemoirsSystem");
  })(
    (EUnlockSystemItemType =
      exports.EUnlockSystemItemType || (exports.EUnlockSystemItemType = {})),
  ),
  ((EUnlockCookSystemType =
    exports.EUnlockCookSystemType ||
    (exports.EUnlockCookSystemType = {})).UnlockCookBook = "UnlockCookBook"),
  (function (e) {
    (e.GeographicalAtlas = "GeographicalAtlas"), (e.PlotPhoto = "PlotPhoto");
  })(
    (EUnlockAtlasSystemType =
      exports.EUnlockAtlasSystemType || (exports.EUnlockAtlasSystemType = {})),
  ),
  (function (e) {
    (e.Walk = "Walk"), (e.Adaptive = "Adaptive");
  })(
    (ECharacterMoveToPointType =
      exports.ECharacterMoveToPointType ||
      (exports.ECharacterMoveToPointType = {})),
  ),
  (function (e) {
    (e.Open = "Open"), (e.Close = "Close");
  })(
    (ETraceSplineOptionType =
      exports.ETraceSplineOptionType || (exports.ETraceSplineOptionType = {})),
  ),
  (function (e) {
    (e[(e.ChallengeCondition = 0)] = "ChallengeCondition"),
      (e[(e.ChallengeSuccess = 3)] = "ChallengeSuccess"),
      (e[(e.ChallengeFail = 4)] = "ChallengeFail"),
      (e[(e.ReachChallenge = 5)] = "ReachChallenge"),
      (e[(e.TriggerDelegation = 6)] = "TriggerDelegation"),
      (e[(e.MissionComplete = 7)] = "MissionComplete"),
      (e[(e.GeneralFloatingTip = 9)] = "GeneralFloatingTip"),
      (e[(e.TipId = 10)] = "TipId"),
      (e[(e.PrepareCountdown = 11)] = "PrepareCountdown"),
      (e[(e.EnterInRange = 12)] = "EnterInRange"),
      (e[(e.FirstComplete = 13)] = "FirstComplete"),
      (e[(e.RemainStarWarning = 14)] = "RemainStarWarning");
  })(
    (ECommonTipType = exports.ECommonTipType || (exports.ECommonTipType = {})),
  ),
  (function (e) {
    (e.CatAndDogPlayFlow = "CatAndDogPlayFlow"),
      (e.AnimalStandUp = "AnimalStandUp"),
      (e.AnimalSitDown = "AnimalSitDown"),
      (e.AnimalRandomAction = "AnimalRandomAction");
  })((EAiEventType = exports.EAiEventType || (exports.EAiEventType = {}))),
  (function (e) {
    (e[(e.Linear = 0)] = "Linear"),
      (e[(e.Transient = 1)] = "Transient"),
      (e[(e.InOutCubic = 2)] = "InOutCubic"),
      (e[(e.OutSine = 3)] = "OutSine"),
      (e[(e.OutQuart = 4)] = "OutQuart");
  })((EEaseType = exports.EEaseType || (exports.EEaseType = {}))),
  (function (e) {
    (e.White = "White"), (e.Black = "Black");
  })(
    (EFadeInScreenShowType =
      exports.EFadeInScreenShowType || (exports.EFadeInScreenShowType = {})),
  ),
  (function (e) {
    (e.White = "White"), (e.Black = "Black");
  })(
    (EMovieBackgroundType =
      exports.EMovieBackgroundType || (exports.EMovieBackgroundType = {})),
  ),
  (function (e) {
    e[(e.ShowTalkDialog = 0)] = "ShowTalkDialog";
  })(
    (EFadeUiOverride =
      exports.EFadeUiOverride || (exports.EFadeUiOverride = {})),
  ),
  (function (e) {
    (e.WorldMonsterAndMonsterTreasure = "WorldMonsterAndMonsterTreasure"),
      (e.WorldEntityAndLevelPlay = "WorldEntityAndLevelPlay"),
      (e.SpecifyEntity = "SpecifyEntity");
  })((EHideType = exports.EHideType || (exports.EHideType = {}))),
  (function (e) {
    (e.AllowCamera = "AllowCamera"),
      (e.AllowAction = "AllowAction"),
      (e.AllowMove = "AllowMove"),
      (e.AllowMoveNew = "AllowMoveNew"),
      (e.AllowUi = "AllowUi"),
      (e.AllowMouse = "AllowMouse"),
      (e.BlockAll = "BlockAll");
  })(
    (ELimitPlayOperation =
      exports.ELimitPlayOperation || (exports.ELimitPlayOperation = {})),
  ),
  (function (e) {
    e[(e.Map = 10015)] = "Map";
  })((ESystem = exports.ESystem || (exports.ESystem = {}))),
  (function (e) {
    (e.SitDown = "SitDown"),
      (e.Bounce = "Bounce"),
      (e.Catapult = "Catapult"),
      (e.SuperCatapult = "SuperCatapult"),
      (e.Manipulate = "Manipulate"),
      (e.StandControl = "StandControl");
  })(
    (ELeisureInteract =
      exports.ELeisureInteract || (exports.ELeisureInteract = {})),
  ),
  ((ENpcLeisureInteract =
    exports.ENpcLeisureInteract || (exports.ENpcLeisureInteract = {})).SitDown =
    "SitDown"),
  (function (e) {
    (e.Global = "Global"), (e.Target = "Target");
  })((EPostAkEvent = exports.EPostAkEvent || (exports.EPostAkEvent = {}))),
  (function (e) {
    (e.MoveToPoint = "MoveToPoint"),
      (e.CycleMoveToPoints = "CycleMoveToPoints");
  })(
    (EMoveSceneItemType =
      exports.EMoveSceneItemType || (exports.EMoveSceneItemType = {})),
  ),
  (function (e) {
    (e.UniformMotion = "UniformMotion"), (e.VariableMotion = "VariableMotion");
  })((EMoveMotion = exports.EMoveMotion || (exports.EMoveMotion = {}))),
  (function (e) {
    (e.StopAtCurrentPos = "StopAtCurrentPos"),
      (e.StopAtNextPos = "StopAtNextPos");
  })(
    (EStopSceneItemMoveType =
      exports.EStopSceneItemMoveType || (exports.EStopSceneItemMoveType = {})),
  ),
  (function (e) {
    (e.White = "White"),
      (e.Red = "Red"),
      (e.Yellow = "Yellow"),
      (e.Blue = "Blue"),
      (e.Green = "Green");
  })(
    (EPieceColorType =
      exports.EPieceColorType || (exports.EPieceColorType = {})),
  ),
  (function (e) {
    (e.Directly = "Directly"), (e.Preload = "Preload");
  })(
    (ESwitchSubLevelsType =
      exports.ESwitchSubLevelsType || (exports.ESwitchSubLevelsType = {})),
  ),
  (function (e) {
    (e.Directly = "Directly"), (e.CheckPlayerIsDead = "CheckPlayerIsDead");
  })(
    (ETeleportToLatestResetPointType =
      exports.ETeleportToLatestResetPointType ||
      (exports.ETeleportToLatestResetPointType = {})),
  ),
  (function (e) {
    (e.Basic = "关卡.Common.镜头调整"),
      (e.Horizontal = "关卡.Common.镜头.横版镜头"),
      (e.Dialog = "关卡.Common.镜头.对话镜头"),
      (e.Fixed = "关卡.Common.镜头.固定镜头"),
      (e.AxisLock = "关卡.Common.镜头.锁轴镜头");
  })(
    (EAdjustPlayerCamera =
      exports.EAdjustPlayerCamera || (exports.EAdjustPlayerCamera = {})),
  ),
  ((EEnterOrbitalCameraType =
    exports.EEnterOrbitalCameraType ||
    (exports.EEnterOrbitalCameraType = {})).ControlByMove = "ControlByMove"),
  (function (e) {
    (e[(e.Normal = 0)] = "Normal"),
      (e[(e.HugeBoss = 1)] = "HugeBoss"),
      (e[(e.OnlyBullet = 2)] = "OnlyBullet"),
      (e[(e.OnlyMonster = 3)] = "OnlyMonster");
  })(
    (EAirWallCollisionPreset =
      exports.EAirWallCollisionPreset ||
      (exports.EAirWallCollisionPreset = {})),
  ),
  (function (e) {
    (e.Open = "Open"), (e.Close = "Close");
  })(
    (EToggleAirWall = exports.EToggleAirWall || (exports.EToggleAirWall = {})),
  ),
  (function (e) {
    (e.EnableAll = "EnableAll"),
      (e.DisableAll = "DisableAll"),
      (e.DisableModule = "DisableModule");
  })(
    (EPlayerOperationType =
      exports.EPlayerOperationType || (exports.EPlayerOperationType = {})),
  ),
  (function (e) {
    (e.ShowUi = "ShowUi"), (e.HideUi = "HideUi");
  })(
    (EDisplayModeInPlayerOp =
      exports.EDisplayModeInPlayerOp || (exports.EDisplayModeInPlayerOp = {})),
  ),
  (function (e) {
    (e.Enable = "Enable"), (e.Disable = "Disable");
  })(
    (EMoveOperationType =
      exports.EMoveOperationType || (exports.EMoveOperationType = {})),
  ),
  (function (e) {
    (e.Enable = "Enable"),
      (e.Disable = "Disable"),
      (e.DisableSection = "DisableSection");
  })(
    (ESkillOperationType =
      exports.ESkillOperationType || (exports.ESkillOperationType = {})),
  ),
  (function (e) {
    (e.Ashen = "Ashen"), (e.Hide = "Hide"), (e.Disable = "Disable");
  })(
    (EDisplayModeInSkillOp =
      exports.EDisplayModeInSkillOp || (exports.EDisplayModeInSkillOp = {})),
  ),
  (function (e) {
    (e.Enable = "Enable"), (e.Disable = "Disable");
  })(
    (ECameraOperationType =
      exports.ECameraOperationType || (exports.ECameraOperationType = {})),
  ),
  (function (e) {
    (e.Enable = "Enable"), (e.Disable = "Disable");
  })(
    (ESceneInteractionOperationType =
      exports.ESceneInteractionOperationType ||
      (exports.ESceneInteractionOperationType = {})),
  ),
  (function (e) {
    (e.Enable = "Enable"),
      (e.EnableSectionalUi = "EnableSectionalUi"),
      (e.Disable = "Disable");
  })(
    (EUiOperationType =
      exports.EUiOperationType || (exports.EUiOperationType = {})),
  ),
  (function (e) {
    (e.Target = "Target"), (e.Self = "Self");
  })(
    (EChangeEntityPrefabPerformanceType =
      exports.EChangeEntityPrefabPerformanceType ||
      (exports.EChangeEntityPrefabPerformanceType = {})),
  ),
  (function (e) {
    (e.Show = "Show"), (e.Hide = "Hide"), (e.Disable = "Disable");
  })((EMapMarkState = exports.EMapMarkState || (exports.EMapMarkState = {}))),
  ((ERegionConfigType =
    exports.ERegionConfigType || (exports.ERegionConfigType = {})).Mpc = "Mpc"),
  (function (e) {
    (e.Disable = "Disable"),
      (e.Correct = "Correct"),
      (e.Incorrect = "Incorrect");
  })(
    (EJigsawPieceState =
      exports.EJigsawPieceState || (exports.EJigsawPieceState = {})),
  ),
  ((ESetJigsawItemType =
    exports.ESetJigsawItemType ||
    (exports.ESetJigsawItemType = {})).MoveJigsawItem = "MoveJigsawItem"),
  ((ESetJigsawFoundationType =
    exports.ESetJigsawFoundationType ||
    (exports.ESetJigsawFoundationType = {})).SetPieceState = "SetPieceState");
// # sourceMappingURL=IAction.js.map
