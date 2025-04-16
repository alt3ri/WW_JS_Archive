"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionExploreStateHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbTeleControlConfig_1 = require("./FbTeleControlConfig");
class UnionExploreStateHelper {
  static GetUnionExploreStateObject(e) {
    if (e === fb_action_1.UnionExploreState.TeleControlConfig)
      return new fb_action_1.TeleControlConfig();
  }
  static ReadUnionExploreState(e, t) {
    return void 0 !== t && e === fb_action_1.UnionExploreState.TeleControlConfig
      ? FbTeleControlConfig_1.FbTeleControlConfig.Create(t)
      : void 0;
  }
}
exports.UnionExploreStateHelper = UnionExploreStateHelper;
//# sourceMappingURL=UnionExploreStateHelper.js.map
