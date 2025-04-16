"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionResetPlayerFocusType =
    exports.unionToUnionResetPlayerFocusType =
    exports.UnionResetPlayerFocusType =
      void 0);
const reset_player_focus_to_default_direction_js_1 = require("../fb-action/reset-player-focus-to-default-direction.js"),
  reset_player_focus_to_fixed_direction_js_1 = require("../fb-action/reset-player-focus-to-fixed-direction.js");
var UnionResetPlayerFocusType;
function unionToUnionResetPlayerFocusType(e, o) {
  switch (UnionResetPlayerFocusType[e]) {
    case "NONE":
      return;
    case "ResetPlayerFocusToDefaultDirection":
      return o(
        new reset_player_focus_to_default_direction_js_1.ResetPlayerFocusToDefaultDirection(),
      );
    case "ResetPlayerFocusToFixedDirection":
      return o(
        new reset_player_focus_to_fixed_direction_js_1.ResetPlayerFocusToFixedDirection(),
      );
    default:
      return;
  }
}
function unionListToUnionResetPlayerFocusType(e, o, t) {
  switch (UnionResetPlayerFocusType[e]) {
    case "NONE":
      return;
    case "ResetPlayerFocusToDefaultDirection":
      return o(
        t,
        new reset_player_focus_to_default_direction_js_1.ResetPlayerFocusToDefaultDirection(),
      );
    case "ResetPlayerFocusToFixedDirection":
      return o(
        t,
        new reset_player_focus_to_fixed_direction_js_1.ResetPlayerFocusToFixedDirection(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ResetPlayerFocusToDefaultDirection = 1)] =
      "ResetPlayerFocusToDefaultDirection"),
    (e[(e.ResetPlayerFocusToFixedDirection = 2)] =
      "ResetPlayerFocusToFixedDirection");
})(
  (UnionResetPlayerFocusType =
    exports.UnionResetPlayerFocusType ||
    (exports.UnionResetPlayerFocusType = {})),
),
  (exports.unionToUnionResetPlayerFocusType = unionToUnionResetPlayerFocusType),
  (exports.unionListToUnionResetPlayerFocusType =
    unionListToUnionResetPlayerFocusType);
//# sourceMappingURL=union-reset-player-focus-type.js.map
