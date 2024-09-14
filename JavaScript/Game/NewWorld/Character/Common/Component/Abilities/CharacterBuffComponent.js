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
      return this.Entity.GetComponent(34);
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
        (this.AttributeComponent = this.Entity.CheckGetComponent(159)),
        (this.TagComponent = this.Entity.CheckGetComponent(190)),
        (this.CueComponent = this.Entity.GetComponent(19)),
        (this.DeathComponent = this.Entity.GetComponent(15)),
        (this.TimeScaleComponent = this.Entity.GetComponent(110)),
        (this.CreatureDataComponent = this.Entity.GetComponent(0)),
        !0
      );
    }
    OnStart() {
      return this.BuffEffectManager?.Clear(), !0;
    }
    InitBornBuff() {
      CharacterBuffComponent_1.jbr.Start();
      var t = this.CreatureDataComponent.ComponentDataMap,
        e = t.get("mys")?.mys?.MIs;
      if (e && this.HasBuffAuthority())
        for (const h of e) {
          var o = MathUtils_1.MathUtils.LongToNumber(h.Rjn),
            f = h.$8n ? MathUtils_1.MathUtils.LongToBigInt(h.$8n) : void 0,
            r = MathUtils_1.MathUtils.LongToBigInt(h.b6n);
          this.AddBuffLocal(r, {
            InstigatorId: o,
            Level: h.F6n,
            ApplyType: h.xjn,
            PreMessageId: f,
            Duration: h.n5n,
            IsIterable: h.Pjn,
            OuterStackCount: h.Bjn,
            ServerId: h.wjn,
            IsServerOrder: !0,
            Reason: "服务端或其它客户端请求添加Buff(缓冲) messageId=" + f,
          });
        }
      (e = t.get("vys")?.vys?.EIs), (t = t.get("vys")?.vys?.SIs);
      if (e)
        for (const c of e) {
          var i = MathUtils_1.MathUtils.LongToBigInt(c.b6n);
          for (let t = 0; t < c.GTs.length; t++)
            this.SetBuffEffectCd(
              i,
              t,
              c.GTs[t] * CommonDefine_1.MILLIONSECOND_PER_SECOND,
            );
        }
      if (t)
        for (const _ of t) {
          var a = _,
            s = MathUtils_1.MathUtils.LongToBigInt(a.b6n ?? -1),
            n = MathUtils_1.MathUtils.LongToNumber(a.Rjn),
            u = a.cVn ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
          this.AddBuffRemote(s, u, {
            Level: a.F6n,
            InstigatorId: n,
            ApplyType: a.xjn,
            Duration: a.n5n,
            RemainDuration: a.QEs,
            IsActive: a.WHn,
            ServerId: a.wjn,
            OuterStackCount: a.Bjn,
            Reason: "服务器通过通知FightBuffComponent恢复Buff",
            MessageId: MathUtils_1.MathUtils.LongToBigInt(a.$8n),
          }),
            this.BuffContainer.get(u)?.SetRemainDuration(a.QEs);
        }
      CharacterBuffComponent_1.jbr.Stop();
    }
    OnClear() {
      this.TriggerMap.clear();
      for (const t of [...this.BuffContainer.values()]) t.Destroy();
      return this.PauseLocks.clear(), super.OnClear(), !0;
    }
    OnActivate() {
      for (const t of this.GetAllBuffs())
        this.CueComponent?.CreateGameplayCueByBuff(t);
      (this.Vbr = !0), this.InitBornBuff();
    }
    HasBuffAuthority() {
      var t;
      return (
        !(
          this.Entity.GetComponent(0).GetEntityType() !==
            Protocol_1.Aki.Protocol.kks.Proto_Monster ||
          !this.DeathComponent?.IsDead()
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
    RemoveBuffByTag(f, r = void 0) {
      var t;
      void 0 !== f &&
        (this.HasBuffAuthority()
          ? this.RemoveBuffByTagLocal(f, r)
          : (((t = Protocol_1.Aki.Protocol.Y3n.create()).bjn = [f]),
            CombatMessage_1.CombatNet.Call(20815, this.Entity, t, (t) => {
              if (
                t?.Q4n ===
                Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist
              ) {
                var e = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(f);
                for (const o of this.BuffContainer.values())
                  o.Config.GrantedTags?.some((t) =>
                    GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, f),
                  ) &&
                    this.RemoveBuffInner(o.Handle, -1, !0, r ?? "移除tag " + e);
              }
            })));
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
      var e = this.Entity.GetComponent(86)?.GetSkillLevelByBuffId(t);
      return (void 0 !== e && 0 < e) ||
        (void 0 !==
          (e = this.Entity.GetComponent(36)?.GetVisionLevelByBuffId(t)) &&
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
          for (const _ of c.RemoveBuffWithTags)
            this.HasBuffAuthority() && this.RemoveBuffByTag(_, h),
              this.TagComponent.RemoveTag(_);
        }
        this.Vbr && this.CueComponent?.CreateGameplayCueByBuff(t),
          n && this.ShareApplyBuffInner(t, e, o, t.MessageId, r, a);
      }
    }
    ShareApplyBuffInner(t, e, o, f, r, i) {
      var a, s, n;
      this.HasBuffAuthority() &&
        (a = this.Entity.GetComponent(49)?.RoleId) &&
        4 === t.Config?.FormationPolicy &&
        (a = EntitySystem_1.EntitySystem.Get(a)?.GetComponent(160)) &&
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
        this.Vbr && this.CueComponent?.DestroyGameplayCueByBuff(t),
        Info_1.Info.IsBuildDevelopmentOrDebug) &&
        (this.Entity.GetComponent(24)?.OnBuffRemoved(t),
        this.Entity.GetComponent(20)?.OnBuffRemoved(t));
    }
    OnBuffStackIncreased(t, e, o, f, r, i, a, s, n, u, h, c, _) {
      t &&
        (this.BroadcastBuffStackChanged(t, e, o, !1, _, f),
        super.OnBuffStackIncreased(t, e, o, f, r, i, a, s, n, u, h, c, _),
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
        (((f = Protocol_1.Aki.Protocol.R3n.create()).uVn = t.Handle),
        (f.s5n = MathUtils_1.MathUtils.BigIntToLong(t.Id)),
        (f.F6n = t.Level),
        (f.F4n = MathUtils_1.MathUtils.NumberToLong(this.CreatureDataId)),
        t.InstigatorId &&
          (f.Rjn = MathUtils_1.MathUtils.NumberToLong(t.InstigatorId)),
        (f.xjn = e),
        (f.n5n = t.GetRemainDuration()),
        (f.wjn = t.ServerId),
        (f.Bjn = t.StackCount),
        CombatMessage_1.CombatNet.Call(
          17266,
          this.Entity,
          Protocol_1.Aki.Protocol.R3n.create(f),
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
        (((o = Protocol_1.Aki.Protocol.$3n.create()).uVn = t.Handle),
        (o.qjn = e),
        CombatMessage_1.CombatNet.Call(22107, this.Entity, o));
    }
    BroadcastBuffStackChanged(t, e, o, f, r, i) {
      var a;
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t) ||
        (((a = Protocol_1.Aki.Protocol.u4n.create()).cVn = t.Handle),
        (a.Gjn = o),
        (a.Ojn = f),
        (a.Rjn = i ?? 0),
        CombatMessage_1.CombatNet.Call(22731, this.Entity, a, void 0));
    }
    static BroadcastAddBuffNotify(t, e, o) {
      CharacterBuffComponent_1.Wbr.Start();
      var f = e.uVn,
        r = MathUtils_1.MathUtils.LongToBigInt(e.s5n),
        i = MathUtils_1.MathUtils.LongToNumber(e.Rjn),
        t = t?.GetComponent(160),
        a = MathUtils_1.MathUtils.LongToBigInt(o?.X8n ?? -1),
        o = MathUtils_1.MathUtils.LongToBigInt(o?.$8n ?? -1);
      if (t?.Valid) {
        var s = CharacterBuffController_1.default.GetBuffDefinition(r);
        if (t && s && f !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
          const n = t.TagComponent;
          n &&
            s.RemoveBuffWithTags?.forEach((t) => {
              n.RemoveTag(t);
            }),
            t.AddBuffRemote(r, f, {
              IsActive: e.WHn,
              InstigatorId: i,
              Level: e.F6n,
              ApplyType: e.xjn,
              PreMessageId: a,
              MessageId: o,
              ServerId: e.wjn,
              Duration: e.n5n,
              Reason: "远端通知添加buff",
            });
        }
      }
      CharacterBuffComponent_1.Wbr.Stop();
    }
    static BroadcastBuffStackChangedNotify(t, e) {
      var o = e.cVn,
        e = e.Gjn,
        t = t?.GetComponent(160),
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
              Protocol_1.Aki.Protocol.uFs.Proto_Common,
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
        (((r = Protocol_1.Aki.Protocol.x3n.create()).uVn = t.Handle),
        (r.F4n = MathUtils_1.MathUtils.NumberToLong(this.CreatureDataId)),
        (r.Ojn = e),
        CombatMessage_1.CombatNet.Call(
          27448,
          this.Entity,
          r,
          void 0,
          f,
          void 0,
          o,
        ));
    }
    static BroadcastRemoveBuffNotify(t, e) {
      var o = e.uVn,
        f = t?.GetComponent(160);
      f?.Valid
        ? f?.RemoveBuffInner(o, -1, !0, "远端通知移除buff")
        : CombatLog_1.CombatLog.Warn(
            "Buff",
            t,
            "Invalid entity when processing RemoveGameplayEffectNotify",
            ["entity id", e.F4n],
            ["handle", e.uVn],
          );
    }
    static OrderAddBuffS2cNotify(t, e, o) {
      var f = t?.GetComponent(160),
        r = MathUtils_1.MathUtils.LongToBigInt(e.s5n),
        i = MathUtils_1.MathUtils.LongToNumber(e.Rjn),
        o = MathUtils_1.MathUtils.LongToBigInt(o?.$8n ?? -1),
        a = CharacterBuffController_1.default.GetBuffDefinition(r),
        s = new Protocol_1.Aki.Protocol.G4n();
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
            e.F6n,
            e.Bjn,
            e.xjn,
            o,
            void 0,
            e.n5n,
            void 0,
            e.wjn,
            "远端请求添加玩家Buff(s2c)",
            !1,
            e.Pjn,
            !0,
            void 0,
          )),
          (r = f.BuffContainer.get(a)),
          (s.uVn = a),
          (s.WHn = !!r?.IsActive()),
          (s.Q4n = Protocol_1.Aki.Protocol.Q4n.KRs);
      } else s.Q4n = Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError;
      CombatMessage_1.CombatNet.Send(
        NetDefine_1.ECombatPushDataMessage.G4n,
        t,
        s,
        o,
        void 0,
        !0,
      );
    }
    static OrderRemoveBuffS2cNotify(t, e, o) {
      var f = t?.GetComponent(160),
        o = MathUtils_1.MathUtils.LongToBigInt(o?.$8n ?? -1),
        f =
          (f?.RemoveBuffByHandle(e.uVn, e.Bjn, "远端请求移除buff(s2c)", o, !0),
          new Protocol_1.Aki.Protocol.O4n());
      (f.Q4n = Protocol_1.Aki.Protocol.Q4n.KRs),
        CombatMessage_1.CombatNet.Send(
          NetDefine_1.ECombatPushDataMessage.O4n,
          t,
          f,
          o,
          void 0,
          !0,
        );
    }
    RemoveBuffOrder(e, o, f) {
      var t;
      e <= 0 ||
        (CharacterBuffController_1.default.GetBuffDefinition(e),
        ((t = Protocol_1.Aki.Protocol.X3n.create()).s5n =
          MathUtils_1.MathUtils.BigIntToLong(e)),
        (t.Bjn = o),
        CombatMessage_1.CombatNet.Call(20120, this.Entity, t, (t) => {
          t?.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist &&
            (t = this.GetBuffById(e)) &&
            this.RemoveBuffInner(t.Handle, o, !0, f, void 0, !1);
        }));
    }
    static OrderRemoveBuffByIdS2cNotify(t, e, o) {
      var f = t?.GetComponent(160),
        r = MathUtils_1.MathUtils.LongToBigInt(e.b6n),
        o = MathUtils_1.MathUtils.LongToBigInt(o?.$8n ?? -1),
        i = new Protocol_1.Aki.Protocol.N4n();
      f?.Valid
        ? (f.RemoveBuff(r, e.Bjn, "远端移除buff(s2c) reason=" + e.x9n, o, !0),
          (i.Q4n = Protocol_1.Aki.Protocol.Q4n.KRs))
        : (CombatLog_1.CombatLog.Warn(
            "Buff",
            t,
            "Invalid entity when processing RemoveBuffByIdS2cRequestNotify",
            ["entity id", t?.Id],
            ["buffId", r],
          ),
          (i.Q4n = Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError)),
        CombatMessage_1.CombatNet.Send(
          NetDefine_1.ECombatPushDataMessage.N4n,
          t,
          i,
          o,
          void 0,
          !0,
        );
    }
    AddBuffOrder(
      e,
      {
        InstigatorId: o,
        Level: f = ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL,
        OuterStackCount: r = 0,
        ApplyType: i = Protocol_1.Aki.Protocol.uFs.Proto_Common,
        PreMessageId: a = void 0,
        Duration: s = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
        ServerId: n = void 0,
        IsIterable: u = !0,
        Reason: h,
      },
    ) {
      var t;
      e <= 0 ||
        (((t = Protocol_1.Aki.Protocol.Q3n.create()).s5n =
          MathUtils_1.MathUtils.BigIntToLong(e)),
        (t.F6n = f),
        (t.Bjn = r),
        (t.Rjn = MathUtils_1.MathUtils.NumberToLong(o)),
        (t.xjn = i),
        (t.n5n = s),
        (t.wjn = n ?? 0),
        (t.Pjn = u),
        CombatMessage_1.CombatNet.Call(
          19686,
          this.Entity,
          t,
          (t) => {
            t?.Q4n ===
              Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist &&
              this.AddBuffInner(
                e,
                CharacterBuffController_1.default.GetBuffDefinition(e),
                o,
                f,
                r,
                i,
                a,
                void 0,
                s,
                void 0,
                n ?? 0,
                h,
                u,
                !1,
                !1,
                void 0,
              );
          },
          a,
        ));
    }
    static OrderAddBuffNotify(t, e, o) {
      var f,
        r = t?.CheckGetComponent(160);
      r
        ? r &&
          ((f = MathUtils_1.MathUtils.LongToBigInt(e.s5n)),
          r.AddBuffLocal(f, {
            InstigatorId: MathUtils_1.MathUtils.LongToNumber(e.Rjn),
            Level: e.F6n,
            ApplyType: e.xjn,
            PreMessageId: o?.$8n
              ? MathUtils_1.MathUtils.LongToBigInt(o.$8n)
              : void 0,
            Duration: e.n5n,
            IsIterable: e.Pjn,
            OuterStackCount: e.Bjn,
            ServerId: e.wjn,
            IsServerOrder: !0,
            Reason: "服务端或其它客户端请求添加Buff",
          }))
        : CombatLog_1.CombatLog.Error(
            "Buff",
            t,
            "收到服务端请求添加buff，但找不到对应的entity",
            ["entity", t],
            ["buffId", e.s5n],
            ["InstigatorId", e.Rjn],
          );
    }
    static OrderRemoveBuffNotify(t, e) {
      var o = t?.GetComponent(160),
        f = MathUtils_1.MathUtils.LongToBigInt(e.s5n);
      o
        ? o.RemoveBuffLocal(f, e.Bjn, "服务端或其它客户端请求本端移除buff")
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
      var o = t?.GetComponent(160);
      if (o)
        for (const r of e.bjn) {
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
            e?.bjn.map((t) =>
              GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
            ),
          ],
        );
    }
    static BroadcastActivateBuffNotify(t, e) {
      var o = t?.GetComponent(160),
        f = e.uVn,
        r = e.qjn,
        i = o?.GetBuffByHandle(f);
      !o || o.HasBuffAuthority()
        ? CombatLog_1.CombatLog.Warn(
            "Buff",
            t,
            "主端收到了非主控端发来的buff激活状态变更请求，或找不到Buff持有者，将不做处理",
            ["handle", f],
            ["buffId", i?.Id],
            ["本地激活状态", r],
            ["远端激活状态", e.qjn],
          )
        : o.OnBuffActiveChanged(i, r);
    }
    UpdateSysGrowBuff(t) {
      CharacterBuffComponent_1.Kbr.Start(),
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
          Protocol_1.Aki.Protocol.uFs.Proto_Common,
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
        )),
        CharacterBuffComponent_1.Kbr.Stop();
    }
    AddAttributeRateModifierLocal(t, e, o) {
      if (0 === e) return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
      CharacterBuffComponent_1.Qbr.Start();
      var f = CharacterBuffController_1.default.CreateDynamicBuffRef(),
        t =
          ((f.StackingType = 0),
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
            Protocol_1.Aki.Protocol.uFs.Proto_Common,
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
      return CharacterBuffComponent_1.Qbr.Stop(), t;
    }
    AddTagWithReturnHandle(t, e = -1) {
      if (!t || t.length <= 0) return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
      CharacterBuffComponent_1.Xbr.Start();
      var o = CharacterBuffController_1.default.CreateDynamicBuffRef(),
        t =
          ((o.GrantedTags = [...t]),
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
            Protocol_1.Aki.Protocol.uFs.Proto_Common,
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
      return CharacterBuffComponent_1.Xbr.Stop(), t;
    }
    SetBuffEffectCd(t, e, o) {
      super.SetBuffEffectCd(t, e, o);
      t =
        this.GetBuffById(t)?.Handle ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
      this.HasBuffAuthority() &&
        t !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE &&
        o > NO_BROADCAST_CD_THRESHOLD &&
        (((o = Protocol_1.Aki.Protocol.I4n.create()).cVn = t),
        (o.c5n = e),
        CombatMessage_1.CombatNet.Call(28897, this.Entity, o));
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
            e += `    +激活效果 undefined(cd:${(this.GetBuffEffectCd(f.Id, i.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)
`;
          o += e + "\n";
        }
      }
      return o;
    }
  });
(CharacterBuffComponent.jbr = Stats_1.Stat.Create("AddBuff_Born")),
  (CharacterBuffComponent.Wbr = Stats_1.Stat.Create("AddBuff_BroadcastNotify")),
  (CharacterBuffComponent.Kbr = Stats_1.Stat.Create("AddBuff_SysGrow")),
  (CharacterBuffComponent.Qbr = Stats_1.Stat.Create(
    "AddBuff_AttributeRateModifier",
  )),
  (CharacterBuffComponent.Xbr = Stats_1.Stat.Create("AddBuff_AddTag")),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("yFn", !1)],
    CharacterBuffComponent,
    "BroadcastAddBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("i3n", !1)],
    CharacterBuffComponent,
    "BroadcastBuffStackChangedNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("IFn", !1)],
    CharacterBuffComponent,
    "BroadcastRemoveBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("d3n", !1)],
    CharacterBuffComponent,
    "OrderAddBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("C3n", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("M3n", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffByIdS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Handle("HFn")],
    CharacterBuffComponent,
    "OrderAddBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("jFn", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("KFn", !1)],
    CharacterBuffComponent,
    "OrderRemoveBuffByTagsNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("WFn", !1)],
    CharacterBuffComponent,
    "BroadcastActivateBuffNotify",
    null,
  ),
  (CharacterBuffComponent = CharacterBuffComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(160)],
      CharacterBuffComponent,
    )),
  (exports.CharacterBuffComponent = CharacterBuffComponent);
//# sourceMappingURL=CharacterBuffComponent.js.map
