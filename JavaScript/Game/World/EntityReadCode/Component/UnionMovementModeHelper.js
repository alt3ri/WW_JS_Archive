"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionMovementModeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSplineMove_1 = require("./FbSplineMove");
class UnionMovementModeHelper {
  static GetUnionMovementModeObject(e) {
    if (e === fb_component_1.UnionMovementMode.SplineMove)
      return new fb_component_1.SplineMove();
  }
  static ReadUnionMovementMode(e, o) {
    return void 0 !== o && e === fb_component_1.UnionMovementMode.SplineMove
      ? FbSplineMove_1.FbSplineMove.Create(o)
      : void 0;
  }
}
exports.UnionMovementModeHelper = UnionMovementModeHelper;
//# sourceMappingURL=UnionMovementModeHelper.js.map
