"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionBlackBoard =
    exports.unionToUnionBlackBoard =
    exports.UnionBlackBoard =
      void 0);
const black_board_boolean_js_1 = require("../fb-var/black-board-boolean.js"),
  black_board_entity_id_js_1 = require("../fb-var/black-board-entity-id.js"),
  black_board_entity_pos_js_1 = require("../fb-var/black-board-entity-pos.js"),
  black_board_float_js_1 = require("../fb-var/black-board-float.js"),
  black_board_int_js_1 = require("../fb-var/black-board-int.js"),
  black_board_string_js_1 = require("../fb-var/black-board-string.js"),
  black_board_vector_js_1 = require("../fb-var/black-board-vector.js");
var UnionBlackBoard;
function unionToUnionBlackBoard(a, r) {
  switch (UnionBlackBoard[a]) {
    case "NONE":
      return;
    case "BlackBoardBoolean":
      return r(new black_board_boolean_js_1.BlackBoardBoolean());
    case "BlackBoardEntityId":
      return r(new black_board_entity_id_js_1.BlackBoardEntityId());
    case "BlackBoardEntityPos":
      return r(new black_board_entity_pos_js_1.BlackBoardEntityPos());
    case "BlackBoardFloat":
      return r(new black_board_float_js_1.BlackBoardFloat());
    case "BlackBoardInt":
      return r(new black_board_int_js_1.BlackBoardInt());
    case "BlackBoardString":
      return r(new black_board_string_js_1.BlackBoardString());
    case "BlackBoardVector":
      return r(new black_board_vector_js_1.BlackBoardVector());
    default:
      return;
  }
}
function unionListToUnionBlackBoard(a, r, o) {
  switch (UnionBlackBoard[a]) {
    case "NONE":
      return;
    case "BlackBoardBoolean":
      return r(o, new black_board_boolean_js_1.BlackBoardBoolean());
    case "BlackBoardEntityId":
      return r(o, new black_board_entity_id_js_1.BlackBoardEntityId());
    case "BlackBoardEntityPos":
      return r(o, new black_board_entity_pos_js_1.BlackBoardEntityPos());
    case "BlackBoardFloat":
      return r(o, new black_board_float_js_1.BlackBoardFloat());
    case "BlackBoardInt":
      return r(o, new black_board_int_js_1.BlackBoardInt());
    case "BlackBoardString":
      return r(o, new black_board_string_js_1.BlackBoardString());
    case "BlackBoardVector":
      return r(o, new black_board_vector_js_1.BlackBoardVector());
    default:
      return;
  }
}
!(function (a) {
  (a[(a.NONE = 0)] = "NONE"),
    (a[(a.BlackBoardBoolean = 1)] = "BlackBoardBoolean"),
    (a[(a.BlackBoardEntityId = 2)] = "BlackBoardEntityId"),
    (a[(a.BlackBoardEntityPos = 3)] = "BlackBoardEntityPos"),
    (a[(a.BlackBoardFloat = 4)] = "BlackBoardFloat"),
    (a[(a.BlackBoardInt = 5)] = "BlackBoardInt"),
    (a[(a.BlackBoardString = 6)] = "BlackBoardString"),
    (a[(a.BlackBoardVector = 7)] = "BlackBoardVector");
})(
  (UnionBlackBoard = exports.UnionBlackBoard || (exports.UnionBlackBoard = {})),
),
  (exports.unionToUnionBlackBoard = unionToUnionBlackBoard),
  (exports.unionListToUnionBlackBoard = unionListToUnionBlackBoard);
//# sourceMappingURL=union-black-board.js.map
