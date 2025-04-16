"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSceneItemAiPatrolType =
    exports.unionToUnionSceneItemAiPatrolType =
    exports.UnionSceneItemAiPatrolType =
      void 0);
const scene_item_ai_patrol_by_game_time_js_1 = require("../fb-component/scene-item-ai-patrol-by-game-time.js");
var UnionSceneItemAiPatrolType;
function unionToUnionSceneItemAiPatrolType(e, t) {
  switch (UnionSceneItemAiPatrolType[e]) {
    case "NONE":
      return;
    case "SceneItemAiPatrolByGameTime":
      return t(
        new scene_item_ai_patrol_by_game_time_js_1.SceneItemAiPatrolByGameTime(),
      );
    default:
      return;
  }
}
function unionListToUnionSceneItemAiPatrolType(e, t, n) {
  switch (UnionSceneItemAiPatrolType[e]) {
    case "NONE":
      return;
    case "SceneItemAiPatrolByGameTime":
      return t(
        n,
        new scene_item_ai_patrol_by_game_time_js_1.SceneItemAiPatrolByGameTime(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.SceneItemAiPatrolByGameTime = 1)] = "SceneItemAiPatrolByGameTime");
})(
  (UnionSceneItemAiPatrolType =
    exports.UnionSceneItemAiPatrolType ||
    (exports.UnionSceneItemAiPatrolType = {})),
),
  (exports.unionToUnionSceneItemAiPatrolType =
    unionToUnionSceneItemAiPatrolType),
  (exports.unionListToUnionSceneItemAiPatrolType =
    unionListToUnionSceneItemAiPatrolType);
//# sourceMappingURL=union-scene-item-ai-patrol-type.js.map
