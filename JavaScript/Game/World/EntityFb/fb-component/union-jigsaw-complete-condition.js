"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionJigsawCompleteCondition =
    exports.unionToUnionJigsawCompleteCondition =
    exports.UnionJigsawCompleteCondition =
      void 0);
const activate_all_correct_piece_js_1 = require("../fb-component/activate-all-correct-piece.js"),
  activate_specified_piece_js_1 = require("../fb-component/activate-specified-piece.js"),
  active_renju_piece_js_1 = require("../fb-component/active-renju-piece.js"),
  put_in_the_specified_piece_js_1 = require("../fb-component/put-in-the-specified-piece.js");
var UnionJigsawCompleteCondition;
function unionToUnionJigsawCompleteCondition(e, i) {
  switch (UnionJigsawCompleteCondition[e]) {
    case "NONE":
      return;
    case "ActivateAllCorrectPiece":
      return i(new activate_all_correct_piece_js_1.ActivateAllCorrectPiece());
    case "ActivateSpecifiedPiece":
      return i(new activate_specified_piece_js_1.ActivateSpecifiedPiece());
    case "ActiveRenjuPiece":
      return i(new active_renju_piece_js_1.ActiveRenjuPiece());
    case "PutInTheSpecifiedPiece":
      return i(new put_in_the_specified_piece_js_1.PutInTheSpecifiedPiece());
    default:
      return;
  }
}
function unionListToUnionJigsawCompleteCondition(e, i, t) {
  switch (UnionJigsawCompleteCondition[e]) {
    case "NONE":
      return;
    case "ActivateAllCorrectPiece":
      return i(
        t,
        new activate_all_correct_piece_js_1.ActivateAllCorrectPiece(),
      );
    case "ActivateSpecifiedPiece":
      return i(t, new activate_specified_piece_js_1.ActivateSpecifiedPiece());
    case "ActiveRenjuPiece":
      return i(t, new active_renju_piece_js_1.ActiveRenjuPiece());
    case "PutInTheSpecifiedPiece":
      return i(t, new put_in_the_specified_piece_js_1.PutInTheSpecifiedPiece());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ActivateAllCorrectPiece = 1)] = "ActivateAllCorrectPiece"),
    (e[(e.ActivateSpecifiedPiece = 2)] = "ActivateSpecifiedPiece"),
    (e[(e.ActiveRenjuPiece = 3)] = "ActiveRenjuPiece"),
    (e[(e.PutInTheSpecifiedPiece = 4)] = "PutInTheSpecifiedPiece");
})(
  (UnionJigsawCompleteCondition =
    exports.UnionJigsawCompleteCondition ||
    (exports.UnionJigsawCompleteCondition = {})),
),
  (exports.unionToUnionJigsawCompleteCondition =
    unionToUnionJigsawCompleteCondition),
  (exports.unionListToUnionJigsawCompleteCondition =
    unionListToUnionJigsawCompleteCondition);
//# sourceMappingURL=union-jigsaw-complete-condition.js.map
