"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionNpcUiInteractOptionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbNpcUiInteractOnAntiqueShop_1 = require("./FbNpcUiInteractOnAntiqueShop"),
  FbNpcUiInteractOnChengXiaoShanShop_1 = require("./FbNpcUiInteractOnChengXiaoShanShop"),
  FbNpcUiInteractOnGramophone_1 = require("./FbNpcUiInteractOnGramophone"),
  FbNpcUiInteractOnHandInItem_1 = require("./FbNpcUiInteractOnHandInItem"),
  FbNpcUiInteractOnShop_1 = require("./FbNpcUiInteractOnShop");
class UnionNpcUiInteractOptionHelper {
  static GetUnionNpcUiInteractOptionObject(n) {
    switch (n) {
      case fb_component_1.UnionNpcUiInteractOption.NpcUiInteractOnAntiqueShop:
        return new fb_component_1.NpcUiInteractOnAntiqueShop();
      case fb_component_1.UnionNpcUiInteractOption
        .NpcUiInteractOnChengXiaoShanShop:
        return new fb_component_1.NpcUiInteractOnChengXiaoShanShop();
      case fb_component_1.UnionNpcUiInteractOption.NpcUiInteractOnGramophone:
        return new fb_component_1.NpcUiInteractOnGramophone();
      case fb_component_1.UnionNpcUiInteractOption.NpcUiInteractOnHandInItem:
        return new fb_component_1.NpcUiInteractOnHandInItem();
      case fb_component_1.UnionNpcUiInteractOption.NpcUiInteractOnShop:
        return new fb_component_1.NpcUiInteractOnShop();
      default:
        return;
    }
  }
  static ReadUnionNpcUiInteractOption(n, e) {
    if (void 0 !== e)
      switch (n) {
        case fb_component_1.UnionNpcUiInteractOption.NpcUiInteractOnAntiqueShop:
          return FbNpcUiInteractOnAntiqueShop_1.FbNpcUiInteractOnAntiqueShop.Create(
            e,
          );
        case fb_component_1.UnionNpcUiInteractOption
          .NpcUiInteractOnChengXiaoShanShop:
          return FbNpcUiInteractOnChengXiaoShanShop_1.FbNpcUiInteractOnChengXiaoShanShop.Create(
            e,
          );
        case fb_component_1.UnionNpcUiInteractOption.NpcUiInteractOnGramophone:
          return FbNpcUiInteractOnGramophone_1.FbNpcUiInteractOnGramophone.Create(
            e,
          );
        case fb_component_1.UnionNpcUiInteractOption.NpcUiInteractOnHandInItem:
          return FbNpcUiInteractOnHandInItem_1.FbNpcUiInteractOnHandInItem.Create(
            e,
          );
        case fb_component_1.UnionNpcUiInteractOption.NpcUiInteractOnShop:
          return FbNpcUiInteractOnShop_1.FbNpcUiInteractOnShop.Create(e);
        default:
          return;
      }
  }
}
exports.UnionNpcUiInteractOptionHelper = UnionNpcUiInteractOptionHelper;
//# sourceMappingURL=UnionNpcUiInteractOptionHelper.js.map
