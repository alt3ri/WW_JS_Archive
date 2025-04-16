"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCommonTip2OptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbCommonTip2PrepareCountdown_1 = require("./FbCommonTip2PrepareCountdown");
class UnionCommonTip2OptionHelper {
  static GetUnionCommonTip2OptionObject(o) {
    if (o === fb_action_1.UnionCommonTip2Option.CommonTip2PrepareCountdown)
      return new fb_action_1.CommonTip2PrepareCountdown();
  }
  static ReadUnionCommonTip2Option(o, n) {
    return void 0 !== n &&
      o === fb_action_1.UnionCommonTip2Option.CommonTip2PrepareCountdown
      ? FbCommonTip2PrepareCountdown_1.FbCommonTip2PrepareCountdown.Create(n)
      : void 0;
  }
}
exports.UnionCommonTip2OptionHelper = UnionCommonTip2OptionHelper;
//# sourceMappingURL=UnionCommonTip2OptionHelper.js.map
