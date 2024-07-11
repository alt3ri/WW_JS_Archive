"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, r) {
    var f,
      a = arguments.length,
      n =
        a < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, o, r);
    else
      for (var i = t.length - 1; 0 <= i; i--)
        (f = t[i]) && (n = (a < 3 ? f(n) : 3 < a ? f(e, o, n) : f(e, o)) || n);
    return 3 < a && n && Object.defineProperty(e, o, n), n;
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
  CombatDebugController_1 = require("../../../Utils/CombatDebugController"),
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
            (this.CheckRemove(o.Config)
              ? this.RemoveBuffInner(a, -1, !0, "因为切人导致不满足tag条件")
              : (e = this.CheckActivate(o.Config)) !== o.IsActive() &&
                this.OnBuffActiveChanged(o, e));
        }
        this.BuffLock--;
      });
  }
  OnCreate(t) {
    return (
      (this.PlayerId = t?.PlayerId ?? 0),
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
    for (const t of this.BuffEffectManager.FilterById(31)) t?.OnRemoved(!0);
    for (const e of this.BuffEffectManager.FilterById(33)) e?.OnRemoved(!0);
    for (const o of this.BuffEffectManager.FilterById(32)) o?.OnRemoved(!0);
    for (const r of this.BuffEffectManager.FilterById(21)) r?.OnRemoved(!0);
    for (const f of this.BuffContainer.values()) f.Destroy();
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
  AddInitPlayerBuff(t) {
    this.InitLock++;
    for (const e of t)
      this.AddBuffRemote(MathUtils_1.MathUtils.LongToBigInt(e.Ekn), e.E4n, {
        InstigatorId: MathUtils_1.MathUtils.LongToNumber(e.jVn),
        Level: e.r3n,
        OuterStackCount: e.QVn,
        ApplyType: e.WVn,
        Duration: e.Skn,
        RemainDuration: e.Ivs,
        ServerId: e.$Vn,
        IsActive: e.rVn,
        Reason: "服务器初始化下发",
      });
    this.InitLock--;
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
      (t?.TimeDilation ?? 1) * (t?.GetComponent(107)?.CurrentTimeScale ?? 1)
    );
  }
  GetCurrentBuffComponent() {
    return this.GetEntity()?.GetComponent(157);
  }
  GetSkillComponent() {
    return this.GetEntity()?.GetComponent(33);
  }
  GetAttributeComponent() {
    return this.GetEntity()?.GetComponent(156);
  }
  GetTagComponent() {
    return this.GetEntity()?.GetComponent(185);
  }
  CheckAdd(t, e, o) {
    return !this.GetTagComponent() || super.CheckAdd(t, e, o);
  }
  CheckActivate(t) {
    return !this.GetTagComponent() || super.CheckActivate(t);
  }
  GetActorComponent() {
    return this.GetEntity()?.GetComponent(3);
  }
  GetBuffLevel(t) {
    return this.GetEntity()?.GetComponent(157)?.GetBuffLevel(t);
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
  AddBuffInner(t, e, o, r, f, a, n, i, s, u, l, c, d, _, C, m) {
    return 5 !== e.FormationPolicy && t !== ActiveBuffConfigs_1.DYNAMIC_BUFF_ID
      ? (CombatDebugController_1.CombatDebugController.CombatWarn(
          "Buff",
          this.Entity,
          "暂不支持对编队实体增删非编队buff",
          ["buffId", t],
          ["reason", c],
        ),
        ActiveBuffConfigs_1.INVALID_BUFF_HANDLE)
      : super.AddBuffInner(t, e, o, r, f, a, n, i, s, u, l, c, d, _, C, m);
  }
  OnBuffAdded(t, e, o, r, f, a, n, i, s, u) {
    if (t) {
      this.NeedBroadcastBuff() && this.BroadcastAddBuff(t, o, s, u, r);
      var l = t.Config,
        e =
          (super.OnBuffAdded(t, e, o, r, f, a, n, i, s, u),
          ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(
            this.PlayerId,
          ) ?? []);
      for (const _ of e) {
        var c = _.EntityHandle?.Entity;
        if (_.EntityHandle?.Valid && c) {
          var d = c?.GetComponent(157);
          if (d && l.RemoveBuffWithTags && 0 < l.RemoveBuffWithTags.length) {
            const u = `因为buff${t.Id}(handle=${t.Handle})的RemoveBuffWithTags导致移除`;
            for (const C of l.RemoveBuffWithTags)
              d.HasBuffAuthority() && d.RemoveBuffByTag(C, u),
                d.TagComponent.RemoveTag(C);
          }
          _.EntityHandle?.IsInit &&
            c?.GetComponent(19)?.CreateGameplayCueByBuff(t);
        }
      }
    }
  }
  OnBuffRemoved(t, e, o, r, f) {
    if (t) {
      this.NeedBroadcastBuff() && this.BroadcastRemoveBuff(t, e, f, r);
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
          for (const a of f)
            this.AddIterativeBuff(
              a,
              t,
              void 0,
              !0,
              `因为Buff${t.Id}移除导致的添加`,
            );
      }
      r = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(
        this.PlayerId,
      );
      if (r)
        for (const n of r)
          n.EntityHandle?.IsInit &&
            n.EntityHandle?.Entity?.GetComponent(19)?.DestroyGameplayCue(t);
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        (this.Entity.GetComponent(24)?.OnBuffRemoved(t),
        this.Entity.GetComponent(20)?.OnBuffRemoved(t));
    }
  }
  OnBuffStackIncreased(t, e, o, r, f, a, n, i, s, u, l, c, d) {
    t &&
      (this.NeedBroadcastBuff() &&
        this.BroadcastBuffStackChanged(t, e, o, !1, d),
      super.OnBuffStackIncreased(t, e, o, r, f, a, n, i, s, u, l, c, d));
  }
  OnBuffStackDecreased(t, e, o, r, f) {
    t &&
      (this.NeedBroadcastBuff() &&
        this.BroadcastBuffStackChanged(t, e, o, r, f),
      super.OnBuffStackDecreased(t, e, o, r, f));
  }
  OnBuffActiveChanged(t, e) {
    t &&
      t.IsActive() !== e &&
      (t.SetActivate(e),
      this.NeedBroadcastBuff() && this.BroadcastActivateBuff(t, e),
      this.BuffEffectManager.OnBuffInhibitedChanged(t, !e));
  }
  BroadcastAddBuff(t, e, o, r, f) {
    var a = new Protocol_1.Aki.Protocol.bNn();
    (a.E4n = t.Handle),
      (a.Ekn = MathUtils_1.MathUtils.BigIntToLong(t.Id)),
      (a.r3n = t.Level),
      (a.jVn = t.InstigatorId ?? 0),
      (a.WVn = e),
      (a.Skn = t.Duration),
      (a.QVn = t.StackCount),
      (a.rVn = t.IsActive()),
      CombatMessage_1.CombatNet.Call(
        13725,
        void 0,
        a,
        void 0,
        f,
        t.MessageId,
        o,
      );
  }
  BroadcastActivateBuff(t, e) {
    var o = new Protocol_1.Aki.Protocol.ONn();
    (o.E4n = t.Handle),
      (o.YVn = e),
      CombatMessage_1.CombatNet.Call(15726, void 0, o, void 0);
  }
  BroadcastBuffStackChanged(t, e, o, r, f) {
    var a = new Protocol_1.Aki.Protocol.qNn();
    (a.y4n = t.Handle),
      (a.JVn = o),
      CombatMessage_1.CombatNet.Call(5567, void 0, a, void 0);
  }
  BroadcastRemoveBuff(t, e, o, r) {
    var f = new Protocol_1.Aki.Protocol.GNn();
    (f.E4n = t.Handle),
      (f.zVn = e),
      CombatMessage_1.CombatNet.Call(23492, void 0, f, void 0, o, void 0, r);
  }
  static OrderAddBuffS2cNotify(t, e, o) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      r =
        FormationDataController_1.FormationDataController.GetPlayerEntity(
          r,
        )?.GetComponent(180),
      f = MathUtils_1.MathUtils.LongToBigInt(e.Ekn),
      a = MathUtils_1.MathUtils.LongToNumber(e.jVn),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1),
      n = CharacterBuffController_1.default.GetBuffDefinition(f),
      i = new Protocol_1.Aki.Protocol.JNn();
    if (n) {
      const s = r.GetTagComponent();
      s &&
        n.RemoveBuffWithTags?.forEach((t) => {
          s.RemoveTag(t);
        }),
        (n = r.AddBuffInner(
          f,
          CharacterBuffController_1.default.GetBuffDefinition(f),
          a,
          e.r3n,
          e.QVn,
          e.WVn,
          o,
          void 0,
          e.Skn,
          void 0,
          e.$Vn,
          "远端通知添加buff",
          !1,
          !0,
          !0,
          void 0,
        )),
        (f = r.BuffContainer.get(n)),
        (i.E4n = n),
        (i.rVn =
          n === ActiveBuffConfigs_1.SUCCESS_INSTANT_BUFF_HANDLE ||
          (f?.IsActive() ?? !1)),
        (i.X5n = Protocol_1.Aki.Protocol.lkn.Sys);
    } else i.X5n = Protocol_1.Aki.Protocol.lkn.Proto_UnKnownError;
    CombatMessage_1.CombatNet.Send(
      NetDefine_1.ECombatPushDataMessage.JNn,
      void 0,
      i,
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
        )?.GetComponent(180),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1),
      r =
        (r.RemoveBuffByHandle(e.E4n, e.QVn, "远端请求移除buff(s2c)", o, !0),
        new Protocol_1.Aki.Protocol.zNn());
    (r.X5n = Protocol_1.Aki.Protocol.lkn.Sys),
      CombatMessage_1.CombatNet.Send(
        NetDefine_1.ECombatPushDataMessage.zNn,
        void 0,
        r,
        o,
        void 0,
        !0,
      );
  }
  static OrderRemoveBuffByIdS2cNotify(t, e, o) {
    var r,
      f = new Protocol_1.Aki.Protocol.ikn(),
      a = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      a =
        FormationDataController_1.FormationDataController.GetPlayerEntity(
          a,
        )?.GetComponent(180),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.s4n ?? -1);
    a
      ? ((r = MathUtils_1.MathUtils.LongToBigInt(e.JFn)),
        a.RemoveBuff(r, e.QVn, "远端移除buff(s2c) reason=" + e.V5n, o, !0),
        (f.X5n = Protocol_1.Aki.Protocol.lkn.Sys))
      : (f.X5n = Protocol_1.Aki.Protocol.lkn.Proto_UnKnownError),
      CombatMessage_1.CombatNet.Send(
        NetDefine_1.ECombatPushDataMessage.ikn,
        void 0,
        f,
        o,
        void 0,
        !0,
      );
  }
  static BroadcastAddBuffNotify(t, e, o) {
    var r = FormationDataController_1.FormationDataController.GetPlayerEntity(
        e.aFn,
      )?.GetComponent(180),
      f = e.E4n,
      a = MathUtils_1.MathUtils.LongToBigInt(e.Ekn),
      n = MathUtils_1.MathUtils.LongToNumber(e.jVn),
      o = MathUtils_1.MathUtils.LongToBigInt(o?.n4n ?? -1);
    if (r?.Valid) {
      var i = CharacterBuffController_1.default.GetBuffDefinition(a);
      if (i && f !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
        const s = r.GetTagComponent();
        s &&
          i.RemoveBuffWithTags?.forEach((t) => {
            s.RemoveTag(t);
          }),
          r.AddBuffInner(
            a,
            CharacterBuffController_1.default.GetBuffDefinition(a),
            n,
            e.r3n,
            e.QVn,
            e.WVn,
            o,
            void 0,
            e.Skn,
            e.rVn,
            e.$Vn,
            "远端通知添加buff",
            !0,
            !0,
            !1,
            f,
          );
      }
    } else
      CombatDebugController_1.CombatDebugController.CombatWarn(
        "Buff",
        r?.Entity,
        "Invalid entity when processing FormationBuffApplyNotify",
        ["handle", e.E4n],
        ["buffId", a],
        ["playerId", e.aFn],
        ["InstigatorId", n],
      );
  }
  static BroadcastRemoveBuffNotify(t, e, o) {
    var r = e.E4n,
      f = FormationDataController_1.FormationDataController.GetPlayerEntity(
        e.aFn,
      )?.GetComponent(180);
    f?.Valid
      ? f?.RemoveBuffInner(r, -1, !0, "远端通知移除buff")
      : CombatDebugController_1.CombatDebugController.CombatWarn(
          "Buff",
          f?.Entity,
          "Invalid entity when processing RemoveGameplayEffectNotify",
          ["player id", e.aFn],
          ["handle", e.E4n],
        );
  }
  static BroadcastBuffStackChangedNotify(t, e) {
    var o = e.JVn,
      r = FormationDataController_1.FormationDataController.GetPlayerEntity(
        e.aFn,
      )?.GetComponent(180),
      e = r?.GetBuffByHandle(e.y4n);
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
            Protocol_1.Aki.Protocol.CGs.Proto_Common,
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
        e.aFn,
      )?.GetComponent(180),
      r = e.YVn,
      f = o?.GetBuffByHandle(e.E4n);
    !o || o.HasBuffAuthority()
      ? CombatDebugController_1.CombatDebugController.CombatWarn(
          "Buff",
          o?.Entity,
          "主端收到了非主控端发来的buff激活状态变更请求，或找不到Buff持有者，将不做处理",
          ["handle", e.E4n],
          ["buffId", f?.Id],
          ["本地激活状态", r],
          ["远端激活状态", e.YVn],
        )
      : (CombatDebugController_1.CombatDebugController.CombatDebug(
          "Buff",
          o?.Entity,
          "远端通知修改buff激活状态",
          ["handle", e.E4n],
          ["buffId", f?.Id],
          ["激活状态", r],
        ),
        o.OnBuffActiveChanged(f, r));
  }
  AddBuffOrder(t, e) {
    CombatDebugController_1.CombatDebugController.CombatWarn(
      "Buff",
      this.Entity,
      "[buffComp] 客户端暂不能给其它玩家添加队伍buff",
      ["buffId", t],
      ["持有者", this.GetDebugName()],
      ["原因", e.Reason],
    );
  }
  RemoveBuffOrder(t, e, o) {
    CombatDebugController_1.CombatDebugController.CombatWarn(
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
    [CombatMessage_1.CombatNet.Listen("A2n", !1)],
    PlayerBuffComponent,
    "OrderAddBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("U2n", !1)],
    PlayerBuffComponent,
    "OrderRemoveBuffS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("G2n", !1)],
    PlayerBuffComponent,
    "OrderRemoveBuffByIdS2cNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("L2n", !1)],
    PlayerBuffComponent,
    "BroadcastAddBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("P2n", !1)],
    PlayerBuffComponent,
    "BroadcastRemoveBuffNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("D2n", !1)],
    PlayerBuffComponent,
    "BroadcastBuffStackChangedNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("B2n", !1)],
    PlayerBuffComponent,
    "BroadcastActivateBuffNotify",
    null,
  ),
  (PlayerBuffComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(180)],
    PlayerBuffComponent,
  )),
  (exports.PlayerBuffComponent = PlayerBuffComponent);
//# sourceMappingURL=PlayerBuffComponent.js.map
