"use strict";
var RoleBuffComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, r, n) {
      var o,
        f = arguments.length,
        i =
          f < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, r))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        i = Reflect.decorate(e, t, r, n);
      else
        for (var s = e.length - 1; 0 <= s; s--)
          (o = e[s]) &&
            (i = (f < 3 ? o(i) : 3 < f ? o(t, r, i) : o(t, r)) || i);
      return 3 < f && i && Object.defineProperty(t, r, i), i;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleBuffComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  ActiveBuffConfigs_1 = require("../../Common/Component/Abilities/Buff/ActiveBuffConfigs"),
  CharacterBuffComponent_1 = require("../../Common/Component/Abilities/CharacterBuffComponent"),
  CharacterBuffController_1 = require("../../Common/Component/Abilities/CharacterBuffController");
let currentRoleId = 0;
const abnormalBuffIds = [1001e4, 1002e4, 1003e4, 1004e4, 1005e4, 1006e4];
let RoleBuffComponent = (RoleBuffComponent_1 = class RoleBuffComponent extends (
  CharacterBuffComponent_1.CharacterBuffComponent
) {
  constructor() {
    super(...arguments),
      (this.xie = (e, t) => {
        e.Entity &&
          currentRoleId !== e.Entity.Id &&
          this.Entity.Id === e.Entity.Id &&
          (currentRoleId && this.TriggerEvents(17, this, {}),
          (currentRoleId = e.Entity.Id));
      }),
      (this.M2n = () => {
        currentRoleId = 0;
      });
  }
  OnActivate() {
    super.OnActivate();
    var e = FormationDataController_1.FormationDataController.GetPlayerEntity(
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
    )?.GetComponent(197);
    if (e)
      for (const t of e.GetAllBuffs())
        this.CueComponent.CreateGameplayCueByBuff(t);
  }
  OnStart() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DoLeaveLevel,
        this.M2n,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.M2n,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        this.M2n,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EnterInstanceDungeon,
        this.M2n,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeon,
        this.M2n,
      ),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DoLeaveLevel,
        this.M2n,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
        this.M2n,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        this.M2n,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterInstanceDungeon,
        this.M2n,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeon,
        this.M2n,
      ),
      !0
    );
  }
  GetFormationBuffComp() {
    if (this.HasBuffAuthority())
      return FormationDataController_1.FormationDataController.GetPlayerEntity(
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      )?.GetComponent(197);
    CombatLog_1.CombatLog.Warn(
      "Buff",
      this.Entity,
      "暂不支持对其它玩家操作编队buff",
    );
  }
  AddBuffInner(e, t, r, n, o, f, i, s, u, a, l, m, _, v, h, C, c) {
    return abnormalBuffIds.includes(e) &&
      !this.TagComponent?.HasTag(-1384309247)
      ? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE
      : 5 === t.FormationPolicy
        ? (this.GetFormationBuffComp()?.AddBuffInner(
            e,
            t,
            r,
            n,
            o,
            f,
            i,
            s,
            u,
            a,
            l,
            m,
            _,
            v,
            h,
            C,
            c,
          ) ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE)
        : super.AddBuffInner(e, t, r, n, o, f, i, s, u, a, l, m, _, v, h, C, c);
  }
  RemoveBuffLocal(e, t, r) {
    var n = CharacterBuffController_1.default.GetBuffDefinition(e);
    return n
      ? 5 === n.FormationPolicy
        ? (this.GetFormationBuffComp()?.RemoveBuffLocal(e, t, r) ?? 0)
        : super.RemoveBuffLocal(e, t, r)
      : (CombatLog_1.CombatLog.Error(
          "Buff",
          this.Entity,
          "[buffComp] 尝试本地移除buff时找不到合法配置",
          ["buffId", e],
          ["持有者", this.GetDebugName()],
          ["原因", r],
        ),
        0);
  }
  RemoveBuffOrder(e, t, r) {
    5 ===
    CharacterBuffController_1.default.GetBuffDefinition(e)?.FormationPolicy
      ? CombatLog_1.CombatLog.Error(
          "Buff",
          this.Entity,
          "暂不支持移除远端编队buff",
          ["buffId", e],
          ["原因", r],
        )
      : super.RemoveBuffOrder(e, t, r);
  }
  RemoveBuffByTagLocal(e, t) {
    this.HasBuffAuthority() &&
      this.GetFormationBuffComp()?.RemoveBuffByTagLocal(e, t),
      super.RemoveBuffByTagLocal(e, t);
  }
  RemoveBuffInner(...e) {
    return (
      (this.GetFormationBuffComp()?.RemoveBuffInner(...e) ?? 0) +
      super.RemoveBuffInner(...e)
    );
  }
  HasBuffAuthority() {
    return (
      this.CreatureDataComponent?.GetPlayerId() ===
      ModelManager_1.ModelManager.CreatureModel?.GetPlayerId()
    );
  }
  ShareApplyBuffInner(e, t, r, n, o, f) {
    if (this.HasBuffAuthority())
      if (1 === e.Config?.FormationPolicy) {
        var i = [],
          s = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
        if (s.some((e) => e.Entity === this.Entity))
          for (const m of s) {
            var u = m.Entity?.GetComponent(172);
            m.Entity !== this.Entity && u && i.push(u);
          }
        var a = e.Id,
          l = e.Handle;
        for (const _ of i)
          _.AddBuffLocal(a, {
            InstigatorId:
              e.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
            Level: e.Level,
            OuterStackCount: t,
            ApplyType: r,
            PreMessageId: e.MessageId,
            Duration: o,
            ServerId: f,
            IsIterable: !1,
            Reason: `因为buff${a}(handle=${l})的队伍共享机制导致的buff添加`,
          });
      } else super.ShareApplyBuffInner(e, t, r, e.MessageId, o, f);
  }
  CheckImmune(e) {
    var t = this.GetFormationBuffComp();
    return (
      !(!t || !t.CheckImmune(e)) ||
      !(
        !e.EffectInfos.some((e) => 36 === e.ExtraEffectId) ||
        !this.TagComponent?.HasAnyTag(RoleBuffComponent_1.FrozenImmuneTags)
      ) ||
      super.CheckImmune(e)
    );
  }
  HasBuffRoutineExpirationLock(e) {
    return (
      0 < (this.BuffRoutineExpirationLock.get(e) ?? 0) ||
      0 < (this.GetFormationBuffComp()?.BuffRoutineExpirationLock.get(e) ?? 0)
    );
  }
  TriggerEvents(e, t, r) {
    super.TriggerEvents(e, t, r),
      this.GetFormationBuffComp()?.TriggerEvents(e, t, r);
  }
  AddPauseLock(e) {
    super.AddPauseLock(e), this.GetFormationBuffComp()?.RefreshTimeScale();
  }
  RemovePauseLock(e) {
    super.RemovePauseLock(e), this.GetFormationBuffComp()?.RefreshTimeScale();
  }
  NeedBroadcastBuff(e, t = !1) {
    return (
      (!e || !ActiveBuffConfigs_1.noBroadCastBuff.has(e.Id ?? 0)) &&
      super.NeedBroadcastBuff(e, t)
    );
  }
  CalculateDurationExtraRate(e, t) {
    let r = super.CalculateDurationExtraRate(e, t);
    var n = this.GetFormationBuffComp();
    if (n) {
      t = (t ? n.InstigatorBuffTimeModifiers : n.OwnerBuffTimeModifiers).get(e);
      if (t) for (var [, o] of t.values()) r += o;
    }
    return r;
  }
  CalculatePeriodExtraRate(e, t) {
    let r = super.CalculatePeriodExtraRate(e, t);
    var n = this.GetFormationBuffComp();
    if (n) {
      t = (t ? n.InstigatorBuffTimeModifiers : n.OwnerBuffTimeModifiers).get(e);
      if (t) for (var [o] of t.values()) r += o;
    }
    return r;
  }
  GetBuffApplyTarget(e, t) {
    return 5 ===
      CharacterBuffController_1.default.GetBuffDefinition(e)?.FormationPolicy
      ? this.GetFormationBuffComp()
      : this;
  }
  NeedAddBuffOrder(e) {
    return !0;
  }
});
(RoleBuffComponent.FrozenImmuneTags = [
  400631093, -2100129479, -1009010563, -1221493771, 1733479717, 855966206,
  1918148596, 1918148596,
]),
  (RoleBuffComponent = RoleBuffComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(188)],
      RoleBuffComponent,
    )),
  (exports.RoleBuffComponent = RoleBuffComponent);
//# sourceMappingURL=RoleBuffComponent.js.map
