"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionNpcLeisureInteractOpHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbNpcSitDown_1 = require("./FbNpcSitDown");
class UnionNpcLeisureInteractOpHelper {
  static GetUnionNpcLeisureInteractOpObject(e) {
    if (e === fb_action_1.UnionNpcLeisureInteractOp.NpcSitDown)
      return new fb_action_1.NpcSitDown();
  }
  static ReadUnionNpcLeisureInteractOp(e, t) {
    return void 0 !== t &&
      e === fb_action_1.UnionNpcLeisureInteractOp.NpcSitDown
      ? FbNpcSitDown_1.FbNpcSitDown.Create(t)
      : void 0;
  }
}
exports.UnionNpcLeisureInteractOpHelper = UnionNpcLeisureInteractOpHelper;
//# sourceMappingURL=UnionNpcLeisureInteractOpHelper.js.map
