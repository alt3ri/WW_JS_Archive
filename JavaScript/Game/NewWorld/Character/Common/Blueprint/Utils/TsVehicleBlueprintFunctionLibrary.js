"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiCameraAnimationManager_1 = require("../../../../../Module/UiCameraAnimation/UiCameraAnimationManager");
class TsVehicleBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static UpdateVehiclePerformData(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 234);
    t &&
      ((0, puerts_1.$set)(e, t.IsBeingImpacted),
      (0, puerts_1.$set)(i, t.CollisionDirection),
      (0, puerts_1.$set)(r, t.CollisionStrength));
  }
  static UpdateDrivedVehiclePerformData(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(
      t,
      226,
    )?.VehicleEntity?.GetComponent(234);
    t &&
      ((0, puerts_1.$set)(e, t.IsBeingImpacted),
      (0, puerts_1.$set)(i, t.CollisionDirection),
      (0, puerts_1.$set)(r, t.CollisionStrength));
  }
  static UpdateAnimInfo(t) {
    TsVehicleBlueprintFunctionLibrary.UpdateAnimInfoMove(t),
      TsVehicleBlueprintFunctionLibrary.UpdateAnimInfoUnifiedState(t);
  }
  static UpdateAnimInfoMove(t) {
    var e,
      i,
      r,
      a = EntitySystem_1.EntitySystem.GetComponent(t, 232);
    a?.Valid &&
      (e = a.MainAnimInstance?.LogicParams)?.IsValid() &&
      ((a = a.AnimLogicParamsSetter),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 231))?.Valid &&
        ((r = i.InputDirectProxy),
        a.InputDirect.Equals(r) ||
          (a.InputDirect.DeepCopy(r), (e.InputDirectRef = r.ToUeVectorOld())),
        (r = i.InputRotatorProxy),
        a.InputRotator.Equals(r) ||
          (a.InputRotator.DeepCopy(r), (e.InputRotatorRef = r.ToUeRotator()))),
      (i = EntitySystem_1.EntitySystem.GetComponent(t, 233))?.Valid) &&
      ((r = i.Acceleration),
      a.Acceleration.Equals(r) ||
        (a.Acceleration.DeepCopy(r), (e.AccelerationRef = r.ToUeVectorOld())),
      (t = i.IsMoving),
      a.IsMoving !== t && ((a.IsMoving = t), (e.IsMovingRef = t)),
      (r = i.HasMoveInput),
      a.HasMoveInput !== r && ((a.HasMoveInput = r), (e.HasMoveInputRef = r)),
      (t = i.Speed),
      a.Speed !== t) &&
      ((a.Speed = t), (e.SpeedRef = t));
  }
  static UpdateAnimInfoUnifiedState(t) {
    var e,
      i,
      t = EntitySystem_1.EntitySystem.GetComponent(t, 232);
    t?.Valid &&
      (e = t.MainAnimInstance?.LogicParams)?.IsValid() &&
      ((t = t.AnimLogicParamsSetter),
      (i =
        ModelManager_1.ModelManager.PlotModel.IsInInteraction ||
        (ModelManager_1.ModelManager.PlotModel.IsInPlot &&
          "LevelD" !==
            ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel)),
      t.IsInPerformingPlot !== i &&
        ((t.IsInPerformingPlot = i), (e.bIsInPerformingPlot = i)),
      (i =
        ModelManager_1.ModelManager.PlotModel.IsInPlot &&
        ("LevelA" ===
          ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel ||
          "LevelB" ===
            ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel)),
      t.IsInSequence !== i && ((t.IsInSequence = i), (e.bIsInSequence = i)),
      (i =
        UiCameraAnimationManager_1.UiCameraAnimationManager.IsDisablePlayer()),
      t.IsInUiCamera !== i) &&
      ((t.IsInUiCamera = i), (e.bIsInUiCamera = i));
  }
  static GetAndResetEnterSprint(t) {
    var e,
      t = EntitySystem_1.EntitySystem.GetComponent(t, 242);
    return !!t && ((e = t.IsEnterSprint), (t.IsEnterSprint = !1), e);
  }
  static GetDrivedVehicleSeatRot(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 226);
    if (!t?.VehicleEntity) return !1;
    var i = t.Seat;
    if (-1 === i) return !1;
    t = t.VehicleEntity.GetComponent(242);
    if (!t?.IsWaterfallMove) {
      if (
        (MathUtils_1.MathUtils.CommonTempRotator.Reset(),
        !t?.GetDrivedVehicleSeatLocalRot(
          i,
          MathUtils_1.MathUtils.CommonTempRotator,
        ))
      )
        return !1;
      t = (0, puerts_1.$unref)(e);
      (t.Pitch = MathUtils_1.MathUtils.CommonTempRotator.Pitch),
        (t.Yaw = MathUtils_1.MathUtils.CommonTempRotator.Yaw),
        (t.Roll = MathUtils_1.MathUtils.CommonTempRotator.Roll);
    }
    return !0;
  }
  static ConvertAngleToPassengerSpace(t, e) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 226);
    return t?.IsOnVehicle
      ? ((t = -t.SeatReletiveTrans.GetRotation().Rotator().Yaw),
        MathUtils_1.MathUtils.WrapAngle(e + t))
      : 0;
  }
  static GetVehicleVelocity(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 231);
    if (!t?.Actor?.IsValid()) return !1;
    var i = MathUtils_1.MathUtils.CommonTempVector;
    i.Reset();
    t.Entity.GetComponent(230)?.GetVehicleVelocity(i);
    t = (0, puerts_1.$unref)(e);
    return (t.X = i.X), (t.Y = i.Y), (t.Z = i.Z), !0;
  }
  static GetDrivedVehicleVelocity(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 226);
    if (!t?.IsOnVehicle) return !1;
    if (!t.VehicleEntity.GetComponent(231)?.Actor?.IsValid()) return !1;
    var i = MathUtils_1.MathUtils.CommonTempVector;
    i.Reset();
    t.VehicleEntity.GetComponent(230)?.GetVehicleVelocity(i);
    t = (0, puerts_1.$unref)(e);
    return (t.X = i.X), (t.Y = i.Y), (t.Z = i.Z), !0;
  }
  static GetVehicleRotiationSpeed(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 231);
    return t?.Actor?.IsValid() ? t.SimulatedRotYawSpeed : 0;
  }
  static GetDrivedVehicleRotiationSpeed(t) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 226);
    return t?.IsOnVehicle &&
      (t = t.VehicleEntity.GetComponent(231))?.Actor?.IsValid()
      ? t.SimulatedRotYawSpeed
      : 0;
  }
}
exports.default = TsVehicleBlueprintFunctionLibrary;
//# sourceMappingURL=TsVehicleBlueprintFunctionLibrary.js.map
