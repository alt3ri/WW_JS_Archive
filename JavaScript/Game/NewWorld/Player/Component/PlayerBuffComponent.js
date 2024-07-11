"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    var f,
      a = arguments.length,
      n =
        a < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, o, r);
    else
      for (var i = e.length - 1; 0 <= i; i--)
        (f = e[i]) && (n = (a < 3 ? f(n) : 3 < a ? f(t, o, n) : f(t, o)) || n);
    return 3 < a && n && Object.defineProperty(t, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerBuffComponent = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  Stats_1 = require("../../../../Core/Common/Stats"),
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
        var e = new Set();
        for (const r of this.TagListenerDict.values())
          for (const f of r) e.add(f);
        for (const a of e) {
          var t,
            o = this.GetBuffByHandle(a);
          o &&
            (this.CheckRemove(o.Config, o.GetInstigator())
              ? this.RemoveBuffInner(a, -1, !0, "因为切人导致不满足tag条件")
              : (t = this.CheckActivate(o.Config, o.GetInstigator())) !==
                  o.IsActive() && this.OnBuffActiveChanged(o, t));
        }
        this.BuffLock--;
      });
  }
  OnCreate(e) {
    return (
      (this.PlayerId = e?.PlayerId ?? 0),
      (this.BuffEffectManager =
        new ExtraEffectManager_1.PlayerExtraEffectManager(this)),
      !0
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
  AddInitPlayerBuff(e) {
    for (const t of e)
      this.AddBuffRemote(MathUtils_1.MathUtils.LongToBigInt(t.J4n), t.iVn, {
        InstigatorId: MathUtils_1.MathUtils.LongToNumber(t.Sjn),
        Level: t.P6n,
        OuterStackCount: t.Ijn,
        ApplyType: t.Ejn,
        Duration: t.Y4n,
        RemainDuration: t.FEs,
        ServerId: t.Tjn,
        IsActive: t.qHn,
        Reason: "服务器初始化下发",
      });
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
      (e?.TimeDilation ?? 1) * (e?.GetComponent(109)?.CurrentTimeScale ?? 1)
    );
  }
  GetCurrentBuffComponent() {
    return this.GetEntity()?.GetComponent(159);
  }
  GetSkillComponent() {
    return this.GetEntity()?.GetComponent(33);
  }
  GetAttributeComponent() {
    return this.GetEntity()?.GetComponent(158);
  }
  GetTagComponent() {
    return this.GetEntity()?.GetComponent(188);
  }
  CheckAdd(e, t, o) {
    return !this.GetTagComponent() || super.CheckAdd(e, t, o);
  }
  CheckActivate(e, t) {
    return !this.GetTagComponent() || super.CheckActivate(e, t);
  }
  GetActorComponent() {
    return this.GetEntity()?.GetComponent(3);
  }
  GetBuffLevel(e) {
    return this.GetEntity()?.GetComponent(159)?.GetBuffLevel(e);
  }
  GetCueComponent() {
    return this.GetEntity()?.GetComponent(19);
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
  AddBuffInner(e, t, o, r, f, a, n, i, s, u, l, c, _, d, m, C) {
    return 5 !== t.FormationPolicy && e !== ActiveBuffConfigs_1.DYNAMIC_BUFF_ID
      ? (CombatLog_1.CombatLog.Warn(
          "Buff",
          this.Entity,
          "暂不支持对编队实体增删非编队buff",
          ["buffId", e],
          ["reason", c],
        ),
        ActiveBuffConfigs_1.INVALID_BUFF_HANDLE)
      : super.AddBuffInner(e, t, o, r, f, a, n, i, s, u, l, c, _, d, m, C);
  }
  OnBuffAdded(e, t, o, r, f, a, n, i, s, u, l) {
    if (e) {
      this.BroadcastAddBuff(e, o, u, i, l, r);
      var c = e.Config,
        t =
          (super.OnBuffAdded(e, t, o, r, f, a, n, i, s, u, l),
          ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(
            this.PlayerId,
          ) ?? []);
      for (const m of t) {
        var _ = m.EntityHandle?.Entity;
        if (m.EntityHandle?.Valid && _) {
          var d = _?.GetComponent(159);
          if (d && c.RemoveBuffWithTags && 0 < c.RemoveBuffWithTags.length) {
            const l = `因为buff${e.Id}(handle=${e.Handle})的RemoveBuffWithTags导致移除`;
            for (const C of c.RemoveBuffWithTags)
              d.HasBuffAuthority() && d.RemoveBuffByTag(C, l),
                d.TagComponent.RemoveTag(C);
          }
          m.EntityHandle?.IsInit &&
            _?.GetComponent(19)?.CreateGameplayCueByBuff(e);
        }
      }
    }
  }
  OnBuffRemoved(e, t, o, r, f) {
    if (e) {
      this.BroadcastRemoveBuff(e, t, f, r), super.OnBuffRemoved(e, t, o, r, f);
      t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(
        this.PlayerId,
      );
      if (t)
        for (const a of t)
          a.EntityHandle?.IsInit &&
            a.EntityHandle?.Entity?.GetComponent(19)?.DestroyGameplayCueByBuff(
              e,
            );
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        (this.Entity.GetComponent(24)?.OnBuffRemoved(e),
        this.Entity.GetComponent(20)?.OnBuffRemoved(e));
    }
  }
  OnBuffStackIncreased(e, t, o, r, f, a, n, i, s, u, l, c, _) {
    e &&
      (this.BroadcastBuffStackChanged(e, t, o, !1, _),
      super.OnBuffStackIncreased(e, t, o, r, f, a, n, i, s, u, l, c, _));
  }
  OnBuffStackDecreased(e, t, o, r, f) {
    e &&
      (this.BroadcastBuffStackChanged(e, t, o, r, f),
      super.OnBuffStackDecreased(e, t, o, r, f));
  }
  OnBuffActiveChanged(e, t) {
    e &&
      e.IsActive() !== t &&
      (this.BroadcastActivateBuff(e, t), super.OnBuffActiveChanged(e, t));
  }
  BroadcastAddBuff(e, t, o, r, f, a) {
    !e ||
      e.Id < 0 ||
      !this.NeedBroadcastBuff(e, r) ||
      (((r = new Protocol_1.Aki.Protocol._4n()).iVn = e.Handle),
      (r.J4n = MathUtils_1.MathUtils.BigIntToLong(e.Id)),
      (r.P6n = e.Level),
      (r.Sjn = e.InstigatorId ?? 0),
      (r.Ejn = t),
      (r.Y4n = e.Duration),
      (r.Ijn = e.StackCount),
      (r.qHn = e.IsActive()),
      CombatMessage_1.CombatNet.Call(
        28067,
        void 0,
        r,
        void 0,
        a,
        e.MessageId,
        o,
      ));
  }
  BroadcastActivateBuff(e, t) {
    var o;
    !e ||
      e.Id < 0 ||
      !this.NeedBroadcastBuff(e) ||
      (((o = new Protocol_1.Aki.Protocol.m4n()).iVn = e.Handle),
      (o.Djn = t),
      CombatMessage_1.CombatNet.Call(9215, void 0, o, void 0));
  }
  BroadcastBuffStackChanged(e, t, o, r, f) {
    var a;
    !e ||
      e.Id < 0 ||
      !this.NeedBroadcastBuff(e) ||
      (((a = new Protocol_1.Aki.Protocol.u4n()).rVn = e.Handle),
      (a.Ajn = o),
      CombatMessage_1.CombatNet.Call(26115, void 0, a, void 0));
  }
  BroadcastRemoveBuff(e, t, o, r) {
    var f;
    !e ||
      e.Id < 0 ||
      !this.NeedBroadcastBuff(e) ||
      (((f = new Protocol_1.Aki.Protocol.c4n()).iVn = e.Handle),
      (f.Ujn = t),
      CombatMessage_1.CombatNet.Call(3218, void 0, f, void 0, o, void 0, r));
  }
  static OrderAddBuffS2cNotify(e, t, o) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      r =
        FormationDataController_1.FormationDataController.GetPlayerEntity(
          r,
        )?.GetComponent(183),
      f = MathUtils_1.MathUtils.LongToBigInt(t.J4n),
      a = MathUtils_1.MathUtils.LongToNumber(t.Sjn),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.k8n ?? -1),
      n = CharacterBuffController_1.default.GetBuffDefinition(f),
      i = new Protocol_1.Aki.Protocol.L4n();
    if (n) {
      const s = r.GetTagComponent();
      s &&
        n.RemoveBuffWithTags?.forEach((e) => {
          s.RemoveTag(e);
        }),
        (n = r.AddBuffInner(
          f,
          CharacterBuffController_1.default.GetBuffDefinition(f),
          a,
          t.P6n,
          t.Ijn,
          t.Ejn,
          o,
          void 0,
          t.Y4n,
          void 0,
          t.Tjn,
          "远端通知添加buff",
          !1,
          !0,
          !0,
          void 0,
        )),
        (f = r.BuffContainer.get(n)),
        (i.iVn = n),
        (i.qHn =
          n === ActiveBuffConfigs_1.SUCCESS_INSTANT_BUFF_HANDLE ||
          (f?.IsActive() ?? !1)),
        (i.A9n = Protocol_1.Aki.Protocol.O4n.NRs);
    } else i.A9n = Protocol_1.Aki.Protocol.O4n.Proto_UnKnownError;
    CombatMessage_1.CombatNet.Send(
      NetDefine_1.ECombatPushDataMessage.L4n,
      void 0,
      i,
      o,
      void 0,
      !0,
    );
  }
  static OrderRemoveBuffS2cNotify(e, t, o) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      r =
        FormationDataController_1.FormationDataController.GetPlayerEntity(
          r,
        )?.GetComponent(183),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.k8n ?? -1),
      r =
        (r.RemoveBuffByHandle(t.iVn, t.Ijn, "远端请求移除buff(s2c)", o, !0),
        new Protocol_1.Aki.Protocol.D4n());
    (r.A9n = Protocol_1.Aki.Protocol.O4n.NRs),
      CombatMessage_1.CombatNet.Send(
        NetDefine_1.ECombatPushDataMessage.D4n,
        void 0,
        r,
        o,
        void 0,
        !0,
      );
  }
  static OrderRemoveBuffByIdS2cNotify(e, t, o) {
    var r,
      f = new Protocol_1.Aki.Protocol.x4n(),
      a = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      a =
        FormationDataController_1.FormationDataController.GetPlayerEntity(
          a,
        )?.GetComponent(183),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.k8n ?? -1);
    a
      ? ((r = MathUtils_1.MathUtils.LongToBigInt(t.L6n)),
        a.RemoveBuff(r, t.Ijn, "远端移除buff(s2c) reason=" + t.E9n, o, !0),
        (f.A9n = Protocol_1.Aki.Protocol.O4n.NRs))
      : (f.A9n = Protocol_1.Aki.Protocol.O4n.Proto_UnKnownError),
      CombatMessage_1.CombatNet.Send(
        NetDefine_1.ECombatPushDataMessage.x4n,
        void 0,
        f,
        o,
        void 0,
        !0,
      );
  }
  static BroadcastAddBuffNotify(e, t, o) {
    var r = FormationDataController_1.FormationDataController.GetPlayerEntity(
        t.q5n,
      )?.GetComponent(183),
      f = t.iVn,
      a = MathUtils_1.MathUtils.LongToBigInt(t.J4n),
      n = MathUtils_1.MathUtils.LongToNumber(t.Sjn),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.N8n ?? -1);
    if (r?.Valid) {
      var i = CharacterBuffController_1.default.GetBuffDefinition(a);
      if (i && f !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
        const s = r.GetTagComponent();
        s &&
          i.RemoveBuffWithTags?.forEach((e) => {
            s.RemoveTag(e);
          }),
          r.AddBuffInner(
            a,
            CharacterBuffController_1.default.GetBuffDefinition(a),
            n,
            t.P6n,
            t.Ijn,
            t.Ejn,
            o,
            void 0,
            t.Y4n,
            t.qHn,
            t.Tjn,
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
        ["handle", t.iVn],
        ["buffId", a],
        ["playerId", t.q5n],
        ["InstigatorId", n],
      );
  }
  static BroadcastRemoveBuffNotify(e, t, o) {
    var r = t.iVn,
      f = FormationDataController_1.FormationDataController.GetPlayerEntity(
        t.q5n,
      )?.GetComponent(183);
    f?.Valid
      ? f?.RemoveBuffInner(r, -1, !0, "远端通知移除buff")
      : CombatLog_1.CombatLog.Warn(
          "Buff",
          f?.Entity,
          "Invalid entity when processing RemoveGameplayEffectNotify",
          ["player id", t.q5n],
          ["handle", t.iVn],
        );
  }
  static BroadcastBuffStackChangedNotify(e, t) {
    var o = t.Ajn,
      r = FormationDataController_1.FormationDataController.GetPlayerEntity(
        t.q5n,
      )?.GetComponent(183),
      t = r?.GetBuffByHandle(t.rVn);
    r &&
      t &&
      (t.StackCount > o
        ? r.OnBuffStackDecreased(t, t.StackCount, o, !0, "远端Buff层数变化通知")
        : t.StackCount <= o &&
          r.OnBuffStackIncreased(
            t,
            t.StackCount,
            o,
            void 0,
            t.Level,
            void 0,
            Protocol_1.Aki.Protocol.oFs.Proto_Common,
            void 0,
            void 0,
            t.ServerId,
            !1,
            !1,
            "远端Buff层数变化通知",
          ));
  }
  static BroadcastActivateBuffNotify(e, t) {
    var o = FormationDataController_1.FormationDataController.GetPlayerEntity(
        t.q5n,
      )?.GetComponent(183),
      r = t.Djn,
      f = o?.GetBuffByHandle(t.iVn);
    !o || o.HasBuffAuthority()
      ? CombatLog_1.CombatLog.Warn(
          "Buff",
          o?.Entity,
          "主端收到了非主控端发来的buff激活状态变更请求，或找不到Buff持有者，将不做处理",
          ["handle", t.iVn],
          ["buffId", f?.Id],
          ["本地激活状态", r],
          ["远端激活状态", t.Djn],
        )
      : o.OnBuffActiveChanged(f, r);
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
};
__decorate(
  [(0, Stats_1.statDecorator)("OnBuffAdded")],
  PlayerBuffComponent.prototype,
  "OnBuffAdded",
  null,
),
  __decorate(
    [(0, Stats_1.statDecorator)("OnBuffRemoved")],
    PlayerBuffComponent.prototype,
    "OnBuffRemoved",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("OnBuffStackIncreased")],
    PlayerBuffComponent.prototype,
    "OnBuffStackIncreased",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("OnBuffStackDecreased")],
    PlayerBuffComponent.prototype,
    "OnBuffStackDecreased",
    null,
  ),
  __decorate(
    [(0, Stats_1.statDecorator)("OnBuffActiveChanged")],
    PlayerBuffComponent.prototype,
    "OnBuffActiveChanged",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("r3n", !1)],
    PlayerBuffComponent,
    "OrderAddBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("o3n", !1)],
    PlayerBuffComponent,
    "OrderRemoveBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("c3n", !1)],
    PlayerBuffComponent,
    "OrderRemoveBuffByIdS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("t3n", !1)],
    PlayerBuffComponent,
    "BroadcastAddBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("a3n", !1)],
    PlayerBuffComponent,
    "BroadcastRemoveBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("i3n", !1)],
    PlayerBuffComponent,
    "BroadcastBuffStackChangedNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("h3n", !1)],
    PlayerBuffComponent,
    "BroadcastActivateBuffNotify",
    null,
  ),
  (PlayerBuffComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(183)],
    PlayerBuffComponent,
  )),
  (exports.PlayerBuffComponent = PlayerBuffComponent);
//# sourceMappingURL=PlayerBuffComponent.js.map
