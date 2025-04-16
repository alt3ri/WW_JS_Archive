"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPickInteractionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbChessmanPickInteraction_1 = require("./FbChessmanPickInteraction");
class UnionPickInteractionHelper {
  static GetUnionPickInteractionObject(n) {
    if (n === fb_component_1.UnionPickInteraction.ChessmanPickInteraction)
      return new fb_component_1.ChessmanPickInteraction();
  }
  static ReadUnionPickInteraction(n, e) {
    return void 0 !== e &&
      n === fb_component_1.UnionPickInteraction.ChessmanPickInteraction
      ? FbChessmanPickInteraction_1.FbChessmanPickInteraction.Create(e)
      : void 0;
  }
}
exports.UnionPickInteractionHelper = UnionPickInteractionHelper;
//# sourceMappingURL=UnionPickInteractionHelper.js.map
