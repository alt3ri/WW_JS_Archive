"use strict";
var BaseSkillComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var l,
        o = arguments.length,
        n =
          o < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, i, e, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (l = t[r]) &&
            (n = (o < 3 ? l(n) : 3 < o ? l(i, e, n) : l(i, e)) || n);
      return 3 < o && n && Object.defineProperty(i, e, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseSkillComponent = exports.SKILL_GROUP_MAIN = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../../../../Core/Entity/Entity"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
  SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController"),
  SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController"),
  PreloadDefine_1 = require("../../../../../Preload/PreloadDefine"),
  ActorUtils_1 = require("../../../../../Utils/ActorUtils"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  GravityUtils_1 = require("../../../../../Utils/GravityUtils"),
  BlackboardController_1 = require("../../../../../World/Controller/BlackboardController"),
  BaseAbilityComponent_1 = require("../Abilities/BaseAbilityComponent"),
  CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds"),
  Skill_1 = require("./Skill"),
  SkillBehaviorAction_1 = require("./SkillBehavior/SkillBehaviorAction"),
  SkillBehaviorCondition_1 = require("./SkillBehavior/SkillBehaviorCondition");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const HIT_CASE_SOCKET_NAME = "HitCase",
  SKILL_GROUP_INDEX = ((exports.SKILL_GROUP_MAIN = 1), 0),
  interruptTag = -242791826,
  NEXT_BEGIN_SKILL_NAME = ".NextFrame";
class AnimNotifyStateSkillRotateStyle {
  constructor() {
    (this.IsUseAnsRotateOffset = !1),
      (this.AnsRotateOffset = 0),
      (this.PauseRotateThreshold = 0),
      (this.ResumeRotateThreshold = 0),
      (this.IsPaused = !1);
  }
  Reset() {
    (this.IsUseAnsRotateOffset = !1),
      (this.AnsRotateOffset = 0),
      (this.PauseRotateThreshold = 0),
      (this.ResumeRotateThreshold = 0),
      (this.IsPaused = !1);
  }
}
class SkillRotateTarget {
  constructor() {
    (this.Target = void 0), (this.Type = 0);
  }
}
let BaseSkillComponent =
  (BaseSkillComponent_1 = class BaseSkillComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.cn_ = new Map()),
        (this.sZr = !1),
        (this.LoadedSkills = new Map()),
        (this.aZr = new Map()),
        (this.hZr = new Set()),
        (this.Cn_ = !1),
        (this.StartOnGivenList = []),
        (this.cel = []),
        (this.lZr = void 0),
        (this._Zr = void 0),
        (this.w6a = new Map()),
        (this.DtSkillInfoExtraList = void 0),
        (this.DtSkillInfoMapForDebug = new Map()),
        (this.DtBulletInfo = void 0),
        (this.DtBulletInfoExtraList = void 0),
        (this.DtHitEffect = void 0),
        (this.DtHitEffectExtraList = void 0),
        (this.EIe = void 0),
        (this.Bzr = void 0),
        (this.TagComp = void 0),
        (this.BuffComp = void 0),
        (this.AbilityComp = void 0),
        (this.ActorComp = void 0),
        (this.uZr = void 0),
        (this.LockOnComp = void 0),
        (this.mZr = void 0),
        (this.bre = void 0),
        (this.vHr = void 0),
        (this.dZr = void 0),
        (this.FightStateComp = void 0),
        (this.StateMachineComp = void 0),
        (this.MontageComp = void 0),
        (this.qk_ = void 0),
        (this.oxr = Vector_1.Vector.Create()),
        (this.TmpVector = Vector_1.Vector.Create()),
        (this.TmpRotator = Rotator_1.Rotator.Create()),
        (this.TmpTransform = Transform_1.Transform.Create()),
        (this.CZr = (t) => {
          this.SkillTarget?.Id === t.Id && (this.SkillTarget = void 0);
        }),
        (this.bpr = (t) => {
          (this.SkillTarget = void 0),
            (this.SkillTargetSocket = ""),
            this.EIe?.IsRole() &&
              this.ActorComp.IsAutonomousProxy &&
              ((t &&
                !ModelManager_1.ModelManager.LevelLoadingModel?.IsLoading) ||
                this.StopAllSkills("BaseSkillComponent.OnTeleportStart"));
        }),
        (this.Oul = () => {
          this.EIe?.IsRole() &&
            this.ActorComp.IsAutonomousProxy &&
            this.StopAllSkills("BaseSkillComponent.OnTeleportOpenLoadingEnd");
        }),
        (this.gZr = () => {
          this.StopGroup1Skill("受击打断技能");
        }),
        (this.OnSwitchControl = (t) => {
          for (var [i, e] of this.LoadedSkills)
            e.Active &&
              (CombatLog_1.CombatLog.Info(
                "Skill",
                this.Entity,
                "切换控制权，结束当前技能",
                ["技能Id", i],
              ),
              e.IsSimulated
                ? this.SimulateEndSkill(i)
                : this.EndSkill(i, "BaseSkillComponent.OnSwitchControl"));
        }),
        (this.vZr = !1),
        (this.IsMainSkillReadyEnd = !0),
        (this.SkillTarget = void 0),
        (this.SkillTargetSocket = ""),
        (this.MZr = (t) => {
          var i = this.CurrentSkill;
          i &&
            i.SkillInfo.SkillTarget.HateOrLockOnChanged &&
            ((this.SkillTarget =
              ModelManager_1.ModelManager.CharacterModel.GetHandle(t)),
            (this.SkillTargetSocket = ""));
        }),
        (this.ZXr = (t) => {
          this.SkillTarget?.Id === t && this.AUn();
        }),
        (this.zpe = (t, i) => {
          this.SkillTarget === i && this.AUn();
        }),
        (this.I3r = (t) => {
          t = t.GetComponent(38);
          (this.SkillTarget = t.SkillTarget),
            (this.SkillTargetSocket = t.SkillTargetSocket);
        }),
        (this.Vma = () => {
          this.StopGroup1Skill("电梯开始移动");
        }),
        (this.SkillCanRotateInternal = !1),
        (this.SZr = void 0),
        (this.SkillRotateSpeedInternal = 0),
        (this.IZr = void 0),
        (this.SkillRotateToTargetInternal = !1),
        (this.IgnoreSocketName = new Set()),
        (this.UZr = 0),
        (this.cBn = new Map());
    }
    Vh_(t) {
      t = this.GetSkillInfo(t);
      return this.Cn_ && t?.GroupId === exports.SKILL_GROUP_MAIN;
    }
    jh_(t, i) {
      this.GetSkillInfo(t)?.GroupId === exports.SKILL_GROUP_MAIN &&
        (this.Cn_ = i);
    }
    get CurrentSkill() {
      return this.aZr.get(exports.SKILL_GROUP_MAIN)?.[SKILL_GROUP_INDEX];
    }
    get DtSkillInfo() {
      return this._Zr;
    }
    set DtSkillInfo(t) {
      this._Zr = t;
    }
    GetSkillIdByName(t) {
      return this.w6a.get(t);
    }
    IsSkillMontageInvalid(t) {
      t = this.MontageComp?.GetMontageInfo(t);
      return !!t && (t.SkillId ?? 0) !== (this.CurrentSkill?.SkillId ?? 0);
    }
    GetSkillInfo(e) {
      if (this._Zr && 0 !== e) {
        if (!GlobalData_1.GlobalData.IsPlayInEditor) {
          var s = this.LoadedSkills.get(e);
          if (s) return s.SkillInfo;
        }
        var l = e.toString();
        let i = DataTableUtil_1.DataTableUtil.GetDataTableRow(this._Zr, l);
        if (!i && this.DtSkillInfoExtraList)
          for (const t of this.DtSkillInfoExtraList)
            if ((i = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, l)))
              break;
        if (!i) {
          let t = void 0;
          var s = this.EIe.GetEntityType();
          s === Protocol_1.Aki.Protocol.kks.Proto_Player
            ? (t =
                ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillInfo())
            : s === Protocol_1.Aki.Protocol.kks.Proto_Vision &&
              (t =
                ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillInfo()),
            t && (i = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, l));
        }
        return (
          i ||
            this.EIe.CustomServerEntityIds.forEach((t) => {
              t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
              t && (i = t.Entity?.GetComponent(38)?.GetSkillInfo(e));
            }),
          i ||
            ((s = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              this.EIe.VisionSkillServerEntityId,
            )) &&
              (i = s.Entity?.GetComponent(38)?.GetSkillInfo(e))),
          i ||
            (this.EIe.VisionControlCreatureDataId &&
              (s = ModelManager_1.ModelManager.CreatureModel.GetEntity(
                this.EIe.VisionControlCreatureDataId,
              )) &&
              (i = s.Entity?.GetComponent(38)?.GetSkillInfo(e))),
          i
        );
      }
    }
    GetSkill(t) {
      return this.LoadedSkills.get(t);
    }
    GetSkillMap() {
      return this.LoadedSkills;
    }
    GetPriority(t) {
      if (this.CheckIsLoaded()) {
        var i = this.GetSkill(t);
        if (i) return i.InterruptLevel;
        i = this.GetSkillInfo(t);
        if (i) return i.InterruptLevel;
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Character",
            22,
            "没有该技能的打断等级",
            ["玩家id", this.Entity.Id],
            ["skillID", t],
          );
      }
      return -1;
    }
    OnInitData() {
      return (
        (this.SZr = new AnimNotifyStateSkillRotateStyle()),
        (this.IZr = new SkillRotateTarget()),
        (this.EIe = this.Entity.CheckGetComponent(0)),
        (this.ActorComp = this.Entity.CheckGetComponent(1)),
        !0
      );
    }
    OnStart() {
      return (
        this.wZr(),
        this.BZr(),
        (this.sZr = !0),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnEndPlay,
          this.CZr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.ZXr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.TeleportStart,
          this.bpr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.TeleportOpenLoadingEnd,
          this.Oul,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim,
          this.gZr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharSwitchControl,
          this.OnSwitchControl,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.AiHateTargetChanged,
          this.MZr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.I3r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.ElevatorMove,
          this.Vma,
        ),
        !0
      );
    }
    OnInit() {
      return (
        (this.Bzr = this.Entity.CheckGetComponent(170)),
        (this.TagComp = this.Entity.CheckGetComponent(203)),
        (this.AbilityComp = this.Entity.CheckGetComponent(17)),
        (this.BuffComp = this.Entity.GetComponent(172)),
        (this.uZr = this.Entity.GetComponent(16)),
        (this.LockOnComp = this.Entity.GetComponent(32)),
        (this.bre = this.Entity.GetComponent(46)),
        (this.mZr = this.Entity.GetComponent(93)),
        (this.vHr = this.Entity.GetComponent(120)),
        (this.dZr = this.Entity.GetComponent(205)),
        (this.FightStateComp = this.Entity.GetComponent(54)),
        (this.StateMachineComp = this.Entity.GetComponent(75)),
        (this.MontageComp = this.Entity.GetComponent(24)),
        (this.qk_ = this.Entity.GetComponent(216)),
        !0
      );
    }
    OnDisable(t) {
      this.StopGroup1Skill(t);
    }
    OnTick(t) {
      var i = this.cel.shift();
      i?.NextSkillId && this.BeginSkill(i?.NextSkillId, i);
    }
    CheckIsLoaded() {
      return (
        this.sZr ||
          CombatLog_1.CombatLog.Info(
            "Skill",
            this.Entity,
            "SkillComponent没有Activate或已经End",
          ),
        this.sZr
      );
    }
    wZr() {
      this.qk_.PreloadSkillIds.forEach((t) => {
        var i = this.GetSkillInfo(t);
        i && this.OZr(t, i);
      });
      for (const i of this.GetAllSkillData(5)) {
        var t = this.GetSkillInfo(i);
        t && this.w6a.set(t.SkillName.toString(), i);
      }
    }
    OZr(i, e) {
      if (!this.LoadedSkills.has(i))
        try {
          var t = new Skill_1.Skill();
          this.LoadedSkills.set(i, t), t.Initialize(i, e, this);
        } catch (t) {
          t instanceof Error
            ? CombatLog_1.CombatLog.ErrorWithStack(
                "Skill",
                this.Entity,
                "加载技能异常",
                t,
                ["skillId", i],
                ["skillId", e?.SkillName],
                ["error", t.message],
              )
            : CombatLog_1.CombatLog.Error(
                "Skill",
                this.Entity,
                "加载技能异常",
                ["skillId", i],
                ["skillId", e?.SkillName],
                ["error", t],
              );
        }
    }
    BZr() {
      ConfigManager_1.ConfigManager.BulletConfig.PreloadBulletData(this.Entity);
    }
    OnActivate() {
      var t,
        i,
        e = this.EIe.ComponentDataMap.get("Vys")?.Vys;
      if (!this.ActorComp.IsAutonomousProxy && e?.YIs)
        for (const l of e.YIs)
          l.dVn?.r5n &&
            ((i = MathUtils_1.MathUtils.LongToNumber(l.dVn.CVn)),
            (t = MathUtils_1.MathUtils.LongToBigInt(l.$8n)),
            this.SimulatedBeginSkill(
              l.dVn.r5n,
              i,
              l.dVn.gVn,
              0.001 * l.dVn.n5n,
              t,
            )) &&
            (SkillMessageController_1.SkillMessageController.AddSkillMessageId(
              t,
            ),
            0 <= l.lVn) &&
            ((i = MathUtils_1.MathUtils.LongToBigInt(l.hVn)),
            this.SimulatePlayMontage(
              l.dVn.r5n,
              l.lVn,
              l.vVn,
              l.XIs,
              l.QIs / 1e3,
              i,
            ));
      for (const o of this.StartOnGivenList) {
        var s = this.LoadedSkills.get(o);
        s &&
          ((s = s.AbilityClass)?.IsChildOf(UE.Ga_Passive_C.StaticClass())
            ? this.AbilityComp.TryActivateAbilityByClass(s, !1)
            : this.BeginSkill(o, {
                Reason: "BaseSkillComponent.StartOnGivenList",
              }));
      }
      return !(this.StartOnGivenList.length = 0);
    }
    OnChangeTimeDilation(t) {
      var i = this.vHr.CurrentTimeScale;
      for (const e of this.GetAllActivatedSkill()) e.SetTimeDilation(i, t);
    }
    OnEnd() {
      if (
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnEndPlay,
          this.CZr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.ZXr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.TeleportStart,
          this.bpr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.TeleportOpenLoadingEnd,
          this.Oul,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim,
          this.gZr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharSwitchControl,
          this.OnSwitchControl,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.AiHateTargetChanged,
          this.MZr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.I3r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.ElevatorMove,
          this.Vma,
        ),
        this.IgnoreSocketName.clear(),
        this.SZr.Reset(),
        this.LoadedSkills)
      )
        for (const t of this.LoadedSkills.values()) t.Clear();
      return (
        this.LoadedSkills.clear(),
        (this.vZr = !1),
        (this.IsMainSkillReadyEnd = !0),
        (this.SkillCanRotateInternal = !1),
        (this.SkillRotateToTargetInternal = !1),
        (this.SkillRotateSpeedInternal = 0),
        (this.UZr = 0),
        !(this.sZr = !1)
      );
    }
    OnClear() {
      return !0;
    }
    AttachEffectToSkill(t, i, e, s) {
      var l, o;
      this.CheckIsLoaded() &&
        (l = this.CurrentSkill) &&
        ((o = this.vHr.CurrentTimeScale),
        EffectSystem_1.EffectSystem.SetTimeScale(t, o * this.TimeDilation, !0),
        l.AttachEffect(t, i, e, s));
    }
    kZr(t) {
      let i = 1;
      return (i =
        this.Bzr &&
        (0 === (t = t.SkillInfo).SkillGenre
          ? (i =
              1e-4 *
              this.Bzr.GetCurrentValue(EAttributeId.Proto_AutoAttackSpeed))
          : 1 === t.SkillGenre &&
            (i =
              1e-4 *
              this.Bzr.GetCurrentValue(EAttributeId.Proto_CastAttackSpeed)),
        i <= 0)
          ? 1
          : i);
    }
    PlaySkillMontage(t, i, e, s) {
      var l = this.CurrentSkill;
      if (!l)
        return (
          CombatLog_1.CombatLog.Error(
            "Skill",
            this.Entity,
            "播放技能蒙太奇时，当前技能不存在",
            ["montageIndex", t],
          ),
          !1
        );
      if (l.IsSimulated)
        return (
          CombatLog_1.CombatLog.Error(
            "Skill",
            this.Entity,
            "播放技能蒙太奇时，当前技能是模拟技能",
            ["montageIndex", t],
          ),
          !1
        );
      this.OnBeforePlaySkillMontage();
      var o = this.kZr(l),
        s = l.PlayMontage(t, o, i, e, s);
      return (
        s &&
          SkillMessageController_1.SkillMessageController.MontageRequest(
            this.Entity,
            1,
            l.SkillId?.toString(),
            this.SkillTarget?.Id ?? 0,
            t,
            o,
            i,
            e,
            l.LFc,
            l.MontageContextId,
          ),
        s
      );
    }
    PlaySkillMontageWithEndAbility(i, t, e) {
      const s = this.CurrentSkill;
      return (
        !!s &&
        (s.CurrentMontageIndex === i
          ? (CombatLog_1.CombatLog.Error(
              "Skill",
              this.Entity,
              "不能跳转同一个蒙太奇",
              ["技能Id", s.SkillId],
              ["技能名", s.SkillName],
              ["MontageIndex", i],
            ),
            !1)
          : 0 !== s.SkillInfo?.SkillMode
            ? (CombatLog_1.CombatLog.Error(
                "Skill",
                this.Entity,
                "非Simple技能不能跳转蒙太奇",
                ["技能Id", s.SkillId],
                ["技能名", s.SkillName],
                ["MontageIndex", i],
              ),
              !1)
            : this.PlaySkillMontage(i, t, e, (t) => {
                s.CurrentMontageIndex === i && this.DoSkillEnd(s);
              }))
      );
    }
    EndOwnerAndFollowSkills() {
      this.StopAllSkills("BaseSkillComponent.EndOwnerAndFollowSkills");
      var t = this.Entity.GetComponent(55)?.FollowIds;
      if (t)
        for (const e of t) {
          var i = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(38);
          i && i.StopAllSkills("BaseSkillComponent.EndOwnerAndFollowSkills");
        }
    }
    StopAllSkills(t) {
      if (this.CheckIsLoaded()) {
        this.cel.length = 0;
        for (const i of this.GetAllActivatedSkill()) this.FZr(i, t);
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharStopAllSkills,
          this.Entity.Id,
          t,
        );
      }
    }
    StopGroup1Skill(i) {
      if (this.CheckIsLoaded()) {
        let t = this.cel.length;
        for (; t--; ) {
          var e = this.cel[t];
          this.GetSkillInfo(e.NextSkillId).GroupId ===
            exports.SKILL_GROUP_MAIN && this.cel.splice(t, 1);
        }
        var s = this.CurrentSkill;
        s && this.FZr(s, i),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CharStopGroup1Skill,
            this.Entity.Id,
            i,
          );
      }
    }
    EndSkill(t, i) {
      this.CheckIsLoaded() &&
        (t = this.LoadedSkills.get(t))?.Active &&
        this.VZr(t, i);
    }
    HZr(t, i, e) {
      var s = t.SkillInfo.GroupId,
        l = t.InterruptLevel;
      return this.DoCheckInterrupt(s, l, i, e, t);
    }
    DoCheckInterrupt(t, i, e = [], s = [], l) {
      let o = !0;
      if (t === exports.SKILL_GROUP_MAIN) {
        var n,
          r,
          h,
          a = this.CurrentSkill;
        a &&
          ((S = a.InterruptLevel < i),
          (n = a.InterruptLevel === i && this.vZr),
          (r = this.IsMainSkillReadyEnd),
          (h = ModelManager_1.ModelManager.SkillCdModel?.SkillDebugMode ?? !1),
          S || n || r || h
            ? e.push(a)
            : ((o = !1),
              s.push(a.InterruptLevel.toString()),
              s.push(i.toString()),
              s.push(this.vZr.toString()),
              s.push(this.IsMainSkillReadyEnd.toString())));
      } else {
        var S = this.aZr.get(t);
        if (S)
          for (const _ of S) {
            if (this.IsSkillInCd(_.SkillId)) {
              (o = !1), s.push(`技能${_.SkillId}处于CD中`);
              break;
            }
            _ === l && e.push(_);
          }
      }
      return o || (e.length = 0), o;
    }
    FZr(t, i) {
      t?.Active &&
        (t.IsSimulated
          ? this.SimulateEndSkill(t.SkillId)
          : (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CharInterruptSkill,
              this.Entity.Id,
              t.SkillId,
            ),
            this.VZr(t, i)));
    }
    VZr(t, i) {
      BaseSkillComponent_1.Zzr.Start(),
        CombatLog_1.CombatLog.Info(
          "Skill",
          this.Entity,
          "BaseSkillComponent.RequestEndSkill",
          ["结束技能ID", t.SkillId],
          ["结束技能名称", t.SkillName],
          ["Reason", i],
          ["CanInterrupt", this.vZr],
          ["ReadyEnd", this.IsMainSkillReadyEnd],
          ["InterruptLevel", t.InterruptLevel],
        ),
        this.dZr?.ResetMultiSkills(t.SkillId),
        this.dZr?.ResetCdDelayTime(t.SkillId);
      i = t.SkillInfo.SkillMode;
      1 === i
        ? t.ActiveAbility?.IsValid()
          ? t.ActiveAbility.K2_EndAbility()
          : CombatLog_1.CombatLog.Error(
              "Skill",
              this.Entity,
              "[BaseSkillComponent.RequestEndSkill]技能结束失败，找不到GA（判断一下是否被动GA，如果是，不能主动执行）",
              ["技能ID", t.SkillId],
              ["技能名称", t.SkillName],
            )
        : 0 === i && t.RequestStopMontage(!0),
        BaseSkillComponent_1.Zzr.Stop();
    }
    IsSkillGenreForbidden(t) {
      switch (t.SkillGenre) {
        case 0:
          return this.TagComp.HasTag(866007727);
        case 1:
          return this.TagComp.HasTag(443489183);
        case 2:
          return this.TagComp.HasTag(495657548);
        case 3:
          return this.TagComp.HasTag(-592555498);
        case 4:
          return this.TagComp.HasTag(-373980873);
        case 5:
          break;
        case 6:
          return this.TagComp.HasTag(-1390464883);
        case 7:
          return this.TagComp.HasTag(1072084846);
        case 8:
          break;
        case 9:
          return this.TagComp.HasTag(1195493782);
        case 10:
          return this.TagComp.HasTag(283451623);
        case 11:
          return this.TagComp.HasTag(-1936884442);
      }
      return !1;
    }
    WZr(t, i) {
      var e,
        s,
        l = t.SkillInfo;
      return this.ActorComp.IsAutonomousProxy || l.AutonomouslyBySimulate
        ? this.TagComp.HasTag(-1388400236) &&
          !l.SkillCanBeginWithoutControl &&
          l.GroupId === exports.SKILL_GROUP_MAIN
          ? "角色处于不可控制状态"
          : this.TagComp.HasTag(1008164187)
            ? "角色处于死亡状态"
            : this.uZr?.IsFrozen() && l.GroupId === exports.SKILL_GROUP_MAIN
              ? "角色处于冰冻状态"
              : this.IsSkillGenreForbidden(l)
                ? "该类别技能被临时禁止"
                : t.AbilityClass &&
                    t.AbilityClass.IsChildOf(UE.Ga_Passive_C.StaticClass()) &&
                    !ModelManager_1.ModelManager.SkillCdModel?.SkillDebugMode
                  ? "策划可能误把被动GA放在普攻0技能组里"
                  : this.IsSkillInCd(t.SkillId)
                    ? "技能处于CD中"
                    : 0 !== l.StrengthCost &&
                        FormationAttributeController_1.FormationAttributeController.GetValue(
                          1,
                        ) <= 1
                      ? "体力不足"
                      : this.dZr?.IsMultiSkill(l) &&
                          !this.dZr.CanStartMultiSkill(t)
                        ? "多段技能启动失败"
                        : ((s = this.EIe.GetEntityType()),
                          (e =
                            this.bre?.AiController?.IsWaitingSwitchControl()),
                          s === Protocol_1.Aki.Protocol.kks.Proto_Monster &&
                          !l.AutonomouslyBySimulate &&
                          e
                            ? "在等待切换控制权期间，不允许释放普通技能"
                            : this.HZr(t, i, (s = []))
                              ? ""
                              : "技能打断失败[" + s.join(",") + "]")
        : "非主控无权限释放技能";
    }
    KZr(t) {
      if (
        !this.LoadedSkills.has(t) &&
        PreloadDefine_1.PreloadSetting.UseNewPreload
      ) {
        this.qk_.LoadSkillAsync(t), this.qk_.FlushSkill(t);
        var i = this.GetSkillInfo(t);
        if (!i) return;
        this.OZr(t, i),
          CombatLog_1.CombatLog.Info(
            "Skill",
            this.Entity,
            "BaseSkillComponent.赋予技能",
            ["技能Id", t],
            ["技能名", i.SkillName.toString()],
          );
      }
      return this.LoadedSkills.get(t);
    }
    BeginSkillNextFrame(t, i = {}) {
      (i.NextSkillId = t),
        (i.Reason = i.Reason + NEXT_BEGIN_SKILL_NAME),
        this.cel.push(i);
    }
    BeginSkill(t, i = {}) {
      BaseSkillComponent_1.Ozr.Start(), this.un_(t).Start();
      i = this.dn_(t, i);
      return this.un_(t).Stop(), BaseSkillComponent_1.Ozr.Stop(), i;
    }
    dn_(t, i = {}) {
      if ((BaseSkillComponent_1.kzr.Start(), !this.CheckIsLoaded()))
        return BaseSkillComponent_1.kzr.Stop(), !1;
      var e = this.LoadedSkills.has(t),
        s = this.KZr(t);
      if (!s)
        return (
          CombatLog_1.CombatLog.Error(
            "Skill",
            this.Entity,
            "BeginSkill使用了不存在的技能",
            ["技能Id", t],
          ),
          BaseSkillComponent_1.kzr.Stop(),
          !1
        );
      if (this.Vh_(t))
        return (
          CombatLog_1.CombatLog.Error(
            "Skill",
            this.Entity,
            "技能打断的过程中不能新开技能",
            ["技能Id", t],
            ["技能名", s.SkillName],
            ["原因", i.Reason],
          ),
          !1
        );
      CombatLog_1.CombatLog.Info(
        "Skill",
        this.Entity,
        "BaseSkillComponent.BeginSkill",
        ["技能Id", t],
        ["技能名", s.SkillName],
        [
          "技能目标",
          (i.Target instanceof Entity_1.Entity
            ? i.Target.GetComponent(1)?.Owner
            : i.Target
          )?.GetName(),
        ],
        ["已加载", e],
        ["原因", i.Reason],
      );
      var l = [],
        o = this.WZr(s, l);
      if (o)
        return (
          CombatLog_1.CombatLog.Info(
            "Skill",
            this.Entity,
            "BaseSkillComponent.CheckSkillCanBegin条件不满足",
            ["技能Id", t],
            ["技能名", s.SkillName],
            ["当前技能", this.CurrentSkill?.SkillId],
            ["当前技能名", this.CurrentSkill?.SkillName],
            ["原因", o],
          ),
          BaseSkillComponent_1.kzr.Stop(),
          !1
        );
      BaseSkillComponent_1.kzr.Stop(),
        BaseSkillComponent_1.Fzr.Start(),
        this.jh_(t, !0),
        l.forEach((t) => {
          (t.EndSkillInfo.Reason =
            Protocol_1.Aki.Protocol.rR_.Proto_EEndSkillReason_BeginOtherSkill),
            this.FZr(t, "开始新技能");
        }),
        this.jh_(t, !1);
      o = this.GetSkillInfo(t);
      if (e || i.ForbidNext || 1 !== o.SkillMode) {
        BaseSkillComponent_1.Fzr.Stop(), BaseSkillComponent_1.Vzr.Start();
        (l = this.ActorComp?.IsAutonomousProxy ?? !1),
          (e = this.StateMachineComp?.StateMachineGroup?.IsCurrentTaskSkill(t));
        if (
          this.FightStateComp &&
          o.GroupId === exports.SKILL_GROUP_MAIN &&
          !e
        ) {
          e = this.FightStateComp.TrySwitchSkillState(
            s.InterruptLevel,
            s.SkillInfo,
            !0,
          );
          if (!e)
            return (
              CombatLog_1.CombatLog.Info(
                "Skill",
                this.Entity,
                "技能释放失败，状态不满足",
                ["技能Id", t],
                ["技能名", s.SkillName],
              ),
              BaseSkillComponent_1.Vzr.Stop(),
              !1
            );
          s.FightStateHandle = e;
        } else s.FightStateHandle = 0;
        switch (
          (BaseSkillComponent_1.Vzr.Stop(),
          BaseSkillComponent_1.Hzr.Start(),
          this.QZr(i.Target, i.SocketName, o.SkillTarget, o.IsLockOn),
          (s.PreContextId = i.ContextId),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharBeforeSkillWithTarget,
            t,
            l,
          ),
          BaseSkillComponent_1.Hzr.Stop(),
          BaseSkillComponent_1.jzr.Start(),
          o.SkillMode)
        ) {
          case 1:
            if (
              ((this.lZr = s),
              this.AbilityComp.TryActivateAbilityByClass(s.AbilityClass, !0))
            )
              break;
            return (
              CombatLog_1.CombatLog.Error(
                "Skill",
                this.Entity,
                "执行GA失败!",
                ["技能Id", s.SkillId],
                ["技能名", s.SkillName],
                ["GaClass", s.AbilityClass?.GetName()],
              ),
              (this.lZr = void 0),
              (this.SkillTarget = void 0),
              (this.SkillTargetSocket = ""),
              this.FightStateComp?.ExitState(s.FightStateHandle),
              BaseSkillComponent_1.jzr.Stop(),
              !1
            );
          case 0:
            this.XZr(s),
              s.HasMontages
                ? s.CurrentMontageIndex === Skill_1.MONTAGE_DEFAULT_INDEX &&
                  this.PlaySkillMontageWithEndAbility(0, "", 0)
                : this.DoSkillEnd(s);
        }
        BaseSkillComponent_1.jzr.Stop(),
          BaseSkillComponent_1.nva.Start(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CharUseSkill,
            this.Entity.Id,
            s.SkillId,
            l,
          ),
          SceneTeamController_1.SceneTeamController.EmitEvent(
            this.Entity,
            EventDefine_1.EEventName.CharUseSkill,
            this.Entity.Id,
            s.SkillId,
            l,
          ),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharRecordOperate,
            this.SkillTarget,
            s.SkillId,
            o.SkillGenre,
          ),
          this.BuffComp?.TriggerEvents(2, this.BuffComp, {
            SkillId: Number(s.SkillId),
            SkillGenre: o.SkillGenre,
          }),
          BaseSkillComponent_1.nva.Stop();
      } else this.BeginSkillNextFrame(t, i), BaseSkillComponent_1.Fzr.Stop();
      return !0;
    }
    SimulatedBeginSkill(t, i, e = !1, s = 0, l = BigInt(0)) {
      if (this.ActorComp.IsAutonomousProxy && this.EIe?.IsRole())
        return (
          CombatLog_1.CombatLog.Warn(
            "Skill",
            this.Entity,
            "主控角色不能模拟开始技能",
            ["技能Id", t],
          ),
          !1
        );
      var o = this.KZr(t);
      if (!o)
        return (
          CombatLog_1.CombatLog.Error(
            "Skill",
            this.Entity,
            "远端释放不存在的技能",
            ["技能Id", t],
          ),
          !1
        );
      if (
        o.AbilityClass &&
        o.AbilityClass.IsChildOf(UE.Ga_Passive_C.StaticClass())
      )
        return (
          CombatLog_1.CombatLog.Warn("Skill", this.Entity, "被动技能不模拟", [
            "技能Id",
            t,
          ]),
          !1
        );
      o.Active &&
        o.IsSimulated &&
        CombatLog_1.CombatLog.Warn("Skill", this.Entity, "重复释放远端技能", [
          "技能Id",
          t,
        ]);
      var n = o.SkillInfo,
        r = this.StateMachineComp?.StateMachineGroup?.IsCurrentTaskSkill(t);
      if (
        this.FightStateComp &&
        o.SkillInfo.GroupId === exports.SKILL_GROUP_MAIN &&
        !r
      ) {
        r = this.FightStateComp.TrySwitchSkillState(
          o.InterruptLevel,
          o.SkillInfo,
          !1,
        );
        if (!r) return !1;
        o.FightStateHandle = r;
      } else o.FightStateHandle = 0;
      return (
        CombatLog_1.CombatLog.Info(
          "Skill",
          this.Entity,
          "执行远端技能",
          ["技能Id", t],
          ["技能名", o.SkillName],
          ["特殊技能", e],
          ["打断等级", o.InterruptLevel],
        ),
        e &&
          (this.CurrentSkill && this.FZr(this.CurrentSkill, "远端特殊技能"),
          this.ActorComp.SetMoveControlled(!1, s, "远端特殊技能")),
        this.Entity.GetComponent(173).ExitHitState("远端释放技能"),
        SceneTeamController_1.SceneTeamController.EmitEvent(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkillRemote,
          this.Entity.Id,
          o.SkillId,
        ),
        this.YZr(n.GroupId, o),
        o.SimulatedBeginSkill(l),
        (this.IsMainSkillReadyEnd = !1),
        (this.SkillTarget =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(i)),
        !0
      );
    }
    SimulateEndSkill(t) {
      var i;
      this.ActorComp.IsAutonomousProxy && this.EIe?.IsRole()
        ? CombatLog_1.CombatLog.Warn(
            "Skill",
            this.Entity,
            "主控角色不能模拟结束技能",
            ["技能Id", t],
          )
        : (i = this.LoadedSkills.get(t))
          ? i.Active && i.IsSimulated
            ? (CombatLog_1.CombatLog.Info(
                "Skill",
                this.Entity,
                "结束远端技能",
                ["技能Id", t],
                ["技能名", i.SkillName],
              ),
              this.JZr(i.SkillInfo.GroupId, i),
              i.EndSkill(),
              (this.IsMainSkillReadyEnd = !1),
              i.SkillInfo.AutonomouslyBySimulate &&
                this.ActorComp.ResetMoveControlled("模拟端结束特殊技能"),
              SceneTeamController_1.SceneTeamController.EmitEvent(
                this.Entity,
                EventDefine_1.EEventName.OnSkillEnd,
                this.Entity.Id,
                i.SkillId,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnSkillEnd,
                this.Entity.Id,
                t,
              ))
            : CombatLog_1.CombatLog.Warn(
                "Skill",
                this.Entity,
                "结束远端技能失败，技能未激活或非模拟执行",
                ["技能Id", t],
                ["技能名", i.SkillName],
              )
          : CombatLog_1.CombatLog.Error(
              "Skill",
              this.Entity,
              "远端结束不存在的技能",
              ["技能Id", t],
            );
    }
    OnActivateAbility(t, i) {
      if (t.IsA(UE.Ga_Passive_C.StaticClass())) {
        const e = this.cBn.get(t.GetClass());
        return (
          e
            ? (((s = t).当前技能数据名 = e.toString()),
              (s.SkillId = e),
              (s = this.GetSkill(e))
                ? SkillMessageController_1.SkillMessageController.UseSkillRequest(
                    this.Entity,
                    s,
                    0,
                  )
                : Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn("Battle", 35, "被动GA没找到skill", [
                    "skillId",
                    e,
                  ]))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                35,
                "被动GA没找到skillId",
                ["skillId", e],
                ["ga", t.GetName()],
              ),
          -1
        );
      }
      if (!this.lZr)
        return (
          CombatLog_1.CombatLog.Error(
            "Skill",
            this.Entity,
            "GA已启动，但没有找到对应技能",
            ["GA", t.GetName()],
          ),
          -1
        );
      this.lZr.ActiveAbility = t;
      const e = this.lZr.SkillId;
      var s;
      return (
        t.IsA(UE.GA_Base_C.StaticClass()) &&
          (((s = t).当前技能数据 = this.lZr.SkillInfo),
          (s.当前技能数据名 = this.lZr.SkillId.toString()),
          (s.SkillId = e)),
        this.XZr(this.lZr),
        (this.lZr = void 0),
        e
      );
    }
    OnEndAbility(t, i) {
      for (const e of this.GetAllActivatedSkill())
        if (e.ActiveAbility === t) return void this.DoSkillEnd(e);
      CombatLog_1.CombatLog.Warn(
        "Skill",
        this.Entity,
        "[BaseSkillComponent.OnEndAbility]GA已结束，但没有找到对应技能",
        ["GA", t.GetName()],
      );
    }
    QZr(t, i, e, s) {
      (this.SkillTarget = void 0),
        (this.SkillTargetSocket = ""),
        t
          ? ((this.SkillTarget =
              t instanceof Entity_1.Entity
                ? ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
                    t,
                  )
                : ActorUtils_1.ActorUtils.GetEntityByActor(t)),
            (this.SkillTargetSocket = i ?? ""))
          : (this.bre?.Valid &&
              ((this.SkillTarget =
                this.bre.AiController.AiHateList.GetCurrentTarget()),
              (this.SkillTargetSocket = "")),
            !this.SkillTarget &&
              this.LockOnComp?.Valid &&
              this.LockOnTargetAndSetShow(e, s));
    }
    LockOnTargetAndSetShow(t, i = !0) {
      this.LockOnComp?.Valid &&
        (this.LockOnComp.DetectSoftLockTarget(t, i),
        (this.SkillTarget = this.LockOnComp.GetCurrentTarget()),
        (this.SkillTargetSocket =
          this.LockOnComp.GetCurrentTargetSocketName()));
    }
    XZr(t) {
      var i, e;
      BaseSkillComponent_1.Wzr.Start(),
        this.hZr.has(t.SkillId) ||
          (this.hZr.add(t.SkillId),
          (i = this.GetSkillInfo(t.SkillId)),
          t.BeginSkill(),
          ModelManager_1.ModelManager.CombatMessageModel?.AddSkillRefCount(
            t.LFc,
          ),
          this.YZr(i.GroupId, t),
          BaseSkillComponent_1.Kzr.Start(),
          SkillMessageController_1.SkillMessageController.UseSkillRequest(
            this.Entity,
            t,
            this.SkillTarget?.Id ?? 0,
          ),
          BaseSkillComponent_1.Kzr.Stop(),
          BaseSkillComponent_1.Qzr.Start(),
          this.zZr(t),
          BaseSkillComponent_1.Qzr.Stop(),
          BaseSkillComponent_1.Xzr.Start(),
          this.dZr?.IsMultiSkill(t.SkillInfo) &&
            this.dZr.StartMultiSkill(t, !1),
          this.dZr?.StartCd(t.SkillId, t.SkillInfo.SkillGenre),
          0 < Math.abs(i.StrengthCost) &&
            !this.EIe.IsAutoRole() &&
            FormationAttributeController_1.FormationAttributeController.AddValue(
              1,
              i.StrengthCost,
            ),
          BaseSkillComponent_1.Xzr.Stop(),
          (e = this.GetSkillLevelBySkillInfoId(t.SkillId)),
          i.GroupId === exports.SKILL_GROUP_MAIN &&
            (this.IsMainSkillReadyEnd = !1),
          BaseSkillComponent_1.$zr.Start(),
          t.BeginSkillBuffAndTag(e),
          BaseSkillComponent_1.$zr.Stop(),
          this.DoSkillBeginMoveAction(t, i),
          i.AutonomouslyBySimulate &&
            this.ActorComp.SetMoveControlled(
              !0,
              i.MoveControllerTime,
              "特殊技能",
            ),
          this.hZr.delete(t.SkillId),
          BaseSkillComponent_1.Wzr.Stop());
    }
    DoSkillEnd(t) {
      var i;
      this.hZr.has(t.SkillId) ||
        (this.hZr.add(t.SkillId),
        BaseSkillComponent_1.eZr.Start(),
        CombatLog_1.CombatLog.Info(
          "Skill",
          this.Entity,
          "BaseSkillComponent.DoSkillEnd",
          ["技能Id", t.SkillId],
          ["技能名", t.SkillName],
        ),
        ModelManager_1.ModelManager.CombatMessageModel?.RemoveSkillRefCount(
          t.LFc,
        ),
        (i = t.SkillInfo),
        BaseSkillComponent_1.tZr.Start(),
        this.ien(t),
        BaseSkillComponent_1.tZr.Stop(),
        BaseSkillComponent_1.iZr.Start(),
        i.GroupId === exports.SKILL_GROUP_MAIN &&
          ((this.vZr = !1), (this.IsMainSkillReadyEnd = !0), (this.UZr = 0)),
        this.DoSkillEndMoveAction(i),
        this.JZr(i.GroupId, t),
        t.EndSkill(),
        BaseSkillComponent_1.iZr.Stop(),
        BaseSkillComponent_1.oZr.Start(),
        i.GroupId === exports.SKILL_GROUP_MAIN &&
          (this.BuffComp?.HasBuffAuthority() &&
            this.BuffComp.RemoveBuff(
              CharacterBuffIds_1.buffId.GoDown,
              -1,
              "技能结束",
            ),
          this.TagComp.HasTag(interruptTag)) &&
          this.TagComp.RemoveTag(interruptTag),
        BaseSkillComponent_1.oZr.Stop(),
        BaseSkillComponent_1.rZr.Start(),
        SkillMessageController_1.SkillMessageController.EndSkillRequest(
          this.Entity,
          t.SkillId,
          t.EndSkillInfo,
        ),
        BaseSkillComponent_1.rZr.Stop(),
        BaseSkillComponent_1.nZr.Start(),
        SceneTeamController_1.SceneTeamController.EmitEvent(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.Entity.Id,
          t.SkillId,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSkillEnd,
          this.Entity.Id,
          t.SkillId,
        ),
        this.BuffComp?.TriggerEvents(3, this.BuffComp, {
          SkillId: Number(t.SkillId),
          SkillGenre: i.SkillGenre,
        }),
        BaseSkillComponent_1.nZr.Stop(),
        this.hZr.delete(t.SkillId),
        BaseSkillComponent_1.eZr.Stop());
    }
    PlaySkillMontage2Server(t, i, e, s, l) {
      var o = this.LoadedSkills.get(t);
      o &&
        ((o.MontageContextId =
          ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
        SkillMessageController_1.SkillMessageController.MontageRequest(
          this.Entity,
          1,
          o.SkillId?.toString(),
          this.SkillTarget?.Id ?? 0,
          i,
          e,
          s,
          l,
          o.LFc,
          o.MontageContextId,
        ),
        (e = o.GetMontageByIndex(i)),
        this.MontageComp?.PushMontageInfo(
          {
            MontageNames: [],
            SkillId: t,
            MontageIndex: i,
            MontageTaskMessageId: o.MontageContextId,
          },
          e,
        ));
    }
    EndSkillMontage(t, i) {}
    SimulatePlayMontage(t, i = 0, e = 1, s = "", l = 0, o = BigInt(0)) {
      var n;
      this.ActorComp.IsAutonomousProxy && this.EIe?.IsRole()
        ? CombatLog_1.CombatLog.Warn(
            "Skill",
            this.Entity,
            "主控角色不能模拟播放蒙太奇",
            ["技能Id", t],
          )
        : ((n = this.LoadedSkills.get(t)) &&
            n.Active &&
            n.PlayMontage(i, e, s, l, void 0, o),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSkillSimulateMontage,
            this.Entity.Id,
            t,
            i,
            l,
          ));
    }
    IsSkillInCd(t) {
      return !!this.dZr && this.dZr.IsSkillInCd(t);
    }
    GetCurrentMontageCorrespondingSkillId() {
      var t,
        i,
        e = this.AbilityComp?.GetCurrentWaitAndPlayedMontageCorrespondingGa();
      for ([t, i] of this.LoadedSkills)
        if (i.Active && i.ActiveAbility === e) return t;
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Character", 22, "不存在该GA的技能", [
            "玩家id",
            this.Entity.Id,
          ]),
        0
      );
    }
    get SkillAcceptInput() {
      return this.vZr;
    }
    SetSkillAcceptInput(t) {
      (this.vZr = t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SkillAcceptChanged,
          this.Entity.Id,
          this.CurrentSkill?.SkillId ?? 0,
          this.vZr,
        );
    }
    GetSkillTargetForAns() {
      var t;
      return !this.EIe.IsRole() ||
        ((t = this.CurrentSkill) && t.SkillInfo.IsLockOn)
        ? this.SkillTarget
        : void 0;
    }
    AUn() {
      var t = this.CurrentSkill;
      t &&
        (t.SkillInfo.SkillTarget.TargetDied
          ? (this.LockOnComp?.Valid &&
              this.LockOnTargetAndSetShow(t.SkillInfo.SkillTarget),
            this.bre?.Valid &&
              (t = this.bre.AiController.AiHateList.GetCurrentTarget()) &&
              t.Id !== this.SkillTarget?.Id &&
              (this.SkillTarget =
                ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
                  t.Entity,
                )))
          : ((this.SkillTarget = void 0), (this.SkillTargetSocket = "")),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharSkillTargetChanged,
          this.SkillTarget,
          this.SkillTargetSocket,
        ));
    }
    GetTargetTransform() {
      var i = this.SkillTarget.Entity.GetComponent(0).GetEntityType();
      if (
        i !== Protocol_1.Aki.Protocol.kks.Proto_Player &&
        i !== Protocol_1.Aki.Protocol.kks.Proto_Npc &&
        i !== Protocol_1.Aki.Protocol.kks.Proto_Monster &&
        i !== Protocol_1.Aki.Protocol.kks.Proto_Vision
      )
        return this.SkillTarget.Entity.GetComponent(1).ActorTransform;
      {
        let t = this.SkillTargetSocket;
        t = t || HIT_CASE_SOCKET_NAME;
        var i = this.SkillTarget.Entity.GetComponent(3),
          e = i.Actor.Mesh,
          s = FNameUtil_1.FNameUtil.GetDynamicFName(t);
        return e?.DoesSocketExist(s)
          ? e.D_GetSocketTransform(s, 0)
          : i.ActorTransform;
      }
    }
    GetTargetDistance() {
      var t;
      return this.SkillTarget && (t = this.GetTargetTransform())
        ? (this.TmpVector.FromUeVector(t.GetLocation()),
          Vector_1.Vector.Dist(
            this.ActorComp.ActorLocationProxy,
            this.TmpVector,
          ))
        : -1;
    }
    SetSkillCanRotate(t) {
      (this.SkillCanRotateInternal = t) || this.SZr.Reset();
    }
    SetSkillRotateSpeed(t) {
      this.SkillRotateSpeedInternal = t;
    }
    SetRotateTarget(t, i) {
      (this.IZr.Target = t), (this.IZr.Type = i);
    }
    SetSkillRotateToTarget(t, i, e, s = 0, l = 0) {
      (this.SkillRotateToTargetInternal = t),
        (this.SZr.IsUseAnsRotateOffset = i),
        (this.SZr.AnsRotateOffset = -MathUtils_1.MathUtils.Clamp(
          e,
          -MathUtils_1.PI_DEG,
          MathUtils_1.PI_DEG,
        )),
        (this.SZr.PauseRotateThreshold = s),
        (this.SZr.ResumeRotateThreshold = l);
    }
    SetIgnoreSocketName(t) {
      this.IgnoreSocketName.add(t.toString());
    }
    DeleteIgnoreSocketName(t) {
      this.IgnoreSocketName.delete(t.toString());
    }
    GetSkillRotateDirect() {
      return this.GetCurrentSkillRotateDirect();
    }
    GetCurrentSkillRotateDirect() {
      var i = this.ActorComp.ActorLocationProxy;
      switch (this.IZr.Type) {
        case 0:
          return this.SkillTarget
            ? ((e = this.SkillTarget.Entity.CheckGetComponent(1)),
              this.nen(e, i))
            : void 0;
        case 1:
          var e = this.IZr.Target;
          return this.oxr.DeepCopy(e), this.oxr.SubtractionEqual(i), this.oxr;
        case 2:
          var e = this.IZr.Target;
          return this.oxr.DeepCopy(e), this.oxr;
        case 3:
        case 6: {
          let t = void 0;
          return (t =
            3 === this.IZr.Type
              ? BlackboardController_1.BlackboardController.GetEntityIdByEntity(
                  this.Entity.Id,
                  this.IZr.Target,
                )
              : BlackboardController_1.BlackboardController.GetIntValueByEntity(
                  this.Entity.Id,
                  this.IZr.Target,
                ))
            ? ((e = EntitySystem_1.EntitySystem.Get(t).CheckGetComponent(1)),
              this.oxr.DeepCopy(e.ActorLocationProxy),
              this.oxr.SubtractionEqual(i),
              this.oxr)
            : void 0;
        }
        case 4:
          e =
            BlackboardController_1.BlackboardController.GetVectorValueByEntity(
              this.Entity.Id,
              this.IZr.Target,
            );
          return e
            ? (this.oxr.DeepCopy(e), this.oxr.SubtractionEqual(i), this.oxr)
            : void 0;
        case 5:
          e =
            BlackboardController_1.BlackboardController.GetVectorValueByEntity(
              this.Entity.Id,
              this.IZr.Target,
            );
          return e ? (this.oxr.DeepCopy(e), this.oxr) : void 0;
        default:
          return;
      }
    }
    nen(t, i) {
      var e = this.CurrentSkill;
      let s = void 0;
      (s = e ? this.GetTargetTransform() : s)
        ? this.oxr.FromUeVector(s.GetLocation())
        : this.oxr.DeepCopy(t.ActorLocationProxy),
        this.oxr.SubtractionEqual(i),
        this.oxr.Normalize(),
        this.SZr.IsUseAnsRotateOffset &&
          0 !== this.SZr.AnsRotateOffset &&
          (this.TmpRotator.Set(0, this.SZr.AnsRotateOffset, 0),
          GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
            this.ActorComp,
            this.oxr,
          ),
          GravityUtils_1.GravityUtils.RotateDirectInGravityForActor(
            this.ActorComp,
            this.TmpRotator,
            this.oxr,
          ));
      (e = this.ActorComp.ActorForwardProxy),
        (t = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityAbsForActor(
          this.ActorComp,
          this.oxr,
          e,
        ));
      return (
        this.SZr.IsPaused
          ? 0 < this.SZr.ResumeRotateThreshold &&
            (t < this.SZr.ResumeRotateThreshold
              ? this.oxr.DeepCopy(e)
              : (this.SZr.IsPaused = !1))
          : 0 < this.SZr.PauseRotateThreshold &&
            t < this.SZr.PauseRotateThreshold &&
            ((this.SZr.IsPaused = !0), this.oxr.DeepCopy(e)),
        this.oxr
      );
    }
    get CurrentPriority() {
      return this.UZr;
    }
    SetCurrentPriority(t) {
      this.UZr = t;
    }
    HasAbility(t) {
      return !!this.CheckIsLoaded() && this.LoadedSkills.has(t);
    }
    SetSkillPriority(t, i) {
      this.CheckIsLoaded() &&
        (t = this.LoadedSkills.get(t))?.Active &&
        (t.InterruptLevel = i);
    }
    CallAnimBreakPoint() {
      this.CheckIsLoaded() &&
        (this.TagComp.HasTag(interruptTag) || this.TagComp.AddTag(interruptTag),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharAnimBreakPoint,
          this.Entity.Id,
        ));
    }
    GetActivePriority(t) {
      return this.CheckIsLoaded() && (t = this.LoadedSkills.get(t))?.Active
        ? t.InterruptLevel
        : -1;
    }
    GetSkillMontageInstance(t, i) {
      if (this.CheckIsLoaded()) {
        t = this.LoadedSkills.get(t);
        if (t) return t.GetMontageByIndex(i);
      }
    }
    IsCanUseSkill(t) {
      var i;
      return (
        !!this.CheckIsLoaded() &&
        !(
          !(i = this.GetSkillInfo(t)) ||
          this.IsSkillInCd(t) ||
          !this.DoCheckInterrupt(i.GroupId, this.GetPriority(t)) ||
          this.IsSkillGenreForbidden(i)
        )
      );
    }
    ResetRoleGrowComponent(t) {
      this.mZr || (this.mZr = t);
    }
    GetSkillLevelBySkillInfoId(t) {
      return this.mZr
        ? this.mZr.GetSkillLevelBySkillInfoId(t)
        : BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL;
    }
    GetSkillIdWithGroupId(t) {
      return this.aZr.get(t)?.[SKILL_GROUP_INDEX]?.SkillId ?? 0;
    }
    zZr(t) {
      var i = { Entity: this.Entity, SkillComponent: this, Skill: t },
        e = this.GetSkillInfo(t.SkillId);
      for (let t = 0; t < e.SkillBehaviorGroup.Num(); t++) {
        var s = e.SkillBehaviorGroup.Get(t);
        if (
          SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(
            s.SkillBehaviorConditionGroup,
            s.SkillBehaviorConditionFormula,
            i,
          ) &&
          (SkillBehaviorAction_1.SkillBehaviorAction.BeginGroup(
            s.SkillBehaviorActionGroup,
            i,
          ),
          !s.SkillBehaviorContinue)
        )
          break;
      }
    }
    ien(t) {
      SkillBehaviorAction_1.SkillBehaviorAction.End(t);
    }
    YZr(t, i) {
      let e = this.aZr.get(t);
      e || ((e = []), this.aZr.set(t, e)), e.includes(i) || e.push(i);
    }
    JZr(t, i) {
      t = this.aZr.get(t);
      t && -1 !== (i = t.indexOf(i)) && t.splice(i, 1);
    }
    *GetAllActivatedSkill() {
      for (const t of this.aZr.values()) for (const i of t.values()) yield i;
    }
    SetGaPassiveClassToSkillMap(t, i) {
      this.cBn.get(t)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            35,
            "GaPassiveClass重复,多个Skill用了一个GA",
            ["existedSkillId", this.cBn.get(t)],
            ["curSkillId", i],
          )
        : this.cBn.set(t, i);
    }
    GiveSkillDebug(t) {
      this.KZr(t);
    }
    LogEndSkillReason(t, i, e) {
      var s;
      this.CheckIsLoaded() &&
        (s = this.CurrentSkill) &&
        (i ||
          (s.EndSkillInfo.Reason =
            Protocol_1.Aki.Protocol.rR_.Proto_EEndSkillReason_BeHit),
        e &&
          (s.EndSkillInfo.Reason =
            Protocol_1.Aki.Protocol.rR_.Proto_EEndSkillReason_BeCounter),
        (s.EndSkillInfo.EntityId = MathUtils_1.MathUtils.NumberToLong(
          t.BulletOwner.GetComponent(0).GetCreatureDataId(),
        )),
        (s.EndSkillInfo.SkillId = t.GetBulletInfo().BulletInitParams.SkillId),
        (s.EndSkillInfo.BulletId = MathUtils_1.MathUtils.NumberToLong(
          t.GetBulletInfo().BulletEntityId,
        )));
    }
    DoSkillBeginMoveAction(t, i) {}
    DoSkillEndMoveAction(t) {}
    OnBeforePlaySkillMontage() {}
    GetMainAnimInstance() {}
    un_(t) {
      let i = this.cn_.get(t);
      return (
        i ||
          ((i = Stats_1.Stat.CreateNoFlameGraph("BeginSkill " + t)),
          this.cn_.set(t, i)),
        i
      );
    }
    GetReplaceEffect(t) {}
    *GetAllSkillData(t = 7) {
      var i = new Set();
      if (this._Zr && 1 & t) {
        var e = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
          this._Zr,
          e,
        );
        for (const r of e) {
          var s = Number(r);
          i.has(s) || (i.add(s), yield s);
        }
      }
      if (2 & t) {
        let t = [];
        switch (this.EIe.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_Player:
            t =
              ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames();
            break;
          case Protocol_1.Aki.Protocol.kks.Proto_Vision:
            t =
              ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames();
        }
        for (const h of t) {
          var l = Number(h);
          i.has(l) || (i.add(l), yield l);
        }
      }
      if (this.DtSkillInfoExtraList && 4 & t)
        for (const a of this.DtSkillInfoExtraList) {
          var o = new Array();
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(a, o);
          for (const S of o) {
            var n = Number(S);
            i.has(n) || (i.add(n), yield n);
          }
        }
    }
    *GetAllBulletData(t = 7) {
      var i = new Set();
      if (this.DtBulletInfo && 1 & t) {
        var e = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
          this.DtBulletInfo,
          e,
        );
        for (const n of e) {
          var s = BigInt(n);
          i.has(s) || (i.add(s), yield s);
        }
      }
      if (this.DtBulletInfoExtraList && 4 & t)
        for (const r of this.DtBulletInfoExtraList) {
          var l = new Array();
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(r, l);
          for (const h of l) {
            var o = BigInt(h);
            i.has(o) || (i.add(o), yield o);
          }
        }
    }
  });
(BaseSkillComponent.Ozr = Stats_1.Stat.Create("BeginSkill")),
  (BaseSkillComponent.kzr = Stats_1.Stat.Create(
    "BeginSkill1 CheckSkillCanUse",
  )),
  (BaseSkillComponent.Fzr = Stats_1.Stat.Create("BeginSkill2 InterruptSkill")),
  (BaseSkillComponent.Vzr = Stats_1.Stat.Create("BeginSkill3 StateMachine")),
  (BaseSkillComponent.Hzr = Stats_1.Stat.Create("BeginSkill4 SelectTarget")),
  (BaseSkillComponent.jzr = Stats_1.Stat.Create("BeginSkill5 ActiveSkill")),
  (BaseSkillComponent.nva = Stats_1.Stat.Create("BeginSkill6 EmitSkillBegin")),
  (BaseSkillComponent.Wzr = Stats_1.Stat.Create("DoSkillBegin")),
  (BaseSkillComponent.Kzr = Stats_1.Stat.Create("DoSkillBegin1 NetSend")),
  (BaseSkillComponent.Qzr = Stats_1.Stat.Create(
    "DoSkillBegin2 SkillBehaviorStart",
  )),
  (BaseSkillComponent.Xzr = Stats_1.Stat.Create("DoSkillBegin3 CD&Cost")),
  (BaseSkillComponent.$zr = Stats_1.Stat.Create("DoSkillBegin4 Buff&Tag")),
  (BaseSkillComponent.Zzr = Stats_1.Stat.Create("RequestEndSkill")),
  (BaseSkillComponent.eZr = Stats_1.Stat.Create("DoSkillEnd")),
  (BaseSkillComponent.tZr = Stats_1.Stat.Create(
    "DoSkillEnd1 SkillBehaviorEnd",
  )),
  (BaseSkillComponent.iZr = Stats_1.Stat.Create(
    "DoSkillEnd2 RestoreSkillInfoStaff",
  )),
  (BaseSkillComponent.oZr = Stats_1.Stat.Create(
    "DoSkillEnd3 RestoreMoveState",
  )),
  (BaseSkillComponent.rZr = Stats_1.Stat.Create("DoSkillEnd4 NetSend")),
  (BaseSkillComponent.nZr = Stats_1.Stat.Create("DoSkillEnd5 EmitSkillEnd")),
  (BaseSkillComponent = BaseSkillComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(38)],
      BaseSkillComponent,
    )),
  (exports.BaseSkillComponent = BaseSkillComponent);
//# sourceMappingURL=BaseSkillComponent.js.map
