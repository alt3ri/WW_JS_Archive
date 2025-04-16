"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionUiOperation =
    exports.unionToUnionUiOperation =
    exports.UnionUiOperation =
      void 0);
const disable_ui_operation_js_1 = require("../fb-action/disable-ui-operation.js"),
  enable_sectional_ui_js_1 = require("../fb-action/enable-sectional-ui.js"),
  enable_ui_operation_js_1 = require("../fb-action/enable-ui-operation.js");
var UnionUiOperation;
function unionToUnionUiOperation(e, n) {
  switch (UnionUiOperation[e]) {
    case "NONE":
      return;
    case "DisableUiOperation":
      return n(new disable_ui_operation_js_1.DisableUiOperation());
    case "EnableSectionalUi":
      return n(new enable_sectional_ui_js_1.EnableSectionalUi());
    case "EnableUiOperation":
      return n(new enable_ui_operation_js_1.EnableUiOperation());
    default:
      return;
  }
}
function unionListToUnionUiOperation(e, n, i) {
  switch (UnionUiOperation[e]) {
    case "NONE":
      return;
    case "DisableUiOperation":
      return n(i, new disable_ui_operation_js_1.DisableUiOperation());
    case "EnableSectionalUi":
      return n(i, new enable_sectional_ui_js_1.EnableSectionalUi());
    case "EnableUiOperation":
      return n(i, new enable_ui_operation_js_1.EnableUiOperation());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.DisableUiOperation = 1)] = "DisableUiOperation"),
    (e[(e.EnableSectionalUi = 2)] = "EnableSectionalUi"),
    (e[(e.EnableUiOperation = 3)] = "EnableUiOperation");
})(
  (UnionUiOperation =
    exports.UnionUiOperation || (exports.UnionUiOperation = {})),
),
  (exports.unionToUnionUiOperation = unionToUnionUiOperation),
  (exports.unionListToUnionUiOperation = unionListToUnionUiOperation);
//# sourceMappingURL=union-ui-operation.js.map
