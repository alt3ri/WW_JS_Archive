"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionOpenQteConfig =
    exports.unionToUnionOpenQteConfig =
    exports.UnionOpenQteConfig =
      void 0);
const open_level_qte_js_1 = require("../fb-action/open-level-qte.js"),
  open_panel_qte_qte_js_1 = require("../fb-action/open-panel-qte-qte.js");
var UnionOpenQteConfig;
function unionToUnionOpenQteConfig(e, n) {
  switch (UnionOpenQteConfig[e]) {
    case "NONE":
      return;
    case "OpenLevelQte":
      return n(new open_level_qte_js_1.OpenLevelQte());
    case "OpenPanelQteQte":
      return n(new open_panel_qte_qte_js_1.OpenPanelQteQte());
    default:
      return;
  }
}
function unionListToUnionOpenQteConfig(e, n, t) {
  switch (UnionOpenQteConfig[e]) {
    case "NONE":
      return;
    case "OpenLevelQte":
      return n(t, new open_level_qte_js_1.OpenLevelQte());
    case "OpenPanelQteQte":
      return n(t, new open_panel_qte_qte_js_1.OpenPanelQteQte());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.OpenLevelQte = 1)] = "OpenLevelQte"),
    (e[(e.OpenPanelQteQte = 2)] = "OpenPanelQteQte");
})(
  (UnionOpenQteConfig =
    exports.UnionOpenQteConfig || (exports.UnionOpenQteConfig = {})),
),
  (exports.unionToUnionOpenQteConfig = unionToUnionOpenQteConfig),
  (exports.unionListToUnionOpenQteConfig = unionListToUnionOpenQteConfig);
//# sourceMappingURL=union-open-qte-config.js.map
