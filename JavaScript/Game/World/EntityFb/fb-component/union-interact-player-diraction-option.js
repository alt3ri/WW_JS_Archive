"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionInteractPlayerDiractionOption =
    exports.unionToUnionInteractPlayerDiractionOption =
    exports.UnionInteractPlayerDiractionOption =
      void 0);
const interact_player_diraction_to_leisure_js_1 = require("../fb-component/interact-player-diraction-to-leisure.js"),
  interact_player_diraction_to_npc_js_1 = require("../fb-component/interact-player-diraction-to-npc.js");
var UnionInteractPlayerDiractionOption;
function unionToUnionInteractPlayerDiractionOption(t, n) {
  switch (UnionInteractPlayerDiractionOption[t]) {
    case "NONE":
      return;
    case "InteractPlayerDiractionToLeisure":
      return n(
        new interact_player_diraction_to_leisure_js_1.InteractPlayerDiractionToLeisure(),
      );
    case "InteractPlayerDiractionToNpc":
      return n(
        new interact_player_diraction_to_npc_js_1.InteractPlayerDiractionToNpc(),
      );
    default:
      return;
  }
}
function unionListToUnionInteractPlayerDiractionOption(t, n, r) {
  switch (UnionInteractPlayerDiractionOption[t]) {
    case "NONE":
      return;
    case "InteractPlayerDiractionToLeisure":
      return n(
        r,
        new interact_player_diraction_to_leisure_js_1.InteractPlayerDiractionToLeisure(),
      );
    case "InteractPlayerDiractionToNpc":
      return n(
        r,
        new interact_player_diraction_to_npc_js_1.InteractPlayerDiractionToNpc(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.InteractPlayerDiractionToLeisure = 1)] =
      "InteractPlayerDiractionToLeisure"),
    (t[(t.InteractPlayerDiractionToNpc = 2)] = "InteractPlayerDiractionToNpc");
})(
  (UnionInteractPlayerDiractionOption =
    exports.UnionInteractPlayerDiractionOption ||
    (exports.UnionInteractPlayerDiractionOption = {})),
),
  (exports.unionToUnionInteractPlayerDiractionOption =
    unionToUnionInteractPlayerDiractionOption),
  (exports.unionListToUnionInteractPlayerDiractionOption =
    unionListToUnionInteractPlayerDiractionOption);
//# sourceMappingURL=union-interact-player-diraction-option.js.map
