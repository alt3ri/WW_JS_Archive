"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionItemGetUiConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbItemGetUiConfigSpecialQuest_1 = require("./FbItemGetUiConfigSpecialQuest");
class UnionItemGetUiConfigHelper {
  static GetUnionItemGetUiConfigObject(e) {
    if (e === fb_action_1.UnionItemGetUiConfig.ItemGetUiConfigSpecialQuest)
      return new fb_action_1.ItemGetUiConfigSpecialQuest();
  }
  static ReadUnionItemGetUiConfig(e, t) {
    return void 0 !== t &&
      e === fb_action_1.UnionItemGetUiConfig.ItemGetUiConfigSpecialQuest
      ? FbItemGetUiConfigSpecialQuest_1.FbItemGetUiConfigSpecialQuest.Create(t)
      : void 0;
  }
}
exports.UnionItemGetUiConfigHelper = UnionItemGetUiConfigHelper;
//# sourceMappingURL=UnionItemGetUiConfigHelper.js.map
