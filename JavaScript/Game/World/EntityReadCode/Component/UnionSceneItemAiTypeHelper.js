"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSceneItemAiTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSceneItemPatrol_1 = require("./FbSceneItemPatrol");
class UnionSceneItemAiTypeHelper {
  static GetUnionSceneItemAiTypeObject(e) {
    if (e === fb_component_1.UnionSceneItemAiType.SceneItemPatrol)
      return new fb_component_1.SceneItemPatrol();
  }
  static ReadUnionSceneItemAiType(e, t) {
    return void 0 !== t &&
      e === fb_component_1.UnionSceneItemAiType.SceneItemPatrol
      ? FbSceneItemPatrol_1.FbSceneItemPatrol.Create(t)
      : void 0;
  }
}
exports.UnionSceneItemAiTypeHelper = UnionSceneItemAiTypeHelper;
//# sourceMappingURL=UnionSceneItemAiTypeHelper.js.map
