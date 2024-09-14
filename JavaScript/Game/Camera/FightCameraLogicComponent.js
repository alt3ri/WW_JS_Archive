"use strict";
var FightCameraLogicComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, h) {
      var e,
        r = arguments.length,
        a =
          r < 3
            ? i
            : null === h
              ? (h = Object.getOwnPropertyDescriptor(i, s))
              : h;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, i, s, h);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (e = t[o]) &&
            (a = (r < 3 ? e(a) : 3 < r ? e(i, s, a) : e(i, s)) || a);
      return 3 < r && a && Object.defineProperty(i, s, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FightCameraLogicComponent =
    exports.VirtualCamera =
    exports.CLEAN_TARGET_SPEED_THRESHOLD =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  Time_1 = require("../../Core/Common/Time"),
  CommonParamById_1 = require("../../Core/Define/ConfigCommon/CommonParamById"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  CurveUtils_1 = require("../../Core/Utils/Curve/CurveUtils"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  Global_1 = require("../Global"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  PhotographController_1 = require("../Module/Photograph/PhotographController"),
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
  CharacterLockOnComponent_1 = require("../NewWorld/Character/Common/Component/LockOn/CharacterLockOnComponent"),
  RenderUtil_1 = require("../Render/Utils/RenderUtil"),
  ColorUtils_1 = require("../Utils/ColorUtils"),
  GravityUtils_1 = require("../Utils/GravityUtils"),
  CameraCollision_1 = require("./CameraCollision"),
  CameraController_1 = require("./CameraController"),
  CameraUtility_1 = require("./CameraUtility"),
  CameraAdjustController_1 = require("./FightCameraController/CameraAdjustController"),
  CameraAutoController_1 = require("./FightCameraController/CameraAutoController"),
  CameraClimbController_1 = require("./FightCameraController/CameraClimbController"),
  CameraConfigController_1 = require("./FightCameraController/CameraConfigController"),
  CameraDialogueController_1 = require("./FightCameraController/CameraDialogueController"),
  CameraExploreController_1 = require("./FightCameraController/CameraExploreController"),
  CameraFixedController_1 = require("./FightCameraController/CameraFixedController"),
  CameraFocusController_1 = require("./FightCameraController/CameraFocusController"),
  CameraGuideController_1 = require("./FightCameraController/CameraGuideController"),
  CameraHookController_1 = require("./FightCameraController/CameraHookController"),
  CameraInputController_1 = require("./FightCameraController/CameraInputController"),
  CameraModifyController_1 = require("./FightCameraController/CameraModifyController"),
  CameraRotatorController_1 = require("./FightCameraController/CameraRotatorController"),
  CameraSidestepController_1 = require("./FightCameraController/CameraSidestepController"),
  CameraSpecialGameplayController_1 = require("./FightCameraController/CameraSpecialGameplayController"),
  CameraSplineMoveController_1 = require("./FightCameraController/CameraSplineMoveController"),
  SettlementCamera_1 = require("./SettlementCamera"),
  CONFIG_PATH =
    "/Game/Aki/Data/Camera/DA_FightcameraConfig.DA_FightCameraConfig",
  MOBILE_CONFIG_PATH =
    "/Game/Aki/Data/Camera/DA_FightCameraConfig_Mobile.DA_FightCameraConfig_Mobile",
  CAMERA_LOCATION_NEARLY_DISTANCE = 1,
  LOOK_AT_FORWARD_DISTANCE = 1e3,
  RESET_FOCUS_ROTATION_TIME = 0.2,
  MAX_TARGET_HAS_BLOCK_TIME = 1e3,
  SHOW_TARGET_VALID_TIME = 100,
  BREAK_BLEND_OUT_TIME = 0.2,
  LANDSCAPE_LOD_SCALE_FOV = 80,
  PITCH_LIMIT_VALUE = 89.9,
  POINT_SIZE = 20,
  LINELEHGTH = 2e3,
  LINE_SIZE = 5,
  CIRCLE_SEGMENT = 48;
exports.CLEAN_TARGET_SPEED_THRESHOLD = 70;
class VirtualCamera {
  constructor() {
    (this.ArmOffset = Vector_1.Vector.Create()),
      (this.ArmLength = 0),
      (this.MinArmLength = 0),
      (this.MaxArmLength = 0),
      (this.YawLimitMin = 0),
      (this.YawLimitMax = 0),
      (this.PitchLimitMin = 0),
      (this.PitchLimitMax = 0),
      (this.LookDownOffsetZ = 0),
      (this.LookUpOffsetZ = 0),
      (this.CameraOffset = Vector_1.Vector.Create()),
      (this.Fov = 0),
      (this.ArmLocation = Vector_1.Vector.Create()),
      (this.ArmRotation = Rotator_1.Rotator.Create()),
      (this.ZoomModifier = 1),
      (this.WorldYawMin = 0),
      (this.WorldYawMax = 0);
  }
  ClearObject() {
    return !0;
  }
}
exports.VirtualCamera = VirtualCamera;
let FightCameraLogicComponent =
  (FightCameraLogicComponent_1 = class FightCameraLogicComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.ArmLength = 0),
        (this.ArmOffsetX = 0),
        (this.ArmOffsetY = 0),
        (this.ArmOffsetZ = 0),
        (this.MinArmLength = 0),
        (this.MaxArmLength = 0),
        (this.CameraOffsetX = 0),
        (this.CameraOffsetY = 0),
        (this.CameraOffsetZ = 0),
        (this.Fov = 0),
        (this.CameraLocationFadeTime = 0),
        (this.CollisionProbeSize = 0),
        (this.NearCollisionProbeSize = 0),
        (this.CurrentCollisionSize = 0),
        (this.CheckCollisionProbeSize = 0),
        (this.CheckWidth = 0),
        (this.CollisionAdditionalHeightInWater = 0),
        (this.DefaultPitchHorizontalOffset = 0),
        (this.DefaultPitchVerticalOffset = 0),
        (this.DefaultPitchInRangeMin = 0),
        (this.DefaultPitchInRangeCenter = 0),
        (this.DefaultPitchInRangeMax = 0),
        (this.DefaultPitchOutRangeMin = 0),
        (this.DefaultPitchOutRangeCenter = 0),
        (this.DefaultPitchOutRangeMax = 0),
        (this.FloatUpArmLengthMin = 0),
        (this.FloatUpArmLengthMax = 0),
        (this.MaxDistance = 0),
        (this.InSpeed = 0),
        (this.OutSpeed = 0),
        (this.CenterCollisionSize = 0),
        (this.CollisionSizePercentage = 0),
        (this.SPn = 0),
        (this.yPn = 0),
        (this.CompleteHideDistance = 0),
        (this.StartHidePitch = 0),
        (this.CompleteHidePitch = 0),
        (this.StartDitherValue = 0),
        (this.YawLimitMin = 0),
        (this.YawLimitMax = 0),
        (this.PitchLimitMin = 0),
        (this.PitchLimitMax = 0),
        (this.LookDownOffsetZ = 0),
        (this.LookUpOffsetZ = 0),
        (this.ArmCenterUpSpeedMin = 0),
        (this.ArmCenterUpSpeedMax = 0),
        (this.ArmCenterUpEdgeMin = 0),
        (this.ArmCenterUpEdgeMax = 0),
        (this.ArmCenterUpCurve = void 0),
        (this.ArmCenterForwardSpeedMin = 0),
        (this.ArmCenterForwardSpeedMax = 0),
        (this.ArmCenterForwardEdgeMin = 0),
        (this.ArmCenterForwardEdgeMax = 0),
        (this.ArmCenterForwardCurve = void 0),
        (this.ArmCenterRightSpeedMin = 0),
        (this.ArmCenterRightSpeedMax = 0),
        (this.ArmCenterRightEdgeMin = 0),
        (this.ArmCenterRightEdgeMax = 0),
        (this.ArmCenterRightCurve = void 0),
        (this.InitialCameraPitch = 0),
        (this.CameraRotateToTargetMinAlpha = 0),
        (this.CameraRotateToTargetMaxAlpha = 0),
        (this.CameraRotateToTargetCurve = void 0),
        (this.IsDisableResetFocus = 0),
        (this.AdditionPitchMax = 0),
        (this.AdditionPitchMin = 0),
        (this.AdditionPitchDeltaHeight = 0),
        (this.AdditionPitchCurve = void 0),
        (this.WorldYawMin = 0),
        (this.WorldYawMax = 0),
        (this.cPr = !1),
        (this.Character = void 0),
        (this.CharacterController = void 0),
        (this.CharacterEntityHandle = void 0),
        (this.mPr = void 0),
        (this.gDn = !1),
        (this.FollowShooterEntityHandle = void 0),
        (this.FollowShooterTagComponentInternal = void 0),
        (this.TargetEntity = void 0),
        (this.dPr = void 0),
        (this.TargetSocketName = void 0),
        (this.CPr = void 0),
        (this.IsFollowing = !0),
        (this.ArmLocationFadeElapseTime = -0),
        (this.PlayerRotator = Rotator_1.Rotator.Create()),
        (this.PlayerLocation = Vector_1.Vector.Create()),
        (this.TargetLocation = Vector_1.Vector.Create()),
        (this.TmpArmLocation = Vector_1.Vector.Create()),
        (this.gPr = !1),
        (this.fPr = -0),
        (this.Fading = !1),
        (this.EUo = !1),
        (this.pPr = !1),
        (this.vPr = !1),
        (this.MPr = !1),
        (this.pUo = -0),
        (this.MUo = void 0),
        (this.IsUniqueFade = !1),
        (this.vUo = -0),
        (this.CurrentCamera = new VirtualCamera()),
        (this.CameraLocation = Vector_1.Vector.Create()),
        (this.CameraForward = Vector_1.Vector.Create()),
        (this.LastCamera = new VirtualCamera()),
        (this.DesiredCamera = new VirtualCamera()),
        (this.DebugDesiredCameraProps = new Map()),
        (this.DebugCurrentCameraProps = new Map()),
        (this.DebugLogicComponentsProps = new Map()),
        (this.DebugControllersProps = new Map()),
        (this.DebugControllerModifications = new Map()),
        (this.DebugCameraPropsRaw = void 0),
        (this.CameraConfigController =
          new CameraConfigController_1.CameraConfigController(this)),
        (this.CameraFocusController =
          new CameraFocusController_1.CameraFocusController(this)),
        (this.CameraInputController =
          new CameraInputController_1.CameraInputController(this)),
        (this.CameraModifyController =
          new CameraModifyController_1.CameraModifyController(this)),
        (this.CameraAdjustController =
          new CameraAdjustController_1.CameraAdjustController(this)),
        (this.CameraSidestepController =
          new CameraSidestepController_1.CameraSidestepController(this)),
        (this.CameraAutoController =
          new CameraAutoController_1.CameraAutoController(this)),
        (this.CameraGuideController =
          new CameraGuideController_1.CameraGuideController(this)),
        (this.CameraRunningController =
          new CameraExploreController_1.CameraExploreController(this)),
        (this.CameraRotatorController =
          new CameraRotatorController_1.CameraRotatorController(this)),
        (this.CameraDialogueController =
          new CameraDialogueController_1.CameraDialogueController(this)),
        (this.CameraFixedController =
          new CameraFixedController_1.CameraFixedController(this)),
        (this.CameraClimbController =
          new CameraClimbController_1.CameraClimbController(this)),
        (this.CameraHookController =
          new CameraHookController_1.CameraHookController(this)),
        (this.CameraSplineMoveController =
          new CameraSplineMoveController_1.CameraSplineMoveController(this)),
        (this.CameraSpecialGameplayController =
          new CameraSpecialGameplayController_1.CameraSpecialGameplayController(
            this,
          )),
        (this.EPr = [
          this.CameraConfigController,
          this.CameraModifyController,
          this.CameraInputController,
          this.CameraFocusController,
          this.CameraHookController,
          this.CameraDialogueController,
          this.CameraFixedController,
          this.CameraGuideController,
          this.CameraAdjustController,
          this.CameraSidestepController,
          this.CameraAutoController,
          this.CameraRunningController,
          this.CameraClimbController,
          this.CameraSplineMoveController,
          this.CameraRotatorController,
          this.CameraSpecialGameplayController,
        ]),
        (this.CameraRotation = Rotator_1.Rotator.Create()),
        (this.IsModifiedArmLocation = !1),
        (this.IsModifiedArmLength = !1),
        (this.IsModifiedArmOffset = !1),
        (this.IsModifiedZoomModifier = !1),
        (this.IsModifiedArmRotationYaw = !1),
        (this.IsModifiedArmRotationPitch = !1),
        (this.IsModifiedArmRotationRoll = !1),
        (this.IsModifiedCameraOffset = !1),
        (this.IsModifiedFov = !1),
        (this.SPr = 0),
        (this.ele = void 0),
        (this.yPr = Vector_1.Vector.Create()),
        (this.Z8a = Vector_1.Vector.Create()),
        (this.eVa = Vector_1.Vector.Create()),
        (this.tVa = Quat_1.Quat.Create()),
        (this.iVa = Quat_1.Quat.Create()),
        (this.TempVector = Vector_1.Vector.Create()),
        (this.TempVector2 = Vector_1.Vector.Create()),
        (this.TempVector3 = Vector_1.Vector.Create()),
        (this.TempRotator = Rotator_1.Rotator.Create()),
        (this.TempQuat = Quat_1.Quat.Create()),
        (this.TempQuat2 = Quat_1.Quat.Create()),
        (this.TempQuat3 = Quat_1.Quat.Create()),
        (this.TempQuatInverse = Quat_1.Quat.Create()),
        (this.TempDesireLocation = Vector_1.Vector.Create()),
        (this.IPr = !0),
        (this.Initialized = !1),
        (this.CameraConfig = void 0),
        (this.DefaultConfigs = new Map()),
        (this.DefaultCurveConfigs = new Map()),
        (this.$ = new Map()),
        (this.C1e = new Map()),
        (this.CameraCollision = void 0),
        (this.SettlementCamera = void 0),
        (this.CurrentArmCenterForwardEdgeMin = 0),
        (this.CurrentArmCenterForwardEdgeMax = 0),
        (this.CurrentArmCenterRightEdgeMin = 0),
        (this.CurrentArmCenterRightEdgeMax = 0),
        (this.CurrentArmCenterUpEdgeMin = 0),
        (this.CurrentArmCenterUpEdgeMax = 0),
        (this.pTn = 0),
        (this.vTn = 0),
        (this.TPr = 0),
        (this.LPr = !1),
        (this.DPr = Vector_1.Vector.Create(0, 0, 0)),
        (this.RPr = Rotator_1.Rotator.Create(0, 0, 0)),
        (this.fii = (0, puerts_1.$ref)(void 0)),
        (this.UPr = (0, puerts_1.$ref)(0)),
        (this.APr = (0, puerts_1.$ref)(0)),
        (this.PPr = (t, i) => {
          ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Id) ===
            this.CharacterEntityHandle && (this.CharacterController = i);
        }),
        (this.xPr = (t, i) => {
          ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Id) ===
            this.CharacterEntityHandle && (this.CharacterController = void 0);
        }),
        (this.mDn = (t) => {
          this.SetFollowShooter(t);
        }),
        (this.dDn = () => {
          this.SetFollowShooter(void 0);
        }),
        (this.cae = Vector_1.Vector.Create()),
        (this.wPr = Vector_1.Vector.Create()),
        (this.Ilt = () => {
          4 !== ModelManager_1.ModelManager.TeleportModel.TeleportMode &&
            (this.ResetFightCameraLogic(), this.ResetInitialCameraRotation());
        }),
        (this.nye = () => {
          ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel ||
            (this.ResetFightCameraLogic(!1), this.ResetInitialCameraRotation());
        }),
        (this.BPr = (t) => {
          t || this.ResetFightCameraLogic(!1);
        });
    }
    get StartHideDistance() {
      return this.SPn;
    }
    set StartHideDistance(t) {
      (this.SPn = t), (this.yPn = t * t);
    }
    get IsTargetLocationValid() {
      return !this.TargetLocation.ContainsNaN();
    }
    get CameraActor() {
      return this.ele.CameraActor;
    }
    get FinalCameraDistance() {
      return this.TPr;
    }
    GetArmLengthWithSetting(t) {
      return MathUtils_1.MathUtils.Lerp(
        t.ArmLength,
        t.MaxArmLength,
        ModelManager_1.ModelManager.CameraModel
          .CameraSettingArmLengthPercentage,
      );
    }
    GetArmLengthWithSettingAndZoom(t, i = !0) {
      var s = this.GetArmLengthWithSetting(t) * t.ZoomModifier;
      return i
        ? MathUtils_1.MathUtils.Clamp(s, t.MinArmLength, t.MaxArmLength)
        : s;
    }
    static TArrayToArray(i) {
      if (!i) return [];
      var s = [],
        h = i.Num();
      for (let t = 0; t < h; t++) s.push(i.Get(t));
      return s;
    }
    static TMapToMap(i) {
      if (!(i.Num() < 0)) {
        var s = new Map();
        for (let t = 0; t < i.Num(); t++) {
          var h = i.GetKey(t);
          s.set(h, i.Get(h));
        }
        return s;
      }
    }
    static TMapToCurveMap(i) {
      if (!(i.Num() < 0)) {
        var s = new Map();
        for (let t = 0; t < i.Num(); t++) {
          var h = i.GetKey(t);
          s.set(h, CurveUtils_1.CurveUtils.CreateCurveByStruct(i.Get(h)));
        }
        return s;
      }
    }
    SetConfigMap(t, i) {
      this.$.set(t, i);
    }
    SetCurveConfigMap(t, i) {
      this.C1e.set(t, i);
    }
    f1e(t, i) {
      this[t] = i;
    }
    p1e(t, i) {
      this[t] = i;
    }
    SetConfigs(t, i, s) {
      if (t) {
        for (var [h, e] of t) {
          h = this.$.get(h);
          this.f1e(h, e);
        }
        for (var [r, a] of this.$)
          void 0 === this[a] &&
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                58,
                "CameraDefault缺少配置",
                ["tagName", s],
                ["key", r],
                ["value", a],
              ),
            this.f1e(a, 1));
        (0 <= this.ArmCenterForwardEdgeMin ||
          0 <= this.ArmCenterRightEdgeMin ||
          0 <= this.ArmCenterUpEdgeMin ||
          this.ArmCenterForwardEdgeMax <= 0 ||
          this.ArmCenterRightEdgeMax <= 0 ||
          this.ArmCenterUpEdgeMax <= 0) &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Camera",
            58,
            "CameraDefault配置上下界有误",
            ["tagName", s],
            ["ForwardMin", this.ArmCenterForwardEdgeMin],
            ["RightMin", this.ArmCenterRightEdgeMin],
            ["UpMin", this.ArmCenterUpEdgeMin],
            ["ForwardMax", this.ArmCenterForwardEdgeMax],
            ["RightMax", this.ArmCenterRightEdgeMax],
            ["UpMax", this.ArmCenterUpEdgeMax],
          );
      }
      if (i) {
        for (var [o, n] of i) {
          o = this.C1e.get(o);
          this.p1e(o, n);
        }
        for (var [l, C] of this.C1e)
          void 0 === this[C] &&
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                58,
                "CameraDefault缺少曲线配置",
                ["tagName", s],
                ["key", l],
                ["value", C],
              ),
            this.p1e(C, CurveUtils_1.CurveUtils.CreateCurve(0)));
      }
    }
    ResetDefaultConfig() {
      this.SetConfigs(
        this.DefaultConfigs,
        this.DefaultCurveConfigs,
        "DefaultConfig",
      );
    }
    ApplyConfig() {
      (this.DesiredCamera.ArmLength = this.ArmLength),
        (this.DesiredCamera.MinArmLength = this.MinArmLength),
        (this.DesiredCamera.MaxArmLength = this.MaxArmLength),
        (this.DesiredCamera.YawLimitMin = this.YawLimitMin),
        (this.DesiredCamera.YawLimitMax = this.YawLimitMax),
        (this.DesiredCamera.PitchLimitMin = this.PitchLimitMin),
        (this.DesiredCamera.PitchLimitMax = this.PitchLimitMax),
        (this.DesiredCamera.LookDownOffsetZ = this.LookDownOffsetZ),
        (this.DesiredCamera.LookUpOffsetZ = this.LookUpOffsetZ),
        (this.DesiredCamera.CameraOffset.X = this.CameraOffsetX),
        (this.DesiredCamera.CameraOffset.Y = this.CameraOffsetY),
        (this.DesiredCamera.CameraOffset.Z = this.CameraOffsetZ),
        (this.DesiredCamera.ArmOffset.X = this.ArmOffsetX),
        (this.DesiredCamera.ArmOffset.Y = this.ArmOffsetY),
        (this.DesiredCamera.ArmOffset.Z = this.ArmOffsetZ),
        (this.DesiredCamera.Fov = this.Fov),
        (this.DesiredCamera.WorldYawMin = this.WorldYawMin),
        (this.DesiredCamera.WorldYawMax = this.WorldYawMax),
        this.Initialized ||
          (this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera),
          (this.Initialized = !0)),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.UpdateCameraInfo,
          this.CharacterEntityHandle.Id,
        );
    }
    OnInit() {
      return (
        this.SetConfigMap(1, "ArmLength"),
        this.SetConfigMap(2, "MinArmLength"),
        this.SetConfigMap(3, "MaxArmLength"),
        this.SetConfigMap(6, "CameraOffsetX"),
        this.SetConfigMap(7, "CameraOffsetY"),
        this.SetConfigMap(8, "CameraOffsetZ"),
        this.SetConfigMap(62, "ArmOffsetX"),
        this.SetConfigMap(63, "ArmOffsetY"),
        this.SetConfigMap(64, "ArmOffsetZ"),
        this.SetConfigMap(5, "Fov"),
        this.SetConfigMap(35, "MaxDistance"),
        this.SetConfigMap(36, "InSpeed"),
        this.SetConfigMap(37, "OutSpeed"),
        this.SetConfigMap(39, "CenterCollisionSize"),
        this.SetConfigMap(38, "CollisionSizePercentage"),
        this.SetConfigMap(9, "CameraLocationFadeTime"),
        this.SetConfigMap(11, "CollisionProbeSize"),
        this.SetConfigMap(32, "NearCollisionProbeSize"),
        this.SetConfigMap(30, "CheckCollisionProbeSize"),
        this.SetConfigMap(31, "CheckWidth"),
        this.SetConfigMap(10, "CollisionAdditionalHeightInWater"),
        this.SetConfigMap(12, "DefaultPitchHorizontalOffset"),
        this.SetConfigMap(13, "DefaultPitchVerticalOffset"),
        this.SetConfigMap(14, "DefaultPitchInRangeMin"),
        this.SetConfigMap(15, "DefaultPitchInRangeCenter"),
        this.SetConfigMap(16, "DefaultPitchInRangeMax"),
        this.SetConfigMap(17, "DefaultPitchOutRangeMin"),
        this.SetConfigMap(18, "DefaultPitchOutRangeCenter"),
        this.SetConfigMap(19, "DefaultPitchOutRangeMax"),
        this.SetConfigMap(24, "FloatUpArmLengthMin"),
        this.SetConfigMap(25, "FloatUpArmLengthMax"),
        this.SetConfigMap(40, "StartHideDistance"),
        this.SetConfigMap(41, "CompleteHideDistance"),
        this.SetConfigMap(42, "StartHidePitch"),
        this.SetConfigMap(43, "CompleteHidePitch"),
        this.SetConfigMap(44, "StartDitherValue"),
        this.SetConfigMap(33, "YawLimitMin"),
        this.SetConfigMap(34, "YawLimitMax"),
        this.SetConfigMap(45, "PitchLimitMin"),
        this.SetConfigMap(46, "PitchLimitMax"),
        this.SetConfigMap(20, "ArmCenterUpSpeedMin"),
        this.SetConfigMap(21, "ArmCenterUpSpeedMax"),
        this.SetConfigMap(22, "ArmCenterUpEdgeMin"),
        this.SetConfigMap(23, "ArmCenterUpEdgeMax"),
        this.SetCurveConfigMap(23, "ArmCenterUpCurve"),
        this.SetConfigMap(26, "ArmCenterForwardSpeedMin"),
        this.SetConfigMap(27, "ArmCenterForwardSpeedMax"),
        this.SetConfigMap(28, "ArmCenterForwardEdgeMin"),
        this.SetConfigMap(29, "ArmCenterForwardEdgeMax"),
        this.SetCurveConfigMap(29, "ArmCenterForwardCurve"),
        this.SetConfigMap(47, "ArmCenterRightSpeedMin"),
        this.SetConfigMap(48, "ArmCenterRightSpeedMax"),
        this.SetConfigMap(49, "ArmCenterRightEdgeMin"),
        this.SetConfigMap(50, "ArmCenterRightEdgeMax"),
        this.SetCurveConfigMap(50, "ArmCenterRightCurve"),
        this.SetConfigMap(51, "LookDownOffsetZ"),
        this.SetConfigMap(52, "LookUpOffsetZ"),
        this.SetConfigMap(54, "CameraRotateToTargetMaxAlpha"),
        this.SetConfigMap(53, "CameraRotateToTargetMinAlpha"),
        this.SetCurveConfigMap(55, "CameraRotateToTargetCurve"),
        this.SetConfigMap(56, "IsDisableResetFocus"),
        this.SetConfigMap(57, "AdditionPitchMin"),
        this.SetConfigMap(58, "AdditionPitchMax"),
        this.SetConfigMap(59, "AdditionPitchDeltaHeight"),
        this.SetCurveConfigMap(59, "AdditionPitchCurve"),
        this.SetConfigMap(60, "WorldYawMin"),
        this.SetConfigMap(61, "WorldYawMax"),
        (this.InitialCameraPitch =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "InitialCameraPitch",
          )),
        (this.CameraCollision = new CameraCollision_1.CameraCollision()),
        this.CameraCollision.Init(this),
        (this.SettlementCamera = new SettlementCamera_1.SettlementCamera()),
        this.SettlementCamera.Init(this),
        this.AddUnResetProperty(
          "LastCamera",
          "DesiredCamera",
          "CameraConfigController",
          "CameraFocusController",
          "CameraInputController",
          "CameraModifyController",
          "CameraAdjustController",
          "CameraSidestepController",
          "CameraAutoController",
          "CameraGuideController",
          "CameraRunningController",
          "CameraRotatorController",
          "CameraDialogueController",
          "CameraFixedController",
          "CameraClimbController",
          "CameraHookController",
          "CameraSplineMoveController",
          "CameraCollision",
          "SettlementCamera",
        ),
        !0
      );
    }
    LoadConfig() {
      this.ele = this.Entity.GetComponent(4);
      var t = Info_1.Info.IsMobilePlatform() ? MOBILE_CONFIG_PATH : CONFIG_PATH;
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.BP_FightCameraConfig_C,
        (t) => {
          (this.CameraConfig = t),
            (this.DefaultConfigs = FightCameraLogicComponent_1.TMapToMap(
              t.基础,
            )),
            (this.DefaultCurveConfigs =
              FightCameraLogicComponent_1.TMapToCurveMap(t.基础曲线配置)),
            this.CameraFocusController.SetDefaultConfigs(
              t.锁定镜头,
              t.锁定镜头曲线配置,
            ),
            this.CameraInputController.SetDefaultConfigs(
              t.镜头输入,
              t.镜头输入曲线配置,
            ),
            this.CameraModifyController.SetDefaultConfigs(
              t.Modify镜头,
              t.Modify镜头曲线配置,
            ),
            this.CameraAdjustController.SetDefaultConfigs(
              t.技能修正,
              t.技能修正曲线配置,
            ),
            this.CameraSidestepController.SetDefaultConfigs(
              t.移动自动镜头,
              t.移动自动镜头曲线配置,
            ),
            this.CameraAutoController.SetDefaultConfigs(
              t.自动镜头,
              t.自动镜头曲线配置,
            ),
            this.CameraGuideController.SetDefaultConfigs(
              t.引导镜头,
              t.引导镜头曲线配置,
            ),
            this.CameraRunningController.SetDefaultConfigs(
              t.跑图镜头,
              t.跑图镜头曲线配置,
            ),
            this.CameraDialogueController.SetDefaultConfigs(
              t.对话镜头,
              t.对话镜头曲线配置,
            ),
            this.CameraFixedController.SetDefaultConfigs(
              t.对话镜头,
              t.对话镜头曲线配置,
            ),
            this.CameraClimbController.SetDefaultConfigs(
              t.攀爬镜头,
              t.攀爬镜头曲线配置,
            ),
            this.CameraModifyController.SetSettlementModifier(t.结算镜头),
            this.CameraCollision?.SetCameraConfig(
              t.基础.Get(11),
              t.基础.Get(65),
            );
        },
      );
    }
    ApplyCameraModify(
      t,
      i,
      s,
      h,
      e,
      r,
      a = BREAK_BLEND_OUT_TIME,
      o = void 0,
      n = void 0,
      l = void 0,
      C = "",
      _ = void 0,
    ) {
      this.CameraModifyController.ApplyCameraModify(
        t,
        i,
        s,
        h,
        a,
        e,
        r,
        o,
        n,
        l,
        C,
        _,
      );
    }
    ApplyCameraGuide(t, i, s, h, e, r, a) {
      this.CameraGuideController.ApplyCameraGuide(t, i, s, h, e, r, a);
    }
    ApplyCameraHook(t) {
      this.CameraHookController.ApplyCameraHook(t);
    }
    ExitCameraHook(t = !0) {
      this.CameraHookController.ExitCameraHook(t);
    }
    ExitCameraGuide() {
      this.CameraGuideController.ExitCameraGuide();
    }
    ApplyDepthOfField(t, i, s, h) {
      var e = this.CameraActor?.CameraComponent?.PostProcessSettings;
      e &&
        (void 0 !== t &&
          ((e.bOverride_DepthOfFieldFstop = !0), (e.DepthOfFieldFstop = t)),
        void 0 !== i
          ? ((e.bOverride_DepthOfFieldFocalDistance = !0),
            (e.DepthOfFieldFocalDistance = i))
          : ((e.bOverride_DepthOfFieldFocalDistance = !0), (this.LPr = !0)),
        void 0 !== s &&
          ((e.bOverride_DepthOfFieldDepthBlurAmount = !0),
          (e.DepthOfFieldDepthBlurAmount = s)),
        void 0 !== h) &&
        ((e.bOverride_DepthOfFieldDepthBlurRadius = !0),
        (e.DepthOfFieldDepthBlurRadius = h));
    }
    ApplyRadialBlur(t, i, s, h, e, r) {
      var a = this.CameraActor?.CameraComponent?.PostProcessSettings;
      a &&
        (void 0 !== t
          ? ((a.bOverride_KuroRadialBlurIntensity = !0),
            (a.KuroRadialBlurIntensity = t))
          : (a.bOverride_KuroRadialBlurIntensity = !1),
        void 0 !== i
          ? ((a.bOverride_KuroRadialBlurCenter = !0),
            (a.KuroRadialBlurCenter = i))
          : (a.bOverride_KuroRadialBlurCenter = !1),
        void 0 !== s
          ? ((a.bOverride_KuroRadialBlurRadius = !0),
            (a.KuroRadialBlurRadius = s))
          : (a.bOverride_KuroRadialBlurRadius = !1),
        void 0 !== h
          ? ((a.bOverride_KuroRadialBlurHardness = !0),
            (a.KuroRadialBlurHardness = h))
          : (a.bOverride_KuroRadialBlurHardness = !1),
        void 0 !== e
          ? ((a.bOverride_KuroRadialBlurPassNumber = !0),
            (a.KuroRadialBlurPassNumber = e))
          : (a.bOverride_KuroRadialBlurPassNumber = !1),
        void 0 !== r
          ? ((a.bOverride_KuroRadialBlurSampleNumber = !0),
            (a.KuroRadialBlurSampleNumber = r))
          : (a.bOverride_KuroRadialBlurSampleNumber = !1));
    }
    ExitDepthOfField() {
      var t = this.CameraActor?.CameraComponent?.PostProcessSettings;
      t &&
        ((t.bOverride_DepthOfFieldFstop = !1),
        (t.bOverride_DepthOfFieldFocalDistance = !1),
        (t.bOverride_DepthOfFieldDepthBlurAmount = !1),
        (t.bOverride_DepthOfFieldDepthBlurRadius = !1)),
        (this.LPr = !1);
    }
    ExitRadialBlur() {
      var t = this.CameraActor?.CameraComponent?.PostProcessSettings;
      t &&
        ((t.bOverride_KuroRadialBlurIntensity = !1),
        (t.bOverride_KuroRadialBlurCenter = !1),
        (t.bOverride_KuroRadialBlurRadius = !1),
        (t.bOverride_KuroRadialBlurHardness = !1),
        (t.bOverride_KuroRadialBlurPassNumber = !1),
        (t.bOverride_KuroRadialBlurSampleNumber = !1));
    }
    ApplyCameraSpline(t, i, s, h) {
      this.CameraSplineMoveController.ApplyCameraSpline(t, i, s, h);
    }
    ExitCameraSpline() {
      this.CameraSplineMoveController.EndCameraSpline();
    }
    EnterCameraExplore(t, i, s, h, e, r, a) {
      this.CameraRunningController.EnterCameraExplore(t, i, s, h, e, r, a);
    }
    ExitCameraExplore(t) {
      this.CameraRunningController.ExitCameraExplore(t);
    }
    EnterSequenceDialogue(t, i = !1) {
      this.cPr && this.CameraDialogueController.EnterSequenceDialogue(t, i);
    }
    AdjustDialogueCamera(t, i, s, h) {
      this.CameraDialogueController.AdjustDialogueParams(t, i, s, h);
    }
    ExitSequenceDialogue() {
      this.CameraDialogueController.ExitSequenceDialogue();
    }
    SetRotation(t) {
      this.DesiredCamera.ArmRotation.DeepCopy(t),
        this.CurrentCamera.ArmRotation.DeepCopy(t),
        this.SetRotationInternal(t),
        this.CurrentCamera.ArmRotation.Quaternion().RotateVector(
          Vector_1.Vector.ForwardVectorProxy,
          this.CameraForward,
        );
    }
    SetPawn(t) {
      t instanceof TsBaseCharacter_1.default
        ? this.SetCharacter(t)
        : t?.IsValid() || this.SetCharacter(void 0);
    }
    SetCharacter(t) {
      (this.Character = t)
        ? ((this.cPr = this.Character?.IsValid() ?? !1),
          this.CameraCollision.SetCharacter(t),
          (this.CharacterEntityHandle =
            ModelManager_1.ModelManager.CreatureModel.GetEntityById(
              this.Character.EntityId,
            )),
          (this.CharacterController =
            this.CharacterEntityHandle?.Entity?.GetComponent(
              54,
            )?.CharacterController),
          (this.mPr = this.CharacterEntityHandle?.Entity?.GetComponent(190)),
          this.Character.SetDitherEffect(1, 1),
          (t =
            this.CharacterEntityHandle.Entity.GetComponent(0).GetRoleConfig()),
          (this.SPr = t.CameraFloatHeight),
          (this.ContainsTag(1674960297) || this.GetUsingGoBattle()) &&
            this.ResetArmLocation(!0, this.CameraLocationFadeTime))
        : ((this.cPr = !1),
          (this.CharacterEntityHandle = void 0),
          (this.mPr = void 0),
          (this.CharacterController = void 0)),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CameraCharacterChanged,
          this.CharacterEntityHandle,
        );
    }
    SetFollowShooter(t) {
      (this.FollowShooterEntityHandle = t),
        this.FollowShooterEntityHandle
          ? ((this.gDn = this.FollowShooterEntityHandle?.Valid ?? !1),
            (this.FollowShooterTagComponentInternal =
              this.FollowShooterEntityHandle?.Entity?.GetComponent(190)))
          : ((this.gDn = !1),
            (this.FollowShooterTagComponentInternal = void 0));
    }
    bPr(t) {
      CameraUtility_1.CameraUtility.GetSocketLocation(
        void 0,
        this.TargetSocketName,
        t,
        this.TargetEntity,
      );
    }
    ResetArmLengthAndRotation(t) {
      this.cPr &&
        ((this.DesiredCamera.ArmLength = this.ArmLength),
        this.SetRotation(
          CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator().op_Addition(
            t,
          ),
        ));
    }
    ResetInitialCameraRotation() {
      (this.CameraRotation.Pitch = this.InitialCameraPitch),
        this.SetRotation(this.CameraRotation.ToUeRotator());
    }
    GetCharacter() {
      return this.Character;
    }
    CopyVirtualCamera(t, i, s = !1) {
      (t.ArmLength = i.ArmLength),
        (t.MinArmLength = i.MinArmLength),
        (t.MaxArmLength = i.MaxArmLength),
        t.ArmLength < MathUtils_1.MathUtils.SmallNumber &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Camera", 6, "ArmLength is Zero"),
          (t.ArmLength = 1)),
        t.MinArmLength < MathUtils_1.MathUtils.SmallNumber &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Camera", 6, "MinArmLength is Zero"),
          (t.MinArmLength = 1)),
        t.MaxArmLength < MathUtils_1.MathUtils.SmallNumber &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Camera", 6, "MaxArmLength is Zero"),
          (t.MaxArmLength = 1)),
        s && this.Character && this.TPn(i.YawLimitMin, i.YawLimitMax)
          ? ((s = Math.abs(
              MathUtils_1.MathUtils.WrapAngle(
                i.ArmRotation.Yaw -
                  this.Character.CharacterActorComponent.ActorRotationProxy.Yaw,
              ),
            )),
            (t.YawLimitMin = -Math.abs(s)),
            (t.YawLimitMax = Math.abs(s)))
          : ((t.YawLimitMin = i.YawLimitMin), (t.YawLimitMax = i.YawLimitMax)),
        (t.PitchLimitMin = i.PitchLimitMin),
        (t.PitchLimitMax = i.PitchLimitMax),
        (t.LookDownOffsetZ = i.LookDownOffsetZ),
        (t.LookUpOffsetZ = i.LookUpOffsetZ),
        (t.WorldYawMin = i.WorldYawMin),
        (t.WorldYawMax = i.WorldYawMax),
        t.ArmOffset.DeepCopy(i.ArmOffset),
        t.CameraOffset.DeepCopy(i.CameraOffset),
        t.ArmLocation.DeepCopy(i.ArmLocation),
        t.ArmRotation.DeepCopy(i.ArmRotation),
        (t.Fov = i.Fov),
        t.Fov < MathUtils_1.MathUtils.SmallNumber &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Camera", 6, "Fov is Zero"),
          (t.Fov = 1)),
        (t.ZoomModifier = i.ZoomModifier),
        t.ZoomModifier < MathUtils_1.MathUtils.SmallNumber &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Camera", 58, "ZoomModifier is Zero"),
          (t.ZoomModifier = 1));
    }
    StartFade(t, i, s, h, e, r, a) {
      (this.CurrentCamera.ArmRotation.Pitch =
        MathUtils_1.MathUtils.StandardizingPitch(
          this.CurrentCamera.ArmRotation.Pitch,
        )),
        this.CopyVirtualCamera(this.LastCamera, this.CurrentCamera, !0),
        (this.EUo = s),
        (this.pPr = h),
        (this.vPr = e),
        (this.MPr = r),
        (this.Fading = !0),
        (this.pUo = t),
        (this.vUo = 0),
        (this.MUo = i),
        (this.IsUniqueFade = a),
        0 < this.pUo &&
          !this.MUo &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Camera", 6, "No Fade Curve."),
          (this.MUo = CurveUtils_1.CurveUtils.CreateCurve(0)));
    }
    ResetArmLocation(t, i = 0) {
      t &&
        ((this.gPr = !0), (this.fPr = i), (this.ArmLocationFadeElapseTime = 0));
    }
    SetArmLocation(t) {
      this.IsModifiedArmLocation ||
        (this.DesiredCamera.ArmLocation.DeepCopy(t),
        (this.IsModifiedArmLocation = !0));
    }
    OnStart() {
      this.LoadConfig(),
        this.CameraCollision.InitTraceElements(),
        (this.CurrentCollisionSize = 0),
        (this.pTn = -1),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.TeleportComplete,
          this.Ilt,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.WorldDone,
          this.nye,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnSequenceCameraStatus,
          this.BPr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharPossessed,
          this.PPr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharUnpossessed,
          this.xPr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnPlayerFollowerCreate,
          this.mDn,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnPlayerFollowerDestroy,
          this.dDn,
        );
      for (const t of this.EPr) t.OnStart();
      return !0;
    }
    OnEnd() {
      this.CameraCollision.Clear(),
        this.SettlementCamera.Clear(),
        (this.CameraConfig = void 0),
        (this.ele = void 0),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.TeleportComplete,
          this.Ilt,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.WorldDone,
          this.nye,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnSequenceCameraStatus,
          this.BPr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharPossessed,
          this.PPr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharUnpossessed,
          this.xPr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnPlayerFollowerCreate,
          this.mDn,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnPlayerFollowerDestroy,
          this.dDn,
        );
      for (const t of this.EPr) t.OnEnd();
      return !0;
    }
    OnTick(t) {
      (this.cPr = this.Character?.IsValid() ?? !1),
        this.CameraActor?.IsValid() &&
          this.cPr &&
          (0 !== ModelManager_1.ModelManager.CameraModel.CameraMode
            ? (PhotographController_1.PhotographController.IsOpenPhotograph() ||
                this.Character.SetDitherEffect(1, 1),
              this.CameraCollision?.ResetAllNpcDither())
            : ((t = t * MathUtils_1.MathUtils.MillisecondToSecond),
              this.qPr(),
              this.PlayerRotator.FromUeRotator(
                this.Character.CharacterActorComponent.ActorRotationProxy,
              ),
              this.RefreshPlayerLocation(),
              FightCameraLogicComponent_1.n$a.Start(),
              this.GPr(),
              this.NPr(t),
              FightCameraLogicComponent_1.n$a.Stop(),
              this.OPr() &&
                (this.DesiredCamera.ArmLength = MathUtils_1.MathUtils.Clamp(
                  this.DesiredCamera.ArmLength,
                  this.DesiredCamera.MinArmLength,
                  this.DesiredCamera.MaxArmLength,
                )),
              this.kPr(t),
              this.LUo(),
              this.FPr(),
              this.RUo(t),
              this.VPr(t),
              FightCameraLogicComponent_1.c$a.Start(),
              (this.vTn = this.CameraActor.CameraComponent.FieldOfView),
              (this.CameraActor.CameraComponent.FieldOfView =
                this.CurrentCamera.Fov),
              this.HPr(),
              this.jPr(),
              this.MTn(),
              FightCameraLogicComponent_1.c$a.Stop(),
              this.CharacterController?.SetControlRotation(
                this.CurrentCamera.ArmRotation.ToUeRotator(),
              )));
    }
    NPr(t) {
      for (const i of this.EPr) i.Update(t);
    }
    OPr() {
      return !(
        this.CameraModifyController?.ModifySettings?.IsModifiedArmLength ||
        this.CameraModifyController?.ModifyArmLength ||
        (this.CameraModifyController.IsModifyFadeOut &&
          this.CameraModifyController?.ModifyFadeOutData?.ModifyArmLength)
      );
    }
    GetConfigMapValue(t) {
      return String(this.$.get(t));
    }
    GPr() {
      (this.IsModifiedArmLocation = !1),
        (this.IsModifiedArmLength = !1),
        (this.IsModifiedArmOffset = !1),
        (this.IsModifiedZoomModifier = !1),
        (this.IsModifiedArmRotationYaw = !1),
        (this.IsModifiedArmRotationPitch = !1),
        (this.IsModifiedArmRotationRoll = !1),
        (this.IsModifiedCameraOffset = !1),
        (this.IsModifiedFov = !1);
    }
    XPr(t, i, s, h, e, r, a, o) {
      var n = t - i,
        a = Math.abs(n) / ((a - r) / 2),
        r = MathUtils_1.MathUtils.Lerp(h, e, o.GetCurrentValue(a)) * s;
      return n < 0
        ? MathUtils_1.MathUtils.Clamp(t + r, t, i)
        : MathUtils_1.MathUtils.Clamp(t - r, i, t);
    }
    $Pr(t, i, s, h, e, r, a, o) {
      var n = t - i;
      if (n < 0) {
        const l = MathUtils_1.MathUtils.Lerp(h, e, o.GetCurrentValue(n / r)),
          C = l * s;
        return MathUtils_1.MathUtils.Clamp(t + C, i + r, i);
      }
      const l = MathUtils_1.MathUtils.Lerp(h, e, o.GetCurrentValue(n / a)),
        C = l * s;
      return MathUtils_1.MathUtils.Clamp(t - C, i, i + a);
    }
    kPr(t) {
      var i;
      this.IsFollowing &&
        (this.rVa(),
        this.iVa.RotateVector(this.PlayerLocation, this.TempVector),
        this.iVa.RotateVector(this.TmpArmLocation, this.TempVector2),
        (this.CurrentArmCenterForwardEdgeMin = this.XPr(
          this.CurrentArmCenterForwardEdgeMin,
          this.ArmCenterForwardEdgeMin,
          t,
          this.ArmCenterForwardSpeedMin,
          this.ArmCenterForwardSpeedMax,
          this.ArmCenterForwardEdgeMin,
          this.ArmCenterForwardEdgeMax,
          this.ArmCenterForwardCurve,
        )),
        (this.CurrentArmCenterForwardEdgeMax = this.XPr(
          this.CurrentArmCenterForwardEdgeMax,
          this.ArmCenterForwardEdgeMax,
          t,
          this.ArmCenterForwardSpeedMin,
          this.ArmCenterForwardSpeedMax,
          this.ArmCenterForwardEdgeMin,
          this.ArmCenterForwardEdgeMax,
          this.ArmCenterForwardCurve,
        )),
        (this.CurrentArmCenterRightEdgeMin = this.XPr(
          this.CurrentArmCenterRightEdgeMin,
          this.ArmCenterRightEdgeMin,
          t,
          this.ArmCenterRightSpeedMin,
          this.ArmCenterRightSpeedMax,
          this.ArmCenterRightEdgeMin,
          this.ArmCenterRightEdgeMax,
          this.ArmCenterRightCurve,
        )),
        (this.CurrentArmCenterRightEdgeMax = this.XPr(
          this.CurrentArmCenterRightEdgeMax,
          this.ArmCenterRightEdgeMax,
          t,
          this.ArmCenterRightSpeedMin,
          this.ArmCenterRightSpeedMax,
          this.ArmCenterRightEdgeMin,
          this.ArmCenterRightEdgeMax,
          this.ArmCenterRightCurve,
        )),
        (this.CurrentArmCenterUpEdgeMin = this.XPr(
          this.CurrentArmCenterUpEdgeMin,
          this.ArmCenterUpEdgeMin,
          t,
          this.ArmCenterUpSpeedMin,
          this.ArmCenterUpSpeedMax,
          this.ArmCenterUpEdgeMin,
          this.ArmCenterUpEdgeMax,
          this.ArmCenterUpCurve,
        )),
        (this.CurrentArmCenterUpEdgeMax = this.XPr(
          this.CurrentArmCenterUpEdgeMax,
          this.ArmCenterUpEdgeMax,
          t,
          this.ArmCenterUpSpeedMin,
          this.ArmCenterUpSpeedMax,
          this.ArmCenterUpEdgeMin,
          this.ArmCenterUpEdgeMax,
          this.ArmCenterUpCurve,
        )),
        (this.TempVector2.X = this.$Pr(
          this.TempVector2.X,
          this.TempVector.X,
          t,
          this.ArmCenterForwardSpeedMin,
          this.ArmCenterForwardSpeedMax,
          this.CurrentArmCenterForwardEdgeMin,
          this.CurrentArmCenterForwardEdgeMax,
          this.ArmCenterForwardCurve,
        )),
        (this.TempVector2.Y = this.$Pr(
          this.TempVector2.Y,
          this.TempVector.Y,
          t,
          this.ArmCenterRightSpeedMin,
          this.ArmCenterRightSpeedMax,
          this.CurrentArmCenterRightEdgeMin,
          this.CurrentArmCenterRightEdgeMax,
          this.ArmCenterRightCurve,
        )),
        (this.TempVector2.Z = this.$Pr(
          this.TempVector2.Z,
          this.TempVector.Z,
          t,
          this.ArmCenterUpSpeedMin,
          this.ArmCenterUpSpeedMax,
          this.CurrentArmCenterUpEdgeMin,
          this.CurrentArmCenterUpEdgeMax,
          this.ArmCenterUpCurve,
        )),
        this.tVa.RotateVector(this.TempVector2, this.TmpArmLocation)),
        this.IsModifiedArmLocation ||
          (this.gPr
            ? (this.wPr.Reset(),
              this.DesiredCamera.ArmLocation.Subtraction(
                this.TmpArmLocation,
                this.wPr,
              ),
              this.wPr.GetAbsMax() < CAMERA_LOCATION_NEARLY_DISTANCE
                ? (this.DesiredCamera.ArmLocation.DeepCopy(this.TmpArmLocation),
                  (this.gPr = !1))
                : ((this.ArmLocationFadeElapseTime += t),
                  (i = this.fPr - this.ArmLocationFadeElapseTime) <
                  MathUtils_1.MathUtils.KindaSmallNumber
                    ? ((this.gPr = !1),
                      this.DesiredCamera.ArmLocation.DeepCopy(
                        this.TmpArmLocation,
                      ))
                    : ((t = this.wPr.MultiplyEqual(-t / i)),
                      this.DesiredCamera.ArmLocation.AdditionEqual(t))))
            : this.DesiredCamera.ArmLocation.DeepCopy(this.TmpArmLocation));
    }
    YPr(t) {
      return MathUtils_1.MathUtils.RangeClamp(
        t,
        this.FloatUpArmLengthMax,
        this.FloatUpArmLengthMin,
        0,
        this.SPr,
      );
    }
    RUo(t) {
      this.Fading
        ? ((this.vUo += t),
          this.vUo >= this.pUo
            ? ((this.Fading = !1),
              this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera))
            : (this.CurrentCamera.ArmLocation.DeepCopy(
                this.DesiredCamera.ArmLocation,
              ),
              (this.CurrentCamera.ZoomModifier =
                this.DesiredCamera.ZoomModifier),
              (t = this.MUo.GetCurrentValue(this.vUo / this.pUo)),
              this.EUo && !this.IsModifiedArmLength
                ? (this.CurrentCamera.ArmLength = MathUtils_1.MathUtils.Lerp(
                    this.LastCamera.ArmLength,
                    this.DesiredCamera.ArmLength,
                    t,
                  ))
                : ((this.EUo = !1),
                  (this.CurrentCamera.ArmLength =
                    this.DesiredCamera.ArmLength)),
              (this.CurrentCamera.MinArmLength = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.MinArmLength,
                this.DesiredCamera.MinArmLength,
                t,
              )),
              (this.CurrentCamera.MaxArmLength = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.MaxArmLength,
                this.DesiredCamera.MaxArmLength,
                t,
              )),
              (this.CurrentCamera.YawLimitMin = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.YawLimitMin,
                this.DesiredCamera.YawLimitMin,
                t,
              )),
              (this.CurrentCamera.YawLimitMax = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.YawLimitMax,
                this.DesiredCamera.YawLimitMax,
                t,
              )),
              (this.CurrentCamera.PitchLimitMin = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.PitchLimitMin,
                this.DesiredCamera.PitchLimitMin,
                t,
              )),
              (this.CurrentCamera.PitchLimitMax = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.PitchLimitMax,
                this.DesiredCamera.PitchLimitMax,
                t,
              )),
              (this.CurrentCamera.LookDownOffsetZ = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.LookDownOffsetZ,
                this.DesiredCamera.LookDownOffsetZ,
                t,
              )),
              (this.CurrentCamera.LookUpOffsetZ = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.LookUpOffsetZ,
                this.DesiredCamera.LookUpOffsetZ,
                t,
              )),
              (this.CurrentCamera.WorldYawMin = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.WorldYawMin,
                this.DesiredCamera.WorldYawMin,
                t,
              )),
              (this.CurrentCamera.WorldYawMax = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.WorldYawMax,
                this.DesiredCamera.WorldYawMax,
                t,
              )),
              this.pPr
                ? Vector_1.Vector.Lerp(
                    this.LastCamera.ArmOffset,
                    this.DesiredCamera.ArmOffset,
                    t,
                    this.CurrentCamera.ArmOffset,
                  )
                : ((this.pPr = !1),
                  this.CurrentCamera.ArmOffset.DeepCopy(
                    this.DesiredCamera.ArmOffset,
                  )),
              this.vPr
                ? Vector_1.Vector.Lerp(
                    this.LastCamera.CameraOffset,
                    this.DesiredCamera.CameraOffset,
                    t,
                    this.CurrentCamera.CameraOffset,
                  )
                : ((this.vPr = !1),
                  this.CurrentCamera.CameraOffset.DeepCopy(
                    this.DesiredCamera.CameraOffset,
                  )),
              this.CurrentCamera.ArmRotation.DeepCopy(
                this.DesiredCamera.ArmRotation,
              ),
              this.MPr && !this.IsModifiedFov
                ? (this.CurrentCamera.Fov = MathUtils_1.MathUtils.Lerp(
                    this.LastCamera.Fov,
                    this.DesiredCamera.Fov,
                    t,
                  ))
                : ((this.MPr = !1),
                  (this.CurrentCamera.Fov = this.DesiredCamera.Fov))))
        : this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera);
    }
    VPr(i) {
      if (this.cPr) {
        let t = 0;
        (t =
          this.CameraModifyController.IsModified ||
          this.CameraModifyController.IsModifyFadeOut
            ? this.GetArmLengthWithSettingAndZoom(this.DesiredCamera, !1)
            : this.GetArmLengthWithSettingAndZoom(this.CurrentCamera, !0)),
          (t += this.CameraAutoController.CurrentAutoCameraArmLengthAddition);
        var s = this.CurrentCamera.ArmRotation,
          h =
            (this.CameraModifyController.IsModified ||
              this.CameraModifyController.IsModifyFadeOut ||
              this.ClearRollInGravity(s),
            (t += this.CameraGuideController.CurrentCameraArmLengthAddition),
            this.YPr(t)),
          e = (this.cae.DeepCopy(this.CurrentCamera.ArmLocation), this.cae);
        e.AdditionEqual(this.CameraAutoController.CurrentAutoCameraArmOffset),
          e.AdditionEqual(this.CameraGuideController.CurrentCameraArmOffset),
          e.AdditionEqual(this.CurrentCamera.ArmOffset),
          GravityUtils_1.GravityUtils.AddZnInGravity(
            this.Character?.CharacterActorComponent,
            e,
            h,
          ),
          s.Quaternion(this.TempQuat),
          this.TempQuat.RotateVector(
            Vector_1.Vector.ForwardVectorProxy,
            this.CameraForward,
          ),
          this.CurrentCamera.ArmRotation.Vector(this.yPr),
          this.CameraForward.Multiply(-t, this.yPr),
          e.Addition(this.yPr, this.TempDesireLocation),
          this.TempVector.DeepCopy(this.CurrentCamera.CameraOffset),
          void 0 !== this.CameraFocusController.AddCameraOffsetY &&
            (this.TempVector.Y += this.CameraFocusController.AddCameraOffsetY),
          this.TempQuat.RotateVector(this.TempVector, this.yPr),
          this.TempDesireLocation.AdditionEqual(this.yPr),
          this.CameraLocation.DeepCopy(
            this.CameraCollision.CheckCollision(
              this.PlayerLocation,
              this.TempDesireLocation,
              i,
            ),
          ),
          this.SetRotationInternal(s),
          this.CameraLocation.ContainsNaN()
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                58,
                "CameraLocation Contains NaN: " +
                  this.CameraLocation.ToString(),
              )
            : this.CameraActor.K2_SetActorLocationAndRotation(
                this.CameraLocation.ToUeVector(),
                s.ToUeRotator(),
                !0,
                void 0,
                !1,
              ),
          this.CameraLocation.Subtraction(this.PlayerLocation, this.TempVector),
          (this.TPr = this.TempVector.Size());
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 23, "Character 不存在");
    }
    LUo() {
      var t = this.Character?.CharacterActorComponent?.MoveComp;
      let i = 0,
        s =
          (!t || t.IsStandardGravity
            ? ((i = MathUtils_1.MathUtils.WrapAngle(
                this.DesiredCamera.ArmRotation.Pitch,
              )),
              (i = MathUtils_1.MathUtils.Clamp(
                i,
                Math.max(this.CurrentCamera.PitchLimitMin, -PITCH_LIMIT_VALUE),
                Math.min(this.CurrentCamera.PitchLimitMax, PITCH_LIMIT_VALUE),
              )),
              (this.DesiredCamera.ArmRotation.Pitch = i))
            : (this.DesiredCamera.ArmRotation.Quaternion(this.TempQuat),
              this.TempQuat.RotateVector(
                Vector_1.Vector.ForwardVectorProxy,
                this.TempVector,
              ),
              (i =
                Math.asin(this.TempVector.DotProduct(t.GravityUp)) *
                MathUtils_1.MathUtils.RadToDeg),
              (t = MathUtils_1.MathUtils.Clamp(
                i,
                Math.max(this.CurrentCamera.PitchLimitMin, -PITCH_LIMIT_VALUE),
                Math.min(this.CurrentCamera.PitchLimitMax, PITCH_LIMIT_VALUE),
              )),
              i !== t &&
                (this.TempRotator.Set(t - i, 0, 0),
                this.TempRotator.Quaternion(this.TempQuat2),
                this.TempQuat.Multiply(this.TempQuat2, this.TempQuat3),
                this.TempQuat3.Rotator(this.DesiredCamera.ArmRotation),
                (i = t))),
          this.CurrentCamera.PitchLimitMax),
        h = this.DesiredCamera.LookUpOffsetZ;
      i < 0 &&
        ((i = Math.abs(i)),
        (s = Math.abs(this.CurrentCamera.PitchLimitMin)),
        (h = this.DesiredCamera.LookDownOffsetZ));
      t = MathUtils_1.MathUtils.RangeClamp(i, 0, s, 0, h);
      GravityUtils_1.GravityUtils.AddZnInGravity(
        this.Character?.CharacterActorComponent,
        this.DesiredCamera.ArmLocation,
        t,
      );
    }
    FPr() {
      var s = this.Character?.CharacterActorComponent?.MoveComp;
      if (!s || s.IsStandardGravity) {
        var s = this.CurrentCamera.YawLimitMin,
          h = this.CurrentCamera.YawLimitMax,
          e = (h - s) % 360;
        if (
          MathUtils_1.MathUtils.IsNearlyZero(e) ||
          MathUtils_1.MathUtils.IsNearlyEqual(e, 360)
        )
          this.DesiredCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.Clamp(
            MathUtils_1.MathUtils.WrapAngle(this.DesiredCamera.ArmRotation.Yaw),
            this.CurrentCamera.WorldYawMin,
            this.CurrentCamera.WorldYawMax,
          );
        else {
          (e = MathUtils_1.MathUtils.WrapAngle(
            this.Character.CharacterActorComponent.ActorRotationProxy.Yaw,
          )),
            (s = MathUtils_1.MathUtils.WrapAngle(e + s)),
            (e = MathUtils_1.MathUtils.WrapAngle(e + h)),
            (h = MathUtils_1.MathUtils.WrapAngle(
              this.DesiredCamera.ArmRotation.Yaw,
            ));
          let t = 0,
            i = 0;
          if (s < e && (e < h || h < s))
            (t = MathUtils_1.MathUtils.WrapAngle(0.5 * (s + e))),
              (i = MathUtils_1.MathUtils.WrapAngle(h < t ? s : e));
          else {
            if (!(e < s && e < h && h < s)) return;
            (t = MathUtils_1.MathUtils.WrapAngle(0.5 * (e + s))),
              (i = MathUtils_1.MathUtils.WrapAngle(h > t ? s : e));
          }
          this.DesiredCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.Clamp(
            i,
            this.CurrentCamera.WorldYawMin,
            this.CurrentCamera.WorldYawMax,
          );
        }
      }
    }
    TPn(t, i) {
      return (
        !MathUtils_1.MathUtils.IsNearlyEqual(t, -MathUtils_1.PI_DEG) ||
        !MathUtils_1.MathUtils.IsNearlyEqual(i, MathUtils_1.PI_DEG)
      );
    }
    qPr() {
      var t, i, s;
      this.cPr &&
        (t = this.CharacterEntityHandle?.Entity?.GetComponent(29))?.Valid &&
        (this.mPr?.HasTag(428837378)
          ? this.TargetEntity &&
            (this.CameraInputController.SetAimAssistTarget(
              this.TargetEntity,
              this.TargetSocketName,
            ),
            (this.TargetEntity = void 0),
            (this.TargetSocketName = void 0),
            (this.dPr = void 0),
            t.ExitLockDirection())
          : ((i = t?.GetTargetInfo()),
            (s = this.mPr?.HasAnyTag([-1150819426, 1260125908])),
            i?.ShowTarget?.Valid &&
              (s ||
                i.LastSetTime + SHOW_TARGET_VALID_TIME >
                  Time_1.Time.WorldTime) &&
              ((this.TargetEntity = i?.ShowTarget),
              (this.TargetSocketName = FNameUtil_1.FNameUtil.GetDynamicFName(
                i.SocketName,
              )),
              (this.dPr = this.TargetEntity.Entity.GetComponent(190))),
            i?.ShowTarget?.Valid
              ? this.TargetEntity &&
                this.zPr(t, s) &&
                ((this.TargetEntity = void 0),
                (this.TargetSocketName = void 0),
                (this.dPr = void 0),
                t.SetShowTarget(void 0))
              : ((this.TargetEntity = void 0),
                (this.TargetSocketName = void 0),
                (this.dPr = void 0))));
    }
    zPr(t, i) {
      if (!this.TargetEntity.Valid || !this.TargetEntity.Entity.Active)
        return !0;
      var s = this.TargetEntity.Entity.GetComponent(1),
        h = this.CharacterEntityHandle.Entity.GetComponent(3);
      if (!s?.Valid || !h?.Valid) return !0;
      if (i) this.bPr(this.TargetLocation);
      else {
        i = this.mPr;
        if (i?.Valid) {
          if (i.HasTag(504239013)) return !0;
          if (
            !this.dPr?.HasAnyTag(
              CharacterLockOnComponent_1.lockOnEnhancedTags,
            ) &&
            t.SpeedUpCleanTarget()
          )
            return !0;
        }
        i = this.CharacterEntityHandle.Entity.GetComponent(54);
        if (i?.Valid && this.CameraFocusController.ShouldSoftUnlock())
          return !0;
        if (
          (this.bPr(this.TargetLocation),
          this.IsTargetLocationValid &&
            t.TraceDetectBlock(
              h.ActorLocationProxy,
              this.TargetLocation,
              s.Owner,
            ))
        )
          if (this.CPr) {
            if (this.CPr < Time_1.Time.Now) return !0;
          } else this.CPr = Time_1.Time.Now + MAX_TARGET_HAS_BLOCK_TIME;
        else this.CPr = void 0;
      }
      return !1;
    }
    rVa() {
      var t = this.Character?.CharacterActorComponent?.MoveComp;
      let i = void 0;
      (i =
        !t || t.IsStandardGravity
          ? Vector_1.Vector.UpVectorProxy
          : t.GravityUp),
        (this.Z8a.Equals(i) && this.eVa.Equals(this.CameraForward)) ||
          (this.Z8a.DeepCopy(i),
          this.eVa.DeepCopy(this.CameraForward),
          this.TempVector.DeepCopy(this.CameraForward),
          (t = this.TempVector.DotProduct(i)) >
          1 - MathUtils_1.MathUtils.KindaSmallNumber
            ? (this.CameraRotation.Quaternion(this.TempQuat),
              this.TempQuat.RotateVector(
                Vector_1.Vector.DownVectorProxy,
                this.TempVector,
              ))
            : -t > 1 - MathUtils_1.MathUtils.KindaSmallNumber &&
              (this.CameraRotation.Quaternion(this.TempQuat),
              this.TempQuat.RotateVector(
                Vector_1.Vector.UpVectorProxy,
                this.TempVector,
              )),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            this.TempVector,
            i,
            this.tVa,
          ),
          this.tVa.Inverse(this.iVa));
    }
    SetInputEnable(t, i) {
      this.CameraInputController.SetInputEnable(t, i);
    }
    RefreshPlayerLocation() {
      var t;
      this.j$e(this.PlayerLocation),
        this.ContainsTag(-648310348) &&
          (t = this.CharacterEntityHandle?.Entity.GetComponent(49)) &&
          (t = EntitySystem_1.EntitySystem.GetComponent(t.RoleId, 1)) &&
          this.CameraCollision.TraceCheckPlayerLocation(
            t.ActorLocationProxy,
            this.PlayerLocation,
            this.PlayerLocation,
          );
    }
    j$e(t) {
      this.CharacterEntityHandle?.Entity.GetComponent(163).GetCameraPosition(t),
        this.Character?.Mesh &&
          (this.TempVector.FromUeVector(
            this.Character.Mesh.GetSocketLocation(
              CharacterNameDefines_1.CharacterNameDefines.ROOT,
            ),
          ),
          t.AdditionEqual(this.TempVector),
          this.TempVector.FromUeVector(
            this.Character.Mesh.K2_GetComponentLocation(),
          ),
          t.SubtractionEqual(this.TempVector));
    }
    CheckPositionInScreen(t, i, s, h, e) {
      var r = Global_1.Global.CharacterController;
      return (
        !!UE.GameplayStatics.ProjectWorldToScreen(
          r,
          t.ToUeVector(),
          this.fii,
          !1,
        ) &&
        ((r = (0, puerts_1.$unref)(this.fii)),
        this.GetScreenPositionIsInRange(r, i, s, h, e))
      );
    }
    GetScreenPositionIsInRange(t, i, s, h, e) {
      Global_1.Global.CharacterController.GetViewportSize(this.UPr, this.APr);
      var r = (0, puerts_1.$unref)(this.UPr),
        a = (0, puerts_1.$unref)(this.APr);
      return t.X > r * i && t.X < r * s && t.Y > a * h && t.Y < a * e;
    }
    AdjustPitch(t) {
      var i = this.Character.CharacterActorComponent,
        t =
          (this.TempVector.DeepCopy(t),
          GravityUtils_1.GravityUtils.ConvertToPlanarVector(
            i,
            this.TempVector,
          )),
        s = this.TempVector.Size() + this.DefaultPitchHorizontalOffset,
        t = t + this.DefaultPitchVerticalOffset;
      let h = Math.atan2(t, s) * MathUtils_1.MathUtils.RadToDeg;
      return (
        (h =
          h < this.DefaultPitchInRangeCenter
            ? MathUtils_1.MathUtils.RangeClamp(
                h,
                this.DefaultPitchInRangeMin,
                this.DefaultPitchInRangeCenter,
                this.DefaultPitchOutRangeMin,
                this.DefaultPitchOutRangeCenter,
              )
            : MathUtils_1.MathUtils.RangeClamp(
                h,
                this.DefaultPitchInRangeCenter,
                this.DefaultPitchInRangeMax,
                this.DefaultPitchOutRangeCenter,
                this.DefaultPitchOutRangeMax,
              )),
        this.TargetEntity?.Valid &&
          (t = this.TargetEntity.Entity.GetComponent(3)) &&
          ((s = i.FloorLocation),
          t.FloorLocation.Subtraction(s, this.TempVector),
          (t = GravityUtils_1.GravityUtils.GetZnInGravity(i, this.TempVector)) <
            0) &&
          (h += MathUtils_1.MathUtils.Lerp(
            this.AdditionPitchMax,
            this.AdditionPitchMin,
            this.AdditionPitchCurve.GetCurrentValue(
              Math.abs(t) / this.AdditionPitchDeltaHeight,
            ),
          )),
        h
      );
    }
    ContainsTag(t, i = !1) {
      return (
        !(!this.cPr || !this.mPr.HasTag(t)) ||
        !!(i && this.gDn && this.FollowShooterTagComponentInternal.HasTag(t))
      );
    }
    ContainsAnyTag(t, i = !1) {
      return (
        !(!this.cPr || !this.mPr.HasAnyTag(t)) ||
        !!(i && this.gDn && this.FollowShooterTagComponentInternal.HasAnyTag(t))
      );
    }
    GetUsingGoBattle() {
      return (
        !!this.cPr &&
        this.CharacterEntityHandle.Entity.GetComponent(84).GoBattleSkill
      );
    }
    TargetContainsTag(t) {
      return this.dPr?.HasTag(t) ?? !1;
    }
    SetRotationInternal(t) {
      this.CameraRotation.DeepCopy(t),
        this.cPr &&
          this.CharacterController?.SetControlRotation(
            this.CameraRotation.ToUeRotator(),
          );
    }
    SetIsDitherEffectEnable(t) {
      this.IPr = t;
    }
    HPr() {
      if (
        this.cPr &&
        this.Character.CharacterActorComponent?.Active &&
        1 !== ModelManager_1.ModelManager.CameraModel.CameraMode &&
        !this.mPr?.HasTag(-2100129479) &&
        this.IPr
      ) {
        this.j$e(this.PlayerLocation);
        var s = Vector_1.Vector.DistSquared(
          this.PlayerLocation,
          this.CameraLocation,
        );
        let t = 1;
        s < this.yPn &&
          (t = MathUtils_1.MathUtils.RangeClamp(
            Math.sqrt(s),
            this.StartHideDistance,
            this.CompleteHideDistance,
            this.StartDitherValue,
            0.01,
          ));
        s = this.GetCameraPitchInGravity();
        let i = 1;
        s > this.StartHidePitch &&
          (i = MathUtils_1.MathUtils.RangeClamp(
            s,
            this.StartHidePitch,
            this.CompleteHidePitch,
            this.StartDitherValue,
            0.01,
          ));
        s = Math.min(t, i);
        this.Character.SetDitherEffect(s, 1);
      }
    }
    jPr() {
      var t;
      this.LPr &&
        (t = this.CameraActor?.CameraComponent?.PostProcessSettings) &&
        (t.DepthOfFieldFocalDistance = Vector_1.Vector.Dist(
          this.PlayerLocation,
          this.CameraLocation,
        ));
    }
    MTn() {
      var t;
      (this.vTn < LANDSCAPE_LOD_SCALE_FOV &&
        this.CurrentCamera.Fov < LANDSCAPE_LOD_SCALE_FOV) ||
        (this.vTn >= LANDSCAPE_LOD_SCALE_FOV &&
          this.CurrentCamera.Fov >= LANDSCAPE_LOD_SCALE_FOV) ||
        ((t = this.CurrentCamera.Fov >= LANDSCAPE_LOD_SCALE_FOV ? 0 : this.pTn),
        UE.LandscapeProxy.SetKuroLandscapeFOVFactorByCamera(t));
    }
    OpenFocusInputController(t, i, s, h) {
      this.CameraFocusController.InitFocusData(t, i, s, h);
    }
    ResetFightCameraLogic(t = !0, i = !1) {
      i
        ? (this.iVa.RotateVector(this.PlayerLocation, this.TempVector2),
          this.iVa.RotateVector(this.TmpArmLocation, this.TempVector3),
          this.TempVector3.SubtractionEqual(this.TempVector2),
          this.j$e(this.PlayerLocation),
          this.rVa(),
          this.iVa.RotateVector(this.PlayerLocation, this.TempVector2),
          this.TempVector3.AdditionEqual(this.TempVector2),
          this.tVa.RotateVector(this.TempVector3, this.TmpArmLocation),
          this.CurrentCamera.ArmLocation.DeepCopy(this.TmpArmLocation),
          this.CameraCollision.SetCameraBlendPauseType(1))
        : (this.j$e(this.PlayerLocation),
          this.CurrentCamera.ArmLocation.DeepCopy(this.PlayerLocation),
          this.TmpArmLocation.DeepCopy(this.PlayerLocation),
          this.CameraInputController.ResetCameraInput(),
          this.CameraCollision.ResetBlendData()),
        this.CameraConfigController.CheckIfInAdjustCamera() &&
          t &&
          this.RestoreCameraFromAdjust();
    }
    PlaySettlementCamera() {
      this.SettlementCamera.PlaySettlementCamera();
    }
    PlayCameraRotator(t, i, s, h) {
      this.CameraRotatorController.PlayCameraRotator(t, i, s, h);
    }
    PlayCameraRotatorWithCurve(t, i, s, h, e = void 0) {
      this.CameraRotatorController.PlayCameraRotatorWithCurve(
        t,
        i,
        s,
        h,
        this.CameraRotateToTargetMinAlpha,
        this.CameraRotateToTargetMaxAlpha,
        e || this.CameraRotateToTargetCurve,
      );
    }
    PlayCameraEulerRotator(t, i) {
      this.CameraRotatorController.PlayCameraEulerRotator(t, i);
    }
    PlayCameraEulerRotatorWithCurve(t, i, s = void 0) {
      this.CameraRotatorController.PlayCameraEulerRotatorWithCurve(
        t,
        i,
        this.CameraRotateToTargetMinAlpha,
        this.CameraRotateToTargetMaxAlpha,
        s || this.CameraRotateToTargetCurve,
      );
    }
    ResetFocus() {
      var t = this.Character.CharacterActorComponent;
      t.ActorForwardProxy.Multiply(LOOK_AT_FORWARD_DISTANCE, this.DPr),
        this.DPr.AdditionEqual(t.ActorLocationProxy),
        this.PlayCameraRotatorWithCurve(
          t.ActorLocationProxy,
          this.DPr,
          this.RPr,
          RESET_FOCUS_ROTATION_TIME,
        );
    }
    ResetCameraInput() {
      this.CameraInputController.ResetCameraInput();
    }
    EnterSpecialGameplayCamera(t) {
      return (
        this.CameraSpecialGameplayController.EnterSpecialGameplayController(t),
        this.CameraSpecialGameplayController.CameraActor
      );
    }
    ExitSpecialGameplayCamera() {
      this.CameraSpecialGameplayController.ExitSpecialGameplayController();
    }
    RestoreCameraFromAdjust(t) {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 46, "Adjust相机恢复"),
        this.CameraConfigController.DisableHookConfig(t),
        RenderUtil_1.RenderUtil.EnableVelocityScreenSizeCull(),
        this.ExitCameraSpline(),
        this.ExitDepthOfField(),
        CameraController_1.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(
          !0,
        ),
        CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitFixSceneSubCamera(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SetCameraAimVisible,
          !1,
          0,
        ),
        ModelManager_1.ModelManager.InteractionModel.RecoverInteractFromLock();
    }
    GetCameraPitchInGravity() {
      var t = this.Character?.CharacterActorComponent?.MoveComp;
      return !t || t.IsStandardGravity
        ? MathUtils_1.MathUtils.WrapAngle(this.CameraRotation.Pitch)
        : Math.asin(this.CameraForward.DotProduct(t.GravityUp)) *
            MathUtils_1.MathUtils.RadToDeg;
    }
    ClearRollInGravity(t) {
      var i = this.Character?.CharacterActorComponent?.MoveComp;
      !i || i.IsStandardGravity
        ? (t.Roll = 0)
        : (t.Quaternion(this.TempQuat),
          this.TempQuat.RotateVector(
            Vector_1.Vector.ForwardVectorProxy,
            this.TempVector,
          ),
          MathUtils_1.MathUtils.LookRotationForwardFirst(
            this.TempVector,
            i.GravityUp,
            this.TempQuat,
          ),
          this.TempQuat.Rotator(t));
    }
  });
(FightCameraLogicComponent.o$a = Stats_1.Stat.Create("UpdatePlayerStat")),
  (FightCameraLogicComponent.n$a = Stats_1.Stat.Create("UpdateControllerStat")),
  (FightCameraLogicComponent.s$a = Stats_1.Stat.Create("ClampArmLengthStat")),
  (FightCameraLogicComponent.a$a = Stats_1.Stat.Create(
    "UpdateArmLocationStat",
  )),
  (FightCameraLogicComponent.l$a = Stats_1.Stat.Create("UpdatePitchStat")),
  (FightCameraLogicComponent.h$a = Stats_1.Stat.Create("UpdateYawStat")),
  (FightCameraLogicComponent._$a = Stats_1.Stat.Create("UpdateFadingStat")),
  (FightCameraLogicComponent.u$a = Stats_1.Stat.Create("UpdateActorTransStat")),
  (FightCameraLogicComponent.c$a = Stats_1.Stat.Create("CameraPostStat")),
  (FightCameraLogicComponent.m$a = new Map()),
  (FightCameraLogicComponent = FightCameraLogicComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(5)],
      FightCameraLogicComponent,
    )),
  (exports.FightCameraLogicComponent = FightCameraLogicComponent);
//# sourceMappingURL=FightCameraLogicComponent.js.map
