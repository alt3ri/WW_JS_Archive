"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionLevelSequenceTransition =
    exports.unionToUnionLevelSequenceTransition =
    exports.UnionLevelSequenceTransition =
      void 0);
const camera_transition_js_1 = require("../fb-action/camera-transition.js"),
  mask_transition_js_1 = require("../fb-action/mask-transition.js");
var UnionLevelSequenceTransition;
function unionToUnionLevelSequenceTransition(n, e) {
  switch (UnionLevelSequenceTransition[n]) {
    case "NONE":
      return;
    case "CameraTransition":
      return e(new camera_transition_js_1.CameraTransition());
    case "MaskTransition":
      return e(new mask_transition_js_1.MaskTransition());
    default:
      return;
  }
}
function unionListToUnionLevelSequenceTransition(n, e, i) {
  switch (UnionLevelSequenceTransition[n]) {
    case "NONE":
      return;
    case "CameraTransition":
      return e(i, new camera_transition_js_1.CameraTransition());
    case "MaskTransition":
      return e(i, new mask_transition_js_1.MaskTransition());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.CameraTransition = 1)] = "CameraTransition"),
    (n[(n.MaskTransition = 2)] = "MaskTransition");
})(
  (UnionLevelSequenceTransition =
    exports.UnionLevelSequenceTransition ||
    (exports.UnionLevelSequenceTransition = {})),
),
  (exports.unionToUnionLevelSequenceTransition =
    unionToUnionLevelSequenceTransition),
  (exports.unionListToUnionLevelSequenceTransition =
    unionListToUnionLevelSequenceTransition);
//# sourceMappingURL=union-level-sequence-transition.js.map
