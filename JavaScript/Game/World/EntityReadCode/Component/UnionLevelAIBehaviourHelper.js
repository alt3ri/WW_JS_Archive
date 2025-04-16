"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionLevelAIBehaviourHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbInteractBehaviourActions_1 = require("./FbInteractBehaviourActions"),
  FbLevelAIBehaviourSpline_1 = require("./FbLevelAIBehaviourSpline");
class UnionLevelAIBehaviourHelper {
  static GetUnionLevelAIBehaviourObject(e) {
    switch (e) {
      case fb_component_1.UnionLevelAIBehaviour.InteractBehaviourActions:
        return new fb_component_1.InteractBehaviourActions();
      case fb_component_1.UnionLevelAIBehaviour.LevelAIBehaviourSpline:
        return new fb_component_1.LevelAIBehaviourSpline();
      default:
        return;
    }
  }
  static ReadUnionLevelAIBehaviour(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionLevelAIBehaviour.InteractBehaviourActions:
          return FbInteractBehaviourActions_1.FbInteractBehaviourActions.Create(
            n,
          );
        case fb_component_1.UnionLevelAIBehaviour.LevelAIBehaviourSpline:
          return FbLevelAIBehaviourSpline_1.FbLevelAIBehaviourSpline.Create(n);
        default:
          return;
      }
  }
}
exports.UnionLevelAIBehaviourHelper = UnionLevelAIBehaviourHelper;
//# sourceMappingURL=UnionLevelAIBehaviourHelper.js.map
