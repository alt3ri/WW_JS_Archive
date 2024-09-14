"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.newNodeObj =
    exports.childQuestNodeType =
    exports.NodeTypeData =
      void 0);
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest"),
  AwakeAndLoadEntityNode_1 = require("../BehaviorNode/ChildQuestNode/AwakeAndLoadEntityNode"),
  CheckCombatStateBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/CheckCombatStateBehaviorNode"),
  CheckEntityStateNode_1 = require("../BehaviorNode/ChildQuestNode/CheckEntityStateNode"),
  CheckLevelPlayBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/CheckLevelPlayBehaviorNode"),
  CheckPlayerInputBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/CheckPlayerInputBehaviorNode"),
  CommunicateNode_1 = require("../BehaviorNode/ChildQuestNode/CommunicateNode"),
  DeliverBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/DeliverBehaviorNode"),
  EntityPhotoBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/EntityPhotoBehaviorNode"),
  GuideFinishBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/GuideFinishBehaviorNode"),
  InteractBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/InteractBehaviorNode"),
  KillBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/KillBehaviorNode"),
  MonsterCreatorBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/MonsterCreatorBehaviorNode"),
  ParallaxBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ParallaxBehaviorNode"),
  ParkourBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ParkourBehaviorNode"),
  PlayFlowBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/PlayFlowBehaviorNode"),
  ReachAreaBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ReachAreaBehaviorNode"),
  ReadMailBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ReadMailBehaviorNode"),
  ServerAchieveChildQuestNode_1 = require("../BehaviorNode/ChildQuestNode/ServerAchieveChildQuestNode"),
  ShowUiBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ShowUiBehaviorNode"),
  UseItemBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/UseItemBehaviorNode"),
  ParallelSelectNode_1 = require("../BehaviorNode/LogicNode/ParallelSelectNode"),
  SequenceNode_1 = require("../BehaviorNode/LogicNode/SequenceNode"),
  QuestFailedBehaviorNode_1 = require("../BehaviorNode/QuestFailedBehaviorNode");
class NodeTypeData {
  constructor(e) {
    this.Ctor = e;
  }
}
function newNodeObj(o) {
  if (o) {
    let e = void 0;
    var a = o.Id;
    switch (o.Type) {
      case "ChildQuest":
        var d = o.Condition.Type;
        e = new exports.childQuestNodeType[d].Ctor(a);
        break;
      case "QuestFailed":
        e = new QuestFailedBehaviorNode_1.QuestFailedBehaviorNode(a);
        break;
      case "ParallelSelect":
        e = new ParallelSelectNode_1.ParallelSelectNode(a);
        break;
      case "Sequence":
        e = new SequenceNode_1.SequenceNode(a);
    }
    return e;
  }
}
(exports.NodeTypeData = NodeTypeData),
  (exports.childQuestNodeType = {
    [IQuest_1.EChildQuest.DoInteract]: new NodeTypeData(
      InteractBehaviorNode_1.InteractBehaviorNode,
    ),
    [IQuest_1.EChildQuest.Kill]: new NodeTypeData(
      KillBehaviorNode_1.KillBehaviorNode,
    ),
    [IQuest_1.EChildQuest.ReachArea]: new NodeTypeData(
      ReachAreaBehaviorNode_1.ReachAreaBehaviorNode,
    ),
    [IQuest_1.EChildQuest.PlayFlow]: new NodeTypeData(
      PlayFlowBehaviorNode_1.PlayFlowBehaviorNode,
    ),
    [IQuest_1.EChildQuest.GetItem]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.UseSkill]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.GetSkill]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.DetectCombatState]: new NodeTypeData(
      CheckCombatStateBehaviorNode_1.CheckCombatStateBehaviorNode,
    ),
    [IQuest_1.EChildQuest.Timer]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.Parkour]: new NodeTypeData(
      ParkourBehaviorNode_1.ParkourBehaviorNode,
    ),
    [IQuest_1.EChildQuest.MonsterCreator]: new NodeTypeData(
      MonsterCreatorBehaviorNode_1.MonsterCreatorBehaviorNode,
    ),
    [IQuest_1.EChildQuest.HandInItems]: new NodeTypeData(
      DeliverBehaviorNode_1.DeliverBehaviorNode,
    ),
    [IQuest_1.EChildQuest.InformationViewCheck]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.UseItem]: new NodeTypeData(
      UseItemBehaviorNode_1.UseItemBehaviorNode,
    ),
    [IQuest_1.EChildQuest.CheckLevelPlay]: new NodeTypeData(
      CheckLevelPlayBehaviorNode_1.CheckLevelPlayBehaviorNode,
    ),
    [IQuest_1.EChildQuest.CheckEntityState]: new NodeTypeData(
      CheckEntityStateNode_1.CheckEntityStateNode,
    ),
    [IQuest_1.EChildQuest.FinishDungeon]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.WaitTime]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.ScheduleTime]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.ReadMail]: new NodeTypeData(
      ReadMailBehaviorNode_1.ReadMailBehaviorNode,
    ),
    [IQuest_1.EChildQuest.Guide]: new NodeTypeData(
      GuideFinishBehaviorNode_1.GuideFinishBehaviorNode,
    ),
    [IQuest_1.EChildQuest.EnterDungeon]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.LeaveDungeon]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.CheckTargetBattleAttribute]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.CompareVar]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.CheckUiGame]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.ReceiveTelecom]: new NodeTypeData(
      CommunicateNode_1.CommunicateNode,
    ),
    [IQuest_1.EChildQuest.ShowUi]: new NodeTypeData(
      ShowUiBehaviorNode_1.ShowUiBehaviorNode,
    ),
    [IQuest_1.EChildQuest.WaitBattleCondition]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.TakePhoto]: new NodeTypeData(
      EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode,
    ),
    [IQuest_1.EChildQuest.VisionSystem]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.ParallaxAlign]: new NodeTypeData(
      ParallaxBehaviorNode_1.ParallaxBehaviorNode,
    ),
    [IQuest_1.EChildQuest.CheckConditionGroup]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.CheckActivityState]: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    [IQuest_1.EChildQuest.CheckPlayerInput]: new NodeTypeData(
      CheckPlayerInputBehaviorNode_1.CheckPlayerInputBehaviorNode,
    ),
    [IQuest_1.EChildQuest.AwakeAndLoadEntity]: new NodeTypeData(
      AwakeAndLoadEntityNode_1.AwakeAndLoadEntityNode,
    ),
    [IQuest_1.EChildQuest.WalkingPattern]: new NodeTypeData(void 0),
  }),
  (exports.newNodeObj = newNodeObj);
//# sourceMappingURL=NodeTypeDefine.js.map
