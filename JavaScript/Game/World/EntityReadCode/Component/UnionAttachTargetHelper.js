"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionAttachTargetHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActorAttachTarget_1 = require("./FbActorAttachTarget"),
  FbDynamicAttachTarget_1 = require("./FbDynamicAttachTarget"),
  FbEntityAttachTarget_1 = require("./FbEntityAttachTarget");
class UnionAttachTargetHelper {
  static GetUnionAttachTargetObject(t) {
    switch (t) {
      case fb_component_1.UnionAttachTarget.ActorAttachTarget:
        return new fb_component_1.ActorAttachTarget();
      case fb_component_1.UnionAttachTarget.DynamicAttachTarget:
        return new fb_component_1.DynamicAttachTarget();
      case fb_component_1.UnionAttachTarget.EntityAttachTarget:
        return new fb_component_1.EntityAttachTarget();
      default:
        return;
    }
  }
  static ReadUnionAttachTarget(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_component_1.UnionAttachTarget.ActorAttachTarget:
          return FbActorAttachTarget_1.FbActorAttachTarget.Create(e);
        case fb_component_1.UnionAttachTarget.DynamicAttachTarget:
          return FbDynamicAttachTarget_1.FbDynamicAttachTarget.Create(e);
        case fb_component_1.UnionAttachTarget.EntityAttachTarget:
          return FbEntityAttachTarget_1.FbEntityAttachTarget.Create(e);
        default:
          return;
      }
  }
}
exports.UnionAttachTargetHelper = UnionAttachTargetHelper;
//# sourceMappingURL=UnionAttachTargetHelper.js.map
