"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, i, o, e) {
    let r;
    const s = arguments.length;
    let h =
      s < 3 ? i : e === null ? (e = Object.getOwnPropertyDescriptor(i, o)) : e;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(t, i, o, e);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (r = t[n]) && (h = (s < 3 ? r(h) : s > 3 ? r(i, o, h) : r(i, o)) || h);
    return s > 3 && h && Object.defineProperty(i, o, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiController = void 0);
const cpp_1 = require("cpp");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const PerformanceController_1 = require("../../../Core/Performance/PerformanceController");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage");
const CombatDebugController_1 = require("../../Utils/CombatDebugController");
const BlackboardController_1 = require("../../World/Controller/BlackboardController");
const AiModelController_1 = require("../Common/AiModelController");
const AiAlertClass_1 = require("./AiAlertClass");
const AiConditionEvents_1 = require("./AiConditionEvents");
const AiHateList_1 = require("./AiHateList");
const AiPatrolController_1 = require("./AiPatrolController");
const AiPerceptionEvents_1 = require("./AiPerceptionEvents");
const AiTaunt_1 = require("./AiTaunt");
const NpcDecisionController_1 = require("./Npc/NpcDecisionController");
class AiController {
  constructor() {
    (this.CharAiDesignComp = void 0),
      (this.CharActorComp = void 0),
      (this.CharSkillComp = void 0),
      (this.AiTeam = void 0),
      (this.AiTaunt = new AiTaunt_1.AiTaunt(this)),
      (this.AiHateList = new AiHateList_1.AiHateList(this)),
      (this.AiCoolDownList = new Map()),
      (this.AiSkill = void 0),
      (this.AiConditionEvents = new AiConditionEvents_1.AiConditionEvents(
        this,
      )),
      (this.AiPerceptionEvents = new AiPerceptionEvents_1.AiPerceptionEvents(
        this,
      )),
      (this.AiWanderInfos = void 0),
      (this.AiWanderRadiusConfig = void 0),
      (this.AiPerception = void 0),
      (this.AiAlert = new AiAlertClass_1.AiAlertClass(this)),
      (this.AiPatrol = new AiPatrolController_1.AiPatrolController()),
      (this.NpcDecision = void 0),
      (this.cY = !1),
      (this.mie = 0),
      (this.die = 0),
      (this.ControllerPlayerId = 0),
      (this.AiBase = void 0),
      (this.StateMachineConfig = void 0),
      (this.AiFlee = void 0),
      (this.Cie = void 0),
      (this.gie = 0),
      (this.AiCombatMessageId = void 0),
      (this.fie = 0),
      (this.OnChangeMode = () => {
        const t = ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? TimeUtil_1.TimeUtil.GetServerTimeStamp() - Time_1.Time.WorldTime
          : Time_1.Time.WorldTime - TimeUtil_1.TimeUtil.GetServerTimeStamp();
        for (const o of this.AiCoolDownList.keys()) {
          const i = this.AiCoolDownList.get(o);
          i && (i[0] = i[0] + t);
        }
      }),
      (this.AiCoolDownEvents = new Map());
  }
  get HatredGroupId() {
    return this.Cie;
  }
  Tick(t) {
    let i;
    this.UpdateCooldownTrigger(),
      this.cY &&
        (this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
          (i = this.GetTeamLevelId()) !== this.AiTeam?.AiTeamLevel.Id &&
          (AiModelController_1.AiModelController.RemoveAiFromTeam(this),
          AiModelController_1.AiModelController.AddAiToTeam(this, i)),
        (this.mie += t),
        ModelManager_1.ModelManager.AiModel.AddAiScore(this));
  }
  ScoreUpdate() {
    let t, i;
    this.CharAiDesignComp.Active &&
      ((t = cpp_1.KuroTime.GetMilliseconds64()),
      this.AiPerception &&
        (this.AiPerception.Tick(), this.AiPerceptionEvents.TickPerception()),
      this.AiAlert.Tick(this.mie),
      this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
        (this.AiTaunt.Tick(),
        this.AiHateList.Tick(this.mie),
        this.AiPerceptionEvents.TickHate()),
      (this.mie = 0),
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest) &&
      ((i = cpp_1.KuroTime.GetMilliseconds64()),
      PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
        "EntityTick" + this.CharActorComp.Entity.Id,
        !1,
        i - t,
      ));
  }
  SetAiDesignComp(t) {
    this.CharAiDesignComp !== t &&
      (this.CharAiDesignComp?.Valid &&
        (ModelManager_1.ModelManager.AiModel.RemoveActiveAiController(this),
        this.AiHateList.UnBindEvents(),
        this.AiTaunt.Clear(),
        this.AiPerception?.Clear(!1)),
      (this.CharAiDesignComp = t),
      (this.CharActorComp = void 0),
      this.pie(),
      !this.NpcDecision) &&
      this.cY &&
      this.CharActorComp &&
      this.fie === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
      ((this.NpcDecision = new NpcDecisionController_1.NpcDecisionController()),
      this.NpcDecision.Init(this));
  }
  pie() {
    let t, i;
    this.CharAiDesignComp?.Valid &&
      ((t = this.CharAiDesignComp.Entity),
      (this.CharActorComp = t.GetComponent(3)),
      (i = this.CharActorComp.CreatureData),
      (this.fie = this.CharActorComp.CreatureData.GetEntityType()),
      (this.CharSkillComp = t.GetComponent(33)),
      (i = i.ComponentDataMap.get("Kvs"))?.Kvs?.Aps &&
        (this.Cie = MathUtils_1.MathUtils.LongToBigInt(i?.Kvs?.Aps)),
      i?.Kvs?.Ups &&
        (this.AiCombatMessageId = MathUtils_1.MathUtils.LongToBigInt(
          i?.Kvs?.Ups,
        )),
      (i = i?.Kvs?.Pps ?? 0),
      (this.gie = i),
      ModelManager_1.ModelManager.AiModel.AddActiveAiController(this),
      this.AiHateList.RefreshAbilityComp(),
      this.AiTaunt.Init(this.AiHateList),
      this.AiPatrol.Init(this.CharActorComp),
      this.AiAlert.Init(this.CharActorComp),
      this.AiPerception) &&
      (i = t.GetComponent(106)) &&
      i.SetLogicRange(this.AiPerception.MaxSenseRange),
      (this.cY = !!this.CharAiDesignComp && this.CharAiDesignComp.Active),
      this.CharActorComp &&
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "Ai",
          this.CharActorComp?.Entity,
          "AiController.InitBaseInfo",
          ["enabled", this.cY],
        );
  }
  GetTeamLevelId() {
    if (this.CharAiDesignComp?.Valid) {
      var t = BlackboardController_1.BlackboardController.GetIntValueByEntity(
        this.CharAiDesignComp.Entity.Id,
        "TeamID",
      );
      if (t) return t;
    }
    return (
      this.gie ||
        ((this.gie = 1),
        (t = this.CharActorComp.CreatureData.GetPbEntityInitData()) &&
          (t = (0, IComponent_1.getComponent)(
            t.ComponentsData,
            "AiComponent",
          )?.AiTeamLevelId) &&
          (this.gie = t)),
      this.gie
    );
  }
  LoadAiConfigs(t, i = !1) {
    this.CharActorComp?.Valid
      ? (ConfigManager_1.ConfigManager.AiConfig.LoadAiConfig(this, t, i),
        this.cY &&
          (this.AiHateList.UnBindEvents(), this.AiHateList.BindEvents()),
        this.AiTaunt.Reset(this.AiHateList))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "BehaviorTree",
          6,
          "Can't load ai config without binding a Character.",
        );
  }
  Clear() {
    AiModelController_1.AiModelController.RemoveAiFromTeam(this),
      this.AiTaunt.Clear(),
      this.AiPerceptionEvents.Clear(!0),
      this.AiHateList.Clear(),
      this.AiPerception &&
        (this.AiPerception.Clear(), (this.AiPerception = void 0)),
      this.AiConditionEvents.Clear(),
      this.AiAlert.Clear(),
      this.AiCoolDownEvents.clear(),
      ModelManager_1.ModelManager.AiModel.RemoveActiveAiController(this),
      ModelManager_1.ModelManager.AiModel.RemoveObject(this),
      this.AiPatrol.Clear(),
      (this.AiTeam = void 0),
      (this.CharAiDesignComp = void 0),
      (this.CharActorComp = void 0),
      (this.CharSkillComp = void 0),
      (this.AiSkill = void 0),
      (this.AiWanderInfos = void 0),
      (this.AiBase = void 0),
      (this.AiFlee = void 0),
      this.NpcDecision &&
        (this.NpcDecision.Destroy(), (this.NpcDecision = void 0)),
      (this.cY = !1);
  }
  SetEnable(t) {
    this.cY !== t &&
      ((this.cY = t)
        ? (this.AiHateList.BindEvents(),
          this.AiTaunt.Reset(this.AiHateList),
          AiModelController_1.AiModelController.AddAiToTeam(
            this,
            this.GetTeamLevelId(),
          ))
        : (this.AiPerception?.Clear(!1),
          this.AiTaunt.Clear(),
          this.AiHateList.Clear(!1),
          this.AiPerceptionEvents.Clear(),
          AiModelController_1.AiModelController.RemoveAiFromTeam(this)),
      (this.mie = 0));
  }
  OnSwitchControl(t, i) {
    this.SetControllerPlayerId(i),
      t && this.AiConditionEvents.ResetAllConditionEvent(),
      this.ResetSwitchControlState(),
      this.UpdateCooldownTrigger();
  }
  SetControllerPlayerId(t) {
    this.ControllerPlayerId = t;
  }
  PreSwitchControl() {
    this.CharActorComp.IsAutonomousProxy &&
      (this.CharSkillComp.CurrentSkill
        ? (this.die = 1)
        : (this.AiControlSwitchRequest(this.CharActorComp.Entity, this),
          (this.die = 2)));
  }
  OnSkillEnd() {
    this.CharActorComp.IsAutonomousProxy &&
      this.die === 1 &&
      (this.AiControlSwitchRequest(this.CharActorComp.Entity, this),
      (this.die = 2));
  }
  IsWaitingSwitchControl() {
    return this.die === 1 || this.die === 2;
  }
  ResetSwitchControlState() {
    this.die = 0;
  }
  GetCoolDownTime(t) {
    return this.AiCoolDownList.get(t)?.[0] ?? 0;
  }
  GetCoolDownRemainTime(t) {
    var t = this.GetCoolDownTime(t);
    const i = ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? TimeUtil_1.TimeUtil.GetServerTimeStamp()
      : Time_1.Time.WorldTime;
    return t < i ? 0 : t - i;
  }
  IsCoolDownTriggered(t) {
    return this.AiCoolDownList.get(t)?.[1] ?? !0;
  }
  UpdateCooldownTrigger() {
    if (this.CharActorComp?.IsAutonomousProxy) {
      let t;
      let i;
      let o;
      const e = ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? TimeUtil_1.TimeUtil.GetServerTimeStamp()
        : Time_1.Time.WorldTime;
      for ([t, [i, o]] of this.AiCoolDownList)
        !o && i < e && this.ActivateCooldownTrigger(t);
    }
  }
  ActivateCooldownTrigger(t) {
    let i;
    let o;
    const e = this.AiCoolDownList.get(t)?.[0];
    const r = this.AiCoolDownEvents.get(t);
    this.AiCoolDownList.set(t, [e ?? 0, !0]),
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        (((o = (i = Protocol_1.Aki.Protocol.Ai).vNn.create()).nkn = [
          i.a2s.create({ skn: t, akn: !0 }),
        ]),
        CombatMessage_1.CombatNet.Call(26355, this.CharAiDesignComp.Entity, o)),
      void 0 !== e && r && r.IsValid() && r.Callback.Broadcast(!0);
  }
  GetCoolDownReady(t) {
    return this.GetCoolDownRemainTime(t) <= 0;
  }
  AddCoolDownTime(t, i) {
    let o = this.GetCoolDownTime(t);
    const e = ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? Time_1.Time.ServerTimeStamp
      : Time_1.Time.WorldTime;
    (!o || e > o) && (o = e), this.SetCoolDownTime(t, o + i, !0, "使用技能");
  }
  SetCoolDownTime(t, i, o, e = "") {
    let r = this.GetCoolDownTime(t);
    r && i < r
      ? CombatDebugController_1.CombatDebugController.CombatInfo(
          "Ai",
          this.CharAiDesignComp.Entity,
          e + ":设置Cd失败，比当前冷却结束时间小",
          ["id", t],
          ["curNetTime", r],
          ["nextTime", i],
        )
      : (CombatDebugController_1.CombatDebugController.CombatInfo(
          "Ai",
          this.CharAiDesignComp.Entity,
          e + ":设置Cd",
          ["id", t],
          ["nextTime", i],
        ),
        this.AiCoolDownList.set(t, [i, !1]),
        (r = Protocol_1.Aki.Protocol.Ai),
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          o &&
          (((e = r.vNn.create()).hkn = [r.s2s.create({ skn: t, akn: i })]),
          (e.nkn = [r.a2s.create({ skn: t, akn: !1 })]),
          CombatMessage_1.CombatNet.Call(
            26355,
            this.CharAiDesignComp.Entity,
            e,
          )));
  }
  InitCooldownTimer(t, i) {
    const o = ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? Time_1.Time.ServerTimeStamp
      : Time_1.Time.WorldTime;
    this.AiCoolDownEvents.has(t)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          20,
          "重复注册AIC计时器",
          ["Actor", this.CharActorComp?.Actor?.GetName()],
          ["id", t],
        )
      : (this.AiCoolDownEvents.set(t, i),
        this.SetCoolDownTime(t, o, !0, "初始化AIC延迟节点"));
  }
  static AiInformationNotify(t, i) {
    const o = t.GetComponent(38)?.AiController;
    for (const e of i.tfs)
      o.SetCoolDownTime(
        e.skn,
        MathUtils_1.MathUtils.LongToNumber(e.akn),
        !1,
        "远程同步",
      );
  }
  static AiInformationS(t, i) {
    const o = t.GetComponent(38)?.AiController;
    if (o) {
      for (const { skn: e, akn: r } of i.hkn) {
        const s = o.AiCoolDownList.get(e)?.[1] ?? !0;
        o.AiCoolDownList.set(e, [
          Number(MathUtils_1.MathUtils.LongToBigInt(r)),
          s,
        ]);
      }
      for (const { skn: h, akn: n } of i.nkn) {
        const l = o.AiCoolDownList.get(h)?.[0] ?? 0;
        o.AiCoolDownList.set(h, [l, n]);
      }
      for (const a of i.ifs)
        o.AiCoolDownList.delete(a), o.AiCoolDownEvents.delete(a);
    }
  }
  AiControlSwitchRequest(t, i) {
    const o = Protocol_1.Aki.Protocol.Ai.Jjn.create();
    const e = t.GetComponent(0).GetCreatureDataId();
    (o.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(18260, o, (t) => {
        t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              15,
              "AiControlSwitchRequest返回错误",
              ["EntityId", e],
              ["ErrorCode", t.lkn],
            ),
          i.ResetSwitchControlState());
      });
  }
}
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("l2n")],
  AiController,
  "AiInformationNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("m2n")],
    AiController,
    "AiInformationS",
    null,
  ),
  (exports.AiController = AiController);
// # sourceMappingURL=AiController.js.map
