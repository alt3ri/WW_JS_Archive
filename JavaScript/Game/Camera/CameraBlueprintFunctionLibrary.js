"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts");
const UE = require("ue");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const Global_1 = require("../Global");
const ModelManager_1 = require("../Manager/ModelManager");
const CameraController_1 = require("./CameraController");
const CameraUtility_1 = require("./CameraUtility");
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
  static OnPossess(a) {
    CameraController_1.CameraController.OnPossess(a);
  }
  static GetCameraMode() {
    return CameraController_1.CameraController.Model.CameraMode;
  }
  static GetSequenceCameraActor() {
    return CameraController_1.CameraController.Model.SequenceCamera.PlayerComponent.GetCurrentLevelSequenceActor();
  }
  static EnterCameraMode(a, e, r, t) {
    CameraController_1.CameraController.EnterCameraMode(a, e, r, t);
  }
  static ExitCameraMode(a, e, r, t) {
    CameraController_1.CameraController.ExitCameraMode(a, e, r, t);
  }
  static SetCameraRotation(a) {
    CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
      a,
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
  static GetFightCameraActor() {
    return CameraController_1.CameraController.FightCamera.LogicComponent
      .CameraActor;
  }
  static SetFightCameraFollow(a) {
    CameraController_1.CameraController.FightCamera.LogicComponent.IsFollowing =
      a;
  }
  static ApplyCameraModify(a, e, r, t, o, i, n, l, C, c, s, m, M) {
    CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(s),
      i,
      m,
      (0, puerts_1.$unref)(M),
    ) &&
      CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraModify(
        a,
        e,
        r,
        t,
        i,
        n,
        o,
        l,
        C,
        void 0,
        c,
      );
  }
  static ApplyCameraGuide(a, e, r, t, o, i, n) {
    this.CacheLookAtVector ||
      (this.CacheLookAtVector = Vector_1.Vector.Create()),
      this.CacheLookAtVector.FromUeVector(a),
      CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(
        this.CacheLookAtVector,
        e,
        r,
        t,
        o,
        i,
        n,
      );
  }
  static EnterCameraExplore(a, e, r, t, o, i, n) {
    CameraController_1.CameraController.FightCamera.LogicComponent.EnterCameraExplore(
      a,
      e,
      r,
      t,
      o,
      i,
      n,
    );
  }
  static ExitCameraExplore(a) {
    CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraExplore(
      a,
    );
  }
  static PlayCameraSequence(a, e, r, t, o, i, n, l, C, c, s, m, M, _) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    return (
      !!e &&
      !!(e = e.Entity?.GetComponent(3)?.Actor) &&
      !!CameraUtility_1.CameraUtility.CheckCameraSequenceCondition(e, a) &&
      CameraController_1.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(
        r,
        t,
        o,
        e,
        FNameUtil_1.FNameUtil.GetDynamicFName(i),
        FNameUtil_1.FNameUtil.GetDynamicFName(n),
        l,
        C,
        c,
        s,
        m,
        M,
        _,
      )
    );
  }
  static GetWidgetCameraActor() {
    return CameraController_1.CameraController.WidgetCamera.DisplayComponent
      .CineCamera;
  }
  static SetWidgetCameraBlendParams(a, e, r, t, o, i, n, l, C, c, s) {
    CameraController_1.CameraController.WidgetCamera.BlendComponent.SetBlendParams(
      a,
      e,
      r,
      t,
      o,
      i,
      n,
      l,
      C,
      c,
      s,
    );
  }
  static PlayCameraOrbital(a, e, r, t, o) {
    CameraController_1.CameraController.OrbitalCamera.PlayerComponent.PlayCameraOrbital(
      a,
      e,
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
  static EnterSequenceDialogue(a) {
    CameraController_1.CameraController.FightCamera.LogicComponent.CameraDialogueController.EnterSequenceDialogue(
      Vector_1.Vector.Create(a.K2_GetActorLocation()),
    );
  }
  static ExitSequenceDialogue() {
    CameraController_1.CameraController.FightCamera.LogicComponent.CameraDialogueController.ExitSequenceDialogue();
  }
  static ReloadCameraConfig() {
    CameraController_1.CameraController.FightCamera.LogicComponent.LoadConfig(),
      CameraController_1.CameraController.FightCamera.LogicComponent.CameraConfigController.LoadConfig();
  }
  static SetAimAssistMode(a) {
    ModelManager_1.ModelManager.CameraModel.SetAimAssistMode(a);
  }
  static IsRoleOnCameraRight() {
    const a =
      Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(1);
    const e =
      ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      e.CameraRotation.Quaternion(CameraBlueprintFunctionLibrary.TmpQuat),
      CameraBlueprintFunctionLibrary.TmpQuat.RotateVector(
        Vector_1.Vector.RightVectorProxy,
        CameraBlueprintFunctionLibrary.TmpVector,
      ),
      a.ActorLocationProxy.DotProduct(
        CameraBlueprintFunctionLibrary.TmpVector,
      ) -
        e.CameraLocation.DotProduct(CameraBlueprintFunctionLibrary.TmpVector) >
        0
    );
  }
  static SetCameraDebugToolEnabled(a) {
    void 0 !==
      ModelManager_1.ModelManager?.CameraModel?.CameraDebugToolEnabled &&
      (ModelManager_1.ModelManager.CameraModel.CameraDebugToolEnabled = a);
  }
  static SwitchCameraDebugToolDrawCameraCollision() {
    void 0 !==
      ModelManager_1.ModelManager?.CameraModel
        ?.CameraDebugToolDrawCameraCollision &&
      (ModelManager_1.ModelManager.CameraModel.CameraDebugToolDrawCameraCollision =
        !ModelManager_1.ModelManager.CameraModel
          .CameraDebugToolDrawCameraCollision);
  }
  static SwitchCameraDebugToolDrawSpringArm() {
    void 0 !==
      ModelManager_1.ModelManager?.CameraModel?.CameraDebugToolDrawSpringArm &&
      (ModelManager_1.ModelManager.CameraModel.CameraDebugToolDrawSpringArm =
        !ModelManager_1.ModelManager?.CameraModel
          ?.CameraDebugToolDrawSpringArm);
  }
  static SwitchCameraDebugToolDrawFocusTargetLine() {
    void 0 !==
      ModelManager_1.ModelManager?.CameraModel
        ?.CameraDebugToolDrawFocusTargetLine &&
      (ModelManager_1.ModelManager.CameraModel.CameraDebugToolDrawFocusTargetLine =
        !ModelManager_1.ModelManager.CameraModel
          .CameraDebugToolDrawFocusTargetLine);
  }
  static SwitchCameraDebugToolDrawSpringArmEdgeRange() {
    void 0 !==
      ModelManager_1.ModelManager?.CameraModel
        ?.CameraDebugToolDrawSpringArmEdgeRange &&
      (ModelManager_1.ModelManager.CameraModel.CameraDebugToolDrawSpringArmEdgeRange =
        !ModelManager_1.ModelManager.CameraModel
          .CameraDebugToolDrawSpringArmEdgeRange);
  }
  static SwitchCameraDebugToolDrawLockCameraMoveLine() {
    void 0 !==
      ModelManager_1.ModelManager?.CameraModel
        ?.CameraDebugToolDrawLockCameraMoveLine &&
      (ModelManager_1.ModelManager.CameraModel.CameraDebugToolDrawLockCameraMoveLine =
        !ModelManager_1.ModelManager.CameraModel
          .CameraDebugToolDrawLockCameraMoveLine);
  }
  static SwitchCameraDebugToolDrawSettlementCamera() {
    void 0 !==
      ModelManager_1.ModelManager?.CameraModel
        ?.CameraDebugToolDrawSettlementCamera &&
      (ModelManager_1.ModelManager.CameraModel.CameraDebugToolDrawSettlementCamera =
        !ModelManager_1.ModelManager.CameraModel
          .CameraDebugToolDrawSettlementCamera);
  }
  static GetDebugDesiredCameraProps() {
    const r =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    const t = UE.NewMap(UE.BuiltinString, UE.BuiltinString);
    return (
      r &&
        r.DebugDesiredCameraProps.forEach((a, e) => {
          t.Add(e, r.DebugValueToString(a, 0, 0));
        }),
      t
    );
  }
  static GetDebugCameraPropsRaw() {
    const a =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    const r = new Map();
    return (
      a &&
        a.DebugDesiredCameraProps.forEach((a, e) => {
          a instanceof Vector_1.Vector
            ? r.set(e, Vector_1.Vector.Create(a))
            : a instanceof Rotator_1.Rotator
              ? r.set(e, Rotator_1.Rotator.Create(a))
              : r.set(e, a);
        }),
      r
    );
  }
  static GetSubCameraModifications() {
    const r = new Map([
      [0, "基础镜头"],
      [2, "子镜头"],
      [1, "战斗镜头"],
      [3, "锁定目标镜头"],
    ]);
    const a =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent
        ?.CameraConfigController;
    const i = UE.NewArray(UE.SCameraDebugTool_SubCameraModification);
    return (
      a &&
        a?.DebugSubCameraModifications?.forEach((a, e) => {
          const t = new UE.SCameraDebugTool_SubCameraModification();
          const o =
            ((t.CameraType = r.get(e.Type) ?? "(Unknown Type)"),
            (t.CameraPriority = e.Priority),
            (t.CameraTag = e?.Tag?.TagName ?? ""),
            UE.NewArray(UE.SCameraDebugTool_CameraProperty));
          a.forEach((a, e) => {
            const r = new UE.SCameraDebugTool_CameraProperty();
            (r.PropertyName = e ?? "(Invalid Property)"),
              (r.Value = a.Value ?? 0),
              (r.IsEffect = a.IsEffect ?? !1),
              o.Add(r),
              t.ModifiedProperties.Add(r);
          }),
            i.Add(t);
        }),
      i
    );
  }
  static GetControllerModifications() {
    const a =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    const t = UE.NewArray(UE.SCameraDebugTool_ControllerModification);
    return (
      a &&
        a?.DebugControllerModifications?.forEach((a, r) => {
          a.forEach((a) => {
            const e = new UE.SCameraDebugTool_ControllerModification();
            (e.ControllerName = r),
              (e.PropertyName = a.PropertyName),
              (e.OldValue = a.OldValue),
              (e.NewValue = a.NewValue),
              t.Add(e);
          });
        }),
      t
    );
  }
  static GetCamereModeInfo() {
    const a = new UE.SCameraDebugTool_CameraModeInfo();
    const e = ModelManager_1.ModelManager?.CameraModel?.CameraMode;
    const r =
      ((a.CurrentCameraMode = e || 0),
      ModelManager_1.ModelManager?.CameraModel);
    const t = UE.NewArray(UE.BuiltinBool);
    if (r) for (let a = 0; a < 5; ++a) t.Add(r.IsModeEnabled(a));
    return (a.CameraModeEnabledArray = t), a;
  }
  static PlaySettlementCamera() {
    const a =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    a && a.PlaySettlementCamera();
  }
  static GetIsCameraTargetInScreen() {
    const a =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    return (
      !!a?.IsTargetLocationValid &&
      a.CheckPositionInScreen(
        a.TargetLocation,
        a.CameraAdjustController.CheckInScreenMinX,
        a.CameraAdjustController.CheckInScreenMaxX,
        a.CameraAdjustController.CheckInScreenMinY,
        a.CameraAdjustController.CheckInScreenMaxY,
      )
    );
  }
  static EnterSpecialGameplayCamera(a) {
    const e =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    if (e) return e.EnterSpecialGameplayCamera(a);
  }
  static ExitSpecialGameplayCamera() {
    const a =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    a && a.ExitSpecialGameplayCamera();
  }
  static ExitSpecialGameplayCamera2() {
    const a =
      ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent;
    a && a.ExitSpecialGameplayCamera();
  }
}
exports.default = CameraBlueprintFunctionLibrary;
// # sourceMappingURL=CameraBlueprintFunctionLibrary.js.map
