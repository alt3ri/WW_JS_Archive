"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSplineMoveTargetHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbEntitySplineMoveTarget_1 = require("./FbEntitySplineMoveTarget"),
  FbPlayerSplineMoveTarget_1 = require("./FbPlayerSplineMoveTarget");
class UnionSplineMoveTargetHelper {
  static GetUnionSplineMoveTargetObject(e) {
    switch (e) {
      case fb_action_1.UnionSplineMoveTarget.EntitySplineMoveTarget:
        return new fb_action_1.EntitySplineMoveTarget();
      case fb_action_1.UnionSplineMoveTarget.PlayerSplineMoveTarget:
        return new fb_action_1.PlayerSplineMoveTarget();
      default:
        return;
    }
  }
  static ReadUnionSplineMoveTarget(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionSplineMoveTarget.EntitySplineMoveTarget:
          return FbEntitySplineMoveTarget_1.FbEntitySplineMoveTarget.Create(t);
        case fb_action_1.UnionSplineMoveTarget.PlayerSplineMoveTarget:
          return FbPlayerSplineMoveTarget_1.FbPlayerSplineMoveTarget.Create(t);
        default:
          return;
      }
  }
}
exports.UnionSplineMoveTargetHelper = UnionSplineMoveTargetHelper;
//# sourceMappingURL=UnionSplineMoveTargetHelper.js.map
