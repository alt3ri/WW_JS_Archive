"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    let s;
    const a = arguments.length;
    let n =
      a < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(e, t, i, o);
    else
      for (let r = e.length - 1; r >= 0; r--)
        (s = e[r]) && (n = (a < 3 ? s(n) : a > 3 ? s(t, i, n) : s(t, i)) || n);
    return a > 3 && n && Object.defineProperty(t, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTeamComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const CameraController_1 = require("../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleUiDefine_1 = require("../../../../Module/BattleUi/BattleUiDefine");
const SceneTeamDefine_1 = require("../../../../Module/SceneTeam/SceneTeamDefine");
const UiCameraAnimationManager_1 = require("../../../../Module/UiCameraAnimation/UiCameraAnimationManager");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds");
const CharacterUnifiedStateComponent_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateComponent");
const CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const RoleInheritComponent_1 = require("./RoleInheritComponent");
let RoleTeamComponent = class RoleTeamComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.elt = void 0),
      (this.Xte = void 0),
      (this.mBe = void 0),
      (this.Orn = void 0),
      (this.cBe = void 0),
      (this.BZr = void 0),
      (this.zon = void 0),
      (this.krn = void 0),
      (this.Gce = void 0),
      (this.Nce = void 0),
      (this.xZr = void 0),
      (this.Frn = void 0),
      (this.Vrn = void 0),
      (this.Hrn = -1),
      (this.GoBattleSkill = !1),
      (this.jrn = void 0),
      (this.Wrn = void 0),
      (this.Krn = void 0);
  }
  OnInit(e) {
    return (
      (this.elt = this.Entity.GetComponent(157)),
      (this.Xte = this.Entity.GetComponent(185)),
      (this.Hte = this.Entity.GetComponent(3)),
      (this.mBe = this.Entity.GetComponent(158)),
      (this.Orn = this.Entity.GetComponent(84)),
      (this.cBe = this.Entity.GetComponent(33)),
      (this.BZr = this.Entity.GetComponent(186)),
      (this.zon = this.Entity.GetComponent(34)),
      (this.krn = this.Entity.GetComponent(86)),
      (this.Gce = this.Entity.GetComponent(161)),
      (this.Nce = this.Entity.GetComponent(52)),
      (this.xZr = this.Entity.GetComponent(29)),
      !0
    );
  }
  OnStart() {
    var e = EffectUtil_1.EffectUtil.GetEffectPath(
      SceneTeamDefine_1.GO_BATTLE_MATERIAL,
    );
    var e =
      (ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.PD_CharacterControllerDataGroup_C,
        (e) => {
          e && (this.Frn = e);
        },
      ),
      EffectUtil_1.EffectUtil.GetEffectPath(
        SceneTeamDefine_1.GO_DOWN_MATERIAL,
      ));
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.PD_CharacterControllerData_C,
        (e) => {
          e && (this.Vrn = e);
        },
      ),
      !0
    );
  }
  OnEnd() {
    return this.Qrn(), !0;
  }
  Qrn() {
    this.jrn?.EndTask(),
      (this.jrn = void 0),
      this.Wrn?.EndTask(),
      (this.Wrn = void 0),
      this.Krn &&
        (TimerSystem_1.TimerSystem.Remove(this.Krn), (this.Krn = void 0));
  }
  static OnChangeRole(e, t, i, o, s = !1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "SceneTeam",
        49,
        "执行战斗换人",
        ["Last", e?.Id],
        ["New", t.Id],
      );
    const a = e?.Entity?.GetComponent(81);
    const n = t.Entity.GetComponent(81);
    var r = a?.cBe;
    let h = r?.SkillTarget;
    var r = void 0 !== r && !r.IsMainSkillReadyEnd;
    e &&
      s &&
      h &&
      r &&
      (h = e.Entity.GetComponent(157))?.HasBuffAuthority() &&
      h.AddBuff(CharacterBuffIds_1.buffId.GoDown, {
        InstigatorId: h.CreatureDataId,
        Reason: "战斗换人",
      });
    let _ = !1;
    r = e?.Entity?.GetComponent(185);
    r && (_ = r.HasTag(504239013) || r.HasTag(855966206)),
      n.Xrn(),
      a &&
        a !== n &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "角色下场", ["Entity", a.Entity?.Id]),
        n.elt.AddBuff(CharacterBuffIds_1.buffId.WaitRemoveQteInvincible, {
          InstigatorId: n.elt.CreatureDataId,
          Reason: "换人去除QTE无敌",
        }),
        GlobalData_1.GlobalData.GameInstance &&
          GlobalData_1.GlobalData.BpEventManager.当换人完成时.Broadcast(),
        t.Entity.GetComponent(55).SetDataFromOldRole(e),
        e?.Entity?.GetComponent(56)?.ClearTarget(),
        a.Xte.HasTag(1144073280) ||
          a.cBe.StopAllSkills("RoleTeamComponent.OnChangeRole"),
        a.BZr?.ResetAllMultiSkillOnChangeRole(),
        a.zon?.OnGoDown(),
        (h = a.Xte.HasTag(-1371021686) && !a.cBe.IsMainSkillReadyEnd),
        RoleInheritComponent_1.RoleInheritComponent.StateInherit(
          a.Orn,
          n.Orn,
          n.krn.IsInQte ? 1 : 0,
          h,
        ),
        a.$rn(),
        a.Yrn(o)),
      n.Jrn(e, _, s),
      n.zrn(!_ && i);
  }
  Xrn() {
    const e = Global_1.Global.CharacterController;
    const t = this.Hte.Actor;
    e.Pawn !== t &&
      (t.Mesh.AddTickPrerequisiteActor(e),
      e.Possess(t),
      this.Gce.StopMove(!1),
      this.Nce?.Active || this.Nce?.SetActive(!0));
  }
  Jrn(e, t, i = !1) {
    let o;
    this.Xte.HasTag(-1207177910)
      ? t || !i
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneTeam",
              49,
              "人物上场，上个角色在特殊状态或非主动换人，继承位置",
            ),
          this.InheritTransform())
        : this.krn.IsInQte
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 49, "人物上场，角色QTE中，不更新位置")
          : ((i = (t = e?.Entity?.GetComponent(185))?.HasTag(-2100129479)),
            (e = t?.HasTag(1144073280)),
            (o = t?.HasTag(-2044964178)),
            i || e || o
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneTeam",
                    49,
                    "人物上场，上个角色还在场，进行寻点",
                  ),
                (i = t?.HasTag(40422668)),
                this.Entity.GetComponent(86).SetQtePosition({
                  Rotate: i
                    ? SceneTeamDefine_1.SPECIAL_CHANGE_ANGLE_AIR
                    : SceneTeamDefine_1.SPECIAL_CHANGE_ANGLE_LAND,
                  Length: i
                    ? SceneTeamDefine_1.SPECIAL_CHANGE_DIS_AIR
                    : SceneTeamDefine_1.SPECIAL_CHANGE_DIS_LAND,
                  Height: i
                    ? SceneTeamDefine_1.SPECIAL_CHANGE_HEIGHT_AIR
                    : SceneTeamDefine_1.SPECIAL_CHANGE_HEIGHT_LAND,
                  ReferenceTarget: !1,
                  QteType: i ? 1 : 0,
                }),
                this.Gce?.CharacterMovement?.SetMovementMode(i ? 3 : 1))
              : (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneTeam",
                    49,
                    "人物上场，上个角色不在场，继承位置",
                  ),
                this.InheritTransform()))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "人物上场，非后台切换，不更新位置");
  }
  InheritTransform() {
    let e = ModelManager_1.ModelManager.SceneTeamModel.GetSpawnTransform();
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneTeam",
            49,
            "继承位置失败，获取角色Transform为空",
          ),
        !1
      );
    e.SetRotation(new UE.Rotator(0, e.Rotator().Yaw, 0).Quaternion()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "继承位置", [
          "Location",
          e.GetLocation(),
        ]),
      this.Hte.SetActorTransform(e, "换人.上场", !1),
      ModelManager_1.ModelManager.SceneTeamModel.SetLastTransform(void 0);
    e = this.mBe;
    return (
      e.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
      ModelManager_1.ModelManager.SceneTeamModel.LastEntityIsOnGround
        ? this.Zrn("换人.地面修正")
        : (e.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
            e.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) ||
          this.Zrn("换人.滑行修正"),
      !0
    );
  }
  Zrn(e) {
    this.Hte.FixSwitchLocation(e, !0, !0);
  }
  zrn(e) {
    let t;
    this.krn.IsInQte
      ? (this.GoBattleSkill = !1)
      : ((o = this.Xte.HasTag(1949807524)),
        this.xZr.SelectSoftLockTarget(),
        (t = void 0 !== this.xZr.GetCurrentTarget()),
        (i = this.Xte.HasTag(-1207177910)),
        (this.GoBattleSkill = o || (e && i && t))),
      this.Qrn();
    for (const s of CharacterUnifiedStateComponent_1.outGameRoleTags)
      this.Xte.RemoveTag(s);
    let i;
    var o = ModelManager_1.ModelManager.SceneTeamModel;
    var e =
      (this.SetTeamTag(0),
      !ModelManager_1.ModelManager.PlotModel.InSeamlessFormation);
    ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
      this.Entity,
      e,
      "RoleTeamComponent.GoBattle",
    ),
      this.enn(),
      this.Hte.KuroMoveAlongFloor(Vector_1.Vector.ZeroVector, 0, "GoBattle"),
      o.GoBattleInvincible &&
        (this.elt.AddBuff(CharacterBuffIds_1.buffId.GoBattleInvincible, {
          InstigatorId: this.elt.CreatureDataId,
          Reason: "角色上场短暂无敌",
        }),
        (o.GoBattleInvincible = !1)),
      UiCameraAnimationManager_1.UiCameraAnimationManager.IsActivate() ||
        CameraController_1.CameraController.ExitCameraMode(2),
      this.GoBattleSkill &&
        ((i =
          this.mBe.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Air),
        this.Hte.Actor.FightCommand(i));
  }
  enn() {
    let e, t;
    ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType === 3
      ? ((t = this.Entity.GetComponent(0).GetRoleId()),
        (e = ModelManager_1.ModelManager.PlotModel.GoBattleMaterial) &&
          ModelManager_1.ModelManager.RoleModel.IsMainRole(t) &&
          this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(e))
      : (this.Frn &&
          this.Hte.Actor.CharRenderingComponent.AddMaterialControllerDataGroup(
            this.Frn,
          ),
        (t = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          this.Hte.ActorTransform,
          SceneTeamDefine_1.GO_BATTLE_EFFECT,
          "[RoleTeamComponent.SpawnGoBattleMaterial]",
          new EffectContext_1.EffectContext(this.Entity.Id),
        )),
        EffectSystem_1.EffectSystem.IsValid(t) &&
          EffectSystem_1.EffectSystem.GetEffectActor(t).K2_AttachToComponent(
            this.Hte.SkeletalMesh,
            FNameUtil_1.FNameUtil.NONE,
            2,
            2,
            2,
            !0,
          ));
  }
  $rn() {
    const e = this.Xte?.HasTag(1144073280);
    const t = this.Xte?.HasTag(-2044964178);
    e || t
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneTeam",
            49,
            "角色下场，等待切人不隐藏Tag、硬直时间Tag移除再隐藏角色",
          ),
        this.SetTeamTag(1),
        e &&
          !this.jrn &&
          (this.jrn = this.Xte.ListenForTagAddOrRemove(1144073280, (e, t) => {
            t || (this.jrn?.EndTask(), (this.jrn = void 0), this.tnn());
          })),
        t &&
          !this.Wrn &&
          (this.Wrn = this.Xte.ListenForTagAddOrRemove(-2044964178, (e, t) => {
            t || (this.Wrn?.EndTask(), (this.Wrn = void 0), this.tnn());
          })),
        this.Hte.RestoreDefaultController(),
        this.Gce?.StopAllAddMove())
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "角色下场，立即隐藏"),
        this.SetTeamTag(2),
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          this.Entity,
          !1,
          "RoleTeamComponent.GoDown",
        ),
        this.Hte.RestoreDefaultController(),
        this.Gce?.StopAllAddMove(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnRoleGoDownFinish,
        ));
  }
  tnn() {
    const e = !this.jrn && !this.Wrn;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 49, "角色下场，尝试隐藏角色", [
        "CanGoDown",
        e,
      ]),
      e &&
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id !==
          this.Entity.Id &&
        this.SetRoleDisableWithEffect();
  }
  SetRoleDisableWithEffect() {
    this.Krn
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "角色下场，正在播放特效等待隐藏")
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "角色下场，播放特效后再隐藏"),
        this.Vrn &&
          this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
            this.Vrn,
          ),
        (this.Krn = TimerSystem_1.TimerSystem.Delay(() => {
          (this.Krn = void 0),
            this.cBe.StopAllSkills(
              "RoleTeamComponent.SetRoleDisableWithEffect",
            ),
            this.elt.RemoveBuff(
              CharacterBuffIds_1.buffId.OnStage,
              -1,
              "RoleTeamComponent.SetRoleDisableWithEffect",
            ),
            this.SetTeamTag(2),
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              this.Entity,
              !1,
              "RoleTeamComponent.SetRoleDisableWithEffect",
            ),
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnRoleGoDownFinish,
            );
        }, SceneTeamDefine_1.EFFECT_DELAY_QUIT)));
  }
  Yrn(e) {
    const t = e * BattleUiDefine_1.SECOND_TO_MILLISECOND;
    (this.Hrn = t + Time_1.Time.WorldTime),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        e,
      );
  }
  IsChangeRoleCoolDown() {
    return this.GetChangeRoleCoolDown() > 0 || !(this.Hrn = -1);
  }
  GetChangeRoleCoolDown() {
    return this.Hrn > 0 ? this.Hrn - Time_1.Time.WorldTime : -1;
  }
  SetTeamTag(e) {
    if (this.Entity.IsInit)
      switch (e) {
        case 0:
          this.Xte.AddTag(-1384309247),
            this.elt.RemoveBuff(
              CharacterBuffIds_1.buffId.OnStage,
              -1,
              "SetTeamTag",
            ),
            this.Xte.HasTag(-1207177910) && this.Xte.RemoveTag(-1207177910),
            this.Xte.HasTag(-1388400236) && this.Xte.RemoveTag(-1388400236);
          break;
        case 1:
          this.Xte.AddTag(-1388400236),
            this.elt.AddBuff(CharacterBuffIds_1.buffId.OnStage, {
              InstigatorId: this.elt.CreatureDataId,
              Reason: "SetTeamTag",
            }),
            this.Xte.HasTag(-1207177910) && this.Xte.RemoveTag(-1207177910),
            this.Xte.HasTag(-1384309247) && this.Xte.RemoveTag(-1384309247);
          break;
        case 2:
          this.Hte.IsAutonomousProxy && this.Xte.AddTag(-1207177910),
            this.Xte.HasTag(-1384309247) && this.Xte.RemoveTag(-1384309247),
            this.Xte.HasTag(-1388400236) && this.Xte.RemoveTag(-1388400236);
      }
  }
  OutOfControl() {
    this.SetTeamTag(1),
      this.cBe.StopAllSkills("RoleTeamComponent.OutOfControl"),
      this.Nce?.ClearMoveVectorCache(),
      this.Nce?.SetActive(!1),
      this.Hte.ClearInput(),
      this.Gce?.StopMove(!0),
      this.Hte.RestoreDefaultController(),
      this.Gce?.StopAllAddMove();
  }
};
(RoleTeamComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(81)],
  RoleTeamComponent,
)),
  (exports.RoleTeamComponent = RoleTeamComponent);
// # sourceMappingURL=RoleTeamComponent.js.map
