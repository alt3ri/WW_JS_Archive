"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPhysicsAttachTargetHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActorAttachTarget_1 = require("./FbActorAttachTarget"),
  FbEntityAttachTarget_1 = require("./FbEntityAttachTarget"),
  FbPointAttachTarget_1 = require("./FbPointAttachTarget");
class UnionPhysicsAttachTargetHelper {
  static GetUnionPhysicsAttachTargetObject(t) {
    switch (t) {
      case fb_component_1.UnionPhysicsAttachTarget.ActorAttachTarget:
        return new fb_component_1.ActorAttachTarget();
      case fb_component_1.UnionPhysicsAttachTarget.EntityAttachTarget:
        return new fb_component_1.EntityAttachTarget();
      case fb_component_1.UnionPhysicsAttachTarget.PointAttachTarget:
        return new fb_component_1.PointAttachTarget();
      default:
        return;
    }
  }
  static ReadUnionPhysicsAttachTarget(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_component_1.UnionPhysicsAttachTarget.ActorAttachTarget:
          return FbActorAttachTarget_1.FbActorAttachTarget.Create(e);
        case fb_component_1.UnionPhysicsAttachTarget.EntityAttachTarget:
          return FbEntityAttachTarget_1.FbEntityAttachTarget.Create(e);
        case fb_component_1.UnionPhysicsAttachTarget.PointAttachTarget:
          return FbPointAttachTarget_1.FbPointAttachTarget.Create(e);
        default:
          return;
      }
  }
}
exports.UnionPhysicsAttachTargetHelper = UnionPhysicsAttachTargetHelper;
//# sourceMappingURL=UnionPhysicsAttachTargetHelper.js.map
