"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionDynamicPortalCreateHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbDynamicPortalByBullet_1 = require("./FbDynamicPortalByBullet");
class UnionDynamicPortalCreateHelper {
  static GetUnionDynamicPortalCreateObject(e) {
    if (e === fb_component_1.UnionDynamicPortalCreate.DynamicPortalByBullet)
      return new fb_component_1.DynamicPortalByBullet();
  }
  static ReadUnionDynamicPortalCreate(e, t) {
    return void 0 !== t &&
      e === fb_component_1.UnionDynamicPortalCreate.DynamicPortalByBullet
      ? FbDynamicPortalByBullet_1.FbDynamicPortalByBullet.Create(t)
      : void 0;
  }
}
exports.UnionDynamicPortalCreateHelper = UnionDynamicPortalCreateHelper;
//# sourceMappingURL=UnionDynamicPortalCreateHelper.js.map
