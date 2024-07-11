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
    exports.lockOnEnhancedTags =
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
  FightCameraLogicComponent_1 = require("../../../../../Camera/FightCameraLogicComponent"),
  TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../../Global"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  MenuController_1 = require("../../../../../Module/Menu/MenuController"),
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
  DEFAULT_LOCKON_CONFIG_ID = 0;
exports.lockOnEnhancedTags = [-336338240, -164894127];
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
    this.YYo = [];
  }
  Has(i) {
    return !!i && this.YYo.some((t) => t.Equal(i));
  }
  Push(t) {
    t && !this.Has(t) && this.YYo.push(t);
  }
  Pop() {
    return this.YYo.shift();
  }
  Clear() {
    this.YYo.length = 0;
  }
}
let CharacterLockOnComponent =
  (CharacterLockOnComponent_1 = class CharacterLockOnComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.kma = void 0),
        (this.Gma = void 0),
        (this.Nma = void 0),
        (this.Fma = void 0),
        (this.Vma = void 0),
        (this.$ma = void 0),
        (this.Hma = void 0),
        (this.jma = void 0),
        (this.Wma = void 0),
        (this.Qma = void 0),
        (this.Kma = void 0),
        (this.Xma = void 0),
        (this.lpa = void 0),
        (this._pa = void 0),
        (this.upa = void 0),
        (this.cpa = void 0),
        (this.ActorComp = void 0),
        (this.GXr = void 0),
        (this.NXr = void 0),
        (this.OXr = ""),
        (this.kXr = void 0),
        (this.FXr = void 0),
        (this.VXr = 0),
        (this.Xte = void 0),
        (this.HBr = void 0),
        (this.RSo = void 0),
        (this.HXr = void 0),
        (this.jXr = void 0),
        (this.WXr = void 0),
        (this.KXr = !1),
        (this.dHo = Vector_1.Vector.Create()),
        (this.Tz = Vector_1.Vector.Create()),
        (this.Dz = Quat_1.Quat.Create()),
        (this.CTn = Vector2D_1.Vector2D.Create()),
        (this.QXr = Vector_1.Vector.Create()),
        (this.XXr = Vector_1.Vector.Create()),
        (this.$Xr = 0),
        (this.YXr = 0),
        (this.JXr = !1),
        (this.zXr = 0),
        (this.uoe = void 0),
        (this.ZXr = (t) => {
          this.GXr?.EntityHandle?.Id === t && this.AUn();
        }),
        (this.zpe = (t, i) => {
          this.GXr?.EntityHandle === i && this.AUn();
        }),
        (this.BSa = new Set()),
        (this.I3r = (t) => {
          t = t.GetComponent(29);
          (this.KXr = t.KXr),
            this.i$r(t.GXr),
            (this.kXr = t.kXr),
            this.SetShowTarget(t.ShowTarget, t.ShowTargetSocket);
        }),
        (this.a$r = (t, i) => {
          var e;
          i
            ? this.e$r && (this.FXr = this.GXr)
            : ((i = this.FXr?.EntityHandle?.Entity),
              this.FXr &&
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
                (this.e$r
                  ? (this.i$r(this.FXr),
                    this.SetShowTarget(
                      this.GXr.EntityHandle,
                      this.GXr.SocketName,
                    ),
                    CharacterLockOnComponent_1.h$r.Push(this.GXr))
                  : this.EnterLockDirection(),
                (this.FXr = void 0)));
        }),
        (this.l$r = !1),
        (this.W5r = Vector_1.Vector.Create()),
        (this._$r = Vector_1.Vector.Create()),
        (this.u$r = !1),
        (this.cca = void 0);
    }
    i$r(t) {
      var i = this.GXr;
      (this.GXr = t),
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
      return this.GXr?.EntityHandle;
    }
    GetCurrentTargetSocketName() {
      return this.GXr?.SocketName ?? "";
    }
    GetTargetInfo() {
      return (
        (this.WXr.ShowTarget = this.ShowTarget),
        (this.WXr.SocketName = this.ShowTargetSocket),
        (this.WXr.LastSetTime = this.VXr),
        this.WXr
      );
    }
    get ShowTarget() {
      return this.NXr;
    }
    get ShowTargetSocket() {
      return this.OXr;
    }
    SetShowTarget(t, i = "") {
      this.VXr = Time_1.Time.WorldTime;
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
            (this.NXr = void 0),
            (this.OXr = ""),
            GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(
              void 0,
            ),
            !1
          );
        (this.NXr = t),
          (this.OXr = i),
          e &&
            GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(
              e.Actor,
            );
      }
      return !0;
    }
    c$r(t, i = "") {
      var e, s;
      return (
        !this.e$r &&
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
      return [160];
    }
    AUn() {
      this.KXr
        ? this.ForceLookAtTarget(void 0, !1, !0)
        : this.e$r
          ? this.t$r(!0)
          : (this.i$r(void 0), this.SetShowTarget(void 0));
    }
    Jma(t) {
      return (
        this.BSa.clear(),
        CharacterLockOnComponent_1.EnhancedEntityIds.forEach((t) => {
          var i = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t);
          i
            ? this.BSa.add(i)
            : CharacterLockOnComponent_1.EnhancedEntityIds.delete(t);
        }),
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
          this.ActorComp.ActorLocationProxy,
          t,
          3,
          this.BSa,
          !1,
        ),
        this.BSa
      );
    }
    OnInitData() {
      return (this.WXr = new ShowTargetInfo()), !0;
    }
    OnStart() {
      this.ActorComp = this.Entity.CheckGetComponent(3);
      var t = this.Entity.GetComponent(0);
      return (
        this.SetLockOnConfig(
          t.GetRoleConfig().LockOnDefaultId,
          t.GetRoleConfig().LockOnLookOnId,
        ),
        (this.Xte = this.Entity.CheckGetComponent(188)),
        (this.HBr = this.Entity.CheckGetComponent(160)),
        (this.RSo = this.Entity.CheckGetComponent(53)),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.ZXr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.I3r,
        ),
        this.Xte.ListenForTagAddOrRemove(483118073, this.a$r),
        this.koe(),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.ZXr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.I3r,
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
        this.JXr &&
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
        (this.HXr =
          ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(t)),
        0 !== i &&
          (this.jXr =
            ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(i));
    }
    OnTick(t) {
      this.m$r(),
        this.Kea(),
        this.Ii(t),
        this.C$r(t),
        this.g$r(),
        LockOnDebug_1.LockOnDebug.Tick(this.Entity);
    }
    Ii(t) {
      this.I$r(this.GXr?.EntityHandle)
        ? (this.e$r || this.KXr) &&
          ((this.YXr += t),
          this.YXr < DELAY_TIME ||
            ((this.YXr = 0),
            (t = Global_1.Global.CharacterCameraManager.K2_GetActorLocation()),
            this.A4r(this.GXr, t)
              ? (this.$Xr++,
                this.$Xr >= CHECK_COUNT && (this.$ea(), (this.$Xr = 0)))
              : (this.$Xr = 0)))
        : this.$ea();
    }
    $ea() {
      this.i$r(void 0),
        this.SetShowTarget(void 0),
        this.ExitLockDirection(),
        this.ForceLookAtTarget(void 0, !1);
    }
    C$r(t) {
      this.e$r &&
        ((this.zXr += t),
        this.zXr < RESET_TARGETS_ISLOCK_TIME ||
          ((this.zXr = 0),
          CharacterLockOnComponent_1.h$r.Clear(),
          CharacterLockOnComponent_1.h$r.Push(this.GXr)));
    }
    DetectSoftLockTarget(i = DEFAULT_LOCKON_CONFIG_ID, e = 0, s = 4, r = !1) {
      if (!this.e$r && !this.KXr)
        if (0 !== e) this.GXr || this.DetectSoftLockTarget();
        else {
          let t = this.HXr;
          DEFAULT_LOCKON_CONFIG_ID !== i &&
            (t = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(i));
          (e = this.DetectAlternativeTargets(t, !1)),
            (i = this.FindTheBest(this.M$r(e, !1), s, !1, t.ToleranceAngle));
          this.i$r(i),
            i?.EntityHandle?.Valid &&
              LockOnDebug_1.LockOnDebug.SetDebugArrow(i),
            r &&
              this.c$r(
                this.GetCurrentTarget(),
                this.GetCurrentTargetSocketName(),
              );
        }
    }
    FindTheBest(t, i, e, s) {
      if (8 === i)
        switch (MenuController_1.MenuController.GetTargetConfig(133)) {
          case 0:
            i = 0;
            break;
          case 1:
            i = 4;
            break;
          case 2:
            i = 3;
        }
      let r = void 0,
        h = !1;
      switch (i) {
        case 0:
        case 5:
          (h = !this.u$r),
            (this.u$r = !1),
            (r = this.W5r.IsNearlyZero() ? this.E$r() : this.W5r);
          break;
        case 1:
        case 7:
          r = this.ActorComp.ActorForwardProxy;
          break;
        case 2:
          (r = this.E$r()), (h = !0);
          break;
        case 3:
          break;
        case 4:
        case 6:
          r = this.E$r();
      }
      var o = [5, 7, 6].includes(i),
        a =
          CommonParamById_1.configCommonParamById.GetIntConfig("LockOnOffset");
      let n = void 0,
        _ = Number.MAX_VALUE,
        c = void 0,
        C = Number.MAX_VALUE;
      for (const v of t) {
        switch (this.S$r(v, e, h)) {
          case 0:
            continue;
          case 1:
            break;
          case 2:
            return (
              LockOnDebug_1.LockOnDebug.SetDebugString(v, 0, 0, this.W5r, r), v
            );
        }
        this.zma(v.EntityHandle, v.SocketName, this.dHo);
        var l = this.ActorComp.ActorLocationProxy,
          u = Vector_1.Vector.Dist(l, this.dHo);
        let t = 0;
        r &&
          (this.Tz.DeepCopy(r),
          this.Tz.Normalize(),
          this.Tz.Multiply(o ? 0 : a, this.Tz),
          l.Subtraction(this.Tz, this.Tz),
          this.dHo.Subtraction(this.Tz, this.dHo),
          (t = this.y$r(r, this.dHo))),
          t < s
            ? (!n || u < _) && ((n = v), (_ = u))
            : o || ((!c || u < C) && ((c = v), (C = u))),
          LockOnDebug_1.LockOnDebug.SetDebugString(v, t, u, this.W5r, r);
      }
      return n || c;
    }
    S$r(t, i, e) {
      return i && CharacterLockOnComponent_1.h$r.Has(t)
        ? 0
        : e && this.I$r(this.GXr?.EntityHandle) && this.GXr?.Equal(t)
          ? 2
          : 1;
    }
    E$r() {
      var t = Vector_1.Vector.Create();
      return (
        CameraController_1.CameraController.CameraRotator.Quaternion().RotateVector(
          Vector_1.Vector.ForwardVectorProxy,
          t,
        ),
        t
      );
    }
    y$r(t, i, e = !1) {
      return (
        Math.acos(
          e
            ? t.DotProduct(i) / Math.sqrt(t.SizeSquared() * i.SizeSquared())
            : t.CosineAngle2D(i),
        ) * MathUtils_1.MathUtils.RadToDeg
      );
    }
    ForceLookAtTarget(t, i, e = !1) {
      var s = this.KXr;
      if (i) {
        if (
          ((this.KXr = !0),
          this.e$r &&
            (this.KXr || (this.kXr = this.GXr), !t?.Different(this.GXr)))
        )
          return;
        this.HBr.SetDirectionState(
          CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection,
        ),
          this.i$r(t),
          this.SetShowTarget(t?.EntityHandle, t?.SocketName);
      } else
        this.KXr &&
          !t?.Different(this.GXr) &&
          (this.I$r(this.kXr?.EntityHandle) && e
            ? (this.i$r(this.kXr),
              this.SetShowTarget(this.kXr.EntityHandle, this.kXr.SocketName),
              CharacterLockOnComponent_1.h$r.Push(this.kXr),
              this.HBr.SetDirectionState(
                CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection,
              ))
            : (this.e$r && this.I$r(this.GXr?.EntityHandle)) ||
              (this.i$r(void 0),
              this.SetShowTarget(void 0),
              this.HBr.SetDirectionState(
                CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
              )),
          (this.KXr = !1),
          (this.kXr = void 0));
      s !== this.KXr &&
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
      if (this.KXr)
        (this.kXr = void 0), CharacterLockOnComponent_1.h$r.Push(this.GXr);
      else {
        if (this.e$r) return;
        if (this.Xte.HasTag(428837378)) return;
        if (this.Xte.HasTag(2066208190)) return;
        if (
          CameraController_1.CameraController.FightCamera.LogicComponent
            .IsDisableResetFocus
        )
          return;
        if ((this.t$r(!0), !this.GXr)) return void this.ResetFocus();
        this.$Xr = 0;
      }
      this.HBr.SetDirectionState(
        CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection,
      );
    }
    ExitLockDirection() {
      this.e$r &&
        (this.KXr
          ? (this.HBr.SetDirectionState(
              CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection,
            ),
            (this.kXr = void 0))
          : (this.SetShowTarget(void 0),
            CharacterLockOnComponent_1.h$r.Clear(),
            this.HBr.SetDirectionState(
              CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
            )));
    }
    ResetFocus() {
      CameraController_1.CameraController.FightCamera.LogicComponent
        .IsDisableResetFocus ||
        !ModelManager_1.ModelManager.CameraModel.IsEnableResetFocus ||
        this.KXr ||
        this.e$r ||
        (CameraController_1.CameraController.FightCamera.LogicComponent.ResetCameraInput(),
        CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(
          CameraUtility_1.CameraUtility.GetCameraDefaultFocusRotator(),
          RESET_FOCUS_TIME,
        ));
    }
    ResetPitch(t = RESET_FOCUS_TIME, i = void 0) {
      var e =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "InitialCameraPitch",
          ),
        s =
          CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.ToUeRotator().Euler(),
        e = Rotator_1.Rotator.Create(e, s.Z, s.X);
      CameraController_1.CameraController.FightCamera.LogicComponent.ResetCameraInput(),
        CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(
          e,
          t,
          i,
        );
    }
    T$r(t) {
      return (
        !!t?.Valid &&
        ((t = t.Entity.GetComponent(0).GetEntityType()),
        !![
          Protocol_1.Aki.Protocol.wks.Proto_Monster,
          Protocol_1.Aki.Protocol.wks.Proto_Npc,
          Protocol_1.Aki.Protocol.wks.Proto_Player,
          Protocol_1.Aki.Protocol.wks.Proto_Vision,
        ].includes(t))
      );
    }
    Kea() {
      var t;
      this.KXr ||
        (this.Xte.HasTag(2066208190)
          ? this.$ea()
          : this.GXr?.EntityHandle?.Valid &&
            (this.e$r
              ? ((t = this.dHo),
                this.zma(this.GXr.EntityHandle, this.GXr.SocketName, t),
                (this.L$r(this.GXr.EntityHandle) ||
                  this.D$r(this.jXr, this.GXr.EntityHandle, t)) &&
                  this.ExitLockDirection())
              : (this.R$r(this.GXr.EntityHandle) ||
                  this.D$r(
                    this.jXr,
                    this.GXr.EntityHandle,
                    this.GXr.EntityHandle.Entity.GetComponent(1)
                      .ActorLocationProxy,
                  )) &&
                (this.i$r(void 0), this.SetShowTarget(void 0))));
    }
    zma(t, i, e) {
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
      this.e$r ||
        this.KXr ||
        (this.I$r(t) &&
          (((i = new LockOnInfo()).EntityHandle = t),
          this.i$r(i),
          this.SetShowTarget(t)));
    }
    I$r(t) {
      var i;
      return (
        !!t?.Valid &&
        !(
          !t?.IsInit ||
          !t?.Entity?.Active ||
          (i = t.Entity.GetComponent(0))?.GetRemoveState() ||
          !i?.GetVisible() ||
          ((i = t.Entity.GetComponent(188)) &&
            i.HasAnyTag([1008164187, -1243968098]))
        )
      );
    }
    A4r(t, i) {
      this.QXr.FromUeVector(i);
      (i = t.EntityHandle.Entity.GetComponent(1)),
        t.SocketName
          ? this.zma(t.EntityHandle, t.SocketName, this.XXr)
          : (this.XXr.DeepCopy(i.ActorLocationProxy),
            (t =
              t.EntityHandle.Entity.GetComponent(0)?.GetFightInterConfig()
                ?.LockOffset) &&
              ((t = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)),
              this.XXr.Addition(t, this.XXr))),
        (t = this.TraceDetectBlock(this.QXr, this.XXr, i.Owner));
      return t;
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
    t$r(t) {
      t && CharacterLockOnComponent_1.h$r.Clear();
      for (
        var i = this.DetectAlternativeTargets(this.jXr, !0);
        i.length && i.every((t) => CharacterLockOnComponent_1.h$r.Has(t));

      )
        CharacterLockOnComponent_1.h$r.Pop();
      t = this.FindTheBest(this.M$r(i, !0), 4, !0, this.jXr.ToleranceAngle);
      this.i$r(t),
        t
          ? (CharacterLockOnComponent_1.h$r.Push(t),
            this.SetShowTarget(t.EntityHandle, t.SocketName),
            (this.zXr = 0),
            t?.EntityHandle?.Valid &&
              LockOnDebug_1.LockOnDebug.SetDebugArrow(t))
          : (this.SetShowTarget(void 0), this.ExitLockDirection());
    }
    DetectAlternativeTargets(i, t) {
      LockOnDebug_1.LockOnDebug.Clear();
      var e = [],
        s = Global_1.Global.CharacterCameraManager.K2_GetActorLocation();
      for (const u of this.Jma(Math.max(i.Distance, i.SectorRadius)))
        if (this.I$r(u) && u.Id !== this.Entity.Id) {
          var r = u.Entity.GetComponent(0)?.GetEntityType(),
            h = CharacterController_1.CharacterController.GetActor(u);
          if (h?.IsValid()) {
            var o,
              a = h,
              h = h instanceof TsBaseCharacter_1.default;
            if ((o = this.T$r(u))) {
              if (
                2 !==
                CampUtils_1.CampUtils.GetCampRelationship(
                  a.Camp,
                  this.ActorComp.Actor.Camp,
                )
              )
                continue;
              if (!a || !h) continue;
            } else {
              if (t) continue;
              if (r !== Protocol_1.Aki.Protocol.wks.Proto_SceneItem) continue;
              a = u.Entity.GetComponent(104)?.LockRange;
              if (!a || a <= 0) continue;
              h = u.Entity.GetComponent(1);
              if (
                a <
                Vector_1.Vector.Dist2D(
                  h.ActorLocationProxy,
                  this.ActorComp.ActorLocationProxy,
                )
              )
                continue;
            }
            if (t ? !this.L$r(u) : !this.R$r(u)) {
              r = u.Entity.GetComponent(3);
              if (0 < (r?.LockOnParts?.size ?? 0)) {
                let t = !1;
                var a = r.LockOnParts.values(),
                  n = this.dHo;
                for (const v of a)
                  if (
                    (this.zma(u, v.BoneNameString, n), !(t = this.D$r(i, u, n)))
                  )
                    break;
                if (t) continue;
              } else if (
                this.D$r(i, u, u.Entity.GetComponent(1).ActorLocationProxy)
              )
                continue;
              if (o) {
                h = u.Entity.GetComponent(3);
                if (h?.LockOnParts.size) {
                  var _,
                    c = u.Entity.GetComponent(60),
                    C = u.Entity.GetComponent(33);
                  for ([, _] of h.LockOnParts)
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
                        this.A4r(l, s) || e.push(l);
                    }
                } else {
                  r = new LockOnInfo();
                  (r.EntityHandle = u),
                    LockOnDebug_1.LockOnDebug.Push(r),
                    this.A4r(r, s) || e.push(r);
                }
              } else {
                a = new LockOnInfo();
                (a.EntityHandle = u),
                  LockOnDebug_1.LockOnDebug.Push(a),
                  this.A4r(a, s) || e.push(a);
              }
            }
          }
        }
      return e;
    }
    M$r(t, i) {
      var e = t.filter((t) =>
        t.EntityHandle?.Entity?.GetComponent(188)?.HasTag(1659143519),
      );
      return i
        ? e.every((t) => CharacterLockOnComponent_1.h$r.Has(t))
          ? t
          : e
        : e.length
          ? e
          : t;
    }
    L$r(t) {
      return (
        !!t?.Valid &&
        !!(t = t.Entity?.GetComponent(188))?.Valid &&
        (t.HasAnyTag([-1243968098, -620990172]) ||
          this.Xte.HasAnyTag([-620990172, 63495198]))
      );
    }
    R$r(t) {
      return (
        !!t?.Valid &&
        !!(t = t.Entity?.GetComponent(188))?.Valid &&
        (t.HasAnyTag([-1243968098, -1092371289]) ||
          this.Xte.HasAnyTag([-1092371289, 63495198]))
      );
    }
    D$r(t, i, e) {
      return (
        !this.U$r(t, this.ActorComp.ActorLocationProxy, e) &&
        !this.A$r(i, e, this.ActorComp.ActorLocationProxy)
      );
    }
    U$r(t, i, e) {
      var s = i.Z - e.Z;
      if (s < -t.UpDistance || s > t.DownDistance) return !1;
      if (Vector_1.Vector.DistSquared(i, e) <= t.Distance * t.Distance)
        return !0;
      s = this.ActorComp.Actor.Controller;
      if (!s) return !1;
      s = ((s.GetControlRotation().Yaw % 360) + 360) % 360;
      if (Vector_1.Vector.DistSquared(i, e) > t.SectorRadius * t.SectorRadius)
        return !1;
      e.Subtraction(i, this.dHo).Normalize(MathUtils_1.MathUtils.SmallNumber);
      (e = (180 * Math.atan2(this.dHo.Y, this.dHo.X)) / Math.PI),
        (i = Math.abs(((360 + e) % 360) - s));
      return (180 < i ? 360 - i : i) <= t.SectorAngle / 2;
    }
    A$r(t, i, e) {
      var s;
      return (
        !!t.Entity?.GetComponent(188)?.HasAnyTag(exports.lockOnEnhancedTags) &&
        !!(t = t.Entity.GetComponent(3))?.LockOnConfig &&
        !(
          (s = i.Z - e.Z) < -t.LockOnConfig.UpDistance ||
          s > t.LockOnConfig.DownDistance ||
          Vector_1.Vector.DistSquared(i, e) >
            t.LockOnConfig.Distance * t.LockOnConfig.Distance
        )
      );
    }
    g$r() {
      var t = this.e$r;
      this.l$r !== t &&
        (CombatMessage_1.CombatNet.Call(
          t ? 9149 : 19890,
          this.Entity,
          (t
            ? Protocol_1.Aki.Protocol.n4n
            : Protocol_1.Aki.Protocol.s4n
          ).create(),
        ),
        (this.l$r = t));
    }
    RefreshCurrentLockState(t) {
      var i;
      this.GXr?.EntityHandle === t &&
        (t = t?.Entity?.GetComponent(3)) &&
        (i = this.GXr?.SocketName) &&
        t.LockOnParts.has(i) &&
        ((t = t.LockOnParts.get(i)).HardLockValid || this.ExitLockDirection(),
        t.SoftLockValid || this.SetShowTarget(void 0));
    }
    get e$r() {
      return this.Xte.HasTag(-1150819426);
    }
    m$r() {
      var t = this.RSo.GetMoveDirectionCache(),
        [i] = this.RSo.GetCameraInput();
      (0 === i && this._$r.Equals(t, MathUtils_1.MathUtils.SmallNumber)) ||
        (this._$r.Set(t.X, t.Y, 0),
        this.W5r.DeepCopy(this.ActorComp.InputDirectProxy),
        this._$r?.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) ||
        (this.u$r = !0),
        this.SpeedUpCleanTarget() && (this.u$r = !0);
    }
    SpeedUpCleanTarget() {
      var t = this.Entity.GetComponent(163);
      return !(
        !(
          t?.Valid &&
          t.Speed > FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD
        ) || this.Xte.HasTag(-1371021686)
      );
    }
    ResetTarget() {
      !this.KXr && this.e$r && this.t$r(!1);
    }
    ChangeShowTarget(t, i, e) {
      if (this.KXr || !this.e$r) return !1;
      var s,
        r,
        h,
        o = this.DetectAlternativeTargets(this.jXr, !0),
        a = this.ActorComp.ActorLocationProxy,
        n =
          (this.zma(this.GXr.EntityHandle, this.GXr.SocketName, this.dHo),
          this.Tz.DeepCopy(a),
          (this.Tz.Z = this.dHo.Z),
          this.dHo.SubtractionEqual(a),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            this.dHo,
            Vector_1.Vector.UpVectorProxy,
            this.Dz,
          ),
          this.Dz.Inverse(this.Dz),
          t.SizeSquared());
      let _ = void 0,
        c = MathUtils_1.MathUtils.LargeNumber;
      for (const C of o)
        !this.I$r(C.EntityHandle) ||
          C.Equal(this.GXr) ||
          (this.zma(C.EntityHandle, C.SocketName, this.dHo),
          this.dHo.SubtractionEqual(this.Tz),
          this.Dz.RotateVector(this.dHo, this.dHo),
          Math.abs(this.dHo.X) < MathUtils_1.MathUtils.SmallNumber &&
            Math.abs(this.dHo.Y) < MathUtils_1.MathUtils.SmallNumber) ||
          ((s =
            Math.atan2(this.dHo.Y, this.dHo.X) *
            MathUtils_1.MathUtils.RadToDeg),
          (r =
            Math.asin(this.dHo.Z / this.dHo.Size()) *
            MathUtils_1.MathUtils.RadToDeg),
          (this.CTn.X = s),
          (this.CTn.Y = r),
          (h = this.CTn.DotProduct(t)) < 0) ||
          ((h =
            (i *
              (Math.acos(h / Math.sqrt(this.CTn.SizeSquared() * n)) *
                MathUtils_1.MathUtils.RadToDeg)) /
              180 +
            e * Math.sqrt(s * s + r * r)) < c &&
            ((c = h), (_ = C)));
      return (
        !!_ &&
        (this.i$r(_), this.SetShowTarget(_.EntityHandle, _.SocketName), !0)
      );
    }
    GetPredictedLockOnTarget() {
      if (this.Xte?.HasTag(-126337119)) return this.cca;
    }
    SetPredictedLockOnTarget(t) {
      this.cca = t;
    }
  });
(CharacterLockOnComponent.h$r = new CustomizedLockedQueue()),
  (CharacterLockOnComponent.EnhancedEntityIds = new Set()),
  (CharacterLockOnComponent = CharacterLockOnComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(29)],
      CharacterLockOnComponent,
    )),
  (exports.CharacterLockOnComponent = CharacterLockOnComponent);
//# sourceMappingURL=CharacterLockOnComponent.js.map
