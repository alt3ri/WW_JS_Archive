"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionItemGetUiConfig =
    exports.unionToUnionItemGetUiConfig =
    exports.UnionItemGetUiConfig =
      void 0);
const item_get_ui_config_special_quest_js_1 = require("../fb-action/item-get-ui-config-special-quest.js");
var UnionItemGetUiConfig;
function unionToUnionItemGetUiConfig(e, t) {
  switch (UnionItemGetUiConfig[e]) {
    case "NONE":
      return;
    case "ItemGetUiConfigSpecialQuest":
      return t(
        new item_get_ui_config_special_quest_js_1.ItemGetUiConfigSpecialQuest(),
      );
    default:
      return;
  }
}
function unionListToUnionItemGetUiConfig(e, t, i) {
  switch (UnionItemGetUiConfig[e]) {
    case "NONE":
      return;
    case "ItemGetUiConfigSpecialQuest":
      return t(
        i,
        new item_get_ui_config_special_quest_js_1.ItemGetUiConfigSpecialQuest(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ItemGetUiConfigSpecialQuest = 1)] = "ItemGetUiConfigSpecialQuest");
})(
  (UnionItemGetUiConfig =
    exports.UnionItemGetUiConfig || (exports.UnionItemGetUiConfig = {})),
),
  (exports.unionToUnionItemGetUiConfig = unionToUnionItemGetUiConfig),
  (exports.unionListToUnionItemGetUiConfig = unionListToUnionItemGetUiConfig);
//# sourceMappingURL=union-item-get-ui-config.js.map
