"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCameraShakeConfig =
    exports.unionToUnionCameraShakeConfig =
    exports.UnionCameraShakeConfig =
      void 0);
const constant_camera_shake_js_1 = require("../fb-action/constant-camera-shake.js"),
  linear_over_range_camera_shake_js_1 = require("../fb-action/linear-over-range-camera-shake.js");
var UnionCameraShakeConfig;
function unionToUnionCameraShakeConfig(e, a) {
  switch (UnionCameraShakeConfig[e]) {
    case "NONE":
      return;
    case "ConstantCameraShake":
      return a(new constant_camera_shake_js_1.ConstantCameraShake());
    case "LinearOverRangeCameraShake":
      return a(
        new linear_over_range_camera_shake_js_1.LinearOverRangeCameraShake(),
      );
    default:
      return;
  }
}
function unionListToUnionCameraShakeConfig(e, a, n) {
  switch (UnionCameraShakeConfig[e]) {
    case "NONE":
      return;
    case "ConstantCameraShake":
      return a(n, new constant_camera_shake_js_1.ConstantCameraShake());
    case "LinearOverRangeCameraShake":
      return a(
        n,
        new linear_over_range_camera_shake_js_1.LinearOverRangeCameraShake(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ConstantCameraShake = 1)] = "ConstantCameraShake"),
    (e[(e.LinearOverRangeCameraShake = 2)] = "LinearOverRangeCameraShake");
})(
  (UnionCameraShakeConfig =
    exports.UnionCameraShakeConfig || (exports.UnionCameraShakeConfig = {})),
),
  (exports.unionToUnionCameraShakeConfig = unionToUnionCameraShakeConfig),
  (exports.unionListToUnionCameraShakeConfig =
    unionListToUnionCameraShakeConfig);
//# sourceMappingURL=union-camera-shake-config.js.map
