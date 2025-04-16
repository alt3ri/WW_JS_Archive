"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionNpcUiInteractOption =
    exports.unionToUnionNpcUiInteractOption =
    exports.UnionNpcUiInteractOption =
      void 0);
const npc_ui_interact_on_antique_shop_js_1 = require("../fb-component/npc-ui-interact-on-antique-shop.js"),
  npc_ui_interact_on_cheng_xiao_shan_shop_js_1 = require("../fb-component/npc-ui-interact-on-cheng-xiao-shan-shop.js"),
  npc_ui_interact_on_gramophone_js_1 = require("../fb-component/npc-ui-interact-on-gramophone.js"),
  npc_ui_interact_on_hand_in_item_js_1 = require("../fb-component/npc-ui-interact-on-hand-in-item.js"),
  npc_ui_interact_on_shop_js_1 = require("../fb-component/npc-ui-interact-on-shop.js");
var UnionNpcUiInteractOption;
function unionToUnionNpcUiInteractOption(n, t) {
  switch (UnionNpcUiInteractOption[n]) {
    case "NONE":
      return;
    case "NpcUiInteractOnAntiqueShop":
      return t(
        new npc_ui_interact_on_antique_shop_js_1.NpcUiInteractOnAntiqueShop(),
      );
    case "NpcUiInteractOnChengXiaoShanShop":
      return t(
        new npc_ui_interact_on_cheng_xiao_shan_shop_js_1.NpcUiInteractOnChengXiaoShanShop(),
      );
    case "NpcUiInteractOnGramophone":
      return t(
        new npc_ui_interact_on_gramophone_js_1.NpcUiInteractOnGramophone(),
      );
    case "NpcUiInteractOnHandInItem":
      return t(
        new npc_ui_interact_on_hand_in_item_js_1.NpcUiInteractOnHandInItem(),
      );
    case "NpcUiInteractOnShop":
      return t(new npc_ui_interact_on_shop_js_1.NpcUiInteractOnShop());
    default:
      return;
  }
}
function unionListToUnionNpcUiInteractOption(n, t, e) {
  switch (UnionNpcUiInteractOption[n]) {
    case "NONE":
      return;
    case "NpcUiInteractOnAntiqueShop":
      return t(
        e,
        new npc_ui_interact_on_antique_shop_js_1.NpcUiInteractOnAntiqueShop(),
      );
    case "NpcUiInteractOnChengXiaoShanShop":
      return t(
        e,
        new npc_ui_interact_on_cheng_xiao_shan_shop_js_1.NpcUiInteractOnChengXiaoShanShop(),
      );
    case "NpcUiInteractOnGramophone":
      return t(
        e,
        new npc_ui_interact_on_gramophone_js_1.NpcUiInteractOnGramophone(),
      );
    case "NpcUiInteractOnHandInItem":
      return t(
        e,
        new npc_ui_interact_on_hand_in_item_js_1.NpcUiInteractOnHandInItem(),
      );
    case "NpcUiInteractOnShop":
      return t(e, new npc_ui_interact_on_shop_js_1.NpcUiInteractOnShop());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.NpcUiInteractOnAntiqueShop = 1)] = "NpcUiInteractOnAntiqueShop"),
    (n[(n.NpcUiInteractOnChengXiaoShanShop = 2)] =
      "NpcUiInteractOnChengXiaoShanShop"),
    (n[(n.NpcUiInteractOnGramophone = 3)] = "NpcUiInteractOnGramophone"),
    (n[(n.NpcUiInteractOnHandInItem = 4)] = "NpcUiInteractOnHandInItem"),
    (n[(n.NpcUiInteractOnShop = 5)] = "NpcUiInteractOnShop");
})(
  (UnionNpcUiInteractOption =
    exports.UnionNpcUiInteractOption ||
    (exports.UnionNpcUiInteractOption = {})),
),
  (exports.unionToUnionNpcUiInteractOption = unionToUnionNpcUiInteractOption),
  (exports.unionListToUnionNpcUiInteractOption =
    unionListToUnionNpcUiInteractOption);
//# sourceMappingURL=union-npc-ui-interact-option.js.map
