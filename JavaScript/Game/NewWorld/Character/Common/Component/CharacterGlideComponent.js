"use strict";
var CharacterGlideComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, h) {
      var s,
        o = arguments.length,
        a =
          o < 3
            ? e
            : null === h
              ? (h = Object.getOwnPropertyDescriptor(e, i))
              : h;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, h);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (s = t[r]) &&
            (a = (o < 3 ? s(a) : 3 < o ? s(e, i, a) : s(e, i)) || a);
      return 3 < o && a && Object.defineProperty(e, i, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterGlideComponent =
    exports.SoarConfigParams =
    exports.SOAR_CAMERA_SHAKE_SPEED_THRESHOLD_MAX =
    exports.SOAR_CAMERA_SHAKE_SPEED_THRESHOLD =
    exports.SOAR_AUTO_FLIGHT_PATH =
    exports.SOAR_CAMERA_SHAKE_CURVE_PATH =
    exports.SOAR_CAMERA_SHAKE_PATH =
    exports.SOAR_CONFIG_BASE_PATH =
      void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ScrollingTipsController_1 = require("../../../../Module/ScrollingTips/ScrollingTipsController"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  FLYING_GRAVITY = 15,
  FLYING_FRICTION = 0.1,
  FLYING_DECELERATION = 0.068,
  FLYING_ACCELERATOR = 55,
  FLYING_MAX_SPEED = 650,
  FLYING_MAX_FALLING_SPEED = 250;
(exports.SOAR_CONFIG_BASE_PATH =
  "/Game/Aki/Data/Fight/Movement/DA_SoarConfigBase.DA_SoarConfigBase"),
  (exports.SOAR_CAMERA_SHAKE_PATH =
    "/Game/Aki/Character/Role/Common/Data/CameraShake/Camera/NCS_Role_Soar.NCS_Role_Soar_C"),
  (exports.SOAR_CAMERA_SHAKE_CURVE_PATH =
    "/Game/Aki/Character/Role/Common/Data/CameraShake/Camera/CameraShake_Curve.CameraShake_Curve"),
  (exports.SOAR_AUTO_FLIGHT_PATH =
    "/Game/Aki/Character/Input/DataAsset/DA_CameraDrivenAutoFlightData.DA_CameraDrivenAutoFlightData"),
  (exports.SOAR_CAMERA_SHAKE_SPEED_THRESHOLD = 1e3),
  (exports.SOAR_CAMERA_SHAKE_SPEED_THRESHOLD_MAX = 3e3);
class SoarConfigParams {
  constructor() {
    (this.SoarInputNormalAngleMin = 12.38),
      (this.SoarInputNormalAngleMax = 45),
      (this.SoarAerodynamicsMin = 4.9),
      (this.SoarAerodynamicsMax = 30),
      (this.SoarSpeedThresholdMin = 1700),
      (this.SoarSpeedThresholdMax = 2200),
      (this.SoarPitchMin = 10),
      (this.SoarPitchMax = 140),
      (this.SoarNormalSpeedNoInput = 6),
      (this.SoarBalanceVelocity = Vector_1.Vector.Create(1650, 0, -385)),
      (this.SoarBalanceSpeed = this.SoarBalanceVelocity.Size()),
      (this.SoarBalanceInputThreshold = -0.8),
      (this.SoarBalanceAccelMin = 100),
      (this.SoarBalanceAccelMax = 1e3),
      (this.SoarBalanceAccelOffset = 400),
      (this.SoarBalanceSpeedThreshold = 1700),
      (this.SoarBalanceSpeed2 = 1500),
      (this.SoarBalanceSpeedThreshold2 = 1500),
      (this.SoarNormalSpeed = 200),
      (this.SoarNormalLerp = 0.95),
      (this.SoarRotateSpeed = 65),
      (this.SoarRotateLerp = 0.98),
      (this.SoarBoostNormalSpeed = 50),
      (this.SoarBoostNormalLerp = 0.95),
      (this.SoarBoostAccel = 5e3),
      (this.SoarSplineMinSpeed = 500),
      (this.SoarSplineAccel = 500),
      (this.SoarSplineRotateAngleSpeedWithoutInput = 360),
      (this.SoarSplineRotateAngleSpeedWithInput = 180),
      (this.SoarSplineRotateLerp = 0.95),
      (this.SoarSplinePushCenterDistMin = 0),
      (this.SoarSplinePushCenterDistMax = 800),
      (this.SoarSplinePushCenterSpeedMin = 0),
      (this.SoarSplinePushCenterSpeedMax = 300),
      (this.SoarSplineInputAngle = 30),
      (this.SoarSplineInputAngleCos = Math.cos(
        this.SoarSplineInputAngle * MathUtils_1.MathUtils.DegToRad,
      )),
      (this.SoarSplineInputAngleSin = Math.sin(
        this.SoarSplineInputAngle * MathUtils_1.MathUtils.DegToRad,
      )),
      (this.SoarSplineInputDirectMinX = Math.sin(
        this.SoarPitchMin * MathUtils_1.MathUtils.DegToRad,
      )),
      (this.SoarAirFriction = 0.02),
      (this.SoarGravityValue = 1900),
      (this.SoarMaxSpeed = 3e3),
      (this.SoarHitWallExitTimeLength = 1500),
      (this.DebugDraw = !1);
  }
  static get SoarConfigBase() {
    return (
      this.Vkl ||
        ((this.Vkl = new SoarConfigParams()),
        this.Vkl.Init(
          ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            exports.SOAR_CONFIG_BASE_PATH,
            UE.BP_SoarConfig_C,
          ),
        )),
      this.Vkl
    );
  }
  static ReInitSoarConfigBase() {
    this.Vkl || (this.Vkl = new SoarConfigParams()),
      this.Vkl.Init(
        ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          exports.SOAR_CONFIG_BASE_PATH,
          UE.BP_SoarConfig_C,
        ),
      );
  }
  Init(t) {
    (this.SoarInputNormalAngleMin = t.阻挡面角度极限最小值),
      (this.SoarInputNormalAngleMax = t.阻挡面角度极限最大值),
      (this.SoarAerodynamicsMin = t.空气阻力面系数最小值),
      (this.SoarAerodynamicsMax = t.空气阻力面系数最大值),
      (this.SoarSpeedThresholdMin = t.阻挡面最小值对应速度值),
      (this.SoarSpeedThresholdMax = t.阻挡面最大值对应速度值),
      (this.SoarPitchMin = t.阻挡面最小角度),
      (this.SoarPitchMax = t.阻挡面最大角度),
      (this.SoarNormalSpeedNoInput = t.无输入时阻挡面转速),
      this.SoarBalanceVelocity.DeepCopy(t.满抬升输入时平衡速度向量),
      (this.SoarBalanceSpeed = this.SoarBalanceVelocity.Size()),
      (this.SoarBalanceInputThreshold = t.满抬升输入判定阈值),
      (this.SoarBalanceAccelMin = t.平衡用最小加速度),
      (this.SoarBalanceAccelMax = t.平衡用最大加速度),
      (this.SoarBalanceAccelOffset = t.平衡使用最大值对应速度差),
      (this.SoarBalanceSpeedThreshold = t.满抬升输入平衡开启速度阈值),
      (this.SoarBalanceSpeed2 = t.非满抬升输入平衡速度值),
      (this.SoarBalanceSpeedThreshold2 = t.非满抬升输入平衡开启速度阈值),
      (this.SoarNormalSpeed = t.阻挡面转速第一段线性),
      (this.SoarNormalLerp = t.阻挡面转速第二段比例),
      (this.SoarRotateSpeed = t.面向转速第一段线性),
      (this.SoarRotateLerp = t.面向转速第二段比例),
      (this.SoarBoostNormalSpeed = t.Boost阻挡面转速第一段线性),
      (this.SoarBoostNormalLerp = t.Boost阻挡面转速第二段比例),
      (this.SoarBoostAccel = t.Boost加速度),
      (this.SoarSplineMinSpeed = t.风道最小速度),
      (this.SoarSplineAccel = t.风道最大加速度),
      (this.SoarSplineRotateAngleSpeedWithoutInput = t.风道无输入面向修正速度),
      (this.SoarSplineRotateAngleSpeedWithInput = t.风道有输入面向修正速度),
      (this.SoarSplineRotateLerp = t.风道转向第二段比例),
      (this.SoarSplinePushCenterDistMin = t.风道中线拉回最小速对应距离),
      (this.SoarSplinePushCenterDistMax = t.风道中线拉回最大速对应距离),
      (this.SoarSplinePushCenterSpeedMin = t.风道中线拉回最小速度),
      (this.SoarSplinePushCenterSpeedMax = t.风道中线拉回最大速度),
      (this.SoarSplineInputAngle = t.风道输入对应偏转),
      (this.SoarSplineInputAngleCos = Math.cos(
        this.SoarSplineInputAngle * MathUtils_1.MathUtils.DegToRad,
      )),
      (this.SoarSplineInputAngleSin = Math.sin(
        this.SoarSplineInputAngle * MathUtils_1.MathUtils.DegToRad,
      )),
      (this.SoarSplineInputDirectMinX = Math.sin(
        this.SoarPitchMin * MathUtils_1.MathUtils.DegToRad,
      )),
      (this.SoarAirFriction = t.空气阻力),
      (this.SoarGravityValue = t.重力加速度),
      (this.SoarMaxSpeed = t.最大速度),
      (this.SoarHitWallExitTimeLength = t.撞墙结束时间),
      (this.DebugDraw = GlobalData_1.GlobalData.IsPlayInEditor && t.DebugDraw);
  }
}
(exports.SoarConfigParams = SoarConfigParams).Vkl = void 0;
const COS_45 = Math.cos(Math.PI / 4),
  SOAR_MAX_DELTA = 1 / 30,
  SOAR_TURN_SPEED_SQR_THRESHOLD = 1e4,
  redColor = new UE.LinearColor(1, 0, 0, 1),
  greenColor = new UE.LinearColor(0, 1, 0, 1),
  blueColor = new UE.LinearColor(0, 0, 1, 1);
let CharacterGlideComponent =
  (CharacterGlideComponent_1 = class CharacterGlideComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.o4o = void 0),
        (this.H5r = void 0),
        (this.Xte = void 0),
        (this.oRe = void 0),
        (this.Xdl = void 0),
        (this.j5r = void 0),
        (this.e7l = void 0),
        (this.t7l = !1),
        (this.i7l = !1),
        (this.r7l = !1),
        (this.SoarBalanceOn = !1),
        (this.Bnh = 0),
        (this.Hkl = void 0),
        (this.Ioh = 0),
        (this.vTa = 0),
        (this.K5r = Vector_1.Vector.Create()),
        (this.Q5r = Quat_1.Quat.Create()),
        (this.Ydl = Vector_1.Vector.Create()),
        (this.DVr = () => {
          this.RefreshSoarBoost(), this.Z5l();
        }),
        (this.hUe = (t, e) => {
          e === CharacterUnifiedStateTypes_1.ECharMoveState.Soar &&
            (this.Hte.ClearInput(),
            this.CalculateSoarQuat(),
            this.Q5r.RotateVector(Vector_1.Vector.UpVectorProxy, this.K5r),
            (this.t7l = !1),
            (this.SoarBalanceOn = !1),
            (this.zdl = !1),
            (this.p$l = 1),
            (this.Ioh = 0),
            (this.vTa = 0),
            this.Xte?.AddTag(410756488),
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Soar")),
            t === CharacterUnifiedStateTypes_1.ECharMoveState.Soar &&
              cpp_1.FKuroPerfSightHelper.EndExtTag("Soar"),
            this.RefreshSoarBoost(),
            this.Z5l();
        }),
        (this.Jdl = !1),
        (this.JustEnterSoarSplineMove = !1),
        (this.Zdl = Vector_1.Vector.Create()),
        (this.b6l = !1),
        (this.f$l = 1),
        (this.J5r = (t) => {
          this.Xte?.HasTag(921953316)
            ? this.o4o.CharacterMovement.KuroFlying(
                t,
                0,
                FLYING_FRICTION,
                FLYING_DECELERATION,
                FLYING_ACCELERATOR,
                FLYING_MAX_SPEED,
                FLYING_MAX_FALLING_SPEED,
              )
            : this.o4o.CharacterMovement.KuroFlying(
                t,
                FLYING_GRAVITY,
                FLYING_FRICTION,
                FLYING_DECELERATION,
                FLYING_ACCELERATOR,
                FLYING_MAX_SPEED,
                FLYING_MAX_FALLING_SPEED,
              );
        }),
        (this.z5r = (t) => {
          this.Xte?.HasTag(1151923109)
            ? ((this.zdl =
                void 0 !== this.Xdl &&
                this.Xdl.Active &&
                "AirPassage" === this.Xdl.CurrentSplineMoveType),
              this.E1l(Math.min(SOAR_MAX_DELTA, t)),
              (t = GravityUtils_1.GravityUtils.GetZnInGravityForActor(
                this.Hte,
                this.Hte.ActorVelocityProxy,
              )),
              (t =
                Math.asin(t / this.Hte.ActorVelocityProxy.Size()) *
                MathUtils_1.MathUtils.RadToDeg) >
              (CommonParamById_1.configCommonParamById.GetIntConfig(
                "SoarUpwardThreshold",
              ) ?? 30)
                ? (this.p$l = 2)
                : t >
                    (CommonParamById_1.configCommonParamById.GetIntConfig(
                      "SoarDownwardThreshold",
                    ) ?? -45)
                  ? (this.p$l = 1)
                  : (this.p$l = 0))
            : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "Flying_Tip_001",
              ),
              this.EnterGlideState());
        }),
        (this.OnStateInherit = (t, e) => {
          t?.Valid &&
            (t = t.GetComponent(58))?.Valid &&
            !e &&
            (this.K5r.DeepCopy(t.K5r),
            this.Q5r.DeepCopy(t.Q5r),
            (this.Ioh = t.Ioh),
            (this.vTa = t.vTa),
            (this.Bnh = t.Bnh));
        }),
        (this.eVr = (t, e) => {
          this.H5r?.SetParaglidingIsAscent(e);
        }),
        (this.o7l = (t, e) => {
          (this.i7l = e), this.RefreshSoarBoost();
        });
    }
    get SoarBoostOn() {
      return this.r7l;
    }
    RefreshSoarBoost() {
      var t =
        (this.t7l || this.i7l) &&
        void 0 !== this.Xte &&
        this.Xte.HasTag(-2027866845);
      this.r7l !== t &&
        ((this.r7l = t),
        this.r7l
          ? this.Xte?.AddTag(-54528961)
          : this.Xte?.RemoveTag(-54528961));
    }
    get zdl() {
      return this.Jdl;
    }
    set zdl(t) {
      this.Jdl !== t &&
        ((this.Jdl = t)
          ? ((this.JustEnterSoarSplineMove = !0),
            this.K5r.CrossProduct(this.Hte.ActorForwardProxy, this.Zdl),
            this.Zdl.CrossProductEqual(this.K5r),
            this.Zdl.Normalize() ||
              this.Zdl.DeepCopy(this.Hte.ActorForwardProxy),
            CharacterGlideComponent_1.Gue.Set(0, this.vTa, 0),
            CharacterGlideComponent_1.Gue.Quaternion(
              CharacterGlideComponent_1.az,
            ),
            this.Hte.ActorQuatProxy.Multiply(
              CharacterGlideComponent_1.az,
              CharacterGlideComponent_1.az,
            ),
            this.Hte.ActorQuatProxy.Inverse(CharacterGlideComponent_1.KJ),
            CharacterGlideComponent_1.KJ.RotateVector(this.Zdl, this.Zdl),
            CharacterGlideComponent_1.az.RotateVector(this.Zdl, this.Zdl),
            this.Xte?.AddTag(1200164239))
          : (this.Q5r.RotateVector(Vector_1.Vector.UpVectorProxy, this.K5r),
            (this.Ioh = 0),
            this.Hte.ActorQuatProxy.Inverse(CharacterGlideComponent_1.KJ),
            CharacterGlideComponent_1.KJ.RotateVector(
              this.Zdl,
              CharacterGlideComponent_1.Lz,
            ),
            (this.vTa =
              Math.atan2(
                CharacterGlideComponent_1.Lz.Y,
                CharacterGlideComponent_1.Lz.X,
              ) * MathUtils_1.MathUtils.RadToDeg),
            this.Xte?.RemoveTag(1200164239)),
        this.Z5l());
    }
    get T6l() {
      return this.b6l;
    }
    set T6l(t) {
      this.b6l !== t &&
        ((this.b6l = t)
          ? (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              exports.SOAR_AUTO_FLIGHT_PATH,
              UE.BP_CameraDrivenAutoFlightData_C,
            )) &&
            this.Entity.GetComponent(61)?.TurnOnCameraDrivenAutoFlightMode(t)
          : this.Entity.GetComponent(61)?.TurnOffCameraDrivenAutoFlightMode());
    }
    Z5l() {
      this.T6l =
        !this.zdl && void 0 !== this.Xte && this.Xte.HasTag(-2027866845);
    }
    get p$l() {
      return this.f$l;
    }
    set p$l(t) {
      this.f$l !== t &&
        (this.Xte &&
          (2 === this.f$l
            ? this.Xte.RemoveTag(-383538528)
            : 0 === this.f$l && this.Xte.RemoveTag(1886913275),
          2 === t
            ? this.Xte.AddTag(-383538528)
            : 0 === t && this.Xte.AddTag(1886913275)),
        (this.f$l = t));
    }
    E1l(e) {
      if (this.Hte && this.o4o) {
        this.Hkl.DebugDraw &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Test", 6, "Soar Move0", [
            "input",
            this.Hte.InputDirectProxy,
          ]);
        var i = this.o4o.CharacterMovement;
        if (i) {
          this.CalculateSoarQuat();
          let t = 0;
          switch (
            ((t = this.zdl ? this.eCl(e, i) : this.tCl(e, i)),
            this.Hte.ResetAllCachedTime(),
            t)
          ) {
            case 2:
              this.ExitSoarState(1);
              break;
            case 1:
              this.Bnh + this.Hkl.SoarHitWallExitTimeLength < Time_1.Time.Now &&
                this.ExitSoarState();
              break;
            default:
              this.Bnh = Time_1.Time.Now;
          }
        }
      }
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.CheckGetComponent(3)),
        (this.o4o = this.Entity.CheckGetComponent(176)),
        (this.H5r = this.Entity.CheckGetComponent(79)),
        (this.Xte = this.Entity.CheckGetComponent(203)),
        (this.oRe = this.Entity.CheckGetComponent(175)),
        (this.Xdl = this.Entity.GetComponent(106)),
        (this.Hkl = SoarConfigParams.SoarConfigBase),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.hUe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.DVr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveGlide,
          this.J5r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSoar,
          this.z5r,
        ),
        (this.j5r = this.Xte.ListenForTagAddOrRemove(-1819043374, this.eVr)),
        (this.e7l = this.Xte.ListenForTagAddOrRemove(1317391447, this.o7l)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.OnStateInherit,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.hUe,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.DVr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveGlide,
          this.J5r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveSoar,
          this.z5r,
        ),
        this.j5r.EndTask(),
        (this.j5r = void 0),
        this.e7l.EndTask(),
        (this.e7l = void 0),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.OnStateInherit,
        ),
        !0
      );
    }
    EnterGlideState() {
      this.Hte.Actor.KuroSetMovementMode({
        Mode: 6,
        CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE,
        Context: "[CharacterDriveVehicleComponent.EnterGlideState]",
      });
    }
    ExitGlideState() {
      this.Hte.Actor.KuroSetMovementMode({
        Mode: 3,
        CustomMode: 0,
        Context: "[CharacterDriveVehicleComponent.ExitGlideState]",
      });
    }
    EnterSoarState() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 6, "EnterSoarState", ["Entity", this.Entity.Id]),
        this.Hte.Actor.KuroSetMovementMode({
          Mode: 6,
          CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR,
          Context: "[CharacterDriveVehicleComponent.EnterSoarState]",
        });
    }
    ExitSoarState(t = 3) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "ExitSoarState",
          ["Entity", this.Entity.Id],
          ["NewMovementMode", t],
        ),
        this.Hte.Actor.KuroSetMovementMode({
          Mode: t,
          CustomMode: 0,
          Context: "[CharacterDriveVehicleComponent.ExitSoarState]",
        });
    }
    CalculateSoarQuat() {
      var t, e, i;
      this.Hte.ActorVelocityProxy.IsNearlyZero()
        ? this.Q5r.DeepCopy(this.Hte.ActorQuatProxy)
        : ((t = CharacterGlideComponent_1.Lz).DeepCopy(
            this.Hte.ActorVelocityProxy,
          ),
          (e = CharacterGlideComponent_1.Tz).DeepCopy(
            this.Hte.ActorVelocityProxy,
          ),
          (i = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
            this.Hte,
            e,
          )),
          e.SizeSquared() < SOAR_TURN_SPEED_SQR_THRESHOLD
            ? (CharacterGlideComponent_1.Tz.DeepCopy(
                this.Hte.ActorForwardProxy,
              ),
              0 < i && CharacterGlideComponent_1.Tz.MultiplyEqual(-1),
              MathUtils_1.MathUtils.LookRotationForwardFirst(
                t,
                CharacterGlideComponent_1.Tz,
                this.Q5r,
              ))
            : MathUtils_1.MathUtils.LookRotationForwardFirst(
                t,
                this.Hte?.MoveComp
                  ? this.Hte.MoveComp.GravityUp
                  : Vector_1.Vector.UpVectorProxy,
                this.Q5r,
              ));
    }
    MTa(t, e) {
      !MathUtils_1.MathUtils.IsNearlyZero(this.vTa) &&
        this.Hte &&
        ((e = this.vTa * (1 - Math.pow(1 - this.Hkl.SoarRotateLerp, e))),
        CharacterGlideComponent_1.Gue.Set(0, e, 0),
        this.Hte.ActorQuatProxy.Inverse(CharacterGlideComponent_1.az),
        this.Hte.AddActorLocalRotation(
          CharacterGlideComponent_1.Gue.ToUeRotator(),
        ),
        CharacterGlideComponent_1.az.RotateVector(this.K5r, this.K5r),
        this.Hte.ActorQuatProxy.RotateVector(this.K5r, this.K5r),
        CharacterGlideComponent_1.az.Multiply(this.Q5r, this.Q5r),
        this.Hte.ActorQuatProxy.Multiply(this.Q5r, this.Q5r),
        CharacterGlideComponent_1.az.RotateVector(
          this.Hte.ActorVelocityProxy,
          CharacterGlideComponent_1.Lz,
        ),
        (CharacterGlideComponent_1.Lz.X =
          CharacterGlideComponent_1.Lz.Size2D()),
        (CharacterGlideComponent_1.Lz.Y = 0),
        this.Hte.ActorQuatProxy.RotateVector(
          CharacterGlideComponent_1.Lz,
          CharacterGlideComponent_1.Tz,
        ),
        this.Hte.SetActorVelocity(CharacterGlideComponent_1.Tz),
        (this.vTa -= e),
        this.Hkl.DebugDraw) &&
        (CharacterGlideComponent_1.Gue.Set(0, this.vTa, 0),
        CharacterGlideComponent_1.Gue.Quaternion(CharacterGlideComponent_1.az),
        this.Hte.ActorQuatProxy.Multiply(
          CharacterGlideComponent_1.az,
          CharacterGlideComponent_1.KJ,
        ),
        CharacterGlideComponent_1.KJ.GetForwardVector(
          CharacterGlideComponent_1.Lz,
        ),
        CharacterGlideComponent_1.Lz.MultiplyEqual(100),
        CharacterGlideComponent_1.Lz.AdditionEqual(this.Hte.ActorLocationProxy),
        UE.KismetSystemLibrary.D_DrawDebugArrow(
          this.Hte.Actor,
          this.Hte.ActorLocation,
          CharacterGlideComponent_1.Lz.ToUeVector(),
          100,
          blueColor,
          void 0,
          10,
        ));
    }
    ija(t, e) {
      var i = this.Hte.ActorVelocityProxy,
        h = i.SizeSquared();
      MathUtils_1.MathUtils.IsNearlyZero(h) ||
        ((h = Math.sqrt(h)),
        (e = Math.min(
          h + e * this.Hkl.SoarBoostAccel,
          this.zdl && 0 < this.Xdl.CurrentSplineMoveParams.SoarSprintLimit
            ? this.Xdl.CurrentSplineMoveParams.SoarSprintLimit
            : this.Hkl.SoarMaxSpeed,
        )),
        i.Multiply(e / h, CharacterGlideComponent_1.Lz),
        this.Hkl.DebugDraw &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            6,
            "Soar Boost",
            ["OffsetVector", CharacterGlideComponent_1.Lz],
            ["oldSpeed", h],
            ["newSpeed", e],
            ["TmpVelocity", i],
            ["v", t.Velocity],
          ),
        this.Hte.SetActorVelocity(CharacterGlideComponent_1.Lz));
    }
    tNa(t, i) {
      if (this.Hte && !(0 < this.Hte.InputDirectProxy.X)) {
        let t = 0,
          e = 0;
        var h,
          s = this.Hte.InputDirectProxy.X > this.Hkl.SoarBalanceInputThreshold,
          o =
            ((t = s
              ? ((e = this.Hkl.SoarBalanceSpeed2),
                this.Hkl.SoarBalanceSpeedThreshold2)
              : ((e = this.Hkl.SoarBalanceSpeed),
                this.Hkl.SoarBalanceSpeedThreshold)),
            this.Hte.ActorVelocityProxy),
          a = o.SizeSquared();
        a > t * t ||
          (s
            ? (CharacterGlideComponent_1.Lz.DeepCopy(o),
              CharacterGlideComponent_1.Lz.MultiplyEqual(e / Math.sqrt(a)))
            : this.Hte.ActorQuatProxy.RotateVector(
                this.Hkl.SoarBalanceVelocity,
                CharacterGlideComponent_1.Lz,
              ),
          CharacterGlideComponent_1.Lz.SubtractionEqual(o),
          (s = CharacterGlideComponent_1.Lz.SizeSquared()),
          (a = Math.abs(o.Size() - e)),
          (h = MathUtils_1.MathUtils.RangeClamp(
            a,
            0,
            this.Hkl.SoarBalanceAccelOffset,
            this.Hkl.SoarBalanceAccelMin,
            this.Hkl.SoarBalanceAccelMax,
          )),
          (this.SoarBalanceOn = !0),
          this.Hkl.DebugDraw &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Movement",
              6,
              "Soar BALANCE",
              ["OffsetVector", CharacterGlideComponent_1.Lz],
              ["speedOffset", a],
              ["accel", h],
            ),
          h * h * i * i < s &&
            CharacterGlideComponent_1.Lz.MultiplyEqual((h * i) / Math.sqrt(s)),
          CharacterGlideComponent_1.Lz.AdditionEqual(o),
          this.Hte.SetActorVelocity(CharacterGlideComponent_1.Lz));
      }
    }
    SetSoarBoostOn(t) {
      (this.t7l = t && void 0 !== this.Xte && !this.Xte.HasTag(1601406518)),
        this.RefreshSoarBoost();
    }
    iCl(t, e) {
      var i, h, s;
      this.Hte &&
        ((i = Math.pow(
          1 -
            (this.t7l ? this.Hkl.SoarBoostNormalLerp : this.Hkl.SoarNormalLerp),
          t,
        )),
        (this.Ioh *= i),
        this.Hte.ActorQuatProxy.Inverse(CharacterGlideComponent_1.az),
        CharacterGlideComponent_1.az.RotateVector(
          this.K5r,
          CharacterGlideComponent_1.Lz,
        ),
        (i =
          Math.atan2(
            Math.sqrt(
              MathUtils_1.MathUtils.Square(CharacterGlideComponent_1.Lz.Z) +
                MathUtils_1.MathUtils.Square(CharacterGlideComponent_1.Lz.Y),
            ),
            CharacterGlideComponent_1.Lz.X,
          ) * MathUtils_1.MathUtils.RadToDeg),
        this.Q5r.RotateVector(
          Vector_1.Vector.UpVectorProxy,
          CharacterGlideComponent_1.Lz,
        ),
        (s = CharacterGlideComponent_1.Lz.DotProduct(this.Hte.ActorUpProxy)),
        (h = CharacterGlideComponent_1.Lz.DotProduct(
          this.Hte.ActorForwardProxy,
        )),
        (s = Math.atan2(s, h) * MathUtils_1.MathUtils.RadToDeg),
        (h = MathUtils_1.MathUtils.Clamp(
          i,
          s - this.Hkl.SoarInputNormalAngleMax,
          s + this.Hkl.SoarInputNormalAngleMax,
        )),
        (s = MathUtils_1.MathUtils.InterpConstantTo(
          h,
          this.Hkl.SoarPitchMin,
          t,
          this.Hkl.SoarNormalSpeedNoInput,
        )),
        this.Hkl.DebugDraw &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            6,
            "Soar NormalWithoutInput",
            ["oldPitch", i],
            ["clampPitch", h],
            ["newPitch", s],
          ),
        (t = s * MathUtils_1.MathUtils.DegToRad),
        (CharacterGlideComponent_1.Lz.X = Math.cos(t)),
        (CharacterGlideComponent_1.Lz.Y = 0),
        (CharacterGlideComponent_1.Lz.Z = Math.sin(t)),
        this.Hte.ActorQuatProxy.RotateVector(
          CharacterGlideComponent_1.Lz,
          this.K5r,
        ));
    }
    Zhh(t, e, i) {
      var h, s, o;
      this.Hte &&
        ((i = MathUtils_1.MathUtils.RangeClamp(
          i,
          this.Hkl.SoarSpeedThresholdMin,
          this.Hkl.SoarSpeedThresholdMax,
          this.Hkl.SoarInputNormalAngleMin,
          this.Hkl.SoarInputNormalAngleMax,
        )),
        this.Hte.ActorQuatProxy.Inverse(CharacterGlideComponent_1.az),
        CharacterGlideComponent_1.az.RotateVector(
          this.K5r,
          CharacterGlideComponent_1.Lz,
        ),
        (h =
          Math.atan2(
            CharacterGlideComponent_1.Lz.Z,
            CharacterGlideComponent_1.Lz.X,
          ) * MathUtils_1.MathUtils.RadToDeg),
        this.Q5r.RotateVector(
          Vector_1.Vector.UpVectorProxy,
          CharacterGlideComponent_1.Tz,
        ),
        CharacterGlideComponent_1.az.RotateVector(
          CharacterGlideComponent_1.Tz,
          CharacterGlideComponent_1.Lz,
        ),
        (o =
          Math.atan2(
            CharacterGlideComponent_1.Lz.Z,
            CharacterGlideComponent_1.Lz.X,
          ) * MathUtils_1.MathUtils.RadToDeg),
        (s = -this.Ydl.X * i + o),
        this.Hkl.DebugDraw &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            6,
            "Soar Normal",
            ["InputAngle", i],
            ["currentAngle", h],
            ["baseAngle", o],
            ["OffsetNormalAngle", this.Ioh],
            ["targetAngle", s],
          ),
        (i = s - (h + this.Ioh)),
        (o =
          (this.t7l
            ? this.Hkl.SoarBoostNormalSpeed
            : this.Hkl.SoarNormalSpeed) * t),
        Math.abs(i) < o ? (this.Ioh += i) : (this.Ioh += Math.sign(i) * o),
        (s = Math.pow(
          1 -
            (this.t7l ? this.Hkl.SoarBoostNormalLerp : this.Hkl.SoarNormalLerp),
          t,
        )),
        (i = MathUtils_1.MathUtils.Clamp(
          h + this.Ioh * (1 - s),
          this.Hkl.SoarPitchMin,
          this.Hkl.SoarPitchMax,
        )),
        (this.Ioh *= s),
        (o = i * MathUtils_1.MathUtils.DegToRad),
        (CharacterGlideComponent_1.Lz.X = Math.cos(o)),
        (CharacterGlideComponent_1.Lz.Y = 0),
        (CharacterGlideComponent_1.Lz.Z = Math.sin(o)),
        this.Hte.ActorQuatProxy.RotateVector(
          CharacterGlideComponent_1.Lz,
          this.K5r,
        ),
        this.Hkl.DebugDraw) &&
        ((CharacterGlideComponent_1.Lz.X =
          100 * Math.cos((i + this.Ioh) * MathUtils_1.MathUtils.DegToRad)),
        (CharacterGlideComponent_1.Lz.Y = 0),
        (CharacterGlideComponent_1.Lz.Z =
          100 * Math.sin((i + this.Ioh) * MathUtils_1.MathUtils.DegToRad)),
        this.Hte.ActorQuatProxy.RotateVector(
          CharacterGlideComponent_1.Lz,
          CharacterGlideComponent_1.Tz,
        ),
        CharacterGlideComponent_1.Tz.AdditionEqual(this.Hte.ActorLocationProxy),
        UE.KismetSystemLibrary.D_DrawDebugArrow(
          this.Hte.Actor,
          this.Hte.ActorLocation,
          CharacterGlideComponent_1.Tz.ToUeVector(),
          100,
          blueColor,
          void 0,
          10,
        ));
    }
    tCl(e, i) {
      if (!this.Hte) return 0;
      this.SoarBalanceOn = !1;
      var t = this.oRe?.HasKuroRootMotion,
        h = this.Hte.ActorVelocityProxy.Size();
      if (t)
        this.Q5r.RotateVector(Vector_1.Vector.UpVectorProxy, this.K5r),
          (this.Ioh = 0),
          (this.vTa = 0);
      else {
        this.Ydl.DeepCopy(this.Hte.InputDirectProxy);
        let t = this.Ydl.SizeSquared2D();
        (t = 1 < t ? 1 : Math.sqrt(t)),
          (this.Ydl.X = MathUtils_1.MathUtils.Clamp(
            this.Ydl.X / COS_45,
            -t,
            t,
          )),
          (this.Ydl.Y = MathUtils_1.MathUtils.Clamp(
            this.Ydl.Y / COS_45,
            -t,
            t,
          )),
          MathUtils_1.MathUtils.IsNearlyZero(this.Ydl.X)
            ? this.iCl(e, i)
            : this.Zhh(e, i, h),
          (this.vTa = MathUtils_1.MathUtils.Clamp(
            this.vTa + this.Ydl.Y * this.Hkl.SoarRotateSpeed * e,
            -90,
            90,
          )),
          this.MTa(i, e),
          this.SoarBoostOn ? this.ija(i, e) : this.tNa(i, e);
      }
      return (
        this.Hkl.DebugDraw &&
          (this.Hte.ActorLocationProxy.Addition(
            this.Hte.ActorVelocityProxy,
            CharacterGlideComponent_1.Lz,
          ),
          UE.KismetSystemLibrary.D_DrawDebugArrow(
            this.Hte.Actor,
            this.Hte.ActorLocation,
            CharacterGlideComponent_1.Lz.ToUeVector(),
            100,
            redColor,
            void 0,
            10,
          ),
          this.K5r.Multiply(100, CharacterGlideComponent_1.Lz),
          CharacterGlideComponent_1.Lz.AdditionEqual(
            this.Hte.ActorLocationProxy,
          ),
          UE.KismetSystemLibrary.D_DrawDebugArrow(
            this.Hte.Actor,
            this.Hte.ActorLocation,
            CharacterGlideComponent_1.Lz.ToUeVector(),
            100,
            greenColor,
            void 0,
            10,
          ),
          (t = this.Hte.ActorVelocityProxy),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Movement",
            6,
            "Soar",
            ["Speed", t.Size()],
            ["Planar", t.Size2D()],
            ["Z", t.Z],
          ),
        this.o4o.GravityDirect.Multiply(
          this.Hkl.SoarGravityValue,
          CharacterGlideComponent_1.Lz,
        ),
        UE.KuroMovementBPLibrary.KuroSoar(
          e,
          i,
          this.Hkl.SoarAirFriction,
          MathUtils_1.MathUtils.RangeClamp(
            h,
            this.Hkl.SoarSpeedThresholdMin,
            this.Hkl.SoarSpeedThresholdMax,
            this.Hkl.SoarAerodynamicsMin,
            this.Hkl.SoarAerodynamicsMax,
          ),
          CharacterGlideComponent_1.Lz.ToUeVectorOld(),
          this.K5r.ToUeVectorOld(),
          this.Hkl.SoarMaxSpeed,
        )
      );
    }
    eCl(t, e) {
      var i = this.Hte,
        h = this.Xdl,
        s = this.oRe?.HasKuroRootMotion,
        o = !i.InputDirectProxy.IsNearlyZero();
      const a = i.ActorVelocityProxy;
      var r = a.Size(),
        n = h.CurrentSplineMoveParams,
        s =
          (s || !o
            ? ((s = 0 < h.SplineDirection.DotProduct(a)),
              (o = n.SplineAnalyzeData.GetKeyTimeByLengthOffset(
                h.SplineTimeKey,
                Math.max(this.Hkl.SoarSplineMinSpeed, r) * (s ? 0.5 : -0.5),
              )),
              this.Hkl.DebugDraw &&
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Test",
                    6,
                    "Soar Spline",
                    ["CurrentKeyTime", h.SplineTimeKey],
                    ["Predict", o],
                  ),
                UE.KismetSystemLibrary.D_DrawDebugArrow(
                  i.Actor,
                  i.ActorLocation,
                  CharacterGlideComponent_1.Lz.ToUeVector(),
                  100,
                  greenColor,
                  void 0,
                  10,
                )),
              CharacterGlideComponent_1.Lz.FromUeVector(
                n.Spline.GetDirectionAtSplineInputKey(o, 1),
              ),
              s || CharacterGlideComponent_1.Lz.MultiplyEqual(-1),
              MathUtils_1.MathUtils.SqInterpToVector(
                this.Zdl,
                CharacterGlideComponent_1.Lz,
                this.Hkl.SoarSplineRotateAngleSpeedWithoutInput * t,
                this.Zdl,
              ))
            : (CharacterGlideComponent_1.Lz.Set(
                this.Hkl.SoarSplineInputAngleCos,
                this.Hkl.SoarSplineInputAngleSin * i.InputDirectProxy.Y,
                -this.Hkl.SoarSplineInputAngleSin * i.InputDirectProxy.X,
              ),
              CharacterGlideComponent_1.Lz.Normalize(),
              this.Q5r.RotateVector(
                CharacterGlideComponent_1.Lz,
                CharacterGlideComponent_1.Lz,
              ),
              this.Hte.ActorQuatProxy.Inverse(CharacterGlideComponent_1.az),
              CharacterGlideComponent_1.az.RotateVector(
                CharacterGlideComponent_1.Lz,
                CharacterGlideComponent_1.Tz,
              ),
              CharacterGlideComponent_1.Tz.X <
                this.Hkl.SoarSplineInputDirectMinX &&
                ((CharacterGlideComponent_1.Tz.X =
                  this.Hkl.SoarSplineInputDirectMinX),
                1 <= (o = CharacterGlideComponent_1.Tz.SizeSquared2D())
                  ? ((CharacterGlideComponent_1.Tz.Y =
                      Math.sign(CharacterGlideComponent_1.Tz.Y) *
                      Math.sqrt(
                        1 -
                          CharacterGlideComponent_1.Tz.X *
                            CharacterGlideComponent_1.Tz.X,
                      )),
                    (CharacterGlideComponent_1.Tz.Z = 0))
                  : (CharacterGlideComponent_1.Tz.Z =
                      Math.sign(CharacterGlideComponent_1.Tz.Z) *
                      Math.sqrt(1 - o)),
                this.Hte.ActorQuatProxy.RotateVector(
                  CharacterGlideComponent_1.Tz,
                  CharacterGlideComponent_1.Lz,
                )),
              MathUtils_1.MathUtils.SqInterpToVector(
                this.Zdl,
                CharacterGlideComponent_1.Lz,
                this.Hkl.SoarSplineRotateAngleSpeedWithInput * t,
                this.Zdl,
              )),
          MathUtils_1.MathUtils.SqLerpVector(
            a,
            this.Zdl,
            1 - Math.pow(1 - this.Hkl.SoarSplineRotateLerp, t),
            CharacterGlideComponent_1.Lz,
          ),
          i.SetActorVelocity(CharacterGlideComponent_1.Lz),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            CharacterGlideComponent_1.Lz,
            i.MoveComp.GravityUp,
            CharacterGlideComponent_1.KJ,
          ),
          CharacterGlideComponent_1.KJ.Rotator(CharacterGlideComponent_1.Gue),
          i.SetActorRotation(
            CharacterGlideComponent_1.Gue.ToUeRotator(),
            "SoarSpline",
            !1,
          ),
          Math.acos(Math.abs(h.SplineDirection.DotProduct(a))) *
            MathUtils_1.MathUtils.RadToDeg),
        o = (s / 45 - 1) * this.Hkl.SoarSplineAccel,
        s = MathUtils_1.MathUtils.Clamp(
          r + o * t,
          this.Hkl.SoarSplineMinSpeed,
          this.SoarBoostOn && 0 < n.SoarSprintLimit
            ? n.SoarSprintLimit
            : n.MaxSoarSplineSpeed,
        );
      if (
        (a.Multiply(s / a.Size(), CharacterGlideComponent_1.Lz),
        i.SetActorVelocity(CharacterGlideComponent_1.Lz),
        t > MathUtils_1.MathUtils.SmallNumber &&
          (h.SplineLocation.Subtraction(
            i.ActorLocationProxy,
            CharacterGlideComponent_1.Lz,
          ),
          (r = CharacterGlideComponent_1.Lz.Size()),
          (o = MathUtils_1.MathUtils.RangeClamp(
            r,
            this.Hkl.SoarSplinePushCenterDistMin,
            this.Hkl.SoarSplinePushCenterDistMax,
            this.Hkl.SoarSplinePushCenterSpeedMin,
            this.Hkl.SoarSplinePushCenterSpeedMax,
          )),
          CharacterGlideComponent_1.Lz.MultiplyEqual(Math.min(1, (o * t) / r)),
          i.MoveComp.MoveCharacter(
            CharacterGlideComponent_1.Lz,
            t,
            "Soar.Spline.Push",
          )),
        this.SoarBoostOn && this.ija(e, t),
        this.Hkl.DebugDraw)
      ) {
        const a = i.ActorVelocityProxy;
        i.ActorLocationProxy.Addition(a, CharacterGlideComponent_1.Lz),
          UE.KismetSystemLibrary.D_DrawDebugArrow(
            i.Actor,
            i.ActorLocation,
            CharacterGlideComponent_1.Lz.ToUeVector(),
            100,
            redColor,
            void 0,
            10,
          ),
          this.Zdl.Multiply(100, CharacterGlideComponent_1.Lz),
          CharacterGlideComponent_1.Lz.AdditionEqual(i.ActorLocationProxy),
          UE.KismetSystemLibrary.D_DrawDebugArrow(
            i.Actor,
            i.ActorLocation,
            CharacterGlideComponent_1.Lz.ToUeVector(),
            100,
            blueColor,
            void 0,
            10,
          );
        s = a;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Movement",
            6,
            "Soar Spline",
            ["Speed", s.Size()],
            ["Planar", s.Size2D()],
            ["Z", s.Z],
          );
      }
      return UE.KuroMovementBPLibrary.KuroSoar(
        t,
        e,
        n.SoarFriction,
        0,
        Vector_1.Vector.ZeroVector,
        Vector_1.Vector.ZeroVector,
        this.SoarBoostOn && 0 < n.SoarSprintLimit
          ? n.SoarSprintLimit
          : n.MaxSoarSplineSpeed,
      );
    }
  });
(CharacterGlideComponent.Lz = Vector_1.Vector.Create()),
  (CharacterGlideComponent.Tz = Vector_1.Vector.Create()),
  (CharacterGlideComponent.Gue = Rotator_1.Rotator.Create()),
  (CharacterGlideComponent.az = Quat_1.Quat.Create()),
  (CharacterGlideComponent.KJ = Quat_1.Quat.Create()),
  (CharacterGlideComponent = CharacterGlideComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(58)],
      CharacterGlideComponent,
    )),
  (exports.CharacterGlideComponent = CharacterGlideComponent);
//# sourceMappingURL=CharacterGlideComponent.js.map
