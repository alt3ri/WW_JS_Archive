"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineBase = exports.appendDepthSpace = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  StateMachineCommon_1 = require("../../../Core/Utils/StateMachine/StateMachineCommon"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  AiStateMachineTransition_1 = require("./AiStateMachineTransition");
function appendDepthSpace(i, s) {
  for (let t = 0; t < s; t++) i.Append("    ");
}
exports.appendDepthSpace = appendDepthSpace;
class AiStateMachineBase extends StateMachineCommon_1.StateMachineCommon {
  constructor(i, s, h) {
    super(i, h.Name, s),
      (this.AiComponent = void 0),
      (this.TagComponent = void 0),
      (this.AttributeComponent = void 0),
      (this.SkillComponent = void 0),
      (this.ActorComponent = void 0),
      (this.BuffComponent = void 0),
      (this.MontageComponent = void 0),
      (this.AnimationComponent = void 0),
      (this.HitComponent = void 0),
      (this.TimeScaleComponent = void 0),
      (this.GameplayCueComponent = void 0),
      (this.MoveComponent = void 0),
      (this.FightStateComponent = void 0),
      (this.UnifiedStateComponent = void 0),
      (this.AiController = void 0),
      (this.SummonerAiController = void 0),
      (this.IsReferenceNode = !1),
      (this.IsOverrideNode = !1),
      (this.IsConduitNode = !1),
      (this.IsAnimStateMachine = !1),
      (this.OverrideNodeUuid = 0),
      (this.SkillId = 0),
      (this.TakeControlType = 0),
      (this.Task = void 0),
      (this.TransitionMap = void 0),
      (this.Children = void 0),
      (this.ChildrenMap = void 0),
      (this.ElapseTime = -0),
      (this.SkillEnd = !1),
      (this.TaskFinish = !1),
      (this.ExecutedAction = !1),
      (this.Entity = void 0),
      (this.CurrentMessageIdCache = void 0),
      (this.LastState = 0),
      (this.HasTaskFinishCondition = !1),
      (this.Hre = void 0),
      (this.jre = !1),
      (this.WaitSwitchState = !1),
      (this.RemoteSwitchPending = void 0),
      (this.RemoteSwitchMessageId = void 0),
      (this.jqn = void 0),
      (this.Wqn = void 0),
      i.Entity &&
        ((this.Entity = i.Entity),
        (this.AiComponent = this.Entity.GetComponent(40)),
        (this.TagComponent = this.Entity.GetComponent(190)),
        (this.AttributeComponent = this.Entity.GetComponent(159)),
        (this.SkillComponent = this.Entity.GetComponent(34)),
        (this.BuffComponent = this.Entity.GetComponent(160)),
        (this.ActorComponent = this.Entity.GetComponent(3)),
        (this.MontageComponent = this.Entity.GetComponent(22)),
        (this.AnimationComponent = this.Entity.GetComponent(163)),
        (this.HitComponent = this.Entity.GetComponent(53)),
        (this.TimeScaleComponent = this.Entity.GetComponent(110)),
        (this.GameplayCueComponent = this.Entity.GetComponent(19)),
        (this.MoveComponent = this.Entity.GetComponent(164)),
        (this.FightStateComponent = this.Entity.GetComponent(48)),
        (this.UnifiedStateComponent = this.Entity.GetComponent(161)),
        (this.AiController = this.AiComponent.AiController),
        (s = this.Entity.GetComponent(0).GetSummonerId())) &&
        ((s =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(
            s,
          )?.Entity.GetComponent(40)),
        (this.SummonerAiController = s?.AiController)),
      (this.Uuid = h.Uuid),
      (this.Name = h.Name);
    s = i.NodeReferenceMap.get(h.Uuid);
    if (
      ((this.IsReferenceNode = !!s),
      (this.OverrideNodeUuid = h.OverrideCommonUuid),
      (this.IsOverrideNode = !!h.OverrideCommonUuid),
      (this.IsConduitNode = h.IsConduitNode),
      (this.IsAnimStateMachine = h.IsAnimStateMachine),
      this.IsReferenceNode)
    ) {
      let t = this.Owner.GetNodeByUuid(s);
      (t = t || new AiStateMachineBase(i, void 0, this.Owner.GetNodeData(s))),
        (this.jqn = t),
        void this.Owner.RegisterNode(this);
    } else {
      if (
        ((this.TakeControlType = h.TakeControlType),
        (this.BindStates = []),
        (this.OnEnterActions = []),
        (this.OnExitActions = []),
        h.Task &&
          (this.Task =
            ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateTask(
              this,
              h.Task,
            )),
        h.BindStates?.length)
      )
        for (const f of h.BindStates) {
          var t =
            ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateState(
              this,
              f,
            );
          t && this.BindStates.push(t);
        }
      if (h.OnEnterActions?.length)
        for (const c of h.OnEnterActions) {
          var o =
            ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateAction(
              this,
              c,
            );
          o && this.OnEnterActions.push(o);
        }
      if (h.OnExitActions?.length)
        for (const M of h.OnExitActions) {
          var e =
            ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateAction(
              this,
              M,
            );
          e && this.OnExitActions.push(e);
        }
      if (h.Children?.length) {
        (this.Children = []), (this.ChildrenMap = new Map());
        var a = h.Children.length;
        for (let t = 0; t < a; t++) {
          var r = new AiStateMachineBase(
            i,
            this,
            this.Owner.GetNodeData(h.Children[t]),
          );
          this.Children.push(r),
            this.ChildrenMap.set(r.Name, r),
            this.AddStateInstance(r.Name, r);
        }
      }
      if (h.Transitions)
        for (const S of h.Transitions) {
          var n,
            d,
            v = this.Owner.GetNodeByUuid(S.From);
          v
            ? (n = this.Owner.GetNodeByUuid(S.To))
              ? (d = new AiStateMachineTransition_1.AiStateMachineTransition(
                  v,
                  S,
                ))
                ? ((this.HasTaskFinishCondition ||= d.HasTaskFinishCondition),
                  v.TransitionMap || (v.TransitionMap = new Map()),
                  v.TransitionMap.set(n.Uuid, d))
                : CombatLog_1.CombatLog.Error(
                    "StateMachineNew",
                    this.Entity,
                    "初始化状态机失败，条件创建失败",
                    ["node", this.Name],
                    ["from", v.Name],
                    ["to", n.Name],
                  )
              : CombatLog_1.CombatLog.Error(
                  "StateMachineNew",
                  this.Entity,
                  "初始化状态机失败，条件创建失败，to节点不存在",
                  ["node", this.Name],
                  ["to", S.To],
                )
            : CombatLog_1.CombatLog.Error(
                "StateMachineNew",
                this.Entity,
                "初始化状态机失败，条件创建失败，from节点不存在",
                ["node", this.Name],
                ["from", S.From],
              );
        }
      this.Owner.RegisterNode(this);
    }
  }
  get MappingNode() {
    var t;
    return (
      this.jqn ||
        ((t = this.Owner.NodeReferenceMap.get(this.Uuid)),
        (this.jqn = this.Owner.GetNodeByUuid(t))),
      this.jqn
    );
  }
  get CurrentLeafNode() {
    return this.CurrentNode ? this.CurrentNode.CurrentLeafNode : this;
  }
  get RootNode() {
    return this.Root;
  }
  OnSwitchState(t, i) {
    this.Owner.SwitchStateFrequencyMonitor?.Execute();
    (t = t ? `[${t?.Name}|${t?.Uuid}]` : "进入"),
      (i = i ? `[${i?.Name}|${i?.Uuid}]` : "退出");
    CombatLog_1.CombatLog.Info(
      "StateMachineNew",
      this.Entity,
      `状态机切换 [${this.Name}|${this.Uuid}] : ${t} => ` + i,
      ["主控", this.ActorComponent.IsAutonomousProxy],
    );
  }
  OnClear() {
    if (this.TransitionMap && 0 < this.TransitionMap.size)
      for (var [, t] of this.TransitionMap) t.Clear();
    if (this.BindStates && 0 < this.BindStates.length)
      for (const i of this.BindStates) i.Clear();
    if (this.OnEnterActions && 0 < this.OnEnterActions.length)
      for (const s of this.OnEnterActions) s.Clear();
    if (this.OnExitActions && 0 < this.OnExitActions.length)
      for (const h of this.OnExitActions) h.Clear();
    this.Task?.Clear(),
      (this.Task = void 0),
      (this.AiComponent = void 0),
      (this.TagComponent = void 0),
      (this.AttributeComponent = void 0),
      (this.SkillComponent = void 0),
      (this.ActorComponent = void 0),
      (this.BuffComponent = void 0),
      (this.MontageComponent = void 0),
      (this.AnimationComponent = void 0),
      (this.GameplayCueComponent = void 0),
      (this.MoveComponent = void 0),
      (this.FightStateComponent = void 0),
      (this.AiController = void 0),
      (this.SummonerAiController = void 0),
      (this.OnEnterActions = void 0),
      (this.OnExitActions = void 0),
      (this.BindStates = void 0),
      (this.TransitionMap = void 0),
      (this.Children = void 0),
      (this.ChildrenMap = void 0);
  }
  OnActivate(t, i = !1, s = 0) {
    if (this.IsReferenceNode) this.MappingNode.ActiveByReferenceNode(this.Uuid);
    else {
      if (
        ((this.ElapseTime = s),
        (this.SkillEnd = !1),
        (this.TaskFinish = !1),
        (this.ExecutedAction = !1),
        (this.jre = !1),
        this.TransitionMap)
      )
        for (var [, h] of this.TransitionMap) h.Enter();
      this.Task &&
        !this.Task.CanBeInterrupt &&
        (this.Task.OnActivate(),
        this.Owner.SetCurrentTaskNode(this),
        (this.Hre = this.FightStateComponent?.TrySwitchState(8, 0, i)));
      for (const o of this.BindStates) o.OnActivate(t);
    }
  }
  Wre() {
    this.Hre && this.FightStateComponent?.ConfirmState(this.Hre),
      this.CurrentNode && this.CurrentNode.Wre();
  }
  OnDeactivate(t) {
    if (this.IsReferenceNode)
      this.MappingNode.DeactiveByReferenceNode(this.Uuid);
    else {
      if (
        ((this.ElapseTime = 0),
        (this.SkillEnd = !1),
        (this.TaskFinish = !1),
        (this.ExecutedAction = !1),
        this.TransitionMap)
      )
        for (var [, i] of this.TransitionMap) i.Exit();
      this.Task &&
        (this.Task.OnDeactivate(),
        this.Owner.RemoveCurrentTaskNode(this),
        void 0 !== this.Hre
          ? (this.FightStateComponent?.ExitState(this.Hre), (this.Hre = void 0))
          : CombatLog_1.CombatLog.Warn(
              "StateMachineNew",
              this.Entity,
              "状态机退出主状态Handle清理失败",
              ["node", this.Name],
            ));
      for (const s of this.BindStates) s.OnDeactivate(t);
    }
  }
  OnEnter(t) {
    if (!this.IsReferenceNode) {
      var i,
        s = this.RootNode.Uuid;
      this.Task &&
        (((i = Protocol_1.Aki.Protocol.x4n.create()).X4n =
          Protocol_1.Aki.Protocol.IFs.Proto_BT_Task),
        (i.$4n = s),
        (i.Y4n = this.Uuid),
        (s = CombatMessage_1.CombatNet.Call(
          26668,
          this.Entity,
          i,
          (t) => {
            t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
              CombatLog_1.CombatLog.Warn(
                "StateMachineNew",
                this.Entity,
                `FsmStateBehaviorRequest 节点Task行为失败 [${this.Name}|${this.Uuid}]`,
                ["ErrorCode", t.Q4n],
              );
          },
          this.RootNode.CurrentMessageIdCache,
          void 0,
          void 0,
          !0,
        )),
        this.Task.OnEnter(s),
        CombatMessage_1.CombatNet.RemovePendingCall(s));
      for (const h of this.OnEnterActions) h.DoAction();
      for (const o of this.BindStates) o.OnEnter(t);
      this.ActorComponent.IsAutonomousProxy && (this.ExecutedAction = !0);
    }
  }
  OnExit(t) {
    if (!this.IsReferenceNode) {
      this.Task?.OnExit();
      for (const i of this.OnExitActions) i.DoAction();
      for (const s of this.BindStates) s.OnExit(t);
    }
  }
  OnTick(t) {
    if (!this.IsReferenceNode) {
      if (((this.ElapseTime += t), this.BindStates))
        for (const i of this.BindStates) i.Tick(t);
      this.Task?.Tick(t);
    }
  }
  TickTransition() {
    if (this.TransitionMap) {
      for (var [, t] of this.TransitionMap) t.Tick();
      if (!this.jre)
        for (var [, i] of this.TransitionMap) {
          var s =
            (this.RootNode.IsAnimStateMachine &&
              this.ActorComponent.IsMoveAutonomousProxy) ||
            this.IsConduitNode;
          if (
            ((i.CanPrediction() && !this.RootNode.WaitSwitchState) || s) &&
            i.GetResult()
          )
            return void this.TrySwitch(i.To);
        }
    }
    this.CurrentNode && this.CurrentNode.TickTransition();
  }
  OnControl() {
    1 === this.TakeControlType
      ? (this.OnEnter(),
        CombatLog_1.CombatLog.Info(
          "StateMachineNew",
          this.Entity,
          "接管控制权，节点重入，执行相关行为",
          ["node", this.Name],
        ))
      : (this.ExecutedAction
          ? ((this.SkillEnd = !0),
            (this.TaskFinish = !0),
            CombatLog_1.CombatLog.Info(
              "StateMachineNew",
              this.Entity,
              "接管控制权，状态已执行行为，标记技能结束",
              ["node", this.Name],
            ))
          : (this.OnEnter(),
            CombatLog_1.CombatLog.Info(
              "StateMachineNew",
              this.Entity,
              "接管控制权，状态未执行行为，执行相关行为",
              ["node", this.Name],
            )),
        this.CurrentNode && this.CurrentNode.OnControl());
  }
  ActiveByReferenceNode(t) {
    this.Wqn || (this.Wqn = new Set()),
      this.Wqn.add(t),
      this.Activated || this.Enter();
  }
  DeactiveByReferenceNode(t) {
    this.Wqn.delete(t), this.Wqn && 0 === this.Wqn.size && this.Exit();
  }
  ForceActive(t = !0) {
    var i;
    this.Parent
      ? ((i = this.Parent).Activated || i.ForceActive(t),
        i.Switch(this.Name, t, !0, !1))
      : this.Enter(void 0, t, !0, !1);
  }
  TrySwitch(i) {
    const s = this.Owner.GetNodeByUuid(i);
    var t = Protocol_1.Aki.Protocol.h4n.create();
    (t.$4n = this.RootNode.Uuid),
      (t.J4n = this.Uuid),
      (t.z4n = s.Uuid),
      (this.RootNode.WaitSwitchState = !0),
      (this.RootNode.LastState = this.CurrentLeafNode.Uuid),
      (this.Owner.AnyChange = !0),
      (this.RootNode.CurrentMessageIdCache = CombatMessage_1.CombatNet.Call(
        24430,
        this.Entity,
        t,
        (t) => {
          if (this.Owner?.Entity) {
            if (
              t.fMs.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ||
              this.RootNode.IsAnimStateMachine
            )
              CombatLog_1.CombatLog.Info(
                "StateMachineNew",
                this.Entity,
                `客户端先行切换状态 成功 [${this.Name}|${this.Uuid}] => [${s?.Name}|${s?.Uuid}]`,
              ),
                this.Wre();
            else if (
              (CombatLog_1.CombatLog.Warn(
                "StateMachineNew",
                this.Entity,
                `客户端先行切换状态 失败 [${this.Name}|${this.Uuid}] => [${s?.Name}|${s?.Uuid}]`,
                ["ErrorCode", t.fMs],
              ),
              this.RootNode.RemoteSwitchPending)
            ) {
              var t = this.Owner.GetNodeByUuid(
                this.RootNode.RemoteSwitchPending,
              );
              if (!t) return;
              CombatLog_1.CombatLog.Warn(
                "StateMachineNew",
                this.Entity,
                `切换远端搁置状态 [${t.Name}|${t.Uuid}]`,
              ),
                (this.RootNode.CurrentMessageIdCache =
                  this.RootNode.RemoteSwitchMessageId),
                t.ForceActive(!0),
                (this.RootNode.CurrentMessageIdCache = void 0),
                this.ActorComponent.IsAutonomousProxy &&
                  (((t = Protocol_1.Aki.Protocol.l4n.create()).$4n =
                    this.RootNode.Uuid),
                  (t.Y4n = i),
                  CombatMessage_1.CombatNet.Call(22140, this.Entity, t)),
                (this.RootNode.LastState = 0);
            } else {
              if (!this.RootNode.LastState) return;
              t = this.Owner.GetNodeByUuid(this.RootNode.LastState);
              if (!t) return;
              CombatLog_1.CombatLog.Warn(
                "StateMachineNew",
                this.Entity,
                `回退状态 [${t.Name}|${t.Uuid}]`,
              ),
                t.ForceActive(!1),
                (t.jre = !0);
            }
            (this.RootNode.WaitSwitchState = !1),
              (this.RootNode.RemoteSwitchPending = void 0);
          } else
            CombatLog_1.CombatLog.Info(
              "StateMachineNew",
              this.Entity,
              `客户端先行切换状态 失败，实体已被销毁 [${this.Name}|${this.Uuid}] => [${s?.Name}|${s?.Uuid}]`,
            );
        },
        void 0,
      )),
      CombatLog_1.CombatLog.Info(
        "StateMachineNew",
        this.Entity,
        "客户端先行切换状态",
        ["from", this.Name],
        ["to", s.Name],
      ),
      this.Parent.Switch(s.Name, !0, !0, !0),
      (this.RootNode.CurrentMessageIdCache = void 0);
  }
  SetExecutedAction() {
    if ((this.Task?.OnExecuted(), this.BindStates?.length))
      for (const t of this.BindStates) t.OnExecuted();
    (this.ExecutedAction = !0),
      this.CurrentNode && this.CurrentNode.SetExecutedAction(),
      CombatLog_1.CombatLog.Info(
        "StateMachineNew",
        this.Entity,
        "状态切换行为执行通知",
        ["node", this.Name],
      );
  }
  HandleServerDebugInfo(t) {
    for (const i of t.XTs)
      this.TransitionMap.get(i.YTs)?.HandleServerDebugInfo(i.JTs);
  }
  OnCharSkillEnd(t) {
    this.Activated &&
      this.SkillId === t &&
      ((this.SkillEnd = !0),
      (this.TaskFinish = !0),
      CombatLog_1.CombatLog.Info(
        "StateMachineNew",
        this.Entity,
        `监听技能完成 [${this.Name}]`,
      ));
  }
  ToString(i, s, h = 0, o = !1, e = !1) {
    if (
      (this.WaitSwitchState && i.Append(">>> 等待服务器确认切换状态 <<<\n"),
      appendDepthSpace(i, h),
      i.Append(`${this.Name}|${this.Uuid}${this.Activated ? " <<<" : ""}\n`),
      this.TransitionMap && 0 < this.TransitionMap.size && this.Activated)
    ) {
      s.Append(
        "-------------------------------------------------------------\n",
      ),
        s.Append(
          `${this.Name} [持续时长:${(this.ElapseTime / 1e3).toFixed(1)}]\n`,
        );
      for (var [t, a] of this.TransitionMap) {
        appendDepthSpace(s, 1);
        var r = this.Owner.GetNodeByUuid(t);
        r
          ? (s.Append(`目标：${r.Name} | ${r.Uuid}
`),
            a.Condition.ToString(s, 2))
          : s.Append(`错误下标：${t}
`);
      }
      s.Append(
        "-------------------------------------------------------------\n",
      );
    }
    var n = this.Children?.length;
    if (this.Children && n && 0 < n)
      for (let t = 0; t < n; t++) this.Children[t].ToString(i, s, h + 1, o, e);
  }
  GetCurrentStateString() {
    let i = this.Name;
    this.WaitSwitchState && (i = "[先行]" + i);
    var s = this.Children?.length ?? 0;
    for (let t = 0; t < s; t++)
      this.Children[t].Activated &&
        (i += "->" + this.Children[t].GetCurrentStateString());
    return i;
  }
}
exports.AiStateMachineBase = AiStateMachineBase;
//# sourceMappingURL=AiStateMachine.js.map
