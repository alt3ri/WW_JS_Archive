"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSetJigsawItem =
    exports.unionToUnionSetJigsawItem =
    exports.UnionSetJigsawItem =
      void 0);
const move_jigsaw_item_js_1 = require("../fb-action/move-jigsaw-item.js");
var UnionSetJigsawItem;
function unionToUnionSetJigsawItem(e, t) {
  switch (UnionSetJigsawItem[e]) {
    case "NONE":
      return;
    case "MoveJigsawItem":
      return t(new move_jigsaw_item_js_1.MoveJigsawItem());
    default:
      return;
  }
}
function unionListToUnionSetJigsawItem(e, t, i) {
  switch (UnionSetJigsawItem[e]) {
    case "NONE":
      return;
    case "MoveJigsawItem":
      return t(i, new move_jigsaw_item_js_1.MoveJigsawItem());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"), (e[(e.MoveJigsawItem = 1)] = "MoveJigsawItem");
})(
  (UnionSetJigsawItem =
    exports.UnionSetJigsawItem || (exports.UnionSetJigsawItem = {})),
),
  (exports.unionToUnionSetJigsawItem = unionToUnionSetJigsawItem),
  (exports.unionListToUnionSetJigsawItem = unionListToUnionSetJigsawItem);
//# sourceMappingURL=union-set-jigsaw-item.js.map
