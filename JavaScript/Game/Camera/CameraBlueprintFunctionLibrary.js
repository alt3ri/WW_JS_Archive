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
  ModelManager_1 = require("../Manager/ModelManager"),
  CameraController_1 = require("./CameraController"),
  CameraUtility_1 = require("./CameraUtility");
class CameraBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
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
  static OnPossess(e) {
    CameraController_1.CameraController.OnPossess(e);
  }
  static GetCameraMode() {
    return CameraController_1.CameraController.Model.CameraMode;
  }
  static GetSequenceCameraActor() {
    return CameraController_1.CameraController.Model.SequenceCamera.PlayerComponent.GetCurrentLevelSequenceActor();
  }
  static EnterCameraMode(e, a, r, t) {
    CameraController_1.CameraController.EnterCameraMode(e, a, r, t);
  }
  static ExitCameraMode(e, a, r, t) {
    CameraController_1.CameraController.ExitCameraMode(e, a, r, t);
  }
  static SetCameraRotation(e) {
    CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
      e,
    );
  }
  static IsTargetSocketLocationValid() {
    return CameraController_1.CameraController.FightCamera.LogicComponent
      .IsTargetLocationValid;
  }
  static GetTargetSocketLocation() {
    return CameraController_1.CameraController.FightCamera.LogicComponent.TargetLocation.ToUeVector();
  }
  static GetFightCameraLocation() {
    return CameraController_1.CameraController.FightCamera.LogicComponent.CameraLocation.ToUeVector();
  }
  static GetFightCameraRotation() {
    return CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.ToUeRotator();
  }
  static GetFightCameraActor() {
    return CameraController_1.CameraController.FightCamera.LogicComponent
      .CameraActor;
  }
  static SetFightCameraFollow(e) {
    CameraController_1.CameraController.FightCamera.LogicComponent.IsFollowing =
      e;
  }
  static ApplyCameraModify(e, a, r, t, o, i, l, n, C, m, s, c, u) {
    CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(s),
      i,
      c,
      (0, puerts_1.$unref)(u),
    ) &&
      CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraModify(
        e,
        a,
        r,
        t,
        i,
        l,
        o,
        n,
        C,
        void 0,
        m,
      );
  }
  static ApplyCameraGuide(e, a, r, t, o, i, l) {
    this.CacheLookAtVector ||
      (this.CacheLookAtVector = Vector_1.Vector.Create()),
      this.CacheLookAtVector.FromUeVector(e),
      CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(
        this.CacheLookAtVector,
        a,
        r,
        t,
        o,
        i,
        l,
      );
  }
  static EnterCameraExplore(e, a, r, t, o, i, l) {
    CameraController_1.CameraController.FightCamera.LogicComponent.EnterCameraExplore(
      e,
      a,
      r,
      t,
      o,
      i,
      l,
    );
  }
  static ExitCameraExplore(e) {
    CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraExplore(
      e,
    );
  }
  static PlayCameraSequence(e, a, r, t, o, i, l, n, C, m, s, c, u, _) {
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(a);
    return (
      !!a &&
      !!(a = a.Entity?.GetComponent(3)?.Actor) &&
      !!CameraUtility_1.CameraUtility.CheckCameraSequenceCondition(a, e) &&
      CameraController_1.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(
        r,
        t,
        o,
        a,
        FNameUtil_1.FNameUtil.GetDynamicFName(i),
        FNameUtil_1.FNameUtil.GetDynamicFName(l),
        n,
        C,
        m,
        s,
        c,
        u,
        _,
      )
    );
  }
  static GetWidgetCameraActor() {
    return CameraController_1.CameraController.WidgetCamera.DisplayComponent
      .CineCamera;
  }
  static SetWidgetCameraBlendParams(e, a, r, t, o, i, l, n, C, m, s) {
    CameraController_1.CameraController.WidgetCamera.BlendComponent.SetBlendParams(
      e,
      a,
      r,
      t,
      o,
      i,
      l,
      n,
      C,
      m,
      s,
    );
  }
  static PlayCameraOrbital(e, a, r, t, o) {
    CameraController_1.CameraController.OrbitalCamera.PlayerComponent.PlayCameraOrbital(
      e,
      a,
      r,
      t,
      o,
    );
  }
  static StopCameraOrbital() {
    CameraController_1.CameraController.OrbitalCamera.PlayerComponent.StopCameraOrbital();
  }
  static ResetFightCameraPitchAndArmLength() {
    CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
      Rotator_1.Rotator.ZeroRotator,
    );
  }
  static EnterSequenceDialogue(e) {
    CameraController_1.CameraController.FightCamera.LogicComponent.CameraDialogueController.EnterSequenceDialogue(
      Vector_1.Vector.Create(e.K2_GetActorLocation()),
    );
  }
  static ExitSequenceDialogue() {
    CameraController_1.CameraController.FightCamera.LogicComponent.CameraDialogueController.ExitSequenceDialogue();
  }
  static ReloadCameraConfig() {
    CameraController_1.CameraController.FightCamera.LogicComponent.LoadConfig(),
      CameraController_1.CameraController.FightCamera.LogicComponent.CameraConfigController.LoadConfig();
  }
  static SetAimAssistMode(e) {
    ModelManager_1.ModelManager.CameraModel.SetAimAssistMode(e);
  }
  static IsRoleOnCameraRight() {
    var e =
        Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(1),
      a = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      a.CameraRotation.Quaternion(CameraBlueprintFunctionLibrary.TmpQuat),
      CameraBlueprintFunctionLibrary.TmpQuat.RotateVector(
        Vector_1.Vector.RightVectorProxy,
        CameraBlueprintFunctionLibrary.TmpVector,
      ),
      0 <
        e.ActorLocationProxy.DotProduct(
          CameraBlueprintFunctionLibrary.TmpVector,
        ) -
          a.CameraLocation.DotProduct(CameraBlueprintFunctionLibrary.TmpVector)
    );
  }
  static GetIsCameraTargetInScreen() {
    var e =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    return (
      !!e?.IsTargetLocationValid &&
      e.CheckPositionInScreen(
        e.TargetLocation,
        e.CameraAdjustController.CheckInScreenMinX,
        e.CameraAdjustController.CheckInScreenMaxX,
        e.CameraAdjustController.CheckInScreenMinY,
        e.CameraAdjustController.CheckInScreenMaxY,
      )
    );
  }
  static EnterSpecialGameplayCamera(e) {
    var a =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (a) return a.EnterSpecialGameplayCamera(e);
  }
  static ExitSpecialGameplayCamera() {
    var e =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    e && e.ExitSpecialGameplayCamera();
  }
  static ExitSpecialGameplayCamera2() {
    var e =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    e && e.ExitSpecialGameplayCamera();
  }
  static SetAimAssistModeByKey(e, a) {
    ModelManager_1.ModelManager.CameraModel?.SetAimAssistModeWithKey(e, a);
  }
  static ClearAimAssistModeByKey(e) {
    ModelManager_1.ModelManager.CameraModel?.ClearAimAssistModeWithKey(e);
  }
  static SetSequenceCameraCollisionState(e) {
    var a =
      ModelManager_1.ModelManager?.CameraModel?.SequenceCamera?.PlayerComponent;
    a && a.SetCameraCollisionState(e);
  }
  static SetXRayState(e) {
    var a =
      CameraController_1.CameraController.FightCamera?.LogicComponent
        ?.CameraCollision;
    a &&
      ((a.IsPlayerXRayEnable = e), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Camera",
        58,
        "CameraBlueprintFunctionLibrary SetXRayState",
        ["isEnable", e],
      );
  }
}
(CameraBlueprintFunctionLibrary.CacheLookAtVector = void 0),
  (CameraBlueprintFunctionLibrary.TmpVectorInternal = void 0),
  (CameraBlueprintFunctionLibrary.TmpQuatInternal = void 0),
  (exports.default = CameraBlueprintFunctionLibrary);
//# sourceMappingURL=CameraBlueprintFunctionLibrary.js.map
