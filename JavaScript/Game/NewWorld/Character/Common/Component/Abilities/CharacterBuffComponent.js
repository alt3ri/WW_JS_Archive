"use strict";
let CharacterBuffComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, o, f) {
    let r;
    const i = arguments.length;
    let a =
      i < 3 ? e : f === null ? (f = Object.getOwnPropertyDescriptor(e, o)) : f;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(t, e, o, f);
    else
      for (let s = t.length - 1; s >= 0; s--)
        (r = t[s]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
    return i > 3 && a && Object.defineProperty(e, o, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterBuffComponent = void 0);
const Info_1 = require("../../../../../../Core/Common/Info");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const NetDefine_1 = require("../../../../../../Core/Define/Net/NetDefine");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
const BaseBuffComponent_1 = require("./BaseBuffComponent");
const ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const CharacterBuffController_1 = require("./CharacterBuffController");
const ExtraEffectManager_1 = require("./ExtraEffect/ExtraEffectManager");
const NO_BROADCAST_CD_THRESHOLD = 1e4;
let CharacterBuffComponent =
  (CharacterBuffComponent_1 = class CharacterBuffComponent extends (
    BaseBuffComponent_1.BaseBuffComponent
  ) {
    constructor() {
      super(...arguments),
        (this.ActorComponent = void 0),
        (this.AttributeComponent = void 0),
        (this.DeathComponent = void 0),
        (this.TagComponent = void 0),
        (this.TimeScaleComponent = void 0),
        (this.CueComponent = void 0),
        (this.CreatureDataComponent = void 0),
        (this.PauseLocks = new Set()),
        (this.BuffEffectManager = void 0),
        (this.cqr = !1),
        (this.mqr = ActiveBuffConfigs_1.INVALID_BUFF_HANDLE);
    }
    GetDebugName() {
      return (
        (this.CreatureDataComponent?.GetCreatureDataId() ??
          "非正常实体(entity id=" + this.Entity?.Id) + ""
      );
    }
    GetEntity() {
      return this.Entity;
    }
    AddPauseLock(t) {
      this.PauseLocks.add(t), this.RefreshTimeScale();
    }
    RemovePauseLock(t) {
      this.PauseLocks.delete(t), this.RefreshTimeScale();
    }
    IsPaused() {
      return this.PauseLocks.size > 0;
    }
    GetTimeScale() {
      return (
        this.Entity.TimeDilation *
        (this.TimeScaleComponent?.CurrentTimeScale ?? 1)
      );
    }
    GetAttributeComponent() {
      return this.AttributeComponent;
    }
    GetTagComponent() {
      return this.TagComponent;
    }
    GetSkillComponent() {
      return this.Entity.GetComponent(33);
    }
    GetActorComponent() {
      return this.ActorComponent;
    }
    GetCueComponent() {
      return this.CueComponent;
    }
    get CreatureDataId() {
      return this.CreatureDataComponent.GetCreatureDataId();
    }
    OnInitData() {
      return (
        (this.BuffEffectManager = new ExtraEffectManager_1.ExtraEffectManager(
          this,
        )),
        !0
      );
    }
    OnInit() {
      return (
        (this.ActorComponent = this.Entity.CheckGetComponent(3)),
        (this.AttributeComponent = this.Entity.CheckGetComponent(156)),
        (this.TagComponent = this.Entity.CheckGetComponent(185)),
        (this.CueComponent = this.Entity.CheckGetComponent(19)),
        (this.DeathComponent = this.Entity.CheckGetComponent(15)),
        (this.TimeScaleComponent = this.Entity.GetComponent(107)),
        (this.CreatureDataComponent = this.Entity.GetComponent(0)),
        !0
      );
    }
    OnStart() {
      return this.BuffEffectManager?.Clear(), !0;
    }
    InitBornBuff() {
      let t = this.CreatureDataComponent.ComponentDataMap;
      let e = t.get("Hvs")?.Hvs?.Jps;
      if (e && this.HasBuffAuthority())
        for (const h of e) {
          const o = MathUtils_1.MathUtils.LongToNumber(h.jVn);
          const f = h.s4n ? MathUtils_1.MathUtils.LongToBigInt(h.s4n) : void 0;
          const r = MathUtils_1.MathUtils.LongToBigInt(h.JFn);
          this.AddBuffLocal(r, {
            InstigatorId: o,
            Level: h.r3n,
            ApplyType: h.WVn,
            PreMessageId: f,
            Duration: h.Skn,
            IsIterable: h.KVn,
            OuterStackCount: h.QVn,
            ServerId: h.$Vn,
            IsServerOrder: !0,
            Reason: "服务端或其它客户端请求添加Buff(缓冲) messageId=" + f,
          });
        }
      (e = t.get("Qvs")?.Qvs?.Zps), (t = t.get("Qvs")?.Qvs?.zps);
      if ((this.InitLock++, e))
        for (const l of e) {
          const i = MathUtils_1.MathUtils.LongToBigInt(l.JFn);
          for (let t = 0; t < l.uSs.length; t++)
            this.SetBuffEffectCd(
              i,
              t,
              l.uSs[t] * CommonDefine_1.MILLIONSECOND_PER_SECOND,
            );
        }
      if (t)
        for (const c of t) {
          const a = c;
          const s = MathUtils_1.MathUtils.LongToBigInt(a.JFn ?? -1);
          const n = MathUtils_1.MathUtils.LongToNumber(a.jVn);
          const u = a.y4n ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
          this.AddBuffRemote(s, u, {
            Level: a.r3n,
            InstigatorId: n,
            ApplyType: a.WVn,
            Duration: a.Skn,
            RemainDuration: a.Ivs,
            IsActive: a.rVn,
            ServerId: a.$Vn,
            OuterStackCount: a.QVn,
            Reason: "服务器通过通知FightBuffComponent恢复Buff",
            MessageId: MathUtils_1.MathUtils.LongToBigInt(a.s4n),
          }),
            this.BuffContainer.get(u)?.SetRemainDuration(a.Ivs);
        }
      this.InitLock--;
    }
    OnClear() {
      this.TriggerMap.clear();
      for (const t of this.BuffEffectManager.FilterById(31)) t?.OnRemoved(!0);
      for (const e of this.BuffEffectManager.FilterById(33)) e?.OnRemoved(!0);
      for (const o of this.BuffEffectManager.FilterById(32)) o?.OnRemoved(!0);
      for (const f of this.BuffEffectManager.FilterById(21)) f?.OnRemoved(!0);
      for (const r of [...this.BuffContainer.values()]) r.Destroy();
      return this.PauseLocks.clear(), super.OnClear(), !0;
    }
    OnActivate() {
      for (const t of this.GetAllBuffs())
        this.CueComponent.CreateGameplayCueByBuff(t);
      (this.cqr = !0), this.InitBornBuff();
    }
    HasBuffAuthority() {
      let t;
      return (
        !(
          this.Entity.GetComponent(0).GetEntityType() !==
            Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
          !this.DeathComponent.IsDead()
        ) ||
        ((t = this.Entity.GetComponent(0)?.GetSummonerPlayerId()),
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t)
      );
    }
    AddBuffWithServerId(e, o, f, r, i) {
      if (!(e <= ActiveBuffConfigs_1.NULL_BUFF_ID))
        for (let t = 0; t < f; t++) {
          const a = this.AddBuffLocal(e, {
            InstigatorId: this.CreatureDataId,
            Level: o,
            Duration: ActiveBuffConfigs_1.DEFAULT_SERVER_GE_DURATION,
            ServerId: r,
            Reason: i,
          });
          const s = CharacterBuffController_1.default.GetBuffDefinition(e);
          a === ActiveBuffConfigs_1.INVALID_BUFF_HANDLE &&
            CombatDebugController_1.CombatDebugController.CombatError(
              "Buff",
              this.Entity,
              "系统buff添加失败",
              ["buffId", e],
              ["serverId", r],
              ["持有者", this.GetDebugName()],
              ["说明", s?.Desc],
            );
        }
    }
    RemoveBuffByServerIdLocal(t, e) {
      if (this.HasBuffAuthority())
        for (const f of [...this.BuffContainer.values()]) {
          const o = f.Handle;
          this.BuffGarbageSet.has(o) ||
            (f.ServerId === t && this.RemoveBuffInner(o, -1, !0, e));
        }
      else
        CombatDebugController_1.CombatDebugController.CombatError(
          "Buff",
          this.Entity,
          "[buffComp] 服务端通知移除非本客户端控制角色持有的系统Buff，需要服务端检查协议是否下发正确",
          ["buffId", t],
          ["持有者", this.GetDebugName()],
        );
    }
    RemoveBuffByTagName(t, e = void 0) {
      t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
      void 0 !== t && this.RemoveBuffByTag(t, e);
    }
    RemoveBuffByTag(t, e = void 0) {
      void 0 !== t &&
        (this.HasBuffAuthority()
          ? this.RemoveBuffByTagLocal(t, e)
          : (CombatDebugController_1.CombatDebugController.CombatDebug(
              "Buff",
              this.Entity,
              "[order] 请求根据tagId移除buff",
              ["tagId", t],
              ["持有者", this.GetDebugName()],
              ["原因", e],
            ),
            ((e = Protocol_1.Aki.Protocol.cNn.create()).XVn = [t]),
            CombatMessage_1.CombatNet.Call(2625, this.Entity, e)));
    }
    RemoveAllBuffs(t) {
      if (this.HasBuffAuthority())
        for (const e of [...this.BuffContainer.keys()])
          this.RemoveBuffByHandle(e, -1, t);
      else
        for (const o of this.BuffContainer.values())
          o?.IsValid() && this.RemoveBuffOrder(o.Id, -1, t);
    }
    RemoveAllBuffsByInstigator(t, e) {
      const o = t?.CreatureDataId;
      var t = [...this.BuffContainer.keys()];
      if (this.HasBuffAuthority())
        for (const r of t)
          this.GetBuffByHandle(r)?.InstigatorId === o &&
            this.RemoveBuffByHandle(r, -1, e);
      else
        for (const i of t) {
          const f = this.GetBuffByHandle(i);
          f?.InstigatorId === o && this.RemoveBuffOrder(f.Id, -1, e);
        }
    }
    RemoveAllDurationBuffs(t) {
      const e = [];
      for (const o of this.BuffContainer.values())
        o.Config.DurationPolicy === 2 && e.push(o.Handle);
      for (const f of e) this.RemoveBuffByHandle(f, -1, t);
    }
    GetBuffLevel(t) {
      let e = this.Entity.GetComponent(83)?.GetSkillLevelByBuffId(t);
      return (void 0 !== e && e > 0) ||
        (void 0 !==
          (e = this.Entity.GetComponent(34)?.GetVisionLevelByBuffId(t)) &&
          e > 0)
        ? e
        : void 0;
    }
    OnBuffAdded(t, e, o, f, r, i, a, s, n, u) {
      if (t) {
        this.NeedBroadcastBuff(t) && this.BroadcastAddBuff(t, o, n, u);
        const h = t.Config;
        if (
          (super.OnBuffAdded(t, e, o, f, r, i, a, s, n, u),
          h.RemoveBuffWithTags && h.RemoveBuffWithTags.length > 0)
        ) {
          const u = `因为buff${t.Id}(handle=${t.Handle})的RemoveBuffWithTags导致移除`;
          for (const l of h.RemoveBuffWithTags)
            this.HasBuffAuthority() && this.RemoveBuffByTag(l, u),
              this.TagComponent.RemoveTag(l);
        }
        this.cqr && this.CueComponent.CreateGameplayCueByBuff(t),
          s && this.ShareApplyBuffInner(t, e, o, t.MessageId, r, a);
      }
    }
    ShareApplyBuffInner(t, e, o, f, r, i) {
      let a, s, n;
      this.HasBuffAuthority() &&
        (a = this.Entity.GetComponent(47)?.RoleId) &&
        t.Config?.FormationPolicy === 4 &&
        (a = EntitySystem_1.EntitySystem.Get(a)?.GetComponent(157)) &&
        ((s = t.Id),
        (n = t.Handle),
        a.AddBuffLocal(s, {
          InstigatorId:
            t.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
          Level: t.Level,
          OuterStackCount: e,
          ApplyType: o,
          PreMessageId: f,
          Duration: r,
          ServerId: i,
          IsIterable: !1,
          Reason: `因为buff${s}(handle=${n})的队伍共享机制导致的buff添加`,
        }));
    }
    OnBuffRemoved(t, e, o, f, r) {
      if (t) {
        this.NeedBroadcastBuff(t) && this.BroadcastRemoveBuff(t, e, f, r);
        (f = t.Handle),
          (r =
            (this.RemoveListenerBuff(t),
            this.BuffGarbageSet.add(f),
            t.Destroy(),
            this.BuffEffectManager.OnBuffRemoved(t, e),
            t.GetInstigatorBuffComponent()));
        if ((void 0 === r || r.Valid) && this.HasBuffAuthority()) {
          f = e
            ? t.Config?.PrematureExpirationEffects
            : t.Config?.RoutineExpirationEffects;
          if (f)
            for (const i of f)
              this.AddIterativeBuff(
                i,
                t,
                void 0,
                !0,
                `因为Buff${t.Id}移除导致的添加`,
              );
        }
        this.cqr && this.CueComponent.DestroyGameplayCue(t),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            (this.Entity.GetComponent(24)?.OnBuffRemoved(t),
            this.Entity.GetComponent(20)?.OnBuffRemoved(t));
      }
    }
    OnBuffStackIncreased(t, e, o, f, r, i, a, s, n, u, h, l, c) {
      t &&
        (this.NeedBroadcastBuff(t) &&
          this.BroadcastBuffStackChanged(t, e, o, !1, c, f),
        super.OnBuffStackIncreased(t, e, o, f, r, i, a, s, n, u, h, l, c),
        this.HasBuffAuthority()) &&
        h &&
        this.ShareApplyBuffInner(t, i, a, t.MessageId, n, u);
    }
    OnBuffStackDecreased(t, e, o, f, r) {
      t &&
        (this.NeedBroadcastBuff(t) &&
          this.BroadcastBuffStackChanged(t, e, o, f, r),
        super.OnBuffStackDecreased(t, e, o, f, r));
    }
    OnBuffActiveChanged(t, e) {
      t &&
        t.IsActive() !== e &&
        (t.SetActivate(e),
        this.NeedBroadcastBuff(t) && this.BroadcastActivateBuff(t, e),
        this.BuffEffectManager.OnBuffInhibitedChanged(t, !e),
        this.GetCueComponent()?.OnAnyBuffInhibitionChanged(t.Handle, !e));
    }
    BroadcastAddBuff(t, e, o, f) {
      let r;
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t) ||
        (!t.IsInstantBuff() && t.Handle < 0) ||
        (((r = Protocol_1.Aki.Protocol.K2n.create()).E4n = t.Handle),
        (r.Ekn = MathUtils_1.MathUtils.BigIntToLong(t.Id)),
        (r.r3n = t.Level),
        (r.rkn = MathUtils_1.MathUtils.NumberToLong(this.CreatureDataId)),
        t.InstigatorId &&
          (r.jVn = MathUtils_1.MathUtils.NumberToLong(t.InstigatorId)),
        (r.WVn = e),
        (r.Skn = t.GetRemainDuration()),
        (r.$Vn = t.ServerId),
        (r.QVn = t.StackCount),
        CombatMessage_1.CombatNet.Call(
          4202,
          this.Entity,
          Protocol_1.Aki.Protocol.K2n.create(r),
          void 0,
          t.PreMessageId,
          t.MessageId,
          o,
        ));
    }
    BroadcastActivateBuff(t, e) {
      let o;
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t) ||
        (((o = Protocol_1.Aki.Protocol.uNn.create()).E4n = t.Handle),
        (o.YVn = e),
        CombatMessage_1.CombatNet.Call(28428, this.Entity, o));
    }
    BroadcastBuffStackChanged(t, e, o, f, r, i) {
      let a;
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t) ||
        (((a = Protocol_1.Aki.Protocol.DNn.create()).y4n = t.Handle),
        (a.JVn = o),
        (a.zVn = f),
        (a.jVn = i ?? 0),
        CombatMessage_1.CombatNet.Call(8164, this.Entity, a, void 0));
    }
    static BroadcastAddBuffNotify(t, e, o) {
      const f = e.E4n;
      const r = MathUtils_1.MathUtils.LongToBigInt(e.Ekn);
      const i = MathUtils_1.MathUtils.LongToNumber(e.jVn);
      const a = t?.GetComponent(157);
      const s = MathUtils_1.MathUtils.LongToBigInt(o?.n4n ?? -1);
      var o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1);
      if (a?.Valid) {
        const n = CharacterBuffController_1.default.GetBuffDefinition(r);
        if (a && n && f !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
          const u = a.TagComponent;
          u &&
            n.RemoveBuffWithTags?.forEach((t) => {
              u.RemoveTag(t);
            }),
            a.AddBuffRemote(r, f, {
              IsActive: e.rVn,
              InstigatorId: i,
              Level: e.r3n,
              ApplyType: e.WVn,
              PreMessageId: s,
              MessageId: o,
              ServerId: e.$Vn,
              Duration: e.Skn,
              Reason: "远端通知添加buff",
            });
        }
      } else
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "Buff",
          t,
          "Invalid entity when processing ApplyGameplayEffectNotify",
          ["handle", e.E4n],
          ["buffId", r],
          ["EntityId", MathUtils_1.MathUtils.LongToNumber(e.rkn)],
          ["InstigatorId", i],
        );
    }
    static BroadcastBuffStackChangedNotify(t, e) {
      var o = e.y4n;
      var e = e.JVn;
      var t = t?.GetComponent(157);
      var o = t?.GetBuffByHandle(o);
      t &&
        o &&
        (o.StackCount > e
          ? t.OnBuffStackDecreased(
              o,
              o.StackCount,
              e,
              !0,
              "远端Buff层数变化通知",
            )
          : o.StackCount <= e &&
            t.OnBuffStackIncreased(
              o,
              o.StackCount,
              e,
              o.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
              o.Level,
              void 0,
              Protocol_1.Aki.Protocol.CGs.Proto_Common,
              void 0,
              void 0,
              o.ServerId,
              !1,
              !1,
              "远端Buff层数变化通知",
            ));
    }
    BroadcastRemoveBuff(t, e, o, f) {
      let r;
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t) ||
        (((r = Protocol_1.Aki.Protocol.Q2n.create()).E4n = t.Handle),
        (r.rkn = MathUtils_1.MathUtils.NumberToLong(this.CreatureDataId)),
        (r.zVn = e),
        CombatMessage_1.CombatNet.Call(
          14295,
          this.Entity,
          r,
          void 0,
          f,
          void 0,
          o,
        ));
    }
    static BroadcastRemoveBuffNotify(t, e) {
      const o = e.E4n;
      const f = t?.GetComponent(157);
      f?.Valid
        ? f?.RemoveBuffInner(o, -1, !0, "远端通知移除buff")
        : CombatDebugController_1.CombatDebugController.CombatWarn(
            "Buff",
            t,
            "Invalid entity when processing RemoveGameplayEffectNotify",
            ["entity id", e.rkn],
            ["handle", e.E4n],
          );
    }
    static OrderAddBuffS2cNotify(t, e, o) {
      const f = t?.GetComponent(157);
      let r = MathUtils_1.MathUtils.LongToBigInt(e.Ekn);
      const i = MathUtils_1.MathUtils.LongToNumber(e.jVn);
      var o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1);
      let a = CharacterBuffController_1.default.GetBuffDefinition(r);
      const s = new Protocol_1.Aki.Protocol.ZNn();
      if (t && f?.Valid && a) {
        const n = f.GetTagComponent();
        n &&
          a.RemoveBuffWithTags?.forEach((t) => {
            n.RemoveTag(t);
          }),
          (a = f.AddBuffInner(
            r,
            CharacterBuffController_1.default.GetBuffDefinition(r),
            i,
            e.r3n,
            e.QVn,
            e.WVn,
            o,
            void 0,
            e.Skn,
            void 0,
            e.$Vn,
            "远端请求添加玩家Buff(s2c)",
            !1,
            e.KVn,
            !0,
            void 0,
          )),
          (r = f.BuffContainer.get(a)),
          (s.E4n = a),
          (s.rVn = !!r?.IsActive()),
          (s.lkn = Protocol_1.Aki.Protocol.lkn.Sys);
      } else s.lkn = Protocol_1.Aki.Protocol.lkn.Proto_UnKnownError;
      CombatMessage_1.CombatNet.Send(
        NetDefine_1.ECombatPushDataMessage.ZNn,
        t,
        s,
        o,
        void 0,
        !0,
      );
    }
    static OrderRemoveBuffS2cNotify(t, e, o) {
      var f = t?.GetComponent(157);
      var o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1);
      var f =
        (f?.RemoveBuffByHandle(e.E4n, e.QVn, "远端请求移除buff(s2c)", o, !0),
        new Protocol_1.Aki.Protocol.ekn());
      (f.lkn = Protocol_1.Aki.Protocol.lkn.Sys),
        CombatMessage_1.CombatNet.Send(
          NetDefine_1.ECombatPushDataMessage.ekn,
          t,
          f,
          o,
          void 0,
          !0,
        );
    }
    RemoveBuffOrder(t, e, o) {
      let f;
      t <= 0 ||
        ((f = CharacterBuffController_1.default.GetBuffDefinition(t)),
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "Buff",
          this.Entity,
          "[order] 请求远端移除buff",
          ["buffId", t],
          ["持有者", this.GetDebugName()],
          ["stackCount", e],
          ["说明", f?.Desc],
          ["原因", o],
        ),
        ((f = Protocol_1.Aki.Protocol._Nn.create()).Ekn =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (f.QVn = e),
        CombatMessage_1.CombatNet.Call(3683, this.Entity, f));
    }
    static OrderRemoveBuffByIdS2cNotify(t, e, o) {
      const f = t?.GetComponent(157);
      const r = MathUtils_1.MathUtils.LongToBigInt(e.JFn);
      var o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1);
      const i = new Protocol_1.Aki.Protocol.tkn();
      f?.Valid
        ? (f.RemoveBuff(r, e.QVn, "远端移除buff(s2c) reason=" + e.V5n, o, !0),
          (i.lkn = Protocol_1.Aki.Protocol.lkn.Sys))
        : (CombatDebugController_1.CombatDebugController.CombatWarn(
            "Buff",
            t,
            "Invalid entity when processing RemoveBuffByIdS2cRequestNotify",
            ["entity id", t?.Id],
            ["buffId", r],
          ),
          (i.lkn = Protocol_1.Aki.Protocol.lkn.Proto_UnKnownError)),
        CombatMessage_1.CombatNet.Send(
          NetDefine_1.ECombatPushDataMessage.tkn,
          t,
          i,
          o,
          void 0,
          !0,
        );
    }
    AddBuffOrder(
      t,
      {
        InstigatorId: e,
        Level: o = ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL,
        OuterStackCount: f = 0,
        ApplyType: r = Protocol_1.Aki.Protocol.CGs.Proto_Common,
        PreMessageId: i = void 0,
        Duration: a = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
        ServerId: s = void 0,
        IsIterable: n = !0,
        Reason: u,
      },
    ) {
      t <= 0 ||
        (CombatDebugController_1.CombatDebugController.CombatDebug(
          "Buff",
          this.Entity,
          "[order] 请求远端添加buff...",
          ["buffId", t],
          ["创建者Id", e],
          ["持有者", this.GetDebugName()],
          ["level", o],
          ["时间计算方式", Protocol_1.Aki.Protocol.CGs[r]],
          ["Duration", a],
          ["原因", u],
        ),
        ((u = Protocol_1.Aki.Protocol.lNn.create()).Ekn =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (u.r3n = o),
        (u.QVn = f),
        (u.jVn = MathUtils_1.MathUtils.NumberToLong(e)),
        (u.WVn = r),
        (u.Skn = a),
        (u.$Vn = s ?? 0),
        (u.KVn = n),
        CombatMessage_1.CombatNet.Call(18677, this.Entity, u, void 0, i));
    }
    static OrderAddBuffNotify(t, e, o) {
      let f;
      const r = t?.CheckGetComponent(157);
      r
        ? r &&
          ((f = MathUtils_1.MathUtils.LongToBigInt(e.Ekn)),
          r.AddBuffLocal(f, {
            InstigatorId: MathUtils_1.MathUtils.LongToNumber(e.jVn),
            Level: e.r3n,
            ApplyType: e.WVn,
            PreMessageId: o?.s4n
              ? MathUtils_1.MathUtils.LongToBigInt(o.s4n)
              : void 0,
            Duration: e.Skn,
            IsIterable: e.KVn,
            OuterStackCount: e.QVn,
            ServerId: e.$Vn,
            IsServerOrder: !0,
            Reason: "服务端或其它客户端请求添加Buff",
          }))
        : CombatDebugController_1.CombatDebugController.CombatError(
            "Buff",
            t,
            "收到服务端请求添加buff，但找不到对应的entity",
            ["entity", t],
            ["buffId", e.Ekn],
            ["InstigatorId", e.jVn],
          );
    }
    static OrderRemoveBuffNotify(t, e) {
      let o = t?.GetComponent(157);
      const f = MathUtils_1.MathUtils.LongToBigInt(e.Ekn);
      o
        ? o.RemoveBuffLocal(f, e.QVn, "服务端或其它客户端请求本端移除buff")
        : ((o = CharacterBuffController_1.default.GetBuffDefinition(f)),
          CombatDebugController_1.CombatDebugController.CombatError(
            "Buff",
            t,
            "[order] 移除Buff请求找不到对应实体",
            ["buffId", f],
            ["持有者", t?.Id],
            ["说明", o?.Desc],
          ));
    }
    static OrderRemoveBuffByTagsNotify(t, e) {
      const o = t?.GetComponent(157);
      if (o)
        for (const r of e.XVn) {
          const f = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(r);
          o.RemoveBuffByTagLocal(r, `远端请求根据tag ${f} 移除buff`);
        }
      else
        CombatDebugController_1.CombatDebugController.CombatError(
          "Buff",
          t,
          "[order] 根据tag移除Buff请求找不到对应实体",
          [
            "tagId",
            e?.XVn.map((t) =>
              GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
            ),
          ],
        );
    }
    static BroadcastActivateBuffNotify(t, e) {
      const o = t?.GetComponent(157);
      const f = e.E4n;
      const r = e.YVn;
      const i = o?.GetBuffByHandle(f);
      !o || o.HasBuffAuthority()
        ? CombatDebugController_1.CombatDebugController.CombatWarn(
            "Buff",
            t,
            "主端收到了非主控端发来的buff激活状态变更请求，或找不到Buff持有者，将不做处理",
            ["handle", f],
            ["buffId", i?.Id],
            ["本地激活状态", r],
            ["远端激活状态", e.YVn],
          )
        : (CombatDebugController_1.CombatDebugController.CombatDebug(
            "Buff",
            t,
            "远端通知修改buff激活状态",
            ["handle", f],
            ["buffId", i?.Id],
            ["激活状态", r],
          ),
          o.OnBuffActiveChanged(i, r));
    }
    UpdateSysGrowBuff(t) {
      this.mqr >= 0 &&
        this.RemoveBuffByHandleLocal(this.mqr, -1, "更新系统成长值");
      const o = CharacterBuffController_1.default.CreateDynamicBuffRef();
      (o.StackingType = 0),
        (o.DurationPolicy = 1),
        (o.Modifiers = []),
        (o.Desc = "系统成长buff"),
        t.forEach((t, e) => {
          t !== 0 &&
            o.Modifiers.push({
              AttributeId: e,
              Value1: [t],
              Value2: [0],
              CalculationPolicy: [0],
            });
        }),
        (this.mqr = this.AddBuffInner(
          ActiveBuffConfigs_1.DYNAMIC_BUFF_ID,
          o,
          this.CreatureDataId,
          1,
          void 0,
          Protocol_1.Aki.Protocol.CGs.Proto_Common,
          void 0,
          void 0,
          ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
          void 0,
          ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
          "更新系统成长值",
          !1,
          !0,
          !1,
          void 0,
        ));
    }
    AddAttributeRateModifierLocal(t, e, o) {
      let f;
      return e === 0
        ? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
        : (((f =
            CharacterBuffController_1.default.CreateDynamicBuffRef()).StackingType =
            0),
          (f.DurationPolicy = 1),
          (f.Modifiers = []),
          (f.Desc = o),
          f.Modifiers.push({
            AttributeId: t,
            Value1: [e * CharacterAttributeTypes_1.PER_TEN_THOUSAND],
            Value2: [0],
            CalculationPolicy: [1],
          }),
          this.AddBuffInner(
            ActiveBuffConfigs_1.DYNAMIC_BUFF_ID,
            f,
            this.CreatureDataId,
            1,
            void 0,
            Protocol_1.Aki.Protocol.CGs.Proto_Common,
            void 0,
            void 0,
            ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
            void 0,
            ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
            o,
            !1,
            !0,
            !1,
            void 0,
          ));
    }
    AddTagWithReturnHandle(t, e = -1) {
      let o;
      return !t || t.length <= 0
        ? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
        : (((o =
            CharacterBuffController_1.default.CreateDynamicBuffRef()).GrantedTags =
            [...t]),
          (o.StackingType = 0),
          (o.DurationPolicy = 1),
          e > 0 &&
            ((o.DurationPolicy = 2),
            (o.DurationCalculationPolicy = [0]),
            (o.DurationMagnitude = [e])),
          (o.Desc = "AddTagWithReturnHandle"),
          this.AddBuffInner(
            ActiveBuffConfigs_1.DYNAMIC_BUFF_ID,
            o,
            this.CreatureDataId,
            1,
            void 0,
            Protocol_1.Aki.Protocol.CGs.Proto_Common,
            void 0,
            void 0,
            e,
            void 0,
            ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
            "添加tag",
            !1,
            !0,
            !1,
            void 0,
          ));
    }
    SetBuffEffectCd(t, e, o) {
      super.SetBuffEffectCd(t, e, o);
      t =
        this.GetBuffById(t)?.Handle ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
      this.NeedBroadcastBuff() &&
        t !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE &&
        o > NO_BROADCAST_CD_THRESHOLD &&
        (((o = Protocol_1.Aki.Protocol.kNn.create()).y4n = t),
        (o.Akn = e),
        CombatMessage_1.CombatNet.Call(28624, this.Entity, o));
    }
    GetDebugBuffString(t = "") {
      let o = "";
      const e = [...t.matchAll(/[0-9]+/g)].map((t) => t[0] ?? "");
      for (const f of this.BuffContainer.values()) {
        const r = String(f.Id);
        if (!(e.length > 0) || e.some((t) => r.startsWith(t))) {
          let e =
            (f.Id === ActiveBuffConfigs_1.DYNAMIC_BUFF_ID
              ? "系统buff"
              : (this.HasBuffAuthority() ? "RemoteBuff_" : "Buff_") + r) +
            `(${this.BuffGarbageSet.has(f.Handle) ? "销毁" : f.IsActive() ? "激活" : "失效"})  handle: ${f.Handle},  层数: ${f.StackCount},  等级: ${f.Level} 
    施加者: ${f.GetInstigatorActorComponent()?.Actor.GetName()},  时长: ${f.Duration < 0 ? "无限" : f.GetRemainDuration().toFixed(1) + "/" + f.Duration.toFixed(1)},  ${f.Period > 0 ? `周期: ${f.GetRemainPeriod()?.toFixed(1)}/` + f.Period.toFixed(1) : ""}
    说明: ${f.Config?.Desc}
`;
          f.Config.GrantedTags?.forEach((t) => {
            e += `    +附加标签 ${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)}
`;
          });
          for (const i of this.BuffEffectManager.GetEffectsByHandle(f.Handle)) {
            e += `    +激活效果 ${i.GetDebugString()}(cd:${(this.GetBuffEffectCd(f.Id, i.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)
`;
          }
          o += e + "\n";
        }
      }
      return o;
    }
  });
(CharacterBuffComponent.dqr = void 0),
  (CharacterBuffComponent.Cqr = void 0),
  (CharacterBuffComponent.gqr = void 0),
  (CharacterBuffComponent.fqr = void 0),
  (CharacterBuffComponent.pqr = void 0),
  __decorate(
    [(0, Stats_1.statDecorator)("OnBuffAdded")],
    CharacterBuffComponent.prototype,
    "OnBuffAdded",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("OnBuffRemoved")],
    CharacterBuffComponent.prototype,
    "OnBuffRemoved",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("OnBuffStackIncreased")],
    CharacterBuffComponent.prototype,
    "OnBuffStackIncreased",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("OnBuffStackDecreased")],
    CharacterBuffComponent.prototype,
    "OnBuffStackDecreased",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("OnBuffActiveChanged")],
    CharacterBuffComponent.prototype,
    "OnBuffActiveChanged",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("NOn", !1)],
    CharacterBuffComponent,
    "BroadcastAddBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("p2n", !1)],
    CharacterBuffComponent,
    "BroadcastBuffStackChangedNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("kOn", !1)],
    CharacterBuffComponent,
    "BroadcastRemoveBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("R2n", !1)],
    CharacterBuffComponent,
    "OrderAddBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("x2n", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("q2n", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffByIdS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Handle("n2n")],
    CharacterBuffComponent,
    "OrderAddBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("s2n", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("h2n", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffByTagsNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("a2n", !1)],
    CharacterBuffComponent,
    "BroadcastActivateBuffNotify",
    null,
  ),
  (CharacterBuffComponent = CharacterBuffComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(157)],
      CharacterBuffComponent,
    )),
  (exports.CharacterBuffComponent = CharacterBuffComponent);
// # sourceMappingURL=CharacterBuffComponent.js.map
