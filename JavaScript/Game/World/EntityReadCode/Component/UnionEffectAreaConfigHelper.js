"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionEffectAreaConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbBuffArea_1 = require("./FbBuffArea");
class UnionEffectAreaConfigHelper {
  static GetUnionEffectAreaConfigObject(e) {
    if (e === fb_component_1.UnionEffectAreaConfig.BuffArea)
      return new fb_component_1.BuffArea();
  }
  static ReadUnionEffectAreaConfig(e, n) {
    return void 0 !== n && e === fb_component_1.UnionEffectAreaConfig.BuffArea
      ? FbBuffArea_1.FbBuffArea.Create(n)
      : void 0;
  }
}
exports.UnionEffectAreaConfigHelper = UnionEffectAreaConfigHelper;
//# sourceMappingURL=UnionEffectAreaConfigHelper.js.map
