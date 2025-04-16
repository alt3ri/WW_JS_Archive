"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAdjustPlayerCameraOption =
    exports.unionToUnionAdjustPlayerCameraOption =
    exports.UnionAdjustPlayerCameraOption =
      void 0);
const adjust_axis_lock_camera_js_1 = require("../fb-action/adjust-axis-lock-camera.js"),
  adjust_basic_camera_js_1 = require("../fb-action/adjust-basic-camera.js"),
  adjust_dialog_camera_js_1 = require("../fb-action/adjust-dialog-camera.js"),
  adjust_first_person_camera_js_1 = require("../fb-action/adjust-first-person-camera.js"),
  adjust_fixed_camera_js_1 = require("../fb-action/adjust-fixed-camera.js"),
  adjust_horizontal_camera_js_1 = require("../fb-action/adjust-horizontal-camera.js");
var UnionAdjustPlayerCameraOption;
function unionToUnionAdjustPlayerCameraOption(a, e) {
  switch (UnionAdjustPlayerCameraOption[a]) {
    case "NONE":
      return;
    case "AdjustAxisLockCamera":
      return e(new adjust_axis_lock_camera_js_1.AdjustAxisLockCamera());
    case "AdjustBasicCamera":
      return e(new adjust_basic_camera_js_1.AdjustBasicCamera());
    case "AdjustDialogCamera":
      return e(new adjust_dialog_camera_js_1.AdjustDialogCamera());
    case "AdjustFirstPersonCamera":
      return e(new adjust_first_person_camera_js_1.AdjustFirstPersonCamera());
    case "AdjustFixedCamera":
      return e(new adjust_fixed_camera_js_1.AdjustFixedCamera());
    case "AdjustHorizontalCamera":
      return e(new adjust_horizontal_camera_js_1.AdjustHorizontalCamera());
    default:
      return;
  }
}
function unionListToUnionAdjustPlayerCameraOption(a, e, r) {
  switch (UnionAdjustPlayerCameraOption[a]) {
    case "NONE":
      return;
    case "AdjustAxisLockCamera":
      return e(r, new adjust_axis_lock_camera_js_1.AdjustAxisLockCamera());
    case "AdjustBasicCamera":
      return e(r, new adjust_basic_camera_js_1.AdjustBasicCamera());
    case "AdjustDialogCamera":
      return e(r, new adjust_dialog_camera_js_1.AdjustDialogCamera());
    case "AdjustFirstPersonCamera":
      return e(
        r,
        new adjust_first_person_camera_js_1.AdjustFirstPersonCamera(),
      );
    case "AdjustFixedCamera":
      return e(r, new adjust_fixed_camera_js_1.AdjustFixedCamera());
    case "AdjustHorizontalCamera":
      return e(r, new adjust_horizontal_camera_js_1.AdjustHorizontalCamera());
    default:
      return;
  }
}
!(function (a) {
  (a[(a.NONE = 0)] = "NONE"),
    (a[(a.AdjustAxisLockCamera = 1)] = "AdjustAxisLockCamera"),
    (a[(a.AdjustBasicCamera = 2)] = "AdjustBasicCamera"),
    (a[(a.AdjustDialogCamera = 3)] = "AdjustDialogCamera"),
    (a[(a.AdjustFirstPersonCamera = 4)] = "AdjustFirstPersonCamera"),
    (a[(a.AdjustFixedCamera = 5)] = "AdjustFixedCamera"),
    (a[(a.AdjustHorizontalCamera = 6)] = "AdjustHorizontalCamera");
})(
  (UnionAdjustPlayerCameraOption =
    exports.UnionAdjustPlayerCameraOption ||
    (exports.UnionAdjustPlayerCameraOption = {})),
),
  (exports.unionToUnionAdjustPlayerCameraOption =
    unionToUnionAdjustPlayerCameraOption),
  (exports.unionListToUnionAdjustPlayerCameraOption =
    unionListToUnionAdjustPlayerCameraOption);
//# sourceMappingURL=union-adjust-player-camera-option.js.map
