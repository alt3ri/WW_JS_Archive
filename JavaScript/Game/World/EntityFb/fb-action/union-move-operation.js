"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionMoveOperation =
    exports.unionToUnionMoveOperation =
    exports.UnionMoveOperation =
      void 0);
const disable_move_operation_js_1 = require("../fb-action/disable-move-operation.js"),
  enable_move_operation_js_1 = require("../fb-action/enable-move-operation.js");
var UnionMoveOperation;
function unionToUnionMoveOperation(e, o) {
  switch (UnionMoveOperation[e]) {
    case "NONE":
      return;
    case "DisableMoveOperation":
      return o(new disable_move_operation_js_1.DisableMoveOperation());
    case "EnableMoveOperation":
      return o(new enable_move_operation_js_1.EnableMoveOperation());
    default:
      return;
  }
}
function unionListToUnionMoveOperation(e, o, n) {
  switch (UnionMoveOperation[e]) {
    case "NONE":
      return;
    case "DisableMoveOperation":
      return o(n, new disable_move_operation_js_1.DisableMoveOperation());
    case "EnableMoveOperation":
      return o(n, new enable_move_operation_js_1.EnableMoveOperation());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.DisableMoveOperation = 1)] = "DisableMoveOperation"),
    (e[(e.EnableMoveOperation = 2)] = "EnableMoveOperation");
})(
  (UnionMoveOperation =
    exports.UnionMoveOperation || (exports.UnionMoveOperation = {})),
),
  (exports.unionToUnionMoveOperation = unionToUnionMoveOperation),
  (exports.unionListToUnionMoveOperation = unionListToUnionMoveOperation);
//# sourceMappingURL=union-move-operation.js.map
