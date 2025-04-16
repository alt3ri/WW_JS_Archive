"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionToggleMapMarkStateHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDisableMapMark_1 = require("./FbDisableMapMark"),
  FbHideMapMark_1 = require("./FbHideMapMark"),
  FbShowMapMark_1 = require("./FbShowMapMark");
class UnionToggleMapMarkStateHelper {
  static GetUnionToggleMapMarkStateObject(a) {
    switch (a) {
      case fb_action_1.UnionToggleMapMarkState.DisableMapMark:
        return new fb_action_1.DisableMapMark();
      case fb_action_1.UnionToggleMapMarkState.HideMapMark:
        return new fb_action_1.HideMapMark();
      case fb_action_1.UnionToggleMapMarkState.ShowMapMark:
        return new fb_action_1.ShowMapMark();
      default:
        return;
    }
  }
  static ReadUnionToggleMapMarkState(a, e) {
    if (void 0 !== e)
      switch (a) {
        case fb_action_1.UnionToggleMapMarkState.DisableMapMark:
          return FbDisableMapMark_1.FbDisableMapMark.Create(e);
        case fb_action_1.UnionToggleMapMarkState.HideMapMark:
          return FbHideMapMark_1.FbHideMapMark.Create(e);
        case fb_action_1.UnionToggleMapMarkState.ShowMapMark:
          return FbShowMapMark_1.FbShowMapMark.Create(e);
        default:
          return;
      }
  }
}
exports.UnionToggleMapMarkStateHelper = UnionToggleMapMarkStateHelper;
//# sourceMappingURL=UnionToggleMapMarkStateHelper.js.map
