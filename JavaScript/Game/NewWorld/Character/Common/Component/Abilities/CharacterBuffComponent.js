"use strict";
var CharacterBuffComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, o, r) {
      var f,
        i = arguments.length,
        a =
          i < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, o))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, o, r);
      else
        for (var s = t.length - 1; 0 <= s; s--)
          (f = t[s]) &&
            (a = (i < 3 ? f(a) : 3 < i ? f(e, o, a) : f(e, o)) || a);
      return 3 < i && a && Object.defineProperty(e, o, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterBuffComponent = void 0);
const Info_1 = require("../../../../../../Core/Common/Info"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  BaseBuffComponent_1 = require("./BaseBuffComponent"),
  ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  CharacterBuffController_1 = require("./CharacterBuffController"),
  ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes"),
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
      return this.Entity.GetComponent(38);
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
        super.OnInit(),
        (this.ActorComponent = this.Entity.CheckGetComponent(1)),
        (this.AttributeComponent = this.Entity.CheckGetComponent(171)),
        (this.TagComponent = this.Entity.CheckGetComponent(203)),
        (this.CueComponent = this.Entity.GetComponent(21)),
        (this.DeathComponent = this.Entity.GetComponent(15)),
        (this.TimeScaleComponent = this.Entity.GetComponent(120)),
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
            r = h.$8n ? MathUtils_1.MathUtils.LongToBigInt(h.$8n) : void 0,
            f = MathUtils_1.MathUtils.LongToNumber(h.b6n);
          this.AddBuffLocal(f, {
            InstigatorId: o,
            Level: h.F6n,
            ApplyType: h.xjn,
            PreMessageId: r,
            Duration: h.n5n,
            IsIterable: h.Pjn,
            OuterStackCount: h.Bjn,
            ServerId: h.wjn,
            IsServerOrder: !0,
            Reason: "服务端或其它客户端请求添加Buff(缓冲) messageId=" + r,
          });
        }
      (e = t.get("vys")?.vys?.EIs), (t = t.get("vys")?.vys?.SIs);
      if (e)
        for (const C of e) {
          var i = MathUtils_1.MathUtils.LongToNumber(C.b6n);
          for (let t = 0; t < C.GTs.length; t++)
            this.SetBuffEffectCd(
              i,
              t,
              C.GTs[t] * CommonDefine_1.MILLIONSECOND_PER_SECOND,
            );
        }
      if (t)
        for (const c of t) {
          var a = c,
            s = MathUtils_1.MathUtils.LongToNumber(a.b6n ?? -1),
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
          this.CreatureDataComponent &&
          (this.CreatureDataComponent.GetEntityType() !==
            Protocol_1.Aki.Protocol.kks.Proto_Monster ||
            !this.DeathComponent?.IsDead())
        ) ||
        ((t = this.CreatureDataComponent?.GetSummonerPlayerId()),
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t)
      );
    }
    NeedAddBuffOrder(t) {
      t = CharacterBuffController_1.default.GetBuffDefinition(t);
      return !(
        !t ||
        (5 === t.FormationPolicy &&
          this.CreatureDataComponent?.IsMonster() &&
          0 === this.CreatureDataComponent?.GetSummonerPlayerId())
      );
    }
    AddBuffWithServerId(e, o, r, f, i) {
      if (!(e <= ActiveBuffConfigs_1.NULL_BUFF_ID))
        for (let t = 0; t < r; t++) {
          var a = this.AddBuffLocal(e, {
              InstigatorId: this.CreatureDataId,
              Level: o,
              Duration: ActiveBuffConfigs_1.DEFAULT_SERVER_GE_DURATION,
              ServerId: f,
              Reason: i,
            }),
            s = CharacterBuffController_1.default.GetBuffDefinition(e);
          a === ActiveBuffConfigs_1.INVALID_BUFF_HANDLE &&
            CombatLog_1.CombatLog.Error(
              "Buff",
              this.Entity,
              "系统buff添加失败",
              ["buffId", e],
              ["serverId", f],
              ["持有者", this.GetDebugName()],
              ["说明", s?.Desc],
            );
        }
    }
    RemoveBuffByServerIdLocal(t, e) {
      if (this.HasBuffAuthority())
        for (const r of [...this.BuffContainer.values()]) {
          var o = r.Handle;
          this.BuffGarbageSet.has(o) ||
            (r.ServerId === t && this.RemoveBuffInner(o, -1, !0, e));
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
    RemoveBuffByTag(r, f = void 0) {
      var t;
      void 0 !== r &&
        (this.HasBuffAuthority()
          ? this.RemoveBuffByTagLocal(r, f)
          : (((t = Protocol_1.Aki.Protocol.Y3n.create()).bjn = [r]),
            CombatMessage_1.CombatNet.Call(16586, this.Entity, t, (t) => {
              if (
                t?.Q4n ===
                Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist
              ) {
                var e = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(r);
                for (const o of this.BuffContainer.values())
                  o.Config.GrantedTags?.some((t) =>
                    GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, r),
                  ) &&
                    this.RemoveBuffInner(o.Handle, -1, !0, f ?? "移除tag " + e);
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
        for (const f of t)
          this.GetBuffByHandle(f)?.InstigatorId === o &&
            this.RemoveBuffByHandle(f, -1, e);
      else
        for (const i of t) {
          var r = this.GetBuffByHandle(i);
          r?.InstigatorId === o && this.RemoveBuffOrder(r.Id, -1, e);
        }
    }
    RemoveAllDurationBuffs(t) {
      var e = [];
      for (const o of this.BuffContainer.values())
        2 === o.Config.DurationPolicy && e.push(o.Handle);
      for (const r of e) this.RemoveBuffByHandle(r, -1, t);
    }
    GetBuffLevel(t) {
      var e = this.Entity.GetComponent(93)?.GetSkillLevelByBuffId(t);
      return (void 0 !== e && 0 < e) ||
        (void 0 !==
          (e = this.Entity.GetComponent(42)?.GetVisionLevelByBuffId(t)) &&
          0 < e)
        ? e
        : void 0;
    }
    OnBuffAdded(t, e, o, r, f, i, a, s, n, u, h) {
      if (t) {
        CharacterBuffComponent_1.T__.Start(),
          this.BroadcastAddBuff(t, o, u, s, h);
        var C = t.Config;
        if (
          (super.OnBuffAdded(t, e, o, r, f, i, a, s, n, u, h),
          C.RemoveBuffWithTags && 0 < C.RemoveBuffWithTags.length)
        ) {
          const h = `因为buff${t.Id}(handle=${t.Handle})的RemoveBuffWithTags导致移除`;
          for (const c of C.RemoveBuffWithTags)
            this.HasBuffAuthority() && this.RemoveBuffByTag(c, h),
              this.TagComponent.RemoveTag(c);
        }
        this.Vbr && this.CueComponent?.CreateGameplayCueByBuff(t),
          n && this.ShareApplyBuffInner(t, e, o, t.MessageId, f, a),
          CharacterBuffComponent_1.T__.Stop();
      }
    }
    ShareApplyBuffInner(t, e, o, r, f, i) {
      var a, s, n;
      this.HasBuffAuthority() &&
        (a = this.CreatureDataComponent?.GetSummonerId()) &&
        4 === t.Config?.FormationPolicy &&
        (a =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(
            a,
          )?.Entity?.GetComponent(172)) &&
        ((s = t.Id),
        (n = t.Handle),
        a.AddBuffLocal(s, {
          InstigatorId:
            t.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
          Level: t.Level,
          OuterStackCount: e,
          ApplyType: o,
          PreMessageId: r,
          Duration: f,
          ServerId: i,
          IsIterable: !1,
          Reason: `因为buff${s}(handle=${n})的队伍共享机制导致的buff添加`,
        }));
    }
    OnBuffRemoved(t, e, o, r, f) {
      t &&
        (CharacterBuffComponent_1.b__.Start(),
        this.BroadcastRemoveBuff(t, e, r, f),
        super.OnBuffRemoved(t, e, o, r, f),
        this.Vbr && this.CueComponent?.DestroyGameplayCueByBuff(t),
        Info_1.Info.IsBuildDevelopmentOrDebug &&
          (this.Entity.GetComponent(27)?.OnBuffRemoved(t),
          this.Entity.GetComponent(22)?.OnBuffRemoved(t)),
        CharacterBuffComponent_1.b__.Stop());
    }
    OnBuffStackIncreased(t, e, o, r, f, i, a, s, n, u, h, C, c) {
      t &&
        (CharacterBuffComponent_1.L__.Start(),
        this.BroadcastBuffStackChanged(t, e, o, !1, c, r),
        super.OnBuffStackIncreased(t, e, o, r, f, i, a, s, n, u, h, C, c),
        this.HasBuffAuthority() &&
          h &&
          this.ShareApplyBuffInner(t, i, a, t.MessageId, n, u),
        CharacterBuffComponent_1.L__.Stop());
    }
    OnBuffStackDecreased(t, e, o, r, f) {
      t &&
        (CharacterBuffComponent_1.A__.Start(),
        this.BroadcastBuffStackChanged(t, e, o, r, f),
        super.OnBuffStackDecreased(t, e, o, r, f),
        CharacterBuffComponent_1.A__.Stop());
    }
    OnBuffActiveChanged(t, e) {
      CharacterBuffComponent_1.x__.Start(),
        t &&
          t.IsActive() !== e &&
          (this.BroadcastActivateBuff(t, e), super.OnBuffActiveChanged(t, e)),
        CharacterBuffComponent_1.x__.Stop();
    }
    BroadcastAddBuff(t, e, o, r, f) {
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t, r) ||
        (!t.IsInstantBuff() && t.Handle < 0) ||
        (((r = Protocol_1.Aki.Protocol.ie_.create()).uVn = t.Handle),
        (r.s5n = MathUtils_1.MathUtils.NumberToLong(t.Id)),
        (r.F6n = t.Level),
        t.InstigatorId &&
          (r.Rjn = MathUtils_1.MathUtils.NumberToLong(t.InstigatorId)),
        (r.xjn = e),
        (r.n5n = t.GetRemainDuration()),
        (r.wjn = t.ServerId),
        (r.Bjn = t.StackCount),
        CombatMessage_1.CombatNet.Send(
          18338,
          this.Entity,
          Protocol_1.Aki.Protocol.ie_.create(r),
          t.PreMessageId,
          t.MessageId,
          o,
        ));
    }
    BroadcastActivateBuff(t, e) {
      var o;
      CharacterBuffComponent_1.R__.Start(),
        !t ||
          t.Id < 0 ||
          !this.NeedBroadcastBuff(t) ||
          (((o = Protocol_1.Aki.Protocol.pe_.create()).uVn = t.Handle),
          (o.qjn = e),
          CombatMessage_1.CombatNet.Send(15323, this.Entity, o)),
        CharacterBuffComponent_1.R__.Stop();
    }
    BroadcastBuffStackChanged(t, e, o, r, f, i) {
      var a;
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t) ||
        (((a = Protocol_1.Aki.Protocol.Re_.create()).cVn = t.Handle),
        (a.Gjn = o),
        (a.Ojn = r),
        (a.Rjn = i ?? 0),
        CombatMessage_1.CombatNet.Send(20343, this.Entity, a));
    }
    BroadcastRemoveBuff(t, e, o, r) {
      var f;
      !t ||
        t.Id < 0 ||
        !this.NeedBroadcastBuff(t) ||
        (((f = Protocol_1.Aki.Protocol.re_.create()).uVn = t.Handle),
        (f.F4n = MathUtils_1.MathUtils.NumberToLong(this.CreatureDataId)),
        (f.Ojn = e),
        CombatMessage_1.CombatNet.Send(20235, this.Entity, f, r, void 0, o));
    }
    RemoveBuffOrder(e, o, r) {
      var t;
      e <= 0 ||
        (CharacterBuffController_1.default.GetBuffDefinition(e),
        ((t = Protocol_1.Aki.Protocol.X3n.create()).s5n =
          MathUtils_1.MathUtils.NumberToLong(e)),
        (t.Bjn = o),
        CombatMessage_1.CombatNet.Call(19961, this.Entity, t, (t) => {
          t?.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist &&
            (t = this.GetBuffById(e)) &&
            this.RemoveBuffInner(t.Handle, o, !0, r, void 0, !1);
        }));
    }
    AddBuffOrder(
      o,
      {
        InstigatorId: r,
        Level: f = ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL,
        OuterStackCount: i = 0,
        ApplyType: a = Protocol_1.Aki.Protocol.uFs.Proto_Common,
        PreMessageId: s = void 0,
        Duration: n = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
        ServerId: u = void 0,
        IsIterable: h = !0,
        Reason: C,
        BulletMessageId: c = void 0,
      },
    ) {
      var t;
      o <= 0 ||
        (((t = Protocol_1.Aki.Protocol.Q3n.create()).s5n =
          MathUtils_1.MathUtils.NumberToLong(o)),
        (t.F6n = f),
        (t.Bjn = i),
        (t.Rjn = MathUtils_1.MathUtils.NumberToLong(r)),
        (t.xjn = a),
        (t.n5n = n),
        (t.wjn = u ?? 0),
        (t.Pjn = h),
        c && (t.YT1 = { XT1: MathUtils_1.MathUtils.BigIntToLong(c) }),
        CombatMessage_1.CombatNet.Call(
          28780,
          this.Entity,
          t,
          (t) => {
            var e;
            t?.Q4n ===
              Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist &&
              this.AddBuffInner(
                o,
                CharacterBuffController_1.default.GetBuffDefinition(o),
                r,
                f,
                i,
                a,
                s,
                void 0,
                n,
                void 0,
                u ?? 0,
                C,
                h,
                !1,
                !1,
                void 0,
                c,
              ),
              t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
                r !== ActiveBuffConfigs_1.NULL_INSTIGATOR_ID &&
                ((t =
                  ModelManager_1.ModelManager.CreatureModel.GetEntity(
                    r,
                  )?.Entity),
                (e = CharacterBuffController_1.default.GetBuffDefinition(o)),
                t) &&
                e &&
                SceneTeamController_1.SceneTeamController.EmitAbilityEvent(
                  t,
                  2,
                  o,
                  o,
                  this.Entity,
                  t,
                  i && 0 < i ? i : e.DefaultStackCount,
                  c,
                );
          },
          s,
        ));
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
      var r = CharacterBuffController_1.default.CreateDynamicBuffRef(),
        t =
          ((r.StackingType = 0),
          (r.DurationPolicy = 1),
          (r.Modifiers = []),
          (r.Desc = o),
          r.Modifiers.push({
            AttributeId: t,
            Value1: [e * CharacterAttributeTypes_1.PER_TEN_THOUSAND],
            Value2: [0],
            CalculationPolicy: [1],
          }),
          this.AddBuffInner(
            ActiveBuffConfigs_1.DYNAMIC_BUFF_ID,
            r,
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
        (((o = Protocol_1.Aki.Protocol.Ge_.create()).cVn = t),
        (o.c5n = e),
        CombatMessage_1.CombatNet.Send(25486, this.Entity, o));
    }
    GetDebugBuffString(t = "") {
      let o = "";
      var e = [...t.matchAll(/[0-9]+/g)].map((t) => t[0] ?? "");
      for (const f of this.BuffContainer.values()) {
        const i = String(f.Id);
        if (!(0 < e.length) || e.some((t) => i.startsWith(t))) {
          let e =
            (f.Id === ActiveBuffConfigs_1.DYNAMIC_BUFF_ID
              ? "系统buff"
              : (this.HasBuffAuthority() ? "RemoteBuff_" : "Buff_") + i) +
            `(${this.BuffGarbageSet.has(f.Handle) ? "销毁" : f.IsActive() ? "激活" : "失效"})  handle: ${f.Handle},  层数: ${f.StackCount},  等级: ${f.Level} 
    施加者: ${f.GetInstigatorActorComponent()?.Actor.GetName()},  时长: ${f.Duration < 0 ? "无限" : f.GetRemainDuration().toFixed(1) + "/" + f.Duration.toFixed(1)},  ${0 < f.Period ? `周期: ${f.GetRemainPeriod()?.toFixed(1)}/` + f.Period.toFixed(1) : ""}
    说明: ${f.Config?.Desc}
`;
          f.Config.GrantedTags?.forEach((t) => {
            e += `    +附加标签 ${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)}
`;
          });
          for (const a of this.BuffEffectManager.GetEffectsByHandle(f.Handle))
            e += `    +持续效果 ${""}(cd:${(this.GetBuffEffectCd(f.Id, a.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)
`;
          for (const s of f.Config.EffectInfos) {
            var r = s.ExecutionEffect;
            ExtraEffectBaseTypes_1.periodExecutionIds.has(s.ExtraEffectId) &&
              r &&
              (e += "    +周期效果 \n");
          }
          o += e + "\n";
        }
      }
      return o;
    }
  });
(CharacterBuffComponent.jbr = Stats_1.Stat.Create("AddBuff_Born")),
  (CharacterBuffComponent.T__ = Stats_1.Stat.Create(
    "CharacterBuffComponent.OnBuffAdded",
  )),
  (CharacterBuffComponent.b__ = Stats_1.Stat.Create(
    "CharacterBuffComponent.OnBuffRemoved",
  )),
  (CharacterBuffComponent.L__ = Stats_1.Stat.Create(
    "CharacterBuffComponent.OnBuffStackIncreased",
  )),
  (CharacterBuffComponent.A__ = Stats_1.Stat.Create(
    "CharacterBuffComponent.OnBuffStackDecreased",
  )),
  (CharacterBuffComponent.x__ = Stats_1.Stat.Create(
    "CharacterBuffComponent.OnBuffActiveChanged",
  )),
  (CharacterBuffComponent.R__ = Stats_1.Stat.Create(
    "CharacterBuffComponent.BroadcastActivateBuff",
  )),
  (CharacterBuffComponent.Kbr = Stats_1.Stat.Create("AddBuff_SysGrow")),
  (CharacterBuffComponent.Qbr = Stats_1.Stat.Create(
    "AddBuff_AttributeRateModifier",
  )),
  (CharacterBuffComponent.Xbr = Stats_1.Stat.Create("AddBuff_AddTag")),
  (CharacterBuffComponent = CharacterBuffComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(172)],
      CharacterBuffComponent,
    )),
  (exports.CharacterBuffComponent = CharacterBuffComponent);
//# sourceMappingURL=CharacterBuffComponent.js.map
