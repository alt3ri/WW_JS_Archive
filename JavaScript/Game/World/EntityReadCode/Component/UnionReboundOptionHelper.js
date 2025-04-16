"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionReboundOptionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbForwardFrontRebound_1 = require("./FbForwardFrontRebound");
class UnionReboundOptionHelper {
  static GetUnionReboundOptionObject(o) {
    if (o === fb_component_1.UnionReboundOption.ForwardFrontRebound)
      return new fb_component_1.ForwardFrontRebound();
  }
  static ReadUnionReboundOption(o, n) {
    return void 0 !== n &&
      o === fb_component_1.UnionReboundOption.ForwardFrontRebound
      ? FbForwardFrontRebound_1.FbForwardFrontRebound.Create(n)
      : void 0;
  }
}
exports.UnionReboundOptionHelper = UnionReboundOptionHelper;
//# sourceMappingURL=UnionReboundOptionHelper.js.map
