"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSplineMoveModelHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbCloseSplineMove_1 = require("./FbCloseSplineMove"),
  FbOpenSplineMove_1 = require("./FbOpenSplineMove");
class UnionSplineMoveModelHelper {
  static GetUnionSplineMoveModelObject(e) {
    switch (e) {
      case fb_action_1.UnionSplineMoveModel.CloseSplineMove:
        return new fb_action_1.CloseSplineMove();
      case fb_action_1.UnionSplineMoveModel.OpenSplineMove:
        return new fb_action_1.OpenSplineMove();
      default:
        return;
    }
  }
  static ReadUnionSplineMoveModel(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_action_1.UnionSplineMoveModel.CloseSplineMove:
          return FbCloseSplineMove_1.FbCloseSplineMove.Create(n);
        case fb_action_1.UnionSplineMoveModel.OpenSplineMove:
          return FbOpenSplineMove_1.FbOpenSplineMove.Create(n);
        default:
          return;
      }
  }
}
exports.UnionSplineMoveModelHelper = UnionSplineMoveModelHelper;
//# sourceMappingURL=UnionSplineMoveModelHelper.js.map
