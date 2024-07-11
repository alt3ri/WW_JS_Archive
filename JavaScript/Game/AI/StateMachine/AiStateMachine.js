"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineBase = exports.appendDepthSpace = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const StateMachineCommon_1 = require("../../../Core/Utils/StateMachine/StateMachineCommon");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage");
const CombatDebugController_1 = require("../../Utils/CombatDebugController");
const AiStateMachineTransition_1 = require("./AiStateMachineTransition");
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
      (this.AiController = void 0),
      (this.SummonerAiController = void 0),
      (this.IsReferenceNode = !1),
      (this.IsOverrideNode = !1),
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
      (this.MBn = void 0),
      (this.SBn = void 0),
      i.Entity &&
        ((this.Entity = i.Entity),
        (this.AiComponent = this.Entity.GetComponent(38)),
        (this.TagComponent = this.Entity.GetComponent(185)),
        (this.AttributeComponent = this.Entity.GetComponent(156)),
        (this.SkillComponent = this.Entity.GetComponent(33)),
        (this.BuffComponent = this.Entity.GetComponent(157)),
        (this.ActorComponent = this.Entity.GetComponent(3)),
        (this.MontageComponent = this.Entity.GetComponent(22)),
        (this.AnimationComponent = this.Entity.GetComponent(160)),
        (this.HitComponent = this.Entity.GetComponent(51)),
        (this.TimeScaleComponent = this.Entity.GetComponent(107)),
        (this.GameplayCueComponent = this.Entity.GetComponent(19)),
        (this.MoveComponent = this.Entity.GetComponent(161)),
        (this.FightStateComponent = this.Entity.GetComponent(46)),
        (this.AiController = this.AiComponent.AiController),
        (s = this.Entity.GetComponent(0).GetSummonerId())) &&
        ((s =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(
            s,
          )?.Entity.GetComponent(38)),
        (this.SummonerAiController = s?.AiController)),
      (this.Uuid = h.Uuid),
      (this.Name = h.Name);
    s = i.NodeReferenceMap.get(h.Uuid);
    if (
      ((this.IsReferenceNode = !!s),
      (this.OverrideNodeUuid = h.OverrideCommonUuid),
      (this.IsOverrideNode = !!h.OverrideCommonUuid),
      this.IsReferenceNode)
    ) {
      let t = this.Owner.GetNodeByUuid(s);
      (t = t || new AiStateMachineBase(i, void 0, this.Owner.GetNodeData(s))),
        (this.MBn = t),
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
          const t =
            ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateState(
              this,
              f,
            );
          t && this.BindStates.push(t);
        }
      if (h.OnEnterActions?.length)
        for (const c of h.OnEnterActions) {
          const o =
            ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateAction(
              this,
              c,
            );
          o && this.OnEnterActions.push(o);
        }
      if (h.OnExitActions?.length)
        for (const l of h.OnExitActions) {
          const e =
            ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateAction(
              this,
              l,
            );
          e && this.OnExitActions.push(e);
        }
      if (h.Children?.length) {
        (this.Children = []), (this.ChildrenMap = new Map());
        const r = h.Children.length;
        for (let t = 0; t < r; t++) {
          const a = new AiStateMachineBase(
            i,
            this,
            this.Owner.GetNodeData(h.Children[t]),
          );
          this.Children.push(a),
            this.ChildrenMap.set(a.Name, a),
            this.AddStateInstance(a.Name, a);
        }
      }
      if (h.Transitions)
        for (const C of h.Transitions) {
          var n;
          var d;
          const v = this.Owner.GetNodeByUuid(C.From);
          v
            ? (n = this.Owner.GetNodeByUuid(C.To))
              ? (d = new AiStateMachineTransition_1.AiStateMachineTransition(
                  v,
                  C,
                ))
                ? ((this.HasTaskFinishCondition ||= d.HasTaskFinishCondition),
                  v.TransitionMap || (v.TransitionMap = new Map()),
                  v.TransitionMap.set(n.Uuid, d))
                : CombatDebugController_1.CombatDebugController.CombatError(
                    "StateMachineNew",
                    this.Entity,
                    "初始化状态机失败，条件创建失败",
                    ["node", this.Name],
                    ["from", v.Name],
                    ["to", n.Name],
                  )
              : CombatDebugController_1.CombatDebugController.CombatError(
                  "StateMachineNew",
                  this.Entity,
                  "初始化状态机失败，条件创建失败，to节点不存在",
                  ["node", this.Name],
                  ["to", C.To],
                )
            : CombatDebugController_1.CombatDebugController.CombatError(
                "StateMachineNew",
                this.Entity,
                "初始化状态机失败，条件创建失败，from节点不存在",
                ["node", this.Name],
                ["from", C.From],
              );
        }
      this.Owner.RegisterNode(this);
    }
  }
  get MappingNode() {
    let t;
    return (
      this.MBn ||
        ((t = this.Owner.NodeReferenceMap.get(this.Uuid)),
        (this.MBn = this.Owner.GetNodeByUuid(t))),
      this.MBn
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
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "StateMachineNew",
      this.Entity,
      `状态机切换 [${this.Name}|${this.Uuid}] : ${t} => ` + i,
      ["主控", this.ActorComponent.IsAutonomousProxy],
    );
  }
  OnClear() {
    if (this.TransitionMap && this.TransitionMap.size > 0)
      for (const [, t] of this.TransitionMap) t.Clear();
    if (this.BindStates && this.BindStates.length > 0)
      for (const i of this.BindStates) i.Clear();
    if (this.OnEnterActions && this.OnEnterActions.length > 0)
      for (const s of this.OnEnterActions) s.Clear();
    if (this.OnExitActions && this.OnExitActions.length > 0)
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
        for (const [, h] of this.TransitionMap) h.Enter();
      this.HasTaskFinishCondition &&
        this.Owner.ForceDisableAnimOptimization &&
        this.AnimationComponent.StartForceDisableAnimOptimization(2),
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
        for (const [, i] of this.TransitionMap) i.Exit();
      this.HasTaskFinishCondition &&
        (this.AnimationComponent.CancelForceDisableAnimOptimization(2),
        (this.Owner.ForceDisableAnimOptimization = !1)),
        this.Task &&
          (this.Task.OnDeactivate(),
          this.Owner.RemoveCurrentTaskNode(this),
          void 0 !== this.Hre
            ? (this.FightStateComponent?.ExitState(this.Hre),
              (this.Hre = void 0))
            : CombatDebugController_1.CombatDebugController.CombatWarn(
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
      let i;
      let s = this.RootNode.Uuid;
      this.Task &&
        (((i = Protocol_1.Aki.Protocol.QNn.create())._kn =
          Protocol_1.Aki.Protocol.DGs.Proto_BT_Task),
        (i.ukn = s),
        (i.ckn = this.Uuid),
        (s = CombatMessage_1.CombatNet.Call(
          13713,
          this.Entity,
          i,
          (t) => {
            t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
              CombatDebugController_1.CombatDebugController.CombatWarn(
                "StateMachineNew",
                this.Entity,
                `FsmStateBehaviorRequest 节点Task行为失败 [${this.Name}|${this.Uuid}]`,
                ["ErrorCode", t.lkn],
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
        for (const h of this.BindStates) h.Tick(t);
      if ((this.Task?.Tick(t), this.TransitionMap)) {
        for (const [, i] of this.TransitionMap) i.Tick();
        if (!this.jre)
          for (const [, s] of this.TransitionMap)
            !this.RootNode.WaitSwitchState &&
              s.CheckPredictionCondition() &&
              this.TrySwitch(s.To);
      }
    }
  }
  OnControl() {
    this.TakeControlType === 1
      ? (this.OnEnter(),
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "StateMachineNew",
          this.Entity,
          "接管控制权，节点重入，执行相关行为",
          ["node", this.Name],
        ))
      : (this.ExecutedAction
          ? ((this.SkillEnd = !0),
            (this.TaskFinish = !0),
            CombatDebugController_1.CombatDebugController.CombatInfo(
              "StateMachineNew",
              this.Entity,
              "接管控制权，状态已执行行为，标记技能结束",
              ["node", this.Name],
            ))
          : (this.OnEnter(),
            CombatDebugController_1.CombatDebugController.CombatInfo(
              "StateMachineNew",
              this.Entity,
              "接管控制权，状态未执行行为，执行相关行为",
              ["node", this.Name],
            )),
        this.CurrentNode && this.CurrentNode.OnControl());
  }
  ActiveByReferenceNode(t) {
    this.SBn || (this.SBn = new Set()),
      this.SBn.add(t),
      this.Activated || this.Enter();
  }
  DeactiveByReferenceNode(t) {
    this.SBn.delete(t), this.SBn && this.SBn.size === 0 && this.Exit();
  }
  ForceActive(t = !0) {
    let i;
    this.Parent
      ? ((i = this.Parent).Activated || i.ForceActive(t),
        i.Switch(this.Name, t, !0, !1))
      : this.Enter(void 0, t, !0, !1);
  }
  TrySwitch(i) {
    const s = this.Owner.GetNodeByUuid(i);
    const t = Protocol_1.Aki.Protocol.INn.create();
    (t.ukn = this.RootNode.Uuid),
      (t.mkn = this.Uuid),
      (t.dkn = s.Uuid),
      (this.RootNode.WaitSwitchState = !0),
      (this.RootNode.LastState = this.CurrentLeafNode.Uuid),
      (this.RootNode.CurrentMessageIdCache = CombatMessage_1.CombatNet.Call(
        4409,
        this.Entity,
        t,
        (t) => {
          t.K0s.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? (CombatDebugController_1.CombatDebugController.CombatInfo(
                "StateMachineNew",
                this.Entity,
                `客户端先行切换状态 成功 [${this.Name}|${this.Uuid}] => [${s?.Name}|${s?.Uuid}]`,
              ),
              this.Wre())
            : (CombatDebugController_1.CombatDebugController.CombatWarn(
                "StateMachineNew",
                this.Entity,
                `客户端先行切换状态 失败 [${this.Name}|${this.Uuid}] => [${s?.Name}|${s?.Uuid}]`,
                ["ErrorCode", t.K0s],
              ),
              this.RootNode.RemoteSwitchPending
                ? ((t = this.Owner.GetNodeByUuid(
                    this.RootNode.RemoteSwitchPending,
                  )),
                  CombatDebugController_1.CombatDebugController.CombatWarn(
                    "StateMachineNew",
                    this.Entity,
                    `切换远端搁置状态 [${t.Name}|${t.Uuid}]`,
                  ),
                  (this.RootNode.CurrentMessageIdCache =
                    this.RootNode.RemoteSwitchMessageId),
                  t.ForceActive(!0),
                  (this.RootNode.CurrentMessageIdCache = void 0),
                  this.ActorComponent.IsAutonomousProxy &&
                    (((t = Protocol_1.Aki.Protocol.TNn.create()).ukn =
                      this.RootNode.Uuid),
                    (t.ckn = i),
                    CombatMessage_1.CombatNet.Call(28719, this.Entity, t)))
                : ((t = this.Owner.GetNodeByUuid(this.RootNode.LastState)),
                  CombatDebugController_1.CombatDebugController.CombatWarn(
                    "StateMachineNew",
                    this.Entity,
                    `回退状态 [${t.Name}|${t.Uuid}]`,
                  ),
                  t.ForceActive(!1),
                  (t.jre = !0))),
            (this.RootNode.WaitSwitchState = !1),
            (this.RootNode.RemoteSwitchPending = void 0);
        },
        void 0,
      )),
      CombatDebugController_1.CombatDebugController.CombatInfo(
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
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "StateMachineNew",
        this.Entity,
        "状态切换行为执行通知",
        ["node", this.Name],
      );
  }
  HandleServerDebugInfo(t) {
    for (const i of t.ySs)
      this.TransitionMap.get(i.ISs)?.HandleServerDebugInfo(i.TSs);
  }
  OnCharSkillEnd(t) {
    this.Activated &&
      this.SkillId === t &&
      ((this.SkillEnd = !0),
      (this.TaskFinish = !0),
      CombatDebugController_1.CombatDebugController.CombatInfo(
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
      this.TransitionMap && this.TransitionMap.size > 0 && this.Activated)
    ) {
      s.Append(
        "-------------------------------------------------------------\n",
      ),
        s.Append(
          `${this.Name} [持续时长:${(this.ElapseTime / 1e3).toFixed(1)}]\n`,
        );
      for (const [t, r] of this.TransitionMap) {
        appendDepthSpace(s, 1);
        const a = this.Owner.GetNodeByUuid(t);
        a
          ? (s.Append(`目标：${a.Name} | ${a.Uuid}
`),
            r.Condition.ToString(s, 2))
          : s.Append(`错误下标：${t}
`);
      }
      s.Append(
        "-------------------------------------------------------------\n",
      );
    }
    const n = this.Children?.length;
    if (this.Children && n && n > 0)
      for (let t = 0; t < n; t++) this.Children[t].ToString(i, s, h + 1, o, e);
  }

  GetCurrentStateString() {
    let i = this.Name;
    this.WaitSwitchState && (i = "[先行]" + i);
    const s = this.Children?.length ?? 0;
    for (let t = 0; t < s; t++)
      this.Children[t].Activated &&
        (i += "->" + this.Children[t].GetCurrentStateString());
    return i;
  }
}
exports.AiStateMachineBase = AiStateMachineBase;
// # sourceMappingURL=AiStateMachine.js.map
