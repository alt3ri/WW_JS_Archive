"use strict";
var PlayerBuffComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, o, r) {
      var f,
        n = arguments.length,
        a =
          n < 3
            ? t
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, o))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, o, r);
      else
        for (var s = e.length - 1; 0 <= s; s--)
          (f = e[s]) &&
            (a = (n < 3 ? f(a) : 3 < n ? f(t, o, a) : f(t, o)) || a);
      return 3 < n && a && Object.defineProperty(t, o, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerBuffComponent = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../../Utils/CombatLog"),
  BaseBuffComponent_1 = require("../../Character/Common/Component/Abilities/BaseBuffComponent"),
  ActiveBuffConfigs_1 = require("../../Character/Common/Component/Abilities/Buff/ActiveBuffConfigs"),
  ExtraEffectManager_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectManager");
let PlayerBuffComponent =
  (PlayerBuffComponent_1 = class PlayerBuffComponent extends (
    BaseBuffComponent_1.BaseBuffComponent
  ) {
    constructor() {
      super(...arguments),
        (this.PlayerId = 0),
        (this.BuffEffectManager = void 0),
        (this.xie = () => {
          this.BuffLock++;
          var e = new Set();
          for (const r of this.TagListenerDict.values())
            for (const f of r) e.add(f);
          for (const n of e) {
            var t,
              o = this.GetBuffByHandle(n);
            o &&
              (this.CheckRemove(o.Config, o.GetInstigator())
                ? this.RemoveBuffInner(n, -1, !0, "因为切人导致不满足tag条件")
                : (t = this.CheckActivate(o.Config, o.GetInstigator())) !==
                    o.IsActive() && this.OnBuffActiveChanged(o, t));
          }
          this.BuffLock--;
        });
    }
    OnCreate() {
      return (
        (this.BuffEffectManager =
          new ExtraEffectManager_1.PlayerExtraEffectManager(this)),
        !0
      );
    }
    OnInitData(e) {
      var t = this.Entity.CheckGetComponent(0);
      return (
        (this.PlayerId = t?.GetPlayerId() ?? 0),
        0 !== this.PlayerId ||
          (CombatLog_1.CombatLog.Error("Actor", this.Entity, "PlayerId为0", [
            "EntityId",
            this.Entity.Id,
          ]),
          !1)
      );
    }
    OnStart() {
      return (
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        ),
        !0
      );
    }
    OnActivate() {
      this.InitBornBuff();
    }
    OnClear() {
      this.TriggerMap.clear();
      for (const e of this.BuffContainer.values()) e.Destroy();
      return super.OnClear(), !0;
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        ),
        !0
      );
    }
    IsPaused() {
      return this.GetCurrentBuffComponent()?.IsPaused() ?? !1;
    }
    InitBornBuff() {
      var e =
        this.Entity.CheckGetComponent(0)?.ComponentDataMap.get("vys")?.vys;
      if (e) {
        var t = e.EIs;
        if (t)
          for (const s of t) {
            var o = MathUtils_1.MathUtils.LongToNumber(s.b6n);
            for (let e = 0; e < s.GTs.length; e++)
              this.SetBuffEffectCd(
                o,
                e,
                s.GTs[e] * CommonDefine_1.MILLIONSECOND_PER_SECOND,
              );
          }
        t = e.SIs;
        if (t)
          for (const i of t) {
            var r = i,
              f = MathUtils_1.MathUtils.LongToNumber(r.b6n ?? -1),
              n = MathUtils_1.MathUtils.LongToNumber(r.Rjn),
              a = r.cVn ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
            this.AddBuffRemote(f, a, {
              Level: r.F6n,
              InstigatorId: n,
              ApplyType: r.xjn,
              Duration: r.n5n,
              RemainDuration: r.QEs,
              IsActive: r.WHn,
              ServerId: r.wjn,
              OuterStackCount: r.Bjn,
              Reason: "服务器通过通知FightBuffComponent恢复PlayerBuff",
              MessageId: MathUtils_1.MathUtils.LongToBigInt(r.$8n),
            }),
              this.BuffContainer.get(a)?.SetRemainDuration(r.QEs);
          }
      }
    }
    GetDebugName() {
      return "player_" + this.PlayerId;
    }
    GetEntity() {
      return ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(
        this.PlayerId,
        { ParamType: 2, IsControl: !0 },
      )?.EntityHandle?.Entity;
    }
    GetTimeScale() {
      var e = this.GetEntity();
      return (
        (e?.TimeDilation ?? 1) * (e?.GetComponent(120)?.CurrentTimeScale ?? 1)
      );
    }
    GetCurrentBuffComponent() {
      return this.GetEntity()?.GetComponent(172);
    }
    GetSkillComponent() {
      return this.GetEntity()?.GetComponent(38);
    }
    GetAttributeComponent() {
      return this.GetEntity()?.GetComponent(171);
    }
    GetTagComponent() {
      return this.GetEntity()?.GetComponent(203);
    }
    CheckAdd(e, t, o) {
      return !this.GetTagComponent() || super.CheckAdd(e, t, o);
    }
    CheckActivate(e, t) {
      return !this.GetTagComponent() || super.CheckActivate(e, t);
    }
    HasBuffRoutineExpirationLock(e) {
      return (
        0 < (this.BuffRoutineExpirationLock.get(e) ?? 0) ||
        0 <
          (this.GetCurrentBuffComponent()?.BuffRoutineExpirationLock.get(e) ??
            0)
      );
    }
    GetActorComponent() {
      return this.GetEntity()?.GetComponent(1);
    }
    GetBuffLevel(e) {
      return this.GetEntity()?.GetComponent(172)?.GetBuffLevel(e);
    }
    GetCueComponent() {
      return this.Entity.GetComponent(222);
    }
    GetFormationBuffTotalStackById(e, t = !1) {
      return super.GetBuffTotalStackById(e, t);
    }
    GetBuffTotalStackById(e, t = !1) {
      return (
        (this.GetCurrentBuffComponent()?.GetBuffTotalStackById(e, t) ?? 0) +
        super.GetBuffTotalStackById(e, t)
      );
    }
    HasBuffAuthority() {
      return (
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.PlayerId
      );
    }
    AddBuffInner(e, t, o, r, f, n, a, s, i, u, C, m, l, h, B, p, _) {
      return 5 !== t.FormationPolicy &&
        e !== ActiveBuffConfigs_1.DYNAMIC_BUFF_ID
        ? (CombatLog_1.CombatLog.Warn(
            "Buff",
            this.Entity,
            "暂不支持对编队实体增删非编队buff",
            ["buffId", e],
            ["reason", m],
          ),
          ActiveBuffConfigs_1.INVALID_BUFF_HANDLE)
        : super.AddBuffInner(e, t, o, r, f, n, a, s, i, u, C, m, l, h, B, p, _);
    }
    OnBuffAdded(e, t, o, r, f, n, a, s, i, u, C) {
      if (e) {
        PlayerBuffComponent_1.q__.Start(), this.BroadcastAddBuff(e, o, u, s, C);
        var m = e.Config,
          t =
            (super.OnBuffAdded(e, t, o, r, f, n, a, s, i, u, C),
            ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(
              this.PlayerId,
            ) ?? []);
        for (const B of t) {
          var l = B.EntityHandle?.Entity;
          if (B.EntityHandle?.Valid && l) {
            var h = l?.GetComponent(172);
            if (h && m.RemoveBuffWithTags && 0 < m.RemoveBuffWithTags.length) {
              const C = `因为buff${e.Id}(handle=${e.Handle})的RemoveBuffWithTags导致移除`;
              for (const p of m.RemoveBuffWithTags)
                h.HasBuffAuthority() && h.RemoveBuffByTag(p, C),
                  h.TagComponent.RemoveTag(p);
            }
            PlayerBuffComponent_1.k__.Start(),
              B.EntityHandle?.IsInit &&
                l?.GetComponent(21)?.CreateGameplayCueByBuff(e),
              PlayerBuffComponent_1.k__.Stop();
          }
        }
        PlayerBuffComponent_1.q__.Stop();
      }
    }
    OnBuffRemoved(e, t, o, r, f) {
      if (e) {
        PlayerBuffComponent_1.O__.Start(),
          this.BroadcastRemoveBuff(e, t, f, r),
          super.OnBuffRemoved(e, t, o, r, f);
        t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(
          this.PlayerId,
        );
        if (t)
          for (const n of t)
            n.EntityHandle?.IsInit &&
              n.EntityHandle?.Entity?.GetComponent(
                21,
              )?.DestroyGameplayCueByBuff(e);
        this.Entity.GetComponent(223)?.DestroyPlayerGameplayCueByBuff(e),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            (this.Entity.GetComponent(27)?.OnBuffRemoved(e),
            this.Entity.GetComponent(22)?.OnBuffRemoved(e)),
          PlayerBuffComponent_1.O__.Stop();
      }
    }
    OnBuffStackIncreased(e, t, o, r, f, n, a, s, i, u, C, m, l) {
      e &&
        (PlayerBuffComponent_1.G__.Start(),
        this.BroadcastBuffStackChanged(e, t, o, !1, l, r),
        super.OnBuffStackIncreased(e, t, o, r, f, n, a, s, i, u, C, m, l),
        PlayerBuffComponent_1.G__.Stop());
    }
    OnBuffStackDecreased(e, t, o, r, f) {
      e &&
        (PlayerBuffComponent_1.F__.Start(),
        this.BroadcastBuffStackChanged(e, t, o, r, f),
        super.OnBuffStackDecreased(e, t, o, r, f),
        PlayerBuffComponent_1.F__.Stop());
    }
    OnBuffActiveChanged(e, t) {
      PlayerBuffComponent_1.N__.Start(),
        e &&
          e.IsActive() !== t &&
          (this.BroadcastActivateBuff(e, t), super.OnBuffActiveChanged(e, t)),
        PlayerBuffComponent_1.N__.Stop();
    }
    BroadcastAddBuff(e, t, o, r, f) {
      !e ||
        e.Id < 0 ||
        !this.NeedBroadcastBuff(e, r) ||
        (!e.IsInstantBuff() && e.Handle < 0) ||
        (((r = Protocol_1.Aki.Protocol.ie_.create()).uVn = e.Handle),
        (r.s5n = MathUtils_1.MathUtils.NumberToLong(e.Id)),
        (r.F6n = e.Level),
        (r.Rjn = e.InstigatorId ?? 0),
        (r.xjn = t),
        (r.n5n = e.Duration),
        (r.Bjn = e.StackCount),
        (r.WHn = e.IsActive()),
        CombatMessage_1.CombatNet.Send(
          18338,
          this.Entity,
          Protocol_1.Aki.Protocol.ie_.create(r),
          e.PreMessageId,
          e.MessageId,
          o,
        ));
    }
    BroadcastActivateBuff(e, t) {
      var o;
      PlayerBuffComponent_1.R__.Start(),
        !e ||
          e.Id < 0 ||
          !this.NeedBroadcastBuff(e) ||
          (((o = Protocol_1.Aki.Protocol.pe_.create()).uVn = e.Handle),
          (o.qjn = t),
          CombatMessage_1.CombatNet.Send(15323, this.Entity, o)),
        PlayerBuffComponent_1.R__.Stop();
    }
    BroadcastBuffStackChanged(e, t, o, r, f, n) {
      var a;
      !e ||
        e.Id < 0 ||
        !this.NeedBroadcastBuff(e) ||
        (((a = Protocol_1.Aki.Protocol.Re_.create()).cVn = e.Handle),
        (a.Gjn = o),
        (a.Ojn = r),
        (a.Rjn = n ?? 0),
        CombatMessage_1.CombatNet.Send(20343, this.Entity, a, void 0));
    }
    BroadcastRemoveBuff(e, t, o, r) {
      var f, n;
      !e ||
        e.Id < 0 ||
        !this.NeedBroadcastBuff(e) ||
        ((f = this.Entity.GetComponent(0)?.GetCreatureDataId()),
        ((n = Protocol_1.Aki.Protocol.re_.create()).uVn = e.Handle),
        (n.F4n = MathUtils_1.MathUtils.NumberToLong(f)),
        (n.Ojn = t),
        CombatMessage_1.CombatNet.Send(20235, this.Entity, n, o, void 0, r));
    }
    AddBuffOrder(e, t) {
      CombatLog_1.CombatLog.Warn(
        "Buff",
        this.Entity,
        "[buffComp] 客户端暂不能给其它玩家添加队伍buff",
        ["buffId", e],
        ["持有者", this.GetDebugName()],
        ["原因", t.Reason],
      );
    }
    RemoveBuffOrder(e, t, o) {
      CombatLog_1.CombatLog.Warn(
        "Buff",
        this.Entity,
        "[buffComp] 客户端暂不能给其它玩家移除队伍buff",
        ["buffId", e],
        ["持有者", this.GetDebugName()],
        ["原因", o],
      );
    }
    FormationBuffApplyRequest() {}
    CalculateDurationExtraRate(e, t) {
      let o = super.CalculateDurationExtraRate(e, t);
      var r = this.GetCurrentBuffComponent();
      if (r) {
        t = (t ? r.InstigatorBuffTimeModifiers : r.OwnerBuffTimeModifiers).get(
          e,
        );
        if (t) for (var [, f] of t.values()) o += f;
      }
      return o;
    }
    CalculatePeriodExtraRate(e, t) {
      let o = super.CalculatePeriodExtraRate(e, t);
      var r = this.GetCurrentBuffComponent();
      if (r) {
        t = (t ? r.InstigatorBuffTimeModifiers : r.OwnerBuffTimeModifiers).get(
          e,
        );
        if (t) for (var [f] of t.values()) o += f;
      }
      return o;
    }
  });
(PlayerBuffComponent.q__ = Stats_1.Stat.Create(
  "PlayerBuffComponent.OnBuffAdded",
)),
  (PlayerBuffComponent.k__ = Stats_1.Stat.Create(
    "PlayerBuffComponent.OnBuffAdded.CreateGameplayCueByBuff",
  )),
  (PlayerBuffComponent.O__ = Stats_1.Stat.Create(
    "PlayerBuffComponent.OnBuffRemoved",
  )),
  (PlayerBuffComponent.G__ = Stats_1.Stat.Create(
    "PlayerBuffComponent.OnBuffStackIncreased",
  )),
  (PlayerBuffComponent.F__ = Stats_1.Stat.Create(
    "PlayerBuffComponent.OnBuffStackDecreased",
  )),
  (PlayerBuffComponent.N__ = Stats_1.Stat.Create(
    "PlayerBuffComponent.OnBuffActiveChanged",
  )),
  (PlayerBuffComponent.R__ = Stats_1.Stat.Create(
    "PlayerBuffComponent.BroadcastActivateBuff",
  )),
  (PlayerBuffComponent = PlayerBuffComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(197)],
      PlayerBuffComponent,
    )),
  (exports.PlayerBuffComponent = PlayerBuffComponent);
//# sourceMappingURL=PlayerBuffComponent.js.map
