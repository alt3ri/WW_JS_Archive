"use strict";
function getTipsByNodeType(e) {
  return exports.nodeTips[e];
}
var EInformationViewType,
  ESpecialGamePlayConfigType,
  EEnableSystemType,
  EGradingSystemVarType,
  EQuestScheduleType,
  EQuestScheduleUiType,
  EStatisticsEventType,
  EPlayerHitStatisticsType,
  EPlayerDamageInfoType,
  EChildQuest,
  ESkillType,
  ESkillCategory,
  EUseSkillCheckType,
  ETargetBattleAttribute,
  EAttributeToTarget;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.repeatBanList =
    exports.getSkillTypeFromCnName =
    exports.getSkillTypesCn =
    exports.flatBehaviorTree =
    exports.questRegionToCnName =
    exports.questCnNameToRegion =
    exports.questRegionCNMapper =
    exports.defaultQuestRegion =
    exports.questTypeToCnName =
    exports.questCnNameToType =
    exports.questTypeCNMapper =
    exports.defaultQuestType =
    exports.questFailedConfigs =
    exports.EAttributeToTarget =
    exports.ETargetBattleAttribute =
    exports.combatStateConfig =
    exports.EUseSkillCheckType =
    exports.elementGenreCnMap =
    exports.skillTypeCnMap =
    exports.skillGenreCnMap =
    exports.ESkillCategory =
    exports.ESkillType =
    exports.childQuestsForTest =
    exports.childQuestConfigs =
    exports.childQuestForLevelPlay =
    exports.childQuestForQuest =
    exports.EChildQuest =
    exports.EPlayerDamageInfoType =
    exports.EPlayerHitStatisticsType =
    exports.EStatisticsEventType =
    exports.EQuestScheduleUiType =
    exports.EQuestScheduleType =
    exports.EGradingSystemVarType =
    exports.EEnableSystemType =
    exports.ESpecialGamePlayConfigType =
    exports.EInformationViewType =
    exports.getTipsByNodeType =
    exports.nodeTips =
      void 0),
  (exports.nodeTips = {
    Start: "",
    QuestSucceed: "任务完成，终止行为树",
    QuestFailed: "任务失败，终止行为树",
    AlwaysTrue: "子节点执行完成后，强制返回值为True（不熟悉行为树不推荐使用）",
    AlwaysFalse:
      "ParallelSelect并行步骤中需要设置可选步骤时使用，AlwaysFalse下属分支为可选",
    Sequence: "顺序执行下属节点，下面通常挂接多个ChildQuest",
    Select:
      "依次执行子节点，子节点返回True则终止并返回True，否则执行下个子节点（不熟悉行为树不推荐使用）",
    ParallelSelect:
      "并行步骤：并行执行多个步骤，要求完成其中若干个。节点中配置完成数目。可通过AlwaysFalse节点将下属分支设为可选",
    Repeater:
      "循环节点，可以重复执行下属节点，每次单个循环结束后判断是否退出循环(返回true)。循环节点内部不支持中断，可以通过使用并行节点ParallelSelect新增条件中途打断循环节点",
    Condition:
      "顺势判断条件，返回True或False（作为叶节点使用，并非装饰器，不熟悉行为树不推荐使用）",
    ConditionSelector:
      "分支选择：根据之前的对话、战斗结果选择分支，分之间互斥。节点中配置分支条件",
    ChildQuest: "任务步骤",
    Action: "执行动作序列",
  }),
  (exports.getTipsByNodeType = getTipsByNodeType),
  ((EInformationViewType =
    exports.EInformationViewType ||
    (exports.EInformationViewType = {})).LevelPlay = "LevelPlay"),
  ((ESpecialGamePlayConfigType =
    exports.ESpecialGamePlayConfigType ||
    (exports.ESpecialGamePlayConfigType = {})).Stalking = "Stalking"),
  ((EEnableSystemType =
    exports.EEnableSystemType ||
    (exports.EEnableSystemType = {})).GradingSystem = "GradingSystem"),
  (function (e) {
    (e.Score = "Score"),
      (e.Grade = "Grade"),
      (e.Wave = "Wave"),
      (e.CustomVar = "CustomVar");
  })(
    (EGradingSystemVarType =
      exports.EGradingSystemVarType || (exports.EGradingSystemVarType = {})),
  ),
  (function (e) {
    (e.None = "None"),
      (e.ChildQuestCompleted = "ChildQuestCompleted"),
      (e.EntityHP = "EntityHP"),
      (e.Score = "Score"),
      (e.ChildQuestCompletedCount = "ChildQuestCompletedCount"),
      (e.TowerChallengeTitle = "TowerChallengeTitle"),
      (e.Var = "Var"),
      (e.MultiVar = "MultiVar"),
      (e.TimeLeft = "TimeLeft"),
      (e.Condition = "Condition");
  })(
    (EQuestScheduleType =
      exports.EQuestScheduleType || (exports.EQuestScheduleType = {})),
  ),
  (function (e) {
    (e.Task = "Task"), (e.LevelPlay = "LevelPlay");
  })(
    (EQuestScheduleUiType =
      exports.EQuestScheduleUiType || (exports.EQuestScheduleUiType = {})),
  ),
  (function (e) {
    (e.Collect = "Collect"),
      (e.UseSkill = "UseSkill"),
      (e.UseSkillNew = "UseSkillNew"),
      (e.PlayerTriggerMotion = "PlayerTriggerMotion"),
      (e.Timer = "Timer"),
      (e.MonsterPoint = "MonsterPoint"),
      (e.MonsterRemainingHealth = "MonsterRemainingHealth"),
      (e.MonsterHealthScore = "MonsterHealthScore"),
      (e.PlayerHit = "PlayerHit");
  })(
    (EStatisticsEventType =
      exports.EStatisticsEventType || (exports.EStatisticsEventType = {})),
  ),
  (function (e) {
    (e.HitCount = "HitCount"), (e.BeDamage = "BeDamage");
  })(
    (EPlayerHitStatisticsType =
      exports.EPlayerHitStatisticsType ||
      (exports.EPlayerHitStatisticsType = {})),
  ),
  (function (e) {
    (e.DamagePoint = "DamagePoint"), (e.DamagePercentage = "DamagePercentage");
  })(
    (EPlayerDamageInfoType =
      exports.EPlayerDamageInfoType || (exports.EPlayerDamageInfoType = {})),
  ),
  (function (e) {
    (e.DoInteract = "DoInteract"),
      (e.ReachArea = "ReachArea"),
      (e.Kill = "Kill"),
      (e.GetItem = "GetItem"),
      (e.UseSkill = "UseSkill"),
      (e.GetSkill = "GetSkill"),
      (e.PlayFlow = "PlayFlow"),
      (e.DetectCombatState = "DetectCombatState"),
      (e.Parkour = "Parkour"),
      (e.Timer = "Timer"),
      (e.HandInItems = "HandInItems"),
      (e.MonsterCreator = "MonsterCreator"),
      (e.InformationViewCheck = "InformationViewCheck"),
      (e.UseItem = "UseItem"),
      (e.CheckEntityState = "CheckEntityState"),
      (e.CheckLevelPlay = "CheckLevelPlay"),
      (e.CheckUiGame = "CheckUiGame"),
      (e.FinishDungeon = "FinishDungeon"),
      (e.WaitTime = "WaitTime"),
      (e.ScheduleTime = "ScheduleTime"),
      (e.ReadMail = "ReadMail"),
      (e.Guide = "Guide"),
      (e.EnterDungeon = "EnterDungeon"),
      (e.LeaveDungeon = "LeaveDungeon"),
      (e.CheckTargetBattleAttribute = "CheckTargetBattleAttribute"),
      (e.WaitBattleCondition = "WaitBattleCondition"),
      (e.CompareVar = "CompareVar"),
      (e.ReceiveTelecom = "ReceiveTelecom"),
      (e.ShowUi = "ShowUi"),
      (e.TakePhoto = "TakePhoto"),
      (e.VisionSystem = "VisionSystem"),
      (e.ParallaxAlign = "ParallaxAlign"),
      (e.CheckConditionGroup = "CheckConditionGroup"),
      (e.CheckActivityState = "CheckActivityState"),
      (e.CheckPlayerInput = "CheckPlayerInput"),
      (e.AwakeAndLoadEntity = "AwakeAndLoadEntity"),
      (e.WalkingPattern = "WalkingPattern");
  })((EChildQuest = exports.EChildQuest || (exports.EChildQuest = {})));
const childQuestAll = Object.values(EChildQuest);
function createQuestTypeCnNameMap() {
  var e = new Map();
  for (const o in exports.questTypeCNMapper) {
    var t = Number(o);
    e.set(exports.questTypeCNMapper[t], t);
  }
  return e;
}
(exports.childQuestForQuest = new Set(childQuestAll)),
  (exports.childQuestForLevelPlay = new Set(
    childQuestAll.filter(
      (e) => e !== EChildQuest.EnterDungeon && e !== EChildQuest.FinishDungeon,
    ),
  )),
  (exports.childQuestConfigs = {
    DoInteract: { OnlineParticipateRule: "AnyPlayer" },
    ReachArea: { OnlineParticipateRule: "AnyPlayer" },
    Kill: {},
    GetItem: {},
    UseSkill: { OnlineParticipateRule: "AnyPlayer" },
    GetSkill: {},
    PlayFlow: {},
    DetectCombatState: {},
    Parkour: {},
    Timer: {},
    HandInItems: {},
    MonsterCreator: {},
    InformationViewCheck: {},
    UseItem: {},
    CheckEntityState: {},
    CheckLevelPlay: {},
    CheckUiGame: {},
    FinishDungeon: {},
    WaitTime: {},
    ScheduleTime: {},
    ReadMail: {},
    Guide: {},
    EnterDungeon: {},
    LeaveDungeon: {},
    CheckTargetBattleAttribute: {},
    WaitBattleCondition: {},
    CompareVar: {},
    ReceiveTelecom: {},
    ShowUi: {},
    TakePhoto: {},
    VisionSystem: {},
    ParallaxAlign: {},
    CheckConditionGroup: {},
    CheckActivityState: {},
    CheckPlayerInput: {},
    AwakeAndLoadEntity: {},
    WalkingPattern: {},
  }),
  (exports.childQuestsForTest = []),
  (function (e) {
    (e.NormalSkill = "NormalSkill"),
      (e.VisionSkill = "VisionSkill"),
      (e.CharacterFightSkill = "CharacterFightSkill");
  })((ESkillType = exports.ESkillType || (exports.ESkillType = {}))),
  (function (e) {
    (e[(e.NoCategory = -1)] = "NoCategory"),
      (e[(e.Normal = 0)] = "Normal"),
      (e[(e.Accumulating = 1)] = "Accumulating"),
      (e[(e.ESkill = 2)] = "ESkill"),
      (e[(e.RSkill = 3)] = "RSkill"),
      (e[(e.QteSkill = 4)] = "QteSkill"),
      (e[(e.CounterAttack = 5)] = "CounterAttack"),
      (e[(e.GroundDodge = 6)] = "GroundDodge"),
      (e[(e.ExtremeDodge = 7)] = "ExtremeDodge"),
      (e[(e.Passive = 8)] = "Passive"),
      (e[(e.BattleVision = 9)] = "BattleVision"),
      (e[(e.ExploreTool = 10)] = "ExploreTool"),
      (e[(e.AirDodge = 11)] = "AirDodge"),
      (e[(e.SwitchSkill = 12)] = "SwitchSkill");
  })(
    (ESkillCategory = exports.ESkillCategory || (exports.ESkillCategory = {})),
  ),
  (exports.skillGenreCnMap = {
    [ESkillCategory.Normal]: "普通攻击",
    [ESkillCategory.Accumulating]: "蓄力攻击",
    [ESkillCategory.ESkill]: "E技能",
    [ESkillCategory.RSkill]: "大招",
    [ESkillCategory.QteSkill]: "QTE",
    [ESkillCategory.CounterAttack]: "完美闪避反击",
    [ESkillCategory.GroundDodge]: "地面闪避",
    [ESkillCategory.ExtremeDodge]: "完美闪避",
    [ESkillCategory.Passive]: "被动技能",
    [ESkillCategory.BattleVision]: "召唤幻象",
    [ESkillCategory.ExploreTool]: "探索技能",
    [ESkillCategory.AirDodge]: "空中闪避",
    [ESkillCategory.SwitchSkill]: "退场技",
    [ESkillCategory.NoCategory]: "无类型",
  }),
  (exports.skillTypeCnMap = {
    NormalSkill: "角色通用技能",
    VisionSkill: "战斗幻象",
    CharacterFightSkill: "角色战斗技能",
  }),
  (exports.elementGenreCnMap = {
    [0]: "物理",
    1: "冷凝",
    2: "热熔",
    3: "导电",
    4: "气动",
    5: "衍射",
    6: "湮灭",
  }),
  (function (e) {
    (e.CheckSkillGenre = "CheckBySkillGenre"),
      (e.CheckSkillId = "CheckBySkillId"),
      (e.CheckVisionSummonId = "CheckVisionSummonId"),
      (e.CheckVisionShowId = "CheckVisionShowId"),
      (e.CheckFollowShooterSkillId = "CheckFollowShooterSkillId");
  })(
    (EUseSkillCheckType =
      exports.EUseSkillCheckType || (exports.EUseSkillCheckType = {})),
  ),
  (exports.combatStateConfig = {
    无冠者: {
      濒死: "怪物.MB1Wuguanzhe00601.濒死触发",
      二阶段: "怪物.MB1Wuguanzhe00601.转二阶段镜头",
      三阶段: "怪物.MB1Wuguanzhe00601.转三阶段镜头",
    },
    路迟: { 半血演出: "怪物.common.状态标识.可以表演" },
    控物: { 被控中: "关卡.Common.属性.被控中" },
  }),
  (function (e) {
    (e.Player = "Player"), (e.Monster = "Monster");
  })(
    (ETargetBattleAttribute =
      exports.ETargetBattleAttribute || (exports.ETargetBattleAttribute = {})),
  ),
  ((EAttributeToTarget =
    exports.EAttributeToTarget || (exports.EAttributeToTarget = {})).Health =
    "Health"),
  (exports.questFailedConfigs = {
    Timer: {},
    TimeRange: {},
    CanGiveUp: {},
    TidGiveUpText: {},
    EdTidGiveUpText: {},
    IsTransferFailure: {},
    IsTeamDeathFailure: { OnlineParticipateRule: "AllPlayers" },
    IsLeaveDungeonFailure: {},
    CheckDungeonFailure: {},
    RangeLimiting: { OnlineParticipateRule: "AllPlayers" },
    EntityAlert: {},
    EntityDistanceLimiting: { OnlineParticipateRule: "AllPlayers" },
    EntityDeathCondition: { OnlineParticipateRule: "AllPlayers" },
    EntityStateCondition: {},
    SneakPlayCondition: {},
    PlayerMotionStateCondition: {},
    PlayerMovementModeCondition: {},
    FailedTeleport: {},
    AddTimeConfig: {},
    CheckDataLayer: {},
  }),
  (exports.defaultQuestType = 2),
  (exports.questTypeCNMapper = {
    [100]: "测试",
    1: "主线",
    2: "支线",
    3: "角色",
    4: "日常",
    7: "引导",
    9: "POI",
  });
const questTypeCnNameMap = createQuestTypeCnNameMap();
function questCnNameToType(e) {
  return questTypeCnNameMap.get(e) ?? 1;
}
function questTypeToCnName(e) {
  return exports.questTypeCNMapper[e];
}
function createQuestRegionCnNameMap() {
  var e = new Map();
  for (const o in exports.questRegionCNMapper) {
    var t = Number(o);
    e.set(exports.questRegionCNMapper[t], t);
  }
  return e;
}
(exports.questCnNameToType = questCnNameToType),
  (exports.questTypeToCnName = questTypeToCnName),
  (exports.defaultQuestRegion = 1),
  (exports.questRegionCNMapper = {
    [100]: "测试",
    1: "云陵谷",
    2: "中曲台地",
    3: "荒石高地",
    4: "遗落原乡",
    5: "无光之森",
    6: "天城城区",
    7: "旧城遗址",
    8: "虎口山脉",
    9: "怨鸟泽",
    10: "北落野",
    11: "黑海岸",
    12: "乘霄山",
    13: "帕尔米罗墓岛",
    14: "拉古那城",
    15: "扶风水畔",
    16: "声骸猎场",
    17: "槲生半岛",
    18: "氤柔水境",
    19: "狄萨莱海脊",
    20: "埃弗拉德金库",
  });
const questRegionCnNameMap = createQuestRegionCnNameMap();
function questCnNameToRegion(e) {
  return questRegionCnNameMap.get(e) ?? 1;
}
function questRegionToCnName(e) {
  return exports.questRegionCNMapper[e];
}
function flatNode(e, t) {
  switch ((t.set(e.Id, e), e.Type)) {
    case "Start":
    case "AlwaysTrue":
    case "AlwaysFalse":
    case "Repeater":
      e.Child && flatNode(e.Child, t);
      break;
    case "Action":
    case "QuestSucceed":
    case "QuestFailed":
    case "Condition":
    case "ChildQuest":
      break;
    case "Sequence":
    case "Select":
    case "ParallelSelect":
      e.Children.forEach((e) => {
        flatNode(e, t);
      });
      break;
    case "ConditionSelector":
      e.Slots.forEach((e) => {
        flatNode(e.Node, t);
      });
  }
}
function flatBehaviorTree(e) {
  var t = new Map();
  return flatNode(e.Root, t), t;
}
function getSkillTypesCn() {
  const t = [];
  return (
    Object.keys(ESkillType).forEach((e) => {
      t.push(exports.skillTypeCnMap[e]);
    }),
    t
  );
}
function getSkillTypeFromCnName(e) {
  for (const t of Object.keys(exports.skillTypeCnMap))
    if (exports.skillTypeCnMap[t] === e) return t;
}
(exports.questCnNameToRegion = questCnNameToRegion),
  (exports.questRegionToCnName = questRegionToCnName),
  (exports.flatBehaviorTree = flatBehaviorTree),
  (exports.getSkillTypesCn = getSkillTypesCn),
  (exports.getSkillTypeFromCnName = getSkillTypeFromCnName),
  (exports.repeatBanList = [
    "GetItem",
    "SendNpcMail",
    "ManualOccupations",
    "DestroyQuest",
    "TeleportDungeon",
    "FinishDungeon",
    "AddBuffToPlayer",
    "RemoveBuffFromPlayer",
  ]);
//# sourceMappingURL=IQuest.js.map
