"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPasserbyNpcMove =
    exports.unionToUnionPasserbyNpcMove =
    exports.UnionPasserbyNpcMove =
      void 0);
const passerby_npc_spline_move_js_1 = require("../fb-component/passerby-npc-spline-move.js");
var UnionPasserbyNpcMove;
function unionToUnionPasserbyNpcMove(e, s) {
  switch (UnionPasserbyNpcMove[e]) {
    case "NONE":
      return;
    case "PasserbyNpcSplineMove":
      return s(new passerby_npc_spline_move_js_1.PasserbyNpcSplineMove());
    default:
      return;
  }
}
function unionListToUnionPasserbyNpcMove(e, s, n) {
  switch (UnionPasserbyNpcMove[e]) {
    case "NONE":
      return;
    case "PasserbyNpcSplineMove":
      return s(n, new passerby_npc_spline_move_js_1.PasserbyNpcSplineMove());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.PasserbyNpcSplineMove = 1)] = "PasserbyNpcSplineMove");
})(
  (UnionPasserbyNpcMove =
    exports.UnionPasserbyNpcMove || (exports.UnionPasserbyNpcMove = {})),
),
  (exports.unionToUnionPasserbyNpcMove = unionToUnionPasserbyNpcMove),
  (exports.unionListToUnionPasserbyNpcMove = unionListToUnionPasserbyNpcMove);
//# sourceMappingURL=union-passerby-npc-move.js.map
