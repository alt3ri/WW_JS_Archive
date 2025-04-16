"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPasserbyNpcMoveHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPasserbyNpcSplineMove_1 = require("./FbPasserbyNpcSplineMove");
class UnionPasserbyNpcMoveHelper {
  static GetUnionPasserbyNpcMoveObject(e) {
    if (e === fb_component_1.UnionPasserbyNpcMove.PasserbyNpcSplineMove)
      return new fb_component_1.PasserbyNpcSplineMove();
  }
  static ReadUnionPasserbyNpcMove(e, o) {
    return void 0 !== o &&
      e === fb_component_1.UnionPasserbyNpcMove.PasserbyNpcSplineMove
      ? FbPasserbyNpcSplineMove_1.FbPasserbyNpcSplineMove.Create(o)
      : void 0;
  }
}
exports.UnionPasserbyNpcMoveHelper = UnionPasserbyNpcMoveHelper;
//# sourceMappingURL=UnionPasserbyNpcMoveHelper.js.map
