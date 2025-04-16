"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionOpenQteConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbOpenLevelQte_1 = require("./FbOpenLevelQte"),
  FbOpenPanelQteQte_1 = require("./FbOpenPanelQteQte");
class UnionOpenQteConfigHelper {
  static GetUnionOpenQteConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionOpenQteConfig.OpenLevelQte:
        return new fb_action_1.OpenLevelQte();
      case fb_action_1.UnionOpenQteConfig.OpenPanelQteQte:
        return new fb_action_1.OpenPanelQteQte();
      default:
        return;
    }
  }
  static ReadUnionOpenQteConfig(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionOpenQteConfig.OpenLevelQte:
          return FbOpenLevelQte_1.FbOpenLevelQte.Create(t);
        case fb_action_1.UnionOpenQteConfig.OpenPanelQteQte:
          return FbOpenPanelQteQte_1.FbOpenPanelQteQte.Create(t);
        default:
          return;
      }
  }
}
exports.UnionOpenQteConfigHelper = UnionOpenQteConfigHelper;
//# sourceMappingURL=UnionOpenQteConfigHelper.js.map
