"use strict";
var FightCameraLogicComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, h) {
      var e,
        a = arguments.length,
        r =
          a < 3
            ? i
            : null === h
              ? (h = Object.getOwnPropertyDescriptor(i, s))
              : h;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, i, s, h);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (e = t[o]) &&
            (r = (a < 3 ? e(r) : 3 < a ? e(i, s, r) : e(i, s)) || r);
      return 3 < a && r && Object.defineProperty(i, s, r), r;
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
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
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
  CloudGameManager_1 = require("../Manager/CloudGameManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
  CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CharacterGlideComponent_1 = require("../NewWorld/Character/Common/Component/CharacterGlideComponent"),
  CharacterLockOnComponent_1 = require("../NewWorld/Character/Common/Component/LockOn/CharacterLockOnComponent"),
  RenderUtil_1 = require("../Render/Utils/RenderUtil"),
  ColorUtils_1 = require("../Utils/ColorUtils"),
  GravityUtils_1 = require("../Utils/GravityUtils"),
  CameraCollision_1 = require("./CameraCollision"),
  CameraRotationZone_1 = require("./CameraRotationZone"),
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
  CAMER_TARGET_BUFFER_TIME = 0.25,
  vehicleWaterFall = 401464757,
  POINT_SIZE = 20,
  LINELEHGTH = 2e3,
  LINE_SIZE = 5,
  CIRCLE_SEGMENT = 48,
  CAMERA_DIRECTION_LENGTH = 500,
  CAMERA_DIRECTION_ARROW_SIZE = 2e3;
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
      (this.WorldYawMax = 0),
      (this.CameraOffsetFloatUpMin = 0),
      (this.CameraOffsetFloatUpMax = 0);
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
        (this.CameraOffsetFloatUpArmLengthMin = 0),
        (this.CameraOffsetFloatUpArmLengthMax = 0),
        (this.CameraOffsetFloatUpMin = 0),
        (this.CameraOffsetFloatUpMax = 0),
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
        (this.ArmCenterRightReverseSpeed = 0),
        (this.ArmCenterRightReverseRotationEdge = 0),
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
        (this.CameraZoneMode = 0),
        (this.YawZoneSpeedMin = 0),
        (this.YawZoneSpeedMax = 0),
        (this.YawSoftZoneMin = 0),
        (this.YawSoftZoneMax = 0),
        (this.YawDeadZoneMin = 0),
        (this.YawDeadZoneMax = 0),
        (this.YawDeadZoneTransToSoftZoneSpeedRatio = 0),
        (this.YawTransToForwardSpeedRatio = 0),
        (this.YawInputEnableTime = 0),
        (this.YawRollbackEnableTime = 0),
        (this.PitchInputEnableTime = 0),
        (this.PitchRollbackEnableTime = 0),
        (this.PitchSoftZoneMin = 0),
        (this.PitchSoftZoneMax = 0),
        (this.PitchDeadZoneMin = 0),
        (this.PitchDeadZoneMax = 0),
        (this.PitchBasis = 0),
        (this.PitchZoneSpeedMin = 0),
        (this.PitchZoneSpeedMax = 0),
        (this.CharAddArmLength = 0),
        (this.CharAddZ = 0),
        (this.CameraArmLocationSocketName = FNameUtil_1.FNameUtil.EMPTY),
        (this.cPr = !1),
        (this.Character = void 0),
        (this.CharacterController = void 0),
        (this.CharacterEntityHandle = void 0),
        (this.CharacterInputComponent = void 0),
        (this.mPr = void 0),
        (this.CharacterDriveVehicleComponent = void 0),
        (this.CharacterMoveEnterState =
          CharacterUnifiedStateTypes_1.ECharMoveState.Other),
        (this.gDn = !1),
        (this.FollowShooterEntityHandle = void 0),
        (this.FollowShooterTagComponentInternal = void 0),
        (this.TargetEntity = void 0),
        (this.dPr = void 0),
        (this.TargetSocketName = void 0),
        (this.CPr = void 0),
        (this.IsFollowing = !0),
        (this.ArmLocationFadeElapseTime = -0),
        (this.VehicleActorComponent = void 0),
        (this.VehicleMoveComponent = void 0),
        (this.VehicleAnimationComponent = void 0),
        (this.GongduolaPerformComponent = void 0),
        (this.PlayerRotator = Rotator_1.Rotator.Create()),
        (this.PlayerLocation = Vector_1.Vector.Create()),
        (this.PlayerLocationForDither = Vector_1.Vector.Create()),
        (this.TargetLocation = Vector_1.Vector.Create()),
        (this.PlayerVehicleDeltaLocation = Vector_1.Vector.Create()),
        (this.TempArmLength = 0),
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
        (this.Bh1 = [this.CameraConfigController]),
        (this.kh1 = [
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
        (this.k7a = Vector_1.Vector.Create()),
        (this.N7a = Vector_1.Vector.Create()),
        (this.F7a = Quat_1.Quat.Create()),
        (this.V7a = Quat_1.Quat.Create()),
        (this.M1h = Vector_1.Vector.Create()),
        (this.TempVector = Vector_1.Vector.Create()),
        (this.TempVector2 = Vector_1.Vector.Create()),
        (this.TempVector3 = Vector_1.Vector.Create()),
        (this.TempVector4 = Vector_1.Vector.Create()),
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
        (this.CameraRotationZone = void 0),
        (this.SettlementCamera = void 0),
        (this.QZh = void 0),
        (this.KZh = void 0),
        (this.CurrentArmCenterForwardEdgeMin = 0),
        (this.CurrentArmCenterForwardEdgeMax = 0),
        (this.CurrentArmCenterRightEdgeMin = 0),
        (this.CurrentArmCenterRightEdgeMax = 0),
        (this.CurrentArmCenterUpEdgeMin = 0),
        (this.CurrentArmCenterUpEdgeMax = 0),
        (this.pTn = 0),
        (this.vTn = 0),
        (this.yP_ = 0),
        (this.SP_ = 0),
        (this.EnableVehicleWaterFallCamera = !1),
        (this.TPr = 0),
        (this.GravityMode = 2),
        (this.GravityDirect = Vector_1.Vector.Create(0, 0, -1)),
        (this.GravityUp = Vector_1.Vector.Create(0, 0, 1)),
        (this.GravityQuat = Quat_1.Quat.Create()),
        (this.GravityInverseQuat = Quat_1.Quat.Create()),
        (this.CameraRotationInGravity = Rotator_1.Rotator.Create()),
        (this.PlayerLocationInGravity = Vector_1.Vector.Create()),
        (this.PlayerRotatorInGravity = Rotator_1.Rotator.Create()),
        (this.LPr = !1),
        (this.DPr = Vector_1.Vector.Create(0, 0, 0)),
        (this.RPr = Rotator_1.Rotator.Create(0, 0, 0)),
        (this.fii = (0, puerts_1.$ref)(void 0)),
        (this.UPr = (0, puerts_1.$ref)(0)),
        (this.APr = (0, puerts_1.$ref)(0)),
        (this.H6_ = CAMER_TARGET_BUFFER_TIME),
        (this.$6_ = 0),
        (this.W6_ = !1),
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
        (this.cFl = () => {
          4 !== ModelManager_1.ModelManager.TeleportModel.TeleportMode &&
            this.ResetFightCameraLogic();
        }),
        (this.Ilt = () => {
          4 !== ModelManager_1.ModelManager.TeleportModel.TeleportMode &&
            this.ResetInitialCameraRotation();
        }),
        (this.nye = () => {
          ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel ||
            (this.ResetFightCameraLogic(!1), this.ResetInitialCameraRotation());
        }),
        (this.BPr = (t) => {
          t || this.ResetFightCameraLogic(!1);
        }),
        (this.M6l = (t) => {
          t.IsRolePassenger(!0) &&
            t.VehicleEntity?.Valid &&
            ((this.VehicleActorComponent = t.VehicleEntity.GetComponent(231)),
            (this.VehicleMoveComponent = t.VehicleEntity.GetComponent(233)),
            (this.VehicleAnimationComponent =
              t.VehicleEntity.GetComponent(232)),
            (this.GongduolaPerformComponent =
              t.VehicleEntity.GetComponent(242)));
        }),
        (this.E6l = (t) => {
          t.IsRolePassenger(!0) &&
            ((this.VehicleActorComponent = void 0),
            (this.VehicleMoveComponent = void 0),
            (this.VehicleAnimationComponent = void 0),
            this.PlayerVehicleDeltaLocation.Reset());
        }),
        (this.ns1 = (t) => {
          t.IsRolePassenger(!0) &&
            t.VehicleEntity?.Valid &&
            (this.VehicleActorComponent?.Valid &&
            this.VehicleAnimationComponent?.Valid
              ? (this.j$e(this.TempVector2),
                this.VehicleAnimationComponent.GetCameraPosition(
                  this.TempVector3,
                ),
                this.TempVector2.Subtraction(
                  this.TempVector3,
                  this.PlayerVehicleDeltaLocation,
                ),
                (this.VehicleAnimationComponent.HasModelBuffer()
                  ? (this.TempQuat.DeepCopy(
                      this.VehicleAnimationComponent.GetMeshTransform().GetRotation(),
                    ),
                    this.TempQuat)
                  : this.VehicleActorComponent.ActorQuatProxy
                ).Inverse(this.TempQuat),
                this.TempQuat.RotateVector(
                  this.PlayerVehicleDeltaLocation,
                  this.PlayerVehicleDeltaLocation,
                ))
              : this.PlayerVehicleDeltaLocation.Reset());
        }),
        (this.hUe = (t, i) => {
          (this.CharacterMoveEnterState = i),
            TimerSystem_1.TimerSystem.Next((t) => {
              this.CharacterMoveEnterState =
                CharacterUnifiedStateTypes_1.ECharMoveState.Other;
            });
        }),
        (this.$hc = (t, i) => {
          this.Whc();
        }),
        (this.UWi = (t, i) => {
          t !== vehicleWaterFall ||
            this.EnableVehicleWaterFallCamera ||
            this.W6_ ||
            ((this.W6_ = !0), (this.$6_ = 0));
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
    SetConfigs(t, i, s, h) {
      if (((this.CameraArmLocationSocketName = h), t)) {
        for (var [e, a] of t) {
          e = this.$.get(e);
          this.f1e(e, a);
        }
        for (var [r, o] of this.$)
          void 0 === this[o] &&
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                57,
                "CameraDefault缺少配置",
                ["tagName", s],
                ["key", r],
                ["value", o],
              ),
            this.f1e(o, 1));
        (0 <= this.ArmCenterForwardEdgeMin ||
          0 <= this.ArmCenterRightEdgeMin ||
          0 <= this.ArmCenterUpEdgeMin ||
          this.ArmCenterForwardEdgeMax <= 0 ||
          this.ArmCenterRightEdgeMax <= 0 ||
          this.ArmCenterUpEdgeMax <= 0) &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Camera",
            57,
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
        for (var [n, l] of i) {
          n = this.C1e.get(n);
          this.p1e(n, l);
        }
        for (var [_, C] of this.C1e)
          void 0 === this[C] &&
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                57,
                "CameraDefault缺少曲线配置",
                ["tagName", s],
                ["key", _],
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
        this.CameraConfigController.GetDefaultConfig()
          .CameraArmLocationSocketName,
      );
    }
    ApplyConfig() {
      (this.DesiredCamera.ArmLength = this.ArmLength),
        (this.DesiredCamera.MinArmLength = this.MinArmLength),
        (this.DesiredCamera.MaxArmLength = this.MaxArmLength),
        (this.DesiredCamera.YawLimitMin = this.YawLimitMin),
        (this.DesiredCamera.YawLimitMax = this.YawLimitMax),
        (this.DesiredCamera.PitchLimitMin =
          CameraUtility_1.CameraUtility.GetValidPitchAngle(
            this.PitchLimitMin,
            !0,
          )),
        (this.DesiredCamera.PitchLimitMax =
          CameraUtility_1.CameraUtility.GetValidPitchAngle(
            this.PitchLimitMax,
            !1,
          )),
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
        (this.DesiredCamera.CameraOffsetFloatUpMin =
          this.CameraOffsetFloatUpMin),
        (this.DesiredCamera.CameraOffsetFloatUpMax =
          this.CameraOffsetFloatUpMax),
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
        this.SetConfigMap(88, "CameraOffsetFloatUpArmLengthMin"),
        this.SetConfigMap(89, "CameraOffsetFloatUpArmLengthMax"),
        this.SetConfigMap(90, "CameraOffsetFloatUpMin"),
        this.SetConfigMap(91, "CameraOffsetFloatUpMax"),
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
        this.SetConfigMap(75, "ArmCenterRightReverseSpeed"),
        this.SetConfigMap(76, "ArmCenterRightReverseRotationEdge"),
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
        this.SetConfigMap(70, "CameraZoneMode"),
        this.SetConfigMap(66, "YawSoftZoneMin"),
        this.SetConfigMap(66, "YawSoftZoneMin"),
        this.SetConfigMap(67, "YawSoftZoneMax"),
        this.SetConfigMap(68, "YawDeadZoneMin"),
        this.SetConfigMap(69, "YawDeadZoneMax"),
        this.SetConfigMap(71, "YawZoneSpeedMin"),
        this.SetConfigMap(72, "YawZoneSpeedMax"),
        this.SetConfigMap(73, "YawDeadZoneTransToSoftZoneSpeedRatio"),
        this.SetConfigMap(74, "YawTransToForwardSpeedRatio"),
        this.SetConfigMap(77, "YawInputEnableTime"),
        this.SetConfigMap(78, "YawRollbackEnableTime"),
        this.SetConfigMap(79, "PitchInputEnableTime"),
        this.SetConfigMap(80, "PitchRollbackEnableTime"),
        this.SetConfigMap(81, "PitchSoftZoneMin"),
        this.SetConfigMap(82, "PitchSoftZoneMax"),
        this.SetConfigMap(83, "PitchDeadZoneMin"),
        this.SetConfigMap(84, "PitchDeadZoneMax"),
        this.SetConfigMap(85, "PitchBasis"),
        this.SetConfigMap(86, "PitchZoneSpeedMin"),
        this.SetConfigMap(87, "PitchZoneSpeedMax"),
        this.SetConfigMap(92, "CharAddArmLength"),
        this.SetConfigMap(93, "CharAddZ"),
        (this.InitialCameraPitch =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "InitialCameraPitch",
          )),
        (this.CameraCollision = new CameraCollision_1.CameraCollision()),
        this.CameraCollision.Init(this),
        (this.CameraRotationZone =
          new CameraRotationZone_1.CameraRotationZone()),
        this.CameraRotationZone.Init(this),
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
          "CameraRotationZone",
          "SettlementCamera",
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnEnterVehicle,
          this.M6l,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnLeaveVehicle,
          this.E6l,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnAfterAttachVehicle,
          this.ns1,
        ),
        !0
      );
    }
    LoadConfig() {
      this.ele = this.Entity.GetComponent(4);
      var t =
        Info_1.Info.IsMobileInputModel() ||
        CloudGameManager_1.CloudGameManager.IsCloudGame
          ? MOBILE_CONFIG_PATH
          : CONFIG_PATH;
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
      a,
      r = BREAK_BLEND_OUT_TIME,
      o = void 0,
      n = void 0,
      l = void 0,
      _ = "",
      C = void 0,
    ) {
      this.CameraModifyController.ApplyCameraModify(
        t,
        i,
        s,
        h,
        r,
        e,
        a,
        o,
        n,
        l,
        _,
        C,
      );
    }
    StopCameraModify(t) {
      this.CameraModifyController.StopCameraModify(t);
    }
    ApplyCameraGuide(t, i, s, h, e, a, r, o = !1) {
      this.CameraGuideController.ApplyCameraGuide(t, i, s, h, e, a, r, o);
    }
    ApplyCameraHook(t, i = void 0) {
      this.CameraHookController.ApplyCameraHook(t, i);
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
    ApplyRadialBlur(t, i, s, h, e, a) {
      var r = this.CameraActor?.CameraComponent?.PostProcessSettings;
      r &&
        (void 0 !== t
          ? ((r.bOverride_KuroRadialBlurIntensity = !0),
            (r.KuroRadialBlurIntensity = t))
          : (r.bOverride_KuroRadialBlurIntensity = !1),
        void 0 !== i
          ? ((r.bOverride_KuroRadialBlurCenter = !0),
            (r.KuroRadialBlurCenter = i))
          : (r.bOverride_KuroRadialBlurCenter = !1),
        void 0 !== s
          ? ((r.bOverride_KuroRadialBlurRadius = !0),
            (r.KuroRadialBlurRadius = s))
          : (r.bOverride_KuroRadialBlurRadius = !1),
        void 0 !== h
          ? ((r.bOverride_KuroRadialBlurHardness = !0),
            (r.KuroRadialBlurHardness = h))
          : (r.bOverride_KuroRadialBlurHardness = !1),
        void 0 !== e
          ? ((r.bOverride_KuroRadialBlurPassNumber = !0),
            (r.KuroRadialBlurPassNumber = e))
          : (r.bOverride_KuroRadialBlurPassNumber = !1),
        void 0 !== a
          ? ((r.bOverride_KuroRadialBlurSampleNumber = !0),
            (r.KuroRadialBlurSampleNumber = a))
          : (r.bOverride_KuroRadialBlurSampleNumber = !1));
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
    EnterCameraExplore(t, i, s, h, e, a, r) {
      this.CameraRunningController.EnterCameraExplore(t, i, s, h, e, a, r);
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
      !t || t.ContainsNaN()
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Camera", 57, "rotation is invalid: ", [
            "rotation",
            t,
          ])
        : (this.DesiredCamera.ArmRotation.DeepCopy(t),
          this.CurrentCamera.ArmRotation.DeepCopy(t),
          this.SetRotationInternal(t),
          this.CurrentCamera.ArmRotation.Quaternion().RotateVector(
            Vector_1.Vector.ForwardVectorProxy,
            this.CameraForward,
          ));
    }
    SetPawn(t) {
      t instanceof TsBaseCharacter_1.default
        ? this.SetCharacter(t)
        : t?.IsValid() || this.SetCharacter(void 0);
    }
    SetCharacter(t) {
      ModelManager_1.ModelManager.CameraModel?.FirstPersonEnabled &&
        this.Character !== t &&
        (this.Character?.CharRenderingComponent?.SetDitherApplyAll(),
        t?.CharRenderingComponent?.SetDitherApplyHeadsOnly()),
        this.CharacterEntityHandle?.Valid &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.CharacterEntityHandle.Entity,
            EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
            this.hUe,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.CharacterEntityHandle.Entity,
            EventDefine_1.EEventName.CharGravityDirectChanged,
            this.$hc,
          )),
        this.mPr?.Valid &&
          this.mPr.RemoveTagAddOrRemoveListener(vehicleWaterFall, this.UWi),
        (this.Character = t)
          ? ((this.cPr = this.Character?.IsValid() ?? !1),
            (this.CharacterEntityHandle =
              ModelManager_1.ModelManager.CreatureModel.GetEntityById(
                this.Character.EntityId,
              )),
            (this.CharacterInputComponent =
              this.CharacterEntityHandle?.Entity?.GetComponent(61)),
            (this.CharacterController =
              this.CharacterInputComponent?.CharacterController),
            (this.mPr = this.CharacterEntityHandle?.Entity?.GetComponent(203)),
            (this.CharacterDriveVehicleComponent =
              this.CharacterEntityHandle?.Entity?.GetComponent(226)),
            this.Character.SetDitherEffect(1, 1),
            this.CameraCollision.SetCharacter(t),
            this.CameraRotationZone.SetCharacter(this.CharacterEntityHandle),
            (t =
              this.CharacterEntityHandle.Entity.GetComponent(
                0,
              ).GetRoleConfig()),
            (this.SPr = t.CameraFloatHeight),
            (this.ContainsTag(1674960297) || this.GetUsingGoBattle()) &&
              this.ResetArmLocation(!0, this.CameraLocationFadeTime),
            this.Whc(),
            EventSystem_1.EventSystem.AddWithTarget(
              this.CharacterEntityHandle.Entity,
              EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
              this.hUe,
            ),
            EventSystem_1.EventSystem.AddWithTarget(
              this.CharacterEntityHandle.Entity,
              EventDefine_1.EEventName.CharGravityDirectChanged,
              this.$hc,
            ),
            this.mPr?.Valid &&
              this.mPr.AddTagAddOrRemoveListener(vehicleWaterFall, this.UWi))
          : ((this.cPr = !1),
            (this.CharacterEntityHandle = void 0),
            (this.CharacterInputComponent = void 0),
            (this.mPr = void 0),
            (this.CharacterDriveVehicleComponent = void 0),
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
              this.FollowShooterEntityHandle?.Entity?.GetComponent(203)))
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
      CameraUtility_1.CameraUtility.SetPitchInGravity(
        this.CameraRotation,
        this.InitialCameraPitch,
        this.CameraRotation,
      ),
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
                i.ArmRotation.Yaw - this.PlayerRotatorInGravity.Yaw,
              ),
            )),
            (t.YawLimitMin = -Math.abs(s)),
            (t.YawLimitMax = Math.abs(s)))
          : ((t.YawLimitMin = i.YawLimitMin), (t.YawLimitMax = i.YawLimitMax)),
        (t.PitchLimitMin = CameraUtility_1.CameraUtility.GetValidPitchAngle(
          i.PitchLimitMin,
          !0,
        )),
        (t.PitchLimitMax = CameraUtility_1.CameraUtility.GetValidPitchAngle(
          i.PitchLimitMax,
          !1,
        )),
        (t.LookDownOffsetZ = i.LookDownOffsetZ),
        (t.LookUpOffsetZ = i.LookUpOffsetZ),
        (t.WorldYawMin = i.WorldYawMin),
        (t.WorldYawMax = i.WorldYawMax),
        (t.CameraOffsetFloatUpMin = i.CameraOffsetFloatUpMin),
        (t.CameraOffsetFloatUpMax = i.CameraOffsetFloatUpMax),
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
            Log_1.Log.Error("Camera", 57, "ZoomModifier is Zero"),
          (t.ZoomModifier = 1));
    }
    StartFade(t, i, s, h, e, a, r) {
      (this.CurrentCamera.ArmRotation.Pitch =
        MathUtils_1.MathUtils.StandardizingPitch(
          this.CurrentCamera.ArmRotation.Pitch,
        )),
        this.CopyVirtualCamera(this.LastCamera, this.CurrentCamera, !0),
        (this.EUo = s),
        (this.pPr = h),
        (this.vPr = e),
        (this.MPr = a),
        (this.Fading = !0),
        (this.pUo = t),
        (this.vUo = 0),
        (this.MUo = i),
        (this.IsUniqueFade = r),
        (this.yP_ = this.SP_),
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
        this.SetCameraGravityMode(2),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.BeforeTeleportComplete,
          this.cFl,
        ),
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
        this.CameraRotationZone.Clear(),
        this.SettlementCamera.Clear(),
        (this.CameraConfig = void 0),
        (this.ele = void 0),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.BeforeTeleportComplete,
          this.cFl,
        ),
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
    ForceTickOutSide() {
      this.OnAfterTick(0);
    }
    OnAfterTick(t) {
      (this.cPr = this.Character?.IsValid() ?? !1),
        this.CameraActor?.IsValid() &&
          this.cPr &&
          (0 !== ModelManager_1.ModelManager.CameraModel.CameraMode
            ? (ControllerHolder_1.ControllerHolder.PhotographController.IsOpenPhotograph() ||
                this.Character.SetDitherEffect(1, 1),
              this.CameraCollision?.ResetAllNpcDither())
            : ((t = t * MathUtils_1.MathUtils.MillisecondToSecond),
              this.qPr(),
              this.Qhc(),
              this.RefreshPlayerLocation(t),
              this.Khc(),
              FightCameraLogicComponent_1.Uza.Start(),
              this.GPr(),
              this.Oh1(t),
              this.qh1(t),
              this.Gh1(t),
              FightCameraLogicComponent_1.Uza.Stop(),
              this.OPr() &&
                (this.DesiredCamera.ArmLength = MathUtils_1.MathUtils.Clamp(
                  this.DesiredCamera.ArmLength,
                  this.DesiredCamera.MinArmLength,
                  this.DesiredCamera.MaxArmLength,
                )),
              this.kPr(t),
              this.DUo(),
              this.LUo(t),
              this.FPr(t),
              this.RUo(t),
              this.VPr(t),
              FightCameraLogicComponent_1.Oza.Start(),
              (this.vTn = this.CameraActor.CameraComponent.FieldOfView),
              (this.CameraActor.CameraComponent.FieldOfView =
                this.CurrentCamera.Fov),
              this.HPr(),
              this.jPr(),
              this.MTn(),
              FightCameraLogicComponent_1.Oza.Stop(),
              this.CharacterController?.SetControlRotation(
                this.CurrentCamera.ArmRotation.ToUeRotator(),
              ),
              this.$Zh()));
    }
    Oh1(t) {
      for (const i of this.Bh1) i.Update(t);
    }
    Gh1(t) {
      for (const i of this.kh1) i.Update(t);
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
    XPr(t, i, s, h, e, a, r, o) {
      var n = t - i,
        r = Math.abs(n) / ((r - a) / 2),
        a = MathUtils_1.MathUtils.Lerp(h, e, o.GetCurrentValue(r)) * s;
      return n < 0
        ? MathUtils_1.MathUtils.Clamp(t + a, t, i)
        : MathUtils_1.MathUtils.Clamp(t - a, i, t);
    }
    $Pr(t, i, s, h, e, a, r, o) {
      var n = t - i;
      if (n < 0) {
        const l = MathUtils_1.MathUtils.Lerp(h, e, o.GetCurrentValue(n / a)),
          _ = l * s;
        return MathUtils_1.MathUtils.Clamp(t + _, i + a, i);
      }
      const l = MathUtils_1.MathUtils.Lerp(h, e, o.GetCurrentValue(n / r)),
        _ = l * s;
      return MathUtils_1.MathUtils.Clamp(t - _, i, i + r);
    }
    S1h(t, i, s, h, e, a, r, o) {
      var n = t - i,
        h =
          MathUtils_1.MathUtils.Lerp(
            h,
            e,
            o.GetCurrentValue(Math.abs(n) / Math.abs(a)),
          ) * s;
      return this.CameraRotationZone.IsHasPitchHorizontalMovement()
        ? this.CameraRotationZone.IsPitchRollback()
          ? 0 < n
            ? t - MathUtils_1.MathUtils.Clamp(h, 0, n)
            : t + MathUtils_1.MathUtils.Clamp(h, 0, -n)
          : t
        : this.CameraRotationZone.IsHasPitchUpMovement()
          ? MathUtils_1.MathUtils.Clamp(t - h, i + a, i + r)
          : MathUtils_1.MathUtils.Clamp(t + h, i + a, i + r);
    }
    a1l(t, i, s, h, e, a, r, o, n, l) {
      var _ = this.Character.CharacterActorComponent.InputDirectProxy;
      if (
        MathUtils_1.MathUtils.IsNearlyZero(
          _.Y,
          MathUtils_1.MathUtils.KindaSmallNumber,
        )
      ) {
        var C = t - i;
        if (0 < C) {
          const v = a * s;
          return t - MathUtils_1.MathUtils.Clamp(v, 0, C);
        }
        const v = a * s;
        return t + MathUtils_1.MathUtils.Clamp(v, 0, -C);
      }
      if (!this.CameraRotationZone.IsYawInputEnable()) return t;
      (a = this.PlayerRotatorInGravity.Yaw),
        (C = CameraUtility_1.CameraUtility.GetYawInGravity(
          this.CameraRotation,
        )),
        (C = MathUtils_1.MathUtils.WrapAngle(C - a));
      if (_.Y < 0) {
        if (C < 0) return t;
        const m = MathUtils_1.MathUtils.Lerp(h, e, n.GetCurrentValue(C / l)),
          v = m * s;
        return MathUtils_1.MathUtils.Clamp(t - v, i + r, i + o);
      }
      if (0 < C) return t;
      const m = MathUtils_1.MathUtils.Lerp(h, e, n.GetCurrentValue(-C / l)),
        v = m * s;
      return MathUtils_1.MathUtils.Clamp(t + v, i + r, i + o);
    }
    kPr(t) {
      var i;
      this.IsFollowing &&
        (this.CameraRotationZone.UpdateInputState(t),
        this.H7a(),
        this.V7a.RotateVector(this.PlayerLocation, this.TempVector),
        this.V7a.RotateVector(this.TmpArmLocation, this.TempVector2),
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
        1 === this.CameraZoneMode
          ? (this.TempVector2.X = this.S1h(
              this.M1h.X + this.TempVector.X,
              this.TempVector.X,
              t,
              this.ArmCenterForwardSpeedMin,
              this.ArmCenterForwardSpeedMax,
              this.CurrentArmCenterForwardEdgeMin,
              this.CurrentArmCenterForwardEdgeMax,
              this.ArmCenterForwardCurve,
            ))
          : (this.TempVector2.X = this.$Pr(
              this.TempVector2.X,
              this.TempVector.X,
              t,
              this.ArmCenterForwardSpeedMin,
              this.ArmCenterForwardSpeedMax,
              this.CurrentArmCenterForwardEdgeMin,
              this.CurrentArmCenterForwardEdgeMax,
              this.ArmCenterForwardCurve,
            )),
        1 === this.CameraZoneMode
          ? (this.TempVector2.Y = this.a1l(
              this.M1h.Y + this.TempVector.Y,
              this.TempVector.Y,
              t,
              this.ArmCenterRightSpeedMin,
              this.ArmCenterRightSpeedMax,
              this.ArmCenterRightReverseSpeed,
              this.CurrentArmCenterRightEdgeMin,
              this.CurrentArmCenterRightEdgeMax,
              this.ArmCenterRightCurve,
              this.ArmCenterRightReverseRotationEdge,
            ))
          : (this.TempVector2.Y = this.$Pr(
              this.TempVector2.Y,
              this.TempVector.Y,
              t,
              this.ArmCenterRightSpeedMin,
              this.ArmCenterRightSpeedMax,
              this.CurrentArmCenterRightEdgeMin,
              this.CurrentArmCenterRightEdgeMax,
              this.ArmCenterRightCurve,
            )),
        1 === this.CameraZoneMode
          ? (this.TempVector2.Z = this.S1h(
              this.M1h.Z + this.TempVector.Z,
              this.TempVector.Z,
              t,
              this.ArmCenterUpSpeedMin,
              this.ArmCenterUpSpeedMax,
              this.CurrentArmCenterUpEdgeMin,
              this.CurrentArmCenterUpEdgeMax,
              this.ArmCenterUpCurve,
            ))
          : (this.TempVector2.Z = this.$Pr(
              this.TempVector2.Z,
              this.TempVector.Z,
              t,
              this.ArmCenterUpSpeedMin,
              this.ArmCenterUpSpeedMax,
              this.CurrentArmCenterUpEdgeMin,
              this.CurrentArmCenterUpEdgeMax,
              this.ArmCenterUpCurve,
            )),
        this.TempVector2.Subtraction(this.TempVector, this.M1h),
        this.F7a.RotateVector(this.TempVector2, this.TmpArmLocation)),
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
    YPr() {
      return (
        (this.SP_ = this.Fading
          ? this.SP_
          : MathUtils_1.MathUtils.RangeClamp(
              this.TempArmLength,
              this.CameraOffsetFloatUpArmLengthMin,
              this.CameraOffsetFloatUpArmLengthMax,
              0,
              1,
            )),
        MathUtils_1.MathUtils.Lerp(
          this.CurrentCamera.CameraOffsetFloatUpMin,
          this.CurrentCamera.CameraOffsetFloatUpMax,
          this.SP_,
        ) +
          MathUtils_1.MathUtils.RangeClamp(
            this.TempArmLength,
            this.FloatUpArmLengthMax,
            this.FloatUpArmLengthMin,
            0,
            this.SPr,
          )
      );
    }
    qh1(t) {
      this.Fading &&
        ((this.vUo += t),
        this.vUo >= this.pUo ||
          ((t = this.MUo.GetCurrentValue(this.vUo / this.pUo)),
          this.EUo && !this.IsModifiedArmLength
            ? (this.CurrentCamera.ArmLength = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.ArmLength,
                this.DesiredCamera.ArmLength,
                t,
              ))
            : ((this.EUo = !1),
              (this.CurrentCamera.ArmLength = this.DesiredCamera.ArmLength)),
          (this.CurrentCamera.MinArmLength = MathUtils_1.MathUtils.Lerp(
            this.LastCamera.MinArmLength,
            this.DesiredCamera.MinArmLength,
            t,
          )),
          (this.CurrentCamera.MaxArmLength = MathUtils_1.MathUtils.Lerp(
            this.LastCamera.MaxArmLength,
            this.DesiredCamera.MaxArmLength,
            t,
          ))));
    }
    RUo(t) {
      var i, s;
      this.Fading
        ? this.vUo >= this.pUo
          ? ((this.Fading = !1),
            (this.yP_ = this.SP_),
            this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.AdjustCameraSync,
            ))
          : (this.CurrentCamera.ArmLocation.DeepCopy(
              this.DesiredCamera.ArmLocation,
            ),
            (this.CurrentCamera.ZoomModifier = this.DesiredCamera.ZoomModifier),
            (i = this.MUo.GetCurrentValue(this.vUo / this.pUo)),
            (this.CurrentCamera.YawLimitMin = MathUtils_1.MathUtils.Lerp(
              this.LastCamera.YawLimitMin,
              this.DesiredCamera.YawLimitMin,
              i,
            )),
            (this.CurrentCamera.YawLimitMax = MathUtils_1.MathUtils.Lerp(
              this.LastCamera.YawLimitMax,
              this.DesiredCamera.YawLimitMax,
              i,
            )),
            (this.CurrentCamera.PitchLimitMin =
              CameraUtility_1.CameraUtility.GetValidPitchAngle(
                MathUtils_1.MathUtils.Lerp(
                  this.LastCamera.PitchLimitMin,
                  this.DesiredCamera.PitchLimitMin,
                  i,
                ),
                !0,
              )),
            (this.CurrentCamera.PitchLimitMax =
              CameraUtility_1.CameraUtility.GetValidPitchAngle(
                MathUtils_1.MathUtils.Lerp(
                  this.LastCamera.PitchLimitMax,
                  this.DesiredCamera.PitchLimitMax,
                  i,
                ),
                !1,
              )),
            (this.CurrentCamera.LookDownOffsetZ = MathUtils_1.MathUtils.Lerp(
              this.LastCamera.LookDownOffsetZ,
              this.DesiredCamera.LookDownOffsetZ,
              i,
            )),
            (this.CurrentCamera.LookUpOffsetZ = MathUtils_1.MathUtils.Lerp(
              this.LastCamera.LookUpOffsetZ,
              this.DesiredCamera.LookUpOffsetZ,
              i,
            )),
            (this.CurrentCamera.WorldYawMin = MathUtils_1.MathUtils.Lerp(
              this.LastCamera.WorldYawMin,
              this.DesiredCamera.WorldYawMin,
              i,
            )),
            (this.CurrentCamera.WorldYawMax = MathUtils_1.MathUtils.Lerp(
              this.LastCamera.WorldYawMax,
              this.DesiredCamera.WorldYawMax,
              i,
            )),
            (this.CurrentCamera.CameraOffsetFloatUpMin =
              MathUtils_1.MathUtils.Lerp(
                this.LastCamera.CameraOffsetFloatUpMin,
                this.DesiredCamera.CameraOffsetFloatUpMin,
                i,
              )),
            (this.CurrentCamera.CameraOffsetFloatUpMax =
              MathUtils_1.MathUtils.Lerp(
                this.LastCamera.CameraOffsetFloatUpMax,
                this.DesiredCamera.CameraOffsetFloatUpMax,
                i,
              )),
            (s = MathUtils_1.MathUtils.RangeClamp(
              this.TempArmLength,
              this.CameraOffsetFloatUpArmLengthMin,
              this.CameraOffsetFloatUpArmLengthMax,
              0,
              1,
            )),
            (this.SP_ = MathUtils_1.MathUtils.Lerp(this.yP_, s, i)),
            this.pPr
              ? Vector_1.Vector.Lerp(
                  this.LastCamera.ArmOffset,
                  this.DesiredCamera.ArmOffset,
                  i,
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
                  i,
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
                  i,
                ))
              : ((this.MPr = !1),
                (this.CurrentCamera.Fov = this.DesiredCamera.Fov)))
        : this.CopyVirtualCamera(this.CurrentCamera, this.DesiredCamera);
    }
    VPr(t) {
      var i, s, h;
      this.cPr
        ? ((i = this.YPr() + this.CharAddZ),
          (s = this.CurrentCamera.ArmRotation),
          this.CameraModifyController.IsModified ||
            this.CameraModifyController.IsModifyFadeOut ||
            this.ClearRollInGravity(s),
          this.cae.DeepCopy(this.CurrentCamera.ArmLocation),
          (h = this.cae),
          this.TempVector.DeepCopy(
            UE.KismetMathLibrary.Conv_VectorDoubleToVector(
              this.Character.CharacterActorComponent.ActorTransform.TransformVectorNoScale(
                this.CurrentCamera.ArmOffset.ToUeVector(!0),
              ),
            ),
          ),
          h.AdditionEqual(this.TempVector),
          h.AdditionEqual(this.CameraAutoController.CurrentAutoCameraArmOffset),
          h.AdditionEqual(this.CameraGuideController.CurrentCameraArmOffset),
          GravityUtils_1.GravityUtils.AddZnInGravityForActor(
            this.Character?.CharacterActorComponent,
            h,
            i,
          ),
          s.Quaternion(this.TempQuat),
          this.TempQuat.RotateVector(
            Vector_1.Vector.ForwardVectorProxy,
            this.CameraForward,
          ),
          this.CurrentCamera.ArmRotation.Vector(this.yPr),
          this.CameraForward.Multiply(-this.TempArmLength, this.yPr),
          h.Addition(this.yPr, this.TempDesireLocation),
          this.TempVector.DeepCopy(this.CurrentCamera.CameraOffset),
          void 0 !== this.CameraFocusController.AddCameraOffsetY &&
            (this.TempVector.Y += this.CameraFocusController.AddCameraOffsetY),
          this.TempQuat.RotateVector(this.TempVector, this.yPr),
          this.TempDesireLocation.AdditionEqual(this.yPr),
          this.CameraLocation.DeepCopy(
            this.CameraCollision.CheckCollision(
              this.PlayerLocation,
              this.TempDesireLocation,
              t,
            ),
          ),
          this.SetRotationInternal(s),
          this.CameraLocation.ContainsNaN()
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                57,
                "CameraLocation Contains NaN: " +
                  this.CameraLocation.ToString(),
              )
            : this.CameraActor.D_K2_SetActorLocationAndRotation(
                this.CameraLocation.ToUeVector(!0),
                s.ToUeRotator(),
                !0,
                void 0,
                !1,
              ),
          this.CameraLocation.Subtraction(this.PlayerLocation, this.TempVector),
          (this.TPr = this.TempVector.Size()))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 22, "Character 不存在");
    }
    DUo() {
      this.CameraModifyController.IsModified ||
      this.CameraModifyController.IsModifyFadeOut
        ? (this.TempArmLength = this.GetArmLengthWithSettingAndZoom(
            this.CurrentCamera,
            !1,
          ))
        : (this.TempArmLength = this.GetArmLengthWithSettingAndZoom(
            this.CurrentCamera,
            !0,
          )),
        (this.TempArmLength +=
          this.CameraAutoController.CurrentAutoCameraArmLengthAddition),
        (this.TempArmLength +=
          this.CameraGuideController.CurrentCameraArmLengthAddition),
        (this.TempArmLength += this.CharAddArmLength);
    }
    LUo(t) {
      let i = 0;
      this.CameraRotationZone.UpdatePitchZone(t),
        this.IsInNormalGravityMode()
          ? ((i = MathUtils_1.MathUtils.Clamp(
              this.DesiredCamera.ArmRotation.Pitch,
              this.CurrentCamera.PitchLimitMin,
              this.CurrentCamera.PitchLimitMax,
            )),
            (this.DesiredCamera.ArmRotation.Pitch = i))
          : (this.DesiredCamera.ArmRotation.Quaternion(this.TempQuat),
            this.TempQuat.RotateVector(
              Vector_1.Vector.ForwardVectorProxy,
              this.TempVector,
            ),
            (i =
              Math.asin(this.TempVector.DotProduct(this.GravityUp)) *
              MathUtils_1.MathUtils.RadToDeg),
            (t = MathUtils_1.MathUtils.Clamp(
              i,
              this.CurrentCamera.PitchLimitMin,
              this.CurrentCamera.PitchLimitMax,
            )),
            i !== t &&
              (this.TempRotator.Set(t - i, 0, 0),
              this.TempRotator.Quaternion(this.TempQuat2),
              this.TempQuat.Multiply(this.TempQuat2, this.TempQuat3),
              this.TempQuat3.Rotator(this.DesiredCamera.ArmRotation),
              (i = t)));
      let s = this.CurrentCamera.PitchLimitMax,
        h = this.DesiredCamera.LookUpOffsetZ;
      i < 0 &&
        ((i = Math.abs(i)),
        (s = Math.abs(this.CurrentCamera.PitchLimitMin)),
        (h = this.DesiredCamera.LookDownOffsetZ));
      t = MathUtils_1.MathUtils.RangeClamp(i, 0, s, 0, h);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(
        this.Character?.CharacterActorComponent,
        this.DesiredCamera.ArmLocation,
        t,
      );
    }
    FPr(i) {
      let s = 0;
      this.CameraRotationZone.UpdateYawZone(i);
      var i = this.CurrentCamera.YawLimitMin,
        h = this.CurrentCamera.YawLimitMax,
        e = (h - i) % 360;
      if (
        MathUtils_1.MathUtils.IsNearlyZero(e) ||
        MathUtils_1.MathUtils.IsNearlyEqual(e, 360)
      )
        this.IsInNormalGravityMode()
          ? (this.DesiredCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.Clamp(
              MathUtils_1.MathUtils.WrapAngle(
                this.DesiredCamera.ArmRotation.Yaw,
              ),
              this.CurrentCamera.WorldYawMin,
              this.CurrentCamera.WorldYawMax,
            ))
          : ((e = CameraUtility_1.CameraUtility.GetYawInGravity(
              this.DesiredCamera.ArmRotation,
            )),
            (e = MathUtils_1.MathUtils.Clamp(
              e,
              this.CurrentCamera.WorldYawMin,
              this.CurrentCamera.WorldYawMax,
            )),
            CameraUtility_1.CameraUtility.SetYawInGravity(
              this.DesiredCamera.ArmRotation,
              e,
              this.DesiredCamera.ArmRotation,
            ));
      else {
        (e = this.PlayerRotatorInGravity.Yaw),
          (i = MathUtils_1.MathUtils.WrapAngle(e + i)),
          (e = MathUtils_1.MathUtils.WrapAngle(e + h)),
          (h = CameraUtility_1.CameraUtility.GetYawInGravity(
            this.DesiredCamera.ArmRotation,
          ));
        let t = 0;
        if (i < e && (e < h || h < i))
          (t = MathUtils_1.MathUtils.WrapAngle(0.5 * (i + e))),
            (s = MathUtils_1.MathUtils.WrapAngle(h < t ? i : e));
        else {
          if (!(e < i && e < h && h < i)) return;
          (t = MathUtils_1.MathUtils.WrapAngle(0.5 * (e + i))),
            (s = MathUtils_1.MathUtils.WrapAngle(h > t ? i : e));
        }
        CameraUtility_1.CameraUtility.SetYawInGravity(
          this.DesiredCamera.ArmRotation,
          MathUtils_1.MathUtils.Clamp(
            s,
            this.CurrentCamera.WorldYawMin,
            this.CurrentCamera.WorldYawMax,
          ),
          this.DesiredCamera.ArmRotation,
        );
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
        (t = this.CharacterEntityHandle?.Entity?.GetComponent(32))?.Valid &&
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
              (this.dPr = this.TargetEntity.Entity.GetComponent(203))),
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
        i = this.CharacterEntityHandle.Entity.GetComponent(61);
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
    H7a() {
      let t = void 0;
      var i;
      (t = this.IsInNormalGravityMode()
        ? Vector_1.Vector.UpVectorProxy
        : this.GravityUp),
        (this.k7a.Equals(t) && this.N7a.Equals(this.CameraForward)) ||
          (this.k7a.DeepCopy(t),
          this.N7a.DeepCopy(this.CameraForward),
          this.TempVector.DeepCopy(this.CameraForward),
          (i = this.TempVector.DotProduct(t)) >
          1 - MathUtils_1.MathUtils.KindaSmallNumber
            ? (this.CameraRotation.Quaternion(this.TempQuat),
              this.TempQuat.RotateVector(
                Vector_1.Vector.DownVectorProxy,
                this.TempVector,
              ))
            : -i > 1 - MathUtils_1.MathUtils.KindaSmallNumber &&
              (this.CameraRotation.Quaternion(this.TempQuat),
              this.TempQuat.RotateVector(
                Vector_1.Vector.UpVectorProxy,
                this.TempVector,
              )),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            this.TempVector,
            t,
            this.F7a,
          ),
          this.F7a.Inverse(this.V7a));
    }
    SetInputEnable(t, i) {
      this.CameraInputController.SetInputEnable(t, i);
    }
    Qhc() {
      this.FVc() ||
        this.PlayerRotator.FromUeRotator(
          this.Character.CharacterActorComponent.ActorRotationProxy,
        ),
        CameraUtility_1.CameraUtility.GetRotatorInGravity(
          this.PlayerRotator,
          this.PlayerRotatorInGravity,
        );
    }
    RefreshPlayerLocation(t) {
      this.Q6_(t) ||
        (this.j$e(this.PlayerLocation),
        this.ContainsTag(-648310348) &&
          (t = this.CharacterEntityHandle?.Entity.GetComponent(0)) &&
          ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
            t.GetSummonerId(),
          )),
          (t = EntitySystem_1.EntitySystem.GetComponent(t, 1))) &&
          this.CameraCollision.TraceCheckPlayerLocation(
            t.ActorLocationProxy,
            this.PlayerLocation,
            this.PlayerLocation,
          ));
    }
    Khc() {
      CameraUtility_1.CameraUtility.GetVectorInGravity(
        this.PlayerLocation,
        this.PlayerLocationInGravity,
      );
    }
    j$e(t) {
      FNameUtil_1.FNameUtil.IsEmpty(this.CameraArmLocationSocketName)
        ? (this.CharacterEntityHandle?.Entity.GetComponent(
            175,
          ).GetCameraPosition(t),
          this.Character?.Mesh &&
            (this.TempVector.FromUeVector(
              this.Character.Mesh.D_GetSocketLocation(
                CharacterNameDefines_1.CharacterNameDefines.ROOT,
              ),
            ),
            t.AdditionEqual(this.TempVector),
            this.TempVector.FromUeVector(
              this.Character.Mesh.D_K2_GetComponentLocation(),
            ),
            t.SubtractionEqual(this.TempVector)))
        : CameraUtility_1.CameraUtility.GetSocketLocation(
            void 0,
            this.CameraArmLocationSocketName,
            t,
            this.CharacterEntityHandle,
          );
    }
    GetCameraTargetRotator(t) {
      this.CharacterDriveVehicleComponent?.IsOnVehicle &&
      this.VehicleActorComponent?.Valid
        ? t.DeepCopy(this.VehicleActorComponent.ActorRotationProxy)
        : t.DeepCopy(this.PlayerRotator);
    }
    CheckPositionInScreen(t, i, s, h, e) {
      var a = Global_1.Global.CharacterController;
      return (
        !!UE.GameplayStatics.D_ProjectWorldToScreen(
          a,
          t.ToUeVector(),
          this.fii,
          !1,
        ) &&
        ((a = (0, puerts_1.$unref)(this.fii)),
        this.GetScreenPositionIsInRange(a, i, s, h, e))
      );
    }
    GetScreenPositionIsInRange(t, i, s, h, e) {
      Global_1.Global.CharacterController.GetViewportSize(this.UPr, this.APr);
      var a = (0, puerts_1.$unref)(this.UPr),
        r = (0, puerts_1.$unref)(this.APr);
      return t.X > a * i && t.X < a * s && t.Y > r * h && t.Y < r * e;
    }
    AdjustPitch(t) {
      var i = this.Character.CharacterActorComponent,
        t =
          (this.TempVector.DeepCopy(t),
          GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
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
          (t = GravityUtils_1.GravityUtils.GetZnInGravityForActor(
            i,
            this.TempVector,
          )) < 0) &&
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
        this.CharacterEntityHandle.Entity.GetComponent(91).GoBattleSkill
      );
    }
    TargetContainsTag(t) {
      return this.dPr?.HasTag(t) ?? !1;
    }
    AccompanyContainsTag(t) {
      return this.FollowShooterTagComponentInternal?.HasTag(t) ?? !1;
    }
    SetRotationInternal(t) {
      this.CameraRotation.DeepCopy(t),
        this.IsInNormalGravityMode()
          ? this.CameraRotationInGravity.DeepCopy(this.CameraRotation)
          : GravityUtils_1.GravityUtils.GetRotatorInGravity(
              this.CameraRotation,
              this.GravityInverseQuat,
              this.CameraRotationInGravity,
            ),
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
        this.j$e(this.PlayerLocationForDither);
        var s = Vector_1.Vector.DistSquared(
          this.PlayerLocationForDither,
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
    SetCameraGravityMode(t, i = Vector_1.Vector.DownVectorProxy) {
      i.IsNormalized()
        ? this.GravityMode !== t &&
          ((this.GravityMode = t),
          0 === this.GravityMode
            ? (this.GravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy),
              this.GravityDirect.UnaryNegation(this.GravityUp))
            : 1 === this.GravityMode
              ? (this.GravityDirect.DeepCopy(i),
                this.GravityDirect.UnaryNegation(this.GravityUp))
              : 2 === this.GravityMode &&
                (this.GravityDirect.DeepCopy(
                  GravityUtils_1.GravityUtils.GetGravityDirectForActor(
                    this.Character?.CharacterActorComponent,
                  ),
                ),
                this.GravityUp.DeepCopy(
                  GravityUtils_1.GravityUtils.GetGravityUpForActor(
                    this.Character?.CharacterActorComponent,
                  ),
                )),
          Quat_1.Quat.FindBetween(
            Vector_1.Vector.UpVectorProxy,
            this.GravityUp,
            this.GravityQuat,
          ),
          this.GravityQuat.Inverse(this.GravityInverseQuat),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Camera",
            57,
            "SetCameraGravityMode",
            ["this.CameraGravityMode", this.GravityMode],
            ["this.CameraGravityDirect", this.GravityDirect],
            ["this.CameraGravityUp", this.GravityUp],
            ["this.GravityQuaternion", this.GravityQuat],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Camera",
            57,
            "设置相机重力方向失败，因为不是归一化的向量",
            ["gravityDirect", i],
          );
    }
    IsInNormalGravityMode() {
      return (
        0 === this.GravityMode ||
        MathUtils_1.MathUtils.IsNearlyEqual(
          this.GravityDirect.Z,
          -1,
          MathCommon_1.MathCommon.KindaSmallNumber,
        )
      );
    }
    Whc() {
      2 === this.GravityMode &&
        (this.GravityDirect.DeepCopy(
          GravityUtils_1.GravityUtils.GetGravityDirectForActor(
            this.Character?.CharacterActorComponent,
          ),
        ),
        this.GravityUp.DeepCopy(
          GravityUtils_1.GravityUtils.GetGravityUpForActor(
            this.Character?.CharacterActorComponent,
          ),
        ),
        Quat_1.Quat.FindBetween(
          Vector_1.Vector.UpVectorProxy,
          this.GravityUp,
          this.GravityQuat,
        ),
        this.GravityQuat.Inverse(this.GravityInverseQuat),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Camera",
          57,
          "CharGravityDirectChanged",
          ["this.CameraGravityMode", this.GravityMode],
          ["this.CameraGravityDirect", this.GravityDirect],
          ["this.CameraGravityUp", this.GravityUp],
          ["this.GravityQuaternion", this.GravityQuat],
          ["this.GravityInverseQuat", this.GravityInverseQuat],
        );
    }
    ResetFightCameraLogic(t = !0, i = !1) {
      i
        ? (this.V7a.RotateVector(this.PlayerLocation, this.TempVector2),
          this.V7a.RotateVector(this.TmpArmLocation, this.TempVector3),
          this.TempVector3.SubtractionEqual(this.TempVector2),
          this.j$e(this.PlayerLocation),
          this.H7a(),
          this.V7a.RotateVector(this.PlayerLocation, this.TempVector2),
          this.TempVector3.AdditionEqual(this.TempVector2),
          this.F7a.RotateVector(this.TempVector3, this.TmpArmLocation),
          this.CurrentCamera.ArmLocation.DeepCopy(this.TmpArmLocation),
          this.CameraCollision.SetCameraBlendPauseType(1))
        : (this.j$e(this.PlayerLocation),
          this.CurrentCamera.ArmLocation.DeepCopy(this.PlayerLocation),
          this.TmpArmLocation.DeepCopy(this.PlayerLocation),
          this.CameraInputController.ResetCameraInput(),
          this.CameraCollision.ResetBlendData()),
        this.CameraConfigController.CheckIfInAdjustCamera() &&
          t &&
          ModelManager_1.ModelManager.TeleportModel.NeedRestoreCamera &&
          this.RestoreCameraFromAdjust();
    }
    PlaySettlementCamera(t = "Battle") {
      this.SettlementCamera.PlaySettlementCamera(t);
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
    PlayCameraEulerRotatorWithCurve(t, i, s = void 0, h = !0, e = 0) {
      this.CameraRotatorController.PlayCameraEulerRotatorWithCurve(
        t,
        i,
        this.CameraRotateToTargetMinAlpha,
        this.CameraRotateToTargetMaxAlpha,
        s || this.CameraRotateToTargetCurve,
        h,
        e,
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
    RestoreCameraFromAdjust(t, i = void 0) {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 45, "Adjust相机恢复"),
        this.CameraConfigController.DisableHookConfig(t),
        RenderUtil_1.RenderUtil.EnableVelocityScreenSizeCull(),
        this.ExitCameraSpline(),
        this.ExitDepthOfField(),
        ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(
          !0,
        ),
        ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitFixSceneSubCamera(
          i,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SetCameraAimVisible,
          !1,
          0,
        ),
        ModelManager_1.ModelManager.InteractionModel.RecoverInteractFromLock(),
        ControllerHolder_1.ControllerHolder.CameraController.SetFirstPersonEnable(
          !1,
        );
    }
    GetCameraPitchInGravity() {
      return this.IsInNormalGravityMode()
        ? MathUtils_1.MathUtils.WrapAngle(this.CameraRotation.Pitch)
        : Math.asin(this.CameraForward.DotProduct(this.GravityUp)) *
            MathUtils_1.MathUtils.RadToDeg;
    }
    ClearRollInGravity(t) {
      this.IsInNormalGravityMode()
        ? (t.Roll = 0)
        : (t.Quaternion(this.TempQuat),
          this.TempQuat.RotateVector(
            Vector_1.Vector.ForwardVectorProxy,
            this.TempVector,
          ),
          MathUtils_1.MathUtils.LookRotationForwardFirst(
            this.TempVector,
            this.GravityUp,
            this.TempQuat,
          ),
          this.TempQuat.Rotator(t));
    }
    FVc() {
      return (
        !!(
          this.CharacterDriveVehicleComponent?.Valid &&
          this.CharacterDriveVehicleComponent?.IsOnVehicle &&
          this.VehicleActorComponent?.Valid &&
          this.GongduolaPerformComponent?.Valid
        ) &&
        !(
          !this.ContainsTag(vehicleWaterFall) ||
          !this.GongduolaPerformComponent.IsWaterfallDynamicGravity ||
          (this.PlayerRotator.DeepCopy(
            this.VehicleActorComponent.ActorRotationProxy,
          ),
          0)
        )
      );
    }
    Q6_(t) {
      if (
        !(
          this.CharacterDriveVehicleComponent?.Valid &&
          this.CharacterDriveVehicleComponent?.IsOnVehicle &&
          this.VehicleActorComponent?.Valid &&
          this.GongduolaPerformComponent?.Valid
        )
      )
        return !1;
      if (!this.W6_) {
        if (
          this.ContainsTag(vehicleWaterFall) &&
          this.GongduolaPerformComponent.IsWaterfallDynamicGravity
        ) {
          const i = this.TempVector4;
          return (
            this.VehicleActorComponent.ActorQuatProxy.RotateVector(
              this.PlayerVehicleDeltaLocation,
              i,
            ),
            this.VehicleAnimationComponent.GetCameraPosition(
              this.PlayerLocation,
            ),
            this.PlayerLocation.AdditionEqual(i),
            !0
          );
        }
        return !1;
      }
      const i = this.TempVector4;
      this.VehicleActorComponent.ActorQuatProxy.RotateVector(
        this.PlayerVehicleDeltaLocation,
        i,
      );
      var s = this.TempVector2,
        h = this.TempVector3,
        t =
          (this.ContainsTag(vehicleWaterFall) &&
          this.GongduolaPerformComponent.IsWaterfallDynamicGravity
            ? (this.j$e(s),
              this.VehicleAnimationComponent.GetCameraPosition(h),
              h.AdditionEqual(i))
            : (this.VehicleAnimationComponent.GetCameraPosition(s),
              s.AdditionEqual(i),
              this.j$e(h)),
          (this.$6_ += t),
          MathUtils_1.MathUtils.Clamp(this.$6_ / this.H6_, 0, 1));
      return (
        (this.W6_ = t < 1),
        Vector_1.Vector.Lerp(s, h, t, this.PlayerLocation),
        !0
      );
    }
    $Zh() {
      var t, i;
      !(
        this.CharacterEntityHandle?.Entity?.GetComponent(173)?.MoveState ===
        CharacterUnifiedStateTypes_1.ECharMoveState.Soar
      ) ||
      this.CharacterEntityHandle?.Entity?.GetComponent(191)?.HasTag(
        -53663352,
      ) ||
      (this.QZh ||
        (this.QZh = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          CharacterGlideComponent_1.SOAR_CAMERA_SHAKE_CURVE_PATH,
          UE.CurveFloat,
        )),
      (t =
        this.Character?.CharacterActorComponent?.ActorVelocityProxy.Size() ??
        0),
      (t = this.QZh.GetFloatValue(t)) <= 0)
        ? this.KZh &&
          (Global_1.Global.CharacterCameraManager.StopCameraShake(this.KZh),
          (this.KZh = void 0))
        : this.KZh
          ? (this.KZh.ShakeScale = t)
          : ((i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              CharacterGlideComponent_1.SOAR_CAMERA_SHAKE_PATH,
              UE.Class,
            )),
            (this.KZh = Global_1.Global.CharacterCameraManager.StartCameraShake(
              i,
              t,
            )));
    }
    OnClear() {
      return (
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnEnterVehicle,
          this.M6l,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnLeaveVehicle,
          this.E6l,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnAfterAttachVehicle,
          this.ns1,
        ),
        this.CharacterEntityHandle?.Valid &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.CharacterEntityHandle.Entity,
            EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
            this.hUe,
          ),
        this.mPr?.Valid &&
          this.mPr.RemoveTagAddOrRemoveListener(vehicleWaterFall, this.UWi),
        !0
      );
    }
  });
(FightCameraLogicComponent.Rza = Stats_1.Stat.Create("UpdatePlayerStat")),
  (FightCameraLogicComponent.Uza = Stats_1.Stat.Create("UpdateControllerStat")),
  (FightCameraLogicComponent.xza = Stats_1.Stat.Create("ClampArmLengthStat")),
  (FightCameraLogicComponent.Pza = Stats_1.Stat.Create(
    "UpdateArmLocationStat",
  )),
  (FightCameraLogicComponent.MP_ = Stats_1.Stat.Create("UpdateArmLengthStat")),
  (FightCameraLogicComponent.wza = Stats_1.Stat.Create("UpdatePitchStat")),
  (FightCameraLogicComponent.Bza = Stats_1.Stat.Create("UpdateYawStat")),
  (FightCameraLogicComponent.bza = Stats_1.Stat.Create("UpdateFadingStat")),
  (FightCameraLogicComponent.qza = Stats_1.Stat.Create("UpdateActorTransStat")),
  (FightCameraLogicComponent.Oza = Stats_1.Stat.Create("CameraPostStat")),
  (FightCameraLogicComponent.Gza = new Map()),
  (FightCameraLogicComponent = FightCameraLogicComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(5)],
      FightCameraLogicComponent,
    )),
  (exports.FightCameraLogicComponent = FightCameraLogicComponent);
//# sourceMappingURL=FightCameraLogicComponent.js.map
