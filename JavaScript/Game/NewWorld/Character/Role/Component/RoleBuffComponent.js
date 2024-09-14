"use strict";
var RoleBuffComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, n, o) {
      var r,
        f = arguments.length,
        i =
          f < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, n))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        i = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; 0 <= s; s--)
          (r = e[s]) &&
            (i = (f < 3 ? r(i) : 3 < f ? r(t, n, i) : r(t, n)) || i);
      return 3 < f && i && Object.defineProperty(t, n, i), i;
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
let currentRoleId = 0,
  RoleBuffComponent = (RoleBuffComponent_1 = class RoleBuffComponent extends (
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
      )?.GetComponent(184);
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
        )?.GetComponent(184);
      CombatLog_1.CombatLog.Warn(
        "Buff",
        this.Entity,
        "暂不支持对其它玩家操作编队buff",
      );
    }
    AddBuffInner(e, t, n, o, r, f, i, s, u, a, m, l, _, v, C, h) {
      return 5 === t.FormationPolicy
        ? (this.GetFormationBuffComp()?.AddBuffInner(
            e,
            t,
            n,
            o,
            r,
            f,
            i,
            s,
            u,
            a,
            m,
            l,
            _,
            v,
            C,
            h,
          ) ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE)
        : super.AddBuffInner(e, t, n, o, r, f, i, s, u, a, m, l, _, v, C, h);
    }
    RemoveBuffLocal(e, t, n) {
      var o = CharacterBuffController_1.default.GetBuffDefinition(e);
      return o
        ? 5 === o.FormationPolicy
          ? (this.GetFormationBuffComp()?.RemoveBuffLocal(e, t, n) ?? 0)
          : super.RemoveBuffLocal(e, t, n)
        : (CombatLog_1.CombatLog.Error(
            "Buff",
            this.Entity,
            "[buffComp] 尝试本地移除buff时找不到合法配置",
            ["buffId", e],
            ["持有者", this.GetDebugName()],
            ["原因", n],
          ),
          0);
    }
    RemoveBuffOrder(e, t, n) {
      5 ===
      CharacterBuffController_1.default.GetBuffDefinition(e)?.FormationPolicy
        ? CombatLog_1.CombatLog.Error(
            "Buff",
            this.Entity,
            "暂不支持移除远端编队buff",
            ["buffId", e],
            ["原因", n],
          )
        : super.RemoveBuffOrder(e, t, n);
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
        this.Entity.GetComponent(0).GetPlayerId() ===
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
      );
    }
    ShareApplyBuffInner(e, t, n, o, r, f) {
      if (this.HasBuffAuthority())
        if (1 === e.Config?.FormationPolicy) {
          var i = [],
            s = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
          if (s.some((e) => e.Entity === this.Entity))
            for (const l of s) {
              var u = l.Entity?.GetComponent(160);
              l.Entity !== this.Entity && u && i.push(u);
            }
          var a = e.Id,
            m = e.Handle;
          for (const _ of i)
            _.AddBuffLocal(a, {
              InstigatorId:
                e.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
              Level: e.Level,
              OuterStackCount: t,
              ApplyType: n,
              PreMessageId: e.MessageId,
              Duration: r,
              ServerId: f,
              IsIterable: !1,
              Reason: `因为buff${a}(handle=${m})的队伍共享机制导致的buff添加`,
            });
        } else super.ShareApplyBuffInner(e, t, n, e.MessageId, r, f);
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
    TriggerEvents(e, t, n) {
      super.TriggerEvents(e, t, n),
        this.GetFormationBuffComp()?.TriggerEvents(e, t, n);
    }
    AddPauseLock(e) {
      super.AddPauseLock(e), this.GetFormationBuffComp()?.RefreshTimeScale();
    }
    RemovePauseLock(e) {
      super.RemovePauseLock(e), this.GetFormationBuffComp()?.RefreshTimeScale();
    }
    NeedBroadcastBuff(e, t = !1) {
      return (
        (!e || !ActiveBuffConfigs_1.noBroadCastBuff.has(e.Id ?? 0n)) &&
        super.NeedBroadcastBuff(e, t)
      );
    }
  });
(RoleBuffComponent.FrozenImmuneTags = [
  400631093, -2100129479, -1009010563, -1221493771, 1733479717, 855966206,
  1918148596, 1918148596,
]),
  (RoleBuffComponent = RoleBuffComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(175)],
      RoleBuffComponent,
    )),
  (exports.RoleBuffComponent = RoleBuffComponent);
//# sourceMappingURL=RoleBuffComponent.js.map
