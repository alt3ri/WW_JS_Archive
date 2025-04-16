"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionAddBuffModeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbAdsorbAddBuff_1 = require("./FbAdsorbAddBuff"),
  FbFireBulletAddBuff_1 = require("./FbFireBulletAddBuff"),
  FbImmediateAddBuff_1 = require("./FbImmediateAddBuff");
class UnionAddBuffModeHelper {
  static GetUnionAddBuffModeObject(e) {
    switch (e) {
      case fb_component_1.UnionAddBuffMode.AdsorbAddBuff:
        return new fb_component_1.AdsorbAddBuff();
      case fb_component_1.UnionAddBuffMode.FireBulletAddBuff:
        return new fb_component_1.FireBulletAddBuff();
      case fb_component_1.UnionAddBuffMode.ImmediateAddBuff:
        return new fb_component_1.ImmediateAddBuff();
      default:
        return;
    }
  }
  static ReadUnionAddBuffMode(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_component_1.UnionAddBuffMode.AdsorbAddBuff:
          return FbAdsorbAddBuff_1.FbAdsorbAddBuff.Create(t);
        case fb_component_1.UnionAddBuffMode.FireBulletAddBuff:
          return FbFireBulletAddBuff_1.FbFireBulletAddBuff.Create(t);
        case fb_component_1.UnionAddBuffMode.ImmediateAddBuff:
          return FbImmediateAddBuff_1.FbImmediateAddBuff.Create(t);
        default:
          return;
      }
  }
}
exports.UnionAddBuffModeHelper = UnionAddBuffModeHelper;
//# sourceMappingURL=UnionAddBuffModeHelper.js.map
