"use strict";
var CharacterLockOnComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var r,
        h = arguments.length,
        o =
          h < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, i, e, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (r = t[a]) &&
            (o = (h < 3 ? r(o) : 3 < h ? r(i, e, o) : r(i, e)) || o);
      return 3 < h && o && Object.defineProperty(i, e, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterLockOnComponent =
    exports.LockOnInfo =
    exports.ShowTargetInfo =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
  CameraController_1 = require("../../../../../Camera/CameraController"),
  CameraUtility_1 = require("../../../../../Camera/CameraUtility"),
  TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../../../../Common/StatDefine"),
  Global_1 = require("../../../../../Global"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
  CharacterController_1 = require("../../../CharacterController"),
  CampUtils_1 = require("../../Blueprint/Utils/CampUtils"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  LockOnDebug_1 = require("./LockOnDebug"),
  PROFILE_KEY = "CharacterLockOnComponent_IsBlock",
  DELAY_TIME = 1e3,
  CHECK_COUNT = 3,
  RESET_FOCUS_TIME = 0.6,
  RESET_TARGETS_ISLOCK_TIME = 1e4,
  DEFAULT_LOCKON_CONFIG_ID = 0,
  OFFSET = 250;
class ShowTargetInfo {
  constructor() {
    (this.ShowTarget = void 0), (this.SocketName = ""), (this.LastSetTime = -0);
  }
}
exports.ShowTargetInfo = ShowTargetInfo;
class LockOnInfo {
  constructor() {
    (this.EntityHandle = void 0), (this.SocketName = "");
  }
  Copy(t) {
    (this.EntityHandle = t.EntityHandle), (this.SocketName = t.SocketName);
  }
  Equal(t) {
    return (
      this.EntityHandle?.Id === t.EntityHandle?.Id &&
      this.SocketName === t.SocketName
    );
  }
  Different(t) {
    return (
      this.EntityHandle !== t.EntityHandle ||
      (this.SocketName !== t.SocketName && !!this.SocketName)
    );
  }
}
exports.LockOnInfo = LockOnInfo;
class CustomizedLockedQueue {
  constructor() {
    this.Z$o = [];
  }
  Has(i) {
    return !!i && this.Z$o.some((t) => t.Equal(i));
  }
  Push(t) {
    t && !this.Has(t) && this.Z$o.push(t);
  }
  Pop() {
    return this.Z$o.shift();
  }
  Clear() {
    this.Z$o.length = 0;
  }
}
let CharacterLockOnComponent =
  (CharacterLockOnComponent_1 = class CharacterLockOnComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.ActorComp = void 0),
        (this.NextUpdateTime = 0),
        (this.ResetTargetLocation = Vector_1.Vector.Create()),
        (this.ResetAddRotator = Rotator_1.Rotator.Create()),
        (this.o$r = void 0),
        (this.r$r = void 0),
        (this.n$r = ""),
        (this.s$r = void 0),
        (this.a$r = void 0),
        (this.h$r = 0),
        (this.Xte = void 0),
        (this.mbr = void 0),
        (this.PSo = void 0),
        (this.l$r = void 0),
        (this._$r = void 0),
        (this.u$r = void 0),
        (this.c$r = !1),
        (this.f7o = Vector_1.Vector.Create()),
        (this.Tz = Vector_1.Vector.Create()),
        (this.Dz = Quat_1.Quat.Create()),
        (this.Xyn = Vector2D_1.Vector2D.Create()),
        (this.m$r = Vector_1.Vector.Create()),
        (this.d$r = Vector_1.Vector.Create()),
        (this.C$r = 0),
        (this.g$r = 0),
        (this.f$r = !1),
        (this.p$r = 0),
        (this.uoe = void 0),
        (this.v$r = (t) => {
          this.o$r?.EntityHandle?.Id === t && this.xDn();
        }),
        (this.zpe = (t, i) => {
          this.o$r?.EntityHandle === i && this.xDn();
        }),
        (this.W3r = (t) => {
          t = t.GetComponent(29);
          (this.c$r = t.c$r),
            this.E$r(t.o$r),
            (this.s$r = t.s$r),
            this.SetShowTarget(t.ShowTarget, t.ShowTargetSocket);
        }),
        (this.y$r = void 0),
        (this.$Vs = void 0),
        (this.T$r = void 0),
        (this.L$r = void 0),
        (this.D$r = (t, i) => {
          var e;
          i
            ? this.M$r && (this.a$r = this.o$r)
            : ((i = this.a$r?.EntityHandle?.Entity),
              this.a$r &&
                i?.Valid &&
                (i = i.GetComponent(3))?.Valid &&
                (e =
                  ModelManager_1.ModelManager?.CameraModel?.FightCamera
                    ?.LogicComponent)?.CheckPositionInScreen(
                  i.ActorLocationProxy,
                  e.CameraAdjustController.CheckInScreenMinX,
                  e.CameraAdjustController.CheckInScreenMaxX,
                  e.CameraAdjustController.CheckInScreenMinY,
                  e.CameraAdjustController.CheckInScreenMaxY,
                ) &&
                (this.M$r
                  ? (this.E$r(this.a$r),
                    this.SetShowTarget(
                      this.o$r.EntityHandle,
                      this.o$r.SocketName,
                    ),
                    CharacterLockOnComponent_1.R$r.Push(this.o$r))
                  : this.EnterLockDirection(),
                (this.a$r = void 0)));
        }),
        (this.A$r = !1),
        (this.cVr = Vector_1.Vector.Create()),
        (this.U$r = void 0),
        (this.P$r = !1);
    }
    E$r(t) {
      var i = this.o$r;
      (this.o$r = t),
        (i?.EntityHandle === t?.EntityHandle &&
          i?.SocketName === t?.SocketName) ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              29,
              "CharacterLockOnComponent.SetCurrentInfo",
              ["Me", this.Entity.Id],
              ["Target", t?.EntityHandle?.Id],
              ["TargetSocket", t?.SocketName],
            ));
    }
    GetCurrentTarget() {
      return this.o$r?.EntityHandle;
    }
    GetCurrentTargetSocketName() {
      return this.o$r?.SocketName ?? "";
    }
    GetTargetInfo() {
      return (
        (this.u$r.ShowTarget = this.ShowTarget),
        (this.u$r.SocketName = this.ShowTargetSocket),
        (this.u$r.LastSetTime = this.h$r),
        this.u$r
      );
    }
    get ShowTarget() {
      return this.r$r;
    }
    get ShowTargetSocket() {
      return this.n$r;
    }
    SetShowTarget(t, i = "") {
      this.h$r = Time_1.Time.WorldTime;
      var e = t?.Entity?.GetComponent(3);
      if (this.ShowTarget !== t || this.ShowTargetSocket !== i) {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              29,
              "CharacterLockOnComponent.SetShowTarget",
              ["Me", this.Entity.Id],
              ["Target", t?.Id],
              ["TargetSocket", i],
            ),
          void 0 === t)
        )
          return (
            (this.r$r = void 0),
            (this.n$r = ""),
            GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(
              void 0,
            ),
            !1
          );
        (this.r$r = t),
          (this.n$r = i),
          e &&
            GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(
              e.Actor,
            );
      }
      return !0;
    }
    x$r(t, i = "") {
      var e, s;
      return (
        !this.M$r &&
        !this.Xte.HasTag(2066208190) &&
        (t?.Valid && t.Entity.Active
          ? (e = t.Entity.GetComponent(3))
            ? i
              ? !!(s = e.LockOnParts.get(i)) &&
                !!s.SoftLockValid &&
                this.SetShowTarget(t, i)
              : !e.LockOnParts.size && this.SetShowTarget(t, i)
            : this.SetShowTarget(t, i)
          : this.SetShowTarget(void 0))
      );
    }
    static get Dependencies() {
      return [158];
    }
    xDn() {
      this.c$r
        ? this.ForceLookAtTarget(void 0, !1, !0)
        : this.M$r
          ? this.S$r(!0)
          : (this.E$r(void 0), this.SetShowTarget(void 0));
    }
    OnInitData() {
      return (
        (this.u$r = new ShowTargetInfo()),
        (this.U$r = new UE.Vector2D(0, 0)),
        !0
      );
    }
    OnInit() {
      return (
        (this.NextUpdateTime = 0),
        (this.y$r = void 0),
        (this.$Vs = void 0),
        (this.T$r = void 0),
        !(this.L$r = void 0)
      );
    }
    OnStart() {
      this.ActorComp = this.Entity.CheckGetComponent(3);
      var t = this.Entity.GetComponent(0);
      return (
        this.SetLockOnConfig(
          t.GetRoleConfig().LockOnDefaultId,
          t.GetRoleConfig().LockOnLookOnId,
        ),
        (this.Xte = this.Entity.CheckGetComponent(185)),
        (this.mbr = this.Entity.CheckGetComponent(158)),
        (this.PSo = this.Entity.CheckGetComponent(52)),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.v$r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r,
        ),
        this.Xte.ListenForTagAddOrRemove(483118073, this.D$r),
        this.koe(),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.v$r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.W3r,
        ),
        !0
      );
    }
    koe() {
      (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.uoe.WorldContextObject = this.ActorComp.Actor),
        (this.uoe.bIsSingle = !0),
        (this.uoe.bIgnoreSelf = !0),
        this.uoe.SetTraceTypeQuery(
          QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
        ),
        this.f$r &&
          ((this.uoe.DrawTime = 5),
          this.uoe.SetDrawDebugTrace(2),
          TraceElementCommon_1.TraceElementCommon.SetTraceColor(
            this.uoe,
            ColorUtils_1.ColorUtils.LinearGreen,
          ),
          TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
            this.uoe,
            ColorUtils_1.ColorUtils.LinearRed,
          ));
    }
    SetLockOnConfig(t, i) {
      0 !== t &&
        (this.l$r =
          ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(t)),
        0 !== i &&
          (this._$r =
            ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(i));
    }
    OnTick(t) {
      this.w$r(),
        this.XVs(),
        this.Ii(t),
        this.b$r(t),
        this.q$r(),
        LockOnDebug_1.LockOnDebug.Tick(this.Entity);
    }
    Ii(t) {
      this.j$r(this.o$r?.EntityHandle)
        ? (this.M$r || this.c$r) &&
          ((this.g$r += t),
          this.g$r < DELAY_TIME ||
            ((this.g$r = 0),
            this.J4r(this.o$r)
              ? (this.C$r++,
                this.C$r >= CHECK_COUNT && (this.YVs(), (this.C$r = 0)))
              : (this.C$r = 0)))
        : this.YVs();
    }
    YVs() {
      this.E$r(void 0),
        this.SetShowTarget(void 0),
        this.ExitLockDirection(),
        this.ForceLookAtTarget(void 0, !1);
    }
    b$r(t) {
      this.M$r &&
        ((this.p$r += t),
        this.p$r < RESET_TARGETS_ISLOCK_TIME ||
          ((this.p$r = 0),
          CharacterLockOnComponent_1.R$r.Clear(),
          CharacterLockOnComponent_1.R$r.Push(this.o$r)));
    }
    SelectSoftLockTarget(i = DEFAULT_LOCKON_CONFIG_ID, t = 0, e = 4, s = !1) {
      if (!this.M$r && !this.c$r)
        if (0 !== t) this.o$r || this.SelectSoftLockTarget();
        else {
          let t = this.l$r;
          DEFAULT_LOCKON_CONFIG_ID !== i &&
            (t = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(i)),
            this.G$r(t, e),
            s &&
              this.x$r(
                this.GetCurrentTarget(),
                this.GetCurrentTargetSocketName(),
              );
        }
    }
    G$r(t, i) {
      var e = this.N$r(t, !1);
      let s = void 0;
      (s = s || this.O$r(this.k$r(e, !1), i, !1, t.ToleranceAngle)),
        this.E$r(s),
        s?.EntityHandle?.Valid && LockOnDebug_1.LockOnDebug.SetDebugArrow(s);
    }
    O$r(t, i, e, s) {
      let r = void 0,
        h = !1;
      switch (i) {
        case 0:
          (h = !this.P$r),
            (this.P$r = !1),
            (r = this.cVr.IsNearlyZero() ? this.F$r() : this.cVr);
          break;
        case 1:
          r = this.ActorComp.ActorForwardProxy;
          break;
        case 2:
          (r = this.F$r()), (h = !0);
          break;
        case 3:
          break;
        case 4:
          r = this.F$r();
      }
      let o = void 0,
        a = 180 / s,
        n = Number.MAX_VALUE;
      for (const C of t) {
        switch (this.V$r(C, e, h)) {
          case 0:
            continue;
          case 1:
            break;
          case 2:
            return (
              LockOnDebug_1.LockOnDebug.SetDebugString(C, 0, 0, this.cVr, r), C
            );
        }
        this.GetSkillBoneLocation(C.EntityHandle, C.SocketName, this.f7o);
        var _ = this.ActorComp.ActorLocationProxy,
          c = Vector_1.Vector.Dist(_, this.f7o);
        let t = 0;
        r &&
          (this.Tz.DeepCopy(r),
          this.Tz.Normalize(),
          this.Tz.Multiply(OFFSET, this.Tz),
          _.Subtraction(this.Tz, this.Tz),
          this.f7o.Subtraction(this.Tz, this.f7o),
          (t = this.H$r(r, this.f7o)));
        _ = Math.floor(t / s);
        _ === a && o
          ? c < n && ((n = c), (o = C))
          : _ <= a && ((a = _), (n = c), (o = C)),
          LockOnDebug_1.LockOnDebug.SetDebugString(C, t, c, this.cVr, r);
      }
      return o;
    }
    V$r(t, i, e) {
      return i && CharacterLockOnComponent_1.R$r.Has(t)
        ? 0
        : e && this.j$r(this.o$r?.EntityHandle) && this.o$r?.Equal(t)
          ? 2
          : 1;
    }
    F$r() {
      var t = Vector_1.Vector.Create();
      return (
        CameraController_1.CameraController.CameraRotator.Quaternion().RotateVector(
          Vector_1.Vector.ForwardVectorProxy,
          t,
        ),
        t
      );
    }
    H$r(t, i, e = !1) {
      return (
        Math.acos(
          e
            ? t.DotProduct(i) / Math.sqrt(t.SizeSquared() * i.SizeSquared())
            : t.CosineAngle2D(i),
        ) * MathUtils_1.MathUtils.RadToDeg
      );
    }
    ForceLookAtTarget(t, i, e = !1) {
      var s = this.c$r;
      if (i) {
        if (
          ((this.c$r = !0),
          this.M$r &&
            (this.c$r || (this.s$r = this.o$r), !t?.Different(this.o$r)))
        )
          return;
        this.mbr.SetDirectionState(
          CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection,
        ),
          this.E$r(t),
          this.SetShowTarget(t?.EntityHandle, t?.SocketName);
      } else
        this.c$r &&
          !t?.Different(this.o$r) &&
          (this.j$r(this.s$r?.EntityHandle) && e
            ? (this.E$r(this.s$r),
              this.SetShowTarget(this.s$r.EntityHandle, this.s$r.SocketName),
              CharacterLockOnComponent_1.R$r.Push(this.s$r),
              this.mbr.SetDirectionState(
                CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection,
              ))
            : (this.M$r && this.j$r(this.o$r?.EntityHandle)) ||
              (this.E$r(void 0),
              this.SetShowTarget(void 0),
              this.mbr.SetDirectionState(
                CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
              )),
          (this.c$r = !1),
          (this.s$r = void 0));
      s !== this.c$r &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          29,
          "CharacterLockOnComponent.ForceLookAtTarget",
          ["isLookAt", i],
          ["Me", this.Entity.Id],
          ["Target", t?.EntityHandle?.Id],
          ["TargetSocket", t?.SocketName],
        );
    }
    EnterLockDirection() {
      if (this.c$r)
        (this.s$r = void 0), CharacterLockOnComponent_1.R$r.Push(this.o$r);
      else {
        if (this.M$r) return;
        if (this.Xte.HasTag(428837378)) return;
        if (this.Xte.HasTag(2066208190)) return;
        if (
          CameraController_1.CameraController.FightCamera.LogicComponent
            .IsDisableResetFocus
        )
          return;
        if ((this.S$r(!0), !this.o$r)) return void this.ResetFocus();
        this.C$r = 0;
      }
      this.mbr.SetDirectionState(
        CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection,
      );
    }
    ExitLockDirection() {
      this.M$r &&
        (this.c$r
          ? (this.mbr.SetDirectionState(
              CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection,
            ),
            (this.s$r = void 0))
          : (this.SetShowTarget(void 0),
            CharacterLockOnComponent_1.R$r.Clear(),
            this.mbr.SetDirectionState(
              CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
            )));
    }
    ResetFocus() {
      CameraController_1.CameraController.FightCamera.LogicComponent
        .IsDisableResetFocus ||
        !ModelManager_1.ModelManager.CameraModel.IsEnableResetFocus ||
        this.c$r ||
        this.M$r ||
        CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(
          CameraUtility_1.CameraUtility.GetCameraDefaultFocusRotator(),
          RESET_FOCUS_TIME,
        );
    }
    ResetPitch(t = RESET_FOCUS_TIME, i = void 0) {
      var e =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "InitialCameraPitch",
          ),
        s =
          CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.ToUeRotator().Euler(),
        e = Rotator_1.Rotator.Create(e, s.Z, s.X);
      CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(
        e,
        t,
        i,
      );
    }
    W$r(t) {
      return (
        !!t?.Valid &&
        ((t = t.Entity.GetComponent(0).GetEntityType()),
        !![
          Protocol_1.Aki.Protocol.HBs.Proto_Monster,
          Protocol_1.Aki.Protocol.HBs.Proto_Npc,
          Protocol_1.Aki.Protocol.HBs.Proto_Player,
          Protocol_1.Aki.Protocol.HBs.Proto_Vision,
        ].includes(t))
      );
    }
    XVs() {
      var t;
      this.c$r ||
        (this.Xte.HasTag(2066208190)
          ? this.YVs()
          : this.o$r?.EntityHandle?.Valid &&
            (this.M$r
              ? ((t = this.f7o),
                this.GetSkillBoneLocation(
                  this.o$r.EntityHandle,
                  this.o$r.SocketName,
                  t,
                ),
                (this.K$r(this.o$r.EntityHandle) ||
                  this.Q$r(this._$r, this.o$r.EntityHandle, t)) &&
                  this.ExitLockDirection())
              : (this.X$r(this.o$r.EntityHandle) ||
                  this.Q$r(
                    this._$r,
                    this.o$r.EntityHandle,
                    this.o$r.EntityHandle.Entity.GetComponent(1)
                      .ActorLocationProxy,
                  )) &&
                (this.E$r(void 0), this.SetShowTarget(void 0))));
    }
    GetSkillBoneLocation(t, i, e) {
      var s = t?.Entity?.GetComponent(1);
      s
        ? (t = t?.Entity?.GetComponent(3)?.Actor)?.IsValid() &&
          i &&
          ((t = t.Mesh),
          (i = FNameUtil_1.FNameUtil.GetDynamicFName(i)),
          t?.DoesSocketExist(i))
          ? e.FromUeVector(t.GetSocketTransform(i, 0).GetLocation())
          : e.DeepCopy(s.ActorLocationProxy)
        : e.Reset();
    }
    LockOnSpecifyTarget(t) {
      var i;
      this.M$r ||
        this.c$r ||
        (this.j$r(t) &&
          (((i = new LockOnInfo()).EntityHandle = t),
          this.E$r(i),
          this.SetShowTarget(t)));
    }
    j$r(t) {
      var i;
      return !(
        !t?.Valid ||
        !t?.IsInit ||
        !t?.Entity?.Active ||
        ((i = t.Entity.GetComponent(1)) &&
          i.ActorLocationProxy.ContainsNaN()) ||
        (i = t.Entity.GetComponent(0))?.GetRemoveState() ||
        !i?.GetVisible() ||
        ((i = t.Entity.GetComponent(185)) &&
          i.HasAnyTag([1008164187, -1243968098]))
      );
    }
    J4r(t) {
      this.m$r.FromUeVector(
        Global_1.Global.CharacterCameraManager.K2_GetActorLocation(),
      );
      var i = t.EntityHandle.Entity.GetComponent(1);
      return (
        t.SocketName
          ? this.GetSkillBoneLocation(t.EntityHandle, t.SocketName, this.d$r)
          : (this.d$r.DeepCopy(i.ActorLocationProxy),
            (t =
              t.EntityHandle.Entity.GetComponent(0)?.GetFightInterConfig()
                ?.LockOffset) &&
              ((t = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)),
              this.d$r.Addition(t, this.d$r))),
        this.TraceDetectBlock(this.m$r, this.d$r, i.Owner)
      );
    }
    TraceDetectBlock(t, i, e) {
      return (
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, i),
        !(
          !TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.uoe,
            PROFILE_KEY,
          ) || !this.uoe.HitResult.bBlockingHit
        ) &&
          ((t = this.uoe.HitResult.Actors.Get(0)),
          (i =
            ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(
              t,
            )),
          e !== t) &&
          e !== i
      );
    }
    S$r(t) {
      t && CharacterLockOnComponent_1.R$r.Clear();
      for (
        var i = this.N$r(this._$r, !0);
        i.length && i.every((t) => CharacterLockOnComponent_1.R$r.Has(t));

      )
        CharacterLockOnComponent_1.R$r.Pop();
      t = this.O$r(this.k$r(i, !0), 4, !0, this._$r.ToleranceAngle);
      this.E$r(t),
        t
          ? (CharacterLockOnComponent_1.R$r.Push(t),
            this.SetShowTarget(t.EntityHandle, t.SocketName),
            (this.p$r = 0),
            t?.EntityHandle?.Valid &&
              LockOnDebug_1.LockOnDebug.SetDebugArrow(t))
          : (this.SetShowTarget(void 0), this.ExitLockDirection());
    }
    N$r(i, t) {
      LockOnDebug_1.LockOnDebug.Clear();
      var e = [],
        s = Vector_1.Vector.Create();
      CameraController_1.CameraController.CameraRotator &&
        CameraController_1.CameraController.CameraRotator.Quaternion().RotateVector(
          Vector_1.Vector.ForwardVectorProxy,
          s,
        ),
        (s.Z = 0),
        s.Normalize(MathUtils_1.MathUtils.SmallNumber);
      for (const u of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
        if (this.j$r(u) && u.Id !== this.Entity.Id) {
          var r = u.Entity.GetComponent(0)?.GetEntityType(),
            h = CharacterController_1.CharacterController.GetActor(u);
          if (h?.IsValid()) {
            var o = h,
              h = h instanceof TsBaseCharacter_1.default,
              a = this.W$r(u);
            if (a) {
              if (
                2 !==
                CampUtils_1.CampUtils.GetCampRelationship(
                  o.Camp,
                  this.ActorComp.Actor.Camp,
                )
              )
                continue;
              if (!o || !h) continue;
            } else {
              if (t) continue;
              if (r !== Protocol_1.Aki.Protocol.HBs.Proto_SceneItem) continue;
              o = u.Entity.GetComponent(102)?.LockRange;
              if (!o || -1 === o) continue;
              if (
                o * o <
                Vector_1.Vector.DistSquared(
                  u.Entity.GetComponent(1).ActorLocationProxy,
                  this.ActorComp.ActorLocationProxy,
                )
              )
                continue;
            }
            if (t ? !this.K$r(u) : !this.X$r(u)) {
              h = u.Entity.GetComponent(3);
              if (0 < (h?.LockOnParts?.size ?? 0)) {
                let t = !1;
                var r = h.LockOnParts.values(),
                  n = this.f7o;
                for (const v of r)
                  if (
                    (this.GetSkillBoneLocation(u, v.BoneNameString, n),
                    !(t = this.Q$r(i, u, n)))
                  )
                    break;
                if (t) continue;
              } else if (
                this.Q$r(i, u, u.Entity.GetComponent(1).ActorLocationProxy)
              )
                continue;
              if (a) {
                o = u.Entity.GetComponent(3);
                if (o?.LockOnParts.size) {
                  var _,
                    c = u.Entity.GetComponent(58),
                    C = u.Entity.GetComponent(33);
                  for ([, _] of o.LockOnParts)
                    if (
                      (t ? _.HardLockValid : _.SoftLockValid) &&
                      (!C || !C.IgnoreSocketName.has(_.BoneNameString))
                    ) {
                      if (c && _.EnablePartName) {
                        var l = c.PartMapByBone.get(_.EnablePartName);
                        if (l && !l.Active) continue;
                      }
                      l = new LockOnInfo();
                      (l.EntityHandle = u),
                        (l.SocketName = _.BoneNameString),
                        LockOnDebug_1.LockOnDebug.Push(l),
                        this.J4r(l) || e.push(l);
                    }
                } else {
                  h = new LockOnInfo();
                  (h.EntityHandle = u),
                    LockOnDebug_1.LockOnDebug.Push(h),
                    this.J4r(h) || e.push(h);
                }
              } else {
                r = new LockOnInfo();
                (r.EntityHandle = u),
                  LockOnDebug_1.LockOnDebug.Push(r),
                  this.J4r(r) || e.push(r);
              }
            }
          }
        }
      return e;
    }
    k$r(t, i) {
      var e = t.filter((t) =>
        t.EntityHandle?.Entity?.GetComponent(185)?.HasTag(1659143519),
      );
      return i
        ? e.every((t) => CharacterLockOnComponent_1.R$r.Has(t))
          ? t
          : e
        : e.length
          ? e
          : t;
    }
    K$r(t) {
      return (
        !!t?.Valid &&
        !!(t = t.Entity?.GetComponent(185))?.Valid &&
        (t.HasAnyTag([-1243968098, -620990172]) ||
          this.Xte.HasAnyTag([-620990172, 63495198]))
      );
    }
    X$r(t) {
      return (
        !!t?.Valid &&
        !!(t = t.Entity?.GetComponent(185))?.Valid &&
        (t.HasAnyTag([-1243968098, -1092371289]) ||
          this.Xte.HasAnyTag([-1092371289, 63495198]))
      );
    }
    Q$r(t, i, e) {
      return (
        !this.$$r(t, this.ActorComp.ActorLocationProxy, e) &&
        !this.Y$r(i, e, this.ActorComp.ActorLocationProxy)
      );
    }
    $$r(t, i, e) {
      var s = i.Z - e.Z;
      if (s < -t.UpDistance || s > t.DownDistance) return !1;
      if (Vector_1.Vector.DistSquared(i, e) <= t.Distance * t.Distance)
        return !0;
      s = this.ActorComp.Actor.Controller;
      if (!s) return !1;
      s = ((s.GetControlRotation().Yaw % 360) + 360) % 360;
      if (Vector_1.Vector.DistSquared(i, e) > t.SectorRadius * t.SectorRadius)
        return !1;
      e.Subtraction(i, this.f7o).Normalize(MathUtils_1.MathUtils.SmallNumber);
      (e = (180 * Math.atan2(this.f7o.Y, this.f7o.X)) / Math.PI),
        (i = Math.abs(((360 + e) % 360) - s));
      return (180 < i ? 360 - i : i) <= t.SectorAngle / 2;
    }
    Y$r(t, i, e) {
      var s;
      return (
        !!t.Entity?.GetComponent(185)?.HasAnyTag([-336338240, -164894127]) &&
        !!(t = t.Entity.GetComponent(3))?.LockOnConfig &&
        !(
          (s = i.Z - e.Z) < -t.LockOnConfig.UpDistance ||
          s > t.LockOnConfig.DownDistance ||
          Vector_1.Vector.DistSquared(i, e) >
            t.LockOnConfig.Distance * t.LockOnConfig.Distance
        )
      );
    }
    q$r() {
      var t = this.M$r;
      this.A$r !== t &&
        (CombatMessage_1.CombatNet.Call(
          t ? 20063 : 16772,
          this.Entity,
          (t
            ? Protocol_1.Aki.Protocol.RNn
            : Protocol_1.Aki.Protocol.xNn
          ).create(),
        ),
        (this.A$r = t));
    }
    RefreshCurrentLockState(t) {
      var i;
      this.o$r?.EntityHandle === t &&
        (t = t?.Entity?.GetComponent(3)) &&
        (i = this.o$r?.SocketName) &&
        t.LockOnParts.has(i) &&
        ((t = t.LockOnParts.get(i)).HardLockValid || this.ExitLockDirection(),
        t.SoftLockValid || this.SetShowTarget(void 0));
    }
    get M$r() {
      return this.Xte.HasTag(-1150819426);
    }
    w$r() {
      var t = this.PSo.GetMoveDirectionCache();
      this.U$r.Equals(t, MathUtils_1.MathUtils.SmallNumber) ||
        (this.U$r?.Set(t.X, t.Y),
        this.cVr.DeepCopy(this.ActorComp.InputDirectProxy),
        this.U$r?.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) ||
        (this.P$r = !0);
    }
    ResetTarget() {
      !this.c$r && this.M$r && this.S$r(!1);
    }
    ChangeShowTarget(t, i, e) {
      if (this.c$r || !this.M$r) return !1;
      var s,
        r,
        h,
        o = this.N$r(this._$r, !0),
        a = this.ActorComp.ActorLocationProxy,
        n =
          (this.GetSkillBoneLocation(
            this.o$r.EntityHandle,
            this.o$r.SocketName,
            this.f7o,
          ),
          this.Tz.DeepCopy(a),
          (this.Tz.Z = this.f7o.Z),
          this.f7o.SubtractionEqual(a),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            this.f7o,
            Vector_1.Vector.UpVectorProxy,
            this.Dz,
          ),
          this.Dz.Inverse(this.Dz),
          t.SizeSquared());
      let _ = void 0,
        c = MathUtils_1.MathUtils.LargeNumber;
      for (const C of o)
        !this.j$r(C.EntityHandle) ||
          C.Equal(this.o$r) ||
          (this.GetSkillBoneLocation(C.EntityHandle, C.SocketName, this.f7o),
          this.f7o.SubtractionEqual(this.Tz),
          this.Dz.RotateVector(this.f7o, this.f7o),
          Math.abs(this.f7o.X) < MathUtils_1.MathUtils.SmallNumber &&
            Math.abs(this.f7o.Y) < MathUtils_1.MathUtils.SmallNumber) ||
          ((s =
            Math.atan2(this.f7o.Y, this.f7o.X) *
            MathUtils_1.MathUtils.RadToDeg),
          (r =
            Math.asin(this.f7o.Z / this.f7o.Size()) *
            MathUtils_1.MathUtils.RadToDeg),
          (this.Xyn.X = s),
          (this.Xyn.Y = r),
          (h = this.Xyn.DotProduct(t)) < 0) ||
          ((h =
            (i *
              (Math.acos(h / Math.sqrt(this.Xyn.SizeSquared() * n)) *
                MathUtils_1.MathUtils.RadToDeg)) /
              180 +
            e * Math.sqrt(s * s + r * r)) < c &&
            ((c = h), (_ = C)));
      return (
        !!_ &&
        (this.E$r(_), this.SetShowTarget(_.EntityHandle, _.SocketName), !0)
      );
    }
  });
(CharacterLockOnComponent.R$r = new CustomizedLockedQueue()),
  (CharacterLockOnComponent = CharacterLockOnComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(29)],
      CharacterLockOnComponent,
    )),
  (exports.CharacterLockOnComponent = CharacterLockOnComponent);
//# sourceMappingURL=CharacterLockOnComponent.js.map
