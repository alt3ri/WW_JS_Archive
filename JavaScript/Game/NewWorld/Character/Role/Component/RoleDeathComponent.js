"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, o);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (s = t[h]) && (n = (r < 3 ? s(n) : 3 < r ? s(e, i, n) : s(e, i)) || n);
    return 3 < r && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleDeathComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  TeleportController_1 = require("../../../../Module/Teleport/TeleportController"),
  BaseDeathComponent_1 = require("../../Common/Component/Abilities/BaseDeathComponent"),
  CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes"),
  CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds"),
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  RoleAudioController_1 = require("../RoleAudioController");
let RoleDeathComponent = class RoleDeathComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments),
      (this.n$t = void 0),
      (this.u1t = void 0),
      (this.Xte = void 0),
      (this.tRr = void 0),
      (this.m1t = void 0),
      (this.HBr = void 0),
      (this.bin = !1),
      (this.Plr = []),
      (this.OnDeathEnded = () => {
        var t,
          e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
        if (this.m1t && this.m1t.HasBuffAuthority()) {
          this.m1t.TriggerEvents(14, this.m1t, {});
          for (const i of e.values())
            this.Entity.Id !== i.Id &&
              i.Valid &&
              ((t = i.Entity.GetComponent(189)).IsDead() ||
                t.m1t?.TriggerEvents(15, this.m1t, {}));
        }
        this.IsDead() &&
          ModelManager_1.ModelManager.SceneTeamModel.RoleDeathEnded(
            this.Entity.Id,
          );
      }),
      (this.qin = () => {
        this.IsDead() || this.RemoveMaterials();
      }),
      (this.DrowningPunishment = () => {
        this.m1t.AddBuff(CharacterBuffIds_1.buffId.AfterDrownRecoverStrength, {
          InstigatorId: this.m1t.CreatureDataId,
          Reason: "溺水蒙太奇后添加",
        }),
          this.Xte.RemoveTag(191377386),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CharOnRoleDrown,
            !1,
          ),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnRoleDrown,
            !1,
          ),
          ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() ||
            (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
              ? ((this.bin = !0),
                CombatMessage_1.CombatNet.Send(29247, this.Entity, {}))
              : (t =
                  ModelManager_1.ModelManager.FormationDataModel.GetLastPositionOnLand()) &&
                TeleportController_1.TeleportController.TeleportToPositionNoLoading(
                  t.ToUeVector(),
                  void 0,
                  "DrowningPunishment",
                ).finally(this.qin)),
          this.HBr.ResetCharState();
        var t = this.Entity.CheckGetComponent(189);
        t.IsDead() && t.OnDeathEnded();
      });
  }
  OnInit() {
    return (
      (this.n$t = this.Entity.GetComponent(3)),
      (this.u1t = this.Entity.CheckGetComponent(0)),
      (this.Xte = this.Entity.GetComponent(203)),
      (this.tRr = this.Entity.GetComponent(39)),
      (this.m1t = this.Entity.GetComponent(172)),
      (this.HBr = this.Entity.GetComponent(173)),
      !0
    );
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      (this.u1t.GetLivingStatus() === Protocol_1.Aki.Protocol.JEs.Proto_Dead &&
        this.ExecuteDeath(void 0),
      !0)
    );
  }
  OnClear() {
    return this.Plr.splice(0, this.Plr.length), !(this.bin = !1);
  }
  ExecuteDeath(t) {
    if (!super.ExecuteDeath(t)) return !1;
    if (
      (this.m1t?.RemoveBuffByEffectType(36, "实体死亡移除冰冻buff"),
      this.Xte?.AddTag(1008164187),
      this.tRr?.StopAllSkills("RoleDeathComponent.ExecuteDeath"),
      this.HBr?.Valid && this.Entity.IsInit)
    ) {
      switch ((this.HBr.ResetCharState(), this.HBr.PositionState)) {
        case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
          var e = this.HBr.MoveState;
          e === CharacterUnifiedStateTypes_1.ECharMoveState.Glide
            ? this.Entity.GetComponent(58)?.ExitGlideState()
            : e === CharacterUnifiedStateTypes_1.ECharMoveState.Soar &&
              this.Entity.GetComponent(58)?.ExitSoarState();
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
          this.Entity.GetComponent(3)?.Actor.KuroSetMovementMode({
            Mode: 3,
            CustomMode: 0,
            Context: "[RoleDeathComponent.ExecuteDeath]",
          });
      }
      this.HBr.ExitHitState("角色死亡");
    }
    return (
      this.m1t?.RemoveAllDurationBuffs("实体死亡清理持续型buff"),
      this.PlayDeathAnimation(t),
      this.PlayDeathAudio(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharOnRoleDead,
        this.Entity.Id,
      ),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
      ),
      !0
    );
  }
  PlayDeathAudio() {
    this.Entity &&
      RoleAudioController_1.RoleAudioController.OnPlayerDies(this.Entity);
  }
  PlayDeathAnimation(t) {
    this.Xte?.HasTag(191377386) ||
      (!ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim &&
      !this.Xte?.HasTag(-1943786195) &&
      this.MontageComponent?.Valid &&
      this.Entity.IsInit &&
      this.Entity.Active
        ? this.HBr.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Water
          ? this.PlayDeathMontageWithType(1, this.OnDeathEnded, t)
          : this.PlayDeathMontageWithType(0, this.OnDeathEnded, t)
        : this.OnDeathEnded());
  }
  ExecuteRevive() {
    var t;
    this.IsDeadInternal
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            19,
            "[DeathComponent]执行角色复活逻辑",
            ["Entity", this.Entity.toString()],
            ["PbDataId", this.Entity?.GetComponent(0)?.GetPbDataId()],
          ),
        (this.IsDeadInternal = !1),
        this.Xte?.RemoveTag(1008164187),
        this.RemoveMaterials(),
        this.n$t?.IsAutonomousProxy &&
          (EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnRevive,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRevive,
            this.Entity,
          ),
          this.HBr.TryClearInFightTags(),
          this.HBr.RefreshFightState(
            FormationDataController_1.FormationDataController.GlobalIsInFight,
          )),
        (t = this.n$t?.Owner),
        GlobalData_1.GlobalData.BpEventManager.当有角色复活时.Broadcast(t))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Character", 19, "实体重复复活", [
          "entityId",
          this.Entity.Id,
        ]);
  }
  AddMaterialHandle(t) {
    this.Plr.push(t);
  }
  RemoveMaterials() {
    var t = this.n$t?.Actor.CharRenderingComponent;
    if (t) for (const e of this.Plr) t.RemoveMaterialControllerData(e);
  }
  static DrownNotify(t, e) {
    t = t?.CheckGetComponent(189);
    t &&
      (t.PlayDeathMontageWithType(1), t.m1t?.HasBuffAuthority()) &&
      t.m1t.RemoveBuffByEffectType(36, "溺水移除冰冻buff");
  }
  Drowning() {
    var t, e;
    this.IsDrowning() ||
      (this.Entity.CheckGetComponent(203).AddTag(191377386),
      (t = (e = this.Entity.CheckGetComponent(171)).GetCurrentValue(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
      )),
      this.m1t.AddBuff(CharacterBuffIds_1.buffId.DrownPunishment, {
        InstigatorId: this.m1t.CreatureDataId,
        Reason: "溺水流程添加",
      }),
      (e = e.GetCurrentValue(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
      )),
      this.PlayDeathMontageWithType(1, this.DrowningPunishment),
      this.m1t?.HasBuffAuthority() &&
        this.m1t.RemoveBuffByEffectType(36, "溺水移除冰冻buff"),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRoleDrownInjure,
        0 < t && e <= 0,
      )),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharOnRoleDrown,
        !0,
      ),
      CombatMessage_1.CombatNet.Send(22966, this.Entity, {});
  }
  IsDrowning() {
    return this.Xte?.HasTag(191377386) ?? !1;
  }
  ResetDrowning() {
    this.bin && (this.qin(), (this.bin = !1));
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("VFn", !0)],
  RoleDeathComponent,
  "DrownNotify",
  null,
),
  (RoleDeathComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(189)],
    RoleDeathComponent,
  )),
  (exports.RoleDeathComponent = RoleDeathComponent);
//# sourceMappingURL=RoleDeathComponent.js.map
