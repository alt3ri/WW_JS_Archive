"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoGlobalController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  DangoGlobalConfig_1 = require("./DangoGlobalConfig");
class DangoGlobalController extends ControllerBase_1.ControllerBase {
  static InitGlobalConfig(e, o) {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      e,
      UE.BP_DangoGlobalConfig_C,
      (e) => {
        e?.IsValid
          ? ((e = DangoGlobalConfig_1.DangoGlobalConfig.Create(e)),
            (ModelManager_1.ModelManager.DangoGlobalModel.Config = e),
            o?.(!0))
          : o?.(!1);
      },
    );
  }
  static ApplyDangoMoveCamera(e) {
    var o = ModelManager_1.ModelManager.DangoGlobalModel.Config;
    5 === ModelManager_1.ModelManager.CameraModel.CameraMode &&
      o &&
      ControllerHolder_1.ControllerHolder.CameraController.FreeCamera.LogicComponent.ApplyCameraBlend(
        e,
        void 0,
        o.MovingCameraArmLength,
        o.MovingCameraBlendTime,
        o.MovingCameraCurve,
        o.MovingCameraFov,
      );
  }
  static ApplyDangoBeforeMoveCamera(o, r) {
    var a = ModelManager_1.ModelManager.DangoGlobalModel.Config,
      l = 5 === ModelManager_1.ModelManager.CameraModel.CameraMode,
      e =
        ControllerHolder_1.ControllerHolder.CameraController.FreeCamera
          .DisplayComponent.CameraActor;
    if (a && l && e?.IsValid()) {
      var l = a.BeforeMoveCameraArmLength,
        t = Quat_1.Quat.Create(),
        n = Vector_1.Vector.Create(),
        s = Vector_1.Vector.Create(),
        t =
          (t.FromUeQuat(e.K2_GetActorQuaternion()),
          t.RotateVector(Vector_1.Vector.ForwardVectorProxy, s),
          s.MultiplyEqual(-l),
          s.AdditionEqual(o),
          n.FromUeVector(e.D_K2_GetActorLocation()),
          Vector_1.Vector.Dist(s, n));
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Chess", 48, "BeforeMoveCameraDistance", [
            "distance",
            t,
          ]),
        t < a.BeforeMoveCameraTriggerDistance)
      )
        r?.();
      else {
        let e = 0;
        (e =
          t > a.BeforeMoveCameraFarDistance
            ? a.BeforeMoveCameraBlendTimeFar
            : MathUtils_1.MathUtils.RangeClamp(
                t,
                a.BeforeMoveCameraCloseDistanceEdgeMin,
                a.BeforeMoveCameraCloseDistanceEdgeMax,
                a.BeforeMoveCameraBlendTimeCloseMin,
                a.BeforeMoveCameraBlendTimeCloseMax,
              )),
          ControllerHolder_1.ControllerHolder.CameraController.FreeCamera.LogicComponent.ApplyCameraBlend(
            o,
            void 0,
            l,
            e,
            a.BeforeMoveCameraCurve,
            a.BeforeMoveCameraFov,
            r,
          );
      }
    } else r?.();
  }
}
exports.DangoGlobalController = DangoGlobalController;
//# sourceMappingURL=DangoGlobalController.js.map
