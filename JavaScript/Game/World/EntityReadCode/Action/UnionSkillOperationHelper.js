"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSkillOperationHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDisableSectionalSkillOperation_1 = require("./FbDisableSectionalSkillOperation"),
  FbDisableSkillOperation_1 = require("./FbDisableSkillOperation"),
  FbEnableSkillOperation_1 = require("./FbEnableSkillOperation");
class UnionSkillOperationHelper {
  static GetUnionSkillOperationObject(e) {
    switch (e) {
      case fb_action_1.UnionSkillOperation.DisableSectionalSkillOperation:
        return new fb_action_1.DisableSectionalSkillOperation();
      case fb_action_1.UnionSkillOperation.DisableSkillOperation:
        return new fb_action_1.DisableSkillOperation();
      case fb_action_1.UnionSkillOperation.EnableSkillOperation:
        return new fb_action_1.EnableSkillOperation();
      default:
        return;
    }
  }
  static ReadUnionSkillOperation(e, i) {
    if (void 0 !== i)
      switch (e) {
        case fb_action_1.UnionSkillOperation.DisableSectionalSkillOperation:
          return FbDisableSectionalSkillOperation_1.FbDisableSectionalSkillOperation.Create(
            i,
          );
        case fb_action_1.UnionSkillOperation.DisableSkillOperation:
          return FbDisableSkillOperation_1.FbDisableSkillOperation.Create(i);
        case fb_action_1.UnionSkillOperation.EnableSkillOperation:
          return FbEnableSkillOperation_1.FbEnableSkillOperation.Create(i);
        default:
          return;
      }
  }
}
exports.UnionSkillOperationHelper = UnionSkillOperationHelper;
//# sourceMappingURL=UnionSkillOperationHelper.js.map
