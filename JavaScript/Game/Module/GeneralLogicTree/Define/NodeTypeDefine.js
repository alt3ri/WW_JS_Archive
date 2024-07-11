"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.newNodeObj =
    exports.childQuestNodeType =
    exports.NodeTypeData =
      void 0);
const CheckCombatStateBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/CheckCombatStateBehaviorNode");
const CheckEntityStateNode_1 = require("../BehaviorNode/ChildQuestNode/CheckEntityStateNode");
const CheckLevelPlayBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/CheckLevelPlayBehaviorNode");
const CommunicateNode_1 = require("../BehaviorNode/ChildQuestNode/CommunicateNode");
const DeliverBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/DeliverBehaviorNode");
const EntityPhotoBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/EntityPhotoBehaviorNode");
const GuideFinishBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/GuideFinishBehaviorNode");
const InteractBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/InteractBehaviorNode");
const KillBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/KillBehaviorNode");
const MonsterCreatorBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/MonsterCreatorBehaviorNode");
const ParallaxBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ParallaxBehaviorNode");
const ParkourBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ParkourBehaviorNode");
const PlayFlowBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/PlayFlowBehaviorNode");
const ReachAreaBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ReachAreaBehaviorNode");
const ReadMailBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ReadMailBehaviorNode");
const ServerAchieveChildQuestNode_1 = require("../BehaviorNode/ChildQuestNode/ServerAchieveChildQuestNode");
const ShowUiBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/ShowUiBehaviorNode");
const UseItemBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/UseItemBehaviorNode");
const ParallelSelectNode_1 = require("../BehaviorNode/LogicNode/ParallelSelectNode");
const SequenceNode_1 = require("../BehaviorNode/LogicNode/SequenceNode");
const QuestFailedBehaviorNode_1 = require("../BehaviorNode/QuestFailedBehaviorNode");
class NodeTypeData {
  constructor(e) {
    this.Ctor = e;
  }
}
function newNodeObj(o) {
  if (o) {
    let e = void 0;
    const a = o.Id;
    switch (o.Type) {
      case "ChildQuest":
        var i = o.Condition.Type;
        e = new exports.childQuestNodeType[i].Ctor(a);
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
    DoInteract: new NodeTypeData(InteractBehaviorNode_1.InteractBehaviorNode),
    Kill: new NodeTypeData(KillBehaviorNode_1.KillBehaviorNode),
    ReachArea: new NodeTypeData(ReachAreaBehaviorNode_1.ReachAreaBehaviorNode),
    PlayFlow: new NodeTypeData(PlayFlowBehaviorNode_1.PlayFlowBehaviorNode),
    GetItem: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    UseSkill: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    GetSkill: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    DetectCombatState: new NodeTypeData(
      CheckCombatStateBehaviorNode_1.CheckCombatStateBehaviorNode,
    ),
    Timer: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    Parkour: new NodeTypeData(ParkourBehaviorNode_1.ParkourBehaviorNode),
    MonsterCreator: new NodeTypeData(
      MonsterCreatorBehaviorNode_1.MonsterCreatorBehaviorNode,
    ),
    HandInItems: new NodeTypeData(DeliverBehaviorNode_1.DeliverBehaviorNode),
    InformationViewCheck: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    UseItem: new NodeTypeData(UseItemBehaviorNode_1.UseItemBehaviorNode),
    CheckLevelPlay: new NodeTypeData(
      CheckLevelPlayBehaviorNode_1.CheckLevelPlayBehaviorNode,
    ),
    CheckEntityState: new NodeTypeData(
      CheckEntityStateNode_1.CheckEntityStateNode,
    ),
    FinishDungeon: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    WaitTime: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    ScheduleTime: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    ReadMail: new NodeTypeData(ReadMailBehaviorNode_1.ReadMailBehaviorNode),
    Guide: new NodeTypeData(GuideFinishBehaviorNode_1.GuideFinishBehaviorNode),
    EnterDungeon: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    LeaveDungeon: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    CheckTargetBattleAttribute: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    CompareVar: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    CheckUiGame: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    ReceiveTelecom: new NodeTypeData(CommunicateNode_1.CommunicateNode),
    ShowUi: new NodeTypeData(ShowUiBehaviorNode_1.ShowUiBehaviorNode),
    WaitBattleCondition: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    TakePhoto: new NodeTypeData(
      EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode,
    ),
    VisionSystem: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
    ParallaxAlign: new NodeTypeData(
      ParallaxBehaviorNode_1.ParallaxBehaviorNode,
    ),
    CheckConditionGroup: new NodeTypeData(
      ServerAchieveChildQuestNode_1.ServerAchieveChildQuestNode,
    ),
  }),
  (exports.newNodeObj = newNodeObj);
// # sourceMappingURL=NodeTypeDefine.js.map
