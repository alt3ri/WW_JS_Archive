"use strict";
var CharacterLockOnComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var h,
        r = arguments.length,
        o =
          r < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, i, e, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (h = t[n]) &&
            (o = (r < 3 ? h(o) : 3 < r ? h(i, e, o) : h(i, e)) || o);
      return 3 < r && o && Object.defineProperty(i, e, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterLockOnComponent =
    exports.LockOnInfo =
    exports.ShowTargetInfo =
    exports.lockOnEnhancedTags =
      void 0);
const UE = require("ue"),
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
  GameSettingsDefine_1 = require("../../../../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../../../../GameSettings/GameSettingsManager"),
  Global_1 = require("../../../../../Global"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  LockOnController_1 = require("../../../../../Module/LockOn/LockOnController"),
  ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  CampUtils_1 = require("../../Blueprint/Utils/CampUtils"),
  CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  LockOnDebug_1 = require("./LockOnDebug"),
  PROFILE_KEY = "CharacterLockOnComponent_IsBlock",
  DELAY_TIME = 1e3,
  CHECK_COUNT = 3,
  RESET_FOCUS_TIME = 0.6,
  RESET_TARGETS_ISLOCK_TIME = 1e4,
  DEFAULT_LOCKON_CONFIG_ID = 0,
  LOCK_DIR_COMPENSATE_REASON = "角色强锁补偿buff";
exports.lockOnEnhancedTags = [-336338240, -164894127];
class ShowTargetInfo {
  constructor() {
    (this.ShowTarget = void 0), (this.SocketName = ""), (this.LastSetTime = -0);
  }
}
exports.ShowTargetInfo = ShowTargetInfo;
class LockOnInfo {
  constructor(t, i = "") {
    (this.EntityHandle = void 0),
      (this.SocketName = ""),
      (this.EntityHandle = t),
      (this.SocketName = i);
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
        (this.Hfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.DetectAlternativeTargets",
        )),
        (this.jfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.DetectAlternativeTargets.CheckBase",
        )),
        (this.Wfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.DetectAlternativeTargets.CheckDistance",
        )),
        (this.Qfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.DetectAlternativeTargets.FinalSetting",
        )),
        (this.Kfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.CannotBeDetected",
        )),
        (this.Xfa = Stats_1.Stat.Create("CharacterLockOnComponent.IsBlock")),
        (this.Yfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.IsBlock.RayEndLocation",
        )),
        (this.Jfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.IsBlock.TraceDetectBlock",
        )),
        (this.zfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.FindTheBest",
        )),
        (this.Zfa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.FindTheBest.Direction",
        )),
        (this.eva = Stats_1.Stat.Create(
          "CharacterLockOnComponent.FindTheBest.Calculation",
        )),
        (this.tva = Stats_1.Stat.Create(
          "CharacterLockOnComponent.GetSkillBoneLocation",
        )),
        (this.SSa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.StatTickMoveDir",
        )),
        (this.ESa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.StatTickCurrentInfo",
        )),
        (this.ySa = Stats_1.Stat.Create("CharacterLockOnComponent.StatCheck")),
        (this.ISa = Stats_1.Stat.Create(
          "CharacterLockOnComponent.StatLockOnDebugTick",
        )),
        (this.Hte = void 0),
        (this.J8l = void 0),
        (this.GXr = void 0),
        (this.NXr = void 0),
        (this.OXr = ""),
        (this.Em1 = void 0),
        (this.Im1 = void 0),
        (this.En1 = []),
        (this.FXr = void 0),
        (this.VXr = 0),
        (this.Xte = void 0),
        (this.HBr = void 0),
        (this.RSo = void 0),
        (this.m1t = void 0),
        (this.HXr = void 0),
        (this.jXr = void 0),
        (this.WXr = void 0),
        (this.KXr = !1),
        (this.dHo = Vector_1.Vector.Create()),
        (this.Tz = Vector_1.Vector.Create()),
        (this.Gue = Rotator_1.Rotator.Create()),
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
        (this.eTa = new Set()),
        (this.I3r = (t) => {
          t = t.GetComponent(32);
          (this.KXr = t.KXr),
            (this.En1 = t.En1.slice()),
            this.i$r(t.GXr),
            (this.Em1 = t.Em1),
            (this.Im1 = t.Im1),
            this.SetShowTarget(t.ShowTarget, t.ShowTargetSocket);
        }),
        (this.Zpe = (t) => {
          var i = this.IsCompensateLockDirection();
          t
            ? i &&
              (this.ExitLockDirection(), this.im1(), this.EnterLockDirection())
            : this.rm1();
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
        (this.CCa = void 0);
    }
    i$r(t) {
      var i = this.GXr;
      (this.GXr = t),
        (i?.EntityHandle === t?.EntityHandle &&
          i?.SocketName === t?.SocketName) ||
          (i &&
            i.EntityHandle &&
            EventSystem_1.EventSystem.HasWithTarget(
              i.EntityHandle,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              i.EntityHandle,
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
      t
        ? this.Xte?.HasTag(2130437044) || this.Xte?.AddTag(2130437044)
        : this.Xte?.RemoveTag(2130437044),
        (this.VXr = Time_1.Time.WorldTime);
      var e = t?.Entity?.GetComponent(3);
      if (this.ShowTarget !== t || this.ShowTargetSocket !== i) {
        if (void 0 === t)
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
      return [173];
    }
    AUn() {
      this.KXr
        ? this.ForceLookAt(void 0, !1, !0)
        : this.e$r
          ? this.t$r(!0)
          : (this.i$r(void 0), this.SetShowTarget(void 0));
    }
    rva(t) {
      return (
        this.eTa.clear(),
        CharacterLockOnComponent_1.EnhancedEntityIds.forEach((t) => {
          var i = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t);
          i
            ? this.eTa.add(i)
            : CharacterLockOnComponent_1.EnhancedEntityIds.delete(t);
        }),
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
          this.Hte.ActorLocationProxy,
          t,
          63,
          this.eTa,
          !1,
        ),
        this.eTa
      );
    }
    OnInitData() {
      return (this.WXr = new ShowTargetInfo()), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.J8l = this.Entity.GetComponent(0)),
        this.SetLockOnConfig(
          this.J8l.GetRoleConfig()?.LockOnDefaultId ?? 0,
          this.J8l.GetRoleConfig()?.LockOnLookOnId ?? 0,
        ),
        (this.Xte = this.Entity.GetComponent(203)),
        (this.HBr = this.Entity.GetComponent(173)),
        (this.RSo = this.Entity.GetComponent(61)),
        (this.m1t = this.Entity.GetComponent(172)),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.ZXr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe,
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
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe,
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
    OnDisable(t) {
      this.Xte?.RemoveTag(2130437044);
    }
    koe() {
      (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.uoe.WorldContextObject = this.Hte.Actor),
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
      this.SSa.Start(),
        this.m$r(),
        this.SSa.Stop(),
        this.ESa.Start(),
        this.sra(),
        this.ESa.Stop(),
        this.ySa.Start(),
        this.Ii(t),
        this.ySa.Stop(),
        this.C$r(t),
        this.g$r(),
        this.ISa.Start(),
        LockOnDebug_1.LockOnDebug.Tick(this.Entity),
        this.ISa.Stop();
    }
    Ii(t) {
      LockOnController_1.LockOnController.IsValidLockOnTarget(
        this.GXr?.EntityHandle,
      )
        ? (this.e$r || this.KXr) &&
          ((this.YXr += t),
          this.YXr < DELAY_TIME ||
            ((this.YXr = 0),
            (t =
              Global_1.Global.CharacterCameraManager.D_K2_GetActorLocation()),
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
        this.ForceLookAt(void 0, !1);
    }
    C$r(t) {
      this.e$r &&
        ((this.zXr += t),
        this.zXr < RESET_TARGETS_ISLOCK_TIME ||
          ((this.zXr = 0),
          CharacterLockOnComponent_1.h$r.Clear(),
          CharacterLockOnComponent_1.h$r.Push(this.GXr)));
    }
    DetectSoftLockTarget(
      {
        LockOnConfigId: i = DEFAULT_LOCKON_CONFIG_ID,
        SkillTargetPriority: e = 8,
        ShowTarget: s = !1,
        GlobalTarget: h = !1,
      },
      r = !0,
    ) {
      if (h)
        (h =
          ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.GetComponent(
            32,
          )),
          this.i$r(h?.GXr);
      else if (!this.e$r && !this.KXr)
        if (r) {
          let t = this.HXr;
          (t =
            DEFAULT_LOCKON_CONFIG_ID !== i
              ? ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(i)
              : t) &&
            ((h = this.DetectAlternativeTargets(t, !1)),
            (r = this.FindTheBest(this.M$r(h, !1), e, !1, t.ToleranceAngle)),
            this.i$r(r),
            r?.EntityHandle?.Valid &&
              LockOnDebug_1.LockOnDebug.SetDebugArrow(r),
            s) &&
            this.c$r(
              this.GetCurrentTarget(),
              this.GetCurrentTargetSocketName(),
            );
        } else this.GXr || this.DetectSoftLockTarget({});
    }
    FindTheBest(t, i, e, s) {
      if ((this.zfa.Start(), this.Zfa.Start(), 8 === i))
        switch (
          GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
            GameSettingsDefine_1.EFunction.SkillLockEnemyMode,
          )
        ) {
          case 0:
            i = 0;
            break;
          case 1:
            i = 4;
            break;
          case 2:
            i = 3;
        }
      let h = void 0,
        r = !1;
      switch (i) {
        case 0:
        case 5:
          (r = !this.u$r),
            (this.u$r = !1),
            (h = this.W5r.IsNearlyZero() ? this.E$r() : this.W5r);
          break;
        case 1:
        case 7:
          h = this.Hte.ActorForwardProxy;
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
      this.Zfa.Stop();
      var o = [5, 7, 6].includes(i),
        n =
          CommonParamById_1.configCommonParamById.GetIntConfig("LockOnOffset");
      let a = void 0,
        c = Number.MAX_VALUE,
        _ = void 0,
        C = Number.MAX_VALUE;
      for (const u of t) {
        switch ((this.eva.Start(), this.S$r(u, e, r))) {
          case 0:
            this.eva.Stop();
            continue;
          case 1:
            break;
          case 2:
            return (
              LockOnDebug_1.LockOnDebug.SetDebugString(u, 0, 0, this.W5r, h),
              this.eva.Stop(),
              this.zfa.Stop(),
              u
            );
        }
        this.ova(u.EntityHandle, u.SocketName, this.dHo);
        var l = this.Hte.ActorLocationProxy,
          m = Vector_1.Vector.Dist(l, this.dHo);
        let t = 0;
        h &&
          (this.Tz.DeepCopy(h),
          this.Tz.Normalize(),
          this.Tz.Multiply(o ? 0 : n, this.Tz),
          l.Subtraction(this.Tz, this.Tz),
          this.dHo.Subtraction(this.Tz, this.dHo),
          (t = this.y$r(h, this.dHo))),
          t < s
            ? (!a || m < c) && ((a = u), (c = m))
            : o || ((!_ || m < C) && ((_ = u), (C = m))),
          LockOnDebug_1.LockOnDebug.SetDebugString(u, t, m, this.W5r, h),
          this.eva.Stop();
      }
      return this.zfa.Stop(), a || _;
    }
    S$r(i, t, e) {
      return (t && CharacterLockOnComponent_1.h$r.Has(i)) ||
        this.En1.some((t) => !t.Different(i))
        ? 0
        : e &&
            LockOnController_1.LockOnController.IsValidLockOnTarget(
              this.GXr?.EntityHandle,
            ) &&
            this.GXr?.Equal(i)
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
    ForceLookAt(i, t, e = !1) {
      if (t) {
        if (this.KXr)
          return void CombatLog_1.CombatLog.Error(
            "LockOn",
            this.Entity,
            "重复进入看向状态！",
          );
        if (this.En1.some((t) => !t.Different(i)))
          return void CombatLog_1.CombatLog.Error(
            "LockOn",
            this.Entity,
            "忽略锁定期间不能进入看向状态！",
          );
      }
      this.KXr;
      if (t) {
        if (((this.KXr = !0), this.e$r)) {
          if (!i?.Different(this.GXr)) return;
          this.Em1 = this.GXr;
        }
        this.HBr.SetDirectionState(
          CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection,
        ),
          this.i$r(i),
          this.SetShowTarget(i?.EntityHandle, i?.SocketName);
      } else
        this.KXr &&
          !i?.Different(this.GXr) &&
          (e &&
          LockOnController_1.LockOnController.IsValidLockOnTarget(
            this.Em1?.EntityHandle,
          )
            ? (this.i$r(this.Em1),
              this.SetShowTarget(this.Em1.EntityHandle, this.Em1.SocketName),
              CharacterLockOnComponent_1.h$r.Push(this.Em1),
              this.HBr.SetDirectionState(
                CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection,
              ))
            : (this.e$r &&
                LockOnController_1.LockOnController.IsValidLockOnTarget(
                  this.GXr?.EntityHandle,
                )) ||
              (this.i$r(void 0),
              this.SetShowTarget(void 0),
              this.HBr.SetDirectionState(
                CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
              )),
          (this.KXr = !1),
          (this.Em1 = void 0));
      this.KXr;
    }
    ForceIgnore(i, t) {
      if (t) {
        if (this.En1.some((t) => !t.Different(i)))
          return void CombatLog_1.CombatLog.Error(
            "LockOn",
            this.Entity,
            "重复进入忽略锁定状态！",
          );
        if (this.KXr && !this.GXr?.Different(i))
          return void CombatLog_1.CombatLog.Error(
            "LockOn",
            this.Entity,
            "看向状态期间不能忽略锁定！",
          );
      }
      t
        ? (this.En1.push(i),
          this.GXr &&
            !i.Different(this.GXr) &&
            (this.e$r && (this.Im1 = this.GXr),
            this.i$r(void 0),
            this.SetShowTarget(void 0),
            this.HBr.SetDirectionState(
              CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
            )))
        : (this.En1.some((t) => !t.Different(i)) &&
            (this.En1 = this.En1.filter((t) => t.Different(i))),
          this.Im1 &&
            !this.Im1.Different(i) &&
            (!this.e$r &&
              LockOnController_1.LockOnController.IsValidLockOnTarget(
                i.EntityHandle,
              ) &&
              (this.i$r(i),
              this.SetShowTarget(i.EntityHandle, i.SocketName),
              CharacterLockOnComponent_1.h$r.Push(i),
              this.HBr.SetDirectionState(
                CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection,
              )),
            (this.Im1 = void 0)));
    }
    EnterLockDirection() {
      if (this.KXr)
        (this.Em1 = void 0), CharacterLockOnComponent_1.h$r.Push(this.GXr);
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
            (this.Em1 = void 0))
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
    ResetPitch(t = RESET_FOCUS_TIME, i = void 0, e = !0, s = 0) {
      var h =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "InitialCameraPitch",
          ),
        r = this.Gue;
      CameraUtility_1.CameraUtility.SetPitchInGravity(
        CameraController_1.CameraController.FightCamera.LogicComponent
          .CameraRotation,
        h,
        r,
      ),
        CameraController_1.CameraController.FightCamera.LogicComponent.ResetCameraInput(),
        CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(
          r,
          t,
          i,
          e,
          s,
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
            this.jXr &&
            (this.e$r
              ? ((t = this.dHo),
                this.ova(this.GXr.EntityHandle, this.GXr.SocketName, t),
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
    ova(t, i, e) {
      this.tva.Start();
      var s = t?.Entity?.GetComponent(1);
      s
        ? (t = t?.Entity?.GetComponent(3)?.Actor)?.IsValid() &&
          i &&
          ((t = t.Mesh),
          (i = FNameUtil_1.FNameUtil.GetDynamicFName(i)),
          t?.DoesSocketExist(i))
          ? e.FromUeVector(t.D_GetSocketTransform(i, 0).GetLocation())
          : e.DeepCopy(s.ActorLocationProxy)
        : e.Reset(),
        this.tva.Stop();
    }
    LockOnSpecifyTarget(t) {
      var i;
      this.e$r ||
        this.KXr ||
        (LockOnController_1.LockOnController.IsValidLockOnTarget(t) &&
          (((i = new LockOnInfo()).EntityHandle = t),
          this.i$r(i),
          this.SetShowTarget(t)));
    }
    A4r(t, i) {
      this.Xfa.Start(), this.QXr.FromUeVector(i);
      (i = t.EntityHandle.Entity.GetComponent(1)),
        t.SocketName
          ? this.ova(t.EntityHandle, t.SocketName, this.XXr)
          : (this.Yfa.Start(),
            this.XXr.DeepCopy(i.ActorLocationProxy),
            (t =
              t.EntityHandle.Entity.GetComponent(0)?.GetFightInterConfig()
                ?.LockOffset) &&
              ((t = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)),
              this.XXr.Addition(t, this.XXr)),
            this.Yfa.Stop()),
        this.Jfa.Start(),
        (t = this.TraceDetectBlock(this.QXr, this.XXr, i.Owner));
      return this.Jfa.Stop(), this.Xfa.Stop(), t;
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
    rm1() {
      this.e$r &&
        this.m1t?.AddBuff(CharacterBuffIds_1.buffId.HardLockCompensateBuff, {
          InstigatorId: this.m1t?.CreatureDataId,
          Reason: LOCK_DIR_COMPENSATE_REASON,
        });
    }
    im1() {
      return !(
        !this.IsCompensateLockDirection() ||
        !this.m1t ||
        (this.m1t.RemoveBuff(
          CharacterBuffIds_1.buffId.HardLockCompensateBuff,
          -1,
          LOCK_DIR_COMPENSATE_REASON,
        ),
        0)
      );
    }
    IsCompensateLockDirection() {
      return this.Xte.HasTag(1320595126);
    }
    t$r(t) {
      if (this.jXr) {
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
    }
    DetectAlternativeTargets(i, t) {
      this.Hfa.Start(), LockOnDebug_1.LockOnDebug.Clear();
      var e = [],
        s = Global_1.Global.CharacterCameraManager.D_K2_GetActorLocation();
      for (const m of this.rva(Math.max(i.Distance, i.SectorRadius)))
        if (
          (this.jfa.Start(),
          LockOnController_1.LockOnController.IsValidLockOnTarget(m))
        )
          if (m.Id === this.Entity.Id) this.jfa.Stop();
          else {
            var h = m.Entity.GetComponent(0)?.GetEntityType(),
              r =
                ControllerHolder_1.ControllerHolder.CharacterController.GetActor(
                  m,
                );
            if (r?.IsValid()) {
              var o,
                n = r,
                r = r instanceof TsBaseCharacter_1.default;
              if ((o = this.T$r(m))) {
                if (!n || !r) {
                  this.jfa.Stop();
                  continue;
                }
                if (
                  2 !==
                  CampUtils_1.CampUtils.GetCampRelationship(
                    n.Camp,
                    this.Hte.Actor.Camp,
                  )
                ) {
                  this.jfa.Stop();
                  continue;
                }
              } else {
                if (t) {
                  this.jfa.Stop();
                  continue;
                }
                if (h !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
                  this.jfa.Stop();
                  continue;
                }
                r = m.Entity.GetComponent(115)?.LockRange;
                if (!r || r <= 0) {
                  this.jfa.Stop();
                  continue;
                }
                n = m.Entity.GetComponent(1);
                if (
                  r <
                  Vector_1.Vector.Dist2D(
                    n.ActorLocationProxy,
                    this.Hte.ActorLocationProxy,
                  )
                ) {
                  this.jfa.Stop();
                  continue;
                }
              }
              if (t ? this.L$r(m) : this.R$r(m)) this.jfa.Stop();
              else if (this.Y8l(m)) {
                this.jfa.Stop(), this.Wfa.Start();
                h = m.Entity.GetComponent(3);
                if (0 < (h?.LockOnParts?.size ?? 0)) {
                  let t = !1;
                  var r = h.LockOnParts.values(),
                    a = this.dHo;
                  for (const u of r)
                    if (
                      (this.ova(m, u.BoneNameString, a),
                      !(t = this.D$r(i, m, a)))
                    )
                      break;
                  if (t) {
                    this.Wfa.Stop();
                    continue;
                  }
                } else if (
                  this.D$r(i, m, m.Entity.GetComponent(1).ActorLocationProxy)
                ) {
                  this.Wfa.Stop();
                  continue;
                }
                if ((this.Wfa.Stop(), this.Qfa.Start(), o)) {
                  n = m.Entity.GetComponent(3);
                  if (n?.LockOnParts.size) {
                    var c,
                      _ = m.Entity.GetComponent(68),
                      C = m.Entity.GetComponent(39);
                    for ([, c] of n.LockOnParts)
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
                          this.A4r(l, s) || e.push(l);
                      }
                  } else {
                    h = new LockOnInfo();
                    if (
                      ((h.EntityHandle = m),
                      LockOnDebug_1.LockOnDebug.Push(h),
                      this.A4r(h, s))
                    ) {
                      this.Qfa.Stop();
                      continue;
                    }
                    e.push(h);
                  }
                } else {
                  r = new LockOnInfo();
                  if (
                    ((r.EntityHandle = m),
                    LockOnDebug_1.LockOnDebug.Push(r),
                    this.A4r(r, s))
                  ) {
                    this.Qfa.Stop();
                    continue;
                  }
                  e.push(r);
                }
                this.Qfa.Stop();
              } else this.jfa.Stop();
            } else this.jfa.Stop();
          }
        else this.jfa.Stop();
      return this.Hfa.Stop(), e;
    }
    M$r(t, i) {
      var e = t.filter((t) =>
        t.EntityHandle?.Entity?.GetComponent(203)?.HasTag(1659143519),
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
      t = t.Entity?.GetComponent(203);
      return (
        !!t?.Valid &&
        (t.HasAnyTag([-1243968098, -620990172]) ||
          this.Xte.HasAnyTag([-620990172, 63495198]))
      );
    }
    R$r(t) {
      t = t.Entity?.GetComponent(203);
      return (
        !!t?.Valid &&
        (t.HasAnyTag([-1243968098, -1092371289]) ||
          this.Xte.HasAnyTag([-1092371289, 63495198]))
      );
    }
    Y8l(t) {
      var i = t.Entity?.GetComponent(203).HasTag(-504316709),
        t = t.Entity?.GetComponent(0);
      return !i || t.GetSummonerId() === this.J8l.GetCreatureDataId();
    }
    D$r(t, i, e) {
      this.Kfa.Start();
      t =
        !this.U$r(t, this.Hte.ActorLocationProxy, e) &&
        !this.A$r(i, e, this.Hte.ActorLocationProxy);
      return this.Kfa.Stop(), t;
    }
    U$r(t, i, e) {
      var s = i.Z - e.Z;
      if (s < -t.UpDistance || s > t.DownDistance) return !1;
      if (Vector_1.Vector.DistSquared(i, e) <= t.Distance * t.Distance)
        return !0;
      s = this.Hte.Actor.Controller;
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
        !!t.Entity?.GetComponent(203)?.HasAnyTag(exports.lockOnEnhancedTags) &&
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
        (CombatMessage_1.CombatNet.Send(
          t ? 27028 : 26471,
          this.Entity,
          (t
            ? Protocol_1.Aki.Protocol.Ue_
            : Protocol_1.Aki.Protocol.De_
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
      var t, i;
      this.RSo &&
        ((t = this.RSo.GetMoveDirectionCache()),
        ([i] = this.RSo.GetCameraInput()),
        (0 === i && this._$r.Equals(t, MathUtils_1.MathUtils.SmallNumber)) ||
          (this._$r.Set(t.X, t.Y, 0),
          this.W5r.DeepCopy(this.Hte.InputDirectProxy),
          this._$r?.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) ||
          (this.u$r = !0),
        this.SpeedUpCleanTarget()) &&
        (this.u$r = !0);
    }
    SpeedUpCleanTarget() {
      var t = this.Entity.GetComponent(176);
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
      if (this.KXr || !this.e$r || !this.jXr || !this.GXr) return !1;
      var s,
        h,
        r,
        o = this.DetectAlternativeTargets(this.jXr, !0),
        n = this.Hte.ActorLocationProxy,
        a =
          (this.ova(this.GXr.EntityHandle, this.GXr.SocketName, this.dHo),
          this.Tz.DeepCopy(n),
          (this.Tz.Z = this.dHo.Z),
          this.dHo.SubtractionEqual(n),
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
        !LockOnController_1.LockOnController.IsValidLockOnTarget(
          C.EntityHandle,
        ) ||
          C.Equal(this.GXr) ||
          (this.ova(C.EntityHandle, C.SocketName, this.dHo),
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
            (i *
              (Math.acos(r / Math.sqrt(this.CTn.SizeSquared() * a)) *
                MathUtils_1.MathUtils.RadToDeg)) /
              180 +
            e * Math.sqrt(s * s + h * h)) < _ &&
            ((_ = r), (c = C)));
      return (
        !!c &&
        (this.i$r(c), this.SetShowTarget(c.EntityHandle, c.SocketName), !0)
      );
    }
    GetPredictedLockOnTarget() {
      if (this.Xte?.HasTag(-126337119)) return this.CCa;
    }
    SetPredictedLockOnTarget(t) {
      this.CCa = t;
    }
  });
(CharacterLockOnComponent.h$r = new CustomizedLockedQueue()),
  (CharacterLockOnComponent.EnhancedEntityIds = new Set()),
  (CharacterLockOnComponent = CharacterLockOnComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(32)],
      CharacterLockOnComponent,
    )),
  (exports.CharacterLockOnComponent = CharacterLockOnComponent);
//# sourceMappingURL=CharacterLockOnComponent.js.map
