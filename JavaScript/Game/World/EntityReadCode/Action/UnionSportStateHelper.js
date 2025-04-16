"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSportStateHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbSkiConfig_1 = require("./FbSkiConfig"),
  FbSlideConfig_1 = require("./FbSlideConfig");
class UnionSportStateHelper {
  static GetUnionSportStateObject(t) {
    switch (t) {
      case fb_action_1.UnionSportState.SkiConfig:
        return new fb_action_1.SkiConfig();
      case fb_action_1.UnionSportState.SlideConfig:
        return new fb_action_1.SlideConfig();
      default:
        return;
    }
  }
  static ReadUnionSportState(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_action_1.UnionSportState.SkiConfig:
          return FbSkiConfig_1.FbSkiConfig.Create(e);
        case fb_action_1.UnionSportState.SlideConfig:
          return FbSlideConfig_1.FbSlideConfig.Create(e);
        default:
          return;
      }
  }
}
exports.UnionSportStateHelper = UnionSportStateHelper;
//# sourceMappingURL=UnionSportStateHelper.js.map
