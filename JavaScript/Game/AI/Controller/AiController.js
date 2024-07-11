"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, o, e) {
    var s,
      r = arguments.length,
      h =
        r < 3
          ? i
          : null === e
            ? (e = Object.getOwnPropertyDescriptor(i, o))
            : e;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, i, o, e);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (s = t[n]) && (h = (r < 3 ? s(h) : 3 < r ? s(i, o, h) : s(i, o)) || h);
    return 3 < r && h && Object.defineProperty(i, o, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiController = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  BlackboardController_1 = require("../../World/Controller/BlackboardController"),
  AiModelController_1 = require("../Common/AiModelController"),
  AiAlertClass_1 = require("./AiAlertClass"),
  AiConditionEvents_1 = require("./AiConditionEvents"),
  AiHateList_1 = require("./AiHateList"),
  AiPatrolController_1 = require("./AiPatrolController"),
  AiPerceptionEvents_1 = require("./AiPerceptionEvents"),
  AiTaunt_1 = require("./AiTaunt"),
  NpcDecisionController_1 = require("./Npc/NpcDecisionController");
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
        var t = ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? TimeUtil_1.TimeUtil.GetServerTimeStamp() - Time_1.Time.WorldTime
          : Time_1.Time.WorldTime - TimeUtil_1.TimeUtil.GetServerTimeStamp();
        for (const o of this.AiCoolDownList.keys()) {
          var i = this.AiCoolDownList.get(o);
          i && (i[0] = i[0] + t);
        }
      }),
      (this.AiCoolDownEvents = new Map());
  }
  get HatredGroupId() {
    return this.Cie;
  }
  Tick(t) {
    var i;
    this.UpdateCooldownTrigger(),
      this.cY &&
        (this.fie === Protocol_1.Aki.Protocol.wks.Proto_Monster &&
          (i = this.GetTeamLevelId()) !== this.AiTeam?.AiTeamLevel.Id &&
          (AiModelController_1.AiModelController.RemoveAiFromTeam(this),
          AiModelController_1.AiModelController.AddAiToTeam(this, i)),
        (this.mie += t),
        ModelManager_1.ModelManager.AiModel.AddAiScore(this));
  }
  ScoreUpdate() {
    var t, i;
    this.CharAiDesignComp.Active &&
      ((t = cpp_1.KuroTime.GetMilliseconds64()),
      this.AiPerception &&
        (this.AiPerception.Tick(), this.AiPerceptionEvents.TickPerception()),
      this.AiAlert.Tick(this.mie),
      this.AiHateList.AiHate &&
        (this.AiTaunt.Tick(), this.AiHateList.Tick(this.mie)),
      this.fie === Protocol_1.Aki.Protocol.wks.Proto_Monster &&
        this.AiPerceptionEvents.TickHate(),
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
      this.fie === Protocol_1.Aki.Protocol.wks.Proto_Npc &&
      ((this.NpcDecision = new NpcDecisionController_1.NpcDecisionController()),
      this.NpcDecision.Init(this));
  }
  pie() {
    var t, i;
    this.CharAiDesignComp?.Valid &&
      ((t = this.CharAiDesignComp.Entity),
      (this.CharActorComp = t.GetComponent(3)),
      (i = this.CharActorComp.CreatureData),
      (this.fie = this.CharActorComp.CreatureData.GetEntityType()),
      (this.CharSkillComp = t.GetComponent(33)),
      (i = i.ComponentDataMap.get("_ys"))?._ys?.Wys &&
        (this.Cie = MathUtils_1.MathUtils.LongToBigInt(i?._ys?.Wys)),
      i?._ys?.Qys &&
        (this.AiCombatMessageId = MathUtils_1.MathUtils.LongToBigInt(
          i?._ys?.Qys,
        )),
      (i = i?._ys?.Kys ?? 0),
      (this.gie = i),
      ModelManager_1.ModelManager.AiModel.AddActiveAiController(this),
      this.AiHateList.RefreshAbilityComp(),
      this.AiTaunt.Init(this.AiHateList),
      this.AiPatrol.Init(this.CharActorComp),
      this.AiAlert.Init(this.CharActorComp),
      this.AiPerception) &&
      (i = t.GetComponent(108)) &&
      i.SetLogicRange(this.AiPerception.MaxSenseRange),
      (this.cY = !!this.CharAiDesignComp && this.CharAiDesignComp.Active),
      this.CharActorComp &&
        CombatLog_1.CombatLog.Info(
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
      1 === this.die &&
      (this.AiControlSwitchRequest(this.CharActorComp.Entity, this),
      (this.die = 2));
  }
  IsWaitingSwitchControl() {
    return 1 === this.die || 2 === this.die;
  }
  ResetSwitchControlState() {
    this.die = 0;
  }
  GetCoolDownTime(t) {
    return this.AiCoolDownList.get(t)?.[0] ?? 0;
  }
  GetCoolDownRemainTime(t) {
    var t = this.GetCoolDownTime(t),
      i = ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? TimeUtil_1.TimeUtil.GetServerTimeStamp()
        : Time_1.Time.WorldTime;
    return t < i ? 0 : t - i;
  }
  IsCoolDownTriggered(t) {
    return this.AiCoolDownList.get(t)?.[1] ?? !0;
  }
  UpdateCooldownTrigger() {
    if (this.CharActorComp?.IsAutonomousProxy) {
      var t,
        i,
        o,
        e = ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? TimeUtil_1.TimeUtil.GetServerTimeStamp()
          : Time_1.Time.WorldTime;
      for ([t, [i, o]] of this.AiCoolDownList)
        !o && i < e && this.ActivateCooldownTrigger(t);
    }
  }
  ActivateCooldownTrigger(t) {
    var i,
      o,
      e = this.AiCoolDownList.get(t)?.[0],
      s = this.AiCoolDownEvents.get(t);
    this.AiCoolDownList.set(t, [e ?? 0, !0]),
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        (((o = (i = Protocol_1.Aki.Protocol.Ai).X3n.create()).w4n = [
          i.Xks.create({ b4n: t, q4n: !0 }),
        ]),
        CombatMessage_1.CombatNet.Call(29197, this.CharAiDesignComp.Entity, o)),
      void 0 !== e && s && s.IsValid() && s.Callback.Broadcast(!0);
  }
  GetCoolDownReady(t) {
    return this.GetCoolDownRemainTime(t) <= 0;
  }
  AddCoolDownTime(t, i) {
    let o = this.GetCoolDownTime(t);
    var e = ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? Time_1.Time.ServerTimeStamp
      : Time_1.Time.WorldTime;
    (!o || e > o) && (o = e), this.SetCoolDownTime(t, o + i, !0, "使用技能");
  }
  SetCoolDownTime(t, i, o, e = "") {
    var s = this.GetCoolDownTime(t);
    s && i < s
      ? CombatLog_1.CombatLog.Info(
          "Ai",
          this.CharAiDesignComp.Entity,
          e + ":设置Cd失败，比当前冷却结束时间小",
          ["id", t],
          ["curNetTime", s],
          ["nextTime", i],
        )
      : (CombatLog_1.CombatLog.Info(
          "Ai",
          this.CharAiDesignComp.Entity,
          e + ":设置Cd",
          ["id", t],
          ["nextTime", i],
        ),
        this.AiCoolDownList.set(t, [i, !1]),
        (s = Protocol_1.Aki.Protocol.Ai),
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          o &&
          (((e = s.X3n.create()).G4n = [s.Qks.create({ b4n: t, q4n: i })]),
          (e.w4n = [s.Xks.create({ b4n: t, q4n: !1 })]),
          CombatMessage_1.CombatNet.Call(
            29197,
            this.CharAiDesignComp.Entity,
            e,
          )));
  }
  InitCooldownTimer(t, i) {
    var o = ModelManager_1.ModelManager.GameModeModel.IsMulti
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
    var o = t.GetComponent(39)?.AiController;
    for (const e of i.vSs)
      o.SetCoolDownTime(
        e.b4n,
        MathUtils_1.MathUtils.LongToNumber(e.q4n),
        !1,
        "远程同步",
      );
  }
  static AiInformationS(t, i) {
    var o = t.GetComponent(39)?.AiController;
    if (o) {
      for (var { b4n: e, q4n: s } of i.G4n) {
        var r = o.AiCoolDownList.get(e)?.[1] ?? !0;
        o.AiCoolDownList.set(e, [
          Number(MathUtils_1.MathUtils.LongToBigInt(s)),
          r,
        ]);
      }
      for (var { b4n: h, q4n: n } of i.w4n) {
        var a = o.AiCoolDownList.get(h)?.[0] ?? 0;
        o.AiCoolDownList.set(h, [a, n]);
      }
      for (const l of i.pSs)
        o.AiCoolDownList.delete(l), o.AiCoolDownEvents.delete(l);
    }
  }
  AiControlSwitchRequest(t, i) {
    var o = Protocol_1.Aki.Protocol.Ai.jXn.create();
    const e = t.GetComponent(0).GetCreatureDataId();
    (o.P4n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(27100, o, (t) => {
        t.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              15,
              "AiControlSwitchRequest返回错误",
              ["EntityId", e],
              ["ErrorCode", t.O4n],
            ),
          i.ResetSwitchControlState());
      });
  }
}
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("OFn")],
  AiController,
  "AiInformationNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("VFn")],
    AiController,
    "AiInformationS",
    null,
  ),
  (exports.AiController = AiController);
//# sourceMappingURL=AiController.js.map
