"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSetPlayerOperationRestrictionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDisableAllPlayerOperation_1 = require("./FbDisableAllPlayerOperation"),
  FbDisableModulePlayerOperation_1 = require("./FbDisableModulePlayerOperation"),
  FbEnableAllPlayerOperation_1 = require("./FbEnableAllPlayerOperation");
class UnionSetPlayerOperationRestrictionHelper {
  static GetUnionSetPlayerOperationRestrictionObject(e) {
    switch (e) {
      case fb_action_1.UnionSetPlayerOperationRestriction
        .DisableAllPlayerOperation:
        return new fb_action_1.DisableAllPlayerOperation();
      case fb_action_1.UnionSetPlayerOperationRestriction
        .DisableModulePlayerOperation:
        return new fb_action_1.DisableModulePlayerOperation();
      case fb_action_1.UnionSetPlayerOperationRestriction
        .EnableAllPlayerOperation:
        return new fb_action_1.EnableAllPlayerOperation();
      default:
        return;
    }
  }
  static ReadUnionSetPlayerOperationRestriction(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionSetPlayerOperationRestriction
          .DisableAllPlayerOperation:
          return FbDisableAllPlayerOperation_1.FbDisableAllPlayerOperation.Create(
            t,
          );
        case fb_action_1.UnionSetPlayerOperationRestriction
          .DisableModulePlayerOperation:
          return FbDisableModulePlayerOperation_1.FbDisableModulePlayerOperation.Create(
            t,
          );
        case fb_action_1.UnionSetPlayerOperationRestriction
          .EnableAllPlayerOperation:
          return FbEnableAllPlayerOperation_1.FbEnableAllPlayerOperation.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionSetPlayerOperationRestrictionHelper =
  UnionSetPlayerOperationRestrictionHelper;
//# sourceMappingURL=UnionSetPlayerOperationRestrictionHelper.js.map
