"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionMoveSceneItemHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbCycleMoveToPoints_1 = require("./FbCycleMoveToPoints"),
  FbMoveToPoint_1 = require("./FbMoveToPoint"),
  FbMoveToRelativePosition_1 = require("./FbMoveToRelativePosition");
class UnionMoveSceneItemHelper {
  static GetUnionMoveSceneItemObject(e) {
    switch (e) {
      case fb_action_1.UnionMoveSceneItem.CycleMoveToPoints:
        return new fb_action_1.CycleMoveToPoints();
      case fb_action_1.UnionMoveSceneItem.MoveToPoint:
        return new fb_action_1.MoveToPoint();
      case fb_action_1.UnionMoveSceneItem.MoveToRelativePosition:
        return new fb_action_1.MoveToRelativePosition();
      default:
        return;
    }
  }
  static ReadUnionMoveSceneItem(e, o) {
    if (void 0 !== o)
      switch (e) {
        case fb_action_1.UnionMoveSceneItem.CycleMoveToPoints:
          return FbCycleMoveToPoints_1.FbCycleMoveToPoints.Create(o);
        case fb_action_1.UnionMoveSceneItem.MoveToPoint:
          return FbMoveToPoint_1.FbMoveToPoint.Create(o);
        case fb_action_1.UnionMoveSceneItem.MoveToRelativePosition:
          return FbMoveToRelativePosition_1.FbMoveToRelativePosition.Create(o);
        default:
          return;
      }
  }
}
exports.UnionMoveSceneItemHelper = UnionMoveSceneItemHelper;
//# sourceMappingURL=UnionMoveSceneItemHelper.js.map
