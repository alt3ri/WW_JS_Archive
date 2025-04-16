"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetupSeqCamera = void 0);
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetupSeqCamera extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    var l, a;
    e &&
      1 === ModelManager_1.ModelManager.CameraModel.CameraMode &&
      ((e = e),
      (a = (l =
        ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.GetComponent(
          9,
        ).CineCamera).CameraComponent),
      ObjectUtils_1.ObjectUtils.IsValid(l)) &&
      (l.D_K2_SetActorTransform(e.Transform.ToUeTransform(), !1, void 0, !1),
      e.Aperture && (a.CurrentAperture = e.Aperture),
      e.FocalLength && (a.CurrentFocalLength = e.FocalLength),
      e.FocusDistance) &&
      (a.FocusSettings.ManualFocusDistance = e.FocusDistance);
  }
}
exports.LevelEventSetupSeqCamera = LevelEventSetupSeqCamera;
//# sourceMappingURL=LevelEventSetupSeqCamera.js.map
