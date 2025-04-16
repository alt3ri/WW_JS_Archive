"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSceneInteractionOperation =
    exports.unionToUnionSceneInteractionOperation =
    exports.UnionSceneInteractionOperation =
      void 0);
const disable_scene_interaction_operation_js_1 = require("../fb-action/disable-scene-interaction-operation.js"),
  enable_scene_interaction_operation_js_1 = require("../fb-action/enable-scene-interaction-operation.js");
var UnionSceneInteractionOperation;
function unionToUnionSceneInteractionOperation(e, n) {
  switch (UnionSceneInteractionOperation[e]) {
    case "NONE":
      return;
    case "DisableSceneInteractionOperation":
      return n(
        new disable_scene_interaction_operation_js_1.DisableSceneInteractionOperation(),
      );
    case "EnableSceneInteractionOperation":
      return n(
        new enable_scene_interaction_operation_js_1.EnableSceneInteractionOperation(),
      );
    default:
      return;
  }
}
function unionListToUnionSceneInteractionOperation(e, n, t) {
  switch (UnionSceneInteractionOperation[e]) {
    case "NONE":
      return;
    case "DisableSceneInteractionOperation":
      return n(
        t,
        new disable_scene_interaction_operation_js_1.DisableSceneInteractionOperation(),
      );
    case "EnableSceneInteractionOperation":
      return n(
        t,
        new enable_scene_interaction_operation_js_1.EnableSceneInteractionOperation(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.DisableSceneInteractionOperation = 1)] =
      "DisableSceneInteractionOperation"),
    (e[(e.EnableSceneInteractionOperation = 2)] =
      "EnableSceneInteractionOperation");
})(
  (UnionSceneInteractionOperation =
    exports.UnionSceneInteractionOperation ||
    (exports.UnionSceneInteractionOperation = {})),
),
  (exports.unionToUnionSceneInteractionOperation =
    unionToUnionSceneInteractionOperation),
  (exports.unionListToUnionSceneInteractionOperation =
    unionListToUnionSceneInteractionOperation);
//# sourceMappingURL=union-scene-interaction-operation.js.map
