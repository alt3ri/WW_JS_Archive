"use strict";
var CharacterLockOnComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        r = arguments.length,
        o =
          r < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, i, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (h = t[a]) &&
            (o = (r < 3 ? h(o) : 3 < r ? h(e, i, o) : h(e, i)) || o);
      return 3 < r && o && Object.defineProperty(e, i, o), o;
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
  GameSettingsManager_1 = require("../../../../../GameSettings/GameSettingsManager"),
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
  Has(e) {
    return !!e && this.YYo.some((t) => t.Equal(e));
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
        (this.Kfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.DetectAlternativeTargets",
        )),
        (this.Xfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.DetectAlternativeTargets.CheckBase",
        )),
        (this.Yfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.DetectAlternativeTargets.CheckDistance",
        )),
        (this.Jfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.DetectAlternativeTargets.FinalSetting",
        )),
        (this.zfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.CannotBeDetected",
        )),
        (this.Zfa = Stats_1.Stat.Create("CharacterLockOnComponent.IsBlock")),
        (this.eva = Stats_1.Stat.Create(
          "CharacterLockOnComponent.IsBlock.RayEndLocation",
        )),
        (this.tva = Stats_1.Stat.Create(
          "CharacterLockOnComponent.IsBlock.TraceDetectBlock",
        )),
        (this.iva = Stats_1.Stat.Create(
          "CharacterLockOnComponent.FindTheBest",
        )),
        (this.rva = Stats_1.Stat.Create(
          "CharacterLockOnComponent.FindTheBest.Direction",
        )),
        (this.ova = Stats_1.Stat.Create(
          "CharacterLockOnComponent.FindTheBest.Calculation",
        )),
        (this.nva = Stats_1.Stat.Create(
          "CharacterLockOnComponent.GetSkillBoneLocation",
        )),
        (this.USa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.StatTickMoveDir",
        )),
        (this.xSa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.StatTickCurrentInfo",
        )),
        (this.PSa = Stats_1.Stat.Create("CharacterLockOnComponent.StatCheck")),
        (this.wSa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.StatLockOnDebugTick",
        )),
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
        (this.zpe = (t, e) => {
          this.GXr?.EntityHandle === e && this.AUn();
        }),
        (this.zIa = new Set()),
        (this.I3r = (t) => {
          t = t.GetComponent(29);
          (this.KXr = t.KXr),
            this.i$r(t.GXr),
            (this.kXr = t.kXr),
            this.SetShowTarget(t.ShowTarget, t.ShowTargetSocket);
        }),
        (this.a$r = (t, e) => {
          var i;
          e
            ? this.e$r && (this.FXr = this.GXr)
            : ((e = this.FXr?.EntityHandle?.Entity),
              this.FXr &&
                e?.Valid &&
                (e = e.GetComponent(3))?.Valid &&
                (i =
                  ModelManager_1.ModelManager?.CameraModel?.FightCamera
                    ?.LogicComponent)?.CheckPositionInScreen(
                  e.ActorLocationProxy,
                  i.CameraAdjustController.CheckInScreenMinX,
                  i.CameraAdjustController.CheckInScreenMaxX,
                  i.CameraAdjustController.CheckInScreenMinY,
                  i.CameraAdjustController.CheckInScreenMaxY,
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
        (this.dCa = void 0);
    }
    i$r(t) {
      var e = this.GXr;
      (this.GXr = t),
        (e?.EntityHandle === t?.EntityHandle &&
          e?.SocketName === t?.SocketName) ||
          (e &&
            e.EntityHandle &&
            EventSystem_1.EventSystem.HasWithTarget(
              e.EntityHandle,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              e.EntityHandle,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            ),
          this.GXr &&
            this.GXr.EntityHandle &&
            !EventSystem_1.EventSystem.HasWithTarget(
              this.GXr.EntityHandle,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            ) &&
            EventSystem_1.EventSystem.AddWithTarget(
              this.GXr.EntityHandle,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            ),
          Log_1.Log.CheckDebug() &&
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
    SetShowTarget(t, e = "") {
      this.VXr = Time_1.Time.WorldTime;
      var i = t?.Entity?.GetComponent(3);
      if (this.ShowTarget !== t || this.ShowTargetSocket !== e) {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              29,
              "CharacterLockOnComponent.SetShowTarget",
              ["Me", this.Entity.Id],
              ["Target", t?.Id],
              ["TargetSocket", e],
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
          (this.OXr = e),
          i &&
            GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(
              i.Actor,
            );
      }
      return !0;
    }
    c$r(t, e = "") {
      var i, s;
      return (
        !this.e$r &&
        !this.Xte.HasTag(2066208190) &&
        (t?.Valid && t.Entity.Active
          ? (i = t.Entity.GetComponent(3))
            ? e
              ? !!(s = i.LockOnParts.get(e)) &&
                !!s.SoftLockValid &&
                this.SetShowTarget(t, e)
              : !i.LockOnParts.size && this.SetShowTarget(t, e)
            : this.SetShowTarget(t, e)
          : this.SetShowTarget(void 0))
      );
    }
    static get Dependencies() {
      return [161];
    }
    AUn() {
      this.KXr
        ? this.ForceLookAtTarget(void 0, !1, !0)
        : this.e$r
          ? this.t$r(!0)
          : (this.i$r(void 0), this.SetShowTarget(void 0));
    }
    ava(t) {
      return (
        this.zIa.clear(),
        CharacterLockOnComponent_1.EnhancedEntityIds.forEach((t) => {
          var e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t);
          e
            ? this.zIa.add(e)
            : CharacterLockOnComponent_1.EnhancedEntityIds.delete(t);
        }),
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
          this.ActorComp.ActorLocationProxy,
          t,
          63,
          this.zIa,
          !1,
        ),
        this.zIa
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
        (this.Xte = this.Entity.CheckGetComponent(190)),
        (this.HBr = this.Entity.CheckGetComponent(161)),
        (this.RSo = this.Entity.CheckGetComponent(54)),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.ZXr,
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
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.I3r,
        ),
        this.i$r(void 0),
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
    SetLockOnConfig(t, e) {
      0 !== t &&
        (this.HXr =
          ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(t)),
        0 !== e &&
          (this.jXr =
            ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(e));
    }
    OnTick(t) {
      this.USa.Start(),
        this.m$r(),
        this.USa.Stop(),
        this.xSa.Start(),
        this.sra(),
        this.xSa.Stop(),
        this.PSa.Start(),
        this.Ii(t),
        this.PSa.Stop(),
        this.C$r(t),
        this.g$r(),
        this.wSa.Start(),
        LockOnDebug_1.LockOnDebug.Tick(this.Entity),
        this.wSa.Stop();
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
                this.$Xr >= CHECK_COUNT && (this.ara(), (this.$Xr = 0)))
              : (this.$Xr = 0)))
        : this.ara();
    }
    ara() {
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
    DetectSoftLockTarget(e = DEFAULT_LOCKON_CONFIG_ID, i = 0, s = 4, h = !1) {
      if (!this.e$r && !this.KXr)
        if (0 !== i) this.GXr || this.DetectSoftLockTarget();
        else {
          let t = this.HXr;
          DEFAULT_LOCKON_CONFIG_ID !== e &&
            (t = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(e));
          (i = this.DetectAlternativeTargets(t, !1)),
            (e = this.FindTheBest(this.M$r(i, !1), s, !1, t.ToleranceAngle));
          this.i$r(e),
            e?.EntityHandle?.Valid &&
              LockOnDebug_1.LockOnDebug.SetDebugArrow(e),
            h &&
              this.c$r(
                this.GetCurrentTarget(),
                this.GetCurrentTargetSocketName(),
              );
        }
    }
    FindTheBest(t, e, i, s) {
      if ((this.iva.Start(), this.rva.Start(), 8 === e))
        switch (
          GameSettingsManager_1.GameSettingsManager.GetCurrentValue(133)
        ) {
          case 0:
            e = 0;
            break;
          case 1:
            e = 4;
            break;
          case 2:
            e = 3;
        }
      let h = void 0,
        r = !1;
      switch (e) {
        case 0:
        case 5:
          (r = !this.u$r),
            (this.u$r = !1),
            (h = this.W5r.IsNearlyZero() ? this.E$r() : this.W5r);
          break;
        case 1:
        case 7:
          h = this.ActorComp.ActorForwardProxy;
          break;
        case 2:
          (h = this.E$r()), (r = !0);
          break;
        case 3:
          break;
        case 4:
        case 6:
          h = this.E$r();
      }
      this.rva.Stop();
      var o = [5, 7, 6].includes(e),
        a =
          CommonParamById_1.configCommonParamById.GetIntConfig("LockOnOffset");
      let n = void 0,
        c = Number.MAX_VALUE,
        _ = void 0,
        C = Number.MAX_VALUE;
      for (const u of t) {
        switch ((this.ova.Start(), this.S$r(u, i, r))) {
          case 0:
            this.ova.Stop();
            continue;
          case 1:
            break;
          case 2:
            return (
              LockOnDebug_1.LockOnDebug.SetDebugString(u, 0, 0, this.W5r, h),
              this.ova.Stop(),
              this.iva.Stop(),
              u
            );
        }
        this.hva(u.EntityHandle, u.SocketName, this.dHo);
        var l = this.ActorComp.ActorLocationProxy,
          m = Vector_1.Vector.Dist(l, this.dHo);
        let t = 0;
        h &&
          (this.Tz.DeepCopy(h),
          this.Tz.Normalize(),
          this.Tz.Multiply(o ? 0 : a, this.Tz),
          l.Subtraction(this.Tz, this.Tz),
          this.dHo.Subtraction(this.Tz, this.dHo),
          (t = this.y$r(h, this.dHo))),
          t < s
            ? (!n || m < c) && ((n = u), (c = m))
            : o || ((!_ || m < C) && ((_ = u), (C = m))),
          LockOnDebug_1.LockOnDebug.SetDebugString(u, t, m, this.W5r, h),
          this.ova.Stop();
      }
      return this.iva.Stop(), n || _;
    }
    S$r(t, e, i) {
      return e && CharacterLockOnComponent_1.h$r.Has(t)
        ? 0
        : i && this.I$r(this.GXr?.EntityHandle) && this.GXr?.Equal(t)
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
    y$r(t, e, i = !1) {
      return (
        Math.acos(
          i
            ? t.DotProduct(e) / Math.sqrt(t.SizeSquared() * e.SizeSquared())
            : t.CosineAngle2D(e),
        ) * MathUtils_1.MathUtils.RadToDeg
      );
    }
    ForceLookAtTarget(t, e, i = !1) {
      var s = this.KXr;
      if (e) {
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
          (this.I$r(this.kXr?.EntityHandle) && i
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
          ["isLookAt", e],
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
    ResetPitch(t = RESET_FOCUS_TIME, e = void 0) {
      var i =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "InitialCameraPitch",
          ),
        s =
          CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.ToUeRotator().Euler(),
        i = Rotator_1.Rotator.Create(i, s.Z, s.X);
      CameraController_1.CameraController.FightCamera.LogicComponent.ResetCameraInput(),
        CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(
          i,
          t,
          e,
        );
    }
    T$r(t) {
      return (
        !!t?.Valid &&
        ((t = t.Entity.GetComponent(0).GetEntityType()),
        !![
          Protocol_1.Aki.Protocol.kks.Proto_Monster,
          Protocol_1.Aki.Protocol.kks.Proto_Npc,
          Protocol_1.Aki.Protocol.kks.Proto_Player,
          Protocol_1.Aki.Protocol.kks.Proto_Vision,
        ].includes(t))
      );
    }
    sra() {
      var t;
      this.KXr ||
        (this.Xte.HasTag(2066208190)
          ? this.ara()
          : this.GXr?.EntityHandle?.Valid &&
            (this.e$r
              ? ((t = this.dHo),
                this.hva(this.GXr.EntityHandle, this.GXr.SocketName, t),
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
    hva(t, e, i) {
      this.nva.Start();
      var s = t?.Entity?.GetComponent(1);
      s
        ? (t = t?.Entity?.GetComponent(3)?.Actor)?.IsValid() &&
          e &&
          ((t = t.Mesh),
          (e = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
          t?.DoesSocketExist(e))
          ? i.FromUeVector(t.GetSocketTransform(e, 0).GetLocation())
          : i.DeepCopy(s.ActorLocationProxy)
        : i.Reset(),
        this.nva.Stop();
    }
    LockOnSpecifyTarget(t) {
      var e;
      this.e$r ||
        this.KXr ||
        (this.I$r(t) &&
          (((e = new LockOnInfo()).EntityHandle = t),
          this.i$r(e),
          this.SetShowTarget(t)));
    }
    I$r(t) {
      var e;
      return (
        !!t?.Valid &&
        !(
          !t?.IsInit ||
          !t?.Entity?.Active ||
          (e = t.Entity.GetComponent(0))?.GetRemoveState() ||
          !e?.GetVisible() ||
          ((e = t.Entity.GetComponent(190)) &&
            e.HasAnyTag([1008164187, -1243968098]))
        )
      );
    }
    A4r(t, e) {
      this.Zfa.Start(), this.QXr.FromUeVector(e);
      (e = t.EntityHandle.Entity.GetComponent(1)),
        t.SocketName
          ? this.hva(t.EntityHandle, t.SocketName, this.XXr)
          : (this.eva.Start(),
            this.XXr.DeepCopy(e.ActorLocationProxy),
            (t =
              t.EntityHandle.Entity.GetComponent(0)?.GetFightInterConfig()
                ?.LockOffset) &&
              ((t = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)),
              this.XXr.Addition(t, this.XXr)),
            this.eva.Stop()),
        this.tva.Start(),
        (t = this.TraceDetectBlock(this.QXr, this.XXr, e.Owner));
      return this.tva.Stop(), this.Zfa.Stop(), t;
    }
    TraceDetectBlock(t, e, i) {
      return (
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, e),
        !(
          !TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.uoe,
            PROFILE_KEY,
          ) || !this.uoe.HitResult.bBlockingHit
        ) &&
          ((t = this.uoe.HitResult.Actors.Get(0)),
          (e =
            ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(
              t,
            )),
          i !== t) &&
          i !== e
      );
    }
    t$r(t) {
      t && CharacterLockOnComponent_1.h$r.Clear();
      for (
        var e = this.DetectAlternativeTargets(this.jXr, !0);
        e.length && e.every((t) => CharacterLockOnComponent_1.h$r.Has(t));

      )
        CharacterLockOnComponent_1.h$r.Pop();
      t = this.FindTheBest(this.M$r(e, !0), 4, !0, this.jXr.ToleranceAngle);
      this.i$r(t),
        t
          ? (CharacterLockOnComponent_1.h$r.Push(t),
            this.SetShowTarget(t.EntityHandle, t.SocketName),
            (this.zXr = 0),
            t?.EntityHandle?.Valid &&
              LockOnDebug_1.LockOnDebug.SetDebugArrow(t))
          : (this.SetShowTarget(void 0), this.ExitLockDirection());
    }
    DetectAlternativeTargets(e, t) {
      this.Kfa.Start(), LockOnDebug_1.LockOnDebug.Clear();
      var i = [],
        s = Global_1.Global.CharacterCameraManager.K2_GetActorLocation();
      for (const m of this.ava(Math.max(e.Distance, e.SectorRadius)))
        if ((this.Xfa.Start(), this.I$r(m)))
          if (m.Id === this.Entity.Id) this.Xfa.Stop();
          else {
            var h = m.Entity.GetComponent(0)?.GetEntityType(),
              r = CharacterController_1.CharacterController.GetActor(m);
            if (r?.IsValid()) {
              var o,
                a = r,
                r = r instanceof TsBaseCharacter_1.default;
              if ((o = this.T$r(m))) {
                if (
                  2 !==
                  CampUtils_1.CampUtils.GetCampRelationship(
                    a.Camp,
                    this.ActorComp.Actor.Camp,
                  )
                ) {
                  this.Xfa.Stop();
                  continue;
                }
                if (!a || !r) {
                  this.Xfa.Stop();
                  continue;
                }
              } else {
                if (t) {
                  this.Xfa.Stop();
                  continue;
                }
                if (h !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
                  this.Xfa.Stop();
                  continue;
                }
                a = m.Entity.GetComponent(105)?.LockRange;
                if (!a || a <= 0) {
                  this.Xfa.Stop();
                  continue;
                }
                r = m.Entity.GetComponent(1);
                if (
                  a <
                  Vector_1.Vector.Dist2D(
                    r.ActorLocationProxy,
                    this.ActorComp.ActorLocationProxy,
                  )
                ) {
                  this.Xfa.Stop();
                  continue;
                }
              }
              if (t ? this.L$r(m) : this.R$r(m)) this.Xfa.Stop();
              else {
                this.Xfa.Stop(), this.Yfa.Start();
                h = m.Entity.GetComponent(3);
                if (0 < (h?.LockOnParts?.size ?? 0)) {
                  let t = !1;
                  var a = h.LockOnParts.values(),
                    n = this.dHo;
                  for (const u of a)
                    if (
                      (this.hva(m, u.BoneNameString, n),
                      !(t = this.D$r(e, m, n)))
                    )
                      break;
                  if (t) {
                    this.Yfa.Stop();
                    continue;
                  }
                } else if (
                  this.D$r(e, m, m.Entity.GetComponent(1).ActorLocationProxy)
                ) {
                  this.Yfa.Stop();
                  continue;
                }
                if ((this.Yfa.Stop(), this.Jfa.Start(), o)) {
                  r = m.Entity.GetComponent(3);
                  if (r?.LockOnParts.size) {
                    var c,
                      _ = m.Entity.GetComponent(61),
                      C = m.Entity.GetComponent(34);
                    for ([, c] of r.LockOnParts)
                      if (
                        (t ? c.HardLockValid : c.SoftLockValid) &&
                        (!C || !C.IgnoreSocketName.has(c.BoneNameString))
                      ) {
                        if (_ && c.EnablePartName) {
                          var l = _.PartMapByBone.get(c.EnablePartName);
                          if (l && !l.Active) continue;
                        }
                        l = new LockOnInfo();
                        (l.EntityHandle = m),
                          (l.SocketName = c.BoneNameString),
                          LockOnDebug_1.LockOnDebug.Push(l),
                          this.A4r(l, s) || i.push(l);
                      }
                  } else {
                    h = new LockOnInfo();
                    if (
                      ((h.EntityHandle = m),
                      LockOnDebug_1.LockOnDebug.Push(h),
                      this.A4r(h, s))
                    ) {
                      this.Jfa.Stop();
                      continue;
                    }
                    i.push(h);
                  }
                } else {
                  a = new LockOnInfo();
                  if (
                    ((a.EntityHandle = m),
                    LockOnDebug_1.LockOnDebug.Push(a),
                    this.A4r(a, s))
                  ) {
                    this.Jfa.Stop();
                    continue;
                  }
                  i.push(a);
                }
                this.Jfa.Stop();
              }
            } else this.Xfa.Stop();
          }
        else this.Xfa.Stop();
      return this.Kfa.Stop(), i;
    }
    M$r(t, e) {
      var i = t.filter((t) =>
        t.EntityHandle?.Entity?.GetComponent(190)?.HasTag(1659143519),
      );
      return e
        ? i.every((t) => CharacterLockOnComponent_1.h$r.Has(t))
          ? t
          : i
        : i.length
          ? i
          : t;
    }
    L$r(t) {
      return (
        !!t?.Valid &&
        !!(t = t.Entity?.GetComponent(190))?.Valid &&
        (t.HasAnyTag([-1243968098, -620990172]) ||
          this.Xte.HasAnyTag([-620990172, 63495198]))
      );
    }
    R$r(t) {
      return (
        !!t?.Valid &&
        !!(t = t.Entity?.GetComponent(190))?.Valid &&
        (t.HasAnyTag([-1243968098, -1092371289]) ||
          this.Xte.HasAnyTag([-1092371289, 63495198]))
      );
    }
    D$r(t, e, i) {
      this.zfa.Start();
      t =
        !this.U$r(t, this.ActorComp.ActorLocationProxy, i) &&
        !this.A$r(e, i, this.ActorComp.ActorLocationProxy);
      return this.zfa.Stop(), t;
    }
    U$r(t, e, i) {
      var s = e.Z - i.Z;
      if (s < -t.UpDistance || s > t.DownDistance) return !1;
      if (Vector_1.Vector.DistSquared(e, i) <= t.Distance * t.Distance)
        return !0;
      s = this.ActorComp.Actor.Controller;
      if (!s) return !1;
      s = ((s.GetControlRotation().Yaw % 360) + 360) % 360;
      if (Vector_1.Vector.DistSquared(e, i) > t.SectorRadius * t.SectorRadius)
        return !1;
      i.Subtraction(e, this.dHo).Normalize(MathUtils_1.MathUtils.SmallNumber);
      (i = (180 * Math.atan2(this.dHo.Y, this.dHo.X)) / Math.PI),
        (e = Math.abs(((360 + i) % 360) - s));
      return (180 < e ? 360 - e : e) <= t.SectorAngle / 2;
    }
    A$r(t, e, i) {
      var s;
      return (
        !!t.Entity?.GetComponent(190)?.HasAnyTag(exports.lockOnEnhancedTags) &&
        !!(t = t.Entity.GetComponent(3))?.LockOnConfig &&
        !(
          (s = e.Z - i.Z) < -t.LockOnConfig.UpDistance ||
          s > t.LockOnConfig.DownDistance ||
          Vector_1.Vector.DistSquared(e, i) >
            t.LockOnConfig.Distance * t.LockOnConfig.Distance
        )
      );
    }
    g$r() {
      var t = this.e$r;
      this.l$r !== t &&
        (CombatMessage_1.CombatNet.Call(
          t ? 25272 : 20630,
          this.Entity,
          (t
            ? Protocol_1.Aki.Protocol.d4n
            : Protocol_1.Aki.Protocol.C4n
          ).create(),
        ),
        (this.l$r = t));
    }
    RefreshCurrentLockState(t) {
      var e;
      this.GXr?.EntityHandle === t &&
        (t = t?.Entity?.GetComponent(3)) &&
        (e = this.GXr?.SocketName) &&
        t.LockOnParts.has(e) &&
        ((t = t.LockOnParts.get(e)).HardLockValid || this.ExitLockDirection(),
        t.SoftLockValid || this.SetShowTarget(void 0));
    }
    get e$r() {
      return this.Xte.HasTag(-1150819426);
    }
    m$r() {
      var t = this.RSo.GetMoveDirectionCache(),
        [e] = this.RSo.GetCameraInput();
      (0 === e && this._$r.Equals(t, MathUtils_1.MathUtils.SmallNumber)) ||
        (this._$r.Set(t.X, t.Y, 0),
        this.W5r.DeepCopy(this.ActorComp.InputDirectProxy),
        this._$r?.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) ||
        (this.u$r = !0),
        this.SpeedUpCleanTarget() && (this.u$r = !0);
    }
    SpeedUpCleanTarget() {
      var t = this.Entity.GetComponent(164);
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
    ChangeShowTarget(t, e, i) {
      if (this.KXr || !this.e$r) return !1;
      var s,
        h,
        r,
        o = this.DetectAlternativeTargets(this.jXr, !0),
        a = this.ActorComp.ActorLocationProxy,
        n =
          (this.hva(this.GXr.EntityHandle, this.GXr.SocketName, this.dHo),
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
      let c = void 0,
        _ = MathUtils_1.MathUtils.LargeNumber;
      for (const C of o)
        !this.I$r(C.EntityHandle) ||
          C.Equal(this.GXr) ||
          (this.hva(C.EntityHandle, C.SocketName, this.dHo),
          this.dHo.SubtractionEqual(this.Tz),
          this.Dz.RotateVector(this.dHo, this.dHo),
          Math.abs(this.dHo.X) < MathUtils_1.MathUtils.SmallNumber &&
            Math.abs(this.dHo.Y) < MathUtils_1.MathUtils.SmallNumber) ||
          ((s =
            Math.atan2(this.dHo.Y, this.dHo.X) *
            MathUtils_1.MathUtils.RadToDeg),
          (h =
            Math.asin(this.dHo.Z / this.dHo.Size()) *
            MathUtils_1.MathUtils.RadToDeg),
          (this.CTn.X = s),
          (this.CTn.Y = h),
          (r = this.CTn.DotProduct(t)) < 0) ||
          ((r =
            (e *
              (Math.acos(r / Math.sqrt(this.CTn.SizeSquared() * n)) *
                MathUtils_1.MathUtils.RadToDeg)) /
              180 +
            i * Math.sqrt(s * s + h * h)) < _ &&
            ((_ = r), (c = C)));
      return (
        !!c &&
        (this.i$r(c), this.SetShowTarget(c.EntityHandle, c.SocketName), !0)
      );
    }
    GetPredictedLockOnTarget() {
      if (this.Xte?.HasTag(-126337119)) return this.dCa;
    }
    SetPredictedLockOnTarget(t) {
      this.dCa = t;
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
