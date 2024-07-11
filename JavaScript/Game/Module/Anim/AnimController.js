"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimController = void 0);
const cpp_1 = require("cpp");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
class AnimController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Controller", 25, "AnimController.OnInit"),
      cpp_1.UKuroAnimJsSubsystem.RegisterUpdateAnimInfoFunction(
        GlobalData_1.GlobalData.GameInstance,
        AnimController.UpdateAnimInfo,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Controller", 25, "AnimController.OnClear"),
      cpp_1.UKuroAnimJsSubsystem.UnregisterUpdateAnimInfoFunction(
        GlobalData_1.GlobalData.GameInstance,
      ),
      !0
    );
  }
  static RegisterUpdateAnimInfoEntity(t) {
    cpp_1.UKuroAnimJsSubsystem.RegisterEntity(
      GlobalData_1.GlobalData.GameInstance,
      t,
    );
  }
  static UnregisterUpdateAnimInfoEntity(t) {
    cpp_1.UKuroAnimJsSubsystem.UnregisterEntity(
      GlobalData_1.GlobalData.GameInstance,
      t,
    );
  }
  static UpdateAnimInfoMove(t) {
    let e;
    let n;
    let a;
    let r = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    r?.Valid &&
      ((e = r.MainAnimInstance.LogicParams),
      (r = r.AnimLogicParamsSetter),
      (n = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid &&
        ((a = n.InputDirectProxy),
        r.InputDirect.Equals(a) ||
          (r.InputDirect.DeepCopy(a), (e.InputDirectRef = a.ToUeVector())),
        (a = n.InputRotatorProxy),
        r.InputRotator.Equals(a) ||
          (r.InputRotator.DeepCopy(a), (e.InputRotatorRef = a.ToUeRotator()))),
      (n = EntitySystem_1.EntitySystem.GetComponent(t, 36))?.Valid &&
        ((a = n.Acceleration),
        r.Acceleration.Equals(a) ||
          (r.Acceleration.DeepCopy(a), (e.AccelerationRef = a.ToUeVector())),
        (a = n.IsMoving),
        r.IsMoving !== a && ((r.IsMoving = a), (e.IsMovingRef = a)),
        (a = n.HasMoveInput),
        r.HasMoveInput !== a && ((r.HasMoveInput = a), (e.HasMoveInputRef = a)),
        (a = n.Speed),
        r.Speed !== a && ((r.Speed = a), (e.SpeedRef = a)),
        (a = n.IsJump),
        r.IsJump !== a && ((r.IsJump = a), (e.IsJumpRef = a)),
        (a = n.GroundedTimeUe),
        r.GroundedTime !== a && ((r.GroundedTime = a), (e.GroundedTimeRef = a)),
        (a = n.IsFallingIntoWater),
        r.IsFallingIntoWater !== a &&
          ((r.IsFallingIntoWater = a), (e.IsFallingIntoWaterRef = a)),
        (a = n.JumpUpRate),
        r.JumpUpRate !== a && ((r.JumpUpRate = a), (e.JumpUpRateRef = a)),
        (a = n.ForceExitStateStop),
        r.ForceExitStateStop !== a) &&
        ((r.ForceExitStateStop = a), (e.ForceExitStateStopRef = a)),
      (n = EntitySystem_1.EntitySystem.GetComponent(t, 31))?.Valid &&
        ((a = n.GetTsClimbInfo()),
        r.ClimbInfo.Equals(a) ||
          (r.ClimbInfo.DeepCopy(a), (e.ClimbInfoRef = n.GetClimbInfoNew())),
        (a = n.GetTsClimbState()),
        r.ClimbState.Equals(a) ||
          (r.ClimbState.DeepCopy(a), (e.ClimbStateRef = n.GetClimbStateNew())),
        (a = n.GetOnWallAngle()),
        r.ClimbOnWallAngle !== a) &&
        ((r.ClimbOnWallAngle = a), (e.ClimbOnWallAngleRef = a)),
      (n = EntitySystem_1.EntitySystem.GetComponent(t, 66))?.Valid &&
        ((a = n.SprintSwimOffset),
        r.SprintSwimOffset !== a &&
          ((r.SprintSwimOffset = a), (e.SprintSwimOffsetRef = a)),
        (a = n.SprintSwimOffsetLerpSpeed),
        r.SprintSwimOffsetLerpSpeed !== a) &&
        ((r.SprintSwimOffsetLerpSpeed = a),
        (e.SprintSwimOffsetLerpSpeedRef = a)),
      (n = EntitySystem_1.EntitySystem.GetComponent(t, 32))?.Valid &&
        ((a = n.SlideForward),
        r.SlideForward.Equals(a) ||
          (r.SlideForward.DeepCopy(a), (e.SlideForwardRef = a.ToUeVector())),
        (a = n.SlideSwitchThisFrame),
        r.SlideSwitchThisFrame !== a &&
          ((r.SlideSwitchThisFrame = a), (e.SlideSwitchThisFrameRef = a)),
        (a = n.StandMode),
        r.SlideStandMode !== a) &&
        ((r.SlideStandMode = a), (e.SlideStandModeRef = a)),
      (n = EntitySystem_1.EntitySystem.GetComponent(t, 95))?.Valid) &&
      ((a = n.Active), r.IsInSplineMove !== a) &&
      ((r.IsInSplineMove = a), (e.bIsInSplineMove = a));
  }
  static UpdateAnimInfoMeshAnim(t) {
    let e;
    let n;
    let a;
    let r = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    r?.Valid &&
      ((e = r.MainAnimInstance.LogicParams),
      (n = r.AnimLogicParamsSetter),
      (a = r.BattleIdleEndTime),
      n.BattleIdleTime !== a &&
        ((n.BattleIdleTime = a), (e.BattleIdleTimeRef = a)),
      (a = r.DegMovementSlope),
      n.DegMovementSlope !== a &&
        ((n.DegMovementSlope = a), (e.DegMovementSlopeRef = a)),
      (a = r.GetTsSightDirect()),
      n.SightDirect.Equals(a) ||
        (n.SightDirect.DeepCopy(a), (e.SightDirectRef = a.ToUeVector())),
      (r = EntitySystem_1.EntitySystem.GetComponent(t, 61))) &&
      ((a = r.GetRagRollQuitState()), n.RagQuitState !== a) &&
      ((n.RagQuitState = a), (e.RagQuitStateRef = a));
  }
  static UpdateAnimInfoHit(t) {
    let e;
    let n;
    let a;
    let r = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    r?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 51)) &&
      ((e = r.MainAnimInstance.LogicParams),
      (r = r.AnimLogicParamsSetter),
      (n = t.GetAcceptedNewBeHitAndReset()),
      r.AcceptedNewBeHit !== n &&
        ((r.AcceptedNewBeHit = n),
        (e.AcceptedNewBeHitRef = n),
        (a = t.BeHitAnim),
        r.BeHitAnim !== a) &&
        ((r.BeHitAnim = a), (e.BeHitAnimRef = a)),
      (n = t.GetEnterFkAndReset()),
      r.EnterFk !== n && ((r.EnterFk = n), (e.EnterFkRef = n)),
      (n = t.GetDoubleHitInAir()),
      r.DoubleHitInAir !== n) &&
      ((r.DoubleHitInAir = n), (e.DoubleHitInAirRef = n));
  }
  static UpdateAnimInfoFk(e) {
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 160);
    if (n?.Valid) {
      e = EntitySystem_1.EntitySystem.GetComponent(e, 51);
      if (e) {
        const a = n.MainAnimInstance.LogicParams;
        var n = n.AnimLogicParamsSetter;
        let t = e.BeHitDirect;
        n.BeHitDirect.Equals(t) ||
          (n.BeHitDirect.DeepCopy(t), (a.BeHitDirectRef = t.ToUeVector())),
          (t = e.BeHitLocation),
          n.BeHitLocation.Equals(t) ||
            (n.BeHitLocation.DeepCopy(t),
            (a.BeHitLocationRef = t.ToUeVector()));
        e = e.BeHitSocketName;
        n.BeHitSocketName.op_Equality(e) ||
          ((n.BeHitSocketName = e), (a.BeHitSocketNameRef = e));
      }
    }
  }
  static UpdateAnimInfoUnifiedState(t) {
    let e;
    let n;
    let a;
    let r = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    r?.Valid &&
      (n = EntitySystem_1.EntitySystem.GetComponent(t, 158)) &&
      ((e = r.MainAnimInstance.LogicParams),
      (r = r.AnimLogicParamsSetter),
      (a = n.MoveState),
      r.CharMoveState !== a &&
        ((r.CharMoveState = a), (e.CharMoveStateRef = a)),
      (a = n.PositionState),
      r.CharPositionState !== a &&
        ((r.CharPositionState = a), (e.CharPositionStateRef = a)),
      (a = n.DirectionState),
      r.CharCameraState !== a &&
        ((r.CharCameraState = a), (e.CharCameraStateRef = a)),
      (n = EntitySystem_1.EntitySystem.GetComponent(t, 33)) &&
        r.SkillTarget !== (n.SkillTarget?.Id ?? 0) &&
        ((r.SkillTarget = n.SkillTarget?.Id ?? 0),
        (e.SkillTarget = n.SkillTarget?.Entity?.GetComponent(1)?.Owner)),
      (a = n.LastActivateSkillTime),
      r.LastActiveSkillTime !== a &&
        ((r.LastActiveSkillTime = a), (e.LastActiveSkillTime = a)),
      (t =
        ModelManager_1.ModelManager.PlotModel.IsInInteraction ||
        (ModelManager_1.ModelManager.PlotModel.IsInPlot &&
          ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !==
            "LevelD")),
      r.IsInPerformingPlot !== t &&
        ((r.IsInPerformingPlot = t), (e.bIsInPerformingPlot = t)),
      (n =
        ModelManager_1.ModelManager.PlotModel.IsInPlot &&
        (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel ===
          "LevelA" ||
          ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel ===
            "LevelB")),
      r.IsInSequence !== n && ((r.IsInSequence = n), (e.bIsInSequence = n)),
      (a =
        UiCameraAnimationManager_1.UiCameraAnimationManager.IsDisablePlayer()),
      r.IsInUiCamera !== a) &&
      ((r.IsInUiCamera = a), (e.bIsInUiCamera = a));
  }
  static UpdateAnimInfoSceneInteract(t) {
    let e;
    let n;
    let a = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    a?.Valid &&
      (t = EntitySystem_1.EntitySystem.GetComponent(t, 26)) &&
      ((e = a.MainAnimInstance.LogicParams),
      (a = a.AnimLogicParamsSetter),
      (n = t.GetSitDownState()),
      a.SitDown !== n && ((a.SitDown = n), (e.bSitDown = n)),
      (n = t.EnterSitDownIndex),
      a.SitDownDirect !== n && ((a.SitDownDirect = n), (e.SitDownDirect = n)),
      (n = t.LeaveSitDownIndex),
      a.StandUpDirect !== n) &&
      ((a.StandUpDirect = n), (e.StandUpDirect = n));
  }
}
(exports.AnimController = AnimController).UpdateAnimInfo = (t) => {
  AnimController.UpdateAnimInfoMove(t),
    AnimController.UpdateAnimInfoMeshAnim(t),
    AnimController.UpdateAnimInfoHit(t),
    AnimController.UpdateAnimInfoUnifiedState(t),
    AnimController.UpdateAnimInfoFk(t),
    AnimController.UpdateAnimInfoSceneInteract(t);
};
// # sourceMappingURL=AnimController.js.map
