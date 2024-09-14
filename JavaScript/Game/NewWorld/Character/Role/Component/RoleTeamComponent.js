"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var s,
      a = arguments.length,
      n =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, i, o);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (s = e[r]) && (n = (a < 3 ? s(n) : 3 < a ? s(t, i, n) : s(t, i)) || n);
    return 3 < a && n && Object.defineProperty(t, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTeamComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  BattleUiDefine_1 = require("../../../../Module/BattleUi/BattleUiDefine"),
  SceneTeamDefine_1 = require("../../../../Module/SceneTeam/SceneTeamDefine"),
  UiCameraAnimationManager_1 = require("../../../../Module/UiCameraAnimation/UiCameraAnimationManager"),
  EffectUtil_1 = require("../../../../Utils/EffectUtil"),
  CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds"),
  CharacterUnifiedStateComponent_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateComponent"),
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  RoleInheritComponent_1 = require("./RoleInheritComponent");
let RoleTeamComponent = class RoleTeamComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.m1t = void 0),
      (this.Xte = void 0),
      (this.mBe = void 0),
      (this.Mrn = void 0),
      (this.cBe = void 0),
      (this.Ern = void 0),
      (this.Gce = void 0),
      (this.Nce = void 0),
      (this.cZr = void 0),
      (this.Srn = void 0),
      (this.yrn = void 0),
      (this.Irn = -1),
      (this.GoBattleSkill = !1),
      (this.Trn = void 0),
      (this.Lrn = void 0),
      (this.qSa = 0),
      (this.Drn = void 0);
  }
  OnInit(e) {
    return (
      (this.m1t = this.Entity.GetComponent(160)),
      (this.Xte = this.Entity.GetComponent(190)),
      (this.Hte = this.Entity.GetComponent(3)),
      (this.mBe = this.Entity.GetComponent(161)),
      (this.Mrn = this.Entity.GetComponent(87)),
      (this.cBe = this.Entity.GetComponent(34)),
      (this.Ern = this.Entity.GetComponent(89)),
      (this.Gce = this.Entity.GetComponent(164)),
      (this.Nce = this.Entity.GetComponent(54)),
      (this.cZr = this.Entity.GetComponent(29)),
      !0
    );
  }
  OnStart() {
    var e = EffectUtil_1.EffectUtil.GetEffectPath(
        SceneTeamDefine_1.GO_BATTLE_MATERIAL,
      ),
      e =
        (ResourceSystem_1.ResourceSystem.LoadAsync(
          e,
          UE.PD_CharacterControllerDataGroup_C,
          (e) => {
            e && (this.Srn = e);
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
          e && (this.yrn = e);
        },
      ),
      !0
    );
  }
  OnEnd() {
    return this.Rrn(), !0;
  }
  Rrn() {
    this.Trn?.EndTask(),
      (this.Trn = void 0),
      this.Lrn?.EndTask(),
      (this.Lrn = void 0),
      this.Drn &&
        (TimerSystem_1.TimerSystem.Remove(this.Drn), (this.Drn = void 0));
  }
  static OnChangeRole(e, t, i, o, s, a, n, r, h) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "SceneTeam",
        49,
        "执行战斗换人",
        ["Last", e?.Id],
        ["New", t.Id],
      );
    var _ = e?.Entity?.GetComponent(84),
      m = t.Entity.GetComponent(84),
      l = _?.cBe;
    let f = l?.SkillTarget;
    var l = void 0 !== l && !l.IsMainSkillReadyEnd;
    e &&
      a &&
      l &&
      (!f &&
        FormationDataController_1.FormationDataController.GlobalIsInFight &&
        ((a = _?.cZr)?.DetectSoftLockTarget(0, 0, 8),
        (f = a?.GetCurrentTarget())),
      (l = _?.m1t),
      f) &&
      l?.HasBuffAuthority() &&
      l.AddBuff(CharacterBuffIds_1.buffId.GoDown, {
        InstigatorId: l.CreatureDataId,
        Reason: "战斗换人",
      });
    let c = !1,
      C = !1;
    a = e?.Entity?.GetComponent(190);
    a &&
      ((C = a.HasTag(504239013) || a.HasTag(855966206)),
      (c = a.HasTag(40422668))),
      m.Urn(),
      _ &&
        _ !== m &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "角色下场", ["Entity", _.Entity?.Id]),
        m.m1t.AddBuff(CharacterBuffIds_1.buffId.WaitRemoveQteInvincible, {
          InstigatorId: m.m1t.CreatureDataId,
          Reason: "换人去除QTE无敌",
        }),
        GlobalData_1.GlobalData.GameInstance &&
          GlobalData_1.GlobalData.BpEventManager.当换人完成时.Broadcast(),
        t.Entity.GetComponent(57).SetDataFromOldRole(e),
        e?.Entity?.GetComponent(58)?.ClearTarget(),
        _.Xte.HasTag(1144073280) ||
          _.cBe.StopAllSkills("RoleTeamComponent.OnChangeRole"),
        (l = _.Xte.HasTag(-1371021686) && !_.cBe.IsMainSkillReadyEnd),
        RoleInheritComponent_1.RoleInheritComponent.StateInherit(
          _.Mrn,
          m.Mrn,
          m.Ern.IsInQte ? 1 : 0,
          l,
        ),
        _.Arn(),
        _.Prn(s)),
      m.xrn(e, c, n, C || r),
      m.wrn(!C && i, o, h);
  }
  Urn() {
    var e = Global_1.Global.CharacterController,
      t = this.Hte.Actor;
    e.Pawn !== t &&
      (t.Mesh.AddTickPrerequisiteActor(e),
      e.Possess(t),
      this.Gce.StopMove(!1),
      this.Nce?.Active || this.Nce?.SetActive(!0));
  }
  xrn(e, t, i, o) {
    var s = void 0 === e;
    ModelManager_1.ModelManager.AutoRunModel?.IsInLogicTreeGmMode()
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "人物上场，GM推进中，继承位置"),
        this.InheritTransform(s))
      : i
        ? o
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "人物上场，强制继承位置"),
            this.InheritTransform(s))
          : this.Ern.IsInQte
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "人物上场，角色QTE中，不更新位置")
            : ((o = (i = e?.Entity?.GetComponent(190))?.HasTag(-2100129479)),
              (e = i?.HasTag(1144073280)),
              (i = i?.HasTag(-2044964178)),
              o || e || i
                ? (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "SceneTeam",
                      49,
                      "人物上场，上个角色还在场，进行寻点",
                    ),
                  this.Entity.GetComponent(89).SetQtePosition({
                    Rotate: t
                      ? SceneTeamDefine_1.SPECIAL_CHANGE_ANGLE_AIR
                      : SceneTeamDefine_1.SPECIAL_CHANGE_ANGLE_LAND,
                    Length: t
                      ? SceneTeamDefine_1.SPECIAL_CHANGE_DIS_AIR
                      : SceneTeamDefine_1.SPECIAL_CHANGE_DIS_LAND,
                    Height: t
                      ? SceneTeamDefine_1.SPECIAL_CHANGE_HEIGHT_AIR
                      : SceneTeamDefine_1.SPECIAL_CHANGE_HEIGHT_LAND,
                    ReferenceTarget: !1,
                    QteType: t ? 1 : 0,
                  }),
                  this.Gce?.CharacterMovement?.SetMovementMode(t ? 3 : 1))
                : (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "SceneTeam",
                      49,
                      "人物上场，上个角色不在场，继承位置",
                    ),
                  this.InheritTransform(s)))
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "人物上场，不允许改变位置");
  }
  InheritTransform(e = !1) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetSpawnTransform();
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneTeam",
            49,
            "继承位置失败，获取角色Transform为空",
          ),
        !1
      );
    t.SetRotation(new UE.Rotator(0, t.Rotator().Yaw, 0).Quaternion()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "继承位置", [
          "Location",
          t.GetLocation(),
        ]),
      this.Hte.SetActorTransform(t, "换人.上场", !1),
      e && this.Hte.SetInputFacing(this.Hte.ActorForwardProxy),
      ModelManager_1.ModelManager.SceneTeamModel.SetLastTransform(void 0);
    t = this.mBe;
    return (
      t.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
      ModelManager_1.ModelManager.SceneTeamModel.LastEntityIsOnGround
        ? this.Brn("换人.地面修正")
        : (t.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Slide &&
            t.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) ||
          this.Brn("换人.滑行修正"),
      !0
    );
  }
  Brn(e) {
    this.Hte.FixSwitchLocation(e, !0, !0);
  }
  wrn(e, t, i) {
    var o, s, a;
    this.Ern.IsInQte
      ? (this.GoBattleSkill = !1)
      : ((a = this.Xte.HasTag(1949807524)),
        this.cZr.DetectSoftLockTarget(),
        (o = void 0 !== this.cZr.GetCurrentTarget()),
        (s = this.Xte.HasTag(-1207177910)),
        (this.GoBattleSkill = a || (e && s && o))),
      this.Rrn();
    for (const n of CharacterUnifiedStateComponent_1.outGameRoleTags)
      this.Xte.RemoveTag(n);
    this.SetTeamTag(0),
      !ModelManager_1.ModelManager.PlotModel.InSeamlessFormation
        ? this.Entity.EnableByKey(1, !0)
        : this.Entity.DisableByKey(1, !0),
      this.brn(),
      this.Hte.KuroMoveAlongFloor(Vector_1.Vector.ZeroVector, 0, "GoBattle"),
      t &&
        i &&
        this.m1t.AddBuff(CharacterBuffIds_1.buffId.GoBattleInvincible, {
          InstigatorId: this.m1t.CreatureDataId,
          PreMessageId: i,
          Reason: "角色上场短暂无敌",
        }),
      UiCameraAnimationManager_1.UiCameraAnimationManager.IsActivate() ||
        CameraController_1.CameraController.ExitCameraMode(2),
      this.GoBattleSkill &&
        ((a =
          this.mBe.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Air),
        this.Hte.Actor.FightCommand(a));
  }
  brn() {
    var e, t;
    3 === ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType
      ? ((t = this.Entity.GetComponent(0).GetRoleId()),
        (e = ModelManager_1.ModelManager.PlotModel.GoBattleMaterial) &&
          ModelManager_1.ModelManager.RoleModel.IsMainRole(t) &&
          this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(e))
      : (this.Srn &&
          this.Hte.Actor.CharRenderingComponent.AddMaterialControllerDataGroup(
            this.Srn,
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
  Arn() {
    var e = this.Xte?.HasTag(1144073280),
      t = this.Xte?.HasTag(-2044964178);
    e || t
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneTeam",
            49,
            "角色下场，等待切人不隐藏Tag、硬直时间Tag移除再隐藏角色",
          ),
        this.SetTeamTag(1),
        e &&
          !this.Trn &&
          (this.Trn = this.Xte.ListenForTagAddOrRemove(1144073280, (e, t) => {
            t || (this.Trn?.EndTask(), (this.Trn = void 0), this.qrn());
          })),
        t &&
          !this.Lrn &&
          (this.Lrn = this.Xte.ListenForTagAddOrRemove(-2044964178, (e, t) => {
            t || (this.Lrn?.EndTask(), (this.Lrn = void 0), this.qrn());
          })),
        this.Hte.RestoreDefaultController(),
        this.Gce?.StopAllAddMove())
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "角色下场，立即隐藏"),
        this.SetTeamTag(2),
        this.Entity.DisableByKey(1, !0),
        this.Hte.RestoreDefaultController(),
        this.Gce?.StopAllAddMove(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnRoleGoDownFinish,
        ));
  }
  qrn() {
    var e = !this.Trn && !this.Lrn;
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
  InterruptDisableWithEffect() {
    this.Drn &&
      (TimerSystem_1.TimerSystem.Remove(this.Drn), (this.Drn = void 0));
    var e = this.qSa;
    e &&
      (this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(e),
      (this.qSa = 0));
  }
  SetRoleDisableWithEffect() {
    this.Drn
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "角色下场，正在播放特效等待隐藏")
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "角色下场，播放特效后再隐藏"),
        this.yrn &&
          (this.qSa =
            this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
              this.yrn,
            )),
        (this.Drn = TimerSystem_1.TimerSystem.Delay(() => {
          (this.Drn = void 0),
            this.cBe.StopAllSkills(
              "RoleTeamComponent.SetRoleDisableWithEffect",
            ),
            this.jHa(!1),
            this.SetTeamTag(2),
            this.Entity.DisableByKey(1, !0),
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnRoleGoDownFinish,
            );
        }, SceneTeamDefine_1.EFFECT_DELAY_QUIT)));
  }
  Prn(e) {
    var t = e * BattleUiDefine_1.SECOND_TO_MILLISECOND;
    (this.Irn = t + Time_1.Time.WorldTime),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnChangeRoleCoolDownChanged,
        e,
      );
  }
  IsChangeRoleCoolDown() {
    return 0 < this.GetChangeRoleCoolDown() || !(this.Irn = -1);
  }
  GetChangeRoleCoolDown() {
    return 0 < this.Irn ? this.Irn - Time_1.Time.WorldTime : -1;
  }
  SetTeamTag(e) {
    if (this.Entity.IsInit)
      switch (e) {
        case 0:
          this.Xte.AddTag(-1384309247),
            this.jHa(!1),
            this.Xte.HasTag(-1207177910) && this.Xte.RemoveTag(-1207177910),
            this.Xte.HasTag(-1388400236) && this.Xte.RemoveTag(-1388400236);
          break;
        case 1:
          this.Xte.AddTag(-1388400236),
            this.jHa(!0),
            this.Xte.HasTag(-1207177910) && this.Xte.RemoveTag(-1207177910),
            this.Xte.HasTag(-1384309247) && this.Xte.RemoveTag(-1384309247);
          break;
        case 2:
          this.Hte.IsAutonomousProxy && this.Xte.AddTag(-1207177910),
            this.Xte.HasTag(-1384309247) && this.Xte.RemoveTag(-1384309247),
            this.Xte.HasTag(-1388400236) && this.Xte.RemoveTag(-1388400236);
      }
  }
  jHa(e) {
    e
      ? (this.Xte.AddTag(-1728939369), this.Xte.AddTag(-1858008874))
      : (this.Xte.RemoveTag(-1728939369), this.Xte.RemoveTag(-1858008874));
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
  [(0, RegisterComponent_1.RegisterComponent)(84)],
  RoleTeamComponent,
)),
  (exports.RoleTeamComponent = RoleTeamComponent);
//# sourceMappingURL=RoleTeamComponent.js.map
