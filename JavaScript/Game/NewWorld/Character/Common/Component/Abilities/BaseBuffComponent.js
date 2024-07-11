"use strict";
var BaseBuffComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, f, i) {
      var r,
        o = arguments.length,
        s =
          o < 3
            ? e
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, f))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, f, i);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (r = t[a]) &&
            (s = (o < 3 ? r(s) : 3 < o ? r(e, f, s) : r(e, f)) || s);
      return 3 < o && s && Object.defineProperty(e, f, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseBuffComponent = void 0);
const Info_1 = require("../../../../../../Core/Common/Info"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  RandomSystem_1 = require("../../../../../../Core/Random/RandomSystem"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  StatDefine_1 = require("../../../../../Common/StatDefine"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  ActiveBuff_1 = require("./Buff/ActiveBuff"),
  ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  CharacterBuffIds_1 = require("./CharacterBuffIds");
let BaseBuffComponent = (BaseBuffComponent_1 = class BaseBuffComponent extends (
  EntityComponent_1.EntityComponent
) {
  constructor() {
    super(...arguments),
      (this.BuffContainer = new Map()),
      (this.BuffGarbageSet = new Set()),
      (this.BuffEffectManager = void 0),
      (this.TagListenerDict = new Map()),
      (this.TagImmuneListenerDict = new Map()),
      (this.VictimTagListenerDict = new Map()),
      (this.VictimBuffListenerDict = new Map()),
      (this.EffectTimeoutMap = new Map()),
      (this.Mbr = 0),
      (this.TriggerMap = new Map());
  }
  GetDebugName() {
    return "";
  }
  OnClear() {
    var t = this.BuffEffectManager;
    if (t) {
      for (const e of t.FilterById(31)) e?.OnRemoved(!0);
      for (const f of t.FilterById(33)) f?.OnRemoved(!0);
      for (const i of t.FilterById(32)) i?.OnRemoved(!0);
      for (const r of t.FilterById(51)) r?.OnRemoved();
      for (const o of t.FilterById(50)) o?.OnRemoved();
      for (const s of t.FilterById(21)) s?.OnRemoved(!0);
      t.Clear();
    }
    return (
      this.BuffContainer.clear(),
      this.BuffGarbageSet.clear(),
      this.EffectTimeoutMap.clear(),
      !0
    );
  }
  OnTick(t) {
    return !(this.BuffLock = 0);
  }
  NeedBroadcastBuff(t, e = !1) {
    return !e && this.HasBuffAuthority();
  }
  HasBuffAuthority() {
    return !1;
  }
  GetEntity() {}
  GetExactEntity() {
    return this.Entity;
  }
  GetAttributeComponent() {}
  GetTagComponent() {}
  GetSkillComponent() {}
  GetPassiveSkillComponent() {
    return this.GetEntity()?.GetComponent(23);
  }
  GetActorComponent() {}
  GetCueComponent() {}
  GetTimeScale() {
    return 0;
  }
  Zfa(t, e, f) {
    let i = t.get(e);
    i || t.set(e, (i = new Set())), i.add(f);
  }
  EUi(t, e, f, i) {
    let r = t.get(e),
      o = (r || t.set(e, (r = new Map())), r.get(f));
    o || r.set(f, (o = new Set())), o.add(i);
  }
  epa(t, e, f) {
    var i = t.get(e);
    i && (i.delete(f), i.size <= 0) && t.delete(e);
  }
  tpa(t, e, f, i) {
    var r,
      o = t.get(e);
    o &&
      (r = o.get(f)) &&
      (r.delete(i), r.size <= 0) &&
      (o.delete(f), o.size <= 0) &&
      t.delete(e);
  }
  GetInvolvedTags(t) {
    var e = [];
    return (
      t.ActivateTagRequirements && e.push(...t.ActivateTagRequirements),
      t.ActivateTagIgnores && e.push(...t.ActivateTagIgnores),
      t.RemoveTagExistAll && e.push(...t.RemoveTagExistAll),
      t.RemoveTagExistAny && e.push(...t.RemoveTagExistAny),
      t.RemoveTagIgnores && e.push(...t.RemoveTagIgnores),
      e
    );
  }
  GetInvolvedInstigatorTags(t) {
    var e = [];
    if (t.BuffAction)
      for (const f of t.BuffAction)
        switch (f.Type) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            e.push(...f.Tags);
        }
    return e;
  }
  GetInvolvedInstigatorBuffIds(t) {
    var e = [];
    if (t.BuffAction)
      for (const f of t.BuffAction)
        switch (f.Type) {
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
            e.push(...f.Buffs);
        }
    return e;
  }
  MarkListenerBuff(t) {
    if (this.NeedCheck(t.Config)) {
      var e = t.Config;
      if (e) {
        var f = t.Handle;
        for (const o of this.GetInvolvedTags(e))
          this.Zfa(this.TagListenerDict, o, f);
        if (e.ImmuneTags)
          for (const s of e.ImmuneTags.values())
            this.Zfa(this.TagImmuneListenerDict, s, f);
        var i = t.GetInstigatorBuffComponent(),
          r = this.Entity.GetComponent(0)?.GetCreatureDataId();
        if (i && r) {
          for (const a of this.GetInvolvedInstigatorTags(e))
            i.EUi(i.VictimTagListenerDict, a, r, f);
          for (const n of this.GetInvolvedInstigatorBuffIds(e))
            i.EUi(i.VictimBuffListenerDict, n, r, f);
        }
      }
    }
  }
  RemoveListenerBuff(t) {
    if (this.NeedCheck(t.Config)) {
      var e = t.Config;
      if (e) {
        var f = t.Handle;
        for (const o of this.GetInvolvedTags(e))
          this.epa(this.TagListenerDict, o, f);
        if (e.ImmuneTags)
          for (const s of e.ImmuneTags.values())
            this.epa(this.TagImmuneListenerDict, s, f);
        var i = t.GetInstigatorBuffComponent(),
          r = this.Entity.GetComponent(0)?.GetCreatureDataId();
        if (i && r) {
          for (const a of this.GetInvolvedInstigatorTags(e))
            i.tpa(i.VictimTagListenerDict, a, r, f);
          for (const n of this.GetInvolvedInstigatorBuffIds(e))
            i.tpa(i.VictimBuffListenerDict, n, r, f);
        }
      }
    }
  }
  CheckWhenTagChanged(t) {
    this.BuffLock++;
    const e = this.TagListenerDict.get(t);
    var f = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
    if (e) {
      for (const d of [...e]) {
        var i = this.GetBuffByHandle(d);
        i &&
          this.CheckRemove(i.Config, i.GetInstigator()) &&
          this.RemoveBuffInner(d, -1, !0, `因为tag ${f}的变化触发`);
      }
      for (const v of [...e]) {
        var r,
          o = this.GetBuffByHandle(v);
        o
          ? (r = this.CheckActivate(o.Config, o.GetInstigator())) !==
              o.IsActive() && this.OnBuffActiveChanged(o, r)
          : this.epa(this.TagListenerDict, t, v);
      }
    }
    var s = this.VictimTagListenerDict.get(t);
    if (s) {
      for (const [B, e] of [...s])
        for (const l of [...e]) {
          var a =
              ModelManager_1.ModelManager.CreatureModel.GetEntity(
                B,
              )?.Entity?.GetComponent(192),
            n = a?.GetBuffByHandle(l);
          a &&
            n &&
            a.CheckRemove(n.Config, n.GetInstigator()) &&
            a.RemoveBuffInner(l, -1, !0, `因为施加者的tag ${f}的变化触发`);
        }
      for (const [C, e] of [...s])
        for (const _ of [...e]) {
          var u,
            h =
              ModelManager_1.ModelManager.CreatureModel.GetEntity(
                C,
              )?.Entity?.GetComponent(192),
            c = h?.GetBuffByHandle(_);
          h && c
            ? (u = h.CheckActivate(c.Config, c.GetInstigator())) !==
                c.IsActive() && h?.OnBuffActiveChanged(c, u)
            : this.tpa(this.VictimTagListenerDict, t, C, _);
        }
    }
    this.BuffLock--;
  }
  CheckWhenBuffChanged(t) {
    this.BuffLock++;
    var e = this.VictimBuffListenerDict.get(t);
    if (e) {
      for (var [f, i] of [...e])
        for (const c of [...i]) {
          var r =
              ModelManager_1.ModelManager.CreatureModel.GetEntity(
                f,
              )?.Entity?.GetComponent(192),
            o = r?.GetBuffByHandle(c);
          r &&
            o &&
            r.CheckRemove(o.Config, o.GetInstigator()) &&
            r.RemoveBuffInner(c, -1, !0, `因为施加者的buff ${t}的变化触发`);
        }
      for (var [s, a] of [...e])
        for (const d of [...a]) {
          var n,
            u =
              ModelManager_1.ModelManager.CreatureModel.GetEntity(
                s,
              )?.Entity?.GetComponent(192),
            h = u?.GetBuffByHandle(d);
          u && h
            ? (n = u.CheckActivate(h.Config, h.GetInstigator())) !==
                h.IsActive() && u?.OnBuffActiveChanged(h, n)
            : this.tpa(this.VictimBuffListenerDict, t, s, d);
        }
    }
  }
  IsPaused() {
    return !1;
  }
  RefreshTimeScale() {
    var t = this.GetTimeScale(),
      e = this.IsPaused();
    for (const f of this.BuffContainer.values()) f.OnTimeScaleChanged(t, e);
  }
  OnChangeTimeDilation() {
    return this.RefreshTimeScale(), !0;
  }
  NeedCheck(t) {
    return (
      !!t &&
      (t.Id === ActiveBuffConfigs_1.DYNAMIC_BUFF_ID || this.HasBuffAuthority())
    );
  }
  CheckAdd(t, e, f) {
    if (f) return !0;
    if (!t) return !1;
    if (!f && this.NeedCheck(t)) {
      const i = this.GetTagComponent();
      f = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity;
      const r = f?.GetComponent(188);
      if (
        t.Probability < CharacterAttributeTypes_1.PER_TEN_THOUSAND &&
        RandomSystem_1.default.GetRandomPercent() > t.Probability
      )
        return !1;
      if (!i) return !1;
      if (
        t.AddTagIgnores?.some((t) => i.HasTag(t)) ||
        t.AddTagRequirements?.some((t) => !i.HasTag(t))
      )
        return !1;
      if (this.CheckRemove(t, f)) return !1;
      if (
        t.RemoveTagIgnores &&
        0 < t.RemoveTagIgnores.length &&
        !t.RemoveTagIgnores.some((t) => i.HasTag(t))
      )
        return !1;
      e = t.RemoveTagExistAll ?? [];
      if (0 < e.length && e.every((t) => i.HasTag(t))) return !1;
      f = t.RemoveTagExistAny ?? [];
      if (0 < f.length && f.some((t) => i.HasTag(t))) return !1;
      if (
        r &&
        (t.AddInstigatorTagIgnores?.some((t) => r.HasTag(t)) ||
          t.AddInstigatorTagRequirements?.some((t) => !r.HasTag(t)))
      )
        return !1;
    }
    return !this.CheckImmune(t);
  }
  CheckImmune(t) {
    for (const i of this.TagImmuneListenerDict.keys())
      if (
        t.GrantedTags?.some((t) =>
          GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, i),
        )
      )
        for (const r of this.TagImmuneListenerDict.get(i).keys()) {
          var e = this.BuffContainer.get(r),
            f = e?.Config;
          if (f && e && e.IsValid() && e.IsActive() && t.GrantedTags) {
            f =
              GameplayTagUtils_1.GameplayTagUtils.HasAll(
                t.GrantedTags,
                f.ImmuneTags,
              ) &&
              !GameplayTagUtils_1.GameplayTagUtils.HasAny(
                t.GrantedTags,
                f.ImmuneTagIgnores,
              );
            if (e?.IsActive() && f) return !0;
          }
        }
    return !1;
  }
  HasTagRemoveCheck(t) {
    return (
      !!(
        t.RemoveTagIgnores?.length ||
        t.RemoveTagExistAll?.length ||
        t.RemoveTagExistAny?.length
      ) ||
      !!t.BuffAction?.some(
        (t) => 2 === t.Type || 1 === t.Type || 4 === t.Type || 3 === t.Type,
      )
    );
  }
  CheckRemoveAction(t, e) {
    if (t.BuffAction) {
      const f = e?.GetComponent(188),
        i = e?.GetComponent(192);
      for (const r of t.BuffAction)
        switch (r.Type) {
          case 2:
            if (f && r.Tags.every((t) => f.HasTag(t))) return !0;
            break;
          case 1:
            if (f && r.Tags.some((t) => f.HasTag(t))) return !0;
            break;
          case 4:
            if (f && r.Tags.every((t) => !f.HasTag(t))) return !0;
            break;
          case 3:
            if (f && r.Tags.some((t) => !f.HasTag(t))) return !0;
            break;
          case 10:
            if (i && r.Buffs.every((t) => i.HasActiveBuff(t))) return !0;
            break;
          case 9:
            if (i && r.Buffs.some((t) => i.HasActiveBuff(t))) return !0;
            break;
          case 12:
            if (i && r.Buffs.every((t) => !i.HasActiveBuff(t))) return !0;
            break;
          case 11:
            if (i && r.Buffs.some((t) => !i.HasActiveBuff(t))) return !0;
        }
    }
    return !1;
  }
  CheckInactivateAction(t, e) {
    if (t.BuffAction) {
      const f = e?.GetComponent(188),
        i = e?.GetComponent(192);
      for (const r of t.BuffAction)
        switch (r.Type) {
          case 6:
            if (f && r.Tags.every((t) => f.HasTag(t))) return !0;
            break;
          case 5:
            if (f && r.Tags.some((t) => f.HasTag(t))) return !0;
            break;
          case 8:
            if (f && r.Tags.every((t) => !f.HasTag(t))) return !0;
            break;
          case 7:
            if (f && r.Tags.some((t) => !f.HasTag(t))) return !0;
            break;
          case 14:
            if (i && r.Buffs.every((t) => i.HasActiveBuff(t))) return !0;
            break;
          case 13:
            if (i && r.Buffs.some((t) => i.HasActiveBuff(t))) return !0;
            break;
          case 16:
            if (i && r.Buffs.every((t) => !i.HasActiveBuff(t))) return !0;
            break;
          case 15:
            if (i && r.Buffs.some((t) => !i.HasActiveBuff(t))) return !0;
        }
    }
    return !1;
  }
  CheckRemove(t, e) {
    const f = this.GetTagComponent();
    var i, r;
    return f
      ? !!this.CheckRemoveAction(t, e) ||
          ((e =
            !!t.RemoveTagIgnores?.length &&
            !t.RemoveTagIgnores.some((t) => f.HasTag(t))),
          (i =
            !!t.RemoveTagExistAll?.length &&
            t.RemoveTagExistAll.every((t) => f.HasTag(t))),
          (r =
            !!t.RemoveTagExistAny?.length &&
            t.RemoveTagExistAny.some((t) => f.HasTag(t))),
          e) ||
          i ||
          r
      : !!this.HasTagRemoveCheck(t) &&
          (CombatLog_1.CombatLog.Warn(
            "Buff",
            this.Entity,
            "检查buff移除条件时找不到Tag组件，默认移除",
            ["buffId", t.Id],
          ),
          !0);
  }
  CheckActivate(t, e) {
    const f = this.GetTagComponent();
    return !(
      !f ||
      t.ActivateTagIgnores?.some((t) => f.HasTag(t)) ||
      t.ActivateTagRequirements?.some((t) => !f.HasTag(t)) ||
      this.CheckInactivateAction(t, e)
    );
  }
  SetBuffEffectCd(t, e, f) {
    let i = this.EffectTimeoutMap.get(t);
    i || this.EffectTimeoutMap.set(t, (i = new Map())),
      i.set(e, Time_1.Time.ServerStopTimeStamp + f);
  }
  GetBuffEffectCd(t, e) {
    t = this.EffectTimeoutMap.get(t)?.get(e) ?? 0;
    return Math.max(t - Time_1.Time.ServerStopTimeStamp, 0);
  }
  CreateAnimNotifyContentWithoutSkill() {
    var t,
      e = this.Entity.GetComponent(22);
    if (e && e.MontageTaskMessageId)
      return (
        (t = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
        SkillMessageController_1.SkillMessageController.AnimNotifyRequest(
          this.Entity,
          -1,
          -1,
          this.GetSkillComponent()?.PendingAnIndex ?? -1,
          e.MontageTaskMessageId,
          t,
        ),
        t
      );
    CombatLog_1.CombatLog.Error(
      "Buff",
      this.Entity,
      "CreateAnimNotifyContentWithoutSkill参数异常",
    );
  }
  CreateAnimNotifyContentWithSkill() {
    var e = this.GetSkillComponent()?.CurrentSkill;
    if (e) {
      var f = e.SkillId;
      let t = e.MontageContextId;
      t = t || e.CombatMessageId;
      var i,
        r,
        e = this.GetSkillComponent().PendingAnIndex;
      if (t && -1 !== e)
        return (
          (i =
            ModelManager_1.ModelManager.CombatMessageModel.GetCombatContext(t)
              ?.Z8n?.eVn ?? -1),
          (r = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
          SkillMessageController_1.SkillMessageController.AnimNotifyRequest(
            this.Entity,
            f,
            i,
            e,
            t,
            r,
          ),
          r
        );
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "CreateANCFromSkill", [
        "ANIndex",
        e,
      ]);
    }
  }
  CreateAnimNotifyContent(t, e) {
    if (
      (!t || !CharacterBuffIds_1.specialIgnoreBuff.includes(t)) &&
      (!e || !CharacterBuffIds_1.specialIgnoreBullet.includes(e))
    )
      return this.GetSkillComponent()?.CurrentSkill
        ? this.CreateAnimNotifyContentWithSkill()
        : this.CreateAnimNotifyContentWithoutSkill();
  }
  AddBuffFromAnimNotify(t, e, f) {
    t <= ActiveBuffConfigs_1.NULL_BUFF_ID
      ? CombatLog_1.CombatLog.Error(
          "Buff",
          this.Entity,
          "AddBuffFromAnimNotify不合法的buffId",
          ["buffId", t],
        )
      : ((f.PreMessageId = (e || this).CreateAnimNotifyContent(t)),
        this.AddBuff(t, f));
  }
  AddBuffFromAi(t, e, f) {
    (f.PreMessageId = t), this.AddBuff(e, f);
  }
  AddBuffForDebug(t, e) {
    e.Level =
      e.Level ??
      ModelManager_1.ModelManager.CreatureModel.GetEntity(e.InstigatorId)
        ?.Entity?.GetComponent(192)
        .GetBuffLevel(t);
    var f = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
        this.Entity.Id,
      ),
      i = new Protocol_1.Aki.Protocol.Pzn();
    (i.BVn = 0),
      (i.y8n =
        `@gmapplybuff ${f} ${t} ${e.InstigatorId} ` +
        (e.Level ?? ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL)),
      Net_1.Net.Call(29711, Protocol_1.Aki.Protocol.Pzn.create(i), () => {});
  }
  AddBuff(t, e) {
    t <= ActiveBuffConfigs_1.NULL_BUFF_ID
      ? CombatLog_1.CombatLog.Error(
          "Buff",
          this.Entity,
          "尝试添加buff时传入了不合法的buffId",
          ["buffId", t],
          ["创建者", e.InstigatorId],
          ["持有者", this.GetDebugName()],
        )
      : (e.PreMessageId ||
          (0, CharacterBuffIds_1.checkBuffInSpecialList)(t) ||
          CombatLog_1.CombatLog.Error(
            "Buff",
            this.Entity,
            "AddBuff No PreMessageId",
            ["buffId", t],
          ),
        (e.Level =
          e.Level ??
          ModelManager_1.ModelManager.CreatureModel.GetEntity(e.InstigatorId)
            ?.Entity?.GetComponent(192)
            .GetBuffLevel(t)),
        this.HasBuffAuthority()
          ? this.AddBuffLocal(t, e)
          : this.AddBuffOrder(t, e));
  }
  AddBuffLocal(
    t,
    {
      InstigatorId: e = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
      Level: f,
      OuterStackCount: i,
      ApplyType: r = Protocol_1.Aki.Protocol.oFs.Proto_Common,
      PreMessageId: o = void 0,
      MessageId: s = void 0,
      Duration: a = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
      ServerId: n = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
      IsIterable: u = !0,
      IsServerOrder: h = !1,
      Reason: c,
    },
  ) {
    var d, v;
    return this.HasBuffAuthority()
      ? (d = require("./CharacterBuffController").default.GetBuffDefinition(t))
        ? ((v =
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              e,
            )?.Entity?.GetComponent(192)),
          (f =
            f ?? v?.GetBuffLevel(t) ?? ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL),
          this.AddBuffInner(
            t,
            d,
            e,
            f,
            i,
            r,
            o,
            s,
            a,
            void 0,
            n,
            c,
            !1,
            u,
            h,
            void 0,
          ))
        : ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
      : (CombatLog_1.CombatLog.Warn(
          "Buff",
          this.Entity,
          "[local] 模拟端不本地添加buff",
          ["buffId", t],
          ["施加者", e],
          ["持有者", this.GetDebugName()],
          ["前置行为id", o],
          ["原因", c],
        ),
        ActiveBuffConfigs_1.INVALID_BUFF_HANDLE);
  }
  AddBuffOrder(t, e) {}
  AddBuffRemote(
    t,
    e,
    {
      InstigatorId: f = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
      Level: i = ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL,
      OuterStackCount: r = void 0,
      ApplyType: o = Protocol_1.Aki.Protocol.oFs.Proto_Common,
      PreMessageId: s = void 0,
      MessageId: a = void 0,
      Duration: n = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
      RemainDuration: u,
      ServerId: h = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
      IsActive: c,
      Reason: d,
    },
  ) {
    var v = require("./CharacterBuffController").default,
      v = this.AddBuffInner(
        t,
        v.GetBuffDefinition(t),
        f,
        i,
        r,
        o,
        s,
        a,
        n,
        c,
        h,
        d,
        !0,
        !0,
        !1,
        e,
      ),
      t = this.BuffContainer.get(v);
    t && this.HasBuffAuthority() && void 0 !== u && t.SetRemainDuration(u);
  }
  AddIterativeBuff(t, e, f, i, r) {
    e
      ? this.AddBuff(t, {
          InstigatorId:
            e.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
          Level: e.Level,
          PreMessageId: e.MessageId,
          ServerId: e.ServerId,
          OuterStackCount: f,
          IsIterable: i,
          Reason: r,
        })
      : CombatLog_1.CombatLog.Error(
          "Buff",
          this.Entity,
          "尝试添加迭代buff失败，未找到前置buff",
          ["buffId", t],
          ["持有者", this.GetDebugName()],
          ["原因", r],
        );
  }
  static GetBuffStat(t) {
    return this.Ebr.has(t) || this.Ebr.set(t, void 0), this.Ebr.get(t);
  }
  AddBuffInner(t, e, f, i, r, o, s, a, n, u, h, c, d, v, B, l) {
    BaseBuffComponent_1.GetBuffStat(t);
    this.BuffLock++;
    var C = [
      ["buffId", t],
      ["创建者id", f],
      ["持有者", this.GetDebugName()],
      ["原因", c],
    ];
    if (!e)
      return (
        CombatLog_1.CombatLog.Error(
          "Buff",
          this.Entity,
          "[local] 添加buff时找不到配置",
          ...C,
        ),
        this.BuffLock--,
        ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
      );
    if (
      ((o = o ?? Protocol_1.Aki.Protocol.oFs.Proto_Common) !==
        Protocol_1.Aki.Protocol.oFs.Proto_Common ||
        this.NeedCheck(e) ||
        (n = -1),
      !this.CheckAdd(e, f ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, d))
    )
      return this.BuffLock--, ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    t = this.GetStackableBuff(
      f ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
      t,
      e.StackingType,
    );
    let _ = r && 0 < r ? r : e.DefaultStackCount;
    if (!t) {
      let t = void 0;
      0 === e.DurationPolicy
        ? ((l = ActiveBuffConfigs_1.SUCCESS_INSTANT_BUFF_HANDLE),
          (n = ActiveBuffConfigs_1.INFINITY_DURATION),
          (_ = 1))
        : (l =
            l ?? require("./CharacterBuffController").default.GenerateHandle());
      try {
        t = ActiveBuff_1.ActiveBuffInternal.AllocBuff(
          e,
          l,
          f,
          this,
          h,
          s,
          a,
          i,
          _,
          n,
        );
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack(
          "Buff",
          this.Entity,
          "Buff初始过程中发生异常",
          t,
          ...C,
        );
      }
      if (!t) return this.BuffLock--, ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
      0 < t.Id &&
        CombatLog_1.CombatLog.Info(
          "Buff",
          this.Entity,
          "本地添加buff",
          ...C,
          ["handle", l],
          ["前置行为id", s],
          ["说明", e.Desc],
          ["是否迭代", v],
        );
      try {
        this.OnBuffAdded(t, r, o, s, n, u, h, d, v, B, c);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack(
          "Buff",
          this.Entity,
          "Buff添加中发生异常",
          t,
          ...C,
        );
      }
      return (
        0 === e.DurationPolicy &&
          ActiveBuff_1.ActiveBuffInternal.ReleaseBuff(t),
        this.BuffLock--,
        l
      );
    }
    if (
      t.Config &&
      (t.Config.StackLimitCount <= 0 ||
        !t.Config.DenyOverflowAdd ||
        t.StackCount < t.Config.StackLimitCount)
    ) {
      0 < e.StackAppendCount && (_ = e.StackAppendCount);
      (a = 0 < e.StackLimitCount ? e.StackLimitCount : 1 / 0),
        (u = t.StackCount),
        (d = Math.min(u + _, a));
      try {
        this.OnBuffStackIncreased(
          t,
          u,
          d,
          f ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
          i,
          r,
          o,
          s,
          n,
          h,
          v,
          B,
          c,
        ),
          this.BuffEffectManager.ApplyInitBuffExecution(t, v);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack(
          "Buff",
          this.Entity,
          "Buff层数改变中发生异常",
          t,
          ...C,
        );
      }
    }
    return this.BuffLock--, t.Handle;
  }
  RemoveBuff(t, e, f, i, r) {
    this.HasBuffAuthority()
      ? this.RemoveBuffLocal(t, e, f, i, r)
      : this.RemoveBuffOrder(t, e, f);
  }
  RemoveBuffOrder(t, e, f) {}
  RemoveBuffLocal(t, e, f, i, r) {
    var o;
    return t <= ActiveBuffConfigs_1.NULL_BUFF_ID
      ? (CombatLog_1.CombatLog.Error(
          "Buff",
          this.Entity,
          "尝试本地移除buff时传入了不合法的buffId",
          ["buffId", t],
          ["持有者", this.GetDebugName()],
          ["原因", f],
        ),
        0)
      : this.HasBuffAuthority()
        ? (o = this.GetBuffById(t))
          ? this.RemoveBuffInner(o.Handle, e, !0, f, i, r)
          : 0
        : (CombatLog_1.CombatLog.Error(
            "Buff",
            this.Entity,
            "无法直接移除非本端控制实体持有的buff，请换用RemoveBuff接口",
            ["buffId", t],
            ["持有者", this.GetDebugName()],
            ["原因", f],
          ),
          0);
  }
  RemoveBuffByTagLocal(e, t) {
    if (this.HasBuffAuthority()) {
      var f = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
      for (const i of this.BuffContainer.values())
        i.Config.GrantedTags?.some((t) =>
          GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, e),
        ) && this.RemoveBuffInner(i.Handle, -1, !0, t ?? "移除tag " + f);
    } else
      CombatLog_1.CombatLog.Warn(
        "Buff",
        this.Entity,
        "尝试根据tag移除非本地控制的实体的buff，移除操作将不被执行",
        ["tagId", e],
        ["tagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)],
        ["持有者", this.GetDebugName()],
        ["原因", t],
      );
  }
  RemoveBuffByEffectType(t, e) {
    var f = new Set(),
      i = require("./ExtraEffect/ExtraEffectDefine")?.getBuffEffectClass(t);
    if (i) {
      for (const r of this.BuffEffectManager.GetAllEffects())
        r instanceof i && f.add(r.BuffId);
      for (const o of f.values()) this.RemoveBuff(o, -1, e);
    }
  }
  RemoveBuffByHandle(t, e = -1, f, i, r) {
    var o;
    return (
      this.HasBuffAuthority() ||
        ((o = this.GetBuffByHandle(t)) &&
          0 < o.Id &&
          CombatLog_1.CombatLog.Warn(
            "Buff",
            this.Entity,
            "尝试直接通过handle移除非本端控制buff，后续需要新增协议",
            ["buffId", o?.Id],
            ["handle", t],
            ["持有者", this.GetDebugName()],
            ["说明", o?.Config?.Desc],
            ["原因", f],
          )),
      this.RemoveBuffByHandleLocal(t, e, f, i, r)
    );
  }
  RemoveBuffByHandleLocal(t, e = -1, f, i, r) {
    return this.RemoveBuffInner(t, e, !0, f, i, r);
  }
  RemoveBuffWhenTimeout(t) {
    var e = t.Config.StackExpirationRemoveNumber;
    this.RemoveBuffInner(t.Handle, e, !1, "时间结束自然移除"),
      0 < e && t.IsValid() && t.SetDuration();
  }
  RemoveBuffInner(t, e, f, i, r, o) {
    t = this.GetBuffByHandle(t);
    if (!t) return 0;
    this.BuffLock++;
    var s = [
        ["buffId", t.Id],
        ["持有者", this.GetDebugName()],
        ["handle", t?.Handle],
        ["说明", t?.Config.Desc],
        ["原因", i],
      ],
      a =
        (0 < t.Id &&
          CombatLog_1.CombatLog.Info("Buff", this.Entity, "本地移除buff", ...s),
        t.StackCount),
      e = e <= 0 ? 0 : Math.max(0, a - e);
    if (e <= 0)
      try {
        this.OnBuffRemoved(t, f, i, o, r);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack(
          "Buff",
          this.Entity,
          "Buff移除时发生异常",
          t,
          ...s,
        );
      }
    else
      try {
        this.OnBuffStackDecreased(t, a, e, f, i);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack(
          "Buff",
          this.Entity,
          "Buff层数降低时发生异常",
          t,
          ...s,
        );
      }
    return this.BuffLock--, a - e;
  }
  GetAllBuffs() {
    var t = [];
    for (const e of this.BuffContainer.values())
      this.BuffGarbageSet.has(e.Handle) || t.push(e);
    return t;
  }
  GetBuffByHandle(t) {
    if (!this.BuffGarbageSet.has(t)) return this.BuffContainer.get(t);
  }
  HasActiveBuff(t) {
    return void 0 !== this.GetActiveBuffById(t);
  }
  HasBuff(t) {
    return void 0 !== this.GetBuffById(t);
  }
  GetActiveBuffById(t) {
    for (const e of this.BuffContainer.values())
      if (e.Id === t && e.IsActive() && !this.BuffGarbageSet.has(e.Handle))
        return e;
  }
  GetBuffById(t) {
    for (const e of this.BuffContainer.values())
      if (e.Id === t && !this.BuffGarbageSet.has(e.Handle)) return e;
  }
  GetBuffLevel(t) {}
  GetStackableBuff(t, e, f) {
    switch (f) {
      case 2:
        for (const i of this.BuffContainer.values())
          if (i.Id === e && !this.BuffGarbageSet.has(i.Handle)) return i;
        return;
      case 1:
        for (const r of this.BuffContainer.values())
          if (
            r.Id === e &&
            !this.BuffGarbageSet.has(r.Handle) &&
            r.InstigatorId === t
          )
            return r;
        return;
      default:
        return;
    }
  }
  GetBuffTotalStackById(t, e = !1) {
    let f = 0;
    for (const i of this.BuffContainer.values())
      i.Id !== t ||
        this.BuffGarbageSet.has(i.Handle) ||
        (e && !i.IsActive()) ||
        (f += i.StackCount);
    return f;
  }
  OnBuffAdded(t, e, f, i, r, o, s, a, n, u, h) {
    if (t) {
      var c = t.Config;
      if (t.IsInstantBuff()) {
        this.ApplyPeriodExecution(t);
        var d = this.GetExactEntity()?.GetComponent(188);
        if (d) {
          for (const B of c.GrantedTags ?? []) d?.AddTag(B);
          for (const l of c.GrantedTags ?? []) d?.RemoveTag(l);
        }
      } else {
        var v = t.Handle;
        this.BuffContainer.set(v, t),
          this.MarkListenerBuff(t),
          this.BuffEffectManager.OnBuffAdded(t);
      }
      this.NeedCheck(t.Config)
        ? this.OnBuffActiveChanged(
            t,
            o ?? this.CheckActivate(t.Config, t.GetInstigator()),
          )
        : void 0 === o
          ? CombatLog_1.CombatLog.Error(
              "Buff",
              this.Entity,
              "buff激活状态未知",
              ["buffId", t.Id],
              ["handle", t.Handle],
            )
          : this.OnBuffActiveChanged(t, o),
        t.IsActive() &&
          c &&
          0 < c.Period &&
          c.ExecutePeriodicOnAdd &&
          t.ResetPeriodTimer(
            TimerSystem_1.MIN_TIME * CommonDefine_1.SECOND_PER_MILLIONSECOND,
          ),
        Info_1.Info.IsBuildDevelopmentOrDebug &&
          (this.Entity.GetComponent(24)?.OnBuffAdded(t),
          this.Entity.GetComponent(20)?.OnBuffAdded(t)),
        this.CheckWhenBuffChanged(t.Id),
        this.BuffEffectManager.ApplyInitBuffExecution(t, n),
        t.OnTimeScaleChanged(this.GetTimeScale(), this.IsPaused());
    }
  }
  ApplyPeriodExecution(t) {
    var e = t.Config,
      f = t.GetInstigatorAttributeSet();
    if (e.Modifiers && 0 < e.Modifiers.length) {
      var i = this.GetAttributeComponent();
      if (i) {
        var r,
          o,
          s = this.GetTimeScale();
        for ([r, o] of t.StateModifiers)
          this.HasBuffAuthority() &&
            ActiveBuff_1.ActiveBuffInternal.ModifyStateAttribute(
              f,
              i,
              r,
              t.Level,
              s,
              o,
            );
      } else
        CombatLog_1.CombatLog.Warn(
          "Buff",
          this.Entity,
          "周期buff尝试修改属性，但owner不存在",
          ["buffId", t.Id],
          ["handle", t.Handle],
          ["持有者", t.GetOwnerBuffComponent()?.GetDebugName()],
          ["施加者", t.InstigatorId],
        );
    }
    this.BuffEffectManager?.ApplyPeriodBuffExecution(t);
    for (const a of this.BuffEffectManager?.GetEffectsByHandle(t.Handle) ?? [])
      a.OnPeriodCallback();
  }
  OnBuffRemoved(t, e, f, i, r) {
    if (t) {
      var o = t.Handle,
        o =
          (this.RemoveListenerBuff(t),
          this.BuffGarbageSet.add(o),
          t.Destroy(),
          this.CheckWhenBuffChanged(t.Id),
          this.BuffEffectManager.OnBuffRemoved(t, e),
          t.GetInstigatorBuffComponent());
      if ((void 0 === o || o.Valid) && this.HasBuffAuthority()) {
        o = e
          ? t.Config?.PrematureExpirationEffects
          : t.Config?.RoutineExpirationEffects;
        if (o)
          for (const s of o)
            this.AddIterativeBuff(
              s,
              t,
              void 0,
              !0,
              `因为Buff${t.Id}移除导致的添加`,
            );
      }
    }
  }
  OnBuffStackDecreased(t, e, f, i, r) {
    t &&
      (t.SetStackCount(f),
      this.CheckWhenBuffChanged(t.Id),
      this.BuffEffectManager.OnStackDecreased(t, f, e, i));
  }
  OnBuffStackIncreased(t, e, f, i, r, o, s, a, n, u, h, c, d) {
    if (t) {
      t.SetStackCount(f),
        0 !== t.Config.StackDurationRefreshPolicy ||
          (!this.NeedCheck(t.Config) &&
            s === Protocol_1.Aki.Protocol.oFs.Proto_Common) ||
          t.SetDuration(n);
      var s = t.Config,
        v = t.Handle;
      if (
        s &&
        (t.Id,
        this.BuffEffectManager.OnStackIncreased(t, f, e, i),
        this.HasBuffAuthority())
      ) {
        n = 0 < s.StackLimitCount ? s.StackLimitCount : 1 / 0;
        if (n <= e && n <= f) {
          i = s.OverflowEffects;
          if (i && 0 < i.length)
            for (const B of i)
              this.AddIterativeBuff(
                B,
                t,
                void 0,
                !0,
                `Buff层数溢出时迭代添加新buff（前置buff Id=${t.Id}, handle=${v}）`,
              );
          t.Config.ClearStackOnOverflow &&
            this.RemoveBuffByHandle(v, -1, "Buff层数溢出时清除");
        }
      }
    }
  }
  OnBuffActiveChanged(t, e) {
    t &&
      (t.SetActivate(e),
      this.CheckWhenBuffChanged(t.Id),
      this.BuffEffectManager.OnBuffInhibitedChanged(t, !e));
  }
  OnTagChanged(t) {
    this.CheckWhenTagChanged(t);
  }
  get BuffLock() {
    return this.Mbr;
  }
  set BuffLock(t) {
    if ((this.Mbr = t) <= 0 && 0 < this.BuffGarbageSet.size) {
      for (const f of this.BuffGarbageSet) {
        var e = this.BuffContainer.get(f);
        this.BuffContainer.delete(f),
          ActiveBuff_1.ActiveBuffInternal.ReleaseBuff(e);
      }
      this.BuffGarbageSet.clear();
    }
  }
  AddTrigger(t, e, f) {
    let i = this.TriggerMap.get(e);
    i || this.TriggerMap.set(e, (i = [])), i.push(f);
  }
  RemoveTrigger(e, t) {
    var f,
      t = this.TriggerMap.get(t);
    t &&
      -1 !== (f = t.findIndex((t) => t.ActiveHandleId === e)) &&
      t.splice(f, 1);
  }
  TriggerEvents(t, e, f) {
    t = this.TriggerMap.get(t);
    if (t && e) for (const i of [...t]) i.TryExecute(f, e);
  }
  HasBuffTrigger(t) {
    return this.TriggerMap.has(t);
  }
  AddGameplayCue(t, e, f) {
    var i;
    return !t || t.length <= 0
      ? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
      : (((i =
          require("./CharacterBuffController").default.CreateDynamicBuffRef()).GameplayCueIds =
          t),
        (i.Desc = f),
        (i.DurationPolicy = 0 === e ? 0 : e < 0 ? 1 : 2),
        0 < e &&
          ((i.DurationCalculationPolicy = [0]), (i.DurationMagnitude = [e])),
        this.AddBuffInner(
          ActiveBuffConfigs_1.DYNAMIC_BUFF_ID,
          i,
          void 0,
          1,
          void 0,
          Protocol_1.Aki.Protocol.oFs.Proto_Common,
          void 0,
          void 0,
          e,
          void 0,
          ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
          f,
          !1,
          !0,
          !1,
          void 0,
        ));
  }
});
(BaseBuffComponent.Ebr = new Map()),
  (BaseBuffComponent.Sbr = void 0),
  __decorate(
    [(0, Stats_1.statDecorator)("AddBuff_Local")],
    BaseBuffComponent.prototype,
    "AddBuffLocal",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("AddBuffInner_FindStackable")],
    BaseBuffComponent.prototype,
    "GetStackableBuff",
    null,
  ),
  (BaseBuffComponent = BaseBuffComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(192)],
      BaseBuffComponent,
    )),
  (exports.BaseBuffComponent = BaseBuffComponent);
//# sourceMappingURL=BaseBuffComponent.js.map
