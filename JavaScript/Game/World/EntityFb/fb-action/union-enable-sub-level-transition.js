"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionEnableSubLevelTransition =
    exports.unionToUnionEnableSubLevelTransition =
    exports.UnionEnableSubLevelTransition =
      void 0);
const enable_sub_level_transition_with_scene_capture_js_1 = require("../fb-action/enable-sub-level-transition-with-scene-capture.js");
var UnionEnableSubLevelTransition;
function unionToUnionEnableSubLevelTransition(e, n) {
  switch (UnionEnableSubLevelTransition[e]) {
    case "NONE":
      return;
    case "EnableSubLevelTransitionWithSceneCapture":
      return n(
        new enable_sub_level_transition_with_scene_capture_js_1.EnableSubLevelTransitionWithSceneCapture(),
      );
    default:
      return;
  }
}
function unionListToUnionEnableSubLevelTransition(e, n, t) {
  switch (UnionEnableSubLevelTransition[e]) {
    case "NONE":
      return;
    case "EnableSubLevelTransitionWithSceneCapture":
      return n(
        t,
        new enable_sub_level_transition_with_scene_capture_js_1.EnableSubLevelTransitionWithSceneCapture(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.EnableSubLevelTransitionWithSceneCapture = 1)] =
      "EnableSubLevelTransitionWithSceneCapture");
})(
  (UnionEnableSubLevelTransition =
    exports.UnionEnableSubLevelTransition ||
    (exports.UnionEnableSubLevelTransition = {})),
),
  (exports.unionToUnionEnableSubLevelTransition =
    unionToUnionEnableSubLevelTransition),
  (exports.unionListToUnionEnableSubLevelTransition =
    unionListToUnionEnableSubLevelTransition);
//# sourceMappingURL=union-enable-sub-level-transition.js.map
