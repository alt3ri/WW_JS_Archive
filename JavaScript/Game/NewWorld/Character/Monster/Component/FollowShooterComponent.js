"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      r = arguments.length,
      h =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (h = (r < 3 ? o(h) : 3 < r ? o(e, i, h) : o(e, i)) || h);
    return 3 < r && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShooterComponent = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  Global_1 = require("../../../../Global"),
  InputController_1 = require("../../../../Input/InputController"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LockOnController_1 = require("../../../../Module/LockOn/LockOnController"),
  LogReportController_1 = require("../../../../Module/LogReport/LogReportController"),
  LogReportDefine_1 = require("../../../../Module/LogReport/LogReportDefine"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  DELAY_DISAPPEAR_MAX_TIME = 5e3,
  lockOnTargetTag = 199201016;
let FollowShooterComponent = class FollowShooterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.tRr = void 0),
      (this.Xte = void 0),
      (this.n$t = void 0),
      (this.IsEnable = !1),
      (this.j8 = 0),
      (this.beh = !1),
      (this.IsAutonomousProxy = !1),
      (this.Bhh = void 0),
      (this.Pia = !1),
      (this.u4l = new Set()),
      (this.wia = new Set()),
      (this.ZY_ = new Map()),
      (this.ez_ = new Map()),
      (this.Bia = new Set()),
      (this.tz_ = new Array()),
      (this.$Ia = !1),
      (this.YIa = !1),
      (this.FBa = 0),
      (this.VBa = void 0),
      (this.AimType = 0),
      (this.Q6c = Vector_1.Vector.Create()),
      (this.K6c = 0),
      (this.X6c = 0),
      (this.Y6c = 0),
      (this.Hn1 = new Array()),
      (this.LoadConfigPromise = void 0),
      (this.xie = () => {
        this.iz_(), this.rz_(), this._rl(), this.kUa();
      }),
      (this.kUa = () => {
        this.NUa() ? this.Pia && this.SetEnable(!0) : this.SetEnable(!1);
      }),
      (this.oz_ = (t) => {
        if (this.Xte) {
          var e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(
              this.j8,
              { ParamType: 2, IsControl: !0 },
            )?.EntityHandle?.Entity?.GetComponent(203),
            t = this.ez_.get(t);
          if (t)
            for (const s of t) {
              var i = this.ZY_.get(s);
              i && e?.HasAnyTag(i)
                ? this.Xte.HasExactTag(s) || this.Xte.AddTag(s)
                : this.Xte.RemoveTag(s);
            }
        }
      }),
      (this.HFt = 0),
      (this.oo_ = void 0),
      (this.uY_ = void 0),
      (this.LockOnTarget = void 0),
      (this.jx_ = !1);
  }
  OnInitData(t) {
    var e = this.Entity.GetComponent(0);
    return (
      (this.j8 = e?.GetPlayerId() ?? 0),
      (this.IsAutonomousProxy =
        this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      this.IsAutonomousProxy &&
        (e = e?.GetPbEntityInitData())?.ComponentsData &&
        (e = (0, IComponent_1.getComponent)(
          e.ComponentsData,
          "FollowShooterComponent",
        )) &&
        ((this.uY_ = e.LockableCategories),
        (this.Bhh = InputController_1.InputController.CreateInputLayer(3)),
        (this.LoadConfigPromise = new CustomPromise_1.CustomPromise()),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          e.Config,
          UE.BP_FollowShooterConfig_C,
          (t) => {
            if (t?.IsValid) {
              (this.oo_ = t),
                (this.Pia = t.AutoEnable),
                (this.$Ia = t.NeedUploadData),
                (this.FBa = t.DelayDisappearMillisecond),
                (this.AimType = t.AimType);
              var e = t.BornTransform,
                i =
                  (this.Q6c.FromUeVector(e.Offset),
                  (this.K6c = e.OffsetTargetType),
                  (this.X6c = e.RotateType),
                  (this.Y6c = e.RotateCameraDistance),
                  e.RotateInvalidAxis);
              for (let t = 0; t < i.Num(); t++) {
                var s = i.Get(t);
                this.Hn1.push(s);
              }
              var o = t.NeedInputActions;
              for (let t = 0; t < o.Num(); t++) {
                var r = o.Get(t),
                  h = r.State;
                this.Bhh?.RegisterInputAction([r.Action, h]);
              }
              var n = t.AddTagsWhenEnable;
              for (let t = 0; t < n.Num(); t++) {
                var l = n.Get(t);
                this.wia.add(l.TagId);
              }
              var a = t.AddTagsToPlayerWhenPossess;
              for (let t = 0; t < a.Num(); t++) {
                var _ = a.Get(t);
                this.u4l.add(_.TagId);
              }
              var v = t.DisableWhenCurrentRoleHasTags;
              for (let t = 0; t < v.Num(); t++) {
                var f = v.Get(t);
                this.Bia.add(f.TagId);
              }
              var u = t.AddTagsWhenCurrentRoleHasAnyTags;
              for (let t = 0; t < u.Num(); t++) {
                var C = u.GetKey(t),
                  m = u.Get(C)?.GameplayTags;
                if (m) {
                  var d = new Set(),
                    p = C.TagId;
                  this.ZY_.set(p, d);
                  for (let e = 0; e < m.Num(); e++) {
                    var c = m.Get(e).TagId;
                    d.add(c);
                    let t = this.ez_.get(c);
                    t || ((t = new Set()), this.ez_.set(c, t)), t.add(p);
                  }
                }
              }
              this.LoadConfigPromise?.SetResult(),
                (this.LoadConfigPromise = void 0);
            }
          },
        )),
      !0
    );
  }
  OnStart() {
    var t = this.Entity.GetComponent(0).GetCreatureDataId();
    return (
      ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
        this.j8,
      )
        ?.GetComponent(221)
        ?.OnFollowerAdd(t),
      this.IsAutonomousProxy &&
        ((this.tRr = this.Entity.GetComponent(39)),
        (this.Xte = this.Entity.GetComponent(203)),
        (this.n$t = this.Entity.GetComponent(1)),
        this.Bhh?.Start(this)),
      !0
    );
  }
  OnEnd() {
    return (
      this.SetEnable(!1),
      this.UnPossess(),
      (this.FBa = 0),
      this.VBa?.Remove(),
      (this.VBa = void 0),
      (this.AimType = 0),
      this.u4l.clear(),
      this.wia.clear(),
      this.Bia.clear(),
      (this.Pia = !1),
      (this.j8 = 0),
      (this.IsAutonomousProxy = !1),
      (this.beh = !1),
      this.LoadConfigPromise?.SetResult(),
      (this.LoadConfigPromise = void 0),
      this.Bhh &&
        (InputController_1.InputController.RemoveInputLayer(this.Bhh),
        this.Bhh.Clear(),
        (this.Bhh = void 0)),
      !0
    );
  }
  OnTick(t) {
    this.Pxl(t);
  }
  Possess() {
    if (this.IsAutonomousProxy && !this.beh) {
      this.beh = !0;
      for (const t of this.u4l)
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(
          this.j8,
          t,
        );
      this.z6c(),
        this.J6c(),
        this.iz_(),
        this.rz_(),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeMode,
          this.kUa,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnUpdateTeamGroupType,
          this.kUa,
        ),
        this.Pia && this.SetEnable(!0);
    }
  }
  z6c() {
    if (this.n$t) {
      let t = void 0;
      var e;
      0 === this.K6c
        ? (t = this.n$t)
        : 1 === this.K6c &&
          (t =
            ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
              1,
            )),
        t?.Valid &&
          ((e = Vector_1.Vector.Create()).FromUeVector(
            t.ActorTransform.TransformPositionNoScale(this.Q6c.ToUeVector()),
          ),
          this.n$t.SetActorLocation(e.ToUeVector(), "UpdateBornPosition", !1));
    }
  }
  J6c() {
    if (0 !== this.X6c && this.n$t) {
      var t,
        e = this.Entity.GetComponent(44),
        i = e ? e.GravityUp : Vector_1.Vector.UpVectorProxy,
        s = Rotator_1.Rotator.Create();
      if (1 === this.X6c) {
        var o =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
            1,
          );
        if (!o?.Valid) return;
        s.DeepCopy(o.ActorRotationProxy);
      } else
        2 === this.X6c &&
          ((o = Vector_1.Vector.Create()),
          (r = Vector_1.Vector.Create()),
          (t = Vector_1.Vector.Create()),
          o.FromUeVector(
            Global_1.Global.CharacterCameraManager.D_GetCameraLocation(),
          ),
          r.FromUeVector(
            Global_1.Global.CharacterCameraManager.GetActorForwardVector(),
          ),
          o.AdditionEqual(r.MultiplyEqual(this.Y6c)),
          t.DeepCopy(o),
          t.Subtraction(this.n$t.ActorLocationProxy, t),
          MathUtils_1.MathUtils.LookRotationForwardFirst(t, i, s));
      var r = Quat_1.Quat.Create(),
        h = Rotator_1.Rotator.Create(),
        n = Rotator_1.Rotator.Create(),
        o = !e || e.IsStandardGravity;
      o
        ? (h.DeepCopy(s), n.DeepCopy(this.n$t.ActorRotationProxy))
        : (Quat_1.Quat.FindBetween(Vector_1.Vector.UpVectorProxy, i, r),
          GravityUtils_1.GravityUtils.GetRotatorInNormal(s, r, h),
          GravityUtils_1.GravityUtils.GetRotatorInNormal(
            this.n$t.ActorRotationProxy,
            r,
            n,
          ));
      for (const l of this.Hn1)
        0 === l
          ? (h.Roll = n.Roll)
          : 1 === l
            ? (h.Pitch = n.Pitch)
            : 2 === l && (h.Yaw = n.Yaw);
      o
        ? s.DeepCopy(h)
        : (r.Inverse(r),
          GravityUtils_1.GravityUtils.GetRotatorInGravity(h, r, s)),
        this.n$t.SetActorRotation(s.ToUeRotator(), "UpdateBornRotation", !1);
    }
  }
  UnPossess() {
    if (this.IsAutonomousProxy && this.beh) {
      this.beh = !1;
      for (const t of this.u4l)
        ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(
          this.j8,
          t,
        );
      this.SetEnable(!1),
        this.nz_(),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeMode,
          this.kUa,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnUpdateTeamGroupType,
          this.kUa,
        );
    }
  }
  SetEnable(t) {
    if (this.IsAutonomousProxy && this.IsEnable !== t)
      if (t) {
        if (this.NUa()) {
          this.VBa?.Remove(),
            (this.VBa = void 0),
            (this.IsEnable = !0),
            (this.HFt = 0),
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              this.Entity,
              !0,
              "Follower Enable",
              !0,
            ),
            this._rl();
          for (const e of this.wia)
            this.Xte?.AddTag(e),
              ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(
                this.j8,
                e,
              );
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPlayerFollowerEnableChange,
            !0,
          );
        }
      } else {
        this.Bhh &&
          InputController_1.InputController.RemoveInputLayer(this.Bhh);
        for (const i of this.wia)
          this.Xte?.RemoveTag(i),
            ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(
              this.j8,
              i,
            );
        this.JIa(),
          (this.IsEnable = !1),
          (this.YIa = !1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPlayerFollowerEnableChange,
            !1,
          ),
          this.jx_ && (this.Xte?.RemoveTag(lockOnTargetTag), (this.jx_ = !1)),
          0 < this.FBa && this.FBa <= DELAY_DISAPPEAR_MAX_TIME
            ? this.VBa ||
              (this.VBa = TimerSystem_1.TimerSystem.Delay(() => {
                (this.VBa = void 0),
                  ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                    this.Entity,
                    !1,
                    "Follower Disable",
                    !0,
                  );
              }, this.FBa))
            : ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                this.Entity,
                !1,
                "Follower Disable",
                !0,
              );
      }
  }
  NUa() {
    var t;
    return (
      1 === ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType &&
      !(
        !(t =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
            203,
          )) || t.HasAnyTag(this.Bia)
      )
    );
  }
  rz_() {
    if (this.Xte) {
      var t,
        e,
        i = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.j8, {
          ParamType: 2,
          IsControl: !0,
        })?.EntityHandle?.Entity?.GetComponent(203);
      for ([t, e] of this.ZY_)
        i?.HasAnyTag(e)
          ? this.Xte.HasExactTag(t) || this.Xte.AddTag(t)
          : this.Xte.RemoveTag(t);
    }
  }
  iz_() {
    this.nz_();
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.j8, {
      ParamType: 2,
      IsControl: !0,
    })?.EntityHandle?.Entity?.GetComponent(203);
    if (t) {
      for (const s of this.Bia) {
        var e = t.ListenForTagAddOrRemove(s, this.kUa);
        e && this.tz_.push(e);
      }
      for (const o of this.ez_.keys()) {
        var i = t.ListenForTagAddOrRemove(o, this.oz_);
        i && this.tz_.push(i);
      }
    }
  }
  nz_() {
    for (const t of this.tz_) t.EndTask();
    this.tz_.length = 0;
  }
  _rl() {
    var t;
    this.IsEnable &&
      this.Bhh &&
      (InputController_1.InputController.RemoveInputLayer(this.Bhh),
      (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
        ?.Valid) &&
      InputController_1.InputController.AddInputLayer(t.Id, this.Bhh);
  }
  ExecuteCommand(t) {
    t &&
      1 === t.CommandType &&
      ((t = t.IntValue),
      this.tRr.BeginSkill(t, {
        Reason: "Follower Begin Skill",
        Target: this.LockOnTarget?.Entity,
      }),
      (this.YIa = !0));
  }
  JIa() {
    if (this.$Ia) {
      var e = new LogReportDefine_1.FollowShooterUseLogData();
      let t =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
          1,
        )?.ActorLocationProxy;
      (t = t || this.n$t?.ActorLocationProxy) &&
        ((e.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
        (e.i_father_area_id =
          ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
        (e.f_pos_x = t.X),
        (e.f_pos_y = t.Y),
        (e.f_pos_z = t.Z),
        (e.i_has_target = this.YIa ? 1 : 0),
        LogReportController_1.LogReportController.UnitLogReport(e));
    }
  }
  Pxl(t) {
    !this.oo_?.LockOnConfig.Enable ||
      this.oo_.LockOnConfig.GapTime <= 0 ||
      (0 === this.HFt &&
        ((this.LockOnTarget = LockOnController_1.LockOnController.LockOnCircle(
          this.n$t.Owner,
          this.oo_.LockOnConfig.Distance,
          this.oo_.LockOnConfig.Radius,
          this.uY_,
        )),
        this.IsEnable) &&
        (this.LockOnTarget && !this.jx_
          ? (this.Xte?.AddTag(lockOnTargetTag), (this.jx_ = !0))
          : !this.LockOnTarget &&
            this.jx_ &&
            (this.Xte?.RemoveTag(lockOnTargetTag), (this.jx_ = !1))),
      (this.HFt += t),
      this.HFt >
        this.oo_.LockOnConfig.GapTime *
          TimeUtil_1.TimeUtil.InverseMillisecond && (this.HFt = 0));
  }
};
(FollowShooterComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(219)],
  FollowShooterComponent,
)),
  (exports.FollowShooterComponent = FollowShooterComponent);
//# sourceMappingURL=FollowShooterComponent.js.map
