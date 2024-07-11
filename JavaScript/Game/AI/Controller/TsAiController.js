"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Time_1 = require("../../../Core/Common/Time"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  DRAW_ARROW_SIZE = 100,
  DRAW_LINE_THICKNESS = 3,
  ARROW_LENGTH_SUB = 20,
  targetLinkColor = new UE.LinearColor(1, 0, 0, 1),
  teamMemberLinkColor = new UE.LinearColor(0, 1, 0, 1),
  allyLinkColor = new UE.LinearColor(0.6, 1, 0.6, 1),
  neutralLinkColor = new UE.LinearColor(1, 1, 0, 1),
  enemyLinkColor = new UE.LinearColor(1, 0, 1, 1),
  areaCenterColor = new UE.LinearColor(0, 1, 1, 1),
  DEFAULT_SEGMENTS = 24,
  minHateAreaColor = new UE.LinearColor(1, 0, 1, 1),
  maxHateAreaColor = new UE.LinearColor(0, 1, 1, 1),
  minHateInitAreaColor = new UE.LinearColor(1, 0, 0, 1),
  maxHateInitAreaColor = new UE.LinearColor(0, 1, 0, 1);
class TsAiController extends UE.KuroAIController {
  constructor() {
    super(...arguments),
      (this.CharAiDesignComp = void 0),
      (this.CharTagComp = void 0),
      (this.CharBuffComp = void 0),
      (this.CharStateMachineComp = void 0),
      (this.AiController = void 0),
      (this.BehaviorTree = void 0),
      (this.StateMachineGroup = void 0),
      (this.DebugDraw = 0),
      (this.DebugDrawInternal = 0);
  }
  ChangeDebugDraw() {
    this.DebugDraw = this.DebugDraw ? 0 : 1;
  }
  SetDebugDraw(t) {
    (this.DebugDraw = t), (this.DebugDrawInternal = this.DebugDraw);
  }
  get IsDebugDraw() {
    return (
      void 0 === this.DebugDrawInternal &&
        (this.DebugDrawInternal = this.DebugDraw),
      this.DebugDrawInternal
    );
  }
  GetEntity() {
    return this.CharAiDesignComp?.Entity;
  }
  SetupBehaviorTree(t) {
    return (
      this.BehaviorTree !== t &&
      ((this.BehaviorTree = t), this.RunBehaviorTree(t), !0)
    );
  }
  InitAiController(t) {
    (this.CharAiDesignComp = t),
      (this.AiController = t.AiController),
      (this.CharBuffComp = t.Entity.GetComponent(159)),
      (this.CharTagComp = t.Entity.GetComponent(188)),
      (this.CharStateMachineComp = t.Entity.GetComponent(67));
  }
  DrawDebugLines(t) {
    var e, i, r;
    this.CharAiDesignComp?.Valid &&
      ((r = this.AiController.CharActorComp.ActorLocationProxy),
      (e = this.AiController.AiHateList.GetCurrentTarget()),
      this.DrawPerception(r, e),
      e?.Valid) &&
      ((e = e.Entity.GetComponent(3)),
      this.DrawArrow(r, e.ActorLocationProxy, targetLinkColor),
      (e = this.AiController.AiTeam.GetAiTeamAreaMemberData(this.AiController))
        ?.IsAttacker &&
        ((i = new UE.Vector(
          r.X,
          r.Y,
          r.Z + this.AiController.CharActorComp.HalfHeight,
        )),
        UE.KismetSystemLibrary.DrawDebugBox(
          this,
          i,
          new UE.Vector(10, 10, 10),
          enemyLinkColor,
          this.AiController.CharActorComp.ActorRotation,
          0,
          DRAW_LINE_THICKNESS,
        )),
      e) &&
      0 <= e.AreaIndex &&
      ((i = Vector_1.Vector.Create(
        r.X,
        r.Y,
        r.Z - this.AiController.CharActorComp.HalfHeight + 10,
      )),
      (r =
        (e.CachedControllerYaw + e.AngleCenter) *
        MathUtils_1.MathUtils.DegToRad),
      (r = Vector_1.Vector.Create(
        e.CachedTargetLocation.X + Math.cos(r) * e.DistanceCenter,
        e.CachedTargetLocation.Y + Math.sin(r) * e.DistanceCenter,
        i.Z,
      )),
      this.DrawArrow(i, r, areaCenterColor));
  }
  DrawPerception(t, e) {
    var i,
      r,
      o = this.AiController.AiPerception;
    if (o) {
      for (const C of o.ShareAllyLink) {
        var s =
          CharacterController_1.CharacterController.GetCharacterActorComponentById(
            C,
          );
        s && this.DrawArrow(t, s.ActorLocationProxy, teamMemberLinkColor);
      }
      for (const A of o.Allies)
        o.ShareAllyLink.has(A) ||
          ((i =
            CharacterController_1.CharacterController.GetCharacterActorComponentById(
              A,
            )) &&
            this.DrawArrow(t, i.ActorLocationProxy, allyLinkColor));
      for (const d of o.AllEnemies)
        (e?.Valid && d === e.Id) ||
          ((r =
            CharacterController_1.CharacterController.GetCharacterActorComponentById(
              d,
            )) &&
            this.DrawArrow(t, r.ActorLocationProxy, enemyLinkColor));
      for (const _ of o.Neutrals) {
        var n =
          CharacterController_1.CharacterController.GetCharacterActorComponentById(
            _,
          );
        n && this.DrawArrow(t, n.ActorLocationProxy, neutralLinkColor);
      }
    }
    var h = this.AiController.CharActorComp,
      a =
        (TsAiController.TmpVector.FromUeVector(h.GetInitLocation()),
        TsAiController.TmpVector),
      l = ((a.Z -= h.HalfHeight), this.AiController.AiHateList.AiHate),
      h = h.FloorLocation;
    UE.KismetSystemLibrary.DrawDebugSphere(
      this,
      h.ToUeVector(),
      l.DisengageDistanceRange.Min,
      DEFAULT_SEGMENTS,
      minHateAreaColor,
    ),
      UE.KismetSystemLibrary.DrawDebugSphere(
        this,
        h.ToUeVector(),
        l.DisengageDistanceRange.Max,
        DEFAULT_SEGMENTS,
        maxHateAreaColor,
      ),
      UE.KismetSystemLibrary.DrawDebugSphere(
        this,
        a.ToUeVector(),
        l.DisengageBornDistance.Min,
        DEFAULT_SEGMENTS,
        minHateInitAreaColor,
      ),
      UE.KismetSystemLibrary.DrawDebugSphere(
        this,
        a.ToUeVector(),
        l.DisengageBornDistance.Max,
        DEFAULT_SEGMENTS,
        maxHateInitAreaColor,
      );
  }
  OnStart() {}
  获取控制权时() {}
  状态切换时(t, e, i) {}
  AddComplicatedEventBinder(t, e) {
    this.AiController
      ? this.AiController.AiConditionEvents.AddConditionEvent(t, e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Test", 6, "Error Call AddComplicatedEventBinder", [
          "AIC",
          this.GetName(),
        ]);
  }
  AddSceneItemDestroyEventBinder(t, e) {
    this.AiController
      ? this.AiController.AiPerceptionEvents.AddSceneItemDestroyEvent(t, e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Test",
          6,
          "Error Call AddSceneItemDestroyEventBinder",
          ["AIC", this.GetName()],
        );
  }
  AddHateEventBinder(t) {
    this.AiController?.AiPerceptionEvents.AddAiHateEvent(t);
  }
  AddPerceptionEventBinder(t) {
    this.AiController?.AiPerceptionEvents.AddAiPerceptionEvent(t, !1, !0, !1);
  }
  SetPerceptionEventState(t, e, i) {
    this.AiController?.AiPerceptionEvents.SetPerceptionEventState(t, e, i);
  }
  AddHateOutRangeEventBinder(t) {
    this.AiController?.AiPerceptionEvents.AddAiHateOutRangeEvent(t);
  }
  ActivateSkillGroup(t, e) {
    this.AiController?.AiSkill &&
      this.AiController.AiSkill.ActivateSkillGroup(t, e);
  }
  AddSkillCd(t, e) {
    this.AiController?.AiSkill && this.AiController.AiSkill.AddSkillCd(t, e);
  }
  AicApplyBuff(t) {
    this.CharBuffComp?.Valid &&
      this.CharBuffComp.AddBuffFromAi(this.AiController.AiCombatMessageId, t, {
        InstigatorId: this.CharBuffComp.CreatureDataId,
        Reason: "AIC蓝图添加buff(AicApplyBuff)",
      });
  }
  AicApplyBuffToTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 192);
    t &&
      this.CharBuffComp?.Valid &&
      t.AddBuffFromAi(this.AiController.AiCombatMessageId, e, {
        InstigatorId: this.CharBuffComp.CreatureDataId,
        Reason: "AIC蓝图添加buff(AicApplyBuffToTarget)",
      });
  }
  AicRemoveBuff(t) {
    this.CharBuffComp?.Valid &&
      this.CharBuffComp.RemoveBuff(t, -1, "AIC蓝图移除buff（AIC Remove Buff）");
  }
  AicAddTag(t) {
    this.CharTagComp?.Valid && this.CharTagComp.AddTag(t?.TagId);
  }
  AicRemoveTag(t) {
    this.CharTagComp?.Valid && this.CharTagComp.RemoveTag(t?.TagId),
      this.CharBuffComp?.Valid &&
        this.CharBuffComp.RemoveBuffByTag(t?.TagId, "AIC蓝图移除buff");
  }
  SetBattleWanderTime(t, e) {
    this.AiController.AiWanderInfos?.AiBattleWanderGroups
      ? this.AiController.AiWanderInfos.SetOverrideBattleWanderTime(t, e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("AI", 6, "没有配置战斗游荡，不能设置战斗游荡时长", [
          "AiBaseConfigId",
          this.AiController.AiBase.Id,
        ]);
  }
  SetBattleWanderIndex(t) {
    this.AiController.AiWanderInfos?.AiBattleWanderGroups
      ? t < 0 ||
        this.AiController.AiWanderInfos.AiBattleWanderGroups.length <= t
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AI",
            6,
            "设置战斗游荡组不合法",
            ["AiBaseConfigId", this.AiController.AiBase.Id],
            ["TargetIndex", t],
          )
        : (this.AiController.AiWanderInfos.CurrentBattleWanderIndex = t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("AI", 6, "没有配置战斗游荡，不能设置战斗游荡组", [
          "AiBaseConfigId",
          this.AiController.AiBase.Id,
        ]);
  }
  AddBattleWanderEndTime(t) {
    this.AiController.AiWanderInfos?.AiBattleWanderGroups
      ? (this.AiController.AiWanderInfos.BattleWanderAddTime += t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("AI", 6, "没有配置战斗游荡，不能增加游荡结束时间", [
          "AiBaseConfigId",
          this.AiController.AiBase.Id,
        ]);
  }
  SetAiSenseEnable(t, e) {
    this.AiController.AiPerception?.SetAiSenseEnable(t, e);
  }
  AddOrRemoveAiSense(t, e) {
    this.AiController.AiPerception?.AddOrRemoveAiSense(t, e);
  }
  EnableAiSenseByType(t, e) {
    this.AiController.AiPerception?.EnableAiSenseByType(t, e);
  }
  SetAiHateConfig(t) {
    this.AiController.AiHateList.AiHate = t
      ? ConfigManager_1.ConfigManager.AiConfig.LoadAiHate(Number(t))
      : ConfigManager_1.ConfigManager.AiConfig.LoadAiHateByController(
          this.AiController,
          void 0,
        );
  }
  ChangeHatred(t, e, i) {
    this.AiController.AiHateList.ChangeHatred(t, e, i);
  }
  ClearHatred(t) {
    this.AiController.AiHateList.ClearHatred(t);
  }
  AddAlertEventBinder(t) {
    this.AiController.AiAlert.CallbackEvent = t;
  }
  SetAiAlertConfig(t) {
    this.AiController.AiAlert.AiAlertConfig = t
      ? ConfigManager_1.ConfigManager.AiConfig.LoadAiAlert(t)
      : ConfigManager_1.ConfigManager.AiConfig.LoadAiAlert(
          this.AiController.AiBase.SubBehaviorConfigs.get("AiAlert"),
        );
  }
  SetAiEnable(t, e) {
    e = "TsAiController_" + e;
    t ? this.CharAiDesignComp.EnableAi(e) : this.CharAiDesignComp.DisableAi(e);
  }
  TestChangeAi(t) {
    this.CharAiDesignComp.LoadAiConfigs(Number(t));
  }
  LogReport(t) {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("BehaviorTree", 9, "埋点废弃,请删除相关配置");
  }
  逻辑主控() {
    return this.AiController.CharActorComp.IsAutonomousProxy;
  }
  移动主控() {
    return this.AiController.CharActorComp.IsMoveAutonomousProxy;
  }
  检查状态机状态(t) {
    return !1;
  }
  切换状态机状态(t) {}
  GetCoolDownDone(t) {
    return 0 === this.AiController.GetCoolDownRemainTime(t);
  }
  GetCoolDownRemainTime(t) {
    return this.AiController.GetCoolDownRemainTime(t);
  }
  SetCoolDown(t, e) {
    var i = ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? Time_1.Time.ServerTimeStamp
      : Time_1.Time.WorldTime;
    this.AiController.SetCoolDownTime(t, i + e, !0, "蓝图");
  }
  InitCooldownEvent(t, e) {
    this.AiController.InitCooldownTimer(t, e);
  }
  StartCooldownTimer(t, e) {
    var i = ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? Time_1.Time.ServerTimeStamp
      : Time_1.Time.WorldTime;
    this.AiController.SetCoolDownTime(t, i + e, !0, "蓝图AIC延迟节点");
  }
  GetDebugStateMachine(t) {
    this.CharStateMachineComp?.StateMachineGroup?.RequestServerDebugInfo();
    var e = this.CharStateMachineComp?.StateMachineGroup?.ToString(),
      i = (0, puerts_1.$unref)(t);
    if (e) for (const r of e) i.Add(r);
  }
  GetDebugText() {
    return `激活的技能组：
 ${JSON.stringify([...this.AiController.AiSkill.ActiveSkillGroup])}
技能CD：${this.AiController.AiSkill.GetCdDebugString()}
战斗游荡组：${this.AiController.AiWanderInfos?.CurrentBattleWanderIndex}
仇恨：
${this.AiController.AiHateList.GetHatredMapDebugText()}
团队AI：
逻辑主控：${this.AiController.CharActorComp.IsAutonomousProxy}
移动主控：${this.AiController.CharActorComp.IsMoveAutonomousProxy}
等待切换主控：${this.AiController.IsWaitingSwitchControl()}
感知：${this.AiController.AiPerception?.GetEnableAiSenseDebug()}
怪物仇恨组： ${this.AiController.HatredGroupId}
部位血量: ${this.CharBuffComp?.Entity?.GetComponent(60)?.GetDebugText()}
集群Id：${this.AiController.GetTeamLevelId()}
`;
  }
  ReceiveDestroyed() {
    ObjectUtils_1.ObjectUtils.IsValid(this) &&
      (this.Clear(), super.ReceiveDestroyed());
  }
  Clear() {
    (this.CharAiDesignComp = void 0),
      (this.CharBuffComp = void 0),
      (this.CharTagComp = void 0),
      (this.AiController = void 0),
      (this.BehaviorTree = void 0),
      (this.CharStateMachineComp = void 0);
  }
  DrawArrow(t, e, i) {
    e.Subtraction(t, TsAiController.TmpVector);
    e = TsAiController.TmpVector.Size();
    TsAiController.TmpVector.MultiplyEqual((e - ARROW_LENGTH_SUB) / e),
      TsAiController.TmpVector.AdditionEqual(t),
      UE.KismetSystemLibrary.DrawDebugArrow(
        this,
        t.ToUeVector(),
        TsAiController.TmpVector.ToUeVector(),
        DRAW_ARROW_SIZE,
        i,
        0,
        DRAW_LINE_THICKNESS,
      );
  }
}
(TsAiController.TmpVector = Vector_1.Vector.Create()),
  (TsAiController.StatSetAiHateConfig = void 0),
  (exports.default = TsAiController);
//# sourceMappingURL=TsAiController.js.map
