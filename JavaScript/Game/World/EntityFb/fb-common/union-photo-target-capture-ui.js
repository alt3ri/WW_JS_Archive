"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPhotoTargetCaptureUi =
    exports.unionToUnionPhotoTargetCaptureUi =
    exports.UnionPhotoTargetCaptureUi =
      void 0);
const photo_target_capture_ui_custom_points_js_1 = require("../fb-common/photo-target-capture-ui-custom-points.js"),
  photo_target_capture_ui_each_required_points_js_1 = require("../fb-common/photo-target-capture-ui-each-required-points.js"),
  photo_target_capture_ui_entity_zero_js_1 = require("../fb-common/photo-target-capture-ui-entity-zero.js"),
  photo_target_capture_ui_required_points_center_js_1 = require("../fb-common/photo-target-capture-ui-required-points-center.js");
var UnionPhotoTargetCaptureUi;
function unionToUnionPhotoTargetCaptureUi(t, e) {
  switch (UnionPhotoTargetCaptureUi[t]) {
    case "NONE":
      return;
    case "PhotoTargetCaptureUiCustomPoints":
      return e(
        new photo_target_capture_ui_custom_points_js_1.PhotoTargetCaptureUiCustomPoints(),
      );
    case "PhotoTargetCaptureUiEachRequiredPoints":
      return e(
        new photo_target_capture_ui_each_required_points_js_1.PhotoTargetCaptureUiEachRequiredPoints(),
      );
    case "PhotoTargetCaptureUiEntityZero":
      return e(
        new photo_target_capture_ui_entity_zero_js_1.PhotoTargetCaptureUiEntityZero(),
      );
    case "PhotoTargetCaptureUiRequiredPointsCenter":
      return e(
        new photo_target_capture_ui_required_points_center_js_1.PhotoTargetCaptureUiRequiredPointsCenter(),
      );
    default:
      return;
  }
}
function unionListToUnionPhotoTargetCaptureUi(t, e, r) {
  switch (UnionPhotoTargetCaptureUi[t]) {
    case "NONE":
      return;
    case "PhotoTargetCaptureUiCustomPoints":
      return e(
        r,
        new photo_target_capture_ui_custom_points_js_1.PhotoTargetCaptureUiCustomPoints(),
      );
    case "PhotoTargetCaptureUiEachRequiredPoints":
      return e(
        r,
        new photo_target_capture_ui_each_required_points_js_1.PhotoTargetCaptureUiEachRequiredPoints(),
      );
    case "PhotoTargetCaptureUiEntityZero":
      return e(
        r,
        new photo_target_capture_ui_entity_zero_js_1.PhotoTargetCaptureUiEntityZero(),
      );
    case "PhotoTargetCaptureUiRequiredPointsCenter":
      return e(
        r,
        new photo_target_capture_ui_required_points_center_js_1.PhotoTargetCaptureUiRequiredPointsCenter(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.PhotoTargetCaptureUiCustomPoints = 1)] =
      "PhotoTargetCaptureUiCustomPoints"),
    (t[(t.PhotoTargetCaptureUiEachRequiredPoints = 2)] =
      "PhotoTargetCaptureUiEachRequiredPoints"),
    (t[(t.PhotoTargetCaptureUiEntityZero = 3)] =
      "PhotoTargetCaptureUiEntityZero"),
    (t[(t.PhotoTargetCaptureUiRequiredPointsCenter = 4)] =
      "PhotoTargetCaptureUiRequiredPointsCenter");
})(
  (UnionPhotoTargetCaptureUi =
    exports.UnionPhotoTargetCaptureUi ||
    (exports.UnionPhotoTargetCaptureUi = {})),
),
  (exports.unionToUnionPhotoTargetCaptureUi = unionToUnionPhotoTargetCaptureUi),
  (exports.unionListToUnionPhotoTargetCaptureUi =
    unionListToUnionPhotoTargetCaptureUi);
//# sourceMappingURL=union-photo-target-capture-ui.js.map
