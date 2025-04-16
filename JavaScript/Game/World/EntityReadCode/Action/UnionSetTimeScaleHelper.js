"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSetTimeScaleHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbSetGlobalTimeScale_1 = require("./FbSetGlobalTimeScale");
class UnionSetTimeScaleHelper {
  static GetUnionSetTimeScaleObject(e) {
    if (e === fb_action_1.UnionSetTimeScale.SetGlobalTimeScale)
      return new fb_action_1.SetGlobalTimeScale();
  }
  static ReadUnionSetTimeScale(e, t) {
    return void 0 !== t &&
      e === fb_action_1.UnionSetTimeScale.SetGlobalTimeScale
      ? FbSetGlobalTimeScale_1.FbSetGlobalTimeScale.Create(t)
      : void 0;
  }
}
exports.UnionSetTimeScaleHelper = UnionSetTimeScaleHelper;
//# sourceMappingURL=UnionSetTimeScaleHelper.js.map
