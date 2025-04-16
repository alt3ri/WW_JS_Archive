"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCheckJigsawInfo =
    exports.unionToUnionCheckJigsawInfo =
    exports.UnionCheckJigsawInfo =
      void 0);
const check_jigsaw_item_move_js_1 = require("../fb-condition/check-jigsaw-item-move.js"),
  check_jigsaw_item_place_index_js_1 = require("../fb-condition/check-jigsaw-item-place-index.js");
var UnionCheckJigsawInfo;
function unionToUnionCheckJigsawInfo(e, n) {
  switch (UnionCheckJigsawInfo[e]) {
    case "NONE":
      return;
    case "CheckJigsawItemMove":
      return n(new check_jigsaw_item_move_js_1.CheckJigsawItemMove());
    case "CheckJigsawItemPlaceIndex":
      return n(
        new check_jigsaw_item_place_index_js_1.CheckJigsawItemPlaceIndex(),
      );
    default:
      return;
  }
}
function unionListToUnionCheckJigsawInfo(e, n, i) {
  switch (UnionCheckJigsawInfo[e]) {
    case "NONE":
      return;
    case "CheckJigsawItemMove":
      return n(i, new check_jigsaw_item_move_js_1.CheckJigsawItemMove());
    case "CheckJigsawItemPlaceIndex":
      return n(
        i,
        new check_jigsaw_item_place_index_js_1.CheckJigsawItemPlaceIndex(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CheckJigsawItemMove = 1)] = "CheckJigsawItemMove"),
    (e[(e.CheckJigsawItemPlaceIndex = 2)] = "CheckJigsawItemPlaceIndex");
})(
  (UnionCheckJigsawInfo =
    exports.UnionCheckJigsawInfo || (exports.UnionCheckJigsawInfo = {})),
),
  (exports.unionToUnionCheckJigsawInfo = unionToUnionCheckJigsawInfo),
  (exports.unionListToUnionCheckJigsawInfo = unionListToUnionCheckJigsawInfo);
//# sourceMappingURL=union-check-jigsaw-info.js.map
