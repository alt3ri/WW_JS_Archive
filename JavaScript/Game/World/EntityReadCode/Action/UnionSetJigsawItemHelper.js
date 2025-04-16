"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSetJigsawItemHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbMoveJigsawItem_1 = require("./FbMoveJigsawItem");
class UnionSetJigsawItemHelper {
  static GetUnionSetJigsawItemObject(e) {
    if (e === fb_action_1.UnionSetJigsawItem.MoveJigsawItem)
      return new fb_action_1.MoveJigsawItem();
  }
  static ReadUnionSetJigsawItem(e, t) {
    return void 0 !== t && e === fb_action_1.UnionSetJigsawItem.MoveJigsawItem
      ? FbMoveJigsawItem_1.FbMoveJigsawItem.Create(t)
      : void 0;
  }
}
exports.UnionSetJigsawItemHelper = UnionSetJigsawItemHelper;
//# sourceMappingURL=UnionSetJigsawItemHelper.js.map
