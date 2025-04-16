"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionNewSplineMoveTargetHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbNpcNewSplineMoveTarget_1 = require("./FbNpcNewSplineMoveTarget"),
  FbPlayerNewSplineMoveTarget_1 = require("./FbPlayerNewSplineMoveTarget"),
  FbSceneItemNewSplineMoveTarget_1 = require("./FbSceneItemNewSplineMoveTarget"),
  FbVehicleNewSplineMoveTarget_1 = require("./FbVehicleNewSplineMoveTarget");
class UnionNewSplineMoveTargetHelper {
  static GetUnionNewSplineMoveTargetObject(e) {
    switch (e) {
      case fb_action_1.UnionNewSplineMoveTarget.NpcNewSplineMoveTarget:
        return new fb_action_1.NpcNewSplineMoveTarget();
      case fb_action_1.UnionNewSplineMoveTarget.PlayerNewSplineMoveTarget:
        return new fb_action_1.PlayerNewSplineMoveTarget();
      case fb_action_1.UnionNewSplineMoveTarget.SceneItemNewSplineMoveTarget:
        return new fb_action_1.SceneItemNewSplineMoveTarget();
      case fb_action_1.UnionNewSplineMoveTarget.VehicleNewSplineMoveTarget:
        return new fb_action_1.VehicleNewSplineMoveTarget();
      default:
        return;
    }
  }
  static ReadUnionNewSplineMoveTarget(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionNewSplineMoveTarget.NpcNewSplineMoveTarget:
          return FbNpcNewSplineMoveTarget_1.FbNpcNewSplineMoveTarget.Create(t);
        case fb_action_1.UnionNewSplineMoveTarget.PlayerNewSplineMoveTarget:
          return FbPlayerNewSplineMoveTarget_1.FbPlayerNewSplineMoveTarget.Create(
            t,
          );
        case fb_action_1.UnionNewSplineMoveTarget.SceneItemNewSplineMoveTarget:
          return FbSceneItemNewSplineMoveTarget_1.FbSceneItemNewSplineMoveTarget.Create(
            t,
          );
        case fb_action_1.UnionNewSplineMoveTarget.VehicleNewSplineMoveTarget:
          return FbVehicleNewSplineMoveTarget_1.FbVehicleNewSplineMoveTarget.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionNewSplineMoveTargetHelper = UnionNewSplineMoveTargetHelper;
//# sourceMappingURL=UnionNewSplineMoveTargetHelper.js.map
