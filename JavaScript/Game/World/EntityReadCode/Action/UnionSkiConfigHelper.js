"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSkiConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbAccelerateSkiConfig_1 = require("./FbAccelerateSkiConfig"),
  FbCloseSkiConfig_1 = require("./FbCloseSkiConfig"),
  FbOpenSkiConfig_1 = require("./FbOpenSkiConfig");
class UnionSkiConfigHelper {
  static GetUnionSkiConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionSkiConfig.AccelerateSkiConfig:
        return new fb_action_1.AccelerateSkiConfig();
      case fb_action_1.UnionSkiConfig.CloseSkiConfig:
        return new fb_action_1.CloseSkiConfig();
      case fb_action_1.UnionSkiConfig.OpenSkiConfig:
        return new fb_action_1.OpenSkiConfig();
      default:
        return;
    }
  }
  static ReadUnionSkiConfig(e, i) {
    if (void 0 !== i)
      switch (e) {
        case fb_action_1.UnionSkiConfig.AccelerateSkiConfig:
          return FbAccelerateSkiConfig_1.FbAccelerateSkiConfig.Create(i);
        case fb_action_1.UnionSkiConfig.CloseSkiConfig:
          return FbCloseSkiConfig_1.FbCloseSkiConfig.Create(i);
        case fb_action_1.UnionSkiConfig.OpenSkiConfig:
          return FbOpenSkiConfig_1.FbOpenSkiConfig.Create(i);
        default:
          return;
      }
  }
}
exports.UnionSkiConfigHelper = UnionSkiConfigHelper;
//# sourceMappingURL=UnionSkiConfigHelper.js.map
