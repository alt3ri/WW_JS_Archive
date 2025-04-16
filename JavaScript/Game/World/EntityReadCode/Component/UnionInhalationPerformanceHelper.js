"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionInhalationPerformanceHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbRoleInhalation_1 = require("./FbRoleInhalation"),
  FbSceneItemInhalation_1 = require("./FbSceneItemInhalation");
class UnionInhalationPerformanceHelper {
  static GetUnionInhalationPerformanceObject(e) {
    switch (e) {
      case fb_component_1.UnionInhalationPerformance.RoleInhalation:
        return new fb_component_1.RoleInhalation();
      case fb_component_1.UnionInhalationPerformance.SceneItemInhalation:
        return new fb_component_1.SceneItemInhalation();
      default:
        return;
    }
  }
  static ReadUnionInhalationPerformance(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionInhalationPerformance.RoleInhalation:
          return FbRoleInhalation_1.FbRoleInhalation.Create(n);
        case fb_component_1.UnionInhalationPerformance.SceneItemInhalation:
          return FbSceneItemInhalation_1.FbSceneItemInhalation.Create(n);
        default:
          return;
      }
  }
}
exports.UnionInhalationPerformanceHelper = UnionInhalationPerformanceHelper;
//# sourceMappingURL=UnionInhalationPerformanceHelper.js.map
