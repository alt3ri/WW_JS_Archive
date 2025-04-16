"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  Global_1 = require("../Global"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  UiCameraAnimationManager_1 = require("../Module/UiCameraAnimation/UiCameraAnimationManager"),
  GravityUtils_1 = require("../Utils/GravityUtils"),
  CameraUtility_1 = require("./CameraUtility");
class CameraBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static get TmpVector() {
    return (
      this.TmpVectorInternal ||
        (this.TmpVectorInternal = Vector_1.Vector.Create()),
      this.TmpVectorInternal
    );
  }
  static get TmpQuat() {
    return (
      this.TmpQuatInternal || (this.TmpQuatInternal = Quat_1.Quat.Create()),
      this.TmpQuatInternal
    );
  }
  static OnPossess(r) {
    ControllerHolder_1.ControllerHolder.CameraController.OnPossess(r);
  }
  static GetCameraMode() {
    return ControllerHolder_1.ControllerHolder.CameraController.Model
      .CameraMode;
  }
  static GetSequenceCameraActor() {
    return ControllerHolder_1.ControllerHolder.CameraController.Model.SequenceCamera.PlayerComponent.GetCurrentLevelSequenceActor();
  }
  static EnterCameraMode(r, e, t, a) {
    ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(
      r,
      e,
      t,
      a,
    );
  }
  static ExitCameraMode(r, e, t, a) {
    ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(
      r,
      e,
      t,
      a,
    );
  }
  static SetCameraRotation(r) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(
      r,
    );
  }
  static IsTargetSocketLocationValid() {
    return ControllerHolder_1.ControllerHolder.CameraController.FightCamera
      .LogicComponent.IsTargetLocationValid;
  }
  static GetTargetSocketLocation() {
    return ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.TargetLocation.ToUeVector();
  }
  static GetFightCameraLocation() {
    return ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraLocation.ToUeVector();
  }
  static GetFightCameraRotation() {
    return ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraRotation.ToUeRotator();
  }
  static GetFightCameraActor() {
    return ControllerHolder_1.ControllerHolder.CameraController.FightCamera
      .LogicComponent.CameraActor;
  }
  static SetFightCameraFollow(r) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.IsFollowing =
      r;
  }
  static ApplyCameraModify(r, e, t, a, o, i, l, n, c, s, C, u, _) {
    CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(C),
      i,
      u,
      (0, puerts_1.$unref)(_),
    ) &&
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraModify(
        r,
        e,
        t,
        a,
        i,
        l,
        o,
        n,
        c,
        void 0,
        s,
      );
  }
  static ApplyCameraGuide(r, e, t, a, o, i, l) {
    this.CacheLookAtVector ||
      (this.CacheLookAtVector = Vector_1.Vector.Create()),
      this.CacheLookAtVector.FromUeVector(r),
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(
        this.CacheLookAtVector,
        e,
        t,
        a,
        o,
        i,
        l,
      );
  }
  static EnterCameraExplore(r, e, t, a, o, i, l) {
    (e = UE.KismetMathLibrary.Conv_VectorToVectorDouble(e)),
      (t = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t));
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.EnterCameraExplore(
      r,
      e,
      t,
      a,
      o,
      i,
      l,
    );
  }
  static ExitCameraExplore(r) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitCameraExplore(
      r,
    );
  }
  static PlayCameraSequence(r, e, t, a, o, i, l, n, c, s, C, u, _, d) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    return (
      !!e &&
      !!(e = e.Entity?.GetComponent(3)?.Actor) &&
      !!CameraUtility_1.CameraUtility.CheckCameraSequenceCondition(e, r) &&
      ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(
        t,
        a,
        o,
        e,
        FNameUtil_1.FNameUtil.GetDynamicFName(i),
        FNameUtil_1.FNameUtil.GetDynamicFName(l),
        n,
        c,
        s,
        C,
        u,
        _,
        d,
      )
    );
  }
  static GetWidgetCameraActor() {
    return ControllerHolder_1.ControllerHolder.CameraController.WidgetCamera
      .DisplayComponent.CineCamera;
  }
  static SetWidgetCameraBlendParams(r, e, t, a, o, i, l, n, c, s, C) {
    l = UE.KismetMathLibrary.Conv_VectorToVectorDouble(l);
    ControllerHolder_1.ControllerHolder.CameraController.WidgetCamera.BlendComponent.SetBlendParams(
      r,
      e,
      t,
      a,
      o,
      i,
      l,
      n,
      c,
      s,
      C,
    );
  }
  static PlayCameraOrbital(r, e, t, a, o) {
    ControllerHolder_1.ControllerHolder.CameraController.OrbitalCamera.PlayerComponent.PlayCameraOrbital(
      r,
      e,
      t,
      a,
      o,
    );
  }
  static StopCameraOrbital() {
    ControllerHolder_1.ControllerHolder.CameraController.OrbitalCamera.PlayerComponent.StopCameraOrbital();
  }
  static ResetFightCameraPitchAndArmLength() {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
      Rotator_1.Rotator.ZeroRotator,
    );
  }
  static EnterSequenceDialogue(r) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraDialogueController.EnterSequenceDialogue(
      Vector_1.Vector.Create(r.D_K2_GetActorLocation()),
    );
  }
  static ExitSequenceDialogue() {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraDialogueController.ExitSequenceDialogue();
  }
  static ReloadCameraConfig() {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.LoadConfig(),
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraConfigController.LoadConfig();
  }
  static SetAimAssistMode(r) {
    ModelManager_1.ModelManager.CameraModel.SetAimAssistMode(r);
  }
  static IsRoleOnCameraRight() {
    var r =
        Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(1),
      e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      e.CameraRotation.Quaternion(CameraBlueprintFunctionLibrary.TmpQuat),
      CameraBlueprintFunctionLibrary.TmpQuat.RotateVector(
        Vector_1.Vector.RightVectorProxy,
        CameraBlueprintFunctionLibrary.TmpVector,
      ),
      0 <
        r.ActorLocationProxy.DotProduct(
          CameraBlueprintFunctionLibrary.TmpVector,
        ) -
          e.CameraLocation.DotProduct(CameraBlueprintFunctionLibrary.TmpVector)
    );
  }
  static GetIsCameraTargetInScreen() {
    var r =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    return (
      !!r?.IsTargetLocationValid &&
      r.CheckPositionInScreen(
        r.TargetLocation,
        r.CameraAdjustController.CheckInScreenMinX,
        r.CameraAdjustController.CheckInScreenMaxX,
        r.CameraAdjustController.CheckInScreenMinY,
        r.CameraAdjustController.CheckInScreenMaxY,
      )
    );
  }
  static EnterSpecialGameplayCamera(r) {
    var e =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (e) return e.EnterSpecialGameplayCamera(r);
  }
  static ExitSpecialGameplayCamera() {
    var r =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    r && r.ExitSpecialGameplayCamera();
  }
  static ExitSpecialGameplayCamera2() {
    var r =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    r && r.ExitSpecialGameplayCamera();
  }
  static SetAimAssistModeByKey(r, e) {
    ModelManager_1.ModelManager.CameraModel?.SetAimAssistModeWithKey(r, e);
  }
  static ClearAimAssistModeByKey(r) {
    ModelManager_1.ModelManager.CameraModel?.ClearAimAssistModeWithKey(r);
  }
  static SetSequenceCameraCollisionState(r) {
    var e =
      ModelManager_1.ModelManager?.CameraModel?.SequenceCamera?.PlayerComponent;
    e && e.SetCameraCollisionState(r);
  }
  static SetXRayState(r) {
    var e =
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera
        ?.LogicComponent?.CameraCollision;
    e &&
      ((e.IsPlayerXRayEnable = r), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Camera",
        57,
        "CameraBlueprintFunctionLibrary SetXRayState",
        ["isEnable", r],
      );
  }
  static SetCameraGravityMode(r, e) {
    var t =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    t?.Valid &&
      (CameraBlueprintFunctionLibrary.TmpVector.DeepCopy(
        e ?? Vector_1.Vector.DownVectorProxy,
      ),
      t.SetCameraGravityMode(r, CameraBlueprintFunctionLibrary.TmpVector));
  }
  static GetCameraGravityMode() {
    var r =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    return r?.Valid ? r.GravityMode : 0;
  }
  static GetCameraGravityDirect() {
    var r =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    return r?.Valid
      ? r.GravityDirect.ToUeVector()
      : Vector_1.Vector.DownVectorDouble;
  }
  static GetCameraGravityUp() {
    var r =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    return r?.Valid ? r.GravityUp.ToUeVector() : Vector_1.Vector.UpVectorDouble;
  }
  static GetCameraRotationInGravity() {
    var r =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    return r?.Valid
      ? r.CameraRotationInGravity.ToUeRotator()
      : Rotator_1.Rotator.ZeroRotator;
  }
  static GetPlayerLocationInGravity() {
    var r =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    return r?.Valid
      ? r.PlayerLocationInGravity.ToUeVector()
      : Vector_1.Vector.ZeroVectorDouble;
  }
  static GetPlayerRotatorInGravity() {
    var r =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    return r?.Valid
      ? r.PlayerRotatorInGravity.ToUeRotator()
      : Rotator_1.Rotator.ZeroRotator;
  }
}
(CameraBlueprintFunctionLibrary.CacheLookAtVector = void 0),
  (CameraBlueprintFunctionLibrary.TmpVectorInternal = void 0),
  (CameraBlueprintFunctionLibrary.TmpQuatInternal = void 0),
  (exports.default = CameraBlueprintFunctionLibrary);
//# sourceMappingURL=CameraBlueprintFunctionLibrary.js.map
