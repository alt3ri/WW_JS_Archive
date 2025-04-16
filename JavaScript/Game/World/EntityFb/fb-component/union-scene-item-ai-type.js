"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSceneItemAiType =
    exports.unionToUnionSceneItemAiType =
    exports.UnionSceneItemAiType =
      void 0);
const scene_item_patrol_js_1 = require("../fb-component/scene-item-patrol.js");
var UnionSceneItemAiType;
function unionToUnionSceneItemAiType(e, n) {
  switch (UnionSceneItemAiType[e]) {
    case "NONE":
      return;
    case "SceneItemPatrol":
      return n(new scene_item_patrol_js_1.SceneItemPatrol());
    default:
      return;
  }
}
function unionListToUnionSceneItemAiType(e, n, t) {
  switch (UnionSceneItemAiType[e]) {
    case "NONE":
      return;
    case "SceneItemPatrol":
      return n(t, new scene_item_patrol_js_1.SceneItemPatrol());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"), (e[(e.SceneItemPatrol = 1)] = "SceneItemPatrol");
})(
  (UnionSceneItemAiType =
    exports.UnionSceneItemAiType || (exports.UnionSceneItemAiType = {})),
),
  (exports.unionToUnionSceneItemAiType = unionToUnionSceneItemAiType),
  (exports.unionListToUnionSceneItemAiType = unionListToUnionSceneItemAiType);
//# sourceMappingURL=union-scene-item-ai-type.js.map
