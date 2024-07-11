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
        for (var n = t.length - 1; 0 <= n; n--)
          (r = t[n]) &&
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
  CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
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
      (this.EffectTimeoutMap = new Map()),
      (this.jbr = 0),
      (this.InitLockInternal = 0),
      (this.TriggerMap = new Map());
  }
  GetDebugName() {
    return "";
  }
  OnClear() {
    return (
      this.BuffEffectManager?.Clear(),
      this.BuffContainer.clear(),
      this.BuffGarbageSet.clear(),
      this.EffectTimeoutMap.clear(),
      !0
    );
  }
  OnTick(t) {
    return (this.BuffLock = 0), !(this.InitLock = 0);
  }
  NeedBroadcastBuff(t = 0) {
    return !(0 < this.InitLock) && this.HasBuffAuthority();
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
  MarkListenerBuff(t) {
    if (this.NeedCheck(t.Config)) {
      var e = t.Config;
      if (e) {
        var f = t.Handle;
        for (const i of [
          e.ActivateTagRequirements,
          e.ActivateTagIgnores,
          e.RemoveTagExistAll,
          e.RemoveTagExistAny,
          e.RemoveTagIgnores,
        ])
          if (i && !(i.length <= 0))
            for (const r of i.values()) {
              let t = this.TagListenerDict.get(r);
              t || this.TagListenerDict.set(r, (t = new Set())), t.add(f);
            }
        if (e.ImmuneTags && 0 < e.ImmuneTags.length)
          for (const o of e.ImmuneTags.values()) {
            let t = this.TagImmuneListenerDict.get(o);
            t || this.TagImmuneListenerDict.set(o, (t = new Set())), t.add(f);
          }
      }
    }
  }
  RemoveListenerBuff(t) {
    if (this.NeedCheck(t.Config)) {
      var e = t.Config;
      if (e) {
        var f = t.Handle;
        for (const o of [
          e.ActivateTagRequirements,
          e.ActivateTagIgnores,
          e.RemoveTagExistAll,
          e.RemoveTagExistAny,
          e.RemoveTagIgnores,
        ])
          if (o && !(o.length <= 0))
            for (const s of o.values()) {
              var i = this.TagListenerDict.get(s);
              i && (i.delete(f), i.size <= 0) && this.TagListenerDict.delete(s);
            }
        if (e.ImmuneTags && 0 < e.ImmuneTags.length)
          for (const n of e.ImmuneTags.values()) {
            var r = this.TagImmuneListenerDict.get(n);
            r &&
              (r.delete(f), r.size <= 0) &&
              this.TagImmuneListenerDict.delete(n);
          }
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
    if (0 < this.InitLock) return !0;
    if (!t) return !1;
    if (!f && this.NeedCheck(t)) {
      const i = this.GetTagComponent(),
        r =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(
            e,
          )?.Entity?.GetComponent(185);
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
      if (this.CheckRemove(t)) return !1;
      if (
        t.RemoveTagIgnores &&
        0 < t.RemoveTagIgnores.length &&
        !t.RemoveTagIgnores.some((t) => i.HasTag(t))
      )
        return !1;
      f = t.RemoveTagExistAll ?? [];
      if (0 < f.length && f.every((t) => i.HasTag(t))) return !1;
      e = t.RemoveTagExistAny ?? [];
      if (0 < e.length && e.some((t) => i.HasTag(t))) return !1;
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
  CheckRemove(t) {
    const e = this.GetTagComponent();
    var f, i, r;
    return e
      ? ((f =
          !!t.RemoveTagIgnores?.length &&
          !t.RemoveTagIgnores.some((t) => e.HasTag(t))),
        (i =
          !!t.RemoveTagExistAll?.length &&
          t.RemoveTagExistAll.every((t) => e.HasTag(t))),
        (r =
          !!t.RemoveTagExistAny?.length &&
          t.RemoveTagExistAny.some((t) => e.HasTag(t))),
        f || i || r)
      : !(
          t.RemoveTagIgnores?.length &&
          t.RemoveTagExistAll?.length &&
          t.RemoveTagExistAny?.length
        );
  }
  CheckActivate(t) {
    const e = this.GetTagComponent();
    return (
      !!e &&
      !t.ActivateTagIgnores?.some((t) => e.HasTag(t)) &&
      !t.ActivateTagRequirements?.some((t) => !e.HasTag(t))
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
    CombatDebugController_1.CombatDebugController.CombatError(
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
            ModelManager_1.ModelManager.CombatMessageModel.GetCombatContext(
              t,
            )?.v4n) ||
            CombatDebugController_1.CombatDebugController.CombatDebug(
              "Buff",
              this.Entity,
              "CreateAnimNotifyContent AnimSequenceAN",
            ),
          (i = i?.M4n ?? -1),
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
      CombatDebugController_1.CombatDebugController.CombatError(
        "Buff",
        this.Entity,
        "CreateANCFromSkill",
        ["ANIndex", e],
      );
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
      ? CombatDebugController_1.CombatDebugController.CombatError(
          "Buff",
          this.Entity,
          "AddBuffFromAnimNotify不合法的buffId",
          ["buffId", t],
        )
      : ((f.PreMessageId = (e || this).CreateAnimNotifyContent(t)),
        this.AddBuff(t, f));
  }
  AddBuffFromAi(t, e, f) {
    t ||
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "Buff",
        this.Entity,
        "AddBuffFromAI No preContextId",
      ),
      (f.PreMessageId = t),
      this.AddBuff(e, f);
  }
  AddBuffForDebug(t, e) {
    e.Level =
      e.Level ??
      ModelManager_1.ModelManager.CreatureModel.GetEntity(e.InstigatorId)
        ?.Entity?.GetComponent(187)
        .GetBuffLevel(t);
    var f = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
        this.Entity.Id,
      ),
      i = new Protocol_1.Aki.Protocol.qQn();
    (i.Z4n = 0),
      (i.H3n =
        `@gmapplybuff ${f} ${t} ${e.InstigatorId} ` +
        (e.Level ?? ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL)),
      Net_1.Net.Call(28935, Protocol_1.Aki.Protocol.qQn.create(i), () => {});
  }
  AddBuff(t, e) {
    t <= ActiveBuffConfigs_1.NULL_BUFF_ID
      ? CombatDebugController_1.CombatDebugController.CombatError(
          "Buff",
          this.Entity,
          "尝试添加buff时传入了不合法的buffId",
          ["buffId", t],
          ["创建者", e.InstigatorId],
          ["持有者", this.GetDebugName()],
        )
      : (e.PreMessageId ||
          (0, CharacterBuffIds_1.checkBuffInSpecialList)(t) ||
          CombatDebugController_1.CombatDebugController.CombatError(
            "Buff",
            this.Entity,
            "AddBuff No PreMessageId",
            ["buffId", t],
          ),
        (e.Level =
          e.Level ??
          ModelManager_1.ModelManager.CreatureModel.GetEntity(e.InstigatorId)
            ?.Entity?.GetComponent(187)
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
      ApplyType: r = Protocol_1.Aki.Protocol.CGs.Proto_Common,
      PreMessageId: o = void 0,
      MessageId: s = void 0,
      Duration: n = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
      ServerId: u = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
      IsIterable: a = !0,
      IsServerOrder: h = !1,
      Reason: l,
    },
  ) {
    var C, c;
    return this.HasBuffAuthority()
      ? (C = require("./CharacterBuffController").default.GetBuffDefinition(t))
        ? ((c =
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              e,
            )?.Entity?.GetComponent(187)),
          (f =
            f ?? c?.GetBuffLevel(t) ?? ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL),
          this.AddBuffInner(
            t,
            C,
            e,
            f,
            i,
            r,
            o,
            s,
            n,
            void 0,
            u,
            l,
            !1,
            a,
            h,
            void 0,
          ))
        : ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
      : (CombatDebugController_1.CombatDebugController.CombatWarn(
          "Buff",
          this.Entity,
          "[local] 模拟端不本地添加buff",
          ["buffId", t],
          ["施加者", e],
          ["持有者", this.GetDebugName()],
          ["前置行为id", o],
          ["原因", l],
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
      ApplyType: o = Protocol_1.Aki.Protocol.CGs.Proto_Common,
      PreMessageId: s = void 0,
      MessageId: n = void 0,
      Duration: u = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
      RemainDuration: a,
      ServerId: h = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
      IsActive: l,
      Reason: C,
    },
  ) {
    var c = require("./CharacterBuffController").default,
      c = this.AddBuffInner(
        t,
        c.GetBuffDefinition(t),
        f,
        i,
        r,
        o,
        s,
        n,
        u,
        l,
        h,
        C,
        !0,
        !0,
        !1,
        e,
      ),
      t = this.BuffContainer.get(c);
    t && this.HasBuffAuthority() && void 0 !== a && t.SetRemainDuration(a);
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
      : CombatDebugController_1.CombatDebugController.CombatError(
          "Buff",
          this.Entity,
          "尝试添加迭代buff失败，未找到前置buff",
          ["buffId", t],
          ["持有者", this.GetDebugName()],
          ["原因", r],
        );
  }
  static GetBuffStat(t) {
    return this.Wbr.has(t) || this.Wbr.set(t, void 0), this.Wbr.get(t);
  }
  AddBuffInner(t, e, f, i, r, o, s, n, u, a, h, l, C, c, B, d) {
    BaseBuffComponent_1.GetBuffStat(t);
    this.BuffLock++;
    var m = [
      ["buffId", t],
      ["创建者id", f],
      ["持有者", this.GetDebugName()],
      ["原因", l],
    ];
    if (!e)
      return (
        CombatDebugController_1.CombatDebugController.CombatError(
          "Buff",
          this.Entity,
          "[local] 添加buff时找不到配置",
          ...m,
        ),
        this.BuffLock--,
        ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
      );
    if (
      ((o = o ?? Protocol_1.Aki.Protocol.CGs.Proto_Common) !==
        Protocol_1.Aki.Protocol.CGs.Proto_Common ||
        this.NeedCheck(e) ||
        (u = -1),
      !this.CheckAdd(e, f ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, C))
    )
      return this.BuffLock--, ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    C = this.GetStackableBuff(
      f ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
      t,
      e.StackingType,
    );
    let _ = r && 0 < r ? r : e.DefaultStackCount;
    if (!C) {
      let t = void 0;
      0 === e.DurationPolicy
        ? ((d = ActiveBuffConfigs_1.SUCCESS_INSTANT_BUFF_HANDLE),
          (u = ActiveBuffConfigs_1.INFINITY_DURATION),
          (_ = 1))
        : (d =
            d ?? require("./CharacterBuffController").default.GenerateHandle());
      try {
        t = ActiveBuff_1.ActiveBuffInternal.AllocBuff(
          e,
          d,
          f,
          this,
          h,
          s,
          n,
          i,
          _,
          u,
        );
      } catch (t) {
        CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
          "Buff",
          this.Entity,
          "Buff初始过程中发生异常",
          t,
          ...m,
        );
      }
      if (!t) return this.BuffLock--, ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
      0 < t.Id &&
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "Buff",
          this.Entity,
          "本地添加buff",
          ...m,
          ["handle", d],
          ["前置行为id", s],
          ["说明", e.Desc],
          ["是否迭代", c],
        );
      try {
        this.OnBuffAdded(t, r, o, s, u, a, h, c, B, l);
      } catch (t) {
        CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
          "Buff",
          this.Entity,
          "Buff添加中发生异常",
          t,
          ...m,
        );
      }
      return (
        0 === e.DurationPolicy &&
          ActiveBuff_1.ActiveBuffInternal.ReleaseBuff(t),
        this.BuffLock--,
        d
      );
    }
    if (
      C.Config &&
      (C.Config.StackLimitCount <= 0 ||
        !C.Config.DenyOverflowAdd ||
        C.StackCount < C.Config.StackLimitCount)
    ) {
      0 < e.StackAppendCount && (_ = e.StackAppendCount);
      (t = 0 < e.StackLimitCount ? e.StackLimitCount : 1 / 0),
        (n = C.StackCount),
        (a = Math.min(n + _, t));
      try {
        this.OnBuffStackIncreased(
          C,
          n,
          a,
          f ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
          i,
          r,
          o,
          s,
          u,
          h,
          c,
          B,
          l,
        ),
          this.BuffEffectManager.ApplyInitBuffExecution(C, c);
      } catch (t) {
        CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
          "Buff",
          this.Entity,
          "Buff层数改变中发生异常",
          t,
          ...m,
        );
      }
    }
    return this.BuffLock--, C.Handle;
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
      ? (CombatDebugController_1.CombatDebugController.CombatError(
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
        : (CombatDebugController_1.CombatDebugController.CombatError(
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
      CombatDebugController_1.CombatDebugController.CombatWarn(
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
          CombatDebugController_1.CombatDebugController.CombatWarn(
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
      n =
        (0 < t.Id &&
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Buff",
            this.Entity,
            "本地移除buff",
            ...s,
          ),
        t.StackCount),
      e = e <= 0 ? 0 : Math.max(0, n - e);
    if (e <= 0)
      try {
        this.OnBuffRemoved(t, f, i, o, r);
      } catch (t) {
        CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
          "Buff",
          this.Entity,
          "Buff移除时发生异常",
          t,
          ...s,
        );
      }
    else
      try {
        this.OnBuffStackDecreased(t, n, e, f, i);
      } catch (t) {
        CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
          "Buff",
          this.Entity,
          "Buff层数降低时发生异常",
          t,
          ...s,
        );
      }
    return this.BuffLock--, n - e;
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
  OnBuffAdded(t, e, f, i, r, o, s, n, u, a) {
    if (t) {
      var h = t.Config;
      if (t.IsInstantBuff()) {
        this.ApplyPeriodExecution(t);
        var l = this.GetExactEntity()?.GetComponent(185);
        if (l) {
          for (const c of h.GrantedTags ?? []) l?.AddTag(c);
          for (const B of h.GrantedTags ?? []) l?.RemoveTag(B);
        }
      } else {
        var C = t.Handle;
        this.BuffContainer.set(C, t),
          this.MarkListenerBuff(t),
          this.BuffEffectManager.OnBuffAdded(t);
      }
      this.NeedCheck(t.Config)
        ? this.OnBuffActiveChanged(t, o ?? this.CheckActivate(t.Config))
        : void 0 === o
          ? CombatDebugController_1.CombatDebugController.CombatError(
              "Buff",
              this.Entity,
              "buff激活状态未知",
              ["buffId", t.Id],
              ["handle", t.Handle],
            )
          : this.OnBuffActiveChanged(t, o),
        t.IsActive() &&
          h &&
          0 < h.Period &&
          h.ExecutePeriodicOnAdd &&
          t.ResetPeriodTimer(
            TimerSystem_1.MIN_TIME * CommonDefine_1.SECOND_PER_MILLIONSECOND,
          ),
        Info_1.Info.IsBuildDevelopmentOrDebug &&
          (this.Entity.GetComponent(24)?.OnBuffAdded(t),
          this.Entity.GetComponent(20)?.OnBuffAdded(t)),
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
        CombatDebugController_1.CombatDebugController.CombatWarn(
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
    for (const n of this.BuffEffectManager?.GetEffectsByHandle(t.Handle) ?? [])
      n.OnPeriodCallback();
  }
  OnBuffRemoved(t, e, f, i, r) {}
  OnBuffStackDecreased(t, e, f, i, r) {
    t &&
      (t.SetStackCount(f),
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "Buff",
        this.Entity,
        "[buffComp] Buff层数降低",
        ["handle", t.Handle],
        ["buffId", t.Id],
        ["创建者", t.InstigatorId],
        ["持有者", t.GetOwnerDebugName()],
        ["说明", t.Config?.Desc],
        ["oldStack", e],
        ["newStack", t.StackCount],
        ["原因", r],
      ),
      this.BuffEffectManager.OnStackDecreased(t, f, e, i));
  }
  OnBuffStackIncreased(t, e, f, i, r, o, s, n, u, a, h, l, C) {
    if (t) {
      t.SetStackCount(f),
        0 !== t.Config.StackDurationRefreshPolicy ||
          (!this.NeedCheck(t.Config) &&
            s === Protocol_1.Aki.Protocol.CGs.Proto_Common) ||
          t.SetDuration(u);
      var s = t.Config,
        c = t.Handle;
      if (
        s &&
        (0 < t.Id &&
          CombatDebugController_1.CombatDebugController.CombatDebug(
            "Buff",
            this.Entity,
            "[buffComp] Buff层数改变",
            ["handle", c],
            ["buffId", t.Id],
            ["创建者", t.InstigatorId],
            ["持有者", t.GetOwnerDebugName()],
            ["说明", s.Desc],
            ["oldStack", e],
            ["newStack", t.StackCount],
            ["原因", C],
          ),
        this.BuffEffectManager.OnStackIncreased(t, f, e, i),
        this.HasBuffAuthority())
      ) {
        u = 0 < s.StackLimitCount ? s.StackLimitCount : 1 / 0;
        if (u <= e && u <= f) {
          C = s.OverflowEffects;
          if (C && 0 < C.length)
            for (const B of C)
              this.AddIterativeBuff(
                B,
                t,
                void 0,
                !0,
                `Buff层数溢出时迭代添加新buff（前置buff Id=${t.Id}, handle=${c}）`,
              );
          t.Config.ClearStackOnOverflow &&
            this.RemoveBuffByHandle(c, -1, "Buff层数溢出时清除");
        }
      }
    }
  }
  OnBuffActiveChanged(t, e) {}
  OnTagChanged(t) {
    this.BuffLock++;
    var e = this.TagListenerDict.get(t),
      f = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
    if (e) {
      for (const s of [...e.values()]) {
        var i = this.GetBuffByHandle(s);
        i &&
          this.CheckRemove(i.Config) &&
          this.RemoveBuffInner(s, -1, !0, `因为tag ${f}的变化触发`);
      }
      for (const n of [...e.values()]) {
        var r,
          o = this.GetBuffByHandle(n);
        o
          ? (r = this.CheckActivate(o.Config)) !== o.IsActive() &&
            this.OnBuffActiveChanged(o, r)
          : e.delete(n);
      }
      this.BuffLock--;
    }
  }
  get BuffLock() {
    return this.jbr;
  }
  set BuffLock(t) {
    if ((this.jbr = t) <= 0 && 0 < this.BuffGarbageSet.size) {
      for (const f of this.BuffGarbageSet) {
        var e = this.BuffContainer.get(f);
        this.BuffContainer.delete(f),
          ActiveBuff_1.ActiveBuffInternal.ReleaseBuff(e);
      }
      this.BuffGarbageSet.clear();
    }
  }
  get InitLock() {
    return this.InitLockInternal;
  }
  set InitLock(t) {
    this.InitLockInternal = t;
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
          Protocol_1.Aki.Protocol.CGs.Proto_Common,
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
(BaseBuffComponent.Wbr = new Map()),
  (BaseBuffComponent.Kbr = void 0),
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
      [(0, RegisterComponent_1.RegisterComponent)(187)],
      BaseBuffComponent,
    )),
  (exports.BaseBuffComponent = BaseBuffComponent);
//# sourceMappingURL=BaseBuffComponent.js.map
