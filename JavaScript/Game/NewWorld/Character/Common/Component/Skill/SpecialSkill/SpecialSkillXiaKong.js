"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialSkillXiaKong = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../../../Global"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  CharacterAttributeTypes_1 = require("../../Abilities/CharacterAttributeTypes"),
  CharacterBuffIds_1 = require("../../Abilities/CharacterBuffIds"),
  SpecialSkillBase_1 = require("./SpecialSkillBase"),
  CHECK_DISTANCE_INTERVAL = 1e3,
  MAX_DISTANCE_SQUARED = 9e8,
  ULTRA_SKILL_ID = 1407200,
  ULTRA_SECOND_SKILL_ID = 1407201,
  LOOP_SKILL_ID = 1407004,
  LOOP_START_TIME = 4,
  LOOP_END_TIME = 22.333334,
  CIRCLE_NUM = 2,
  buffIds = CharacterBuffIds_1.specialSkillToBuffsMap.get(ULTRA_SKILL_ID),
  MAX_ATRR_VALUE = 3e4,
  SUCC_MAX_ATTR_VALUE = 3e4,
  SUCC_MIN_ATTR_VALUE = 48e4 / 21,
  SUCC_BACKSTAGE_ATRR_VALUE = 25e3,
  CIRCLE_SPEED_INIT = 3e4 / 2100,
  FRIST_CIRCLE_TIME = 3663,
  CIRCLE_INTERVAL = 23285.7,
  ULTRA_SKILL_TOTAL_TIME = 34e3,
  INPUT_START_TIME = 3663;
class SpecialSkillXiaKong extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments),
      (this.Jh = void 0),
      (this.E0 = 0),
      (this.Wpo = 0),
      (this.TSo = void 0),
      (this.bMc = void 0),
      (this.Xte = void 0),
      (this.zLc = void 0),
      (this.m1t = void 0),
      (this.LMc = void 0),
      (this.wMc = !1),
      (this.RMc = 0),
      (this._E1 = void 0),
      (this.uE1 = void 0),
      (this.fI1 = []),
      (this.hR1 = []),
      (this.j3 = void 0),
      (this.ZI1 = !1),
      (this.JLc = 0),
      (this.YTc = 0),
      (this.ewc = []),
      (this.twc = 0),
      (this.iwc = !0),
      (this.rwc = 0),
      (this.oUe = 0),
      (this.hqa = 0),
      (this.owc = !1),
      (this.Ji1 = 0),
      (this.JCl = 1),
      (this.IL1 = new Map()),
      (this.Jpe = (t, i) => {
        var t = t.GetCreatureDataId(),
          e = this.IL1.get(t);
        void 0 !== e &&
          (this.IL1.delete(t),
          (this.fI1[e] = i),
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
            this,
            i.Entity,
            EventDefine_1.EEventName.OnSkillSimulateMontage,
            this.eT1,
          ),
          this.IL1.size <= 0) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.CreateEntity,
            this.Jpe,
          );
      }),
      (this.gI1 = () => {
        if (this.ZI1) {
          var t,
            i =
              Global_1.Global.BaseCharacter?.CharacterActorComponent
                ?.ActorLocationProxy;
          if (i)
            for (const e of this.fI1)
              e?.Valid &&
                (t = e.Entity?.GetComponent(1))?.DisableActorHandle.Empty &&
                Vector_1.Vector.DistSquared(t.ActorLocationProxy, i) >
                  MAX_DISTANCE_SQUARED &&
                e.Entity.GetComponent(39)?.StopAllSkills("幻影距离主体过远");
        }
      }),
      (this.BJe = (t, i, e) => {
        i === ULTRA_SKILL_ID &&
          ((this.wMc = !0),
          (this.RMc = Time_1.Time.Frame),
          (this.LMc = this.TSo?.GetSkill(ULTRA_SKILL_ID)),
          this.nwc());
      }),
      (this.bJe = (t, i) => {
        i === ULTRA_SKILL_ID && ((this.wMc = !1), this.swc());
      }),
      (this.eT1 = (t, i, e, s) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "OnSkillSimulateMontage",
            ["entityId", t],
            ["skillId", i],
            ["startTimeSeconds", s],
          );
        for (const _ of this.fI1)
          if (_?.Entity?.Id === t) {
            ControllerHolder_1.ControllerHolder.CreatureController.SetActorMovable(
              _.Entity,
              !0,
              "同步幻影技能动作",
            );
            break;
          }
        var h;
        i !== LOOP_SKILL_ID ||
          s < LOOP_END_TIME ||
          ((i = LOOP_END_TIME - LOOP_START_TIME),
          (i = s - Math.floor((s - LOOP_START_TIME) / i) * i),
          (h = EntitySystem_1.EntitySystem.GetComponent(t, 175))?.Valid &&
            h.MontageSetPosition(i),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              17,
              "夏空模拟端蒙太奇开始时间超过总长度，重设开始时间",
              ["修正前", s],
              ["修正后", i],
            ));
      }),
      (this.lR1 = (t, i) => {
        t !== i && this._R1(t);
      }),
      (this.uR1 = (t, i) => {
        t !== i && this._R1(t);
      }),
      (this.xie = (t, i) => {
        var t = t.Entity === this.Jh;
        this.iwc !== t &&
          ((this.iwc = t), this.wMc) &&
          (this.iwc
            ? (this.LMc?.ActiveAbility?.SetIsInterrupt(!0),
              this.TSo?.EndSkill(ULTRA_SKILL_ID, "夏空大招从后台切回来"))
            : ((t =
                (t = this.GetNextEndCircleAttrValue()) >= SUCC_MIN_ATTR_VALUE &&
                t < SUCC_MAX_ATTR_VALUE),
              this.hwc(t, !1)));
      });
  }
  OnStart() {
    (this.Jh = this.SpecialSkillComponent.Entity), (this.E0 = this.Jh.Id);
    var t = this.Jh.GetComponent(0);
    (this.Wpo = t.GetCreatureDataId()),
      (this.TSo = this.Jh.GetComponent(39)),
      (this.bMc = this.Jh.GetComponent(177)),
      (this.Xte = this.Jh.GetComponent(191)),
      (this.zLc = this.Jh.GetComponent(170)),
      (this.m1t = this.Jh.GetComponent(188)),
      (this.uE1 = [void 0, void 0, void 0, void 0]),
      (this.ZI1 =
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ===
        t.GetPlayerId()),
      this.ZI1 &&
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharUseSkill,
          this.BJe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.OnSkillEnd,
          this.bJe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnBeforeChangeRole,
          this.lR1,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnBeforeUpdateSceneTeam,
          this.uR1,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        )),
      this.CI1(),
      this.tT1();
  }
  CI1() {
    if (this.ZI1) {
      for (let t = 1; t <= 3; t++) {
        var i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          this.Jh,
          Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom,
          t,
        );
        i?.Valid
          ? (this.fI1.push(i),
            (i = i.Entity.GetComponent(3).DisableActor("夏空幻影Start")),
            this.hR1.push(i))
          : (CombatLog_1.CombatLog.Info(
              "Skill",
              this.Jh,
              "夏空Start获取幻影实体失败",
              ["pos", t],
            ),
            this.fI1.push(void 0),
            this.hR1.push(0));
      }
      this.j3 = TimerSystem_1.TimerSystem.Forever(
        this.gI1,
        CHECK_DISTANCE_INTERVAL,
      );
    }
  }
  OnActivate() {
    if (this.ZI1)
      for (let i = 0; i < this.fI1.length; i++) {
        let t = this.fI1[i];
        (t =
          t ||
          PhantomUtil_1.PhantomUtil.GetSummonedEntity(
            this.Jh,
            Protocol_1.Aki.Protocol.Summon.x3s
              .Proto_ESummonTypeConcomitantCustom,
            i + 1,
          ))?.Valid
          ? (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              t.Entity,
              !0,
              "夏空幻影初始化",
              !0,
            ),
            ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
              t.Entity,
              !1,
              !1,
              !1,
              "夏空幻影Activate",
              !0,
            ),
            this.hR1[i] && t.Entity.GetComponent(3)?.EnableActor(this.hR1[i]))
          : CombatLog_1.CombatLog.Error(
              "Skill",
              this.Jh,
              "夏空Activate获取幻影实体失败",
              ["pos", i + 1],
            );
      }
  }
  tT1() {
    if (!this.ZI1) {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Jh,
        EventDefine_1.EEventName.OnSkillSimulateMontage,
        this.eT1,
      ),
        this.IL1.clear();
      for (let t = 0; t < 3; t++) {
        var i = this.Jh.GetComponent(0).CustomServerEntityIds[t],
          e = ModelManager_1.ModelManager.CreatureModel.GetEntity(i);
        e?.Valid
          ? (this.fI1.push(e),
            EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
              this,
              e.Entity,
              EventDefine_1.EEventName.OnSkillSimulateMontage,
              this.eT1,
            ))
          : (this.IL1.set(i, t), this.fI1.push(void 0));
      }
      0 < this.IL1.size &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CreateEntity,
          this.Jpe,
        );
    }
  }
  OnTick(t) {
    this.wMc && this.RMc !== Time_1.Time.Frame && this.lwc(t * this.PMc());
    t = this.cE1();
    t !== this._E1 &&
      (this._E1?.Valid && this._E1.RemoveForceTimeScale(), (this._E1 = t));
  }
  cE1() {
    if (this.uE1) {
      var i =
        ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
          this.E0,
          "VisionId",
        );
      if (i) {
        let t = this.uE1[i];
        if (!t) {
          var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
            this.Jh,
            Protocol_1.Aki.Protocol.Summon.x3s
              .Proto_ESummonTypeConcomitantCustom,
            i,
          );
          if (!e?.Valid) return;
          (t = e.Entity?.GetComponent(177)) && (this.uE1[i] = t);
        }
        return t ? (t.SetForceTimeScale(this.bMc.CurrentTimeScale), t) : void 0;
      }
    }
  }
  OnEnd() {
    if (
      (this.j3 &&
        (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0)),
      this.ZI1)
    )
      this.wMc &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged,
          this.Jh.Id,
          1407,
          !1,
        ),
        (this.wMc = !1)),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnBeforeChangeRole,
          this.lR1,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnBeforeUpdateSceneTeam,
          this.uR1,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        ),
        this.Jh &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Jh,
            EventDefine_1.EEventName.CharUseSkill,
            this.BJe,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Jh,
            EventDefine_1.EEventName.OnSkillEnd,
            this.bJe,
          ),
          (this.Jh = void 0));
    else {
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CreateEntity,
        this.Jpe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CreateEntity,
          this.Jpe,
        );
      for (const t of this.fI1)
        t?.Entity &&
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(
            this,
            t.Entity,
            EventDefine_1.EEventName.OnSkillSimulateMontage,
            this.eT1,
          );
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
        this.Jh &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Jh,
            EventDefine_1.EEventName.OnSkillSimulateMontage,
            this.eT1,
          ),
          (this.Jh = void 0));
    }
    (this.fI1.length = 0),
      (this.TSo = void 0),
      (this.bMc = void 0),
      (this.LMc = void 0),
      (this.uE1 = void 0);
  }
  _R1(t) {
    this.wMc &&
      t?.Entity === this.Jh &&
      ((t = this.GetNextEndCircleAttrValue()) >= SUCC_MIN_ATTR_VALUE &&
        t < SUCC_MAX_ATTR_VALUE &&
        this.hwc(!0),
      this.Jh?.GetComponent(91)?.DisableRoleWithoutEffect());
  }
  PMc() {
    return this.Jh && this.bMc
      ? this.Jh.TimeDilation * this.bMc.CurrentTimeScale
      : 1;
  }
  nwc() {
    (this.JLc = 0),
      (this.YTc = 0),
      (this.ewc.length = 0),
      (this.twc = CIRCLE_SPEED_INIT),
      (this.iwc = this.Xte?.HasTag(-1384309247) ?? !1),
      (this.rwc = FRIST_CIRCLE_TIME * this.twc),
      (this.oUe = 0),
      (this.hqa = 0),
      (this.owc = !1),
      (this.Ji1 = INPUT_START_TIME),
      (this.JCl = 1),
      this.Xte?.TagContainer.UpdateExactTag(1, 1144073280, 1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged,
        this.Jh.Id,
        1407,
        !0,
      );
  }
  lwc(t) {
    this.owc ||
      ((this.oUe += t),
      this.oUe > ULTRA_SKILL_TOTAL_TIME &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "[SpecialSkillXiaKong]已达到最大时间，后续不再生成新光圈",
          ),
        (this.owc = !0))),
      0 < this.Ji1 && (this.Ji1 -= t);
    var i = this.twc * t;
    this._wc(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1, i),
      this._wc(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2, i),
      this.cwc(),
      this.uwc(),
      this.dwc(t);
  }
  swc() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]夏空大招结束");
    for (let t = this.YTc; t < this.JLc; t++) {
      var i = this.ewc[t];
      this.m1t?.RemoveBuff(i, 1, "夏空大招结束清理", this.LMc.LFc);
    }
    (this.YTc = this.JLc),
      this.Xte?.TagContainer.UpdateExactTag(1, 1144073280, -1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged,
        this.Jh.Id,
        1407,
        !1,
      );
  }
  cwc() {
    var t, i;
    if (!(this.YTc >= this.JLc))
      return (
        (t = this.GetNextEndCircleAttrValue()),
        this.iwc
          ? (i = this.mwc()) <= 0
            ? void (t >= MAX_ATRR_VALUE && this.hwc(!1))
            : void (
                (1 !== i && 2 !== i) ||
                ((this.JCl = i),
                t <= SUCC_MAX_ATTR_VALUE &&
                  t >= SUCC_MIN_ATTR_VALUE &&
                  this.hwc(!0))
              )
          : void (t >= SUCC_BACKSTAGE_ATRR_VALUE && this.hwc(!0, !0))
      );
  }
  dwc(t) {
    this.owc ||
      ((this.rwc -= t * this.twc), 0 < this.rwc) ||
      (this.fwc() && (this.rwc = CIRCLE_INTERVAL));
  }
  gwc(t) {
    return t % CIRCLE_NUM;
  }
  Cwc(t) {
    return 2 * t + CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1;
  }
  pwc(t) {
    return buffIds && buffIds[t]
      ? buffIds[t]
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 17, "[SpecialSkillXiaKong]不存在对应buff", [
            "index",
            t,
          ]),
        0);
  }
  fwc() {
    var t, i;
    return this.JLc - this.YTc >= CIRCLE_NUM
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "[SpecialSkillXiaKong]场上存在2个圈，不允许继续生成",
          ),
        !1)
      : ((i = this.gwc(this.JLc)),
        (t = this.Cwc(i)),
        this.zLc?.SetBaseValue(t, 0),
        (t = this.pwc(i)),
        this.ewc.push(t),
        (i = this.LMc.LFc),
        this.m1t?.AddBuff(Number(t), {
          InstigatorId: this.Wpo,
          Reason: "夏空大招逻辑添加",
          PreMessageId: i,
        }),
        this.JLc++,
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "[SpecialSkillXiaKong]生成新的特效圈",
            ["", this.JLc],
            ["buffId", t],
          ),
        !0);
  }
  vwc() {
    this.YTc >= this.JLc &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]没有圈可以销毁");
    var t = this.ewc[this.YTc];
    this.m1t?.RemoveBuff(t, 1, "夏空大招逻辑移除", this.LMc.LFc),
      this.YTc++,
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          17,
          "[SpecialSkillXiaKong]销毁特效圈",
          ["", this.YTc],
          ["buffId", t],
        );
  }
  GetNextEndCircleAttrValue(t = 0) {
    (t = this.gwc(this.YTc + t)), (t = this.Cwc(t));
    return this.zLc?.GetCurrentValue(t) ?? 0;
  }
  hwc(t, i = !1) {
    this.vwc(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          17,
          "[SpecialSkillXiaKong]判定结果",
          ["是否成功", t],
          ["类型", this.JCl],
          ["是否自动", i],
        ),
      this.LMc?.ActiveAbility?.判定结果(t, i, this.JCl);
  }
  _wc(t, i) {
    this.zLc &&
      ((i = this.zLc.GetCurrentValue(t) + i), this.zLc.SetBaseValue(t, i));
  }
  uwc() {
    this.hqa = 0;
  }
  mwc() {
    return this.hqa;
  }
  SetInputType(t) {
    !this.wMc ||
      0 < this.Ji1 ||
      (4 === t
        ? ((this.hqa = 0),
          this.LMc &&
            0 < this.JLc &&
            (this.LMc.ActiveAbility?.SetIsInterrupt(!0),
            this.TSo?.EndSkill(ULTRA_SKILL_ID, "夏空大招主动按键结束"),
            this.TSo?.BeginSkill(ULTRA_SECOND_SKILL_ID, {
              Reason: "夏空主动结束大招触发",
            })))
        : (this.hqa = t));
  }
  GetMinAttrValue() {
    return SUCC_MIN_ATTR_VALUE;
  }
  GetNextGenCircleIndex() {
    return this.JLc;
  }
  GetNextEndCircleIndex() {
    return this.YTc;
  }
  GetIsUltraSkillState() {
    return this.wMc;
  }
}
exports.SpecialSkillXiaKong = SpecialSkillXiaKong;
//# sourceMappingURL=SpecialSkillXiaKong.js.map
