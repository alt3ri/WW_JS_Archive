"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSetJigsawFoundation =
    exports.unionToUnionSetJigsawFoundation =
    exports.UnionSetJigsawFoundation =
      void 0);
const set_piece_state_js_1 = require("../fb-action/set-piece-state.js");
var UnionSetJigsawFoundation;
function unionToUnionSetJigsawFoundation(e, t) {
  switch (UnionSetJigsawFoundation[e]) {
    case "NONE":
      return;
    case "SetPieceState":
      return t(new set_piece_state_js_1.SetPieceState());
    default:
      return;
  }
}
function unionListToUnionSetJigsawFoundation(e, t, n) {
  switch (UnionSetJigsawFoundation[e]) {
    case "NONE":
      return;
    case "SetPieceState":
      return t(n, new set_piece_state_js_1.SetPieceState());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"), (e[(e.SetPieceState = 1)] = "SetPieceState");
})(
  (UnionSetJigsawFoundation =
    exports.UnionSetJigsawFoundation ||
    (exports.UnionSetJigsawFoundation = {})),
),
  (exports.unionToUnionSetJigsawFoundation = unionToUnionSetJigsawFoundation),
  (exports.unionListToUnionSetJigsawFoundation =
    unionListToUnionSetJigsawFoundation);
//# sourceMappingURL=union-set-jigsaw-foundation.js.map
