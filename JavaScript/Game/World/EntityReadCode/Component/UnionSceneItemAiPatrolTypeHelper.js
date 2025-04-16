"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSceneItemAiPatrolTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSceneItemAiPatrolByGameTime_1 = require("./FbSceneItemAiPatrolByGameTime");
class UnionSceneItemAiPatrolTypeHelper {
  static GetUnionSceneItemAiPatrolTypeObject(e) {
    if (
      e ===
      fb_component_1.UnionSceneItemAiPatrolType.SceneItemAiPatrolByGameTime
    )
      return new fb_component_1.SceneItemAiPatrolByGameTime();
  }
  static ReadUnionSceneItemAiPatrolType(e, t) {
    return void 0 !== t &&
      e ===
        fb_component_1.UnionSceneItemAiPatrolType.SceneItemAiPatrolByGameTime
      ? FbSceneItemAiPatrolByGameTime_1.FbSceneItemAiPatrolByGameTime.Create(t)
      : void 0;
  }
}
exports.UnionSceneItemAiPatrolTypeHelper = UnionSceneItemAiPatrolTypeHelper;
//# sourceMappingURL=UnionSceneItemAiPatrolTypeHelper.js.map
