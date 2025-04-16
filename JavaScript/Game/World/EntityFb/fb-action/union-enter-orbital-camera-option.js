"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionEnterOrbitalCameraOption =
    exports.unionToUnionEnterOrbitalCameraOption =
    exports.UnionEnterOrbitalCameraOption =
      void 0);
const enter_orbital_camera_control_by_move_js_1 = require("../fb-action/enter-orbital-camera-control-by-move.js");
var UnionEnterOrbitalCameraOption;
function unionToUnionEnterOrbitalCameraOption(r, t) {
  switch (UnionEnterOrbitalCameraOption[r]) {
    case "NONE":
      return;
    case "EnterOrbitalCameraControlByMove":
      return t(
        new enter_orbital_camera_control_by_move_js_1.EnterOrbitalCameraControlByMove(),
      );
    default:
      return;
  }
}
function unionListToUnionEnterOrbitalCameraOption(r, t, e) {
  switch (UnionEnterOrbitalCameraOption[r]) {
    case "NONE":
      return;
    case "EnterOrbitalCameraControlByMove":
      return t(
        e,
        new enter_orbital_camera_control_by_move_js_1.EnterOrbitalCameraControlByMove(),
      );
    default:
      return;
  }
}
!(function (r) {
  (r[(r.NONE = 0)] = "NONE"),
    (r[(r.EnterOrbitalCameraControlByMove = 1)] =
      "EnterOrbitalCameraControlByMove");
})(
  (UnionEnterOrbitalCameraOption =
    exports.UnionEnterOrbitalCameraOption ||
    (exports.UnionEnterOrbitalCameraOption = {})),
),
  (exports.unionToUnionEnterOrbitalCameraOption =
    unionToUnionEnterOrbitalCameraOption),
  (exports.unionListToUnionEnterOrbitalCameraOption =
    unionListToUnionEnterOrbitalCameraOption);
//# sourceMappingURL=union-enter-orbital-camera-option.js.map
