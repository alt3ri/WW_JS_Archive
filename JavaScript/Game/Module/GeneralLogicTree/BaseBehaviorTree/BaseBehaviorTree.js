"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseBehaviorTree = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  GuaranteeController_1 = require("../../../LevelGamePlay/Guarantee/GuaranteeController"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralController_1 = require("../../../LevelGamePlay/LevelGeneralController"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
  NodeTypeDefine_1 = require("../Define/NodeTypeDefine"),
  GeneralLogicTreeController_1 = require("../GeneralLogicTreeController"),
  BehaviorTreeSuspendComponent_1 = require("./BehaviorTreeSuspendComponent"),
  BehaviorTreeTimerComponent_1 = require("./BehaviorTreeTimerComponent"),
  BlackBoard_1 = require("./BlackBoard"),
  BehaviorTreeExpressionComponent_1 = require("./Express/BehaviorTreeExpressionComponent");
class BaseBehaviorTree {
  constructor(e, t, i, r, s, o) {
    (this.InnerId = BigInt(0)),
      (this.InnerTreeConfigId = 0),
      (this.BtType = Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid),
      (this.YKt = void 0),
      (this.JKt = void 0),
      (this.FlowInfo = void 0),
      (this.BlackBoard = void 0),
      (this.Expression = void 0),
      (this.TimerCenter = void 0),
      (this.Suspend = void 0),
      (this.InnerFailNodeId = 0),
      (this.t$s = (e, t, i) => {
        e &&
          1 === t &&
          1 === i &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnTeamLivingStateChange,
            this.t$s,
          ),
          this.ZKt(Protocol_1.Aki.Protocol.NEs.Proto_CharacterDieFail));
      }),
      (this.ZKt = (e) => {
        this.BlackBoard.ContainTag(6) &&
          GeneralLogicTreeController_1.GeneralLogicTreeController.RequestRollback(
            this.InnerId,
            e,
          );
      }),
      (this.InnerId = e),
      (this.InnerTreeConfigId = t),
      (this.BtType = i),
      (this.YKt = []),
      (this.JKt = new Queue_1.Queue()),
      (this.BlackBoard = new BlackBoard_1.Blackboard(this.BtType, e, t, r, s)),
      o && this.BlackBoard.AddTag(8);
  }
  get TreeIncId() {
    return this.InnerId;
  }
  get TreeConfigId() {
    return this.InnerTreeConfigId;
  }
  get DungeonId() {
    return this.BlackBoard.DungeonId;
  }
  get FailNodeId() {
    return this.InnerFailNodeId;
  }
  ClearFailNodeId() {
    this.InnerFailNodeId = 0;
  }
  InitTree(e, t = !1) {
    this.eQt(), this.SetSleep(t), this.Recover(e), this.tQt();
  }
  Destroy() {
    this.iQt(),
      this.SetTrack(!1),
      this.FlowInfo.Dispose(),
      this.Expression.Dispose(),
      this.TimerCenter.Dispose(),
      this.BlackBoard.Dispose();
  }
  CreateNode(e, t) {
    if (this.BlackBoard.IsSleeping)
      this.oQt({ ProcessType: 0, Reason: e, NodeInfo: t });
    else if (t) {
      var i = this.BlackBoard.GetNodeConfig(t.NodeId),
        r = (0, NodeTypeDefine_1.newNodeObj)(i);
      if (r)
        return (
          this.BlackBoard.AddNode(t.NodeId, r),
          this.BlackBoard.AddNodeToStatusGroup(r, t.H6n),
          r.Init(this.BlackBoard, e, t, i, this.BtType),
          r
        );
    }
  }
  oQt(e) {
    this.JKt.Push(e);
  }
  eQt() {
    (this.FlowInfo = new DynamicFlowInfo()),
      (this.TimerCenter =
        new BehaviorTreeTimerComponent_1.BehaviorTreeTimerCenter(
          this.InnerId,
          this.BlackBoard,
        )),
      (this.Suspend =
        new BehaviorTreeSuspendComponent_1.BehaviorTreeSuspendComponent(
          this.InnerId,
          this.BlackBoard,
        )),
      (this.Expression =
        new BehaviorTreeExpressionComponent_1.BehaviorTreeExpressionComponent(
          this.BlackBoard,
        )),
      this.Expression.Init();
  }
  Recover(e) {
    e &&
      (this.rQt(e.aEs),
      this.nQt(e.lEs),
      this.sQt(e.hEs),
      this.aQt(e._Es, e.uEs));
  }
  rQt(e) {
    if (e)
      for (const r of Object.keys(e)) {
        var t = e[r],
          i = ((t.NodeId = Number(r)), this.GetNode(t.NodeId));
        i
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("GeneralLogicTree", 19, "创建节点时：节点已存在", [
              "节点Id",
              t.NodeId,
            ])
          : this.CreateNode(1, t);
      }
  }
  nQt(e) {
    if (e) for (const t of e) this.UpdateTimer(t);
  }
  sQt(e) {
    for (const i of Object.keys(e)) {
      var t = e[i];
      this.BlackBoard.UpdateTreeVar(i, t);
    }
  }
  aQt(e, t) {
    this.Suspend.UpdateOccupations(0, e, t);
  }
  tQt() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.BlackBoard,
      EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate,
      this.ZKt,
    );
  }
  iQt() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnTeamLivingStateChange,
      this.t$s,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnTeamLivingStateChange,
        this.t$s,
      ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.BlackBoard,
        EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate,
        this.ZKt,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.BlackBoard,
          EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate,
          this.ZKt,
        );
  }
  SetSleep(e) {
    if (
      ((this.BlackBoard.IsSleeping = e),
      !this.BlackBoard.IsSleeping && 0 !== this.JKt.Size)
    ) {
      let e = this.JKt.Pop();
      for (; void 0 !== e; ) {
        switch (e.ProcessType) {
          case 0:
            this.CreateNode(e.Reason, e.NodeInfo);
            break;
          case 1:
            this.UpdateNodeState(e.Reason, e.NodeId, e.NodeStatus);
            break;
          case 2:
            this.UpdateNodeProgress(e.NodeId, e.NodeInfo);
            break;
          case 3:
            this.UpdateChildQuestNodeState(e.NodeId, e.NodeStatus, e.Reason);
            break;
          case 4:
            this.SetTrack(e.Value);
            break;
          case 5:
            this.DoAction(
              e.ContextType,
              e.NodeId,
              e.PlayerId,
              e.SessionId,
              e.StartIndex,
              e.EndIndex,
            );
            break;
          case 6:
            this.UpdateTimer(e.TimerInfo);
            break;
          case 7:
            this.UpdateOccupations(e.Notify);
            break;
          case 8:
            this.UpdateTreeVars(e.Notify);
        }
        e = 0 < this.JKt.Size ? this.JKt.Pop() : void 0;
      }
    }
  }
  UpdateNodeState(e, t, i) {
    var r;
    this.BlackBoard.IsSleeping
      ? this.oQt({ ProcessType: 1, Reason: e, NodeId: t, NodeStatus: i })
      : (r = this.GetNode(t))
        ? (this.BlackBoard.UpdateNodeInStatusGroup(r, r.Status, i),
          r.UpdateStatus(e, i))
        : (((r = new GeneralLogicTreeDefine_1.NodeInfo()).NodeId = t),
          (r.H6n = i),
          this.CreateNode(e, r));
  }
  UpdateNodeProgress(e, t) {
    this.BlackBoard.IsSleeping
      ? this.oQt({ ProcessType: 2, NodeId: e, NodeInfo: t })
      : t && (e = this.GetNode(e)) && e.UpdateProgress(t);
  }
  UpdateChildQuestNodeState(e, t, i) {
    this.BlackBoard.IsSleeping
      ? this.oQt({ ProcessType: 3, NodeId: e, NodeStatus: t, Reason: i })
      : (e = this.GetNode(e)) &&
        "ChildQuest" === e.NodeType &&
        e.UpdateChildQuestStatus(t, i);
  }
  GetNode(e) {
    return this.BlackBoard.GetNode(e);
  }
  GetNodesByGroupId(e) {
    return this.BlackBoard.GetNodesByGroupId(e);
  }
  GetTreeVarByKey(e) {
    return this.BlackBoard.GetTreeVar(e);
  }
  CheckCanGiveUp() {
    if (!ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) return !1;
    var e = this.GetProcessingCanGiveupFailedNode();
    if (!e) return !1;
    if (!e.CanGiveUp) return !1;
    var t,
      e = this.GetNodesByGroupId(1);
    if (!e) return !1;
    let i = !0;
    for ([, t] of e)
      if ("ChildQuest" === t.NodeType && !t.CanGiveUp) {
        i = !1;
        break;
      }
    return i;
  }
  GetProcessingCanGiveupFailedNode() {
    var t = this.GetNodesByGroupId(1);
    if (t) {
      let e = void 0;
      for (var [, i] of t)
        if ("QuestFailed" === i.NodeType && i.CanGiveUp) {
          e = i;
          break;
        }
      return e;
    }
  }
  GetProcessingFailedNode() {
    var t = this.GetNodesByGroupId(1);
    if (t) {
      let e = void 0;
      for (var [, i] of t)
        if ("QuestFailed" === i.NodeType) {
          e = i;
          break;
        }
      return e;
    }
  }
  GetCurrentActiveChildQuestNode() {
    return this.BlackBoard.GetCurrentActiveChildQuestNode();
  }
  GetActiveChildQuestNodesId() {
    return this.BlackBoard.GetActiveChildQuestNodesId();
  }
  GetCurrentCorrelativeEntities() {
    var e = this.GetNodesByGroupId(1);
    if (e) {
      this.YKt.splice(0, this.YKt.length);
      for (var [, t] of e)
        if ("ChildQuest" === t.NodeType) {
          t = t.GetCorrelativeEntities();
          if (t) for (const i of t) this.YKt.push(i);
        }
      return this.YKt;
    }
  }
  AddDynamicFlowNpc(e) {
    this.FlowInfo.AddDynamicFlowNpc(e);
  }
  PrepareRollback(e, t) {
    this.SetRollbackWaiting(!0), (this.InnerFailNodeId = t ?? 0);
    for (const i of this.BlackBoard.GetCurrentExecuteActions())
      LevelGeneralController_1.LevelGeneralController.StopActionsExecute(i);
    (t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      (t = ModelManager_1.ModelManager.SceneTeamModel.GetGroupLivingState(
        t,
        1,
      ));
    e === Protocol_1.Aki.Protocol.NEs.Proto_CharacterDieFail && 2 === t
      ? EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnTeamLivingStateChange,
          this.t$s,
        )
      : this.ZKt(e);
  }
  ExecuteTreeGuaranteeActions() {
    var e = this.BlackBoard.GetGuaranteeActions();
    0 !== e.length &&
      ((e = e.reverse()),
      GuaranteeController_1.GuaranteeController.ExecuteActions(
        e,
        LevelGeneralContextDefine_1.GuaranteeContext.Create(),
      ),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "LevelEvent",
        40,
        "树保底行为已全部完成",
        ["treeIncId", this.BlackBoard.TreeConfigId],
        ["保底行为列表", e],
      );
  }
  SetRollbackWaiting(e) {
    e && !this.BlackBoard.ContainTag(6)
      ? this.BlackBoard.AddTag(6)
      : !e && this.BlackBoard.ContainTag(6) && this.BlackBoard.RemoveTag(6);
  }
  IsTracking() {
    return this.BlackBoard.IsTracking;
  }
  SetTrack(e, t = 0) {
    (e && this.BlackBoard.IsSuspend()) ||
      (this.BlackBoard.IsSleeping
        ? this.oQt({ ProcessType: 4, Value: e })
        : this.BlackBoard.IsTracking !== e &&
          ((this.BlackBoard.IsTracking = e),
          this.Expression.EnableTrack(e, t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
            this.BtType,
            this.TreeIncId,
          )));
  }
  SetMapMarkResident(e) {
    this.BlackBoard.SetMapMarkResident(e);
  }
  SetUseInnerTrackIconId(e) {
    this.BlackBoard.SetUseInnerTrackIconId(e);
  }
  StartTextExpress(e = 0) {
    this.Expression.StartTextExpress(e);
  }
  EndTextExpress(e = 0) {
    this.Expression.EndTextExpress(e);
  }
  CreateShowBridge() {
    return this.BlackBoard.CreateShowBridge();
  }
  GetSilentAreaShowInfo() {
    return this.BlackBoard.GetSilentAreaShowInfo();
  }
  GetTrackIconId() {
    return this.BlackBoard.TaskMarkTableId;
  }
  IsChallengeUi() {
    return this.BlackBoard.IsChallengeUi();
  }
  IsCustomUi() {
    return this.BlackBoard.IsCustomUi();
  }
  CheckCanShow() {
    return this.Expression.CheckCanShow();
  }
  GetNodeTrackPosition(e) {
    return this.Expression.GetNodeTrackPosition(e);
  }
  HasValidTrackTarget(e) {
    return void 0 !== this.Expression.GetNodeTrackPosition(e);
  }
  GetNodeDungeonId(e) {
    return this.Expression.GetDungeonId(e);
  }
  GetTrackDistance(e) {
    return this.Expression.GetTrackDistance(e);
  }
  GetDefaultMark(e) {
    return this.Expression.GetDefaultMark(e);
  }
  IsInTrackRange() {
    return this.BlackBoard.ContainTag(12);
  }
  IsRangeTrack(e) {
    let t = e;
    return (
      void 0 !==
        (t =
          void 0 === t ? this.GetCurrentActiveChildQuestNode()?.NodeId : t) &&
      0 !== this.GetRangeMarkSize(e)
    );
  }
  GetRangeMarkSize(e) {
    return this.Expression.GetRangeMarkSize(e);
  }
  GetRangeMarkShowDis(e) {
    return this.Expression.GetRangeMarkShowDis(e);
  }
  GetGuideLineHideDistance(e) {
    return this.IsInTrackRange() ? this.GetRangeMarkSize(e) : 0;
  }
  GetCurrentNodeShortcutShow() {
    return this.BlackBoard.ContainTag(7)
      ? 2
      : this.BlackBoard.ContainTag(14)
        ? 3
        : this.CheckCanGiveUp()
          ? 1
          : 0;
  }
  GetGiveUpText() {
    var e = this.GetProcessingCanGiveupFailedNode();
    return e && e.GiveUpText
      ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e.GiveUpText)
      : "";
  }
  CreateMapMarks() {
    this.Expression.CreateMapMarks();
  }
  DoAction(t, i, r, s, o, n) {
    if (this.BlackBoard.IsSleeping)
      this.oQt({
        ProcessType: 5,
        ContextType: t,
        NodeId: i,
        PlayerId: r,
        SessionId: s,
        StartIndex: o,
        EndIndex: n,
      });
    else {
      var h = this.BlackBoard.GetNodeConfig(i);
      if (h) {
        let e = void 0;
        switch (t) {
          case Protocol_1.Aki.Protocol.TOs.qvs:
            "QuestSucceed" === h.Type && (e = h.FinishActions);
            break;
          case Protocol_1.Aki.Protocol.TOs.$vs:
            "Action" === h.Type && (e = h.Actions);
            break;
          case Protocol_1.Aki.Protocol.TOs.Ovs:
            ("ConditionSelector" !== h.Type &&
              "ParallelSelect" !== h.Type &&
              "Select" !== h.Type &&
              "Sequence" !== h.Type) ||
              (e = h.SaveConfig?.EnterActions);
            break;
          case Protocol_1.Aki.Protocol.TOs.Gvs:
            "QuestFailed" === h.Type && (e = h.FinishActions);
            break;
          case Protocol_1.Aki.Protocol.TOs.bvs:
            "ChildQuest" === h.Type && (e = h.EnterActions);
            break;
          case Protocol_1.Aki.Protocol.TOs.Bvs:
            "ChildQuest" === h.Type && (e = h.FinishActions);
        }
        e && 0 !== e.length
          ? (this.BlackBoard.AddCurrentExecuteActions(s),
            ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
              e,
              LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
                this.BtType,
                this.TreeIncId,
                this.TreeConfigId,
                i,
                t,
              ),
              r,
              s,
              o,
              n,
              () => {
                this.BlackBoard.RemoveCurrentExecuteActions(s);
              },
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器推送执行行为时，没有找到行为配置",
              ["contextType", t],
              ["treeConfigId", this.TreeConfigId],
              ["nodeId", i],
            );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GeneralLogicTree",
            19,
            "服务器推送执行行为时，没有找到节点配置",
            ["contextType", t],
            ["treeConfigId", this.TreeConfigId],
            ["nodeId", i],
          );
    }
  }
  UpdateTimer(e) {
    this.BlackBoard.IsSleeping
      ? this.oQt({ ProcessType: 6, TimerInfo: e })
      : this.TimerCenter.UpdateTimerInfo(e);
  }
  GetChallengeRemainTime(e = "CountDownChallenge") {
    return this.TimerCenter.GetRemainTime(e);
  }
  UpdateTreeVars(e) {
    this.BlackBoard.IsSleeping
      ? this.oQt({ ProcessType: 8, Notify: e })
      : (this.BlackBoard.UpdateTreeVar(e.jEs, e.WEs),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
          this.TreeIncId,
        ));
  }
  IsSuspend() {
    return this.BlackBoard.IsSuspend();
  }
  GetSuspendType() {
    return this.Suspend.GetSuspendType();
  }
  GetSuspendText() {
    return this.Suspend.GetSuspendText();
  }
  GetOccupations() {
    return this.Suspend.GetOccupations();
  }
  UpdateOccupations(e) {
    this.BlackBoard.IsSleeping
      ? this.oQt({ ProcessType: 7, Notify: e })
      : this.Suspend.UpdateOccupations(e.b5n, e._Es, e.uEs);
  }
  HasRefOccupiedEntity() {
    return this.BlackBoard.HasRefOccupiedEntity();
  }
  GetRefOccupiedEntityText() {
    return this.BlackBoard.GetRefOccupiedEntityText();
  }
  AddGuaranteeActionInfo(e, t, i, r) {
    this.BlackBoard.AddGuaranteeActionInfo(e, t, i, r);
  }
  PopGuaranteeActionInfo(e, t) {
    return this.BlackBoard.PopGuaranteeActionInfo(e, t);
  }
  ClearGuaranteeActions(e) {
    this.BlackBoard.ClearGuaranteeActions(e);
  }
  GetRollbackPoint() {
    return this.BlackBoard.RollbackPoint;
  }
}
exports.BaseBehaviorTree = BaseBehaviorTree;
class DynamicFlowInfo {
  constructor() {
    (this.hQt = void 0), (this.hQt = []);
  }
  Dispose() {
    this.ClearDynamicFlowNpcList();
  }
  AddDynamicFlowNpc(e) {
    this.hQt.push(e);
  }
  ClearDynamicFlowNpcList() {
    for (const t of this.hQt) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      e && (e = e.Entity.GetComponent(170)) && e.PlayDynamicFlowEnd();
    }
    this.hQt.splice(0, this.hQt.length);
  }
}
//# sourceMappingURL=BaseBehaviorTree.js.map
