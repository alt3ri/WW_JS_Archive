"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineGroup = void 0);
const Time_1 = require("../../../Core/Common/Time"),
  AiBaseById_1 = require("../../../Core/Define/ConfigQuery/AiBaseById"),
  AiStateMachineConfigById_1 = require("../../../Core/Define/ConfigQuery/AiStateMachineConfigById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  FrequencyMonitor_1 = require("../../Utils/FrequencyMonitor"),
  AiStateMachine_1 = require("./AiStateMachine"),
  AiStateMachineTaskSkill_1 = require("./Task/AiStateMachineTaskSkill"),
  MAX_SWITCH_STATE_COUNT = 3;
class AiStateMachineGroup {
  constructor(t) {
    (this.Kre = 0),
      (this.Qre = 0),
      (this.Xre = 0),
      (this.$re = 0),
      (this.Entity = void 0),
      (this.StateMachineComp = void 0),
      (this.ActorComp = void 0),
      (this.Yre = void 0),
      (this.Jre = void 0),
      (this.NodeMap = void 0),
      (this.NodeMapByName = void 0),
      (this.NodeDataMap = void 0),
      (this.NodeReferenceMap = void 0),
      (this.NodeOverrideMap = void 0),
      (this.StateMachines = void 0),
      (this.StateMachineMap = void 0),
      (this.SwitchStateFrequencyMonitor = void 0),
      (this.Inited = !1),
      (this.StateMachinesActivated = !1),
      (this.AnyChange = !1),
      (this.zre = void 0),
      (this.ErrorMessage = void 0),
      (this.OnDeath = () => {
        if (this.StateMachinesActivated) {
          for (const t of this.StateMachines) t.Activated && t.Exit();
          this.StateMachinesActivated = !1;
        }
      }),
      (this.Zre = (t, i) => {
        if (0 < this.zre.size)
          for (const e of this.zre) {
            if (
              e.Task instanceof
                AiStateMachineTaskSkill_1.AiStateMachineTaskSkill &&
              e.Task.SkillId === i
            )
              break;
            CombatLog_1.CombatLog.Warn(
              "StateMachineNew",
              this.Entity,
              "主状态激活时，不应该释放其他技能",
              ["主状态节点", e.Name],
              ["技能Id", i],
            );
            break;
          }
      }),
      (this.ene = (t, i) => {
        if (this.StateMachines?.length)
          for (const e of this.StateMachines)
            e.CurrentLeafNode.OnCharSkillEnd(i);
      }),
      (this.tne = 0),
      (this.zre = new Set()),
      t &&
        ((this.Entity = t.Entity),
        (this.StateMachineComp = t),
        (this.ActorComp = t.Entity.GetComponent(3)),
        (t = t.Entity.GetComponent(0)),
        (this.SwitchStateFrequencyMonitor =
          new FrequencyMonitor_1.FrequencyMonitor(1, 10, "状态机切换", [
            "PbDataId",
            t.GetPbDataId(),
          ])),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
          this.OnDeath,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.ene,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.Zre,
        ));
  }
  SetCurrentTaskNode(t) {
    if ((this.zre.add(t), 1 < this.zre.size)) {
      const i = new Array();
      this.zre.forEach((t) => {
        i.push(t.Name);
      }),
        CombatLog_1.CombatLog.Warn(
          "StateMachineNew",
          this.Entity,
          "多个主状态节点激活，请保持主状态节点激活唯一",
          ["已激活主状态节点", i.join(", ")],
        );
    }
  }
  RemoveCurrentTaskNode(t) {
    this.zre.delete(t);
  }
  IsCurrentTaskSkill(t) {
    if (this.zre)
      for (const i of this.zre)
        if (
          i.Task instanceof AiStateMachineTaskSkill_1.AiStateMachineTaskSkill &&
          i.Task.SkillId === t
        )
          return !0;
    return !1;
  }
  PushErrorMessage(t) {
    CombatLog_1.CombatLog.Error("StateMachineNew", this.Entity, t),
      this.ErrorMessage ||
        (this.ErrorMessage = new StringBuilder_1.StringBuilder()),
      this.ErrorMessage.Append(t),
      this.ErrorMessage.Append("\n");
  }
  GetNodeData(t) {
    var i = this.NodeOverrideMap.get(t);
    return void 0 === i ? this.NodeDataMap.get(t) : this.NodeDataMap.get(i);
  }
  GetBlackboard(t) {
    return this.Yre.get(t);
  }
  GetCustomBlackboard(t) {
    return this.Jre?.get(t);
  }
  RegisterNode(t) {
    var i;
    this.NodeMap.set(t.Uuid, t),
      t.IsReferenceNode ||
        (this.NodeMapByName.set(t.Name, t),
        t.IsOverrideNode &&
          ((i = t.OverrideNodeUuid),
          (i = this.NodeDataMap.get(i)),
          this.NodeMapByName.set(i.Name, t)));
  }
  InitFsmJson() {
    var t = this.Entity?.GetComponent(0).GetPbEntityInitData();
    let i = 0;
    var e,
      s,
      t = (i =
        t?.ComponentsData &&
        (t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent"))
          ?.AiId &&
        !t.Disabled
          ? t.AiId
          : i)
        ? AiBaseById_1.configAiBaseById.GetConfig(i)
        : void 0;
    return (
      t?.StateMachine &&
        (e =
          AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
            t.StateMachine,
          ))?.StateMachineJson &&
        ((e = JSON.parse(e.StateMachineJson)),
        ((s = this.Entity.GetComponent(68)).StateMachineName = t.StateMachine),
        (s.StateMachineJsonObject = e)),
      !0
    );
  }
  OnActivate() {
    PreloadDefine_1.PreloadSetting.UseNewPreload && this.InitFsmJson();
    var t = this.StateMachineComp.StateMachineJsonObject,
      i = ConfigManager_1.ConfigManager.AiConfig.CommonStateMachineJsonObject;
    if (i && t) {
      (this.Kre = i.Version),
        (this.Qre = t.Version),
        (this.NodeDataMap = new Map()),
        (this.NodeReferenceMap = new Map()),
        (this.NodeOverrideMap = new Map());
      for (const s of i.Nodes)
        this.NodeDataMap.set(s.Uuid, s),
          s.ReferenceUuid && this.NodeReferenceMap.set(s.Uuid, s.ReferenceUuid);
      for (const o of t.Nodes) this.NodeDataMap.set(o.Uuid, o);
      for (const h of t.Nodes)
        h.OverrideCommonUuid &&
          this.NodeOverrideMap.set(h.OverrideCommonUuid, h.Uuid),
          h.ReferenceUuid && this.NodeReferenceMap.set(h.Uuid, h.ReferenceUuid);
      (this.StateMachines = []),
        (this.NodeMap = new Map()),
        (this.NodeMapByName = new Map()),
        (this.StateMachineMap = new Map()),
        (this.Yre = new Map()),
        (this.Jre = new Map());
      for (const a of t.StateMachines) {
        let t = this.GetNodeData(a);
        if (!(t = t.ReferenceUuid ? this.GetNodeData(t.ReferenceUuid) : t))
          return void CombatLog_1.CombatLog.Error(
            "StateMachineNew",
            this.Entity,
            "状态机初始化失败，不存在状态机",
            ["stateMachineId", a],
          );
        var e = new AiStateMachine_1.AiStateMachineBase(this, void 0, t);
        e.IsReferenceNode || this.StateMachines.push(e);
      }
      for (const n of this.NodeReferenceMap.values()) {
        const r = this.NodeMap.get(n);
        this.StateMachines.find((t) => t === r) || this.StateMachines.push(r);
      }
      CombatLog_1.CombatLog.Info(
        "StateMachineNew",
        this.Entity,
        "初始化状态机-成功",
      ),
        (this.Inited = !0),
        this.StartStateMachines(),
        this.ActorComp.IsAutonomousProxy && this.OnControl(),
        this.OnTick(0);
    }
  }
  StartStateMachines() {
    var t = this.Entity.GetComponent(0).ComponentDataMap.get("Uys")?.Uys;
    if (t?.NTs && 0 < t.NTs.length) {
      if (
        ((this.Xre = Number(t.VTs)),
        (this.$re = Number(t.FTs)),
        this.Qre !== this.$re &&
          CombatLog_1.CombatLog.Warn(
            "StateMachineNew",
            this.Entity,
            "实体状态机与服务器版本不一致",
            ["客户端", this.Qre],
            ["服务器", this.$re],
          ),
        this.Kre !== this.Xre &&
          CombatLog_1.CombatLog.Warn(
            "StateMachineNew",
            this.Entity,
            "公共状态机与服务器版本不一致",
            ["客户端", this.Kre],
            ["服务器", this.Xre],
          ),
        this.Inited)
      ) {
        if (t.$Ts) for (const i of t.$Ts) this.Yre.set(i.Z4n, i.e5n);
        if (t.HTs?.WTs)
          for (const e of t.HTs.WTs)
            CombatLog_1.CombatLog.Warn(
              "StateMachineNew",
              this.Entity,
              "初始化黑板值",
              ["Key", e.Z4n],
              ["Value", e.e5n],
            ),
              this.Jre.set(e.Z4n, e.e5n);
        for (const s of t.NTs) this.StartState(s.$4n, s.OTs, s.kTs);
        this.StateMachinesActivated = !0;
      }
    } else
      CombatLog_1.CombatLog.Error(
        "StateMachineNew",
        this.Entity,
        "状态机初始化失败，服务器实体没有相关初始状态",
      );
  }
  HandleBlackboard(t) {
    if (
      (CombatLog_1.CombatLog.Info(
        "StateMachineNew",
        this.Entity,
        "HandleBlackboard",
      ),
      t.jTs)
    )
      for (const i of t.jTs)
        CombatLog_1.CombatLog.Info(
          "StateMachineNew",
          this.Entity,
          "set",
          ["key", i.Z4n],
          ["value", i.e5n],
        ),
          this.Yre.set(i.Z4n, i.e5n);
  }
  HandleCustomBlackboard(t) {
    if (
      (CombatLog_1.CombatLog.Info(
        "StateMachineNew",
        this.Entity,
        "HandleCustomBlackboard",
      ),
      t.HTs?.WTs)
    )
      for (const i of t.HTs.WTs)
        CombatLog_1.CombatLog.Info(
          "StateMachineNew",
          this.Entity,
          "set",
          ["key", i.Z4n],
          ["value", i.e5n],
        ),
          this.Jre.set(i.Z4n, i.e5n);
  }
  Clear() {
    if (this.StateMachines) for (const t of this.StateMachines) t.Clear();
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Entity,
      EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
      this.OnDeath,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSkillEnd,
        this.ene,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharUseSkill,
        this.Zre,
      ),
      (this.SwitchStateFrequencyMonitor = void 0),
      (this.StateMachinesActivated = !1),
      (this.Entity = void 0),
      (this.StateMachineComp = void 0),
      (this.ActorComp = void 0),
      (this.Yre = void 0),
      (this.Jre = void 0),
      (this.NodeMap = void 0),
      (this.NodeMapByName = void 0),
      (this.NodeDataMap = void 0),
      (this.NodeReferenceMap = void 0),
      (this.StateMachines = void 0),
      (this.StateMachineMap = void 0),
      (this.ErrorMessage = void 0),
      (this.zre = void 0);
  }
  OnTick(t) {
    if (this.StateMachinesActivated)
      for (const s of this.StateMachines)
        if (s.Activated) {
          s.Tick(t);
          let i = !1,
            e = !1;
          for (let t = 0; t < MAX_SWITCH_STATE_COUNT && (!(0 < t) || e); t++)
            t,
              (this.AnyChange = !1),
              s.TickTransition(),
              (e =
                this.AnyChange &&
                (s.IsAnimStateMachine || s.CurrentLeafNode.IsConduitNode)),
              (i = this.AnyChange || i);
          i && (s.WaitSwitchState = !0);
        }
  }
  GetNodeByUuid(t) {
    var i;
    if (this.NodeMap)
      return void 0 === (i = this.NodeOverrideMap.get(t))
        ? this.NodeMap.get(t)
        : this.NodeMap.get(i);
  }
  GetNodeByName(t) {
    if (this.NodeMapByName) return this.NodeMapByName.get(t);
  }
  RequestServerDebugInfo() {
    Time_1.Time.NowSeconds < this.tne + 1 ||
      (Net_1.Net.Call(
        27206,
        Protocol_1.Aki.Protocol.tes.create({
          F4n: this.ActorComp.CreatureData.GetCreatureDataId(),
        }),
        (t) => {
          this.HandleEntityFsmGroupInfo(t);
        },
      ),
      (this.tne = Time_1.Time.NowSeconds));
  }
  BlackboardToString() {
    if (this.Jre) {
      var t,
        i,
        e = new StringBuilder_1.StringBuilder("状态机黑板值\n");
      e.Append(
        "-------------------------------------------------------------\n",
      );
      for ([t, i] of this.Jre)
        e.Append(`[${t}]: ${i}
`);
      return (
        e.Append(
          "-------------------------------------------------------------\n",
        ),
        e.ToString()
      );
    }
    return "";
  }
  ToString(t = 0, i) {
    var e = new StringBuilder_1.StringBuilder();
    if (
      (e.Append(`------[${this.StateMachineComp.StateMachineName}]------
`),
      this.Qre !== this.$re &&
        e.Append(`>>> 警告，实体状态机与服务器版本不一致 <<<
客户端:${this.Qre}
服务端:${this.$re}
`),
      this.Kre !== this.Xre &&
        e.Append(`>>> 警告，公共状态机与服务器版本不一致 <<<
客户端:${this.Kre}
服务端:${this.Xre}
`),
      this.ErrorMessage &&
        e.Append(`>>> 状态机初始化失败 <<<
${this.ErrorMessage.ToString()}
`),
      !this.Inited)
    )
      return (
        e.Append(
          ">>> 状态机未初始化，客户端无状态机配置 <<<\n请检查Ai基础.xlsx是否正确配置",
        ),
        [e.ToString(), ""]
      );
    var s = new StringBuilder_1.StringBuilder();
    this.StateMachinesActivated
      ? e.Append(">>> 状态机已启动 <<<\n")
      : e.Append(">>> 状态机未启动 <<<\n服务器状态机配置错误或者怪物已死亡\n"),
      e.Append(this.BlackboardToString()),
      s.Append(
        "(第一个客户端结果，第二个服务器结果，第三个客户端/服务器条件)\n",
      );
    for (const o of this.StateMachines)
      e.Append(
        "-------------------------------------------------------------\n",
      ),
        o.ToString(e, s),
        e.Append(
          "-------------------------------------------------------------\n",
        );
    return [e.ToString(), s.ToString()];
  }
  StartState(t, i, e) {
    var s = this.GetNodeByUuid(i);
    s
      ? s.Activated ||
        (CombatLog_1.CombatLog.Warn(
          "StateMachineNew",
          this.Entity,
          `设置初始状态，激活状态 [${s.Name}|${s.Uuid}]`,
        ),
        s.Start(!1, e),
        this.ActorComp.IsAutonomousProxy &&
          (((s = Protocol_1.Aki.Protocol.l4n.create()).$4n = t),
          (s.Y4n = i),
          CombatMessage_1.CombatNet.Call(22140, this.Entity, s)))
      : CombatLog_1.CombatLog.Warn(
          "StateMachineNew",
          this.Entity,
          `设置初始状态失败，目标节点不存在 [${t}][${i}]`,
        );
  }
  HandleSwitch(t, i, e, s) {
    var o = this.GetNodeByUuid(t),
      h = this.GetNodeByUuid(e);
    h
      ? o.WaitSwitchState
        ? ((o.RemoteSwitchPending = e),
          (o.RemoteSwitchMessageId = s),
          CombatLog_1.CombatLog.Warn(
            "StateMachineNew",
            this.Entity,
            `远端切换状态，目前处于等待切换结果状态，[${h.Name}|${h.Uuid}]`,
          ))
        : h.Activated
          ? CombatLog_1.CombatLog.Warn(
              "StateMachineNew",
              this.Entity,
              `远端切换状态，状态已激活 [${h.Name}|${h.Uuid}]`,
            )
          : (CombatLog_1.CombatLog.Warn(
              "StateMachineNew",
              this.Entity,
              `远端切换状态，root[${o.Name}|${o.Uuid}] 激活节点[${h.Name}|${h.Uuid}]`,
            ),
            (o.CurrentMessageIdCache = s),
            h.ForceActive(),
            (o.CurrentMessageIdCache = void 0),
            this.ActorComp.IsAutonomousProxy &&
              (((s = Protocol_1.Aki.Protocol.l4n.create()).$4n = t),
              (s.Y4n = e),
              CombatMessage_1.CombatNet.Call(22140, this.Entity, s)))
      : CombatLog_1.CombatLog.Warn(
          "StateMachineNew",
          this.Entity,
          `远端切换状态失败，目标节点不存在 [${e}]`,
        );
  }
  HandleChangeStateConfirm(t, i) {
    var e = this.GetNodeByUuid(i);
    e
      ? e.Activated
        ? e.SetExecutedAction()
        : CombatLog_1.CombatLog.Warn(
            "StateMachineNew",
            this.Entity,
            `远端修改状态确认通知，该状态机未激活 [${e.Name}|${e.Uuid}]`,
          )
      : CombatLog_1.CombatLog.Warn(
          "StateMachineNew",
          this.Entity,
          `远端确认切换状态失败，目标节点不存在 [${i}]`,
        );
  }
  HandleEntityFsmGroupInfo(t) {
    if (t.KTs)
      for (const i of t.KTs)
        for (const e of i.QTs)
          this.GetNodeByUuid(e.tps)?.HandleServerDebugInfo(e);
  }
  ResetStateMachine(t, i) {
    if (
      (CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "状态机重置"),
      t?.NTs && 0 < t.NTs.length)
    ) {
      if (
        ((this.Xre = Number(t.VTs)), (this.$re = Number(t.FTs)), this.Inited)
      ) {
        for (const o of t.NTs) {
          var e = this.GetNodeByUuid(o.$4n),
            s = this.GetNodeByUuid(o.OTs);
          if (!s)
            return void CombatLog_1.CombatLog.Error(
              "StateMachineNew",
              this.Entity,
              "状态机重置失败，目标状态不存在",
              ["fsmId", o.$4n],
              ["fsmId", o.OTs],
            );
          CombatLog_1.CombatLog.Warn(
            "StateMachineNew",
            this.Entity,
            "状态机重置状态",
            ["fsmId", o.$4n],
            ["stateId", o.OTs],
          ),
            (e.CurrentMessageIdCache = i),
            s.ForceActive(),
            (e.CurrentMessageIdCache = void 0);
        }
        this.StateMachinesActivated = !0;
      }
    } else
      CombatLog_1.CombatLog.Error(
        "StateMachineNew",
        this.Entity,
        "状态机重置失败，服务器实体没有相关初始状态",
      );
  }
  OnControl() {
    if (this.StateMachinesActivated)
      for (const t of this.StateMachines) t.OnControl();
  }
}
exports.AiStateMachineGroup = AiStateMachineGroup;
//# sourceMappingURL=AiStateMachineGroup.js.map
