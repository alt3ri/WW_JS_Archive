"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, r) {
    var f,
      a = arguments.length,
      i =
        a < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      i = Reflect.decorate(t, e, o, r);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (f = t[n]) && (i = (a < 3 ? f(i) : 3 < a ? f(e, o, i) : f(e, o)) || i);
    return 3 < a && i && Object.defineProperty(e, o, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerBuffComponent = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  NetDefine_1 = require("../../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../Module/Abilities/FormationDataController"),
  CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../../Utils/CombatLog"),
  BaseBuffComponent_1 = require("../../Character/Common/Component/Abilities/BaseBuffComponent"),
  ActiveBuffConfigs_1 = require("../../Character/Common/Component/Abilities/Buff/ActiveBuffConfigs"),
  CharacterBuffController_1 = require("../../Character/Common/Component/Abilities/CharacterBuffController"),
  ExtraEffectManager_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectManager");
let PlayerBuffComponent = class PlayerBuffComponent extends BaseBuffComponent_1.BaseBuffComponent {
  constructor() {
    super(...arguments),
      (this.PlayerId = 0),
      (this.BuffEffectManager = void 0),
      (this.xie = () => {
        this.BuffLock++;
        var t = new Set();
        for (const r of this.TagListenerDict.values())
          for (const f of r) t.add(f);
        for (const a of t) {
          var e,
            o = this.GetBuffByHandle(a);
          o &&
            (this.CheckRemove(o.Config, o.GetInstigator())
              ? this.RemoveBuffInner(a, -1, !0, "因为切人导致不满足tag条件")
              : (e = this.CheckActivate(o.Config, o.GetInstigator())) !==
                  o.IsActive() && this.OnBuffActiveChanged(o, e));
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
  OnInitData(t) {
    var e = this.Entity.CheckGetComponent(0);
    return (
      (this.PlayerId = e?.GetPlayerId() ?? 0),
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
    for (const t of this.BuffContainer.values()) t.Destroy();
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
    var t = this.Entity.CheckGetComponent(0)?.ComponentDataMap.get("vys")?.vys;
    if (t) {
      var e = t.EIs;
      if (e)
        for (const n of e) {
          var o = MathUtils_1.MathUtils.LongToBigInt(n.b6n);
          for (let t = 0; t < n.GTs.length; t++)
            this.SetBuffEffectCd(
              o,
              t,
              n.GTs[t] * CommonDefine_1.MILLIONSECOND_PER_SECOND,
            );
        }
      e = t.SIs;
      if (e)
        for (const s of e) {
          var r = s,
            f = MathUtils_1.MathUtils.LongToBigInt(r.b6n ?? -1),
            a = MathUtils_1.MathUtils.LongToNumber(r.Rjn),
            i = r.cVn ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
          this.AddBuffRemote(f, i, {
            Level: r.F6n,
            InstigatorId: a,
            ApplyType: r.xjn,
            Duration: r.n5n,
            RemainDuration: r.QEs,
            IsActive: r.WHn,
            ServerId: r.wjn,
            OuterStackCount: r.Bjn,
            Reason: "服务器通过通知FightBuffComponent恢复PlayerBuff",
            MessageId: MathUtils_1.MathUtils.LongToBigInt(r.$8n),
          }),
            this.BuffContainer.get(i)?.SetRemainDuration(r.QEs);
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
    var t = this.GetEntity();
    return (
      (t?.TimeDilation ?? 1) * (t?.GetComponent(110)?.CurrentTimeScale ?? 1)
    );
  }
  GetCurrentBuffComponent() {
    return this.GetEntity()?.GetComponent(160);
  }
  GetSkillComponent() {
    return this.GetEntity()?.GetComponent(34);
  }
  GetAttributeComponent() {
    return this.GetEntity()?.GetComponent(159);
  }
  GetTagComponent() {
    return this.GetEntity()?.GetComponent(190);
  }
  CheckAdd(t, e, o) {
    return !this.GetTagComponent() || super.CheckAdd(t, e, o);
  }
  CheckActivate(t, e) {
    return !this.GetTagComponent() || super.CheckActivate(t, e);
  }
  GetActorComponent() {
    return this.GetEntity()?.GetComponent(3);
  }
  GetBuffLevel(t) {
    return this.GetEntity()?.GetComponent(160)?.GetBuffLevel(t);
  }
  GetCueComponent() {
    return this.GetEntity()?.GetComponent(19);
  }
  GetBuffTotalStackById(t, e = !1) {
    return (
      (this.GetCurrentBuffComponent()?.GetBuffTotalStackById(t, e) ?? 0) +
      super.GetBuffTotalStackById(t, e)
    );
  }
  HasBuffAuthority() {
    return (
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.PlayerId
    );
  }
  AddBuffInner(t, e, o, r, f, a, i, n, s, u, l, _, c, m, C, d) {
    return 5 !== e.FormationPolicy && t !== ActiveBuffConfigs_1.DYNAMIC_BUFF_ID
      ? (CombatLog_1.CombatLog.Warn(
          "Buff",
          this.Entity,
          "暂不支持对编队实体增删非编队buff",
          ["buffId", t],
          ["reason", _],
        ),
        ActiveBuffConfigs_1.INVALID_BUFF_HANDLE)
      : super.AddBuffInner(t, e, o, r, f, a, i, n, s, u, l, _, c, m, C, d);
  }
  OnBuffAdded(t, e, o, r, f, a, i, n, s, u, l) {
    if (t) {
      this.BroadcastAddBuff(t, o, u, n, l, r);
      var _ = t.Config,
        e =
          (super.OnBuffAdded(t, e, o, r, f, a, i, n, s, u, l),
          ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(
            this.PlayerId,
          ) ?? []);
      for (const C of e) {
        var c = C.EntityHandle?.Entity;
        if (C.EntityHandle?.Valid && c) {
          var m = c?.GetComponent(160);
          if (m && _.RemoveBuffWithTags && 0 < _.RemoveBuffWithTags.length) {
            const l = `因为buff${t.Id}(handle=${t.Handle})的RemoveBuffWithTags导致移除`;
            for (const d of _.RemoveBuffWithTags)
              m.HasBuffAuthority() && m.RemoveBuffByTag(d, l),
                m.TagComponent.RemoveTag(d);
          }
          C.EntityHandle?.IsInit &&
            c?.GetComponent(19)?.CreateGameplayCueByBuff(t);
        }
      }
    }
  }
  OnBuffRemoved(t, e, o, r, f) {
    if (t) {
      this.BroadcastRemoveBuff(t, e, f, r), super.OnBuffRemoved(t, e, o, r, f);
      e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(
        this.PlayerId,
      );
      if (e)
        for (const a of e)
          a.EntityHandle?.IsInit &&
            a.EntityHandle?.Entity?.GetComponent(19)?.DestroyGameplayCueByBuff(
              t,
            );
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        (this.Entity.GetComponent(24)?.OnBuffRemoved(t),
        this.Entity.GetComponent(20)?.OnBuffRemoved(t));
    }
  }
  OnBuffStackIncreased(t, e, o, r, f, a, i, n, s, u, l, _, c) {
    t &&
      (this.BroadcastBuffStackChanged(t, e, o, !1, c),
      super.OnBuffStackIncreased(t, e, o, r, f, a, i, n, s, u, l, _, c));
  }
  OnBuffStackDecreased(t, e, o, r, f) {
    t &&
      (this.BroadcastBuffStackChanged(t, e, o, r, f),
      super.OnBuffStackDecreased(t, e, o, r, f));
  }
  OnBuffActiveChanged(t, e) {
    t &&
      t.IsActive() !== e &&
      (this.BroadcastActivateBuff(t, e), super.OnBuffActiveChanged(t, e));
  }
  BroadcastAddBuff(t, e, o, r, f, a) {
    !t ||
      t.Id < 0 ||
      !this.NeedBroadcastBuff(t, r) ||
      (((r = new Protocol_1.Aki.Protocol.v4n()).uVn = t.Handle),
      (r.s5n = MathUtils_1.MathUtils.BigIntToLong(t.Id)),
      (r.F6n = t.Level),
      (r.Rjn = t.InstigatorId ?? 0),
      (r.xjn = e),
      (r.n5n = t.Duration),
      (r.Bjn = t.StackCount),
      (r.WHn = t.IsActive()),
      CombatMessage_1.CombatNet.Call(
        23908,
        void 0,
        r,
        void 0,
        a,
        t.MessageId,
        o,
      ));
  }
  BroadcastActivateBuff(t, e) {
    var o;
    !t ||
      t.Id < 0 ||
      !this.NeedBroadcastBuff(t) ||
      (((o = new Protocol_1.Aki.Protocol.E4n()).uVn = t.Handle),
      (o.qjn = e),
      CombatMessage_1.CombatNet.Call(29437, void 0, o, void 0));
  }
  BroadcastBuffStackChanged(t, e, o, r, f) {
    var a;
    !t ||
      t.Id < 0 ||
      !this.NeedBroadcastBuff(t) ||
      (((a = new Protocol_1.Aki.Protocol.M4n()).cVn = t.Handle),
      (a.Gjn = o),
      CombatMessage_1.CombatNet.Call(17285, void 0, a, void 0));
  }
  BroadcastRemoveBuff(t, e, o, r) {
    var f;
    !t ||
      t.Id < 0 ||
      !this.NeedBroadcastBuff(t) ||
      (((f = new Protocol_1.Aki.Protocol.S4n()).uVn = t.Handle),
      (f.Ojn = e),
      CombatMessage_1.CombatNet.Call(16706, void 0, f, void 0, o, void 0, r));
  }
  static OrderAddBuffS2cNotify(t, e, o) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      r =
        FormationDataController_1.FormationDataController.GetPlayerEntity(
          r,
        )?.GetComponent(184),
      f = MathUtils_1.MathUtils.LongToBigInt(e.s5n),
      a = MathUtils_1.MathUtils.LongToNumber(e.Rjn),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.$8n ?? -1),
      i = CharacterBuffController_1.default.GetBuffDefinition(f),
      n = new Protocol_1.Aki.Protocol.b4n();
    if (i) {
      const s = r.GetTagComponent();
      s &&
        i.RemoveBuffWithTags?.forEach((t) => {
          s.RemoveTag(t);
        }),
        (i = r.AddBuffInner(
          f,
          CharacterBuffController_1.default.GetBuffDefinition(f),
          a,
          e.F6n,
          e.Bjn,
          e.xjn,
          o,
          void 0,
          e.n5n,
          void 0,
          e.wjn,
          "远端请求添加编队Buff(s2c)",
          !1,
          !0,
          !0,
          void 0,
        )),
        (f = r.BuffContainer.get(i)),
        (n.uVn = i),
        (n.WHn =
          i === ActiveBuffConfigs_1.SUCCESS_INSTANT_BUFF_HANDLE ||
          (f?.IsActive() ?? !1)),
        (n.G9n = Protocol_1.Aki.Protocol.Q4n.KRs);
    } else n.G9n = Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError;
    CombatMessage_1.CombatNet.Send(
      NetDefine_1.ECombatPushDataMessage.b4n,
      void 0,
      n,
      o,
      void 0,
      !0,
    );
  }
  static OrderRemoveBuffS2cNotify(t, e, o) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      r =
        FormationDataController_1.FormationDataController.GetPlayerEntity(
          r,
        )?.GetComponent(184),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.$8n ?? -1),
      r =
        (r.RemoveBuffByHandle(e.uVn, e.Bjn, "远端请求移除buff(s2c)", o, !0),
        new Protocol_1.Aki.Protocol.q4n());
    (r.G9n = Protocol_1.Aki.Protocol.Q4n.KRs),
      CombatMessage_1.CombatNet.Send(
        NetDefine_1.ECombatPushDataMessage.q4n,
        void 0,
        r,
        o,
        void 0,
        !0,
      );
  }
  static OrderRemoveBuffByIdS2cNotify(t, e, o) {
    var r,
      f = new Protocol_1.Aki.Protocol.k4n(),
      a = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      a =
        FormationDataController_1.FormationDataController.GetPlayerEntity(
          a,
        )?.GetComponent(184),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.$8n ?? -1);
    a
      ? ((r = MathUtils_1.MathUtils.LongToBigInt(e.b6n)),
        a.RemoveBuff(r, e.Bjn, "远端移除buff(s2c) reason=" + e.x9n, o, !0),
        (f.G9n = Protocol_1.Aki.Protocol.Q4n.KRs))
      : (f.G9n = Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError),
      CombatMessage_1.CombatNet.Send(
        NetDefine_1.ECombatPushDataMessage.k4n,
        void 0,
        f,
        o,
        void 0,
        !0,
      );
  }
  static BroadcastAddBuffNotify(t, e, o) {
    var r = FormationDataController_1.FormationDataController.GetPlayerEntity(
        e.W5n,
      )?.GetComponent(184),
      f = e.uVn,
      a = MathUtils_1.MathUtils.LongToBigInt(e.s5n),
      i = MathUtils_1.MathUtils.LongToNumber(e.Rjn),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.X8n ?? -1);
    if (r?.Valid) {
      var n = CharacterBuffController_1.default.GetBuffDefinition(a);
      if (n && f !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
        const s = r.GetTagComponent();
        s &&
          n.RemoveBuffWithTags?.forEach((t) => {
            s.RemoveTag(t);
          }),
          r.AddBuffInner(
            a,
            CharacterBuffController_1.default.GetBuffDefinition(a),
            i,
            e.F6n,
            e.Bjn,
            e.xjn,
            o,
            void 0,
            e.n5n,
            e.WHn,
            e.wjn,
            "远端通知添加buff",
            !0,
            !0,
            !1,
            f,
          );
      }
    } else
      CombatLog_1.CombatLog.Warn(
        "Buff",
        r?.Entity,
        "Invalid entity when processing FormationBuffApplyNotify",
        ["handle", e.uVn],
        ["buffId", a],
        ["playerId", e.W5n],
        ["InstigatorId", i],
      );
  }
  static BroadcastRemoveBuffNotify(t, e, o) {
    var r = e.uVn,
      f = FormationDataController_1.FormationDataController.GetPlayerEntity(
        e.W5n,
      )?.GetComponent(184);
    f?.Valid
      ? f?.RemoveBuffInner(r, -1, !0, "远端通知移除buff")
      : CombatLog_1.CombatLog.Warn(
          "Buff",
          f?.Entity,
          "Invalid entity when processing RemoveGameplayEffectNotify",
          ["player id", e.W5n],
          ["handle", e.uVn],
        );
  }
  static BroadcastBuffStackChangedNotify(t, e) {
    var o = e.Gjn,
      r = FormationDataController_1.FormationDataController.GetPlayerEntity(
        e.W5n,
      )?.GetComponent(184),
      e = r?.GetBuffByHandle(e.cVn);
    r &&
      e &&
      (e.StackCount > o
        ? r.OnBuffStackDecreased(e, e.StackCount, o, !0, "远端Buff层数变化通知")
        : e.StackCount <= o &&
          r.OnBuffStackIncreased(
            e,
            e.StackCount,
            o,
            void 0,
            e.Level,
            void 0,
            Protocol_1.Aki.Protocol.uFs.Proto_Common,
            void 0,
            void 0,
            e.ServerId,
            !1,
            !1,
            "远端Buff层数变化通知",
          ));
  }
  static BroadcastActivateBuffNotify(t, e) {
    var o = FormationDataController_1.FormationDataController.GetPlayerEntity(
        e.W5n,
      )?.GetComponent(184),
      r = e.qjn,
      f = o?.GetBuffByHandle(e.uVn);
    !o || o.HasBuffAuthority()
      ? CombatLog_1.CombatLog.Warn(
          "Buff",
          o?.Entity,
          "主端收到了非主控端发来的buff激活状态变更请求，或找不到Buff持有者，将不做处理",
          ["handle", e.uVn],
          ["buffId", f?.Id],
          ["本地激活状态", r],
          ["远端激活状态", e.qjn],
        )
      : o.OnBuffActiveChanged(f, r);
  }
  AddBuffOrder(t, e) {
    CombatLog_1.CombatLog.Warn(
      "Buff",
      this.Entity,
      "[buffComp] 客户端暂不能给其它玩家添加队伍buff",
      ["buffId", t],
      ["持有者", this.GetDebugName()],
      ["原因", e.Reason],
    );
  }
  RemoveBuffOrder(t, e, o) {
    CombatLog_1.CombatLog.Warn(
      "Buff",
      this.Entity,
      "[buffComp] 客户端暂不能给其它玩家移除队伍buff",
      ["buffId", t],
      ["持有者", this.GetDebugName()],
      ["原因", o],
    );
  }
  FormationBuffApplyRequest() {}
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("c3n", !1)],
  PlayerBuffComponent,
  "OrderAddBuffS2cNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("m3n", !1)],
    PlayerBuffComponent,
    "OrderRemoveBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("S3n", !1)],
    PlayerBuffComponent,
    "OrderRemoveBuffByIdS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("_3n", !1)],
    PlayerBuffComponent,
    "BroadcastAddBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("g3n", !1)],
    PlayerBuffComponent,
    "BroadcastRemoveBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("u3n", !1)],
    PlayerBuffComponent,
    "BroadcastBuffStackChangedNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("f3n", !1)],
    PlayerBuffComponent,
    "BroadcastActivateBuffNotify",
    null,
  ),
  (PlayerBuffComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(184)],
    PlayerBuffComponent,
  )),
  (exports.PlayerBuffComponent = PlayerBuffComponent);
//# sourceMappingURL=PlayerBuffComponent.js.map
