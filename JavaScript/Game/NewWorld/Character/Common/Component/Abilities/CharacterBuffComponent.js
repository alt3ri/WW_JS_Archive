"use strict";
var CharacterBuffComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, o, f) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? e
            : null === f
              ? (f = Object.getOwnPropertyDescriptor(e, o))
              : f;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, o, f);
      else
        for (var s = t.length - 1; 0 <= s; s--)
          (r = t[s]) &&
            (a = (i < 3 ? r(a) : 3 < i ? r(e, o, a) : r(e, o)) || a);
      return 3 < i && a && Object.defineProperty(e, o, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterBuffComponent = void 0);
const Info_1 = require("../../../../../../Core/Common/Info"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  NetDefine_1 = require("../../../../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  BaseBuffComponent_1 = require("./BaseBuffComponent"),
  ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  CharacterBuffController_1 = require("./CharacterBuffController"),
  ExtraEffectManager_1 = require("./ExtraEffect/ExtraEffectManager"),
  NO_BROADCAST_CD_THRESHOLD = 1e4;
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
        (this.Vbr = !1),
        (this.Hbr = ActiveBuffConfigs_1.INVALID_BUFF_HANDLE);
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
      return 0 < this.PauseLocks.size;
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
        (this.AttributeComponent = this.Entity.CheckGetComponent(158)),
        (this.TagComponent = this.Entity.CheckGetComponent(188)),
        (this.CueComponent = this.Entity.CheckGetComponent(19)),
        (this.DeathComponent = this.Entity.CheckGetComponent(15)),
        (this.TimeScaleComponent = this.Entity.GetComponent(109)),
        (this.CreatureDataComponent = this.Entity.GetComponent(0)),
        !0
      );
    }
    OnStart() {
      return this.BuffEffectManager?.Clear(), !0;
    }
    InitBornBuff() {
      var t = this.CreatureDataComponent.ComponentDataMap,
        e = t.get("ays")?.ays?.dIs;
      if (e && this.HasBuffAuthority())
        for (const h of e) {
          var o = MathUtils_1.MathUtils.LongToNumber(h.Sjn),
            f = h.k8n ? MathUtils_1.MathUtils.LongToBigInt(h.k8n) : void 0,
            r = MathUtils_1.MathUtils.LongToBigInt(h.L6n);
          this.AddBuffLocal(r, {
            InstigatorId: o,
            Level: h.P6n,
            ApplyType: h.Ejn,
            PreMessageId: f,
            Duration: h.Y4n,
            IsIterable: h.yjn,
            OuterStackCount: h.Ijn,
            ServerId: h.Tjn,
            IsServerOrder: !0,
            Reason: "服务端或其它客户端请求添加Buff(缓冲) messageId=" + f,
          });
        }
      (e = t.get("uys")?.uys?.CIs), (t = t.get("uys")?.uys?.mIs);
      if (e)
        for (const c of e) {
          var i = MathUtils_1.MathUtils.LongToBigInt(c.L6n);
          for (let t = 0; t < c.PTs.length; t++)
            this.SetBuffEffectCd(
              i,
              t,
              c.PTs[t] * CommonDefine_1.MILLIONSECOND_PER_SECOND,
            );
        }
      if (t)
        for (const d of t) {
          var a = d,
            s = MathUtils_1.MathUtils.LongToBigInt(a.L6n ?? -1),
            n = MathUtils_1.MathUtils.LongToNumber(a.Sjn),
            u = a.rVn ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
          this.AddBuffRemote(s, u, {
            Level: a.P6n,
            InstigatorId: n,
            ApplyType: a.Ejn,
            Duration: a.Y4n,
            RemainDuration: a.FEs,
            IsActive: a.qHn,
            ServerId: a.Tjn,
            OuterStackCount: a.Ijn,
            Reason: "服务器通过通知FightBuffComponent恢复Buff",
            MessageId: MathUtils_1.MathUtils.LongToBigInt(a.k8n),
          }),
            this.BuffContainer.get(u)?.SetRemainDuration(a.FEs);
        }
    }
    OnClear() {
      this.TriggerMap.clear();
      for (const t of [...this.BuffContainer.values()]) t.Destroy();
      return this.PauseLocks.clear(), super.OnClear(), !0;
    }
    OnActivate() {
      for (const t of this.GetAllBuffs())
        this.CueComponent.CreateGameplayCueByBuff(t);
      (this.Vbr = !0), this.InitBornBuff();
    }
    HasBuffAuthority() {
      var t;
      return (
        !(
          this.Entity.GetComponent(0).GetEntityType() !==
            Protocol_1.Aki.Protocol.wks.Proto_Monster ||
          !this.DeathComponent.IsDead()
        ) ||
        ((t = this.Entity.GetComponent(0)?.GetSummonerPlayerId()),
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t)
      );
    }
    AddBuffWithServerId(e, o, f, r, i) {
      if (!(e <= ActiveBuffConfigs_1.NULL_BUFF_ID))
        for (let t = 0; t < f; t++) {
          var a = this.AddBuffLocal(e, {
              InstigatorId: this.CreatureDataId,
              Level: o,
              Duration: ActiveBuffConfigs_1.DEFAULT_SERVER_GE_DURATION,
              ServerId: r,
              Reason: i,
            }),
            s = CharacterBuffController_1.default.GetBuffDefinition(e);
          a === ActiveBuffConfigs_1.INVALID_BUFF_HANDLE &&
            CombatLog_1.CombatLog.Error(
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
          var o = f.Handle;
          this.BuffGarbageSet.has(o) ||
            (f.ServerId === t && this.RemoveBuffInner(o, -1, !0, e));
        }
      else
        CombatLog_1.CombatLog.Error(
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
          : (((e = Protocol_1.Aki.Protocol.F3n.create()).Ljn = [t]),
            CombatMessage_1.CombatNet.Call(28741, this.Entity, e)));
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
      var o = t?.CreatureDataId,
        t = [...this.BuffContainer.keys()];
      if (this.HasBuffAuthority())
        for (const r of t)
          this.GetBuffByHandle(r)?.InstigatorId === o &&
            this.RemoveBuffByHandle(r, -1, e);
      else
        for (const i of t) {
          var f = this.GetBuffByHandle(i);
          f?.InstigatorId === o && this.RemoveBuffOrder(f.Id, -1, e);
        }
    }
    RemoveAllDurationBuffs(t) {
      var e = [];
      for (const o of this.BuffContainer.values())
        2 === o.Config.DurationPolicy && e.push(o.Handle);
      for (const f of e) this.RemoveBuffByHandle(f, -1, t);
    }
    GetBuffLevel(t) {
      var e = this.Entity.GetComponent(85)?.GetSkillLevelByBuffId(t);
      return (void 0 !== e && 0 < e) ||
        (void 0 !==
          (e = this.Entity.GetComponent(35)?.GetVisionLevelByBuffId(t)) &&
          0 < e)
        ? e
        : void 0;
    }
    OnBuffAdded(t, e, o, f, r, i, a, s, n, u, h) {
      if (t) {
        this.BroadcastAddBuff(t, o, u, s, h);
        var c = t.Config;
        if (
          (super.OnBuffAdded(t, e, o, f, r, i, a, s, n, u, h),
          c.RemoveBuffWithTags && 0 < c.RemoveBuffWithTags.length)
        ) {
          const h = `因为buff${t.Id}(handle=${t.Handle})的RemoveBuffWithTags导致移除`;
          for (const d of c.RemoveBuffWithTags)
            this.HasBuffAuthority() && this.RemoveBuffByTag(d, h),
              this.TagComponent.RemoveTag(d);
        }
        this.Vbr && this.CueComponent.CreateGameplayCueByBuff(t),
          n && this.ShareApplyBuffInner(t, e, o, t.MessageId, r, a);
      }
    }
    ShareApplyBuffInner(t, e, o, f, r, i) {
      var a, s, n;
      this.HasBuffAuthority() &&
        (a = this.Entity.GetComponent(48)?.RoleId) &&
        4 === t.Config?.FormationPolicy &&
        (a = EntitySystem_1.EntitySystem.Get(a)?.GetComponent(159)) &&
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
      t &&
        (this.BroadcastRemoveBuff(t, e, f, r),
        super.OnBuffRemoved(t, e, o, f, r),
        this.Vbr && this.CueComponent.DestroyGameplayCueByBuff(t),
        Info_1.Info.IsBuildDevelopmentOrDebug) &&
        (this.Entity.GetComponent(24)?.OnBuffRemoved(t),
        this.Entity.GetComponent(20)?.OnBuffRemoved(t));
    }
    OnBuffStackIncreased(t, e, o, f, r, i, a, s, n, u, h, c, d) {
      t &&
        (this.BroadcastBuffStackChanged(t, e, o, !1, d, f),
        super.OnBuffStackIncreased(t, e, o, f, r, i, a, s, n, u, h, c, d),
        this.HasBuffAuthority()) &&
        h &&
        this.ShareApplyBuffInner(t, i, a, t.MessageId, n, u);
    }
    OnBuffStackDecreased(t, e, o, f, r) {
      t &&
        (this.BroadcastBuffStackChanged(t, e, o, f, r),
        super.OnBuffStackDecreased(t, e, o, f, r));
    }
    OnBuffActiveChanged(t, e) {
      t &&
        t.IsActive() !== e &&
        (this.BroadcastActivateBuff(t, e),
        super.OnBuffActiveChanged(t, e),
        this.GetCueComponent()?.OnAnyBuffInhibitionChanged(t.Handle, !e));
    }
    BroadcastAddBuff(t, e, o, f, r) {
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t, f) ||
        (!t.IsInstantBuff() && t.Handle < 0) ||
        (((f = Protocol_1.Aki.Protocol.S3n.create()).iVn = t.Handle),
        (f.J4n = MathUtils_1.MathUtils.BigIntToLong(t.Id)),
        (f.P6n = t.Level),
        (f.P4n = MathUtils_1.MathUtils.NumberToLong(this.CreatureDataId)),
        t.InstigatorId &&
          (f.Sjn = MathUtils_1.MathUtils.NumberToLong(t.InstigatorId)),
        (f.Ejn = e),
        (f.Y4n = t.GetRemainDuration()),
        (f.Tjn = t.ServerId),
        (f.Ijn = t.StackCount),
        CombatMessage_1.CombatNet.Call(
          22664,
          this.Entity,
          Protocol_1.Aki.Protocol.S3n.create(f),
          void 0,
          t.PreMessageId,
          t.MessageId,
          o,
        ));
    }
    BroadcastActivateBuff(t, e) {
      var o;
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t) ||
        (((o = Protocol_1.Aki.Protocol.k3n.create()).iVn = t.Handle),
        (o.Djn = e),
        CombatMessage_1.CombatNet.Call(5875, this.Entity, o));
    }
    BroadcastBuffStackChanged(t, e, o, f, r, i) {
      var a;
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t) ||
        (((a = Protocol_1.Aki.Protocol.i4n.create()).rVn = t.Handle),
        (a.Ajn = o),
        (a.Ujn = f),
        (a.Sjn = i ?? 0),
        CombatMessage_1.CombatNet.Call(6891, this.Entity, a, void 0));
    }
    static BroadcastAddBuffNotify(t, e, o) {
      var f = e.iVn,
        r = MathUtils_1.MathUtils.LongToBigInt(e.J4n),
        i = MathUtils_1.MathUtils.LongToNumber(e.Sjn),
        t = t?.GetComponent(159),
        a = MathUtils_1.MathUtils.LongToBigInt(o?.N8n ?? -1),
        o = MathUtils_1.MathUtils.LongToBigInt(o?.k8n ?? -1);
      if (t?.Valid) {
        var s = CharacterBuffController_1.default.GetBuffDefinition(r);
        if (t && s && f !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
          const n = t.TagComponent;
          n &&
            s.RemoveBuffWithTags?.forEach((t) => {
              n.RemoveTag(t);
            }),
            t.AddBuffRemote(r, f, {
              IsActive: e.qHn,
              InstigatorId: i,
              Level: e.P6n,
              ApplyType: e.Ejn,
              PreMessageId: a,
              MessageId: o,
              ServerId: e.Tjn,
              Duration: e.Y4n,
              Reason: "远端通知添加buff",
            });
        }
      }
    }
    static BroadcastBuffStackChangedNotify(t, e) {
      var o = e.rVn,
        e = e.Ajn,
        t = t?.GetComponent(159),
        o = t?.GetBuffByHandle(o);
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
              Protocol_1.Aki.Protocol.oFs.Proto_Common,
              void 0,
              void 0,
              o.ServerId,
              !1,
              !1,
              "远端Buff层数变化通知",
            ));
    }
    BroadcastRemoveBuff(t, e, o, f) {
      var r;
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t) ||
        (((r = Protocol_1.Aki.Protocol.E3n.create()).iVn = t.Handle),
        (r.P4n = MathUtils_1.MathUtils.NumberToLong(this.CreatureDataId)),
        (r.Ujn = e),
        CombatMessage_1.CombatNet.Call(
          20108,
          this.Entity,
          r,
          void 0,
          f,
          void 0,
          o,
        ));
    }
    static BroadcastRemoveBuffNotify(t, e) {
      var o = e.iVn,
        f = t?.GetComponent(159);
      f?.Valid
        ? f?.RemoveBuffInner(o, -1, !0, "远端通知移除buff")
        : CombatLog_1.CombatLog.Warn(
            "Buff",
            t,
            "Invalid entity when processing RemoveGameplayEffectNotify",
            ["entity id", e.P4n],
            ["handle", e.iVn],
          );
    }
    static OrderAddBuffS2cNotify(t, e, o) {
      var f = t?.GetComponent(159),
        r = MathUtils_1.MathUtils.LongToBigInt(e.J4n),
        i = MathUtils_1.MathUtils.LongToNumber(e.Sjn),
        o = MathUtils_1.MathUtils.LongToBigInt(o?.k8n ?? -1),
        a = CharacterBuffController_1.default.GetBuffDefinition(r),
        s = new Protocol_1.Aki.Protocol.A4n();
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
            e.P6n,
            e.Ijn,
            e.Ejn,
            o,
            void 0,
            e.Y4n,
            void 0,
            e.Tjn,
            "远端请求添加玩家Buff(s2c)",
            !1,
            e.yjn,
            !0,
            void 0,
          )),
          (r = f.BuffContainer.get(a)),
          (s.iVn = a),
          (s.qHn = !!r?.IsActive()),
          (s.O4n = Protocol_1.Aki.Protocol.O4n.NRs);
      } else s.O4n = Protocol_1.Aki.Protocol.O4n.Proto_UnKnownError;
      CombatMessage_1.CombatNet.Send(
        NetDefine_1.ECombatPushDataMessage.A4n,
        t,
        s,
        o,
        void 0,
        !0,
      );
    }
    static OrderRemoveBuffS2cNotify(t, e, o) {
      var f = t?.GetComponent(159),
        o = MathUtils_1.MathUtils.LongToBigInt(o?.k8n ?? -1),
        f =
          (f?.RemoveBuffByHandle(e.iVn, e.Ijn, "远端请求移除buff(s2c)", o, !0),
          new Protocol_1.Aki.Protocol.U4n());
      (f.O4n = Protocol_1.Aki.Protocol.O4n.NRs),
        CombatMessage_1.CombatNet.Send(
          NetDefine_1.ECombatPushDataMessage.U4n,
          t,
          f,
          o,
          void 0,
          !0,
        );
    }
    RemoveBuffOrder(t, e, o) {
      var f;
      t <= 0 ||
        (CharacterBuffController_1.default.GetBuffDefinition(t),
        ((f = Protocol_1.Aki.Protocol.N3n.create()).J4n =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (f.Ijn = e),
        CombatMessage_1.CombatNet.Call(5399, this.Entity, f));
    }
    static OrderRemoveBuffByIdS2cNotify(t, e, o) {
      var f = t?.GetComponent(159),
        r = MathUtils_1.MathUtils.LongToBigInt(e.L6n),
        o = MathUtils_1.MathUtils.LongToBigInt(o?.k8n ?? -1),
        i = new Protocol_1.Aki.Protocol.R4n();
      f?.Valid
        ? (f.RemoveBuff(r, e.Ijn, "远端移除buff(s2c) reason=" + e.E9n, o, !0),
          (i.O4n = Protocol_1.Aki.Protocol.O4n.NRs))
        : (CombatLog_1.CombatLog.Warn(
            "Buff",
            t,
            "Invalid entity when processing RemoveBuffByIdS2cRequestNotify",
            ["entity id", t?.Id],
            ["buffId", r],
          ),
          (i.O4n = Protocol_1.Aki.Protocol.O4n.Proto_UnKnownError)),
        CombatMessage_1.CombatNet.Send(
          NetDefine_1.ECombatPushDataMessage.R4n,
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
        ApplyType: r = Protocol_1.Aki.Protocol.oFs.Proto_Common,
        PreMessageId: i = void 0,
        Duration: a = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
        ServerId: s = void 0,
        IsIterable: n = !0,
      },
    ) {
      var u;
      t <= 0 ||
        (((u = Protocol_1.Aki.Protocol.O3n.create()).J4n =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (u.P6n = o),
        (u.Ijn = f),
        (u.Sjn = MathUtils_1.MathUtils.NumberToLong(e)),
        (u.Ejn = r),
        (u.Y4n = a),
        (u.Tjn = s ?? 0),
        (u.yjn = n),
        CombatMessage_1.CombatNet.Call(16793, this.Entity, u, void 0, i));
    }
    static OrderAddBuffNotify(t, e, o) {
      var f,
        r = t?.CheckGetComponent(159);
      r
        ? r &&
          ((f = MathUtils_1.MathUtils.LongToBigInt(e.J4n)),
          r.AddBuffLocal(f, {
            InstigatorId: MathUtils_1.MathUtils.LongToNumber(e.Sjn),
            Level: e.P6n,
            ApplyType: e.Ejn,
            PreMessageId: o?.k8n
              ? MathUtils_1.MathUtils.LongToBigInt(o.k8n)
              : void 0,
            Duration: e.Y4n,
            IsIterable: e.yjn,
            OuterStackCount: e.Ijn,
            ServerId: e.Tjn,
            IsServerOrder: !0,
            Reason: "服务端或其它客户端请求添加Buff",
          }))
        : CombatLog_1.CombatLog.Error(
            "Buff",
            t,
            "收到服务端请求添加buff，但找不到对应的entity",
            ["entity", t],
            ["buffId", e.J4n],
            ["InstigatorId", e.Sjn],
          );
    }
    static OrderRemoveBuffNotify(t, e) {
      var o = t?.GetComponent(159),
        f = MathUtils_1.MathUtils.LongToBigInt(e.J4n);
      o
        ? o.RemoveBuffLocal(f, e.Ijn, "服务端或其它客户端请求本端移除buff")
        : ((o = CharacterBuffController_1.default.GetBuffDefinition(f)),
          CombatLog_1.CombatLog.Error(
            "Buff",
            t,
            "[order] 移除Buff请求找不到对应实体",
            ["buffId", f],
            ["持有者", t?.Id],
            ["说明", o?.Desc],
          ));
    }
    static OrderRemoveBuffByTagsNotify(t, e) {
      var o = t?.GetComponent(159);
      if (o)
        for (const r of e.Ljn) {
          var f = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(r);
          o.RemoveBuffByTagLocal(r, `远端请求根据tag ${f} 移除buff`);
        }
      else
        CombatLog_1.CombatLog.Error(
          "Buff",
          t,
          "[order] 根据tag移除Buff请求找不到对应实体",
          [
            "tagId",
            e?.Ljn.map((t) =>
              GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
            ),
          ],
        );
    }
    static BroadcastActivateBuffNotify(t, e) {
      var o = t?.GetComponent(159),
        f = e.iVn,
        r = e.Djn,
        i = o?.GetBuffByHandle(f);
      !o || o.HasBuffAuthority()
        ? CombatLog_1.CombatLog.Warn(
            "Buff",
            t,
            "主端收到了非主控端发来的buff激活状态变更请求，或找不到Buff持有者，将不做处理",
            ["handle", f],
            ["buffId", i?.Id],
            ["本地激活状态", r],
            ["远端激活状态", e.Djn],
          )
        : o.OnBuffActiveChanged(i, r);
    }
    UpdateSysGrowBuff(t) {
      0 <= this.Hbr &&
        this.RemoveBuffByHandleLocal(this.Hbr, -1, "更新系统成长值");
      const o = CharacterBuffController_1.default.CreateDynamicBuffRef();
      (o.StackingType = 0),
        (o.DurationPolicy = 1),
        (o.Modifiers = []),
        (o.Desc = "系统成长buff"),
        t.forEach((t, e) => {
          0 !== t &&
            o.Modifiers.push({
              AttributeId: e,
              Value1: [t],
              Value2: [0],
              CalculationPolicy: [0],
            });
        }),
        (this.Hbr = this.AddBuffInner(
          ActiveBuffConfigs_1.DYNAMIC_BUFF_ID,
          o,
          this.CreatureDataId,
          1,
          void 0,
          Protocol_1.Aki.Protocol.oFs.Proto_Common,
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
      var f;
      return 0 === e
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
            Protocol_1.Aki.Protocol.oFs.Proto_Common,
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
      var o;
      return !t || t.length <= 0
        ? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
        : (((o =
            CharacterBuffController_1.default.CreateDynamicBuffRef()).GrantedTags =
            [...t]),
          (o.StackingType = 0),
          (o.DurationPolicy = 1),
          0 < e &&
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
            Protocol_1.Aki.Protocol.oFs.Proto_Common,
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
      this.HasBuffAuthority() &&
        t !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE &&
        o > NO_BROADCAST_CD_THRESHOLD &&
        (((o = Protocol_1.Aki.Protocol.C4n.create()).rVn = t),
        (o.r5n = e),
        CombatMessage_1.CombatNet.Call(29037, this.Entity, o));
    }
    GetDebugBuffString(t = "") {
      let o = "";
      var e = [...t.matchAll(/[0-9]+/g)].map((t) => t[0] ?? "");
      for (const f of this.BuffContainer.values()) {
        const r = String(f.Id);
        if (!(0 < e.length) || e.some((t) => r.startsWith(t))) {
          let e =
            (f.Id === ActiveBuffConfigs_1.DYNAMIC_BUFF_ID
              ? "系统buff"
              : (this.HasBuffAuthority() ? "RemoteBuff_" : "Buff_") + r) +
            `(${this.BuffGarbageSet.has(f.Handle) ? "销毁" : f.IsActive() ? "激活" : "失效"})  handle: ${f.Handle},  层数: ${f.StackCount},  等级: ${f.Level} 
    施加者: ${f.GetInstigatorActorComponent()?.Actor.GetName()},  时长: ${f.Duration < 0 ? "无限" : f.GetRemainDuration().toFixed(1) + "/" + f.Duration.toFixed(1)},  ${0 < f.Period ? `周期: ${f.GetRemainPeriod()?.toFixed(1)}/` + f.Period.toFixed(1) : ""}
    说明: ${f.Config?.Desc}
`;
          f.Config.GrantedTags?.forEach((t) => {
            e += `    +附加标签 ${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)}
`;
          });
          for (const i of this.BuffEffectManager.GetEffectsByHandle(f.Handle))
            e += `    +激活效果 ${i.GetDebugString()}(cd:${(this.GetBuffEffectCd(f.Id, i.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)
`;
          o += e + "\n";
        }
      }
      return o;
    }
  });
(CharacterBuffComponent.jbr = void 0),
  (CharacterBuffComponent.Wbr = void 0),
  (CharacterBuffComponent.Kbr = void 0),
  (CharacterBuffComponent.Qbr = void 0),
  (CharacterBuffComponent.Xbr = void 0),
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
    [CombatMessage_1.CombatNet.Listen("dFn", !1)],
    CharacterBuffComponent,
    "BroadcastAddBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("QFn", !1)],
    CharacterBuffComponent,
    "BroadcastBuffStackChangedNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("CFn", !1)],
    CharacterBuffComponent,
    "BroadcastRemoveBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("n3n", !1)],
    CharacterBuffComponent,
    "OrderAddBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("s3n", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("u3n", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffByIdS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Handle("wFn")],
    CharacterBuffComponent,
    "OrderAddBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("bFn", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("GFn", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffByTagsNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("qFn", !1)],
    CharacterBuffComponent,
    "BroadcastActivateBuffNotify",
    null,
  ),
  (CharacterBuffComponent = CharacterBuffComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(159)],
      CharacterBuffComponent,
    )),
  (exports.CharacterBuffComponent = CharacterBuffComponent);
//# sourceMappingURL=CharacterBuffComponent.js.map
