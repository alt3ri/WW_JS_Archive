"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSetJigsawFoundationHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbSetPieceState_1 = require("./FbSetPieceState");
class UnionSetJigsawFoundationHelper {
  static GetUnionSetJigsawFoundationObject(e) {
    if (e === fb_action_1.UnionSetJigsawFoundation.SetPieceState)
      return new fb_action_1.SetPieceState();
  }
  static ReadUnionSetJigsawFoundation(e, t) {
    return void 0 !== t &&
      e === fb_action_1.UnionSetJigsawFoundation.SetPieceState
      ? FbSetPieceState_1.FbSetPieceState.Create(t)
      : void 0;
  }
}
exports.UnionSetJigsawFoundationHelper = UnionSetJigsawFoundationHelper;
//# sourceMappingURL=UnionSetJigsawFoundationHelper.js.map
